from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String, unique = True, nullable = False)
    _password_hash = db.Column(db.String)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    height = db.Column(db.Integer)

    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f"<User: {self.last_name}, {self.first_name} / Username: {self.username}>"

class Attraction(db.Model, SerializerMixin):
    __tablename__ = 'attractions'

    id = db.Column(db.Integer, primary_key = True)
    attraction_key = db.Column(db.String)
    name = db.Column(db.String)
    type = db.Column(db.String)
    thrill_level = db.Column(db.String)
    height_req = db.Column(db.Integer)
    avg_wait = db.Column(db.Integer)
    avg_rating = db.Column(db.Float)
    longitude = db.Column(db.String)
    latitude = db.Column(db.String)
    
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    def __repr__(self):
        return f"<Name: {self.name} / Type: {self.type} / Average Rating: {self.avg_rating}>"

class Adventure(db.Model, SerializerMixin):
    __tablename__ = 'adventures'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    attraction_id = db.Column(db.Integer, db.ForeignKey('attractions.id'))
    ridden = db.Column(db.Boolean)
    wait_time = db.Column(db.Integer)
    rating = db.Column(db.Float)
    time = db.Column(db.String)
    date = db.Column(db.DateTime, server_default = db.func.now())

    def __repr__(self): 
        return f"<User: {self.user_id} / Attraction: {self.attraction_id} / Ridden: {self.ridden}>"

