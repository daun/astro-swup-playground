import e from "@swup/plugin";
import { getCurrentUrl as t, Location as s } from "swup";
class r extends e {
  constructor(e) {
    void 0 === e && (e = {}),
      super(),
      (this.name = "SwupFormsPlugin"),
      (this.requires = { swup: ">=4" }),
      (this.defaults = { formSelector: "form[data-swup-form]" }),
      (this.specialKeys = { Meta: !1, Control: !1, Shift: !1 }),
      (this.onKeyDown = (e) => {
        this.specialKeys.hasOwnProperty(e.key) &&
        (this.specialKeys[e.key] = !0);
        console.log('onKeyDown', e.key, this.specialKeys);
      }),
      (this.onKeyUp = (e) => {
        this.specialKeys.hasOwnProperty(e.key) &&
        (this.specialKeys[e.key] = !1);
        console.log('onKeyUp', e.key, this.specialKeys);
      }),
      (this.options = { ...this.defaults, ...e });
  }
  mount() {
    this.swup.hooks.create("form:submit"),
      this.swup.hooks.create("form:submit:newtab"),
      (this.formSubmitDelegate = this.swup.delegateEvent(
        this.options.formSelector,
        "submit",
        this.beforeFormSubmit.bind(this),
        { capture: !0 }
      )),
      document.addEventListener("keydown", this.onKeyDown),
      document.addEventListener("keyup", this.onKeyUp);
  }
  unmount() {
    this.formSubmitDelegate.destroy(),
      document.removeEventListener("keydown", this.onKeyDown),
      document.removeEventListener("keyup", this.onKeyUp);
  }
  beforeFormSubmit(e) {
    const s = this.swup,
      r = e.target,
      o = r.getAttribute("action") || t(),
      i = this.isSpecialKeyPressed(),
      a = "_blank" === r.getAttribute("target");
    console.log('beforeFormSubmit: special key pressed?', i, this.specialKeys);
    if (i || a || !s.shouldIgnoreVisit(o, { el: r, event: e })) {
      if (!a)
        return i
          ? (s.hooks.callSync("form:submit:newtab", { el: r, event: e }),
            (r.dataset.swupOriginalFormTarget = r.getAttribute("target") || ""),
            r.setAttribute("target", "_blank"),
            void r.addEventListener(
              "submit",
              () =>
                requestAnimationFrame(() => this.restorePreviousFormTarget(r)),
              { once: !0 }
            ))
          : void s.hooks.callSync("form:submit", { el: r, event: e }, () => {
              this.submitForm(e);
            });
      s.hooks.callSync("form:submit:newtab", { el: r, event: e });
    }
  }
  restorePreviousFormTarget(e) {
    e.dataset.swupOriginalFormTarget
      ? e.setAttribute("target", e.dataset.swupOriginalFormTarget)
      : e.removeAttribute("target");
  }
  submitForm(e) {
    const t = e.target,
      { url: s, hash: r, method: o, data: i, body: a } = this.getFormInfo(t);
    let n = s,
      u = { method: o };
    switch (o) {
      case "POST":
        u = { method: o, body: a };
        break;
      case "GET":
        n = this.appendQueryParams(n, i);
        break;
      default:
        return void console.warn(`Unsupported form method: ${o}`);
    }
    e.preventDefault(),
      this.swup.cache.delete(n),
      this.swup.navigate(n + r, u, { el: t, event: e });
  }
  getFormInfo(e) {
    const r = e.getAttribute("action") || t(),
      { url: o, hash: i } = s.fromUrl(r),
      a = (e.getAttribute("method") || "get").toUpperCase(),
      n = (
        e.getAttribute("enctype") || "application/x-www-form-urlencoded"
      ).toLowerCase(),
      u = "multipart/form-data" === n,
      m = new FormData(e);
    let h = m;
    return (
      u || (h = new URLSearchParams(m)),
      { url: o, hash: i, method: a, data: m, body: h, encoding: n }
    );
  }
  appendQueryParams(e, t) {
    const s = e.split("?")[0],
      r = new URLSearchParams(t).toString();
    return r ? `${s}?${r}` : s;
  }
  isSpecialKeyPressed() {
    console.log('key pressed?', Object.values(this.specialKeys).some((e) => e), this.specialKeys);
    return Object.values(this.specialKeys).some((e) => e);
  }
  resetSpecialKeys() {
    for (const [e, t] of Object.entries(this.specialKeys))
      this.specialKeys[e] = !1;
    console.log('reset', this.specialKeys);
  }
}
export { r as default };
//# sourceMappingURL=index.module.js.map
