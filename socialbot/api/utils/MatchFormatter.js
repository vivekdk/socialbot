"use strict";

module.exports = {

	formatMatch : function (matches){
		if (matches && matches.length > 0){
			var formattedText = '';
			for (var i=0; i < matches.length; i=i+1){
				let match = matches[i];
				formattedText = formattedText.concat(i+1)
											 .concat(".")
											 .concat (match.name + ", " + new Date(match.startTime))
											 .concat ('\n');
			}
			return formattedText;
		}
		return '';
	} 

};