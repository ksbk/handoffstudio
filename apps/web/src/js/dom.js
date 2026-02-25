(function (global) {
  var runtime = global.HandoffRuntime = global.HandoffRuntime || {};

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach(function (el) {
      el.textContent = value;
    });
  }

  function setHref(selector, value) {
    document.querySelectorAll(selector).forEach(function (el) {
      el.setAttribute("href", value);
    });
  }

  runtime.dom = {
    setText: setText,
    setHref: setHref
  };
})(window);
