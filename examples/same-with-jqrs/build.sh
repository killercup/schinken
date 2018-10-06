#!/bin/sh

# For more comments about what's going on here, see the `hello_world` example

set -ex

cargo +nightly build --target wasm32-unknown-unknown
wasm-bindgen ../../target/wasm32-unknown-unknown/debug/same_with_jqrs.wasm --out-dir .
npm install
npm run serve
