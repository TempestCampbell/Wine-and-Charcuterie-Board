from flask import Flask, jsonify,  make_response, after_this_request, render_template, redirect, request
from flask_sqlalchemy import SQLAlchemy
import os
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from config import pw

################################################
# Database Setup
#################################################

engine = create_engine(f"postgresql://postgres:{pw}@localhost:5432/WineAndDined")

# engine = create_engine("postgresql://postgres:postgres@localhost:5432/WineAndDined")

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
CheeseFlavors = Base.classes.cheeseflavors
CheeseData = Base.classes.cheesedata
FlavorLookups = Base.classes.flavorlookups
WineCheesePairingData = Base.classes.winecheesepairingdata
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
app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://postgres:{pw}@localhost:5432/WineAndDined'
db = SQLAlchemy(app)

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Welcome to the Wine API! <br/>"
        f"Available Routes:<br/>"
        f"For country and recurrence number:<br/>"
        f"/api/v1.0/world<br/>"
        f"For top 100 of 'filter' for 'country': <br/>"
        f"/api/v1.0/buildtable/<countryIn>/<dropDown><br/>"
    )

@app.route("/api/v1.0/world", methods=['GET','POST'])
def world():
    """Query to retrieve the country and the number of wines associated with each."""
    countryCount=session.query(Wines.country, func.count(Wines.country)).group_by(Wines.country).order_by(func.count(Wines.country).desc()).all()
    countryDict=[]
    for country, count in countryCount:
        country_dict={}
        country_dict["country"]=country
        country_dict["count"]=count
        countryDict.append(country_dict)

    @after_this_request
    def _add_header(response):
        response.headers.add("Access-Control-Allow-Origin","*")
        return response
    
    return jsonify(countryDict)

@app.route("/api/v1.0/buildtable/<countryIn>")
@app.route("/api/v1.0/buildtable/<countryIn>/<dropDown>")
def buildtable(countryIn=None,dropDown=None):
    """Return Wine country, points, price, title, variety, and vintage for a specified country and filter."""

    if dropDown==None:
        tableQ=session.query(Wines.country, Wines.points, Wines.price, Wines.title, Wines.variety, Wines.vintage).filter(Wines.country==countryIn).order_by(Wines.points.desc()).limit(100)
    
    else:
        if dropDown == "HighestRated":
            tableQ=session.query(Wines.country, Wines.points, Wines.price, Wines.title, Wines.variety, Wines.vintage).filter(Wines.country==countryIn).order_by(Wines.points.desc()).limit(100)
        elif dropDown == "LowestRated":
            tableQ=session.query(Wines.country, Wines.points, Wines.price, Wines.title, Wines.variety, Wines.vintage).filter(Wines.country==countryIn).order_by(Wines.points).limit(100)
        elif dropDown == "Cheapest":
            tableQ=session.query(Wines.country, Wines.points, Wines.price, Wines.title, Wines.variety, Wines.vintage).filter(Wines.country==countryIn).order_by(Wines.price).limit(100)
        elif dropDown == "MostExpensive":
            tableQ=session.query(Wines.country, Wines.points, Wines.price, Wines.title, Wines.variety, Wines.vintage).filter(Wines.country==countryIn).order_by(Wines.price.desc()).limit(100)
        elif dropDown == "NewestVintage":
            tableQ=session.query(Wines.country, Wines.points, Wines.price, Wines.title, Wines.variety, Wines.vintage).filter(Wines.country==countryIn).order_by(Wines.vintage.desc()).limit(100)
        elif dropDown == "OldestVintage":
            tableQ=session.query(Wines.country, Wines.points, Wines.price, Wines.title, Wines.variety, Wines.vintage).filter(Wines.country==countryIn).order_by(Wines.vintage).limit(100)

    # Set up dictionary
    orderDict=[]
    for country, points, price, title, variety, vintage in tableQ:
        order_dict={}
        order_dict["country"]=country
        order_dict["points"]=points
        order_dict["price"]=price
        order_dict["title"]=title
        order_dict["variety"]=variety
        order_dict["vintage"]=vintage
        orderDict.append(order_dict)
    return jsonify(orderDict)


if __name__ == '__main__':
    app.run(debug=True)