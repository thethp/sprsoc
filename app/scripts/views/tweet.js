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
        'click .remove, .cancel': 'toggleTweetRemove',
        'click .removeIt': 'removeTweet',
        'change input[name=follow]': 'toggleFollow'
    },

    render: function() {
      var template = _.template($('#tweet').html(), this.model.toJSON());
      return this.$el.html(template);
    },
 
    toggleTweetRemove: function(e) {
      this.$el.toggleClass('showConfirm');
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
      this.$('.followSpan').toggleClass('checked');
    }

  });  

  return tweet;
});