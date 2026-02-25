(function (global) {
  var runtime = global.HandoffRuntime = global.HandoffRuntime || {};

  function normalizePath(path) {
    if (!path || path === "/") {
      return "/index.html";
    }
    return path.replace(/\/$/, "");
  }

  function normalizeConfiguredPath(path) {
    if (typeof path !== "string") {
      return null;
    }

    var candidate = path.trim();
    if (!candidate) {
      return null;
    }

    if (/^https?:\/\//i.test(candidate)) {
      try {
        candidate = new URL(candidate).pathname;
      } catch (error) {
        return null;
      }
    }

    candidate = candidate.split("#")[0].split("?")[0];
    if (!candidate) {
      return null;
    }

    if (!candidate.startsWith("/")) {
      candidate = "/" + candidate;
    }

    return normalizePath(candidate);
  }

  function normalizeBasePath(value) {
    if (typeof value !== "string") {
      return "/";
    }

    var candidate = value.trim();
    if (!candidate || candidate === "/") {
      return "/";
    }

    if (!candidate.startsWith("/")) {
      candidate = "/" + candidate;
    }

    candidate = candidate.replace(/\/{2,}/g, "/");
    if (!candidate.endsWith("/")) {
      candidate += "/";
    }

    return candidate;
  }

  function stripBasePath(path, basePath) {
    var normalizedPath = normalizePath(path);
    var normalizedBasePath = normalizeBasePath(basePath);

    if (normalizedBasePath === "/") {
      return normalizedPath;
    }

    var baseNoTrailingSlash = normalizedBasePath.slice(0, -1);

    if (normalizedPath === normalizedBasePath || normalizedPath === baseNoTrailingSlash) {
      return "/index.html";
    }

    if (normalizedPath.startsWith(normalizedBasePath)) {
      var stripped = normalizedPath.slice(baseNoTrailingSlash.length);
      return normalizePath(stripped || "/");
    }

    return normalizedPath;
  }

  function withBasePath(path, basePath) {
    var normalizedPath = normalizeConfiguredPath(path);
    if (!normalizedPath) {
      return null;
    }

    var normalizedBasePath = normalizeBasePath(basePath);
    if (normalizedBasePath === "/") {
      return normalizedPath;
    }

    var baseNoTrailingSlash = normalizedBasePath.slice(0, -1);
    if (normalizedPath.startsWith(normalizedBasePath)) {
      return normalizedPath;
    }

    if (normalizedPath === "/index.html") {
      return baseNoTrailingSlash + "/index.html";
    }

    return baseNoTrailingSlash + normalizedPath;
  }

  function prefixInternalUrl(value, basePath) {
    if (typeof value !== "string") {
      return value;
    }

    var candidate = value.trim();
    if (!candidate) {
      return candidate;
    }

    if (/^(https?:|mailto:|tel:|javascript:)/i.test(candidate) || candidate.startsWith("#")) {
      return candidate;
    }

    var queryOrHashIndex = candidate.search(/[?#]/);
    var suffix = "";
    if (queryOrHashIndex >= 0) {
      suffix = candidate.slice(queryOrHashIndex);
      candidate = candidate.slice(0, queryOrHashIndex);
    }

    var withBase = withBasePath(candidate, basePath);
    if (!withBase) {
      return value;
    }

    return withBase + suffix;
  }

  function normalizeBaseUrl(value) {
    if (typeof value !== "string") {
      return null;
    }

    var candidate = value.trim();
    if (!candidate || /replace-with|your-intake-link|example\.com\/replace|payment_link_/i.test(candidate)) {
      return null;
    }

    try {
      var parsed = new URL(candidate);
      if (!/^https?:$/i.test(parsed.protocol)) {
        return null;
      }
      return parsed.origin;
    } catch (error) {
      return null;
    }
  }

  function isPagesDevHost(hostname) {
    return typeof hostname === "string" && /\.pages\.dev$/i.test(hostname);
  }

  function getRuntimeCanonicalOrigin() {
    try {
      var runtimeUrl = new URL(window.location.href);
      if (!/^https?:$/i.test(runtimeUrl.protocol)) {
        return null;
      }

      var runtimeHost = runtimeUrl.hostname.toLowerCase();
      if (runtimeHost === "localhost" || runtimeHost === "127.0.0.1" || runtimeHost === "[::1]" || runtimeHost === "::1") {
        return null;
      }

      return runtimeUrl.origin;
    } catch (error) {
      return null;
    }
  }

  function resolveCanonicalOrigin(baseUrl) {
    var baseOrigin = normalizeBaseUrl(baseUrl);
    var runtimeOrigin = getRuntimeCanonicalOrigin();

    if (!baseOrigin) {
      return runtimeOrigin;
    }

    if (!runtimeOrigin) {
      return baseOrigin;
    }

    try {
      var baseHost = new URL(baseOrigin).hostname.toLowerCase();
      var runtimeHost = new URL(runtimeOrigin).hostname.toLowerCase();

      if (isPagesDevHost(baseHost) && isPagesDevHost(runtimeHost) && baseHost !== runtimeHost) {
        return runtimeOrigin;
      }
    } catch (error) {
      return baseOrigin;
    }

    return baseOrigin;
  }

  function toCanonicalPath(path, basePath) {
    var normalized = withBasePath(path, basePath);
    if (!normalized) {
      return null;
    }
    if (normalized === "/index.html") {
      return "/";
    }
    return normalized.replace(/\/index\.html$/, "/");
  }

  function buildCanonicalFromBase(baseUrl, pagePath, currentPath, basePath) {
    var origin = resolveCanonicalOrigin(baseUrl);
    if (!origin) {
      return null;
    }

    var canonicalPath = toCanonicalPath(pagePath, basePath) || toCanonicalPath(currentPath, basePath);
    if (!canonicalPath) {
      return null;
    }

    return origin + canonicalPath;
  }

  function getHostnameFromUrl(value) {
    if (typeof value !== "string" || !value.trim()) {
      return null;
    }

    try {
      var parsed = new URL(value.trim());
      return parsed.hostname.toLowerCase();
    } catch (error) {
      return null;
    }
  }

  function toAbsoluteHttpUrl(value, fallbackOrigin) {
    if (typeof value !== "string") {
      return null;
    }

    var candidate = value.trim();
    if (!candidate || /replace-with|your-intake-link|example\.com\/replace|payment_link_/i.test(candidate) || /^(mailto:|tel:|#)/i.test(candidate)) {
      return null;
    }

    try {
      if (/^https?:\/\//i.test(candidate)) {
        var direct = new URL(candidate);
        if (!/^https?:$/i.test(direct.protocol)) {
          return null;
        }
        return direct.href;
      }

      var base = fallbackOrigin || window.location.origin;
      var resolved = new URL(candidate, base);
      if (!/^https?:$/i.test(resolved.protocol)) {
        return null;
      }
      return resolved.href;
    } catch (error) {
      return null;
    }
  }

  runtime.url = {
    normalizePath: normalizePath,
    normalizeConfiguredPath: normalizeConfiguredPath,
    normalizeBasePath: normalizeBasePath,
    stripBasePath: stripBasePath,
    withBasePath: withBasePath,
    prefixInternalUrl: prefixInternalUrl,
    normalizeBaseUrl: normalizeBaseUrl,
    isPagesDevHost: isPagesDevHost,
    getRuntimeCanonicalOrigin: getRuntimeCanonicalOrigin,
    resolveCanonicalOrigin: resolveCanonicalOrigin,
    toCanonicalPath: toCanonicalPath,
    buildCanonicalFromBase: buildCanonicalFromBase,
    getHostnameFromUrl: getHostnameFromUrl,
    toAbsoluteHttpUrl: toAbsoluteHttpUrl
  };
})(window);
