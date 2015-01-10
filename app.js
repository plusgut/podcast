var express    = require( 'express' );
var bodyParser = require('body-parser')
var fs         = require( 'fs' );
var app = express();

global.app = app;
global.loads = {};

app.get( '/', function( req, res ){
	res.sendFile( __dirname + '/public/index.html' );
});

app.use( express.static( __dirname + '/public' )); // Loading app.js/app.css and other stuff like that
app.use( bodyParser.json() );

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
					load( completeFolder );
				} else {
					loads[ completeFolder ] = require( path );
					handleRoutes( completeFolder );
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

function handleRoutes( path ) {
	var controller = 'controller/';
	if( path.indexOf( controller) === 0 ){
		for( var index in loads[ path ] ){

			if( typeof(loads[ path ][ index] ) == 'function' ){
				var url = path.replace( controller, '' ).replace( '.js', '' ) + '/' + index;
				app.post('/api/' + url, loads[ path ][ index] );
			}
		}
	}
}

app.listen( 2901 );