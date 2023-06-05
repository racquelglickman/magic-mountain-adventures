from sqlalchemy_serializer import SerializerMixin

from config import db

# Models go here!
class User(db.Model, SerializerMixin):
    pass

class Attraction(db.Model, SerializerMixin):
    pass

class Adventure(db.Model, SerializerMixin):
    pass
