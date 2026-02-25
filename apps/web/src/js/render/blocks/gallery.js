(function (global) {
  var runtime = global.HandoffRuntime = global.HandoffRuntime || {};

  function escapeHtml(value) {
    var utils = runtime.utils || {};
    if (typeof utils.escapeHtml === "function") {
      return utils.escapeHtml(value);
    }
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderThumbGallery(container, items, options) {
    if (!container) {
      return;
    }

    var list = Array.isArray(items) ? items.filter(Boolean) : [];
    if (!list.length) {
      container.innerHTML = "";
      return;
    }

    var gridClass = options && options.gridClass
      ? String(options.gridClass)
      : "deliverables-gallery-grid";

    container.innerHTML = [
      '<div class="' + escapeHtml(gridClass) + '">',
      list.map(function (item) {
        var title = item && item.title ? String(item.title) : "";
        var image = item && item.image ? String(item.image) : "";
        var alt = item && item.alt ? String(item.alt) : "";
        var caption = item && item.caption ? String(item.caption) : "";

        if (!title || !image) {
          return "";
        }

        return [
          '<figure class="card deliverables-gallery-card">',
          '<p class="card-kicker">' + escapeHtml(title) + "</p>",
          '<img src="' + escapeHtml(image) + '" alt="' + escapeHtml(alt) + '" loading="lazy" width="320" height="208">',
          (caption ? "<figcaption>" + escapeHtml(caption) + "</figcaption>" : ""),
          "</figure>"
        ].join("");
      }).join(""),
      "</div>"
    ].join("");
  }

  runtime.renderBlocks = runtime.renderBlocks || {};
  runtime.renderBlocks.gallery = {
    renderThumbGallery: renderThumbGallery
  };
})(window);
