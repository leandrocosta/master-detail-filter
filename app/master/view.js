define(['jquery', 'underscore', 'backbone', 'text!master/template.html', 'master/itemView', 'waypoints'], function(
            $, _, Backbone, viewTemplate, ItemView) {
    'use strict';

    var View = Backbone.View.extend({
        template: _.template(viewTemplate),
        tagName: 'ul',
        className: 'list-unstyled',

        initialize: function(options) {
            _.extend(this, options);
            this.collection.on('reset', this.render, this);
            this.collection.on('sync', this.update, this);
            this.collection.on('error', this.update_error, this);
        },

        render: function(){
            $.waypoints('destroy');
            this.$el.html(this.template());

            if (_.isEmpty(this.collection.models)) {
                this.collection.fetch();
            } else {
                this.renderItems(0);
                this.selectFirstItem();
            }

            return this;
        },

        update: function() {
            this.renderItems(this.collection.offset);

            if (this.collection.offset === 0) {
                this.selectFirstItem();
            }
        },

        update_error: function() {
            console.log('error');
            //$('li:last', this.$el).html('<i class="icon-thumbs-down icon-large"> Erro de conexão com o servidor.');
        },

        renderItems: function(offset) {
            var self = this;

            while (offset < self.collection.length) {
                var model = self.collection.at(offset);

                var view = new ItemView({
                    model: model,
                    index: offset+1,
                    total_count: self.collection.total_count,
                    item_target: '#item',
                });

                $('li:last', self.$el).before(view.render().el);

                offset+=1;
            }

            if (self.collection.next) {
                $('li:last', self.$el).waypoint(function (direction) {
                    self.collection.fetch({add:true,remove:false});
                }, {context:'.content-master', triggerOnce: true, offset: '100%'});
            } else {
                $('li:last', self.$el).remove();
            }
        },

        selectFirstItem: function() {
            $('li:first', this.$el).addClass('selected');
        }
    });

    return View;
});
