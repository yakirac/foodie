define([ "jquery", "underscore", "backbone", "parse", "vague", "text!templates/landing.html", "text!templates/header.html" ],

    function( $, _, Backbone, Parse, Vague, template, headerTemplate ){

    	var bootstrap = SP.app.bootstrap;

		var View = Backbone.View.extend({

            /*el: "#app-holder",
			hasRendered : false,*/
            initialize: function() {

            	//change the prop name options to root
	            //var self = this.changePropName( this );

	            //bind methods to listen to and set THIS as the context
	            _.bindAll( this, 'render', 'close');


				      this.render();
            },

            // View Event Handlers
            events: {
              'click #log-in'  : 'openLoginModal',
              'click #sign-up' : 'openSignUpModal',
              'click #login'   : 'login',
              'click #signup'  : 'signup'
            },

            render: function() {
      				var self = this;
      				//$('.header').html( _.template( headerTemplate, {} ) );

              var vague = $('.background').Vague({
                intensity        : 3,
                forceSVGUrl      : false,
                animationOptions : {
                  duration : 1000,
                  easing   : 'linear'
                }
              });

              vague.blur();

      				this.$el.html( _.template( template, {} ) );


              this.$('#loginModal').on('hidden.bs.modal', function( event ){
                  bootstrap.router.navigate('loadpics', { trigger : true });
              });

              this.$('#signUpModal').on('hidden.bs.modal', function( event ){
                  bootstrap.router.navigate('loadpics', { trigger : true });
              });

      				return this;
            },
            close: function()
            {
            	this.unbind();
            	//this.remove();
            },
            openLoginModal : function( event )
            {
              this.$('#loginModal').modal({ show : true });
            },
            openSignUpModal : function( event )
            {
              this.$('#signUpModal').modal({ show : true });
            },
            login : function( event )
            {
              console.log('Logging you in');
              var email = $('input#login-email').val();
              var password = $('input#login-password').val();

              console.log('Email', email);
              console.log('Password', password);

              this.$('#loading').show();

              Parse.User.logIn(email, password, {
                success : function( user ){
                  console.log('Login Successful', user);
                  this.$('#loading').hide();
                  //bootstrap.router.navigate('loadpics', { trigger : true });
                  this.$('#loginModal').modal('hide');
                },
                error : function( user, error ){
                  console.log('There was an error logging in', error);
                  this.$('#loading').hide();
                  $('#login-errors').html("Email/Password combination is invalid");
                  $('#login-errors').show();
                }
              });

              event.preventDefault();
            },
            signup : function( event )
            {
              console.log('Signing you up');
              var name = $('input#signup-name').val();
              var email = $('input#signup-email').val();
              var password = $('input#signup-password').val();

              var user = new Parse.User({ 'name' : name,  'username' : email, 'password' : password, 'email' : email });

              console.log('Name', name);
              console.log('Email', email);
              console.log('Password', password);
              console.log('User', user);


              user.signUp(null, {
                success : function( user ){
                  console.log('The user has been signed up', user);
                  //bootstrap.router.navigate('loadpics', { trigger : true });
                  this.$('#signUpModal').modal('hide');
                },
                error : function( user, error ){
                  console.log('There was an error sigining up the user', error);
                  $('#signup-errors').html(error.message);
                  $('#signup-errors').show();
                }
              });

              event.preventDefault();
            }
        });

        return View;

    }

);
