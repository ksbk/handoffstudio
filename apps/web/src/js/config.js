(function (global) {
  var runtime = global.HandoffRuntime = global.HandoffRuntime || {};

  function validateConfigShape(candidate) {
    if (!candidate || typeof candidate !== "object") {
      return false;
    }
    if (!candidate.site || typeof candidate.site !== "object") {
      return false;
    }
    if (!candidate.brand || typeof candidate.brand !== "object") {
      return false;
    }
    if (!candidate.pages || typeof candidate.pages !== "object") {
      return false;
    }
    if (!Array.isArray(candidate.nav)) {
      return false;
    }

    return true;
  }

  function mergeConfig(fallbackConfig, remoteConfig, helpers) {
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
    var remoteVisuals = Object.assign({}, remoteConfig.visuals || {});

    var mergedPages = helpers.mergePageConfig(fallbackConfig.pages, remoteConfig.pages);
    var mergedNav = helpers.normalizeNavIds(
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

    var fallbackVisuals = fallbackConfig.visuals || {};
    var remoteTrustStrip = Object.assign({}, remoteVisuals.trustStrip || {});
    var remoteHeroVisual = Object.assign({}, remoteVisuals.heroVisual || {});
    var remoteCommonFixes = Object.assign({}, remoteVisuals.commonFixes || {});
    var remoteDeliverablesGallery = Object.assign({}, remoteVisuals.deliverablesGallery || {});

    var mergedVisuals = Object.assign({}, fallbackVisuals, remoteVisuals, {
      trustStrip: Object.assign({}, fallbackVisuals.trustStrip || {}, remoteTrustStrip, {
        items: Array.isArray(remoteTrustStrip.items)
          ? remoteTrustStrip.items
          : (((fallbackVisuals.trustStrip || {}).items) || [])
      }),
      heroVisual: Object.assign({}, fallbackVisuals.heroVisual || {}, remoteHeroVisual, {
        items: Array.isArray(remoteHeroVisual.items)
          ? remoteHeroVisual.items
          : (((fallbackVisuals.heroVisual || {}).items) || [])
      }),
      commonFixes: Object.assign({}, fallbackVisuals.commonFixes || {}, remoteCommonFixes, {
        items: Array.isArray(remoteCommonFixes.items)
          ? remoteCommonFixes.items
          : (((fallbackVisuals.commonFixes || {}).items) || [])
      }),
      deliverablesGallery: Object.assign({}, fallbackVisuals.deliverablesGallery || {}, remoteDeliverablesGallery, {
        services: Array.isArray(remoteDeliverablesGallery.services)
          ? remoteDeliverablesGallery.services
          : (((fallbackVisuals.deliverablesGallery || {}).services) || []),
        sampleDelivery: Array.isArray(remoteDeliverablesGallery.sampleDelivery)
          ? remoteDeliverablesGallery.sampleDelivery
          : (((fallbackVisuals.deliverablesGallery || {}).sampleDelivery) || [])
      })
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
      visuals: mergedVisuals,
      deliveryBundle: Object.assign({}, fallbackConfig.deliveryBundle, remoteConfig.deliveryBundle || {}),
      sampleDelivery: Object.assign({}, fallbackConfig.sampleDelivery, remoteConfig.sampleDelivery || {}),
      privacy: Object.assign({}, fallbackConfig.privacy, remoteConfig.privacy || {})
    });
  }

  async function loadConfig(options) {
    async function fetchConfigCandidate(path) {
      var response = await fetch(path, { cache: "no-store" });
      if (!response.ok) {
        return null;
      }
      return response.json();
    }

    var fallbackConfig = options.fallbackConfig;

    try {
      var remoteConfig = await fetchConfigCandidate("site-config.json");
      if (!remoteConfig) {
        remoteConfig = await fetchConfigCandidate("/site-config.json");
      }
      if (!remoteConfig || !validateConfigShape(remoteConfig)) {
        return fallbackConfig;
      }

      return mergeConfig(fallbackConfig, remoteConfig, {
        mergePageConfig: options.mergePageConfig,
        normalizeNavIds: options.normalizeNavIds
      });
    } catch (error) {
      return fallbackConfig;
    }
  }

  runtime.config = {
    validateConfigShape: validateConfigShape,
    loadConfig: loadConfig,
    mergeConfig: mergeConfig
  };
})(window);
