(function (global) {
  var runtime = global.HandoffRuntime = global.HandoffRuntime || {};

  function findPageIdByPath(pages, href) {
    var urlApi = runtime.url || {};
    var normalizeConfiguredPath = urlApi.normalizeConfiguredPath;
    if (!normalizeConfiguredPath) {
      return null;
    }

    var normalized = normalizeConfiguredPath(href);
    if (!normalized) {
      return null;
    }

    var matched = null;
    Object.keys(pages || {}).forEach(function (pageId) {
      if (matched) {
        return;
      }
      var page = pages[pageId] || {};
      var pagePath = normalizeConfiguredPath(page.path);
      if (pagePath && pagePath === normalized) {
        matched = pageId;
      }
    });
    return matched;
  }

  function normalizeNavIds(navItems, pages, fallbackNav) {
    if (!Array.isArray(navItems) || !navItems.length) {
      return fallbackNav;
    }

    var resolved = navItems.map(function (item) {
      if (typeof item === "string" && pages[item]) {
        return item;
      }
      if (item && typeof item === "object") {
        if (typeof item.pageId === "string" && pages[item.pageId]) {
          return item.pageId;
        }
        if (typeof item.href === "string") {
          return findPageIdByPath(pages, item.href);
        }
      }
      return null;
    }).filter(Boolean);

    return resolved.length ? resolved : fallbackNav;
  }

  function getNavLabel(page, pageId) {
    if (page.navLabel) {
      return page.navLabel;
    }
    if (page.label) {
      return page.label;
    }
    if (page.title) {
      return page.title.split("|")[0].trim();
    }
    return pageId;
  }

  function applyNav(navIds, pages, site) {
    if (!Array.isArray(navIds) || !pages || typeof pages !== "object") {
      return;
    }

    var links = document.querySelectorAll(".site-nav a");
    if (!links.length) {
      return;
    }

    var urlApi = runtime.url || {};
    var utils = runtime.utils || {};
    var prefixInternalUrl = urlApi.prefixInternalUrl;
    var isUsableLinkUrl = utils.isUsableLinkUrl;
    if (!prefixInternalUrl || !isUsableLinkUrl) {
      return;
    }

    links.forEach(function (link, index) {
      var pageId = navIds[index];
      var page = pageId ? pages[pageId] : null;
      if (!page) {
        link.hidden = true;
        link.setAttribute("aria-hidden", "true");
        link.setAttribute("tabindex", "-1");
        link.removeAttribute("aria-current");
        return;
      }

      link.hidden = false;
      link.removeAttribute("aria-hidden");
      link.removeAttribute("tabindex");
      link.removeAttribute("aria-current");

      link.textContent = getNavLabel(page, pageId);
      if (isUsableLinkUrl(page.path)) {
        link.setAttribute("href", prefixInternalUrl(page.path.trim(), site && site.basePath));
      }
    });
  }

  function setActiveNav() {
    var urlApi = runtime.url || {};
    var normalizePath = urlApi.normalizePath;
    if (!normalizePath) {
      return;
    }

    var currentPath = normalizePath(window.location.pathname);
    document.querySelectorAll(".site-nav a").forEach(function (link) {
      if (link.hidden) {
        return;
      }

      var rawHref = link.getAttribute("href") || "";
      if (!rawHref || /^(mailto:|tel:|#)/i.test(rawHref)) {
        return;
      }

      var parsed;
      try {
        parsed = new URL(rawHref, window.location.origin);
      } catch (error) {
        return;
      }

      if (parsed.origin !== window.location.origin) {
        return;
      }

      var linkPath = normalizePath(parsed.pathname);
      if (linkPath === currentPath) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      } else {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
      }
    });
  }

  function setupMenu() {
    var menuToggle = document.querySelector(".menu-toggle");
    var nav = document.getElementById("primary-nav");
    if (!menuToggle || !nav) {
      return;
    }

    function isMobileNav() {
      return window.matchMedia("(max-width: 840px)").matches;
    }

    function getFocusableNavLinks() {
      return Array.prototype.slice.call(nav.querySelectorAll("a:not([hidden])"));
    }

    function setMenuState(open, options) {
      var mobile = isMobileNav();
      var shouldOpen = mobile && open;
      var shouldFocus = !options || options.focus !== false;

      nav.classList.toggle("is-open", shouldOpen);
      nav.setAttribute("aria-hidden", mobile && !shouldOpen ? "true" : "false");
      menuToggle.setAttribute("aria-expanded", String(shouldOpen));
      menuToggle.setAttribute("aria-label", shouldOpen ? "Close menu" : "Open menu");
      menuToggle.textContent = shouldOpen ? "Close" : "Menu";

      if (shouldOpen && shouldFocus) {
        var links = getFocusableNavLinks();
        if (links.length) {
          links[0].focus();
        }
      }
    }

    function closeMenu(restoreFocus) {
      if (!nav.classList.contains("is-open")) {
        return;
      }
      setMenuState(false, { focus: false });
      if (restoreFocus !== false) {
        menuToggle.focus();
      }
    }

    setMenuState(nav.classList.contains("is-open"), { focus: false });

    menuToggle.addEventListener("click", function () {
      if (!isMobileNav()) {
        return;
      }
      var open = !nav.classList.contains("is-open");
      setMenuState(open);
    });

    nav.addEventListener("click", function (event) {
      var target = event.target;
      if (target && target.closest("a")) {
        closeMenu(false);
      }
    });

    document.addEventListener("click", function (event) {
      if (nav.contains(event.target) || menuToggle.contains(event.target)) {
        return;
      }
      closeMenu(false);
    });

    document.addEventListener("keydown", function (event) {
      if (!isMobileNav() || !nav.classList.contains("is-open")) {
        return;
      }

      if (event.key === "Escape") {
        closeMenu();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      var links = getFocusableNavLinks();
      if (!links.length) {
        return;
      }

      var first = links[0];
      var last = links[links.length - 1];
      var active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (!isMobileNav()) {
        closeMenu(false);
      } else {
        setMenuState(nav.classList.contains("is-open"), { focus: false });
      }
    });
  }

  runtime.nav = {
    findPageIdByPath: findPageIdByPath,
    normalizeNavIds: normalizeNavIds,
    getNavLabel: getNavLabel,
    applyNav: applyNav,
    setActiveNav: setActiveNav,
    setupMenu: setupMenu
  };
})(window);
