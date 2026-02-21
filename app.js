(function () {
  var fallbackConfig = {
    config: {
      schemaVersion: "1.0",
      updatedAt: "2026-02-18",
      source: "single-file"
    },
    site: {
      baseUrl: "https://handoffstudio.com",
      basePath: "/",
      socialImage: "/social-preview.png",
      themeColor: "#0f1217"
    },
    brand: {
      id: "handoff-studio",
      name: "Handoff Studio",
      brandShort: "Handoff",
      tagline: "Reliable fixes for data, automation, and web/app issues.",
      email: "hello@handoffstudio.com"
    },
    nav: ["home", "services", "process", "contact"],
    pages: {
      home: {
        path: "index.html",
        navLabel: "Home",
        title: "Handoff Studio | Fast Technical Delivery",
        description: "Premium service studio for data rescue, automation, and fast web/app repairs.",
        canonical: "https://handoffstudio.com/",
        ogTitle: "Handoff Studio | Fast Technical Delivery",
        ogDescription: "Clean, reliable fixes delivered fast for data, automation, and web/app repairs."
      },
      services: {
        path: "services.html",
        navLabel: "Services",
        title: "Services | Handoff Studio",
        description: "Productized service packages with clear scope boundaries and turnaround.",
        canonical: "https://handoffstudio.com/services.html",
        ogTitle: "Services | Handoff Studio",
        ogDescription: "Short offers with clear scope boundaries and predictable turnaround."
      },
      process: {
        path: "process.html",
        navLabel: "Process",
        title: "Process | Handoff Studio",
        description: "3-step workflow: Send, Plan, Deliver.",
        canonical: "https://handoffstudio.com/process.html",
        ogTitle: "Process | Handoff Studio",
        ogDescription: "Simple 3-step process with clear scope and handoff."
      },
      contact: {
        path: "contact.html",
        navLabel: "Contact",
        title: "Contact | Handoff Studio",
        description: "Send your request through intake or email. Privacy-first service workflow.",
        canonical: "https://handoffstudio.com/contact.html",
        ogTitle: "Contact | Handoff Studio",
        ogDescription: "Send your request through intake. Email fallback and privacy-by-design notes included."
      },
      sampleDelivery: {
        path: "sample-delivery.html",
        navLabel: "Sample Delivery",
        title: "Sample Delivery | Handoff Studio",
        description: "Synthetic sample delivery showing before/after changes, change log, and final handoff package.",
        canonical: "https://handoffstudio.com/sample-delivery.html",
        ogTitle: "Sample Delivery | Handoff Studio",
        ogDescription: "See a synthetic sample of what gets delivered: fixes, change log, and handoff notes."
      },
      notFound: {
        path: "404.html",
        title: "Page Not Found | Handoff Studio",
        description: "The page could not be found. Return to services or contact to submit a request.",
        canonical: "https://handoffstudio.com/404.html",
        ogTitle: "Page Not Found | Handoff Studio",
        ogDescription: "Return to services or contact to continue."
      },
      fileSharing: {
        path: "file-sharing.html",
        title: "File Sharing Guide | Handoff Studio",
        description: "How to send files safely with share links, permissions, and privacy checks.",
        canonical: "https://handoffstudio.com/file-sharing.html",
        ogTitle: "File Sharing Guide | Handoff Studio",
        ogDescription: "Quick instructions for safe, reliable file sharing before project intake."
      },
      terms: {
        path: "terms.html",
        title: "Terms | Handoff Studio",
        description: "Basic service terms for scope boundaries, delivery expectations, and client responsibilities.",
        canonical: "https://handoffstudio.com/terms.html",
        ogTitle: "Terms | Handoff Studio",
        ogDescription: "Review baseline service terms for requests, delivery, and accepted usage."
      }
    },
    intake: {
      emailTo: "hello@handoffstudio.com",
      emailSubject: "Handoff request — Spreadsheet rescue",
      emailBodyTemplate: "File link:\nTool (Excel/Google Sheets):\nWhat is broken:\nDesired output:\nDeadline + timezone:\nConstraints:"
    },
    payments: {
      enabled: true,
      heading: "Pay to start",
      note: "If I can't fix it, you don't pay.",
      methods: []
    },
    sla: {
      enabled: true,
      title: "Fast response",
      items: [
        "Reply within 15 minutes (09:00–21:00 GMT)",
        "Same-day delivery for most spreadsheet rescues",
        "Clear scope + fixed price before I start",
        "If unsolvable, you pay $0"
      ]
    },
    conversion: {
      ctaLabel: "Send your request",
      intake: {
        primaryUrl: "mailto:hello@handoffstudio.com",
        fallbackEmail: "hello@handoffstudio.com"
      },
      intakeHelper: "No sales call required. Send scope + deadline and get a confirmed scope boundary before work starts.",
      credibilityAnchor: "Triage reply within 1 business day · Fixed quote after triage · Written scope boundary · Secure file workflow · NDA available",
      riskReversal: [
        "Clear scope before work starts",
        "Clear turnaround window and handoff format",
        "No hidden add-ons or vague deliverables"
      ]
    },
    heroVariantDefault: "a",
    heroVariants: {
      a: {
        headline: "Fast fixes for spreadsheets, automation, and web apps.",
        subhead: "Reliable fixes for data, automation, and web/app issues.",
        cta: "Send your request",
        trustLine: "Triage reply within 1 business day · Fixed quote after triage · Written scope boundary · Secure file workflow · NDA available"
      },
      b: {
        headline: "Urgent technical work, delivered with clear scope and handoff.",
        subhead: "No sales call required. Send scope + deadline and receive a written scope boundary before execution.",
        cta: "Start your request",
        trustLine: "Response within 1 business day · Fixed quote after triage · Scope locked before work · Secure file workflow · NDA available"
      }
    },
    offers: [
      {
        name: "Spreadsheet/Data Rescue",
        summary: "Fix formulas, normalize exports, and return analysis-ready files fast.",
        turnaround: "24-48h",
        typicalOutput: "Clean workbook + validation notes",
        includes: [
          "Formula repair and validation",
          "Data cleanup and normalization",
          "Before/after change notes"
        ],
        scopeBoundary: "Best for targeted rescue tasks, not full BI platform migrations."
      },
      {
        name: "Automation",
        summary: "Replace recurring manual work with repeatable scripts, checks, and run notes.",
        turnaround: "2-5 days",
        typicalOutput: "Script bundle + runbook",
        includes: [
          "Scripted workflow setup",
          "Failure-safe checks",
          "Runbook for future use"
        ],
        scopeBoundary: "Best for repeatable workflows, not enterprise orchestration redesigns."
      },
      {
        name: "Web/App Fast Lane",
        summary: "Stabilize urgent Django/FastAPI bugs and deploy paths when deadlines are tight.",
        turnaround: "Same-day triage",
        typicalOutput: "Patch + deploy checklist",
        includes: [
          "Issue isolation and fix plan",
          "Patch + verification steps",
          "Deployment and rollback notes"
        ],
        scopeBoundary: "Best for urgent fixes, not full product rewrites."
      }
    ],
    packages: [
      {
        name: "Rescue Sprint",
        priceRange: "$300-$900",
        turnaround: "24-48h",
        bestFor: "Spreadsheet cleanup, formula fixes, and urgent report recovery.",
        includes: [
          "Fixed file",
          "Validation checklist",
          "Short handoff notes"
        ]
      },
      {
        name: "Automation Build",
        priceRange: "$800-$2,500",
        turnaround: "2-5 days",
        bestFor: "Replacing repetitive ops with scripts and clear runbooks.",
        includes: [
          "Automation scripts",
          "Failure-safe checks",
          "Runbook and revision window"
        ]
      },
      {
        name: "Fast Lane Incident",
        priceRange: "$500-$1,800",
        turnaround: "Same day triage",
        bestFor: "Django/FastAPI production issue stabilization.",
        includes: [
          "Issue isolation",
          "Patch and verification",
          "Rollback-safe notes"
        ]
      }
    ],
    process: [
      {
        title: "Send",
        description: "You submit scope, context files, and exact deadline."
      },
      {
        title: "Plan",
        description: "You receive written scope boundary, deliverables list, and delivery window."
      },
      {
        title: "Deliver",
        description: "You receive the fix bundle, QC summary, and handoff run notes."
      }
    ],
    proof: [
      {
        title: "Spreadsheet recovery",
        before: "Inconsistent formats, broken formulas, and manual monthly totals.",
        after: "Normalized structure, validated formulas, and a clean reporting tab.",
        deliveryNote: "Validation checks, assumptions, and next-run instructions.",
        impact: "Manual steps: 12 -> 1"
      },
      {
        title: "Deploy incident fix",
        before: "Django app failing after dependency drift and env mismatch.",
        after: "Pinned dependencies, corrected config, and green health checks.",
        deliveryNote: "Patch summary, rollback path, and post-deploy checklist.",
        impact: "Recovery time: 3h/week -> 15m/week"
      }
    ],
    deliveryBundle: {
      kicker: "Example delivery bundle",
      title: "Delivery bundle preview",
      items: [
        { name: "Final_Report.xlsx", status: "READY" },
        { name: "qc.json", status: "PASSED" },
        { name: "manifest.json", status: "QC OK" },
        { name: "handoff_notes.md", status: "INCLUDED" }
      ],
      metrics: {
        turnaround: "24–48h",
        qcChecks: 24,
        handoff: "included",
        note: "Status tags reflect QC review checks."
      },
      qcChecklist: [
        "Input schema and file-integrity checks",
        "Formula dependency audit and reference stability",
        "Duplicate and null-value detection",
        "Date/time normalization and timezone sanity checks",
        "Data type consistency checks",
        "Output shape validation against requested format",
        "Regression check against pre-fix baseline",
        "Edge-case sampling on critical rows",
        "Runbook steps validated end-to-end",
        "Handoff notes completeness check"
      ]
    },
    sampleDelivery: {
      title: "Sample delivery package (synthetic)",
      scenario: "Client had a broken monthly operations workbook and needed a reliable report before Monday 9:00 AM ET.",
      before: [
        "Mixed date formats and duplicate rows across exports",
        "Broken nested formulas in KPI tabs",
        "Manual copy/paste steps every week"
      ],
      after: [
        "Normalized import sheet with validation checks",
        "Rebuilt formulas with clear named ranges",
        "One-click script for recurring weekly updates"
      ],
      changeLog: [
        "Replaced volatile formulas with stable references",
        "Added duplicate detection and date normalization",
        "Documented assumptions and edge cases"
      ],
      clientReceives: [
        "Fixed deliverable files",
        "Change log and validation notes",
        "Runbook for repeat execution"
      ]
    },
    privacy: {
      note: "Public website uses brand identity only. Personal identity is kept off-site except where legally required.",
      metadataHygiene: "Deliverables follow metadata hygiene to reduce accidental author-information leaks."
    }
  };

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

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

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

  function hasPlaceholderToken(value) {
    return /replace-with|your-intake-link|example\.com\/replace|payment_link_/i.test(value);
  }

  function isValidEmail(value) {
    return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
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

  function normalizeBaseUrl(value) {
    if (typeof value !== "string") {
      return null;
    }

    var candidate = value.trim();
    if (!candidate || hasPlaceholderToken(candidate)) {
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
    if (!candidate || hasPlaceholderToken(candidate) || /^(mailto:|tel:|#)/i.test(candidate)) {
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

  function mergePageConfig(basePages, remotePages) {
    var merged = Object.assign({}, basePages || {}, remotePages || {});

    Object.keys(merged).forEach(function (key) {
      merged[key] = Object.assign({}, (basePages || {})[key] || {}, (remotePages || {})[key] || {});
    });

    return merged;
  }

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

  function findPageIdByPath(pages, href) {
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

  function renderServiceCards(offers) {
    function getServiceIconAsset(name) {
      var normalized = String(name || "").toLowerCase();
      if (normalized.indexOf("spreadsheet") !== -1 || normalized.indexOf("data") !== -1) {
        return "/assets/icons/service-data.svg";
      }
      if (normalized.indexOf("automation") !== -1) {
        return "/assets/icons/service-automation.svg";
      }
      return "/assets/icons/service-web.svg";
    }

    function getServiceOutputHint(name) {
      var normalized = String(name || "").toLowerCase();
      if (normalized.indexOf("spreadsheet") !== -1 || normalized.indexOf("data") !== -1) {
        return "Clean workbook";
      }
      if (normalized.indexOf("automation") !== -1) {
        return "Script + runbook";
      }
      return "Patch + checklist";
    }

    document.querySelectorAll("[data-services]").forEach(function (container) {
      var mode = container.getAttribute("data-services");
      if (!offers || !offers.length) {
        container.innerHTML = "";
        return;
      }

      var html = offers.map(function (offer) {
        var includes = (offer.includes || []).map(function (item) {
          return "<li>" + escapeHtml(item) + "</li>";
        }).join("");
        var serviceIcon = getServiceIconAsset(offer.name);

        if (mode === "summary") {
          var summaryIncludes = (offer.includes || []).slice(0, 2).map(function (item) {
            return "<li>" + escapeHtml(item) + "</li>";
          }).join("");
          var outputHint = offer.typicalOutput || getServiceOutputHint(offer.name);

          return [
            '<article class="card service-card summary">',
            '<div class="service-head">',
            '<span class="service-icon" aria-hidden="true"><img class="service-icon-image" src="' + escapeHtml(serviceIcon) + '" alt="" loading="lazy" width="96" height="96"></span>',
            '<h3 class="card-title">' + escapeHtml(offer.name) + "</h3>",
            "</div>",
            '<p class="service-badge">Turnaround ' + escapeHtml(offer.turnaround || "Fast lane") + "</p>",
            "<p>" + escapeHtml(offer.summary) + "</p>",
            '<ul class="clean-list">' + summaryIncludes + "</ul>",
            '<p class="meta"><span>Typical output: ' + escapeHtml(outputHint) + "</span></p>",
            "</article>"
          ].join("");
        }

        return [
          '<article class="card service-card detailed">',
          '<div class="service-head">',
          '<span class="service-icon" aria-hidden="true"><img class="service-icon-image" src="' + escapeHtml(serviceIcon) + '" alt="" loading="lazy" width="96" height="96"></span>',
          '<h3 class="card-title">' + escapeHtml(offer.name) + "</h3>",
          "</div>",
          '<p class="meta"><span>Turnaround: ' + escapeHtml(offer.turnaround || "Fast lane") + "</span></p>",
          "<p>" + escapeHtml(offer.summary) + "</p>",
          '<ul class="clean-list">' + includes + "</ul>",
          '<p class="boundary"><strong>Scope boundary:</strong> ' + escapeHtml(offer.scopeBoundary || "") + "</p>",
          "</article>"
        ].join("");
      }).join("");

      container.innerHTML = html;
    });
  }

  function renderPackages(packages) {
    document.querySelectorAll("[data-packages]").forEach(function (container) {
      if (!packages || !packages.length) {
        container.innerHTML = "";
        return;
      }

      var html = packages.map(function (pkg) {
        var includes = (pkg.includes || []).map(function (item) {
          return "<li>" + escapeHtml(item) + "</li>";
        }).join("");

        return [
          '<article class="card package-card">',
          '<h3 class="card-title">' + escapeHtml(pkg.name) + "</h3>",
          '<p class="package-range">' + escapeHtml(pkg.priceRange || "") + "</p>",
          '<p class="package-meta"><strong>Turnaround:</strong> ' + escapeHtml(pkg.turnaround || "") + "</p>",
          '<p class="package-meta"><strong>Best for:</strong> ' + escapeHtml(pkg.bestFor || "") + "</p>",
          '<ul class="clean-list">' + includes + "</ul>",
          "</article>"
        ].join("");
      }).join("");

      container.innerHTML = html;
    });
  }

  function renderStepTimeline(steps) {
    function getStepIconAsset(step, index) {
      var normalized = String((step && step.title) || "").toLowerCase();
      if (normalized.indexOf("send") !== -1 || index === 0) {
        return "/assets/icons/step-send.svg";
      }
      if (normalized.indexOf("plan") !== -1 || index === 1) {
        return "/assets/icons/step-plan.svg";
      }
      return "/assets/icons/step-deliver.svg";
    }

    document.querySelectorAll("[data-process-grid]").forEach(function (container) {
      if (!steps || !steps.length) {
        container.innerHTML = "";
        return;
      }

      container.innerHTML = steps.map(function (step, index) {
        var stepIcon = getStepIconAsset(step, index);
        return [
          '<article class="card process-step">',
          '<p class="step-label">Step ' + (index + 1) + "</p>",
          '<img class="step-icon" src="' + escapeHtml(stepIcon) + '" alt="" loading="lazy" width="96" height="96">',
          '<h3 class="card-title">' + escapeHtml(step.title) + "</h3>",
          "<p>" + escapeHtml(step.description) + "</p>",
          "</article>"
        ].join("");
      }).join("");
    });
  }

  function renderProofTiles(proofItems) {
    document.querySelectorAll("[data-proof-grid]").forEach(function (container) {
      if (!proofItems || !proofItems.length) {
        container.innerHTML = "";
        return;
      }

      container.innerHTML = proofItems.map(function (item) {
        return [
          '<article class="card proof-tile">',
          '<h3 class="card-title">' + escapeHtml(item.title) + "</h3>",
          '<ul class="clean-list proof-list">',
          '<li><strong>Before:</strong> ' + escapeHtml(item.before || "") + "</li>",
          '<li><strong>After:</strong> ' + escapeHtml(item.after || "") + "</li>",
          (item.impact ? '<li class="proof-impact"><strong>Impact:</strong> ' + escapeHtml(item.impact) + "</li>" : ""),
          '<li class="delivery-note"><strong>Delivery note:</strong> ' + escapeHtml(item.deliveryNote || "") + "</li>",
          "</ul>",
          "</article>"
        ].join("");
      }).join("");
    });
  }

  function renderDeliveryBundlePreview(bundleConfig) {
    document.querySelectorAll("[data-delivery-bundle]").forEach(function (container) {
      var items = bundleConfig && Array.isArray(bundleConfig.items) ? bundleConfig.items : [];
      if (!items.length) {
        return;
      }

      var metrics = bundleConfig.metrics || {};
      var qcChecklist = bundleConfig && Array.isArray(bundleConfig.qcChecklist) ? bundleConfig.qcChecklist : [];
      var kicker = bundleConfig.kicker || "Preview";
      var title = bundleConfig.title || "Delivery bundle";

      container.innerHTML = [
        '<p class="card-kicker">' + escapeHtml(kicker) + "</p>",
        '<div class="bundle-window">',
        '<div class="bundle-window-head">',
        '<span class="bundle-dots" aria-hidden="true"><span></span><span></span><span></span></span>',
        '<span class="bundle-window-title">' + escapeHtml(title) + "</span>",
        "</div>",
        '<ul class="bundle-list">',
        items.map(function (item) {
          return [
            "<li>",
            '<span class="bundle-file-wrap"><span class="bundle-file-icon" aria-hidden="true"></span><span class="bundle-file">' + escapeHtml(item.name || "") + "</span></span>",
            '<span class="bundle-separator"> — </span>',
            '<span class="bundle-status">' + escapeHtml(item.status || "READY") + "</span>",
            "</li>"
          ].join("");
        }).join(""),
        "</ul>",
        "</div>",
        '<p class="bundle-metrics">Turnaround ' + escapeHtml(metrics.turnaround || "24–48h") + ' <span aria-hidden="true">•</span> Typical QC checks ' + escapeHtml(String(metrics.qcChecks || 24)) + ' <span aria-hidden="true">•</span> Handoff ' + escapeHtml(metrics.handoff || "included") + "</p>",
        (metrics.note ? '<p class="bundle-note">' + escapeHtml(metrics.note) + "</p>" : ""),
        (qcChecklist.length
          ? '<details class="qc-details"><summary>View QC checklist</summary><ul class="qc-checklist">'
            + qcChecklist.map(function (entry) { return "<li>" + escapeHtml(entry) + "</li>"; }).join("")
            + '</ul><p class="qc-checklist-note">+ additional checks depending on job scope.</p></details>'
          : "")
      ].join("");
    });
  }

  function renderSampleDelivery(sampleDelivery) {
    document.querySelectorAll("[data-sample-delivery]").forEach(function (container) {
      if (!sampleDelivery || !sampleDelivery.title) {
        container.innerHTML = "";
        return;
      }

      function list(items) {
        return (items || []).map(function (item) {
          return "<li>" + escapeHtml(item) + "</li>";
        }).join("");
      }

      container.innerHTML = [
        '<article class="card sample-card">',
        '<h3 class="card-title">' + escapeHtml(sampleDelivery.title) + "</h3>",
        '<p class="sample-scenario">' + escapeHtml(sampleDelivery.scenario || "") + "</p>",
        '<div class="sample-grid">',
        "<section><h4>Before</h4><ul class=\"clean-list\">" + list(sampleDelivery.before) + "</ul></section>",
        "<section><h4>After</h4><ul class=\"clean-list\">" + list(sampleDelivery.after) + "</ul></section>",
        "<section><h4>Change Log</h4><ul class=\"clean-list\">" + list(sampleDelivery.changeLog) + "</ul></section>",
        "<section><h4>Client Receives</h4><ul class=\"clean-list\">" + list(sampleDelivery.clientReceives) + "</ul></section>",
        "</div>",
        "</article>"
      ].join("");
    });
  }

  function renderFaq(faqItems) {
    document.querySelectorAll("[data-faq]").forEach(function (container) {
      if (!faqItems || !faqItems.length) {
        container.innerHTML = "";
        return;
      }

      container.innerHTML = faqItems.map(function (item) {
        return [
          '<article class="card faq-item">',
          '<h3 class="card-title">' + escapeHtml(item.question || "") + "</h3>",
          "<p>" + escapeHtml(item.answer || "") + "</p>",
          "</article>"
        ].join("");
      }).join("");
    });
  }

  function renderRiskLines(riskLines) {
    document.querySelectorAll("[data-risk-lines]").forEach(function (container) {
      if (!riskLines || !riskLines.length) {
        container.innerHTML = "";
        return;
      }

      container.innerHTML = riskLines.map(function (line) {
        return "<li>" + escapeHtml(line) + "</li>";
      }).join("");
    });
  }

  function renderSla(slaConfig) {
    document.querySelectorAll("[data-sla]").forEach(function (container) {
      var items = slaConfig && Array.isArray(slaConfig.items) ? slaConfig.items.filter(Boolean) : [];
      var enabled = !slaConfig || slaConfig.enabled !== false;

      if (!enabled || !items.length) {
        container.innerHTML = "";
        return;
      }

      container.innerHTML = [
        '<article class="card sla-card">',
        '<p class="card-kicker">Response SLA</p>',
        '<h3 class="card-title">' + escapeHtml(slaConfig.title || "Fast response") + "</h3>",
        '<ul class="clean-list sla-list">',
        items.map(function (item) { return "<li>" + escapeHtml(item) + "</li>"; }).join(""),
        "</ul>",
        "</article>"
      ].join("");
    });
  }

  function renderPayments(paymentsConfig) {
    document.querySelectorAll("[data-payments]").forEach(function (container) {
      var methods = paymentsConfig && Array.isArray(paymentsConfig.methods)
        ? paymentsConfig.methods.filter(function (method) {
            if (!method || typeof method !== "object") {
              return false;
            }
            return isUsableLinkUrl(method.url);
          })
        : [];
      var enabled = paymentsConfig && paymentsConfig.enabled !== false;

      if (!enabled || !methods.length) {
        container.hidden = true;
        container.innerHTML = "";
        return;
      }

      container.hidden = false;
      container.innerHTML = [
        '<div class="section-head">',
        '<p class="section-label">Payments</p>',
        "<h2>" + escapeHtml(paymentsConfig.heading || "Pay to start") + "</h2>",
        '<p class="intro">' + escapeHtml(paymentsConfig.note || "") + "</p>",
        "</div>",
        '<div class="payments-grid">',
        methods.map(function (method) {
          var href = method.url.trim();
          var isExternal = /^https?:\/\//i.test(href);
          var targetAttrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : "";
          return [
            '<article class="card payment-card">',
            '<h3 class="card-title">' + escapeHtml(method.label || "Pay now") + "</h3>",
            '<p class="payment-blurb">' + escapeHtml(method.blurb || "Secure checkout link") + "</p>",
            '<a class="button payment-link" href="' + escapeHtml(href) + '"' + targetAttrs + ">Pay to start</a>",
            "</article>"
          ].join("");
        }).join(""),
        "</div>"
      ].join("");
    });
  }

  function renderIntakeTemplate(intakeConfig) {
    document.querySelectorAll("[data-intake-template]").forEach(function (container) {
      var template = intakeConfig && typeof intakeConfig.emailBodyTemplate === "string"
        ? intakeConfig.emailBodyTemplate.trim()
        : "";

      if (!template) {
        container.innerHTML = "";
        return;
      }

      container.innerHTML = [
        '<div class="intake-template-actions">',
        '<button type="button" class="button button-ghost button-compact intake-template-copy">Copy intake template</button>',
        '<span class="intake-template-status" aria-live="polite"></span>',
        "</div>",
        '<p class="intake-template-note">Paste this into your email if your client blocks automatic template text.</p>'
      ].join("");

      var copyButton = container.querySelector(".intake-template-copy");
      var status = container.querySelector(".intake-template-status");
      if (!copyButton || !status) {
        return;
      }

      copyButton.addEventListener("click", function () {
        copyButton.disabled = true;
        copyTextToClipboard(template).then(function () {
          status.textContent = "Template copied.";
        }).catch(function () {
          status.textContent = "Copy failed. Select and copy manually.";
        }).finally(function () {
          window.setTimeout(function () {
            copyButton.disabled = false;
          }, 260);
        });
      });
    });
  }

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
      // Ignore storage errors in private mode or restricted contexts.
    }

    // Remove variant query param after resolving to avoid share/indexing drift.
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

    if (variant.headline) {
      setText("[data-hero-headline]", variant.headline);
    }
    if (variant.subhead) {
      setText("[data-hero-subhead]", variant.subhead);
    }
    if (variant.cta) {
      setText("[data-hero-cta-label]", variant.cta);
    }
    if (variant.trustLine) {
      setText("[data-hero-trust]", variant.trustLine);
    }

    if (selection.key && document.body) {
      document.body.setAttribute("data-hero-variant", selection.key);
    }
  }

  function setActiveNav() {
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

  async function loadConfig() {
    async function fetchConfigCandidate(path) {
      var response = await fetch(path, { cache: "no-store" });
      if (!response.ok) {
        return null;
      }
      return response.json();
    }

    try {
      var remoteConfig = await fetchConfigCandidate("site-config.json");
      if (!remoteConfig) {
        remoteConfig = await fetchConfigCandidate("/site-config.json");
      }
      if (!remoteConfig) {
        return fallbackConfig;
      }
      var remoteMeta = Object.assign({}, remoteConfig.config || {});
      if (!remoteMeta.schemaVersion && remoteConfig.schemaVersion) {
        remoteMeta.schemaVersion = remoteConfig.schemaVersion;
      }

      var remoteConversion = remoteConfig.conversion || {};
      var remoteIntake = Object.assign({}, remoteConversion.intake || {});
      if (!remoteIntake.primaryUrl && remoteConversion.intakeUrl) {
        remoteIntake.primaryUrl = remoteConversion.intakeUrl;
      }
      var remoteIntakeConfig = Object.assign({}, remoteConfig.intake || {});
      var remotePayments = Object.assign({}, remoteConfig.payments || {});
      var remoteSla = Object.assign({}, remoteConfig.sla || {});

      var mergedPages = mergePageConfig(fallbackConfig.pages, remoteConfig.pages);
      var mergedNav = normalizeNavIds(
        Array.isArray(remoteConfig.nav) ? remoteConfig.nav : fallbackConfig.nav,
        mergedPages,
        fallbackConfig.nav
      );

      var mergedPayments = Object.assign({}, fallbackConfig.payments || {}, remotePayments, {
        methods: Array.isArray(remotePayments.methods)
          ? remotePayments.methods
          : ((fallbackConfig.payments && fallbackConfig.payments.methods) || [])
      });

      var mergedSla = Object.assign({}, fallbackConfig.sla || {}, remoteSla, {
        items: Array.isArray(remoteSla.items)
          ? remoteSla.items
          : ((fallbackConfig.sla && fallbackConfig.sla.items) || [])
      });

      return Object.assign({}, fallbackConfig, remoteConfig, {
        config: Object.assign({}, fallbackConfig.config, remoteMeta),
        site: Object.assign({}, fallbackConfig.site, remoteConfig.site || {}),
        brand: Object.assign({}, fallbackConfig.brand, remoteConfig.brand || {}),
        intake: Object.assign({}, fallbackConfig.intake || {}, remoteIntakeConfig),
        payments: mergedPayments,
        sla: mergedSla,
        nav: mergedNav,
        pages: mergedPages,
        heroVariantDefault: remoteConfig.heroVariantDefault || fallbackConfig.heroVariantDefault,
        heroVariants: Object.assign({}, fallbackConfig.heroVariants || {}, remoteConfig.heroVariants || {}),
        conversion: Object.assign({}, fallbackConfig.conversion, remoteConversion, {
          intake: Object.assign({}, fallbackConfig.conversion.intake, remoteIntake)
        }),
        deliveryBundle: Object.assign({}, fallbackConfig.deliveryBundle, remoteConfig.deliveryBundle || {}),
        sampleDelivery: Object.assign({}, fallbackConfig.sampleDelivery, remoteConfig.sampleDelivery || {}),
        privacy: Object.assign({}, fallbackConfig.privacy, remoteConfig.privacy || {})
      });
    } catch (error) {
      return fallbackConfig;
    }
  }

  loadConfig().then(function (config) {
    var basePath = normalizeBasePath(config.site && config.site.basePath);
    var intakeConfig = Object.assign({}, config.intake || {});
    var primaryIntakeUrl = config.conversion.intake && isUsableLinkUrl(config.conversion.intake.primaryUrl)
      ? config.conversion.intake.primaryUrl.trim()
      : null;

    var fallbackEmail = config.conversion.intake && isValidEmail(config.conversion.intake.fallbackEmail)
      ? config.conversion.intake.fallbackEmail.trim()
      : (isValidEmail(config.brand.email) ? config.brand.email.trim() : "");

    var intakeEmailTo = isValidEmail(intakeConfig.emailTo)
      ? intakeConfig.emailTo.trim()
      : fallbackEmail;
    var intakeSubject = (typeof intakeConfig.emailSubject === "string" && intakeConfig.emailSubject.trim())
      ? intakeConfig.emailSubject.trim()
      : (config.brand.name + " request");
    var intakeTemplate = (typeof intakeConfig.emailBodyTemplate === "string" && intakeConfig.emailBodyTemplate.trim())
      ? intakeConfig.emailBodyTemplate.trim()
      : "File link:\nTool (Excel/Google Sheets):\nWhat is broken:\nDesired output:\nDeadline + timezone:\nConstraints:";
    var intakeMailtoUrl = buildMailtoLink(intakeEmailTo, intakeSubject, intakeTemplate);

    var fallbackIntakeUrl = fallbackEmail
      ? "mailto:" + fallbackEmail + "?subject=" + encodeURIComponent(config.brand.name + " request")
      : null;

    var prefixedPrimaryIntakeUrl = primaryIntakeUrl ? prefixInternalUrl(primaryIntakeUrl, basePath) : null;
    var resolvedIntakeUrl = intakeMailtoUrl || prefixedPrimaryIntakeUrl || fallbackIntakeUrl;
    var currentPath = stripBasePath(window.location.pathname, basePath);
    var primaryIntakePath = prefixedPrimaryIntakeUrl
      ? stripBasePath(normalizeConfiguredPath(prefixedPrimaryIntakeUrl), basePath)
      : null;

    // If primary intake points to the current page (e.g. contact page), use email fallback for the CTA action.
    if (primaryIntakePath && primaryIntakePath === currentPath && fallbackIntakeUrl && !/^mailto:/i.test(resolvedIntakeUrl || "")) {
      resolvedIntakeUrl = fallbackIntakeUrl;
    }

    setText("[data-brand]", config.brand.name);
    setText("[data-tagline]", config.brand.tagline);
    setText("[data-email]", config.brand.email);
    setText("[data-cta-label]", config.conversion.ctaLabel);
    setText("[data-intake-helper]", config.conversion.intakeHelper);
    setText("[data-credibility-anchor]", config.conversion.credibilityAnchor);
    setText("[data-privacy-note]", config.privacy.note);
    setText("[data-metadata-note]", config.privacy.metadataHygiene);
    applyHeroVariant(pickHeroVariant(config));

    if (isValidEmail(config.brand.email) || isValidEmail(intakeEmailTo)) {
      setHref("[data-email-link]", "mailto:" + (isValidEmail(config.brand.email) ? config.brand.email.trim() : intakeEmailTo));
    }

    if (resolvedIntakeUrl) {
      setHref("[data-intake-link]", resolvedIntakeUrl);
    }

    applyNav(config.nav, config.pages, config.site);
    applyPageMeta(config.site, config.pages);

    renderServiceCards(config.offers);
    renderPackages(config.packages);
    renderStepTimeline(config.process);
    renderProofTiles(config.proof);
    renderDeliveryBundlePreview(config.deliveryBundle);
    renderSampleDelivery(config.sampleDelivery);
    renderFaq(config.faq);
    renderRiskLines(config.conversion.riskReversal);
    renderSla(config.sla);
    renderPayments(config.payments);
    renderIntakeTemplate({
      emailBodyTemplate: intakeTemplate
    });

    document.querySelectorAll("[data-year]").forEach(function (node) {
      node.textContent = String(new Date().getFullYear());
    });

    setActiveNav();
    setupMenu();
    setupReveal();
  });
})();
