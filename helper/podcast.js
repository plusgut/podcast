module.exports = {
	load: function( id, cb ){
		loads[ 'helper/couchdb.js' ].getCollection( 'list', function(err, result) {
			if( err ){
				console.log(err);
				cb( {err: 500, message: err.messages} );
			} else {
				var found = false;
				for( var i = 0; i < result.length; i++ ){
					if( result[ i].id == id ) {
						found = true;
						// @TODO add caching
						loads[ 'helper/rss.js' ].load( result[ i ], cb );
					}
				}
				if( !found ) {
					cb( {err: 404, message: 'podcast not found' } );
				}
			}
		});
	},

};