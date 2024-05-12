// build/dev/javascript/prelude.mjs
var CustomType = class {
  withFields(fields) {
    let properties = Object.keys(this).map(
      (label) => label in fields ? fields[label] : this[label]
    );
    return new this.constructor(...properties);
  }
};
var List = class {
  static fromArray(array3, tail) {
    let t = tail || new Empty();
    for (let i = array3.length - 1; i >= 0; --i) {
      t = new NonEmpty(array3[i], t);
    }
    return t;
  }
  [Symbol.iterator]() {
    return new ListIterator(this);
  }
  toArray() {
    return [...this];
  }
  // @internal
  atLeastLength(desired) {
    for (let _ of this) {
      if (desired <= 0)
        return true;
      desired--;
    }
    return desired <= 0;
  }
  // @internal
  hasLength(desired) {
    for (let _ of this) {
      if (desired <= 0)
        return false;
      desired--;
    }
    return desired === 0;
  }
  countLength() {
    let length2 = 0;
    for (let _ of this)
      length2++;
    return length2;
  }
};
function prepend(element3, tail) {
  return new NonEmpty(element3, tail);
}
function toList(elements, tail) {
  return List.fromArray(elements, tail);
}
var ListIterator = class {
  #current;
  constructor(current) {
    this.#current = current;
  }
  next() {
    if (this.#current instanceof Empty) {
      return { done: true };
    } else {
      let { head, tail } = this.#current;
      this.#current = tail;
      return { value: head, done: false };
    }
  }
};
var Empty = class extends List {
};
var NonEmpty = class extends List {
  constructor(head, tail) {
    super();
    this.head = head;
    this.tail = tail;
  }
};
var Result = class _Result extends CustomType {
  // @internal
  static isResult(data) {
    return data instanceof _Result;
  }
};
var Ok = class extends Result {
  constructor(value) {
    super();
    this[0] = value;
  }
  // @internal
  isOk() {
    return true;
  }
};
var Error = class extends Result {
  constructor(detail) {
    super();
    this[0] = detail;
  }
  // @internal
  isOk() {
    return false;
  }
};
function isEqual(x, y) {
  let values = [x, y];
  while (values.length) {
    let a = values.pop();
    let b = values.pop();
    if (a === b)
      continue;
    if (!isObject(a) || !isObject(b))
      return false;
    let unequal = !structurallyCompatibleObjects(a, b) || unequalDates(a, b) || unequalBuffers(a, b) || unequalArrays(a, b) || unequalMaps(a, b) || unequalSets(a, b) || unequalRegExps(a, b);
    if (unequal)
      return false;
    const proto = Object.getPrototypeOf(a);
    if (proto !== null && typeof proto.equals === "function") {
      try {
        if (a.equals(b))
          continue;
        else
          return false;
      } catch {
      }
    }
    let [keys2, get2] = getters(a);
    for (let k of keys2(a)) {
      values.push(get2(a, k), get2(b, k));
    }
  }
  return true;
}
function getters(object3) {
  if (object3 instanceof Map) {
    return [(x) => x.keys(), (x, y) => x.get(y)];
  } else {
    let extra = object3 instanceof globalThis.Error ? ["message"] : [];
    return [(x) => [...extra, ...Object.keys(x)], (x, y) => x[y]];
  }
}
function unequalDates(a, b) {
  return a instanceof Date && (a > b || a < b);
}
function unequalBuffers(a, b) {
  return a.buffer instanceof ArrayBuffer && a.BYTES_PER_ELEMENT && !(a.byteLength === b.byteLength && a.every((n, i) => n === b[i]));
}
function unequalArrays(a, b) {
  return Array.isArray(a) && a.length !== b.length;
}
function unequalMaps(a, b) {
  return a instanceof Map && a.size !== b.size;
}
function unequalSets(a, b) {
  return a instanceof Set && (a.size != b.size || [...a].some((e) => !b.has(e)));
}
function unequalRegExps(a, b) {
  return a instanceof RegExp && (a.source !== b.source || a.flags !== b.flags);
}
function isObject(a) {
  return typeof a === "object" && a !== null;
}
function structurallyCompatibleObjects(a, b) {
  if (typeof a !== "object" && typeof b !== "object" && (!a || !b))
    return false;
  let nonstructural = [Promise, WeakSet, WeakMap, Function];
  if (nonstructural.some((c) => a instanceof c))
    return false;
  return a.constructor === b.constructor;
}
function divideFloat(a, b) {
  if (b === 0) {
    return 0;
  } else {
    return a / b;
  }
}
function makeError(variant, module, line, fn, message, extra) {
  let error = new globalThis.Error(message);
  error.gleam_error = variant;
  error.module = module;
  error.line = line;
  error.fn = fn;
  for (let k in extra)
    error[k] = extra[k];
  return error;
}

// build/dev/javascript/gleam_stdlib/gleam/option.mjs
var None = class extends CustomType {
};

// build/dev/javascript/gleam_stdlib/dict.mjs
var tempDataView = new DataView(new ArrayBuffer(8));
var SHIFT = 5;
var BUCKET_SIZE = Math.pow(2, SHIFT);
var MASK = BUCKET_SIZE - 1;
var MAX_INDEX_NODE = BUCKET_SIZE / 2;
var MIN_ARRAY_NODE = BUCKET_SIZE / 4;

// build/dev/javascript/gleam_stdlib/gleam_stdlib.mjs
function identity(x) {
  return x;
}
function to_string(term) {
  return term.toString();
}
function float_to_string(float3) {
  const string2 = float3.toString();
  if (string2.indexOf(".") >= 0) {
    return string2;
  } else {
    return string2 + ".0";
  }
}
function join(xs, separator) {
  const iterator = xs[Symbol.iterator]();
  let result = iterator.next().value || "";
  let current = iterator.next();
  while (!current.done) {
    result = result + separator + current.value;
    current = iterator.next();
  }
  return result;
}
function round(float3) {
  return Math.round(float3);
}

// build/dev/javascript/gleam_stdlib/gleam/float.mjs
function to_string2(x) {
  return float_to_string(x);
}
function negate(x) {
  return -1 * x;
}
function do_round(x) {
  let $ = x >= 0;
  if ($) {
    return round(x);
  } else {
    return 0 - round(negate(x));
  }
}
function round2(x) {
  return do_round(x);
}
function divide(a, b) {
  if (b === 0) {
    return new Error(void 0);
  } else {
    let b$1 = b;
    return new Ok(divideFloat(a, b$1));
  }
}

// build/dev/javascript/gleam_stdlib/gleam/int.mjs
function to_string3(x) {
  return to_string(x);
}
function to_float(x) {
  return identity(x);
}

// build/dev/javascript/gleam_stdlib/gleam/pair.mjs
function map_first(pair, fun) {
  let a = pair[0];
  let b = pair[1];
  return [fun(a), b];
}

// build/dev/javascript/gleam_stdlib/gleam/list.mjs
function do_reverse(loop$remaining, loop$accumulator) {
  while (true) {
    let remaining = loop$remaining;
    let accumulator = loop$accumulator;
    if (remaining.hasLength(0)) {
      return accumulator;
    } else {
      let item = remaining.head;
      let rest$1 = remaining.tail;
      loop$remaining = rest$1;
      loop$accumulator = prepend(item, accumulator);
    }
  }
}
function reverse(xs) {
  return do_reverse(xs, toList([]));
}
function do_map(loop$list, loop$fun, loop$acc) {
  while (true) {
    let list = loop$list;
    let fun = loop$fun;
    let acc = loop$acc;
    if (list.hasLength(0)) {
      return reverse(acc);
    } else {
      let x = list.head;
      let xs = list.tail;
      loop$list = xs;
      loop$fun = fun;
      loop$acc = prepend(fun(x), acc);
    }
  }
}
function map(list, fun) {
  return do_map(list, fun, toList([]));
}
function reverse_and_prepend(loop$prefix, loop$suffix) {
  while (true) {
    let prefix = loop$prefix;
    let suffix = loop$suffix;
    if (prefix.hasLength(0)) {
      return suffix;
    } else {
      let first$1 = prefix.head;
      let rest$1 = prefix.tail;
      loop$prefix = rest$1;
      loop$suffix = prepend(first$1, suffix);
    }
  }
}
function do_concat(loop$lists, loop$acc) {
  while (true) {
    let lists = loop$lists;
    let acc = loop$acc;
    if (lists.hasLength(0)) {
      return reverse(acc);
    } else {
      let list = lists.head;
      let further_lists = lists.tail;
      loop$lists = further_lists;
      loop$acc = reverse_and_prepend(list, acc);
    }
  }
}
function concat(lists) {
  return do_concat(lists, toList([]));
}
function fold(loop$list, loop$initial, loop$fun) {
  while (true) {
    let list = loop$list;
    let initial = loop$initial;
    let fun = loop$fun;
    if (list.hasLength(0)) {
      return initial;
    } else {
      let x = list.head;
      let rest$1 = list.tail;
      loop$list = rest$1;
      loop$initial = fun(initial, x);
      loop$fun = fun;
    }
  }
}

// build/dev/javascript/gleam_stdlib/gleam/result.mjs
function try$(result, fun) {
  if (result.isOk()) {
    let x = result[0];
    return fun(x);
  } else {
    let e = result[0];
    return new Error(e);
  }
}
function then$(result, fun) {
  return try$(result, fun);
}

// build/dev/javascript/gleam_stdlib/gleam/dynamic.mjs
function from(a) {
  return identity(a);
}

// build/dev/javascript/gleam_stdlib/gleam/string.mjs
function join2(strings, separator) {
  return join(strings, separator);
}

// build/dev/javascript/gleam_stdlib/gleam/bool.mjs
function guard(requirement, consequence, alternative) {
  if (requirement) {
    return consequence;
  } else {
    return alternative();
  }
}

// build/dev/javascript/lustre/lustre/effect.mjs
var Effect = class extends CustomType {
  constructor(all) {
    super();
    this.all = all;
  }
};
function none() {
  return new Effect(toList([]));
}

// build/dev/javascript/lustre/lustre/internals/vdom.mjs
var Text = class extends CustomType {
  constructor(content) {
    super();
    this.content = content;
  }
};
var Element = class extends CustomType {
  constructor(key, namespace2, tag, attrs, children, self_closing, void$) {
    super();
    this.key = key;
    this.namespace = namespace2;
    this.tag = tag;
    this.attrs = attrs;
    this.children = children;
    this.self_closing = self_closing;
    this.void = void$;
  }
};
var Attribute = class extends CustomType {
  constructor(x0, x1, as_property) {
    super();
    this[0] = x0;
    this[1] = x1;
    this.as_property = as_property;
  }
};

// build/dev/javascript/lustre/lustre/attribute.mjs
function attribute(name, value) {
  return new Attribute(name, from(value), false);
}
function class$(name) {
  return attribute("class", name);
}

// build/dev/javascript/lustre/lustre/element.mjs
function element(tag, attrs, children) {
  if (tag === "area") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "base") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "br") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "col") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "embed") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "hr") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "img") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "input") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "link") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "meta") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "param") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "source") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "track") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "wbr") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else {
    return new Element("", "", tag, attrs, children, false, false);
  }
}
function text(content) {
  return new Text(content);
}

// build/dev/javascript/lustre/lustre/internals/runtime.mjs
var Debug = class extends CustomType {
  constructor(x0) {
    super();
    this[0] = x0;
  }
};
var Dispatch = class extends CustomType {
  constructor(x0) {
    super();
    this[0] = x0;
  }
};
var Shutdown = class extends CustomType {
};
var ForceModel = class extends CustomType {
  constructor(x0) {
    super();
    this[0] = x0;
  }
};

// build/dev/javascript/lustre/vdom.ffi.mjs
function morph(prev, next, dispatch, isComponent = false) {
  let out;
  let stack = [{ prev, next, parent: prev.parentNode }];
  while (stack.length) {
    let { prev: prev2, next: next2, parent } = stack.pop();
    if (next2.subtree !== void 0)
      next2 = next2.subtree();
    if (next2.content !== void 0) {
      if (!prev2) {
        const created = document.createTextNode(next2.content);
        parent.appendChild(created);
        out ??= created;
      } else if (prev2.nodeType === Node.TEXT_NODE) {
        if (prev2.textContent !== next2.content)
          prev2.textContent = next2.content;
        out ??= prev2;
      } else {
        const created = document.createTextNode(next2.content);
        parent.replaceChild(created, prev2);
        out ??= created;
      }
    } else if (next2.tag !== void 0) {
      const created = createElementNode({
        prev: prev2,
        next: next2,
        dispatch,
        stack,
        isComponent
      });
      if (!prev2) {
        parent.appendChild(created);
      } else if (prev2 !== created) {
        parent.replaceChild(created, prev2);
      }
      out ??= created;
    } else if (next2.elements !== void 0) {
      iterateElement(next2, (fragmentElement) => {
        stack.unshift({ prev: prev2, next: fragmentElement, parent });
        prev2 = prev2?.nextSibling;
      });
    } else if (next2.subtree !== void 0) {
      stack.push({ prev: prev2, next: next2, parent });
    }
  }
  return out;
}
function createElementNode({ prev, next, dispatch, stack }) {
  const namespace2 = next.namespace || "http://www.w3.org/1999/xhtml";
  const canMorph = prev && prev.nodeType === Node.ELEMENT_NODE && prev.localName === next.tag && prev.namespaceURI === (next.namespace || "http://www.w3.org/1999/xhtml");
  const el2 = canMorph ? prev : namespace2 ? document.createElementNS(namespace2, next.tag) : document.createElement(next.tag);
  let handlersForEl;
  if (!registeredHandlers.has(el2)) {
    const emptyHandlers = /* @__PURE__ */ new Map();
    registeredHandlers.set(el2, emptyHandlers);
    handlersForEl = emptyHandlers;
  } else {
    handlersForEl = registeredHandlers.get(el2);
  }
  const prevHandlers = canMorph ? new Set(handlersForEl.keys()) : null;
  const prevAttributes = canMorph ? new Set(Array.from(prev.attributes, (a) => a.name)) : null;
  let className = null;
  let style2 = null;
  let innerHTML = null;
  for (const attr of next.attrs) {
    const name = attr[0];
    const value = attr[1];
    if (attr.as_property) {
      el2[name] = value;
      if (canMorph)
        prevAttributes.delete(name);
    } else if (name.startsWith("on")) {
      const eventName = name.slice(2);
      const callback = dispatch(value);
      if (!handlersForEl.has(eventName)) {
        el2.addEventListener(eventName, lustreGenericEventHandler);
      }
      handlersForEl.set(eventName, callback);
      if (canMorph)
        prevHandlers.delete(eventName);
    } else if (name.startsWith("data-lustre-on-")) {
      const eventName = name.slice(15);
      const callback = dispatch(lustreServerEventHandler);
      if (!handlersForEl.has(eventName)) {
        el2.addEventListener(eventName, lustreGenericEventHandler);
      }
      handlersForEl.set(eventName, callback);
      el2.setAttribute(name, value);
    } else if (name === "class") {
      className = className === null ? value : className + " " + value;
    } else if (name === "style") {
      style2 = style2 === null ? value : style2 + value;
    } else if (name === "dangerous-unescaped-html") {
      innerHTML = value;
    } else {
      if (typeof value === "string")
        el2.setAttribute(name, value);
      if (name === "value" || name === "selected")
        el2[name] = value;
      if (canMorph)
        prevAttributes.delete(name);
    }
  }
  if (className !== null) {
    el2.setAttribute("class", className);
    if (canMorph)
      prevAttributes.delete("class");
  }
  if (style2 !== null) {
    el2.setAttribute("style", style2);
    if (canMorph)
      prevAttributes.delete("style");
  }
  if (canMorph) {
    for (const attr of prevAttributes) {
      el2.removeAttribute(attr);
    }
    for (const eventName of prevHandlers) {
      handlersForEl.delete(eventName);
      el2.removeEventListener(eventName, lustreGenericEventHandler);
    }
  }
  if (next.key !== void 0 && next.key !== "") {
    el2.setAttribute("data-lustre-key", next.key);
  } else if (innerHTML !== null) {
    el2.innerHTML = innerHTML;
    return el2;
  }
  let prevChild = el2.firstChild;
  let seenKeys = null;
  let keyedChildren = null;
  let incomingKeyedChildren = null;
  let firstChild = next.children[Symbol.iterator]().next().value;
  if (canMorph && firstChild !== void 0 && // Explicit checks are more verbose but truthy checks force a bunch of comparisons
  // we don't care about: it's never gonna be a number etc.
  firstChild.key !== void 0 && firstChild.key !== "") {
    seenKeys = /* @__PURE__ */ new Set();
    keyedChildren = getKeyedChildren(prev);
    incomingKeyedChildren = getKeyedChildren(next);
  }
  for (const child of next.children) {
    iterateElement(child, (currElement) => {
      if (currElement.key !== void 0 && seenKeys !== null) {
        prevChild = diffKeyedChild(
          prevChild,
          currElement,
          el2,
          stack,
          incomingKeyedChildren,
          keyedChildren,
          seenKeys
        );
      } else {
        stack.unshift({ prev: prevChild, next: currElement, parent: el2 });
        prevChild = prevChild?.nextSibling;
      }
    });
  }
  while (prevChild) {
    const next2 = prevChild.nextSibling;
    el2.removeChild(prevChild);
    prevChild = next2;
  }
  return el2;
}
var registeredHandlers = /* @__PURE__ */ new WeakMap();
function lustreGenericEventHandler(event) {
  const target = event.currentTarget;
  if (!registeredHandlers.has(target)) {
    target.removeEventListener(event.type, lustreGenericEventHandler);
    return;
  }
  const handlersForEventTarget = registeredHandlers.get(target);
  if (!handlersForEventTarget.has(event.type)) {
    target.removeEventListener(event.type, lustreGenericEventHandler);
    return;
  }
  handlersForEventTarget.get(event.type)(event);
}
function lustreServerEventHandler(event) {
  const el2 = event.target;
  const tag = el2.getAttribute(`data-lustre-on-${event.type}`);
  const data = JSON.parse(el2.getAttribute("data-lustre-data") || "{}");
  const include = JSON.parse(el2.getAttribute("data-lustre-include") || "[]");
  switch (event.type) {
    case "input":
    case "change":
      include.push("target.value");
      break;
  }
  return {
    tag,
    data: include.reduce(
      (data2, property) => {
        const path = property.split(".");
        for (let i = 0, o = data2, e = event; i < path.length; i++) {
          if (i === path.length - 1) {
            o[path[i]] = e[path[i]];
          } else {
            o[path[i]] ??= {};
            e = e[path[i]];
            o = o[path[i]];
          }
        }
        return data2;
      },
      { data }
    )
  };
}
function getKeyedChildren(el2) {
  const keyedChildren = /* @__PURE__ */ new Map();
  if (el2) {
    for (const child of el2.children) {
      iterateElement(child, (currElement) => {
        const key = currElement?.key || currElement?.getAttribute?.("data-lustre-key");
        if (key)
          keyedChildren.set(key, currElement);
      });
    }
  }
  return keyedChildren;
}
function diffKeyedChild(prevChild, child, el2, stack, incomingKeyedChildren, keyedChildren, seenKeys) {
  while (prevChild && !incomingKeyedChildren.has(prevChild.getAttribute("data-lustre-key"))) {
    const nextChild = prevChild.nextSibling;
    el2.removeChild(prevChild);
    prevChild = nextChild;
  }
  if (keyedChildren.size === 0) {
    iterateElement(child, (currChild) => {
      stack.unshift({ prev: prevChild, next: currChild, parent: el2 });
      prevChild = prevChild?.nextSibling;
    });
    return prevChild;
  }
  if (seenKeys.has(child.key)) {
    console.warn(`Duplicate key found in Lustre vnode: ${child.key}`);
    stack.unshift({ prev: null, next: child, parent: el2 });
    return prevChild;
  }
  seenKeys.add(child.key);
  const keyedChild = keyedChildren.get(child.key);
  if (!keyedChild && !prevChild) {
    stack.unshift({ prev: null, next: child, parent: el2 });
    return prevChild;
  }
  if (!keyedChild && prevChild !== null) {
    const placeholder = document.createTextNode("");
    el2.insertBefore(placeholder, prevChild);
    stack.unshift({ prev: placeholder, next: child, parent: el2 });
    return prevChild;
  }
  if (!keyedChild || keyedChild === prevChild) {
    stack.unshift({ prev: prevChild, next: child, parent: el2 });
    prevChild = prevChild?.nextSibling;
    return prevChild;
  }
  el2.insertBefore(keyedChild, prevChild);
  stack.unshift({ prev: keyedChild, next: child, parent: el2 });
  return prevChild;
}
function iterateElement(element3, processElement) {
  if (element3.elements !== void 0) {
    for (const currElement of element3.elements) {
      processElement(currElement);
    }
  } else {
    processElement(element3);
  }
}

// build/dev/javascript/lustre/client-runtime.ffi.mjs
var LustreClientApplication2 = class _LustreClientApplication {
  #root = null;
  #queue = [];
  #effects = [];
  #didUpdate = false;
  #isComponent = false;
  #model = null;
  #update = null;
  #view = null;
  static start(flags, selector, init2, update2, view) {
    if (!is_browser())
      return new Error(new NotABrowser());
    const root2 = selector instanceof HTMLElement ? selector : document.querySelector(selector);
    if (!root2)
      return new Error(new ElementNotFound(selector));
    const app = new _LustreClientApplication(init2(flags), update2, view, root2);
    return new Ok((msg) => app.send(msg));
  }
  constructor([model, effects], update2, view, root2 = document.body, isComponent = false) {
    this.#model = model;
    this.#update = update2;
    this.#view = view;
    this.#root = root2;
    this.#effects = effects.all.toArray();
    this.#didUpdate = true;
    this.#isComponent = isComponent;
    window.requestAnimationFrame(() => this.#tick());
  }
  send(action) {
    switch (true) {
      case action instanceof Dispatch: {
        this.#queue.push(action[0]);
        this.#tick();
        return;
      }
      case action instanceof Shutdown: {
        this.#shutdown();
        return;
      }
      case action instanceof Debug: {
        this.#debug(action[0]);
        return;
      }
      default:
        return;
    }
  }
  emit(event, data) {
    this.#root.dispatchEvent(
      new CustomEvent(event, {
        bubbles: true,
        detail: data,
        composed: true
      })
    );
  }
  #tick() {
    this.#flush_queue();
    const vdom = this.#view(this.#model);
    const dispatch = (handler) => (e) => {
      const result = handler(e);
      if (result instanceof Ok) {
        this.send(new Dispatch(result[0]));
      }
    };
    this.#didUpdate = false;
    this.#root = morph(this.#root, vdom, dispatch, this.#isComponent);
  }
  #flush_queue(iterations = 0) {
    while (this.#queue.length) {
      const [next, effects] = this.#update(this.#model, this.#queue.shift());
      this.#didUpdate ||= !isEqual(this.#model, next);
      this.#model = next;
      this.#effects = this.#effects.concat(effects.all.toArray());
    }
    while (this.#effects.length) {
      this.#effects.shift()(
        (msg) => this.send(new Dispatch(msg)),
        (event, data) => this.emit(event, data)
      );
    }
    if (this.#queue.length) {
      if (iterations < 5) {
        this.#flush_queue(++iterations);
      } else {
        window.requestAnimationFrame(() => this.#tick());
      }
    }
  }
  #debug(action) {
    switch (true) {
      case action instanceof ForceModel: {
        const vdom = this.#view(action[0]);
        const dispatch = (handler) => (e) => {
          const result = handler(e);
          if (result instanceof Ok) {
            this.send(new Dispatch(result[0]));
          }
        };
        this.#queue = [];
        this.#effects = [];
        this.#didUpdate = false;
        this.#root = morph(this.#root, vdom, dispatch, this.#isComponent);
      }
    }
  }
  #shutdown() {
    this.#root.remove();
    this.#root = null;
    this.#model = null;
    this.#queue = [];
    this.#effects = [];
    this.#didUpdate = false;
    this.#update = () => {
    };
    this.#view = () => {
    };
  }
};
var start = (app, selector, flags) => LustreClientApplication2.start(
  flags,
  selector,
  app.init,
  app.update,
  app.view
);
var is_browser = () => window && window.document;

// build/dev/javascript/lustre/lustre.mjs
var App = class extends CustomType {
  constructor(init2, update2, view, on_attribute_change) {
    super();
    this.init = init2;
    this.update = update2;
    this.view = view;
    this.on_attribute_change = on_attribute_change;
  }
};
var ElementNotFound = class extends CustomType {
  constructor(selector) {
    super();
    this.selector = selector;
  }
};
var NotABrowser = class extends CustomType {
};
function application(init2, update2, view) {
  return new App(init2, update2, view, new None());
}
function element2(html) {
  let init2 = (_) => {
    return [void 0, none()];
  };
  let update2 = (_, _1) => {
    return [void 0, none()];
  };
  let view = (_) => {
    return html;
  };
  return application(init2, update2, view);
}
function start3(app, selector, flags) {
  return guard(
    !is_browser(),
    new Error(new NotABrowser()),
    () => {
      return start(app, selector, flags);
    }
  );
}

// build/dev/javascript/lustre/lustre/element/html.mjs
function text2(content) {
  return text(content);
}
function style(attrs, css) {
  return element("style", attrs, toList([text2(css)]));
}
function div(attrs, children) {
  return element("div", attrs, children);
}
function button(attrs, children) {
  return element("button", attrs, children);
}

// build/dev/javascript/gleam_community_colour/gleam_community/colour.mjs
var Rgba = class extends CustomType {
  constructor(r, g, b, a) {
    super();
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
};
function valid_colour_value(c) {
  let $ = c > 1 || c < 0;
  if ($) {
    return new Error(void 0);
  } else {
    return new Ok(c);
  }
}
function hue_to_rgb(hue, m1, m2) {
  let h = (() => {
    if (hue < 0) {
      return hue + 1;
    } else if (hue > 1) {
      return hue - 1;
    } else {
      return hue;
    }
  })();
  let h_t_6 = h * 6;
  let h_t_2 = h * 2;
  let h_t_3 = h * 3;
  if (h_t_6 < 1) {
    return m1 + (m2 - m1) * h * 6;
  } else if (h_t_2 < 1) {
    return m2;
  } else if (h_t_3 < 2) {
    return m1 + (m2 - m1) * (divideFloat(2, 3) - h) * 6;
  } else {
    return m1;
  }
}
function hsla_to_rgba(h, s, l, a) {
  let m2 = (() => {
    let $ = l <= 0.5;
    if ($) {
      return l * (s + 1);
    } else {
      return l + s - l * s;
    }
  })();
  let m1 = l * 2 - m2;
  let r = hue_to_rgb(h + divideFloat(1, 3), m1, m2);
  let g = hue_to_rgb(h, m1, m2);
  let b = hue_to_rgb(h - divideFloat(1, 3), m1, m2);
  return [r, g, b, a];
}
function from_rgb255(red3, green3, blue2) {
  return then$(
    (() => {
      let _pipe = red3;
      let _pipe$1 = to_float(_pipe);
      let _pipe$2 = divide(_pipe$1, 255);
      return then$(_pipe$2, valid_colour_value);
    })(),
    (r) => {
      return then$(
        (() => {
          let _pipe = green3;
          let _pipe$1 = to_float(_pipe);
          let _pipe$2 = divide(_pipe$1, 255);
          return then$(_pipe$2, valid_colour_value);
        })(),
        (g) => {
          return then$(
            (() => {
              let _pipe = blue2;
              let _pipe$1 = to_float(_pipe);
              let _pipe$2 = divide(_pipe$1, 255);
              return then$(_pipe$2, valid_colour_value);
            })(),
            (b) => {
              return new Ok(new Rgba(r, g, b, 1));
            }
          );
        }
      );
    }
  );
}
function to_rgba(colour) {
  if (colour instanceof Rgba) {
    let r = colour.r;
    let g = colour.g;
    let b = colour.b;
    let a = colour.a;
    return [r, g, b, a];
  } else {
    let h = colour.h;
    let s = colour.s;
    let l = colour.l;
    let a = colour.a;
    return hsla_to_rgba(h, s, l, a);
  }
}
var light_red = new Rgba(
  0.9372549019607843,
  0.1607843137254902,
  0.1607843137254902,
  1
);
var red = new Rgba(0.8, 0, 0, 1);
var dark_red = new Rgba(0.6431372549019608, 0, 0, 1);
var light_orange = new Rgba(
  0.9882352941176471,
  0.6862745098039216,
  0.24313725490196078,
  1
);
var orange = new Rgba(0.9607843137254902, 0.4745098039215686, 0, 1);
var dark_orange = new Rgba(
  0.807843137254902,
  0.3607843137254902,
  0,
  1
);
var light_yellow = new Rgba(
  1,
  0.9137254901960784,
  0.30980392156862746,
  1
);
var yellow = new Rgba(0.9294117647058824, 0.8313725490196079, 0, 1);
var dark_yellow = new Rgba(
  0.7686274509803922,
  0.6274509803921569,
  0,
  1
);
var light_green = new Rgba(
  0.5411764705882353,
  0.8862745098039215,
  0.20392156862745098,
  1
);
var green = new Rgba(
  0.45098039215686275,
  0.8235294117647058,
  0.08627450980392157,
  1
);
var dark_green = new Rgba(
  0.3058823529411765,
  0.6039215686274509,
  0.023529411764705882,
  1
);
var light_blue = new Rgba(
  0.4470588235294118,
  0.6235294117647059,
  0.8117647058823529,
  1
);
var blue = new Rgba(
  0.20392156862745098,
  0.396078431372549,
  0.6431372549019608,
  1
);
var dark_blue = new Rgba(
  0.12549019607843137,
  0.2901960784313726,
  0.5294117647058824,
  1
);
var light_purple = new Rgba(
  0.6784313725490196,
  0.4980392156862745,
  0.6588235294117647,
  1
);
var purple = new Rgba(
  0.4588235294117647,
  0.3137254901960784,
  0.4823529411764706,
  1
);
var dark_purple = new Rgba(
  0.3607843137254902,
  0.20784313725490197,
  0.4,
  1
);
var light_brown = new Rgba(
  0.9137254901960784,
  0.7254901960784313,
  0.43137254901960786,
  1
);
var brown = new Rgba(
  0.7568627450980392,
  0.49019607843137253,
  0.06666666666666667,
  1
);
var dark_brown = new Rgba(
  0.5607843137254902,
  0.34901960784313724,
  0.00784313725490196,
  1
);
var black = new Rgba(0, 0, 0, 1);
var white = new Rgba(1, 1, 1, 1);
var light_grey = new Rgba(
  0.9333333333333333,
  0.9333333333333333,
  0.9254901960784314,
  1
);
var grey = new Rgba(
  0.8274509803921568,
  0.8431372549019608,
  0.8117647058823529,
  1
);
var dark_grey = new Rgba(
  0.7294117647058823,
  0.7411764705882353,
  0.7137254901960784,
  1
);
var light_gray = new Rgba(
  0.9333333333333333,
  0.9333333333333333,
  0.9254901960784314,
  1
);
var gray = new Rgba(
  0.8274509803921568,
  0.8431372549019608,
  0.8117647058823529,
  1
);
var dark_gray = new Rgba(
  0.7294117647058823,
  0.7411764705882353,
  0.7137254901960784,
  1
);
var light_charcoal = new Rgba(
  0.5333333333333333,
  0.5411764705882353,
  0.5215686274509804,
  1
);
var charcoal = new Rgba(
  0.3333333333333333,
  0.3411764705882353,
  0.3254901960784314,
  1
);
var dark_charcoal = new Rgba(
  0.1803921568627451,
  0.20392156862745098,
  0.21176470588235294,
  1
);
var pink = new Rgba(1, 0.6862745098039216, 0.9529411764705882, 1);

// build/dev/javascript/w_theme/w_theme/color.mjs
var ColorScale = class extends CustomType {
  constructor(bg, bg_subtle, tint, tint_subtle, tint_strong, accent, accent_subtle, accent_strong, solid, solid_subtle, solid_strong, solid_text, text3, text_subtle) {
    super();
    this.bg = bg;
    this.bg_subtle = bg_subtle;
    this.tint = tint;
    this.tint_subtle = tint_subtle;
    this.tint_strong = tint_strong;
    this.accent = accent;
    this.accent_subtle = accent_subtle;
    this.accent_strong = accent_strong;
    this.solid = solid;
    this.solid_subtle = solid_subtle;
    this.solid_strong = solid_strong;
    this.solid_text = solid_text;
    this.text = text3;
    this.text_subtle = text_subtle;
  }
};
function color(r, g, b) {
  let $ = from_rgb255(r, g, b);
  if (!$.isOk()) {
    throw makeError(
      "assignment_no_match",
      "w_theme/color",
      4,
      "color",
      "Assignment pattern did not match",
      { value: $ }
    );
  }
  let c = $[0];
  return c;
}
function slate() {
  return new ColorScale(
    color(252, 252, 253),
    color(249, 249, 251),
    color(232, 232, 236),
    color(240, 240, 243),
    color(224, 225, 230),
    color(205, 206, 214),
    color(217, 217, 224),
    color(185, 187, 198),
    color(139, 141, 152),
    color(150, 152, 162),
    color(128, 131, 141),
    color(255, 255, 255),
    color(28, 32, 36),
    color(96, 100, 108)
  );
}
function red2() {
  return new ColorScale(
    color(255, 252, 252),
    color(255, 247, 247),
    color(255, 219, 220),
    color(254, 235, 236),
    color(255, 205, 206),
    color(244, 169, 170),
    color(253, 189, 190),
    color(235, 142, 144),
    color(229, 72, 77),
    color(236, 83, 88),
    color(220, 62, 66),
    color(255, 255, 255),
    color(100, 23, 35),
    color(206, 44, 49)
  );
}
function pink2() {
  return new ColorScale(
    color(255, 252, 254),
    color(254, 247, 251),
    color(251, 220, 239),
    color(254, 233, 245),
    color(246, 206, 231),
    color(231, 172, 208),
    color(239, 191, 221),
    color(221, 147, 194),
    color(214, 64, 159),
    color(220, 72, 166),
    color(207, 56, 151),
    color(255, 255, 255),
    color(101, 18, 73),
    color(194, 41, 138)
  );
}
function cyan() {
  return new ColorScale(
    color(250, 253, 254),
    color(242, 250, 251),
    color(202, 241, 246),
    color(222, 247, 249),
    color(181, 233, 240),
    color(125, 206, 220),
    color(157, 221, 231),
    color(61, 185, 207),
    color(0, 162, 199),
    color(247, 172, 213),
    color(7, 151, 185),
    color(255, 255, 255),
    color(13, 60, 72),
    color(16, 125, 152)
  );
}
function green2() {
  return new ColorScale(
    color(251, 254, 252),
    color(244, 251, 246),
    color(214, 241, 223),
    color(230, 246, 235),
    color(196, 232, 209),
    color(142, 206, 170),
    color(173, 221, 192),
    color(91, 185, 139),
    color(48, 164, 108),
    color(53, 173, 115),
    color(43, 154, 102),
    color(255, 255, 255),
    color(25, 59, 45),
    color(33, 131, 88)
  );
}
function yellow2() {
  return new ColorScale(
    color(253, 253, 249),
    color(254, 252, 233),
    color(255, 243, 148),
    color(255, 250, 184),
    color(255, 231, 112),
    color(228, 199, 103),
    color(243, 215, 104),
    color(213, 174, 57),
    color(255, 230, 41),
    color(255, 234, 82),
    color(255, 220, 0),
    color(71, 59, 31),
    color(71, 59, 31),
    color(158, 108, 0)
  );
}
function gray_dark() {
  return new ColorScale(
    color(25, 25, 25),
    color(17, 17, 17),
    color(42, 42, 42),
    color(34, 34, 34),
    color(49, 49, 49),
    color(72, 72, 72),
    color(58, 58, 58),
    color(96, 96, 96),
    color(110, 110, 110),
    color(97, 97, 97),
    color(123, 123, 123),
    color(255, 255, 255),
    color(238, 238, 238),
    color(180, 180, 180)
  );
}
function slate_dark() {
  return new ColorScale(
    color(24, 25, 27),
    color(17, 17, 19),
    color(39, 42, 45),
    color(33, 34, 37),
    color(46, 49, 53),
    color(67, 72, 78),
    color(54, 58, 63),
    color(90, 97, 105),
    color(105, 110, 119),
    color(91, 96, 105),
    color(119, 123, 132),
    color(255, 255, 255),
    color(237, 238, 240),
    color(176, 180, 186)
  );
}
function red_dark() {
  return new ColorScale(
    color(32, 19, 20),
    color(25, 17, 17),
    color(80, 15, 28),
    color(59, 18, 25),
    color(97, 22, 35),
    color(140, 51, 58),
    color(114, 35, 45),
    color(181, 69, 72),
    color(229, 72, 77),
    color(220, 52, 57),
    color(236, 93, 94),
    color(255, 255, 255),
    color(255, 209, 217),
    color(255, 149, 146)
  );
}
function pink_dark() {
  return new ColorScale(
    color(33, 18, 29),
    color(25, 17, 23),
    color(75, 20, 61),
    color(55, 23, 47),
    color(89, 28, 71),
    color(131, 56, 105),
    color(105, 41, 85),
    color(168, 72, 133),
    color(214, 64, 159),
    color(203, 49, 147),
    color(222, 81, 168),
    color(255, 255, 255),
    color(253, 209, 234),
    color(255, 141, 204)
  );
}
function cyan_dark() {
  return new ColorScale(
    color(16, 27, 32),
    color(11, 22, 26),
    color(0, 56, 72),
    color(8, 44, 54),
    color(0, 69, 88),
    color(18, 103, 126),
    color(4, 84, 104),
    color(17, 128, 156),
    color(0, 162, 199),
    color(232, 140, 177),
    color(35, 175, 208),
    color(255, 255, 255),
    color(182, 236, 247),
    color(76, 204, 230)
  );
}
function green_dark() {
  return new ColorScale(
    color(18, 27, 23),
    color(14, 21, 18),
    color(17, 59, 41),
    color(19, 45, 33),
    color(23, 73, 51),
    color(40, 104, 74),
    color(32, 87, 62),
    color(47, 124, 87),
    color(48, 164, 108),
    color(44, 152, 100),
    color(51, 176, 116),
    color(255, 255, 255),
    color(177, 241, 203),
    color(61, 214, 140)
  );
}
function yellow_dark() {
  return new ColorScale(
    color(27, 24, 15),
    color(20, 18, 11),
    color(54, 43, 0),
    color(45, 35, 5),
    color(67, 53, 0),
    color(102, 84, 23),
    color(82, 66, 2),
    color(131, 106, 33),
    color(255, 230, 41),
    color(250, 220, 0),
    color(255, 255, 87),
    color(27, 24, 15),
    color(246, 238, 180),
    color(245, 225, 71)
  );
}

// build/dev/javascript/w_theme/w_theme.mjs
var Theme = class extends CustomType {
  constructor(id, use_dark_color_scheme, font_families, border_radius, border_radius_scale, spacing, spacing_scale, base, primary, secondary, success, warning, danger, extra_css_variables) {
    super();
    this.id = id;
    this.use_dark_color_scheme = use_dark_color_scheme;
    this.font_families = font_families;
    this.border_radius = border_radius;
    this.border_radius_scale = border_radius_scale;
    this.spacing = spacing;
    this.spacing_scale = spacing_scale;
    this.base = base;
    this.primary = primary;
    this.secondary = secondary;
    this.success = success;
    this.warning = warning;
    this.danger = danger;
    this.extra_css_variables = extra_css_variables;
  }
};
var DarkModeFromSystemPreferences = class extends CustomType {
};
var FontFamilies = class extends CustomType {
  constructor(heading, text3, code) {
    super();
    this.heading = heading;
    this.text = text3;
    this.code = code;
  }
};
var SizeScale = class extends CustomType {
  constructor(xs, sm, md, lg, xl, xl_2, xl_3) {
    super();
    this.xs = xs;
    this.sm = sm;
    this.md = md;
    this.lg = lg;
    this.xl = xl;
    this.xl_2 = xl_2;
    this.xl_3 = xl_3;
  }
};
var SizeScaleRem = class extends CustomType {
  constructor(xs, sm, md, lg, xl, xl_2, xl_3) {
    super();
    this.xs = xs;
    this.sm = sm;
    this.md = md;
    this.lg = lg;
    this.xl = xl;
    this.xl_2 = xl_2;
    this.xl_3 = xl_3;
  }
};
function from_system_preferences() {
  return new DarkModeFromSystemPreferences();
}
function with_base(theme, update2) {
  return theme.withFields({ base: update2(theme.base) });
}
function with_primary(theme, update2) {
  return theme.withFields({ primary: update2(theme.primary) });
}
function theme_style(css) {
  return style(
    toList([attribute("data-w-theme", "true")]),
    css
  );
}
function to_color_scheme_var(theme) {
  let $ = theme.use_dark_color_scheme;
  if ($) {
    return toList([["color-scheme", "dark"]]);
  } else {
    return toList([["color-scheme", "light"]]);
  }
}
function to_css_defs(defs) {
  return fold(
    defs,
    "",
    (acc, kv) => {
      return kv[0] + ":" + kv[1] + ";" + acc;
    }
  );
}
function to_font_family_vars(theme) {
  return toList([
    ["font-heading", theme.font_families.heading],
    ["font-text", theme.font_families.text],
    ["font-code", theme.font_families.code]
  ]);
}
function to_size_var(user_value, default_value, scale_factor) {
  if (user_value === "") {
    return to_string2(default_value * scale_factor) + "rem";
  } else {
    return user_value;
  }
}
function rgba_to_255(value) {
  let _pipe = value * 255;
  let _pipe$1 = round2(_pipe);
  return to_string3(_pipe$1);
}
function css_color(color2) {
  let $ = to_rgba(color2);
  let r = $[0];
  let g = $[1];
  let b = $[2];
  return rgba_to_255(r) + " " + rgba_to_255(g) + " " + rgba_to_255(b);
}
var default_sans_serif = 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';
var default_font_families = new FontFamilies(
  default_sans_serif,
  default_sans_serif,
  "monospace"
);
var empty_size_scale = new SizeScale("", "", "", "", "", "", "");
function light_theme() {
  return new Theme(
    "light",
    false,
    default_font_families,
    empty_size_scale,
    1,
    empty_size_scale,
    1,
    slate(),
    pink2(),
    cyan(),
    green2(),
    yellow2(),
    red2(),
    toList([])
  );
}
function dark_theme() {
  return new Theme(
    "dark",
    true,
    default_font_families,
    empty_size_scale,
    1,
    empty_size_scale,
    1,
    slate_dark(),
    pink_dark(),
    cyan_dark(),
    green_dark(),
    yellow_dark(),
    red_dark(),
    toList([])
  );
}
var default_border_radius = new SizeScaleRem(
  0.125,
  0.25,
  0.375,
  0.5,
  0.75,
  1,
  1.5
);
var default_spacing = new SizeScaleRem(0.25, 0.5, 0.75, 1, 0.5, 2.5, 4);
var namespace = "w";
function css_var(id) {
  return "--" + namespace + "-" + id;
}
function to_size_vars(name, sizes, default$, scale_factor) {
  return toList([
    [css_var(name + "-xs"), to_size_var(sizes.xs, default$.xs, scale_factor)],
    [css_var(name + "-sm"), to_size_var(sizes.sm, default$.sm, scale_factor)],
    [css_var(name + "-md"), to_size_var(sizes.md, default$.md, scale_factor)],
    [css_var(name + "-lg"), to_size_var(sizes.lg, default$.lg, scale_factor)],
    [css_var(name + "-xl"), to_size_var(sizes.xl, default$.xl, scale_factor)],
    [
      css_var(name + "-2xl"),
      to_size_var(sizes.xl_2, default$.xl_2, scale_factor)
    ],
    [
      css_var(name + "-3xl"),
      to_size_var(sizes.xl_3, default$.xl_3, scale_factor)
    ]
  ]);
}
function to_border_radius_vars(theme) {
  return to_size_vars(
    "radius",
    theme.border_radius,
    default_border_radius,
    theme.border_radius_scale
  );
}
function to_spacing_vars(theme) {
  return to_size_vars(
    "spacing",
    theme.spacing,
    default_spacing,
    theme.spacing_scale
  );
}
function css_var_value(id) {
  return "var(" + css_var(id) + ")";
}
function css_color_value(id) {
  return "rgb(" + css_var_value(id) + ")";
}
function base_styles() {
  return style(
    toList([]),
    "body { background:" + css_color_value("base-bg") + ";color:" + css_color_value(
      "base-text"
    ) + ";font-family:" + css_var_value("font-text") + ";}h1, h2, h3, h4, h5, h6 {" + css_var_value(
      "font-heading"
    ) + ";}code {" + css_var_value("font-code") + ";}"
  );
}
function base_classes() {
  return style(
    toList([]),
    (() => {
      let _pipe = toList([
        "base",
        "primary",
        "secondary",
        "success",
        "warning",
        "danger"
      ]);
      let _pipe$1 = map(
        _pipe,
        (variant) => {
          return ".w-" + variant + " {background-color:" + css_color_value(
            variant + "-tint"
          ) + ";border-color:" + css_color_value(variant + "-accent") + ";color:" + css_color_value(
            variant + "-text"
          ) + ";}.w-" + variant + ":is(a,button):hover {background-color:" + css_color_value(
            variant + "-tint-strong"
          ) + ";border-color:" + css_color_value(variant + "-accent-strong") + ";}.w-" + variant + ":is(a,button):is(:active:focus) {background-color:" + css_color_value(
            variant + "-tint-subtle"
          ) + ";border-color:" + css_color_value(variant + "-accent-subtle") + ";} .w-" + variant + ".w-solid {background-color:" + css_color_value(
            variant + "-solid"
          ) + ";color:" + css_color_value(variant + "-solid-text") + ";}.w-" + variant + ".w-solid:is(a,button):hover {background-color:" + css_color_value(
            variant + "-solid-strong"
          ) + ";}.w-" + variant + ".w-solid:is(a,button):is(:active:focus) {background-color:" + css_color_value(
            variant + "-solid-subtle"
          ) + ";}";
        }
      );
      return join2(_pipe$1, "");
    })()
  );
}
function to_color_scale_vars(name, color_scale) {
  return toList([
    [css_var(name + "-bg"), css_color(color_scale.bg)],
    [css_var(name + "-bg-subtle"), css_color(color_scale.bg_subtle)],
    [css_var(name + "-tint"), css_color(color_scale.tint)],
    [css_var(name + "-tint-subtle"), css_color(color_scale.tint_subtle)],
    [css_var(name + "-tint-strong"), css_color(color_scale.tint_strong)],
    [css_var(name + "-accent"), css_color(color_scale.accent)],
    [css_var(name + "-accent-subtle"), css_color(color_scale.accent_subtle)],
    [css_var(name + "-accent-strong"), css_color(color_scale.accent_strong)],
    [css_var(name + "-solid"), css_color(color_scale.solid)],
    [css_var(name + "-solid-subtle"), css_color(color_scale.solid_subtle)],
    [css_var(name + "-solid-strong"), css_color(color_scale.solid_strong)],
    [css_var(name + "-solid-text"), css_color(color_scale.solid_text)],
    [css_var(name + "-text"), css_color(color_scale.text)],
    [css_var(name + "-text-subtle"), css_color(color_scale.text_subtle)]
  ]);
}
function to_css_string(theme) {
  let _pipe = toList([
    toList([["--w-id", theme.id]]),
    to_color_scheme_var(theme),
    to_font_family_vars(theme),
    to_border_radius_vars(theme),
    to_spacing_vars(theme),
    to_color_scale_vars("base", theme.base),
    to_color_scale_vars("primary", theme.primary),
    to_color_scale_vars("secondary", theme.secondary),
    to_color_scale_vars("success", theme.success),
    to_color_scale_vars("warning", theme.warning),
    to_color_scale_vars("danger", theme.danger),
    map(
      theme.extra_css_variables,
      (_capture) => {
        return map_first(_capture, css_var);
      }
    )
  ]);
  let _pipe$1 = concat(_pipe);
  return to_css_defs(_pipe$1);
}
function to_global_styles_with_dark_mode(light_theme3, dark_theme3, dark_mode_source) {
  let light_styles = "body { " + to_css_string(light_theme3) + "}";
  let dark_styles = (() => {
    if (dark_mode_source instanceof DarkModeFromSystemPreferences) {
      return "@media (prefers-color-scheme: dark) { body { " + to_css_string(
        dark_theme3
      ) + "} }";
    } else {
      let dark_mode_class = dark_mode_source[0];
      return "body." + dark_mode_class + ", ." + dark_mode_class + " { " + to_css_string(
        dark_theme3
      ) + "}";
    }
  })();
  return theme_style(light_styles + " " + dark_styles);
}

// build/dev/javascript/example/example.mjs
function light_theme2() {
  let _pipe = light_theme();
  return with_primary(_pipe, (_) => {
    return pink2();
  });
}
function dark_theme2() {
  let _pipe = dark_theme();
  let _pipe$1 = with_base(_pipe, (_) => {
    return gray_dark();
  });
  return with_primary(_pipe$1, (_) => {
    return pink_dark();
  });
}
function theme_styles() {
  return to_global_styles_with_dark_mode(
    light_theme2(),
    dark_theme2(),
    from_system_preferences()
  );
}
function main() {
  let $ = (() => {
    let _pipe = div(
      toList([]),
      toList([
        theme_styles(),
        base_styles(),
        base_classes(),
        button(
          toList([class$("w-primary w-solid")]),
          toList([text("click me please")])
        )
      ])
    );
    let _pipe$1 = element2(_pipe);
    return start3(_pipe$1, "#app", void 0);
  })();
  if (!$.isOk()) {
    throw makeError(
      "assignment_no_match",
      "example",
      28,
      "main",
      "Assignment pattern did not match",
      { value: $ }
    );
  }
  return void 0;
}

// build/.lustre/entry.mjs
main();
