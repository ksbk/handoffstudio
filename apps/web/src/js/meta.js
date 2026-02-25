(function (global) {
  var runtime = global.HandoffRuntime = global.HandoffRuntime || {};

  function updateMetaContent(selector, value) {
    if (!value) {
      return;
    }
    var node = document.querySelector(selector);
    if (node) {
      node.setAttribute("content", value);
    }
  }

  function applyPageMeta(site, pages) {
    if (!pages || typeof pages !== "object") {
      return;
    }

    var urlApi = runtime.url || {};
    var normalizeBasePath = urlApi.normalizeBasePath;
    var stripBasePath = urlApi.stripBasePath;
    var normalizeConfiguredPath = urlApi.normalizeConfiguredPath;
    var buildCanonicalFromBase = urlApi.buildCanonicalFromBase;
    var resolveCanonicalOrigin = urlApi.resolveCanonicalOrigin;
    var toAbsoluteHttpUrl = urlApi.toAbsoluteHttpUrl;
    var getHostnameFromUrl = urlApi.getHostnameFromUrl;
    var isPagesDevHost = urlApi.isPagesDevHost;

    if (!normalizeBasePath || !stripBasePath || !normalizeConfiguredPath || !buildCanonicalFromBase || !resolveCanonicalOrigin || !toAbsoluteHttpUrl || !getHostnameFromUrl || !isPagesDevHost) {
      return;
    }

    var basePath = normalizeBasePath(site && site.basePath);
    var currentPath = stripBasePath(window.location.pathname, basePath);
    var pageConfig = null;

    Object.keys(pages).forEach(function (key) {
      if (pageConfig) {
        return;
      }
      var candidate = pages[key] || {};
      var candidatePath = normalizeConfiguredPath(candidate.path);
      if (candidatePath && candidatePath === currentPath) {
        pageConfig = candidate;
      }
    });

    if (!pageConfig && currentPath === "/index.html" && pages.home) {
      pageConfig = pages.home;
    }

    if (!pageConfig) {
      return;
    }

    if (pageConfig.title) {
      document.title = pageConfig.title;
    }

    updateMetaContent('meta[name="description"]', pageConfig.description);
    updateMetaContent('meta[property="og:title"]', pageConfig.ogTitle || pageConfig.title);
    updateMetaContent('meta[property="og:description"]', pageConfig.ogDescription || pageConfig.description);
    updateMetaContent('meta[name="twitter:title"]', pageConfig.ogTitle || pageConfig.title);
    updateMetaContent('meta[name="twitter:description"]', pageConfig.ogDescription || pageConfig.description);
    updateMetaContent('meta[name="theme-color"]', site && site.themeColor);

    var canonicalHref = buildCanonicalFromBase(site && site.baseUrl, pageConfig.path, currentPath, basePath);
    if (!canonicalHref && /^https?:\/\//i.test(pageConfig.canonical || "")) {
      canonicalHref = pageConfig.canonical.trim();
    }

    var canonical = document.querySelector('link[rel="canonical"]');
    if (canonical && canonicalHref) {
      canonical.setAttribute("href", canonicalHref);
    }
    updateMetaContent('meta[property="og:url"]', canonicalHref);

    var imageBase = canonicalHref || (resolveCanonicalOrigin(site && site.baseUrl) || window.location.origin);
    var socialImage = toAbsoluteHttpUrl(pageConfig.ogImage, imageBase)
      || toAbsoluteHttpUrl(pageConfig.twitterImage, imageBase)
      || toAbsoluteHttpUrl(site && site.socialImage, imageBase);

    updateMetaContent('meta[property="og:image"]', socialImage);
    updateMetaContent('meta[name="twitter:image"]', socialImage);

    var canonicalHost = getHostnameFromUrl(canonicalHref) || window.location.hostname.toLowerCase();
    updateMetaContent('meta[name="robots"]', isPagesDevHost(canonicalHost) ? "noindex,nofollow" : "index,follow");
  }

  runtime.meta = {
    updateMetaContent: updateMetaContent,
    applyPageMeta: applyPageMeta
  };
})(window);
