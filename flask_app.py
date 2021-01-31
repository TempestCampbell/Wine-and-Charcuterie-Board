from flask import Flask, render_template, redirect, request, jsonify, make_response, after_this_request, response
from flask_sqlalchemy import SQLAlchemy
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from config import pw

################################################
# Database Setup
#################################################
engine = create_engine("postgres://postgres:{pw}@localhost:5432/WineCharcuterie")

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Cheese = Base.classes.cheese
Countries = Base.classes.countries
WineCheesePairingData = Base.classes.winecheesepairingdata
Wines = Base.classes.wines
Wineries = Base.classes.wineries
WorldMeats = Base.classes.worldmeats

################################################
# Flask Setup
#################################################
# Create an instance of Flask
app = Flask(__name__)

# Use flask_sqlalchemy to set up sql connection locally
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://postgres:{pw}@localhost:5432/WineCharcuterie'
db = SQLAlchemy(app)

@app.route("/api/v1.0/scatter")
def scatter():
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
        
    # Create our session from Python to the DB
    session = Session(engine)


if __name__ == '__main__':
    app.run(debug=True)