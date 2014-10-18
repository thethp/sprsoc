define(['jquery', 'underscore', 'backbone', 'collections/tweets', 'views/tweet'], function($, _, Backbone, Tweets, TweetView) {
  'use strict';

  var app = Backbone.View.extend({
    el: 'body',
    initialize: function() {
      this.listenTo(Tweets, 'reset', this.handleAllTweets);      

      Tweets.fetch({reset: true});
    },

    addTweet: function(tweet) {
      var tweetView = new TweetView({model:tweet});
      $('#tweetHolder').append(tweetView.render());
    },
    
    handleAllTweets: function() {
      Tweets.each(this.addTweet);
    }
  });

  return app;
});