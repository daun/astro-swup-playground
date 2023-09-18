import { nextTick as e } from "swup";
import t from "@swup/plugin";
import n from "on-demand-live-region";
import "focus-options-polyfill";
class o extends t {
  constructor(e) {
    void 0 === e && (e = {}),
      super(),
      (this.name = "SwupA11yPlugin"),
      (this.requires = { swup: ">=4" }),
      (this.defaults = {
        contentSelector: "main",
        headingSelector: "h1, h2, [role=heading]",
        respectReducedMotion: !1,
        announcements: {
          title: "Navigated to: {title}",
          url: "New page at {url}",
        },
      }),
      (this.options = void 0),
      (this.liveRegion = void 0),
      console.log(e),
      (e.announcements = {
        ...this.defaults.announcements,
        title: e.announcementTemplate ?? this.defaults.announcements.title,
        url: e.urlTemplate ?? this.defaults.announcements.url,
        ...e.announcements,
      }),
      (this.options = { ...this.defaults, ...e }),
      (this.liveRegion = new n());
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
        this.before("link:anchor", this.disableScrollAnimations));
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
  prepareAnnouncement(e) {
    if (void 0 !== e.a11y.announce) return;
    const {
        contentSelector: t,
        headingSelector: n,
        announcements: o,
      } = this.options,
      i = window.location.pathname,
      s = o[document.documentElement.lang || "*"] || o["*"] || o;
    console.log(o);
    console.log(s);
    if ("object" != typeof s) return;
    const a = document.querySelector(`${t} ${n}`);
    let r = a?.getAttribute("aria-label") || a?.textContent || document.title;
    r = r || this.parseTemplate(s.url, { url: i });
    const u = this.parseTemplate(s.title, { title: r, url: i });
    e.a11y.announce = u;
  }
  parseTemplate(e, t) {
    return Object.keys(t).reduce((e, n) => e.replace(`{${n}}`, t[n] || ""), e);
  }
  handleNewPageContent() {
    const t = this;
    e().then(function () {
      try {
        return (
          t.swup.hooks.call("content:announce", void 0, (e) => {
            t.announcePageName(e);
          }),
          t.swup.hooks.call("content:focus", void 0, (e) => {
            t.focusPageContent(e);
          }),
          Promise.resolve()
        );
      } catch (e) {
        return Promise.reject(e);
      }
    });
  }
  announcePageName(e) {
    e.a11y.announce && this.liveRegion.say(e.a11y.announce);
  }
  focusPageContent(e) {
    try {
      const t = this;
      if (!e.a11y.focus) return Promise.resolve();
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
