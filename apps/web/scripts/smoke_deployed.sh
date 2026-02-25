#!/usr/bin/env bash
set -euo pipefail

if ! command -v curl >/dev/null 2>&1; then
  echo "ERROR: curl is required for deployed smoke checks."
  exit 1
fi

REDIRECT_ONLY="false"
BASE_URL=""

for arg in "$@"; do
  case "$arg" in
    --redirect-only)
      REDIRECT_ONLY="true"
      ;;
    *)
      if [[ -z "${BASE_URL}" ]]; then
        BASE_URL="$arg"
      else
        echo "ERROR: unexpected argument: $arg"
        echo "Usage: bash scripts/smoke_deployed.sh [https://your-live-host] [--redirect-only]"
        exit 1
      fi
      ;;
  esac
done

if [[ -z "${BASE_URL}" ]]; then
  if [[ "${REDIRECT_ONLY}" == "true" ]]; then
    BASE_URL="https://handoffstudio.com"
  else
    echo "Usage: bash scripts/smoke_deployed.sh https://your-live-host"
    exit 1
  fi
fi

BASE_URL="${BASE_URL%/}"
if [[ ! "${BASE_URL}" =~ ^https?:// ]]; then
  echo "ERROR: URL must start with http:// or https://"
  exit 1
fi

BASE_SCHEME="$(printf '%s' "${BASE_URL}" | sed -E 's#^(https?)://.*$#\1#')"
BASE_HOST="$(printf '%s' "${BASE_URL}" | sed -E 's#^https?://([^/]+).*$#\1#')"
APEX_HOST="${BASE_HOST#www.}"
APEX_BASE="${BASE_SCHEME}://${APEX_HOST}"

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
  local url="${APEX_BASE}${path}"
  local actual
  actual="$(request_status "${url}")"
  if [[ "${actual}" != "${expected}" ]]; then
    echo "FAIL ${url} expected ${expected}, got ${actual}"
    exit 1
  fi
  echo "PASS ${url} -> ${actual}"
}

assert_www_apex_redirect() {
  # Expected behavior:
  # - first hop from www is 301 (preferred) or 308
  # - first-hop Location begins with https://handoffstudio.com/
  # - hard fail if www returns 200 or any non-redirect status
  local source_url="${BASE_SCHEME}://www.${APEX_HOST}/contact"
  local expected_a="${APEX_BASE}/contact"
  local expected_b="${APEX_BASE}/contact/"
  local expected_c="${APEX_BASE}/contact.html"
  local expected_location_prefix="${APEX_BASE}/"
  local first_headers
  local first_status
  local location
  local final_url

  first_headers="$(curl -sSI "${source_url}" | tr -d '\r' || true)"
  first_status="$(printf '%s\n' "${first_headers}" | awk 'toupper($1) ~ /^HTTP\// {print $2; exit}')"
  location="$(printf '%s\n' "${first_headers}" | awk 'BEGIN{IGNORECASE=1} /^location:/ {sub(/^location:[[:space:]]*/,""); print; exit}')"
  final_url="$(curl -sSIL -o /dev/null -w "%{url_effective}" -L "${source_url}")"

  if [[ "${first_status}" != "301" && "${first_status}" != "308" ]]; then
    echo "FAIL www redirect first hop must be 301/308"
    echo "  source: ${source_url}"
    echo "  status: ${first_status:-unknown}"
    echo "  headers:"
    printf '%s\n' "${first_headers}"
    exit 1
  fi
  echo "PASS www redirect status ${first_status}"

  if [[ -z "${location}" ]]; then
    echo "FAIL www redirect missing Location header"
    echo "  source: ${source_url}"
    exit 1
  fi
  if [[ "${location}" != "${expected_location_prefix}"* ]]; then
    echo "FAIL www redirect Location must begin with ${expected_location_prefix}"
    echo "  source:   ${source_url}"
    echo "  location: ${location}"
    exit 1
  fi
  echo "PASS www redirect location prefix: ${location}"

  if [[ "${final_url}" != "${expected_a}" && "${final_url}" != "${expected_b}" && "${final_url}" != "${expected_c}" ]]; then
    echo "FAIL www redirect final URL mismatch"
    echo "  source: ${source_url}"
    echo "  final:  ${final_url}"
    echo "  expect: ${expected_a} (or /contact/, /contact.html)"
    exit 1
  fi
  echo "PASS www redirect final URL apex: ${final_url}"
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

if [[ "${APEX_HOST}" == "handoffstudio.com" ]]; then
  assert_www_apex_redirect
else
  echo "INFO www->apex redirect check skipped for host ${APEX_HOST}"
fi

if [[ "${REDIRECT_ONLY}" == "true" ]]; then
  echo "deployed redirect smoke: ok"
  exit 0
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
