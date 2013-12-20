define(['underscore', 'backbone'], function (_, Backbone) {
    'use strict';

    return Backbone.Collection.extend({
        //baseUrl: 'http://localhost',
        perPage: 20,
        filter: {},
        next: null,

        initialize: function(models, options) {
            _.extend(this, options);
        },

        url: function() {
            var url = (this.baseUrl ? this.baseUrl : '') + (this.next ? this.next.replace(/callback=[^\&]+/, 'callback=?') : this.buildUrl());

            return url;
        },

        buildUrl: function() {
            var url = '/api/v1/' + this.resource_name + '/?format=jsonp&callback=?' + '&limit=' + this.perPage;

            _.each(this.filter.attributes, function(val, key){
                if (key === 'id') {
                    // do nothing
                } else if (val instanceof Array) {
                    _.each(val, function(e){
                        url += '&' + key + '=' + e;
                    });
                } else {
                    url += '&' + key + '=' + val;
                }
            });

            return url;
        },

        parse: function(response) {
            //console.log('parsing');
            this.total_count = response.meta.total_count;
            this.offset = response.meta.offset;
            this.next = response.meta.next;

            return response.objects;
        },

        reset: function() {
            this.total_count = undefined;
            this.offset = undefined;
            this.next = undefined;
            Backbone.Collection.prototype.reset.call(this);
        }
    });
});