define(['jquery', 'underscore', 'backbone', 'filter/multiselectItemView',
        'bootstrap_multiselect'], function(
            $, _, Backbone, MultiselectItemView) {
    'use strict';

    var View = Backbone.View.extend({
        initialize: function(options) {
            _.extend(this, options);
        },

        render: function(){
            var self = this;

            $.each(self.data_options, function(i, e){
                new MultiselectItemView({
                    el: self.$el,
                    value: e.value,
                    name: e.label,
                    is_checked: (self.selected_options.get(self.field_name) === e.value)
                }).render();
            });

            self.$el.multiselect({
                buttonClass: 'btn btn-link',
                buttonText: function(options, select) {
                    return options[0].value + '+ ' + self.label_plural + ' <b class="caret"></b>';
                }, onChange: function(element, checked) {
                    self.selected_options.set(self.field_name, element.val());
                    self.selected_options.save();
                }
            });

            return this;
        }
    });

    return View;
});