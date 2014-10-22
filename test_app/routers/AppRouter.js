//----------------------------
// APPROUTER.js
// this is the main router for the app. The routes will allow for direct page initailiztion
// use best practices with the routes. NO biz/application logic should be performed in this file
//----------------------------
define([
	"jquery", "underscore", "backbone", "views/HeaderView", "views/MainAppView", "views/AboutView"
	],

    function(
    	$, _, Backbone, HeaderView, MainAppView, AboutView
    )
    {
    
		var	bootstrap 	= SP.app.bootstrap;

        var MainRouter 	= Backbone.Router.extend({
			
            initialize: function()
            {
                this.headerView = new HeaderView();
                $('.header').html( this.headerView.render().el );
                
                //reference context
				this.views 			= [];
				this.currentView	= new MainAppView();
				
				//cache the vents object
				bootstrap.Vent = _.extend({}, Backbone.Events );

				//start up
				Backbone.history.start();
				

            },
            //setup the apps routes
            routes:
            {
                ''								: 'index',		//main loader route
                'about'							: 'about',
                '*notFound'						: 'index'		//catch all
            },
			
            index: function()
            {
				//make sure we garbage collect            	
				$( '#app-holder' ).empty();
				//this.currentView.close();
				
				this.currentView = new MainAppView();
				
				this.currentView.render();
            },
            about: function()
            {
            	$( '#app-holder' ).empty();
            	//this.currentView.close();
            	
            	this.currentView = new AboutView();
            	
            	this.currentView.render();
            }
        });
		
		
       
		
		
		
        return MainRouter;
    }

);