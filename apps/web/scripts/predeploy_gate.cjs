#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");

function run(cmd, args) {
  const result = spawnSync(cmd, args, {
    cwd: ROOT,
    stdio: "inherit",
    env: process.env
  });
  if (result.status !== 0) {
    throw new Error(`Command failed: ${cmd} ${args.join(" ")}`);
  }
}

function assertDistHeaders() {
  const headersPath = path.join(ROOT, "dist", "_headers");
  if (!fs.existsSync(headersPath)) {
    throw new Error("Missing dist/_headers after build. Refusing predeploy ship gate.");
  }
  console.log("PASS dist/_headers present");
}

function assertDistRedirects() {
  const redirectsPath = path.join(ROOT, "dist", "_redirects");
  if (!fs.existsSync(redirectsPath)) {
    throw new Error("Missing dist/_redirects after build. Refusing predeploy ship gate.");
  }
  console.log("PASS dist/_redirects present");
}

function main() {
  run("npm", ["run", "build"]);
  assertDistHeaders();
  assertDistRedirects();
  run("npm", ["run", "test:e2e"]);
  run("npm", ["run", "test:e2e"]);
  console.log("predeploy gate: ok");
}

main();
