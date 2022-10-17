from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_cors import CORS
import sqlite3
from pyresparser import ResumeParser
import nltk

import os
from werkzeug.utils import secure_filename
UPLOAD_FOLDER = 'resumes'

import pandas as pd
import re 
from gensim.models import Word2Vec

model = Word2Vec.load("models/recommend.model")

def recommend(word):
    word = word.lower()
    try:
        sug = model.wv.most_similar(word)[:8]
        prompts = []
        if sug:
            for s in sug:
                prompts.append(s[0])
            print(prompts)
        return prompts
    except:
        return []

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def listToString(s):
    if type(s) is list:
        str1 = " "   
        return (str1.join(s)) 
    else:
        return s

@app.route("/")
def home_page():
    return render_template('index.html')

@app.route("/upload", methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        print(request.files['fileUploaded']) 
        File = request.files['fileUploaded']
        if File.filename == '':
            return '<h1>No File</h1>'
        if File:
            filename = secure_filename(File.filename)
            File.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            data = ResumeParser(os.path.join(app.config['UPLOAD_FOLDER'], filename)).get_extracted_data()
            conn = sqlite3.connect('users.db')
            skillset = data.get('skills')
            skills = ""
            for s in skillset:
                skills = skills + ";" + s

            row = [
                listToString(data.get('name')),
                listToString(data.get('email')),
                listToString(data.get('mobile_number')),
                skills,
                listToString(data.get('experience')),
                listToString(data.get('college_name')),
                listToString(data.get('degree')),
                listToString(data.get('designation')),
                listToString(data.get('company_names')),
                filename
            ]
            print(row)
            conn.execute("INSERT INTO USERS VALUES (NULL,?,?,?,?,?,?,?,?,?,?)", (row))
            conn.commit()
            print("Records created successfully")
            conn.close()
            return '<h1>File saved!</h1>'


@app.route("/users", methods=['GET', 'POST'])
def users():
    if request.method == 'GET':
        conn = sqlite3.connect('users.db')
        sqlite_select_query = """SELECT * from USERS"""
        cursor = conn.cursor()
        cursor.execute(sqlite_select_query)
        records = cursor.fetchall()
        users = []
        for row in records:
            if row[4]:
                skills = row[4][1:]
            skills = skills.split(';')
            user ={}
            user = {'id': row[0], 'name': row[1], 'email': row[2], 'mobile': row[3], 'skills': skills, 'experience': row[5], 'college_name': row[6], 'degree': row[7], 'designation': row[8], 'company': row[9], 'resume': row[10]}
            users.append(user)
        cursor.close()
        conn.close()
        return jsonify(users)   
        
@app.route('/resumes/<path:filename>')
def custom_static(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/prompt/<string:word>', methods=['GET'])
def prompt(word):
    prompts = recommend(word)
    if prompts == "Error":
        return jsonify([])
    else:
        return jsonify(prompts)

if __name__ == '__main__':
    from waitress import serve
    serve(app, host="0.0.0.0", port=8000)
    app.run()