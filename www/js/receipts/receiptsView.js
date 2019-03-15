define(['hbs!js/receipts/receipt'], function (receiptTemplate) {
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

    function fillSelectedReceipts(selectedReceipts) {
        $('#selectedReceipts').text(selectedReceipts + ' RECEIPTS');
    }

    function fillReceipts(data){
        console.log(data);
        $('*#myReceipts').html(receiptTemplate(data));
    }

    function appendReceipts(data){
        $('*#myReceipts').append(receiptTemplate(data));
    }

    return {
        render: render,
        fillReceipts: fillReceipts,
        fillSelectedReceipts: fillSelectedReceipts,
        appendReceipts: appendReceipts
    };
});

