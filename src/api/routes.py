"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Recinto, Reserva
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import datetime
from random import randint

api = Blueprint('api', __name__)


@api.route('/create-user', methods=['POST'])
def create_user():

    email = request.json.get("email", None)
    password = request.json.get("password", None)
    firstName = request.json.get("firstName", None)
    lastName = request.json.get("lastName", None)
    phone = request.json.get("phone", None)

    if not email:
        return "Email requerido", 401
    if not password:
        return "Password requerido", 401
    if not firstName:
        return "Nombre requerido", 401
    if not lastName:
        return "Apellido requerido", 401
    if not phone:
        return "Telefono requerido", 401

    email_query = User.query.filter_by(email=email).first()
    if email_query:
        return "This email has been already taken", 401

    user = User()
    user.email = email
    user.firstName = firstName
    user.lastName = lastName
    user.phone = phone
    user.securityKey = 0
    # hashed_password = generate_password_hash(password)
    user.password = password
    print(user)
    db.session.add(user)
    db.session.commit()

    response = {
        "msg": "Usuario Creado Satisfactoriamente",
        "name": firstName
    }
    return jsonify(response), 200


@api.route('/login', methods=['POST'])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not email:
        return jsonify({"msg": "Información inválida"}), 200
    if not password:
        return jsonify({"msg": "Información inválida"}), 200

    user = User.query.filter_by(email=email).first()

    if(user.securityKey != 0):
        return jsonify({"msg": "Cuenta en proceso de recuperación"}), 200

    if not user:
        return jsonify({"msg": "Información inválida"}), 200
    if (user.password != password):
        return jsonify({"msg": "Información inválida"}), 200

    expiration = datetime.timedelta(days=5)
    access_token = create_access_token(
        identity=user.email, expires_delta=expiration)

    response = {
        "user": user.serialize(),
        "token": access_token
    }

    return jsonify(response), 200

# Aqui parten las funciones de recinto


@api.route('/recinto/', methods=['POST'])
def create_recinto():

    nameRecinto = request.json.get("nameRecinto", None)
    openHour = request.json.get("openHour", None)
    closeHour = request.json.get("closeHour", None)

    recinto = Recinto()
    recinto.nameRecinto = nameRecinto
    # hashed_password = generate_password_hash(password)
    recinto.openHour = openHour
    recinto.closeHour = closeHour
    print(recinto)
    db.session.add(recinto)
    db.session.commit()

    response = {
        "msg": "Recinto Creado Satisfactoriamente",
        "name": nameRecinto
    }
    return jsonify(response), 200


@api.route('/recinto/<int:id>', methods=['GET'])
def get_recinto(id):

    recinto = Recinto.query.all()
    recinto = list(map(lambda x: x.serialize(), recinto))
    response_body = {
        "recintos": recinto[id]
    }

    return jsonify(response_body), 200


@api.route('/validate', methods=['POST'])
def validate():
    email = request.json.get("email", None)
    token = request.json.get("numberToken", None)

    if not email:
        return jsonify({"msg": "Error al validar informacion"}), 201
    if not token:
        return jsonify({"msg": "Error al validar informacion"}), 201

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"msg": "Error al validar informacion"
                        }), 201

    user.password = randint(100000, 90000000)
    user.securityKey = token
    db.session.commit()

    response = {
        "name": user.firstName + " " + user.lastName,
        "msg": "Token Modificado Successfully"
    }
    return jsonify(response), 201


@api.route('/modifypass', methods=['POST'])
def modify_pass():

    token = request.json.get("numberToken", None)
    password = request.json.get("password", None)

    if not token:
        return "Error try again", 401
    if not password:
        return "Error try again", 401

    selectedUser = User.query.filter_by(securityKey=token).first()

    selectedUser.securityKey = 0
    selectedUser.password = password
    print(selectedUser)
    db.session.commit()

    response = {
        "msg": "Usuario Modificado Successfully"
    }
    return jsonify(response), 200


@api.route('/reserva', methods=['POST'])
def reserva():

    recinto = request.json.get("idRecinto", None)
    hora = request.json.get("horaReserva", None)
    dia = request.json.get("diaReserva", None)

    if not recinto:
        return "Error try again", 201
    if not hora:
        return "Error try again", 201
    if not dia:
        return "Error try again", 201

    reservation = Reserva()
    reservation.idRecinto = recinto
    reservation.horaReserva = hora
    reservation.diaReserva = dia
    print(reservation)
    db.session.add(reservation)
    db.session.commit()

    response = {
        "msg": "Reserva creada Successfully"
    }
    return jsonify(response), 200


@api.route('/reserva/<int:selectedId>', methods=['GET'])
def get_reserva(selectedId):

    reservasComplejo = Reserva.query.filter_by(idRecinto=selectedId)
    reservasComplejo = list(map(lambda x: x.serialize(), reservasComplejo))
    response_body = {}
    for reserva in reservasComplejo:
        if reserva["diaReserva"] in response_body:
             response_body[reserva["diaReserva"]].append(reserva["horaReserva"])
        else:
              response_body[reserva["diaReserva"]] = [reserva["horaReserva"]]

    return jsonify(response_body), 200
