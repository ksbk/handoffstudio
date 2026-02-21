#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const ATTR_RE = /(?:src|href)="([^"]+)"/g;
const SKIP_RE = /^(?:https?:|mailto:|tel:|javascript:|#)/i;

function resolvePath(targetDir, sourcePage, rawPath) {
  const clean = rawPath.split(/[?#]/, 1)[0];
  if (!clean) {
    return null;
  }
  if (SKIP_RE.test(clean)) {
    return null;
  }
  if (clean.startsWith("/")) {
    return path.join(targetDir, clean.slice(1));
  }
  return path.resolve(path.dirname(path.join(targetDir, sourcePage)), clean);
}

function main() {
  const rawTarget = process.argv[2] || "dist";
  const targetDir = path.resolve(ROOT, rawTarget);
  if (!fs.existsSync(targetDir)) {
    console.error("asset refs: failed");
    console.error(" - target directory missing: " + targetDir);
    process.exit(1);
  }

  const htmlPages = fs.readdirSync(targetDir).filter((name) => name.endsWith(".html")).sort();
  if (!htmlPages.length) {
    console.error("asset refs: failed");
    console.error(" - no HTML pages found in: " + targetDir);
    process.exit(1);
  }

  const missing = [];

  htmlPages.forEach((pageName) => {
    const text = fs.readFileSync(path.join(targetDir, pageName), "utf8");
    ATTR_RE.lastIndex = 0;
    let match;
    while ((match = ATTR_RE.exec(text)) !== null) {
      const ref = match[1];
      const resolved = resolvePath(targetDir, pageName, ref);
      if (!resolved) {
        continue;
      }
      if (!resolved.startsWith(targetDir)) {
        continue;
      }
      if (!fs.existsSync(resolved)) {
        missing.push(pageName + ": " + ref);
      }
    }
  });

  if (missing.length) {
    console.error("asset refs: failed");
    missing.forEach((item) => console.error(" - " + item));
    process.exit(1);
  }

  console.log("asset refs: ok");
}

main();
