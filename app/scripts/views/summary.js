define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
  'use strict';

  var tweet = Backbone.View.extend({
    attributes: {
      class: 'tweetSummary'
    },
    initialize: function(){
      this.listenTo(this.collection, 'reset remove change', this.updateTweetCount);

      this.render();
    },

    render: function() {
      var template = _.template($('#tweetSummary').html());
      return this.$el.html(template);
    },

    updateTweetCount: function() {
      this.$('.totalTweets').html(this.collection.length);
      this.$('.followUpTweets').html(this.collection.where({follow_up: true}).length);
    }

  });  

  return tweet;
});