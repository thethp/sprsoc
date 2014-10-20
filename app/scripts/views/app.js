define(['jquery', 'underscore', 'backbone', 'collections/tweets', 'views/tweet', 'views/summary'], function($, _, Backbone, Tweets, TweetView, SummaryView) {
  'use strict';

  var app = Backbone.View.extend({
    el: 'body',
    initialize: function() {
      this.$tweetHolder = this.$('#tweetHolder');
      this.$summaryHolder = this.$('.right.col'); 

      this.listenTo(Tweets, 'reset', this.handleAllTweets);      
      Tweets.fetch({reset: true});

      var summaryView = new SummaryView({collection:Tweets});
      this.$summaryHolder.append(summaryView.render());
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
      Tweets.each(this.addTweet, this);
    },

  });

  return app;
});