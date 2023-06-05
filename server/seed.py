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

        make_attraction('Swashbuckler', 'Flat', 'Moderate', 42)
        make_attraction("Sylvester's Pounce and Bounce", 'Kids', 'Mild', 36)
        make_attraction("Taz's Trucking Co.", 'Kids', 'Mild', 0)
        make_attraction("THE RIDDLER's Revenge", 'Roller Coaster', 'Maximum', 54)
        make_attraction("Tweety's Escape", 'Kids', 'Mild', 36)
        make_attraction("Viper", 'Roller Coaster', 'Maximum', 54)
        make_attraction("Canyon Blaster", 'Roller Coaster', 'Mild', 36)
        make_attraction("CraZanity", 'Flat', 'Maximum', 52)
        make_attraction("Daffy's Adventure Tours", 'Kids', 'Mild', 0)
        make_attraction("Elmer's Weather Balloons", 'Kids', 'Mild', 0)
        make_attraction("Jammin' Bumers", 'Flat', 'Mild', 42)
        make_attraction("Whistlestop Train", 'Transportation', 'Mild', 0)
        make_attraction("WONDER WOMAN™ Flight of Courage", 'Roller Coaster', 'Maximum', 48)
        make_attraction("TEEN TITANS™ Turbo Spin", 'Flat', 48)
        make_attraction("Apocalypse", 'Roller Coaster', 'Moderate', 48)
        make_attraction("BATMAN The Ride", 'Roller Coaster', 'Maximum', 54)
        make_attraction("Speedy Gonzales Hot Rod Racers", 'Roller Coaster', 'Moderate', 36)
        make_attraction("SUPERMAN: Escape from Krypton", 'Roller Coaster', 'Maximum', 48)
        make_attraction("Tatsu", 'Roller Coaster', 'Maximum', 54)
        make_attraction("The New Revolution – Classic", 'Roller Coaster', 'Maximum', 48)
        make_attraction("Buccaneer", 'Flat', 'Mild', 0)
        make_attraction("Dive Devil", 'Flat', 'Moderate', 48)
        make_attraction("Full Throttle", 'Roller Coaster', 'Maximum', 54)
        


