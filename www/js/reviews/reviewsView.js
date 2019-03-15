define([], function () {
    var $$ = Dom7;
    var $ = jQuery;

    function render(params) {
        bindEvents(params.bindings);
    }

    function bindEvents(bindings) {
        for (var i in bindings) {
            $$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
        }
    }

    function fillTitle(string) {
        $('#reportTitle').text(string);
    }


    return {
        render: render,
        fillTitle: fillTitle
    };
});

