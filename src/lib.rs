extern crate web_sys;
extern crate wasm_bindgen;

use wasm_bindgen::{JsCast, JsValue};

pub fn s() -> Query {
    let window = web_sys::window().expect("no global `window` exists");
    let document = window.document().expect("should have a document on window");
    Query::Document(document)
}

pub enum Query {
    Document(web_sys::Document),
}

impl Query {
    pub fn first<T: JsCast>(&self, selector: &str) -> Result<T, JsValue> {
        match self {
            Query::Document(d) => d.query_selector(selector)
        }
            .map_err(|_| JsValue::from_str("invalid selector"))?
            .ok_or_else(|| JsValue::from_str("no element found"))?
            .dyn_into::<T>().map_err(|_| JsValue::from_str("could not cast element"))
    }
}
