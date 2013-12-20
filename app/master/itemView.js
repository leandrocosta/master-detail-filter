define(['jquery', 'underscore', 'backbone', 'text!master/itemTemplate.html'], function($, _, Backbone, viewTemplate) {
    'use strict';

    var View = Backbone.View.extend({
        template:_.template(viewTemplate),
        tagName: 'li',
        className: 'row list-item',

        events: {
            'click a': 'selectItem'
        },

        initialize: function(options) {
            _.extend(this, options);
        },

        render: function(){
            var self = this;

            this.$el.html(this.template({
                item: self.model.toJSON(),
                index: self.index,
                total_count: self.total_count,
                item_target: self.item_target,
            }));

            return this;
        },

        selectItem: function (ev) {
            this.$el.siblings().removeClass('selected');
            this.$el.addClass('selected');
            return true;
        }
    });

    return View;
});
