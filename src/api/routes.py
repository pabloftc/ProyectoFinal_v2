"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, redirect
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

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


@api.route("/register", methods=["POST"])
def register():
    response = {'mensaje': '', 'status': ''}
    try:
        username = request.json.get("username", None)
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        #is_active = request.json.get("is_active", None)

        if username != None and email != None and password != None:

            existing_user = User.query.filter_by(email=email).first()

            if existing_user:
                response['mensaje'] = 'Este correo ya está en uso'
                response['status'] = 500
            else:
                user=User(username=username, email=email, password=password)
                db.session.add(user)
                db.session.commit()
                response['mensaje'] = 'Perfecto'
                response['status'] = 200
    except Exception as e:
        print(f'registerfailed: {e}')
    return jsonify(response['mensaje']), response['status']



#@api.route("/register", methods=["POST"])
#def register():
  #  username = request.json.get("username", None)
  #  email = request.json.get("email", None)
  #  password = request.json.get("password", None)

 #   user=User(username=username, email=email, password=password, is_active=True)

  #  existing_user = User.query.filter_by(username=username).first()

    # len es una función que cuenta el largo de un array, y en el código de a continuación dice si el largo del array es mayor a 0 entonces error, porque ya existe un usuario con esos datos.
  #  if existing_user:
 #       return jsonify({"Error": "Ya existe un usuario registrado con este nombre en la plataforma"}), 400
#    else:
#        db.session.add(user)
 #       db.session.commit()
#        return jsonify({"success": "Su usuario ha sido creado en la plataforma"}), 201