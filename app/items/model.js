define(['backbone'], function (Backbone) {
    'use strict';

    return Backbone.Model.extend({
        idAttribute: 'item_id'
    });
});