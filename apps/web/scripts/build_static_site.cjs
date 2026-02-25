#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const SRC = path.join(ROOT, "src");
const PUBLIC = path.join(ROOT, "public");

const COPY_FILE_MAPPINGS = [
  ["src/pages/index.html", "index.html"],
  ["src/pages/services.html", "services.html"],
  ["src/pages/process.html", "process.html"],
  ["src/pages/contact.html", "contact.html"],
  ["src/pages/file-sharing.html", "file-sharing.html"],
  ["src/pages/sample-delivery.html", "sample-delivery.html"],
  ["src/pages/terms.html", "terms.html"],
  ["src/pages/404.html", "404.html"],
  ["src/styles/styles.css", "styles.css"],
  ["src/site-config.json", "site-config.json"],
  ["public/robots.txt", "robots.txt"],
  ["public/sitemap.xml", "sitemap.xml"],
  ["public/_headers", "_headers"],
  ["public/_redirects", "_redirects"],
  ["public/site.webmanifest", "site.webmanifest"],
  ["public/favicon.svg", "favicon.svg"],
  ["public/apple-touch-icon.svg", "apple-touch-icon.svg"],
  ["public/social-preview.svg", "social-preview.svg"],
  ["public/social-preview.png", "social-preview.png"]
];

const COPY_DIR_MAPPINGS = [
  ["src/assets", "assets"]
];

const APP_BUNDLE_SOURCES = [
  "src/js/utils/safe.js",
  "src/js/dom.js",
  "src/js/config.js",
  "src/js/url.js",
  "src/js/meta.js",
  "src/js/nav.js",
  "src/js/ui.js",
  "src/js/render/blocks/chips.js",
  "src/js/render/blocks/gallery.js",
  "src/js/render/index.js",
  "src/js/app.js"
];

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function cleanDist() {
  fs.rmSync(DIST, { recursive: true, force: true });
  ensureDir(DIST);
}

function syncSeoFromConfig() {
  const scriptPath = path.join(ROOT, "scripts", "sync_meta_from_config.cjs");
  const result = spawnSync(process.execPath, [scriptPath], {
    cwd: ROOT,
    stdio: "inherit"
  });

  if (result.status !== 0) {
    throw new Error("SEO sync failed");
  }
}

function copyFile(sourceRelPath, targetRelPath) {
  const source = path.join(ROOT, sourceRelPath);
  const target = path.join(DIST, targetRelPath);
  if (!fs.existsSync(source)) {
    throw new Error("Missing build input: " + sourceRelPath);
  }
  ensureDir(path.dirname(target));
  fs.copyFileSync(source, target);
}

function copyDir(sourceRelPath, targetRelPath) {
  const source = path.join(ROOT, sourceRelPath);
  const target = path.join(DIST, targetRelPath);
  if (!fs.existsSync(source)) {
    throw new Error("Missing build directory: " + sourceRelPath);
  }
  fs.cpSync(source, target, { recursive: true });
}

function buildRuntimeAppBundle() {
  const parts = APP_BUNDLE_SOURCES.map(function (sourceRelPath) {
    const fullPath = path.join(ROOT, sourceRelPath);
    if (!fs.existsSync(fullPath)) {
      throw new Error("Missing app bundle source: " + sourceRelPath);
    }
    return fs.readFileSync(fullPath, "utf8").trim();
  });

  fs.writeFileSync(path.join(DIST, "app.js"), parts.join("\n\n"), "utf8");
}

function main() {
  syncSeoFromConfig();
  cleanDist();
  COPY_FILE_MAPPINGS.forEach(function (mapping) {
    copyFile(mapping[0], mapping[1]);
  });
  COPY_DIR_MAPPINGS.forEach(function (mapping) {
    copyDir(mapping[0], mapping[1]);
  });
  buildRuntimeAppBundle();
  console.log("build: ok");
  console.log("build output:", DIST);
}

main();
