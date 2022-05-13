# Real-Time Web @cmda-minor-web 2021 - 2022

## Test it for yourself
To view the app you have to login using spotify with this login information. 

!! I tested it but because this Spotify account is new it does not hac=ve any top tracks to display so it still looks empty, sadly.

![App with other users](https://github.com/norakramer1/real-time-web-2122/blob/main/public/images/other-users.png)

- Email: real.time.web.spotify@gmail.com
- Password: real-time-web-2122

## Table of Contents
- [About the project](#about-the-project)

## About the project
This project is a multi user chatroom that displays every users top three tracks in Spotify using their API.

![top track discussion interface](https://github.com/norakramer1/real-time-web-2122/blob/main/public/images/spotify-interface.png)
## Assignment
### Concepts
I started out with three concepts for my application.

![Three concepts wireflow](https://github.com/norakramer1/real-time-web-2122/blob/main/public/images/wireframes-concept-rtw.jpg)

1. Location Guessing game
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

## Real Time Events
### Connect
The connection event is called when a user connects to the server.

### Chat message
The chat message event is called when a user sends a message all the other clients recieve it.

### Send user data to other clients
When a user is Authorized by Spotify all the other users are updated with their user information.

## Data Life Cycle
![Data life cycle](https://github.com/norakramer1/real-time-web-2122/blob/main/public/images/data-life-cycle.jpeg)

## Install and API key
1. Clone this repo
Add `git clone https://github.com/norakramer1/real-time-web-2122.git` to you terminal

2. Install
Install by running `npm install`

3. Sign in with Spotify for a [Spotify Developer account](https://developer.spotify.com/)

4. Create a new app
Create an app to notify Spotify and get a ClientID and ClientSecret

5. In the 'Edit setting' tab add a callback route to your app
This is usually `localhost:PORT/callback/`. You need a callback route for Spotify to redirect your users after they logged in using their Authorization.

6. Add a `.env` file to your project
Make a `.env` file and add:
    - `CLIENT_ID=` this is in your developer dashboard on Spotify
    - `CLIENT_SECRET=` also in you developer dahboard
    - `REDIRECT_URI=` the callback route (has to be 100% the same everwhere)
    - `SPOTIFY_ACCESS_TOKEN=` you get this after you have logged in succesfully, you have to login again every hour

7. Run
Run `npm start` in your terminal

## Dependencies
 - dotenv
 - ejs
 - express
 - socket.io
 - spotify-web-api-node

 ### DevDependencies
  - nodemon

## Features
- See other user's top songs of the last six months
- See other user's Spotify username
- Send chat messages to all other users

## About the API
> Based on simple REST principles, the Spotify Web API endpoints return JSON metadata about music artists, albums, and tracks, directly from the Spotify Data Catalogue.

This [API](https://developer.spotify.com/documentation/web-api/quick-start/) is really extensive. Every feature built in to Spotify is availabe through the API. Different data is available trough `scopes`. You add the [scopes](https://developer.spotify.com/documentation/general/guides/authorization/scopes/) you need in an array and when you ask for access in the API, the API will return the data in the scope. For this project I used `user-top-read` and `user-read-private`. 

When the user wants to access the app they get redirected to Spotify to log in to via their interface. 

### Authorization
Authorization of user data has a few steps:

1. A user logs in trough Spotify and gets and `access_token` and `refresh_token`
2. With the access token you make calls to the API. Authorization keys expire after 1 hour and that is why you need a refresh token. 
3. After they log in they get redirected to your added `redirect_uri`

## Wishlist
[] Display more user data (profile picture)
[] Display more track data (name of the artist)
[] Play the songs when you click on them using webplayer in the API
[] Add a gaming element like guessing other users favorite songs

## Sources


## License 
This project uses the MIT license
