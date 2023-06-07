#!/usr/bin/env python3

# Standard library imports
import json

# Remote library imports
from flask import request, session, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api
from models import User, Attraction, Adventure


# Views go here!
@app.route('/')
def home():
    return 'Magic Mountain Adventures!'

class Users(Resource):
    def get(self):
        return [user.to_dict() for user in User.query.all()], 200
    
    def post(self):
        try:
            new_user = User(
                username=request.form['username'],
                first_name=request.form['first_name'],
                last_name=request.form['first_name'],
                height=request.form['height']
            )
        
            db.session.add(new_user)
            db.session.commit()

            new_user_dict = new_user.to_dict()

            return new_user_dict, 201
        except:
            return {'error': '400: Validation error'}, 400
    
api.add_resource(Users, '/users')

class UserById(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()

        if user:
            return user.to_dict(), 200
        else:
            return {'error': '404: User not found'}, 404
        
    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        for attr in request.json():
            setattr(user, attr, request.json()[attr])

        db.session.add(user)
        db.session.commit()

        response = make_response(
            user.to_dict(), 202
        )

        return response
        
    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            db.session.delete(user)
            db.session.commit()

            response = make_response("", 204)

            return response

        return {'error': "User not found"}, 404
        
api.add_resource(UserById, '/users/<int:id>')

class Attractions(Resource):
    def get(self):
        attractions_list = list()
        for attraction in Attraction.query.all():
            attraction_dict = attraction.to_dict()
            if "description" in attraction_dict:
                if type(attraction_dict["description"]) == str:
                    attraction_dict['description'] = json.loads(attraction_dict['description'])

            attractions_list.append(attraction_dict)

        # for attraction_obj in attractions_list:
        #     if "description" in attraction_obj:
        #         if type(attraction_obj["description"]) == str:
        #             attraction_obj['description'] = json.loads(attraction_obj['description'])
            
        # attractions_dicts = [attraction.to_dict() for attraction in Attraction.query.all()], 200
        # [json.loads(attraction.description) for attraction in attractions_dicts]
        return attractions_list, 200


    
api.add_resource(Attractions, '/attractions')

class AttractionById(Resource):
    def get(self, id):
        attraction = Attraction.query.filter_by(id=id).first()

        if attraction:
            attraction_dict = {
                'name': attraction.name, 
                'url': attraction.url,
                'description': json.loads(attraction.description)
            }
            return attraction_dict, 200
        else:
            return {'error': '404: Attraction not found'}, 404

    def patch(self, id):
        attraction = Attraction.query.filter_by(id=id).first()
        for attr in request.json():
            setattr(attraction, attr, request.json()[attr])

        db.session.add(attraction)
        db.session.commit()

        response = make_response(
            attraction.to_dict(), 202
        )

        return response

api.add_resource(AttractionById, '/attractions/<int:id>')

class Adventures(Resource):
    def get(self):
        return [adventure.to_dict() for adventure in Adventure.query.all()]
    
    def post(self):
        try:
            new_adventure = User(
                user_id=request.form['user_id'],
                attraction_id=request.form['first_name'],
                ridden=False
            )
        
            db.session.add(new_adventure)
            db.session.commit()

            new_adventure_dict = new_adventure.to_dict()

            return new_adventure_dict, 201
        except:
            return {'error': '400: Validation error'}, 400

api.add_resource(Adventures, '/adventures')

class AdventureById(Resource):
    def get(self, id):
        adventure = Adventure.query.filter_by(id=id).first()

        if adventure:
            return adventure.to_dict(), 200
        else:
            return {'error': '404: Attraction not found'}, 404
        
    def patch(self, id):
        adventure = Adventure.query.filter_by(id=id).first()
        for attr in request.json():
            setattr(adventure, attr, request.json()[attr])

        db.session.add(adventure)
        db.session.commit()

        response = make_response(
            adventure.to_dict(), 202
        )

        return response
    
    def delete(self, id):
        adventure = Adventure.query.filter_by(id=id).first()

        if adventure:
            db.session.delete(adventure)
            db.session.commit()

            response = make_response("", 204)

            return response
        return {'error': "Adventure not found"}, 404
    
api.add_resource(AdventureById, '/adventures/<int:id>')

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
