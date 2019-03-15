define(['viewmaker'], function (ViewMaker) {
    var $$ = Dom7;
    var $ = jQuery;

    function render(params) {
        bindEvents(params.bindings);
    }

    function fillStores(stores, callback) {
        ViewMaker.renderTemplate('/templates/stores.hbs', stores, 'storesList', stores => {
            if(typeof callback === 'function')
                callback(stores)
        });
    }

    function bindEvents(bindings) {
        for (var i in bindings) {
            $$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
        }
    }

    return {
        render: render,
        fillStores: fillStores
    };
});

