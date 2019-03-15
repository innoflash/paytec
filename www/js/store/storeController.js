define(["app", "js/store/storeView"], function (app, View) {
    var $ = jQuery;
    var $$ = Dom7;

    var bindings = [

    ];

    function preparePage() {
        coordinates = app.mainView.router.currentRoute.params.coordinates;
        console.log(makeCoordinates(coordinates))
        map = new google.maps.Map(document.getElementById('storeMap'), {
            center: makeCoordinates(coordinates),
            zoom: 18
        });

        var marker = new google.maps.Marker({
            position: makeCoordinates(coordinates),
            map: map,
            title: 'shop'
        });
    }

    function makeCoordinates(coordinates) {
        var cArray = coordinates.split(',');
        return {
            lat: + cArray[0],
            lng: + cArray[1]
        }
    }

    function init() {
        preparePage();
        View.render({
            bindings: bindings
        });
    }

    function reinit() {
        console.log('reinitialising');
    }

    function onOut() {
        console.log('store outting');
    }


    return {
        init: init,
        onOut: onOut,
        reinit: reinit
    };
});