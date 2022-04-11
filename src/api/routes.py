"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Cursos, Pedidos
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)


@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user=User(email=email, password=password)
    if len(User.query.filter_by(email=email, password=password).all()) > 0:
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token)   
    else:
        return jsonify({"msg": "Bad username or password"}), 401    

@api.route("/detalle_curso", methods=["GET"])
def detalle_curso():
    name = request.args.get("name", None)
    print(name)
    detalleCursos = Cursos.query.filter_by(name= name).all()
    detalleCursos = Cursos.query.filter(Cursos.name.ilike("%"+name+"%")).all()
    if len(detalleCursos) == 0:
        return jsonify([]), 200
    else:
        lista = []
        for det in detalleCursos:
            lista.append(det.serialize())
        return jsonify(lista), 200

#CREO QUE DEBIESE HACER UN FETCH DESDE EL FRONT-END DE DETALLE CURSO, ME FALTA PONER EL IF, SI EL CURSO ESTÁ IR A VISTA DETALLE SINO MOSTRAR UN MENSAJE.
        return jsonify({"msg": "Bad username or password"}), 401


@api.route("/register", methods=["POST"])
def register():
    username = request.json.get("username", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user=User(username=username, email=email, password=password)
    #len es una función que cuenta el largo de un array, y en el código de a continuación dice si el largo del array es mayor a 0 entonces error, porque ya existe un usuario con esos datos.
    if len(User.query.filter_by(username=username).all()) > 0:
        return jsonify({"Error": "Ya existe un usuario registrado con este nombre en la plataforma"}), 400
    else:
        db.session.add(user)
        db.session.commit()
    
    return jsonify({"success": "Su usuario ha sido creado en la plataforma"}), 201

# Crear Usuario
@api.route("/usuarios", methods=["POST"])
def crear_user():
    username = request.json.get("username", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    rol = request.json.get("rol", None)
    is_active = request.json.get("is_active", None)
    user=User(username=username, email=email, password=password, rol=rol, is_active = is_active)
    #len es una función que cuenta el largo de un array, y en el código de a continuación dice si el largo del array es mayor a 0 entonces error, porque ya existe un usuario con esos datos.
    if len(User.query.filter_by(username=username).all()) > 0:
        return jsonify({"Error": "Ya existe un usuario registrado con este nombre en la plataforma"}), 400
    else:
        db.session.add(user)
        db.session.commit()
    
    return jsonify({"success": "Su usuario ha sido creado en la plataforma"}), 201

#Todos los usuarios
@api.route("/usuarios", methods=["GET"])
def lista_usuarios():
    lista_usuarios = User.query.all()
    todos_los_usuarios = list(map(lambda x: x.serialize(), lista_usuarios))
    return jsonify(todos_los_usuarios)

#Borrar un Usuario
@api.route('/usuarios/<int:id>', methods=["DELETE"])
def borrar_usuario(id):
    usuario = User.query.get(id)

    db.session.delete(usuario)
    db.session.commit()

    return jsonify({"msg": "Usuario Eliminado"})

# Editar Usuario
@api.route("/usuarios/<int:id>", methods=["PUT"])
def editar_user(id):
    user = User.query.get(id)
    body=request.get_json()

    user.username=body["username"]
    user.email=body["email"]
    user.password=body["password"]
    user.rol=body["rol"]
    user.is_active=body["is_active"]

    db.session.commit()
    
    return jsonify({"success": "Su usuario ha sido actualizado en la plataforma"}), 201
# Get Todos los cursos
@api.route('/cursos', methods=['GET'])
def todos_los_cursos():
    lista_cursos = Cursos.query.all()
    todos_los_cursos = list(map(lambda x: x.serialize(), lista_cursos))
    return jsonify(todos_los_cursos)

# Get Curso por id
@api.route('/cursos/<id>', methods=['GET'])
def get_curso(id):
    curso = Cursos.query.get(id)
    el_curso = curso.serialize()
    return jsonify(el_curso)


# Crear Curso

@api.route("/cursos", methods=["POST"])
def crear_curso():
    id = request.json.get("id")
    name = request.json.get("name")
    description = request.json.get("description")
    categoria = request.json.get("categoria")
    url = request.json.get("url")
    url_portada = request.json.get("url_portada")
    precio = request.json.get("precio")
    duracion = request.json.get("duracion")
    created_at = request.json.get("created_at")
    user_id = request.json.get("user_id")

    nuevo_curso = Cursos(id=id, name=name, description=description, categoria=categoria, url=url, url_portada=url_portada, precio=precio, duracion=duracion, created_at=created_at, user_id = user_id)
    
    db.session.add(nuevo_curso)
    db.session.commit()

    return jsonify({"success": "Su curso ha sido creado en la plataforma, "}), 200

# Editar Curso

@api.route("/cursos/<id>", methods=["PUT"])
def editar_curso(id):
    curso = Cursos.query.get(id)

    name = request.json.get("name")
    description = request.json.get("description")
    categoria = request.json.get("categoria")
    url = request.json.get("url")
    url_portada = request.json.get("url_portada")
    precio = request.json.get("precio")
    duracion = request.json.get("duracion")

    curso.name = name
    curso.description = description
    curso.categoria = categoria
    curso.url = url
    curso.url_portada = url_portada
    curso.precio = precio
    curso.duracion = duracion
    
    db.session.commit()

    return jsonify({"success": "Su curso ha sido editado en la plataforma, "}), 200

# Eliminar Curso

@api.route('/cursos/<id>', methods=['DELETE'])
def eliminar_curso(id):
    curso = Cursos.query.get(id)

    db.session.delete(curso)
    db.session.commit()

    return jsonify(curso)

