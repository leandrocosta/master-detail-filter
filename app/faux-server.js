define(['backbone_faux_server'], function(fauxServer) {
    'use strict';

    fauxServer.addRoutes({
        readOptions1: {
            urlExp: '/api/v1/options1/?format=jsonp&callback=?&limit=20',
            httpMethod: 'GET',
            handler: function(context, jsonpCallback) {
                return {meta:{total_count:4},objects:[
                    {option1_id:1, name:'Option 1'},
                    {option1_id:2, name:'Option 2'},
                    {option1_id:3, name:'Option 3'},
                    {option1_id:4, name:'Option 4'}
                ]};
            }
        },
        readOptions2: {
            urlExp: '/api/v1/options2/?format=jsonp&callback=?&limit=20',
            httpMethod: 'GET',
            handler: function(context, jsonpCallback) {
                return {meta:{total_count:4},objects:[
                    {option2_id:1, name:'Option 1'},
                    {option2_id:2, name:'Option 2'},
                    {option2_id:3, name:'Option 3'},
                    {option2_id:4, name:'Option 4'}
                ]};
            }
        },
        readItems: {
            urlExp: '/api/v1/items/?format=jsonp&callback=?&limit=20',
            httpMethod: 'GET',
            handler: function(context, jsonpCallback) {
                var total_count = 20;
                var objects = [];
                for (var i = 1; i <= total_count; i++) {
                    objects.push({
                        item_id:i,
                        thumb_img_url:'//lorempixel.com/90/60/?'+i,
                        large_img_url:'//lorempixel.com/600/400/?'+i,
                        title:'Lorem ipsum dolor sit amet',
                        attr1:'Lorem ipsum dolor sit amet, consectetur',
                        attr2:'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                        text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque mattis mi nisl. Proin pellentesque facilisis cursus. Donec venenatis purus et enim sollicitudin bibendum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi ornare sed tortor vitae rhoncus. Donec tellus eros, euismod a nunc vel, posuere lacinia turpis. Vestibulum elementum vehicula eros vitae volutpat. Ut quis consectetur orci. Suspendisse sit amet libero eget massa commodo egestas. Vivamus nec eros velit. Suspendisse interdum erat id semper dapibus. Aliquam varius consectetur mauris, rhoncus convallis dui malesuada quis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.' +
                             '<br/><br/>Vivamus ullamcorper, lacus nec faucibus tempus, urna ipsum tincidunt lacus, eu malesuada enim ligula ut enim. Sed eu venenatis sem. Sed accumsan tortor eu ante convallis, vel imperdiet lorem fermentum. Nullam vestibulum mi sit amet commodo egestas. Vivamus semper porttitor orci, imperdiet scelerisque diam. Maecenas velit lectus, facilisis ut lacus vitae, pretium dictum nulla. Nulla quis neque pellentesque, sagittis turpis vel, porta ante. Fusce lorem dolor, adipiscing vel accumsan sit amet, tempus et dui. Cras sit amet turpis elementum, tempor velit ac, pretium nisi. Fusce scelerisque, massa in iaculis iaculis, neque ipsum lobortis sem, ut consectetur diam lectus ac massa. Nam turpis ante, ornare et pharetra a, cursus a mi. Pellentesque posuere convallis ligula, in sodales nibh adipiscing vel.' +
                             '<br/><br/>Nullam ornare elit ac mollis sagittis. Pellentesque eu tortor mollis, tincidunt leo vitae, semper justo. Suspendisse egestas interdum nunc, in sodales neque rutrum dapibus. Quisque felis tellus, convallis ac sem nec, commodo sollicitudin sapien. Praesent volutpat, leo ut accumsan sagittis, dolor turpis pharetra turpis, non volutpat ligula elit ac urna. Nullam vitae vulputate urna. Sed quis ligula sit amet leo ullamcorper laoreet. Nulla commodo justo nec massa lacinia tempus. Curabitur ac gravida elit, sit amet dictum mauris. Aenean venenatis accumsan auctor. Nunc consectetur eros eget sagittis sagittis. Ut ornare justo sit amet nisl feugiat, ac semper sem dapibus. Suspendisse vel placerat justo, sit amet mattis augue.'
                    });
                }
                return {meta:{total_count:total_count,offset:0},objects:objects};
            }
        },
    }).setLatency(0, 1000);
});