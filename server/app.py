#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api
from models import User

# Views go here!

class Signup(Resource):

    def post(self):

        password = request.json['password']
        
        user = User(
            username = request.json['username'],
            first_name = request.json['first_name'],
            last_name = request.json['last_name'],
            height = request.json['height']
        )
        
        user.password_hash = password

        try:

            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id

            return user.to_dict(), 201
        
        except IntegrityError:

            return {'error': '422 Unprocessable Entity'}, 422
        
class CheckSession(Resource):

    def get(self):

        if session.get('user_id'):

            user = User.query.filter(User.id == session['user_id']).first()

            return user.to_dict(), 200
        
        return {'error': '401 Unauthorized'}, 401
    
class Login(Resource):

    def post(self):

        username = request.json['username']
        password = request.json['password']

        user = User.query.filter(User.username == username).first()

        if user:
            if user.authenticate(password):

                session['user_id'] = user.id
                return user.to_dict(), 200
            
        return {'error': '401 Unauthorized'}, 401
    
class Logout(Resource):

    def delete(self):

        if session.get('user_id'):

            session['user_id'] = None

            return {}, 204
        
        return {'error': '401 Unauthorized'}, 401
    
api.add_resource(Signup, '/signup')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')



if __name__ == '__main__':
    app.run(port=5555, debug=True)
