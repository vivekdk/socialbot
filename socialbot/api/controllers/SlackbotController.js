var async = require('async');
var RtmClient = require('@slack/client').RtmClient;
var WebClient = require('@slack/client').WebClient;
var matchFormatHelper = require('../utils/MatchFormatter.js');

// The memory data store is a collection of useful functions we can include in our RtmClient
var MemoryDataStore = require('@slack/client').MemoryDataStore;

var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;

var token = process.env.SLACK_API_TOKEN;

var rtm = new RtmClient(token, {
  // Sets the level of logging we require
  logLevel: 'error',
  // Initialise a data store for our client, this will load additional helper functions for the storing and retrieval of data
  dataStore: new MemoryDataStore()
});

var web = new WebClient (token, {
  // Sets the level of logging we require
  logLevel: 'error',
  // Initialise a data store for our client, this will load additional helper functions for the storing and retrieval of data
  dataStore: new MemoryDataStore()
});

rtm.start();

// Wait for the client to connect
rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function() {
  // Get the user's name
  var user = rtm.dataStore.getUserById(rtm.activeUserId);

  // Get the team's name
  var team = rtm.dataStore.getTeamById(rtm.activeTeamId);

  // Log the slack team name and the bot's name
  console.log('Connected to ' + team.name + ' as ' + user.name);

  rtm.sendMessage('this is a test message1', rtm.dataStore.getChannelByName("general").id , function messageSent() {
    // optionally, you can supply a callback to execute once the message has been sent
  });
});

var RTM_EVENTS = require('@slack/client').RTM_EVENTS;

rtm.on(RTM_EVENTS.MESSAGE, function (message) {
  console.log ('new message', message);

  switch(message.text) {
  	case 'list matches' :
  	  	var options = {
  			status : 'active'
	  	};
	  	MatchService.getAllMatches (options, function (err, matches){
	  		var i=0;
	  		async.each (matches, function (match, fn){
	
					var text = '';
					text = text.concat(++i)
						.concat(".")
						.concat(matchFormatHelper.formatMatch(match));
					rtm.sendMessage(text, rtm.dataStore.getChannelByName("general").id, function (err, message){
						var options = {
		    				channel : rtm.dataStore.getChannelByName("general").id,
		    				timestamp : message.ts
			    		}
			    		web.reactions.add ('thumbsup', options);
			    		web.reactions.add ('thumbsdown', options);
			    		fn ();
					});
	  		});
	  	});
  		break;

  	default :
  		break;
  }
});
