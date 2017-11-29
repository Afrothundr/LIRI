//add keys to js file
var client = require("./keys.js");
var moment = require("moment");
var request = require('request');
var fs = require('fs');

function run() {
	//command switch statment
	switch (command) {
		//when user calls for their tweets
		case "my-tweets":
			//make api call to twitter using the twitter client keys
			client.twitter.get('statuses/user_timeline', 'count: 20', function(error, tweets, response) {
				if (error) {
					return console.log(error);
				}
				//print tweets along with timestamp for the last 20 user tweets
				console.log("Your Tweets ------------------------")
				for (i=0; i < tweets.length; i++) {
						//print tweet
						console.log('%s', `On ${tweets[i].created_at} you tweeted ${tweets[i].text}`);
					}
				console.log("------------------------")
			});

			break;
		case "spotify-this-song":
			//when a user asks for a spotify song
		
			//intialize artists array
			var artists = [];
			//make spotify api call
			client.spotify.search({ type: 'track', query: search, limit: 1 }, function(err, data) {
				if (err) {
					return console.log(err);
				}
				//if the song search is not valid return auto message
				if (data.tracks.next === null) {
					return console.log("Song not found! Here's my favorite song: Artists - J-Kwon    Song Title - Tipsy - Radio Mix    Link - https://open.spotify.com/track/2lVDc57IMK6nypg2iuEWVR    Album - Tipsy");
				}
				//else display song info
				console.log(`${search} info ------------------------`);
				for (i=0; i<data.tracks.items[0].artists.length; i++) {
					artists.push(data.tracks.items[0].artists[i].name);
				}
				console.log(`Artists - ${artists.join(", ")}`);
				console.log(`Song Title - ${data.tracks.items[0].name}`);
				console.log(`Link - ${data.tracks.items[0].external_urls.spotify}`);
				console.log(`Album - ${data.tracks.items[0].album.name}`);
				console.log("------------------------");
			});
			break;
		case "movie-this": //If command is "movie-this"
			var movieUrL = `http://www.omdbapi.com/?t=${search}&y=&plot=short&apikey=40e9cece`; //add searched movie to URL
			if (search == "") {
				return console.log("Please type a movie or tv show"); //if there is an empty string ask for a movie or TV show
			}
			request(movieUrL, function(error, response, body) {
				if (!error && response.statusCode === 200) { //if connection is successful...
					body = JSON.parse(body); // JSON parse the body and print information
					console.log("Movie information ------------------------");
					console.log(`Title: ${body.Title}`);
					console.log(`IMDB Rating: ${body.imdbRating}`);
					console.log(`Rotten Tomatoes Rating: ${body.Ratings[1].Value}`);
					console.log(`Country: ${body.Country}`);
					console.log(`Language: ${body.Language}`);
					console.log(`Plot: ${body.Plot}`);
					console.log(`Actors: ${body.Actors}`);
					console.log("------------------------")
				}

			});
		break;
		default:
			console.log("command not recognized");
		break;
	}

}


//take in command line inputs
var command = process.argv[2];
//if command is do-what-it-says...
if (command === 'do-what-it-says') {
	fs.readFile('./random.txt', "utf8", function(err, data) { //read random.txt file
		var randomCommands = data.split(","); //split data at the comma
		command = randomCommands[0]; //set each part of the array to their respective command and search variables
		search = randomCommands[1];
		run(); //run application
	});
} else {
	var search = process.argv.slice(3).join(" "); //take second argument 
	run(); //run application
}
