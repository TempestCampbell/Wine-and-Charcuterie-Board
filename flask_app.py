from flask import Flask, render_template, redirect
from flask_sqlalchemy import SQLAlchemy
from config import pw

# Create an instance of Flask
app = Flask(__name__)

# Use flask_sqlalchemy to set up sql connection locally
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://postgres:{pw}@localhost:5432/WineCharcuteriedb'
db = SQLAlchemy(app)



if __name__ == '__main__':
<<<<<<< HEAD
   db.create_all()
=======
>>>>>>> mk/coding
   app.run(debug = True)