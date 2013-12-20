define(['backbone', 'items/filterModel', 'backbone_localStorage'], function (Backbone, Model) {
    'use strict';

    return Backbone.Collection.extend({
        model: Model,
        localStorage: new Backbone.LocalStorage('items-filter')
    });
});