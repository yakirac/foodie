require(["jquery", "underscore", "backbone", "routers/AppRouter" ],

	function( $, _, Backbone, MainRouter )
    {
			var bootstrap = SP.app.bootstrap;

            //reference context
            var self 		= this, routers,
			initialRoute 	= $( '#backbone-include-script' ).data( 'route' ) || 'app';	
			
			//router list
			routers = {
				'app'		: MainRouter
			};	

			//apply bootstrapped data here							
			var preloadedData = {
				//configurations : new Configurations()
			};
	
			//run the bootstrap engine to cache the data objects/classes/singletons
			_.bootstrapData( bootstrap, preloadedData, function(){ 
				
				//cache the active router			
				bootstrap.router = new routers[ initialRoute ]();
			});	
			
	}

);