"use strict";

// autocomplete
var dataform, stepActive, _wizard;

stepActive = 1;

dataform = {
  "refinance": ""
};

$.fn.autocomplete = function (action, options) {
  var element, elementItem, elementWrapper, settings;
  element = this;
  settings = $.extend({
    'wrapper': '.autocomplete--wrapper',
    'item': '.autocomplete--lists button'
  }, options);
  elementWrapper = $(this).parents(settings.wrapper);
  elementItem = $(this).parents(settings.wrapper).find(settings.item);
  this.init = function () {
    elementItem.on('click', function () {
      var itemValue;
      itemValue = $(this).val();
      element.val(itemValue);
      return elementWrapper.removeClass("open");
    });
    return element.on('keyup', function () {
      elementWrapper.addClass('open');
      return $(this).tooltip('dispose');
    });
  };
  return this.init();
};

$(".autocomplete--input").autocomplete();

// end of autocomplete

// form validation
$.fn.validate = function (type, options) {
  var field, form, settings, validate;
  form = this;
  field = form.find("input");
  settings = $.extend({}, options);
  validate = function validate(el, settings) {
    var elValue;
    settings = $.extend({
      placement: 'top',
      toggle: 'tooltip',
      title: "This field is required"
    }, settings);
    el = $("input[name=" + settings.name + "]");
    if (settings.type === "radio") {
      if (el.is(":checked")) {
        elValue = el.val();
      } else {
        elValue = "";
      }
      el = el.parents(".form-checkbox-button").parent();
    } else {
      elValue = el.val();
    }
    // if type == "required"
    el.tooltip(settings);
    if (elValue.length < 1) {
      el.tooltip("show");
      return false;
    } else {
      el.tooltip("dispose");
      return true;
    }
  };
  this.init = function () {
    return form.on('submit', function (ev) {
      var goSubmit;
      ev.preventDefault();
      goSubmit = '';
      field.each(function () {
        var fieldValue, validateTitle, validateType;
        if ($(this).parents(".step-item").hasClass("active")) {
          validateType = $(this).data('validate');
          validateTitle = $(this).data('title');
          fieldValue = $(this).val();
          settings = {
            validate: validateType,
            title: validateTitle,
            type: $(this).attr("type"),
            name: $(this).attr("name")
          };
        }
        return goSubmit = validate($(this), settings);
      });
      if (goSubmit) {
        stepActive = stepActive + 1;
        return _wizard();
      }
    });
  };
  return this.init();
};

$("form").validate();

_wizard = function wizard() {
  var progress;
  $(".step-item").removeClass("active");
  // if stepActive == 2
  $("body").attr("class", "step-active-" + stepActive);
  $("#step-" + stepActive).addClass("active");
  $("input,div").tooltip("dispose");
  window.location.hash = "#step-" + stepActive;
  if (stepActive === 2) {
    setTimeout(function () {
      stepActive = 3;
      return _wizard();
    }, 3000);
  }
  if (stepActive > 2) {
    progress = 100 / 19;
    $(".section-hero--step").addClass("active");
    $(".section-hero--step .progress-bar").css("width", progress * (stepActive - 2) + "%");
  }
  return $('html,body').scrollTop(0);
};

$('input[name="refinance"]').on('change', function () {
  $(this).parents("form").submit();
  stepActive = 2;
  return _wizard();
});

$("input[name='purchase_properties_financing_purpose']").on('change', function () {
  stepActive = 4;
  return _wizard();
});

// document.location.hash = ""
window.history.replaceState({}, document.title, "/" + "");
//# sourceMappingURL=main.js.map
