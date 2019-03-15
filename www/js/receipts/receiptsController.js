define(["app", "js/receipts/receiptsView"], function (app, View) {
    var $ = jQuery;
    var $$ = Dom7;
    var selectedMonth, selectedYear, user;
    var queryString = null;

    var bindings = [
        {
            element: '#receiptsOptions',
            event: 'click',
            handler: receiptsOptions
        }
    ];

    function preparePage() {
        $('#loadMore').hide();
        user = Cookies.getJSON(cookienames.user);
        selectedYear = new Date().getFullYear();
        selectedMonth = encodeMonth(new Date().getMonth() + 1);
        queryString = selectedYear + '-' + selectedMonth;
        console.log(queryString);
        loadReceipts(api.getPath('receipts'), {
            queryString: queryString,
            searchMode: 'month'
        });
        View.fillSelectedReceipts(monthNames[selectedMonth - 1] + ' ' + selectedYear);
    }

    function receiptsOptions() {
        myOptions = app.f7.actions.create({
            buttons: [
                // First group
                [
                    {
                        text: 'Receipts Options',
                        label: true
                    },
                    {
                        text: 'Search',
                        bold: true,
                        onClick: function () {
                            openSearch();
                        }
                    },
                    {
                        text: 'Pick Month',
                        bold: true,
                        onClick: function () {
                            pickMonth();
                        }
                    },
                    {
                        text: 'Pick Date',
                        bold: true,
                        onClick: function () {
                            pickDate();
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
    }

    function loadReceipts(url, data) {
        data.phone = user.phone;
        data.unique_id = user.user_id;
        data.shopper_id = user.id;

        app.f7.dialog.preloader('Loading receipts...');
        $.ajax({
            method: 'POST',
            url: url,
            data: data,
            timeout: 5000
        }).done(function (receipts) {
            console.log(receipts);
            if (receipts.meta.pagination.current_page === 1){
                View.fillReceipts(receipts);
            }else{
                View.appendReceipts(receipts);
            }

            if (receipts.meta.pagination.current_page < receipts.meta.pagination.total_pages) {
                $('#loadMore').show();
                newUrl = receipts.meta.pagination.links.next;
            }else{
                $('#loadMore').hide();
            }
            $('#loadMore').on('click', function(){
                loadReceipts(newUrl, data);
                $(this).unbind();
            });
        }).fail(function (error) {
            console.log(error);
            app.f7.dialog.alert(messages.server_error);
        }).always(function () {
            app.f7.dialog.close();
        });
    }

    function pickMonth() {

    }

    function pickDate() {

    }

    function openSearch() {

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
        console.log('receipts outting');
    }

    function encodeMonth(month) {
        if (month < 10) {
            month = '0' + month;
        }
        return month;
    }

    return {
        init: init,
        onOut: onOut,
        reinit: reinit
    };
});