(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const d of c.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function i(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(l){if(l.ep)return;l.ep=!0;const c=i(l);fetch(l.href,c)}})();function eM(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var dd={exports:{}},Ho={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var kg;function tM(){if(kg)return Ho;kg=1;var s=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function i(r,l,c){var d=null;if(c!==void 0&&(d=""+c),l.key!==void 0&&(d=""+l.key),"key"in l){c={};for(var p in l)p!=="key"&&(c[p]=l[p])}else c=l;return l=c.ref,{$$typeof:s,type:r,key:d,ref:l!==void 0?l:null,props:c}}return Ho.Fragment=e,Ho.jsx=i,Ho.jsxs=i,Ho}var Xg;function nM(){return Xg||(Xg=1,dd.exports=tM()),dd.exports}var Ke=nM(),hd={exports:{}},rt={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Wg;function iM(){if(Wg)return rt;Wg=1;var s=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),d=Symbol.for("react.context"),p=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),h=Symbol.for("react.memo"),_=Symbol.for("react.lazy"),v=Symbol.for("react.activity"),g=Symbol.iterator;function y(I){return I===null||typeof I!="object"?null:(I=g&&I[g]||I["@@iterator"],typeof I=="function"?I:null)}var b={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},w=Object.assign,M={};function S(I,Q,ye){this.props=I,this.context=Q,this.refs=M,this.updater=ye||b}S.prototype.isReactComponent={},S.prototype.setState=function(I,Q){if(typeof I!="object"&&typeof I!="function"&&I!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,I,Q,"setState")},S.prototype.forceUpdate=function(I){this.updater.enqueueForceUpdate(this,I,"forceUpdate")};function D(){}D.prototype=S.prototype;function P(I,Q,ye){this.props=I,this.context=Q,this.refs=M,this.updater=ye||b}var C=P.prototype=new D;C.constructor=P,w(C,S.prototype),C.isPureReactComponent=!0;var z=Array.isArray;function N(){}var L={H:null,A:null,T:null,S:null},T=Object.prototype.hasOwnProperty;function U(I,Q,ye){var Re=ye.ref;return{$$typeof:s,type:I,key:Q,ref:Re!==void 0?Re:null,props:ye}}function k(I,Q){return U(I.type,Q,I.props)}function F(I){return typeof I=="object"&&I!==null&&I.$$typeof===s}function W(I){var Q={"=":"=0",":":"=2"};return"$"+I.replace(/[=:]/g,function(ye){return Q[ye]})}var ce=/\/+/g;function me(I,Q){return typeof I=="object"&&I!==null&&I.key!=null?W(""+I.key):Q.toString(36)}function j(I){switch(I.status){case"fulfilled":return I.value;case"rejected":throw I.reason;default:switch(typeof I.status=="string"?I.then(N,N):(I.status="pending",I.then(function(Q){I.status==="pending"&&(I.status="fulfilled",I.value=Q)},function(Q){I.status==="pending"&&(I.status="rejected",I.reason=Q)})),I.status){case"fulfilled":return I.value;case"rejected":throw I.reason}}throw I}function B(I,Q,ye,Re,Pe){var ae=typeof I;(ae==="undefined"||ae==="boolean")&&(I=null);var xe=!1;if(I===null)xe=!0;else switch(ae){case"bigint":case"string":case"number":xe=!0;break;case"object":switch(I.$$typeof){case s:case e:xe=!0;break;case _:return xe=I._init,B(xe(I._payload),Q,ye,Re,Pe)}}if(xe)return Pe=Pe(I),xe=Re===""?"."+me(I,0):Re,z(Pe)?(ye="",xe!=null&&(ye=xe.replace(ce,"$&/")+"/"),B(Pe,Q,ye,"",function(it){return it})):Pe!=null&&(F(Pe)&&(Pe=k(Pe,ye+(Pe.key==null||I&&I.key===Pe.key?"":(""+Pe.key).replace(ce,"$&/")+"/")+xe)),Q.push(Pe)),1;xe=0;var Me=Re===""?".":Re+":";if(z(I))for(var Fe=0;Fe<I.length;Fe++)Re=I[Fe],ae=Me+me(Re,Fe),xe+=B(Re,Q,ye,ae,Pe);else if(Fe=y(I),typeof Fe=="function")for(I=Fe.call(I),Fe=0;!(Re=I.next()).done;)Re=Re.value,ae=Me+me(Re,Fe++),xe+=B(Re,Q,ye,ae,Pe);else if(ae==="object"){if(typeof I.then=="function")return B(j(I),Q,ye,Re,Pe);throw Q=String(I),Error("Objects are not valid as a React child (found: "+(Q==="[object Object]"?"object with keys {"+Object.keys(I).join(", ")+"}":Q)+"). If you meant to render a collection of children, use an array instead.")}return xe}function G(I,Q,ye){if(I==null)return I;var Re=[],Pe=0;return B(I,Re,"","",function(ae){return Q.call(ye,ae,Pe++)}),Re}function te(I){if(I._status===-1){var Q=I._result;Q=Q(),Q.then(function(ye){(I._status===0||I._status===-1)&&(I._status=1,I._result=ye)},function(ye){(I._status===0||I._status===-1)&&(I._status=2,I._result=ye)}),I._status===-1&&(I._status=0,I._result=Q)}if(I._status===1)return I._result.default;throw I._result}var ge=typeof reportError=="function"?reportError:function(I){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var Q=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof I=="object"&&I!==null&&typeof I.message=="string"?String(I.message):String(I),error:I});if(!window.dispatchEvent(Q))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",I);return}console.error(I)},Ee={map:G,forEach:function(I,Q,ye){G(I,function(){Q.apply(this,arguments)},ye)},count:function(I){var Q=0;return G(I,function(){Q++}),Q},toArray:function(I){return G(I,function(Q){return Q})||[]},only:function(I){if(!F(I))throw Error("React.Children.only expected to receive a single React element child.");return I}};return rt.Activity=v,rt.Children=Ee,rt.Component=S,rt.Fragment=i,rt.Profiler=l,rt.PureComponent=P,rt.StrictMode=r,rt.Suspense=m,rt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=L,rt.__COMPILER_RUNTIME={__proto__:null,c:function(I){return L.H.useMemoCache(I)}},rt.cache=function(I){return function(){return I.apply(null,arguments)}},rt.cacheSignal=function(){return null},rt.cloneElement=function(I,Q,ye){if(I==null)throw Error("The argument must be a React element, but you passed "+I+".");var Re=w({},I.props),Pe=I.key;if(Q!=null)for(ae in Q.key!==void 0&&(Pe=""+Q.key),Q)!T.call(Q,ae)||ae==="key"||ae==="__self"||ae==="__source"||ae==="ref"&&Q.ref===void 0||(Re[ae]=Q[ae]);var ae=arguments.length-2;if(ae===1)Re.children=ye;else if(1<ae){for(var xe=Array(ae),Me=0;Me<ae;Me++)xe[Me]=arguments[Me+2];Re.children=xe}return U(I.type,Pe,Re)},rt.createContext=function(I){return I={$$typeof:d,_currentValue:I,_currentValue2:I,_threadCount:0,Provider:null,Consumer:null},I.Provider=I,I.Consumer={$$typeof:c,_context:I},I},rt.createElement=function(I,Q,ye){var Re,Pe={},ae=null;if(Q!=null)for(Re in Q.key!==void 0&&(ae=""+Q.key),Q)T.call(Q,Re)&&Re!=="key"&&Re!=="__self"&&Re!=="__source"&&(Pe[Re]=Q[Re]);var xe=arguments.length-2;if(xe===1)Pe.children=ye;else if(1<xe){for(var Me=Array(xe),Fe=0;Fe<xe;Fe++)Me[Fe]=arguments[Fe+2];Pe.children=Me}if(I&&I.defaultProps)for(Re in xe=I.defaultProps,xe)Pe[Re]===void 0&&(Pe[Re]=xe[Re]);return U(I,ae,Pe)},rt.createRef=function(){return{current:null}},rt.forwardRef=function(I){return{$$typeof:p,render:I}},rt.isValidElement=F,rt.lazy=function(I){return{$$typeof:_,_payload:{_status:-1,_result:I},_init:te}},rt.memo=function(I,Q){return{$$typeof:h,type:I,compare:Q===void 0?null:Q}},rt.startTransition=function(I){var Q=L.T,ye={};L.T=ye;try{var Re=I(),Pe=L.S;Pe!==null&&Pe(ye,Re),typeof Re=="object"&&Re!==null&&typeof Re.then=="function"&&Re.then(N,ge)}catch(ae){ge(ae)}finally{Q!==null&&ye.types!==null&&(Q.types=ye.types),L.T=Q}},rt.unstable_useCacheRefresh=function(){return L.H.useCacheRefresh()},rt.use=function(I){return L.H.use(I)},rt.useActionState=function(I,Q,ye){return L.H.useActionState(I,Q,ye)},rt.useCallback=function(I,Q){return L.H.useCallback(I,Q)},rt.useContext=function(I){return L.H.useContext(I)},rt.useDebugValue=function(){},rt.useDeferredValue=function(I,Q){return L.H.useDeferredValue(I,Q)},rt.useEffect=function(I,Q){return L.H.useEffect(I,Q)},rt.useEffectEvent=function(I){return L.H.useEffectEvent(I)},rt.useId=function(){return L.H.useId()},rt.useImperativeHandle=function(I,Q,ye){return L.H.useImperativeHandle(I,Q,ye)},rt.useInsertionEffect=function(I,Q){return L.H.useInsertionEffect(I,Q)},rt.useLayoutEffect=function(I,Q){return L.H.useLayoutEffect(I,Q)},rt.useMemo=function(I,Q){return L.H.useMemo(I,Q)},rt.useOptimistic=function(I,Q){return L.H.useOptimistic(I,Q)},rt.useReducer=function(I,Q,ye){return L.H.useReducer(I,Q,ye)},rt.useRef=function(I){return L.H.useRef(I)},rt.useState=function(I){return L.H.useState(I)},rt.useSyncExternalStore=function(I,Q,ye){return L.H.useSyncExternalStore(I,Q,ye)},rt.useTransition=function(){return L.H.useTransition()},rt.version="19.2.0",rt}var qg;function Xh(){return qg||(qg=1,hd.exports=iM()),hd.exports}var nt=Xh();const aM=eM(nt);var pd={exports:{}},Go={},md={exports:{}},gd={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Yg;function rM(){return Yg||(Yg=1,(function(s){function e(B,G){var te=B.length;B.push(G);e:for(;0<te;){var ge=te-1>>>1,Ee=B[ge];if(0<l(Ee,G))B[ge]=G,B[te]=Ee,te=ge;else break e}}function i(B){return B.length===0?null:B[0]}function r(B){if(B.length===0)return null;var G=B[0],te=B.pop();if(te!==G){B[0]=te;e:for(var ge=0,Ee=B.length,I=Ee>>>1;ge<I;){var Q=2*(ge+1)-1,ye=B[Q],Re=Q+1,Pe=B[Re];if(0>l(ye,te))Re<Ee&&0>l(Pe,ye)?(B[ge]=Pe,B[Re]=te,ge=Re):(B[ge]=ye,B[Q]=te,ge=Q);else if(Re<Ee&&0>l(Pe,te))B[ge]=Pe,B[Re]=te,ge=Re;else break e}}return G}function l(B,G){var te=B.sortIndex-G.sortIndex;return te!==0?te:B.id-G.id}if(s.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;s.unstable_now=function(){return c.now()}}else{var d=Date,p=d.now();s.unstable_now=function(){return d.now()-p}}var m=[],h=[],_=1,v=null,g=3,y=!1,b=!1,w=!1,M=!1,S=typeof setTimeout=="function"?setTimeout:null,D=typeof clearTimeout=="function"?clearTimeout:null,P=typeof setImmediate<"u"?setImmediate:null;function C(B){for(var G=i(h);G!==null;){if(G.callback===null)r(h);else if(G.startTime<=B)r(h),G.sortIndex=G.expirationTime,e(m,G);else break;G=i(h)}}function z(B){if(w=!1,C(B),!b)if(i(m)!==null)b=!0,N||(N=!0,W());else{var G=i(h);G!==null&&j(z,G.startTime-B)}}var N=!1,L=-1,T=5,U=-1;function k(){return M?!0:!(s.unstable_now()-U<T)}function F(){if(M=!1,N){var B=s.unstable_now();U=B;var G=!0;try{e:{b=!1,w&&(w=!1,D(L),L=-1),y=!0;var te=g;try{t:{for(C(B),v=i(m);v!==null&&!(v.expirationTime>B&&k());){var ge=v.callback;if(typeof ge=="function"){v.callback=null,g=v.priorityLevel;var Ee=ge(v.expirationTime<=B);if(B=s.unstable_now(),typeof Ee=="function"){v.callback=Ee,C(B),G=!0;break t}v===i(m)&&r(m),C(B)}else r(m);v=i(m)}if(v!==null)G=!0;else{var I=i(h);I!==null&&j(z,I.startTime-B),G=!1}}break e}finally{v=null,g=te,y=!1}G=void 0}}finally{G?W():N=!1}}}var W;if(typeof P=="function")W=function(){P(F)};else if(typeof MessageChannel<"u"){var ce=new MessageChannel,me=ce.port2;ce.port1.onmessage=F,W=function(){me.postMessage(null)}}else W=function(){S(F,0)};function j(B,G){L=S(function(){B(s.unstable_now())},G)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(B){B.callback=null},s.unstable_forceFrameRate=function(B){0>B||125<B?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):T=0<B?Math.floor(1e3/B):5},s.unstable_getCurrentPriorityLevel=function(){return g},s.unstable_next=function(B){switch(g){case 1:case 2:case 3:var G=3;break;default:G=g}var te=g;g=G;try{return B()}finally{g=te}},s.unstable_requestPaint=function(){M=!0},s.unstable_runWithPriority=function(B,G){switch(B){case 1:case 2:case 3:case 4:case 5:break;default:B=3}var te=g;g=B;try{return G()}finally{g=te}},s.unstable_scheduleCallback=function(B,G,te){var ge=s.unstable_now();switch(typeof te=="object"&&te!==null?(te=te.delay,te=typeof te=="number"&&0<te?ge+te:ge):te=ge,B){case 1:var Ee=-1;break;case 2:Ee=250;break;case 5:Ee=1073741823;break;case 4:Ee=1e4;break;default:Ee=5e3}return Ee=te+Ee,B={id:_++,callback:G,priorityLevel:B,startTime:te,expirationTime:Ee,sortIndex:-1},te>ge?(B.sortIndex=te,e(h,B),i(m)===null&&B===i(h)&&(w?(D(L),L=-1):w=!0,j(z,te-ge))):(B.sortIndex=Ee,e(m,B),b||y||(b=!0,N||(N=!0,W()))),B},s.unstable_shouldYield=k,s.unstable_wrapCallback=function(B){var G=g;return function(){var te=g;g=G;try{return B.apply(this,arguments)}finally{g=te}}}})(gd)),gd}var Zg;function sM(){return Zg||(Zg=1,md.exports=rM()),md.exports}var _d={exports:{}},In={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Kg;function oM(){if(Kg)return In;Kg=1;var s=Xh();function e(m){var h="https://react.dev/errors/"+m;if(1<arguments.length){h+="?args[]="+encodeURIComponent(arguments[1]);for(var _=2;_<arguments.length;_++)h+="&args[]="+encodeURIComponent(arguments[_])}return"Minified React error #"+m+"; visit "+h+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var r={d:{f:i,r:function(){throw Error(e(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(m,h,_){var v=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:v==null?null:""+v,children:m,containerInfo:h,implementation:_}}var d=s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function p(m,h){if(m==="font")return"";if(typeof h=="string")return h==="use-credentials"?h:""}return In.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=r,In.createPortal=function(m,h){var _=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!h||h.nodeType!==1&&h.nodeType!==9&&h.nodeType!==11)throw Error(e(299));return c(m,h,null,_)},In.flushSync=function(m){var h=d.T,_=r.p;try{if(d.T=null,r.p=2,m)return m()}finally{d.T=h,r.p=_,r.d.f()}},In.preconnect=function(m,h){typeof m=="string"&&(h?(h=h.crossOrigin,h=typeof h=="string"?h==="use-credentials"?h:"":void 0):h=null,r.d.C(m,h))},In.prefetchDNS=function(m){typeof m=="string"&&r.d.D(m)},In.preinit=function(m,h){if(typeof m=="string"&&h&&typeof h.as=="string"){var _=h.as,v=p(_,h.crossOrigin),g=typeof h.integrity=="string"?h.integrity:void 0,y=typeof h.fetchPriority=="string"?h.fetchPriority:void 0;_==="style"?r.d.S(m,typeof h.precedence=="string"?h.precedence:void 0,{crossOrigin:v,integrity:g,fetchPriority:y}):_==="script"&&r.d.X(m,{crossOrigin:v,integrity:g,fetchPriority:y,nonce:typeof h.nonce=="string"?h.nonce:void 0})}},In.preinitModule=function(m,h){if(typeof m=="string")if(typeof h=="object"&&h!==null){if(h.as==null||h.as==="script"){var _=p(h.as,h.crossOrigin);r.d.M(m,{crossOrigin:_,integrity:typeof h.integrity=="string"?h.integrity:void 0,nonce:typeof h.nonce=="string"?h.nonce:void 0})}}else h==null&&r.d.M(m)},In.preload=function(m,h){if(typeof m=="string"&&typeof h=="object"&&h!==null&&typeof h.as=="string"){var _=h.as,v=p(_,h.crossOrigin);r.d.L(m,_,{crossOrigin:v,integrity:typeof h.integrity=="string"?h.integrity:void 0,nonce:typeof h.nonce=="string"?h.nonce:void 0,type:typeof h.type=="string"?h.type:void 0,fetchPriority:typeof h.fetchPriority=="string"?h.fetchPriority:void 0,referrerPolicy:typeof h.referrerPolicy=="string"?h.referrerPolicy:void 0,imageSrcSet:typeof h.imageSrcSet=="string"?h.imageSrcSet:void 0,imageSizes:typeof h.imageSizes=="string"?h.imageSizes:void 0,media:typeof h.media=="string"?h.media:void 0})}},In.preloadModule=function(m,h){if(typeof m=="string")if(h){var _=p(h.as,h.crossOrigin);r.d.m(m,{as:typeof h.as=="string"&&h.as!=="script"?h.as:void 0,crossOrigin:_,integrity:typeof h.integrity=="string"?h.integrity:void 0})}else r.d.m(m)},In.requestFormReset=function(m){r.d.r(m)},In.unstable_batchedUpdates=function(m,h){return m(h)},In.useFormState=function(m,h,_){return d.H.useFormState(m,h,_)},In.useFormStatus=function(){return d.H.useHostTransitionStatus()},In.version="19.2.0",In}var Qg;function lM(){if(Qg)return _d.exports;Qg=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(e){console.error(e)}}return s(),_d.exports=oM(),_d.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Jg;function cM(){if(Jg)return Go;Jg=1;var s=sM(),e=Xh(),i=lM();function r(t){var n="https://react.dev/errors/"+t;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function c(t){var n=t,a=t;if(t.alternate)for(;n.return;)n=n.return;else{t=n;do n=t,(n.flags&4098)!==0&&(a=n.return),t=n.return;while(t)}return n.tag===3?a:null}function d(t){if(t.tag===13){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function p(t){if(t.tag===31){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function m(t){if(c(t)!==t)throw Error(r(188))}function h(t){var n=t.alternate;if(!n){if(n=c(t),n===null)throw Error(r(188));return n!==t?null:t}for(var a=t,o=n;;){var u=a.return;if(u===null)break;var f=u.alternate;if(f===null){if(o=u.return,o!==null){a=o;continue}break}if(u.child===f.child){for(f=u.child;f;){if(f===a)return m(u),t;if(f===o)return m(u),n;f=f.sibling}throw Error(r(188))}if(a.return!==o.return)a=u,o=f;else{for(var x=!1,R=u.child;R;){if(R===a){x=!0,a=u,o=f;break}if(R===o){x=!0,o=u,a=f;break}R=R.sibling}if(!x){for(R=f.child;R;){if(R===a){x=!0,a=f,o=u;break}if(R===o){x=!0,o=f,a=u;break}R=R.sibling}if(!x)throw Error(r(189))}}if(a.alternate!==o)throw Error(r(190))}if(a.tag!==3)throw Error(r(188));return a.stateNode.current===a?t:n}function _(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t;for(t=t.child;t!==null;){if(n=_(t),n!==null)return n;t=t.sibling}return null}var v=Object.assign,g=Symbol.for("react.element"),y=Symbol.for("react.transitional.element"),b=Symbol.for("react.portal"),w=Symbol.for("react.fragment"),M=Symbol.for("react.strict_mode"),S=Symbol.for("react.profiler"),D=Symbol.for("react.consumer"),P=Symbol.for("react.context"),C=Symbol.for("react.forward_ref"),z=Symbol.for("react.suspense"),N=Symbol.for("react.suspense_list"),L=Symbol.for("react.memo"),T=Symbol.for("react.lazy"),U=Symbol.for("react.activity"),k=Symbol.for("react.memo_cache_sentinel"),F=Symbol.iterator;function W(t){return t===null||typeof t!="object"?null:(t=F&&t[F]||t["@@iterator"],typeof t=="function"?t:null)}var ce=Symbol.for("react.client.reference");function me(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===ce?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case w:return"Fragment";case S:return"Profiler";case M:return"StrictMode";case z:return"Suspense";case N:return"SuspenseList";case U:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case b:return"Portal";case P:return t.displayName||"Context";case D:return(t._context.displayName||"Context")+".Consumer";case C:var n=t.render;return t=t.displayName,t||(t=n.displayName||n.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case L:return n=t.displayName||null,n!==null?n:me(t.type)||"Memo";case T:n=t._payload,t=t._init;try{return me(t(n))}catch{}}return null}var j=Array.isArray,B=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,G=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,te={pending:!1,data:null,method:null,action:null},ge=[],Ee=-1;function I(t){return{current:t}}function Q(t){0>Ee||(t.current=ge[Ee],ge[Ee]=null,Ee--)}function ye(t,n){Ee++,ge[Ee]=t.current,t.current=n}var Re=I(null),Pe=I(null),ae=I(null),xe=I(null);function Me(t,n){switch(ye(ae,n),ye(Pe,t),ye(Re,null),n.nodeType){case 9:case 11:t=(t=n.documentElement)&&(t=t.namespaceURI)?dg(t):0;break;default:if(t=n.tagName,n=n.namespaceURI)n=dg(n),t=hg(n,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}Q(Re),ye(Re,t)}function Fe(){Q(Re),Q(Pe),Q(ae)}function it(t){t.memoizedState!==null&&ye(xe,t);var n=Re.current,a=hg(n,t.type);n!==a&&(ye(Pe,t),ye(Re,a))}function Qe(t){Pe.current===t&&(Q(Re),Q(Pe)),xe.current===t&&(Q(xe),Io._currentValue=te)}var Yt,ft;function xt(t){if(Yt===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);Yt=n&&n[1]||"",ft=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Yt+t+ft}var St=!1;function dt(t,n){if(!t||St)return"";St=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(n){var ve=function(){throw Error()};if(Object.defineProperty(ve.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(ve,[])}catch(le){var oe=le}Reflect.construct(t,[],ve)}else{try{ve.call()}catch(le){oe=le}t.call(ve.prototype)}}else{try{throw Error()}catch(le){oe=le}(ve=t())&&typeof ve.catch=="function"&&ve.catch(function(){})}}catch(le){if(le&&oe&&typeof le.stack=="string")return[le.stack,oe.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var f=o.DetermineComponentFrameRoot(),x=f[0],R=f[1];if(x&&R){var H=x.split(`
`),ee=R.split(`
`);for(u=o=0;o<H.length&&!H[o].includes("DetermineComponentFrameRoot");)o++;for(;u<ee.length&&!ee[u].includes("DetermineComponentFrameRoot");)u++;if(o===H.length||u===ee.length)for(o=H.length-1,u=ee.length-1;1<=o&&0<=u&&H[o]!==ee[u];)u--;for(;1<=o&&0<=u;o--,u--)if(H[o]!==ee[u]){if(o!==1||u!==1)do if(o--,u--,0>u||H[o]!==ee[u]){var he=`
`+H[o].replace(" at new "," at ");return t.displayName&&he.includes("<anonymous>")&&(he=he.replace("<anonymous>",t.displayName)),he}while(1<=o&&0<=u);break}}}finally{St=!1,Error.prepareStackTrace=a}return(a=t?t.displayName||t.name:"")?xt(a):""}function tn(t,n){switch(t.tag){case 26:case 27:case 5:return xt(t.type);case 16:return xt("Lazy");case 13:return t.child!==n&&n!==null?xt("Suspense Fallback"):xt("Suspense");case 19:return xt("SuspenseList");case 0:case 15:return dt(t.type,!1);case 11:return dt(t.type.render,!1);case 1:return dt(t.type,!0);case 31:return xt("Activity");default:return""}}function nn(t){try{var n="",a=null;do n+=tn(t,a),a=t,t=t.return;while(t);return n}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var an=Object.prototype.hasOwnProperty,cn=s.unstable_scheduleCallback,Wt=s.unstable_cancelCallback,rn=s.unstable_shouldYield,Y=s.unstable_requestPaint,Ft=s.unstable_now,wt=s.unstable_getCurrentPriorityLevel,O=s.unstable_ImmediatePriority,E=s.unstable_UserBlockingPriority,J=s.unstable_NormalPriority,re=s.unstable_LowPriority,fe=s.unstable_IdlePriority,be=s.log,we=s.unstable_setDisableYieldValue,ue=null,de=null;function Ae(t){if(typeof be=="function"&&we(t),de&&typeof de.setStrictMode=="function")try{de.setStrictMode(ue,t)}catch{}}var ze=Math.clz32?Math.clz32:Ze,Ne=Math.log,De=Math.LN2;function Ze(t){return t>>>=0,t===0?32:31-(Ne(t)/De|0)|0}var Je=256,at=262144,X=4194304;function Te(t){var n=t&42;if(n!==0)return n;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function pe(t,n,a){var o=t.pendingLanes;if(o===0)return 0;var u=0,f=t.suspendedLanes,x=t.pingedLanes;t=t.warmLanes;var R=o&134217727;return R!==0?(o=R&~f,o!==0?u=Te(o):(x&=R,x!==0?u=Te(x):a||(a=R&~t,a!==0&&(u=Te(a))))):(R=o&~f,R!==0?u=Te(R):x!==0?u=Te(x):a||(a=o&~t,a!==0&&(u=Te(a)))),u===0?0:n!==0&&n!==u&&(n&f)===0&&(f=u&-u,a=n&-n,f>=a||f===32&&(a&4194048)!==0)?n:u}function Ce(t,n){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&n)===0}function Ie(t,n){switch(t){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Se(){var t=X;return X<<=1,(X&62914560)===0&&(X=4194304),t}function We(t){for(var n=[],a=0;31>a;a++)n.push(t);return n}function Ge(t,n){t.pendingLanes|=n,n!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function Jt(t,n,a,o,u,f){var x=t.pendingLanes;t.pendingLanes=a,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=a,t.entangledLanes&=a,t.errorRecoveryDisabledLanes&=a,t.shellSuspendCounter=0;var R=t.entanglements,H=t.expirationTimes,ee=t.hiddenUpdates;for(a=x&~a;0<a;){var he=31-ze(a),ve=1<<he;R[he]=0,H[he]=-1;var oe=ee[he];if(oe!==null)for(ee[he]=null,he=0;he<oe.length;he++){var le=oe[he];le!==null&&(le.lane&=-536870913)}a&=~ve}o!==0&&Nt(t,o,0),f!==0&&u===0&&t.tag!==0&&(t.suspendedLanes|=f&~(x&~n))}function Nt(t,n,a){t.pendingLanes|=n,t.suspendedLanes&=~n;var o=31-ze(n);t.entangledLanes|=n,t.entanglements[o]=t.entanglements[o]|1073741824|a&261930}function ei(t,n){var a=t.entangledLanes|=n;for(t=t.entanglements;a;){var o=31-ze(a),u=1<<o;u&n|t[o]&n&&(t[o]|=n),a&=~u}}function ti(t,n){var a=n&-n;return a=(a&42)!==0?1:Ks(a),(a&(t.suspendedLanes|n))!==0?0:a}function Ks(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function Qs(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function Js(){var t=G.p;return t!==0?t:(t=window.event,t===void 0?32:Ig(t.type))}function kr(t,n){var a=G.p;try{return G.p=t,n()}finally{G.p=a}}var Ii=Math.random().toString(36).slice(2),pn="__reactFiber$"+Ii,Cn="__reactProps$"+Ii,Wn="__reactContainer$"+Ii,cr="__reactEvents$"+Ii,il="__reactListeners$"+Ii,al="__reactHandles$"+Ii,ur="__reactResources$"+Ii,Ra="__reactMarker$"+Ii;function Ca(t){delete t[pn],delete t[Cn],delete t[cr],delete t[il],delete t[al]}function ji(t){var n=t[pn];if(n)return n;for(var a=t.parentNode;a;){if(n=a[Wn]||a[pn]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(t=Sg(t);t!==null;){if(a=t[pn])return a;t=Sg(t)}return n}t=a,a=t.parentNode}return null}function $i(t){if(t=t[pn]||t[Wn]){var n=t.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return t}return null}function fr(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t.stateNode;throw Error(r(33))}function wa(t){var n=t[ur];return n||(n=t[ur]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function mn(t){t[Ra]=!0}var rl=new Set,A={};function q(t,n){se(t,n),se(t+"Capture",n)}function se(t,n){for(A[t]=n,t=0;t<n.length;t++)rl.add(n[t])}var ne=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),ie={},Le={};function He(t){return an.call(Le,t)?!0:an.call(ie,t)?!1:ne.test(t)?Le[t]=!0:(ie[t]=!0,!1)}function Ue(t,n,a){if(He(n))if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":t.removeAttribute(n);return;case"boolean":var o=n.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){t.removeAttribute(n);return}}t.setAttribute(n,""+a)}}function ke(t,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttribute(n,""+a)}}function Ve(t,n,a,o){if(o===null)t.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(a);return}t.setAttributeNS(n,a,""+o)}}function je(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function ot(t){var n=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function Ye(t,n,a){var o=Object.getOwnPropertyDescriptor(t.constructor.prototype,n);if(!t.hasOwnProperty(n)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var u=o.get,f=o.set;return Object.defineProperty(t,n,{configurable:!0,get:function(){return u.call(this)},set:function(x){a=""+x,f.call(this,x)}}),Object.defineProperty(t,n,{enumerable:o.enumerable}),{getValue:function(){return a},setValue:function(x){a=""+x},stopTracking:function(){t._valueTracker=null,delete t[n]}}}}function At(t){if(!t._valueTracker){var n=ot(t)?"checked":"value";t._valueTracker=Ye(t,n,""+t[n])}}function jt(t){if(!t)return!1;var n=t._valueTracker;if(!n)return!0;var a=n.getValue(),o="";return t&&(o=ot(t)?t.checked?"true":"false":t.value),t=o,t!==a?(n.setValue(t),!0):!1}function kt(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var Lt=/[\n"\\]/g;function Ot(t){return t.replace(Lt,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function Be(t,n,a,o,u,f,x,R){t.name="",x!=null&&typeof x!="function"&&typeof x!="symbol"&&typeof x!="boolean"?t.type=x:t.removeAttribute("type"),n!=null?x==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+je(n)):t.value!==""+je(n)&&(t.value=""+je(n)):x!=="submit"&&x!=="reset"||t.removeAttribute("value"),n!=null?ht(t,x,je(n)):a!=null?ht(t,x,je(a)):o!=null&&t.removeAttribute("value"),u==null&&f!=null&&(t.defaultChecked=!!f),u!=null&&(t.checked=u&&typeof u!="function"&&typeof u!="symbol"),R!=null&&typeof R!="function"&&typeof R!="symbol"&&typeof R!="boolean"?t.name=""+je(R):t.removeAttribute("name")}function Pn(t,n,a,o,u,f,x,R){if(f!=null&&typeof f!="function"&&typeof f!="symbol"&&typeof f!="boolean"&&(t.type=f),n!=null||a!=null){if(!(f!=="submit"&&f!=="reset"||n!=null)){At(t);return}a=a!=null?""+je(a):"",n=n!=null?""+je(n):a,R||n===t.value||(t.value=n),t.defaultValue=n}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,t.checked=R?t.checked:!!o,t.defaultChecked=!!o,x!=null&&typeof x!="function"&&typeof x!="symbol"&&typeof x!="boolean"&&(t.name=x),At(t)}function ht(t,n,a){n==="number"&&kt(t.ownerDocument)===t||t.defaultValue===""+a||(t.defaultValue=""+a)}function yn(t,n,a,o){if(t=t.options,n){n={};for(var u=0;u<a.length;u++)n["$"+a[u]]=!0;for(a=0;a<t.length;a++)u=n.hasOwnProperty("$"+t[a].value),t[a].selected!==u&&(t[a].selected=u),u&&o&&(t[a].defaultSelected=!0)}else{for(a=""+je(a),n=null,u=0;u<t.length;u++){if(t[u].value===a){t[u].selected=!0,o&&(t[u].defaultSelected=!0);return}n!==null||t[u].disabled||(n=t[u])}n!==null&&(n.selected=!0)}}function ni(t,n,a){if(n!=null&&(n=""+je(n),n!==t.value&&(t.value=n),a==null)){t.defaultValue!==n&&(t.defaultValue=n);return}t.defaultValue=a!=null?""+je(a):""}function Ri(t,n,a,o){if(n==null){if(o!=null){if(a!=null)throw Error(r(92));if(j(o)){if(1<o.length)throw Error(r(93));o=o[0]}a=o}a==null&&(a=""),n=a}a=je(n),t.defaultValue=a,o=t.textContent,o===a&&o!==""&&o!==null&&(t.value=o),At(t)}function ii(t,n){if(n){var a=t.firstChild;if(a&&a===t.lastChild&&a.nodeType===3){a.nodeValue=n;return}}t.textContent=n}var Pt=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function $t(t,n,a){var o=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?o?t.setProperty(n,""):n==="float"?t.cssFloat="":t[n]="":o?t.setProperty(n,a):typeof a!="number"||a===0||Pt.has(n)?n==="float"?t.cssFloat=a:t[n]=(""+a).trim():t[n]=a+"px"}function Ci(t,n,a){if(n!=null&&typeof n!="object")throw Error(r(62));if(t=t.style,a!=null){for(var o in a)!a.hasOwnProperty(o)||n!=null&&n.hasOwnProperty(o)||(o.indexOf("--")===0?t.setProperty(o,""):o==="float"?t.cssFloat="":t[o]="");for(var u in n)o=n[u],n.hasOwnProperty(u)&&a[u]!==o&&$t(t,u,o)}else for(var f in n)n.hasOwnProperty(f)&&$t(t,f,n[f])}function Ut(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var zi=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Da=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function dr(t){return Da.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function ea(){}var lu=null;function cu(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Xr=null,Wr=null;function fp(t){var n=$i(t);if(n&&(t=n.stateNode)){var a=t[Cn]||null;e:switch(t=n.stateNode,n.type){case"input":if(Be(t,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=t;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+Ot(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var o=a[n];if(o!==t&&o.form===t.form){var u=o[Cn]||null;if(!u)throw Error(r(90));Be(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(n=0;n<a.length;n++)o=a[n],o.form===t.form&&jt(o)}break e;case"textarea":ni(t,a.value,a.defaultValue);break e;case"select":n=a.value,n!=null&&yn(t,!!a.multiple,n,!1)}}}var uu=!1;function dp(t,n,a){if(uu)return t(n,a);uu=!0;try{var o=t(n);return o}finally{if(uu=!1,(Xr!==null||Wr!==null)&&(ql(),Xr&&(n=Xr,t=Wr,Wr=Xr=null,fp(n),t)))for(n=0;n<t.length;n++)fp(t[n])}}function js(t,n){var a=t.stateNode;if(a===null)return null;var o=a[Cn]||null;if(o===null)return null;a=o[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(t=t.type,o=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!o;break e;default:t=!1}if(t)return null;if(a&&typeof a!="function")throw Error(r(231,n,typeof a));return a}var ta=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),fu=!1;if(ta)try{var $s={};Object.defineProperty($s,"passive",{get:function(){fu=!0}}),window.addEventListener("test",$s,$s),window.removeEventListener("test",$s,$s)}catch{fu=!1}var Ua=null,du=null,sl=null;function hp(){if(sl)return sl;var t,n=du,a=n.length,o,u="value"in Ua?Ua.value:Ua.textContent,f=u.length;for(t=0;t<a&&n[t]===u[t];t++);var x=a-t;for(o=1;o<=x&&n[a-o]===u[f-o];o++);return sl=u.slice(t,1<o?1-o:void 0)}function ol(t){var n=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&n===13&&(t=13)):t=n,t===10&&(t=13),32<=t||t===13?t:0}function ll(){return!0}function pp(){return!1}function qn(t){function n(a,o,u,f,x){this._reactName=a,this._targetInst=u,this.type=o,this.nativeEvent=f,this.target=x,this.currentTarget=null;for(var R in t)t.hasOwnProperty(R)&&(a=t[R],this[R]=a?a(f):f[R]);return this.isDefaultPrevented=(f.defaultPrevented!=null?f.defaultPrevented:f.returnValue===!1)?ll:pp,this.isPropagationStopped=pp,this}return v(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=ll)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=ll)},persist:function(){},isPersistent:ll}),n}var hr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},cl=qn(hr),eo=v({},hr,{view:0,detail:0}),jv=qn(eo),hu,pu,to,ul=v({},eo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:gu,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==to&&(to&&t.type==="mousemove"?(hu=t.screenX-to.screenX,pu=t.screenY-to.screenY):pu=hu=0,to=t),hu)},movementY:function(t){return"movementY"in t?t.movementY:pu}}),mp=qn(ul),$v=v({},ul,{dataTransfer:0}),ex=qn($v),tx=v({},eo,{relatedTarget:0}),mu=qn(tx),nx=v({},hr,{animationName:0,elapsedTime:0,pseudoElement:0}),ix=qn(nx),ax=v({},hr,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),rx=qn(ax),sx=v({},hr,{data:0}),gp=qn(sx),ox={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},lx={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},cx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function ux(t){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(t):(t=cx[t])?!!n[t]:!1}function gu(){return ux}var fx=v({},eo,{key:function(t){if(t.key){var n=ox[t.key]||t.key;if(n!=="Unidentified")return n}return t.type==="keypress"?(t=ol(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?lx[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:gu,charCode:function(t){return t.type==="keypress"?ol(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?ol(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),dx=qn(fx),hx=v({},ul,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),_p=qn(hx),px=v({},eo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:gu}),mx=qn(px),gx=v({},hr,{propertyName:0,elapsedTime:0,pseudoElement:0}),_x=qn(gx),vx=v({},ul,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),xx=qn(vx),Sx=v({},hr,{newState:0,oldState:0}),Mx=qn(Sx),yx=[9,13,27,32],_u=ta&&"CompositionEvent"in window,no=null;ta&&"documentMode"in document&&(no=document.documentMode);var Ex=ta&&"TextEvent"in window&&!no,vp=ta&&(!_u||no&&8<no&&11>=no),xp=" ",Sp=!1;function Mp(t,n){switch(t){case"keyup":return yx.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function yp(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var qr=!1;function bx(t,n){switch(t){case"compositionend":return yp(n);case"keypress":return n.which!==32?null:(Sp=!0,xp);case"textInput":return t=n.data,t===xp&&Sp?null:t;default:return null}}function Tx(t,n){if(qr)return t==="compositionend"||!_u&&Mp(t,n)?(t=hp(),sl=du=Ua=null,qr=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return vp&&n.locale!=="ko"?null:n.data;default:return null}}var Ax={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ep(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n==="input"?!!Ax[t.type]:n==="textarea"}function bp(t,n,a,o){Xr?Wr?Wr.push(o):Wr=[o]:Xr=o,n=$l(n,"onChange"),0<n.length&&(a=new cl("onChange","change",null,a,o),t.push({event:a,listeners:n}))}var io=null,ao=null;function Rx(t){sg(t,0)}function fl(t){var n=fr(t);if(jt(n))return t}function Tp(t,n){if(t==="change")return n}var Ap=!1;if(ta){var vu;if(ta){var xu="oninput"in document;if(!xu){var Rp=document.createElement("div");Rp.setAttribute("oninput","return;"),xu=typeof Rp.oninput=="function"}vu=xu}else vu=!1;Ap=vu&&(!document.documentMode||9<document.documentMode)}function Cp(){io&&(io.detachEvent("onpropertychange",wp),ao=io=null)}function wp(t){if(t.propertyName==="value"&&fl(ao)){var n=[];bp(n,ao,t,cu(t)),dp(Rx,n)}}function Cx(t,n,a){t==="focusin"?(Cp(),io=n,ao=a,io.attachEvent("onpropertychange",wp)):t==="focusout"&&Cp()}function wx(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return fl(ao)}function Dx(t,n){if(t==="click")return fl(n)}function Ux(t,n){if(t==="input"||t==="change")return fl(n)}function Nx(t,n){return t===n&&(t!==0||1/t===1/n)||t!==t&&n!==n}var ai=typeof Object.is=="function"?Object.is:Nx;function ro(t,n){if(ai(t,n))return!0;if(typeof t!="object"||t===null||typeof n!="object"||n===null)return!1;var a=Object.keys(t),o=Object.keys(n);if(a.length!==o.length)return!1;for(o=0;o<a.length;o++){var u=a[o];if(!an.call(n,u)||!ai(t[u],n[u]))return!1}return!0}function Dp(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Up(t,n){var a=Dp(t);t=0;for(var o;a;){if(a.nodeType===3){if(o=t+a.textContent.length,t<=n&&o>=n)return{node:a,offset:n-t};t=o}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=Dp(a)}}function Np(t,n){return t&&n?t===n?!0:t&&t.nodeType===3?!1:n&&n.nodeType===3?Np(t,n.parentNode):"contains"in t?t.contains(n):t.compareDocumentPosition?!!(t.compareDocumentPosition(n)&16):!1:!1}function Lp(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var n=kt(t.document);n instanceof t.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)t=n.contentWindow;else break;n=kt(t.document)}return n}function Su(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n&&(n==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||n==="textarea"||t.contentEditable==="true")}var Lx=ta&&"documentMode"in document&&11>=document.documentMode,Yr=null,Mu=null,so=null,yu=!1;function Op(t,n,a){var o=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;yu||Yr==null||Yr!==kt(o)||(o=Yr,"selectionStart"in o&&Su(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),so&&ro(so,o)||(so=o,o=$l(Mu,"onSelect"),0<o.length&&(n=new cl("onSelect","select",null,n,a),t.push({event:n,listeners:o}),n.target=Yr)))}function pr(t,n){var a={};return a[t.toLowerCase()]=n.toLowerCase(),a["Webkit"+t]="webkit"+n,a["Moz"+t]="moz"+n,a}var Zr={animationend:pr("Animation","AnimationEnd"),animationiteration:pr("Animation","AnimationIteration"),animationstart:pr("Animation","AnimationStart"),transitionrun:pr("Transition","TransitionRun"),transitionstart:pr("Transition","TransitionStart"),transitioncancel:pr("Transition","TransitionCancel"),transitionend:pr("Transition","TransitionEnd")},Eu={},Pp={};ta&&(Pp=document.createElement("div").style,"AnimationEvent"in window||(delete Zr.animationend.animation,delete Zr.animationiteration.animation,delete Zr.animationstart.animation),"TransitionEvent"in window||delete Zr.transitionend.transition);function mr(t){if(Eu[t])return Eu[t];if(!Zr[t])return t;var n=Zr[t],a;for(a in n)if(n.hasOwnProperty(a)&&a in Pp)return Eu[t]=n[a];return t}var Ip=mr("animationend"),zp=mr("animationiteration"),Bp=mr("animationstart"),Ox=mr("transitionrun"),Px=mr("transitionstart"),Ix=mr("transitioncancel"),Fp=mr("transitionend"),Hp=new Map,bu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");bu.push("scrollEnd");function wi(t,n){Hp.set(t,n),q(n,[t])}var dl=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},mi=[],Kr=0,Tu=0;function hl(){for(var t=Kr,n=Tu=Kr=0;n<t;){var a=mi[n];mi[n++]=null;var o=mi[n];mi[n++]=null;var u=mi[n];mi[n++]=null;var f=mi[n];if(mi[n++]=null,o!==null&&u!==null){var x=o.pending;x===null?u.next=u:(u.next=x.next,x.next=u),o.pending=u}f!==0&&Gp(a,u,f)}}function pl(t,n,a,o){mi[Kr++]=t,mi[Kr++]=n,mi[Kr++]=a,mi[Kr++]=o,Tu|=o,t.lanes|=o,t=t.alternate,t!==null&&(t.lanes|=o)}function Au(t,n,a,o){return pl(t,n,a,o),ml(t)}function gr(t,n){return pl(t,null,null,n),ml(t)}function Gp(t,n,a){t.lanes|=a;var o=t.alternate;o!==null&&(o.lanes|=a);for(var u=!1,f=t.return;f!==null;)f.childLanes|=a,o=f.alternate,o!==null&&(o.childLanes|=a),f.tag===22&&(t=f.stateNode,t===null||t._visibility&1||(u=!0)),t=f,f=f.return;return t.tag===3?(f=t.stateNode,u&&n!==null&&(u=31-ze(a),t=f.hiddenUpdates,o=t[u],o===null?t[u]=[n]:o.push(n),n.lane=a|536870912),f):null}function ml(t){if(50<wo)throw wo=0,If=null,Error(r(185));for(var n=t.return;n!==null;)t=n,n=t.return;return t.tag===3?t.stateNode:null}var Qr={};function zx(t,n,a,o){this.tag=t,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ri(t,n,a,o){return new zx(t,n,a,o)}function Ru(t){return t=t.prototype,!(!t||!t.isReactComponent)}function na(t,n){var a=t.alternate;return a===null?(a=ri(t.tag,n,t.key,t.mode),a.elementType=t.elementType,a.type=t.type,a.stateNode=t.stateNode,a.alternate=t,t.alternate=a):(a.pendingProps=n,a.type=t.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=t.flags&65011712,a.childLanes=t.childLanes,a.lanes=t.lanes,a.child=t.child,a.memoizedProps=t.memoizedProps,a.memoizedState=t.memoizedState,a.updateQueue=t.updateQueue,n=t.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=t.sibling,a.index=t.index,a.ref=t.ref,a.refCleanup=t.refCleanup,a}function Vp(t,n){t.flags&=65011714;var a=t.alternate;return a===null?(t.childLanes=0,t.lanes=n,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=a.childLanes,t.lanes=a.lanes,t.child=a.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=a.memoizedProps,t.memoizedState=a.memoizedState,t.updateQueue=a.updateQueue,t.type=a.type,n=a.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t}function gl(t,n,a,o,u,f){var x=0;if(o=t,typeof t=="function")Ru(t)&&(x=1);else if(typeof t=="string")x=VS(t,a,Re.current)?26:t==="html"||t==="head"||t==="body"?27:5;else e:switch(t){case U:return t=ri(31,a,n,u),t.elementType=U,t.lanes=f,t;case w:return _r(a.children,u,f,n);case M:x=8,u|=24;break;case S:return t=ri(12,a,n,u|2),t.elementType=S,t.lanes=f,t;case z:return t=ri(13,a,n,u),t.elementType=z,t.lanes=f,t;case N:return t=ri(19,a,n,u),t.elementType=N,t.lanes=f,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case P:x=10;break e;case D:x=9;break e;case C:x=11;break e;case L:x=14;break e;case T:x=16,o=null;break e}x=29,a=Error(r(130,t===null?"null":typeof t,"")),o=null}return n=ri(x,a,n,u),n.elementType=t,n.type=o,n.lanes=f,n}function _r(t,n,a,o){return t=ri(7,t,o,n),t.lanes=a,t}function Cu(t,n,a){return t=ri(6,t,null,n),t.lanes=a,t}function kp(t){var n=ri(18,null,null,0);return n.stateNode=t,n}function wu(t,n,a){return n=ri(4,t.children!==null?t.children:[],t.key,n),n.lanes=a,n.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},n}var Xp=new WeakMap;function gi(t,n){if(typeof t=="object"&&t!==null){var a=Xp.get(t);return a!==void 0?a:(n={value:t,source:n,stack:nn(n)},Xp.set(t,n),n)}return{value:t,source:n,stack:nn(n)}}var Jr=[],jr=0,_l=null,oo=0,_i=[],vi=0,Na=null,Bi=1,Fi="";function ia(t,n){Jr[jr++]=oo,Jr[jr++]=_l,_l=t,oo=n}function Wp(t,n,a){_i[vi++]=Bi,_i[vi++]=Fi,_i[vi++]=Na,Na=t;var o=Bi;t=Fi;var u=32-ze(o)-1;o&=~(1<<u),a+=1;var f=32-ze(n)+u;if(30<f){var x=u-u%5;f=(o&(1<<x)-1).toString(32),o>>=x,u-=x,Bi=1<<32-ze(n)+u|a<<u|o,Fi=f+t}else Bi=1<<f|a<<u|o,Fi=t}function Du(t){t.return!==null&&(ia(t,1),Wp(t,1,0))}function Uu(t){for(;t===_l;)_l=Jr[--jr],Jr[jr]=null,oo=Jr[--jr],Jr[jr]=null;for(;t===Na;)Na=_i[--vi],_i[vi]=null,Fi=_i[--vi],_i[vi]=null,Bi=_i[--vi],_i[vi]=null}function qp(t,n){_i[vi++]=Bi,_i[vi++]=Fi,_i[vi++]=Na,Bi=n.id,Fi=n.overflow,Na=t}var wn=null,Zt=null,Mt=!1,La=null,xi=!1,Nu=Error(r(519));function Oa(t){var n=Error(r(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw lo(gi(n,t)),Nu}function Yp(t){var n=t.stateNode,a=t.type,o=t.memoizedProps;switch(n[pn]=t,n[Cn]=o,a){case"dialog":mt("cancel",n),mt("close",n);break;case"iframe":case"object":case"embed":mt("load",n);break;case"video":case"audio":for(a=0;a<Uo.length;a++)mt(Uo[a],n);break;case"source":mt("error",n);break;case"img":case"image":case"link":mt("error",n),mt("load",n);break;case"details":mt("toggle",n);break;case"input":mt("invalid",n),Pn(n,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":mt("invalid",n);break;case"textarea":mt("invalid",n),Ri(n,o.value,o.defaultValue,o.children)}a=o.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||o.suppressHydrationWarning===!0||ug(n.textContent,a)?(o.popover!=null&&(mt("beforetoggle",n),mt("toggle",n)),o.onScroll!=null&&mt("scroll",n),o.onScrollEnd!=null&&mt("scrollend",n),o.onClick!=null&&(n.onclick=ea),n=!0):n=!1,n||Oa(t,!0)}function Zp(t){for(wn=t.return;wn;)switch(wn.tag){case 5:case 31:case 13:xi=!1;return;case 27:case 3:xi=!0;return;default:wn=wn.return}}function $r(t){if(t!==wn)return!1;if(!Mt)return Zp(t),Mt=!0,!1;var n=t.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=t.type,a=!(a!=="form"&&a!=="button")||Jf(t.type,t.memoizedProps)),a=!a),a&&Zt&&Oa(t),Zp(t),n===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(317));Zt=xg(t)}else if(n===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(317));Zt=xg(t)}else n===27?(n=Zt,Za(t.type)?(t=nd,nd=null,Zt=t):Zt=n):Zt=wn?Mi(t.stateNode.nextSibling):null;return!0}function vr(){Zt=wn=null,Mt=!1}function Lu(){var t=La;return t!==null&&(Qn===null?Qn=t:Qn.push.apply(Qn,t),La=null),t}function lo(t){La===null?La=[t]:La.push(t)}var Ou=I(null),xr=null,aa=null;function Pa(t,n,a){ye(Ou,n._currentValue),n._currentValue=a}function ra(t){t._currentValue=Ou.current,Q(Ou)}function Pu(t,n,a){for(;t!==null;){var o=t.alternate;if((t.childLanes&n)!==n?(t.childLanes|=n,o!==null&&(o.childLanes|=n)):o!==null&&(o.childLanes&n)!==n&&(o.childLanes|=n),t===a)break;t=t.return}}function Iu(t,n,a,o){var u=t.child;for(u!==null&&(u.return=t);u!==null;){var f=u.dependencies;if(f!==null){var x=u.child;f=f.firstContext;e:for(;f!==null;){var R=f;f=u;for(var H=0;H<n.length;H++)if(R.context===n[H]){f.lanes|=a,R=f.alternate,R!==null&&(R.lanes|=a),Pu(f.return,a,t),o||(x=null);break e}f=R.next}}else if(u.tag===18){if(x=u.return,x===null)throw Error(r(341));x.lanes|=a,f=x.alternate,f!==null&&(f.lanes|=a),Pu(x,a,t),x=null}else x=u.child;if(x!==null)x.return=u;else for(x=u;x!==null;){if(x===t){x=null;break}if(u=x.sibling,u!==null){u.return=x.return,x=u;break}x=x.return}u=x}}function es(t,n,a,o){t=null;for(var u=n,f=!1;u!==null;){if(!f){if((u.flags&524288)!==0)f=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var x=u.alternate;if(x===null)throw Error(r(387));if(x=x.memoizedProps,x!==null){var R=u.type;ai(u.pendingProps.value,x.value)||(t!==null?t.push(R):t=[R])}}else if(u===xe.current){if(x=u.alternate,x===null)throw Error(r(387));x.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(t!==null?t.push(Io):t=[Io])}u=u.return}t!==null&&Iu(n,t,a,o),n.flags|=262144}function vl(t){for(t=t.firstContext;t!==null;){if(!ai(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Sr(t){xr=t,aa=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function Dn(t){return Kp(xr,t)}function xl(t,n){return xr===null&&Sr(t),Kp(t,n)}function Kp(t,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},aa===null){if(t===null)throw Error(r(308));aa=n,t.dependencies={lanes:0,firstContext:n},t.flags|=524288}else aa=aa.next=n;return a}var Bx=typeof AbortController<"u"?AbortController:function(){var t=[],n=this.signal={aborted:!1,addEventListener:function(a,o){t.push(o)}};this.abort=function(){n.aborted=!0,t.forEach(function(a){return a()})}},Fx=s.unstable_scheduleCallback,Hx=s.unstable_NormalPriority,gn={$$typeof:P,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function zu(){return{controller:new Bx,data:new Map,refCount:0}}function co(t){t.refCount--,t.refCount===0&&Fx(Hx,function(){t.controller.abort()})}var uo=null,Bu=0,ts=0,ns=null;function Gx(t,n){if(uo===null){var a=uo=[];Bu=0,ts=Vf(),ns={status:"pending",value:void 0,then:function(o){a.push(o)}}}return Bu++,n.then(Qp,Qp),n}function Qp(){if(--Bu===0&&uo!==null){ns!==null&&(ns.status="fulfilled");var t=uo;uo=null,ts=0,ns=null;for(var n=0;n<t.length;n++)(0,t[n])()}}function Vx(t,n){var a=[],o={status:"pending",value:null,reason:null,then:function(u){a.push(u)}};return t.then(function(){o.status="fulfilled",o.value=n;for(var u=0;u<a.length;u++)(0,a[u])(n)},function(u){for(o.status="rejected",o.reason=u,u=0;u<a.length;u++)(0,a[u])(void 0)}),o}var Jp=B.S;B.S=function(t,n){O0=Ft(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&Gx(t,n),Jp!==null&&Jp(t,n)};var Mr=I(null);function Fu(){var t=Mr.current;return t!==null?t:Xt.pooledCache}function Sl(t,n){n===null?ye(Mr,Mr.current):ye(Mr,n.pool)}function jp(){var t=Fu();return t===null?null:{parent:gn._currentValue,pool:t}}var is=Error(r(460)),Hu=Error(r(474)),Ml=Error(r(542)),yl={then:function(){}};function $p(t){return t=t.status,t==="fulfilled"||t==="rejected"}function em(t,n,a){switch(a=t[a],a===void 0?t.push(n):a!==n&&(n.then(ea,ea),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,nm(t),t;default:if(typeof n.status=="string")n.then(ea,ea);else{if(t=Xt,t!==null&&100<t.shellSuspendCounter)throw Error(r(482));t=n,t.status="pending",t.then(function(o){if(n.status==="pending"){var u=n;u.status="fulfilled",u.value=o}},function(o){if(n.status==="pending"){var u=n;u.status="rejected",u.reason=o}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,nm(t),t}throw Er=n,is}}function yr(t){try{var n=t._init;return n(t._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(Er=a,is):a}}var Er=null;function tm(){if(Er===null)throw Error(r(459));var t=Er;return Er=null,t}function nm(t){if(t===is||t===Ml)throw Error(r(483))}var as=null,fo=0;function El(t){var n=fo;return fo+=1,as===null&&(as=[]),em(as,t,n)}function ho(t,n){n=n.props.ref,t.ref=n!==void 0?n:null}function bl(t,n){throw n.$$typeof===g?Error(r(525)):(t=Object.prototype.toString.call(n),Error(r(31,t==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":t)))}function im(t){function n(Z,V){if(t){var $=Z.deletions;$===null?(Z.deletions=[V],Z.flags|=16):$.push(V)}}function a(Z,V){if(!t)return null;for(;V!==null;)n(Z,V),V=V.sibling;return null}function o(Z){for(var V=new Map;Z!==null;)Z.key!==null?V.set(Z.key,Z):V.set(Z.index,Z),Z=Z.sibling;return V}function u(Z,V){return Z=na(Z,V),Z.index=0,Z.sibling=null,Z}function f(Z,V,$){return Z.index=$,t?($=Z.alternate,$!==null?($=$.index,$<V?(Z.flags|=67108866,V):$):(Z.flags|=67108866,V)):(Z.flags|=1048576,V)}function x(Z){return t&&Z.alternate===null&&(Z.flags|=67108866),Z}function R(Z,V,$,_e){return V===null||V.tag!==6?(V=Cu($,Z.mode,_e),V.return=Z,V):(V=u(V,$),V.return=Z,V)}function H(Z,V,$,_e){var $e=$.type;return $e===w?he(Z,V,$.props.children,_e,$.key):V!==null&&(V.elementType===$e||typeof $e=="object"&&$e!==null&&$e.$$typeof===T&&yr($e)===V.type)?(V=u(V,$.props),ho(V,$),V.return=Z,V):(V=gl($.type,$.key,$.props,null,Z.mode,_e),ho(V,$),V.return=Z,V)}function ee(Z,V,$,_e){return V===null||V.tag!==4||V.stateNode.containerInfo!==$.containerInfo||V.stateNode.implementation!==$.implementation?(V=wu($,Z.mode,_e),V.return=Z,V):(V=u(V,$.children||[]),V.return=Z,V)}function he(Z,V,$,_e,$e){return V===null||V.tag!==7?(V=_r($,Z.mode,_e,$e),V.return=Z,V):(V=u(V,$),V.return=Z,V)}function ve(Z,V,$){if(typeof V=="string"&&V!==""||typeof V=="number"||typeof V=="bigint")return V=Cu(""+V,Z.mode,$),V.return=Z,V;if(typeof V=="object"&&V!==null){switch(V.$$typeof){case y:return $=gl(V.type,V.key,V.props,null,Z.mode,$),ho($,V),$.return=Z,$;case b:return V=wu(V,Z.mode,$),V.return=Z,V;case T:return V=yr(V),ve(Z,V,$)}if(j(V)||W(V))return V=_r(V,Z.mode,$,null),V.return=Z,V;if(typeof V.then=="function")return ve(Z,El(V),$);if(V.$$typeof===P)return ve(Z,xl(Z,V),$);bl(Z,V)}return null}function oe(Z,V,$,_e){var $e=V!==null?V.key:null;if(typeof $=="string"&&$!==""||typeof $=="number"||typeof $=="bigint")return $e!==null?null:R(Z,V,""+$,_e);if(typeof $=="object"&&$!==null){switch($.$$typeof){case y:return $.key===$e?H(Z,V,$,_e):null;case b:return $.key===$e?ee(Z,V,$,_e):null;case T:return $=yr($),oe(Z,V,$,_e)}if(j($)||W($))return $e!==null?null:he(Z,V,$,_e,null);if(typeof $.then=="function")return oe(Z,V,El($),_e);if($.$$typeof===P)return oe(Z,V,xl(Z,$),_e);bl(Z,$)}return null}function le(Z,V,$,_e,$e){if(typeof _e=="string"&&_e!==""||typeof _e=="number"||typeof _e=="bigint")return Z=Z.get($)||null,R(V,Z,""+_e,$e);if(typeof _e=="object"&&_e!==null){switch(_e.$$typeof){case y:return Z=Z.get(_e.key===null?$:_e.key)||null,H(V,Z,_e,$e);case b:return Z=Z.get(_e.key===null?$:_e.key)||null,ee(V,Z,_e,$e);case T:return _e=yr(_e),le(Z,V,$,_e,$e)}if(j(_e)||W(_e))return Z=Z.get($)||null,he(V,Z,_e,$e,null);if(typeof _e.then=="function")return le(Z,V,$,El(_e),$e);if(_e.$$typeof===P)return le(Z,V,$,xl(V,_e),$e);bl(V,_e)}return null}function Xe(Z,V,$,_e){for(var $e=null,Rt=null,qe=V,ct=V=0,_t=null;qe!==null&&ct<$.length;ct++){qe.index>ct?(_t=qe,qe=null):_t=qe.sibling;var Ct=oe(Z,qe,$[ct],_e);if(Ct===null){qe===null&&(qe=_t);break}t&&qe&&Ct.alternate===null&&n(Z,qe),V=f(Ct,V,ct),Rt===null?$e=Ct:Rt.sibling=Ct,Rt=Ct,qe=_t}if(ct===$.length)return a(Z,qe),Mt&&ia(Z,ct),$e;if(qe===null){for(;ct<$.length;ct++)qe=ve(Z,$[ct],_e),qe!==null&&(V=f(qe,V,ct),Rt===null?$e=qe:Rt.sibling=qe,Rt=qe);return Mt&&ia(Z,ct),$e}for(qe=o(qe);ct<$.length;ct++)_t=le(qe,Z,ct,$[ct],_e),_t!==null&&(t&&_t.alternate!==null&&qe.delete(_t.key===null?ct:_t.key),V=f(_t,V,ct),Rt===null?$e=_t:Rt.sibling=_t,Rt=_t);return t&&qe.forEach(function($a){return n(Z,$a)}),Mt&&ia(Z,ct),$e}function et(Z,V,$,_e){if($==null)throw Error(r(151));for(var $e=null,Rt=null,qe=V,ct=V=0,_t=null,Ct=$.next();qe!==null&&!Ct.done;ct++,Ct=$.next()){qe.index>ct?(_t=qe,qe=null):_t=qe.sibling;var $a=oe(Z,qe,Ct.value,_e);if($a===null){qe===null&&(qe=_t);break}t&&qe&&$a.alternate===null&&n(Z,qe),V=f($a,V,ct),Rt===null?$e=$a:Rt.sibling=$a,Rt=$a,qe=_t}if(Ct.done)return a(Z,qe),Mt&&ia(Z,ct),$e;if(qe===null){for(;!Ct.done;ct++,Ct=$.next())Ct=ve(Z,Ct.value,_e),Ct!==null&&(V=f(Ct,V,ct),Rt===null?$e=Ct:Rt.sibling=Ct,Rt=Ct);return Mt&&ia(Z,ct),$e}for(qe=o(qe);!Ct.done;ct++,Ct=$.next())Ct=le(qe,Z,ct,Ct.value,_e),Ct!==null&&(t&&Ct.alternate!==null&&qe.delete(Ct.key===null?ct:Ct.key),V=f(Ct,V,ct),Rt===null?$e=Ct:Rt.sibling=Ct,Rt=Ct);return t&&qe.forEach(function($S){return n(Z,$S)}),Mt&&ia(Z,ct),$e}function Vt(Z,V,$,_e){if(typeof $=="object"&&$!==null&&$.type===w&&$.key===null&&($=$.props.children),typeof $=="object"&&$!==null){switch($.$$typeof){case y:e:{for(var $e=$.key;V!==null;){if(V.key===$e){if($e=$.type,$e===w){if(V.tag===7){a(Z,V.sibling),_e=u(V,$.props.children),_e.return=Z,Z=_e;break e}}else if(V.elementType===$e||typeof $e=="object"&&$e!==null&&$e.$$typeof===T&&yr($e)===V.type){a(Z,V.sibling),_e=u(V,$.props),ho(_e,$),_e.return=Z,Z=_e;break e}a(Z,V);break}else n(Z,V);V=V.sibling}$.type===w?(_e=_r($.props.children,Z.mode,_e,$.key),_e.return=Z,Z=_e):(_e=gl($.type,$.key,$.props,null,Z.mode,_e),ho(_e,$),_e.return=Z,Z=_e)}return x(Z);case b:e:{for($e=$.key;V!==null;){if(V.key===$e)if(V.tag===4&&V.stateNode.containerInfo===$.containerInfo&&V.stateNode.implementation===$.implementation){a(Z,V.sibling),_e=u(V,$.children||[]),_e.return=Z,Z=_e;break e}else{a(Z,V);break}else n(Z,V);V=V.sibling}_e=wu($,Z.mode,_e),_e.return=Z,Z=_e}return x(Z);case T:return $=yr($),Vt(Z,V,$,_e)}if(j($))return Xe(Z,V,$,_e);if(W($)){if($e=W($),typeof $e!="function")throw Error(r(150));return $=$e.call($),et(Z,V,$,_e)}if(typeof $.then=="function")return Vt(Z,V,El($),_e);if($.$$typeof===P)return Vt(Z,V,xl(Z,$),_e);bl(Z,$)}return typeof $=="string"&&$!==""||typeof $=="number"||typeof $=="bigint"?($=""+$,V!==null&&V.tag===6?(a(Z,V.sibling),_e=u(V,$),_e.return=Z,Z=_e):(a(Z,V),_e=Cu($,Z.mode,_e),_e.return=Z,Z=_e),x(Z)):a(Z,V)}return function(Z,V,$,_e){try{fo=0;var $e=Vt(Z,V,$,_e);return as=null,$e}catch(qe){if(qe===is||qe===Ml)throw qe;var Rt=ri(29,qe,null,Z.mode);return Rt.lanes=_e,Rt.return=Z,Rt}finally{}}}var br=im(!0),am=im(!1),Ia=!1;function Gu(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Vu(t,n){t=t.updateQueue,n.updateQueue===t&&(n.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function za(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function Ba(t,n,a){var o=t.updateQueue;if(o===null)return null;if(o=o.shared,(Dt&2)!==0){var u=o.pending;return u===null?n.next=n:(n.next=u.next,u.next=n),o.pending=n,n=ml(t),Gp(t,null,a),n}return pl(t,o,n,a),ml(t)}function po(t,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var o=n.lanes;o&=t.pendingLanes,a|=o,n.lanes=a,ei(t,a)}}function ku(t,n){var a=t.updateQueue,o=t.alternate;if(o!==null&&(o=o.updateQueue,a===o)){var u=null,f=null;if(a=a.firstBaseUpdate,a!==null){do{var x={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};f===null?u=f=x:f=f.next=x,a=a.next}while(a!==null);f===null?u=f=n:f=f.next=n}else u=f=n;a={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:f,shared:o.shared,callbacks:o.callbacks},t.updateQueue=a;return}t=a.lastBaseUpdate,t===null?a.firstBaseUpdate=n:t.next=n,a.lastBaseUpdate=n}var Xu=!1;function mo(){if(Xu){var t=ns;if(t!==null)throw t}}function go(t,n,a,o){Xu=!1;var u=t.updateQueue;Ia=!1;var f=u.firstBaseUpdate,x=u.lastBaseUpdate,R=u.shared.pending;if(R!==null){u.shared.pending=null;var H=R,ee=H.next;H.next=null,x===null?f=ee:x.next=ee,x=H;var he=t.alternate;he!==null&&(he=he.updateQueue,R=he.lastBaseUpdate,R!==x&&(R===null?he.firstBaseUpdate=ee:R.next=ee,he.lastBaseUpdate=H))}if(f!==null){var ve=u.baseState;x=0,he=ee=H=null,R=f;do{var oe=R.lane&-536870913,le=oe!==R.lane;if(le?(gt&oe)===oe:(o&oe)===oe){oe!==0&&oe===ts&&(Xu=!0),he!==null&&(he=he.next={lane:0,tag:R.tag,payload:R.payload,callback:null,next:null});e:{var Xe=t,et=R;oe=n;var Vt=a;switch(et.tag){case 1:if(Xe=et.payload,typeof Xe=="function"){ve=Xe.call(Vt,ve,oe);break e}ve=Xe;break e;case 3:Xe.flags=Xe.flags&-65537|128;case 0:if(Xe=et.payload,oe=typeof Xe=="function"?Xe.call(Vt,ve,oe):Xe,oe==null)break e;ve=v({},ve,oe);break e;case 2:Ia=!0}}oe=R.callback,oe!==null&&(t.flags|=64,le&&(t.flags|=8192),le=u.callbacks,le===null?u.callbacks=[oe]:le.push(oe))}else le={lane:oe,tag:R.tag,payload:R.payload,callback:R.callback,next:null},he===null?(ee=he=le,H=ve):he=he.next=le,x|=oe;if(R=R.next,R===null){if(R=u.shared.pending,R===null)break;le=R,R=le.next,le.next=null,u.lastBaseUpdate=le,u.shared.pending=null}}while(!0);he===null&&(H=ve),u.baseState=H,u.firstBaseUpdate=ee,u.lastBaseUpdate=he,f===null&&(u.shared.lanes=0),ka|=x,t.lanes=x,t.memoizedState=ve}}function rm(t,n){if(typeof t!="function")throw Error(r(191,t));t.call(n)}function sm(t,n){var a=t.callbacks;if(a!==null)for(t.callbacks=null,t=0;t<a.length;t++)rm(a[t],n)}var rs=I(null),Tl=I(0);function om(t,n){t=pa,ye(Tl,t),ye(rs,n),pa=t|n.baseLanes}function Wu(){ye(Tl,pa),ye(rs,rs.current)}function qu(){pa=Tl.current,Q(rs),Q(Tl)}var si=I(null),Si=null;function Fa(t){var n=t.alternate;ye(un,un.current&1),ye(si,t),Si===null&&(n===null||rs.current!==null||n.memoizedState!==null)&&(Si=t)}function Yu(t){ye(un,un.current),ye(si,t),Si===null&&(Si=t)}function lm(t){t.tag===22?(ye(un,un.current),ye(si,t),Si===null&&(Si=t)):Ha()}function Ha(){ye(un,un.current),ye(si,si.current)}function oi(t){Q(si),Si===t&&(Si=null),Q(un)}var un=I(0);function Al(t){for(var n=t;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||ed(a)||td(a)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var sa=0,lt=null,Ht=null,_n=null,Rl=!1,ss=!1,Tr=!1,Cl=0,_o=0,os=null,kx=0;function sn(){throw Error(r(321))}function Zu(t,n){if(n===null)return!1;for(var a=0;a<n.length&&a<t.length;a++)if(!ai(t[a],n[a]))return!1;return!0}function Ku(t,n,a,o,u,f){return sa=f,lt=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,B.H=t===null||t.memoizedState===null?Wm:ff,Tr=!1,f=a(o,u),Tr=!1,ss&&(f=um(n,a,o,u)),cm(t),f}function cm(t){B.H=So;var n=Ht!==null&&Ht.next!==null;if(sa=0,_n=Ht=lt=null,Rl=!1,_o=0,os=null,n)throw Error(r(300));t===null||vn||(t=t.dependencies,t!==null&&vl(t)&&(vn=!0))}function um(t,n,a,o){lt=t;var u=0;do{if(ss&&(os=null),_o=0,ss=!1,25<=u)throw Error(r(301));if(u+=1,_n=Ht=null,t.updateQueue!=null){var f=t.updateQueue;f.lastEffect=null,f.events=null,f.stores=null,f.memoCache!=null&&(f.memoCache.index=0)}B.H=qm,f=n(a,o)}while(ss);return f}function Xx(){var t=B.H,n=t.useState()[0];return n=typeof n.then=="function"?vo(n):n,t=t.useState()[0],(Ht!==null?Ht.memoizedState:null)!==t&&(lt.flags|=1024),n}function Qu(){var t=Cl!==0;return Cl=0,t}function Ju(t,n,a){n.updateQueue=t.updateQueue,n.flags&=-2053,t.lanes&=~a}function ju(t){if(Rl){for(t=t.memoizedState;t!==null;){var n=t.queue;n!==null&&(n.pending=null),t=t.next}Rl=!1}sa=0,_n=Ht=lt=null,ss=!1,_o=Cl=0,os=null}function Hn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return _n===null?lt.memoizedState=_n=t:_n=_n.next=t,_n}function fn(){if(Ht===null){var t=lt.alternate;t=t!==null?t.memoizedState:null}else t=Ht.next;var n=_n===null?lt.memoizedState:_n.next;if(n!==null)_n=n,Ht=t;else{if(t===null)throw lt.alternate===null?Error(r(467)):Error(r(310));Ht=t,t={memoizedState:Ht.memoizedState,baseState:Ht.baseState,baseQueue:Ht.baseQueue,queue:Ht.queue,next:null},_n===null?lt.memoizedState=_n=t:_n=_n.next=t}return _n}function wl(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function vo(t){var n=_o;return _o+=1,os===null&&(os=[]),t=em(os,t,n),n=lt,(_n===null?n.memoizedState:_n.next)===null&&(n=n.alternate,B.H=n===null||n.memoizedState===null?Wm:ff),t}function Dl(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return vo(t);if(t.$$typeof===P)return Dn(t)}throw Error(r(438,String(t)))}function $u(t){var n=null,a=lt.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var o=lt.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(n={data:o.data.map(function(u){return u.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=wl(),lt.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(t),o=0;o<t;o++)a[o]=k;return n.index++,a}function oa(t,n){return typeof n=="function"?n(t):n}function Ul(t){var n=fn();return ef(n,Ht,t)}function ef(t,n,a){var o=t.queue;if(o===null)throw Error(r(311));o.lastRenderedReducer=a;var u=t.baseQueue,f=o.pending;if(f!==null){if(u!==null){var x=u.next;u.next=f.next,f.next=x}n.baseQueue=u=f,o.pending=null}if(f=t.baseState,u===null)t.memoizedState=f;else{n=u.next;var R=x=null,H=null,ee=n,he=!1;do{var ve=ee.lane&-536870913;if(ve!==ee.lane?(gt&ve)===ve:(sa&ve)===ve){var oe=ee.revertLane;if(oe===0)H!==null&&(H=H.next={lane:0,revertLane:0,gesture:null,action:ee.action,hasEagerState:ee.hasEagerState,eagerState:ee.eagerState,next:null}),ve===ts&&(he=!0);else if((sa&oe)===oe){ee=ee.next,oe===ts&&(he=!0);continue}else ve={lane:0,revertLane:ee.revertLane,gesture:null,action:ee.action,hasEagerState:ee.hasEagerState,eagerState:ee.eagerState,next:null},H===null?(R=H=ve,x=f):H=H.next=ve,lt.lanes|=oe,ka|=oe;ve=ee.action,Tr&&a(f,ve),f=ee.hasEagerState?ee.eagerState:a(f,ve)}else oe={lane:ve,revertLane:ee.revertLane,gesture:ee.gesture,action:ee.action,hasEagerState:ee.hasEagerState,eagerState:ee.eagerState,next:null},H===null?(R=H=oe,x=f):H=H.next=oe,lt.lanes|=ve,ka|=ve;ee=ee.next}while(ee!==null&&ee!==n);if(H===null?x=f:H.next=R,!ai(f,t.memoizedState)&&(vn=!0,he&&(a=ns,a!==null)))throw a;t.memoizedState=f,t.baseState=x,t.baseQueue=H,o.lastRenderedState=f}return u===null&&(o.lanes=0),[t.memoizedState,o.dispatch]}function tf(t){var n=fn(),a=n.queue;if(a===null)throw Error(r(311));a.lastRenderedReducer=t;var o=a.dispatch,u=a.pending,f=n.memoizedState;if(u!==null){a.pending=null;var x=u=u.next;do f=t(f,x.action),x=x.next;while(x!==u);ai(f,n.memoizedState)||(vn=!0),n.memoizedState=f,n.baseQueue===null&&(n.baseState=f),a.lastRenderedState=f}return[f,o]}function fm(t,n,a){var o=lt,u=fn(),f=Mt;if(f){if(a===void 0)throw Error(r(407));a=a()}else a=n();var x=!ai((Ht||u).memoizedState,a);if(x&&(u.memoizedState=a,vn=!0),u=u.queue,rf(pm.bind(null,o,u,t),[t]),u.getSnapshot!==n||x||_n!==null&&_n.memoizedState.tag&1){if(o.flags|=2048,ls(9,{destroy:void 0},hm.bind(null,o,u,a,n),null),Xt===null)throw Error(r(349));f||(sa&127)!==0||dm(o,n,a)}return a}function dm(t,n,a){t.flags|=16384,t={getSnapshot:n,value:a},n=lt.updateQueue,n===null?(n=wl(),lt.updateQueue=n,n.stores=[t]):(a=n.stores,a===null?n.stores=[t]:a.push(t))}function hm(t,n,a,o){n.value=a,n.getSnapshot=o,mm(n)&&gm(t)}function pm(t,n,a){return a(function(){mm(n)&&gm(t)})}function mm(t){var n=t.getSnapshot;t=t.value;try{var a=n();return!ai(t,a)}catch{return!0}}function gm(t){var n=gr(t,2);n!==null&&Jn(n,t,2)}function nf(t){var n=Hn();if(typeof t=="function"){var a=t;if(t=a(),Tr){Ae(!0);try{a()}finally{Ae(!1)}}}return n.memoizedState=n.baseState=t,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:oa,lastRenderedState:t},n}function _m(t,n,a,o){return t.baseState=a,ef(t,Ht,typeof o=="function"?o:oa)}function Wx(t,n,a,o,u){if(Ol(t))throw Error(r(485));if(t=n.action,t!==null){var f={payload:u,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(x){f.listeners.push(x)}};B.T!==null?a(!0):f.isTransition=!1,o(f),a=n.pending,a===null?(f.next=n.pending=f,vm(n,f)):(f.next=a.next,n.pending=a.next=f)}}function vm(t,n){var a=n.action,o=n.payload,u=t.state;if(n.isTransition){var f=B.T,x={};B.T=x;try{var R=a(u,o),H=B.S;H!==null&&H(x,R),xm(t,n,R)}catch(ee){af(t,n,ee)}finally{f!==null&&x.types!==null&&(f.types=x.types),B.T=f}}else try{f=a(u,o),xm(t,n,f)}catch(ee){af(t,n,ee)}}function xm(t,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(o){Sm(t,n,o)},function(o){return af(t,n,o)}):Sm(t,n,a)}function Sm(t,n,a){n.status="fulfilled",n.value=a,Mm(n),t.state=a,n=t.pending,n!==null&&(a=n.next,a===n?t.pending=null:(a=a.next,n.next=a,vm(t,a)))}function af(t,n,a){var o=t.pending;if(t.pending=null,o!==null){o=o.next;do n.status="rejected",n.reason=a,Mm(n),n=n.next;while(n!==o)}t.action=null}function Mm(t){t=t.listeners;for(var n=0;n<t.length;n++)(0,t[n])()}function ym(t,n){return n}function Em(t,n){if(Mt){var a=Xt.formState;if(a!==null){e:{var o=lt;if(Mt){if(Zt){t:{for(var u=Zt,f=xi;u.nodeType!==8;){if(!f){u=null;break t}if(u=Mi(u.nextSibling),u===null){u=null;break t}}f=u.data,u=f==="F!"||f==="F"?u:null}if(u){Zt=Mi(u.nextSibling),o=u.data==="F!";break e}}Oa(o)}o=!1}o&&(n=a[0])}}return a=Hn(),a.memoizedState=a.baseState=n,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ym,lastRenderedState:n},a.queue=o,a=Vm.bind(null,lt,o),o.dispatch=a,o=nf(!1),f=uf.bind(null,lt,!1,o.queue),o=Hn(),u={state:n,dispatch:null,action:t,pending:null},o.queue=u,a=Wx.bind(null,lt,u,f,a),u.dispatch=a,o.memoizedState=t,[n,a,!1]}function bm(t){var n=fn();return Tm(n,Ht,t)}function Tm(t,n,a){if(n=ef(t,n,ym)[0],t=Ul(oa)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var o=vo(n)}catch(x){throw x===is?Ml:x}else o=n;n=fn();var u=n.queue,f=u.dispatch;return a!==n.memoizedState&&(lt.flags|=2048,ls(9,{destroy:void 0},qx.bind(null,u,a),null)),[o,f,t]}function qx(t,n){t.action=n}function Am(t){var n=fn(),a=Ht;if(a!==null)return Tm(n,a,t);fn(),n=n.memoizedState,a=fn();var o=a.queue.dispatch;return a.memoizedState=t,[n,o,!1]}function ls(t,n,a,o){return t={tag:t,create:a,deps:o,inst:n,next:null},n=lt.updateQueue,n===null&&(n=wl(),lt.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=t.next=t:(o=a.next,a.next=t,t.next=o,n.lastEffect=t),t}function Rm(){return fn().memoizedState}function Nl(t,n,a,o){var u=Hn();lt.flags|=t,u.memoizedState=ls(1|n,{destroy:void 0},a,o===void 0?null:o)}function Ll(t,n,a,o){var u=fn();o=o===void 0?null:o;var f=u.memoizedState.inst;Ht!==null&&o!==null&&Zu(o,Ht.memoizedState.deps)?u.memoizedState=ls(n,f,a,o):(lt.flags|=t,u.memoizedState=ls(1|n,f,a,o))}function Cm(t,n){Nl(8390656,8,t,n)}function rf(t,n){Ll(2048,8,t,n)}function Yx(t){lt.flags|=4;var n=lt.updateQueue;if(n===null)n=wl(),lt.updateQueue=n,n.events=[t];else{var a=n.events;a===null?n.events=[t]:a.push(t)}}function wm(t){var n=fn().memoizedState;return Yx({ref:n,nextImpl:t}),function(){if((Dt&2)!==0)throw Error(r(440));return n.impl.apply(void 0,arguments)}}function Dm(t,n){return Ll(4,2,t,n)}function Um(t,n){return Ll(4,4,t,n)}function Nm(t,n){if(typeof n=="function"){t=t();var a=n(t);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return t=t(),n.current=t,function(){n.current=null}}function Lm(t,n,a){a=a!=null?a.concat([t]):null,Ll(4,4,Nm.bind(null,n,t),a)}function sf(){}function Om(t,n){var a=fn();n=n===void 0?null:n;var o=a.memoizedState;return n!==null&&Zu(n,o[1])?o[0]:(a.memoizedState=[t,n],t)}function Pm(t,n){var a=fn();n=n===void 0?null:n;var o=a.memoizedState;if(n!==null&&Zu(n,o[1]))return o[0];if(o=t(),Tr){Ae(!0);try{t()}finally{Ae(!1)}}return a.memoizedState=[o,n],o}function of(t,n,a){return a===void 0||(sa&1073741824)!==0&&(gt&261930)===0?t.memoizedState=n:(t.memoizedState=a,t=I0(),lt.lanes|=t,ka|=t,a)}function Im(t,n,a,o){return ai(a,n)?a:rs.current!==null?(t=of(t,a,o),ai(t,n)||(vn=!0),t):(sa&42)===0||(sa&1073741824)!==0&&(gt&261930)===0?(vn=!0,t.memoizedState=a):(t=I0(),lt.lanes|=t,ka|=t,n)}function zm(t,n,a,o,u){var f=G.p;G.p=f!==0&&8>f?f:8;var x=B.T,R={};B.T=R,uf(t,!1,n,a);try{var H=u(),ee=B.S;if(ee!==null&&ee(R,H),H!==null&&typeof H=="object"&&typeof H.then=="function"){var he=Vx(H,o);xo(t,n,he,ui(t))}else xo(t,n,o,ui(t))}catch(ve){xo(t,n,{then:function(){},status:"rejected",reason:ve},ui())}finally{G.p=f,x!==null&&R.types!==null&&(x.types=R.types),B.T=x}}function Zx(){}function lf(t,n,a,o){if(t.tag!==5)throw Error(r(476));var u=Bm(t).queue;zm(t,u,n,te,a===null?Zx:function(){return Fm(t),a(o)})}function Bm(t){var n=t.memoizedState;if(n!==null)return n;n={memoizedState:te,baseState:te,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:oa,lastRenderedState:te},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:oa,lastRenderedState:a},next:null},t.memoizedState=n,t=t.alternate,t!==null&&(t.memoizedState=n),n}function Fm(t){var n=Bm(t);n.next===null&&(n=t.alternate.memoizedState),xo(t,n.next.queue,{},ui())}function cf(){return Dn(Io)}function Hm(){return fn().memoizedState}function Gm(){return fn().memoizedState}function Kx(t){for(var n=t.return;n!==null;){switch(n.tag){case 24:case 3:var a=ui();t=za(a);var o=Ba(n,t,a);o!==null&&(Jn(o,n,a),po(o,n,a)),n={cache:zu()},t.payload=n;return}n=n.return}}function Qx(t,n,a){var o=ui();a={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Ol(t)?km(n,a):(a=Au(t,n,a,o),a!==null&&(Jn(a,t,o),Xm(a,n,o)))}function Vm(t,n,a){var o=ui();xo(t,n,a,o)}function xo(t,n,a,o){var u={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(Ol(t))km(n,u);else{var f=t.alternate;if(t.lanes===0&&(f===null||f.lanes===0)&&(f=n.lastRenderedReducer,f!==null))try{var x=n.lastRenderedState,R=f(x,a);if(u.hasEagerState=!0,u.eagerState=R,ai(R,x))return pl(t,n,u,0),Xt===null&&hl(),!1}catch{}finally{}if(a=Au(t,n,u,o),a!==null)return Jn(a,t,o),Xm(a,n,o),!0}return!1}function uf(t,n,a,o){if(o={lane:2,revertLane:Vf(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},Ol(t)){if(n)throw Error(r(479))}else n=Au(t,a,o,2),n!==null&&Jn(n,t,2)}function Ol(t){var n=t.alternate;return t===lt||n!==null&&n===lt}function km(t,n){ss=Rl=!0;var a=t.pending;a===null?n.next=n:(n.next=a.next,a.next=n),t.pending=n}function Xm(t,n,a){if((a&4194048)!==0){var o=n.lanes;o&=t.pendingLanes,a|=o,n.lanes=a,ei(t,a)}}var So={readContext:Dn,use:Dl,useCallback:sn,useContext:sn,useEffect:sn,useImperativeHandle:sn,useLayoutEffect:sn,useInsertionEffect:sn,useMemo:sn,useReducer:sn,useRef:sn,useState:sn,useDebugValue:sn,useDeferredValue:sn,useTransition:sn,useSyncExternalStore:sn,useId:sn,useHostTransitionStatus:sn,useFormState:sn,useActionState:sn,useOptimistic:sn,useMemoCache:sn,useCacheRefresh:sn};So.useEffectEvent=sn;var Wm={readContext:Dn,use:Dl,useCallback:function(t,n){return Hn().memoizedState=[t,n===void 0?null:n],t},useContext:Dn,useEffect:Cm,useImperativeHandle:function(t,n,a){a=a!=null?a.concat([t]):null,Nl(4194308,4,Nm.bind(null,n,t),a)},useLayoutEffect:function(t,n){return Nl(4194308,4,t,n)},useInsertionEffect:function(t,n){Nl(4,2,t,n)},useMemo:function(t,n){var a=Hn();n=n===void 0?null:n;var o=t();if(Tr){Ae(!0);try{t()}finally{Ae(!1)}}return a.memoizedState=[o,n],o},useReducer:function(t,n,a){var o=Hn();if(a!==void 0){var u=a(n);if(Tr){Ae(!0);try{a(n)}finally{Ae(!1)}}}else u=n;return o.memoizedState=o.baseState=u,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:u},o.queue=t,t=t.dispatch=Qx.bind(null,lt,t),[o.memoizedState,t]},useRef:function(t){var n=Hn();return t={current:t},n.memoizedState=t},useState:function(t){t=nf(t);var n=t.queue,a=Vm.bind(null,lt,n);return n.dispatch=a,[t.memoizedState,a]},useDebugValue:sf,useDeferredValue:function(t,n){var a=Hn();return of(a,t,n)},useTransition:function(){var t=nf(!1);return t=zm.bind(null,lt,t.queue,!0,!1),Hn().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,n,a){var o=lt,u=Hn();if(Mt){if(a===void 0)throw Error(r(407));a=a()}else{if(a=n(),Xt===null)throw Error(r(349));(gt&127)!==0||dm(o,n,a)}u.memoizedState=a;var f={value:a,getSnapshot:n};return u.queue=f,Cm(pm.bind(null,o,f,t),[t]),o.flags|=2048,ls(9,{destroy:void 0},hm.bind(null,o,f,a,n),null),a},useId:function(){var t=Hn(),n=Xt.identifierPrefix;if(Mt){var a=Fi,o=Bi;a=(o&~(1<<32-ze(o)-1)).toString(32)+a,n="_"+n+"R_"+a,a=Cl++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=kx++,n="_"+n+"r_"+a.toString(32)+"_";return t.memoizedState=n},useHostTransitionStatus:cf,useFormState:Em,useActionState:Em,useOptimistic:function(t){var n=Hn();n.memoizedState=n.baseState=t;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=uf.bind(null,lt,!0,a),a.dispatch=n,[t,n]},useMemoCache:$u,useCacheRefresh:function(){return Hn().memoizedState=Kx.bind(null,lt)},useEffectEvent:function(t){var n=Hn(),a={impl:t};return n.memoizedState=a,function(){if((Dt&2)!==0)throw Error(r(440));return a.impl.apply(void 0,arguments)}}},ff={readContext:Dn,use:Dl,useCallback:Om,useContext:Dn,useEffect:rf,useImperativeHandle:Lm,useInsertionEffect:Dm,useLayoutEffect:Um,useMemo:Pm,useReducer:Ul,useRef:Rm,useState:function(){return Ul(oa)},useDebugValue:sf,useDeferredValue:function(t,n){var a=fn();return Im(a,Ht.memoizedState,t,n)},useTransition:function(){var t=Ul(oa)[0],n=fn().memoizedState;return[typeof t=="boolean"?t:vo(t),n]},useSyncExternalStore:fm,useId:Hm,useHostTransitionStatus:cf,useFormState:bm,useActionState:bm,useOptimistic:function(t,n){var a=fn();return _m(a,Ht,t,n)},useMemoCache:$u,useCacheRefresh:Gm};ff.useEffectEvent=wm;var qm={readContext:Dn,use:Dl,useCallback:Om,useContext:Dn,useEffect:rf,useImperativeHandle:Lm,useInsertionEffect:Dm,useLayoutEffect:Um,useMemo:Pm,useReducer:tf,useRef:Rm,useState:function(){return tf(oa)},useDebugValue:sf,useDeferredValue:function(t,n){var a=fn();return Ht===null?of(a,t,n):Im(a,Ht.memoizedState,t,n)},useTransition:function(){var t=tf(oa)[0],n=fn().memoizedState;return[typeof t=="boolean"?t:vo(t),n]},useSyncExternalStore:fm,useId:Hm,useHostTransitionStatus:cf,useFormState:Am,useActionState:Am,useOptimistic:function(t,n){var a=fn();return Ht!==null?_m(a,Ht,t,n):(a.baseState=t,[t,a.queue.dispatch])},useMemoCache:$u,useCacheRefresh:Gm};qm.useEffectEvent=wm;function df(t,n,a,o){n=t.memoizedState,a=a(o,n),a=a==null?n:v({},n,a),t.memoizedState=a,t.lanes===0&&(t.updateQueue.baseState=a)}var hf={enqueueSetState:function(t,n,a){t=t._reactInternals;var o=ui(),u=za(o);u.payload=n,a!=null&&(u.callback=a),n=Ba(t,u,o),n!==null&&(Jn(n,t,o),po(n,t,o))},enqueueReplaceState:function(t,n,a){t=t._reactInternals;var o=ui(),u=za(o);u.tag=1,u.payload=n,a!=null&&(u.callback=a),n=Ba(t,u,o),n!==null&&(Jn(n,t,o),po(n,t,o))},enqueueForceUpdate:function(t,n){t=t._reactInternals;var a=ui(),o=za(a);o.tag=2,n!=null&&(o.callback=n),n=Ba(t,o,a),n!==null&&(Jn(n,t,a),po(n,t,a))}};function Ym(t,n,a,o,u,f,x){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(o,f,x):n.prototype&&n.prototype.isPureReactComponent?!ro(a,o)||!ro(u,f):!0}function Zm(t,n,a,o){t=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,o),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,o),n.state!==t&&hf.enqueueReplaceState(n,n.state,null)}function Ar(t,n){var a=n;if("ref"in n){a={};for(var o in n)o!=="ref"&&(a[o]=n[o])}if(t=t.defaultProps){a===n&&(a=v({},a));for(var u in t)a[u]===void 0&&(a[u]=t[u])}return a}function Km(t){dl(t)}function Qm(t){console.error(t)}function Jm(t){dl(t)}function Pl(t,n){try{var a=t.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(o){setTimeout(function(){throw o})}}function jm(t,n,a){try{var o=t.onCaughtError;o(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function pf(t,n,a){return a=za(a),a.tag=3,a.payload={element:null},a.callback=function(){Pl(t,n)},a}function $m(t){return t=za(t),t.tag=3,t}function e0(t,n,a,o){var u=a.type.getDerivedStateFromError;if(typeof u=="function"){var f=o.value;t.payload=function(){return u(f)},t.callback=function(){jm(n,a,o)}}var x=a.stateNode;x!==null&&typeof x.componentDidCatch=="function"&&(t.callback=function(){jm(n,a,o),typeof u!="function"&&(Xa===null?Xa=new Set([this]):Xa.add(this));var R=o.stack;this.componentDidCatch(o.value,{componentStack:R!==null?R:""})})}function Jx(t,n,a,o,u){if(a.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(n=a.alternate,n!==null&&es(n,a,u,!0),a=si.current,a!==null){switch(a.tag){case 31:case 13:return Si===null?Yl():a.alternate===null&&on===0&&(on=3),a.flags&=-257,a.flags|=65536,a.lanes=u,o===yl?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([o]):n.add(o),Ff(t,o,u)),!1;case 22:return a.flags|=65536,o===yl?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([o])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([o]):a.add(o)),Ff(t,o,u)),!1}throw Error(r(435,a.tag))}return Ff(t,o,u),Yl(),!1}if(Mt)return n=si.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=u,o!==Nu&&(t=Error(r(422),{cause:o}),lo(gi(t,a)))):(o!==Nu&&(n=Error(r(423),{cause:o}),lo(gi(n,a))),t=t.current.alternate,t.flags|=65536,u&=-u,t.lanes|=u,o=gi(o,a),u=pf(t.stateNode,o,u),ku(t,u),on!==4&&(on=2)),!1;var f=Error(r(520),{cause:o});if(f=gi(f,a),Co===null?Co=[f]:Co.push(f),on!==4&&(on=2),n===null)return!0;o=gi(o,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,t=u&-u,a.lanes|=t,t=pf(a.stateNode,o,t),ku(a,t),!1;case 1:if(n=a.type,f=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(Xa===null||!Xa.has(f))))return a.flags|=65536,u&=-u,a.lanes|=u,u=$m(u),e0(u,t,a,o),ku(a,u),!1}a=a.return}while(a!==null);return!1}var mf=Error(r(461)),vn=!1;function Un(t,n,a,o){n.child=t===null?am(n,null,a,o):br(n,t.child,a,o)}function t0(t,n,a,o,u){a=a.render;var f=n.ref;if("ref"in o){var x={};for(var R in o)R!=="ref"&&(x[R]=o[R])}else x=o;return Sr(n),o=Ku(t,n,a,x,f,u),R=Qu(),t!==null&&!vn?(Ju(t,n,u),la(t,n,u)):(Mt&&R&&Du(n),n.flags|=1,Un(t,n,o,u),n.child)}function n0(t,n,a,o,u){if(t===null){var f=a.type;return typeof f=="function"&&!Ru(f)&&f.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=f,i0(t,n,f,o,u)):(t=gl(a.type,null,o,n,n.mode,u),t.ref=n.ref,t.return=n,n.child=t)}if(f=t.child,!Ef(t,u)){var x=f.memoizedProps;if(a=a.compare,a=a!==null?a:ro,a(x,o)&&t.ref===n.ref)return la(t,n,u)}return n.flags|=1,t=na(f,o),t.ref=n.ref,t.return=n,n.child=t}function i0(t,n,a,o,u){if(t!==null){var f=t.memoizedProps;if(ro(f,o)&&t.ref===n.ref)if(vn=!1,n.pendingProps=o=f,Ef(t,u))(t.flags&131072)!==0&&(vn=!0);else return n.lanes=t.lanes,la(t,n,u)}return gf(t,n,a,o,u)}function a0(t,n,a,o){var u=o.children,f=t!==null?t.memoizedState:null;if(t===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((n.flags&128)!==0){if(f=f!==null?f.baseLanes|a:a,t!==null){for(o=n.child=t.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;o=u&~f}else o=0,n.child=null;return r0(t,n,f,a,o)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},t!==null&&Sl(n,f!==null?f.cachePool:null),f!==null?om(n,f):Wu(),lm(n);else return o=n.lanes=536870912,r0(t,n,f!==null?f.baseLanes|a:a,a,o)}else f!==null?(Sl(n,f.cachePool),om(n,f),Ha(),n.memoizedState=null):(t!==null&&Sl(n,null),Wu(),Ha());return Un(t,n,u,a),n.child}function Mo(t,n){return t!==null&&t.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function r0(t,n,a,o,u){var f=Fu();return f=f===null?null:{parent:gn._currentValue,pool:f},n.memoizedState={baseLanes:a,cachePool:f},t!==null&&Sl(n,null),Wu(),lm(n),t!==null&&es(t,n,o,!0),n.childLanes=u,null}function Il(t,n){return n=Bl({mode:n.mode,children:n.children},t.mode),n.ref=t.ref,t.child=n,n.return=t,n}function s0(t,n,a){return br(n,t.child,null,a),t=Il(n,n.pendingProps),t.flags|=2,oi(n),n.memoizedState=null,t}function jx(t,n,a){var o=n.pendingProps,u=(n.flags&128)!==0;if(n.flags&=-129,t===null){if(Mt){if(o.mode==="hidden")return t=Il(n,o),n.lanes=536870912,Mo(null,t);if(Yu(n),(t=Zt)?(t=vg(t,xi),t=t!==null&&t.data==="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Na!==null?{id:Bi,overflow:Fi}:null,retryLane:536870912,hydrationErrors:null},a=kp(t),a.return=n,n.child=a,wn=n,Zt=null)):t=null,t===null)throw Oa(n);return n.lanes=536870912,null}return Il(n,o)}var f=t.memoizedState;if(f!==null){var x=f.dehydrated;if(Yu(n),u)if(n.flags&256)n.flags&=-257,n=s0(t,n,a);else if(n.memoizedState!==null)n.child=t.child,n.flags|=128,n=null;else throw Error(r(558));else if(vn||es(t,n,a,!1),u=(a&t.childLanes)!==0,vn||u){if(o=Xt,o!==null&&(x=ti(o,a),x!==0&&x!==f.retryLane))throw f.retryLane=x,gr(t,x),Jn(o,t,x),mf;Yl(),n=s0(t,n,a)}else t=f.treeContext,Zt=Mi(x.nextSibling),wn=n,Mt=!0,La=null,xi=!1,t!==null&&qp(n,t),n=Il(n,o),n.flags|=4096;return n}return t=na(t.child,{mode:o.mode,children:o.children}),t.ref=n.ref,n.child=t,t.return=n,t}function zl(t,n){var a=n.ref;if(a===null)t!==null&&t.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(r(284));(t===null||t.ref!==a)&&(n.flags|=4194816)}}function gf(t,n,a,o,u){return Sr(n),a=Ku(t,n,a,o,void 0,u),o=Qu(),t!==null&&!vn?(Ju(t,n,u),la(t,n,u)):(Mt&&o&&Du(n),n.flags|=1,Un(t,n,a,u),n.child)}function o0(t,n,a,o,u,f){return Sr(n),n.updateQueue=null,a=um(n,o,a,u),cm(t),o=Qu(),t!==null&&!vn?(Ju(t,n,f),la(t,n,f)):(Mt&&o&&Du(n),n.flags|=1,Un(t,n,a,f),n.child)}function l0(t,n,a,o,u){if(Sr(n),n.stateNode===null){var f=Qr,x=a.contextType;typeof x=="object"&&x!==null&&(f=Dn(x)),f=new a(o,f),n.memoizedState=f.state!==null&&f.state!==void 0?f.state:null,f.updater=hf,n.stateNode=f,f._reactInternals=n,f=n.stateNode,f.props=o,f.state=n.memoizedState,f.refs={},Gu(n),x=a.contextType,f.context=typeof x=="object"&&x!==null?Dn(x):Qr,f.state=n.memoizedState,x=a.getDerivedStateFromProps,typeof x=="function"&&(df(n,a,x,o),f.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof f.getSnapshotBeforeUpdate=="function"||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(x=f.state,typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount(),x!==f.state&&hf.enqueueReplaceState(f,f.state,null),go(n,o,f,u),mo(),f.state=n.memoizedState),typeof f.componentDidMount=="function"&&(n.flags|=4194308),o=!0}else if(t===null){f=n.stateNode;var R=n.memoizedProps,H=Ar(a,R);f.props=H;var ee=f.context,he=a.contextType;x=Qr,typeof he=="object"&&he!==null&&(x=Dn(he));var ve=a.getDerivedStateFromProps;he=typeof ve=="function"||typeof f.getSnapshotBeforeUpdate=="function",R=n.pendingProps!==R,he||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(R||ee!==x)&&Zm(n,f,o,x),Ia=!1;var oe=n.memoizedState;f.state=oe,go(n,o,f,u),mo(),ee=n.memoizedState,R||oe!==ee||Ia?(typeof ve=="function"&&(df(n,a,ve,o),ee=n.memoizedState),(H=Ia||Ym(n,a,H,o,oe,ee,x))?(he||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount()),typeof f.componentDidMount=="function"&&(n.flags|=4194308)):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=o,n.memoizedState=ee),f.props=o,f.state=ee,f.context=x,o=H):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),o=!1)}else{f=n.stateNode,Vu(t,n),x=n.memoizedProps,he=Ar(a,x),f.props=he,ve=n.pendingProps,oe=f.context,ee=a.contextType,H=Qr,typeof ee=="object"&&ee!==null&&(H=Dn(ee)),R=a.getDerivedStateFromProps,(ee=typeof R=="function"||typeof f.getSnapshotBeforeUpdate=="function")||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(x!==ve||oe!==H)&&Zm(n,f,o,H),Ia=!1,oe=n.memoizedState,f.state=oe,go(n,o,f,u),mo();var le=n.memoizedState;x!==ve||oe!==le||Ia||t!==null&&t.dependencies!==null&&vl(t.dependencies)?(typeof R=="function"&&(df(n,a,R,o),le=n.memoizedState),(he=Ia||Ym(n,a,he,o,oe,le,H)||t!==null&&t.dependencies!==null&&vl(t.dependencies))?(ee||typeof f.UNSAFE_componentWillUpdate!="function"&&typeof f.componentWillUpdate!="function"||(typeof f.componentWillUpdate=="function"&&f.componentWillUpdate(o,le,H),typeof f.UNSAFE_componentWillUpdate=="function"&&f.UNSAFE_componentWillUpdate(o,le,H)),typeof f.componentDidUpdate=="function"&&(n.flags|=4),typeof f.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof f.componentDidUpdate!="function"||x===t.memoizedProps&&oe===t.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||x===t.memoizedProps&&oe===t.memoizedState||(n.flags|=1024),n.memoizedProps=o,n.memoizedState=le),f.props=o,f.state=le,f.context=H,o=he):(typeof f.componentDidUpdate!="function"||x===t.memoizedProps&&oe===t.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||x===t.memoizedProps&&oe===t.memoizedState||(n.flags|=1024),o=!1)}return f=o,zl(t,n),o=(n.flags&128)!==0,f||o?(f=n.stateNode,a=o&&typeof a.getDerivedStateFromError!="function"?null:f.render(),n.flags|=1,t!==null&&o?(n.child=br(n,t.child,null,u),n.child=br(n,null,a,u)):Un(t,n,a,u),n.memoizedState=f.state,t=n.child):t=la(t,n,u),t}function c0(t,n,a,o){return vr(),n.flags|=256,Un(t,n,a,o),n.child}var _f={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function vf(t){return{baseLanes:t,cachePool:jp()}}function xf(t,n,a){return t=t!==null?t.childLanes&~a:0,n&&(t|=ci),t}function u0(t,n,a){var o=n.pendingProps,u=!1,f=(n.flags&128)!==0,x;if((x=f)||(x=t!==null&&t.memoizedState===null?!1:(un.current&2)!==0),x&&(u=!0,n.flags&=-129),x=(n.flags&32)!==0,n.flags&=-33,t===null){if(Mt){if(u?Fa(n):Ha(),(t=Zt)?(t=vg(t,xi),t=t!==null&&t.data!=="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Na!==null?{id:Bi,overflow:Fi}:null,retryLane:536870912,hydrationErrors:null},a=kp(t),a.return=n,n.child=a,wn=n,Zt=null)):t=null,t===null)throw Oa(n);return td(t)?n.lanes=32:n.lanes=536870912,null}var R=o.children;return o=o.fallback,u?(Ha(),u=n.mode,R=Bl({mode:"hidden",children:R},u),o=_r(o,u,a,null),R.return=n,o.return=n,R.sibling=o,n.child=R,o=n.child,o.memoizedState=vf(a),o.childLanes=xf(t,x,a),n.memoizedState=_f,Mo(null,o)):(Fa(n),Sf(n,R))}var H=t.memoizedState;if(H!==null&&(R=H.dehydrated,R!==null)){if(f)n.flags&256?(Fa(n),n.flags&=-257,n=Mf(t,n,a)):n.memoizedState!==null?(Ha(),n.child=t.child,n.flags|=128,n=null):(Ha(),R=o.fallback,u=n.mode,o=Bl({mode:"visible",children:o.children},u),R=_r(R,u,a,null),R.flags|=2,o.return=n,R.return=n,o.sibling=R,n.child=o,br(n,t.child,null,a),o=n.child,o.memoizedState=vf(a),o.childLanes=xf(t,x,a),n.memoizedState=_f,n=Mo(null,o));else if(Fa(n),td(R)){if(x=R.nextSibling&&R.nextSibling.dataset,x)var ee=x.dgst;x=ee,o=Error(r(419)),o.stack="",o.digest=x,lo({value:o,source:null,stack:null}),n=Mf(t,n,a)}else if(vn||es(t,n,a,!1),x=(a&t.childLanes)!==0,vn||x){if(x=Xt,x!==null&&(o=ti(x,a),o!==0&&o!==H.retryLane))throw H.retryLane=o,gr(t,o),Jn(x,t,o),mf;ed(R)||Yl(),n=Mf(t,n,a)}else ed(R)?(n.flags|=192,n.child=t.child,n=null):(t=H.treeContext,Zt=Mi(R.nextSibling),wn=n,Mt=!0,La=null,xi=!1,t!==null&&qp(n,t),n=Sf(n,o.children),n.flags|=4096);return n}return u?(Ha(),R=o.fallback,u=n.mode,H=t.child,ee=H.sibling,o=na(H,{mode:"hidden",children:o.children}),o.subtreeFlags=H.subtreeFlags&65011712,ee!==null?R=na(ee,R):(R=_r(R,u,a,null),R.flags|=2),R.return=n,o.return=n,o.sibling=R,n.child=o,Mo(null,o),o=n.child,R=t.child.memoizedState,R===null?R=vf(a):(u=R.cachePool,u!==null?(H=gn._currentValue,u=u.parent!==H?{parent:H,pool:H}:u):u=jp(),R={baseLanes:R.baseLanes|a,cachePool:u}),o.memoizedState=R,o.childLanes=xf(t,x,a),n.memoizedState=_f,Mo(t.child,o)):(Fa(n),a=t.child,t=a.sibling,a=na(a,{mode:"visible",children:o.children}),a.return=n,a.sibling=null,t!==null&&(x=n.deletions,x===null?(n.deletions=[t],n.flags|=16):x.push(t)),n.child=a,n.memoizedState=null,a)}function Sf(t,n){return n=Bl({mode:"visible",children:n},t.mode),n.return=t,t.child=n}function Bl(t,n){return t=ri(22,t,null,n),t.lanes=0,t}function Mf(t,n,a){return br(n,t.child,null,a),t=Sf(n,n.pendingProps.children),t.flags|=2,n.memoizedState=null,t}function f0(t,n,a){t.lanes|=n;var o=t.alternate;o!==null&&(o.lanes|=n),Pu(t.return,n,a)}function yf(t,n,a,o,u,f){var x=t.memoizedState;x===null?t.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:o,tail:a,tailMode:u,treeForkCount:f}:(x.isBackwards=n,x.rendering=null,x.renderingStartTime=0,x.last=o,x.tail=a,x.tailMode=u,x.treeForkCount=f)}function d0(t,n,a){var o=n.pendingProps,u=o.revealOrder,f=o.tail;o=o.children;var x=un.current,R=(x&2)!==0;if(R?(x=x&1|2,n.flags|=128):x&=1,ye(un,x),Un(t,n,o,a),o=Mt?oo:0,!R&&t!==null&&(t.flags&128)!==0)e:for(t=n.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&f0(t,a,n);else if(t.tag===19)f0(t,a,n);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break e;for(;t.sibling===null;){if(t.return===null||t.return===n)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(u){case"forwards":for(a=n.child,u=null;a!==null;)t=a.alternate,t!==null&&Al(t)===null&&(u=a),a=a.sibling;a=u,a===null?(u=n.child,n.child=null):(u=a.sibling,a.sibling=null),yf(n,!1,u,a,f,o);break;case"backwards":case"unstable_legacy-backwards":for(a=null,u=n.child,n.child=null;u!==null;){if(t=u.alternate,t!==null&&Al(t)===null){n.child=u;break}t=u.sibling,u.sibling=a,a=u,u=t}yf(n,!0,a,null,f,o);break;case"together":yf(n,!1,null,null,void 0,o);break;default:n.memoizedState=null}return n.child}function la(t,n,a){if(t!==null&&(n.dependencies=t.dependencies),ka|=n.lanes,(a&n.childLanes)===0)if(t!==null){if(es(t,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(t!==null&&n.child!==t.child)throw Error(r(153));if(n.child!==null){for(t=n.child,a=na(t,t.pendingProps),n.child=a,a.return=n;t.sibling!==null;)t=t.sibling,a=a.sibling=na(t,t.pendingProps),a.return=n;a.sibling=null}return n.child}function Ef(t,n){return(t.lanes&n)!==0?!0:(t=t.dependencies,!!(t!==null&&vl(t)))}function $x(t,n,a){switch(n.tag){case 3:Me(n,n.stateNode.containerInfo),Pa(n,gn,t.memoizedState.cache),vr();break;case 27:case 5:it(n);break;case 4:Me(n,n.stateNode.containerInfo);break;case 10:Pa(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,Yu(n),null;break;case 13:var o=n.memoizedState;if(o!==null)return o.dehydrated!==null?(Fa(n),n.flags|=128,null):(a&n.child.childLanes)!==0?u0(t,n,a):(Fa(n),t=la(t,n,a),t!==null?t.sibling:null);Fa(n);break;case 19:var u=(t.flags&128)!==0;if(o=(a&n.childLanes)!==0,o||(es(t,n,a,!1),o=(a&n.childLanes)!==0),u){if(o)return d0(t,n,a);n.flags|=128}if(u=n.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),ye(un,un.current),o)break;return null;case 22:return n.lanes=0,a0(t,n,a,n.pendingProps);case 24:Pa(n,gn,t.memoizedState.cache)}return la(t,n,a)}function h0(t,n,a){if(t!==null)if(t.memoizedProps!==n.pendingProps)vn=!0;else{if(!Ef(t,a)&&(n.flags&128)===0)return vn=!1,$x(t,n,a);vn=(t.flags&131072)!==0}else vn=!1,Mt&&(n.flags&1048576)!==0&&Wp(n,oo,n.index);switch(n.lanes=0,n.tag){case 16:e:{var o=n.pendingProps;if(t=yr(n.elementType),n.type=t,typeof t=="function")Ru(t)?(o=Ar(t,o),n.tag=1,n=l0(null,n,t,o,a)):(n.tag=0,n=gf(null,n,t,o,a));else{if(t!=null){var u=t.$$typeof;if(u===C){n.tag=11,n=t0(null,n,t,o,a);break e}else if(u===L){n.tag=14,n=n0(null,n,t,o,a);break e}}throw n=me(t)||t,Error(r(306,n,""))}}return n;case 0:return gf(t,n,n.type,n.pendingProps,a);case 1:return o=n.type,u=Ar(o,n.pendingProps),l0(t,n,o,u,a);case 3:e:{if(Me(n,n.stateNode.containerInfo),t===null)throw Error(r(387));o=n.pendingProps;var f=n.memoizedState;u=f.element,Vu(t,n),go(n,o,null,a);var x=n.memoizedState;if(o=x.cache,Pa(n,gn,o),o!==f.cache&&Iu(n,[gn],a,!0),mo(),o=x.element,f.isDehydrated)if(f={element:o,isDehydrated:!1,cache:x.cache},n.updateQueue.baseState=f,n.memoizedState=f,n.flags&256){n=c0(t,n,o,a);break e}else if(o!==u){u=gi(Error(r(424)),n),lo(u),n=c0(t,n,o,a);break e}else{switch(t=n.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(Zt=Mi(t.firstChild),wn=n,Mt=!0,La=null,xi=!0,a=am(n,null,o,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(vr(),o===u){n=la(t,n,a);break e}Un(t,n,o,a)}n=n.child}return n;case 26:return zl(t,n),t===null?(a=bg(n.type,null,n.pendingProps,null))?n.memoizedState=a:Mt||(a=n.type,t=n.pendingProps,o=ec(ae.current).createElement(a),o[pn]=n,o[Cn]=t,Nn(o,a,t),mn(o),n.stateNode=o):n.memoizedState=bg(n.type,t.memoizedProps,n.pendingProps,t.memoizedState),null;case 27:return it(n),t===null&&Mt&&(o=n.stateNode=Mg(n.type,n.pendingProps,ae.current),wn=n,xi=!0,u=Zt,Za(n.type)?(nd=u,Zt=Mi(o.firstChild)):Zt=u),Un(t,n,n.pendingProps.children,a),zl(t,n),t===null&&(n.flags|=4194304),n.child;case 5:return t===null&&Mt&&((u=o=Zt)&&(o=wS(o,n.type,n.pendingProps,xi),o!==null?(n.stateNode=o,wn=n,Zt=Mi(o.firstChild),xi=!1,u=!0):u=!1),u||Oa(n)),it(n),u=n.type,f=n.pendingProps,x=t!==null?t.memoizedProps:null,o=f.children,Jf(u,f)?o=null:x!==null&&Jf(u,x)&&(n.flags|=32),n.memoizedState!==null&&(u=Ku(t,n,Xx,null,null,a),Io._currentValue=u),zl(t,n),Un(t,n,o,a),n.child;case 6:return t===null&&Mt&&((t=a=Zt)&&(a=DS(a,n.pendingProps,xi),a!==null?(n.stateNode=a,wn=n,Zt=null,t=!0):t=!1),t||Oa(n)),null;case 13:return u0(t,n,a);case 4:return Me(n,n.stateNode.containerInfo),o=n.pendingProps,t===null?n.child=br(n,null,o,a):Un(t,n,o,a),n.child;case 11:return t0(t,n,n.type,n.pendingProps,a);case 7:return Un(t,n,n.pendingProps,a),n.child;case 8:return Un(t,n,n.pendingProps.children,a),n.child;case 12:return Un(t,n,n.pendingProps.children,a),n.child;case 10:return o=n.pendingProps,Pa(n,n.type,o.value),Un(t,n,o.children,a),n.child;case 9:return u=n.type._context,o=n.pendingProps.children,Sr(n),u=Dn(u),o=o(u),n.flags|=1,Un(t,n,o,a),n.child;case 14:return n0(t,n,n.type,n.pendingProps,a);case 15:return i0(t,n,n.type,n.pendingProps,a);case 19:return d0(t,n,a);case 31:return jx(t,n,a);case 22:return a0(t,n,a,n.pendingProps);case 24:return Sr(n),o=Dn(gn),t===null?(u=Fu(),u===null&&(u=Xt,f=zu(),u.pooledCache=f,f.refCount++,f!==null&&(u.pooledCacheLanes|=a),u=f),n.memoizedState={parent:o,cache:u},Gu(n),Pa(n,gn,u)):((t.lanes&a)!==0&&(Vu(t,n),go(n,null,null,a),mo()),u=t.memoizedState,f=n.memoizedState,u.parent!==o?(u={parent:o,cache:o},n.memoizedState=u,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=u),Pa(n,gn,o)):(o=f.cache,Pa(n,gn,o),o!==u.cache&&Iu(n,[gn],a,!0))),Un(t,n,n.pendingProps.children,a),n.child;case 29:throw n.pendingProps}throw Error(r(156,n.tag))}function ca(t){t.flags|=4}function bf(t,n,a,o,u){if((n=(t.mode&32)!==0)&&(n=!1),n){if(t.flags|=16777216,(u&335544128)===u)if(t.stateNode.complete)t.flags|=8192;else if(H0())t.flags|=8192;else throw Er=yl,Hu}else t.flags&=-16777217}function p0(t,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!wg(n))if(H0())t.flags|=8192;else throw Er=yl,Hu}function Fl(t,n){n!==null&&(t.flags|=4),t.flags&16384&&(n=t.tag!==22?Se():536870912,t.lanes|=n,ds|=n)}function yo(t,n){if(!Mt)switch(t.tailMode){case"hidden":n=t.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t.tail=null:a.sibling=null;break;case"collapsed":a=t.tail;for(var o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?n||t.tail===null?t.tail=null:t.tail.sibling=null:o.sibling=null}}function Kt(t){var n=t.alternate!==null&&t.alternate.child===t.child,a=0,o=0;if(n)for(var u=t.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags&65011712,o|=u.flags&65011712,u.return=t,u=u.sibling;else for(u=t.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=t,u=u.sibling;return t.subtreeFlags|=o,t.childLanes=a,n}function eS(t,n,a){var o=n.pendingProps;switch(Uu(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Kt(n),null;case 1:return Kt(n),null;case 3:return a=n.stateNode,o=null,t!==null&&(o=t.memoizedState.cache),n.memoizedState.cache!==o&&(n.flags|=2048),ra(gn),Fe(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(t===null||t.child===null)&&($r(n)?ca(n):t===null||t.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Lu())),Kt(n),null;case 26:var u=n.type,f=n.memoizedState;return t===null?(ca(n),f!==null?(Kt(n),p0(n,f)):(Kt(n),bf(n,u,null,o,a))):f?f!==t.memoizedState?(ca(n),Kt(n),p0(n,f)):(Kt(n),n.flags&=-16777217):(t=t.memoizedProps,t!==o&&ca(n),Kt(n),bf(n,u,t,o,a)),null;case 27:if(Qe(n),a=ae.current,u=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==o&&ca(n);else{if(!o){if(n.stateNode===null)throw Error(r(166));return Kt(n),null}t=Re.current,$r(n)?Yp(n):(t=Mg(u,o,a),n.stateNode=t,ca(n))}return Kt(n),null;case 5:if(Qe(n),u=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==o&&ca(n);else{if(!o){if(n.stateNode===null)throw Error(r(166));return Kt(n),null}if(f=Re.current,$r(n))Yp(n);else{var x=ec(ae.current);switch(f){case 1:f=x.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:f=x.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":f=x.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":f=x.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":f=x.createElement("div"),f.innerHTML="<script><\/script>",f=f.removeChild(f.firstChild);break;case"select":f=typeof o.is=="string"?x.createElement("select",{is:o.is}):x.createElement("select"),o.multiple?f.multiple=!0:o.size&&(f.size=o.size);break;default:f=typeof o.is=="string"?x.createElement(u,{is:o.is}):x.createElement(u)}}f[pn]=n,f[Cn]=o;e:for(x=n.child;x!==null;){if(x.tag===5||x.tag===6)f.appendChild(x.stateNode);else if(x.tag!==4&&x.tag!==27&&x.child!==null){x.child.return=x,x=x.child;continue}if(x===n)break e;for(;x.sibling===null;){if(x.return===null||x.return===n)break e;x=x.return}x.sibling.return=x.return,x=x.sibling}n.stateNode=f;e:switch(Nn(f,u,o),u){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break e;case"img":o=!0;break e;default:o=!1}o&&ca(n)}}return Kt(n),bf(n,n.type,t===null?null:t.memoizedProps,n.pendingProps,a),null;case 6:if(t&&n.stateNode!=null)t.memoizedProps!==o&&ca(n);else{if(typeof o!="string"&&n.stateNode===null)throw Error(r(166));if(t=ae.current,$r(n)){if(t=n.stateNode,a=n.memoizedProps,o=null,u=wn,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}t[pn]=n,t=!!(t.nodeValue===a||o!==null&&o.suppressHydrationWarning===!0||ug(t.nodeValue,a)),t||Oa(n,!0)}else t=ec(t).createTextNode(o),t[pn]=n,n.stateNode=t}return Kt(n),null;case 31:if(a=n.memoizedState,t===null||t.memoizedState!==null){if(o=$r(n),a!==null){if(t===null){if(!o)throw Error(r(318));if(t=n.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(557));t[pn]=n}else vr(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Kt(n),t=!1}else a=Lu(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),t=!0;if(!t)return n.flags&256?(oi(n),n):(oi(n),null);if((n.flags&128)!==0)throw Error(r(558))}return Kt(n),null;case 13:if(o=n.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(u=$r(n),o!==null&&o.dehydrated!==null){if(t===null){if(!u)throw Error(r(318));if(u=n.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(r(317));u[pn]=n}else vr(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Kt(n),u=!1}else u=Lu(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=u),u=!0;if(!u)return n.flags&256?(oi(n),n):(oi(n),null)}return oi(n),(n.flags&128)!==0?(n.lanes=a,n):(a=o!==null,t=t!==null&&t.memoizedState!==null,a&&(o=n.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool),f=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(f=o.memoizedState.cachePool.pool),f!==u&&(o.flags|=2048)),a!==t&&a&&(n.child.flags|=8192),Fl(n,n.updateQueue),Kt(n),null);case 4:return Fe(),t===null&&qf(n.stateNode.containerInfo),Kt(n),null;case 10:return ra(n.type),Kt(n),null;case 19:if(Q(un),o=n.memoizedState,o===null)return Kt(n),null;if(u=(n.flags&128)!==0,f=o.rendering,f===null)if(u)yo(o,!1);else{if(on!==0||t!==null&&(t.flags&128)!==0)for(t=n.child;t!==null;){if(f=Al(t),f!==null){for(n.flags|=128,yo(o,!1),t=f.updateQueue,n.updateQueue=t,Fl(n,t),n.subtreeFlags=0,t=a,a=n.child;a!==null;)Vp(a,t),a=a.sibling;return ye(un,un.current&1|2),Mt&&ia(n,o.treeForkCount),n.child}t=t.sibling}o.tail!==null&&Ft()>Xl&&(n.flags|=128,u=!0,yo(o,!1),n.lanes=4194304)}else{if(!u)if(t=Al(f),t!==null){if(n.flags|=128,u=!0,t=t.updateQueue,n.updateQueue=t,Fl(n,t),yo(o,!0),o.tail===null&&o.tailMode==="hidden"&&!f.alternate&&!Mt)return Kt(n),null}else 2*Ft()-o.renderingStartTime>Xl&&a!==536870912&&(n.flags|=128,u=!0,yo(o,!1),n.lanes=4194304);o.isBackwards?(f.sibling=n.child,n.child=f):(t=o.last,t!==null?t.sibling=f:n.child=f,o.last=f)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=Ft(),t.sibling=null,a=un.current,ye(un,u?a&1|2:a&1),Mt&&ia(n,o.treeForkCount),t):(Kt(n),null);case 22:case 23:return oi(n),qu(),o=n.memoizedState!==null,t!==null?t.memoizedState!==null!==o&&(n.flags|=8192):o&&(n.flags|=8192),o?(a&536870912)!==0&&(n.flags&128)===0&&(Kt(n),n.subtreeFlags&6&&(n.flags|=8192)):Kt(n),a=n.updateQueue,a!==null&&Fl(n,a.retryQueue),a=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==a&&(n.flags|=2048),t!==null&&Q(Mr),null;case 24:return a=null,t!==null&&(a=t.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),ra(gn),Kt(n),null;case 25:return null;case 30:return null}throw Error(r(156,n.tag))}function tS(t,n){switch(Uu(n),n.tag){case 1:return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 3:return ra(gn),Fe(),t=n.flags,(t&65536)!==0&&(t&128)===0?(n.flags=t&-65537|128,n):null;case 26:case 27:case 5:return Qe(n),null;case 31:if(n.memoizedState!==null){if(oi(n),n.alternate===null)throw Error(r(340));vr()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 13:if(oi(n),t=n.memoizedState,t!==null&&t.dehydrated!==null){if(n.alternate===null)throw Error(r(340));vr()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 19:return Q(un),null;case 4:return Fe(),null;case 10:return ra(n.type),null;case 22:case 23:return oi(n),qu(),t!==null&&Q(Mr),t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 24:return ra(gn),null;case 25:return null;default:return null}}function m0(t,n){switch(Uu(n),n.tag){case 3:ra(gn),Fe();break;case 26:case 27:case 5:Qe(n);break;case 4:Fe();break;case 31:n.memoizedState!==null&&oi(n);break;case 13:oi(n);break;case 19:Q(un);break;case 10:ra(n.type);break;case 22:case 23:oi(n),qu(),t!==null&&Q(Mr);break;case 24:ra(gn)}}function Eo(t,n){try{var a=n.updateQueue,o=a!==null?a.lastEffect:null;if(o!==null){var u=o.next;a=u;do{if((a.tag&t)===t){o=void 0;var f=a.create,x=a.inst;o=f(),x.destroy=o}a=a.next}while(a!==u)}}catch(R){zt(n,n.return,R)}}function Ga(t,n,a){try{var o=n.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var f=u.next;o=f;do{if((o.tag&t)===t){var x=o.inst,R=x.destroy;if(R!==void 0){x.destroy=void 0,u=n;var H=a,ee=R;try{ee()}catch(he){zt(u,H,he)}}}o=o.next}while(o!==f)}}catch(he){zt(n,n.return,he)}}function g0(t){var n=t.updateQueue;if(n!==null){var a=t.stateNode;try{sm(n,a)}catch(o){zt(t,t.return,o)}}}function _0(t,n,a){a.props=Ar(t.type,t.memoizedProps),a.state=t.memoizedState;try{a.componentWillUnmount()}catch(o){zt(t,n,o)}}function bo(t,n){try{var a=t.ref;if(a!==null){switch(t.tag){case 26:case 27:case 5:var o=t.stateNode;break;case 30:o=t.stateNode;break;default:o=t.stateNode}typeof a=="function"?t.refCleanup=a(o):a.current=o}}catch(u){zt(t,n,u)}}function Hi(t,n){var a=t.ref,o=t.refCleanup;if(a!==null)if(typeof o=="function")try{o()}catch(u){zt(t,n,u)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(u){zt(t,n,u)}else a.current=null}function v0(t){var n=t.type,a=t.memoizedProps,o=t.stateNode;try{e:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&o.focus();break e;case"img":a.src?o.src=a.src:a.srcSet&&(o.srcset=a.srcSet)}}catch(u){zt(t,t.return,u)}}function Tf(t,n,a){try{var o=t.stateNode;ES(o,t.type,a,n),o[Cn]=n}catch(u){zt(t,t.return,u)}}function x0(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&Za(t.type)||t.tag===4}function Af(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||x0(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&Za(t.type)||t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Rf(t,n,a){var o=t.tag;if(o===5||o===6)t=t.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(t,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(t),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=ea));else if(o!==4&&(o===27&&Za(t.type)&&(a=t.stateNode,n=null),t=t.child,t!==null))for(Rf(t,n,a),t=t.sibling;t!==null;)Rf(t,n,a),t=t.sibling}function Hl(t,n,a){var o=t.tag;if(o===5||o===6)t=t.stateNode,n?a.insertBefore(t,n):a.appendChild(t);else if(o!==4&&(o===27&&Za(t.type)&&(a=t.stateNode),t=t.child,t!==null))for(Hl(t,n,a),t=t.sibling;t!==null;)Hl(t,n,a),t=t.sibling}function S0(t){var n=t.stateNode,a=t.memoizedProps;try{for(var o=t.type,u=n.attributes;u.length;)n.removeAttributeNode(u[0]);Nn(n,o,a),n[pn]=t,n[Cn]=a}catch(f){zt(t,t.return,f)}}var ua=!1,xn=!1,Cf=!1,M0=typeof WeakSet=="function"?WeakSet:Set,An=null;function nS(t,n){if(t=t.containerInfo,Kf=oc,t=Lp(t),Su(t)){if("selectionStart"in t)var a={start:t.selectionStart,end:t.selectionEnd};else e:{a=(a=t.ownerDocument)&&a.defaultView||window;var o=a.getSelection&&a.getSelection();if(o&&o.rangeCount!==0){a=o.anchorNode;var u=o.anchorOffset,f=o.focusNode;o=o.focusOffset;try{a.nodeType,f.nodeType}catch{a=null;break e}var x=0,R=-1,H=-1,ee=0,he=0,ve=t,oe=null;t:for(;;){for(var le;ve!==a||u!==0&&ve.nodeType!==3||(R=x+u),ve!==f||o!==0&&ve.nodeType!==3||(H=x+o),ve.nodeType===3&&(x+=ve.nodeValue.length),(le=ve.firstChild)!==null;)oe=ve,ve=le;for(;;){if(ve===t)break t;if(oe===a&&++ee===u&&(R=x),oe===f&&++he===o&&(H=x),(le=ve.nextSibling)!==null)break;ve=oe,oe=ve.parentNode}ve=le}a=R===-1||H===-1?null:{start:R,end:H}}else a=null}a=a||{start:0,end:0}}else a=null;for(Qf={focusedElem:t,selectionRange:a},oc=!1,An=n;An!==null;)if(n=An,t=n.child,(n.subtreeFlags&1028)!==0&&t!==null)t.return=n,An=t;else for(;An!==null;){switch(n=An,f=n.alternate,t=n.flags,n.tag){case 0:if((t&4)!==0&&(t=n.updateQueue,t=t!==null?t.events:null,t!==null))for(a=0;a<t.length;a++)u=t[a],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&f!==null){t=void 0,a=n,u=f.memoizedProps,f=f.memoizedState,o=a.stateNode;try{var Xe=Ar(a.type,u);t=o.getSnapshotBeforeUpdate(Xe,f),o.__reactInternalSnapshotBeforeUpdate=t}catch(et){zt(a,a.return,et)}}break;case 3:if((t&1024)!==0){if(t=n.stateNode.containerInfo,a=t.nodeType,a===9)$f(t);else if(a===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":$f(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(r(163))}if(t=n.sibling,t!==null){t.return=n.return,An=t;break}An=n.return}}function y0(t,n,a){var o=a.flags;switch(a.tag){case 0:case 11:case 15:da(t,a),o&4&&Eo(5,a);break;case 1:if(da(t,a),o&4)if(t=a.stateNode,n===null)try{t.componentDidMount()}catch(x){zt(a,a.return,x)}else{var u=Ar(a.type,n.memoizedProps);n=n.memoizedState;try{t.componentDidUpdate(u,n,t.__reactInternalSnapshotBeforeUpdate)}catch(x){zt(a,a.return,x)}}o&64&&g0(a),o&512&&bo(a,a.return);break;case 3:if(da(t,a),o&64&&(t=a.updateQueue,t!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{sm(t,n)}catch(x){zt(a,a.return,x)}}break;case 27:n===null&&o&4&&S0(a);case 26:case 5:da(t,a),n===null&&o&4&&v0(a),o&512&&bo(a,a.return);break;case 12:da(t,a);break;case 31:da(t,a),o&4&&T0(t,a);break;case 13:da(t,a),o&4&&A0(t,a),o&64&&(t=a.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(a=fS.bind(null,a),US(t,a))));break;case 22:if(o=a.memoizedState!==null||ua,!o){n=n!==null&&n.memoizedState!==null||xn,u=ua;var f=xn;ua=o,(xn=n)&&!f?ha(t,a,(a.subtreeFlags&8772)!==0):da(t,a),ua=u,xn=f}break;case 30:break;default:da(t,a)}}function E0(t){var n=t.alternate;n!==null&&(t.alternate=null,E0(n)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(n=t.stateNode,n!==null&&Ca(n)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var en=null,Yn=!1;function fa(t,n,a){for(a=a.child;a!==null;)b0(t,n,a),a=a.sibling}function b0(t,n,a){if(de&&typeof de.onCommitFiberUnmount=="function")try{de.onCommitFiberUnmount(ue,a)}catch{}switch(a.tag){case 26:xn||Hi(a,n),fa(t,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:xn||Hi(a,n);var o=en,u=Yn;Za(a.type)&&(en=a.stateNode,Yn=!1),fa(t,n,a),Lo(a.stateNode),en=o,Yn=u;break;case 5:xn||Hi(a,n);case 6:if(o=en,u=Yn,en=null,fa(t,n,a),en=o,Yn=u,en!==null)if(Yn)try{(en.nodeType===9?en.body:en.nodeName==="HTML"?en.ownerDocument.body:en).removeChild(a.stateNode)}catch(f){zt(a,n,f)}else try{en.removeChild(a.stateNode)}catch(f){zt(a,n,f)}break;case 18:en!==null&&(Yn?(t=en,gg(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,a.stateNode),Ss(t)):gg(en,a.stateNode));break;case 4:o=en,u=Yn,en=a.stateNode.containerInfo,Yn=!0,fa(t,n,a),en=o,Yn=u;break;case 0:case 11:case 14:case 15:Ga(2,a,n),xn||Ga(4,a,n),fa(t,n,a);break;case 1:xn||(Hi(a,n),o=a.stateNode,typeof o.componentWillUnmount=="function"&&_0(a,n,o)),fa(t,n,a);break;case 21:fa(t,n,a);break;case 22:xn=(o=xn)||a.memoizedState!==null,fa(t,n,a),xn=o;break;default:fa(t,n,a)}}function T0(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{Ss(t)}catch(a){zt(n,n.return,a)}}}function A0(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{Ss(t)}catch(a){zt(n,n.return,a)}}function iS(t){switch(t.tag){case 31:case 13:case 19:var n=t.stateNode;return n===null&&(n=t.stateNode=new M0),n;case 22:return t=t.stateNode,n=t._retryCache,n===null&&(n=t._retryCache=new M0),n;default:throw Error(r(435,t.tag))}}function Gl(t,n){var a=iS(t);n.forEach(function(o){if(!a.has(o)){a.add(o);var u=dS.bind(null,t,o);o.then(u,u)}})}function Zn(t,n){var a=n.deletions;if(a!==null)for(var o=0;o<a.length;o++){var u=a[o],f=t,x=n,R=x;e:for(;R!==null;){switch(R.tag){case 27:if(Za(R.type)){en=R.stateNode,Yn=!1;break e}break;case 5:en=R.stateNode,Yn=!1;break e;case 3:case 4:en=R.stateNode.containerInfo,Yn=!0;break e}R=R.return}if(en===null)throw Error(r(160));b0(f,x,u),en=null,Yn=!1,f=u.alternate,f!==null&&(f.return=null),u.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)R0(n,t),n=n.sibling}var Di=null;function R0(t,n){var a=t.alternate,o=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:Zn(n,t),Kn(t),o&4&&(Ga(3,t,t.return),Eo(3,t),Ga(5,t,t.return));break;case 1:Zn(n,t),Kn(t),o&512&&(xn||a===null||Hi(a,a.return)),o&64&&ua&&(t=t.updateQueue,t!==null&&(o=t.callbacks,o!==null&&(a=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=a===null?o:a.concat(o))));break;case 26:var u=Di;if(Zn(n,t),Kn(t),o&512&&(xn||a===null||Hi(a,a.return)),o&4){var f=a!==null?a.memoizedState:null;if(o=t.memoizedState,a===null)if(o===null)if(t.stateNode===null){e:{o=t.type,a=t.memoizedProps,u=u.ownerDocument||u;t:switch(o){case"title":f=u.getElementsByTagName("title")[0],(!f||f[Ra]||f[pn]||f.namespaceURI==="http://www.w3.org/2000/svg"||f.hasAttribute("itemprop"))&&(f=u.createElement(o),u.head.insertBefore(f,u.querySelector("head > title"))),Nn(f,o,a),f[pn]=t,mn(f),o=f;break e;case"link":var x=Rg("link","href",u).get(o+(a.href||""));if(x){for(var R=0;R<x.length;R++)if(f=x[R],f.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&f.getAttribute("rel")===(a.rel==null?null:a.rel)&&f.getAttribute("title")===(a.title==null?null:a.title)&&f.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){x.splice(R,1);break t}}f=u.createElement(o),Nn(f,o,a),u.head.appendChild(f);break;case"meta":if(x=Rg("meta","content",u).get(o+(a.content||""))){for(R=0;R<x.length;R++)if(f=x[R],f.getAttribute("content")===(a.content==null?null:""+a.content)&&f.getAttribute("name")===(a.name==null?null:a.name)&&f.getAttribute("property")===(a.property==null?null:a.property)&&f.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&f.getAttribute("charset")===(a.charSet==null?null:a.charSet)){x.splice(R,1);break t}}f=u.createElement(o),Nn(f,o,a),u.head.appendChild(f);break;default:throw Error(r(468,o))}f[pn]=t,mn(f),o=f}t.stateNode=o}else Cg(u,t.type,t.stateNode);else t.stateNode=Ag(u,o,t.memoizedProps);else f!==o?(f===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):f.count--,o===null?Cg(u,t.type,t.stateNode):Ag(u,o,t.memoizedProps)):o===null&&t.stateNode!==null&&Tf(t,t.memoizedProps,a.memoizedProps)}break;case 27:Zn(n,t),Kn(t),o&512&&(xn||a===null||Hi(a,a.return)),a!==null&&o&4&&Tf(t,t.memoizedProps,a.memoizedProps);break;case 5:if(Zn(n,t),Kn(t),o&512&&(xn||a===null||Hi(a,a.return)),t.flags&32){u=t.stateNode;try{ii(u,"")}catch(Xe){zt(t,t.return,Xe)}}o&4&&t.stateNode!=null&&(u=t.memoizedProps,Tf(t,u,a!==null?a.memoizedProps:u)),o&1024&&(Cf=!0);break;case 6:if(Zn(n,t),Kn(t),o&4){if(t.stateNode===null)throw Error(r(162));o=t.memoizedProps,a=t.stateNode;try{a.nodeValue=o}catch(Xe){zt(t,t.return,Xe)}}break;case 3:if(ic=null,u=Di,Di=tc(n.containerInfo),Zn(n,t),Di=u,Kn(t),o&4&&a!==null&&a.memoizedState.isDehydrated)try{Ss(n.containerInfo)}catch(Xe){zt(t,t.return,Xe)}Cf&&(Cf=!1,C0(t));break;case 4:o=Di,Di=tc(t.stateNode.containerInfo),Zn(n,t),Kn(t),Di=o;break;case 12:Zn(n,t),Kn(t);break;case 31:Zn(n,t),Kn(t),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,Gl(t,o)));break;case 13:Zn(n,t),Kn(t),t.child.flags&8192&&t.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(kl=Ft()),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,Gl(t,o)));break;case 22:u=t.memoizedState!==null;var H=a!==null&&a.memoizedState!==null,ee=ua,he=xn;if(ua=ee||u,xn=he||H,Zn(n,t),xn=he,ua=ee,Kn(t),o&8192)e:for(n=t.stateNode,n._visibility=u?n._visibility&-2:n._visibility|1,u&&(a===null||H||ua||xn||Rr(t)),a=null,n=t;;){if(n.tag===5||n.tag===26){if(a===null){H=a=n;try{if(f=H.stateNode,u)x=f.style,typeof x.setProperty=="function"?x.setProperty("display","none","important"):x.display="none";else{R=H.stateNode;var ve=H.memoizedProps.style,oe=ve!=null&&ve.hasOwnProperty("display")?ve.display:null;R.style.display=oe==null||typeof oe=="boolean"?"":(""+oe).trim()}}catch(Xe){zt(H,H.return,Xe)}}}else if(n.tag===6){if(a===null){H=n;try{H.stateNode.nodeValue=u?"":H.memoizedProps}catch(Xe){zt(H,H.return,Xe)}}}else if(n.tag===18){if(a===null){H=n;try{var le=H.stateNode;u?_g(le,!0):_g(H.stateNode,!1)}catch(Xe){zt(H,H.return,Xe)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===t)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break e;for(;n.sibling===null;){if(n.return===null||n.return===t)break e;a===n&&(a=null),n=n.return}a===n&&(a=null),n.sibling.return=n.return,n=n.sibling}o&4&&(o=t.updateQueue,o!==null&&(a=o.retryQueue,a!==null&&(o.retryQueue=null,Gl(t,a))));break;case 19:Zn(n,t),Kn(t),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,Gl(t,o)));break;case 30:break;case 21:break;default:Zn(n,t),Kn(t)}}function Kn(t){var n=t.flags;if(n&2){try{for(var a,o=t.return;o!==null;){if(x0(o)){a=o;break}o=o.return}if(a==null)throw Error(r(160));switch(a.tag){case 27:var u=a.stateNode,f=Af(t);Hl(t,f,u);break;case 5:var x=a.stateNode;a.flags&32&&(ii(x,""),a.flags&=-33);var R=Af(t);Hl(t,R,x);break;case 3:case 4:var H=a.stateNode.containerInfo,ee=Af(t);Rf(t,ee,H);break;default:throw Error(r(161))}}catch(he){zt(t,t.return,he)}t.flags&=-3}n&4096&&(t.flags&=-4097)}function C0(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var n=t;C0(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),t=t.sibling}}function da(t,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)y0(t,n.alternate,n),n=n.sibling}function Rr(t){for(t=t.child;t!==null;){var n=t;switch(n.tag){case 0:case 11:case 14:case 15:Ga(4,n,n.return),Rr(n);break;case 1:Hi(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&_0(n,n.return,a),Rr(n);break;case 27:Lo(n.stateNode);case 26:case 5:Hi(n,n.return),Rr(n);break;case 22:n.memoizedState===null&&Rr(n);break;case 30:Rr(n);break;default:Rr(n)}t=t.sibling}}function ha(t,n,a){for(a=a&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var o=n.alternate,u=t,f=n,x=f.flags;switch(f.tag){case 0:case 11:case 15:ha(u,f,a),Eo(4,f);break;case 1:if(ha(u,f,a),o=f,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(ee){zt(o,o.return,ee)}if(o=f,u=o.updateQueue,u!==null){var R=o.stateNode;try{var H=u.shared.hiddenCallbacks;if(H!==null)for(u.shared.hiddenCallbacks=null,u=0;u<H.length;u++)rm(H[u],R)}catch(ee){zt(o,o.return,ee)}}a&&x&64&&g0(f),bo(f,f.return);break;case 27:S0(f);case 26:case 5:ha(u,f,a),a&&o===null&&x&4&&v0(f),bo(f,f.return);break;case 12:ha(u,f,a);break;case 31:ha(u,f,a),a&&x&4&&T0(u,f);break;case 13:ha(u,f,a),a&&x&4&&A0(u,f);break;case 22:f.memoizedState===null&&ha(u,f,a),bo(f,f.return);break;case 30:break;default:ha(u,f,a)}n=n.sibling}}function wf(t,n){var a=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),t=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(t=n.memoizedState.cachePool.pool),t!==a&&(t!=null&&t.refCount++,a!=null&&co(a))}function Df(t,n){t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&co(t))}function Ui(t,n,a,o){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)w0(t,n,a,o),n=n.sibling}function w0(t,n,a,o){var u=n.flags;switch(n.tag){case 0:case 11:case 15:Ui(t,n,a,o),u&2048&&Eo(9,n);break;case 1:Ui(t,n,a,o);break;case 3:Ui(t,n,a,o),u&2048&&(t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&co(t)));break;case 12:if(u&2048){Ui(t,n,a,o),t=n.stateNode;try{var f=n.memoizedProps,x=f.id,R=f.onPostCommit;typeof R=="function"&&R(x,n.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(H){zt(n,n.return,H)}}else Ui(t,n,a,o);break;case 31:Ui(t,n,a,o);break;case 13:Ui(t,n,a,o);break;case 23:break;case 22:f=n.stateNode,x=n.alternate,n.memoizedState!==null?f._visibility&2?Ui(t,n,a,o):To(t,n):f._visibility&2?Ui(t,n,a,o):(f._visibility|=2,cs(t,n,a,o,(n.subtreeFlags&10256)!==0||!1)),u&2048&&wf(x,n);break;case 24:Ui(t,n,a,o),u&2048&&Df(n.alternate,n);break;default:Ui(t,n,a,o)}}function cs(t,n,a,o,u){for(u=u&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var f=t,x=n,R=a,H=o,ee=x.flags;switch(x.tag){case 0:case 11:case 15:cs(f,x,R,H,u),Eo(8,x);break;case 23:break;case 22:var he=x.stateNode;x.memoizedState!==null?he._visibility&2?cs(f,x,R,H,u):To(f,x):(he._visibility|=2,cs(f,x,R,H,u)),u&&ee&2048&&wf(x.alternate,x);break;case 24:cs(f,x,R,H,u),u&&ee&2048&&Df(x.alternate,x);break;default:cs(f,x,R,H,u)}n=n.sibling}}function To(t,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=t,o=n,u=o.flags;switch(o.tag){case 22:To(a,o),u&2048&&wf(o.alternate,o);break;case 24:To(a,o),u&2048&&Df(o.alternate,o);break;default:To(a,o)}n=n.sibling}}var Ao=8192;function us(t,n,a){if(t.subtreeFlags&Ao)for(t=t.child;t!==null;)D0(t,n,a),t=t.sibling}function D0(t,n,a){switch(t.tag){case 26:us(t,n,a),t.flags&Ao&&t.memoizedState!==null&&kS(a,Di,t.memoizedState,t.memoizedProps);break;case 5:us(t,n,a);break;case 3:case 4:var o=Di;Di=tc(t.stateNode.containerInfo),us(t,n,a),Di=o;break;case 22:t.memoizedState===null&&(o=t.alternate,o!==null&&o.memoizedState!==null?(o=Ao,Ao=16777216,us(t,n,a),Ao=o):us(t,n,a));break;default:us(t,n,a)}}function U0(t){var n=t.alternate;if(n!==null&&(t=n.child,t!==null)){n.child=null;do n=t.sibling,t.sibling=null,t=n;while(t!==null)}}function Ro(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];An=o,L0(o,t)}U0(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)N0(t),t=t.sibling}function N0(t){switch(t.tag){case 0:case 11:case 15:Ro(t),t.flags&2048&&Ga(9,t,t.return);break;case 3:Ro(t);break;case 12:Ro(t);break;case 22:var n=t.stateNode;t.memoizedState!==null&&n._visibility&2&&(t.return===null||t.return.tag!==13)?(n._visibility&=-3,Vl(t)):Ro(t);break;default:Ro(t)}}function Vl(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];An=o,L0(o,t)}U0(t)}for(t=t.child;t!==null;){switch(n=t,n.tag){case 0:case 11:case 15:Ga(8,n,n.return),Vl(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,Vl(n));break;default:Vl(n)}t=t.sibling}}function L0(t,n){for(;An!==null;){var a=An;switch(a.tag){case 0:case 11:case 15:Ga(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var o=a.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:co(a.memoizedState.cache)}if(o=a.child,o!==null)o.return=a,An=o;else e:for(a=t;An!==null;){o=An;var u=o.sibling,f=o.return;if(E0(o),o===a){An=null;break e}if(u!==null){u.return=f,An=u;break e}An=f}}}var aS={getCacheForType:function(t){var n=Dn(gn),a=n.data.get(t);return a===void 0&&(a=t(),n.data.set(t,a)),a},cacheSignal:function(){return Dn(gn).controller.signal}},rS=typeof WeakMap=="function"?WeakMap:Map,Dt=0,Xt=null,pt=null,gt=0,It=0,li=null,Va=!1,fs=!1,Uf=!1,pa=0,on=0,ka=0,Cr=0,Nf=0,ci=0,ds=0,Co=null,Qn=null,Lf=!1,kl=0,O0=0,Xl=1/0,Wl=null,Xa=null,En=0,Wa=null,hs=null,ma=0,Of=0,Pf=null,P0=null,wo=0,If=null;function ui(){return(Dt&2)!==0&&gt!==0?gt&-gt:B.T!==null?Vf():Js()}function I0(){if(ci===0)if((gt&536870912)===0||Mt){var t=at;at<<=1,(at&3932160)===0&&(at=262144),ci=t}else ci=536870912;return t=si.current,t!==null&&(t.flags|=32),ci}function Jn(t,n,a){(t===Xt&&(It===2||It===9)||t.cancelPendingCommit!==null)&&(ps(t,0),qa(t,gt,ci,!1)),Ge(t,a),((Dt&2)===0||t!==Xt)&&(t===Xt&&((Dt&2)===0&&(Cr|=a),on===4&&qa(t,gt,ci,!1)),Gi(t))}function z0(t,n,a){if((Dt&6)!==0)throw Error(r(327));var o=!a&&(n&127)===0&&(n&t.expiredLanes)===0||Ce(t,n),u=o?lS(t,n):Bf(t,n,!0),f=o;do{if(u===0){fs&&!o&&qa(t,n,0,!1);break}else{if(a=t.current.alternate,f&&!sS(a)){u=Bf(t,n,!1),f=!1;continue}if(u===2){if(f=n,t.errorRecoveryDisabledLanes&f)var x=0;else x=t.pendingLanes&-536870913,x=x!==0?x:x&536870912?536870912:0;if(x!==0){n=x;e:{var R=t;u=Co;var H=R.current.memoizedState.isDehydrated;if(H&&(ps(R,x).flags|=256),x=Bf(R,x,!1),x!==2){if(Uf&&!H){R.errorRecoveryDisabledLanes|=f,Cr|=f,u=4;break e}f=Qn,Qn=u,f!==null&&(Qn===null?Qn=f:Qn.push.apply(Qn,f))}u=x}if(f=!1,u!==2)continue}}if(u===1){ps(t,0),qa(t,n,0,!0);break}e:{switch(o=t,f=u,f){case 0:case 1:throw Error(r(345));case 4:if((n&4194048)!==n)break;case 6:qa(o,n,ci,!Va);break e;case 2:Qn=null;break;case 3:case 5:break;default:throw Error(r(329))}if((n&62914560)===n&&(u=kl+300-Ft(),10<u)){if(qa(o,n,ci,!Va),pe(o,0,!0)!==0)break e;ma=n,o.timeoutHandle=pg(B0.bind(null,o,a,Qn,Wl,Lf,n,ci,Cr,ds,Va,f,"Throttled",-0,0),u);break e}B0(o,a,Qn,Wl,Lf,n,ci,Cr,ds,Va,f,null,-0,0)}}break}while(!0);Gi(t)}function B0(t,n,a,o,u,f,x,R,H,ee,he,ve,oe,le){if(t.timeoutHandle=-1,ve=n.subtreeFlags,ve&8192||(ve&16785408)===16785408){ve={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:ea},D0(n,f,ve);var Xe=(f&62914560)===f?kl-Ft():(f&4194048)===f?O0-Ft():0;if(Xe=XS(ve,Xe),Xe!==null){ma=f,t.cancelPendingCommit=Xe(q0.bind(null,t,n,f,a,o,u,x,R,H,he,ve,null,oe,le)),qa(t,f,x,!ee);return}}q0(t,n,f,a,o,u,x,R,H)}function sS(t){for(var n=t;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var o=0;o<a.length;o++){var u=a[o],f=u.getSnapshot;u=u.value;try{if(!ai(f(),u))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function qa(t,n,a,o){n&=~Nf,n&=~Cr,t.suspendedLanes|=n,t.pingedLanes&=~n,o&&(t.warmLanes|=n),o=t.expirationTimes;for(var u=n;0<u;){var f=31-ze(u),x=1<<f;o[f]=-1,u&=~x}a!==0&&Nt(t,a,n)}function ql(){return(Dt&6)===0?(Do(0),!1):!0}function zf(){if(pt!==null){if(It===0)var t=pt.return;else t=pt,aa=xr=null,ju(t),as=null,fo=0,t=pt;for(;t!==null;)m0(t.alternate,t),t=t.return;pt=null}}function ps(t,n){var a=t.timeoutHandle;a!==-1&&(t.timeoutHandle=-1,AS(a)),a=t.cancelPendingCommit,a!==null&&(t.cancelPendingCommit=null,a()),ma=0,zf(),Xt=t,pt=a=na(t.current,null),gt=n,It=0,li=null,Va=!1,fs=Ce(t,n),Uf=!1,ds=ci=Nf=Cr=ka=on=0,Qn=Co=null,Lf=!1,(n&8)!==0&&(n|=n&32);var o=t.entangledLanes;if(o!==0)for(t=t.entanglements,o&=n;0<o;){var u=31-ze(o),f=1<<u;n|=t[u],o&=~f}return pa=n,hl(),a}function F0(t,n){lt=null,B.H=So,n===is||n===Ml?(n=tm(),It=3):n===Hu?(n=tm(),It=4):It=n===mf?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,li=n,pt===null&&(on=1,Pl(t,gi(n,t.current)))}function H0(){var t=si.current;return t===null?!0:(gt&4194048)===gt?Si===null:(gt&62914560)===gt||(gt&536870912)!==0?t===Si:!1}function G0(){var t=B.H;return B.H=So,t===null?So:t}function V0(){var t=B.A;return B.A=aS,t}function Yl(){on=4,Va||(gt&4194048)!==gt&&si.current!==null||(fs=!0),(ka&134217727)===0&&(Cr&134217727)===0||Xt===null||qa(Xt,gt,ci,!1)}function Bf(t,n,a){var o=Dt;Dt|=2;var u=G0(),f=V0();(Xt!==t||gt!==n)&&(Wl=null,ps(t,n)),n=!1;var x=on;e:do try{if(It!==0&&pt!==null){var R=pt,H=li;switch(It){case 8:zf(),x=6;break e;case 3:case 2:case 9:case 6:si.current===null&&(n=!0);var ee=It;if(It=0,li=null,ms(t,R,H,ee),a&&fs){x=0;break e}break;default:ee=It,It=0,li=null,ms(t,R,H,ee)}}oS(),x=on;break}catch(he){F0(t,he)}while(!0);return n&&t.shellSuspendCounter++,aa=xr=null,Dt=o,B.H=u,B.A=f,pt===null&&(Xt=null,gt=0,hl()),x}function oS(){for(;pt!==null;)k0(pt)}function lS(t,n){var a=Dt;Dt|=2;var o=G0(),u=V0();Xt!==t||gt!==n?(Wl=null,Xl=Ft()+500,ps(t,n)):fs=Ce(t,n);e:do try{if(It!==0&&pt!==null){n=pt;var f=li;t:switch(It){case 1:It=0,li=null,ms(t,n,f,1);break;case 2:case 9:if($p(f)){It=0,li=null,X0(n);break}n=function(){It!==2&&It!==9||Xt!==t||(It=7),Gi(t)},f.then(n,n);break e;case 3:It=7;break e;case 4:It=5;break e;case 7:$p(f)?(It=0,li=null,X0(n)):(It=0,li=null,ms(t,n,f,7));break;case 5:var x=null;switch(pt.tag){case 26:x=pt.memoizedState;case 5:case 27:var R=pt;if(x?wg(x):R.stateNode.complete){It=0,li=null;var H=R.sibling;if(H!==null)pt=H;else{var ee=R.return;ee!==null?(pt=ee,Zl(ee)):pt=null}break t}}It=0,li=null,ms(t,n,f,5);break;case 6:It=0,li=null,ms(t,n,f,6);break;case 8:zf(),on=6;break e;default:throw Error(r(462))}}cS();break}catch(he){F0(t,he)}while(!0);return aa=xr=null,B.H=o,B.A=u,Dt=a,pt!==null?0:(Xt=null,gt=0,hl(),on)}function cS(){for(;pt!==null&&!rn();)k0(pt)}function k0(t){var n=h0(t.alternate,t,pa);t.memoizedProps=t.pendingProps,n===null?Zl(t):pt=n}function X0(t){var n=t,a=n.alternate;switch(n.tag){case 15:case 0:n=o0(a,n,n.pendingProps,n.type,void 0,gt);break;case 11:n=o0(a,n,n.pendingProps,n.type.render,n.ref,gt);break;case 5:ju(n);default:m0(a,n),n=pt=Vp(n,pa),n=h0(a,n,pa)}t.memoizedProps=t.pendingProps,n===null?Zl(t):pt=n}function ms(t,n,a,o){aa=xr=null,ju(n),as=null,fo=0;var u=n.return;try{if(Jx(t,u,n,a,gt)){on=1,Pl(t,gi(a,t.current)),pt=null;return}}catch(f){if(u!==null)throw pt=u,f;on=1,Pl(t,gi(a,t.current)),pt=null;return}n.flags&32768?(Mt||o===1?t=!0:fs||(gt&536870912)!==0?t=!1:(Va=t=!0,(o===2||o===9||o===3||o===6)&&(o=si.current,o!==null&&o.tag===13&&(o.flags|=16384))),W0(n,t)):Zl(n)}function Zl(t){var n=t;do{if((n.flags&32768)!==0){W0(n,Va);return}t=n.return;var a=eS(n.alternate,n,pa);if(a!==null){pt=a;return}if(n=n.sibling,n!==null){pt=n;return}pt=n=t}while(n!==null);on===0&&(on=5)}function W0(t,n){do{var a=tS(t.alternate,t);if(a!==null){a.flags&=32767,pt=a;return}if(a=t.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(t=t.sibling,t!==null)){pt=t;return}pt=t=a}while(t!==null);on=6,pt=null}function q0(t,n,a,o,u,f,x,R,H){t.cancelPendingCommit=null;do Kl();while(En!==0);if((Dt&6)!==0)throw Error(r(327));if(n!==null){if(n===t.current)throw Error(r(177));if(f=n.lanes|n.childLanes,f|=Tu,Jt(t,a,f,x,R,H),t===Xt&&(pt=Xt=null,gt=0),hs=n,Wa=t,ma=a,Of=f,Pf=u,P0=o,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,hS(J,function(){return J0(),null})):(t.callbackNode=null,t.callbackPriority=0),o=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||o){o=B.T,B.T=null,u=G.p,G.p=2,x=Dt,Dt|=4;try{nS(t,n,a)}finally{Dt=x,G.p=u,B.T=o}}En=1,Y0(),Z0(),K0()}}function Y0(){if(En===1){En=0;var t=Wa,n=hs,a=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||a){a=B.T,B.T=null;var o=G.p;G.p=2;var u=Dt;Dt|=4;try{R0(n,t);var f=Qf,x=Lp(t.containerInfo),R=f.focusedElem,H=f.selectionRange;if(x!==R&&R&&R.ownerDocument&&Np(R.ownerDocument.documentElement,R)){if(H!==null&&Su(R)){var ee=H.start,he=H.end;if(he===void 0&&(he=ee),"selectionStart"in R)R.selectionStart=ee,R.selectionEnd=Math.min(he,R.value.length);else{var ve=R.ownerDocument||document,oe=ve&&ve.defaultView||window;if(oe.getSelection){var le=oe.getSelection(),Xe=R.textContent.length,et=Math.min(H.start,Xe),Vt=H.end===void 0?et:Math.min(H.end,Xe);!le.extend&&et>Vt&&(x=Vt,Vt=et,et=x);var Z=Up(R,et),V=Up(R,Vt);if(Z&&V&&(le.rangeCount!==1||le.anchorNode!==Z.node||le.anchorOffset!==Z.offset||le.focusNode!==V.node||le.focusOffset!==V.offset)){var $=ve.createRange();$.setStart(Z.node,Z.offset),le.removeAllRanges(),et>Vt?(le.addRange($),le.extend(V.node,V.offset)):($.setEnd(V.node,V.offset),le.addRange($))}}}}for(ve=[],le=R;le=le.parentNode;)le.nodeType===1&&ve.push({element:le,left:le.scrollLeft,top:le.scrollTop});for(typeof R.focus=="function"&&R.focus(),R=0;R<ve.length;R++){var _e=ve[R];_e.element.scrollLeft=_e.left,_e.element.scrollTop=_e.top}}oc=!!Kf,Qf=Kf=null}finally{Dt=u,G.p=o,B.T=a}}t.current=n,En=2}}function Z0(){if(En===2){En=0;var t=Wa,n=hs,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=B.T,B.T=null;var o=G.p;G.p=2;var u=Dt;Dt|=4;try{y0(t,n.alternate,n)}finally{Dt=u,G.p=o,B.T=a}}En=3}}function K0(){if(En===4||En===3){En=0,Y();var t=Wa,n=hs,a=ma,o=P0;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?En=5:(En=0,hs=Wa=null,Q0(t,t.pendingLanes));var u=t.pendingLanes;if(u===0&&(Xa=null),Qs(a),n=n.stateNode,de&&typeof de.onCommitFiberRoot=="function")try{de.onCommitFiberRoot(ue,n,void 0,(n.current.flags&128)===128)}catch{}if(o!==null){n=B.T,u=G.p,G.p=2,B.T=null;try{for(var f=t.onRecoverableError,x=0;x<o.length;x++){var R=o[x];f(R.value,{componentStack:R.stack})}}finally{B.T=n,G.p=u}}(ma&3)!==0&&Kl(),Gi(t),u=t.pendingLanes,(a&261930)!==0&&(u&42)!==0?t===If?wo++:(wo=0,If=t):wo=0,Do(0)}}function Q0(t,n){(t.pooledCacheLanes&=n)===0&&(n=t.pooledCache,n!=null&&(t.pooledCache=null,co(n)))}function Kl(){return Y0(),Z0(),K0(),J0()}function J0(){if(En!==5)return!1;var t=Wa,n=Of;Of=0;var a=Qs(ma),o=B.T,u=G.p;try{G.p=32>a?32:a,B.T=null,a=Pf,Pf=null;var f=Wa,x=ma;if(En=0,hs=Wa=null,ma=0,(Dt&6)!==0)throw Error(r(331));var R=Dt;if(Dt|=4,N0(f.current),w0(f,f.current,x,a),Dt=R,Do(0,!1),de&&typeof de.onPostCommitFiberRoot=="function")try{de.onPostCommitFiberRoot(ue,f)}catch{}return!0}finally{G.p=u,B.T=o,Q0(t,n)}}function j0(t,n,a){n=gi(a,n),n=pf(t.stateNode,n,2),t=Ba(t,n,2),t!==null&&(Ge(t,2),Gi(t))}function zt(t,n,a){if(t.tag===3)j0(t,t,a);else for(;n!==null;){if(n.tag===3){j0(n,t,a);break}else if(n.tag===1){var o=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(Xa===null||!Xa.has(o))){t=gi(a,t),a=$m(2),o=Ba(n,a,2),o!==null&&(e0(a,o,n,t),Ge(o,2),Gi(o));break}}n=n.return}}function Ff(t,n,a){var o=t.pingCache;if(o===null){o=t.pingCache=new rS;var u=new Set;o.set(n,u)}else u=o.get(n),u===void 0&&(u=new Set,o.set(n,u));u.has(a)||(Uf=!0,u.add(a),t=uS.bind(null,t,n,a),n.then(t,t))}function uS(t,n,a){var o=t.pingCache;o!==null&&o.delete(n),t.pingedLanes|=t.suspendedLanes&a,t.warmLanes&=~a,Xt===t&&(gt&a)===a&&(on===4||on===3&&(gt&62914560)===gt&&300>Ft()-kl?(Dt&2)===0&&ps(t,0):Nf|=a,ds===gt&&(ds=0)),Gi(t)}function $0(t,n){n===0&&(n=Se()),t=gr(t,n),t!==null&&(Ge(t,n),Gi(t))}function fS(t){var n=t.memoizedState,a=0;n!==null&&(a=n.retryLane),$0(t,a)}function dS(t,n){var a=0;switch(t.tag){case 31:case 13:var o=t.stateNode,u=t.memoizedState;u!==null&&(a=u.retryLane);break;case 19:o=t.stateNode;break;case 22:o=t.stateNode._retryCache;break;default:throw Error(r(314))}o!==null&&o.delete(n),$0(t,a)}function hS(t,n){return cn(t,n)}var Ql=null,gs=null,Hf=!1,Jl=!1,Gf=!1,Ya=0;function Gi(t){t!==gs&&t.next===null&&(gs===null?Ql=gs=t:gs=gs.next=t),Jl=!0,Hf||(Hf=!0,mS())}function Do(t,n){if(!Gf&&Jl){Gf=!0;do for(var a=!1,o=Ql;o!==null;){if(t!==0){var u=o.pendingLanes;if(u===0)var f=0;else{var x=o.suspendedLanes,R=o.pingedLanes;f=(1<<31-ze(42|t)+1)-1,f&=u&~(x&~R),f=f&201326741?f&201326741|1:f?f|2:0}f!==0&&(a=!0,ig(o,f))}else f=gt,f=pe(o,o===Xt?f:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(f&3)===0||Ce(o,f)||(a=!0,ig(o,f));o=o.next}while(a);Gf=!1}}function pS(){eg()}function eg(){Jl=Hf=!1;var t=0;Ya!==0&&TS()&&(t=Ya);for(var n=Ft(),a=null,o=Ql;o!==null;){var u=o.next,f=tg(o,n);f===0?(o.next=null,a===null?Ql=u:a.next=u,u===null&&(gs=a)):(a=o,(t!==0||(f&3)!==0)&&(Jl=!0)),o=u}En!==0&&En!==5||Do(t),Ya!==0&&(Ya=0)}function tg(t,n){for(var a=t.suspendedLanes,o=t.pingedLanes,u=t.expirationTimes,f=t.pendingLanes&-62914561;0<f;){var x=31-ze(f),R=1<<x,H=u[x];H===-1?((R&a)===0||(R&o)!==0)&&(u[x]=Ie(R,n)):H<=n&&(t.expiredLanes|=R),f&=~R}if(n=Xt,a=gt,a=pe(t,t===n?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),o=t.callbackNode,a===0||t===n&&(It===2||It===9)||t.cancelPendingCommit!==null)return o!==null&&o!==null&&Wt(o),t.callbackNode=null,t.callbackPriority=0;if((a&3)===0||Ce(t,a)){if(n=a&-a,n===t.callbackPriority)return n;switch(o!==null&&Wt(o),Qs(a)){case 2:case 8:a=E;break;case 32:a=J;break;case 268435456:a=fe;break;default:a=J}return o=ng.bind(null,t),a=cn(a,o),t.callbackPriority=n,t.callbackNode=a,n}return o!==null&&o!==null&&Wt(o),t.callbackPriority=2,t.callbackNode=null,2}function ng(t,n){if(En!==0&&En!==5)return t.callbackNode=null,t.callbackPriority=0,null;var a=t.callbackNode;if(Kl()&&t.callbackNode!==a)return null;var o=gt;return o=pe(t,t===Xt?o:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),o===0?null:(z0(t,o,n),tg(t,Ft()),t.callbackNode!=null&&t.callbackNode===a?ng.bind(null,t):null)}function ig(t,n){if(Kl())return null;z0(t,n,!0)}function mS(){RS(function(){(Dt&6)!==0?cn(O,pS):eg()})}function Vf(){if(Ya===0){var t=ts;t===0&&(t=Je,Je<<=1,(Je&261888)===0&&(Je=256)),Ya=t}return Ya}function ag(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:dr(""+t)}function rg(t,n){var a=n.ownerDocument.createElement("input");return a.name=n.name,a.value=n.value,t.id&&a.setAttribute("form",t.id),n.parentNode.insertBefore(a,n),t=new FormData(t),a.parentNode.removeChild(a),t}function gS(t,n,a,o,u){if(n==="submit"&&a&&a.stateNode===u){var f=ag((u[Cn]||null).action),x=o.submitter;x&&(n=(n=x[Cn]||null)?ag(n.formAction):x.getAttribute("formAction"),n!==null&&(f=n,x=null));var R=new cl("action","action",null,o,u);t.push({event:R,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(Ya!==0){var H=x?rg(u,x):new FormData(u);lf(a,{pending:!0,data:H,method:u.method,action:f},null,H)}}else typeof f=="function"&&(R.preventDefault(),H=x?rg(u,x):new FormData(u),lf(a,{pending:!0,data:H,method:u.method,action:f},f,H))},currentTarget:u}]})}}for(var kf=0;kf<bu.length;kf++){var Xf=bu[kf],_S=Xf.toLowerCase(),vS=Xf[0].toUpperCase()+Xf.slice(1);wi(_S,"on"+vS)}wi(Ip,"onAnimationEnd"),wi(zp,"onAnimationIteration"),wi(Bp,"onAnimationStart"),wi("dblclick","onDoubleClick"),wi("focusin","onFocus"),wi("focusout","onBlur"),wi(Ox,"onTransitionRun"),wi(Px,"onTransitionStart"),wi(Ix,"onTransitionCancel"),wi(Fp,"onTransitionEnd"),se("onMouseEnter",["mouseout","mouseover"]),se("onMouseLeave",["mouseout","mouseover"]),se("onPointerEnter",["pointerout","pointerover"]),se("onPointerLeave",["pointerout","pointerover"]),q("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),q("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),q("onBeforeInput",["compositionend","keypress","textInput","paste"]),q("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),q("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),q("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Uo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),xS=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Uo));function sg(t,n){n=(n&4)!==0;for(var a=0;a<t.length;a++){var o=t[a],u=o.event;o=o.listeners;e:{var f=void 0;if(n)for(var x=o.length-1;0<=x;x--){var R=o[x],H=R.instance,ee=R.currentTarget;if(R=R.listener,H!==f&&u.isPropagationStopped())break e;f=R,u.currentTarget=ee;try{f(u)}catch(he){dl(he)}u.currentTarget=null,f=H}else for(x=0;x<o.length;x++){if(R=o[x],H=R.instance,ee=R.currentTarget,R=R.listener,H!==f&&u.isPropagationStopped())break e;f=R,u.currentTarget=ee;try{f(u)}catch(he){dl(he)}u.currentTarget=null,f=H}}}}function mt(t,n){var a=n[cr];a===void 0&&(a=n[cr]=new Set);var o=t+"__bubble";a.has(o)||(og(n,t,2,!1),a.add(o))}function Wf(t,n,a){var o=0;n&&(o|=4),og(a,t,o,n)}var jl="_reactListening"+Math.random().toString(36).slice(2);function qf(t){if(!t[jl]){t[jl]=!0,rl.forEach(function(a){a!=="selectionchange"&&(xS.has(a)||Wf(a,!1,t),Wf(a,!0,t))});var n=t.nodeType===9?t:t.ownerDocument;n===null||n[jl]||(n[jl]=!0,Wf("selectionchange",!1,n))}}function og(t,n,a,o){switch(Ig(n)){case 2:var u=YS;break;case 8:u=ZS;break;default:u=od}a=u.bind(null,n,a,t),u=void 0,!fu||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(u=!0),o?u!==void 0?t.addEventListener(n,a,{capture:!0,passive:u}):t.addEventListener(n,a,!0):u!==void 0?t.addEventListener(n,a,{passive:u}):t.addEventListener(n,a,!1)}function Yf(t,n,a,o,u){var f=o;if((n&1)===0&&(n&2)===0&&o!==null)e:for(;;){if(o===null)return;var x=o.tag;if(x===3||x===4){var R=o.stateNode.containerInfo;if(R===u)break;if(x===4)for(x=o.return;x!==null;){var H=x.tag;if((H===3||H===4)&&x.stateNode.containerInfo===u)return;x=x.return}for(;R!==null;){if(x=ji(R),x===null)return;if(H=x.tag,H===5||H===6||H===26||H===27){o=f=x;continue e}R=R.parentNode}}o=o.return}dp(function(){var ee=f,he=cu(a),ve=[];e:{var oe=Hp.get(t);if(oe!==void 0){var le=cl,Xe=t;switch(t){case"keypress":if(ol(a)===0)break e;case"keydown":case"keyup":le=dx;break;case"focusin":Xe="focus",le=mu;break;case"focusout":Xe="blur",le=mu;break;case"beforeblur":case"afterblur":le=mu;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":le=mp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":le=ex;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":le=mx;break;case Ip:case zp:case Bp:le=ix;break;case Fp:le=_x;break;case"scroll":case"scrollend":le=jv;break;case"wheel":le=xx;break;case"copy":case"cut":case"paste":le=rx;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":le=_p;break;case"toggle":case"beforetoggle":le=Mx}var et=(n&4)!==0,Vt=!et&&(t==="scroll"||t==="scrollend"),Z=et?oe!==null?oe+"Capture":null:oe;et=[];for(var V=ee,$;V!==null;){var _e=V;if($=_e.stateNode,_e=_e.tag,_e!==5&&_e!==26&&_e!==27||$===null||Z===null||(_e=js(V,Z),_e!=null&&et.push(No(V,_e,$))),Vt)break;V=V.return}0<et.length&&(oe=new le(oe,Xe,null,a,he),ve.push({event:oe,listeners:et}))}}if((n&7)===0){e:{if(oe=t==="mouseover"||t==="pointerover",le=t==="mouseout"||t==="pointerout",oe&&a!==lu&&(Xe=a.relatedTarget||a.fromElement)&&(ji(Xe)||Xe[Wn]))break e;if((le||oe)&&(oe=he.window===he?he:(oe=he.ownerDocument)?oe.defaultView||oe.parentWindow:window,le?(Xe=a.relatedTarget||a.toElement,le=ee,Xe=Xe?ji(Xe):null,Xe!==null&&(Vt=c(Xe),et=Xe.tag,Xe!==Vt||et!==5&&et!==27&&et!==6)&&(Xe=null)):(le=null,Xe=ee),le!==Xe)){if(et=mp,_e="onMouseLeave",Z="onMouseEnter",V="mouse",(t==="pointerout"||t==="pointerover")&&(et=_p,_e="onPointerLeave",Z="onPointerEnter",V="pointer"),Vt=le==null?oe:fr(le),$=Xe==null?oe:fr(Xe),oe=new et(_e,V+"leave",le,a,he),oe.target=Vt,oe.relatedTarget=$,_e=null,ji(he)===ee&&(et=new et(Z,V+"enter",Xe,a,he),et.target=$,et.relatedTarget=Vt,_e=et),Vt=_e,le&&Xe)t:{for(et=SS,Z=le,V=Xe,$=0,_e=Z;_e;_e=et(_e))$++;_e=0;for(var $e=V;$e;$e=et($e))_e++;for(;0<$-_e;)Z=et(Z),$--;for(;0<_e-$;)V=et(V),_e--;for(;$--;){if(Z===V||V!==null&&Z===V.alternate){et=Z;break t}Z=et(Z),V=et(V)}et=null}else et=null;le!==null&&lg(ve,oe,le,et,!1),Xe!==null&&Vt!==null&&lg(ve,Vt,Xe,et,!0)}}e:{if(oe=ee?fr(ee):window,le=oe.nodeName&&oe.nodeName.toLowerCase(),le==="select"||le==="input"&&oe.type==="file")var Rt=Tp;else if(Ep(oe))if(Ap)Rt=Ux;else{Rt=wx;var qe=Cx}else le=oe.nodeName,!le||le.toLowerCase()!=="input"||oe.type!=="checkbox"&&oe.type!=="radio"?ee&&Ut(ee.elementType)&&(Rt=Tp):Rt=Dx;if(Rt&&(Rt=Rt(t,ee))){bp(ve,Rt,a,he);break e}qe&&qe(t,oe,ee),t==="focusout"&&ee&&oe.type==="number"&&ee.memoizedProps.value!=null&&ht(oe,"number",oe.value)}switch(qe=ee?fr(ee):window,t){case"focusin":(Ep(qe)||qe.contentEditable==="true")&&(Yr=qe,Mu=ee,so=null);break;case"focusout":so=Mu=Yr=null;break;case"mousedown":yu=!0;break;case"contextmenu":case"mouseup":case"dragend":yu=!1,Op(ve,a,he);break;case"selectionchange":if(Lx)break;case"keydown":case"keyup":Op(ve,a,he)}var ct;if(_u)e:{switch(t){case"compositionstart":var _t="onCompositionStart";break e;case"compositionend":_t="onCompositionEnd";break e;case"compositionupdate":_t="onCompositionUpdate";break e}_t=void 0}else qr?Mp(t,a)&&(_t="onCompositionEnd"):t==="keydown"&&a.keyCode===229&&(_t="onCompositionStart");_t&&(vp&&a.locale!=="ko"&&(qr||_t!=="onCompositionStart"?_t==="onCompositionEnd"&&qr&&(ct=hp()):(Ua=he,du="value"in Ua?Ua.value:Ua.textContent,qr=!0)),qe=$l(ee,_t),0<qe.length&&(_t=new gp(_t,t,null,a,he),ve.push({event:_t,listeners:qe}),ct?_t.data=ct:(ct=yp(a),ct!==null&&(_t.data=ct)))),(ct=Ex?bx(t,a):Tx(t,a))&&(_t=$l(ee,"onBeforeInput"),0<_t.length&&(qe=new gp("onBeforeInput","beforeinput",null,a,he),ve.push({event:qe,listeners:_t}),qe.data=ct)),gS(ve,t,ee,a,he)}sg(ve,n)})}function No(t,n,a){return{instance:t,listener:n,currentTarget:a}}function $l(t,n){for(var a=n+"Capture",o=[];t!==null;){var u=t,f=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||f===null||(u=js(t,a),u!=null&&o.unshift(No(t,u,f)),u=js(t,n),u!=null&&o.push(No(t,u,f))),t.tag===3)return o;t=t.return}return[]}function SS(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function lg(t,n,a,o,u){for(var f=n._reactName,x=[];a!==null&&a!==o;){var R=a,H=R.alternate,ee=R.stateNode;if(R=R.tag,H!==null&&H===o)break;R!==5&&R!==26&&R!==27||ee===null||(H=ee,u?(ee=js(a,f),ee!=null&&x.unshift(No(a,ee,H))):u||(ee=js(a,f),ee!=null&&x.push(No(a,ee,H)))),a=a.return}x.length!==0&&t.push({event:n,listeners:x})}var MS=/\r\n?/g,yS=/\u0000|\uFFFD/g;function cg(t){return(typeof t=="string"?t:""+t).replace(MS,`
`).replace(yS,"")}function ug(t,n){return n=cg(n),cg(t)===n}function Gt(t,n,a,o,u,f){switch(a){case"children":typeof o=="string"?n==="body"||n==="textarea"&&o===""||ii(t,o):(typeof o=="number"||typeof o=="bigint")&&n!=="body"&&ii(t,""+o);break;case"className":ke(t,"class",o);break;case"tabIndex":ke(t,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":ke(t,a,o);break;case"style":Ci(t,o,f);break;case"data":if(n!=="object"){ke(t,"data",o);break}case"src":case"href":if(o===""&&(n!=="a"||a!=="href")){t.removeAttribute(a);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){t.removeAttribute(a);break}o=dr(""+o),t.setAttribute(a,o);break;case"action":case"formAction":if(typeof o=="function"){t.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof f=="function"&&(a==="formAction"?(n!=="input"&&Gt(t,n,"name",u.name,u,null),Gt(t,n,"formEncType",u.formEncType,u,null),Gt(t,n,"formMethod",u.formMethod,u,null),Gt(t,n,"formTarget",u.formTarget,u,null)):(Gt(t,n,"encType",u.encType,u,null),Gt(t,n,"method",u.method,u,null),Gt(t,n,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){t.removeAttribute(a);break}o=dr(""+o),t.setAttribute(a,o);break;case"onClick":o!=null&&(t.onclick=ea);break;case"onScroll":o!=null&&mt("scroll",t);break;case"onScrollEnd":o!=null&&mt("scrollend",t);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(r(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(r(60));t.innerHTML=a}}break;case"multiple":t.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":t.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){t.removeAttribute("xlink:href");break}a=dr(""+o),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,""+o):t.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,""):t.removeAttribute(a);break;case"capture":case"download":o===!0?t.setAttribute(a,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,o):t.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?t.setAttribute(a,o):t.removeAttribute(a);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?t.removeAttribute(a):t.setAttribute(a,o);break;case"popover":mt("beforetoggle",t),mt("toggle",t),Ue(t,"popover",o);break;case"xlinkActuate":Ve(t,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":Ve(t,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":Ve(t,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":Ve(t,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":Ve(t,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":Ve(t,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":Ve(t,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":Ve(t,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":Ve(t,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":Ue(t,"is",o);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=zi.get(a)||a,Ue(t,a,o))}}function Zf(t,n,a,o,u,f){switch(a){case"style":Ci(t,o,f);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(r(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(r(60));t.innerHTML=a}}break;case"children":typeof o=="string"?ii(t,o):(typeof o=="number"||typeof o=="bigint")&&ii(t,""+o);break;case"onScroll":o!=null&&mt("scroll",t);break;case"onScrollEnd":o!=null&&mt("scrollend",t);break;case"onClick":o!=null&&(t.onclick=ea);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!A.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(u=a.endsWith("Capture"),n=a.slice(2,u?a.length-7:void 0),f=t[Cn]||null,f=f!=null?f[a]:null,typeof f=="function"&&t.removeEventListener(n,f,u),typeof o=="function")){typeof f!="function"&&f!==null&&(a in t?t[a]=null:t.hasAttribute(a)&&t.removeAttribute(a)),t.addEventListener(n,o,u);break e}a in t?t[a]=o:o===!0?t.setAttribute(a,""):Ue(t,a,o)}}}function Nn(t,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":mt("error",t),mt("load",t);var o=!1,u=!1,f;for(f in a)if(a.hasOwnProperty(f)){var x=a[f];if(x!=null)switch(f){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(r(137,n));default:Gt(t,n,f,x,a,null)}}u&&Gt(t,n,"srcSet",a.srcSet,a,null),o&&Gt(t,n,"src",a.src,a,null);return;case"input":mt("invalid",t);var R=f=x=u=null,H=null,ee=null;for(o in a)if(a.hasOwnProperty(o)){var he=a[o];if(he!=null)switch(o){case"name":u=he;break;case"type":x=he;break;case"checked":H=he;break;case"defaultChecked":ee=he;break;case"value":f=he;break;case"defaultValue":R=he;break;case"children":case"dangerouslySetInnerHTML":if(he!=null)throw Error(r(137,n));break;default:Gt(t,n,o,he,a,null)}}Pn(t,f,R,H,ee,x,u,!1);return;case"select":mt("invalid",t),o=x=f=null;for(u in a)if(a.hasOwnProperty(u)&&(R=a[u],R!=null))switch(u){case"value":f=R;break;case"defaultValue":x=R;break;case"multiple":o=R;default:Gt(t,n,u,R,a,null)}n=f,a=x,t.multiple=!!o,n!=null?yn(t,!!o,n,!1):a!=null&&yn(t,!!o,a,!0);return;case"textarea":mt("invalid",t),f=u=o=null;for(x in a)if(a.hasOwnProperty(x)&&(R=a[x],R!=null))switch(x){case"value":o=R;break;case"defaultValue":u=R;break;case"children":f=R;break;case"dangerouslySetInnerHTML":if(R!=null)throw Error(r(91));break;default:Gt(t,n,x,R,a,null)}Ri(t,o,u,f);return;case"option":for(H in a)if(a.hasOwnProperty(H)&&(o=a[H],o!=null))switch(H){case"selected":t.selected=o&&typeof o!="function"&&typeof o!="symbol";break;default:Gt(t,n,H,o,a,null)}return;case"dialog":mt("beforetoggle",t),mt("toggle",t),mt("cancel",t),mt("close",t);break;case"iframe":case"object":mt("load",t);break;case"video":case"audio":for(o=0;o<Uo.length;o++)mt(Uo[o],t);break;case"image":mt("error",t),mt("load",t);break;case"details":mt("toggle",t);break;case"embed":case"source":case"link":mt("error",t),mt("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(ee in a)if(a.hasOwnProperty(ee)&&(o=a[ee],o!=null))switch(ee){case"children":case"dangerouslySetInnerHTML":throw Error(r(137,n));default:Gt(t,n,ee,o,a,null)}return;default:if(Ut(n)){for(he in a)a.hasOwnProperty(he)&&(o=a[he],o!==void 0&&Zf(t,n,he,o,a,void 0));return}}for(R in a)a.hasOwnProperty(R)&&(o=a[R],o!=null&&Gt(t,n,R,o,a,null))}function ES(t,n,a,o){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,f=null,x=null,R=null,H=null,ee=null,he=null;for(le in a){var ve=a[le];if(a.hasOwnProperty(le)&&ve!=null)switch(le){case"checked":break;case"value":break;case"defaultValue":H=ve;default:o.hasOwnProperty(le)||Gt(t,n,le,null,o,ve)}}for(var oe in o){var le=o[oe];if(ve=a[oe],o.hasOwnProperty(oe)&&(le!=null||ve!=null))switch(oe){case"type":f=le;break;case"name":u=le;break;case"checked":ee=le;break;case"defaultChecked":he=le;break;case"value":x=le;break;case"defaultValue":R=le;break;case"children":case"dangerouslySetInnerHTML":if(le!=null)throw Error(r(137,n));break;default:le!==ve&&Gt(t,n,oe,le,o,ve)}}Be(t,x,R,H,ee,he,f,u);return;case"select":le=x=R=oe=null;for(f in a)if(H=a[f],a.hasOwnProperty(f)&&H!=null)switch(f){case"value":break;case"multiple":le=H;default:o.hasOwnProperty(f)||Gt(t,n,f,null,o,H)}for(u in o)if(f=o[u],H=a[u],o.hasOwnProperty(u)&&(f!=null||H!=null))switch(u){case"value":oe=f;break;case"defaultValue":R=f;break;case"multiple":x=f;default:f!==H&&Gt(t,n,u,f,o,H)}n=R,a=x,o=le,oe!=null?yn(t,!!a,oe,!1):!!o!=!!a&&(n!=null?yn(t,!!a,n,!0):yn(t,!!a,a?[]:"",!1));return;case"textarea":le=oe=null;for(R in a)if(u=a[R],a.hasOwnProperty(R)&&u!=null&&!o.hasOwnProperty(R))switch(R){case"value":break;case"children":break;default:Gt(t,n,R,null,o,u)}for(x in o)if(u=o[x],f=a[x],o.hasOwnProperty(x)&&(u!=null||f!=null))switch(x){case"value":oe=u;break;case"defaultValue":le=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(r(91));break;default:u!==f&&Gt(t,n,x,u,o,f)}ni(t,oe,le);return;case"option":for(var Xe in a)if(oe=a[Xe],a.hasOwnProperty(Xe)&&oe!=null&&!o.hasOwnProperty(Xe))switch(Xe){case"selected":t.selected=!1;break;default:Gt(t,n,Xe,null,o,oe)}for(H in o)if(oe=o[H],le=a[H],o.hasOwnProperty(H)&&oe!==le&&(oe!=null||le!=null))switch(H){case"selected":t.selected=oe&&typeof oe!="function"&&typeof oe!="symbol";break;default:Gt(t,n,H,oe,o,le)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var et in a)oe=a[et],a.hasOwnProperty(et)&&oe!=null&&!o.hasOwnProperty(et)&&Gt(t,n,et,null,o,oe);for(ee in o)if(oe=o[ee],le=a[ee],o.hasOwnProperty(ee)&&oe!==le&&(oe!=null||le!=null))switch(ee){case"children":case"dangerouslySetInnerHTML":if(oe!=null)throw Error(r(137,n));break;default:Gt(t,n,ee,oe,o,le)}return;default:if(Ut(n)){for(var Vt in a)oe=a[Vt],a.hasOwnProperty(Vt)&&oe!==void 0&&!o.hasOwnProperty(Vt)&&Zf(t,n,Vt,void 0,o,oe);for(he in o)oe=o[he],le=a[he],!o.hasOwnProperty(he)||oe===le||oe===void 0&&le===void 0||Zf(t,n,he,oe,o,le);return}}for(var Z in a)oe=a[Z],a.hasOwnProperty(Z)&&oe!=null&&!o.hasOwnProperty(Z)&&Gt(t,n,Z,null,o,oe);for(ve in o)oe=o[ve],le=a[ve],!o.hasOwnProperty(ve)||oe===le||oe==null&&le==null||Gt(t,n,ve,oe,o,le)}function fg(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function bS(){if(typeof performance.getEntriesByType=="function"){for(var t=0,n=0,a=performance.getEntriesByType("resource"),o=0;o<a.length;o++){var u=a[o],f=u.transferSize,x=u.initiatorType,R=u.duration;if(f&&R&&fg(x)){for(x=0,R=u.responseEnd,o+=1;o<a.length;o++){var H=a[o],ee=H.startTime;if(ee>R)break;var he=H.transferSize,ve=H.initiatorType;he&&fg(ve)&&(H=H.responseEnd,x+=he*(H<R?1:(R-ee)/(H-ee)))}if(--o,n+=8*(f+x)/(u.duration/1e3),t++,10<t)break}}if(0<t)return n/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var Kf=null,Qf=null;function ec(t){return t.nodeType===9?t:t.ownerDocument}function dg(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function hg(t,n){if(t===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&n==="foreignObject"?0:t}function Jf(t,n){return t==="textarea"||t==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var jf=null;function TS(){var t=window.event;return t&&t.type==="popstate"?t===jf?!1:(jf=t,!0):(jf=null,!1)}var pg=typeof setTimeout=="function"?setTimeout:void 0,AS=typeof clearTimeout=="function"?clearTimeout:void 0,mg=typeof Promise=="function"?Promise:void 0,RS=typeof queueMicrotask=="function"?queueMicrotask:typeof mg<"u"?function(t){return mg.resolve(null).then(t).catch(CS)}:pg;function CS(t){setTimeout(function(){throw t})}function Za(t){return t==="head"}function gg(t,n){var a=n,o=0;do{var u=a.nextSibling;if(t.removeChild(a),u&&u.nodeType===8)if(a=u.data,a==="/$"||a==="/&"){if(o===0){t.removeChild(u),Ss(n);return}o--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")o++;else if(a==="html")Lo(t.ownerDocument.documentElement);else if(a==="head"){a=t.ownerDocument.head,Lo(a);for(var f=a.firstChild;f;){var x=f.nextSibling,R=f.nodeName;f[Ra]||R==="SCRIPT"||R==="STYLE"||R==="LINK"&&f.rel.toLowerCase()==="stylesheet"||a.removeChild(f),f=x}}else a==="body"&&Lo(t.ownerDocument.body);a=u}while(a);Ss(n)}function _g(t,n){var a=t;t=0;do{var o=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(t===0)break;t--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||t++;a=o}while(a)}function $f(t){var n=t.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":$f(a),Ca(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}t.removeChild(a)}}function wS(t,n,a,o){for(;t.nodeType===1;){var u=a;if(t.nodeName.toLowerCase()!==n.toLowerCase()){if(!o&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(o){if(!t[Ra])switch(n){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(f=t.getAttribute("rel"),f==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(f!==u.rel||t.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||t.getAttribute("title")!==(u.title==null?null:u.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(f=t.getAttribute("src"),(f!==(u.src==null?null:u.src)||t.getAttribute("type")!==(u.type==null?null:u.type)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&f&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(n==="input"&&t.type==="hidden"){var f=u.name==null?null:""+u.name;if(u.type==="hidden"&&t.getAttribute("name")===f)return t}else return t;if(t=Mi(t.nextSibling),t===null)break}return null}function DS(t,n,a){if(n==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!a||(t=Mi(t.nextSibling),t===null))return null;return t}function vg(t,n){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=Mi(t.nextSibling),t===null))return null;return t}function ed(t){return t.data==="$?"||t.data==="$~"}function td(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function US(t,n){var a=t.ownerDocument;if(t.data==="$~")t._reactRetry=n;else if(t.data!=="$?"||a.readyState!=="loading")n();else{var o=function(){n(),a.removeEventListener("DOMContentLoaded",o)};a.addEventListener("DOMContentLoaded",o),t._reactRetry=o}}function Mi(t){for(;t!=null;t=t.nextSibling){var n=t.nodeType;if(n===1||n===3)break;if(n===8){if(n=t.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return t}var nd=null;function xg(t){t=t.nextSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="/$"||a==="/&"){if(n===0)return Mi(t.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}t=t.nextSibling}return null}function Sg(t){t=t.previousSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return t;n--}else a!=="/$"&&a!=="/&"||n++}t=t.previousSibling}return null}function Mg(t,n,a){switch(n=ec(a),t){case"html":if(t=n.documentElement,!t)throw Error(r(452));return t;case"head":if(t=n.head,!t)throw Error(r(453));return t;case"body":if(t=n.body,!t)throw Error(r(454));return t;default:throw Error(r(451))}}function Lo(t){for(var n=t.attributes;n.length;)t.removeAttributeNode(n[0]);Ca(t)}var yi=new Map,yg=new Set;function tc(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var ga=G.d;G.d={f:NS,r:LS,D:OS,C:PS,L:IS,m:zS,X:FS,S:BS,M:HS};function NS(){var t=ga.f(),n=ql();return t||n}function LS(t){var n=$i(t);n!==null&&n.tag===5&&n.type==="form"?Fm(n):ga.r(t)}var _s=typeof document>"u"?null:document;function Eg(t,n,a){var o=_s;if(o&&typeof n=="string"&&n){var u=Ot(n);u='link[rel="'+t+'"][href="'+u+'"]',typeof a=="string"&&(u+='[crossorigin="'+a+'"]'),yg.has(u)||(yg.add(u),t={rel:t,crossOrigin:a,href:n},o.querySelector(u)===null&&(n=o.createElement("link"),Nn(n,"link",t),mn(n),o.head.appendChild(n)))}}function OS(t){ga.D(t),Eg("dns-prefetch",t,null)}function PS(t,n){ga.C(t,n),Eg("preconnect",t,n)}function IS(t,n,a){ga.L(t,n,a);var o=_s;if(o&&t&&n){var u='link[rel="preload"][as="'+Ot(n)+'"]';n==="image"&&a&&a.imageSrcSet?(u+='[imagesrcset="'+Ot(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(u+='[imagesizes="'+Ot(a.imageSizes)+'"]')):u+='[href="'+Ot(t)+'"]';var f=u;switch(n){case"style":f=vs(t);break;case"script":f=xs(t)}yi.has(f)||(t=v({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:t,as:n},a),yi.set(f,t),o.querySelector(u)!==null||n==="style"&&o.querySelector(Oo(f))||n==="script"&&o.querySelector(Po(f))||(n=o.createElement("link"),Nn(n,"link",t),mn(n),o.head.appendChild(n)))}}function zS(t,n){ga.m(t,n);var a=_s;if(a&&t){var o=n&&typeof n.as=="string"?n.as:"script",u='link[rel="modulepreload"][as="'+Ot(o)+'"][href="'+Ot(t)+'"]',f=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":f=xs(t)}if(!yi.has(f)&&(t=v({rel:"modulepreload",href:t},n),yi.set(f,t),a.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Po(f)))return}o=a.createElement("link"),Nn(o,"link",t),mn(o),a.head.appendChild(o)}}}function BS(t,n,a){ga.S(t,n,a);var o=_s;if(o&&t){var u=wa(o).hoistableStyles,f=vs(t);n=n||"default";var x=u.get(f);if(!x){var R={loading:0,preload:null};if(x=o.querySelector(Oo(f)))R.loading=5;else{t=v({rel:"stylesheet",href:t,"data-precedence":n},a),(a=yi.get(f))&&id(t,a);var H=x=o.createElement("link");mn(H),Nn(H,"link",t),H._p=new Promise(function(ee,he){H.onload=ee,H.onerror=he}),H.addEventListener("load",function(){R.loading|=1}),H.addEventListener("error",function(){R.loading|=2}),R.loading|=4,nc(x,n,o)}x={type:"stylesheet",instance:x,count:1,state:R},u.set(f,x)}}}function FS(t,n){ga.X(t,n);var a=_s;if(a&&t){var o=wa(a).hoistableScripts,u=xs(t),f=o.get(u);f||(f=a.querySelector(Po(u)),f||(t=v({src:t,async:!0},n),(n=yi.get(u))&&ad(t,n),f=a.createElement("script"),mn(f),Nn(f,"link",t),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},o.set(u,f))}}function HS(t,n){ga.M(t,n);var a=_s;if(a&&t){var o=wa(a).hoistableScripts,u=xs(t),f=o.get(u);f||(f=a.querySelector(Po(u)),f||(t=v({src:t,async:!0,type:"module"},n),(n=yi.get(u))&&ad(t,n),f=a.createElement("script"),mn(f),Nn(f,"link",t),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},o.set(u,f))}}function bg(t,n,a,o){var u=(u=ae.current)?tc(u):null;if(!u)throw Error(r(446));switch(t){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(n=vs(a.href),a=wa(u).hoistableStyles,o=a.get(n),o||(o={type:"style",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){t=vs(a.href);var f=wa(u).hoistableStyles,x=f.get(t);if(x||(u=u.ownerDocument||u,x={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},f.set(t,x),(f=u.querySelector(Oo(t)))&&!f._p&&(x.instance=f,x.state.loading=5),yi.has(t)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},yi.set(t,a),f||GS(u,t,a,x.state))),n&&o===null)throw Error(r(528,""));return x}if(n&&o!==null)throw Error(r(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=xs(a),a=wa(u).hoistableScripts,o=a.get(n),o||(o={type:"script",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(r(444,t))}}function vs(t){return'href="'+Ot(t)+'"'}function Oo(t){return'link[rel="stylesheet"]['+t+"]"}function Tg(t){return v({},t,{"data-precedence":t.precedence,precedence:null})}function GS(t,n,a,o){t.querySelector('link[rel="preload"][as="style"]['+n+"]")?o.loading=1:(n=t.createElement("link"),o.preload=n,n.addEventListener("load",function(){return o.loading|=1}),n.addEventListener("error",function(){return o.loading|=2}),Nn(n,"link",a),mn(n),t.head.appendChild(n))}function xs(t){return'[src="'+Ot(t)+'"]'}function Po(t){return"script[async]"+t}function Ag(t,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var o=t.querySelector('style[data-href~="'+Ot(a.href)+'"]');if(o)return n.instance=o,mn(o),o;var u=v({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return o=(t.ownerDocument||t).createElement("style"),mn(o),Nn(o,"style",u),nc(o,a.precedence,t),n.instance=o;case"stylesheet":u=vs(a.href);var f=t.querySelector(Oo(u));if(f)return n.state.loading|=4,n.instance=f,mn(f),f;o=Tg(a),(u=yi.get(u))&&id(o,u),f=(t.ownerDocument||t).createElement("link"),mn(f);var x=f;return x._p=new Promise(function(R,H){x.onload=R,x.onerror=H}),Nn(f,"link",o),n.state.loading|=4,nc(f,a.precedence,t),n.instance=f;case"script":return f=xs(a.src),(u=t.querySelector(Po(f)))?(n.instance=u,mn(u),u):(o=a,(u=yi.get(f))&&(o=v({},a),ad(o,u)),t=t.ownerDocument||t,u=t.createElement("script"),mn(u),Nn(u,"link",o),t.head.appendChild(u),n.instance=u);case"void":return null;default:throw Error(r(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(o=n.instance,n.state.loading|=4,nc(o,a.precedence,t));return n.instance}function nc(t,n,a){for(var o=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,f=u,x=0;x<o.length;x++){var R=o[x];if(R.dataset.precedence===n)f=R;else if(f!==u)break}f?f.parentNode.insertBefore(t,f.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(t,n.firstChild))}function id(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.title==null&&(t.title=n.title)}function ad(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.integrity==null&&(t.integrity=n.integrity)}var ic=null;function Rg(t,n,a){if(ic===null){var o=new Map,u=ic=new Map;u.set(a,o)}else u=ic,o=u.get(a),o||(o=new Map,u.set(a,o));if(o.has(t))return o;for(o.set(t,null),a=a.getElementsByTagName(t),u=0;u<a.length;u++){var f=a[u];if(!(f[Ra]||f[pn]||t==="link"&&f.getAttribute("rel")==="stylesheet")&&f.namespaceURI!=="http://www.w3.org/2000/svg"){var x=f.getAttribute(n)||"";x=t+x;var R=o.get(x);R?R.push(f):o.set(x,[f])}}return o}function Cg(t,n,a){t=t.ownerDocument||t,t.head.insertBefore(a,n==="title"?t.querySelector("head > title"):null)}function VS(t,n,a){if(a===1||n.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;switch(n.rel){case"stylesheet":return t=n.disabled,typeof n.precedence=="string"&&t==null;default:return!0}case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function wg(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function kS(t,n,a,o){if(a.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var u=vs(o.href),f=n.querySelector(Oo(u));if(f){n=f._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(t.count++,t=ac.bind(t),n.then(t,t)),a.state.loading|=4,a.instance=f,mn(f);return}f=n.ownerDocument||n,o=Tg(o),(u=yi.get(u))&&id(o,u),f=f.createElement("link"),mn(f);var x=f;x._p=new Promise(function(R,H){x.onload=R,x.onerror=H}),Nn(f,"link",o),a.instance=f}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(t.count++,a=ac.bind(t),n.addEventListener("load",a),n.addEventListener("error",a))}}var rd=0;function XS(t,n){return t.stylesheets&&t.count===0&&sc(t,t.stylesheets),0<t.count||0<t.imgCount?function(a){var o=setTimeout(function(){if(t.stylesheets&&sc(t,t.stylesheets),t.unsuspend){var f=t.unsuspend;t.unsuspend=null,f()}},6e4+n);0<t.imgBytes&&rd===0&&(rd=62500*bS());var u=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&sc(t,t.stylesheets),t.unsuspend)){var f=t.unsuspend;t.unsuspend=null,f()}},(t.imgBytes>rd?50:800)+n);return t.unsuspend=a,function(){t.unsuspend=null,clearTimeout(o),clearTimeout(u)}}:null}function ac(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)sc(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var rc=null;function sc(t,n){t.stylesheets=null,t.unsuspend!==null&&(t.count++,rc=new Map,n.forEach(WS,t),rc=null,ac.call(t))}function WS(t,n){if(!(n.state.loading&4)){var a=rc.get(t);if(a)var o=a.get(null);else{a=new Map,rc.set(t,a);for(var u=t.querySelectorAll("link[data-precedence],style[data-precedence]"),f=0;f<u.length;f++){var x=u[f];(x.nodeName==="LINK"||x.getAttribute("media")!=="not all")&&(a.set(x.dataset.precedence,x),o=x)}o&&a.set(null,o)}u=n.instance,x=u.getAttribute("data-precedence"),f=a.get(x)||o,f===o&&a.set(null,u),a.set(x,u),this.count++,o=ac.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),f?f.parentNode.insertBefore(u,f.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(u,t.firstChild)),n.state.loading|=4}}var Io={$$typeof:P,Provider:null,Consumer:null,_currentValue:te,_currentValue2:te,_threadCount:0};function qS(t,n,a,o,u,f,x,R,H){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=We(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=We(0),this.hiddenUpdates=We(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=f,this.onRecoverableError=x,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=H,this.incompleteTransitions=new Map}function Dg(t,n,a,o,u,f,x,R,H,ee,he,ve){return t=new qS(t,n,a,x,H,ee,he,ve,R),n=1,f===!0&&(n|=24),f=ri(3,null,null,n),t.current=f,f.stateNode=t,n=zu(),n.refCount++,t.pooledCache=n,n.refCount++,f.memoizedState={element:o,isDehydrated:a,cache:n},Gu(f),t}function Ug(t){return t?(t=Qr,t):Qr}function Ng(t,n,a,o,u,f){u=Ug(u),o.context===null?o.context=u:o.pendingContext=u,o=za(n),o.payload={element:a},f=f===void 0?null:f,f!==null&&(o.callback=f),a=Ba(t,o,n),a!==null&&(Jn(a,t,n),po(a,t,n))}function Lg(t,n){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var a=t.retryLane;t.retryLane=a!==0&&a<n?a:n}}function sd(t,n){Lg(t,n),(t=t.alternate)&&Lg(t,n)}function Og(t){if(t.tag===13||t.tag===31){var n=gr(t,67108864);n!==null&&Jn(n,t,67108864),sd(t,67108864)}}function Pg(t){if(t.tag===13||t.tag===31){var n=ui();n=Ks(n);var a=gr(t,n);a!==null&&Jn(a,t,n),sd(t,n)}}var oc=!0;function YS(t,n,a,o){var u=B.T;B.T=null;var f=G.p;try{G.p=2,od(t,n,a,o)}finally{G.p=f,B.T=u}}function ZS(t,n,a,o){var u=B.T;B.T=null;var f=G.p;try{G.p=8,od(t,n,a,o)}finally{G.p=f,B.T=u}}function od(t,n,a,o){if(oc){var u=ld(o);if(u===null)Yf(t,n,o,lc,a),zg(t,o);else if(QS(u,t,n,a,o))o.stopPropagation();else if(zg(t,o),n&4&&-1<KS.indexOf(t)){for(;u!==null;){var f=$i(u);if(f!==null)switch(f.tag){case 3:if(f=f.stateNode,f.current.memoizedState.isDehydrated){var x=Te(f.pendingLanes);if(x!==0){var R=f;for(R.pendingLanes|=2,R.entangledLanes|=2;x;){var H=1<<31-ze(x);R.entanglements[1]|=H,x&=~H}Gi(f),(Dt&6)===0&&(Xl=Ft()+500,Do(0))}}break;case 31:case 13:R=gr(f,2),R!==null&&Jn(R,f,2),ql(),sd(f,2)}if(f=ld(o),f===null&&Yf(t,n,o,lc,a),f===u)break;u=f}u!==null&&o.stopPropagation()}else Yf(t,n,o,null,a)}}function ld(t){return t=cu(t),cd(t)}var lc=null;function cd(t){if(lc=null,t=ji(t),t!==null){var n=c(t);if(n===null)t=null;else{var a=n.tag;if(a===13){if(t=d(n),t!==null)return t;t=null}else if(a===31){if(t=p(n),t!==null)return t;t=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;t=null}else n!==t&&(t=null)}}return lc=t,null}function Ig(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(wt()){case O:return 2;case E:return 8;case J:case re:return 32;case fe:return 268435456;default:return 32}default:return 32}}var ud=!1,Ka=null,Qa=null,Ja=null,zo=new Map,Bo=new Map,ja=[],KS="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function zg(t,n){switch(t){case"focusin":case"focusout":Ka=null;break;case"dragenter":case"dragleave":Qa=null;break;case"mouseover":case"mouseout":Ja=null;break;case"pointerover":case"pointerout":zo.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Bo.delete(n.pointerId)}}function Fo(t,n,a,o,u,f){return t===null||t.nativeEvent!==f?(t={blockedOn:n,domEventName:a,eventSystemFlags:o,nativeEvent:f,targetContainers:[u]},n!==null&&(n=$i(n),n!==null&&Og(n)),t):(t.eventSystemFlags|=o,n=t.targetContainers,u!==null&&n.indexOf(u)===-1&&n.push(u),t)}function QS(t,n,a,o,u){switch(n){case"focusin":return Ka=Fo(Ka,t,n,a,o,u),!0;case"dragenter":return Qa=Fo(Qa,t,n,a,o,u),!0;case"mouseover":return Ja=Fo(Ja,t,n,a,o,u),!0;case"pointerover":var f=u.pointerId;return zo.set(f,Fo(zo.get(f)||null,t,n,a,o,u)),!0;case"gotpointercapture":return f=u.pointerId,Bo.set(f,Fo(Bo.get(f)||null,t,n,a,o,u)),!0}return!1}function Bg(t){var n=ji(t.target);if(n!==null){var a=c(n);if(a!==null){if(n=a.tag,n===13){if(n=d(a),n!==null){t.blockedOn=n,kr(t.priority,function(){Pg(a)});return}}else if(n===31){if(n=p(a),n!==null){t.blockedOn=n,kr(t.priority,function(){Pg(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){t.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}t.blockedOn=null}function cc(t){if(t.blockedOn!==null)return!1;for(var n=t.targetContainers;0<n.length;){var a=ld(t.nativeEvent);if(a===null){a=t.nativeEvent;var o=new a.constructor(a.type,a);lu=o,a.target.dispatchEvent(o),lu=null}else return n=$i(a),n!==null&&Og(n),t.blockedOn=a,!1;n.shift()}return!0}function Fg(t,n,a){cc(t)&&a.delete(n)}function JS(){ud=!1,Ka!==null&&cc(Ka)&&(Ka=null),Qa!==null&&cc(Qa)&&(Qa=null),Ja!==null&&cc(Ja)&&(Ja=null),zo.forEach(Fg),Bo.forEach(Fg)}function uc(t,n){t.blockedOn===n&&(t.blockedOn=null,ud||(ud=!0,s.unstable_scheduleCallback(s.unstable_NormalPriority,JS)))}var fc=null;function Hg(t){fc!==t&&(fc=t,s.unstable_scheduleCallback(s.unstable_NormalPriority,function(){fc===t&&(fc=null);for(var n=0;n<t.length;n+=3){var a=t[n],o=t[n+1],u=t[n+2];if(typeof o!="function"){if(cd(o||a)===null)continue;break}var f=$i(a);f!==null&&(t.splice(n,3),n-=3,lf(f,{pending:!0,data:u,method:a.method,action:o},o,u))}}))}function Ss(t){function n(H){return uc(H,t)}Ka!==null&&uc(Ka,t),Qa!==null&&uc(Qa,t),Ja!==null&&uc(Ja,t),zo.forEach(n),Bo.forEach(n);for(var a=0;a<ja.length;a++){var o=ja[a];o.blockedOn===t&&(o.blockedOn=null)}for(;0<ja.length&&(a=ja[0],a.blockedOn===null);)Bg(a),a.blockedOn===null&&ja.shift();if(a=(t.ownerDocument||t).$$reactFormReplay,a!=null)for(o=0;o<a.length;o+=3){var u=a[o],f=a[o+1],x=u[Cn]||null;if(typeof f=="function")x||Hg(a);else if(x){var R=null;if(f&&f.hasAttribute("formAction")){if(u=f,x=f[Cn]||null)R=x.formAction;else if(cd(u)!==null)continue}else R=x.action;typeof R=="function"?a[o+1]=R:(a.splice(o,3),o-=3),Hg(a)}}}function Gg(){function t(f){f.canIntercept&&f.info==="react-transition"&&f.intercept({handler:function(){return new Promise(function(x){return u=x})},focusReset:"manual",scroll:"manual"})}function n(){u!==null&&(u(),u=null),o||setTimeout(a,20)}function a(){if(!o&&!navigation.transition){var f=navigation.currentEntry;f&&f.url!=null&&navigation.navigate(f.url,{state:f.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,u=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){o=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),u!==null&&(u(),u=null)}}}function fd(t){this._internalRoot=t}dc.prototype.render=fd.prototype.render=function(t){var n=this._internalRoot;if(n===null)throw Error(r(409));var a=n.current,o=ui();Ng(a,o,t,n,null,null)},dc.prototype.unmount=fd.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var n=t.containerInfo;Ng(t.current,2,null,t,null,null),ql(),n[Wn]=null}};function dc(t){this._internalRoot=t}dc.prototype.unstable_scheduleHydration=function(t){if(t){var n=Js();t={blockedOn:null,target:t,priority:n};for(var a=0;a<ja.length&&n!==0&&n<ja[a].priority;a++);ja.splice(a,0,t),a===0&&Bg(t)}};var Vg=e.version;if(Vg!=="19.2.0")throw Error(r(527,Vg,"19.2.0"));G.findDOMNode=function(t){var n=t._reactInternals;if(n===void 0)throw typeof t.render=="function"?Error(r(188)):(t=Object.keys(t).join(","),Error(r(268,t)));return t=h(n),t=t!==null?_(t):null,t=t===null?null:t.stateNode,t};var jS={bundleType:0,version:"19.2.0",rendererPackageName:"react-dom",currentDispatcherRef:B,reconcilerVersion:"19.2.0"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var hc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!hc.isDisabled&&hc.supportsFiber)try{ue=hc.inject(jS),de=hc}catch{}}return Go.createRoot=function(t,n){if(!l(t))throw Error(r(299));var a=!1,o="",u=Km,f=Qm,x=Jm;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(u=n.onUncaughtError),n.onCaughtError!==void 0&&(f=n.onCaughtError),n.onRecoverableError!==void 0&&(x=n.onRecoverableError)),n=Dg(t,1,!1,null,null,a,o,null,u,f,x,Gg),t[Wn]=n.current,qf(t),new fd(n)},Go.hydrateRoot=function(t,n,a){if(!l(t))throw Error(r(299));var o=!1,u="",f=Km,x=Qm,R=Jm,H=null;return a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(u=a.identifierPrefix),a.onUncaughtError!==void 0&&(f=a.onUncaughtError),a.onCaughtError!==void 0&&(x=a.onCaughtError),a.onRecoverableError!==void 0&&(R=a.onRecoverableError),a.formState!==void 0&&(H=a.formState)),n=Dg(t,1,!0,n,a??null,o,u,H,f,x,R,Gg),n.context=Ug(null),a=n.current,o=ui(),o=Ks(o),u=za(o),u.callback=null,Ba(a,u,o),a=o,n.current.lanes=a,Ge(n,a),Gi(n),t[Wn]=n.current,qf(t),new dc(n)},Go.version="19.2.0",Go}var jg;function uM(){if(jg)return pd.exports;jg=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(e){console.error(e)}}return s(),pd.exports=cM(),pd.exports}var fM=uM();const $g=[-1,0,1],ov=100,lv=28,dM=54,hM=2.4,vd=118;function pM(s){let e=s>>>0;return()=>(e=e*1664525+1013904223>>>0,e/4294967296)}function mM(s){const e=pM(s.seed+s.nextId),i=[...$g].sort(()=>e()-.5),r=s.gate>=3&&e()>.48?2:1,l=i.slice(0,r),c=$g.filter(h=>!l.includes(h)),d=c[Math.floor(e()*c.length)];let p=s.nextId;const m=[];for(const h of l){const _=p++;m.push({id:_,kind:"blocker",lane:h,z:vd,resolved:!1}),m.push({id:p++,kind:"warning",lane:h,z:vd-12,resolved:!1})}return m.push({id:p++,kind:"pickup",lane:d,z:vd-5,resolved:!1}),{objects:m,nextId:p}}function cv(s=1){return{phase:"start",seed:s,lane:0,score:0,distance:0,gate:1,energy:ov,multiplier:1,speed:lv,spawnClock:0,nextId:1,objects:[]}}function e_(s){return{...cv(s.seed),phase:"playing"}}function gM(s,e){return s.phase!=="playing"?s:{...s,lane:Math.max(-1,Math.min(1,s.lane+e))}}function _M(s){return s.phase==="playing"?{...s,phase:"paused"}:s.phase==="paused"?{...s,phase:"playing"}:s}function vM(s,e){if(s.phase!=="playing")return{state:s,events:[]};const i=Math.min(50,Math.max(0,e))/1e3,r=Math.min(dM,lv+s.distance/240),l=s.distance+r*i*.32,c=Math.floor(l/500)+1,d=c>s.gate?["gate"]:[];let p=Math.max(0,s.energy-i*(1.7+r*.018)),m=s.multiplier,h=s.objects.map(b=>({...b,z:b.z-r*i}));h=h.map(b=>b.resolved||b.kind==="warning"||b.z>hM?b:b.z<-8?{...b,resolved:!0}:b.lane!==s.lane?{...b,resolved:!0}:(b.kind==="pickup"?(p=Math.min(ov,p+14),m=Math.min(4,Number((m+.2).toFixed(1))),d.push("collect")):b.kind==="blocker"&&(p=Math.max(0,p-26),m=1,d.push("hit")),{...b,resolved:!0})),h=h.filter(b=>b.z>=-8);const _=Math.max(.72,1.32-r*.009);let v=s.spawnClock+i,g=s.nextId;if(v>=_){v-=_;const b=mM({...s,gate:c,nextId:g});h.push(...b.objects),g=b.nextId}let y=s.phase;return p<=0&&(y="gameover",d.includes("gameover")||d.push("gameover")),{state:{...s,phase:y,speed:r,distance:l,gate:c,energy:p,multiplier:m,score:s.score+r*i*2.2*m,spawnClock:v,nextId:g,objects:h},events:d}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Wh="185",xM=0,t_=1,SM=2,Gc=1,MM=2,Ko=3,lr=0,jn=1,pi=2,Ea=0,Is=1,Br=2,n_=3,i_=4,yM=5,Or=100,EM=101,bM=102,TM=103,AM=104,RM=200,CM=201,wM=202,DM=203,$d=204,eh=205,UM=206,NM=207,LM=208,OM=209,PM=210,IM=211,zM=212,BM=213,FM=214,th=0,nh=1,ih=2,Gs=3,ah=4,rh=5,sh=6,oh=7,uv=0,HM=1,GM=2,Yi=0,fv=1,dv=2,hv=3,pv=4,mv=5,gv=6,_v=7,vv=300,Fr=301,Vs=302,xd=303,Sd=304,iu=306,lh=1e3,ya=1001,ch=1002,Ln=1003,VM=1004,pc=1005,Fn=1006,Md=1007,Ir=1008,Ti=1009,xv=1010,Sv=1011,jo=1012,qh=1013,Qi=1014,Wi=1015,Ta=1016,Yh=1017,Zh=1018,$o=1020,Mv=35902,yv=35899,Ev=1021,bv=1022,Pi=1023,Aa=1026,zr=1027,Tv=1028,Kh=1029,Hr=1030,Qh=1031,Jh=1033,Vc=33776,kc=33777,Xc=33778,Wc=33779,uh=35840,fh=35841,dh=35842,hh=35843,ph=36196,mh=37492,gh=37496,_h=37488,vh=37489,Yc=37490,xh=37491,Sh=37808,Mh=37809,yh=37810,Eh=37811,bh=37812,Th=37813,Ah=37814,Rh=37815,Ch=37816,wh=37817,Dh=37818,Uh=37819,Nh=37820,Lh=37821,Oh=36492,Ph=36494,Ih=36495,zh=36283,Bh=36284,Zc=36285,Fh=36286,kM=3200,a_=0,XM=1,sr="",hi="srgb",Kc="srgb-linear",Qc="linear",Bt="srgb",Ms=7680,r_=519,WM=512,qM=513,YM=514,jh=515,ZM=516,KM=517,$h=518,QM=519,s_=35044,o_="300 es",qi=2e3,Jc=2001;function JM(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function jc(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function jM(){const s=jc("canvas");return s.style.display="block",s}const l_={};function c_(...s){const e="THREE."+s.shift();console.log(e,...s)}function Av(s){const e=s[0];if(typeof e=="string"&&e.startsWith("TSL:")){const i=s[1];i&&i.isStackTrace?s[0]+=" "+i.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function tt(...s){s=Av(s);const e="THREE."+s.shift();{const i=s[0];i&&i.isStackTrace?console.warn(i.getError(e)):console.warn(e,...s)}}function bt(...s){s=Av(s);const e="THREE."+s.shift();{const i=s[0];i&&i.isStackTrace?console.error(i.getError(e)):console.error(e,...s)}}function zs(...s){const e=s.join(" ");e in l_||(l_[e]=!0,tt(...s))}function $M(s,e,i){return new Promise(function(r,l){function c(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:l();break;case s.TIMEOUT_EXPIRED:setTimeout(c,i);break;default:r()}}setTimeout(c,i)})}const ey={[th]:nh,[ih]:sh,[ah]:oh,[Gs]:rh,[nh]:th,[sh]:ih,[oh]:ah,[rh]:Gs};class Vr{addEventListener(e,i){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(i)===-1&&r[e].push(i)}hasEventListener(e,i){const r=this._listeners;return r===void 0?!1:r[e]!==void 0&&r[e].indexOf(i)!==-1}removeEventListener(e,i){const r=this._listeners;if(r===void 0)return;const l=r[e];if(l!==void 0){const c=l.indexOf(i);c!==-1&&l.splice(c,1)}}dispatchEvent(e){const i=this._listeners;if(i===void 0)return;const r=i[e.type];if(r!==void 0){e.target=this;const l=r.slice(0);for(let c=0,d=l.length;c<d;c++)l[c].call(this,e);e.target=null}}}const zn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let u_=1234567;const Bs=Math.PI/180,el=180/Math.PI;function Ws(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(zn[s&255]+zn[s>>8&255]+zn[s>>16&255]+zn[s>>24&255]+"-"+zn[e&255]+zn[e>>8&255]+"-"+zn[e>>16&15|64]+zn[e>>24&255]+"-"+zn[i&63|128]+zn[i>>8&255]+"-"+zn[i>>16&255]+zn[i>>24&255]+zn[r&255]+zn[r>>8&255]+zn[r>>16&255]+zn[r>>24&255]).toLowerCase()}function vt(s,e,i){return Math.max(e,Math.min(i,s))}function ep(s,e){return(s%e+e)%e}function ty(s,e,i,r,l){return r+(s-e)*(l-r)/(i-e)}function ny(s,e,i){return s!==e?(i-s)/(e-s):0}function Jo(s,e,i){return(1-i)*s+i*e}function iy(s,e,i,r){return Jo(s,e,1-Math.exp(-i*r))}function ay(s,e=1){return e-Math.abs(ep(s,e*2)-e)}function ry(s,e,i){return s<=e?0:s>=i?1:(s=(s-e)/(i-e),s*s*(3-2*s))}function sy(s,e,i){return s<=e?0:s>=i?1:(s=(s-e)/(i-e),s*s*s*(s*(s*6-15)+10))}function oy(s,e){return s+Math.floor(Math.random()*(e-s+1))}function ly(s,e){return s+Math.random()*(e-s)}function cy(s){return s*(.5-Math.random())}function uy(s){s!==void 0&&(u_=s);let e=u_+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function fy(s){return s*Bs}function dy(s){return s*el}function hy(s){return(s&s-1)===0&&s!==0}function py(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function my(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function gy(s,e,i,r,l){const c=Math.cos,d=Math.sin,p=c(i/2),m=d(i/2),h=c((e+r)/2),_=d((e+r)/2),v=c((e-r)/2),g=d((e-r)/2),y=c((r-e)/2),b=d((r-e)/2);switch(l){case"XYX":s.set(p*_,m*v,m*g,p*h);break;case"YZY":s.set(m*g,p*_,m*v,p*h);break;case"ZXZ":s.set(m*v,m*g,p*_,p*h);break;case"XZX":s.set(p*_,m*b,m*y,p*h);break;case"YXY":s.set(m*y,p*_,m*b,p*h);break;case"ZYZ":s.set(m*b,m*y,p*_,p*h);break;default:tt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+l)}}function Ps(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Gn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const _y={DEG2RAD:Bs,RAD2DEG:el,generateUUID:Ws,clamp:vt,euclideanModulo:ep,mapLinear:ty,inverseLerp:ny,lerp:Jo,damp:iy,pingpong:ay,smoothstep:ry,smootherstep:sy,randInt:oy,randFloat:ly,randFloatSpread:cy,seededRandom:uy,degToRad:fy,radToDeg:dy,isPowerOfTwo:hy,ceilPowerOfTwo:py,floorPowerOfTwo:my,setQuaternionFromProperEuler:gy,normalize:Gn,denormalize:Ps},sp=class sp{constructor(e=0,i=0){this.x=e,this.y=i}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,i){return this.x=e,this.y=i,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const i=this.x,r=this.y,l=e.elements;return this.x=l[0]*i+l[3]*r+l[6],this.y=l[1]*i+l[4]*r+l[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,i){return this.x=vt(this.x,e.x,i.x),this.y=vt(this.y,e.y,i.y),this}clampScalar(e,i){return this.x=vt(this.x,e,i),this.y=vt(this.y,e,i),this}clampLength(e,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(vt(r,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const r=this.dot(e)/i;return Math.acos(vt(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,r=this.y-e.y;return i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this}lerpVectors(e,i,r){return this.x=e.x+(i.x-e.x)*r,this.y=e.y+(i.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this}rotateAround(e,i){const r=Math.cos(i),l=Math.sin(i),c=this.x-e.x,d=this.y-e.y;return this.x=c*r-d*l+e.x,this.y=c*l+d*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};sp.prototype.isVector2=!0;let Et=sp;class qs{constructor(e=0,i=0,r=0,l=1){this.isQuaternion=!0,this._x=e,this._y=i,this._z=r,this._w=l}static slerpFlat(e,i,r,l,c,d,p){let m=r[l+0],h=r[l+1],_=r[l+2],v=r[l+3],g=c[d+0],y=c[d+1],b=c[d+2],w=c[d+3];if(v!==w||m!==g||h!==y||_!==b){let M=m*g+h*y+_*b+v*w;M<0&&(g=-g,y=-y,b=-b,w=-w,M=-M);let S=1-p;if(M<.9995){const D=Math.acos(M),P=Math.sin(D);S=Math.sin(S*D)/P,p=Math.sin(p*D)/P,m=m*S+g*p,h=h*S+y*p,_=_*S+b*p,v=v*S+w*p}else{m=m*S+g*p,h=h*S+y*p,_=_*S+b*p,v=v*S+w*p;const D=1/Math.sqrt(m*m+h*h+_*_+v*v);m*=D,h*=D,_*=D,v*=D}}e[i]=m,e[i+1]=h,e[i+2]=_,e[i+3]=v}static multiplyQuaternionsFlat(e,i,r,l,c,d){const p=r[l],m=r[l+1],h=r[l+2],_=r[l+3],v=c[d],g=c[d+1],y=c[d+2],b=c[d+3];return e[i]=p*b+_*v+m*y-h*g,e[i+1]=m*b+_*g+h*v-p*y,e[i+2]=h*b+_*y+p*g-m*v,e[i+3]=_*b-p*v-m*g-h*y,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,i,r,l){return this._x=e,this._y=i,this._z=r,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,i=!0){const r=e._x,l=e._y,c=e._z,d=e._order,p=Math.cos,m=Math.sin,h=p(r/2),_=p(l/2),v=p(c/2),g=m(r/2),y=m(l/2),b=m(c/2);switch(d){case"XYZ":this._x=g*_*v+h*y*b,this._y=h*y*v-g*_*b,this._z=h*_*b+g*y*v,this._w=h*_*v-g*y*b;break;case"YXZ":this._x=g*_*v+h*y*b,this._y=h*y*v-g*_*b,this._z=h*_*b-g*y*v,this._w=h*_*v+g*y*b;break;case"ZXY":this._x=g*_*v-h*y*b,this._y=h*y*v+g*_*b,this._z=h*_*b+g*y*v,this._w=h*_*v-g*y*b;break;case"ZYX":this._x=g*_*v-h*y*b,this._y=h*y*v+g*_*b,this._z=h*_*b-g*y*v,this._w=h*_*v+g*y*b;break;case"YZX":this._x=g*_*v+h*y*b,this._y=h*y*v+g*_*b,this._z=h*_*b-g*y*v,this._w=h*_*v-g*y*b;break;case"XZY":this._x=g*_*v-h*y*b,this._y=h*y*v-g*_*b,this._z=h*_*b+g*y*v,this._w=h*_*v+g*y*b;break;default:tt("Quaternion: .setFromEuler() encountered an unknown order: "+d)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,i){const r=i/2,l=Math.sin(r);return this._x=e.x*l,this._y=e.y*l,this._z=e.z*l,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const i=e.elements,r=i[0],l=i[4],c=i[8],d=i[1],p=i[5],m=i[9],h=i[2],_=i[6],v=i[10],g=r+p+v;if(g>0){const y=.5/Math.sqrt(g+1);this._w=.25/y,this._x=(_-m)*y,this._y=(c-h)*y,this._z=(d-l)*y}else if(r>p&&r>v){const y=2*Math.sqrt(1+r-p-v);this._w=(_-m)/y,this._x=.25*y,this._y=(l+d)/y,this._z=(c+h)/y}else if(p>v){const y=2*Math.sqrt(1+p-r-v);this._w=(c-h)/y,this._x=(l+d)/y,this._y=.25*y,this._z=(m+_)/y}else{const y=2*Math.sqrt(1+v-r-p);this._w=(d-l)/y,this._x=(c+h)/y,this._y=(m+_)/y,this._z=.25*y}return this._onChangeCallback(),this}setFromUnitVectors(e,i){let r=e.dot(i)+1;return r<1e-8?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*i.z-e.z*i.y,this._y=e.z*i.x-e.x*i.z,this._z=e.x*i.y-e.y*i.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(vt(this.dot(e),-1,1)))}rotateTowards(e,i){const r=this.angleTo(e);if(r===0)return this;const l=Math.min(1,i/r);return this.slerp(e,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,i){const r=e._x,l=e._y,c=e._z,d=e._w,p=i._x,m=i._y,h=i._z,_=i._w;return this._x=r*_+d*p+l*h-c*m,this._y=l*_+d*m+c*p-r*h,this._z=c*_+d*h+r*m-l*p,this._w=d*_-r*p-l*m-c*h,this._onChangeCallback(),this}slerp(e,i){let r=e._x,l=e._y,c=e._z,d=e._w,p=this.dot(e);p<0&&(r=-r,l=-l,c=-c,d=-d,p=-p);let m=1-i;if(p<.9995){const h=Math.acos(p),_=Math.sin(h);m=Math.sin(m*h)/_,i=Math.sin(i*h)/_,this._x=this._x*m+r*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+d*i,this._onChangeCallback()}else this._x=this._x*m+r*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+d*i,this.normalize();return this}slerpQuaternions(e,i,r){return this.copy(e).slerp(i,r)}random(){const e=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),r=Math.random(),l=Math.sqrt(1-r),c=Math.sqrt(r);return this.set(l*Math.sin(e),l*Math.cos(e),c*Math.sin(i),c*Math.cos(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,i=0){return this._x=e[i],this._y=e[i+1],this._z=e[i+2],this._w=e[i+3],this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._w,e}fromBufferAttribute(e,i){return this._x=e.getX(i),this._y=e.getY(i),this._z=e.getZ(i),this._w=e.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const op=class op{constructor(e=0,i=0,r=0){this.x=e,this.y=i,this.z=r}set(e,i,r){return r===void 0&&(r=this.z),this.x=e,this.y=i,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,i){return this.x=e.x*i.x,this.y=e.y*i.y,this.z=e.z*i.z,this}applyEuler(e){return this.applyQuaternion(f_.setFromEuler(e))}applyAxisAngle(e,i){return this.applyQuaternion(f_.setFromAxisAngle(e,i))}applyMatrix3(e){const i=this.x,r=this.y,l=this.z,c=e.elements;return this.x=c[0]*i+c[3]*r+c[6]*l,this.y=c[1]*i+c[4]*r+c[7]*l,this.z=c[2]*i+c[5]*r+c[8]*l,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const i=this.x,r=this.y,l=this.z,c=e.elements,d=1/(c[3]*i+c[7]*r+c[11]*l+c[15]);return this.x=(c[0]*i+c[4]*r+c[8]*l+c[12])*d,this.y=(c[1]*i+c[5]*r+c[9]*l+c[13])*d,this.z=(c[2]*i+c[6]*r+c[10]*l+c[14])*d,this}applyQuaternion(e){const i=this.x,r=this.y,l=this.z,c=e.x,d=e.y,p=e.z,m=e.w,h=2*(d*l-p*r),_=2*(p*i-c*l),v=2*(c*r-d*i);return this.x=i+m*h+d*v-p*_,this.y=r+m*_+p*h-c*v,this.z=l+m*v+c*_-d*h,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const i=this.x,r=this.y,l=this.z,c=e.elements;return this.x=c[0]*i+c[4]*r+c[8]*l,this.y=c[1]*i+c[5]*r+c[9]*l,this.z=c[2]*i+c[6]*r+c[10]*l,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,i){return this.x=vt(this.x,e.x,i.x),this.y=vt(this.y,e.y,i.y),this.z=vt(this.z,e.z,i.z),this}clampScalar(e,i){return this.x=vt(this.x,e,i),this.y=vt(this.y,e,i),this.z=vt(this.z,e,i),this}clampLength(e,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(vt(r,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this}lerpVectors(e,i,r){return this.x=e.x+(i.x-e.x)*r,this.y=e.y+(i.y-e.y)*r,this.z=e.z+(i.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,i){const r=e.x,l=e.y,c=e.z,d=i.x,p=i.y,m=i.z;return this.x=l*m-c*p,this.y=c*d-r*m,this.z=r*p-l*d,this}projectOnVector(e){const i=e.lengthSq();if(i===0)return this.set(0,0,0);const r=e.dot(this)/i;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return yd.copy(this).projectOnVector(e),this.sub(yd)}reflect(e){return this.sub(yd.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const r=this.dot(e)/i;return Math.acos(vt(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,r=this.y-e.y,l=this.z-e.z;return i*i+r*r+l*l}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,i,r){const l=Math.sin(i)*e;return this.x=l*Math.sin(r),this.y=Math.cos(i)*e,this.z=l*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,i,r){return this.x=e*Math.sin(i),this.y=r,this.z=e*Math.cos(i),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(e){const i=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),l=this.setFromMatrixColumn(e,2).length();return this.x=i,this.y=r,this.z=l,this}setFromMatrixColumn(e,i){return this.fromArray(e.elements,i*4)}setFromMatrix3Column(e,i){return this.fromArray(e.elements,i*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,i=Math.random()*2-1,r=Math.sqrt(1-i*i);return this.x=r*Math.cos(e),this.y=i,this.z=r*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};op.prototype.isVector3=!0;let K=op;const yd=new K,f_=new qs,lp=class lp{constructor(e,i,r,l,c,d,p,m,h){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,i,r,l,c,d,p,m,h)}set(e,i,r,l,c,d,p,m,h){const _=this.elements;return _[0]=e,_[1]=l,_[2]=p,_[3]=i,_[4]=c,_[5]=m,_[6]=r,_[7]=d,_[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const i=this.elements,r=e.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],this}extractBasis(e,i,r){return e.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const i=e.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const r=e.elements,l=i.elements,c=this.elements,d=r[0],p=r[3],m=r[6],h=r[1],_=r[4],v=r[7],g=r[2],y=r[5],b=r[8],w=l[0],M=l[3],S=l[6],D=l[1],P=l[4],C=l[7],z=l[2],N=l[5],L=l[8];return c[0]=d*w+p*D+m*z,c[3]=d*M+p*P+m*N,c[6]=d*S+p*C+m*L,c[1]=h*w+_*D+v*z,c[4]=h*M+_*P+v*N,c[7]=h*S+_*C+v*L,c[2]=g*w+y*D+b*z,c[5]=g*M+y*P+b*N,c[8]=g*S+y*C+b*L,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[3]*=e,i[6]*=e,i[1]*=e,i[4]*=e,i[7]*=e,i[2]*=e,i[5]*=e,i[8]*=e,this}determinant(){const e=this.elements,i=e[0],r=e[1],l=e[2],c=e[3],d=e[4],p=e[5],m=e[6],h=e[7],_=e[8];return i*d*_-i*p*h-r*c*_+r*p*m+l*c*h-l*d*m}invert(){const e=this.elements,i=e[0],r=e[1],l=e[2],c=e[3],d=e[4],p=e[5],m=e[6],h=e[7],_=e[8],v=_*d-p*h,g=p*m-_*c,y=h*c-d*m,b=i*v+r*g+l*y;if(b===0)return this.set(0,0,0,0,0,0,0,0,0);const w=1/b;return e[0]=v*w,e[1]=(l*h-_*r)*w,e[2]=(p*r-l*d)*w,e[3]=g*w,e[4]=(_*i-l*m)*w,e[5]=(l*c-p*i)*w,e[6]=y*w,e[7]=(r*m-h*i)*w,e[8]=(d*i-r*c)*w,this}transpose(){let e;const i=this.elements;return e=i[1],i[1]=i[3],i[3]=e,e=i[2],i[2]=i[6],i[6]=e,e=i[5],i[5]=i[7],i[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const i=this.elements;return e[0]=i[0],e[1]=i[3],e[2]=i[6],e[3]=i[1],e[4]=i[4],e[5]=i[7],e[6]=i[2],e[7]=i[5],e[8]=i[8],this}setUvTransform(e,i,r,l,c,d,p){const m=Math.cos(c),h=Math.sin(c);return this.set(r*m,r*h,-r*(m*d+h*p)+d+e,-l*h,l*m,-l*(-h*d+m*p)+p+i,0,0,1),this}scale(e,i){return zs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ed.makeScale(e,i)),this}rotate(e){return zs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ed.makeRotation(-e)),this}translate(e,i){return zs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ed.makeTranslation(e,i)),this}makeTranslation(e,i){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,i,0,0,1),this}makeRotation(e){const i=Math.cos(e),r=Math.sin(e);return this.set(i,-r,0,r,i,0,0,0,1),this}makeScale(e,i){return this.set(e,0,0,0,i,0,0,0,1),this}equals(e){const i=this.elements,r=e.elements;for(let l=0;l<9;l++)if(i[l]!==r[l])return!1;return!0}fromArray(e,i=0){for(let r=0;r<9;r++)this.elements[r]=e[r+i];return this}toArray(e=[],i=0){const r=this.elements;return e[i]=r[0],e[i+1]=r[1],e[i+2]=r[2],e[i+3]=r[3],e[i+4]=r[4],e[i+5]=r[5],e[i+6]=r[6],e[i+7]=r[7],e[i+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}};lp.prototype.isMatrix3=!0;let st=lp;const Ed=new st,d_=new st().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),h_=new st().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function vy(){const s={enabled:!0,workingColorSpace:Kc,spaces:{},convert:function(l,c,d){return this.enabled===!1||c===d||!c||!d||(this.spaces[c].transfer===Bt&&(l.r=ba(l.r),l.g=ba(l.g),l.b=ba(l.b)),this.spaces[c].primaries!==this.spaces[d].primaries&&(l.applyMatrix3(this.spaces[c].toXYZ),l.applyMatrix3(this.spaces[d].fromXYZ)),this.spaces[d].transfer===Bt&&(l.r=Fs(l.r),l.g=Fs(l.g),l.b=Fs(l.b))),l},workingToColorSpace:function(l,c){return this.convert(l,this.workingColorSpace,c)},colorSpaceToWorking:function(l,c){return this.convert(l,c,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===sr?Qc:this.spaces[l].transfer},getToneMappingMode:function(l){return this.spaces[l].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(l,c=this.workingColorSpace){return l.fromArray(this.spaces[c].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,c,d){return l.copy(this.spaces[c].toXYZ).multiply(this.spaces[d].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,c){return zs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(l,c)},toWorkingColorSpace:function(l,c){return zs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(l,c)}},e=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],r=[.3127,.329];return s.define({[Kc]:{primaries:e,whitePoint:r,transfer:Qc,toXYZ:d_,fromXYZ:h_,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:hi},outputColorSpaceConfig:{drawingBufferColorSpace:hi}},[hi]:{primaries:e,whitePoint:r,transfer:Bt,toXYZ:d_,fromXYZ:h_,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:hi}}}),s}const yt=vy();function ba(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Fs(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let ys;class xy{static getDataURL(e,i="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let r;if(e instanceof HTMLCanvasElement)r=e;else{ys===void 0&&(ys=jc("canvas")),ys.width=e.width,ys.height=e.height;const l=ys.getContext("2d");e instanceof ImageData?l.putImageData(e,0,0):l.drawImage(e,0,0,e.width,e.height),r=ys}return r.toDataURL(i)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const i=jc("canvas");i.width=e.width,i.height=e.height;const r=i.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const l=r.getImageData(0,0,e.width,e.height),c=l.data;for(let d=0;d<c.length;d++)c[d]=ba(c[d]/255)*255;return r.putImageData(l,0,0),i}else if(e.data){const i=e.data.slice(0);for(let r=0;r<i.length;r++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[r]=Math.floor(ba(i[r]/255)*255):i[r]=ba(i[r]);return{data:i,width:e.width,height:e.height}}else return tt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Sy=0;class tp{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Sy++}),this.uuid=Ws(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const i=this.data;return typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement?e.set(i.videoWidth,i.videoHeight,0):typeof VideoFrame<"u"&&i instanceof VideoFrame?e.set(i.displayWidth,i.displayHeight,0):i!==null?e.set(i.width,i.height,i.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let d=0,p=l.length;d<p;d++)l[d].isDataTexture?c.push(bd(l[d].image)):c.push(bd(l[d]))}else c=bd(l);r.url=c}return i||(e.images[this.uuid]=r),r}}function bd(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?xy.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(tt("Texture: Unable to serialize Texture."),{})}let My=0;const Td=new K;class Xn extends Vr{constructor(e=Xn.DEFAULT_IMAGE,i=Xn.DEFAULT_MAPPING,r=ya,l=ya,c=Fn,d=Ir,p=Pi,m=Ti,h=Xn.DEFAULT_ANISOTROPY,_=sr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:My++}),this.uuid=Ws(),this.name="",this.source=new tp(e),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=r,this.wrapT=l,this.magFilter=c,this.minFilter=d,this.anisotropy=h,this.format=p,this.internalFormat=null,this.type=m,this.offset=new Et(0,0),this.repeat=new Et(1,1),this.center=new Et(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new st,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=_,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Td).x}get height(){return this.source.getSize(Td).y}get depth(){return this.source.getSize(Td).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const i in e){const r=e[i];if(r===void 0){tt(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){tt(`Texture.setValues(): property '${i}' does not exist.`);continue}l&&r&&l.isVector2&&r.isVector2||l&&r&&l.isVector3&&r.isVector3||l&&r&&l.isMatrix3&&r.isMatrix3?l.copy(r):this[i]=r}}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),i||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==vv)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case lh:e.x=e.x-Math.floor(e.x);break;case ya:e.x=e.x<0?0:1;break;case ch:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case lh:e.y=e.y-Math.floor(e.y);break;case ya:e.y=e.y<0?0:1;break;case ch:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Xn.DEFAULT_IMAGE=null;Xn.DEFAULT_MAPPING=vv;Xn.DEFAULT_ANISOTROPY=1;const cp=class cp{constructor(e=0,i=0,r=0,l=1){this.x=e,this.y=i,this.z=r,this.w=l}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,i,r,l){return this.x=e,this.y=i,this.z=r,this.w=l,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this.w=e.w+i.w,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this.w+=e.w*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this.w=e.w-i.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const i=this.x,r=this.y,l=this.z,c=this.w,d=e.elements;return this.x=d[0]*i+d[4]*r+d[8]*l+d[12]*c,this.y=d[1]*i+d[5]*r+d[9]*l+d[13]*c,this.z=d[2]*i+d[6]*r+d[10]*l+d[14]*c,this.w=d[3]*i+d[7]*r+d[11]*l+d[15]*c,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const i=Math.sqrt(1-e.w*e.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/i,this.y=e.y/i,this.z=e.z/i),this}setAxisAngleFromRotationMatrix(e){let i,r,l,c;const m=e.elements,h=m[0],_=m[4],v=m[8],g=m[1],y=m[5],b=m[9],w=m[2],M=m[6],S=m[10];if(Math.abs(_-g)<.01&&Math.abs(v-w)<.01&&Math.abs(b-M)<.01){if(Math.abs(_+g)<.1&&Math.abs(v+w)<.1&&Math.abs(b+M)<.1&&Math.abs(h+y+S-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const P=(h+1)/2,C=(y+1)/2,z=(S+1)/2,N=(_+g)/4,L=(v+w)/4,T=(b+M)/4;return P>C&&P>z?P<.01?(r=0,l=.707106781,c=.707106781):(r=Math.sqrt(P),l=N/r,c=L/r):C>z?C<.01?(r=.707106781,l=0,c=.707106781):(l=Math.sqrt(C),r=N/l,c=T/l):z<.01?(r=.707106781,l=.707106781,c=0):(c=Math.sqrt(z),r=L/c,l=T/c),this.set(r,l,c,i),this}let D=Math.sqrt((M-b)*(M-b)+(v-w)*(v-w)+(g-_)*(g-_));return Math.abs(D)<.001&&(D=1),this.x=(M-b)/D,this.y=(v-w)/D,this.z=(g-_)/D,this.w=Math.acos((h+y+S-1)/2),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,i){return this.x=vt(this.x,e.x,i.x),this.y=vt(this.y,e.y,i.y),this.z=vt(this.z,e.z,i.z),this.w=vt(this.w,e.w,i.w),this}clampScalar(e,i){return this.x=vt(this.x,e,i),this.y=vt(this.y,e,i),this.z=vt(this.z,e,i),this.w=vt(this.w,e,i),this}clampLength(e,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(vt(r,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this.w+=(e.w-this.w)*i,this}lerpVectors(e,i,r){return this.x=e.x+(i.x-e.x)*r,this.y=e.y+(i.y-e.y)*r,this.z=e.z+(i.z-e.z)*r,this.w=e.w+(i.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this.w=e[i+3],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e[i+3]=this.w,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this.w=e.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};cp.prototype.isVector4=!0;let ln=cp;class yy extends Vr{constructor(e=1,i=1,r={}){super(),r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Fn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},r),this.isRenderTarget=!0,this.width=e,this.height=i,this.depth=r.depth,this.scissor=new ln(0,0,e,i),this.scissorTest=!1,this.viewport=new ln(0,0,e,i),this.textures=[];const l={width:e,height:i,depth:r.depth},c=new Xn(l),d=r.count;for(let p=0;p<d;p++)this.textures[p]=c.clone(),this.textures[p].isRenderTargetTexture=!0,this.textures[p].renderTarget=this;this._setTextureOptions(r),this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=r.depthTexture,this.samples=r.samples,this.multiview=r.multiview,this.useArrayDepthTexture=r.useArrayDepthTexture}_setTextureOptions(e={}){const i={minFilter:Fn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(i.mapping=e.mapping),e.wrapS!==void 0&&(i.wrapS=e.wrapS),e.wrapT!==void 0&&(i.wrapT=e.wrapT),e.wrapR!==void 0&&(i.wrapR=e.wrapR),e.magFilter!==void 0&&(i.magFilter=e.magFilter),e.minFilter!==void 0&&(i.minFilter=e.minFilter),e.format!==void 0&&(i.format=e.format),e.type!==void 0&&(i.type=e.type),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(i.colorSpace=e.colorSpace),e.flipY!==void 0&&(i.flipY=e.flipY),e.generateMipmaps!==void 0&&(i.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(i.internalFormat=e.internalFormat);for(let r=0;r<this.textures.length;r++)this.textures[r].setValues(i)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,i,r=1){if(this.width!==e||this.height!==i||this.depth!==r){this.width=e,this.height=i,this.depth=r;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=e,this.textures[l].image.height=i,this.textures[l].image.depth=r,this.textures[l].isData3DTexture!==!0&&(this.textures[l].isArrayTexture=this.textures[l].image.depth>1);this.dispose()}this.viewport.set(0,0,e,i),this.scissor.set(0,0,e,i)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++){this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const l=Object.assign({},e.textures[i].image);this.textures[i].source=new tp(l)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Zi extends yy{constructor(e=1,i=1,r={}){super(e,i,r),this.isWebGLRenderTarget=!0}}class Rv extends Xn{constructor(e=null,i=1,r=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:i,height:r,depth:l},this.magFilter=Ln,this.minFilter=Ln,this.wrapR=ya,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ey extends Xn{constructor(e=null,i=1,r=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:i,height:r,depth:l},this.magFilter=Ln,this.minFilter=Ln,this.wrapR=ya,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const nu=class nu{constructor(e,i,r,l,c,d,p,m,h,_,v,g,y,b,w,M){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,i,r,l,c,d,p,m,h,_,v,g,y,b,w,M)}set(e,i,r,l,c,d,p,m,h,_,v,g,y,b,w,M){const S=this.elements;return S[0]=e,S[4]=i,S[8]=r,S[12]=l,S[1]=c,S[5]=d,S[9]=p,S[13]=m,S[2]=h,S[6]=_,S[10]=v,S[14]=g,S[3]=y,S[7]=b,S[11]=w,S[15]=M,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new nu().fromArray(this.elements)}copy(e){const i=this.elements,r=e.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],i[9]=r[9],i[10]=r[10],i[11]=r[11],i[12]=r[12],i[13]=r[13],i[14]=r[14],i[15]=r[15],this}copyPosition(e){const i=this.elements,r=e.elements;return i[12]=r[12],i[13]=r[13],i[14]=r[14],this}setFromMatrix3(e){const i=e.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(e,i,r){return this.determinantAffine()===0?(e.set(1,0,0),i.set(0,1,0),r.set(0,0,1),this):(e.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this)}makeBasis(e,i,r){return this.set(e.x,i.x,r.x,0,e.y,i.y,r.y,0,e.z,i.z,r.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const i=this.elements,r=e.elements,l=1/Es.setFromMatrixColumn(e,0).length(),c=1/Es.setFromMatrixColumn(e,1).length(),d=1/Es.setFromMatrixColumn(e,2).length();return i[0]=r[0]*l,i[1]=r[1]*l,i[2]=r[2]*l,i[3]=0,i[4]=r[4]*c,i[5]=r[5]*c,i[6]=r[6]*c,i[7]=0,i[8]=r[8]*d,i[9]=r[9]*d,i[10]=r[10]*d,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(e){const i=this.elements,r=e.x,l=e.y,c=e.z,d=Math.cos(r),p=Math.sin(r),m=Math.cos(l),h=Math.sin(l),_=Math.cos(c),v=Math.sin(c);if(e.order==="XYZ"){const g=d*_,y=d*v,b=p*_,w=p*v;i[0]=m*_,i[4]=-m*v,i[8]=h,i[1]=y+b*h,i[5]=g-w*h,i[9]=-p*m,i[2]=w-g*h,i[6]=b+y*h,i[10]=d*m}else if(e.order==="YXZ"){const g=m*_,y=m*v,b=h*_,w=h*v;i[0]=g+w*p,i[4]=b*p-y,i[8]=d*h,i[1]=d*v,i[5]=d*_,i[9]=-p,i[2]=y*p-b,i[6]=w+g*p,i[10]=d*m}else if(e.order==="ZXY"){const g=m*_,y=m*v,b=h*_,w=h*v;i[0]=g-w*p,i[4]=-d*v,i[8]=b+y*p,i[1]=y+b*p,i[5]=d*_,i[9]=w-g*p,i[2]=-d*h,i[6]=p,i[10]=d*m}else if(e.order==="ZYX"){const g=d*_,y=d*v,b=p*_,w=p*v;i[0]=m*_,i[4]=b*h-y,i[8]=g*h+w,i[1]=m*v,i[5]=w*h+g,i[9]=y*h-b,i[2]=-h,i[6]=p*m,i[10]=d*m}else if(e.order==="YZX"){const g=d*m,y=d*h,b=p*m,w=p*h;i[0]=m*_,i[4]=w-g*v,i[8]=b*v+y,i[1]=v,i[5]=d*_,i[9]=-p*_,i[2]=-h*_,i[6]=y*v+b,i[10]=g-w*v}else if(e.order==="XZY"){const g=d*m,y=d*h,b=p*m,w=p*h;i[0]=m*_,i[4]=-v,i[8]=h*_,i[1]=g*v+w,i[5]=d*_,i[9]=y*v-b,i[2]=b*v-y,i[6]=p*_,i[10]=w*v+g}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(e){return this.compose(by,e,Ty)}lookAt(e,i,r){const l=this.elements;return fi.subVectors(e,i),fi.lengthSq()===0&&(fi.z=1),fi.normalize(),er.crossVectors(r,fi),er.lengthSq()===0&&(Math.abs(r.z)===1?fi.x+=1e-4:fi.z+=1e-4,fi.normalize(),er.crossVectors(r,fi)),er.normalize(),mc.crossVectors(fi,er),l[0]=er.x,l[4]=mc.x,l[8]=fi.x,l[1]=er.y,l[5]=mc.y,l[9]=fi.y,l[2]=er.z,l[6]=mc.z,l[10]=fi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const r=e.elements,l=i.elements,c=this.elements,d=r[0],p=r[4],m=r[8],h=r[12],_=r[1],v=r[5],g=r[9],y=r[13],b=r[2],w=r[6],M=r[10],S=r[14],D=r[3],P=r[7],C=r[11],z=r[15],N=l[0],L=l[4],T=l[8],U=l[12],k=l[1],F=l[5],W=l[9],ce=l[13],me=l[2],j=l[6],B=l[10],G=l[14],te=l[3],ge=l[7],Ee=l[11],I=l[15];return c[0]=d*N+p*k+m*me+h*te,c[4]=d*L+p*F+m*j+h*ge,c[8]=d*T+p*W+m*B+h*Ee,c[12]=d*U+p*ce+m*G+h*I,c[1]=_*N+v*k+g*me+y*te,c[5]=_*L+v*F+g*j+y*ge,c[9]=_*T+v*W+g*B+y*Ee,c[13]=_*U+v*ce+g*G+y*I,c[2]=b*N+w*k+M*me+S*te,c[6]=b*L+w*F+M*j+S*ge,c[10]=b*T+w*W+M*B+S*Ee,c[14]=b*U+w*ce+M*G+S*I,c[3]=D*N+P*k+C*me+z*te,c[7]=D*L+P*F+C*j+z*ge,c[11]=D*T+P*W+C*B+z*Ee,c[15]=D*U+P*ce+C*G+z*I,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[4]*=e,i[8]*=e,i[12]*=e,i[1]*=e,i[5]*=e,i[9]*=e,i[13]*=e,i[2]*=e,i[6]*=e,i[10]*=e,i[14]*=e,i[3]*=e,i[7]*=e,i[11]*=e,i[15]*=e,this}determinant(){const e=this.elements,i=e[0],r=e[4],l=e[8],c=e[12],d=e[1],p=e[5],m=e[9],h=e[13],_=e[2],v=e[6],g=e[10],y=e[14],b=e[3],w=e[7],M=e[11],S=e[15],D=m*y-h*g,P=p*y-h*v,C=p*g-m*v,z=d*y-h*_,N=d*g-m*_,L=d*v-p*_;return i*(w*D-M*P+S*C)-r*(b*D-M*z+S*N)+l*(b*P-w*z+S*L)-c*(b*C-w*N+M*L)}determinantAffine(){const e=this.elements,i=e[0],r=e[4],l=e[8],c=e[1],d=e[5],p=e[9],m=e[2],h=e[6],_=e[10];return i*(d*_-p*h)-r*(c*_-p*m)+l*(c*h-d*m)}transpose(){const e=this.elements;let i;return i=e[1],e[1]=e[4],e[4]=i,i=e[2],e[2]=e[8],e[8]=i,i=e[6],e[6]=e[9],e[9]=i,i=e[3],e[3]=e[12],e[12]=i,i=e[7],e[7]=e[13],e[13]=i,i=e[11],e[11]=e[14],e[14]=i,this}setPosition(e,i,r){const l=this.elements;return e.isVector3?(l[12]=e.x,l[13]=e.y,l[14]=e.z):(l[12]=e,l[13]=i,l[14]=r),this}invert(){const e=this.elements,i=e[0],r=e[1],l=e[2],c=e[3],d=e[4],p=e[5],m=e[6],h=e[7],_=e[8],v=e[9],g=e[10],y=e[11],b=e[12],w=e[13],M=e[14],S=e[15],D=i*p-r*d,P=i*m-l*d,C=i*h-c*d,z=r*m-l*p,N=r*h-c*p,L=l*h-c*m,T=_*w-v*b,U=_*M-g*b,k=_*S-y*b,F=v*M-g*w,W=v*S-y*w,ce=g*S-y*M,me=D*ce-P*W+C*F+z*k-N*U+L*T;if(me===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const j=1/me;return e[0]=(p*ce-m*W+h*F)*j,e[1]=(l*W-r*ce-c*F)*j,e[2]=(w*L-M*N+S*z)*j,e[3]=(g*N-v*L-y*z)*j,e[4]=(m*k-d*ce-h*U)*j,e[5]=(i*ce-l*k+c*U)*j,e[6]=(M*C-b*L-S*P)*j,e[7]=(_*L-g*C+y*P)*j,e[8]=(d*W-p*k+h*T)*j,e[9]=(r*k-i*W-c*T)*j,e[10]=(b*N-w*C+S*D)*j,e[11]=(v*C-_*N-y*D)*j,e[12]=(p*U-d*F-m*T)*j,e[13]=(i*F-r*U+l*T)*j,e[14]=(w*P-b*z-M*D)*j,e[15]=(_*z-v*P+g*D)*j,this}scale(e){const i=this.elements,r=e.x,l=e.y,c=e.z;return i[0]*=r,i[4]*=l,i[8]*=c,i[1]*=r,i[5]*=l,i[9]*=c,i[2]*=r,i[6]*=l,i[10]*=c,i[3]*=r,i[7]*=l,i[11]*=c,this}getMaxScaleOnAxis(){const e=this.elements,i=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],l=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(i,r,l))}makeTranslation(e,i,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,i,0,0,1,r,0,0,0,1),this}makeRotationX(e){const i=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,i,-r,0,0,r,i,0,0,0,0,1),this}makeRotationY(e){const i=Math.cos(e),r=Math.sin(e);return this.set(i,0,r,0,0,1,0,0,-r,0,i,0,0,0,0,1),this}makeRotationZ(e){const i=Math.cos(e),r=Math.sin(e);return this.set(i,-r,0,0,r,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,i){const r=Math.cos(i),l=Math.sin(i),c=1-r,d=e.x,p=e.y,m=e.z,h=c*d,_=c*p;return this.set(h*d+r,h*p-l*m,h*m+l*p,0,h*p+l*m,_*p+r,_*m-l*d,0,h*m-l*p,_*m+l*d,c*m*m+r,0,0,0,0,1),this}makeScale(e,i,r){return this.set(e,0,0,0,0,i,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,i,r,l,c,d){return this.set(1,r,c,0,e,1,d,0,i,l,1,0,0,0,0,1),this}compose(e,i,r){const l=this.elements,c=i._x,d=i._y,p=i._z,m=i._w,h=c+c,_=d+d,v=p+p,g=c*h,y=c*_,b=c*v,w=d*_,M=d*v,S=p*v,D=m*h,P=m*_,C=m*v,z=r.x,N=r.y,L=r.z;return l[0]=(1-(w+S))*z,l[1]=(y+C)*z,l[2]=(b-P)*z,l[3]=0,l[4]=(y-C)*N,l[5]=(1-(g+S))*N,l[6]=(M+D)*N,l[7]=0,l[8]=(b+P)*L,l[9]=(M-D)*L,l[10]=(1-(g+w))*L,l[11]=0,l[12]=e.x,l[13]=e.y,l[14]=e.z,l[15]=1,this}decompose(e,i,r){const l=this.elements;e.x=l[12],e.y=l[13],e.z=l[14];const c=this.determinantAffine();if(c===0)return r.set(1,1,1),i.identity(),this;let d=Es.set(l[0],l[1],l[2]).length();const p=Es.set(l[4],l[5],l[6]).length(),m=Es.set(l[8],l[9],l[10]).length();c<0&&(d=-d),Ni.copy(this);const h=1/d,_=1/p,v=1/m;return Ni.elements[0]*=h,Ni.elements[1]*=h,Ni.elements[2]*=h,Ni.elements[4]*=_,Ni.elements[5]*=_,Ni.elements[6]*=_,Ni.elements[8]*=v,Ni.elements[9]*=v,Ni.elements[10]*=v,i.setFromRotationMatrix(Ni),r.x=d,r.y=p,r.z=m,this}makePerspective(e,i,r,l,c,d,p=qi,m=!1){const h=this.elements,_=2*c/(i-e),v=2*c/(r-l),g=(i+e)/(i-e),y=(r+l)/(r-l);let b,w;if(m)b=c/(d-c),w=d*c/(d-c);else if(p===qi)b=-(d+c)/(d-c),w=-2*d*c/(d-c);else if(p===Jc)b=-d/(d-c),w=-d*c/(d-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+p);return h[0]=_,h[4]=0,h[8]=g,h[12]=0,h[1]=0,h[5]=v,h[9]=y,h[13]=0,h[2]=0,h[6]=0,h[10]=b,h[14]=w,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(e,i,r,l,c,d,p=qi,m=!1){const h=this.elements,_=2/(i-e),v=2/(r-l),g=-(i+e)/(i-e),y=-(r+l)/(r-l);let b,w;if(m)b=1/(d-c),w=d/(d-c);else if(p===qi)b=-2/(d-c),w=-(d+c)/(d-c);else if(p===Jc)b=-1/(d-c),w=-c/(d-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+p);return h[0]=_,h[4]=0,h[8]=0,h[12]=g,h[1]=0,h[5]=v,h[9]=0,h[13]=y,h[2]=0,h[6]=0,h[10]=b,h[14]=w,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(e){const i=this.elements,r=e.elements;for(let l=0;l<16;l++)if(i[l]!==r[l])return!1;return!0}fromArray(e,i=0){for(let r=0;r<16;r++)this.elements[r]=e[r+i];return this}toArray(e=[],i=0){const r=this.elements;return e[i]=r[0],e[i+1]=r[1],e[i+2]=r[2],e[i+3]=r[3],e[i+4]=r[4],e[i+5]=r[5],e[i+6]=r[6],e[i+7]=r[7],e[i+8]=r[8],e[i+9]=r[9],e[i+10]=r[10],e[i+11]=r[11],e[i+12]=r[12],e[i+13]=r[13],e[i+14]=r[14],e[i+15]=r[15],e}};nu.prototype.isMatrix4=!0;let dn=nu;const Es=new K,Ni=new dn,by=new K(0,0,0),Ty=new K(1,1,1),er=new K,mc=new K,fi=new K,p_=new dn,m_=new qs;class Gr{constructor(e=0,i=0,r=0,l=Gr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=i,this._z=r,this._order=l}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,i,r,l=this._order){return this._x=e,this._y=i,this._z=r,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,i=this._order,r=!0){const l=e.elements,c=l[0],d=l[4],p=l[8],m=l[1],h=l[5],_=l[9],v=l[2],g=l[6],y=l[10];switch(i){case"XYZ":this._y=Math.asin(vt(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-_,y),this._z=Math.atan2(-d,c)):(this._x=Math.atan2(g,h),this._z=0);break;case"YXZ":this._x=Math.asin(-vt(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(p,y),this._z=Math.atan2(m,h)):(this._y=Math.atan2(-v,c),this._z=0);break;case"ZXY":this._x=Math.asin(vt(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-v,y),this._z=Math.atan2(-d,h)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-vt(v,-1,1)),Math.abs(v)<.9999999?(this._x=Math.atan2(g,y),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-d,h));break;case"YZX":this._z=Math.asin(vt(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-_,h),this._y=Math.atan2(-v,c)):(this._x=0,this._y=Math.atan2(p,y));break;case"XZY":this._z=Math.asin(-vt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(g,h),this._y=Math.atan2(p,c)):(this._x=Math.atan2(-_,y),this._y=0);break;default:tt("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,i,r){return p_.makeRotationFromQuaternion(e),this.setFromRotationMatrix(p_,i,r)}setFromVector3(e,i=this._order){return this.set(e.x,e.y,e.z,i)}reorder(e){return m_.setFromEuler(this),this.setFromQuaternion(m_,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Gr.DEFAULT_ORDER="XYZ";class Cv{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ay=0;const g_=new K,bs=new qs,_a=new dn,gc=new K,Vo=new K,Ry=new K,Cy=new qs,__=new K(1,0,0),v_=new K(0,1,0),x_=new K(0,0,1),S_={type:"added"},wy={type:"removed"},Ts={type:"childadded",child:null},Ad={type:"childremoved",child:null};class $n extends Vr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ay++}),this.uuid=Ws(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=$n.DEFAULT_UP.clone();const e=new K,i=new Gr,r=new qs,l=new K(1,1,1);function c(){r.setFromEuler(i,!1)}function d(){i.setFromQuaternion(r,void 0,!1)}i._onChange(c),r._onChange(d),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new dn},normalMatrix:{value:new st}}),this.matrix=new dn,this.matrixWorld=new dn,this.matrixAutoUpdate=$n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=$n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Cv,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,i){this.quaternion.setFromAxisAngle(e,i)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,i){return bs.setFromAxisAngle(e,i),this.quaternion.multiply(bs),this}rotateOnWorldAxis(e,i){return bs.setFromAxisAngle(e,i),this.quaternion.premultiply(bs),this}rotateX(e){return this.rotateOnAxis(__,e)}rotateY(e){return this.rotateOnAxis(v_,e)}rotateZ(e){return this.rotateOnAxis(x_,e)}translateOnAxis(e,i){return g_.copy(e).applyQuaternion(this.quaternion),this.position.add(g_.multiplyScalar(i)),this}translateX(e){return this.translateOnAxis(__,e)}translateY(e){return this.translateOnAxis(v_,e)}translateZ(e){return this.translateOnAxis(x_,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(_a.copy(this.matrixWorld).invert())}lookAt(e,i,r){e.isVector3?gc.copy(e):gc.set(e,i,r);const l=this.parent;this.updateWorldMatrix(!0,!1),Vo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_a.lookAt(Vo,gc,this.up):_a.lookAt(gc,Vo,this.up),this.quaternion.setFromRotationMatrix(_a),l&&(_a.extractRotation(l.matrixWorld),bs.setFromRotationMatrix(_a),this.quaternion.premultiply(bs.invert()))}add(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return e===this?(bt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(S_),Ts.child=e,this.dispatchEvent(Ts),Ts.child=null):bt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const i=this.children.indexOf(e);return i!==-1&&(e.parent=null,this.children.splice(i,1),e.dispatchEvent(wy),Ad.child=e,this.dispatchEvent(Ad),Ad.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),_a.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),_a.multiply(e.parent.matrixWorld)),e.applyMatrix4(_a),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(S_),Ts.child=e,this.dispatchEvent(Ts),Ts.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,i){if(this[e]===i)return this;for(let r=0,l=this.children.length;r<l;r++){const d=this.children[r].getObjectByProperty(e,i);if(d!==void 0)return d}}getObjectsByProperty(e,i,r=[]){this[e]===i&&r.push(this);const l=this.children;for(let c=0,d=l.length;c<d;c++)l[c].getObjectsByProperty(e,i,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vo,e,Ry),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vo,Cy,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return e.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(e){e(this);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].traverseVisible(e)}traverseAncestors(e){const i=this.parent;i!==null&&(e(i),i.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const i=e.x,r=e.y,l=e.z,c=this.matrix.elements;c[12]+=i-c[0]*i-c[4]*r-c[8]*l,c[13]+=r-c[1]*i-c[5]*r-c[9]*l,c[14]+=l-c[2]*i-c[6]*r-c[10]*l}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].updateMatrixWorld(e)}updateWorldMatrix(e,i,r=!1){const l=this.parent;if(e===!0&&l!==null&&l.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||r)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,r=!0),i===!0){const c=this.children;for(let d=0,p=c.length;d<p;d++)c[d].updateWorldMatrix(!1,!0,r)}}toJSON(e){const i=e===void 0||typeof e=="string",r={};i&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),this.static!==!1&&(l.static=this.static),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.pivot!==null&&(l.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(l.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(l.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(p=>({...p,boundingBox:p.boundingBox?p.boundingBox.toJSON():void 0,boundingSphere:p.boundingSphere?p.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(p=>({...p})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(e),l.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function c(p,m){return p[m.uuid]===void 0&&(p[m.uuid]=m.toJSON(e)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(e.geometries,this.geometry);const p=this.geometry.parameters;if(p!==void 0&&p.shapes!==void 0){const m=p.shapes;if(Array.isArray(m))for(let h=0,_=m.length;h<_;h++){const v=m[h];c(e.shapes,v)}else c(e.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(e.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const p=[];for(let m=0,h=this.material.length;m<h;m++)p.push(c(e.materials,this.material[m]));l.material=p}else l.material=c(e.materials,this.material);if(this.children.length>0){l.children=[];for(let p=0;p<this.children.length;p++)l.children.push(this.children[p].toJSON(e).object)}if(this.animations.length>0){l.animations=[];for(let p=0;p<this.animations.length;p++){const m=this.animations[p];l.animations.push(c(e.animations,m))}}if(i){const p=d(e.geometries),m=d(e.materials),h=d(e.textures),_=d(e.images),v=d(e.shapes),g=d(e.skeletons),y=d(e.animations),b=d(e.nodes);p.length>0&&(r.geometries=p),m.length>0&&(r.materials=m),h.length>0&&(r.textures=h),_.length>0&&(r.images=_),v.length>0&&(r.shapes=v),g.length>0&&(r.skeletons=g),y.length>0&&(r.animations=y),b.length>0&&(r.nodes=b)}return r.object=l,r;function d(p){const m=[];for(const h in p){const _=p[h];delete _.metadata,m.push(_)}return m}}clone(e){return new this.constructor().copy(this,e)}copy(e,i=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),i===!0)for(let r=0;r<e.children.length;r++){const l=e.children[r];this.add(l.clone())}return this}}$n.DEFAULT_UP=new K(0,1,0);$n.DEFAULT_MATRIX_AUTO_UPDATE=!0;$n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class kn extends $n{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Dy={type:"move"};class Rd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new kn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new kn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new K,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new K),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new kn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new K,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new K,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const i=this._hand;if(i)for(const r of e.hand.values())this._getHandJoint(i,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,i,r){let l=null,c=null,d=null;const p=this._targetRay,m=this._grip,h=this._hand;if(e&&i.session.visibilityState!=="visible-blurred"){if(h&&e.hand){d=!0;for(const w of e.hand.values()){const M=i.getJointPose(w,r),S=this._getHandJoint(h,w);M!==null&&(S.matrix.fromArray(M.transform.matrix),S.matrix.decompose(S.position,S.rotation,S.scale),S.matrixWorldNeedsUpdate=!0,S.jointRadius=M.radius),S.visible=M!==null}const _=h.joints["index-finger-tip"],v=h.joints["thumb-tip"],g=_.position.distanceTo(v.position),y=.02,b=.005;h.inputState.pinching&&g>y+b?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!h.inputState.pinching&&g<=y-b&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else m!==null&&e.gripSpace&&(c=i.getPose(e.gripSpace,r),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1,m.eventsEnabled&&m.dispatchEvent({type:"gripUpdated",data:e,target:this})));p!==null&&(l=i.getPose(e.targetRaySpace,r),l===null&&c!==null&&(l=c),l!==null&&(p.matrix.fromArray(l.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,l.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(l.linearVelocity)):p.hasLinearVelocity=!1,l.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(l.angularVelocity)):p.hasAngularVelocity=!1,this.dispatchEvent(Dy)))}return p!==null&&(p.visible=l!==null),m!==null&&(m.visible=c!==null),h!==null&&(h.visible=d!==null),this}_getHandJoint(e,i){if(e.joints[i.jointName]===void 0){const r=new kn;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[i.jointName]=r,e.add(r)}return e.joints[i.jointName]}}const wv={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},tr={h:0,s:0,l:0},_c={h:0,s:0,l:0};function Cd(s,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?s+(e-s)*6*i:i<1/2?e:i<2/3?s+(e-s)*6*(2/3-i):s}class Tt{constructor(e,i,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,i,r)}set(e,i,r){if(i===void 0&&r===void 0){const l=e;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(e,i,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,i=hi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,yt.colorSpaceToWorking(this,i),this}setRGB(e,i,r,l=yt.workingColorSpace){return this.r=e,this.g=i,this.b=r,yt.colorSpaceToWorking(this,l),this}setHSL(e,i,r,l=yt.workingColorSpace){if(e=ep(e,1),i=vt(i,0,1),r=vt(r,0,1),i===0)this.r=this.g=this.b=r;else{const c=r<=.5?r*(1+i):r+i-r*i,d=2*r-c;this.r=Cd(d,c,e+1/3),this.g=Cd(d,c,e),this.b=Cd(d,c,e-1/3)}return yt.colorSpaceToWorking(this,l),this}setStyle(e,i=hi){function r(c){c!==void 0&&parseFloat(c)<1&&tt("Color: Alpha component of "+e+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(e)){let c;const d=l[1],p=l[2];switch(d){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return r(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,i);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return r(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,i);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return r(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,i);break;default:tt("Color: Unknown color model "+e)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(e)){const c=l[1],d=c.length;if(d===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,i);if(d===6)return this.setHex(parseInt(c,16),i);tt("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,i);return this}setColorName(e,i=hi){const r=wv[e.toLowerCase()];return r!==void 0?this.setHex(r,i):tt("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ba(e.r),this.g=ba(e.g),this.b=ba(e.b),this}copyLinearToSRGB(e){return this.r=Fs(e.r),this.g=Fs(e.g),this.b=Fs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=hi){return yt.workingToColorSpace(Bn.copy(this),e),Math.round(vt(Bn.r*255,0,255))*65536+Math.round(vt(Bn.g*255,0,255))*256+Math.round(vt(Bn.b*255,0,255))}getHexString(e=hi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,i=yt.workingColorSpace){yt.workingToColorSpace(Bn.copy(this),i);const r=Bn.r,l=Bn.g,c=Bn.b,d=Math.max(r,l,c),p=Math.min(r,l,c);let m,h;const _=(p+d)/2;if(p===d)m=0,h=0;else{const v=d-p;switch(h=_<=.5?v/(d+p):v/(2-d-p),d){case r:m=(l-c)/v+(l<c?6:0);break;case l:m=(c-r)/v+2;break;case c:m=(r-l)/v+4;break}m/=6}return e.h=m,e.s=h,e.l=_,e}getRGB(e,i=yt.workingColorSpace){return yt.workingToColorSpace(Bn.copy(this),i),e.r=Bn.r,e.g=Bn.g,e.b=Bn.b,e}getStyle(e=hi){yt.workingToColorSpace(Bn.copy(this),e);const i=Bn.r,r=Bn.g,l=Bn.b;return e!==hi?`color(${e} ${i.toFixed(3)} ${r.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(r*255)},${Math.round(l*255)})`}offsetHSL(e,i,r){return this.getHSL(tr),this.setHSL(tr.h+e,tr.s+i,tr.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,i){return this.r=e.r+i.r,this.g=e.g+i.g,this.b=e.b+i.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,i){return this.r+=(e.r-this.r)*i,this.g+=(e.g-this.g)*i,this.b+=(e.b-this.b)*i,this}lerpColors(e,i,r){return this.r=e.r+(i.r-e.r)*r,this.g=e.g+(i.g-e.g)*r,this.b=e.b+(i.b-e.b)*r,this}lerpHSL(e,i){this.getHSL(tr),e.getHSL(_c);const r=Jo(tr.h,_c.h,i),l=Jo(tr.s,_c.s,i),c=Jo(tr.l,_c.l,i);return this.setHSL(r,l,c),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const i=this.r,r=this.g,l=this.b,c=e.elements;return this.r=c[0]*i+c[3]*r+c[6]*l,this.g=c[1]*i+c[4]*r+c[7]*l,this.b=c[2]*i+c[5]*r+c[8]*l,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,i=0){return this.r=e[i],this.g=e[i+1],this.b=e[i+2],this}toArray(e=[],i=0){return e[i]=this.r,e[i+1]=this.g,e[i+2]=this.b,e}fromBufferAttribute(e,i){return this.r=e.getX(i),this.g=e.getY(i),this.b=e.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Bn=new Tt;Tt.NAMES=wv;class np{constructor(e,i=1,r=1e3){this.isFog=!0,this.name="",this.color=new Tt(e),this.near=i,this.far=r}clone(){return new np(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Uy extends $n{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Gr,this.environmentIntensity=1,this.environmentRotation=new Gr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,i){return super.copy(e,i),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const i=super.toJSON(e);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}const Li=new K,va=new K,wd=new K,xa=new K,As=new K,Rs=new K,M_=new K,Dd=new K,Ud=new K,Nd=new K,Ld=new ln,Od=new ln,Pd=new ln;class Ai{constructor(e=new K,i=new K,r=new K){this.a=e,this.b=i,this.c=r}static getNormal(e,i,r,l){l.subVectors(r,i),Li.subVectors(e,i),l.cross(Li);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(e,i,r,l,c){Li.subVectors(l,i),va.subVectors(r,i),wd.subVectors(e,i);const d=Li.dot(Li),p=Li.dot(va),m=Li.dot(wd),h=va.dot(va),_=va.dot(wd),v=d*h-p*p;if(v===0)return c.set(0,0,0),null;const g=1/v,y=(h*m-p*_)*g,b=(d*_-p*m)*g;return c.set(1-y-b,b,y)}static containsPoint(e,i,r,l){return this.getBarycoord(e,i,r,l,xa)===null?!1:xa.x>=0&&xa.y>=0&&xa.x+xa.y<=1}static getInterpolation(e,i,r,l,c,d,p,m){return this.getBarycoord(e,i,r,l,xa)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,xa.x),m.addScaledVector(d,xa.y),m.addScaledVector(p,xa.z),m)}static getInterpolatedAttribute(e,i,r,l,c,d){return Ld.setScalar(0),Od.setScalar(0),Pd.setScalar(0),Ld.fromBufferAttribute(e,i),Od.fromBufferAttribute(e,r),Pd.fromBufferAttribute(e,l),d.setScalar(0),d.addScaledVector(Ld,c.x),d.addScaledVector(Od,c.y),d.addScaledVector(Pd,c.z),d}static isFrontFacing(e,i,r,l){return Li.subVectors(r,i),va.subVectors(e,i),Li.cross(va).dot(l)<0}set(e,i,r){return this.a.copy(e),this.b.copy(i),this.c.copy(r),this}setFromPointsAndIndices(e,i,r,l){return this.a.copy(e[i]),this.b.copy(e[r]),this.c.copy(e[l]),this}setFromAttributeAndIndices(e,i,r,l){return this.a.fromBufferAttribute(e,i),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,l),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Li.subVectors(this.c,this.b),va.subVectors(this.a,this.b),Li.cross(va).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ai.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,i){return Ai.getBarycoord(e,this.a,this.b,this.c,i)}getInterpolation(e,i,r,l,c){return Ai.getInterpolation(e,this.a,this.b,this.c,i,r,l,c)}containsPoint(e){return Ai.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ai.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,i){const r=this.a,l=this.b,c=this.c;let d,p;As.subVectors(l,r),Rs.subVectors(c,r),Dd.subVectors(e,r);const m=As.dot(Dd),h=Rs.dot(Dd);if(m<=0&&h<=0)return i.copy(r);Ud.subVectors(e,l);const _=As.dot(Ud),v=Rs.dot(Ud);if(_>=0&&v<=_)return i.copy(l);const g=m*v-_*h;if(g<=0&&m>=0&&_<=0)return d=m/(m-_),i.copy(r).addScaledVector(As,d);Nd.subVectors(e,c);const y=As.dot(Nd),b=Rs.dot(Nd);if(b>=0&&y<=b)return i.copy(c);const w=y*h-m*b;if(w<=0&&h>=0&&b<=0)return p=h/(h-b),i.copy(r).addScaledVector(Rs,p);const M=_*b-y*v;if(M<=0&&v-_>=0&&y-b>=0)return M_.subVectors(c,l),p=(v-_)/(v-_+(y-b)),i.copy(l).addScaledVector(M_,p);const S=1/(M+w+g);return d=w*S,p=g*S,i.copy(r).addScaledVector(As,d).addScaledVector(Rs,p)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class tl{constructor(e=new K(1/0,1/0,1/0),i=new K(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=i}set(e,i){return this.min.copy(e),this.max.copy(i),this}setFromArray(e){this.makeEmpty();for(let i=0,r=e.length;i<r;i+=3)this.expandByPoint(Oi.fromArray(e,i));return this}setFromBufferAttribute(e){this.makeEmpty();for(let i=0,r=e.count;i<r;i++)this.expandByPoint(Oi.fromBufferAttribute(e,i));return this}setFromPoints(e){this.makeEmpty();for(let i=0,r=e.length;i<r;i++)this.expandByPoint(e[i]);return this}setFromCenterAndSize(e,i){const r=Oi.copy(i).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,i=!1){return this.makeEmpty(),this.expandByObject(e,i)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,i=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const c=r.getAttribute("position");if(i===!0&&c!==void 0&&e.isInstancedMesh!==!0)for(let d=0,p=c.count;d<p;d++)e.isMesh===!0?e.getVertexPosition(d,Oi):Oi.fromBufferAttribute(c,d),Oi.applyMatrix4(e.matrixWorld),this.expandByPoint(Oi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),vc.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),vc.copy(r.boundingBox)),vc.applyMatrix4(e.matrixWorld),this.union(vc)}const l=e.children;for(let c=0,d=l.length;c<d;c++)this.expandByObject(l[c],i);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,i){return i.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Oi),Oi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let i,r;return e.normal.x>0?(i=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(i=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(i+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(i+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(i+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(i+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),i<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ko),xc.subVectors(this.max,ko),Cs.subVectors(e.a,ko),ws.subVectors(e.b,ko),Ds.subVectors(e.c,ko),nr.subVectors(ws,Cs),ir.subVectors(Ds,ws),wr.subVectors(Cs,Ds);let i=[0,-nr.z,nr.y,0,-ir.z,ir.y,0,-wr.z,wr.y,nr.z,0,-nr.x,ir.z,0,-ir.x,wr.z,0,-wr.x,-nr.y,nr.x,0,-ir.y,ir.x,0,-wr.y,wr.x,0];return!Id(i,Cs,ws,Ds,xc)||(i=[1,0,0,0,1,0,0,0,1],!Id(i,Cs,ws,Ds,xc))?!1:(Sc.crossVectors(nr,ir),i=[Sc.x,Sc.y,Sc.z],Id(i,Cs,ws,Ds,xc))}clampPoint(e,i){return i.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Oi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Oi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Sa[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Sa[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Sa[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Sa[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Sa[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Sa[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Sa[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Sa[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Sa),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Sa=[new K,new K,new K,new K,new K,new K,new K,new K],Oi=new K,vc=new tl,Cs=new K,ws=new K,Ds=new K,nr=new K,ir=new K,wr=new K,ko=new K,xc=new K,Sc=new K,Dr=new K;function Id(s,e,i,r,l){for(let c=0,d=s.length-3;c<=d;c+=3){Dr.fromArray(s,c);const p=l.x*Math.abs(Dr.x)+l.y*Math.abs(Dr.y)+l.z*Math.abs(Dr.z),m=e.dot(Dr),h=i.dot(Dr),_=r.dot(Dr);if(Math.max(-Math.max(m,h,_),Math.min(m,h,_))>p)return!1}return!0}const Sn=new K,Mc=new Et;let Ny=0;class Ki extends Vr{constructor(e,i,r=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ny++}),this.name="",this.array=e,this.itemSize=i,this.count=e!==void 0?e.length/i:0,this.normalized=r,this.usage=s_,this.updateRanges=[],this.gpuType=Wi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,i,r){e*=this.itemSize,r*=i.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[e+l]=i.array[r+l];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let i=0,r=this.count;i<r;i++)Mc.fromBufferAttribute(this,i),Mc.applyMatrix3(e),this.setXY(i,Mc.x,Mc.y);else if(this.itemSize===3)for(let i=0,r=this.count;i<r;i++)Sn.fromBufferAttribute(this,i),Sn.applyMatrix3(e),this.setXYZ(i,Sn.x,Sn.y,Sn.z);return this}applyMatrix4(e){for(let i=0,r=this.count;i<r;i++)Sn.fromBufferAttribute(this,i),Sn.applyMatrix4(e),this.setXYZ(i,Sn.x,Sn.y,Sn.z);return this}applyNormalMatrix(e){for(let i=0,r=this.count;i<r;i++)Sn.fromBufferAttribute(this,i),Sn.applyNormalMatrix(e),this.setXYZ(i,Sn.x,Sn.y,Sn.z);return this}transformDirection(e){for(let i=0,r=this.count;i<r;i++)Sn.fromBufferAttribute(this,i),Sn.transformDirection(e),this.setXYZ(i,Sn.x,Sn.y,Sn.z);return this}set(e,i=0){return this.array.set(e,i),this}getComponent(e,i){let r=this.array[e*this.itemSize+i];return this.normalized&&(r=Ps(r,this.array)),r}setComponent(e,i,r){return this.normalized&&(r=Gn(r,this.array)),this.array[e*this.itemSize+i]=r,this}getX(e){let i=this.array[e*this.itemSize];return this.normalized&&(i=Ps(i,this.array)),i}setX(e,i){return this.normalized&&(i=Gn(i,this.array)),this.array[e*this.itemSize]=i,this}getY(e){let i=this.array[e*this.itemSize+1];return this.normalized&&(i=Ps(i,this.array)),i}setY(e,i){return this.normalized&&(i=Gn(i,this.array)),this.array[e*this.itemSize+1]=i,this}getZ(e){let i=this.array[e*this.itemSize+2];return this.normalized&&(i=Ps(i,this.array)),i}setZ(e,i){return this.normalized&&(i=Gn(i,this.array)),this.array[e*this.itemSize+2]=i,this}getW(e){let i=this.array[e*this.itemSize+3];return this.normalized&&(i=Ps(i,this.array)),i}setW(e,i){return this.normalized&&(i=Gn(i,this.array)),this.array[e*this.itemSize+3]=i,this}setXY(e,i,r){return e*=this.itemSize,this.normalized&&(i=Gn(i,this.array),r=Gn(r,this.array)),this.array[e+0]=i,this.array[e+1]=r,this}setXYZ(e,i,r,l){return e*=this.itemSize,this.normalized&&(i=Gn(i,this.array),r=Gn(r,this.array),l=Gn(l,this.array)),this.array[e+0]=i,this.array[e+1]=r,this.array[e+2]=l,this}setXYZW(e,i,r,l,c){return e*=this.itemSize,this.normalized&&(i=Gn(i,this.array),r=Gn(r,this.array),l=Gn(l,this.array),c=Gn(c,this.array)),this.array[e+0]=i,this.array[e+1]=r,this.array[e+2]=l,this.array[e+3]=c,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==s_&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Dv extends Ki{constructor(e,i,r){super(new Uint16Array(e),i,r)}}class Uv extends Ki{constructor(e,i,r){super(new Uint32Array(e),i,r)}}class Qt extends Ki{constructor(e,i,r){super(new Float32Array(e),i,r)}}const Ly=new tl,Xo=new K,zd=new K;class au{constructor(e=new K,i=-1){this.isSphere=!0,this.center=e,this.radius=i}set(e,i){return this.center.copy(e),this.radius=i,this}setFromPoints(e,i){const r=this.center;i!==void 0?r.copy(i):Ly.setFromPoints(e).getCenter(r);let l=0;for(let c=0,d=e.length;c<d;c++)l=Math.max(l,r.distanceToSquared(e[c]));return this.radius=Math.sqrt(l),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const i=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=i*i}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,i){const r=this.center.distanceToSquared(e);return i.copy(e),r>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Xo.subVectors(e,this.center);const i=Xo.lengthSq();if(i>this.radius*this.radius){const r=Math.sqrt(i),l=(r-this.radius)*.5;this.center.addScaledVector(Xo,l/r),this.radius+=l}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(zd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Xo.copy(e.center).add(zd)),this.expandByPoint(Xo.copy(e.center).sub(zd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Oy=0;const Ei=new dn,Bd=new $n,Us=new K,di=new tl,Wo=new tl,Rn=new K;class hn extends Vr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Oy++}),this.uuid=Ws(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(JM(e)?Uv:Dv)(e,1):this.index=e,this}setIndirect(e,i=0){return this.indirect=e,this.indirectOffset=i,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,i){return this.attributes[e]=i,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,i,r=0){this.groups.push({start:e,count:i,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,i){this.drawRange.start=e,this.drawRange.count=i}applyMatrix4(e){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(e),i.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const c=new st().getNormalMatrix(e);r.applyNormalMatrix(c),r.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(e),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Ei.makeRotationFromQuaternion(e),this.applyMatrix4(Ei),this}rotateX(e){return Ei.makeRotationX(e),this.applyMatrix4(Ei),this}rotateY(e){return Ei.makeRotationY(e),this.applyMatrix4(Ei),this}rotateZ(e){return Ei.makeRotationZ(e),this.applyMatrix4(Ei),this}translate(e,i,r){return Ei.makeTranslation(e,i,r),this.applyMatrix4(Ei),this}scale(e,i,r){return Ei.makeScale(e,i,r),this.applyMatrix4(Ei),this}lookAt(e){return Bd.lookAt(e),Bd.updateMatrix(),this.applyMatrix4(Bd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Us).negate(),this.translate(Us.x,Us.y,Us.z),this}setFromPoints(e){const i=this.getAttribute("position");if(i===void 0){const r=[];for(let l=0,c=e.length;l<c;l++){const d=e[l];r.push(d.x,d.y,d.z||0)}this.setAttribute("position",new Qt(r,3))}else{const r=Math.min(e.length,i.count);for(let l=0;l<r;l++){const c=e[l];i.setXYZ(l,c.x,c.y,c.z||0)}e.length>i.count&&tt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new tl);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){bt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new K(-1/0,-1/0,-1/0),new K(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),i)for(let r=0,l=i.length;r<l;r++){const c=i[r];di.setFromBufferAttribute(c),this.morphTargetsRelative?(Rn.addVectors(this.boundingBox.min,di.min),this.boundingBox.expandByPoint(Rn),Rn.addVectors(this.boundingBox.max,di.max),this.boundingBox.expandByPoint(Rn)):(this.boundingBox.expandByPoint(di.min),this.boundingBox.expandByPoint(di.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&bt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new au);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){bt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new K,1/0);return}if(e){const r=this.boundingSphere.center;if(di.setFromBufferAttribute(e),i)for(let c=0,d=i.length;c<d;c++){const p=i[c];Wo.setFromBufferAttribute(p),this.morphTargetsRelative?(Rn.addVectors(di.min,Wo.min),di.expandByPoint(Rn),Rn.addVectors(di.max,Wo.max),di.expandByPoint(Rn)):(di.expandByPoint(Wo.min),di.expandByPoint(Wo.max))}di.getCenter(r);let l=0;for(let c=0,d=e.count;c<d;c++)Rn.fromBufferAttribute(e,c),l=Math.max(l,r.distanceToSquared(Rn));if(i)for(let c=0,d=i.length;c<d;c++){const p=i[c],m=this.morphTargetsRelative;for(let h=0,_=p.count;h<_;h++)Rn.fromBufferAttribute(p,h),m&&(Us.fromBufferAttribute(e,h),Rn.add(Us)),l=Math.max(l,r.distanceToSquared(Rn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&bt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,i=this.attributes;if(e===null||i.position===void 0||i.normal===void 0||i.uv===void 0){bt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=i.position,l=i.normal,c=i.uv;let d=this.getAttribute("tangent");(d===void 0||d.count!==r.count)&&(d=new Ki(new Float32Array(4*r.count),4),this.setAttribute("tangent",d));const p=[],m=[];for(let T=0;T<r.count;T++)p[T]=new K,m[T]=new K;const h=new K,_=new K,v=new K,g=new Et,y=new Et,b=new Et,w=new K,M=new K;function S(T,U,k){h.fromBufferAttribute(r,T),_.fromBufferAttribute(r,U),v.fromBufferAttribute(r,k),g.fromBufferAttribute(c,T),y.fromBufferAttribute(c,U),b.fromBufferAttribute(c,k),_.sub(h),v.sub(h),y.sub(g),b.sub(g);const F=1/(y.x*b.y-b.x*y.y);isFinite(F)&&(w.copy(_).multiplyScalar(b.y).addScaledVector(v,-y.y).multiplyScalar(F),M.copy(v).multiplyScalar(y.x).addScaledVector(_,-b.x).multiplyScalar(F),p[T].add(w),p[U].add(w),p[k].add(w),m[T].add(M),m[U].add(M),m[k].add(M))}let D=this.groups;D.length===0&&(D=[{start:0,count:e.count}]);for(let T=0,U=D.length;T<U;++T){const k=D[T],F=k.start,W=k.count;for(let ce=F,me=F+W;ce<me;ce+=3)S(e.getX(ce+0),e.getX(ce+1),e.getX(ce+2))}const P=new K,C=new K,z=new K,N=new K;function L(T){z.fromBufferAttribute(l,T),N.copy(z);const U=p[T];P.copy(U),P.sub(z.multiplyScalar(z.dot(U))).normalize(),C.crossVectors(N,U);const F=C.dot(m[T])<0?-1:1;d.setXYZW(T,P.x,P.y,P.z,F)}for(let T=0,U=D.length;T<U;++T){const k=D[T],F=k.start,W=k.count;for(let ce=F,me=F+W;ce<me;ce+=3)L(e.getX(ce+0)),L(e.getX(ce+1)),L(e.getX(ce+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,i=this.getAttribute("position");if(i!==void 0){let r=this.getAttribute("normal");if(r===void 0||r.count!==i.count)r=new Ki(new Float32Array(i.count*3),3),this.setAttribute("normal",r);else for(let g=0,y=r.count;g<y;g++)r.setXYZ(g,0,0,0);const l=new K,c=new K,d=new K,p=new K,m=new K,h=new K,_=new K,v=new K;if(e)for(let g=0,y=e.count;g<y;g+=3){const b=e.getX(g+0),w=e.getX(g+1),M=e.getX(g+2);l.fromBufferAttribute(i,b),c.fromBufferAttribute(i,w),d.fromBufferAttribute(i,M),_.subVectors(d,c),v.subVectors(l,c),_.cross(v),p.fromBufferAttribute(r,b),m.fromBufferAttribute(r,w),h.fromBufferAttribute(r,M),p.add(_),m.add(_),h.add(_),r.setXYZ(b,p.x,p.y,p.z),r.setXYZ(w,m.x,m.y,m.z),r.setXYZ(M,h.x,h.y,h.z)}else for(let g=0,y=i.count;g<y;g+=3)l.fromBufferAttribute(i,g+0),c.fromBufferAttribute(i,g+1),d.fromBufferAttribute(i,g+2),_.subVectors(d,c),v.subVectors(l,c),_.cross(v),r.setXYZ(g+0,_.x,_.y,_.z),r.setXYZ(g+1,_.x,_.y,_.z),r.setXYZ(g+2,_.x,_.y,_.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let i=0,r=e.count;i<r;i++)Rn.fromBufferAttribute(e,i),Rn.normalize(),e.setXYZ(i,Rn.x,Rn.y,Rn.z)}toNonIndexed(){function e(p,m){const h=p.array,_=p.itemSize,v=p.normalized,g=new h.constructor(m.length*_);let y=0,b=0;for(let w=0,M=m.length;w<M;w++){p.isInterleavedBufferAttribute?y=m[w]*p.data.stride+p.offset:y=m[w]*_;for(let S=0;S<_;S++)g[b++]=h[y++]}return new Ki(g,_,v)}if(this.index===null)return tt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new hn,r=this.index.array,l=this.attributes;for(const p in l){const m=l[p],h=e(m,r);i.setAttribute(p,h)}const c=this.morphAttributes;for(const p in c){const m=[],h=c[p];for(let _=0,v=h.length;_<v;_++){const g=h[_],y=e(g,r);m.push(y)}i.morphAttributes[p]=m}i.morphTargetsRelative=this.morphTargetsRelative;const d=this.groups;for(let p=0,m=d.length;p<m;p++){const h=d[p];i.addGroup(h.start,h.count,h.materialIndex)}return i}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const m=this.parameters;for(const h in m)m[h]!==void 0&&(e[h]=m[h]);return e}e.data={attributes:{}};const i=this.index;i!==null&&(e.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const r=this.attributes;for(const m in r){const h=r[m];e.data.attributes[m]=h.toJSON(e.data)}const l={};let c=!1;for(const m in this.morphAttributes){const h=this.morphAttributes[m],_=[];for(let v=0,g=h.length;v<g;v++){const y=h[v];_.push(y.toJSON(e.data))}_.length>0&&(l[m]=_,c=!0)}c&&(e.data.morphAttributes=l,e.data.morphTargetsRelative=this.morphTargetsRelative);const d=this.groups;d.length>0&&(e.data.groups=JSON.parse(JSON.stringify(d)));const p=this.boundingSphere;return p!==null&&(e.data.boundingSphere=p.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone());const l=e.attributes;for(const h in l){const _=l[h];this.setAttribute(h,_.clone(i))}const c=e.morphAttributes;for(const h in c){const _=[],v=c[h];for(let g=0,y=v.length;g<y;g++)_.push(v[g].clone(i));this.morphAttributes[h]=_}this.morphTargetsRelative=e.morphTargetsRelative;const d=e.groups;for(let h=0,_=d.length;h<_;h++){const v=d[h];this.addGroup(v.start,v.count,v.materialIndex)}const p=e.boundingBox;p!==null&&(this.boundingBox=p.clone());const m=e.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Py=0;class nl extends Vr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Py++}),this.uuid=Ws(),this.name="",this.type="Material",this.blending=Is,this.side=lr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=$d,this.blendDst=eh,this.blendEquation=Or,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Tt(0,0,0),this.blendAlpha=0,this.depthFunc=Gs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=r_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ms,this.stencilZFail=Ms,this.stencilZPass=Ms,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const i in e){const r=e[i];if(r===void 0){tt(`Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){tt(`Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(r):l&&l.isVector2&&r&&r.isVector2||l&&l.isEuler&&r&&r.isEuler||l&&l.isVector3&&r&&r.isVector3?l.copy(r):this[i]=r}}toJSON(e){const i=e===void 0||typeof e=="string";i&&(e={textures:{},images:{}});const r={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(r.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(r.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==Is&&(r.blending=this.blending),this.side!==lr&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==$d&&(r.blendSrc=this.blendSrc),this.blendDst!==eh&&(r.blendDst=this.blendDst),this.blendEquation!==Or&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==Gs&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==r_&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ms&&(r.stencilFail=this.stencilFail),this.stencilZFail!==Ms&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==Ms&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.allowOverride===!1&&(r.allowOverride=!1),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function l(c){const d=[];for(const p in c){const m=c[p];delete m.metadata,d.push(m)}return d}if(i){const c=l(e.textures),d=l(e.images);c.length>0&&(r.textures=c),d.length>0&&(r.images=d)}return r}fromJSON(e,i){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Tt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=i[e.map]||null),e.matcap!==void 0&&(this.matcap=i[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=i[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=i[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=i[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let r=e.normalScale;Array.isArray(r)===!1&&(r=[r,r]),this.normalScale=new Et().fromArray(r)}return e.displacementMap!==void 0&&(this.displacementMap=i[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=i[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=i[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=i[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=i[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=i[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=i[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=i[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=i[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=i[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=i[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=i[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=i[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=i[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Et().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=i[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=i[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=i[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=i[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=i[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=i[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=i[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const i=e.clippingPlanes;let r=null;if(i!==null){const l=i.length;r=new Array(l);for(let c=0;c!==l;++c)r[c]=i[c].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Ma=new K,Fd=new K,yc=new K,ar=new K,Hd=new K,Ec=new K,Gd=new K;class Nv{constructor(e=new K,i=new K(0,0,-1)){this.origin=e,this.direction=i}set(e,i){return this.origin.copy(e),this.direction.copy(i),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,i){return i.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ma)),this}closestPointToPoint(e,i){i.subVectors(e,this.origin);const r=i.dot(this.direction);return r<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const i=Ma.subVectors(e,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(e):(Ma.copy(this.origin).addScaledVector(this.direction,i),Ma.distanceToSquared(e))}distanceSqToSegment(e,i,r,l){Fd.copy(e).add(i).multiplyScalar(.5),yc.copy(i).sub(e).normalize(),ar.copy(this.origin).sub(Fd);const c=e.distanceTo(i)*.5,d=-this.direction.dot(yc),p=ar.dot(this.direction),m=-ar.dot(yc),h=ar.lengthSq(),_=Math.abs(1-d*d);let v,g,y,b;if(_>0)if(v=d*m-p,g=d*p-m,b=c*_,v>=0)if(g>=-b)if(g<=b){const w=1/_;v*=w,g*=w,y=v*(v+d*g+2*p)+g*(d*v+g+2*m)+h}else g=c,v=Math.max(0,-(d*g+p)),y=-v*v+g*(g+2*m)+h;else g=-c,v=Math.max(0,-(d*g+p)),y=-v*v+g*(g+2*m)+h;else g<=-b?(v=Math.max(0,-(-d*c+p)),g=v>0?-c:Math.min(Math.max(-c,-m),c),y=-v*v+g*(g+2*m)+h):g<=b?(v=0,g=Math.min(Math.max(-c,-m),c),y=g*(g+2*m)+h):(v=Math.max(0,-(d*c+p)),g=v>0?c:Math.min(Math.max(-c,-m),c),y=-v*v+g*(g+2*m)+h);else g=d>0?-c:c,v=Math.max(0,-(d*g+p)),y=-v*v+g*(g+2*m)+h;return r&&r.copy(this.origin).addScaledVector(this.direction,v),l&&l.copy(Fd).addScaledVector(yc,g),y}intersectSphere(e,i){Ma.subVectors(e.center,this.origin);const r=Ma.dot(this.direction),l=Ma.dot(Ma)-r*r,c=e.radius*e.radius;if(l>c)return null;const d=Math.sqrt(c-l),p=r-d,m=r+d;return m<0?null:p<0?this.at(m,i):this.at(p,i)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const i=e.normal.dot(this.direction);if(i===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/i;return r>=0?r:null}intersectPlane(e,i){const r=this.distanceToPlane(e);return r===null?null:this.at(r,i)}intersectsPlane(e){const i=e.distanceToPoint(this.origin);return i===0||e.normal.dot(this.direction)*i<0}intersectBox(e,i){let r,l,c,d,p,m;const h=1/this.direction.x,_=1/this.direction.y,v=1/this.direction.z,g=this.origin;return h>=0?(r=(e.min.x-g.x)*h,l=(e.max.x-g.x)*h):(r=(e.max.x-g.x)*h,l=(e.min.x-g.x)*h),_>=0?(c=(e.min.y-g.y)*_,d=(e.max.y-g.y)*_):(c=(e.max.y-g.y)*_,d=(e.min.y-g.y)*_),r>d||c>l||((c>r||isNaN(r))&&(r=c),(d<l||isNaN(l))&&(l=d),v>=0?(p=(e.min.z-g.z)*v,m=(e.max.z-g.z)*v):(p=(e.max.z-g.z)*v,m=(e.min.z-g.z)*v),r>m||p>l)||((p>r||r!==r)&&(r=p),(m<l||l!==l)&&(l=m),l<0)?null:this.at(r>=0?r:l,i)}intersectsBox(e){return this.intersectBox(e,Ma)!==null}intersectTriangle(e,i,r,l,c){Hd.subVectors(i,e),Ec.subVectors(r,e),Gd.crossVectors(Hd,Ec);let d=this.direction.dot(Gd),p;if(d>0){if(l)return null;p=1}else if(d<0)p=-1,d=-d;else return null;ar.subVectors(this.origin,e);const m=p*this.direction.dot(Ec.crossVectors(ar,Ec));if(m<0)return null;const h=p*this.direction.dot(Hd.cross(ar));if(h<0||m+h>d)return null;const _=-p*ar.dot(Gd);return _<0?null:this.at(_/d,c)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class On extends nl{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Tt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gr,this.combine=uv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const y_=new dn,Ur=new Nv,bc=new au,E_=new K,Tc=new K,Ac=new K,Rc=new K,Vd=new K,Cc=new K,b_=new K,wc=new K;class qt extends $n{constructor(e=new hn,i=new On){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,r=Object.keys(i);if(r.length>0){const l=i[r[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,d=l.length;c<d;c++){const p=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[p]=c}}}}getVertexPosition(e,i){const r=this.geometry,l=r.attributes.position,c=r.morphAttributes.position,d=r.morphTargetsRelative;i.fromBufferAttribute(l,e);const p=this.morphTargetInfluences;if(c&&p){Cc.set(0,0,0);for(let m=0,h=c.length;m<h;m++){const _=p[m],v=c[m];_!==0&&(Vd.fromBufferAttribute(v,e),d?Cc.addScaledVector(Vd,_):Cc.addScaledVector(Vd.sub(i),_))}i.add(Cc)}return i}raycast(e,i){const r=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),bc.copy(r.boundingSphere),bc.applyMatrix4(c),Ur.copy(e.ray).recast(e.near),!(bc.containsPoint(Ur.origin)===!1&&(Ur.intersectSphere(bc,E_)===null||Ur.origin.distanceToSquared(E_)>(e.far-e.near)**2))&&(y_.copy(c).invert(),Ur.copy(e.ray).applyMatrix4(y_),!(r.boundingBox!==null&&Ur.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,i,Ur)))}_computeIntersections(e,i,r){let l;const c=this.geometry,d=this.material,p=c.index,m=c.attributes.position,h=c.attributes.uv,_=c.attributes.uv1,v=c.attributes.normal,g=c.groups,y=c.drawRange;if(p!==null)if(Array.isArray(d))for(let b=0,w=g.length;b<w;b++){const M=g[b],S=d[M.materialIndex],D=Math.max(M.start,y.start),P=Math.min(p.count,Math.min(M.start+M.count,y.start+y.count));for(let C=D,z=P;C<z;C+=3){const N=p.getX(C),L=p.getX(C+1),T=p.getX(C+2);l=Dc(this,S,e,r,h,_,v,N,L,T),l&&(l.faceIndex=Math.floor(C/3),l.face.materialIndex=M.materialIndex,i.push(l))}}else{const b=Math.max(0,y.start),w=Math.min(p.count,y.start+y.count);for(let M=b,S=w;M<S;M+=3){const D=p.getX(M),P=p.getX(M+1),C=p.getX(M+2);l=Dc(this,d,e,r,h,_,v,D,P,C),l&&(l.faceIndex=Math.floor(M/3),i.push(l))}}else if(m!==void 0)if(Array.isArray(d))for(let b=0,w=g.length;b<w;b++){const M=g[b],S=d[M.materialIndex],D=Math.max(M.start,y.start),P=Math.min(m.count,Math.min(M.start+M.count,y.start+y.count));for(let C=D,z=P;C<z;C+=3){const N=C,L=C+1,T=C+2;l=Dc(this,S,e,r,h,_,v,N,L,T),l&&(l.faceIndex=Math.floor(C/3),l.face.materialIndex=M.materialIndex,i.push(l))}}else{const b=Math.max(0,y.start),w=Math.min(m.count,y.start+y.count);for(let M=b,S=w;M<S;M+=3){const D=M,P=M+1,C=M+2;l=Dc(this,d,e,r,h,_,v,D,P,C),l&&(l.faceIndex=Math.floor(M/3),i.push(l))}}}}function Iy(s,e,i,r,l,c,d,p){let m;if(e.side===jn?m=r.intersectTriangle(d,c,l,!0,p):m=r.intersectTriangle(l,c,d,e.side===lr,p),m===null)return null;wc.copy(p),wc.applyMatrix4(s.matrixWorld);const h=i.ray.origin.distanceTo(wc);return h<i.near||h>i.far?null:{distance:h,point:wc.clone(),object:s}}function Dc(s,e,i,r,l,c,d,p,m,h){s.getVertexPosition(p,Tc),s.getVertexPosition(m,Ac),s.getVertexPosition(h,Rc);const _=Iy(s,e,i,r,Tc,Ac,Rc,b_);if(_){const v=new K;Ai.getBarycoord(b_,Tc,Ac,Rc,v),l&&(_.uv=Ai.getInterpolatedAttribute(l,p,m,h,v,new Et)),c&&(_.uv1=Ai.getInterpolatedAttribute(c,p,m,h,v,new Et)),d&&(_.normal=Ai.getInterpolatedAttribute(d,p,m,h,v,new K),_.normal.dot(r.direction)>0&&_.normal.multiplyScalar(-1));const g={a:p,b:m,c:h,normal:new K,materialIndex:0};Ai.getNormal(Tc,Ac,Rc,g.normal),_.face=g,_.barycoord=v}return _}class zy extends Xn{constructor(e=null,i=1,r=1,l,c,d,p,m,h=Ln,_=Ln,v,g){super(null,d,p,m,h,_,l,c,v,g),this.isDataTexture=!0,this.image={data:e,width:i,height:r},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const kd=new K,By=new K,Fy=new st;class Lr{constructor(e=new K(1,0,0),i=0){this.isPlane=!0,this.normal=e,this.constant=i}set(e,i){return this.normal.copy(e),this.constant=i,this}setComponents(e,i,r,l){return this.normal.set(e,i,r),this.constant=l,this}setFromNormalAndCoplanarPoint(e,i){return this.normal.copy(e),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(e,i,r){const l=kd.subVectors(r,i).cross(By.subVectors(e,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,i){return i.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,i,r=!0){const l=e.delta(kd),c=this.normal.dot(l);if(c===0)return this.distanceToPoint(e.start)===0?i.copy(e.start):null;const d=-(e.start.dot(this.normal)+this.constant)/c;return r===!0&&(d<0||d>1)?null:i.copy(e.start).addScaledVector(l,d)}intersectsLine(e){const i=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return i<0&&r>0||r<0&&i>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,i){const r=i||Fy.getNormalMatrix(e),l=this.coplanarPoint(kd).applyMatrix4(e),c=this.normal.applyMatrix3(r).normalize();return this.constant=-l.dot(c),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Nr=new au,Hy=new Et(.5,.5),Uc=new K;class Lv{constructor(e=new Lr,i=new Lr,r=new Lr,l=new Lr,c=new Lr,d=new Lr){this.planes=[e,i,r,l,c,d]}set(e,i,r,l,c,d){const p=this.planes;return p[0].copy(e),p[1].copy(i),p[2].copy(r),p[3].copy(l),p[4].copy(c),p[5].copy(d),this}copy(e){const i=this.planes;for(let r=0;r<6;r++)i[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,i=qi,r=!1){const l=this.planes,c=e.elements,d=c[0],p=c[1],m=c[2],h=c[3],_=c[4],v=c[5],g=c[6],y=c[7],b=c[8],w=c[9],M=c[10],S=c[11],D=c[12],P=c[13],C=c[14],z=c[15];if(l[0].setComponents(h-d,y-_,S-b,z-D).normalize(),l[1].setComponents(h+d,y+_,S+b,z+D).normalize(),l[2].setComponents(h+p,y+v,S+w,z+P).normalize(),l[3].setComponents(h-p,y-v,S-w,z-P).normalize(),r)l[4].setComponents(m,g,M,C).normalize(),l[5].setComponents(h-m,y-g,S-M,z-C).normalize();else if(l[4].setComponents(h-m,y-g,S-M,z-C).normalize(),i===qi)l[5].setComponents(h+m,y+g,S+M,z+C).normalize();else if(i===Jc)l[5].setComponents(m,g,M,C).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Nr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const i=e.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),Nr.copy(i.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Nr)}intersectsSprite(e){Nr.center.set(0,0,0);const i=Hy.distanceTo(e.center);return Nr.radius=.7071067811865476+i,Nr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Nr)}intersectsSphere(e){const i=this.planes,r=e.center,l=-e.radius;for(let c=0;c<6;c++)if(i[c].distanceToPoint(r)<l)return!1;return!0}intersectsBox(e){const i=this.planes;for(let r=0;r<6;r++){const l=i[r];if(Uc.x=l.normal.x>0?e.max.x:e.min.x,Uc.y=l.normal.y>0?e.max.y:e.min.y,Uc.z=l.normal.z>0?e.max.z:e.min.z,l.distanceToPoint(Uc)<0)return!1}return!0}containsPoint(e){const i=this.planes;for(let r=0;r<6;r++)if(i[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ov extends nl{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Tt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const $c=new K,eu=new K,T_=new dn,qo=new Nv,Nc=new au,Xd=new K,A_=new K;class Gy extends $n{constructor(e=new hn,i=new Ov){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const i=e.attributes.position,r=[0];for(let l=1,c=i.count;l<c;l++)$c.fromBufferAttribute(i,l-1),eu.fromBufferAttribute(i,l),r[l]=r[l-1],r[l]+=$c.distanceTo(eu);e.setAttribute("lineDistance",new Qt(r,1))}else tt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,i){const r=this.geometry,l=this.matrixWorld,c=e.params.Line.threshold,d=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),Nc.copy(r.boundingSphere),Nc.applyMatrix4(l),Nc.radius+=c,e.ray.intersectsSphere(Nc)===!1)return;T_.copy(l).invert(),qo.copy(e.ray).applyMatrix4(T_);const p=c/((this.scale.x+this.scale.y+this.scale.z)/3),m=p*p,h=this.isLineSegments?2:1,_=r.index,g=r.attributes.position;if(_!==null){const y=Math.max(0,d.start),b=Math.min(_.count,d.start+d.count);for(let w=y,M=b-1;w<M;w+=h){const S=_.getX(w),D=_.getX(w+1),P=Lc(this,e,qo,m,S,D,w);P&&i.push(P)}if(this.isLineLoop){const w=_.getX(b-1),M=_.getX(y),S=Lc(this,e,qo,m,w,M,b-1);S&&i.push(S)}}else{const y=Math.max(0,d.start),b=Math.min(g.count,d.start+d.count);for(let w=y,M=b-1;w<M;w+=h){const S=Lc(this,e,qo,m,w,w+1,w);S&&i.push(S)}if(this.isLineLoop){const w=Lc(this,e,qo,m,b-1,y,b-1);w&&i.push(w)}}}updateMorphTargets(){const i=this.geometry.morphAttributes,r=Object.keys(i);if(r.length>0){const l=i[r[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,d=l.length;c<d;c++){const p=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[p]=c}}}}}function Lc(s,e,i,r,l,c,d){const p=s.geometry.attributes.position;if($c.fromBufferAttribute(p,l),eu.fromBufferAttribute(p,c),i.distanceSqToSegment($c,eu,Xd,A_)>r)return;Xd.applyMatrix4(s.matrixWorld);const h=e.ray.origin.distanceTo(Xd);if(!(h<e.near||h>e.far))return{distance:h,point:A_.clone().applyMatrix4(s.matrixWorld),index:d,face:null,faceIndex:null,barycoord:null,object:s}}const R_=new K,C_=new K;class ip extends Gy{constructor(e,i){super(e,i),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const i=e.attributes.position,r=[];for(let l=0,c=i.count;l<c;l+=2)R_.fromBufferAttribute(i,l),C_.fromBufferAttribute(i,l+1),r[l]=l===0?0:r[l-1],r[l+1]=r[l]+R_.distanceTo(C_);e.setAttribute("lineDistance",new Qt(r,1))}else tt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Pv extends Xn{constructor(e=[],i=Fr,r,l,c,d,p,m,h,_){super(e,i,r,l,c,d,p,m,h,_),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ks extends Xn{constructor(e,i,r=Qi,l,c,d,p=Ln,m=Ln,h,_=Aa,v=1){if(_!==Aa&&_!==zr)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const g={width:e,height:i,depth:v};super(g,l,c,d,p,m,_,r,h),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new tp(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const i=super.toJSON(e);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class Vy extends ks{constructor(e,i=Qi,r=Fr,l,c,d=Ln,p=Ln,m,h=Aa){const _={width:e,height:e,depth:1},v=[_,_,_,_,_,_];super(e,e,i,r,l,c,d,p,m,h),this.image=v,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Iv extends Xn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Ys extends hn{constructor(e=1,i=1,r=1,l=1,c=1,d=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:i,depth:r,widthSegments:l,heightSegments:c,depthSegments:d};const p=this;l=Math.floor(l),c=Math.floor(c),d=Math.floor(d);const m=[],h=[],_=[],v=[];let g=0,y=0;b("z","y","x",-1,-1,r,i,e,d,c,0),b("z","y","x",1,-1,r,i,-e,d,c,1),b("x","z","y",1,1,e,r,i,l,d,2),b("x","z","y",1,-1,e,r,-i,l,d,3),b("x","y","z",1,-1,e,i,r,l,c,4),b("x","y","z",-1,-1,e,i,-r,l,c,5),this.setIndex(m),this.setAttribute("position",new Qt(h,3)),this.setAttribute("normal",new Qt(_,3)),this.setAttribute("uv",new Qt(v,2));function b(w,M,S,D,P,C,z,N,L,T,U){const k=C/L,F=z/T,W=C/2,ce=z/2,me=N/2,j=L+1,B=T+1;let G=0,te=0;const ge=new K;for(let Ee=0;Ee<B;Ee++){const I=Ee*F-ce;for(let Q=0;Q<j;Q++){const ye=Q*k-W;ge[w]=ye*D,ge[M]=I*P,ge[S]=me,h.push(ge.x,ge.y,ge.z),ge[w]=0,ge[M]=0,ge[S]=N>0?1:-1,_.push(ge.x,ge.y,ge.z),v.push(Q/L),v.push(1-Ee/T),G+=1}}for(let Ee=0;Ee<T;Ee++)for(let I=0;I<L;I++){const Q=g+I+j*Ee,ye=g+I+j*(Ee+1),Re=g+(I+1)+j*(Ee+1),Pe=g+(I+1)+j*Ee;m.push(Q,ye,Pe),m.push(ye,Re,Pe),te+=6}p.addGroup(y,te,U),y+=te,g+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ys(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class ap extends hn{constructor(e=[],i=[],r=1,l=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:i,radius:r,detail:l};const c=[],d=[];p(l),h(r),_(),this.setAttribute("position",new Qt(c,3)),this.setAttribute("normal",new Qt(c.slice(),3)),this.setAttribute("uv",new Qt(d,2)),l===0?this.computeVertexNormals():this.normalizeNormals();function p(D){const P=new K,C=new K,z=new K;for(let N=0;N<i.length;N+=3)y(i[N+0],P),y(i[N+1],C),y(i[N+2],z),m(P,C,z,D)}function m(D,P,C,z){const N=z+1,L=[];for(let T=0;T<=N;T++){L[T]=[];const U=D.clone().lerp(C,T/N),k=P.clone().lerp(C,T/N),F=N-T;for(let W=0;W<=F;W++)W===0&&T===N?L[T][W]=U:L[T][W]=U.clone().lerp(k,W/F)}for(let T=0;T<N;T++)for(let U=0;U<2*(N-T)-1;U++){const k=Math.floor(U/2);U%2===0?(g(L[T][k+1]),g(L[T+1][k]),g(L[T][k])):(g(L[T][k+1]),g(L[T+1][k+1]),g(L[T+1][k]))}}function h(D){const P=new K;for(let C=0;C<c.length;C+=3)P.x=c[C+0],P.y=c[C+1],P.z=c[C+2],P.normalize().multiplyScalar(D),c[C+0]=P.x,c[C+1]=P.y,c[C+2]=P.z}function _(){const D=new K;for(let P=0;P<c.length;P+=3){D.x=c[P+0],D.y=c[P+1],D.z=c[P+2];const C=M(D)/2/Math.PI+.5,z=S(D)/Math.PI+.5;d.push(C,1-z)}b(),v()}function v(){for(let D=0;D<d.length;D+=6){const P=d[D+0],C=d[D+2],z=d[D+4],N=Math.max(P,C,z),L=Math.min(P,C,z);N>.9&&L<.1&&(P<.2&&(d[D+0]+=1),C<.2&&(d[D+2]+=1),z<.2&&(d[D+4]+=1))}}function g(D){c.push(D.x,D.y,D.z)}function y(D,P){const C=D*3;P.x=e[C+0],P.y=e[C+1],P.z=e[C+2]}function b(){const D=new K,P=new K,C=new K,z=new K,N=new Et,L=new Et,T=new Et;for(let U=0,k=0;U<c.length;U+=9,k+=6){D.set(c[U+0],c[U+1],c[U+2]),P.set(c[U+3],c[U+4],c[U+5]),C.set(c[U+6],c[U+7],c[U+8]),N.set(d[k+0],d[k+1]),L.set(d[k+2],d[k+3]),T.set(d[k+4],d[k+5]),z.copy(D).add(P).add(C).divideScalar(3);const F=M(z);w(N,k+0,D,F),w(L,k+2,P,F),w(T,k+4,C,F)}}function w(D,P,C,z){z<0&&D.x===1&&(d[P]=D.x-1),C.x===0&&C.z===0&&(d[P]=z/2/Math.PI+.5)}function M(D){return Math.atan2(D.z,-D.x)}function S(D){return Math.atan2(-D.y,Math.sqrt(D.x*D.x+D.z*D.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ap(e.vertices,e.indices,e.radius,e.detail)}}const Oc=new K,Pc=new K,Wd=new K,Ic=new Ai;class zv extends hn{constructor(e=null,i=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:i},e!==null){const l=Math.pow(10,4),c=Math.cos(Bs*i),d=e.getIndex(),p=e.getAttribute("position"),m=d?d.count:p.count,h=[0,0,0],_=["a","b","c"],v=new Array(3),g={},y=[];for(let b=0;b<m;b+=3){d?(h[0]=d.getX(b),h[1]=d.getX(b+1),h[2]=d.getX(b+2)):(h[0]=b,h[1]=b+1,h[2]=b+2);const{a:w,b:M,c:S}=Ic;if(w.fromBufferAttribute(p,h[0]),M.fromBufferAttribute(p,h[1]),S.fromBufferAttribute(p,h[2]),Ic.getNormal(Wd),v[0]=`${Math.round(w.x*l)},${Math.round(w.y*l)},${Math.round(w.z*l)}`,v[1]=`${Math.round(M.x*l)},${Math.round(M.y*l)},${Math.round(M.z*l)}`,v[2]=`${Math.round(S.x*l)},${Math.round(S.y*l)},${Math.round(S.z*l)}`,!(v[0]===v[1]||v[1]===v[2]||v[2]===v[0]))for(let D=0;D<3;D++){const P=(D+1)%3,C=v[D],z=v[P],N=Ic[_[D]],L=Ic[_[P]],T=`${C}_${z}`,U=`${z}_${C}`;U in g&&g[U]?(Wd.dot(g[U].normal)<=c&&(y.push(N.x,N.y,N.z),y.push(L.x,L.y,L.z)),g[U]=null):T in g||(g[T]={index0:h[D],index1:h[P],normal:Wd.clone()})}}for(const b in g)if(g[b]){const{index0:w,index1:M}=g[b];Oc.fromBufferAttribute(p,w),Pc.fromBufferAttribute(p,M),y.push(Oc.x,Oc.y,Oc.z),y.push(Pc.x,Pc.y,Pc.z)}this.setAttribute("position",new Qt(y,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Hs extends ap{constructor(e=1,i=0){const r=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],l=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(r,l,e,i),this.type="OctahedronGeometry",this.parameters={radius:e,detail:i}}static fromJSON(e){return new Hs(e.radius,e.detail)}}class ru extends hn{constructor(e=1,i=1,r=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:i,widthSegments:r,heightSegments:l};const c=e/2,d=i/2,p=Math.floor(r),m=Math.floor(l),h=p+1,_=m+1,v=e/p,g=i/m,y=[],b=[],w=[],M=[];for(let S=0;S<_;S++){const D=S*g-d;for(let P=0;P<h;P++){const C=P*v-c;b.push(C,-D,0),w.push(0,0,1),M.push(P/p),M.push(1-S/m)}}for(let S=0;S<m;S++)for(let D=0;D<p;D++){const P=D+h*S,C=D+h*(S+1),z=D+1+h*(S+1),N=D+1+h*S;y.push(P,C,N),y.push(C,z,N)}this.setIndex(y),this.setAttribute("position",new Qt(b,3)),this.setAttribute("normal",new Qt(w,3)),this.setAttribute("uv",new Qt(M,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ru(e.width,e.height,e.widthSegments,e.heightSegments)}}class tu extends hn{constructor(e=1,i=.4,r=12,l=48,c=Math.PI*2,d=0,p=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:i,radialSegments:r,tubularSegments:l,arc:c,thetaStart:d,thetaLength:p},r=Math.floor(r),l=Math.floor(l);const m=[],h=[],_=[],v=[],g=new K,y=new K,b=new K;for(let w=0;w<=r;w++){const M=d+w/r*p;for(let S=0;S<=l;S++){const D=S/l*c;y.x=(e+i*Math.cos(M))*Math.cos(D),y.y=(e+i*Math.cos(M))*Math.sin(D),y.z=i*Math.sin(M),h.push(y.x,y.y,y.z),g.x=e*Math.cos(D),g.y=e*Math.sin(D),b.subVectors(y,g).normalize(),_.push(b.x,b.y,b.z),v.push(S/l),v.push(w/r)}}for(let w=1;w<=r;w++)for(let M=1;M<=l;M++){const S=(l+1)*w+M-1,D=(l+1)*(w-1)+M-1,P=(l+1)*(w-1)+M,C=(l+1)*w+M;m.push(S,D,C),m.push(D,P,C)}this.setIndex(m),this.setAttribute("position",new Qt(h,3)),this.setAttribute("normal",new Qt(_,3)),this.setAttribute("uv",new Qt(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new tu(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}function Xs(s){const e={};for(const i in s){e[i]={};for(const r in s[i]){const l=s[i][r];if(w_(l))l.isRenderTargetTexture?(tt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[i][r]=null):e[i][r]=l.clone();else if(Array.isArray(l))if(w_(l[0])){const c=[];for(let d=0,p=l.length;d<p;d++)c[d]=l[d].clone();e[i][r]=c}else e[i][r]=l.slice();else e[i][r]=l}}return e}function Vn(s){const e={};for(let i=0;i<s.length;i++){const r=Xs(s[i]);for(const l in r)e[l]=r[l]}return e}function w_(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function ky(s){const e=[];for(let i=0;i<s.length;i++)e.push(s[i].clone());return e}function Bv(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:yt.workingColorSpace}const Xy={clone:Xs,merge:Vn};var Wy=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,qy=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ji extends nl{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Wy,this.fragmentShader=qy,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Xs(e.uniforms),this.uniformsGroups=ky(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const i=super.toJSON(e);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const d=this.uniforms[l].value;d&&d.isTexture?i.uniforms[l]={type:"t",value:d.toJSON(e).uuid}:d&&d.isColor?i.uniforms[l]={type:"c",value:d.getHex()}:d&&d.isVector2?i.uniforms[l]={type:"v2",value:d.toArray()}:d&&d.isVector3?i.uniforms[l]={type:"v3",value:d.toArray()}:d&&d.isVector4?i.uniforms[l]={type:"v4",value:d.toArray()}:d&&d.isMatrix3?i.uniforms[l]={type:"m3",value:d.toArray()}:d&&d.isMatrix4?i.uniforms[l]={type:"m4",value:d.toArray()}:i.uniforms[l]={value:d}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const r={};for(const l in this.extensions)this.extensions[l]===!0&&(r[l]=!0);return Object.keys(r).length>0&&(i.extensions=r),i}fromJSON(e,i){if(super.fromJSON(e,i),e.uniforms!==void 0)for(const r in e.uniforms){const l=e.uniforms[r];switch(this.uniforms[r]={},l.type){case"t":this.uniforms[r].value=i[l.value]||null;break;case"c":this.uniforms[r].value=new Tt().setHex(l.value);break;case"v2":this.uniforms[r].value=new Et().fromArray(l.value);break;case"v3":this.uniforms[r].value=new K().fromArray(l.value);break;case"v4":this.uniforms[r].value=new ln().fromArray(l.value);break;case"m3":this.uniforms[r].value=new st().fromArray(l.value);break;case"m4":this.uniforms[r].value=new dn().fromArray(l.value);break;default:this.uniforms[r].value=l.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const r in e.extensions)this.extensions[r]=e.extensions[r];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Yy extends Ji{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Zy extends nl{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=kM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Ky extends nl{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const zc=new K,Bc=new qs,Vi=new K;class Fv extends $n{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new dn,this.projectionMatrix=new dn,this.projectionMatrixInverse=new dn,this.coordinateSystem=qi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,i){return super.copy(e,i),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(zc,Bc,Vi),Vi.x===1&&Vi.y===1&&Vi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(zc,Bc,Vi.set(1,1,1)).invert()}updateWorldMatrix(e,i,r=!1){super.updateWorldMatrix(e,i,r),this.matrixWorld.decompose(zc,Bc,Vi),Vi.x===1&&Vi.y===1&&Vi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(zc,Bc,Vi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const rr=new K,D_=new Et,U_=new Et;class bi extends Fv{constructor(e=50,i=1,r=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const i=.5*this.getFilmHeight()/e;this.fov=el*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Bs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return el*2*Math.atan(Math.tan(Bs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,i,r){rr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(rr.x,rr.y).multiplyScalar(-e/rr.z),rr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(rr.x,rr.y).multiplyScalar(-e/rr.z)}getViewSize(e,i){return this.getViewBounds(e,D_,U_),i.subVectors(U_,D_)}setViewOffset(e,i,r,l,c,d){this.aspect=e/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=r,this.view.offsetY=l,this.view.width=c,this.view.height=d,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let i=e*Math.tan(Bs*.5*this.fov)/this.zoom,r=2*i,l=this.aspect*r,c=-.5*l;const d=this.view;if(this.view!==null&&this.view.enabled){const m=d.fullWidth,h=d.fullHeight;c+=d.offsetX*l/m,i-=d.offsetY*r/h,l*=d.width/m,r*=d.height/h}const p=this.filmOffset;p!==0&&(c+=e*p/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,i,i-r,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}class Hv extends Fv{constructor(e=-1,i=1,r=1,l=-1,c=.1,d=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=i,this.top=r,this.bottom=l,this.near=c,this.far=d,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,i,r,l,c,d){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=r,this.view.offsetY=l,this.view.width=c,this.view.height=d,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=r-e,d=r+e,p=l+i,m=l-i;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,_=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=h*this.view.offsetX,d=c+h*this.view.width,p-=_*this.view.offsetY,m=p-_*this.view.height}this.projectionMatrix.makeOrthographic(c,d,p,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}const Ns=-90,Ls=1;class Qy extends $n{constructor(e,i,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new bi(Ns,Ls,e,i);l.layers=this.layers,this.add(l);const c=new bi(Ns,Ls,e,i);c.layers=this.layers,this.add(c);const d=new bi(Ns,Ls,e,i);d.layers=this.layers,this.add(d);const p=new bi(Ns,Ls,e,i);p.layers=this.layers,this.add(p);const m=new bi(Ns,Ls,e,i);m.layers=this.layers,this.add(m);const h=new bi(Ns,Ls,e,i);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const e=this.coordinateSystem,i=this.children.concat(),[r,l,c,d,p,m]=i;for(const h of i)this.remove(h);if(e===qi)r.up.set(0,1,0),r.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),d.up.set(0,0,1),d.lookAt(0,-1,0),p.up.set(0,1,0),p.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(e===Jc)r.up.set(0,-1,0),r.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),d.up.set(0,0,-1),d.lookAt(0,-1,0),p.up.set(0,-1,0),p.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const h of i)this.add(h),h.updateMatrixWorld()}update(e,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:l}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[c,d,p,m,h,_]=this.children,v=e.getRenderTarget(),g=e.getActiveCubeFace(),y=e.getActiveMipmapLevel(),b=e.xr.enabled;e.xr.enabled=!1;const w=r.texture.generateMipmaps;r.texture.generateMipmaps=!1;let M=!1;e.isWebGLRenderer===!0?M=e.state.buffers.depth.getReversed():M=e.reversedDepthBuffer,e.setRenderTarget(r,0,l),M&&e.autoClear===!1&&e.clearDepth(),e.render(i,c),e.setRenderTarget(r,1,l),M&&e.autoClear===!1&&e.clearDepth(),e.render(i,d),e.setRenderTarget(r,2,l),M&&e.autoClear===!1&&e.clearDepth(),e.render(i,p),e.setRenderTarget(r,3,l),M&&e.autoClear===!1&&e.clearDepth(),e.render(i,m),e.setRenderTarget(r,4,l),M&&e.autoClear===!1&&e.clearDepth(),e.render(i,h),r.texture.generateMipmaps=w,e.setRenderTarget(r,5,l),M&&e.autoClear===!1&&e.clearDepth(),e.render(i,_),e.setRenderTarget(v,g,y),e.xr.enabled=b,r.texture.needsPMREMUpdate=!0}}class Jy extends bi{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const up=class up{constructor(e,i,r,l){this.elements=[1,0,0,1],e!==void 0&&this.set(e,i,r,l)}identity(){return this.set(1,0,0,1),this}fromArray(e,i=0){for(let r=0;r<4;r++)this.elements[r]=e[r+i];return this}set(e,i,r,l){const c=this.elements;return c[0]=e,c[2]=i,c[1]=r,c[3]=l,this}};up.prototype.isMatrix2=!0;let N_=up;function L_(s,e,i,r){const l=jy(r);switch(i){case Ev:return s*e;case Tv:return s*e/l.components*l.byteLength;case Kh:return s*e/l.components*l.byteLength;case Hr:return s*e*2/l.components*l.byteLength;case Qh:return s*e*2/l.components*l.byteLength;case bv:return s*e*3/l.components*l.byteLength;case Pi:return s*e*4/l.components*l.byteLength;case Jh:return s*e*4/l.components*l.byteLength;case Vc:case kc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Xc:case Wc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case fh:case hh:return Math.max(s,16)*Math.max(e,8)/4;case uh:case dh:return Math.max(s,8)*Math.max(e,8)/2;case ph:case mh:case _h:case vh:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case gh:case Yc:case xh:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Sh:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Mh:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case yh:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Eh:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case bh:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Th:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Ah:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Rh:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Ch:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case wh:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Dh:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Uh:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Nh:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Lh:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Oh:case Ph:case Ih:return Math.ceil(s/4)*Math.ceil(e/4)*16;case zh:case Bh:return Math.ceil(s/4)*Math.ceil(e/4)*8;case Zc:case Fh:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function jy(s){switch(s){case Ti:case xv:return{byteLength:1,components:1};case jo:case Sv:case Ta:return{byteLength:2,components:1};case Yh:case Zh:return{byteLength:2,components:4};case Qi:case qh:case Wi:return{byteLength:4,components:1};case Mv:case yv:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Wh}}));typeof window<"u"&&(window.__THREE__?tt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Wh);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Gv(){let s=null,e=!1,i=null,r=null;function l(c,d){i(c,d),r=s.requestAnimationFrame(l)}return{start:function(){e!==!0&&i!==null&&s!==null&&(r=s.requestAnimationFrame(l),e=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(c){i=c},setContext:function(c){s=c}}}function $y(s){const e=new WeakMap;function i(p,m){const h=p.array,_=p.usage,v=h.byteLength,g=s.createBuffer();s.bindBuffer(m,g),s.bufferData(m,h,_),p.onUploadCallback();let y;if(h instanceof Float32Array)y=s.FLOAT;else if(typeof Float16Array<"u"&&h instanceof Float16Array)y=s.HALF_FLOAT;else if(h instanceof Uint16Array)p.isFloat16BufferAttribute?y=s.HALF_FLOAT:y=s.UNSIGNED_SHORT;else if(h instanceof Int16Array)y=s.SHORT;else if(h instanceof Uint32Array)y=s.UNSIGNED_INT;else if(h instanceof Int32Array)y=s.INT;else if(h instanceof Int8Array)y=s.BYTE;else if(h instanceof Uint8Array)y=s.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)y=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:g,type:y,bytesPerElement:h.BYTES_PER_ELEMENT,version:p.version,size:v}}function r(p,m,h){const _=m.array,v=m.updateRanges;if(s.bindBuffer(h,p),v.length===0)s.bufferSubData(h,0,_);else{v.sort((y,b)=>y.start-b.start);let g=0;for(let y=1;y<v.length;y++){const b=v[g],w=v[y];w.start<=b.start+b.count+1?b.count=Math.max(b.count,w.start+w.count-b.start):(++g,v[g]=w)}v.length=g+1;for(let y=0,b=v.length;y<b;y++){const w=v[y];s.bufferSubData(h,w.start*_.BYTES_PER_ELEMENT,_,w.start,w.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(p){return p.isInterleavedBufferAttribute&&(p=p.data),e.get(p)}function c(p){p.isInterleavedBufferAttribute&&(p=p.data);const m=e.get(p);m&&(s.deleteBuffer(m.buffer),e.delete(p))}function d(p,m){if(p.isInterleavedBufferAttribute&&(p=p.data),p.isGLBufferAttribute){const _=e.get(p);(!_||_.version<p.version)&&e.set(p,{buffer:p.buffer,type:p.type,bytesPerElement:p.elementSize,version:p.version});return}const h=e.get(p);if(h===void 0)e.set(p,i(p,m));else if(h.version<p.version){if(h.size!==p.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(h.buffer,p,m),h.version=p.version}}return{get:l,remove:c,update:d}}var eE=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,tE=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,nE=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,iE=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,aE=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,rE=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,sE=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,oE=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,lE=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,cE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,uE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,fE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,dE=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,hE=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,pE=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,mE=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,gE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,_E=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,vE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,xE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,SE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,ME=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,yE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,EE=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,bE=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,TE=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,AE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,RE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,CE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,wE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,DE="gl_FragColor = linearToOutputTexel( gl_FragColor );",UE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,NE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,LE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,OE=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,PE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,IE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,zE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,BE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,FE=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,HE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,GE=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,VE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,kE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,XE=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,WE=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,qE=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,YE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ZE=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,KE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,QE=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,JE=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,jE=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,$E=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,e1=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,t1=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,n1=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,i1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,a1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,r1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,s1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,o1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,l1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,c1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,u1=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,f1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,d1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,h1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,p1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,m1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,g1=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,_1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,v1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,x1=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,S1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,M1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,y1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,E1=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,b1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,T1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,A1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,R1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,C1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,w1=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,D1=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,U1=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,N1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,L1=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,O1=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,P1=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,I1=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,z1=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,B1=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,F1=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,H1=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,G1=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,V1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,k1=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,X1=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,W1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,q1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Y1=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Z1=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,K1=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Q1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,J1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,j1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,$1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const eb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,tb=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ib=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ab=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sb=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,ob=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,lb=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,cb=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,ub=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,fb=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,db=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,hb=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,pb=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,mb=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gb=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_b=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vb=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,xb=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sb=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Mb=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,yb=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Eb=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bb=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Tb=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ab=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Rb=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cb=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,wb=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Db=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ub=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Nb=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Lb=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ut={alphahash_fragment:eE,alphahash_pars_fragment:tE,alphamap_fragment:nE,alphamap_pars_fragment:iE,alphatest_fragment:aE,alphatest_pars_fragment:rE,aomap_fragment:sE,aomap_pars_fragment:oE,batching_pars_vertex:lE,batching_vertex:cE,begin_vertex:uE,beginnormal_vertex:fE,bsdfs:dE,iridescence_fragment:hE,bumpmap_pars_fragment:pE,clipping_planes_fragment:mE,clipping_planes_pars_fragment:gE,clipping_planes_pars_vertex:_E,clipping_planes_vertex:vE,color_fragment:xE,color_pars_fragment:SE,color_pars_vertex:ME,color_vertex:yE,common:EE,cube_uv_reflection_fragment:bE,defaultnormal_vertex:TE,displacementmap_pars_vertex:AE,displacementmap_vertex:RE,emissivemap_fragment:CE,emissivemap_pars_fragment:wE,colorspace_fragment:DE,colorspace_pars_fragment:UE,envmap_fragment:NE,envmap_common_pars_fragment:LE,envmap_pars_fragment:OE,envmap_pars_vertex:PE,envmap_physical_pars_fragment:qE,envmap_vertex:IE,fog_vertex:zE,fog_pars_vertex:BE,fog_fragment:FE,fog_pars_fragment:HE,gradientmap_pars_fragment:GE,lightmap_pars_fragment:VE,lights_lambert_fragment:kE,lights_lambert_pars_fragment:XE,lights_pars_begin:WE,lights_toon_fragment:YE,lights_toon_pars_fragment:ZE,lights_phong_fragment:KE,lights_phong_pars_fragment:QE,lights_physical_fragment:JE,lights_physical_pars_fragment:jE,lights_fragment_begin:$E,lights_fragment_maps:e1,lights_fragment_end:t1,lightprobes_pars_fragment:n1,logdepthbuf_fragment:i1,logdepthbuf_pars_fragment:a1,logdepthbuf_pars_vertex:r1,logdepthbuf_vertex:s1,map_fragment:o1,map_pars_fragment:l1,map_particle_fragment:c1,map_particle_pars_fragment:u1,metalnessmap_fragment:f1,metalnessmap_pars_fragment:d1,morphinstance_vertex:h1,morphcolor_vertex:p1,morphnormal_vertex:m1,morphtarget_pars_vertex:g1,morphtarget_vertex:_1,normal_fragment_begin:v1,normal_fragment_maps:x1,normal_pars_fragment:S1,normal_pars_vertex:M1,normal_vertex:y1,normalmap_pars_fragment:E1,clearcoat_normal_fragment_begin:b1,clearcoat_normal_fragment_maps:T1,clearcoat_pars_fragment:A1,iridescence_pars_fragment:R1,opaque_fragment:C1,packing:w1,premultiplied_alpha_fragment:D1,project_vertex:U1,dithering_fragment:N1,dithering_pars_fragment:L1,roughnessmap_fragment:O1,roughnessmap_pars_fragment:P1,shadowmap_pars_fragment:I1,shadowmap_pars_vertex:z1,shadowmap_vertex:B1,shadowmask_pars_fragment:F1,skinbase_vertex:H1,skinning_pars_vertex:G1,skinning_vertex:V1,skinnormal_vertex:k1,specularmap_fragment:X1,specularmap_pars_fragment:W1,tonemapping_fragment:q1,tonemapping_pars_fragment:Y1,transmission_fragment:Z1,transmission_pars_fragment:K1,uv_pars_fragment:Q1,uv_pars_vertex:J1,uv_vertex:j1,worldpos_vertex:$1,background_vert:eb,background_frag:tb,backgroundCube_vert:nb,backgroundCube_frag:ib,cube_vert:ab,cube_frag:rb,depth_vert:sb,depth_frag:ob,distance_vert:lb,distance_frag:cb,equirect_vert:ub,equirect_frag:fb,linedashed_vert:db,linedashed_frag:hb,meshbasic_vert:pb,meshbasic_frag:mb,meshlambert_vert:gb,meshlambert_frag:_b,meshmatcap_vert:vb,meshmatcap_frag:xb,meshnormal_vert:Sb,meshnormal_frag:Mb,meshphong_vert:yb,meshphong_frag:Eb,meshphysical_vert:bb,meshphysical_frag:Tb,meshtoon_vert:Ab,meshtoon_frag:Rb,points_vert:Cb,points_frag:wb,shadow_vert:Db,shadow_frag:Ub,sprite_vert:Nb,sprite_frag:Lb},Oe={common:{diffuse:{value:new Tt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new st}},envmap:{envMap:{value:null},envMapRotation:{value:new st},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new st}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new st}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new st},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new st},normalScale:{value:new Et(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new st},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new st}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new st}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new st}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Tt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new K},probesMax:{value:new K},probesResolution:{value:new K}},points:{diffuse:{value:new Tt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0},uvTransform:{value:new st}},sprite:{diffuse:{value:new Tt(16777215)},opacity:{value:1},center:{value:new Et(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}}},Xi={basic:{uniforms:Vn([Oe.common,Oe.specularmap,Oe.envmap,Oe.aomap,Oe.lightmap,Oe.fog]),vertexShader:ut.meshbasic_vert,fragmentShader:ut.meshbasic_frag},lambert:{uniforms:Vn([Oe.common,Oe.specularmap,Oe.envmap,Oe.aomap,Oe.lightmap,Oe.emissivemap,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,Oe.fog,Oe.lights,{emissive:{value:new Tt(0)},envMapIntensity:{value:1}}]),vertexShader:ut.meshlambert_vert,fragmentShader:ut.meshlambert_frag},phong:{uniforms:Vn([Oe.common,Oe.specularmap,Oe.envmap,Oe.aomap,Oe.lightmap,Oe.emissivemap,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,Oe.fog,Oe.lights,{emissive:{value:new Tt(0)},specular:{value:new Tt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ut.meshphong_vert,fragmentShader:ut.meshphong_frag},standard:{uniforms:Vn([Oe.common,Oe.envmap,Oe.aomap,Oe.lightmap,Oe.emissivemap,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,Oe.roughnessmap,Oe.metalnessmap,Oe.fog,Oe.lights,{emissive:{value:new Tt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ut.meshphysical_vert,fragmentShader:ut.meshphysical_frag},toon:{uniforms:Vn([Oe.common,Oe.aomap,Oe.lightmap,Oe.emissivemap,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,Oe.gradientmap,Oe.fog,Oe.lights,{emissive:{value:new Tt(0)}}]),vertexShader:ut.meshtoon_vert,fragmentShader:ut.meshtoon_frag},matcap:{uniforms:Vn([Oe.common,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,Oe.fog,{matcap:{value:null}}]),vertexShader:ut.meshmatcap_vert,fragmentShader:ut.meshmatcap_frag},points:{uniforms:Vn([Oe.points,Oe.fog]),vertexShader:ut.points_vert,fragmentShader:ut.points_frag},dashed:{uniforms:Vn([Oe.common,Oe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ut.linedashed_vert,fragmentShader:ut.linedashed_frag},depth:{uniforms:Vn([Oe.common,Oe.displacementmap]),vertexShader:ut.depth_vert,fragmentShader:ut.depth_frag},normal:{uniforms:Vn([Oe.common,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,{opacity:{value:1}}]),vertexShader:ut.meshnormal_vert,fragmentShader:ut.meshnormal_frag},sprite:{uniforms:Vn([Oe.sprite,Oe.fog]),vertexShader:ut.sprite_vert,fragmentShader:ut.sprite_frag},background:{uniforms:{uvTransform:{value:new st},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ut.background_vert,fragmentShader:ut.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new st}},vertexShader:ut.backgroundCube_vert,fragmentShader:ut.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ut.cube_vert,fragmentShader:ut.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ut.equirect_vert,fragmentShader:ut.equirect_frag},distance:{uniforms:Vn([Oe.common,Oe.displacementmap,{referencePosition:{value:new K},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ut.distance_vert,fragmentShader:ut.distance_frag},shadow:{uniforms:Vn([Oe.lights,Oe.fog,{color:{value:new Tt(0)},opacity:{value:1}}]),vertexShader:ut.shadow_vert,fragmentShader:ut.shadow_frag}};Xi.physical={uniforms:Vn([Xi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new st},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new st},clearcoatNormalScale:{value:new Et(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new st},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new st},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new st},sheen:{value:0},sheenColor:{value:new Tt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new st},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new st},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new st},transmissionSamplerSize:{value:new Et},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new st},attenuationDistance:{value:0},attenuationColor:{value:new Tt(0)},specularColor:{value:new Tt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new st},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new st},anisotropyVector:{value:new Et},anisotropyMap:{value:null},anisotropyMapTransform:{value:new st}}]),vertexShader:ut.meshphysical_vert,fragmentShader:ut.meshphysical_frag};const Fc={r:0,b:0,g:0},Ob=new dn,Vv=new st;Vv.set(-1,0,0,0,1,0,0,0,1);function Pb(s,e,i,r,l,c){const d=new Tt(0);let p=l===!0?0:1,m,h,_=null,v=0,g=null;function y(D){let P=D.isScene===!0?D.background:null;if(P&&P.isTexture){const C=D.backgroundBlurriness>0;P=e.get(P,C)}return P}function b(D){let P=!1;const C=y(D);C===null?M(d,p):C&&C.isColor&&(M(C,1),P=!0);const z=s.xr.getEnvironmentBlendMode();z==="additive"?i.buffers.color.setClear(0,0,0,1,c):z==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,c),(s.autoClear||P)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function w(D,P){const C=y(P);C&&(C.isCubeTexture||C.mapping===iu)?(h===void 0&&(h=new qt(new Ys(1,1,1),new Ji({name:"BackgroundCubeMaterial",uniforms:Xs(Xi.backgroundCube.uniforms),vertexShader:Xi.backgroundCube.vertexShader,fragmentShader:Xi.backgroundCube.fragmentShader,side:jn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(z,N,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),h.material.uniforms.envMap.value=C,h.material.uniforms.backgroundBlurriness.value=P.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=P.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Ob.makeRotationFromEuler(P.backgroundRotation)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1&&h.material.uniforms.backgroundRotation.value.premultiply(Vv),h.material.toneMapped=yt.getTransfer(C.colorSpace)!==Bt,(_!==C||v!==C.version||g!==s.toneMapping)&&(h.material.needsUpdate=!0,_=C,v=C.version,g=s.toneMapping),h.layers.enableAll(),D.unshift(h,h.geometry,h.material,0,0,null)):C&&C.isTexture&&(m===void 0&&(m=new qt(new ru(2,2),new Ji({name:"BackgroundMaterial",uniforms:Xs(Xi.background.uniforms),vertexShader:Xi.background.vertexShader,fragmentShader:Xi.background.fragmentShader,side:lr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(m)),m.material.uniforms.t2D.value=C,m.material.uniforms.backgroundIntensity.value=P.backgroundIntensity,m.material.toneMapped=yt.getTransfer(C.colorSpace)!==Bt,C.matrixAutoUpdate===!0&&C.updateMatrix(),m.material.uniforms.uvTransform.value.copy(C.matrix),(_!==C||v!==C.version||g!==s.toneMapping)&&(m.material.needsUpdate=!0,_=C,v=C.version,g=s.toneMapping),m.layers.enableAll(),D.unshift(m,m.geometry,m.material,0,0,null))}function M(D,P){D.getRGB(Fc,Bv(s)),i.buffers.color.setClear(Fc.r,Fc.g,Fc.b,P,c)}function S(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return d},setClearColor:function(D,P=1){d.set(D),p=P,M(d,p)},getClearAlpha:function(){return p},setClearAlpha:function(D){p=D,M(d,p)},render:b,addToRenderList:w,dispose:S}}function Ib(s,e){const i=s.getParameter(s.MAX_VERTEX_ATTRIBS),r={},l=g(null);let c=l,d=!1;function p(F,W,ce,me,j){let B=!1;const G=v(F,me,ce,W);c!==G&&(c=G,h(c.object)),B=y(F,me,ce,j),B&&b(F,me,ce,j),j!==null&&e.update(j,s.ELEMENT_ARRAY_BUFFER),(B||d)&&(d=!1,C(F,W,ce,me),j!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(j).buffer))}function m(){return s.createVertexArray()}function h(F){return s.bindVertexArray(F)}function _(F){return s.deleteVertexArray(F)}function v(F,W,ce,me){const j=me.wireframe===!0;let B=r[W.id];B===void 0&&(B={},r[W.id]=B);const G=F.isInstancedMesh===!0?F.id:0;let te=B[G];te===void 0&&(te={},B[G]=te);let ge=te[ce.id];ge===void 0&&(ge={},te[ce.id]=ge);let Ee=ge[j];return Ee===void 0&&(Ee=g(m()),ge[j]=Ee),Ee}function g(F){const W=[],ce=[],me=[];for(let j=0;j<i;j++)W[j]=0,ce[j]=0,me[j]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:W,enabledAttributes:ce,attributeDivisors:me,object:F,attributes:{},index:null}}function y(F,W,ce,me){const j=c.attributes,B=W.attributes;let G=0;const te=ce.getAttributes();for(const ge in te)if(te[ge].location>=0){const I=j[ge];let Q=B[ge];if(Q===void 0&&(ge==="instanceMatrix"&&F.instanceMatrix&&(Q=F.instanceMatrix),ge==="instanceColor"&&F.instanceColor&&(Q=F.instanceColor)),I===void 0||I.attribute!==Q||Q&&I.data!==Q.data)return!0;G++}return c.attributesNum!==G||c.index!==me}function b(F,W,ce,me){const j={},B=W.attributes;let G=0;const te=ce.getAttributes();for(const ge in te)if(te[ge].location>=0){let I=B[ge];I===void 0&&(ge==="instanceMatrix"&&F.instanceMatrix&&(I=F.instanceMatrix),ge==="instanceColor"&&F.instanceColor&&(I=F.instanceColor));const Q={};Q.attribute=I,I&&I.data&&(Q.data=I.data),j[ge]=Q,G++}c.attributes=j,c.attributesNum=G,c.index=me}function w(){const F=c.newAttributes;for(let W=0,ce=F.length;W<ce;W++)F[W]=0}function M(F){S(F,0)}function S(F,W){const ce=c.newAttributes,me=c.enabledAttributes,j=c.attributeDivisors;ce[F]=1,me[F]===0&&(s.enableVertexAttribArray(F),me[F]=1),j[F]!==W&&(s.vertexAttribDivisor(F,W),j[F]=W)}function D(){const F=c.newAttributes,W=c.enabledAttributes;for(let ce=0,me=W.length;ce<me;ce++)W[ce]!==F[ce]&&(s.disableVertexAttribArray(ce),W[ce]=0)}function P(F,W,ce,me,j,B,G){G===!0?s.vertexAttribIPointer(F,W,ce,j,B):s.vertexAttribPointer(F,W,ce,me,j,B)}function C(F,W,ce,me){w();const j=me.attributes,B=ce.getAttributes(),G=W.defaultAttributeValues;for(const te in B){const ge=B[te];if(ge.location>=0){let Ee=j[te];if(Ee===void 0&&(te==="instanceMatrix"&&F.instanceMatrix&&(Ee=F.instanceMatrix),te==="instanceColor"&&F.instanceColor&&(Ee=F.instanceColor)),Ee!==void 0){const I=Ee.normalized,Q=Ee.itemSize,ye=e.get(Ee);if(ye===void 0)continue;const Re=ye.buffer,Pe=ye.type,ae=ye.bytesPerElement,xe=Pe===s.INT||Pe===s.UNSIGNED_INT||Ee.gpuType===qh;if(Ee.isInterleavedBufferAttribute){const Me=Ee.data,Fe=Me.stride,it=Ee.offset;if(Me.isInstancedInterleavedBuffer){for(let Qe=0;Qe<ge.locationSize;Qe++)S(ge.location+Qe,Me.meshPerAttribute);F.isInstancedMesh!==!0&&me._maxInstanceCount===void 0&&(me._maxInstanceCount=Me.meshPerAttribute*Me.count)}else for(let Qe=0;Qe<ge.locationSize;Qe++)M(ge.location+Qe);s.bindBuffer(s.ARRAY_BUFFER,Re);for(let Qe=0;Qe<ge.locationSize;Qe++)P(ge.location+Qe,Q/ge.locationSize,Pe,I,Fe*ae,(it+Q/ge.locationSize*Qe)*ae,xe)}else{if(Ee.isInstancedBufferAttribute){for(let Me=0;Me<ge.locationSize;Me++)S(ge.location+Me,Ee.meshPerAttribute);F.isInstancedMesh!==!0&&me._maxInstanceCount===void 0&&(me._maxInstanceCount=Ee.meshPerAttribute*Ee.count)}else for(let Me=0;Me<ge.locationSize;Me++)M(ge.location+Me);s.bindBuffer(s.ARRAY_BUFFER,Re);for(let Me=0;Me<ge.locationSize;Me++)P(ge.location+Me,Q/ge.locationSize,Pe,I,Q*ae,Q/ge.locationSize*Me*ae,xe)}}else if(G!==void 0){const I=G[te];if(I!==void 0)switch(I.length){case 2:s.vertexAttrib2fv(ge.location,I);break;case 3:s.vertexAttrib3fv(ge.location,I);break;case 4:s.vertexAttrib4fv(ge.location,I);break;default:s.vertexAttrib1fv(ge.location,I)}}}}D()}function z(){U();for(const F in r){const W=r[F];for(const ce in W){const me=W[ce];for(const j in me){const B=me[j];for(const G in B)_(B[G].object),delete B[G];delete me[j]}}delete r[F]}}function N(F){if(r[F.id]===void 0)return;const W=r[F.id];for(const ce in W){const me=W[ce];for(const j in me){const B=me[j];for(const G in B)_(B[G].object),delete B[G];delete me[j]}}delete r[F.id]}function L(F){for(const W in r){const ce=r[W];for(const me in ce){const j=ce[me];if(j[F.id]===void 0)continue;const B=j[F.id];for(const G in B)_(B[G].object),delete B[G];delete j[F.id]}}}function T(F){for(const W in r){const ce=r[W],me=F.isInstancedMesh===!0?F.id:0,j=ce[me];if(j!==void 0){for(const B in j){const G=j[B];for(const te in G)_(G[te].object),delete G[te];delete j[B]}delete ce[me],Object.keys(ce).length===0&&delete r[W]}}}function U(){k(),d=!0,c!==l&&(c=l,h(c.object))}function k(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:p,reset:U,resetDefaultState:k,dispose:z,releaseStatesOfGeometry:N,releaseStatesOfObject:T,releaseStatesOfProgram:L,initAttributes:w,enableAttribute:M,disableUnusedAttributes:D}}function zb(s,e,i){let r;function l(m){r=m}function c(m,h){s.drawArrays(r,m,h),i.update(h,r,1)}function d(m,h,_){_!==0&&(s.drawArraysInstanced(r,m,h,_),i.update(h,r,_))}function p(m,h,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,m,0,h,0,_);let g=0;for(let y=0;y<_;y++)g+=h[y];i.update(g,r,1)}this.setMode=l,this.render=c,this.renderInstances=d,this.renderMultiDraw=p}function Bb(s,e,i,r){let l;function c(){if(l!==void 0)return l;if(e.has("EXT_texture_filter_anisotropic")===!0){const L=e.get("EXT_texture_filter_anisotropic");l=s.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function d(L){return!(L!==Pi&&r.convert(L)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function p(L){const T=L===Ta&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(L!==Ti&&r.convert(L)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==Wi&&!T)}function m(L){if(L==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=i.precision!==void 0?i.precision:"highp";const _=m(h);_!==h&&(tt("WebGLRenderer:",h,"not supported, using",_,"instead."),h=_);const v=i.logarithmicDepthBuffer===!0,g=i.reversedDepthBuffer===!0&&e.has("EXT_clip_control");i.reversedDepthBuffer===!0&&g===!1&&tt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const y=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),b=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),w=s.getParameter(s.MAX_TEXTURE_SIZE),M=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),S=s.getParameter(s.MAX_VERTEX_ATTRIBS),D=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),P=s.getParameter(s.MAX_VARYING_VECTORS),C=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),z=s.getParameter(s.MAX_SAMPLES),N=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:d,textureTypeReadable:p,precision:h,logarithmicDepthBuffer:v,reversedDepthBuffer:g,maxTextures:y,maxVertexTextures:b,maxTextureSize:w,maxCubemapSize:M,maxAttributes:S,maxVertexUniforms:D,maxVaryings:P,maxFragmentUniforms:C,maxSamples:z,samples:N}}function Fb(s){const e=this;let i=null,r=0,l=!1,c=!1;const d=new Lr,p=new st,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(v,g){const y=v.length!==0||g||r!==0||l;return l=g,r=v.length,y},this.beginShadows=function(){c=!0,_(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(v,g){i=_(v,g,0)},this.setState=function(v,g,y){const b=v.clippingPlanes,w=v.clipIntersection,M=v.clipShadows,S=s.get(v);if(!l||b===null||b.length===0||c&&!M)c?_(null):h();else{const D=c?0:r,P=D*4;let C=S.clippingState||null;m.value=C,C=_(b,g,P,y);for(let z=0;z!==P;++z)C[z]=i[z];S.clippingState=C,this.numIntersection=w?this.numPlanes:0,this.numPlanes+=D}};function h(){m.value!==i&&(m.value=i,m.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function _(v,g,y,b){const w=v!==null?v.length:0;let M=null;if(w!==0){if(M=m.value,b!==!0||M===null){const S=y+w*4,D=g.matrixWorldInverse;p.getNormalMatrix(D),(M===null||M.length<S)&&(M=new Float32Array(S));for(let P=0,C=y;P!==w;++P,C+=4)d.copy(v[P]).applyMatrix4(D,p),d.normal.toArray(M,C),M[C+3]=d.constant}m.value=M,m.needsUpdate=!0}return e.numPlanes=w,e.numIntersection=0,M}}const or=4,O_=[.125,.215,.35,.446,.526,.582],Pr=20,Hb=256,Yo=new Hv,P_=new Tt;let qd=null,Yd=0,Zd=0,Kd=!1;const Gb=new K;class I_{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,i=0,r=.1,l=100,c={}){const{size:d=256,position:p=Gb}=c;qd=this._renderer.getRenderTarget(),Yd=this._renderer.getActiveCubeFace(),Zd=this._renderer.getActiveMipmapLevel(),Kd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(d);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(e,r,l,m,p),i>0&&this._blur(m,0,0,i),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(e,i=null){return this._fromTexture(e,i)}fromCubemap(e,i=null){return this._fromTexture(e,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=F_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=B_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(qd,Yd,Zd),this._renderer.xr.enabled=Kd,e.scissorTest=!1,Os(e,0,0,e.width,e.height)}_fromTexture(e,i){e.mapping===Fr||e.mapping===Vs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),qd=this._renderer.getRenderTarget(),Yd=this._renderer.getActiveCubeFace(),Zd=this._renderer.getActiveMipmapLevel(),Kd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=i||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,r={magFilter:Fn,minFilter:Fn,generateMipmaps:!1,type:Ta,format:Pi,colorSpace:Kc,depthBuffer:!1},l=z_(e,i,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=z_(e,i,r);const{_lodMax:c}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Vb(c)),this._blurMaterial=Xb(c,e,i),this._ggxMaterial=kb(c,e,i)}return l}_compileMaterial(e){const i=new qt(new hn,e);this._renderer.compile(i,Yo)}_sceneToCubeUV(e,i,r,l,c){const m=new bi(90,1,i,r),h=[1,-1,1,1,1,1],_=[1,1,1,-1,-1,-1],v=this._renderer,g=v.autoClear,y=v.toneMapping;v.getClearColor(P_),v.toneMapping=Yi,v.autoClear=!1,v.state.buffers.depth.getReversed()&&(v.setRenderTarget(l),v.clearDepth(),v.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new qt(new Ys,new On({name:"PMREM.Background",side:jn,depthWrite:!1,depthTest:!1})));const w=this._backgroundBox,M=w.material;let S=!1;const D=e.background;D?D.isColor&&(M.color.copy(D),e.background=null,S=!0):(M.color.copy(P_),S=!0);for(let P=0;P<6;P++){const C=P%3;C===0?(m.up.set(0,h[P],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x+_[P],c.y,c.z)):C===1?(m.up.set(0,0,h[P]),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y+_[P],c.z)):(m.up.set(0,h[P],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y,c.z+_[P]));const z=this._cubeSize;Os(l,C*z,P>2?z:0,z,z),v.setRenderTarget(l),S&&v.render(w,m),v.render(e,m)}v.toneMapping=y,v.autoClear=g,e.background=D}_textureToCubeUV(e,i){const r=this._renderer,l=e.mapping===Fr||e.mapping===Vs;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=F_()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=B_());const c=l?this._cubemapMaterial:this._equirectMaterial,d=this._lodMeshes[0];d.material=c;const p=c.uniforms;p.envMap.value=e;const m=this._cubeSize;Os(i,0,0,3*m,2*m),r.setRenderTarget(i),r.render(d,Yo)}_applyPMREM(e){const i=this._renderer,r=i.autoClear;i.autoClear=!1;const l=this._lodMeshes.length;for(let c=1;c<l;c++)this._applyGGXFilter(e,c-1,c);i.autoClear=r}_applyGGXFilter(e,i,r){const l=this._renderer,c=this._pingPongRenderTarget,d=this._ggxMaterial,p=this._lodMeshes[r];p.material=d;const m=d.uniforms,h=r/(this._lodMeshes.length-1),_=i/(this._lodMeshes.length-1),v=Math.sqrt(h*h-_*_),g=0+h*1.25,y=v*g,{_lodMax:b}=this,w=this._sizeLods[r],M=3*w*(r>b-or?r-b+or:0),S=4*(this._cubeSize-w);m.envMap.value=e.texture,m.roughness.value=y,m.mipInt.value=b-i,Os(c,M,S,3*w,2*w),l.setRenderTarget(c),l.render(p,Yo),m.envMap.value=c.texture,m.roughness.value=0,m.mipInt.value=b-r,Os(e,M,S,3*w,2*w),l.setRenderTarget(e),l.render(p,Yo)}_blur(e,i,r,l,c){const d=this._pingPongRenderTarget;this._halfBlur(e,d,i,r,l,"latitudinal",c),this._halfBlur(d,e,r,r,l,"longitudinal",c)}_halfBlur(e,i,r,l,c,d,p){const m=this._renderer,h=this._blurMaterial;d!=="latitudinal"&&d!=="longitudinal"&&bt("blur direction must be either latitudinal or longitudinal!");const _=3,v=this._lodMeshes[l];v.material=h;const g=h.uniforms,y=this._sizeLods[r]-1,b=isFinite(c)?Math.PI/(2*y):2*Math.PI/(2*Pr-1),w=c/b,M=isFinite(c)?1+Math.floor(_*w):Pr;M>Pr&&tt(`sigmaRadians, ${c}, is too large and will clip, as it requested ${M} samples when the maximum is set to ${Pr}`);const S=[];let D=0;for(let L=0;L<Pr;++L){const T=L/w,U=Math.exp(-T*T/2);S.push(U),L===0?D+=U:L<M&&(D+=2*U)}for(let L=0;L<S.length;L++)S[L]=S[L]/D;g.envMap.value=e.texture,g.samples.value=M,g.weights.value=S,g.latitudinal.value=d==="latitudinal",p&&(g.poleAxis.value=p);const{_lodMax:P}=this;g.dTheta.value=b,g.mipInt.value=P-r;const C=this._sizeLods[l],z=3*C*(l>P-or?l-P+or:0),N=4*(this._cubeSize-C);Os(i,z,N,3*C,2*C),m.setRenderTarget(i),m.render(v,Yo)}}function Vb(s){const e=[],i=[],r=[];let l=s;const c=s-or+1+O_.length;for(let d=0;d<c;d++){const p=Math.pow(2,l);e.push(p);let m=1/p;d>s-or?m=O_[d-s+or-1]:d===0&&(m=0),i.push(m);const h=1/(p-2),_=-h,v=1+h,g=[_,_,v,_,v,v,_,_,v,v,_,v],y=6,b=6,w=3,M=2,S=1,D=new Float32Array(w*b*y),P=new Float32Array(M*b*y),C=new Float32Array(S*b*y);for(let N=0;N<y;N++){const L=N%3*2/3-1,T=N>2?0:-1,U=[L,T,0,L+2/3,T,0,L+2/3,T+1,0,L,T,0,L+2/3,T+1,0,L,T+1,0];D.set(U,w*b*N),P.set(g,M*b*N);const k=[N,N,N,N,N,N];C.set(k,S*b*N)}const z=new hn;z.setAttribute("position",new Ki(D,w)),z.setAttribute("uv",new Ki(P,M)),z.setAttribute("faceIndex",new Ki(C,S)),r.push(new qt(z,null)),l>or&&l--}return{lodMeshes:r,sizeLods:e,sigmas:i}}function z_(s,e,i){const r=new Zi(s,e,i);return r.texture.mapping=iu,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function Os(s,e,i,r,l){s.viewport.set(e,i,r,l),s.scissor.set(e,i,r,l)}function kb(s,e,i){return new Ji({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Hb,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:su(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Ea,depthTest:!1,depthWrite:!1})}function Xb(s,e,i){const r=new Float32Array(Pr),l=new K(0,1,0);return new Ji({name:"SphericalGaussianBlur",defines:{n:Pr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:su(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ea,depthTest:!1,depthWrite:!1})}function B_(){return new Ji({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:su(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ea,depthTest:!1,depthWrite:!1})}function F_(){return new Ji({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:su(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ea,depthTest:!1,depthWrite:!1})}function su(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class kv extends Zi{constructor(e=1,i={}){super(e,e,i),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},l=[r,r,r,r,r,r];this.texture=new Pv(l),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},l=new Ys(5,5,5),c=new Ji({name:"CubemapFromEquirect",uniforms:Xs(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:jn,blending:Ea});c.uniforms.tEquirect.value=i;const d=new qt(l,c),p=i.minFilter;return i.minFilter===Ir&&(i.minFilter=Fn),new Qy(1,10,this).update(e,d),i.minFilter=p,d.geometry.dispose(),d.material.dispose(),this}clear(e,i=!0,r=!0,l=!0){const c=e.getRenderTarget();for(let d=0;d<6;d++)e.setRenderTarget(this,d),e.clear(i,r,l);e.setRenderTarget(c)}}function Wb(s){let e=new WeakMap,i=new WeakMap,r=null;function l(g,y=!1){return g==null?null:y?d(g):c(g)}function c(g){if(g&&g.isTexture){const y=g.mapping;if(y===xd||y===Sd)if(e.has(g)){const b=e.get(g).texture;return p(b,g.mapping)}else{const b=g.image;if(b&&b.height>0){const w=new kv(b.height);return w.fromEquirectangularTexture(s,g),e.set(g,w),g.addEventListener("dispose",h),p(w.texture,g.mapping)}else return null}}return g}function d(g){if(g&&g.isTexture){const y=g.mapping,b=y===xd||y===Sd,w=y===Fr||y===Vs;if(b||w){let M=i.get(g);const S=M!==void 0?M.texture.pmremVersion:0;if(g.isRenderTargetTexture&&g.pmremVersion!==S)return r===null&&(r=new I_(s)),M=b?r.fromEquirectangular(g,M):r.fromCubemap(g,M),M.texture.pmremVersion=g.pmremVersion,i.set(g,M),M.texture;if(M!==void 0)return M.texture;{const D=g.image;return b&&D&&D.height>0||w&&D&&m(D)?(r===null&&(r=new I_(s)),M=b?r.fromEquirectangular(g):r.fromCubemap(g),M.texture.pmremVersion=g.pmremVersion,i.set(g,M),g.addEventListener("dispose",_),M.texture):null}}}return g}function p(g,y){return y===xd?g.mapping=Fr:y===Sd&&(g.mapping=Vs),g}function m(g){let y=0;const b=6;for(let w=0;w<b;w++)g[w]!==void 0&&y++;return y===b}function h(g){const y=g.target;y.removeEventListener("dispose",h);const b=e.get(y);b!==void 0&&(e.delete(y),b.dispose())}function _(g){const y=g.target;y.removeEventListener("dispose",_);const b=i.get(y);b!==void 0&&(i.delete(y),b.dispose())}function v(){e=new WeakMap,i=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:l,dispose:v}}function qb(s){const e={};function i(r){if(e[r]!==void 0)return e[r];const l=s.getExtension(r);return e[r]=l,l}return{has:function(r){return i(r)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(r){const l=i(r);return l===null&&zs("WebGLRenderer: "+r+" extension not supported."),l}}}function Yb(s,e,i,r){const l={},c=new WeakMap;function d(v){const g=v.target;g.index!==null&&e.remove(g.index);for(const b in g.attributes)e.remove(g.attributes[b]);g.removeEventListener("dispose",d),delete l[g.id];const y=c.get(g);y&&(e.remove(y),c.delete(g)),r.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,i.memory.geometries--}function p(v,g){return l[g.id]===!0||(g.addEventListener("dispose",d),l[g.id]=!0,i.memory.geometries++),g}function m(v){const g=v.attributes;for(const y in g)e.update(g[y],s.ARRAY_BUFFER)}function h(v){const g=[],y=v.index,b=v.attributes.position;let w=0;if(b===void 0)return;if(y!==null){const D=y.array;w=y.version;for(let P=0,C=D.length;P<C;P+=3){const z=D[P+0],N=D[P+1],L=D[P+2];g.push(z,N,N,L,L,z)}}else{const D=b.array;w=b.version;for(let P=0,C=D.length/3-1;P<C;P+=3){const z=P+0,N=P+1,L=P+2;g.push(z,N,N,L,L,z)}}const M=new(b.count>=65535?Uv:Dv)(g,1);M.version=w;const S=c.get(v);S&&e.remove(S),c.set(v,M)}function _(v){const g=c.get(v);if(g){const y=v.index;y!==null&&g.version<y.version&&h(v)}else h(v);return c.get(v)}return{get:p,update:m,getWireframeAttribute:_}}function Zb(s,e,i){let r;function l(v){r=v}let c,d;function p(v){c=v.type,d=v.bytesPerElement}function m(v,g){s.drawElements(r,g,c,v*d),i.update(g,r,1)}function h(v,g,y){y!==0&&(s.drawElementsInstanced(r,g,c,v*d,y),i.update(g,r,y))}function _(v,g,y){if(y===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,g,0,c,v,0,y);let w=0;for(let M=0;M<y;M++)w+=g[M];i.update(w,r,1)}this.setMode=l,this.setIndex=p,this.render=m,this.renderInstances=h,this.renderMultiDraw=_}function Kb(s){const e={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function r(c,d,p){switch(i.calls++,d){case s.TRIANGLES:i.triangles+=p*(c/3);break;case s.LINES:i.lines+=p*(c/2);break;case s.LINE_STRIP:i.lines+=p*(c-1);break;case s.LINE_LOOP:i.lines+=p*c;break;case s.POINTS:i.points+=p*c;break;default:bt("WebGLInfo: Unknown draw mode:",d);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:e,render:i,programs:null,autoReset:!0,reset:l,update:r}}function Qb(s,e,i){const r=new WeakMap,l=new ln;function c(d,p,m){const h=d.morphTargetInfluences,_=p.morphAttributes.position||p.morphAttributes.normal||p.morphAttributes.color,v=_!==void 0?_.length:0;let g=r.get(p);if(g===void 0||g.count!==v){let k=function(){T.dispose(),r.delete(p),p.removeEventListener("dispose",k)};var y=k;g!==void 0&&g.texture.dispose();const b=p.morphAttributes.position!==void 0,w=p.morphAttributes.normal!==void 0,M=p.morphAttributes.color!==void 0,S=p.morphAttributes.position||[],D=p.morphAttributes.normal||[],P=p.morphAttributes.color||[];let C=0;b===!0&&(C=1),w===!0&&(C=2),M===!0&&(C=3);let z=p.attributes.position.count*C,N=1;z>e.maxTextureSize&&(N=Math.ceil(z/e.maxTextureSize),z=e.maxTextureSize);const L=new Float32Array(z*N*4*v),T=new Rv(L,z,N,v);T.type=Wi,T.needsUpdate=!0;const U=C*4;for(let F=0;F<v;F++){const W=S[F],ce=D[F],me=P[F],j=z*N*4*F;for(let B=0;B<W.count;B++){const G=B*U;b===!0&&(l.fromBufferAttribute(W,B),L[j+G+0]=l.x,L[j+G+1]=l.y,L[j+G+2]=l.z,L[j+G+3]=0),w===!0&&(l.fromBufferAttribute(ce,B),L[j+G+4]=l.x,L[j+G+5]=l.y,L[j+G+6]=l.z,L[j+G+7]=0),M===!0&&(l.fromBufferAttribute(me,B),L[j+G+8]=l.x,L[j+G+9]=l.y,L[j+G+10]=l.z,L[j+G+11]=me.itemSize===4?l.w:1)}}g={count:v,texture:T,size:new Et(z,N)},r.set(p,g),p.addEventListener("dispose",k)}if(d.isInstancedMesh===!0&&d.morphTexture!==null)m.getUniforms().setValue(s,"morphTexture",d.morphTexture,i);else{let b=0;for(let M=0;M<h.length;M++)b+=h[M];const w=p.morphTargetsRelative?1:1-b;m.getUniforms().setValue(s,"morphTargetBaseInfluence",w),m.getUniforms().setValue(s,"morphTargetInfluences",h)}m.getUniforms().setValue(s,"morphTargetsTexture",g.texture,i),m.getUniforms().setValue(s,"morphTargetsTextureSize",g.size)}return{update:c}}function Jb(s,e,i,r,l){let c=new WeakMap;function d(h){const _=l.render.frame,v=h.geometry,g=e.get(h,v);if(c.get(g)!==_&&(e.update(g),c.set(g,_)),h.isInstancedMesh&&(h.hasEventListener("dispose",m)===!1&&h.addEventListener("dispose",m),c.get(h)!==_&&(i.update(h.instanceMatrix,s.ARRAY_BUFFER),h.instanceColor!==null&&i.update(h.instanceColor,s.ARRAY_BUFFER),c.set(h,_))),h.isSkinnedMesh){const y=h.skeleton;c.get(y)!==_&&(y.update(),c.set(y,_))}return g}function p(){c=new WeakMap}function m(h){const _=h.target;_.removeEventListener("dispose",m),r.releaseStatesOfObject(_),i.remove(_.instanceMatrix),_.instanceColor!==null&&i.remove(_.instanceColor)}return{update:d,dispose:p}}const jb={[fv]:"LINEAR_TONE_MAPPING",[dv]:"REINHARD_TONE_MAPPING",[hv]:"CINEON_TONE_MAPPING",[pv]:"ACES_FILMIC_TONE_MAPPING",[gv]:"AGX_TONE_MAPPING",[_v]:"NEUTRAL_TONE_MAPPING",[mv]:"CUSTOM_TONE_MAPPING"};function $b(s,e,i,r,l,c){const d=new Zi(e,i,{type:s,depthBuffer:l,stencilBuffer:c,samples:r?4:0,depthTexture:l?new ks(e,i):void 0}),p=new Zi(e,i,{type:Ta,depthBuffer:!1,stencilBuffer:!1}),m=new hn;m.setAttribute("position",new Qt([-1,3,0,-1,-1,0,3,-1,0],3)),m.setAttribute("uv",new Qt([0,2,0,0,2,0],2));const h=new Yy({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),_=new qt(m,h),v=new Hv(-1,1,1,-1,0,1);let g=null,y=null,b=!1,w,M=null,S=[],D=!1;this.setSize=function(P,C){d.setSize(P,C),p.setSize(P,C);for(let z=0;z<S.length;z++){const N=S[z];N.setSize&&N.setSize(P,C)}},this.setEffects=function(P){S=P,D=S.length>0&&S[0].isRenderPass===!0;const C=d.width,z=d.height;for(let N=0;N<S.length;N++){const L=S[N];L.setSize&&L.setSize(C,z)}},this.begin=function(P,C){if(b||P.toneMapping===Yi&&S.length===0)return!1;if(M=C,C!==null){const z=C.width,N=C.height;(d.width!==z||d.height!==N)&&this.setSize(z,N)}return D===!1&&P.setRenderTarget(d),w=P.toneMapping,P.toneMapping=Yi,!0},this.hasRenderPass=function(){return D},this.end=function(P,C){P.toneMapping=w,b=!0;let z=d,N=p;for(let L=0;L<S.length;L++){const T=S[L];if(T.enabled!==!1&&(T.render(P,N,z,C),T.needsSwap!==!1)){const U=z;z=N,N=U}}if(g!==P.outputColorSpace||y!==P.toneMapping){g=P.outputColorSpace,y=P.toneMapping,h.defines={},yt.getTransfer(g)===Bt&&(h.defines.SRGB_TRANSFER="");const L=jb[y];L&&(h.defines[L]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=z.texture,P.setRenderTarget(M),P.render(_,v),M=null,b=!1},this.isCompositing=function(){return b},this.dispose=function(){d.depthTexture&&d.depthTexture.dispose(),d.dispose(),p.dispose(),m.dispose(),h.dispose()}}const Xv=new Xn,Hh=new ks(1,1),Wv=new Rv,qv=new Ey,Yv=new Pv,H_=[],G_=[],V_=new Float32Array(16),k_=new Float32Array(9),X_=new Float32Array(4);function Zs(s,e,i){const r=s[0];if(r<=0||r>0)return s;const l=e*i;let c=H_[l];if(c===void 0&&(c=new Float32Array(l),H_[l]=c),e!==0){r.toArray(c,0);for(let d=1,p=0;d!==e;++d)p+=i,s[d].toArray(c,p)}return c}function bn(s,e){if(s.length!==e.length)return!1;for(let i=0,r=s.length;i<r;i++)if(s[i]!==e[i])return!1;return!0}function Tn(s,e){for(let i=0,r=e.length;i<r;i++)s[i]=e[i]}function ou(s,e){let i=G_[e];i===void 0&&(i=new Int32Array(e),G_[e]=i);for(let r=0;r!==e;++r)i[r]=s.allocateTextureUnit();return i}function eT(s,e){const i=this.cache;i[0]!==e&&(s.uniform1f(this.addr,e),i[0]=e)}function tT(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(bn(i,e))return;s.uniform2fv(this.addr,e),Tn(i,e)}}function nT(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else if(e.r!==void 0)(i[0]!==e.r||i[1]!==e.g||i[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),i[0]=e.r,i[1]=e.g,i[2]=e.b);else{if(bn(i,e))return;s.uniform3fv(this.addr,e),Tn(i,e)}}function iT(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(bn(i,e))return;s.uniform4fv(this.addr,e),Tn(i,e)}}function aT(s,e){const i=this.cache,r=e.elements;if(r===void 0){if(bn(i,e))return;s.uniformMatrix2fv(this.addr,!1,e),Tn(i,e)}else{if(bn(i,r))return;X_.set(r),s.uniformMatrix2fv(this.addr,!1,X_),Tn(i,r)}}function rT(s,e){const i=this.cache,r=e.elements;if(r===void 0){if(bn(i,e))return;s.uniformMatrix3fv(this.addr,!1,e),Tn(i,e)}else{if(bn(i,r))return;k_.set(r),s.uniformMatrix3fv(this.addr,!1,k_),Tn(i,r)}}function sT(s,e){const i=this.cache,r=e.elements;if(r===void 0){if(bn(i,e))return;s.uniformMatrix4fv(this.addr,!1,e),Tn(i,e)}else{if(bn(i,r))return;V_.set(r),s.uniformMatrix4fv(this.addr,!1,V_),Tn(i,r)}}function oT(s,e){const i=this.cache;i[0]!==e&&(s.uniform1i(this.addr,e),i[0]=e)}function lT(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(bn(i,e))return;s.uniform2iv(this.addr,e),Tn(i,e)}}function cT(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(bn(i,e))return;s.uniform3iv(this.addr,e),Tn(i,e)}}function uT(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(bn(i,e))return;s.uniform4iv(this.addr,e),Tn(i,e)}}function fT(s,e){const i=this.cache;i[0]!==e&&(s.uniform1ui(this.addr,e),i[0]=e)}function dT(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(bn(i,e))return;s.uniform2uiv(this.addr,e),Tn(i,e)}}function hT(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(bn(i,e))return;s.uniform3uiv(this.addr,e),Tn(i,e)}}function pT(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(bn(i,e))return;s.uniform4uiv(this.addr,e),Tn(i,e)}}function mT(s,e,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(s.uniform1i(this.addr,l),r[0]=l);let c;this.type===s.SAMPLER_2D_SHADOW?(Hh.compareFunction=i.isReversedDepthBuffer()?$h:jh,c=Hh):c=Xv,i.setTexture2D(e||c,l)}function gT(s,e,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(s.uniform1i(this.addr,l),r[0]=l),i.setTexture3D(e||qv,l)}function _T(s,e,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(s.uniform1i(this.addr,l),r[0]=l),i.setTextureCube(e||Yv,l)}function vT(s,e,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(s.uniform1i(this.addr,l),r[0]=l),i.setTexture2DArray(e||Wv,l)}function xT(s){switch(s){case 5126:return eT;case 35664:return tT;case 35665:return nT;case 35666:return iT;case 35674:return aT;case 35675:return rT;case 35676:return sT;case 5124:case 35670:return oT;case 35667:case 35671:return lT;case 35668:case 35672:return cT;case 35669:case 35673:return uT;case 5125:return fT;case 36294:return dT;case 36295:return hT;case 36296:return pT;case 35678:case 36198:case 36298:case 36306:case 35682:return mT;case 35679:case 36299:case 36307:return gT;case 35680:case 36300:case 36308:case 36293:return _T;case 36289:case 36303:case 36311:case 36292:return vT}}function ST(s,e){s.uniform1fv(this.addr,e)}function MT(s,e){const i=Zs(e,this.size,2);s.uniform2fv(this.addr,i)}function yT(s,e){const i=Zs(e,this.size,3);s.uniform3fv(this.addr,i)}function ET(s,e){const i=Zs(e,this.size,4);s.uniform4fv(this.addr,i)}function bT(s,e){const i=Zs(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,i)}function TT(s,e){const i=Zs(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,i)}function AT(s,e){const i=Zs(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,i)}function RT(s,e){s.uniform1iv(this.addr,e)}function CT(s,e){s.uniform2iv(this.addr,e)}function wT(s,e){s.uniform3iv(this.addr,e)}function DT(s,e){s.uniform4iv(this.addr,e)}function UT(s,e){s.uniform1uiv(this.addr,e)}function NT(s,e){s.uniform2uiv(this.addr,e)}function LT(s,e){s.uniform3uiv(this.addr,e)}function OT(s,e){s.uniform4uiv(this.addr,e)}function PT(s,e,i){const r=this.cache,l=e.length,c=ou(i,l);bn(r,c)||(s.uniform1iv(this.addr,c),Tn(r,c));let d;this.type===s.SAMPLER_2D_SHADOW?d=Hh:d=Xv;for(let p=0;p!==l;++p)i.setTexture2D(e[p]||d,c[p])}function IT(s,e,i){const r=this.cache,l=e.length,c=ou(i,l);bn(r,c)||(s.uniform1iv(this.addr,c),Tn(r,c));for(let d=0;d!==l;++d)i.setTexture3D(e[d]||qv,c[d])}function zT(s,e,i){const r=this.cache,l=e.length,c=ou(i,l);bn(r,c)||(s.uniform1iv(this.addr,c),Tn(r,c));for(let d=0;d!==l;++d)i.setTextureCube(e[d]||Yv,c[d])}function BT(s,e,i){const r=this.cache,l=e.length,c=ou(i,l);bn(r,c)||(s.uniform1iv(this.addr,c),Tn(r,c));for(let d=0;d!==l;++d)i.setTexture2DArray(e[d]||Wv,c[d])}function FT(s){switch(s){case 5126:return ST;case 35664:return MT;case 35665:return yT;case 35666:return ET;case 35674:return bT;case 35675:return TT;case 35676:return AT;case 5124:case 35670:return RT;case 35667:case 35671:return CT;case 35668:case 35672:return wT;case 35669:case 35673:return DT;case 5125:return UT;case 36294:return NT;case 36295:return LT;case 36296:return OT;case 35678:case 36198:case 36298:case 36306:case 35682:return PT;case 35679:case 36299:case 36307:return IT;case 35680:case 36300:case 36308:case 36293:return zT;case 36289:case 36303:case 36311:case 36292:return BT}}class HT{constructor(e,i,r){this.id=e,this.addr=r,this.cache=[],this.type=i.type,this.setValue=xT(i.type)}}class GT{constructor(e,i,r){this.id=e,this.addr=r,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=FT(i.type)}}class VT{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,i,r){const l=this.seq;for(let c=0,d=l.length;c!==d;++c){const p=l[c];p.setValue(e,i[p.id],r)}}}const Qd=/(\w+)(\])?(\[|\.)?/g;function W_(s,e){s.seq.push(e),s.map[e.id]=e}function kT(s,e,i){const r=s.name,l=r.length;for(Qd.lastIndex=0;;){const c=Qd.exec(r),d=Qd.lastIndex;let p=c[1];const m=c[2]==="]",h=c[3];if(m&&(p=p|0),h===void 0||h==="["&&d+2===l){W_(i,h===void 0?new HT(p,s,e):new GT(p,s,e));break}else{let v=i.map[p];v===void 0&&(v=new VT(p),W_(i,v)),i=v}}}class qc{constructor(e,i){this.seq=[],this.map={};const r=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let d=0;d<r;++d){const p=e.getActiveUniform(i,d),m=e.getUniformLocation(i,p.name);kT(p,m,this)}const l=[],c=[];for(const d of this.seq)d.type===e.SAMPLER_2D_SHADOW||d.type===e.SAMPLER_CUBE_SHADOW||d.type===e.SAMPLER_2D_ARRAY_SHADOW?l.push(d):c.push(d);l.length>0&&(this.seq=l.concat(c))}setValue(e,i,r,l){const c=this.map[i];c!==void 0&&c.setValue(e,r,l)}setOptional(e,i,r){const l=i[r];l!==void 0&&this.setValue(e,r,l)}static upload(e,i,r,l){for(let c=0,d=i.length;c!==d;++c){const p=i[c],m=r[p.id];m.needsUpdate!==!1&&p.setValue(e,m.value,l)}}static seqWithValue(e,i){const r=[];for(let l=0,c=e.length;l!==c;++l){const d=e[l];d.id in i&&r.push(d)}return r}}function q_(s,e,i){const r=s.createShader(e);return s.shaderSource(r,i),s.compileShader(r),r}const XT=37297;let WT=0;function qT(s,e){const i=s.split(`
`),r=[],l=Math.max(e-6,0),c=Math.min(e+6,i.length);for(let d=l;d<c;d++){const p=d+1;r.push(`${p===e?">":" "} ${p}: ${i[d]}`)}return r.join(`
`)}const Y_=new st;function YT(s){yt._getMatrix(Y_,yt.workingColorSpace,s);const e=`mat3( ${Y_.elements.map(i=>i.toFixed(4))} )`;switch(yt.getTransfer(s)){case Qc:return[e,"LinearTransferOETF"];case Bt:return[e,"sRGBTransferOETF"];default:return tt("WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function Z_(s,e,i){const r=s.getShaderParameter(e,s.COMPILE_STATUS),c=(s.getShaderInfoLog(e)||"").trim();if(r&&c==="")return"";const d=/ERROR: 0:(\d+)/.exec(c);if(d){const p=parseInt(d[1]);return i.toUpperCase()+`

`+c+`

`+qT(s.getShaderSource(e),p)}else return c}function ZT(s,e){const i=YT(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}const KT={[fv]:"Linear",[dv]:"Reinhard",[hv]:"Cineon",[pv]:"ACESFilmic",[gv]:"AgX",[_v]:"Neutral",[mv]:"Custom"};function QT(s,e){const i=KT[e];return i===void 0?(tt("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const Hc=new K;function JT(){yt.getLuminanceCoefficients(Hc);const s=Hc.x.toFixed(4),e=Hc.y.toFixed(4),i=Hc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function jT(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Qo).join(`
`)}function $T(s){const e=[];for(const i in s){const r=s[i];r!==!1&&e.push("#define "+i+" "+r)}return e.join(`
`)}function eA(s,e){const i={},r=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let l=0;l<r;l++){const c=s.getActiveAttrib(e,l),d=c.name;let p=1;c.type===s.FLOAT_MAT2&&(p=2),c.type===s.FLOAT_MAT3&&(p=3),c.type===s.FLOAT_MAT4&&(p=4),i[d]={type:c.type,location:s.getAttribLocation(e,d),locationSize:p}}return i}function Qo(s){return s!==""}function K_(s,e){const i=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Q_(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const tA=/^[ \t]*#include +<([\w\d./]+)>/gm;function Gh(s){return s.replace(tA,iA)}const nA=new Map;function iA(s,e){let i=ut[e];if(i===void 0){const r=nA.get(e);if(r!==void 0)i=ut[r],tt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Gh(i)}const aA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function J_(s){return s.replace(aA,rA)}function rA(s,e,i,r){let l="";for(let c=parseInt(e);c<parseInt(i);c++)l+=r.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function j_(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const sA={[Gc]:"SHADOWMAP_TYPE_PCF",[Ko]:"SHADOWMAP_TYPE_VSM"};function oA(s){return sA[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const lA={[Fr]:"ENVMAP_TYPE_CUBE",[Vs]:"ENVMAP_TYPE_CUBE",[iu]:"ENVMAP_TYPE_CUBE_UV"};function cA(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":lA[s.envMapMode]||"ENVMAP_TYPE_CUBE"}const uA={[Vs]:"ENVMAP_MODE_REFRACTION"};function fA(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":uA[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}const dA={[uv]:"ENVMAP_BLENDING_MULTIPLY",[HM]:"ENVMAP_BLENDING_MIX",[GM]:"ENVMAP_BLENDING_ADD"};function hA(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":dA[s.combine]||"ENVMAP_BLENDING_NONE"}function pA(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const i=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:r,maxMip:i}}function mA(s,e,i,r){const l=s.getContext(),c=i.defines;let d=i.vertexShader,p=i.fragmentShader;const m=oA(i),h=cA(i),_=fA(i),v=hA(i),g=pA(i),y=jT(i),b=$T(c),w=l.createProgram();let M,S,D=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(M=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,b].filter(Qo).join(`
`),M.length>0&&(M+=`
`),S=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,b].filter(Qo).join(`
`),S.length>0&&(S+=`
`)):(M=[j_(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,b,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+_:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexNormals?"#define HAS_NORMAL":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Qo).join(`
`),S=[j_(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,b,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+h:"",i.envMap?"#define "+_:"",i.envMap?"#define "+v:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor?"#define USE_COLOR":"",i.vertexAlphas||i.batchingColor?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==Yi?"#define TONE_MAPPING":"",i.toneMapping!==Yi?ut.tonemapping_pars_fragment:"",i.toneMapping!==Yi?QT("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",ut.colorspace_pars_fragment,ZT("linearToOutputTexel",i.outputColorSpace),JT(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(Qo).join(`
`)),d=Gh(d),d=K_(d,i),d=Q_(d,i),p=Gh(p),p=K_(p,i),p=Q_(p,i),d=J_(d),p=J_(p),i.isRawShaderMaterial!==!0&&(D=`#version 300 es
`,M=[y,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+M,S=["#define varying in",i.glslVersion===o_?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===o_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);const P=D+M+d,C=D+S+p,z=q_(l,l.VERTEX_SHADER,P),N=q_(l,l.FRAGMENT_SHADER,C);l.attachShader(w,z),l.attachShader(w,N),i.index0AttributeName!==void 0?l.bindAttribLocation(w,0,i.index0AttributeName):i.hasPositionAttribute===!0&&l.bindAttribLocation(w,0,"position"),l.linkProgram(w);function L(F){if(s.debug.checkShaderErrors){const W=l.getProgramInfoLog(w)||"",ce=l.getShaderInfoLog(z)||"",me=l.getShaderInfoLog(N)||"",j=W.trim(),B=ce.trim(),G=me.trim();let te=!0,ge=!0;if(l.getProgramParameter(w,l.LINK_STATUS)===!1)if(te=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(l,w,z,N);else{const Ee=Z_(l,z,"vertex"),I=Z_(l,N,"fragment");bt("WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(w,l.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+j+`
`+Ee+`
`+I)}else j!==""?tt("WebGLProgram: Program Info Log:",j):(B===""||G==="")&&(ge=!1);ge&&(F.diagnostics={runnable:te,programLog:j,vertexShader:{log:B,prefix:M},fragmentShader:{log:G,prefix:S}})}l.deleteShader(z),l.deleteShader(N),T=new qc(l,w),U=eA(l,w)}let T;this.getUniforms=function(){return T===void 0&&L(this),T};let U;this.getAttributes=function(){return U===void 0&&L(this),U};let k=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return k===!1&&(k=l.getProgramParameter(w,XT)),k},this.destroy=function(){r.releaseStatesOfProgram(this),l.deleteProgram(w),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=WT++,this.cacheKey=e,this.usedTimes=1,this.program=w,this.vertexShader=z,this.fragmentShader=N,this}let gA=0;class _A{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,i,r){const l=this._getShaderCacheForMaterial(e);return l.has(i)===!1&&(l.add(i),i.usedTimes++),l.has(r)===!1&&(l.add(r),r.usedTimes++),this}remove(e){const i=this.materialCache.get(e);for(const r of i)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const i=this.materialCache;let r=i.get(e);return r===void 0&&(r=new Set,i.set(e,r)),r}_getShaderStage(e){const i=this.shaderCache;let r=i.get(e);return r===void 0&&(r=new vA(e),i.set(e,r)),r}}class vA{constructor(e){this.id=gA++,this.code=e,this.usedTimes=0}}function xA(s){return s===Hr||s===Yc||s===Zc}function SA(s,e,i,r,l,c){const d=new Cv,p=new _A,m=new Set,h=[],_=new Map,v=r.logarithmicDepthBuffer;let g=r.precision;const y={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function b(T){return m.add(T),T===0?"uv":`uv${T}`}function w(T,U,k,F,W,ce){const me=F.fog,j=W.geometry,B=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?F.environment:null,G=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap,te=e.get(T.envMap||B,G),ge=te&&te.mapping===iu?te.image.height:null,Ee=y[T.type];T.precision!==null&&(g=r.getMaxPrecision(T.precision),g!==T.precision&&tt("WebGLProgram.getParameters:",T.precision,"not supported, using",g,"instead."));const I=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,Q=I!==void 0?I.length:0;let ye=0;j.morphAttributes.position!==void 0&&(ye=1),j.morphAttributes.normal!==void 0&&(ye=2),j.morphAttributes.color!==void 0&&(ye=3);let Re,Pe,ae,xe;if(Ee){const Ge=Xi[Ee];Re=Ge.vertexShader,Pe=Ge.fragmentShader}else{Re=T.vertexShader,Pe=T.fragmentShader;const Ge=p.getVertexShaderStage(T),Jt=p.getFragmentShaderStage(T);p.update(T,Ge,Jt),ae=Ge.id,xe=Jt.id}const Me=s.getRenderTarget(),Fe=s.state.buffers.depth.getReversed(),it=W.isInstancedMesh===!0,Qe=W.isBatchedMesh===!0,Yt=!!T.map,ft=!!T.matcap,xt=!!te,St=!!T.aoMap,dt=!!T.lightMap,tn=!!T.bumpMap&&T.wireframe===!1,nn=!!T.normalMap,an=!!T.displacementMap,cn=!!T.emissiveMap,Wt=!!T.metalnessMap,rn=!!T.roughnessMap,Y=T.anisotropy>0,Ft=T.clearcoat>0,wt=T.dispersion>0,O=T.iridescence>0,E=T.sheen>0,J=T.transmission>0,re=Y&&!!T.anisotropyMap,fe=Ft&&!!T.clearcoatMap,be=Ft&&!!T.clearcoatNormalMap,we=Ft&&!!T.clearcoatRoughnessMap,ue=O&&!!T.iridescenceMap,de=O&&!!T.iridescenceThicknessMap,Ae=E&&!!T.sheenColorMap,ze=E&&!!T.sheenRoughnessMap,Ne=!!T.specularMap,De=!!T.specularColorMap,Ze=!!T.specularIntensityMap,Je=J&&!!T.transmissionMap,at=J&&!!T.thicknessMap,X=!!T.gradientMap,Te=!!T.alphaMap,pe=T.alphaTest>0,Ce=!!T.alphaHash,Ie=!!T.extensions;let Se=Yi;T.toneMapped&&(Me===null||Me.isXRRenderTarget===!0)&&(Se=s.toneMapping);const We={shaderID:Ee,shaderType:T.type,shaderName:T.name,vertexShader:Re,fragmentShader:Pe,defines:T.defines,customVertexShaderID:ae,customFragmentShaderID:xe,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:g,batching:Qe,batchingColor:Qe&&W._colorsTexture!==null,instancing:it,instancingColor:it&&W.instanceColor!==null,instancingMorph:it&&W.morphTexture!==null,outputColorSpace:Me===null?s.outputColorSpace:Me.isXRRenderTarget===!0?Me.texture.colorSpace:yt.workingColorSpace,alphaToCoverage:!!T.alphaToCoverage,map:Yt,matcap:ft,envMap:xt,envMapMode:xt&&te.mapping,envMapCubeUVHeight:ge,aoMap:St,lightMap:dt,bumpMap:tn,normalMap:nn,displacementMap:an,emissiveMap:cn,normalMapObjectSpace:nn&&T.normalMapType===XM,normalMapTangentSpace:nn&&T.normalMapType===a_,packedNormalMap:nn&&T.normalMapType===a_&&xA(T.normalMap.format),metalnessMap:Wt,roughnessMap:rn,anisotropy:Y,anisotropyMap:re,clearcoat:Ft,clearcoatMap:fe,clearcoatNormalMap:be,clearcoatRoughnessMap:we,dispersion:wt,iridescence:O,iridescenceMap:ue,iridescenceThicknessMap:de,sheen:E,sheenColorMap:Ae,sheenRoughnessMap:ze,specularMap:Ne,specularColorMap:De,specularIntensityMap:Ze,transmission:J,transmissionMap:Je,thicknessMap:at,gradientMap:X,opaque:T.transparent===!1&&T.blending===Is&&T.alphaToCoverage===!1,alphaMap:Te,alphaTest:pe,alphaHash:Ce,combine:T.combine,mapUv:Yt&&b(T.map.channel),aoMapUv:St&&b(T.aoMap.channel),lightMapUv:dt&&b(T.lightMap.channel),bumpMapUv:tn&&b(T.bumpMap.channel),normalMapUv:nn&&b(T.normalMap.channel),displacementMapUv:an&&b(T.displacementMap.channel),emissiveMapUv:cn&&b(T.emissiveMap.channel),metalnessMapUv:Wt&&b(T.metalnessMap.channel),roughnessMapUv:rn&&b(T.roughnessMap.channel),anisotropyMapUv:re&&b(T.anisotropyMap.channel),clearcoatMapUv:fe&&b(T.clearcoatMap.channel),clearcoatNormalMapUv:be&&b(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:we&&b(T.clearcoatRoughnessMap.channel),iridescenceMapUv:ue&&b(T.iridescenceMap.channel),iridescenceThicknessMapUv:de&&b(T.iridescenceThicknessMap.channel),sheenColorMapUv:Ae&&b(T.sheenColorMap.channel),sheenRoughnessMapUv:ze&&b(T.sheenRoughnessMap.channel),specularMapUv:Ne&&b(T.specularMap.channel),specularColorMapUv:De&&b(T.specularColorMap.channel),specularIntensityMapUv:Ze&&b(T.specularIntensityMap.channel),transmissionMapUv:Je&&b(T.transmissionMap.channel),thicknessMapUv:at&&b(T.thicknessMap.channel),alphaMapUv:Te&&b(T.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(nn||Y),vertexNormals:!!j.attributes.normal,vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:W.isPoints===!0&&!!j.attributes.uv&&(Yt||Te),fog:!!me,useFog:T.fog===!0,fogExp2:!!me&&me.isFogExp2,flatShading:T.wireframe===!1&&(T.flatShading===!0||j.attributes.normal===void 0&&nn===!1&&(T.isMeshLambertMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isMeshPhysicalMaterial)),sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:v,reversedDepthBuffer:Fe,skinning:W.isSkinnedMesh===!0,hasPositionAttribute:j.attributes.position!==void 0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:ye,numDirLights:U.directional.length,numPointLights:U.point.length,numSpotLights:U.spot.length,numSpotLightMaps:U.spotLightMap.length,numRectAreaLights:U.rectArea.length,numHemiLights:U.hemi.length,numDirLightShadows:U.directionalShadowMap.length,numPointLightShadows:U.pointShadowMap.length,numSpotLightShadows:U.spotShadowMap.length,numSpotLightShadowsWithMaps:U.numSpotLightShadowsWithMaps,numLightProbes:U.numLightProbes,numLightProbeGrids:ce.length,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:T.dithering,shadowMapEnabled:s.shadowMap.enabled&&k.length>0,shadowMapType:s.shadowMap.type,toneMapping:Se,decodeVideoTexture:Yt&&T.map.isVideoTexture===!0&&yt.getTransfer(T.map.colorSpace)===Bt,decodeVideoTextureEmissive:cn&&T.emissiveMap.isVideoTexture===!0&&yt.getTransfer(T.emissiveMap.colorSpace)===Bt,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===pi,flipSided:T.side===jn,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:Ie&&T.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ie&&T.extensions.multiDraw===!0||Qe)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return We.vertexUv1s=m.has(1),We.vertexUv2s=m.has(2),We.vertexUv3s=m.has(3),m.clear(),We}function M(T){const U=[];if(T.shaderID?U.push(T.shaderID):(U.push(T.customVertexShaderID),U.push(T.customFragmentShaderID)),T.defines!==void 0)for(const k in T.defines)U.push(k),U.push(T.defines[k]);return T.isRawShaderMaterial===!1&&(S(U,T),D(U,T),U.push(s.outputColorSpace)),U.push(T.customProgramCacheKey),U.join()}function S(T,U){T.push(U.precision),T.push(U.outputColorSpace),T.push(U.envMapMode),T.push(U.envMapCubeUVHeight),T.push(U.mapUv),T.push(U.alphaMapUv),T.push(U.lightMapUv),T.push(U.aoMapUv),T.push(U.bumpMapUv),T.push(U.normalMapUv),T.push(U.displacementMapUv),T.push(U.emissiveMapUv),T.push(U.metalnessMapUv),T.push(U.roughnessMapUv),T.push(U.anisotropyMapUv),T.push(U.clearcoatMapUv),T.push(U.clearcoatNormalMapUv),T.push(U.clearcoatRoughnessMapUv),T.push(U.iridescenceMapUv),T.push(U.iridescenceThicknessMapUv),T.push(U.sheenColorMapUv),T.push(U.sheenRoughnessMapUv),T.push(U.specularMapUv),T.push(U.specularColorMapUv),T.push(U.specularIntensityMapUv),T.push(U.transmissionMapUv),T.push(U.thicknessMapUv),T.push(U.combine),T.push(U.fogExp2),T.push(U.sizeAttenuation),T.push(U.morphTargetsCount),T.push(U.morphAttributeCount),T.push(U.numDirLights),T.push(U.numPointLights),T.push(U.numSpotLights),T.push(U.numSpotLightMaps),T.push(U.numHemiLights),T.push(U.numRectAreaLights),T.push(U.numDirLightShadows),T.push(U.numPointLightShadows),T.push(U.numSpotLightShadows),T.push(U.numSpotLightShadowsWithMaps),T.push(U.numLightProbes),T.push(U.shadowMapType),T.push(U.toneMapping),T.push(U.numClippingPlanes),T.push(U.numClipIntersection),T.push(U.depthPacking)}function D(T,U){d.disableAll(),U.instancing&&d.enable(0),U.instancingColor&&d.enable(1),U.instancingMorph&&d.enable(2),U.matcap&&d.enable(3),U.envMap&&d.enable(4),U.normalMapObjectSpace&&d.enable(5),U.normalMapTangentSpace&&d.enable(6),U.clearcoat&&d.enable(7),U.iridescence&&d.enable(8),U.alphaTest&&d.enable(9),U.vertexColors&&d.enable(10),U.vertexAlphas&&d.enable(11),U.vertexUv1s&&d.enable(12),U.vertexUv2s&&d.enable(13),U.vertexUv3s&&d.enable(14),U.vertexTangents&&d.enable(15),U.anisotropy&&d.enable(16),U.alphaHash&&d.enable(17),U.batching&&d.enable(18),U.dispersion&&d.enable(19),U.batchingColor&&d.enable(20),U.gradientMap&&d.enable(21),U.packedNormalMap&&d.enable(22),U.vertexNormals&&d.enable(23),T.push(d.mask),d.disableAll(),U.fog&&d.enable(0),U.useFog&&d.enable(1),U.flatShading&&d.enable(2),U.logarithmicDepthBuffer&&d.enable(3),U.reversedDepthBuffer&&d.enable(4),U.skinning&&d.enable(5),U.morphTargets&&d.enable(6),U.morphNormals&&d.enable(7),U.morphColors&&d.enable(8),U.premultipliedAlpha&&d.enable(9),U.shadowMapEnabled&&d.enable(10),U.doubleSided&&d.enable(11),U.flipSided&&d.enable(12),U.useDepthPacking&&d.enable(13),U.dithering&&d.enable(14),U.transmission&&d.enable(15),U.sheen&&d.enable(16),U.opaque&&d.enable(17),U.pointsUvs&&d.enable(18),U.decodeVideoTexture&&d.enable(19),U.decodeVideoTextureEmissive&&d.enable(20),U.alphaToCoverage&&d.enable(21),U.numLightProbeGrids>0&&d.enable(22),U.hasPositionAttribute&&d.enable(23),T.push(d.mask)}function P(T){const U=y[T.type];let k;if(U){const F=Xi[U];k=Xy.clone(F.uniforms)}else k=T.uniforms;return k}function C(T,U){let k=_.get(U);return k!==void 0?++k.usedTimes:(k=new mA(s,U,T,l),h.push(k),_.set(U,k)),k}function z(T){if(--T.usedTimes===0){const U=h.indexOf(T);h[U]=h[h.length-1],h.pop(),_.delete(T.cacheKey),T.destroy()}}function N(T){p.remove(T)}function L(){p.dispose()}return{getParameters:w,getProgramCacheKey:M,getUniforms:P,acquireProgram:C,releaseProgram:z,releaseShaderCache:N,programs:h,dispose:L}}function MA(){let s=new WeakMap;function e(d){return s.has(d)}function i(d){let p=s.get(d);return p===void 0&&(p={},s.set(d,p)),p}function r(d){s.delete(d)}function l(d,p,m){s.get(d)[p]=m}function c(){s=new WeakMap}return{has:e,get:i,remove:r,update:l,dispose:c}}function yA(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.materialVariant!==e.materialVariant?s.materialVariant-e.materialVariant:s.z!==e.z?s.z-e.z:s.id-e.id}function $_(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function ev(){const s=[];let e=0;const i=[],r=[],l=[];function c(){e=0,i.length=0,r.length=0,l.length=0}function d(g){let y=0;return g.isInstancedMesh&&(y+=2),g.isSkinnedMesh&&(y+=1),y}function p(g,y,b,w,M,S){let D=s[e];return D===void 0?(D={id:g.id,object:g,geometry:y,material:b,materialVariant:d(g),groupOrder:w,renderOrder:g.renderOrder,z:M,group:S},s[e]=D):(D.id=g.id,D.object=g,D.geometry=y,D.material=b,D.materialVariant=d(g),D.groupOrder=w,D.renderOrder=g.renderOrder,D.z=M,D.group=S),e++,D}function m(g,y,b,w,M,S){const D=p(g,y,b,w,M,S);b.transmission>0?r.push(D):b.transparent===!0?l.push(D):i.push(D)}function h(g,y,b,w,M,S){const D=p(g,y,b,w,M,S);b.transmission>0?r.unshift(D):b.transparent===!0?l.unshift(D):i.unshift(D)}function _(g,y,b){i.length>1&&i.sort(g||yA),r.length>1&&r.sort(y||$_),l.length>1&&l.sort(y||$_),b&&(i.reverse(),r.reverse(),l.reverse())}function v(){for(let g=e,y=s.length;g<y;g++){const b=s[g];if(b.id===null)break;b.id=null,b.object=null,b.geometry=null,b.material=null,b.group=null}}return{opaque:i,transmissive:r,transparent:l,init:c,push:m,unshift:h,finish:v,sort:_}}function EA(){let s=new WeakMap;function e(r,l){const c=s.get(r);let d;return c===void 0?(d=new ev,s.set(r,[d])):l>=c.length?(d=new ev,c.push(d)):d=c[l],d}function i(){s=new WeakMap}return{get:e,dispose:i}}function bA(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let i;switch(e.type){case"DirectionalLight":i={direction:new K,color:new Tt};break;case"SpotLight":i={position:new K,direction:new K,color:new Tt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new K,color:new Tt,distance:0,decay:0};break;case"HemisphereLight":i={direction:new K,skyColor:new Tt,groundColor:new Tt};break;case"RectAreaLight":i={color:new Tt,position:new K,halfWidth:new K,halfHeight:new K};break}return s[e.id]=i,i}}}function TA(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let i;switch(e.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=i,i}}}let AA=0;function RA(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function CA(s){const e=new bA,i=TA(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)r.probe.push(new K);const l=new K,c=new dn,d=new dn;function p(h){let _=0,v=0,g=0;for(let U=0;U<9;U++)r.probe[U].set(0,0,0);let y=0,b=0,w=0,M=0,S=0,D=0,P=0,C=0,z=0,N=0,L=0;h.sort(RA);for(let U=0,k=h.length;U<k;U++){const F=h[U],W=F.color,ce=F.intensity,me=F.distance;let j=null;if(F.shadow&&F.shadow.map&&(F.shadow.map.texture.format===Hr?j=F.shadow.map.texture:j=F.shadow.map.depthTexture||F.shadow.map.texture),F.isAmbientLight)_+=W.r*ce,v+=W.g*ce,g+=W.b*ce;else if(F.isLightProbe){for(let B=0;B<9;B++)r.probe[B].addScaledVector(F.sh.coefficients[B],ce);L++}else if(F.isDirectionalLight){const B=e.get(F);if(B.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){const G=F.shadow,te=i.get(F);te.shadowIntensity=G.intensity,te.shadowBias=G.bias,te.shadowNormalBias=G.normalBias,te.shadowRadius=G.radius,te.shadowMapSize=G.mapSize,r.directionalShadow[y]=te,r.directionalShadowMap[y]=j,r.directionalShadowMatrix[y]=F.shadow.matrix,D++}r.directional[y]=B,y++}else if(F.isSpotLight){const B=e.get(F);B.position.setFromMatrixPosition(F.matrixWorld),B.color.copy(W).multiplyScalar(ce),B.distance=me,B.coneCos=Math.cos(F.angle),B.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),B.decay=F.decay,r.spot[w]=B;const G=F.shadow;if(F.map&&(r.spotLightMap[z]=F.map,z++,G.updateMatrices(F),F.castShadow&&N++),r.spotLightMatrix[w]=G.matrix,F.castShadow){const te=i.get(F);te.shadowIntensity=G.intensity,te.shadowBias=G.bias,te.shadowNormalBias=G.normalBias,te.shadowRadius=G.radius,te.shadowMapSize=G.mapSize,r.spotShadow[w]=te,r.spotShadowMap[w]=j,C++}w++}else if(F.isRectAreaLight){const B=e.get(F);B.color.copy(W).multiplyScalar(ce),B.halfWidth.set(F.width*.5,0,0),B.halfHeight.set(0,F.height*.5,0),r.rectArea[M]=B,M++}else if(F.isPointLight){const B=e.get(F);if(B.color.copy(F.color).multiplyScalar(F.intensity),B.distance=F.distance,B.decay=F.decay,F.castShadow){const G=F.shadow,te=i.get(F);te.shadowIntensity=G.intensity,te.shadowBias=G.bias,te.shadowNormalBias=G.normalBias,te.shadowRadius=G.radius,te.shadowMapSize=G.mapSize,te.shadowCameraNear=G.camera.near,te.shadowCameraFar=G.camera.far,r.pointShadow[b]=te,r.pointShadowMap[b]=j,r.pointShadowMatrix[b]=F.shadow.matrix,P++}r.point[b]=B,b++}else if(F.isHemisphereLight){const B=e.get(F);B.skyColor.copy(F.color).multiplyScalar(ce),B.groundColor.copy(F.groundColor).multiplyScalar(ce),r.hemi[S]=B,S++}}M>0&&(s.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Oe.LTC_FLOAT_1,r.rectAreaLTC2=Oe.LTC_FLOAT_2):(r.rectAreaLTC1=Oe.LTC_HALF_1,r.rectAreaLTC2=Oe.LTC_HALF_2)),r.ambient[0]=_,r.ambient[1]=v,r.ambient[2]=g;const T=r.hash;(T.directionalLength!==y||T.pointLength!==b||T.spotLength!==w||T.rectAreaLength!==M||T.hemiLength!==S||T.numDirectionalShadows!==D||T.numPointShadows!==P||T.numSpotShadows!==C||T.numSpotMaps!==z||T.numLightProbes!==L)&&(r.directional.length=y,r.spot.length=w,r.rectArea.length=M,r.point.length=b,r.hemi.length=S,r.directionalShadow.length=D,r.directionalShadowMap.length=D,r.pointShadow.length=P,r.pointShadowMap.length=P,r.spotShadow.length=C,r.spotShadowMap.length=C,r.directionalShadowMatrix.length=D,r.pointShadowMatrix.length=P,r.spotLightMatrix.length=C+z-N,r.spotLightMap.length=z,r.numSpotLightShadowsWithMaps=N,r.numLightProbes=L,T.directionalLength=y,T.pointLength=b,T.spotLength=w,T.rectAreaLength=M,T.hemiLength=S,T.numDirectionalShadows=D,T.numPointShadows=P,T.numSpotShadows=C,T.numSpotMaps=z,T.numLightProbes=L,r.version=AA++)}function m(h,_){let v=0,g=0,y=0,b=0,w=0;const M=_.matrixWorldInverse;for(let S=0,D=h.length;S<D;S++){const P=h[S];if(P.isDirectionalLight){const C=r.directional[v];C.direction.setFromMatrixPosition(P.matrixWorld),l.setFromMatrixPosition(P.target.matrixWorld),C.direction.sub(l),C.direction.transformDirection(M),v++}else if(P.isSpotLight){const C=r.spot[y];C.position.setFromMatrixPosition(P.matrixWorld),C.position.applyMatrix4(M),C.direction.setFromMatrixPosition(P.matrixWorld),l.setFromMatrixPosition(P.target.matrixWorld),C.direction.sub(l),C.direction.transformDirection(M),y++}else if(P.isRectAreaLight){const C=r.rectArea[b];C.position.setFromMatrixPosition(P.matrixWorld),C.position.applyMatrix4(M),d.identity(),c.copy(P.matrixWorld),c.premultiply(M),d.extractRotation(c),C.halfWidth.set(P.width*.5,0,0),C.halfHeight.set(0,P.height*.5,0),C.halfWidth.applyMatrix4(d),C.halfHeight.applyMatrix4(d),b++}else if(P.isPointLight){const C=r.point[g];C.position.setFromMatrixPosition(P.matrixWorld),C.position.applyMatrix4(M),g++}else if(P.isHemisphereLight){const C=r.hemi[w];C.direction.setFromMatrixPosition(P.matrixWorld),C.direction.transformDirection(M),w++}}}return{setup:p,setupView:m,state:r}}function tv(s){const e=new CA(s),i=[],r=[],l=[];function c(g){v.camera=g,i.length=0,r.length=0,l.length=0}function d(g){i.push(g)}function p(g){r.push(g)}function m(g){l.push(g)}function h(){e.setup(i)}function _(g){e.setupView(i,g)}const v={lightsArray:i,shadowsArray:r,lightProbeGridArray:l,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:c,state:v,setupLights:h,setupLightsView:_,pushLight:d,pushShadow:p,pushLightProbeGrid:m}}function wA(s){let e=new WeakMap;function i(l,c=0){const d=e.get(l);let p;return d===void 0?(p=new tv(s),e.set(l,[p])):c>=d.length?(p=new tv(s),d.push(p)):p=d[c],p}function r(){e=new WeakMap}return{get:i,dispose:r}}const DA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,UA=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,NA=[new K(1,0,0),new K(-1,0,0),new K(0,1,0),new K(0,-1,0),new K(0,0,1),new K(0,0,-1)],LA=[new K(0,-1,0),new K(0,-1,0),new K(0,0,1),new K(0,0,-1),new K(0,-1,0),new K(0,-1,0)],nv=new dn,Zo=new K,Jd=new K;function OA(s,e,i){let r=new Lv;const l=new Et,c=new Et,d=new ln,p=new Zy,m=new Ky,h={},_=i.maxTextureSize,v={[lr]:jn,[jn]:lr,[pi]:pi},g=new Ji({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Et},radius:{value:4}},vertexShader:DA,fragmentShader:UA}),y=g.clone();y.defines.HORIZONTAL_PASS=1;const b=new hn;b.setAttribute("position",new Ki(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const w=new qt(b,g),M=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Gc;let S=this.type;this.render=function(N,L,T){if(M.enabled===!1||M.autoUpdate===!1&&M.needsUpdate===!1||N.length===0)return;this.type===MM&&(tt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Gc);const U=s.getRenderTarget(),k=s.getActiveCubeFace(),F=s.getActiveMipmapLevel(),W=s.state;W.setBlending(Ea),W.buffers.depth.getReversed()===!0?W.buffers.color.setClear(0,0,0,0):W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);const ce=S!==this.type;ce&&L.traverse(function(me){me.material&&(Array.isArray(me.material)?me.material.forEach(j=>j.needsUpdate=!0):me.material.needsUpdate=!0)});for(let me=0,j=N.length;me<j;me++){const B=N[me],G=B.shadow;if(G===void 0){tt("WebGLShadowMap:",B,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;l.copy(G.mapSize);const te=G.getFrameExtents();l.multiply(te),c.copy(G.mapSize),(l.x>_||l.y>_)&&(l.x>_&&(c.x=Math.floor(_/te.x),l.x=c.x*te.x,G.mapSize.x=c.x),l.y>_&&(c.y=Math.floor(_/te.y),l.y=c.y*te.y,G.mapSize.y=c.y));const ge=s.state.buffers.depth.getReversed();if(G.camera._reversedDepth=ge,G.map===null||ce===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===Ko){if(B.isPointLight){tt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new Zi(l.x,l.y,{format:Hr,type:Ta,minFilter:Fn,magFilter:Fn,generateMipmaps:!1}),G.map.texture.name=B.name+".shadowMap",G.map.depthTexture=new ks(l.x,l.y,Wi),G.map.depthTexture.name=B.name+".shadowMapDepth",G.map.depthTexture.format=Aa,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Ln,G.map.depthTexture.magFilter=Ln}else B.isPointLight?(G.map=new kv(l.x),G.map.depthTexture=new Vy(l.x,Qi)):(G.map=new Zi(l.x,l.y),G.map.depthTexture=new ks(l.x,l.y,Qi)),G.map.depthTexture.name=B.name+".shadowMap",G.map.depthTexture.format=Aa,this.type===Gc?(G.map.depthTexture.compareFunction=ge?$h:jh,G.map.depthTexture.minFilter=Fn,G.map.depthTexture.magFilter=Fn):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Ln,G.map.depthTexture.magFilter=Ln);G.camera.updateProjectionMatrix()}const Ee=G.map.isWebGLCubeRenderTarget?6:1;for(let I=0;I<Ee;I++){if(G.map.isWebGLCubeRenderTarget)s.setRenderTarget(G.map,I),s.clear();else{I===0&&(s.setRenderTarget(G.map),s.clear());const Q=G.getViewport(I);d.set(c.x*Q.x,c.y*Q.y,c.x*Q.z,c.y*Q.w),W.viewport(d)}if(B.isPointLight){const Q=G.camera,ye=G.matrix,Re=B.distance||Q.far;Re!==Q.far&&(Q.far=Re,Q.updateProjectionMatrix()),Zo.setFromMatrixPosition(B.matrixWorld),Q.position.copy(Zo),Jd.copy(Q.position),Jd.add(NA[I]),Q.up.copy(LA[I]),Q.lookAt(Jd),Q.updateMatrixWorld(),ye.makeTranslation(-Zo.x,-Zo.y,-Zo.z),nv.multiplyMatrices(Q.projectionMatrix,Q.matrixWorldInverse),G._frustum.setFromProjectionMatrix(nv,Q.coordinateSystem,Q.reversedDepth)}else G.updateMatrices(B);r=G.getFrustum(),C(L,T,G.camera,B,this.type)}G.isPointLightShadow!==!0&&this.type===Ko&&D(G,T),G.needsUpdate=!1}S=this.type,M.needsUpdate=!1,s.setRenderTarget(U,k,F)};function D(N,L){const T=e.update(w);g.defines.VSM_SAMPLES!==N.blurSamples&&(g.defines.VSM_SAMPLES=N.blurSamples,y.defines.VSM_SAMPLES=N.blurSamples,g.needsUpdate=!0,y.needsUpdate=!0),N.mapPass===null&&(N.mapPass=new Zi(l.x,l.y,{format:Hr,type:Ta})),g.uniforms.shadow_pass.value=N.map.depthTexture,g.uniforms.resolution.value=N.mapSize,g.uniforms.radius.value=N.radius,s.setRenderTarget(N.mapPass),s.clear(),s.renderBufferDirect(L,null,T,g,w,null),y.uniforms.shadow_pass.value=N.mapPass.texture,y.uniforms.resolution.value=N.mapSize,y.uniforms.radius.value=N.radius,s.setRenderTarget(N.map),s.clear(),s.renderBufferDirect(L,null,T,y,w,null)}function P(N,L,T,U){let k=null;const F=T.isPointLight===!0?N.customDistanceMaterial:N.customDepthMaterial;if(F!==void 0)k=F;else if(k=T.isPointLight===!0?m:p,s.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){const W=k.uuid,ce=L.uuid;let me=h[W];me===void 0&&(me={},h[W]=me);let j=me[ce];j===void 0&&(j=k.clone(),me[ce]=j,L.addEventListener("dispose",z)),k=j}if(k.visible=L.visible,k.wireframe=L.wireframe,U===Ko?k.side=L.shadowSide!==null?L.shadowSide:L.side:k.side=L.shadowSide!==null?L.shadowSide:v[L.side],k.alphaMap=L.alphaMap,k.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,k.map=L.map,k.clipShadows=L.clipShadows,k.clippingPlanes=L.clippingPlanes,k.clipIntersection=L.clipIntersection,k.displacementMap=L.displacementMap,k.displacementScale=L.displacementScale,k.displacementBias=L.displacementBias,k.wireframeLinewidth=L.wireframeLinewidth,k.linewidth=L.linewidth,T.isPointLight===!0&&k.isMeshDistanceMaterial===!0){const W=s.properties.get(k);W.light=T}return k}function C(N,L,T,U,k){if(N.visible===!1)return;if(N.layers.test(L.layers)&&(N.isMesh||N.isLine||N.isPoints)&&(N.castShadow||N.receiveShadow&&k===Ko)&&(!N.frustumCulled||r.intersectsObject(N))){N.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,N.matrixWorld);const ce=e.update(N),me=N.material;if(Array.isArray(me)){const j=ce.groups;for(let B=0,G=j.length;B<G;B++){const te=j[B],ge=me[te.materialIndex];if(ge&&ge.visible){const Ee=P(N,ge,U,k);N.onBeforeShadow(s,N,L,T,ce,Ee,te),s.renderBufferDirect(T,null,ce,Ee,N,te),N.onAfterShadow(s,N,L,T,ce,Ee,te)}}}else if(me.visible){const j=P(N,me,U,k);N.onBeforeShadow(s,N,L,T,ce,j,null),s.renderBufferDirect(T,null,ce,j,N,null),N.onAfterShadow(s,N,L,T,ce,j,null)}}const W=N.children;for(let ce=0,me=W.length;ce<me;ce++)C(W[ce],L,T,U,k)}function z(N){N.target.removeEventListener("dispose",z);for(const T in h){const U=h[T],k=N.target.uuid;k in U&&(U[k].dispose(),delete U[k])}}}function PA(s,e){function i(){let X=!1;const Te=new ln;let pe=null;const Ce=new ln(0,0,0,0);return{setMask:function(Ie){pe!==Ie&&!X&&(s.colorMask(Ie,Ie,Ie,Ie),pe=Ie)},setLocked:function(Ie){X=Ie},setClear:function(Ie,Se,We,Ge,Jt){Jt===!0&&(Ie*=Ge,Se*=Ge,We*=Ge),Te.set(Ie,Se,We,Ge),Ce.equals(Te)===!1&&(s.clearColor(Ie,Se,We,Ge),Ce.copy(Te))},reset:function(){X=!1,pe=null,Ce.set(-1,0,0,0)}}}function r(){let X=!1,Te=!1,pe=null,Ce=null,Ie=null;return{setReversed:function(Se){if(Te!==Se){const We=e.get("EXT_clip_control");Se?We.clipControlEXT(We.LOWER_LEFT_EXT,We.ZERO_TO_ONE_EXT):We.clipControlEXT(We.LOWER_LEFT_EXT,We.NEGATIVE_ONE_TO_ONE_EXT),Te=Se;const Ge=Ie;Ie=null,this.setClear(Ge)}},getReversed:function(){return Te},setTest:function(Se){Se?Me(s.DEPTH_TEST):Fe(s.DEPTH_TEST)},setMask:function(Se){pe!==Se&&!X&&(s.depthMask(Se),pe=Se)},setFunc:function(Se){if(Te&&(Se=ey[Se]),Ce!==Se){switch(Se){case th:s.depthFunc(s.NEVER);break;case nh:s.depthFunc(s.ALWAYS);break;case ih:s.depthFunc(s.LESS);break;case Gs:s.depthFunc(s.LEQUAL);break;case ah:s.depthFunc(s.EQUAL);break;case rh:s.depthFunc(s.GEQUAL);break;case sh:s.depthFunc(s.GREATER);break;case oh:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Ce=Se}},setLocked:function(Se){X=Se},setClear:function(Se){Ie!==Se&&(Ie=Se,Te&&(Se=1-Se),s.clearDepth(Se))},reset:function(){X=!1,pe=null,Ce=null,Ie=null,Te=!1}}}function l(){let X=!1,Te=null,pe=null,Ce=null,Ie=null,Se=null,We=null,Ge=null,Jt=null;return{setTest:function(Nt){X||(Nt?Me(s.STENCIL_TEST):Fe(s.STENCIL_TEST))},setMask:function(Nt){Te!==Nt&&!X&&(s.stencilMask(Nt),Te=Nt)},setFunc:function(Nt,ei,ti){(pe!==Nt||Ce!==ei||Ie!==ti)&&(s.stencilFunc(Nt,ei,ti),pe=Nt,Ce=ei,Ie=ti)},setOp:function(Nt,ei,ti){(Se!==Nt||We!==ei||Ge!==ti)&&(s.stencilOp(Nt,ei,ti),Se=Nt,We=ei,Ge=ti)},setLocked:function(Nt){X=Nt},setClear:function(Nt){Jt!==Nt&&(s.clearStencil(Nt),Jt=Nt)},reset:function(){X=!1,Te=null,pe=null,Ce=null,Ie=null,Se=null,We=null,Ge=null,Jt=null}}}const c=new i,d=new r,p=new l,m=new WeakMap,h=new WeakMap;let _={},v={},g={},y=new WeakMap,b=[],w=null,M=!1,S=null,D=null,P=null,C=null,z=null,N=null,L=null,T=new Tt(0,0,0),U=0,k=!1,F=null,W=null,ce=null,me=null,j=null;const B=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,te=0;const ge=s.getParameter(s.VERSION);ge.indexOf("WebGL")!==-1?(te=parseFloat(/^WebGL (\d)/.exec(ge)[1]),G=te>=1):ge.indexOf("OpenGL ES")!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(ge)[1]),G=te>=2);let Ee=null,I={};const Q=s.getParameter(s.SCISSOR_BOX),ye=s.getParameter(s.VIEWPORT),Re=new ln().fromArray(Q),Pe=new ln().fromArray(ye);function ae(X,Te,pe,Ce){const Ie=new Uint8Array(4),Se=s.createTexture();s.bindTexture(X,Se),s.texParameteri(X,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(X,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let We=0;We<pe;We++)X===s.TEXTURE_3D||X===s.TEXTURE_2D_ARRAY?s.texImage3D(Te,0,s.RGBA,1,1,Ce,0,s.RGBA,s.UNSIGNED_BYTE,Ie):s.texImage2D(Te+We,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Ie);return Se}const xe={};xe[s.TEXTURE_2D]=ae(s.TEXTURE_2D,s.TEXTURE_2D,1),xe[s.TEXTURE_CUBE_MAP]=ae(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),xe[s.TEXTURE_2D_ARRAY]=ae(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),xe[s.TEXTURE_3D]=ae(s.TEXTURE_3D,s.TEXTURE_3D,1,1),c.setClear(0,0,0,1),d.setClear(1),p.setClear(0),Me(s.DEPTH_TEST),d.setFunc(Gs),tn(!1),nn(t_),Me(s.CULL_FACE),St(Ea);function Me(X){_[X]!==!0&&(s.enable(X),_[X]=!0)}function Fe(X){_[X]!==!1&&(s.disable(X),_[X]=!1)}function it(X,Te){return g[X]!==Te?(s.bindFramebuffer(X,Te),g[X]=Te,X===s.DRAW_FRAMEBUFFER&&(g[s.FRAMEBUFFER]=Te),X===s.FRAMEBUFFER&&(g[s.DRAW_FRAMEBUFFER]=Te),!0):!1}function Qe(X,Te){let pe=b,Ce=!1;if(X){pe=y.get(Te),pe===void 0&&(pe=[],y.set(Te,pe));const Ie=X.textures;if(pe.length!==Ie.length||pe[0]!==s.COLOR_ATTACHMENT0){for(let Se=0,We=Ie.length;Se<We;Se++)pe[Se]=s.COLOR_ATTACHMENT0+Se;pe.length=Ie.length,Ce=!0}}else pe[0]!==s.BACK&&(pe[0]=s.BACK,Ce=!0);Ce&&s.drawBuffers(pe)}function Yt(X){return w!==X?(s.useProgram(X),w=X,!0):!1}const ft={[Or]:s.FUNC_ADD,[EM]:s.FUNC_SUBTRACT,[bM]:s.FUNC_REVERSE_SUBTRACT};ft[TM]=s.MIN,ft[AM]=s.MAX;const xt={[RM]:s.ZERO,[CM]:s.ONE,[wM]:s.SRC_COLOR,[$d]:s.SRC_ALPHA,[PM]:s.SRC_ALPHA_SATURATE,[LM]:s.DST_COLOR,[UM]:s.DST_ALPHA,[DM]:s.ONE_MINUS_SRC_COLOR,[eh]:s.ONE_MINUS_SRC_ALPHA,[OM]:s.ONE_MINUS_DST_COLOR,[NM]:s.ONE_MINUS_DST_ALPHA,[IM]:s.CONSTANT_COLOR,[zM]:s.ONE_MINUS_CONSTANT_COLOR,[BM]:s.CONSTANT_ALPHA,[FM]:s.ONE_MINUS_CONSTANT_ALPHA};function St(X,Te,pe,Ce,Ie,Se,We,Ge,Jt,Nt){if(X===Ea){M===!0&&(Fe(s.BLEND),M=!1);return}if(M===!1&&(Me(s.BLEND),M=!0),X!==yM){if(X!==S||Nt!==k){if((D!==Or||z!==Or)&&(s.blendEquation(s.FUNC_ADD),D=Or,z=Or),Nt)switch(X){case Is:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Br:s.blendFunc(s.ONE,s.ONE);break;case n_:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case i_:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:bt("WebGLState: Invalid blending: ",X);break}else switch(X){case Is:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Br:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case n_:bt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case i_:bt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:bt("WebGLState: Invalid blending: ",X);break}P=null,C=null,N=null,L=null,T.set(0,0,0),U=0,S=X,k=Nt}return}Ie=Ie||Te,Se=Se||pe,We=We||Ce,(Te!==D||Ie!==z)&&(s.blendEquationSeparate(ft[Te],ft[Ie]),D=Te,z=Ie),(pe!==P||Ce!==C||Se!==N||We!==L)&&(s.blendFuncSeparate(xt[pe],xt[Ce],xt[Se],xt[We]),P=pe,C=Ce,N=Se,L=We),(Ge.equals(T)===!1||Jt!==U)&&(s.blendColor(Ge.r,Ge.g,Ge.b,Jt),T.copy(Ge),U=Jt),S=X,k=!1}function dt(X,Te){X.side===pi?Fe(s.CULL_FACE):Me(s.CULL_FACE);let pe=X.side===jn;Te&&(pe=!pe),tn(pe),X.blending===Is&&X.transparent===!1?St(Ea):St(X.blending,X.blendEquation,X.blendSrc,X.blendDst,X.blendEquationAlpha,X.blendSrcAlpha,X.blendDstAlpha,X.blendColor,X.blendAlpha,X.premultipliedAlpha),d.setFunc(X.depthFunc),d.setTest(X.depthTest),d.setMask(X.depthWrite),c.setMask(X.colorWrite);const Ce=X.stencilWrite;p.setTest(Ce),Ce&&(p.setMask(X.stencilWriteMask),p.setFunc(X.stencilFunc,X.stencilRef,X.stencilFuncMask),p.setOp(X.stencilFail,X.stencilZFail,X.stencilZPass)),cn(X.polygonOffset,X.polygonOffsetFactor,X.polygonOffsetUnits),X.alphaToCoverage===!0?Me(s.SAMPLE_ALPHA_TO_COVERAGE):Fe(s.SAMPLE_ALPHA_TO_COVERAGE)}function tn(X){F!==X&&(X?s.frontFace(s.CW):s.frontFace(s.CCW),F=X)}function nn(X){X!==xM?(Me(s.CULL_FACE),X!==W&&(X===t_?s.cullFace(s.BACK):X===SM?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Fe(s.CULL_FACE),W=X}function an(X){X!==ce&&(G&&s.lineWidth(X),ce=X)}function cn(X,Te,pe){X?(Me(s.POLYGON_OFFSET_FILL),(me!==Te||j!==pe)&&(me=Te,j=pe,d.getReversed()&&(Te=-Te),s.polygonOffset(Te,pe))):Fe(s.POLYGON_OFFSET_FILL)}function Wt(X){X?Me(s.SCISSOR_TEST):Fe(s.SCISSOR_TEST)}function rn(X){X===void 0&&(X=s.TEXTURE0+B-1),Ee!==X&&(s.activeTexture(X),Ee=X)}function Y(X,Te,pe){pe===void 0&&(Ee===null?pe=s.TEXTURE0+B-1:pe=Ee);let Ce=I[pe];Ce===void 0&&(Ce={type:void 0,texture:void 0},I[pe]=Ce),(Ce.type!==X||Ce.texture!==Te)&&(Ee!==pe&&(s.activeTexture(pe),Ee=pe),s.bindTexture(X,Te||xe[X]),Ce.type=X,Ce.texture=Te)}function Ft(){const X=I[Ee];X!==void 0&&X.type!==void 0&&(s.bindTexture(X.type,null),X.type=void 0,X.texture=void 0)}function wt(){try{s.compressedTexImage2D(...arguments)}catch(X){bt("WebGLState:",X)}}function O(){try{s.compressedTexImage3D(...arguments)}catch(X){bt("WebGLState:",X)}}function E(){try{s.texSubImage2D(...arguments)}catch(X){bt("WebGLState:",X)}}function J(){try{s.texSubImage3D(...arguments)}catch(X){bt("WebGLState:",X)}}function re(){try{s.compressedTexSubImage2D(...arguments)}catch(X){bt("WebGLState:",X)}}function fe(){try{s.compressedTexSubImage3D(...arguments)}catch(X){bt("WebGLState:",X)}}function be(){try{s.texStorage2D(...arguments)}catch(X){bt("WebGLState:",X)}}function we(){try{s.texStorage3D(...arguments)}catch(X){bt("WebGLState:",X)}}function ue(){try{s.texImage2D(...arguments)}catch(X){bt("WebGLState:",X)}}function de(){try{s.texImage3D(...arguments)}catch(X){bt("WebGLState:",X)}}function Ae(X){return v[X]!==void 0?v[X]:s.getParameter(X)}function ze(X,Te){v[X]!==Te&&(s.pixelStorei(X,Te),v[X]=Te)}function Ne(X){Re.equals(X)===!1&&(s.scissor(X.x,X.y,X.z,X.w),Re.copy(X))}function De(X){Pe.equals(X)===!1&&(s.viewport(X.x,X.y,X.z,X.w),Pe.copy(X))}function Ze(X,Te){let pe=h.get(Te);pe===void 0&&(pe=new WeakMap,h.set(Te,pe));let Ce=pe.get(X);Ce===void 0&&(Ce=s.getUniformBlockIndex(Te,X.name),pe.set(X,Ce))}function Je(X,Te){const Ce=h.get(Te).get(X);m.get(Te)!==Ce&&(s.uniformBlockBinding(Te,Ce,X.__bindingPointIndex),m.set(Te,Ce))}function at(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),d.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),_={},v={},Ee=null,I={},g={},y=new WeakMap,b=[],w=null,M=!1,S=null,D=null,P=null,C=null,z=null,N=null,L=null,T=new Tt(0,0,0),U=0,k=!1,F=null,W=null,ce=null,me=null,j=null,Re.set(0,0,s.canvas.width,s.canvas.height),Pe.set(0,0,s.canvas.width,s.canvas.height),c.reset(),d.reset(),p.reset()}return{buffers:{color:c,depth:d,stencil:p},enable:Me,disable:Fe,bindFramebuffer:it,drawBuffers:Qe,useProgram:Yt,setBlending:St,setMaterial:dt,setFlipSided:tn,setCullFace:nn,setLineWidth:an,setPolygonOffset:cn,setScissorTest:Wt,activeTexture:rn,bindTexture:Y,unbindTexture:Ft,compressedTexImage2D:wt,compressedTexImage3D:O,texImage2D:ue,texImage3D:de,pixelStorei:ze,getParameter:Ae,updateUBOMapping:Ze,uniformBlockBinding:Je,texStorage2D:be,texStorage3D:we,texSubImage2D:E,texSubImage3D:J,compressedTexSubImage2D:re,compressedTexSubImage3D:fe,scissor:Ne,viewport:De,reset:at}}function IA(s,e,i,r,l,c,d){const p=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new Et,_=new WeakMap,v=new Set;let g;const y=new WeakMap;let b=!1;try{b=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function w(O,E){return b?new OffscreenCanvas(O,E):jc("canvas")}function M(O,E,J){let re=1;const fe=wt(O);if((fe.width>J||fe.height>J)&&(re=J/Math.max(fe.width,fe.height)),re<1)if(typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&O instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&O instanceof ImageBitmap||typeof VideoFrame<"u"&&O instanceof VideoFrame){const be=Math.floor(re*fe.width),we=Math.floor(re*fe.height);g===void 0&&(g=w(be,we));const ue=E?w(be,we):g;return ue.width=be,ue.height=we,ue.getContext("2d").drawImage(O,0,0,be,we),tt("WebGLRenderer: Texture has been resized from ("+fe.width+"x"+fe.height+") to ("+be+"x"+we+")."),ue}else return"data"in O&&tt("WebGLRenderer: Image in DataTexture is too big ("+fe.width+"x"+fe.height+")."),O;return O}function S(O){return O.generateMipmaps}function D(O){s.generateMipmap(O)}function P(O){return O.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:O.isWebGL3DRenderTarget?s.TEXTURE_3D:O.isWebGLArrayRenderTarget||O.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function C(O,E,J,re,fe,be=!1){if(O!==null){if(s[O]!==void 0)return s[O];tt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+O+"'")}let we;re&&(we=e.get("EXT_texture_norm16"),we||tt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ue=E;if(E===s.RED&&(J===s.FLOAT&&(ue=s.R32F),J===s.HALF_FLOAT&&(ue=s.R16F),J===s.UNSIGNED_BYTE&&(ue=s.R8),J===s.UNSIGNED_SHORT&&we&&(ue=we.R16_EXT),J===s.SHORT&&we&&(ue=we.R16_SNORM_EXT)),E===s.RED_INTEGER&&(J===s.UNSIGNED_BYTE&&(ue=s.R8UI),J===s.UNSIGNED_SHORT&&(ue=s.R16UI),J===s.UNSIGNED_INT&&(ue=s.R32UI),J===s.BYTE&&(ue=s.R8I),J===s.SHORT&&(ue=s.R16I),J===s.INT&&(ue=s.R32I)),E===s.RG&&(J===s.FLOAT&&(ue=s.RG32F),J===s.HALF_FLOAT&&(ue=s.RG16F),J===s.UNSIGNED_BYTE&&(ue=s.RG8),J===s.UNSIGNED_SHORT&&we&&(ue=we.RG16_EXT),J===s.SHORT&&we&&(ue=we.RG16_SNORM_EXT)),E===s.RG_INTEGER&&(J===s.UNSIGNED_BYTE&&(ue=s.RG8UI),J===s.UNSIGNED_SHORT&&(ue=s.RG16UI),J===s.UNSIGNED_INT&&(ue=s.RG32UI),J===s.BYTE&&(ue=s.RG8I),J===s.SHORT&&(ue=s.RG16I),J===s.INT&&(ue=s.RG32I)),E===s.RGB_INTEGER&&(J===s.UNSIGNED_BYTE&&(ue=s.RGB8UI),J===s.UNSIGNED_SHORT&&(ue=s.RGB16UI),J===s.UNSIGNED_INT&&(ue=s.RGB32UI),J===s.BYTE&&(ue=s.RGB8I),J===s.SHORT&&(ue=s.RGB16I),J===s.INT&&(ue=s.RGB32I)),E===s.RGBA_INTEGER&&(J===s.UNSIGNED_BYTE&&(ue=s.RGBA8UI),J===s.UNSIGNED_SHORT&&(ue=s.RGBA16UI),J===s.UNSIGNED_INT&&(ue=s.RGBA32UI),J===s.BYTE&&(ue=s.RGBA8I),J===s.SHORT&&(ue=s.RGBA16I),J===s.INT&&(ue=s.RGBA32I)),E===s.RGB&&(J===s.UNSIGNED_SHORT&&we&&(ue=we.RGB16_EXT),J===s.SHORT&&we&&(ue=we.RGB16_SNORM_EXT),J===s.UNSIGNED_INT_5_9_9_9_REV&&(ue=s.RGB9_E5),J===s.UNSIGNED_INT_10F_11F_11F_REV&&(ue=s.R11F_G11F_B10F)),E===s.RGBA){const de=be?Qc:yt.getTransfer(fe);J===s.FLOAT&&(ue=s.RGBA32F),J===s.HALF_FLOAT&&(ue=s.RGBA16F),J===s.UNSIGNED_BYTE&&(ue=de===Bt?s.SRGB8_ALPHA8:s.RGBA8),J===s.UNSIGNED_SHORT&&we&&(ue=we.RGBA16_EXT),J===s.SHORT&&we&&(ue=we.RGBA16_SNORM_EXT),J===s.UNSIGNED_SHORT_4_4_4_4&&(ue=s.RGBA4),J===s.UNSIGNED_SHORT_5_5_5_1&&(ue=s.RGB5_A1)}return(ue===s.R16F||ue===s.R32F||ue===s.RG16F||ue===s.RG32F||ue===s.RGBA16F||ue===s.RGBA32F)&&e.get("EXT_color_buffer_float"),ue}function z(O,E){let J;return O?E===null||E===Qi||E===$o?J=s.DEPTH24_STENCIL8:E===Wi?J=s.DEPTH32F_STENCIL8:E===jo&&(J=s.DEPTH24_STENCIL8,tt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Qi||E===$o?J=s.DEPTH_COMPONENT24:E===Wi?J=s.DEPTH_COMPONENT32F:E===jo&&(J=s.DEPTH_COMPONENT16),J}function N(O,E){return S(O)===!0||O.isFramebufferTexture&&O.minFilter!==Ln&&O.minFilter!==Fn?Math.log2(Math.max(E.width,E.height))+1:O.mipmaps!==void 0&&O.mipmaps.length>0?O.mipmaps.length:O.isCompressedTexture&&Array.isArray(O.image)?E.mipmaps.length:1}function L(O){const E=O.target;E.removeEventListener("dispose",L),U(E),E.isVideoTexture&&_.delete(E),E.isHTMLTexture&&v.delete(E)}function T(O){const E=O.target;E.removeEventListener("dispose",T),F(E)}function U(O){const E=r.get(O);if(E.__webglInit===void 0)return;const J=O.source,re=y.get(J);if(re){const fe=re[E.__cacheKey];fe.usedTimes--,fe.usedTimes===0&&k(O),Object.keys(re).length===0&&y.delete(J)}r.remove(O)}function k(O){const E=r.get(O);s.deleteTexture(E.__webglTexture);const J=O.source,re=y.get(J);delete re[E.__cacheKey],d.memory.textures--}function F(O){const E=r.get(O);if(O.depthTexture&&(O.depthTexture.dispose(),r.remove(O.depthTexture)),O.isWebGLCubeRenderTarget)for(let re=0;re<6;re++){if(Array.isArray(E.__webglFramebuffer[re]))for(let fe=0;fe<E.__webglFramebuffer[re].length;fe++)s.deleteFramebuffer(E.__webglFramebuffer[re][fe]);else s.deleteFramebuffer(E.__webglFramebuffer[re]);E.__webglDepthbuffer&&s.deleteRenderbuffer(E.__webglDepthbuffer[re])}else{if(Array.isArray(E.__webglFramebuffer))for(let re=0;re<E.__webglFramebuffer.length;re++)s.deleteFramebuffer(E.__webglFramebuffer[re]);else s.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&s.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&s.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let re=0;re<E.__webglColorRenderbuffer.length;re++)E.__webglColorRenderbuffer[re]&&s.deleteRenderbuffer(E.__webglColorRenderbuffer[re]);E.__webglDepthRenderbuffer&&s.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const J=O.textures;for(let re=0,fe=J.length;re<fe;re++){const be=r.get(J[re]);be.__webglTexture&&(s.deleteTexture(be.__webglTexture),d.memory.textures--),r.remove(J[re])}r.remove(O)}let W=0;function ce(){W=0}function me(){return W}function j(O){W=O}function B(){const O=W;return O>=l.maxTextures&&tt("WebGLTextures: Trying to use "+O+" texture units while this GPU supports only "+l.maxTextures),W+=1,O}function G(O){const E=[];return E.push(O.wrapS),E.push(O.wrapT),E.push(O.wrapR||0),E.push(O.magFilter),E.push(O.minFilter),E.push(O.anisotropy),E.push(O.internalFormat),E.push(O.format),E.push(O.type),E.push(O.generateMipmaps),E.push(O.premultiplyAlpha),E.push(O.flipY),E.push(O.unpackAlignment),E.push(O.colorSpace),E.join()}function te(O,E){const J=r.get(O);if(O.isVideoTexture&&Y(O),O.isRenderTargetTexture===!1&&O.isExternalTexture!==!0&&O.version>0&&J.__version!==O.version){const re=O.image;if(re===null)tt("WebGLRenderer: Texture marked for update but no image data found.");else if(re.complete===!1)tt("WebGLRenderer: Texture marked for update but image is incomplete");else{Fe(J,O,E);return}}else O.isExternalTexture&&(J.__webglTexture=O.sourceTexture?O.sourceTexture:null);i.bindTexture(s.TEXTURE_2D,J.__webglTexture,s.TEXTURE0+E)}function ge(O,E){const J=r.get(O);if(O.isRenderTargetTexture===!1&&O.version>0&&J.__version!==O.version){Fe(J,O,E);return}else O.isExternalTexture&&(J.__webglTexture=O.sourceTexture?O.sourceTexture:null);i.bindTexture(s.TEXTURE_2D_ARRAY,J.__webglTexture,s.TEXTURE0+E)}function Ee(O,E){const J=r.get(O);if(O.isRenderTargetTexture===!1&&O.version>0&&J.__version!==O.version){Fe(J,O,E);return}i.bindTexture(s.TEXTURE_3D,J.__webglTexture,s.TEXTURE0+E)}function I(O,E){const J=r.get(O);if(O.isCubeDepthTexture!==!0&&O.version>0&&J.__version!==O.version){it(J,O,E);return}i.bindTexture(s.TEXTURE_CUBE_MAP,J.__webglTexture,s.TEXTURE0+E)}const Q={[lh]:s.REPEAT,[ya]:s.CLAMP_TO_EDGE,[ch]:s.MIRRORED_REPEAT},ye={[Ln]:s.NEAREST,[VM]:s.NEAREST_MIPMAP_NEAREST,[pc]:s.NEAREST_MIPMAP_LINEAR,[Fn]:s.LINEAR,[Md]:s.LINEAR_MIPMAP_NEAREST,[Ir]:s.LINEAR_MIPMAP_LINEAR},Re={[WM]:s.NEVER,[QM]:s.ALWAYS,[qM]:s.LESS,[jh]:s.LEQUAL,[YM]:s.EQUAL,[$h]:s.GEQUAL,[ZM]:s.GREATER,[KM]:s.NOTEQUAL};function Pe(O,E){if(E.type===Wi&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===Fn||E.magFilter===Md||E.magFilter===pc||E.magFilter===Ir||E.minFilter===Fn||E.minFilter===Md||E.minFilter===pc||E.minFilter===Ir)&&tt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(O,s.TEXTURE_WRAP_S,Q[E.wrapS]),s.texParameteri(O,s.TEXTURE_WRAP_T,Q[E.wrapT]),(O===s.TEXTURE_3D||O===s.TEXTURE_2D_ARRAY)&&s.texParameteri(O,s.TEXTURE_WRAP_R,Q[E.wrapR]),s.texParameteri(O,s.TEXTURE_MAG_FILTER,ye[E.magFilter]),s.texParameteri(O,s.TEXTURE_MIN_FILTER,ye[E.minFilter]),E.compareFunction&&(s.texParameteri(O,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(O,s.TEXTURE_COMPARE_FUNC,Re[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Ln||E.minFilter!==pc&&E.minFilter!==Ir||E.type===Wi&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||r.get(E).__currentAnisotropy){const J=e.get("EXT_texture_filter_anisotropic");s.texParameterf(O,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,l.getMaxAnisotropy())),r.get(E).__currentAnisotropy=E.anisotropy}}}function ae(O,E){let J=!1;O.__webglInit===void 0&&(O.__webglInit=!0,E.addEventListener("dispose",L));const re=E.source;let fe=y.get(re);fe===void 0&&(fe={},y.set(re,fe));const be=G(E);if(be!==O.__cacheKey){fe[be]===void 0&&(fe[be]={texture:s.createTexture(),usedTimes:0},d.memory.textures++,J=!0),fe[be].usedTimes++;const we=fe[O.__cacheKey];we!==void 0&&(fe[O.__cacheKey].usedTimes--,we.usedTimes===0&&k(E)),O.__cacheKey=be,O.__webglTexture=fe[be].texture}return J}function xe(O,E,J){return Math.floor(Math.floor(O/J)/E)}function Me(O,E,J,re){const be=O.updateRanges;if(be.length===0)i.texSubImage2D(s.TEXTURE_2D,0,0,0,E.width,E.height,J,re,E.data);else{be.sort((ze,Ne)=>ze.start-Ne.start);let we=0;for(let ze=1;ze<be.length;ze++){const Ne=be[we],De=be[ze],Ze=Ne.start+Ne.count,Je=xe(De.start,E.width,4),at=xe(Ne.start,E.width,4);De.start<=Ze+1&&Je===at&&xe(De.start+De.count-1,E.width,4)===Je?Ne.count=Math.max(Ne.count,De.start+De.count-Ne.start):(++we,be[we]=De)}be.length=we+1;const ue=i.getParameter(s.UNPACK_ROW_LENGTH),de=i.getParameter(s.UNPACK_SKIP_PIXELS),Ae=i.getParameter(s.UNPACK_SKIP_ROWS);i.pixelStorei(s.UNPACK_ROW_LENGTH,E.width);for(let ze=0,Ne=be.length;ze<Ne;ze++){const De=be[ze],Ze=Math.floor(De.start/4),Je=Math.ceil(De.count/4),at=Ze%E.width,X=Math.floor(Ze/E.width),Te=Je,pe=1;i.pixelStorei(s.UNPACK_SKIP_PIXELS,at),i.pixelStorei(s.UNPACK_SKIP_ROWS,X),i.texSubImage2D(s.TEXTURE_2D,0,at,X,Te,pe,J,re,E.data)}O.clearUpdateRanges(),i.pixelStorei(s.UNPACK_ROW_LENGTH,ue),i.pixelStorei(s.UNPACK_SKIP_PIXELS,de),i.pixelStorei(s.UNPACK_SKIP_ROWS,Ae)}}function Fe(O,E,J){let re=s.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(re=s.TEXTURE_2D_ARRAY),E.isData3DTexture&&(re=s.TEXTURE_3D);const fe=ae(O,E),be=E.source;i.bindTexture(re,O.__webglTexture,s.TEXTURE0+J);const we=r.get(be);if(be.version!==we.__version||fe===!0){if(i.activeTexture(s.TEXTURE0+J),(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)===!1){const pe=yt.getPrimaries(yt.workingColorSpace),Ce=E.colorSpace===sr?null:yt.getPrimaries(E.colorSpace),Ie=E.colorSpace===sr||pe===Ce?s.NONE:s.BROWSER_DEFAULT_WEBGL;i.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ie)}i.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment);let de=M(E.image,!1,l.maxTextureSize);de=Ft(E,de);const Ae=c.convert(E.format,E.colorSpace),ze=c.convert(E.type);let Ne=C(E.internalFormat,Ae,ze,E.normalized,E.colorSpace,E.isVideoTexture);Pe(re,E);let De;const Ze=E.mipmaps,Je=E.isVideoTexture!==!0,at=we.__version===void 0||fe===!0,X=be.dataReady,Te=N(E,de);if(E.isDepthTexture)Ne=z(E.format===zr,E.type),at&&(Je?i.texStorage2D(s.TEXTURE_2D,1,Ne,de.width,de.height):i.texImage2D(s.TEXTURE_2D,0,Ne,de.width,de.height,0,Ae,ze,null));else if(E.isDataTexture)if(Ze.length>0){Je&&at&&i.texStorage2D(s.TEXTURE_2D,Te,Ne,Ze[0].width,Ze[0].height);for(let pe=0,Ce=Ze.length;pe<Ce;pe++)De=Ze[pe],Je?X&&i.texSubImage2D(s.TEXTURE_2D,pe,0,0,De.width,De.height,Ae,ze,De.data):i.texImage2D(s.TEXTURE_2D,pe,Ne,De.width,De.height,0,Ae,ze,De.data);E.generateMipmaps=!1}else Je?(at&&i.texStorage2D(s.TEXTURE_2D,Te,Ne,de.width,de.height),X&&Me(E,de,Ae,ze)):i.texImage2D(s.TEXTURE_2D,0,Ne,de.width,de.height,0,Ae,ze,de.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Je&&at&&i.texStorage3D(s.TEXTURE_2D_ARRAY,Te,Ne,Ze[0].width,Ze[0].height,de.depth);for(let pe=0,Ce=Ze.length;pe<Ce;pe++)if(De=Ze[pe],E.format!==Pi)if(Ae!==null)if(Je){if(X)if(E.layerUpdates.size>0){const Ie=L_(De.width,De.height,E.format,E.type);for(const Se of E.layerUpdates){const We=De.data.subarray(Se*Ie/De.data.BYTES_PER_ELEMENT,(Se+1)*Ie/De.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,pe,0,0,Se,De.width,De.height,1,Ae,We)}E.clearLayerUpdates()}else i.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,pe,0,0,0,De.width,De.height,de.depth,Ae,De.data)}else i.compressedTexImage3D(s.TEXTURE_2D_ARRAY,pe,Ne,De.width,De.height,de.depth,0,De.data,0,0);else tt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Je?X&&i.texSubImage3D(s.TEXTURE_2D_ARRAY,pe,0,0,0,De.width,De.height,de.depth,Ae,ze,De.data):i.texImage3D(s.TEXTURE_2D_ARRAY,pe,Ne,De.width,De.height,de.depth,0,Ae,ze,De.data)}else{Je&&at&&i.texStorage2D(s.TEXTURE_2D,Te,Ne,Ze[0].width,Ze[0].height);for(let pe=0,Ce=Ze.length;pe<Ce;pe++)De=Ze[pe],E.format!==Pi?Ae!==null?Je?X&&i.compressedTexSubImage2D(s.TEXTURE_2D,pe,0,0,De.width,De.height,Ae,De.data):i.compressedTexImage2D(s.TEXTURE_2D,pe,Ne,De.width,De.height,0,De.data):tt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Je?X&&i.texSubImage2D(s.TEXTURE_2D,pe,0,0,De.width,De.height,Ae,ze,De.data):i.texImage2D(s.TEXTURE_2D,pe,Ne,De.width,De.height,0,Ae,ze,De.data)}else if(E.isDataArrayTexture)if(Je){if(at&&i.texStorage3D(s.TEXTURE_2D_ARRAY,Te,Ne,de.width,de.height,de.depth),X)if(E.layerUpdates.size>0){const pe=L_(de.width,de.height,E.format,E.type);for(const Ce of E.layerUpdates){const Ie=de.data.subarray(Ce*pe/de.data.BYTES_PER_ELEMENT,(Ce+1)*pe/de.data.BYTES_PER_ELEMENT);i.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,Ce,de.width,de.height,1,Ae,ze,Ie)}E.clearLayerUpdates()}else i.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,de.width,de.height,de.depth,Ae,ze,de.data)}else i.texImage3D(s.TEXTURE_2D_ARRAY,0,Ne,de.width,de.height,de.depth,0,Ae,ze,de.data);else if(E.isData3DTexture)Je?(at&&i.texStorage3D(s.TEXTURE_3D,Te,Ne,de.width,de.height,de.depth),X&&i.texSubImage3D(s.TEXTURE_3D,0,0,0,0,de.width,de.height,de.depth,Ae,ze,de.data)):i.texImage3D(s.TEXTURE_3D,0,Ne,de.width,de.height,de.depth,0,Ae,ze,de.data);else if(E.isFramebufferTexture){if(at)if(Je)i.texStorage2D(s.TEXTURE_2D,Te,Ne,de.width,de.height);else{let pe=de.width,Ce=de.height;for(let Ie=0;Ie<Te;Ie++)i.texImage2D(s.TEXTURE_2D,Ie,Ne,pe,Ce,0,Ae,ze,null),pe>>=1,Ce>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in s){const pe=s.canvas;if(pe.hasAttribute("layoutsubtree")||pe.setAttribute("layoutsubtree","true"),de.parentNode!==pe){pe.appendChild(de),v.add(E),pe.onpaint=Ce=>{const Ie=Ce.changedElements;for(const Se of v)Ie.includes(Se.image)&&(Se.needsUpdate=!0)},pe.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,de);else{const Ie=s.RGBA,Se=s.RGBA,We=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,Ie,Se,We,de)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(Ze.length>0){if(Je&&at){const pe=wt(Ze[0]);i.texStorage2D(s.TEXTURE_2D,Te,Ne,pe.width,pe.height)}for(let pe=0,Ce=Ze.length;pe<Ce;pe++)De=Ze[pe],Je?X&&i.texSubImage2D(s.TEXTURE_2D,pe,0,0,Ae,ze,De):i.texImage2D(s.TEXTURE_2D,pe,Ne,Ae,ze,De);E.generateMipmaps=!1}else if(Je){if(at){const pe=wt(de);i.texStorage2D(s.TEXTURE_2D,Te,Ne,pe.width,pe.height)}X&&i.texSubImage2D(s.TEXTURE_2D,0,0,0,Ae,ze,de)}else i.texImage2D(s.TEXTURE_2D,0,Ne,Ae,ze,de);S(E)&&D(re),we.__version=be.version,E.onUpdate&&E.onUpdate(E)}O.__version=E.version}function it(O,E,J){if(E.image.length!==6)return;const re=ae(O,E),fe=E.source;i.bindTexture(s.TEXTURE_CUBE_MAP,O.__webglTexture,s.TEXTURE0+J);const be=r.get(fe);if(fe.version!==be.__version||re===!0){i.activeTexture(s.TEXTURE0+J);const we=yt.getPrimaries(yt.workingColorSpace),ue=E.colorSpace===sr?null:yt.getPrimaries(E.colorSpace),de=E.colorSpace===sr||we===ue?s.NONE:s.BROWSER_DEFAULT_WEBGL;i.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);const Ae=E.isCompressedTexture||E.image[0].isCompressedTexture,ze=E.image[0]&&E.image[0].isDataTexture,Ne=[];for(let Se=0;Se<6;Se++)!Ae&&!ze?Ne[Se]=M(E.image[Se],!0,l.maxCubemapSize):Ne[Se]=ze?E.image[Se].image:E.image[Se],Ne[Se]=Ft(E,Ne[Se]);const De=Ne[0],Ze=c.convert(E.format,E.colorSpace),Je=c.convert(E.type),at=C(E.internalFormat,Ze,Je,E.normalized,E.colorSpace),X=E.isVideoTexture!==!0,Te=be.__version===void 0||re===!0,pe=fe.dataReady;let Ce=N(E,De);Pe(s.TEXTURE_CUBE_MAP,E);let Ie;if(Ae){X&&Te&&i.texStorage2D(s.TEXTURE_CUBE_MAP,Ce,at,De.width,De.height);for(let Se=0;Se<6;Se++){Ie=Ne[Se].mipmaps;for(let We=0;We<Ie.length;We++){const Ge=Ie[We];E.format!==Pi?Ze!==null?X?pe&&i.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Se,We,0,0,Ge.width,Ge.height,Ze,Ge.data):i.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Se,We,at,Ge.width,Ge.height,0,Ge.data):tt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):X?pe&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Se,We,0,0,Ge.width,Ge.height,Ze,Je,Ge.data):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Se,We,at,Ge.width,Ge.height,0,Ze,Je,Ge.data)}}}else{if(Ie=E.mipmaps,X&&Te){Ie.length>0&&Ce++;const Se=wt(Ne[0]);i.texStorage2D(s.TEXTURE_CUBE_MAP,Ce,at,Se.width,Se.height)}for(let Se=0;Se<6;Se++)if(ze){X?pe&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,0,0,Ne[Se].width,Ne[Se].height,Ze,Je,Ne[Se].data):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,at,Ne[Se].width,Ne[Se].height,0,Ze,Je,Ne[Se].data);for(let We=0;We<Ie.length;We++){const Jt=Ie[We].image[Se].image;X?pe&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Se,We+1,0,0,Jt.width,Jt.height,Ze,Je,Jt.data):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Se,We+1,at,Jt.width,Jt.height,0,Ze,Je,Jt.data)}}else{X?pe&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,0,0,Ze,Je,Ne[Se]):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,at,Ze,Je,Ne[Se]);for(let We=0;We<Ie.length;We++){const Ge=Ie[We];X?pe&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Se,We+1,0,0,Ze,Je,Ge.image[Se]):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Se,We+1,at,Ze,Je,Ge.image[Se])}}}S(E)&&D(s.TEXTURE_CUBE_MAP),be.__version=fe.version,E.onUpdate&&E.onUpdate(E)}O.__version=E.version}function Qe(O,E,J,re,fe,be){const we=c.convert(J.format,J.colorSpace),ue=c.convert(J.type),de=C(J.internalFormat,we,ue,J.normalized,J.colorSpace),Ae=r.get(E),ze=r.get(J);if(ze.__renderTarget=E,!Ae.__hasExternalTextures){const Ne=Math.max(1,E.width>>be),De=Math.max(1,E.height>>be);fe===s.TEXTURE_3D||fe===s.TEXTURE_2D_ARRAY?i.texImage3D(fe,be,de,Ne,De,E.depth,0,we,ue,null):i.texImage2D(fe,be,de,Ne,De,0,we,ue,null)}i.bindFramebuffer(s.FRAMEBUFFER,O),rn(E)?p.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,re,fe,ze.__webglTexture,0,Wt(E)):(fe===s.TEXTURE_2D||fe>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&fe<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,re,fe,ze.__webglTexture,be),i.bindFramebuffer(s.FRAMEBUFFER,null)}function Yt(O,E,J){if(s.bindRenderbuffer(s.RENDERBUFFER,O),E.depthBuffer){const re=E.depthTexture,fe=re&&re.isDepthTexture?re.type:null,be=z(E.stencilBuffer,fe),we=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;rn(E)?p.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Wt(E),be,E.width,E.height):J?s.renderbufferStorageMultisample(s.RENDERBUFFER,Wt(E),be,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,be,E.width,E.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,we,s.RENDERBUFFER,O)}else{const re=E.textures;for(let fe=0;fe<re.length;fe++){const be=re[fe],we=c.convert(be.format,be.colorSpace),ue=c.convert(be.type),de=C(be.internalFormat,we,ue,be.normalized,be.colorSpace);rn(E)?p.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Wt(E),de,E.width,E.height):J?s.renderbufferStorageMultisample(s.RENDERBUFFER,Wt(E),de,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,de,E.width,E.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function ft(O,E,J){const re=E.isWebGLCubeRenderTarget===!0;if(i.bindFramebuffer(s.FRAMEBUFFER,O),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const fe=r.get(E.depthTexture);if(fe.__renderTarget=E,(!fe.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),re){if(fe.__webglInit===void 0&&(fe.__webglInit=!0,E.depthTexture.addEventListener("dispose",L)),fe.__webglTexture===void 0){fe.__webglTexture=s.createTexture(),i.bindTexture(s.TEXTURE_CUBE_MAP,fe.__webglTexture),Pe(s.TEXTURE_CUBE_MAP,E.depthTexture);const Ae=c.convert(E.depthTexture.format),ze=c.convert(E.depthTexture.type);let Ne;E.depthTexture.format===Aa?Ne=s.DEPTH_COMPONENT24:E.depthTexture.format===zr&&(Ne=s.DEPTH24_STENCIL8);for(let De=0;De<6;De++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+De,0,Ne,E.width,E.height,0,Ae,ze,null)}}else te(E.depthTexture,0);const be=fe.__webglTexture,we=Wt(E),ue=re?s.TEXTURE_CUBE_MAP_POSITIVE_X+J:s.TEXTURE_2D,de=E.depthTexture.format===zr?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(E.depthTexture.format===Aa)rn(E)?p.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,de,ue,be,0,we):s.framebufferTexture2D(s.FRAMEBUFFER,de,ue,be,0);else if(E.depthTexture.format===zr)rn(E)?p.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,de,ue,be,0,we):s.framebufferTexture2D(s.FRAMEBUFFER,de,ue,be,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function xt(O){const E=r.get(O),J=O.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==O.depthTexture){const re=O.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),re){const fe=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,re.removeEventListener("dispose",fe)};re.addEventListener("dispose",fe),E.__depthDisposeCallback=fe}E.__boundDepthTexture=re}if(O.depthTexture&&!E.__autoAllocateDepthBuffer)if(J)for(let re=0;re<6;re++)ft(E.__webglFramebuffer[re],O,re);else{const re=O.texture.mipmaps;re&&re.length>0?ft(E.__webglFramebuffer[0],O,0):ft(E.__webglFramebuffer,O,0)}else if(J){E.__webglDepthbuffer=[];for(let re=0;re<6;re++)if(i.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer[re]),E.__webglDepthbuffer[re]===void 0)E.__webglDepthbuffer[re]=s.createRenderbuffer(),Yt(E.__webglDepthbuffer[re],O,!1);else{const fe=O.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,be=E.__webglDepthbuffer[re];s.bindRenderbuffer(s.RENDERBUFFER,be),s.framebufferRenderbuffer(s.FRAMEBUFFER,fe,s.RENDERBUFFER,be)}}else{const re=O.texture.mipmaps;if(re&&re.length>0?i.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer[0]):i.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=s.createRenderbuffer(),Yt(E.__webglDepthbuffer,O,!1);else{const fe=O.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,be=E.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,be),s.framebufferRenderbuffer(s.FRAMEBUFFER,fe,s.RENDERBUFFER,be)}}i.bindFramebuffer(s.FRAMEBUFFER,null)}function St(O,E,J){const re=r.get(O);E!==void 0&&Qe(re.__webglFramebuffer,O,O.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),J!==void 0&&xt(O)}function dt(O){const E=O.texture,J=r.get(O),re=r.get(E);O.addEventListener("dispose",T);const fe=O.textures,be=O.isWebGLCubeRenderTarget===!0,we=fe.length>1;if(we||(re.__webglTexture===void 0&&(re.__webglTexture=s.createTexture()),re.__version=E.version,d.memory.textures++),be){J.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(E.mipmaps&&E.mipmaps.length>0){J.__webglFramebuffer[ue]=[];for(let de=0;de<E.mipmaps.length;de++)J.__webglFramebuffer[ue][de]=s.createFramebuffer()}else J.__webglFramebuffer[ue]=s.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){J.__webglFramebuffer=[];for(let ue=0;ue<E.mipmaps.length;ue++)J.__webglFramebuffer[ue]=s.createFramebuffer()}else J.__webglFramebuffer=s.createFramebuffer();if(we)for(let ue=0,de=fe.length;ue<de;ue++){const Ae=r.get(fe[ue]);Ae.__webglTexture===void 0&&(Ae.__webglTexture=s.createTexture(),d.memory.textures++)}if(O.samples>0&&rn(O)===!1){J.__webglMultisampledFramebuffer=s.createFramebuffer(),J.__webglColorRenderbuffer=[],i.bindFramebuffer(s.FRAMEBUFFER,J.__webglMultisampledFramebuffer);for(let ue=0;ue<fe.length;ue++){const de=fe[ue];J.__webglColorRenderbuffer[ue]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,J.__webglColorRenderbuffer[ue]);const Ae=c.convert(de.format,de.colorSpace),ze=c.convert(de.type),Ne=C(de.internalFormat,Ae,ze,de.normalized,de.colorSpace,O.isXRRenderTarget===!0),De=Wt(O);s.renderbufferStorageMultisample(s.RENDERBUFFER,De,Ne,O.width,O.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ue,s.RENDERBUFFER,J.__webglColorRenderbuffer[ue])}s.bindRenderbuffer(s.RENDERBUFFER,null),O.depthBuffer&&(J.__webglDepthRenderbuffer=s.createRenderbuffer(),Yt(J.__webglDepthRenderbuffer,O,!0)),i.bindFramebuffer(s.FRAMEBUFFER,null)}}if(be){i.bindTexture(s.TEXTURE_CUBE_MAP,re.__webglTexture),Pe(s.TEXTURE_CUBE_MAP,E);for(let ue=0;ue<6;ue++)if(E.mipmaps&&E.mipmaps.length>0)for(let de=0;de<E.mipmaps.length;de++)Qe(J.__webglFramebuffer[ue][de],O,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ue,de);else Qe(J.__webglFramebuffer[ue],O,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);S(E)&&D(s.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(we){for(let ue=0,de=fe.length;ue<de;ue++){const Ae=fe[ue],ze=r.get(Ae);let Ne=s.TEXTURE_2D;(O.isWebGL3DRenderTarget||O.isWebGLArrayRenderTarget)&&(Ne=O.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),i.bindTexture(Ne,ze.__webglTexture),Pe(Ne,Ae),Qe(J.__webglFramebuffer,O,Ae,s.COLOR_ATTACHMENT0+ue,Ne,0),S(Ae)&&D(Ne)}i.unbindTexture()}else{let ue=s.TEXTURE_2D;if((O.isWebGL3DRenderTarget||O.isWebGLArrayRenderTarget)&&(ue=O.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),i.bindTexture(ue,re.__webglTexture),Pe(ue,E),E.mipmaps&&E.mipmaps.length>0)for(let de=0;de<E.mipmaps.length;de++)Qe(J.__webglFramebuffer[de],O,E,s.COLOR_ATTACHMENT0,ue,de);else Qe(J.__webglFramebuffer,O,E,s.COLOR_ATTACHMENT0,ue,0);S(E)&&D(ue),i.unbindTexture()}O.depthBuffer&&xt(O)}function tn(O){const E=O.textures;for(let J=0,re=E.length;J<re;J++){const fe=E[J];if(S(fe)){const be=P(O),we=r.get(fe).__webglTexture;i.bindTexture(be,we),D(be),i.unbindTexture()}}}const nn=[],an=[];function cn(O){if(O.samples>0){if(rn(O)===!1){const E=O.textures,J=O.width,re=O.height;let fe=s.COLOR_BUFFER_BIT;const be=O.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,we=r.get(O),ue=E.length>1;if(ue)for(let Ae=0;Ae<E.length;Ae++)i.bindFramebuffer(s.FRAMEBUFFER,we.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ae,s.RENDERBUFFER,null),i.bindFramebuffer(s.FRAMEBUFFER,we.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ae,s.TEXTURE_2D,null,0);i.bindFramebuffer(s.READ_FRAMEBUFFER,we.__webglMultisampledFramebuffer);const de=O.texture.mipmaps;de&&de.length>0?i.bindFramebuffer(s.DRAW_FRAMEBUFFER,we.__webglFramebuffer[0]):i.bindFramebuffer(s.DRAW_FRAMEBUFFER,we.__webglFramebuffer);for(let Ae=0;Ae<E.length;Ae++){if(O.resolveDepthBuffer&&(O.depthBuffer&&(fe|=s.DEPTH_BUFFER_BIT),O.stencilBuffer&&O.resolveStencilBuffer&&(fe|=s.STENCIL_BUFFER_BIT)),ue){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,we.__webglColorRenderbuffer[Ae]);const ze=r.get(E[Ae]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,ze,0)}s.blitFramebuffer(0,0,J,re,0,0,J,re,fe,s.NEAREST),m===!0&&(nn.length=0,an.length=0,nn.push(s.COLOR_ATTACHMENT0+Ae),O.depthBuffer&&O.resolveDepthBuffer===!1&&(nn.push(be),an.push(be),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,an)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,nn))}if(i.bindFramebuffer(s.READ_FRAMEBUFFER,null),i.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ue)for(let Ae=0;Ae<E.length;Ae++){i.bindFramebuffer(s.FRAMEBUFFER,we.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ae,s.RENDERBUFFER,we.__webglColorRenderbuffer[Ae]);const ze=r.get(E[Ae]).__webglTexture;i.bindFramebuffer(s.FRAMEBUFFER,we.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ae,s.TEXTURE_2D,ze,0)}i.bindFramebuffer(s.DRAW_FRAMEBUFFER,we.__webglMultisampledFramebuffer)}else if(O.depthBuffer&&O.resolveDepthBuffer===!1&&m){const E=O.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[E])}}}function Wt(O){return Math.min(l.maxSamples,O.samples)}function rn(O){const E=r.get(O);return O.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Y(O){const E=d.render.frame;_.get(O)!==E&&(_.set(O,E),O.update())}function Ft(O,E){const J=O.colorSpace,re=O.format,fe=O.type;return O.isCompressedTexture===!0||O.isVideoTexture===!0||J!==Kc&&J!==sr&&(yt.getTransfer(J)===Bt?(re!==Pi||fe!==Ti)&&tt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):bt("WebGLTextures: Unsupported texture color space:",J)),E}function wt(O){return typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement?(h.width=O.naturalWidth||O.width,h.height=O.naturalHeight||O.height):typeof VideoFrame<"u"&&O instanceof VideoFrame?(h.width=O.displayWidth,h.height=O.displayHeight):(h.width=O.width,h.height=O.height),h}this.allocateTextureUnit=B,this.resetTextureUnits=ce,this.getTextureUnits=me,this.setTextureUnits=j,this.setTexture2D=te,this.setTexture2DArray=ge,this.setTexture3D=Ee,this.setTextureCube=I,this.rebindTextures=St,this.setupRenderTarget=dt,this.updateRenderTargetMipmap=tn,this.updateMultisampleRenderTarget=cn,this.setupDepthRenderbuffer=xt,this.setupFrameBufferTexture=Qe,this.useMultisampledRTT=rn,this.isReversedDepthBuffer=function(){return i.buffers.depth.getReversed()}}function zA(s,e){function i(r,l=sr){let c;const d=yt.getTransfer(l);if(r===Ti)return s.UNSIGNED_BYTE;if(r===Yh)return s.UNSIGNED_SHORT_4_4_4_4;if(r===Zh)return s.UNSIGNED_SHORT_5_5_5_1;if(r===Mv)return s.UNSIGNED_INT_5_9_9_9_REV;if(r===yv)return s.UNSIGNED_INT_10F_11F_11F_REV;if(r===xv)return s.BYTE;if(r===Sv)return s.SHORT;if(r===jo)return s.UNSIGNED_SHORT;if(r===qh)return s.INT;if(r===Qi)return s.UNSIGNED_INT;if(r===Wi)return s.FLOAT;if(r===Ta)return s.HALF_FLOAT;if(r===Ev)return s.ALPHA;if(r===bv)return s.RGB;if(r===Pi)return s.RGBA;if(r===Aa)return s.DEPTH_COMPONENT;if(r===zr)return s.DEPTH_STENCIL;if(r===Tv)return s.RED;if(r===Kh)return s.RED_INTEGER;if(r===Hr)return s.RG;if(r===Qh)return s.RG_INTEGER;if(r===Jh)return s.RGBA_INTEGER;if(r===Vc||r===kc||r===Xc||r===Wc)if(d===Bt)if(c=e.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(r===Vc)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===kc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Xc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Wc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=e.get("WEBGL_compressed_texture_s3tc"),c!==null){if(r===Vc)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===kc)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Xc)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Wc)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===uh||r===fh||r===dh||r===hh)if(c=e.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(r===uh)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===fh)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===dh)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===hh)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===ph||r===mh||r===gh||r===_h||r===vh||r===Yc||r===xh)if(c=e.get("WEBGL_compressed_texture_etc"),c!==null){if(r===ph||r===mh)return d===Bt?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(r===gh)return d===Bt?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC;if(r===_h)return c.COMPRESSED_R11_EAC;if(r===vh)return c.COMPRESSED_SIGNED_R11_EAC;if(r===Yc)return c.COMPRESSED_RG11_EAC;if(r===xh)return c.COMPRESSED_SIGNED_RG11_EAC}else return null;if(r===Sh||r===Mh||r===yh||r===Eh||r===bh||r===Th||r===Ah||r===Rh||r===Ch||r===wh||r===Dh||r===Uh||r===Nh||r===Lh)if(c=e.get("WEBGL_compressed_texture_astc"),c!==null){if(r===Sh)return d===Bt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Mh)return d===Bt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===yh)return d===Bt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Eh)return d===Bt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===bh)return d===Bt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Th)return d===Bt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Ah)return d===Bt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Rh)return d===Bt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Ch)return d===Bt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===wh)return d===Bt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Dh)return d===Bt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Uh)return d===Bt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Nh)return d===Bt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Lh)return d===Bt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Oh||r===Ph||r===Ih)if(c=e.get("EXT_texture_compression_bptc"),c!==null){if(r===Oh)return d===Bt?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Ph)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Ih)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===zh||r===Bh||r===Zc||r===Fh)if(c=e.get("EXT_texture_compression_rgtc"),c!==null){if(r===zh)return c.COMPRESSED_RED_RGTC1_EXT;if(r===Bh)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Zc)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Fh)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===$o?s.UNSIGNED_INT_24_8:s[r]!==void 0?s[r]:null}return{convert:i}}const BA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,FA=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class HA{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,i){if(this.texture===null){const r=new Iv(e.texture);(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const i=e.cameras[0].viewport,r=new Ji({vertexShader:BA,fragmentShader:FA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new qt(new ru(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class GA extends Vr{constructor(e,i){super();const r=this;let l=null,c=1,d=null,p="local-floor",m=1,h=null,_=null,v=null,g=null,y=null,b=null;const w=typeof XRWebGLBinding<"u",M=new HA,S={},D=i.getContextAttributes();let P=null,C=null;const z=[],N=[],L=new Et;let T=null;const U=new bi;U.viewport=new ln;const k=new bi;k.viewport=new ln;const F=[U,k],W=new Jy;let ce=null,me=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ae){let xe=z[ae];return xe===void 0&&(xe=new Rd,z[ae]=xe),xe.getTargetRaySpace()},this.getControllerGrip=function(ae){let xe=z[ae];return xe===void 0&&(xe=new Rd,z[ae]=xe),xe.getGripSpace()},this.getHand=function(ae){let xe=z[ae];return xe===void 0&&(xe=new Rd,z[ae]=xe),xe.getHandSpace()};function j(ae){const xe=N.indexOf(ae.inputSource);if(xe===-1)return;const Me=z[xe];Me!==void 0&&(Me.update(ae.inputSource,ae.frame,h||d),Me.dispatchEvent({type:ae.type,data:ae.inputSource}))}function B(){l.removeEventListener("select",j),l.removeEventListener("selectstart",j),l.removeEventListener("selectend",j),l.removeEventListener("squeeze",j),l.removeEventListener("squeezestart",j),l.removeEventListener("squeezeend",j),l.removeEventListener("end",B),l.removeEventListener("inputsourceschange",G);for(let ae=0;ae<z.length;ae++){const xe=N[ae];xe!==null&&(N[ae]=null,z[ae].disconnect(xe))}ce=null,me=null,M.reset();for(const ae in S)delete S[ae];e.setRenderTarget(P),y=null,g=null,v=null,l=null,C=null,Pe.stop(),r.isPresenting=!1,e.setPixelRatio(T),e.setSize(L.width,L.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ae){c=ae,r.isPresenting===!0&&tt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ae){p=ae,r.isPresenting===!0&&tt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||d},this.setReferenceSpace=function(ae){h=ae},this.getBaseLayer=function(){return g!==null?g:y},this.getBinding=function(){return v===null&&w&&(v=new XRWebGLBinding(l,i)),v},this.getFrame=function(){return b},this.getSession=function(){return l},this.setSession=async function(ae){if(l=ae,l!==null){if(P=e.getRenderTarget(),l.addEventListener("select",j),l.addEventListener("selectstart",j),l.addEventListener("selectend",j),l.addEventListener("squeeze",j),l.addEventListener("squeezestart",j),l.addEventListener("squeezeend",j),l.addEventListener("end",B),l.addEventListener("inputsourceschange",G),D.xrCompatible!==!0&&await i.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(L),w&&"createProjectionLayer"in XRWebGLBinding.prototype){let Me=null,Fe=null,it=null;D.depth&&(it=D.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,Me=D.stencil?zr:Aa,Fe=D.stencil?$o:Qi);const Qe={colorFormat:i.RGBA8,depthFormat:it,scaleFactor:c};v=this.getBinding(),g=v.createProjectionLayer(Qe),l.updateRenderState({layers:[g]}),e.setPixelRatio(1),e.setSize(g.textureWidth,g.textureHeight,!1),C=new Zi(g.textureWidth,g.textureHeight,{format:Pi,type:Ti,depthTexture:new ks(g.textureWidth,g.textureHeight,Fe,void 0,void 0,void 0,void 0,void 0,void 0,Me),stencilBuffer:D.stencil,colorSpace:e.outputColorSpace,samples:D.antialias?4:0,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}else{const Me={antialias:D.antialias,alpha:!0,depth:D.depth,stencil:D.stencil,framebufferScaleFactor:c};y=new XRWebGLLayer(l,i,Me),l.updateRenderState({baseLayer:y}),e.setPixelRatio(1),e.setSize(y.framebufferWidth,y.framebufferHeight,!1),C=new Zi(y.framebufferWidth,y.framebufferHeight,{format:Pi,type:Ti,colorSpace:e.outputColorSpace,stencilBuffer:D.stencil,resolveDepthBuffer:y.ignoreDepthValues===!1,resolveStencilBuffer:y.ignoreDepthValues===!1})}C.isXRRenderTarget=!0,this.setFoveation(m),h=null,d=await l.requestReferenceSpace(p),Pe.setContext(l),Pe.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return M.getDepthTexture()};function G(ae){for(let xe=0;xe<ae.removed.length;xe++){const Me=ae.removed[xe],Fe=N.indexOf(Me);Fe>=0&&(N[Fe]=null,z[Fe].disconnect(Me))}for(let xe=0;xe<ae.added.length;xe++){const Me=ae.added[xe];let Fe=N.indexOf(Me);if(Fe===-1){for(let Qe=0;Qe<z.length;Qe++)if(Qe>=N.length){N.push(Me),Fe=Qe;break}else if(N[Qe]===null){N[Qe]=Me,Fe=Qe;break}if(Fe===-1)break}const it=z[Fe];it&&it.connect(Me)}}const te=new K,ge=new K;function Ee(ae,xe,Me){te.setFromMatrixPosition(xe.matrixWorld),ge.setFromMatrixPosition(Me.matrixWorld);const Fe=te.distanceTo(ge),it=xe.projectionMatrix.elements,Qe=Me.projectionMatrix.elements,Yt=it[14]/(it[10]-1),ft=it[14]/(it[10]+1),xt=(it[9]+1)/it[5],St=(it[9]-1)/it[5],dt=(it[8]-1)/it[0],tn=(Qe[8]+1)/Qe[0],nn=Yt*dt,an=Yt*tn,cn=Fe/(-dt+tn),Wt=cn*-dt;if(xe.matrixWorld.decompose(ae.position,ae.quaternion,ae.scale),ae.translateX(Wt),ae.translateZ(cn),ae.matrixWorld.compose(ae.position,ae.quaternion,ae.scale),ae.matrixWorldInverse.copy(ae.matrixWorld).invert(),it[10]===-1)ae.projectionMatrix.copy(xe.projectionMatrix),ae.projectionMatrixInverse.copy(xe.projectionMatrixInverse);else{const rn=Yt+cn,Y=ft+cn,Ft=nn-Wt,wt=an+(Fe-Wt),O=xt*ft/Y*rn,E=St*ft/Y*rn;ae.projectionMatrix.makePerspective(Ft,wt,O,E,rn,Y),ae.projectionMatrixInverse.copy(ae.projectionMatrix).invert()}}function I(ae,xe){xe===null?ae.matrixWorld.copy(ae.matrix):ae.matrixWorld.multiplyMatrices(xe.matrixWorld,ae.matrix),ae.matrixWorldInverse.copy(ae.matrixWorld).invert()}this.updateCamera=function(ae){if(l===null)return;let xe=ae.near,Me=ae.far;M.texture!==null&&(M.depthNear>0&&(xe=M.depthNear),M.depthFar>0&&(Me=M.depthFar)),W.near=k.near=U.near=xe,W.far=k.far=U.far=Me,(ce!==W.near||me!==W.far)&&(l.updateRenderState({depthNear:W.near,depthFar:W.far}),ce=W.near,me=W.far),W.layers.mask=ae.layers.mask|6,U.layers.mask=W.layers.mask&-5,k.layers.mask=W.layers.mask&-3;const Fe=ae.parent,it=W.cameras;I(W,Fe);for(let Qe=0;Qe<it.length;Qe++)I(it[Qe],Fe);it.length===2?Ee(W,U,k):W.projectionMatrix.copy(U.projectionMatrix),Q(ae,W,Fe)};function Q(ae,xe,Me){Me===null?ae.matrix.copy(xe.matrixWorld):(ae.matrix.copy(Me.matrixWorld),ae.matrix.invert(),ae.matrix.multiply(xe.matrixWorld)),ae.matrix.decompose(ae.position,ae.quaternion,ae.scale),ae.updateMatrixWorld(!0),ae.projectionMatrix.copy(xe.projectionMatrix),ae.projectionMatrixInverse.copy(xe.projectionMatrixInverse),ae.isPerspectiveCamera&&(ae.fov=el*2*Math.atan(1/ae.projectionMatrix.elements[5]),ae.zoom=1)}this.getCamera=function(){return W},this.getFoveation=function(){if(!(g===null&&y===null))return m},this.setFoveation=function(ae){m=ae,g!==null&&(g.fixedFoveation=ae),y!==null&&y.fixedFoveation!==void 0&&(y.fixedFoveation=ae)},this.hasDepthSensing=function(){return M.texture!==null},this.getDepthSensingMesh=function(){return M.getMesh(W)},this.getCameraTexture=function(ae){return S[ae]};let ye=null;function Re(ae,xe){if(_=xe.getViewerPose(h||d),b=xe,_!==null){const Me=_.views;y!==null&&(e.setRenderTargetFramebuffer(C,y.framebuffer),e.setRenderTarget(C));let Fe=!1;Me.length!==W.cameras.length&&(W.cameras.length=0,Fe=!0);for(let ft=0;ft<Me.length;ft++){const xt=Me[ft];let St=null;if(y!==null)St=y.getViewport(xt);else{const tn=v.getViewSubImage(g,xt);St=tn.viewport,ft===0&&(e.setRenderTargetTextures(C,tn.colorTexture,tn.depthStencilTexture),e.setRenderTarget(C))}let dt=F[ft];dt===void 0&&(dt=new bi,dt.layers.enable(ft),dt.viewport=new ln,F[ft]=dt),dt.matrix.fromArray(xt.transform.matrix),dt.matrix.decompose(dt.position,dt.quaternion,dt.scale),dt.projectionMatrix.fromArray(xt.projectionMatrix),dt.projectionMatrixInverse.copy(dt.projectionMatrix).invert(),dt.viewport.set(St.x,St.y,St.width,St.height),ft===0&&(W.matrix.copy(dt.matrix),W.matrix.decompose(W.position,W.quaternion,W.scale)),Fe===!0&&W.cameras.push(dt)}const it=l.enabledFeatures;if(it&&it.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&w){v=r.getBinding();const ft=v.getDepthInformation(Me[0]);ft&&ft.isValid&&ft.texture&&M.init(ft,l.renderState)}if(it&&it.includes("camera-access")&&w){e.state.unbindTexture(),v=r.getBinding();for(let ft=0;ft<Me.length;ft++){const xt=Me[ft].camera;if(xt){let St=S[xt];St||(St=new Iv,S[xt]=St);const dt=v.getCameraImage(xt);St.sourceTexture=dt}}}}for(let Me=0;Me<z.length;Me++){const Fe=N[Me],it=z[Me];Fe!==null&&it!==void 0&&it.update(Fe,xe,h||d)}ye&&ye(ae,xe),xe.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:xe}),b=null}const Pe=new Gv;Pe.setAnimationLoop(Re),this.setAnimationLoop=function(ae){ye=ae},this.dispose=function(){}}}const VA=new dn,Zv=new st;Zv.set(-1,0,0,0,1,0,0,0,1);function kA(s,e){function i(M,S){M.matrixAutoUpdate===!0&&M.updateMatrix(),S.value.copy(M.matrix)}function r(M,S){S.color.getRGB(M.fogColor.value,Bv(s)),S.isFog?(M.fogNear.value=S.near,M.fogFar.value=S.far):S.isFogExp2&&(M.fogDensity.value=S.density)}function l(M,S,D,P,C){S.isNodeMaterial?S.uniformsNeedUpdate=!1:S.isMeshBasicMaterial?c(M,S):S.isMeshLambertMaterial?(c(M,S),S.envMap&&(M.envMapIntensity.value=S.envMapIntensity)):S.isMeshToonMaterial?(c(M,S),v(M,S)):S.isMeshPhongMaterial?(c(M,S),_(M,S),S.envMap&&(M.envMapIntensity.value=S.envMapIntensity)):S.isMeshStandardMaterial?(c(M,S),g(M,S),S.isMeshPhysicalMaterial&&y(M,S,C)):S.isMeshMatcapMaterial?(c(M,S),b(M,S)):S.isMeshDepthMaterial?c(M,S):S.isMeshDistanceMaterial?(c(M,S),w(M,S)):S.isMeshNormalMaterial?c(M,S):S.isLineBasicMaterial?(d(M,S),S.isLineDashedMaterial&&p(M,S)):S.isPointsMaterial?m(M,S,D,P):S.isSpriteMaterial?h(M,S):S.isShadowMaterial?(M.color.value.copy(S.color),M.opacity.value=S.opacity):S.isShaderMaterial&&(S.uniformsNeedUpdate=!1)}function c(M,S){M.opacity.value=S.opacity,S.color&&M.diffuse.value.copy(S.color),S.emissive&&M.emissive.value.copy(S.emissive).multiplyScalar(S.emissiveIntensity),S.map&&(M.map.value=S.map,i(S.map,M.mapTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,i(S.alphaMap,M.alphaMapTransform)),S.bumpMap&&(M.bumpMap.value=S.bumpMap,i(S.bumpMap,M.bumpMapTransform),M.bumpScale.value=S.bumpScale,S.side===jn&&(M.bumpScale.value*=-1)),S.normalMap&&(M.normalMap.value=S.normalMap,i(S.normalMap,M.normalMapTransform),M.normalScale.value.copy(S.normalScale),S.side===jn&&M.normalScale.value.negate()),S.displacementMap&&(M.displacementMap.value=S.displacementMap,i(S.displacementMap,M.displacementMapTransform),M.displacementScale.value=S.displacementScale,M.displacementBias.value=S.displacementBias),S.emissiveMap&&(M.emissiveMap.value=S.emissiveMap,i(S.emissiveMap,M.emissiveMapTransform)),S.specularMap&&(M.specularMap.value=S.specularMap,i(S.specularMap,M.specularMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest);const D=e.get(S),P=D.envMap,C=D.envMapRotation;P&&(M.envMap.value=P,M.envMapRotation.value.setFromMatrix4(VA.makeRotationFromEuler(C)).transpose(),P.isCubeTexture&&P.isRenderTargetTexture===!1&&M.envMapRotation.value.premultiply(Zv),M.reflectivity.value=S.reflectivity,M.ior.value=S.ior,M.refractionRatio.value=S.refractionRatio),S.lightMap&&(M.lightMap.value=S.lightMap,M.lightMapIntensity.value=S.lightMapIntensity,i(S.lightMap,M.lightMapTransform)),S.aoMap&&(M.aoMap.value=S.aoMap,M.aoMapIntensity.value=S.aoMapIntensity,i(S.aoMap,M.aoMapTransform))}function d(M,S){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,S.map&&(M.map.value=S.map,i(S.map,M.mapTransform))}function p(M,S){M.dashSize.value=S.dashSize,M.totalSize.value=S.dashSize+S.gapSize,M.scale.value=S.scale}function m(M,S,D,P){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,M.size.value=S.size*D,M.scale.value=P*.5,S.map&&(M.map.value=S.map,i(S.map,M.uvTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,i(S.alphaMap,M.alphaMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest)}function h(M,S){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,M.rotation.value=S.rotation,S.map&&(M.map.value=S.map,i(S.map,M.mapTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,i(S.alphaMap,M.alphaMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest)}function _(M,S){M.specular.value.copy(S.specular),M.shininess.value=Math.max(S.shininess,1e-4)}function v(M,S){S.gradientMap&&(M.gradientMap.value=S.gradientMap)}function g(M,S){M.metalness.value=S.metalness,S.metalnessMap&&(M.metalnessMap.value=S.metalnessMap,i(S.metalnessMap,M.metalnessMapTransform)),M.roughness.value=S.roughness,S.roughnessMap&&(M.roughnessMap.value=S.roughnessMap,i(S.roughnessMap,M.roughnessMapTransform)),S.envMap&&(M.envMapIntensity.value=S.envMapIntensity)}function y(M,S,D){M.ior.value=S.ior,S.sheen>0&&(M.sheenColor.value.copy(S.sheenColor).multiplyScalar(S.sheen),M.sheenRoughness.value=S.sheenRoughness,S.sheenColorMap&&(M.sheenColorMap.value=S.sheenColorMap,i(S.sheenColorMap,M.sheenColorMapTransform)),S.sheenRoughnessMap&&(M.sheenRoughnessMap.value=S.sheenRoughnessMap,i(S.sheenRoughnessMap,M.sheenRoughnessMapTransform))),S.clearcoat>0&&(M.clearcoat.value=S.clearcoat,M.clearcoatRoughness.value=S.clearcoatRoughness,S.clearcoatMap&&(M.clearcoatMap.value=S.clearcoatMap,i(S.clearcoatMap,M.clearcoatMapTransform)),S.clearcoatRoughnessMap&&(M.clearcoatRoughnessMap.value=S.clearcoatRoughnessMap,i(S.clearcoatRoughnessMap,M.clearcoatRoughnessMapTransform)),S.clearcoatNormalMap&&(M.clearcoatNormalMap.value=S.clearcoatNormalMap,i(S.clearcoatNormalMap,M.clearcoatNormalMapTransform),M.clearcoatNormalScale.value.copy(S.clearcoatNormalScale),S.side===jn&&M.clearcoatNormalScale.value.negate())),S.dispersion>0&&(M.dispersion.value=S.dispersion),S.iridescence>0&&(M.iridescence.value=S.iridescence,M.iridescenceIOR.value=S.iridescenceIOR,M.iridescenceThicknessMinimum.value=S.iridescenceThicknessRange[0],M.iridescenceThicknessMaximum.value=S.iridescenceThicknessRange[1],S.iridescenceMap&&(M.iridescenceMap.value=S.iridescenceMap,i(S.iridescenceMap,M.iridescenceMapTransform)),S.iridescenceThicknessMap&&(M.iridescenceThicknessMap.value=S.iridescenceThicknessMap,i(S.iridescenceThicknessMap,M.iridescenceThicknessMapTransform))),S.transmission>0&&(M.transmission.value=S.transmission,M.transmissionSamplerMap.value=D.texture,M.transmissionSamplerSize.value.set(D.width,D.height),S.transmissionMap&&(M.transmissionMap.value=S.transmissionMap,i(S.transmissionMap,M.transmissionMapTransform)),M.thickness.value=S.thickness,S.thicknessMap&&(M.thicknessMap.value=S.thicknessMap,i(S.thicknessMap,M.thicknessMapTransform)),M.attenuationDistance.value=S.attenuationDistance,M.attenuationColor.value.copy(S.attenuationColor)),S.anisotropy>0&&(M.anisotropyVector.value.set(S.anisotropy*Math.cos(S.anisotropyRotation),S.anisotropy*Math.sin(S.anisotropyRotation)),S.anisotropyMap&&(M.anisotropyMap.value=S.anisotropyMap,i(S.anisotropyMap,M.anisotropyMapTransform))),M.specularIntensity.value=S.specularIntensity,M.specularColor.value.copy(S.specularColor),S.specularColorMap&&(M.specularColorMap.value=S.specularColorMap,i(S.specularColorMap,M.specularColorMapTransform)),S.specularIntensityMap&&(M.specularIntensityMap.value=S.specularIntensityMap,i(S.specularIntensityMap,M.specularIntensityMapTransform))}function b(M,S){S.matcap&&(M.matcap.value=S.matcap)}function w(M,S){const D=e.get(S).light;M.referencePosition.value.setFromMatrixPosition(D.matrixWorld),M.nearDistance.value=D.shadow.camera.near,M.farDistance.value=D.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:l}}function XA(s,e,i,r){let l={},c={},d=[];const p=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function m(C,z){const N=z.program;r.uniformBlockBinding(C,N)}function h(C,z){let N=l[C.id];N===void 0&&(M(C),N=_(C),l[C.id]=N,C.addEventListener("dispose",D));const L=z.program;r.updateUBOMapping(C,L);const T=e.render.frame;c[C.id]!==T&&(g(C),c[C.id]=T)}function _(C){const z=v();C.__bindingPointIndex=z;const N=s.createBuffer(),L=C.__size,T=C.usage;return s.bindBuffer(s.UNIFORM_BUFFER,N),s.bufferData(s.UNIFORM_BUFFER,L,T),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,z,N),N}function v(){for(let C=0;C<p;C++)if(d.indexOf(C)===-1)return d.push(C),C;return bt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(C){const z=l[C.id],N=C.uniforms,L=C.__cache;s.bindBuffer(s.UNIFORM_BUFFER,z);for(let T=0,U=N.length;T<U;T++){const k=N[T];if(Array.isArray(k))for(let F=0,W=k.length;F<W;F++)y(k[F],T,F,L);else y(k,T,0,L)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function y(C,z,N,L){if(w(C,z,N,L)===!0){const T=C.__offset,U=C.value;if(Array.isArray(U)){let k=0;for(let F=0;F<U.length;F++){const W=U[F],ce=S(W);b(W,C.__data,k),typeof W!="number"&&typeof W!="boolean"&&!W.isMatrix3&&!ArrayBuffer.isView(W)&&(k+=ce.storage/Float32Array.BYTES_PER_ELEMENT)}}else b(U,C.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,T,C.__data)}}function b(C,z,N){typeof C=="number"||typeof C=="boolean"?z[0]=C:C.isMatrix3?(z[0]=C.elements[0],z[1]=C.elements[1],z[2]=C.elements[2],z[3]=0,z[4]=C.elements[3],z[5]=C.elements[4],z[6]=C.elements[5],z[7]=0,z[8]=C.elements[6],z[9]=C.elements[7],z[10]=C.elements[8],z[11]=0):ArrayBuffer.isView(C)?z.set(new C.constructor(C.buffer,C.byteOffset,z.length)):C.toArray(z,N)}function w(C,z,N,L){const T=C.value,U=z+"_"+N;if(L[U]===void 0)return typeof T=="number"||typeof T=="boolean"?L[U]=T:ArrayBuffer.isView(T)?L[U]=T.slice():L[U]=T.clone(),!0;{const k=L[U];if(typeof T=="number"||typeof T=="boolean"){if(k!==T)return L[U]=T,!0}else{if(ArrayBuffer.isView(T))return!0;if(k.equals(T)===!1)return k.copy(T),!0}}return!1}function M(C){const z=C.uniforms;let N=0;const L=16;for(let U=0,k=z.length;U<k;U++){const F=Array.isArray(z[U])?z[U]:[z[U]];for(let W=0,ce=F.length;W<ce;W++){const me=F[W],j=Array.isArray(me.value)?me.value:[me.value];for(let B=0,G=j.length;B<G;B++){const te=j[B],ge=S(te),Ee=N%L,I=Ee%ge.boundary,Q=Ee+I;N+=I,Q!==0&&L-Q<ge.storage&&(N+=L-Q),me.__data=new Float32Array(ge.storage/Float32Array.BYTES_PER_ELEMENT),me.__offset=N,N+=ge.storage}}}const T=N%L;return T>0&&(N+=L-T),C.__size=N,C.__cache={},this}function S(C){const z={boundary:0,storage:0};return typeof C=="number"||typeof C=="boolean"?(z.boundary=4,z.storage=4):C.isVector2?(z.boundary=8,z.storage=8):C.isVector3||C.isColor?(z.boundary=16,z.storage=12):C.isVector4?(z.boundary=16,z.storage=16):C.isMatrix3?(z.boundary=48,z.storage=48):C.isMatrix4?(z.boundary=64,z.storage=64):C.isTexture?tt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(C)?(z.boundary=16,z.storage=C.byteLength):tt("WebGLRenderer: Unsupported uniform value type.",C),z}function D(C){const z=C.target;z.removeEventListener("dispose",D);const N=d.indexOf(z.__bindingPointIndex);d.splice(N,1),s.deleteBuffer(l[z.id]),delete l[z.id],delete c[z.id]}function P(){for(const C in l)s.deleteBuffer(l[C]);d=[],l={},c={}}return{bind:m,update:h,dispose:P}}const WA=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ki=null;function qA(){return ki===null&&(ki=new zy(WA,16,16,Hr,Ta),ki.name="DFG_LUT",ki.minFilter=Fn,ki.magFilter=Fn,ki.wrapS=ya,ki.wrapT=ya,ki.generateMipmaps=!1,ki.needsUpdate=!0),ki}class YA{constructor(e={}){const{canvas:i=jM(),context:r=null,depth:l=!0,stencil:c=!1,alpha:d=!1,antialias:p=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:h=!1,powerPreference:_="default",failIfMajorPerformanceCaveat:v=!1,reversedDepthBuffer:g=!1,outputBufferType:y=Ti}=e;this.isWebGLRenderer=!0;let b;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");b=r.getContextAttributes().alpha}else b=d;const w=y,M=new Set([Jh,Qh,Kh]),S=new Set([Ti,Qi,jo,$o,Yh,Zh]),D=new Uint32Array(4),P=new Int32Array(4),C=new K;let z=null,N=null;const L=[],T=[];let U=null;this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Yi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const k=this;let F=!1,W=null,ce=null,me=null,j=null;this._outputColorSpace=hi;let B=0,G=0,te=null,ge=-1,Ee=null;const I=new ln,Q=new ln;let ye=null;const Re=new Tt(0);let Pe=0,ae=i.width,xe=i.height,Me=1,Fe=null,it=null;const Qe=new ln(0,0,ae,xe),Yt=new ln(0,0,ae,xe);let ft=!1;const xt=new Lv;let St=!1,dt=!1;const tn=new dn,nn=new K,an=new ln,cn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Wt=!1;function rn(){return te===null?Me:1}let Y=r;function Ft(A,q){return i.getContext(A,q)}try{const A={alpha:!0,depth:l,stencil:c,antialias:p,premultipliedAlpha:m,preserveDrawingBuffer:h,powerPreference:_,failIfMajorPerformanceCaveat:v};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${Wh}`),i.addEventListener("webglcontextlost",Jt,!1),i.addEventListener("webglcontextrestored",Nt,!1),i.addEventListener("webglcontextcreationerror",ei,!1),Y===null){const q="webgl2";if(Y=Ft(q,A),Y===null)throw Ft(q)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(A){throw bt("WebGLRenderer: "+A.message),A}let wt,O,E,J,re,fe,be,we,ue,de,Ae,ze,Ne,De,Ze,Je,at,X,Te,pe,Ce,Ie,Se;function We(){wt=new qb(Y),wt.init(),Ce=new zA(Y,wt),O=new Bb(Y,wt,e,Ce),E=new PA(Y,wt),O.reversedDepthBuffer&&g&&E.buffers.depth.setReversed(!0),ce=Y.createFramebuffer(),me=Y.createFramebuffer(),j=Y.createFramebuffer(),J=new Kb(Y),re=new MA,fe=new IA(Y,wt,E,re,O,Ce,J),be=new Wb(k),we=new $y(Y),Ie=new Ib(Y,we),ue=new Yb(Y,we,J,Ie),de=new Jb(Y,ue,we,Ie,J),X=new Qb(Y,O,fe),Ze=new Fb(re),Ae=new SA(k,be,wt,O,Ie,Ze),ze=new kA(k,re),Ne=new EA,De=new wA(wt),at=new Pb(k,be,E,de,b,m),Je=new OA(k,de,O),Se=new XA(Y,J,O,E),Te=new zb(Y,wt,J),pe=new Zb(Y,wt,J),J.programs=Ae.programs,k.capabilities=O,k.extensions=wt,k.properties=re,k.renderLists=Ne,k.shadowMap=Je,k.state=E,k.info=J}We(),w!==Ti&&(U=new $b(w,i.width,i.height,p,l,c));const Ge=new GA(k,Y);this.xr=Ge,this.getContext=function(){return Y},this.getContextAttributes=function(){return Y.getContextAttributes()},this.forceContextLoss=function(){const A=wt.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=wt.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return Me},this.setPixelRatio=function(A){A!==void 0&&(Me=A,this.setSize(ae,xe,!1))},this.getSize=function(A){return A.set(ae,xe)},this.setSize=function(A,q,se=!0){if(Ge.isPresenting){tt("WebGLRenderer: Can't change size while VR device is presenting.");return}ae=A,xe=q,i.width=Math.floor(A*Me),i.height=Math.floor(q*Me),se===!0&&(i.style.width=A+"px",i.style.height=q+"px"),U!==null&&U.setSize(i.width,i.height),this.setViewport(0,0,A,q)},this.getDrawingBufferSize=function(A){return A.set(ae*Me,xe*Me).floor()},this.setDrawingBufferSize=function(A,q,se){ae=A,xe=q,Me=se,i.width=Math.floor(A*se),i.height=Math.floor(q*se),this.setViewport(0,0,A,q)},this.setEffects=function(A){if(w===Ti){bt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let q=0;q<A.length;q++)if(A[q].isOutputPass===!0){tt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}U.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(I)},this.getViewport=function(A){return A.copy(Qe)},this.setViewport=function(A,q,se,ne){A.isVector4?Qe.set(A.x,A.y,A.z,A.w):Qe.set(A,q,se,ne),E.viewport(I.copy(Qe).multiplyScalar(Me).round())},this.getScissor=function(A){return A.copy(Yt)},this.setScissor=function(A,q,se,ne){A.isVector4?Yt.set(A.x,A.y,A.z,A.w):Yt.set(A,q,se,ne),E.scissor(Q.copy(Yt).multiplyScalar(Me).round())},this.getScissorTest=function(){return ft},this.setScissorTest=function(A){E.setScissorTest(ft=A)},this.setOpaqueSort=function(A){Fe=A},this.setTransparentSort=function(A){it=A},this.getClearColor=function(A){return A.copy(at.getClearColor())},this.setClearColor=function(){at.setClearColor(...arguments)},this.getClearAlpha=function(){return at.getClearAlpha()},this.setClearAlpha=function(){at.setClearAlpha(...arguments)},this.clear=function(A=!0,q=!0,se=!0){let ne=0;if(A){let ie=!1;if(te!==null){const Le=te.texture.format;ie=M.has(Le)}if(ie){const Le=te.texture.type,He=S.has(Le),Ue=at.getClearColor(),ke=at.getClearAlpha(),Ve=Ue.r,je=Ue.g,ot=Ue.b;He?(D[0]=Ve,D[1]=je,D[2]=ot,D[3]=ke,Y.clearBufferuiv(Y.COLOR,0,D)):(P[0]=Ve,P[1]=je,P[2]=ot,P[3]=ke,Y.clearBufferiv(Y.COLOR,0,P))}else ne|=Y.COLOR_BUFFER_BIT}q&&(ne|=Y.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),se&&(ne|=Y.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ne!==0&&Y.clear(ne)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),W=A},this.dispose=function(){i.removeEventListener("webglcontextlost",Jt,!1),i.removeEventListener("webglcontextrestored",Nt,!1),i.removeEventListener("webglcontextcreationerror",ei,!1),at.dispose(),Ne.dispose(),De.dispose(),re.dispose(),be.dispose(),de.dispose(),Ie.dispose(),Se.dispose(),Ae.dispose(),Ge.dispose(),Ge.removeEventListener("sessionstart",pn),Ge.removeEventListener("sessionend",Cn),Wn.stop()};function Jt(A){A.preventDefault(),c_("WebGLRenderer: Context Lost."),F=!0}function Nt(){c_("WebGLRenderer: Context Restored."),F=!1;const A=J.autoReset,q=Je.enabled,se=Je.autoUpdate,ne=Je.needsUpdate,ie=Je.type;We(),J.autoReset=A,Je.enabled=q,Je.autoUpdate=se,Je.needsUpdate=ne,Je.type=ie}function ei(A){bt("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function ti(A){const q=A.target;q.removeEventListener("dispose",ti),Ks(q)}function Ks(A){Qs(A),re.remove(A)}function Qs(A){const q=re.get(A).programs;q!==void 0&&(q.forEach(function(se){Ae.releaseProgram(se)}),A.isShaderMaterial&&Ae.releaseShaderCache(A))}this.renderBufferDirect=function(A,q,se,ne,ie,Le){q===null&&(q=cn);const He=ie.isMesh&&ie.matrixWorld.determinantAffine()<0,Ue=wa(A,q,se,ne,ie);E.setMaterial(ne,He);let ke=se.index,Ve=1;if(ne.wireframe===!0){if(ke=ue.getWireframeAttribute(se),ke===void 0)return;Ve=2}const je=se.drawRange,ot=se.attributes.position;let Ye=je.start*Ve,At=(je.start+je.count)*Ve;Le!==null&&(Ye=Math.max(Ye,Le.start*Ve),At=Math.min(At,(Le.start+Le.count)*Ve)),ke!==null?(Ye=Math.max(Ye,0),At=Math.min(At,ke.count)):ot!=null&&(Ye=Math.max(Ye,0),At=Math.min(At,ot.count));const jt=At-Ye;if(jt<0||jt===1/0)return;Ie.setup(ie,ne,Ue,se,ke);let kt,Lt=Te;if(ke!==null&&(kt=we.get(ke),Lt=pe,Lt.setIndex(kt)),ie.isMesh)ne.wireframe===!0?(E.setLineWidth(ne.wireframeLinewidth*rn()),Lt.setMode(Y.LINES)):Lt.setMode(Y.TRIANGLES);else if(ie.isLine){let Ot=ne.linewidth;Ot===void 0&&(Ot=1),E.setLineWidth(Ot*rn()),ie.isLineSegments?Lt.setMode(Y.LINES):ie.isLineLoop?Lt.setMode(Y.LINE_LOOP):Lt.setMode(Y.LINE_STRIP)}else ie.isPoints?Lt.setMode(Y.POINTS):ie.isSprite&&Lt.setMode(Y.TRIANGLES);if(ie.isBatchedMesh)if(wt.get("WEBGL_multi_draw"))Lt.renderMultiDraw(ie._multiDrawStarts,ie._multiDrawCounts,ie._multiDrawCount);else{const Ot=ie._multiDrawStarts,Be=ie._multiDrawCounts,Pn=ie._multiDrawCount,ht=ke?we.get(ke).bytesPerElement:1,yn=re.get(ne).currentProgram.getUniforms();for(let ni=0;ni<Pn;ni++)yn.setValue(Y,"_gl_DrawID",ni),Lt.render(Ot[ni]/ht,Be[ni])}else if(ie.isInstancedMesh)Lt.renderInstances(Ye,jt,ie.count);else if(se.isInstancedBufferGeometry){const Ot=se._maxInstanceCount!==void 0?se._maxInstanceCount:1/0,Be=Math.min(se.instanceCount,Ot);Lt.renderInstances(Ye,jt,Be)}else Lt.render(Ye,jt)};function Js(A,q,se){A.transparent===!0&&A.side===pi&&A.forceSinglePass===!1?(A.side=jn,A.needsUpdate=!0,Ca(A,q,se),A.side=lr,A.needsUpdate=!0,Ca(A,q,se),A.side=pi):Ca(A,q,se)}this.compile=function(A,q,se=null){se===null&&(se=A),N=De.get(se),N.init(q),T.push(N),se.traverseVisible(function(ie){ie.isLight&&ie.layers.test(q.layers)&&(N.pushLight(ie),ie.castShadow&&N.pushShadow(ie))}),A!==se&&A.traverseVisible(function(ie){ie.isLight&&ie.layers.test(q.layers)&&(N.pushLight(ie),ie.castShadow&&N.pushShadow(ie))}),N.setupLights();const ne=new Set;return A.traverse(function(ie){if(!(ie.isMesh||ie.isPoints||ie.isLine||ie.isSprite))return;const Le=ie.material;if(Le)if(Array.isArray(Le))for(let He=0;He<Le.length;He++){const Ue=Le[He];Js(Ue,se,ie),ne.add(Ue)}else Js(Le,se,ie),ne.add(Le)}),N=T.pop(),ne},this.compileAsync=function(A,q,se=null){const ne=this.compile(A,q,se);return new Promise(ie=>{function Le(){if(ne.forEach(function(He){re.get(He).currentProgram.isReady()&&ne.delete(He)}),ne.size===0){ie(A);return}setTimeout(Le,10)}wt.get("KHR_parallel_shader_compile")!==null?Le():setTimeout(Le,10)})};let kr=null;function Ii(A){kr&&kr(A)}function pn(){Wn.stop()}function Cn(){Wn.start()}const Wn=new Gv;Wn.setAnimationLoop(Ii),typeof self<"u"&&Wn.setContext(self),this.setAnimationLoop=function(A){kr=A,Ge.setAnimationLoop(A),A===null?Wn.stop():Wn.start()},Ge.addEventListener("sessionstart",pn),Ge.addEventListener("sessionend",Cn),this.render=function(A,q){if(q!==void 0&&q.isCamera!==!0){bt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;W!==null&&W.renderStart(A,q);const se=Ge.enabled===!0&&Ge.isPresenting===!0,ne=U!==null&&(te===null||se)&&U.begin(k,te);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),q.parent===null&&q.matrixWorldAutoUpdate===!0&&q.updateMatrixWorld(),Ge.enabled===!0&&Ge.isPresenting===!0&&(U===null||U.isCompositing()===!1)&&(Ge.cameraAutoUpdate===!0&&Ge.updateCamera(q),q=Ge.getCamera()),A.isScene===!0&&A.onBeforeRender(k,A,q,te),N=De.get(A,T.length),N.init(q),N.state.textureUnits=fe.getTextureUnits(),T.push(N),tn.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),xt.setFromProjectionMatrix(tn,qi,q.reversedDepth),dt=this.localClippingEnabled,St=Ze.init(this.clippingPlanes,dt),z=Ne.get(A,L.length),z.init(),L.push(z),Ge.enabled===!0&&Ge.isPresenting===!0){const He=k.xr.getDepthSensingMesh();He!==null&&cr(He,q,-1/0,k.sortObjects)}cr(A,q,0,k.sortObjects),z.finish(),k.sortObjects===!0&&z.sort(Fe,it,q.reversedDepth),Wt=Ge.enabled===!1||Ge.isPresenting===!1||Ge.hasDepthSensing()===!1,Wt&&at.addToRenderList(z,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),St===!0&&Ze.beginShadows();const ie=N.state.shadowsArray;if(Je.render(ie,A,q),St===!0&&Ze.endShadows(),(ne&&U.hasRenderPass())===!1){const He=z.opaque,Ue=z.transmissive;if(N.setupLights(),q.isArrayCamera){const ke=q.cameras;if(Ue.length>0)for(let Ve=0,je=ke.length;Ve<je;Ve++){const ot=ke[Ve];al(He,Ue,A,ot)}Wt&&at.render(A);for(let Ve=0,je=ke.length;Ve<je;Ve++){const ot=ke[Ve];il(z,A,ot,ot.viewport)}}else Ue.length>0&&al(He,Ue,A,q),Wt&&at.render(A),il(z,A,q)}te!==null&&G===0&&(fe.updateMultisampleRenderTarget(te),fe.updateRenderTargetMipmap(te)),ne&&U.end(k),A.isScene===!0&&A.onAfterRender(k,A,q),Ie.resetDefaultState(),ge=-1,Ee=null,T.pop(),T.length>0?(N=T[T.length-1],fe.setTextureUnits(N.state.textureUnits),St===!0&&Ze.setGlobalState(k.clippingPlanes,N.state.camera)):N=null,L.pop(),L.length>0?z=L[L.length-1]:z=null,W!==null&&W.renderEnd()};function cr(A,q,se,ne){if(A.visible===!1)return;if(A.layers.test(q.layers)){if(A.isGroup)se=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(q);else if(A.isLightProbeGrid)N.pushLightProbeGrid(A);else if(A.isLight)N.pushLight(A),A.castShadow&&N.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||xt.intersectsSprite(A)){ne&&an.setFromMatrixPosition(A.matrixWorld).applyMatrix4(tn);const He=de.update(A),Ue=A.material;Ue.visible&&z.push(A,He,Ue,se,an.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||xt.intersectsObject(A))){const He=de.update(A),Ue=A.material;if(ne&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),an.copy(A.boundingSphere.center)):(He.boundingSphere===null&&He.computeBoundingSphere(),an.copy(He.boundingSphere.center)),an.applyMatrix4(A.matrixWorld).applyMatrix4(tn)),Array.isArray(Ue)){const ke=He.groups;for(let Ve=0,je=ke.length;Ve<je;Ve++){const ot=ke[Ve],Ye=Ue[ot.materialIndex];Ye&&Ye.visible&&z.push(A,He,Ye,se,an.z,ot)}}else Ue.visible&&z.push(A,He,Ue,se,an.z,null)}}const Le=A.children;for(let He=0,Ue=Le.length;He<Ue;He++)cr(Le[He],q,se,ne)}function il(A,q,se,ne){const{opaque:ie,transmissive:Le,transparent:He}=A;N.setupLightsView(se),St===!0&&Ze.setGlobalState(k.clippingPlanes,se),ne&&E.viewport(I.copy(ne)),ie.length>0&&ur(ie,q,se),Le.length>0&&ur(Le,q,se),He.length>0&&ur(He,q,se),E.buffers.depth.setTest(!0),E.buffers.depth.setMask(!0),E.buffers.color.setMask(!0),E.setPolygonOffset(!1)}function al(A,q,se,ne){if((se.isScene===!0?se.overrideMaterial:null)!==null)return;if(N.state.transmissionRenderTarget[ne.id]===void 0){const Ye=wt.has("EXT_color_buffer_half_float")||wt.has("EXT_color_buffer_float");N.state.transmissionRenderTarget[ne.id]=new Zi(1,1,{generateMipmaps:!0,type:Ye?Ta:Ti,minFilter:Ir,samples:Math.max(4,O.samples),stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:yt.workingColorSpace})}const Le=N.state.transmissionRenderTarget[ne.id],He=ne.viewport||I;Le.setSize(He.z*k.transmissionResolutionScale,He.w*k.transmissionResolutionScale);const Ue=k.getRenderTarget(),ke=k.getActiveCubeFace(),Ve=k.getActiveMipmapLevel();k.setRenderTarget(Le),k.getClearColor(Re),Pe=k.getClearAlpha(),Pe<1&&k.setClearColor(16777215,.5),k.clear(),Wt&&at.render(se);const je=k.toneMapping;k.toneMapping=Yi;const ot=ne.viewport;if(ne.viewport!==void 0&&(ne.viewport=void 0),N.setupLightsView(ne),St===!0&&Ze.setGlobalState(k.clippingPlanes,ne),ur(A,se,ne),fe.updateMultisampleRenderTarget(Le),fe.updateRenderTargetMipmap(Le),wt.has("WEBGL_multisampled_render_to_texture")===!1){let Ye=!1;for(let At=0,jt=q.length;At<jt;At++){const kt=q[At],{object:Lt,geometry:Ot,material:Be,group:Pn}=kt;if(Be.side===pi&&Lt.layers.test(ne.layers)){const ht=Be.side;Be.side=jn,Be.needsUpdate=!0,Ra(Lt,se,ne,Ot,Be,Pn),Be.side=ht,Be.needsUpdate=!0,Ye=!0}}Ye===!0&&(fe.updateMultisampleRenderTarget(Le),fe.updateRenderTargetMipmap(Le))}k.setRenderTarget(Ue,ke,Ve),k.setClearColor(Re,Pe),ot!==void 0&&(ne.viewport=ot),k.toneMapping=je}function ur(A,q,se){const ne=q.isScene===!0?q.overrideMaterial:null;for(let ie=0,Le=A.length;ie<Le;ie++){const He=A[ie],{object:Ue,geometry:ke,group:Ve}=He;let je=He.material;je.allowOverride===!0&&ne!==null&&(je=ne),Ue.layers.test(se.layers)&&Ra(Ue,q,se,ke,je,Ve)}}function Ra(A,q,se,ne,ie,Le){A.onBeforeRender(k,q,se,ne,ie,Le),A.modelViewMatrix.multiplyMatrices(se.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),ie.onBeforeRender(k,q,se,ne,A,Le),ie.transparent===!0&&ie.side===pi&&ie.forceSinglePass===!1?(ie.side=jn,ie.needsUpdate=!0,k.renderBufferDirect(se,q,ne,ie,A,Le),ie.side=lr,ie.needsUpdate=!0,k.renderBufferDirect(se,q,ne,ie,A,Le),ie.side=pi):k.renderBufferDirect(se,q,ne,ie,A,Le),A.onAfterRender(k,q,se,ne,ie,Le)}function Ca(A,q,se){q.isScene!==!0&&(q=cn);const ne=re.get(A),ie=N.state.lights,Le=N.state.shadowsArray,He=ie.state.version,Ue=Ae.getParameters(A,ie.state,Le,q,se,N.state.lightProbeGridArray),ke=Ae.getProgramCacheKey(Ue);let Ve=ne.programs;ne.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?q.environment:null,ne.fog=q.fog;const je=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;ne.envMap=be.get(A.envMap||ne.environment,je),ne.envMapRotation=ne.environment!==null&&A.envMap===null?q.environmentRotation:A.envMapRotation,Ve===void 0&&(A.addEventListener("dispose",ti),Ve=new Map,ne.programs=Ve);let ot=Ve.get(ke);if(ot!==void 0){if(ne.currentProgram===ot&&ne.lightsStateVersion===He)return $i(A,Ue),ot}else Ue.uniforms=Ae.getUniforms(A),W!==null&&A.isNodeMaterial&&W.build(A,se,Ue),A.onBeforeCompile(Ue,k),ot=Ae.acquireProgram(Ue,ke),Ve.set(ke,ot),ne.uniforms=Ue.uniforms;const Ye=ne.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Ye.clippingPlanes=Ze.uniform),$i(A,Ue),ne.needsLights=rl(A),ne.lightsStateVersion=He,ne.needsLights&&(Ye.ambientLightColor.value=ie.state.ambient,Ye.lightProbe.value=ie.state.probe,Ye.directionalLights.value=ie.state.directional,Ye.directionalLightShadows.value=ie.state.directionalShadow,Ye.spotLights.value=ie.state.spot,Ye.spotLightShadows.value=ie.state.spotShadow,Ye.rectAreaLights.value=ie.state.rectArea,Ye.ltc_1.value=ie.state.rectAreaLTC1,Ye.ltc_2.value=ie.state.rectAreaLTC2,Ye.pointLights.value=ie.state.point,Ye.pointLightShadows.value=ie.state.pointShadow,Ye.hemisphereLights.value=ie.state.hemi,Ye.directionalShadowMatrix.value=ie.state.directionalShadowMatrix,Ye.spotLightMatrix.value=ie.state.spotLightMatrix,Ye.spotLightMap.value=ie.state.spotLightMap,Ye.pointShadowMatrix.value=ie.state.pointShadowMatrix),ne.lightProbeGrid=N.state.lightProbeGridArray.length>0,ne.currentProgram=ot,ne.uniformsList=null,ot}function ji(A){if(A.uniformsList===null){const q=A.currentProgram.getUniforms();A.uniformsList=qc.seqWithValue(q.seq,A.uniforms)}return A.uniformsList}function $i(A,q){const se=re.get(A);se.outputColorSpace=q.outputColorSpace,se.batching=q.batching,se.batchingColor=q.batchingColor,se.instancing=q.instancing,se.instancingColor=q.instancingColor,se.instancingMorph=q.instancingMorph,se.skinning=q.skinning,se.morphTargets=q.morphTargets,se.morphNormals=q.morphNormals,se.morphColors=q.morphColors,se.morphTargetsCount=q.morphTargetsCount,se.numClippingPlanes=q.numClippingPlanes,se.numIntersection=q.numClipIntersection,se.vertexAlphas=q.vertexAlphas,se.vertexTangents=q.vertexTangents,se.toneMapping=q.toneMapping}function fr(A,q){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;C.setFromMatrixPosition(q.matrixWorld);for(let se=0,ne=A.length;se<ne;se++){const ie=A[se];if(ie.texture!==null&&ie.boundingBox.containsPoint(C))return ie}return null}function wa(A,q,se,ne,ie){q.isScene!==!0&&(q=cn),fe.resetTextureUnits();const Le=q.fog,He=ne.isMeshStandardMaterial||ne.isMeshLambertMaterial||ne.isMeshPhongMaterial?q.environment:null,Ue=te===null?k.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:yt.workingColorSpace,ke=ne.isMeshStandardMaterial||ne.isMeshLambertMaterial&&!ne.envMap||ne.isMeshPhongMaterial&&!ne.envMap,Ve=be.get(ne.envMap||He,ke),je=ne.vertexColors===!0&&!!se.attributes.color&&se.attributes.color.itemSize===4,ot=!!se.attributes.tangent&&(!!ne.normalMap||ne.anisotropy>0),Ye=!!se.morphAttributes.position,At=!!se.morphAttributes.normal,jt=!!se.morphAttributes.color;let kt=Yi;ne.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(kt=k.toneMapping);const Lt=se.morphAttributes.position||se.morphAttributes.normal||se.morphAttributes.color,Ot=Lt!==void 0?Lt.length:0,Be=re.get(ne),Pn=N.state.lights;if(St===!0&&(dt===!0||A!==Ee)){const Ut=A===Ee&&ne.id===ge;Ze.setState(ne,A,Ut)}let ht=!1;ne.version===Be.__version?(Be.needsLights&&Be.lightsStateVersion!==Pn.state.version||Be.outputColorSpace!==Ue||ie.isBatchedMesh&&Be.batching===!1||!ie.isBatchedMesh&&Be.batching===!0||ie.isBatchedMesh&&Be.batchingColor===!0&&ie.colorTexture===null||ie.isBatchedMesh&&Be.batchingColor===!1&&ie.colorTexture!==null||ie.isInstancedMesh&&Be.instancing===!1||!ie.isInstancedMesh&&Be.instancing===!0||ie.isSkinnedMesh&&Be.skinning===!1||!ie.isSkinnedMesh&&Be.skinning===!0||ie.isInstancedMesh&&Be.instancingColor===!0&&ie.instanceColor===null||ie.isInstancedMesh&&Be.instancingColor===!1&&ie.instanceColor!==null||ie.isInstancedMesh&&Be.instancingMorph===!0&&ie.morphTexture===null||ie.isInstancedMesh&&Be.instancingMorph===!1&&ie.morphTexture!==null||Be.envMap!==Ve||ne.fog===!0&&Be.fog!==Le||Be.numClippingPlanes!==void 0&&(Be.numClippingPlanes!==Ze.numPlanes||Be.numIntersection!==Ze.numIntersection)||Be.vertexAlphas!==je||Be.vertexTangents!==ot||Be.morphTargets!==Ye||Be.morphNormals!==At||Be.morphColors!==jt||Be.toneMapping!==kt||Be.morphTargetsCount!==Ot||!!Be.lightProbeGrid!=N.state.lightProbeGridArray.length>0)&&(ht=!0):(ht=!0,Be.__version=ne.version);let yn=Be.currentProgram;ht===!0&&(yn=Ca(ne,q,ie),W&&ne.isNodeMaterial&&W.onUpdateProgram(ne,yn,Be));let ni=!1,Ri=!1,ii=!1;const Pt=yn.getUniforms(),$t=Be.uniforms;if(E.useProgram(yn.program)&&(ni=!0,Ri=!0,ii=!0),ne.id!==ge&&(ge=ne.id,Ri=!0),Be.needsLights){const Ut=fr(N.state.lightProbeGridArray,ie);Be.lightProbeGrid!==Ut&&(Be.lightProbeGrid=Ut,Ri=!0)}if(ni||Ee!==A){E.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),Pt.setValue(Y,"projectionMatrix",A.projectionMatrix),Pt.setValue(Y,"viewMatrix",A.matrixWorldInverse);const zi=Pt.map.cameraPosition;zi!==void 0&&zi.setValue(Y,nn.setFromMatrixPosition(A.matrixWorld)),O.logarithmicDepthBuffer&&Pt.setValue(Y,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(ne.isMeshPhongMaterial||ne.isMeshToonMaterial||ne.isMeshLambertMaterial||ne.isMeshBasicMaterial||ne.isMeshStandardMaterial||ne.isShaderMaterial)&&Pt.setValue(Y,"isOrthographic",A.isOrthographicCamera===!0),Ee!==A&&(Ee=A,Ri=!0,ii=!0)}if(Be.needsLights&&(Pn.state.directionalShadowMap.length>0&&Pt.setValue(Y,"directionalShadowMap",Pn.state.directionalShadowMap,fe),Pn.state.spotShadowMap.length>0&&Pt.setValue(Y,"spotShadowMap",Pn.state.spotShadowMap,fe),Pn.state.pointShadowMap.length>0&&Pt.setValue(Y,"pointShadowMap",Pn.state.pointShadowMap,fe)),ie.isSkinnedMesh){Pt.setOptional(Y,ie,"bindMatrix"),Pt.setOptional(Y,ie,"bindMatrixInverse");const Ut=ie.skeleton;Ut&&(Ut.boneTexture===null&&Ut.computeBoneTexture(),Pt.setValue(Y,"boneTexture",Ut.boneTexture,fe))}ie.isBatchedMesh&&(Pt.setOptional(Y,ie,"batchingTexture"),Pt.setValue(Y,"batchingTexture",ie._matricesTexture,fe),Pt.setOptional(Y,ie,"batchingIdTexture"),Pt.setValue(Y,"batchingIdTexture",ie._indirectTexture,fe),Pt.setOptional(Y,ie,"batchingColorTexture"),ie._colorsTexture!==null&&Pt.setValue(Y,"batchingColorTexture",ie._colorsTexture,fe));const Ci=se.morphAttributes;if((Ci.position!==void 0||Ci.normal!==void 0||Ci.color!==void 0)&&X.update(ie,se,yn),(Ri||Be.receiveShadow!==ie.receiveShadow)&&(Be.receiveShadow=ie.receiveShadow,Pt.setValue(Y,"receiveShadow",ie.receiveShadow)),(ne.isMeshStandardMaterial||ne.isMeshLambertMaterial||ne.isMeshPhongMaterial)&&ne.envMap===null&&q.environment!==null&&($t.envMapIntensity.value=q.environmentIntensity),$t.dfgLUT!==void 0&&($t.dfgLUT.value=qA()),Ri){if(Pt.setValue(Y,"toneMappingExposure",k.toneMappingExposure),Be.needsLights&&mn($t,ii),Le&&ne.fog===!0&&ze.refreshFogUniforms($t,Le),ze.refreshMaterialUniforms($t,ne,Me,xe,N.state.transmissionRenderTarget[A.id]),Be.needsLights&&Be.lightProbeGrid){const Ut=Be.lightProbeGrid;$t.probesSH.value=Ut.texture,$t.probesMin.value.copy(Ut.boundingBox.min),$t.probesMax.value.copy(Ut.boundingBox.max),$t.probesResolution.value.copy(Ut.resolution)}qc.upload(Y,ji(Be),$t,fe)}if(ne.isShaderMaterial&&ne.uniformsNeedUpdate===!0&&(qc.upload(Y,ji(Be),$t,fe),ne.uniformsNeedUpdate=!1),ne.isSpriteMaterial&&Pt.setValue(Y,"center",ie.center),Pt.setValue(Y,"modelViewMatrix",ie.modelViewMatrix),Pt.setValue(Y,"normalMatrix",ie.normalMatrix),Pt.setValue(Y,"modelMatrix",ie.matrixWorld),ne.uniformsGroups!==void 0){const Ut=ne.uniformsGroups;for(let zi=0,Da=Ut.length;zi<Da;zi++){const dr=Ut[zi];Se.update(dr,yn),Se.bind(dr,yn)}}return yn}function mn(A,q){A.ambientLightColor.needsUpdate=q,A.lightProbe.needsUpdate=q,A.directionalLights.needsUpdate=q,A.directionalLightShadows.needsUpdate=q,A.pointLights.needsUpdate=q,A.pointLightShadows.needsUpdate=q,A.spotLights.needsUpdate=q,A.spotLightShadows.needsUpdate=q,A.rectAreaLights.needsUpdate=q,A.hemisphereLights.needsUpdate=q}function rl(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return te},this.setRenderTargetTextures=function(A,q,se){const ne=re.get(A);ne.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,ne.__autoAllocateDepthBuffer===!1&&(ne.__useRenderToTexture=!1),re.get(A.texture).__webglTexture=q,re.get(A.depthTexture).__webglTexture=ne.__autoAllocateDepthBuffer?void 0:se,ne.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,q){const se=re.get(A);se.__webglFramebuffer=q,se.__useDefaultFramebuffer=q===void 0},this.setRenderTarget=function(A,q=0,se=0){te=A,B=q,G=se;let ne=null,ie=!1,Le=!1;if(A){const Ue=re.get(A);if(Ue.__useDefaultFramebuffer!==void 0){E.bindFramebuffer(Y.FRAMEBUFFER,Ue.__webglFramebuffer),I.copy(A.viewport),Q.copy(A.scissor),ye=A.scissorTest,E.viewport(I),E.scissor(Q),E.setScissorTest(ye),ge=-1;return}else if(Ue.__webglFramebuffer===void 0)fe.setupRenderTarget(A);else if(Ue.__hasExternalTextures)fe.rebindTextures(A,re.get(A.texture).__webglTexture,re.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const je=A.depthTexture;if(Ue.__boundDepthTexture!==je){if(je!==null&&re.has(je)&&(A.width!==je.image.width||A.height!==je.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");fe.setupDepthRenderbuffer(A)}}const ke=A.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(Le=!0);const Ve=re.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Ve[q])?ne=Ve[q][se]:ne=Ve[q],ie=!0):A.samples>0&&fe.useMultisampledRTT(A)===!1?ne=re.get(A).__webglMultisampledFramebuffer:Array.isArray(Ve)?ne=Ve[se]:ne=Ve,I.copy(A.viewport),Q.copy(A.scissor),ye=A.scissorTest}else I.copy(Qe).multiplyScalar(Me).floor(),Q.copy(Yt).multiplyScalar(Me).floor(),ye=ft;if(se!==0&&(ne=ce),E.bindFramebuffer(Y.FRAMEBUFFER,ne)&&E.drawBuffers(A,ne),E.viewport(I),E.scissor(Q),E.setScissorTest(ye),ie){const Ue=re.get(A.texture);Y.framebufferTexture2D(Y.FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_CUBE_MAP_POSITIVE_X+q,Ue.__webglTexture,se)}else if(Le){const Ue=q;for(let ke=0;ke<A.textures.length;ke++){const Ve=re.get(A.textures[ke]);Y.framebufferTextureLayer(Y.FRAMEBUFFER,Y.COLOR_ATTACHMENT0+ke,Ve.__webglTexture,se,Ue)}}else if(A!==null&&se!==0){const Ue=re.get(A.texture);Y.framebufferTexture2D(Y.FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_2D,Ue.__webglTexture,se)}ge=-1},this.readRenderTargetPixels=function(A,q,se,ne,ie,Le,He,Ue=0){if(!(A&&A.isWebGLRenderTarget)){bt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ke=re.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&He!==void 0&&(ke=ke[He]),ke){E.bindFramebuffer(Y.FRAMEBUFFER,ke);try{const Ve=A.textures[Ue],je=Ve.format,ot=Ve.type;if(A.textures.length>1&&Y.readBuffer(Y.COLOR_ATTACHMENT0+Ue),!O.textureFormatReadable(je)){bt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!O.textureTypeReadable(ot)){bt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}q>=0&&q<=A.width-ne&&se>=0&&se<=A.height-ie&&Y.readPixels(q,se,ne,ie,Ce.convert(je),Ce.convert(ot),Le)}finally{const Ve=te!==null?re.get(te).__webglFramebuffer:null;E.bindFramebuffer(Y.FRAMEBUFFER,Ve)}}},this.readRenderTargetPixelsAsync=async function(A,q,se,ne,ie,Le,He,Ue=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ke=re.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&He!==void 0&&(ke=ke[He]),ke)if(q>=0&&q<=A.width-ne&&se>=0&&se<=A.height-ie){E.bindFramebuffer(Y.FRAMEBUFFER,ke);const Ve=A.textures[Ue],je=Ve.format,ot=Ve.type;if(A.textures.length>1&&Y.readBuffer(Y.COLOR_ATTACHMENT0+Ue),!O.textureFormatReadable(je))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!O.textureTypeReadable(ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ye=Y.createBuffer();Y.bindBuffer(Y.PIXEL_PACK_BUFFER,Ye),Y.bufferData(Y.PIXEL_PACK_BUFFER,Le.byteLength,Y.STREAM_READ),Y.readPixels(q,se,ne,ie,Ce.convert(je),Ce.convert(ot),0);const At=te!==null?re.get(te).__webglFramebuffer:null;E.bindFramebuffer(Y.FRAMEBUFFER,At);const jt=Y.fenceSync(Y.SYNC_GPU_COMMANDS_COMPLETE,0);return Y.flush(),await $M(Y,jt,4),Y.bindBuffer(Y.PIXEL_PACK_BUFFER,Ye),Y.getBufferSubData(Y.PIXEL_PACK_BUFFER,0,Le),Y.deleteBuffer(Ye),Y.deleteSync(jt),Le}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,q=null,se=0){const ne=Math.pow(2,-se),ie=Math.floor(A.image.width*ne),Le=Math.floor(A.image.height*ne),He=q!==null?q.x:0,Ue=q!==null?q.y:0;fe.setTexture2D(A,0),Y.copyTexSubImage2D(Y.TEXTURE_2D,se,0,0,He,Ue,ie,Le),E.unbindTexture()},this.copyTextureToTexture=function(A,q,se=null,ne=null,ie=0,Le=0){let He,Ue,ke,Ve,je,ot,Ye,At,jt;const kt=A.isCompressedTexture?A.mipmaps[Le]:A.image;if(se!==null)He=se.max.x-se.min.x,Ue=se.max.y-se.min.y,ke=se.isBox3?se.max.z-se.min.z:1,Ve=se.min.x,je=se.min.y,ot=se.isBox3?se.min.z:0;else{const $t=Math.pow(2,-ie);He=Math.floor(kt.width*$t),Ue=Math.floor(kt.height*$t),A.isDataArrayTexture?ke=kt.depth:A.isData3DTexture?ke=Math.floor(kt.depth*$t):ke=1,Ve=0,je=0,ot=0}ne!==null?(Ye=ne.x,At=ne.y,jt=ne.z):(Ye=0,At=0,jt=0);const Lt=Ce.convert(q.format),Ot=Ce.convert(q.type);let Be;q.isData3DTexture?(fe.setTexture3D(q,0),Be=Y.TEXTURE_3D):q.isDataArrayTexture||q.isCompressedArrayTexture?(fe.setTexture2DArray(q,0),Be=Y.TEXTURE_2D_ARRAY):(fe.setTexture2D(q,0),Be=Y.TEXTURE_2D),E.activeTexture(Y.TEXTURE0),E.pixelStorei(Y.UNPACK_FLIP_Y_WEBGL,q.flipY),E.pixelStorei(Y.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),E.pixelStorei(Y.UNPACK_ALIGNMENT,q.unpackAlignment);const Pn=E.getParameter(Y.UNPACK_ROW_LENGTH),ht=E.getParameter(Y.UNPACK_IMAGE_HEIGHT),yn=E.getParameter(Y.UNPACK_SKIP_PIXELS),ni=E.getParameter(Y.UNPACK_SKIP_ROWS),Ri=E.getParameter(Y.UNPACK_SKIP_IMAGES);E.pixelStorei(Y.UNPACK_ROW_LENGTH,kt.width),E.pixelStorei(Y.UNPACK_IMAGE_HEIGHT,kt.height),E.pixelStorei(Y.UNPACK_SKIP_PIXELS,Ve),E.pixelStorei(Y.UNPACK_SKIP_ROWS,je),E.pixelStorei(Y.UNPACK_SKIP_IMAGES,ot);const ii=A.isDataArrayTexture||A.isData3DTexture,Pt=q.isDataArrayTexture||q.isData3DTexture;if(A.isDepthTexture){const $t=re.get(A),Ci=re.get(q),Ut=re.get($t.__renderTarget),zi=re.get(Ci.__renderTarget);E.bindFramebuffer(Y.READ_FRAMEBUFFER,Ut.__webglFramebuffer),E.bindFramebuffer(Y.DRAW_FRAMEBUFFER,zi.__webglFramebuffer);for(let Da=0;Da<ke;Da++)ii&&(Y.framebufferTextureLayer(Y.READ_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,re.get(A).__webglTexture,ie,ot+Da),Y.framebufferTextureLayer(Y.DRAW_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,re.get(q).__webglTexture,Le,jt+Da)),Y.blitFramebuffer(Ve,je,He,Ue,Ye,At,He,Ue,Y.DEPTH_BUFFER_BIT,Y.NEAREST);E.bindFramebuffer(Y.READ_FRAMEBUFFER,null),E.bindFramebuffer(Y.DRAW_FRAMEBUFFER,null)}else if(ie!==0||A.isRenderTargetTexture||re.has(A)){const $t=re.get(A),Ci=re.get(q);E.bindFramebuffer(Y.READ_FRAMEBUFFER,me),E.bindFramebuffer(Y.DRAW_FRAMEBUFFER,j);for(let Ut=0;Ut<ke;Ut++)ii?Y.framebufferTextureLayer(Y.READ_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,$t.__webglTexture,ie,ot+Ut):Y.framebufferTexture2D(Y.READ_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_2D,$t.__webglTexture,ie),Pt?Y.framebufferTextureLayer(Y.DRAW_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Ci.__webglTexture,Le,jt+Ut):Y.framebufferTexture2D(Y.DRAW_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_2D,Ci.__webglTexture,Le),ie!==0?Y.blitFramebuffer(Ve,je,He,Ue,Ye,At,He,Ue,Y.COLOR_BUFFER_BIT,Y.NEAREST):Pt?Y.copyTexSubImage3D(Be,Le,Ye,At,jt+Ut,Ve,je,He,Ue):Y.copyTexSubImage2D(Be,Le,Ye,At,Ve,je,He,Ue);E.bindFramebuffer(Y.READ_FRAMEBUFFER,null),E.bindFramebuffer(Y.DRAW_FRAMEBUFFER,null)}else Pt?A.isDataTexture||A.isData3DTexture?Y.texSubImage3D(Be,Le,Ye,At,jt,He,Ue,ke,Lt,Ot,kt.data):q.isCompressedArrayTexture?Y.compressedTexSubImage3D(Be,Le,Ye,At,jt,He,Ue,ke,Lt,kt.data):Y.texSubImage3D(Be,Le,Ye,At,jt,He,Ue,ke,Lt,Ot,kt):A.isDataTexture?Y.texSubImage2D(Y.TEXTURE_2D,Le,Ye,At,He,Ue,Lt,Ot,kt.data):A.isCompressedTexture?Y.compressedTexSubImage2D(Y.TEXTURE_2D,Le,Ye,At,kt.width,kt.height,Lt,kt.data):Y.texSubImage2D(Y.TEXTURE_2D,Le,Ye,At,He,Ue,Lt,Ot,kt);E.pixelStorei(Y.UNPACK_ROW_LENGTH,Pn),E.pixelStorei(Y.UNPACK_IMAGE_HEIGHT,ht),E.pixelStorei(Y.UNPACK_SKIP_PIXELS,yn),E.pixelStorei(Y.UNPACK_SKIP_ROWS,ni),E.pixelStorei(Y.UNPACK_SKIP_IMAGES,Ri),Le===0&&q.generateMipmaps&&Y.generateMipmap(Be),E.unbindTexture()},this.initRenderTarget=function(A){re.get(A).__webglFramebuffer===void 0&&fe.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?fe.setTextureCube(A,0):A.isData3DTexture?fe.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?fe.setTexture2DArray(A,0):fe.setTexture2D(A,0),E.unbindTexture()},this.resetState=function(){B=0,G=0,te=null,E.reset(),Ie.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return qi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const i=this.getContext();i.drawingBufferColorSpace=yt._getDrawingBufferColorSpace(e),i.unpackColorSpace=yt._getUnpackColorSpace()}}const Vh=3.4,ZA=28,kh=6,Kv=-2;function KA(s){return .18+Math.pow(Math.max(0,Math.min(1,s)),1.6)*.86}function QA(s){return Math.max(.29,Math.min(1,s/1.55))}function JA(){return[[-.78,-.78,-.14,-.14],[.14,.14,.78,.78],[-.78,.78,-.14,.14],[.14,-.14,.78,-.78]]}function jA(s){return .55+.45*s}const Mn={void:132363,cyan:5564415,magenta:16718008,danger:3211289,pickup:14285823,hull:2378375};function $A(s=6.2,e=.72){return Array.from({length:8},(i,r)=>{const l=Math.PI/8+r*Math.PI/4;return new K(Math.cos(l)*s,Math.sin(l)*s*e+1.2,0)})}function iv(s,e){const i=$A(s),r=[];for(let c=0;c<i.length;c+=1){const d=i[c],p=i[(c+1)%i.length],m=p.x-d.x,h=p.y-d.y,_=Math.hypot(m,h)||1,v=-h/_*e*.5,g=m/_*e*.5;r.push(d.x+v,d.y+g,0,d.x-v,d.y-g,0,p.x+v,p.y+g,0,d.x-v,d.y-g,0,p.x-v,p.y-g,0,p.x+v,p.y+g,0)}const l=new hn;return l.setAttribute("position",new Qt(r,3)),l}function eR(s){const e=new kn,i=new qt(iv(6.2,.19),new On({color:s,transparent:!0,opacity:.2,blending:Br,depthWrite:!1}));i.userData.layer="glow";const r=new qt(iv(6.2,.065),new On({color:s,transparent:!0,opacity:.92}));return r.userData.layer="core",e.add(i,r),e}function av(s,e,i,r,l){const c=i-s,d=r-e,p=Math.hypot(c,d)||1,m=-d/p*l*.5,h=c/p*l*.5,_=-.585,v=new hn;return v.setAttribute("position",new Qt([s+m,_,e+h,s-m,_,e-h,i+m,_,r+h,s-m,_,e-h,i-m,_,r-h,i+m,_,r+h],3)),v}function rv(s,e,i,r,l,c){const d=i-s,p=r-e,m=Math.hypot(d,p)||1,h=-p/m*l*.5,_=d/m*l*.5,v=new hn;return v.setAttribute("position",new Qt([s+h,e+_,c,s-h,e-_,c,i+h,r+_,c,s-h,e-_,c,i-h,r-_,c,i+h,r+_,c],3)),v}function rp(s,e=1){return new Ov({color:s,transparent:e<1,opacity:e})}function sv(s,e){const i=new hn;return i.setAttribute("position",new Qt([0,.1,.2,s*2.35,-.05,.7,s*.85,.05,-.65],3)),i.computeVertexNormals(),new qt(i,e)}function tR(s,e){const i=new hn,r=s*.62;return i.setAttribute("position",new Qt([r-.11,-.08,.68,r+.11,-.08,.68,r,-.06,3.15],3)),new qt(i,e)}function nR(){const s=new kn;s.name="glider";const e=new On({color:Mn.hull,side:pi}),i=new On({color:Mn.cyan}),r=new On({color:Mn.magenta}),l=new On({color:Mn.magenta,transparent:!0,opacity:.78,side:pi}),c=new qt(new Hs(.82,0),e);c.scale.set(1.1,.48,1.65),c.position.z=.15,s.add(c,sv(-1,e),sv(1,e));for(const p of[-1,1]){const m=new qt(new Hs(.3,0),r);m.position.set(p*.65,-.1,.78),s.add(m),s.add(tR(p,l))}const d=new qt(new Hs(.28,0),i);return d.scale.set(.72,.9,1.25),d.position.set(0,.35,-.12),s.add(d),s.scale.setScalar(.7),s.position.set(0,.45,2),s}function iR(){const s=new Uy;s.background=new Tt(198419),s.fog=new np(198419,96,220);const e=new bi(64,16/9,.1,240);e.position.set(0,2.7,7.8),e.lookAt(0,.5,-32);const i=new kn;i.name="tunnel";for(let _=0;_<ZA;_+=1){const v=_%3===0?Mn.magenta:Mn.cyan,g=eR(v);g.position.z=Kv-_*kh,g.userData.baseIndex=_,i.add(g)}const r=new kn;r.name="lanes";for(const _ of[-1,0,1]){const v=_*Vh,g=_*.34,y=new hn;y.setAttribute("position",new Qt([v-.045,-.62,5,v+.045,-.62,5,g-.012,-.15,-174,v+.045,-.62,5,g+.012,-.15,-174,g-.012,-.15,-174],3));const b=new qt(y,new On({color:Mn.cyan,transparent:!0,opacity:_===0?.78:.96}));r.add(b)}const l=new kn;l.name="speed-lines";for(let _=0;_<18;_+=1){const v=_/18*Math.PI*2,g=Math.cos(v)*10.5,y=Math.sin(v)*5.8+1.15,b=Math.cos(v)*.68,w=Math.sin(v)*.42+1.15,M=-Math.sin(v)*.07,S=Math.cos(v)*.07,D=new hn;D.setAttribute("position",new Qt([g+M,y+S,5,g-M,y-S,5,b,w,-128],3)),l.add(new qt(D,new On({color:_%3===0?Mn.magenta:Mn.cyan,transparent:!0,opacity:_%2===0?.2:.1,blending:Br,depthWrite:!1,side:pi})))}const c=new kn;c.name="flow";const d=new On({color:Mn.magenta,transparent:!0,opacity:.82,blending:Br,depthWrite:!1,side:pi});for(let _=0;_<20;_+=1){const v=new kn;v.userData.baseIndex=_,v.add(new qt(av(-.72,.28,0,-.34,.11),d),new qt(av(.72,.28,0,-.34,.11),d)),v.position.z=2-_*7,c.add(v)}const p=new kn;p.name="objects";const m=new kn;m.name="effects";const h=nR();return s.add(l,i,r,c,h,p,m),{scene:s,camera:e,groups:{speedLines:l,tunnel:i,lanes:r,flow:c,glider:h,objects:p,effects:m}}}function aR(){const s=new kn,e=new Ys(2.55,3.25,1.25),i=new qt(e,new On({color:Mn.danger})),r=new ip(new zv(e),rp(Mn.magenta,1)),l=new On({color:Mn.cyan,transparent:!0,opacity:.3,blending:Br}),c=new On({color:Mn.magenta,transparent:!0,opacity:.96,blending:Br});s.add(i,r);for(const[d,p,m,h]of JA())s.add(new qt(rv(d,p,m,h,.22,.638),l),new qt(rv(d,p,m,h,.1,.65),c));return s}function rR(){const s=new Hs(.58,0),e=new qt(s,new On({color:Mn.pickup,transparent:!0,opacity:.95})),i=new ip(new zv(s),rp(Mn.cyan,1)),r=new kn;return r.add(e,i),r}function sR(){const s=new hn().setFromPoints([new K(-.7,-.52,.4),new K(0,-.48,-.35),new K(0,-.48,-.35),new K(.7,-.52,.4)]);return new ip(s,rp(Mn.magenta,.86))}function jd(s){s.traverse(e=>{var i,r,l,c;(r=(i=e.geometry)==null?void 0:i.dispose)==null||r.call(i),Array.isArray(e.material)?e.material.forEach(d=>d.dispose()):(c=(l=e.material)==null?void 0:l.dispose)==null||c.call(l)})}function oR(s){const{scene:e,camera:i,groups:r}=iR(),l=new YA({canvas:s,antialias:!0,alpha:!1});l.outputColorSpace=hi,l.setClearColor(Mn.void,1);const c=new Map,d=new qt(new tu(1.15,.055,8,48),new On({color:Mn.cyan,transparent:!0,opacity:0})),p=new qt(new tu(1.28,.075,8,48),new On({color:Mn.magenta,transparent:!0,opacity:0}));d.rotation.x=Math.PI/2,p.rotation.x=Math.PI/2,r.effects.add(d,p);let m=!1,h=!1,_=1;const v=D=>{D.preventDefault(),h=!0},g=()=>{h=!1};s.addEventListener("webglcontextlost",v,!1),s.addEventListener("webglcontextrestored",g,!1);function y(D){if(c.has(D.id))return c.get(D.id);const P=D.kind==="blocker"?aR():D.kind==="pickup"?rR():sR();return P.userData.kind=D.kind,r.objects.add(P),c.set(D.id,P),P}function b(D,P={collect:0,hit:0}){if(h)return;const C=performance.now(),z=D.distance%kh;r.tunnel.children.forEach((F,W)=>{F.position.z=Kv-W*kh+z;const ce=Math.max(0,Math.min(1,(F.position.z+40)/40));F.children.forEach(me=>{me.material.opacity=me.userData.layer==="glow"?.12+ce*.3:.68+ce*.32})});const N=D.distance%7;r.flow.children.forEach((F,W)=>{F.position.z=2-W*7+N;const ce=Math.max(0,Math.min(1,(F.position.z+70)/70));F.visible=F.position.z<5.5,F.scale.setScalar(.35+ce*.65)});const L=new Set;for(const F of D.objects){if(F.resolved)continue;L.add(F.id);const W=y(F),ce=1-Math.max(0,Math.min(1,F.z/118));if(W.position.set(F.lane*Vh*_,F.kind==="pickup"?.28:.22,-F.z),F.kind==="blocker"){const me=KA(ce);W.scale.setScalar(me),W.scale.x*=jA(_)}else if(F.kind==="pickup"){const me=.16+Math.pow(ce,1.5)*.7;W.scale.setScalar(me),W.rotation.y=D.distance*.03}else W.scale.setScalar(.42+ce*1.2)}for(const[F,W]of c)L.has(F)||(r.objects.remove(W),jd(W),c.delete(F));const T=D.lane*Vh*_;r.glider.position.x=_y.lerp(r.glider.position.x,T,m?.34:.18),r.glider.rotation.z=m?0:(r.glider.position.x-T)*.08,r.glider.position.y=.45+(m?0:Math.sin(D.distance*.13)*.055),i.position.y=2.7+(m?0:Math.sin(D.distance*.08)*.035);const U=C-P.collect,k=C-P.hit;d.position.copy(r.glider.position),p.position.copy(r.glider.position),d.material.opacity=U<260?1-U/260:0,p.material.opacity=k<260?1-k/260:0,d.scale.setScalar(1+Math.max(0,U)/180),p.scale.setScalar(1+Math.max(0,k)/150),l.render(e,i)}function w(D,P,C=window.devicePixelRatio){l.setPixelRatio(Math.min(2,C||1)),l.setSize(D,P,!1),i.aspect=D/Math.max(1,P),_=QA(i.aspect),r.lanes.scale.x=_,r.flow.scale.x=_,r.glider.scale.x=.7*_,i.updateProjectionMatrix()}function M(D){m=!!D}function S(){s.removeEventListener("webglcontextlost",v,!1),s.removeEventListener("webglcontextrestored",g,!1);for(const D of c.values())jd(D);c.clear(),jd(e),l.dispose()}return{render:b,resize:w,setReducedMotion:M,dispose:S}}function lR({canvasRef:s,reducedMotion:e}){const[i,r]=nt.useState(()=>cv(Date.now()&65535)),[l,c]=nt.useState({collect:0,hit:0}),d=nt.useRef(i),p=nt.useRef(null),m=nt.useRef(0);nt.useEffect(()=>{d.current=i},[i]),nt.useEffect(()=>{const b=s.current;if(!b)return;const w=oR(b);p.current=w;const M=()=>{const z=b.getBoundingClientRect();w.resize(z.width,z.height,window.devicePixelRatio)},S=new ResizeObserver(M);S.observe(b),M();let D=0,P=performance.now();const C=z=>{const N=Math.min(50,z-P);P=z;let L=d.current;if(L.phase==="countdown"){const T=z-m.current,U=Math.max(1,3-Math.floor(T/650));T>=1950?L=e_(L):L.countdown!==U&&(L={...L,countdown:U})}else if(L.phase==="playing"){const T=vM(L,N);L=T.state,T.events.includes("collect")&&c(U=>({...U,collect:z})),T.events.includes("hit")&&c(U=>({...U,hit:z}))}L!==d.current&&(d.current=L,r(L)),w.render(L,h.current),D=requestAnimationFrame(C)};return D=requestAnimationFrame(C),()=>{cancelAnimationFrame(D),S.disconnect(),w.dispose(),p.current=null}},[s]);const h=nt.useRef(l);nt.useEffect(()=>{h.current=l},[l]),nt.useEffect(()=>{var b;(b=p.current)==null||b.setReducedMotion(e)},[e]);const _=nt.useCallback(()=>{m.current=performance.now();const b={...e_(d.current),phase:"countdown",countdown:3};d.current=b,c({collect:0,hit:0}),r(b)},[]),v=nt.useCallback(b=>{const w=gM(d.current,b);d.current=w,r(w)},[]),g=nt.useCallback(()=>{const b=_M(d.current);d.current=b,r(b)},[]);return{state:i,effects:l,start:_,move:v,pause:g,restart:_}}const cR=new Map([["bold",nt.createElement(nt.Fragment,null,nt.createElement("path",{d:"M200,28H160a20,20,0,0,0-20,20V208a20,20,0,0,0,20,20h40a20,20,0,0,0,20-20V48A20,20,0,0,0,200,28Zm-4,176H164V52h32ZM96,28H56A20,20,0,0,0,36,48V208a20,20,0,0,0,20,20H96a20,20,0,0,0,20-20V48A20,20,0,0,0,96,28ZM92,204H60V52H92Z"}))],["duotone",nt.createElement(nt.Fragment,null,nt.createElement("path",{d:"M208,48V208a8,8,0,0,1-8,8H160a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8h40A8,8,0,0,1,208,48ZM96,40H56a8,8,0,0,0-8,8V208a8,8,0,0,0,8,8H96a8,8,0,0,0,8-8V48A8,8,0,0,0,96,40Z",opacity:"0.2"}),nt.createElement("path",{d:"M200,32H160a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm0,176H160V48h40ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Zm0,176H56V48H96Z"}))],["fill",nt.createElement(nt.Fragment,null,nt.createElement("path",{d:"M216,48V208a16,16,0,0,1-16,16H160a16,16,0,0,1-16-16V48a16,16,0,0,1,16-16h40A16,16,0,0,1,216,48ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Z"}))],["light",nt.createElement(nt.Fragment,null,nt.createElement("path",{d:"M200,34H160a14,14,0,0,0-14,14V208a14,14,0,0,0,14,14h40a14,14,0,0,0,14-14V48A14,14,0,0,0,200,34Zm2,174a2,2,0,0,1-2,2H160a2,2,0,0,1-2-2V48a2,2,0,0,1,2-2h40a2,2,0,0,1,2,2ZM96,34H56A14,14,0,0,0,42,48V208a14,14,0,0,0,14,14H96a14,14,0,0,0,14-14V48A14,14,0,0,0,96,34Zm2,174a2,2,0,0,1-2,2H56a2,2,0,0,1-2-2V48a2,2,0,0,1,2-2H96a2,2,0,0,1,2,2Z"}))],["regular",nt.createElement(nt.Fragment,null,nt.createElement("path",{d:"M200,32H160a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm0,176H160V48h40ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Zm0,176H56V48H96Z"}))],["thin",nt.createElement(nt.Fragment,null,nt.createElement("path",{d:"M200,36H160a12,12,0,0,0-12,12V208a12,12,0,0,0,12,12h40a12,12,0,0,0,12-12V48A12,12,0,0,0,200,36Zm4,172a4,4,0,0,1-4,4H160a4,4,0,0,1-4-4V48a4,4,0,0,1,4-4h40a4,4,0,0,1,4,4ZM96,36H56A12,12,0,0,0,44,48V208a12,12,0,0,0,12,12H96a12,12,0,0,0,12-12V48A12,12,0,0,0,96,36Zm4,172a4,4,0,0,1-4,4H56a4,4,0,0,1-4-4V48a4,4,0,0,1,4-4H96a4,4,0,0,1,4,4Z"}))]]),uR=nt.createContext({color:"currentColor",size:"1em",weight:"regular",mirrored:!1}),Qv=nt.forwardRef((s,e)=>{const{alt:i,color:r,size:l,weight:c,mirrored:d,children:p,weights:m,...h}=s,{color:_="currentColor",size:v,weight:g="regular",mirrored:y=!1,...b}=nt.useContext(uR);return nt.createElement("svg",{ref:e,xmlns:"http://www.w3.org/2000/svg",width:l??v,height:l??v,fill:r??_,viewBox:"0 0 256 256",transform:d||y?"scale(-1, 1)":void 0,...b,...h},!!i&&nt.createElement("title",null,i),p,m.get(c??g))});Qv.displayName="IconBase";const Jv=nt.forwardRef((s,e)=>nt.createElement(Qv,{ref:e,...s,weights:cR}));Jv.displayName="PauseIcon";const fR=Jv;function dR({state:s,onPause:e}){return["start","gameover"].includes(s.phase)?null:Ke.jsxs("div",{className:"game-hud",children:[Ke.jsxs("section",{className:"hud-score","aria-label":"Score",children:[Ke.jsx("span",{children:"SCORE"}),Ke.jsx("strong",{children:Math.round(s.score).toLocaleString()}),Ke.jsx("span",{children:"MULTIPLIER"}),Ke.jsxs("b",{children:["×",s.multiplier.toFixed(1)]})]}),Ke.jsxs("section",{className:"hud-distance","aria-label":"Distance and gate",children:[Ke.jsx("span",{children:"DISTANCE"}),Ke.jsxs("strong",{children:[Math.round(s.distance),Ke.jsx("small",{children:"m"})]}),Ke.jsxs("b",{children:["GATE ",s.gate]})]}),Ke.jsxs("section",{className:"hud-energy","aria-label":"Energy",children:[Ke.jsx("span",{children:"ENERGY"}),Ke.jsx("div",{className:"energy-track",role:"progressbar","aria-label":"Energy","aria-valuemin":"0","aria-valuemax":"100","aria-valuenow":Math.round(s.energy),children:Ke.jsx("i",{style:{width:`${s.energy}%`}})})]}),s.phase==="playing"&&Ke.jsx("button",{className:"pause-button",onClick:e,"aria-label":"Pause",children:Ke.jsx(fR,{weight:"fill"})})]})}function hR({state:s,highScore:e,reducedMotion:i,onReducedMotionChange:r,onStart:l,onResume:c,onRestart:d}){const p=nt.useRef(null);return nt.useEffect(()=>{var m;["start","paused","gameover"].includes(s.phase)&&((m=p.current)==null||m.focus())},[s.phase]),s.phase==="playing"?null:s.phase==="start"?Ke.jsx("section",{className:"game-overlay start-overlay","aria-label":"NEON GLIDER",children:Ke.jsxs("div",{className:"overlay-copy",children:[Ke.jsx("p",{className:"eyebrow",children:"ENDLESS NEON RUNNER"}),Ke.jsx("h1",{children:"NEON GLIDER"}),Ke.jsx("p",{className:"mission",children:"SURVIVE. DODGE OBSTACLES. KEEP YOUR ENERGY UP."}),Ke.jsxs("p",{className:"high-score",children:["HIGH SCORE ",e.toLocaleString()]}),Ke.jsx("p",{className:"controls-copy",children:"A / D — CHANGE LANE    ESC / P — PAUSE"}),Ke.jsx("button",{ref:p,className:"primary-button",onClick:l,children:"Start"}),Ke.jsxs("label",{className:"motion-toggle",children:[Ke.jsx("input",{type:"checkbox",checked:i,onChange:m=>r(m.target.checked)}),Ke.jsx("span",{children:"Reduced motion"})]})]})}):s.phase==="countdown"?Ke.jsxs("section",{className:"countdown-overlay",role:"status","aria-live":"polite",children:[Ke.jsx("span",{children:"STARTING IN"}),Ke.jsx("strong",{children:s.countdown})]}):s.phase==="paused"?Ke.jsxs("section",{className:"game-overlay compact-overlay",children:[Ke.jsx("p",{className:"eyebrow",children:"FLIGHT SUSPENDED"}),Ke.jsx("h2",{children:"PAUSED"}),Ke.jsxs("div",{className:"overlay-actions",children:[Ke.jsx("button",{ref:p,className:"primary-button",onClick:c,children:"Continue"}),Ke.jsx("button",{className:"secondary-button",onClick:d,children:"Restart"})]})]}):Ke.jsxs("section",{className:"game-overlay compact-overlay",children:[Ke.jsx("p",{className:"eyebrow",children:"ENERGY DEPLETED"}),Ke.jsx("h2",{children:"RUN OVER"}),Ke.jsxs("div",{className:"run-summary",children:[Ke.jsxs("span",{children:["SCORE ",Ke.jsx("strong",{children:Math.round(s.score).toLocaleString()})]}),Ke.jsxs("span",{children:["DISTANCE ",Ke.jsxs("strong",{children:[Math.round(s.distance),"m"]})]}),Ke.jsxs("span",{children:["BEST ",Ke.jsx("strong",{children:Math.max(e,Math.round(s.score)).toLocaleString()})]})]}),Ke.jsx("button",{ref:p,className:"primary-button",onClick:d,children:"Run again"})]})}function pR(){const s=nt.useRef(null),e=nt.useRef(null),[i,r]=nt.useState(()=>localStorage.getItem("neon-reduced-motion")==="true"),[l,c]=nt.useState(()=>Number(localStorage.getItem("neon-high-score")||0)),{state:d,effects:p,start:m,move:h,pause:_,restart:v}=lR({canvasRef:s,reducedMotion:i});nt.useEffect(()=>{localStorage.setItem("neon-reduced-motion",String(i))},[i]),nt.useEffect(()=>{d.phase==="gameover"&&c(w=>{const M=Math.max(w,Math.round(d.score));return localStorage.setItem("neon-high-score",String(M)),M})},[d.phase,d.score]),nt.useEffect(()=>{const w=M=>{["ArrowLeft","a","A"].includes(M.key)&&h(-1),["ArrowRight","d","D"].includes(M.key)&&h(1),["Escape","p","P"].includes(M.key)&&_(),M.key==="Enter"&&["start","gameover"].includes(d.phase)&&v()};return window.addEventListener("keydown",w),()=>window.removeEventListener("keydown",w)},[h,_,v,d.phase]);const g=w=>{e.current=w.clientX},y=w=>{const M=e.current;if(e.current=null,M==null)return;const S=w.clientX-M;Math.abs(S)>32?h(S>0?1:-1):h(w.clientX<window.innerWidth/2?-1:1)},b=p.hit>p.collect?"pulse-hit":"pulse-collect";return Ke.jsxs("main",{className:`neon-game phase-${d.phase} ${i?"reduced-motion":""}`,"aria-label":"Neon Glider",children:[Ke.jsx("canvas",{ref:s,className:"neon-canvas","aria-hidden":"true"}),Ke.jsx("div",{className:"input-surface","aria-label":"Swipe, tap an edge, or use arrow keys to change lanes",onPointerDown:g,onPointerUp:y}),Ke.jsx("div",{className:`feedback-pulse ${b}`,"aria-hidden":"true"},Math.max(p.collect,p.hit)),Ke.jsx(dR,{state:d,onPause:_}),Ke.jsx(hR,{state:d,highScore:l,reducedMotion:i,onReducedMotionChange:r,onStart:m,onResume:_,onRestart:v})]})}fM.createRoot(document.getElementById("root")).render(Ke.jsx(aM.StrictMode,{children:Ke.jsx(pR,{})}));
