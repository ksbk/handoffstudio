#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");

const COPY_FILES = [
  "index.html",
  "services.html",
  "process.html",
  "contact.html",
  "file-sharing.html",
  "sample-delivery.html",
  "terms.html",
  "404.html",
  "styles.css",
  "app.js",
  "site-config.json",
  "robots.txt",
  "sitemap.xml",
  "_headers",
  "site.webmanifest",
  "favicon.svg",
  "apple-touch-icon.svg",
  "social-preview.svg",
  "social-preview.png"
];

const COPY_DIRS = [
  "assets"
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

function copyFile(relPath) {
  const source = path.join(ROOT, relPath);
  const target = path.join(DIST, relPath);
  if (!fs.existsSync(source)) {
    throw new Error("Missing build input: " + relPath);
  }
  ensureDir(path.dirname(target));
  fs.copyFileSync(source, target);
}

function copyDir(relPath) {
  const source = path.join(ROOT, relPath);
  const target = path.join(DIST, relPath);
  if (!fs.existsSync(source)) {
    throw new Error("Missing build directory: " + relPath);
  }
  fs.cpSync(source, target, { recursive: true });
}

function main() {
  syncSeoFromConfig();
  cleanDist();
  COPY_FILES.forEach(copyFile);
  COPY_DIRS.forEach(copyDir);
  console.log("build: ok");
  console.log("build output:", DIST);
}

main();
