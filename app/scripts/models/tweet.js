define(['underscore', 'backbone'], function(_, Backbone) {
  'use strict';

  var Tweet = Backbone.Model.extend({
    defaults: {
      id: 0,
      created_at: new Date(),
      display_date: '',
      attr_date: '',
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
      this.set('display_date', this.formatDate(createdDate));
      this.set('attr_date', createdDate.toLocaleDateString('en-US'));
      
      this.set('sort_name', this.attributes.screen_name.toLowerCase());
    },

    formatDate: function(createdDate) {
      var secsAway = Math.floor(new Date().getTime()/1000 - createdDate.getTime()/1000);

      var interval = Math.floor(secsAway/31536000);
      if (interval > 1) return interval+' years ago';

      interval = Math.floor(secsAway/2592000);
      if (interval > 1) return interval+'mnthss ago';

      interval = Math.floor(secsAway/86400);
      if (interval >= 1) return interval+' days ago';

      interval = Math.floor(secsAway/3600);
      if (interval >= 1) return interval+' hrs ago';

      interval = Math.floor(secsAway/60);
      if (interval > 1) return interval+' mins ago';

      return Math.floor(secsAway)+' secs ago';
    },

    toggleFollowUp: function() {
      this.set('follow_up', !this.get('follow_up'));
    }
  });

  return Tweet;
});