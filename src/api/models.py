from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    firstName = db.Column(db.String(80), unique=False, nullable=False)
    lastName = db.Column(db.String(80), unique=False, nullable=False)
    phone = db.Column(db.Integer, unique=False, nullable=False)
    securityKey = db.Column(db.Integer, unique=False, nullable=False)
    
    # is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.firstName

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "firstName": self.firstName,
            "lastName": self.lastName,
            "phone": self.phone
            # do not serialize the password, its a security breach
}

class Recinto(db.Model):
    __tablename__ = 'recinto'
    id = db.Column(db.Integer, primary_key=True)
    nameRecinto = db.Column(db.String(80), unique=True, nullable=False)
    openHour= db.Column(db.Integer, unique=False, nullable=False)
    closeHour= db.Column(db.Integer, unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.Integer, unique=True, nullable=False)
    
    # is_active = db.Column(db.Boolean(), unique=False, nullable=False)
   
    def __repr__(self):
        return '<Recinto %r>' % self.nameRecinto

    def serialize(self):
        return {
            "id": self.id,
            "nameRecinto": self.nameRecinto,
            "openHour": self.openHour,
            "closeHour": self.closeHour,
            "email": self.email,
            "phone": self.phone
}

class Reserva(db.Model):
    __tablename__ = "reservas"
    id = db.Column(db.Integer, primary_key=True)
    idRecinto = db.Column(db.Integer, unique=False, nullable=False)
    horaReserva = db.Column(db.Integer(), unique=False, nullable=False)
    diaReserva = db.Column(db.String(10), unique=False, nullable=False)

    def __repr__(self):
        return '<Reservas %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "idRecinto": self.idRecinto,
            "horaReserva": self.horaReserva,
            "diaReserva": self.diaReserva
}           