module.exports = {

	createMatch : function (options, done){
		Match.create (options.match)
			 .exec (function (err, match){
			 	console.log (match);
			 	done (err, match);
			 });
	},

	getAllMatches : function (options, done){
		Match.find ({})
			 .exec (function (err, matches){
			 	done (err, matches);
			 });
	}

};