var fs = require('fs');

module.exports = {
	createDocument: function() {

	},
	createCollection: function(){

	},
	_createModel: function(){

	},
	getDocument: function(){

	},
	getCollection: function(name, cb){
		fs.readFile( __dirname + '/../fixtures/' + name + '.json' , 'binary', function( err, file ) {
			if( err ){
				cb(err);
			} else {
				cb(null, JSON.parse( file ));
			}
		});
	}
};