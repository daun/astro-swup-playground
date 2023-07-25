import t from "./theme";
function a() {
  return (
    (a = Object.assign
      ? Object.assign.bind()
      : function (t) {
          for (var a = 1; a < arguments.length; a++) {
            var i = arguments[a];
            for (var s in i)
              Object.prototype.hasOwnProperty.call(i, s) && (t[s] = i[s]);
          }
          return t;
        }),
    a.apply(this, arguments)
  );
}
class i extends t {
  constructor(t = {}) {
    super(),
      (this.name = "SwupFadeTheme"),
      (this.defaults = { mainElement: "#swup" }),
      (this.options = a({}, this.defaults, t));
  }
  mount() {
    this.applyStyles(
      "html{--swup-fade-theme-duration:.4s}html.is-changing .swup-transition-main{opacity:1;transition:opacity var(--swup-fade-theme-duration)}html.is-animating .swup-transition-main{opacity:0}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxLQUNDLDhCQUNELENBRUEsdUNBQ0MsU0FBVSxDQUNWLGtEQUNELENBRUEsd0NBQ0MsU0FDRCIsImZpbGUiOiJpbmRleC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJodG1sIHtcblx0LS1zd3VwLWZhZGUtdGhlbWUtZHVyYXRpb246IC40cztcbn1cblxuaHRtbC5pcy1jaGFuZ2luZyAuc3d1cC10cmFuc2l0aW9uLW1haW4ge1xuXHRvcGFjaXR5OiAxO1xuXHR0cmFuc2l0aW9uOiBvcGFjaXR5IHZhcigtLXN3dXAtZmFkZS10aGVtZS1kdXJhdGlvbik7XG59XG5cbmh0bWwuaXMtYW5pbWF0aW5nIC5zd3VwLXRyYW5zaXRpb24tbWFpbiB7XG5cdG9wYWNpdHk6IDA7XG59XG4iXX0= */"
    ),
      this.addClassName(this.options.mainElement, "main");
  }
}
export { i as default };
//# sourceMappingURL=index.modern.js.map
