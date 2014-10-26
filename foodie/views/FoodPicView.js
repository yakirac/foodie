define([ "jquery", "underscore", "backbone", "parse", "vague",
"text!templates/foodpic.html", "text!templates/comment.html", "jquery.ui.widget",
"jquery.iframe-transport", "jquery.fileupload"],

    function( $, _, Backbone, Parse, Vague, template, commentTemplate ){

      var bootstrap = SP.app.bootstrap;

    var View = Backbone.View.extend({

            /*el: "#app-holder",
            hasRendered : false,*/
            initialize: function( options ) {

              //change the prop name options to root
              //var self = this.changePropName( this );

              this.options = options;

              this.model = this.options.model;

              console.log(this.model);

              //bind methods to listen to and set THIS as the context
              _.bindAll( this, 'render', 'close');

              this.currentUser = Parse.User.current();


            },

            // View Event Handlers
            events: {
              'click #add-comment' : 'addComment'
            },

            render: function() {

              this.$el.empty();

              var comments = '';
              if(!_.isUndefined(this.model.get('comments')))
              {
                  _.each(this.model.get('comments').reverse(), function( comment, idx){
                    console.log(comment);
                    comments += _.template(commentTemplate, { comment : comment });
                  });
              }

              var data = { id : this.model.get('id'),
                           name : this.currentUser ? this.currentUser.get('name') : 'Guest',
                           fileSource : this.model.get('file')._url,
                           caption : this.model.get('caption'),
                           comments : comments,
                           likes : this.model.get('likes')
                         };

              this.$el.html( _.template( template, data ) );

              return this;
            },

            close: function()
            {
              this.unbind();
              //this.remove();
            },

            addComment : function()
            {
              var self = this;
              var comment = $('#comment').val();
              this.model.add("comments", comment);
              console.log(this.model);
              this.model.save(null, {
                success : function( meal ){
                  console.log('The model with the comment was saved', meal);
                  self.render();
                },
                error : function( object, error){
                  console.log('There was an error saving the model', error);
                }
              });
            }
        });

        return View;

    }

);
