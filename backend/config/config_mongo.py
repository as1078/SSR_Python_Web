from pymongo.mongo_client import MongoClient
from urllib.parse import quote_plus

def connect_mongo():
    print("Connecting to Mongo")
    username = quote_plus('<username>')
    password = quote_plus('<password>')
    cluster = '<clusterName>'
    authSource = '<authSource>'
    authMechanism = '<authMechanism>'

    #uri = 'mongodb+srv://' + username + ':' + password + '@' + cluster + '/?authSource=' + authSource + '&authMechanism=' + authMechanism
    uri = "mongodb+srv://amansingh203:IM1unO0VWnx4lmvG@cluster0.crbrqm8.mongodb.net/?retryWrites=true&w=majority"

    # Create a new client and connect to the server
    client = MongoClient(uri)

    # Send a ping to confirm a successful connection
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)
        