define(['handlebars'], function (Handlebars) {
    Handlebars.registerHelper('isDefault', function (car_id) {
        if (functions.hasCookie(cookienames.default_car)) {
            car = Cookies.getJSON(cookienames.default_car);
            if (car.id == car_id) {
                return '<span class="badge color-blue">Default</span>';
            } else {
                return 'View';
            }
        } else {
            return 'View';
        }
    });

    Handlebars.registerHelper('compare', function (lvalue, operator, rvalue, options) {

        var operators, result;

        if (arguments.length < 3) {
            throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
        }

        if (options === undefined) {
            options = rvalue;
            rvalue = operator;
            operator = "===";
        }

        operators = {
            '==': function (l, r) {
                return l === r;
            },
            '===': function (l, r) {
                return l === r;
            },
            '!=': function (l, r) {
                return l !== r;
            },
            '!==': function (l, r) {
                return l !== r;
            },
            '<': function (l, r) {
                return l < r;
            },
            '>': function (l, r) {
                return l > r;
            },
            '<=': function (l, r) {
                return l <= r;
            },
            '>=': function (l, r) {
                return l >= r;
            },
            '%': function (l, r) {
                return (l % r) === 0;
            },
            'typeof': function (l, r) {
                return typeof l === r;
            }
        };

        if (!operators[operator]) {
            throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
        }

        result = operators[operator](lvalue, rvalue);

        if (result) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }

    });
    Handlebars.registerHelper('checkAuth', function (auth_type) {
        if (auth_type == "Shopper Direct") {
            return 'person';
        } else if (auth_type == "Facebook Auth") {
            return 'social_facebook';
        } else {
            return 'social_googleplus';
        }
    });

});