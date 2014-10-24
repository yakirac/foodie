//----------------------------
// APPROUTER.js
// this is the main router for the app. The routes will allow for direct page initailiztion
// use best practices with the routes. NO biz/application logic should be performed in this file
//----------------------------
define([
	"jquery", "underscore", "backbone", "parse", "collections/Meals",
	"views/HeaderView", "views/MainAppView", "views/AboutView", "views/FoodPicsView",
	"views/FoodPicView", "views/MainMarionetteApp"
	],

    function(
    	$, _, Backbone, Parse, Meals, HeaderView, MainAppView, AboutView,
			FoodPicsView, FoodPicView, MarionetteApp
    )
    {

		var	bootstrap 	= SP.app.bootstrap;

        var MainRouter 	= Backbone.Router.extend({

            initialize: function()
            {
                //this.headerView = new HeaderView();
                //$('.header').html( this.headerView.render().el );

                //reference context
								/*this.views 			= [];
								this.currentView	= new MainAppView();

								//cache the vents object
								bootstrap.Vent = _.extend({}, Backbone.Events );*/

								//start up
								Backbone.history.start();

								this.parseInitialized = this.initializeParse();



            },
						initializeParse : function(){

							Parse.initialize("ibJOzxIQ10DOycHb9iFMxy0JuJsaDdOgnZyvdXVu",
							"EHZVNuL1pWqIi1BOQn1z7UprtbvvqTBkUBNmv8ia");

							return true;
						},
            //setup the apps routes
            routes:
            {
                ''								: 'index',		//main loader route
                //'about'						: 'about',
								'loadpics'				: 'loadpics',
								'loadpic/:id'			: 'loadpic',
								'logout'					: 'logout',
                '*notFound'				: 'index'		//catch all*/
            },

            index: function()
            {
							//make sure we garbage collect
							/*//$( '#app-holder' ).empty();

							this.currentView.close();

							this.currentView = new MainAppView();

							this.currentView.render();*/
							if(!this.parseInitialized) this.parseInitialized = this.initializeParse();

							foodieApp.start();

						},
            /*about: function()
            {
            	$( '#app-holder' ).empty();
            	//this.currentView.close();

            	this.currentView = new AboutView();

            	this.currentView.render();
            },*/
						loadpics : function()
						{
							/*$( '#app-holder' ).empty();

							this.currentView.close();

							this.currentView = new FoodPicsView();

							this.currentView.render();*/
							if(!this.parseInitialized) this.parseInitialized = this.initializeParse();
							var meals = new Meals();
							meals.fetch().always(function(){
								var foodPicsView = new FoodPicsView({ mealCollection : meals });

								foodieApp.mainRegion.show(foodPicsView);
							});
						},
						loadpic : function( id )
						{
							if(!this.parseInitialized) this.parseInitialized = this.initializeParse();
							var Meal = Parse.Object.extend("Meal");
							var query = new Parse.Query(Meal);
							query.get(id, {
								success : function( meal ){
									var foodPicView = new FoodPicView({ model : meal });
									foodieApp.mainRegion.show(foodPicView);
								},
								error : function( object, error ){
									console.log('There was an error retriving the meal');
								}
							});
						},
						logout : function()
						{
							console.log('Logging out');
							if(!this.parseInitialized) this.parseInitialized = this.initializeParse();

							var mainView = new MainAppView();

							foodieApp.mainRegion.show(mainView);
						}
        });


				var foodieApp = MarionetteApp;

				foodieApp.addRegions({
					mainRegion : "#app-holder"
				});

				foodieApp.addInitializer(function(options){
					var mainView = new MainAppView();

					foodieApp.mainRegion.show(mainView);

				});




				bootstrap.router = MainRouter;

        return MainRouter;
    }

);
