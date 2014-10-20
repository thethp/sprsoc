define(['underscore', 'backbone', 'models/tweet'], function(_, Backbone, Tweet) {
  'use strict';
  
  var Tweets = Backbone.Collection.extend({
     model: Tweet,
     url: 'tweets.json',
     parse: function (response) {
       return response.tweets;
     },

     sortDescendingDate: function(tweet) { 
       return tweet.get('created_at').getTime(); 
     },
     
     sortAscendingDate: function(tweet) { 
       return -tweet.get('created_at').getTime(); 
     },

     sortAscendingName: function(tweetA, tweetB) {
       if(tweetA.get('sort_name') < tweetB.get('sort_name')) { return -1; }
       if(tweetB.get('sort_name') < tweetA.get('sort_name')) { return 1;  }
       return 0;
     }

  });

  return new Tweets();
});