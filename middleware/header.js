app.use( function( req, res, next ){
	res.setHeader( 'Access-Control-Allow-Origin', '*' );
	res.setHeader( 'Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE' );
	res.setHeader( 'Access-Control-Allow-Headers', 'X-Requested-With, Content-Type' );

	next();
});

app.use( '/api', function( req, res, next ){
	res.setHeader( 'Cache-Control', 'no-cache, no-store, must-revalidate' );
	res.setHeader( 'Pragma', 'no-cache' );
	res.setHeader( 'Expires', 0 );

	next();
});