#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import sys, asyncio, json

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Attraction, Adventure

attractions = []

def make_attraction(name, type, thrill, height, url):
    new_attraction = Attraction(
        name = name,
        type = type,
        thrill_level = thrill,
        height_req = height,
        url = url
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
            height=randint(30, 76),
            _password_hash=fake.ssn()
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

async def web_getter(url):
    stuff = list()
    driver_ = webdriver.Chrome(stuff)
    driver_.get(url)
    return driver_

async def image_extractor(url):
    driver = await web_getter(url=url)

    html = driver.page_source 

    soup = BeautifulSoup(html, "html.parser")

    image_div = soup.find(class_ = "elementor-widget-theme-post-featured-image")

    image = image_div.find('img')

    return image['src']
    # print(image['src'])

async def description_extractor(url):

    driver = await web_getter(url=url)

    html = driver.page_source 

    soup = BeautifulSoup(html, "html.parser")

    paragraphs = soup.find(class_ = "elementor-widget-theme-post-content")

    p_tags = paragraphs.find_all("p")

    p_tag_texts = []
    for tag in p_tags:
        p_tag_texts.append(tag.text)

    sentence_dict = {}
    for position, text in enumerate(p_tag_texts):
        sentence_dict[position] = text

    return sentence_dict

    # use BeautifulSoup to parse HTML from detected site
    # save parsed text to Python dict
    # OPTIONAL: call _soup_taster() to clean/process parsed text
    # return parsed text in dict
    # document.querySelectorAll('.elementor-widget-theme-post-content p')


    
if __name__ == '__main__':
    
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        User.query.delete()
        Attraction.query.delete()
        Adventure.query.delete()

        # Initial Population of Attractions (w/out descriptions & images)
        make_attraction('Swashbuckler', 'Flat', 'Moderate', 42, 'https://www.sixflags.com/magicmountain/attractions/swashbuckler')
        make_attraction("Sylvester’s Pounce and Bounce", 'Kids', 'Mild', 36, 'https://www.sixflags.com/magicmountain/attractions/sylvesters-pounce-and-bounce')
        make_attraction("Taz’s Trucking Co.", 'Kids', 'Mild', 0, 'https://www.sixflags.com/magicmountain/attractions/tazs-trucking-co')
        make_attraction("THE RIDDLER’s Revenge", 'Roller Coaster', 'Maximum', 54, 'https://www.sixflags.com/magicmountain/attractions/riddlers-revenge')
        make_attraction("Tweety’s Escape", 'Kids', 'Mild', 36, 'https://www.sixflags.com/magicmountain/attractions/tweetys-escape')
        make_attraction("Viper", 'Roller Coaster', 'Maximum', 54, 'https://www.sixflags.com/magicmountain/attractions/viper')
        make_attraction("Canyon Blaster", 'Roller Coaster', 'Mild', 36, 'https://www.sixflags.com/magicmountain/attractions/canyon-blaster')
        make_attraction("CraZanity", 'Flat', 'Maximum', 52, 'https://www.sixflags.com/magicmountain/attractions/crazanity')
        make_attraction("Daffy’s Adventure Tours", 'Kids', 'Mild', 0, 'https://www.sixflags.com/magicmountain/attractions/daffys-adventure-tours')
        make_attraction("Elmer’s Weather Balloons", 'Kids', 'Mild', 0, 'https://www.sixflags.com/magicmountain/attractions/elmers-weather-balloons')
        make_attraction("Jammin’ Bumpers", 'Flat', 'Mild', 42, 'https://www.sixflags.com/magicmountain/attractions/jammin-bumpers')
        make_attraction("Whistlestop Train", 'Transportation', 'Mild', 0, 'https://www.sixflags.com/magicmountain/attractions/whistlestop-train')
        make_attraction("WONDER WOMAN™ Flight of Courage", 'Roller Coaster', 'Maximum', 48, 'https://www.sixflags.com/magicmountain/attractions/wonder-woman-flight-of-courage')
        make_attraction("TEEN TITANS™ Turbo Spin", 'Flat', 'Moderate', 48, 'https://www.sixflags.com/magicmountain/attractions/teen-titans-turbo-spin')
        make_attraction("Apocalypse", 'Roller Coaster', 'Moderate', 48, 'https://www.sixflags.com/magicmountain/attractions/apocalypse')
        make_attraction("BATMAN The Ride", 'Roller Coaster', 'Maximum', 54, 'https://www.sixflags.com/magicmountain/attractions/batman-ride')
        make_attraction("Speedy Gonzales Hot Rod Racers", 'Roller Coaster', 'Moderate', 36, 'https://www.sixflags.com/magicmountain/attractions/speedy-gonzales-hot-rod-racers')
        make_attraction("SUPERMAN: Escape from Krypton", 'Roller Coaster', 'Maximum', 48, 'https://www.sixflags.com/magicmountain/attractions/superman-escape-krypton')
        make_attraction("Tatsu", 'Roller Coaster', 'Maximum', 54, 'https://www.sixflags.com/magicmountain/attractions/tatsu')
        make_attraction("The New Revolution – Classic", 'Roller Coaster', 'Maximum', 48, 'https://www.sixflags.com/magicmountain/attractions/new-revolution-classic')
        make_attraction("Buccaneer", 'Flat', 'Mild', 0, 'https://www.sixflags.com/magicmountain/attractions/buccaneer')
        make_attraction("Dive Devil", 'Flat', 'Moderate', 48, 'https://www.sixflags.com/magicmountain/attractions/dive-devil')
        make_attraction("Full Throttle", 'Roller Coaster', 'Maximum', 54, 'https://www.sixflags.com/magicmountain/attractions/full-throttle')
        make_attraction("West Coast Racers", "Roller Coaster", "Maximum", 54, 'https://www.sixflags.com/magicmountain/attractions/west-coast-racers')
        make_attraction("Twisted Colossus", "Roller Coaster", "Maximum", 48, 'https://www.sixflags.com/magicmountain/attractions/twisted-colossus')
        make_attraction("Scream", "Roller Coaster", "Moderate", 54, 'https://www.sixflags.com/magicmountain/attractions/scream')
        make_attraction("Roaring Rapids", "Water", "Moderate", 42, 'https://www.sixflags.com/magicmountain/attractions/roaring-rapids')
        make_attraction("Road Runner Express", "Roller Coaster", "Mild", 36, 'https://www.sixflags.com/magicmountain/attractions/road-runner-express')
        make_attraction("Pepe LePew’s Tea Party", "Kids", "Mild", 42, 'https://www.sixflags.com/magicmountain/attractions/pepe-lepews-tea-party')
        make_attraction("Magic Flyer", "Roller Coaster", "Mild", 0, 'https://www.sixflags.com/magicmountain/attractions/magic-flyer')
        make_attraction("Lex Luthor: Drop of Doom", "Flat", "Maximum", 48, 'https://www.sixflags.com/magicmountain/attractions/lex-luthor-drop-doom')
        make_attraction("JUSTICE LEAGUE: Battle for Metropolis", "Dark", "Mild", 48, 'https://www.sixflags.com/magicmountain/attractions/justice-league-battle-metropolis-3')
        make_attraction("Yosemite Sam’s Flight School", "Kids", "Mild", 42, 'https://www.sixflags.com/magicmountain/attractions/yosemite-sams-flight-school')
        make_attraction("X2", "Roller Coaster", "Maximum", 48, 'https://www.sixflags.com/magicmountain/attractions/x2-coaster')
        make_attraction("Scrambler", "Flat", "Mild", 36, 'https://www.sixflags.com/magicmountain/attractions/scrambler')
        make_attraction("Pacific Speedway", "Flat", "Moderate", 40, 'https://www.sixflags.com/magicmountain/attractions/pacific-speedway')
        make_attraction("Ninja", "Roller Coaster", "Moderate", 42, 'https://www.sixflags.com/magicmountain/attractions/ninja')
        make_attraction("Merrie Melodies Carousel", "Kids", "Mild", 0, 'https://www.sixflags.com/magicmountain/attractions/merrie-melodies-carousel')
        make_attraction("Jet Stream", "Water", "Moderate", 0, 'https://www.sixflags.com/magicmountain/attractions/jet-stream')
        make_attraction("Grand American Carousel", "Kids", "Mild", 0, 'https://www.sixflags.com/magicmountain/attractions/grand-american-carousel')
        make_attraction("Goliath", "Roller Coaster", "Maximum", 48, 'https://www.sixflags.com/magicmountain/attractions/goliath')
        make_attraction("Gold Rusher", "Roller Coaster", "Moderate", 48, 'https://www.sixflags.com/magicmountain/attractions/gold-rusher')

        # Adding images and descriptions
        if sys.argv[1:]:
            if sys.argv[1] == "-dump":
                print("Performing data dump...")
                # Loop through all created attractions
                for attraction in attractions:
                    attraction.thumbnail = asyncio.run(image_extractor(attraction.url))
                    print(attraction.name, attraction.thumbnail)
                    attraction.description = json.dumps(asyncio.run(description_extractor(attraction.url)))
                    print(attraction.name, attraction.description)
                

            else:
                print("Bad keyword given. Assuming preexisting data dump.")
        else:
            print("No keyword given. Assuming preexisting data dump.")

        # Adding attraction keys
        magic_mountain = requests.get('https://api.themeparks.wiki/v1/entity/c6073ab0-83aa-4e25-8d60-12c8f25684bc/children')
        scraped = magic_mountain.json()['children']
        for attraction in attractions:
            for att_scrape in scraped:
                if att_scrape['name'] == attraction.name:
                    attraction.attraction_key = att_scrape['id']

        # Adding latitude and longitude
        for attraction in attractions:
            ride_page = requests.get(f'https://api.themeparks.wiki/v1/entity/{attraction.attraction_key}')
            scraped_ride = ride_page.json()
            ride_location = scraped_ride['location']
            attraction.latitude = ride_location['latitude']
            attraction.longitude = ride_location['longitude']
        
        # attractions[0].description = json.dumps({0: 'Just like the brave pirates next door on the Buccaneer, the Swashbuckler is your ticket to a daring adventure. \xa0You’ll fly boldly through the air with the trees at your feet!'})
        # print(attractions[0].description)
        

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

