
import pymongo
from pymongo import MongoClient
client = MongoClient('mongodb://ohllord:mygod@ds051378.mongolab.com:51378/llord')
db = client['llord']
# db = client.llord

import datetime
people = db.people

newperson={'firstname':'Elizabeth','lastname':'Collins','datecreated':datetime.datetime.utcnow()}

newperson_id=people.insert(newperson)
newperson_id

client.close()
# Open the MongoDB connection
# connMongo = pymongo.Connection('mongodb://ds051378.mongolab.com:51378/llord')
# Print the available MongoDB databases
# print connMongo.database_names()
# Close the mongoDB connection
# connMongo.close()

