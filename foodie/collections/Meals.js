define([ "jquery", "underscore", "backbone", "parse", "models/Meal"],

    function( $, _, Backbone, Parse, Meal ){

      var bootstrap = SP.app.bootstrap;

      //Backbone Collection
      /*var Collection = Backbone.Collection.extend({
          model : Meal,

          deleteMeal : function( model )
          {
            var xhr = model.delete();

            this.remove( model );
          }

      });*/

      //ParseCollection
      var Collection = Parse.Collection.extend({
        model : Meal,

        deleteMeal : function( model )
        {
          var xhr = model.destroy();

          this.remove( model );
        }
      });

      return Collection;

    }

);
