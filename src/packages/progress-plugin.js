import t from "@swup/plugin";
function e() {
  return (
    (e = Object.assign
      ? Object.assign.bind()
      : function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var s = arguments[e];
            for (var i in s)
              Object.prototype.hasOwnProperty.call(s, i) && (t[i] = s[i]);
          }
          return t;
        }),
    e.apply(this, arguments)
  );
}
class s {
  constructor({
    className: t,
    styleAttr: e,
    animationDuration: s,
    minValue: i,
    initialValue: r,
    trickleValue: o,
  } = {}) {
    (this.value = 0),
      (this.visible = !1),
      (this.hiding = !1),
      (this.className = "progress-bar"),
      (this.styleAttr = "data-progressbar-styles data-swup-theme"),
      (this.animationDuration = 300),
      (this.minValue = 0.1),
      (this.initialValue = 0.25),
      (this.trickleValue = 0.03),
      (this.trickleInterval = void 0),
      (this.styleElement = void 0),
      (this.progressElement = void 0),
      (this.trickle = () => {
        const t = Math.random() * this.trickleValue;
        this.setValue(this.value + t);
      }),
      void 0 !== t && (this.className = String(t)),
      void 0 !== e && (this.styleAttr = String(e)),
      void 0 !== s && (this.animationDuration = Number(s)),
      void 0 !== i && (this.minValue = Number(i)),
      void 0 !== r && (this.initialValue = Number(r)),
      void 0 !== o && (this.trickleValue = Number(o)),
      (this.styleElement = this.createStyleElement()),
      (this.progressElement = this.createProgressElement());
  }
  get defaultStyles() {
    return `\n\t\t.${
      this.className
    } {\n\t\t\tposition: fixed;\n\t\t\tdisplay: block;\n\t\t\ttop: 0;\n\t\t\tleft: 0;\n\t\t\theight: 3px;\n\t\t\tbackground-color: black;\n\t\t\tz-index: 9999;\n\t\t\ttransition:\n\t\t\t\twidth ${
      this.animationDuration
    }ms ease-out,\n\t\t\t\topacity ${this.animationDuration / 2}ms ${
      this.animationDuration / 2
    }ms ease-in;\n\t\t\ttransform: translate3d(0, 0, 0);\n\t\t}\n\t`;
  }
  show() {
    this.visible ||
      ((this.visible = !0),
      this.installStyleElement(),
      this.installProgressElement(),
      this.startTrickling());
  }
  hide() {
    this.visible &&
      !this.hiding &&
      ((this.hiding = !0),
      this.fadeProgressElement(() => {
        this.uninstallProgressElement(),
          this.stopTrickling(),
          (this.visible = !1),
          (this.hiding = !1);
      }));
  }
  setValue(t) {
    (this.value = Math.min(1, Math.max(this.minValue, t))), this.refresh();
  }
  installStyleElement() {
    document.head.insertBefore(this.styleElement, document.head.firstChild);
  }
  installProgressElement() {
    (this.progressElement.style.width = "0%"),
      (this.progressElement.style.opacity = "1"),
      document.documentElement.insertBefore(
        this.progressElement,
        document.body
      ),
      (this.progressElement.scrollTop = 0),
      this.setValue(Math.random() * this.initialValue);
  }
  fadeProgressElement(t) {
    (this.progressElement.style.opacity = "0"),
      setTimeout(t, 1.5 * this.animationDuration);
  }
  uninstallProgressElement() {
    this.progressElement.parentNode &&
      document.documentElement.removeChild(this.progressElement);
  }
  startTrickling() {
    this.trickleInterval ||
      (this.trickleInterval = window.setInterval(
        this.trickle,
        this.animationDuration
      ));
  }
  stopTrickling() {
    window.clearInterval(this.trickleInterval), delete this.trickleInterval;
  }
  refresh() {
    requestAnimationFrame(() => {
      document.documentElement.style.setProperty(
        "--swup-progress",
        this.value.toFixed(4)
      ),
        (this.progressElement.style.width = 100 * this.value + "%");
    });
  }
  createStyleElement() {
    const t = document.createElement("style");
    return (
      this.styleAttr.split(" ").forEach((e) => t.setAttribute(e, "")),
      (t.textContent = this.defaultStyles),
      t
    );
  }
  createProgressElement() {
    const t = document.createElement("div");
    return (t.className = this.className), t;
  }
}
class i extends t {
  constructor(t = {}) {
    super(),
      (this.name = "SwupProgressPlugin"),
      (this.defaults = {
        className: "swup-progress-bar",
        delay: 300,
        transition: 300,
        minValue: 0.1,
        initialValue: 0.25,
        finishAnimation: !0,
      }),
      (this.options = void 0),
      (this.progressBar = void 0),
      (this.showProgressBarTimeout = void 0),
      (this.hideProgressBarTimeout = void 0),
      (this.options = e({}, this.defaults, t));
    const {
      className: i,
      minValue: r,
      initialValue: o,
      transition: n,
    } = this.options;
    this.progressBar = new s({
      className: i,
      minValue: r,
      initialValue: o,
      animationDuration: n,
    });
  }
  mount() {
    this.on("visit:start", this.startShowingProgress),
      this.on("page:view", this.stopShowingProgress);
      this.on("visit:abort", (visit, { replaced }) => {
        if (!replaced) {
          this.stopShowingProgress();
        }
      });
  }
  startShowingProgress() {
    this.progressBar.setValue(0), this.showProgressBarAfterDelay();
  }
  stopShowingProgress() {
    this.progressBar.setValue(1),
      this.options.finishAnimation
        ? this.finishAnimationAndHideProgressBar()
        : this.hideProgressBar();
  }
  showProgressBar() {
    this.cancelHideProgressBarTimeout(), this.progressBar.show();
  }
  showProgressBarAfterDelay() {
    this.cancelShowProgressBarTimeout(),
      this.cancelHideProgressBarTimeout(),
      (this.showProgressBarTimeout = window.setTimeout(
        this.showProgressBar.bind(this),
        this.options.delay
      ));
  }
  hideProgressBar() {
    this.cancelShowProgressBarTimeout(), this.progressBar.hide();
  }
  finishAnimationAndHideProgressBar() {
    this.cancelShowProgressBarTimeout(),
      (this.hideProgressBarTimeout = window.setTimeout(
        this.hideProgressBar.bind(this),
        this.options.transition
      ));
  }
  cancelShowProgressBarTimeout() {
    window.clearTimeout(this.showProgressBarTimeout),
      delete this.showProgressBarTimeout;
  }
  cancelHideProgressBarTimeout() {
    window.clearTimeout(this.hideProgressBarTimeout),
      delete this.hideProgressBarTimeout;
  }
}
export { i as default };
//# sourceMappingURL=index.modern.js.map
