from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    rol = db.Column(db.String(20))


    def __repr__(self):
        return '<User %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Curso(db.Model):
    __tablename__ = 'curso'
    # Here we define columns for the table address.
    # Notice that each column is also a normal Python instance attribute.
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(300))
    descripcion = db.Column(db.String(600))
    categoria = db.Column(db.String(80))
    url = db.Column(db.String(300))
    url_portada = db.Column(db.String(300))
    precio = db.Column(db.Integer)
    duracion = db.Column(db.String(250))
    created_at = db.Column(db.DateTime(), default=datetime.now())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

class Pedidos(db.Model):
    __tablename__ = 'pedidos'
    id = db.Column(db.Integer, primary_key=True)
    precio_total = db.Column(db.Integer)
    created_at = db.Column(db.DateTime(), default=datetime.now())
    metodo_de_pago = db.Column(db.Integer)
    curso_id = db.Column(db.Integer, db.ForeignKey('curso.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))