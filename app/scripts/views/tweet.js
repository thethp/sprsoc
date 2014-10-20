define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
  'use strict';

  var tweet = Backbone.View.extend({
    attributes: {
      class: 'tweet'
    },
    initialize: function(){
      this.render();
    },

    events: {
        'click .remove': 'confirmRemove',
        'click .removeIt': 'removeTweet',
        'change input[name=follow]': 'toggleFollow'
    },

    render: function() {
      var template = _.template($('#tweet').html(), this.model.toJSON());
      return this.$el.html(template);
    },
 
    confirmRemove: function(e) {
      this.$el.addClass('showConfirm');
    },

    removeTweet: function(e) {
      var me = this;      
      this.$el.slideUp(function() {
        me.model.collection.remove(me.model);
        me.remove();
      });
    },

    toggleFollow: function(e) {
      this.model.toggleFollowUp();
    }

  });  

  return tweet;
});