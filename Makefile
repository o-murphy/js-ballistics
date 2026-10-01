# Makefile
.PHONY: build build-wasm build-ts build-copy-html clean clone-submodules help

WASM_OUT_DIR = ./build
DIST_DIR = ./dist

# bclibc's bare WebAssembly module (imports nothing; the core never throws, so it is built without C++ exceptions and
# runs on any WebAssembly host). Two toolchains build it:
#   zig (default, ~84 KB):  `uv run --with ziglang make build` (the ziglang package), or zig on PATH / ZIG=/path/to/zig
#   wasi-sdk (~1 MB):       `make build WASM_TOOLCHAIN=wasi-sdk WASI_SDK_PATH=/opt/wasi-sdk-34.0` (34 tested)
WASM_TOOLCHAIN ?= zig
ZIG ?=
WASI_SDK_PATH ?=

ifeq ($(WASM_TOOLCHAIN),zig)
BCLIBC_WASM = lib/bclibc/build/wasm-zig/bclibc_wasm.wasm
else
BCLIBC_WASM = lib/bclibc/build/wasm/bclibc_wasm.wasm
endif

build: build-wasm build-ts


# bclibc's flat C ABI as one WebAssembly module, embedded in build/bclibc.js as base64: the library stays one file
# for a bundler.
build-wasm: clone-submodules
	@echo "🔨 Building WASM (bare module, $(WASM_TOOLCHAIN))..."
ifeq ($(WASM_TOOLCHAIN),zig)
	$(MAKE) -C lib/bclibc wasm-zig $(if $(ZIG),ZIG=$(ZIG))
else
	@test -n "$(WASI_SDK_PATH)" || { echo "❌ set WASI_SDK_PATH=/path/to/wasi-sdk (https://github.com/WebAssembly/wasi-sdk/releases)"; exit 1; }
	$(MAKE) -C lib/bclibc wasm WASI_SDK_PATH=$(abspath $(WASI_SDK_PATH))
endif
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
	@echo "  make build                    - Build everything (WASM with zig + TypeScript)"
	@echo "  make build-wasm               - Build only WASM (WASM_TOOLCHAIN=zig|wasi-sdk, WASI_SDK_PATH=...)"
	@echo "  make build-ts                 - Build only TypeScript"
	@echo "  make clean                    - Clean build artifacts"
	@echo "  make help                     - Show this help message"
