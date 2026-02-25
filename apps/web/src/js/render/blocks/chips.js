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

  function renderChipStrip(container, items, options) {
    if (!container) {
      return;
    }

    var list = Array.isArray(items) ? items.filter(Boolean) : [];
    if (!list.length) {
      container.innerHTML = "";
      return;
    }

    var ariaLabel = options && options.ariaLabel
      ? String(options.ariaLabel)
      : "Trust signals";

    container.innerHTML = [
      '<ul class="icon-chip-strip" aria-label="' + escapeHtml(ariaLabel) + '">',
      list.map(function (item) {
        var label = item && item.label ? String(item.label) : "";
        var icon = item && item.icon ? String(item.icon) : "";
        if (!label) {
          return "";
        }
        return [
          '<li class="icon-chip">',
          icon
            ? '<img class="icon-chip-icon" src="' + escapeHtml(icon) + '" alt="" loading="lazy" width="16" height="16">'
            : '<span class="icon-chip-dot" aria-hidden="true"></span>',
          '<span class="icon-chip-label">' + escapeHtml(label) + "</span>",
          "</li>"
        ].join("");
      }).join(""),
      "</ul>"
    ].join("");
  }

  function renderIconGrid(container, items, options) {
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
      : "icon-grid";

    container.innerHTML = [
      '<div class="' + escapeHtml(gridClass) + '">',
      list.map(function (item) {
        var title = item && item.title ? String(item.title) : "";
        var description = item && item.description ? String(item.description) : "";
        var icon = item && item.icon ? String(item.icon) : "";
        if (!title) {
          return "";
        }
        return [
          '<article class="card icon-grid-card">',
          '<div class="icon-grid-head">',
          icon
            ? '<img class="icon-grid-icon" src="' + escapeHtml(icon) + '" alt="" loading="lazy" width="24" height="24">'
            : '<span class="icon-grid-dot" aria-hidden="true"></span>',
          '<h3 class="card-title">' + escapeHtml(title) + "</h3>",
          "</div>",
          (description ? "<p>" + escapeHtml(description) + "</p>" : ""),
          "</article>"
        ].join("");
      }).join(""),
      "</div>"
    ].join("");
  }

  runtime.renderBlocks = runtime.renderBlocks || {};
  runtime.renderBlocks.chips = {
    renderChipStrip: renderChipStrip,
    renderIconGrid: renderIconGrid
  };
})(window);
