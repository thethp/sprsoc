define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
  'use strict';

  var tweet = Backbone.View.extend({
    initialize: function(){
      this.render();
    },

    events: {
        'click .remove': 'removeTweet',
        'change input[name=follow]': 'toggleFollow'
    },

    render: function() {
      var template = _.template($('#tweet').html(), this.model.toJSON());
      return this.$el.html(template);
    },

    removeTweet: function(e) {
      this.model.collection.remove(this.model);
      this.remove();
    },

    toggleFollow: function(e) {
      this.model.toggleFollowUp(); 
    }

  });  

  return tweet;
});