import { forceReflow as t } from "swup";
import i from "@swup/plugin";
class n extends i {
  constructor(i) {
    void 0 === i && (i = {}),
      super(),
      (this.name = "SwupParallelPlugin"),
      (this.requires = { swup: ">=4" }),
      (this.defaults = { containers: [] }),
      (this.options = void 0),
      (this.originalContainers = null),
      (this.previousContainers = []),
      (this.nextContainers = []),
      (this.startVisit = (t) => {
        (this.originalContainers = null),
          this.visitHasPotentialParallelAnimation(t) &&
            ((t.animation.wait = !0), (t.animation.parallel = !0));
      }),
      (this.skipOutAnimation = (t, i) => {
        this.isParallelVisit(t) && (i.skip = !0);
      }),
      (this.insertContainers = (i, n) => {
        let { page: s } = n;
        if (!this.isParallelVisit(i)) return;
        const e = this.getContainersForVisit(i, s),
          a = e.map((t) => {
            let { selector: i } = t;
            return i;
          });
        e.forEach((i) => {
          let { previous: n, next: s } = i;
          this.previousContainers.push(n),
            this.nextContainers.push(s),
            n.setAttribute("aria-hidden", "true"),
            n.before(s),
            s.classList.add("is-next-container"),
            t(s),
            n.classList.add("is-previous-container"),
            s.classList.remove("is-next-container");
        }),
          (this.originalContainers = i.containers),
          (i.containers = i.containers.filter((t) => !a.includes(t)));
      }),
      (this.resetContainers = (t) => {
        this.originalContainers && (t.containers = this.originalContainers);
      }),
      (this.cleanupContainers = () => {
        this.previousContainers.forEach((t) => t.remove()),
          this.nextContainers.forEach((t) =>
            t.classList.remove("is-next-container")
          ),
          (this.previousContainers = []),
          (this.nextContainers = []);
      }),
      (this.options = { ...this.defaults, ...i });
  }
  mount() {
    this.options.containers.length ||
      (this.options.containers = this.swup.options.containers),
      this.on("visit:start", this.startVisit, { priority: 1 }),
      this.before("animation:out:await", this.skipOutAnimation, {
        priority: 1,
      }),
      this.before("content:replace", this.insertContainers, { priority: 1 }),
      this.on("content:replace", this.resetContainers),
      this.on("visit:end", this.cleanupContainers);
  }
  getContainersForVisit(t, i) {
    let { html: n } = i;
    const { containers: s } = this.options,
      e = s.filter((i) => t.containers.includes(i));
    console.log('getContainersForVisit', e);
    if (!e.length)
      return (
        console.warn(
          "No parallel containers found in list of replaced containers"
        ),
        []
      );
    const a = new DOMParser().parseFromString(n, "text/html");
    return e.reduce((t, i) => {
      const n = document.querySelector(i),
        s = a.querySelector(i);
      return n && s ? [...t, { selector: i, previous: n, next: s }] : t;
    }, []);
  }
  isParallelVisit(t) {
    return t.animation.animate && t.animation.parallel;
  }
  markVisitAsParallelAnimation(t) {
    (t.animation.wait = !0), (t.animation.parallel = !0);
  }
  visitHasPotentialParallelAnimation(t) {
    return (
      t.animation.animate &&
      !1 !== t.animation.parallel &&
      this.visitHasParallelContainers(t)
    );
  }
  visitHasParallelContainers(t) {
    return this.options.containers.some((i) => {
      const n = document.querySelector(i);
      return n?.matches(t.containers.join(","));
    });
  }
}
export { n as default };
//# sourceMappingURL=index.module.js.map
