define([ "jquery", "underscore", "backbone", "parse", "models/model.boilerplate"],

    function( $, _, Backbone, Parse, Model ){

      var bootstrap = SP.app.bootstrap;

      //ParseCollection
      var Collection = Parse.Collection.extend({
        model : Model
      });

      return Collection;

    }

);
