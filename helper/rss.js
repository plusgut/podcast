var request = require( 'request' );
var parseString = require('xml2js').parseString;

module.exports = {
	map: {
		'audio/x-mpeg': 'audio/mpeg'
	},
	load: function( url, cb ){
		var self = this;
		request.get(url, function(status, response) {
			if( response.headers[ 'content-type' ].indexOf( 'text/xml;' ) === 0 ){
				self.parseXml( response.body, cb );
			} else {
				cb( { err: 500, message: 'Wrong contenttype of rss-response'} );
			}
		}, function(err, res){
			if(!err, res) {
				self.parseXml( res.body, cb );
			} else {
				cb( { err: 500, message: 'RSS Request went wrong'} );
			}
		});
	},
	parseXml: function( rss, cb ){
		var self = this;
		parseString( rss, { explicitArray: false, charkey: 'content', attrkey: 'attributes' }, function( err, parsed ){
			if( err ){
				cb( { err: 500, message: 'Parsing RSS went wrong'} );
			} else {
				var result = parsed.rss.channel;
				for(var index = 0; index < result.item.length; index++) {
					var item = result.item[index];
					if(self.map[item.enclosure.attributes.type]) {
						item.enclosure.attributes.type = self.map[item.enclosure.attributes.type];
					}
				}
				cb( { podcast: result});
			}
		});
	}
};