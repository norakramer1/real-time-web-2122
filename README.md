# Real-Time Web @cmda-minor-web 2021 - 2022

## Table of Contents
- [About the project](#about-the-project)

## About the project - image
## Assignment
### Concepts
I started out with three concepts for my application.

![Three concepts wireflow](https://github.com/norakramer1/blob/main/real-time-web-2122/public/images/wireframes-concept-rtw.jpg)

1. Location Guessing
Using the [Google Maps](https://developers.google.com/maps) API i wanted to make a simplified version of the popular game [GeoGuessr](https://www.geoguessr.com/). I was planning to show a map of a random location and have the current players in the room guess the country on the map shown. The person who guessed the name correctly would win. The issue i ran into, even before accessing the API was the paywall. The API is free to use the first 90 days but you do need to add a credit card and I didn't have one..

#### Alternatives to the Google Maps API

1. Bing maps API
[Bing Maps API](https://www.microsoft.com/en-us/maps/choose-your-bing-maps-api)

- Free for development
- Static and interactive Maps
The issue with this API is the documentation. After obtaining an API key it was really hard to retrieve the right data. The documentation is extensive but vague. There is so much data you can use that I could not find the map I was looking for

2. Map Box API
[Map Box API](https://www.mapbox.com/)
> The "GL" in Mapbox GL JS refers to Mapbox GL, a graphics library that renders 2D and 3D Mapbox maps as dynamic visual graphics with OpenGL in any compatible web browser, without using additional plugins

- Extensive data
- Extensive documentation
- No 'Picture' map (the maps are automatically generated)

3. Foursquare API
[Foursquare Places API](https://developer.foursquare.com/docs)

- Extensive data
- Extensive documentation
- No 'Picture' map

### Song Guessing using the Spotify API
Next I was planning to use the Spotify API to play a snippet of a song in my app, but quickly discovered that it is not as easy as it sounds. If you want to call the Spotify API you have access to song names, user data (if they give you specific permission), playlists etc. but you can't *play* a song that way. There is a way to do this using the Spotify [Web Playback SDK](https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#listening-through-the-sdk). I don't think this is an API Though. This tutorial leads you through how to make a client-side application that plays music in your browser. It starts off by having to download a file. So that was an immediate no.

### Pictionary using the WordPik API and HTML Canvas
My final idea was pictionary, or let all users guessing what one user draws. 

### Final concept
My final concept is a group playlist using Spotify. All users log in with spotify authorization and in the room you can see every users 3 most listened to songs. If i have the time I want to implement a playlist where the whole group can listen to one of the songs in the playlist.

## Install
## Packages
## Features
## Real Time Events
## About the API
## API Key
## Data Life Cycle
## Checklist
## Sources
## License 
