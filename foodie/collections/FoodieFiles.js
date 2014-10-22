define([ "jquery", "underscore", "backbone", "parse", "models/FoodieFile"],

    function( $, _, Backbone, Parse, FoodieFile ){

      var bootstrap = SP.app.bootstrap;

      //ParseCollection
      var Collection = Parse.Collection.extend({
        model : FoodieFile
      });

      return Collection;

    }

);
