(function (global) {
  var runtime = global.HandoffRuntime = global.HandoffRuntime || {};

  function getUtils() {
    return runtime.utils || {};
  }

  function getRenderBlocks() {
    return runtime.renderBlocks || {};
  }

  function renderServiceCards(offers) {
    var escapeHtml = getUtils().escapeHtml;

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
    var escapeHtml = getUtils().escapeHtml;

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
    var escapeHtml = getUtils().escapeHtml;

    function getStepIconAsset(step, index) {
      var normalized = String((step && step.title) || "").toLowerCase();
      if (normalized.indexOf("send") !== -1 || index === 0) {
        return "/assets/icons/step-send.svg";
      }
      if (normalized.indexOf("fix") !== -1 || normalized.indexOf("plan") !== -1 || index === 1) {
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
    var escapeHtml = getUtils().escapeHtml;

    document.querySelectorAll("[data-proof-grid]").forEach(function (container) {
      if (!proofItems || !proofItems.length) {
        container.innerHTML = "";
        return;
      }

      container.innerHTML = proofItems.map(function (item) {
        return [
          '<article class="card proof-tile">',
          '<h3 class="card-title">' + escapeHtml(item.title) + "</h3>",
          (item.impact ? '<p class="proof-stat">' + escapeHtml(item.impact) + "</p>" : ""),
          '<ul class="clean-list proof-list">',
          '<li><strong>Before:</strong> ' + escapeHtml(item.before || "") + "</li>",
          '<li><strong>After:</strong> ' + escapeHtml(item.after || "") + "</li>",
          '<li class="delivery-note"><strong>Delivery note:</strong> ' + escapeHtml(item.deliveryNote || "") + "</li>",
          "</ul>",
          "</article>"
        ].join("");
      }).join("");
    });
  }

  function renderDeliveryBundlePreview(bundleConfig) {
    var escapeHtml = getUtils().escapeHtml;

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
    var escapeHtml = getUtils().escapeHtml;

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
        '<section><h4>Before</h4><ul class="clean-list">' + list(sampleDelivery.before) + "</ul></section>",
        '<section><h4>After</h4><ul class="clean-list">' + list(sampleDelivery.after) + "</ul></section>",
        '<section><h4>Change Log</h4><ul class="clean-list">' + list(sampleDelivery.changeLog) + "</ul></section>",
        '<section><h4>Client Receives</h4><ul class="clean-list">' + list(sampleDelivery.clientReceives) + "</ul></section>",
        "</div>",
        "</article>"
      ].join("");
    });
  }

  function renderFaq(faqItems) {
    var escapeHtml = getUtils().escapeHtml;

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
    var escapeHtml = getUtils().escapeHtml;

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
    var escapeHtml = getUtils().escapeHtml;

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

  function renderHeroOutcomes(conversionConfig) {
    var escapeHtml = getUtils().escapeHtml;
    var outcomes = conversionConfig && Array.isArray(conversionConfig.heroOutcomes)
      ? conversionConfig.heroOutcomes.filter(Boolean)
      : [];

    document.querySelectorAll("[data-hero-outcomes]").forEach(function (container) {
      if (!outcomes.length) {
        container.hidden = true;
        container.innerHTML = "";
        return;
      }

      container.hidden = false;
      container.innerHTML = outcomes.map(function (item) {
        return "<li>" + escapeHtml(item) + "</li>";
      }).join("");
    });
  }

  function renderPayments(paymentsConfig) {
    var utils = getUtils();
    var escapeHtml = utils.escapeHtml;
    var isUsableLinkUrl = utils.isUsableLinkUrl;

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
          var includeItems = Array.isArray(method.includes)
            ? method.includes.filter(Boolean).slice(0, 3)
            : [];
          if (!includeItems.length) {
            includeItems = [method.blurb || "Secure checkout link"];
          }
          return [
            '<article class="card payment-card">',
            '<h3 class="card-title">' + escapeHtml(method.label || "Pay now") + "</h3>",
            '<p class="payment-blurb">' + escapeHtml(method.blurb || "Secure checkout link") + "</p>",
            '<p class="payment-promise">' + escapeHtml(method.promise || "Clear scope before execution.") + "</p>",
            '<ul class="clean-list payment-includes">',
            includeItems.map(function (item) {
              return "<li>" + escapeHtml(item) + "</li>";
            }).join(""),
            "</ul>",
            '<a class="button payment-link" href="' + escapeHtml(href) + '"' + targetAttrs + ">" + escapeHtml(method.ctaLabel || "Pay to start") + "</a>",
            "</article>"
          ].join("");
        }).join(""),
        "</div>"
      ].join("");
    });
  }

  function renderIntakeTemplate(intakeConfig) {
    var utils = getUtils();
    var copyTextToClipboard = utils.copyTextToClipboard;
    var escapeHtml = typeof utils.escapeHtml === "function"
      ? utils.escapeHtml
      : function (value) { return String(value == null ? "" : value); };

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

    document.querySelectorAll("[data-intake-preview]").forEach(function (node) {
      var template = intakeConfig && typeof intakeConfig.emailBodyTemplate === "string"
        ? intakeConfig.emailBodyTemplate.trim()
        : "";
      if (!template) {
        return;
      }
      node.textContent = template;
    });

    document.querySelectorAll("[data-intake-checklist]").forEach(function (container) {
      var checklist = intakeConfig && Array.isArray(intakeConfig.checklist)
        ? intakeConfig.checklist.filter(Boolean)
        : [];
      if (!checklist.length) {
        return;
      }
      container.innerHTML = checklist.map(function (item) {
        return "<li>" + escapeHtml(item) + "</li>";
      }).join("");
    });
  }

  function renderTrustStrip(visualsConfig) {
    var blocks = getRenderBlocks();
    var chips = blocks.chips || {};
    var trustConfig = visualsConfig && visualsConfig.trustStrip ? visualsConfig.trustStrip : {};
    var items = Array.isArray(trustConfig.items) ? trustConfig.items : [];
    var escapeHtml = getUtils().escapeHtml;

    document.querySelectorAll("[data-trust-strip]").forEach(function (container) {
      if (!items.length) {
        container.innerHTML = "";
        return;
      }

      if (typeof chips.renderChipStrip === "function") {
        chips.renderChipStrip(container, items, { ariaLabel: "Service highlights" });
        return;
      }

      container.innerHTML = [
        '<ul class="icon-chip-strip" aria-label="Service highlights">',
        items.map(function (item) {
          if (!item || !item.label) {
            return "";
          }
          return [
            '<li class="icon-chip">',
            (item.icon ? '<img class="icon-chip-icon" src="' + escapeHtml(item.icon) + '" alt="" loading="lazy" width="16" height="16">' : '<span class="icon-chip-dot" aria-hidden="true"></span>'),
            '<span class="icon-chip-label">' + escapeHtml(item.label) + "</span>",
            "</li>"
          ].join("");
        }).join(""),
        "</ul>"
      ].join("");
    });
  }

  function renderHeroVisual(visualsConfig) {
    var blocks = getRenderBlocks();
    var gallery = blocks.gallery || {};
    var heroVisual = visualsConfig && visualsConfig.heroVisual ? visualsConfig.heroVisual : {};
    var items = Array.isArray(heroVisual.items) ? heroVisual.items : [];
    var escapeHtml = getUtils().escapeHtml;

    document.querySelectorAll("[data-hero-visual]").forEach(function (container) {
      if (!items.length) {
        container.innerHTML = "";
        return;
      }

      container.innerHTML = [
        '<p class="card-kicker">' + escapeHtml(heroVisual.kicker || "Visual proof") + "</p>",
        '<div class="hero-visual-host"></div>',
        '<p class="hero-visual-caption">' + escapeHtml(heroVisual.caption || "") + "</p>"
      ].join("");

      var host = container.querySelector(".hero-visual-host");
      if (!host) {
        return;
      }

      if (typeof gallery.renderThumbGallery === "function") {
        gallery.renderThumbGallery(host, items, { gridClass: "hero-visual-grid" });
        return;
      }

      host.innerHTML = [
        '<div class="hero-visual-grid">',
        items.map(function (item) {
          if (!item || !item.image) {
            return "";
          }
          return [
            '<figure class="card hero-visual-card-item">',
            '<p class="card-kicker">' + escapeHtml(item.label || "Preview") + "</p>",
            '<img src="' + escapeHtml(item.image) + '" alt="' + escapeHtml(item.alt || "") + '" loading="lazy" width="320" height="208">',
            "</figure>"
          ].join("");
        }).join(""),
        "</div>"
      ].join("");
    });
  }

  function renderHeroDeliverables(visualsConfig) {
    var escapeHtml = getUtils().escapeHtml;
    var deliverables = visualsConfig && visualsConfig.heroDeliverables ? visualsConfig.heroDeliverables : {};
    var items = Array.isArray(deliverables.items) ? deliverables.items.filter(Boolean) : [];

    document.querySelectorAll("[data-hero-deliverables]").forEach(function (container) {
      if (!items.length) {
        container.hidden = true;
        container.innerHTML = "";
        return;
      }

      container.hidden = false;
      container.innerHTML = [
        '<p class="card-kicker">' + escapeHtml(deliverables.kicker || "Delivery artifacts") + "</p>",
        '<ul class="clean-list">',
        items.map(function (item) { return "<li>" + escapeHtml(item) + "</li>"; }).join(""),
        "</ul>"
      ].join("");
    });
  }

  function renderCommonFixes(visualsConfig) {
    var blocks = getRenderBlocks();
    var chips = blocks.chips || {};
    var commonFixes = visualsConfig && visualsConfig.commonFixes ? visualsConfig.commonFixes : {};
    var items = Array.isArray(commonFixes.items) ? commonFixes.items : [];

    document.querySelectorAll("[data-common-fixes]").forEach(function (container) {
      if (!items.length) {
        container.innerHTML = "";
        return;
      }

      if (typeof chips.renderIconGrid === "function") {
        chips.renderIconGrid(container, items, { gridClass: "common-fixes-grid" });
      }
    });
  }

  function renderDeliverablesGallery(visualsConfig) {
    var blocks = getRenderBlocks();
    var gallery = blocks.gallery || {};
    var deliverables = visualsConfig && visualsConfig.deliverablesGallery
      ? visualsConfig.deliverablesGallery
      : {};

    document.querySelectorAll("[data-deliverables-gallery]").forEach(function (container) {
      var key = container.getAttribute("data-deliverables-gallery") || "services";
      var items = Array.isArray(deliverables[key]) ? deliverables[key] : [];

      if (!items.length) {
        container.innerHTML = "";
        return;
      }

      if (typeof gallery.renderThumbGallery === "function") {
        gallery.renderThumbGallery(container, items, { gridClass: "deliverables-gallery-grid" });
      }
    });
  }

  runtime.render = {
    renderServiceCards: renderServiceCards,
    renderPackages: renderPackages,
    renderStepTimeline: renderStepTimeline,
    renderProofTiles: renderProofTiles,
    renderDeliveryBundlePreview: renderDeliveryBundlePreview,
    renderSampleDelivery: renderSampleDelivery,
    renderFaq: renderFaq,
    renderRiskLines: renderRiskLines,
    renderSla: renderSla,
    renderHeroOutcomes: renderHeroOutcomes,
    renderPayments: renderPayments,
    renderIntakeTemplate: renderIntakeTemplate,
    renderTrustStrip: renderTrustStrip,
    renderHeroVisual: renderHeroVisual,
    renderHeroDeliverables: renderHeroDeliverables,
    renderCommonFixes: renderCommonFixes,
    renderDeliverablesGallery: renderDeliverablesGallery
  };
})(window);
