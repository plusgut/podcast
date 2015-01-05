var express    = require( 'express' );
var bodyParser = require('body-parser')
var fs         = require( 'fs' );
var app = express();

global.app = app;
global.loads = {};

app.get( '/', function( req, res ){
	res.sendFile( __dirname + '/public/index.html' );
});

app.use( function( req, res, next ){
	res.setHeader( 'Access-Control-Allow-Origin', '*' );
	res.setHeader( 'Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE' );
	res.setHeader( 'Access-Control-Allow-Headers', 'X-Requested-With, Content-Type' );

	next();
});
app.use( express.static( __dirname + '/public' )); // Loading app.js/app.css and other stuff like that
app.use( bodyParser.json() );

Route = function(cb) {
	this.cb = cb;
	var self = this;
	this.entry = function( req, res, next ) {
		res.addApiHeader = function() {
			this.setHeader( 'Cache-Control', 'no-cache, no-store, must-revalidate' );

			this.setHeader( 'Pragma', 'no-cache' );
			this.setHeader( 'Expires', 0 );
		};
		res.api = function( result ) {
			this.addApiHeader();
			this.send( JSON.stringify( result ) );
		};

		// @TODO Add check if an debugmode
		try {
			self.cb(req, res, next);
		} catch( err ){
			res.addApiHeader();
			res.send( JSON.stringify( {error: 500, message: err} ) );
		}
	};
};

global.api = function( path, cb ) {
	var route = new Route(cb);
	app.post('/api/' + path, route.entry );
};
function load( folder ) {
	fs.readdir( __dirname + '/' + folder, function( err, content ) {
		if( err ){
			console.log( err );
		} else {
			for( var i = 0; i < content.length; i++ ){
				var excludes = [ '.', '..' ];
				var completeFolder = folder + '/' + content[ i ];
				var path = __dirname + '/' + completeFolder;
				if( fs.lstatSync( path ).isDirectory() ) {
					load( completeFolder + '/' + content[ i ]);
				} else {
					loads[ completeFolder ] = require( path );
				}
			}
		}
	} );
}

var types = [ 'helper', 'middleware', 'controller' ];
for( var i = 0; i < types.length; i++ ) {
	var type = types[i];
	load( type );
}

app.listen( 2901 );