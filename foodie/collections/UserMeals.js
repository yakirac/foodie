define([ "jquery", "underscore", "backbone", "parse", "models/Meal"],

    function( $, _, Backbone, Parse, Meal ){

      var bootstrap = SP.app.bootstrap;

      Parse.initialize("ibJOzxIQ10DOycHb9iFMxy0JuJsaDdOgnZyvdXVu",
      "EHZVNuL1pWqIi1BOQn1z7UprtbvvqTBkUBNmv8ia");

      //ParseCollection
      var Collection = Parse.Collection.extend({
        model : Meal,

        query : (new Parse.Query(Meal)).equalTo("user_id", !_.isNull(Parse.User.current()) ? Parse.User.current().id : '' ),

        deleteMeal : function( model )
        {
          var xhr = model.destroy();

          this.remove( model );
        }

      });

      return Collection;

    }

);
