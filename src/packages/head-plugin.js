import e from "@swup/plugin";
function t(e) {
  return "title" !== e.localName && !e.matches("[data-swup-theme]");
}
function s(e, t) {
  return e.outerHTML === t.outerHTML;
}
class r extends e {
  constructor(e) {
    void 0 === e && (e = {}),
      super(),
      (this.name = "SwupHeadPlugin"),
      (this.requires = { swup: ">=4" }),
      (this.defaults = {
        persistTags: !1,
        persistAssets: !1,
        awaitAssets: !1,
        timeout: 3e3,
      }),
      (this.options = { ...this.defaults, ...e }),
      this.options.persistAssets &&
        !this.options.persistTags &&
        (this.options.persistTags = "link[rel=stylesheet], script[src], style");
  }
  mount() {
    this.before("content:replace", this.updateHead);
  }
  updateHead(e, r) {
    let {
      page: { html: n },
    } = r;
    try {
      const e = this,
        r = new DOMParser().parseFromString(n, "text/html"),
        { removed: l, added: u } = (function (e, r, n) {
          let { shouldPersist: o = () => !1 } = void 0 === n ? {} : n;
          const i = Array.from(e.children),
            l = Array.from(r.children),
            u =
              ((a = i),
              l.reduce(
                (e, t, r) => (
                  a.some((e) => s(t, e)) || e.push({ el: t, index: r }), e
                ),
                []
              ));
          var a;
          const d = (function (e, t) {
            return e.reduce(
              (e, r) => (t.some((e) => s(r, e)) || e.push({ el: r }), e),
              []
            );
          })(i, l);
          return (
            d
              .reverse()
              .filter((e) => {
                let { el: s } = e;
                return t(s);
              })
              .filter((e) => {
                let { el: t } = e;
                return !o(t);
              })
              .map((e) => {
                // console.log('removing', e.el.outerHTML);
                return e;
              })
              .forEach((t) => {
                let { el: s } = t;
                return e.removeChild(s);
              }),
            u
              .filter((e) => {
                let { el: s } = e;
                return t(s);
              })
              .map((e) => {
                // console.log('adding', e.el.outerHTML);
                return e;
              })
              .forEach((t) => {
                let { el: s, index: r } = t;
                e.insertBefore(s, e.children[r + 1] || null);
              }),
            {
              removed: d.map((e) => {
                let { el: t } = e;
                return t;
              }),
              added: u.map((e) => {
                let { el: t } = e;
                return t;
              }),
            }
          );
        })(document.head, r.head, {
          shouldPersist: (t) => e.isPersistentTag(t),
        });
      e.swup.log(`Removed ${l.length} / added ${u.length} tags in head`);
      const a =
        (o = document.documentElement).lang !== (i = r.documentElement).lang
          ? ((o.lang = i.lang), o.lang)
          : null;
      a && e.swup.log(`Updated lang attribute: ${a}`);
      const d = (function () {
        if (e.options.awaitAssets) {
          const s =
              (void 0 === (t = e.options.timeout) && (t = 0),
              u
                .filter((e) => e.matches("link[rel=stylesheet][href]"))
                .map((e) =>
                  (function (e, t) {
                    void 0 === t && (t = 0);
                    const s = (t) => {
                      ((e) => {
                        let { href: t } = e;
                        return Array.from(document.styleSheets)
                          .map((e) => {
                            let { href: t } = e;
                            return t;
                          })
                          .includes(t);
                      })(e)
                        ? t()
                        : setTimeout(() => s(t), 10);
                    };
                    return new Promise((e) => {
                      s(e), t > 0 && setTimeout(e, t);
                    });
                  })(e, t)
                )),
            r = (function () {
              if (s.length)
                return (
                  e.swup.log(`Waiting for ${s.length} assets to load`),
                  Promise.resolve(Promise.all(s)).then(function () {})
                );
            })();
          if (r && r.then) return r.then(function () {});
        }
        var t;
      })();
      return Promise.resolve(d && d.then ? d.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
    var o, i;
  }
  isPersistentTag(e) {
    const { persistTags: t } = this.options;
    return "function" == typeof t
      ? t(e)
      : "string" == typeof t
      ? e.matches(t)
      : Boolean(t);
  }
}
export { r as default };
//# sourceMappingURL=index.module.js.map
