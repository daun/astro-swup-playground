import { queryAll as t } from "swup";
import e from "@swup/plugin";
import n from "morphdom";
const o = { INPUT: !0, TEXTAREA: !0, SELECT: !0 },
  r = { INPUT: !0, TEXTAREA: !0, OPTION: !0 },
  s = {
    "datetime-local": !0,
    "select-multiple": !0,
    "select-one": !0,
    color: !0,
    date: !0,
    datetime: !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    textarea: !0,
    time: !0,
    url: !0,
    week: !0,
  },
  i = [
    function (t, e) {
      return !(!r[t.tagName] && t.isEqualNode(e));
    },
    function (t, e) {
      const n = t.closest("[data-morph-persist]");
      if (
        !n &&
        o[(r = t).tagName] &&
        s[r.type] &&
        t === document.activeElement
      ) {
        const n = { value: !0 };
        return (
          Array.from(e.attributes).forEach((e) => {
            n[e.name] || t.setAttribute(e.name, e.value);
          }),
          !1
        );
      }
      var r;
      return !n;
    },
    function (t, e) {
      return t !== document.activeElement || !t.isContentEditable;
    },
  ];
function a(t, e, o = []) {
  const r = [...i, ...o];
  return n(t, e, {
    onBeforeElUpdated: (t, e) =>
      (function (t, e, n) {
        return !n.map((n) => "function" != typeof n || n(t, e)).includes(!1);
      })(t, e, r),
  });
}
class u extends e {
  constructor(t = {}) {
    super(),
      (this.name = "SwupMorphPlugin"),
      (this.requires = { swup: ">=4.6" }),
      (this.defaults = { containers: [], updateCallbacks: [] }),
      (this.options = void 0),
      (this.validateContainers = (t) => {
        t.containers = t.containers.filter(
          (t) => !this.options.containers.includes(t)
        );
      }),
      (this.morphContainers = (t) => {
        const e = this.getContainers(document, t.to.document),
          n = this.options.updateCallbacks || [];
        const before = t.to.document.outerHTML;
        for (const { selector: t, outgoing: o, incoming: r } of e)
          o && r
            ? a(o, r, n)
            : this.options.containers.includes(t) &&
              console.warn(
                `SwupMorphPlugin: No container found for selector: ${t}`
              );
        const after = t.to.document.outerHTML;
        if (before !== after) {
          console.warn("SwupMorphPlugin: Changes detected in new document!");
        } else {
          console.log("SwupMorphPlugin: No changes detected in new document");
        }
      }),
      (this.options = { ...this.defaults, ...t });
  }
  mount() {
    this.before("content:replace", this.validateContainers, { priority: 1 }),
      this.on("content:replace", this.morphContainers);
  }
  getContainers(t, e) {
    return this.getContainerSelectors().map((n) => ({
      selector: n,
      outgoing: t.querySelector(n),
      incoming: e.querySelector(n),
    }));
  }
  getContainerSelectors() {
    const e = this.options.containers,
      n = t('[data-swup-morph]:not([data-swup-morph=""])').map(
        (t) => `[data-swup-morph='${t.dataset.swupMorph}']`
      );
    return this.uniq([...e, ...n]);
  }
  uniq(t) {
    return [...new Set(t)];
  }
}
export { u as default };
//# sourceMappingURL=index.module.js.map
