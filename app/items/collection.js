define(['tastypie/collection', 'items/model'], function (TastypieCollection, Model) {
    'use strict';

    return TastypieCollection.extend({
        model: Model,
        resource_name: 'items',
    });
});