#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource

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
        return [attraction.to_dict() for attraction in Attraction.query.all()], 200
    
api.add_resource(Attractions, '/attractions')

class AttractionById(Resource):
    def get(self, id):
        attraction = Attraction.query.filter_by(id=id).first()

        if attraction:
            return attraction.to_dict(), 200
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


if __name__ == '__main__':
    app.run(port=5555, debug=True)
