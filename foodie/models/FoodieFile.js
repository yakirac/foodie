define([ "jquery", "underscore", "backbone", "parse"],

    function( $, _, Backbone, Parse){

      var bootstrap = SP.app.bootstrap;

      //Parse Object
      var Model = Parse.Object.extend("FoodieFile", {});

      return Model;

    }

);
