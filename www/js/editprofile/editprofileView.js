define(['hbs!js/editprofile/profile'], function (profileTemplate) {
    var $$ = Dom7;
    var $ = jQuery;

    function render(params) {
        bindEvents(params.bindings);
    }

    function fillUser(user) {
        $('*#editProfileContent').html(profileTemplate(user));
    }

    function bindEvents(bindings) {
        for (var i in bindings) {
            $$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
        }
    }

    return {
        render: render,
        fillUser: fillUser
    };
});

