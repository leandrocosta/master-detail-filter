define(['jquery', 'underscore', 'backbone', 'text!filter/template.html',
		'filter/selectView', 'filter/multiselectView', 'tastypie/collection'], function(
			$, _, Backbone, viewTemplate, SelectView, MultiselectView, ResourcesCollection) {
	'use strict';


    var View = Backbone.View.extend({
        template: _.template(viewTemplate),

        initialize: function(options) {
            _.extend(this, options);
        },

        render: function() {
            var self = this;
            self.$el.html(self.template);

            new MultiselectView({
                el: $('#option1', self.$el),
                label_singular: 'OPTION',
                label_plural: 'OPTIONS',
                collection: new ResourcesCollection([], {
                    model: Backbone.Model.extend({
                        idAttribute:'option1_id'
                    }),
                    resource_name: 'options1',
                }),
                field_name:'option1__option1_id__in',
                selected_options: self.selected_options,
            }).render();

			new MultiselectView({
                el: $('#option2', self.$el),
                label_singular: 'OPTION',
                label_plural: 'OPTIONS',
                collection: new ResourcesCollection([], {
                    model: Backbone.Model.extend({
                        idAttribute:'option2_id'
                    }),
                    resource_name: 'options2',
                }),
                field_name:'option2__option2_id__in',
                selected_options: self.selected_options,
            }).render();

            new SelectView({
                el: $('#option3', self.$el),
                label_plural: 'OPTIONS',
                field_name: 'option3__gte',
                data_options: [
                    {label:'1 or more', value:'1'},
                    {label:'2 or more', value:'2'},
                    {label:'3 or more', value:'3'},
                    {label:'4 or more', value:'4'}],
                selected_options: self.selected_options,
            }).render();

            new SelectView({
                el: $('#option4', self.$el),
                label_plural: 'OPTIONS',
                field_name: 'option4__gte',
                data_options: [
                    {label:'0 or more', value:'0'},
                    {label:'1 or more', value:'1'},
                    {label:'2 or more', value:'2'},
                    {label:'3 or more', value:'3'}],
                selected_options: self.selected_options,
            }).render();

            return self;
        }
    });

    return View;
});
