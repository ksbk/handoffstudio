#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SRC_PAGES_DIR = path.join(ROOT, "src", "pages");
const CONFIG_PATH = path.join(ROOT, "src", "site-config.json");
const PUBLIC_DIR = path.join(ROOT, "public");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function trimTrailingSlash(url) {
  return String(url || "").replace(/\/+$/, "");
}

function ensureAbsoluteUrl(candidate, baseUrl) {
  if (typeof candidate !== "string" || !candidate.trim()) {
    return "";
  }

  const value = candidate.trim();
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  if (value.startsWith("/")) {
    return trimTrailingSlash(baseUrl) + value;
  }

  return trimTrailingSlash(baseUrl) + "/" + value.replace(/^\/+/, "");
}

function canonicalForPath(pagePath, baseUrl) {
  if (pagePath === "index.html") {
    return trimTrailingSlash(baseUrl) + "/";
  }
  return trimTrailingSlash(baseUrl) + "/" + String(pagePath).replace(/^\/+/, "");
}

function replaceOrFail(content, regex, replacement, filePath, label) {
  if (!regex.test(content)) {
    throw new Error(`missing ${label} in ${path.relative(ROOT, filePath)}`);
  }
  return content.replace(regex, replacement);
}

function setMeta(content, attr, key, value, filePath) {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(
    `<meta\\s+${attr}="${escapedKey}"\\s+content="[^"]*"\\s*/?>`,
    "i"
  );
  const replacement = `<meta ${attr}="${key}" content="${value}">`;
  return replaceOrFail(
    content,
    regex,
    replacement,
    filePath,
    `${attr}=${key}`
  );
}

function syncHtmlPages(config) {
  const pages = config.pages || {};
  const baseUrl = trimTrailingSlash(config.site && config.site.baseUrl);
  const socialImage = ensureAbsoluteUrl(
    (config.site && config.site.socialImage) || "/social-preview.png",
    baseUrl
  );
  const brandName = String((config.brand && config.brand.name) || "").trim();
  const email = String(
    (config.brand && config.brand.email) ||
      (config.intake && config.intake.emailTo) ||
      ""
  ).trim();
  const intakeEmail = String((config.intake && config.intake.emailTo) || email).trim();
  const defaultSubject = (brandName || "Handoff Studio") + " request";
  const intakeSubject = String(
    (config.intake && config.intake.emailSubject) || defaultSubject
  ).trim();
  const intakeMailtoFallback = intakeEmail
    ? `mailto:${intakeEmail}?subject=${encodeURIComponent(intakeSubject)}`
    : "";

  if (!baseUrl) {
    throw new Error("site.baseUrl is required in site-config.json");
  }

  const pageEntries = Object.values(pages).filter(function (page) {
    return page && typeof page.path === "string" && page.path.endsWith(".html");
  });

  pageEntries.forEach(function (page) {
    const filePath = path.join(SRC_PAGES_DIR, page.path);
    if (!fs.existsSync(filePath)) {
      return;
    }

    const canonical =
      ensureAbsoluteUrl(page.canonical || "", baseUrl) ||
      canonicalForPath(page.path, baseUrl);
    const title = String(page.title || "").trim();
    const description = String(page.description || "").trim();
    const ogTitle = String(page.ogTitle || title).trim();
    const ogDescription = String(page.ogDescription || description).trim();

    let html = fs.readFileSync(filePath, "utf8");

    if (title) {
      html = replaceOrFail(
        html,
        /<title>[\s\S]*?<\/title>/i,
        `<title>${title}</title>`,
        filePath,
        "title"
      );
    }
    if (description) {
      html = setMeta(html, "name", "description", description, filePath);
    }

    html = replaceOrFail(
      html,
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
      `<link rel="canonical" href="${canonical}">`,
      filePath,
      "canonical"
    );
    html = setMeta(html, "property", "og:url", canonical, filePath);

    if (ogTitle) {
      html = setMeta(html, "property", "og:title", ogTitle, filePath);
      html = setMeta(html, "name", "twitter:title", ogTitle, filePath);
    }
    if (ogDescription) {
      html = setMeta(
        html,
        "property",
        "og:description",
        ogDescription,
        filePath
      );
      html = setMeta(
        html,
        "name",
        "twitter:description",
        ogDescription,
        filePath
      );
    }

    html = setMeta(html, "property", "og:image", socialImage, filePath);
    html = setMeta(html, "name", "twitter:image", socialImage, filePath);

    if (brandName) {
      html = setMeta(html, "property", "og:site_name", brandName, filePath);
    }

    if (page.path === "index.html") {
      if (email) {
        html = html.replace(
          /"email"\s*:\s*"[^"]*"/,
          `"email": "${email}"`
        );
      }
      html = html.replace(/"url"\s*:\s*"[^"]*"/, `"url": "${canonical}"`);
    }

    if (email) {
      html = html.replace(
        /(<span[^>]*data-email[^>]*>)[^<]*(<\/span>)/gi,
        `$1${email}$2`
      );
      html = html.replace(
        /(<a[^>]*data-email-link[^>]*href=")mailto:[^"]*(")/gi,
        `$1mailto:${email}$2`
      );
      html = html.replace(
        /(<a[^>]*href=")mailto:[^"]*("(?=[^>]*data-email-link)[^>]*>)/gi,
        `$1mailto:${email}$2`
      );
    }

    if (intakeMailtoFallback) {
      html = html.replace(
        /(<a[^>]*data-intake-link[^>]*href=")mailto:[^"]*(")/gi,
        `$1${intakeMailtoFallback}$2`
      );
      html = html.replace(
        /(<a[^>]*href=")mailto:[^"]*("(?=[^>]*data-intake-link)[^>]*>)/gi,
        `$1${intakeMailtoFallback}$2`
      );
    }

    fs.writeFileSync(filePath, html, "utf8");
  });
}

function syncSitemap(config) {
  const baseUrl = trimTrailingSlash(config.site && config.site.baseUrl);
  const pages = config.pages || {};

  const entries = Object.values(pages).filter(function (page) {
    if (!page || typeof page.path !== "string" || !page.path.endsWith(".html")) {
      return false;
    }
    return page.path !== "404.html";
  });

  const urls = entries.map(function (page) {
    return (
      ensureAbsoluteUrl(page.canonical || "", baseUrl) ||
      canonicalForPath(page.path, baseUrl)
    );
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(function (loc) {
      return `  <url>\n    <loc>${loc}</loc>\n  </url>`;
    }),
    "</urlset>",
    ""
  ].join("\n");

  fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap.xml"), xml, "utf8");
}

function syncRobots(config) {
  const baseUrl = trimTrailingSlash(config.site && config.site.baseUrl);
  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`;
  fs.writeFileSync(path.join(PUBLIC_DIR, "robots.txt"), robots, "utf8");
}

function main() {
  const config = readJson(CONFIG_PATH);
  syncHtmlPages(config);
  syncSitemap(config);
  syncRobots(config);
  console.log("seo sync: ok");
}

main();
