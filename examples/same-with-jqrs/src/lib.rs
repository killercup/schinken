extern crate wasm_bindgen;
extern crate web_sys;
extern crate jqrs;

use wasm_bindgen::prelude::*;
use jqrs::s;
use web_sys::{HtmlElement};

#[wasm_bindgen]
pub fn run() -> Result<(), JsValue> {
    if let Ok(headline) = s().first::<HtmlElement>("h1") {
        headline.set_inner_text(&format!("{} yOu WaS hAcCkd", headline.inner_text()));
    }

    if let Ok(text) = s().first::<HtmlElement>("p strong") {
        text.set_inner_text("disturbing");
    }

    Ok(())
}
