extern crate jqrs;
extern crate wasm_bindgen;
extern crate web_sys;

use jqrs::s;
use wasm_bindgen::prelude::*;
use web_sys::HtmlElement;

#[wasm_bindgen]
pub fn run() -> Result<(), JsValue> {
    if let Ok(headline) = s().first::<HtmlElement>("h1") {
        headline.set_inner_text(&format!("{} yOu WaS hAcCkd", headline.inner_text()));
    }

    if let Ok(text) = s().first::<HtmlElement>("p strong") {
        text.set_inner_text("disturbing");
    }

    if let Ok(elems) = s().find::<HtmlElement>("p em") {
        for elem in &elems {
            elem.set_inner_text("IT'S ALL ON FIRE");
        }
    }

    Ok(())
}
