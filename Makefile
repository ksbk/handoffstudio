SHELL := /bin/bash

WEB_DIR := apps/web

.PHONY: help build check test tree clean clean-all web-build web-check web-test web-tree web-clean web-clean-all

help:
	@echo "Available targets:"
	@echo "  make build      Build static site in $(WEB_DIR)/dist"
	@echo "  make check      Run web quality checks"
	@echo "  make test       Run web smoke tests"
	@echo "  make tree       Print filtered monorepo root tree"
	@echo "  make clean      Remove generated web artifacts"
	@echo "  make clean-all  Remove generated artifacts and dependencies in web app"

build: web-build
check: web-check
test: web-test
clean: web-clean
clean-all: web-clean-all

tree:
	@if command -v tree >/dev/null 2>&1; then \
		tree -a -L 2 -I '.git|.mypy_cache|.pytest_cache|node_modules|dist|.preview|apps/web/node_modules|apps/web/dist' .; \
	else \
		find . -path './.git' -prune -o -path './.mypy_cache' -prune -o -path './.pytest_cache' -prune -o -path './node_modules' -prune -o -path './dist' -prune -o -path './.preview' -prune -o -path './apps/web/node_modules' -prune -o -path './apps/web/dist' -prune -o -print; \
	fi

web-build:
	@npm --prefix $(WEB_DIR) run build

web-check:
	@$(MAKE) --no-print-directory -C $(WEB_DIR) check

web-test:
	@$(MAKE) --no-print-directory -C $(WEB_DIR) test

web-tree:
	@$(MAKE) --no-print-directory -C $(WEB_DIR) tree

web-clean:
	@$(MAKE) --no-print-directory -C $(WEB_DIR) clean

web-clean-all:
	@$(MAKE) --no-print-directory -C $(WEB_DIR) clean-all
