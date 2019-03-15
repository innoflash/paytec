define(['hbs!js/index/activation'], function (activationTemplate) {
    var $$ = Dom7;
    var $ = jQuery;

    function render(params) {
        bindEvents(params.bindings);
    }

    function fillImage() {
        var car_pics = [
            "img/menu/1.jpg",
            "img/menu/1.jpg",
            "img/menu/2.jpg",
            "img/menu/3.jpg",
        ];

        $('*#menu_image').attr('src', car_pics[Math.floor(Math.random() * (car_pics.length + 1))]);
    }

    function fillActivation(user) {
        $('#activationStaff').html(activationTemplate(user));
    }

    function fillUser(user) {
        console.log(user);
        $('#username').text(user.first_name + " " + user.last_name);
        $('#userid').text('USER ID: ' + user.user_id);
        $('#logo').attr('src', user.picture);
    }

    function bindEvents(bindings) {
        for (var i in bindings) {
            $$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
        }
    }

    return {
        render: render,
        fillImage: fillImage,
        fillUser: fillUser,
        fillActivation: fillActivation
    };
});