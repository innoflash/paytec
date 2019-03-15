require.config({
    paths: {
        handlebars: "lib/handlebars-v4.0.11",
        config: 'js/config',
        hbshelper: "js/hbs-helper",
        text: "lib/text",
        viewmaker: "lib/view-maker",
        hbs: "lib/hbs"
    },
    shim: {
        handlebars: {
            exports: "Handlebars"
        }
    }
});
define('app', ['js/router'], function (Router) {
    Router.init();
    Router.onOut();
    Router.reinit();

    Framework7.use(Framework73dPanels);
    var $ = Dom7;


    // Theme
    var theme = 'auto';
    if (document.location.search.indexOf('theme=') >= 0) {
        theme = document.location.search.split('theme=')[1].split('&')[0];
    }

    // Init App
    var app = new Framework7({
        id: 'net.demo.repo',
        root: '#app',
        theme: 'ios',
        panels3d: {
            enabled: true,
        },
        routes: routes,
        dialog: {
            title: 'PayTec'
        }
    });
    var mainView = app.views.create('.view-main', {
        dynamicNavbar: true
    });
    return {
        f7: app,
        mainView: mainView,
        router: Router
    };
})
