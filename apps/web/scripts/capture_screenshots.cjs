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
const OUTPUT_DIR = path.join(ROOT, ".preview");
const HOST = "127.0.0.1";
const FALLBACK_PORT = Number(process.env.SCREENSHOT_PORT || 4181);
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
      probe.close(() => {
        if (port > 0) {
          resolve(port);
        } else {
          resolve(FALLBACK_PORT);
        }
      });
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

async function captureWithNavigation() {
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
    await waitForServer(`${baseUrl}/index.html`, 8000);
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: { width: 1440, height: 2400 },
      deviceScaleFactor: 1
    });
    const page = await context.newPage();

    for (const file of PAGES) {
      await page.goto(`${baseUrl}/${file}`, { waitUntil: "networkidle" });
      await page.evaluate(() => {
        document.body.classList.remove("js-ready");
        document.querySelectorAll(".reveal").forEach((el) => {
          el.classList.add("is-visible");
          el.style.opacity = "1";
          el.style.transform = "none";
        });
      });
      await wait(140);
      const outputPath = path.join(OUTPUT_DIR, `${file}.png`);
      await page.screenshot({ path: outputPath, fullPage: true });
    }

    await context.close();
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

async function captureWithInlineContent() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 2400 },
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
    await wait(140);
    const outputPath = path.join(OUTPUT_DIR, `${file}.png`);
    await page.screenshot({ path: outputPath, fullPage: true });
  }

  await context.close();
  await browser.close();
}

async function capture() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.access(path.join(SITE_ROOT, "index.html"));
  try {
    await captureWithNavigation();
  } catch (error) {
    console.warn("localhost screenshot capture unavailable, using inline fallback mode.");
    await captureWithInlineContent();
  }
}

capture()
  .then(() => {
    console.log("Generated browser screenshots in .preview/");
  })
  .catch((error) => {
    const message = String(error && error.message ? error.message : error);
    if (message.includes("Executable doesn't exist")) {
      console.error("Playwright browser not installed. Run: npx playwright install chromium");
    } else if (message.includes("Permission denied") || message.includes("MachPortRendezvous") || message.includes("bootstrap_check_in")) {
      console.error("Playwright browser launch is blocked by the current sandbox/OS permissions.");
    }
    console.error(error);
    process.exit(1);
  });
