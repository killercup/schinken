#!/bin/sh

# For more comments about what's going on here, see the `hello_world` example

set -ex

cargo +nightly build --target wasm32-unknown-unknown
wasm-bindgen ../../target/wasm32-unknown-unknown/debug/raw_web_sys.wasm --out-dir .
npm install
npm run serve
