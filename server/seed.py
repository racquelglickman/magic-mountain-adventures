#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Attraction, Adventure

attractions = []

def make_attraction(name, type, thrill, height):
    new_attraction = Attraction(
        name = name,
        type = type,
        thrill_level = thrill,
        height_req = height,
    )
    
    attractions.append(new_attraction)

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        db.session.delete(User)
        db.session.delete(Attraction)
        db.session.delete(Adventure)
        


