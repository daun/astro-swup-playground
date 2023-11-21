import t from "delegate-it";
import { match as e } from "path-to-regexp";
function i() {
  return (
    (i = Object.assign
      ? Object.assign.bind()
      : function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var i = arguments[e];
            for (var s in i)
              Object.prototype.hasOwnProperty.call(i, s) && (t[s] = i[s]);
          }
          return t;
        }),
    i.apply(this, arguments)
  );
}
const s = (t, e) =>
    String(t)
      .toLowerCase()
      .replace(/[\s/_.]+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+|-+$/g, "") ||
    e ||
    "",
  n = ({ hash: t } = {}) =>
    location.pathname + location.search + (t ? location.hash : ""),
  o = (t, e = {}) => {
    const s = i(
      {
        url: (t = t || n({ hash: !0 })),
        random: Math.random(),
        source: "swup",
      },
      e
    );
    history.pushState(s, "", t);
  },
  r = (t = null, e = {}) => {
    t = t || n({ hash: !0 });
    const s = i(
      {},
      history.state || {},
      { url: t, random: Math.random(), source: "swup" },
      e
    );
    history.replaceState(s, "", t);
  },
  a = (e, s, n, o) => {
    const r = new AbortController();
    return (
      (o = i({}, o, { signal: r.signal })),
      t(e, s, n, o),
      { destroy: () => r.abort() }
    );
  };
class l extends URL {
  constructor(t, e = document.baseURI) {
    super(t.toString(), e), Object.setPrototypeOf(this, l.prototype);
  }
  get url() {
    return this.pathname + this.search;
  }
  static fromElement(t) {
    const e = t.getAttribute("href") || t.getAttribute("xlink:href") || "";
    return new l(e);
  }
  static fromUrl(t) {
    return new l(t);
  }
}
const h = (t, i) => {
  try {
    return e(t, i);
  } catch (e) {
    throw new Error(`[swup] Error parsing path "${String(t)}":\n${String(e)}`);
  }
};
class c extends Error {
  constructor(t, e) {
    super(t),
      (this.url = void 0),
      (this.status = void 0),
      (this.aborted = void 0),
      (this.timedOut = void 0),
      (this.name = "FetchError"),
      (this.url = e.url),
      (this.status = e.status),
      (this.aborted = e.aborted || !1),
      (this.timedOut = e.timedOut || !1);
  }
}
async function u(t, e = {}) {
  var s;
  t = l.fromUrl(t).url;
  const { visit: n = this.visit } = e,
    o = i({}, this.options.requestHeaders, e.headers),
    r = null != (s = e.timeout) ? s : this.options.timeout,
    a = new AbortController(),
    { signal: h } = a;
  e = i({}, e, { headers: o, signal: h });
  let u,
    d = !1,
    p = null;
  r &&
    r > 0 &&
    (p = setTimeout(() => {
      (d = !0), a.abort("timeout");
    }, r));
  try {
    (u = await this.hooks.call(
      "fetch:request",
      n,
      { url: t, options: e },
      (t, { url: e, options: i }) => fetch(e, i)
    )),
      p && clearTimeout(p);
  } catch (e) {
    if (d)
      throw (
        (this.hooks.call("fetch:timeout", n, { url: t }),
        new c(`Request timed out: ${t}`, { url: t, timedOut: d }))
      );
    if ("AbortError" === (null == e ? void 0 : e.name) || h.aborted)
      throw new c(`Request aborted: ${t}`, { url: t, aborted: !0 });
    throw e;
  }
  const { status: m, url: g } = u,
    f = await u.text();
  if (500 === m)
    throw (
      (this.hooks.call("fetch:error", n, { status: m, response: u, url: g }),
      new c(`Server error: ${g}`, { status: m, url: g }))
    );
  if (!f) throw new c(`Empty response: ${g}`, { status: m, url: g });
  const { url: v } = l.fromUrl(g),
    w = { url: v, html: f };
  return (
    !n.cache.write ||
      (e.method && "GET" !== e.method) ||
      t !== v ||
      this.cache.set(w.url, w),
    w
  );
}
class d {
  constructor(t) {
    (this.swup = void 0), (this.pages = new Map()), (this.swup = t);
  }
  get size() {
    return this.pages.size;
  }
  get all() {
    const t = new Map();
    return (
      this.pages.forEach((e, s) => {
        t.set(s, i({}, e));
      }),
      t
    );
  }
  has(t) {
    return this.pages.has(this.resolve(t));
  }
  get(t) {
    const e = this.pages.get(this.resolve(t));
    return e ? i({}, e) : e;
  }
  set(t, e) {
    (e = i({}, e, { url: (t = this.resolve(t)) })),
      this.pages.set(t, e),
      this.swup.hooks.callSync("cache:set", void 0, { page: e });
  }
  update(t, e) {
    t = this.resolve(t);
    const s = i({}, this.get(t), e, { url: t });
    this.pages.set(t, s);
  }
  delete(t) {
    this.pages.delete(this.resolve(t));
  }
  clear() {
    this.pages.clear(), this.swup.hooks.callSync("cache:clear", void 0, void 0);
  }
  prune(t) {
    this.pages.forEach((e, i) => {
      t(i, e) && this.delete(i);
    });
  }
  resolve(t) {
    const { url: e } = l.fromUrl(t);
    return this.swup.resolveUrl(e);
  }
}
const p = (t, e = document) => e.querySelector(t),
  m = (t, e = document) => Array.from(e.querySelectorAll(t)),
  g = () =>
    new Promise((t) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          t();
        });
      });
    });
function f(t) {
  return (
    !!t &&
    ("object" == typeof t || "function" == typeof t) &&
    "function" == typeof t.then
  );
}
function v(t, e = []) {
  return new Promise((i, s) => {
    const n = t(...e);
    f(n) ? n.then(i, s) : i(n);
  });
}
function w(t) {
  var e;
  return null == (e = t = t || document.body) ? void 0 : e.offsetHeight;
}
const y = (t) => (window.CSS && window.CSS.escape ? CSS.escape(t) : t),
  E = (t) => 1e3 * Number(t.slice(0, -1).replace(",", "."));
class k {
  constructor(t) {
    (this.swup = void 0),
      (this.swupClasses = [
        "to-",
        "is-changing",
        "is-rendering",
        "is-popstate",
        "is-animating",
        "is-leaving",
      ]),
      (this.swup = t);
  }
  get selectors() {
    const { scope: t } = this.swup.visit.animation;
    return "containers" === t
      ? this.swup.visit.containers
      : "html" === t
      ? ["html"]
      : Array.isArray(t)
      ? t
      : [];
  }
  get selector() {
    return this.selectors.join(",");
  }
  get targets() {
    return this.selector.trim() ? m(this.selector) : [];
  }
  add(...t) {
    this.targets.forEach((e) => e.classList.add(...t));
  }
  remove(...t) {
    this.targets.forEach((e) => e.classList.remove(...t));
  }
  clear() {
    this.targets.forEach((t) => {
      const e = t.className.split(" ").filter((t) => this.isSwupClass(t));
      t.classList.remove(...e);
    });
  }
  isSwupClass(t) {
    return this.swupClasses.some((e) => t.startsWith(e));
  }
}
var b;
!(function (t) {
  (t[(t.CREATED = 1)] = "CREATED"),
    (t[(t.QUEUED = 2)] = "QUEUED"),
    (t[(t.STARTED = 3)] = "STARTED"),
    (t[(t.LEAVING = 4)] = "LEAVING"),
    (t[(t.LOADED = 5)] = "LOADED"),
    (t[(t.ENTERING = 6)] = "ENTERING"),
    (t[(t.COMPLETED = 7)] = "COMPLETED"),
    (t[(t.ABORTED = 8)] = "ABORTED"),
    (t[(t.FAILED = 9)] = "FAILED");
})(b || (b = {}));
class S {
  constructor(t, e) {
    (this.id = void 0),
      (this.state = void 0),
      (this.from = void 0),
      (this.to = void 0),
      (this.containers = void 0),
      (this.animation = void 0),
      (this.trigger = void 0),
      (this.cache = void 0),
      (this.history = void 0),
      (this.scroll = void 0);
    const { to: i, from: s = t.currentPageUrl, hash: n, el: o, event: r } = e;
    (this.id = Math.random()),
      (this.state = b.CREATED),
      (this.from = { url: s }),
      (this.to = { url: i, hash: n }),
      (this.containers = t.options.containers),
      (this.animation = {
        animate: !0,
        wait: !1,
        name: void 0,
        scope: t.options.animationScope,
        selector: t.options.animationSelector,
      }),
      (this.trigger = { el: o, event: r }),
      (this.cache = { read: t.options.cache, write: t.options.cache }),
      (this.history = { action: "push", popstate: !1, direction: void 0 }),
      (this.scroll = { reset: !0, target: void 0 });
  }
  advance(t) {
    this.state <= t && (this.state = t);
  }
  abort() {
    this.state = b.ABORTED;
  }
  get aborted() {
    return this.state === b.ABORTED;
  }
}
function A(t) {
  return new S(this, t);
}
class U {
  constructor(t) {
    (this.swup = void 0),
      (this.registry = new Map()),
      (this.hooks = [
        "animation:out:start",
        "animation:out:await",
        "animation:out:end",
        "animation:in:start",
        "animation:in:await",
        "animation:in:end",
        "animation:skip",
        "cache:clear",
        "cache:set",
        "content:replace",
        "content:scroll",
        "enable",
        "disable",
        "fetch:request",
        "fetch:error",
        "fetch:timeout",
        "history:popstate",
        "link:click",
        "link:self",
        "link:anchor",
        "link:newtab",
        "page:load",
        "page:view",
        "scroll:top",
        "scroll:anchor",
        "visit:start",
        "visit:transition",
        "visit:abort",
        "visit:end",
      ]),
      (this.swup = t),
      this.init();
  }
  init() {
    this.hooks.forEach((t) => this.create(t));
  }
  create(t) {
    this.registry.has(t) || this.registry.set(t, new Map());
  }
  exists(t) {
    return this.registry.has(t);
  }
  get(t) {
    const e = this.registry.get(t);
    if (e) return e;
    console.error(`Unknown hook '${t}'`);
  }
  clear() {
    this.registry.forEach((t) => t.clear());
  }
  on(t, e, s = {}) {
    const n = this.get(t);
    if (!n) return console.warn(`Hook '${t}' not found.`), () => {};
    const o = i({}, s, { id: n.size + 1, hook: t, handler: e });
    return n.set(e, o), () => this.off(t, e);
  }
  before(t, e, s = {}) {
    return this.on(t, e, i({}, s, { before: !0 }));
  }
  replace(t, e, s = {}) {
    return this.on(t, e, i({}, s, { replace: !0 }));
  }
  once(t, e, s = {}) {
    return this.on(t, e, i({}, s, { once: !0 }));
  }
  off(t, e) {
    const i = this.get(t);
    i && e
      ? i.delete(e) || console.warn(`Handler for hook '${t}' not found.`)
      : i && i.clear();
  }
  async call(t, e, i, s) {
    const [n, o, r] = this.parseCallArgs(t, e, i, s),
      { before: a, handler: l, after: h } = this.getHandlers(t, r);
    await this.run(a, n, o);
    const [c] = await this.run(l, n, o);
    return await this.run(h, n, o), this.dispatchDomEvent(t, n, o), c;
  }
  callSync(t, e, i, s) {
    const [n, o, r] = this.parseCallArgs(t, e, i, s),
      { before: a, handler: l, after: h } = this.getHandlers(t, r);
    this.runSync(a, n, o);
    const [c] = this.runSync(l, n, o);
    return this.runSync(h, n, o), this.dispatchDomEvent(t, n, o), c;
  }
  parseCallArgs(t, e, i, s) {
    return e instanceof S || ("object" != typeof e && "function" != typeof i)
      ? [e, i, s]
      : [void 0, e, i];
  }
  async run(t, e, i) {
    const s = [];
    for (const { hook: n, handler: o, defaultHandler: r, once: a } of t) {
      if ((a && this.off(n, o), null != e && e.aborted)) continue;
      const t = await v(o, [e || this.swup.visit, i, r]);
      s.push(t);
    }
    return s;
  }
  runSync(t, e, i) {
    if (null != e && e.aborted) return [];
    const s = [];
    for (const { hook: n, handler: o, defaultHandler: r, once: a } of t) {
      a && this.off(n, o);
      const t = o(e || this.swup.visit, i, r);
      s.push(t),
        f(t) &&
          console.warn(
            `Promise returned from handler for synchronous hook '${n}'.Swup will not wait for it to resolve.`
          );
    }
    return s;
  }
  getHandlers(t, e) {
    const i = this.get(t);
    if (!i)
      return { found: !1, before: [], handler: [], after: [], replaced: !1 };
    const s = Array.from(i.values()),
      n = this.sortRegistrations,
      o = s.filter(({ before: t, replace: e }) => t && !e).sort(n),
      r = s
        .filter(({ replace: t }) => t)
        .filter((t) => !0)
        .sort(n),
      a = s.filter(({ before: t, replace: e }) => !t && !e).sort(n),
      l = r.length > 0;
    let h = [];
    if (e && ((h = [{ id: 0, hook: t, handler: e }]), l)) {
      const i = r.length - 1,
        s = (t) => {
          const i = r[t - 1];
          return i ? (e, n) => i.handler(e, n, s(t - 1)) : e;
        };
      h = [{ id: 0, hook: t, handler: r[i].handler, defaultHandler: s(i) }];
    }
    return { found: !0, before: o, handler: h, after: a, replaced: l };
  }
  sortRegistrations(t, e) {
    var i, s;
    return (
      (null != (i = t.priority) ? i : 0) - (null != (s = e.priority) ? s : 0) ||
      t.id - e.id ||
      0
    );
  }
  dispatchDomEvent(t, e, i) {
    if (null != e && e.aborted) return;
    const s = { hook: t, args: i, visit: e || this.swup.visit };
    document.dispatchEvent(
      new CustomEvent("swup:any", { detail: s, bubbles: !0 })
    ),
      document.dispatchEvent(
        new CustomEvent(`swup:${t}`, { detail: s, bubbles: !0 })
      );
  }
}
const P = (t) => {
    if ((t && "#" === t.charAt(0) && (t = t.substring(1)), !t)) return null;
    const e = decodeURIComponent(t);
    let i =
      document.getElementById(t) ||
      document.getElementById(e) ||
      p(`a[name='${y(t)}']`) ||
      p(`a[name='${y(e)}']`);
    return i || "top" !== t || (i = document.body), i;
  },
  C = "transition",
  D = "animation";
async function T({ elements: t, selector: e }) {
  if (!1 === e && !t) return;
  let i = [];
  if (t) i = Array.from(t);
  else if (e && ((i = m(e, document.body)), !i.length))
    return void console.warn(
      `[swup] No elements found matching animationSelector \`${e}\``
    );
  const s = i.map((t) =>
    (function (t) {
      const {
        type: e,
        timeout: i,
        propCount: s,
      } = (function (t, e) {
        const i = window.getComputedStyle(t),
          s = R(i, `${C}Delay`),
          n = R(i, `${C}Duration`),
          o = $(s, n),
          r = R(i, `${D}Delay`),
          a = R(i, `${D}Duration`),
          l = $(r, a);
        let h = null,
          c = 0,
          u = 0;
        return (
          (c = Math.max(o, l)),
          (h = c > 0 ? (o > l ? C : D) : null),
          (u = h ? (h === C ? n.length : a.length) : 0),
          { type: h, timeout: c, propCount: u }
        );
      })(t);
      return (
        !(!e || !i) &&
        new Promise((n) => {
          const o = `${e}end`,
            r = performance.now();
          let a = 0;
          const l = () => {
              t.removeEventListener(o, h), n();
            },
            h = (e) => {
              if (e.target === t) {
                if (
                  !(function (t) {
                    return [`${C}end`, `${D}end`].includes(t.type);
                  })(e)
                )
                  throw new Error("Not a transition or animation event.");
                (performance.now() - r) / 1e3 < e.elapsedTime ||
                  (++a >= s && l());
              }
            };
          setTimeout(() => {
            a < s && l();
          }, i + 1),
            t.addEventListener(o, h);
        })
      );
    })(t)
  );
  s.filter(Boolean).length > 0
    ? await Promise.all(s)
    : e &&
      console.warn(
        `[swup] No CSS animation duration defined on elements matching \`${e}\``
      );
}
function R(t, e) {
  return (t[e] || "").split(", ");
}
function $(t, e) {
  for (; t.length < e.length; ) t = t.concat(t);
  return Math.max(...e.map((e, i) => E(e) + E(t[i])));
}
function I(t, e = {}, s = {}) {
  if ("string" != typeof t)
    throw new Error("swup.navigate() requires a URL parameter");
  if (this.shouldIgnoreVisit(t, { el: s.el, event: s.event }))
    return void (window.location.href = t);
  const { url: n, hash: o } = l.fromUrl(t),
    r = this.createVisit(i({}, s, { to: n, hash: o }));
  this.performNavigation(r, e);
}
async function L(t, e = {}) {
  if (this.navigating) {
    if (this.visit.state >= b.ENTERING)
      return (
        (t.state = b.QUEUED),
        void (this.onVisitEnd = () => this.performNavigation(t, e))
      );
    await this.hooks.call("visit:abort", this.visit, void 0),
      (this.visit.state = b.ABORTED);
  }
  (this.navigating = !0), (this.visit = t);
  const { el: i } = t.trigger;
  (e.referrer = e.referrer || this.currentPageUrl),
    !1 === e.animate && (t.animation.animate = !1),
    t.animation.animate || this.classes.clear();
  const s =
    e.history ||
    (null == i ? void 0 : i.getAttribute("data-swup-history")) ||
    void 0;
  s && ["push", "replace"].includes(s) && (t.history.action = s);
  const a =
    e.animation ||
    (null == i ? void 0 : i.getAttribute("data-swup-animation")) ||
    void 0;
  var l, h;
  a && (t.animation.name = a),
    "object" == typeof e.cache
      ? ((t.cache.read = null != (l = e.cache.read) ? l : t.cache.read),
        (t.cache.write = null != (h = e.cache.write) ? h : t.cache.write))
      : void 0 !== e.cache && (t.cache = { read: !!e.cache, write: !!e.cache }),
    delete e.cache;
  try {
    await this.hooks.call("visit:start", t, void 0), (t.state = b.STARTED);
    const i = this.hooks.call("page:load", t, { options: e }, async (t, e) => {
      let i;
      return (
        t.cache.read && (i = this.cache.get(t.to.url)),
        (e.page = i || (await this.fetchPage(t.to.url, e.options))),
        (e.cache = !!i),
        e.page
      );
    });
    if ((i.then(() => t.advance(b.LOADED)), !t.history.popstate)) {
      const e = t.to.url + t.to.hash;
      "replace" === t.history.action || t.to.url === this.currentPageUrl
        ? r(e)
        : (this.currentHistoryIndex++,
          o(e, { index: this.currentHistoryIndex }));
    }
    if (((this.currentPageUrl = n()), t.animation.wait)) {
      const { html: e } = await i;
      t.to.html = e;
    }
    if (t.aborted) return;
    await this.hooks.call("visit:transition", t, void 0, async () => {
      t.advance(b.LEAVING);
      const e = this.animatePageOut(t),
        [s] = await Promise.all([i, e]);
      return (
        await this.renderPage(t, s),
        t.advance(b.ENTERING),
        await this.animatePageIn(t),
        !0
      );
    }),
      await this.hooks.call("visit:end", t, void 0, () => this.classes.clear()),
      (t.state = b.COMPLETED),
      (this.navigating = !1),
      this.onVisitEnd && (this.onVisitEnd(), (this.onVisitEnd = void 0));
  } catch (e) {
    if (!e || (null != e && e.aborted)) return void (t.state = b.ABORTED);
    (t.state = b.FAILED),
      console.error(e),
      (this.options.skipPopStateHandling = () => (
        (window.location.href = t.to.url + t.to.hash), !0
      )),
      window.history.go(-1);
  }
}
const x = async function (t) {
    t.animation.animate
      ? t.aborted ||
        (await this.hooks.call("animation:out:start", t, void 0, (t) => {
          this.classes.add("is-changing", "is-leaving", "is-animating"),
            t.history.popstate && this.classes.add("is-popstate"),
            t.animation.name && this.classes.add(`to-${s(t.animation.name)}`);
        }),
        await this.hooks.call(
          "animation:out:await",
          t,
          { skip: !1 },
          async (t, { skip: e }) => {
            e ||
              (await this.awaitAnimations({ selector: t.animation.selector }));
          }
        ),
        await this.hooks.call("animation:out:end", t, void 0))
      : await this.hooks.call("animation:skip", t, void 0);
  },
  O = function ({ html: t }, { containers: e } = this.options) {
    var i;
    const s = new DOMParser().parseFromString(t, "text/html"),
      n = (null == (i = s.querySelector("title")) ? void 0 : i.innerText) || "";
    document.title = n;
    const o = m('[data-swup-persist]:not([data-swup-persist=""])'),
      r = e
        .map((t) => {
          const e = document.querySelector(t),
            i = s.querySelector(t);
          return e && i
            ? (e.replaceWith(i), !0)
            : (e ||
                console.warn(
                  `[swup] Container missing in current document: ${t}`
                ),
              i ||
                console.warn(
                  `[swup] Container missing in incoming document: ${t}`
                ),
              !1);
        })
        .filter(Boolean);
    return (
      o.forEach((t) => {
        const e = t.getAttribute("data-swup-persist"),
          i = p(`[data-swup-persist="${e}"]`);
        i && i !== t && i.replaceWith(t);
      }),
      r.length === e.length
    );
  },
  N = function (t) {
    const e = { behavior: "auto" },
      { target: s, reset: n } = t.scroll,
      o = null != s ? s : t.to.hash;
    let r = !1;
    return (
      o &&
        (r = this.hooks.callSync(
          "scroll:anchor",
          t,
          { hash: o, options: e },
          (t, { hash: e, options: i }) => {
            const s = this.getAnchorElement(e);
            return s && s.scrollIntoView(i), !!s;
          }
        )),
      n &&
        !r &&
        (r = this.hooks.callSync(
          "scroll:top",
          t,
          { options: e },
          (t, { options: e }) => (
            window.scrollTo(i({ top: 0, left: 0 }, e)), !0
          )
        )),
      r
    );
  },
  H = async function (t) {
    if (!t.animation.animate) return;
    const e = this.hooks.call(
      "animation:in:await",
      t,
      { skip: !1 },
      async (t, { skip: e }) => {
        e || (await this.awaitAnimations({ selector: t.animation.selector }));
      }
    );
    await g(),
      await this.hooks.call("animation:in:start", t, void 0, () => {
        this.classes.remove("is-animating");
      }),
      await e,
      await this.hooks.call("animation:in:end", t, void 0);
  },
  q = async function (t, e) {
    if (t.aborted) return;
    const { url: i, html: o } = e;
    this.classes.remove("is-leaving"),
      this.isSameResolvedUrl(n(), i) ||
        (r(i), (this.currentPageUrl = n()), (t.to.url = this.currentPageUrl)),
      t.animation.animate && this.classes.add("is-rendering"),
      (t.to.html = o),
      await this.hooks.call(
        "content:replace",
        t,
        { page: e },
        (t, { page: e }) => {
          if (!this.replaceContent(e, { containers: t.containers }))
            throw new Error("[swup] Container mismatch, aborting");
          t.animation.animate &&
            (this.classes.add("is-animating", "is-changing", "is-rendering"),
            t.animation.name && this.classes.add(`to-${s(t.animation.name)}`));
        }
      ),
      await this.hooks.call("content:scroll", t, void 0, () =>
        this.scrollToContent(t)
      ),
      await this.hooks.call("page:view", t, {
        url: this.currentPageUrl,
        title: document.title,
      });
  },
  V = function (t) {
    var e;
    if (((e = t), Boolean(null == e ? void 0 : e.isSwupPlugin))) {
      if (((t.swup = this), !t._checkRequirements || t._checkRequirements()))
        return (
          t._beforeMount && t._beforeMount(),
          t.mount(),
          this.plugins.push(t),
          this.plugins
        );
    } else console.error("Not a swup plugin instance", t);
  };
function M(t) {
  const e = this.findPlugin(t);
  if (e)
    return (
      e.unmount(),
      e._afterUnmount && e._afterUnmount(),
      (this.plugins = this.plugins.filter((t) => t !== e)),
      this.plugins
    );
  console.error("No such plugin", e);
}
function B(t) {
  return this.plugins.find(
    (e) => e === t || e.name === t || e.name === `Swup${String(t)}`
  );
}
function W(t) {
  if ("function" != typeof this.options.resolveUrl)
    return (
      console.warn("[swup] options.resolveUrl expects a callback function."), t
    );
  const e = this.options.resolveUrl(t);
  return e && "string" == typeof e
    ? e.startsWith("//") || e.startsWith("http")
      ? (console.warn(
          "[swup] options.resolveUrl needs to return a relative url"
        ),
        t)
      : e
    : (console.warn("[swup] options.resolveUrl needs to return a url"), t);
}
function j(t, e) {
  return this.resolveUrl(t) === this.resolveUrl(e);
}
const G = {
  animateHistoryBrowsing: !1,
  animationSelector: '[class*="transition-"]',
  animationScope: "html",
  cache: !0,
  containers: ["#swup"],
  ignoreVisit: (t, { el: e } = {}) =>
    !(null == e || !e.closest("[data-no-swup]")),
  linkSelector: "a[href]",
  linkToSelf: "scroll",
  plugins: [],
  resolveUrl: (t) => t,
  requestHeaders: {
    "X-Requested-With": "swup",
    Accept: "text/html, application/xhtml+xml",
  },
  skipPopStateHandling: (t) => {
    var e;
    return "swup" !== (null == (e = t.state) ? void 0 : e.source);
  },
  timeout: 0,
};
class _ {
  constructor(t = {}) {
    var e, s;
    (this.version = "4.4.4"),
      (this.options = void 0),
      (this.defaults = G),
      (this.plugins = []),
      (this.visit = void 0),
      (this.cache = void 0),
      (this.hooks = void 0),
      (this.classes = void 0),
      (this.currentPageUrl = n()),
      (this.currentHistoryIndex = void 0),
      (this.clickDelegate = void 0),
      (this.navigating = !1),
      (this.onVisitEnd = void 0),
      (this.use = V),
      (this.unuse = M),
      (this.findPlugin = B),
      (this.log = () => {}),
      (this.navigate = I),
      (this.performNavigation = L),
      (this.createVisit = A),
      (this.delegateEvent = a),
      (this.fetchPage = u),
      (this.awaitAnimations = T),
      (this.renderPage = q),
      (this.replaceContent = O),
      (this.animatePageIn = H),
      (this.animatePageOut = x),
      (this.scrollToContent = N),
      (this.getAnchorElement = P),
      (this.getCurrentUrl = n),
      (this.resolveUrl = W),
      (this.isSameResolvedUrl = j),
      (this.options = i({}, this.defaults, t)),
      (this.handleLinkClick = this.handleLinkClick.bind(this)),
      (this.handlePopState = this.handlePopState.bind(this)),
      (this.cache = new d(this)),
      (this.classes = new k(this)),
      (this.hooks = new U(this)),
      (this.visit = this.createVisit({ to: "" })),
      (this.currentHistoryIndex =
        null != (e = null == (s = history.state) ? void 0 : s.index) ? e : 1),
      this.checkRequirements() && this.enable();
  }
  checkRequirements() {
    return (
      "undefined" != typeof Promise ||
      (console.warn("Promise is not supported"), !1)
    );
  }
  async enable() {
    var t;
    const { linkSelector: e } = this.options;
    (this.clickDelegate = this.delegateEvent(e, "click", this.handleLinkClick)),
      window.addEventListener("popstate", this.handlePopState),
      this.options.animateHistoryBrowsing &&
        (window.history.scrollRestoration = "manual"),
      this.options.plugins.forEach((t) => this.use(t)),
      "swup" !== (null == (t = history.state) ? void 0 : t.source) &&
        r(null, { index: this.currentHistoryIndex }),
      await g(),
      await this.hooks.call("enable", void 0, void 0, () => {
        document.documentElement.classList.add("swup-enabled");
      });
  }
  async destroy() {
    this.clickDelegate.destroy(),
      window.removeEventListener("popstate", this.handlePopState),
      this.cache.clear(),
      this.options.plugins.forEach((t) => this.unuse(t)),
      await this.hooks.call("disable", void 0, void 0, () => {
        document.documentElement.classList.remove("swup-enabled");
      }),
      this.hooks.clear();
  }
  shouldIgnoreVisit(t, { el: e, event: i } = {}) {
    const { origin: s, url: n, hash: o } = l.fromUrl(t);
    return (
      s !== window.location.origin ||
      !(!e || !this.triggerWillOpenNewWindow(e)) ||
      !!this.options.ignoreVisit(n + o, { el: e, event: i })
    );
  }
  handleLinkClick(t) {
    const e = t.delegateTarget,
      { href: i, url: s, hash: n } = l.fromElement(e);
    if (this.shouldIgnoreVisit(i, { el: e, event: t })) return;
    if (this.navigating && s === this.visit.to.url)
      return void t.preventDefault();
    const o = this.createVisit({ to: s, hash: n, el: e, event: t });
    t.metaKey || t.ctrlKey || t.shiftKey || t.altKey
      ? this.hooks.callSync("link:newtab", o, { href: i })
      : 0 === t.button &&
        this.hooks.callSync("link:click", o, { el: e, event: t }, () => {
          var e;
          const i = null != (e = o.from.url) ? e : "";
          console.log(JSON.stringify(s), JSON.stringify(i));
          t.preventDefault(),
            s && s !== i
              ? this.isSameResolvedUrl(s, i) || this.performNavigation(o)
              : n
              ? this.hooks.callSync("link:anchor", o, { hash: n }, () => {
                  r(s + n), this.scrollToContent(o);
                })
              : this.hooks.callSync("link:self", o, void 0, () => {
                  "navigate" === this.options.linkToSelf
                    ? this.performNavigation(o)
                    : (r(s), this.scrollToContent(o));
                });
        });
  }
  handlePopState(t) {
    var e, i, s, o;
    const r =
      null != (e = null == (i = t.state) ? void 0 : i.url) ? e : location.href;
    if (this.options.skipPopStateHandling(t)) return;
    if (this.isSameResolvedUrl(n(), this.currentPageUrl)) return;
    const { url: a, hash: h } = l.fromUrl(r),
      c = this.createVisit({ to: a, hash: h, event: t });
    c.history.popstate = !0;
    const u = null != (s = null == (o = t.state) ? void 0 : o.index) ? s : 0;
    u &&
      u !== this.currentHistoryIndex &&
      ((c.history.direction =
        u - this.currentHistoryIndex > 0 ? "forwards" : "backwards"),
      (this.currentHistoryIndex = u)),
      (c.animation.animate = !1),
      (c.scroll.reset = !1),
      (c.scroll.target = !1),
      this.options.animateHistoryBrowsing &&
        ((c.animation.animate = !0), (c.scroll.reset = !0)),
      this.hooks.callSync("history:popstate", c, { event: t }, () => {
        this.performNavigation(c);
      });
  }
  triggerWillOpenNewWindow(t) {
    return !!t.matches('[download], [target="_blank"]');
  }
}
export {
  l as Location,
  s as classify,
  o as createHistoryRecord,
  _ as default,
  a as delegateEvent,
  y as escapeCssIdentifier,
  w as forceReflow,
  n as getCurrentUrl,
  f as isPromise,
  h as matchPath,
  g as nextTick,
  p as query,
  m as queryAll,
  v as runAsPromise,
  E as toMs,
  r as updateHistoryRecord,
};
//# sourceMappingURL=Swup.modern.js.map
