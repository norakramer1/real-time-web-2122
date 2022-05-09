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

const port = process.env.PORT || 4000


app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(path.resolve('public')))


// spotify api scopes for retrieving information about artists, users
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
    pageTitle: "Chat App Home"
  });
});

// sets a const for the authorization of user info
const spotifyApi = new SpotifyWebApi({
  redirectUri: process.env.redirectUri,
  clientId: process.env.clientId,
  clientSecret: process.env.clientSecret
});

app.get('/login', (req, res) => {
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
  
});

// if something goes wrong spotify redirects to localhost:4000/callback and logs any errors
app.get('/callback', (req, res) => {
  const error = req.query.error;
  const code = req.query.code;
  const state = req.query.state;

  if (error) {
    console.error('Callback Error:', error);
    res.send(`Callback Error: ${error}`);
    return;
  }

  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      const access_token = data.body['access_token'];
      const refresh_token = data.body['refresh_token'];
      const expires_in = data.body['expires_in'];

      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      console.log('access_token:', access_token);
      console.log('refresh_token:', refresh_token);

      console.log(
        `Sucessfully retreived access token. Expires in ${expires_in} s.`
      );
      res.send('Success! You can now close the window.');


      spotifyApi.refreshAccessToken().then(
        function(data) {
          console.log('The access token has been refreshed!');
      
          // Save the access token so that it's used in future calls
          spotifyApi.setAccessToken(data.body['access_token']);
        },
        function(err) {
          console.log('Could not refresh access token', err);
        }
      );
    })
    .catch(error => {
      console.error('Error getting Tokens:', error);
      res.send(`Error getting Tokens: ${error}`);
    });
});

app.get('/albums', (req, res) => {
  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(process.env.SPOTIFY_ACCESS_TOKEN);

  //GET MY PROFILE DATA
  spotifyApi.getMyTopTracks()
  .then(function(data) {
    let topTracks = data.body.items;

let songs = topTracks.map(element => {
  return {
    name: element.name,
    album: element.album.name
  }
})
res.render('toptracks', {
  pageTitle: 'my tracks',
  songs: songs,
});
//console.log(topTracks);
console.log(songs);
  }, function(err) {
    console.log('Something went wrong!', err);

  })

  });

app.get('/toptracks', (req, res) => {
  console.log('topTracks here');
  
});

//sockets
io.on('connection', (socket) => {
  console.log('a user connected')

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
