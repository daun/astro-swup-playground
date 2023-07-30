import t from"@swup/plugin";import{matchPath as i,isPromise as n}from"swup";class o extends t{constructor(t){super();const i=this,n=this;this.name="SwupJsPlugin",this.requires={swup:">=4"},this.defaults={animations:[{from:"(.*)",to:"(.*)",out:t=>t(),in:t=>t()}],matchOptions:{}},this.options=void 0,this.animations=[],this.awaitInAnimation=function(t,i){let{skip:o}=i;try{if(o)return Promise.resolve();const i=n.getBestAnimationMatch(t);return Promise.resolve(n.createAnimationPromise(i,t,"in")).then(function(){})}catch(t){return Promise.reject(t)}},this.awaitOutAnimation=function(t,n){let{skip:o}=n;try{if(o)return Promise.resolve();const n=i.getBestAnimationMatch(t);return Promise.resolve(i.createAnimationPromise(n,t,"out")).then(function(){})}catch(t){return Promise.reject(t)}},Array.isArray(t)&&(t={animations:t}),this.options={...this.defaults,...t},this.animations=this.compileAnimations()}mount(){this.replace("animation:in:await",this.awaitInAnimation,{priority:-1}),this.replace("animation:out:await",this.awaitOutAnimation,{priority:-1})}compileAnimations(){return this.options.animations.map(t=>{const n=i(t.from,this.options.matchOptions),o=i(t.to,this.options.matchOptions);return{...t,matchesFrom:n,matchesTo:o}})}createAnimationPromise(t,i,o){const r=t?t[o]:null;if(!t||!r)return console.warn("No animation found"),Promise.resolve();const s=t.matchesFrom(i.from.url),e=t.matchesTo(i.to.url),a={visit:i,direction:o,from:{url:i.from.url,pattern:t.from,params:s?s.params:{}},to:{url:i.to.url,pattern:t.to,params:e?e.params:{}}};return new Promise(t=>{const i=r(()=>t(),a);n(i)&&i.then(t)})}getBestAnimationMatch(t){let i=0;return this.animations.reduceRight((n,o)=>{const r=this.rateAnimation(t,o);return r>=i?(i=r,o):n},null)}rateAnimation(t,i){const n=t.to.url,o=t.animation.name;let r=0;const s=i.matchesFrom(t.from.url);return s&&(r+=1),i.matchesTo(n)&&(r+=1),s&&i.to===o&&(r+=2),r}}export{o as default};
//# sourceMappingURL=index.module.js.map
