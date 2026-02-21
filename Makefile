SHELL := /bin/bash

PORT ?= 8080
ROOT ?= .
PAGES := index.html services.html process.html contact.html file-sharing.html sample-delivery.html terms.html 404.html
SHELL_PAGES := services.html process.html contact.html file-sharing.html sample-delivery.html terms.html 404.html

.PHONY: help serve check test check-shell check-seo check-host check-links check-style check-placeholders check-security tree previews clean clean-preview

help:
	@echo "Available targets:"
	@echo "  make serve            Start local static server (PORT=$(PORT))"
	@echo "  make check            Validate JS/JSON + shell drift + SEO + host/link/security consistency"
	@echo "  make test             Run page smoke tests"
	@echo "  make tree             Print repository tree"
	@echo "  make previews         Generate browser screenshots into .preview/"
	@echo "  make clean            Remove generated artifacts"
	@echo "  make clean-preview    Remove generated preview images"

serve:
	python3 -m http.server $(PORT) --directory $(ROOT)

check:
	node --check app.js
	python3 -m json.tool site-config.json >/dev/null
	@$(MAKE) --no-print-directory check-shell
	@$(MAKE) --no-print-directory check-seo
	@$(MAKE) --no-print-directory check-host
	@$(MAKE) --no-print-directory check-links
	@$(MAKE) --no-print-directory check-style
	@$(MAKE) --no-print-directory check-placeholders
	@$(MAKE) --no-print-directory check-security
	@$(MAKE) --no-print-directory test
	@echo "checks: ok"

test:
	@python3 scripts/smoke_test_site.py

check-shell:
	@for page in $(SHELL_PAGES); do \
		diff -u <(sed -n '/<!-- HEADER START -->/,/<!-- HEADER END -->/p' index.html) <(sed -n '/<!-- HEADER START -->/,/<!-- HEADER END -->/p' $$page) >/dev/null || { \
			echo "header drift detected in $$page"; exit 1; \
		}; \
		diff -u <(sed -n '/<!-- FOOTER START -->/,/<!-- FOOTER END -->/p' index.html) <(sed -n '/<!-- FOOTER START -->/,/<!-- FOOTER END -->/p' $$page) >/dev/null || { \
			echo "footer drift detected in $$page"; exit 1; \
		}; \
	done

check-seo:
	@for page in $(PAGES); do \
		rg -q '<title>.*</title>' $$page || { echo "missing <title> in $$page"; exit 1; }; \
		rg -q 'meta name=\"description\"' $$page || { echo "missing meta description in $$page"; exit 1; }; \
		rg -q 'meta name=\"theme-color\"' $$page || { echo "missing theme-color in $$page"; exit 1; }; \
		rg -q 'meta name=\"color-scheme\"' $$page || { echo "missing color-scheme in $$page"; exit 1; }; \
		rg -q 'meta name=\"robots\"' $$page || { echo "missing robots meta in $$page"; exit 1; }; \
		rg -q 'rel=\"canonical\"' $$page || { echo "missing canonical tag in $$page"; exit 1; }; \
		rg -q 'meta property=\"og:url\"' $$page || { echo "missing og:url in $$page"; exit 1; }; \
		rg -q 'meta property=\"og:title\"' $$page || { echo "missing og:title in $$page"; exit 1; }; \
		rg -q 'meta property=\"og:description\"' $$page || { echo "missing og:description in $$page"; exit 1; }; \
		rg -q 'meta property=\"og:image\"' $$page || { echo "missing og:image in $$page"; exit 1; }; \
		rg -q 'meta name=\"twitter:card\"' $$page || { echo "missing twitter:card in $$page"; exit 1; }; \
		rg -q 'meta name=\"twitter:title\"' $$page || { echo "missing twitter:title in $$page"; exit 1; }; \
		rg -q 'meta name=\"twitter:description\"' $$page || { echo "missing twitter:description in $$page"; exit 1; }; \
			rg -q 'meta name=\"twitter:image\"' $$page || { echo "missing twitter:image in $$page"; exit 1; }; \
			rg -q 'Content-Security-Policy' $$page || { echo "missing CSP meta in $$page"; exit 1; }; \
			rg -q 'meta name=\"referrer\"' $$page || { echo "missing referrer meta in $$page"; exit 1; }; \
			rg -q 'rel=\"icon\"' $$page || { echo "missing favicon link in $$page"; exit 1; }; \
			rg -q 'rel=\"manifest\"' $$page || { echo "missing manifest link in $$page"; exit 1; }; \
		done
	@titles=$$(for page in $(PAGES); do sed -n 's|.*<title>\\(.*\\)</title>.*|\\1|p' $$page; done); \
	total=$$(echo "$$titles" | sed '/^$$/d' | wc -l | tr -d ' '); \
	unique=$$(echo "$$titles" | sed '/^$$/d' | sort | uniq | wc -l | tr -d ' '); \
	if [ "$$total" -ne "$$unique" ]; then \
		echo "duplicate <title> values detected"; \
		exit 1; \
	fi
	@descriptions=$$(for page in $(PAGES); do sed -n 's|.*meta name=\"description\" content=\"\\([^\"]*\\)\".*|\\1|p' $$page; done); \
	total_desc=$$(echo "$$descriptions" | sed '/^$$/d' | wc -l | tr -d ' '); \
	unique_desc=$$(echo "$$descriptions" | sed '/^$$/d' | sort | uniq | wc -l | tr -d ' '); \
	if [ "$$total_desc" -ne "$$unique_desc" ]; then \
		echo "duplicate meta descriptions detected"; \
		exit 1; \
	fi

check-host:
	@python3 scripts/check_host_consistency.py

check-links:
	@python3 scripts/check_internal_links.py

check-style:
	@python3 scripts/check_style_integrity.py

check-placeholders:
	@python3 scripts/check_no_placeholders.py

check-security:
	@python3 scripts/check_security_hygiene.py
	@test -f _headers || { echo "missing Cloudflare _headers file"; exit 1; }
	@rg -q "Content-Security-Policy:" _headers || { echo "missing CSP in _headers"; exit 1; }
	@rg -q "frame-ancestors 'none'" _headers || { echo "missing frame-ancestors clickjacking policy in _headers"; exit 1; }
	@rg -q "Strict-Transport-Security:" _headers || { echo "missing Strict-Transport-Security in _headers"; exit 1; }
	@rg -q "Referrer-Policy:" _headers || { echo "missing Referrer-Policy in _headers"; exit 1; }
	@rg -q "Permissions-Policy:" _headers || { echo "missing Permissions-Policy in _headers"; exit 1; }
	@rg -q "X-Content-Type-Options:" _headers || { echo "missing X-Content-Type-Options in _headers"; exit 1; }
	@rg -q "X-Frame-Options:" _headers || { echo "missing X-Frame-Options in _headers"; exit 1; }

tree:
	@if command -v tree >/dev/null 2>&1; then \
		tree -a .; \
	else \
		find . -print; \
	fi

previews:
	@mkdir -p .preview
	@npm run --silent screenshots
	@echo "Generated browser screenshots in .preview/"


clean:
	@rm -rf .preview
	@echo "Removed generated artifacts."

clean-preview:
	@rm -f .preview/*.png
	@echo "Removed preview images."
