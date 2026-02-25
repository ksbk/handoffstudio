(function (global) {
  var runtime = global.HandoffRuntime = global.HandoffRuntime || {};

  function hasPlaceholderToken(value) {
    return /replace-with|your-intake-link|example\.com\/replace|payment_link_/i.test(value);
  }

  function isValidEmail(value) {
    return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function buildMailtoLink(emailTo, subject, body) {
    if (!isValidEmail(emailTo)) {
      return null;
    }

    var query = [];
    if (typeof subject === "string" && subject.trim()) {
      query.push("subject=" + encodeURIComponent(subject.trim()));
    }
    if (typeof body === "string" && body.trim()) {
      query.push("body=" + encodeURIComponent(body.trim()));
    }
    return "mailto:" + emailTo.trim() + (query.length ? "?" + query.join("&") : "");
  }

  function copyTextToClipboard(text) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      return navigator.clipboard.writeText(text);
    }

    return new Promise(function (resolve, reject) {
      var textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "readonly");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        var copied = document.execCommand("copy");
        document.body.removeChild(textarea);
        if (copied) {
          resolve();
          return;
        }
      } catch (error) {
        document.body.removeChild(textarea);
        reject(error);
        return;
      }
      reject(new Error("copy failed"));
    });
  }

  function isUsableLinkUrl(value) {
    if (typeof value !== "string") {
      return false;
    }

    var candidate = value.trim();
    if (!candidate || hasPlaceholderToken(candidate)) {
      return false;
    }

    if (/^(mailto:|tel:)/i.test(candidate)) {
      return true;
    }

    if (/^https?:\/\//i.test(candidate)) {
      return true;
    }

    if (/^(\/|\.\/|\.\.\/|#)/.test(candidate)) {
      return true;
    }

    return /^[a-z0-9][a-z0-9._/-]*\.html?(#.*)?$/i.test(candidate);
  }

  runtime.utils = {
    hasPlaceholderToken: hasPlaceholderToken,
    isValidEmail: isValidEmail,
    escapeHtml: escapeHtml,
    buildMailtoLink: buildMailtoLink,
    copyTextToClipboard: copyTextToClipboard,
    isUsableLinkUrl: isUsableLinkUrl
  };
})(window);
