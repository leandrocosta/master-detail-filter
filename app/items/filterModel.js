define(['backbone'], function (Backbone) {
    'use strict';

    return Backbone.Model.extend({
        defaults: {
            'option1__option1_id__in': [],
            'option2__option2_id__in': [],
            'option3__gte': 1,
            'option4__gte': 0,
        }
    });
});