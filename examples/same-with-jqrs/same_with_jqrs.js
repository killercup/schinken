/* tslint:disable */
import * as wasm from './same_with_jqrs_bg';

/**
* @returns {void}
*/
export function run() {
    return wasm.run();
}

const __widl_f_query_selector_Document_target = Document.prototype.querySelector || function() {
    throw new Error(`wasm-bindgen: Document.prototype.querySelector does not exist`);
};

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
}

const slab = [{ obj: undefined }, { obj: null }, { obj: true }, { obj: false }];

let slab_next = slab.length;

function addHeapObject(obj) {
    if (slab_next === slab.length) slab.push(slab.length + 1);
    const idx = slab_next;
    const next = slab[idx];

    slab_next = next;

    slab[idx] = { obj, cnt: 1 };
    return idx << 1;
}

const stack = [];

function getObject(idx) {
    if ((idx & 1) === 1) {
        return stack[idx >> 1];
    } else {
        const val = slab[idx >> 1];

        return val.obj;

    }
}

const lTextDecoder = typeof TextDecoder === 'undefined' ? require('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

export function __widl_f_query_selector_Document(arg0, arg1, arg2, exnptr) {
    let varg1 = getStringFromWasm(arg1, arg2);
    try {

        const val = __widl_f_query_selector_Document_target.call(getObject(arg0), varg1);
        return isLikeNone(val) ? 0 : addHeapObject(val);

    } catch (e) {
        const view = getUint32Memory();
        view[exnptr / 4] = 1;
        view[exnptr / 4 + 1] = addHeapObject(e);

    }
}

export function __widl_instanceof_HTMLElement(idx) {
    return getObject(idx) instanceof HTMLElement ? 1 : 0;
}

function GetOwnOrInheritedPropertyDescriptor(obj, id) {
    while (obj) {
        let desc = Object.getOwnPropertyDescriptor(obj, id);
        if (desc) return desc;
        obj = Object.getPrototypeOf(obj);
    }
    throw new Error(`descriptor for id='${id}' not found`);
}

const __widl_f_inner_text_HTMLElement_target = GetOwnOrInheritedPropertyDescriptor(HTMLElement.prototype, 'innerText').get || function() {
    throw new Error(`wasm-bindgen: GetOwnOrInheritedPropertyDescriptor(HTMLElement.prototype, 'innerText').get does not exist`);
};

const lTextEncoder = typeof TextEncoder === 'undefined' ? require('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

function passStringToWasm(arg) {

    const buf = cachedTextEncoder.encode(arg);
    const ptr = wasm.__wbindgen_malloc(buf.length);
    getUint8Memory().set(buf, ptr);
    return [ptr, buf.length];
}

export function __widl_f_inner_text_HTMLElement(ret, arg0) {

    const [retptr, retlen] = passStringToWasm(__widl_f_inner_text_HTMLElement_target.call(getObject(arg0)));
    const mem = getUint32Memory();
    mem[ret / 4] = retptr;
    mem[ret / 4 + 1] = retlen;

}

const __widl_f_set_inner_text_HTMLElement_target = GetOwnOrInheritedPropertyDescriptor(HTMLElement.prototype, 'innerText').set || function() {
    throw new Error(`wasm-bindgen: GetOwnOrInheritedPropertyDescriptor(HTMLElement.prototype, 'innerText').set does not exist`);
};

export function __widl_f_set_inner_text_HTMLElement(arg0, arg1, arg2) {
    let varg1 = getStringFromWasm(arg1, arg2);
    __widl_f_set_inner_text_HTMLElement_target.call(getObject(arg0), varg1);
}

export function __widl_instanceof_Window(idx) {
    return getObject(idx) instanceof Window ? 1 : 0;
}

const __widl_f_document_Window_target = function() {
    return this.document;
};

export function __widl_f_document_Window(arg0) {

    const val = __widl_f_document_Window_target.call(getObject(arg0));
    return isLikeNone(val) ? 0 : addHeapObject(val);

}

export function __wbg_newnoargs_7b645db1166d5db3(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    return addHeapObject(new Function(varg0));
}

const __wbg_call_acb354df3e54038a_target = Function.prototype.call || function() {
    throw new Error(`wasm-bindgen: Function.prototype.call does not exist`);
};

export function __wbg_call_acb354df3e54038a(arg0, arg1, exnptr) {
    try {
        return addHeapObject(__wbg_call_acb354df3e54038a_target.call(getObject(arg0), getObject(arg1)));
    } catch (e) {
        const view = getUint32Memory();
        view[exnptr / 4] = 1;
        view[exnptr / 4 + 1] = addHeapObject(e);

    }
}

export function __wbindgen_object_clone_ref(idx) {
    // If this object is on the stack promote it to the heap.
    if ((idx & 1) === 1) return addHeapObject(getObject(idx));

    // Otherwise if the object is on the heap just bump the
    // refcount and move on
    const val = slab[idx >> 1];
    val.cnt += 1;
    return idx;
}

function dropRef(idx) {

    idx = idx >> 1;
    if (idx < 4) return;
    let obj = slab[idx];

    obj.cnt -= 1;
    if (obj.cnt > 0) return;

    // If we hit 0 then free up our space in the slab
    slab[idx] = slab_next;
    slab_next = idx;
}

export function __wbindgen_object_drop_ref(i) {
    dropRef(i);
}

export function __wbindgen_string_new(p, l) {
    return addHeapObject(getStringFromWasm(p, l));
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropRef(idx);
    return ret;
}

export function __wbindgen_rethrow(idx) { throw takeObject(idx); }

export function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}

