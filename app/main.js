require.config({
    paths: {
        domReady: 'vendor/require/domReady',
        text: 'vendor/require/text',
        jquery: 'vendor/jquery/jquery-2.0.3',
        waypoints: 'vendor/jquery/waypoints.min',
        underscore: 'vendor/underscore/underscore-min',
        backbone: 'vendor/backbone/backbone',
        backbone_localStorage: 'vendor/backbone/backbone.localStorage-min',
        backbone_faux_server: 'vendor/backbone/backbone-faux-server',
        bootstrap: 'vendor/bootstrap/js/bootstrap.min',
        bootstrap_multiselect: 'vendor/bootstrap-multiselect/js/bootstrap-multiselect',
    }, shim: {
        waypoints: ['jquery'],
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        backbone_localStorage: ['backbone'],
        bootstrap: ['jquery'],
        bootstrap_multiselect: ['bootstrap'],
    }
});

require(['domReady', 'jquery', 'underscore', 'home/view', 'faux-server'], function(
            domReady, $, _, HomeView) {

    domReady(function () {
        new HomeView({el: $('body')}).render();
    });
});
