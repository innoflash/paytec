define(["app", "js/stores/storesView"], function (app, View) {
    var $ = jQuery;
    var $$ = Dom7;

    var stores = [
        {
            name: 'Edgars',
            location: 'Balfour mall',
            email: 'edgars@balfour.mall',
            telephone: '0123456789',
            coordinates: '-26.1377117,28.0865713',
            logo: '/img/logos/edgars.png'
        },
        {
            name: 'Checkers Hyper',
            location: 'Mall of Africa',
            email: 'checkers@africa.mall',
            telephone: '0123457787',
            coordinates: '-26.016613,28.1057417',
            logo: '/img/logos/checkers.png'
        },
        {
            name: 'PEP Store',
            location: 'Mall of Africa',
            email: 'pep@burchacres.mall',
            telephone: '0112317787',
            coordinates: '-26.0375206,28.1903103',
            logo: '/img/logos/pep.png'
        },
        {
            name: 'Woolworths',
            location: 'Clearwater Mall',
            email: 'woolworths@clearwater.mall',
            telephone: '0122317787',
            coordinates: '-26.1266619,27.904478',
            logo: '/img/logos/woolworths.jpg'
        },
        {
            name: 'JET',
            location: 'Carlton Center',
            email: 'jet@carlton.center',
            telephone: '01227852787',
            coordinates: '-26.2056752,28.0446338',
            logo: '/img/logos/jet.jpg'
        },
    ]

    var bindings = [

    ];

    function preparePage() {
        View.fillStores(shuffle(stores), stores => {
            console.log(stores)
        })
    }

    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
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
        console.log('promotions outting');
    }


    return {
        init: init,
        onOut: onOut,
        reinit: reinit
    };
});