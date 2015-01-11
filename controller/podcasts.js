module.exports.list =  function( req, res, next ) {
	loads[ 'helper/couchdb.js' ].getCollection( 'list', function( err, result ){
		if( err ){
			res.send( { err: 500, message: err } );
		} else {
			res.send( { podcasts: result } );
		}
	});
};

module.exports.detail = function( req, res, next ){
	var podcastId = req.body.podcast;
	if( podcastId != 'dashboard' ){
		loads[ 'helper/podcast.js' ].load( podcastId, function( result ){
			if( result.id != podcastId ){
				res.send( result );
			}
		});
	} else {
		res.send( { podcast:  {title: podcastId} } );
	}
};