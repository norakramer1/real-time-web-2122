/*
https://socket.io/get-started/chat
*/
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(http)
const SpotifyWebApi = require('spotify-web-api-node')

require('dotenv').config()

const port = process.env.PORT || 2000

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(path.resolve('public')))

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
//const redirectUri = 'http://192.168.1.19:2000/callback/'
const redirectUri ='https://top-track-discussion-production.up.railway.app/callback/'
let accessToken;
let refreshToken;
// spotify api scopes for retrieving information about artists and users
const scopes = [
  'ugc-image-upload',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'streaming',
  'app-remote-control',
  'user-read-email',
  'user-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-read-private',
  'playlist-modify-private',
  'user-library-modify',
  'user-library-read',
  'user-top-read',
  'user-read-playback-position',
  'user-read-recently-played',
  'user-follow-read',
  'user-follow-modify'
];

// gets home route
app.get('/', (req, res) => {
  res.render('home', {
    pageTitle: "Home"
  });
});

// sets a const for the authorization of user info
const spotifyApi = new SpotifyWebApi({
  clientId,
  clientSecret,
  redirectUri
});

app.get('/login', (req, res) => {
  res.redirect(spotifyApi.createAuthorizeURL(scopes));

});

// auth user and get access code
app.get('/callback', (req, res) => {
  const error = req.query.error;
  const code = req.query.code;
  const state = req.query.state;

  if (error) {
    console.error('Callback Error:', error);
    res.send(`Callback Error: ${error}`);
    return;
  }
  // Retrieve an access token and refresh token to use when logging in
  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      const access_token = data.body['access_token'];
      const refresh_token = data.body['refresh_token'];
      const expires_in = data.body['expires_in'];

      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);
      accessToken = access_token;
      refreshToken = refresh_token;


      spotifyApi.refreshAccessToken().then(
        function (data) {
          console.log('The access token has been refreshed!');

          // Save the access token so that it's used in future calls
          spotifyApi.setAccessToken(data.body['access_token']);
        },
        function (err) {
          console.log('Could not refresh access token', err);
        }
      );
    })

    .catch(error => {
      console.error('Error getting Tokens:', error);
      res.send(`Error getting Tokens: ${error}`);
    });


  res.redirect('/albums')

});

// Make array of users to see each other when you join
let userData = [];


// on getalbum route log in with access token 
app.get('/albums', (req, res) => {
  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(accessToken)

// Get a users username on spotify
  let userName;
  spotifyApi.getMe()
    .then(function (data) {
      userName = data.body.display_name;
    }, function (err) {
      console.log('Something went wrong!', err);
    });

  // Get a users top tracks
  spotifyApi.getMyTopTracks()
    .then(function (data) {
      let topTracks = data.body.items;
      const size = 3

      // Map over all collected data to filter out the song names, artists, albums and cover images
      let allSongs = topTracks.map(element => {
        return {
          name: element.name,
          artist: element.album.artists,
          album: element.album.name,
          albumImg: element.album.images
        }
      })
    // slice 20 songs into 3 top songs
      const songs = allSongs.slice(0, size)

    //render toptracks view with all song info in 'songs' and userinfo in 'user'
      res.render('toptracks', {
        pageTitle: 'See all the top tracks',
        songs: songs,
        user: userName
      });
    
   // push user into userArray if userName does not already exist
      let dataExists = userData.some(asset => asset.user === userName);
      if (!dataExists) {
        userData.push({
          songs: songs,
          user: userName
        })
      }
    }, function (err) {
      console.log('Something went wrong!', err);
    })
});

//sockets
io.on('connection', socket => {
  console.log('a user connected')

  socket.emit('user data', userData);

  socket.on('message', (message) => {
    io.emit('message', message)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})



http.listen(port, () => {
  console.log('listening on port ', port)
})
