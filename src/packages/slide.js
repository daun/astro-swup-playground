import s from "./theme";
function t() {
  return (
    (t = Object.assign
      ? Object.assign.bind()
      : function (s) {
          for (var t = 1; t < arguments.length; t++) {
            var a = arguments[t];
            for (var e in a)
              Object.prototype.hasOwnProperty.call(a, e) && (s[e] = a[e]);
          }
          return s;
        }),
    t.apply(this, arguments)
  );
}
class a extends s {
  constructor(s = {}) {
    super();
    (this.name = "SwupSlideTheme");
    (this.defaults = { mainElement: "#swup", reversed: !1 });
    (this.options = t({}, this.defaults, s));
  }
  mount() {
    this.applyStyles(
      "html{--swup-slide-duration-fade:.3s;--swup-slide-duration-slide:.4s;--swup-slide-translate:60px;--swup-slide-direction:1;--swup-slide-translate-forward:calc(var(--swup-slide-direction)*var(--swup-slide-translate));--swup-slide-translate-backward:calc(var(--swup-slide-translate-forward)*-1)}html.swup-theme-reverse{--swup-slide-direction:-1}html.is-changing .swup-transition-main{opacity:1;-webkit-transform:translateZ(0);transform:translateZ(0);transition:opacity var(--swup-slide-duration-fade),-webkit-transform var(--swup-slide-duration-slide);transition:opacity var(--swup-slide-duration-fade),transform var(--swup-slide-duration-slide);transition:opacity var(--swup-slide-duration-fade),transform var(--swup-slide-duration-slide),-webkit-transform var(--swup-slide-duration-slide)}html.is-animating .swup-transition-main{opacity:0;-webkit-transform:translate3d(0,var(--swup-slide-translate-backward),0);transform:translate3d(0,var(--swup-slide-translate-backward),0)}html.is-animating.is-leaving .swup-transition-main{-webkit-transform:translate3d(0,var(--swup-slide-translate-forward),0);transform:translate3d(0,var(--swup-slide-translate-forward),0)}"
    ),
      this.addClassName(this.options.mainElement, "main"),
      this.options.reversed &&
        document.documentElement.classList.add("swup-theme-reverse");
  }
  unmount() {
    document.documentElement.classList.remove("swup-theme-reverse");
  }
}
export { a as default };
//# sourceMappingURL=index.modern.js.map
