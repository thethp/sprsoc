define(['jquery', 'underscore', 'backbone', 'collections/tweets', 'views/tweet', 'views/summary'], function($, _, Backbone, Tweets, TweetView, SummaryView) {
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
      'click .sortable': 'toggleSort'
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
      var currTarg = $(e.currentTarget);
      if(currTarg.hasClass('sorted')) {
        if(currTarg.hasClass('asc')) {
          this.sortAscending = false;
          currTarg.removeClass('asc').addClass('desc');
        } else {
          this.sortAscending = true;
          currTarg.removeClass('desc').addClass('asc');
        }
      } else {
        $('.sortable').removeClass('sorted');
        currTarg.addClass('sorted desc');
        this.sortAscending = true;
      }

      if(currTarg.hasClass('username')) {
        if(this.sortOn === 'date') {
            this.sortOn = 'name';
            this.sortAscending = false;
        }
        if(this.sortAscending === true) {
          this.sortAscending = false;
          Tweets.comparator = 'sort_name';
        } else {
          this.sortAscending = true;
          Tweets.comparator = Tweets.sortAscendingName;
        }
      }

      if($(e.currentTarget).hasClass('date')) {
          if(this.sortOn === 'name') {
              this.sortOn = 'date';
              this.sortAscending = false;
          }        
          if(this.sortAscending === true) {
            this.sortOn = 'date';
            this.sortAscending = false;
            Tweets.comparator = Tweets.sortDescendingDate;
          } else {
            this.sortAscending = true;
            Tweets.comparator = Tweets.sortAscendingDate;
          }
      }

      Tweets.sort();
    }

  });

  return app;
});