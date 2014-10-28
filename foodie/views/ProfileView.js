define([ "jquery", "underscore", "backbone", "parse", "vague",
"text!templates/profileView.html", "text!templates/comment.html",
"text!templates/picture.html", "jquery.ui.widget",
"jquery.iframe-transport", "jquery.fileupload"],

    function( $, _, Backbone, Parse, Vague, template, commentTemplate, pictureTemplate ){

      var bootstrap = SP.app.bootstrap;

    var View = Backbone.View.extend({

            /*el: "#app-holder",
            hasRendered : false,*/
            initialize: function( options ) {

              //change the prop name options to root
              //var self = this.changePropName( this );

              this.options = options;

              this.savedMeals = this.options.userMealCollection;

              //bind methods to listen to and set THIS as the context
              _.bindAll( this, 'render', 'close');

              this.FoodieMeal = Parse.Object.extend("Meal");

              this.currentUser = Parse.User.current();

              this.inProfileView = true;

              //this.savedMeals = [];


            },

            // View Event Handlers
            events: {
              'click #profile-uploads'  : 'loadProfileSection',
              'click #profile-settings' : 'loadProfileSection',
              'click #save-changes'     : 'saveProfile',
              'click #photo-upload'     : 'openUploadModal',
              'click #uploader'         : 'openFileBrowser',
              'change #fileupload'      : 'uploadPhoto',
              'click #save'             : 'uploadMeal',
              'click #delete'           : 'confirmDelete',
              'click #ok'               : 'deletePhoto',
              'click #reset-password'   : 'resetPassword'
            },

            render: function() {

              this.$el.empty();

              var data = { name : this.currentUser ? this.currentUser.get('name') : 'Guest' };

              this.$el.html( _.template( template, data ) );

              if(!this.currentUser)
              {
                this.$('#user-list').hide();
                this.$('#profile').hide();
                this.$('#no-profile-show').show();
              }

              this.renderUploads();

              return this;
            },

            renderUploads : function()
            {
              if(this.savedMeals.length > 0)
              {
                $('#pictures').empty();
                this.$el.find('#no-uploads').hide();
                _.each(this.savedMeals.models, function(meal, idx){
                  var data = { cid : meal.id,
                               fileSource : meal.get('file')._url,
                               caption : meal.get('caption'),
                               favorites : !_.isUndefined(meal.get('favorites')) || !_.isEmpty(meal.get('favorites')) ? meal.get('favorites').length : '',
                               profileView : this.inProfileView
                             };
                  this.$el.find('#pictures').append(_.template(pictureTemplate, data ));
                }.bind(this));
              }
              else
              {
                console.log('Showing the alert');
                this.$('#no-uploads').show();
              }
            },

            close: function()
            {
              this.unbind();
              //this.remove();
            },
            loadProfileSection : function( event )
            {
              var section = event.currentTarget.id;
              var sectionActions = { 'profile-uploads' : { 'profile-uploads' : 'show', 'profile-settings' : 'hide' },
                                     'profile-settings' : { 'profile-uploads' : 'hide', 'profile-settings' : 'show' }
                                   };
              //var actions = sectionActions[ section ];

              this.$('.profile-uploads')[ sectionActions[ section ]['profile-uploads'] ]();
              this.$('.profile-settings')[ sectionActions[ section ]['profile-settings'] ]();

              if( section == 'profile-settings' )
              {
                this.$('input#name').val(this.currentUser.get('name'));
                this.$('input#username').val(this.currentUser.get('username'));
                this.$('input#email').val(this.currentUser.get('email'));
                if(this.currentUser.get('privatePosts'))
                  this.$('input#private-posts').attr('checked', 'checked');
                else
                  this.$('input#private-posts').removeAttr('checked');
              }
            },
            saveProfile : function( event )
            {
              console.log('Saving the profile settings changes');
              this.currentUser.set('name', this.$('input#name').val());
              this.currentUser.set('username', this.$('input#username').val());
              this.currentUser.set('email', this.$('input#email').val());
              this.currentUser.set('privatePosts', this.$('input#private-posts').is(":checked") ? true : false);

              this.currentUser.save(null, {
                success : function( user ){
                  console.log('User settings saved', user);
                  this.$('#settings-success').show();
                  this.$('#settings-errors').hide();
                },
                error : function( user, error ){
                  console.log('There was an error saving the user settings');
                  this.$('#settings-success').hide();
                  this.$('#settings-errors').show();
                }
              });
            },
            resetPassword : function( event ){
              Parse.User.requestPasswordReset( this.currentUser.get('email'), {
                success: function() {
                  // Password reset request was sent successfully
                },
                error: function(error) {
                  // Show the error message somewhere
                  alert("Error: " + error.code + " " + error.message);
                }
              });
            },
            openUploadModal : function( event )
            {
              console.log('Opening the modal on this click', event);

              this.$('#uploadModal').modal({ show : true });

              event.preventDefault();
            },

            openFileBrowser : function( event ){
              this.$('#fileupload').click();
            },

            uploadPhoto : function( event )
            {
              var self = this;
              console.log('Uploading the photo on this click', event);
              var files = this.$('#fileupload')[0].files;

              var file = files[0];

              var name = 'photo.' + file.name.substring(file.name.lastIndexOf('.') + 1);

              this.parseFile = new Parse.File(name, file);

              this.parseFile.save().then(function(){
                console.log('The file was saved', self.parseFile);

                $('#modal-image').attr('src', '' + self.parseFile._url + '');
                //$('#pictures').append(_.template(pictureTemplate, { cid : newModel.cid, fileSource : this.parseFile.get('fileData')._url }));
                $('#save').removeClass('disabled');

              }, function( error ){
                  console.log('There was an error saving the file', error);
              });

              event.preventDefault();
            },

            uploadMeal : function( event ){
              var self = this;
              var caption = $('#caption').val();
              var newMeal = new this.FoodieMeal({ user_id : this.currentUser.id, file : this.parseFile, caption : caption, ACL : this.currentUser.get('privatePosts') ? new Parse.ACL( this.currentUser ) : undefined });
              if(this.currentUser.get('privatePosts'))
                newMeal.setACL(new Parse.ACL( this.currentUser ));
              console.log( newMeal );
              newMeal.save().then(function(){
                console.log('The FoodieFile object was saved successfully', newMeal);

                if($('#no-uploads').is(":visible"))
                {
                  $('#no-uploads').hide();
                }
                var newModel = self.savedMeals.add( newMeal );

                console.log('Appending the new meal', self);
                var data = { cid : newMeal.id,
                             fileSource : self.parseFile._url,
                             favorites : !_.isUndefined(newMeal.get('favorites')) ? newMeal.get('favorites').length : '',
                             caption : newMeal.get('caption'),
                             profileView : self.inProfileView
                           };

                var temp = _.template(pictureTemplate, data );

                console.log('Template created');

                self.$('#pictures').append( temp );

                console.log('New meal appended. Hiding the modal');

                self.$('#uploadModal').modal('hide');

                console.log('Modal hidden');

              }, function( error ){
                console.log('There was an error saving the FoodieFile', error);
              });
            },

            confirmDelete : function( event )
            {
              this.photoToDelete = event;
              this.$('#delConfModal').modal({ show : true });
            },

            deletePhoto : function( event )
            {
              this.$('#delConfModal').modal('hide');

              var $elem = $(this.photoToDelete.currentTarget),
                  divModel = $elem.data('model'),
                  mealModel = this.savedMeals.get( divModel );

              mealModel.destroy();
              this.savedMeals.remove( mealModel );

              this.renderUploads();

              //this.$('div#' + divModel).remove();
            }
        });

        return View;

    }

);
