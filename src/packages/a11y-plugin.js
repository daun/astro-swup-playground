import { Location as t, nextTick as e } from "swup";
import n from "@swup/plugin";
import "focus-options-polyfill";
class o {
  constructor() {
    (this.region = void 0),
      (this.id = "swup-announcer"),
      (this.style =
        "\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\tleft: 0;\n\t\tclip: rect(0 0 0 0);\n\t\tclip-path: inset(50%);\n\t\toverflow: hidden;\n\t\twhite-space: nowrap;\n\t\tword-wrap: normal;\n\t\twidth: 1px;\n\t\theight: 1px;\n\t"),
      (this.region = this.getRegion() ?? this.createRegion());
  }
  getRegion() {
    return document.getElementById(this.id);
  }
  createRegion() {
    const t = (function (t) {
      const e = document.createElement("template");
      return (e.innerHTML = t), e.content.children[0];
    })(
      `<p aria-live="assertive" aria-atomic="true" id="${this.id}" style="${this.style}"></p>`
    );
    return document.body.appendChild(t), t;
  }
  announce(t, e = 0) {
    setTimeout(() => {
      this.region.textContent = t;
    }, e);
  }
}
class i extends n {
  constructor(t = {}) {
    super(),
      (this.name = "SwupA11yPlugin"),
      (this.requires = { swup: ">=4" }),
      (this.defaults = {
        headingSelector: "h1",
        respectReducedMotion: !1,
        autofocus: !1,
        announcements: {
          visit: "Navigated to: {title}",
          url: "New page at {url}",
        },
      }),
      (this.options = void 0),
      (this.announcer = void 0),
      (this.rootSelector = "body"),
      (this.announce = (t) => {
        this.announcer.announce(t);
      }),
      (this.options = { ...this.defaults, ...t }),
      (this.announcer = new o());
  }
  mount() {
    this.swup.hooks.create("content:announce"),
      this.swup.hooks.create("content:focus"),
      this.before("visit:start", this.prepareVisit),
      this.on("visit:start", this.markAsBusy),
      this.on("visit:end", this.unmarkAsBusy),
      this.on("content:replace", this.prepareAnnouncement),
      this.on("content:replace", this.handleNewPageContent),
      this.options.respectReducedMotion &&
        (this.before("visit:start", this.disableTransitionAnimations),
        this.before("visit:start", this.disableScrollAnimations),
        this.before("link:self", this.disableScrollAnimations),
        this.before("link:anchor", this.disableScrollAnimations)),
      (this.swup.announce = this.announce);
  }
  unmount() {
    this.swup.announce = void 0;
  }
  markAsBusy() {
    document.documentElement.setAttribute("aria-busy", "true");
  }
  unmarkAsBusy() {
    document.documentElement.removeAttribute("aria-busy");
  }
  prepareVisit(t) {
    t.a11y = { announce: void 0, focus: this.rootSelector };
  }
  prepareAnnouncement(e) {
    if (void 0 !== e.a11y.announce) return;
    const { headingSelector: n, announcements: o } = this.options,
      { href: i, url: s, pathname: r } = t.fromUrl(window.location.href),
      a = o[document.documentElement.lang || "*"] || o;
    if ("object" != typeof a) return;
    const u = document.querySelector(n);
    u ||
      console.warn(`SwupA11yPlugin: No main heading (${n}) found in document`);
    let c = u?.getAttribute("aria-label") || u?.textContent;
    c =
      c ||
      document.title ||
      this.parseTemplate(a.url, { href: i, url: s, path: r });
    const l = this.parseTemplate(a.visit, {
      title: c,
      href: i,
      url: s,
      path: r,
    });
    e.a11y.announce = l;
  }
  parseTemplate(t, e) {
    return Object.keys(e).reduce(
      (t, n) => t.replace(`{${n}}`, e[n] || ""),
      t || ""
    );
  }
  handleNewPageContent() {
    const t = this;
    e().then(function () {
      try {
        return (
          t.swup.hooks.call("content:announce", void 0, void 0, (e) => {
            t.announcePageName(e);
          }),
          t.swup.hooks.call("content:focus", void 0, void 0, (e) => {
            t.focusPageContent(e);
          }),
          Promise.resolve()
        );
      } catch (t) {
        return Promise.reject(t);
      }
    });
  }
  announcePageName(t) {
    t.a11y.announce && this.announcer.announce(t.a11y.announce, 100);
  }
  focusPageContent(t) {
    try {
      const e = this;
      if (!t.a11y.focus) return Promise.resolve();
      if (e.options.autofocus) {
        const n = e.getAutofocusElement();
        if (n && n !== document.activeElement)
          return (
            e.swup.hooks.once("visit:end", (e) => {
              e.id === t.id && n.focus();
            }),
            Promise.resolve()
          );
      }
      const n = document.querySelector(t.a11y.focus);
      if (!(n instanceof HTMLElement)) return Promise.resolve();
      const o = n.getAttribute("tabindex");
      return (
        n.setAttribute("tabindex", "-1"),
        n.focus({ preventScroll: !0 }),
        null !== o
          ? n.setAttribute("tabindex", o)
          : n.removeAttribute("tabindex"),
        Promise.resolve()
      );
    } catch (t) {
      return Promise.reject(t);
    }
  }
  getAutofocusElement() {
    const t = document.querySelector("body [autofocus]");
    if (t && !t.closest('inert, [aria-disabled], [aria-hidden="true"]'))
      return t;
  }
  disableTransitionAnimations(t) {
    t.animation.animate = t.animation.animate && this.shouldAnimate();
  }
  disableScrollAnimations(t) {
    t.scroll.animate = t.scroll.animate && this.shouldAnimate();
  }
  shouldAnimate() {
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  needsTabindex(t) {
    return !t.matches(
      "a, button, input, textarea, select, details, [tabindex]"
    );
  }
}
export { i as default };
//# sourceMappingURL=index.module.js.map
