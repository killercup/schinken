// For more comments about what's going on here, check out the `hello_world`
// example
const rust = import('./raw_web_sys');
rust.then(m => m.run());
