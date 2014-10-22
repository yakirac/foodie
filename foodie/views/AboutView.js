define([ "jquery", "underscore", "backbone", "text!templates/about.html" ],

    function( $, _, Backbone, template ){

    	var bootstrap = SP.app.bootstrap;
		
		var View = Backbone.View.extend({

            el: "#app-holder",
			hasRendered : false,
            initialize: function() {

            	//change the prop name options to root
	            //var self = this.changePropName( this );

	            //bind methods to listen to and set THIS as the context
	            _.bindAll( this, 'render', 'close');


				this.render();
            },

            // View Event Handlers
            events: {
            },

            render: function() {
				var self = this;
				
				this.$el.html( _.template( template, {} ) );
				
				
				return this;
            },
            close: function()
            {
            	this.unbind();
            	this.remove();
            }
        });

        return View;

    }

);
