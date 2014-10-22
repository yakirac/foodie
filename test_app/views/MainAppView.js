define([ "jquery", "underscore", "backbone", "text!templates/test.html", "text!templates/header.html" ],

    function( $, _, Backbone, testTemplate, headerTemplate ){

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
				$('.header').html( _.template( headerTemplate, {} ) );
				this.$el.html( _.template( testTemplate, {} ) );
				
				
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
