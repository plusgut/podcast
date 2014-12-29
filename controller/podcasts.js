api( 'podcasts/list', function( req, res, next ) {
	res.api( {podcasts: [ 'foo', 'bar' ]} );
	console.log('yay');
});


api( 'podcasts/detail/', function( req, res, next ) {
	res.api( {podcasts: []} );
});