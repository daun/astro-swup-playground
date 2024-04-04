import { Location as e, nextTick as t } from "swup";
import n from "@swup/plugin";
import "focus-options-polyfill";
class i {
  constructor() {
    (this.liveRegion = void 0),
      (this.liveRegionId = "swup-announcer"),
      (this.liveRegionStyles =
        "\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\tleft: 0;\n\t\tclip: rect(0 0 0 0);\n\t\tclip-path: inset(50%);\n\t\toverflow: hidden;\n\t\twhite-space: nowrap;\n\t\tword-wrap: normal;\n\t\twidth: 1px;\n\t\theight: 1px;\n\t"),
      (this.liveRegion = this.getLiveRegion() ?? this.createLiveRegion());
  }
  getLiveRegion() {
    return document.getElementById(this.liveRegionId);
  }
  createLiveRegion() {
    const e = (function (e) {
      const t = document.createElement("template");
      return (t.innerHTML = e), t.content.children[0];
    })(
      `<p aria-live="assertive" aria-atomic="true" id="${this.liveRegionId}" style="${this.liveRegionStyles}"></p>`
    );
    return document.body.appendChild(e), e;
  }
  announce(e) {
    setTimeout(() => {
      this.liveRegion.textContent = e;
    });
  }
}
class o extends n {
  constructor(e = {}) {
    super(),
      (this.name = "SwupA11yPlugin"),
      (this.requires = { swup: ">=4" }),
      (this.defaults = {
        contentSelector: "main",
        headingSelector: "h1, h2, [role=heading]",
        respectReducedMotion: !1,
        autofocus: !1,
        announcements: {
          visit: "Navigated to: {title}",
          url: "New page at {url}",
        },
      }),
      (this.options = void 0),
      (this.announcer = void 0),
      (this.announce = (e) => {
        this.announcer.announce(e);
      }),
      (e.announcements = {
        ...this.defaults.announcements,
        visit:
          e.announcementTemplate ?? String(this.defaults.announcements.visit),
        url: e.urlTemplate ?? String(this.defaults.announcements.url),
        ...e.announcements,
      }),
      (this.options = { ...this.defaults, ...e }),
      (this.announcer = new i());
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
  prepareVisit(e) {
    e.a11y = { announce: void 0, focus: this.options.contentSelector };
  }
  prepareAnnouncement(t) {
    if (void 0 !== t.a11y.announce) return;
    const {
        contentSelector: n,
        headingSelector: i,
        announcements: o,
      } = this.options,
      { href: s, url: a, pathname: r } = e.fromUrl(window.location.href),
      u = o[document.documentElement.lang || "*"] || o;
    if ("object" != typeof u) return;
    const c = document.querySelector(`${n} ${i}`);
    let l = c?.getAttribute("aria-label") || c?.textContent;
    l =
      l ||
      document.title ||
      this.parseTemplate(u.url, { href: s, url: a, path: r });
    const h = this.parseTemplate(u.visit, {
      title: l,
      href: s,
      url: a,
      path: r,
    });
    t.a11y.announce = h;
  }
  parseTemplate(e, t) {
    return Object.keys(t).reduce(
      (e, n) => e.replace(`{${n}}`, t[n] || ""),
      e || ""
    );
  }
  handleNewPageContent() {
    const e = this;
    t().then(function () {
      try {
        return (
          e.swup.hooks.call("content:announce", void 0, void 0, (t) => {
            e.announcePageName(t);
          }),
          e.swup.hooks.call("content:focus", void 0, void 0, (t) => {
            e.focusPageContent(t);
          }),
          Promise.resolve()
        );
      } catch (e) {
        return Promise.reject(e);
      }
    });
  }
  announcePageName(e) {
    e.a11y.announce && this.announcer.announce(e.a11y.announce);
  }
  focusPageContent(e) {
    try {
      const t = this;
      if (!e.a11y.focus) return Promise.resolve();
      if (t.options.autofocus) {
        const n = t.getAutofocusElement();
        if (n && n !== document.activeElement)
          return (
            t.swup.hooks.once("visit:end", (t) => {
              t.id === e.id && n.focus();
            }),
            Promise.resolve()
          );
      }
      const n = document.querySelector(e.a11y.focus);
      return (
        n instanceof HTMLElement &&
          (t.needsTabindex(n) && n.setAttribute("tabindex", "-1"),
          n.focus({ preventScroll: !0 })),
        Promise.resolve()
      );
    } catch (e) {
      return Promise.reject(e);
    }
  }
  getAutofocusElement() {
    const e = document.querySelector("body [autofocus]");
    if (e && !e.closest('inert, [aria-disabled], [aria-hidden="true"]'))
      return e;
  }
  disableTransitionAnimations(e) {
    e.animation.animate = e.animation.animate && this.shouldAnimate();
  }
  disableScrollAnimations(e) {
    e.scroll.animate = e.scroll.animate && this.shouldAnimate();
  }
  shouldAnimate() {
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  needsTabindex(e) {
    return !e.matches(
      "a, button, input, textarea, select, details, [tabindex]"
    );
  }
}
export { o as default };
//# sourceMappingURL=index.module.js.map
