from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail, Message
from flask_cors import CORS
import random

app = Flask(__name__)
app.config.from_object('config.Config')

db = SQLAlchemy(app)
mail = Mail(app)
CORS(app)

# Database Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    email = db.Column(db.String(120), unique=True)
    phone = db.Column(db.String(10))
    password = db.Column(db.String(100))
    is_verified = db.Column(db.Boolean, default=False)

# OTP Store
otp_store = {}

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    otp = str(random.randint(100000, 999999))
    otp_store[data['email']] = otp

    msg = Message('IMT Email Verification OTP', recipients=[data['email']])
    msg.body = f"Your OTP for IMT registration is: {otp}"
    mail.send(msg)

    return jsonify({'message': 'OTP sent to email.'})

@app.route('/verify-otp', methods=['POST'])
def verify_otp():
    data = request.json
    email = data['email']
    if otp_store.get(email) == data['otp']:
        new_user = User(
            first_name=data['firstName'],
            last_name=data['lastName'],
            email=email,
            phone=data['phone'],
            password=data['password'],  # Hash this in production
            is_verified=True
        )
        db.session.add(new_user)
        db.session.commit()
        otp_store.pop(email, None)
        return jsonify({'message': 'User registered successfully.'})
    return jsonify({'message': 'Invalid OTP'}), 400

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
