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
import smtplib
from email.message import EmailMessage
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import os

API_KEY = os.environ.get("SENDGRID_API_KEY")

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
    user= User.query.filter_by(email=email, password=password).all()
    if len(user) > 0:
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token, user_id=user[0].id, rol=user[0].rol)   
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

@api.route("/cursos", methods=["POST"])
def post_course():
    response = {'mensaje': '', 'status': ''}
    try:
        nombreCurso = request.json.get('nombreCurso')
        descripcionCurso = request.json.get('descripcionCurso')
        duracionCurso = request.json.get('duracionCurso')
        categoriaCurso = request.json.get('categoriaCurso')
        urlCurso = request.json.get('urlCurso')
        imgCurso = request.json.get('imgCurso')
        precioCurso = request.json.get('precioCurso')

        course = Cursos(name=nombreCurso, description=descripcionCurso, duracion=duracionCurso, categoria=categoriaCurso, url=urlCurso, url_portada=imgCurso, precio=precioCurso)
        existing_course = Cursos.query.filter_by(name=nombreCurso).first()

        if existing_course:
            response['mensaje'] = 'Este Curso ya existe'
            response['status'] = 500
        else:
            db.session.add(course)
            db.session.commit()
            response['mensaje'] = 'Curso agregado!'
            response['status'] = 200
    except Exception as e:
        print(f'El curso no pudo ser agregado: {e}')
    return jsonify(response['mensaje']), response['status']

@api.route('/cursos/<int:id>', methods=['DELETE'])
def eliminar_curso(id):
    curso = Cursos.query.get(id)

    db.session.delete(curso)
    db.session.commit()

    return ("Curso Eliminado")

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

# Get Cursos por id user
@api.route('/miscursos/<int:user_id>', methods=['GET'])
def get_cursos_user(user_id):
    curso = Cursos.query.filter_by(user_id = user_id)
    los_cursos = list(map(lambda x: x.serialize(), curso))
    return jsonify(los_cursos)

# Crear Curso

@api.route("/miscursos", methods=["POST"])
def crear_curso():
    id = request.json.get("id")
    name = request.json.get("name")
    description = request.json.get("description")
    categoria = request.json.get("categoria")
    url = request.json.get("URL")
    url_portada = request.json.get("URLPortada")
    precio = request.json.get("precio")
    duracion = request.json.get("duracion")
    created_at = request.json.get("created_at")
    user_id = request.json.get("user_id")

    nuevo_curso = Cursos(id=id, name=name, description=description, categoria=categoria, url=url, url_portada=url_portada, precio=precio, duracion=duracion, created_at=created_at, user_id = user_id)
    
    db.session.add(nuevo_curso)
    db.session.commit()

    return jsonify({"success": "Su curso ha sido creado en la plataforma, "}), 200

# Editar Curso

@api.route("/miscursos/<int:id>", methods=["PUT"])
def editar_curso(id):
    curso = Cursos.query.get(id)

    name = request.json.get("name")
    description = request.json.get("description")
    categoria = request.json.get("categoria")
    url = request.json.get("URL")
    url_portada = request.json.get("URLPortada")
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

@api.route('/miscursos/<int:id>', methods=['DELETE'])
def eliminar_curso_user(id):
    curso = Cursos.query.get(id)

    db.session.delete(curso)
    db.session.commit()

    return jsonify({"success": "Su curso ha sido eliminado en la plataforma "})


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
                pedidos=Pedidos(precio_total=precio_total, metodo_de_pago=metodo_de_pago, created_at=created_at)#, curso_id=curso_id)#, user_id=user_id )
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

#enpoint para enviar un correo SOLO BACKEND (No real)
@api.route("/pagocorrecto", methods=["POST"])
def correo_confirmacion():
    response = {'mensaje': "", 'status': ""}
    try:
        email = request.json.get("email", None)

        if email != None:

            existing_email = User.query.filter_by(email=email).first()

            if existing_email:
                response['mensaje'] = 'Mensaje enviado'
                response['status'] = 200
                console.log("Se mandó bien")
            else:
                response['mensaje'] = 'Correo desconocido'
                response['status'] = 500
    except Exception as e:
        print(f'enviarcorreofailed: {e}')
    return jsonify(response['mensaje']), response['status']


#endpoint para que le llegue un correo al usuario
@api.route('/email_sent', methods=['POST'])
def send_email():
    try:
        email = request.json.get("email", None)

        server = smtplib.SMTP('smtp.ethereal.email', 587)
        server.starttls()
        server.login('daphnee.damore61@ethereal.email', 'GWBHpwueXWnEf9Ut9z')

        msg = EmailMessage()
        msg.set_content('Gracias por comprar con nosotros')

        msg['Subject'] = 'Confirmación de compra'
        msg['From'] = 'sayandevelopers@sd.com'
        msg ['To'] = email

        server.send_message(msg)
        server.quit()
        return 'Email enviado con éxito'
    except Exception as e:
        print(f"Error: {e}")
        return "Error", 500

#endpoint para que le llegue un correo al usuario (gmail)
@api.route('/email_gmail', methods=['POST'])
def send_gmail():
    try:
        email = request.json.get("email", None)

        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login('mrmattkiddo@gmail.com', '')

        msg = EmailMessage()
        msg.set_content('Gracias por comprar con nosotros')

        msg['Subject'] = 'Confirmación de compra'
        msg['From'] = 'mrmattkiddo@gmail.com'
        msg ['To'] = "matthegamer@gmail.com"

        server.send_message(msg)
        server.quit()
        return 'Email enviado con éxito'
    except Exception as e:
        print(f"Error: {e}")
        return "Error", 500


#endpoint de SENDGRID para enviar correo ¡FUNCIONANDOOOOOO!
@api.route('/enviarcorreo', methods=['POST'])
def enviarcorreo():
    try:
        email = request.json.get("email", None)

        template = """
            Gracias por comprar con nosotros. ¡Disfruta tu curso!
        """
        message = Mail(
            from_email="matias.gonzalezl@usach.cl",
            to_emails=email,
            subject="Confirmación de compra",
            html_content=template
        )
        sg = SendGridAPIClient(API_KEY)
        response = sg.send(message)
        response_body = {
            "msg": "correo enviado",
        }
        return jsonify(response_body), 200
    except Exception as e:
        print(f"Error enviar correo: {e}")
        return "ERROR", 500
