define(['underscore', 'backbone', 'models/tweet'], function(_, Backbone, Tweet) {
  'use strict';
  
  var Tweets = Backbone.Collection.extend({
     model: Tweet,
     url: 'tweets.json',
     parse: function (response) {
       return response.tweets;
     }
  });

  return new Tweets();
});