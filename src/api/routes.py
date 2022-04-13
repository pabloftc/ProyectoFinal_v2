"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Cursos, Pedidos
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from datetime import datetime

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

#endpoint del login
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

#endpoint del detalle de un curso
@api.route("/detalle_curso", methods=["GET"])
def detalle_curso():
    name = request.args.get("name")
    if name == None:
        name = ""
    # detalleCursos = Cursos.query.filter_by(name= name).all()
    detalleCursos = Cursos.query.filter(Cursos.name.ilike("%"+name+"%")).all()
    if len(detalleCursos) == 0:
        return jsonify([]), 200
    else:
        lista = []
        for det in detalleCursos:
            lista.append(det.serialize())
        return jsonify(lista), 200

#CREO QUE DEBIESE HACER UN FETCH DESDE EL FRONT-END DE DETALLE CURSO, ME FALTA PONER EL IF, SI EL CURSO ESTÁ IR A VISTA DETALLE SINO MOSTRAR UN MENSAJE.
        # return jsonify({"msg": "Bad username or password"}), 401

@api.route("/detalle_curso/<int:id>", methods=["GET"])
def get_course(id):
    
    curso = Cursos.query.get(id)
    un_curso = curso.serialize()

    return jsonify(un_curso), 200

#endpoint del registro de usuario
@api.route("/register", methods=["POST"])
def register():
    response = {'mensaje': '', 'status': ''}
    try:
        username = request.json.get("username", None)
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        #acá se debería cambiar el rol a "user" en el paréntesis
        rol = request.json.get("user", None)
        #is_active = request.json.get("is_active", None)

        if username != None and email != None and password != None:

            existing_user = User.query.filter_by(email=email).first()

            if existing_user:
                response['mensaje'] = 'Este correo ya está en uso'
                response['status'] = 500
            else:
                user=User(username=username, email=email, password=password, rol="user", is_active=True)
                db.session.add(user)
                db.session.commit()
                response['mensaje'] = 'Perfecto'
                response['status'] = 200
    except Exception as e:
        print(f'registerfailed: {e}')
    return jsonify(response['mensaje']), response['status']

#endpoint de comprar
@api.route("/compra", methods=["GET"])
def compra():
    try:
        response_body = [
            {"name": cursos.name, "description": cursos.description, "precio": cursos.precio }
            for cursos in Cursos.query.all()
        ]
        return jsonify(response_body), 200
    except Exception as e:
        print(f"Error: {e}")
        return "Error", 500


#endpoint de compra con post para enviar dato a la base de datos
@api.route("/compra", methods=["POST"])
def guardarcompra():
    response = {'mensaje': '', 'status': ''}
    try:
        precio_total = request.json.get("precio_total", None)
        metodo_de_pago = request.json.get("metodo_de_pago", None)
        created_at = request.json.get("created_at", None)
        curso_id = request.json.get("curso_id", None)

        if precio_total != None and metodo_de_pago != None and curso_id != None:

            existing_pedidos = Pedidos.query.filter_by(curso_id=curso_id).first()

            if existing_pedidos:
                response['mensaje'] = 'Ya tienes comprado este curso'
                response['status'] = 500
            else:
                pedidos=Pedidos(precio_total=precio_total, metodo_de_pago=metodo_de_pago, created_at=created_at, curso_id=curso_id)#, user_id=user_id )
                db.session.add(pedidos)
                db.session.commit()
                response['mensaje'] = 'Compra exitosa'
                response['status'] = 200
    except Exception as e:
        print(f'pedidosfailed: {e}')
    return jsonify(response['mensaje']), response['status']


#obtener datos del proceso de compra
@api.route("/payment_form", methods=["POST"])
def payment():
    response = {'mensaje': '', 'status': ''}
    try:
        precio_total = request.json.get("precio_total", None)
        metodo_de_pago = request.json.get("metodo_de_pago", None)
        created_at = request.json.get("created_at", None)
        curso_id = request.json.get("curso_id", None)
        #user_id = request.json.get("user_id", None)

        if precio_total != None and metodo_de_pago != None and curso_id != None: #and user_id != None:

            existing_pedidos = Pedidos.query.filter_by(curso_id=curso_id).first()

            if existing_pedidos:
                response['mensaje'] = 'Ya tienes comprado este curso'
                response['status'] = 500
            else:
                pedidos=Pedidos(precio_total=precio_total, metodo_de_pago=metodo_de_pago, created_at=created_at, curso_id=curso_id)#, user_id=user_id )
                db.session.add(pedidos)
                db.session.commit()
                response['mensaje'] = 'Compra exitosa'
                response['status'] = 200
    except Exception as e:
        print(f'pedidosfailed: {e}')
    return jsonify(response['mensaje']), response['status']

#para mandar email
#@app.route("/send-email", methods=["POST"])
#def sendemail():
#    response = {'mensaje': '', 'status': ''}
#    try:
#        name = request.json.get("name", None)
#        description = request.json.get("description", None)
#        categoria = request.json.get("categoria", None)
#        precio = request.json.get("precio", None)
#        for cursos in Cursos.query.all()
#
#        message = Mail(
#            from_email="matthegamer@gmail.com"
#            
#        )



#@app.listen(3000, () => {
   # console.log("Servidor en -> http://localhost:3000")
#})