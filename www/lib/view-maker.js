define(['handlebars', 'hbshelper'], (Handlebars, hbshelper) => {
  var ViewMaker = {}

  ViewMaker.renderTemplate = function(template, jsonData, container, callBack){
    if (container == null || undefined) {
      container = $("#page-content");
    }else {
      container = $('#' + container);
    }

    $.get(template, function (source) {
      var template = Handlebars.compile(source);
      $(container).html(template(jsonData));
    }).done(function(data){
      if (typeof callBack === 'function') {
        console.log(jsonData)
        callBack(jsonData, template, container);
      }
    }).fail(function (error) {
      console.log(error);
      throw new Error('could not locate this hbs file')
    }
    , 'html');
  }

  ViewMaker.appendToTemplate  = function(template, jsonData, container, callBack){
    if (container == null || undefined) {
      container = $("#appendContent");
    }else {
      container = $('#' + container);
    }

    $.get(template, function (source) {
      var template = Handlebars.compile(source);
      $(container).append(template(jsonData));
    }).done(function(data){
      if (typeof callBack === 'function') {
        callBack(jsonData, template, container);
      }
    }).fail(function (error) {
      console.log(error);
      this.showAlert('red', 'failed to load hbs template', container);
    }
    , 'html');
  }

  return ViewMaker
})
