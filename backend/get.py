import sqlite3
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
    user = {'id': row[0], 'name': row[1], 'email': row[2], 'mobile': row[3], 'skills': skills, 'experience': row[5], 'college_name': row[6], 'degree': row[7], 'designation': row[8], 'company': row[9]}
    users.append(user)
cursor.close()
conn.close()
return jsonify(users)   

