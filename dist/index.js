'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var ReactDOM = require('react-dom');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

function isObject$4(o) {
  return Object.prototype.toString.call(o) === '[object Object]';
}

function isPlainObject$1(o) {
  var ctor,prot;

  if (isObject$4(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (ctor === undefined) return true;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObject$4(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
}

// src/utils/env.ts
var NOTHING = Symbol.for("immer-nothing");
var DRAFTABLE = Symbol.for("immer-draftable");
var DRAFT_STATE = Symbol.for("immer-state");

// src/utils/errors.ts
var errors = process.env.NODE_ENV !== "production" ? [
  // All error codes, starting by 0:
  function(plugin) {
    return `The plugin for '${plugin}' has not been loaded into Immer. To enable the plugin, import and call \`enable${plugin}()\` when initializing your application.`;
  },
  function(thing) {
    return `produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '${thing}'`;
  },
  "This object has been frozen and should not be mutated",
  function(data) {
    return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + data;
  },
  "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
  "Immer forbids circular references",
  "The first or second argument to `produce` must be a function",
  "The third argument to `produce` must be a function or undefined",
  "First argument to `createDraft` must be a plain object, an array, or an immerable object",
  "First argument to `finishDraft` must be a draft returned by `createDraft`",
  function(thing) {
    return `'current' expects a draft, got: ${thing}`;
  },
  "Object.defineProperty() cannot be used on an Immer draft",
  "Object.setPrototypeOf() cannot be used on an Immer draft",
  "Immer only supports deleting array indices",
  "Immer only supports setting array indices and the 'length' property",
  function(thing) {
    return `'original' expects a draft, got: ${thing}`;
  }
  // Note: if more errors are added, the errorOffset in Patches.ts should be increased
  // See Patches.ts for additional errors
] : [];
function die(error, ...args) {
  if (process.env.NODE_ENV !== "production") {
    const e = errors[error];
    const msg = typeof e === "function" ? e.apply(null, args) : e;
    throw new Error(`[Immer] ${msg}`);
  }
  throw new Error(
    `[Immer] minified error nr: ${error}. Full error at: https://bit.ly/3cXEKWf`
  );
}

// src/utils/common.ts
var getPrototypeOf = Object.getPrototypeOf;
function isDraft(value) {
  return !!value && !!value[DRAFT_STATE];
}
function isDraftable(value) {
  if (!value)
    return false;
  return isPlainObject(value) || Array.isArray(value) || !!value[DRAFTABLE] || !!value.constructor?.[DRAFTABLE] || isMap(value) || isSet(value);
}
var objectCtorString = Object.prototype.constructor.toString();
function isPlainObject(value) {
  if (!value || typeof value !== "object")
    return false;
  const proto = getPrototypeOf(value);
  if (proto === null) {
    return true;
  }
  const Ctor = Object.hasOwnProperty.call(proto, "constructor") && proto.constructor;
  if (Ctor === Object)
    return true;
  return typeof Ctor == "function" && Function.toString.call(Ctor) === objectCtorString;
}
function each(obj, iter) {
  if (getArchtype(obj) === 0 /* Object */) {
    Reflect.ownKeys(obj).forEach((key) => {
      iter(key, obj[key], obj);
    });
  } else {
    obj.forEach((entry, index) => iter(index, entry, obj));
  }
}
function getArchtype(thing) {
  const state = thing[DRAFT_STATE];
  return state ? state.type_ : Array.isArray(thing) ? 1 /* Array */ : isMap(thing) ? 2 /* Map */ : isSet(thing) ? 3 /* Set */ : 0 /* Object */;
}
function has(thing, prop) {
  return getArchtype(thing) === 2 /* Map */ ? thing.has(prop) : Object.prototype.hasOwnProperty.call(thing, prop);
}
function set(thing, propOrOldValue, value) {
  const t = getArchtype(thing);
  if (t === 2 /* Map */)
    thing.set(propOrOldValue, value);
  else if (t === 3 /* Set */) {
    thing.add(value);
  } else
    thing[propOrOldValue] = value;
}
function is(x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}
function isMap(target) {
  return target instanceof Map;
}
function isSet(target) {
  return target instanceof Set;
}
function latest(state) {
  return state.copy_ || state.base_;
}
function shallowCopy(base, strict) {
  if (isMap(base)) {
    return new Map(base);
  }
  if (isSet(base)) {
    return new Set(base);
  }
  if (Array.isArray(base))
    return Array.prototype.slice.call(base);
  const isPlain = isPlainObject(base);
  if (strict === true || strict === "class_only" && !isPlain) {
    const descriptors = Object.getOwnPropertyDescriptors(base);
    delete descriptors[DRAFT_STATE];
    let keys = Reflect.ownKeys(descriptors);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const desc = descriptors[key];
      if (desc.writable === false) {
        desc.writable = true;
        desc.configurable = true;
      }
      if (desc.get || desc.set)
        descriptors[key] = {
          configurable: true,
          writable: true,
          // could live with !!desc.set as well here...
          enumerable: desc.enumerable,
          value: base[key]
        };
    }
    return Object.create(getPrototypeOf(base), descriptors);
  } else {
    const proto = getPrototypeOf(base);
    if (proto !== null && isPlain) {
      return { ...base };
    }
    const obj = Object.create(proto);
    return Object.assign(obj, base);
  }
}
function freeze$1(obj, deep = false) {
  if (isFrozen(obj) || isDraft(obj) || !isDraftable(obj))
    return obj;
  if (getArchtype(obj) > 1) {
    Object.defineProperties(obj, {
      set: { value: dontMutateFrozenCollections },
      add: { value: dontMutateFrozenCollections },
      clear: { value: dontMutateFrozenCollections },
      delete: { value: dontMutateFrozenCollections }
    });
  }
  Object.freeze(obj);
  if (deep)
    Object.values(obj).forEach((value) => freeze$1(value, true));
  return obj;
}
function dontMutateFrozenCollections() {
  die(2);
}
function isFrozen(obj) {
  return Object.isFrozen(obj);
}

// src/utils/plugins.ts
var plugins = {};
function getPlugin(pluginKey) {
  const plugin = plugins[pluginKey];
  if (!plugin) {
    die(0, pluginKey);
  }
  return plugin;
}

// src/core/scope.ts
var currentScope;
function getCurrentScope() {
  return currentScope;
}
function createScope(parent_, immer_) {
  return {
    drafts_: [],
    parent_,
    immer_,
    // Whenever the modified draft contains a draft from another scope, we
    // need to prevent auto-freezing so the unowned draft can be finalized.
    canAutoFreeze_: true,
    unfinalizedDrafts_: 0
  };
}
function usePatchesInScope(scope, patchListener) {
  if (patchListener) {
    getPlugin("Patches");
    scope.patches_ = [];
    scope.inversePatches_ = [];
    scope.patchListener_ = patchListener;
  }
}
function revokeScope(scope) {
  leaveScope(scope);
  scope.drafts_.forEach(revokeDraft);
  scope.drafts_ = null;
}
function leaveScope(scope) {
  if (scope === currentScope) {
    currentScope = scope.parent_;
  }
}
function enterScope(immer2) {
  return currentScope = createScope(currentScope, immer2);
}
function revokeDraft(draft) {
  const state = draft[DRAFT_STATE];
  if (state.type_ === 0 /* Object */ || state.type_ === 1 /* Array */)
    state.revoke_();
  else
    state.revoked_ = true;
}

// src/core/finalize.ts
function processResult(result, scope) {
  scope.unfinalizedDrafts_ = scope.drafts_.length;
  const baseDraft = scope.drafts_[0];
  const isReplaced = result !== void 0 && result !== baseDraft;
  if (isReplaced) {
    if (baseDraft[DRAFT_STATE].modified_) {
      revokeScope(scope);
      die(4);
    }
    if (isDraftable(result)) {
      result = finalize(scope, result);
      if (!scope.parent_)
        maybeFreeze(scope, result);
    }
    if (scope.patches_) {
      getPlugin("Patches").generateReplacementPatches_(
        baseDraft[DRAFT_STATE].base_,
        result,
        scope.patches_,
        scope.inversePatches_
      );
    }
  } else {
    result = finalize(scope, baseDraft, []);
  }
  revokeScope(scope);
  if (scope.patches_) {
    scope.patchListener_(scope.patches_, scope.inversePatches_);
  }
  return result !== NOTHING ? result : void 0;
}
function finalize(rootScope, value, path) {
  if (isFrozen(value))
    return value;
  const state = value[DRAFT_STATE];
  if (!state) {
    each(
      value,
      (key, childValue) => finalizeProperty(rootScope, state, value, key, childValue, path)
    );
    return value;
  }
  if (state.scope_ !== rootScope)
    return value;
  if (!state.modified_) {
    maybeFreeze(rootScope, state.base_, true);
    return state.base_;
  }
  if (!state.finalized_) {
    state.finalized_ = true;
    state.scope_.unfinalizedDrafts_--;
    const result = state.copy_;
    let resultEach = result;
    let isSet2 = false;
    if (state.type_ === 3 /* Set */) {
      resultEach = new Set(result);
      result.clear();
      isSet2 = true;
    }
    each(
      resultEach,
      (key, childValue) => finalizeProperty(rootScope, state, result, key, childValue, path, isSet2)
    );
    maybeFreeze(rootScope, result, false);
    if (path && rootScope.patches_) {
      getPlugin("Patches").generatePatches_(
        state,
        path,
        rootScope.patches_,
        rootScope.inversePatches_
      );
    }
  }
  return state.copy_;
}
function finalizeProperty(rootScope, parentState, targetObject, prop, childValue, rootPath, targetIsSet) {
  if (process.env.NODE_ENV !== "production" && childValue === targetObject)
    die(5);
  if (isDraft(childValue)) {
    const path = rootPath && parentState && parentState.type_ !== 3 /* Set */ && // Set objects are atomic since they have no keys.
    !has(parentState.assigned_, prop) ? rootPath.concat(prop) : void 0;
    const res = finalize(rootScope, childValue, path);
    set(targetObject, prop, res);
    if (isDraft(res)) {
      rootScope.canAutoFreeze_ = false;
    } else
      return;
  } else if (targetIsSet) {
    targetObject.add(childValue);
  }
  if (isDraftable(childValue) && !isFrozen(childValue)) {
    if (!rootScope.immer_.autoFreeze_ && rootScope.unfinalizedDrafts_ < 1) {
      return;
    }
    finalize(rootScope, childValue);
    if ((!parentState || !parentState.scope_.parent_) && typeof prop !== "symbol" && (isMap(targetObject) ? targetObject.has(prop) : Object.prototype.propertyIsEnumerable.call(targetObject, prop)))
      maybeFreeze(rootScope, childValue);
  }
}
function maybeFreeze(scope, value, deep = false) {
  if (!scope.parent_ && scope.immer_.autoFreeze_ && scope.canAutoFreeze_) {
    freeze$1(value, deep);
  }
}

// src/core/proxy.ts
function createProxyProxy(base, parent) {
  const isArray = Array.isArray(base);
  const state = {
    type_: isArray ? 1 /* Array */ : 0 /* Object */,
    // Track which produce call this is associated with.
    scope_: parent ? parent.scope_ : getCurrentScope(),
    // True for both shallow and deep changes.
    modified_: false,
    // Used during finalization.
    finalized_: false,
    // Track which properties have been assigned (true) or deleted (false).
    assigned_: {},
    // The parent draft state.
    parent_: parent,
    // The base state.
    base_: base,
    // The base proxy.
    draft_: null,
    // set below
    // The base copy with any updated values.
    copy_: null,
    // Called by the `produce` function.
    revoke_: null,
    isManual_: false
  };
  let target = state;
  let traps = objectTraps;
  if (isArray) {
    target = [state];
    traps = arrayTraps;
  }
  const { revoke, proxy } = Proxy.revocable(target, traps);
  state.draft_ = proxy;
  state.revoke_ = revoke;
  return proxy;
}
var objectTraps = {
  get(state, prop) {
    if (prop === DRAFT_STATE)
      return state;
    const source = latest(state);
    if (!has(source, prop)) {
      return readPropFromProto(state, source, prop);
    }
    const value = source[prop];
    if (state.finalized_ || !isDraftable(value)) {
      return value;
    }
    if (value === peek(state.base_, prop)) {
      prepareCopy(state);
      return state.copy_[prop] = createProxy(value, state);
    }
    return value;
  },
  has(state, prop) {
    return prop in latest(state);
  },
  ownKeys(state) {
    return Reflect.ownKeys(latest(state));
  },
  set(state, prop, value) {
    const desc = getDescriptorFromProto(latest(state), prop);
    if (desc?.set) {
      desc.set.call(state.draft_, value);
      return true;
    }
    if (!state.modified_) {
      const current2 = peek(latest(state), prop);
      const currentState = current2?.[DRAFT_STATE];
      if (currentState && currentState.base_ === value) {
        state.copy_[prop] = value;
        state.assigned_[prop] = false;
        return true;
      }
      if (is(value, current2) && (value !== void 0 || has(state.base_, prop)))
        return true;
      prepareCopy(state);
      markChanged(state);
    }
    if (state.copy_[prop] === value && // special case: handle new props with value 'undefined'
    (value !== void 0 || prop in state.copy_) || // special case: NaN
    Number.isNaN(value) && Number.isNaN(state.copy_[prop]))
      return true;
    state.copy_[prop] = value;
    state.assigned_[prop] = true;
    return true;
  },
  deleteProperty(state, prop) {
    if (peek(state.base_, prop) !== void 0 || prop in state.base_) {
      state.assigned_[prop] = false;
      prepareCopy(state);
      markChanged(state);
    } else {
      delete state.assigned_[prop];
    }
    if (state.copy_) {
      delete state.copy_[prop];
    }
    return true;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(state, prop) {
    const owner = latest(state);
    const desc = Reflect.getOwnPropertyDescriptor(owner, prop);
    if (!desc)
      return desc;
    return {
      writable: true,
      configurable: state.type_ !== 1 /* Array */ || prop !== "length",
      enumerable: desc.enumerable,
      value: owner[prop]
    };
  },
  defineProperty() {
    die(11);
  },
  getPrototypeOf(state) {
    return getPrototypeOf(state.base_);
  },
  setPrototypeOf() {
    die(12);
  }
};
var arrayTraps = {};
each(objectTraps, (key, fn) => {
  arrayTraps[key] = function() {
    arguments[0] = arguments[0][0];
    return fn.apply(this, arguments);
  };
});
arrayTraps.deleteProperty = function(state, prop) {
  if (process.env.NODE_ENV !== "production" && isNaN(parseInt(prop)))
    die(13);
  return arrayTraps.set.call(this, state, prop, void 0);
};
arrayTraps.set = function(state, prop, value) {
  if (process.env.NODE_ENV !== "production" && prop !== "length" && isNaN(parseInt(prop)))
    die(14);
  return objectTraps.set.call(this, state[0], prop, value, state[0]);
};
function peek(draft, prop) {
  const state = draft[DRAFT_STATE];
  const source = state ? latest(state) : draft;
  return source[prop];
}
function readPropFromProto(state, source, prop) {
  const desc = getDescriptorFromProto(source, prop);
  return desc ? `value` in desc ? desc.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    desc.get?.call(state.draft_)
  ) : void 0;
}
function getDescriptorFromProto(source, prop) {
  if (!(prop in source))
    return void 0;
  let proto = getPrototypeOf(source);
  while (proto) {
    const desc = Object.getOwnPropertyDescriptor(proto, prop);
    if (desc)
      return desc;
    proto = getPrototypeOf(proto);
  }
  return void 0;
}
function markChanged(state) {
  if (!state.modified_) {
    state.modified_ = true;
    if (state.parent_) {
      markChanged(state.parent_);
    }
  }
}
function prepareCopy(state) {
  if (!state.copy_) {
    state.copy_ = shallowCopy(
      state.base_,
      state.scope_.immer_.useStrictShallowCopy_
    );
  }
}

// src/core/immerClass.ts
var Immer2 = class {
  constructor(config) {
    this.autoFreeze_ = true;
    this.useStrictShallowCopy_ = false;
    /**
     * The `produce` function takes a value and a "recipe function" (whose
     * return value often depends on the base state). The recipe function is
     * free to mutate its first argument however it wants. All mutations are
     * only ever applied to a __copy__ of the base state.
     *
     * Pass only a function to create a "curried producer" which relieves you
     * from passing the recipe function every time.
     *
     * Only plain objects and arrays are made mutable. All other objects are
     * considered uncopyable.
     *
     * Note: This function is __bound__ to its `Immer` instance.
     *
     * @param {any} base - the initial state
     * @param {Function} recipe - function that receives a proxy of the base state as first argument and which can be freely modified
     * @param {Function} patchListener - optional function that will be called with all the patches produced here
     * @returns {any} a new state, or the initial state if nothing was modified
     */
    this.produce = (base, recipe, patchListener) => {
      if (typeof base === "function" && typeof recipe !== "function") {
        const defaultBase = recipe;
        recipe = base;
        const self = this;
        return function curriedProduce(base2 = defaultBase, ...args) {
          return self.produce(base2, (draft) => recipe.call(this, draft, ...args));
        };
      }
      if (typeof recipe !== "function")
        die(6);
      if (patchListener !== void 0 && typeof patchListener !== "function")
        die(7);
      let result;
      if (isDraftable(base)) {
        const scope = enterScope(this);
        const proxy = createProxy(base, void 0);
        let hasError = true;
        try {
          result = recipe(proxy);
          hasError = false;
        } finally {
          if (hasError)
            revokeScope(scope);
          else
            leaveScope(scope);
        }
        usePatchesInScope(scope, patchListener);
        return processResult(result, scope);
      } else if (!base || typeof base !== "object") {
        result = recipe(base);
        if (result === void 0)
          result = base;
        if (result === NOTHING)
          result = void 0;
        if (this.autoFreeze_)
          freeze$1(result, true);
        if (patchListener) {
          const p = [];
          const ip = [];
          getPlugin("Patches").generateReplacementPatches_(base, result, p, ip);
          patchListener(p, ip);
        }
        return result;
      } else
        die(1, base);
    };
    this.produceWithPatches = (base, recipe) => {
      if (typeof base === "function") {
        return (state, ...args) => this.produceWithPatches(state, (draft) => base(draft, ...args));
      }
      let patches, inversePatches;
      const result = this.produce(base, recipe, (p, ip) => {
        patches = p;
        inversePatches = ip;
      });
      return [result, patches, inversePatches];
    };
    if (typeof config?.autoFreeze === "boolean")
      this.setAutoFreeze(config.autoFreeze);
    if (typeof config?.useStrictShallowCopy === "boolean")
      this.setUseStrictShallowCopy(config.useStrictShallowCopy);
  }
  createDraft(base) {
    if (!isDraftable(base))
      die(8);
    if (isDraft(base))
      base = current(base);
    const scope = enterScope(this);
    const proxy = createProxy(base, void 0);
    proxy[DRAFT_STATE].isManual_ = true;
    leaveScope(scope);
    return proxy;
  }
  finishDraft(draft, patchListener) {
    const state = draft && draft[DRAFT_STATE];
    if (!state || !state.isManual_)
      die(9);
    const { scope_: scope } = state;
    usePatchesInScope(scope, patchListener);
    return processResult(void 0, scope);
  }
  /**
   * Pass true to automatically freeze all copies created by Immer.
   *
   * By default, auto-freezing is enabled.
   */
  setAutoFreeze(value) {
    this.autoFreeze_ = value;
  }
  /**
   * Pass true to enable strict shallow copy.
   *
   * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
   */
  setUseStrictShallowCopy(value) {
    this.useStrictShallowCopy_ = value;
  }
  applyPatches(base, patches) {
    let i;
    for (i = patches.length - 1; i >= 0; i--) {
      const patch = patches[i];
      if (patch.path.length === 0 && patch.op === "replace") {
        base = patch.value;
        break;
      }
    }
    if (i > -1) {
      patches = patches.slice(i + 1);
    }
    const applyPatchesImpl = getPlugin("Patches").applyPatches_;
    if (isDraft(base)) {
      return applyPatchesImpl(base, patches);
    }
    return this.produce(
      base,
      (draft) => applyPatchesImpl(draft, patches)
    );
  }
};
function createProxy(value, parent) {
  const draft = isMap(value) ? getPlugin("MapSet").proxyMap_(value, parent) : isSet(value) ? getPlugin("MapSet").proxySet_(value, parent) : createProxyProxy(value, parent);
  const scope = parent ? parent.scope_ : getCurrentScope();
  scope.drafts_.push(draft);
  return draft;
}

// src/core/current.ts
function current(value) {
  if (!isDraft(value))
    die(10, value);
  return currentImpl(value);
}
function currentImpl(value) {
  if (!isDraftable(value) || isFrozen(value))
    return value;
  const state = value[DRAFT_STATE];
  let copy;
  if (state) {
    if (!state.modified_)
      return state.base_;
    state.finalized_ = true;
    copy = shallowCopy(value, state.scope_.immer_.useStrictShallowCopy_);
  } else {
    copy = shallowCopy(value, true);
  }
  each(copy, (key, childValue) => {
    set(copy, key, currentImpl(childValue));
  });
  if (state) {
    state.finalized_ = false;
  }
  return copy;
}

// src/immer.ts
var immer = new Immer2();
var produce = immer.produce;
var createDraft = /* @__PURE__ */ immer.createDraft.bind(immer);
var finishDraft = /* @__PURE__ */ immer.finishDraft.bind(immer);

// eslint-disable-next-line no-redeclare
var PathRef = {
  transform(ref, op) {
    var {
      current,
      affinity
    } = ref;
    if (current == null) {
      return;
    }
    var path = Path.transform(current, op, {
      affinity
    });
    ref.current = path;
    if (path == null) {
      ref.unref();
    }
  }
};

// eslint-disable-next-line no-redeclare
var PointRef = {
  transform(ref, op) {
    var {
      current,
      affinity
    } = ref;
    if (current == null) {
      return;
    }
    var point = Point.transform(current, op, {
      affinity
    });
    ref.current = point;
    if (point == null) {
      ref.unref();
    }
  }
};

// eslint-disable-next-line no-redeclare
var RangeRef = {
  transform(ref, op) {
    var {
      current,
      affinity
    } = ref;
    if (current == null) {
      return;
    }
    var path = Range.transform(current, op, {
      affinity
    });
    ref.current = path;
    if (path == null) {
      ref.unref();
    }
  }
};

var DIRTY_PATHS = new WeakMap();
var DIRTY_PATH_KEYS = new WeakMap();
var FLUSHING = new WeakMap();
var NORMALIZING = new WeakMap();
var PATH_REFS = new WeakMap();
var POINT_REFS = new WeakMap();
var RANGE_REFS = new WeakMap();

// eslint-disable-next-line no-redeclare
var Path = {
  ancestors(path) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var {
      reverse = false
    } = options;
    var paths = Path.levels(path, options);
    if (reverse) {
      paths = paths.slice(1);
    } else {
      paths = paths.slice(0, -1);
    }
    return paths;
  },
  common(path, another) {
    var common = [];
    for (var i = 0; i < path.length && i < another.length; i++) {
      var av = path[i];
      var bv = another[i];
      if (av !== bv) {
        break;
      }
      common.push(av);
    }
    return common;
  },
  compare(path, another) {
    var min = Math.min(path.length, another.length);
    for (var i = 0; i < min; i++) {
      if (path[i] < another[i]) return -1;
      if (path[i] > another[i]) return 1;
    }
    return 0;
  },
  endsAfter(path, another) {
    var i = path.length - 1;
    var as = path.slice(0, i);
    var bs = another.slice(0, i);
    var av = path[i];
    var bv = another[i];
    return Path.equals(as, bs) && av > bv;
  },
  endsAt(path, another) {
    var i = path.length;
    var as = path.slice(0, i);
    var bs = another.slice(0, i);
    return Path.equals(as, bs);
  },
  endsBefore(path, another) {
    var i = path.length - 1;
    var as = path.slice(0, i);
    var bs = another.slice(0, i);
    var av = path[i];
    var bv = another[i];
    return Path.equals(as, bs) && av < bv;
  },
  equals(path, another) {
    return path.length === another.length && path.every((n, i) => n === another[i]);
  },
  hasPrevious(path) {
    return path[path.length - 1] > 0;
  },
  isAfter(path, another) {
    return Path.compare(path, another) === 1;
  },
  isAncestor(path, another) {
    return path.length < another.length && Path.compare(path, another) === 0;
  },
  isBefore(path, another) {
    return Path.compare(path, another) === -1;
  },
  isChild(path, another) {
    return path.length === another.length + 1 && Path.compare(path, another) === 0;
  },
  isCommon(path, another) {
    return path.length <= another.length && Path.compare(path, another) === 0;
  },
  isDescendant(path, another) {
    return path.length > another.length && Path.compare(path, another) === 0;
  },
  isParent(path, another) {
    return path.length + 1 === another.length && Path.compare(path, another) === 0;
  },
  isPath(value) {
    return Array.isArray(value) && (value.length === 0 || typeof value[0] === 'number');
  },
  isSibling(path, another) {
    if (path.length !== another.length) {
      return false;
    }
    var as = path.slice(0, -1);
    var bs = another.slice(0, -1);
    var al = path[path.length - 1];
    var bl = another[another.length - 1];
    return al !== bl && Path.equals(as, bs);
  },
  levels(path) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var {
      reverse = false
    } = options;
    var list = [];
    for (var i = 0; i <= path.length; i++) {
      list.push(path.slice(0, i));
    }
    if (reverse) {
      list.reverse();
    }
    return list;
  },
  next(path) {
    if (path.length === 0) {
      throw new Error("Cannot get the next path of a root path [".concat(path, "], because it has no next index."));
    }
    var last = path[path.length - 1];
    return path.slice(0, -1).concat(last + 1);
  },
  operationCanTransformPath(operation) {
    switch (operation.type) {
      case 'insert_node':
      case 'remove_node':
      case 'merge_node':
      case 'split_node':
      case 'move_node':
        return true;
      default:
        return false;
    }
  },
  parent(path) {
    if (path.length === 0) {
      throw new Error("Cannot get the parent path of the root path [".concat(path, "]."));
    }
    return path.slice(0, -1);
  },
  previous(path) {
    if (path.length === 0) {
      throw new Error("Cannot get the previous path of a root path [".concat(path, "], because it has no previous index."));
    }
    var last = path[path.length - 1];
    if (last <= 0) {
      throw new Error("Cannot get the previous path of a first child path [".concat(path, "] because it would result in a negative index."));
    }
    return path.slice(0, -1).concat(last - 1);
  },
  relative(path, ancestor) {
    if (!Path.isAncestor(ancestor, path) && !Path.equals(path, ancestor)) {
      throw new Error("Cannot get the relative path of [".concat(path, "] inside ancestor [").concat(ancestor, "], because it is not above or equal to the path."));
    }
    return path.slice(ancestor.length);
  },
  transform(path, operation) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    if (!path) return null;
    // PERF: use destructing instead of immer
    var p = [...path];
    var {
      affinity = 'forward'
    } = options;
    // PERF: Exit early if the operation is guaranteed not to have an effect.
    if (path.length === 0) {
      return p;
    }
    switch (operation.type) {
      case 'insert_node':
        {
          var {
            path: op
          } = operation;
          if (Path.equals(op, p) || Path.endsBefore(op, p) || Path.isAncestor(op, p)) {
            p[op.length - 1] += 1;
          }
          break;
        }
      case 'remove_node':
        {
          var {
            path: _op
          } = operation;
          if (Path.equals(_op, p) || Path.isAncestor(_op, p)) {
            return null;
          } else if (Path.endsBefore(_op, p)) {
            p[_op.length - 1] -= 1;
          }
          break;
        }
      case 'merge_node':
        {
          var {
            path: _op2,
            position
          } = operation;
          if (Path.equals(_op2, p) || Path.endsBefore(_op2, p)) {
            p[_op2.length - 1] -= 1;
          } else if (Path.isAncestor(_op2, p)) {
            p[_op2.length - 1] -= 1;
            p[_op2.length] += position;
          }
          break;
        }
      case 'split_node':
        {
          var {
            path: _op3,
            position: _position
          } = operation;
          if (Path.equals(_op3, p)) {
            if (affinity === 'forward') {
              p[p.length - 1] += 1;
            } else if (affinity === 'backward') ; else {
              return null;
            }
          } else if (Path.endsBefore(_op3, p)) {
            p[_op3.length - 1] += 1;
          } else if (Path.isAncestor(_op3, p) && path[_op3.length] >= _position) {
            p[_op3.length - 1] += 1;
            p[_op3.length] -= _position;
          }
          break;
        }
      case 'move_node':
        {
          var {
            path: _op4,
            newPath: onp
          } = operation;
          // If the old and new path are the same, it's a no-op.
          if (Path.equals(_op4, onp)) {
            return p;
          }
          if (Path.isAncestor(_op4, p) || Path.equals(_op4, p)) {
            var copy = onp.slice();
            if (Path.endsBefore(_op4, onp) && _op4.length < onp.length) {
              copy[_op4.length - 1] -= 1;
            }
            return copy.concat(p.slice(_op4.length));
          } else if (Path.isSibling(_op4, onp) && (Path.isAncestor(onp, p) || Path.equals(onp, p))) {
            if (Path.endsBefore(_op4, p)) {
              p[_op4.length - 1] -= 1;
            } else {
              p[_op4.length - 1] += 1;
            }
          } else if (Path.endsBefore(onp, p) || Path.equals(onp, p) || Path.isAncestor(onp, p)) {
            if (Path.endsBefore(_op4, p)) {
              p[_op4.length - 1] -= 1;
            }
            p[onp.length - 1] += 1;
          } else if (Path.endsBefore(_op4, p)) {
            if (Path.equals(onp, p)) {
              p[onp.length - 1] += 1;
            }
            p[_op4.length - 1] -= 1;
          }
          break;
        }
    }
    return p;
  }
};

function _typeof$1(o) {
  "@babel/helpers - typeof";

  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof$1(o);
}

function _toPrimitive$1(input, hint) {
  if (_typeof$1(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint);
    if (_typeof$1(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey$1(arg) {
  var key = _toPrimitive$1(arg, "string");
  return _typeof$1(key) === "symbol" ? key : String(key);
}

function _defineProperty$1(obj, key, value) {
  key = _toPropertyKey$1(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function ownKeys$e(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$e(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$e(Object(t), true).forEach(function (r) { _defineProperty$1(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$e(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var applyToDraft = (editor, selection, op) => {
  switch (op.type) {
    case 'insert_node':
      {
        var {
          path,
          node
        } = op;
        var parent = Node.parent(editor, path);
        var index = path[path.length - 1];
        if (index > parent.children.length) {
          throw new Error("Cannot apply an \"insert_node\" operation at path [".concat(path, "] because the destination is past the end of the node."));
        }
        parent.children.splice(index, 0, node);
        if (selection) {
          for (var [point, key] of Range.points(selection)) {
            selection[key] = Point.transform(point, op);
          }
        }
        break;
      }
    case 'insert_text':
      {
        var {
          path: _path,
          offset,
          text
        } = op;
        if (text.length === 0) break;
        var _node = Node.leaf(editor, _path);
        var before = _node.text.slice(0, offset);
        var after = _node.text.slice(offset);
        _node.text = before + text + after;
        if (selection) {
          for (var [_point, _key] of Range.points(selection)) {
            selection[_key] = Point.transform(_point, op);
          }
        }
        break;
      }
    case 'merge_node':
      {
        var {
          path: _path2
        } = op;
        var _node2 = Node.get(editor, _path2);
        var prevPath = Path.previous(_path2);
        var prev = Node.get(editor, prevPath);
        var _parent = Node.parent(editor, _path2);
        var _index = _path2[_path2.length - 1];
        if (Text$1.isText(_node2) && Text$1.isText(prev)) {
          prev.text += _node2.text;
        } else if (!Text$1.isText(_node2) && !Text$1.isText(prev)) {
          prev.children.push(..._node2.children);
        } else {
          throw new Error("Cannot apply a \"merge_node\" operation at path [".concat(_path2, "] to nodes of different interfaces: ").concat(Scrubber.stringify(_node2), " ").concat(Scrubber.stringify(prev)));
        }
        _parent.children.splice(_index, 1);
        if (selection) {
          for (var [_point2, _key2] of Range.points(selection)) {
            selection[_key2] = Point.transform(_point2, op);
          }
        }
        break;
      }
    case 'move_node':
      {
        var {
          path: _path3,
          newPath
        } = op;
        if (Path.isAncestor(_path3, newPath)) {
          throw new Error("Cannot move a path [".concat(_path3, "] to new path [").concat(newPath, "] because the destination is inside itself."));
        }
        var _node3 = Node.get(editor, _path3);
        var _parent2 = Node.parent(editor, _path3);
        var _index2 = _path3[_path3.length - 1];
        // This is tricky, but since the `path` and `newPath` both refer to
        // the same snapshot in time, there's a mismatch. After either
        // removing the original position, the second step's path can be out
        // of date. So instead of using the `op.newPath` directly, we
        // transform `op.path` to ascertain what the `newPath` would be after
        // the operation was applied.
        _parent2.children.splice(_index2, 1);
        var truePath = Path.transform(_path3, op);
        var newParent = Node.get(editor, Path.parent(truePath));
        var newIndex = truePath[truePath.length - 1];
        newParent.children.splice(newIndex, 0, _node3);
        if (selection) {
          for (var [_point3, _key3] of Range.points(selection)) {
            selection[_key3] = Point.transform(_point3, op);
          }
        }
        break;
      }
    case 'remove_node':
      {
        var {
          path: _path4
        } = op;
        var _index3 = _path4[_path4.length - 1];
        var _parent3 = Node.parent(editor, _path4);
        _parent3.children.splice(_index3, 1);
        // Transform all the points in the value, but if the point was in the
        // node that was removed we need to update the range or remove it.
        if (selection) {
          for (var [_point4, _key4] of Range.points(selection)) {
            var result = Point.transform(_point4, op);
            if (selection != null && result != null) {
              selection[_key4] = result;
            } else {
              var _prev = void 0;
              var next = void 0;
              for (var [n, p] of Node.texts(editor)) {
                if (Path.compare(p, _path4) === -1) {
                  _prev = [n, p];
                } else {
                  next = [n, p];
                  break;
                }
              }
              var preferNext = false;
              if (_prev && next) {
                if (Path.equals(next[1], _path4)) {
                  preferNext = !Path.hasPrevious(next[1]);
                } else {
                  preferNext = Path.common(_prev[1], _path4).length < Path.common(next[1], _path4).length;
                }
              }
              if (_prev && !preferNext) {
                _point4.path = _prev[1];
                _point4.offset = _prev[0].text.length;
              } else if (next) {
                _point4.path = next[1];
                _point4.offset = 0;
              } else {
                selection = null;
              }
            }
          }
        }
        break;
      }
    case 'remove_text':
      {
        var {
          path: _path5,
          offset: _offset,
          text: _text
        } = op;
        if (_text.length === 0) break;
        var _node4 = Node.leaf(editor, _path5);
        var _before = _node4.text.slice(0, _offset);
        var _after = _node4.text.slice(_offset + _text.length);
        _node4.text = _before + _after;
        if (selection) {
          for (var [_point5, _key5] of Range.points(selection)) {
            selection[_key5] = Point.transform(_point5, op);
          }
        }
        break;
      }
    case 'set_node':
      {
        var {
          path: _path6,
          properties,
          newProperties
        } = op;
        if (_path6.length === 0) {
          throw new Error("Cannot set properties on the root node!");
        }
        var _node5 = Node.get(editor, _path6);
        for (var _key6 in newProperties) {
          if (_key6 === 'children' || _key6 === 'text') {
            throw new Error("Cannot set the \"".concat(_key6, "\" property of nodes!"));
          }
          var value = newProperties[_key6];
          if (value == null) {
            delete _node5[_key6];
          } else {
            _node5[_key6] = value;
          }
        }
        // properties that were previously defined, but are now missing, must be deleted
        for (var _key7 in properties) {
          if (!newProperties.hasOwnProperty(_key7)) {
            delete _node5[_key7];
          }
        }
        break;
      }
    case 'set_selection':
      {
        var {
          newProperties: _newProperties
        } = op;
        if (_newProperties == null) {
          selection = _newProperties;
        } else {
          if (selection == null) {
            if (!Range.isRange(_newProperties)) {
              throw new Error("Cannot apply an incomplete \"set_selection\" operation properties ".concat(Scrubber.stringify(_newProperties), " when there is no current selection."));
            }
            selection = _objectSpread$e({}, _newProperties);
          }
          for (var _key8 in _newProperties) {
            var _value = _newProperties[_key8];
            if (_value == null) {
              if (_key8 === 'anchor' || _key8 === 'focus') {
                throw new Error("Cannot remove the \"".concat(_key8, "\" selection property"));
              }
              delete selection[_key8];
            } else {
              selection[_key8] = _value;
            }
          }
        }
        break;
      }
    case 'split_node':
      {
        var {
          path: _path7,
          position,
          properties: _properties
        } = op;
        if (_path7.length === 0) {
          throw new Error("Cannot apply a \"split_node\" operation at path [".concat(_path7, "] because the root node cannot be split."));
        }
        var _node6 = Node.get(editor, _path7);
        var _parent4 = Node.parent(editor, _path7);
        var _index4 = _path7[_path7.length - 1];
        var newNode;
        if (Text$1.isText(_node6)) {
          var _before2 = _node6.text.slice(0, position);
          var _after2 = _node6.text.slice(position);
          _node6.text = _before2;
          newNode = _objectSpread$e(_objectSpread$e({}, _properties), {}, {
            text: _after2
          });
        } else {
          var _before3 = _node6.children.slice(0, position);
          var _after3 = _node6.children.slice(position);
          _node6.children = _before3;
          newNode = _objectSpread$e(_objectSpread$e({}, _properties), {}, {
            children: _after3
          });
        }
        _parent4.children.splice(_index4 + 1, 0, newNode);
        if (selection) {
          for (var [_point6, _key9] of Range.points(selection)) {
            selection[_key9] = Point.transform(_point6, op);
          }
        }
        break;
      }
  }
  return selection;
};
// eslint-disable-next-line no-redeclare
var GeneralTransforms = {
  transform(editor, op) {
    editor.children = createDraft(editor.children);
    var selection = editor.selection && createDraft(editor.selection);
    try {
      selection = applyToDraft(editor, selection, op);
    } finally {
      editor.children = finishDraft(editor.children);
      if (selection) {
        editor.selection = isDraft(selection) ? finishDraft(selection) : selection;
      } else {
        editor.selection = null;
      }
    }
  }
};

// eslint-disable-next-line no-redeclare
var NodeTransforms = {
  insertNodes(editor, nodes, options) {
    editor.insertNodes(nodes, options);
  },
  liftNodes(editor, options) {
    editor.liftNodes(options);
  },
  mergeNodes(editor, options) {
    editor.mergeNodes(options);
  },
  moveNodes(editor, options) {
    editor.moveNodes(options);
  },
  removeNodes(editor, options) {
    editor.removeNodes(options);
  },
  setNodes(editor, props, options) {
    editor.setNodes(props, options);
  },
  splitNodes(editor, options) {
    editor.splitNodes(options);
  },
  unsetNodes(editor, props, options) {
    editor.unsetNodes(props, options);
  },
  unwrapNodes(editor, options) {
    editor.unwrapNodes(options);
  },
  wrapNodes(editor, element, options) {
    editor.wrapNodes(element, options);
  }
};

// eslint-disable-next-line no-redeclare
var SelectionTransforms = {
  collapse(editor, options) {
    editor.collapse(options);
  },
  deselect(editor) {
    editor.deselect();
  },
  move(editor, options) {
    editor.move(options);
  },
  select(editor, target) {
    editor.select(target);
  },
  setPoint(editor, props, options) {
    editor.setPoint(props, options);
  },
  setSelection(editor, props) {
    editor.setSelection(props);
  }
};

/*
  Custom deep equal comparison for Slate nodes.

  We don't need general purpose deep equality;
  Slate only supports plain values, Arrays, and nested objects.
  Complex values nested inside Arrays are not supported.

  Slate objects are designed to be serialised, so
  missing keys are deliberately normalised to undefined.
 */
var isDeepEqual = (node, another) => {
  for (var key in node) {
    var a = node[key];
    var b = another[key];
    if (isPlainObject$1(a) && isPlainObject$1(b)) {
      if (!isDeepEqual(a, b)) return false;
    } else if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      for (var i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
      }
    } else if (a !== b) {
      return false;
    }
  }
  /*
    Deep object equality is only necessary in one direction; in the reverse direction
    we are only looking for keys that are missing.
    As above, undefined keys are normalised to missing.
  */
  for (var _key in another) {
    if (node[_key] === undefined && another[_key] !== undefined) {
      return false;
    }
  }
  return true;
};

function _objectWithoutPropertiesLoose$1(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

function _objectWithoutProperties$1(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose$1(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}

var _excluded$4 = ["anchor", "focus"];
function ownKeys$d(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$d(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$d(Object(t), true).forEach(function (r) { _defineProperty$1(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$d(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
// eslint-disable-next-line no-redeclare
var Range = {
  edges(range) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var {
      reverse = false
    } = options;
    var {
      anchor,
      focus
    } = range;
    return Range.isBackward(range) === reverse ? [anchor, focus] : [focus, anchor];
  },
  end(range) {
    var [, end] = Range.edges(range);
    return end;
  },
  equals(range, another) {
    return Point.equals(range.anchor, another.anchor) && Point.equals(range.focus, another.focus);
  },
  includes(range, target) {
    if (Range.isRange(target)) {
      if (Range.includes(range, target.anchor) || Range.includes(range, target.focus)) {
        return true;
      }
      var [rs, re] = Range.edges(range);
      var [ts, te] = Range.edges(target);
      return Point.isBefore(rs, ts) && Point.isAfter(re, te);
    }
    var [start, end] = Range.edges(range);
    var isAfterStart = false;
    var isBeforeEnd = false;
    if (Point.isPoint(target)) {
      isAfterStart = Point.compare(target, start) >= 0;
      isBeforeEnd = Point.compare(target, end) <= 0;
    } else {
      isAfterStart = Path.compare(target, start.path) >= 0;
      isBeforeEnd = Path.compare(target, end.path) <= 0;
    }
    return isAfterStart && isBeforeEnd;
  },
  intersection(range, another) {
    var rest = _objectWithoutProperties$1(range, _excluded$4);
    var [s1, e1] = Range.edges(range);
    var [s2, e2] = Range.edges(another);
    var start = Point.isBefore(s1, s2) ? s2 : s1;
    var end = Point.isBefore(e1, e2) ? e1 : e2;
    if (Point.isBefore(end, start)) {
      return null;
    } else {
      return _objectSpread$d({
        anchor: start,
        focus: end
      }, rest);
    }
  },
  isBackward(range) {
    var {
      anchor,
      focus
    } = range;
    return Point.isAfter(anchor, focus);
  },
  isCollapsed(range) {
    var {
      anchor,
      focus
    } = range;
    return Point.equals(anchor, focus);
  },
  isExpanded(range) {
    return !Range.isCollapsed(range);
  },
  isForward(range) {
    return !Range.isBackward(range);
  },
  isRange(value) {
    return isPlainObject$1(value) && Point.isPoint(value.anchor) && Point.isPoint(value.focus);
  },
  *points(range) {
    yield [range.anchor, 'anchor'];
    yield [range.focus, 'focus'];
  },
  start(range) {
    var [start] = Range.edges(range);
    return start;
  },
  transform(range, op) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return produce(range, r => {
      if (r === null) {
        return null;
      }
      var {
        affinity = 'inward'
      } = options;
      var affinityAnchor;
      var affinityFocus;
      if (affinity === 'inward') {
        // If the range is collapsed, make sure to use the same affinity to
        // avoid the two points passing each other and expanding in the opposite
        // direction
        var isCollapsed = Range.isCollapsed(r);
        if (Range.isForward(r)) {
          affinityAnchor = 'forward';
          affinityFocus = isCollapsed ? affinityAnchor : 'backward';
        } else {
          affinityAnchor = 'backward';
          affinityFocus = isCollapsed ? affinityAnchor : 'forward';
        }
      } else if (affinity === 'outward') {
        if (Range.isForward(r)) {
          affinityAnchor = 'backward';
          affinityFocus = 'forward';
        } else {
          affinityAnchor = 'forward';
          affinityFocus = 'backward';
        }
      } else {
        affinityAnchor = affinity;
        affinityFocus = affinity;
      }
      var anchor = Point.transform(r.anchor, op, {
        affinity: affinityAnchor
      });
      var focus = Point.transform(r.focus, op, {
        affinity: affinityFocus
      });
      if (!anchor || !focus) {
        return null;
      }
      r.anchor = anchor;
      r.focus = focus;
    });
  }
};

/**
 * Shared the function with isElementType utility
 */
var isElement$1 = value => {
  return isPlainObject$1(value) && Node.isNodeList(value.children) && !Editor.isEditor(value);
};
// eslint-disable-next-line no-redeclare
var Element$2 = {
  isAncestor(value) {
    return isPlainObject$1(value) && Node.isNodeList(value.children);
  },
  isElement: isElement$1,
  isElementList(value) {
    return Array.isArray(value) && value.every(val => Element$2.isElement(val));
  },
  isElementProps(props) {
    return props.children !== undefined;
  },
  isElementType: function isElementType(value, elementVal) {
    var elementKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'type';
    return isElement$1(value) && value[elementKey] === elementVal;
  },
  matches(element, props) {
    for (var key in props) {
      if (key === 'children') {
        continue;
      }
      if (element[key] !== props[key]) {
        return false;
      }
    }
    return true;
  }
};

var _excluded$3$1 = ["children"],
  _excluded2$3 = ["text"];
var IS_NODE_LIST_CACHE = new WeakMap();
// eslint-disable-next-line no-redeclare
var Node = {
  ancestor(root, path) {
    var node = Node.get(root, path);
    if (Text$1.isText(node)) {
      throw new Error("Cannot get the ancestor node at path [".concat(path, "] because it refers to a text node instead: ").concat(Scrubber.stringify(node)));
    }
    return node;
  },
  ancestors(root, path) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return function* () {
      for (var p of Path.ancestors(path, options)) {
        var n = Node.ancestor(root, p);
        var entry = [n, p];
        yield entry;
      }
    }();
  },
  child(root, index) {
    if (Text$1.isText(root)) {
      throw new Error("Cannot get the child of a text node: ".concat(Scrubber.stringify(root)));
    }
    var c = root.children[index];
    if (c == null) {
      throw new Error("Cannot get child at index `".concat(index, "` in node: ").concat(Scrubber.stringify(root)));
    }
    return c;
  },
  children(root, path) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return function* () {
      var {
        reverse = false
      } = options;
      var ancestor = Node.ancestor(root, path);
      var {
        children
      } = ancestor;
      var index = reverse ? children.length - 1 : 0;
      while (reverse ? index >= 0 : index < children.length) {
        var child = Node.child(ancestor, index);
        var childPath = path.concat(index);
        yield [child, childPath];
        index = reverse ? index - 1 : index + 1;
      }
    }();
  },
  common(root, path, another) {
    var p = Path.common(path, another);
    var n = Node.get(root, p);
    return [n, p];
  },
  descendant(root, path) {
    var node = Node.get(root, path);
    if (Editor.isEditor(node)) {
      throw new Error("Cannot get the descendant node at path [".concat(path, "] because it refers to the root editor node instead: ").concat(Scrubber.stringify(node)));
    }
    return node;
  },
  descendants(root) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return function* () {
      for (var [node, path] of Node.nodes(root, options)) {
        if (path.length !== 0) {
          // NOTE: we have to coerce here because checking the path's length does
          // guarantee that `node` is not a `Editor`, but TypeScript doesn't know.
          yield [node, path];
        }
      }
    }();
  },
  elements(root) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return function* () {
      for (var [node, path] of Node.nodes(root, options)) {
        if (Element$2.isElement(node)) {
          yield [node, path];
        }
      }
    }();
  },
  extractProps(node) {
    if (Element$2.isAncestor(node)) {
      var properties = _objectWithoutProperties$1(node, _excluded$3$1);
      return properties;
    } else {
      var properties = _objectWithoutProperties$1(node, _excluded2$3);
      return properties;
    }
  },
  first(root, path) {
    var p = path.slice();
    var n = Node.get(root, p);
    while (n) {
      if (Text$1.isText(n) || n.children.length === 0) {
        break;
      } else {
        n = n.children[0];
        p.push(0);
      }
    }
    return [n, p];
  },
  fragment(root, range) {
    if (Text$1.isText(root)) {
      throw new Error("Cannot get a fragment starting from a root text node: ".concat(Scrubber.stringify(root)));
    }
    var newRoot = produce({
      children: root.children
    }, r => {
      var [start, end] = Range.edges(range);
      var nodeEntries = Node.nodes(r, {
        reverse: true,
        pass: _ref => {
          var [, path] = _ref;
          return !Range.includes(range, path);
        }
      });
      for (var [, path] of nodeEntries) {
        if (!Range.includes(range, path)) {
          var parent = Node.parent(r, path);
          var index = path[path.length - 1];
          parent.children.splice(index, 1);
        }
        if (Path.equals(path, end.path)) {
          var leaf = Node.leaf(r, path);
          leaf.text = leaf.text.slice(0, end.offset);
        }
        if (Path.equals(path, start.path)) {
          var _leaf = Node.leaf(r, path);
          _leaf.text = _leaf.text.slice(start.offset);
        }
      }
      if (Editor.isEditor(r)) {
        r.selection = null;
      }
    });
    return newRoot.children;
  },
  get(root, path) {
    var node = root;
    for (var i = 0; i < path.length; i++) {
      var p = path[i];
      if (Text$1.isText(node) || !node.children[p]) {
        throw new Error("Cannot find a descendant at path [".concat(path, "] in node: ").concat(Scrubber.stringify(root)));
      }
      node = node.children[p];
    }
    return node;
  },
  has(root, path) {
    var node = root;
    for (var i = 0; i < path.length; i++) {
      var p = path[i];
      if (Text$1.isText(node) || !node.children[p]) {
        return false;
      }
      node = node.children[p];
    }
    return true;
  },
  isNode(value) {
    return Text$1.isText(value) || Element$2.isElement(value) || Editor.isEditor(value);
  },
  isNodeList(value) {
    if (!Array.isArray(value)) {
      return false;
    }
    var cachedResult = IS_NODE_LIST_CACHE.get(value);
    if (cachedResult !== undefined) {
      return cachedResult;
    }
    var isNodeList = value.every(val => Node.isNode(val));
    IS_NODE_LIST_CACHE.set(value, isNodeList);
    return isNodeList;
  },
  last(root, path) {
    var p = path.slice();
    var n = Node.get(root, p);
    while (n) {
      if (Text$1.isText(n) || n.children.length === 0) {
        break;
      } else {
        var i = n.children.length - 1;
        n = n.children[i];
        p.push(i);
      }
    }
    return [n, p];
  },
  leaf(root, path) {
    var node = Node.get(root, path);
    if (!Text$1.isText(node)) {
      throw new Error("Cannot get the leaf node at path [".concat(path, "] because it refers to a non-leaf node: ").concat(Scrubber.stringify(node)));
    }
    return node;
  },
  levels(root, path) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return function* () {
      for (var p of Path.levels(path, options)) {
        var n = Node.get(root, p);
        yield [n, p];
      }
    }();
  },
  matches(node, props) {
    return Element$2.isElement(node) && Element$2.isElementProps(props) && Element$2.matches(node, props) || Text$1.isText(node) && Text$1.isTextProps(props) && Text$1.matches(node, props);
  },
  nodes(root) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return function* () {
      var {
        pass,
        reverse = false
      } = options;
      var {
        from = [],
        to
      } = options;
      var visited = new Set();
      var p = [];
      var n = root;
      while (true) {
        if (to && (reverse ? Path.isBefore(p, to) : Path.isAfter(p, to))) {
          break;
        }
        if (!visited.has(n)) {
          yield [n, p];
        }
        // If we're allowed to go downward and we haven't descended yet, do.
        if (!visited.has(n) && !Text$1.isText(n) && n.children.length !== 0 && (pass == null || pass([n, p]) === false)) {
          visited.add(n);
          var nextIndex = reverse ? n.children.length - 1 : 0;
          if (Path.isAncestor(p, from)) {
            nextIndex = from[p.length];
          }
          p = p.concat(nextIndex);
          n = Node.get(root, p);
          continue;
        }
        // If we're at the root and we can't go down, we're done.
        if (p.length === 0) {
          break;
        }
        // If we're going forward...
        if (!reverse) {
          var newPath = Path.next(p);
          if (Node.has(root, newPath)) {
            p = newPath;
            n = Node.get(root, p);
            continue;
          }
        }
        // If we're going backward...
        if (reverse && p[p.length - 1] !== 0) {
          var _newPath = Path.previous(p);
          p = _newPath;
          n = Node.get(root, p);
          continue;
        }
        // Otherwise we're going upward...
        p = Path.parent(p);
        n = Node.get(root, p);
        visited.add(n);
      }
    }();
  },
  parent(root, path) {
    var parentPath = Path.parent(path);
    var p = Node.get(root, parentPath);
    if (Text$1.isText(p)) {
      throw new Error("Cannot get the parent of path [".concat(path, "] because it does not exist in the root."));
    }
    return p;
  },
  string(node) {
    if (Text$1.isText(node)) {
      return node.text;
    } else {
      return node.children.map(Node.string).join('');
    }
  },
  texts(root) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return function* () {
      for (var [node, path] of Node.nodes(root, options)) {
        if (Text$1.isText(node)) {
          yield [node, path];
        }
      }
    }();
  }
};

function ownKeys$c(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$c(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$c(Object(t), true).forEach(function (r) { _defineProperty$1(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$c(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
// eslint-disable-next-line no-redeclare
var Operation = {
  isNodeOperation(value) {
    return Operation.isOperation(value) && value.type.endsWith('_node');
  },
  isOperation(value) {
    if (!isPlainObject$1(value)) {
      return false;
    }
    switch (value.type) {
      case 'insert_node':
        return Path.isPath(value.path) && Node.isNode(value.node);
      case 'insert_text':
        return typeof value.offset === 'number' && typeof value.text === 'string' && Path.isPath(value.path);
      case 'merge_node':
        return typeof value.position === 'number' && Path.isPath(value.path) && isPlainObject$1(value.properties);
      case 'move_node':
        return Path.isPath(value.path) && Path.isPath(value.newPath);
      case 'remove_node':
        return Path.isPath(value.path) && Node.isNode(value.node);
      case 'remove_text':
        return typeof value.offset === 'number' && typeof value.text === 'string' && Path.isPath(value.path);
      case 'set_node':
        return Path.isPath(value.path) && isPlainObject$1(value.properties) && isPlainObject$1(value.newProperties);
      case 'set_selection':
        return value.properties === null && Range.isRange(value.newProperties) || value.newProperties === null && Range.isRange(value.properties) || isPlainObject$1(value.properties) && isPlainObject$1(value.newProperties);
      case 'split_node':
        return Path.isPath(value.path) && typeof value.position === 'number' && isPlainObject$1(value.properties);
      default:
        return false;
    }
  },
  isOperationList(value) {
    return Array.isArray(value) && value.every(val => Operation.isOperation(val));
  },
  isSelectionOperation(value) {
    return Operation.isOperation(value) && value.type.endsWith('_selection');
  },
  isTextOperation(value) {
    return Operation.isOperation(value) && value.type.endsWith('_text');
  },
  inverse(op) {
    switch (op.type) {
      case 'insert_node':
        {
          return _objectSpread$c(_objectSpread$c({}, op), {}, {
            type: 'remove_node'
          });
        }
      case 'insert_text':
        {
          return _objectSpread$c(_objectSpread$c({}, op), {}, {
            type: 'remove_text'
          });
        }
      case 'merge_node':
        {
          return _objectSpread$c(_objectSpread$c({}, op), {}, {
            type: 'split_node',
            path: Path.previous(op.path)
          });
        }
      case 'move_node':
        {
          var {
            newPath,
            path
          } = op;
          // PERF: in this case the move operation is a no-op anyways.
          if (Path.equals(newPath, path)) {
            return op;
          }
          // If the move happens completely within a single parent the path and
          // newPath are stable with respect to each other.
          if (Path.isSibling(path, newPath)) {
            return _objectSpread$c(_objectSpread$c({}, op), {}, {
              path: newPath,
              newPath: path
            });
          }
          // If the move does not happen within a single parent it is possible
          // for the move to impact the true path to the location where the node
          // was removed from and where it was inserted. We have to adjust for this
          // and find the original path. We can accomplish this (only in non-sibling)
          // moves by looking at the impact of the move operation on the node
          // after the original move path.
          var inversePath = Path.transform(path, op);
          var inverseNewPath = Path.transform(Path.next(path), op);
          return _objectSpread$c(_objectSpread$c({}, op), {}, {
            path: inversePath,
            newPath: inverseNewPath
          });
        }
      case 'remove_node':
        {
          return _objectSpread$c(_objectSpread$c({}, op), {}, {
            type: 'insert_node'
          });
        }
      case 'remove_text':
        {
          return _objectSpread$c(_objectSpread$c({}, op), {}, {
            type: 'insert_text'
          });
        }
      case 'set_node':
        {
          var {
            properties,
            newProperties
          } = op;
          return _objectSpread$c(_objectSpread$c({}, op), {}, {
            properties: newProperties,
            newProperties: properties
          });
        }
      case 'set_selection':
        {
          var {
            properties: _properties,
            newProperties: _newProperties
          } = op;
          if (_properties == null) {
            return _objectSpread$c(_objectSpread$c({}, op), {}, {
              properties: _newProperties,
              newProperties: null
            });
          } else if (_newProperties == null) {
            return _objectSpread$c(_objectSpread$c({}, op), {}, {
              properties: null,
              newProperties: _properties
            });
          } else {
            return _objectSpread$c(_objectSpread$c({}, op), {}, {
              properties: _newProperties,
              newProperties: _properties
            });
          }
        }
      case 'split_node':
        {
          return _objectSpread$c(_objectSpread$c({}, op), {}, {
            type: 'merge_node',
            path: Path.next(op.path)
          });
        }
    }
  }
};

var IS_EDITOR_CACHE = new WeakMap();
var isEditor = value => {
  var cachedIsEditor = IS_EDITOR_CACHE.get(value);
  if (cachedIsEditor !== undefined) {
    return cachedIsEditor;
  }
  if (!isPlainObject$1(value)) {
    return false;
  }
  var isEditor = typeof value.addMark === 'function' && typeof value.apply === 'function' && typeof value.deleteFragment === 'function' && typeof value.insertBreak === 'function' && typeof value.insertSoftBreak === 'function' && typeof value.insertFragment === 'function' && typeof value.insertNode === 'function' && typeof value.insertText === 'function' && typeof value.isElementReadOnly === 'function' && typeof value.isInline === 'function' && typeof value.isSelectable === 'function' && typeof value.isVoid === 'function' && typeof value.normalizeNode === 'function' && typeof value.onChange === 'function' && typeof value.removeMark === 'function' && typeof value.getDirtyPaths === 'function' && (value.marks === null || isPlainObject$1(value.marks)) && (value.selection === null || Range.isRange(value.selection)) && Node.isNodeList(value.children) && Operation.isOperationList(value.operations);
  IS_EDITOR_CACHE.set(value, isEditor);
  return isEditor;
};

// eslint-disable-next-line no-redeclare
var Editor = {
  above(editor, options) {
    return editor.above(options);
  },
  addMark(editor, key, value) {
    editor.addMark(key, value);
  },
  after(editor, at, options) {
    return editor.after(at, options);
  },
  before(editor, at, options) {
    return editor.before(at, options);
  },
  deleteBackward(editor) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var {
      unit = 'character'
    } = options;
    editor.deleteBackward(unit);
  },
  deleteForward(editor) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var {
      unit = 'character'
    } = options;
    editor.deleteForward(unit);
  },
  deleteFragment(editor, options) {
    editor.deleteFragment(options);
  },
  edges(editor, at) {
    return editor.edges(at);
  },
  elementReadOnly(editor) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return editor.elementReadOnly(options);
  },
  end(editor, at) {
    return editor.end(at);
  },
  first(editor, at) {
    return editor.first(at);
  },
  fragment(editor, at) {
    return editor.fragment(at);
  },
  hasBlocks(editor, element) {
    return editor.hasBlocks(element);
  },
  hasInlines(editor, element) {
    return editor.hasInlines(element);
  },
  hasPath(editor, path) {
    return editor.hasPath(path);
  },
  hasTexts(editor, element) {
    return editor.hasTexts(element);
  },
  insertBreak(editor) {
    editor.insertBreak();
  },
  insertFragment(editor, fragment, options) {
    editor.insertFragment(fragment, options);
  },
  insertNode(editor, node) {
    editor.insertNode(node);
  },
  insertSoftBreak(editor) {
    editor.insertSoftBreak();
  },
  insertText(editor, text) {
    editor.insertText(text);
  },
  isBlock(editor, value) {
    return editor.isBlock(value);
  },
  isEdge(editor, point, at) {
    return editor.isEdge(point, at);
  },
  isEditor(value) {
    return isEditor(value);
  },
  isElementReadOnly(editor, element) {
    return editor.isElementReadOnly(element);
  },
  isEmpty(editor, element) {
    return editor.isEmpty(element);
  },
  isEnd(editor, point, at) {
    return editor.isEnd(point, at);
  },
  isInline(editor, value) {
    return editor.isInline(value);
  },
  isNormalizing(editor) {
    return editor.isNormalizing();
  },
  isSelectable(editor, value) {
    return editor.isSelectable(value);
  },
  isStart(editor, point, at) {
    return editor.isStart(point, at);
  },
  isVoid(editor, value) {
    return editor.isVoid(value);
  },
  last(editor, at) {
    return editor.last(at);
  },
  leaf(editor, at, options) {
    return editor.leaf(at, options);
  },
  levels(editor, options) {
    return editor.levels(options);
  },
  marks(editor) {
    return editor.getMarks();
  },
  next(editor, options) {
    return editor.next(options);
  },
  node(editor, at, options) {
    return editor.node(at, options);
  },
  nodes(editor, options) {
    return editor.nodes(options);
  },
  normalize(editor, options) {
    editor.normalize(options);
  },
  parent(editor, at, options) {
    return editor.parent(at, options);
  },
  path(editor, at, options) {
    return editor.path(at, options);
  },
  pathRef(editor, path, options) {
    return editor.pathRef(path, options);
  },
  pathRefs(editor) {
    return editor.pathRefs();
  },
  point(editor, at, options) {
    return editor.point(at, options);
  },
  pointRef(editor, point, options) {
    return editor.pointRef(point, options);
  },
  pointRefs(editor) {
    return editor.pointRefs();
  },
  positions(editor, options) {
    return editor.positions(options);
  },
  previous(editor, options) {
    return editor.previous(options);
  },
  range(editor, at, to) {
    return editor.range(at, to);
  },
  rangeRef(editor, range, options) {
    return editor.rangeRef(range, options);
  },
  rangeRefs(editor) {
    return editor.rangeRefs();
  },
  removeMark(editor, key) {
    editor.removeMark(key);
  },
  setNormalizing(editor, isNormalizing) {
    editor.setNormalizing(isNormalizing);
  },
  start(editor, at) {
    return editor.start(at);
  },
  string(editor, at, options) {
    return editor.string(at, options);
  },
  unhangRange(editor, range, options) {
    return editor.unhangRange(range, options);
  },
  void(editor, options) {
    return editor.void(options);
  },
  withoutNormalizing(editor, fn) {
    editor.withoutNormalizing(fn);
  },
  shouldMergeNodesRemovePrevNode: (editor, prevNode, curNode) => {
    return editor.shouldMergeNodesRemovePrevNode(prevNode, curNode);
  }
};
// eslint-disable-next-line no-redeclare
var Span = {
  isSpan(value) {
    return Array.isArray(value) && value.length === 2 && value.every(Path.isPath);
  }
};

function ownKeys$b(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$b(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$b(Object(t), true).forEach(function (r) { _defineProperty$1(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$b(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
// eslint-disable-next-line no-redeclare
var Point = {
  compare(point, another) {
    var result = Path.compare(point.path, another.path);
    if (result === 0) {
      if (point.offset < another.offset) return -1;
      if (point.offset > another.offset) return 1;
      return 0;
    }
    return result;
  },
  isAfter(point, another) {
    return Point.compare(point, another) === 1;
  },
  isBefore(point, another) {
    return Point.compare(point, another) === -1;
  },
  equals(point, another) {
    // PERF: ensure the offsets are equal first since they are cheaper to check.
    return point.offset === another.offset && Path.equals(point.path, another.path);
  },
  isPoint(value) {
    return isPlainObject$1(value) && typeof value.offset === 'number' && Path.isPath(value.path);
  },
  transform(point, op) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return produce(point, p => {
      if (p === null) {
        return null;
      }
      var {
        affinity = 'forward'
      } = options;
      var {
        path,
        offset
      } = p;
      switch (op.type) {
        case 'insert_node':
        case 'move_node':
          {
            p.path = Path.transform(path, op, options);
            break;
          }
        case 'insert_text':
          {
            if (Path.equals(op.path, path) && (op.offset < offset || op.offset === offset && affinity === 'forward')) {
              p.offset += op.text.length;
            }
            break;
          }
        case 'merge_node':
          {
            if (Path.equals(op.path, path)) {
              p.offset += op.position;
            }
            p.path = Path.transform(path, op, options);
            break;
          }
        case 'remove_text':
          {
            if (Path.equals(op.path, path) && op.offset <= offset) {
              p.offset -= Math.min(offset - op.offset, op.text.length);
            }
            break;
          }
        case 'remove_node':
          {
            if (Path.equals(op.path, path) || Path.isAncestor(op.path, path)) {
              return null;
            }
            p.path = Path.transform(path, op, options);
            break;
          }
        case 'split_node':
          {
            if (Path.equals(op.path, path)) {
              if (op.position === offset && affinity == null) {
                return null;
              } else if (op.position < offset || op.position === offset && affinity === 'forward') {
                p.offset -= op.position;
                p.path = Path.transform(path, op, _objectSpread$b(_objectSpread$b({}, options), {}, {
                  affinity: 'forward'
                }));
              }
            } else {
              p.path = Path.transform(path, op, options);
            }
            break;
          }
      }
    });
  }
};

var _scrubber = undefined;
/**
 * This interface implements a stringify() function, which is used by Slate
 * internally when generating exceptions containing end user data. Developers
 * using Slate may call Scrubber.setScrubber() to alter the behavior of this
 * stringify() function.
 *
 * For example, to prevent the cleartext logging of 'text' fields within Nodes:
 *
 *    import { Scrubber } from 'slate';
 *    Scrubber.setScrubber((key, val) => {
 *      if (key === 'text') return '...scrubbed...'
 *      return val
 *    });
 *
 */
// eslint-disable-next-line no-redeclare
var Scrubber = {
  setScrubber(scrubber) {
    _scrubber = scrubber;
  },
  stringify(value) {
    return JSON.stringify(value, _scrubber);
  }
};

var _excluded$2$1 = ["text"],
  _excluded2$2 = ["anchor", "focus"];
function ownKeys$a(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$a(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$a(Object(t), true).forEach(function (r) { _defineProperty$1(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$a(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
// eslint-disable-next-line no-redeclare
var Text$1 = {
  equals(text, another) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var {
      loose = false
    } = options;
    function omitText(obj) {
      var rest = _objectWithoutProperties$1(obj, _excluded$2$1);
      return rest;
    }
    return isDeepEqual(loose ? omitText(text) : text, loose ? omitText(another) : another);
  },
  isText(value) {
    return isPlainObject$1(value) && typeof value.text === 'string';
  },
  isTextList(value) {
    return Array.isArray(value) && value.every(val => Text$1.isText(val));
  },
  isTextProps(props) {
    return props.text !== undefined;
  },
  matches(text, props) {
    for (var key in props) {
      if (key === 'text') {
        continue;
      }
      if (!text.hasOwnProperty(key) || text[key] !== props[key]) {
        return false;
      }
    }
    return true;
  },
  decorations(node, decorations) {
    var leaves = [_objectSpread$a({}, node)];
    for (var dec of decorations) {
      var rest = _objectWithoutProperties$1(dec, _excluded2$2);
      var [start, end] = Range.edges(dec);
      var next = [];
      var leafEnd = 0;
      var decorationStart = start.offset;
      var decorationEnd = end.offset;
      for (var leaf of leaves) {
        var {
          length
        } = leaf.text;
        var leafStart = leafEnd;
        leafEnd += length;
        // If the range encompasses the entire leaf, add the range.
        if (decorationStart <= leafStart && leafEnd <= decorationEnd) {
          Object.assign(leaf, rest);
          next.push(leaf);
          continue;
        }
        // If the range expanded and match the leaf, or starts after, or ends before it, continue.
        if (decorationStart !== decorationEnd && (decorationStart === leafEnd || decorationEnd === leafStart) || decorationStart > leafEnd || decorationEnd < leafStart || decorationEnd === leafStart && leafStart !== 0) {
          next.push(leaf);
          continue;
        }
        // Otherwise we need to split the leaf, at the start, end, or both,
        // and add the range to the middle intersecting section. Do the end
        // split first since we don't need to update the offset that way.
        var middle = leaf;
        var before = void 0;
        var after = void 0;
        if (decorationEnd < leafEnd) {
          var off = decorationEnd - leafStart;
          after = _objectSpread$a(_objectSpread$a({}, middle), {}, {
            text: middle.text.slice(off)
          });
          middle = _objectSpread$a(_objectSpread$a({}, middle), {}, {
            text: middle.text.slice(0, off)
          });
        }
        if (decorationStart > leafStart) {
          var _off = decorationStart - leafStart;
          before = _objectSpread$a(_objectSpread$a({}, middle), {}, {
            text: middle.text.slice(0, _off)
          });
          middle = _objectSpread$a(_objectSpread$a({}, middle), {}, {
            text: middle.text.slice(_off)
          });
        }
        Object.assign(middle, rest);
        if (before) {
          next.push(before);
        }
        next.push(middle);
        if (after) {
          next.push(after);
        }
      }
      leaves = next;
    }
    return leaves;
  }
};

/**
 * Get the default location to insert content into the editor.
 * By default, use the selection as the target location. But if there is
 * no selection, insert at the end of the document since that is such a
 * common use case when inserting from a non-selected state.
 */
var getDefaultInsertLocation = editor => {
  if (editor.selection) {
    return editor.selection;
  } else if (editor.children.length > 0) {
    return Editor.end(editor, []);
  } else {
    return [0];
  }
};

var matchPath = (editor, path) => {
  var [node] = Editor.node(editor, path);
  return n => n === node;
};

// Character (grapheme cluster) boundaries are determined according to
// the default grapheme cluster boundary specification, extended grapheme clusters variant[1].
//
// References:
//
// [1] https://www.unicode.org/reports/tr29/#Default_Grapheme_Cluster_Table
// [2] https://www.unicode.org/Public/UCD/latest/ucd/auxiliary/GraphemeBreakProperty.txt
// [3] https://www.unicode.org/Public/UCD/latest/ucd/auxiliary/GraphemeBreakTest.html
// [4] https://www.unicode.org/Public/UCD/latest/ucd/auxiliary/GraphemeBreakTest.txt
/**
 * Get the distance to the end of the first character in a string of text.
 */
var getCharacterDistance = function getCharacterDistance(str) {
  var isRTL = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var isLTR = !isRTL;
  var codepoints = isRTL ? codepointsIteratorRTL(str) : str;
  var left = CodepointType.None;
  var right = CodepointType.None;
  var distance = 0;
  // Evaluation of these conditions are deferred.
  var gb11 = null; // Is GB11 applicable?
  var gb12Or13 = null; // Is GB12 or GB13 applicable?
  for (var char of codepoints) {
    var code = char.codePointAt(0);
    if (!code) break;
    var type = getCodepointType(char, code);
    [left, right] = isLTR ? [right, type] : [type, left];
    if (intersects(left, CodepointType.ZWJ) && intersects(right, CodepointType.ExtPict)) {
      if (isLTR) {
        gb11 = endsWithEmojiZWJ(str.substring(0, distance));
      } else {
        gb11 = endsWithEmojiZWJ(str.substring(0, str.length - distance));
      }
      if (!gb11) break;
    }
    if (intersects(left, CodepointType.RI) && intersects(right, CodepointType.RI)) {
      if (gb12Or13 !== null) {
        gb12Or13 = !gb12Or13;
      } else {
        if (isLTR) {
          gb12Or13 = true;
        } else {
          gb12Or13 = endsWithOddNumberOfRIs(str.substring(0, str.length - distance));
        }
      }
      if (!gb12Or13) break;
    }
    if (left !== CodepointType.None && right !== CodepointType.None && isBoundaryPair(left, right)) {
      break;
    }
    distance += char.length;
  }
  return distance || 1;
};
var SPACE = /\s/;
var PUNCTUATION = /[\u002B\u0021-\u0023\u0025-\u002A\u002C-\u002F\u003A\u003B\u003F\u0040\u005B-\u005D\u005F\u007B\u007D\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E3B\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/;
var CHAMELEON = /['\u2018\u2019]/;
/**
 * Get the distance to the end of the first word in a string of text.
 */
var getWordDistance = function getWordDistance(text) {
  var isRTL = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var dist = 0;
  var started = false;
  while (text.length > 0) {
    var charDist = getCharacterDistance(text, isRTL);
    var [char, remaining] = splitByCharacterDistance(text, charDist, isRTL);
    if (isWordCharacter(char, remaining, isRTL)) {
      started = true;
      dist += charDist;
    } else if (!started) {
      dist += charDist;
    } else {
      break;
    }
    text = remaining;
  }
  return dist;
};
/**
 * Split a string in two parts at a given distance starting from the end when
 * `isRTL` is set to `true`.
 */
var splitByCharacterDistance = (str, dist, isRTL) => {
  if (isRTL) {
    var at = str.length - dist;
    return [str.slice(at, str.length), str.slice(0, at)];
  }
  return [str.slice(0, dist), str.slice(dist)];
};
/**
 * Check if a character is a word character. The `remaining` argument is used
 * because sometimes you must read subsequent characters to truly determine it.
 */
var isWordCharacter = function isWordCharacter(char, remaining) {
  var isRTL = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (SPACE.test(char)) {
    return false;
  }
  // Chameleons count as word characters as long as they're in a word, so
  // recurse to see if the next one is a word character or not.
  if (CHAMELEON.test(char)) {
    var charDist = getCharacterDistance(remaining, isRTL);
    var [nextChar, nextRemaining] = splitByCharacterDistance(remaining, charDist, isRTL);
    if (isWordCharacter(nextChar, nextRemaining, isRTL)) {
      return true;
    }
  }
  if (PUNCTUATION.test(char)) {
    return false;
  }
  return true;
};
/**
 * Iterate on codepoints from right to left.
 */
var codepointsIteratorRTL = function* codepointsIteratorRTL(str) {
  var end = str.length - 1;
  for (var i = 0; i < str.length; i++) {
    var char1 = str.charAt(end - i);
    if (isLowSurrogate(char1.charCodeAt(0))) {
      var char2 = str.charAt(end - i - 1);
      if (isHighSurrogate(char2.charCodeAt(0))) {
        yield char2 + char1;
        i++;
        continue;
      }
    }
    yield char1;
  }
};
/**
 * Is `charCode` a high surrogate.
 *
 * https://en.wikipedia.org/wiki/Universal_Character_Set_characters#Surrogates
 */
var isHighSurrogate = charCode => {
  return charCode >= 0xd800 && charCode <= 0xdbff;
};
/**
 * Is `charCode` a low surrogate.
 *
 * https://en.wikipedia.org/wiki/Universal_Character_Set_characters#Surrogates
 */
var isLowSurrogate = charCode => {
  return charCode >= 0xdc00 && charCode <= 0xdfff;
};
var CodepointType;
(function (CodepointType) {
  CodepointType[CodepointType["None"] = 0] = "None";
  CodepointType[CodepointType["Extend"] = 1] = "Extend";
  CodepointType[CodepointType["ZWJ"] = 2] = "ZWJ";
  CodepointType[CodepointType["RI"] = 4] = "RI";
  CodepointType[CodepointType["Prepend"] = 8] = "Prepend";
  CodepointType[CodepointType["SpacingMark"] = 16] = "SpacingMark";
  CodepointType[CodepointType["L"] = 32] = "L";
  CodepointType[CodepointType["V"] = 64] = "V";
  CodepointType[CodepointType["T"] = 128] = "T";
  CodepointType[CodepointType["LV"] = 256] = "LV";
  CodepointType[CodepointType["LVT"] = 512] = "LVT";
  CodepointType[CodepointType["ExtPict"] = 1024] = "ExtPict";
  CodepointType[CodepointType["Any"] = 2048] = "Any";
})(CodepointType || (CodepointType = {}));
var reExtend = /^(?:[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0898-\u089F\u08CA-\u08E1\u08E3-\u0902\u093A\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962\u0963\u0981\u09BC\u09BE\u09C1-\u09C4\u09CD\u09D7\u09E2\u09E3\u09FE\u0A01\u0A02\u0A3C\u0A41\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81\u0A82\u0ABC\u0AC1-\u0AC5\u0AC7\u0AC8\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01\u0B3C\u0B3E\u0B3F\u0B41-\u0B44\u0B4D\u0B55-\u0B57\u0B62\u0B63\u0B82\u0BBE\u0BC0\u0BCD\u0BD7\u0C00\u0C04\u0C3C\u0C3E-\u0C40\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81\u0CBC\u0CBF\u0CC2\u0CC6\u0CCC\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D00\u0D01\u0D3B\u0D3C\u0D3E\u0D41-\u0D44\u0D4D\u0D57\u0D62\u0D63\u0D81\u0DCA\u0DCF\u0DD2-\u0DD4\u0DD6\u0DDF\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECE\u0F18\u0F19\u0F35\u0F37\u0F39\u0F71-\u0F7E\u0F80-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102D-\u1030\u1032-\u1037\u1039\u103A\u103D\u103E\u1058\u1059\u105E-\u1060\u1071-\u1074\u1082\u1085\u1086\u108D\u109D\u135D-\u135F\u1712-\u1714\u1732\u1733\u1752\u1753\u1772\u1773\u17B4\u17B5\u17B7-\u17BD\u17C6\u17C9-\u17D3\u17DD\u180B-\u180D\u180F\u1885\u1886\u18A9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193B\u1A17\u1A18\u1A1B\u1A56\u1A58-\u1A5E\u1A60\u1A62\u1A65-\u1A6C\u1A73-\u1A7C\u1A7F\u1AB0-\u1ACE\u1B00-\u1B03\u1B34-\u1B3A\u1B3C\u1B42\u1B6B-\u1B73\u1B80\u1B81\u1BA2-\u1BA5\u1BA8\u1BA9\u1BAB-\u1BAD\u1BE6\u1BE8\u1BE9\u1BED\u1BEF-\u1BF1\u1C2C-\u1C33\u1C36\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1CF8\u1CF9\u1DC0-\u1DFF\u200C\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA825\uA826\uA82C\uA8C4\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA951\uA980-\uA982\uA9B3\uA9B6-\uA9B9\uA9BC\uA9BD\uA9E5\uAA29-\uAA2E\uAA31\uAA32\uAA35\uAA36\uAA43\uAA4C\uAA7C\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEC\uAAED\uAAF6\uABE5\uABE8\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFF9E\uFF9F]|\uD800[\uDDFD\uDEE0\uDF76-\uDF7A]|\uD802[\uDE01-\uDE03\uDE05\uDE06\uDE0C-\uDE0F\uDE38-\uDE3A\uDE3F\uDEE5\uDEE6]|\uD803[\uDD24-\uDD27\uDEAB\uDEAC\uDEFD-\uDEFF\uDF46-\uDF50\uDF82-\uDF85]|\uD804[\uDC01\uDC38-\uDC46\uDC70\uDC73\uDC74\uDC7F-\uDC81\uDCB3-\uDCB6\uDCB9\uDCBA\uDCC2\uDD00-\uDD02\uDD27-\uDD2B\uDD2D-\uDD34\uDD73\uDD80\uDD81\uDDB6-\uDDBE\uDDC9-\uDDCC\uDDCF\uDE2F-\uDE31\uDE34\uDE36\uDE37\uDE3E\uDE41\uDEDF\uDEE3-\uDEEA\uDF00\uDF01\uDF3B\uDF3C\uDF3E\uDF40\uDF57\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC38-\uDC3F\uDC42-\uDC44\uDC46\uDC5E\uDCB0\uDCB3-\uDCB8\uDCBA\uDCBD\uDCBF\uDCC0\uDCC2\uDCC3\uDDAF\uDDB2-\uDDB5\uDDBC\uDDBD\uDDBF\uDDC0\uDDDC\uDDDD\uDE33-\uDE3A\uDE3D\uDE3F\uDE40\uDEAB\uDEAD\uDEB0-\uDEB5\uDEB7\uDF1D-\uDF1F\uDF22-\uDF25\uDF27-\uDF2B]|\uD806[\uDC2F-\uDC37\uDC39\uDC3A\uDD30\uDD3B\uDD3C\uDD3E\uDD43\uDDD4-\uDDD7\uDDDA\uDDDB\uDDE0\uDE01-\uDE0A\uDE33-\uDE38\uDE3B-\uDE3E\uDE47\uDE51-\uDE56\uDE59-\uDE5B\uDE8A-\uDE96\uDE98\uDE99]|\uD807[\uDC30-\uDC36\uDC38-\uDC3D\uDC3F\uDC92-\uDCA7\uDCAA-\uDCB0\uDCB2\uDCB3\uDCB5\uDCB6\uDD31-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD45\uDD47\uDD90\uDD91\uDD95\uDD97\uDEF3\uDEF4\uDF00\uDF01\uDF36-\uDF3A\uDF40\uDF42]|\uD80D[\uDC40\uDC47-\uDC55]|\uD81A[\uDEF0-\uDEF4\uDF30-\uDF36]|\uD81B[\uDF4F\uDF8F-\uDF92\uDFE4]|\uD82F[\uDC9D\uDC9E]|\uD833[\uDF00-\uDF2D\uDF30-\uDF46]|\uD834[\uDD65\uDD67-\uDD69\uDD6E-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A\uDC8F\uDD30-\uDD36\uDEAE\uDEEC-\uDEEF]|\uD839[\uDCEC-\uDCEF]|\uD83A[\uDCD0-\uDCD6\uDD44-\uDD4A]|\uD83C[\uDFFB-\uDFFF]|\uDB40[\uDC20-\uDC7F\uDD00-\uDDEF])$/;
var rePrepend = /^(?:[\u0600-\u0605\u06DD\u070F\u0890\u0891\u08E2\u0D4E]|\uD804[\uDCBD\uDCCD\uDDC2\uDDC3]|\uD806[\uDD3F\uDD41\uDE3A\uDE84-\uDE89]|\uD807\uDD46)$/;
var reSpacingMark = /^(?:[\u0903\u093B\u093E-\u0940\u0949-\u094C\u094E\u094F\u0982\u0983\u09BF\u09C0\u09C7\u09C8\u09CB\u09CC\u0A03\u0A3E-\u0A40\u0A83\u0ABE-\u0AC0\u0AC9\u0ACB\u0ACC\u0B02\u0B03\u0B40\u0B47\u0B48\u0B4B\u0B4C\u0BBF\u0BC1\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCC\u0C01-\u0C03\u0C41-\u0C44\u0C82\u0C83\u0CBE\u0CC0\u0CC1\u0CC3\u0CC4\u0CC7\u0CC8\u0CCA\u0CCB\u0D02\u0D03\u0D3F\u0D40\u0D46-\u0D48\u0D4A-\u0D4C\u0D82\u0D83\u0DD0\u0DD1\u0DD8-\u0DDE\u0DF2\u0DF3\u0E33\u0EB3\u0F3E\u0F3F\u0F7F\u1031\u103B\u103C\u1056\u1057\u1084\u1715\u1734\u17B6\u17BE-\u17C5\u17C7\u17C8\u1923-\u1926\u1929-\u192B\u1930\u1931\u1933-\u1938\u1A19\u1A1A\u1A55\u1A57\u1A6D-\u1A72\u1B04\u1B3B\u1B3D-\u1B41\u1B43\u1B44\u1B82\u1BA1\u1BA6\u1BA7\u1BAA\u1BE7\u1BEA-\u1BEC\u1BEE\u1BF2\u1BF3\u1C24-\u1C2B\u1C34\u1C35\u1CE1\u1CF7\uA823\uA824\uA827\uA880\uA881\uA8B4-\uA8C3\uA952\uA953\uA983\uA9B4\uA9B5\uA9BA\uA9BB\uA9BE-\uA9C0\uAA2F\uAA30\uAA33\uAA34\uAA4D\uAAEB\uAAEE\uAAEF\uAAF5\uABE3\uABE4\uABE6\uABE7\uABE9\uABEA\uABEC]|\uD804[\uDC00\uDC02\uDC82\uDCB0-\uDCB2\uDCB7\uDCB8\uDD2C\uDD45\uDD46\uDD82\uDDB3-\uDDB5\uDDBF\uDDC0\uDDCE\uDE2C-\uDE2E\uDE32\uDE33\uDE35\uDEE0-\uDEE2\uDF02\uDF03\uDF3F\uDF41-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF62\uDF63]|\uD805[\uDC35-\uDC37\uDC40\uDC41\uDC45\uDCB1\uDCB2\uDCB9\uDCBB\uDCBC\uDCBE\uDCC1\uDDB0\uDDB1\uDDB8-\uDDBB\uDDBE\uDE30-\uDE32\uDE3B\uDE3C\uDE3E\uDEAC\uDEAE\uDEAF\uDEB6\uDF26]|\uD806[\uDC2C-\uDC2E\uDC38\uDD31-\uDD35\uDD37\uDD38\uDD3D\uDD40\uDD42\uDDD1-\uDDD3\uDDDC-\uDDDF\uDDE4\uDE39\uDE57\uDE58\uDE97]|\uD807[\uDC2F\uDC3E\uDCA9\uDCB1\uDCB4\uDD8A-\uDD8E\uDD93\uDD94\uDD96\uDEF5\uDEF6]|\uD81B[\uDF51-\uDF87\uDFF0\uDFF1]|\uD834[\uDD66\uDD6D])$/;
var reL = /^[\u1100-\u115F\uA960-\uA97C]$/;
var reV = /^[\u1160-\u11A7\uD7B0-\uD7C6]$/;
var reT = /^[\u11A8-\u11FF\uD7CB-\uD7FB]$/;
var reLV = /^[\uAC00\uAC1C\uAC38\uAC54\uAC70\uAC8C\uACA8\uACC4\uACE0\uACFC\uAD18\uAD34\uAD50\uAD6C\uAD88\uADA4\uADC0\uADDC\uADF8\uAE14\uAE30\uAE4C\uAE68\uAE84\uAEA0\uAEBC\uAED8\uAEF4\uAF10\uAF2C\uAF48\uAF64\uAF80\uAF9C\uAFB8\uAFD4\uAFF0\uB00C\uB028\uB044\uB060\uB07C\uB098\uB0B4\uB0D0\uB0EC\uB108\uB124\uB140\uB15C\uB178\uB194\uB1B0\uB1CC\uB1E8\uB204\uB220\uB23C\uB258\uB274\uB290\uB2AC\uB2C8\uB2E4\uB300\uB31C\uB338\uB354\uB370\uB38C\uB3A8\uB3C4\uB3E0\uB3FC\uB418\uB434\uB450\uB46C\uB488\uB4A4\uB4C0\uB4DC\uB4F8\uB514\uB530\uB54C\uB568\uB584\uB5A0\uB5BC\uB5D8\uB5F4\uB610\uB62C\uB648\uB664\uB680\uB69C\uB6B8\uB6D4\uB6F0\uB70C\uB728\uB744\uB760\uB77C\uB798\uB7B4\uB7D0\uB7EC\uB808\uB824\uB840\uB85C\uB878\uB894\uB8B0\uB8CC\uB8E8\uB904\uB920\uB93C\uB958\uB974\uB990\uB9AC\uB9C8\uB9E4\uBA00\uBA1C\uBA38\uBA54\uBA70\uBA8C\uBAA8\uBAC4\uBAE0\uBAFC\uBB18\uBB34\uBB50\uBB6C\uBB88\uBBA4\uBBC0\uBBDC\uBBF8\uBC14\uBC30\uBC4C\uBC68\uBC84\uBCA0\uBCBC\uBCD8\uBCF4\uBD10\uBD2C\uBD48\uBD64\uBD80\uBD9C\uBDB8\uBDD4\uBDF0\uBE0C\uBE28\uBE44\uBE60\uBE7C\uBE98\uBEB4\uBED0\uBEEC\uBF08\uBF24\uBF40\uBF5C\uBF78\uBF94\uBFB0\uBFCC\uBFE8\uC004\uC020\uC03C\uC058\uC074\uC090\uC0AC\uC0C8\uC0E4\uC100\uC11C\uC138\uC154\uC170\uC18C\uC1A8\uC1C4\uC1E0\uC1FC\uC218\uC234\uC250\uC26C\uC288\uC2A4\uC2C0\uC2DC\uC2F8\uC314\uC330\uC34C\uC368\uC384\uC3A0\uC3BC\uC3D8\uC3F4\uC410\uC42C\uC448\uC464\uC480\uC49C\uC4B8\uC4D4\uC4F0\uC50C\uC528\uC544\uC560\uC57C\uC598\uC5B4\uC5D0\uC5EC\uC608\uC624\uC640\uC65C\uC678\uC694\uC6B0\uC6CC\uC6E8\uC704\uC720\uC73C\uC758\uC774\uC790\uC7AC\uC7C8\uC7E4\uC800\uC81C\uC838\uC854\uC870\uC88C\uC8A8\uC8C4\uC8E0\uC8FC\uC918\uC934\uC950\uC96C\uC988\uC9A4\uC9C0\uC9DC\uC9F8\uCA14\uCA30\uCA4C\uCA68\uCA84\uCAA0\uCABC\uCAD8\uCAF4\uCB10\uCB2C\uCB48\uCB64\uCB80\uCB9C\uCBB8\uCBD4\uCBF0\uCC0C\uCC28\uCC44\uCC60\uCC7C\uCC98\uCCB4\uCCD0\uCCEC\uCD08\uCD24\uCD40\uCD5C\uCD78\uCD94\uCDB0\uCDCC\uCDE8\uCE04\uCE20\uCE3C\uCE58\uCE74\uCE90\uCEAC\uCEC8\uCEE4\uCF00\uCF1C\uCF38\uCF54\uCF70\uCF8C\uCFA8\uCFC4\uCFE0\uCFFC\uD018\uD034\uD050\uD06C\uD088\uD0A4\uD0C0\uD0DC\uD0F8\uD114\uD130\uD14C\uD168\uD184\uD1A0\uD1BC\uD1D8\uD1F4\uD210\uD22C\uD248\uD264\uD280\uD29C\uD2B8\uD2D4\uD2F0\uD30C\uD328\uD344\uD360\uD37C\uD398\uD3B4\uD3D0\uD3EC\uD408\uD424\uD440\uD45C\uD478\uD494\uD4B0\uD4CC\uD4E8\uD504\uD520\uD53C\uD558\uD574\uD590\uD5AC\uD5C8\uD5E4\uD600\uD61C\uD638\uD654\uD670\uD68C\uD6A8\uD6C4\uD6E0\uD6FC\uD718\uD734\uD750\uD76C\uD788]$/;
var reLVT = /^[\uAC01-\uAC1B\uAC1D-\uAC37\uAC39-\uAC53\uAC55-\uAC6F\uAC71-\uAC8B\uAC8D-\uACA7\uACA9-\uACC3\uACC5-\uACDF\uACE1-\uACFB\uACFD-\uAD17\uAD19-\uAD33\uAD35-\uAD4F\uAD51-\uAD6B\uAD6D-\uAD87\uAD89-\uADA3\uADA5-\uADBF\uADC1-\uADDB\uADDD-\uADF7\uADF9-\uAE13\uAE15-\uAE2F\uAE31-\uAE4B\uAE4D-\uAE67\uAE69-\uAE83\uAE85-\uAE9F\uAEA1-\uAEBB\uAEBD-\uAED7\uAED9-\uAEF3\uAEF5-\uAF0F\uAF11-\uAF2B\uAF2D-\uAF47\uAF49-\uAF63\uAF65-\uAF7F\uAF81-\uAF9B\uAF9D-\uAFB7\uAFB9-\uAFD3\uAFD5-\uAFEF\uAFF1-\uB00B\uB00D-\uB027\uB029-\uB043\uB045-\uB05F\uB061-\uB07B\uB07D-\uB097\uB099-\uB0B3\uB0B5-\uB0CF\uB0D1-\uB0EB\uB0ED-\uB107\uB109-\uB123\uB125-\uB13F\uB141-\uB15B\uB15D-\uB177\uB179-\uB193\uB195-\uB1AF\uB1B1-\uB1CB\uB1CD-\uB1E7\uB1E9-\uB203\uB205-\uB21F\uB221-\uB23B\uB23D-\uB257\uB259-\uB273\uB275-\uB28F\uB291-\uB2AB\uB2AD-\uB2C7\uB2C9-\uB2E3\uB2E5-\uB2FF\uB301-\uB31B\uB31D-\uB337\uB339-\uB353\uB355-\uB36F\uB371-\uB38B\uB38D-\uB3A7\uB3A9-\uB3C3\uB3C5-\uB3DF\uB3E1-\uB3FB\uB3FD-\uB417\uB419-\uB433\uB435-\uB44F\uB451-\uB46B\uB46D-\uB487\uB489-\uB4A3\uB4A5-\uB4BF\uB4C1-\uB4DB\uB4DD-\uB4F7\uB4F9-\uB513\uB515-\uB52F\uB531-\uB54B\uB54D-\uB567\uB569-\uB583\uB585-\uB59F\uB5A1-\uB5BB\uB5BD-\uB5D7\uB5D9-\uB5F3\uB5F5-\uB60F\uB611-\uB62B\uB62D-\uB647\uB649-\uB663\uB665-\uB67F\uB681-\uB69B\uB69D-\uB6B7\uB6B9-\uB6D3\uB6D5-\uB6EF\uB6F1-\uB70B\uB70D-\uB727\uB729-\uB743\uB745-\uB75F\uB761-\uB77B\uB77D-\uB797\uB799-\uB7B3\uB7B5-\uB7CF\uB7D1-\uB7EB\uB7ED-\uB807\uB809-\uB823\uB825-\uB83F\uB841-\uB85B\uB85D-\uB877\uB879-\uB893\uB895-\uB8AF\uB8B1-\uB8CB\uB8CD-\uB8E7\uB8E9-\uB903\uB905-\uB91F\uB921-\uB93B\uB93D-\uB957\uB959-\uB973\uB975-\uB98F\uB991-\uB9AB\uB9AD-\uB9C7\uB9C9-\uB9E3\uB9E5-\uB9FF\uBA01-\uBA1B\uBA1D-\uBA37\uBA39-\uBA53\uBA55-\uBA6F\uBA71-\uBA8B\uBA8D-\uBAA7\uBAA9-\uBAC3\uBAC5-\uBADF\uBAE1-\uBAFB\uBAFD-\uBB17\uBB19-\uBB33\uBB35-\uBB4F\uBB51-\uBB6B\uBB6D-\uBB87\uBB89-\uBBA3\uBBA5-\uBBBF\uBBC1-\uBBDB\uBBDD-\uBBF7\uBBF9-\uBC13\uBC15-\uBC2F\uBC31-\uBC4B\uBC4D-\uBC67\uBC69-\uBC83\uBC85-\uBC9F\uBCA1-\uBCBB\uBCBD-\uBCD7\uBCD9-\uBCF3\uBCF5-\uBD0F\uBD11-\uBD2B\uBD2D-\uBD47\uBD49-\uBD63\uBD65-\uBD7F\uBD81-\uBD9B\uBD9D-\uBDB7\uBDB9-\uBDD3\uBDD5-\uBDEF\uBDF1-\uBE0B\uBE0D-\uBE27\uBE29-\uBE43\uBE45-\uBE5F\uBE61-\uBE7B\uBE7D-\uBE97\uBE99-\uBEB3\uBEB5-\uBECF\uBED1-\uBEEB\uBEED-\uBF07\uBF09-\uBF23\uBF25-\uBF3F\uBF41-\uBF5B\uBF5D-\uBF77\uBF79-\uBF93\uBF95-\uBFAF\uBFB1-\uBFCB\uBFCD-\uBFE7\uBFE9-\uC003\uC005-\uC01F\uC021-\uC03B\uC03D-\uC057\uC059-\uC073\uC075-\uC08F\uC091-\uC0AB\uC0AD-\uC0C7\uC0C9-\uC0E3\uC0E5-\uC0FF\uC101-\uC11B\uC11D-\uC137\uC139-\uC153\uC155-\uC16F\uC171-\uC18B\uC18D-\uC1A7\uC1A9-\uC1C3\uC1C5-\uC1DF\uC1E1-\uC1FB\uC1FD-\uC217\uC219-\uC233\uC235-\uC24F\uC251-\uC26B\uC26D-\uC287\uC289-\uC2A3\uC2A5-\uC2BF\uC2C1-\uC2DB\uC2DD-\uC2F7\uC2F9-\uC313\uC315-\uC32F\uC331-\uC34B\uC34D-\uC367\uC369-\uC383\uC385-\uC39F\uC3A1-\uC3BB\uC3BD-\uC3D7\uC3D9-\uC3F3\uC3F5-\uC40F\uC411-\uC42B\uC42D-\uC447\uC449-\uC463\uC465-\uC47F\uC481-\uC49B\uC49D-\uC4B7\uC4B9-\uC4D3\uC4D5-\uC4EF\uC4F1-\uC50B\uC50D-\uC527\uC529-\uC543\uC545-\uC55F\uC561-\uC57B\uC57D-\uC597\uC599-\uC5B3\uC5B5-\uC5CF\uC5D1-\uC5EB\uC5ED-\uC607\uC609-\uC623\uC625-\uC63F\uC641-\uC65B\uC65D-\uC677\uC679-\uC693\uC695-\uC6AF\uC6B1-\uC6CB\uC6CD-\uC6E7\uC6E9-\uC703\uC705-\uC71F\uC721-\uC73B\uC73D-\uC757\uC759-\uC773\uC775-\uC78F\uC791-\uC7AB\uC7AD-\uC7C7\uC7C9-\uC7E3\uC7E5-\uC7FF\uC801-\uC81B\uC81D-\uC837\uC839-\uC853\uC855-\uC86F\uC871-\uC88B\uC88D-\uC8A7\uC8A9-\uC8C3\uC8C5-\uC8DF\uC8E1-\uC8FB\uC8FD-\uC917\uC919-\uC933\uC935-\uC94F\uC951-\uC96B\uC96D-\uC987\uC989-\uC9A3\uC9A5-\uC9BF\uC9C1-\uC9DB\uC9DD-\uC9F7\uC9F9-\uCA13\uCA15-\uCA2F\uCA31-\uCA4B\uCA4D-\uCA67\uCA69-\uCA83\uCA85-\uCA9F\uCAA1-\uCABB\uCABD-\uCAD7\uCAD9-\uCAF3\uCAF5-\uCB0F\uCB11-\uCB2B\uCB2D-\uCB47\uCB49-\uCB63\uCB65-\uCB7F\uCB81-\uCB9B\uCB9D-\uCBB7\uCBB9-\uCBD3\uCBD5-\uCBEF\uCBF1-\uCC0B\uCC0D-\uCC27\uCC29-\uCC43\uCC45-\uCC5F\uCC61-\uCC7B\uCC7D-\uCC97\uCC99-\uCCB3\uCCB5-\uCCCF\uCCD1-\uCCEB\uCCED-\uCD07\uCD09-\uCD23\uCD25-\uCD3F\uCD41-\uCD5B\uCD5D-\uCD77\uCD79-\uCD93\uCD95-\uCDAF\uCDB1-\uCDCB\uCDCD-\uCDE7\uCDE9-\uCE03\uCE05-\uCE1F\uCE21-\uCE3B\uCE3D-\uCE57\uCE59-\uCE73\uCE75-\uCE8F\uCE91-\uCEAB\uCEAD-\uCEC7\uCEC9-\uCEE3\uCEE5-\uCEFF\uCF01-\uCF1B\uCF1D-\uCF37\uCF39-\uCF53\uCF55-\uCF6F\uCF71-\uCF8B\uCF8D-\uCFA7\uCFA9-\uCFC3\uCFC5-\uCFDF\uCFE1-\uCFFB\uCFFD-\uD017\uD019-\uD033\uD035-\uD04F\uD051-\uD06B\uD06D-\uD087\uD089-\uD0A3\uD0A5-\uD0BF\uD0C1-\uD0DB\uD0DD-\uD0F7\uD0F9-\uD113\uD115-\uD12F\uD131-\uD14B\uD14D-\uD167\uD169-\uD183\uD185-\uD19F\uD1A1-\uD1BB\uD1BD-\uD1D7\uD1D9-\uD1F3\uD1F5-\uD20F\uD211-\uD22B\uD22D-\uD247\uD249-\uD263\uD265-\uD27F\uD281-\uD29B\uD29D-\uD2B7\uD2B9-\uD2D3\uD2D5-\uD2EF\uD2F1-\uD30B\uD30D-\uD327\uD329-\uD343\uD345-\uD35F\uD361-\uD37B\uD37D-\uD397\uD399-\uD3B3\uD3B5-\uD3CF\uD3D1-\uD3EB\uD3ED-\uD407\uD409-\uD423\uD425-\uD43F\uD441-\uD45B\uD45D-\uD477\uD479-\uD493\uD495-\uD4AF\uD4B1-\uD4CB\uD4CD-\uD4E7\uD4E9-\uD503\uD505-\uD51F\uD521-\uD53B\uD53D-\uD557\uD559-\uD573\uD575-\uD58F\uD591-\uD5AB\uD5AD-\uD5C7\uD5C9-\uD5E3\uD5E5-\uD5FF\uD601-\uD61B\uD61D-\uD637\uD639-\uD653\uD655-\uD66F\uD671-\uD68B\uD68D-\uD6A7\uD6A9-\uD6C3\uD6C5-\uD6DF\uD6E1-\uD6FB\uD6FD-\uD717\uD719-\uD733\uD735-\uD74F\uD751-\uD76B\uD76D-\uD787\uD789-\uD7A3]$/;
var reExtPict = /^(?:[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u2388\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2605\u2607-\u2612\u2614-\u2685\u2690-\u2705\u2708-\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763-\u2767\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC00-\uDCFF\uDD0D-\uDD0F\uDD2F\uDD6C-\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDAD-\uDDE5\uDE01-\uDE0F\uDE1A\uDE2F\uDE32-\uDE3A\uDE3C-\uDE3F\uDE49-\uDFFA]|\uD83D[\uDC00-\uDD3D\uDD46-\uDE4F\uDE80-\uDEFF\uDF74-\uDF7F\uDFD5-\uDFFF]|\uD83E[\uDC0C-\uDC0F\uDC48-\uDC4F\uDC5A-\uDC5F\uDC88-\uDC8F\uDCAE-\uDCFF\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDEFF]|\uD83F[\uDC00-\uDFFD])$/;
var getCodepointType = (char, code) => {
  var type = CodepointType.Any;
  if (char.search(reExtend) !== -1) {
    type |= CodepointType.Extend;
  }
  if (code === 0x200d) {
    type |= CodepointType.ZWJ;
  }
  if (code >= 0x1f1e6 && code <= 0x1f1ff) {
    type |= CodepointType.RI;
  }
  if (char.search(rePrepend) !== -1) {
    type |= CodepointType.Prepend;
  }
  if (char.search(reSpacingMark) !== -1) {
    type |= CodepointType.SpacingMark;
  }
  if (char.search(reL) !== -1) {
    type |= CodepointType.L;
  }
  if (char.search(reV) !== -1) {
    type |= CodepointType.V;
  }
  if (char.search(reT) !== -1) {
    type |= CodepointType.T;
  }
  if (char.search(reLV) !== -1) {
    type |= CodepointType.LV;
  }
  if (char.search(reLVT) !== -1) {
    type |= CodepointType.LVT;
  }
  if (char.search(reExtPict) !== -1) {
    type |= CodepointType.ExtPict;
  }
  return type;
};
function intersects(x, y) {
  return (x & y) !== 0;
}
var NonBoundaryPairs = [
// GB6
[CodepointType.L, CodepointType.L | CodepointType.V | CodepointType.LV | CodepointType.LVT],
// GB7
[CodepointType.LV | CodepointType.V, CodepointType.V | CodepointType.T],
// GB8
[CodepointType.LVT | CodepointType.T, CodepointType.T],
// GB9
[CodepointType.Any, CodepointType.Extend | CodepointType.ZWJ],
// GB9a
[CodepointType.Any, CodepointType.SpacingMark],
// GB9b
[CodepointType.Prepend, CodepointType.Any],
// GB11
[CodepointType.ZWJ, CodepointType.ExtPict],
// GB12 and GB13
[CodepointType.RI, CodepointType.RI]];
function isBoundaryPair(left, right) {
  return NonBoundaryPairs.findIndex(r => intersects(left, r[0]) && intersects(right, r[1])) === -1;
}
var endingEmojiZWJ = /(?:[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u2388\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2605\u2607-\u2612\u2614-\u2685\u2690-\u2705\u2708-\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763-\u2767\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC00-\uDCFF\uDD0D-\uDD0F\uDD2F\uDD6C-\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDAD-\uDDE5\uDE01-\uDE0F\uDE1A\uDE2F\uDE32-\uDE3A\uDE3C-\uDE3F\uDE49-\uDFFA]|\uD83D[\uDC00-\uDD3D\uDD46-\uDE4F\uDE80-\uDEFF\uDF74-\uDF7F\uDFD5-\uDFFF]|\uD83E[\uDC0C-\uDC0F\uDC48-\uDC4F\uDC5A-\uDC5F\uDC88-\uDC8F\uDCAE-\uDCFF\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDEFF]|\uD83F[\uDC00-\uDFFD])(?:[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0898-\u089F\u08CA-\u08E1\u08E3-\u0902\u093A\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962\u0963\u0981\u09BC\u09BE\u09C1-\u09C4\u09CD\u09D7\u09E2\u09E3\u09FE\u0A01\u0A02\u0A3C\u0A41\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81\u0A82\u0ABC\u0AC1-\u0AC5\u0AC7\u0AC8\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01\u0B3C\u0B3E\u0B3F\u0B41-\u0B44\u0B4D\u0B55-\u0B57\u0B62\u0B63\u0B82\u0BBE\u0BC0\u0BCD\u0BD7\u0C00\u0C04\u0C3C\u0C3E-\u0C40\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81\u0CBC\u0CBF\u0CC2\u0CC6\u0CCC\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D00\u0D01\u0D3B\u0D3C\u0D3E\u0D41-\u0D44\u0D4D\u0D57\u0D62\u0D63\u0D81\u0DCA\u0DCF\u0DD2-\u0DD4\u0DD6\u0DDF\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECE\u0F18\u0F19\u0F35\u0F37\u0F39\u0F71-\u0F7E\u0F80-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102D-\u1030\u1032-\u1037\u1039\u103A\u103D\u103E\u1058\u1059\u105E-\u1060\u1071-\u1074\u1082\u1085\u1086\u108D\u109D\u135D-\u135F\u1712-\u1714\u1732\u1733\u1752\u1753\u1772\u1773\u17B4\u17B5\u17B7-\u17BD\u17C6\u17C9-\u17D3\u17DD\u180B-\u180D\u180F\u1885\u1886\u18A9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193B\u1A17\u1A18\u1A1B\u1A56\u1A58-\u1A5E\u1A60\u1A62\u1A65-\u1A6C\u1A73-\u1A7C\u1A7F\u1AB0-\u1ACE\u1B00-\u1B03\u1B34-\u1B3A\u1B3C\u1B42\u1B6B-\u1B73\u1B80\u1B81\u1BA2-\u1BA5\u1BA8\u1BA9\u1BAB-\u1BAD\u1BE6\u1BE8\u1BE9\u1BED\u1BEF-\u1BF1\u1C2C-\u1C33\u1C36\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1CF8\u1CF9\u1DC0-\u1DFF\u200C\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA825\uA826\uA82C\uA8C4\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA951\uA980-\uA982\uA9B3\uA9B6-\uA9B9\uA9BC\uA9BD\uA9E5\uAA29-\uAA2E\uAA31\uAA32\uAA35\uAA36\uAA43\uAA4C\uAA7C\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEC\uAAED\uAAF6\uABE5\uABE8\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFF9E\uFF9F]|\uD800[\uDDFD\uDEE0\uDF76-\uDF7A]|\uD802[\uDE01-\uDE03\uDE05\uDE06\uDE0C-\uDE0F\uDE38-\uDE3A\uDE3F\uDEE5\uDEE6]|\uD803[\uDD24-\uDD27\uDEAB\uDEAC\uDEFD-\uDEFF\uDF46-\uDF50\uDF82-\uDF85]|\uD804[\uDC01\uDC38-\uDC46\uDC70\uDC73\uDC74\uDC7F-\uDC81\uDCB3-\uDCB6\uDCB9\uDCBA\uDCC2\uDD00-\uDD02\uDD27-\uDD2B\uDD2D-\uDD34\uDD73\uDD80\uDD81\uDDB6-\uDDBE\uDDC9-\uDDCC\uDDCF\uDE2F-\uDE31\uDE34\uDE36\uDE37\uDE3E\uDE41\uDEDF\uDEE3-\uDEEA\uDF00\uDF01\uDF3B\uDF3C\uDF3E\uDF40\uDF57\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC38-\uDC3F\uDC42-\uDC44\uDC46\uDC5E\uDCB0\uDCB3-\uDCB8\uDCBA\uDCBD\uDCBF\uDCC0\uDCC2\uDCC3\uDDAF\uDDB2-\uDDB5\uDDBC\uDDBD\uDDBF\uDDC0\uDDDC\uDDDD\uDE33-\uDE3A\uDE3D\uDE3F\uDE40\uDEAB\uDEAD\uDEB0-\uDEB5\uDEB7\uDF1D-\uDF1F\uDF22-\uDF25\uDF27-\uDF2B]|\uD806[\uDC2F-\uDC37\uDC39\uDC3A\uDD30\uDD3B\uDD3C\uDD3E\uDD43\uDDD4-\uDDD7\uDDDA\uDDDB\uDDE0\uDE01-\uDE0A\uDE33-\uDE38\uDE3B-\uDE3E\uDE47\uDE51-\uDE56\uDE59-\uDE5B\uDE8A-\uDE96\uDE98\uDE99]|\uD807[\uDC30-\uDC36\uDC38-\uDC3D\uDC3F\uDC92-\uDCA7\uDCAA-\uDCB0\uDCB2\uDCB3\uDCB5\uDCB6\uDD31-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD45\uDD47\uDD90\uDD91\uDD95\uDD97\uDEF3\uDEF4\uDF00\uDF01\uDF36-\uDF3A\uDF40\uDF42]|\uD80D[\uDC40\uDC47-\uDC55]|\uD81A[\uDEF0-\uDEF4\uDF30-\uDF36]|\uD81B[\uDF4F\uDF8F-\uDF92\uDFE4]|\uD82F[\uDC9D\uDC9E]|\uD833[\uDF00-\uDF2D\uDF30-\uDF46]|\uD834[\uDD65\uDD67-\uDD69\uDD6E-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A\uDC8F\uDD30-\uDD36\uDEAE\uDEEC-\uDEEF]|\uD839[\uDCEC-\uDCEF]|\uD83A[\uDCD0-\uDCD6\uDD44-\uDD4A]|\uD83C[\uDFFB-\uDFFF]|\uDB40[\uDC20-\uDC7F\uDD00-\uDDEF])*\u200D$/;
var endsWithEmojiZWJ = str => {
  return str.search(endingEmojiZWJ) !== -1;
};
var endingRIs = /(?:\uD83C[\uDDE6-\uDDFF])+$/g;
var endsWithOddNumberOfRIs = str => {
  var match = str.match(endingRIs);
  if (match === null) {
    return false;
  } else {
    // A RI is represented by a surrogate pair.
    var numRIs = match[0].length / 2;
    return numRIs % 2 === 1;
  }
};

// eslint-disable-next-line no-redeclare
var TextTransforms = {
  delete(editor, options) {
    editor.delete(options);
  },
  insertFragment(editor, fragment, options) {
    editor.insertFragment(fragment, options);
  },
  insertText(editor, text) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    Editor.withoutNormalizing(editor, () => {
      var {
        voids = false
      } = options;
      var {
        at = getDefaultInsertLocation(editor)
      } = options;
      if (Path.isPath(at)) {
        at = Editor.range(editor, at);
      }
      if (Range.isRange(at)) {
        if (Range.isCollapsed(at)) {
          at = at.anchor;
        } else {
          var end = Range.end(at);
          if (!voids && Editor.void(editor, {
            at: end
          })) {
            return;
          }
          var start = Range.start(at);
          var startRef = Editor.pointRef(editor, start);
          var endRef = Editor.pointRef(editor, end);
          Transforms.delete(editor, {
            at,
            voids
          });
          var startPoint = startRef.unref();
          var endPoint = endRef.unref();
          at = startPoint || endPoint;
          Transforms.setSelection(editor, {
            anchor: at,
            focus: at
          });
        }
      }
      if (!voids && Editor.void(editor, {
        at
      }) || Editor.elementReadOnly(editor, {
        at
      })) {
        return;
      }
      var {
        path,
        offset
      } = at;
      if (text.length > 0) editor.apply({
        type: 'insert_text',
        path,
        offset,
        text
      });
    });
  }
};

function ownKeys$9(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$9(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$9(Object(t), true).forEach(function (r) { _defineProperty$1(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$9(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Transforms = _objectSpread$9(_objectSpread$9(_objectSpread$9(_objectSpread$9({}, GeneralTransforms), NodeTransforms), SelectionTransforms), TextTransforms);

// perf
var BATCHING_DIRTY_PATHS = new WeakMap();
var isBatchingDirtyPaths = editor => {
  return BATCHING_DIRTY_PATHS.get(editor) || false;
};
var batchDirtyPaths = (editor, fn, update) => {
  var value = BATCHING_DIRTY_PATHS.get(editor) || false;
  BATCHING_DIRTY_PATHS.set(editor, true);
  try {
    fn();
    update();
  } finally {
    BATCHING_DIRTY_PATHS.set(editor, value);
  }
};

/**
 * update editor dirty paths
 *
 * @param newDirtyPaths: Path[]; new dirty paths
 * @param transform: (p: Path) => Path | null; how to transform existing dirty paths
 */
function updateDirtyPaths(editor, newDirtyPaths, transform) {
  var oldDirtyPaths = DIRTY_PATHS.get(editor) || [];
  var oldDirtyPathKeys = DIRTY_PATH_KEYS.get(editor) || new Set();
  var dirtyPaths;
  var dirtyPathKeys;
  var add = path => {
    if (path) {
      var key = path.join(',');
      if (!dirtyPathKeys.has(key)) {
        dirtyPathKeys.add(key);
        dirtyPaths.push(path);
      }
    }
  };
  if (transform) {
    dirtyPaths = [];
    dirtyPathKeys = new Set();
    for (var path of oldDirtyPaths) {
      var newPath = transform(path);
      add(newPath);
    }
  } else {
    dirtyPaths = oldDirtyPaths;
    dirtyPathKeys = oldDirtyPathKeys;
  }
  for (var _path of newDirtyPaths) {
    add(_path);
  }
  DIRTY_PATHS.set(editor, dirtyPaths);
  DIRTY_PATH_KEYS.set(editor, dirtyPathKeys);
}

var apply = (editor, op) => {
  for (var ref of Editor.pathRefs(editor)) {
    PathRef.transform(ref, op);
  }
  for (var _ref of Editor.pointRefs(editor)) {
    PointRef.transform(_ref, op);
  }
  for (var _ref2 of Editor.rangeRefs(editor)) {
    RangeRef.transform(_ref2, op);
  }
  // update dirty paths
  if (!isBatchingDirtyPaths(editor)) {
    var transform = Path.operationCanTransformPath(op) ? p => Path.transform(p, op) : undefined;
    updateDirtyPaths(editor, editor.getDirtyPaths(op), transform);
  }
  Transforms.transform(editor, op);
  editor.operations.push(op);
  Editor.normalize(editor, {
    operation: op
  });
  // Clear any formats applied to the cursor if the selection changes.
  if (op.type === 'set_selection') {
    editor.marks = null;
  }
  if (!FLUSHING.get(editor)) {
    FLUSHING.set(editor, true);
    Promise.resolve().then(() => {
      FLUSHING.set(editor, false);
      editor.onChange({
        operation: op
      });
      editor.operations = [];
    });
  }
};

/**
 * Get the "dirty" paths generated from an operation.
 */
var getDirtyPaths = (editor, op) => {
  switch (op.type) {
    case 'insert_text':
    case 'remove_text':
    case 'set_node':
      {
        var {
          path
        } = op;
        return Path.levels(path);
      }
    case 'insert_node':
      {
        var {
          node,
          path: _path
        } = op;
        var levels = Path.levels(_path);
        var descendants = Text$1.isText(node) ? [] : Array.from(Node.nodes(node), _ref => {
          var [, p] = _ref;
          return _path.concat(p);
        });
        return [...levels, ...descendants];
      }
    case 'merge_node':
      {
        var {
          path: _path2
        } = op;
        var ancestors = Path.ancestors(_path2);
        var previousPath = Path.previous(_path2);
        return [...ancestors, previousPath];
      }
    case 'move_node':
      {
        var {
          path: _path3,
          newPath
        } = op;
        if (Path.equals(_path3, newPath)) {
          return [];
        }
        var oldAncestors = [];
        var newAncestors = [];
        for (var ancestor of Path.ancestors(_path3)) {
          var p = Path.transform(ancestor, op);
          oldAncestors.push(p);
        }
        for (var _ancestor of Path.ancestors(newPath)) {
          var _p = Path.transform(_ancestor, op);
          newAncestors.push(_p);
        }
        var newParent = newAncestors[newAncestors.length - 1];
        var newIndex = newPath[newPath.length - 1];
        var resultPath = newParent.concat(newIndex);
        return [...oldAncestors, ...newAncestors, resultPath];
      }
    case 'remove_node':
      {
        var {
          path: _path4
        } = op;
        var _ancestors = Path.ancestors(_path4);
        return [..._ancestors];
      }
    case 'split_node':
      {
        var {
          path: _path5
        } = op;
        var _levels = Path.levels(_path5);
        var nextPath = Path.next(_path5);
        return [..._levels, nextPath];
      }
    default:
      {
        return [];
      }
  }
};

var getFragment = editor => {
  var {
    selection
  } = editor;
  if (selection) {
    return Node.fragment(editor, selection);
  }
  return [];
};

var normalizeNode = (editor, entry) => {
  var [node, path] = entry;
  // There are no core normalizations for text nodes.
  if (Text$1.isText(node)) {
    return;
  }
  // Ensure that block and inline nodes have at least one text child.
  if (Element$2.isElement(node) && node.children.length === 0) {
    var child = {
      text: ''
    };
    Transforms.insertNodes(editor, child, {
      at: path.concat(0),
      voids: true
    });
    return;
  }
  // Determine whether the node should have block or inline children.
  var shouldHaveInlines = Editor.isEditor(node) ? false : Element$2.isElement(node) && (editor.isInline(node) || node.children.length === 0 || Text$1.isText(node.children[0]) || editor.isInline(node.children[0]));
  // Since we'll be applying operations while iterating, keep track of an
  // index that accounts for any added/removed nodes.
  var n = 0;
  for (var i = 0; i < node.children.length; i++, n++) {
    var currentNode = Node.get(editor, path);
    if (Text$1.isText(currentNode)) continue;
    var _child = currentNode.children[n];
    var prev = currentNode.children[n - 1];
    var isLast = i === node.children.length - 1;
    var isInlineOrText = Text$1.isText(_child) || Element$2.isElement(_child) && editor.isInline(_child);
    // Only allow block nodes in the top-level children and parent blocks
    // that only contain block nodes. Similarly, only allow inline nodes in
    // other inline nodes, or parent blocks that only contain inlines and
    // text.
    if (isInlineOrText !== shouldHaveInlines) {
      Transforms.removeNodes(editor, {
        at: path.concat(n),
        voids: true
      });
      n--;
    } else if (Element$2.isElement(_child)) {
      // Ensure that inline nodes are surrounded by text nodes.
      if (editor.isInline(_child)) {
        if (prev == null || !Text$1.isText(prev)) {
          var newChild = {
            text: ''
          };
          Transforms.insertNodes(editor, newChild, {
            at: path.concat(n),
            voids: true
          });
          n++;
        } else if (isLast) {
          var _newChild = {
            text: ''
          };
          Transforms.insertNodes(editor, _newChild, {
            at: path.concat(n + 1),
            voids: true
          });
          n++;
        }
      }
    } else {
      // If the child is not a text node, and doesn't have a `children` field,
      // then we have an invalid node that will upset slate.
      //
      // eg: `{ type: 'some_node' }`.
      //
      // To prevent slate from breaking, we can add the `children` field,
      // and now that it is valid, we can to many more operations easily,
      // such as extend normalizers to fix erronous structure.
      if (!Text$1.isText(_child) && !('children' in _child)) {
        var elementChild = _child;
        elementChild.children = [];
      }
      // Merge adjacent text nodes that are empty or match.
      if (prev != null && Text$1.isText(prev)) {
        if (Text$1.equals(_child, prev, {
          loose: true
        })) {
          Transforms.mergeNodes(editor, {
            at: path.concat(n),
            voids: true
          });
          n--;
        } else if (prev.text === '') {
          Transforms.removeNodes(editor, {
            at: path.concat(n - 1),
            voids: true
          });
          n--;
        } else if (_child.text === '') {
          Transforms.removeNodes(editor, {
            at: path.concat(n),
            voids: true
          });
          n--;
        }
      }
    }
  }
};

var shouldNormalize = (editor, _ref) => {
  var {
    iteration,
    initialDirtyPathsLength
  } = _ref;
  var maxIterations = initialDirtyPathsLength * 42; // HACK: better way?
  if (iteration > maxIterations) {
    throw new Error("Could not completely normalize the editor after ".concat(maxIterations, " iterations! This is usually due to incorrect normalization logic that leaves a node in an invalid state."));
  }
  return true;
};

var above = function above(editor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var {
    voids = false,
    mode = 'lowest',
    at = editor.selection,
    match
  } = options;
  if (!at) {
    return;
  }
  var path = Editor.path(editor, at);
  var reverse = mode === 'lowest';
  for (var [n, p] of Editor.levels(editor, {
    at: path,
    voids,
    match,
    reverse
  })) {
    if (Text$1.isText(n)) continue;
    if (Range.isRange(at)) {
      if (Path.isAncestor(p, at.anchor.path) && Path.isAncestor(p, at.focus.path)) {
        return [n, p];
      }
    } else {
      if (!Path.equals(path, p)) {
        return [n, p];
      }
    }
  }
};

function ownKeys$8(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$8(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$8(Object(t), true).forEach(function (r) { _defineProperty$1(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$8(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var addMark = (editor, key, value) => {
  var {
    selection
  } = editor;
  if (selection) {
    var match = (node, path) => {
      if (!Text$1.isText(node)) {
        return false; // marks can only be applied to text
      }

      var [parentNode, parentPath] = Editor.parent(editor, path);
      return !editor.isVoid(parentNode) || editor.markableVoid(parentNode);
    };
    var expandedSelection = Range.isExpanded(selection);
    var markAcceptingVoidSelected = false;
    if (!expandedSelection) {
      var [selectedNode, selectedPath] = Editor.node(editor, selection);
      if (selectedNode && match(selectedNode, selectedPath)) {
        var [parentNode] = Editor.parent(editor, selectedPath);
        markAcceptingVoidSelected = parentNode && editor.markableVoid(parentNode);
      }
    }
    if (expandedSelection || markAcceptingVoidSelected) {
      Transforms.setNodes(editor, {
        [key]: value
      }, {
        match,
        split: true,
        voids: true
      });
    } else {
      var marks = _objectSpread$8(_objectSpread$8({}, Editor.marks(editor) || {}), {}, {
        [key]: value
      });
      editor.marks = marks;
      if (!FLUSHING.get(editor)) {
        editor.onChange();
      }
    }
  }
};

function ownKeys$7(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$7(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$7(Object(t), true).forEach(function (r) { _defineProperty$1(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$7(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var after = function after(editor, at) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var anchor = Editor.point(editor, at, {
    edge: 'end'
  });
  var focus = Editor.end(editor, []);
  var range = {
    anchor,
    focus
  };
  var {
    distance = 1
  } = options;
  var d = 0;
  var target;
  for (var p of Editor.positions(editor, _objectSpread$7(_objectSpread$7({}, options), {}, {
    at: range
  }))) {
    if (d > distance) {
      break;
    }
    if (d !== 0) {
      target = p;
    }
    d++;
  }
  return target;
};

function ownKeys$6$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$6$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$6$1(Object(t), true).forEach(function (r) { _defineProperty$1(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$6$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var before = function before(editor, at) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var anchor = Editor.start(editor, []);
  var focus = Editor.point(editor, at, {
    edge: 'start'
  });
  var range = {
    anchor,
    focus
  };
  var {
    distance = 1
  } = options;
  var d = 0;
  var target;
  for (var p of Editor.positions(editor, _objectSpread$6$1(_objectSpread$6$1({}, options), {}, {
    at: range,
    reverse: true
  }))) {
    if (d > distance) {
      break;
    }
    if (d !== 0) {
      target = p;
    }
    d++;
  }
  return target;
};

var deleteBackward = (editor, unit) => {
  var {
    selection
  } = editor;
  if (selection && Range.isCollapsed(selection)) {
    Transforms.delete(editor, {
      unit,
      reverse: true
    });
  }
};

var deleteForward = (editor, unit) => {
  var {
    selection
  } = editor;
  if (selection && Range.isCollapsed(selection)) {
    Transforms.delete(editor, {
      unit
    });
  }
};

var deleteFragment = function deleteFragment(editor) {
  var {
    direction = 'forward'
  } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var {
    selection
  } = editor;
  if (selection && Range.isExpanded(selection)) {
    Transforms.delete(editor, {
      reverse: direction === 'backward'
    });
  }
};

var edges = (editor, at) => {
  return [Editor.start(editor, at), Editor.end(editor, at)];
};

function ownKeys$5$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$5$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$5$1(Object(t), true).forEach(function (r) { _defineProperty$1(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$5$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var elementReadOnly = function elementReadOnly(editor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Editor.above(editor, _objectSpread$5$1(_objectSpread$5$1({}, options), {}, {
    match: n => Element$2.isElement(n) && Editor.isElementReadOnly(editor, n)
  }));
};

var end = (editor, at) => {
  return Editor.point(editor, at, {
    edge: 'end'
  });
};

var first = (editor, at) => {
  var path = Editor.path(editor, at, {
    edge: 'start'
  });
  return Editor.node(editor, path);
};

var fragment = (editor, at) => {
  var range = Editor.range(editor, at);
  return Node.fragment(editor, range);
};

function ownKeys$4$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$4$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$4$1(Object(t), true).forEach(function (r) { _defineProperty$1(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$4$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var getVoid = function getVoid(editor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Editor.above(editor, _objectSpread$4$1(_objectSpread$4$1({}, options), {}, {
    match: n => Element$2.isElement(n) && Editor.isVoid(editor, n)
  }));
};

var hasBlocks = (editor, element) => {
  return element.children.some(n => Element$2.isElement(n) && Editor.isBlock(editor, n));
};

var hasInlines = (editor, element) => {
  return element.children.some(n => Text$1.isText(n) || Editor.isInline(editor, n));
};

var hasPath = (editor, path) => {
  return Node.has(editor, path);
};

var hasTexts = (editor, element) => {
  return element.children.every(n => Text$1.isText(n));
};

var insertBreak = editor => {
  Transforms.splitNodes(editor, {
    always: true
  });
};

var insertNode = (editor, node, options) => {
  Transforms.insertNodes(editor, node, options);
};

var insertSoftBreak = editor => {
  Transforms.splitNodes(editor, {
    always: true
  });
};

function ownKeys$3$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$3$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$3$1(Object(t), true).forEach(function (r) { _defineProperty$1(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var insertText = function insertText(editor, text) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var {
    selection,
    marks
  } = editor;
  if (selection) {
    if (marks) {
      var node = _objectSpread$3$1({
        text
      }, marks);
      Transforms.insertNodes(editor, node, {
        at: options.at,
        voids: options.voids
      });
    } else {
      Transforms.insertText(editor, text, options);
    }
    editor.marks = null;
  }
};

var isBlock = (editor, value) => {
  return !editor.isInline(value);
};

var isEdge = (editor, point, at) => {
  return Editor.isStart(editor, point, at) || Editor.isEnd(editor, point, at);
};

var isEmpty = (editor, element) => {
  var {
    children
  } = element;
  var [first] = children;
  return children.length === 0 || children.length === 1 && Text$1.isText(first) && first.text === '' && !editor.isVoid(element);
};

var isEnd = (editor, point, at) => {
  var end = Editor.end(editor, at);
  return Point.equals(point, end);
};

var isNormalizing = editor => {
  var isNormalizing = NORMALIZING.get(editor);
  return isNormalizing === undefined ? true : isNormalizing;
};

var isStart = (editor, point, at) => {
  // PERF: If the offset isn't `0` we know it's not the start.
  if (point.offset !== 0) {
    return false;
  }
  var start = Editor.start(editor, at);
  return Point.equals(point, start);
};

var last = (editor, at) => {
  var path = Editor.path(editor, at, {
    edge: 'end'
  });
  return Editor.node(editor, path);
};

var leaf = function leaf(editor, at) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var path = Editor.path(editor, at, options);
  var node = Node.leaf(editor, path);
  return [node, path];
};

function levels(editor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function* () {
    var {
      at = editor.selection,
      reverse = false,
      voids = false
    } = options;
    var {
      match
    } = options;
    if (match == null) {
      match = () => true;
    }
    if (!at) {
      return;
    }
    var levels = [];
    var path = Editor.path(editor, at);
    for (var [n, p] of Node.levels(editor, path)) {
      if (!match(n, p)) {
        continue;
      }
      levels.push([n, p]);
      if (!voids && Element$2.isElement(n) && Editor.isVoid(editor, n)) {
        break;
      }
    }
    if (reverse) {
      levels.reverse();
    }
    yield* levels;
  }();
}

var _excluded$1$1 = ["text"],
  _excluded2$1$1 = ["text"];
var marks = function marks(editor) {
  var {
    marks,
    selection
  } = editor;
  if (!selection) {
    return null;
  }
  var {
    anchor,
    focus
  } = selection;
  if (marks) {
    return marks;
  }
  if (Range.isExpanded(selection)) {
    /**
     * COMPAT: Make sure hanging ranges (caused by double clicking in Firefox)
     * do not adversely affect the returned marks.
     */
    var isEnd = Editor.isEnd(editor, anchor, anchor.path);
    if (isEnd) {
      var after = Editor.after(editor, anchor);
      if (after) {
        anchor = after;
      }
    }
    var [match] = Editor.nodes(editor, {
      match: Text$1.isText,
      at: {
        anchor,
        focus
      }
    });
    if (match) {
      var [_node] = match;
      var _rest = _objectWithoutProperties$1(_node, _excluded$1$1);
      return _rest;
    } else {
      return {};
    }
  }
  var {
    path
  } = anchor;
  var [node] = Editor.leaf(editor, path);
  if (anchor.offset === 0) {
    var prev = Editor.previous(editor, {
      at: path,
      match: Text$1.isText
    });
    var markedVoid = Editor.above(editor, {
      match: n => Element$2.isElement(n) && Editor.isVoid(editor, n) && editor.markableVoid(n)
    });
    if (!markedVoid) {
      var block = Editor.above(editor, {
        match: n => Element$2.isElement(n) && Editor.isBlock(editor, n)
      });
      if (prev && block) {
        var [prevNode, prevPath] = prev;
        var [, blockPath] = block;
        if (Path.isAncestor(blockPath, prevPath)) {
          node = prevNode;
        }
      }
    }
  }
  var rest = _objectWithoutProperties$1(node, _excluded2$1$1);
  return rest;
};

var next = function next(editor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var {
    mode = 'lowest',
    voids = false
  } = options;
  var {
    match,
    at = editor.selection
  } = options;
  if (!at) {
    return;
  }
  var pointAfterLocation = Editor.after(editor, at, {
    voids
  });
  if (!pointAfterLocation) return;
  var [, to] = Editor.last(editor, []);
  var span = [pointAfterLocation.path, to];
  if (Path.isPath(at) && at.length === 0) {
    throw new Error("Cannot get the next node from the root node!");
  }
  if (match == null) {
    if (Path.isPath(at)) {
      var [parent] = Editor.parent(editor, at);
      match = n => parent.children.includes(n);
    } else {
      match = () => true;
    }
  }
  var [next] = Editor.nodes(editor, {
    at: span,
    match,
    mode,
    voids
  });
  return next;
};

var node = function node(editor, at) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var path = Editor.path(editor, at, options);
  var node = Node.get(editor, path);
  return [node, path];
};

function nodes(editor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function* () {
    var {
      at = editor.selection,
      mode = 'all',
      universal = false,
      reverse = false,
      voids = false,
      ignoreNonSelectable = false
    } = options;
    var {
      match
    } = options;
    if (!match) {
      match = () => true;
    }
    if (!at) {
      return;
    }
    var from;
    var to;
    if (Span.isSpan(at)) {
      from = at[0];
      to = at[1];
    } else {
      var first = Editor.path(editor, at, {
        edge: 'start'
      });
      var last = Editor.path(editor, at, {
        edge: 'end'
      });
      from = reverse ? last : first;
      to = reverse ? first : last;
    }
    var nodeEntries = Node.nodes(editor, {
      reverse,
      from,
      to,
      pass: _ref => {
        var [node] = _ref;
        if (!Element$2.isElement(node)) return false;
        if (!voids && (Editor.isVoid(editor, node) || Editor.isElementReadOnly(editor, node))) return true;
        if (ignoreNonSelectable && !Editor.isSelectable(editor, node)) return true;
        return false;
      }
    });
    var matches = [];
    var hit;
    for (var [node, path] of nodeEntries) {
      if (ignoreNonSelectable && Element$2.isElement(node) && !Editor.isSelectable(editor, node)) {
        continue;
      }
      var isLower = hit && Path.compare(path, hit[1]) === 0;
      // In highest mode any node lower than the last hit is not a match.
      if (mode === 'highest' && isLower) {
        continue;
      }
      if (!match(node, path)) {
        // If we've arrived at a leaf text node that is not lower than the last
        // hit, then we've found a branch that doesn't include a match, which
        // means the match is not universal.
        if (universal && !isLower && Text$1.isText(node)) {
          return;
        } else {
          continue;
        }
      }
      // If there's a match and it's lower than the last, update the hit.
      if (mode === 'lowest' && isLower) {
        hit = [node, path];
        continue;
      }
      // In lowest mode we emit the last hit, once it's guaranteed lowest.
      var emit = mode === 'lowest' ? hit : [node, path];
      if (emit) {
        if (universal) {
          matches.push(emit);
        } else {
          yield emit;
        }
      }
      hit = [node, path];
    }
    // Since lowest is always emitting one behind, catch up at the end.
    if (mode === 'lowest' && hit) {
      if (universal) {
        matches.push(hit);
      } else {
        yield hit;
      }
    }
    // Universal defers to ensure that the match occurs in every branch, so we
    // yield all of the matches after iterating.
    if (universal) {
      yield* matches;
    }
  }();
}

var normalize = function normalize(editor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var {
    force = false,
    operation
  } = options;
  var getDirtyPaths = editor => {
    return DIRTY_PATHS.get(editor) || [];
  };
  var getDirtyPathKeys = editor => {
    return DIRTY_PATH_KEYS.get(editor) || new Set();
  };
  var popDirtyPath = editor => {
    var path = getDirtyPaths(editor).pop();
    var key = path.join(',');
    getDirtyPathKeys(editor).delete(key);
    return path;
  };
  if (!Editor.isNormalizing(editor)) {
    return;
  }
  if (force) {
    var allPaths = Array.from(Node.nodes(editor), _ref => {
      var [, p] = _ref;
      return p;
    });
    var allPathKeys = new Set(allPaths.map(p => p.join(',')));
    DIRTY_PATHS.set(editor, allPaths);
    DIRTY_PATH_KEYS.set(editor, allPathKeys);
  }
  if (getDirtyPaths(editor).length === 0) {
    return;
  }
  Editor.withoutNormalizing(editor, () => {
    /*
      Fix dirty elements with no children.
      editor.normalizeNode() does fix this, but some normalization fixes also require it to work.
      Running an initial pass avoids the catch-22 race condition.
    */
    for (var dirtyPath of getDirtyPaths(editor)) {
      if (Node.has(editor, dirtyPath)) {
        var entry = Editor.node(editor, dirtyPath);
        var [node, _] = entry;
        /*
          The default normalizer inserts an empty text node in this scenario, but it can be customised.
          So there is some risk here.
                   As long as the normalizer only inserts child nodes for this case it is safe to do in any order;
          by definition adding children to an empty node can't cause other paths to change.
        */
        if (Element$2.isElement(node) && node.children.length === 0) {
          editor.normalizeNode(entry, {
            operation
          });
        }
      }
    }
    var dirtyPaths = getDirtyPaths(editor);
    var initialDirtyPathsLength = dirtyPaths.length;
    var iteration = 0;
    while (dirtyPaths.length !== 0) {
      if (!editor.shouldNormalize({
        dirtyPaths,
        iteration,
        initialDirtyPathsLength,
        operation
      })) {
        return;
      }
      var _dirtyPath = popDirtyPath(editor);
      // If the node doesn't exist in the tree, it does not need to be normalized.
      if (Node.has(editor, _dirtyPath)) {
        var _entry = Editor.node(editor, _dirtyPath);
        editor.normalizeNode(_entry, {
          operation
        });
      }
      iteration++;
      dirtyPaths = getDirtyPaths(editor);
    }
  });
};

var parent = function parent(editor, at) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var path = Editor.path(editor, at, options);
  var parentPath = Path.parent(path);
  var entry = Editor.node(editor, parentPath);
  return entry;
};

var pathRef = function pathRef(editor, path) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var {
    affinity = 'forward'
  } = options;
  var ref = {
    current: path,
    affinity,
    unref() {
      var {
        current
      } = ref;
      var pathRefs = Editor.pathRefs(editor);
      pathRefs.delete(ref);
      ref.current = null;
      return current;
    }
  };
  var refs = Editor.pathRefs(editor);
  refs.add(ref);
  return ref;
};

var pathRefs = editor => {
  var refs = PATH_REFS.get(editor);
  if (!refs) {
    refs = new Set();
    PATH_REFS.set(editor, refs);
  }
  return refs;
};

var path = function path(editor, at) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var {
    depth,
    edge
  } = options;
  if (Path.isPath(at)) {
    if (edge === 'start') {
      var [, firstPath] = Node.first(editor, at);
      at = firstPath;
    } else if (edge === 'end') {
      var [, lastPath] = Node.last(editor, at);
      at = lastPath;
    }
  }
  if (Range.isRange(at)) {
    if (edge === 'start') {
      at = Range.start(at);
    } else if (edge === 'end') {
      at = Range.end(at);
    } else {
      at = Path.common(at.anchor.path, at.focus.path);
    }
  }
  if (Point.isPoint(at)) {
    at = at.path;
  }
  if (depth != null) {
    at = at.slice(0, depth);
  }
  return at;
};

var pointRef = function pointRef(editor, point) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var {
    affinity = 'forward'
  } = options;
  var ref = {
    current: point,
    affinity,
    unref() {
      var {
        current
      } = ref;
      var pointRefs = Editor.pointRefs(editor);
      pointRefs.delete(ref);
      ref.current = null;
      return current;
    }
  };
  var refs = Editor.pointRefs(editor);
  refs.add(ref);
  return ref;
};

var pointRefs = editor => {
  var refs = POINT_REFS.get(editor);
  if (!refs) {
    refs = new Set();
    POINT_REFS.set(editor, refs);
  }
  return refs;
};

var point = function point(editor, at) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var {
    edge = 'start'
  } = options;
  if (Path.isPath(at)) {
    var path;
    if (edge === 'end') {
      var [, lastPath] = Node.last(editor, at);
      path = lastPath;
    } else {
      var [, firstPath] = Node.first(editor, at);
      path = firstPath;
    }
    var node = Node.get(editor, path);
    if (!Text$1.isText(node)) {
      throw new Error("Cannot get the ".concat(edge, " point in the node at path [").concat(at, "] because it has no ").concat(edge, " text node."));
    }
    return {
      path,
      offset: edge === 'end' ? node.text.length : 0
    };
  }
  if (Range.isRange(at)) {
    var [start, end] = Range.edges(at);
    return edge === 'start' ? start : end;
  }
  return at;
};

function positions(editor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function* () {
    var {
      at = editor.selection,
      unit = 'offset',
      reverse = false,
      voids = false,
      ignoreNonSelectable = false
    } = options;
    if (!at) {
      return;
    }
    /**
     * Algorithm notes:
     *
     * Each step `distance` is dynamic depending on the underlying text
     * and the `unit` specified.  Each step, e.g., a line or word, may
     * span multiple text nodes, so we iterate through the text both on
     * two levels in step-sync:
     *
     * `leafText` stores the text on a text leaf level, and is advanced
     * through using the counters `leafTextOffset` and `leafTextRemaining`.
     *
     * `blockText` stores the text on a block level, and is shortened
     * by `distance` every time it is advanced.
     *
     * We only maintain a window of one blockText and one leafText because
     * a block node always appears before all of its leaf nodes.
     */
    var range = Editor.range(editor, at);
    var [start, end] = Range.edges(range);
    var first = reverse ? end : start;
    var isNewBlock = false;
    var blockText = '';
    var distance = 0; // Distance for leafText to catch up to blockText.
    var leafTextRemaining = 0;
    var leafTextOffset = 0;
    // Iterate through all nodes in range, grabbing entire textual content
    // of block nodes in blockText, and text nodes in leafText.
    // Exploits the fact that nodes are sequenced in such a way that we first
    // encounter the block node, then all of its text nodes, so when iterating
    // through the blockText and leafText we just need to remember a window of
    // one block node and leaf node, respectively.
    for (var [node, path] of Editor.nodes(editor, {
      at,
      reverse,
      voids,
      ignoreNonSelectable
    })) {
      /*
       * ELEMENT NODE - Yield position(s) for voids, collect blockText for blocks
       */
      if (Element$2.isElement(node)) {
        // Void nodes are a special case, so by default we will always
        // yield their first point. If the `voids` option is set to true,
        // then we will iterate over their content.
        if (!voids && (editor.isVoid(node) || editor.isElementReadOnly(node))) {
          yield Editor.start(editor, path);
          continue;
        }
        // Inline element nodes are ignored as they don't themselves
        // contribute to `blockText` or `leafText` - their parent and
        // children do.
        if (editor.isInline(node)) continue;
        // Block element node - set `blockText` to its text content.
        if (Editor.hasInlines(editor, node)) {
          // We always exhaust block nodes before encountering a new one:
          //   console.assert(blockText === '',
          //     `blockText='${blockText}' - `+
          //     `not exhausted before new block node`, path)
          // Ensure range considered is capped to `range`, in the
          // start/end edge cases where block extends beyond range.
          // Equivalent to this, but presumably more performant:
          //   blockRange = Editor.range(editor, ...Editor.edges(editor, path))
          //   blockRange = Range.intersection(range, blockRange) // intersect
          //   blockText = Editor.string(editor, blockRange, { voids })
          var e = Path.isAncestor(path, end.path) ? end : Editor.end(editor, path);
          var s = Path.isAncestor(path, start.path) ? start : Editor.start(editor, path);
          blockText = Editor.string(editor, {
            anchor: s,
            focus: e
          }, {
            voids
          });
          isNewBlock = true;
        }
      }
      /*
       * TEXT LEAF NODE - Iterate through text content, yielding
       * positions every `distance` offset according to `unit`.
       */
      if (Text$1.isText(node)) {
        var isFirst = Path.equals(path, first.path);
        // Proof that we always exhaust text nodes before encountering a new one:
        //   console.assert(leafTextRemaining <= 0,
        //     `leafTextRemaining=${leafTextRemaining} - `+
        //     `not exhausted before new leaf text node`, path)
        // Reset `leafText` counters for new text node.
        if (isFirst) {
          leafTextRemaining = reverse ? first.offset : node.text.length - first.offset;
          leafTextOffset = first.offset; // Works for reverse too.
        } else {
          leafTextRemaining = node.text.length;
          leafTextOffset = reverse ? leafTextRemaining : 0;
        }
        // Yield position at the start of node (potentially).
        if (isFirst || isNewBlock || unit === 'offset') {
          yield {
            path,
            offset: leafTextOffset
          };
          isNewBlock = false;
        }
        // Yield positions every (dynamically calculated) `distance` offset.
        while (true) {
          // If `leafText` has caught up with `blockText` (distance=0),
          // and if blockText is exhausted, break to get another block node,
          // otherwise advance blockText forward by the new `distance`.
          if (distance === 0) {
            if (blockText === '') break;
            distance = calcDistance(blockText, unit, reverse);
            // Split the string at the previously found distance and use the
            // remaining string for the next iteration.
            blockText = splitByCharacterDistance(blockText, distance, reverse)[1];
          }
          // Advance `leafText` by the current `distance`.
          leafTextOffset = reverse ? leafTextOffset - distance : leafTextOffset + distance;
          leafTextRemaining = leafTextRemaining - distance;
          // If `leafText` is exhausted, break to get a new leaf node
          // and set distance to the overflow amount, so we'll (maybe)
          // catch up to blockText in the next leaf text node.
          if (leafTextRemaining < 0) {
            distance = -leafTextRemaining;
            break;
          }
          // Successfully walked `distance` offsets through `leafText`
          // to catch up with `blockText`, so we can reset `distance`
          // and yield this position in this node.
          distance = 0;
          yield {
            path,
            offset: leafTextOffset
          };
        }
      }
    }
    // Proof that upon completion, we've exahusted both leaf and block text:
    //   console.assert(leafTextRemaining <= 0, "leafText wasn't exhausted")
    //   console.assert(blockText === '', "blockText wasn't exhausted")
    // Helper:
    // Return the distance in offsets for a step of size `unit` on given string.
    function calcDistance(text, unit, reverse) {
      if (unit === 'character') {
        return getCharacterDistance(text, reverse);
      } else if (unit === 'word') {
        return getWordDistance(text, reverse);
      } else if (unit === 'line' || unit === 'block') {
        return text.length;
      }
      return 1;
    }
  }();
}

var previous = function previous(editor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var {
    mode = 'lowest',
    voids = false
  } = options;
  var {
    match,
    at = editor.selection
  } = options;
  if (!at) {
    return;
  }
  var pointBeforeLocation = Editor.before(editor, at, {
    voids
  });
  if (!pointBeforeLocation) {
    return;
  }
  var [, to] = Editor.first(editor, []);
  // The search location is from the start of the document to the path of
  // the point before the location passed in
  var span = [pointBeforeLocation.path, to];
  if (Path.isPath(at) && at.length === 0) {
    throw new Error("Cannot get the previous node from the root node!");
  }
  if (match == null) {
    if (Path.isPath(at)) {
      var [parent] = Editor.parent(editor, at);
      match = n => parent.children.includes(n);
    } else {
      match = () => true;
    }
  }
  var [previous] = Editor.nodes(editor, {
    reverse: true,
    at: span,
    match,
    mode,
    voids
  });
  return previous;
};

var rangeRef = function rangeRef(editor, range) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var {
    affinity = 'forward'
  } = options;
  var ref = {
    current: range,
    affinity,
    unref() {
      var {
        current
      } = ref;
      var rangeRefs = Editor.rangeRefs(editor);
      rangeRefs.delete(ref);
      ref.current = null;
      return current;
    }
  };
  var refs = Editor.rangeRefs(editor);
  refs.add(ref);
  return ref;
};

var rangeRefs = editor => {
  var refs = RANGE_REFS.get(editor);
  if (!refs) {
    refs = new Set();
    RANGE_REFS.set(editor, refs);
  }
  return refs;
};

var range = (editor, at, to) => {
  if (Range.isRange(at) && !to) {
    return at;
  }
  var start = Editor.start(editor, at);
  var end = Editor.end(editor, to || at);
  return {
    anchor: start,
    focus: end
  };
};

function ownKeys$2$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$2$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$2$1(Object(t), true).forEach(function (r) { _defineProperty$1(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var removeMark = (editor, key) => {
  var {
    selection
  } = editor;
  if (selection) {
    var match = (node, path) => {
      if (!Text$1.isText(node)) {
        return false; // marks can only be applied to text
      }

      var [parentNode, parentPath] = Editor.parent(editor, path);
      return !editor.isVoid(parentNode) || editor.markableVoid(parentNode);
    };
    var expandedSelection = Range.isExpanded(selection);
    var markAcceptingVoidSelected = false;
    if (!expandedSelection) {
      var [selectedNode, selectedPath] = Editor.node(editor, selection);
      if (selectedNode && match(selectedNode, selectedPath)) {
        var [parentNode] = Editor.parent(editor, selectedPath);
        markAcceptingVoidSelected = parentNode && editor.markableVoid(parentNode);
      }
    }
    if (expandedSelection || markAcceptingVoidSelected) {
      Transforms.unsetNodes(editor, key, {
        match,
        split: true,
        voids: true
      });
    } else {
      var marks = _objectSpread$2$1({}, Editor.marks(editor) || {});
      delete marks[key];
      editor.marks = marks;
      if (!FLUSHING.get(editor)) {
        editor.onChange();
      }
    }
  }
};

var setNormalizing = (editor, isNormalizing) => {
  NORMALIZING.set(editor, isNormalizing);
};

var start = (editor, at) => {
  return Editor.point(editor, at, {
    edge: 'start'
  });
};

var string = function string(editor, at) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var {
    voids = false
  } = options;
  var range = Editor.range(editor, at);
  var [start, end] = Range.edges(range);
  var text = '';
  for (var [node, path] of Editor.nodes(editor, {
    at: range,
    match: Text$1.isText,
    voids
  })) {
    var t = node.text;
    if (Path.equals(path, end.path)) {
      t = t.slice(0, end.offset);
    }
    if (Path.equals(path, start.path)) {
      t = t.slice(start.offset);
    }
    text += t;
  }
  return text;
};

var unhangRange = function unhangRange(editor, range) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var {
    voids = false
  } = options;
  var [start, end] = Range.edges(range);
  // PERF: exit early if we can guarantee that the range isn't hanging.
  if (start.offset !== 0 || end.offset !== 0 || Range.isCollapsed(range) || Path.hasPrevious(end.path)) {
    return range;
  }
  var endBlock = Editor.above(editor, {
    at: end,
    match: n => Element$2.isElement(n) && Editor.isBlock(editor, n),
    voids
  });
  var blockPath = endBlock ? endBlock[1] : [];
  var first = Editor.start(editor, start);
  var before = {
    anchor: first,
    focus: end
  };
  var skip = true;
  for (var [node, path] of Editor.nodes(editor, {
    at: before,
    match: Text$1.isText,
    reverse: true,
    voids
  })) {
    if (skip) {
      skip = false;
      continue;
    }
    if (node.text !== '' || Path.isBefore(path, blockPath)) {
      end = {
        path,
        offset: node.text.length
      };
      break;
    }
  }
  return {
    anchor: start,
    focus: end
  };
};

var withoutNormalizing = (editor, fn) => {
  var value = Editor.isNormalizing(editor);
  Editor.setNormalizing(editor, false);
  try {
    fn();
  } finally {
    Editor.setNormalizing(editor, value);
  }
  Editor.normalize(editor);
};

var shouldMergeNodesRemovePrevNode = (editor, _ref, _ref2) => {
  var [prevNode, prevPath] = _ref;
  // If the target node that we're merging with is empty, remove it instead
  // of merging the two. This is a common rich text editor behavior to
  // prevent losing formatting when deleting entire nodes when you have a
  // hanging selection.
  // if prevNode is first child in parent,don't remove it.
  return Element$2.isElement(prevNode) && Editor.isEmpty(editor, prevNode) || Text$1.isText(prevNode) && prevNode.text === '' && prevPath[prevPath.length - 1] !== 0;
};

var deleteText = function deleteText(editor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  Editor.withoutNormalizing(editor, () => {
    var _Editor$void, _Editor$void2;
    var {
      reverse = false,
      unit = 'character',
      distance = 1,
      voids = false
    } = options;
    var {
      at = editor.selection,
      hanging = false
    } = options;
    if (!at) {
      return;
    }
    var isCollapsed = false;
    if (Range.isRange(at) && Range.isCollapsed(at)) {
      isCollapsed = true;
      at = at.anchor;
    }
    if (Point.isPoint(at)) {
      var furthestVoid = Editor.void(editor, {
        at,
        mode: 'highest'
      });
      if (!voids && furthestVoid) {
        var [, voidPath] = furthestVoid;
        at = voidPath;
      } else {
        var opts = {
          unit,
          distance
        };
        var target = reverse ? Editor.before(editor, at, opts) || Editor.start(editor, []) : Editor.after(editor, at, opts) || Editor.end(editor, []);
        at = {
          anchor: at,
          focus: target
        };
        hanging = true;
      }
    }
    if (Path.isPath(at)) {
      Transforms.removeNodes(editor, {
        at,
        voids
      });
      return;
    }
    if (Range.isCollapsed(at)) {
      return;
    }
    if (!hanging) {
      var [, _end] = Range.edges(at);
      var endOfDoc = Editor.end(editor, []);
      if (!Point.equals(_end, endOfDoc)) {
        at = Editor.unhangRange(editor, at, {
          voids
        });
      }
    }
    var [start, end] = Range.edges(at);
    var startBlock = Editor.above(editor, {
      match: n => Element$2.isElement(n) && Editor.isBlock(editor, n),
      at: start,
      voids
    });
    var endBlock = Editor.above(editor, {
      match: n => Element$2.isElement(n) && Editor.isBlock(editor, n),
      at: end,
      voids
    });
    var isAcrossBlocks = startBlock && endBlock && !Path.equals(startBlock[1], endBlock[1]);
    var isSingleText = Path.equals(start.path, end.path);
    var startNonEditable = voids ? null : (_Editor$void = Editor.void(editor, {
      at: start,
      mode: 'highest'
    })) !== null && _Editor$void !== void 0 ? _Editor$void : Editor.elementReadOnly(editor, {
      at: start,
      mode: 'highest'
    });
    var endNonEditable = voids ? null : (_Editor$void2 = Editor.void(editor, {
      at: end,
      mode: 'highest'
    })) !== null && _Editor$void2 !== void 0 ? _Editor$void2 : Editor.elementReadOnly(editor, {
      at: end,
      mode: 'highest'
    });
    // If the start or end points are inside an inline void, nudge them out.
    if (startNonEditable) {
      var before = Editor.before(editor, start);
      if (before && startBlock && Path.isAncestor(startBlock[1], before.path)) {
        start = before;
      }
    }
    if (endNonEditable) {
      var after = Editor.after(editor, end);
      if (after && endBlock && Path.isAncestor(endBlock[1], after.path)) {
        end = after;
      }
    }
    // Get the highest nodes that are completely inside the range, as well as
    // the start and end nodes.
    var matches = [];
    var lastPath;
    for (var entry of Editor.nodes(editor, {
      at,
      voids
    })) {
      var [node, path] = entry;
      if (lastPath && Path.compare(path, lastPath) === 0) {
        continue;
      }
      if (!voids && Element$2.isElement(node) && (Editor.isVoid(editor, node) || Editor.isElementReadOnly(editor, node)) || !Path.isCommon(path, start.path) && !Path.isCommon(path, end.path)) {
        matches.push(entry);
        lastPath = path;
      }
    }
    var pathRefs = Array.from(matches, _ref => {
      var [, p] = _ref;
      return Editor.pathRef(editor, p);
    });
    var startRef = Editor.pointRef(editor, start);
    var endRef = Editor.pointRef(editor, end);
    var removedText = '';
    if (!isSingleText && !startNonEditable) {
      var _point = startRef.current;
      var [_node] = Editor.leaf(editor, _point);
      var {
        path: _path
      } = _point;
      var {
        offset
      } = start;
      var text = _node.text.slice(offset);
      if (text.length > 0) {
        editor.apply({
          type: 'remove_text',
          path: _path,
          offset,
          text
        });
        removedText = text;
      }
    }
    pathRefs.reverse().map(r => r.unref()).filter(r => r !== null).forEach(p => Transforms.removeNodes(editor, {
      at: p,
      voids
    }));
    if (!endNonEditable) {
      var _point2 = endRef.current;
      var [_node2] = Editor.leaf(editor, _point2);
      var {
        path: _path2
      } = _point2;
      var _offset = isSingleText ? start.offset : 0;
      var _text = _node2.text.slice(_offset, end.offset);
      if (_text.length > 0) {
        editor.apply({
          type: 'remove_text',
          path: _path2,
          offset: _offset,
          text: _text
        });
        removedText = _text;
      }
    }
    if (!isSingleText && isAcrossBlocks && endRef.current && startRef.current) {
      Transforms.mergeNodes(editor, {
        at: endRef.current,
        hanging: true,
        voids
      });
    }
    // For Thai script, deleting N character(s) backward should delete
    // N code point(s) instead of an entire grapheme cluster.
    // Therefore, the remaining code points should be inserted back.
    if (isCollapsed && reverse && unit === 'character' && removedText.length > 1 && removedText.match(/[\u0E00-\u0E7F]+/)) {
      Transforms.insertText(editor, removedText.slice(0, removedText.length - distance));
    }
    var startUnref = startRef.unref();
    var endUnref = endRef.unref();
    var point = reverse ? startUnref || endUnref : endUnref || startUnref;
    if (options.at == null && point) {
      Transforms.select(editor, point);
    }
  });
};

var insertFragment = function insertFragment(editor, fragment) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  Editor.withoutNormalizing(editor, () => {
    var {
      hanging = false,
      voids = false
    } = options;
    var {
      at = getDefaultInsertLocation(editor),
      batchDirty = true
    } = options;
    if (!fragment.length) {
      return;
    }
    if (Range.isRange(at)) {
      if (!hanging) {
        at = Editor.unhangRange(editor, at, {
          voids
        });
      }
      if (Range.isCollapsed(at)) {
        at = at.anchor;
      } else {
        var [, end] = Range.edges(at);
        if (!voids && Editor.void(editor, {
          at: end
        })) {
          return;
        }
        var pointRef = Editor.pointRef(editor, end);
        Transforms.delete(editor, {
          at
        });
        at = pointRef.unref();
      }
    } else if (Path.isPath(at)) {
      at = Editor.start(editor, at);
    }
    if (!voids && Editor.void(editor, {
      at
    })) {
      return;
    }
    // If the insert point is at the edge of an inline node, move it outside
    // instead since it will need to be split otherwise.
    var inlineElementMatch = Editor.above(editor, {
      at,
      match: n => Element$2.isElement(n) && Editor.isInline(editor, n),
      mode: 'highest',
      voids
    });
    if (inlineElementMatch) {
      var [, _inlinePath] = inlineElementMatch;
      if (Editor.isEnd(editor, at, _inlinePath)) {
        var after = Editor.after(editor, _inlinePath);
        at = after;
      } else if (Editor.isStart(editor, at, _inlinePath)) {
        var before = Editor.before(editor, _inlinePath);
        at = before;
      }
    }
    var blockMatch = Editor.above(editor, {
      match: n => Element$2.isElement(n) && Editor.isBlock(editor, n),
      at,
      voids
    });
    var [, blockPath] = blockMatch;
    var isBlockStart = Editor.isStart(editor, at, blockPath);
    var isBlockEnd = Editor.isEnd(editor, at, blockPath);
    var isBlockEmpty = isBlockStart && isBlockEnd;
    var mergeStart = !isBlockStart || isBlockStart && isBlockEnd;
    var mergeEnd = !isBlockEnd;
    var [, firstPath] = Node.first({
      children: fragment
    }, []);
    var [, lastPath] = Node.last({
      children: fragment
    }, []);
    var matches = [];
    var matcher = _ref => {
      var [n, p] = _ref;
      var isRoot = p.length === 0;
      if (isRoot) {
        return false;
      }
      if (isBlockEmpty) {
        return true;
      }
      if (mergeStart && Path.isAncestor(p, firstPath) && Element$2.isElement(n) && !editor.isVoid(n) && !editor.isInline(n)) {
        return false;
      }
      if (mergeEnd && Path.isAncestor(p, lastPath) && Element$2.isElement(n) && !editor.isVoid(n) && !editor.isInline(n)) {
        return false;
      }
      return true;
    };
    for (var entry of Node.nodes({
      children: fragment
    }, {
      pass: matcher
    })) {
      if (matcher(entry)) {
        matches.push(entry);
      }
    }
    var starts = [];
    var middles = [];
    var ends = [];
    var starting = true;
    var hasBlocks = false;
    for (var [node] of matches) {
      if (Element$2.isElement(node) && !editor.isInline(node)) {
        starting = false;
        hasBlocks = true;
        middles.push(node);
      } else if (starting) {
        starts.push(node);
      } else {
        ends.push(node);
      }
    }
    var [inlineMatch] = Editor.nodes(editor, {
      at,
      match: n => Text$1.isText(n) || Editor.isInline(editor, n),
      mode: 'highest',
      voids
    });
    var [, inlinePath] = inlineMatch;
    var isInlineStart = Editor.isStart(editor, at, inlinePath);
    var isInlineEnd = Editor.isEnd(editor, at, inlinePath);
    var middleRef = Editor.pathRef(editor, isBlockEnd && !ends.length ? Path.next(blockPath) : blockPath);
    var endRef = Editor.pathRef(editor, isInlineEnd ? Path.next(inlinePath) : inlinePath);
    Transforms.splitNodes(editor, {
      at,
      match: n => hasBlocks ? Element$2.isElement(n) && Editor.isBlock(editor, n) : Text$1.isText(n) || Editor.isInline(editor, n),
      mode: hasBlocks ? 'lowest' : 'highest',
      always: hasBlocks && (!isBlockStart || starts.length > 0) && (!isBlockEnd || ends.length > 0),
      voids
    });
    var startRef = Editor.pathRef(editor, !isInlineStart || isInlineStart && isInlineEnd ? Path.next(inlinePath) : inlinePath);
    Transforms.insertNodes(editor, starts, {
      at: startRef.current,
      match: n => Text$1.isText(n) || Editor.isInline(editor, n),
      mode: 'highest',
      voids,
      batchDirty
    });
    if (isBlockEmpty && !starts.length && middles.length && !ends.length) {
      Transforms.delete(editor, {
        at: blockPath,
        voids
      });
    }
    Transforms.insertNodes(editor, middles, {
      at: middleRef.current,
      match: n => Element$2.isElement(n) && Editor.isBlock(editor, n),
      mode: 'lowest',
      voids,
      batchDirty
    });
    Transforms.insertNodes(editor, ends, {
      at: endRef.current,
      match: n => Text$1.isText(n) || Editor.isInline(editor, n),
      mode: 'highest',
      voids,
      batchDirty
    });
    if (!options.at) {
      var path;
      if (ends.length > 0 && endRef.current) {
        path = Path.previous(endRef.current);
      } else if (middles.length > 0 && middleRef.current) {
        path = Path.previous(middleRef.current);
      } else if (startRef.current) {
        path = Path.previous(startRef.current);
      }
      if (path) {
        var _end = Editor.end(editor, path);
        Transforms.select(editor, _end);
      }
    }
    startRef.unref();
    middleRef.unref();
    endRef.unref();
  });
};

var collapse = function collapse(editor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var {
    edge = 'anchor'
  } = options;
  var {
    selection
  } = editor;
  if (!selection) {
    return;
  } else if (edge === 'anchor') {
    Transforms.select(editor, selection.anchor);
  } else if (edge === 'focus') {
    Transforms.select(editor, selection.focus);
  } else if (edge === 'start') {
    var [start] = Range.edges(selection);
    Transforms.select(editor, start);
  } else if (edge === 'end') {
    var [, end] = Range.edges(selection);
    Transforms.select(editor, end);
  }
};

var deselect = editor => {
  var {
    selection
  } = editor;
  if (selection) {
    editor.apply({
      type: 'set_selection',
      properties: selection,
      newProperties: null
    });
  }
};

var move = function move(editor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var {
    selection
  } = editor;
  var {
    distance = 1,
    unit = 'character',
    reverse = false
  } = options;
  var {
    edge = null
  } = options;
  if (!selection) {
    return;
  }
  if (edge === 'start') {
    edge = Range.isBackward(selection) ? 'focus' : 'anchor';
  }
  if (edge === 'end') {
    edge = Range.isBackward(selection) ? 'anchor' : 'focus';
  }
  var {
    anchor,
    focus
  } = selection;
  var opts = {
    distance,
    unit,
    ignoreNonSelectable: true
  };
  var props = {};
  if (edge == null || edge === 'anchor') {
    var point = reverse ? Editor.before(editor, anchor, opts) : Editor.after(editor, anchor, opts);
    if (point) {
      props.anchor = point;
    }
  }
  if (edge == null || edge === 'focus') {
    var _point = reverse ? Editor.before(editor, focus, opts) : Editor.after(editor, focus, opts);
    if (_point) {
      props.focus = _point;
    }
  }
  Transforms.setSelection(editor, props);
};

var select = (editor, target) => {
  var {
    selection
  } = editor;
  target = Editor.range(editor, target);
  if (selection) {
    Transforms.setSelection(editor, target);
    return;
  }
  if (!Range.isRange(target)) {
    throw new Error("When setting the selection and the current selection is `null` you must provide at least an `anchor` and `focus`, but you passed: ".concat(Scrubber.stringify(target)));
  }
  editor.apply({
    type: 'set_selection',
    properties: selection,
    newProperties: target
  });
};

function ownKeys$1$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1$1(Object(t), true).forEach(function (r) { _defineProperty$1(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var setPoint = function setPoint(editor, props) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var {
    selection
  } = editor;
  var {
    edge = 'both'
  } = options;
  if (!selection) {
    return;
  }
  if (edge === 'start') {
    edge = Range.isBackward(selection) ? 'focus' : 'anchor';
  }
  if (edge === 'end') {
    edge = Range.isBackward(selection) ? 'anchor' : 'focus';
  }
  var {
    anchor,
    focus
  } = selection;
  var point = edge === 'anchor' ? anchor : focus;
  Transforms.setSelection(editor, {
    [edge === 'anchor' ? 'anchor' : 'focus']: _objectSpread$1$1(_objectSpread$1$1({}, point), props)
  });
};

var setSelection = (editor, props) => {
  var {
    selection
  } = editor;
  var oldProps = {};
  var newProps = {};
  if (!selection) {
    return;
  }
  for (var k in props) {
    if (k === 'anchor' && props.anchor != null && !Point.equals(props.anchor, selection.anchor) || k === 'focus' && props.focus != null && !Point.equals(props.focus, selection.focus) || k !== 'anchor' && k !== 'focus' && props[k] !== selection[k]) {
      oldProps[k] = selection[k];
      newProps[k] = props[k];
    }
  }
  if (Object.keys(oldProps).length > 0) {
    editor.apply({
      type: 'set_selection',
      properties: oldProps,
      newProperties: newProps
    });
  }
};

var insertNodes = function insertNodes(editor, nodes) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  Editor.withoutNormalizing(editor, () => {
    var {
      hanging = false,
      voids = false,
      mode = 'lowest',
      batchDirty = true
    } = options;
    var {
      at,
      match,
      select
    } = options;
    if (Node.isNode(nodes)) {
      nodes = [nodes];
    }
    if (nodes.length === 0) {
      return;
    }
    var [node] = nodes;
    if (!at) {
      at = getDefaultInsertLocation(editor);
      if (select !== false) {
        select = true;
      }
    }
    if (select == null) {
      select = false;
    }
    if (Range.isRange(at)) {
      if (!hanging) {
        at = Editor.unhangRange(editor, at, {
          voids
        });
      }
      if (Range.isCollapsed(at)) {
        at = at.anchor;
      } else {
        var [, end] = Range.edges(at);
        var pointRef = Editor.pointRef(editor, end);
        Transforms.delete(editor, {
          at
        });
        at = pointRef.unref();
      }
    }
    if (Point.isPoint(at)) {
      if (match == null) {
        if (Text$1.isText(node)) {
          match = n => Text$1.isText(n);
        } else if (editor.isInline(node)) {
          match = n => Text$1.isText(n) || Editor.isInline(editor, n);
        } else {
          match = n => Element$2.isElement(n) && Editor.isBlock(editor, n);
        }
      }
      var [entry] = Editor.nodes(editor, {
        at: at.path,
        match,
        mode,
        voids
      });
      if (entry) {
        var [, matchPath] = entry;
        var pathRef = Editor.pathRef(editor, matchPath);
        var isAtEnd = Editor.isEnd(editor, at, matchPath);
        Transforms.splitNodes(editor, {
          at,
          match,
          mode,
          voids
        });
        var path = pathRef.unref();
        at = isAtEnd ? Path.next(path) : path;
      } else {
        return;
      }
    }
    var parentPath = Path.parent(at);
    var index = at[at.length - 1];
    if (!voids && Editor.void(editor, {
      at: parentPath
    })) {
      return;
    }
    if (batchDirty) {
      // PERF: batch update dirty paths
      // batched ops used to transform existing dirty paths
      var batchedOps = [];
      var newDirtyPaths = Path.levels(parentPath);
      batchDirtyPaths(editor, () => {
        var _loop = function _loop() {
          var path = parentPath.concat(index);
          index++;
          var op = {
            type: 'insert_node',
            path,
            node: _node
          };
          editor.apply(op);
          at = Path.next(at);
          batchedOps.push(op);
          if (!Text$1.isText) {
            newDirtyPaths.push(path);
          } else {
            newDirtyPaths.push(...Array.from(Node.nodes(_node), _ref => {
              var [, p] = _ref;
              return path.concat(p);
            }));
          }
        };
        for (var _node of nodes) {
          _loop();
        }
      }, () => {
        updateDirtyPaths(editor, newDirtyPaths, p => {
          var newPath = p;
          for (var op of batchedOps) {
            if (Path.operationCanTransformPath(op)) {
              newPath = Path.transform(newPath, op);
              if (!newPath) {
                return null;
              }
            }
          }
          return newPath;
        });
      });
    } else {
      for (var _node2 of nodes) {
        var _path = parentPath.concat(index);
        index++;
        editor.apply({
          type: 'insert_node',
          path: _path,
          node: _node2
        });
        at = Path.next(at);
      }
    }
    at = Path.previous(at);
    if (select) {
      var point = Editor.end(editor, at);
      if (point) {
        Transforms.select(editor, point);
      }
    }
  });
};

var liftNodes = function liftNodes(editor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  Editor.withoutNormalizing(editor, () => {
    var {
      at = editor.selection,
      mode = 'lowest',
      voids = false
    } = options;
    var {
      match
    } = options;
    if (match == null) {
      match = Path.isPath(at) ? matchPath(editor, at) : n => Element$2.isElement(n) && Editor.isBlock(editor, n);
    }
    if (!at) {
      return;
    }
    var matches = Editor.nodes(editor, {
      at,
      match,
      mode,
      voids
    });
    var pathRefs = Array.from(matches, _ref => {
      var [, p] = _ref;
      return Editor.pathRef(editor, p);
    });
    for (var pathRef of pathRefs) {
      var path = pathRef.unref();
      if (path.length < 2) {
        throw new Error("Cannot lift node at a path [".concat(path, "] because it has a depth of less than `2`."));
      }
      var parentNodeEntry = Editor.node(editor, Path.parent(path));
      var [parent, parentPath] = parentNodeEntry;
      var index = path[path.length - 1];
      var {
        length
      } = parent.children;
      if (length === 1) {
        var toPath = Path.next(parentPath);
        Transforms.moveNodes(editor, {
          at: path,
          to: toPath,
          voids
        });
        Transforms.removeNodes(editor, {
          at: parentPath,
          voids
        });
      } else if (index === 0) {
        Transforms.moveNodes(editor, {
          at: path,
          to: parentPath,
          voids
        });
      } else if (index === length - 1) {
        var _toPath = Path.next(parentPath);
        Transforms.moveNodes(editor, {
          at: path,
          to: _toPath,
          voids
        });
      } else {
        var splitPath = Path.next(path);
        var _toPath2 = Path.next(parentPath);
        Transforms.splitNodes(editor, {
          at: splitPath,
          voids
        });
        Transforms.moveNodes(editor, {
          at: path,
          to: _toPath2,
          voids
        });
      }
    }
  });
};

var _excluded$5 = ["text"],
  _excluded2$4 = ["children"];
var hasSingleChildNest = (editor, node) => {
  if (Element$2.isElement(node)) {
    var element = node;
    if (Editor.isVoid(editor, node)) {
      return true;
    } else if (element.children.length === 1) {
      return hasSingleChildNest(editor, element.children[0]);
    } else {
      return false;
    }
  } else if (Editor.isEditor(node)) {
    return false;
  } else {
    return true;
  }
};
var mergeNodes = function mergeNodes(editor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  Editor.withoutNormalizing(editor, () => {
    var {
      match,
      at = editor.selection
    } = options;
    var {
      hanging = false,
      voids = false,
      mode = 'lowest'
    } = options;
    if (!at) {
      return;
    }
    if (match == null) {
      if (Path.isPath(at)) {
        var [parent] = Editor.parent(editor, at);
        match = n => parent.children.includes(n);
      } else {
        match = n => Element$2.isElement(n) && Editor.isBlock(editor, n);
      }
    }
    if (!hanging && Range.isRange(at)) {
      at = Editor.unhangRange(editor, at, {
        voids
      });
    }
    if (Range.isRange(at)) {
      if (Range.isCollapsed(at)) {
        at = at.anchor;
      } else {
        var [, end] = Range.edges(at);
        var pointRef = Editor.pointRef(editor, end);
        Transforms.delete(editor, {
          at
        });
        at = pointRef.unref();
        if (options.at == null) {
          Transforms.select(editor, at);
        }
      }
    }
    var [current] = Editor.nodes(editor, {
      at,
      match,
      voids,
      mode
    });
    var prev = Editor.previous(editor, {
      at,
      match,
      voids,
      mode
    });
    if (!current || !prev) {
      return;
    }
    var [node, path] = current;
    var [prevNode, prevPath] = prev;
    if (path.length === 0 || prevPath.length === 0) {
      return;
    }
    var newPath = Path.next(prevPath);
    var commonPath = Path.common(path, prevPath);
    var isPreviousSibling = Path.isSibling(path, prevPath);
    var levels = Array.from(Editor.levels(editor, {
      at: path
    }), _ref => {
      var [n] = _ref;
      return n;
    }).slice(commonPath.length).slice(0, -1);
    // Determine if the merge will leave an ancestor of the path empty as a
    // result, in which case we'll want to remove it after merging.
    var emptyAncestor = Editor.above(editor, {
      at: path,
      mode: 'highest',
      match: n => levels.includes(n) && hasSingleChildNest(editor, n)
    });
    var emptyRef = emptyAncestor && Editor.pathRef(editor, emptyAncestor[1]);
    var properties;
    var position;
    // Ensure that the nodes are equivalent, and figure out what the position
    // and extra properties of the merge will be.
    if (Text$1.isText(node) && Text$1.isText(prevNode)) {
      var rest = _objectWithoutProperties$1(node, _excluded$5);
      position = prevNode.text.length;
      properties = rest;
    } else if (Element$2.isElement(node) && Element$2.isElement(prevNode)) {
      var rest = _objectWithoutProperties$1(node, _excluded2$4);
      position = prevNode.children.length;
      properties = rest;
    } else {
      throw new Error("Cannot merge the node at path [".concat(path, "] with the previous sibling because it is not the same kind: ").concat(Scrubber.stringify(node), " ").concat(Scrubber.stringify(prevNode)));
    }
    // If the node isn't already the next sibling of the previous node, move
    // it so that it is before merging.
    if (!isPreviousSibling) {
      Transforms.moveNodes(editor, {
        at: path,
        to: newPath,
        voids
      });
    }
    // If there was going to be an empty ancestor of the node that was merged,
    // we remove it from the tree.
    if (emptyRef) {
      Transforms.removeNodes(editor, {
        at: emptyRef.current,
        voids
      });
    }
    if (Editor.shouldMergeNodesRemovePrevNode(editor, prev, current)) {
      Transforms.removeNodes(editor, {
        at: prevPath,
        voids
      });
    } else {
      editor.apply({
        type: 'merge_node',
        path: newPath,
        position,
        properties
      });
    }
    if (emptyRef) {
      emptyRef.unref();
    }
  });
};

var moveNodes = (editor, options) => {
  Editor.withoutNormalizing(editor, () => {
    var {
      to,
      at = editor.selection,
      mode = 'lowest',
      voids = false
    } = options;
    var {
      match
    } = options;
    if (!at) {
      return;
    }
    if (match == null) {
      match = Path.isPath(at) ? matchPath(editor, at) : n => Element$2.isElement(n) && Editor.isBlock(editor, n);
    }
    var toRef = Editor.pathRef(editor, to);
    var targets = Editor.nodes(editor, {
      at,
      match,
      mode,
      voids
    });
    var pathRefs = Array.from(targets, _ref => {
      var [, p] = _ref;
      return Editor.pathRef(editor, p);
    });
    for (var pathRef of pathRefs) {
      var path = pathRef.unref();
      var newPath = toRef.current;
      if (path.length !== 0) {
        editor.apply({
          type: 'move_node',
          path,
          newPath
        });
      }
      if (toRef.current && Path.isSibling(newPath, path) && Path.isAfter(newPath, path)) {
        // When performing a sibling move to a later index, the path at the destination is shifted
        // to before the insertion point instead of after. To ensure our group of nodes are inserted
        // in the correct order we increment toRef to account for that
        toRef.current = Path.next(toRef.current);
      }
    }
    toRef.unref();
  });
};

var removeNodes = function removeNodes(editor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  Editor.withoutNormalizing(editor, () => {
    var {
      hanging = false,
      voids = false,
      mode = 'lowest'
    } = options;
    var {
      at = editor.selection,
      match
    } = options;
    if (!at) {
      return;
    }
    if (match == null) {
      match = Path.isPath(at) ? matchPath(editor, at) : n => Element$2.isElement(n) && Editor.isBlock(editor, n);
    }
    if (!hanging && Range.isRange(at)) {
      at = Editor.unhangRange(editor, at, {
        voids
      });
    }
    var depths = Editor.nodes(editor, {
      at,
      match,
      mode,
      voids
    });
    var pathRefs = Array.from(depths, _ref => {
      var [, p] = _ref;
      return Editor.pathRef(editor, p);
    });
    for (var pathRef of pathRefs) {
      var path = pathRef.unref();
      if (path) {
        var [node] = Editor.node(editor, path);
        editor.apply({
          type: 'remove_node',
          path,
          node
        });
      }
    }
  });
};

var setNodes = function setNodes(editor, props) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  Editor.withoutNormalizing(editor, () => {
    var {
      match,
      at = editor.selection,
      compare,
      merge
    } = options;
    var {
      hanging = false,
      mode = 'lowest',
      split = false,
      voids = false
    } = options;
    if (!at) {
      return;
    }
    if (match == null) {
      match = Path.isPath(at) ? matchPath(editor, at) : n => Element$2.isElement(n) && Editor.isBlock(editor, n);
    }
    if (!hanging && Range.isRange(at)) {
      at = Editor.unhangRange(editor, at, {
        voids
      });
    }
    if (split && Range.isRange(at)) {
      if (Range.isCollapsed(at) && Editor.leaf(editor, at.anchor)[0].text.length > 0) {
        // If the range is collapsed in a non-empty node and 'split' is true, there's nothing to
        // set that won't get normalized away
        return;
      }
      var rangeRef = Editor.rangeRef(editor, at, {
        affinity: 'inward'
      });
      var [start, end] = Range.edges(at);
      var splitMode = mode === 'lowest' ? 'lowest' : 'highest';
      var endAtEndOfNode = Editor.isEnd(editor, end, end.path);
      Transforms.splitNodes(editor, {
        at: end,
        match,
        mode: splitMode,
        voids,
        always: !endAtEndOfNode
      });
      var startAtStartOfNode = Editor.isStart(editor, start, start.path);
      Transforms.splitNodes(editor, {
        at: start,
        match,
        mode: splitMode,
        voids,
        always: !startAtStartOfNode
      });
      at = rangeRef.unref();
      if (options.at == null) {
        Transforms.select(editor, at);
      }
    }
    if (!compare) {
      compare = (prop, nodeProp) => prop !== nodeProp;
    }
    for (var [node, path] of Editor.nodes(editor, {
      at,
      match,
      mode,
      voids
    })) {
      var properties = {};
      // FIXME: is this correct?
      var newProperties = {};
      // You can't set properties on the editor node.
      if (path.length === 0) {
        continue;
      }
      var hasChanges = false;
      for (var k in props) {
        if (k === 'children' || k === 'text') {
          continue;
        }
        if (compare(props[k], node[k])) {
          hasChanges = true;
          // Omit new properties from the old properties list
          if (node.hasOwnProperty(k)) properties[k] = node[k];
          // Omit properties that have been removed from the new properties list
          if (merge) {
            if (props[k] != null) newProperties[k] = merge(node[k], props[k]);
          } else {
            if (props[k] != null) newProperties[k] = props[k];
          }
        }
      }
      if (hasChanges) {
        editor.apply({
          type: 'set_node',
          path,
          properties,
          newProperties
        });
      }
    }
  });
};

/**
 * Convert a range into a point by deleting it's content.
 */
var deleteRange = (editor, range) => {
  if (Range.isCollapsed(range)) {
    return range.anchor;
  } else {
    var [, end] = Range.edges(range);
    var pointRef = Editor.pointRef(editor, end);
    Transforms.delete(editor, {
      at: range
    });
    return pointRef.unref();
  }
};
var splitNodes = function splitNodes(editor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  Editor.withoutNormalizing(editor, () => {
    var {
      mode = 'lowest',
      voids = false
    } = options;
    var {
      match,
      at = editor.selection,
      height = 0,
      always = false
    } = options;
    if (match == null) {
      match = n => Element$2.isElement(n) && Editor.isBlock(editor, n);
    }
    if (Range.isRange(at)) {
      at = deleteRange(editor, at);
    }
    // If the target is a path, the default height-skipping and position
    // counters need to account for us potentially splitting at a non-leaf.
    if (Path.isPath(at)) {
      var path = at;
      var point = Editor.point(editor, path);
      var [parent] = Editor.parent(editor, path);
      match = n => n === parent;
      height = point.path.length - path.length + 1;
      at = point;
      always = true;
    }
    if (!at) {
      return;
    }
    var beforeRef = Editor.pointRef(editor, at, {
      affinity: 'backward'
    });
    var afterRef;
    try {
      var [highest] = Editor.nodes(editor, {
        at,
        match,
        mode,
        voids
      });
      if (!highest) {
        return;
      }
      var voidMatch = Editor.void(editor, {
        at,
        mode: 'highest'
      });
      var nudge = 0;
      if (!voids && voidMatch) {
        var [voidNode, voidPath] = voidMatch;
        if (Element$2.isElement(voidNode) && editor.isInline(voidNode)) {
          var after = Editor.after(editor, voidPath);
          if (!after) {
            var text = {
              text: ''
            };
            var afterPath = Path.next(voidPath);
            Transforms.insertNodes(editor, text, {
              at: afterPath,
              voids
            });
            after = Editor.point(editor, afterPath);
          }
          at = after;
          always = true;
        }
        var siblingHeight = at.path.length - voidPath.length;
        height = siblingHeight + 1;
        always = true;
      }
      afterRef = Editor.pointRef(editor, at);
      var depth = at.path.length - height;
      var [, highestPath] = highest;
      var lowestPath = at.path.slice(0, depth);
      var position = height === 0 ? at.offset : at.path[depth] + nudge;
      for (var [node, _path] of Editor.levels(editor, {
        at: lowestPath,
        reverse: true,
        voids
      })) {
        var split = false;
        if (_path.length < highestPath.length || _path.length === 0 || !voids && Element$2.isElement(node) && Editor.isVoid(editor, node)) {
          break;
        }
        var _point = beforeRef.current;
        var isEnd = Editor.isEnd(editor, _point, _path);
        if (always || !beforeRef || !Editor.isEdge(editor, _point, _path)) {
          split = true;
          var properties = Node.extractProps(node);
          editor.apply({
            type: 'split_node',
            path: _path,
            position,
            properties
          });
        }
        position = _path[_path.length - 1] + (split || isEnd ? 1 : 0);
      }
      if (options.at == null) {
        var _point2 = afterRef.current || Editor.end(editor, []);
        Transforms.select(editor, _point2);
      }
    } finally {
      var _afterRef;
      beforeRef.unref();
      (_afterRef = afterRef) === null || _afterRef === void 0 || _afterRef.unref();
    }
  });
};

var unsetNodes = function unsetNodes(editor, props) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (!Array.isArray(props)) {
    props = [props];
  }
  var obj = {};
  for (var key of props) {
    obj[key] = null;
  }
  Transforms.setNodes(editor, obj, options);
};

var unwrapNodes = function unwrapNodes(editor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  Editor.withoutNormalizing(editor, () => {
    var {
      mode = 'lowest',
      split = false,
      voids = false
    } = options;
    var {
      at = editor.selection,
      match
    } = options;
    if (!at) {
      return;
    }
    if (match == null) {
      match = Path.isPath(at) ? matchPath(editor, at) : n => Element$2.isElement(n) && Editor.isBlock(editor, n);
    }
    if (Path.isPath(at)) {
      at = Editor.range(editor, at);
    }
    var rangeRef = Range.isRange(at) ? Editor.rangeRef(editor, at) : null;
    var matches = Editor.nodes(editor, {
      at,
      match,
      mode,
      voids
    });
    var pathRefs = Array.from(matches, _ref => {
      var [, p] = _ref;
      return Editor.pathRef(editor, p);
    }
    // unwrapNode will call liftNode which does not support splitting the node when nested.
    // If we do not reverse the order and call it from top to the bottom, it will remove all blocks
    // that wrap target node. So we reverse the order.
    ).reverse();
    var _loop = function _loop() {
      var path = pathRef.unref();
      var [node] = Editor.node(editor, path);
      var range = Editor.range(editor, path);
      if (split && rangeRef) {
        range = Range.intersection(rangeRef.current, range);
      }
      Transforms.liftNodes(editor, {
        at: range,
        match: n => Element$2.isAncestor(node) && node.children.includes(n),
        voids
      });
    };
    for (var pathRef of pathRefs) {
      _loop();
    }
    if (rangeRef) {
      rangeRef.unref();
    }
  });
};

function ownKeys$f(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$f(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$f(Object(t), true).forEach(function (r) { _defineProperty$1(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$f(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var wrapNodes = function wrapNodes(editor, element) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  Editor.withoutNormalizing(editor, () => {
    var {
      mode = 'lowest',
      split = false,
      voids = false
    } = options;
    var {
      match,
      at = editor.selection
    } = options;
    if (!at) {
      return;
    }
    if (match == null) {
      if (Path.isPath(at)) {
        match = matchPath(editor, at);
      } else if (editor.isInline(element)) {
        match = n => Element$2.isElement(n) && Editor.isInline(editor, n) || Text$1.isText(n);
      } else {
        match = n => Element$2.isElement(n) && Editor.isBlock(editor, n);
      }
    }
    if (split && Range.isRange(at)) {
      var [start, end] = Range.edges(at);
      var rangeRef = Editor.rangeRef(editor, at, {
        affinity: 'inward'
      });
      Transforms.splitNodes(editor, {
        at: end,
        match,
        voids
      });
      Transforms.splitNodes(editor, {
        at: start,
        match,
        voids
      });
      at = rangeRef.unref();
      if (options.at == null) {
        Transforms.select(editor, at);
      }
    }
    var roots = Array.from(Editor.nodes(editor, {
      at,
      match: editor.isInline(element) ? n => Element$2.isElement(n) && Editor.isBlock(editor, n) : n => Editor.isEditor(n),
      mode: 'lowest',
      voids
    }));
    var _loop = function _loop() {
        var a = Range.isRange(at) ? Range.intersection(at, Editor.range(editor, rootPath)) : at;
        if (!a) {
          return 0; // continue
        }
        var matches = Array.from(Editor.nodes(editor, {
          at: a,
          match,
          mode,
          voids
        }));
        if (matches.length > 0) {
          var [first] = matches;
          var last = matches[matches.length - 1];
          var [, firstPath] = first;
          var [, lastPath] = last;
          if (firstPath.length === 0 && lastPath.length === 0) {
            // if there's no matching parent - usually means the node is an editor - don't do anything
            return 0; // continue
          }
          var commonPath = Path.equals(firstPath, lastPath) ? Path.parent(firstPath) : Path.common(firstPath, lastPath);
          var range = Editor.range(editor, firstPath, lastPath);
          var commonNodeEntry = Editor.node(editor, commonPath);
          var [commonNode] = commonNodeEntry;
          var depth = commonPath.length + 1;
          var wrapperPath = Path.next(lastPath.slice(0, depth));
          var wrapper = _objectSpread$f(_objectSpread$f({}, element), {}, {
            children: []
          });
          Transforms.insertNodes(editor, wrapper, {
            at: wrapperPath,
            voids
          });
          Transforms.moveNodes(editor, {
            at: range,
            match: n => Element$2.isAncestor(commonNode) && commonNode.children.includes(n),
            to: wrapperPath.concat(0),
            voids
          });
        }
      },
      _ret;
    for (var [, rootPath] of roots) {
      _ret = _loop();
      if (_ret === 0) continue;
    }
  });
};

/**
 * Create a new Slate `Editor` object.
 */
var createEditor = () => {
  var editor = {
    children: [],
    operations: [],
    selection: null,
    marks: null,
    isElementReadOnly: () => false,
    isInline: () => false,
    isSelectable: () => true,
    isVoid: () => false,
    markableVoid: () => false,
    onChange: () => {},
    // Core
    apply: function apply$1() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return apply(editor, ...args);
    },
    // Editor
    addMark: function addMark$1() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      return addMark(editor, ...args);
    },
    deleteBackward: function deleteBackward$1() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      return deleteBackward(editor, ...args);
    },
    deleteForward: function deleteForward$1() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return deleteForward(editor, ...args);
    },
    deleteFragment: function deleteFragment$1() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      return deleteFragment(editor, ...args);
    },
    getFragment: function getFragment$1() {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }
      return getFragment(editor, ...args);
    },
    insertBreak: function insertBreak$1() {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }
      return insertBreak(editor, ...args);
    },
    insertSoftBreak: function insertSoftBreak$1() {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }
      return insertSoftBreak(editor, ...args);
    },
    insertFragment: function insertFragment$1() {
      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }
      return insertFragment(editor, ...args);
    },
    insertNode: function insertNode$1() {
      for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        args[_key10] = arguments[_key10];
      }
      return insertNode(editor, ...args);
    },
    insertText: function insertText$1() {
      for (var _len11 = arguments.length, args = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
        args[_key11] = arguments[_key11];
      }
      return insertText(editor, ...args);
    },
    normalizeNode: function normalizeNode$1() {
      for (var _len12 = arguments.length, args = new Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
        args[_key12] = arguments[_key12];
      }
      return normalizeNode(editor, ...args);
    },
    removeMark: function removeMark$1() {
      for (var _len13 = arguments.length, args = new Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
        args[_key13] = arguments[_key13];
      }
      return removeMark(editor, ...args);
    },
    getDirtyPaths: function getDirtyPaths$1() {
      for (var _len14 = arguments.length, args = new Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
        args[_key14] = arguments[_key14];
      }
      return getDirtyPaths(editor, ...args);
    },
    shouldNormalize: function shouldNormalize$1() {
      for (var _len15 = arguments.length, args = new Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
        args[_key15] = arguments[_key15];
      }
      return shouldNormalize(editor, ...args);
    },
    // Editor interface
    above: function above$1() {
      for (var _len16 = arguments.length, args = new Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
        args[_key16] = arguments[_key16];
      }
      return above(editor, ...args);
    },
    after: function after$1() {
      for (var _len17 = arguments.length, args = new Array(_len17), _key17 = 0; _key17 < _len17; _key17++) {
        args[_key17] = arguments[_key17];
      }
      return after(editor, ...args);
    },
    before: function before$1() {
      for (var _len18 = arguments.length, args = new Array(_len18), _key18 = 0; _key18 < _len18; _key18++) {
        args[_key18] = arguments[_key18];
      }
      return before(editor, ...args);
    },
    collapse: function collapse$1() {
      for (var _len19 = arguments.length, args = new Array(_len19), _key19 = 0; _key19 < _len19; _key19++) {
        args[_key19] = arguments[_key19];
      }
      return collapse(editor, ...args);
    },
    delete: function _delete() {
      for (var _len20 = arguments.length, args = new Array(_len20), _key20 = 0; _key20 < _len20; _key20++) {
        args[_key20] = arguments[_key20];
      }
      return deleteText(editor, ...args);
    },
    deselect: function deselect$1() {
      for (var _len21 = arguments.length, args = new Array(_len21), _key21 = 0; _key21 < _len21; _key21++) {
        args[_key21] = arguments[_key21];
      }
      return deselect(editor, ...args);
    },
    edges: function edges$1() {
      for (var _len22 = arguments.length, args = new Array(_len22), _key22 = 0; _key22 < _len22; _key22++) {
        args[_key22] = arguments[_key22];
      }
      return edges(editor, ...args);
    },
    elementReadOnly: function elementReadOnly$1() {
      for (var _len23 = arguments.length, args = new Array(_len23), _key23 = 0; _key23 < _len23; _key23++) {
        args[_key23] = arguments[_key23];
      }
      return elementReadOnly(editor, ...args);
    },
    end: function end$1() {
      for (var _len24 = arguments.length, args = new Array(_len24), _key24 = 0; _key24 < _len24; _key24++) {
        args[_key24] = arguments[_key24];
      }
      return end(editor, ...args);
    },
    first: function first$1() {
      for (var _len25 = arguments.length, args = new Array(_len25), _key25 = 0; _key25 < _len25; _key25++) {
        args[_key25] = arguments[_key25];
      }
      return first(editor, ...args);
    },
    fragment: function fragment$1() {
      for (var _len26 = arguments.length, args = new Array(_len26), _key26 = 0; _key26 < _len26; _key26++) {
        args[_key26] = arguments[_key26];
      }
      return fragment(editor, ...args);
    },
    getMarks: function getMarks() {
      for (var _len27 = arguments.length, args = new Array(_len27), _key27 = 0; _key27 < _len27; _key27++) {
        args[_key27] = arguments[_key27];
      }
      return marks(editor, ...args);
    },
    hasBlocks: function hasBlocks$1() {
      for (var _len28 = arguments.length, args = new Array(_len28), _key28 = 0; _key28 < _len28; _key28++) {
        args[_key28] = arguments[_key28];
      }
      return hasBlocks(editor, ...args);
    },
    hasInlines: function hasInlines$1() {
      for (var _len29 = arguments.length, args = new Array(_len29), _key29 = 0; _key29 < _len29; _key29++) {
        args[_key29] = arguments[_key29];
      }
      return hasInlines(editor, ...args);
    },
    hasPath: function hasPath$1() {
      for (var _len30 = arguments.length, args = new Array(_len30), _key30 = 0; _key30 < _len30; _key30++) {
        args[_key30] = arguments[_key30];
      }
      return hasPath(editor, ...args);
    },
    hasTexts: function hasTexts$1() {
      for (var _len31 = arguments.length, args = new Array(_len31), _key31 = 0; _key31 < _len31; _key31++) {
        args[_key31] = arguments[_key31];
      }
      return hasTexts(editor, ...args);
    },
    insertNodes: function insertNodes$1() {
      for (var _len32 = arguments.length, args = new Array(_len32), _key32 = 0; _key32 < _len32; _key32++) {
        args[_key32] = arguments[_key32];
      }
      return insertNodes(editor, ...args);
    },
    isBlock: function isBlock$1() {
      for (var _len33 = arguments.length, args = new Array(_len33), _key33 = 0; _key33 < _len33; _key33++) {
        args[_key33] = arguments[_key33];
      }
      return isBlock(editor, ...args);
    },
    isEdge: function isEdge$1() {
      for (var _len34 = arguments.length, args = new Array(_len34), _key34 = 0; _key34 < _len34; _key34++) {
        args[_key34] = arguments[_key34];
      }
      return isEdge(editor, ...args);
    },
    isEmpty: function isEmpty$1() {
      for (var _len35 = arguments.length, args = new Array(_len35), _key35 = 0; _key35 < _len35; _key35++) {
        args[_key35] = arguments[_key35];
      }
      return isEmpty(editor, ...args);
    },
    isEnd: function isEnd$1() {
      for (var _len36 = arguments.length, args = new Array(_len36), _key36 = 0; _key36 < _len36; _key36++) {
        args[_key36] = arguments[_key36];
      }
      return isEnd(editor, ...args);
    },
    isNormalizing: function isNormalizing$1() {
      for (var _len37 = arguments.length, args = new Array(_len37), _key37 = 0; _key37 < _len37; _key37++) {
        args[_key37] = arguments[_key37];
      }
      return isNormalizing(editor, ...args);
    },
    isStart: function isStart$1() {
      for (var _len38 = arguments.length, args = new Array(_len38), _key38 = 0; _key38 < _len38; _key38++) {
        args[_key38] = arguments[_key38];
      }
      return isStart(editor, ...args);
    },
    last: function last$1() {
      for (var _len39 = arguments.length, args = new Array(_len39), _key39 = 0; _key39 < _len39; _key39++) {
        args[_key39] = arguments[_key39];
      }
      return last(editor, ...args);
    },
    leaf: function leaf$1() {
      for (var _len40 = arguments.length, args = new Array(_len40), _key40 = 0; _key40 < _len40; _key40++) {
        args[_key40] = arguments[_key40];
      }
      return leaf(editor, ...args);
    },
    levels: function levels$1() {
      for (var _len41 = arguments.length, args = new Array(_len41), _key41 = 0; _key41 < _len41; _key41++) {
        args[_key41] = arguments[_key41];
      }
      return levels(editor, ...args);
    },
    liftNodes: function liftNodes$1() {
      for (var _len42 = arguments.length, args = new Array(_len42), _key42 = 0; _key42 < _len42; _key42++) {
        args[_key42] = arguments[_key42];
      }
      return liftNodes(editor, ...args);
    },
    mergeNodes: function mergeNodes$1() {
      for (var _len43 = arguments.length, args = new Array(_len43), _key43 = 0; _key43 < _len43; _key43++) {
        args[_key43] = arguments[_key43];
      }
      return mergeNodes(editor, ...args);
    },
    move: function move$1() {
      for (var _len44 = arguments.length, args = new Array(_len44), _key44 = 0; _key44 < _len44; _key44++) {
        args[_key44] = arguments[_key44];
      }
      return move(editor, ...args);
    },
    moveNodes: function moveNodes$1() {
      for (var _len45 = arguments.length, args = new Array(_len45), _key45 = 0; _key45 < _len45; _key45++) {
        args[_key45] = arguments[_key45];
      }
      return moveNodes(editor, ...args);
    },
    next: function next$1() {
      for (var _len46 = arguments.length, args = new Array(_len46), _key46 = 0; _key46 < _len46; _key46++) {
        args[_key46] = arguments[_key46];
      }
      return next(editor, ...args);
    },
    node: function node$1() {
      for (var _len47 = arguments.length, args = new Array(_len47), _key47 = 0; _key47 < _len47; _key47++) {
        args[_key47] = arguments[_key47];
      }
      return node(editor, ...args);
    },
    nodes: function nodes$1() {
      for (var _len48 = arguments.length, args = new Array(_len48), _key48 = 0; _key48 < _len48; _key48++) {
        args[_key48] = arguments[_key48];
      }
      return nodes(editor, ...args);
    },
    normalize: function normalize$1() {
      for (var _len49 = arguments.length, args = new Array(_len49), _key49 = 0; _key49 < _len49; _key49++) {
        args[_key49] = arguments[_key49];
      }
      return normalize(editor, ...args);
    },
    parent: function parent$1() {
      for (var _len50 = arguments.length, args = new Array(_len50), _key50 = 0; _key50 < _len50; _key50++) {
        args[_key50] = arguments[_key50];
      }
      return parent(editor, ...args);
    },
    path: function path$1() {
      for (var _len51 = arguments.length, args = new Array(_len51), _key51 = 0; _key51 < _len51; _key51++) {
        args[_key51] = arguments[_key51];
      }
      return path(editor, ...args);
    },
    pathRef: function pathRef$1() {
      for (var _len52 = arguments.length, args = new Array(_len52), _key52 = 0; _key52 < _len52; _key52++) {
        args[_key52] = arguments[_key52];
      }
      return pathRef(editor, ...args);
    },
    pathRefs: function pathRefs$1() {
      for (var _len53 = arguments.length, args = new Array(_len53), _key53 = 0; _key53 < _len53; _key53++) {
        args[_key53] = arguments[_key53];
      }
      return pathRefs(editor, ...args);
    },
    point: function point$1() {
      for (var _len54 = arguments.length, args = new Array(_len54), _key54 = 0; _key54 < _len54; _key54++) {
        args[_key54] = arguments[_key54];
      }
      return point(editor, ...args);
    },
    pointRef: function pointRef$1() {
      for (var _len55 = arguments.length, args = new Array(_len55), _key55 = 0; _key55 < _len55; _key55++) {
        args[_key55] = arguments[_key55];
      }
      return pointRef(editor, ...args);
    },
    pointRefs: function pointRefs$1() {
      for (var _len56 = arguments.length, args = new Array(_len56), _key56 = 0; _key56 < _len56; _key56++) {
        args[_key56] = arguments[_key56];
      }
      return pointRefs(editor, ...args);
    },
    positions: function positions$1() {
      for (var _len57 = arguments.length, args = new Array(_len57), _key57 = 0; _key57 < _len57; _key57++) {
        args[_key57] = arguments[_key57];
      }
      return positions(editor, ...args);
    },
    previous: function previous$1() {
      for (var _len58 = arguments.length, args = new Array(_len58), _key58 = 0; _key58 < _len58; _key58++) {
        args[_key58] = arguments[_key58];
      }
      return previous(editor, ...args);
    },
    range: function range$1() {
      for (var _len59 = arguments.length, args = new Array(_len59), _key59 = 0; _key59 < _len59; _key59++) {
        args[_key59] = arguments[_key59];
      }
      return range(editor, ...args);
    },
    rangeRef: function rangeRef$1() {
      for (var _len60 = arguments.length, args = new Array(_len60), _key60 = 0; _key60 < _len60; _key60++) {
        args[_key60] = arguments[_key60];
      }
      return rangeRef(editor, ...args);
    },
    rangeRefs: function rangeRefs$1() {
      for (var _len61 = arguments.length, args = new Array(_len61), _key61 = 0; _key61 < _len61; _key61++) {
        args[_key61] = arguments[_key61];
      }
      return rangeRefs(editor, ...args);
    },
    removeNodes: function removeNodes$1() {
      for (var _len62 = arguments.length, args = new Array(_len62), _key62 = 0; _key62 < _len62; _key62++) {
        args[_key62] = arguments[_key62];
      }
      return removeNodes(editor, ...args);
    },
    select: function select$1() {
      for (var _len63 = arguments.length, args = new Array(_len63), _key63 = 0; _key63 < _len63; _key63++) {
        args[_key63] = arguments[_key63];
      }
      return select(editor, ...args);
    },
    setNodes: function setNodes$1() {
      for (var _len64 = arguments.length, args = new Array(_len64), _key64 = 0; _key64 < _len64; _key64++) {
        args[_key64] = arguments[_key64];
      }
      return setNodes(editor, ...args);
    },
    setNormalizing: function setNormalizing$1() {
      for (var _len65 = arguments.length, args = new Array(_len65), _key65 = 0; _key65 < _len65; _key65++) {
        args[_key65] = arguments[_key65];
      }
      return setNormalizing(editor, ...args);
    },
    setPoint: function setPoint$1() {
      for (var _len66 = arguments.length, args = new Array(_len66), _key66 = 0; _key66 < _len66; _key66++) {
        args[_key66] = arguments[_key66];
      }
      return setPoint(editor, ...args);
    },
    setSelection: function setSelection$1() {
      for (var _len67 = arguments.length, args = new Array(_len67), _key67 = 0; _key67 < _len67; _key67++) {
        args[_key67] = arguments[_key67];
      }
      return setSelection(editor, ...args);
    },
    splitNodes: function splitNodes$1() {
      for (var _len68 = arguments.length, args = new Array(_len68), _key68 = 0; _key68 < _len68; _key68++) {
        args[_key68] = arguments[_key68];
      }
      return splitNodes(editor, ...args);
    },
    start: function start$1() {
      for (var _len69 = arguments.length, args = new Array(_len69), _key69 = 0; _key69 < _len69; _key69++) {
        args[_key69] = arguments[_key69];
      }
      return start(editor, ...args);
    },
    string: function string$1() {
      for (var _len70 = arguments.length, args = new Array(_len70), _key70 = 0; _key70 < _len70; _key70++) {
        args[_key70] = arguments[_key70];
      }
      return string(editor, ...args);
    },
    unhangRange: function unhangRange$1() {
      for (var _len71 = arguments.length, args = new Array(_len71), _key71 = 0; _key71 < _len71; _key71++) {
        args[_key71] = arguments[_key71];
      }
      return unhangRange(editor, ...args);
    },
    unsetNodes: function unsetNodes$1() {
      for (var _len72 = arguments.length, args = new Array(_len72), _key72 = 0; _key72 < _len72; _key72++) {
        args[_key72] = arguments[_key72];
      }
      return unsetNodes(editor, ...args);
    },
    unwrapNodes: function unwrapNodes$1() {
      for (var _len73 = arguments.length, args = new Array(_len73), _key73 = 0; _key73 < _len73; _key73++) {
        args[_key73] = arguments[_key73];
      }
      return unwrapNodes(editor, ...args);
    },
    void: function _void() {
      for (var _len74 = arguments.length, args = new Array(_len74), _key74 = 0; _key74 < _len74; _key74++) {
        args[_key74] = arguments[_key74];
      }
      return getVoid(editor, ...args);
    },
    withoutNormalizing: function withoutNormalizing$1() {
      for (var _len75 = arguments.length, args = new Array(_len75), _key75 = 0; _key75 < _len75; _key75++) {
        args[_key75] = arguments[_key75];
      }
      return withoutNormalizing(editor, ...args);
    },
    wrapNodes: function wrapNodes$1() {
      for (var _len76 = arguments.length, args = new Array(_len76), _key76 = 0; _key76 < _len76; _key76++) {
        args[_key76] = arguments[_key76];
      }
      return wrapNodes(editor, ...args);
    },
    shouldMergeNodesRemovePrevNode: function shouldMergeNodesRemovePrevNode$1() {
      for (var _len77 = arguments.length, args = new Array(_len77), _key77 = 0; _key77 < _len77; _key77++) {
        args[_key77] = arguments[_key77];
      }
      return shouldMergeNodesRemovePrevNode(editor, ...args);
    }
  };
  return editor;
};

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var direction_1 = direction;

var RTL = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC';
var LTR =
  'A-Za-z\u00C0-\u00D6\u00D8-\u00F6' +
  '\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF\u200E\u2C00-\uFB1C' +
  '\uFE00-\uFE6F\uFEFD-\uFFFF';

var rtl = new RegExp('^[^' + LTR + ']*[' + RTL + ']');
var ltr = new RegExp('^[^' + RTL + ']*[' + LTR + ']');

function direction(value) {
  value = String(value || '');

  if (rtl.test(value)) {
    return 'rtl'
  }

  if (ltr.test(value)) {
    return 'ltr'
  }

  return 'neutral'
}

var getDirection = /*@__PURE__*/getDefaultExportFromCjs(direction_1);

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */

function isObject$3(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject$3;

/** Detect free variable `global` from Node.js. */

var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal$1;

var freeGlobal = _freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root$2 = freeGlobal || freeSelf || Function('return this')();

var _root = root$2;

var root$1 = _root;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now$1 = function() {
  return root$1.Date.now();
};

var now_1 = now$1;

/** Used to match a single whitespace character. */

var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex$1(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

var _trimmedEndIndex = trimmedEndIndex$1;

var trimmedEndIndex = _trimmedEndIndex;

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim$1(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

var _baseTrim = baseTrim$1;

var root = _root;

/** Built-in value references. */
var Symbol$3 = root.Symbol;

var _Symbol = Symbol$3;

var Symbol$2 = _Symbol;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto$1.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag$1(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

var _getRawTag = getRawTag$1;

/** Used for built-in method references. */

var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString$1(value) {
  return nativeObjectToString.call(value);
}

var _objectToString = objectToString$1;

var Symbol$1 = _Symbol,
    getRawTag = _getRawTag,
    objectToString = _objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag$1(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

var _baseGetTag = baseGetTag$1;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */

function isObjectLike$1(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike$1;

var baseGetTag = _baseGetTag,
    isObjectLike = isObjectLike_1;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol$1(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

var isSymbol_1 = isSymbol$1;

var baseTrim = _baseTrim,
    isObject$2 = isObject_1,
    isSymbol = isSymbol_1;

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber$1(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject$2(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject$2(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var toNumber_1 = toNumber$1;

var isObject$1 = isObject_1,
    now = now_1,
    toNumber = toNumber_1;

/** Error message constants. */
var FUNC_ERROR_TEXT$1 = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce$1(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  wait = toNumber(wait) || 0;
  if (isObject$1(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

var debounce_1 = debounce$1;

var debounce$2 = /*@__PURE__*/getDefaultExportFromCjs(debounce_1);

var debounce = debounce_1,
    isObject = isObject_1;

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

var throttle_1 = throttle;

var throttle$1 = /*@__PURE__*/getDefaultExportFromCjs(throttle_1);

const t=t=>"object"==typeof t&&null!=t&&1===t.nodeType,e$1=(t,e)=>(!e||"hidden"!==t)&&("visible"!==t&&"clip"!==t),n$1=(t,n)=>{if(t.clientHeight<t.scrollHeight||t.clientWidth<t.scrollWidth){const o=getComputedStyle(t,null);return e$1(o.overflowY,n)||e$1(o.overflowX,n)||(t=>{const e=(t=>{if(!t.ownerDocument||!t.ownerDocument.defaultView)return null;try{return t.ownerDocument.defaultView.frameElement}catch(t){return null}})(t);return !!e&&(e.clientHeight<t.scrollHeight||e.clientWidth<t.scrollWidth)})(t)}return  false},o$1=(t,e,n,o,l,r,i,s)=>r<t&&i>e||r>t&&i<e?0:r<=t&&s<=n||i>=e&&s>=n?r-t-o:i>e&&s<n||r<t&&s>n?i-e+l:0,l=t=>{const e=t.parentElement;return null==e?t.getRootNode().host||null:e},r=(e,r)=>{var i,s,d,h;if("undefined"==typeof document)return [];const{scrollMode:c,block:f,inline:u,boundary:a,skipOverflowHiddenElements:g}=r,p="function"==typeof a?a:t=>t!==a;if(!t(e))throw new TypeError("Invalid target");const m=document.scrollingElement||document.documentElement,w=[];let W=e;for(;t(W)&&p(W);){if(W=l(W),W===m){w.push(W);break}null!=W&&W===document.body&&n$1(W)&&!n$1(document.documentElement)||null!=W&&n$1(W,g)&&w.push(W);}const b=null!=(s=null==(i=window.visualViewport)?void 0:i.width)?s:innerWidth,H=null!=(h=null==(d=window.visualViewport)?void 0:d.height)?h:innerHeight,{scrollX:y,scrollY:M}=window,{height:v,width:E,top:x,right:C,bottom:I,left:R}=e.getBoundingClientRect(),{top:T,right:B,bottom:F,left:V}=(t=>{const e=window.getComputedStyle(t);return {top:parseFloat(e.scrollMarginTop)||0,right:parseFloat(e.scrollMarginRight)||0,bottom:parseFloat(e.scrollMarginBottom)||0,left:parseFloat(e.scrollMarginLeft)||0}})(e);let k="start"===f||"nearest"===f?x-T:"end"===f?I+F:x+v/2-T+F,D="center"===u?R+E/2-V+B:"end"===u?C+B:R-V;const L=[];for(let t=0;t<w.length;t++){const e=w[t],{height:l,width:r,top:i,right:s,bottom:d,left:h}=e.getBoundingClientRect();if("if-needed"===c&&x>=0&&R>=0&&I<=H&&C<=b&&(e===m&&!n$1(e)||x>=i&&I<=d&&R>=h&&C<=s))return L;const a=getComputedStyle(e),g=parseInt(a.borderLeftWidth,10),p=parseInt(a.borderTopWidth,10),W=parseInt(a.borderRightWidth,10),T=parseInt(a.borderBottomWidth,10);let B=0,F=0;const V="offsetWidth"in e?e.offsetWidth-e.clientWidth-g-W:0,S="offsetHeight"in e?e.offsetHeight-e.clientHeight-p-T:0,X="offsetWidth"in e?0===e.offsetWidth?0:r/e.offsetWidth:0,Y="offsetHeight"in e?0===e.offsetHeight?0:l/e.offsetHeight:0;if(m===e)B="start"===f?k:"end"===f?k-H:"nearest"===f?o$1(M,M+H,H,p,T,M+k,M+k+v,v):k-H/2,F="start"===u?D:"center"===u?D-b/2:"end"===u?D-b:o$1(y,y+b,b,g,W,y+D,y+D+E,E),B=Math.max(0,B+M),F=Math.max(0,F+y);else {B="start"===f?k-i-p:"end"===f?k-d+T+S:"nearest"===f?o$1(i,d,l,p,T+S,k,k+v,v):k-(i+l/2)+S/2,F="start"===u?D-h-g:"center"===u?D-(h+r/2)+V/2:"end"===u?D-s+W+V:o$1(h,s,r,g,W+V,D,D+E,E);const{scrollLeft:t,scrollTop:n}=e;B=0===Y?0:Math.max(0,Math.min(n+B/Y,e.scrollHeight-l/Y+S)),F=0===X?0:Math.max(0,Math.min(t+F/X,e.scrollWidth-r/X+V)),k+=n-B,D+=t-F;}L.push({el:e,top:B,left:F});}return L};

const o=t=>false===t?{block:"end",inline:"nearest"}:(t=>t===Object(t)&&0!==Object.keys(t).length)(t)?t:{block:"start",inline:"nearest"};function e(e,r$1){if(!e.isConnected||!(t=>{let o=t;for(;o&&o.parentNode;){if(o.parentNode===document)return  true;o=o.parentNode instanceof ShadowRoot?o.parentNode.host:o.parentNode;}return  false})(e))return;const n=(t=>{const o=window.getComputedStyle(t);return {top:parseFloat(o.scrollMarginTop)||0,right:parseFloat(o.scrollMarginRight)||0,bottom:parseFloat(o.scrollMarginBottom)||0,left:parseFloat(o.scrollMarginLeft)||0}})(e);if((t=>"object"==typeof t&&"function"==typeof t.behavior)(r$1))return r$1.behavior(r(e,r$1));const l="boolean"==typeof r$1||null==r$1?void 0:r$1.behavior;for(const{el:a,top:i,left:s}of r(e,o(r$1))){const t=i-n.top+n.bottom,o=s-n.left+n.right;a.scroll({top:t,left:o,behavior:l});}}

var resizeObservers = [];

var hasActiveObservations = function () {
    return resizeObservers.some(function (ro) { return ro.activeTargets.length > 0; });
};

var hasSkippedObservations = function () {
    return resizeObservers.some(function (ro) { return ro.skippedTargets.length > 0; });
};

var msg = 'ResizeObserver loop completed with undelivered notifications.';
var deliverResizeLoopError = function () {
    var event;
    if (typeof ErrorEvent === 'function') {
        event = new ErrorEvent('error', {
            message: msg
        });
    }
    else {
        event = document.createEvent('Event');
        event.initEvent('error', false, false);
        event.message = msg;
    }
    window.dispatchEvent(event);
};

var ResizeObserverBoxOptions;
(function (ResizeObserverBoxOptions) {
    ResizeObserverBoxOptions["BORDER_BOX"] = "border-box";
    ResizeObserverBoxOptions["CONTENT_BOX"] = "content-box";
    ResizeObserverBoxOptions["DEVICE_PIXEL_CONTENT_BOX"] = "device-pixel-content-box";
})(ResizeObserverBoxOptions || (ResizeObserverBoxOptions = {}));

var freeze = function (obj) { return Object.freeze(obj); };

var ResizeObserverSize = (function () {
    function ResizeObserverSize(inlineSize, blockSize) {
        this.inlineSize = inlineSize;
        this.blockSize = blockSize;
        freeze(this);
    }
    return ResizeObserverSize;
}());

var DOMRectReadOnly = (function () {
    function DOMRectReadOnly(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.top = this.y;
        this.left = this.x;
        this.bottom = this.top + this.height;
        this.right = this.left + this.width;
        return freeze(this);
    }
    DOMRectReadOnly.prototype.toJSON = function () {
        var _a = this, x = _a.x, y = _a.y, top = _a.top, right = _a.right, bottom = _a.bottom, left = _a.left, width = _a.width, height = _a.height;
        return { x: x, y: y, top: top, right: right, bottom: bottom, left: left, width: width, height: height };
    };
    DOMRectReadOnly.fromRect = function (rectangle) {
        return new DOMRectReadOnly(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    };
    return DOMRectReadOnly;
}());

var isSVG = function (target) { return target instanceof SVGElement && 'getBBox' in target; };
var isHidden = function (target) {
    if (isSVG(target)) {
        var _a = target.getBBox(), width = _a.width, height = _a.height;
        return !width && !height;
    }
    var _b = target, offsetWidth = _b.offsetWidth, offsetHeight = _b.offsetHeight;
    return !(offsetWidth || offsetHeight || target.getClientRects().length);
};
var isElement = function (obj) {
    var _a;
    if (obj instanceof Element) {
        return true;
    }
    var scope = (_a = obj === null || obj === void 0 ? void 0 : obj.ownerDocument) === null || _a === void 0 ? void 0 : _a.defaultView;
    return !!(scope && obj instanceof scope.Element);
};
var isReplacedElement = function (target) {
    switch (target.tagName) {
        case 'INPUT':
            if (target.type !== 'image') {
                break;
            }
        case 'VIDEO':
        case 'AUDIO':
        case 'EMBED':
        case 'OBJECT':
        case 'CANVAS':
        case 'IFRAME':
        case 'IMG':
            return true;
    }
    return false;
};

var global$1 = typeof window !== 'undefined' ? window : {};

var cache = new WeakMap();
var scrollRegexp = /auto|scroll/;
var verticalRegexp = /^tb|vertical/;
var IE = (/msie|trident/i).test(global$1.navigator && global$1.navigator.userAgent);
var parseDimension = function (pixel) { return parseFloat(pixel || '0'); };
var size = function (inlineSize, blockSize, switchSizes) {
    if (inlineSize === void 0) { inlineSize = 0; }
    if (blockSize === void 0) { blockSize = 0; }
    if (switchSizes === void 0) { switchSizes = false; }
    return new ResizeObserverSize((switchSizes ? blockSize : inlineSize) || 0, (switchSizes ? inlineSize : blockSize) || 0);
};
var zeroBoxes = freeze({
    devicePixelContentBoxSize: size(),
    borderBoxSize: size(),
    contentBoxSize: size(),
    contentRect: new DOMRectReadOnly(0, 0, 0, 0)
});
var calculateBoxSizes = function (target, forceRecalculation) {
    if (forceRecalculation === void 0) { forceRecalculation = false; }
    if (cache.has(target) && !forceRecalculation) {
        return cache.get(target);
    }
    if (isHidden(target)) {
        cache.set(target, zeroBoxes);
        return zeroBoxes;
    }
    var cs = getComputedStyle(target);
    var svg = isSVG(target) && target.ownerSVGElement && target.getBBox();
    var removePadding = !IE && cs.boxSizing === 'border-box';
    var switchSizes = verticalRegexp.test(cs.writingMode || '');
    var canScrollVertically = !svg && scrollRegexp.test(cs.overflowY || '');
    var canScrollHorizontally = !svg && scrollRegexp.test(cs.overflowX || '');
    var paddingTop = svg ? 0 : parseDimension(cs.paddingTop);
    var paddingRight = svg ? 0 : parseDimension(cs.paddingRight);
    var paddingBottom = svg ? 0 : parseDimension(cs.paddingBottom);
    var paddingLeft = svg ? 0 : parseDimension(cs.paddingLeft);
    var borderTop = svg ? 0 : parseDimension(cs.borderTopWidth);
    var borderRight = svg ? 0 : parseDimension(cs.borderRightWidth);
    var borderBottom = svg ? 0 : parseDimension(cs.borderBottomWidth);
    var borderLeft = svg ? 0 : parseDimension(cs.borderLeftWidth);
    var horizontalPadding = paddingLeft + paddingRight;
    var verticalPadding = paddingTop + paddingBottom;
    var horizontalBorderArea = borderLeft + borderRight;
    var verticalBorderArea = borderTop + borderBottom;
    var horizontalScrollbarThickness = !canScrollHorizontally ? 0 : target.offsetHeight - verticalBorderArea - target.clientHeight;
    var verticalScrollbarThickness = !canScrollVertically ? 0 : target.offsetWidth - horizontalBorderArea - target.clientWidth;
    var widthReduction = removePadding ? horizontalPadding + horizontalBorderArea : 0;
    var heightReduction = removePadding ? verticalPadding + verticalBorderArea : 0;
    var contentWidth = svg ? svg.width : parseDimension(cs.width) - widthReduction - verticalScrollbarThickness;
    var contentHeight = svg ? svg.height : parseDimension(cs.height) - heightReduction - horizontalScrollbarThickness;
    var borderBoxWidth = contentWidth + horizontalPadding + verticalScrollbarThickness + horizontalBorderArea;
    var borderBoxHeight = contentHeight + verticalPadding + horizontalScrollbarThickness + verticalBorderArea;
    var boxes = freeze({
        devicePixelContentBoxSize: size(Math.round(contentWidth * devicePixelRatio), Math.round(contentHeight * devicePixelRatio), switchSizes),
        borderBoxSize: size(borderBoxWidth, borderBoxHeight, switchSizes),
        contentBoxSize: size(contentWidth, contentHeight, switchSizes),
        contentRect: new DOMRectReadOnly(paddingLeft, paddingTop, contentWidth, contentHeight)
    });
    cache.set(target, boxes);
    return boxes;
};
var calculateBoxSize = function (target, observedBox, forceRecalculation) {
    var _a = calculateBoxSizes(target, forceRecalculation), borderBoxSize = _a.borderBoxSize, contentBoxSize = _a.contentBoxSize, devicePixelContentBoxSize = _a.devicePixelContentBoxSize;
    switch (observedBox) {
        case ResizeObserverBoxOptions.DEVICE_PIXEL_CONTENT_BOX:
            return devicePixelContentBoxSize;
        case ResizeObserverBoxOptions.BORDER_BOX:
            return borderBoxSize;
        default:
            return contentBoxSize;
    }
};

var ResizeObserverEntry = (function () {
    function ResizeObserverEntry(target) {
        var boxes = calculateBoxSizes(target);
        this.target = target;
        this.contentRect = boxes.contentRect;
        this.borderBoxSize = freeze([boxes.borderBoxSize]);
        this.contentBoxSize = freeze([boxes.contentBoxSize]);
        this.devicePixelContentBoxSize = freeze([boxes.devicePixelContentBoxSize]);
    }
    return ResizeObserverEntry;
}());

var calculateDepthForNode = function (node) {
    if (isHidden(node)) {
        return Infinity;
    }
    var depth = 0;
    var parent = node.parentNode;
    while (parent) {
        depth += 1;
        parent = parent.parentNode;
    }
    return depth;
};

var broadcastActiveObservations = function () {
    var shallowestDepth = Infinity;
    var callbacks = [];
    resizeObservers.forEach(function processObserver(ro) {
        if (ro.activeTargets.length === 0) {
            return;
        }
        var entries = [];
        ro.activeTargets.forEach(function processTarget(ot) {
            var entry = new ResizeObserverEntry(ot.target);
            var targetDepth = calculateDepthForNode(ot.target);
            entries.push(entry);
            ot.lastReportedSize = calculateBoxSize(ot.target, ot.observedBox);
            if (targetDepth < shallowestDepth) {
                shallowestDepth = targetDepth;
            }
        });
        callbacks.push(function resizeObserverCallback() {
            ro.callback.call(ro.observer, entries, ro.observer);
        });
        ro.activeTargets.splice(0, ro.activeTargets.length);
    });
    for (var _i = 0, callbacks_1 = callbacks; _i < callbacks_1.length; _i++) {
        var callback = callbacks_1[_i];
        callback();
    }
    return shallowestDepth;
};

var gatherActiveObservationsAtDepth = function (depth) {
    resizeObservers.forEach(function processObserver(ro) {
        ro.activeTargets.splice(0, ro.activeTargets.length);
        ro.skippedTargets.splice(0, ro.skippedTargets.length);
        ro.observationTargets.forEach(function processTarget(ot) {
            if (ot.isActive()) {
                if (calculateDepthForNode(ot.target) > depth) {
                    ro.activeTargets.push(ot);
                }
                else {
                    ro.skippedTargets.push(ot);
                }
            }
        });
    });
};

var process$1 = function () {
    var depth = 0;
    gatherActiveObservationsAtDepth(depth);
    while (hasActiveObservations()) {
        depth = broadcastActiveObservations();
        gatherActiveObservationsAtDepth(depth);
    }
    if (hasSkippedObservations()) {
        deliverResizeLoopError();
    }
    return depth > 0;
};

var trigger;
var callbacks = [];
var notify = function () { return callbacks.splice(0).forEach(function (cb) { return cb(); }); };
var queueMicroTask = function (callback) {
    if (!trigger) {
        var toggle_1 = 0;
        var el_1 = document.createTextNode('');
        var config = { characterData: true };
        new MutationObserver(function () { return notify(); }).observe(el_1, config);
        trigger = function () { el_1.textContent = "".concat(toggle_1 ? toggle_1-- : toggle_1++); };
    }
    callbacks.push(callback);
    trigger();
};

var queueResizeObserver = function (cb) {
    queueMicroTask(function ResizeObserver() {
        requestAnimationFrame(cb);
    });
};

var watching = 0;
var isWatching = function () { return !!watching; };
var CATCH_PERIOD = 250;
var observerConfig = { attributes: true, characterData: true, childList: true, subtree: true };
var events = [
    'resize',
    'load',
    'transitionend',
    'animationend',
    'animationstart',
    'animationiteration',
    'keyup',
    'keydown',
    'mouseup',
    'mousedown',
    'mouseover',
    'mouseout',
    'blur',
    'focus'
];
var time = function (timeout) {
    if (timeout === void 0) { timeout = 0; }
    return Date.now() + timeout;
};
var scheduled = false;
var Scheduler = (function () {
    function Scheduler() {
        var _this = this;
        this.stopped = true;
        this.listener = function () { return _this.schedule(); };
    }
    Scheduler.prototype.run = function (timeout) {
        var _this = this;
        if (timeout === void 0) { timeout = CATCH_PERIOD; }
        if (scheduled) {
            return;
        }
        scheduled = true;
        var until = time(timeout);
        queueResizeObserver(function () {
            var elementsHaveResized = false;
            try {
                elementsHaveResized = process$1();
            }
            finally {
                scheduled = false;
                timeout = until - time();
                if (!isWatching()) {
                    return;
                }
                if (elementsHaveResized) {
                    _this.run(1000);
                }
                else if (timeout > 0) {
                    _this.run(timeout);
                }
                else {
                    _this.start();
                }
            }
        });
    };
    Scheduler.prototype.schedule = function () {
        this.stop();
        this.run();
    };
    Scheduler.prototype.observe = function () {
        var _this = this;
        var cb = function () { return _this.observer && _this.observer.observe(document.body, observerConfig); };
        document.body ? cb() : global$1.addEventListener('DOMContentLoaded', cb);
    };
    Scheduler.prototype.start = function () {
        var _this = this;
        if (this.stopped) {
            this.stopped = false;
            this.observer = new MutationObserver(this.listener);
            this.observe();
            events.forEach(function (name) { return global$1.addEventListener(name, _this.listener, true); });
        }
    };
    Scheduler.prototype.stop = function () {
        var _this = this;
        if (!this.stopped) {
            this.observer && this.observer.disconnect();
            events.forEach(function (name) { return global$1.removeEventListener(name, _this.listener, true); });
            this.stopped = true;
        }
    };
    return Scheduler;
}());
var scheduler = new Scheduler();
var updateCount = function (n) {
    !watching && n > 0 && scheduler.start();
    watching += n;
    !watching && scheduler.stop();
};

var skipNotifyOnElement = function (target) {
    return !isSVG(target)
        && !isReplacedElement(target)
        && getComputedStyle(target).display === 'inline';
};
var ResizeObservation = (function () {
    function ResizeObservation(target, observedBox) {
        this.target = target;
        this.observedBox = observedBox || ResizeObserverBoxOptions.CONTENT_BOX;
        this.lastReportedSize = {
            inlineSize: 0,
            blockSize: 0
        };
    }
    ResizeObservation.prototype.isActive = function () {
        var size = calculateBoxSize(this.target, this.observedBox, true);
        if (skipNotifyOnElement(this.target)) {
            this.lastReportedSize = size;
        }
        if (this.lastReportedSize.inlineSize !== size.inlineSize
            || this.lastReportedSize.blockSize !== size.blockSize) {
            return true;
        }
        return false;
    };
    return ResizeObservation;
}());

var ResizeObserverDetail = (function () {
    function ResizeObserverDetail(resizeObserver, callback) {
        this.activeTargets = [];
        this.skippedTargets = [];
        this.observationTargets = [];
        this.observer = resizeObserver;
        this.callback = callback;
    }
    return ResizeObserverDetail;
}());

var observerMap = new WeakMap();
var getObservationIndex = function (observationTargets, target) {
    for (var i = 0; i < observationTargets.length; i += 1) {
        if (observationTargets[i].target === target) {
            return i;
        }
    }
    return -1;
};
var ResizeObserverController = (function () {
    function ResizeObserverController() {
    }
    ResizeObserverController.connect = function (resizeObserver, callback) {
        var detail = new ResizeObserverDetail(resizeObserver, callback);
        observerMap.set(resizeObserver, detail);
    };
    ResizeObserverController.observe = function (resizeObserver, target, options) {
        var detail = observerMap.get(resizeObserver);
        var firstObservation = detail.observationTargets.length === 0;
        if (getObservationIndex(detail.observationTargets, target) < 0) {
            firstObservation && resizeObservers.push(detail);
            detail.observationTargets.push(new ResizeObservation(target, options && options.box));
            updateCount(1);
            scheduler.schedule();
        }
    };
    ResizeObserverController.unobserve = function (resizeObserver, target) {
        var detail = observerMap.get(resizeObserver);
        var index = getObservationIndex(detail.observationTargets, target);
        var lastObservation = detail.observationTargets.length === 1;
        if (index >= 0) {
            lastObservation && resizeObservers.splice(resizeObservers.indexOf(detail), 1);
            detail.observationTargets.splice(index, 1);
            updateCount(-1);
        }
    };
    ResizeObserverController.disconnect = function (resizeObserver) {
        var _this = this;
        var detail = observerMap.get(resizeObserver);
        detail.observationTargets.slice().forEach(function (ot) { return _this.unobserve(resizeObserver, ot.target); });
        detail.activeTargets.splice(0, detail.activeTargets.length);
    };
    return ResizeObserverController;
}());

var ResizeObserver = (function () {
    function ResizeObserver(callback) {
        if (arguments.length === 0) {
            throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
        }
        if (typeof callback !== 'function') {
            throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
        }
        ResizeObserverController.connect(this, callback);
    }
    ResizeObserver.prototype.observe = function (target, options) {
        if (arguments.length === 0) {
            throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
        }
        if (!isElement(target)) {
            throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
        }
        ResizeObserverController.observe(this, target, options);
    };
    ResizeObserver.prototype.unobserve = function (target) {
        if (arguments.length === 0) {
            throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
        }
        if (!isElement(target)) {
            throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
        }
        ResizeObserverController.unobserve(this, target);
    };
    ResizeObserver.prototype.disconnect = function () {
        ResizeObserverController.disconnect(this);
    };
    ResizeObserver.toString = function () {
        return 'function ResizeObserver () { [polyfill code] }';
    };
    return ResizeObserver;
}());

var lib = {};

Object.defineProperty(lib, "__esModule", {
  value: true
});

/**
 * Constants.
 */

var IS_MAC = typeof window != 'undefined' && /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);

var MODIFIERS = {
  alt: 'altKey',
  control: 'ctrlKey',
  meta: 'metaKey',
  shift: 'shiftKey'
};

var ALIASES = {
  add: '+',
  break: 'pause',
  cmd: 'meta',
  command: 'meta',
  ctl: 'control',
  ctrl: 'control',
  del: 'delete',
  down: 'arrowdown',
  esc: 'escape',
  ins: 'insert',
  left: 'arrowleft',
  mod: IS_MAC ? 'meta' : 'control',
  opt: 'alt',
  option: 'alt',
  return: 'enter',
  right: 'arrowright',
  space: ' ',
  spacebar: ' ',
  up: 'arrowup',
  win: 'meta',
  windows: 'meta'
};

var CODES = {
  backspace: 8,
  tab: 9,
  enter: 13,
  shift: 16,
  control: 17,
  alt: 18,
  pause: 19,
  capslock: 20,
  escape: 27,
  ' ': 32,
  pageup: 33,
  pagedown: 34,
  end: 35,
  home: 36,
  arrowleft: 37,
  arrowup: 38,
  arrowright: 39,
  arrowdown: 40,
  insert: 45,
  delete: 46,
  meta: 91,
  numlock: 144,
  scrolllock: 145,
  ';': 186,
  '=': 187,
  ',': 188,
  '-': 189,
  '.': 190,
  '/': 191,
  '`': 192,
  '[': 219,
  '\\': 220,
  ']': 221,
  '\'': 222
};

for (var f = 1; f < 20; f++) {
  CODES['f' + f] = 111 + f;
}

/**
 * Is hotkey?
 */

function isHotkey(hotkey, options, event) {
  if (options && !('byKey' in options)) {
    event = options;
    options = null;
  }

  if (!Array.isArray(hotkey)) {
    hotkey = [hotkey];
  }

  var array = hotkey.map(function (string) {
    return parseHotkey(string, options);
  });
  var check = function check(e) {
    return array.some(function (object) {
      return compareHotkey(object, e);
    });
  };
  var ret = event == null ? check : check(event);
  return ret;
}

function isCodeHotkey(hotkey, event) {
  return isHotkey(hotkey, event);
}

function isKeyHotkey(hotkey, event) {
  return isHotkey(hotkey, { byKey: true }, event);
}

/**
 * Parse.
 */

function parseHotkey(hotkey, options) {
  var byKey = options && options.byKey;
  var ret = {};

  // Special case to handle the `+` key since we use it as a separator.
  hotkey = hotkey.replace('++', '+add');
  var values = hotkey.split('+');
  var length = values.length;

  // Ensure that all the modifiers are set to false unless the hotkey has them.

  for (var k in MODIFIERS) {
    ret[MODIFIERS[k]] = false;
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var value = _step.value;

      var optional = value.endsWith('?') && value.length > 1;

      if (optional) {
        value = value.slice(0, -1);
      }

      var name = toKeyName(value);
      var modifier = MODIFIERS[name];

      if (value.length > 1 && !modifier && !ALIASES[value] && !CODES[name]) {
        throw new TypeError('Unknown modifier: "' + value + '"');
      }

      if (length === 1 || !modifier) {
        if (byKey) {
          ret.key = name;
        } else {
          ret.which = toKeyCode(value);
        }
      }

      if (modifier) {
        ret[modifier] = optional ? null : true;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return ret;
}

/**
 * Compare.
 */

function compareHotkey(object, event) {
  for (var key in object) {
    var expected = object[key];
    var actual = void 0;

    if (expected == null) {
      continue;
    }

    if (key === 'key' && event.key != null) {
      actual = event.key.toLowerCase();
    } else if (key === 'which') {
      actual = expected === 91 && event.which === 93 ? 91 : event.which;
    } else {
      actual = event[key];
    }

    if (actual == null && expected === false) {
      continue;
    }

    if (actual !== expected) {
      return false;
    }
  }

  return true;
}

/**
 * Utils.
 */

function toKeyCode(name) {
  name = toKeyName(name);
  var code = CODES[name] || name.toUpperCase().charCodeAt(0);
  return code;
}

function toKeyName(name) {
  name = name.toLowerCase();
  name = ALIASES[name] || name;
  return name;
}

/**
 * Export.
 */

lib.default = isHotkey;
var isHotkey_1 = lib.isHotkey = isHotkey;
lib.isCodeHotkey = isCodeHotkey;
lib.isKeyHotkey = isKeyHotkey;
lib.parseHotkey = parseHotkey;
lib.compareHotkey = compareHotkey;
lib.toKeyCode = toKeyCode;
lib.toKeyName = toKeyName;

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint);
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}

function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

/**
 * A React context for sharing the editor object.
 */
var EditorContext = /*#__PURE__*/React.createContext(null);
/**
 * Get the current editor object from the React context.
 */
var useSlateStatic = () => {
  var editor = React.useContext(EditorContext);
  if (!editor) {
    throw new Error("The `useSlateStatic` hook must be used inside the <Slate> component's context.");
  }
  return editor;
};

var _navigator$userAgent$, _navigator$userAgent$2;
var REACT_MAJOR_VERSION = parseInt(React.version.split('.')[0], 10);
var IS_IOS = typeof navigator !== 'undefined' && typeof window !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
var IS_APPLE = typeof navigator !== 'undefined' && /Mac OS X/.test(navigator.userAgent);
var IS_ANDROID = typeof navigator !== 'undefined' && /Android/.test(navigator.userAgent);
var IS_FIREFOX = typeof navigator !== 'undefined' && /^(?!.*Seamonkey)(?=.*Firefox).*/i.test(navigator.userAgent);
var IS_WEBKIT = typeof navigator !== 'undefined' && /AppleWebKit(?!.*Chrome)/i.test(navigator.userAgent);
// "modern" Edge was released at 79.x
var IS_EDGE_LEGACY = typeof navigator !== 'undefined' && /Edge?\/(?:[0-6][0-9]|[0-7][0-8])(?:\.)/i.test(navigator.userAgent);
var IS_CHROME = typeof navigator !== 'undefined' && /Chrome/i.test(navigator.userAgent);
// Native `beforeInput` events don't work well with react on Chrome 75
// and older, Chrome 76+ can use `beforeInput` though.
var IS_CHROME_LEGACY = typeof navigator !== 'undefined' && /Chrome?\/(?:[0-7][0-5]|[0-6][0-9])(?:\.)/i.test(navigator.userAgent);
var IS_ANDROID_CHROME_LEGACY = IS_ANDROID && typeof navigator !== 'undefined' && /Chrome?\/(?:[0-5]?\d)(?:\.)/i.test(navigator.userAgent);
// Firefox did not support `beforeInput` until `v87`.
var IS_FIREFOX_LEGACY = typeof navigator !== 'undefined' && /^(?!.*Seamonkey)(?=.*Firefox\/(?:[0-7][0-9]|[0-8][0-6])(?:\.)).*/i.test(navigator.userAgent);
// UC mobile browser
var IS_UC_MOBILE = typeof navigator !== 'undefined' && /.*UCBrowser/.test(navigator.userAgent);
// Wechat browser (not including mac wechat)
var IS_WECHATBROWSER = typeof navigator !== 'undefined' && /.*Wechat/.test(navigator.userAgent) && !/.*MacWechat/.test(navigator.userAgent); // avoid lookbehind (buggy in safari < 16.4)
// Check if DOM is available as React does internally.
// https://github.com/facebook/react/blob/master/packages/shared/ExecutionEnvironment.js
var CAN_USE_DOM = !!(typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined');
// Check if the browser is Safari and older than 17
typeof navigator !== 'undefined' && /Safari/.test(navigator.userAgent) && /Version\/(\d+)/.test(navigator.userAgent) && ((_navigator$userAgent$ = navigator.userAgent.match(/Version\/(\d+)/)) !== null && _navigator$userAgent$ !== void 0 && _navigator$userAgent$[1] ? parseInt((_navigator$userAgent$2 = navigator.userAgent.match(/Version\/(\d+)/)) === null || _navigator$userAgent$2 === void 0 ? void 0 : _navigator$userAgent$2[1], 10) < 17 : false);
// COMPAT: Firefox/Edge Legacy don't support the `beforeinput` event
// Chrome Legacy doesn't support `beforeinput` correctly
var HAS_BEFORE_INPUT_SUPPORT = (!IS_CHROME_LEGACY || !IS_ANDROID_CHROME_LEGACY) && !IS_EDGE_LEGACY &&
// globalThis is undefined in older browsers
typeof globalThis !== 'undefined' && globalThis.InputEvent &&
// @ts-ignore The `getTargetRanges` property isn't recognized.
typeof globalThis.InputEvent.prototype.getTargetRanges === 'function';

/**
 * Two weak maps that allow us rebuild a path given a node. They are populated
 * at render time such that after a render occurs we can always backtrack.
 */
var NODE_TO_INDEX = new WeakMap();
var NODE_TO_PARENT = new WeakMap();
/**
 * Weak maps that allow us to go between Slate nodes and DOM nodes. These
 * are used to resolve DOM event-related logic into Slate actions.
 */
var EDITOR_TO_WINDOW = new WeakMap();
var EDITOR_TO_ELEMENT = new WeakMap();
var EDITOR_TO_PLACEHOLDER_ELEMENT = new WeakMap();
var ELEMENT_TO_NODE = new WeakMap();
var NODE_TO_ELEMENT = new WeakMap();
var NODE_TO_KEY = new WeakMap();
var EDITOR_TO_KEY_TO_ELEMENT = new WeakMap();
/**
 * Weak maps for storing editor-related state.
 */
var IS_READ_ONLY = new WeakMap();
var IS_FOCUSED = new WeakMap();
var IS_COMPOSING = new WeakMap();
var EDITOR_TO_USER_SELECTION = new WeakMap();
/**
 * Weak map for associating the context `onChange` context with the plugin.
 */
var EDITOR_TO_ON_CHANGE = new WeakMap();
/**
 * Weak maps for saving pending state on composition stage.
 */
var EDITOR_TO_SCHEDULE_FLUSH = new WeakMap();
var EDITOR_TO_PENDING_INSERTION_MARKS = new WeakMap();
var EDITOR_TO_USER_MARKS = new WeakMap();
/**
 * Android input handling specific weak-maps
 */
var EDITOR_TO_PENDING_DIFFS = new WeakMap();
var EDITOR_TO_PENDING_ACTION = new WeakMap();
var EDITOR_TO_PENDING_SELECTION = new WeakMap();
var EDITOR_TO_FORCE_RENDER = new WeakMap();
/**
 * Symbols.
 */
var PLACEHOLDER_SYMBOL = Symbol('placeholder');
var MARK_PLACEHOLDER_SYMBOL = Symbol('mark-placeholder');

/**
 * Types.
 */
// COMPAT: This is required to prevent TypeScript aliases from doing some very
// weird things for Slate's types with the same name as globals. (2019/11/27)
// https://github.com/microsoft/TypeScript/issues/35002
var DOMText = globalThis.Text;
/**
 * Returns the host window of a DOM node
 */
var getDefaultView = value => {
  return value && value.ownerDocument && value.ownerDocument.defaultView || null;
};
/**
 * Check if a DOM node is a comment node.
 */
var isDOMComment = value => {
  return isDOMNode(value) && value.nodeType === 8;
};
/**
 * Check if a DOM node is an element node.
 */
var isDOMElement = value => {
  return isDOMNode(value) && value.nodeType === 1;
};
/**
 * Check if a value is a DOM node.
 */
var isDOMNode = value => {
  var window = getDefaultView(value);
  return !!window && value instanceof window.Node;
};
/**
 * Check if a value is a DOM selection.
 */
var isDOMSelection = value => {
  var window = value && value.anchorNode && getDefaultView(value.anchorNode);
  return !!window && value instanceof window.Selection;
};
/**
 * Check if a DOM node is an element node.
 */
var isDOMText = value => {
  return isDOMNode(value) && value.nodeType === 3;
};
/**
 * Checks whether a paste event is a plaintext-only event.
 */
var isPlainTextOnlyPaste = event => {
  return event.clipboardData && event.clipboardData.getData('text/plain') !== '' && event.clipboardData.types.length === 1;
};
/**
 * Normalize a DOM point so that it always refers to a text node.
 */
var normalizeDOMPoint = domPoint => {
  var [node, offset] = domPoint;
  // If it's an element node, its offset refers to the index of its children
  // including comment nodes, so try to find the right text child node.
  if (isDOMElement(node) && node.childNodes.length) {
    var isLast = offset === node.childNodes.length;
    var index = isLast ? offset - 1 : offset;
    [node, index] = getEditableChildAndIndex(node, index, isLast ? 'backward' : 'forward');
    // If the editable child found is in front of input offset, we instead seek to its end
    isLast = index < offset;
    // If the node has children, traverse until we have a leaf node. Leaf nodes
    // can be either text nodes, or other void DOM nodes.
    while (isDOMElement(node) && node.childNodes.length) {
      var i = isLast ? node.childNodes.length - 1 : 0;
      node = getEditableChild(node, i, isLast ? 'backward' : 'forward');
    }
    // Determine the new offset inside the text node.
    offset = isLast && node.textContent != null ? node.textContent.length : 0;
  }
  // Return the node and offset.
  return [node, offset];
};
/**
 * Determines whether the active element is nested within a shadowRoot
 */
var hasShadowRoot = node => {
  var parent = node && node.parentNode;
  while (parent) {
    if (parent.toString() === '[object ShadowRoot]') {
      return true;
    }
    parent = parent.parentNode;
  }
  return false;
};
/**
 * Get the nearest editable child and index at `index` in a `parent`, preferring
 * `direction`.
 */
var getEditableChildAndIndex = (parent, index, direction) => {
  var {
    childNodes
  } = parent;
  var child = childNodes[index];
  var i = index;
  var triedForward = false;
  var triedBackward = false;
  // While the child is a comment node, or an element node with no children,
  // keep iterating to find a sibling non-void, non-comment node.
  while (isDOMComment(child) || isDOMElement(child) && child.childNodes.length === 0 || isDOMElement(child) && child.getAttribute('contenteditable') === 'false') {
    if (triedForward && triedBackward) {
      break;
    }
    if (i >= childNodes.length) {
      triedForward = true;
      i = index - 1;
      direction = 'backward';
      continue;
    }
    if (i < 0) {
      triedBackward = true;
      i = index + 1;
      direction = 'forward';
      continue;
    }
    child = childNodes[i];
    index = i;
    i += direction === 'forward' ? 1 : -1;
  }
  return [child, index];
};
/**
 * Get the nearest editable child at `index` in a `parent`, preferring
 * `direction`.
 */
var getEditableChild = (parent, index, direction) => {
  var [child] = getEditableChildAndIndex(parent, index, direction);
  return child;
};
/**
 * Get a plaintext representation of the content of a node, accounting for block
 * elements which get a newline appended.
 *
 * The domNode must be attached to the DOM.
 */
var getPlainText = domNode => {
  var text = '';
  if (isDOMText(domNode) && domNode.nodeValue) {
    return domNode.nodeValue;
  }
  if (isDOMElement(domNode)) {
    for (var childNode of Array.from(domNode.childNodes)) {
      text += getPlainText(childNode);
    }
    var display = getComputedStyle(domNode).getPropertyValue('display');
    if (display === 'block' || display === 'list' || domNode.tagName === 'BR') {
      text += '\n';
    }
  }
  return text;
};
/**
 * Get x-slate-fragment attribute from data-slate-fragment
 */
var catchSlateFragment = /data-slate-fragment="(.+?)"/m;
var getSlateFragmentAttribute = dataTransfer => {
  var htmlData = dataTransfer.getData('text/html');
  var [, fragment] = htmlData.match(catchSlateFragment) || [];
  return fragment;
};
/**
 * Get the dom selection from Shadow Root if possible, otherwise from the document
 */
var getSelection = root => {
  if (root.getSelection != null) {
    return root.getSelection();
  }
  return document.getSelection();
};
/**
 * Check whether a mutation originates from a editable element inside the editor.
 */
var isTrackedMutation = (editor, mutation, batch) => {
  var {
    target
  } = mutation;
  if (isDOMElement(target) && target.matches('[contentEditable="false"]')) {
    return false;
  }
  var {
    document
  } = ReactEditor.getWindow(editor);
  if (document.contains(target)) {
    return ReactEditor.hasDOMNode(editor, target, {
      editable: true
    });
  }
  var parentMutation = batch.find(_ref => {
    var {
      addedNodes,
      removedNodes
    } = _ref;
    for (var node of addedNodes) {
      if (node === target || node.contains(target)) {
        return true;
      }
    }
    for (var _node of removedNodes) {
      if (_node === target || _node.contains(target)) {
        return true;
      }
    }
  });
  if (!parentMutation || parentMutation === mutation) {
    return false;
  }
  // Target add/remove is tracked. Track the mutation if we track the parent mutation.
  return isTrackedMutation(editor, parentMutation, batch);
};
/**
 * Retrieves the deepest active element in the DOM, considering nested shadow DOMs.
 */
var getActiveElement = () => {
  var activeElement = document.activeElement;
  while ((_activeElement = activeElement) !== null && _activeElement !== void 0 && _activeElement.shadowRoot && (_activeElement$shadow = activeElement.shadowRoot) !== null && _activeElement$shadow !== void 0 && _activeElement$shadow.activeElement) {
    var _activeElement, _activeElement$shadow, _activeElement2;
    activeElement = (_activeElement2 = activeElement) === null || _activeElement2 === void 0 || (_activeElement2 = _activeElement2.shadowRoot) === null || _activeElement2 === void 0 ? void 0 : _activeElement2.activeElement;
  }
  return activeElement;
};

/**
 * An auto-incrementing identifier for keys.
 */
var n = 0;
/**
 * A class that keeps track of a key string. We use a full class here because we
 * want to be able to use them as keys in `WeakMap` objects.
 */
class Key {
  constructor() {
    _defineProperty(this, "id", void 0);
    this.id = "".concat(n++);
  }
}

// eslint-disable-next-line no-redeclare
var ReactEditor = {
  androidPendingDiffs: editor => EDITOR_TO_PENDING_DIFFS.get(editor),
  androidScheduleFlush: editor => {
    var _EDITOR_TO_SCHEDULE_F;
    (_EDITOR_TO_SCHEDULE_F = EDITOR_TO_SCHEDULE_FLUSH.get(editor)) === null || _EDITOR_TO_SCHEDULE_F === void 0 || _EDITOR_TO_SCHEDULE_F();
  },
  blur: editor => {
    var el = ReactEditor.toDOMNode(editor, editor);
    var root = ReactEditor.findDocumentOrShadowRoot(editor);
    IS_FOCUSED.set(editor, false);
    if (root.activeElement === el) {
      el.blur();
    }
  },
  deselect: editor => {
    var {
      selection
    } = editor;
    var root = ReactEditor.findDocumentOrShadowRoot(editor);
    var domSelection = getSelection(root);
    if (domSelection && domSelection.rangeCount > 0) {
      domSelection.removeAllRanges();
    }
    if (selection) {
      Transforms.deselect(editor);
    }
  },
  findDocumentOrShadowRoot: editor => {
    var el = ReactEditor.toDOMNode(editor, editor);
    var root = el.getRootNode();
    if (root instanceof Document || root instanceof ShadowRoot) {
      return root;
    }
    return el.ownerDocument;
  },
  findEventRange: (editor, event) => {
    if ('nativeEvent' in event) {
      event = event.nativeEvent;
    }
    var {
      clientX: x,
      clientY: y,
      target
    } = event;
    if (x == null || y == null) {
      throw new Error("Cannot resolve a Slate range from a DOM event: ".concat(event));
    }
    var node = ReactEditor.toSlateNode(editor, event.target);
    var path = ReactEditor.findPath(editor, node);
    // If the drop target is inside a void node, move it into either the
    // next or previous node, depending on which side the `x` and `y`
    // coordinates are closest to.
    if (Element$2.isElement(node) && Editor.isVoid(editor, node)) {
      var rect = target.getBoundingClientRect();
      var isPrev = editor.isInline(node) ? x - rect.left < rect.left + rect.width - x : y - rect.top < rect.top + rect.height - y;
      var edge = Editor.point(editor, path, {
        edge: isPrev ? 'start' : 'end'
      });
      var point = isPrev ? Editor.before(editor, edge) : Editor.after(editor, edge);
      if (point) {
        var _range = Editor.range(editor, point);
        return _range;
      }
    }
    // Else resolve a range from the caret position where the drop occured.
    var domRange;
    var {
      document
    } = ReactEditor.getWindow(editor);
    // COMPAT: In Firefox, `caretRangeFromPoint` doesn't exist. (2016/07/25)
    if (document.caretRangeFromPoint) {
      domRange = document.caretRangeFromPoint(x, y);
    } else {
      var position = document.caretPositionFromPoint(x, y);
      if (position) {
        domRange = document.createRange();
        domRange.setStart(position.offsetNode, position.offset);
        domRange.setEnd(position.offsetNode, position.offset);
      }
    }
    if (!domRange) {
      throw new Error("Cannot resolve a Slate range from a DOM event: ".concat(event));
    }
    // Resolve a Slate range from the DOM range.
    var range = ReactEditor.toSlateRange(editor, domRange, {
      exactMatch: false,
      suppressThrow: false
    });
    return range;
  },
  findKey: (editor, node) => {
    var key = NODE_TO_KEY.get(node);
    if (!key) {
      key = new Key();
      NODE_TO_KEY.set(node, key);
    }
    return key;
  },
  findPath: (editor, node) => {
    var path = [];
    var child = node;
    while (true) {
      var parent = NODE_TO_PARENT.get(child);
      if (parent == null) {
        if (Editor.isEditor(child)) {
          return path;
        } else {
          break;
        }
      }
      var i = NODE_TO_INDEX.get(child);
      if (i == null) {
        break;
      }
      path.unshift(i);
      child = parent;
    }
    throw new Error("Unable to find the path for Slate node: ".concat(Scrubber.stringify(node)));
  },
  focus: function focus(editor) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      retries: 5
    };
    // Return if already focused
    if (IS_FOCUSED.get(editor)) {
      return;
    }
    // Retry setting focus if the editor has pending operations.
    // The DOM (selection) is unstable while changes are applied.
    // Retry until retries are exhausted or editor is focused.
    if (options.retries <= 0) {
      throw new Error('Could not set focus, editor seems stuck with pending operations');
    }
    if (editor.operations.length > 0) {
      setTimeout(() => {
        ReactEditor.focus(editor, {
          retries: options.retries - 1
        });
      }, 10);
      return;
    }
    var el = ReactEditor.toDOMNode(editor, editor);
    var root = ReactEditor.findDocumentOrShadowRoot(editor);
    if (root.activeElement !== el) {
      // Ensure that the DOM selection state is set to the editor's selection
      if (editor.selection && root instanceof Document) {
        var domSelection = getSelection(root);
        var domRange = ReactEditor.toDOMRange(editor, editor.selection);
        domSelection === null || domSelection === void 0 || domSelection.removeAllRanges();
        domSelection === null || domSelection === void 0 || domSelection.addRange(domRange);
      }
      // Create a new selection in the top of the document if missing
      if (!editor.selection) {
        Transforms.select(editor, Editor.start(editor, []));
      }
      // IS_FOCUSED should be set before calling el.focus() to ensure that
      // FocusedContext is updated to the correct value
      IS_FOCUSED.set(editor, true);
      el.focus({
        preventScroll: true
      });
    }
  },
  getWindow: editor => {
    var window = EDITOR_TO_WINDOW.get(editor);
    if (!window) {
      throw new Error('Unable to find a host window element for this editor');
    }
    return window;
  },
  hasDOMNode: function hasDOMNode(editor, target) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var {
      editable = false
    } = options;
    var editorEl = ReactEditor.toDOMNode(editor, editor);
    var targetEl;
    // COMPAT: In Firefox, reading `target.nodeType` will throw an error if
    // target is originating from an internal "restricted" element (e.g. a
    // stepper arrow on a number input). (2018/05/04)
    // https://github.com/ianstormtaylor/slate/issues/1819
    try {
      targetEl = isDOMElement(target) ? target : target.parentElement;
    } catch (err) {
      if (err instanceof Error && !err.message.includes('Permission denied to access property "nodeType"')) {
        throw err;
      }
    }
    if (!targetEl) {
      return false;
    }
    return targetEl.closest("[data-slate-editor]") === editorEl && (!editable || targetEl.isContentEditable ? true : typeof targetEl.isContentEditable === 'boolean' &&
    // isContentEditable exists only on HTMLElement, and on other nodes it will be undefined
    // this is the core logic that lets you know you got the right editor.selection instead of null when editor is contenteditable="false"(readOnly)
    targetEl.closest('[contenteditable="false"]') === editorEl || !!targetEl.getAttribute('data-slate-zero-width'));
  },
  hasEditableTarget: (editor, target) => isDOMNode(target) && ReactEditor.hasDOMNode(editor, target, {
    editable: true
  }),
  hasRange: (editor, range) => {
    var {
      anchor,
      focus
    } = range;
    return Editor.hasPath(editor, anchor.path) && Editor.hasPath(editor, focus.path);
  },
  hasSelectableTarget: (editor, target) => ReactEditor.hasEditableTarget(editor, target) || ReactEditor.isTargetInsideNonReadonlyVoid(editor, target),
  hasTarget: (editor, target) => isDOMNode(target) && ReactEditor.hasDOMNode(editor, target),
  insertData: (editor, data) => {
    editor.insertData(data);
  },
  insertFragmentData: (editor, data) => editor.insertFragmentData(data),
  insertTextData: (editor, data) => editor.insertTextData(data),
  isComposing: editor => {
    return !!IS_COMPOSING.get(editor);
  },
  isFocused: editor => !!IS_FOCUSED.get(editor),
  isReadOnly: editor => !!IS_READ_ONLY.get(editor),
  isTargetInsideNonReadonlyVoid: (editor, target) => {
    if (IS_READ_ONLY.get(editor)) return false;
    var slateNode = ReactEditor.hasTarget(editor, target) && ReactEditor.toSlateNode(editor, target);
    return Element$2.isElement(slateNode) && Editor.isVoid(editor, slateNode);
  },
  setFragmentData: (editor, data, originEvent) => editor.setFragmentData(data, originEvent),
  toDOMNode: (editor, node) => {
    var KEY_TO_ELEMENT = EDITOR_TO_KEY_TO_ELEMENT.get(editor);
    var domNode = Editor.isEditor(node) ? EDITOR_TO_ELEMENT.get(editor) : KEY_TO_ELEMENT === null || KEY_TO_ELEMENT === void 0 ? void 0 : KEY_TO_ELEMENT.get(ReactEditor.findKey(editor, node));
    if (!domNode) {
      throw new Error("Cannot resolve a DOM node from Slate node: ".concat(Scrubber.stringify(node)));
    }
    return domNode;
  },
  toDOMPoint: (editor, point) => {
    var [node] = Editor.node(editor, point.path);
    var el = ReactEditor.toDOMNode(editor, node);
    var domPoint;
    // If we're inside a void node, force the offset to 0, otherwise the zero
    // width spacing character will result in an incorrect offset of 1
    if (Editor.void(editor, {
      at: point
    })) {
      point = {
        path: point.path,
        offset: 0
      };
    }
    // For each leaf, we need to isolate its content, which means filtering
    // to its direct text and zero-width spans. (We have to filter out any
    // other siblings that may have been rendered alongside them.)
    var selector = "[data-slate-string], [data-slate-zero-width]";
    var texts = Array.from(el.querySelectorAll(selector));
    var start = 0;
    for (var i = 0; i < texts.length; i++) {
      var text = texts[i];
      var domNode = text.childNodes[0];
      if (domNode == null || domNode.textContent == null) {
        continue;
      }
      var {
        length
      } = domNode.textContent;
      var attr = text.getAttribute('data-slate-length');
      var trueLength = attr == null ? length : parseInt(attr, 10);
      var end = start + trueLength;
      // Prefer putting the selection inside the mark placeholder to ensure
      // composed text is displayed with the correct marks.
      var nextText = texts[i + 1];
      if (point.offset === end && nextText !== null && nextText !== void 0 && nextText.hasAttribute('data-slate-mark-placeholder')) {
        var _nextText$textContent;
        var domText = nextText.childNodes[0];
        domPoint = [
        // COMPAT: If we don't explicity set the dom point to be on the actual
        // dom text element, chrome will put the selection behind the actual dom
        // text element, causing domRange.getBoundingClientRect() calls on a collapsed
        // selection to return incorrect zero values (https://bugs.chromium.org/p/chromium/issues/detail?id=435438)
        // which will cause issues when scrolling to it.
        domText instanceof DOMText ? domText : nextText, (_nextText$textContent = nextText.textContent) !== null && _nextText$textContent !== void 0 && _nextText$textContent.startsWith('\uFEFF') ? 1 : 0];
        break;
      }
      if (point.offset <= end) {
        var offset = Math.min(length, Math.max(0, point.offset - start));
        domPoint = [domNode, offset];
        break;
      }
      start = end;
    }
    if (!domPoint) {
      throw new Error("Cannot resolve a DOM point from Slate point: ".concat(Scrubber.stringify(point)));
    }
    return domPoint;
  },
  toDOMRange: (editor, range) => {
    var {
      anchor,
      focus
    } = range;
    var isBackward = Range.isBackward(range);
    var domAnchor = ReactEditor.toDOMPoint(editor, anchor);
    var domFocus = Range.isCollapsed(range) ? domAnchor : ReactEditor.toDOMPoint(editor, focus);
    var window = ReactEditor.getWindow(editor);
    var domRange = window.document.createRange();
    var [startNode, startOffset] = isBackward ? domFocus : domAnchor;
    var [endNode, endOffset] = isBackward ? domAnchor : domFocus;
    // A slate Point at zero-width Leaf always has an offset of 0 but a native DOM selection at
    // zero-width node has an offset of 1 so we have to check if we are in a zero-width node and
    // adjust the offset accordingly.
    var startEl = isDOMElement(startNode) ? startNode : startNode.parentElement;
    var isStartAtZeroWidth = !!startEl.getAttribute('data-slate-zero-width');
    var endEl = isDOMElement(endNode) ? endNode : endNode.parentElement;
    var isEndAtZeroWidth = !!endEl.getAttribute('data-slate-zero-width');
    domRange.setStart(startNode, isStartAtZeroWidth ? 1 : startOffset);
    domRange.setEnd(endNode, isEndAtZeroWidth ? 1 : endOffset);
    return domRange;
  },
  toSlateNode: (editor, domNode) => {
    var domEl = isDOMElement(domNode) ? domNode : domNode.parentElement;
    if (domEl && !domEl.hasAttribute('data-slate-node')) {
      domEl = domEl.closest("[data-slate-node]");
    }
    var node = domEl ? ELEMENT_TO_NODE.get(domEl) : null;
    if (!node) {
      throw new Error("Cannot resolve a Slate node from DOM node: ".concat(domEl));
    }
    return node;
  },
  toSlatePoint: (editor, domPoint, options) => {
    var {
      exactMatch,
      suppressThrow
    } = options;
    var [nearestNode, nearestOffset] = exactMatch ? domPoint : normalizeDOMPoint(domPoint);
    var parentNode = nearestNode.parentNode;
    var textNode = null;
    var offset = 0;
    if (parentNode) {
      var _domNode$textContent, _domNode$textContent2;
      var editorEl = ReactEditor.toDOMNode(editor, editor);
      var potentialVoidNode = parentNode.closest('[data-slate-void="true"]');
      // Need to ensure that the closest void node is actually a void node
      // within this editor, and not a void node within some parent editor. This can happen
      // if this editor is within a void node of another editor ("nested editors", like in
      // the "Editable Voids" example on the docs site).
      var voidNode = potentialVoidNode && editorEl.contains(potentialVoidNode) ? potentialVoidNode : null;
      var leafNode = parentNode.closest('[data-slate-leaf]');
      var domNode = null;
      // Calculate how far into the text node the `nearestNode` is, so that we
      // can determine what the offset relative to the text node is.
      if (leafNode) {
        textNode = leafNode.closest('[data-slate-node="text"]');
        if (textNode) {
          var window = ReactEditor.getWindow(editor);
          var range = window.document.createRange();
          range.setStart(textNode, 0);
          range.setEnd(nearestNode, nearestOffset);
          var contents = range.cloneContents();
          var removals = [...Array.prototype.slice.call(contents.querySelectorAll('[data-slate-zero-width]')), ...Array.prototype.slice.call(contents.querySelectorAll('[contenteditable=false]'))];
          removals.forEach(el => {
            // COMPAT: While composing at the start of a text node, some keyboards put
            // the text content inside the zero width space.
            if (IS_ANDROID && !exactMatch && el.hasAttribute('data-slate-zero-width') && el.textContent.length > 0 && el.textContext !== '\uFEFF') {
              if (el.textContent.startsWith('\uFEFF')) {
                el.textContent = el.textContent.slice(1);
              }
              return;
            }
            el.parentNode.removeChild(el);
          });
          // COMPAT: Edge has a bug where Range.prototype.toString() will
          // convert \n into \r\n. The bug causes a loop when slate-react
          // attempts to reposition its cursor to match the native position. Use
          // textContent.length instead.
          // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/10291116/
          offset = contents.textContent.length;
          domNode = textNode;
        }
      } else if (voidNode) {
        // For void nodes, the element with the offset key will be a cousin, not an
        // ancestor, so find it by going down from the nearest void parent and taking the
        // first one that isn't inside a nested editor.
        var leafNodes = voidNode.querySelectorAll('[data-slate-leaf]');
        for (var index = 0; index < leafNodes.length; index++) {
          var current = leafNodes[index];
          if (ReactEditor.hasDOMNode(editor, current)) {
            leafNode = current;
            break;
          }
        }
        // COMPAT: In read-only editors the leaf is not rendered.
        if (!leafNode) {
          offset = 1;
        } else {
          textNode = leafNode.closest('[data-slate-node="text"]');
          domNode = leafNode;
          offset = domNode.textContent.length;
          domNode.querySelectorAll('[data-slate-zero-width]').forEach(el => {
            offset -= el.textContent.length;
          });
        }
      }
      if (domNode && offset === domNode.textContent.length &&
      // COMPAT: Android IMEs might remove the zero width space while composing,
      // and we don't add it for line-breaks.
      IS_ANDROID && domNode.getAttribute('data-slate-zero-width') === 'z' && (_domNode$textContent = domNode.textContent) !== null && _domNode$textContent !== void 0 && _domNode$textContent.startsWith('\uFEFF') && (
      // COMPAT: If the parent node is a Slate zero-width space, editor is
      // because the text node should have no characters. However, during IME
      // composition the ASCII characters will be prepended to the zero-width
      // space, so subtract 1 from the offset to account for the zero-width
      // space character.
      parentNode.hasAttribute('data-slate-zero-width') ||
      // COMPAT: In Firefox, `range.cloneContents()` returns an extra trailing '\n'
      // when the document ends with a new-line character. This results in the offset
      // length being off by one, so we need to subtract one to account for this.
      IS_FIREFOX && (_domNode$textContent2 = domNode.textContent) !== null && _domNode$textContent2 !== void 0 && _domNode$textContent2.endsWith('\n\n'))) {
        offset--;
      }
    }
    if (IS_ANDROID && !textNode && !exactMatch) {
      var node = parentNode.hasAttribute('data-slate-node') ? parentNode : parentNode.closest('[data-slate-node]');
      if (node && ReactEditor.hasDOMNode(editor, node, {
        editable: true
      })) {
        var _slateNode = ReactEditor.toSlateNode(editor, node);
        var {
          path: _path,
          offset: _offset
        } = Editor.start(editor, ReactEditor.findPath(editor, _slateNode));
        if (!node.querySelector('[data-slate-leaf]')) {
          _offset = nearestOffset;
        }
        return {
          path: _path,
          offset: _offset
        };
      }
    }
    if (!textNode) {
      if (suppressThrow) {
        return null;
      }
      throw new Error("Cannot resolve a Slate point from DOM point: ".concat(domPoint));
    }
    // COMPAT: If someone is clicking from one Slate editor into another,
    // the select event fires twice, once for the old editor's `element`
    // first, and then afterwards for the correct `element`. (2017/03/03)
    var slateNode = ReactEditor.toSlateNode(editor, textNode);
    var path = ReactEditor.findPath(editor, slateNode);
    return {
      path,
      offset
    };
  },
  toSlateRange: (editor, domRange, options) => {
    var _focusNode$textConten;
    var {
      exactMatch,
      suppressThrow
    } = options;
    var el = isDOMSelection(domRange) ? domRange.anchorNode : domRange.startContainer;
    var anchorNode;
    var anchorOffset;
    var focusNode;
    var focusOffset;
    var isCollapsed;
    if (el) {
      if (isDOMSelection(domRange)) {
        // COMPAT: In firefox the normal seletion way does not work
        // (https://github.com/ianstormtaylor/slate/pull/5486#issue-1820720223)
        if (IS_FIREFOX && domRange.rangeCount > 1) {
          focusNode = domRange.focusNode; // Focus node works fine
          var firstRange = domRange.getRangeAt(0);
          var lastRange = domRange.getRangeAt(domRange.rangeCount - 1);
          // Here we are in the contenteditable mode of a table in firefox
          if (focusNode instanceof HTMLTableRowElement && firstRange.startContainer instanceof HTMLTableRowElement && lastRange.startContainer instanceof HTMLTableRowElement) {
            // HTMLElement, becouse Element is a slate element
            function getLastChildren(element) {
              if (element.childElementCount > 0) {
                return getLastChildren(element.children[0]);
              } else {
                return element;
              }
            }
            var firstNodeRow = firstRange.startContainer;
            var lastNodeRow = lastRange.startContainer;
            // This should never fail as "The HTMLElement interface represents any HTML element."
            var firstNode = getLastChildren(firstNodeRow.children[firstRange.startOffset]);
            var lastNode = getLastChildren(lastNodeRow.children[lastRange.startOffset]);
            // Zero, as we allways take the right one as the anchor point
            focusOffset = 0;
            if (lastNode.childNodes.length > 0) {
              anchorNode = lastNode.childNodes[0];
            } else {
              anchorNode = lastNode;
            }
            if (firstNode.childNodes.length > 0) {
              focusNode = firstNode.childNodes[0];
            } else {
              focusNode = firstNode;
            }
            if (lastNode instanceof HTMLElement) {
              anchorOffset = lastNode.innerHTML.length;
            } else {
              // Fallback option
              anchorOffset = 0;
            }
          } else {
            // This is the read only mode of a firefox table
            // Right to left
            if (firstRange.startContainer === focusNode) {
              anchorNode = lastRange.endContainer;
              anchorOffset = lastRange.endOffset;
              focusOffset = firstRange.startOffset;
            } else {
              // Left to right
              anchorNode = firstRange.startContainer;
              anchorOffset = firstRange.endOffset;
              focusOffset = lastRange.startOffset;
            }
          }
        } else {
          anchorNode = domRange.anchorNode;
          anchorOffset = domRange.anchorOffset;
          focusNode = domRange.focusNode;
          focusOffset = domRange.focusOffset;
        }
        // COMPAT: There's a bug in chrome that always returns `true` for
        // `isCollapsed` for a Selection that comes from a ShadowRoot.
        // (2020/08/08)
        // https://bugs.chromium.org/p/chromium/issues/detail?id=447523
        // IsCollapsed might not work in firefox, but this will
        if (IS_CHROME && hasShadowRoot(anchorNode) || IS_FIREFOX) {
          isCollapsed = domRange.anchorNode === domRange.focusNode && domRange.anchorOffset === domRange.focusOffset;
        } else {
          isCollapsed = domRange.isCollapsed;
        }
      } else {
        anchorNode = domRange.startContainer;
        anchorOffset = domRange.startOffset;
        focusNode = domRange.endContainer;
        focusOffset = domRange.endOffset;
        isCollapsed = domRange.collapsed;
      }
    }
    if (anchorNode == null || focusNode == null || anchorOffset == null || focusOffset == null) {
      throw new Error("Cannot resolve a Slate range from DOM range: ".concat(domRange));
    }
    // COMPAT: Firefox sometimes includes an extra \n (rendered by TextString
    // when isTrailing is true) in the focusOffset, resulting in an invalid
    // Slate point. (2023/11/01)
    if (IS_FIREFOX && (_focusNode$textConten = focusNode.textContent) !== null && _focusNode$textConten !== void 0 && _focusNode$textConten.endsWith('\n\n') && focusOffset === focusNode.textContent.length) {
      focusOffset--;
    }
    // COMPAT: Triple-clicking a word in chrome will sometimes place the focus
    // inside a `contenteditable="false"` DOM node following the word, which
    // will cause `toSlatePoint` to throw an error. (2023/03/07)
    if ('getAttribute' in focusNode && focusNode.getAttribute('contenteditable') === 'false' && focusNode.getAttribute('data-slate-void') !== 'true') {
      var _anchorNode$textConte;
      focusNode = anchorNode;
      focusOffset = ((_anchorNode$textConte = anchorNode.textContent) === null || _anchorNode$textConte === void 0 ? void 0 : _anchorNode$textConte.length) || 0;
    }
    var anchor = ReactEditor.toSlatePoint(editor, [anchorNode, anchorOffset], {
      exactMatch,
      suppressThrow
    });
    if (!anchor) {
      return null;
    }
    var focus = isCollapsed ? anchor : ReactEditor.toSlatePoint(editor, [focusNode, focusOffset], {
      exactMatch,
      suppressThrow
    });
    if (!focus) {
      return null;
    }
    var range = {
      anchor: anchor,
      focus: focus
    };
    // if the selection is a hanging range that ends in a void
    // and the DOM focus is an Element
    // (meaning that the selection ends before the element)
    // unhang the range to avoid mistakenly including the void
    if (Range.isExpanded(range) && Range.isForward(range) && isDOMElement(focusNode) && Editor.void(editor, {
      at: range.focus,
      mode: 'highest'
    })) {
      range = Editor.unhangRange(editor, range, {
        voids: true
      });
    }
    return range;
  }
};

/**
 * Check whether a text diff was applied in a way we can perform the pending action on /
 * recover the pending selection.
 */
function verifyDiffState(editor, textDiff) {
  var {
    path,
    diff
  } = textDiff;
  if (!Editor.hasPath(editor, path)) {
    return false;
  }
  var node = Node.get(editor, path);
  if (!Text$1.isText(node)) {
    return false;
  }
  if (diff.start !== node.text.length || diff.text.length === 0) {
    return node.text.slice(diff.start, diff.start + diff.text.length) === diff.text;
  }
  var nextPath = Path.next(path);
  if (!Editor.hasPath(editor, nextPath)) {
    return false;
  }
  var nextNode = Node.get(editor, nextPath);
  return Text$1.isText(nextNode) && nextNode.text.startsWith(diff.text);
}
function applyStringDiff(text) {
  for (var _len = arguments.length, diffs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    diffs[_key - 1] = arguments[_key];
  }
  return diffs.reduce((text, diff) => text.slice(0, diff.start) + diff.text + text.slice(diff.end), text);
}
function longestCommonPrefixLength(str, another) {
  var length = Math.min(str.length, another.length);
  for (var i = 0; i < length; i++) {
    if (str.charAt(i) !== another.charAt(i)) {
      return i;
    }
  }
  return length;
}
function longestCommonSuffixLength(str, another, max) {
  var length = Math.min(str.length, another.length, max);
  for (var i = 0; i < length; i++) {
    if (str.charAt(str.length - i - 1) !== another.charAt(another.length - i - 1)) {
      return i;
    }
  }
  return length;
}
/**
 * Remove redundant changes from the diff so that it spans the minimal possible range
 */
function normalizeStringDiff(targetText, diff) {
  var {
    start,
    end,
    text
  } = diff;
  var removedText = targetText.slice(start, end);
  var prefixLength = longestCommonPrefixLength(removedText, text);
  var max = Math.min(removedText.length - prefixLength, text.length - prefixLength);
  var suffixLength = longestCommonSuffixLength(removedText, text, max);
  var normalized = {
    start: start + prefixLength,
    end: end - suffixLength,
    text: text.slice(prefixLength, text.length - suffixLength)
  };
  if (normalized.start === normalized.end && normalized.text.length === 0) {
    return null;
  }
  return normalized;
}
/**
 * Return a string diff that is equivalent to applying b after a spanning the range of
 * both changes
 */
function mergeStringDiffs(targetText, a, b) {
  var start = Math.min(a.start, b.start);
  var overlap = Math.max(0, Math.min(a.start + a.text.length, b.end) - b.start);
  var applied = applyStringDiff(targetText, a, b);
  var sliceEnd = Math.max(b.start + b.text.length, a.start + a.text.length + (a.start + a.text.length > b.start ? b.text.length : 0) - overlap);
  var text = applied.slice(start, sliceEnd);
  var end = Math.max(a.end, b.end - a.text.length + (a.end - a.start));
  return normalizeStringDiff(targetText, {
    start,
    end,
    text
  });
}
/**
 * Get the slate range the text diff spans.
 */
function targetRange(textDiff) {
  var {
    path,
    diff
  } = textDiff;
  return {
    anchor: {
      path,
      offset: diff.start
    },
    focus: {
      path,
      offset: diff.end
    }
  };
}
/**
 * Normalize a 'pending point' a.k.a a point based on the dom state before applying
 * the pending diffs. Since the pending diffs might have been inserted with different
 * marks we have to 'walk' the offset from the starting position to ensure we still
 * have a valid point inside the document
 */
function normalizePoint(editor, point) {
  var {
    path,
    offset
  } = point;
  if (!Editor.hasPath(editor, path)) {
    return null;
  }
  var leaf = Node.get(editor, path);
  if (!Text$1.isText(leaf)) {
    return null;
  }
  var parentBlock = Editor.above(editor, {
    match: n => Element$2.isElement(n) && Editor.isBlock(editor, n),
    at: path
  });
  if (!parentBlock) {
    return null;
  }
  while (offset > leaf.text.length) {
    var entry = Editor.next(editor, {
      at: path,
      match: Text$1.isText
    });
    if (!entry || !Path.isDescendant(entry[1], parentBlock[1])) {
      return null;
    }
    offset -= leaf.text.length;
    leaf = entry[0];
    path = entry[1];
  }
  return {
    path,
    offset
  };
}
/**
 * Normalize a 'pending selection' to ensure it's valid in the current document state.
 */
function normalizeRange(editor, range) {
  var anchor = normalizePoint(editor, range.anchor);
  if (!anchor) {
    return null;
  }
  if (Range.isCollapsed(range)) {
    return {
      anchor,
      focus: anchor
    };
  }
  var focus = normalizePoint(editor, range.focus);
  if (!focus) {
    return null;
  }
  return {
    anchor,
    focus
  };
}
function transformPendingPoint(editor, point, op) {
  var pendingDiffs = EDITOR_TO_PENDING_DIFFS.get(editor);
  var textDiff = pendingDiffs === null || pendingDiffs === void 0 ? void 0 : pendingDiffs.find(_ref => {
    var {
      path
    } = _ref;
    return Path.equals(path, point.path);
  });
  if (!textDiff || point.offset <= textDiff.diff.start) {
    return Point.transform(point, op, {
      affinity: 'backward'
    });
  }
  var {
    diff
  } = textDiff;
  // Point references location inside the diff => transform the point based on the location
  // the diff will be applied to and add the offset inside the diff.
  if (point.offset <= diff.start + diff.text.length) {
    var _anchor = {
      path: point.path,
      offset: diff.start
    };
    var _transformed = Point.transform(_anchor, op, {
      affinity: 'backward'
    });
    if (!_transformed) {
      return null;
    }
    return {
      path: _transformed.path,
      offset: _transformed.offset + point.offset - diff.start
    };
  }
  // Point references location after the diff
  var anchor = {
    path: point.path,
    offset: point.offset - diff.text.length + diff.end - diff.start
  };
  var transformed = Point.transform(anchor, op, {
    affinity: 'backward'
  });
  if (!transformed) {
    return null;
  }
  if (op.type === 'split_node' && Path.equals(op.path, point.path) && anchor.offset < op.position && diff.start < op.position) {
    return transformed;
  }
  return {
    path: transformed.path,
    offset: transformed.offset + diff.text.length - diff.end + diff.start
  };
}
function transformPendingRange(editor, range, op) {
  var anchor = transformPendingPoint(editor, range.anchor, op);
  if (!anchor) {
    return null;
  }
  if (Range.isCollapsed(range)) {
    return {
      anchor,
      focus: anchor
    };
  }
  var focus = transformPendingPoint(editor, range.focus, op);
  if (!focus) {
    return null;
  }
  return {
    anchor,
    focus
  };
}
function transformTextDiff(textDiff, op) {
  var {
    path,
    diff,
    id
  } = textDiff;
  switch (op.type) {
    case 'insert_text':
      {
        if (!Path.equals(op.path, path) || op.offset >= diff.end) {
          return textDiff;
        }
        if (op.offset <= diff.start) {
          return {
            diff: {
              start: op.text.length + diff.start,
              end: op.text.length + diff.end,
              text: diff.text
            },
            id,
            path
          };
        }
        return {
          diff: {
            start: diff.start,
            end: diff.end + op.text.length,
            text: diff.text
          },
          id,
          path
        };
      }
    case 'remove_text':
      {
        if (!Path.equals(op.path, path) || op.offset >= diff.end) {
          return textDiff;
        }
        if (op.offset + op.text.length <= diff.start) {
          return {
            diff: {
              start: diff.start - op.text.length,
              end: diff.end - op.text.length,
              text: diff.text
            },
            id,
            path
          };
        }
        return {
          diff: {
            start: diff.start,
            end: diff.end - op.text.length,
            text: diff.text
          },
          id,
          path
        };
      }
    case 'split_node':
      {
        if (!Path.equals(op.path, path) || op.position >= diff.end) {
          return {
            diff,
            id,
            path: Path.transform(path, op, {
              affinity: 'backward'
            })
          };
        }
        if (op.position > diff.start) {
          return {
            diff: {
              start: diff.start,
              end: Math.min(op.position, diff.end),
              text: diff.text
            },
            id,
            path
          };
        }
        return {
          diff: {
            start: diff.start - op.position,
            end: diff.end - op.position,
            text: diff.text
          },
          id,
          path: Path.transform(path, op, {
            affinity: 'forward'
          })
        };
      }
    case 'merge_node':
      {
        if (!Path.equals(op.path, path)) {
          return {
            diff,
            id,
            path: Path.transform(path, op)
          };
        }
        return {
          diff: {
            start: diff.start + op.position,
            end: diff.end + op.position,
            text: diff.text
          },
          id,
          path: Path.transform(path, op)
        };
      }
  }
  var newPath = Path.transform(path, op);
  if (!newPath) {
    return null;
  }
  return {
    diff,
    path: newPath,
    id
  };
}

function ownKeys$6(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$6(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$6(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$6(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
// https://github.com/facebook/draft-js/blob/main/src/component/handlers/composition/DraftEditorCompositionHandler.js#L41
// When using keyboard English association function, conpositionEnd triggered too fast, resulting in after `insertText` still maintain association state.
var RESOLVE_DELAY = 25;
// Time with no user interaction before the current user action is considered as done.
var FLUSH_DELAY = 200;
// Replace with `const debug = console.log` to debug
var debug = function debug() {};
// Type guard to check if a value is a DataTransfer
var isDataTransfer = value => (value === null || value === void 0 ? void 0 : value.constructor.name) === 'DataTransfer';
function createAndroidInputManager(_ref) {
  var {
    editor,
    scheduleOnDOMSelectionChange,
    onDOMSelectionChange
  } = _ref;
  var flushing = false;
  var compositionEndTimeoutId = null;
  var flushTimeoutId = null;
  var actionTimeoutId = null;
  var idCounter = 0;
  var insertPositionHint = false;
  var applyPendingSelection = () => {
    var pendingSelection = EDITOR_TO_PENDING_SELECTION.get(editor);
    EDITOR_TO_PENDING_SELECTION.delete(editor);
    if (pendingSelection) {
      var {
        selection
      } = editor;
      var normalized = normalizeRange(editor, pendingSelection);
      if (normalized && (!selection || !Range.equals(normalized, selection))) {
        Transforms.select(editor, normalized);
      }
    }
  };
  var performAction = () => {
    var action = EDITOR_TO_PENDING_ACTION.get(editor);
    EDITOR_TO_PENDING_ACTION.delete(editor);
    if (!action) {
      return;
    }
    if (action.at) {
      var target = Point.isPoint(action.at) ? normalizePoint(editor, action.at) : normalizeRange(editor, action.at);
      if (!target) {
        return;
      }
      var _targetRange = Editor.range(editor, target);
      if (!editor.selection || !Range.equals(editor.selection, _targetRange)) {
        Transforms.select(editor, target);
      }
    }
    action.run();
  };
  var flush = () => {
    if (flushTimeoutId) {
      clearTimeout(flushTimeoutId);
      flushTimeoutId = null;
    }
    if (actionTimeoutId) {
      clearTimeout(actionTimeoutId);
      actionTimeoutId = null;
    }
    if (!hasPendingDiffs() && !hasPendingAction()) {
      applyPendingSelection();
      return;
    }
    if (!flushing) {
      flushing = true;
      setTimeout(() => flushing = false);
    }
    if (hasPendingAction()) {
      flushing = 'action';
    }
    var selectionRef = editor.selection && Editor.rangeRef(editor, editor.selection, {
      affinity: 'forward'
    });
    EDITOR_TO_USER_MARKS.set(editor, editor.marks);
    debug('flush', EDITOR_TO_PENDING_ACTION.get(editor), EDITOR_TO_PENDING_DIFFS.get(editor));
    var scheduleSelectionChange = hasPendingDiffs();
    var diff;
    while (diff = (_EDITOR_TO_PENDING_DI = EDITOR_TO_PENDING_DIFFS.get(editor)) === null || _EDITOR_TO_PENDING_DI === void 0 ? void 0 : _EDITOR_TO_PENDING_DI[0]) {
      var _EDITOR_TO_PENDING_DI, _EDITOR_TO_PENDING_DI2;
      var pendingMarks = EDITOR_TO_PENDING_INSERTION_MARKS.get(editor);
      if (pendingMarks !== undefined) {
        EDITOR_TO_PENDING_INSERTION_MARKS.delete(editor);
        editor.marks = pendingMarks;
      }
      if (pendingMarks && insertPositionHint === false) {
        insertPositionHint = null;
      }
      var range = targetRange(diff);
      if (!editor.selection || !Range.equals(editor.selection, range)) {
        Transforms.select(editor, range);
      }
      if (diff.diff.text) {
        Editor.insertText(editor, diff.diff.text);
      } else {
        Editor.deleteFragment(editor);
      }
      // Remove diff only after we have applied it to account for it when transforming
      // pending ranges.
      EDITOR_TO_PENDING_DIFFS.set(editor, (_EDITOR_TO_PENDING_DI2 = EDITOR_TO_PENDING_DIFFS.get(editor)) === null || _EDITOR_TO_PENDING_DI2 === void 0 ? void 0 : _EDITOR_TO_PENDING_DI2.filter(_ref2 => {
        var {
          id
        } = _ref2;
        return id !== diff.id;
      }));
      if (!verifyDiffState(editor, diff)) {
        scheduleSelectionChange = false;
        EDITOR_TO_PENDING_ACTION.delete(editor);
        EDITOR_TO_USER_MARKS.delete(editor);
        flushing = 'action';
        // Ensure we don't restore the pending user (dom) selection
        // since the document and dom state do not match.
        EDITOR_TO_PENDING_SELECTION.delete(editor);
        scheduleOnDOMSelectionChange.cancel();
        onDOMSelectionChange.cancel();
        selectionRef === null || selectionRef === void 0 || selectionRef.unref();
      }
    }
    var selection = selectionRef === null || selectionRef === void 0 ? void 0 : selectionRef.unref();
    if (selection && !EDITOR_TO_PENDING_SELECTION.get(editor) && (!editor.selection || !Range.equals(selection, editor.selection))) {
      Transforms.select(editor, selection);
    }
    if (hasPendingAction()) {
      performAction();
      return;
    }
    // COMPAT: The selectionChange event is fired after the action is performed,
    // so we have to manually schedule it to ensure we don't 'throw away' the selection
    // while rendering if we have pending changes.
    if (scheduleSelectionChange) {
      scheduleOnDOMSelectionChange();
    }
    scheduleOnDOMSelectionChange.flush();
    onDOMSelectionChange.flush();
    applyPendingSelection();
    var userMarks = EDITOR_TO_USER_MARKS.get(editor);
    EDITOR_TO_USER_MARKS.delete(editor);
    if (userMarks !== undefined) {
      editor.marks = userMarks;
      editor.onChange();
    }
  };
  var handleCompositionEnd = _event => {
    if (compositionEndTimeoutId) {
      clearTimeout(compositionEndTimeoutId);
    }
    compositionEndTimeoutId = setTimeout(() => {
      IS_COMPOSING.set(editor, false);
      flush();
    }, RESOLVE_DELAY);
  };
  var handleCompositionStart = _event => {
    IS_COMPOSING.set(editor, true);
    if (compositionEndTimeoutId) {
      clearTimeout(compositionEndTimeoutId);
      compositionEndTimeoutId = null;
    }
  };
  var updatePlaceholderVisibility = function updatePlaceholderVisibility() {
    var forceHide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var placeholderElement = EDITOR_TO_PLACEHOLDER_ELEMENT.get(editor);
    if (!placeholderElement) {
      return;
    }
    if (hasPendingDiffs() || forceHide) {
      placeholderElement.style.display = 'none';
      return;
    }
    placeholderElement.style.removeProperty('display');
  };
  var storeDiff = (path, diff) => {
    var _EDITOR_TO_PENDING_DI3;
    var pendingDiffs = (_EDITOR_TO_PENDING_DI3 = EDITOR_TO_PENDING_DIFFS.get(editor)) !== null && _EDITOR_TO_PENDING_DI3 !== void 0 ? _EDITOR_TO_PENDING_DI3 : [];
    EDITOR_TO_PENDING_DIFFS.set(editor, pendingDiffs);
    var target = Node.leaf(editor, path);
    var idx = pendingDiffs.findIndex(change => Path.equals(change.path, path));
    if (idx < 0) {
      var normalized = normalizeStringDiff(target.text, diff);
      if (normalized) {
        pendingDiffs.push({
          path,
          diff,
          id: idCounter++
        });
      }
      updatePlaceholderVisibility();
      return;
    }
    var merged = mergeStringDiffs(target.text, pendingDiffs[idx].diff, diff);
    if (!merged) {
      pendingDiffs.splice(idx, 1);
      updatePlaceholderVisibility();
      return;
    }
    pendingDiffs[idx] = _objectSpread$6(_objectSpread$6({}, pendingDiffs[idx]), {}, {
      diff: merged
    });
  };
  var scheduleAction = function scheduleAction(run) {
    var {
      at
    } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    insertPositionHint = false;
    EDITOR_TO_PENDING_SELECTION.delete(editor);
    scheduleOnDOMSelectionChange.cancel();
    onDOMSelectionChange.cancel();
    if (hasPendingAction()) {
      flush();
    }
    EDITOR_TO_PENDING_ACTION.set(editor, {
      at,
      run
    });
    // COMPAT: When deleting before a non-contenteditable element chrome only fires a beforeinput,
    // (no input) and doesn't perform any dom mutations. Without a flush timeout we would never flush
    // in this case and thus never actually perform the action.
    actionTimeoutId = setTimeout(flush);
  };
  var handleDOMBeforeInput = event => {
    var _targetRange2;
    if (flushTimeoutId) {
      clearTimeout(flushTimeoutId);
      flushTimeoutId = null;
    }
    var {
      inputType: type
    } = event;
    var targetRange = null;
    var data = event.dataTransfer || event.data || undefined;
    if (insertPositionHint !== false && type !== 'insertText' && type !== 'insertCompositionText') {
      insertPositionHint = false;
    }
    var [nativeTargetRange] = event.getTargetRanges();
    if (nativeTargetRange) {
      targetRange = ReactEditor.toSlateRange(editor, nativeTargetRange, {
        exactMatch: false,
        suppressThrow: true
      });
    }
    // COMPAT: SelectionChange event is fired after the action is performed, so we
    // have to manually get the selection here to ensure it's up-to-date.
    var window = ReactEditor.getWindow(editor);
    var domSelection = window.getSelection();
    if (!targetRange && domSelection) {
      nativeTargetRange = domSelection;
      targetRange = ReactEditor.toSlateRange(editor, domSelection, {
        exactMatch: false,
        suppressThrow: true
      });
    }
    targetRange = (_targetRange2 = targetRange) !== null && _targetRange2 !== void 0 ? _targetRange2 : editor.selection;
    if (!targetRange) {
      return;
    }
    // By default, the input manager tries to store text diffs so that we can
    // defer flushing them at a later point in time. We don't want to flush
    // for every input event as this can be expensive. However, there are some
    // scenarios where we cannot safely store the text diff and must instead
    // schedule an action to let Slate normalize the editor state.
    var canStoreDiff = true;
    if (type.startsWith('delete')) {
      if (Range.isExpanded(targetRange)) {
        var [_start, _end] = Range.edges(targetRange);
        var _leaf = Node.leaf(editor, _start.path);
        if (_leaf.text.length === _start.offset && _end.offset === 0) {
          var next = Editor.next(editor, {
            at: _start.path,
            match: Text$1.isText
          });
          if (next && Path.equals(next[1], _end.path)) {
            targetRange = {
              anchor: _end,
              focus: _end
            };
          }
        }
      }
      var direction = type.endsWith('Backward') ? 'backward' : 'forward';
      var [start, end] = Range.edges(targetRange);
      var [leaf, path] = Editor.leaf(editor, start.path);
      var diff = {
        text: '',
        start: start.offset,
        end: end.offset
      };
      var pendingDiffs = EDITOR_TO_PENDING_DIFFS.get(editor);
      var relevantPendingDiffs = pendingDiffs === null || pendingDiffs === void 0 ? void 0 : pendingDiffs.find(change => Path.equals(change.path, path));
      var diffs = relevantPendingDiffs ? [relevantPendingDiffs.diff, diff] : [diff];
      var text = applyStringDiff(leaf.text, ...diffs);
      if (text.length === 0) {
        // Text leaf will be removed, so we need to schedule an
        // action to remove it so that Slate can normalize instead
        // of storing as a diff
        canStoreDiff = false;
      }
      if (Range.isExpanded(targetRange)) {
        if (canStoreDiff && Path.equals(targetRange.anchor.path, targetRange.focus.path)) {
          var point = {
            path: targetRange.anchor.path,
            offset: start.offset
          };
          var range = Editor.range(editor, point, point);
          handleUserSelect(range);
          return storeDiff(targetRange.anchor.path, {
            text: '',
            end: end.offset,
            start: start.offset
          });
        }
        return scheduleAction(() => Editor.deleteFragment(editor, {
          direction
        }), {
          at: targetRange
        });
      }
    }
    switch (type) {
      case 'deleteByComposition':
      case 'deleteByCut':
      case 'deleteByDrag':
        {
          return scheduleAction(() => Editor.deleteFragment(editor), {
            at: targetRange
          });
        }
      case 'deleteContent':
      case 'deleteContentForward':
        {
          var {
            anchor
          } = targetRange;
          if (canStoreDiff && Range.isCollapsed(targetRange)) {
            var targetNode = Node.leaf(editor, anchor.path);
            if (anchor.offset < targetNode.text.length) {
              return storeDiff(anchor.path, {
                text: '',
                start: anchor.offset,
                end: anchor.offset + 1
              });
            }
          }
          return scheduleAction(() => Editor.deleteForward(editor), {
            at: targetRange
          });
        }
      case 'deleteContentBackward':
        {
          var _nativeTargetRange;
          var {
            anchor: _anchor
          } = targetRange;
          // If we have a mismatch between the native and slate selection being collapsed
          // we are most likely deleting a zero-width placeholder and thus should perform it
          // as an action to ensure correct behavior (mostly happens with mark placeholders)
          var nativeCollapsed = isDOMSelection(nativeTargetRange) ? nativeTargetRange.isCollapsed : !!((_nativeTargetRange = nativeTargetRange) !== null && _nativeTargetRange !== void 0 && _nativeTargetRange.collapsed);
          if (canStoreDiff && nativeCollapsed && Range.isCollapsed(targetRange) && _anchor.offset > 0) {
            return storeDiff(_anchor.path, {
              text: '',
              start: _anchor.offset - 1,
              end: _anchor.offset
            });
          }
          return scheduleAction(() => Editor.deleteBackward(editor), {
            at: targetRange
          });
        }
      case 'deleteEntireSoftLine':
        {
          return scheduleAction(() => {
            Editor.deleteBackward(editor, {
              unit: 'line'
            });
            Editor.deleteForward(editor, {
              unit: 'line'
            });
          }, {
            at: targetRange
          });
        }
      case 'deleteHardLineBackward':
        {
          return scheduleAction(() => Editor.deleteBackward(editor, {
            unit: 'block'
          }), {
            at: targetRange
          });
        }
      case 'deleteSoftLineBackward':
        {
          return scheduleAction(() => Editor.deleteBackward(editor, {
            unit: 'line'
          }), {
            at: targetRange
          });
        }
      case 'deleteHardLineForward':
        {
          return scheduleAction(() => Editor.deleteForward(editor, {
            unit: 'block'
          }), {
            at: targetRange
          });
        }
      case 'deleteSoftLineForward':
        {
          return scheduleAction(() => Editor.deleteForward(editor, {
            unit: 'line'
          }), {
            at: targetRange
          });
        }
      case 'deleteWordBackward':
        {
          return scheduleAction(() => Editor.deleteBackward(editor, {
            unit: 'word'
          }), {
            at: targetRange
          });
        }
      case 'deleteWordForward':
        {
          return scheduleAction(() => Editor.deleteForward(editor, {
            unit: 'word'
          }), {
            at: targetRange
          });
        }
      case 'insertLineBreak':
        {
          return scheduleAction(() => Editor.insertSoftBreak(editor), {
            at: targetRange
          });
        }
      case 'insertParagraph':
        {
          return scheduleAction(() => Editor.insertBreak(editor), {
            at: targetRange
          });
        }
      case 'insertCompositionText':
      case 'deleteCompositionText':
      case 'insertFromComposition':
      case 'insertFromDrop':
      case 'insertFromPaste':
      case 'insertFromYank':
      case 'insertReplacementText':
      case 'insertText':
        {
          if (isDataTransfer(data)) {
            return scheduleAction(() => ReactEditor.insertData(editor, data), {
              at: targetRange
            });
          }
          var _text = data !== null && data !== void 0 ? data : '';
          // COMPAT: If we are writing inside a placeholder, the ime inserts the text inside
          // the placeholder itself and thus includes the zero-width space inside edit events.
          if (EDITOR_TO_PENDING_INSERTION_MARKS.get(editor)) {
            _text = _text.replace('\uFEFF', '');
          }
          // Pastes from the Android clipboard will generate `insertText` events.
          // If the copied text contains any newlines, Android will append an
          // extra newline to the end of the copied text.
          if (type === 'insertText' && /.*\n.*\n$/.test(_text)) {
            _text = _text.slice(0, -1);
          }
          // If the text includes a newline, split it at newlines and paste each component
          // string, with soft breaks in between each.
          if (_text.includes('\n')) {
            return scheduleAction(() => {
              var parts = _text.split('\n');
              parts.forEach((line, i) => {
                if (line) {
                  Editor.insertText(editor, line);
                }
                if (i !== parts.length - 1) {
                  Editor.insertSoftBreak(editor);
                }
              });
            }, {
              at: targetRange
            });
          }
          if (Path.equals(targetRange.anchor.path, targetRange.focus.path)) {
            var [_start2, _end2] = Range.edges(targetRange);
            var _diff = {
              start: _start2.offset,
              end: _end2.offset,
              text: _text
            };
            // COMPAT: Swiftkey has a weird bug where the target range of the 2nd word
            // inserted after a mark placeholder is inserted with an anchor offset off by 1.
            // So writing 'some text' will result in 'some ttext'. Luckily all 'normal' insert
            // text events are fired with the correct target ranges, only the final 'insertComposition'
            // isn't, so we can adjust the target range start offset if we are confident this is the
            // swiftkey insert causing the issue.
            if (_text && insertPositionHint && type === 'insertCompositionText') {
              var hintPosition = insertPositionHint.start + insertPositionHint.text.search(/\S|$/);
              var diffPosition = _diff.start + _diff.text.search(/\S|$/);
              if (diffPosition === hintPosition + 1 && _diff.end === insertPositionHint.start + insertPositionHint.text.length) {
                _diff.start -= 1;
                insertPositionHint = null;
                scheduleFlush();
              } else {
                insertPositionHint = false;
              }
            } else if (type === 'insertText') {
              if (insertPositionHint === null) {
                insertPositionHint = _diff;
              } else if (insertPositionHint && Range.isCollapsed(targetRange) && insertPositionHint.end + insertPositionHint.text.length === _start2.offset) {
                insertPositionHint = _objectSpread$6(_objectSpread$6({}, insertPositionHint), {}, {
                  text: insertPositionHint.text + _text
                });
              } else {
                insertPositionHint = false;
              }
            } else {
              insertPositionHint = false;
            }
            if (canStoreDiff) {
              storeDiff(_start2.path, _diff);
              return;
            }
          }
          return scheduleAction(() => Editor.insertText(editor, _text), {
            at: targetRange
          });
        }
    }
  };
  var hasPendingAction = () => {
    return !!EDITOR_TO_PENDING_ACTION.get(editor);
  };
  var hasPendingDiffs = () => {
    var _EDITOR_TO_PENDING_DI4;
    return !!((_EDITOR_TO_PENDING_DI4 = EDITOR_TO_PENDING_DIFFS.get(editor)) !== null && _EDITOR_TO_PENDING_DI4 !== void 0 && _EDITOR_TO_PENDING_DI4.length);
  };
  var hasPendingChanges = () => {
    return hasPendingAction() || hasPendingDiffs();
  };
  var isFlushing = () => {
    return flushing;
  };
  var handleUserSelect = range => {
    EDITOR_TO_PENDING_SELECTION.set(editor, range);
    if (flushTimeoutId) {
      clearTimeout(flushTimeoutId);
      flushTimeoutId = null;
    }
    var {
      selection
    } = editor;
    if (!range) {
      return;
    }
    var pathChanged = !selection || !Path.equals(selection.anchor.path, range.anchor.path);
    var parentPathChanged = !selection || !Path.equals(selection.anchor.path.slice(0, -1), range.anchor.path.slice(0, -1));
    if (pathChanged && insertPositionHint || parentPathChanged) {
      insertPositionHint = false;
    }
    if (pathChanged || hasPendingDiffs()) {
      flushTimeoutId = setTimeout(flush, FLUSH_DELAY);
    }
  };
  var handleInput = () => {
    if (hasPendingAction() || !hasPendingDiffs()) {
      flush();
    }
  };
  var handleKeyDown = _ => {
    // COMPAT: Swiftkey closes the keyboard when typing inside a empty node
    // directly next to a non-contenteditable element (= the placeholder).
    // The only event fired soon enough for us to allow hiding the placeholder
    // without swiftkey picking it up is the keydown event, so we have to hide it
    // here. See https://github.com/ianstormtaylor/slate/pull/4988#issuecomment-1201050535
    if (!hasPendingDiffs()) {
      updatePlaceholderVisibility(true);
      setTimeout(updatePlaceholderVisibility);
    }
  };
  var scheduleFlush = () => {
    if (!hasPendingAction()) {
      actionTimeoutId = setTimeout(flush);
    }
  };
  var handleDomMutations = mutations => {
    if (hasPendingDiffs() || hasPendingAction()) {
      return;
    }
    if (mutations.some(mutation => isTrackedMutation(editor, mutation, mutations))) {
      var _EDITOR_TO_FORCE_REND;
      // Cause a re-render to restore the dom state if we encounter tracked mutations without
      // a corresponding pending action.
      (_EDITOR_TO_FORCE_REND = EDITOR_TO_FORCE_RENDER.get(editor)) === null || _EDITOR_TO_FORCE_REND === void 0 || _EDITOR_TO_FORCE_REND();
    }
  };
  return {
    flush,
    scheduleFlush,
    hasPendingDiffs,
    hasPendingAction,
    hasPendingChanges,
    isFlushing,
    handleUserSelect,
    handleCompositionEnd,
    handleCompositionStart,
    handleDOMBeforeInput,
    handleKeyDown,
    handleDomMutations,
    handleInput
  };
}

function useIsMounted() {
  var isMountedRef = React.useRef(false);
  React.useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  return isMountedRef.current;
}

/**
 * Prevent warning on SSR by falling back to useEffect when DOM isn't available
 */
var useIsomorphicLayoutEffect = CAN_USE_DOM ? React.useLayoutEffect : React.useEffect;

function useMutationObserver(node, callback, options) {
  var [mutationObserver] = React.useState(() => new MutationObserver(callback));
  useIsomorphicLayoutEffect(() => {
    // Discard mutations caused during render phase. This works due to react calling
    // useLayoutEffect synchronously after the render phase before the next tick.
    mutationObserver.takeRecords();
  });
  React.useEffect(() => {
    if (!node.current) {
      throw new Error('Failed to attach MutationObserver, `node` is undefined');
    }
    mutationObserver.observe(node.current, options);
    return () => mutationObserver.disconnect();
  }, [mutationObserver, node, options]);
}

var _excluded$3 = ["node"];
function ownKeys$5(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$5(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$5(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$5(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var MUTATION_OBSERVER_CONFIG$1 = {
  subtree: true,
  childList: true,
  characterData: true
};
var useAndroidInputManager = !IS_ANDROID ? () => null : _ref => {
  var {
      node
    } = _ref,
    options = _objectWithoutProperties(_ref, _excluded$3);
  if (!IS_ANDROID) {
    return null;
  }
  var editor = useSlateStatic();
  var isMounted = useIsMounted();
  var [inputManager] = React.useState(() => createAndroidInputManager(_objectSpread$5({
    editor
  }, options)));
  useMutationObserver(node, inputManager.handleDomMutations, MUTATION_OBSERVER_CONFIG$1);
  EDITOR_TO_SCHEDULE_FLUSH.set(editor, inputManager.scheduleFlush);
  if (isMounted) {
    inputManager.flush();
  }
  return inputManager;
};

var _excluded$2 = ["anchor", "focus"],
  _excluded2$1 = ["anchor", "focus"];
var shallowCompare = (obj1, obj2) => Object.keys(obj1).length === Object.keys(obj2).length && Object.keys(obj1).every(key => obj2.hasOwnProperty(key) && obj1[key] === obj2[key]);
var isDecorationFlagsEqual = (range, other) => {
  var rangeOwnProps = _objectWithoutProperties(range, _excluded$2);
  var otherOwnProps = _objectWithoutProperties(other, _excluded2$1);
  return range[PLACEHOLDER_SYMBOL] === other[PLACEHOLDER_SYMBOL] && shallowCompare(rangeOwnProps, otherOwnProps);
};
/**
 * Check if a list of decorator ranges are equal to another.
 *
 * PERF: this requires the two lists to also have the ranges inside them in the
 * same order, but this is an okay constraint for us since decorations are
 * kept in order, and the odd case where they aren't is okay to re-render for.
 */
var isElementDecorationsEqual = (list, another) => {
  if (list.length !== another.length) {
    return false;
  }
  for (var i = 0; i < list.length; i++) {
    var range = list[i];
    var other = another[i];
    if (!Range.equals(range, other) || !isDecorationFlagsEqual(range, other)) {
      return false;
    }
  }
  return true;
};
/**
 * Check if a list of decorator ranges are equal to another.
 *
 * PERF: this requires the two lists to also have the ranges inside them in the
 * same order, but this is an okay constraint for us since decorations are
 * kept in order, and the odd case where they aren't is okay to re-render for.
 */
var isTextDecorationsEqual = (list, another) => {
  if (list.length !== another.length) {
    return false;
  }
  for (var i = 0; i < list.length; i++) {
    var range = list[i];
    var other = another[i];
    // compare only offsets because paths doesn't matter for text
    if (range.anchor.offset !== other.anchor.offset || range.focus.offset !== other.focus.offset || !isDecorationFlagsEqual(range, other)) {
      return false;
    }
  }
  return true;
};

function ownKeys$4(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$4(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$4(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$4(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/**
 * Leaf content strings.
 */
var String$1 = props => {
  var {
    isLast,
    leaf,
    parent,
    text
  } = props;
  var editor = useSlateStatic();
  var path = ReactEditor.findPath(editor, text);
  var parentPath = Path.parent(path);
  var isMarkPlaceholder = Boolean(leaf[MARK_PLACEHOLDER_SYMBOL]);
  // COMPAT: Render text inside void nodes with a zero-width space.
  // So the node can contain selection but the text is not visible.
  if (editor.isVoid(parent)) {
    return /*#__PURE__*/React.createElement(ZeroWidthString, {
      length: Node.string(parent).length
    });
  }
  // COMPAT: If this is the last text node in an empty block, render a zero-
  // width space that will convert into a line break when copying and pasting
  // to support expected plain text.
  if (leaf.text === '' && parent.children[parent.children.length - 1] === text && !editor.isInline(parent) && Editor.string(editor, parentPath) === '') {
    return /*#__PURE__*/React.createElement(ZeroWidthString, {
      isLineBreak: true,
      isMarkPlaceholder: isMarkPlaceholder
    });
  }
  // COMPAT: If the text is empty, it's because it's on the edge of an inline
  // node, so we render a zero-width space so that the selection can be
  // inserted next to it still.
  if (leaf.text === '') {
    return /*#__PURE__*/React.createElement(ZeroWidthString, {
      isMarkPlaceholder: isMarkPlaceholder
    });
  }
  // COMPAT: Browsers will collapse trailing new lines at the end of blocks,
  // so we need to add an extra trailing new lines to prevent that.
  if (isLast && leaf.text.slice(-1) === '\n') {
    return /*#__PURE__*/React.createElement(TextString, {
      isTrailing: true,
      text: leaf.text
    });
  }
  return /*#__PURE__*/React.createElement(TextString, {
    text: leaf.text
  });
};
/**
 * Leaf strings with text in them.
 */
var TextString = props => {
  var {
    text,
    isTrailing = false
  } = props;
  var ref = React.useRef(null);
  var getTextContent = () => {
    return "".concat(text !== null && text !== void 0 ? text : '').concat(isTrailing ? '\n' : '');
  };
  var [initialText] = React.useState(getTextContent);
  // This is the actual text rendering boundary where we interface with the DOM
  // The text is not rendered as part of the virtual DOM, as since we handle basic character insertions natively,
  // updating the DOM is not a one way dataflow anymore. What we need here is not reconciliation and diffing
  // with previous version of the virtual DOM, but rather diffing with the actual DOM element, and replace the DOM <span> content
  // exactly if and only if its current content does not match our current virtual DOM.
  // Otherwise the DOM TextNode would always be replaced by React as the user types, which interferes with native text features,
  // eg makes native spellcheck opt out from checking the text node.
  // useLayoutEffect: updating our span before browser paint
  useIsomorphicLayoutEffect(() => {
    // null coalescing text to make sure we're not outputing "null" as a string in the extreme case it is nullish at runtime
    var textWithTrailing = getTextContent();
    if (ref.current && ref.current.textContent !== textWithTrailing) {
      ref.current.textContent = textWithTrailing;
    }
    // intentionally not specifying dependencies, so that this effect runs on every render
    // as this effectively replaces "specifying the text in the virtual DOM under the <span> below" on each render
  });
  // We intentionally render a memoized <span> that only receives the initial text content when the component is mounted.
  // We defer to the layout effect above to update the `textContent` of the span element when needed.
  return /*#__PURE__*/React.createElement(MemoizedText$1, {
    ref: ref
  }, initialText);
};
var MemoizedText$1 = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef((props, ref) => {
  return /*#__PURE__*/React.createElement("span", {
    "data-slate-string": true,
    ref: ref
  }, props.children);
}));
/**
 * Leaf strings without text, render as zero-width strings.
 */
var ZeroWidthString = props => {
  var {
    length = 0,
    isLineBreak = false,
    isMarkPlaceholder = false
  } = props;
  var attributes = {
    'data-slate-zero-width': isLineBreak ? 'n' : 'z',
    'data-slate-length': length
  };
  if (isMarkPlaceholder) {
    attributes['data-slate-mark-placeholder'] = true;
  }
  return /*#__PURE__*/React.createElement("span", _objectSpread$4({}, attributes), !(IS_ANDROID || IS_IOS) || !isLineBreak ? '\uFEFF' : null, isLineBreak ? /*#__PURE__*/React.createElement("br", null) : null);
};

function ownKeys$3(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$3(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$3(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
// Delay the placeholder on Android to prevent the keyboard from closing.
// (https://github.com/ianstormtaylor/slate/pull/5368)
var PLACEHOLDER_DELAY = IS_ANDROID ? 300 : 0;
function disconnectPlaceholderResizeObserver(placeholderResizeObserver, releaseObserver) {
  if (placeholderResizeObserver.current) {
    placeholderResizeObserver.current.disconnect();
    if (releaseObserver) {
      placeholderResizeObserver.current = null;
    }
  }
}
function clearTimeoutRef(timeoutRef) {
  if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  }
}
/**
 * Individual leaves in a text node with unique formatting.
 */
var Leaf = props => {
  var {
    leaf,
    isLast,
    text,
    parent,
    renderPlaceholder,
    renderLeaf = props => /*#__PURE__*/React.createElement(DefaultLeaf, _objectSpread$3({}, props))
  } = props;
  var editor = useSlateStatic();
  var placeholderResizeObserver = React.useRef(null);
  var placeholderRef = React.useRef(null);
  var [showPlaceholder, setShowPlaceholder] = React.useState(false);
  var showPlaceholderTimeoutRef = React.useRef(null);
  var callbackPlaceholderRef = React.useCallback(placeholderEl => {
    disconnectPlaceholderResizeObserver(placeholderResizeObserver, placeholderEl == null);
    if (placeholderEl == null) {
      var _leaf$onPlaceholderRe;
      EDITOR_TO_PLACEHOLDER_ELEMENT.delete(editor);
      (_leaf$onPlaceholderRe = leaf.onPlaceholderResize) === null || _leaf$onPlaceholderRe === void 0 || _leaf$onPlaceholderRe.call(leaf, null);
    } else {
      EDITOR_TO_PLACEHOLDER_ELEMENT.set(editor, placeholderEl);
      if (!placeholderResizeObserver.current) {
        // Create a new observer and observe the placeholder element.
        var ResizeObserver$1 = window.ResizeObserver || ResizeObserver;
        placeholderResizeObserver.current = new ResizeObserver$1(() => {
          var _leaf$onPlaceholderRe2;
          (_leaf$onPlaceholderRe2 = leaf.onPlaceholderResize) === null || _leaf$onPlaceholderRe2 === void 0 || _leaf$onPlaceholderRe2.call(leaf, placeholderEl);
        });
      }
      placeholderResizeObserver.current.observe(placeholderEl);
      placeholderRef.current = placeholderEl;
    }
  }, [placeholderRef, leaf, editor]);
  var children = /*#__PURE__*/React.createElement(String$1, {
    isLast: isLast,
    leaf: leaf,
    parent: parent,
    text: text
  });
  var leafIsPlaceholder = Boolean(leaf[PLACEHOLDER_SYMBOL]);
  React.useEffect(() => {
    if (leafIsPlaceholder) {
      if (!showPlaceholderTimeoutRef.current) {
        // Delay the placeholder, so it will not render in a selection
        showPlaceholderTimeoutRef.current = setTimeout(() => {
          setShowPlaceholder(true);
          showPlaceholderTimeoutRef.current = null;
        }, PLACEHOLDER_DELAY);
      }
    } else {
      clearTimeoutRef(showPlaceholderTimeoutRef);
      setShowPlaceholder(false);
    }
    return () => clearTimeoutRef(showPlaceholderTimeoutRef);
  }, [leafIsPlaceholder, setShowPlaceholder]);
  if (leafIsPlaceholder && showPlaceholder) {
    var placeholderProps = {
      children: leaf.placeholder,
      attributes: {
        'data-slate-placeholder': true,
        style: {
          position: 'absolute',
          top: 0,
          pointerEvents: 'none',
          width: '100%',
          maxWidth: '100%',
          display: 'block',
          opacity: '0.333',
          userSelect: 'none',
          textDecoration: 'none',
          // Fixes https://github.com/udecode/plate/issues/2315
          WebkitUserModify: IS_WEBKIT ? 'inherit' : undefined
        },
        contentEditable: false,
        ref: callbackPlaceholderRef
      }
    };
    children = /*#__PURE__*/React.createElement(React.Fragment, null, renderPlaceholder(placeholderProps), children);
  }
  // COMPAT: Having the `data-` attributes on these leaf elements ensures that
  // in certain misbehaving browsers they aren't weirdly cloned/destroyed by
  // contenteditable behaviors. (2019/05/08)
  var attributes = {
    'data-slate-leaf': true
  };
  return renderLeaf({
    attributes,
    children,
    leaf,
    text
  });
};
var MemoizedLeaf = /*#__PURE__*/React.memo(Leaf, (prev, next) => {
  return next.parent === prev.parent && next.isLast === prev.isLast && next.renderLeaf === prev.renderLeaf && next.renderPlaceholder === prev.renderPlaceholder && next.text === prev.text && Text$1.equals(next.leaf, prev.leaf) && next.leaf[PLACEHOLDER_SYMBOL] === prev.leaf[PLACEHOLDER_SYMBOL];
});
var DefaultLeaf = props => {
  var {
    attributes,
    children
  } = props;
  return /*#__PURE__*/React.createElement("span", _objectSpread$3({}, attributes), children);
};

/**
 * Text.
 */
var Text = props => {
  var {
    decorations,
    isLast,
    parent,
    renderPlaceholder,
    renderLeaf,
    text
  } = props;
  var editor = useSlateStatic();
  var ref = React.useRef(null);
  var leaves = Text$1.decorations(text, decorations);
  var key = ReactEditor.findKey(editor, text);
  var children = [];
  for (var i = 0; i < leaves.length; i++) {
    var leaf = leaves[i];
    children.push( /*#__PURE__*/React.createElement(MemoizedLeaf, {
      isLast: isLast && i === leaves.length - 1,
      key: "".concat(key.id, "-").concat(i),
      renderPlaceholder: renderPlaceholder,
      leaf: leaf,
      text: text,
      parent: parent,
      renderLeaf: renderLeaf
    }));
  }
  // Update element-related weak maps with the DOM element ref.
  var callbackRef = React.useCallback(span => {
    var KEY_TO_ELEMENT = EDITOR_TO_KEY_TO_ELEMENT.get(editor);
    if (span) {
      KEY_TO_ELEMENT === null || KEY_TO_ELEMENT === void 0 || KEY_TO_ELEMENT.set(key, span);
      NODE_TO_ELEMENT.set(text, span);
      ELEMENT_TO_NODE.set(span, text);
    } else {
      KEY_TO_ELEMENT === null || KEY_TO_ELEMENT === void 0 || KEY_TO_ELEMENT.delete(key);
      NODE_TO_ELEMENT.delete(text);
      if (ref.current) {
        ELEMENT_TO_NODE.delete(ref.current);
      }
    }
    ref.current = span;
  }, [ref, editor, key, text]);
  return /*#__PURE__*/React.createElement("span", {
    "data-slate-node": "text",
    ref: callbackRef
  }, children);
};
var MemoizedText = /*#__PURE__*/React.memo(Text, (prev, next) => {
  return next.parent === prev.parent && next.isLast === prev.isLast && next.renderLeaf === prev.renderLeaf && next.renderPlaceholder === prev.renderPlaceholder && next.text === prev.text && isTextDecorationsEqual(next.decorations, prev.decorations);
});

function ownKeys$2(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$2(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$2(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/**
 * Element.
 */
var Element$1 = props => {
  var {
    decorations,
    element,
    renderElement = p => /*#__PURE__*/React.createElement(DefaultElement, _objectSpread$2({}, p)),
    renderPlaceholder,
    renderLeaf,
    selection
  } = props;
  var editor = useSlateStatic();
  var readOnly = useReadOnly();
  var isInline = editor.isInline(element);
  var key = ReactEditor.findKey(editor, element);
  var ref = React.useCallback(ref => {
    // Update element-related weak maps with the DOM element ref.
    var KEY_TO_ELEMENT = EDITOR_TO_KEY_TO_ELEMENT.get(editor);
    if (ref) {
      KEY_TO_ELEMENT === null || KEY_TO_ELEMENT === void 0 || KEY_TO_ELEMENT.set(key, ref);
      NODE_TO_ELEMENT.set(element, ref);
      ELEMENT_TO_NODE.set(ref, element);
    } else {
      KEY_TO_ELEMENT === null || KEY_TO_ELEMENT === void 0 || KEY_TO_ELEMENT.delete(key);
      NODE_TO_ELEMENT.delete(element);
    }
  }, [editor, key, element]);
  var children = useChildren({
    decorations,
    node: element,
    renderElement,
    renderPlaceholder,
    renderLeaf,
    selection
  });
  // Attributes that the developer must mix into the element in their
  // custom node renderer component.
  var attributes = {
    'data-slate-node': 'element',
    ref
  };
  if (isInline) {
    attributes['data-slate-inline'] = true;
  }
  // If it's a block node with inline children, add the proper `dir` attribute
  // for text direction.
  if (!isInline && Editor.hasInlines(editor, element)) {
    var text = Node.string(element);
    var dir = getDirection(text);
    if (dir === 'rtl') {
      attributes.dir = dir;
    }
  }
  // If it's a void node, wrap the children in extra void-specific elements.
  if (Editor.isVoid(editor, element)) {
    attributes['data-slate-void'] = true;
    if (!readOnly && isInline) {
      attributes.contentEditable = false;
    }
    var Tag = isInline ? 'span' : 'div';
    var [[_text]] = Node.texts(element);
    children = /*#__PURE__*/React.createElement(Tag, {
      "data-slate-spacer": true,
      style: {
        height: '0',
        color: 'transparent',
        outline: 'none',
        position: 'absolute'
      }
    }, /*#__PURE__*/React.createElement(MemoizedText, {
      renderPlaceholder: renderPlaceholder,
      decorations: [],
      isLast: false,
      parent: element,
      text: _text
    }));
    NODE_TO_INDEX.set(_text, 0);
    NODE_TO_PARENT.set(_text, element);
  }
  return renderElement({
    attributes,
    children,
    element
  });
};
var MemoizedElement = /*#__PURE__*/React.memo(Element$1, (prev, next) => {
  return prev.element === next.element && prev.renderElement === next.renderElement && prev.renderLeaf === next.renderLeaf && prev.renderPlaceholder === next.renderPlaceholder && isElementDecorationsEqual(prev.decorations, next.decorations) && (prev.selection === next.selection || !!prev.selection && !!next.selection && Range.equals(prev.selection, next.selection));
});
/**
 * The default element renderer.
 */
var DefaultElement = props => {
  var {
    attributes,
    children,
    element
  } = props;
  var editor = useSlateStatic();
  var Tag = editor.isInline(element) ? 'span' : 'div';
  return /*#__PURE__*/React.createElement(Tag, _objectSpread$2(_objectSpread$2({}, attributes), {}, {
    style: {
      position: 'relative'
    }
  }), children);
};

/**
 * A React context for sharing the `decorate` prop of the editable.
 */
var DecorateContext = /*#__PURE__*/React.createContext(() => []);
/**
 * Get the current `decorate` prop of the editable.
 */
var useDecorate = () => {
  return React.useContext(DecorateContext);
};

/**
 * A React context for sharing the `selected` state of an element.
 */
var SelectedContext = /*#__PURE__*/React.createContext(false);
/**
 * Get the current `selected` state of an element.
 */
var useSelected = () => {
  return React.useContext(SelectedContext);
};

/**
 * Children.
 */
var useChildren = props => {
  var {
    decorations,
    node,
    renderElement,
    renderPlaceholder,
    renderLeaf,
    selection
  } = props;
  var decorate = useDecorate();
  var editor = useSlateStatic();
  var path = ReactEditor.findPath(editor, node);
  var children = [];
  var isLeafBlock = Element$2.isElement(node) && !editor.isInline(node) && Editor.hasInlines(editor, node);
  for (var i = 0; i < node.children.length; i++) {
    var p = path.concat(i);
    var n = node.children[i];
    var key = ReactEditor.findKey(editor, n);
    var range = Editor.range(editor, p);
    var sel = selection && Range.intersection(range, selection);
    var ds = decorate([n, p]);
    for (var dec of decorations) {
      var d = Range.intersection(dec, range);
      if (d) {
        ds.push(d);
      }
    }
    if (Element$2.isElement(n)) {
      children.push( /*#__PURE__*/React.createElement(SelectedContext.Provider, {
        key: "provider-".concat(key.id),
        value: !!sel
      }, /*#__PURE__*/React.createElement(MemoizedElement, {
        decorations: ds,
        element: n,
        key: key.id,
        renderElement: renderElement,
        renderPlaceholder: renderPlaceholder,
        renderLeaf: renderLeaf,
        selection: sel
      })));
    } else {
      children.push( /*#__PURE__*/React.createElement(MemoizedText, {
        decorations: ds,
        key: key.id,
        isLast: isLeafBlock && i === node.children.length - 1,
        parent: node,
        renderPlaceholder: renderPlaceholder,
        renderLeaf: renderLeaf,
        text: n
      }));
    }
    NODE_TO_INDEX.set(n, i);
    NODE_TO_PARENT.set(n, node);
  }
  return children;
};

/**
 * A React context for sharing the `readOnly` state of the editor.
 */
var ReadOnlyContext = /*#__PURE__*/React.createContext(false);
/**
 * Get the current `readOnly` state of the editor.
 */
var useReadOnly = () => {
  return React.useContext(ReadOnlyContext);
};

var SlateContext = /*#__PURE__*/React.createContext(null);
/**
 * Get the current editor object from the React context.
 */
var useSlate = () => {
  var context = React.useContext(SlateContext);
  if (!context) {
    throw new Error("The `useSlate` hook must be used inside the <Slate> component's context.");
  }
  var {
    editor
  } = context;
  return editor;
};

function useTrackUserInput() {
  var editor = useSlateStatic();
  var receivedUserInput = React.useRef(false);
  var animationFrameIdRef = React.useRef(0);
  var onUserInput = React.useCallback(() => {
    if (receivedUserInput.current) {
      return;
    }
    receivedUserInput.current = true;
    var window = ReactEditor.getWindow(editor);
    window.cancelAnimationFrame(animationFrameIdRef.current);
    animationFrameIdRef.current = window.requestAnimationFrame(() => {
      receivedUserInput.current = false;
    });
  }, [editor]);
  React.useEffect(() => () => cancelAnimationFrame(animationFrameIdRef.current), []);
  return {
    receivedUserInput,
    onUserInput
  };
}

var TRIPLE_CLICK = 3;

/**
 * Hotkey mappings for each platform.
 */
var HOTKEYS = {
  bold: 'mod+b',
  compose: ['down', 'left', 'right', 'up', 'backspace', 'enter'],
  moveBackward: 'left',
  moveForward: 'right',
  moveWordBackward: 'ctrl+left',
  moveWordForward: 'ctrl+right',
  deleteBackward: 'shift?+backspace',
  deleteForward: 'shift?+delete',
  extendBackward: 'shift+left',
  extendForward: 'shift+right',
  italic: 'mod+i',
  insertSoftBreak: 'shift+enter',
  splitBlock: 'enter',
  undo: 'mod+z'
};
var APPLE_HOTKEYS = {
  moveLineBackward: 'opt+up',
  moveLineForward: 'opt+down',
  moveWordBackward: 'opt+left',
  moveWordForward: 'opt+right',
  deleteBackward: ['ctrl+backspace', 'ctrl+h'],
  deleteForward: ['ctrl+delete', 'ctrl+d'],
  deleteLineBackward: 'cmd+shift?+backspace',
  deleteLineForward: ['cmd+shift?+delete', 'ctrl+k'],
  deleteWordBackward: 'opt+shift?+backspace',
  deleteWordForward: 'opt+shift?+delete',
  extendLineBackward: 'opt+shift+up',
  extendLineForward: 'opt+shift+down',
  redo: 'cmd+shift+z',
  transposeCharacter: 'ctrl+t'
};
var WINDOWS_HOTKEYS = {
  deleteWordBackward: 'ctrl+shift?+backspace',
  deleteWordForward: 'ctrl+shift?+delete',
  redo: ['ctrl+y', 'ctrl+shift+z']
};
/**
 * Create a platform-aware hotkey checker.
 */
var create = key => {
  var generic = HOTKEYS[key];
  var apple = APPLE_HOTKEYS[key];
  var windows = WINDOWS_HOTKEYS[key];
  var isGeneric = generic && isHotkey_1(generic);
  var isApple = apple && isHotkey_1(apple);
  var isWindows = windows && isHotkey_1(windows);
  return event => {
    if (isGeneric && isGeneric(event)) return true;
    if (IS_APPLE && isApple && isApple(event)) return true;
    if (!IS_APPLE && isWindows && isWindows(event)) return true;
    return false;
  };
};
/**
 * Hotkeys.
 */
var Hotkeys = {
  isBold: create('bold'),
  isCompose: create('compose'),
  isMoveBackward: create('moveBackward'),
  isMoveForward: create('moveForward'),
  isDeleteBackward: create('deleteBackward'),
  isDeleteForward: create('deleteForward'),
  isDeleteLineBackward: create('deleteLineBackward'),
  isDeleteLineForward: create('deleteLineForward'),
  isDeleteWordBackward: create('deleteWordBackward'),
  isDeleteWordForward: create('deleteWordForward'),
  isExtendBackward: create('extendBackward'),
  isExtendForward: create('extendForward'),
  isExtendLineBackward: create('extendLineBackward'),
  isExtendLineForward: create('extendLineForward'),
  isItalic: create('italic'),
  isMoveLineBackward: create('moveLineBackward'),
  isMoveLineForward: create('moveLineForward'),
  isMoveWordBackward: create('moveWordBackward'),
  isMoveWordForward: create('moveWordForward'),
  isRedo: create('redo'),
  isSoftBreak: create('insertSoftBreak'),
  isSplitBlock: create('splitBlock'),
  isTransposeCharacter: create('transposeCharacter'),
  isUndo: create('undo')
};

var createRestoreDomManager = (editor, receivedUserInput) => {
  var bufferedMutations = [];
  var clear = () => {
    bufferedMutations = [];
  };
  var registerMutations = mutations => {
    if (!receivedUserInput.current) {
      return;
    }
    var trackedMutations = mutations.filter(mutation => isTrackedMutation(editor, mutation, mutations));
    bufferedMutations.push(...trackedMutations);
  };
  function restoreDOM() {
    if (bufferedMutations.length > 0) {
      bufferedMutations.reverse().forEach(mutation => {
        if (mutation.type === 'characterData') {
          // We don't want to restore the DOM for characterData mutations
          // because this interrupts the composition.
          return;
        }
        mutation.removedNodes.forEach(node => {
          mutation.target.insertBefore(node, mutation.nextSibling);
        });
        mutation.addedNodes.forEach(node => {
          mutation.target.removeChild(node);
        });
      });
      // Clear buffered mutations to ensure we don't undo them twice
      clear();
    }
  }
  return {
    registerMutations,
    restoreDOM,
    clear
  };
};

var MUTATION_OBSERVER_CONFIG = {
  subtree: true,
  childList: true,
  characterData: true,
  characterDataOldValue: true
};
// We have to use a class component here since we rely on `getSnapshotBeforeUpdate` which has no FC equivalent
// to run code synchronously immediately before react commits the component update to the DOM.
class RestoreDOMComponent extends React.Component {
  constructor() {
    super(...arguments);
    _defineProperty(this, "context", null);
    _defineProperty(this, "manager", null);
    _defineProperty(this, "mutationObserver", null);
  }
  observe() {
    var _this$mutationObserve;
    var {
      node
    } = this.props;
    if (!node.current) {
      throw new Error('Failed to attach MutationObserver, `node` is undefined');
    }
    (_this$mutationObserve = this.mutationObserver) === null || _this$mutationObserve === void 0 || _this$mutationObserve.observe(node.current, MUTATION_OBSERVER_CONFIG);
  }
  componentDidMount() {
    var {
      receivedUserInput
    } = this.props;
    var editor = this.context;
    this.manager = createRestoreDomManager(editor, receivedUserInput);
    this.mutationObserver = new MutationObserver(this.manager.registerMutations);
    this.observe();
  }
  getSnapshotBeforeUpdate() {
    var _this$mutationObserve2, _this$mutationObserve3, _this$manager2;
    var pendingMutations = (_this$mutationObserve2 = this.mutationObserver) === null || _this$mutationObserve2 === void 0 ? void 0 : _this$mutationObserve2.takeRecords();
    if (pendingMutations !== null && pendingMutations !== void 0 && pendingMutations.length) {
      var _this$manager;
      (_this$manager = this.manager) === null || _this$manager === void 0 || _this$manager.registerMutations(pendingMutations);
    }
    (_this$mutationObserve3 = this.mutationObserver) === null || _this$mutationObserve3 === void 0 || _this$mutationObserve3.disconnect();
    (_this$manager2 = this.manager) === null || _this$manager2 === void 0 || _this$manager2.restoreDOM();
    return null;
  }
  componentDidUpdate() {
    var _this$manager3;
    (_this$manager3 = this.manager) === null || _this$manager3 === void 0 || _this$manager3.clear();
    this.observe();
  }
  componentWillUnmount() {
    var _this$mutationObserve4;
    (_this$mutationObserve4 = this.mutationObserver) === null || _this$mutationObserve4 === void 0 || _this$mutationObserve4.disconnect();
  }
  render() {
    return this.props.children;
  }
}
_defineProperty(RestoreDOMComponent, "contextType", EditorContext);
var RestoreDOM = IS_ANDROID ? RestoreDOMComponent : _ref => {
  var {
    children
  } = _ref;
  return /*#__PURE__*/React.createElement(React.Fragment, null, children);
};

var _excluded$1 = ["autoFocus", "decorate", "onDOMBeforeInput", "placeholder", "readOnly", "renderElement", "renderLeaf", "renderPlaceholder", "scrollSelectionIntoView", "style", "as", "disableDefaultStyles"],
  _excluded2 = ["text"];
function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Children = props => /*#__PURE__*/React.createElement(React.Fragment, null, useChildren(props));
/**
 * Editable.
 */
var Editable = /*#__PURE__*/React.forwardRef((props, forwardedRef) => {
  var defaultRenderPlaceholder = React.useCallback(props => /*#__PURE__*/React.createElement(DefaultPlaceholder, _objectSpread$1({}, props)), []);
  var {
      autoFocus,
      decorate = defaultDecorate,
      onDOMBeforeInput: propsOnDOMBeforeInput,
      placeholder,
      readOnly = false,
      renderElement,
      renderLeaf,
      renderPlaceholder = defaultRenderPlaceholder,
      scrollSelectionIntoView = defaultScrollSelectionIntoView,
      style: userStyle = {},
      as: Component = 'div',
      disableDefaultStyles = false
    } = props,
    attributes = _objectWithoutProperties(props, _excluded$1);
  var editor = useSlate();
  // Rerender editor when composition status changed
  var [isComposing, setIsComposing] = React.useState(false);
  var ref = React.useRef(null);
  var deferredOperations = React.useRef([]);
  var [placeholderHeight, setPlaceholderHeight] = React.useState();
  var processing = React.useRef(false);
  var {
    onUserInput,
    receivedUserInput
  } = useTrackUserInput();
  var [, forceRender] = React.useReducer(s => s + 1, 0);
  EDITOR_TO_FORCE_RENDER.set(editor, forceRender);
  // Update internal state on each render.
  IS_READ_ONLY.set(editor, readOnly);
  // Keep track of some state for the event handler logic.
  var state = React.useMemo(() => ({
    isDraggingInternally: false,
    isUpdatingSelection: false,
    latestElement: null,
    hasMarkPlaceholder: false
  }), []);
  // The autoFocus TextareaHTMLAttribute doesn't do anything on a div, so it
  // needs to be manually focused.
  React.useEffect(() => {
    if (ref.current && autoFocus) {
      ref.current.focus();
    }
  }, [autoFocus]);
  /**
   * The AndroidInputManager object has a cyclical dependency on onDOMSelectionChange
   *
   * It is defined as a reference to simplify hook dependencies and clarify that
   * it needs to be initialized.
   */
  var androidInputManagerRef = React.useRef();
  // Listen on the native `selectionchange` event to be able to update any time
  // the selection changes. This is required because React's `onSelect` is leaky
  // and non-standard so it doesn't fire until after a selection has been
  // released. This causes issues in situations where another change happens
  // while a selection is being dragged.
  var onDOMSelectionChange = React.useMemo(() => throttle$1(() => {
    var el = ReactEditor.toDOMNode(editor, editor);
    var root = el.getRootNode();
    if (!processing.current && IS_WEBKIT && root instanceof ShadowRoot) {
      processing.current = true;
      var active = getActiveElement();
      if (active) {
        document.execCommand('indent');
      } else {
        Transforms.deselect(editor);
      }
      processing.current = false;
      return;
    }
    var androidInputManager = androidInputManagerRef.current;
    if ((IS_ANDROID || !ReactEditor.isComposing(editor)) && (!state.isUpdatingSelection || androidInputManager !== null && androidInputManager !== void 0 && androidInputManager.isFlushing()) && !state.isDraggingInternally) {
      var _root = ReactEditor.findDocumentOrShadowRoot(editor);
      var {
        activeElement
      } = _root;
      var _el = ReactEditor.toDOMNode(editor, editor);
      var domSelection = getSelection(_root);
      if (activeElement === _el) {
        state.latestElement = activeElement;
        IS_FOCUSED.set(editor, true);
      } else {
        IS_FOCUSED.delete(editor);
      }
      if (!domSelection) {
        return Transforms.deselect(editor);
      }
      var {
        anchorNode,
        focusNode
      } = domSelection;
      var anchorNodeSelectable = ReactEditor.hasEditableTarget(editor, anchorNode) || ReactEditor.isTargetInsideNonReadonlyVoid(editor, anchorNode);
      var focusNodeSelectable = ReactEditor.hasEditableTarget(editor, focusNode) || ReactEditor.isTargetInsideNonReadonlyVoid(editor, focusNode);
      if (anchorNodeSelectable && focusNodeSelectable) {
        var range = ReactEditor.toSlateRange(editor, domSelection, {
          exactMatch: false,
          suppressThrow: true
        });
        if (range) {
          if (!ReactEditor.isComposing(editor) && !(androidInputManager !== null && androidInputManager !== void 0 && androidInputManager.hasPendingChanges()) && !(androidInputManager !== null && androidInputManager !== void 0 && androidInputManager.isFlushing())) {
            Transforms.select(editor, range);
          } else {
            androidInputManager === null || androidInputManager === void 0 || androidInputManager.handleUserSelect(range);
          }
        }
      }
      // Deselect the editor if the dom selection is not selectable in readonly mode
      if (readOnly && (!anchorNodeSelectable || !focusNodeSelectable)) {
        Transforms.deselect(editor);
      }
    }
  }, 100), [editor, readOnly, state]);
  var scheduleOnDOMSelectionChange = React.useMemo(() => debounce$2(onDOMSelectionChange, 0), [onDOMSelectionChange]);
  androidInputManagerRef.current = useAndroidInputManager({
    node: ref,
    onDOMSelectionChange,
    scheduleOnDOMSelectionChange
  });
  useIsomorphicLayoutEffect(() => {
    var _androidInputManagerR, _androidInputManagerR2;
    // Update element-related weak maps with the DOM element ref.
    var window;
    if (ref.current && (window = getDefaultView(ref.current))) {
      EDITOR_TO_WINDOW.set(editor, window);
      EDITOR_TO_ELEMENT.set(editor, ref.current);
      NODE_TO_ELEMENT.set(editor, ref.current);
      ELEMENT_TO_NODE.set(ref.current, editor);
    } else {
      NODE_TO_ELEMENT.delete(editor);
    }
    // Make sure the DOM selection state is in sync.
    var {
      selection
    } = editor;
    var root = ReactEditor.findDocumentOrShadowRoot(editor);
    var domSelection = getSelection(root);
    if (!domSelection || !ReactEditor.isFocused(editor) || (_androidInputManagerR = androidInputManagerRef.current) !== null && _androidInputManagerR !== void 0 && _androidInputManagerR.hasPendingAction()) {
      return;
    }
    var setDomSelection = forceChange => {
      var hasDomSelection = domSelection.type !== 'None';
      // If the DOM selection is properly unset, we're done.
      if (!selection && !hasDomSelection) {
        return;
      }
      // Get anchorNode and focusNode
      var focusNode = domSelection.focusNode;
      var anchorNode;
      // COMPAT: In firefox the normal seletion way does not work
      // (https://github.com/ianstormtaylor/slate/pull/5486#issue-1820720223)
      if (IS_FIREFOX && domSelection.rangeCount > 1) {
        var firstRange = domSelection.getRangeAt(0);
        var lastRange = domSelection.getRangeAt(domSelection.rangeCount - 1);
        // Right to left
        if (firstRange.startContainer === focusNode) {
          anchorNode = lastRange.endContainer;
        } else {
          // Left to right
          anchorNode = firstRange.startContainer;
        }
      } else {
        anchorNode = domSelection.anchorNode;
      }
      // verify that the dom selection is in the editor
      var editorElement = EDITOR_TO_ELEMENT.get(editor);
      var hasDomSelectionInEditor = false;
      if (editorElement.contains(anchorNode) && editorElement.contains(focusNode)) {
        hasDomSelectionInEditor = true;
      }
      // If the DOM selection is in the editor and the editor selection is already correct, we're done.
      if (hasDomSelection && hasDomSelectionInEditor && selection && !forceChange) {
        var slateRange = ReactEditor.toSlateRange(editor, domSelection, {
          exactMatch: true,
          // domSelection is not necessarily a valid Slate range
          // (e.g. when clicking on contentEditable:false element)
          suppressThrow: true
        });
        if (slateRange && Range.equals(slateRange, selection)) {
          var _anchorNode;
          if (!state.hasMarkPlaceholder) {
            return;
          }
          // Ensure selection is inside the mark placeholder
          if ((_anchorNode = anchorNode) !== null && _anchorNode !== void 0 && (_anchorNode = _anchorNode.parentElement) !== null && _anchorNode !== void 0 && _anchorNode.hasAttribute('data-slate-mark-placeholder')) {
            return;
          }
        }
      }
      // when <Editable/> is being controlled through external value
      // then its children might just change - DOM responds to it on its own
      // but Slate's value is not being updated through any operation
      // and thus it doesn't transform selection on its own
      if (selection && !ReactEditor.hasRange(editor, selection)) {
        editor.selection = ReactEditor.toSlateRange(editor, domSelection, {
          exactMatch: false,
          suppressThrow: true
        });
        return;
      }
      // Otherwise the DOM selection is out of sync, so update it.
      state.isUpdatingSelection = true;
      var newDomRange = selection && ReactEditor.toDOMRange(editor, selection);
      if (newDomRange) {
        if (ReactEditor.isComposing(editor) && !IS_ANDROID) {
          domSelection.collapseToEnd();
        } else if (Range.isBackward(selection)) {
          domSelection.setBaseAndExtent(newDomRange.endContainer, newDomRange.endOffset, newDomRange.startContainer, newDomRange.startOffset);
        } else {
          domSelection.setBaseAndExtent(newDomRange.startContainer, newDomRange.startOffset, newDomRange.endContainer, newDomRange.endOffset);
        }
        scrollSelectionIntoView(editor, newDomRange);
      } else {
        domSelection.removeAllRanges();
      }
      return newDomRange;
    };
    // In firefox if there is more then 1 range and we call setDomSelection we remove the ability to select more cells in a table
    if (domSelection.rangeCount <= 1) {
      setDomSelection();
    }
    var ensureSelection = ((_androidInputManagerR2 = androidInputManagerRef.current) === null || _androidInputManagerR2 === void 0 ? void 0 : _androidInputManagerR2.isFlushing()) === 'action';
    if (!IS_ANDROID || !ensureSelection) {
      setTimeout(() => {
        state.isUpdatingSelection = false;
      });
      return;
    }
    var timeoutId = null;
    var animationFrameId = requestAnimationFrame(() => {
      if (ensureSelection) {
        var ensureDomSelection = forceChange => {
          try {
            var el = ReactEditor.toDOMNode(editor, editor);
            el.focus();
            setDomSelection(forceChange);
          } catch (e) {
            // Ignore, dom and state might be out of sync
          }
        };
        // Compat: Android IMEs try to force their selection by manually re-applying it even after we set it.
        // This essentially would make setting the slate selection during an update meaningless, so we force it
        // again here. We can't only do it in the setTimeout after the animation frame since that would cause a
        // visible flicker.
        ensureDomSelection();
        timeoutId = setTimeout(() => {
          // COMPAT: While setting the selection in an animation frame visually correctly sets the selection,
          // it doesn't update GBoards spellchecker state. We have to manually trigger a selection change after
          // the animation frame to ensure it displays the correct state.
          ensureDomSelection(true);
          state.isUpdatingSelection = false;
        });
      }
    });
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  });
  // Listen on the native `beforeinput` event to get real "Level 2" events. This
  // is required because React's `beforeinput` is fake and never really attaches
  // to the real event sadly. (2019/11/01)
  // https://github.com/facebook/react/issues/11211
  var onDOMBeforeInput = React.useCallback(event => {
    var el = ReactEditor.toDOMNode(editor, editor);
    var root = el.getRootNode();
    if (processing !== null && processing !== void 0 && processing.current && IS_WEBKIT && root instanceof ShadowRoot) {
      var ranges = event.getTargetRanges();
      var range = ranges[0];
      var newRange = new window.Range();
      newRange.setStart(range.startContainer, range.startOffset);
      newRange.setEnd(range.endContainer, range.endOffset);
      // Translate the DOM Range into a Slate Range
      var slateRange = ReactEditor.toSlateRange(editor, newRange, {
        exactMatch: false,
        suppressThrow: false
      });
      Transforms.select(editor, slateRange);
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    onUserInput();
    if (!readOnly && ReactEditor.hasEditableTarget(editor, event.target) && !isDOMEventHandled(event, propsOnDOMBeforeInput)) {
      var _EDITOR_TO_USER_SELEC;
      // COMPAT: BeforeInput events aren't cancelable on android, so we have to handle them differently using the android input manager.
      if (androidInputManagerRef.current) {
        return androidInputManagerRef.current.handleDOMBeforeInput(event);
      }
      // Some IMEs/Chrome extensions like e.g. Grammarly set the selection immediately before
      // triggering a `beforeinput` expecting the change to be applied to the immediately before
      // set selection.
      scheduleOnDOMSelectionChange.flush();
      onDOMSelectionChange.flush();
      var {
        selection
      } = editor;
      var {
        inputType: type
      } = event;
      var data = event.dataTransfer || event.data || undefined;
      var isCompositionChange = type === 'insertCompositionText' || type === 'deleteCompositionText';
      // COMPAT: use composition change events as a hint to where we should insert
      // composition text if we aren't composing to work around https://github.com/ianstormtaylor/slate/issues/5038
      if (isCompositionChange && ReactEditor.isComposing(editor)) {
        return;
      }
      var native = false;
      if (type === 'insertText' && selection && Range.isCollapsed(selection) &&
      // Only use native character insertion for single characters a-z or space for now.
      // Long-press events (hold a + press 4 = ä) to choose a special character otherwise
      // causes duplicate inserts.
      event.data && event.data.length === 1 && /[a-z ]/i.test(event.data) &&
      // Chrome has issues correctly editing the start of nodes: https://bugs.chromium.org/p/chromium/issues/detail?id=1249405
      // When there is an inline element, e.g. a link, and you select
      // right after it (the start of the next node).
      selection.anchor.offset !== 0) {
        var _node$parentElement, _window$getComputedSt;
        native = true;
        // Skip native if there are marks, as
        // `insertText` will insert a node, not just text.
        if (editor.marks) {
          native = false;
        }
        // Chrome also has issues correctly editing the end of anchor elements: https://bugs.chromium.org/p/chromium/issues/detail?id=1259100
        // Therefore we don't allow native events to insert text at the end of anchor nodes.
        var {
          anchor
        } = selection;
        var [node, offset] = ReactEditor.toDOMPoint(editor, anchor);
        var anchorNode = (_node$parentElement = node.parentElement) === null || _node$parentElement === void 0 ? void 0 : _node$parentElement.closest('a');
        var _window = ReactEditor.getWindow(editor);
        if (native && anchorNode && ReactEditor.hasDOMNode(editor, anchorNode)) {
          var _lastText$textContent;
          // Find the last text node inside the anchor.
          var lastText = _window === null || _window === void 0 ? void 0 : _window.document.createTreeWalker(anchorNode, NodeFilter.SHOW_TEXT).lastChild();
          if (lastText === node && ((_lastText$textContent = lastText.textContent) === null || _lastText$textContent === void 0 ? void 0 : _lastText$textContent.length) === offset) {
            native = false;
          }
        }
        // Chrome has issues with the presence of tab characters inside elements with whiteSpace = 'pre'
        // causing abnormal insert behavior: https://bugs.chromium.org/p/chromium/issues/detail?id=1219139
        if (native && node.parentElement && (_window === null || _window === void 0 || (_window$getComputedSt = _window.getComputedStyle(node.parentElement)) === null || _window$getComputedSt === void 0 ? void 0 : _window$getComputedSt.whiteSpace) === 'pre') {
          var block = Editor.above(editor, {
            at: anchor.path,
            match: n => Element$2.isElement(n) && Editor.isBlock(editor, n)
          });
          if (block && Node.string(block[0]).includes('\t')) {
            native = false;
          }
        }
      }
      // COMPAT: For the deleting forward/backward input types we don't want
      // to change the selection because it is the range that will be deleted,
      // and those commands determine that for themselves.
      if (!type.startsWith('delete') || type.startsWith('deleteBy')) {
        var [targetRange] = event.getTargetRanges();
        if (targetRange) {
          var _range = ReactEditor.toSlateRange(editor, targetRange, {
            exactMatch: false,
            suppressThrow: false
          });
          if (!selection || !Range.equals(selection, _range)) {
            native = false;
            var selectionRef = !isCompositionChange && editor.selection && Editor.rangeRef(editor, editor.selection);
            Transforms.select(editor, _range);
            if (selectionRef) {
              EDITOR_TO_USER_SELECTION.set(editor, selectionRef);
            }
          }
        }
      }
      // Composition change types occur while a user is composing text and can't be
      // cancelled. Let them through and wait for the composition to end.
      if (isCompositionChange) {
        return;
      }
      if (!native) {
        event.preventDefault();
      }
      // COMPAT: If the selection is expanded, even if the command seems like
      // a delete forward/backward command it should delete the selection.
      if (selection && Range.isExpanded(selection) && type.startsWith('delete')) {
        var direction = type.endsWith('Backward') ? 'backward' : 'forward';
        Editor.deleteFragment(editor, {
          direction
        });
        return;
      }
      switch (type) {
        case 'deleteByComposition':
        case 'deleteByCut':
        case 'deleteByDrag':
          {
            Editor.deleteFragment(editor);
            break;
          }
        case 'deleteContent':
        case 'deleteContentForward':
          {
            Editor.deleteForward(editor);
            break;
          }
        case 'deleteContentBackward':
          {
            Editor.deleteBackward(editor);
            break;
          }
        case 'deleteEntireSoftLine':
          {
            Editor.deleteBackward(editor, {
              unit: 'line'
            });
            Editor.deleteForward(editor, {
              unit: 'line'
            });
            break;
          }
        case 'deleteHardLineBackward':
          {
            Editor.deleteBackward(editor, {
              unit: 'block'
            });
            break;
          }
        case 'deleteSoftLineBackward':
          {
            Editor.deleteBackward(editor, {
              unit: 'line'
            });
            break;
          }
        case 'deleteHardLineForward':
          {
            Editor.deleteForward(editor, {
              unit: 'block'
            });
            break;
          }
        case 'deleteSoftLineForward':
          {
            Editor.deleteForward(editor, {
              unit: 'line'
            });
            break;
          }
        case 'deleteWordBackward':
          {
            Editor.deleteBackward(editor, {
              unit: 'word'
            });
            break;
          }
        case 'deleteWordForward':
          {
            Editor.deleteForward(editor, {
              unit: 'word'
            });
            break;
          }
        case 'insertLineBreak':
          Editor.insertSoftBreak(editor);
          break;
        case 'insertParagraph':
          {
            Editor.insertBreak(editor);
            break;
          }
        case 'insertFromComposition':
        case 'insertFromDrop':
        case 'insertFromPaste':
        case 'insertFromYank':
        case 'insertReplacementText':
        case 'insertText':
          {
            if (type === 'insertFromComposition') {
              // COMPAT: in Safari, `compositionend` is dispatched after the
              // `beforeinput` for "insertFromComposition". But if we wait for it
              // then we will abort because we're still composing and the selection
              // won't be updated properly.
              // https://www.w3.org/TR/input-events-2/
              if (ReactEditor.isComposing(editor)) {
                setIsComposing(false);
                IS_COMPOSING.set(editor, false);
              }
            }
            // use a weak comparison instead of 'instanceof' to allow
            // programmatic access of paste events coming from external windows
            // like cypress where cy.window does not work realibly
            if ((data === null || data === void 0 ? void 0 : data.constructor.name) === 'DataTransfer') {
              ReactEditor.insertData(editor, data);
            } else if (typeof data === 'string') {
              // Only insertText operations use the native functionality, for now.
              // Potentially expand to single character deletes, as well.
              if (native) {
                deferredOperations.current.push(() => Editor.insertText(editor, data));
              } else {
                Editor.insertText(editor, data);
              }
            }
            break;
          }
      }
      // Restore the actual user section if nothing manually set it.
      var toRestore = (_EDITOR_TO_USER_SELEC = EDITOR_TO_USER_SELECTION.get(editor)) === null || _EDITOR_TO_USER_SELEC === void 0 ? void 0 : _EDITOR_TO_USER_SELEC.unref();
      EDITOR_TO_USER_SELECTION.delete(editor);
      if (toRestore && (!editor.selection || !Range.equals(editor.selection, toRestore))) {
        Transforms.select(editor, toRestore);
      }
    }
  }, [editor, onDOMSelectionChange, onUserInput, propsOnDOMBeforeInput, readOnly, scheduleOnDOMSelectionChange]);
  var callbackRef = React.useCallback(node => {
    if (node == null) {
      onDOMSelectionChange.cancel();
      scheduleOnDOMSelectionChange.cancel();
      EDITOR_TO_ELEMENT.delete(editor);
      NODE_TO_ELEMENT.delete(editor);
      if (ref.current && HAS_BEFORE_INPUT_SUPPORT) {
        // @ts-ignore The `beforeinput` event isn't recognized.
        ref.current.removeEventListener('beforeinput', onDOMBeforeInput);
      }
    } else {
      // Attach a native DOM event handler for `beforeinput` events, because React's
      // built-in `onBeforeInput` is actually a leaky polyfill that doesn't expose
      // real `beforeinput` events sadly... (2019/11/04)
      // https://github.com/facebook/react/issues/11211
      if (HAS_BEFORE_INPUT_SUPPORT) {
        // @ts-ignore The `beforeinput` event isn't recognized.
        node.addEventListener('beforeinput', onDOMBeforeInput);
      }
    }
    ref.current = node;
    if (typeof forwardedRef === 'function') {
      forwardedRef(node);
    } else if (forwardedRef) {
      forwardedRef.current = node;
    }
  }, [onDOMSelectionChange, scheduleOnDOMSelectionChange, editor, onDOMBeforeInput, forwardedRef]);
  useIsomorphicLayoutEffect(() => {
    var window = ReactEditor.getWindow(editor);
    // Attach a native DOM event handler for `selectionchange`, because React's
    // built-in `onSelect` handler doesn't fire for all selection changes. It's
    // a leaky polyfill that only fires on keypresses or clicks. Instead, we
    // want to fire for any change to the selection inside the editor.
    // (2019/11/04) https://github.com/facebook/react/issues/5785
    window.document.addEventListener('selectionchange', scheduleOnDOMSelectionChange);
    // Listen for dragend and drop globally. In Firefox, if a drop handler
    // initiates an operation that causes the originally dragged element to
    // unmount, that element will not emit a dragend event. (2024/06/21)
    var stoppedDragging = () => {
      state.isDraggingInternally = false;
    };
    window.document.addEventListener('dragend', stoppedDragging);
    window.document.addEventListener('drop', stoppedDragging);
    return () => {
      window.document.removeEventListener('selectionchange', scheduleOnDOMSelectionChange);
      window.document.removeEventListener('dragend', stoppedDragging);
      window.document.removeEventListener('drop', stoppedDragging);
    };
  }, [scheduleOnDOMSelectionChange, state]);
  var decorations = decorate([editor, []]);
  var showPlaceholder = placeholder && editor.children.length === 1 && Array.from(Node.texts(editor)).length === 1 && Node.string(editor) === '' && !isComposing;
  var placeHolderResizeHandler = React.useCallback(placeholderEl => {
    if (placeholderEl && showPlaceholder) {
      var _placeholderEl$getBou;
      setPlaceholderHeight((_placeholderEl$getBou = placeholderEl.getBoundingClientRect()) === null || _placeholderEl$getBou === void 0 ? void 0 : _placeholderEl$getBou.height);
    } else {
      setPlaceholderHeight(undefined);
    }
  }, [showPlaceholder]);
  if (showPlaceholder) {
    var start = Editor.start(editor, []);
    decorations.push({
      [PLACEHOLDER_SYMBOL]: true,
      placeholder,
      onPlaceholderResize: placeHolderResizeHandler,
      anchor: start,
      focus: start
    });
  }
  var {
    marks
  } = editor;
  state.hasMarkPlaceholder = false;
  if (editor.selection && Range.isCollapsed(editor.selection) && marks) {
    var {
      anchor
    } = editor.selection;
    var leaf = Node.leaf(editor, anchor.path);
    var rest = _objectWithoutProperties(leaf, _excluded2);
    // While marks isn't a 'complete' text, we can still use loose Text.equals
    // here which only compares marks anyway.
    if (!Text$1.equals(leaf, marks, {
      loose: true
    })) {
      state.hasMarkPlaceholder = true;
      var unset = Object.fromEntries(Object.keys(rest).map(mark => [mark, null]));
      decorations.push(_objectSpread$1(_objectSpread$1(_objectSpread$1({
        [MARK_PLACEHOLDER_SYMBOL]: true
      }, unset), marks), {}, {
        anchor,
        focus: anchor
      }));
    }
  }
  // Update EDITOR_TO_MARK_PLACEHOLDER_MARKS in setTimeout useEffect to ensure we don't set it
  // before we receive the composition end event.
  React.useEffect(() => {
    setTimeout(() => {
      var {
        selection
      } = editor;
      if (selection) {
        var {
          anchor: _anchor
        } = selection;
        var _text = Node.leaf(editor, _anchor.path);
        // While marks isn't a 'complete' text, we can still use loose Text.equals
        // here which only compares marks anyway.
        if (marks && !Text$1.equals(_text, marks, {
          loose: true
        })) {
          EDITOR_TO_PENDING_INSERTION_MARKS.set(editor, marks);
          return;
        }
      }
      EDITOR_TO_PENDING_INSERTION_MARKS.delete(editor);
    });
  });
  return /*#__PURE__*/React.createElement(ReadOnlyContext.Provider, {
    value: readOnly
  }, /*#__PURE__*/React.createElement(DecorateContext.Provider, {
    value: decorate
  }, /*#__PURE__*/React.createElement(RestoreDOM, {
    node: ref,
    receivedUserInput: receivedUserInput
  }, /*#__PURE__*/React.createElement(Component, _objectSpread$1(_objectSpread$1({
    role: readOnly ? undefined : 'textbox',
    "aria-multiline": readOnly ? undefined : true
  }, attributes), {}, {
    // COMPAT: Certain browsers don't support the `beforeinput` event, so we'd
    // have to use hacks to make these replacement-based features work.
    // For SSR situations HAS_BEFORE_INPUT_SUPPORT is false and results in prop
    // mismatch warning app moves to browser. Pass-through consumer props when
    // not CAN_USE_DOM (SSR) and default to falsy value
    spellCheck: HAS_BEFORE_INPUT_SUPPORT || !CAN_USE_DOM ? attributes.spellCheck : false,
    autoCorrect: HAS_BEFORE_INPUT_SUPPORT || !CAN_USE_DOM ? attributes.autoCorrect : 'false',
    autoCapitalize: HAS_BEFORE_INPUT_SUPPORT || !CAN_USE_DOM ? attributes.autoCapitalize : 'false',
    "data-slate-editor": true,
    "data-slate-node": "value",
    // explicitly set this
    contentEditable: !readOnly,
    // in some cases, a decoration needs access to the range / selection to decorate a text node,
    // then you will select the whole text node when you select part the of text
    // this magic zIndex="-1" will fix it
    zindex: -1,
    suppressContentEditableWarning: true,
    ref: callbackRef,
    style: _objectSpread$1(_objectSpread$1({}, disableDefaultStyles ? {} : _objectSpread$1({
      // Allow positioning relative to the editable element.
      position: 'relative',
      // Preserve adjacent whitespace and new lines.
      whiteSpace: 'pre-wrap',
      // Allow words to break if they are too long.
      wordWrap: 'break-word'
    }, placeholderHeight ? {
      minHeight: placeholderHeight
    } : {})), userStyle),
    onBeforeInput: React.useCallback(event => {
      // COMPAT: Certain browsers don't support the `beforeinput` event, so we
      // fall back to React's leaky polyfill instead just for it. It
      // only works for the `insertText` input type.
      if (!HAS_BEFORE_INPUT_SUPPORT && !readOnly && !isEventHandled(event, attributes.onBeforeInput) && ReactEditor.hasSelectableTarget(editor, event.target)) {
        event.preventDefault();
        if (!ReactEditor.isComposing(editor)) {
          var _text2 = event.data;
          Editor.insertText(editor, _text2);
        }
      }
    }, [attributes.onBeforeInput, editor, readOnly]),
    onInput: React.useCallback(event => {
      if (isEventHandled(event, attributes.onInput)) {
        return;
      }
      if (androidInputManagerRef.current) {
        androidInputManagerRef.current.handleInput();
        return;
      }
      // Flush native operations, as native events will have propogated
      // and we can correctly compare DOM text values in components
      // to stop rendering, so that browser functions like autocorrect
      // and spellcheck work as expected.
      for (var op of deferredOperations.current) {
        op();
      }
      deferredOperations.current = [];
    }, [attributes.onInput]),
    onBlur: React.useCallback(event => {
      if (readOnly || state.isUpdatingSelection || !ReactEditor.hasSelectableTarget(editor, event.target) || isEventHandled(event, attributes.onBlur)) {
        return;
      }
      // COMPAT: If the current `activeElement` is still the previous
      // one, this is due to the window being blurred when the tab
      // itself becomes unfocused, so we want to abort early to allow to
      // editor to stay focused when the tab becomes focused again.
      var root = ReactEditor.findDocumentOrShadowRoot(editor);
      if (state.latestElement === root.activeElement) {
        return;
      }
      var {
        relatedTarget
      } = event;
      var el = ReactEditor.toDOMNode(editor, editor);
      // COMPAT: The event should be ignored if the focus is returning
      // to the editor from an embedded editable element (eg. an <input>
      // element inside a void node).
      if (relatedTarget === el) {
        return;
      }
      // COMPAT: The event should be ignored if the focus is moving from
      // the editor to inside a void node's spacer element.
      if (isDOMElement(relatedTarget) && relatedTarget.hasAttribute('data-slate-spacer')) {
        return;
      }
      // COMPAT: The event should be ignored if the focus is moving to a
      // non- editable section of an element that isn't a void node (eg.
      // a list item of the check list example).
      if (relatedTarget != null && isDOMNode(relatedTarget) && ReactEditor.hasDOMNode(editor, relatedTarget)) {
        var node = ReactEditor.toSlateNode(editor, relatedTarget);
        if (Element$2.isElement(node) && !editor.isVoid(node)) {
          return;
        }
      }
      // COMPAT: Safari doesn't always remove the selection even if the content-
      // editable element no longer has focus. Refer to:
      // https://stackoverflow.com/questions/12353247/force-contenteditable-div-to-stop-accepting-input-after-it-loses-focus-under-web
      if (IS_WEBKIT) {
        var domSelection = getSelection(root);
        domSelection === null || domSelection === void 0 || domSelection.removeAllRanges();
      }
      IS_FOCUSED.delete(editor);
    }, [readOnly, state.isUpdatingSelection, state.latestElement, editor, attributes.onBlur]),
    onClick: React.useCallback(event => {
      if (ReactEditor.hasTarget(editor, event.target) && !isEventHandled(event, attributes.onClick) && isDOMNode(event.target)) {
        var node = ReactEditor.toSlateNode(editor, event.target);
        var path = ReactEditor.findPath(editor, node);
        // At this time, the Slate document may be arbitrarily different,
        // because onClick handlers can change the document before we get here.
        // Therefore we must check that this path actually exists,
        // and that it still refers to the same node.
        if (!Editor.hasPath(editor, path) || Node.get(editor, path) !== node) {
          return;
        }
        if (event.detail === TRIPLE_CLICK && path.length >= 1) {
          var blockPath = path;
          if (!(Element$2.isElement(node) && Editor.isBlock(editor, node))) {
            var _block$;
            var block = Editor.above(editor, {
              match: n => Element$2.isElement(n) && Editor.isBlock(editor, n),
              at: path
            });
            blockPath = (_block$ = block === null || block === void 0 ? void 0 : block[1]) !== null && _block$ !== void 0 ? _block$ : path.slice(0, 1);
          }
          var range = Editor.range(editor, blockPath);
          Transforms.select(editor, range);
          return;
        }
        if (readOnly) {
          return;
        }
        var _start = Editor.start(editor, path);
        var end = Editor.end(editor, path);
        var startVoid = Editor.void(editor, {
          at: _start
        });
        var endVoid = Editor.void(editor, {
          at: end
        });
        if (startVoid && endVoid && Path.equals(startVoid[1], endVoid[1])) {
          var _range2 = Editor.range(editor, _start);
          Transforms.select(editor, _range2);
        }
      }
    }, [editor, attributes.onClick, readOnly]),
    onCompositionEnd: React.useCallback(event => {
      if (ReactEditor.hasSelectableTarget(editor, event.target)) {
        var _androidInputManagerR3;
        if (ReactEditor.isComposing(editor)) {
          Promise.resolve().then(() => {
            setIsComposing(false);
            IS_COMPOSING.set(editor, false);
          });
        }
        (_androidInputManagerR3 = androidInputManagerRef.current) === null || _androidInputManagerR3 === void 0 || _androidInputManagerR3.handleCompositionEnd(event);
        if (isEventHandled(event, attributes.onCompositionEnd) || IS_ANDROID) {
          return;
        }
        // COMPAT: In Chrome, `beforeinput` events for compositions
        // aren't correct and never fire the "insertFromComposition"
        // type that we need. So instead, insert whenever a composition
        // ends since it will already have been committed to the DOM.
        if (!IS_WEBKIT && !IS_FIREFOX_LEGACY && !IS_IOS && !IS_WECHATBROWSER && !IS_UC_MOBILE && event.data) {
          var placeholderMarks = EDITOR_TO_PENDING_INSERTION_MARKS.get(editor);
          EDITOR_TO_PENDING_INSERTION_MARKS.delete(editor);
          // Ensure we insert text with the marks the user was actually seeing
          if (placeholderMarks !== undefined) {
            EDITOR_TO_USER_MARKS.set(editor, editor.marks);
            editor.marks = placeholderMarks;
          }
          Editor.insertText(editor, event.data);
          var userMarks = EDITOR_TO_USER_MARKS.get(editor);
          EDITOR_TO_USER_MARKS.delete(editor);
          if (userMarks !== undefined) {
            editor.marks = userMarks;
          }
        }
      }
    }, [attributes.onCompositionEnd, editor]),
    onCompositionUpdate: React.useCallback(event => {
      if (ReactEditor.hasSelectableTarget(editor, event.target) && !isEventHandled(event, attributes.onCompositionUpdate)) {
        if (!ReactEditor.isComposing(editor)) {
          setIsComposing(true);
          IS_COMPOSING.set(editor, true);
        }
      }
    }, [attributes.onCompositionUpdate, editor]),
    onCompositionStart: React.useCallback(event => {
      if (ReactEditor.hasSelectableTarget(editor, event.target)) {
        var _androidInputManagerR4;
        (_androidInputManagerR4 = androidInputManagerRef.current) === null || _androidInputManagerR4 === void 0 || _androidInputManagerR4.handleCompositionStart(event);
        if (isEventHandled(event, attributes.onCompositionStart) || IS_ANDROID) {
          return;
        }
        setIsComposing(true);
        var {
          selection
        } = editor;
        if (selection && Range.isExpanded(selection)) {
          Editor.deleteFragment(editor);
          return;
        }
      }
    }, [attributes.onCompositionStart, editor]),
    onCopy: React.useCallback(event => {
      if (ReactEditor.hasSelectableTarget(editor, event.target) && !isEventHandled(event, attributes.onCopy) && !isDOMEventTargetInput(event)) {
        event.preventDefault();
        ReactEditor.setFragmentData(editor, event.clipboardData, 'copy');
      }
    }, [attributes.onCopy, editor]),
    onCut: React.useCallback(event => {
      if (!readOnly && ReactEditor.hasSelectableTarget(editor, event.target) && !isEventHandled(event, attributes.onCut) && !isDOMEventTargetInput(event)) {
        event.preventDefault();
        ReactEditor.setFragmentData(editor, event.clipboardData, 'cut');
        var {
          selection
        } = editor;
        if (selection) {
          if (Range.isExpanded(selection)) {
            Editor.deleteFragment(editor);
          } else {
            var node = Node.parent(editor, selection.anchor.path);
            if (Editor.isVoid(editor, node)) {
              Transforms.delete(editor);
            }
          }
        }
      }
    }, [readOnly, editor, attributes.onCut]),
    onDragOver: React.useCallback(event => {
      if (ReactEditor.hasTarget(editor, event.target) && !isEventHandled(event, attributes.onDragOver)) {
        // Only when the target is void, call `preventDefault` to signal
        // that drops are allowed. Editable content is droppable by
        // default, and calling `preventDefault` hides the cursor.
        var node = ReactEditor.toSlateNode(editor, event.target);
        if (Element$2.isElement(node) && Editor.isVoid(editor, node)) {
          event.preventDefault();
        }
      }
    }, [attributes.onDragOver, editor]),
    onDragStart: React.useCallback(event => {
      if (!readOnly && ReactEditor.hasTarget(editor, event.target) && !isEventHandled(event, attributes.onDragStart)) {
        var node = ReactEditor.toSlateNode(editor, event.target);
        var path = ReactEditor.findPath(editor, node);
        var voidMatch = Element$2.isElement(node) && Editor.isVoid(editor, node) || Editor.void(editor, {
          at: path,
          voids: true
        });
        // If starting a drag on a void node, make sure it is selected
        // so that it shows up in the selection's fragment.
        if (voidMatch) {
          var range = Editor.range(editor, path);
          Transforms.select(editor, range);
        }
        state.isDraggingInternally = true;
        ReactEditor.setFragmentData(editor, event.dataTransfer, 'drag');
      }
    }, [readOnly, editor, attributes.onDragStart, state]),
    onDrop: React.useCallback(event => {
      if (!readOnly && ReactEditor.hasTarget(editor, event.target) && !isEventHandled(event, attributes.onDrop)) {
        event.preventDefault();
        // Keep a reference to the dragged range before updating selection
        var draggedRange = editor.selection;
        // Find the range where the drop happened
        var range = ReactEditor.findEventRange(editor, event);
        var data = event.dataTransfer;
        Transforms.select(editor, range);
        if (state.isDraggingInternally) {
          if (draggedRange && !Range.equals(draggedRange, range) && !Editor.void(editor, {
            at: range,
            voids: true
          })) {
            Transforms.delete(editor, {
              at: draggedRange
            });
          }
        }
        ReactEditor.insertData(editor, data);
        // When dragging from another source into the editor, it's possible
        // that the current editor does not have focus.
        if (!ReactEditor.isFocused(editor)) {
          ReactEditor.focus(editor);
        }
      }
    }, [readOnly, editor, attributes.onDrop, state]),
    onDragEnd: React.useCallback(event => {
      if (!readOnly && state.isDraggingInternally && attributes.onDragEnd && ReactEditor.hasTarget(editor, event.target)) {
        attributes.onDragEnd(event);
      }
    }, [readOnly, state, attributes, editor]),
    onFocus: React.useCallback(event => {
      if (!readOnly && !state.isUpdatingSelection && ReactEditor.hasEditableTarget(editor, event.target) && !isEventHandled(event, attributes.onFocus)) {
        var el = ReactEditor.toDOMNode(editor, editor);
        var root = ReactEditor.findDocumentOrShadowRoot(editor);
        state.latestElement = root.activeElement;
        // COMPAT: If the editor has nested editable elements, the focus
        // can go to them. In Firefox, this must be prevented because it
        // results in issues with keyboard navigation. (2017/03/30)
        if (IS_FIREFOX && event.target !== el) {
          el.focus();
          return;
        }
        IS_FOCUSED.set(editor, true);
      }
    }, [readOnly, state, editor, attributes.onFocus]),
    onKeyDown: React.useCallback(event => {
      if (!readOnly && ReactEditor.hasEditableTarget(editor, event.target)) {
        var _androidInputManagerR5;
        (_androidInputManagerR5 = androidInputManagerRef.current) === null || _androidInputManagerR5 === void 0 || _androidInputManagerR5.handleKeyDown(event);
        var {
          nativeEvent
        } = event;
        // COMPAT: The composition end event isn't fired reliably in all browsers,
        // so we sometimes might end up stuck in a composition state even though we
        // aren't composing any more.
        if (ReactEditor.isComposing(editor) && nativeEvent.isComposing === false) {
          IS_COMPOSING.set(editor, false);
          setIsComposing(false);
        }
        if (isEventHandled(event, attributes.onKeyDown) || ReactEditor.isComposing(editor)) {
          return;
        }
        var {
          selection
        } = editor;
        var element = editor.children[selection !== null ? selection.focus.path[0] : 0];
        var isRTL = getDirection(Node.string(element)) === 'rtl';
        // COMPAT: Since we prevent the default behavior on
        // `beforeinput` events, the browser doesn't think there's ever
        // any history stack to undo or redo, so we have to manage these
        // hotkeys ourselves. (2019/11/06)
        if (Hotkeys.isRedo(nativeEvent)) {
          event.preventDefault();
          var maybeHistoryEditor = editor;
          if (typeof maybeHistoryEditor.redo === 'function') {
            maybeHistoryEditor.redo();
          }
          return;
        }
        if (Hotkeys.isUndo(nativeEvent)) {
          event.preventDefault();
          var _maybeHistoryEditor = editor;
          if (typeof _maybeHistoryEditor.undo === 'function') {
            _maybeHistoryEditor.undo();
          }
          return;
        }
        // COMPAT: Certain browsers don't handle the selection updates
        // properly. In Chrome, the selection isn't properly extended.
        // And in Firefox, the selection isn't properly collapsed.
        // (2017/10/17)
        if (Hotkeys.isMoveLineBackward(nativeEvent)) {
          event.preventDefault();
          Transforms.move(editor, {
            unit: 'line',
            reverse: true
          });
          return;
        }
        if (Hotkeys.isMoveLineForward(nativeEvent)) {
          event.preventDefault();
          Transforms.move(editor, {
            unit: 'line'
          });
          return;
        }
        if (Hotkeys.isExtendLineBackward(nativeEvent)) {
          event.preventDefault();
          Transforms.move(editor, {
            unit: 'line',
            edge: 'focus',
            reverse: true
          });
          return;
        }
        if (Hotkeys.isExtendLineForward(nativeEvent)) {
          event.preventDefault();
          Transforms.move(editor, {
            unit: 'line',
            edge: 'focus'
          });
          return;
        }
        // COMPAT: If a void node is selected, or a zero-width text node
        // adjacent to an inline is selected, we need to handle these
        // hotkeys manually because browsers won't be able to skip over
        // the void node with the zero-width space not being an empty
        // string.
        if (Hotkeys.isMoveBackward(nativeEvent)) {
          event.preventDefault();
          if (selection && Range.isCollapsed(selection)) {
            Transforms.move(editor, {
              reverse: !isRTL
            });
          } else {
            Transforms.collapse(editor, {
              edge: isRTL ? 'end' : 'start'
            });
          }
          return;
        }
        if (Hotkeys.isMoveForward(nativeEvent)) {
          event.preventDefault();
          if (selection && Range.isCollapsed(selection)) {
            Transforms.move(editor, {
              reverse: isRTL
            });
          } else {
            Transforms.collapse(editor, {
              edge: isRTL ? 'start' : 'end'
            });
          }
          return;
        }
        if (Hotkeys.isMoveWordBackward(nativeEvent)) {
          event.preventDefault();
          if (selection && Range.isExpanded(selection)) {
            Transforms.collapse(editor, {
              edge: 'focus'
            });
          }
          Transforms.move(editor, {
            unit: 'word',
            reverse: !isRTL
          });
          return;
        }
        if (Hotkeys.isMoveWordForward(nativeEvent)) {
          event.preventDefault();
          if (selection && Range.isExpanded(selection)) {
            Transforms.collapse(editor, {
              edge: 'focus'
            });
          }
          Transforms.move(editor, {
            unit: 'word',
            reverse: isRTL
          });
          return;
        }
        // COMPAT: Certain browsers don't support the `beforeinput` event, so we
        // fall back to guessing at the input intention for hotkeys.
        // COMPAT: In iOS, some of these hotkeys are handled in the
        if (!HAS_BEFORE_INPUT_SUPPORT) {
          // We don't have a core behavior for these, but they change the
          // DOM if we don't prevent them, so we have to.
          if (Hotkeys.isBold(nativeEvent) || Hotkeys.isItalic(nativeEvent) || Hotkeys.isTransposeCharacter(nativeEvent)) {
            event.preventDefault();
            return;
          }
          if (Hotkeys.isSoftBreak(nativeEvent)) {
            event.preventDefault();
            Editor.insertSoftBreak(editor);
            return;
          }
          if (Hotkeys.isSplitBlock(nativeEvent)) {
            event.preventDefault();
            Editor.insertBreak(editor);
            return;
          }
          if (Hotkeys.isDeleteBackward(nativeEvent)) {
            event.preventDefault();
            if (selection && Range.isExpanded(selection)) {
              Editor.deleteFragment(editor, {
                direction: 'backward'
              });
            } else {
              Editor.deleteBackward(editor);
            }
            return;
          }
          if (Hotkeys.isDeleteForward(nativeEvent)) {
            event.preventDefault();
            if (selection && Range.isExpanded(selection)) {
              Editor.deleteFragment(editor, {
                direction: 'forward'
              });
            } else {
              Editor.deleteForward(editor);
            }
            return;
          }
          if (Hotkeys.isDeleteLineBackward(nativeEvent)) {
            event.preventDefault();
            if (selection && Range.isExpanded(selection)) {
              Editor.deleteFragment(editor, {
                direction: 'backward'
              });
            } else {
              Editor.deleteBackward(editor, {
                unit: 'line'
              });
            }
            return;
          }
          if (Hotkeys.isDeleteLineForward(nativeEvent)) {
            event.preventDefault();
            if (selection && Range.isExpanded(selection)) {
              Editor.deleteFragment(editor, {
                direction: 'forward'
              });
            } else {
              Editor.deleteForward(editor, {
                unit: 'line'
              });
            }
            return;
          }
          if (Hotkeys.isDeleteWordBackward(nativeEvent)) {
            event.preventDefault();
            if (selection && Range.isExpanded(selection)) {
              Editor.deleteFragment(editor, {
                direction: 'backward'
              });
            } else {
              Editor.deleteBackward(editor, {
                unit: 'word'
              });
            }
            return;
          }
          if (Hotkeys.isDeleteWordForward(nativeEvent)) {
            event.preventDefault();
            if (selection && Range.isExpanded(selection)) {
              Editor.deleteFragment(editor, {
                direction: 'forward'
              });
            } else {
              Editor.deleteForward(editor, {
                unit: 'word'
              });
            }
            return;
          }
        } else {
          if (IS_CHROME || IS_WEBKIT) {
            // COMPAT: Chrome and Safari support `beforeinput` event but do not fire
            // an event when deleting backwards in a selected void inline node
            if (selection && (Hotkeys.isDeleteBackward(nativeEvent) || Hotkeys.isDeleteForward(nativeEvent)) && Range.isCollapsed(selection)) {
              var currentNode = Node.parent(editor, selection.anchor.path);
              if (Element$2.isElement(currentNode) && Editor.isVoid(editor, currentNode) && (Editor.isInline(editor, currentNode) || Editor.isBlock(editor, currentNode))) {
                event.preventDefault();
                Editor.deleteBackward(editor, {
                  unit: 'block'
                });
                return;
              }
            }
          }
        }
      }
    }, [readOnly, editor, attributes.onKeyDown]),
    onPaste: React.useCallback(event => {
      if (!readOnly && ReactEditor.hasEditableTarget(editor, event.target) && !isEventHandled(event, attributes.onPaste)) {
        // COMPAT: Certain browsers don't support the `beforeinput` event, so we
        // fall back to React's `onPaste` here instead.
        // COMPAT: Firefox, Chrome and Safari don't emit `beforeinput` events
        // when "paste without formatting" is used, so fallback. (2020/02/20)
        // COMPAT: Safari InputEvents generated by pasting won't include
        // application/x-slate-fragment items, so use the
        // ClipboardEvent here. (2023/03/15)
        if (!HAS_BEFORE_INPUT_SUPPORT || isPlainTextOnlyPaste(event.nativeEvent) || IS_WEBKIT) {
          event.preventDefault();
          ReactEditor.insertData(editor, event.clipboardData);
        }
      }
    }, [readOnly, editor, attributes.onPaste])
  }), /*#__PURE__*/React.createElement(Children, {
    decorations: decorations,
    node: editor,
    renderElement: renderElement,
    renderPlaceholder: renderPlaceholder,
    renderLeaf: renderLeaf,
    selection: editor.selection
  })))));
});
/**
 * The default placeholder element
 */
var DefaultPlaceholder = _ref => {
  var {
    attributes,
    children
  } = _ref;
  return (
    /*#__PURE__*/
    // COMPAT: Artificially add a line-break to the end on the placeholder element
    // to prevent Android IMEs to pick up its content in autocorrect and to auto-capitalize the first letter
    React.createElement("span", _objectSpread$1({}, attributes), children, IS_ANDROID && /*#__PURE__*/React.createElement("br", null))
  );
};
/**
 * A default memoized decorate function.
 */
var defaultDecorate = () => [];
/**
 * A default implement to scroll dom range into view.
 */
var defaultScrollSelectionIntoView = (editor, domRange) => {
  // This was affecting the selection of multiple blocks and dragging behavior,
  // so enabled only if the selection has been collapsed.
  if (domRange.getBoundingClientRect && (!editor.selection || editor.selection && Range.isCollapsed(editor.selection))) {
    var leafEl = domRange.startContainer.parentElement;
    leafEl.getBoundingClientRect = domRange.getBoundingClientRect.bind(domRange);
    e(leafEl, {
      scrollMode: 'if-needed'
    });
    // @ts-expect-error an unorthodox delete D:
    delete leafEl.getBoundingClientRect;
  }
};
/**
 * Check if an event is overrided by a handler.
 */
var isEventHandled = (event, handler) => {
  if (!handler) {
    return false;
  }
  // The custom event handler may return a boolean to specify whether the event
  // shall be treated as being handled or not.
  var shouldTreatEventAsHandled = handler(event);
  if (shouldTreatEventAsHandled != null) {
    return shouldTreatEventAsHandled;
  }
  return event.isDefaultPrevented() || event.isPropagationStopped();
};
/**
 * Check if the event's target is an input element
 */
var isDOMEventTargetInput = event => {
  return isDOMNode(event.target) && (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement);
};
/**
 * Check if a DOM event is overrided by a handler.
 */
var isDOMEventHandled = (event, handler) => {
  if (!handler) {
    return false;
  }
  // The custom event handler may return a boolean to specify whether the event
  // shall be treated as being handled or not.
  var shouldTreatEventAsHandled = handler(event);
  if (shouldTreatEventAsHandled != null) {
    return shouldTreatEventAsHandled;
  }
  return event.defaultPrevented;
};

/**
 * A React context for sharing the `focused` state of the editor.
 */
var FocusedContext = /*#__PURE__*/React.createContext(false);
/**
 * Get the current `focused` state of the editor.
 */
var useFocused = () => {
  return React.useContext(FocusedContext);
};
/**
 * A React context for sharing the editor selector context in a way to control rerenders
 */
var SlateSelectorContext = /*#__PURE__*/React.createContext({});
/**
 * Create selector context with editor updating on every editor change
 */
function useSelectorContext(editor) {
  var eventListeners = React.useRef([]).current;
  var slateRef = React.useRef({
    editor
  }).current;
  var onChange = React.useCallback(editor => {
    slateRef.editor = editor;
    eventListeners.forEach(listener => listener(editor));
  }, [eventListeners, slateRef]);
  var selectorContext = React.useMemo(() => {
    return {
      getSlate: () => slateRef.editor,
      addEventListener: callback => {
        eventListeners.push(callback);
        return () => {
          eventListeners.splice(eventListeners.indexOf(callback), 1);
        };
      }
    };
  }, [eventListeners, slateRef]);
  return {
    selectorContext,
    onChange
  };
}

var _excluded = ["editor", "children", "onChange", "onSelectionChange", "onValueChange", "initialValue"];
/**
 * A wrapper around the provider to handle `onChange` events, because the editor
 * is a mutable singleton so it won't ever register as "changed" otherwise.
 */
var Slate = props => {
  var {
      editor,
      children,
      onChange,
      onSelectionChange,
      onValueChange,
      initialValue
    } = props,
    rest = _objectWithoutProperties(props, _excluded);
  var [context, setContext] = React.useState(() => {
    if (!Node.isNodeList(initialValue)) {
      throw new Error("[Slate] initialValue is invalid! Expected a list of elements but got: ".concat(Scrubber.stringify(initialValue)));
    }
    if (!Editor.isEditor(editor)) {
      throw new Error("[Slate] editor is invalid! You passed: ".concat(Scrubber.stringify(editor)));
    }
    editor.children = initialValue;
    Object.assign(editor, rest);
    return {
      v: 0,
      editor
    };
  });
  var {
    selectorContext,
    onChange: handleSelectorChange
  } = useSelectorContext(editor);
  var onContextChange = React.useCallback(options => {
    var _options$operation;
    if (onChange) {
      onChange(editor.children);
    }
    switch (options === null || options === void 0 || (_options$operation = options.operation) === null || _options$operation === void 0 ? void 0 : _options$operation.type) {
      case 'set_selection':
        onSelectionChange === null || onSelectionChange === void 0 || onSelectionChange(editor.selection);
        break;
      default:
        onValueChange === null || onValueChange === void 0 || onValueChange(editor.children);
    }
    setContext(prevContext => ({
      v: prevContext.v + 1,
      editor
    }));
    handleSelectorChange(editor);
  }, [editor, handleSelectorChange, onChange, onSelectionChange, onValueChange]);
  React.useEffect(() => {
    EDITOR_TO_ON_CHANGE.set(editor, onContextChange);
    return () => {
      EDITOR_TO_ON_CHANGE.set(editor, () => {});
    };
  }, [editor, onContextChange]);
  var [isFocused, setIsFocused] = React.useState(ReactEditor.isFocused(editor));
  React.useEffect(() => {
    setIsFocused(ReactEditor.isFocused(editor));
  }, [editor]);
  useIsomorphicLayoutEffect(() => {
    var fn = () => setIsFocused(ReactEditor.isFocused(editor));
    if (REACT_MAJOR_VERSION >= 17) {
      // In React >= 17 onFocus and onBlur listen to the focusin and focusout events during the bubbling phase.
      // Therefore in order for <Editable />'s handlers to run first, which is necessary for ReactEditor.isFocused(editor)
      // to return the correct value, we have to listen to the focusin and focusout events without useCapture here.
      document.addEventListener('focusin', fn);
      document.addEventListener('focusout', fn);
      return () => {
        document.removeEventListener('focusin', fn);
        document.removeEventListener('focusout', fn);
      };
    } else {
      document.addEventListener('focus', fn, true);
      document.addEventListener('blur', fn, true);
      return () => {
        document.removeEventListener('focus', fn, true);
        document.removeEventListener('blur', fn, true);
      };
    }
  }, []);
  return /*#__PURE__*/React.createElement(SlateSelectorContext.Provider, {
    value: selectorContext
  }, /*#__PURE__*/React.createElement(SlateContext.Provider, {
    value: context
  }, /*#__PURE__*/React.createElement(EditorContext.Provider, {
    value: context.editor
  }, /*#__PURE__*/React.createElement(FocusedContext.Provider, {
    value: isFocused
  }, children))));
};

/**
 * Utilities for single-line deletion
 */
var doRectsIntersect = (rect, compareRect) => {
  var middle = (compareRect.top + compareRect.bottom) / 2;
  return rect.top <= middle && rect.bottom >= middle;
};
var areRangesSameLine = (editor, range1, range2) => {
  var rect1 = ReactEditor.toDOMRange(editor, range1).getBoundingClientRect();
  var rect2 = ReactEditor.toDOMRange(editor, range2).getBoundingClientRect();
  return doRectsIntersect(rect1, rect2) && doRectsIntersect(rect2, rect1);
};
/**
 * A helper utility that returns the end portion of a `Range`
 * which is located on a single line.
 *
 * @param {Editor} editor The editor object to compare against
 * @param {Range} parentRange The parent range to compare against
 * @returns {Range} A valid portion of the parentRange which is one a single line
 */
var findCurrentLineRange = (editor, parentRange) => {
  var parentRangeBoundary = Editor.range(editor, Range.end(parentRange));
  var positions = Array.from(Editor.positions(editor, {
    at: parentRange
  }));
  var left = 0;
  var right = positions.length;
  var middle = Math.floor(right / 2);
  if (areRangesSameLine(editor, Editor.range(editor, positions[left]), parentRangeBoundary)) {
    return Editor.range(editor, positions[left], parentRangeBoundary);
  }
  if (positions.length < 2) {
    return Editor.range(editor, positions[positions.length - 1], parentRangeBoundary);
  }
  while (middle !== positions.length && middle !== left) {
    if (areRangesSameLine(editor, Editor.range(editor, positions[middle]), parentRangeBoundary)) {
      right = middle;
    } else {
      left = middle;
    }
    middle = Math.floor((left + right) / 2);
  }
  return Editor.range(editor, positions[right], parentRangeBoundary);
};

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/**
 * `withReact` adds React and DOM specific behaviors to the editor.
 *
 * If you are using TypeScript, you must extend Slate's CustomTypes to use
 * this plugin.
 *
 * See https://docs.slatejs.org/concepts/11-typescript to learn how.
 */
var withReact = function withReact(editor) {
  var clipboardFormatKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'x-slate-fragment';
  var e = editor;
  var {
    apply,
    onChange,
    deleteBackward,
    addMark,
    removeMark
  } = e;
  // The WeakMap which maps a key to a specific HTMLElement must be scoped to the editor instance to
  // avoid collisions between editors in the DOM that share the same value.
  EDITOR_TO_KEY_TO_ELEMENT.set(e, new WeakMap());
  e.addMark = (key, value) => {
    var _EDITOR_TO_SCHEDULE_F, _EDITOR_TO_PENDING_DI;
    (_EDITOR_TO_SCHEDULE_F = EDITOR_TO_SCHEDULE_FLUSH.get(e)) === null || _EDITOR_TO_SCHEDULE_F === void 0 || _EDITOR_TO_SCHEDULE_F();
    if (!EDITOR_TO_PENDING_INSERTION_MARKS.get(e) && (_EDITOR_TO_PENDING_DI = EDITOR_TO_PENDING_DIFFS.get(e)) !== null && _EDITOR_TO_PENDING_DI !== void 0 && _EDITOR_TO_PENDING_DI.length) {
      // Ensure the current pending diffs originating from changes before the addMark
      // are applied with the current formatting
      EDITOR_TO_PENDING_INSERTION_MARKS.set(e, null);
    }
    EDITOR_TO_USER_MARKS.delete(e);
    addMark(key, value);
  };
  e.removeMark = key => {
    var _EDITOR_TO_PENDING_DI2;
    if (!EDITOR_TO_PENDING_INSERTION_MARKS.get(e) && (_EDITOR_TO_PENDING_DI2 = EDITOR_TO_PENDING_DIFFS.get(e)) !== null && _EDITOR_TO_PENDING_DI2 !== void 0 && _EDITOR_TO_PENDING_DI2.length) {
      // Ensure the current pending diffs originating from changes before the addMark
      // are applied with the current formatting
      EDITOR_TO_PENDING_INSERTION_MARKS.set(e, null);
    }
    EDITOR_TO_USER_MARKS.delete(e);
    removeMark(key);
  };
  e.deleteBackward = unit => {
    if (unit !== 'line') {
      return deleteBackward(unit);
    }
    if (e.selection && Range.isCollapsed(e.selection)) {
      var parentBlockEntry = Editor.above(e, {
        match: n => Element$2.isElement(n) && Editor.isBlock(e, n),
        at: e.selection
      });
      if (parentBlockEntry) {
        var [, parentBlockPath] = parentBlockEntry;
        var parentElementRange = Editor.range(e, parentBlockPath, e.selection.anchor);
        var currentLineRange = findCurrentLineRange(e, parentElementRange);
        if (!Range.isCollapsed(currentLineRange)) {
          Transforms.delete(e, {
            at: currentLineRange
          });
        }
      }
    }
  };
  // This attempts to reset the NODE_TO_KEY entry to the correct value
  // as apply() changes the object reference and hence invalidates the NODE_TO_KEY entry
  e.apply = op => {
    var matches = [];
    var pathRefMatches = [];
    var pendingDiffs = EDITOR_TO_PENDING_DIFFS.get(e);
    if (pendingDiffs !== null && pendingDiffs !== void 0 && pendingDiffs.length) {
      var transformed = pendingDiffs.map(textDiff => transformTextDiff(textDiff, op)).filter(Boolean);
      EDITOR_TO_PENDING_DIFFS.set(e, transformed);
    }
    var pendingSelection = EDITOR_TO_PENDING_SELECTION.get(e);
    if (pendingSelection) {
      EDITOR_TO_PENDING_SELECTION.set(e, transformPendingRange(e, pendingSelection, op));
    }
    var pendingAction = EDITOR_TO_PENDING_ACTION.get(e);
    if (pendingAction !== null && pendingAction !== void 0 && pendingAction.at) {
      var at = Point.isPoint(pendingAction === null || pendingAction === void 0 ? void 0 : pendingAction.at) ? transformPendingPoint(e, pendingAction.at, op) : transformPendingRange(e, pendingAction.at, op);
      EDITOR_TO_PENDING_ACTION.set(e, at ? _objectSpread(_objectSpread({}, pendingAction), {}, {
        at
      }) : null);
    }
    switch (op.type) {
      case 'insert_text':
      case 'remove_text':
      case 'set_node':
      case 'split_node':
        {
          matches.push(...getMatches(e, op.path));
          break;
        }
      case 'set_selection':
        {
          var _EDITOR_TO_USER_SELEC;
          // Selection was manually set, don't restore the user selection after the change.
          (_EDITOR_TO_USER_SELEC = EDITOR_TO_USER_SELECTION.get(e)) === null || _EDITOR_TO_USER_SELEC === void 0 || _EDITOR_TO_USER_SELEC.unref();
          EDITOR_TO_USER_SELECTION.delete(e);
          break;
        }
      case 'insert_node':
      case 'remove_node':
        {
          matches.push(...getMatches(e, Path.parent(op.path)));
          break;
        }
      case 'merge_node':
        {
          var prevPath = Path.previous(op.path);
          matches.push(...getMatches(e, prevPath));
          break;
        }
      case 'move_node':
        {
          var commonPath = Path.common(Path.parent(op.path), Path.parent(op.newPath));
          matches.push(...getMatches(e, commonPath));
          var changedPath;
          if (Path.isBefore(op.path, op.newPath)) {
            matches.push(...getMatches(e, Path.parent(op.path)));
            changedPath = op.newPath;
          } else {
            matches.push(...getMatches(e, Path.parent(op.newPath)));
            changedPath = op.path;
          }
          var changedNode = Node.get(editor, Path.parent(changedPath));
          var changedNodeKey = ReactEditor.findKey(e, changedNode);
          var changedPathRef = Editor.pathRef(e, Path.parent(changedPath));
          pathRefMatches.push([changedPathRef, changedNodeKey]);
          break;
        }
    }
    apply(op);
    for (var [path, key] of matches) {
      var [node] = Editor.node(e, path);
      NODE_TO_KEY.set(node, key);
    }
    for (var [pathRef, _key] of pathRefMatches) {
      if (pathRef.current) {
        var [_node] = Editor.node(e, pathRef.current);
        NODE_TO_KEY.set(_node, _key);
      }
    }
  };
  e.setFragmentData = data => {
    var {
      selection
    } = e;
    if (!selection) {
      return;
    }
    var [start, end] = Range.edges(selection);
    var startVoid = Editor.void(e, {
      at: start.path
    });
    var endVoid = Editor.void(e, {
      at: end.path
    });
    if (Range.isCollapsed(selection) && !startVoid) {
      return;
    }
    // Create a fake selection so that we can add a Base64-encoded copy of the
    // fragment to the HTML, to decode on future pastes.
    var domRange = ReactEditor.toDOMRange(e, selection);
    var contents = domRange.cloneContents();
    var attach = contents.childNodes[0];
    // Make sure attach is non-empty, since empty nodes will not get copied.
    contents.childNodes.forEach(node => {
      if (node.textContent && node.textContent.trim() !== '') {
        attach = node;
      }
    });
    // COMPAT: If the end node is a void node, we need to move the end of the
    // range from the void node's spacer span, to the end of the void node's
    // content, since the spacer is before void's content in the DOM.
    if (endVoid) {
      var [voidNode] = endVoid;
      var r = domRange.cloneRange();
      var domNode = ReactEditor.toDOMNode(e, voidNode);
      r.setEndAfter(domNode);
      contents = r.cloneContents();
    }
    // COMPAT: If the start node is a void node, we need to attach the encoded
    // fragment to the void node's content node instead of the spacer, because
    // attaching it to empty `<div>/<span>` nodes will end up having it erased by
    // most browsers. (2018/04/27)
    if (startVoid) {
      attach = contents.querySelector('[data-slate-spacer]');
    }
    // Remove any zero-width space spans from the cloned DOM so that they don't
    // show up elsewhere when pasted.
    Array.from(contents.querySelectorAll('[data-slate-zero-width]')).forEach(zw => {
      var isNewline = zw.getAttribute('data-slate-zero-width') === 'n';
      zw.textContent = isNewline ? '\n' : '';
    });
    // Set a `data-slate-fragment` attribute on a non-empty node, so it shows up
    // in the HTML, and can be used for intra-Slate pasting. If it's a text
    // node, wrap it in a `<span>` so we have something to set an attribute on.
    if (isDOMText(attach)) {
      var span = attach.ownerDocument.createElement('span');
      // COMPAT: In Chrome and Safari, if we don't add the `white-space` style
      // then leading and trailing spaces will be ignored. (2017/09/21)
      span.style.whiteSpace = 'pre';
      span.appendChild(attach);
      contents.appendChild(span);
      attach = span;
    }
    var fragment = e.getFragment();
    var string = JSON.stringify(fragment);
    var encoded = window.btoa(encodeURIComponent(string));
    attach.setAttribute('data-slate-fragment', encoded);
    data.setData("application/".concat(clipboardFormatKey), encoded);
    // Add the content to a <div> so that we can get its inner HTML.
    var div = contents.ownerDocument.createElement('div');
    div.appendChild(contents);
    div.setAttribute('hidden', 'true');
    contents.ownerDocument.body.appendChild(div);
    data.setData('text/html', div.innerHTML);
    data.setData('text/plain', getPlainText(div));
    contents.ownerDocument.body.removeChild(div);
    return data;
  };
  e.insertData = data => {
    if (!e.insertFragmentData(data)) {
      e.insertTextData(data);
    }
  };
  e.insertFragmentData = data => {
    /**
     * Checking copied fragment from application/x-slate-fragment or data-slate-fragment
     */
    var fragment = data.getData("application/".concat(clipboardFormatKey)) || getSlateFragmentAttribute(data);
    if (fragment) {
      var decoded = decodeURIComponent(window.atob(fragment));
      var parsed = JSON.parse(decoded);
      e.insertFragment(parsed);
      return true;
    }
    return false;
  };
  e.insertTextData = data => {
    var text = data.getData('text/plain');
    if (text) {
      var lines = text.split(/\r\n|\r|\n/);
      var split = false;
      for (var line of lines) {
        if (split) {
          Transforms.splitNodes(e, {
            always: true
          });
        }
        e.insertText(line);
        split = true;
      }
      return true;
    }
    return false;
  };
  e.onChange = options => {
    // COMPAT: React < 18 doesn't batch `setState` hook calls, which means
    // that the children and selection can get out of sync for one render
    // pass. So we have to use this unstable API to ensure it batches them.
    // (2019/12/03)
    // https://github.com/facebook/react/issues/14259#issuecomment-439702367
    var maybeBatchUpdates = REACT_MAJOR_VERSION < 18 ? ReactDOM.unstable_batchedUpdates : callback => callback();
    maybeBatchUpdates(() => {
      var onContextChange = EDITOR_TO_ON_CHANGE.get(e);
      if (onContextChange) {
        onContextChange(options);
      }
      onChange(options);
    });
  };
  return e;
};
var getMatches = (e, path) => {
  var matches = [];
  for (var [n, p] of Editor.levels(e, {
    at: path
  })) {
    var key = ReactEditor.findKey(e, n);
    matches.push([p, key]);
  }
  return matches;
};

// eslint-disable-next-line no-redeclare
var History = {
  /**
   * Check if a value is a `History` object.
   */
  isHistory(value) {
    return isPlainObject$1(value) && Array.isArray(value.redos) && Array.isArray(value.undos) && (value.redos.length === 0 || Operation.isOperationList(value.redos[0].operations)) && (value.undos.length === 0 || Operation.isOperationList(value.undos[0].operations));
  }
};
var SAVING = new WeakMap();
var MERGING = new WeakMap();
// eslint-disable-next-line no-redeclare
var HistoryEditor = {
  /**
   * Check if a value is a `HistoryEditor` object.
   */
  isHistoryEditor(value) {
    return History.isHistory(value.history) && Editor.isEditor(value);
  },
  /**
   * Get the merge flag's current value.
   */
  isMerging(editor) {
    return MERGING.get(editor);
  },
  /**
   * Get the saving flag's current value.
   */
  isSaving(editor) {
    return SAVING.get(editor);
  },
  /**
   * Redo to the previous saved state.
   */
  redo(editor) {
    editor.redo();
  },
  /**
   * Undo to the previous saved state.
   */
  undo(editor) {
    editor.undo();
  },
  /**
   * Apply a series of changes inside a synchronous `fn`, without merging any of
   * the new operations into previous save point in the history.
   */
  withoutMerging(editor, fn) {
    var prev = HistoryEditor.isMerging(editor);
    MERGING.set(editor, false);
    fn();
    MERGING.set(editor, prev);
  },
  /**
   * Apply a series of changes inside a synchronous `fn`, without saving any of
   * their operations into the history.
   */
  withoutSaving(editor, fn) {
    var prev = HistoryEditor.isSaving(editor);
    SAVING.set(editor, false);
    fn();
    SAVING.set(editor, prev);
  }
};

/**
 * The `withHistory` plugin keeps track of the operation history of a Slate
 * editor as operations are applied to it, using undo and redo stacks.
 *
 * If you are using TypeScript, you must extend Slate's CustomTypes to use
 * this plugin.
 *
 * See https://docs.slatejs.org/concepts/11-typescript to learn how.
 */
var withHistory = editor => {
  var e = editor;
  var {
    apply
  } = e;
  e.history = {
    undos: [],
    redos: []
  };
  e.redo = () => {
    var {
      history
    } = e;
    var {
      redos
    } = history;
    if (redos.length > 0) {
      var batch = redos[redos.length - 1];
      if (batch.selectionBefore) {
        Transforms.setSelection(e, batch.selectionBefore);
      }
      HistoryEditor.withoutSaving(e, () => {
        Editor.withoutNormalizing(e, () => {
          for (var op of batch.operations) {
            e.apply(op);
          }
        });
      });
      history.redos.pop();
      e.writeHistory('undos', batch);
    }
  };
  e.undo = () => {
    var {
      history
    } = e;
    var {
      undos
    } = history;
    if (undos.length > 0) {
      var batch = undos[undos.length - 1];
      HistoryEditor.withoutSaving(e, () => {
        Editor.withoutNormalizing(e, () => {
          var inverseOps = batch.operations.map(Operation.inverse).reverse();
          for (var op of inverseOps) {
            e.apply(op);
          }
          if (batch.selectionBefore) {
            Transforms.setSelection(e, batch.selectionBefore);
          }
        });
      });
      e.writeHistory('redos', batch);
      history.undos.pop();
    }
  };
  e.apply = op => {
    var {
      operations,
      history
    } = e;
    var {
      undos
    } = history;
    var lastBatch = undos[undos.length - 1];
    var lastOp = lastBatch && lastBatch.operations[lastBatch.operations.length - 1];
    var save = HistoryEditor.isSaving(e);
    var merge = HistoryEditor.isMerging(e);
    if (save == null) {
      save = shouldSave(op);
    }
    if (save) {
      if (merge == null) {
        if (lastBatch == null) {
          merge = false;
        } else if (operations.length !== 0) {
          merge = true;
        } else {
          merge = shouldMerge(op, lastOp);
        }
      }
      if (lastBatch && merge) {
        lastBatch.operations.push(op);
      } else {
        var batch = {
          operations: [op],
          selectionBefore: e.selection
        };
        e.writeHistory('undos', batch);
      }
      while (undos.length > 100) {
        undos.shift();
      }
      history.redos = [];
    }
    apply(op);
  };
  e.writeHistory = (stack, batch) => {
    e.history[stack].push(batch);
  };
  return e;
};
/**
 * Check whether to merge an operation into the previous operation.
 */
var shouldMerge = (op, prev) => {
  if (prev && op.type === 'insert_text' && prev.type === 'insert_text' && op.offset === prev.offset + prev.text.length && Path.equals(op.path, prev.path)) {
    return true;
  }
  if (prev && op.type === 'remove_text' && prev.type === 'remove_text' && op.offset + op.text.length === prev.offset && Path.equals(op.path, prev.path)) {
    return true;
  }
  return false;
};
/**
 * Check whether an operation needs to be saved to the history.
 */
var shouldSave = (op, prev) => {
  if (op.type === 'set_selection') {
    return false;
  }
  return true;
};

function ArrowLeftIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/React__namespace.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React__namespace.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/React__namespace.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
  }));
}
const ForwardRef$m = /*#__PURE__*/ React__namespace.forwardRef(ArrowLeftIcon);

function ArrowRightIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/React__namespace.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React__namespace.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/React__namespace.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
  }));
}
const ForwardRef$l = /*#__PURE__*/ React__namespace.forwardRef(ArrowRightIcon);

function ArrowTopRightOnSquareIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/React__namespace.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React__namespace.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/React__namespace.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
  }));
}
const ForwardRef$k = /*#__PURE__*/ React__namespace.forwardRef(ArrowTopRightOnSquareIcon);

function ArrowUturnLeftIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/React__namespace.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React__namespace.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/React__namespace.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
  }));
}
const ForwardRef$j = /*#__PURE__*/ React__namespace.forwardRef(ArrowUturnLeftIcon);

function ArrowUturnRightIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/React__namespace.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React__namespace.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/React__namespace.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3"
  }));
}
const ForwardRef$i = /*#__PURE__*/ React__namespace.forwardRef(ArrowUturnRightIcon);

function ArrowsPointingInIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/React__namespace.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React__namespace.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/React__namespace.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"
  }));
}
const ForwardRef$h = /*#__PURE__*/ React__namespace.forwardRef(ArrowsPointingInIcon);

function ArrowsPointingOutIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/React__namespace.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React__namespace.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/React__namespace.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
  }));
}
const ForwardRef$g = /*#__PURE__*/ React__namespace.forwardRef(ArrowsPointingOutIcon);

function Bars3BottomLeftIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/React__namespace.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React__namespace.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/React__namespace.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
  }));
}
const ForwardRef$f = /*#__PURE__*/ React__namespace.forwardRef(Bars3BottomLeftIcon);

function Bars3BottomRightIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/React__namespace.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React__namespace.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/React__namespace.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
  }));
}
const ForwardRef$e = /*#__PURE__*/ React__namespace.forwardRef(Bars3BottomRightIcon);

function Bars3Icon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/React__namespace.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React__namespace.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/React__namespace.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
  }));
}
const ForwardRef$d = /*#__PURE__*/ React__namespace.forwardRef(Bars3Icon);

function ChevronDownIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/React__namespace.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React__namespace.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/React__namespace.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m19.5 8.25-7.5 7.5-7.5-7.5"
  }));
}
const ForwardRef$c = /*#__PURE__*/ React__namespace.forwardRef(ChevronDownIcon);

function ChevronLeftIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/React__namespace.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React__namespace.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/React__namespace.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.75 19.5 8.25 12l7.5-7.5"
  }));
}
const ForwardRef$b = /*#__PURE__*/ React__namespace.forwardRef(ChevronLeftIcon);

function ChevronRightIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/React__namespace.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React__namespace.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/React__namespace.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m8.25 4.5 7.5 7.5-7.5 7.5"
  }));
}
const ForwardRef$a = /*#__PURE__*/ React__namespace.forwardRef(ChevronRightIcon);

function CodeBracketIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/React__namespace.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React__namespace.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/React__namespace.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
  }));
}
const ForwardRef$9 = /*#__PURE__*/ React__namespace.forwardRef(CodeBracketIcon);

function LinkIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/React__namespace.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React__namespace.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/React__namespace.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
  }));
}
const ForwardRef$8 = /*#__PURE__*/ React__namespace.forwardRef(LinkIcon);

function ListBulletIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/React__namespace.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React__namespace.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/React__namespace.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
  }));
}
const ForwardRef$7 = /*#__PURE__*/ React__namespace.forwardRef(ListBulletIcon);

function MagnifyingGlassIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/React__namespace.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React__namespace.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/React__namespace.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
  }));
}
const ForwardRef$6 = /*#__PURE__*/ React__namespace.forwardRef(MagnifyingGlassIcon);

function MinusIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/React__namespace.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React__namespace.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/React__namespace.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M5 12h14"
  }));
}
const ForwardRef$5 = /*#__PURE__*/ React__namespace.forwardRef(MinusIcon);

function PhotoIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/React__namespace.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React__namespace.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/React__namespace.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
  }));
}
const ForwardRef$4 = /*#__PURE__*/ React__namespace.forwardRef(PhotoIcon);

function PlusIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/React__namespace.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React__namespace.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/React__namespace.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 4.5v15m7.5-7.5h-15"
  }));
}
const ForwardRef$3 = /*#__PURE__*/ React__namespace.forwardRef(PlusIcon);

function TableCellsIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/React__namespace.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React__namespace.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/React__namespace.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
  }));
}
const ForwardRef$2 = /*#__PURE__*/ React__namespace.forwardRef(TableCellsIcon);

function TrashIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/React__namespace.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React__namespace.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/React__namespace.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
  }));
}
const ForwardRef$1 = /*#__PURE__*/ React__namespace.forwardRef(TrashIcon);

function XMarkIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/React__namespace.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React__namespace.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/React__namespace.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M6 18 18 6M6 6l12 12"
  }));
}
const ForwardRef = /*#__PURE__*/ React__namespace.forwardRef(XMarkIcon);

// Check if an alignment is active
var isAlignmentActive = function (editor, alignment) {
    var selection = editor.selection;
    if (!selection)
        return false;
    var match = Array.from(Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: function (n) {
            return !Editor.isEditor(n) &&
                Element$2.isElement(n) &&
                n.align === alignment;
        },
    }))[0];
    return !!match;
};
// Toggle alignment
var toggleAlignment = function (editor, alignment) {
    var isActive = isAlignmentActive(editor, alignment);
    Transforms.setNodes(editor, { align: isActive ? undefined : alignment }, {
        match: function (n) {
            return !Editor.isEditor(n) &&
                Element$2.isElement(n) &&
                ['paragraph', 'heading-one', 'heading-two', 'heading-three', 'heading-four', 'heading-five', 'heading-six', 'heading-seven', 'heading-eight'].includes(n.type);
        }
    });
};
// Indent list item
var indentListItem = function (editor) {
    var selection = editor.selection;
    if (!selection)
        return;
    // First, ensure we're in a list item
    var listItemMatch = Array.from(Editor.nodes(editor, {
        match: function (n) {
            return !Editor.isEditor(n) &&
                Element$2.isElement(n) &&
                n.type === 'list-item';
        },
    }))[0];
    if (!listItemMatch)
        return;
    // Get the parent list to determine list type
    var listMatch = Array.from(Editor.nodes(editor, {
        match: function (n) {
            return !Editor.isEditor(n) &&
                Element$2.isElement(n) &&
                ['bulleted-list', 'numbered-list'].includes(n.type);
        },
    }))[0];
    if (listMatch) {
        var parentList = listMatch[0];
        var listType = parentList.type;
        // Wrap the current list item in a new nested list
        Transforms.wrapNodes(editor, { type: listType, children: [] }, {
            match: function (n) {
                return !Editor.isEditor(n) &&
                    Element$2.isElement(n) &&
                    n.type === 'list-item';
            },
        });
    }
};
// Outdent list item  
var outdentListItem = function (editor) {
    var selection = editor.selection;
    if (!selection)
        return;
    // Check if we're in a nested list structure
    var listNodes = Array.from(Editor.nodes(editor, {
        match: function (n) {
            return !Editor.isEditor(n) &&
                Element$2.isElement(n) &&
                ['bulleted-list', 'numbered-list'].includes(n.type);
        },
    }));
    // If we have multiple list levels (nested), unwrap one level
    if (listNodes.length > 1) {
        Transforms.unwrapNodes(editor, {
            match: function (n) {
                return !Editor.isEditor(n) &&
                    Element$2.isElement(n) &&
                    ['bulleted-list', 'numbered-list'].includes(n.type);
            },
            split: true,
        });
    }
    else if (listNodes.length === 1) {
        // If only one list level, convert to paragraph
        Transforms.unwrapNodes(editor, {
            match: function (n) {
                return !Editor.isEditor(n) &&
                    Element$2.isElement(n) &&
                    ['bulleted-list', 'numbered-list'].includes(n.type);
            },
        });
        Transforms.setNodes(editor, { type: 'paragraph' }, {
            match: function (n) {
                return !Editor.isEditor(n) &&
                    Element$2.isElement(n) &&
                    n.type === 'list-item';
            }
        });
    }
};
// Check if a mark is active
var isMarkActive = function (editor, format) {
    var marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
};
// Check if a block type is active
var isBlockActive = function (editor, format) {
    var selection = editor.selection;
    if (!selection)
        return false;
    var match = Array.from(Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: function (n) {
            return !Editor.isEditor(n) &&
                Element$2.isElement(n) &&
                n.type === format;
        },
    }))[0];
    return !!match;
};
// Toggle a mark
var toggleMark = function (editor, format) {
    var isActive = isMarkActive(editor, format);
    if (isActive) {
        Editor.removeMark(editor, format);
    }
    else {
        Editor.addMark(editor, format, true);
    }
};
// Apply color to text
var applyColor = function (editor, color) {
    if (color === null) {
        Editor.removeMark(editor, 'color');
    }
    else {
        Editor.addMark(editor, 'color', color);
    }
};
// Apply background color to text
var applyBackgroundColor = function (editor, color) {
    if (color === null) {
        Editor.removeMark(editor, 'backgroundColor');
    }
    else {
        Editor.addMark(editor, 'backgroundColor', color);
    }
};
// Get active color
var getActiveColor = function (editor) {
    var marks = Editor.marks(editor);
    return (marks === null || marks === void 0 ? void 0 : marks.color) ? String(marks.color) : null;
};
// Get active background color
var getActiveBackgroundColor = function (editor) {
    var marks = Editor.marks(editor);
    return (marks === null || marks === void 0 ? void 0 : marks.backgroundColor) ? String(marks.backgroundColor) : null;
};
// Toggle a block type
var toggleBlock = function (editor, format) {
    var isActive = isBlockActive(editor, format);
    var isList = ['bulleted-list', 'numbered-list'].includes(format);
    Transforms.unwrapNodes(editor, {
        match: function (n) {
            return !Editor.isEditor(n) &&
                Element$2.isElement(n) &&
                ['bulleted-list', 'numbered-list'].includes(n.type);
        },
        split: true,
    });
    var newProperties;
    if (format === 'list-item') {
        newProperties = { type: isActive ? 'paragraph' : 'list-item' };
    }
    else {
        newProperties = { type: isActive ? 'paragraph' : isList ? 'list-item' : format };
    }
    Transforms.setNodes(editor, newProperties);
    if (!isActive && isList) {
        var block = { type: format, children: [] };
        Transforms.wrapNodes(editor, block);
    }
};
// Insert horizontal rule
var insertHorizontalRule = function (editor) {
    var hr = {
        type: 'horizontal-rule',
        children: [{ text: '' }],
    };
    Transforms.insertNodes(editor, hr);
    // Insert a new paragraph after the horizontal rule
    var paragraph = {
        type: 'paragraph',
        children: [{ text: '' }],
    };
    Transforms.insertNodes(editor, paragraph);
};
// Insert image
var insertImage = function (editor, url, alt, width) {
    var image = {
        type: 'image',
        url: url,
        alt: alt || 'Image',
        width: width,
        children: [{ text: '' }],
    };
    Transforms.insertNodes(editor, image);
    // Insert a new paragraph after the image for continued editing
    var paragraph = {
        type: 'paragraph',
        children: [{ text: '' }],
    };
    Transforms.insertNodes(editor, paragraph);
};
// Validate image URL
var isValidImageUrl = function (url) {
    try {
        var parsedUrl = new URL(url);
        var imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.bmp', '.ico'];
        var pathname_1 = parsedUrl.pathname.toLowerCase();
        return imageExtensions.some(function (ext) { return pathname_1.endsWith(ext); }) ||
            parsedUrl.protocol === 'data:' || // Support data URLs
            pathname_1.includes('/image') || // Common image path patterns
            parsedUrl.hostname.includes('cdn') || // CDN URLs
            parsedUrl.hostname.includes('imgur') ||
            parsedUrl.hostname.includes('unsplash');
    }
    catch (_a) {
        return false;
    }
};
// Insert a link
var insertLink = function (editor, url, title, target) {
    if (editor.selection) {
        wrapLink(editor, url, title, target);
    }
};
var isLinkActive = function (editor) {
    var link = Array.from(Editor.nodes(editor, {
        match: function (n) {
            return !Editor.isEditor(n) &&
                Element$2.isElement(n) &&
                n.type === 'link';
        },
    }))[0];
    return !!link;
};
var unwrapLink = function (editor) {
    Transforms.unwrapNodes(editor, {
        match: function (n) {
            return !Editor.isEditor(n) &&
                Element$2.isElement(n) &&
                n.type === 'link';
        },
    });
};
var wrapLink = function (editor, url, title, target) {
    if (isLinkActive(editor)) {
        unwrapLink(editor);
    }
    var selection = editor.selection;
    var isCollapsed = selection && Range.isCollapsed(selection);
    var link = __assign(__assign(__assign({ type: 'link', url: url }, (title && { title: title })), (target && { target: target })), { children: isCollapsed ? [{ text: url }] : [] });
    if (isCollapsed) {
        Transforms.insertNodes(editor, link);
    }
    else {
        Transforms.wrapNodes(editor, link, { split: true });
        Transforms.collapse(editor, { edge: 'end' });
    }
};
// Insert table
var insertTable = function (editor, rows, cols) {
    if (rows === void 0) { rows = 3; }
    if (cols === void 0) { cols = 3; }
    var tableRows = [];
    for (var i = 0; i < rows; i++) {
        var cells = [];
        for (var j = 0; j < cols; j++) {
            cells.push({
                type: 'table-cell',
                children: [{ text: '' }],
            });
        }
        tableRows.push({
            type: 'table-row',
            children: cells,
        });
    }
    var table = {
        type: 'table',
        children: tableRows,
    };
    var paragraph = {
        type: 'paragraph',
        children: [{ text: '' }],
    };
    // Insert both table and paragraph at once
    Transforms.insertNodes(editor, [table, paragraph]);
};
// Check if we're currently in a table
var isInTable = function (editor) {
    var selection = editor.selection;
    if (!selection)
        return false;
    var tableMatch = Array.from(Editor.nodes(editor, {
        at: selection,
        match: function (n) {
            return !Editor.isEditor(n) &&
                Element$2.isElement(n) &&
                n.type === 'table';
        },
    }))[0];
    return !!tableMatch;
};
// Add table row
var addTableRow = function (editor) {
    var _a;
    var selection = editor.selection;
    if (!selection)
        return;
    // Find the table
    var tableMatch = Array.from(Editor.nodes(editor, {
        at: selection,
        match: function (n) {
            return !Editor.isEditor(n) &&
                Element$2.isElement(n) &&
                n.type === 'table';
        },
    }))[0];
    if (!tableMatch)
        return;
    var _b = tableMatch, table = _b[0], tablePath = _b[1];
    var firstRow = table.children[0];
    var colCount = ((_a = firstRow === null || firstRow === void 0 ? void 0 : firstRow.children) === null || _a === void 0 ? void 0 : _a.length) || 1;
    // Create new row with same number of columns
    var cells = [];
    for (var i = 0; i < colCount; i++) {
        cells.push({
            type: 'table-cell',
            children: [{ text: '' }],
        });
    }
    var newRow = {
        type: 'table-row',
        children: cells,
    };
    // Insert at the end of the table
    Transforms.insertNodes(editor, newRow, {
        at: __spreadArray(__spreadArray([], tablePath, true), [table.children.length], false),
    });
};
// Remove table row
var removeTableRow = function (editor) {
    var selection = editor.selection;
    if (!selection)
        return;
    // Find the current row
    var rowMatch = Array.from(Editor.nodes(editor, {
        at: selection,
        match: function (n) {
            return !Editor.isEditor(n) &&
                Element$2.isElement(n) &&
                n.type === 'table-row';
        },
    }))[0];
    if (!rowMatch)
        return;
    var _a = rowMatch, rowPath = _a[1];
    // Check if this is the last row - don't delete if so
    var tableMatch = Array.from(Editor.nodes(editor, {
        at: selection,
        match: function (n) {
            return !Editor.isEditor(n) &&
                Element$2.isElement(n) &&
                n.type === 'table';
        },
    }))[0];
    if (tableMatch) {
        var table = tableMatch[0];
        if (table.children.length <= 1) {
            // If it's the last row, remove the entire table
            Transforms.removeNodes(editor, {
                match: function (n) {
                    return !Editor.isEditor(n) &&
                        Element$2.isElement(n) &&
                        n.type === 'table';
                },
            });
            return;
        }
    }
    Transforms.removeNodes(editor, { at: rowPath });
};
// Add table column
var addTableColumn = function (editor) {
    var selection = editor.selection;
    if (!selection)
        return;
    // Find the table
    var tableMatch = Array.from(Editor.nodes(editor, {
        at: selection,
        match: function (n) {
            return !Editor.isEditor(n) &&
                Element$2.isElement(n) &&
                n.type === 'table';
        },
    }))[0];
    if (!tableMatch)
        return;
    var _a = tableMatch, table = _a[0], tablePath = _a[1];
    // Add a cell to each row
    table.children.forEach(function (_row, rowIndex) {
        var newCell = {
            type: 'table-cell',
            children: [{ text: '' }],
        };
        Transforms.insertNodes(editor, newCell, {
            at: __spreadArray(__spreadArray([], tablePath, true), [rowIndex, table.children[rowIndex].children.length], false),
        });
    });
};
// Remove table column
var removeTableColumn = function (editor) {
    var _a, _b;
    var selection = editor.selection;
    if (!selection)
        return;
    // Find the current cell
    var cellMatch = Array.from(Editor.nodes(editor, {
        at: selection,
        match: function (n) {
            return !Editor.isEditor(n) &&
                Element$2.isElement(n) &&
                n.type === 'table-cell';
        },
    }))[0];
    if (!cellMatch)
        return;
    var _c = cellMatch, cellPath = _c[1];
    var cellIndex = cellPath[cellPath.length - 1];
    // Find the table
    var tableMatch = Array.from(Editor.nodes(editor, {
        at: selection,
        match: function (n) {
            return !Editor.isEditor(n) &&
                Element$2.isElement(n) &&
                n.type === 'table';
        },
    }))[0];
    if (!tableMatch)
        return;
    var _d = tableMatch, table = _d[0], tablePath = _d[1];
    // Check if this is the last column - don't delete if so
    if (((_b = (_a = table.children[0]) === null || _a === void 0 ? void 0 : _a.children) === null || _b === void 0 ? void 0 : _b.length) <= 1) {
        // If it's the last column, remove the entire table
        Transforms.removeNodes(editor, { at: tablePath });
        return;
    }
    // Remove the cell from each row
    for (var rowIndex = table.children.length - 1; rowIndex >= 0; rowIndex--) {
        Transforms.removeNodes(editor, {
            at: __spreadArray(__spreadArray([], tablePath, true), [rowIndex, cellIndex], false),
        });
    }
};
// Set table alignment
var setTableAlignment = function (editor, alignment) {
    var selection = editor.selection;
    if (!selection)
        return;
    // Find the table
    var tableMatch = Array.from(Editor.nodes(editor, {
        at: selection,
        match: function (n) {
            return !Editor.isEditor(n) &&
                Element$2.isElement(n) &&
                n.type === 'table';
        },
    }))[0];
    if (!tableMatch)
        return;
    var _a = tableMatch, tablePath = _a[1];
    Transforms.setNodes(editor, { align: alignment }, { at: tablePath });
};
// Find all text matches in editor
var findAllMatches = function (editor, searchQuery) {
    if (!searchQuery)
        return [];
    var matches = [];
    var searchLower = searchQuery.toLowerCase();
    // Iterate through all text nodes
    var textNodes = Array.from(Editor.nodes(editor, {
        at: [],
        match: function (n) { return Text$1.isText(n); },
    }));
    textNodes.forEach(function (_a) {
        var node = _a[0], path = _a[1];
        var textNode = node;
        var text = textNode.text;
        var textLower = text.toLowerCase();
        var index = 0;
        while ((index = textLower.indexOf(searchLower, index)) !== -1) {
            matches.push({
                path: path,
                offset: index,
                text: text.substring(index, index + searchQuery.length),
            });
            index += searchQuery.length;
        }
    });
    return matches;
};
// Navigate to specific match
var navigateToMatch = function (editor, match) {
    var _a;
    var start = { path: match.path, offset: match.offset };
    var end = { path: match.path, offset: match.offset + match.text.length };
    Transforms.select(editor, { anchor: start, focus: end });
    // Scroll into view
    var domRange = ReactEditor.toDOMRange(editor, editor.selection);
    (_a = domRange.startContainer.parentElement) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
    });
};
// Replace current match
var replaceMatch = function (editor, match, replaceText) {
    var start = { path: match.path, offset: match.offset };
    var end = { path: match.path, offset: match.offset + match.text.length };
    Transforms.select(editor, { anchor: start, focus: end });
    Transforms.insertText(editor, replaceText);
};
// Replace all matches
var replaceAllMatches = function (editor, matches, replaceText) {
    // Replace from end to beginning to maintain correct offsets
    var sortedMatches = __spreadArray([], matches, true).reverse();
    Editor.withoutNormalizing(editor, function () {
        sortedMatches.forEach(function (match) {
            var start = { path: match.path, offset: match.offset };
            var end = { path: match.path, offset: match.offset + match.text.length };
            Transforms.select(editor, { anchor: start, focus: end });
            Transforms.delete(editor);
            Transforms.insertText(editor, replaceText, { at: start });
        });
    });
};
// Serialize to HTML
var serializeToHtml = function (nodes) {
    return nodes.map(function (node) { return serializeNode(node); }).join('');
};
var serializeNode = function (node) {
    if (Text$1.isText(node)) {
        var textNode = node;
        var string = escapeHtml(textNode.text);
        // Collect inline styles
        var styles = [];
        if (textNode.color)
            styles.push("color: ".concat(textNode.color));
        if (textNode.backgroundColor)
            styles.push("background-color: ".concat(textNode.backgroundColor));
        var styleAttr = styles.length > 0 ? " style=\"".concat(styles.join('; '), "\"") : '';
        // Apply formatting
        if (textNode.bold)
            string = "<strong>".concat(string, "</strong>");
        if (textNode.italic)
            string = "<em>".concat(string, "</em>");
        if (textNode.underline)
            string = "<u>".concat(string, "</u>");
        if (textNode.code)
            string = "<code>".concat(string, "</code>");
        if (textNode.strikethrough)
            string = "<s>".concat(string, "</s>");
        if (textNode.superscript)
            string = "<sup>".concat(string, "</sup>");
        if (textNode.subscript)
            string = "<sub>".concat(string, "</sub>");
        // Wrap in span if we have color/backgroundColor
        if (styleAttr) {
            string = "<span".concat(styleAttr, ">").concat(string, "</span>");
        }
        return string;
    }
    var elementNode = node;
    var children = elementNode.children.map(function (n) { return serializeNode(n); }).join('');
    var alignStyle = elementNode.align ? " style=\"text-align: ".concat(elementNode.align, "\"") : '';
    switch (elementNode.type) {
        case 'paragraph':
            return "<p".concat(alignStyle, ">").concat(children, "</p>");
        case 'heading-one':
            return "<h1".concat(alignStyle, ">").concat(children, "</h1>");
        case 'heading-two':
            return "<h2".concat(alignStyle, ">").concat(children, "</h2>");
        case 'heading-three':
            return "<h3".concat(alignStyle, ">").concat(children, "</h3>");
        case 'heading-four':
            return "<h4".concat(alignStyle, ">").concat(children, "</h4>");
        case 'heading-five':
            return "<h5".concat(alignStyle, ">").concat(children, "</h5>");
        case 'heading-six':
            return "<h6".concat(alignStyle, ">").concat(children, "</h6>");
        case 'heading-seven':
            return "<h7".concat(alignStyle, ">").concat(children, "</h7>");
        case 'heading-eight':
            return "<h8".concat(alignStyle, ">").concat(children, "</h8>");
        case 'bulleted-list':
            return "<ul>".concat(children, "</ul>");
        case 'numbered-list':
            return "<ol>".concat(children, "</ol>");
        case 'list-item':
            return "<li>".concat(children, "</li>");
        case 'blockquote':
            return "<blockquote".concat(alignStyle, ">").concat(children, "</blockquote>");
        case 'code-block':
            return "<pre><code>".concat(children, "</code></pre>");
        case 'horizontal-rule':
            return "<hr />";
        case 'table':
            var tableNode = elementNode;
            var tableAlignStyle = tableNode.align ? " margin-left: ".concat(tableNode.align === 'center' ? 'auto' :
                tableNode.align === 'right' ? 'auto' : '0', "; margin-right: ").concat(tableNode.align === 'center' ? 'auto' :
                tableNode.align === 'right' ? '0' : 'auto', ";") : '';
            var tableWidthStyle = tableNode.width ? " width: ".concat(tableNode.width, "px; max-width: 100%;") : ' width: 100%;';
            return "<table style=\"border-collapse: collapse;".concat(tableWidthStyle, " margin-top: 16px; margin-bottom: 16px;").concat(tableAlignStyle, "\">").concat(children, "</table>");
        case 'table-row':
            return "<tr>".concat(children, "</tr>");
        case 'table-cell':
            var cellNode = elementNode;
            var cellAlignStyle = cellNode.align ? " text-align: ".concat(cellNode.align, ";") : '';
            return "<td style=\"border: 1px solid #ddd; padding: 8px;".concat(cellAlignStyle, "\">").concat(children, "</td>");
        case 'image':
            var imageNode = elementNode;
            var altAttr = imageNode.alt ? " alt=\"".concat(escapeHtml(imageNode.alt), "\"") : ' alt="Image"';
            var widthAttr = imageNode.width ? " width=\"".concat(imageNode.width, "\"") : '';
            var heightAttr = imageNode.height ? " height=\"".concat(imageNode.height, "\"") : '';
            var imgAlignStyle = imageNode.align ? " style=\"display: block; margin: ".concat(imageNode.align === 'center' ? '0 auto' :
                imageNode.align === 'right' ? '0 0 0 auto' : '0', ";\"") : '';
            return "<img src=\"".concat(escapeHtml(imageNode.url), "\"").concat(altAttr).concat(widthAttr).concat(heightAttr).concat(imgAlignStyle, " />");
        case 'link':
            var linkNode = elementNode;
            var titleAttr = linkNode.title ? " title=\"".concat(escapeHtml(linkNode.title), "\"") : '';
            var targetAttr = linkNode.target ? " target=\"".concat(linkNode.target, "\"") : '';
            var relAttr = linkNode.target === '_blank' ? ' rel="noopener noreferrer"' : '';
            return "<a href=\"".concat(escapeHtml(linkNode.url), "\"").concat(titleAttr).concat(targetAttr).concat(relAttr, ">").concat(children, "</a>");
        default:
            return children;
    }
};
var escapeHtml = function (text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
};
// Default initial value
var defaultInitialValue = [
    {
        type: 'paragraph',
        children: [{ text: '' }],
    },
];
// Word and Character Counter utilities
var getTextContent = function (nodes) {
    return nodes
        .map(function (node) {
        if (node.text !== undefined) {
            return node.text;
        }
        if (node.children) {
            return getTextContent(node.children);
        }
        return '';
    })
        .join('');
};
var countWords = function (text) {
    // Remove extra whitespace and split by spaces
    var trimmed = text.trim();
    if (trimmed === '')
        return 0;
    // Split by whitespace and filter out empty strings
    return trimmed.split(/\s+/).filter(function (word) { return word.length > 0; }).length;
};
var countCharacters = function (text) {
    return text.length;
};
var countCharactersNoSpaces = function (text) {
    return text.replace(/\s/g, '').length;
};

var Dropdown = function (_a) {
    var trigger = _a.trigger, children = _a.children, title = _a.title;
    var _b = React.useState(false), isOpen = _b[0], setIsOpen = _b[1];
    var dropdownRef = React.useRef(null);
    React.useEffect(function () {
        var handleClickOutside = function (event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return function () { return document.removeEventListener('mousedown', handleClickOutside); };
    }, []);
    return (jsxRuntime.jsxs("div", { ref: dropdownRef, style: { position: 'relative', display: 'inline-block' }, children: [jsxRuntime.jsxs("button", { title: title, onMouseDown: function (e) {
                    e.preventDefault();
                    setIsOpen(!isOpen);
                }, style: {
                    backgroundColor: isOpen ? '#dee2e6' : 'transparent',
                    border: 'none',
                    borderRadius: '3px',
                    padding: '5px 8px',
                    margin: '0',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '400',
                    color: '#222f3e',
                    transition: 'background-color 0.1s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '28px',
                    boxShadow: 'none',
                    whiteSpace: 'nowrap',
                }, onMouseEnter: function (e) {
                    if (!isOpen) {
                        e.currentTarget.style.backgroundColor = '#e9ecef';
                    }
                }, onMouseLeave: function (e) {
                    if (!isOpen) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                    }
                }, children: [trigger, jsxRuntime.jsx(ForwardRef$c, { style: { marginLeft: '4px', width: '12px', height: '12px' } })] }), isOpen && (jsxRuntime.jsx("div", { style: {
                    position: 'absolute',
                    top: '100%',
                    left: '0',
                    zIndex: 9999,
                    backgroundColor: '#ffffff',
                    border: '1px solid #ccc',
                    borderRadius: '3px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                    minWidth: '180px',
                    marginTop: '4px',
                    overflow: 'hidden',
                    padding: '4px 0'
                }, children: children }))] }));
};
var ToolbarButton = function (_a) {
    var active = _a.active, onMouseDown = _a.onMouseDown, children = _a.children, title = _a.title;
    return (jsxRuntime.jsx("button", { title: title, onMouseDown: onMouseDown, style: {
            backgroundColor: active ? '#dee2e6' : 'transparent',
            border: 'none',
            borderRadius: '3px',
            padding: '5px 8px',
            margin: '0',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '400',
            color: '#222f3e',
            transition: 'background-color 0.1s ease',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '28px',
            boxShadow: 'none',
            whiteSpace: 'nowrap',
        }, onMouseEnter: function (e) {
            if (!active) {
                e.currentTarget.style.backgroundColor = '#e9ecef';
            }
        }, onMouseLeave: function (e) {
            if (!active) {
                e.currentTarget.style.backgroundColor = 'transparent';
            }
        }, children: children }));
};
var DropdownItem = function (_a) {
    var active = _a.active, onMouseDown = _a.onMouseDown, children = _a.children, icon = _a.icon;
    return (jsxRuntime.jsxs("button", { onMouseDown: onMouseDown, style: {
            width: '100%',
            padding: '6px 16px',
            border: 'none',
            backgroundColor: active ? '#e7f4ff' : 'transparent',
            color: '#222f3e',
            fontSize: '14px',
            fontWeight: '400',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'background-color 0.1s ease',
            borderRadius: '0',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
        }, onMouseEnter: function (e) {
            e.currentTarget.style.backgroundColor = '#e7f4ff';
        }, onMouseLeave: function (e) {
            if (!active) {
                e.currentTarget.style.backgroundColor = 'transparent';
            }
        }, children: [icon && jsxRuntime.jsx("span", { style: { width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }, children: icon }), children] }));
};
var ToolbarSeparator = function () { return (jsxRuntime.jsx("div", { style: {
        width: '1px',
        height: '24px',
        backgroundColor: '#ccc',
        margin: '0 4px',
        alignSelf: 'center',
    } })); };
var Toolbar = function (_a) {
    var _b;
    var items = _a.items, className = _a.className, onViewOutput = _a.onViewOutput; _a.onEditLink; var _c = _a.searchQuery, propSearchQuery = _c === void 0 ? '' : _c, _d = _a.searchMatches, propSearchMatches = _d === void 0 ? [] : _d, _e = _a.currentMatchIndex, propCurrentMatchIndex = _e === void 0 ? 0 : _e, onSearchQueryChange = _a.onSearchQueryChange, onSearchMatchesChange = _a.onSearchMatchesChange, onCurrentMatchIndexChange = _a.onCurrentMatchIndexChange, _f = _a.isFullscreen, isFullscreen = _f === void 0 ? false : _f, onFullscreenToggle = _a.onFullscreenToggle;
    var editor = useSlate();
    var _g = React.useState(false), showLinkModal = _g[0], setShowLinkModal = _g[1];
    var _h = React.useState(''), linkText = _h[0], setLinkText = _h[1];
    var _j = React.useState(''), linkUrl = _j[0], setLinkUrl = _j[1];
    var _k = React.useState(''), linkTitle = _k[0], setLinkTitle = _k[1];
    var _l = React.useState('_self'), linkTarget = _l[0], setLinkTarget = _l[1];
    var _m = React.useState(false), isEditingLink = _m[0], setIsEditingLink = _m[1];
    var _o = React.useState(false); _o[0]; _o[1];
    var _p = React.useState({ x: 0, y: 0 }); _p[0]; _p[1];
    // Image modal state
    var _q = React.useState(false), showImageModal = _q[0], setShowImageModal = _q[1];
    var _r = React.useState(''), imageUrl = _r[0], setImageUrl = _r[1];
    var _s = React.useState(''), imageAlt = _s[0], setImageAlt = _s[1];
    var _t = React.useState(null), imageFile = _t[0], setImageFile = _t[1];
    var _u = React.useState(''), imageUploadError = _u[0], setImageUploadError = _u[1];
    var _v = React.useState(false), isReplacingImage = _v[0], setIsReplacingImage = _v[1];
    var _w = React.useState(null), replacingImagePath = _w[0], setReplacingImagePath = _w[1];
    // Table modal state
    var _x = React.useState(false), showTableModal = _x[0], setShowTableModal = _x[1];
    var _y = React.useState(3), tableRows = _y[0], setTableRows = _y[1];
    var _z = React.useState(3), tableCols = _z[0], setTableCols = _z[1];
    // Find & Replace state
    var _0 = React.useState(false), showFindReplace = _0[0], setShowFindReplace = _0[1];
    var _1 = React.useState(''), replaceText = _1[0], setReplaceText = _1[1];
    var _2 = React.useState(0), totalMatches = _2[0], setTotalMatches = _2[1];
    // Use props for search state
    var searchQuery = propSearchQuery;
    var searchMatches = propSearchMatches;
    var currentMatchIndex = propCurrentMatchIndex;
    var handleMarkToggle = function (event, format) {
        event.preventDefault();
        toggleMark(editor, format);
    };
    var handleBlockToggle = function (event, format) {
        event.preventDefault();
        toggleBlock(editor, format);
    };
    var handleAlignmentToggle = function (event, alignment) {
        event.preventDefault();
        toggleAlignment(editor, alignment);
    };
    var handleIndent = function (event) {
        event.preventDefault();
        indentListItem(editor);
    };
    var handleOutdent = function (event) {
        event.preventDefault();
        outdentListItem(editor);
    };
    var handleUndo = function (event) {
        event.preventDefault();
        HistoryEditor.undo(editor);
    };
    var handleRedo = function (event) {
        event.preventDefault();
        HistoryEditor.redo(editor);
    };
    var handleLinkToggle = function (event) {
        event.preventDefault();
        // Always open modal for inserting new link from toolbar
        // Get selected text if any
        var selection = editor.selection;
        if (selection) {
            var selectedText = Editor.string(editor, selection);
            setLinkText(selectedText);
        }
        else {
            setLinkText('');
        }
        setLinkUrl('');
        setLinkTitle('');
        setLinkTarget('_self');
        setIsEditingLink(false);
        setShowLinkModal(true);
    };
    var handleInsertLink = function () {
        if (!linkUrl.trim()) {
            alert('URL is required');
            return;
        }
        // Validate URL format
        try {
            new URL(linkUrl);
        }
        catch (_a) {
            alert('Please enter a valid URL (e.g., https://example.com)');
            return;
        }
        if (isEditingLink) {
            // Update existing link
            Transforms.setNodes(editor, {
                url: linkUrl,
                title: linkTitle || undefined,
                target: linkTarget
            }, {
                match: function (n) { return n.type === 'link'; }
            });
            // Update link text if changed and there's a selection
            if (linkText.trim() && editor.selection) {
                // Delete current text in the link
                Transforms.delete(editor, { at: editor.selection });
                // Insert new text
                Transforms.insertText(editor, linkText, { at: editor.selection });
            }
        }
        else {
            // Insert new link (original logic)
            if (linkText.trim()) {
                // If user provided text, insert it with the link
                if (editor.selection) {
                    // Delete current selection if any
                    Transforms.delete(editor);
                }
                // Insert link with text
                Transforms.insertNodes(editor, {
                    type: 'link',
                    url: linkUrl,
                    title: linkTitle || undefined,
                    target: linkTarget,
                    children: [{ text: linkText }],
                });
                // Move cursor after the link
                Transforms.move(editor);
            }
            else if (editor.selection && !Range.isCollapsed(editor.selection)) {
                // If no text provided but there's a selection, wrap selection
                insertLink(editor, linkUrl, linkTitle || undefined, linkTarget);
            }
            else {
                // No text and no selection - insert URL as text with link
                Transforms.insertNodes(editor, {
                    type: 'link',
                    url: linkUrl,
                    title: linkTitle || undefined,
                    target: linkTarget,
                    children: [{ text: linkUrl }],
                });
                Transforms.move(editor);
            }
        }
        setShowLinkModal(false);
        setLinkText('');
        setLinkUrl('');
        setLinkTitle('');
        setLinkTarget('_self');
        setIsEditingLink(false);
    };
    // Image handlers
    var handleImageToggle = function (event) {
        event.preventDefault();
        setImageUrl('');
        setImageAlt('');
        setImageFile(null);
        setImageUploadError('');
        setIsReplacingImage(false);
        setReplacingImagePath(null);
        setShowImageModal(true);
    };
    var handleInsertImage = function () { return __awaiter(void 0, void 0, void 0, function () {
        var editiumProps, uploadedUrl, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setImageUploadError('');
                    if (!imageFile) return [3 /*break*/, 5];
                    editiumProps = window.__editiumProps;
                    if (!(editiumProps === null || editiumProps === void 0 ? void 0 : editiumProps.onImageUpload)) {
                        setImageUploadError('Upload not configured. Please define onImageUpload in your app.');
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, editiumProps.onImageUpload(imageFile)];
                case 2:
                    uploadedUrl = _a.sent();
                    if (isReplacingImage && replacingImagePath) {
                        // Update existing image
                        Transforms.setNodes(editor, {
                            url: uploadedUrl,
                            alt: imageAlt || imageFile.name
                        }, { at: replacingImagePath });
                    }
                    else {
                        // Insert new image
                        insertImage(editor, uploadedUrl, imageAlt || imageFile.name);
                    }
                    setShowImageModal(false);
                    setImageUrl('');
                    setImageAlt('');
                    setImageFile(null);
                    setIsReplacingImage(false);
                    setReplacingImagePath(null);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    setImageUploadError('Failed to upload image: ' + error_1.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
                case 5:
                    // Insert via URL
                    if (!imageUrl.trim()) {
                        setImageUploadError('Please enter an image URL or select a file');
                        return [2 /*return*/];
                    }
                    if (!isValidImageUrl(imageUrl)) {
                        setImageUploadError('Please enter a valid image URL');
                        return [2 /*return*/];
                    }
                    if (isReplacingImage && replacingImagePath) {
                        // Update existing image
                        Transforms.setNodes(editor, {
                            url: imageUrl,
                            alt: imageAlt || 'Image'
                        }, { at: replacingImagePath });
                    }
                    else {
                        // Insert new image
                        insertImage(editor, imageUrl, imageAlt || 'Image');
                    }
                    setShowImageModal(false);
                    setImageUrl('');
                    setImageAlt('');
                    setImageFile(null);
                    setIsReplacingImage(false);
                    setReplacingImagePath(null);
                    return [2 /*return*/];
            }
        });
    }); };
    var handleFileChange = function (e) {
        var _a;
        var file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setImageUploadError('Please select an image file');
                return;
            }
            // Validate file size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                setImageUploadError('Image size should be less than 5MB');
                return;
            }
            setImageFile(file);
            setImageUploadError('');
        }
    };
    // Table handlers
    var handleTableToggle = function (event) {
        event.preventDefault();
        setShowTableModal(true);
        setTableRows(3);
        setTableCols(3);
    };
    var handleInsertTable = function () {
        insertTable(editor, tableRows, tableCols);
        setShowTableModal(false);
    };
    // Find & Replace handlers
    var handleFindReplaceToggle = function (event) {
        event.preventDefault();
        setShowFindReplace(!showFindReplace);
        if (!showFindReplace) {
            onSearchQueryChange === null || onSearchQueryChange === void 0 ? void 0 : onSearchQueryChange('');
            setReplaceText('');
            onCurrentMatchIndexChange === null || onCurrentMatchIndexChange === void 0 ? void 0 : onCurrentMatchIndexChange(0);
            onSearchMatchesChange === null || onSearchMatchesChange === void 0 ? void 0 : onSearchMatchesChange([]);
            setTotalMatches(0);
        }
    };
    // Auto-search as user types
    React.useEffect(function () {
        if (!searchQuery || !showFindReplace) {
            onSearchMatchesChange === null || onSearchMatchesChange === void 0 ? void 0 : onSearchMatchesChange([]);
            setTotalMatches(0);
            onCurrentMatchIndexChange === null || onCurrentMatchIndexChange === void 0 ? void 0 : onCurrentMatchIndexChange(0);
            return;
        }
        var matches = findAllMatches(editor, searchQuery);
        onSearchMatchesChange === null || onSearchMatchesChange === void 0 ? void 0 : onSearchMatchesChange(matches);
        setTotalMatches(matches.length);
        if (matches.length > 0) {
            onCurrentMatchIndexChange === null || onCurrentMatchIndexChange === void 0 ? void 0 : onCurrentMatchIndexChange(0);
            navigateToMatch(editor, matches[0]);
        }
        else {
            onCurrentMatchIndexChange === null || onCurrentMatchIndexChange === void 0 ? void 0 : onCurrentMatchIndexChange(0);
        }
    }, [searchQuery, showFindReplace, editor, onSearchMatchesChange, onCurrentMatchIndexChange]);
    var handleNextMatch = function () {
        if (searchMatches.length === 0)
            return;
        var nextIndex = (currentMatchIndex + 1) % searchMatches.length;
        onCurrentMatchIndexChange === null || onCurrentMatchIndexChange === void 0 ? void 0 : onCurrentMatchIndexChange(nextIndex);
        navigateToMatch(editor, searchMatches[nextIndex]);
    };
    var handlePrevMatch = function () {
        if (searchMatches.length === 0)
            return;
        var prevIndex = currentMatchIndex === 0 ? searchMatches.length - 1 : currentMatchIndex - 1;
        onCurrentMatchIndexChange === null || onCurrentMatchIndexChange === void 0 ? void 0 : onCurrentMatchIndexChange(prevIndex);
        navigateToMatch(editor, searchMatches[prevIndex]);
    };
    var handleReplace = function () {
        if (searchMatches.length === 0 || currentMatchIndex >= searchMatches.length)
            return;
        replaceMatch(editor, searchMatches[currentMatchIndex], replaceText);
        // Re-search will happen automatically via useEffect
        var matches = findAllMatches(editor, searchQuery);
        onSearchMatchesChange === null || onSearchMatchesChange === void 0 ? void 0 : onSearchMatchesChange(matches);
    };
    var handleReplaceAll = function () {
        if (searchMatches.length === 0)
            return;
        replaceAllMatches(editor, searchMatches, replaceText);
        // Clear search after replace all
        onSearchQueryChange === null || onSearchQueryChange === void 0 ? void 0 : onSearchQueryChange('');
        setTimeout(function () {
            onSearchQueryChange === null || onSearchQueryChange === void 0 ? void 0 : onSearchQueryChange('');
            setReplaceText('');
            onSearchMatchesChange === null || onSearchMatchesChange === void 0 ? void 0 : onSearchMatchesChange([]);
            setTotalMatches(0);
            onCurrentMatchIndexChange === null || onCurrentMatchIndexChange === void 0 ? void 0 : onCurrentMatchIndexChange(0);
        }, 50);
    };
    // Effect to listen for external edit requests
    React.useEffect(function () {
        // This will be called from Editium component when user clicks Edit in popup
        var handleExternalEdit = function (linkData) {
            setLinkText(linkData.text);
            setLinkUrl(linkData.url);
            setLinkTitle(linkData.title || '');
            setLinkTarget(linkData.target || '_self');
            setIsEditingLink(true);
            setShowLinkModal(true);
            // If path is provided, select that node so updates work correctly
            if (linkData.path) {
                editor.selection = Editor.range(editor, linkData.path);
            }
        };
        // Always store reference
        window.__editiumLinkEditHandler = handleExternalEdit;
        return function () {
            delete window.__editiumLinkEditHandler;
        };
    }, [editor]);
    // Effect to listen for image replacement requests
    React.useEffect(function () {
        var handleImageReplace = function (imageData) {
            setImageUrl(imageData.url);
            setImageAlt(imageData.alt || '');
            setImageFile(null);
            setImageUploadError('');
            setIsReplacingImage(true);
            setReplacingImagePath(imageData.path);
            setShowImageModal(true);
        };
        window.__editiumImageReplaceHandler = handleImageReplace;
        return function () {
            delete window.__editiumImageReplaceHandler;
        };
    }, []);
    // Define item groups
    var blockFormattingItems = ['paragraph', 'heading-one', 'heading-two', 'heading-three', 'heading-four', 'heading-five', 'heading-six', 'heading-seven', 'heading-eight'];
    var alignmentItems = ['left', 'center', 'right', 'justify'];
    var formatItems = ['bold', 'italic', 'underline', 'strikethrough', 'code', 'superscript', 'subscript'];
    var listItems = ['bulleted-list', 'numbered-list', 'indent', 'outdent'];
    var blockItems = ['blockquote', 'code-block'];
    var colorItems = ['text-color', 'bg-color'];
    var insertItems = ['link', 'horizontal-rule', 'image', 'table'];
    var editItems = ['undo', 'redo'];
    // Predefined color palette
    var colorPalette = [
        { name: 'Black', value: '#000000' },
        { name: 'Dark Gray', value: '#495057' },
        { name: 'Gray', value: '#6c757d' },
        { name: 'Light Gray', value: '#adb5bd' },
        { name: 'Red', value: '#dc3545' },
        { name: 'Orange', value: '#fd7e14' },
        { name: 'Yellow', value: '#ffc107' },
        { name: 'Green', value: '#28a745' },
        { name: 'Teal', value: '#20c997' },
        { name: 'Blue', value: '#007bff' },
        { name: 'Indigo', value: '#6610f2' },
        { name: 'Purple', value: '#6f42c1' },
        { name: 'Pink', value: '#e83e8c' },
        { name: 'White', value: '#ffffff' },
    ];
    var renderToolbarItem = function (item, index) {
        // Handle separator - skip if it comes right after a grouped item (but not the first one)
        if (item === 'separator') {
            var prevItem = index > 0 ? items[index - 1] : null;
            if (prevItem) {
                // Check if previous item was part of a group but not the first item
                if (formatItems.includes(prevItem)) {
                    var firstFormatIndex = items.findIndex(function (i) { return formatItems.includes(i); });
                    if (firstFormatIndex !== index - 1)
                        return null;
                }
                if (listItems.includes(prevItem)) {
                    var firstListIndex = items.findIndex(function (i) { return listItems.includes(i); });
                    if (firstListIndex !== index - 1)
                        return null;
                }
                if (alignmentItems.includes(prevItem)) {
                    var firstAlignIndex = items.findIndex(function (i) { return alignmentItems.includes(i); });
                    if (firstAlignIndex !== index - 1)
                        return null;
                }
                if (blockFormattingItems.includes(prevItem)) {
                    var firstBlockIndex = items.findIndex(function (i) { return blockFormattingItems.includes(i); });
                    if (firstBlockIndex !== index - 1)
                        return null;
                }
                if (insertItems.includes(prevItem)) {
                    var firstInsertIndex = items.findIndex(function (i) { return insertItems.includes(i); });
                    if (firstInsertIndex !== index - 1)
                        return null;
                }
                if (editItems.includes(prevItem)) {
                    var firstEditIndex = items.findIndex(function (i) { return editItems.includes(i); });
                    if (firstEditIndex !== index - 1)
                        return null;
                }
            }
            return jsxRuntime.jsx(ToolbarSeparator, {}, "separator-".concat(index));
        }
        // Group heading items and paragraph into a dropdown
        if (blockFormattingItems.includes(item)) {
            // Only render the dropdown for the first block formatting item encountered
            var firstBlockIndex = items.findIndex(function (i) { return blockFormattingItems.includes(i); });
            var currentIndex = items.findIndex(function (i) { return i === item; });
            if (firstBlockIndex !== currentIndex) {
                return null; // Skip rendering individual block formatting buttons
            }
            // Find which block format is currently active
            var activeBlock = blockFormattingItems.find(function (block) {
                return items.includes(block) && isBlockActive(editor, block);
            });
            var getBlockLabel_1 = function (block) {
                switch (block) {
                    case 'paragraph': return 'Paragraph';
                    case 'heading-one': return 'Heading 1';
                    case 'heading-two': return 'Heading 2';
                    case 'heading-three': return 'Heading 3';
                    case 'heading-four': return 'Heading 4';
                    case 'heading-five': return 'Heading 5';
                    case 'heading-six': return 'Heading 6';
                    case 'heading-seven': return 'Heading 7';
                    case 'heading-eight': return 'Heading 8';
                    default: return 'Format';
                }
            };
            return (jsxRuntime.jsx(Dropdown, { trigger: jsxRuntime.jsx("span", { children: activeBlock ? getBlockLabel_1(activeBlock) : 'Paragraph' }), title: "Block format", children: items.filter(function (i) { return blockFormattingItems.includes(i); }).map(function (block) { return (jsxRuntime.jsx(DropdownItem, { active: isBlockActive(editor, block), onMouseDown: function (e) { return handleBlockToggle(e, block); }, children: getBlockLabel_1(block) }, block)); }) }, "block-formatting-dropdown"));
        }
        // Group alignment items into a dropdown
        if (alignmentItems.includes(item)) {
            // Only render the dropdown for the first alignment item encountered
            var firstAlignIndex = items.findIndex(function (i) { return alignmentItems.includes(i); });
            var currentIndex = items.findIndex(function (i) { return i === item; });
            if (firstAlignIndex !== currentIndex) {
                return null; // Skip rendering individual alignment buttons
            }
            // Find which alignment is currently active
            alignmentItems.find(function (align) {
                return items.includes(align) && isAlignmentActive(editor, align);
            });
            var getAlignmentIcon_1 = function (align) {
                switch (align) {
                    case 'left':
                        return (jsxRuntime.jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '1px', width: '16px', height: '16px' }, children: [jsxRuntime.jsx("div", { style: { width: '12px', height: '2px', backgroundColor: 'currentColor' } }), jsxRuntime.jsx("div", { style: { width: '8px', height: '2px', backgroundColor: 'currentColor' } }), jsxRuntime.jsx("div", { style: { width: '10px', height: '2px', backgroundColor: 'currentColor' } })] }));
                    case 'center':
                        return (jsxRuntime.jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '1px', width: '16px', height: '16px', alignItems: 'center' }, children: [jsxRuntime.jsx("div", { style: { width: '10px', height: '2px', backgroundColor: 'currentColor' } }), jsxRuntime.jsx("div", { style: { width: '6px', height: '2px', backgroundColor: 'currentColor' } }), jsxRuntime.jsx("div", { style: { width: '8px', height: '2px', backgroundColor: 'currentColor' } })] }));
                    case 'right':
                        return (jsxRuntime.jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '1px', width: '16px', height: '16px', alignItems: 'flex-end' }, children: [jsxRuntime.jsx("div", { style: { width: '12px', height: '2px', backgroundColor: 'currentColor' } }), jsxRuntime.jsx("div", { style: { width: '8px', height: '2px', backgroundColor: 'currentColor' } }), jsxRuntime.jsx("div", { style: { width: '10px', height: '2px', backgroundColor: 'currentColor' } })] }));
                    case 'justify':
                        return (jsxRuntime.jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '1px', width: '16px', height: '16px' }, children: [jsxRuntime.jsx("div", { style: { width: '100%', height: '2px', backgroundColor: 'currentColor' } }), jsxRuntime.jsx("div", { style: { width: '100%', height: '2px', backgroundColor: 'currentColor' } }), jsxRuntime.jsx("div", { style: { width: '100%', height: '2px', backgroundColor: 'currentColor' } })] }));
                    default:
                        return (jsxRuntime.jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '1px', width: '16px', height: '16px' }, children: [jsxRuntime.jsx("div", { style: { width: '12px', height: '2px', backgroundColor: 'currentColor' } }), jsxRuntime.jsx("div", { style: { width: '8px', height: '2px', backgroundColor: 'currentColor' } }), jsxRuntime.jsx("div", { style: { width: '10px', height: '2px', backgroundColor: 'currentColor' } })] }));
                }
            };
            var getAlignmentLabel_1 = function (align) {
                switch (align) {
                    case 'left': return 'Align Left';
                    case 'center': return 'Align Center';
                    case 'right': return 'Align Right';
                    case 'justify': return 'Justify';
                    default: return 'Align';
                }
            };
            return (jsxRuntime.jsx(Dropdown, { trigger: jsxRuntime.jsx("span", { children: "Align" }), title: "Text alignment", children: items.filter(function (i) { return alignmentItems.includes(i); }).map(function (align) { return (jsxRuntime.jsx(DropdownItem, { active: isAlignmentActive(editor, align), onMouseDown: function (e) { return handleAlignmentToggle(e, align); }, icon: getAlignmentIcon_1(align), children: getAlignmentLabel_1(align) }, align)); }) }, "alignment-dropdown"));
        }
        switch (item) {
            case 'bold':
            case 'italic':
            case 'underline':
            case 'strikethrough':
            case 'code':
            case 'superscript':
            case 'subscript': {
                // Group all text formatting into a Format menu
                var formatItems_1 = ['bold', 'italic', 'underline', 'strikethrough', 'code', 'superscript', 'subscript'];
                var firstFormatIndex = items.findIndex(function (i) { return formatItems_1.includes(i); });
                var currentIndex = items.findIndex(function (i) { return i === item; });
                if (firstFormatIndex !== currentIndex)
                    return null;
                return (jsxRuntime.jsxs(Dropdown, { trigger: jsxRuntime.jsx("span", { children: "Format" }), title: "Format", children: [items.includes('bold') && (jsxRuntime.jsx(DropdownItem, { active: isMarkActive(editor, 'bold'), onMouseDown: function (e) { return handleMarkToggle(e, 'bold'); }, icon: jsxRuntime.jsx("span", { style: { fontWeight: 'bold', fontSize: '16px' }, children: "B" }), children: "Bold" })), items.includes('italic') && (jsxRuntime.jsx(DropdownItem, { active: isMarkActive(editor, 'italic'), onMouseDown: function (e) { return handleMarkToggle(e, 'italic'); }, icon: jsxRuntime.jsx("span", { style: { fontStyle: 'italic', fontSize: '16px' }, children: "I" }), children: "Italic" })), items.includes('underline') && (jsxRuntime.jsx(DropdownItem, { active: isMarkActive(editor, 'underline'), onMouseDown: function (e) { return handleMarkToggle(e, 'underline'); }, icon: jsxRuntime.jsx("span", { style: { textDecoration: 'underline', fontSize: '16px' }, children: "U" }), children: "Underline" })), items.includes('strikethrough') && (jsxRuntime.jsx(DropdownItem, { active: isMarkActive(editor, 'strikethrough'), onMouseDown: function (e) { return handleMarkToggle(e, 'strikethrough'); }, icon: jsxRuntime.jsx("span", { style: { textDecoration: 'line-through', fontSize: '16px' }, children: "S" }), children: "Strikethrough" })), items.includes('code') && (jsxRuntime.jsx(DropdownItem, { active: isMarkActive(editor, 'code'), onMouseDown: function (e) { return handleMarkToggle(e, 'code'); }, icon: jsxRuntime.jsx(ForwardRef$9, { style: { width: '16px', height: '16px' } }), children: "Code" })), items.includes('superscript') && (jsxRuntime.jsx(DropdownItem, { active: isMarkActive(editor, 'superscript'), onMouseDown: function (e) { return handleMarkToggle(e, 'superscript'); }, icon: jsxRuntime.jsxs("span", { style: { fontSize: '12px' }, children: ["X", jsxRuntime.jsx("sup", { children: "2" })] }), children: "Superscript" })), items.includes('subscript') && (jsxRuntime.jsx(DropdownItem, { active: isMarkActive(editor, 'subscript'), onMouseDown: function (e) { return handleMarkToggle(e, 'subscript'); }, icon: jsxRuntime.jsxs("span", { style: { fontSize: '12px' }, children: ["X", jsxRuntime.jsx("sub", { children: "2" })] }), children: "Subscript" }))] }, "format-menu"));
            }
            case 'bulleted-list':
            case 'numbered-list':
            case 'indent':
            case 'outdent': {
                // Group list controls into Lists menu
                var listItems_1 = ['bulleted-list', 'numbered-list', 'indent', 'outdent'];
                var firstListIndex = items.findIndex(function (i) { return listItems_1.includes(i); });
                var currentIndex = items.findIndex(function (i) { return i === item; });
                if (firstListIndex !== currentIndex)
                    return null;
                return (jsxRuntime.jsxs(Dropdown, { trigger: jsxRuntime.jsx("span", { children: "Lists" }), title: "Lists", children: [items.includes('bulleted-list') && (jsxRuntime.jsx(DropdownItem, { active: isBlockActive(editor, 'bulleted-list'), onMouseDown: function (e) { return handleBlockToggle(e, 'bulleted-list'); }, icon: jsxRuntime.jsx(ForwardRef$7, { style: { width: '16px', height: '16px' } }), children: "Bullet list" })), items.includes('numbered-list') && (jsxRuntime.jsx(DropdownItem, { active: isBlockActive(editor, 'numbered-list'), onMouseDown: function (e) { return handleBlockToggle(e, 'numbered-list'); }, icon: jsxRuntime.jsx("span", { style: { fontSize: '14px', fontWeight: '600' }, children: "1." }), children: "Numbered list" })), items.includes('indent') && (jsxRuntime.jsx(DropdownItem, { active: false, onMouseDown: handleIndent, icon: jsxRuntime.jsx(ForwardRef$l, { style: { width: '16px', height: '16px' } }), children: "Increase indent" })), items.includes('outdent') && (jsxRuntime.jsx(DropdownItem, { active: false, onMouseDown: handleOutdent, icon: jsxRuntime.jsx(ForwardRef$m, { style: { width: '16px', height: '16px' } }), children: "Decrease indent" }))] }, "lists-menu"));
            }
            case 'blockquote':
            case 'code-block': {
                // Group block elements into Blocks menu
                var firstBlockItemIndex = items.findIndex(function (i) { return blockItems.includes(i); });
                var currentIndex = items.findIndex(function (i) { return i === item; });
                if (firstBlockItemIndex !== currentIndex)
                    return null;
                return (jsxRuntime.jsxs(Dropdown, { trigger: jsxRuntime.jsx("span", { children: "Blocks" }), title: "Blocks", children: [items.includes('blockquote') && (jsxRuntime.jsx(DropdownItem, { active: isBlockActive(editor, 'blockquote'), onMouseDown: function (e) { return handleBlockToggle(e, 'blockquote'); }, icon: jsxRuntime.jsx("span", { style: { fontSize: '16px', fontWeight: 'bold' }, children: "\u275D" }), children: "Blockquote" })), items.includes('code-block') && (jsxRuntime.jsx(DropdownItem, { active: isBlockActive(editor, 'code-block'), onMouseDown: function (e) { return handleBlockToggle(e, 'code-block'); }, icon: jsxRuntime.jsx(ForwardRef$9, { style: { width: '16px', height: '16px' } }), children: "Code Block" }))] }, "blocks-menu"));
            }
            case 'text-color':
            case 'bg-color': {
                // Group color controls into Color menu
                var firstColorIndex = items.findIndex(function (i) { return colorItems.includes(i); });
                var currentIndex = items.findIndex(function (i) { return i === item; });
                if (firstColorIndex !== currentIndex)
                    return null;
                var activeTextColor_1 = getActiveColor(editor);
                var activeBgColor_1 = getActiveBackgroundColor(editor);
                return (jsxRuntime.jsxs(Dropdown, { trigger: jsxRuntime.jsx("span", { children: "Color" }), title: "Color", children: [items.includes('text-color') && (jsxRuntime.jsxs("div", { style: { padding: '8px 12px' }, children: [jsxRuntime.jsx("div", { style: {
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        marginBottom: '8px',
                                        color: '#495057'
                                    }, children: "Text Color" }), jsxRuntime.jsx("div", { style: {
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(7, 1fr)',
                                        gap: '4px',
                                        marginBottom: '8px'
                                    }, children: colorPalette.map(function (color) { return (jsxRuntime.jsx("button", { onMouseDown: function (e) {
                                            e.preventDefault();
                                            applyColor(editor, color.value);
                                        }, title: color.name, style: {
                                            width: '24px',
                                            height: '24px',
                                            backgroundColor: color.value,
                                            border: activeTextColor_1 === color.value ? '2px solid #007bff' : '1px solid #dee2e6',
                                            borderRadius: '3px',
                                            cursor: 'pointer',
                                            padding: 0,
                                            boxShadow: color.value === '#ffffff' ? 'inset 0 0 0 1px #dee2e6' : 'none'
                                        } }, "text-".concat(color.value))); }) }), jsxRuntime.jsxs("div", { style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        marginBottom: '8px',
                                        paddingTop: '4px'
                                    }, children: [jsxRuntime.jsx("input", { type: "color", value: activeTextColor_1 || '#000000', onChange: function (e) {
                                                applyColor(editor, e.target.value);
                                            }, title: "Pick custom color", style: {
                                                width: '24px',
                                                height: '24px',
                                                border: '1px solid #dee2e6',
                                                borderRadius: '3px',
                                                cursor: 'pointer',
                                                padding: '0',
                                                backgroundColor: 'transparent'
                                            } }), jsxRuntime.jsx("span", { style: {
                                                fontSize: '12px',
                                                color: '#6c757d'
                                            }, children: "Custom" })] }), jsxRuntime.jsx("button", { onMouseDown: function (e) {
                                        e.preventDefault();
                                        applyColor(editor, null);
                                    }, style: {
                                        width: '100%',
                                        padding: '4px 8px',
                                        fontSize: '12px',
                                        border: '1px solid #dee2e6',
                                        borderRadius: '3px',
                                        backgroundColor: 'transparent',
                                        cursor: 'pointer',
                                        color: '#495057'
                                    }, children: "Remove Color" })] })), items.includes('bg-color') && (jsxRuntime.jsxs("div", { style: { padding: '8px 12px', borderTop: '1px solid #dee2e6' }, children: [jsxRuntime.jsx("div", { style: {
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        marginBottom: '8px',
                                        color: '#495057'
                                    }, children: "Background Highlight" }), jsxRuntime.jsx("div", { style: {
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(7, 1fr)',
                                        gap: '4px',
                                        marginBottom: '8px'
                                    }, children: colorPalette.map(function (color) { return (jsxRuntime.jsx("button", { onMouseDown: function (e) {
                                            e.preventDefault();
                                            applyBackgroundColor(editor, color.value);
                                        }, title: color.name, style: {
                                            width: '24px',
                                            height: '24px',
                                            backgroundColor: color.value,
                                            border: activeBgColor_1 === color.value ? '2px solid #007bff' : '1px solid #dee2e6',
                                            borderRadius: '3px',
                                            cursor: 'pointer',
                                            padding: 0,
                                            boxShadow: color.value === '#ffffff' ? 'inset 0 0 0 1px #dee2e6' : 'none'
                                        } }, "bg-".concat(color.value))); }) }), jsxRuntime.jsxs("div", { style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        marginBottom: '8px',
                                        paddingTop: '4px'
                                    }, children: [jsxRuntime.jsx("input", { type: "color", value: activeBgColor_1 || '#ffffff', onChange: function (e) {
                                                applyBackgroundColor(editor, e.target.value);
                                            }, title: "Pick custom color", style: {
                                                width: '24px',
                                                height: '24px',
                                                border: '1px solid #dee2e6',
                                                borderRadius: '3px',
                                                cursor: 'pointer',
                                                padding: '0',
                                                backgroundColor: 'transparent'
                                            } }), jsxRuntime.jsx("span", { style: {
                                                fontSize: '12px',
                                                color: '#6c757d'
                                            }, children: "Custom" })] }), jsxRuntime.jsx("button", { onMouseDown: function (e) {
                                        e.preventDefault();
                                        applyBackgroundColor(editor, null);
                                    }, style: {
                                        width: '100%',
                                        padding: '4px 8px',
                                        fontSize: '12px',
                                        border: '1px solid #dee2e6',
                                        borderRadius: '3px',
                                        backgroundColor: 'transparent',
                                        cursor: 'pointer',
                                        color: '#495057'
                                    }, children: "Remove Highlight" })] }))] }, "color-menu"));
            }
            case 'link':
            case 'horizontal-rule':
            case 'image':
            case 'table': {
                // Group link, horizontal-rule, image, and table into Insert menu
                var firstInsertIndex = items.findIndex(function (i) { return insertItems.includes(i); });
                var currentIndex = items.findIndex(function (i) { return i === item; });
                if (firstInsertIndex !== currentIndex)
                    return null;
                return (jsxRuntime.jsxs(Dropdown, { trigger: jsxRuntime.jsx("span", { children: "Insert" }), title: "Insert", children: [items.includes('link') && (jsxRuntime.jsx(DropdownItem, { active: isLinkActive(editor), onMouseDown: handleLinkToggle, icon: jsxRuntime.jsx(ForwardRef$8, { style: { width: '16px', height: '16px' } }), children: "Link" })), items.includes('image') && (jsxRuntime.jsx(DropdownItem, { active: false, onMouseDown: handleImageToggle, icon: jsxRuntime.jsx(ForwardRef$4, { style: { width: '16px', height: '16px' } }), children: "Image" })), items.includes('table') && (jsxRuntime.jsx(DropdownItem, { active: false, onMouseDown: handleTableToggle, icon: jsxRuntime.jsx(ForwardRef$2, { style: { width: '16px', height: '16px' } }), children: "Table" })), items.includes('horizontal-rule') && (jsxRuntime.jsx(DropdownItem, { active: false, onMouseDown: function (e) {
                                e.preventDefault();
                                insertHorizontalRule(editor);
                            }, icon: jsxRuntime.jsx("span", { style: { fontSize: '16px', fontWeight: 'bold' }, children: "\u2015" }), children: "Horizontal Rule" }))] }, "insert-menu"));
            }
            case 'undo':
            case 'redo': {
                // Group undo/redo into Edit menu
                var firstEditIndex = items.findIndex(function (i) { return editItems.includes(i); });
                var currentIndex = items.findIndex(function (i) { return i === item; });
                if (firstEditIndex !== currentIndex)
                    return null;
                return (jsxRuntime.jsxs(Dropdown, { trigger: jsxRuntime.jsx("span", { children: "Edit" }), title: "Edit", children: [items.includes('undo') && (jsxRuntime.jsx(DropdownItem, { active: false, onMouseDown: handleUndo, icon: jsxRuntime.jsx(ForwardRef$j, { style: { width: '16px', height: '16px' } }), children: "Undo" })), items.includes('redo') && (jsxRuntime.jsx(DropdownItem, { active: false, onMouseDown: handleRedo, icon: jsxRuntime.jsx(ForwardRef$i, { style: { width: '16px', height: '16px' } }), children: "Redo" }))] }, "edit-menu"));
            }
            case 'view-output':
                return (jsxRuntime.jsxs(Dropdown, { trigger: jsxRuntime.jsx("span", { children: "View" }), title: "View Output", children: [jsxRuntime.jsx(DropdownItem, { active: false, onMouseDown: function (event) {
                                event.preventDefault();
                                if (onViewOutput) {
                                    onViewOutput('preview');
                                }
                            }, icon: jsxRuntime.jsx(ForwardRef$k, { style: { width: '16px', height: '16px' } }), children: "Preview" }), jsxRuntime.jsx(DropdownItem, { active: false, onMouseDown: function (event) {
                                event.preventDefault();
                                if (onViewOutput) {
                                    onViewOutput('html');
                                }
                            }, icon: jsxRuntime.jsx("span", { style: { fontFamily: 'monospace', fontSize: '14px' }, children: "</>" }), children: "View HTML" }), jsxRuntime.jsx(DropdownItem, { active: false, onMouseDown: function (event) {
                                event.preventDefault();
                                if (onViewOutput) {
                                    onViewOutput('json');
                                }
                            }, icon: jsxRuntime.jsx("span", { style: { fontFamily: 'monospace', fontSize: '14px' } }), children: "View JSON" })] }, item));
            case 'find-replace':
                return (jsxRuntime.jsx(ToolbarButton, { active: showFindReplace, onMouseDown: handleFindReplaceToggle, title: "Find & Replace", children: jsxRuntime.jsx(ForwardRef$6, { style: { width: '18px', height: '18px' } }) }, item));
            case 'fullscreen':
                return (jsxRuntime.jsx(ToolbarButton, { active: isFullscreen, onMouseDown: function (e) {
                        e.preventDefault();
                        onFullscreenToggle === null || onFullscreenToggle === void 0 ? void 0 : onFullscreenToggle();
                    }, title: isFullscreen ? "Exit Fullscreen (Esc)" : "Enter Fullscreen (F11)", children: isFullscreen ? (jsxRuntime.jsx(ForwardRef$h, { style: { width: '18px', height: '18px' } })) : (jsxRuntime.jsx(ForwardRef$g, { style: { width: '18px', height: '18px' } })) }, item));
            default:
                return null;
        }
    };
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [showLinkModal && (jsxRuntime.jsx("div", { style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10000,
                }, onClick: function () {
                    setShowLinkModal(false);
                    setLinkText('');
                    setLinkUrl('');
                    setLinkTitle('');
                    setLinkTarget('_self');
                    setIsEditingLink(false);
                }, children: jsxRuntime.jsxs("div", { style: {
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        padding: '24px',
                        width: '90%',
                        maxWidth: '500px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    }, onClick: function (e) { return e.stopPropagation(); }, children: [jsxRuntime.jsx("h3", { style: { margin: '0 0 20px 0', color: '#111827', fontSize: '20px', fontWeight: '600' }, children: isEditingLink ? 'Edit Link' : 'Insert Link' }), jsxRuntime.jsxs("div", { style: { marginBottom: '16px' }, children: [jsxRuntime.jsx("label", { style: { display: 'block', marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }, children: "Text to display" }), jsxRuntime.jsx("input", { type: "text", value: linkText, onChange: function (e) { return setLinkText(e.target.value); }, placeholder: "Enter link text", style: {
                                        width: '100%',
                                        padding: '8px 12px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '6px',
                                        fontSize: '14px',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                    }, onFocus: function (e) { return e.target.style.borderColor = '#3b82f6'; }, onBlur: function (e) { return e.target.style.borderColor = '#d1d5db'; } }), jsxRuntime.jsx("small", { style: { display: 'block', marginTop: '4px', color: '#6b7280', fontSize: '12px' }, children: "If empty, will use URL or selected text as display text" })] }), jsxRuntime.jsxs("div", { style: { marginBottom: '16px' }, children: [jsxRuntime.jsxs("label", { style: { display: 'block', marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }, children: ["URL ", jsxRuntime.jsx("span", { style: { color: '#ef4444' }, children: "*" })] }), jsxRuntime.jsx("input", { type: "url", value: linkUrl, onChange: function (e) { return setLinkUrl(e.target.value); }, placeholder: "https://example.com", style: {
                                        width: '100%',
                                        padding: '8px 12px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '6px',
                                        fontSize: '14px',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                    }, onFocus: function (e) { return e.target.style.borderColor = '#3b82f6'; }, onBlur: function (e) { return e.target.style.borderColor = '#d1d5db'; }, onKeyDown: function (e) {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleInsertLink();
                                        }
                                    } })] }), jsxRuntime.jsxs("div", { style: { marginBottom: '16px' }, children: [jsxRuntime.jsx("label", { style: { display: 'block', marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }, children: "Title" }), jsxRuntime.jsx("input", { type: "text", value: linkTitle, onChange: function (e) { return setLinkTitle(e.target.value); }, placeholder: "Link title (tooltip)", style: {
                                        width: '100%',
                                        padding: '8px 12px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '6px',
                                        fontSize: '14px',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                    }, onFocus: function (e) { return e.target.style.borderColor = '#3b82f6'; }, onBlur: function (e) { return e.target.style.borderColor = '#d1d5db'; } }), jsxRuntime.jsx("small", { style: { display: 'block', marginTop: '4px', color: '#6b7280', fontSize: '12px' }, children: "Appears as a tooltip when hovering over the link" })] }), jsxRuntime.jsxs("div", { style: { marginBottom: '24px' }, children: [jsxRuntime.jsx("label", { style: { display: 'block', marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }, children: "Open link in" }), jsxRuntime.jsxs("div", { style: { display: 'flex', gap: '12px' }, children: [jsxRuntime.jsxs("label", { style: { display: 'flex', alignItems: 'center', cursor: 'pointer' }, children: [jsxRuntime.jsx("input", { type: "radio", name: "linkTarget", value: "_self", checked: linkTarget === '_self', onChange: function (e) { return setLinkTarget(e.target.value); }, style: { marginRight: '6px', cursor: 'pointer' } }), jsxRuntime.jsx("span", { style: { fontSize: '14px', color: '#374151' }, children: "Current tab" })] }), jsxRuntime.jsxs("label", { style: { display: 'flex', alignItems: 'center', cursor: 'pointer' }, children: [jsxRuntime.jsx("input", { type: "radio", name: "linkTarget", value: "_blank", checked: linkTarget === '_blank', onChange: function (e) { return setLinkTarget(e.target.value); }, style: { marginRight: '6px', cursor: 'pointer' } }), jsxRuntime.jsx("span", { style: { fontSize: '14px', color: '#374151' }, children: "New tab" })] })] })] }), jsxRuntime.jsxs("div", { style: { display: 'flex', gap: '12px', justifyContent: 'flex-end' }, children: [jsxRuntime.jsx("button", { onClick: function () {
                                        setShowLinkModal(false);
                                        setLinkText('');
                                        setLinkUrl('');
                                        setLinkTitle('');
                                        setLinkTarget('_self');
                                        setIsEditingLink(false);
                                    }, style: {
                                        padding: '8px 16px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '6px',
                                        backgroundColor: '#ffffff',
                                        color: '#374151',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s ease',
                                    }, onMouseEnter: function (e) { return e.currentTarget.style.backgroundColor = '#f9fafb'; }, onMouseLeave: function (e) { return e.currentTarget.style.backgroundColor = '#ffffff'; }, children: "Cancel" }), jsxRuntime.jsx("button", { onClick: handleInsertLink, style: {
                                        padding: '8px 16px',
                                        border: 'none',
                                        borderRadius: '6px',
                                        backgroundColor: '#3b82f6',
                                        color: '#ffffff',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s ease',
                                    }, onMouseEnter: function (e) { return e.currentTarget.style.backgroundColor = '#2563eb'; }, onMouseLeave: function (e) { return e.currentTarget.style.backgroundColor = '#3b82f6'; }, children: isEditingLink ? 'Update Link' : 'Insert Link' })] })] }) })), showImageModal && (jsxRuntime.jsx("div", { style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10000,
                }, onClick: function () {
                    setShowImageModal(false);
                    setImageUrl('');
                    setImageAlt('');
                    setImageFile(null);
                    setImageUploadError('');
                }, children: jsxRuntime.jsxs("div", { style: {
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        padding: '24px',
                        width: '90%',
                        maxWidth: '500px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    }, onClick: function (e) { return e.stopPropagation(); }, children: [jsxRuntime.jsx("h3", { style: { margin: '0 0 20px 0', color: '#111827', fontSize: '20px', fontWeight: '600' }, children: isReplacingImage ? 'Replace Image' : 'Insert Image' }), jsxRuntime.jsxs("div", { style: { marginBottom: '16px' }, children: [jsxRuntime.jsx("label", { style: { display: 'block', marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }, children: "Image URL" }), jsxRuntime.jsx("input", { type: "url", value: imageUrl, onChange: function (e) { return setImageUrl(e.target.value); }, placeholder: "https://example.com/image.jpg", disabled: !!imageFile, style: {
                                        width: '100%',
                                        padding: '8px 12px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '6px',
                                        fontSize: '14px',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                        backgroundColor: imageFile ? '#f9fafb' : '#ffffff',
                                    }, onFocus: function (e) { return !imageFile && (e.target.style.borderColor = '#3b82f6'); }, onBlur: function (e) { return e.target.style.borderColor = '#d1d5db'; } })] }), jsxRuntime.jsxs("div", { style: {
                                marginBottom: '16px',
                                padding: '12px',
                                backgroundColor: '#f9fafb',
                                borderRadius: '6px',
                                textAlign: 'center'
                            }, children: [jsxRuntime.jsx("p", { style: { margin: '0 0 12px 0', color: '#6b7280', fontSize: '14px' }, children: "Or upload from your computer" }), jsxRuntime.jsx("input", { type: "file", accept: "image/*", onChange: handleFileChange, style: { display: 'none' }, id: "image-upload" }), jsxRuntime.jsx("label", { htmlFor: "image-upload", style: {
                                        display: 'inline-block',
                                        padding: '8px 16px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '6px',
                                        backgroundColor: '#ffffff',
                                        color: '#374151',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s ease',
                                    }, onMouseEnter: function (e) { return e.currentTarget.style.backgroundColor = '#f9fafb'; }, onMouseLeave: function (e) { return e.currentTarget.style.backgroundColor = '#ffffff'; }, children: "Choose File" }), imageFile && (jsxRuntime.jsxs("p", { style: { margin: '8px 0 0 0', color: '#374151', fontSize: '13px' }, children: ["Selected: ", imageFile.name] })), !((_b = window.__editiumProps) === null || _b === void 0 ? void 0 : _b.onImageUpload) && (jsxRuntime.jsx("p", { style: {
                                        margin: '8px 0 0 0',
                                        color: '#dc2626',
                                        fontSize: '12px',
                                        fontStyle: 'italic'
                                    }, children: "\u26A0 Upload not configured. Define onImageUpload in your app." }))] }), jsxRuntime.jsxs("div", { style: { marginBottom: '16px' }, children: [jsxRuntime.jsx("label", { style: { display: 'block', marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }, children: "Alt Text (optional)" }), jsxRuntime.jsx("input", { type: "text", value: imageAlt, onChange: function (e) { return setImageAlt(e.target.value); }, placeholder: "Describe the image", style: {
                                        width: '100%',
                                        padding: '8px 12px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '6px',
                                        fontSize: '14px',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                    }, onFocus: function (e) { return e.target.style.borderColor = '#3b82f6'; }, onBlur: function (e) { return e.target.style.borderColor = '#d1d5db'; } }), jsxRuntime.jsx("small", { style: { display: 'block', marginTop: '4px', color: '#6b7280', fontSize: '12px' }, children: "For accessibility" })] }), imageUploadError && (jsxRuntime.jsx("div", { style: {
                                marginBottom: '16px',
                                padding: '12px',
                                backgroundColor: '#fef2f2',
                                border: '1px solid #fecaca',
                                borderRadius: '6px',
                                color: '#dc2626',
                                fontSize: '14px'
                            }, children: imageUploadError })), jsxRuntime.jsxs("div", { style: { display: 'flex', gap: '12px', justifyContent: 'flex-end' }, children: [jsxRuntime.jsx("button", { onClick: function () {
                                        setShowImageModal(false);
                                        setImageUrl('');
                                        setImageAlt('');
                                        setImageFile(null);
                                        setImageUploadError('');
                                    }, style: {
                                        padding: '8px 16px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '6px',
                                        backgroundColor: '#ffffff',
                                        color: '#374151',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s ease',
                                    }, onMouseEnter: function (e) { return e.currentTarget.style.backgroundColor = '#f9fafb'; }, onMouseLeave: function (e) { return e.currentTarget.style.backgroundColor = '#ffffff'; }, children: "Cancel" }), jsxRuntime.jsx("button", { onClick: handleInsertImage, style: {
                                        padding: '8px 16px',
                                        border: 'none',
                                        borderRadius: '6px',
                                        backgroundColor: '#3b82f6',
                                        color: '#ffffff',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s ease',
                                    }, onMouseEnter: function (e) { return e.currentTarget.style.backgroundColor = '#2563eb'; }, onMouseLeave: function (e) { return e.currentTarget.style.backgroundColor = '#3b82f6'; }, children: isReplacingImage ? 'Replace' : 'Insert Image' })] })] }) })), showTableModal && (jsxRuntime.jsx("div", { style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                }, children: jsxRuntime.jsxs("div", { style: {
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        padding: '24px',
                        maxWidth: '400px',
                        width: '90%',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                    }, children: [jsxRuntime.jsx("h3", { style: { margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600', color: '#1f2937' }, children: "Insert Table" }), jsxRuntime.jsxs("div", { style: { marginBottom: '16px' }, children: [jsxRuntime.jsx("div", { style: {
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(10, 30px)',
                                        gridTemplateRows: 'repeat(10, 30px)',
                                        gap: '2px',
                                        padding: '8px',
                                        backgroundColor: '#f9fafb',
                                        borderRadius: '4px',
                                        width: 'fit-content',
                                    }, children: Array.from({ length: 100 }, function (_, index) {
                                        var row = Math.floor(index / 10) + 1;
                                        var col = (index % 10) + 1;
                                        var isHighlighted = row <= tableRows && col <= tableCols;
                                        return (jsxRuntime.jsx("div", { onMouseEnter: function () {
                                                setTableRows(row);
                                                setTableCols(col);
                                            }, onClick: handleInsertTable, style: {
                                                width: '30px',
                                                height: '30px',
                                                border: '1px solid #d1d5db',
                                                backgroundColor: isHighlighted ? '#3b82f6' : 'white',
                                                cursor: 'pointer',
                                                transition: 'background-color 0.1s ease',
                                                borderRadius: '2px',
                                            } }, index));
                                    }) }), jsxRuntime.jsxs("div", { style: {
                                        marginTop: '12px',
                                        textAlign: 'center',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        color: '#374151',
                                    }, children: [tableRows, " \u00D7 ", tableCols, " Table"] })] }), jsxRuntime.jsxs("div", { style: { display: 'flex', gap: '8px', justifyContent: 'flex-end' }, children: [jsxRuntime.jsx("button", { onClick: function () { return setShowTableModal(false); }, style: {
                                        padding: '8px 16px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '4px',
                                        backgroundColor: 'white',
                                        color: '#374151',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                    }, onMouseEnter: function (e) { return e.currentTarget.style.backgroundColor = '#f3f4f6'; }, onMouseLeave: function (e) { return e.currentTarget.style.backgroundColor = 'white'; }, children: "Cancel" }), jsxRuntime.jsx("button", { onClick: handleInsertTable, style: {
                                        padding: '8px 16px',
                                        border: 'none',
                                        borderRadius: '4px',
                                        backgroundColor: '#3b82f6',
                                        color: 'white',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                    }, onMouseEnter: function (e) { return e.currentTarget.style.backgroundColor = '#2563eb'; }, onMouseLeave: function (e) { return e.currentTarget.style.backgroundColor = '#3b82f6'; }, children: "Insert Table" })] })] }) })), jsxRuntime.jsxs("div", { className: className, style: {
                    border: '1px solid #ccc',
                    borderBottom: showFindReplace ? 'none' : '1px solid #ccc',
                    padding: '4px 8px',
                    backgroundColor: '#fff',
                    borderRadius: showFindReplace ? '4px 4px 0 0' : '4px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '2px',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: 'none',
                    minHeight: '42px',
                    maxWidth: '100%',
                    overflow: 'visible',
                    position: 'relative',
                    zIndex: 100
                }, children: [jsxRuntime.jsx("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '2px', alignItems: 'center', flex: 1 }, children: items.filter(function (item) { return item !== 'fullscreen' && item !== 'find-replace'; }).map(function (item, index) { return renderToolbarItem(item, index); }) }), jsxRuntime.jsxs("div", { style: { display: 'flex', gap: '2px', marginLeft: '8px' }, children: [items.includes('find-replace') && renderToolbarItem('find-replace', items.length - 1), items.includes('fullscreen') && renderToolbarItem('fullscreen', items.length)] })] }), showFindReplace && (jsxRuntime.jsxs("div", { style: {
                    backgroundColor: '#f9fafb',
                    border: '1px solid #ccc',
                    borderTop: 'none',
                    borderRadius: '0 0 4px 4px',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                }, children: [jsxRuntime.jsxs("div", { style: { flex: '1', minWidth: '200px' }, children: [jsxRuntime.jsxs("div", { style: { position: 'relative' }, children: [jsxRuntime.jsx("input", { type: "text", value: searchQuery, onChange: function (e) { return onSearchQueryChange === null || onSearchQueryChange === void 0 ? void 0 : onSearchQueryChange(e.target.value); }, placeholder: "Find...", autoFocus: true, style: {
                                            width: '100%',
                                            padding: '8px 10px 8px 32px',
                                            border: searchQuery && totalMatches === 0 ? '1px solid #ef4444' : '1px solid #d1d5db',
                                            borderRadius: '6px',
                                            fontSize: '13px',
                                            outline: 'none',
                                            transition: 'all 0.2s',
                                            backgroundColor: 'white',
                                            boxSizing: 'border-box',
                                        }, onFocus: function (e) {
                                            if (!searchQuery || totalMatches > 0) {
                                                e.currentTarget.style.borderColor = '#3b82f6';
                                            }
                                        }, onBlur: function (e) {
                                            if (searchQuery && totalMatches === 0) {
                                                e.currentTarget.style.borderColor = '#ef4444';
                                            }
                                            else {
                                                e.currentTarget.style.borderColor = '#d1d5db';
                                            }
                                        } }), jsxRuntime.jsx(ForwardRef$6, { style: {
                                            width: '16px',
                                            height: '16px',
                                            position: 'absolute',
                                            left: '10px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: '#9ca3af',
                                            pointerEvents: 'none',
                                        } })] }), searchQuery && (jsxRuntime.jsx("div", { style: {
                                    marginTop: '4px',
                                    fontSize: '11px',
                                    color: totalMatches === 0 ? '#ef4444' : '#6b7280',
                                }, children: totalMatches === 0 ? 'No matches' : "".concat(currentMatchIndex + 1, " of ").concat(totalMatches) }))] }), searchQuery && (jsxRuntime.jsxs("div", { style: { display: 'flex', gap: '4px' }, children: [jsxRuntime.jsx("button", { onClick: handlePrevMatch, disabled: totalMatches === 0, title: "Previous match (Shift+Enter)", style: {
                                    padding: '8px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '6px',
                                    backgroundColor: totalMatches === 0 ? '#f3f4f6' : 'white',
                                    cursor: totalMatches === 0 ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: totalMatches === 0 ? '#d1d5db' : '#6b7280',
                                    transition: 'all 0.2s',
                                }, onMouseEnter: function (e) {
                                    if (totalMatches > 0) {
                                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                                        e.currentTarget.style.borderColor = '#9ca3af';
                                    }
                                }, onMouseLeave: function (e) {
                                    if (totalMatches > 0) {
                                        e.currentTarget.style.backgroundColor = 'white';
                                        e.currentTarget.style.borderColor = '#d1d5db';
                                    }
                                }, children: jsxRuntime.jsx(ForwardRef$b, { style: { width: '14px', height: '14px' } }) }), jsxRuntime.jsx("button", { onClick: handleNextMatch, disabled: totalMatches === 0, title: "Next match (Enter)", style: {
                                    padding: '8px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '6px',
                                    backgroundColor: totalMatches === 0 ? '#f3f4f6' : 'white',
                                    cursor: totalMatches === 0 ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: totalMatches === 0 ? '#d1d5db' : '#6b7280',
                                    transition: 'all 0.2s',
                                }, onMouseEnter: function (e) {
                                    if (totalMatches > 0) {
                                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                                        e.currentTarget.style.borderColor = '#9ca3af';
                                    }
                                }, onMouseLeave: function (e) {
                                    if (totalMatches > 0) {
                                        e.currentTarget.style.backgroundColor = 'white';
                                        e.currentTarget.style.borderColor = '#d1d5db';
                                    }
                                }, children: jsxRuntime.jsx(ForwardRef$a, { style: { width: '14px', height: '14px' } }) })] })), jsxRuntime.jsx("div", { style: { flex: '1', minWidth: '200px' }, children: jsxRuntime.jsx("input", { type: "text", value: replaceText, onChange: function (e) { return setReplaceText(e.target.value); }, placeholder: "Replace...", style: {
                                width: '100%',
                                padding: '8px 10px',
                                border: '1px solid #d1d5db',
                                borderRadius: '6px',
                                fontSize: '13px',
                                outline: 'none',
                                transition: 'all 0.2s',
                                backgroundColor: 'white',
                                boxSizing: 'border-box',
                            }, onFocus: function (e) {
                                e.currentTarget.style.borderColor = '#3b82f6';
                            }, onBlur: function (e) {
                                e.currentTarget.style.borderColor = '#d1d5db';
                            } }) }), jsxRuntime.jsxs("div", { style: { display: 'flex', gap: '6px' }, children: [jsxRuntime.jsx("button", { onClick: handleReplace, disabled: searchMatches.length === 0, title: "Replace current match", style: {
                                    padding: '8px 12px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '6px',
                                    backgroundColor: searchMatches.length === 0 ? '#f3f4f6' : 'white',
                                    color: searchMatches.length === 0 ? '#9ca3af' : '#374151',
                                    cursor: searchMatches.length === 0 ? 'not-allowed' : 'pointer',
                                    fontSize: '13px',
                                    fontWeight: '500',
                                    whiteSpace: 'nowrap',
                                    transition: 'all 0.2s',
                                }, onMouseEnter: function (e) {
                                    if (searchMatches.length > 0) {
                                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                                        e.currentTarget.style.borderColor = '#9ca3af';
                                    }
                                }, onMouseLeave: function (e) {
                                    if (searchMatches.length > 0) {
                                        e.currentTarget.style.backgroundColor = 'white';
                                        e.currentTarget.style.borderColor = '#d1d5db';
                                    }
                                }, children: "Replace" }), jsxRuntime.jsx("button", { onClick: handleReplaceAll, disabled: searchMatches.length === 0, title: "Replace all matches", style: {
                                    padding: '8px 12px',
                                    border: 'none',
                                    borderRadius: '6px',
                                    backgroundColor: searchMatches.length === 0 ? '#cbd5e1' : '#3b82f6',
                                    color: 'white',
                                    cursor: searchMatches.length === 0 ? 'not-allowed' : 'pointer',
                                    fontSize: '13px',
                                    fontWeight: '500',
                                    whiteSpace: 'nowrap',
                                    transition: 'all 0.2s',
                                }, onMouseEnter: function (e) {
                                    if (searchMatches.length > 0) {
                                        e.currentTarget.style.backgroundColor = '#2563eb';
                                    }
                                }, onMouseLeave: function (e) {
                                    if (searchMatches.length > 0) {
                                        e.currentTarget.style.backgroundColor = '#3b82f6';
                                    }
                                }, children: "Replace All" })] }), jsxRuntime.jsx("button", { onClick: function () { return setShowFindReplace(false); }, title: "Close (Esc)", style: {
                            padding: '8px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            color: '#6b7280',
                            transition: 'all 0.2s',
                        }, onMouseEnter: function (e) {
                            e.currentTarget.style.backgroundColor = '#fee2e2';
                            e.currentTarget.style.borderColor = '#ef4444';
                            e.currentTarget.style.color = '#dc2626';
                        }, onMouseLeave: function (e) {
                            e.currentTarget.style.backgroundColor = 'white';
                            e.currentTarget.style.borderColor = '#d1d5db';
                            e.currentTarget.style.color = '#6b7280';
                        }, children: jsxRuntime.jsx(ForwardRef, { style: { width: '16px', height: '16px' } }) })] }))] }));
};

var ResizableImage = function (_a) {
    var element = _a.element, attributes = _a.attributes, children = _a.children;
    var editor = useSlateStatic();
    var selected = useSelected();
    var focused = useFocused();
    var _b = React.useState(false), isResizing = _b[0], setIsResizing = _b[1];
    var _c = React.useState({
        width: element.width || 0,
        height: element.height || 0,
    }), dimensions = _c[0], setDimensions = _c[1];
    var _d = React.useState(false), showActions = _d[0], setShowActions = _d[1];
    var imageRef = React.useRef(null);
    var startPos = React.useRef({ x: 0, y: 0, width: 0, height: 0 });
    // Get natural dimensions when image loads
    var handleImageLoad = React.useCallback(function (e) {
        var img = e.currentTarget;
        if (!element.width && !element.height) {
            setDimensions({
                width: img.naturalWidth,
                height: img.naturalHeight,
            });
        }
    }, [element.width, element.height]);
    // Start resize
    var handleMouseDown = React.useCallback(function (e, handle) {
        var _a, _b;
        e.preventDefault();
        e.stopPropagation();
        setIsResizing(true);
        var currentWidth = dimensions.width || ((_a = imageRef.current) === null || _a === void 0 ? void 0 : _a.offsetWidth) || 0;
        var currentHeight = dimensions.height || ((_b = imageRef.current) === null || _b === void 0 ? void 0 : _b.offsetHeight) || 0;
        startPos.current = {
            x: e.clientX,
            y: e.clientY,
            width: currentWidth,
            height: currentHeight,
        };
        var handleMouseMove = function (moveEvent) {
            var deltaX = moveEvent.clientX - startPos.current.x;
            var deltaY = moveEvent.clientY - startPos.current.y;
            var newWidth = startPos.current.width;
            var newHeight = startPos.current.height;
            // Calculate new dimensions based on handle
            switch (handle) {
                case 'se': // Southeast (bottom-right)
                    newWidth = Math.max(100, startPos.current.width + deltaX);
                    newHeight = Math.max(100, startPos.current.height + deltaY);
                    break;
                case 'sw': // Southwest (bottom-left)
                    newWidth = Math.max(100, startPos.current.width - deltaX);
                    newHeight = Math.max(100, startPos.current.height + deltaY);
                    break;
                case 'ne': // Northeast (top-right)
                    newWidth = Math.max(100, startPos.current.width + deltaX);
                    newHeight = Math.max(100, startPos.current.height - deltaY);
                    break;
                case 'nw': // Northwest (top-left)
                    newWidth = Math.max(100, startPos.current.width - deltaX);
                    newHeight = Math.max(100, startPos.current.height - deltaY);
                    break;
                case 'e': // East (right edge)
                    newWidth = Math.max(100, startPos.current.width + deltaX);
                    newHeight = startPos.current.height;
                    break;
                case 'w': // West (left edge)
                    newWidth = Math.max(100, startPos.current.width - deltaX);
                    newHeight = startPos.current.height;
                    break;
                case 'n': // North (top edge)
                    newWidth = startPos.current.width;
                    newHeight = Math.max(100, startPos.current.height - deltaY);
                    break;
                case 's': // South (bottom edge)
                    newWidth = startPos.current.width;
                    newHeight = Math.max(100, startPos.current.height + deltaY);
                    break;
            }
            setDimensions({ width: newWidth, height: newHeight });
        };
        var handleMouseUp = function () {
            setIsResizing(false);
            // Update the element with new dimensions
            var path = ReactEditor.findPath(editor, element);
            Transforms.setNodes(editor, {
                width: dimensions.width,
                height: dimensions.height
            }, { at: path });
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [dimensions, editor, element]);
    // Handle image removal
    var handleRemoveImage = React.useCallback(function () {
        var path = ReactEditor.findPath(editor, element);
        Transforms.removeNodes(editor, { at: path });
    }, [editor, element]);
    // Handle image replacement
    var handleReplaceImage = React.useCallback(function () {
        // Trigger the image modal with replacement mode
        if (window.__editiumImageReplaceHandler) {
            var path = ReactEditor.findPath(editor, element);
            window.__editiumImageReplaceHandler({
                url: element.url,
                alt: element.alt,
                width: element.width,
                height: element.height,
                align: element.align,
                path: path,
            });
        }
    }, [editor, element]);
    // Handle alignment change
    var handleAlignmentChange = React.useCallback(function (alignment) {
        var path = ReactEditor.findPath(editor, element);
        Transforms.setNodes(editor, { align: alignment }, { at: path });
    }, [editor, element]);
    var containerStyle = {
        display: 'flex',
        justifyContent: element.align === 'center' ? 'center' :
            element.align === 'right' ? 'flex-end' : 'flex-start',
        margin: '16px 0',
        position: 'relative',
    };
    var wrapperStyle = {
        position: 'relative',
        display: 'inline-block',
        maxWidth: '100%',
        cursor: isResizing ? 'nwse-resize' : 'default',
    };
    var imageStyle = {
        maxWidth: '100%',
        width: dimensions.width ? "".concat(dimensions.width, "px") : 'auto',
        height: dimensions.height ? "".concat(dimensions.height, "px") : 'auto',
        borderRadius: '4px',
        boxShadow: (selected && focused) || showActions
            ? '0 0 0 3px #3b82f6'
            : '0 1px 3px rgba(0, 0, 0, 0.1)',
        display: 'block',
        transition: showActions || (selected && focused) ? 'none' : 'box-shadow 0.2s ease',
    };
    var handleStyle = {
        position: 'absolute',
        width: '12px',
        height: '12px',
        backgroundColor: '#3b82f6',
        border: '2px solid #ffffff',
        borderRadius: '50%',
        opacity: showActions ? 1 : 0,
        transition: 'opacity 0.2s ease',
        pointerEvents: showActions ? 'auto' : 'none',
        zIndex: 10,
    };
    return (jsxRuntime.jsxs("div", __assign({}, attributes, { contentEditable: false, style: { userSelect: 'none' }, children: [jsxRuntime.jsx("div", { style: containerStyle, children: jsxRuntime.jsxs("div", { style: wrapperStyle, onMouseEnter: function () { return setShowActions(true); }, onMouseLeave: function () { return !isResizing && setShowActions(false); }, children: [jsxRuntime.jsx("img", { ref: imageRef, src: element.url, alt: element.alt || 'Image', style: imageStyle, onLoad: handleImageLoad, draggable: false }), ((selected && focused) || showActions) && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("div", { style: __assign(__assign({}, handleStyle), { top: '-6px', left: '-6px', cursor: 'nw-resize' }), onMouseDown: function (e) { return handleMouseDown(e, 'nw'); }, title: "Resize" }), jsxRuntime.jsx("div", { style: __assign(__assign({}, handleStyle), { top: '-6px', right: '-6px', cursor: 'ne-resize' }), onMouseDown: function (e) { return handleMouseDown(e, 'ne'); }, title: "Resize" }), jsxRuntime.jsx("div", { style: __assign(__assign({}, handleStyle), { bottom: '-6px', left: '-6px', cursor: 'sw-resize' }), onMouseDown: function (e) { return handleMouseDown(e, 'sw'); }, title: "Resize" }), jsxRuntime.jsx("div", { style: __assign(__assign({}, handleStyle), { bottom: '-6px', right: '-6px', cursor: 'se-resize' }), onMouseDown: function (e) { return handleMouseDown(e, 'se'); }, title: "Resize" }), jsxRuntime.jsx("div", { style: __assign(__assign({}, handleStyle), { top: '-6px', left: '50%', transform: 'translateX(-50%)', cursor: 'n-resize' }), onMouseDown: function (e) { return handleMouseDown(e, 'n'); }, title: "Resize Height" }), jsxRuntime.jsx("div", { style: __assign(__assign({}, handleStyle), { bottom: '-6px', left: '50%', transform: 'translateX(-50%)', cursor: 's-resize' }), onMouseDown: function (e) { return handleMouseDown(e, 's'); }, title: "Resize Height" }), jsxRuntime.jsx("div", { style: __assign(__assign({}, handleStyle), { left: '-6px', top: '50%', transform: 'translateY(-50%)', cursor: 'w-resize' }), onMouseDown: function (e) { return handleMouseDown(e, 'w'); }, title: "Resize Width" }), jsxRuntime.jsx("div", { style: __assign(__assign({}, handleStyle), { right: '-6px', top: '50%', transform: 'translateY(-50%)', cursor: 'e-resize' }), onMouseDown: function (e) { return handleMouseDown(e, 'e'); }, title: "Resize Width" })] })), ((selected && focused) || showActions) && (jsxRuntime.jsxs("div", { style: {
                                position: 'absolute',
                                top: '8px',
                                right: '8px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px',
                                zIndex: 11,
                            }, children: [jsxRuntime.jsxs("div", { style: {
                                        display: 'flex',
                                        gap: '4px',
                                        backgroundColor: '#ffffff',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '4px',
                                        padding: '4px',
                                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                                    }, children: [jsxRuntime.jsx("button", { onClick: function () { return handleAlignmentChange('left'); }, onMouseDown: function (e) { return e.preventDefault(); }, style: {
                                                padding: '4px 8px',
                                                backgroundColor: element.align === 'left' ? '#e0f2fe' : 'transparent',
                                                border: 'none',
                                                borderRadius: '2px',
                                                color: '#374151',
                                                fontSize: '12px',
                                                fontWeight: '500',
                                                cursor: 'pointer',
                                                transition: 'all 0.15s ease',
                                            }, onMouseEnter: function (e) {
                                                if (element.align !== 'left') {
                                                    e.currentTarget.style.backgroundColor = '#f9fafb';
                                                }
                                            }, onMouseLeave: function (e) {
                                                if (element.align !== 'left') {
                                                    e.currentTarget.style.backgroundColor = 'transparent';
                                                }
                                            }, title: "Align left", children: "\u2B05" }), jsxRuntime.jsx("button", { onClick: function () { return handleAlignmentChange('center'); }, onMouseDown: function (e) { return e.preventDefault(); }, style: {
                                                padding: '4px 8px',
                                                backgroundColor: element.align === 'center' ? '#e0f2fe' : 'transparent',
                                                border: 'none',
                                                borderRadius: '2px',
                                                color: '#374151',
                                                fontSize: '12px',
                                                fontWeight: '500',
                                                cursor: 'pointer',
                                                transition: 'all 0.15s ease',
                                            }, onMouseEnter: function (e) {
                                                if (element.align !== 'center') {
                                                    e.currentTarget.style.backgroundColor = '#f9fafb';
                                                }
                                            }, onMouseLeave: function (e) {
                                                if (element.align !== 'center') {
                                                    e.currentTarget.style.backgroundColor = 'transparent';
                                                }
                                            }, title: "Align center", children: "\u2194" }), jsxRuntime.jsx("button", { onClick: function () { return handleAlignmentChange('right'); }, onMouseDown: function (e) { return e.preventDefault(); }, style: {
                                                padding: '4px 8px',
                                                backgroundColor: element.align === 'right' ? '#e0f2fe' : 'transparent',
                                                border: 'none',
                                                borderRadius: '2px',
                                                color: '#374151',
                                                fontSize: '12px',
                                                fontWeight: '500',
                                                cursor: 'pointer',
                                                transition: 'all 0.15s ease',
                                            }, onMouseEnter: function (e) {
                                                if (element.align !== 'right') {
                                                    e.currentTarget.style.backgroundColor = '#f9fafb';
                                                }
                                            }, onMouseLeave: function (e) {
                                                if (element.align !== 'right') {
                                                    e.currentTarget.style.backgroundColor = 'transparent';
                                                }
                                            }, title: "Align right", children: "\u27A1" })] }), jsxRuntime.jsxs("div", { style: {
                                        display: 'flex',
                                        gap: '4px',
                                    }, children: [jsxRuntime.jsx("button", { onClick: handleReplaceImage, onMouseDown: function (e) { return e.preventDefault(); }, style: {
                                                padding: '6px 12px',
                                                backgroundColor: '#ffffff',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '4px',
                                                color: '#374151',
                                                fontSize: '12px',
                                                fontWeight: '500',
                                                cursor: 'pointer',
                                                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                                                transition: 'all 0.15s ease',
                                            }, onMouseEnter: function (e) {
                                                e.currentTarget.style.backgroundColor = '#f9fafb';
                                                e.currentTarget.style.borderColor = '#9ca3af';
                                            }, onMouseLeave: function (e) {
                                                e.currentTarget.style.backgroundColor = '#ffffff';
                                                e.currentTarget.style.borderColor = '#d1d5db';
                                            }, title: "Replace image", children: "Replace" }), jsxRuntime.jsx("button", { onClick: handleRemoveImage, onMouseDown: function (e) { return e.preventDefault(); }, style: {
                                                padding: '6px 12px',
                                                backgroundColor: '#ffffff',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '4px',
                                                color: '#dc2626',
                                                fontSize: '12px',
                                                fontWeight: '500',
                                                cursor: 'pointer',
                                                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                                                transition: 'all 0.15s ease',
                                            }, onMouseEnter: function (e) {
                                                e.currentTarget.style.backgroundColor = '#fef2f2';
                                                e.currentTarget.style.borderColor = '#fca5a5';
                                            }, onMouseLeave: function (e) {
                                                e.currentTarget.style.backgroundColor = '#ffffff';
                                                e.currentTarget.style.borderColor = '#d1d5db';
                                            }, title: "Remove image", children: "Remove" })] })] }))] }) }), children] })));
};

var TableComponent = function (_a) {
    var element = _a.element, attributes = _a.attributes, children = _a.children;
    var editor = useSlateStatic();
    var selected = useSelected();
    var focused = useFocused();
    var _b = React.useState(false), showControls = _b[0], setShowControls = _b[1];
    var _c = React.useState(element.width || null), tableWidth = _c[0], setTableWidth = _c[1];
    var _d = React.useState(false), isResizing = _d[0], setIsResizing = _d[1];
    var tableRef = React.useRef(null);
    var handleAddRow = function () {
        addTableRow(editor);
    };
    var handleRemoveRow = function () {
        removeTableRow(editor);
    };
    var handleAddColumn = function () {
        addTableColumn(editor);
    };
    var handleRemoveColumn = function () {
        removeTableColumn(editor);
    };
    var handleDeleteTable = function () {
        Transforms.removeNodes(editor, {
            match: function (n) {
                return !Editor.isEditor(n) &&
                    n.type === 'table';
            },
        });
    };
    var handleAlign = function (alignment) {
        setTableAlignment(editor, alignment);
    };
    // Save width to element when it changes
    var updateTableWidth = function (width) {
        setTableWidth(width);
        try {
            var path = ReactEditor.findPath(editor, element);
            Transforms.setNodes(editor, { width: width }, { at: path });
        }
        catch (error) {
            // Element might not be in the editor yet
            console.warn('Could not update table width:', error);
        }
    };
    return (jsxRuntime.jsx("div", { style: {
            position: 'relative',
            margin: '16px 0',
            display: 'flex',
            justifyContent: element.align === 'center' ? 'center' :
                element.align === 'right' ? 'flex-end' : 'flex-start',
        }, children: jsxRuntime.jsxs("div", __assign({}, attributes, { style: { position: 'relative', width: tableWidth ? "".concat(tableWidth, "px") : '100%', maxWidth: '100%' }, onMouseEnter: function () { return setShowControls(true); }, onMouseLeave: function () { return setShowControls(false); }, children: [jsxRuntime.jsx("table", { ref: tableRef, style: {
                        borderCollapse: 'collapse',
                        width: '100%',
                        border: (selected && focused) || showControls ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                        transition: 'border 0.2s ease',
                    }, children: jsxRuntime.jsx("tbody", { children: children }) }), ((selected && focused) || showControls) && (jsxRuntime.jsxs("div", { contentEditable: false, style: {
                        position: 'absolute',
                        top: '-40px',
                        right: '0',
                        display: 'flex',
                        gap: '4px',
                        backgroundColor: '#fff',
                        padding: '4px',
                        borderRadius: '6px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                        zIndex: 10,
                    }, children: [jsxRuntime.jsxs("button", { onClick: handleAddRow, title: "Add Row", style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '6px 10px',
                                border: '1px solid #e5e7eb',
                                borderRadius: '4px',
                                backgroundColor: '#fff',
                                cursor: 'pointer',
                                fontSize: '13px',
                                color: '#374151',
                            }, onMouseOver: function (e) { return (e.currentTarget.style.backgroundColor = '#f3f4f6'); }, onMouseOut: function (e) { return (e.currentTarget.style.backgroundColor = '#fff'); }, children: [jsxRuntime.jsx(ForwardRef$3, { style: { width: '16px', height: '16px' } }), "Row"] }), jsxRuntime.jsxs("button", { onClick: handleRemoveRow, title: "Remove Row", style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '6px 10px',
                                border: '1px solid #e5e7eb',
                                borderRadius: '4px',
                                backgroundColor: '#fff',
                                cursor: 'pointer',
                                fontSize: '13px',
                                color: '#374151',
                            }, onMouseOver: function (e) { return (e.currentTarget.style.backgroundColor = '#f3f4f6'); }, onMouseOut: function (e) { return (e.currentTarget.style.backgroundColor = '#fff'); }, children: [jsxRuntime.jsx(ForwardRef$5, { style: { width: '16px', height: '16px' } }), "Row"] }), jsxRuntime.jsxs("button", { onClick: handleAddColumn, title: "Add Column", style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '6px 10px',
                                border: '1px solid #e5e7eb',
                                borderRadius: '4px',
                                backgroundColor: '#fff',
                                cursor: 'pointer',
                                fontSize: '13px',
                                color: '#374151',
                            }, onMouseOver: function (e) { return (e.currentTarget.style.backgroundColor = '#f3f4f6'); }, onMouseOut: function (e) { return (e.currentTarget.style.backgroundColor = '#fff'); }, children: [jsxRuntime.jsx(ForwardRef$3, { style: { width: '16px', height: '16px' } }), "Col"] }), jsxRuntime.jsxs("button", { onClick: handleRemoveColumn, title: "Remove Column", style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '6px 10px',
                                border: '1px solid #e5e7eb',
                                borderRadius: '4px',
                                backgroundColor: '#fff',
                                cursor: 'pointer',
                                fontSize: '13px',
                                color: '#374151',
                            }, onMouseOver: function (e) { return (e.currentTarget.style.backgroundColor = '#f3f4f6'); }, onMouseOut: function (e) { return (e.currentTarget.style.backgroundColor = '#fff'); }, children: [jsxRuntime.jsx(ForwardRef$5, { style: { width: '16px', height: '16px' } }), "Col"] }), jsxRuntime.jsx("div", { style: { width: '1px', height: '24px', backgroundColor: '#e5e7eb', margin: '0 4px' } }), jsxRuntime.jsx("button", { onClick: function () { return handleAlign('left'); }, title: "Align Left", style: {
                                display: 'flex',
                                alignItems: 'center',
                                padding: '6px 8px',
                                border: '1px solid #e5e7eb',
                                borderRadius: '4px',
                                backgroundColor: element.align === 'left' || !element.align ? '#e0e7ff' : '#fff',
                                cursor: 'pointer',
                                fontSize: '13px',
                                color: '#374151',
                            }, onMouseOver: function (e) {
                                if (element.align !== 'left' && element.align)
                                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                            }, onMouseOut: function (e) {
                                e.currentTarget.style.backgroundColor = element.align === 'left' || !element.align ? '#e0e7ff' : '#fff';
                            }, children: jsxRuntime.jsx(ForwardRef$f, { style: { width: '16px', height: '16px' } }) }), jsxRuntime.jsx("button", { onClick: function () { return handleAlign('center'); }, title: "Align Center", style: {
                                display: 'flex',
                                alignItems: 'center',
                                padding: '6px 8px',
                                border: '1px solid #e5e7eb',
                                borderRadius: '4px',
                                backgroundColor: element.align === 'center' ? '#e0e7ff' : '#fff',
                                cursor: 'pointer',
                                fontSize: '13px',
                                color: '#374151',
                            }, onMouseOver: function (e) {
                                if (element.align !== 'center')
                                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                            }, onMouseOut: function (e) {
                                e.currentTarget.style.backgroundColor = element.align === 'center' ? '#e0e7ff' : '#fff';
                            }, children: jsxRuntime.jsx(ForwardRef$d, { style: { width: '16px', height: '16px' } }) }), jsxRuntime.jsx("button", { onClick: function () { return handleAlign('right'); }, title: "Align Right", style: {
                                display: 'flex',
                                alignItems: 'center',
                                padding: '6px 8px',
                                border: '1px solid #e5e7eb',
                                borderRadius: '4px',
                                backgroundColor: element.align === 'right' ? '#e0e7ff' : '#fff',
                                cursor: 'pointer',
                                fontSize: '13px',
                                color: '#374151',
                            }, onMouseOver: function (e) {
                                if (element.align !== 'right')
                                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                            }, onMouseOut: function (e) {
                                e.currentTarget.style.backgroundColor = element.align === 'right' ? '#e0e7ff' : '#fff';
                            }, children: jsxRuntime.jsx(ForwardRef$e, { style: { width: '16px', height: '16px' } }) }), jsxRuntime.jsx("div", { style: { width: '1px', height: '24px', backgroundColor: '#e5e7eb', margin: '0 4px' } }), jsxRuntime.jsxs("button", { onClick: handleDeleteTable, title: "Delete Table", style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '6px 10px',
                                border: '1px solid #e5e7eb',
                                borderRadius: '4px',
                                backgroundColor: '#fff',
                                cursor: 'pointer',
                                fontSize: '13px',
                                color: '#dc2626',
                            }, onMouseOver: function (e) {
                                e.currentTarget.style.backgroundColor = '#fee2e2';
                            }, onMouseOut: function (e) {
                                e.currentTarget.style.backgroundColor = '#fff';
                            }, children: [jsxRuntime.jsx(ForwardRef$1, { style: { width: '16px', height: '16px' } }), "Delete"] })] })), ((selected && focused) || showControls) && (jsxRuntime.jsx("div", { contentEditable: false, onMouseDown: function (e) {
                        var _a;
                        e.preventDefault();
                        e.stopPropagation();
                        setIsResizing(true);
                        var startX = e.clientX;
                        var startWidth = ((_a = tableRef.current) === null || _a === void 0 ? void 0 : _a.offsetWidth) || 0;
                        var finalWidth = startWidth;
                        var handleMouseMove = function (moveEvent) {
                            var diff = moveEvent.clientX - startX;
                            var newWidth = Math.max(200, startWidth + diff);
                            finalWidth = newWidth;
                            setTableWidth(newWidth);
                        };
                        var handleMouseUp = function () {
                            setIsResizing(false);
                            // Save the final width to the element
                            updateTableWidth(finalWidth);
                            document.removeEventListener('mousemove', handleMouseMove);
                            document.removeEventListener('mouseup', handleMouseUp);
                        };
                        document.addEventListener('mousemove', handleMouseMove);
                        document.addEventListener('mouseup', handleMouseUp);
                    }, style: {
                        position: 'absolute',
                        right: '-4px',
                        top: '0',
                        bottom: '0',
                        width: '8px',
                        cursor: 'col-resize',
                        backgroundColor: isResizing ? '#3b82f6' : 'transparent',
                        transition: 'background-color 0.2s',
                        zIndex: 5,
                    }, onMouseEnter: function (e) {
                        if (!isResizing)
                            e.currentTarget.style.backgroundColor = '#3b82f680';
                    }, onMouseLeave: function (e) {
                        if (!isResizing)
                            e.currentTarget.style.backgroundColor = 'transparent';
                    } }))] })) }));
};
var TableRowComponent = function (_a) {
    var attributes = _a.attributes, children = _a.children;
    return jsxRuntime.jsx("tr", __assign({}, attributes, { children: children }));
};
var TableCellComponent = function (_a) {
    var element = _a.element, attributes = _a.attributes, children = _a.children;
    var editor = useSlateStatic();
    var selected = useSelected();
    var focused = useFocused();
    var _b = React.useState(false), showAlignMenu = _b[0], setShowAlignMenu = _b[1];
    var menuRef = React.useRef(null);
    // Close menu when clicking outside
    React.useEffect(function () {
        var handleClickOutside = function (event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowAlignMenu(false);
            }
        };
        if (showAlignMenu) {
            document.addEventListener('mousedown', handleClickOutside);
            return function () { return document.removeEventListener('mousedown', handleClickOutside); };
        }
    }, [showAlignMenu]);
    var handleCellAlign = function (alignment) {
        var path = ReactEditor.findPath(editor, element);
        Transforms.setNodes(editor, { align: alignment }, { at: path });
        setShowAlignMenu(false);
    };
    return (jsxRuntime.jsxs("td", __assign({}, attributes, { style: {
            border: '1px solid #e5e7eb',
            padding: '8px 12px',
            minWidth: '100px',
            position: 'relative',
            textAlign: element.align || 'left',
        }, children: [selected && focused && (jsxRuntime.jsxs("div", { ref: menuRef, contentEditable: false, style: {
                    position: 'absolute',
                    top: '4px',
                    right: '4px',
                    zIndex: 10,
                }, children: [jsxRuntime.jsx("button", { onClick: function () { return setShowAlignMenu(!showAlignMenu); }, style: {
                            padding: '2px 6px',
                            border: '1px solid #e5e7eb',
                            borderRadius: '3px',
                            backgroundColor: '#fff',
                            cursor: 'pointer',
                            fontSize: '11px',
                            color: '#6b7280',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                        }, onMouseOver: function (e) { return (e.currentTarget.style.backgroundColor = '#f3f4f6'); }, onMouseOut: function (e) { return (e.currentTarget.style.backgroundColor = '#fff'); }, title: "Align cell content", children: jsxRuntime.jsx(ForwardRef$f, { style: { width: '12px', height: '12px' } }) }), showAlignMenu && (jsxRuntime.jsxs("div", { style: {
                            position: 'absolute',
                            top: '100%',
                            right: '0',
                            marginTop: '4px',
                            backgroundColor: '#fff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '6px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            padding: '4px',
                            display: 'flex',
                            gap: '2px',
                            minWidth: '120px',
                        }, children: [jsxRuntime.jsx("button", { onClick: function () { return handleCellAlign('left'); }, style: {
                                    padding: '4px 8px',
                                    border: 'none',
                                    borderRadius: '3px',
                                    backgroundColor: element.align === 'left' || !element.align ? '#e0e7ff' : 'transparent',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }, onMouseOver: function (e) {
                                    if (element.align !== 'left' && element.align)
                                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                                }, onMouseOut: function (e) {
                                    e.currentTarget.style.backgroundColor = element.align === 'left' || !element.align ? '#e0e7ff' : 'transparent';
                                }, title: "Align Left", children: jsxRuntime.jsx(ForwardRef$f, { style: { width: '16px', height: '16px' } }) }), jsxRuntime.jsx("button", { onClick: function () { return handleCellAlign('center'); }, style: {
                                    padding: '4px 8px',
                                    border: 'none',
                                    borderRadius: '3px',
                                    backgroundColor: element.align === 'center' ? '#e0e7ff' : 'transparent',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }, onMouseOver: function (e) {
                                    if (element.align !== 'center')
                                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                                }, onMouseOut: function (e) {
                                    e.currentTarget.style.backgroundColor = element.align === 'center' ? '#e0e7ff' : 'transparent';
                                }, title: "Align Center", children: jsxRuntime.jsx(ForwardRef$d, { style: { width: '16px', height: '16px' } }) }), jsxRuntime.jsx("button", { onClick: function () { return handleCellAlign('right'); }, style: {
                                    padding: '4px 8px',
                                    border: 'none',
                                    borderRadius: '3px',
                                    backgroundColor: element.align === 'right' ? '#e0e7ff' : 'transparent',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }, onMouseOver: function (e) {
                                    if (element.align !== 'right')
                                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                                }, onMouseOut: function (e) {
                                    e.currentTarget.style.backgroundColor = element.align === 'right' ? '#e0e7ff' : 'transparent';
                                }, title: "Align Right", children: jsxRuntime.jsx(ForwardRef$e, { style: { width: '16px', height: '16px' } }) })] }))] })), children] })));
};

// All available toolbar items in a logical grouped order
var ALL_TOOLBAR_ITEMS = [
    // Document Structure Group
    'paragraph', 'heading-one', 'heading-two', 'heading-three', 'heading-four',
    'heading-five', 'heading-six', 'heading-seven', 'heading-eight',
    'separator',
    // Basic Text Formatting Group
    'bold', 'italic', 'underline', 'strikethrough',
    'separator',
    // Advanced Text Formatting Group  
    'superscript', 'subscript', 'code',
    'separator',
    // Text Alignment Group
    'left', 'center', 'right', 'justify',
    'separator',
    // Color Controls Group
    'text-color', 'bg-color',
    'separator',
    // Block Elements Group
    'blockquote', 'code-block',
    'separator',
    // Lists and Organization Group
    'bulleted-list', 'numbered-list', 'indent', 'outdent',
    'separator',
    // Tools and Actions Group
    'link', 'image', 'table', 'horizontal-rule', 'undo', 'redo',
    'separator',
    // Utilities
    'find-replace', 'fullscreen', 'view-output'
];

// Render leaf nodes
var renderLeaf = function (_a) {
    var attributes = _a.attributes, children = _a.children, leaf = _a.leaf;
    var textLeaf = leaf;
    if (textLeaf.bold) {
        children = jsxRuntime.jsx("strong", { children: children });
    }
    if (textLeaf.italic) {
        children = jsxRuntime.jsx("em", { children: children });
    }
    if (textLeaf.underline) {
        children = jsxRuntime.jsx("u", { children: children });
    }
    if (textLeaf.strikethrough) {
        children = jsxRuntime.jsx("s", { children: children });
    }
    if (textLeaf.superscript) {
        children = jsxRuntime.jsx("sup", { children: children });
    }
    if (textLeaf.subscript) {
        children = jsxRuntime.jsx("sub", { children: children });
    }
    if (textLeaf.code) {
        children = jsxRuntime.jsx("code", { style: {
                backgroundColor: '#f4f4f4',
                padding: '2px 4px',
                borderRadius: '3px',
                fontFamily: 'monospace'
            }, children: children });
    }
    // Apply color and background color
    var style = {};
    if (textLeaf.color) {
        style.color = textLeaf.color;
    }
    if (textLeaf.backgroundColor) {
        style.backgroundColor = textLeaf.backgroundColor;
    }
    // Apply search highlighting
    if (textLeaf.searchCurrent) {
        style.backgroundColor = '#ff9800';
        style.color = '#fff';
    }
    else if (textLeaf.search) {
        style.backgroundColor = '#ffeb3b';
    }
    return jsxRuntime.jsx("span", __assign({}, attributes, { style: Object.keys(style).length > 0 ? style : undefined, children: children }));
};
// Parse initial value
var parseInitialValue = function (initialValue) {
    if (!initialValue) {
        return defaultInitialValue;
    }
    if (typeof initialValue === 'string') {
        // Simple string to editor format conversion
        if (initialValue.trim() === '') {
            return defaultInitialValue;
        }
        return [
            {
                type: 'paragraph',
                children: [{ text: initialValue }],
            },
        ];
    }
    return initialValue.length > 0 ? initialValue : defaultInitialValue;
};
// Custom editor plugin to normalize tables
var withTables = function (editor) {
    var normalizeNode = editor.normalizeNode;
    editor.normalizeNode = function (entry) {
        var node = entry[0], path = entry[1];
        // If this is a table, ensure it only contains table-row children
        if (Element$2.isElement(node) && node.type === 'table') {
            for (var _i = 0, _a = Array.from(Editor.nodes(editor, { at: path })); _i < _a.length; _i++) {
                var _b = _a[_i], child = _b[0], childPath = _b[1];
                if (childPath.length === path.length + 1 && Element$2.isElement(child) && child.type !== 'table-row') {
                    // Remove any non-table-row children from table
                    Transforms.removeNodes(editor, { at: childPath });
                    return;
                }
            }
        }
        // If this is a table-row, ensure it only contains table-cell children
        if (Element$2.isElement(node) && node.type === 'table-row') {
            for (var _c = 0, _d = Array.from(Editor.nodes(editor, { at: path })); _c < _d.length; _c++) {
                var _e = _d[_c], child = _e[0], childPath = _e[1];
                if (childPath.length === path.length + 1 && Element$2.isElement(child) && child.type !== 'table-cell') {
                    // Remove any non-table-cell children from table-row
                    Transforms.removeNodes(editor, { at: childPath });
                    return;
                }
            }
        }
        // Fall back to the original `normalizeNode`
        normalizeNode(entry);
    };
    return editor;
};
var Editium = function (_a) {
    var initialValue = _a.initialValue, onChange = _a.onChange, _b = _a.toolbar, toolbar = _b === void 0 ? ['bold', 'italic', 'underline', 'heading-one', 'heading-two', 'bulleted-list', 'numbered-list', 'link'] : _b, _c = _a.placeholder, placeholder = _c === void 0 ? 'Start typing...' : _c, _d = _a.className, className = _d === void 0 ? '' : _d, _e = _a.style, style = _e === void 0 ? {} : _e, _f = _a.readOnly, readOnly = _f === void 0 ? false : _f, onImageUpload = _a.onImageUpload, externalSearchQuery = _a.searchQuery, externalSearchMatches = _a.searchMatches, externalCurrentMatchIndex = _a.currentMatchIndex, _g = _a.showWordCount, showWordCount = _g === void 0 ? false : _g;
    // Parse toolbar configuration - support 'all' keyword
    var toolbarItems = toolbar === 'all' ? ALL_TOOLBAR_ITEMS : toolbar;
    var editor = React.useMemo(function () { return withTables(withHistory(withReact(createEditor()))); }, []);
    var _h = React.useState(function () { return parseInitialValue(initialValue); }), value = _h[0], setValue = _h[1];
    var _j = React.useState(null), showOutputModal = _j[0], setShowOutputModal = _j[1];
    var _k = React.useState(false), copySuccess = _k[0], setCopySuccess = _k[1];
    var _l = React.useState(false), showLinkPopup = _l[0], setShowLinkPopup = _l[1];
    var _m = React.useState({ x: 0, y: 0 }), linkPopupPosition = _m[0], setLinkPopupPosition = _m[1];
    var _o = React.useState(null), selectedLink = _o[0], setSelectedLink = _o[1];
    var _p = React.useState(false), isFullscreen = _p[0], setIsFullscreen = _p[1];
    // Internal search state (used when not controlled externally)
    var _q = React.useState(''), internalSearchQuery = _q[0], setInternalSearchQuery = _q[1];
    var _r = React.useState([]), internalSearchMatches = _r[0], setInternalSearchMatches = _r[1];
    var _s = React.useState(0), internalCurrentMatchIndex = _s[0], setInternalCurrentMatchIndex = _s[1];
    // Use external state if provided, otherwise use internal state
    var searchQuery = externalSearchQuery !== undefined ? externalSearchQuery : internalSearchQuery;
    var searchMatches = externalSearchMatches !== undefined ? externalSearchMatches : internalSearchMatches;
    var currentMatchIndex = externalCurrentMatchIndex !== undefined ? externalCurrentMatchIndex : internalCurrentMatchIndex;
    // Store props in window for Toolbar access
    React.useEffect(function () {
        window.__editiumProps = { onImageUpload: onImageUpload };
        return function () {
            delete window.__editiumProps;
        };
    }, [onImageUpload]);
    var _t = React.useState(null), selectedLinkPath = _t[0], setSelectedLinkPath = _t[1];
    // Handle fullscreen toggle
    var handleFullscreenToggle = React.useCallback(function () {
        setIsFullscreen(!isFullscreen);
    }, [isFullscreen]);
    // Handle keyboard shortcuts for fullscreen
    React.useEffect(function () {
        var handleKeyDown = function (event) {
            // F11 to toggle fullscreen
            if (event.key === 'F11') {
                event.preventDefault();
                setIsFullscreen(!isFullscreen);
            }
            // ESC to exit fullscreen
            if (event.key === 'Escape' && isFullscreen) {
                event.preventDefault();
                setIsFullscreen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return function () { return window.removeEventListener('keydown', handleKeyDown); };
    }, [isFullscreen]);
    // Handle keyboard shortcuts
    var handleKeyDown = React.useCallback(function (event) {
        // Handle Delete/Backspace for selected images
        if (event.key === 'Delete' || event.key === 'Backspace') {
            var selection = editor.selection;
            if (selection) {
                // Check if an image node is in the current selection
                var imageNode = Array.from(Editor.nodes(editor, {
                    at: selection,
                    match: function (n) {
                        return !Editor.isEditor(n) &&
                            Element$2.isElement(n) &&
                            n.type === 'image';
                    },
                }))[0];
                if (imageNode) {
                    event.preventDefault();
                    var imagePath = imageNode[1];
                    Transforms.removeNodes(editor, { at: imagePath });
                    return;
                }
                // For Delete key, also check the next node
                if (event.key === 'Delete' && Range.isCollapsed(selection)) {
                    try {
                        var after = Editor.after(editor, selection);
                        if (after) {
                            var nextNode = Array.from(Editor.nodes(editor, {
                                at: after,
                                match: function (n) {
                                    return !Editor.isEditor(n) &&
                                        Element$2.isElement(n) &&
                                        n.type === 'image';
                                },
                            }))[0];
                            if (nextNode) {
                                event.preventDefault();
                                var nextPath = nextNode[1];
                                Transforms.removeNodes(editor, { at: nextPath });
                                return;
                            }
                        }
                    }
                    catch (e) {
                        // Ignore errors if we can't find next node
                    }
                }
            }
        }
        if (!event.ctrlKey && !event.metaKey) {
            return;
        }
        switch (event.key) {
            case 'b':
                event.preventDefault();
                toggleMark(editor, 'bold');
                break;
            case 'i':
                event.preventDefault();
                toggleMark(editor, 'italic');
                break;
            case 'u':
                event.preventDefault();
                toggleMark(editor, 'underline');
                break;
            case '`':
                event.preventDefault();
                toggleMark(editor, 'code');
                break;
            case 'd':
                event.preventDefault();
                toggleMark(editor, 'strikethrough');
                break;
            case 'z':
                if (event.shiftKey) {
                    event.preventDefault();
                    HistoryEditor.redo(editor);
                }
                else {
                    event.preventDefault();
                    HistoryEditor.undo(editor);
                }
                break;
            case 'y':
                event.preventDefault();
                HistoryEditor.redo(editor);
                break;
        }
    }, [editor]);
    // Handle value changes
    var handleChange = React.useCallback(function (newValue) {
        setValue(newValue);
        if (onChange) {
            var htmlValue = serializeToHtml(newValue);
            onChange(htmlValue, newValue);
        }
    }, [onChange]);
    // Calculate word and character counts
    var textContent = React.useMemo(function () { return getTextContent(editor.children); }, [editor.children]);
    var wordCount = React.useMemo(function () { return countWords(textContent); }, [textContent]);
    var charCount = React.useMemo(function () { return countCharacters(textContent); }, [textContent]);
    var charCountNoSpaces = React.useMemo(function () { return countCharactersNoSpaces(textContent); }, [textContent]);
    // Update value when initialValue prop changes
    React.useEffect(function () {
        if (initialValue !== undefined) {
            var parsedValue = parseInitialValue(initialValue);
            setValue(parsedValue);
        }
    }, [initialValue]);
    // Handle copy to clipboard
    var handleCopy = React.useCallback(function () {
        var currentValue = editor.children;
        var textToCopy = showOutputModal === 'html'
            ? serializeToHtml(currentValue)
            : JSON.stringify(currentValue, null, 2);
        navigator.clipboard.writeText(textToCopy).then(function () {
            setCopySuccess(true);
            setTimeout(function () { return setCopySuccess(false); }, 2000);
        });
    }, [showOutputModal, editor]);
    // Handle link click
    var handleLinkClick = React.useCallback(function (event, linkElement) {
        event.preventDefault();
        // Find the link node in the editor
        var linkEntry = Array.from(Editor.nodes(editor, {
            match: function (n) { return n.type === 'link' && n.url === linkElement.url; },
        }))[0];
        if (linkEntry) {
            linkEntry[0]; var path = linkEntry[1];
            setSelectedLinkPath(path);
        }
        var rect = event.target.getBoundingClientRect();
        setLinkPopupPosition({
            x: rect.left + window.scrollX,
            y: rect.bottom + window.scrollY + 5
        });
        setSelectedLink(linkElement);
        setShowLinkPopup(true);
    }, [editor]);
    // Decorate callback for search highlighting
    var decorate = React.useCallback(function (_a) {
        var node = _a[0], path = _a[1];
        var ranges = [];
        if (searchQuery && searchMatches.length > 0 && Text$1.isText(node)) {
            // Find which matches belong to this text node
            searchMatches.forEach(function (match, index) {
                // Check if this match is in the current text node
                if (JSON.stringify(match.path) === JSON.stringify(path)) {
                    ranges.push({
                        anchor: { path: path, offset: match.offset },
                        focus: { path: path, offset: match.offset + match.text.length },
                        search: true,
                        searchCurrent: index === currentMatchIndex,
                    });
                }
            });
        }
        return ranges;
    }, [searchQuery, searchMatches, currentMatchIndex]);
    // Render elements with link click handler
    var renderElementWithHandlers = React.useCallback(function (props) {
        var attributes = props.attributes, children = props.children, element = props.element;
        var style = { margin: '0', fontWeight: 'normal' };
        var alignStyle = element.align ? {
            textAlign: element.align
        } : {};
        var combinedStyle = __assign(__assign({}, style), alignStyle);
        switch (element.type) {
            case 'paragraph':
                return jsxRuntime.jsx("p", __assign({}, attributes, { style: combinedStyle, children: children }));
            case 'heading-one':
                return jsxRuntime.jsx("h1", __assign({}, attributes, { style: __assign(__assign({}, combinedStyle), { fontSize: '2em', margin: '0' }), children: children }));
            case 'heading-two':
                return jsxRuntime.jsx("h2", __assign({}, attributes, { style: __assign(__assign({}, combinedStyle), { fontSize: '1.5em', margin: '0' }), children: children }));
            case 'heading-three':
                return jsxRuntime.jsx("h3", __assign({}, attributes, { style: __assign(__assign({}, combinedStyle), { fontSize: '1.25em', margin: '0' }), children: children }));
            case 'heading-four':
                return jsxRuntime.jsx("h4", __assign({}, attributes, { style: __assign(__assign({}, combinedStyle), { fontSize: '1.1em', margin: '0' }), children: children }));
            case 'heading-five':
                return jsxRuntime.jsx("h5", __assign({}, attributes, { style: __assign(__assign({}, combinedStyle), { fontSize: '1em', margin: '0' }), children: children }));
            case 'heading-six':
                return jsxRuntime.jsx("h6", __assign({}, attributes, { style: __assign(__assign({}, combinedStyle), { fontSize: '0.9em', margin: '0' }), children: children }));
            case 'heading-seven':
                return jsxRuntime.jsx("h1", __assign({}, attributes, { style: __assign(__assign({}, combinedStyle), { fontSize: '0.85em', margin: '0' }), children: children }));
            case 'heading-eight':
                return jsxRuntime.jsx("h1", __assign({}, attributes, { style: __assign(__assign({}, combinedStyle), { fontSize: '0.8em', margin: '0' }), children: children }));
            case 'bulleted-list':
                return jsxRuntime.jsx("ul", __assign({}, attributes, { style: __assign(__assign({}, style), { margin: '0' }), children: children }));
            case 'numbered-list':
                return jsxRuntime.jsx("ol", __assign({}, attributes, { style: __assign(__assign({}, style), { margin: '0' }), children: children }));
            case 'list-item':
                return jsxRuntime.jsx("li", __assign({}, attributes, { children: children }));
            case 'blockquote':
                return (jsxRuntime.jsx("blockquote", __assign({}, attributes, { style: __assign(__assign({}, combinedStyle), { borderLeft: '4px solid #ddd', paddingLeft: '16px', marginLeft: '0', marginRight: '0', color: '#666', fontStyle: 'italic' }), children: children })));
            case 'code-block':
                return (jsxRuntime.jsx("pre", __assign({}, attributes, { style: {
                        backgroundColor: '#f5f5f5',
                        padding: '16px',
                        borderRadius: '4px',
                        overflow: 'auto',
                        fontFamily: 'monospace',
                        fontSize: '14px',
                        lineHeight: '1.5',
                        margin: '0'
                    }, children: jsxRuntime.jsx("code", { children: children }) })));
            case 'horizontal-rule':
                return (jsxRuntime.jsxs("div", __assign({}, attributes, { contentEditable: false, style: { userSelect: 'none' }, children: [jsxRuntime.jsx("hr", { style: {
                                border: 'none',
                                borderTop: '2px solid #ddd',
                                margin: '16px 0'
                            } }), children] })));
            case 'image':
                var imageElement = element;
                return jsxRuntime.jsx(ResizableImage, { element: imageElement, attributes: attributes, children: children });
            case 'table':
                var tableElement = element;
                return jsxRuntime.jsx(TableComponent, { element: tableElement, attributes: attributes, children: children });
            case 'table-row':
                var tableRowElement = element;
                return jsxRuntime.jsx(TableRowComponent, { element: tableRowElement, attributes: attributes, children: children });
            case 'table-cell':
                var tableCellElement = element;
                return jsxRuntime.jsx(TableCellComponent, { element: tableCellElement, attributes: attributes, children: children });
            case 'link':
                var linkElement_1 = element;
                return (jsxRuntime.jsx("a", __assign({}, attributes, { href: linkElement_1.url, title: linkElement_1.title, onClick: function (e) { return handleLinkClick(e, linkElement_1); }, style: {
                        color: '#0066cc',
                        textDecoration: 'underline',
                        cursor: 'pointer'
                    }, children: children })));
            default:
                return jsxRuntime.jsx("p", __assign({}, attributes, { style: combinedStyle, children: children }));
        }
    }, [handleLinkClick]);
    // Handle link actions
    var handleOpenLink = React.useCallback(function () {
        if (selectedLink) {
            window.open(selectedLink.url, selectedLink.target || '_self');
            setShowLinkPopup(false);
        }
    }, [selectedLink]);
    var handleRemoveLink = React.useCallback(function () {
        if (selectedLink) {
            // Find the link node in the current editor state
            var linkEntries = Array.from(Editor.nodes(editor, {
                match: function (n) {
                    return !Editor.isEditor(n) &&
                        Element$2.isElement(n) &&
                        n.type === 'link' &&
                        n.url === selectedLink.url;
                },
            }));
            if (linkEntries.length > 0) {
                var _a = linkEntries[0], linkNode = _a[0], linkPath = _a[1];
                var link = linkNode;
                // Check if link is at root level (path length is 1)
                if (linkPath.length === 1) {
                    // Link is at root level - replace it with a paragraph containing the text
                    var textChildren = link.children;
                    Transforms.removeNodes(editor, { at: linkPath });
                    Transforms.insertNodes(editor, {
                        type: 'paragraph',
                        children: textChildren,
                    }, {
                        at: linkPath,
                    });
                }
                else {
                    // Link is inside a paragraph - just unwrap it
                    Transforms.unwrapNodes(editor, {
                        at: linkPath,
                    });
                }
            }
            setShowLinkPopup(false);
        }
    }, [selectedLink, editor]);
    var handleEditLink = React.useCallback(function () {
        if (selectedLink && selectedLinkPath) {
            // Get the text content of the link using its path
            var linkText = Editor.string(editor, selectedLinkPath);
            // Call the window handler to trigger edit in toolbar
            if (window.__editiumLinkEditHandler) {
                window.__editiumLinkEditHandler({
                    url: selectedLink.url,
                    title: selectedLink.title,
                    target: selectedLink.target,
                    text: linkText,
                    path: selectedLinkPath
                });
            }
        }
        setShowLinkPopup(false);
    }, [selectedLink, selectedLinkPath, editor]);
    // Format HTML with proper indentation
    var formatHtml = React.useCallback(function (html) {
        var formatted = '';
        var indent = 0;
        var tab = '  ';
        html.split(/(<[^>]+>)/g).forEach(function (part) {
            if (part.trim() === '')
                return;
            if (part.startsWith('</')) {
                indent--;
                formatted += tab.repeat(Math.max(0, indent)) + part + '\n';
            }
            else if (part.startsWith('<')) {
                formatted += tab.repeat(indent) + part + '\n';
                if (!part.includes('</') && !part.endsWith('/>')) {
                    indent++;
                }
            }
            else {
                formatted += tab.repeat(indent) + part.trim() + '\n';
            }
        });
        return formatted.trim();
    }, []);
    var editorStyle = __assign({ border: '1px solid #ccc', borderTop: 'none', borderRadius: toolbar.length > 0 ? (showWordCount ? '0' : '0 0 4px 4px') : (showWordCount ? '4px 4px 0 0' : '4px'), borderBottom: showWordCount ? 'none' : '1px solid #ccc', padding: '16px', minHeight: '200px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', fontSize: '14px', lineHeight: '1.6', outline: 'none', backgroundColor: '#fff', position: 'relative' }, style);
    var containerStyle = isFullscreen ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    } : {};
    var editableStyle = isFullscreen ? __assign(__assign({}, editorStyle), { flex: 1, overflow: 'auto', border: 'none', borderRadius: 0 }) : editorStyle;
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("style", { children: "\n          [data-slate-editor] {\n            position: relative;\n            min-height: inherit;\n          }\n          \n          [data-slate-editor] [data-slate-placeholder] {\n            opacity: 0.333;\n            pointer-events: none;\n            user-select: none;\n            display: inline-block !important;\n            width: 100%;\n            max-width: 100%;\n            white-space: nowrap;\n            margin: 0 !important;\n            vertical-align: text-top;\n          }\n          \n          [data-slate-editor] p,\n          [data-slate-editor] h1,\n          [data-slate-editor] h2,\n          [data-slate-editor] h3,\n          [data-slate-editor] h4,\n          [data-slate-editor] h5,\n          [data-slate-editor] h6 {\n            position: relative;\n          }\n          \n          [data-slate-editor] [contenteditable=\"true\"] {\n            outline: none;\n            position: relative;\n            z-index: 1;\n          }\n          \n          [data-slate-editor] > * {\n            margin: 0 !important;\n            line-height: 1.6;\n          }\n          \n          [data-slate-editor] p {\n            margin: 0 !important;\n            line-height: 1.6;\n          }\n          \n          [data-slate-editor] h1,\n          [data-slate-editor] h2,\n          [data-slate-editor] h3,\n          [data-slate-editor] h4,\n          [data-slate-editor] h5,\n          [data-slate-editor] h6 {\n            margin: 0 !important;\n            line-height: 1.6;\n          }\n          \n          [data-slate-editor] ul,\n          [data-slate-editor] ol {\n            margin: 0 !important;\n            padding-left: 24px;\n          }\n        " }), jsxRuntime.jsxs("div", { className: className, style: containerStyle, children: [showLinkPopup && (jsxRuntime.jsx("div", { style: {
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 9998,
                        }, onClick: function () { return setShowLinkPopup(false); }, children: jsxRuntime.jsxs("div", { style: {
                                position: 'absolute',
                                top: "".concat(linkPopupPosition.y, "px"),
                                left: "".concat(linkPopupPosition.x, "px"),
                                backgroundColor: '#ffffff',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                                minWidth: '200px',
                                overflow: 'hidden',
                                zIndex: 9999,
                            }, onClick: function (e) { return e.stopPropagation(); }, children: [selectedLink && (jsxRuntime.jsxs("div", { style: { padding: '8px 12px', borderBottom: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }, children: [jsxRuntime.jsx("div", { style: { fontSize: '12px', color: '#6b7280', marginBottom: '4px' }, children: "Link URL:" }), jsxRuntime.jsx("div", { style: {
                                                fontSize: '13px',
                                                color: '#111827',
                                                wordBreak: 'break-all',
                                                fontFamily: 'monospace'
                                            }, children: selectedLink.url })] })), jsxRuntime.jsxs("button", { onClick: handleOpenLink, style: {
                                        width: '100%',
                                        padding: '12px 16px',
                                        border: 'none',
                                        backgroundColor: 'transparent',
                                        color: '#374151',
                                        fontSize: '14px',
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        fontWeight: '500',
                                    }, onMouseEnter: function (e) { return e.currentTarget.style.backgroundColor = '#f3f4f6'; }, onMouseLeave: function (e) { return e.currentTarget.style.backgroundColor = 'transparent'; }, children: [jsxRuntime.jsx("svg", { style: { width: '16px', height: '16px' }, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntime.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" }) }), "Open Link"] }), jsxRuntime.jsxs("button", { onClick: handleEditLink, style: {
                                        width: '100%',
                                        padding: '12px 16px',
                                        border: 'none',
                                        backgroundColor: 'transparent',
                                        color: '#374151',
                                        fontSize: '14px',
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        fontWeight: '500',
                                    }, onMouseEnter: function (e) { return e.currentTarget.style.backgroundColor = '#f3f4f6'; }, onMouseLeave: function (e) { return e.currentTarget.style.backgroundColor = 'transparent'; }, children: [jsxRuntime.jsx("svg", { style: { width: '16px', height: '16px' }, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntime.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" }) }), "Edit Link"] }), jsxRuntime.jsxs("button", { onClick: handleRemoveLink, style: {
                                        width: '100%',
                                        padding: '12px 16px',
                                        border: 'none',
                                        borderTop: '1px solid #e5e7eb',
                                        backgroundColor: 'transparent',
                                        color: '#ef4444',
                                        fontSize: '14px',
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        fontWeight: '500',
                                    }, onMouseEnter: function (e) { return e.currentTarget.style.backgroundColor = '#fef2f2'; }, onMouseLeave: function (e) { return e.currentTarget.style.backgroundColor = 'transparent'; }, children: [jsxRuntime.jsx("svg", { style: { width: '16px', height: '16px' }, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntime.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) }), "Remove Link"] })] }) })), jsxRuntime.jsxs(Slate, { editor: editor, initialValue: value, onValueChange: handleChange, children: [toolbarItems.length > 0 && (jsxRuntime.jsx(Toolbar, { items: toolbarItems, onViewOutput: function (type) { return setShowOutputModal(type); }, onEditLink: function () { }, searchQuery: searchQuery, searchMatches: searchMatches, currentMatchIndex: currentMatchIndex, onSearchQueryChange: setInternalSearchQuery, onSearchMatchesChange: setInternalSearchMatches, onCurrentMatchIndexChange: setInternalCurrentMatchIndex, isFullscreen: isFullscreen, onFullscreenToggle: handleFullscreenToggle })), jsxRuntime.jsx(Editable, { renderElement: renderElementWithHandlers, renderLeaf: renderLeaf, decorate: decorate, placeholder: placeholder, onKeyDown: handleKeyDown, readOnly: readOnly, style: editableStyle })] }), showWordCount && (jsxRuntime.jsxs("div", { style: {
                            padding: '8px 12px',
                            backgroundColor: '#f9fafb',
                            borderTop: '1px solid #e5e7eb',
                            borderLeft: isFullscreen ? 'none' : '1px solid #ccc',
                            borderRight: isFullscreen ? 'none' : '1px solid #ccc',
                            borderBottom: isFullscreen ? 'none' : '1px solid #ccc',
                            borderRadius: isFullscreen ? '0' : '0 0 4px 4px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '20px',
                            fontSize: '12px',
                            color: '#6b7280',
                            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        }, children: [jsxRuntime.jsxs("div", { style: { display: 'flex', gap: '20px' }, children: [jsxRuntime.jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '6px' }, children: [jsxRuntime.jsx("span", { style: { fontWeight: '500', color: '#374151' }, children: "Words:" }), jsxRuntime.jsx("span", { style: { fontWeight: '600', color: '#111827' }, children: wordCount.toLocaleString() })] }), jsxRuntime.jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '6px' }, children: [jsxRuntime.jsx("span", { style: { fontWeight: '500', color: '#374151' }, children: "Characters:" }), jsxRuntime.jsx("span", { style: { fontWeight: '600', color: '#111827' }, children: charCount.toLocaleString() })] }), jsxRuntime.jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '6px' }, children: [jsxRuntime.jsx("span", { style: { fontWeight: '500', color: '#374151' }, children: "Characters (no spaces):" }), jsxRuntime.jsx("span", { style: { fontWeight: '600', color: '#111827' }, children: charCountNoSpaces.toLocaleString() })] })] }), jsxRuntime.jsxs("div", { style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    color: '#9ca3af',
                                    fontSize: '11px',
                                }, children: [jsxRuntime.jsx("span", { children: "Built with" }), jsxRuntime.jsx("span", { style: {
                                            fontWeight: '600',
                                            color: '#3b82f6',
                                            letterSpacing: '0.5px',
                                            cursor: 'pointer',
                                        }, onClick: function (e) {
                                            e.preventDefault();
                                            window.open('https://www.npmjs.com/package/editium', '_blank');
                                        }, children: "Editium" })] })] })), showOutputModal && (jsxRuntime.jsx("div", { style: {
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 10000,
                        }, onClick: function () {
                            setShowOutputModal(null);
                            setCopySuccess(false);
                        }, children: jsxRuntime.jsxs("div", { style: {
                                backgroundColor: '#ffffff',
                                borderRadius: '8px',
                                padding: '24px',
                                maxWidth: '900px',
                                maxHeight: '85vh',
                                width: '90%',
                                overflow: 'hidden',
                                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                                display: 'flex',
                                flexDirection: 'column',
                            }, onClick: function (e) { return e.stopPropagation(); }, children: [jsxRuntime.jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }, children: [jsxRuntime.jsx("h2", { style: { margin: 0, color: '#111827', fontSize: '24px', fontWeight: '600' }, children: showOutputModal === 'html' ? 'HTML Output' : showOutputModal === 'json' ? 'JSON Output' : 'Preview' }), jsxRuntime.jsxs("div", { style: { display: 'flex', gap: '8px', alignItems: 'center' }, children: [showOutputModal !== 'preview' && (jsxRuntime.jsx("button", { onClick: handleCopy, style: {
                                                        backgroundColor: copySuccess ? '#10b981' : '#3b82f6',
                                                        color: '#ffffff',
                                                        border: 'none',
                                                        borderRadius: '6px',
                                                        padding: '8px 16px',
                                                        fontSize: '14px',
                                                        fontWeight: '500',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s ease-in-out',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '6px',
                                                    }, onMouseEnter: function (e) {
                                                        if (!copySuccess) {
                                                            e.currentTarget.style.backgroundColor = '#2563eb';
                                                        }
                                                    }, onMouseLeave: function (e) {
                                                        if (!copySuccess) {
                                                            e.currentTarget.style.backgroundColor = '#3b82f6';
                                                        }
                                                    }, title: "Copy to clipboard", children: copySuccess ? (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("svg", { style: { width: '16px', height: '16px' }, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntime.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }), "Copied!"] })) : (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("svg", { style: { width: '16px', height: '16px' }, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntime.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" }) }), "Copy"] })) })), jsxRuntime.jsx("button", { onClick: function () {
                                                        setShowOutputModal(null);
                                                        setCopySuccess(false);
                                                    }, style: {
                                                        background: 'none',
                                                        border: 'none',
                                                        fontSize: '24px',
                                                        cursor: 'pointer',
                                                        color: '#6b7280',
                                                        padding: '4px',
                                                        lineHeight: 1,
                                                    }, title: "Close", children: "\u00D7" })] })] }), jsxRuntime.jsx("div", { style: {
                                        flex: 1,
                                        overflow: 'auto',
                                        backgroundColor: showOutputModal === 'preview' ? '#ffffff' : '#1e293b',
                                        borderRadius: '6px',
                                        border: showOutputModal === 'preview' ? '1px solid #e5e7eb' : '1px solid #334155',
                                        padding: showOutputModal === 'preview' ? '20px' : '0',
                                    }, children: showOutputModal === 'preview' ? (jsxRuntime.jsx("div", { dangerouslySetInnerHTML: { __html: serializeToHtml(editor.children) }, style: {
                                            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                                            fontSize: '16px',
                                            lineHeight: '1.6',
                                            color: '#111827',
                                        } })) : (jsxRuntime.jsx("pre", { style: {
                                            margin: 0,
                                            padding: '20px',
                                            fontSize: '13px',
                                            lineHeight: '1.6',
                                            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                                            color: '#e2e8f0',
                                            overflowX: 'auto',
                                            whiteSpace: 'pre-wrap',
                                            wordBreak: 'break-word',
                                        }, children: jsxRuntime.jsx("code", { children: showOutputModal === 'html'
                                                ? formatHtml(serializeToHtml(editor.children))
                                                : JSON.stringify(editor.children, null, 2) }) })) })] }) }))] })] }));
};

exports.ALL_TOOLBAR_ITEMS = ALL_TOOLBAR_ITEMS;
exports.Editium = Editium;
exports.ResizableImage = ResizableImage;
exports.TableCellComponent = TableCellComponent;
exports.TableComponent = TableComponent;
exports.TableRowComponent = TableRowComponent;
exports.addTableColumn = addTableColumn;
exports.addTableRow = addTableRow;
exports.defaultInitialValue = defaultInitialValue;
exports.findAllMatches = findAllMatches;
exports.insertLink = insertLink;
exports.insertTable = insertTable;
exports.isBlockActive = isBlockActive;
exports.isInTable = isInTable;
exports.isLinkActive = isLinkActive;
exports.isMarkActive = isMarkActive;
exports.navigateToMatch = navigateToMatch;
exports.removeTableColumn = removeTableColumn;
exports.removeTableRow = removeTableRow;
exports.replaceAllMatches = replaceAllMatches;
exports.replaceMatch = replaceMatch;
exports.serializeToHtml = serializeToHtml;
exports.setTableAlignment = setTableAlignment;
exports.toggleBlock = toggleBlock;
exports.toggleMark = toggleMark;
//# sourceMappingURL=index.js.map
