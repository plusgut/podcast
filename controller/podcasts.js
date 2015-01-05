api( 'podcasts/list', function( req, res, next ) {
	loads[ 'helper/couchdb.js' ].getCollection( 'list', function( err, result ){
		if( err ){
			res.api( { err: 500, message: err } );
		} else {
			res.api( { podcasts: result } );
		}
	});
});

api( 'podcasts/detail/', function( req, res, next ){
	var podcastId = req.body.podcast;
	if( podcast != 'dashboard' ){
		loads[ 'helper/podcast.js' ].load( podcast, function( result ){
			if( podcast.id != podcastId ){
				res.api( podcast );
			}
		});
	} else {
		res.api( { podcast:  podcast } );
	}
});