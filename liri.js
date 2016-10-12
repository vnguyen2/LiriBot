//all npm packages and files needed
var Twitter = require('twitter');
var twitter = new Twitter(keys);
var keys = require("./keys.js");
var spotify = require('spotify');
var request = require('request');
var fs = require('fs'); 

//node arguments
var liriAction = process.argv[2];
var liriArgument = process.argv;
    liriArgument = liriArguent.slice(0,3).join("+");
	console.log(liriArgument);

//switch case for Liri Actions.
switch(liriAction){

    case 'my-tweets':
        tweets();
        break;

    case 'movie-this':
        movie();
        break;

    case 'spotify-this-song':
        spotifySong();
        break;

    case 'do-what-it-says':
        random();
        break;

    default:
    console.log("Please enter a valid action.")
};

//logging all inquries made in a log.txt file
function historyLog(data){
	console.log(data);
	fs.appendFile("./log.txt", data + "\n", function(err){
		if(err){
			console.log('Error occurred: ' + err);
		} else {
            console.log('data logged.');
        }
	});
}

//omdbapi api
function movie(){
	request(`http://www.omdbapi.com/?t=${liriArgument}&y=&i=&plot=short&tomatoes=true&r=json`, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var parsedReponse = JSON.parse(body)
	  		var movieDetails = "Movie Title: " + parsedResponse.Title + "\n" +
	  			"Year Release: " + parsedResponse.Year + "\n" +
	  			"Country Produced: " + parsedResponse.Country + "\n" +
	  			"Language: " + parsedResponse.Language + "\n" +
	  			"Plot: " + parsedResponse.Plot + "\n" +
	  			"Actors: " + parsedResponse.Actors + "\n" +
	  			"IMBD Rating: " + parsedResponse.imdbRating + "\n" +
	  			"Rotten Tomatoes Rating: " + parsedResponse.tomatoRating + "\n" +
	  			"Rotten Tomatoes URL: " + parsedResponse.tomatoURL + "\n";
	  		historyLog(movieDetails);
		}
	});
};

//display up to 20 tweets from feed
function tweets(){
	var params = {screen_name: 'vnguyen55', count: 20};
	twitter.get(
		'statuses/user_timeline',
		params,
		function(error, tweets, response) {
  		if (error) {
    		console.log(error);
  		}else{
  			tweets.forEach(function(tweet){
	  			var tweetDetails = "Tweet: " + tweet.text + "\n" +
	  				"Published: " + tweet.created_at + "\n";
                console.log(tweetDetails);
	  			historyLog(tweetDetails);
  			})
  		}
	});
};

//spotify finding a song
function spotifySong(){
	spotify.search({
		type: 'track',
		query: liriArgument,
	}, function(err, data) {
	    if (err) {
	        console.log('Error occurred: ' + err);
	        return;
	    }else{
	    	var input = data.tracks.items[0];
	  		var spotifyDetails = "Artist: " + input.artists[0].name + "\n" +
	  			"Song Name: " + input.name + "\n" +
	  			"Spot Link: " + input.external_urls.spotify + "\n" +
	  			"Album: " + input.album.name + "\n";
	  		console.log(spotifyDetails);
	  		logText(spotifyDetails);			
	    }
	 
	});
}