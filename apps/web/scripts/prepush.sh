#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
WEB_DIR="${ROOT_DIR}/apps/web"

cd "${ROOT_DIR}"
make check

cd "${WEB_DIR}"
npm run build

echo "prepush checks: ok"
