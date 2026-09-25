# Makefile
.PHONY: build build-wasm build-ts build-copy-html clean clone-submodules help

WASM_OUT_DIR = ./build
DIST_DIR = ./dist

# wasi-sdk (https://github.com/WebAssembly/wasi-sdk/releases, 34 tested): the compiler of bclibc's bare WebAssembly
# module. Pass it: `make build WASI_SDK_PATH=/opt/wasi-sdk-34.0` (or export it).
WASI_SDK_PATH ?=
BCLIBC_WASM = lib/bclibc/build/wasm/bclibc_wasm.wasm

build: build-wasm build-ts build-copy-html


# bclibc's flat C ABI as one WebAssembly module that imports nothing, embedded in
# build/bclibc.js as base64: the library stays one file for a bundler. Its C++ exceptions use WebAssembly's final
# exception encoding, so the module needs a runtime that has it (Node 24+, recent browsers).
build-wasm: clone-submodules
	@test -n "$(WASI_SDK_PATH)" || { echo "❌ set WASI_SDK_PATH=/path/to/wasi-sdk (https://github.com/WebAssembly/wasi-sdk/releases)"; exit 1; }
	@echo "🔨 Building WASM (bare module, wasi-sdk)..."
	$(MAKE) -C lib/bclibc wasm WASI_SDK_PATH=$(abspath $(WASI_SDK_PATH))
	@mkdir -p $(WASM_OUT_DIR)
	node scripts/embed-wasm.mjs $(BCLIBC_WASM) $(WASM_OUT_DIR)/bclibc.js
	@echo "✅ WASM built in $(WASM_OUT_DIR)"

build-ts:
	@echo "🔨 Building TypeScript..."
	# yarn tsc
	yarn tsup ./src/index.ts --format esm,cjs --shims --no-splitting --dts
	@echo "✅ TypeScript built!"


build-copy-html:
	@echo "🔨 Copying Example..."
	cp src/index.html dist/


clean:
	rm -rf dist build
	@echo "🧹 Cleaned!"


# ============================================================================
# Submodules Setup
# ============================================================================

clone-submodules:
	@echo "📂 Checking submodules..."
	@if [ ! -e "lib/bclibc/.git" ]; then \
		echo "📥 Cloning/Updating submodules (bclibc)..."; \
		git submodule update --init --recursive; \
		echo "✅ Submodules ready!"; \
	else \
		echo "✅ Submodules already present."; \
	fi

# Show all available commands
help:
	@echo "Available commands:"
	@echo ""
	@echo "  make build WASI_SDK_PATH=...  - Build everything (WASM + TypeScript)"
	@echo "  make build-wasm               - Build only WASM (needs WASI_SDK_PATH)"
	@echo "  make build-ts                 - Build only TypeScript"
	@echo "  make clean                    - Clean build artifacts"
	@echo "  make help                     - Show this help message"
