'use strict'

//curl -H "Content-Type: application/json" -X GET "localhost:1337/webhook" -d '{"object": "page", "entry": [{"messaging": [{"message": "TEST_MESSAGE"}]}]}'
require('dotenv').config();

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
	res.send('Hello world, I am a chat bot')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

// Spin up the server
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})

// Imports dependencies and set up http server
/*const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()); // creates express http server

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));
//app.set('port', (process.env.PORT || 5000))

// Creates the endpoint for our webhook 

app.post('/webhook', (req, res) => {  
 
	let body = req.body;
  
	// Checks this is an event from a page subscription
	if (body.object === 'page') {
  
	  // Iterates over each entry - there may be multiple if batched
	  body.entry.forEach(function(entry) {
  
		// Gets the message. entry.messaging is an array, but 
		// will only ever contain one message, so we get index 0
		let webhook_event = entry.messaging[0];
		console.log(webhook_event);
	  });
  
	  // Returns a '200 OK' response to all requests
	  res.status(200).send('EVENT_RECEIVED');
	} else {
	  // Returns a '404 Not Found' if event is not from a page subscription
	  res.sendStatus(404);
	}
  
  });

  // Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {

	// Your verify token. Should be a random string.
	let VERIFY_TOKEN = process.env.VERIFY_TOKEN;
	  
	// Parse the query params
	let mode = req.query['hub.mode'];
	let token = req.query['hub.verify_token'];
	let challenge = req.query['hub.challenge'];
	  
	// Checks if a token and mode is in the query string of the request
	if (mode && token) {
	
	  // Checks the mode and token sent is correct
	  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
		
		// Responds with the challenge token from the request
		console.log('WEBHOOK_VERIFIED');
		res.status(200).send(challenge);
	  
	  } else {
		// Responds with '403 Forbidden' if verify tokens do not match
		res.sendStatus(403);      
	  }
	}
  });*/
