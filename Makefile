# Makefile
.PHONY: build build-wasm build-ts build-copy-html clean \
        clone-submodules install-emsdk setup-emsdk update-emsdk clean-emsdk \
        check-emsdk show-sources help

# Source files
BCLIBC_SRC = lib/bclibc/src
BCLIBC_INCLUDE = lib/bclibc/include
WASM_OUT_DIR = ./build
DIST_DIR = ./dist

# Find all C++ source files
CPP_SOURCES = $(wildcard $(BCLIBC_SRC)/*.cpp)

# Emscripten paths
EMSDK_DIR = ./lib/emsdk
EMSDK_ENV = $(EMSDK_DIR)/emsdk_env.sh

build: build-wasm build-ts build-copy-html


build-wasm: clone-submodules
	@echo "🔨 Building WASM (ESM)..."
	@mkdir -p $(WASM_OUT_DIR)
	@bash -c "source $(EMSDK_ENV) && \
		(command -v emcc >/dev/null 2>&1 && echo '✅ Emscripten is available' || (echo '❌ Emscripten not found!' && exit 1)) && \
		emcc wasm/bindings.cpp $(CPP_SOURCES) -o $(WASM_OUT_DIR)/bclibc.js \
		--bind \
		--post-js wasm/post.js \
		-I$(BCLIBC_INCLUDE) \
		-s MODULARIZE=1 \
		-s EXPORT_ES6=1 \
		-s SINGLE_FILE=1 \
		-s ENVIRONMENT='web,node,worker' \
		--emit-tsd bclibc.d.ts \
		-O3 \
		-s ALLOW_MEMORY_GROWTH=1 \
		-fexceptions \
		-s DISABLE_EXCEPTION_CATCHING=0"
	@echo "✅ ESM WASM built in $(WASM_OUT_DIR)"
	@cp $(WASM_OUT_DIR)/bclibc.d.ts __stubs__/bclibc.d.ts
	@echo "✅ Stub updated: __stubs__/bclibc.d.ts"

build-ts:
	@echo "🔨 Building TypeScript..."
	# yarn tsc
	yarn tsup ./src/index.ts --format esm,cjs --shims --no-splitting --dts
	@echo "✅ TypeScript built!"


build-copy-html:
	@echo "🔨 Copying Example..."
	cp src/index.html dist/


clean:
	rm -rf dist lib
	@echo "🧹 Cleaned!"


# ============================================================================
# Submodules Setup
# ============================================================================

clone-submodules:
	@echo "📂 Checking submodules..."
	@if [ ! -f "$(BCLIBC_SRC)/main.cpp" ]; then \
		echo "📥 Cloning/Updating submodules (bclibc)..."; \
		git submodule update --init --recursive; \
		echo "✅ Submodules ready!"; \
	else \
		echo "✅ Submodules already present."; \
	fi

# ============================================================================
# Emscripten Setup
# ============================================================================

install-emsdk:
	@echo "📦 Installing Emscripten SDK..."
	@if [ -d "$(EMSDK_DIR)" ]; then \
		echo "⚠️  Emscripten SDK already exists at $(EMSDK_DIR)"; \
		echo "   Run 'make clean-emsdk' first if you want to reinstall"; \
	else \
		git clone https://github.com/emscripten-core/emsdk.git $(EMSDK_DIR); \
		cd $(EMSDK_DIR) && ./emsdk install latest; \
		cd $(EMSDK_DIR) && ./emsdk activate latest; \
		echo ""; \
		echo "✅ Emscripten SDK installed!"; \
		echo ""; \
		echo "To activate Emscripten, run:"; \
		echo "  source $(EMSDK_DIR)/emsdk_env.sh"; \
		echo ""; \
		echo "Or add this to your ~/.bashrc or ~/.zshrc:"; \
		echo "  source $(PWD)/$(EMSDK_DIR)/emsdk_env.sh"; \
	fi

setup-emsdk: install-emsdk
	@echo ""
	@echo "🔧 Emscripten Setup Instructions:"
	@echo ""
	@echo "1. Activate Emscripten in your current shell:"
	@echo "   source $(EMSDK_DIR)/emsdk_env.sh"
	@echo ""
	@echo "2. Verify installation:"
	@echo "   emcc --version"
	@echo ""
	@echo "3. (Optional) Add to your shell config for permanent activation:"
	@echo "   echo 'source $(PWD)/$(EMSDK_DIR)/emsdk_env.sh' >> ~/.bashrc"
	@echo "   # or for zsh:"
	@echo "   echo 'source $(PWD)/$(EMSDK_DIR)/emsdk_env.sh' >> ~/.zshrc"
	@echo ""
	@echo "4. Build the project:"
	@echo "   make build"
	@echo ""

update-emsdk:
	@echo "🔄 Оновлення Emscripten SDK..."
	@if [ -d "$(EMSDK_DIR)" ]; then \
		cd $(EMSDK_DIR) && \
		git fetch origin && \
		git checkout main || git checkout master && \
		git pull origin main || git pull origin master && \
		./emsdk install latest && \
		./emsdk activate latest && \
		echo "✅ Emscripten оновлено до останньої версії!"; \
	else \
		echo "❌ EMSDK не знайдено в $(EMSDK_DIR). Спробуйте 'make install-emsdk'"; \
	fi

clean-emsdk:
	@echo "🗑️  Removing Emscripten SDK..."
	rm -rf $(EMSDK_DIR)
	@echo "✅ Emscripten SDK removed!"

# Check if emcc is available
check-emsdk:
	@command -v emcc >/dev/null 2>&1 || { \
		echo "❌ Emscripten not found!"; \
		echo ""; \
		echo "Run 'make install-emsdk' to install, then:"; \
		echo "  source $(EMSDK_DIR)/emsdk_env.sh"; \
		echo ""; \
		exit 1; \
	}
	@echo "✅ Emscripten is available: $$(emcc --version | head -1)"

# Debug: показати які файли будуть скомпільовані
show-sources:
	@echo "C++ source files:"
	@echo $(CPP_SOURCES)

# Show all available commands
help:
	@echo "Available commands:"
	@echo ""
	@echo "  make build              - Build everything (WASM + TypeScript)"
	@echo "  make build-wasm         - Build only WASM"
	@echo "  make build-ts           - Build only TypeScript"
	@echo "  make test-wasm          - Run all WASM tests"
	@echo "  make test-wasm-vector   - Run vector tests only"
	@echo "  make test-wasm-interp   - Run interpolation tests only"
	@echo "  make clean              - Clean build artifacts"
	@echo ""
	@echo "Emscripten setup:"
	@echo "  make install-emsdk      - Install Emscripten SDK"
	@echo "  make setup-emsdk        - Show setup instructions"
	@echo "  make check-emsdk        - Check if Emscripten is available"
	@echo "  make clean-emsdk        - Remove Emscripten SDK"
	@echo ""
	@echo "Debug:"
	@echo "  make show-sources       - Show C++ source files"
	@echo "  make help               - Show this help message"
