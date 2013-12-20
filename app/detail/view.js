define(['jquery', 'underscore', 'backbone', 'text!detail/template.html'], function(
            $, _, Backbone, viewTemplate) {
    'use strict';

    var View = Backbone.View.extend({
        template:_.template(viewTemplate),

        className: 'content-detail-inner',

        render: function(){
            this.$el.html(this.template({
                item:this.model.toJSON()
            }));

            return this;
        }
    });

    return View;
});