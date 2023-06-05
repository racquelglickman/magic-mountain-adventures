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

def make_users():
    users = []
    for i in range(25):
        first_name=fake.first_name()
        last_name=fake.last_name()
        user = User(
            first_name=first_name,
            last_name=last_name,
            username=f'{first_name}.{last_name}',
            height=randint(30, 60)
        )
        users.append(user)

    return users

def make_adventures(attractions, users):
    adventures = []
    for i in range(200):
        adventure = Adventure(
            user_id=rc([user.id for user in users]),
            attraction_id =rc([attraction.id for attraction in attractions]),
            ridden=False
        )
        adventures.append(adventure)
    
    return adventures

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
        make_attraction("West Coast Racers", "Roller Coaster", "Maximum", 54)
        make_attraction("Twisted Colossus", "Roller Coaster", "Maximum", 48)
        make_attraction("Scream", "Roller Coaster", "Moderate", 54)
        make_attraction("Roaring Rapids", "Water", "Moderate", 42)
        make_attraction("Road Runner Express", "Roller Coaster", "Mild", 36)
        make_attraction("Pepe LePew’s Tea Party", "Kids", "Mild", 42)
        make_attraction("Magic Flyer", "Roller Coaster", "Mild", 0)
        make_attraction("Lex Luthor: Drop of Doom", "Flat", "Maximum", 48)
        make_attraction("JUSTICE LEAGUE: Battle for Metropolis", "Dark", "Mild", 48)
        make_attraction("Yosemite Sam’s Flight School", "Kids", "Mild", 42)
        make_attraction("X2", "Roller Coaster", "Maximum", 48)
        make_attraction("Scrambler", "Flat", "Mild", 36)
        make_attraction("Pacific Speedway", "Flat", "Moderate", 40)
        make_attraction("Ninja", "Roller Coaster", "Moderate", 42)
        make_attraction("Merrie Melodies Carousel", "Kids", "Mild", 0)
        make_attraction("Jet Stream", "Water", "Moderate", 0)
        make_attraction("Grand American Carousel", "Kids", "Mild", 0)
        make_attraction("Goliath", "Roller Coaster", "Maximum", 48)
        make_attraction("Gold Rusher", "Roller Coaster", "Moderate", 48)

        print("Seeding attractions...")
        db.session.add_all(attractions)
        db.session.commit()

        print("Seeding users...")
        users = make_users()
        db.session.add_all(users)
        db.session.commit()

        print("Seeding adventures...")
        adventures = make_adventures(attractions, users)
        db.session.add_all(adventures)
        db.session.commit()

        print("Seeding done.")

