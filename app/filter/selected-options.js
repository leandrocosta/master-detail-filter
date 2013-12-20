define(['items/filterCollection'], function(Collection) {
    var collection = new Collection();
    collection.fetch();
    return collection.first() || collection.create();
});