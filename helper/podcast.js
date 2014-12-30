module.exports = {
	load: function( id, cb ){
		loads[ 'helper/couchdb.js' ].getCollection( 'list', function(err, result) {
			if( err ){
				cb( {err: 500, message: err} );
			} else {
				var found = false;
				for( var i = 0; i < result.length; i++ ){
					if( result[ i].id == id ) {
						found = true;
						
							if( err ){
								cb( {err: 500, message: err} );
							} else {
								cb( {podcast: id, items: result } );
							}
					}
				}
				if( !found ) {
					cb( {err: 404, message: 'podcast not found' } );
				}
			}
		});
	}
};