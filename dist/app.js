/******/(()=>{// webpackBootstrap
/******/"use strict";
/******/var e,r,n={
/***/432:
/***/()=>{}
/***/
/******/},t={};
/************************************************************************/
/******/ // The module cache
/******/
/******/
/******/ // The require function
/******/function o(e){
/******/ // Check if module is in cache
/******/var r=t[e];
/******/if(void 0!==r){
/******/if(void 0!==r.error)throw r.error;
/******/return r.exports;
/******/}
/******/ // Create a new module (and put it into the cache)
/******/var i=t[e]={
/******/ // no module.id needed
/******/ // no module.loaded needed
/******/exports:{}
/******/};
/******/
/******/ // Execute the module function
/******/try{
/******/var c={id:e,module:i,factory:n[e],require:o};
/******/o.i.forEach((function(e){e(c)})),
/******/i=c.module,
/******/c.factory.call(i.exports,i,i.exports,c.require)}catch(e){
/******/
/******/throw i.error=e,e;
/******/}
/******/
/******/ // Return the exports of the module
/******/return i.exports;
/******/}
/******/
/******/ // expose the modules object (__webpack_modules__)
/******/o.m=n,
/******/
/******/ // expose the module cache
/******/o.c=t,
/******/
/******/ // expose the module execution interceptor
/******/o.i=[],
/******/ // This function allow to reference all chunks
/******/o.hu=e=>e+"."+o.h()+".hot-update.js"
/******/,
/******/o.hmrF=()=>"app."+o.h()+".hot-update.json"
/******/,
/******/o.h=()=>"599c54b1fb14274a6942"
/******/,
/******/o.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r)
/******/,
/******/
/******/ /* webpack/runtime/load script */
/******/e={},r="webpack-example-by-library:",
/******/ // loadScript function to load a script via script tag
/******/o.l=(n,t,i,c)=>{
/******/if(e[n])e[n].push(t);else{
/******/var d,a;
/******/if(void 0!==i)
/******/for(
/******/var u=document.getElementsByTagName("script"),l=0;l<u.length;l++){
/******/var s=u[l];
/******/if(s.getAttribute("src")==n||s.getAttribute("data-webpack")==r+i){d=s;break}
/******/}
/******/
/******/d||(
/******/a=!0,
/******/
/******/(
/******/d=document.createElement("script")).charset="utf-8",
/******/d.timeout=120,
/******/o.nc&&
/******/d.setAttribute("nonce",o.nc)
/******/,d.setAttribute("data-webpack",r+i),
/******/d.src=n)
/******/,e[n]=[t];
/******/var f=(r,t)=>{
/******/ // avoid mem leaks in IE.
/******/d.onerror=d.onload=null,
/******/clearTimeout(p);
/******/var o=e[n];
/******/
/******/if(delete e[n],
/******/d.parentNode&&d.parentNode.removeChild(d),
/******/o&&o.forEach((e=>e(t))),r)return r(t);
/******/}
/******/,p=setTimeout(f.bind(null,void 0,{type:"timeout",target:d}),12e4);
/******/d.onerror=f.bind(null,d.onerror),
/******/d.onload=f.bind(null,d.onload),
/******/a&&document.head.appendChild(d)}}
/******/,
/******/
/******/ /* webpack/runtime/hot module replacement */
/******/(()=>{
/******/var e,r,n,t={},i=o.c,c=[],d=[],a="idle",u=0,l=[];
/******/
/******/
/******/function s(e){
/******/a=e;
/******/
/******/for(
/******/var r=[],n=0;n<d.length;n++)
/******/r[n]=d[n].call(null,e);
/******/
/******/return Promise.all(r);
/******/}
/******/
/******/function f(){
/******/0==--u&&
/******/s("ready").then((function(){
/******/if(0===u){
/******/var e=l;
/******/l=[];
/******/for(var r=0;r<e.length;r++)
/******/e[r]();
/******/
/******/}
/******/}))
/******/}
/******/
/******/
/******/
/******/function p(e){
/******/if("idle"!==a)
/******/throw new Error("check() is only allowed in idle status");
/******/
/******/return s("check")
/******/.then(o.hmrM)
/******/.then((function(n){
/******/return n?s("prepare").then((function(){
/******/var t=[];
/******/
/******/
/******/return r=[],Promise.all(
/******/Object.keys(o.hmrC).reduce((function(
/******/e,
/******/i
/******/){
/******/
/******/return o.hmrC[i](
/******/n.c,
/******/n.r,
/******/n.m,
/******/e,
/******/r,
/******/t
/******/),e;
/******/}),
/******/[])
/******/).then((function(){
/******/return r=function(){
/******/return e?v(e):s("ready").then((function(){
/******/return t;
/******/}))
/******/},
/******/0===u?r():new Promise((function(e){
/******/l.push((function(){
/******/e(r());
/******/}));
/******/}))
/******/;
/******/
/******/
/******/var r}));
/******/})):s(m()?"ready":"idle").then((
/******/function(){
/******/return null;
/******/}
/******/))
/******/
/******/}));
/******/}
/******/
/******/function h(e){
/******/return"ready"!==a?Promise.resolve().then((function(){
/******/throw new Error(
/******/"apply() is only allowed in ready status (state: "+
/******/a+
/******/")"
/******/);
/******/})):v(e)
/******/}
/******/
/******/function v(e){
/******/e=e||{},
/******/
/******/m();
/******/
/******/var t=r.map((function(r){
/******/return r(e);
/******/}));
/******/r=void 0;
/******/
/******/var o=t
/******/.map((function(e){
/******/return e.error;
/******/}))
/******/.filter(Boolean);
/******/
/******/if(o.length>0)
/******/return s("abort").then((function(){
/******/throw o[0];
/******/}));
/******/
/******/
/******/ // Now in "dispose" phase
/******/var i=s("dispose");
/******/
/******/t.forEach((function(e){
/******/e.dispose&&e.dispose()
/******/}));
/******/
/******/ // Now in "apply" phase
/******/var c,d=s("apply"),a=function(e){
/******/c||(c=e)
/******/},u=[];
/******/
/******/
/******/
/******/
/******/return t.forEach((function(e){
/******/if(e.apply){
/******/var r=e.apply(a);
/******/if(r)
/******/for(var n=0;n<r.length;n++)
/******/u.push(r[n]);
/******/
/******/
/******/}
/******/})),Promise.all([i,d]).then((function(){
/******/ // handle errors in accept handlers and self accepted module load
/******/return c?s("fail").then((function(){
/******/throw c;
/******/})):
/******/
/******/n?v(e).then((function(e){
/******/
/******/return u.forEach((function(r){
/******/e.indexOf(r)<0&&e.push(r)
/******/})),e;
/******/})):s("idle").then((function(){
/******/return u;
/******/}))
/******/
/******/}));
/******/}
/******/
/******/function m(){
/******/if(n)
/******/
/******/return r||(r=[])
/******/,Object.keys(o.hmrI).forEach((function(e){
/******/n.forEach((function(n){
/******/o.hmrI[e](
/******/n,
/******/r
/******/);
/******/}));
/******/})),
/******/n=void 0,!0;
/******/
/******/}
/******/
/******/
/******/ // eslint-disable-next-line no-unused-vars
/******/o.hmrD=t,
/******/
/******/o.i.push((function(l){
/******/var v,m,y,b,_=l.module,g=
/******/
/******/function(r,n){
/******/var t=i[n];
/******/if(!t)return r;
/******/var o=function(o){
/******/if(t.hot.active){
/******/if(i[o]){
/******/var d=i[o].parents;
/******/-1===d.indexOf(n)&&
/******/d.push(n)
/******/}else
/******/c=[n],
/******/e=o;
/******/-1===t.children.indexOf(o)&&
/******/t.children.push(o)
/******/}else
/******/c=[];
/******/
/******/return r(o);
/******/},d=function(e){
/******/return{
/******/configurable:!0,
/******/enumerable:!0,
/******/get:function(){
/******/return r[e];
/******/},
/******/set:function(n){
/******/r[e]=n;
/******/}
/******/};
/******/};
/******/
/******/for(var l in r)
/******/Object.prototype.hasOwnProperty.call(r,l)&&"e"!==l&&
/******/Object.defineProperty(o,l,d(l))
/******/;
/******/
/******/return o.e=function(e){
/******/return function(e){
/******/switch(a){
/******/case"ready":
/******/s("prepare");
/******/ /* fallthrough */
/******/case"prepare":
/******/
/******/return u++,
/******/e.then(f,f),e;
/******/default:
/******/return e;
/******/}
/******/}(r.e(e));
/******/},o;
/******/}
/******/
/******/(l.require,l.id);
/******/
/******/_.hot=(v=l.id,m=_,b={
/******/ // private stuff
/******/_acceptedDependencies:{},
/******/_acceptedErrorHandlers:{},
/******/_declinedDependencies:{},
/******/_selfAccepted:!1,
/******/_selfDeclined:!1,
/******/_selfInvalidated:!1,
/******/_disposeHandlers:[],
/******/_main:y=e!==v,
/******/_requireSelf:function(){
/******/c=m.parents.slice(),
/******/e=y?void 0:v,
/******/o(v)},
/******/
/******/ // Module API
/******/active:!0,
/******/accept:function(e,r,n){
/******/if(void 0===e)b._selfAccepted=!0;
/******/else if("function"==typeof e)b._selfAccepted=e;
/******/else if("object"==typeof e&&null!==e)
/******/for(var t=0;t<e.length;t++)
/******/b._acceptedDependencies[e[t]]=r||function(){},
/******/b._acceptedErrorHandlers[e[t]]=n;
/******/else
/******/b._acceptedDependencies[e]=r||function(){},
/******/b._acceptedErrorHandlers[e]=n;
/******/},
/******/decline:function(e){
/******/if(void 0===e)b._selfDeclined=!0;
/******/else if("object"==typeof e&&null!==e)
/******/for(var r=0;r<e.length;r++)
/******/b._declinedDependencies[e[r]]=!0;
/******/else b._declinedDependencies[e]=!0;
/******/},
/******/dispose:function(e){
/******/b._disposeHandlers.push(e);
/******/},
/******/addDisposeHandler:function(e){
/******/b._disposeHandlers.push(e);
/******/},
/******/removeDisposeHandler:function(e){
/******/var r=b._disposeHandlers.indexOf(e);
/******/r>=0&&b._disposeHandlers.splice(r,1)
/******/},
/******/invalidate:function(){
/******/switch(
/******/this._selfInvalidated=!0,a){
/******/case"idle":
/******/r=[],
/******/Object.keys(o.hmrI).forEach((function(e){
/******/o.hmrI[e](
/******/v,
/******/r
/******/);
/******/})),
/******/s("ready");
/******/break;
/******/case"ready":
/******/Object.keys(o.hmrI).forEach((function(e){
/******/o.hmrI[e](
/******/v,
/******/r
/******/);
/******/}));
/******/break;
/******/case"prepare":
/******/case"check":
/******/case"dispose":
/******/case"apply":
/******/(n=n||[]).push(
/******/v
/******/);
/******/}
/******/},
/******/
/******/ // Management API
/******/check:p,
/******/apply:h,
/******/status:function(e){
/******/if(!e)return a;
/******/d.push(e)},
/******/addStatusHandler:function(e){
/******/d.push(e);
/******/},
/******/removeStatusHandler:function(e){
/******/var r=d.indexOf(e);
/******/r>=0&&d.splice(r,1)
/******/},
/******/
/******/ //inherit from previous dispose call
/******/data:t[v]
/******/},
/******/e=void 0,b),
/******/_.parents=c,
/******/_.children=[],
/******/c=[],
/******/l.require=g})),
/******/
/******/o.hmrC={},
/******/o.hmrI={}})(),
/******/o.p="/",
/******/
/******/ /* webpack/runtime/jsonp chunk loading */
/******/(()=>{
/******/ // no baseURI
/******/
/******/ // object to store loaded and loading chunks
/******/ // undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ // [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/var e,r,n,t,i,c=o.hmrS_jsonp=o.hmrS_jsonp||{
/******/143:0
/******/},d={};
/******/
/******/ // no chunk on demand loading
/******/
/******/ // no prefetching
/******/
/******/ // no preloaded
/******/
/******/
/******/function a(r,n){
/******/
/******/return e=n,new Promise(((e,n)=>{
/******/d[r]=e;
/******/ // start update chunk loading
/******/var t=o.p+o.hu(r),i=new Error;
/******/ // create error before stack unwound to get useful stacktrace later
/******/
/******/o.l(t,(e=>{
/******/if(d[r]){
/******/d[r]=void 0
/******/;var t=e&&("load"===e.type?"missing":e.type),o=e&&e.target&&e.target.src;
/******/
/******/i.message="Loading hot update chunk "+r+" failed.\n("+t+": "+o+")",
/******/i.name="ChunkLoadError",
/******/i.type=t,
/******/i.request=o,
/******/n(i)}
/******/}))}
/******/));
/******/}
/******/
/******/
/******/function u(e){
/******/function d(e){
/******/for(
/******/var r=[e],n={},t=r.map((function(e){
/******/return{
/******/chain:[e],
/******/id:e
/******/};
/******/}))
/******/;t.length>0;){
/******/var i=t.pop(),c=i.id,d=i.chain,u=o.c[c];
/******/
/******/if(
/******/u&&(
/******/!u.hot._selfAccepted||u.hot._selfInvalidated
/******/)){
/******/if(u.hot._selfDeclined)
/******/return{
/******/type:"self-declined",
/******/chain:d,
/******/moduleId:c
/******/};
/******/
/******/if(u.hot._main)
/******/return{
/******/type:"unaccepted",
/******/chain:d,
/******/moduleId:c
/******/};
/******/
/******/for(var l=0;l<u.parents.length;l++){
/******/var s=u.parents[l],f=o.c[s];
/******/
/******/if(f){
/******/if(f.hot._declinedDependencies[c])
/******/return{
/******/type:"declined",
/******/chain:d.concat([s]),
/******/moduleId:c,
/******/parentId:s
/******/};
/******/
/******/-1===r.indexOf(s)&&(
/******/f.hot._acceptedDependencies[c]?(
/******/n[s]||(
/******/n[s]=[])
/******/,a(n[s],[c])):(
/******/delete n[s],
/******/r.push(s),
/******/t.push({
/******/chain:d.concat([s]),
/******/id:s
/******/})))}}
/******/}}
/******/
/******/return{
/******/type:"accepted",
/******/moduleId:e,
/******/outdatedModules:r,
/******/outdatedDependencies:n
/******/};
/******/}
/******/
/******/function a(e,r){
/******/for(var n=0;n<r.length;n++){
/******/var t=r[n];
/******/-1===e.indexOf(t)&&e.push(t)
/******/}
/******/}
/******/
/******/ // at begin all updates modules are outdated
/******/ // the "outdated" status can propagate to parents if they don't accept the children
/******/
/******/o.f&&delete o.f.jsonpHmr
/******/,r=void 0;var u={},l=[],s={},f=function(e){
/******/};
/******/
/******/
/******/for(var p in n)
/******/if(o.o(n,p)){
/******/var h,v=n[p],m=!1,y=!1,b=!1,_="";
/******/ /** @type {TODO} */
/******/
/******/switch(
/******/(
/******/
/******/h=v?d(p):{
/******/type:"disposed",
/******/moduleId:p
/******/}
/******/ /** @type {Error|false} */
/******/).chain&&(
/******/_="\nUpdate propagation: "+h.chain.join(" -> ")),h.type){
/******/case"self-declined":
/******/e.onDeclined&&e.onDeclined(h)
/******/,e.ignoreDeclined||(
/******/m=new Error(
/******/"Aborted because of self decline: "+
/******/h.moduleId+
/******/_
/******/))
/******/;break;
/******/case"declined":
/******/e.onDeclined&&e.onDeclined(h)
/******/,e.ignoreDeclined||(
/******/m=new Error(
/******/"Aborted because of declined dependency: "+
/******/h.moduleId+
/******/" in "+
/******/h.parentId+
/******/_
/******/))
/******/;break;
/******/case"unaccepted":
/******/e.onUnaccepted&&e.onUnaccepted(h)
/******/,e.ignoreUnaccepted||(
/******/m=new Error(
/******/"Aborted because "+p+" is not accepted"+_
/******/))
/******/;break;
/******/case"accepted":
/******/e.onAccepted&&e.onAccepted(h)
/******/,y=!0;
/******/break;
/******/case"disposed":
/******/e.onDisposed&&e.onDisposed(h)
/******/,b=!0;
/******/break;
/******/default:
/******/throw new Error("Unexception type "+h.type);
/******/}
/******/if(m)
/******/return{
/******/error:m
/******/};
/******/
/******/if(y)
/******/for(p in
/******/s[p]=v,
/******/a(l,h.outdatedModules),h.outdatedDependencies)
/******/o.o(h.outdatedDependencies,p)&&(
/******/u[p]||(
/******/u[p]=[])
/******/,a(
/******/u[p],
/******/h.outdatedDependencies[p]
/******/))
/******/;
/******/
/******/b&&(
/******/a(l,[h.moduleId]),
/******/s[p]=f)
/******/}
/******/
/******/n=void 0;
/******/for(
/******/
/******/ // Store self accepted outdated modules to require them later by the module system
/******/var g,E=[],w=0;w<l.length;w++){
/******/var I=l[w],D=o.c[I];
/******/
/******/
/******/D&&(
/******/D.hot._selfAccepted||D.hot._main)&&
/******/ // removed self-accepted modules should not be required
/******/s[I]!==f&&
/******/ // when called invalidate self-accepting is not possible
/******/!D.hot._selfInvalidated
/******/&&
/******/E.push({
/******/module:I,
/******/require:D.hot._requireSelf,
/******/errorHandler:D.hot._selfAccepted
/******/})
/******/}
/******/
/******/
/******/
/******/return{
/******/dispose:function(){
/******/
/******/var e;
/******/
/******/t.forEach((function(e){
/******/delete c[e];
/******/})),
/******/t=void 0;
/******/for(var r,n=l.slice();n.length>0;){
/******/var i=n.pop(),d=o.c[i];
/******/
/******/if(d){
/******/
/******/var a={},s=d.hot._disposeHandlers;
/******/
/******/ // Call dispose handlers
/******/
/******/for(w=0;w<s.length;w++)
/******/s[w].call(null,a);
/******/
/******/
/******/
/******/ // remove "parents" references from all children
/******/for(o.hmrD[i]=a,
/******/
/******/ // disable module (this disables requires from this module)
/******/d.hot.active=!1,
/******/
/******/ // remove module from cache
/******/delete o.c[i],
/******/
/******/ // when disposing there is no need to call dispose handler
/******/delete u[i],w=0;w<d.children.length;w++){
/******/var f=o.c[d.children[w]];
/******/f&&(
/******/(
/******/e=f.parents.indexOf(i))>=0&&
/******/f.parents.splice(e,1)
/******/)}
/******/}}
/******/
/******/ // remove outdated dependency from module children
/******/
/******/for(var p in u)
/******/if(o.o(u,p)&&(
/******/d=o.c[p]))
/******/for(
/******/g=
/******/u[p],w=0;w<g.length;w++)
/******/r=g[w],
/******/(
/******/e=d.children.indexOf(r))>=0&&d.children.splice(e,1)
/******/;
/******/
/******/
/******/},
/******/apply:function(r){
/******/ // insert new code
/******/for(var n in s)
/******/o.o(s,n)&&(
/******/o.m[n]=s[n])
/******/;
/******/
/******/ // run new runtime modules
/******/for(var t=0;t<i.length;t++)
/******/i[t](o);
/******/
/******/
/******/ // call accept handlers
/******/for(var c in u)
/******/if(o.o(u,c)){
/******/var d=o.c[c];
/******/if(d){
/******/g=
/******/u[c];
/******/for(
/******/var a=[],f=[],p=[],h=0
/******/;h<g.length;h++){
/******/var v=g[h],m=
/******/d.hot._acceptedDependencies[v],y=
/******/d.hot._acceptedErrorHandlers[v];
/******/
/******/if(m){
/******/if(-1!==a.indexOf(m))continue;
/******/a.push(m),
/******/f.push(y),
/******/p.push(v)}
/******/}
/******/for(var b=0;b<a.length;b++)
/******/try{
/******/a[b].call(null,g);
/******/}catch(n){
/******/if("function"==typeof f[b])
/******/try{
/******/f[b](n,{
/******/moduleId:c,
/******/dependencyId:p[b]
/******/});
/******/}catch(t){
/******/e.onErrored&&
/******/e.onErrored({
/******/type:"accept-error-handler-errored",
/******/moduleId:c,
/******/dependencyId:p[b],
/******/error:t,
/******/originalError:n
/******/})
/******/,e.ignoreErrored||(
/******/r(t),
/******/r(n))
/******/}
/******/else
/******/e.onErrored&&
/******/e.onErrored({
/******/type:"accept-errored",
/******/moduleId:c,
/******/dependencyId:p[b],
/******/error:n
/******/})
/******/,e.ignoreErrored||
/******/r(n)
/******/;
/******/}
/******/
/******/}
/******/}
/******/
/******/
/******/ // Load self accepted modules
/******/for(var _=0;_<E.length;_++){
/******/var w=E[_],I=w.module;
/******/
/******/try{
/******/w.require(I);
/******/}catch(n){
/******/if("function"==typeof w.errorHandler)
/******/try{
/******/w.errorHandler(n,{
/******/moduleId:I,
/******/module:o.c[I]
/******/});
/******/}catch(t){
/******/e.onErrored&&
/******/e.onErrored({
/******/type:"self-accept-error-handler-errored",
/******/moduleId:I,
/******/error:t,
/******/originalError:n
/******/})
/******/,e.ignoreErrored||(
/******/r(t),
/******/r(n))
/******/}
/******/else
/******/e.onErrored&&
/******/e.onErrored({
/******/type:"self-accept-errored",
/******/moduleId:I,
/******/error:n
/******/})
/******/,e.ignoreErrored||
/******/r(n)
/******/;
/******/}
/******/}
/******/
/******/return l;
/******/}
/******/};
/******/}
/******/self.webpackHotUpdatewebpack_example_by_library=(r,t,c)=>{
/******/for(var a in t)
/******/o.o(t,a)&&(
/******/n[a]=t[a],
/******/e&&e.push(a)
/******/)
/******/;
/******/c&&i.push(c)
/******/,d[r]&&(
/******/d[r](),
/******/d[r]=void 0)
/******/},o.hmrI.jsonp=function(e,r){
/******/n||(
/******/n={},
/******/i=[],
/******/t=[],
/******/r.push(u))
/******/,o.o(n,e)||(
/******/n[e]=o.m[e])
/******/},
/******/o.hmrC.jsonp=function(
/******/e,
/******/d,
/******/l,
/******/s,
/******/f,
/******/p
/******/){
/******/f.push(u),
/******/r={},
/******/t=d,
/******/n=l.reduce((function(e,r){
/******/
/******/return e[r]=!1,e;
/******/}),{}),
/******/i=[],
/******/e.forEach((function(e){
/******/
/******/o.o(c,e)&&
/******/void 0
/******/!==c[e]?(
/******/s.push(a(e,p)),
/******/r[e]=!0):
/******/r[e]=!1
/******/})),
/******/o.f&&(
/******/o.f.jsonpHmr=function(e,n){
/******/
/******/r&&
/******/o.o(r,e)&&
/******/!r[e]
/******/&&(
/******/n.push(a(e)),
/******/r[e]=!0)
/******/})
/******/},
/******/
/******/o.hmrM=()=>{
/******/if("undefined"==typeof fetch)throw new Error("No browser support: need fetch API");
/******/return fetch(o.p+o.hmrF()).then((e=>{
/******/if(404!==e.status){// no update available
/******/if(!e.ok)throw new Error("Failed to fetch update manifest "+e.statusText);
/******/return e.json();
/******/}}));
/******/}})
/******/
/******/ // no on chunks loaded
/******/
/******/ // no jsonp function
/******/();
/******/
/************************************************************************/
/******/
/******/ // module cache are used so entry inlining is disabled
/******/ // startup
/******/ // Load entry module and return exports
/******/o(432);
/******/
/******/})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSxFQUFTNUUsT0FBWjtRQUNBLElBQUk0RSxFQUFTQyxHQUFJLE1BQU0sSUFBSWxKLE1BQU0sbUNBQXFDaUosRUFBU0U7UUFDL0UsT0FBT0YsRUFBU0c7UUFGa0IsQ0FFWjtRQUNyQixDOzs7Ozs7Ozs7Ozs7UUN0ZnVCeE8sRUFBb0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrLWV4YW1wbGUtYnktbGlicmFyeS93ZWJwYWNrL3J1bnRpbWUvbG9hZCBzY3JpcHQiLCJ3ZWJwYWNrOi8vd2VicGFjay1leGFtcGxlLWJ5LWxpYnJhcnkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VicGFjay1leGFtcGxlLWJ5LWxpYnJhcnkvd2VicGFjay9ydW50aW1lL2dldCBqYXZhc2NyaXB0IHVwZGF0ZSBjaHVuayBmaWxlbmFtZSIsIndlYnBhY2s6Ly93ZWJwYWNrLWV4YW1wbGUtYnktbGlicmFyeS93ZWJwYWNrL3J1bnRpbWUvZ2V0IHVwZGF0ZSBtYW5pZmVzdCBmaWxlbmFtZSIsIndlYnBhY2s6Ly93ZWJwYWNrLWV4YW1wbGUtYnktbGlicmFyeS93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giLCJ3ZWJwYWNrOi8vd2VicGFjay1leGFtcGxlLWJ5LWxpYnJhcnkvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWJwYWNrLWV4YW1wbGUtYnktbGlicmFyeS93ZWJwYWNrL3J1bnRpbWUvaG90IG1vZHVsZSByZXBsYWNlbWVudCIsIndlYnBhY2s6Ly93ZWJwYWNrLWV4YW1wbGUtYnktbGlicmFyeS93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly93ZWJwYWNrLWV4YW1wbGUtYnktbGlicmFyeS93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly93ZWJwYWNrLWV4YW1wbGUtYnktbGlicmFyeS93ZWJwYWNrL3N0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGluUHJvZ3Jlc3MgPSB7fTtcbnZhciBkYXRhV2VicGFja1ByZWZpeCA9IFwid2VicGFjay1leGFtcGxlLWJ5LWxpYnJhcnk6XCI7XG4vLyBsb2FkU2NyaXB0IGZ1bmN0aW9uIHRvIGxvYWQgYSBzY3JpcHQgdmlhIHNjcmlwdCB0YWdcbl9fd2VicGFja19yZXF1aXJlX18ubCA9ICh1cmwsIGRvbmUsIGtleSwgY2h1bmtJZCkgPT4ge1xuXHRpZihpblByb2dyZXNzW3VybF0pIHsgaW5Qcm9ncmVzc1t1cmxdLnB1c2goZG9uZSk7IHJldHVybjsgfVxuXHR2YXIgc2NyaXB0LCBuZWVkQXR0YWNoO1xuXHRpZihrZXkgIT09IHVuZGVmaW5lZCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHNjcmlwdHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBzID0gc2NyaXB0c1tpXTtcblx0XHRcdGlmKHMuZ2V0QXR0cmlidXRlKFwic3JjXCIpID09IHVybCB8fCBzLmdldEF0dHJpYnV0ZShcImRhdGEtd2VicGFja1wiKSA9PSBkYXRhV2VicGFja1ByZWZpeCArIGtleSkgeyBzY3JpcHQgPSBzOyBicmVhazsgfVxuXHRcdH1cblx0fVxuXHRpZighc2NyaXB0KSB7XG5cdFx0bmVlZEF0dGFjaCA9IHRydWU7XG5cdFx0c2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cblx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG5cdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG5cdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcblx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcblx0XHR9XG5cdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcImRhdGEtd2VicGFja1wiLCBkYXRhV2VicGFja1ByZWZpeCArIGtleSk7XG5cdFx0c2NyaXB0LnNyYyA9IHVybDtcblx0fVxuXHRpblByb2dyZXNzW3VybF0gPSBbZG9uZV07XG5cdHZhciBvblNjcmlwdENvbXBsZXRlID0gKHByZXYsIGV2ZW50KSA9PiB7XG5cdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuXHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdHZhciBkb25lRm5zID0gaW5Qcm9ncmVzc1t1cmxdO1xuXHRcdGRlbGV0ZSBpblByb2dyZXNzW3VybF07XG5cdFx0c2NyaXB0LnBhcmVudE5vZGUgJiYgc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcblx0XHRkb25lRm5zICYmIGRvbmVGbnMuZm9yRWFjaCgoZm4pID0+IChmbihldmVudCkpKTtcblx0XHRpZihwcmV2KSByZXR1cm4gcHJldihldmVudCk7XG5cdH1cblx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCB1bmRlZmluZWQsIHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KSwgMTIwMDAwKTtcblx0c2NyaXB0Lm9uZXJyb3IgPSBvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgc2NyaXB0Lm9uZXJyb3IpO1xuXHRzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHNjcmlwdC5vbmxvYWQpO1xuXHRuZWVkQXR0YWNoICYmIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbn07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdGlmIChjYWNoZWRNb2R1bGUuZXJyb3IgIT09IHVuZGVmaW5lZCkgdGhyb3cgY2FjaGVkTW9kdWxlLmVycm9yO1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHR0cnkge1xuXHRcdHZhciBleGVjT3B0aW9ucyA9IHsgaWQ6IG1vZHVsZUlkLCBtb2R1bGU6IG1vZHVsZSwgZmFjdG9yeTogX193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0sIHJlcXVpcmU6IF9fd2VicGFja19yZXF1aXJlX18gfTtcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkuZm9yRWFjaChmdW5jdGlvbihoYW5kbGVyKSB7IGhhbmRsZXIoZXhlY09wdGlvbnMpOyB9KTtcblx0XHRtb2R1bGUgPSBleGVjT3B0aW9ucy5tb2R1bGU7XG5cdFx0ZXhlY09wdGlvbnMuZmFjdG9yeS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBleGVjT3B0aW9ucy5yZXF1aXJlKTtcblx0fSBjYXRjaChlKSB7XG5cdFx0bW9kdWxlLmVycm9yID0gZTtcblx0XHR0aHJvdyBlO1xuXHR9XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuLy8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbl9fd2VicGFja19yZXF1aXJlX18uYyA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfXztcblxuLy8gZXhwb3NlIHRoZSBtb2R1bGUgZXhlY3V0aW9uIGludGVyY2VwdG9yXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBbXTtcblxuIiwiLy8gVGhpcyBmdW5jdGlvbiBhbGxvdyB0byByZWZlcmVuY2UgYWxsIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5odSA9IChjaHVua0lkKSA9PiB7XG5cdC8vIHJldHVybiB1cmwgZm9yIGZpbGVuYW1lcyBiYXNlZCBvbiB0ZW1wbGF0ZVxuXHRyZXR1cm4gXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIF9fd2VicGFja19yZXF1aXJlX18uaCgpICsgXCIuaG90LXVwZGF0ZS5qc1wiO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckYgPSAoKSA9PiAoXCJhcHAuXCIgKyBfX3dlYnBhY2tfcmVxdWlyZV9fLmgoKSArIFwiLmhvdC11cGRhdGUuanNvblwiKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCI1OTljNTRiMWZiMTQyNzRhNjk0MlwiKSIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCJ2YXIgY3VycmVudE1vZHVsZURhdGEgPSB7fTtcbnZhciBpbnN0YWxsZWRNb2R1bGVzID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jO1xuXG4vLyBtb2R1bGUgYW5kIHJlcXVpcmUgY3JlYXRpb25cbnZhciBjdXJyZW50Q2hpbGRNb2R1bGU7XG52YXIgY3VycmVudFBhcmVudHMgPSBbXTtcblxuLy8gc3RhdHVzXG52YXIgcmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzID0gW107XG52YXIgY3VycmVudFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4vLyB3aGlsZSBkb3dubG9hZGluZ1xudmFyIGJsb2NraW5nUHJvbWlzZXMgPSAwO1xudmFyIGJsb2NraW5nUHJvbWlzZXNXYWl0aW5nID0gW107XG5cbi8vIFRoZSB1cGRhdGUgaW5mb1xudmFyIGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzO1xudmFyIHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcztcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtckQgPSBjdXJyZW50TW9kdWxlRGF0YTtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5pLnB1c2goZnVuY3Rpb24gKG9wdGlvbnMpIHtcblx0dmFyIG1vZHVsZSA9IG9wdGlvbnMubW9kdWxlO1xuXHR2YXIgcmVxdWlyZSA9IGNyZWF0ZVJlcXVpcmUob3B0aW9ucy5yZXF1aXJlLCBvcHRpb25zLmlkKTtcblx0bW9kdWxlLmhvdCA9IGNyZWF0ZU1vZHVsZUhvdE9iamVjdChvcHRpb25zLmlkLCBtb2R1bGUpO1xuXHRtb2R1bGUucGFyZW50cyA9IGN1cnJlbnRQYXJlbnRzO1xuXHRtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0Y3VycmVudFBhcmVudHMgPSBbXTtcblx0b3B0aW9ucy5yZXF1aXJlID0gcmVxdWlyZTtcbn0pO1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtckMgPSB7fTtcbl9fd2VicGFja19yZXF1aXJlX18uaG1ySSA9IHt9O1xuXG5mdW5jdGlvbiBjcmVhdGVSZXF1aXJlKHJlcXVpcmUsIG1vZHVsZUlkKSB7XG5cdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXHRpZiAoIW1lKSByZXR1cm4gcmVxdWlyZTtcblx0dmFyIGZuID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcblx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuXHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcblx0XHRcdFx0dmFyIHBhcmVudHMgPSBpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHM7XG5cdFx0XHRcdGlmIChwYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuXHRcdFx0XHRcdHBhcmVudHMucHVzaChtb2R1bGVJZCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcblx0XHRcdFx0Y3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcblx0XHRcdH1cblx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuXHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcblx0XHRcdFx0XHRyZXF1ZXN0ICtcblx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuXHRcdFx0XHRcdG1vZHVsZUlkXG5cdFx0XHQpO1xuXHRcdFx0Y3VycmVudFBhcmVudHMgPSBbXTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlcXVpcmUocmVxdWVzdCk7XG5cdH07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSBmdW5jdGlvbiAobmFtZSkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiByZXF1aXJlW25hbWVdO1xuXHRcdFx0fSxcblx0XHRcdHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHRcdHJlcXVpcmVbbmFtZV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHR9O1xuXHR9O1xuXHRmb3IgKHZhciBuYW1lIGluIHJlcXVpcmUpIHtcblx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHJlcXVpcmUsIG5hbWUpICYmIG5hbWUgIT09IFwiZVwiKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcihuYW1lKSk7XG5cdFx0fVxuXHR9XG5cdGZuLmUgPSBmdW5jdGlvbiAoY2h1bmtJZCkge1xuXHRcdHJldHVybiB0cmFja0Jsb2NraW5nUHJvbWlzZShyZXF1aXJlLmUoY2h1bmtJZCkpO1xuXHR9O1xuXHRyZXR1cm4gZm47XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU1vZHVsZUhvdE9iamVjdChtb2R1bGVJZCwgbWUpIHtcblx0dmFyIF9tYWluID0gY3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZDtcblx0dmFyIGhvdCA9IHtcblx0XHQvLyBwcml2YXRlIHN0dWZmXG5cdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcblx0XHRfYWNjZXB0ZWRFcnJvckhhbmRsZXJzOiB7fSxcblx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuXHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuXHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuXHRcdF9zZWxmSW52YWxpZGF0ZWQ6IGZhbHNlLFxuXHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuXHRcdF9tYWluOiBfbWFpbixcblx0XHRfcmVxdWlyZVNlbGY6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGN1cnJlbnRQYXJlbnRzID0gbWUucGFyZW50cy5zbGljZSgpO1xuXHRcdFx0Y3VycmVudENoaWxkTW9kdWxlID0gX21haW4gPyB1bmRlZmluZWQgOiBtb2R1bGVJZDtcblx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuXHRcdH0sXG5cblx0XHQvLyBNb2R1bGUgQVBJXG5cdFx0YWN0aXZlOiB0cnVlLFxuXHRcdGFjY2VwdDogZnVuY3Rpb24gKGRlcCwgY2FsbGJhY2ssIGVycm9ySGFuZGxlcikge1xuXHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG5cdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuXHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIiAmJiBkZXAgIT09IG51bGwpIHtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbiAoKSB7fTtcblx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRXJyb3JIYW5kbGVyc1tkZXBbaV1dID0gZXJyb3JIYW5kbGVyO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbiAoKSB7fTtcblx0XHRcdFx0aG90Ll9hY2NlcHRlZEVycm9ySGFuZGxlcnNbZGVwXSA9IGVycm9ySGFuZGxlcjtcblx0XHRcdH1cblx0XHR9LFxuXHRcdGRlY2xpbmU6IGZ1bmN0aW9uIChkZXApIHtcblx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuXHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIiAmJiBkZXAgIT09IG51bGwpXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuXHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG5cdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG5cdFx0fSxcblx0XHRkaXNwb3NlOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuXHRcdH0sXG5cdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG5cdFx0fSxcblx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG5cdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG5cdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuXHRcdH0sXG5cdFx0aW52YWxpZGF0ZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5fc2VsZkludmFsaWRhdGVkID0gdHJ1ZTtcblx0XHRcdHN3aXRjaCAoY3VycmVudFN0YXR1cykge1xuXHRcdFx0XHRjYXNlIFwiaWRsZVwiOlxuXHRcdFx0XHRcdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzID0gW107XG5cdFx0XHRcdFx0T2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5obXJJKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18uaG1ySVtrZXldKFxuXHRcdFx0XHRcdFx0XHRtb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnNcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0c2V0U3RhdHVzKFwicmVhZHlcIik7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJyZWFkeVwiOlxuXHRcdFx0XHRcdE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uaG1ySSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmhtcklba2V5XShcblx0XHRcdFx0XHRcdFx0bW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwicHJlcGFyZVwiOlxuXHRcdFx0XHRjYXNlIFwiY2hlY2tcIjpcblx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VcIjpcblx0XHRcdFx0Y2FzZSBcImFwcGx5XCI6XG5cdFx0XHRcdFx0KHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcyA9IHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcyB8fCBbXSkucHVzaChcblx0XHRcdFx0XHRcdG1vZHVsZUlkXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHQvLyBpZ25vcmUgcmVxdWVzdHMgaW4gZXJyb3Igc3RhdGVzXG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIE1hbmFnZW1lbnQgQVBJXG5cdFx0Y2hlY2s6IGhvdENoZWNrLFxuXHRcdGFwcGx5OiBob3RBcHBseSxcblx0XHRzdGF0dXM6IGZ1bmN0aW9uIChsKSB7XG5cdFx0XHRpZiAoIWwpIHJldHVybiBjdXJyZW50U3RhdHVzO1xuXHRcdFx0cmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG5cdFx0fSxcblx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbiAobCkge1xuXHRcdFx0cmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG5cdFx0fSxcblx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbiAobCkge1xuXHRcdFx0dmFyIGlkeCA9IHJlZ2lzdGVyZWRTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuXHRcdFx0aWYgKGlkeCA+PSAwKSByZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG5cdFx0fSxcblxuXHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuXHRcdGRhdGE6IGN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuXHR9O1xuXHRjdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG5cdHJldHVybiBob3Q7XG59XG5cbmZ1bmN0aW9uIHNldFN0YXR1cyhuZXdTdGF0dXMpIHtcblx0Y3VycmVudFN0YXR1cyA9IG5ld1N0YXR1cztcblx0dmFyIHJlc3VsdHMgPSBbXTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHJlZ2lzdGVyZWRTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcblx0XHRyZXN1bHRzW2ldID0gcmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcblxuXHRyZXR1cm4gUHJvbWlzZS5hbGwocmVzdWx0cyk7XG59XG5cbmZ1bmN0aW9uIHVuYmxvY2soKSB7XG5cdGlmICgtLWJsb2NraW5nUHJvbWlzZXMgPT09IDApIHtcblx0XHRzZXRTdGF0dXMoXCJyZWFkeVwiKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmIChibG9ja2luZ1Byb21pc2VzID09PSAwKSB7XG5cdFx0XHRcdHZhciBsaXN0ID0gYmxvY2tpbmdQcm9taXNlc1dhaXRpbmc7XG5cdFx0XHRcdGJsb2NraW5nUHJvbWlzZXNXYWl0aW5nID0gW107XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGxpc3RbaV0oKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHRyYWNrQmxvY2tpbmdQcm9taXNlKHByb21pc2UpIHtcblx0c3dpdGNoIChjdXJyZW50U3RhdHVzKSB7XG5cdFx0Y2FzZSBcInJlYWR5XCI6XG5cdFx0XHRzZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuXHRcdC8qIGZhbGx0aHJvdWdoICovXG5cdFx0Y2FzZSBcInByZXBhcmVcIjpcblx0XHRcdGJsb2NraW5nUHJvbWlzZXMrKztcblx0XHRcdHByb21pc2UudGhlbih1bmJsb2NrLCB1bmJsb2NrKTtcblx0XHRcdHJldHVybiBwcm9taXNlO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4gcHJvbWlzZTtcblx0fVxufVxuXG5mdW5jdGlvbiB3YWl0Rm9yQmxvY2tpbmdQcm9taXNlcyhmbikge1xuXHRpZiAoYmxvY2tpbmdQcm9taXNlcyA9PT0gMCkgcmV0dXJuIGZuKCk7XG5cdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuXHRcdGJsb2NraW5nUHJvbWlzZXNXYWl0aW5nLnB1c2goZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVzb2x2ZShmbigpKTtcblx0XHR9KTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5T25VcGRhdGUpIHtcblx0aWYgKGN1cnJlbnRTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG5cdH1cblx0cmV0dXJuIHNldFN0YXR1cyhcImNoZWNrXCIpXG5cdFx0LnRoZW4oX193ZWJwYWNrX3JlcXVpcmVfXy5obXJNKVxuXHRcdC50aGVuKGZ1bmN0aW9uICh1cGRhdGUpIHtcblx0XHRcdGlmICghdXBkYXRlKSB7XG5cdFx0XHRcdHJldHVybiBzZXRTdGF0dXMoYXBwbHlJbnZhbGlkYXRlZE1vZHVsZXMoKSA/IFwicmVhZHlcIiA6IFwiaWRsZVwiKS50aGVuKFxuXHRcdFx0XHRcdGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0KTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHNldFN0YXR1cyhcInByZXBhcmVcIikudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHZhciB1cGRhdGVkTW9kdWxlcyA9IFtdO1xuXHRcdFx0XHRjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVycyA9IFtdO1xuXG5cdFx0XHRcdHJldHVybiBQcm9taXNlLmFsbChcblx0XHRcdFx0XHRPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckMpLnJlZHVjZShmdW5jdGlvbiAoXG5cdFx0XHRcdFx0XHRwcm9taXNlcyxcblx0XHRcdFx0XHRcdGtleVxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5obXJDW2tleV0oXG5cdFx0XHRcdFx0XHRcdHVwZGF0ZS5jLFxuXHRcdFx0XHRcdFx0XHR1cGRhdGUucixcblx0XHRcdFx0XHRcdFx0dXBkYXRlLm0sXG5cdFx0XHRcdFx0XHRcdHByb21pc2VzLFxuXHRcdFx0XHRcdFx0XHRjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVycyxcblx0XHRcdFx0XHRcdFx0dXBkYXRlZE1vZHVsZXNcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcHJvbWlzZXM7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRbXSlcblx0XHRcdFx0KS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRyZXR1cm4gd2FpdEZvckJsb2NraW5nUHJvbWlzZXMoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0aWYgKGFwcGx5T25VcGRhdGUpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGludGVybmFsQXBwbHkoYXBwbHlPblVwZGF0ZSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gc2V0U3RhdHVzKFwicmVhZHlcIikudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHVwZGF0ZWRNb2R1bGVzO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcbn1cblxuZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucykge1xuXHRpZiAoY3VycmVudFN0YXR1cyAhPT0gXCJyZWFkeVwiKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1cyAoc3RhdGU6IFwiICtcblx0XHRcdFx0XHRjdXJyZW50U3RhdHVzICtcblx0XHRcdFx0XHRcIilcIlxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXHRyZXR1cm4gaW50ZXJuYWxBcHBseShvcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gaW50ZXJuYWxBcHBseShvcHRpb25zKSB7XG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdGFwcGx5SW52YWxpZGF0ZWRNb2R1bGVzKCk7XG5cblx0dmFyIHJlc3VsdHMgPSBjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVycy5tYXAoZnVuY3Rpb24gKGhhbmRsZXIpIHtcblx0XHRyZXR1cm4gaGFuZGxlcihvcHRpb25zKTtcblx0fSk7XG5cdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzID0gdW5kZWZpbmVkO1xuXG5cdHZhciBlcnJvcnMgPSByZXN1bHRzXG5cdFx0Lm1hcChmdW5jdGlvbiAocikge1xuXHRcdFx0cmV0dXJuIHIuZXJyb3I7XG5cdFx0fSlcblx0XHQuZmlsdGVyKEJvb2xlYW4pO1xuXG5cdGlmIChlcnJvcnMubGVuZ3RoID4gMCkge1xuXHRcdHJldHVybiBzZXRTdGF0dXMoXCJhYm9ydFwiKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdHRocm93IGVycm9yc1swXTtcblx0XHR9KTtcblx0fVxuXG5cdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuXHR2YXIgZGlzcG9zZVByb21pc2UgPSBzZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuXG5cdHJlc3VsdHMuZm9yRWFjaChmdW5jdGlvbiAocmVzdWx0KSB7XG5cdFx0aWYgKHJlc3VsdC5kaXNwb3NlKSByZXN1bHQuZGlzcG9zZSgpO1xuXHR9KTtcblxuXHQvLyBOb3cgaW4gXCJhcHBseVwiIHBoYXNlXG5cdHZhciBhcHBseVByb21pc2UgPSBzZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuXHR2YXIgZXJyb3I7XG5cdHZhciByZXBvcnRFcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcblx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcblx0fTtcblxuXHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG5cdHJlc3VsdHMuZm9yRWFjaChmdW5jdGlvbiAocmVzdWx0KSB7XG5cdFx0aWYgKHJlc3VsdC5hcHBseSkge1xuXHRcdFx0dmFyIG1vZHVsZXMgPSByZXN1bHQuYXBwbHkocmVwb3J0RXJyb3IpO1xuXHRcdFx0aWYgKG1vZHVsZXMpIHtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gobW9kdWxlc1tpXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiBQcm9taXNlLmFsbChbZGlzcG9zZVByb21pc2UsIGFwcGx5UHJvbWlzZV0pLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG5cdFx0aWYgKGVycm9yKSB7XG5cdFx0XHRyZXR1cm4gc2V0U3RhdHVzKFwiZmFpbFwiKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dGhyb3cgZXJyb3I7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRpZiAocXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzKSB7XG5cdFx0XHRyZXR1cm4gaW50ZXJuYWxBcHBseShvcHRpb25zKS50aGVuKGZ1bmN0aW9uIChsaXN0KSB7XG5cdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGVJZCkge1xuXHRcdFx0XHRcdGlmIChsaXN0LmluZGV4T2YobW9kdWxlSWQpIDwgMCkgbGlzdC5wdXNoKG1vZHVsZUlkKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybiBsaXN0O1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHNldFN0YXR1cyhcImlkbGVcIikudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gb3V0ZGF0ZWRNb2R1bGVzO1xuXHRcdH0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gYXBwbHlJbnZhbGlkYXRlZE1vZHVsZXMoKSB7XG5cdGlmIChxdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMpIHtcblx0XHRpZiAoIWN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzKSBjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVycyA9IFtdO1xuXHRcdE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uaG1ySSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRxdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobW9kdWxlSWQpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5obXJJW2tleV0oXG5cdFx0XHRcdFx0bW9kdWxlSWQsXG5cdFx0XHRcdFx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnNcblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcyA9IHVuZGVmaW5lZDtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxufSIsIl9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiOyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0gX193ZWJwYWNrX3JlcXVpcmVfXy5obXJTX2pzb25wID0gX193ZWJwYWNrX3JlcXVpcmVfXy5obXJTX2pzb25wIHx8IHtcblx0MTQzOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxudmFyIGN1cnJlbnRVcGRhdGVkTW9kdWxlc0xpc3Q7XG52YXIgd2FpdGluZ1VwZGF0ZVJlc29sdmVzID0ge307XG5mdW5jdGlvbiBsb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgdXBkYXRlZE1vZHVsZXNMaXN0KSB7XG5cdGN1cnJlbnRVcGRhdGVkTW9kdWxlc0xpc3QgPSB1cGRhdGVkTW9kdWxlc0xpc3Q7XG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0d2FpdGluZ1VwZGF0ZVJlc29sdmVzW2NodW5rSWRdID0gcmVzb2x2ZTtcblx0XHQvLyBzdGFydCB1cGRhdGUgY2h1bmsgbG9hZGluZ1xuXHRcdHZhciB1cmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBfX3dlYnBhY2tfcmVxdWlyZV9fLmh1KGNodW5rSWQpO1xuXHRcdC8vIGNyZWF0ZSBlcnJvciBiZWZvcmUgc3RhY2sgdW53b3VuZCB0byBnZXQgdXNlZnVsIHN0YWNrdHJhY2UgbGF0ZXJcblx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoKTtcblx0XHR2YXIgbG9hZGluZ0VuZGVkID0gKGV2ZW50KSA9PiB7XG5cdFx0XHRpZih3YWl0aW5nVXBkYXRlUmVzb2x2ZXNbY2h1bmtJZF0pIHtcblx0XHRcdFx0d2FpdGluZ1VwZGF0ZVJlc29sdmVzW2NodW5rSWRdID0gdW5kZWZpbmVkXG5cdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG5cdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG5cdFx0XHRcdGVycm9yLm1lc3NhZ2UgPSAnTG9hZGluZyBob3QgdXBkYXRlIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJztcblx0XHRcdFx0ZXJyb3IubmFtZSA9ICdDaHVua0xvYWRFcnJvcic7XG5cdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG5cdFx0XHRcdGVycm9yLnJlcXVlc3QgPSByZWFsU3JjO1xuXHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0fVxuXHRcdH07XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5sKHVybCwgbG9hZGluZ0VuZGVkKTtcblx0fSk7XG59XG5cbnNlbGZbXCJ3ZWJwYWNrSG90VXBkYXRld2VicGFja19leGFtcGxlX2J5X2xpYnJhcnlcIl0gPSAoY2h1bmtJZCwgbW9yZU1vZHVsZXMsIHJ1bnRpbWUpID0+IHtcblx0Zm9yKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRjdXJyZW50VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdGlmKGN1cnJlbnRVcGRhdGVkTW9kdWxlc0xpc3QpIGN1cnJlbnRVcGRhdGVkTW9kdWxlc0xpc3QucHVzaChtb2R1bGVJZCk7XG5cdFx0fVxuXHR9XG5cdGlmKHJ1bnRpbWUpIGN1cnJlbnRVcGRhdGVSdW50aW1lLnB1c2gocnVudGltZSk7XG5cdGlmKHdhaXRpbmdVcGRhdGVSZXNvbHZlc1tjaHVua0lkXSkge1xuXHRcdHdhaXRpbmdVcGRhdGVSZXNvbHZlc1tjaHVua0lkXSgpO1xuXHRcdHdhaXRpbmdVcGRhdGVSZXNvbHZlc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcblx0fVxufTtcblxudmFyIGN1cnJlbnRVcGRhdGVDaHVua3M7XG52YXIgY3VycmVudFVwZGF0ZTtcbnZhciBjdXJyZW50VXBkYXRlUmVtb3ZlZENodW5rcztcbnZhciBjdXJyZW50VXBkYXRlUnVudGltZTtcbmZ1bmN0aW9uIGFwcGx5SGFuZGxlcihvcHRpb25zKSB7XG5cdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmYpIGRlbGV0ZSBfX3dlYnBhY2tfcmVxdWlyZV9fLmYuanNvbnBIbXI7XG5cdGN1cnJlbnRVcGRhdGVDaHVua3MgPSB1bmRlZmluZWQ7XG5cdGZ1bmN0aW9uIGdldEFmZmVjdGVkTW9kdWxlRWZmZWN0cyh1cGRhdGVNb2R1bGVJZCkge1xuXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG5cdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLm1hcChmdW5jdGlvbiAoaWQpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGNoYWluOiBbaWRdLFxuXHRcdFx0XHRpZDogaWRcblx0XHRcdH07XG5cdFx0fSk7XG5cdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcblx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcblx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcblx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcblx0XHRcdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbbW9kdWxlSWRdO1xuXHRcdFx0aWYgKFxuXHRcdFx0XHQhbW9kdWxlIHx8XG5cdFx0XHRcdChtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQgJiYgIW1vZHVsZS5ob3QuX3NlbGZJbnZhbGlkYXRlZClcblx0XHRcdClcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG5cdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuXHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcblx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG5cdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuXHRcdFx0XHR2YXIgcGFyZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jW3BhcmVudElkXTtcblx0XHRcdFx0aWYgKCFwYXJlbnQpIGNvbnRpbnVlO1xuXHRcdFx0XHRpZiAocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcblx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG5cdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgIT09IC0xKSBjb250aW51ZTtcblx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuXHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuXHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG5cdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG5cdFx0XHRcdHF1ZXVlLnB1c2goe1xuXHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG5cdFx0XHRcdFx0aWQ6IHBhcmVudElkXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHR0eXBlOiBcImFjY2VwdGVkXCIsXG5cdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXG5cdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcblx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzOiBvdXRkYXRlZERlcGVuZGVuY2llc1xuXHRcdH07XG5cdH1cblxuXHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IGJbaV07XG5cdFx0XHRpZiAoYS5pbmRleE9mKGl0ZW0pID09PSAtMSkgYS5wdXNoKGl0ZW0pO1xuXHRcdH1cblx0fVxuXG5cdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG5cdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cblx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcblx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcblxuXHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKG1vZHVsZSkge1xuXHRcdGNvbnNvbGUud2Fybihcblx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgbW9kdWxlLmlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiXG5cdFx0KTtcblx0fTtcblxuXHRmb3IgKHZhciBtb2R1bGVJZCBpbiBjdXJyZW50VXBkYXRlKSB7XG5cdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubyhjdXJyZW50VXBkYXRlLCBtb2R1bGVJZCkpIHtcblx0XHRcdHZhciBuZXdNb2R1bGVGYWN0b3J5ID0gY3VycmVudFVwZGF0ZVttb2R1bGVJZF07XG5cdFx0XHQvKiogQHR5cGUge1RPRE99ICovXG5cdFx0XHR2YXIgcmVzdWx0O1xuXHRcdFx0aWYgKG5ld01vZHVsZUZhY3RvcnkpIHtcblx0XHRcdFx0cmVzdWx0ID0gZ2V0QWZmZWN0ZWRNb2R1bGVFZmZlY3RzKG1vZHVsZUlkKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJlc3VsdCA9IHtcblx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG5cdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuXHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcblx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG5cdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG5cdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcblx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcblx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuXHRcdFx0fVxuXHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuXHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcblx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG5cdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcblx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcblx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG5cdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuXHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG5cdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcblx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG5cdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcblx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuXHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcblx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcblx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcblx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG5cdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRlcnJvcjogYWJvcnRFcnJvclxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdFx0aWYgKGRvQXBwbHkpIHtcblx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBuZXdNb2R1bGVGYWN0b3J5O1xuXHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xuXHRcdFx0XHRmb3IgKG1vZHVsZUlkIGluIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcykge1xuXHRcdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm8ocmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcblx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG5cdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG5cdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuXHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0Y3VycmVudFVwZGF0ZSA9IHVuZGVmaW5lZDtcblxuXHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG5cdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcblx0Zm9yICh2YXIgaiA9IDA7IGogPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBqKyspIHtcblx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tqXTtcblx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jW291dGRhdGVkTW9kdWxlSWRdO1xuXHRcdGlmIChcblx0XHRcdG1vZHVsZSAmJlxuXHRcdFx0KG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCB8fCBtb2R1bGUuaG90Ll9tYWluKSAmJlxuXHRcdFx0Ly8gcmVtb3ZlZCBzZWxmLWFjY2VwdGVkIG1vZHVsZXMgc2hvdWxkIG5vdCBiZSByZXF1aXJlZFxuXHRcdFx0YXBwbGllZFVwZGF0ZVtvdXRkYXRlZE1vZHVsZUlkXSAhPT0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlICYmXG5cdFx0XHQvLyB3aGVuIGNhbGxlZCBpbnZhbGlkYXRlIHNlbGYtYWNjZXB0aW5nIGlzIG5vdCBwb3NzaWJsZVxuXHRcdFx0IW1vZHVsZS5ob3QuX3NlbGZJbnZhbGlkYXRlZFxuXHRcdCkge1xuXHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuXHRcdFx0XHRtb2R1bGU6IG91dGRhdGVkTW9kdWxlSWQsXG5cdFx0XHRcdHJlcXVpcmU6IG1vZHVsZS5ob3QuX3JlcXVpcmVTZWxmLFxuXHRcdFx0XHRlcnJvckhhbmRsZXI6IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZFxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuXG5cdHJldHVybiB7XG5cdFx0ZGlzcG9zZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0Y3VycmVudFVwZGF0ZVJlbW92ZWRDaHVua3MuZm9yRWFjaChmdW5jdGlvbiAoY2h1bmtJZCkge1xuXHRcdFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuXHRcdFx0fSk7XG5cdFx0XHRjdXJyZW50VXBkYXRlUmVtb3ZlZENodW5rcyA9IHVuZGVmaW5lZDtcblxuXHRcdFx0dmFyIGlkeDtcblx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuXHRcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG5cdFx0XHRcdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbbW9kdWxlSWRdO1xuXHRcdFx0XHRpZiAoIW1vZHVsZSkgY29udGludWU7XG5cblx0XHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuXHRcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcblx0XHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcblx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRcdGRpc3Bvc2VIYW5kbGVyc1tqXS5jYWxsKG51bGwsIGRhdGEpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18uaG1yRFttb2R1bGVJZF0gPSBkYXRhO1xuXG5cdFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG5cdFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XG5cblx0XHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXG5cdFx0XHRcdGRlbGV0ZSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbbW9kdWxlSWRdO1xuXG5cdFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcblx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcblxuXHRcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxuXHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdFx0dmFyIGNoaWxkID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jW21vZHVsZS5jaGlsZHJlbltqXV07XG5cdFx0XHRcdFx0aWYgKCFjaGlsZCkgY29udGludWU7XG5cdFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcblx0XHRcdFx0XHRpZiAoaWR4ID49IDApIHtcblx0XHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXG5cdFx0XHR2YXIgZGVwZW5kZW5jeTtcblx0XHRcdGZvciAodmFyIG91dGRhdGVkTW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcblx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubyhvdXRkYXRlZERlcGVuZGVuY2llcywgb3V0ZGF0ZWRNb2R1bGVJZCkpIHtcblx0XHRcdFx0XHRtb2R1bGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbb3V0ZGF0ZWRNb2R1bGVJZF07XG5cdFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuXHRcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPVxuXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1tvdXRkYXRlZE1vZHVsZUlkXTtcblx0XHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG5cdFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuXHRcdFx0XHRcdFx0XHRpZiAoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHRcdGFwcGx5OiBmdW5jdGlvbiAocmVwb3J0RXJyb3IpIHtcblx0XHRcdC8vIGluc2VydCBuZXcgY29kZVxuXHRcdFx0Zm9yICh2YXIgdXBkYXRlTW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGFwcGxpZWRVcGRhdGUsIHVwZGF0ZU1vZHVsZUlkKSkge1xuXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVt1cGRhdGVNb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW3VwZGF0ZU1vZHVsZUlkXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBydW4gbmV3IHJ1bnRpbWUgbW9kdWxlc1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjdXJyZW50VXBkYXRlUnVudGltZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRjdXJyZW50VXBkYXRlUnVudGltZVtpXShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcblx0XHRcdGZvciAodmFyIG91dGRhdGVkTW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcblx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubyhvdXRkYXRlZERlcGVuZGVuY2llcywgb3V0ZGF0ZWRNb2R1bGVJZCkpIHtcblx0XHRcdFx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jW291dGRhdGVkTW9kdWxlSWRdO1xuXHRcdFx0XHRcdGlmIChtb2R1bGUpIHtcblx0XHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID1cblx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbb3V0ZGF0ZWRNb2R1bGVJZF07XG5cdFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG5cdFx0XHRcdFx0XHR2YXIgZXJyb3JIYW5kbGVycyA9IFtdO1xuXHRcdFx0XHRcdFx0dmFyIGRlcGVuZGVuY2llc0ZvckNhbGxiYWNrcyA9IFtdO1xuXHRcdFx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRcdFx0XHR2YXIgZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuXHRcdFx0XHRcdFx0XHR2YXIgYWNjZXB0Q2FsbGJhY2sgPVxuXHRcdFx0XHRcdFx0XHRcdG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuXHRcdFx0XHRcdFx0XHR2YXIgZXJyb3JIYW5kbGVyID1cblx0XHRcdFx0XHRcdFx0XHRtb2R1bGUuaG90Ll9hY2NlcHRlZEVycm9ySGFuZGxlcnNbZGVwZW5kZW5jeV07XG5cdFx0XHRcdFx0XHRcdGlmIChhY2NlcHRDYWxsYmFjaykge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFja3MuaW5kZXhPZihhY2NlcHRDYWxsYmFjaykgIT09IC0xKSBjb250aW51ZTtcblx0XHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChhY2NlcHRDYWxsYmFjayk7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3JIYW5kbGVycy5wdXNoKGVycm9ySGFuZGxlcik7XG5cdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jaWVzRm9yQ2FsbGJhY2tzLnB1c2goZGVwZW5kZW5jeSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGZvciAodmFyIGsgPSAwOyBrIDwgY2FsbGJhY2tzLmxlbmd0aDsgaysrKSB7XG5cdFx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzW2tdLmNhbGwobnVsbCwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuXHRcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAodHlwZW9mIGVycm9ySGFuZGxlcnNba10gPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyc1trXShlcnIsIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogb3V0ZGF0ZWRNb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IGRlcGVuZGVuY2llc0ZvckNhbGxiYWNrc1trXVxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogb3V0ZGF0ZWRNb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogZGVwZW5kZW5jaWVzRm9yQ2FsbGJhY2tzW2tdLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJlcG9ydEVycm9yKGVycjIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJlcG9ydEVycm9yKGVycik7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG91dGRhdGVkTW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBkZXBlbmRlbmNpZXNGb3JDYWxsYmFja3Nba10sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJlcG9ydEVycm9yKGVycik7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXG5cdFx0XHRmb3IgKHZhciBvID0gMDsgbyA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IG8rKykge1xuXHRcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tvXTtcblx0XHRcdFx0dmFyIG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0aXRlbS5yZXF1aXJlKG1vZHVsZUlkKTtcblx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIsIHtcblx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdFx0bW9kdWxlOiBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbbW9kdWxlSWRdXG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG5cdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXG5cdFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRcdHJlcG9ydEVycm9yKGVycjIpO1xuXHRcdFx0XHRcdFx0XHRcdHJlcG9ydEVycm9yKGVycik7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG5cdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcblx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcblx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG5cdFx0XHRcdFx0XHRcdHJlcG9ydEVycm9yKGVycik7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBvdXRkYXRlZE1vZHVsZXM7XG5cdFx0fVxuXHR9O1xufVxuX193ZWJwYWNrX3JlcXVpcmVfXy5obXJJLmpzb25wID0gZnVuY3Rpb24gKG1vZHVsZUlkLCBhcHBseUhhbmRsZXJzKSB7XG5cdGlmICghY3VycmVudFVwZGF0ZSkge1xuXHRcdGN1cnJlbnRVcGRhdGUgPSB7fTtcblx0XHRjdXJyZW50VXBkYXRlUnVudGltZSA9IFtdO1xuXHRcdGN1cnJlbnRVcGRhdGVSZW1vdmVkQ2h1bmtzID0gW107XG5cdFx0YXBwbHlIYW5kbGVycy5wdXNoKGFwcGx5SGFuZGxlcik7XG5cdH1cblx0aWYgKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oY3VycmVudFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG5cdFx0Y3VycmVudFVwZGF0ZVttb2R1bGVJZF0gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdO1xuXHR9XG59O1xuX193ZWJwYWNrX3JlcXVpcmVfXy5obXJDLmpzb25wID0gZnVuY3Rpb24gKFxuXHRjaHVua0lkcyxcblx0cmVtb3ZlZENodW5rcyxcblx0cmVtb3ZlZE1vZHVsZXMsXG5cdHByb21pc2VzLFxuXHRhcHBseUhhbmRsZXJzLFxuXHR1cGRhdGVkTW9kdWxlc0xpc3Rcbikge1xuXHRhcHBseUhhbmRsZXJzLnB1c2goYXBwbHlIYW5kbGVyKTtcblx0Y3VycmVudFVwZGF0ZUNodW5rcyA9IHt9O1xuXHRjdXJyZW50VXBkYXRlUmVtb3ZlZENodW5rcyA9IHJlbW92ZWRDaHVua3M7XG5cdGN1cnJlbnRVcGRhdGUgPSByZW1vdmVkTW9kdWxlcy5yZWR1Y2UoZnVuY3Rpb24gKG9iaiwga2V5KSB7XG5cdFx0b2JqW2tleV0gPSBmYWxzZTtcblx0XHRyZXR1cm4gb2JqO1xuXHR9LCB7fSk7XG5cdGN1cnJlbnRVcGRhdGVSdW50aW1lID0gW107XG5cdGNodW5rSWRzLmZvckVhY2goZnVuY3Rpb24gKGNodW5rSWQpIHtcblx0XHRpZiAoXG5cdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJlxuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdICE9PSB1bmRlZmluZWRcblx0XHQpIHtcblx0XHRcdHByb21pc2VzLnB1c2gobG9hZFVwZGF0ZUNodW5rKGNodW5rSWQsIHVwZGF0ZWRNb2R1bGVzTGlzdCkpO1xuXHRcdFx0Y3VycmVudFVwZGF0ZUNodW5rc1tjaHVua0lkXSA9IHRydWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGN1cnJlbnRVcGRhdGVDaHVua3NbY2h1bmtJZF0gPSBmYWxzZTtcblx0XHR9XG5cdH0pO1xuXHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5mKSB7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5mLmpzb25wSG1yID0gZnVuY3Rpb24gKGNodW5rSWQsIHByb21pc2VzKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdGN1cnJlbnRVcGRhdGVDaHVua3MgJiZcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vKGN1cnJlbnRVcGRhdGVDaHVua3MsIGNodW5rSWQpICYmXG5cdFx0XHRcdCFjdXJyZW50VXBkYXRlQ2h1bmtzW2NodW5rSWRdXG5cdFx0XHQpIHtcblx0XHRcdFx0cHJvbWlzZXMucHVzaChsb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkpO1xuXHRcdFx0XHRjdXJyZW50VXBkYXRlQ2h1bmtzW2NodW5rSWRdID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9O1xuXHR9XG59O1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtck0gPSAoKSA9PiB7XG5cdGlmICh0eXBlb2YgZmV0Y2ggPT09IFwidW5kZWZpbmVkXCIpIHRocm93IG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydDogbmVlZCBmZXRjaCBBUElcIik7XG5cdHJldHVybiBmZXRjaChfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckYoKSkudGhlbigocmVzcG9uc2UpID0+IHtcblx0XHRpZihyZXNwb25zZS5zdGF0dXMgPT09IDQwNCkgcmV0dXJuOyAvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG5cdFx0aWYoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZmV0Y2ggdXBkYXRlIG1hbmlmZXN0IFwiICsgcmVzcG9uc2Uuc3RhdHVzVGV4dCk7XG5cdFx0cmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcblx0fSk7XG59O1xuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiLy8gbW9kdWxlIGNhY2hlIGFyZSB1c2VkIHNvIGVudHJ5IGlubGluaW5nIGlzIGRpc2FibGVkXG4vLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0MzIpO1xuIl0sIm5hbWVzIjpbImluUHJvZ3Jlc3MiLCJkYXRhV2VicGFja1ByZWZpeCIsIl9fd2VicGFja19tb2R1bGVfY2FjaGVfXyIsIl9fd2VicGFja19yZXF1aXJlX18iLCJtb2R1bGVJZCIsImNhY2hlZE1vZHVsZSIsInVuZGVmaW5lZCIsImVycm9yIiwiZXhwb3J0cyIsIm1vZHVsZSIsImV4ZWNPcHRpb25zIiwiaWQiLCJmYWN0b3J5IiwiX193ZWJwYWNrX21vZHVsZXNfXyIsInJlcXVpcmUiLCJpIiwiZm9yRWFjaCIsImhhbmRsZXIiLCJjYWxsIiwiZSIsIm0iLCJjIiwiaHUiLCJjaHVua0lkIiwiaCIsImhtckYiLCJvIiwib2JqIiwicHJvcCIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwibCIsInVybCIsImRvbmUiLCJrZXkiLCJwdXNoIiwic2NyaXB0IiwibmVlZEF0dGFjaCIsInNjcmlwdHMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwibGVuZ3RoIiwicyIsImdldEF0dHJpYnV0ZSIsImNyZWF0ZUVsZW1lbnQiLCJjaGFyc2V0IiwidGltZW91dCIsIm5jIiwic2V0QXR0cmlidXRlIiwic3JjIiwib25TY3JpcHRDb21wbGV0ZSIsInByZXYiLCJldmVudCIsIm9uZXJyb3IiLCJvbmxvYWQiLCJjbGVhclRpbWVvdXQiLCJkb25lRm5zIiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwiZm4iLCJzZXRUaW1lb3V0IiwiYmluZCIsInR5cGUiLCJ0YXJnZXQiLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJjdXJyZW50Q2hpbGRNb2R1bGUiLCJjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVycyIsInF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcyIsImN1cnJlbnRNb2R1bGVEYXRhIiwiaW5zdGFsbGVkTW9kdWxlcyIsImN1cnJlbnRQYXJlbnRzIiwicmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzIiwiY3VycmVudFN0YXR1cyIsImJsb2NraW5nUHJvbWlzZXMiLCJibG9ja2luZ1Byb21pc2VzV2FpdGluZyIsInNldFN0YXR1cyIsIm5ld1N0YXR1cyIsInJlc3VsdHMiLCJQcm9taXNlIiwiYWxsIiwidW5ibG9jayIsInRoZW4iLCJsaXN0IiwiaG90Q2hlY2siLCJhcHBseU9uVXBkYXRlIiwiRXJyb3IiLCJobXJNIiwidXBkYXRlIiwidXBkYXRlZE1vZHVsZXMiLCJrZXlzIiwiaG1yQyIsInJlZHVjZSIsInByb21pc2VzIiwiciIsImludGVybmFsQXBwbHkiLCJyZXNvbHZlIiwiYXBwbHlJbnZhbGlkYXRlZE1vZHVsZXMiLCJob3RBcHBseSIsIm9wdGlvbnMiLCJtYXAiLCJlcnJvcnMiLCJmaWx0ZXIiLCJCb29sZWFuIiwiZGlzcG9zZVByb21pc2UiLCJyZXN1bHQiLCJkaXNwb3NlIiwiYXBwbHlQcm9taXNlIiwicmVwb3J0RXJyb3IiLCJlcnIiLCJvdXRkYXRlZE1vZHVsZXMiLCJhcHBseSIsIm1vZHVsZXMiLCJpbmRleE9mIiwiaG1ySSIsImhtckQiLCJtZSIsIl9tYWluIiwiaG90IiwicmVxdWVzdCIsImFjdGl2ZSIsInBhcmVudHMiLCJjaGlsZHJlbiIsImNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciIsIm5hbWUiLCJjb25maWd1cmFibGUiLCJlbnVtZXJhYmxlIiwiZ2V0Iiwic2V0IiwidmFsdWUiLCJkZWZpbmVQcm9wZXJ0eSIsInByb21pc2UiLCJ0cmFja0Jsb2NraW5nUHJvbWlzZSIsImNyZWF0ZVJlcXVpcmUiLCJfYWNjZXB0ZWREZXBlbmRlbmNpZXMiLCJfYWNjZXB0ZWRFcnJvckhhbmRsZXJzIiwiX2RlY2xpbmVkRGVwZW5kZW5jaWVzIiwiX3NlbGZBY2NlcHRlZCIsIl9zZWxmRGVjbGluZWQiLCJfc2VsZkludmFsaWRhdGVkIiwiX2Rpc3Bvc2VIYW5kbGVycyIsIl9yZXF1aXJlU2VsZiIsInNsaWNlIiwiYWNjZXB0IiwiZGVwIiwiY2FsbGJhY2siLCJlcnJvckhhbmRsZXIiLCJkZWNsaW5lIiwiYWRkRGlzcG9zZUhhbmRsZXIiLCJyZW1vdmVEaXNwb3NlSGFuZGxlciIsImlkeCIsInNwbGljZSIsImludmFsaWRhdGUiLCJ0aGlzIiwiY2hlY2siLCJzdGF0dXMiLCJhZGRTdGF0dXNIYW5kbGVyIiwicmVtb3ZlU3RhdHVzSGFuZGxlciIsImRhdGEiLCJwIiwiY3VycmVudFVwZGF0ZWRNb2R1bGVzTGlzdCIsImN1cnJlbnRVcGRhdGVDaHVua3MiLCJjdXJyZW50VXBkYXRlIiwiY3VycmVudFVwZGF0ZVJlbW92ZWRDaHVua3MiLCJjdXJyZW50VXBkYXRlUnVudGltZSIsImluc3RhbGxlZENodW5rcyIsImhtclNfanNvbnAiLCJ3YWl0aW5nVXBkYXRlUmVzb2x2ZXMiLCJsb2FkVXBkYXRlQ2h1bmsiLCJ1cGRhdGVkTW9kdWxlc0xpc3QiLCJyZWplY3QiLCJlcnJvclR5cGUiLCJyZWFsU3JjIiwibWVzc2FnZSIsImFwcGx5SGFuZGxlciIsImdldEFmZmVjdGVkTW9kdWxlRWZmZWN0cyIsInVwZGF0ZU1vZHVsZUlkIiwib3V0ZGF0ZWREZXBlbmRlbmNpZXMiLCJxdWV1ZSIsImNoYWluIiwicXVldWVJdGVtIiwicG9wIiwicGFyZW50SWQiLCJwYXJlbnQiLCJjb25jYXQiLCJhZGRBbGxUb1NldCIsImEiLCJiIiwiaXRlbSIsImYiLCJqc29ucEhtciIsImFwcGxpZWRVcGRhdGUiLCJ3YXJuVW5leHBlY3RlZFJlcXVpcmUiLCJuZXdNb2R1bGVGYWN0b3J5IiwiYWJvcnRFcnJvciIsImRvQXBwbHkiLCJkb0Rpc3Bvc2UiLCJjaGFpbkluZm8iLCJqb2luIiwib25EZWNsaW5lZCIsImlnbm9yZURlY2xpbmVkIiwib25VbmFjY2VwdGVkIiwiaWdub3JlVW5hY2NlcHRlZCIsIm9uQWNjZXB0ZWQiLCJvbkRpc3Bvc2VkIiwibW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMiLCJvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMiLCJqIiwib3V0ZGF0ZWRNb2R1bGVJZCIsImRlcGVuZGVuY3kiLCJkaXNwb3NlSGFuZGxlcnMiLCJjaGlsZCIsImNhbGxiYWNrcyIsImVycm9ySGFuZGxlcnMiLCJkZXBlbmRlbmNpZXNGb3JDYWxsYmFja3MiLCJhY2NlcHRDYWxsYmFjayIsImsiLCJkZXBlbmRlbmN5SWQiLCJlcnIyIiwib25FcnJvcmVkIiwib3JpZ2luYWxFcnJvciIsImlnbm9yZUVycm9yZWQiLCJzZWxmIiwibW9yZU1vZHVsZXMiLCJydW50aW1lIiwianNvbnAiLCJhcHBseUhhbmRsZXJzIiwiY2h1bmtJZHMiLCJyZW1vdmVkQ2h1bmtzIiwicmVtb3ZlZE1vZHVsZXMiLCJmZXRjaCIsInJlc3BvbnNlIiwib2siLCJzdGF0dXNUZXh0IiwianNvbiJdLCJzb3VyY2VSb290IjoiIn0=