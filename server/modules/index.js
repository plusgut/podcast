exports.module = function(){
	var fs = require( "fs" );
	this.main = function( cb ){
		cb();
	};

	this.on( "index", function( req ){
		fs.readFile( bb.path + "/client/index.html", "utf8", function( err, file ) {
			if ( err ) {
				bb.log( err, "error" );
			} else {
				if( file.search( /((scripts))/ ) ){
					bb.modules.mergandice.readDir( "client", "js", [ "client/js/libs/sproutcore", "client/js/libs/ember", "client/js/libs/socket.io"] ,function( results ){
						var scripts = "";
						results.forEach( function( path ) {
							scripts += "<script src='"+ path + "'></script>\n";
						});
						var content = file.replace( /((scripts))/, scripts );
//						bb.log( content );

						req.write( content, 200, { "Content-Type": "text/html" } );
					});
				} else {
					req.write( content, 200, { "Content-Type": "text/html" } );
				}
			}
		});
	});

	this.on( "client", function( req ){
		req.writeFile( bb.path + req.url.pathname );
	});
	this.on( "favicon.ico", function( req ){
		req.writeFile( bb.path + "/client/favicon.ico" );
	});
};
