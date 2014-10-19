define(['underscore', 'backbone'], function(_, Backbone) {
  'use strict';

  var Tweet = Backbone.Model.extend({
    defaults: {
      id: 0,
      created_at: '',
      text: '',
      name: '',
      screen_name: '',
      profile_image_url: '',
      follow_up: false
    },

    toggleFollowUp: function() {
      this.set('follow_up', !this.get('follow_up'));
    }
  });

  return Tweet;
});