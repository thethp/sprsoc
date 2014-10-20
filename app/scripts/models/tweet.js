define(['underscore', 'backbone'], function(_, Backbone) {
  'use strict';

  var Tweet = Backbone.Model.extend({
    defaults: {
      id: 0,
      created_at: new Date(),
      display_date: '',
      text: '',
      name: '',
      screen_name: '',
      sort_name: '',
      profile_image_url: '',
      follow_up: false
    },

    initialize: function() {
      var createdDate = new Date(this.attributes.created_at);
      this.set('created_at', createdDate);
      this.set('display_date', createdDate.toLocaleDateString('en-US'));
      
      this.set('sort_name', this.attributes.screen_name.toLowerCase());
    },

    toggleFollowUp: function() {
      this.set('follow_up', !this.get('follow_up'));
    }
  });

  return Tweet;
});