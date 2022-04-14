from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy import Table, Column, ForeignKey, Integer, String, DateTime

db = SQLAlchemy()

class User(db.Model):
    __tablename__='user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    rol = db.Column(db.String(30))

    #Está presente el "is_active", por lo que se debe agregar un valor en el registro por defecto
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)


#def __init__(self, username, email, password, is_active):
   # self.username = username
    #self.email = email
   # self.password = password
   # self.is_active = is_active


    def __repr__(self):
        return '<User %r>' % self.username
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "rol": self.rol,
            # do not serialize the password, its a security breach
        }


#class User(db.Model):
#    id = db.Column(db.Integer, primary_key=True)
#    username = db.Column(db.String(50), unique=True, nullable=False)
#    email = db.Column(db.String(120), unique=True, nullable=False)
#    password = db.Column(db.String(80), unique=False, nullable=False)
#
#    def __repr__(self):
#        return '<User %r>' % self.username
#
#    def serialize(self):
#        return {
#            "id": self.id,
#            "username": self.username,
#            "email": self.email,
#            # do not serialize the password, its a security breach
#        }

class Cursos(db.Model):
    __tablename__ = 'cursos'
    # _tablename_='cursos'
    id = db.Column(Integer, primary_key=True)
    name = db.Column(String(300), nullable=False)
    description = db.Column(String(600), nullable=False)
    categoria = db.Column(String(80), nullable=False)
    url = db.Column(db.String(300))
    url_portada = db.Column(db.String(300))
    precio = db.Column(db.Integer, nullable=False)
    duracion = db.Column(db.String(250))
    created_at = db.Column(DateTime(), default=datetime.now())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    rel_user = db.relationship("User", cascade="all, delete")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "categoria": self.categoria,
            "url": self.url,
            "url_portada": self.url_portada,
            "precio": self.precio,
            "duracion": self.duracion,
            "created_at": self.created_at,
            "user_id": self.user_id
        }


# _tablename_='compra'

class Pedidos(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    precio_total = db.Column(db.Integer)
    created_at = db.Column(db.DateTime(), default=datetime.now())
    metodo_de_pago = db.Column(db.Integer)
    curso_id = db.Column(db.Integer, db.ForeignKey('cursos.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    
    def serialize(self):
        return {
            "id": self.id,
            "precio_total": self.precio_total,
            "metodo_de_pago": self.metodo_de_pago,
            "curso_id": self.curso_id,
            "user_id": self.user_id,
            "created_at": self.created_at,
        }    