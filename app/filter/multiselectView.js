define(['jquery', 'underscore', 'backbone', 'filter/multiselectItemView',
        'bootstrap_multiselect'], function(
            $, _, Backbone, FilterOptionMultiselectItemView
        ) {
    'use strict';

    var View = Backbone.View.extend({
        initialize: function(options) {
            _.extend(this, options);

            this.collection.on('sync', this.update, this);
            this.collection.on('error', this.update_error, this);
        },

        render: function(){
            if (_.size(this.collection) === 0) {
                this.collection.fetch(null, []);
            } else {
                var self = this;
                setTimeout(function(){
                    self.update();
                }, 1);
            }

            return this;
        },

        update: function() {
            var self = this;
            var selected_options_ids = self.selected_options.get(self.field_name);

            this.collection.each(function(model) {
                new FilterOptionMultiselectItemView({
                    el: self.$el,
                    value: model.id,
                    name: model.get(self.label_attr_name),
                    is_checked: _.contains(selected_options_ids, model.id.toString())
                }).render();
            });

            self.$el.multiselect({
                enableCaseInsensitiveFiltering: true,
                buttonClass: 'btn btn-link',
                filterPlaceholder: 'Pesquisar',
                maxHeight: '400',
                buttonText: function(options) {
                    var filtered_options = options.map(function(i, e) {
                        return e.value;
                    }).get();
                    self.selected_options.set(self.field_name, filtered_options);
                    self.selected_options.save();

                    if (options.length === 0) {
                        return self.label_plural + ' <b class="caret"></b>';
                    } else if (options.length == 1) {
                        return '1 ' + self.label_singular + ' <b class="caret"></b>';
                    } else {
                        return options.length + ' ' + self.label_plural + ' <b class="caret"></b>';
                    }
                }
            });
        },

        update_error: function() {
            console.log('ERRO: Sem conexão com o servidor.');
        }
    });

    return View;
});
