var request = require( 'request' );
var parseString = require('xml2js').parseString;

module.exports = {
	load: function( url, cb ){
		var self = this;
		request.get(url, function(status, response) {
			if( response.headers[ 'content-type' ].indexOf( 'text/xml;' ) === 0 ){
				self.parseXml( response.body, cb );
			} else {
				cb( { err: 500, message: 'Wrong contenttype of rss-response'} );
			}
		}, function(){
			cb( { err: 500, message: 'RSS Request went wrong'} );
		});
	},
	parseXml: function( rss, cb ){
		var self = this;
		parseString( rss, { explicitArray: false, charkey: 'content' }, function( err, result ){
			if( err ){
				cb( { err: 500, message: 'Parsing RSS went wrong'} );
			} else {
				cb( { podcast: result.rss.channel});
			}
		});
	}
};