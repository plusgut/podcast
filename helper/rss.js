var request = require( 'request' );
var parseString = require('xml2js').parseString;

module.exports = {
	load: function( url, cb ){
		var self = this;
		console.log(url)
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
		parseString( rss, function( err, result ){
			if( err ){
				cb( { err: 500, message: 'Parsing RSS went wrong'} );
			} else {
				self.parseRss( result.rss, cb );
			}
		});
	},
	parseRss: function( rss, cb ){
		var result     = {};
		var podcast    = rss.channel[0];
		result.podcast = podcast.title[0];
		result.items   = [];
		for( var i = 0; i < podcast.item.length; i++ ){
			var item = podcast.item[ i ];
			result.items.push({
				title: item.title[0]
			});
		}
		cb( result );
	}
};