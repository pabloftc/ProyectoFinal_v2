from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy import Table, Column, ForeignKey, Integer, String, DateTime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Cursos(db.Model):
    # _tablename_='cursos'
    id = Column(Integer, primary_key=True)
    name = Column(String(200), nullable=False)
    description = Column(String(800), nullable=False)
    created_at = Column(DateTime(), default=datetime.now())

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "created_at": self.created_at,
        }


# _tablename_='compra'
class Compra(db.Model):
    # _tablename_='cursos'
    id = db.Column(Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    total_price = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime(), default=datetime.now())
    metodopago = db.Column(db.String(50))


    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "total_price": self.total_price,
            "created_at": self.created_at,
            "metodopago": self.metodopago
        }