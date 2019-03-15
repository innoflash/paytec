define(["app", "js/editprofile/editprofileView"], function (app, View) {
    var $ = jQuery;
    var $$ = Dom7;
    var user = {};

    var bindings = [];

    function preparePage() {
        user = Cookies.getJSON(cookienames.user);
        View.fillUser(user);

        $('#updateProfile').on('click', function (e) {
            var VF = [
                $('#d_first_name'),
                $('#d_last_name'),
                $('#d_email'),
                $('#d_phone'),
                $('#d_age'),
            ];

            if (functions.isFieldsValid(VF, app)) {
                app.f7.dialog.preloader('Updating profile');
                $.ajax({
                    url: app_apis.shopper + 'editprofile',
                    method: 'POST',
                    timeout: 3000,
                    data: {
                        shopper_id: user.id,
                        first_name: $('#d_first_name').val(),
                        last_name: $('#d_last_name').val(),
                        email: $('#d_email').val(),
                        age: $('#d_age').val(),
                        newphone: $('#d_phone').val(),
                        phone: user.phone,
                        unique_id: user.user_id
                    }
                }).success(function (data) {
                    console.log(data);
                    app.f7.dialog.alert(data.message, function () {
                        if (data.success) {
                            Cookies.set(cookienames.user, data.user);
                            /*app.mainView.router.back({
                                force: true,
                                ignoreCache: true
                            });*/
                        }
                    });
                }).error(function (error) {
                    console.log(error);
                    app.f7.dialog.alert(messages.server_error);
                }).always(function () {
                    app.f7.dialog.close();
                });
            }
        });
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
        console.log('editprofile outting');
    }


    return {
        init: init,
        onOut: onOut,
        reinit: reinit
    };
});