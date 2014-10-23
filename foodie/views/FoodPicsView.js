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

              this.savedMeals = this.options.mealCollection;

              this.FoodieMeal = Parse.Object.extend("Meal");

              //this.savedMeals = new Meals(bootstrap.images.files);

              this.$el.html( _.template( template, {} ) );

              //this.render();

            },

            // View Event Handlers
            events: {
              'click #photo-upload' : 'openUploadModal',
              'click #uploader'     : 'openFileBrowser',
              'change #fileupload'  : 'uploadPhoto',
              'click #save'         : 'uploadMeal',
              'click #delete'       : 'confirmDelete',
              'click #ok'           : 'deletePhoto'
            },

            render: function() {
              var self = this;

              if(this.savedMeals.length > 0)
              {
                $('#pictures').empty();
                this.$el.find('#no-photos').hide();
                console.log(this.savedMeals);

                _.each(this.savedMeals.models, function(meal, idx){
                  this.$el.find('#pictures').append(_.template(pictureTemplate, {cid : meal.id, fileSource : meal.get('file')._url, caption : meal.get('caption') }));
                }.bind(this));
              }
              else
              {
                console.log('Showing the alert');
                $('#no-photos').show();
              }

              /*this.$('#fileupload').fileupload({
                  url: 'uploadfiles.php',
                  dataType : 'json',
                  add : function(e, data){
                    $('#pictures').append(_.template(pictureTemplate, { cid : "temp", fileSource : "" }));
                    $('#temp').find('.preview').css({ "display" : "block" });
                    $('#temp').find('.progress').show();
                    data.submit()
                    .success( function( result, status, jqXHR ){
                      console.log('Success', self);
                      if(!_.isUndefined(result.files))
                      {
                        _.each(result.files, function(file, idx){
                          if($('#no-photos').is(":visible"))
                          {
                            $('#no-photos').hide();
                          }
                          $('#temp').remove();
                          var newModel = self.savedMeals.add({ file_name : file.name });
                          $('#pictures').append(_.template(pictureTemplate, { cid : newModel.cid, fileSource : file.path }));
                        });
                      }

                    })
                    .error( function( result, status, jqXHR ){
                      console.log('Error', status);
                    })
                    .complete( function( result, status, jqXHR ){
                    });
                  },
                  done : function(e, data){
                    console.log(data);
                  },
                  progressall : function(e, data){
                    var progress = parseInt(data.loaded / data.total * 100, 10);
                    $('#temp').find('.progress-bar').css('width', progress + '%');
                    console.log('The progress data', progress);
                  }
              });*/


              return this;
            },

            close: function()
            {
              this.unbind();
              //this.remove();
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

              /*parseFile.save.addEventListener("progress", function( e ){
                console.log('Progress', e);
              });*/

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
              var newMeal = new this.FoodieMeal({ file : this.parseFile, caption : caption });
              console.log( newMeal );
              newMeal.save().then(function(){
                console.log('The FoodieFile object was saved successfully', newMeal);

                if($('#no-photos').is(":visible"))
                {
                  $('#no-photos').hide();
                }
                var newModel = self.savedMeals.add( newMeal );

                $('#pictures').append(_.template(pictureTemplate, { cid : newMeal.id, fileSource : self.parseFile._url, caption : newMeal.get('caption') }));

                this.$('#uploadModal').modal('hide');

              }, function( error ){
                console.log('There was an error saving the FoodieFile', error);
              });
            },

            confirmDelete : function()
            {
              this.$('#delConfModal').modal({ show : true });
            },

            deletePhoto : function( event )
            {
              this.$('#delConfModal').modal('hide');

              var $elem = $(event.currentTarget),
                  divModel = $elem.data('model'),
                  mealModel = this.savedMeals.get( divModel );

              mealModel.destroy();
              this.savedMeals.remove( mealModel );

              this.render();

              //this.$('div#' + divModel).remove();
            }
        });

        return View;

    }

);
