(function (global) {
  var runtime = global.HandoffRuntime = global.HandoffRuntime || {};

  function pickHeroVariant(config) {
    var variants = config && config.heroVariants;
    if (!variants || typeof variants !== "object") {
      return null;
    }

    var variantKeys = Object.keys(variants).filter(function (key) {
      return variants[key] && typeof variants[key] === "object";
    });

    if (!variantKeys.length) {
      return null;
    }

    var defaultKey = config.heroVariantDefault && variants[config.heroVariantDefault]
      ? config.heroVariantDefault
      : variantKeys[0];

    var pageUrl = null;
    var urlKey = null;
    try {
      pageUrl = new URL(window.location.href);
      urlKey = pageUrl.searchParams.get("v");
    } catch (error) {
      pageUrl = null;
      urlKey = null;
    }

    var storedKey = null;
    try {
      storedKey = window.localStorage.getItem("heroVariant");
    } catch (error) {
      storedKey = null;
    }

    var selectedKey = defaultKey;
    var clearStoredVariant = urlKey === "reset";
    if (clearStoredVariant) {
      selectedKey = defaultKey;
    } else if (urlKey && variants[urlKey]) {
      selectedKey = urlKey;
    } else if (storedKey && variants[storedKey]) {
      selectedKey = storedKey;
    }

    try {
      if (clearStoredVariant) {
        window.localStorage.removeItem("heroVariant");
      } else {
        window.localStorage.setItem("heroVariant", selectedKey);
      }
    } catch (error) {
      // Ignore storage errors.
    }

    if (pageUrl && pageUrl.searchParams.has("v")) {
      pageUrl.searchParams.delete("v");
      var cleanUrl = pageUrl.pathname + (pageUrl.search ? pageUrl.search : "") + pageUrl.hash;
      try {
        window.history.replaceState(null, "", cleanUrl);
      } catch (error) {
        // Ignore history API restrictions.
      }
    }

    return {
      key: selectedKey,
      value: variants[selectedKey] || variants[defaultKey]
    };
  }

  function applyHeroVariant(selection) {
    if (!selection || typeof selection !== "object") {
      return;
    }

    var variant = selection.value;
    if (!variant || typeof variant !== "object") {
      return;
    }

    var domApi = runtime.dom || {};
    if (variant.headline && domApi.setText) {
      domApi.setText("[data-hero-headline]", variant.headline);
    }
    if (variant.subhead && domApi.setText) {
      domApi.setText("[data-hero-subhead]", variant.subhead);
    }
    if (variant.cta && domApi.setText) {
      domApi.setText("[data-hero-cta-label]", variant.cta);
    }
    if (variant.trustLine && domApi.setText) {
      domApi.setText("[data-hero-trust]", variant.trustLine);
    }

    if (selection.key && document.body) {
      document.body.setAttribute("data-hero-variant", selection.key);
    }
  }

  function setupReveal() {
    document.body.classList.add("js-ready");
    var revealItems = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach(function (item) {
        item.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.18
    });

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  }

  function setupMobileStickyCta(options) {
    if (!options || typeof options !== "object") {
      return;
    }

    var href = typeof options.href === "string" ? options.href.trim() : "";
    var label = typeof options.label === "string" ? options.label.trim() : "";
    if (!href || !label || !document.body) {
      return;
    }

    var pageId = (document.body.getAttribute("data-page") || "").trim();
    var showOnPages = Array.isArray(options.showOnPages) ? options.showOnPages : [];
    if (showOnPages.length && showOnPages.indexOf(pageId) === -1) {
      document.body.classList.remove("has-mobile-sticky-cta");
      return;
    }

    var existingWrap = document.querySelector(".mobile-sticky-cta-wrap");
    if (existingWrap) {
      existingWrap.remove();
    }

    var wrap = document.createElement("div");
    wrap.className = "mobile-sticky-cta-wrap";

    var anchor = document.createElement("a");
    anchor.className = "button mobile-sticky-cta";
    anchor.href = href;
    anchor.textContent = label;
    anchor.setAttribute("aria-label", label + " via contact page");
    wrap.appendChild(anchor);

    document.body.appendChild(wrap);
    document.body.classList.add("has-mobile-sticky-cta");

    var activationOffset = typeof options.activationOffset === "number"
      ? options.activationOffset
      : 260;
    var footerVisible = false;
    var mediaQuery = window.matchMedia("(max-width: 840px)");

    function updateVisibility() {
      if (!mediaQuery.matches) {
        wrap.classList.remove("is-active");
        wrap.classList.add("is-hidden");
        return;
      }
      var active = window.scrollY >= activationOffset && !footerVisible;
      wrap.classList.toggle("is-active", active);
      wrap.classList.toggle("is-hidden", !active);
    }

    var footer = document.querySelector(".premium-footer");
    if (footer && "IntersectionObserver" in window) {
      var footerObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          footerVisible = entry.isIntersecting;
          updateVisibility();
        });
      }, { threshold: 0.12 });
      footerObserver.observe(footer);
    }

    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    updateVisibility();
  }

  runtime.ui = {
    pickHeroVariant: pickHeroVariant,
    applyHeroVariant: applyHeroVariant,
    setupReveal: setupReveal,
    setupMobileStickyCta: setupMobileStickyCta
  };
})(window);
