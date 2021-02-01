from flask import Flask,  jsonify # make_response, after_this_request, response,render_template, redirect, request
from flask_sqlalchemy import SQLAlchemy
import os
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
#from config import pw

################################################
# Database Setup
#################################################
engine = create_engine("postgresql://postgres:postgres@localhost:5432/WineAndDined")

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
#CheeseData = Base.classes.cheesedata
#CheeseFlavors = Base.classes.cheeseflavors
#FlavorLookups = Base.classes.flavorlookups
#WineCheesePairingData = Base.classes.winecheesepairingdata
Wines = Base.classes.wines
Wineries = Base.classes.wineries
WorldMeats = Base.classes.worldmeats

# Create session
session=Session(engine)
################################################
# Flask Setup
#################################################
# Create an instance of Flask
app = Flask(__name__)

# Use flask_sqlalchemy to set up sql connection locally
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost:5432/WineAndDined'
db = SQLAlchemy(app)

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Welcome to the Wine API! <br/>"
        f"Available Routes:<br/>"
        f"For country and recurrence number:<br/>"
        f"/api/v1.0/world<br/>"
    )

@app.route("/api/v1.0/world")
def world():
    """Query to retrieve the country and the number of wines associated with each."""
    countryCount=session.query(Wines.country, func.count(Wines.country)).group_by(Wines.country).order_by(func.count(Wines.country).desc()).all()
    countryDict=[]
    for country, count in countryCount:
        country_dict={}
        country_dict["country"]=country
        country_dict["count"]=count
        countryDict.append(country_dict)

    return jsonify(countryDict)
    #@after_this_request
    #def add_header(response):
    #    response.headers.add('Access-Control-Allow-Origin', '*')
    #    return response

#@app.route("/api/v1.0/buildtable/<country>/<filter>")
#def buildtable(country,filter)


if __name__ == '__main__':
    app.run(debug=True)