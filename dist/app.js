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
/******/o.h=()=>"9f9aefdc5a5afe4a6c3a"
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
/******/},p=setTimeout(f.bind(null,void 0,{type:"timeout",target:d}),12e4);
/******/
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QkEsRUFBUzVFLE9BQVo7UUFDQSxJQUFJNEUsRUFBU0MsR0FBSSxNQUFNLElBQUlsSixNQUFNLG1DQUFxQ2lKLEVBQVNFO1FBQy9FLE9BQU9GLEVBQVNHO1FBRmtCLENBRVo7UUFDckIsQzs7Ozs7Ozs7Ozs7O1FDdGZ1QnhPLEVBQW9CIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VicGFjay1leGFtcGxlLWJ5LWxpYnJhcnkvd2VicGFjay9ydW50aW1lL2xvYWQgc2NyaXB0Iiwid2VicGFjazovL3dlYnBhY2stZXhhbXBsZS1ieS1saWJyYXJ5L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYnBhY2stZXhhbXBsZS1ieS1saWJyYXJ5L3dlYnBhY2svcnVudGltZS9nZXQgamF2YXNjcmlwdCB1cGRhdGUgY2h1bmsgZmlsZW5hbWUiLCJ3ZWJwYWNrOi8vd2VicGFjay1leGFtcGxlLWJ5LWxpYnJhcnkvd2VicGFjay9ydW50aW1lL2dldCB1cGRhdGUgbWFuaWZlc3QgZmlsZW5hbWUiLCJ3ZWJwYWNrOi8vd2VicGFjay1leGFtcGxlLWJ5LWxpYnJhcnkvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIiwid2VicGFjazovL3dlYnBhY2stZXhhbXBsZS1ieS1saWJyYXJ5L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VicGFjay1leGFtcGxlLWJ5LWxpYnJhcnkvd2VicGFjay9ydW50aW1lL2hvdCBtb2R1bGUgcmVwbGFjZW1lbnQiLCJ3ZWJwYWNrOi8vd2VicGFjay1leGFtcGxlLWJ5LWxpYnJhcnkvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vd2VicGFjay1leGFtcGxlLWJ5LWxpYnJhcnkvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vd2VicGFjay1leGFtcGxlLWJ5LWxpYnJhcnkvd2VicGFjay9zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBpblByb2dyZXNzID0ge307XG52YXIgZGF0YVdlYnBhY2tQcmVmaXggPSBcIndlYnBhY2stZXhhbXBsZS1ieS1saWJyYXJ5OlwiO1xuLy8gbG9hZFNjcmlwdCBmdW5jdGlvbiB0byBsb2FkIGEgc2NyaXB0IHZpYSBzY3JpcHQgdGFnXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmwgPSAodXJsLCBkb25lLCBrZXksIGNodW5rSWQpID0+IHtcblx0aWYoaW5Qcm9ncmVzc1t1cmxdKSB7IGluUHJvZ3Jlc3NbdXJsXS5wdXNoKGRvbmUpOyByZXR1cm47IH1cblx0dmFyIHNjcmlwdCwgbmVlZEF0dGFjaDtcblx0aWYoa2V5ICE9PSB1bmRlZmluZWQpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgcyA9IHNjcmlwdHNbaV07XG5cdFx0XHRpZihzLmdldEF0dHJpYnV0ZShcInNyY1wiKSA9PSB1cmwgfHwgcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXdlYnBhY2tcIikgPT0gZGF0YVdlYnBhY2tQcmVmaXggKyBrZXkpIHsgc2NyaXB0ID0gczsgYnJlYWs7IH1cblx0XHR9XG5cdH1cblx0aWYoIXNjcmlwdCkge1xuXHRcdG5lZWRBdHRhY2ggPSB0cnVlO1xuXHRcdHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG5cdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuXHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuXHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG5cdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG5cdFx0fVxuXHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXdlYnBhY2tcIiwgZGF0YVdlYnBhY2tQcmVmaXggKyBrZXkpO1xuXHRcdHNjcmlwdC5zcmMgPSB1cmw7XG5cdH1cblx0aW5Qcm9ncmVzc1t1cmxdID0gW2RvbmVdO1xuXHR2YXIgb25TY3JpcHRDb21wbGV0ZSA9IChwcmV2LCBldmVudCkgPT4ge1xuXHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cblx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHR2YXIgZG9uZUZucyA9IGluUHJvZ3Jlc3NbdXJsXTtcblx0XHRkZWxldGUgaW5Qcm9ncmVzc1t1cmxdO1xuXHRcdHNjcmlwdC5wYXJlbnROb2RlICYmIHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG5cdFx0ZG9uZUZucyAmJiBkb25lRm5zLmZvckVhY2goKGZuKSA9PiAoZm4oZXZlbnQpKSk7XG5cdFx0aWYocHJldikgcmV0dXJuIHByZXYoZXZlbnQpO1xuXHR9O1xuXHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQob25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHVuZGVmaW5lZCwgeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pLCAxMjAwMDApO1xuXHRzY3JpcHQub25lcnJvciA9IG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCBzY3JpcHQub25lcnJvcik7XG5cdHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgc2NyaXB0Lm9ubG9hZCk7XG5cdG5lZWRBdHRhY2ggJiYgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xufTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0aWYgKGNhY2hlZE1vZHVsZS5lcnJvciAhPT0gdW5kZWZpbmVkKSB0aHJvdyBjYWNoZWRNb2R1bGUuZXJyb3I7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdHRyeSB7XG5cdFx0dmFyIGV4ZWNPcHRpb25zID0geyBpZDogbW9kdWxlSWQsIG1vZHVsZTogbW9kdWxlLCBmYWN0b3J5OiBfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXSwgcmVxdWlyZTogX193ZWJwYWNrX3JlcXVpcmVfXyB9O1xuXHRcdF9fd2VicGFja19yZXF1aXJlX18uaS5mb3JFYWNoKGZ1bmN0aW9uKGhhbmRsZXIpIHsgaGFuZGxlcihleGVjT3B0aW9ucyk7IH0pO1xuXHRcdG1vZHVsZSA9IGV4ZWNPcHRpb25zLm1vZHVsZTtcblx0XHRleGVjT3B0aW9ucy5mYWN0b3J5LmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGV4ZWNPcHRpb25zLnJlcXVpcmUpO1xuXHR9IGNhdGNoKGUpIHtcblx0XHRtb2R1bGUuZXJyb3IgPSBlO1xuXHRcdHRocm93IGU7XG5cdH1cblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4vLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuX193ZWJwYWNrX3JlcXVpcmVfXy5jID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fO1xuXG4vLyBleHBvc2UgdGhlIG1vZHVsZSBleGVjdXRpb24gaW50ZXJjZXB0b3Jcbl9fd2VicGFja19yZXF1aXJlX18uaSA9IFtdO1xuXG4iLCIvLyBUaGlzIGZ1bmN0aW9uIGFsbG93IHRvIHJlZmVyZW5jZSBhbGwgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmh1ID0gKGNodW5rSWQpID0+IHtcblx0Ly8gcmV0dXJuIHVybCBmb3IgZmlsZW5hbWVzIGJhc2VkIG9uIHRlbXBsYXRlXG5cdHJldHVybiBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgX193ZWJwYWNrX3JlcXVpcmVfXy5oKCkgKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uaG1yRiA9ICgpID0+IChcImFwcC5cIiArIF9fd2VicGFja19yZXF1aXJlX18uaCgpICsgXCIuaG90LXVwZGF0ZS5qc29uXCIpOyIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcIjlmOWFlZmRjNWE1YWZlNGE2YzNhXCIpIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsInZhciBjdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xudmFyIGluc3RhbGxlZE1vZHVsZXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmM7XG5cbi8vIG1vZHVsZSBhbmQgcmVxdWlyZSBjcmVhdGlvblxudmFyIGN1cnJlbnRDaGlsZE1vZHVsZTtcbnZhciBjdXJyZW50UGFyZW50cyA9IFtdO1xuXG4vLyBzdGF0dXNcbnZhciByZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnMgPSBbXTtcbnZhciBjdXJyZW50U3RhdHVzID0gXCJpZGxlXCI7XG5cbi8vIHdoaWxlIGRvd25sb2FkaW5nXG52YXIgYmxvY2tpbmdQcm9taXNlcyA9IDA7XG52YXIgYmxvY2tpbmdQcm9taXNlc1dhaXRpbmcgPSBbXTtcblxuLy8gVGhlIHVwZGF0ZSBpbmZvXG52YXIgY3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnM7XG52YXIgcXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbl9fd2VicGFja19yZXF1aXJlX18uaG1yRCA9IGN1cnJlbnRNb2R1bGVEYXRhO1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmkucHVzaChmdW5jdGlvbiAob3B0aW9ucykge1xuXHR2YXIgbW9kdWxlID0gb3B0aW9ucy5tb2R1bGU7XG5cdHZhciByZXF1aXJlID0gY3JlYXRlUmVxdWlyZShvcHRpb25zLnJlcXVpcmUsIG9wdGlvbnMuaWQpO1xuXHRtb2R1bGUuaG90ID0gY3JlYXRlTW9kdWxlSG90T2JqZWN0KG9wdGlvbnMuaWQsIG1vZHVsZSk7XG5cdG1vZHVsZS5wYXJlbnRzID0gY3VycmVudFBhcmVudHM7XG5cdG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRjdXJyZW50UGFyZW50cyA9IFtdO1xuXHRvcHRpb25zLnJlcXVpcmUgPSByZXF1aXJlO1xufSk7XG5cbl9fd2VicGFja19yZXF1aXJlX18uaG1yQyA9IHt9O1xuX193ZWJwYWNrX3JlcXVpcmVfXy5obXJJID0ge307XG5cbmZ1bmN0aW9uIGNyZWF0ZVJlcXVpcmUocmVxdWlyZSwgbW9kdWxlSWQpIHtcblx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cdGlmICghbWUpIHJldHVybiByZXF1aXJlO1xuXHR2YXIgZm4gPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuXHRcdGlmIChtZS5ob3QuYWN0aXZlKSB7XG5cdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuXHRcdFx0XHR2YXIgcGFyZW50cyA9IGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cztcblx0XHRcdFx0aWYgKHBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG5cdFx0XHRcdFx0cGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuXHRcdFx0XHRjdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xuXHRcdFx0fVxuXHRcdFx0aWYgKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPT09IC0xKSB7XG5cdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnNvbGUud2Fybihcblx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgK1xuXHRcdFx0XHRcdHJlcXVlc3QgK1xuXHRcdFx0XHRcdFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArXG5cdFx0XHRcdFx0bW9kdWxlSWRcblx0XHRcdCk7XG5cdFx0XHRjdXJyZW50UGFyZW50cyA9IFtdO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVxdWlyZShyZXF1ZXN0KTtcblx0fTtcblx0dmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmV0dXJuIHJlcXVpcmVbbmFtZV07XG5cdFx0XHR9LFxuXHRcdFx0c2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcblx0XHRcdFx0cmVxdWlyZVtuYW1lXSA9IHZhbHVlO1xuXHRcdFx0fVxuXHRcdH07XG5cdH07XG5cdGZvciAodmFyIG5hbWUgaW4gcmVxdWlyZSkge1xuXHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocmVxdWlyZSwgbmFtZSkgJiYgbmFtZSAhPT0gXCJlXCIpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKG5hbWUpKTtcblx0XHR9XG5cdH1cblx0Zm4uZSA9IGZ1bmN0aW9uIChjaHVua0lkKSB7XG5cdFx0cmV0dXJuIHRyYWNrQmxvY2tpbmdQcm9taXNlKHJlcXVpcmUuZShjaHVua0lkKSk7XG5cdH07XG5cdHJldHVybiBmbjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTW9kdWxlSG90T2JqZWN0KG1vZHVsZUlkLCBtZSkge1xuXHR2YXIgX21haW4gPSBjdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkO1xuXHR2YXIgaG90ID0ge1xuXHRcdC8vIHByaXZhdGUgc3R1ZmZcblx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuXHRcdF9hY2NlcHRlZEVycm9ySGFuZGxlcnM6IHt9LFxuXHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG5cdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG5cdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG5cdFx0X3NlbGZJbnZhbGlkYXRlZDogZmFsc2UsXG5cdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG5cdFx0X21haW46IF9tYWluLFxuXHRcdF9yZXF1aXJlU2VsZjogZnVuY3Rpb24gKCkge1xuXHRcdFx0Y3VycmVudFBhcmVudHMgPSBtZS5wYXJlbnRzLnNsaWNlKCk7XG5cdFx0XHRjdXJyZW50Q2hpbGRNb2R1bGUgPSBfbWFpbiA/IHVuZGVmaW5lZCA6IG1vZHVsZUlkO1xuXHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG5cdFx0fSxcblxuXHRcdC8vIE1vZHVsZSBBUElcblx0XHRhY3RpdmU6IHRydWUsXG5cdFx0YWNjZXB0OiBmdW5jdGlvbiAoZGVwLCBjYWxsYmFjaywgZXJyb3JIYW5kbGVyKSB7XG5cdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcblx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG5cdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiICYmIGRlcCAhPT0gbnVsbCkge1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uICgpIHt9O1xuXHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWRFcnJvckhhbmRsZXJzW2RlcFtpXV0gPSBlcnJvckhhbmRsZXI7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uICgpIHt9O1xuXHRcdFx0XHRob3QuX2FjY2VwdGVkRXJyb3JIYW5kbGVyc1tkZXBdID0gZXJyb3JIYW5kbGVyO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0ZGVjbGluZTogZnVuY3Rpb24gKGRlcCkge1xuXHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG5cdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiICYmIGRlcCAhPT0gbnVsbClcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG5cdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcblx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcblx0XHR9LFxuXHRcdGRpc3Bvc2U6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG5cdFx0fSxcblx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG5cdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcblx0XHR9LFxuXHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcblx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG5cdFx0fSxcblx0XHRpbnZhbGlkYXRlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLl9zZWxmSW52YWxpZGF0ZWQgPSB0cnVlO1xuXHRcdFx0c3dpdGNoIChjdXJyZW50U3RhdHVzKSB7XG5cdFx0XHRcdGNhc2UgXCJpZGxlXCI6XG5cdFx0XHRcdFx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMgPSBbXTtcblx0XHRcdFx0XHRPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5obXJJW2tleV0oXG5cdFx0XHRcdFx0XHRcdG1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVyc1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRzZXRTdGF0dXMoXCJyZWFkeVwiKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcInJlYWR5XCI6XG5cdFx0XHRcdFx0T2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5obXJJKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18uaG1ySVtrZXldKFxuXHRcdFx0XHRcdFx0XHRtb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnNcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJwcmVwYXJlXCI6XG5cdFx0XHRcdGNhc2UgXCJjaGVja1wiOlxuXHRcdFx0XHRjYXNlIFwiZGlzcG9zZVwiOlxuXHRcdFx0XHRjYXNlIFwiYXBwbHlcIjpcblx0XHRcdFx0XHQocXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzID0gcXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzIHx8IFtdKS5wdXNoKFxuXHRcdFx0XHRcdFx0bW9kdWxlSWRcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdC8vIGlnbm9yZSByZXF1ZXN0cyBpbiBlcnJvciBzdGF0ZXNcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gTWFuYWdlbWVudCBBUElcblx0XHRjaGVjazogaG90Q2hlY2ssXG5cdFx0YXBwbHk6IGhvdEFwcGx5LFxuXHRcdHN0YXR1czogZnVuY3Rpb24gKGwpIHtcblx0XHRcdGlmICghbCkgcmV0dXJuIGN1cnJlbnRTdGF0dXM7XG5cdFx0XHRyZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnMucHVzaChsKTtcblx0XHR9LFxuXHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uIChsKSB7XG5cdFx0XHRyZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnMucHVzaChsKTtcblx0XHR9LFxuXHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uIChsKSB7XG5cdFx0XHR2YXIgaWR4ID0gcmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG5cdFx0XHRpZiAoaWR4ID49IDApIHJlZ2lzdGVyZWRTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcblx0XHR9LFxuXG5cdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG5cdFx0ZGF0YTogY3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG5cdH07XG5cdGN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcblx0cmV0dXJuIGhvdDtcbn1cblxuZnVuY3Rpb24gc2V0U3RhdHVzKG5ld1N0YXR1cykge1xuXHRjdXJyZW50U3RhdHVzID0gbmV3U3RhdHVzO1xuXHR2YXIgcmVzdWx0cyA9IFtdO1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgcmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuXHRcdHJlc3VsdHNbaV0gPSByZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuXG5cdHJldHVybiBQcm9taXNlLmFsbChyZXN1bHRzKTtcbn1cblxuZnVuY3Rpb24gdW5ibG9jaygpIHtcblx0aWYgKC0tYmxvY2tpbmdQcm9taXNlcyA9PT0gMCkge1xuXHRcdHNldFN0YXR1cyhcInJlYWR5XCIpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKGJsb2NraW5nUHJvbWlzZXMgPT09IDApIHtcblx0XHRcdFx0dmFyIGxpc3QgPSBibG9ja2luZ1Byb21pc2VzV2FpdGluZztcblx0XHRcdFx0YmxvY2tpbmdQcm9taXNlc1dhaXRpbmcgPSBbXTtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0bGlzdFtpXSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdHJhY2tCbG9ja2luZ1Byb21pc2UocHJvbWlzZSkge1xuXHRzd2l0Y2ggKGN1cnJlbnRTdGF0dXMpIHtcblx0XHRjYXNlIFwicmVhZHlcIjpcblx0XHRcdHNldFN0YXR1cyhcInByZXBhcmVcIik7XG5cdFx0LyogZmFsbHRocm91Z2ggKi9cblx0XHRjYXNlIFwicHJlcGFyZVwiOlxuXHRcdFx0YmxvY2tpbmdQcm9taXNlcysrO1xuXHRcdFx0cHJvbWlzZS50aGVuKHVuYmxvY2ssIHVuYmxvY2spO1xuXHRcdFx0cmV0dXJuIHByb21pc2U7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiBwcm9taXNlO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHdhaXRGb3JCbG9ja2luZ1Byb21pc2VzKGZuKSB7XG5cdGlmIChibG9ja2luZ1Byb21pc2VzID09PSAwKSByZXR1cm4gZm4oKTtcblx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG5cdFx0YmxvY2tpbmdQcm9taXNlc1dhaXRpbmcucHVzaChmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXNvbHZlKGZuKCkpO1xuXHRcdH0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gaG90Q2hlY2soYXBwbHlPblVwZGF0ZSkge1xuXHRpZiAoY3VycmVudFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcblx0fVxuXHRyZXR1cm4gc2V0U3RhdHVzKFwiY2hlY2tcIilcblx0XHQudGhlbihfX3dlYnBhY2tfcmVxdWlyZV9fLmhtck0pXG5cdFx0LnRoZW4oZnVuY3Rpb24gKHVwZGF0ZSkge1xuXHRcdFx0aWYgKCF1cGRhdGUpIHtcblx0XHRcdFx0cmV0dXJuIHNldFN0YXR1cyhhcHBseUludmFsaWRhdGVkTW9kdWxlcygpID8gXCJyZWFkeVwiIDogXCJpZGxlXCIpLnRoZW4oXG5cdFx0XHRcdFx0ZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gc2V0U3RhdHVzKFwicHJlcGFyZVwiKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dmFyIHVwZGF0ZWRNb2R1bGVzID0gW107XG5cdFx0XHRcdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzID0gW107XG5cblx0XHRcdFx0cmV0dXJuIFByb21pc2UuYWxsKFxuXHRcdFx0XHRcdE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uaG1yQykucmVkdWNlKGZ1bmN0aW9uIChcblx0XHRcdFx0XHRcdHByb21pc2VzLFxuXHRcdFx0XHRcdFx0a2V5XG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckNba2V5XShcblx0XHRcdFx0XHRcdFx0dXBkYXRlLmMsXG5cdFx0XHRcdFx0XHRcdHVwZGF0ZS5yLFxuXHRcdFx0XHRcdFx0XHR1cGRhdGUubSxcblx0XHRcdFx0XHRcdFx0cHJvbWlzZXMsXG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzLFxuXHRcdFx0XHRcdFx0XHR1cGRhdGVkTW9kdWxlc1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdHJldHVybiBwcm9taXNlcztcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFtdKVxuXHRcdFx0XHQpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHJldHVybiB3YWl0Rm9yQmxvY2tpbmdQcm9taXNlcyhmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRpZiAoYXBwbHlPblVwZGF0ZSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gaW50ZXJuYWxBcHBseShhcHBseU9uVXBkYXRlKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBzZXRTdGF0dXMoXCJyZWFkeVwiKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdXBkYXRlZE1vZHVsZXM7XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH0pO1xufVxuXG5mdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG5cdGlmIChjdXJyZW50U3RhdHVzICE9PSBcInJlYWR5XCIpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzIChzdGF0ZTogXCIgK1xuXHRcdFx0XHRcdGN1cnJlbnRTdGF0dXMgK1xuXHRcdFx0XHRcdFwiKVwiXG5cdFx0XHQpO1xuXHRcdH0pO1xuXHR9XG5cdHJldHVybiBpbnRlcm5hbEFwcGx5KG9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiBpbnRlcm5hbEFwcGx5KG9wdGlvbnMpIHtcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0YXBwbHlJbnZhbGlkYXRlZE1vZHVsZXMoKTtcblxuXHR2YXIgcmVzdWx0cyA9IGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzLm1hcChmdW5jdGlvbiAoaGFuZGxlcikge1xuXHRcdHJldHVybiBoYW5kbGVyKG9wdGlvbnMpO1xuXHR9KTtcblx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMgPSB1bmRlZmluZWQ7XG5cblx0dmFyIGVycm9ycyA9IHJlc3VsdHNcblx0XHQubWFwKGZ1bmN0aW9uIChyKSB7XG5cdFx0XHRyZXR1cm4gci5lcnJvcjtcblx0XHR9KVxuXHRcdC5maWx0ZXIoQm9vbGVhbik7XG5cblx0aWYgKGVycm9ycy5sZW5ndGggPiAwKSB7XG5cdFx0cmV0dXJuIHNldFN0YXR1cyhcImFib3J0XCIpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhyb3cgZXJyb3JzWzBdO1xuXHRcdH0pO1xuXHR9XG5cblx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG5cdHZhciBkaXNwb3NlUHJvbWlzZSA9IHNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG5cblx0cmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uIChyZXN1bHQpIHtcblx0XHRpZiAocmVzdWx0LmRpc3Bvc2UpIHJlc3VsdC5kaXNwb3NlKCk7XG5cdH0pO1xuXG5cdC8vIE5vdyBpbiBcImFwcGx5XCIgcGhhc2Vcblx0dmFyIGFwcGx5UHJvbWlzZSA9IHNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG5cdHZhciBlcnJvcjtcblx0dmFyIHJlcG9ydEVycm9yID0gZnVuY3Rpb24gKGVycikge1xuXHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuXHR9O1xuXG5cdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcblx0cmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uIChyZXN1bHQpIHtcblx0XHRpZiAocmVzdWx0LmFwcGx5KSB7XG5cdFx0XHR2YXIgbW9kdWxlcyA9IHJlc3VsdC5hcHBseShyZXBvcnRFcnJvcik7XG5cdFx0XHRpZiAobW9kdWxlcykge1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChtb2R1bGVzW2ldKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cblx0cmV0dXJuIFByb21pc2UuYWxsKFtkaXNwb3NlUHJvbWlzZSwgYXBwbHlQcm9taXNlXSkudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcblx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdHJldHVybiBzZXRTdGF0dXMoXCJmYWlsXCIpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR0aHJvdyBlcnJvcjtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGlmIChxdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMpIHtcblx0XHRcdHJldHVybiBpbnRlcm5hbEFwcGx5KG9wdGlvbnMpLnRoZW4oZnVuY3Rpb24gKGxpc3QpIHtcblx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKG1vZHVsZUlkKSB7XG5cdFx0XHRcdFx0aWYgKGxpc3QuaW5kZXhPZihtb2R1bGVJZCkgPCAwKSBsaXN0LnB1c2gobW9kdWxlSWQpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuIGxpc3Q7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gc2V0U3RhdHVzKFwiaWRsZVwiKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBvdXRkYXRlZE1vZHVsZXM7XG5cdFx0fSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBhcHBseUludmFsaWRhdGVkTW9kdWxlcygpIHtcblx0aWYgKHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcykge1xuXHRcdGlmICghY3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMpIGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzID0gW107XG5cdFx0T2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5obXJJKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGVJZCkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmhtcklba2V5XShcblx0XHRcdFx0XHRtb2R1bGVJZCxcblx0XHRcdFx0XHRjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVyc1xuXHRcdFx0XHQpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdFx0cXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzID0gdW5kZWZpbmVkO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG59IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmhtclNfanNvbnAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmhtclNfanNvbnAgfHwge1xuXHQxNDM6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG52YXIgY3VycmVudFVwZGF0ZWRNb2R1bGVzTGlzdDtcbnZhciB3YWl0aW5nVXBkYXRlUmVzb2x2ZXMgPSB7fTtcbmZ1bmN0aW9uIGxvYWRVcGRhdGVDaHVuayhjaHVua0lkLCB1cGRhdGVkTW9kdWxlc0xpc3QpIHtcblx0Y3VycmVudFVwZGF0ZWRNb2R1bGVzTGlzdCA9IHVwZGF0ZWRNb2R1bGVzTGlzdDtcblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHR3YWl0aW5nVXBkYXRlUmVzb2x2ZXNbY2h1bmtJZF0gPSByZXNvbHZlO1xuXHRcdC8vIHN0YXJ0IHVwZGF0ZSBjaHVuayBsb2FkaW5nXG5cdFx0dmFyIHVybCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIF9fd2VicGFja19yZXF1aXJlX18uaHUoY2h1bmtJZCk7XG5cdFx0Ly8gY3JlYXRlIGVycm9yIGJlZm9yZSBzdGFjayB1bndvdW5kIHRvIGdldCB1c2VmdWwgc3RhY2t0cmFjZSBsYXRlclxuXHRcdHZhciBlcnJvciA9IG5ldyBFcnJvcigpO1xuXHRcdHZhciBsb2FkaW5nRW5kZWQgPSAoZXZlbnQpID0+IHtcblx0XHRcdGlmKHdhaXRpbmdVcGRhdGVSZXNvbHZlc1tjaHVua0lkXSkge1xuXHRcdFx0XHR3YWl0aW5nVXBkYXRlUmVzb2x2ZXNbY2h1bmtJZF0gPSB1bmRlZmluZWRcblx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcblx0XHRcdFx0dmFyIHJlYWxTcmMgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYztcblx0XHRcdFx0ZXJyb3IubWVzc2FnZSA9ICdMb2FkaW5nIGhvdCB1cGRhdGUgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknO1xuXHRcdFx0XHRlcnJvci5uYW1lID0gJ0NodW5rTG9hZEVycm9yJztcblx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcblx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG5cdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHR9XG5cdFx0fTtcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmwodXJsLCBsb2FkaW5nRW5kZWQpO1xuXHR9KTtcbn1cblxuc2VsZltcIndlYnBhY2tIb3RVcGRhdGV3ZWJwYWNrX2V4YW1wbGVfYnlfbGlicmFyeVwiXSA9IChjaHVua0lkLCBtb3JlTW9kdWxlcywgcnVudGltZSkgPT4ge1xuXHRmb3IodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdGN1cnJlbnRVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0aWYoY3VycmVudFVwZGF0ZWRNb2R1bGVzTGlzdCkgY3VycmVudFVwZGF0ZWRNb2R1bGVzTGlzdC5wdXNoKG1vZHVsZUlkKTtcblx0XHR9XG5cdH1cblx0aWYocnVudGltZSkgY3VycmVudFVwZGF0ZVJ1bnRpbWUucHVzaChydW50aW1lKTtcblx0aWYod2FpdGluZ1VwZGF0ZVJlc29sdmVzW2NodW5rSWRdKSB7XG5cdFx0d2FpdGluZ1VwZGF0ZVJlc29sdmVzW2NodW5rSWRdKCk7XG5cdFx0d2FpdGluZ1VwZGF0ZVJlc29sdmVzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuXHR9XG59O1xuXG52YXIgY3VycmVudFVwZGF0ZUNodW5rcztcbnZhciBjdXJyZW50VXBkYXRlO1xudmFyIGN1cnJlbnRVcGRhdGVSZW1vdmVkQ2h1bmtzO1xudmFyIGN1cnJlbnRVcGRhdGVSdW50aW1lO1xuZnVuY3Rpb24gYXBwbHlIYW5kbGVyKG9wdGlvbnMpIHtcblx0aWYgKF9fd2VicGFja19yZXF1aXJlX18uZikgZGVsZXRlIF9fd2VicGFja19yZXF1aXJlX18uZi5qc29ucEhtcjtcblx0Y3VycmVudFVwZGF0ZUNodW5rcyA9IHVuZGVmaW5lZDtcblx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRNb2R1bGVFZmZlY3RzKHVwZGF0ZU1vZHVsZUlkKSB7XG5cdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG5cdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cblx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMubWFwKGZ1bmN0aW9uIChpZCkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0Y2hhaW46IFtpZF0sXG5cdFx0XHRcdGlkOiBpZFxuXHRcdFx0fTtcblx0XHR9KTtcblx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuXHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xuXHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xuXHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xuXHRcdFx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19yZXF1aXJlX18uY1ttb2R1bGVJZF07XG5cdFx0XHRpZiAoXG5cdFx0XHRcdCFtb2R1bGUgfHxcblx0XHRcdFx0KG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCAmJiAhbW9kdWxlLmhvdC5fc2VsZkludmFsaWRhdGVkKVxuXHRcdFx0KVxuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdGlmIChtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcblx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG5cdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0XHRpZiAobW9kdWxlLmhvdC5fbWFpbikge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxuXHRcdFx0XHRcdGNoYWluOiBjaGFpbixcblx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG5cdFx0XHRcdHZhciBwYXJlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbcGFyZW50SWRdO1xuXHRcdFx0XHRpZiAoIXBhcmVudCkgY29udGludWU7XG5cdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxuXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcblx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcblx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSAhPT0gLTEpIGNvbnRpbnVlO1xuXHRcdFx0XHRpZiAocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG5cdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG5cdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcblx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG5cdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcblx0XHRcdFx0cXVldWUucHVzaCh7XG5cdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcblx0XHRcdFx0XHRpZDogcGFyZW50SWRcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcblx0XHRcdG1vZHVsZUlkOiB1cGRhdGVNb2R1bGVJZCxcblx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxuXHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXG5cdFx0fTtcblx0fVxuXG5cdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gYltpXTtcblx0XHRcdGlmIChhLmluZGV4T2YoaXRlbSkgPT09IC0xKSBhLnB1c2goaXRlbSk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcblx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuXHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuXHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuXG5cdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUobW9kdWxlKSB7XG5cdFx0Y29uc29sZS53YXJuKFxuXHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyBtb2R1bGUuaWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCJcblx0XHQpO1xuXHR9O1xuXG5cdGZvciAodmFyIG1vZHVsZUlkIGluIGN1cnJlbnRVcGRhdGUpIHtcblx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGN1cnJlbnRVcGRhdGUsIG1vZHVsZUlkKSkge1xuXHRcdFx0dmFyIG5ld01vZHVsZUZhY3RvcnkgPSBjdXJyZW50VXBkYXRlW21vZHVsZUlkXTtcblx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cblx0XHRcdHZhciByZXN1bHQ7XG5cdFx0XHRpZiAobmV3TW9kdWxlRmFjdG9yeSkge1xuXHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZE1vZHVsZUVmZmVjdHMobW9kdWxlSWQpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmVzdWx0ID0ge1xuXHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcblx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHRcdC8qKiBAdHlwZSB7RXJyb3J8ZmFsc2V9ICovXG5cdFx0XHR2YXIgYWJvcnRFcnJvciA9IGZhbHNlO1xuXHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcblx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcblx0XHRcdHZhciBjaGFpbkluZm8gPSBcIlwiO1xuXHRcdFx0aWYgKHJlc3VsdC5jaGFpbikge1xuXHRcdFx0XHRjaGFpbkluZm8gPSBcIlxcblVwZGF0ZSBwcm9wYWdhdGlvbjogXCIgKyByZXN1bHQuY2hhaW4uam9pbihcIiAtPiBcIik7XG5cdFx0XHR9XG5cdFx0XHRzd2l0Y2ggKHJlc3VsdC50eXBlKSB7XG5cdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG5cdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuXHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcblx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArXG5cdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcblx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJkZWNsaW5lZFwiOlxuXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcblx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICtcblx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuXHRcdFx0XHRcdFx0XHRcdFwiIGluIFwiICtcblx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucGFyZW50SWQgK1xuXHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcInVuYWNjZXB0ZWRcIjpcblx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblVuYWNjZXB0ZWQpIG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XG5cdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG5cdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuXHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIgKyBjaGFpbkluZm9cblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxuXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQWNjZXB0ZWQpIG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xuXHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcblx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRpc3Bvc2VkKSBvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcblx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoYWJvcnRFcnJvcikge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGVycm9yOiBhYm9ydEVycm9yXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0XHRpZiAoZG9BcHBseSkge1xuXHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IG5ld01vZHVsZUZhY3Rvcnk7XG5cdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0Lm91dGRhdGVkTW9kdWxlcyk7XG5cdFx0XHRcdGZvciAobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG5cdFx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubyhyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG5cdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQoXG5cdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSxcblx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChkb0Rpc3Bvc2UpIHtcblx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XG5cdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRjdXJyZW50VXBkYXRlID0gdW5kZWZpbmVkO1xuXG5cdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cblx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xuXHRmb3IgKHZhciBqID0gMDsgaiA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGorKykge1xuXHRcdHZhciBvdXRkYXRlZE1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2pdO1xuXHRcdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbb3V0ZGF0ZWRNb2R1bGVJZF07XG5cdFx0aWYgKFxuXHRcdFx0bW9kdWxlICYmXG5cdFx0XHQobW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkIHx8IG1vZHVsZS5ob3QuX21haW4pICYmXG5cdFx0XHQvLyByZW1vdmVkIHNlbGYtYWNjZXB0ZWQgbW9kdWxlcyBzaG91bGQgbm90IGJlIHJlcXVpcmVkXG5cdFx0XHRhcHBsaWVkVXBkYXRlW291dGRhdGVkTW9kdWxlSWRdICE9PSB3YXJuVW5leHBlY3RlZFJlcXVpcmUgJiZcblx0XHRcdC8vIHdoZW4gY2FsbGVkIGludmFsaWRhdGUgc2VsZi1hY2NlcHRpbmcgaXMgbm90IHBvc3NpYmxlXG5cdFx0XHQhbW9kdWxlLmhvdC5fc2VsZkludmFsaWRhdGVkXG5cdFx0KSB7XG5cdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XG5cdFx0XHRcdG1vZHVsZTogb3V0ZGF0ZWRNb2R1bGVJZCxcblx0XHRcdFx0cmVxdWlyZTogbW9kdWxlLmhvdC5fcmVxdWlyZVNlbGYsXG5cdFx0XHRcdGVycm9ySGFuZGxlcjogbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkXG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XG5cblx0cmV0dXJuIHtcblx0XHRkaXNwb3NlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRjdXJyZW50VXBkYXRlUmVtb3ZlZENodW5rcy5mb3JFYWNoKGZ1bmN0aW9uIChjaHVua0lkKSB7XG5cdFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG5cdFx0XHR9KTtcblx0XHRcdGN1cnJlbnRVcGRhdGVSZW1vdmVkQ2h1bmtzID0gdW5kZWZpbmVkO1xuXG5cdFx0XHR2YXIgaWR4O1xuXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG5cdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcblx0XHRcdFx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19yZXF1aXJlX18uY1ttb2R1bGVJZF07XG5cdFx0XHRcdGlmICghbW9kdWxlKSBjb250aW51ZTtcblxuXHRcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG5cdFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuXHRcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xuXHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdFx0ZGlzcG9zZUhhbmRsZXJzW2pdLmNhbGwobnVsbCwgZGF0YSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5obXJEW21vZHVsZUlkXSA9IGRhdGE7XG5cblx0XHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcblx0XHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuXHRcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcblx0XHRcdFx0ZGVsZXRlIF9fd2VicGFja19yZXF1aXJlX18uY1ttb2R1bGVJZF07XG5cblx0XHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxuXHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG5cdFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG5cdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHR2YXIgY2hpbGQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcblx0XHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcblx0XHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuXHRcdFx0XHRcdGlmIChpZHggPj0gMCkge1xuXHRcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cblx0XHRcdHZhciBkZXBlbmRlbmN5O1xuXHRcdFx0Zm9yICh2YXIgb3V0ZGF0ZWRNb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBvdXRkYXRlZE1vZHVsZUlkKSkge1xuXHRcdFx0XHRcdG1vZHVsZSA9IF9fd2VicGFja19yZXF1aXJlX18uY1tvdXRkYXRlZE1vZHVsZUlkXTtcblx0XHRcdFx0XHRpZiAobW9kdWxlKSB7XG5cdFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9XG5cdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW291dGRhdGVkTW9kdWxlSWRdO1xuXHRcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcblx0XHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG5cdFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0YXBwbHk6IGZ1bmN0aW9uIChyZXBvcnRFcnJvcikge1xuXHRcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG5cdFx0XHRmb3IgKHZhciB1cGRhdGVNb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG5cdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm8oYXBwbGllZFVwZGF0ZSwgdXBkYXRlTW9kdWxlSWQpKSB7XG5cdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW3VwZGF0ZU1vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbdXBkYXRlTW9kdWxlSWRdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIHJ1biBuZXcgcnVudGltZSBtb2R1bGVzXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGN1cnJlbnRVcGRhdGVSdW50aW1lLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGN1cnJlbnRVcGRhdGVSdW50aW1lW2ldKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xuXHRcdFx0Zm9yICh2YXIgb3V0ZGF0ZWRNb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBvdXRkYXRlZE1vZHVsZUlkKSkge1xuXHRcdFx0XHRcdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbb3V0ZGF0ZWRNb2R1bGVJZF07XG5cdFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuXHRcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPVxuXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1tvdXRkYXRlZE1vZHVsZUlkXTtcblx0XHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcblx0XHRcdFx0XHRcdHZhciBlcnJvckhhbmRsZXJzID0gW107XG5cdFx0XHRcdFx0XHR2YXIgZGVwZW5kZW5jaWVzRm9yQ2FsbGJhY2tzID0gW107XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG5cdFx0XHRcdFx0XHRcdHZhciBhY2NlcHRDYWxsYmFjayA9XG5cdFx0XHRcdFx0XHRcdFx0bW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG5cdFx0XHRcdFx0XHRcdHZhciBlcnJvckhhbmRsZXIgPVxuXHRcdFx0XHRcdFx0XHRcdG1vZHVsZS5ob3QuX2FjY2VwdGVkRXJyb3JIYW5kbGVyc1tkZXBlbmRlbmN5XTtcblx0XHRcdFx0XHRcdFx0aWYgKGFjY2VwdENhbGxiYWNrKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGFjY2VwdENhbGxiYWNrKSAhPT0gLTEpIGNvbnRpbnVlO1xuXHRcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGFjY2VwdENhbGxiYWNrKTtcblx0XHRcdFx0XHRcdFx0XHRlcnJvckhhbmRsZXJzLnB1c2goZXJyb3JIYW5kbGVyKTtcblx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmNpZXNGb3JDYWxsYmFja3MucHVzaChkZXBlbmRlbmN5KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Zm9yICh2YXIgayA9IDA7IGsgPCBjYWxsYmFja3MubGVuZ3RoOyBrKyspIHtcblx0XHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0XHRjYWxsYmFja3Nba10uY2FsbChudWxsLCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XG5cdFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRcdFx0XHRcdGlmICh0eXBlb2YgZXJyb3JIYW5kbGVyc1trXSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRlcnJvckhhbmRsZXJzW2tdKGVyciwge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBvdXRkYXRlZE1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogZGVwZW5kZW5jaWVzRm9yQ2FsbGJhY2tzW2tdXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBvdXRkYXRlZE1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBkZXBlbmRlbmNpZXNGb3JDYWxsYmFja3Nba10sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmVwb3J0RXJyb3IoZXJyMik7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmVwb3J0RXJyb3IoZXJyKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogb3V0ZGF0ZWRNb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IGRlcGVuZGVuY2llc0ZvckNhbGxiYWNrc1trXSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmVwb3J0RXJyb3IoZXJyKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcblx0XHRcdGZvciAodmFyIG8gPSAwOyBvIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgbysrKSB7XG5cdFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW29dO1xuXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRpdGVtLnJlcXVpcmUobW9kdWxlSWQpO1xuXHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVyciwge1xuXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0XHRtb2R1bGU6IF9fd2VicGFja19yZXF1aXJlX18uY1ttb2R1bGVJZF1cblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcblx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG5cdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcblx0XHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmVwb3J0RXJyb3IoZXJyMik7XG5cdFx0XHRcdFx0XHRcdFx0cmVwb3J0RXJyb3IoZXJyKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxuXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0cmVwb3J0RXJyb3IoZXJyKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG91dGRhdGVkTW9kdWxlcztcblx0XHR9XG5cdH07XG59XG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtckkuanNvbnAgPSBmdW5jdGlvbiAobW9kdWxlSWQsIGFwcGx5SGFuZGxlcnMpIHtcblx0aWYgKCFjdXJyZW50VXBkYXRlKSB7XG5cdFx0Y3VycmVudFVwZGF0ZSA9IHt9O1xuXHRcdGN1cnJlbnRVcGRhdGVSdW50aW1lID0gW107XG5cdFx0Y3VycmVudFVwZGF0ZVJlbW92ZWRDaHVua3MgPSBbXTtcblx0XHRhcHBseUhhbmRsZXJzLnB1c2goYXBwbHlIYW5kbGVyKTtcblx0fVxuXHRpZiAoIV9fd2VicGFja19yZXF1aXJlX18ubyhjdXJyZW50VXBkYXRlLCBtb2R1bGVJZCkpIHtcblx0XHRjdXJyZW50VXBkYXRlW21vZHVsZUlkXSA9IF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF07XG5cdH1cbn07XG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtckMuanNvbnAgPSBmdW5jdGlvbiAoXG5cdGNodW5rSWRzLFxuXHRyZW1vdmVkQ2h1bmtzLFxuXHRyZW1vdmVkTW9kdWxlcyxcblx0cHJvbWlzZXMsXG5cdGFwcGx5SGFuZGxlcnMsXG5cdHVwZGF0ZWRNb2R1bGVzTGlzdFxuKSB7XG5cdGFwcGx5SGFuZGxlcnMucHVzaChhcHBseUhhbmRsZXIpO1xuXHRjdXJyZW50VXBkYXRlQ2h1bmtzID0ge307XG5cdGN1cnJlbnRVcGRhdGVSZW1vdmVkQ2h1bmtzID0gcmVtb3ZlZENodW5rcztcblx0Y3VycmVudFVwZGF0ZSA9IHJlbW92ZWRNb2R1bGVzLnJlZHVjZShmdW5jdGlvbiAob2JqLCBrZXkpIHtcblx0XHRvYmpba2V5XSA9IGZhbHNlO1xuXHRcdHJldHVybiBvYmo7XG5cdH0sIHt9KTtcblx0Y3VycmVudFVwZGF0ZVJ1bnRpbWUgPSBbXTtcblx0Y2h1bmtJZHMuZm9yRWFjaChmdW5jdGlvbiAoY2h1bmtJZCkge1xuXHRcdGlmIChcblx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmXG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gIT09IHVuZGVmaW5lZFxuXHRcdCkge1xuXHRcdFx0cHJvbWlzZXMucHVzaChsb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgdXBkYXRlZE1vZHVsZXNMaXN0KSk7XG5cdFx0XHRjdXJyZW50VXBkYXRlQ2h1bmtzW2NodW5rSWRdID0gdHJ1ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y3VycmVudFVwZGF0ZUNodW5rc1tjaHVua0lkXSA9IGZhbHNlO1xuXHRcdH1cblx0fSk7XG5cdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmYpIHtcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmYuanNvbnBIbXIgPSBmdW5jdGlvbiAoY2h1bmtJZCwgcHJvbWlzZXMpIHtcblx0XHRcdGlmIChcblx0XHRcdFx0Y3VycmVudFVwZGF0ZUNodW5rcyAmJlxuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8oY3VycmVudFVwZGF0ZUNodW5rcywgY2h1bmtJZCkgJiZcblx0XHRcdFx0IWN1cnJlbnRVcGRhdGVDaHVua3NbY2h1bmtJZF1cblx0XHRcdCkge1xuXHRcdFx0XHRwcm9taXNlcy5wdXNoKGxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSk7XG5cdFx0XHRcdGN1cnJlbnRVcGRhdGVDaHVua3NbY2h1bmtJZF0gPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH07XG5cdH1cbn07XG5cbl9fd2VicGFja19yZXF1aXJlX18uaG1yTSA9ICgpID0+IHtcblx0aWYgKHR5cGVvZiBmZXRjaCA9PT0gXCJ1bmRlZmluZWRcIikgdGhyb3cgbmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0OiBuZWVkIGZldGNoIEFQSVwiKTtcblx0cmV0dXJuIGZldGNoKF9fd2VicGFja19yZXF1aXJlX18ucCArIF9fd2VicGFja19yZXF1aXJlX18uaG1yRigpKS50aGVuKChyZXNwb25zZSkgPT4ge1xuXHRcdGlmKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDA0KSByZXR1cm47IC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcblx0XHRpZighcmVzcG9uc2Uub2spIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBmZXRjaCB1cGRhdGUgbWFuaWZlc3QgXCIgKyByZXNwb25zZS5zdGF0dXNUZXh0KTtcblx0XHRyZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuXHR9KTtcbn07XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCIvLyBtb2R1bGUgY2FjaGUgYXJlIHVzZWQgc28gZW50cnkgaW5saW5pbmcgaXMgZGlzYWJsZWRcbi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQzMik7XG4iXSwibmFtZXMiOlsiaW5Qcm9ncmVzcyIsImRhdGFXZWJwYWNrUHJlZml4IiwiX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsIm1vZHVsZUlkIiwiY2FjaGVkTW9kdWxlIiwidW5kZWZpbmVkIiwiZXJyb3IiLCJleHBvcnRzIiwibW9kdWxlIiwiZXhlY09wdGlvbnMiLCJpZCIsImZhY3RvcnkiLCJfX3dlYnBhY2tfbW9kdWxlc19fIiwicmVxdWlyZSIsImkiLCJmb3JFYWNoIiwiaGFuZGxlciIsImNhbGwiLCJlIiwibSIsImMiLCJodSIsImNodW5rSWQiLCJoIiwiaG1yRiIsIm8iLCJvYmoiLCJwcm9wIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJsIiwidXJsIiwiZG9uZSIsImtleSIsInB1c2giLCJzY3JpcHQiLCJuZWVkQXR0YWNoIiwic2NyaXB0cyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJsZW5ndGgiLCJzIiwiZ2V0QXR0cmlidXRlIiwiY3JlYXRlRWxlbWVudCIsImNoYXJzZXQiLCJ0aW1lb3V0IiwibmMiLCJzZXRBdHRyaWJ1dGUiLCJzcmMiLCJvblNjcmlwdENvbXBsZXRlIiwicHJldiIsImV2ZW50Iiwib25lcnJvciIsIm9ubG9hZCIsImNsZWFyVGltZW91dCIsImRvbmVGbnMiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJmbiIsInNldFRpbWVvdXQiLCJiaW5kIiwidHlwZSIsInRhcmdldCIsImhlYWQiLCJhcHBlbmRDaGlsZCIsImN1cnJlbnRDaGlsZE1vZHVsZSIsImN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzIiwicXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzIiwiY3VycmVudE1vZHVsZURhdGEiLCJpbnN0YWxsZWRNb2R1bGVzIiwiY3VycmVudFBhcmVudHMiLCJyZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnMiLCJjdXJyZW50U3RhdHVzIiwiYmxvY2tpbmdQcm9taXNlcyIsImJsb2NraW5nUHJvbWlzZXNXYWl0aW5nIiwic2V0U3RhdHVzIiwibmV3U3RhdHVzIiwicmVzdWx0cyIsIlByb21pc2UiLCJhbGwiLCJ1bmJsb2NrIiwidGhlbiIsImxpc3QiLCJob3RDaGVjayIsImFwcGx5T25VcGRhdGUiLCJFcnJvciIsImhtck0iLCJ1cGRhdGUiLCJ1cGRhdGVkTW9kdWxlcyIsImtleXMiLCJobXJDIiwicmVkdWNlIiwicHJvbWlzZXMiLCJyIiwiaW50ZXJuYWxBcHBseSIsInJlc29sdmUiLCJhcHBseUludmFsaWRhdGVkTW9kdWxlcyIsImhvdEFwcGx5Iiwib3B0aW9ucyIsIm1hcCIsImVycm9ycyIsImZpbHRlciIsIkJvb2xlYW4iLCJkaXNwb3NlUHJvbWlzZSIsInJlc3VsdCIsImRpc3Bvc2UiLCJhcHBseVByb21pc2UiLCJyZXBvcnRFcnJvciIsImVyciIsIm91dGRhdGVkTW9kdWxlcyIsImFwcGx5IiwibW9kdWxlcyIsImluZGV4T2YiLCJobXJJIiwiaG1yRCIsIm1lIiwiX21haW4iLCJob3QiLCJyZXF1ZXN0IiwiYWN0aXZlIiwicGFyZW50cyIsImNoaWxkcmVuIiwiY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yIiwibmFtZSIsImNvbmZpZ3VyYWJsZSIsImVudW1lcmFibGUiLCJnZXQiLCJzZXQiLCJ2YWx1ZSIsImRlZmluZVByb3BlcnR5IiwicHJvbWlzZSIsInRyYWNrQmxvY2tpbmdQcm9taXNlIiwiY3JlYXRlUmVxdWlyZSIsIl9hY2NlcHRlZERlcGVuZGVuY2llcyIsIl9hY2NlcHRlZEVycm9ySGFuZGxlcnMiLCJfZGVjbGluZWREZXBlbmRlbmNpZXMiLCJfc2VsZkFjY2VwdGVkIiwiX3NlbGZEZWNsaW5lZCIsIl9zZWxmSW52YWxpZGF0ZWQiLCJfZGlzcG9zZUhhbmRsZXJzIiwiX3JlcXVpcmVTZWxmIiwic2xpY2UiLCJhY2NlcHQiLCJkZXAiLCJjYWxsYmFjayIsImVycm9ySGFuZGxlciIsImRlY2xpbmUiLCJhZGREaXNwb3NlSGFuZGxlciIsInJlbW92ZURpc3Bvc2VIYW5kbGVyIiwiaWR4Iiwic3BsaWNlIiwiaW52YWxpZGF0ZSIsInRoaXMiLCJjaGVjayIsInN0YXR1cyIsImFkZFN0YXR1c0hhbmRsZXIiLCJyZW1vdmVTdGF0dXNIYW5kbGVyIiwiZGF0YSIsInAiLCJjdXJyZW50VXBkYXRlZE1vZHVsZXNMaXN0IiwiY3VycmVudFVwZGF0ZUNodW5rcyIsImN1cnJlbnRVcGRhdGUiLCJjdXJyZW50VXBkYXRlUmVtb3ZlZENodW5rcyIsImN1cnJlbnRVcGRhdGVSdW50aW1lIiwiaW5zdGFsbGVkQ2h1bmtzIiwiaG1yU19qc29ucCIsIndhaXRpbmdVcGRhdGVSZXNvbHZlcyIsImxvYWRVcGRhdGVDaHVuayIsInVwZGF0ZWRNb2R1bGVzTGlzdCIsInJlamVjdCIsImVycm9yVHlwZSIsInJlYWxTcmMiLCJtZXNzYWdlIiwiYXBwbHlIYW5kbGVyIiwiZ2V0QWZmZWN0ZWRNb2R1bGVFZmZlY3RzIiwidXBkYXRlTW9kdWxlSWQiLCJvdXRkYXRlZERlcGVuZGVuY2llcyIsInF1ZXVlIiwiY2hhaW4iLCJxdWV1ZUl0ZW0iLCJwb3AiLCJwYXJlbnRJZCIsInBhcmVudCIsImNvbmNhdCIsImFkZEFsbFRvU2V0IiwiYSIsImIiLCJpdGVtIiwiZiIsImpzb25wSG1yIiwiYXBwbGllZFVwZGF0ZSIsIndhcm5VbmV4cGVjdGVkUmVxdWlyZSIsIm5ld01vZHVsZUZhY3RvcnkiLCJhYm9ydEVycm9yIiwiZG9BcHBseSIsImRvRGlzcG9zZSIsImNoYWluSW5mbyIsImpvaW4iLCJvbkRlY2xpbmVkIiwiaWdub3JlRGVjbGluZWQiLCJvblVuYWNjZXB0ZWQiLCJpZ25vcmVVbmFjY2VwdGVkIiwib25BY2NlcHRlZCIsIm9uRGlzcG9zZWQiLCJtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyIsIm91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyIsImoiLCJvdXRkYXRlZE1vZHVsZUlkIiwiZGVwZW5kZW5jeSIsImRpc3Bvc2VIYW5kbGVycyIsImNoaWxkIiwiY2FsbGJhY2tzIiwiZXJyb3JIYW5kbGVycyIsImRlcGVuZGVuY2llc0ZvckNhbGxiYWNrcyIsImFjY2VwdENhbGxiYWNrIiwiayIsImRlcGVuZGVuY3lJZCIsImVycjIiLCJvbkVycm9yZWQiLCJvcmlnaW5hbEVycm9yIiwiaWdub3JlRXJyb3JlZCIsInNlbGYiLCJtb3JlTW9kdWxlcyIsInJ1bnRpbWUiLCJqc29ucCIsImFwcGx5SGFuZGxlcnMiLCJjaHVua0lkcyIsInJlbW92ZWRDaHVua3MiLCJyZW1vdmVkTW9kdWxlcyIsImZldGNoIiwicmVzcG9uc2UiLCJvayIsInN0YXR1c1RleHQiLCJqc29uIl0sInNvdXJjZVJvb3QiOiIifQ==