define([ "jquery", "underscore", "backbone", "parse"],

    function( $, _, Backbone, Parse){

      var bootstrap = SP.app.bootstrap;

      //Backbone Model
      /*var Model = Backbone.Model.extend({

        delete : function()
        {
          var options = {
            url : 'foodieapi.php?action=delete&id=' + this.get('id'),
            type : 'DELETE'
          };

          return $.ajax(options);
        }

      });*/

      //Parse Object
      var Model = Parse.Object.extend({

        className : 'Meal'
        /*delete : function()
        {
          var options = {
            url : 'foodieapi.php?action=delete&id=' + this.get('id'),
            type : 'DELETE'
          };

          return $.ajax(options);
        }*/

      });

      return Model;

    }

);
