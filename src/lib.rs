extern crate wasm_bindgen;
extern crate web_sys;

use wasm_bindgen::{JsCast, JsValue};

pub fn s() -> Query {
    let window = web_sys::window().expect("no global `window` exists");
    let document = window.document().expect("should have a document on window");
    Query::Document(document)
}

pub enum Query {
    Document(web_sys::Document),
}

macro_rules! error_message {
    ($($token:tt)*) => {
        if cfg!(debug_assertions) {
            JsValue::from_str(&format!($($token)*))
        } else {
            JsValue::NULL
        }
    };
}

impl Query {
    pub fn find<T: JsCast>(&self, selector: &str) -> Result<Vec<T>, JsValue> {
        let node_list: web_sys::NodeList = match self {
            Query::Document(d) => d.query_selector_all(selector),
        }
        .map_err(|_| error_message!("invalid selector:`{}`", selector))?;

        let mut res = Vec::with_capacity(node_list.length() as usize);
        for i in 0..(node_list.length()) {
            if let Some(node) = node_list.get(i) {
                res.push(
                    node.dyn_into::<T>().map_err(|node| {
                        error_message!("cannot cast `{:?}` into given type", node)
                    })?,
                );
            }
        }
        Ok(res)
    }

    pub fn first<T: JsCast>(&self, selector: &str) -> Result<T, JsValue> {
        match self {
            Query::Document(d) => d.query_selector(selector),
        }
        .map_err(|_| error_message!("invalid selector:`{}`", selector))?
        .ok_or_else(|| error_message!("no element found for selector `{}`", selector))?
        .dyn_into::<T>()
        .map_err(|elem| error_message!("cannot cast `{}` into given type", elem.tag_name()))
    }
}
