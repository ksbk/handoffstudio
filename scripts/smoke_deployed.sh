#!/usr/bin/env bash
set -euo pipefail

if ! command -v curl >/dev/null 2>&1; then
  echo "ERROR: curl is required for deployed smoke checks."
  exit 1
fi

BASE_URL="${1:-}"
if [[ -z "${BASE_URL}" ]]; then
  echo "Usage: bash scripts/smoke_deployed.sh https://your-live-host"
  exit 1
fi

BASE_URL="${BASE_URL%/}"
if [[ ! "${BASE_URL}" =~ ^https?:// ]]; then
  echo "ERROR: URL must start with http:// or https://"
  exit 1
fi

TMP_HEADERS="$(mktemp)"
trap 'rm -f "$TMP_HEADERS"' EXIT

need() {
  local pattern="$1"
  local label="$2"
  if ! grep -Eiq "$pattern" "$TMP_HEADERS"; then
    echo "FAIL missing/invalid: ${label}"
    echo "--- final response headers ---"
    cat "$TMP_HEADERS"
    exit 1
  fi
  echo "PASS ${label}"
}

request_status() {
  local url="$1"
  curl -sS -L -o /dev/null -w "%{http_code}" "${url}"
}

assert_status() {
  local path="$1"
  local expected="$2"
  local url="${BASE_URL}${path}"
  local actual
  actual="$(request_status "${url}")"
  if [[ "${actual}" != "${expected}" ]]; then
    echo "FAIL ${url} expected ${expected}, got ${actual}"
    exit 1
  fi
  echo "PASS ${url} -> ${actual}"
}

# Follow redirects and capture all header blocks; validate against the final block.
HEADER_CHAIN="$(curl -sSIL "${BASE_URL}/" | tr -d '\r')"
printf '%s\n' "${HEADER_CHAIN}" | awk 'BEGIN{RS=""; ORS=""} {last=$0} END{print last}' > "$TMP_HEADERS"

echo "INFO redirect/status chain:"
printf '%s\n' "${HEADER_CHAIN}" | grep -Ei '^HTTP/[0-9.]+ [0-9]{3}' || true

need '^x-frame-options:[[:space:]]*deny' "X-Frame-Options: DENY"
need '^content-security-policy:.*frame-ancestors[[:space:]]+'\''none'\''' "CSP frame-ancestors 'none'"
need '^x-content-type-options:[[:space:]]*nosniff' "X-Content-Type-Options: nosniff"
need '^referrer-policy:[[:space:]]*strict-origin-when-cross-origin' "Referrer-Policy: strict-origin-when-cross-origin"
need '^permissions-policy:' "Permissions-Policy present"

if [[ "${BASE_URL}" =~ ^https:// ]]; then
  need '^strict-transport-security:' "Strict-Transport-Security present"
else
  echo "WARN HTTP endpoint used; HSTS check skipped"
fi

assert_status "/" "200"
assert_status "/index.html" "200"
assert_status "/services.html" "200"
assert_status "/process.html" "200"
assert_status "/contact.html" "200"
assert_status "/file-sharing.html" "200"
assert_status "/sample-delivery.html" "200"
assert_status "/terms.html" "200"
assert_status "/social-preview.png" "200"
assert_status "/__qa_404_probe__" "404"

echo "deployed smoke: ok"
