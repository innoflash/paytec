define(["app", "js/changepassword/changepasswordView"], function (app, View) {
    var $ = jQuery;
    var $$ = Dom7;
    var user = {};

    var bindings = [
        {
            element: '#changePassword',
            event: 'click',
            handler: changePassword
        }
    ];

    function preparePage() {
        user = Cookies.getJSON(cookienames.user);
    }

    function changePassword() {
        console.log('button clicked');
        if (Cookies.get(cookienames.auth_side) == auth_side.app_direct + '') {
            var VF = [
                $('#current_password'),
                $('#new_password'),
                $('#cnfm_pswd')
            ];

            if (functions.isFieldsValid(VF, app)) {
                if ($('#new_password').val() === $('#cnfm_pswd').val()) {
                    if ($('#new_password').val().length < 6) {
                        app.f7.dialog.alert('Password is too short, enter at least 6 characters for security reasons');
                    } else {
                        app.f7.dialog.preloader('Changing password');
                        $.ajax({
                            url: app_apis.shopper + 'changepassword',
                            method: 'POST',
                            timeout: 3000,
                            data: {
                                password: $('#current_password').val(),
                                new_password: $('#new_password').val(),
                                shopper_id: user.id,
                                unique_id: user.user_id,
                                phone: user.phone
                            }
                        }).success(function (data) {
                            app.f7.dialog.alert(data.message);
                        }).error(function (error) {
                            console.log(error);
                            app.f7.dialog.alert(messages.server_error);
                        }).always(function () {
                            app.f7.dialog.close();
                        });
                    }
                } else {
                    app.f7.dialog.alert('New passwords did not match !!!');
                }
            }
        } else {
            app.f7.dialog.alert('You dont have a password to change since you used social platforms login');
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
        console.log('about outting');
    }


    return {
        init: init,
        onOut: onOut,
        reinit: reinit
    };
});