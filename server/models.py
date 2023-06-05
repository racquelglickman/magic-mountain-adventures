from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

from config import db

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String, nullable=False)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    height = db.Column(db.Integer)

    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    adventures = db.relationship("Adventure", backref="user")

    serialize_rules = ("-adventures.user",)

    @validates('username')
    def validate_username(self, key, username):
        if len(username) > 15 or len(username) < 7:
            raise ValueError("Username must be between 7 and 15 characters")
        return username
    
    @validates('first_name')
    def validate_first_name(self, key, first_name):
        if len(first_name) > 25 or len(first_name) < 1:
            raise ValueError("Please enter your first name")
        return first_name
    
    @validates('last_name')
    def validate_last_name(self, key, last_name):
        if len(last_name) > 25 or len(last_name) < 1:
            raise ValueError("Please enter your last name")
        return last_name

    def __repr__(self):
        return f"<User: {self.last_name}, {self.first_name} / Username: {self.username}>"

class Attraction(db.Model, SerializerMixin):
    __tablename__ = 'attractions'

    id = db.Column(db.Integer, primary_key = True)
    attraction_key = db.Column(db.String)
    name = db.Column(db.String, nullable=False)
    type = db.Column(db.String)
    thrill_level = db.Column(db.String)
    height_req = db.Column(db.Integer)
    avg_wait = db.Column(db.Integer)
    avg_rating = db.Column(db.Float)
    longitude = db.Column(db.String)
    latitude = db.Column(db.String)
    
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    adventures = db.relationship("Adventure", backref="attraction")

    serialize_rules = ("-adventures.attraction",)

    def __repr__(self):
        return f"<Name: {self.name} / Type: {self.type} / Average Rating: {self.avg_rating}>"

class Adventure(db.Model, SerializerMixin):
    __tablename__ = 'adventures'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    attraction_id = db.Column(db.Integer, db.ForeignKey('attractions.id'))
    ridden = db.Column(db.Boolean, default=False)
    wait_time = db.Column(db.Integer)
    rating = db.Column(db.Float)
    time = db.Column(db.String)
    date = db.Column(db.DateTime, server_default = db.func.now())

    serialize_rules = ("-user.adventures", "-attraction.adventures")

    def __repr__(self): 
        return f"<User: {self.user_id} / Attraction: {self.attraction_id} / Ridden: {self.ridden}>"

