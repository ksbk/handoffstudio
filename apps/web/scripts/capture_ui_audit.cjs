#!/usr/bin/env node

const fs = require("fs/promises");
const http = require("http");
const net = require("net");
const path = require("path");
const { pathToFileURL } = require("url");
const { spawn } = require("child_process");
const { chromium } = require("playwright");

const ROOT = process.cwd();
const SITE_ROOT = path.join(ROOT, "dist");
const OUTPUT_DIR = path.join(ROOT, "tests", "artifacts", "ui-audit");
const HOST = "127.0.0.1";
const FALLBACK_PORT = Number(process.env.UI_AUDIT_PORT || 4191);
const ROOT_FILE_HREF = pathToFileURL(path.join(SITE_ROOT, path.sep)).href;

const PAGES = [
  "index.html",
  "services.html",
  "process.html",
  "contact.html",
  "file-sharing.html",
  "sample-delivery.html",
  "terms.html",
  "404.html"
];

const VIEWPORTS = [
  { key: "mobile-360x800", width: 360, height: 800 },
  { key: "tablet-768x1024", width: 768, height: 1024 },
  { key: "desktop-1280x800", width: 1280, height: 800 }
];

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function findFreePort() {
  return new Promise((resolve, reject) => {
    const probe = net.createServer();
    probe.unref();
    probe.on("error", reject);
    probe.listen(0, HOST, () => {
      const addr = probe.address();
      const port = typeof addr === "object" && addr ? addr.port : 0;
      probe.close(() => resolve(port || FALLBACK_PORT));
    });
  });
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
          reject(new Error("Timed out waiting for " + url));
          return;
        }
        setTimeout(probe, 250);
      });
      req.on("error", () => {
        if (Date.now() > deadline) {
          reject(new Error("Timed out waiting for " + url));
          return;
        }
        setTimeout(probe, 250);
      });
    };
    probe();
  });
}

function baseNameForPage(file) {
  return file === "index.html" ? "home" : file.replace(/\.html$/, "");
}

function rewriteRootAssetUrls(html) {
  let output = html;
  output = output.replace(/\b(href|src)=(['"])\/([^'"#?]+)([^'"]*)\2/gi, (_, attr, quote, assetPath, suffix) => {
    return `${attr}=${quote}${ROOT_FILE_HREF}${assetPath}${suffix}${quote}`;
  });

  if (!/<base\s/i.test(output)) {
    output = output.replace(/<head>/i, `<head>\n  <base href="${ROOT_FILE_HREF}">`);
  }
  return output;
}

async function captureWithServer() {
  const port = await findFreePort();
  const baseUrl = `http://${HOST}:${port}`;
  const server = spawn("python3", ["-m", "http.server", String(port), "--directory", SITE_ROOT], {
    stdio: ["ignore", "pipe", "pipe"]
  });

  let serverExited = false;
  server.on("exit", () => {
    serverExited = true;
  });

  try {
    await waitForServer(`${baseUrl}/index.html`);
    const browser = await chromium.launch({ headless: true });

    for (const viewport of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        deviceScaleFactor: 1
      });
      const page = await context.newPage();

      for (const file of PAGES) {
        const url = `${baseUrl}/${file}`;
        await page.goto(url, { waitUntil: "networkidle" });
        await page.evaluate(() => {
          document.body.classList.remove("js-ready");
          document.querySelectorAll(".reveal").forEach((el) => {
            el.classList.add("is-visible");
            el.style.opacity = "1";
            el.style.transform = "none";
          });
        });
        await wait(120);

        const shotName = `${baseNameForPage(file)}-${viewport.key}.png`;
        const shotPath = path.join(OUTPUT_DIR, shotName);
        await page.screenshot({ path: shotPath, fullPage: true });
      }

      await context.close();
    }

    await browser.close();
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

async function captureWithInlineFallback() {
  const browser = await chromium.launch({ headless: true });

  for (const viewport of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1
    });
    const page = await context.newPage();

    for (const file of PAGES) {
      const htmlPath = path.join(SITE_ROOT, file);
      const html = await fs.readFile(htmlPath, "utf8");
      const rewritten = rewriteRootAssetUrls(html);
      await page.setContent(rewritten, { waitUntil: "networkidle" });
      await page.evaluate(() => {
        document.body.classList.remove("js-ready");
        document.querySelectorAll(".reveal").forEach((el) => {
          el.classList.add("is-visible");
          el.style.opacity = "1";
          el.style.transform = "none";
        });
      });
      await wait(120);

      const shotName = `${baseNameForPage(file)}-${viewport.key}.png`;
      const shotPath = path.join(OUTPUT_DIR, shotName);
      await page.screenshot({ path: shotPath, fullPage: true });
    }

    await context.close();
  }

  await browser.close();
}

async function capture() {
  await fs.access(path.join(SITE_ROOT, "index.html"));
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  try {
    await captureWithServer();
  } catch (error) {
    console.warn("ui-audit: localhost mode unavailable; using inline fallback.");
    await captureWithInlineFallback();
  }
}

capture()
  .then(() => {
    console.log("ui-audit screenshots: ok");
    console.log("output:", OUTPUT_DIR);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
