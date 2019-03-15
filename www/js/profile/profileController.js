define(["app", "js/profile/profileView"], function (app, View) {
    var $ = jQuery;
    var $$ = Dom7;
    var user = {};

    var bindings = [
        {
            element: '#profileOptions',
            event: 'click',
            handler: profileOptions
        }
    ];

    function profileOptions() {
        pOptions.open();
    }

    function preparePage() {
        user = Cookies.getJSON(cookienames.user);
        View.fillUser(user);
        $('#profPic').hide();

        var cameraOptions = {
            destinationType: Camera.DestinationType.FILE_URI,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        };

        pOptions = app.f7.actions.create({
            buttons: [
                // First group
                [
                    {
                        text: 'Profile Options',
                        label: true
                    },
                    {
                        text: 'Edit',
                        bold: true,
                        onClick: function () {
                            editProfile();
                        }
                    },
                    {
                        text: 'Change Picture',
                        bold: true,
                        onClick: function () {
                            if (user.auth_side == auth_side.app_direct) {
                                navigator.camera.getPicture(pictureSuccess, pictureError, cameraOptions);
                            } else {
                                app.f7.dialog.alert('You have signed in using Social Platforms so you cannot change your picture here!');
                            }
                        }
                    },
                    {
                        text: 'Change Password',
                        bold: true,
                        onClick: function () {
                            changePassword();
                        }
                    },
                    {
                        text: 'Delete',
                        bold: true,
                        onClick: function () {
                            deleteProfile();
                        }
                    }
                ],
                // Second group
                [
                    {
                        text: 'Cancel',
                        color: 'red'
                    }
                ]
            ]
        });

        profilePhotoPopover = app.f7.popover.create({
            el: '.popover-links',
            targetEl: '.profile-pic'
        });
        if (user.auth_side == auth_side.app_direct) {
            $('.profile-pic').on('click', function () {
                profilePhotoPopover.open();
                $('#openFileChooser').on('click', function () {
                    navigator.camera.getPicture(pictureSuccess, pictureError, cameraOptions);
                });
                $('#profPic').on('change', function () {
                    profilePhotoPopover.close();
                });
            });
        } else {
            console.log(Cookies.get(cookienames.auth_side));
        }
    }

    function pictureSuccess(imageURI) {
        profilePhotoPopover.close();
        $('.profile-pic').attr('src', imageURI);
        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        options.chunkedMode = false;
        options.httpMethod = 'POST';

        options.params = {
            shopper_id: user.id,
            phone: user.phone,
            unique_id: user.user_id
        };
        console.log(options);

        var ft = new FileTransfer();
        var progress = 0;
        uploadDialog = app.f7.dialog.progress('Uploading image', progress);
        uploadDialog.setText('Please wait...');
        ft.onprogress = function (progressEvent) {
            if (progressEvent.lengthComputable) {
                // loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
                uploadDialog.setProgress(progressEvent.loaded);
                uploadDialog.setText(((progressEvent.loaded / progressEvent.total) * 100) + "% done");
                if (progressEvent.loaded == progressEvent.total) {
                    uploadDialog.close();
                }
            } else {
                //loadingStatus.increment();
            }
        };
        ft.upload(imageURI, app_apis.shopper + "uploadpic", uploadSuccess.bind(this), uploadFail.bind(this), options);
    }

    function uploadFail(error) {
        try {
            uploadDialog.close();
        } catch (e) {
        }
        app.f7.dialog.alert(JSON.stringify(error, null));
    }

    function uploadSuccess(response) {
        try {
            uploadDialog.close();
        } catch (e) {
        }
        console.log(response);
        Cookies.set(cookienames.user, JSON.parse(response.response).user);
        app.f7.dialog.alert(JSON.parse(response.response).message);
    }

    function pictureError() {
        app.f7.dialog.alert('Cant picture from your gallery');
    }

    function changePassword() {
        if (user.auth_side == auth_side.app_direct) {
            app.mainView.router.navigate('/changepassword');
        } else {
            app.f7.dialog.alert(messages.social_blockade);
        }
    }

    function deleteProfile() {
        app.f7.dialog.prompt('Are you sure you are done with us and you want to remove your profile? If yes please enter your password', function (value) {
            console.log('delete profile in progress');
            app.f7.dialog.preloader('Deleting profile');
            $.ajax({
                url: app_apis.shopper + 'removeprofile',
                method: 'POST',
                timeout: 3000,
                data: {
                    id: user.id,
                    phone: user.phone,
                    unique_id: user.user_id,
                    password: value
                }
            }).success(function (data) {
                console.log(data);
                app.f7.dialog.alert(data.message, function () {
                    if (data.success) {
                        Cookies.remove(cookienames.user);
                        Cookies.remove(cookienames.authenticated);
                        Cookies.remove(cookienames.auth_side);
                        Cookies.remove(cookienames.routes);
                        app.mainView.router.navigate({
                            url: '/index',
                            force: true,
                            ignoreCache: true
                        });
                    }
                });
            }).error(function (error) {
                console.log(error);
                app.f7.dialog.alert(messages.server_error);
            }).always(function () {
                app.f7.dialog.close();
            });
        });
    }

    function editProfile() {
        if (user.auth_side == auth_side.app_direct) {
            app.mainView.router.navigate('/editprofile');
        } else {
            app.f7.dialog.alert(messages.social_blockade);
        }
    }


    function init() {
        preparePage();
        View.render({
            bindings: bindings
        });
    }


    function onOut() {
        console.log('profile outting');
    }


    return {
        init: init,
        onOut: onOut,
        reinit: init
    };
});