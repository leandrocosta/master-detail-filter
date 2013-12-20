require(['backbone', 'master/view'], function(Backbone, MasterView) {
    'use strict';

    describe('MasterView', function() {
        it('should fetch when rendered with an empty collection', function() {
            var Collection = Backbone.Collection.extend({
                url: '/resources'
            });
            var collection = new Collection();
            var spy = sinon.spy(collection, 'fetch');

            var view = new MasterView({
                collection:collection,
            }).render();

            expect(spy.calledOnce).toBeTruthy();
        });
    });
});