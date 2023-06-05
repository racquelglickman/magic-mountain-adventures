from sqlalchemy_serializer import SerializerMixin

from config import db

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    height = db.Column(db.Integer)

    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    def __repr__(self):
        return f"<User: {self.last_name}, {self.first_name} / Username: {self.username}>"

class Attraction(db.Model, SerializerMixin):
    __tablename__ = 'attractions'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)

    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    def __repr__(self):
        pass

class Adventure(db.Model, SerializerMixin):
    __tablename__ = 'adventures'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    attraction_id = db.Column(db.Integer, db.ForeignKey('attractions.id'))
    ridden = db.Column(db.Boolean, server_default = False)
    wait_time = db.Column(db.Integer)
    rating = db.Column(db.Float)
    time = db.Column(db.String)
    date = db.Column(db.DateTime, server_default = db.func.now())

    def __repr__(self): 
        return f"<User: {self.user_id} / Attraction: {self.attraction_id} / Ridden: {self.ridden}>"

