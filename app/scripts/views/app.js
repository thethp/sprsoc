define(['jquery', 'underscore', 'backbone', 'timeago', 'collections/tweets', 'views/tweet', 'views/summary'], function($, _, Backbone, timeago, Tweets, TweetView, SummaryView) {
  'use strict';

  var app = Backbone.View.extend({
    el: 'body',
    initialize: function() {
      this.$tweetHolder = this.$('#tweetHolder');
      this.$summaryHolder = this.$('.right.col');
      this.sortOn = 'date'; 
      this.sortAscending = false;      

      this.listenTo(Tweets, 'reset sort', this.handleAllTweets);      
      Tweets.fetch({reset: true});

      var summaryView = new SummaryView({collection:Tweets});
      this.$summaryHolder.append(summaryView.render());
    },

    events: {
      'click .username.sortable': 'toggleSort'
    },

    addTweet: function(tweet) {
      var tweetView = new TweetView({model:tweet});
      this.$tweetHolder.append(tweetView.render());
    },
    
    handleAllTweets: function() {
      this.$tweetHolder.empty();
      Tweets.each(this.addTweet, this);
    },

    toggleSort: function(e) {
      if($(e.currentTarget).hasClass('username')) {
        if(this.sortOn === 'date') {
          Tweets.comparator = 'sort_name';
        } else {
            Tweets.models = Tweets.models.reverse();
        }
      }

      if($(e.currentTarget).hasClass('date')) {
          if(this.sortOn === 'date') {
              Tweets.comparator = function(tweet) { return tweet.get('created_at').getTime();  };
          } else {
              Tweets.comparator = function(tweet) { return -tweet.get('sort_name'); };
          }
      }

      Tweets.sort();
    }

  });

  return app;
});