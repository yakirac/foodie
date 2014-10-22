// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
require.config({
    baseUrl: SP.app.paths.appPath,
    paths: {
        app: '/test_app',
        "print" : '/js/libs/require/print',
        
        /*Core Libraries
          ------------------
        */  	
        "jquery"			: SP.app.paths.jsPath + 'libs/jquery/jquery.min',

	    "jqueryui"			: SP.app.paths.jsPath + 'libs/jqueryui/jquery-ui',
	
	    "underscore"		: SP.app.paths.jsPath + 'libs/underscore/underscore.min',
	
	    "backbone"			: SP.app.paths.jsPath + 'libs/backbone/backbone.min',
	    
	    "bootstrapjs"		: SP.app.paths.jsPath + 'libs/bootstrap/js/bootstrap.min',
	
	    "jquerytools" 		: SP.app.paths.jsPath + 'libs/jquerytools/jquery.tools.min',
	    
	    "mixins"			: SP.app.paths.jsPath + "mixins",
	    
	    "text"				: SP.app.paths.jsPath + "plugins/require/text",
	    
	    /*Application Folders
      	  ---------------------
      	*/
	  	"collections"	: "collections",
	  
	  	"routers"		: "routers",
	  
	  	"models"		: "models",
	  
	  	"views"			: "views",
	  
	  	"configs"		: "configs",
	  
	  	"templates"		: "templates",
	  
	  	"bootstrap"		: "bootstrap"
    },
    
     // Sets the configuration for your third party scripts that are not AMD compatible
	shim: {
	
	      // jQuery Mobile
	      "jquerymobile"	: ["jquery"],
	
	      //jquery Tools
	      "jquerytools"		: ["jquery"],
	
	      // Twitter Bootstrap jQuery plugins
	      "bootstrapjs"		: ["jquery"],
	
	      // jQueryUI
	      "jqueryui"		: ["jquery"],
	
		  
	      // Backbone
	      "backbone": 
	      {
	        // Depends on underscore/lodash and jQuery
	        "deps": ["underscore", "jquery"],
	
	        // Exports the global window.Backbone object
	        "exports": "Backbone"
	
	      }
	}
});

// Start loading the main app file. Put all of
// your application logic in there.
require(['mixins/underscore.mixins', 'app/bootstrap', 'bootstrapjs']);
