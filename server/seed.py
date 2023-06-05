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



