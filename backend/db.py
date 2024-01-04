# Configure MongoDB

from pymongo import MongoClient

client = MongoClient.connect("mongodb+srv://amansingh203:IM1unO0VWnx4lmvG@cluster0.crbrqm8.mongodb.net/?retryWrites=true&w=majority")
db = client.todo_db

collection_name = db["todo_collection"]

