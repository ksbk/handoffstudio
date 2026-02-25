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
      emailBodyTemplate: "File link:\nTool (Excel/Google Sheets):\nWhat is broken:\nDesired output:\nDeadline + timezone:\nConstraints:",
      checklist: [
        "File link (Drive/Dropbox/Git)",
        "Tool: Excel or Google Sheets",
        "What is broken and why it blocks work",
        "Desired output and acceptance criteria",
        "Deadline + timezone",
        "Constraints (must keep formulas, naming, etc.)"
      ]
    },
    payments: {
      enabled: true,
      heading: "Pay to start",
      note: "If I can't fix it, you don't pay.",
      methods: [
        {
          label: "Quick Fix — $49",
          price: 49,
          url: "https://PAYMENT_LINK_49",
          blurb: "Best for one urgent blocker that needs a same-day fix.",
          promise: "Triage and fix on one focused issue.",
          includes: [
            "Formula or import error diagnosis",
            "Patched file with validation notes",
            "Execution summary in handoff notes"
          ],
          ctaLabel: "Start Quick Fix"
        },
        {
          label: "Standard Rescue — $149",
          price: 149,
          url: "https://PAYMENT_LINK_149",
          blurb: "Best for messy sheets, repeated errors, or partial rebuilds.",
          promise: "Structured rescue with clean output and run-ready notes.",
          includes: [
            "Data cleanup + formula stabilization",
            "QC checklist output",
            "Handoff notes for repeat execution"
          ],
          ctaLabel: "Start Standard Rescue"
        },
        {
          label: "Day Rate — $399",
          price: 399,
          url: "https://PAYMENT_LINK_399",
          blurb: "Best for multi-step rescue where several blockers are linked.",
          promise: "Full-day coverage with scope checkpoints and delivery bundle.",
          includes: [
            "Priority triage and fix sequencing",
            "Multiple deliverables in one package",
            "Rollback-safe notes where relevant"
          ],
          ctaLabel: "Start Day Rate"
        }
      ]
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
        primaryUrl: "/contact.html",
        fallbackEmail: "hello@handoffstudio.com"
      },
      intakeHelper: "No sales call required. Send scope + deadline and get a confirmed scope boundary before work starts.",
      credibilityAnchor: "Triage reply within 1 business day · Fixed quote after triage · Written scope boundary · Secure file workflow · NDA available",
      riskReversal: [
        "Clear scope before work starts",
        "Clear turnaround window and handoff format",
        "No hidden add-ons or vague deliverables"
      ],
      heroOutcomes: [
        "Fixed within 24–48h",
        "QC checklist included",
        "Scope locked before work"
      ]
    },
    heroVariantDefault: "a",
    heroVariants: {
      a: {
        headline: "Technical blockers fixed and handed off clean.",
        subhead: "Send scope + deadline. Get a QC-reviewed fix with handoff notes — no retainers, no calls.",
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
        title: "Fix",
        description: "You receive fit confirmation, scope boundary, and execution updates."
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
    visuals: {
      trustStrip: {
        items: [
          { label: "Same-day starts when scope is clear", icon: "/assets/icons/trust-no-call.svg" },
          { label: "Clear scope before execution", icon: "/assets/icons/trust-scope.svg" },
          { label: "QC-reviewed handoff package", icon: "/assets/icons/trust-qc.svg" },
          { label: "Privacy-first file handling", icon: "/assets/icons/trust-privacy.svg" },
          { label: "$0 if not fixed", icon: "/assets/icons/trust-nda.svg" }
        ]
      },
      heroVisual: {
        kicker: "Before and after",
        caption: "Illustrative (synthetic): cleanup snapshots show unstable inputs transformed into validated, handoff-ready outputs.",
        items: [
          {
            label: "Before",
            image: "/assets/thumbs/before-sheet.svg",
            alt: "Synthetic preview of a pre-fix spreadsheet with inconsistent formatting and unstable formulas"
          },
          {
            label: "After",
            image: "/assets/thumbs/after-sheet.svg",
            alt: "Synthetic preview of a cleaned spreadsheet with normalized structure and validated calculations"
          }
        ]
      },
      heroDeliverables: {
        kicker: "Delivery artifacts",
        items: [
          "Final_Report.xlsx with normalized formulas",
          "qc.json checklist output",
          "handoff_notes.md with run steps"
        ]
      },
      commonFixes: {
        items: [
          {
            title: "Formula failures",
            description: "Fix #REF, circular references, and unstable nested lookups.",
            icon: "/assets/icons/fix-formulas.svg"
          },
          {
            title: "Messy imports",
            description: "Normalize CSV/XLSX exports and map columns for reliable reporting.",
            icon: "/assets/icons/fix-imports.svg"
          },
          {
            title: "Broken automation",
            description: "Restore scripts, cron jobs, and handoff-safe run steps.",
            icon: "/assets/icons/fix-automation.svg"
          },
          {
            title: "Deploy breakages",
            description: "Patch Django/FastAPI incidents and ship rollback-safe notes.",
            icon: "/assets/icons/fix-deploy.svg"
          }
        ]
      },
      deliverablesGallery: {
        services: [
          {
            title: "Final report file",
            image: "/assets/thumbs/final-report.svg",
            alt: "Synthetic preview of a cleaned report workbook ready for handoff",
            caption: "Final_Report.xlsx with validated totals and locked formulas."
          },
          {
            title: "QC summary",
            image: "/assets/thumbs/qc-json.svg",
            alt: "Synthetic preview of QC summary output in JSON format",
            caption: "qc.json capturing checks, assumptions, and pass/fail markers."
          },
          {
            title: "Handoff notes",
            image: "/assets/thumbs/handoff-notes.svg",
            alt: "Synthetic preview of markdown handoff notes with execution steps",
            caption: "handoff_notes.md with run steps and rollback guidance."
          }
        ],
        sampleDelivery: [
          {
            title: "Before sheet snapshot",
            image: "/assets/thumbs/before-sheet.svg",
            alt: "Synthetic preview of pre-fix spreadsheet state with inconsistent rows",
            caption: "Before: unstable formulas and inconsistent import formatting."
          },
          {
            title: "After sheet snapshot",
            image: "/assets/thumbs/after-sheet.svg",
            alt: "Synthetic preview of post-fix spreadsheet state with validated outputs",
            caption: "After: normalized structure and validated output checks."
          },
          {
            title: "QC summary",
            image: "/assets/thumbs/qc-json.svg",
            alt: "Synthetic preview of QC summary output in JSON format",
            caption: "QC summary: checklist output attached to the delivery bundle."
          }
        ]
      }
    },
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
    var domApi = window.HandoffRuntime && window.HandoffRuntime.dom;
    if (domApi && typeof domApi.setText === "function") {
      domApi.setText(selector, value);
      return;
    }
    document.querySelectorAll(selector).forEach(function (el) {
      el.textContent = value;
    });
  }

  function setHref(selector, value) {
    var domApi = window.HandoffRuntime && window.HandoffRuntime.dom;
    if (domApi && typeof domApi.setHref === "function") {
      domApi.setHref(selector, value);
      return;
    }
    document.querySelectorAll(selector).forEach(function (el) {
      el.setAttribute("href", value);
    });
  }

  function escapeHtml(value) {
    var safeApi = window.HandoffRuntime && window.HandoffRuntime.utils;
    if (safeApi && typeof safeApi.escapeHtml === "function") {
      return safeApi.escapeHtml(value);
    }
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function normalizePath(path) {
    var urlApi = window.HandoffRuntime && window.HandoffRuntime.url;
    if (urlApi && typeof urlApi.normalizePath === "function") {
      return urlApi.normalizePath(path);
    }
    return !path || path === "/" ? "/index.html" : path.replace(/\/$/, "");
  }

  function normalizeConfiguredPath(path) {
    var urlApi = window.HandoffRuntime && window.HandoffRuntime.url;
    if (urlApi && typeof urlApi.normalizeConfiguredPath === "function") {
      return urlApi.normalizeConfiguredPath(path);
    }
    return null;
  }

  function normalizeBasePath(value) {
    var urlApi = window.HandoffRuntime && window.HandoffRuntime.url;
    if (urlApi && typeof urlApi.normalizeBasePath === "function") {
      return urlApi.normalizeBasePath(value);
    }
    return "/";
  }

  function stripBasePath(path, basePath) {
    var urlApi = window.HandoffRuntime && window.HandoffRuntime.url;
    if (urlApi && typeof urlApi.stripBasePath === "function") {
      return urlApi.stripBasePath(path, basePath);
    }
    return normalizePath(path);
  }

  function withBasePath(path, basePath) {
    var urlApi = window.HandoffRuntime && window.HandoffRuntime.url;
    if (urlApi && typeof urlApi.withBasePath === "function") {
      return urlApi.withBasePath(path, basePath);
    }
    return normalizeConfiguredPath(path);
  }

  function prefixInternalUrl(value, basePath) {
    var urlApi = window.HandoffRuntime && window.HandoffRuntime.url;
    if (urlApi && typeof urlApi.prefixInternalUrl === "function") {
      return urlApi.prefixInternalUrl(value, basePath);
    }
    return value;
  }

  function hasPlaceholderToken(value) {
    var safeApi = window.HandoffRuntime && window.HandoffRuntime.utils;
    if (safeApi && typeof safeApi.hasPlaceholderToken === "function") {
      return safeApi.hasPlaceholderToken(value);
    }
    return /replace-with|your-intake-link|example\.com\/replace|payment_link_/i.test(value);
  }

  function isValidEmail(value) {
    var safeApi = window.HandoffRuntime && window.HandoffRuntime.utils;
    if (safeApi && typeof safeApi.isValidEmail === "function") {
      return safeApi.isValidEmail(value);
    }
    return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  function buildMailtoLink(emailTo, subject, body) {
    var safeApi = window.HandoffRuntime && window.HandoffRuntime.utils;
    if (safeApi && typeof safeApi.buildMailtoLink === "function") {
      return safeApi.buildMailtoLink(emailTo, subject, body);
    }

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
    var safeApi = window.HandoffRuntime && window.HandoffRuntime.utils;
    if (safeApi && typeof safeApi.copyTextToClipboard === "function") {
      return safeApi.copyTextToClipboard(text);
    }

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
    var safeApi = window.HandoffRuntime && window.HandoffRuntime.utils;
    if (safeApi && typeof safeApi.isUsableLinkUrl === "function") {
      return safeApi.isUsableLinkUrl(value);
    }

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
    var urlApi = window.HandoffRuntime && window.HandoffRuntime.url;
    if (urlApi && typeof urlApi.normalizeBaseUrl === "function") {
      return urlApi.normalizeBaseUrl(value);
    }
    return null;
  }

  function isPagesDevHost(hostname) {
    var urlApi = window.HandoffRuntime && window.HandoffRuntime.url;
    if (urlApi && typeof urlApi.isPagesDevHost === "function") {
      return urlApi.isPagesDevHost(hostname);
    }
    return false;
  }

  function getRuntimeCanonicalOrigin() {
    var urlApi = window.HandoffRuntime && window.HandoffRuntime.url;
    if (urlApi && typeof urlApi.getRuntimeCanonicalOrigin === "function") {
      return urlApi.getRuntimeCanonicalOrigin();
    }
    return null;
  }

  function resolveCanonicalOrigin(baseUrl) {
    var urlApi = window.HandoffRuntime && window.HandoffRuntime.url;
    if (urlApi && typeof urlApi.resolveCanonicalOrigin === "function") {
      return urlApi.resolveCanonicalOrigin(baseUrl);
    }
    return normalizeBaseUrl(baseUrl);
  }

  function toCanonicalPath(path, basePath) {
    var urlApi = window.HandoffRuntime && window.HandoffRuntime.url;
    if (urlApi && typeof urlApi.toCanonicalPath === "function") {
      return urlApi.toCanonicalPath(path, basePath);
    }
    return null;
  }

  function buildCanonicalFromBase(baseUrl, pagePath, currentPath, basePath) {
    var urlApi = window.HandoffRuntime && window.HandoffRuntime.url;
    if (urlApi && typeof urlApi.buildCanonicalFromBase === "function") {
      return urlApi.buildCanonicalFromBase(baseUrl, pagePath, currentPath, basePath);
    }
    return null;
  }

  function getHostnameFromUrl(value) {
    var urlApi = window.HandoffRuntime && window.HandoffRuntime.url;
    if (urlApi && typeof urlApi.getHostnameFromUrl === "function") {
      return urlApi.getHostnameFromUrl(value);
    }
    return null;
  }

  function toAbsoluteHttpUrl(value, fallbackOrigin) {
    var urlApi = window.HandoffRuntime && window.HandoffRuntime.url;
    if (urlApi && typeof urlApi.toAbsoluteHttpUrl === "function") {
      return urlApi.toAbsoluteHttpUrl(value, fallbackOrigin);
    }
    return null;
  }

  function mergePageConfig(basePages, remotePages) {
    var merged = Object.assign({}, basePages || {}, remotePages || {});

    Object.keys(merged).forEach(function (key) {
      merged[key] = Object.assign({}, (basePages || {})[key] || {}, (remotePages || {})[key] || {});
    });

    return merged;
  }

  function updateMetaContent(selector, value) {
    var metaApi = window.HandoffRuntime && window.HandoffRuntime.meta;
    if (metaApi && typeof metaApi.updateMetaContent === "function") {
      return metaApi.updateMetaContent(selector, value);
    }
    return;
  }

  function applyPageMeta(site, pages) {
    var metaApi = window.HandoffRuntime && window.HandoffRuntime.meta;
    if (metaApi && typeof metaApi.applyPageMeta === "function") {
      return metaApi.applyPageMeta(site, pages);
    }
    return;
  }

  function findPageIdByPath(pages, href) {
    var navApi = window.HandoffRuntime && window.HandoffRuntime.nav;
    if (navApi && typeof navApi.findPageIdByPath === "function") {
      return navApi.findPageIdByPath(pages, href);
    }
    return null;
  }

  function normalizeNavIds(navItems, pages, fallbackNav) {
    var navApi = window.HandoffRuntime && window.HandoffRuntime.nav;
    if (navApi && typeof navApi.normalizeNavIds === "function") {
      return navApi.normalizeNavIds(navItems, pages, fallbackNav);
    }
    return fallbackNav;
  }

  function getNavLabel(page, pageId) {
    var navApi = window.HandoffRuntime && window.HandoffRuntime.nav;
    if (navApi && typeof navApi.getNavLabel === "function") {
      return navApi.getNavLabel(page, pageId);
    }
    return pageId;
  }

  function applyNav(navIds, pages, site) {
    var navApi = window.HandoffRuntime && window.HandoffRuntime.nav;
    if (navApi && typeof navApi.applyNav === "function") {
      return navApi.applyNav(navIds, pages, site);
    }
    return;
  }

  function renderServiceCards(offers) {
    var renderApi = window.HandoffRuntime && window.HandoffRuntime.render;
    if (renderApi && typeof renderApi.renderServiceCards === "function") {
      renderApi.renderServiceCards(offers);
    }
  }

  function renderPackages(packages) {
    var renderApi = window.HandoffRuntime && window.HandoffRuntime.render;
    if (renderApi && typeof renderApi.renderPackages === "function") {
      renderApi.renderPackages(packages);
    }
  }

  function renderStepTimeline(steps) {
    var renderApi = window.HandoffRuntime && window.HandoffRuntime.render;
    if (renderApi && typeof renderApi.renderStepTimeline === "function") {
      renderApi.renderStepTimeline(steps);
    }
  }

  function renderProofTiles(proofItems) {
    var renderApi = window.HandoffRuntime && window.HandoffRuntime.render;
    if (renderApi && typeof renderApi.renderProofTiles === "function") {
      renderApi.renderProofTiles(proofItems);
    }
  }

  function renderDeliveryBundlePreview(bundleConfig) {
    var renderApi = window.HandoffRuntime && window.HandoffRuntime.render;
    if (renderApi && typeof renderApi.renderDeliveryBundlePreview === "function") {
      renderApi.renderDeliveryBundlePreview(bundleConfig);
    }
  }

  function renderSampleDelivery(sampleDelivery) {
    var renderApi = window.HandoffRuntime && window.HandoffRuntime.render;
    if (renderApi && typeof renderApi.renderSampleDelivery === "function") {
      renderApi.renderSampleDelivery(sampleDelivery);
    }
  }

  function renderFaq(faqItems) {
    var renderApi = window.HandoffRuntime && window.HandoffRuntime.render;
    if (renderApi && typeof renderApi.renderFaq === "function") {
      renderApi.renderFaq(faqItems);
    }
  }

  function renderRiskLines(riskLines) {
    var renderApi = window.HandoffRuntime && window.HandoffRuntime.render;
    if (renderApi && typeof renderApi.renderRiskLines === "function") {
      renderApi.renderRiskLines(riskLines);
    }
  }

  function renderSla(slaConfig) {
    var renderApi = window.HandoffRuntime && window.HandoffRuntime.render;
    if (renderApi && typeof renderApi.renderSla === "function") {
      renderApi.renderSla(slaConfig);
    }
  }

  function renderHeroOutcomes(conversionConfig) {
    var renderApi = getRenderApi();
    if (renderApi && typeof renderApi.renderHeroOutcomes === "function") {
      renderApi.renderHeroOutcomes(conversionConfig);
    }
  }

  function renderPayments(paymentsConfig) {
    var renderApi = window.HandoffRuntime && window.HandoffRuntime.render;
    if (renderApi && typeof renderApi.renderPayments === "function") {
      renderApi.renderPayments(paymentsConfig);
    }
  }

  function renderIntakeTemplate(intakeConfig) {
    var renderApi = window.HandoffRuntime && window.HandoffRuntime.render;
    if (renderApi && typeof renderApi.renderIntakeTemplate === "function") {
      renderApi.renderIntakeTemplate(intakeConfig);
    }
  }

  function renderTrustStrip(visualsConfig) {
    var renderApi = window.HandoffRuntime && window.HandoffRuntime.render;
    if (renderApi && typeof renderApi.renderTrustStrip === "function") {
      renderApi.renderTrustStrip(visualsConfig);
    }
  }

  function renderHeroVisual(visualsConfig) {
    var renderApi = window.HandoffRuntime && window.HandoffRuntime.render;
    if (renderApi && typeof renderApi.renderHeroVisual === "function") {
      renderApi.renderHeroVisual(visualsConfig);
    }
  }

  function renderHeroDeliverables(visualsConfig) {
    var renderApi = getRenderApi();
    if (renderApi && typeof renderApi.renderHeroDeliverables === "function") {
      renderApi.renderHeroDeliverables(visualsConfig);
    }
  }

  function renderCommonFixes(visualsConfig) {
    var renderApi = window.HandoffRuntime && window.HandoffRuntime.render;
    if (renderApi && typeof renderApi.renderCommonFixes === "function") {
      renderApi.renderCommonFixes(visualsConfig);
    }
  }

  function renderDeliverablesGallery(visualsConfig) {
    var renderApi = window.HandoffRuntime && window.HandoffRuntime.render;
    if (renderApi && typeof renderApi.renderDeliverablesGallery === "function") {
      renderApi.renderDeliverablesGallery(visualsConfig);
    }
  }

  function pickHeroVariant(config) {
    var uiApi = window.HandoffRuntime && window.HandoffRuntime.ui;
    if (uiApi && typeof uiApi.pickHeroVariant === "function") {
      return uiApi.pickHeroVariant(config);
    }
    return null;
  }

  function applyHeroVariant(selection) {
    var uiApi = window.HandoffRuntime && window.HandoffRuntime.ui;
    if (uiApi && typeof uiApi.applyHeroVariant === "function") {
      return uiApi.applyHeroVariant(selection);
    }
    return;
  }

  function setActiveNav() {
    var navApi = window.HandoffRuntime && window.HandoffRuntime.nav;
    if (navApi && typeof navApi.setActiveNav === "function") {
      return navApi.setActiveNav();
    }
    return;
  }

  function setupMenu() {
    var navApi = window.HandoffRuntime && window.HandoffRuntime.nav;
    if (navApi && typeof navApi.setupMenu === "function") {
      return navApi.setupMenu();
    }
    return;
  }

  function setupReveal() {
    var uiApi = window.HandoffRuntime && window.HandoffRuntime.ui;
    if (uiApi && typeof uiApi.setupReveal === "function") {
      return uiApi.setupReveal();
    }
    return;
  }

  function setupMobileStickyCta(options) {
    var uiApi = window.HandoffRuntime && window.HandoffRuntime.ui;
    if (uiApi && typeof uiApi.setupMobileStickyCta === "function") {
      return uiApi.setupMobileStickyCta(options);
    }
    return;
  }

  async function loadConfig() {
    var configApi = window.HandoffRuntime && window.HandoffRuntime.config;
    if (!configApi || typeof configApi.loadConfig !== "function") {
      return fallbackConfig;
    }

    return configApi.loadConfig({
      fallbackConfig: fallbackConfig,
      mergePageConfig: mergePageConfig,
      normalizeNavIds: normalizeNavIds
    });
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
    var resolvedIntakeUrl = prefixedPrimaryIntakeUrl || intakeMailtoUrl || fallbackIntakeUrl;
    var currentPath = stripBasePath(window.location.pathname, basePath);
    var primaryIntakePath = prefixedPrimaryIntakeUrl
      ? stripBasePath(normalizeConfiguredPath(prefixedPrimaryIntakeUrl), basePath)
      : null;
    var contactPath = config.pages && config.pages.contact
      ? normalizeConfiguredPath(config.pages.contact.path)
      : normalizeConfiguredPath("/contact.html");
    var contactUrl = contactPath ? prefixInternalUrl(contactPath, basePath) : null;

    // If primary intake points to the current page (e.g. contact page), use the templated email action.
    if (primaryIntakePath && primaryIntakePath === currentPath) {
      resolvedIntakeUrl = intakeMailtoUrl || fallbackIntakeUrl || resolvedIntakeUrl;
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

    setupMobileStickyCta({
      href: contactUrl || prefixedPrimaryIntakeUrl || "/contact.html",
      label: config.conversion.ctaLabel,
      showOnPages: ["services", "contact"],
      activationOffset: 220
    });

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
    renderHeroOutcomes(config.conversion);
    renderPayments(config.payments);
    renderIntakeTemplate({
      emailBodyTemplate: intakeTemplate,
      checklist: Array.isArray(intakeConfig.checklist) ? intakeConfig.checklist : []
    });
    renderTrustStrip(config.visuals);
    renderHeroVisual(config.visuals);
    renderHeroDeliverables(config.visuals);
    renderCommonFixes(config.visuals);
    renderDeliverablesGallery(config.visuals);

    document.querySelectorAll("[data-year]").forEach(function (node) {
      node.textContent = String(new Date().getFullYear());
    });

    setActiveNav();
    setupMenu();
    setupReveal();
  });
})();
