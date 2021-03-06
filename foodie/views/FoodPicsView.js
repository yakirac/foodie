define([ "jquery", "underscore", "backbone", "parse", "vague", "collections/Meals",
"collections/FoodieFiles", "models/FoodieFile", "text!templates/foodpics.html",
"text!templates/picture.html", "jquery.ui.widget",
"jquery.iframe-transport", "jquery.fileupload"],

    function( $, _, Backbone, Parse, Vague, FoodieFiles, FoodieFile,
      Meals, template, pictureTemplate ){

      var bootstrap = SP.app.bootstrap;

    var View = Backbone.View.extend({

            /*el: "#app-holder",
            hasRendered : false,*/
            initialize: function( options ) {

              //change the prop name options to root
              //var self = this.changePropName( this );

              this.options = options;

              //bind methods to listen to and set THIS as the context
              _.bindAll( this, 'render', 'close');

              this.inProfileView = false;
              this.savedMeals = this.options.mealCollection;

              this.FoodieMeal = Parse.Object.extend("Meal");

              //this.savedMeals = new Meals(bootstrap.images.files);

              this.currentUser = Parse.User.current();

              this.$el.html( _.template( template, { name : this.currentUser ? this.currentUser.get('name') : 'Guest' } ) );


            },

            // View Event Handlers
            events: {
              'click #photo-upload' : 'openUploadModal',
              'click #uploader'     : 'openFileBrowser',
              'change #fileupload'  : 'uploadPhoto',
              'click #save'         : 'uploadMeal',
              'click #delete'       : 'confirmDelete',
              'click #ok'           : 'deletePhoto',
              'click #favorite'     : 'addRemoveFavorite',
              'click #logout'       : 'logout'
            },

            render: function() {
              var self = this;
              if( this.currentUser ){
                if( this.savedMeals.length > 0 )
                {
                  $('#pictures').empty();
                  this.$el.find('#no-photos').hide();
                  this.$el.find('#no-photos-show').hide();
                  console.log(this.savedMeals);

                  _.each(this.savedMeals.models, function(meal, idx){
                    var likesLength = !_.isUndefined(meal.get('favorites')) || !_.isEmpty(meal.get('favorites')) ? meal.get('favorites').length : '';
                    var data = { cid : meal.id,
                                 fileSource : meal.get('file')._url,
                                 caption : meal.get('caption'),
                                 favorites : likesLength == 0 ? '' : likesLength,
                                 profileView : this.inProfileView
                               };
                    var acl = meal.getACL();
                    if( (acl && acl.permissionsById[this.currentUser.id]) || !acl )
                      this.$el.find('#pictures').append(_.template(pictureTemplate, data ));
                  }.bind(this));
                }
                else
                {
                  console.log('Showing the alert');
                  $('#no-photos').show();
                  $('#no-photos-show').hide();
                }
              }
              else
              {
                this.$('#user-list').hide();
                this.$('#pictures').hide();
                this.$('#no-photos-show').show();
              }


              return this;
            },

            close: function()
            {
              this.unbind();
              //this.remove();
            },
            addRemoveFavorite : function( event ){
              var $elem = $(event.currentTarget),
                  divModel = $elem.data('model'),
                  mealModel = this.savedMeals.get( divModel );

              var likes = mealModel.get('favorites');

              console.log(likes);

              if(!this.inProfileView && this.currentUser)
              {
                  if(!_.contains(likes, this.currentUser.id))
                  {
                    likes.push( this.currentUser.id );
                    mealModel.add('favorites', this.currentUser.id);
                    mealModel.save();
                    //Call if adding like for user
                    $elem.find('span#faves').removeClass('glyphicon-star-empty').addClass('glyphicon-star');
                    $elem.find('span#fave-count').html(likes.length);
                  }
                  else
                  {
                    likes = _.without(likes, this.currentUser.id );
                    mealModel.remove('favorites', this.currentUser.id);
                    mealModel.save();
                    //Call if removing like for user
                    $elem.find('span#faves').removeClass('glyphicon-star').addClass('glyphicon-star-empty');
                    $elem.find('span#fave-count').html(likes.length == 0 ? '' : likes.length);
                  }
              }
            },
            logout : function( event )
            {
              console.log('Calling logout');
              //Parse.User.logOut();
              bootstrap.router.navigate('#', { trigger : true });
            }
        });

        return View;

    }

);
