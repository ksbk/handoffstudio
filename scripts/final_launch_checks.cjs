#!/usr/bin/env node

const fs = require("fs");
const http = require("http");
const path = require("path");
const { spawn } = require("child_process");
const { chromium } = require("playwright");

const HOST = "127.0.0.1";
const PORT = Number(process.env.LAUNCH_CHECK_PORT || 4174);
const BASE_URL = `http://${HOST}:${PORT}`;
const ARTIFACTS_DIR = path.resolve(__dirname, "..", "tests", "artifacts");
const HEADERS_FILE = path.resolve(__dirname, "..", "_headers");
const VIEWPORTS = [
  { width: 375, height: 812 },
  { width: 768, height: 1024 },
  { width: 1280, height: 800 },
  { width: 1440, height: 900 }
];

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function waitForServer(url, timeoutMs = 15000) {
  const deadline = Date.now() + timeoutMs;
  return new Promise((resolve, reject) => {
    const probe = () => {
      const req = http.get(url, (res) => {
        res.resume();
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 500) {
          resolve();
          return;
        }
        if (Date.now() > deadline) {
          reject(new Error(`Timed out waiting for local server at ${url}`));
          return;
        }
        setTimeout(probe, 250);
      });

      req.on("error", () => {
        if (Date.now() > deadline) {
          reject(new Error(`Timed out waiting for local server at ${url}`));
          return;
        }
        setTimeout(probe, 250);
      });
    };

    probe();
  });
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function ensureArtifactsDir() {
  fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });
}

function shouldIgnoreConsoleError(msg) {
  const text = String(msg.text ? msg.text() : msg || "");
  return /fonts\.googleapis\.com|fonts\.gstatic\.com|frame-ancestors.*ignored when delivered via a <meta> element/i.test(text);
}

function requestStatus(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      res.resume();
      resolve(res.statusCode || 0);
    });
    req.on("error", reject);
  });
}

async function runScenario(results, name, fn) {
  try {
    await fn();
    results.push({ name, ok: true });
    console.log(`PASS ${name}`);
  } catch (error) {
    results.push({ name, ok: false, error: error && error.message ? error.message : String(error) });
    console.error(`FAIL ${name}`);
    console.error(error && error.stack ? error.stack : error);
  }
}

function readSecurityHeaderState() {
  const state = {
    frameProtection: false,
    hsts: false,
    referrerPolicy: false,
    permissionsPolicy: false,
    xContentType: false
  };

  try {
    const text = fs.readFileSync(HEADERS_FILE, "utf8");
    state.frameProtection = /frame-ancestors\s+'none'/.test(text) && /X-Frame-Options:\s*DENY/i.test(text);
    state.hsts = /Strict-Transport-Security:/i.test(text);
    state.referrerPolicy = /Referrer-Policy:/i.test(text);
    state.permissionsPolicy = /Permissions-Policy:/i.test(text);
    state.xContentType = /X-Content-Type-Options:\s*nosniff/i.test(text);
  } catch (error) {
    return state;
  }

  return state;
}

async function scenarioNavigationAndRouting(browser) {
  const context = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await context.newPage();
  const consoleErrors = [];

  page.on("console", (msg) => {
    if (msg.type() === "error" && !shouldIgnoreConsoleError(msg)) {
      consoleErrors.push(msg.text());
    }
  });
  page.on("pageerror", (err) => {
    consoleErrors.push(String(err && err.message ? err.message : err));
  });

  await page.goto(`${BASE_URL}/index.html`, { waitUntil: "networkidle" });
  const h1 = (await page.textContent(".hero-headline") || "").trim();
  assert(h1.length > 10, "Home hero headline missing");

  const navTargets = [
    { selector: '.site-nav a[href="/index.html"]', path: "/index.html" },
    { selector: '.site-nav a[href="/services.html"]', path: "/services.html" },
    { selector: '.site-nav a[href="/process.html"]', path: "/process.html" },
    { selector: '.site-nav a[href="/contact.html"]', path: "/contact.html" }
  ];

  for (const target of navTargets) {
    await page.click(target.selector);
    await page.waitForLoadState("networkidle");
    const current = new URL(page.url()).pathname;
    assert(current === target.path, `Nav route mismatch for ${target.path}, got ${current}`);
  }

  await page.goto(`${BASE_URL}/index.html`, { waitUntil: "networkidle" });
  const footerTargets = [
    { selector: '.footer-nav a[href="/sample-delivery.html"]', path: "/sample-delivery.html" },
    { selector: '.footer-nav a[href="/file-sharing.html"]', path: "/file-sharing.html" },
    { selector: '.legal-right a[href="/terms.html"]', path: "/terms.html" },
    { selector: '.legal-right a[href="/contact.html#privacy-note"]', path: "/contact.html", hash: "#privacy-note" }
  ];

  for (const target of footerTargets) {
    await page.goto(`${BASE_URL}/index.html`, { waitUntil: "networkidle" });
    await page.click(target.selector);
    await page.waitForLoadState("networkidle");
    const currentUrl = new URL(page.url());
    assert(currentUrl.pathname === target.path, `Footer route mismatch for ${target.path}, got ${currentUrl.pathname}`);
    if (target.hash) {
      assert(currentUrl.hash === target.hash, `Footer hash mismatch for ${target.hash}, got ${currentUrl.hash}`);
    }
  }

  const missingStatus = await requestStatus(`${BASE_URL}/route-that-should-not-exist`);
  assert(missingStatus === 404, "Bogus route did not return HTTP 404");

  await page.goto(`${BASE_URL}/404.html`, { waitUntil: "networkidle" });
  const notFoundTitle = (await page.textContent("main h1") || "").trim().toLowerCase();
  assert(notFoundTitle.includes("does not exist"), "Custom 404 page did not render expected heading");

  assert(consoleErrors.length === 0, `Console errors detected: ${consoleErrors.join(" | ")}`);
  await context.close();
}

async function scenarioHeroVariantSafety(browser) {
  const context = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await context.newPage();

  await page.goto(`${BASE_URL}/index.html`, { waitUntil: "networkidle" });
  const defaultVariant = await page.getAttribute("body", "data-hero-variant");
  assert(defaultVariant === "a", `Expected default variant 'a', got '${defaultVariant}'`);

  await page.goto(`${BASE_URL}/index.html?v=b`, { waitUntil: "networkidle" });
  await wait(80);
  const stateB = await page.evaluate(() => ({
    search: window.location.search,
    variant: document.body.getAttribute("data-hero-variant")
  }));
  assert(stateB.variant === "b", "Variant b not applied");
  assert(stateB.search === "", "Variant query param not removed after ?v=b");

  await page.reload({ waitUntil: "networkidle" });
  const persisted = await page.getAttribute("body", "data-hero-variant");
  assert(persisted === "b", "Variant b not persisted on refresh");

  await page.goto(`${BASE_URL}/index.html?v=reset`, { waitUntil: "networkidle" });
  await wait(80);
  const resetState = await page.evaluate(() => ({
    search: window.location.search,
    variant: document.body.getAttribute("data-hero-variant")
  }));
  assert(resetState.variant === "a", "Variant reset did not restore default");
  assert(resetState.search === "", "Variant query param not removed after reset");

  await context.close();
}

async function scenarioDeliveryBundleCredibility(browser) {
  const context = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await context.newPage();
  await page.goto(`${BASE_URL}/index.html`, { waitUntil: "networkidle" });

  const bundleText = await page.textContent(".delivery-preview");
  assert(/QC OK/.test(bundleText || ""), "Delivery preview missing 'QC OK' status tag");
  assert(/Typical QC checks 24/.test(bundleText || ""), "Delivery preview missing typical QC checks label");
  assert(/Status tags reflect QC review checks\./.test(bundleText || ""), "Delivery preview missing status note");

  const summary = page.locator(".qc-details summary");
  await summary.click();
  await page.waitForTimeout(50);
  const openAfterFirst = await page.getAttribute(".qc-details", "open");
  assert(openAfterFirst !== null, "QC checklist did not open");
  await summary.click();
  await page.waitForTimeout(50);
  const openAfterSecond = await page.getAttribute(".qc-details", "open");
  assert(openAfterSecond === null, "QC checklist did not close");
  await context.close();

  const noJsContext = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 1366, height: 900 }
  });
  const noJsPage = await noJsContext.newPage();
  await noJsPage.goto(`${BASE_URL}/index.html`, { waitUntil: "domcontentloaded" });
  const noJsHero = (await noJsPage.textContent(".hero-headline") || "").trim();
  const noJsIntro = (await noJsPage.textContent(".helper") || "").trim();
  const noJsBundleItems = await noJsPage.locator(".bundle-list li").count();
  const noJsChecklistItems = await noJsPage.locator(".qc-details .qc-checklist li").count();
  assert(noJsHero.length > 12, "No-JS fallback missing readable hero headline");
  assert(noJsIntro.length > 20, "No-JS fallback missing core intro content");
  assert(noJsBundleItems >= 4, "No-JS fallback missing bundle list");
  assert(noJsChecklistItems >= 8, "No-JS fallback missing checklist items");
  await noJsContext.close();
}

async function scenarioProofAndMobile(browser) {
  const desktop = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const desktopPage = await desktop.newPage();
  await desktopPage.goto(`${BASE_URL}/index.html`, { waitUntil: "networkidle" });

  const captions = await desktopPage.$$eval(".proof-visual-card figcaption", (nodes) =>
    nodes.map((node) => (node.textContent || "").trim())
  );
  assert(captions.length >= 2, "Proof visual captions missing");
  captions.forEach((caption) => {
    if (!caption.startsWith("Illustrative (synthetic):")) {
      throw new Error("Proof caption missing synthetic label: " + caption);
    }
  });
  await desktop.close();

  const mobile = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const mobilePage = await mobile.newPage();
  await mobilePage.goto(`${BASE_URL}/index.html`, { waitUntil: "networkidle" });

  const layout = await mobilePage.evaluate(() => {
    const first = document.querySelector(".proof-visual-card:first-child");
    const second = document.querySelector(".proof-visual-card:last-child");
    const image = document.querySelector(".proof-visual-card img");
    const firstTop = first ? first.getBoundingClientRect().top : 0;
    const secondTop = second ? second.getBoundingClientRect().top : 0;
    const imageWidth = image ? image.getBoundingClientRect().width : 0;
    return { firstTop, secondTop, imageWidth };
  });
  assert(layout.secondTop > layout.firstTop + 24, "Proof cards do not stack cleanly on mobile");
  assert(layout.imageWidth >= 200, "Proof visuals too small on mobile");
  await mobile.close();
}

async function scenarioAccessibilitySmoke(browser) {
  const context = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await context.newPage();
  await page.goto(`${BASE_URL}/index.html`, { waitUntil: "networkidle" });

  const landmarks = await page.evaluate(() => ({
    hasHeader: Boolean(document.querySelector("header")),
    hasPrimaryNav: Boolean(document.querySelector('nav[aria-label="Primary"]')),
    hasMain: Boolean(document.querySelector("main")),
    hasFooter: Boolean(document.querySelector("footer"))
  }));
  assert(landmarks.hasHeader, "A11y: missing header landmark");
  assert(landmarks.hasPrimaryNav, "A11y: missing primary nav landmark");
  assert(landmarks.hasMain, "A11y: missing main landmark");
  assert(landmarks.hasFooter, "A11y: missing footer landmark");

  await page.keyboard.press("Tab");
  const skipLinkFocused = await page.evaluate(() => {
    const el = document.activeElement;
    return Boolean(el && el.matches(".skip-link") && el.getAttribute("href") === "#main-content");
  });
  assert(skipLinkFocused, "A11y: skip link did not receive first keyboard focus");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(60);
  const skipTargetApplied = await page.evaluate(() => window.location.hash === "#main-content");
  assert(skipTargetApplied, "A11y: skip link did not move to #main-content target");
  await page.goto(`${BASE_URL}/index.html`, { waitUntil: "networkidle" });

  const requiredSelectors = [
    '.site-nav a[href="/services.html"]',
    '.hero-actions .button[data-intake-link]',
    ".qc-details summary",
    ".footer-cta"
  ];
  const seen = new Set();

  for (let i = 0; i < 40; i += 1) {
    await page.keyboard.press("Tab");
    const active = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el) {
        return "";
      }
      let label = el.tagName.toLowerCase();
      if (el.id) {
        label += "#" + el.id;
      }
      if (el.className && typeof el.className === "string") {
        label += "." + el.className.split(/\s+/).filter(Boolean).join(".");
      }
      const href = el.getAttribute && el.getAttribute("href");
      if (href) {
        label += `[href="${href}"]`;
      }
      return label;
    });
    requiredSelectors.forEach((selector) => {
      if (active.includes(selector.replace(/\./g, ".")) || active.includes(selector.split(" ").slice(-1)[0])) {
        seen.add(selector);
      }
    });
    const focusMatches = await page.evaluate((selectors) => {
      const el = document.activeElement;
      if (!el) {
        return [];
      }
      return selectors.filter((selector) => el.matches(selector));
    }, requiredSelectors);
    focusMatches.forEach((selector) => seen.add(selector));
  }

  requiredSelectors.forEach((selector) => {
    assert(seen.has(selector), `Keyboard tab flow did not reach ${selector}`);
  });

  async function assertKeyboardFocusRing(selector, label) {
    await page.goto(`${BASE_URL}/index.html`, { waitUntil: "networkidle" });
    let matched = false;
    for (let i = 0; i < 40; i += 1) {
      await page.keyboard.press("Tab");
      const isTarget = await page.evaluate((s) => {
        const el = document.activeElement;
        return Boolean(el && el.matches(s));
      }, selector);
      if (!isTarget) {
        continue;
      }
      const style = await page.evaluate(() => {
        const el = document.activeElement;
        const s = el ? window.getComputedStyle(el) : null;
        return {
          outlineStyle: s ? s.outlineStyle : "none",
          outlineWidth: s ? s.outlineWidth : "0px"
        };
      });
      assert(style.outlineStyle !== "none", `A11y: ${label} missing focus-visible outline style`);
      assert(parseFloat(style.outlineWidth || "0") >= 1, `A11y: ${label} focus-visible outline too thin`);
      matched = true;
      break;
    }
    assert(matched, `A11y: keyboard traversal did not focus ${label}`);
  }

  await assertKeyboardFocusRing('.site-nav a[href="/services.html"]', "link");
  await assertKeyboardFocusRing('.hero-actions .button[data-intake-link]', "button");

  await page.focus(".qc-details summary");
  await page.keyboard.press("Tab");
  await page.focus(".qc-details summary");
  const focusStyle = await page.$eval(".qc-details summary", (node) => {
    const style = window.getComputedStyle(node);
    return {
      outlineStyle: style.outlineStyle,
      outlineWidth: style.outlineWidth
    };
  });
  assert(focusStyle.outlineStyle !== "none", "Focus ring missing on checklist summary");
  assert(parseFloat(focusStyle.outlineWidth || "0") >= 1, "Focus ring width too small on checklist summary");

  if (page.accessibility && typeof page.accessibility.snapshot === "function") {
    const a11yTree = await page.accessibility.snapshot({ interestingOnly: false });
    assert(Boolean(a11yTree), "Accessibility snapshot unavailable");
  }

  const contrast = await page.evaluate(() => {
    function parseRgb(color) {
      const match = color.match(/rgba?\(([^)]+)\)/i);
      if (!match) {
        return null;
      }
      const parts = match[1].split(",").map((p) => parseFloat(p.trim()));
      return parts.slice(0, 3);
    }

    function toLinear(channel) {
      const c = channel / 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    }

    function ratio(a, b) {
      const [ar, ag, ab] = a.map(toLinear);
      const [br, bg, bb] = b.map(toLinear);
      const l1 = 0.2126 * ar + 0.7152 * ag + 0.0722 * ab;
      const l2 = 0.2126 * br + 0.7152 * bg + 0.0722 * bb;
      const [light, dark] = l1 > l2 ? [l1, l2] : [l2, l1];
      return (light + 0.05) / (dark + 0.05);
    }

    const bgValue = getComputedStyle(document.documentElement).getPropertyValue("--bg").trim() || "rgb(10, 15, 24)";
    const bg = parseRgb(bgValue) || [10, 15, 24];
    const selectors = [".helper", ".bundle-note", ".legal-left"];
    return selectors.map((selector) => {
      const node = document.querySelector(selector);
      if (!node) {
        return { selector, ok: false, value: 0 };
      }
      const fg = parseRgb(getComputedStyle(node).color);
      const value = fg ? ratio(fg, bg) : 0;
      return { selector, ok: value >= 4.5, value };
    });
  });

  contrast.forEach((item) => {
    assert(item.ok, `Contrast check failed for ${item.selector}: ${item.value.toFixed(2)}`);
  });

  await context.close();
}

async function scenarioResponsiveAndScreenshots(browser) {
  ensureArtifactsDir();

  for (const viewport of VIEWPORTS) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/index.html`, { waitUntil: "networkidle" });

    const metrics = await page.evaluate(() => {
      const headline = document.querySelector(".hero-headline");
      const heroCopy = document.querySelector(".hero-copy");
      const heroPreview = document.querySelector(".delivery-preview");
      const doc = document.documentElement;

      const lineHeight = headline ? parseFloat(getComputedStyle(headline).lineHeight || "0") : 0;
      const height = headline ? headline.getBoundingClientRect().height : 0;
      const lines = lineHeight > 0 ? Math.round(height / lineHeight) : 0;
      const copyTop = heroCopy ? heroCopy.getBoundingClientRect().top : 0;
      const previewTop = heroPreview ? heroPreview.getBoundingClientRect().top : 0;

      return {
        lines,
        copyTop,
        previewTop,
        overflow: doc.scrollWidth - window.innerWidth
      };
    });

    assert(metrics.overflow <= 1, `Horizontal overflow at ${viewport.width}x${viewport.height}`);
    if (viewport.width >= 1280) {
      assert(metrics.lines <= 2, `Headline wraps to ${metrics.lines} lines at ${viewport.width}px`);
      assert(Math.abs(metrics.copyTop - metrics.previewTop) <= 72, `Hero columns misaligned at ${viewport.width}px`);
    }

    const fileName = `home-${viewport.width}x${viewport.height}.png`;
    const outputPath = path.join(ARTIFACTS_DIR, fileName);
    await page.screenshot({ path: outputPath, fullPage: true });
    await context.close();
  }
}

async function scenarioSecurityHeaders() {
  const state = readSecurityHeaderState();
  assert(state.frameProtection, "Security headers: missing frame protection (frame-ancestors/X-Frame-Options)");
  assert(state.hsts, "Security headers: missing Strict-Transport-Security");
  assert(state.referrerPolicy, "Security headers: missing Referrer-Policy");
  assert(state.permissionsPolicy, "Security headers: missing Permissions-Policy");
  assert(state.xContentType, "Security headers: missing X-Content-Type-Options");
}

async function runChecks() {
  const server = spawn("python3", ["-m", "http.server", String(PORT), "--directory", "."], {
    stdio: ["ignore", "pipe", "pipe"]
  });
  let serverExited = false;
  server.on("exit", () => {
    serverExited = true;
  });

  const results = [];

  try {
    await waitForServer(`${BASE_URL}/index.html`);
    const browser = await chromium.launch({ headless: true });

    await runScenario(results, "A. Navigation + routing", async () => {
      await scenarioNavigationAndRouting(browser);
    });
    await runScenario(results, "B. Hero A/B safety", async () => {
      await scenarioHeroVariantSafety(browser);
    });
    await runScenario(results, "C. Delivery bundle credibility + no-JS fallback", async () => {
      await scenarioDeliveryBundleCredibility(browser);
    });
    await runScenario(results, "D. Proof anti-deception + mobile layout", async () => {
      await scenarioProofAndMobile(browser);
    });
    await runScenario(results, "E. Accessibility smoke", async () => {
      await scenarioAccessibilitySmoke(browser);
    });
    await runScenario(results, "F. Responsive breakpoints + screenshots", async () => {
      await scenarioResponsiveAndScreenshots(browser);
    });
    await runScenario(results, "G. Security headers baseline", async () => {
      await scenarioSecurityHeaders();
    });

    await browser.close();

    const failed = results.filter((item) => !item.ok);
    console.log("");
    console.log("E2E summary:");
    results.forEach((item) => {
      console.log(`${item.ok ? "✅" : "❌"} ${item.name}`);
      if (!item.ok) {
        console.log(`   ${item.error}`);
      }
    });
    const security = readSecurityHeaderState();
    console.log(
      "security headers state:",
      `frame=${security.frameProtection ? "✅" : "❌"}`,
      `hsts=${security.hsts ? "✅" : "❌"}`,
      `referrer=${security.referrerPolicy ? "✅" : "❌"}`,
      `permissions=${security.permissionsPolicy ? "✅" : "❌"}`,
      `x-content-type=${security.xContentType ? "✅" : "❌"}`
    );
    console.log(`screenshots: ${ARTIFACTS_DIR}`);

    if (failed.length) {
      throw new Error(`${failed.length} E2E scenario(s) failed`);
    }

    console.log("final launch checks: ok");
  } finally {
    if (!serverExited) {
      server.kill("SIGTERM");
      await wait(120);
      if (!serverExited) {
        server.kill("SIGKILL");
      }
    }
  }
}

runChecks().catch((error) => {
  console.error("final launch checks: failed");
  console.error(error && error.stack ? error.stack : error);
  process.exit(1);
});
