define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
  'use strict';

  var tweet = Backbone.View.extend({
    initialize: function(){
      this.render();
    },

    render: function() {
      var template = _.template($('#tweet').html(), this.model.toJSON());
      return this.$el.html(template);
    }
  });  

  return tweet;
});