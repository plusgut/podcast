api( 'podcasts/list', function( req, res, next ) {
	loads[ 'helper/couchdb.js' ].getCollection( 'list', function(err, result) {
		if( err ){
			res.api( {err: 500, message: err} );
		} else {
			res.api( {podcasts: result } );
		}
	});
});


api( 'podcasts/detail/', function( req, res, next ) {
	console.log(loads);
	if( req.body != '*' || true ){
		res.api( {podcast: req.body, items: [ 'foo', 'bar' ] } );
	}
});