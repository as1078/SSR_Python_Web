# Configure MongoDB

from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()
MONGO_DB_URI = os.getenv('MONGO_DB_URI')
client = MongoClient.connect(MONGO_DB_URI)
db = client.todo_db

collection_name = db["todo_collection"]

