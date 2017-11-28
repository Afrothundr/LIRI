var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var twitterKeys = new Twitter({
  consumer_key: 'cGrTUf5eju7bN7t1qK8uMPmCx',
  consumer_secret: 'lKhXz9UxsA9RyPAXjaC5iW8KfqJ0qQWjHZJ4rWkGoypCQ7p677',
  access_token_key: '934822801525133312-sw5uWgDwKYI3O8Pwgq0Jknkl6HYC0hv',
  access_token_secret: 'JuhlJZgK4mNv2TyfBIJcE22AYe42zCbRQQUJNKDlrwF5n',
});

var spotifyKeys = new Spotify({
  id: "1dabfbb75a0b4667bf98302bf0d1122d",
  secret: "8d2c450e1d8d4d8899843fbeccdb1710"
});

module.exports = {
	twitter : twitterKeys,
	spotify: spotifyKeys
};


