define(['jquery', 'underscore', 'backbone', 'text!home/template.html',
        'filter/view', 'master/view', 'detail/view', 'items/collection',
        'filter/selected-options'], function(
            $, _, Backbone, viewTemplate,
            FilterView, MasterView, DetailView, ItemsCollection, selected_options) {
    'use strict';

    var View = Backbone.View.extend({
        template: _.template(viewTemplate),

        events: {
            'click #update:not(.disabled)': 'update',
            'click .content-master a': 'showItem',
        },

        collection: new ItemsCollection([], {
            model: Backbone.Model.extend({
                idAttribute: 'item_id'
            }),
            resource_name: 'items'
        }),

        render: function() {
            this.$el.html(this.template);
            this.buildAndRenderFilterView();

            this.collection.once('sync', function() {
                this.buildAndRenderDetailView(this.collection.first());
            }, this);
            this.buildAndRenderMasterView();

            return this;
        },

        buildAndRenderFilterView: function() {
            new FilterView({
                el: $('.subnav .navbar', this.$el),
                selected_options: selected_options
            }).render();
        },

        buildAndRenderMasterView: function() {
            this.masterView = new MasterView({
                collection:this.collection
            });
            $('.content-master', this.$el).html(this.masterView.el);
            this.masterView.render();
        },

        update: function() {
            this.collection.once('sync', function() {
                this.rebuildAndRenderDetailView(this.collection.first());
            }, this);
            this.collection.reset();

            return false;
        },

        showItem: function(ev) {
            var item_id = $(ev.currentTarget).data('id');
            this.rebuildAndRenderDetailView(this.masterView.collection.get(item_id));
            return false;
        },

        buildAndRenderDetailView: function(model) {
            this.detailView = new DetailView({
                model: model,
            });

            $('.content-detail', this.$el).html(this.detailView.el);
            this.detailView.render();
        },

        destroyDetailView: function() {
            this.detailView.remove();
        },

        rebuildAndRenderDetailView: function(model) {
            this.destroyDetailView();
            this.buildAndRenderDetailView(model);
        }
    });

    return View;
});