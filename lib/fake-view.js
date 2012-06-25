/* http://github.com/luizfar/View */

FakeView = (function () {
  var self = {};

  self.input = function (inputSpec) {
    return prepare($("<input type='text'>"), inputSpec);
  }
  
  self.p = function (pSpec) {
    return prepare($("<p>"), pSpec);
  };

  self.hidden = function (hiddenSpec) {
    return prepare($("<input type='hidden'>"), hiddenSpec);
  };

  self.checkBox = function (checkBoxSpec) {
    return prepare($("<input type='checkbox'>"), checkBoxSpec);
  };

  function prepare(element, spec) {
    if (spec.classes) { for (c in spec.class) element.addClass(c); }
    if (spec.checked) { element.attr("checked", "checked") };
    if (spec.css) { for (c in spec.css) element.css(c, spec.css[c]); }
    if (spec.id) { element.attr("id", spec.id); }
    if (spec.value) { element.val(spec.value); }

    return element;
  }

  function createAccessor(result, definition, key) {
    result[key] = function () { return definition[key]; };
  }
  
  self.stub = function (definition) {
    var result = {};
    for (var key in definition) {
      createAccessor(result, definition, key);
    }
    return result;
  };

  return self;
}) ();