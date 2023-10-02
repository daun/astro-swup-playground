import t from"delegate-it";import{match as e}from"path-to-regexp";const n=(t,e)=>String(t).toLowerCase().replace(/[\s/_.]+/g,"-").replace(/[^\w-]+/g,"").replace(/--+/g,"-").replace(/^-+|-+$/g,"")||e||"",i=function(t){let{hash:e}=void 0===t?{}:t;return location.pathname+location.search+(e?location.hash:"")},r=function(t,e){void 0===e&&(e={});const n={url:t=t||i({hash:!0}),random:Math.random(),source:"swup",...e};history.pushState(n,"",t)},o=function(t,e){void 0===t&&(t=null),void 0===e&&(e={}),t=t||i({hash:!0});const n={...history.state||{},url:t,random:Math.random(),source:"swup",...e};history.replaceState(n,"",t)},s=(e,n,i,r)=>{const o=new AbortController;return r={...r,signal:o.signal},t(e,n,i,r),{destroy:()=>o.abort()}};class a extends URL{constructor(t,e){void 0===e&&(e=document.baseURI),super(t.toString(),e)}get url(){return this.pathname+this.search}static fromElement(t){const e=t.getAttribute("href")||t.getAttribute("xlink:href")||"";return new a(e)}static fromUrl(t){return new a(t)}}const c=(t,n)=>{try{return e(t,n)}catch(e){throw new Error(`[swup] Error parsing path "${String(t)}":\n${String(e)}`)}},l=function(t,e){void 0===e&&(e={});try{const i=this;function n(n){const{status:r,url:o}=l;return Promise.resolve(l.text()).then(function(n){if(500===r)throw i.hooks.call("fetch:error",{status:r,response:l,url:o}),new h(`Server error: ${o}`,{status:r,url:o});if(!n)throw new h(`Empty response: ${o}`,{status:r,url:o});const{url:s}=a.fromUrl(o),c={url:s,html:n};return!i.visit.cache.write||e.method&&"GET"!==e.method||t!==s||i.cache.set(c.url,c),c})}t=a.fromUrl(t).url;const r={...i.options.requestHeaders,...e.headers},o=e.timeout??i.options.timeout,s=new AbortController,{signal:c}=s;e={...e,headers:r,signal:c};let l,u=!1,d=null;o&&o>0&&(d=setTimeout(()=>{u=!0,s.abort("timeout")},o));const m=function(n,r){try{var o=Promise.resolve(i.hooks.call("fetch:request",{url:t,options:e},(t,e)=>{let{url:n,options:i}=e;return fetch(n,i)})).then(function(t){l=t,d&&clearTimeout(d)})}catch(t){return r(t)}return o&&o.then?o.then(void 0,r):o}(0,function(e){if(u)throw i.hooks.call("fetch:timeout",{url:t}),new h(`Request timed out: ${t}`,{url:t,timedOut:u});if("AbortError"===e?.name||c.aborted)throw new h(`Request aborted: ${t}`,{url:t,aborted:!0});throw e});return Promise.resolve(m&&m.then?m.then(n):n())}catch(f){return Promise.reject(f)}};class h extends Error{constructor(t,e){super(t),this.url=void 0,this.status=void 0,this.aborted=void 0,this.timedOut=void 0,this.name="FetchError",this.url=e.url,this.status=e.status,this.aborted=e.aborted||!1,this.timedOut=e.timedOut||!1}}class u{constructor(t){this.swup=void 0,this.pages=new Map,this.swup=t}get size(){return this.pages.size}get all(){const t=new Map;return this.pages.forEach((e,n)=>{t.set(n,{...e})}),t}has(t){return this.pages.has(this.resolve(t))}get(t){const e=this.pages.get(this.resolve(t));return e?{...e}:e}set(t,e){t=this.resolve(t),e={...e,url:t},this.pages.set(t,e),this.swup.hooks.callSync("cache:set",{page:e})}update(t,e){t=this.resolve(t);const n={...this.get(t),...e,url:t};this.pages.set(t,n)}delete(t){this.pages.delete(this.resolve(t))}clear(){this.pages.clear(),this.swup.hooks.callSync("cache:clear",void 0)}prune(t){this.pages.forEach((e,n)=>{t(n,e)&&this.delete(n)})}resolve(t){const{url:e}=a.fromUrl(t);return this.swup.resolveUrl(e)}}const d=function(t,e){return void 0===e&&(e=document),e.querySelector(t)},m=function(t,e){return void 0===e&&(e=document),Array.from(e.querySelectorAll(t))},f=()=>new Promise(t=>{requestAnimationFrame(()=>{requestAnimationFrame(()=>{t()})})});function p(t){return!!t&&("object"==typeof t||"function"==typeof t)&&"function"==typeof t.then}function v(t,e){return void 0===e&&(e=[]),new Promise((n,i)=>{const r=t(...e);p(r)?r.then(n,i):n(r)})}function g(t){return t=t||document.body,t?.offsetHeight}const w=t=>window.CSS&&window.CSS.escape?CSS.escape(t):t,y=t=>1e3*Number(t.slice(0,-1).replace(",","."));class P{constructor(t){this.swup=void 0,this.swupClasses=["to-","is-changing","is-rendering","is-popstate","is-animating"],this.swup=t}get selectors(){const{scope:t}=this.swup.visit.animation;return"containers"===t?this.swup.visit.containers:"html"===t?["html"]:Array.isArray(t)?t:[]}get selector(){return this.selectors.join(",")}get targets(){return this.selector.trim()?m(this.selector):[]}add(){this.targets.forEach(t=>t.classList.add(...[].slice.call(arguments)))}remove(){this.targets.forEach(t=>t.classList.remove(...[].slice.call(arguments)))}clear(){this.targets.forEach(t=>{const e=t.className.split(" ").filter(t=>this.isSwupClass(t));t.classList.remove(...e)})}isSwupClass(t){return this.swupClasses.some(e=>t.startsWith(e))}}function k(t){let{to:e,from:n=this.currentPageUrl,hash:i,el:r,event:o}=t;return{id:Math.random(),from:{url:n},to:{url:e,hash:i},containers:this.options.containers,animation:{animate:!0,wait:!1,name:void 0,scope:this.options.animationScope,selector:this.options.animationSelector},trigger:{el:r,event:o},cache:{read:this.options.cache,write:this.options.cache},history:{action:"push",popstate:!1,direction:void 0},scroll:{reset:!0,target:void 0}}}const S="undefined"!=typeof Symbol?Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator")):"@@iterator";function b(t,e,n){if(!t.s){if(n instanceof E){if(!n.s)return void(n.o=b.bind(null,t,e));1&e&&(e=n.s),n=n.v}if(n&&n.then)return void n.then(b.bind(null,t,e),b.bind(null,t,2));t.s=e,t.v=n;const i=t.o;i&&i(t)}}const E=/*#__PURE__*/function(){function t(){}return t.prototype.then=function(e,n){const i=new t,r=this.s;if(r){const t=1&r?e:n;if(t){try{b(i,1,t(this.v))}catch(t){b(i,2,t)}return i}return this}return this.o=function(t){try{const r=t.v;1&t.s?b(i,1,e?e(r):r):n?b(i,1,n(r)):b(i,2,r)}catch(t){b(i,2,t)}},i},t}();function U(t){return t instanceof E&&1&t.s}class C{constructor(t){this.swup=void 0,this.registry=new Map,this.hooks=["animation:out:start","animation:out:await","animation:out:end","animation:in:start","animation:in:await","animation:in:end","animation:skip","cache:clear","cache:set","content:replace","content:scroll","enable","disable","fetch:request","fetch:error","fetch:timeout","history:popstate","link:click","link:self","link:anchor","link:newtab","page:load","page:view","scroll:top","scroll:anchor","visit:start","visit:transition","visit:end"],this.swup=t,this.init()}init(){this.hooks.forEach(t=>this.create(t))}create(t){this.registry.has(t)||this.registry.set(t,new Map)}exists(t){return this.registry.has(t)}get(t){const e=this.registry.get(t);if(e)return e;console.error(`Unknown hook '${t}'`)}clear(){this.registry.forEach(t=>t.clear())}on(t,e,n){void 0===n&&(n={});const i=this.get(t);if(!i)return console.warn(`Hook '${t}' not found.`),()=>{};const r=i.size+1,o={...n,id:r,hook:t,handler:e};return i.set(e,o),()=>this.off(t,e)}before(t,e,n){return void 0===n&&(n={}),this.on(t,e,{...n,before:!0})}replace(t,e,n){return void 0===n&&(n={}),this.on(t,e,{...n,replace:!0})}once(t,e,n){return void 0===n&&(n={}),this.on(t,e,{...n,once:!0})}off(t,e){const n=this.get(t);n&&e?n.delete(e)||console.warn(`Handler for hook '${t}' not found.`):n&&n.clear()}call(t,e,n){try{const i=this,{before:r,handler:o,after:s}=i.getHandlers(t,n);return Promise.resolve(i.run(r,e)).then(function(){return Promise.resolve(i.run(o,e)).then(function(n){let[r]=n;return Promise.resolve(i.run(s,e)).then(function(){return i.dispatchDomEvent(t,e),r})})})}catch(t){return Promise.reject(t)}}callSync(t,e,n){const{before:i,handler:r,after:o}=this.getHandlers(t,n);this.runSync(i,e);const[s]=this.runSync(r,e);return this.runSync(o,e),this.dispatchDomEvent(t,e),s}run(t,e){try{const n=this,i=[],r=function(t,e,n){if("function"==typeof t[S]){var i,r,o,s=t[S]();if(function t(n){try{for(;!(i=s.next()).done;)if((n=e(i.value))&&n.then){if(!U(n))return void n.then(t,o||(o=b.bind(null,r=new E,2)));n=n.v}r?b(r,1,n):r=n}catch(t){b(r||(r=new E),2,t)}}(),s.return){var a=function(t){try{i.done||s.return()}catch(t){}return t};if(r&&r.then)return r.then(a,function(t){throw a(t)});a()}return r}if(!("length"in t))throw new TypeError("Object is not iterable");for(var c=[],l=0;l<t.length;l++)c.push(t[l]);return function(t,e,n){var i,r,o=-1;return function n(s){try{for(;++o<t.length;)if((s=e(o))&&s.then){if(!U(s))return void s.then(n,r||(r=b.bind(null,i=new E,2)));s=s.v}i?b(i,1,s):i=s}catch(t){b(i||(i=new E),2,t)}}(),i}(c,function(t){return e(c[t])})}(t,function(t){let{hook:r,handler:o,defaultHandler:s,once:a}=t;return Promise.resolve(v(o,[n.swup.visit,e,s])).then(function(t){i.push(t),a&&n.off(r,o)})});return Promise.resolve(r&&r.then?r.then(function(){return i}):i)}catch(t){return Promise.reject(t)}}runSync(t,e){const n=[];for(const{hook:i,handler:r,defaultHandler:o,once:s}of t){const t=r(this.swup.visit,e,o);n.push(t),p(t)&&console.warn(`Promise returned from handler for synchronous hook '${i}'.Swup will not wait for it to resolve.`),s&&this.off(i,r)}return n}getHandlers(t,e){const n=this.get(t);if(!n)return{found:!1,before:[],handler:[],after:[],replaced:!1};const i=Array.from(n.values()),r=this.sortRegistrations,o=i.filter(t=>{let{before:e,replace:n}=t;return e&&!n}).sort(r),s=i.filter(t=>{let{replace:e}=t;return e}).filter(t=>!0).sort(r),a=i.filter(t=>{let{before:e,replace:n}=t;return!e&&!n}).sort(r),c=s.length>0;let l=[];if(e&&(l=[{id:0,hook:t,handler:e}],c)){const n=s.length-1,i=t=>{const n=s[t-1];return n?(e,r)=>n.handler(e,r,i(t-1)):e};l=[{id:0,hook:t,handler:s[n].handler,defaultHandler:i(n)}]}return{found:!0,before:o,handler:l,after:a,replaced:c}}sortRegistrations(t,e){return(t.priority??0)-(e.priority??0)||t.id-e.id||0}dispatchDomEvent(t,e){document.dispatchEvent(new CustomEvent(`swup:${t}`,{detail:{hook:t,args:e,visit:this.swup.visit}}))}}const $=t=>{if(t&&"#"===t.charAt(0)&&(t=t.substring(1)),!t)return null;const e=decodeURIComponent(t);let n=document.getElementById(t)||document.getElementById(e)||d(`a[name='${w(t)}']`)||d(`a[name='${w(e)}']`);return n||"top"!==t||(n=document.body),n},x=function(t){let{elements:e,selector:n}=t;try{if(!1===n&&!e)return Promise.resolve();let t=[];if(e)t=Array.from(e);else if(n&&(t=m(n,document.body),!t.length))return console.warn(`[swup] No elements found matching animationSelector \`${n}\``),Promise.resolve();const i=t.map(t=>function(t){const{type:e,timeout:n,propCount:i}=function(t,e){const n=window.getComputedStyle(t),i=q(n,`${H}Delay`),r=q(n,`${H}Duration`),o=I(i,r),s=q(n,`${A}Delay`),a=q(n,`${A}Duration`),c=I(s,a);let l=null,h=0,u=0;return e===H?o>0&&(l=H,h=o,u=r.length):e===A?c>0&&(l=A,h=c,u=a.length):(h=Math.max(o,c),l=h>0?o>c?H:A:null,u=l?l===H?r.length:a.length:0),{type:l,timeout:h,propCount:u}}(t);return!(!e||!n)&&new Promise(r=>{const o=`${e}end`,s=performance.now();let a=0;const c=()=>{t.removeEventListener(o,l),r()},l=e=>{if(e.target===t){if(!function(t){return[`${H}end`,`${A}end`].includes(t.type)}(e))throw new Error("Not a transition or animation event.");(performance.now()-s)/1e3<e.elapsedTime||++a>=i&&c()}};setTimeout(()=>{a<i&&c()},n+1),t.addEventListener(o,l)})}(t));return i.filter(Boolean).length>0?Promise.resolve(Promise.all(i)).then(function(){}):(n&&console.warn(`[swup] No CSS animation duration defined on elements matching \`${n}\``),Promise.resolve())}catch(t){return Promise.reject(t)}},H="transition",A="animation";function q(t,e){return(t[e]||"").split(", ")}function I(t,e){for(;t.length<e.length;)t=t.concat(t);return Math.max(...e.map((e,n)=>y(e)+y(t[n])))}const R=function(t){void 0===t&&(t={});try{const e=this;e.navigating=!0;const s=e.visit,{el:a}=s.trigger;t.referrer=t.referrer||e.currentPageUrl,!1===t.animate&&(s.animation.animate=!1),s.animation.animate||e.classes.clear();const c=t.history||a?.getAttribute("data-swup-history")||void 0;c&&["push","replace"].includes(c)&&(s.history.action=c);const l=t.animation||a?.getAttribute("data-swup-animation")||void 0;return l&&(s.animation.name=l),"object"==typeof t.cache?(s.cache.read=t.cache.read??s.cache.read,s.cache.write=t.cache.write??s.cache.write):void 0!==t.cache&&(s.cache={read:!!t.cache,write:!!t.cache}),delete t.cache,Promise.resolve(function(a,c){try{var l=Promise.resolve(e.hooks.call("visit:start",void 0)).then(function(){function a(){return Promise.resolve(e.hooks.call("visit:transition",void 0,function(t){try{const n=function(){if(t.animation.animate&&e.options.native)return Promise.resolve(c).then(function(n){const i=function(){if(t.id===e.visit.id)return Promise.resolve(document.startViewTransition(()=>e.renderPage(n)).finished).then(function(){})}();if(i&&i.then)return i.then(function(){})});{const n=function(){if(t.animation.animate){const n=e.animatePageOut();return Promise.resolve(Promise.all([c,n])).then(function(n){let[i]=n;const r=function(){if(t.id===e.visit.id)return Promise.resolve(e.renderPage(i)).then(function(){return Promise.resolve(e.animatePageIn()).then(function(){})})}();if(r&&r.then)return r.then(function(){})})}return Promise.resolve(e.hooks.call("animation:skip",void 0)).then(function(){return Promise.resolve(c).then(function(n){const i=function(){if(t.id===e.visit.id)return Promise.resolve(e.renderPage(n)).then(function(){})}();if(i&&i.then)return i.then(function(){})})})}();if(n&&n.then)return n.then(function(){})}}();return Promise.resolve(n&&n.then?n.then(function(){}):void 0)}catch(t){return Promise.reject(t)}})).then(function(){return Promise.resolve(e.hooks.call("visit:end",void 0,()=>e.classes.clear())).then(function(){e.navigating=!1})})}const c=e.hooks.call("page:load",{options:t},function(t,n){try{function i(t){return n.page=t,n.cache=!!r,n.page}let r;return t.cache.read&&(r=e.cache.get(t.to.url)),Promise.resolve(r?i(r):Promise.resolve(e.fetchPage(t.to.url,n.options)).then(i))}catch(o){return Promise.reject(o)}});if(!s.history.popstate){const t=s.to.url+s.to.hash;"replace"===s.history.action||s.to.url===e.currentPageUrl?o(t):(e.currentHistoryIndex++,r(t,{index:e.currentHistoryIndex}))}e.currentPageUrl=i(),s.history.popstate&&e.classes.add("is-popstate"),s.animation.name&&e.classes.add(`to-${n(s.animation.name)}`);const l=function(){if(s.animation.wait)return Promise.resolve(c).then(function(t){let{html:e}=t;s.to.html=e})}();return l&&l.then?l.then(a):a()})}catch(t){return c(t)}return l&&l.then?l.then(void 0,c):l}(0,function(t){t&&!t?.aborted&&(console.error(t),e.options.skipPopStateHandling=()=>(window.location.href=s.to.url+s.to.hash,!0),window.history.go(-1))}))}catch(t){return Promise.reject(t)}};function T(t,e,n){if(void 0===e&&(e={}),void 0===n&&(n={}),"string"!=typeof t)throw new Error("swup.navigate() requires a URL parameter");if(this.shouldIgnoreVisit(t,{el:n.el,event:n.event}))return void(window.location.href=t);const{url:i,hash:r}=a.fromUrl(t);this.visit=this.createVisit({...n,to:i,hash:r}),this.performNavigation(e)}const j=function(){try{const t=this;return Promise.resolve(t.hooks.call("animation:out:start",void 0,()=>{t.classes.add("is-changing","is-leaving","is-animating")})).then(function(){return Promise.resolve(t.hooks.call("animation:out:await",{skip:!1},(e,n)=>{let{skip:i}=n;if(!i)return t.awaitAnimations({selector:e.animation.selector})})).then(function(){return Promise.resolve(t.hooks.call("animation:out:end",void 0)).then(function(){})})})}catch(t){return Promise.reject(t)}},L=function(t,e){let{html:n}=t,{containers:i}=void 0===e?this.options:e;const r=(new DOMParser).parseFromString(n,"text/html"),o=r.querySelector("title")?.innerText||"";document.title=o;const s=m('[data-swup-persist]:not([data-swup-persist=""])'),a=i.map(t=>{const e=document.querySelector(t),n=r.querySelector(t);return e&&n?(e.replaceWith(n),!0):(e||console.warn(`[swup] Container missing in current document: ${t}`),n||console.warn(`[swup] Container missing in incoming document: ${t}`),!1)}).filter(Boolean);return s.forEach(t=>{const e=t.getAttribute("data-swup-persist"),n=d(`[data-swup-persist="${e}"]`);n&&n!==t&&n.replaceWith(t)}),a.length===i.length},N=function(){const t={behavior:"auto"},{target:e,reset:n}=this.visit.scroll,i=e??this.visit.to.hash;let r=!1;return i&&(r=this.hooks.callSync("scroll:anchor",{hash:i,options:t},(t,e)=>{let{hash:n,options:i}=e;const r=this.getAnchorElement(n);return r&&r.scrollIntoView(i),!!r})),n&&!r&&(r=this.hooks.callSync("scroll:top",{options:t},(t,e)=>{let{options:n}=e;return window.scrollTo({top:0,left:0,...n}),!0})),r},V=function(){try{const t=this,e=t.hooks.call("animation:in:await",{skip:!1},(e,n)=>{let{skip:i}=n;if(!i)return t.awaitAnimations({selector:e.animation.selector})});return Promise.resolve(f()).then(function(){return Promise.resolve(t.hooks.call("animation:in:start",void 0,()=>{t.classes.remove("is-animating")})).then(function(){return Promise.resolve(e).then(function(){return Promise.resolve(t.hooks.call("animation:in:end",void 0)).then(function(){})})})})}catch(t){return Promise.reject(t)}},D=function(t){try{const e=this,{url:r,html:s}=t;return e.classes.remove("is-leaving"),e.isSameResolvedUrl(i(),r)||(o(r),e.currentPageUrl=i(),e.visit.to.url=e.currentPageUrl),e.visit.animation.animate&&e.classes.add("is-rendering"),e.visit.to.html=s,Promise.resolve(e.hooks.call("content:replace",{page:t},(t,i)=>{let{page:r}=i;if(!e.replaceContent(r,{containers:t.containers}))throw new Error("[swup] Container mismatch, aborting");t.animation.animate&&(e.classes.add("is-animating","is-changing","is-rendering"),t.animation.name&&e.classes.add(`to-${n(t.animation.name)}`))})).then(function(){return Promise.resolve(e.hooks.call("content:scroll",void 0,()=>e.scrollToContent())).then(function(){return Promise.resolve(e.hooks.call("page:view",{url:e.currentPageUrl,title:document.title})).then(function(){})})})}catch(t){return Promise.reject(t)}},M=function(t){var e;if(e=t,Boolean(e?.isSwupPlugin)){if(t.swup=this,!t._checkRequirements||t._checkRequirements())return t._beforeMount&&t._beforeMount(),t.mount(),this.plugins.push(t),this.plugins}else console.error("Not a swup plugin instance",t)};function O(t){const e=this.findPlugin(t);if(e)return e.unmount(),e._afterUnmount&&e._afterUnmount(),this.plugins=this.plugins.filter(t=>t!==e),this.plugins;console.error("No such plugin",e)}function W(t){return this.plugins.find(e=>e===t||e.name===t||e.name===`Swup${String(t)}`)}function B(t){if("function"!=typeof this.options.resolveUrl)return console.warn("[swup] options.resolveUrl expects a callback function."),t;const e=this.options.resolveUrl(t);return e&&"string"==typeof e?e.startsWith("//")||e.startsWith("http")?(console.warn("[swup] options.resolveUrl needs to return a relative url"),t):e:(console.warn("[swup] options.resolveUrl needs to return a url"),t)}function _(t,e){return this.resolveUrl(t)===this.resolveUrl(e)}const F={animateHistoryBrowsing:!1,animationSelector:'[class*="transition-"]',animationScope:"html",cache:!0,containers:["#swup"],ignoreVisit:function(t,e){let{el:n}=void 0===e?{}:e;return!!n?.closest("[data-no-swup]")},linkSelector:"a[href]",linkToSelf:"scroll",native:!1,plugins:[],resolveUrl:t=>t,requestHeaders:{"X-Requested-With":"swup",Accept:"text/html, application/xhtml+xml"},skipPopStateHandling:t=>"swup"!==t.state?.source,timeout:0};class K{constructor(t){void 0===t&&(t={}),this.version="4.4.2",this.options=void 0,this.defaults=F,this.plugins=[],this.visit=void 0,this.cache=void 0,this.hooks=void 0,this.classes=void 0,this.currentPageUrl=i(),this.currentHistoryIndex=void 0,this.clickDelegate=void 0,this.navigating=!1,this.use=M,this.unuse=O,this.findPlugin=W,this.log=()=>{},this.navigate=T,this.performNavigation=R,this.createVisit=k,this.delegateEvent=s,this.fetchPage=l,this.awaitAnimations=x,this.renderPage=D,this.replaceContent=L,this.animatePageIn=V,this.animatePageOut=j,this.scrollToContent=N,this.getAnchorElement=$,this.getCurrentUrl=i,this.resolveUrl=B,this.isSameResolvedUrl=_,this.options={...this.defaults,...t},this.handleLinkClick=this.handleLinkClick.bind(this),this.handlePopState=this.handlePopState.bind(this),this.cache=new u(this),this.classes=new P(this),this.hooks=new C(this),this.visit=this.createVisit({to:""}),this.currentHistoryIndex=history.state?.index??1,this.checkRequirements()&&this.enable()}checkRequirements(){return"undefined"==typeof Promise?(console.warn("Promise is not supported"),!1):(this.options.native&&!("startViewTransition"in document)&&(console.warn("Native View Transitions are not supported"),this.options.native=!1),!0)}enable(){try{const t=this,{linkSelector:e}=t.options;return t.clickDelegate=t.delegateEvent(e,"click",t.handleLinkClick),window.addEventListener("popstate",t.handlePopState),t.options.animateHistoryBrowsing&&(window.history.scrollRestoration="manual"),t.options.plugins.forEach(e=>t.use(e)),"swup"!==history.state?.source&&o(null,{index:t.currentHistoryIndex}),Promise.resolve(f()).then(function(){return Promise.resolve(t.hooks.call("enable",void 0,()=>{document.documentElement.classList.add("swup-enabled")})).then(function(){})})}catch(t){return Promise.reject(t)}}destroy(){try{const t=this;return t.clickDelegate.destroy(),window.removeEventListener("popstate",t.handlePopState),t.cache.clear(),t.options.plugins.forEach(e=>t.unuse(e)),Promise.resolve(t.hooks.call("disable",void 0,()=>{document.documentElement.classList.remove("swup-enabled")})).then(function(){t.hooks.clear()})}catch(t){return Promise.reject(t)}}shouldIgnoreVisit(t,e){let{el:n,event:i}=void 0===e?{}:e;const{origin:r,url:o,hash:s}=a.fromUrl(t);return r!==window.location.origin||!(!n||!this.triggerWillOpenNewWindow(n))||!!this.options.ignoreVisit(o+s,{el:n,event:i})}handleLinkClick(t){const e=t.delegateTarget,{href:n,url:i,hash:r}=a.fromElement(e);this.shouldIgnoreVisit(n,{el:e,event:t})||(this.navigating&&i===this.visit.to.url?t.preventDefault():(this.visit=this.createVisit({to:i,hash:r,el:e,event:t}),t.metaKey||t.ctrlKey||t.shiftKey||t.altKey?this.hooks.call("link:newtab",{href:n}):0===t.button&&this.hooks.callSync("link:click",{el:e,event:t},()=>{const e=this.visit.from.url??"";t.preventDefault(),i&&i!==e?this.isSameResolvedUrl(i,e)||this.performNavigation():r?this.hooks.callSync("link:anchor",{hash:r},()=>{o(i+r),this.scrollToContent()}):this.hooks.callSync("link:self",void 0,()=>"navigate"===this.options.linkToSelf?this.performNavigation():(o(i),this.scrollToContent()))})))}handlePopState(t){const e=t.state?.url??location.href;if(this.options.skipPopStateHandling(t))return;if(this.isSameResolvedUrl(i(),this.currentPageUrl))return;const{url:n,hash:r}=a.fromUrl(e);this.visit=this.createVisit({to:n,hash:r,event:t}),this.visit.history.popstate=!0;const o=t.state?.index??0;o&&o!==this.currentHistoryIndex&&(this.visit.history.direction=o-this.currentHistoryIndex>0?"forwards":"backwards",this.currentHistoryIndex=o),this.visit.animation.animate=!1,this.visit.scroll.reset=!1,this.visit.scroll.target=!1,this.options.animateHistoryBrowsing&&(this.visit.animation.animate=!0,this.visit.scroll.reset=!0),this.hooks.callSync("history:popstate",{event:t},()=>{this.performNavigation()})}triggerWillOpenNewWindow(t){return!!t.matches('[download], [target="_blank"]')}}export{a as Location,n as classify,r as createHistoryRecord,K as default,s as delegateEvent,w as escapeCssIdentifier,g as forceReflow,i as getCurrentUrl,p as isPromise,c as matchPath,f as nextTick,d as query,m as queryAll,v as runAsPromise,y as toMs,o as updateHistoryRecord};
//# sourceMappingURL=Swup.module.js.map
