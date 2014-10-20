define(['jquery', 'underscore', 'backbone', 'collections/tweets', 'views/tweet'], function($, _, Backbone, Tweets, TweetView) {
  'use strict';

  var app = Backbone.View.extend({
    el: 'body',
    initialize: function() {
      this.$tweetHolder = this.$('#tweetHolder');
      this.$totalTweets = this.$('.totalTweets');
      this.$followUpTweets = this.$('.followUpTweets');       

      this.listenTo(Tweets, 'reset', this.handleAllTweets);      
      this.listenTo(Tweets, 'remove', this.handleAllTweets);
      this.listenTo(Tweets, 'sync', this.updateTweetCount);

      Tweets.fetch({reset: true});
    },

    events: {
      'click .sortDate': 'handleAllTweets'
    },

    addTweet: function(tweet) {
      var tweetView = new TweetView({model:tweet});
      this.$tweetHolder.append(tweetView.render());
    },
    
    handleAllTweets: function() {
      this.$tweetHolder.empty();
      this.updateTweetCount();
      Tweets.each(this.addTweet, this);
    },

    updateTweetCount: function() {
      this.$totalTweets.html(Tweets.length);
      this.$followUpTweets.html(Tweets.where({follow_up: true}).length);
    },

  });

  return app;
});