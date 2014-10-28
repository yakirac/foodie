define([ "jquery", "underscore", "backbone", "parse", "models/Meal"],

    function( $, _, Backbone, Parse, Meal ){

      var bootstrap = SP.app.bootstrap;

      /*Parse.initialize("ibJOzxIQ10DOycHb9iFMxy0JuJsaDdOgnZyvdXVu",
      "EHZVNuL1pWqIi1BOQn1z7UprtbvvqTBkUBNmv8ia");*/

      //console.log('UserMeals user', Parse.User.current());

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
