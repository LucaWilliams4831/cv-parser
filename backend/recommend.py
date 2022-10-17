import pandas as pd
import re 
from gensim.models import Word2Vec

model = Word2Vec.load("models/recommend.model")

def recommend(word):
    word = word.lower()
    try:
        sug = model.wv.most_similar('java')[:8]
        prompts = []
        if sug:
            for s in sug:
                prompts.append(s[0])
            print(prompts)
    except:
        return "error"
    

