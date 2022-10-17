import sqlite3

conn = sqlite3.connect('users.db')

conn.execute('''CREATE TABLE USERS
        (ID INTEGER PRIMARY KEY AUTOINCREMENT,
        NAME           TEXT,
        EMAIL        TEXT,
        MOBNO       NUMERIC,
        SKILLS      TEXT,
        EXPERIENCE  TEXT,
        COLLEGE     TEXT,
        DEGREE      TEXT,
        DESIGNATION  TEXT,
        COMPANY     TEXT,
        RESUME       TEXT);''')

print("Records created successfully")
conn.close()