define(['jquery', 'underscore', 'backbone',
        'text!filter/multiselectItemTemplate.html'], function (
            $, _, Backbone, viewTemplate) {
    'use strict';

    var View = Backbone.View.extend({
        template:_.template(viewTemplate),

        initialize: function(options) {
            _.extend(this, options);
        },

        render: function(){
            this.$el.append(this.template({
                value: this.value,
                name: this.name,
                is_checked: this.is_checked
            }));

            return this;
        }
    });

    return View;
});