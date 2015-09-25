import flask
from flask import Flask, make_response, request
from CatImageGenerator import *
from flask.ext.cors import CORS
import pymongo
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
import datetime

import os

MONGODB_URI = "YOUR_MONGOLAB_URI"
client = MongoClient(MONGODB_URI) # connect to default localhost at 27017 port
db = client.get_default_database()

notifications = []
voteCount = {
  "happy": 0,
  "cute": 0,
  "sad": 0,
  "ugly": 0
}

URL = "http://thecatapi.com/api/images/get"
generator = CatImageGenerator(URL, n=100)
results = None

def increaseVoteCount(message):
	for key in voteCount.keys():
		if key in message:
			voteCount[key] = voteCount[key] + 1

	return 

app = Flask(__name__)


@app.route("/")
def main():
  return make_response(open("templates/index.html").read())

@app.route("/api/test")
def testResponse():
	#results = generator.get()
	##check also for user name if in session
	results = generator.get()
	print "Results from cat api: ", len(results)
	return flask.jsonify(
		message= "This is response from the test link",
		imageArray=results
	)

@app.route("/api/push", methods=["POST"])
def submitNotification():
	print "In /api/push"
	notification = flask.request.get_json()["notification"]
	userName = flask.request.get_json()["userName"]
	img_url = flask.request.get_json()["url"]

	print "notification: ", notification
	notifications.append(notification)
	#save to mongodb
	userData = {
	  "name":  userName,
	  "notification": notification,
	  "url": img_url,
	  "timestamp": datetime.datetime.utcnow()
	}

	collection = db["users"]
	user_id = collection.insert(userData)
	print "Notification submitted successfully for user with id: ", str(user_id)
	increaseVoteCount(notification)

	#notifications.append(notification)
	return flask.jsonify(
	    message="success"
	)

@app.route("/api/adminLogin", methods=["POST"])
def checkAdminCredentials():
	body = flask.request.get_json()
	print "body is: ", body
	message = "error"
	if body.get("email") == "admin@curiouscatfinder.com":
		print "Success"
		message = "success"

	return flask.jsonify(
        message=message
	)

@app.route("/api/signup", methods=["POST"])
def signupUser():
	## create a hash and salt password from the data 
	## store the name and email in the userCredentials collection
	body = flask.request.get_json()
	email = body["email"]
	password = body["password"]

	hashpassword = generate_password_hash(password)
	collection = db["userCredentials"]

	data = {
	   "email": email,
	   "password": hashpassword
	}

	user_id = collection.insert(data)
	return flask.jsonify(
       message="success",
       name=email.split("@")[0]
	)


@app.route("/api/login", methods=["POST"])
def checkUserLogin():
	body = flask.request.get_json()
	print "Body in user login: ", body
	message = "error"

	#check if user is present in DB
	email = body["email"]
	password = body["password"]

	collection = db["userCredentials"]
	user = collection.find_one({"email": email})
	print "User in login from db: ", user

	hashedpassword = user["password"]
	checkhash = check_password_hash(hashedpassword, password)

	if user != None and checkhash == True:
		message = "success"

	return flask.jsonify(
       message=message,
       name=email.split("@")[0]
	)

@app.route("/api/admin")
def checkNotifications():
	if len(notifications) != 0:
		return flask.jsonify(
            message=notifications.pop(),
            voteCount=voteCount
		)
	else:
		return flask.jsonify(
           message="waiting",
           voteCount=voteCount
		)


if __name__ == "__main__":
  port = int(os.environ.get("PORT", 5000))
  app.run(host="0.0.0.0", port=port)
