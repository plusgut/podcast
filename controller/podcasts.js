module.exports.list =  function( req, res, next ) {
	loads[ 'helper/couchdb.js' ].getCollection( 'list', function( err, result ){
		if( err ){
			res.api( { err: 500, message: err } );
		} else {
			res.api( { podcasts: result } );
		}
	});
};

module.exports.detail = function( req, res, next ){
	var podcastId = req.body.podcast;
	if( podcastId != 'dashboard' ){
		loads[ 'helper/podcast.js' ].load( podcastId, function( result ){
			if( result.id != podcastId ){
				res.api( result );
			}
		});
	} else {
		res.api( { podcast:  podcastId } );
	}
};