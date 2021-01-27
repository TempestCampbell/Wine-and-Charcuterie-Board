from flask import Flask, render_template, redirect
from flask_sqlalchemy import SQLAlchemy

# Create an instance of Flask
app = Flask(__name__)

# Use flask_sqlalchemy to set up sql connection locally
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@server/db'
db = SQLAlchemy(app)



if __name__ == '__main__':
   db.create_all()
   app.run(debug = True)