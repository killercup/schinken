extern crate wasm_bindgen;
extern crate web_sys;

use wasm_bindgen::{prelude::*, JsCast};
use web_sys::{Document, HtmlElement};

// Called by our JS entry point to run the example
#[wasm_bindgen]
pub fn run() -> Result<(), JsValue> {
    // Use `web_sys`'s global `window` function to get a handle on the global
    // window object.
    let window = web_sys::window().expect("no global `window` exists");
    let document = window.document().expect("should have a document on window");

    adjust_headline(&document);
    adjust_text(&document);

    Ok(())
}

fn adjust_headline(document: &Document) -> Result<(), JsValue> {
    let headline = document
        .get_elements_by_tag_name("h1")
        .get_with_index(0)
        .ok_or(JsValue::NULL)?
        .dyn_into::<HtmlElement>()
        .map_err(|_| JsValue::NULL)?;

    headline.set_inner_text(&format!("{} yOu WaS hAcCkd", headline.inner_text()));

    Ok(())
}

fn adjust_text(document: &Document) -> Result<(), JsValue> {
    let text = document
        .get_elements_by_tag_name("p")
        .get_with_index(0)
        .ok_or(JsValue::NULL)?
        .query_selector("strong")
        .map_err(|_| JsValue::NULL)?
        .ok_or(JsValue::NULL)?
        .dyn_into::<web_sys::HtmlElement>()
        .map_err(|_| JsValue::NULL)?
        .set_inner_text("disturbing");

    Ok(())
}
