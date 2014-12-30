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
	var podcast = req.body.podcast;
	if( podcast != '*' || true ){
		loads[ 'helper/podcast.js' ].load( podcast, function(result) {
			res.api(result);
		});
	} else {
		res.api( {podcast:  podcast } );
	}
});