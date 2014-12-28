var express = require( 'express' );
var fs      = require( 'fs' );
var app = express();

global.app = app;
global.core = {};

app.get( '/', function( req, res ){
	res.sendFile( 'public/index.html' );
});
app.use( '/assets/', express.static( __dirname + '/public' )); // Loading app.js/app.css and other stuff like that

Route = function(cb) {
	this.cb = cb;
	var self = this;
	this.entry = function( req, res ) {
		res.api = function( result ) {
			console.log('joarps');
			// @TODO should only be set at debug-mode
			this.setHeader( 'Access-Control-Allow-Origin', '*' );
			this.setHeader( 'Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE' );
			this.setHeader( 'Access-Control-Allow-Headers', 'X-Requested-With' );
			this.setHeader( 'Cache-Control', 'no-cache, no-store, must-revalidate' );
			this.setHeader( 'Pragma', 'no-cache' );
			this.setHeader( 'Expires', 0 );


			this.send( JSON.stringify( result ) );
		};
		self.cb(req, res);
	};
};

global.api = function( path, cb ) {
	var route = new Route(cb);
	app.use('/api/' + path, route.entry );
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
					core[ completeFolder ] = require( path );
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