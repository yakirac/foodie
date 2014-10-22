define([ "jquery", "underscore", "backbone", "text!templates/header.html" ],

    function( $, _, Backbone, headerTemplate ){

    	var bootstrap = SP.app.bootstrap;
		
		var View = Backbone.View.extend({

            initialize: function() {

            	//change the prop name options to root
	            //var self = this.changePropName( this );

	            //bind methods to listen to and set THIS as the context
	            _.bindAll( this, 'render');


				this.render();
            },

            // View Event Handlers
            events: {
            },

            render: function() {
				var self = this;
				
				this.$el.html( _.template( headerTemplate, {} ) );
				
				
				return this;
            }
        });

        return View;

    }

);
