api( 'podcasts/', function( req, res ) {
	res.api( {podcasts: {actions: [ 'list' ] }} );
	console.log('yay');
});

api( 'podcasts/list', function( req, res ) {
	res.api( {podcasts: 'bar'} );
	console.log('yay');
});


api( 'podcasts/list/:podcast', function( req, res ) {
	res.api( {podcasts: 'bar'} );
});