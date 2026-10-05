(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const d of c.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function i(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(l){if(l.ep)return;l.ep=!0;const c=i(l);fetch(l.href,c)}})();function oM(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var gd={exports:{}},Go={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Zg;function lM(){if(Zg)return Go;Zg=1;var s=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function i(r,l,c){var d=null;if(c!==void 0&&(d=""+c),l.key!==void 0&&(d=""+l.key),"key"in l){c={};for(var p in l)p!=="key"&&(c[p]=l[p])}else c=l;return l=c.ref,{$$typeof:s,type:r,key:d,ref:l!==void 0?l:null,props:c}}return Go.Fragment=e,Go.jsx=i,Go.jsxs=i,Go}var Kg;function cM(){return Kg||(Kg=1,gd.exports=lM()),gd.exports}var we=cM(),_d={exports:{}},rt={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Qg;function uM(){if(Qg)return rt;Qg=1;var s=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),d=Symbol.for("react.context"),p=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),h=Symbol.for("react.memo"),_=Symbol.for("react.lazy"),x=Symbol.for("react.activity"),g=Symbol.iterator;function M(I){return I===null||typeof I!="object"?null:(I=g&&I[g]||I["@@iterator"],typeof I=="function"?I:null)}var b={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},D=Object.assign,y={};function S(I,J,ye){this.props=I,this.context=J,this.refs=y,this.updater=ye||b}S.prototype.isReactComponent={},S.prototype.setState=function(I,J){if(typeof I!="object"&&typeof I!="function"&&I!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,I,J,"setState")},S.prototype.forceUpdate=function(I){this.updater.enqueueForceUpdate(this,I,"forceUpdate")};function w(){}w.prototype=S.prototype;function U(I,J,ye){this.props=I,this.context=J,this.refs=y,this.updater=ye||b}var A=U.prototype=new w;A.constructor=U,D(A,S.prototype),A.isPureReactComponent=!0;var P=Array.isArray;function L(){}var B={H:null,A:null,T:null,S:null},T=Object.prototype.hasOwnProperty;function N(I,J,ye){var Re=ye.ref;return{$$typeof:s,type:I,key:J,ref:Re!==void 0?Re:null,props:ye}}function k(I,J){return N(I.type,J,I.props)}function G(I){return typeof I=="object"&&I!==null&&I.$$typeof===s}function Z(I){var J={"=":"=0",":":"=2"};return"$"+I.replace(/[=:]/g,function(ye){return J[ye]})}var ce=/\/+/g;function le(I,J){return typeof I=="object"&&I!==null&&I.key!=null?Z(""+I.key):J.toString(36)}function Y(I){switch(I.status){case"fulfilled":return I.value;case"rejected":throw I.reason;default:switch(typeof I.status=="string"?I.then(L,L):(I.status="pending",I.then(function(J){I.status==="pending"&&(I.status="fulfilled",I.value=J)},function(J){I.status==="pending"&&(I.status="rejected",I.reason=J)})),I.status){case"fulfilled":return I.value;case"rejected":throw I.reason}}throw I}function z(I,J,ye,Re,Ie){var ae=typeof I;(ae==="undefined"||ae==="boolean")&&(I=null);var xe=!1;if(I===null)xe=!0;else switch(ae){case"bigint":case"string":case"number":xe=!0;break;case"object":switch(I.$$typeof){case s:case e:xe=!0;break;case _:return xe=I._init,z(xe(I._payload),J,ye,Re,Ie)}}if(xe)return Ie=Ie(I),xe=Re===""?"."+le(I,0):Re,P(Ie)?(ye="",xe!=null&&(ye=xe.replace(ce,"$&/")+"/"),z(Ie,J,ye,"",function(it){return it})):Ie!=null&&(G(Ie)&&(Ie=k(Ie,ye+(Ie.key==null||I&&I.key===Ie.key?"":(""+Ie.key).replace(ce,"$&/")+"/")+xe)),J.push(Ie)),1;xe=0;var Me=Re===""?".":Re+":";if(P(I))for(var He=0;He<I.length;He++)Re=I[He],ae=Me+le(Re,He),xe+=z(Re,J,ye,ae,Ie);else if(He=M(I),typeof He=="function")for(I=He.call(I),He=0;!(Re=I.next()).done;)Re=Re.value,ae=Me+le(Re,He++),xe+=z(Re,J,ye,ae,Ie);else if(ae==="object"){if(typeof I.then=="function")return z(Y(I),J,ye,Re,Ie);throw J=String(I),Error("Objects are not valid as a React child (found: "+(J==="[object Object]"?"object with keys {"+Object.keys(I).join(", ")+"}":J)+"). If you meant to render a collection of children, use an array instead.")}return xe}function F(I,J,ye){if(I==null)return I;var Re=[],Ie=0;return z(I,Re,"","",function(ae){return J.call(ye,ae,Ie++)}),Re}function te(I){if(I._status===-1){var J=I._result;J=J(),J.then(function(ye){(I._status===0||I._status===-1)&&(I._status=1,I._result=ye)},function(ye){(I._status===0||I._status===-1)&&(I._status=2,I._result=ye)}),I._status===-1&&(I._status=0,I._result=J)}if(I._status===1)return I._result.default;throw I._result}var ge=typeof reportError=="function"?reportError:function(I){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var J=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof I=="object"&&I!==null&&typeof I.message=="string"?String(I.message):String(I),error:I});if(!window.dispatchEvent(J))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",I);return}console.error(I)},Ee={map:F,forEach:function(I,J,ye){F(I,function(){J.apply(this,arguments)},ye)},count:function(I){var J=0;return F(I,function(){J++}),J},toArray:function(I){return F(I,function(J){return J})||[]},only:function(I){if(!G(I))throw Error("React.Children.only expected to receive a single React element child.");return I}};return rt.Activity=x,rt.Children=Ee,rt.Component=S,rt.Fragment=i,rt.Profiler=l,rt.PureComponent=U,rt.StrictMode=r,rt.Suspense=m,rt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=B,rt.__COMPILER_RUNTIME={__proto__:null,c:function(I){return B.H.useMemoCache(I)}},rt.cache=function(I){return function(){return I.apply(null,arguments)}},rt.cacheSignal=function(){return null},rt.cloneElement=function(I,J,ye){if(I==null)throw Error("The argument must be a React element, but you passed "+I+".");var Re=D({},I.props),Ie=I.key;if(J!=null)for(ae in J.key!==void 0&&(Ie=""+J.key),J)!T.call(J,ae)||ae==="key"||ae==="__self"||ae==="__source"||ae==="ref"&&J.ref===void 0||(Re[ae]=J[ae]);var ae=arguments.length-2;if(ae===1)Re.children=ye;else if(1<ae){for(var xe=Array(ae),Me=0;Me<ae;Me++)xe[Me]=arguments[Me+2];Re.children=xe}return N(I.type,Ie,Re)},rt.createContext=function(I){return I={$$typeof:d,_currentValue:I,_currentValue2:I,_threadCount:0,Provider:null,Consumer:null},I.Provider=I,I.Consumer={$$typeof:c,_context:I},I},rt.createElement=function(I,J,ye){var Re,Ie={},ae=null;if(J!=null)for(Re in J.key!==void 0&&(ae=""+J.key),J)T.call(J,Re)&&Re!=="key"&&Re!=="__self"&&Re!=="__source"&&(Ie[Re]=J[Re]);var xe=arguments.length-2;if(xe===1)Ie.children=ye;else if(1<xe){for(var Me=Array(xe),He=0;He<xe;He++)Me[He]=arguments[He+2];Ie.children=Me}if(I&&I.defaultProps)for(Re in xe=I.defaultProps,xe)Ie[Re]===void 0&&(Ie[Re]=xe[Re]);return N(I,ae,Ie)},rt.createRef=function(){return{current:null}},rt.forwardRef=function(I){return{$$typeof:p,render:I}},rt.isValidElement=G,rt.lazy=function(I){return{$$typeof:_,_payload:{_status:-1,_result:I},_init:te}},rt.memo=function(I,J){return{$$typeof:h,type:I,compare:J===void 0?null:J}},rt.startTransition=function(I){var J=B.T,ye={};B.T=ye;try{var Re=I(),Ie=B.S;Ie!==null&&Ie(ye,Re),typeof Re=="object"&&Re!==null&&typeof Re.then=="function"&&Re.then(L,ge)}catch(ae){ge(ae)}finally{J!==null&&ye.types!==null&&(J.types=ye.types),B.T=J}},rt.unstable_useCacheRefresh=function(){return B.H.useCacheRefresh()},rt.use=function(I){return B.H.use(I)},rt.useActionState=function(I,J,ye){return B.H.useActionState(I,J,ye)},rt.useCallback=function(I,J){return B.H.useCallback(I,J)},rt.useContext=function(I){return B.H.useContext(I)},rt.useDebugValue=function(){},rt.useDeferredValue=function(I,J){return B.H.useDeferredValue(I,J)},rt.useEffect=function(I,J){return B.H.useEffect(I,J)},rt.useEffectEvent=function(I){return B.H.useEffectEvent(I)},rt.useId=function(){return B.H.useId()},rt.useImperativeHandle=function(I,J,ye){return B.H.useImperativeHandle(I,J,ye)},rt.useInsertionEffect=function(I,J){return B.H.useInsertionEffect(I,J)},rt.useLayoutEffect=function(I,J){return B.H.useLayoutEffect(I,J)},rt.useMemo=function(I,J){return B.H.useMemo(I,J)},rt.useOptimistic=function(I,J){return B.H.useOptimistic(I,J)},rt.useReducer=function(I,J,ye){return B.H.useReducer(I,J,ye)},rt.useRef=function(I){return B.H.useRef(I)},rt.useState=function(I){return B.H.useState(I)},rt.useSyncExternalStore=function(I,J,ye){return B.H.useSyncExternalStore(I,J,ye)},rt.useTransition=function(){return B.H.useTransition()},rt.version="19.2.0",rt}var Jg;function Kh(){return Jg||(Jg=1,_d.exports=uM()),_d.exports}var Qe=Kh();const fM=oM(Qe);var vd={exports:{}},Vo={},xd={exports:{}},Sd={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var jg;function dM(){return jg||(jg=1,(function(s){function e(z,F){var te=z.length;z.push(F);e:for(;0<te;){var ge=te-1>>>1,Ee=z[ge];if(0<l(Ee,F))z[ge]=F,z[te]=Ee,te=ge;else break e}}function i(z){return z.length===0?null:z[0]}function r(z){if(z.length===0)return null;var F=z[0],te=z.pop();if(te!==F){z[0]=te;e:for(var ge=0,Ee=z.length,I=Ee>>>1;ge<I;){var J=2*(ge+1)-1,ye=z[J],Re=J+1,Ie=z[Re];if(0>l(ye,te))Re<Ee&&0>l(Ie,ye)?(z[ge]=Ie,z[Re]=te,ge=Re):(z[ge]=ye,z[J]=te,ge=J);else if(Re<Ee&&0>l(Ie,te))z[ge]=Ie,z[Re]=te,ge=Re;else break e}}return F}function l(z,F){var te=z.sortIndex-F.sortIndex;return te!==0?te:z.id-F.id}if(s.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;s.unstable_now=function(){return c.now()}}else{var d=Date,p=d.now();s.unstable_now=function(){return d.now()-p}}var m=[],h=[],_=1,x=null,g=3,M=!1,b=!1,D=!1,y=!1,S=typeof setTimeout=="function"?setTimeout:null,w=typeof clearTimeout=="function"?clearTimeout:null,U=typeof setImmediate<"u"?setImmediate:null;function A(z){for(var F=i(h);F!==null;){if(F.callback===null)r(h);else if(F.startTime<=z)r(h),F.sortIndex=F.expirationTime,e(m,F);else break;F=i(h)}}function P(z){if(D=!1,A(z),!b)if(i(m)!==null)b=!0,L||(L=!0,Z());else{var F=i(h);F!==null&&Y(P,F.startTime-z)}}var L=!1,B=-1,T=5,N=-1;function k(){return y?!0:!(s.unstable_now()-N<T)}function G(){if(y=!1,L){var z=s.unstable_now();N=z;var F=!0;try{e:{b=!1,D&&(D=!1,w(B),B=-1),M=!0;var te=g;try{t:{for(A(z),x=i(m);x!==null&&!(x.expirationTime>z&&k());){var ge=x.callback;if(typeof ge=="function"){x.callback=null,g=x.priorityLevel;var Ee=ge(x.expirationTime<=z);if(z=s.unstable_now(),typeof Ee=="function"){x.callback=Ee,A(z),F=!0;break t}x===i(m)&&r(m),A(z)}else r(m);x=i(m)}if(x!==null)F=!0;else{var I=i(h);I!==null&&Y(P,I.startTime-z),F=!1}}break e}finally{x=null,g=te,M=!1}F=void 0}}finally{F?Z():L=!1}}}var Z;if(typeof U=="function")Z=function(){U(G)};else if(typeof MessageChannel<"u"){var ce=new MessageChannel,le=ce.port2;ce.port1.onmessage=G,Z=function(){le.postMessage(null)}}else Z=function(){S(G,0)};function Y(z,F){B=S(function(){z(s.unstable_now())},F)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(z){z.callback=null},s.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):T=0<z?Math.floor(1e3/z):5},s.unstable_getCurrentPriorityLevel=function(){return g},s.unstable_next=function(z){switch(g){case 1:case 2:case 3:var F=3;break;default:F=g}var te=g;g=F;try{return z()}finally{g=te}},s.unstable_requestPaint=function(){y=!0},s.unstable_runWithPriority=function(z,F){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var te=g;g=z;try{return F()}finally{g=te}},s.unstable_scheduleCallback=function(z,F,te){var ge=s.unstable_now();switch(typeof te=="object"&&te!==null?(te=te.delay,te=typeof te=="number"&&0<te?ge+te:ge):te=ge,z){case 1:var Ee=-1;break;case 2:Ee=250;break;case 5:Ee=1073741823;break;case 4:Ee=1e4;break;default:Ee=5e3}return Ee=te+Ee,z={id:_++,callback:F,priorityLevel:z,startTime:te,expirationTime:Ee,sortIndex:-1},te>ge?(z.sortIndex=te,e(h,z),i(m)===null&&z===i(h)&&(D?(w(B),B=-1):D=!0,Y(P,te-ge))):(z.sortIndex=Ee,e(m,z),b||M||(b=!0,L||(L=!0,Z()))),z},s.unstable_shouldYield=k,s.unstable_wrapCallback=function(z){var F=g;return function(){var te=g;g=F;try{return z.apply(this,arguments)}finally{g=te}}}})(Sd)),Sd}var $g;function hM(){return $g||($g=1,xd.exports=dM()),xd.exports}var Md={exports:{}},In={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var e_;function pM(){if(e_)return In;e_=1;var s=Kh();function e(m){var h="https://react.dev/errors/"+m;if(1<arguments.length){h+="?args[]="+encodeURIComponent(arguments[1]);for(var _=2;_<arguments.length;_++)h+="&args[]="+encodeURIComponent(arguments[_])}return"Minified React error #"+m+"; visit "+h+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var r={d:{f:i,r:function(){throw Error(e(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(m,h,_){var x=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:x==null?null:""+x,children:m,containerInfo:h,implementation:_}}var d=s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function p(m,h){if(m==="font")return"";if(typeof h=="string")return h==="use-credentials"?h:""}return In.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=r,In.createPortal=function(m,h){var _=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!h||h.nodeType!==1&&h.nodeType!==9&&h.nodeType!==11)throw Error(e(299));return c(m,h,null,_)},In.flushSync=function(m){var h=d.T,_=r.p;try{if(d.T=null,r.p=2,m)return m()}finally{d.T=h,r.p=_,r.d.f()}},In.preconnect=function(m,h){typeof m=="string"&&(h?(h=h.crossOrigin,h=typeof h=="string"?h==="use-credentials"?h:"":void 0):h=null,r.d.C(m,h))},In.prefetchDNS=function(m){typeof m=="string"&&r.d.D(m)},In.preinit=function(m,h){if(typeof m=="string"&&h&&typeof h.as=="string"){var _=h.as,x=p(_,h.crossOrigin),g=typeof h.integrity=="string"?h.integrity:void 0,M=typeof h.fetchPriority=="string"?h.fetchPriority:void 0;_==="style"?r.d.S(m,typeof h.precedence=="string"?h.precedence:void 0,{crossOrigin:x,integrity:g,fetchPriority:M}):_==="script"&&r.d.X(m,{crossOrigin:x,integrity:g,fetchPriority:M,nonce:typeof h.nonce=="string"?h.nonce:void 0})}},In.preinitModule=function(m,h){if(typeof m=="string")if(typeof h=="object"&&h!==null){if(h.as==null||h.as==="script"){var _=p(h.as,h.crossOrigin);r.d.M(m,{crossOrigin:_,integrity:typeof h.integrity=="string"?h.integrity:void 0,nonce:typeof h.nonce=="string"?h.nonce:void 0})}}else h==null&&r.d.M(m)},In.preload=function(m,h){if(typeof m=="string"&&typeof h=="object"&&h!==null&&typeof h.as=="string"){var _=h.as,x=p(_,h.crossOrigin);r.d.L(m,_,{crossOrigin:x,integrity:typeof h.integrity=="string"?h.integrity:void 0,nonce:typeof h.nonce=="string"?h.nonce:void 0,type:typeof h.type=="string"?h.type:void 0,fetchPriority:typeof h.fetchPriority=="string"?h.fetchPriority:void 0,referrerPolicy:typeof h.referrerPolicy=="string"?h.referrerPolicy:void 0,imageSrcSet:typeof h.imageSrcSet=="string"?h.imageSrcSet:void 0,imageSizes:typeof h.imageSizes=="string"?h.imageSizes:void 0,media:typeof h.media=="string"?h.media:void 0})}},In.preloadModule=function(m,h){if(typeof m=="string")if(h){var _=p(h.as,h.crossOrigin);r.d.m(m,{as:typeof h.as=="string"&&h.as!=="script"?h.as:void 0,crossOrigin:_,integrity:typeof h.integrity=="string"?h.integrity:void 0})}else r.d.m(m)},In.requestFormReset=function(m){r.d.r(m)},In.unstable_batchedUpdates=function(m,h){return m(h)},In.useFormState=function(m,h,_){return d.H.useFormState(m,h,_)},In.useFormStatus=function(){return d.H.useHostTransitionStatus()},In.version="19.2.0",In}var t_;function mM(){if(t_)return Md.exports;t_=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(e){console.error(e)}}return s(),Md.exports=pM(),Md.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n_;function gM(){if(n_)return Vo;n_=1;var s=hM(),e=Kh(),i=mM();function r(t){var n="https://react.dev/errors/"+t;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function c(t){var n=t,a=t;if(t.alternate)for(;n.return;)n=n.return;else{t=n;do n=t,(n.flags&4098)!==0&&(a=n.return),t=n.return;while(t)}return n.tag===3?a:null}function d(t){if(t.tag===13){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function p(t){if(t.tag===31){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function m(t){if(c(t)!==t)throw Error(r(188))}function h(t){var n=t.alternate;if(!n){if(n=c(t),n===null)throw Error(r(188));return n!==t?null:t}for(var a=t,o=n;;){var u=a.return;if(u===null)break;var f=u.alternate;if(f===null){if(o=u.return,o!==null){a=o;continue}break}if(u.child===f.child){for(f=u.child;f;){if(f===a)return m(u),t;if(f===o)return m(u),n;f=f.sibling}throw Error(r(188))}if(a.return!==o.return)a=u,o=f;else{for(var v=!1,C=u.child;C;){if(C===a){v=!0,a=u,o=f;break}if(C===o){v=!0,o=u,a=f;break}C=C.sibling}if(!v){for(C=f.child;C;){if(C===a){v=!0,a=f,o=u;break}if(C===o){v=!0,o=f,a=u;break}C=C.sibling}if(!v)throw Error(r(189))}}if(a.alternate!==o)throw Error(r(190))}if(a.tag!==3)throw Error(r(188));return a.stateNode.current===a?t:n}function _(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t;for(t=t.child;t!==null;){if(n=_(t),n!==null)return n;t=t.sibling}return null}var x=Object.assign,g=Symbol.for("react.element"),M=Symbol.for("react.transitional.element"),b=Symbol.for("react.portal"),D=Symbol.for("react.fragment"),y=Symbol.for("react.strict_mode"),S=Symbol.for("react.profiler"),w=Symbol.for("react.consumer"),U=Symbol.for("react.context"),A=Symbol.for("react.forward_ref"),P=Symbol.for("react.suspense"),L=Symbol.for("react.suspense_list"),B=Symbol.for("react.memo"),T=Symbol.for("react.lazy"),N=Symbol.for("react.activity"),k=Symbol.for("react.memo_cache_sentinel"),G=Symbol.iterator;function Z(t){return t===null||typeof t!="object"?null:(t=G&&t[G]||t["@@iterator"],typeof t=="function"?t:null)}var ce=Symbol.for("react.client.reference");function le(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===ce?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case D:return"Fragment";case S:return"Profiler";case y:return"StrictMode";case P:return"Suspense";case L:return"SuspenseList";case N:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case b:return"Portal";case U:return t.displayName||"Context";case w:return(t._context.displayName||"Context")+".Consumer";case A:var n=t.render;return t=t.displayName,t||(t=n.displayName||n.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case B:return n=t.displayName||null,n!==null?n:le(t.type)||"Memo";case T:n=t._payload,t=t._init;try{return le(t(n))}catch{}}return null}var Y=Array.isArray,z=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,F=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,te={pending:!1,data:null,method:null,action:null},ge=[],Ee=-1;function I(t){return{current:t}}function J(t){0>Ee||(t.current=ge[Ee],ge[Ee]=null,Ee--)}function ye(t,n){Ee++,ge[Ee]=t.current,t.current=n}var Re=I(null),Ie=I(null),ae=I(null),xe=I(null);function Me(t,n){switch(ye(ae,n),ye(Ie,t),ye(Re,null),n.nodeType){case 9:case 11:t=(t=n.documentElement)&&(t=t.namespaceURI)?_g(t):0;break;default:if(t=n.tagName,n=n.namespaceURI)n=_g(n),t=vg(n,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}J(Re),ye(Re,t)}function He(){J(Re),J(Ie),J(ae)}function it(t){t.memoizedState!==null&&ye(xe,t);var n=Re.current,a=vg(n,t.type);n!==a&&(ye(Ie,t),ye(Re,a))}function Je(t){Ie.current===t&&(J(Re),J(Ie)),xe.current===t&&(J(xe),Bo._currentValue=te)}var Zt,ft;function xt(t){if(Zt===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);Zt=n&&n[1]||"",ft=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Zt+t+ft}var St=!1;function dt(t,n){if(!t||St)return"";St=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(n){var ve=function(){throw Error()};if(Object.defineProperty(ve.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(ve,[])}catch(ue){var oe=ue}Reflect.construct(t,[],ve)}else{try{ve.call()}catch(ue){oe=ue}t.call(ve.prototype)}}else{try{throw Error()}catch(ue){oe=ue}(ve=t())&&typeof ve.catch=="function"&&ve.catch(function(){})}}catch(ue){if(ue&&oe&&typeof ue.stack=="string")return[ue.stack,oe.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var f=o.DetermineComponentFrameRoot(),v=f[0],C=f[1];if(v&&C){var H=v.split(`
`),ee=C.split(`
`);for(u=o=0;o<H.length&&!H[o].includes("DetermineComponentFrameRoot");)o++;for(;u<ee.length&&!ee[u].includes("DetermineComponentFrameRoot");)u++;if(o===H.length||u===ee.length)for(o=H.length-1,u=ee.length-1;1<=o&&0<=u&&H[o]!==ee[u];)u--;for(;1<=o&&0<=u;o--,u--)if(H[o]!==ee[u]){if(o!==1||u!==1)do if(o--,u--,0>u||H[o]!==ee[u]){var pe=`
`+H[o].replace(" at new "," at ");return t.displayName&&pe.includes("<anonymous>")&&(pe=pe.replace("<anonymous>",t.displayName)),pe}while(1<=o&&0<=u);break}}}finally{St=!1,Error.prepareStackTrace=a}return(a=t?t.displayName||t.name:"")?xt(a):""}function an(t,n){switch(t.tag){case 26:case 27:case 5:return xt(t.type);case 16:return xt("Lazy");case 13:return t.child!==n&&n!==null?xt("Suspense Fallback"):xt("Suspense");case 19:return xt("SuspenseList");case 0:case 15:return dt(t.type,!1);case 11:return dt(t.type.render,!1);case 1:return dt(t.type,!0);case 31:return xt("Activity");default:return""}}function rn(t){try{var n="",a=null;do n+=an(t,a),a=t,t=t.return;while(t);return n}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var sn=Object.prototype.hasOwnProperty,dn=s.unstable_scheduleCallback,Wt=s.unstable_cancelCallback,on=s.unstable_shouldYield,q=s.unstable_requestPaint,Ft=s.unstable_now,wt=s.unstable_getCurrentPriorityLevel,O=s.unstable_ImmediatePriority,E=s.unstable_UserBlockingPriority,j=s.unstable_NormalPriority,re=s.unstable_LowPriority,de=s.unstable_IdlePriority,be=s.log,De=s.unstable_setDisableYieldValue,fe=null,he=null;function Ae(t){if(typeof be=="function"&&De(t),he&&typeof he.setStrictMode=="function")try{he.setStrictMode(fe,t)}catch{}}var ze=Math.clz32?Math.clz32:Ke,Le=Math.log,Ue=Math.LN2;function Ke(t){return t>>>=0,t===0?32:31-(Le(t)/Ue|0)|0}var je=256,at=262144,X=4194304;function Te(t){var n=t&42;if(n!==0)return n;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function me(t,n,a){var o=t.pendingLanes;if(o===0)return 0;var u=0,f=t.suspendedLanes,v=t.pingedLanes;t=t.warmLanes;var C=o&134217727;return C!==0?(o=C&~f,o!==0?u=Te(o):(v&=C,v!==0?u=Te(v):a||(a=C&~t,a!==0&&(u=Te(a))))):(C=o&~f,C!==0?u=Te(C):v!==0?u=Te(v):a||(a=o&~t,a!==0&&(u=Te(a)))),u===0?0:n!==0&&n!==u&&(n&f)===0&&(f=u&-u,a=n&-n,f>=a||f===32&&(a&4194048)!==0)?n:u}function Ce(t,n){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&n)===0}function Be(t,n){switch(t){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Se(){var t=X;return X<<=1,(X&62914560)===0&&(X=4194304),t}function qe(t){for(var n=[],a=0;31>a;a++)n.push(t);return n}function Ve(t,n){t.pendingLanes|=n,n!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function Jt(t,n,a,o,u,f){var v=t.pendingLanes;t.pendingLanes=a,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=a,t.entangledLanes&=a,t.errorRecoveryDisabledLanes&=a,t.shellSuspendCounter=0;var C=t.entanglements,H=t.expirationTimes,ee=t.hiddenUpdates;for(a=v&~a;0<a;){var pe=31-ze(a),ve=1<<pe;C[pe]=0,H[pe]=-1;var oe=ee[pe];if(oe!==null)for(ee[pe]=null,pe=0;pe<oe.length;pe++){var ue=oe[pe];ue!==null&&(ue.lane&=-536870913)}a&=~ve}o!==0&&Nt(t,o,0),f!==0&&u===0&&t.tag!==0&&(t.suspendedLanes|=f&~(v&~n))}function Nt(t,n,a){t.pendingLanes|=n,t.suspendedLanes&=~n;var o=31-ze(n);t.entangledLanes|=n,t.entanglements[o]=t.entanglements[o]|1073741824|a&261930}function ei(t,n){var a=t.entangledLanes|=n;for(t=t.entanglements;a;){var o=31-ze(a),u=1<<o;u&n|t[o]&n&&(t[o]|=n),a&=~u}}function ti(t,n){var a=n&-n;return a=(a&42)!==0?1:Qs(a),(a&(t.suspendedLanes|n))!==0?0:a}function Qs(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function Js(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function js(){var t=F.p;return t!==0?t:(t=window.event,t===void 0?32:Gg(t.type))}function kr(t,n){var a=F.p;try{return F.p=t,n()}finally{F.p=a}}var Ii=Math.random().toString(36).slice(2),mn="__reactFiber$"+Ii,Cn="__reactProps$"+Ii,qn="__reactContainer$"+Ii,cr="__reactEvents$"+Ii,al="__reactListeners$"+Ii,rl="__reactHandles$"+Ii,ur="__reactResources$"+Ii,Ra="__reactMarker$"+Ii;function Ca(t){delete t[mn],delete t[Cn],delete t[cr],delete t[al],delete t[rl]}function ji(t){var n=t[mn];if(n)return n;for(var a=t.parentNode;a;){if(n=a[qn]||a[mn]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(t=Tg(t);t!==null;){if(a=t[mn])return a;t=Tg(t)}return n}t=a,a=t.parentNode}return null}function $i(t){if(t=t[mn]||t[qn]){var n=t.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return t}return null}function fr(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t.stateNode;throw Error(r(33))}function wa(t){var n=t[ur];return n||(n=t[ur]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function gn(t){t[Ra]=!0}var sl=new Set,R={};function W(t,n){se(t,n),se(t+"Capture",n)}function se(t,n){for(R[t]=n,t=0;t<n.length;t++)sl.add(n[t])}var ne=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),ie={},Oe={};function Ge(t){return sn.call(Oe,t)?!0:sn.call(ie,t)?!1:ne.test(t)?Oe[t]=!0:(ie[t]=!0,!1)}function Ne(t,n,a){if(Ge(n))if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":t.removeAttribute(n);return;case"boolean":var o=n.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){t.removeAttribute(n);return}}t.setAttribute(n,""+a)}}function Xe(t,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttribute(n,""+a)}}function ke(t,n,a,o){if(o===null)t.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(a);return}t.setAttributeNS(n,a,""+o)}}function $e(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function ot(t){var n=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function Ze(t,n,a){var o=Object.getOwnPropertyDescriptor(t.constructor.prototype,n);if(!t.hasOwnProperty(n)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var u=o.get,f=o.set;return Object.defineProperty(t,n,{configurable:!0,get:function(){return u.call(this)},set:function(v){a=""+v,f.call(this,v)}}),Object.defineProperty(t,n,{enumerable:o.enumerable}),{getValue:function(){return a},setValue:function(v){a=""+v},stopTracking:function(){t._valueTracker=null,delete t[n]}}}}function At(t){if(!t._valueTracker){var n=ot(t)?"checked":"value";t._valueTracker=Ze(t,n,""+t[n])}}function jt(t){if(!t)return!1;var n=t._valueTracker;if(!n)return!0;var a=n.getValue(),o="";return t&&(o=ot(t)?t.checked?"true":"false":t.value),t=o,t!==a?(n.setValue(t),!0):!1}function kt(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var Lt=/[\n"\\]/g;function Ot(t){return t.replace(Lt,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function Fe(t,n,a,o,u,f,v,C){t.name="",v!=null&&typeof v!="function"&&typeof v!="symbol"&&typeof v!="boolean"?t.type=v:t.removeAttribute("type"),n!=null?v==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+$e(n)):t.value!==""+$e(n)&&(t.value=""+$e(n)):v!=="submit"&&v!=="reset"||t.removeAttribute("value"),n!=null?ht(t,v,$e(n)):a!=null?ht(t,v,$e(a)):o!=null&&t.removeAttribute("value"),u==null&&f!=null&&(t.defaultChecked=!!f),u!=null&&(t.checked=u&&typeof u!="function"&&typeof u!="symbol"),C!=null&&typeof C!="function"&&typeof C!="symbol"&&typeof C!="boolean"?t.name=""+$e(C):t.removeAttribute("name")}function Pn(t,n,a,o,u,f,v,C){if(f!=null&&typeof f!="function"&&typeof f!="symbol"&&typeof f!="boolean"&&(t.type=f),n!=null||a!=null){if(!(f!=="submit"&&f!=="reset"||n!=null)){At(t);return}a=a!=null?""+$e(a):"",n=n!=null?""+$e(n):a,C||n===t.value||(t.value=n),t.defaultValue=n}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,t.checked=C?t.checked:!!o,t.defaultChecked=!!o,v!=null&&typeof v!="function"&&typeof v!="symbol"&&typeof v!="boolean"&&(t.name=v),At(t)}function ht(t,n,a){n==="number"&&kt(t.ownerDocument)===t||t.defaultValue===""+a||(t.defaultValue=""+a)}function yn(t,n,a,o){if(t=t.options,n){n={};for(var u=0;u<a.length;u++)n["$"+a[u]]=!0;for(a=0;a<t.length;a++)u=n.hasOwnProperty("$"+t[a].value),t[a].selected!==u&&(t[a].selected=u),u&&o&&(t[a].defaultSelected=!0)}else{for(a=""+$e(a),n=null,u=0;u<t.length;u++){if(t[u].value===a){t[u].selected=!0,o&&(t[u].defaultSelected=!0);return}n!==null||t[u].disabled||(n=t[u])}n!==null&&(n.selected=!0)}}function ni(t,n,a){if(n!=null&&(n=""+$e(n),n!==t.value&&(t.value=n),a==null)){t.defaultValue!==n&&(t.defaultValue=n);return}t.defaultValue=a!=null?""+$e(a):""}function Ri(t,n,a,o){if(n==null){if(o!=null){if(a!=null)throw Error(r(92));if(Y(o)){if(1<o.length)throw Error(r(93));o=o[0]}a=o}a==null&&(a=""),n=a}a=$e(n),t.defaultValue=a,o=t.textContent,o===a&&o!==""&&o!==null&&(t.value=o),At(t)}function ii(t,n){if(n){var a=t.firstChild;if(a&&a===t.lastChild&&a.nodeType===3){a.nodeValue=n;return}}t.textContent=n}var Pt=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function $t(t,n,a){var o=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?o?t.setProperty(n,""):n==="float"?t.cssFloat="":t[n]="":o?t.setProperty(n,a):typeof a!="number"||a===0||Pt.has(n)?n==="float"?t.cssFloat=a:t[n]=(""+a).trim():t[n]=a+"px"}function Ci(t,n,a){if(n!=null&&typeof n!="object")throw Error(r(62));if(t=t.style,a!=null){for(var o in a)!a.hasOwnProperty(o)||n!=null&&n.hasOwnProperty(o)||(o.indexOf("--")===0?t.setProperty(o,""):o==="float"?t.cssFloat="":t[o]="");for(var u in n)o=n[u],n.hasOwnProperty(u)&&a[u]!==o&&$t(t,u,o)}else for(var f in n)n.hasOwnProperty(f)&&$t(t,f,n[f])}function Ut(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Bi=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Da=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function dr(t){return Da.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function ea(){}var du=null;function hu(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Xr=null,Wr=null;function gp(t){var n=$i(t);if(n&&(t=n.stateNode)){var a=t[Cn]||null;e:switch(t=n.stateNode,n.type){case"input":if(Fe(t,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=t;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+Ot(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var o=a[n];if(o!==t&&o.form===t.form){var u=o[Cn]||null;if(!u)throw Error(r(90));Fe(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(n=0;n<a.length;n++)o=a[n],o.form===t.form&&jt(o)}break e;case"textarea":ni(t,a.value,a.defaultValue);break e;case"select":n=a.value,n!=null&&yn(t,!!a.multiple,n,!1)}}}var pu=!1;function _p(t,n,a){if(pu)return t(n,a);pu=!0;try{var o=t(n);return o}finally{if(pu=!1,(Xr!==null||Wr!==null)&&(Yl(),Xr&&(n=Xr,t=Wr,Wr=Xr=null,gp(n),t)))for(n=0;n<t.length;n++)gp(t[n])}}function $s(t,n){var a=t.stateNode;if(a===null)return null;var o=a[Cn]||null;if(o===null)return null;a=o[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(t=t.type,o=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!o;break e;default:t=!1}if(t)return null;if(a&&typeof a!="function")throw Error(r(231,n,typeof a));return a}var ta=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),mu=!1;if(ta)try{var eo={};Object.defineProperty(eo,"passive",{get:function(){mu=!0}}),window.addEventListener("test",eo,eo),window.removeEventListener("test",eo,eo)}catch{mu=!1}var Ua=null,gu=null,ol=null;function vp(){if(ol)return ol;var t,n=gu,a=n.length,o,u="value"in Ua?Ua.value:Ua.textContent,f=u.length;for(t=0;t<a&&n[t]===u[t];t++);var v=a-t;for(o=1;o<=v&&n[a-o]===u[f-o];o++);return ol=u.slice(t,1<o?1-o:void 0)}function ll(t){var n=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&n===13&&(t=13)):t=n,t===10&&(t=13),32<=t||t===13?t:0}function cl(){return!0}function xp(){return!1}function Yn(t){function n(a,o,u,f,v){this._reactName=a,this._targetInst=u,this.type=o,this.nativeEvent=f,this.target=v,this.currentTarget=null;for(var C in t)t.hasOwnProperty(C)&&(a=t[C],this[C]=a?a(f):f[C]);return this.isDefaultPrevented=(f.defaultPrevented!=null?f.defaultPrevented:f.returnValue===!1)?cl:xp,this.isPropagationStopped=xp,this}return x(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=cl)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=cl)},persist:function(){},isPersistent:cl}),n}var hr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ul=Yn(hr),to=x({},hr,{view:0,detail:0}),rx=Yn(to),_u,vu,no,fl=x({},to,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Su,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==no&&(no&&t.type==="mousemove"?(_u=t.screenX-no.screenX,vu=t.screenY-no.screenY):vu=_u=0,no=t),_u)},movementY:function(t){return"movementY"in t?t.movementY:vu}}),Sp=Yn(fl),sx=x({},fl,{dataTransfer:0}),ox=Yn(sx),lx=x({},to,{relatedTarget:0}),xu=Yn(lx),cx=x({},hr,{animationName:0,elapsedTime:0,pseudoElement:0}),ux=Yn(cx),fx=x({},hr,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),dx=Yn(fx),hx=x({},hr,{data:0}),Mp=Yn(hx),px={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},mx={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},gx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function _x(t){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(t):(t=gx[t])?!!n[t]:!1}function Su(){return _x}var vx=x({},to,{key:function(t){if(t.key){var n=px[t.key]||t.key;if(n!=="Unidentified")return n}return t.type==="keypress"?(t=ll(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?mx[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Su,charCode:function(t){return t.type==="keypress"?ll(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?ll(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),xx=Yn(vx),Sx=x({},fl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),yp=Yn(Sx),Mx=x({},to,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Su}),yx=Yn(Mx),Ex=x({},hr,{propertyName:0,elapsedTime:0,pseudoElement:0}),bx=Yn(Ex),Tx=x({},fl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Ax=Yn(Tx),Rx=x({},hr,{newState:0,oldState:0}),Cx=Yn(Rx),wx=[9,13,27,32],Mu=ta&&"CompositionEvent"in window,io=null;ta&&"documentMode"in document&&(io=document.documentMode);var Dx=ta&&"TextEvent"in window&&!io,Ep=ta&&(!Mu||io&&8<io&&11>=io),bp=" ",Tp=!1;function Ap(t,n){switch(t){case"keyup":return wx.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Rp(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var qr=!1;function Ux(t,n){switch(t){case"compositionend":return Rp(n);case"keypress":return n.which!==32?null:(Tp=!0,bp);case"textInput":return t=n.data,t===bp&&Tp?null:t;default:return null}}function Nx(t,n){if(qr)return t==="compositionend"||!Mu&&Ap(t,n)?(t=vp(),ol=gu=Ua=null,qr=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Ep&&n.locale!=="ko"?null:n.data;default:return null}}var Lx={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Cp(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n==="input"?!!Lx[t.type]:n==="textarea"}function wp(t,n,a,o){Xr?Wr?Wr.push(o):Wr=[o]:Xr=o,n=ec(n,"onChange"),0<n.length&&(a=new ul("onChange","change",null,a,o),t.push({event:a,listeners:n}))}var ao=null,ro=null;function Ox(t){fg(t,0)}function dl(t){var n=fr(t);if(jt(n))return t}function Dp(t,n){if(t==="change")return n}var Up=!1;if(ta){var yu;if(ta){var Eu="oninput"in document;if(!Eu){var Np=document.createElement("div");Np.setAttribute("oninput","return;"),Eu=typeof Np.oninput=="function"}yu=Eu}else yu=!1;Up=yu&&(!document.documentMode||9<document.documentMode)}function Lp(){ao&&(ao.detachEvent("onpropertychange",Op),ro=ao=null)}function Op(t){if(t.propertyName==="value"&&dl(ro)){var n=[];wp(n,ro,t,hu(t)),_p(Ox,n)}}function Px(t,n,a){t==="focusin"?(Lp(),ao=n,ro=a,ao.attachEvent("onpropertychange",Op)):t==="focusout"&&Lp()}function Ix(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return dl(ro)}function Bx(t,n){if(t==="click")return dl(n)}function zx(t,n){if(t==="input"||t==="change")return dl(n)}function Fx(t,n){return t===n&&(t!==0||1/t===1/n)||t!==t&&n!==n}var ai=typeof Object.is=="function"?Object.is:Fx;function so(t,n){if(ai(t,n))return!0;if(typeof t!="object"||t===null||typeof n!="object"||n===null)return!1;var a=Object.keys(t),o=Object.keys(n);if(a.length!==o.length)return!1;for(o=0;o<a.length;o++){var u=a[o];if(!sn.call(n,u)||!ai(t[u],n[u]))return!1}return!0}function Pp(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Ip(t,n){var a=Pp(t);t=0;for(var o;a;){if(a.nodeType===3){if(o=t+a.textContent.length,t<=n&&o>=n)return{node:a,offset:n-t};t=o}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=Pp(a)}}function Bp(t,n){return t&&n?t===n?!0:t&&t.nodeType===3?!1:n&&n.nodeType===3?Bp(t,n.parentNode):"contains"in t?t.contains(n):t.compareDocumentPosition?!!(t.compareDocumentPosition(n)&16):!1:!1}function zp(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var n=kt(t.document);n instanceof t.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)t=n.contentWindow;else break;n=kt(t.document)}return n}function bu(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n&&(n==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||n==="textarea"||t.contentEditable==="true")}var Hx=ta&&"documentMode"in document&&11>=document.documentMode,Yr=null,Tu=null,oo=null,Au=!1;function Fp(t,n,a){var o=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Au||Yr==null||Yr!==kt(o)||(o=Yr,"selectionStart"in o&&bu(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),oo&&so(oo,o)||(oo=o,o=ec(Tu,"onSelect"),0<o.length&&(n=new ul("onSelect","select",null,n,a),t.push({event:n,listeners:o}),n.target=Yr)))}function pr(t,n){var a={};return a[t.toLowerCase()]=n.toLowerCase(),a["Webkit"+t]="webkit"+n,a["Moz"+t]="moz"+n,a}var Zr={animationend:pr("Animation","AnimationEnd"),animationiteration:pr("Animation","AnimationIteration"),animationstart:pr("Animation","AnimationStart"),transitionrun:pr("Transition","TransitionRun"),transitionstart:pr("Transition","TransitionStart"),transitioncancel:pr("Transition","TransitionCancel"),transitionend:pr("Transition","TransitionEnd")},Ru={},Hp={};ta&&(Hp=document.createElement("div").style,"AnimationEvent"in window||(delete Zr.animationend.animation,delete Zr.animationiteration.animation,delete Zr.animationstart.animation),"TransitionEvent"in window||delete Zr.transitionend.transition);function mr(t){if(Ru[t])return Ru[t];if(!Zr[t])return t;var n=Zr[t],a;for(a in n)if(n.hasOwnProperty(a)&&a in Hp)return Ru[t]=n[a];return t}var Gp=mr("animationend"),Vp=mr("animationiteration"),kp=mr("animationstart"),Gx=mr("transitionrun"),Vx=mr("transitionstart"),kx=mr("transitioncancel"),Xp=mr("transitionend"),Wp=new Map,Cu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Cu.push("scrollEnd");function wi(t,n){Wp.set(t,n),W(n,[t])}var hl=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},mi=[],Kr=0,wu=0;function pl(){for(var t=Kr,n=wu=Kr=0;n<t;){var a=mi[n];mi[n++]=null;var o=mi[n];mi[n++]=null;var u=mi[n];mi[n++]=null;var f=mi[n];if(mi[n++]=null,o!==null&&u!==null){var v=o.pending;v===null?u.next=u:(u.next=v.next,v.next=u),o.pending=u}f!==0&&qp(a,u,f)}}function ml(t,n,a,o){mi[Kr++]=t,mi[Kr++]=n,mi[Kr++]=a,mi[Kr++]=o,wu|=o,t.lanes|=o,t=t.alternate,t!==null&&(t.lanes|=o)}function Du(t,n,a,o){return ml(t,n,a,o),gl(t)}function gr(t,n){return ml(t,null,null,n),gl(t)}function qp(t,n,a){t.lanes|=a;var o=t.alternate;o!==null&&(o.lanes|=a);for(var u=!1,f=t.return;f!==null;)f.childLanes|=a,o=f.alternate,o!==null&&(o.childLanes|=a),f.tag===22&&(t=f.stateNode,t===null||t._visibility&1||(u=!0)),t=f,f=f.return;return t.tag===3?(f=t.stateNode,u&&n!==null&&(u=31-ze(a),t=f.hiddenUpdates,o=t[u],o===null?t[u]=[n]:o.push(n),n.lane=a|536870912),f):null}function gl(t){if(50<Do)throw Do=0,Hf=null,Error(r(185));for(var n=t.return;n!==null;)t=n,n=t.return;return t.tag===3?t.stateNode:null}var Qr={};function Xx(t,n,a,o){this.tag=t,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ri(t,n,a,o){return new Xx(t,n,a,o)}function Uu(t){return t=t.prototype,!(!t||!t.isReactComponent)}function na(t,n){var a=t.alternate;return a===null?(a=ri(t.tag,n,t.key,t.mode),a.elementType=t.elementType,a.type=t.type,a.stateNode=t.stateNode,a.alternate=t,t.alternate=a):(a.pendingProps=n,a.type=t.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=t.flags&65011712,a.childLanes=t.childLanes,a.lanes=t.lanes,a.child=t.child,a.memoizedProps=t.memoizedProps,a.memoizedState=t.memoizedState,a.updateQueue=t.updateQueue,n=t.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=t.sibling,a.index=t.index,a.ref=t.ref,a.refCleanup=t.refCleanup,a}function Yp(t,n){t.flags&=65011714;var a=t.alternate;return a===null?(t.childLanes=0,t.lanes=n,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=a.childLanes,t.lanes=a.lanes,t.child=a.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=a.memoizedProps,t.memoizedState=a.memoizedState,t.updateQueue=a.updateQueue,t.type=a.type,n=a.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t}function _l(t,n,a,o,u,f){var v=0;if(o=t,typeof t=="function")Uu(t)&&(v=1);else if(typeof t=="string")v=KS(t,a,Re.current)?26:t==="html"||t==="head"||t==="body"?27:5;else e:switch(t){case N:return t=ri(31,a,n,u),t.elementType=N,t.lanes=f,t;case D:return _r(a.children,u,f,n);case y:v=8,u|=24;break;case S:return t=ri(12,a,n,u|2),t.elementType=S,t.lanes=f,t;case P:return t=ri(13,a,n,u),t.elementType=P,t.lanes=f,t;case L:return t=ri(19,a,n,u),t.elementType=L,t.lanes=f,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case U:v=10;break e;case w:v=9;break e;case A:v=11;break e;case B:v=14;break e;case T:v=16,o=null;break e}v=29,a=Error(r(130,t===null?"null":typeof t,"")),o=null}return n=ri(v,a,n,u),n.elementType=t,n.type=o,n.lanes=f,n}function _r(t,n,a,o){return t=ri(7,t,o,n),t.lanes=a,t}function Nu(t,n,a){return t=ri(6,t,null,n),t.lanes=a,t}function Zp(t){var n=ri(18,null,null,0);return n.stateNode=t,n}function Lu(t,n,a){return n=ri(4,t.children!==null?t.children:[],t.key,n),n.lanes=a,n.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},n}var Kp=new WeakMap;function gi(t,n){if(typeof t=="object"&&t!==null){var a=Kp.get(t);return a!==void 0?a:(n={value:t,source:n,stack:rn(n)},Kp.set(t,n),n)}return{value:t,source:n,stack:rn(n)}}var Jr=[],jr=0,vl=null,lo=0,_i=[],vi=0,Na=null,zi=1,Fi="";function ia(t,n){Jr[jr++]=lo,Jr[jr++]=vl,vl=t,lo=n}function Qp(t,n,a){_i[vi++]=zi,_i[vi++]=Fi,_i[vi++]=Na,Na=t;var o=zi;t=Fi;var u=32-ze(o)-1;o&=~(1<<u),a+=1;var f=32-ze(n)+u;if(30<f){var v=u-u%5;f=(o&(1<<v)-1).toString(32),o>>=v,u-=v,zi=1<<32-ze(n)+u|a<<u|o,Fi=f+t}else zi=1<<f|a<<u|o,Fi=t}function Ou(t){t.return!==null&&(ia(t,1),Qp(t,1,0))}function Pu(t){for(;t===vl;)vl=Jr[--jr],Jr[jr]=null,lo=Jr[--jr],Jr[jr]=null;for(;t===Na;)Na=_i[--vi],_i[vi]=null,Fi=_i[--vi],_i[vi]=null,zi=_i[--vi],_i[vi]=null}function Jp(t,n){_i[vi++]=zi,_i[vi++]=Fi,_i[vi++]=Na,zi=n.id,Fi=n.overflow,Na=t}var wn=null,Kt=null,Mt=!1,La=null,xi=!1,Iu=Error(r(519));function Oa(t){var n=Error(r(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw co(gi(n,t)),Iu}function jp(t){var n=t.stateNode,a=t.type,o=t.memoizedProps;switch(n[mn]=t,n[Cn]=o,a){case"dialog":mt("cancel",n),mt("close",n);break;case"iframe":case"object":case"embed":mt("load",n);break;case"video":case"audio":for(a=0;a<No.length;a++)mt(No[a],n);break;case"source":mt("error",n);break;case"img":case"image":case"link":mt("error",n),mt("load",n);break;case"details":mt("toggle",n);break;case"input":mt("invalid",n),Pn(n,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":mt("invalid",n);break;case"textarea":mt("invalid",n),Ri(n,o.value,o.defaultValue,o.children)}a=o.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||o.suppressHydrationWarning===!0||mg(n.textContent,a)?(o.popover!=null&&(mt("beforetoggle",n),mt("toggle",n)),o.onScroll!=null&&mt("scroll",n),o.onScrollEnd!=null&&mt("scrollend",n),o.onClick!=null&&(n.onclick=ea),n=!0):n=!1,n||Oa(t,!0)}function $p(t){for(wn=t.return;wn;)switch(wn.tag){case 5:case 31:case 13:xi=!1;return;case 27:case 3:xi=!0;return;default:wn=wn.return}}function $r(t){if(t!==wn)return!1;if(!Mt)return $p(t),Mt=!0,!1;var n=t.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=t.type,a=!(a!=="form"&&a!=="button")||td(t.type,t.memoizedProps)),a=!a),a&&Kt&&Oa(t),$p(t),n===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(317));Kt=bg(t)}else if(n===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(317));Kt=bg(t)}else n===27?(n=Kt,Za(t.type)?(t=sd,sd=null,Kt=t):Kt=n):Kt=wn?Mi(t.stateNode.nextSibling):null;return!0}function vr(){Kt=wn=null,Mt=!1}function Bu(){var t=La;return t!==null&&(Jn===null?Jn=t:Jn.push.apply(Jn,t),La=null),t}function co(t){La===null?La=[t]:La.push(t)}var zu=I(null),xr=null,aa=null;function Pa(t,n,a){ye(zu,n._currentValue),n._currentValue=a}function ra(t){t._currentValue=zu.current,J(zu)}function Fu(t,n,a){for(;t!==null;){var o=t.alternate;if((t.childLanes&n)!==n?(t.childLanes|=n,o!==null&&(o.childLanes|=n)):o!==null&&(o.childLanes&n)!==n&&(o.childLanes|=n),t===a)break;t=t.return}}function Hu(t,n,a,o){var u=t.child;for(u!==null&&(u.return=t);u!==null;){var f=u.dependencies;if(f!==null){var v=u.child;f=f.firstContext;e:for(;f!==null;){var C=f;f=u;for(var H=0;H<n.length;H++)if(C.context===n[H]){f.lanes|=a,C=f.alternate,C!==null&&(C.lanes|=a),Fu(f.return,a,t),o||(v=null);break e}f=C.next}}else if(u.tag===18){if(v=u.return,v===null)throw Error(r(341));v.lanes|=a,f=v.alternate,f!==null&&(f.lanes|=a),Fu(v,a,t),v=null}else v=u.child;if(v!==null)v.return=u;else for(v=u;v!==null;){if(v===t){v=null;break}if(u=v.sibling,u!==null){u.return=v.return,v=u;break}v=v.return}u=v}}function es(t,n,a,o){t=null;for(var u=n,f=!1;u!==null;){if(!f){if((u.flags&524288)!==0)f=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var v=u.alternate;if(v===null)throw Error(r(387));if(v=v.memoizedProps,v!==null){var C=u.type;ai(u.pendingProps.value,v.value)||(t!==null?t.push(C):t=[C])}}else if(u===xe.current){if(v=u.alternate,v===null)throw Error(r(387));v.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(t!==null?t.push(Bo):t=[Bo])}u=u.return}t!==null&&Hu(n,t,a,o),n.flags|=262144}function xl(t){for(t=t.firstContext;t!==null;){if(!ai(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Sr(t){xr=t,aa=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function Dn(t){return em(xr,t)}function Sl(t,n){return xr===null&&Sr(t),em(t,n)}function em(t,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},aa===null){if(t===null)throw Error(r(308));aa=n,t.dependencies={lanes:0,firstContext:n},t.flags|=524288}else aa=aa.next=n;return a}var Wx=typeof AbortController<"u"?AbortController:function(){var t=[],n=this.signal={aborted:!1,addEventListener:function(a,o){t.push(o)}};this.abort=function(){n.aborted=!0,t.forEach(function(a){return a()})}},qx=s.unstable_scheduleCallback,Yx=s.unstable_NormalPriority,_n={$$typeof:U,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Gu(){return{controller:new Wx,data:new Map,refCount:0}}function uo(t){t.refCount--,t.refCount===0&&qx(Yx,function(){t.controller.abort()})}var fo=null,Vu=0,ts=0,ns=null;function Zx(t,n){if(fo===null){var a=fo=[];Vu=0,ts=qf(),ns={status:"pending",value:void 0,then:function(o){a.push(o)}}}return Vu++,n.then(tm,tm),n}function tm(){if(--Vu===0&&fo!==null){ns!==null&&(ns.status="fulfilled");var t=fo;fo=null,ts=0,ns=null;for(var n=0;n<t.length;n++)(0,t[n])()}}function Kx(t,n){var a=[],o={status:"pending",value:null,reason:null,then:function(u){a.push(u)}};return t.then(function(){o.status="fulfilled",o.value=n;for(var u=0;u<a.length;u++)(0,a[u])(n)},function(u){for(o.status="rejected",o.reason=u,u=0;u<a.length;u++)(0,a[u])(void 0)}),o}var nm=z.S;z.S=function(t,n){F0=Ft(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&Zx(t,n),nm!==null&&nm(t,n)};var Mr=I(null);function ku(){var t=Mr.current;return t!==null?t:Xt.pooledCache}function Ml(t,n){n===null?ye(Mr,Mr.current):ye(Mr,n.pool)}function im(){var t=ku();return t===null?null:{parent:_n._currentValue,pool:t}}var is=Error(r(460)),Xu=Error(r(474)),yl=Error(r(542)),El={then:function(){}};function am(t){return t=t.status,t==="fulfilled"||t==="rejected"}function rm(t,n,a){switch(a=t[a],a===void 0?t.push(n):a!==n&&(n.then(ea,ea),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,om(t),t;default:if(typeof n.status=="string")n.then(ea,ea);else{if(t=Xt,t!==null&&100<t.shellSuspendCounter)throw Error(r(482));t=n,t.status="pending",t.then(function(o){if(n.status==="pending"){var u=n;u.status="fulfilled",u.value=o}},function(o){if(n.status==="pending"){var u=n;u.status="rejected",u.reason=o}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,om(t),t}throw Er=n,is}}function yr(t){try{var n=t._init;return n(t._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(Er=a,is):a}}var Er=null;function sm(){if(Er===null)throw Error(r(459));var t=Er;return Er=null,t}function om(t){if(t===is||t===yl)throw Error(r(483))}var as=null,ho=0;function bl(t){var n=ho;return ho+=1,as===null&&(as=[]),rm(as,t,n)}function po(t,n){n=n.props.ref,t.ref=n!==void 0?n:null}function Tl(t,n){throw n.$$typeof===g?Error(r(525)):(t=Object.prototype.toString.call(n),Error(r(31,t==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":t)))}function lm(t){function n(K,V){if(t){var $=K.deletions;$===null?(K.deletions=[V],K.flags|=16):$.push(V)}}function a(K,V){if(!t)return null;for(;V!==null;)n(K,V),V=V.sibling;return null}function o(K){for(var V=new Map;K!==null;)K.key!==null?V.set(K.key,K):V.set(K.index,K),K=K.sibling;return V}function u(K,V){return K=na(K,V),K.index=0,K.sibling=null,K}function f(K,V,$){return K.index=$,t?($=K.alternate,$!==null?($=$.index,$<V?(K.flags|=67108866,V):$):(K.flags|=67108866,V)):(K.flags|=1048576,V)}function v(K){return t&&K.alternate===null&&(K.flags|=67108866),K}function C(K,V,$,_e){return V===null||V.tag!==6?(V=Nu($,K.mode,_e),V.return=K,V):(V=u(V,$),V.return=K,V)}function H(K,V,$,_e){var et=$.type;return et===D?pe(K,V,$.props.children,_e,$.key):V!==null&&(V.elementType===et||typeof et=="object"&&et!==null&&et.$$typeof===T&&yr(et)===V.type)?(V=u(V,$.props),po(V,$),V.return=K,V):(V=_l($.type,$.key,$.props,null,K.mode,_e),po(V,$),V.return=K,V)}function ee(K,V,$,_e){return V===null||V.tag!==4||V.stateNode.containerInfo!==$.containerInfo||V.stateNode.implementation!==$.implementation?(V=Lu($,K.mode,_e),V.return=K,V):(V=u(V,$.children||[]),V.return=K,V)}function pe(K,V,$,_e,et){return V===null||V.tag!==7?(V=_r($,K.mode,_e,et),V.return=K,V):(V=u(V,$),V.return=K,V)}function ve(K,V,$){if(typeof V=="string"&&V!==""||typeof V=="number"||typeof V=="bigint")return V=Nu(""+V,K.mode,$),V.return=K,V;if(typeof V=="object"&&V!==null){switch(V.$$typeof){case M:return $=_l(V.type,V.key,V.props,null,K.mode,$),po($,V),$.return=K,$;case b:return V=Lu(V,K.mode,$),V.return=K,V;case T:return V=yr(V),ve(K,V,$)}if(Y(V)||Z(V))return V=_r(V,K.mode,$,null),V.return=K,V;if(typeof V.then=="function")return ve(K,bl(V),$);if(V.$$typeof===U)return ve(K,Sl(K,V),$);Tl(K,V)}return null}function oe(K,V,$,_e){var et=V!==null?V.key:null;if(typeof $=="string"&&$!==""||typeof $=="number"||typeof $=="bigint")return et!==null?null:C(K,V,""+$,_e);if(typeof $=="object"&&$!==null){switch($.$$typeof){case M:return $.key===et?H(K,V,$,_e):null;case b:return $.key===et?ee(K,V,$,_e):null;case T:return $=yr($),oe(K,V,$,_e)}if(Y($)||Z($))return et!==null?null:pe(K,V,$,_e,null);if(typeof $.then=="function")return oe(K,V,bl($),_e);if($.$$typeof===U)return oe(K,V,Sl(K,$),_e);Tl(K,$)}return null}function ue(K,V,$,_e,et){if(typeof _e=="string"&&_e!==""||typeof _e=="number"||typeof _e=="bigint")return K=K.get($)||null,C(V,K,""+_e,et);if(typeof _e=="object"&&_e!==null){switch(_e.$$typeof){case M:return K=K.get(_e.key===null?$:_e.key)||null,H(V,K,_e,et);case b:return K=K.get(_e.key===null?$:_e.key)||null,ee(V,K,_e,et);case T:return _e=yr(_e),ue(K,V,$,_e,et)}if(Y(_e)||Z(_e))return K=K.get($)||null,pe(V,K,_e,et,null);if(typeof _e.then=="function")return ue(K,V,$,bl(_e),et);if(_e.$$typeof===U)return ue(K,V,$,Sl(V,_e),et);Tl(V,_e)}return null}function We(K,V,$,_e){for(var et=null,Rt=null,Ye=V,ct=V=0,_t=null;Ye!==null&&ct<$.length;ct++){Ye.index>ct?(_t=Ye,Ye=null):_t=Ye.sibling;var Ct=oe(K,Ye,$[ct],_e);if(Ct===null){Ye===null&&(Ye=_t);break}t&&Ye&&Ct.alternate===null&&n(K,Ye),V=f(Ct,V,ct),Rt===null?et=Ct:Rt.sibling=Ct,Rt=Ct,Ye=_t}if(ct===$.length)return a(K,Ye),Mt&&ia(K,ct),et;if(Ye===null){for(;ct<$.length;ct++)Ye=ve(K,$[ct],_e),Ye!==null&&(V=f(Ye,V,ct),Rt===null?et=Ye:Rt.sibling=Ye,Rt=Ye);return Mt&&ia(K,ct),et}for(Ye=o(Ye);ct<$.length;ct++)_t=ue(Ye,K,ct,$[ct],_e),_t!==null&&(t&&_t.alternate!==null&&Ye.delete(_t.key===null?ct:_t.key),V=f(_t,V,ct),Rt===null?et=_t:Rt.sibling=_t,Rt=_t);return t&&Ye.forEach(function($a){return n(K,$a)}),Mt&&ia(K,ct),et}function tt(K,V,$,_e){if($==null)throw Error(r(151));for(var et=null,Rt=null,Ye=V,ct=V=0,_t=null,Ct=$.next();Ye!==null&&!Ct.done;ct++,Ct=$.next()){Ye.index>ct?(_t=Ye,Ye=null):_t=Ye.sibling;var $a=oe(K,Ye,Ct.value,_e);if($a===null){Ye===null&&(Ye=_t);break}t&&Ye&&$a.alternate===null&&n(K,Ye),V=f($a,V,ct),Rt===null?et=$a:Rt.sibling=$a,Rt=$a,Ye=_t}if(Ct.done)return a(K,Ye),Mt&&ia(K,ct),et;if(Ye===null){for(;!Ct.done;ct++,Ct=$.next())Ct=ve(K,Ct.value,_e),Ct!==null&&(V=f(Ct,V,ct),Rt===null?et=Ct:Rt.sibling=Ct,Rt=Ct);return Mt&&ia(K,ct),et}for(Ye=o(Ye);!Ct.done;ct++,Ct=$.next())Ct=ue(Ye,K,ct,Ct.value,_e),Ct!==null&&(t&&Ct.alternate!==null&&Ye.delete(Ct.key===null?ct:Ct.key),V=f(Ct,V,ct),Rt===null?et=Ct:Rt.sibling=Ct,Rt=Ct);return t&&Ye.forEach(function(sM){return n(K,sM)}),Mt&&ia(K,ct),et}function Vt(K,V,$,_e){if(typeof $=="object"&&$!==null&&$.type===D&&$.key===null&&($=$.props.children),typeof $=="object"&&$!==null){switch($.$$typeof){case M:e:{for(var et=$.key;V!==null;){if(V.key===et){if(et=$.type,et===D){if(V.tag===7){a(K,V.sibling),_e=u(V,$.props.children),_e.return=K,K=_e;break e}}else if(V.elementType===et||typeof et=="object"&&et!==null&&et.$$typeof===T&&yr(et)===V.type){a(K,V.sibling),_e=u(V,$.props),po(_e,$),_e.return=K,K=_e;break e}a(K,V);break}else n(K,V);V=V.sibling}$.type===D?(_e=_r($.props.children,K.mode,_e,$.key),_e.return=K,K=_e):(_e=_l($.type,$.key,$.props,null,K.mode,_e),po(_e,$),_e.return=K,K=_e)}return v(K);case b:e:{for(et=$.key;V!==null;){if(V.key===et)if(V.tag===4&&V.stateNode.containerInfo===$.containerInfo&&V.stateNode.implementation===$.implementation){a(K,V.sibling),_e=u(V,$.children||[]),_e.return=K,K=_e;break e}else{a(K,V);break}else n(K,V);V=V.sibling}_e=Lu($,K.mode,_e),_e.return=K,K=_e}return v(K);case T:return $=yr($),Vt(K,V,$,_e)}if(Y($))return We(K,V,$,_e);if(Z($)){if(et=Z($),typeof et!="function")throw Error(r(150));return $=et.call($),tt(K,V,$,_e)}if(typeof $.then=="function")return Vt(K,V,bl($),_e);if($.$$typeof===U)return Vt(K,V,Sl(K,$),_e);Tl(K,$)}return typeof $=="string"&&$!==""||typeof $=="number"||typeof $=="bigint"?($=""+$,V!==null&&V.tag===6?(a(K,V.sibling),_e=u(V,$),_e.return=K,K=_e):(a(K,V),_e=Nu($,K.mode,_e),_e.return=K,K=_e),v(K)):a(K,V)}return function(K,V,$,_e){try{ho=0;var et=Vt(K,V,$,_e);return as=null,et}catch(Ye){if(Ye===is||Ye===yl)throw Ye;var Rt=ri(29,Ye,null,K.mode);return Rt.lanes=_e,Rt.return=K,Rt}finally{}}}var br=lm(!0),cm=lm(!1),Ia=!1;function Wu(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function qu(t,n){t=t.updateQueue,n.updateQueue===t&&(n.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function Ba(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function za(t,n,a){var o=t.updateQueue;if(o===null)return null;if(o=o.shared,(Dt&2)!==0){var u=o.pending;return u===null?n.next=n:(n.next=u.next,u.next=n),o.pending=n,n=gl(t),qp(t,null,a),n}return ml(t,o,n,a),gl(t)}function mo(t,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var o=n.lanes;o&=t.pendingLanes,a|=o,n.lanes=a,ei(t,a)}}function Yu(t,n){var a=t.updateQueue,o=t.alternate;if(o!==null&&(o=o.updateQueue,a===o)){var u=null,f=null;if(a=a.firstBaseUpdate,a!==null){do{var v={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};f===null?u=f=v:f=f.next=v,a=a.next}while(a!==null);f===null?u=f=n:f=f.next=n}else u=f=n;a={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:f,shared:o.shared,callbacks:o.callbacks},t.updateQueue=a;return}t=a.lastBaseUpdate,t===null?a.firstBaseUpdate=n:t.next=n,a.lastBaseUpdate=n}var Zu=!1;function go(){if(Zu){var t=ns;if(t!==null)throw t}}function _o(t,n,a,o){Zu=!1;var u=t.updateQueue;Ia=!1;var f=u.firstBaseUpdate,v=u.lastBaseUpdate,C=u.shared.pending;if(C!==null){u.shared.pending=null;var H=C,ee=H.next;H.next=null,v===null?f=ee:v.next=ee,v=H;var pe=t.alternate;pe!==null&&(pe=pe.updateQueue,C=pe.lastBaseUpdate,C!==v&&(C===null?pe.firstBaseUpdate=ee:C.next=ee,pe.lastBaseUpdate=H))}if(f!==null){var ve=u.baseState;v=0,pe=ee=H=null,C=f;do{var oe=C.lane&-536870913,ue=oe!==C.lane;if(ue?(gt&oe)===oe:(o&oe)===oe){oe!==0&&oe===ts&&(Zu=!0),pe!==null&&(pe=pe.next={lane:0,tag:C.tag,payload:C.payload,callback:null,next:null});e:{var We=t,tt=C;oe=n;var Vt=a;switch(tt.tag){case 1:if(We=tt.payload,typeof We=="function"){ve=We.call(Vt,ve,oe);break e}ve=We;break e;case 3:We.flags=We.flags&-65537|128;case 0:if(We=tt.payload,oe=typeof We=="function"?We.call(Vt,ve,oe):We,oe==null)break e;ve=x({},ve,oe);break e;case 2:Ia=!0}}oe=C.callback,oe!==null&&(t.flags|=64,ue&&(t.flags|=8192),ue=u.callbacks,ue===null?u.callbacks=[oe]:ue.push(oe))}else ue={lane:oe,tag:C.tag,payload:C.payload,callback:C.callback,next:null},pe===null?(ee=pe=ue,H=ve):pe=pe.next=ue,v|=oe;if(C=C.next,C===null){if(C=u.shared.pending,C===null)break;ue=C,C=ue.next,ue.next=null,u.lastBaseUpdate=ue,u.shared.pending=null}}while(!0);pe===null&&(H=ve),u.baseState=H,u.firstBaseUpdate=ee,u.lastBaseUpdate=pe,f===null&&(u.shared.lanes=0),ka|=v,t.lanes=v,t.memoizedState=ve}}function um(t,n){if(typeof t!="function")throw Error(r(191,t));t.call(n)}function fm(t,n){var a=t.callbacks;if(a!==null)for(t.callbacks=null,t=0;t<a.length;t++)um(a[t],n)}var rs=I(null),Al=I(0);function dm(t,n){t=pa,ye(Al,t),ye(rs,n),pa=t|n.baseLanes}function Ku(){ye(Al,pa),ye(rs,rs.current)}function Qu(){pa=Al.current,J(rs),J(Al)}var si=I(null),Si=null;function Fa(t){var n=t.alternate;ye(hn,hn.current&1),ye(si,t),Si===null&&(n===null||rs.current!==null||n.memoizedState!==null)&&(Si=t)}function Ju(t){ye(hn,hn.current),ye(si,t),Si===null&&(Si=t)}function hm(t){t.tag===22?(ye(hn,hn.current),ye(si,t),Si===null&&(Si=t)):Ha()}function Ha(){ye(hn,hn.current),ye(si,si.current)}function oi(t){J(si),Si===t&&(Si=null),J(hn)}var hn=I(0);function Rl(t){for(var n=t;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||ad(a)||rd(a)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var sa=0,lt=null,Ht=null,vn=null,Cl=!1,ss=!1,Tr=!1,wl=0,vo=0,os=null,Qx=0;function ln(){throw Error(r(321))}function ju(t,n){if(n===null)return!1;for(var a=0;a<n.length&&a<t.length;a++)if(!ai(t[a],n[a]))return!1;return!0}function $u(t,n,a,o,u,f){return sa=f,lt=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,z.H=t===null||t.memoizedState===null?Qm:mf,Tr=!1,f=a(o,u),Tr=!1,ss&&(f=mm(n,a,o,u)),pm(t),f}function pm(t){z.H=Mo;var n=Ht!==null&&Ht.next!==null;if(sa=0,vn=Ht=lt=null,Cl=!1,vo=0,os=null,n)throw Error(r(300));t===null||xn||(t=t.dependencies,t!==null&&xl(t)&&(xn=!0))}function mm(t,n,a,o){lt=t;var u=0;do{if(ss&&(os=null),vo=0,ss=!1,25<=u)throw Error(r(301));if(u+=1,vn=Ht=null,t.updateQueue!=null){var f=t.updateQueue;f.lastEffect=null,f.events=null,f.stores=null,f.memoCache!=null&&(f.memoCache.index=0)}z.H=Jm,f=n(a,o)}while(ss);return f}function Jx(){var t=z.H,n=t.useState()[0];return n=typeof n.then=="function"?xo(n):n,t=t.useState()[0],(Ht!==null?Ht.memoizedState:null)!==t&&(lt.flags|=1024),n}function ef(){var t=wl!==0;return wl=0,t}function tf(t,n,a){n.updateQueue=t.updateQueue,n.flags&=-2053,t.lanes&=~a}function nf(t){if(Cl){for(t=t.memoizedState;t!==null;){var n=t.queue;n!==null&&(n.pending=null),t=t.next}Cl=!1}sa=0,vn=Ht=lt=null,ss=!1,vo=wl=0,os=null}function Gn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return vn===null?lt.memoizedState=vn=t:vn=vn.next=t,vn}function pn(){if(Ht===null){var t=lt.alternate;t=t!==null?t.memoizedState:null}else t=Ht.next;var n=vn===null?lt.memoizedState:vn.next;if(n!==null)vn=n,Ht=t;else{if(t===null)throw lt.alternate===null?Error(r(467)):Error(r(310));Ht=t,t={memoizedState:Ht.memoizedState,baseState:Ht.baseState,baseQueue:Ht.baseQueue,queue:Ht.queue,next:null},vn===null?lt.memoizedState=vn=t:vn=vn.next=t}return vn}function Dl(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function xo(t){var n=vo;return vo+=1,os===null&&(os=[]),t=rm(os,t,n),n=lt,(vn===null?n.memoizedState:vn.next)===null&&(n=n.alternate,z.H=n===null||n.memoizedState===null?Qm:mf),t}function Ul(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return xo(t);if(t.$$typeof===U)return Dn(t)}throw Error(r(438,String(t)))}function af(t){var n=null,a=lt.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var o=lt.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(n={data:o.data.map(function(u){return u.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=Dl(),lt.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(t),o=0;o<t;o++)a[o]=k;return n.index++,a}function oa(t,n){return typeof n=="function"?n(t):n}function Nl(t){var n=pn();return rf(n,Ht,t)}function rf(t,n,a){var o=t.queue;if(o===null)throw Error(r(311));o.lastRenderedReducer=a;var u=t.baseQueue,f=o.pending;if(f!==null){if(u!==null){var v=u.next;u.next=f.next,f.next=v}n.baseQueue=u=f,o.pending=null}if(f=t.baseState,u===null)t.memoizedState=f;else{n=u.next;var C=v=null,H=null,ee=n,pe=!1;do{var ve=ee.lane&-536870913;if(ve!==ee.lane?(gt&ve)===ve:(sa&ve)===ve){var oe=ee.revertLane;if(oe===0)H!==null&&(H=H.next={lane:0,revertLane:0,gesture:null,action:ee.action,hasEagerState:ee.hasEagerState,eagerState:ee.eagerState,next:null}),ve===ts&&(pe=!0);else if((sa&oe)===oe){ee=ee.next,oe===ts&&(pe=!0);continue}else ve={lane:0,revertLane:ee.revertLane,gesture:null,action:ee.action,hasEagerState:ee.hasEagerState,eagerState:ee.eagerState,next:null},H===null?(C=H=ve,v=f):H=H.next=ve,lt.lanes|=oe,ka|=oe;ve=ee.action,Tr&&a(f,ve),f=ee.hasEagerState?ee.eagerState:a(f,ve)}else oe={lane:ve,revertLane:ee.revertLane,gesture:ee.gesture,action:ee.action,hasEagerState:ee.hasEagerState,eagerState:ee.eagerState,next:null},H===null?(C=H=oe,v=f):H=H.next=oe,lt.lanes|=ve,ka|=ve;ee=ee.next}while(ee!==null&&ee!==n);if(H===null?v=f:H.next=C,!ai(f,t.memoizedState)&&(xn=!0,pe&&(a=ns,a!==null)))throw a;t.memoizedState=f,t.baseState=v,t.baseQueue=H,o.lastRenderedState=f}return u===null&&(o.lanes=0),[t.memoizedState,o.dispatch]}function sf(t){var n=pn(),a=n.queue;if(a===null)throw Error(r(311));a.lastRenderedReducer=t;var o=a.dispatch,u=a.pending,f=n.memoizedState;if(u!==null){a.pending=null;var v=u=u.next;do f=t(f,v.action),v=v.next;while(v!==u);ai(f,n.memoizedState)||(xn=!0),n.memoizedState=f,n.baseQueue===null&&(n.baseState=f),a.lastRenderedState=f}return[f,o]}function gm(t,n,a){var o=lt,u=pn(),f=Mt;if(f){if(a===void 0)throw Error(r(407));a=a()}else a=n();var v=!ai((Ht||u).memoizedState,a);if(v&&(u.memoizedState=a,xn=!0),u=u.queue,cf(xm.bind(null,o,u,t),[t]),u.getSnapshot!==n||v||vn!==null&&vn.memoizedState.tag&1){if(o.flags|=2048,ls(9,{destroy:void 0},vm.bind(null,o,u,a,n),null),Xt===null)throw Error(r(349));f||(sa&127)!==0||_m(o,n,a)}return a}function _m(t,n,a){t.flags|=16384,t={getSnapshot:n,value:a},n=lt.updateQueue,n===null?(n=Dl(),lt.updateQueue=n,n.stores=[t]):(a=n.stores,a===null?n.stores=[t]:a.push(t))}function vm(t,n,a,o){n.value=a,n.getSnapshot=o,Sm(n)&&Mm(t)}function xm(t,n,a){return a(function(){Sm(n)&&Mm(t)})}function Sm(t){var n=t.getSnapshot;t=t.value;try{var a=n();return!ai(t,a)}catch{return!0}}function Mm(t){var n=gr(t,2);n!==null&&jn(n,t,2)}function of(t){var n=Gn();if(typeof t=="function"){var a=t;if(t=a(),Tr){Ae(!0);try{a()}finally{Ae(!1)}}}return n.memoizedState=n.baseState=t,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:oa,lastRenderedState:t},n}function ym(t,n,a,o){return t.baseState=a,rf(t,Ht,typeof o=="function"?o:oa)}function jx(t,n,a,o,u){if(Pl(t))throw Error(r(485));if(t=n.action,t!==null){var f={payload:u,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(v){f.listeners.push(v)}};z.T!==null?a(!0):f.isTransition=!1,o(f),a=n.pending,a===null?(f.next=n.pending=f,Em(n,f)):(f.next=a.next,n.pending=a.next=f)}}function Em(t,n){var a=n.action,o=n.payload,u=t.state;if(n.isTransition){var f=z.T,v={};z.T=v;try{var C=a(u,o),H=z.S;H!==null&&H(v,C),bm(t,n,C)}catch(ee){lf(t,n,ee)}finally{f!==null&&v.types!==null&&(f.types=v.types),z.T=f}}else try{f=a(u,o),bm(t,n,f)}catch(ee){lf(t,n,ee)}}function bm(t,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(o){Tm(t,n,o)},function(o){return lf(t,n,o)}):Tm(t,n,a)}function Tm(t,n,a){n.status="fulfilled",n.value=a,Am(n),t.state=a,n=t.pending,n!==null&&(a=n.next,a===n?t.pending=null:(a=a.next,n.next=a,Em(t,a)))}function lf(t,n,a){var o=t.pending;if(t.pending=null,o!==null){o=o.next;do n.status="rejected",n.reason=a,Am(n),n=n.next;while(n!==o)}t.action=null}function Am(t){t=t.listeners;for(var n=0;n<t.length;n++)(0,t[n])()}function Rm(t,n){return n}function Cm(t,n){if(Mt){var a=Xt.formState;if(a!==null){e:{var o=lt;if(Mt){if(Kt){t:{for(var u=Kt,f=xi;u.nodeType!==8;){if(!f){u=null;break t}if(u=Mi(u.nextSibling),u===null){u=null;break t}}f=u.data,u=f==="F!"||f==="F"?u:null}if(u){Kt=Mi(u.nextSibling),o=u.data==="F!";break e}}Oa(o)}o=!1}o&&(n=a[0])}}return a=Gn(),a.memoizedState=a.baseState=n,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Rm,lastRenderedState:n},a.queue=o,a=Ym.bind(null,lt,o),o.dispatch=a,o=of(!1),f=pf.bind(null,lt,!1,o.queue),o=Gn(),u={state:n,dispatch:null,action:t,pending:null},o.queue=u,a=jx.bind(null,lt,u,f,a),u.dispatch=a,o.memoizedState=t,[n,a,!1]}function wm(t){var n=pn();return Dm(n,Ht,t)}function Dm(t,n,a){if(n=rf(t,n,Rm)[0],t=Nl(oa)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var o=xo(n)}catch(v){throw v===is?yl:v}else o=n;n=pn();var u=n.queue,f=u.dispatch;return a!==n.memoizedState&&(lt.flags|=2048,ls(9,{destroy:void 0},$x.bind(null,u,a),null)),[o,f,t]}function $x(t,n){t.action=n}function Um(t){var n=pn(),a=Ht;if(a!==null)return Dm(n,a,t);pn(),n=n.memoizedState,a=pn();var o=a.queue.dispatch;return a.memoizedState=t,[n,o,!1]}function ls(t,n,a,o){return t={tag:t,create:a,deps:o,inst:n,next:null},n=lt.updateQueue,n===null&&(n=Dl(),lt.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=t.next=t:(o=a.next,a.next=t,t.next=o,n.lastEffect=t),t}function Nm(){return pn().memoizedState}function Ll(t,n,a,o){var u=Gn();lt.flags|=t,u.memoizedState=ls(1|n,{destroy:void 0},a,o===void 0?null:o)}function Ol(t,n,a,o){var u=pn();o=o===void 0?null:o;var f=u.memoizedState.inst;Ht!==null&&o!==null&&ju(o,Ht.memoizedState.deps)?u.memoizedState=ls(n,f,a,o):(lt.flags|=t,u.memoizedState=ls(1|n,f,a,o))}function Lm(t,n){Ll(8390656,8,t,n)}function cf(t,n){Ol(2048,8,t,n)}function eS(t){lt.flags|=4;var n=lt.updateQueue;if(n===null)n=Dl(),lt.updateQueue=n,n.events=[t];else{var a=n.events;a===null?n.events=[t]:a.push(t)}}function Om(t){var n=pn().memoizedState;return eS({ref:n,nextImpl:t}),function(){if((Dt&2)!==0)throw Error(r(440));return n.impl.apply(void 0,arguments)}}function Pm(t,n){return Ol(4,2,t,n)}function Im(t,n){return Ol(4,4,t,n)}function Bm(t,n){if(typeof n=="function"){t=t();var a=n(t);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return t=t(),n.current=t,function(){n.current=null}}function zm(t,n,a){a=a!=null?a.concat([t]):null,Ol(4,4,Bm.bind(null,n,t),a)}function uf(){}function Fm(t,n){var a=pn();n=n===void 0?null:n;var o=a.memoizedState;return n!==null&&ju(n,o[1])?o[0]:(a.memoizedState=[t,n],t)}function Hm(t,n){var a=pn();n=n===void 0?null:n;var o=a.memoizedState;if(n!==null&&ju(n,o[1]))return o[0];if(o=t(),Tr){Ae(!0);try{t()}finally{Ae(!1)}}return a.memoizedState=[o,n],o}function ff(t,n,a){return a===void 0||(sa&1073741824)!==0&&(gt&261930)===0?t.memoizedState=n:(t.memoizedState=a,t=G0(),lt.lanes|=t,ka|=t,a)}function Gm(t,n,a,o){return ai(a,n)?a:rs.current!==null?(t=ff(t,a,o),ai(t,n)||(xn=!0),t):(sa&42)===0||(sa&1073741824)!==0&&(gt&261930)===0?(xn=!0,t.memoizedState=a):(t=G0(),lt.lanes|=t,ka|=t,n)}function Vm(t,n,a,o,u){var f=F.p;F.p=f!==0&&8>f?f:8;var v=z.T,C={};z.T=C,pf(t,!1,n,a);try{var H=u(),ee=z.S;if(ee!==null&&ee(C,H),H!==null&&typeof H=="object"&&typeof H.then=="function"){var pe=Kx(H,o);So(t,n,pe,ui(t))}else So(t,n,o,ui(t))}catch(ve){So(t,n,{then:function(){},status:"rejected",reason:ve},ui())}finally{F.p=f,v!==null&&C.types!==null&&(v.types=C.types),z.T=v}}function tS(){}function df(t,n,a,o){if(t.tag!==5)throw Error(r(476));var u=km(t).queue;Vm(t,u,n,te,a===null?tS:function(){return Xm(t),a(o)})}function km(t){var n=t.memoizedState;if(n!==null)return n;n={memoizedState:te,baseState:te,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:oa,lastRenderedState:te},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:oa,lastRenderedState:a},next:null},t.memoizedState=n,t=t.alternate,t!==null&&(t.memoizedState=n),n}function Xm(t){var n=km(t);n.next===null&&(n=t.alternate.memoizedState),So(t,n.next.queue,{},ui())}function hf(){return Dn(Bo)}function Wm(){return pn().memoizedState}function qm(){return pn().memoizedState}function nS(t){for(var n=t.return;n!==null;){switch(n.tag){case 24:case 3:var a=ui();t=Ba(a);var o=za(n,t,a);o!==null&&(jn(o,n,a),mo(o,n,a)),n={cache:Gu()},t.payload=n;return}n=n.return}}function iS(t,n,a){var o=ui();a={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Pl(t)?Zm(n,a):(a=Du(t,n,a,o),a!==null&&(jn(a,t,o),Km(a,n,o)))}function Ym(t,n,a){var o=ui();So(t,n,a,o)}function So(t,n,a,o){var u={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(Pl(t))Zm(n,u);else{var f=t.alternate;if(t.lanes===0&&(f===null||f.lanes===0)&&(f=n.lastRenderedReducer,f!==null))try{var v=n.lastRenderedState,C=f(v,a);if(u.hasEagerState=!0,u.eagerState=C,ai(C,v))return ml(t,n,u,0),Xt===null&&pl(),!1}catch{}finally{}if(a=Du(t,n,u,o),a!==null)return jn(a,t,o),Km(a,n,o),!0}return!1}function pf(t,n,a,o){if(o={lane:2,revertLane:qf(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},Pl(t)){if(n)throw Error(r(479))}else n=Du(t,a,o,2),n!==null&&jn(n,t,2)}function Pl(t){var n=t.alternate;return t===lt||n!==null&&n===lt}function Zm(t,n){ss=Cl=!0;var a=t.pending;a===null?n.next=n:(n.next=a.next,a.next=n),t.pending=n}function Km(t,n,a){if((a&4194048)!==0){var o=n.lanes;o&=t.pendingLanes,a|=o,n.lanes=a,ei(t,a)}}var Mo={readContext:Dn,use:Ul,useCallback:ln,useContext:ln,useEffect:ln,useImperativeHandle:ln,useLayoutEffect:ln,useInsertionEffect:ln,useMemo:ln,useReducer:ln,useRef:ln,useState:ln,useDebugValue:ln,useDeferredValue:ln,useTransition:ln,useSyncExternalStore:ln,useId:ln,useHostTransitionStatus:ln,useFormState:ln,useActionState:ln,useOptimistic:ln,useMemoCache:ln,useCacheRefresh:ln};Mo.useEffectEvent=ln;var Qm={readContext:Dn,use:Ul,useCallback:function(t,n){return Gn().memoizedState=[t,n===void 0?null:n],t},useContext:Dn,useEffect:Lm,useImperativeHandle:function(t,n,a){a=a!=null?a.concat([t]):null,Ll(4194308,4,Bm.bind(null,n,t),a)},useLayoutEffect:function(t,n){return Ll(4194308,4,t,n)},useInsertionEffect:function(t,n){Ll(4,2,t,n)},useMemo:function(t,n){var a=Gn();n=n===void 0?null:n;var o=t();if(Tr){Ae(!0);try{t()}finally{Ae(!1)}}return a.memoizedState=[o,n],o},useReducer:function(t,n,a){var o=Gn();if(a!==void 0){var u=a(n);if(Tr){Ae(!0);try{a(n)}finally{Ae(!1)}}}else u=n;return o.memoizedState=o.baseState=u,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:u},o.queue=t,t=t.dispatch=iS.bind(null,lt,t),[o.memoizedState,t]},useRef:function(t){var n=Gn();return t={current:t},n.memoizedState=t},useState:function(t){t=of(t);var n=t.queue,a=Ym.bind(null,lt,n);return n.dispatch=a,[t.memoizedState,a]},useDebugValue:uf,useDeferredValue:function(t,n){var a=Gn();return ff(a,t,n)},useTransition:function(){var t=of(!1);return t=Vm.bind(null,lt,t.queue,!0,!1),Gn().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,n,a){var o=lt,u=Gn();if(Mt){if(a===void 0)throw Error(r(407));a=a()}else{if(a=n(),Xt===null)throw Error(r(349));(gt&127)!==0||_m(o,n,a)}u.memoizedState=a;var f={value:a,getSnapshot:n};return u.queue=f,Lm(xm.bind(null,o,f,t),[t]),o.flags|=2048,ls(9,{destroy:void 0},vm.bind(null,o,f,a,n),null),a},useId:function(){var t=Gn(),n=Xt.identifierPrefix;if(Mt){var a=Fi,o=zi;a=(o&~(1<<32-ze(o)-1)).toString(32)+a,n="_"+n+"R_"+a,a=wl++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=Qx++,n="_"+n+"r_"+a.toString(32)+"_";return t.memoizedState=n},useHostTransitionStatus:hf,useFormState:Cm,useActionState:Cm,useOptimistic:function(t){var n=Gn();n.memoizedState=n.baseState=t;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=pf.bind(null,lt,!0,a),a.dispatch=n,[t,n]},useMemoCache:af,useCacheRefresh:function(){return Gn().memoizedState=nS.bind(null,lt)},useEffectEvent:function(t){var n=Gn(),a={impl:t};return n.memoizedState=a,function(){if((Dt&2)!==0)throw Error(r(440));return a.impl.apply(void 0,arguments)}}},mf={readContext:Dn,use:Ul,useCallback:Fm,useContext:Dn,useEffect:cf,useImperativeHandle:zm,useInsertionEffect:Pm,useLayoutEffect:Im,useMemo:Hm,useReducer:Nl,useRef:Nm,useState:function(){return Nl(oa)},useDebugValue:uf,useDeferredValue:function(t,n){var a=pn();return Gm(a,Ht.memoizedState,t,n)},useTransition:function(){var t=Nl(oa)[0],n=pn().memoizedState;return[typeof t=="boolean"?t:xo(t),n]},useSyncExternalStore:gm,useId:Wm,useHostTransitionStatus:hf,useFormState:wm,useActionState:wm,useOptimistic:function(t,n){var a=pn();return ym(a,Ht,t,n)},useMemoCache:af,useCacheRefresh:qm};mf.useEffectEvent=Om;var Jm={readContext:Dn,use:Ul,useCallback:Fm,useContext:Dn,useEffect:cf,useImperativeHandle:zm,useInsertionEffect:Pm,useLayoutEffect:Im,useMemo:Hm,useReducer:sf,useRef:Nm,useState:function(){return sf(oa)},useDebugValue:uf,useDeferredValue:function(t,n){var a=pn();return Ht===null?ff(a,t,n):Gm(a,Ht.memoizedState,t,n)},useTransition:function(){var t=sf(oa)[0],n=pn().memoizedState;return[typeof t=="boolean"?t:xo(t),n]},useSyncExternalStore:gm,useId:Wm,useHostTransitionStatus:hf,useFormState:Um,useActionState:Um,useOptimistic:function(t,n){var a=pn();return Ht!==null?ym(a,Ht,t,n):(a.baseState=t,[t,a.queue.dispatch])},useMemoCache:af,useCacheRefresh:qm};Jm.useEffectEvent=Om;function gf(t,n,a,o){n=t.memoizedState,a=a(o,n),a=a==null?n:x({},n,a),t.memoizedState=a,t.lanes===0&&(t.updateQueue.baseState=a)}var _f={enqueueSetState:function(t,n,a){t=t._reactInternals;var o=ui(),u=Ba(o);u.payload=n,a!=null&&(u.callback=a),n=za(t,u,o),n!==null&&(jn(n,t,o),mo(n,t,o))},enqueueReplaceState:function(t,n,a){t=t._reactInternals;var o=ui(),u=Ba(o);u.tag=1,u.payload=n,a!=null&&(u.callback=a),n=za(t,u,o),n!==null&&(jn(n,t,o),mo(n,t,o))},enqueueForceUpdate:function(t,n){t=t._reactInternals;var a=ui(),o=Ba(a);o.tag=2,n!=null&&(o.callback=n),n=za(t,o,a),n!==null&&(jn(n,t,a),mo(n,t,a))}};function jm(t,n,a,o,u,f,v){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(o,f,v):n.prototype&&n.prototype.isPureReactComponent?!so(a,o)||!so(u,f):!0}function $m(t,n,a,o){t=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,o),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,o),n.state!==t&&_f.enqueueReplaceState(n,n.state,null)}function Ar(t,n){var a=n;if("ref"in n){a={};for(var o in n)o!=="ref"&&(a[o]=n[o])}if(t=t.defaultProps){a===n&&(a=x({},a));for(var u in t)a[u]===void 0&&(a[u]=t[u])}return a}function e0(t){hl(t)}function t0(t){console.error(t)}function n0(t){hl(t)}function Il(t,n){try{var a=t.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(o){setTimeout(function(){throw o})}}function i0(t,n,a){try{var o=t.onCaughtError;o(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function vf(t,n,a){return a=Ba(a),a.tag=3,a.payload={element:null},a.callback=function(){Il(t,n)},a}function a0(t){return t=Ba(t),t.tag=3,t}function r0(t,n,a,o){var u=a.type.getDerivedStateFromError;if(typeof u=="function"){var f=o.value;t.payload=function(){return u(f)},t.callback=function(){i0(n,a,o)}}var v=a.stateNode;v!==null&&typeof v.componentDidCatch=="function"&&(t.callback=function(){i0(n,a,o),typeof u!="function"&&(Xa===null?Xa=new Set([this]):Xa.add(this));var C=o.stack;this.componentDidCatch(o.value,{componentStack:C!==null?C:""})})}function aS(t,n,a,o,u){if(a.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(n=a.alternate,n!==null&&es(n,a,u,!0),a=si.current,a!==null){switch(a.tag){case 31:case 13:return Si===null?Zl():a.alternate===null&&cn===0&&(cn=3),a.flags&=-257,a.flags|=65536,a.lanes=u,o===El?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([o]):n.add(o),kf(t,o,u)),!1;case 22:return a.flags|=65536,o===El?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([o])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([o]):a.add(o)),kf(t,o,u)),!1}throw Error(r(435,a.tag))}return kf(t,o,u),Zl(),!1}if(Mt)return n=si.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=u,o!==Iu&&(t=Error(r(422),{cause:o}),co(gi(t,a)))):(o!==Iu&&(n=Error(r(423),{cause:o}),co(gi(n,a))),t=t.current.alternate,t.flags|=65536,u&=-u,t.lanes|=u,o=gi(o,a),u=vf(t.stateNode,o,u),Yu(t,u),cn!==4&&(cn=2)),!1;var f=Error(r(520),{cause:o});if(f=gi(f,a),wo===null?wo=[f]:wo.push(f),cn!==4&&(cn=2),n===null)return!0;o=gi(o,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,t=u&-u,a.lanes|=t,t=vf(a.stateNode,o,t),Yu(a,t),!1;case 1:if(n=a.type,f=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(Xa===null||!Xa.has(f))))return a.flags|=65536,u&=-u,a.lanes|=u,u=a0(u),r0(u,t,a,o),Yu(a,u),!1}a=a.return}while(a!==null);return!1}var xf=Error(r(461)),xn=!1;function Un(t,n,a,o){n.child=t===null?cm(n,null,a,o):br(n,t.child,a,o)}function s0(t,n,a,o,u){a=a.render;var f=n.ref;if("ref"in o){var v={};for(var C in o)C!=="ref"&&(v[C]=o[C])}else v=o;return Sr(n),o=$u(t,n,a,v,f,u),C=ef(),t!==null&&!xn?(tf(t,n,u),la(t,n,u)):(Mt&&C&&Ou(n),n.flags|=1,Un(t,n,o,u),n.child)}function o0(t,n,a,o,u){if(t===null){var f=a.type;return typeof f=="function"&&!Uu(f)&&f.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=f,l0(t,n,f,o,u)):(t=_l(a.type,null,o,n,n.mode,u),t.ref=n.ref,t.return=n,n.child=t)}if(f=t.child,!Rf(t,u)){var v=f.memoizedProps;if(a=a.compare,a=a!==null?a:so,a(v,o)&&t.ref===n.ref)return la(t,n,u)}return n.flags|=1,t=na(f,o),t.ref=n.ref,t.return=n,n.child=t}function l0(t,n,a,o,u){if(t!==null){var f=t.memoizedProps;if(so(f,o)&&t.ref===n.ref)if(xn=!1,n.pendingProps=o=f,Rf(t,u))(t.flags&131072)!==0&&(xn=!0);else return n.lanes=t.lanes,la(t,n,u)}return Sf(t,n,a,o,u)}function c0(t,n,a,o){var u=o.children,f=t!==null?t.memoizedState:null;if(t===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((n.flags&128)!==0){if(f=f!==null?f.baseLanes|a:a,t!==null){for(o=n.child=t.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;o=u&~f}else o=0,n.child=null;return u0(t,n,f,a,o)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},t!==null&&Ml(n,f!==null?f.cachePool:null),f!==null?dm(n,f):Ku(),hm(n);else return o=n.lanes=536870912,u0(t,n,f!==null?f.baseLanes|a:a,a,o)}else f!==null?(Ml(n,f.cachePool),dm(n,f),Ha(),n.memoizedState=null):(t!==null&&Ml(n,null),Ku(),Ha());return Un(t,n,u,a),n.child}function yo(t,n){return t!==null&&t.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function u0(t,n,a,o,u){var f=ku();return f=f===null?null:{parent:_n._currentValue,pool:f},n.memoizedState={baseLanes:a,cachePool:f},t!==null&&Ml(n,null),Ku(),hm(n),t!==null&&es(t,n,o,!0),n.childLanes=u,null}function Bl(t,n){return n=Fl({mode:n.mode,children:n.children},t.mode),n.ref=t.ref,t.child=n,n.return=t,n}function f0(t,n,a){return br(n,t.child,null,a),t=Bl(n,n.pendingProps),t.flags|=2,oi(n),n.memoizedState=null,t}function rS(t,n,a){var o=n.pendingProps,u=(n.flags&128)!==0;if(n.flags&=-129,t===null){if(Mt){if(o.mode==="hidden")return t=Bl(n,o),n.lanes=536870912,yo(null,t);if(Ju(n),(t=Kt)?(t=Eg(t,xi),t=t!==null&&t.data==="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Na!==null?{id:zi,overflow:Fi}:null,retryLane:536870912,hydrationErrors:null},a=Zp(t),a.return=n,n.child=a,wn=n,Kt=null)):t=null,t===null)throw Oa(n);return n.lanes=536870912,null}return Bl(n,o)}var f=t.memoizedState;if(f!==null){var v=f.dehydrated;if(Ju(n),u)if(n.flags&256)n.flags&=-257,n=f0(t,n,a);else if(n.memoizedState!==null)n.child=t.child,n.flags|=128,n=null;else throw Error(r(558));else if(xn||es(t,n,a,!1),u=(a&t.childLanes)!==0,xn||u){if(o=Xt,o!==null&&(v=ti(o,a),v!==0&&v!==f.retryLane))throw f.retryLane=v,gr(t,v),jn(o,t,v),xf;Zl(),n=f0(t,n,a)}else t=f.treeContext,Kt=Mi(v.nextSibling),wn=n,Mt=!0,La=null,xi=!1,t!==null&&Jp(n,t),n=Bl(n,o),n.flags|=4096;return n}return t=na(t.child,{mode:o.mode,children:o.children}),t.ref=n.ref,n.child=t,t.return=n,t}function zl(t,n){var a=n.ref;if(a===null)t!==null&&t.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(r(284));(t===null||t.ref!==a)&&(n.flags|=4194816)}}function Sf(t,n,a,o,u){return Sr(n),a=$u(t,n,a,o,void 0,u),o=ef(),t!==null&&!xn?(tf(t,n,u),la(t,n,u)):(Mt&&o&&Ou(n),n.flags|=1,Un(t,n,a,u),n.child)}function d0(t,n,a,o,u,f){return Sr(n),n.updateQueue=null,a=mm(n,o,a,u),pm(t),o=ef(),t!==null&&!xn?(tf(t,n,f),la(t,n,f)):(Mt&&o&&Ou(n),n.flags|=1,Un(t,n,a,f),n.child)}function h0(t,n,a,o,u){if(Sr(n),n.stateNode===null){var f=Qr,v=a.contextType;typeof v=="object"&&v!==null&&(f=Dn(v)),f=new a(o,f),n.memoizedState=f.state!==null&&f.state!==void 0?f.state:null,f.updater=_f,n.stateNode=f,f._reactInternals=n,f=n.stateNode,f.props=o,f.state=n.memoizedState,f.refs={},Wu(n),v=a.contextType,f.context=typeof v=="object"&&v!==null?Dn(v):Qr,f.state=n.memoizedState,v=a.getDerivedStateFromProps,typeof v=="function"&&(gf(n,a,v,o),f.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof f.getSnapshotBeforeUpdate=="function"||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(v=f.state,typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount(),v!==f.state&&_f.enqueueReplaceState(f,f.state,null),_o(n,o,f,u),go(),f.state=n.memoizedState),typeof f.componentDidMount=="function"&&(n.flags|=4194308),o=!0}else if(t===null){f=n.stateNode;var C=n.memoizedProps,H=Ar(a,C);f.props=H;var ee=f.context,pe=a.contextType;v=Qr,typeof pe=="object"&&pe!==null&&(v=Dn(pe));var ve=a.getDerivedStateFromProps;pe=typeof ve=="function"||typeof f.getSnapshotBeforeUpdate=="function",C=n.pendingProps!==C,pe||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(C||ee!==v)&&$m(n,f,o,v),Ia=!1;var oe=n.memoizedState;f.state=oe,_o(n,o,f,u),go(),ee=n.memoizedState,C||oe!==ee||Ia?(typeof ve=="function"&&(gf(n,a,ve,o),ee=n.memoizedState),(H=Ia||jm(n,a,H,o,oe,ee,v))?(pe||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount()),typeof f.componentDidMount=="function"&&(n.flags|=4194308)):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=o,n.memoizedState=ee),f.props=o,f.state=ee,f.context=v,o=H):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),o=!1)}else{f=n.stateNode,qu(t,n),v=n.memoizedProps,pe=Ar(a,v),f.props=pe,ve=n.pendingProps,oe=f.context,ee=a.contextType,H=Qr,typeof ee=="object"&&ee!==null&&(H=Dn(ee)),C=a.getDerivedStateFromProps,(ee=typeof C=="function"||typeof f.getSnapshotBeforeUpdate=="function")||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(v!==ve||oe!==H)&&$m(n,f,o,H),Ia=!1,oe=n.memoizedState,f.state=oe,_o(n,o,f,u),go();var ue=n.memoizedState;v!==ve||oe!==ue||Ia||t!==null&&t.dependencies!==null&&xl(t.dependencies)?(typeof C=="function"&&(gf(n,a,C,o),ue=n.memoizedState),(pe=Ia||jm(n,a,pe,o,oe,ue,H)||t!==null&&t.dependencies!==null&&xl(t.dependencies))?(ee||typeof f.UNSAFE_componentWillUpdate!="function"&&typeof f.componentWillUpdate!="function"||(typeof f.componentWillUpdate=="function"&&f.componentWillUpdate(o,ue,H),typeof f.UNSAFE_componentWillUpdate=="function"&&f.UNSAFE_componentWillUpdate(o,ue,H)),typeof f.componentDidUpdate=="function"&&(n.flags|=4),typeof f.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof f.componentDidUpdate!="function"||v===t.memoizedProps&&oe===t.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||v===t.memoizedProps&&oe===t.memoizedState||(n.flags|=1024),n.memoizedProps=o,n.memoizedState=ue),f.props=o,f.state=ue,f.context=H,o=pe):(typeof f.componentDidUpdate!="function"||v===t.memoizedProps&&oe===t.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||v===t.memoizedProps&&oe===t.memoizedState||(n.flags|=1024),o=!1)}return f=o,zl(t,n),o=(n.flags&128)!==0,f||o?(f=n.stateNode,a=o&&typeof a.getDerivedStateFromError!="function"?null:f.render(),n.flags|=1,t!==null&&o?(n.child=br(n,t.child,null,u),n.child=br(n,null,a,u)):Un(t,n,a,u),n.memoizedState=f.state,t=n.child):t=la(t,n,u),t}function p0(t,n,a,o){return vr(),n.flags|=256,Un(t,n,a,o),n.child}var Mf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function yf(t){return{baseLanes:t,cachePool:im()}}function Ef(t,n,a){return t=t!==null?t.childLanes&~a:0,n&&(t|=ci),t}function m0(t,n,a){var o=n.pendingProps,u=!1,f=(n.flags&128)!==0,v;if((v=f)||(v=t!==null&&t.memoizedState===null?!1:(hn.current&2)!==0),v&&(u=!0,n.flags&=-129),v=(n.flags&32)!==0,n.flags&=-33,t===null){if(Mt){if(u?Fa(n):Ha(),(t=Kt)?(t=Eg(t,xi),t=t!==null&&t.data!=="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Na!==null?{id:zi,overflow:Fi}:null,retryLane:536870912,hydrationErrors:null},a=Zp(t),a.return=n,n.child=a,wn=n,Kt=null)):t=null,t===null)throw Oa(n);return rd(t)?n.lanes=32:n.lanes=536870912,null}var C=o.children;return o=o.fallback,u?(Ha(),u=n.mode,C=Fl({mode:"hidden",children:C},u),o=_r(o,u,a,null),C.return=n,o.return=n,C.sibling=o,n.child=C,o=n.child,o.memoizedState=yf(a),o.childLanes=Ef(t,v,a),n.memoizedState=Mf,yo(null,o)):(Fa(n),bf(n,C))}var H=t.memoizedState;if(H!==null&&(C=H.dehydrated,C!==null)){if(f)n.flags&256?(Fa(n),n.flags&=-257,n=Tf(t,n,a)):n.memoizedState!==null?(Ha(),n.child=t.child,n.flags|=128,n=null):(Ha(),C=o.fallback,u=n.mode,o=Fl({mode:"visible",children:o.children},u),C=_r(C,u,a,null),C.flags|=2,o.return=n,C.return=n,o.sibling=C,n.child=o,br(n,t.child,null,a),o=n.child,o.memoizedState=yf(a),o.childLanes=Ef(t,v,a),n.memoizedState=Mf,n=yo(null,o));else if(Fa(n),rd(C)){if(v=C.nextSibling&&C.nextSibling.dataset,v)var ee=v.dgst;v=ee,o=Error(r(419)),o.stack="",o.digest=v,co({value:o,source:null,stack:null}),n=Tf(t,n,a)}else if(xn||es(t,n,a,!1),v=(a&t.childLanes)!==0,xn||v){if(v=Xt,v!==null&&(o=ti(v,a),o!==0&&o!==H.retryLane))throw H.retryLane=o,gr(t,o),jn(v,t,o),xf;ad(C)||Zl(),n=Tf(t,n,a)}else ad(C)?(n.flags|=192,n.child=t.child,n=null):(t=H.treeContext,Kt=Mi(C.nextSibling),wn=n,Mt=!0,La=null,xi=!1,t!==null&&Jp(n,t),n=bf(n,o.children),n.flags|=4096);return n}return u?(Ha(),C=o.fallback,u=n.mode,H=t.child,ee=H.sibling,o=na(H,{mode:"hidden",children:o.children}),o.subtreeFlags=H.subtreeFlags&65011712,ee!==null?C=na(ee,C):(C=_r(C,u,a,null),C.flags|=2),C.return=n,o.return=n,o.sibling=C,n.child=o,yo(null,o),o=n.child,C=t.child.memoizedState,C===null?C=yf(a):(u=C.cachePool,u!==null?(H=_n._currentValue,u=u.parent!==H?{parent:H,pool:H}:u):u=im(),C={baseLanes:C.baseLanes|a,cachePool:u}),o.memoizedState=C,o.childLanes=Ef(t,v,a),n.memoizedState=Mf,yo(t.child,o)):(Fa(n),a=t.child,t=a.sibling,a=na(a,{mode:"visible",children:o.children}),a.return=n,a.sibling=null,t!==null&&(v=n.deletions,v===null?(n.deletions=[t],n.flags|=16):v.push(t)),n.child=a,n.memoizedState=null,a)}function bf(t,n){return n=Fl({mode:"visible",children:n},t.mode),n.return=t,t.child=n}function Fl(t,n){return t=ri(22,t,null,n),t.lanes=0,t}function Tf(t,n,a){return br(n,t.child,null,a),t=bf(n,n.pendingProps.children),t.flags|=2,n.memoizedState=null,t}function g0(t,n,a){t.lanes|=n;var o=t.alternate;o!==null&&(o.lanes|=n),Fu(t.return,n,a)}function Af(t,n,a,o,u,f){var v=t.memoizedState;v===null?t.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:o,tail:a,tailMode:u,treeForkCount:f}:(v.isBackwards=n,v.rendering=null,v.renderingStartTime=0,v.last=o,v.tail=a,v.tailMode=u,v.treeForkCount=f)}function _0(t,n,a){var o=n.pendingProps,u=o.revealOrder,f=o.tail;o=o.children;var v=hn.current,C=(v&2)!==0;if(C?(v=v&1|2,n.flags|=128):v&=1,ye(hn,v),Un(t,n,o,a),o=Mt?lo:0,!C&&t!==null&&(t.flags&128)!==0)e:for(t=n.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&g0(t,a,n);else if(t.tag===19)g0(t,a,n);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break e;for(;t.sibling===null;){if(t.return===null||t.return===n)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(u){case"forwards":for(a=n.child,u=null;a!==null;)t=a.alternate,t!==null&&Rl(t)===null&&(u=a),a=a.sibling;a=u,a===null?(u=n.child,n.child=null):(u=a.sibling,a.sibling=null),Af(n,!1,u,a,f,o);break;case"backwards":case"unstable_legacy-backwards":for(a=null,u=n.child,n.child=null;u!==null;){if(t=u.alternate,t!==null&&Rl(t)===null){n.child=u;break}t=u.sibling,u.sibling=a,a=u,u=t}Af(n,!0,a,null,f,o);break;case"together":Af(n,!1,null,null,void 0,o);break;default:n.memoizedState=null}return n.child}function la(t,n,a){if(t!==null&&(n.dependencies=t.dependencies),ka|=n.lanes,(a&n.childLanes)===0)if(t!==null){if(es(t,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(t!==null&&n.child!==t.child)throw Error(r(153));if(n.child!==null){for(t=n.child,a=na(t,t.pendingProps),n.child=a,a.return=n;t.sibling!==null;)t=t.sibling,a=a.sibling=na(t,t.pendingProps),a.return=n;a.sibling=null}return n.child}function Rf(t,n){return(t.lanes&n)!==0?!0:(t=t.dependencies,!!(t!==null&&xl(t)))}function sS(t,n,a){switch(n.tag){case 3:Me(n,n.stateNode.containerInfo),Pa(n,_n,t.memoizedState.cache),vr();break;case 27:case 5:it(n);break;case 4:Me(n,n.stateNode.containerInfo);break;case 10:Pa(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,Ju(n),null;break;case 13:var o=n.memoizedState;if(o!==null)return o.dehydrated!==null?(Fa(n),n.flags|=128,null):(a&n.child.childLanes)!==0?m0(t,n,a):(Fa(n),t=la(t,n,a),t!==null?t.sibling:null);Fa(n);break;case 19:var u=(t.flags&128)!==0;if(o=(a&n.childLanes)!==0,o||(es(t,n,a,!1),o=(a&n.childLanes)!==0),u){if(o)return _0(t,n,a);n.flags|=128}if(u=n.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),ye(hn,hn.current),o)break;return null;case 22:return n.lanes=0,c0(t,n,a,n.pendingProps);case 24:Pa(n,_n,t.memoizedState.cache)}return la(t,n,a)}function v0(t,n,a){if(t!==null)if(t.memoizedProps!==n.pendingProps)xn=!0;else{if(!Rf(t,a)&&(n.flags&128)===0)return xn=!1,sS(t,n,a);xn=(t.flags&131072)!==0}else xn=!1,Mt&&(n.flags&1048576)!==0&&Qp(n,lo,n.index);switch(n.lanes=0,n.tag){case 16:e:{var o=n.pendingProps;if(t=yr(n.elementType),n.type=t,typeof t=="function")Uu(t)?(o=Ar(t,o),n.tag=1,n=h0(null,n,t,o,a)):(n.tag=0,n=Sf(null,n,t,o,a));else{if(t!=null){var u=t.$$typeof;if(u===A){n.tag=11,n=s0(null,n,t,o,a);break e}else if(u===B){n.tag=14,n=o0(null,n,t,o,a);break e}}throw n=le(t)||t,Error(r(306,n,""))}}return n;case 0:return Sf(t,n,n.type,n.pendingProps,a);case 1:return o=n.type,u=Ar(o,n.pendingProps),h0(t,n,o,u,a);case 3:e:{if(Me(n,n.stateNode.containerInfo),t===null)throw Error(r(387));o=n.pendingProps;var f=n.memoizedState;u=f.element,qu(t,n),_o(n,o,null,a);var v=n.memoizedState;if(o=v.cache,Pa(n,_n,o),o!==f.cache&&Hu(n,[_n],a,!0),go(),o=v.element,f.isDehydrated)if(f={element:o,isDehydrated:!1,cache:v.cache},n.updateQueue.baseState=f,n.memoizedState=f,n.flags&256){n=p0(t,n,o,a);break e}else if(o!==u){u=gi(Error(r(424)),n),co(u),n=p0(t,n,o,a);break e}else{switch(t=n.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(Kt=Mi(t.firstChild),wn=n,Mt=!0,La=null,xi=!0,a=cm(n,null,o,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(vr(),o===u){n=la(t,n,a);break e}Un(t,n,o,a)}n=n.child}return n;case 26:return zl(t,n),t===null?(a=wg(n.type,null,n.pendingProps,null))?n.memoizedState=a:Mt||(a=n.type,t=n.pendingProps,o=tc(ae.current).createElement(a),o[mn]=n,o[Cn]=t,Nn(o,a,t),gn(o),n.stateNode=o):n.memoizedState=wg(n.type,t.memoizedProps,n.pendingProps,t.memoizedState),null;case 27:return it(n),t===null&&Mt&&(o=n.stateNode=Ag(n.type,n.pendingProps,ae.current),wn=n,xi=!0,u=Kt,Za(n.type)?(sd=u,Kt=Mi(o.firstChild)):Kt=u),Un(t,n,n.pendingProps.children,a),zl(t,n),t===null&&(n.flags|=4194304),n.child;case 5:return t===null&&Mt&&((u=o=Kt)&&(o=IS(o,n.type,n.pendingProps,xi),o!==null?(n.stateNode=o,wn=n,Kt=Mi(o.firstChild),xi=!1,u=!0):u=!1),u||Oa(n)),it(n),u=n.type,f=n.pendingProps,v=t!==null?t.memoizedProps:null,o=f.children,td(u,f)?o=null:v!==null&&td(u,v)&&(n.flags|=32),n.memoizedState!==null&&(u=$u(t,n,Jx,null,null,a),Bo._currentValue=u),zl(t,n),Un(t,n,o,a),n.child;case 6:return t===null&&Mt&&((t=a=Kt)&&(a=BS(a,n.pendingProps,xi),a!==null?(n.stateNode=a,wn=n,Kt=null,t=!0):t=!1),t||Oa(n)),null;case 13:return m0(t,n,a);case 4:return Me(n,n.stateNode.containerInfo),o=n.pendingProps,t===null?n.child=br(n,null,o,a):Un(t,n,o,a),n.child;case 11:return s0(t,n,n.type,n.pendingProps,a);case 7:return Un(t,n,n.pendingProps,a),n.child;case 8:return Un(t,n,n.pendingProps.children,a),n.child;case 12:return Un(t,n,n.pendingProps.children,a),n.child;case 10:return o=n.pendingProps,Pa(n,n.type,o.value),Un(t,n,o.children,a),n.child;case 9:return u=n.type._context,o=n.pendingProps.children,Sr(n),u=Dn(u),o=o(u),n.flags|=1,Un(t,n,o,a),n.child;case 14:return o0(t,n,n.type,n.pendingProps,a);case 15:return l0(t,n,n.type,n.pendingProps,a);case 19:return _0(t,n,a);case 31:return rS(t,n,a);case 22:return c0(t,n,a,n.pendingProps);case 24:return Sr(n),o=Dn(_n),t===null?(u=ku(),u===null&&(u=Xt,f=Gu(),u.pooledCache=f,f.refCount++,f!==null&&(u.pooledCacheLanes|=a),u=f),n.memoizedState={parent:o,cache:u},Wu(n),Pa(n,_n,u)):((t.lanes&a)!==0&&(qu(t,n),_o(n,null,null,a),go()),u=t.memoizedState,f=n.memoizedState,u.parent!==o?(u={parent:o,cache:o},n.memoizedState=u,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=u),Pa(n,_n,o)):(o=f.cache,Pa(n,_n,o),o!==u.cache&&Hu(n,[_n],a,!0))),Un(t,n,n.pendingProps.children,a),n.child;case 29:throw n.pendingProps}throw Error(r(156,n.tag))}function ca(t){t.flags|=4}function Cf(t,n,a,o,u){if((n=(t.mode&32)!==0)&&(n=!1),n){if(t.flags|=16777216,(u&335544128)===u)if(t.stateNode.complete)t.flags|=8192;else if(W0())t.flags|=8192;else throw Er=El,Xu}else t.flags&=-16777217}function x0(t,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!Og(n))if(W0())t.flags|=8192;else throw Er=El,Xu}function Hl(t,n){n!==null&&(t.flags|=4),t.flags&16384&&(n=t.tag!==22?Se():536870912,t.lanes|=n,ds|=n)}function Eo(t,n){if(!Mt)switch(t.tailMode){case"hidden":n=t.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t.tail=null:a.sibling=null;break;case"collapsed":a=t.tail;for(var o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?n||t.tail===null?t.tail=null:t.tail.sibling=null:o.sibling=null}}function Qt(t){var n=t.alternate!==null&&t.alternate.child===t.child,a=0,o=0;if(n)for(var u=t.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags&65011712,o|=u.flags&65011712,u.return=t,u=u.sibling;else for(u=t.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=t,u=u.sibling;return t.subtreeFlags|=o,t.childLanes=a,n}function oS(t,n,a){var o=n.pendingProps;switch(Pu(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Qt(n),null;case 1:return Qt(n),null;case 3:return a=n.stateNode,o=null,t!==null&&(o=t.memoizedState.cache),n.memoizedState.cache!==o&&(n.flags|=2048),ra(_n),He(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(t===null||t.child===null)&&($r(n)?ca(n):t===null||t.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Bu())),Qt(n),null;case 26:var u=n.type,f=n.memoizedState;return t===null?(ca(n),f!==null?(Qt(n),x0(n,f)):(Qt(n),Cf(n,u,null,o,a))):f?f!==t.memoizedState?(ca(n),Qt(n),x0(n,f)):(Qt(n),n.flags&=-16777217):(t=t.memoizedProps,t!==o&&ca(n),Qt(n),Cf(n,u,t,o,a)),null;case 27:if(Je(n),a=ae.current,u=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==o&&ca(n);else{if(!o){if(n.stateNode===null)throw Error(r(166));return Qt(n),null}t=Re.current,$r(n)?jp(n):(t=Ag(u,o,a),n.stateNode=t,ca(n))}return Qt(n),null;case 5:if(Je(n),u=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==o&&ca(n);else{if(!o){if(n.stateNode===null)throw Error(r(166));return Qt(n),null}if(f=Re.current,$r(n))jp(n);else{var v=tc(ae.current);switch(f){case 1:f=v.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:f=v.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":f=v.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":f=v.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":f=v.createElement("div"),f.innerHTML="<script><\/script>",f=f.removeChild(f.firstChild);break;case"select":f=typeof o.is=="string"?v.createElement("select",{is:o.is}):v.createElement("select"),o.multiple?f.multiple=!0:o.size&&(f.size=o.size);break;default:f=typeof o.is=="string"?v.createElement(u,{is:o.is}):v.createElement(u)}}f[mn]=n,f[Cn]=o;e:for(v=n.child;v!==null;){if(v.tag===5||v.tag===6)f.appendChild(v.stateNode);else if(v.tag!==4&&v.tag!==27&&v.child!==null){v.child.return=v,v=v.child;continue}if(v===n)break e;for(;v.sibling===null;){if(v.return===null||v.return===n)break e;v=v.return}v.sibling.return=v.return,v=v.sibling}n.stateNode=f;e:switch(Nn(f,u,o),u){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break e;case"img":o=!0;break e;default:o=!1}o&&ca(n)}}return Qt(n),Cf(n,n.type,t===null?null:t.memoizedProps,n.pendingProps,a),null;case 6:if(t&&n.stateNode!=null)t.memoizedProps!==o&&ca(n);else{if(typeof o!="string"&&n.stateNode===null)throw Error(r(166));if(t=ae.current,$r(n)){if(t=n.stateNode,a=n.memoizedProps,o=null,u=wn,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}t[mn]=n,t=!!(t.nodeValue===a||o!==null&&o.suppressHydrationWarning===!0||mg(t.nodeValue,a)),t||Oa(n,!0)}else t=tc(t).createTextNode(o),t[mn]=n,n.stateNode=t}return Qt(n),null;case 31:if(a=n.memoizedState,t===null||t.memoizedState!==null){if(o=$r(n),a!==null){if(t===null){if(!o)throw Error(r(318));if(t=n.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(557));t[mn]=n}else vr(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Qt(n),t=!1}else a=Bu(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),t=!0;if(!t)return n.flags&256?(oi(n),n):(oi(n),null);if((n.flags&128)!==0)throw Error(r(558))}return Qt(n),null;case 13:if(o=n.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(u=$r(n),o!==null&&o.dehydrated!==null){if(t===null){if(!u)throw Error(r(318));if(u=n.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(r(317));u[mn]=n}else vr(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Qt(n),u=!1}else u=Bu(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=u),u=!0;if(!u)return n.flags&256?(oi(n),n):(oi(n),null)}return oi(n),(n.flags&128)!==0?(n.lanes=a,n):(a=o!==null,t=t!==null&&t.memoizedState!==null,a&&(o=n.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool),f=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(f=o.memoizedState.cachePool.pool),f!==u&&(o.flags|=2048)),a!==t&&a&&(n.child.flags|=8192),Hl(n,n.updateQueue),Qt(n),null);case 4:return He(),t===null&&Qf(n.stateNode.containerInfo),Qt(n),null;case 10:return ra(n.type),Qt(n),null;case 19:if(J(hn),o=n.memoizedState,o===null)return Qt(n),null;if(u=(n.flags&128)!==0,f=o.rendering,f===null)if(u)Eo(o,!1);else{if(cn!==0||t!==null&&(t.flags&128)!==0)for(t=n.child;t!==null;){if(f=Rl(t),f!==null){for(n.flags|=128,Eo(o,!1),t=f.updateQueue,n.updateQueue=t,Hl(n,t),n.subtreeFlags=0,t=a,a=n.child;a!==null;)Yp(a,t),a=a.sibling;return ye(hn,hn.current&1|2),Mt&&ia(n,o.treeForkCount),n.child}t=t.sibling}o.tail!==null&&Ft()>Wl&&(n.flags|=128,u=!0,Eo(o,!1),n.lanes=4194304)}else{if(!u)if(t=Rl(f),t!==null){if(n.flags|=128,u=!0,t=t.updateQueue,n.updateQueue=t,Hl(n,t),Eo(o,!0),o.tail===null&&o.tailMode==="hidden"&&!f.alternate&&!Mt)return Qt(n),null}else 2*Ft()-o.renderingStartTime>Wl&&a!==536870912&&(n.flags|=128,u=!0,Eo(o,!1),n.lanes=4194304);o.isBackwards?(f.sibling=n.child,n.child=f):(t=o.last,t!==null?t.sibling=f:n.child=f,o.last=f)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=Ft(),t.sibling=null,a=hn.current,ye(hn,u?a&1|2:a&1),Mt&&ia(n,o.treeForkCount),t):(Qt(n),null);case 22:case 23:return oi(n),Qu(),o=n.memoizedState!==null,t!==null?t.memoizedState!==null!==o&&(n.flags|=8192):o&&(n.flags|=8192),o?(a&536870912)!==0&&(n.flags&128)===0&&(Qt(n),n.subtreeFlags&6&&(n.flags|=8192)):Qt(n),a=n.updateQueue,a!==null&&Hl(n,a.retryQueue),a=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==a&&(n.flags|=2048),t!==null&&J(Mr),null;case 24:return a=null,t!==null&&(a=t.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),ra(_n),Qt(n),null;case 25:return null;case 30:return null}throw Error(r(156,n.tag))}function lS(t,n){switch(Pu(n),n.tag){case 1:return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 3:return ra(_n),He(),t=n.flags,(t&65536)!==0&&(t&128)===0?(n.flags=t&-65537|128,n):null;case 26:case 27:case 5:return Je(n),null;case 31:if(n.memoizedState!==null){if(oi(n),n.alternate===null)throw Error(r(340));vr()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 13:if(oi(n),t=n.memoizedState,t!==null&&t.dehydrated!==null){if(n.alternate===null)throw Error(r(340));vr()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 19:return J(hn),null;case 4:return He(),null;case 10:return ra(n.type),null;case 22:case 23:return oi(n),Qu(),t!==null&&J(Mr),t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 24:return ra(_n),null;case 25:return null;default:return null}}function S0(t,n){switch(Pu(n),n.tag){case 3:ra(_n),He();break;case 26:case 27:case 5:Je(n);break;case 4:He();break;case 31:n.memoizedState!==null&&oi(n);break;case 13:oi(n);break;case 19:J(hn);break;case 10:ra(n.type);break;case 22:case 23:oi(n),Qu(),t!==null&&J(Mr);break;case 24:ra(_n)}}function bo(t,n){try{var a=n.updateQueue,o=a!==null?a.lastEffect:null;if(o!==null){var u=o.next;a=u;do{if((a.tag&t)===t){o=void 0;var f=a.create,v=a.inst;o=f(),v.destroy=o}a=a.next}while(a!==u)}}catch(C){Bt(n,n.return,C)}}function Ga(t,n,a){try{var o=n.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var f=u.next;o=f;do{if((o.tag&t)===t){var v=o.inst,C=v.destroy;if(C!==void 0){v.destroy=void 0,u=n;var H=a,ee=C;try{ee()}catch(pe){Bt(u,H,pe)}}}o=o.next}while(o!==f)}}catch(pe){Bt(n,n.return,pe)}}function M0(t){var n=t.updateQueue;if(n!==null){var a=t.stateNode;try{fm(n,a)}catch(o){Bt(t,t.return,o)}}}function y0(t,n,a){a.props=Ar(t.type,t.memoizedProps),a.state=t.memoizedState;try{a.componentWillUnmount()}catch(o){Bt(t,n,o)}}function To(t,n){try{var a=t.ref;if(a!==null){switch(t.tag){case 26:case 27:case 5:var o=t.stateNode;break;case 30:o=t.stateNode;break;default:o=t.stateNode}typeof a=="function"?t.refCleanup=a(o):a.current=o}}catch(u){Bt(t,n,u)}}function Hi(t,n){var a=t.ref,o=t.refCleanup;if(a!==null)if(typeof o=="function")try{o()}catch(u){Bt(t,n,u)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(u){Bt(t,n,u)}else a.current=null}function E0(t){var n=t.type,a=t.memoizedProps,o=t.stateNode;try{e:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&o.focus();break e;case"img":a.src?o.src=a.src:a.srcSet&&(o.srcset=a.srcSet)}}catch(u){Bt(t,t.return,u)}}function wf(t,n,a){try{var o=t.stateNode;DS(o,t.type,a,n),o[Cn]=n}catch(u){Bt(t,t.return,u)}}function b0(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&Za(t.type)||t.tag===4}function Df(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||b0(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&Za(t.type)||t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Uf(t,n,a){var o=t.tag;if(o===5||o===6)t=t.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(t,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(t),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=ea));else if(o!==4&&(o===27&&Za(t.type)&&(a=t.stateNode,n=null),t=t.child,t!==null))for(Uf(t,n,a),t=t.sibling;t!==null;)Uf(t,n,a),t=t.sibling}function Gl(t,n,a){var o=t.tag;if(o===5||o===6)t=t.stateNode,n?a.insertBefore(t,n):a.appendChild(t);else if(o!==4&&(o===27&&Za(t.type)&&(a=t.stateNode),t=t.child,t!==null))for(Gl(t,n,a),t=t.sibling;t!==null;)Gl(t,n,a),t=t.sibling}function T0(t){var n=t.stateNode,a=t.memoizedProps;try{for(var o=t.type,u=n.attributes;u.length;)n.removeAttributeNode(u[0]);Nn(n,o,a),n[mn]=t,n[Cn]=a}catch(f){Bt(t,t.return,f)}}var ua=!1,Sn=!1,Nf=!1,A0=typeof WeakSet=="function"?WeakSet:Set,An=null;function cS(t,n){if(t=t.containerInfo,$f=lc,t=zp(t),bu(t)){if("selectionStart"in t)var a={start:t.selectionStart,end:t.selectionEnd};else e:{a=(a=t.ownerDocument)&&a.defaultView||window;var o=a.getSelection&&a.getSelection();if(o&&o.rangeCount!==0){a=o.anchorNode;var u=o.anchorOffset,f=o.focusNode;o=o.focusOffset;try{a.nodeType,f.nodeType}catch{a=null;break e}var v=0,C=-1,H=-1,ee=0,pe=0,ve=t,oe=null;t:for(;;){for(var ue;ve!==a||u!==0&&ve.nodeType!==3||(C=v+u),ve!==f||o!==0&&ve.nodeType!==3||(H=v+o),ve.nodeType===3&&(v+=ve.nodeValue.length),(ue=ve.firstChild)!==null;)oe=ve,ve=ue;for(;;){if(ve===t)break t;if(oe===a&&++ee===u&&(C=v),oe===f&&++pe===o&&(H=v),(ue=ve.nextSibling)!==null)break;ve=oe,oe=ve.parentNode}ve=ue}a=C===-1||H===-1?null:{start:C,end:H}}else a=null}a=a||{start:0,end:0}}else a=null;for(ed={focusedElem:t,selectionRange:a},lc=!1,An=n;An!==null;)if(n=An,t=n.child,(n.subtreeFlags&1028)!==0&&t!==null)t.return=n,An=t;else for(;An!==null;){switch(n=An,f=n.alternate,t=n.flags,n.tag){case 0:if((t&4)!==0&&(t=n.updateQueue,t=t!==null?t.events:null,t!==null))for(a=0;a<t.length;a++)u=t[a],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&f!==null){t=void 0,a=n,u=f.memoizedProps,f=f.memoizedState,o=a.stateNode;try{var We=Ar(a.type,u);t=o.getSnapshotBeforeUpdate(We,f),o.__reactInternalSnapshotBeforeUpdate=t}catch(tt){Bt(a,a.return,tt)}}break;case 3:if((t&1024)!==0){if(t=n.stateNode.containerInfo,a=t.nodeType,a===9)id(t);else if(a===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":id(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(r(163))}if(t=n.sibling,t!==null){t.return=n.return,An=t;break}An=n.return}}function R0(t,n,a){var o=a.flags;switch(a.tag){case 0:case 11:case 15:da(t,a),o&4&&bo(5,a);break;case 1:if(da(t,a),o&4)if(t=a.stateNode,n===null)try{t.componentDidMount()}catch(v){Bt(a,a.return,v)}else{var u=Ar(a.type,n.memoizedProps);n=n.memoizedState;try{t.componentDidUpdate(u,n,t.__reactInternalSnapshotBeforeUpdate)}catch(v){Bt(a,a.return,v)}}o&64&&M0(a),o&512&&To(a,a.return);break;case 3:if(da(t,a),o&64&&(t=a.updateQueue,t!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{fm(t,n)}catch(v){Bt(a,a.return,v)}}break;case 27:n===null&&o&4&&T0(a);case 26:case 5:da(t,a),n===null&&o&4&&E0(a),o&512&&To(a,a.return);break;case 12:da(t,a);break;case 31:da(t,a),o&4&&D0(t,a);break;case 13:da(t,a),o&4&&U0(t,a),o&64&&(t=a.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(a=vS.bind(null,a),zS(t,a))));break;case 22:if(o=a.memoizedState!==null||ua,!o){n=n!==null&&n.memoizedState!==null||Sn,u=ua;var f=Sn;ua=o,(Sn=n)&&!f?ha(t,a,(a.subtreeFlags&8772)!==0):da(t,a),ua=u,Sn=f}break;case 30:break;default:da(t,a)}}function C0(t){var n=t.alternate;n!==null&&(t.alternate=null,C0(n)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(n=t.stateNode,n!==null&&Ca(n)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var en=null,Zn=!1;function fa(t,n,a){for(a=a.child;a!==null;)w0(t,n,a),a=a.sibling}function w0(t,n,a){if(he&&typeof he.onCommitFiberUnmount=="function")try{he.onCommitFiberUnmount(fe,a)}catch{}switch(a.tag){case 26:Sn||Hi(a,n),fa(t,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:Sn||Hi(a,n);var o=en,u=Zn;Za(a.type)&&(en=a.stateNode,Zn=!1),fa(t,n,a),Oo(a.stateNode),en=o,Zn=u;break;case 5:Sn||Hi(a,n);case 6:if(o=en,u=Zn,en=null,fa(t,n,a),en=o,Zn=u,en!==null)if(Zn)try{(en.nodeType===9?en.body:en.nodeName==="HTML"?en.ownerDocument.body:en).removeChild(a.stateNode)}catch(f){Bt(a,n,f)}else try{en.removeChild(a.stateNode)}catch(f){Bt(a,n,f)}break;case 18:en!==null&&(Zn?(t=en,Mg(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,a.stateNode),Ss(t)):Mg(en,a.stateNode));break;case 4:o=en,u=Zn,en=a.stateNode.containerInfo,Zn=!0,fa(t,n,a),en=o,Zn=u;break;case 0:case 11:case 14:case 15:Ga(2,a,n),Sn||Ga(4,a,n),fa(t,n,a);break;case 1:Sn||(Hi(a,n),o=a.stateNode,typeof o.componentWillUnmount=="function"&&y0(a,n,o)),fa(t,n,a);break;case 21:fa(t,n,a);break;case 22:Sn=(o=Sn)||a.memoizedState!==null,fa(t,n,a),Sn=o;break;default:fa(t,n,a)}}function D0(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{Ss(t)}catch(a){Bt(n,n.return,a)}}}function U0(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{Ss(t)}catch(a){Bt(n,n.return,a)}}function uS(t){switch(t.tag){case 31:case 13:case 19:var n=t.stateNode;return n===null&&(n=t.stateNode=new A0),n;case 22:return t=t.stateNode,n=t._retryCache,n===null&&(n=t._retryCache=new A0),n;default:throw Error(r(435,t.tag))}}function Vl(t,n){var a=uS(t);n.forEach(function(o){if(!a.has(o)){a.add(o);var u=xS.bind(null,t,o);o.then(u,u)}})}function Kn(t,n){var a=n.deletions;if(a!==null)for(var o=0;o<a.length;o++){var u=a[o],f=t,v=n,C=v;e:for(;C!==null;){switch(C.tag){case 27:if(Za(C.type)){en=C.stateNode,Zn=!1;break e}break;case 5:en=C.stateNode,Zn=!1;break e;case 3:case 4:en=C.stateNode.containerInfo,Zn=!0;break e}C=C.return}if(en===null)throw Error(r(160));w0(f,v,u),en=null,Zn=!1,f=u.alternate,f!==null&&(f.return=null),u.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)N0(n,t),n=n.sibling}var Di=null;function N0(t,n){var a=t.alternate,o=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:Kn(n,t),Qn(t),o&4&&(Ga(3,t,t.return),bo(3,t),Ga(5,t,t.return));break;case 1:Kn(n,t),Qn(t),o&512&&(Sn||a===null||Hi(a,a.return)),o&64&&ua&&(t=t.updateQueue,t!==null&&(o=t.callbacks,o!==null&&(a=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=a===null?o:a.concat(o))));break;case 26:var u=Di;if(Kn(n,t),Qn(t),o&512&&(Sn||a===null||Hi(a,a.return)),o&4){var f=a!==null?a.memoizedState:null;if(o=t.memoizedState,a===null)if(o===null)if(t.stateNode===null){e:{o=t.type,a=t.memoizedProps,u=u.ownerDocument||u;t:switch(o){case"title":f=u.getElementsByTagName("title")[0],(!f||f[Ra]||f[mn]||f.namespaceURI==="http://www.w3.org/2000/svg"||f.hasAttribute("itemprop"))&&(f=u.createElement(o),u.head.insertBefore(f,u.querySelector("head > title"))),Nn(f,o,a),f[mn]=t,gn(f),o=f;break e;case"link":var v=Ng("link","href",u).get(o+(a.href||""));if(v){for(var C=0;C<v.length;C++)if(f=v[C],f.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&f.getAttribute("rel")===(a.rel==null?null:a.rel)&&f.getAttribute("title")===(a.title==null?null:a.title)&&f.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){v.splice(C,1);break t}}f=u.createElement(o),Nn(f,o,a),u.head.appendChild(f);break;case"meta":if(v=Ng("meta","content",u).get(o+(a.content||""))){for(C=0;C<v.length;C++)if(f=v[C],f.getAttribute("content")===(a.content==null?null:""+a.content)&&f.getAttribute("name")===(a.name==null?null:a.name)&&f.getAttribute("property")===(a.property==null?null:a.property)&&f.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&f.getAttribute("charset")===(a.charSet==null?null:a.charSet)){v.splice(C,1);break t}}f=u.createElement(o),Nn(f,o,a),u.head.appendChild(f);break;default:throw Error(r(468,o))}f[mn]=t,gn(f),o=f}t.stateNode=o}else Lg(u,t.type,t.stateNode);else t.stateNode=Ug(u,o,t.memoizedProps);else f!==o?(f===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):f.count--,o===null?Lg(u,t.type,t.stateNode):Ug(u,o,t.memoizedProps)):o===null&&t.stateNode!==null&&wf(t,t.memoizedProps,a.memoizedProps)}break;case 27:Kn(n,t),Qn(t),o&512&&(Sn||a===null||Hi(a,a.return)),a!==null&&o&4&&wf(t,t.memoizedProps,a.memoizedProps);break;case 5:if(Kn(n,t),Qn(t),o&512&&(Sn||a===null||Hi(a,a.return)),t.flags&32){u=t.stateNode;try{ii(u,"")}catch(We){Bt(t,t.return,We)}}o&4&&t.stateNode!=null&&(u=t.memoizedProps,wf(t,u,a!==null?a.memoizedProps:u)),o&1024&&(Nf=!0);break;case 6:if(Kn(n,t),Qn(t),o&4){if(t.stateNode===null)throw Error(r(162));o=t.memoizedProps,a=t.stateNode;try{a.nodeValue=o}catch(We){Bt(t,t.return,We)}}break;case 3:if(ac=null,u=Di,Di=nc(n.containerInfo),Kn(n,t),Di=u,Qn(t),o&4&&a!==null&&a.memoizedState.isDehydrated)try{Ss(n.containerInfo)}catch(We){Bt(t,t.return,We)}Nf&&(Nf=!1,L0(t));break;case 4:o=Di,Di=nc(t.stateNode.containerInfo),Kn(n,t),Qn(t),Di=o;break;case 12:Kn(n,t),Qn(t);break;case 31:Kn(n,t),Qn(t),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,Vl(t,o)));break;case 13:Kn(n,t),Qn(t),t.child.flags&8192&&t.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(Xl=Ft()),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,Vl(t,o)));break;case 22:u=t.memoizedState!==null;var H=a!==null&&a.memoizedState!==null,ee=ua,pe=Sn;if(ua=ee||u,Sn=pe||H,Kn(n,t),Sn=pe,ua=ee,Qn(t),o&8192)e:for(n=t.stateNode,n._visibility=u?n._visibility&-2:n._visibility|1,u&&(a===null||H||ua||Sn||Rr(t)),a=null,n=t;;){if(n.tag===5||n.tag===26){if(a===null){H=a=n;try{if(f=H.stateNode,u)v=f.style,typeof v.setProperty=="function"?v.setProperty("display","none","important"):v.display="none";else{C=H.stateNode;var ve=H.memoizedProps.style,oe=ve!=null&&ve.hasOwnProperty("display")?ve.display:null;C.style.display=oe==null||typeof oe=="boolean"?"":(""+oe).trim()}}catch(We){Bt(H,H.return,We)}}}else if(n.tag===6){if(a===null){H=n;try{H.stateNode.nodeValue=u?"":H.memoizedProps}catch(We){Bt(H,H.return,We)}}}else if(n.tag===18){if(a===null){H=n;try{var ue=H.stateNode;u?yg(ue,!0):yg(H.stateNode,!1)}catch(We){Bt(H,H.return,We)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===t)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break e;for(;n.sibling===null;){if(n.return===null||n.return===t)break e;a===n&&(a=null),n=n.return}a===n&&(a=null),n.sibling.return=n.return,n=n.sibling}o&4&&(o=t.updateQueue,o!==null&&(a=o.retryQueue,a!==null&&(o.retryQueue=null,Vl(t,a))));break;case 19:Kn(n,t),Qn(t),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,Vl(t,o)));break;case 30:break;case 21:break;default:Kn(n,t),Qn(t)}}function Qn(t){var n=t.flags;if(n&2){try{for(var a,o=t.return;o!==null;){if(b0(o)){a=o;break}o=o.return}if(a==null)throw Error(r(160));switch(a.tag){case 27:var u=a.stateNode,f=Df(t);Gl(t,f,u);break;case 5:var v=a.stateNode;a.flags&32&&(ii(v,""),a.flags&=-33);var C=Df(t);Gl(t,C,v);break;case 3:case 4:var H=a.stateNode.containerInfo,ee=Df(t);Uf(t,ee,H);break;default:throw Error(r(161))}}catch(pe){Bt(t,t.return,pe)}t.flags&=-3}n&4096&&(t.flags&=-4097)}function L0(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var n=t;L0(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),t=t.sibling}}function da(t,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)R0(t,n.alternate,n),n=n.sibling}function Rr(t){for(t=t.child;t!==null;){var n=t;switch(n.tag){case 0:case 11:case 14:case 15:Ga(4,n,n.return),Rr(n);break;case 1:Hi(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&y0(n,n.return,a),Rr(n);break;case 27:Oo(n.stateNode);case 26:case 5:Hi(n,n.return),Rr(n);break;case 22:n.memoizedState===null&&Rr(n);break;case 30:Rr(n);break;default:Rr(n)}t=t.sibling}}function ha(t,n,a){for(a=a&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var o=n.alternate,u=t,f=n,v=f.flags;switch(f.tag){case 0:case 11:case 15:ha(u,f,a),bo(4,f);break;case 1:if(ha(u,f,a),o=f,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(ee){Bt(o,o.return,ee)}if(o=f,u=o.updateQueue,u!==null){var C=o.stateNode;try{var H=u.shared.hiddenCallbacks;if(H!==null)for(u.shared.hiddenCallbacks=null,u=0;u<H.length;u++)um(H[u],C)}catch(ee){Bt(o,o.return,ee)}}a&&v&64&&M0(f),To(f,f.return);break;case 27:T0(f);case 26:case 5:ha(u,f,a),a&&o===null&&v&4&&E0(f),To(f,f.return);break;case 12:ha(u,f,a);break;case 31:ha(u,f,a),a&&v&4&&D0(u,f);break;case 13:ha(u,f,a),a&&v&4&&U0(u,f);break;case 22:f.memoizedState===null&&ha(u,f,a),To(f,f.return);break;case 30:break;default:ha(u,f,a)}n=n.sibling}}function Lf(t,n){var a=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),t=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(t=n.memoizedState.cachePool.pool),t!==a&&(t!=null&&t.refCount++,a!=null&&uo(a))}function Of(t,n){t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&uo(t))}function Ui(t,n,a,o){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)O0(t,n,a,o),n=n.sibling}function O0(t,n,a,o){var u=n.flags;switch(n.tag){case 0:case 11:case 15:Ui(t,n,a,o),u&2048&&bo(9,n);break;case 1:Ui(t,n,a,o);break;case 3:Ui(t,n,a,o),u&2048&&(t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&uo(t)));break;case 12:if(u&2048){Ui(t,n,a,o),t=n.stateNode;try{var f=n.memoizedProps,v=f.id,C=f.onPostCommit;typeof C=="function"&&C(v,n.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(H){Bt(n,n.return,H)}}else Ui(t,n,a,o);break;case 31:Ui(t,n,a,o);break;case 13:Ui(t,n,a,o);break;case 23:break;case 22:f=n.stateNode,v=n.alternate,n.memoizedState!==null?f._visibility&2?Ui(t,n,a,o):Ao(t,n):f._visibility&2?Ui(t,n,a,o):(f._visibility|=2,cs(t,n,a,o,(n.subtreeFlags&10256)!==0||!1)),u&2048&&Lf(v,n);break;case 24:Ui(t,n,a,o),u&2048&&Of(n.alternate,n);break;default:Ui(t,n,a,o)}}function cs(t,n,a,o,u){for(u=u&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var f=t,v=n,C=a,H=o,ee=v.flags;switch(v.tag){case 0:case 11:case 15:cs(f,v,C,H,u),bo(8,v);break;case 23:break;case 22:var pe=v.stateNode;v.memoizedState!==null?pe._visibility&2?cs(f,v,C,H,u):Ao(f,v):(pe._visibility|=2,cs(f,v,C,H,u)),u&&ee&2048&&Lf(v.alternate,v);break;case 24:cs(f,v,C,H,u),u&&ee&2048&&Of(v.alternate,v);break;default:cs(f,v,C,H,u)}n=n.sibling}}function Ao(t,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=t,o=n,u=o.flags;switch(o.tag){case 22:Ao(a,o),u&2048&&Lf(o.alternate,o);break;case 24:Ao(a,o),u&2048&&Of(o.alternate,o);break;default:Ao(a,o)}n=n.sibling}}var Ro=8192;function us(t,n,a){if(t.subtreeFlags&Ro)for(t=t.child;t!==null;)P0(t,n,a),t=t.sibling}function P0(t,n,a){switch(t.tag){case 26:us(t,n,a),t.flags&Ro&&t.memoizedState!==null&&QS(a,Di,t.memoizedState,t.memoizedProps);break;case 5:us(t,n,a);break;case 3:case 4:var o=Di;Di=nc(t.stateNode.containerInfo),us(t,n,a),Di=o;break;case 22:t.memoizedState===null&&(o=t.alternate,o!==null&&o.memoizedState!==null?(o=Ro,Ro=16777216,us(t,n,a),Ro=o):us(t,n,a));break;default:us(t,n,a)}}function I0(t){var n=t.alternate;if(n!==null&&(t=n.child,t!==null)){n.child=null;do n=t.sibling,t.sibling=null,t=n;while(t!==null)}}function Co(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];An=o,z0(o,t)}I0(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)B0(t),t=t.sibling}function B0(t){switch(t.tag){case 0:case 11:case 15:Co(t),t.flags&2048&&Ga(9,t,t.return);break;case 3:Co(t);break;case 12:Co(t);break;case 22:var n=t.stateNode;t.memoizedState!==null&&n._visibility&2&&(t.return===null||t.return.tag!==13)?(n._visibility&=-3,kl(t)):Co(t);break;default:Co(t)}}function kl(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];An=o,z0(o,t)}I0(t)}for(t=t.child;t!==null;){switch(n=t,n.tag){case 0:case 11:case 15:Ga(8,n,n.return),kl(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,kl(n));break;default:kl(n)}t=t.sibling}}function z0(t,n){for(;An!==null;){var a=An;switch(a.tag){case 0:case 11:case 15:Ga(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var o=a.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:uo(a.memoizedState.cache)}if(o=a.child,o!==null)o.return=a,An=o;else e:for(a=t;An!==null;){o=An;var u=o.sibling,f=o.return;if(C0(o),o===a){An=null;break e}if(u!==null){u.return=f,An=u;break e}An=f}}}var fS={getCacheForType:function(t){var n=Dn(_n),a=n.data.get(t);return a===void 0&&(a=t(),n.data.set(t,a)),a},cacheSignal:function(){return Dn(_n).controller.signal}},dS=typeof WeakMap=="function"?WeakMap:Map,Dt=0,Xt=null,pt=null,gt=0,It=0,li=null,Va=!1,fs=!1,Pf=!1,pa=0,cn=0,ka=0,Cr=0,If=0,ci=0,ds=0,wo=null,Jn=null,Bf=!1,Xl=0,F0=0,Wl=1/0,ql=null,Xa=null,En=0,Wa=null,hs=null,ma=0,zf=0,Ff=null,H0=null,Do=0,Hf=null;function ui(){return(Dt&2)!==0&&gt!==0?gt&-gt:z.T!==null?qf():js()}function G0(){if(ci===0)if((gt&536870912)===0||Mt){var t=at;at<<=1,(at&3932160)===0&&(at=262144),ci=t}else ci=536870912;return t=si.current,t!==null&&(t.flags|=32),ci}function jn(t,n,a){(t===Xt&&(It===2||It===9)||t.cancelPendingCommit!==null)&&(ps(t,0),qa(t,gt,ci,!1)),Ve(t,a),((Dt&2)===0||t!==Xt)&&(t===Xt&&((Dt&2)===0&&(Cr|=a),cn===4&&qa(t,gt,ci,!1)),Gi(t))}function V0(t,n,a){if((Dt&6)!==0)throw Error(r(327));var o=!a&&(n&127)===0&&(n&t.expiredLanes)===0||Ce(t,n),u=o?mS(t,n):Vf(t,n,!0),f=o;do{if(u===0){fs&&!o&&qa(t,n,0,!1);break}else{if(a=t.current.alternate,f&&!hS(a)){u=Vf(t,n,!1),f=!1;continue}if(u===2){if(f=n,t.errorRecoveryDisabledLanes&f)var v=0;else v=t.pendingLanes&-536870913,v=v!==0?v:v&536870912?536870912:0;if(v!==0){n=v;e:{var C=t;u=wo;var H=C.current.memoizedState.isDehydrated;if(H&&(ps(C,v).flags|=256),v=Vf(C,v,!1),v!==2){if(Pf&&!H){C.errorRecoveryDisabledLanes|=f,Cr|=f,u=4;break e}f=Jn,Jn=u,f!==null&&(Jn===null?Jn=f:Jn.push.apply(Jn,f))}u=v}if(f=!1,u!==2)continue}}if(u===1){ps(t,0),qa(t,n,0,!0);break}e:{switch(o=t,f=u,f){case 0:case 1:throw Error(r(345));case 4:if((n&4194048)!==n)break;case 6:qa(o,n,ci,!Va);break e;case 2:Jn=null;break;case 3:case 5:break;default:throw Error(r(329))}if((n&62914560)===n&&(u=Xl+300-Ft(),10<u)){if(qa(o,n,ci,!Va),me(o,0,!0)!==0)break e;ma=n,o.timeoutHandle=xg(k0.bind(null,o,a,Jn,ql,Bf,n,ci,Cr,ds,Va,f,"Throttled",-0,0),u);break e}k0(o,a,Jn,ql,Bf,n,ci,Cr,ds,Va,f,null,-0,0)}}break}while(!0);Gi(t)}function k0(t,n,a,o,u,f,v,C,H,ee,pe,ve,oe,ue){if(t.timeoutHandle=-1,ve=n.subtreeFlags,ve&8192||(ve&16785408)===16785408){ve={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:ea},P0(n,f,ve);var We=(f&62914560)===f?Xl-Ft():(f&4194048)===f?F0-Ft():0;if(We=JS(ve,We),We!==null){ma=f,t.cancelPendingCommit=We(J0.bind(null,t,n,f,a,o,u,v,C,H,pe,ve,null,oe,ue)),qa(t,f,v,!ee);return}}J0(t,n,f,a,o,u,v,C,H)}function hS(t){for(var n=t;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var o=0;o<a.length;o++){var u=a[o],f=u.getSnapshot;u=u.value;try{if(!ai(f(),u))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function qa(t,n,a,o){n&=~If,n&=~Cr,t.suspendedLanes|=n,t.pingedLanes&=~n,o&&(t.warmLanes|=n),o=t.expirationTimes;for(var u=n;0<u;){var f=31-ze(u),v=1<<f;o[f]=-1,u&=~v}a!==0&&Nt(t,a,n)}function Yl(){return(Dt&6)===0?(Uo(0),!1):!0}function Gf(){if(pt!==null){if(It===0)var t=pt.return;else t=pt,aa=xr=null,nf(t),as=null,ho=0,t=pt;for(;t!==null;)S0(t.alternate,t),t=t.return;pt=null}}function ps(t,n){var a=t.timeoutHandle;a!==-1&&(t.timeoutHandle=-1,LS(a)),a=t.cancelPendingCommit,a!==null&&(t.cancelPendingCommit=null,a()),ma=0,Gf(),Xt=t,pt=a=na(t.current,null),gt=n,It=0,li=null,Va=!1,fs=Ce(t,n),Pf=!1,ds=ci=If=Cr=ka=cn=0,Jn=wo=null,Bf=!1,(n&8)!==0&&(n|=n&32);var o=t.entangledLanes;if(o!==0)for(t=t.entanglements,o&=n;0<o;){var u=31-ze(o),f=1<<u;n|=t[u],o&=~f}return pa=n,pl(),a}function X0(t,n){lt=null,z.H=Mo,n===is||n===yl?(n=sm(),It=3):n===Xu?(n=sm(),It=4):It=n===xf?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,li=n,pt===null&&(cn=1,Il(t,gi(n,t.current)))}function W0(){var t=si.current;return t===null?!0:(gt&4194048)===gt?Si===null:(gt&62914560)===gt||(gt&536870912)!==0?t===Si:!1}function q0(){var t=z.H;return z.H=Mo,t===null?Mo:t}function Y0(){var t=z.A;return z.A=fS,t}function Zl(){cn=4,Va||(gt&4194048)!==gt&&si.current!==null||(fs=!0),(ka&134217727)===0&&(Cr&134217727)===0||Xt===null||qa(Xt,gt,ci,!1)}function Vf(t,n,a){var o=Dt;Dt|=2;var u=q0(),f=Y0();(Xt!==t||gt!==n)&&(ql=null,ps(t,n)),n=!1;var v=cn;e:do try{if(It!==0&&pt!==null){var C=pt,H=li;switch(It){case 8:Gf(),v=6;break e;case 3:case 2:case 9:case 6:si.current===null&&(n=!0);var ee=It;if(It=0,li=null,ms(t,C,H,ee),a&&fs){v=0;break e}break;default:ee=It,It=0,li=null,ms(t,C,H,ee)}}pS(),v=cn;break}catch(pe){X0(t,pe)}while(!0);return n&&t.shellSuspendCounter++,aa=xr=null,Dt=o,z.H=u,z.A=f,pt===null&&(Xt=null,gt=0,pl()),v}function pS(){for(;pt!==null;)Z0(pt)}function mS(t,n){var a=Dt;Dt|=2;var o=q0(),u=Y0();Xt!==t||gt!==n?(ql=null,Wl=Ft()+500,ps(t,n)):fs=Ce(t,n);e:do try{if(It!==0&&pt!==null){n=pt;var f=li;t:switch(It){case 1:It=0,li=null,ms(t,n,f,1);break;case 2:case 9:if(am(f)){It=0,li=null,K0(n);break}n=function(){It!==2&&It!==9||Xt!==t||(It=7),Gi(t)},f.then(n,n);break e;case 3:It=7;break e;case 4:It=5;break e;case 7:am(f)?(It=0,li=null,K0(n)):(It=0,li=null,ms(t,n,f,7));break;case 5:var v=null;switch(pt.tag){case 26:v=pt.memoizedState;case 5:case 27:var C=pt;if(v?Og(v):C.stateNode.complete){It=0,li=null;var H=C.sibling;if(H!==null)pt=H;else{var ee=C.return;ee!==null?(pt=ee,Kl(ee)):pt=null}break t}}It=0,li=null,ms(t,n,f,5);break;case 6:It=0,li=null,ms(t,n,f,6);break;case 8:Gf(),cn=6;break e;default:throw Error(r(462))}}gS();break}catch(pe){X0(t,pe)}while(!0);return aa=xr=null,z.H=o,z.A=u,Dt=a,pt!==null?0:(Xt=null,gt=0,pl(),cn)}function gS(){for(;pt!==null&&!on();)Z0(pt)}function Z0(t){var n=v0(t.alternate,t,pa);t.memoizedProps=t.pendingProps,n===null?Kl(t):pt=n}function K0(t){var n=t,a=n.alternate;switch(n.tag){case 15:case 0:n=d0(a,n,n.pendingProps,n.type,void 0,gt);break;case 11:n=d0(a,n,n.pendingProps,n.type.render,n.ref,gt);break;case 5:nf(n);default:S0(a,n),n=pt=Yp(n,pa),n=v0(a,n,pa)}t.memoizedProps=t.pendingProps,n===null?Kl(t):pt=n}function ms(t,n,a,o){aa=xr=null,nf(n),as=null,ho=0;var u=n.return;try{if(aS(t,u,n,a,gt)){cn=1,Il(t,gi(a,t.current)),pt=null;return}}catch(f){if(u!==null)throw pt=u,f;cn=1,Il(t,gi(a,t.current)),pt=null;return}n.flags&32768?(Mt||o===1?t=!0:fs||(gt&536870912)!==0?t=!1:(Va=t=!0,(o===2||o===9||o===3||o===6)&&(o=si.current,o!==null&&o.tag===13&&(o.flags|=16384))),Q0(n,t)):Kl(n)}function Kl(t){var n=t;do{if((n.flags&32768)!==0){Q0(n,Va);return}t=n.return;var a=oS(n.alternate,n,pa);if(a!==null){pt=a;return}if(n=n.sibling,n!==null){pt=n;return}pt=n=t}while(n!==null);cn===0&&(cn=5)}function Q0(t,n){do{var a=lS(t.alternate,t);if(a!==null){a.flags&=32767,pt=a;return}if(a=t.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(t=t.sibling,t!==null)){pt=t;return}pt=t=a}while(t!==null);cn=6,pt=null}function J0(t,n,a,o,u,f,v,C,H){t.cancelPendingCommit=null;do Ql();while(En!==0);if((Dt&6)!==0)throw Error(r(327));if(n!==null){if(n===t.current)throw Error(r(177));if(f=n.lanes|n.childLanes,f|=wu,Jt(t,a,f,v,C,H),t===Xt&&(pt=Xt=null,gt=0),hs=n,Wa=t,ma=a,zf=f,Ff=u,H0=o,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,SS(j,function(){return ng(),null})):(t.callbackNode=null,t.callbackPriority=0),o=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||o){o=z.T,z.T=null,u=F.p,F.p=2,v=Dt,Dt|=4;try{cS(t,n,a)}finally{Dt=v,F.p=u,z.T=o}}En=1,j0(),$0(),eg()}}function j0(){if(En===1){En=0;var t=Wa,n=hs,a=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||a){a=z.T,z.T=null;var o=F.p;F.p=2;var u=Dt;Dt|=4;try{N0(n,t);var f=ed,v=zp(t.containerInfo),C=f.focusedElem,H=f.selectionRange;if(v!==C&&C&&C.ownerDocument&&Bp(C.ownerDocument.documentElement,C)){if(H!==null&&bu(C)){var ee=H.start,pe=H.end;if(pe===void 0&&(pe=ee),"selectionStart"in C)C.selectionStart=ee,C.selectionEnd=Math.min(pe,C.value.length);else{var ve=C.ownerDocument||document,oe=ve&&ve.defaultView||window;if(oe.getSelection){var ue=oe.getSelection(),We=C.textContent.length,tt=Math.min(H.start,We),Vt=H.end===void 0?tt:Math.min(H.end,We);!ue.extend&&tt>Vt&&(v=Vt,Vt=tt,tt=v);var K=Ip(C,tt),V=Ip(C,Vt);if(K&&V&&(ue.rangeCount!==1||ue.anchorNode!==K.node||ue.anchorOffset!==K.offset||ue.focusNode!==V.node||ue.focusOffset!==V.offset)){var $=ve.createRange();$.setStart(K.node,K.offset),ue.removeAllRanges(),tt>Vt?(ue.addRange($),ue.extend(V.node,V.offset)):($.setEnd(V.node,V.offset),ue.addRange($))}}}}for(ve=[],ue=C;ue=ue.parentNode;)ue.nodeType===1&&ve.push({element:ue,left:ue.scrollLeft,top:ue.scrollTop});for(typeof C.focus=="function"&&C.focus(),C=0;C<ve.length;C++){var _e=ve[C];_e.element.scrollLeft=_e.left,_e.element.scrollTop=_e.top}}lc=!!$f,ed=$f=null}finally{Dt=u,F.p=o,z.T=a}}t.current=n,En=2}}function $0(){if(En===2){En=0;var t=Wa,n=hs,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=z.T,z.T=null;var o=F.p;F.p=2;var u=Dt;Dt|=4;try{R0(t,n.alternate,n)}finally{Dt=u,F.p=o,z.T=a}}En=3}}function eg(){if(En===4||En===3){En=0,q();var t=Wa,n=hs,a=ma,o=H0;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?En=5:(En=0,hs=Wa=null,tg(t,t.pendingLanes));var u=t.pendingLanes;if(u===0&&(Xa=null),Js(a),n=n.stateNode,he&&typeof he.onCommitFiberRoot=="function")try{he.onCommitFiberRoot(fe,n,void 0,(n.current.flags&128)===128)}catch{}if(o!==null){n=z.T,u=F.p,F.p=2,z.T=null;try{for(var f=t.onRecoverableError,v=0;v<o.length;v++){var C=o[v];f(C.value,{componentStack:C.stack})}}finally{z.T=n,F.p=u}}(ma&3)!==0&&Ql(),Gi(t),u=t.pendingLanes,(a&261930)!==0&&(u&42)!==0?t===Hf?Do++:(Do=0,Hf=t):Do=0,Uo(0)}}function tg(t,n){(t.pooledCacheLanes&=n)===0&&(n=t.pooledCache,n!=null&&(t.pooledCache=null,uo(n)))}function Ql(){return j0(),$0(),eg(),ng()}function ng(){if(En!==5)return!1;var t=Wa,n=zf;zf=0;var a=Js(ma),o=z.T,u=F.p;try{F.p=32>a?32:a,z.T=null,a=Ff,Ff=null;var f=Wa,v=ma;if(En=0,hs=Wa=null,ma=0,(Dt&6)!==0)throw Error(r(331));var C=Dt;if(Dt|=4,B0(f.current),O0(f,f.current,v,a),Dt=C,Uo(0,!1),he&&typeof he.onPostCommitFiberRoot=="function")try{he.onPostCommitFiberRoot(fe,f)}catch{}return!0}finally{F.p=u,z.T=o,tg(t,n)}}function ig(t,n,a){n=gi(a,n),n=vf(t.stateNode,n,2),t=za(t,n,2),t!==null&&(Ve(t,2),Gi(t))}function Bt(t,n,a){if(t.tag===3)ig(t,t,a);else for(;n!==null;){if(n.tag===3){ig(n,t,a);break}else if(n.tag===1){var o=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(Xa===null||!Xa.has(o))){t=gi(a,t),a=a0(2),o=za(n,a,2),o!==null&&(r0(a,o,n,t),Ve(o,2),Gi(o));break}}n=n.return}}function kf(t,n,a){var o=t.pingCache;if(o===null){o=t.pingCache=new dS;var u=new Set;o.set(n,u)}else u=o.get(n),u===void 0&&(u=new Set,o.set(n,u));u.has(a)||(Pf=!0,u.add(a),t=_S.bind(null,t,n,a),n.then(t,t))}function _S(t,n,a){var o=t.pingCache;o!==null&&o.delete(n),t.pingedLanes|=t.suspendedLanes&a,t.warmLanes&=~a,Xt===t&&(gt&a)===a&&(cn===4||cn===3&&(gt&62914560)===gt&&300>Ft()-Xl?(Dt&2)===0&&ps(t,0):If|=a,ds===gt&&(ds=0)),Gi(t)}function ag(t,n){n===0&&(n=Se()),t=gr(t,n),t!==null&&(Ve(t,n),Gi(t))}function vS(t){var n=t.memoizedState,a=0;n!==null&&(a=n.retryLane),ag(t,a)}function xS(t,n){var a=0;switch(t.tag){case 31:case 13:var o=t.stateNode,u=t.memoizedState;u!==null&&(a=u.retryLane);break;case 19:o=t.stateNode;break;case 22:o=t.stateNode._retryCache;break;default:throw Error(r(314))}o!==null&&o.delete(n),ag(t,a)}function SS(t,n){return dn(t,n)}var Jl=null,gs=null,Xf=!1,jl=!1,Wf=!1,Ya=0;function Gi(t){t!==gs&&t.next===null&&(gs===null?Jl=gs=t:gs=gs.next=t),jl=!0,Xf||(Xf=!0,yS())}function Uo(t,n){if(!Wf&&jl){Wf=!0;do for(var a=!1,o=Jl;o!==null;){if(t!==0){var u=o.pendingLanes;if(u===0)var f=0;else{var v=o.suspendedLanes,C=o.pingedLanes;f=(1<<31-ze(42|t)+1)-1,f&=u&~(v&~C),f=f&201326741?f&201326741|1:f?f|2:0}f!==0&&(a=!0,lg(o,f))}else f=gt,f=me(o,o===Xt?f:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(f&3)===0||Ce(o,f)||(a=!0,lg(o,f));o=o.next}while(a);Wf=!1}}function MS(){rg()}function rg(){jl=Xf=!1;var t=0;Ya!==0&&NS()&&(t=Ya);for(var n=Ft(),a=null,o=Jl;o!==null;){var u=o.next,f=sg(o,n);f===0?(o.next=null,a===null?Jl=u:a.next=u,u===null&&(gs=a)):(a=o,(t!==0||(f&3)!==0)&&(jl=!0)),o=u}En!==0&&En!==5||Uo(t),Ya!==0&&(Ya=0)}function sg(t,n){for(var a=t.suspendedLanes,o=t.pingedLanes,u=t.expirationTimes,f=t.pendingLanes&-62914561;0<f;){var v=31-ze(f),C=1<<v,H=u[v];H===-1?((C&a)===0||(C&o)!==0)&&(u[v]=Be(C,n)):H<=n&&(t.expiredLanes|=C),f&=~C}if(n=Xt,a=gt,a=me(t,t===n?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),o=t.callbackNode,a===0||t===n&&(It===2||It===9)||t.cancelPendingCommit!==null)return o!==null&&o!==null&&Wt(o),t.callbackNode=null,t.callbackPriority=0;if((a&3)===0||Ce(t,a)){if(n=a&-a,n===t.callbackPriority)return n;switch(o!==null&&Wt(o),Js(a)){case 2:case 8:a=E;break;case 32:a=j;break;case 268435456:a=de;break;default:a=j}return o=og.bind(null,t),a=dn(a,o),t.callbackPriority=n,t.callbackNode=a,n}return o!==null&&o!==null&&Wt(o),t.callbackPriority=2,t.callbackNode=null,2}function og(t,n){if(En!==0&&En!==5)return t.callbackNode=null,t.callbackPriority=0,null;var a=t.callbackNode;if(Ql()&&t.callbackNode!==a)return null;var o=gt;return o=me(t,t===Xt?o:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),o===0?null:(V0(t,o,n),sg(t,Ft()),t.callbackNode!=null&&t.callbackNode===a?og.bind(null,t):null)}function lg(t,n){if(Ql())return null;V0(t,n,!0)}function yS(){OS(function(){(Dt&6)!==0?dn(O,MS):rg()})}function qf(){if(Ya===0){var t=ts;t===0&&(t=je,je<<=1,(je&261888)===0&&(je=256)),Ya=t}return Ya}function cg(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:dr(""+t)}function ug(t,n){var a=n.ownerDocument.createElement("input");return a.name=n.name,a.value=n.value,t.id&&a.setAttribute("form",t.id),n.parentNode.insertBefore(a,n),t=new FormData(t),a.parentNode.removeChild(a),t}function ES(t,n,a,o,u){if(n==="submit"&&a&&a.stateNode===u){var f=cg((u[Cn]||null).action),v=o.submitter;v&&(n=(n=v[Cn]||null)?cg(n.formAction):v.getAttribute("formAction"),n!==null&&(f=n,v=null));var C=new ul("action","action",null,o,u);t.push({event:C,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(Ya!==0){var H=v?ug(u,v):new FormData(u);df(a,{pending:!0,data:H,method:u.method,action:f},null,H)}}else typeof f=="function"&&(C.preventDefault(),H=v?ug(u,v):new FormData(u),df(a,{pending:!0,data:H,method:u.method,action:f},f,H))},currentTarget:u}]})}}for(var Yf=0;Yf<Cu.length;Yf++){var Zf=Cu[Yf],bS=Zf.toLowerCase(),TS=Zf[0].toUpperCase()+Zf.slice(1);wi(bS,"on"+TS)}wi(Gp,"onAnimationEnd"),wi(Vp,"onAnimationIteration"),wi(kp,"onAnimationStart"),wi("dblclick","onDoubleClick"),wi("focusin","onFocus"),wi("focusout","onBlur"),wi(Gx,"onTransitionRun"),wi(Vx,"onTransitionStart"),wi(kx,"onTransitionCancel"),wi(Xp,"onTransitionEnd"),se("onMouseEnter",["mouseout","mouseover"]),se("onMouseLeave",["mouseout","mouseover"]),se("onPointerEnter",["pointerout","pointerover"]),se("onPointerLeave",["pointerout","pointerover"]),W("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),W("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),W("onBeforeInput",["compositionend","keypress","textInput","paste"]),W("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),W("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),W("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var No="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),AS=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(No));function fg(t,n){n=(n&4)!==0;for(var a=0;a<t.length;a++){var o=t[a],u=o.event;o=o.listeners;e:{var f=void 0;if(n)for(var v=o.length-1;0<=v;v--){var C=o[v],H=C.instance,ee=C.currentTarget;if(C=C.listener,H!==f&&u.isPropagationStopped())break e;f=C,u.currentTarget=ee;try{f(u)}catch(pe){hl(pe)}u.currentTarget=null,f=H}else for(v=0;v<o.length;v++){if(C=o[v],H=C.instance,ee=C.currentTarget,C=C.listener,H!==f&&u.isPropagationStopped())break e;f=C,u.currentTarget=ee;try{f(u)}catch(pe){hl(pe)}u.currentTarget=null,f=H}}}}function mt(t,n){var a=n[cr];a===void 0&&(a=n[cr]=new Set);var o=t+"__bubble";a.has(o)||(dg(n,t,2,!1),a.add(o))}function Kf(t,n,a){var o=0;n&&(o|=4),dg(a,t,o,n)}var $l="_reactListening"+Math.random().toString(36).slice(2);function Qf(t){if(!t[$l]){t[$l]=!0,sl.forEach(function(a){a!=="selectionchange"&&(AS.has(a)||Kf(a,!1,t),Kf(a,!0,t))});var n=t.nodeType===9?t:t.ownerDocument;n===null||n[$l]||(n[$l]=!0,Kf("selectionchange",!1,n))}}function dg(t,n,a,o){switch(Gg(n)){case 2:var u=eM;break;case 8:u=tM;break;default:u=fd}a=u.bind(null,n,a,t),u=void 0,!mu||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(u=!0),o?u!==void 0?t.addEventListener(n,a,{capture:!0,passive:u}):t.addEventListener(n,a,!0):u!==void 0?t.addEventListener(n,a,{passive:u}):t.addEventListener(n,a,!1)}function Jf(t,n,a,o,u){var f=o;if((n&1)===0&&(n&2)===0&&o!==null)e:for(;;){if(o===null)return;var v=o.tag;if(v===3||v===4){var C=o.stateNode.containerInfo;if(C===u)break;if(v===4)for(v=o.return;v!==null;){var H=v.tag;if((H===3||H===4)&&v.stateNode.containerInfo===u)return;v=v.return}for(;C!==null;){if(v=ji(C),v===null)return;if(H=v.tag,H===5||H===6||H===26||H===27){o=f=v;continue e}C=C.parentNode}}o=o.return}_p(function(){var ee=f,pe=hu(a),ve=[];e:{var oe=Wp.get(t);if(oe!==void 0){var ue=ul,We=t;switch(t){case"keypress":if(ll(a)===0)break e;case"keydown":case"keyup":ue=xx;break;case"focusin":We="focus",ue=xu;break;case"focusout":We="blur",ue=xu;break;case"beforeblur":case"afterblur":ue=xu;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ue=Sp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ue=ox;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ue=yx;break;case Gp:case Vp:case kp:ue=ux;break;case Xp:ue=bx;break;case"scroll":case"scrollend":ue=rx;break;case"wheel":ue=Ax;break;case"copy":case"cut":case"paste":ue=dx;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ue=yp;break;case"toggle":case"beforetoggle":ue=Cx}var tt=(n&4)!==0,Vt=!tt&&(t==="scroll"||t==="scrollend"),K=tt?oe!==null?oe+"Capture":null:oe;tt=[];for(var V=ee,$;V!==null;){var _e=V;if($=_e.stateNode,_e=_e.tag,_e!==5&&_e!==26&&_e!==27||$===null||K===null||(_e=$s(V,K),_e!=null&&tt.push(Lo(V,_e,$))),Vt)break;V=V.return}0<tt.length&&(oe=new ue(oe,We,null,a,pe),ve.push({event:oe,listeners:tt}))}}if((n&7)===0){e:{if(oe=t==="mouseover"||t==="pointerover",ue=t==="mouseout"||t==="pointerout",oe&&a!==du&&(We=a.relatedTarget||a.fromElement)&&(ji(We)||We[qn]))break e;if((ue||oe)&&(oe=pe.window===pe?pe:(oe=pe.ownerDocument)?oe.defaultView||oe.parentWindow:window,ue?(We=a.relatedTarget||a.toElement,ue=ee,We=We?ji(We):null,We!==null&&(Vt=c(We),tt=We.tag,We!==Vt||tt!==5&&tt!==27&&tt!==6)&&(We=null)):(ue=null,We=ee),ue!==We)){if(tt=Sp,_e="onMouseLeave",K="onMouseEnter",V="mouse",(t==="pointerout"||t==="pointerover")&&(tt=yp,_e="onPointerLeave",K="onPointerEnter",V="pointer"),Vt=ue==null?oe:fr(ue),$=We==null?oe:fr(We),oe=new tt(_e,V+"leave",ue,a,pe),oe.target=Vt,oe.relatedTarget=$,_e=null,ji(pe)===ee&&(tt=new tt(K,V+"enter",We,a,pe),tt.target=$,tt.relatedTarget=Vt,_e=tt),Vt=_e,ue&&We)t:{for(tt=RS,K=ue,V=We,$=0,_e=K;_e;_e=tt(_e))$++;_e=0;for(var et=V;et;et=tt(et))_e++;for(;0<$-_e;)K=tt(K),$--;for(;0<_e-$;)V=tt(V),_e--;for(;$--;){if(K===V||V!==null&&K===V.alternate){tt=K;break t}K=tt(K),V=tt(V)}tt=null}else tt=null;ue!==null&&hg(ve,oe,ue,tt,!1),We!==null&&Vt!==null&&hg(ve,Vt,We,tt,!0)}}e:{if(oe=ee?fr(ee):window,ue=oe.nodeName&&oe.nodeName.toLowerCase(),ue==="select"||ue==="input"&&oe.type==="file")var Rt=Dp;else if(Cp(oe))if(Up)Rt=zx;else{Rt=Ix;var Ye=Px}else ue=oe.nodeName,!ue||ue.toLowerCase()!=="input"||oe.type!=="checkbox"&&oe.type!=="radio"?ee&&Ut(ee.elementType)&&(Rt=Dp):Rt=Bx;if(Rt&&(Rt=Rt(t,ee))){wp(ve,Rt,a,pe);break e}Ye&&Ye(t,oe,ee),t==="focusout"&&ee&&oe.type==="number"&&ee.memoizedProps.value!=null&&ht(oe,"number",oe.value)}switch(Ye=ee?fr(ee):window,t){case"focusin":(Cp(Ye)||Ye.contentEditable==="true")&&(Yr=Ye,Tu=ee,oo=null);break;case"focusout":oo=Tu=Yr=null;break;case"mousedown":Au=!0;break;case"contextmenu":case"mouseup":case"dragend":Au=!1,Fp(ve,a,pe);break;case"selectionchange":if(Hx)break;case"keydown":case"keyup":Fp(ve,a,pe)}var ct;if(Mu)e:{switch(t){case"compositionstart":var _t="onCompositionStart";break e;case"compositionend":_t="onCompositionEnd";break e;case"compositionupdate":_t="onCompositionUpdate";break e}_t=void 0}else qr?Ap(t,a)&&(_t="onCompositionEnd"):t==="keydown"&&a.keyCode===229&&(_t="onCompositionStart");_t&&(Ep&&a.locale!=="ko"&&(qr||_t!=="onCompositionStart"?_t==="onCompositionEnd"&&qr&&(ct=vp()):(Ua=pe,gu="value"in Ua?Ua.value:Ua.textContent,qr=!0)),Ye=ec(ee,_t),0<Ye.length&&(_t=new Mp(_t,t,null,a,pe),ve.push({event:_t,listeners:Ye}),ct?_t.data=ct:(ct=Rp(a),ct!==null&&(_t.data=ct)))),(ct=Dx?Ux(t,a):Nx(t,a))&&(_t=ec(ee,"onBeforeInput"),0<_t.length&&(Ye=new Mp("onBeforeInput","beforeinput",null,a,pe),ve.push({event:Ye,listeners:_t}),Ye.data=ct)),ES(ve,t,ee,a,pe)}fg(ve,n)})}function Lo(t,n,a){return{instance:t,listener:n,currentTarget:a}}function ec(t,n){for(var a=n+"Capture",o=[];t!==null;){var u=t,f=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||f===null||(u=$s(t,a),u!=null&&o.unshift(Lo(t,u,f)),u=$s(t,n),u!=null&&o.push(Lo(t,u,f))),t.tag===3)return o;t=t.return}return[]}function RS(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function hg(t,n,a,o,u){for(var f=n._reactName,v=[];a!==null&&a!==o;){var C=a,H=C.alternate,ee=C.stateNode;if(C=C.tag,H!==null&&H===o)break;C!==5&&C!==26&&C!==27||ee===null||(H=ee,u?(ee=$s(a,f),ee!=null&&v.unshift(Lo(a,ee,H))):u||(ee=$s(a,f),ee!=null&&v.push(Lo(a,ee,H)))),a=a.return}v.length!==0&&t.push({event:n,listeners:v})}var CS=/\r\n?/g,wS=/\u0000|\uFFFD/g;function pg(t){return(typeof t=="string"?t:""+t).replace(CS,`
`).replace(wS,"")}function mg(t,n){return n=pg(n),pg(t)===n}function Gt(t,n,a,o,u,f){switch(a){case"children":typeof o=="string"?n==="body"||n==="textarea"&&o===""||ii(t,o):(typeof o=="number"||typeof o=="bigint")&&n!=="body"&&ii(t,""+o);break;case"className":Xe(t,"class",o);break;case"tabIndex":Xe(t,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":Xe(t,a,o);break;case"style":Ci(t,o,f);break;case"data":if(n!=="object"){Xe(t,"data",o);break}case"src":case"href":if(o===""&&(n!=="a"||a!=="href")){t.removeAttribute(a);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){t.removeAttribute(a);break}o=dr(""+o),t.setAttribute(a,o);break;case"action":case"formAction":if(typeof o=="function"){t.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof f=="function"&&(a==="formAction"?(n!=="input"&&Gt(t,n,"name",u.name,u,null),Gt(t,n,"formEncType",u.formEncType,u,null),Gt(t,n,"formMethod",u.formMethod,u,null),Gt(t,n,"formTarget",u.formTarget,u,null)):(Gt(t,n,"encType",u.encType,u,null),Gt(t,n,"method",u.method,u,null),Gt(t,n,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){t.removeAttribute(a);break}o=dr(""+o),t.setAttribute(a,o);break;case"onClick":o!=null&&(t.onclick=ea);break;case"onScroll":o!=null&&mt("scroll",t);break;case"onScrollEnd":o!=null&&mt("scrollend",t);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(r(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(r(60));t.innerHTML=a}}break;case"multiple":t.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":t.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){t.removeAttribute("xlink:href");break}a=dr(""+o),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,""+o):t.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,""):t.removeAttribute(a);break;case"capture":case"download":o===!0?t.setAttribute(a,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,o):t.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?t.setAttribute(a,o):t.removeAttribute(a);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?t.removeAttribute(a):t.setAttribute(a,o);break;case"popover":mt("beforetoggle",t),mt("toggle",t),Ne(t,"popover",o);break;case"xlinkActuate":ke(t,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":ke(t,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":ke(t,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":ke(t,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":ke(t,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":ke(t,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":ke(t,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":ke(t,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":ke(t,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":Ne(t,"is",o);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=Bi.get(a)||a,Ne(t,a,o))}}function jf(t,n,a,o,u,f){switch(a){case"style":Ci(t,o,f);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(r(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(r(60));t.innerHTML=a}}break;case"children":typeof o=="string"?ii(t,o):(typeof o=="number"||typeof o=="bigint")&&ii(t,""+o);break;case"onScroll":o!=null&&mt("scroll",t);break;case"onScrollEnd":o!=null&&mt("scrollend",t);break;case"onClick":o!=null&&(t.onclick=ea);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!R.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(u=a.endsWith("Capture"),n=a.slice(2,u?a.length-7:void 0),f=t[Cn]||null,f=f!=null?f[a]:null,typeof f=="function"&&t.removeEventListener(n,f,u),typeof o=="function")){typeof f!="function"&&f!==null&&(a in t?t[a]=null:t.hasAttribute(a)&&t.removeAttribute(a)),t.addEventListener(n,o,u);break e}a in t?t[a]=o:o===!0?t.setAttribute(a,""):Ne(t,a,o)}}}function Nn(t,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":mt("error",t),mt("load",t);var o=!1,u=!1,f;for(f in a)if(a.hasOwnProperty(f)){var v=a[f];if(v!=null)switch(f){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(r(137,n));default:Gt(t,n,f,v,a,null)}}u&&Gt(t,n,"srcSet",a.srcSet,a,null),o&&Gt(t,n,"src",a.src,a,null);return;case"input":mt("invalid",t);var C=f=v=u=null,H=null,ee=null;for(o in a)if(a.hasOwnProperty(o)){var pe=a[o];if(pe!=null)switch(o){case"name":u=pe;break;case"type":v=pe;break;case"checked":H=pe;break;case"defaultChecked":ee=pe;break;case"value":f=pe;break;case"defaultValue":C=pe;break;case"children":case"dangerouslySetInnerHTML":if(pe!=null)throw Error(r(137,n));break;default:Gt(t,n,o,pe,a,null)}}Pn(t,f,C,H,ee,v,u,!1);return;case"select":mt("invalid",t),o=v=f=null;for(u in a)if(a.hasOwnProperty(u)&&(C=a[u],C!=null))switch(u){case"value":f=C;break;case"defaultValue":v=C;break;case"multiple":o=C;default:Gt(t,n,u,C,a,null)}n=f,a=v,t.multiple=!!o,n!=null?yn(t,!!o,n,!1):a!=null&&yn(t,!!o,a,!0);return;case"textarea":mt("invalid",t),f=u=o=null;for(v in a)if(a.hasOwnProperty(v)&&(C=a[v],C!=null))switch(v){case"value":o=C;break;case"defaultValue":u=C;break;case"children":f=C;break;case"dangerouslySetInnerHTML":if(C!=null)throw Error(r(91));break;default:Gt(t,n,v,C,a,null)}Ri(t,o,u,f);return;case"option":for(H in a)if(a.hasOwnProperty(H)&&(o=a[H],o!=null))switch(H){case"selected":t.selected=o&&typeof o!="function"&&typeof o!="symbol";break;default:Gt(t,n,H,o,a,null)}return;case"dialog":mt("beforetoggle",t),mt("toggle",t),mt("cancel",t),mt("close",t);break;case"iframe":case"object":mt("load",t);break;case"video":case"audio":for(o=0;o<No.length;o++)mt(No[o],t);break;case"image":mt("error",t),mt("load",t);break;case"details":mt("toggle",t);break;case"embed":case"source":case"link":mt("error",t),mt("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(ee in a)if(a.hasOwnProperty(ee)&&(o=a[ee],o!=null))switch(ee){case"children":case"dangerouslySetInnerHTML":throw Error(r(137,n));default:Gt(t,n,ee,o,a,null)}return;default:if(Ut(n)){for(pe in a)a.hasOwnProperty(pe)&&(o=a[pe],o!==void 0&&jf(t,n,pe,o,a,void 0));return}}for(C in a)a.hasOwnProperty(C)&&(o=a[C],o!=null&&Gt(t,n,C,o,a,null))}function DS(t,n,a,o){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,f=null,v=null,C=null,H=null,ee=null,pe=null;for(ue in a){var ve=a[ue];if(a.hasOwnProperty(ue)&&ve!=null)switch(ue){case"checked":break;case"value":break;case"defaultValue":H=ve;default:o.hasOwnProperty(ue)||Gt(t,n,ue,null,o,ve)}}for(var oe in o){var ue=o[oe];if(ve=a[oe],o.hasOwnProperty(oe)&&(ue!=null||ve!=null))switch(oe){case"type":f=ue;break;case"name":u=ue;break;case"checked":ee=ue;break;case"defaultChecked":pe=ue;break;case"value":v=ue;break;case"defaultValue":C=ue;break;case"children":case"dangerouslySetInnerHTML":if(ue!=null)throw Error(r(137,n));break;default:ue!==ve&&Gt(t,n,oe,ue,o,ve)}}Fe(t,v,C,H,ee,pe,f,u);return;case"select":ue=v=C=oe=null;for(f in a)if(H=a[f],a.hasOwnProperty(f)&&H!=null)switch(f){case"value":break;case"multiple":ue=H;default:o.hasOwnProperty(f)||Gt(t,n,f,null,o,H)}for(u in o)if(f=o[u],H=a[u],o.hasOwnProperty(u)&&(f!=null||H!=null))switch(u){case"value":oe=f;break;case"defaultValue":C=f;break;case"multiple":v=f;default:f!==H&&Gt(t,n,u,f,o,H)}n=C,a=v,o=ue,oe!=null?yn(t,!!a,oe,!1):!!o!=!!a&&(n!=null?yn(t,!!a,n,!0):yn(t,!!a,a?[]:"",!1));return;case"textarea":ue=oe=null;for(C in a)if(u=a[C],a.hasOwnProperty(C)&&u!=null&&!o.hasOwnProperty(C))switch(C){case"value":break;case"children":break;default:Gt(t,n,C,null,o,u)}for(v in o)if(u=o[v],f=a[v],o.hasOwnProperty(v)&&(u!=null||f!=null))switch(v){case"value":oe=u;break;case"defaultValue":ue=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(r(91));break;default:u!==f&&Gt(t,n,v,u,o,f)}ni(t,oe,ue);return;case"option":for(var We in a)if(oe=a[We],a.hasOwnProperty(We)&&oe!=null&&!o.hasOwnProperty(We))switch(We){case"selected":t.selected=!1;break;default:Gt(t,n,We,null,o,oe)}for(H in o)if(oe=o[H],ue=a[H],o.hasOwnProperty(H)&&oe!==ue&&(oe!=null||ue!=null))switch(H){case"selected":t.selected=oe&&typeof oe!="function"&&typeof oe!="symbol";break;default:Gt(t,n,H,oe,o,ue)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var tt in a)oe=a[tt],a.hasOwnProperty(tt)&&oe!=null&&!o.hasOwnProperty(tt)&&Gt(t,n,tt,null,o,oe);for(ee in o)if(oe=o[ee],ue=a[ee],o.hasOwnProperty(ee)&&oe!==ue&&(oe!=null||ue!=null))switch(ee){case"children":case"dangerouslySetInnerHTML":if(oe!=null)throw Error(r(137,n));break;default:Gt(t,n,ee,oe,o,ue)}return;default:if(Ut(n)){for(var Vt in a)oe=a[Vt],a.hasOwnProperty(Vt)&&oe!==void 0&&!o.hasOwnProperty(Vt)&&jf(t,n,Vt,void 0,o,oe);for(pe in o)oe=o[pe],ue=a[pe],!o.hasOwnProperty(pe)||oe===ue||oe===void 0&&ue===void 0||jf(t,n,pe,oe,o,ue);return}}for(var K in a)oe=a[K],a.hasOwnProperty(K)&&oe!=null&&!o.hasOwnProperty(K)&&Gt(t,n,K,null,o,oe);for(ve in o)oe=o[ve],ue=a[ve],!o.hasOwnProperty(ve)||oe===ue||oe==null&&ue==null||Gt(t,n,ve,oe,o,ue)}function gg(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function US(){if(typeof performance.getEntriesByType=="function"){for(var t=0,n=0,a=performance.getEntriesByType("resource"),o=0;o<a.length;o++){var u=a[o],f=u.transferSize,v=u.initiatorType,C=u.duration;if(f&&C&&gg(v)){for(v=0,C=u.responseEnd,o+=1;o<a.length;o++){var H=a[o],ee=H.startTime;if(ee>C)break;var pe=H.transferSize,ve=H.initiatorType;pe&&gg(ve)&&(H=H.responseEnd,v+=pe*(H<C?1:(C-ee)/(H-ee)))}if(--o,n+=8*(f+v)/(u.duration/1e3),t++,10<t)break}}if(0<t)return n/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var $f=null,ed=null;function tc(t){return t.nodeType===9?t:t.ownerDocument}function _g(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function vg(t,n){if(t===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&n==="foreignObject"?0:t}function td(t,n){return t==="textarea"||t==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var nd=null;function NS(){var t=window.event;return t&&t.type==="popstate"?t===nd?!1:(nd=t,!0):(nd=null,!1)}var xg=typeof setTimeout=="function"?setTimeout:void 0,LS=typeof clearTimeout=="function"?clearTimeout:void 0,Sg=typeof Promise=="function"?Promise:void 0,OS=typeof queueMicrotask=="function"?queueMicrotask:typeof Sg<"u"?function(t){return Sg.resolve(null).then(t).catch(PS)}:xg;function PS(t){setTimeout(function(){throw t})}function Za(t){return t==="head"}function Mg(t,n){var a=n,o=0;do{var u=a.nextSibling;if(t.removeChild(a),u&&u.nodeType===8)if(a=u.data,a==="/$"||a==="/&"){if(o===0){t.removeChild(u),Ss(n);return}o--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")o++;else if(a==="html")Oo(t.ownerDocument.documentElement);else if(a==="head"){a=t.ownerDocument.head,Oo(a);for(var f=a.firstChild;f;){var v=f.nextSibling,C=f.nodeName;f[Ra]||C==="SCRIPT"||C==="STYLE"||C==="LINK"&&f.rel.toLowerCase()==="stylesheet"||a.removeChild(f),f=v}}else a==="body"&&Oo(t.ownerDocument.body);a=u}while(a);Ss(n)}function yg(t,n){var a=t;t=0;do{var o=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(t===0)break;t--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||t++;a=o}while(a)}function id(t){var n=t.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":id(a),Ca(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}t.removeChild(a)}}function IS(t,n,a,o){for(;t.nodeType===1;){var u=a;if(t.nodeName.toLowerCase()!==n.toLowerCase()){if(!o&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(o){if(!t[Ra])switch(n){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(f=t.getAttribute("rel"),f==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(f!==u.rel||t.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||t.getAttribute("title")!==(u.title==null?null:u.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(f=t.getAttribute("src"),(f!==(u.src==null?null:u.src)||t.getAttribute("type")!==(u.type==null?null:u.type)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&f&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(n==="input"&&t.type==="hidden"){var f=u.name==null?null:""+u.name;if(u.type==="hidden"&&t.getAttribute("name")===f)return t}else return t;if(t=Mi(t.nextSibling),t===null)break}return null}function BS(t,n,a){if(n==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!a||(t=Mi(t.nextSibling),t===null))return null;return t}function Eg(t,n){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=Mi(t.nextSibling),t===null))return null;return t}function ad(t){return t.data==="$?"||t.data==="$~"}function rd(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function zS(t,n){var a=t.ownerDocument;if(t.data==="$~")t._reactRetry=n;else if(t.data!=="$?"||a.readyState!=="loading")n();else{var o=function(){n(),a.removeEventListener("DOMContentLoaded",o)};a.addEventListener("DOMContentLoaded",o),t._reactRetry=o}}function Mi(t){for(;t!=null;t=t.nextSibling){var n=t.nodeType;if(n===1||n===3)break;if(n===8){if(n=t.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return t}var sd=null;function bg(t){t=t.nextSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="/$"||a==="/&"){if(n===0)return Mi(t.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}t=t.nextSibling}return null}function Tg(t){t=t.previousSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return t;n--}else a!=="/$"&&a!=="/&"||n++}t=t.previousSibling}return null}function Ag(t,n,a){switch(n=tc(a),t){case"html":if(t=n.documentElement,!t)throw Error(r(452));return t;case"head":if(t=n.head,!t)throw Error(r(453));return t;case"body":if(t=n.body,!t)throw Error(r(454));return t;default:throw Error(r(451))}}function Oo(t){for(var n=t.attributes;n.length;)t.removeAttributeNode(n[0]);Ca(t)}var yi=new Map,Rg=new Set;function nc(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var ga=F.d;F.d={f:FS,r:HS,D:GS,C:VS,L:kS,m:XS,X:qS,S:WS,M:YS};function FS(){var t=ga.f(),n=Yl();return t||n}function HS(t){var n=$i(t);n!==null&&n.tag===5&&n.type==="form"?Xm(n):ga.r(t)}var _s=typeof document>"u"?null:document;function Cg(t,n,a){var o=_s;if(o&&typeof n=="string"&&n){var u=Ot(n);u='link[rel="'+t+'"][href="'+u+'"]',typeof a=="string"&&(u+='[crossorigin="'+a+'"]'),Rg.has(u)||(Rg.add(u),t={rel:t,crossOrigin:a,href:n},o.querySelector(u)===null&&(n=o.createElement("link"),Nn(n,"link",t),gn(n),o.head.appendChild(n)))}}function GS(t){ga.D(t),Cg("dns-prefetch",t,null)}function VS(t,n){ga.C(t,n),Cg("preconnect",t,n)}function kS(t,n,a){ga.L(t,n,a);var o=_s;if(o&&t&&n){var u='link[rel="preload"][as="'+Ot(n)+'"]';n==="image"&&a&&a.imageSrcSet?(u+='[imagesrcset="'+Ot(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(u+='[imagesizes="'+Ot(a.imageSizes)+'"]')):u+='[href="'+Ot(t)+'"]';var f=u;switch(n){case"style":f=vs(t);break;case"script":f=xs(t)}yi.has(f)||(t=x({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:t,as:n},a),yi.set(f,t),o.querySelector(u)!==null||n==="style"&&o.querySelector(Po(f))||n==="script"&&o.querySelector(Io(f))||(n=o.createElement("link"),Nn(n,"link",t),gn(n),o.head.appendChild(n)))}}function XS(t,n){ga.m(t,n);var a=_s;if(a&&t){var o=n&&typeof n.as=="string"?n.as:"script",u='link[rel="modulepreload"][as="'+Ot(o)+'"][href="'+Ot(t)+'"]',f=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":f=xs(t)}if(!yi.has(f)&&(t=x({rel:"modulepreload",href:t},n),yi.set(f,t),a.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Io(f)))return}o=a.createElement("link"),Nn(o,"link",t),gn(o),a.head.appendChild(o)}}}function WS(t,n,a){ga.S(t,n,a);var o=_s;if(o&&t){var u=wa(o).hoistableStyles,f=vs(t);n=n||"default";var v=u.get(f);if(!v){var C={loading:0,preload:null};if(v=o.querySelector(Po(f)))C.loading=5;else{t=x({rel:"stylesheet",href:t,"data-precedence":n},a),(a=yi.get(f))&&od(t,a);var H=v=o.createElement("link");gn(H),Nn(H,"link",t),H._p=new Promise(function(ee,pe){H.onload=ee,H.onerror=pe}),H.addEventListener("load",function(){C.loading|=1}),H.addEventListener("error",function(){C.loading|=2}),C.loading|=4,ic(v,n,o)}v={type:"stylesheet",instance:v,count:1,state:C},u.set(f,v)}}}function qS(t,n){ga.X(t,n);var a=_s;if(a&&t){var o=wa(a).hoistableScripts,u=xs(t),f=o.get(u);f||(f=a.querySelector(Io(u)),f||(t=x({src:t,async:!0},n),(n=yi.get(u))&&ld(t,n),f=a.createElement("script"),gn(f),Nn(f,"link",t),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},o.set(u,f))}}function YS(t,n){ga.M(t,n);var a=_s;if(a&&t){var o=wa(a).hoistableScripts,u=xs(t),f=o.get(u);f||(f=a.querySelector(Io(u)),f||(t=x({src:t,async:!0,type:"module"},n),(n=yi.get(u))&&ld(t,n),f=a.createElement("script"),gn(f),Nn(f,"link",t),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},o.set(u,f))}}function wg(t,n,a,o){var u=(u=ae.current)?nc(u):null;if(!u)throw Error(r(446));switch(t){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(n=vs(a.href),a=wa(u).hoistableStyles,o=a.get(n),o||(o={type:"style",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){t=vs(a.href);var f=wa(u).hoistableStyles,v=f.get(t);if(v||(u=u.ownerDocument||u,v={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},f.set(t,v),(f=u.querySelector(Po(t)))&&!f._p&&(v.instance=f,v.state.loading=5),yi.has(t)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},yi.set(t,a),f||ZS(u,t,a,v.state))),n&&o===null)throw Error(r(528,""));return v}if(n&&o!==null)throw Error(r(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=xs(a),a=wa(u).hoistableScripts,o=a.get(n),o||(o={type:"script",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(r(444,t))}}function vs(t){return'href="'+Ot(t)+'"'}function Po(t){return'link[rel="stylesheet"]['+t+"]"}function Dg(t){return x({},t,{"data-precedence":t.precedence,precedence:null})}function ZS(t,n,a,o){t.querySelector('link[rel="preload"][as="style"]['+n+"]")?o.loading=1:(n=t.createElement("link"),o.preload=n,n.addEventListener("load",function(){return o.loading|=1}),n.addEventListener("error",function(){return o.loading|=2}),Nn(n,"link",a),gn(n),t.head.appendChild(n))}function xs(t){return'[src="'+Ot(t)+'"]'}function Io(t){return"script[async]"+t}function Ug(t,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var o=t.querySelector('style[data-href~="'+Ot(a.href)+'"]');if(o)return n.instance=o,gn(o),o;var u=x({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return o=(t.ownerDocument||t).createElement("style"),gn(o),Nn(o,"style",u),ic(o,a.precedence,t),n.instance=o;case"stylesheet":u=vs(a.href);var f=t.querySelector(Po(u));if(f)return n.state.loading|=4,n.instance=f,gn(f),f;o=Dg(a),(u=yi.get(u))&&od(o,u),f=(t.ownerDocument||t).createElement("link"),gn(f);var v=f;return v._p=new Promise(function(C,H){v.onload=C,v.onerror=H}),Nn(f,"link",o),n.state.loading|=4,ic(f,a.precedence,t),n.instance=f;case"script":return f=xs(a.src),(u=t.querySelector(Io(f)))?(n.instance=u,gn(u),u):(o=a,(u=yi.get(f))&&(o=x({},a),ld(o,u)),t=t.ownerDocument||t,u=t.createElement("script"),gn(u),Nn(u,"link",o),t.head.appendChild(u),n.instance=u);case"void":return null;default:throw Error(r(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(o=n.instance,n.state.loading|=4,ic(o,a.precedence,t));return n.instance}function ic(t,n,a){for(var o=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,f=u,v=0;v<o.length;v++){var C=o[v];if(C.dataset.precedence===n)f=C;else if(f!==u)break}f?f.parentNode.insertBefore(t,f.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(t,n.firstChild))}function od(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.title==null&&(t.title=n.title)}function ld(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.integrity==null&&(t.integrity=n.integrity)}var ac=null;function Ng(t,n,a){if(ac===null){var o=new Map,u=ac=new Map;u.set(a,o)}else u=ac,o=u.get(a),o||(o=new Map,u.set(a,o));if(o.has(t))return o;for(o.set(t,null),a=a.getElementsByTagName(t),u=0;u<a.length;u++){var f=a[u];if(!(f[Ra]||f[mn]||t==="link"&&f.getAttribute("rel")==="stylesheet")&&f.namespaceURI!=="http://www.w3.org/2000/svg"){var v=f.getAttribute(n)||"";v=t+v;var C=o.get(v);C?C.push(f):o.set(v,[f])}}return o}function Lg(t,n,a){t=t.ownerDocument||t,t.head.insertBefore(a,n==="title"?t.querySelector("head > title"):null)}function KS(t,n,a){if(a===1||n.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;switch(n.rel){case"stylesheet":return t=n.disabled,typeof n.precedence=="string"&&t==null;default:return!0}case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function Og(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function QS(t,n,a,o){if(a.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var u=vs(o.href),f=n.querySelector(Po(u));if(f){n=f._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(t.count++,t=rc.bind(t),n.then(t,t)),a.state.loading|=4,a.instance=f,gn(f);return}f=n.ownerDocument||n,o=Dg(o),(u=yi.get(u))&&od(o,u),f=f.createElement("link"),gn(f);var v=f;v._p=new Promise(function(C,H){v.onload=C,v.onerror=H}),Nn(f,"link",o),a.instance=f}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(t.count++,a=rc.bind(t),n.addEventListener("load",a),n.addEventListener("error",a))}}var cd=0;function JS(t,n){return t.stylesheets&&t.count===0&&oc(t,t.stylesheets),0<t.count||0<t.imgCount?function(a){var o=setTimeout(function(){if(t.stylesheets&&oc(t,t.stylesheets),t.unsuspend){var f=t.unsuspend;t.unsuspend=null,f()}},6e4+n);0<t.imgBytes&&cd===0&&(cd=62500*US());var u=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&oc(t,t.stylesheets),t.unsuspend)){var f=t.unsuspend;t.unsuspend=null,f()}},(t.imgBytes>cd?50:800)+n);return t.unsuspend=a,function(){t.unsuspend=null,clearTimeout(o),clearTimeout(u)}}:null}function rc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)oc(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var sc=null;function oc(t,n){t.stylesheets=null,t.unsuspend!==null&&(t.count++,sc=new Map,n.forEach(jS,t),sc=null,rc.call(t))}function jS(t,n){if(!(n.state.loading&4)){var a=sc.get(t);if(a)var o=a.get(null);else{a=new Map,sc.set(t,a);for(var u=t.querySelectorAll("link[data-precedence],style[data-precedence]"),f=0;f<u.length;f++){var v=u[f];(v.nodeName==="LINK"||v.getAttribute("media")!=="not all")&&(a.set(v.dataset.precedence,v),o=v)}o&&a.set(null,o)}u=n.instance,v=u.getAttribute("data-precedence"),f=a.get(v)||o,f===o&&a.set(null,u),a.set(v,u),this.count++,o=rc.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),f?f.parentNode.insertBefore(u,f.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(u,t.firstChild)),n.state.loading|=4}}var Bo={$$typeof:U,Provider:null,Consumer:null,_currentValue:te,_currentValue2:te,_threadCount:0};function $S(t,n,a,o,u,f,v,C,H){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=qe(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=qe(0),this.hiddenUpdates=qe(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=f,this.onRecoverableError=v,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=H,this.incompleteTransitions=new Map}function Pg(t,n,a,o,u,f,v,C,H,ee,pe,ve){return t=new $S(t,n,a,v,H,ee,pe,ve,C),n=1,f===!0&&(n|=24),f=ri(3,null,null,n),t.current=f,f.stateNode=t,n=Gu(),n.refCount++,t.pooledCache=n,n.refCount++,f.memoizedState={element:o,isDehydrated:a,cache:n},Wu(f),t}function Ig(t){return t?(t=Qr,t):Qr}function Bg(t,n,a,o,u,f){u=Ig(u),o.context===null?o.context=u:o.pendingContext=u,o=Ba(n),o.payload={element:a},f=f===void 0?null:f,f!==null&&(o.callback=f),a=za(t,o,n),a!==null&&(jn(a,t,n),mo(a,t,n))}function zg(t,n){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var a=t.retryLane;t.retryLane=a!==0&&a<n?a:n}}function ud(t,n){zg(t,n),(t=t.alternate)&&zg(t,n)}function Fg(t){if(t.tag===13||t.tag===31){var n=gr(t,67108864);n!==null&&jn(n,t,67108864),ud(t,67108864)}}function Hg(t){if(t.tag===13||t.tag===31){var n=ui();n=Qs(n);var a=gr(t,n);a!==null&&jn(a,t,n),ud(t,n)}}var lc=!0;function eM(t,n,a,o){var u=z.T;z.T=null;var f=F.p;try{F.p=2,fd(t,n,a,o)}finally{F.p=f,z.T=u}}function tM(t,n,a,o){var u=z.T;z.T=null;var f=F.p;try{F.p=8,fd(t,n,a,o)}finally{F.p=f,z.T=u}}function fd(t,n,a,o){if(lc){var u=dd(o);if(u===null)Jf(t,n,o,cc,a),Vg(t,o);else if(iM(u,t,n,a,o))o.stopPropagation();else if(Vg(t,o),n&4&&-1<nM.indexOf(t)){for(;u!==null;){var f=$i(u);if(f!==null)switch(f.tag){case 3:if(f=f.stateNode,f.current.memoizedState.isDehydrated){var v=Te(f.pendingLanes);if(v!==0){var C=f;for(C.pendingLanes|=2,C.entangledLanes|=2;v;){var H=1<<31-ze(v);C.entanglements[1]|=H,v&=~H}Gi(f),(Dt&6)===0&&(Wl=Ft()+500,Uo(0))}}break;case 31:case 13:C=gr(f,2),C!==null&&jn(C,f,2),Yl(),ud(f,2)}if(f=dd(o),f===null&&Jf(t,n,o,cc,a),f===u)break;u=f}u!==null&&o.stopPropagation()}else Jf(t,n,o,null,a)}}function dd(t){return t=hu(t),hd(t)}var cc=null;function hd(t){if(cc=null,t=ji(t),t!==null){var n=c(t);if(n===null)t=null;else{var a=n.tag;if(a===13){if(t=d(n),t!==null)return t;t=null}else if(a===31){if(t=p(n),t!==null)return t;t=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;t=null}else n!==t&&(t=null)}}return cc=t,null}function Gg(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(wt()){case O:return 2;case E:return 8;case j:case re:return 32;case de:return 268435456;default:return 32}default:return 32}}var pd=!1,Ka=null,Qa=null,Ja=null,zo=new Map,Fo=new Map,ja=[],nM="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Vg(t,n){switch(t){case"focusin":case"focusout":Ka=null;break;case"dragenter":case"dragleave":Qa=null;break;case"mouseover":case"mouseout":Ja=null;break;case"pointerover":case"pointerout":zo.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Fo.delete(n.pointerId)}}function Ho(t,n,a,o,u,f){return t===null||t.nativeEvent!==f?(t={blockedOn:n,domEventName:a,eventSystemFlags:o,nativeEvent:f,targetContainers:[u]},n!==null&&(n=$i(n),n!==null&&Fg(n)),t):(t.eventSystemFlags|=o,n=t.targetContainers,u!==null&&n.indexOf(u)===-1&&n.push(u),t)}function iM(t,n,a,o,u){switch(n){case"focusin":return Ka=Ho(Ka,t,n,a,o,u),!0;case"dragenter":return Qa=Ho(Qa,t,n,a,o,u),!0;case"mouseover":return Ja=Ho(Ja,t,n,a,o,u),!0;case"pointerover":var f=u.pointerId;return zo.set(f,Ho(zo.get(f)||null,t,n,a,o,u)),!0;case"gotpointercapture":return f=u.pointerId,Fo.set(f,Ho(Fo.get(f)||null,t,n,a,o,u)),!0}return!1}function kg(t){var n=ji(t.target);if(n!==null){var a=c(n);if(a!==null){if(n=a.tag,n===13){if(n=d(a),n!==null){t.blockedOn=n,kr(t.priority,function(){Hg(a)});return}}else if(n===31){if(n=p(a),n!==null){t.blockedOn=n,kr(t.priority,function(){Hg(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){t.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}t.blockedOn=null}function uc(t){if(t.blockedOn!==null)return!1;for(var n=t.targetContainers;0<n.length;){var a=dd(t.nativeEvent);if(a===null){a=t.nativeEvent;var o=new a.constructor(a.type,a);du=o,a.target.dispatchEvent(o),du=null}else return n=$i(a),n!==null&&Fg(n),t.blockedOn=a,!1;n.shift()}return!0}function Xg(t,n,a){uc(t)&&a.delete(n)}function aM(){pd=!1,Ka!==null&&uc(Ka)&&(Ka=null),Qa!==null&&uc(Qa)&&(Qa=null),Ja!==null&&uc(Ja)&&(Ja=null),zo.forEach(Xg),Fo.forEach(Xg)}function fc(t,n){t.blockedOn===n&&(t.blockedOn=null,pd||(pd=!0,s.unstable_scheduleCallback(s.unstable_NormalPriority,aM)))}var dc=null;function Wg(t){dc!==t&&(dc=t,s.unstable_scheduleCallback(s.unstable_NormalPriority,function(){dc===t&&(dc=null);for(var n=0;n<t.length;n+=3){var a=t[n],o=t[n+1],u=t[n+2];if(typeof o!="function"){if(hd(o||a)===null)continue;break}var f=$i(a);f!==null&&(t.splice(n,3),n-=3,df(f,{pending:!0,data:u,method:a.method,action:o},o,u))}}))}function Ss(t){function n(H){return fc(H,t)}Ka!==null&&fc(Ka,t),Qa!==null&&fc(Qa,t),Ja!==null&&fc(Ja,t),zo.forEach(n),Fo.forEach(n);for(var a=0;a<ja.length;a++){var o=ja[a];o.blockedOn===t&&(o.blockedOn=null)}for(;0<ja.length&&(a=ja[0],a.blockedOn===null);)kg(a),a.blockedOn===null&&ja.shift();if(a=(t.ownerDocument||t).$$reactFormReplay,a!=null)for(o=0;o<a.length;o+=3){var u=a[o],f=a[o+1],v=u[Cn]||null;if(typeof f=="function")v||Wg(a);else if(v){var C=null;if(f&&f.hasAttribute("formAction")){if(u=f,v=f[Cn]||null)C=v.formAction;else if(hd(u)!==null)continue}else C=v.action;typeof C=="function"?a[o+1]=C:(a.splice(o,3),o-=3),Wg(a)}}}function qg(){function t(f){f.canIntercept&&f.info==="react-transition"&&f.intercept({handler:function(){return new Promise(function(v){return u=v})},focusReset:"manual",scroll:"manual"})}function n(){u!==null&&(u(),u=null),o||setTimeout(a,20)}function a(){if(!o&&!navigation.transition){var f=navigation.currentEntry;f&&f.url!=null&&navigation.navigate(f.url,{state:f.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,u=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){o=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),u!==null&&(u(),u=null)}}}function md(t){this._internalRoot=t}hc.prototype.render=md.prototype.render=function(t){var n=this._internalRoot;if(n===null)throw Error(r(409));var a=n.current,o=ui();Bg(a,o,t,n,null,null)},hc.prototype.unmount=md.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var n=t.containerInfo;Bg(t.current,2,null,t,null,null),Yl(),n[qn]=null}};function hc(t){this._internalRoot=t}hc.prototype.unstable_scheduleHydration=function(t){if(t){var n=js();t={blockedOn:null,target:t,priority:n};for(var a=0;a<ja.length&&n!==0&&n<ja[a].priority;a++);ja.splice(a,0,t),a===0&&kg(t)}};var Yg=e.version;if(Yg!=="19.2.0")throw Error(r(527,Yg,"19.2.0"));F.findDOMNode=function(t){var n=t._reactInternals;if(n===void 0)throw typeof t.render=="function"?Error(r(188)):(t=Object.keys(t).join(","),Error(r(268,t)));return t=h(n),t=t!==null?_(t):null,t=t===null?null:t.stateNode,t};var rM={bundleType:0,version:"19.2.0",rendererPackageName:"react-dom",currentDispatcherRef:z,reconcilerVersion:"19.2.0"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var pc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!pc.isDisabled&&pc.supportsFiber)try{fe=pc.inject(rM),he=pc}catch{}}return Vo.createRoot=function(t,n){if(!l(t))throw Error(r(299));var a=!1,o="",u=e0,f=t0,v=n0;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(u=n.onUncaughtError),n.onCaughtError!==void 0&&(f=n.onCaughtError),n.onRecoverableError!==void 0&&(v=n.onRecoverableError)),n=Pg(t,1,!1,null,null,a,o,null,u,f,v,qg),t[qn]=n.current,Qf(t),new md(n)},Vo.hydrateRoot=function(t,n,a){if(!l(t))throw Error(r(299));var o=!1,u="",f=e0,v=t0,C=n0,H=null;return a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(u=a.identifierPrefix),a.onUncaughtError!==void 0&&(f=a.onUncaughtError),a.onCaughtError!==void 0&&(v=a.onCaughtError),a.onRecoverableError!==void 0&&(C=a.onRecoverableError),a.formState!==void 0&&(H=a.formState)),n=Pg(t,1,!0,n,a??null,o,u,H,f,v,C,qg),n.context=Ig(null),a=n.current,o=ui(),o=Qs(o),u=Ba(o),u.callback=null,za(a,u,o),a=o,n.current.lanes=a,Ve(n,a),Gi(n),t[qn]=n.current,Qf(t),new hc(n)},Vo.version="19.2.0",Vo}var i_;function _M(){if(i_)return vd.exports;i_=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(e){console.error(e)}}return s(),vd.exports=gM(),vd.exports}var vM=_M();const a_=[-1,0,1],mv=100,gv=30,xM=54,SM=2.4,yd=118;function MM(s){let e=s>>>0;return()=>(e=e*1664525+1013904223>>>0,e/4294967296)}function yM(s){const e=MM(s.seed+s.nextId),i=[...a_];for(let h=i.length-1;h>0;h--){const _=Math.floor(e()*(h+1));[i[h],i[_]]=[i[_],i[h]]}const r=s.gate>=3&&e()>.48?2:1,l=i.slice(0,r),c=a_.filter(h=>!l.includes(h)),d=c[Math.floor(e()*c.length)];let p=s.nextId;const m=[];for(const h of l){const _=p++;m.push({id:_,kind:"blocker",lane:h,z:yd,resolved:!1}),m.push({id:p++,kind:"warning",lane:h,z:yd-12,resolved:!1})}return m.push({id:p++,kind:"pickup",lane:d,z:yd-5,resolved:!1}),{objects:m,nextId:p}}function _v(s=1){return{phase:"start",seed:s,lane:0,lastLaneChange:-100,score:0,distance:0,gate:1,energy:mv,multiplier:1,boost:100,boosting:!1,combo:0,bestCombo:0,pickups:0,nearMisses:0,hits:0,speed:gv,spawnClock:0,nextId:1,objects:[]}}function r_(s){return{..._v(s.seed),phase:"playing"}}function EM(s,e){if(s.phase!=="playing")return s;const i=Math.max(-1,Math.min(1,s.lane+e));return i===s.lane?s:{...s,lane:i,lastLaneChange:s.distance}}function bM(s){return s.phase==="playing"?{...s,phase:"paused"}:s.phase==="paused"?{...s,phase:"playing"}:s}function TM(s,e){return s.phase!=="playing"?s:{...s,boosting:!!e&&s.boost>0}}function AM(s,e){if(s.phase!=="playing")return{state:s,events:[]};const i=Math.min(50,Math.max(0,e))/1e3,r=s.boosting&&s.boost>0,l=Math.min(xM,gv+s.distance/120)*(r?1.45:1),c=s.distance+l*i*.32,d=Math.floor(c/250)+1,p=d>s.gate?["gate"]:[];let m=Math.max(0,s.energy-i*(1.7+l*.018)),h=s.multiplier,{combo:_,bestCombo:x,pickups:g,nearMisses:M,hits:b}=s,D=s.objects.map(A=>({...A,z:A.z-l*i}));D=D.map(A=>A.resolved||A.kind==="warning"||A.z>SM?A:A.z<-8?{...A,resolved:!0}:A.lane!==s.lane?(A.kind==="blocker"&&Math.abs(A.lane-s.lane)===1&&s.distance-s.lastLaneChange<3&&(M+=1,_+=1,h=Math.min(4,Number((h+.1).toFixed(1))),p.push("near-miss")),{...A,resolved:!0}):(A.kind==="pickup"?(m=Math.min(mv,m+14),h=Math.min(4,Number((h+.2).toFixed(1))),g+=1,_+=1,p.push("collect")):A.kind==="blocker"&&(m=Math.max(0,m-26),h=1,_=0,b+=1,p.push("hit")),{...A,resolved:!0})),D=D.filter(A=>A.z>=-8);const y=Math.max(.72,1.25-l*.009);let S=s.spawnClock+i,w=s.nextId;if(S>=y){S-=y;const A=yM({...s,gate:d,nextId:w});D.push(...A.objects),w=A.nextId}let U=s.phase;return m<=0&&(U="gameover",p.includes("gameover")||p.push("gameover")),{state:{...s,phase:U,speed:l,boosting:r&&s.boost-i*32>0,boost:Math.max(0,Math.min(100,s.boost+i*(r?-32:13))),combo:_,bestCombo:Math.max(x,_),pickups:g,nearMisses:M,hits:b,distance:c,gate:d,energy:m,multiplier:h,score:s.score+l*i*2.2*h,spawnClock:S,nextId:w,objects:D},events:p}}function RM(){let s;return{unlock(){s??(s=new(window.AudioContext||window.webkitAudioContext)),s.resume().catch(()=>{})},play(e){if(!s||s.state!=="running")return;(e==="hit"?[90,45]:e==="gate"?[330,440,660]:e==="near-miss"?[520,780]:[660,990]).forEach((r,l)=>{const c=s.createOscillator(),d=s.createGain(),p=s.currentTime+l*.065;c.type=e==="hit"?"sawtooth":"sine",c.frequency.setValueAtTime(r,p),d.gain.setValueAtTime(0,p),d.gain.linearRampToValueAtTime(.055,p+.008),d.gain.exponentialRampToValueAtTime(.001,p+.16),c.connect(d).connect(s.destination),c.start(p),c.stop(p+.18)})},dispose(){s==null||s.close().catch(()=>{})}}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Qh="185",CM=0,s_=1,wM=2,Xc=1,DM=2,Qo=3,lr=0,$n=1,pi=2,Ea=0,Is=1,zr=2,o_=3,l_=4,UM=5,Or=100,NM=101,LM=102,OM=103,PM=104,IM=200,BM=201,zM=202,FM=203,ih=204,ah=205,HM=206,GM=207,VM=208,kM=209,XM=210,WM=211,qM=212,YM=213,ZM=214,rh=0,sh=1,oh=2,Gs=3,lh=4,ch=5,uh=6,fh=7,vv=0,KM=1,QM=2,Yi=0,xv=1,Sv=2,Mv=3,yv=4,Ev=5,bv=6,Tv=7,Av=300,Fr=301,Vs=302,Ed=303,bd=304,su=306,dh=1e3,ya=1001,hh=1002,Ln=1003,JM=1004,mc=1005,Hn=1006,Td=1007,Ir=1008,Ti=1009,Rv=1010,Cv=1011,$o=1012,Jh=1013,Qi=1014,Wi=1015,Ta=1016,jh=1017,$h=1018,el=1020,wv=35902,Dv=35899,Uv=1021,Nv=1022,Pi=1023,Aa=1026,Br=1027,Lv=1028,ep=1029,Hr=1030,tp=1031,np=1033,Wc=33776,qc=33777,Yc=33778,Zc=33779,ph=35840,mh=35841,gh=35842,_h=35843,vh=36196,xh=37492,Sh=37496,Mh=37488,yh=37489,Qc=37490,Eh=37491,bh=37808,Th=37809,Ah=37810,Rh=37811,Ch=37812,wh=37813,Dh=37814,Uh=37815,Nh=37816,Lh=37817,Oh=37818,Ph=37819,Ih=37820,Bh=37821,zh=36492,Fh=36494,Hh=36495,Gh=36283,Vh=36284,Jc=36285,kh=36286,jM=3200,c_=0,$M=1,sr="",hi="srgb",jc="srgb-linear",$c="linear",zt="srgb",Ms=7680,u_=519,ey=512,ty=513,ny=514,ip=515,iy=516,ay=517,ap=518,ry=519,f_=35044,d_="300 es",qi=2e3,eu=2001;function sy(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function tu(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function oy(){const s=tu("canvas");return s.style.display="block",s}const h_={};function p_(...s){const e="THREE."+s.shift();console.log(e,...s)}function Ov(s){const e=s[0];if(typeof e=="string"&&e.startsWith("TSL:")){const i=s[1];i&&i.isStackTrace?s[0]+=" "+i.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function nt(...s){s=Ov(s);const e="THREE."+s.shift();{const i=s[0];i&&i.isStackTrace?console.warn(i.getError(e)):console.warn(e,...s)}}function Tt(...s){s=Ov(s);const e="THREE."+s.shift();{const i=s[0];i&&i.isStackTrace?console.error(i.getError(e)):console.error(e,...s)}}function Bs(...s){const e=s.join(" ");e in h_||(h_[e]=!0,nt(...s))}function ly(s,e,i){return new Promise(function(r,l){function c(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:l();break;case s.TIMEOUT_EXPIRED:setTimeout(c,i);break;default:r()}}setTimeout(c,i)})}const cy={[rh]:sh,[oh]:uh,[lh]:fh,[Gs]:ch,[sh]:rh,[uh]:oh,[fh]:lh,[ch]:Gs};class Vr{addEventListener(e,i){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(i)===-1&&r[e].push(i)}hasEventListener(e,i){const r=this._listeners;return r===void 0?!1:r[e]!==void 0&&r[e].indexOf(i)!==-1}removeEventListener(e,i){const r=this._listeners;if(r===void 0)return;const l=r[e];if(l!==void 0){const c=l.indexOf(i);c!==-1&&l.splice(c,1)}}dispatchEvent(e){const i=this._listeners;if(i===void 0)return;const r=i[e.type];if(r!==void 0){e.target=this;const l=r.slice(0);for(let c=0,d=l.length;c<d;c++)l[c].call(this,e);e.target=null}}}const Bn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let m_=1234567;const zs=Math.PI/180,tl=180/Math.PI;function Ws(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Bn[s&255]+Bn[s>>8&255]+Bn[s>>16&255]+Bn[s>>24&255]+"-"+Bn[e&255]+Bn[e>>8&255]+"-"+Bn[e>>16&15|64]+Bn[e>>24&255]+"-"+Bn[i&63|128]+Bn[i>>8&255]+"-"+Bn[i>>16&255]+Bn[i>>24&255]+Bn[r&255]+Bn[r>>8&255]+Bn[r>>16&255]+Bn[r>>24&255]).toLowerCase()}function vt(s,e,i){return Math.max(e,Math.min(i,s))}function rp(s,e){return(s%e+e)%e}function uy(s,e,i,r,l){return r+(s-e)*(l-r)/(i-e)}function fy(s,e,i){return s!==e?(i-s)/(e-s):0}function jo(s,e,i){return(1-i)*s+i*e}function dy(s,e,i,r){return jo(s,e,1-Math.exp(-i*r))}function hy(s,e=1){return e-Math.abs(rp(s,e*2)-e)}function py(s,e,i){return s<=e?0:s>=i?1:(s=(s-e)/(i-e),s*s*(3-2*s))}function my(s,e,i){return s<=e?0:s>=i?1:(s=(s-e)/(i-e),s*s*s*(s*(s*6-15)+10))}function gy(s,e){return s+Math.floor(Math.random()*(e-s+1))}function _y(s,e){return s+Math.random()*(e-s)}function vy(s){return s*(.5-Math.random())}function xy(s){s!==void 0&&(m_=s);let e=m_+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Sy(s){return s*zs}function My(s){return s*tl}function yy(s){return(s&s-1)===0&&s!==0}function Ey(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function by(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Ty(s,e,i,r,l){const c=Math.cos,d=Math.sin,p=c(i/2),m=d(i/2),h=c((e+r)/2),_=d((e+r)/2),x=c((e-r)/2),g=d((e-r)/2),M=c((r-e)/2),b=d((r-e)/2);switch(l){case"XYX":s.set(p*_,m*x,m*g,p*h);break;case"YZY":s.set(m*g,p*_,m*x,p*h);break;case"ZXZ":s.set(m*x,m*g,p*_,p*h);break;case"XZX":s.set(p*_,m*b,m*M,p*h);break;case"YXY":s.set(m*M,p*_,m*b,p*h);break;case"ZYZ":s.set(m*b,m*M,p*_,p*h);break;default:nt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+l)}}function Ps(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Vn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const g_={DEG2RAD:zs,RAD2DEG:tl,generateUUID:Ws,clamp:vt,euclideanModulo:rp,mapLinear:uy,inverseLerp:fy,lerp:jo,damp:dy,pingpong:hy,smoothstep:py,smootherstep:my,randInt:gy,randFloat:_y,randFloatSpread:vy,seededRandom:xy,degToRad:Sy,radToDeg:My,isPowerOfTwo:yy,ceilPowerOfTwo:Ey,floorPowerOfTwo:by,setQuaternionFromProperEuler:Ty,normalize:Vn,denormalize:Ps},fp=class fp{constructor(e=0,i=0){this.x=e,this.y=i}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,i){return this.x=e,this.y=i,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const i=this.x,r=this.y,l=e.elements;return this.x=l[0]*i+l[3]*r+l[6],this.y=l[1]*i+l[4]*r+l[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,i){return this.x=vt(this.x,e.x,i.x),this.y=vt(this.y,e.y,i.y),this}clampScalar(e,i){return this.x=vt(this.x,e,i),this.y=vt(this.y,e,i),this}clampLength(e,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(vt(r,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const r=this.dot(e)/i;return Math.acos(vt(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,r=this.y-e.y;return i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this}lerpVectors(e,i,r){return this.x=e.x+(i.x-e.x)*r,this.y=e.y+(i.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this}rotateAround(e,i){const r=Math.cos(i),l=Math.sin(i),c=this.x-e.x,d=this.y-e.y;return this.x=c*r-d*l+e.x,this.y=c*l+d*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};fp.prototype.isVector2=!0;let bt=fp;class qs{constructor(e=0,i=0,r=0,l=1){this.isQuaternion=!0,this._x=e,this._y=i,this._z=r,this._w=l}static slerpFlat(e,i,r,l,c,d,p){let m=r[l+0],h=r[l+1],_=r[l+2],x=r[l+3],g=c[d+0],M=c[d+1],b=c[d+2],D=c[d+3];if(x!==D||m!==g||h!==M||_!==b){let y=m*g+h*M+_*b+x*D;y<0&&(g=-g,M=-M,b=-b,D=-D,y=-y);let S=1-p;if(y<.9995){const w=Math.acos(y),U=Math.sin(w);S=Math.sin(S*w)/U,p=Math.sin(p*w)/U,m=m*S+g*p,h=h*S+M*p,_=_*S+b*p,x=x*S+D*p}else{m=m*S+g*p,h=h*S+M*p,_=_*S+b*p,x=x*S+D*p;const w=1/Math.sqrt(m*m+h*h+_*_+x*x);m*=w,h*=w,_*=w,x*=w}}e[i]=m,e[i+1]=h,e[i+2]=_,e[i+3]=x}static multiplyQuaternionsFlat(e,i,r,l,c,d){const p=r[l],m=r[l+1],h=r[l+2],_=r[l+3],x=c[d],g=c[d+1],M=c[d+2],b=c[d+3];return e[i]=p*b+_*x+m*M-h*g,e[i+1]=m*b+_*g+h*x-p*M,e[i+2]=h*b+_*M+p*g-m*x,e[i+3]=_*b-p*x-m*g-h*M,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,i,r,l){return this._x=e,this._y=i,this._z=r,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,i=!0){const r=e._x,l=e._y,c=e._z,d=e._order,p=Math.cos,m=Math.sin,h=p(r/2),_=p(l/2),x=p(c/2),g=m(r/2),M=m(l/2),b=m(c/2);switch(d){case"XYZ":this._x=g*_*x+h*M*b,this._y=h*M*x-g*_*b,this._z=h*_*b+g*M*x,this._w=h*_*x-g*M*b;break;case"YXZ":this._x=g*_*x+h*M*b,this._y=h*M*x-g*_*b,this._z=h*_*b-g*M*x,this._w=h*_*x+g*M*b;break;case"ZXY":this._x=g*_*x-h*M*b,this._y=h*M*x+g*_*b,this._z=h*_*b+g*M*x,this._w=h*_*x-g*M*b;break;case"ZYX":this._x=g*_*x-h*M*b,this._y=h*M*x+g*_*b,this._z=h*_*b-g*M*x,this._w=h*_*x+g*M*b;break;case"YZX":this._x=g*_*x+h*M*b,this._y=h*M*x+g*_*b,this._z=h*_*b-g*M*x,this._w=h*_*x-g*M*b;break;case"XZY":this._x=g*_*x-h*M*b,this._y=h*M*x-g*_*b,this._z=h*_*b+g*M*x,this._w=h*_*x+g*M*b;break;default:nt("Quaternion: .setFromEuler() encountered an unknown order: "+d)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,i){const r=i/2,l=Math.sin(r);return this._x=e.x*l,this._y=e.y*l,this._z=e.z*l,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const i=e.elements,r=i[0],l=i[4],c=i[8],d=i[1],p=i[5],m=i[9],h=i[2],_=i[6],x=i[10],g=r+p+x;if(g>0){const M=.5/Math.sqrt(g+1);this._w=.25/M,this._x=(_-m)*M,this._y=(c-h)*M,this._z=(d-l)*M}else if(r>p&&r>x){const M=2*Math.sqrt(1+r-p-x);this._w=(_-m)/M,this._x=.25*M,this._y=(l+d)/M,this._z=(c+h)/M}else if(p>x){const M=2*Math.sqrt(1+p-r-x);this._w=(c-h)/M,this._x=(l+d)/M,this._y=.25*M,this._z=(m+_)/M}else{const M=2*Math.sqrt(1+x-r-p);this._w=(d-l)/M,this._x=(c+h)/M,this._y=(m+_)/M,this._z=.25*M}return this._onChangeCallback(),this}setFromUnitVectors(e,i){let r=e.dot(i)+1;return r<1e-8?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*i.z-e.z*i.y,this._y=e.z*i.x-e.x*i.z,this._z=e.x*i.y-e.y*i.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(vt(this.dot(e),-1,1)))}rotateTowards(e,i){const r=this.angleTo(e);if(r===0)return this;const l=Math.min(1,i/r);return this.slerp(e,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,i){const r=e._x,l=e._y,c=e._z,d=e._w,p=i._x,m=i._y,h=i._z,_=i._w;return this._x=r*_+d*p+l*h-c*m,this._y=l*_+d*m+c*p-r*h,this._z=c*_+d*h+r*m-l*p,this._w=d*_-r*p-l*m-c*h,this._onChangeCallback(),this}slerp(e,i){let r=e._x,l=e._y,c=e._z,d=e._w,p=this.dot(e);p<0&&(r=-r,l=-l,c=-c,d=-d,p=-p);let m=1-i;if(p<.9995){const h=Math.acos(p),_=Math.sin(h);m=Math.sin(m*h)/_,i=Math.sin(i*h)/_,this._x=this._x*m+r*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+d*i,this._onChangeCallback()}else this._x=this._x*m+r*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+d*i,this.normalize();return this}slerpQuaternions(e,i,r){return this.copy(e).slerp(i,r)}random(){const e=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),r=Math.random(),l=Math.sqrt(1-r),c=Math.sqrt(r);return this.set(l*Math.sin(e),l*Math.cos(e),c*Math.sin(i),c*Math.cos(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,i=0){return this._x=e[i],this._y=e[i+1],this._z=e[i+2],this._w=e[i+3],this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._w,e}fromBufferAttribute(e,i){return this._x=e.getX(i),this._y=e.getY(i),this._z=e.getZ(i),this._w=e.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const dp=class dp{constructor(e=0,i=0,r=0){this.x=e,this.y=i,this.z=r}set(e,i,r){return r===void 0&&(r=this.z),this.x=e,this.y=i,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,i){return this.x=e.x*i.x,this.y=e.y*i.y,this.z=e.z*i.z,this}applyEuler(e){return this.applyQuaternion(__.setFromEuler(e))}applyAxisAngle(e,i){return this.applyQuaternion(__.setFromAxisAngle(e,i))}applyMatrix3(e){const i=this.x,r=this.y,l=this.z,c=e.elements;return this.x=c[0]*i+c[3]*r+c[6]*l,this.y=c[1]*i+c[4]*r+c[7]*l,this.z=c[2]*i+c[5]*r+c[8]*l,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const i=this.x,r=this.y,l=this.z,c=e.elements,d=1/(c[3]*i+c[7]*r+c[11]*l+c[15]);return this.x=(c[0]*i+c[4]*r+c[8]*l+c[12])*d,this.y=(c[1]*i+c[5]*r+c[9]*l+c[13])*d,this.z=(c[2]*i+c[6]*r+c[10]*l+c[14])*d,this}applyQuaternion(e){const i=this.x,r=this.y,l=this.z,c=e.x,d=e.y,p=e.z,m=e.w,h=2*(d*l-p*r),_=2*(p*i-c*l),x=2*(c*r-d*i);return this.x=i+m*h+d*x-p*_,this.y=r+m*_+p*h-c*x,this.z=l+m*x+c*_-d*h,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const i=this.x,r=this.y,l=this.z,c=e.elements;return this.x=c[0]*i+c[4]*r+c[8]*l,this.y=c[1]*i+c[5]*r+c[9]*l,this.z=c[2]*i+c[6]*r+c[10]*l,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,i){return this.x=vt(this.x,e.x,i.x),this.y=vt(this.y,e.y,i.y),this.z=vt(this.z,e.z,i.z),this}clampScalar(e,i){return this.x=vt(this.x,e,i),this.y=vt(this.y,e,i),this.z=vt(this.z,e,i),this}clampLength(e,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(vt(r,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this}lerpVectors(e,i,r){return this.x=e.x+(i.x-e.x)*r,this.y=e.y+(i.y-e.y)*r,this.z=e.z+(i.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,i){const r=e.x,l=e.y,c=e.z,d=i.x,p=i.y,m=i.z;return this.x=l*m-c*p,this.y=c*d-r*m,this.z=r*p-l*d,this}projectOnVector(e){const i=e.lengthSq();if(i===0)return this.set(0,0,0);const r=e.dot(this)/i;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return Ad.copy(this).projectOnVector(e),this.sub(Ad)}reflect(e){return this.sub(Ad.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const r=this.dot(e)/i;return Math.acos(vt(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,r=this.y-e.y,l=this.z-e.z;return i*i+r*r+l*l}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,i,r){const l=Math.sin(i)*e;return this.x=l*Math.sin(r),this.y=Math.cos(i)*e,this.z=l*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,i,r){return this.x=e*Math.sin(i),this.y=r,this.z=e*Math.cos(i),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(e){const i=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),l=this.setFromMatrixColumn(e,2).length();return this.x=i,this.y=r,this.z=l,this}setFromMatrixColumn(e,i){return this.fromArray(e.elements,i*4)}setFromMatrix3Column(e,i){return this.fromArray(e.elements,i*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,i=Math.random()*2-1,r=Math.sqrt(1-i*i);return this.x=r*Math.cos(e),this.y=i,this.z=r*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};dp.prototype.isVector3=!0;let Q=dp;const Ad=new Q,__=new qs,hp=class hp{constructor(e,i,r,l,c,d,p,m,h){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,i,r,l,c,d,p,m,h)}set(e,i,r,l,c,d,p,m,h){const _=this.elements;return _[0]=e,_[1]=l,_[2]=p,_[3]=i,_[4]=c,_[5]=m,_[6]=r,_[7]=d,_[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const i=this.elements,r=e.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],this}extractBasis(e,i,r){return e.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const i=e.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const r=e.elements,l=i.elements,c=this.elements,d=r[0],p=r[3],m=r[6],h=r[1],_=r[4],x=r[7],g=r[2],M=r[5],b=r[8],D=l[0],y=l[3],S=l[6],w=l[1],U=l[4],A=l[7],P=l[2],L=l[5],B=l[8];return c[0]=d*D+p*w+m*P,c[3]=d*y+p*U+m*L,c[6]=d*S+p*A+m*B,c[1]=h*D+_*w+x*P,c[4]=h*y+_*U+x*L,c[7]=h*S+_*A+x*B,c[2]=g*D+M*w+b*P,c[5]=g*y+M*U+b*L,c[8]=g*S+M*A+b*B,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[3]*=e,i[6]*=e,i[1]*=e,i[4]*=e,i[7]*=e,i[2]*=e,i[5]*=e,i[8]*=e,this}determinant(){const e=this.elements,i=e[0],r=e[1],l=e[2],c=e[3],d=e[4],p=e[5],m=e[6],h=e[7],_=e[8];return i*d*_-i*p*h-r*c*_+r*p*m+l*c*h-l*d*m}invert(){const e=this.elements,i=e[0],r=e[1],l=e[2],c=e[3],d=e[4],p=e[5],m=e[6],h=e[7],_=e[8],x=_*d-p*h,g=p*m-_*c,M=h*c-d*m,b=i*x+r*g+l*M;if(b===0)return this.set(0,0,0,0,0,0,0,0,0);const D=1/b;return e[0]=x*D,e[1]=(l*h-_*r)*D,e[2]=(p*r-l*d)*D,e[3]=g*D,e[4]=(_*i-l*m)*D,e[5]=(l*c-p*i)*D,e[6]=M*D,e[7]=(r*m-h*i)*D,e[8]=(d*i-r*c)*D,this}transpose(){let e;const i=this.elements;return e=i[1],i[1]=i[3],i[3]=e,e=i[2],i[2]=i[6],i[6]=e,e=i[5],i[5]=i[7],i[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const i=this.elements;return e[0]=i[0],e[1]=i[3],e[2]=i[6],e[3]=i[1],e[4]=i[4],e[5]=i[7],e[6]=i[2],e[7]=i[5],e[8]=i[8],this}setUvTransform(e,i,r,l,c,d,p){const m=Math.cos(c),h=Math.sin(c);return this.set(r*m,r*h,-r*(m*d+h*p)+d+e,-l*h,l*m,-l*(-h*d+m*p)+p+i,0,0,1),this}scale(e,i){return Bs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Rd.makeScale(e,i)),this}rotate(e){return Bs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Rd.makeRotation(-e)),this}translate(e,i){return Bs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Rd.makeTranslation(e,i)),this}makeTranslation(e,i){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,i,0,0,1),this}makeRotation(e){const i=Math.cos(e),r=Math.sin(e);return this.set(i,-r,0,r,i,0,0,0,1),this}makeScale(e,i){return this.set(e,0,0,0,i,0,0,0,1),this}equals(e){const i=this.elements,r=e.elements;for(let l=0;l<9;l++)if(i[l]!==r[l])return!1;return!0}fromArray(e,i=0){for(let r=0;r<9;r++)this.elements[r]=e[r+i];return this}toArray(e=[],i=0){const r=this.elements;return e[i]=r[0],e[i+1]=r[1],e[i+2]=r[2],e[i+3]=r[3],e[i+4]=r[4],e[i+5]=r[5],e[i+6]=r[6],e[i+7]=r[7],e[i+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}};hp.prototype.isMatrix3=!0;let st=hp;const Rd=new st,v_=new st().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),x_=new st().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ay(){const s={enabled:!0,workingColorSpace:jc,spaces:{},convert:function(l,c,d){return this.enabled===!1||c===d||!c||!d||(this.spaces[c].transfer===zt&&(l.r=ba(l.r),l.g=ba(l.g),l.b=ba(l.b)),this.spaces[c].primaries!==this.spaces[d].primaries&&(l.applyMatrix3(this.spaces[c].toXYZ),l.applyMatrix3(this.spaces[d].fromXYZ)),this.spaces[d].transfer===zt&&(l.r=Fs(l.r),l.g=Fs(l.g),l.b=Fs(l.b))),l},workingToColorSpace:function(l,c){return this.convert(l,this.workingColorSpace,c)},colorSpaceToWorking:function(l,c){return this.convert(l,c,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===sr?$c:this.spaces[l].transfer},getToneMappingMode:function(l){return this.spaces[l].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(l,c=this.workingColorSpace){return l.fromArray(this.spaces[c].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,c,d){return l.copy(this.spaces[c].toXYZ).multiply(this.spaces[d].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,c){return Bs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(l,c)},toWorkingColorSpace:function(l,c){return Bs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(l,c)}},e=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],r=[.3127,.329];return s.define({[jc]:{primaries:e,whitePoint:r,transfer:$c,toXYZ:v_,fromXYZ:x_,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:hi},outputColorSpaceConfig:{drawingBufferColorSpace:hi}},[hi]:{primaries:e,whitePoint:r,transfer:zt,toXYZ:v_,fromXYZ:x_,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:hi}}}),s}const yt=Ay();function ba(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Fs(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let ys;class Ry{static getDataURL(e,i="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let r;if(e instanceof HTMLCanvasElement)r=e;else{ys===void 0&&(ys=tu("canvas")),ys.width=e.width,ys.height=e.height;const l=ys.getContext("2d");e instanceof ImageData?l.putImageData(e,0,0):l.drawImage(e,0,0,e.width,e.height),r=ys}return r.toDataURL(i)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const i=tu("canvas");i.width=e.width,i.height=e.height;const r=i.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const l=r.getImageData(0,0,e.width,e.height),c=l.data;for(let d=0;d<c.length;d++)c[d]=ba(c[d]/255)*255;return r.putImageData(l,0,0),i}else if(e.data){const i=e.data.slice(0);for(let r=0;r<i.length;r++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[r]=Math.floor(ba(i[r]/255)*255):i[r]=ba(i[r]);return{data:i,width:e.width,height:e.height}}else return nt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Cy=0;class sp{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Cy++}),this.uuid=Ws(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const i=this.data;return typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement?e.set(i.videoWidth,i.videoHeight,0):typeof VideoFrame<"u"&&i instanceof VideoFrame?e.set(i.displayWidth,i.displayHeight,0):i!==null?e.set(i.width,i.height,i.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let d=0,p=l.length;d<p;d++)l[d].isDataTexture?c.push(Cd(l[d].image)):c.push(Cd(l[d]))}else c=Cd(l);r.url=c}return i||(e.images[this.uuid]=r),r}}function Cd(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Ry.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(nt("Texture: Unable to serialize Texture."),{})}let wy=0;const wd=new Q;class Xn extends Vr{constructor(e=Xn.DEFAULT_IMAGE,i=Xn.DEFAULT_MAPPING,r=ya,l=ya,c=Hn,d=Ir,p=Pi,m=Ti,h=Xn.DEFAULT_ANISOTROPY,_=sr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:wy++}),this.uuid=Ws(),this.name="",this.source=new sp(e),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=r,this.wrapT=l,this.magFilter=c,this.minFilter=d,this.anisotropy=h,this.format=p,this.internalFormat=null,this.type=m,this.offset=new bt(0,0),this.repeat=new bt(1,1),this.center=new bt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new st,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=_,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(wd).x}get height(){return this.source.getSize(wd).y}get depth(){return this.source.getSize(wd).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const i in e){const r=e[i];if(r===void 0){nt(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){nt(`Texture.setValues(): property '${i}' does not exist.`);continue}l&&r&&l.isVector2&&r.isVector2||l&&r&&l.isVector3&&r.isVector3||l&&r&&l.isMatrix3&&r.isMatrix3?l.copy(r):this[i]=r}}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),i||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Av)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case dh:e.x=e.x-Math.floor(e.x);break;case ya:e.x=e.x<0?0:1;break;case hh:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case dh:e.y=e.y-Math.floor(e.y);break;case ya:e.y=e.y<0?0:1;break;case hh:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Xn.DEFAULT_IMAGE=null;Xn.DEFAULT_MAPPING=Av;Xn.DEFAULT_ANISOTROPY=1;const pp=class pp{constructor(e=0,i=0,r=0,l=1){this.x=e,this.y=i,this.z=r,this.w=l}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,i,r,l){return this.x=e,this.y=i,this.z=r,this.w=l,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this.w=e.w+i.w,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this.w+=e.w*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this.w=e.w-i.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const i=this.x,r=this.y,l=this.z,c=this.w,d=e.elements;return this.x=d[0]*i+d[4]*r+d[8]*l+d[12]*c,this.y=d[1]*i+d[5]*r+d[9]*l+d[13]*c,this.z=d[2]*i+d[6]*r+d[10]*l+d[14]*c,this.w=d[3]*i+d[7]*r+d[11]*l+d[15]*c,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const i=Math.sqrt(1-e.w*e.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/i,this.y=e.y/i,this.z=e.z/i),this}setAxisAngleFromRotationMatrix(e){let i,r,l,c;const m=e.elements,h=m[0],_=m[4],x=m[8],g=m[1],M=m[5],b=m[9],D=m[2],y=m[6],S=m[10];if(Math.abs(_-g)<.01&&Math.abs(x-D)<.01&&Math.abs(b-y)<.01){if(Math.abs(_+g)<.1&&Math.abs(x+D)<.1&&Math.abs(b+y)<.1&&Math.abs(h+M+S-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const U=(h+1)/2,A=(M+1)/2,P=(S+1)/2,L=(_+g)/4,B=(x+D)/4,T=(b+y)/4;return U>A&&U>P?U<.01?(r=0,l=.707106781,c=.707106781):(r=Math.sqrt(U),l=L/r,c=B/r):A>P?A<.01?(r=.707106781,l=0,c=.707106781):(l=Math.sqrt(A),r=L/l,c=T/l):P<.01?(r=.707106781,l=.707106781,c=0):(c=Math.sqrt(P),r=B/c,l=T/c),this.set(r,l,c,i),this}let w=Math.sqrt((y-b)*(y-b)+(x-D)*(x-D)+(g-_)*(g-_));return Math.abs(w)<.001&&(w=1),this.x=(y-b)/w,this.y=(x-D)/w,this.z=(g-_)/w,this.w=Math.acos((h+M+S-1)/2),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,i){return this.x=vt(this.x,e.x,i.x),this.y=vt(this.y,e.y,i.y),this.z=vt(this.z,e.z,i.z),this.w=vt(this.w,e.w,i.w),this}clampScalar(e,i){return this.x=vt(this.x,e,i),this.y=vt(this.y,e,i),this.z=vt(this.z,e,i),this.w=vt(this.w,e,i),this}clampLength(e,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(vt(r,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this.w+=(e.w-this.w)*i,this}lerpVectors(e,i,r){return this.x=e.x+(i.x-e.x)*r,this.y=e.y+(i.y-e.y)*r,this.z=e.z+(i.z-e.z)*r,this.w=e.w+(i.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this.w=e[i+3],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e[i+3]=this.w,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this.w=e.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};pp.prototype.isVector4=!0;let un=pp;class Dy extends Vr{constructor(e=1,i=1,r={}){super(),r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Hn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},r),this.isRenderTarget=!0,this.width=e,this.height=i,this.depth=r.depth,this.scissor=new un(0,0,e,i),this.scissorTest=!1,this.viewport=new un(0,0,e,i),this.textures=[];const l={width:e,height:i,depth:r.depth},c=new Xn(l),d=r.count;for(let p=0;p<d;p++)this.textures[p]=c.clone(),this.textures[p].isRenderTargetTexture=!0,this.textures[p].renderTarget=this;this._setTextureOptions(r),this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=r.depthTexture,this.samples=r.samples,this.multiview=r.multiview,this.useArrayDepthTexture=r.useArrayDepthTexture}_setTextureOptions(e={}){const i={minFilter:Hn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(i.mapping=e.mapping),e.wrapS!==void 0&&(i.wrapS=e.wrapS),e.wrapT!==void 0&&(i.wrapT=e.wrapT),e.wrapR!==void 0&&(i.wrapR=e.wrapR),e.magFilter!==void 0&&(i.magFilter=e.magFilter),e.minFilter!==void 0&&(i.minFilter=e.minFilter),e.format!==void 0&&(i.format=e.format),e.type!==void 0&&(i.type=e.type),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(i.colorSpace=e.colorSpace),e.flipY!==void 0&&(i.flipY=e.flipY),e.generateMipmaps!==void 0&&(i.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(i.internalFormat=e.internalFormat);for(let r=0;r<this.textures.length;r++)this.textures[r].setValues(i)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,i,r=1){if(this.width!==e||this.height!==i||this.depth!==r){this.width=e,this.height=i,this.depth=r;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=e,this.textures[l].image.height=i,this.textures[l].image.depth=r,this.textures[l].isData3DTexture!==!0&&(this.textures[l].isArrayTexture=this.textures[l].image.depth>1);this.dispose()}this.viewport.set(0,0,e,i),this.scissor.set(0,0,e,i)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++){this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const l=Object.assign({},e.textures[i].image);this.textures[i].source=new sp(l)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Zi extends Dy{constructor(e=1,i=1,r={}){super(e,i,r),this.isWebGLRenderTarget=!0}}class Pv extends Xn{constructor(e=null,i=1,r=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:i,height:r,depth:l},this.magFilter=Ln,this.minFilter=Ln,this.wrapR=ya,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Uy extends Xn{constructor(e=null,i=1,r=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:i,height:r,depth:l},this.magFilter=Ln,this.minFilter=Ln,this.wrapR=ya,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ru=class ru{constructor(e,i,r,l,c,d,p,m,h,_,x,g,M,b,D,y){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,i,r,l,c,d,p,m,h,_,x,g,M,b,D,y)}set(e,i,r,l,c,d,p,m,h,_,x,g,M,b,D,y){const S=this.elements;return S[0]=e,S[4]=i,S[8]=r,S[12]=l,S[1]=c,S[5]=d,S[9]=p,S[13]=m,S[2]=h,S[6]=_,S[10]=x,S[14]=g,S[3]=M,S[7]=b,S[11]=D,S[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ru().fromArray(this.elements)}copy(e){const i=this.elements,r=e.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],i[9]=r[9],i[10]=r[10],i[11]=r[11],i[12]=r[12],i[13]=r[13],i[14]=r[14],i[15]=r[15],this}copyPosition(e){const i=this.elements,r=e.elements;return i[12]=r[12],i[13]=r[13],i[14]=r[14],this}setFromMatrix3(e){const i=e.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(e,i,r){return this.determinantAffine()===0?(e.set(1,0,0),i.set(0,1,0),r.set(0,0,1),this):(e.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this)}makeBasis(e,i,r){return this.set(e.x,i.x,r.x,0,e.y,i.y,r.y,0,e.z,i.z,r.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const i=this.elements,r=e.elements,l=1/Es.setFromMatrixColumn(e,0).length(),c=1/Es.setFromMatrixColumn(e,1).length(),d=1/Es.setFromMatrixColumn(e,2).length();return i[0]=r[0]*l,i[1]=r[1]*l,i[2]=r[2]*l,i[3]=0,i[4]=r[4]*c,i[5]=r[5]*c,i[6]=r[6]*c,i[7]=0,i[8]=r[8]*d,i[9]=r[9]*d,i[10]=r[10]*d,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(e){const i=this.elements,r=e.x,l=e.y,c=e.z,d=Math.cos(r),p=Math.sin(r),m=Math.cos(l),h=Math.sin(l),_=Math.cos(c),x=Math.sin(c);if(e.order==="XYZ"){const g=d*_,M=d*x,b=p*_,D=p*x;i[0]=m*_,i[4]=-m*x,i[8]=h,i[1]=M+b*h,i[5]=g-D*h,i[9]=-p*m,i[2]=D-g*h,i[6]=b+M*h,i[10]=d*m}else if(e.order==="YXZ"){const g=m*_,M=m*x,b=h*_,D=h*x;i[0]=g+D*p,i[4]=b*p-M,i[8]=d*h,i[1]=d*x,i[5]=d*_,i[9]=-p,i[2]=M*p-b,i[6]=D+g*p,i[10]=d*m}else if(e.order==="ZXY"){const g=m*_,M=m*x,b=h*_,D=h*x;i[0]=g-D*p,i[4]=-d*x,i[8]=b+M*p,i[1]=M+b*p,i[5]=d*_,i[9]=D-g*p,i[2]=-d*h,i[6]=p,i[10]=d*m}else if(e.order==="ZYX"){const g=d*_,M=d*x,b=p*_,D=p*x;i[0]=m*_,i[4]=b*h-M,i[8]=g*h+D,i[1]=m*x,i[5]=D*h+g,i[9]=M*h-b,i[2]=-h,i[6]=p*m,i[10]=d*m}else if(e.order==="YZX"){const g=d*m,M=d*h,b=p*m,D=p*h;i[0]=m*_,i[4]=D-g*x,i[8]=b*x+M,i[1]=x,i[5]=d*_,i[9]=-p*_,i[2]=-h*_,i[6]=M*x+b,i[10]=g-D*x}else if(e.order==="XZY"){const g=d*m,M=d*h,b=p*m,D=p*h;i[0]=m*_,i[4]=-x,i[8]=h*_,i[1]=g*x+D,i[5]=d*_,i[9]=M*x-b,i[2]=b*x-M,i[6]=p*_,i[10]=D*x+g}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ny,e,Ly)}lookAt(e,i,r){const l=this.elements;return fi.subVectors(e,i),fi.lengthSq()===0&&(fi.z=1),fi.normalize(),er.crossVectors(r,fi),er.lengthSq()===0&&(Math.abs(r.z)===1?fi.x+=1e-4:fi.z+=1e-4,fi.normalize(),er.crossVectors(r,fi)),er.normalize(),gc.crossVectors(fi,er),l[0]=er.x,l[4]=gc.x,l[8]=fi.x,l[1]=er.y,l[5]=gc.y,l[9]=fi.y,l[2]=er.z,l[6]=gc.z,l[10]=fi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const r=e.elements,l=i.elements,c=this.elements,d=r[0],p=r[4],m=r[8],h=r[12],_=r[1],x=r[5],g=r[9],M=r[13],b=r[2],D=r[6],y=r[10],S=r[14],w=r[3],U=r[7],A=r[11],P=r[15],L=l[0],B=l[4],T=l[8],N=l[12],k=l[1],G=l[5],Z=l[9],ce=l[13],le=l[2],Y=l[6],z=l[10],F=l[14],te=l[3],ge=l[7],Ee=l[11],I=l[15];return c[0]=d*L+p*k+m*le+h*te,c[4]=d*B+p*G+m*Y+h*ge,c[8]=d*T+p*Z+m*z+h*Ee,c[12]=d*N+p*ce+m*F+h*I,c[1]=_*L+x*k+g*le+M*te,c[5]=_*B+x*G+g*Y+M*ge,c[9]=_*T+x*Z+g*z+M*Ee,c[13]=_*N+x*ce+g*F+M*I,c[2]=b*L+D*k+y*le+S*te,c[6]=b*B+D*G+y*Y+S*ge,c[10]=b*T+D*Z+y*z+S*Ee,c[14]=b*N+D*ce+y*F+S*I,c[3]=w*L+U*k+A*le+P*te,c[7]=w*B+U*G+A*Y+P*ge,c[11]=w*T+U*Z+A*z+P*Ee,c[15]=w*N+U*ce+A*F+P*I,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[4]*=e,i[8]*=e,i[12]*=e,i[1]*=e,i[5]*=e,i[9]*=e,i[13]*=e,i[2]*=e,i[6]*=e,i[10]*=e,i[14]*=e,i[3]*=e,i[7]*=e,i[11]*=e,i[15]*=e,this}determinant(){const e=this.elements,i=e[0],r=e[4],l=e[8],c=e[12],d=e[1],p=e[5],m=e[9],h=e[13],_=e[2],x=e[6],g=e[10],M=e[14],b=e[3],D=e[7],y=e[11],S=e[15],w=m*M-h*g,U=p*M-h*x,A=p*g-m*x,P=d*M-h*_,L=d*g-m*_,B=d*x-p*_;return i*(D*w-y*U+S*A)-r*(b*w-y*P+S*L)+l*(b*U-D*P+S*B)-c*(b*A-D*L+y*B)}determinantAffine(){const e=this.elements,i=e[0],r=e[4],l=e[8],c=e[1],d=e[5],p=e[9],m=e[2],h=e[6],_=e[10];return i*(d*_-p*h)-r*(c*_-p*m)+l*(c*h-d*m)}transpose(){const e=this.elements;let i;return i=e[1],e[1]=e[4],e[4]=i,i=e[2],e[2]=e[8],e[8]=i,i=e[6],e[6]=e[9],e[9]=i,i=e[3],e[3]=e[12],e[12]=i,i=e[7],e[7]=e[13],e[13]=i,i=e[11],e[11]=e[14],e[14]=i,this}setPosition(e,i,r){const l=this.elements;return e.isVector3?(l[12]=e.x,l[13]=e.y,l[14]=e.z):(l[12]=e,l[13]=i,l[14]=r),this}invert(){const e=this.elements,i=e[0],r=e[1],l=e[2],c=e[3],d=e[4],p=e[5],m=e[6],h=e[7],_=e[8],x=e[9],g=e[10],M=e[11],b=e[12],D=e[13],y=e[14],S=e[15],w=i*p-r*d,U=i*m-l*d,A=i*h-c*d,P=r*m-l*p,L=r*h-c*p,B=l*h-c*m,T=_*D-x*b,N=_*y-g*b,k=_*S-M*b,G=x*y-g*D,Z=x*S-M*D,ce=g*S-M*y,le=w*ce-U*Z+A*G+P*k-L*N+B*T;if(le===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const Y=1/le;return e[0]=(p*ce-m*Z+h*G)*Y,e[1]=(l*Z-r*ce-c*G)*Y,e[2]=(D*B-y*L+S*P)*Y,e[3]=(g*L-x*B-M*P)*Y,e[4]=(m*k-d*ce-h*N)*Y,e[5]=(i*ce-l*k+c*N)*Y,e[6]=(y*A-b*B-S*U)*Y,e[7]=(_*B-g*A+M*U)*Y,e[8]=(d*Z-p*k+h*T)*Y,e[9]=(r*k-i*Z-c*T)*Y,e[10]=(b*L-D*A+S*w)*Y,e[11]=(x*A-_*L-M*w)*Y,e[12]=(p*N-d*G-m*T)*Y,e[13]=(i*G-r*N+l*T)*Y,e[14]=(D*U-b*P-y*w)*Y,e[15]=(_*P-x*U+g*w)*Y,this}scale(e){const i=this.elements,r=e.x,l=e.y,c=e.z;return i[0]*=r,i[4]*=l,i[8]*=c,i[1]*=r,i[5]*=l,i[9]*=c,i[2]*=r,i[6]*=l,i[10]*=c,i[3]*=r,i[7]*=l,i[11]*=c,this}getMaxScaleOnAxis(){const e=this.elements,i=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],l=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(i,r,l))}makeTranslation(e,i,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,i,0,0,1,r,0,0,0,1),this}makeRotationX(e){const i=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,i,-r,0,0,r,i,0,0,0,0,1),this}makeRotationY(e){const i=Math.cos(e),r=Math.sin(e);return this.set(i,0,r,0,0,1,0,0,-r,0,i,0,0,0,0,1),this}makeRotationZ(e){const i=Math.cos(e),r=Math.sin(e);return this.set(i,-r,0,0,r,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,i){const r=Math.cos(i),l=Math.sin(i),c=1-r,d=e.x,p=e.y,m=e.z,h=c*d,_=c*p;return this.set(h*d+r,h*p-l*m,h*m+l*p,0,h*p+l*m,_*p+r,_*m-l*d,0,h*m-l*p,_*m+l*d,c*m*m+r,0,0,0,0,1),this}makeScale(e,i,r){return this.set(e,0,0,0,0,i,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,i,r,l,c,d){return this.set(1,r,c,0,e,1,d,0,i,l,1,0,0,0,0,1),this}compose(e,i,r){const l=this.elements,c=i._x,d=i._y,p=i._z,m=i._w,h=c+c,_=d+d,x=p+p,g=c*h,M=c*_,b=c*x,D=d*_,y=d*x,S=p*x,w=m*h,U=m*_,A=m*x,P=r.x,L=r.y,B=r.z;return l[0]=(1-(D+S))*P,l[1]=(M+A)*P,l[2]=(b-U)*P,l[3]=0,l[4]=(M-A)*L,l[5]=(1-(g+S))*L,l[6]=(y+w)*L,l[7]=0,l[8]=(b+U)*B,l[9]=(y-w)*B,l[10]=(1-(g+D))*B,l[11]=0,l[12]=e.x,l[13]=e.y,l[14]=e.z,l[15]=1,this}decompose(e,i,r){const l=this.elements;e.x=l[12],e.y=l[13],e.z=l[14];const c=this.determinantAffine();if(c===0)return r.set(1,1,1),i.identity(),this;let d=Es.set(l[0],l[1],l[2]).length();const p=Es.set(l[4],l[5],l[6]).length(),m=Es.set(l[8],l[9],l[10]).length();c<0&&(d=-d),Ni.copy(this);const h=1/d,_=1/p,x=1/m;return Ni.elements[0]*=h,Ni.elements[1]*=h,Ni.elements[2]*=h,Ni.elements[4]*=_,Ni.elements[5]*=_,Ni.elements[6]*=_,Ni.elements[8]*=x,Ni.elements[9]*=x,Ni.elements[10]*=x,i.setFromRotationMatrix(Ni),r.x=d,r.y=p,r.z=m,this}makePerspective(e,i,r,l,c,d,p=qi,m=!1){const h=this.elements,_=2*c/(i-e),x=2*c/(r-l),g=(i+e)/(i-e),M=(r+l)/(r-l);let b,D;if(m)b=c/(d-c),D=d*c/(d-c);else if(p===qi)b=-(d+c)/(d-c),D=-2*d*c/(d-c);else if(p===eu)b=-d/(d-c),D=-d*c/(d-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+p);return h[0]=_,h[4]=0,h[8]=g,h[12]=0,h[1]=0,h[5]=x,h[9]=M,h[13]=0,h[2]=0,h[6]=0,h[10]=b,h[14]=D,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(e,i,r,l,c,d,p=qi,m=!1){const h=this.elements,_=2/(i-e),x=2/(r-l),g=-(i+e)/(i-e),M=-(r+l)/(r-l);let b,D;if(m)b=1/(d-c),D=d/(d-c);else if(p===qi)b=-2/(d-c),D=-(d+c)/(d-c);else if(p===eu)b=-1/(d-c),D=-c/(d-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+p);return h[0]=_,h[4]=0,h[8]=0,h[12]=g,h[1]=0,h[5]=x,h[9]=0,h[13]=M,h[2]=0,h[6]=0,h[10]=b,h[14]=D,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(e){const i=this.elements,r=e.elements;for(let l=0;l<16;l++)if(i[l]!==r[l])return!1;return!0}fromArray(e,i=0){for(let r=0;r<16;r++)this.elements[r]=e[r+i];return this}toArray(e=[],i=0){const r=this.elements;return e[i]=r[0],e[i+1]=r[1],e[i+2]=r[2],e[i+3]=r[3],e[i+4]=r[4],e[i+5]=r[5],e[i+6]=r[6],e[i+7]=r[7],e[i+8]=r[8],e[i+9]=r[9],e[i+10]=r[10],e[i+11]=r[11],e[i+12]=r[12],e[i+13]=r[13],e[i+14]=r[14],e[i+15]=r[15],e}};ru.prototype.isMatrix4=!0;let fn=ru;const Es=new Q,Ni=new fn,Ny=new Q(0,0,0),Ly=new Q(1,1,1),er=new Q,gc=new Q,fi=new Q,S_=new fn,M_=new qs;class Gr{constructor(e=0,i=0,r=0,l=Gr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=i,this._z=r,this._order=l}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,i,r,l=this._order){return this._x=e,this._y=i,this._z=r,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,i=this._order,r=!0){const l=e.elements,c=l[0],d=l[4],p=l[8],m=l[1],h=l[5],_=l[9],x=l[2],g=l[6],M=l[10];switch(i){case"XYZ":this._y=Math.asin(vt(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-_,M),this._z=Math.atan2(-d,c)):(this._x=Math.atan2(g,h),this._z=0);break;case"YXZ":this._x=Math.asin(-vt(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(p,M),this._z=Math.atan2(m,h)):(this._y=Math.atan2(-x,c),this._z=0);break;case"ZXY":this._x=Math.asin(vt(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-x,M),this._z=Math.atan2(-d,h)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-vt(x,-1,1)),Math.abs(x)<.9999999?(this._x=Math.atan2(g,M),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-d,h));break;case"YZX":this._z=Math.asin(vt(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-_,h),this._y=Math.atan2(-x,c)):(this._x=0,this._y=Math.atan2(p,M));break;case"XZY":this._z=Math.asin(-vt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(g,h),this._y=Math.atan2(p,c)):(this._x=Math.atan2(-_,M),this._y=0);break;default:nt("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,i,r){return S_.makeRotationFromQuaternion(e),this.setFromRotationMatrix(S_,i,r)}setFromVector3(e,i=this._order){return this.set(e.x,e.y,e.z,i)}reorder(e){return M_.setFromEuler(this),this.setFromQuaternion(M_,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Gr.DEFAULT_ORDER="XYZ";class Iv{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Oy=0;const y_=new Q,bs=new qs,_a=new fn,_c=new Q,ko=new Q,Py=new Q,Iy=new qs,E_=new Q(1,0,0),b_=new Q(0,1,0),T_=new Q(0,0,1),A_={type:"added"},By={type:"removed"},Ts={type:"childadded",child:null},Dd={type:"childremoved",child:null};class Wn extends Vr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Oy++}),this.uuid=Ws(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Wn.DEFAULT_UP.clone();const e=new Q,i=new Gr,r=new qs,l=new Q(1,1,1);function c(){r.setFromEuler(i,!1)}function d(){i.setFromQuaternion(r,void 0,!1)}i._onChange(c),r._onChange(d),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new fn},normalMatrix:{value:new st}}),this.matrix=new fn,this.matrixWorld=new fn,this.matrixAutoUpdate=Wn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Wn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Iv,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,i){this.quaternion.setFromAxisAngle(e,i)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,i){return bs.setFromAxisAngle(e,i),this.quaternion.multiply(bs),this}rotateOnWorldAxis(e,i){return bs.setFromAxisAngle(e,i),this.quaternion.premultiply(bs),this}rotateX(e){return this.rotateOnAxis(E_,e)}rotateY(e){return this.rotateOnAxis(b_,e)}rotateZ(e){return this.rotateOnAxis(T_,e)}translateOnAxis(e,i){return y_.copy(e).applyQuaternion(this.quaternion),this.position.add(y_.multiplyScalar(i)),this}translateX(e){return this.translateOnAxis(E_,e)}translateY(e){return this.translateOnAxis(b_,e)}translateZ(e){return this.translateOnAxis(T_,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(_a.copy(this.matrixWorld).invert())}lookAt(e,i,r){e.isVector3?_c.copy(e):_c.set(e,i,r);const l=this.parent;this.updateWorldMatrix(!0,!1),ko.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_a.lookAt(ko,_c,this.up):_a.lookAt(_c,ko,this.up),this.quaternion.setFromRotationMatrix(_a),l&&(_a.extractRotation(l.matrixWorld),bs.setFromRotationMatrix(_a),this.quaternion.premultiply(bs.invert()))}add(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return e===this?(Tt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(A_),Ts.child=e,this.dispatchEvent(Ts),Ts.child=null):Tt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const i=this.children.indexOf(e);return i!==-1&&(e.parent=null,this.children.splice(i,1),e.dispatchEvent(By),Dd.child=e,this.dispatchEvent(Dd),Dd.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),_a.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),_a.multiply(e.parent.matrixWorld)),e.applyMatrix4(_a),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(A_),Ts.child=e,this.dispatchEvent(Ts),Ts.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,i){if(this[e]===i)return this;for(let r=0,l=this.children.length;r<l;r++){const d=this.children[r].getObjectByProperty(e,i);if(d!==void 0)return d}}getObjectsByProperty(e,i,r=[]){this[e]===i&&r.push(this);const l=this.children;for(let c=0,d=l.length;c<d;c++)l[c].getObjectsByProperty(e,i,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ko,e,Py),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ko,Iy,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return e.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(e){e(this);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].traverseVisible(e)}traverseAncestors(e){const i=this.parent;i!==null&&(e(i),i.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const i=e.x,r=e.y,l=e.z,c=this.matrix.elements;c[12]+=i-c[0]*i-c[4]*r-c[8]*l,c[13]+=r-c[1]*i-c[5]*r-c[9]*l,c[14]+=l-c[2]*i-c[6]*r-c[10]*l}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].updateMatrixWorld(e)}updateWorldMatrix(e,i,r=!1){const l=this.parent;if(e===!0&&l!==null&&l.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||r)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,r=!0),i===!0){const c=this.children;for(let d=0,p=c.length;d<p;d++)c[d].updateWorldMatrix(!1,!0,r)}}toJSON(e){const i=e===void 0||typeof e=="string",r={};i&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),this.static!==!1&&(l.static=this.static),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.pivot!==null&&(l.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(l.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(l.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(p=>({...p,boundingBox:p.boundingBox?p.boundingBox.toJSON():void 0,boundingSphere:p.boundingSphere?p.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(p=>({...p})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(e),l.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function c(p,m){return p[m.uuid]===void 0&&(p[m.uuid]=m.toJSON(e)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(e.geometries,this.geometry);const p=this.geometry.parameters;if(p!==void 0&&p.shapes!==void 0){const m=p.shapes;if(Array.isArray(m))for(let h=0,_=m.length;h<_;h++){const x=m[h];c(e.shapes,x)}else c(e.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(e.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const p=[];for(let m=0,h=this.material.length;m<h;m++)p.push(c(e.materials,this.material[m]));l.material=p}else l.material=c(e.materials,this.material);if(this.children.length>0){l.children=[];for(let p=0;p<this.children.length;p++)l.children.push(this.children[p].toJSON(e).object)}if(this.animations.length>0){l.animations=[];for(let p=0;p<this.animations.length;p++){const m=this.animations[p];l.animations.push(c(e.animations,m))}}if(i){const p=d(e.geometries),m=d(e.materials),h=d(e.textures),_=d(e.images),x=d(e.shapes),g=d(e.skeletons),M=d(e.animations),b=d(e.nodes);p.length>0&&(r.geometries=p),m.length>0&&(r.materials=m),h.length>0&&(r.textures=h),_.length>0&&(r.images=_),x.length>0&&(r.shapes=x),g.length>0&&(r.skeletons=g),M.length>0&&(r.animations=M),b.length>0&&(r.nodes=b)}return r.object=l,r;function d(p){const m=[];for(const h in p){const _=p[h];delete _.metadata,m.push(_)}return m}}clone(e){return new this.constructor().copy(this,e)}copy(e,i=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),i===!0)for(let r=0;r<e.children.length;r++){const l=e.children[r];this.add(l.clone())}return this}}Wn.DEFAULT_UP=new Q(0,1,0);Wn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Wn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Fn extends Wn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const zy={type:"move"};class Ud{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Fn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Fn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Fn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Q,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const i=this._hand;if(i)for(const r of e.hand.values())this._getHandJoint(i,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,i,r){let l=null,c=null,d=null;const p=this._targetRay,m=this._grip,h=this._hand;if(e&&i.session.visibilityState!=="visible-blurred"){if(h&&e.hand){d=!0;for(const D of e.hand.values()){const y=i.getJointPose(D,r),S=this._getHandJoint(h,D);y!==null&&(S.matrix.fromArray(y.transform.matrix),S.matrix.decompose(S.position,S.rotation,S.scale),S.matrixWorldNeedsUpdate=!0,S.jointRadius=y.radius),S.visible=y!==null}const _=h.joints["index-finger-tip"],x=h.joints["thumb-tip"],g=_.position.distanceTo(x.position),M=.02,b=.005;h.inputState.pinching&&g>M+b?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!h.inputState.pinching&&g<=M-b&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else m!==null&&e.gripSpace&&(c=i.getPose(e.gripSpace,r),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1,m.eventsEnabled&&m.dispatchEvent({type:"gripUpdated",data:e,target:this})));p!==null&&(l=i.getPose(e.targetRaySpace,r),l===null&&c!==null&&(l=c),l!==null&&(p.matrix.fromArray(l.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,l.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(l.linearVelocity)):p.hasLinearVelocity=!1,l.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(l.angularVelocity)):p.hasAngularVelocity=!1,this.dispatchEvent(zy)))}return p!==null&&(p.visible=l!==null),m!==null&&(m.visible=c!==null),h!==null&&(h.visible=d!==null),this}_getHandJoint(e,i){if(e.joints[i.jointName]===void 0){const r=new Fn;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[i.jointName]=r,e.add(r)}return e.joints[i.jointName]}}const Bv={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},tr={h:0,s:0,l:0},vc={h:0,s:0,l:0};function Nd(s,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?s+(e-s)*6*i:i<1/2?e:i<2/3?s+(e-s)*6*(2/3-i):s}class Et{constructor(e,i,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,i,r)}set(e,i,r){if(i===void 0&&r===void 0){const l=e;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(e,i,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,i=hi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,yt.colorSpaceToWorking(this,i),this}setRGB(e,i,r,l=yt.workingColorSpace){return this.r=e,this.g=i,this.b=r,yt.colorSpaceToWorking(this,l),this}setHSL(e,i,r,l=yt.workingColorSpace){if(e=rp(e,1),i=vt(i,0,1),r=vt(r,0,1),i===0)this.r=this.g=this.b=r;else{const c=r<=.5?r*(1+i):r+i-r*i,d=2*r-c;this.r=Nd(d,c,e+1/3),this.g=Nd(d,c,e),this.b=Nd(d,c,e-1/3)}return yt.colorSpaceToWorking(this,l),this}setStyle(e,i=hi){function r(c){c!==void 0&&parseFloat(c)<1&&nt("Color: Alpha component of "+e+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(e)){let c;const d=l[1],p=l[2];switch(d){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return r(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,i);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return r(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,i);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return r(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,i);break;default:nt("Color: Unknown color model "+e)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(e)){const c=l[1],d=c.length;if(d===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,i);if(d===6)return this.setHex(parseInt(c,16),i);nt("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,i);return this}setColorName(e,i=hi){const r=Bv[e.toLowerCase()];return r!==void 0?this.setHex(r,i):nt("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ba(e.r),this.g=ba(e.g),this.b=ba(e.b),this}copyLinearToSRGB(e){return this.r=Fs(e.r),this.g=Fs(e.g),this.b=Fs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=hi){return yt.workingToColorSpace(zn.copy(this),e),Math.round(vt(zn.r*255,0,255))*65536+Math.round(vt(zn.g*255,0,255))*256+Math.round(vt(zn.b*255,0,255))}getHexString(e=hi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,i=yt.workingColorSpace){yt.workingToColorSpace(zn.copy(this),i);const r=zn.r,l=zn.g,c=zn.b,d=Math.max(r,l,c),p=Math.min(r,l,c);let m,h;const _=(p+d)/2;if(p===d)m=0,h=0;else{const x=d-p;switch(h=_<=.5?x/(d+p):x/(2-d-p),d){case r:m=(l-c)/x+(l<c?6:0);break;case l:m=(c-r)/x+2;break;case c:m=(r-l)/x+4;break}m/=6}return e.h=m,e.s=h,e.l=_,e}getRGB(e,i=yt.workingColorSpace){return yt.workingToColorSpace(zn.copy(this),i),e.r=zn.r,e.g=zn.g,e.b=zn.b,e}getStyle(e=hi){yt.workingToColorSpace(zn.copy(this),e);const i=zn.r,r=zn.g,l=zn.b;return e!==hi?`color(${e} ${i.toFixed(3)} ${r.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(r*255)},${Math.round(l*255)})`}offsetHSL(e,i,r){return this.getHSL(tr),this.setHSL(tr.h+e,tr.s+i,tr.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,i){return this.r=e.r+i.r,this.g=e.g+i.g,this.b=e.b+i.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,i){return this.r+=(e.r-this.r)*i,this.g+=(e.g-this.g)*i,this.b+=(e.b-this.b)*i,this}lerpColors(e,i,r){return this.r=e.r+(i.r-e.r)*r,this.g=e.g+(i.g-e.g)*r,this.b=e.b+(i.b-e.b)*r,this}lerpHSL(e,i){this.getHSL(tr),e.getHSL(vc);const r=jo(tr.h,vc.h,i),l=jo(tr.s,vc.s,i),c=jo(tr.l,vc.l,i);return this.setHSL(r,l,c),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const i=this.r,r=this.g,l=this.b,c=e.elements;return this.r=c[0]*i+c[3]*r+c[6]*l,this.g=c[1]*i+c[4]*r+c[7]*l,this.b=c[2]*i+c[5]*r+c[8]*l,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,i=0){return this.r=e[i],this.g=e[i+1],this.b=e[i+2],this}toArray(e=[],i=0){return e[i]=this.r,e[i+1]=this.g,e[i+2]=this.b,e}fromBufferAttribute(e,i){return this.r=e.getX(i),this.g=e.getY(i),this.b=e.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const zn=new Et;Et.NAMES=Bv;class op{constructor(e,i=1,r=1e3){this.isFog=!0,this.name="",this.color=new Et(e),this.near=i,this.far=r}clone(){return new op(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Fy extends Wn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Gr,this.environmentIntensity=1,this.environmentRotation=new Gr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,i){return super.copy(e,i),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const i=super.toJSON(e);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}const Li=new Q,va=new Q,Ld=new Q,xa=new Q,As=new Q,Rs=new Q,R_=new Q,Od=new Q,Pd=new Q,Id=new Q,Bd=new un,zd=new un,Fd=new un;class Ai{constructor(e=new Q,i=new Q,r=new Q){this.a=e,this.b=i,this.c=r}static getNormal(e,i,r,l){l.subVectors(r,i),Li.subVectors(e,i),l.cross(Li);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(e,i,r,l,c){Li.subVectors(l,i),va.subVectors(r,i),Ld.subVectors(e,i);const d=Li.dot(Li),p=Li.dot(va),m=Li.dot(Ld),h=va.dot(va),_=va.dot(Ld),x=d*h-p*p;if(x===0)return c.set(0,0,0),null;const g=1/x,M=(h*m-p*_)*g,b=(d*_-p*m)*g;return c.set(1-M-b,b,M)}static containsPoint(e,i,r,l){return this.getBarycoord(e,i,r,l,xa)===null?!1:xa.x>=0&&xa.y>=0&&xa.x+xa.y<=1}static getInterpolation(e,i,r,l,c,d,p,m){return this.getBarycoord(e,i,r,l,xa)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,xa.x),m.addScaledVector(d,xa.y),m.addScaledVector(p,xa.z),m)}static getInterpolatedAttribute(e,i,r,l,c,d){return Bd.setScalar(0),zd.setScalar(0),Fd.setScalar(0),Bd.fromBufferAttribute(e,i),zd.fromBufferAttribute(e,r),Fd.fromBufferAttribute(e,l),d.setScalar(0),d.addScaledVector(Bd,c.x),d.addScaledVector(zd,c.y),d.addScaledVector(Fd,c.z),d}static isFrontFacing(e,i,r,l){return Li.subVectors(r,i),va.subVectors(e,i),Li.cross(va).dot(l)<0}set(e,i,r){return this.a.copy(e),this.b.copy(i),this.c.copy(r),this}setFromPointsAndIndices(e,i,r,l){return this.a.copy(e[i]),this.b.copy(e[r]),this.c.copy(e[l]),this}setFromAttributeAndIndices(e,i,r,l){return this.a.fromBufferAttribute(e,i),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,l),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Li.subVectors(this.c,this.b),va.subVectors(this.a,this.b),Li.cross(va).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ai.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,i){return Ai.getBarycoord(e,this.a,this.b,this.c,i)}getInterpolation(e,i,r,l,c){return Ai.getInterpolation(e,this.a,this.b,this.c,i,r,l,c)}containsPoint(e){return Ai.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ai.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,i){const r=this.a,l=this.b,c=this.c;let d,p;As.subVectors(l,r),Rs.subVectors(c,r),Od.subVectors(e,r);const m=As.dot(Od),h=Rs.dot(Od);if(m<=0&&h<=0)return i.copy(r);Pd.subVectors(e,l);const _=As.dot(Pd),x=Rs.dot(Pd);if(_>=0&&x<=_)return i.copy(l);const g=m*x-_*h;if(g<=0&&m>=0&&_<=0)return d=m/(m-_),i.copy(r).addScaledVector(As,d);Id.subVectors(e,c);const M=As.dot(Id),b=Rs.dot(Id);if(b>=0&&M<=b)return i.copy(c);const D=M*h-m*b;if(D<=0&&h>=0&&b<=0)return p=h/(h-b),i.copy(r).addScaledVector(Rs,p);const y=_*b-M*x;if(y<=0&&x-_>=0&&M-b>=0)return R_.subVectors(c,l),p=(x-_)/(x-_+(M-b)),i.copy(l).addScaledVector(R_,p);const S=1/(y+D+g);return d=D*S,p=g*S,i.copy(r).addScaledVector(As,d).addScaledVector(Rs,p)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class nl{constructor(e=new Q(1/0,1/0,1/0),i=new Q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=i}set(e,i){return this.min.copy(e),this.max.copy(i),this}setFromArray(e){this.makeEmpty();for(let i=0,r=e.length;i<r;i+=3)this.expandByPoint(Oi.fromArray(e,i));return this}setFromBufferAttribute(e){this.makeEmpty();for(let i=0,r=e.count;i<r;i++)this.expandByPoint(Oi.fromBufferAttribute(e,i));return this}setFromPoints(e){this.makeEmpty();for(let i=0,r=e.length;i<r;i++)this.expandByPoint(e[i]);return this}setFromCenterAndSize(e,i){const r=Oi.copy(i).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,i=!1){return this.makeEmpty(),this.expandByObject(e,i)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,i=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const c=r.getAttribute("position");if(i===!0&&c!==void 0&&e.isInstancedMesh!==!0)for(let d=0,p=c.count;d<p;d++)e.isMesh===!0?e.getVertexPosition(d,Oi):Oi.fromBufferAttribute(c,d),Oi.applyMatrix4(e.matrixWorld),this.expandByPoint(Oi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),xc.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),xc.copy(r.boundingBox)),xc.applyMatrix4(e.matrixWorld),this.union(xc)}const l=e.children;for(let c=0,d=l.length;c<d;c++)this.expandByObject(l[c],i);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,i){return i.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Oi),Oi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let i,r;return e.normal.x>0?(i=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(i=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(i+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(i+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(i+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(i+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),i<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Xo),Sc.subVectors(this.max,Xo),Cs.subVectors(e.a,Xo),ws.subVectors(e.b,Xo),Ds.subVectors(e.c,Xo),nr.subVectors(ws,Cs),ir.subVectors(Ds,ws),wr.subVectors(Cs,Ds);let i=[0,-nr.z,nr.y,0,-ir.z,ir.y,0,-wr.z,wr.y,nr.z,0,-nr.x,ir.z,0,-ir.x,wr.z,0,-wr.x,-nr.y,nr.x,0,-ir.y,ir.x,0,-wr.y,wr.x,0];return!Hd(i,Cs,ws,Ds,Sc)||(i=[1,0,0,0,1,0,0,0,1],!Hd(i,Cs,ws,Ds,Sc))?!1:(Mc.crossVectors(nr,ir),i=[Mc.x,Mc.y,Mc.z],Hd(i,Cs,ws,Ds,Sc))}clampPoint(e,i){return i.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Oi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Oi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Sa[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Sa[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Sa[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Sa[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Sa[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Sa[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Sa[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Sa[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Sa),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Sa=[new Q,new Q,new Q,new Q,new Q,new Q,new Q,new Q],Oi=new Q,xc=new nl,Cs=new Q,ws=new Q,Ds=new Q,nr=new Q,ir=new Q,wr=new Q,Xo=new Q,Sc=new Q,Mc=new Q,Dr=new Q;function Hd(s,e,i,r,l){for(let c=0,d=s.length-3;c<=d;c+=3){Dr.fromArray(s,c);const p=l.x*Math.abs(Dr.x)+l.y*Math.abs(Dr.y)+l.z*Math.abs(Dr.z),m=e.dot(Dr),h=i.dot(Dr),_=r.dot(Dr);if(Math.max(-Math.max(m,h,_),Math.min(m,h,_))>p)return!1}return!0}const Mn=new Q,yc=new bt;let Hy=0;class Ki extends Vr{constructor(e,i,r=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Hy++}),this.name="",this.array=e,this.itemSize=i,this.count=e!==void 0?e.length/i:0,this.normalized=r,this.usage=f_,this.updateRanges=[],this.gpuType=Wi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,i,r){e*=this.itemSize,r*=i.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[e+l]=i.array[r+l];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let i=0,r=this.count;i<r;i++)yc.fromBufferAttribute(this,i),yc.applyMatrix3(e),this.setXY(i,yc.x,yc.y);else if(this.itemSize===3)for(let i=0,r=this.count;i<r;i++)Mn.fromBufferAttribute(this,i),Mn.applyMatrix3(e),this.setXYZ(i,Mn.x,Mn.y,Mn.z);return this}applyMatrix4(e){for(let i=0,r=this.count;i<r;i++)Mn.fromBufferAttribute(this,i),Mn.applyMatrix4(e),this.setXYZ(i,Mn.x,Mn.y,Mn.z);return this}applyNormalMatrix(e){for(let i=0,r=this.count;i<r;i++)Mn.fromBufferAttribute(this,i),Mn.applyNormalMatrix(e),this.setXYZ(i,Mn.x,Mn.y,Mn.z);return this}transformDirection(e){for(let i=0,r=this.count;i<r;i++)Mn.fromBufferAttribute(this,i),Mn.transformDirection(e),this.setXYZ(i,Mn.x,Mn.y,Mn.z);return this}set(e,i=0){return this.array.set(e,i),this}getComponent(e,i){let r=this.array[e*this.itemSize+i];return this.normalized&&(r=Ps(r,this.array)),r}setComponent(e,i,r){return this.normalized&&(r=Vn(r,this.array)),this.array[e*this.itemSize+i]=r,this}getX(e){let i=this.array[e*this.itemSize];return this.normalized&&(i=Ps(i,this.array)),i}setX(e,i){return this.normalized&&(i=Vn(i,this.array)),this.array[e*this.itemSize]=i,this}getY(e){let i=this.array[e*this.itemSize+1];return this.normalized&&(i=Ps(i,this.array)),i}setY(e,i){return this.normalized&&(i=Vn(i,this.array)),this.array[e*this.itemSize+1]=i,this}getZ(e){let i=this.array[e*this.itemSize+2];return this.normalized&&(i=Ps(i,this.array)),i}setZ(e,i){return this.normalized&&(i=Vn(i,this.array)),this.array[e*this.itemSize+2]=i,this}getW(e){let i=this.array[e*this.itemSize+3];return this.normalized&&(i=Ps(i,this.array)),i}setW(e,i){return this.normalized&&(i=Vn(i,this.array)),this.array[e*this.itemSize+3]=i,this}setXY(e,i,r){return e*=this.itemSize,this.normalized&&(i=Vn(i,this.array),r=Vn(r,this.array)),this.array[e+0]=i,this.array[e+1]=r,this}setXYZ(e,i,r,l){return e*=this.itemSize,this.normalized&&(i=Vn(i,this.array),r=Vn(r,this.array),l=Vn(l,this.array)),this.array[e+0]=i,this.array[e+1]=r,this.array[e+2]=l,this}setXYZW(e,i,r,l,c){return e*=this.itemSize,this.normalized&&(i=Vn(i,this.array),r=Vn(r,this.array),l=Vn(l,this.array),c=Vn(c,this.array)),this.array[e+0]=i,this.array[e+1]=r,this.array[e+2]=l,this.array[e+3]=c,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==f_&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class zv extends Ki{constructor(e,i,r){super(new Uint16Array(e),i,r)}}class Fv extends Ki{constructor(e,i,r){super(new Uint32Array(e),i,r)}}class Yt extends Ki{constructor(e,i,r){super(new Float32Array(e),i,r)}}const Gy=new nl,Wo=new Q,Gd=new Q;class il{constructor(e=new Q,i=-1){this.isSphere=!0,this.center=e,this.radius=i}set(e,i){return this.center.copy(e),this.radius=i,this}setFromPoints(e,i){const r=this.center;i!==void 0?r.copy(i):Gy.setFromPoints(e).getCenter(r);let l=0;for(let c=0,d=e.length;c<d;c++)l=Math.max(l,r.distanceToSquared(e[c]));return this.radius=Math.sqrt(l),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const i=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=i*i}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,i){const r=this.center.distanceToSquared(e);return i.copy(e),r>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Wo.subVectors(e,this.center);const i=Wo.lengthSq();if(i>this.radius*this.radius){const r=Math.sqrt(i),l=(r-this.radius)*.5;this.center.addScaledVector(Wo,l/r),this.radius+=l}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Gd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Wo.copy(e.center).add(Gd)),this.expandByPoint(Wo.copy(e.center).sub(Gd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Vy=0;const Ei=new fn,Vd=new Wn,Us=new Q,di=new nl,qo=new nl,Rn=new Q;class nn extends Vr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Vy++}),this.uuid=Ws(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(sy(e)?Fv:zv)(e,1):this.index=e,this}setIndirect(e,i=0){return this.indirect=e,this.indirectOffset=i,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,i){return this.attributes[e]=i,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,i,r=0){this.groups.push({start:e,count:i,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,i){this.drawRange.start=e,this.drawRange.count=i}applyMatrix4(e){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(e),i.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const c=new st().getNormalMatrix(e);r.applyNormalMatrix(c),r.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(e),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Ei.makeRotationFromQuaternion(e),this.applyMatrix4(Ei),this}rotateX(e){return Ei.makeRotationX(e),this.applyMatrix4(Ei),this}rotateY(e){return Ei.makeRotationY(e),this.applyMatrix4(Ei),this}rotateZ(e){return Ei.makeRotationZ(e),this.applyMatrix4(Ei),this}translate(e,i,r){return Ei.makeTranslation(e,i,r),this.applyMatrix4(Ei),this}scale(e,i,r){return Ei.makeScale(e,i,r),this.applyMatrix4(Ei),this}lookAt(e){return Vd.lookAt(e),Vd.updateMatrix(),this.applyMatrix4(Vd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Us).negate(),this.translate(Us.x,Us.y,Us.z),this}setFromPoints(e){const i=this.getAttribute("position");if(i===void 0){const r=[];for(let l=0,c=e.length;l<c;l++){const d=e[l];r.push(d.x,d.y,d.z||0)}this.setAttribute("position",new Yt(r,3))}else{const r=Math.min(e.length,i.count);for(let l=0;l<r;l++){const c=e[l];i.setXYZ(l,c.x,c.y,c.z||0)}e.length>i.count&&nt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new nl);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Tt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Q(-1/0,-1/0,-1/0),new Q(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),i)for(let r=0,l=i.length;r<l;r++){const c=i[r];di.setFromBufferAttribute(c),this.morphTargetsRelative?(Rn.addVectors(this.boundingBox.min,di.min),this.boundingBox.expandByPoint(Rn),Rn.addVectors(this.boundingBox.max,di.max),this.boundingBox.expandByPoint(Rn)):(this.boundingBox.expandByPoint(di.min),this.boundingBox.expandByPoint(di.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Tt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new il);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Tt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Q,1/0);return}if(e){const r=this.boundingSphere.center;if(di.setFromBufferAttribute(e),i)for(let c=0,d=i.length;c<d;c++){const p=i[c];qo.setFromBufferAttribute(p),this.morphTargetsRelative?(Rn.addVectors(di.min,qo.min),di.expandByPoint(Rn),Rn.addVectors(di.max,qo.max),di.expandByPoint(Rn)):(di.expandByPoint(qo.min),di.expandByPoint(qo.max))}di.getCenter(r);let l=0;for(let c=0,d=e.count;c<d;c++)Rn.fromBufferAttribute(e,c),l=Math.max(l,r.distanceToSquared(Rn));if(i)for(let c=0,d=i.length;c<d;c++){const p=i[c],m=this.morphTargetsRelative;for(let h=0,_=p.count;h<_;h++)Rn.fromBufferAttribute(p,h),m&&(Us.fromBufferAttribute(e,h),Rn.add(Us)),l=Math.max(l,r.distanceToSquared(Rn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&Tt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,i=this.attributes;if(e===null||i.position===void 0||i.normal===void 0||i.uv===void 0){Tt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=i.position,l=i.normal,c=i.uv;let d=this.getAttribute("tangent");(d===void 0||d.count!==r.count)&&(d=new Ki(new Float32Array(4*r.count),4),this.setAttribute("tangent",d));const p=[],m=[];for(let T=0;T<r.count;T++)p[T]=new Q,m[T]=new Q;const h=new Q,_=new Q,x=new Q,g=new bt,M=new bt,b=new bt,D=new Q,y=new Q;function S(T,N,k){h.fromBufferAttribute(r,T),_.fromBufferAttribute(r,N),x.fromBufferAttribute(r,k),g.fromBufferAttribute(c,T),M.fromBufferAttribute(c,N),b.fromBufferAttribute(c,k),_.sub(h),x.sub(h),M.sub(g),b.sub(g);const G=1/(M.x*b.y-b.x*M.y);isFinite(G)&&(D.copy(_).multiplyScalar(b.y).addScaledVector(x,-M.y).multiplyScalar(G),y.copy(x).multiplyScalar(M.x).addScaledVector(_,-b.x).multiplyScalar(G),p[T].add(D),p[N].add(D),p[k].add(D),m[T].add(y),m[N].add(y),m[k].add(y))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let T=0,N=w.length;T<N;++T){const k=w[T],G=k.start,Z=k.count;for(let ce=G,le=G+Z;ce<le;ce+=3)S(e.getX(ce+0),e.getX(ce+1),e.getX(ce+2))}const U=new Q,A=new Q,P=new Q,L=new Q;function B(T){P.fromBufferAttribute(l,T),L.copy(P);const N=p[T];U.copy(N),U.sub(P.multiplyScalar(P.dot(N))).normalize(),A.crossVectors(L,N);const G=A.dot(m[T])<0?-1:1;d.setXYZW(T,U.x,U.y,U.z,G)}for(let T=0,N=w.length;T<N;++T){const k=w[T],G=k.start,Z=k.count;for(let ce=G,le=G+Z;ce<le;ce+=3)B(e.getX(ce+0)),B(e.getX(ce+1)),B(e.getX(ce+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,i=this.getAttribute("position");if(i!==void 0){let r=this.getAttribute("normal");if(r===void 0||r.count!==i.count)r=new Ki(new Float32Array(i.count*3),3),this.setAttribute("normal",r);else for(let g=0,M=r.count;g<M;g++)r.setXYZ(g,0,0,0);const l=new Q,c=new Q,d=new Q,p=new Q,m=new Q,h=new Q,_=new Q,x=new Q;if(e)for(let g=0,M=e.count;g<M;g+=3){const b=e.getX(g+0),D=e.getX(g+1),y=e.getX(g+2);l.fromBufferAttribute(i,b),c.fromBufferAttribute(i,D),d.fromBufferAttribute(i,y),_.subVectors(d,c),x.subVectors(l,c),_.cross(x),p.fromBufferAttribute(r,b),m.fromBufferAttribute(r,D),h.fromBufferAttribute(r,y),p.add(_),m.add(_),h.add(_),r.setXYZ(b,p.x,p.y,p.z),r.setXYZ(D,m.x,m.y,m.z),r.setXYZ(y,h.x,h.y,h.z)}else for(let g=0,M=i.count;g<M;g+=3)l.fromBufferAttribute(i,g+0),c.fromBufferAttribute(i,g+1),d.fromBufferAttribute(i,g+2),_.subVectors(d,c),x.subVectors(l,c),_.cross(x),r.setXYZ(g+0,_.x,_.y,_.z),r.setXYZ(g+1,_.x,_.y,_.z),r.setXYZ(g+2,_.x,_.y,_.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let i=0,r=e.count;i<r;i++)Rn.fromBufferAttribute(e,i),Rn.normalize(),e.setXYZ(i,Rn.x,Rn.y,Rn.z)}toNonIndexed(){function e(p,m){const h=p.array,_=p.itemSize,x=p.normalized,g=new h.constructor(m.length*_);let M=0,b=0;for(let D=0,y=m.length;D<y;D++){p.isInterleavedBufferAttribute?M=m[D]*p.data.stride+p.offset:M=m[D]*_;for(let S=0;S<_;S++)g[b++]=h[M++]}return new Ki(g,_,x)}if(this.index===null)return nt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new nn,r=this.index.array,l=this.attributes;for(const p in l){const m=l[p],h=e(m,r);i.setAttribute(p,h)}const c=this.morphAttributes;for(const p in c){const m=[],h=c[p];for(let _=0,x=h.length;_<x;_++){const g=h[_],M=e(g,r);m.push(M)}i.morphAttributes[p]=m}i.morphTargetsRelative=this.morphTargetsRelative;const d=this.groups;for(let p=0,m=d.length;p<m;p++){const h=d[p];i.addGroup(h.start,h.count,h.materialIndex)}return i}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const m=this.parameters;for(const h in m)m[h]!==void 0&&(e[h]=m[h]);return e}e.data={attributes:{}};const i=this.index;i!==null&&(e.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const r=this.attributes;for(const m in r){const h=r[m];e.data.attributes[m]=h.toJSON(e.data)}const l={};let c=!1;for(const m in this.morphAttributes){const h=this.morphAttributes[m],_=[];for(let x=0,g=h.length;x<g;x++){const M=h[x];_.push(M.toJSON(e.data))}_.length>0&&(l[m]=_,c=!0)}c&&(e.data.morphAttributes=l,e.data.morphTargetsRelative=this.morphTargetsRelative);const d=this.groups;d.length>0&&(e.data.groups=JSON.parse(JSON.stringify(d)));const p=this.boundingSphere;return p!==null&&(e.data.boundingSphere=p.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone());const l=e.attributes;for(const h in l){const _=l[h];this.setAttribute(h,_.clone(i))}const c=e.morphAttributes;for(const h in c){const _=[],x=c[h];for(let g=0,M=x.length;g<M;g++)_.push(x[g].clone(i));this.morphAttributes[h]=_}this.morphTargetsRelative=e.morphTargetsRelative;const d=e.groups;for(let h=0,_=d.length;h<_;h++){const x=d[h];this.addGroup(x.start,x.count,x.materialIndex)}const p=e.boundingBox;p!==null&&(this.boundingBox=p.clone());const m=e.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let ky=0;class Ys extends Vr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ky++}),this.uuid=Ws(),this.name="",this.type="Material",this.blending=Is,this.side=lr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ih,this.blendDst=ah,this.blendEquation=Or,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Et(0,0,0),this.blendAlpha=0,this.depthFunc=Gs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=u_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ms,this.stencilZFail=Ms,this.stencilZPass=Ms,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const i in e){const r=e[i];if(r===void 0){nt(`Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){nt(`Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(r):l&&l.isVector2&&r&&r.isVector2||l&&l.isEuler&&r&&r.isEuler||l&&l.isVector3&&r&&r.isVector3?l.copy(r):this[i]=r}}toJSON(e){const i=e===void 0||typeof e=="string";i&&(e={textures:{},images:{}});const r={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(r.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(r.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==Is&&(r.blending=this.blending),this.side!==lr&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==ih&&(r.blendSrc=this.blendSrc),this.blendDst!==ah&&(r.blendDst=this.blendDst),this.blendEquation!==Or&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==Gs&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==u_&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ms&&(r.stencilFail=this.stencilFail),this.stencilZFail!==Ms&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==Ms&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.allowOverride===!1&&(r.allowOverride=!1),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function l(c){const d=[];for(const p in c){const m=c[p];delete m.metadata,d.push(m)}return d}if(i){const c=l(e.textures),d=l(e.images);c.length>0&&(r.textures=c),d.length>0&&(r.images=d)}return r}fromJSON(e,i){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Et().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=i[e.map]||null),e.matcap!==void 0&&(this.matcap=i[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=i[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=i[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=i[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let r=e.normalScale;Array.isArray(r)===!1&&(r=[r,r]),this.normalScale=new bt().fromArray(r)}return e.displacementMap!==void 0&&(this.displacementMap=i[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=i[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=i[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=i[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=i[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=i[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=i[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=i[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=i[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=i[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=i[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=i[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=i[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=i[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new bt().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=i[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=i[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=i[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=i[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=i[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=i[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=i[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const i=e.clippingPlanes;let r=null;if(i!==null){const l=i.length;r=new Array(l);for(let c=0;c!==l;++c)r[c]=i[c].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Ma=new Q,kd=new Q,Ec=new Q,ar=new Q,Xd=new Q,bc=new Q,Wd=new Q;class lp{constructor(e=new Q,i=new Q(0,0,-1)){this.origin=e,this.direction=i}set(e,i){return this.origin.copy(e),this.direction.copy(i),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,i){return i.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ma)),this}closestPointToPoint(e,i){i.subVectors(e,this.origin);const r=i.dot(this.direction);return r<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const i=Ma.subVectors(e,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(e):(Ma.copy(this.origin).addScaledVector(this.direction,i),Ma.distanceToSquared(e))}distanceSqToSegment(e,i,r,l){kd.copy(e).add(i).multiplyScalar(.5),Ec.copy(i).sub(e).normalize(),ar.copy(this.origin).sub(kd);const c=e.distanceTo(i)*.5,d=-this.direction.dot(Ec),p=ar.dot(this.direction),m=-ar.dot(Ec),h=ar.lengthSq(),_=Math.abs(1-d*d);let x,g,M,b;if(_>0)if(x=d*m-p,g=d*p-m,b=c*_,x>=0)if(g>=-b)if(g<=b){const D=1/_;x*=D,g*=D,M=x*(x+d*g+2*p)+g*(d*x+g+2*m)+h}else g=c,x=Math.max(0,-(d*g+p)),M=-x*x+g*(g+2*m)+h;else g=-c,x=Math.max(0,-(d*g+p)),M=-x*x+g*(g+2*m)+h;else g<=-b?(x=Math.max(0,-(-d*c+p)),g=x>0?-c:Math.min(Math.max(-c,-m),c),M=-x*x+g*(g+2*m)+h):g<=b?(x=0,g=Math.min(Math.max(-c,-m),c),M=g*(g+2*m)+h):(x=Math.max(0,-(d*c+p)),g=x>0?c:Math.min(Math.max(-c,-m),c),M=-x*x+g*(g+2*m)+h);else g=d>0?-c:c,x=Math.max(0,-(d*g+p)),M=-x*x+g*(g+2*m)+h;return r&&r.copy(this.origin).addScaledVector(this.direction,x),l&&l.copy(kd).addScaledVector(Ec,g),M}intersectSphere(e,i){Ma.subVectors(e.center,this.origin);const r=Ma.dot(this.direction),l=Ma.dot(Ma)-r*r,c=e.radius*e.radius;if(l>c)return null;const d=Math.sqrt(c-l),p=r-d,m=r+d;return m<0?null:p<0?this.at(m,i):this.at(p,i)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const i=e.normal.dot(this.direction);if(i===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/i;return r>=0?r:null}intersectPlane(e,i){const r=this.distanceToPlane(e);return r===null?null:this.at(r,i)}intersectsPlane(e){const i=e.distanceToPoint(this.origin);return i===0||e.normal.dot(this.direction)*i<0}intersectBox(e,i){let r,l,c,d,p,m;const h=1/this.direction.x,_=1/this.direction.y,x=1/this.direction.z,g=this.origin;return h>=0?(r=(e.min.x-g.x)*h,l=(e.max.x-g.x)*h):(r=(e.max.x-g.x)*h,l=(e.min.x-g.x)*h),_>=0?(c=(e.min.y-g.y)*_,d=(e.max.y-g.y)*_):(c=(e.max.y-g.y)*_,d=(e.min.y-g.y)*_),r>d||c>l||((c>r||isNaN(r))&&(r=c),(d<l||isNaN(l))&&(l=d),x>=0?(p=(e.min.z-g.z)*x,m=(e.max.z-g.z)*x):(p=(e.max.z-g.z)*x,m=(e.min.z-g.z)*x),r>m||p>l)||((p>r||r!==r)&&(r=p),(m<l||l!==l)&&(l=m),l<0)?null:this.at(r>=0?r:l,i)}intersectsBox(e){return this.intersectBox(e,Ma)!==null}intersectTriangle(e,i,r,l,c){Xd.subVectors(i,e),bc.subVectors(r,e),Wd.crossVectors(Xd,bc);let d=this.direction.dot(Wd),p;if(d>0){if(l)return null;p=1}else if(d<0)p=-1,d=-d;else return null;ar.subVectors(this.origin,e);const m=p*this.direction.dot(bc.crossVectors(ar,bc));if(m<0)return null;const h=p*this.direction.dot(Xd.cross(ar));if(h<0||m+h>d)return null;const _=-p*ar.dot(Wd);return _<0?null:this.at(_/d,c)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class On extends Ys{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Et(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gr,this.combine=vv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const C_=new fn,Ur=new lp,Tc=new il,w_=new Q,Ac=new Q,Rc=new Q,Cc=new Q,qd=new Q,wc=new Q,D_=new Q,Dc=new Q;class qt extends Wn{constructor(e=new nn,i=new On){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,r=Object.keys(i);if(r.length>0){const l=i[r[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,d=l.length;c<d;c++){const p=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[p]=c}}}}getVertexPosition(e,i){const r=this.geometry,l=r.attributes.position,c=r.morphAttributes.position,d=r.morphTargetsRelative;i.fromBufferAttribute(l,e);const p=this.morphTargetInfluences;if(c&&p){wc.set(0,0,0);for(let m=0,h=c.length;m<h;m++){const _=p[m],x=c[m];_!==0&&(qd.fromBufferAttribute(x,e),d?wc.addScaledVector(qd,_):wc.addScaledVector(qd.sub(i),_))}i.add(wc)}return i}raycast(e,i){const r=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),Tc.copy(r.boundingSphere),Tc.applyMatrix4(c),Ur.copy(e.ray).recast(e.near),!(Tc.containsPoint(Ur.origin)===!1&&(Ur.intersectSphere(Tc,w_)===null||Ur.origin.distanceToSquared(w_)>(e.far-e.near)**2))&&(C_.copy(c).invert(),Ur.copy(e.ray).applyMatrix4(C_),!(r.boundingBox!==null&&Ur.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,i,Ur)))}_computeIntersections(e,i,r){let l;const c=this.geometry,d=this.material,p=c.index,m=c.attributes.position,h=c.attributes.uv,_=c.attributes.uv1,x=c.attributes.normal,g=c.groups,M=c.drawRange;if(p!==null)if(Array.isArray(d))for(let b=0,D=g.length;b<D;b++){const y=g[b],S=d[y.materialIndex],w=Math.max(y.start,M.start),U=Math.min(p.count,Math.min(y.start+y.count,M.start+M.count));for(let A=w,P=U;A<P;A+=3){const L=p.getX(A),B=p.getX(A+1),T=p.getX(A+2);l=Uc(this,S,e,r,h,_,x,L,B,T),l&&(l.faceIndex=Math.floor(A/3),l.face.materialIndex=y.materialIndex,i.push(l))}}else{const b=Math.max(0,M.start),D=Math.min(p.count,M.start+M.count);for(let y=b,S=D;y<S;y+=3){const w=p.getX(y),U=p.getX(y+1),A=p.getX(y+2);l=Uc(this,d,e,r,h,_,x,w,U,A),l&&(l.faceIndex=Math.floor(y/3),i.push(l))}}else if(m!==void 0)if(Array.isArray(d))for(let b=0,D=g.length;b<D;b++){const y=g[b],S=d[y.materialIndex],w=Math.max(y.start,M.start),U=Math.min(m.count,Math.min(y.start+y.count,M.start+M.count));for(let A=w,P=U;A<P;A+=3){const L=A,B=A+1,T=A+2;l=Uc(this,S,e,r,h,_,x,L,B,T),l&&(l.faceIndex=Math.floor(A/3),l.face.materialIndex=y.materialIndex,i.push(l))}}else{const b=Math.max(0,M.start),D=Math.min(m.count,M.start+M.count);for(let y=b,S=D;y<S;y+=3){const w=y,U=y+1,A=y+2;l=Uc(this,d,e,r,h,_,x,w,U,A),l&&(l.faceIndex=Math.floor(y/3),i.push(l))}}}}function Xy(s,e,i,r,l,c,d,p){let m;if(e.side===$n?m=r.intersectTriangle(d,c,l,!0,p):m=r.intersectTriangle(l,c,d,e.side===lr,p),m===null)return null;Dc.copy(p),Dc.applyMatrix4(s.matrixWorld);const h=i.ray.origin.distanceTo(Dc);return h<i.near||h>i.far?null:{distance:h,point:Dc.clone(),object:s}}function Uc(s,e,i,r,l,c,d,p,m,h){s.getVertexPosition(p,Ac),s.getVertexPosition(m,Rc),s.getVertexPosition(h,Cc);const _=Xy(s,e,i,r,Ac,Rc,Cc,D_);if(_){const x=new Q;Ai.getBarycoord(D_,Ac,Rc,Cc,x),l&&(_.uv=Ai.getInterpolatedAttribute(l,p,m,h,x,new bt)),c&&(_.uv1=Ai.getInterpolatedAttribute(c,p,m,h,x,new bt)),d&&(_.normal=Ai.getInterpolatedAttribute(d,p,m,h,x,new Q),_.normal.dot(r.direction)>0&&_.normal.multiplyScalar(-1));const g={a:p,b:m,c:h,normal:new Q,materialIndex:0};Ai.getNormal(Ac,Rc,Cc,g.normal),_.face=g,_.barycoord=x}return _}class Wy extends Xn{constructor(e=null,i=1,r=1,l,c,d,p,m,h=Ln,_=Ln,x,g){super(null,d,p,m,h,_,l,c,x,g),this.isDataTexture=!0,this.image={data:e,width:i,height:r},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Yd=new Q,qy=new Q,Yy=new st;class Lr{constructor(e=new Q(1,0,0),i=0){this.isPlane=!0,this.normal=e,this.constant=i}set(e,i){return this.normal.copy(e),this.constant=i,this}setComponents(e,i,r,l){return this.normal.set(e,i,r),this.constant=l,this}setFromNormalAndCoplanarPoint(e,i){return this.normal.copy(e),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(e,i,r){const l=Yd.subVectors(r,i).cross(qy.subVectors(e,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,i){return i.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,i,r=!0){const l=e.delta(Yd),c=this.normal.dot(l);if(c===0)return this.distanceToPoint(e.start)===0?i.copy(e.start):null;const d=-(e.start.dot(this.normal)+this.constant)/c;return r===!0&&(d<0||d>1)?null:i.copy(e.start).addScaledVector(l,d)}intersectsLine(e){const i=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return i<0&&r>0||r<0&&i>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,i){const r=i||Yy.getNormalMatrix(e),l=this.coplanarPoint(Yd).applyMatrix4(e),c=this.normal.applyMatrix3(r).normalize();return this.constant=-l.dot(c),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Nr=new il,Zy=new bt(.5,.5),Nc=new Q;class Hv{constructor(e=new Lr,i=new Lr,r=new Lr,l=new Lr,c=new Lr,d=new Lr){this.planes=[e,i,r,l,c,d]}set(e,i,r,l,c,d){const p=this.planes;return p[0].copy(e),p[1].copy(i),p[2].copy(r),p[3].copy(l),p[4].copy(c),p[5].copy(d),this}copy(e){const i=this.planes;for(let r=0;r<6;r++)i[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,i=qi,r=!1){const l=this.planes,c=e.elements,d=c[0],p=c[1],m=c[2],h=c[3],_=c[4],x=c[5],g=c[6],M=c[7],b=c[8],D=c[9],y=c[10],S=c[11],w=c[12],U=c[13],A=c[14],P=c[15];if(l[0].setComponents(h-d,M-_,S-b,P-w).normalize(),l[1].setComponents(h+d,M+_,S+b,P+w).normalize(),l[2].setComponents(h+p,M+x,S+D,P+U).normalize(),l[3].setComponents(h-p,M-x,S-D,P-U).normalize(),r)l[4].setComponents(m,g,y,A).normalize(),l[5].setComponents(h-m,M-g,S-y,P-A).normalize();else if(l[4].setComponents(h-m,M-g,S-y,P-A).normalize(),i===qi)l[5].setComponents(h+m,M+g,S+y,P+A).normalize();else if(i===eu)l[5].setComponents(m,g,y,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Nr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const i=e.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),Nr.copy(i.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Nr)}intersectsSprite(e){Nr.center.set(0,0,0);const i=Zy.distanceTo(e.center);return Nr.radius=.7071067811865476+i,Nr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Nr)}intersectsSphere(e){const i=this.planes,r=e.center,l=-e.radius;for(let c=0;c<6;c++)if(i[c].distanceToPoint(r)<l)return!1;return!0}intersectsBox(e){const i=this.planes;for(let r=0;r<6;r++){const l=i[r];if(Nc.x=l.normal.x>0?e.max.x:e.min.x,Nc.y=l.normal.y>0?e.max.y:e.min.y,Nc.z=l.normal.z>0?e.max.z:e.min.z,l.distanceToPoint(Nc)<0)return!1}return!0}containsPoint(e){const i=this.planes;for(let r=0;r<6;r++)if(i[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Gv extends Ys{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Et(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const nu=new Q,iu=new Q,U_=new fn,Yo=new lp,Lc=new il,Zd=new Q,N_=new Q;class Ky extends Wn{constructor(e=new nn,i=new Gv){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const i=e.attributes.position,r=[0];for(let l=1,c=i.count;l<c;l++)nu.fromBufferAttribute(i,l-1),iu.fromBufferAttribute(i,l),r[l]=r[l-1],r[l]+=nu.distanceTo(iu);e.setAttribute("lineDistance",new Yt(r,1))}else nt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,i){const r=this.geometry,l=this.matrixWorld,c=e.params.Line.threshold,d=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),Lc.copy(r.boundingSphere),Lc.applyMatrix4(l),Lc.radius+=c,e.ray.intersectsSphere(Lc)===!1)return;U_.copy(l).invert(),Yo.copy(e.ray).applyMatrix4(U_);const p=c/((this.scale.x+this.scale.y+this.scale.z)/3),m=p*p,h=this.isLineSegments?2:1,_=r.index,g=r.attributes.position;if(_!==null){const M=Math.max(0,d.start),b=Math.min(_.count,d.start+d.count);for(let D=M,y=b-1;D<y;D+=h){const S=_.getX(D),w=_.getX(D+1),U=Oc(this,e,Yo,m,S,w,D);U&&i.push(U)}if(this.isLineLoop){const D=_.getX(b-1),y=_.getX(M),S=Oc(this,e,Yo,m,D,y,b-1);S&&i.push(S)}}else{const M=Math.max(0,d.start),b=Math.min(g.count,d.start+d.count);for(let D=M,y=b-1;D<y;D+=h){const S=Oc(this,e,Yo,m,D,D+1,D);S&&i.push(S)}if(this.isLineLoop){const D=Oc(this,e,Yo,m,b-1,M,b-1);D&&i.push(D)}}}updateMorphTargets(){const i=this.geometry.morphAttributes,r=Object.keys(i);if(r.length>0){const l=i[r[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,d=l.length;c<d;c++){const p=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[p]=c}}}}}function Oc(s,e,i,r,l,c,d){const p=s.geometry.attributes.position;if(nu.fromBufferAttribute(p,l),iu.fromBufferAttribute(p,c),i.distanceSqToSegment(nu,iu,Zd,N_)>r)return;Zd.applyMatrix4(s.matrixWorld);const h=e.ray.origin.distanceTo(Zd);if(!(h<e.near||h>e.far))return{distance:h,point:N_.clone().applyMatrix4(s.matrixWorld),index:d,face:null,faceIndex:null,barycoord:null,object:s}}const L_=new Q,O_=new Q;class ou extends Ky{constructor(e,i){super(e,i),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const i=e.attributes.position,r=[];for(let l=0,c=i.count;l<c;l+=2)L_.fromBufferAttribute(i,l),O_.fromBufferAttribute(i,l+1),r[l]=l===0?0:r[l-1],r[l+1]=r[l]+L_.distanceTo(O_);e.setAttribute("lineDistance",new Yt(r,1))}else nt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Vv extends Ys{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Et(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const P_=new fn,Xh=new lp,Pc=new il,Ic=new Q;class Qy extends Wn{constructor(e=new nn,i=new Vv){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,i){const r=this.geometry,l=this.matrixWorld,c=e.params.Points.threshold,d=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),Pc.copy(r.boundingSphere),Pc.applyMatrix4(l),Pc.radius+=c,e.ray.intersectsSphere(Pc)===!1)return;P_.copy(l).invert(),Xh.copy(e.ray).applyMatrix4(P_);const p=c/((this.scale.x+this.scale.y+this.scale.z)/3),m=p*p,h=r.index,x=r.attributes.position;if(h!==null){const g=Math.max(0,d.start),M=Math.min(h.count,d.start+d.count);for(let b=g,D=M;b<D;b++){const y=h.getX(b);Ic.fromBufferAttribute(x,y),I_(Ic,y,m,l,e,i,this)}}else{const g=Math.max(0,d.start),M=Math.min(x.count,d.start+d.count);for(let b=g,D=M;b<D;b++)Ic.fromBufferAttribute(x,b),I_(Ic,b,m,l,e,i,this)}}updateMorphTargets(){const i=this.geometry.morphAttributes,r=Object.keys(i);if(r.length>0){const l=i[r[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,d=l.length;c<d;c++){const p=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[p]=c}}}}}function I_(s,e,i,r,l,c,d){const p=Xh.distanceSqToPoint(s);if(p<i){const m=new Q;Xh.closestPointToPoint(s,m),m.applyMatrix4(r);const h=l.ray.origin.distanceTo(m);if(h<l.near||h>l.far)return;c.push({distance:h,distanceToRay:Math.sqrt(p),point:m,index:e,face:null,faceIndex:null,barycoord:null,object:d})}}class kv extends Xn{constructor(e=[],i=Fr,r,l,c,d,p,m,h,_){super(e,i,r,l,c,d,p,m,h,_),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ks extends Xn{constructor(e,i,r=Qi,l,c,d,p=Ln,m=Ln,h,_=Aa,x=1){if(_!==Aa&&_!==Br)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const g={width:e,height:i,depth:x};super(g,l,c,d,p,m,_,r,h),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new sp(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const i=super.toJSON(e);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class Jy extends ks{constructor(e,i=Qi,r=Fr,l,c,d=Ln,p=Ln,m,h=Aa){const _={width:e,height:e,depth:1},x=[_,_,_,_,_,_];super(e,e,i,r,l,c,d,p,m,h),this.image=x,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Xv extends Xn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Zs extends nn{constructor(e=1,i=1,r=1,l=1,c=1,d=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:i,depth:r,widthSegments:l,heightSegments:c,depthSegments:d};const p=this;l=Math.floor(l),c=Math.floor(c),d=Math.floor(d);const m=[],h=[],_=[],x=[];let g=0,M=0;b("z","y","x",-1,-1,r,i,e,d,c,0),b("z","y","x",1,-1,r,i,-e,d,c,1),b("x","z","y",1,1,e,r,i,l,d,2),b("x","z","y",1,-1,e,r,-i,l,d,3),b("x","y","z",1,-1,e,i,r,l,c,4),b("x","y","z",-1,-1,e,i,-r,l,c,5),this.setIndex(m),this.setAttribute("position",new Yt(h,3)),this.setAttribute("normal",new Yt(_,3)),this.setAttribute("uv",new Yt(x,2));function b(D,y,S,w,U,A,P,L,B,T,N){const k=A/B,G=P/T,Z=A/2,ce=P/2,le=L/2,Y=B+1,z=T+1;let F=0,te=0;const ge=new Q;for(let Ee=0;Ee<z;Ee++){const I=Ee*G-ce;for(let J=0;J<Y;J++){const ye=J*k-Z;ge[D]=ye*w,ge[y]=I*U,ge[S]=le,h.push(ge.x,ge.y,ge.z),ge[D]=0,ge[y]=0,ge[S]=L>0?1:-1,_.push(ge.x,ge.y,ge.z),x.push(J/B),x.push(1-Ee/T),F+=1}}for(let Ee=0;Ee<T;Ee++)for(let I=0;I<B;I++){const J=g+I+Y*Ee,ye=g+I+Y*(Ee+1),Re=g+(I+1)+Y*(Ee+1),Ie=g+(I+1)+Y*Ee;m.push(J,ye,Ie),m.push(ye,Re,Ie),te+=6}p.addGroup(M,te,N),M+=te,g+=F}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zs(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class cp extends nn{constructor(e=[],i=[],r=1,l=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:i,radius:r,detail:l};const c=[],d=[];p(l),h(r),_(),this.setAttribute("position",new Yt(c,3)),this.setAttribute("normal",new Yt(c.slice(),3)),this.setAttribute("uv",new Yt(d,2)),l===0?this.computeVertexNormals():this.normalizeNormals();function p(w){const U=new Q,A=new Q,P=new Q;for(let L=0;L<i.length;L+=3)M(i[L+0],U),M(i[L+1],A),M(i[L+2],P),m(U,A,P,w)}function m(w,U,A,P){const L=P+1,B=[];for(let T=0;T<=L;T++){B[T]=[];const N=w.clone().lerp(A,T/L),k=U.clone().lerp(A,T/L),G=L-T;for(let Z=0;Z<=G;Z++)Z===0&&T===L?B[T][Z]=N:B[T][Z]=N.clone().lerp(k,Z/G)}for(let T=0;T<L;T++)for(let N=0;N<2*(L-T)-1;N++){const k=Math.floor(N/2);N%2===0?(g(B[T][k+1]),g(B[T+1][k]),g(B[T][k])):(g(B[T][k+1]),g(B[T+1][k+1]),g(B[T+1][k]))}}function h(w){const U=new Q;for(let A=0;A<c.length;A+=3)U.x=c[A+0],U.y=c[A+1],U.z=c[A+2],U.normalize().multiplyScalar(w),c[A+0]=U.x,c[A+1]=U.y,c[A+2]=U.z}function _(){const w=new Q;for(let U=0;U<c.length;U+=3){w.x=c[U+0],w.y=c[U+1],w.z=c[U+2];const A=y(w)/2/Math.PI+.5,P=S(w)/Math.PI+.5;d.push(A,1-P)}b(),x()}function x(){for(let w=0;w<d.length;w+=6){const U=d[w+0],A=d[w+2],P=d[w+4],L=Math.max(U,A,P),B=Math.min(U,A,P);L>.9&&B<.1&&(U<.2&&(d[w+0]+=1),A<.2&&(d[w+2]+=1),P<.2&&(d[w+4]+=1))}}function g(w){c.push(w.x,w.y,w.z)}function M(w,U){const A=w*3;U.x=e[A+0],U.y=e[A+1],U.z=e[A+2]}function b(){const w=new Q,U=new Q,A=new Q,P=new Q,L=new bt,B=new bt,T=new bt;for(let N=0,k=0;N<c.length;N+=9,k+=6){w.set(c[N+0],c[N+1],c[N+2]),U.set(c[N+3],c[N+4],c[N+5]),A.set(c[N+6],c[N+7],c[N+8]),L.set(d[k+0],d[k+1]),B.set(d[k+2],d[k+3]),T.set(d[k+4],d[k+5]),P.copy(w).add(U).add(A).divideScalar(3);const G=y(P);D(L,k+0,w,G),D(B,k+2,U,G),D(T,k+4,A,G)}}function D(w,U,A,P){P<0&&w.x===1&&(d[U]=w.x-1),A.x===0&&A.z===0&&(d[U]=P/2/Math.PI+.5)}function y(w){return Math.atan2(w.z,-w.x)}function S(w){return Math.atan2(-w.y,Math.sqrt(w.x*w.x+w.z*w.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cp(e.vertices,e.indices,e.radius,e.detail)}}const Bc=new Q,zc=new Q,Kd=new Q,Fc=new Ai;class up extends nn{constructor(e=null,i=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:i},e!==null){const l=Math.pow(10,4),c=Math.cos(zs*i),d=e.getIndex(),p=e.getAttribute("position"),m=d?d.count:p.count,h=[0,0,0],_=["a","b","c"],x=new Array(3),g={},M=[];for(let b=0;b<m;b+=3){d?(h[0]=d.getX(b),h[1]=d.getX(b+1),h[2]=d.getX(b+2)):(h[0]=b,h[1]=b+1,h[2]=b+2);const{a:D,b:y,c:S}=Fc;if(D.fromBufferAttribute(p,h[0]),y.fromBufferAttribute(p,h[1]),S.fromBufferAttribute(p,h[2]),Fc.getNormal(Kd),x[0]=`${Math.round(D.x*l)},${Math.round(D.y*l)},${Math.round(D.z*l)}`,x[1]=`${Math.round(y.x*l)},${Math.round(y.y*l)},${Math.round(y.z*l)}`,x[2]=`${Math.round(S.x*l)},${Math.round(S.y*l)},${Math.round(S.z*l)}`,!(x[0]===x[1]||x[1]===x[2]||x[2]===x[0]))for(let w=0;w<3;w++){const U=(w+1)%3,A=x[w],P=x[U],L=Fc[_[w]],B=Fc[_[U]],T=`${A}_${P}`,N=`${P}_${A}`;N in g&&g[N]?(Kd.dot(g[N].normal)<=c&&(M.push(L.x,L.y,L.z),M.push(B.x,B.y,B.z)),g[N]=null):T in g||(g[T]={index0:h[w],index1:h[U],normal:Kd.clone()})}}for(const b in g)if(g[b]){const{index0:D,index1:y}=g[b];Bc.fromBufferAttribute(p,D),zc.fromBufferAttribute(p,y),M.push(Bc.x,Bc.y,Bc.z),M.push(zc.x,zc.y,zc.z)}this.setAttribute("position",new Yt(M,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Hs extends cp{constructor(e=1,i=0){const r=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],l=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(r,l,e,i),this.type="OctahedronGeometry",this.parameters={radius:e,detail:i}}static fromJSON(e){return new Hs(e.radius,e.detail)}}class lu extends nn{constructor(e=1,i=1,r=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:i,widthSegments:r,heightSegments:l};const c=e/2,d=i/2,p=Math.floor(r),m=Math.floor(l),h=p+1,_=m+1,x=e/p,g=i/m,M=[],b=[],D=[],y=[];for(let S=0;S<_;S++){const w=S*g-d;for(let U=0;U<h;U++){const A=U*x-c;b.push(A,-w,0),D.push(0,0,1),y.push(U/p),y.push(1-S/m)}}for(let S=0;S<m;S++)for(let w=0;w<p;w++){const U=w+h*S,A=w+h*(S+1),P=w+1+h*(S+1),L=w+1+h*S;M.push(U,A,L),M.push(A,P,L)}this.setIndex(M),this.setAttribute("position",new Yt(b,3)),this.setAttribute("normal",new Yt(D,3)),this.setAttribute("uv",new Yt(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new lu(e.width,e.height,e.widthSegments,e.heightSegments)}}class au extends nn{constructor(e=1,i=.4,r=12,l=48,c=Math.PI*2,d=0,p=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:i,radialSegments:r,tubularSegments:l,arc:c,thetaStart:d,thetaLength:p},r=Math.floor(r),l=Math.floor(l);const m=[],h=[],_=[],x=[],g=new Q,M=new Q,b=new Q;for(let D=0;D<=r;D++){const y=d+D/r*p;for(let S=0;S<=l;S++){const w=S/l*c;M.x=(e+i*Math.cos(y))*Math.cos(w),M.y=(e+i*Math.cos(y))*Math.sin(w),M.z=i*Math.sin(y),h.push(M.x,M.y,M.z),g.x=e*Math.cos(w),g.y=e*Math.sin(w),b.subVectors(M,g).normalize(),_.push(b.x,b.y,b.z),x.push(S/l),x.push(D/r)}}for(let D=1;D<=r;D++)for(let y=1;y<=l;y++){const S=(l+1)*D+y-1,w=(l+1)*(D-1)+y-1,U=(l+1)*(D-1)+y,A=(l+1)*D+y;m.push(S,w,A),m.push(w,U,A)}this.setIndex(m),this.setAttribute("position",new Yt(h,3)),this.setAttribute("normal",new Yt(_,3)),this.setAttribute("uv",new Yt(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new au(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}function Xs(s){const e={};for(const i in s){e[i]={};for(const r in s[i]){const l=s[i][r];if(B_(l))l.isRenderTargetTexture?(nt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[i][r]=null):e[i][r]=l.clone();else if(Array.isArray(l))if(B_(l[0])){const c=[];for(let d=0,p=l.length;d<p;d++)c[d]=l[d].clone();e[i][r]=c}else e[i][r]=l.slice();else e[i][r]=l}}return e}function kn(s){const e={};for(let i=0;i<s.length;i++){const r=Xs(s[i]);for(const l in r)e[l]=r[l]}return e}function B_(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function jy(s){const e=[];for(let i=0;i<s.length;i++)e.push(s[i].clone());return e}function Wv(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:yt.workingColorSpace}const $y={clone:Xs,merge:kn};var eE=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,tE=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ji extends Ys{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=eE,this.fragmentShader=tE,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Xs(e.uniforms),this.uniformsGroups=jy(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const i=super.toJSON(e);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const d=this.uniforms[l].value;d&&d.isTexture?i.uniforms[l]={type:"t",value:d.toJSON(e).uuid}:d&&d.isColor?i.uniforms[l]={type:"c",value:d.getHex()}:d&&d.isVector2?i.uniforms[l]={type:"v2",value:d.toArray()}:d&&d.isVector3?i.uniforms[l]={type:"v3",value:d.toArray()}:d&&d.isVector4?i.uniforms[l]={type:"v4",value:d.toArray()}:d&&d.isMatrix3?i.uniforms[l]={type:"m3",value:d.toArray()}:d&&d.isMatrix4?i.uniforms[l]={type:"m4",value:d.toArray()}:i.uniforms[l]={value:d}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const r={};for(const l in this.extensions)this.extensions[l]===!0&&(r[l]=!0);return Object.keys(r).length>0&&(i.extensions=r),i}fromJSON(e,i){if(super.fromJSON(e,i),e.uniforms!==void 0)for(const r in e.uniforms){const l=e.uniforms[r];switch(this.uniforms[r]={},l.type){case"t":this.uniforms[r].value=i[l.value]||null;break;case"c":this.uniforms[r].value=new Et().setHex(l.value);break;case"v2":this.uniforms[r].value=new bt().fromArray(l.value);break;case"v3":this.uniforms[r].value=new Q().fromArray(l.value);break;case"v4":this.uniforms[r].value=new un().fromArray(l.value);break;case"m3":this.uniforms[r].value=new st().fromArray(l.value);break;case"m4":this.uniforms[r].value=new fn().fromArray(l.value);break;default:this.uniforms[r].value=l.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const r in e.extensions)this.extensions[r]=e.extensions[r];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class nE extends Ji{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class iE extends Ys{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=jM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class aE extends Ys{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Hc=new Q,Gc=new qs,Vi=new Q;class qv extends Wn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new fn,this.projectionMatrix=new fn,this.projectionMatrixInverse=new fn,this.coordinateSystem=qi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,i){return super.copy(e,i),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Hc,Gc,Vi),Vi.x===1&&Vi.y===1&&Vi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Hc,Gc,Vi.set(1,1,1)).invert()}updateWorldMatrix(e,i,r=!1){super.updateWorldMatrix(e,i,r),this.matrixWorld.decompose(Hc,Gc,Vi),Vi.x===1&&Vi.y===1&&Vi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Hc,Gc,Vi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const rr=new Q,z_=new bt,F_=new bt;class bi extends qv{constructor(e=50,i=1,r=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const i=.5*this.getFilmHeight()/e;this.fov=tl*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(zs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return tl*2*Math.atan(Math.tan(zs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,i,r){rr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(rr.x,rr.y).multiplyScalar(-e/rr.z),rr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(rr.x,rr.y).multiplyScalar(-e/rr.z)}getViewSize(e,i){return this.getViewBounds(e,z_,F_),i.subVectors(F_,z_)}setViewOffset(e,i,r,l,c,d){this.aspect=e/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=r,this.view.offsetY=l,this.view.width=c,this.view.height=d,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let i=e*Math.tan(zs*.5*this.fov)/this.zoom,r=2*i,l=this.aspect*r,c=-.5*l;const d=this.view;if(this.view!==null&&this.view.enabled){const m=d.fullWidth,h=d.fullHeight;c+=d.offsetX*l/m,i-=d.offsetY*r/h,l*=d.width/m,r*=d.height/h}const p=this.filmOffset;p!==0&&(c+=e*p/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,i,i-r,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}class Yv extends qv{constructor(e=-1,i=1,r=1,l=-1,c=.1,d=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=i,this.top=r,this.bottom=l,this.near=c,this.far=d,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,i,r,l,c,d){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=r,this.view.offsetY=l,this.view.width=c,this.view.height=d,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=r-e,d=r+e,p=l+i,m=l-i;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,_=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=h*this.view.offsetX,d=c+h*this.view.width,p-=_*this.view.offsetY,m=p-_*this.view.height}this.projectionMatrix.makeOrthographic(c,d,p,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}const Ns=-90,Ls=1;class rE extends Wn{constructor(e,i,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new bi(Ns,Ls,e,i);l.layers=this.layers,this.add(l);const c=new bi(Ns,Ls,e,i);c.layers=this.layers,this.add(c);const d=new bi(Ns,Ls,e,i);d.layers=this.layers,this.add(d);const p=new bi(Ns,Ls,e,i);p.layers=this.layers,this.add(p);const m=new bi(Ns,Ls,e,i);m.layers=this.layers,this.add(m);const h=new bi(Ns,Ls,e,i);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const e=this.coordinateSystem,i=this.children.concat(),[r,l,c,d,p,m]=i;for(const h of i)this.remove(h);if(e===qi)r.up.set(0,1,0),r.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),d.up.set(0,0,1),d.lookAt(0,-1,0),p.up.set(0,1,0),p.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(e===eu)r.up.set(0,-1,0),r.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),d.up.set(0,0,-1),d.lookAt(0,-1,0),p.up.set(0,-1,0),p.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const h of i)this.add(h),h.updateMatrixWorld()}update(e,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:l}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[c,d,p,m,h,_]=this.children,x=e.getRenderTarget(),g=e.getActiveCubeFace(),M=e.getActiveMipmapLevel(),b=e.xr.enabled;e.xr.enabled=!1;const D=r.texture.generateMipmaps;r.texture.generateMipmaps=!1;let y=!1;e.isWebGLRenderer===!0?y=e.state.buffers.depth.getReversed():y=e.reversedDepthBuffer,e.setRenderTarget(r,0,l),y&&e.autoClear===!1&&e.clearDepth(),e.render(i,c),e.setRenderTarget(r,1,l),y&&e.autoClear===!1&&e.clearDepth(),e.render(i,d),e.setRenderTarget(r,2,l),y&&e.autoClear===!1&&e.clearDepth(),e.render(i,p),e.setRenderTarget(r,3,l),y&&e.autoClear===!1&&e.clearDepth(),e.render(i,m),e.setRenderTarget(r,4,l),y&&e.autoClear===!1&&e.clearDepth(),e.render(i,h),r.texture.generateMipmaps=D,e.setRenderTarget(r,5,l),y&&e.autoClear===!1&&e.clearDepth(),e.render(i,_),e.setRenderTarget(x,g,M),e.xr.enabled=b,r.texture.needsPMREMUpdate=!0}}class sE extends bi{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const mp=class mp{constructor(e,i,r,l){this.elements=[1,0,0,1],e!==void 0&&this.set(e,i,r,l)}identity(){return this.set(1,0,0,1),this}fromArray(e,i=0){for(let r=0;r<4;r++)this.elements[r]=e[r+i];return this}set(e,i,r,l){const c=this.elements;return c[0]=e,c[2]=i,c[1]=r,c[3]=l,this}};mp.prototype.isMatrix2=!0;let H_=mp;function G_(s,e,i,r){const l=oE(r);switch(i){case Uv:return s*e;case Lv:return s*e/l.components*l.byteLength;case ep:return s*e/l.components*l.byteLength;case Hr:return s*e*2/l.components*l.byteLength;case tp:return s*e*2/l.components*l.byteLength;case Nv:return s*e*3/l.components*l.byteLength;case Pi:return s*e*4/l.components*l.byteLength;case np:return s*e*4/l.components*l.byteLength;case Wc:case qc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Yc:case Zc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case mh:case _h:return Math.max(s,16)*Math.max(e,8)/4;case ph:case gh:return Math.max(s,8)*Math.max(e,8)/2;case vh:case xh:case Mh:case yh:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Sh:case Qc:case Eh:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case bh:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Th:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Ah:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Rh:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case Ch:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case wh:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Dh:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Uh:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Nh:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Lh:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Oh:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Ph:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Ih:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Bh:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case zh:case Fh:case Hh:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Gh:case Vh:return Math.ceil(s/4)*Math.ceil(e/4)*8;case Jc:case kh:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function oE(s){switch(s){case Ti:case Rv:return{byteLength:1,components:1};case $o:case Cv:case Ta:return{byteLength:2,components:1};case jh:case $h:return{byteLength:2,components:4};case Qi:case Jh:case Wi:return{byteLength:4,components:1};case wv:case Dv:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Qh}}));typeof window<"u"&&(window.__THREE__?nt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Qh);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Zv(){let s=null,e=!1,i=null,r=null;function l(c,d){i(c,d),r=s.requestAnimationFrame(l)}return{start:function(){e!==!0&&i!==null&&s!==null&&(r=s.requestAnimationFrame(l),e=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(c){i=c},setContext:function(c){s=c}}}function lE(s){const e=new WeakMap;function i(p,m){const h=p.array,_=p.usage,x=h.byteLength,g=s.createBuffer();s.bindBuffer(m,g),s.bufferData(m,h,_),p.onUploadCallback();let M;if(h instanceof Float32Array)M=s.FLOAT;else if(typeof Float16Array<"u"&&h instanceof Float16Array)M=s.HALF_FLOAT;else if(h instanceof Uint16Array)p.isFloat16BufferAttribute?M=s.HALF_FLOAT:M=s.UNSIGNED_SHORT;else if(h instanceof Int16Array)M=s.SHORT;else if(h instanceof Uint32Array)M=s.UNSIGNED_INT;else if(h instanceof Int32Array)M=s.INT;else if(h instanceof Int8Array)M=s.BYTE;else if(h instanceof Uint8Array)M=s.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)M=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:g,type:M,bytesPerElement:h.BYTES_PER_ELEMENT,version:p.version,size:x}}function r(p,m,h){const _=m.array,x=m.updateRanges;if(s.bindBuffer(h,p),x.length===0)s.bufferSubData(h,0,_);else{x.sort((M,b)=>M.start-b.start);let g=0;for(let M=1;M<x.length;M++){const b=x[g],D=x[M];D.start<=b.start+b.count+1?b.count=Math.max(b.count,D.start+D.count-b.start):(++g,x[g]=D)}x.length=g+1;for(let M=0,b=x.length;M<b;M++){const D=x[M];s.bufferSubData(h,D.start*_.BYTES_PER_ELEMENT,_,D.start,D.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(p){return p.isInterleavedBufferAttribute&&(p=p.data),e.get(p)}function c(p){p.isInterleavedBufferAttribute&&(p=p.data);const m=e.get(p);m&&(s.deleteBuffer(m.buffer),e.delete(p))}function d(p,m){if(p.isInterleavedBufferAttribute&&(p=p.data),p.isGLBufferAttribute){const _=e.get(p);(!_||_.version<p.version)&&e.set(p,{buffer:p.buffer,type:p.type,bytesPerElement:p.elementSize,version:p.version});return}const h=e.get(p);if(h===void 0)e.set(p,i(p,m));else if(h.version<p.version){if(h.size!==p.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(h.buffer,p,m),h.version=p.version}}return{get:l,remove:c,update:d}}var cE=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,uE=`#ifdef USE_ALPHAHASH
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
#endif`,fE=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,dE=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hE=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,pE=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,mE=`#ifdef USE_AOMAP
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
#endif`,gE=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,_E=`#ifdef USE_BATCHING
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
#endif`,vE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,xE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,SE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ME=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,yE=`#ifdef USE_IRIDESCENCE
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
#endif`,EE=`#ifdef USE_BUMPMAP
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
#endif`,bE=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,TE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,AE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,RE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,CE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,wE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,DE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,UE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,NE=`#define PI 3.141592653589793
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
} // validated`,LE=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,OE=`vec3 transformedNormal = objectNormal;
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
#endif`,PE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,IE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,BE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,zE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,FE="gl_FragColor = linearToOutputTexel( gl_FragColor );",HE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,GE=`#ifdef USE_ENVMAP
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
#endif`,VE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,kE=`#ifdef USE_ENVMAP
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
#endif`,XE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,WE=`#ifdef USE_ENVMAP
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
#endif`,qE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,YE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ZE=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,KE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,QE=`#ifdef USE_GRADIENTMAP
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
}`,JE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,jE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,$E=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,eb=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,tb=`#ifdef USE_ENVMAP
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
#endif`,nb=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ib=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ab=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,rb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,sb=`PhysicalMaterial material;
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
#endif`,ob=`uniform sampler2D dfgLUT;
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
}`,lb=`
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
#endif`,cb=`#if defined( RE_IndirectDiffuse )
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
#endif`,ub=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,fb=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,db=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,hb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,pb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,mb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,gb=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,_b=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,vb=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,xb=`#if defined( USE_POINTS_UV )
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
#endif`,Sb=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Mb=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,yb=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Eb=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,bb=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Tb=`#ifdef USE_MORPHTARGETS
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
#endif`,Ab=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Rb=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Cb=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,wb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Db=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ub=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Nb=`#ifdef USE_NORMALMAP
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
#endif`,Lb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ob=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Pb=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ib=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Bb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,zb=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Fb=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Hb=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Gb=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Vb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,kb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Xb=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Wb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,qb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Yb=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Zb=`float getShadowMask() {
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
}`,Kb=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Qb=`#ifdef USE_SKINNING
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
#endif`,Jb=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,jb=`#ifdef USE_SKINNING
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
#endif`,$b=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,e1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,t1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,n1=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,i1=`#ifdef USE_TRANSMISSION
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
#endif`,a1=`#ifdef USE_TRANSMISSION
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
#endif`,r1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,s1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,o1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,l1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const c1=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,u1=`uniform sampler2D t2D;
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
}`,f1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,d1=`#ifdef ENVMAP_TYPE_CUBE
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
}`,h1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,p1=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,m1=`#include <common>
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
}`,g1=`#if DEPTH_PACKING == 3200
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
}`,_1=`#define DISTANCE
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
}`,v1=`#define DISTANCE
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
}`,x1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,S1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,M1=`uniform float scale;
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
}`,y1=`uniform vec3 diffuse;
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
}`,E1=`#include <common>
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
}`,b1=`uniform vec3 diffuse;
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
}`,T1=`#define LAMBERT
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
}`,A1=`#define LAMBERT
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
}`,R1=`#define MATCAP
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
}`,C1=`#define MATCAP
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
}`,w1=`#define NORMAL
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
}`,D1=`#define NORMAL
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
}`,U1=`#define PHONG
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
}`,N1=`#define PHONG
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
}`,L1=`#define STANDARD
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
}`,O1=`#define STANDARD
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
}`,P1=`#define TOON
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
}`,I1=`#define TOON
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
}`,B1=`uniform float size;
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
}`,z1=`uniform vec3 diffuse;
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
}`,F1=`#include <common>
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
}`,H1=`uniform vec3 color;
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
}`,G1=`uniform float rotation;
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
}`,V1=`uniform vec3 diffuse;
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
}`,ut={alphahash_fragment:cE,alphahash_pars_fragment:uE,alphamap_fragment:fE,alphamap_pars_fragment:dE,alphatest_fragment:hE,alphatest_pars_fragment:pE,aomap_fragment:mE,aomap_pars_fragment:gE,batching_pars_vertex:_E,batching_vertex:vE,begin_vertex:xE,beginnormal_vertex:SE,bsdfs:ME,iridescence_fragment:yE,bumpmap_pars_fragment:EE,clipping_planes_fragment:bE,clipping_planes_pars_fragment:TE,clipping_planes_pars_vertex:AE,clipping_planes_vertex:RE,color_fragment:CE,color_pars_fragment:wE,color_pars_vertex:DE,color_vertex:UE,common:NE,cube_uv_reflection_fragment:LE,defaultnormal_vertex:OE,displacementmap_pars_vertex:PE,displacementmap_vertex:IE,emissivemap_fragment:BE,emissivemap_pars_fragment:zE,colorspace_fragment:FE,colorspace_pars_fragment:HE,envmap_fragment:GE,envmap_common_pars_fragment:VE,envmap_pars_fragment:kE,envmap_pars_vertex:XE,envmap_physical_pars_fragment:tb,envmap_vertex:WE,fog_vertex:qE,fog_pars_vertex:YE,fog_fragment:ZE,fog_pars_fragment:KE,gradientmap_pars_fragment:QE,lightmap_pars_fragment:JE,lights_lambert_fragment:jE,lights_lambert_pars_fragment:$E,lights_pars_begin:eb,lights_toon_fragment:nb,lights_toon_pars_fragment:ib,lights_phong_fragment:ab,lights_phong_pars_fragment:rb,lights_physical_fragment:sb,lights_physical_pars_fragment:ob,lights_fragment_begin:lb,lights_fragment_maps:cb,lights_fragment_end:ub,lightprobes_pars_fragment:fb,logdepthbuf_fragment:db,logdepthbuf_pars_fragment:hb,logdepthbuf_pars_vertex:pb,logdepthbuf_vertex:mb,map_fragment:gb,map_pars_fragment:_b,map_particle_fragment:vb,map_particle_pars_fragment:xb,metalnessmap_fragment:Sb,metalnessmap_pars_fragment:Mb,morphinstance_vertex:yb,morphcolor_vertex:Eb,morphnormal_vertex:bb,morphtarget_pars_vertex:Tb,morphtarget_vertex:Ab,normal_fragment_begin:Rb,normal_fragment_maps:Cb,normal_pars_fragment:wb,normal_pars_vertex:Db,normal_vertex:Ub,normalmap_pars_fragment:Nb,clearcoat_normal_fragment_begin:Lb,clearcoat_normal_fragment_maps:Ob,clearcoat_pars_fragment:Pb,iridescence_pars_fragment:Ib,opaque_fragment:Bb,packing:zb,premultiplied_alpha_fragment:Fb,project_vertex:Hb,dithering_fragment:Gb,dithering_pars_fragment:Vb,roughnessmap_fragment:kb,roughnessmap_pars_fragment:Xb,shadowmap_pars_fragment:Wb,shadowmap_pars_vertex:qb,shadowmap_vertex:Yb,shadowmask_pars_fragment:Zb,skinbase_vertex:Kb,skinning_pars_vertex:Qb,skinning_vertex:Jb,skinnormal_vertex:jb,specularmap_fragment:$b,specularmap_pars_fragment:e1,tonemapping_fragment:t1,tonemapping_pars_fragment:n1,transmission_fragment:i1,transmission_pars_fragment:a1,uv_pars_fragment:r1,uv_pars_vertex:s1,uv_vertex:o1,worldpos_vertex:l1,background_vert:c1,background_frag:u1,backgroundCube_vert:f1,backgroundCube_frag:d1,cube_vert:h1,cube_frag:p1,depth_vert:m1,depth_frag:g1,distance_vert:_1,distance_frag:v1,equirect_vert:x1,equirect_frag:S1,linedashed_vert:M1,linedashed_frag:y1,meshbasic_vert:E1,meshbasic_frag:b1,meshlambert_vert:T1,meshlambert_frag:A1,meshmatcap_vert:R1,meshmatcap_frag:C1,meshnormal_vert:w1,meshnormal_frag:D1,meshphong_vert:U1,meshphong_frag:N1,meshphysical_vert:L1,meshphysical_frag:O1,meshtoon_vert:P1,meshtoon_frag:I1,points_vert:B1,points_frag:z1,shadow_vert:F1,shadow_frag:H1,sprite_vert:G1,sprite_frag:V1},Pe={common:{diffuse:{value:new Et(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new st}},envmap:{envMap:{value:null},envMapRotation:{value:new st},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new st}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new st}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new st},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new st},normalScale:{value:new bt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new st},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new st}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new st}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new st}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Et(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new Q},probesMax:{value:new Q},probesResolution:{value:new Q}},points:{diffuse:{value:new Et(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0},uvTransform:{value:new st}},sprite:{diffuse:{value:new Et(16777215)},opacity:{value:1},center:{value:new bt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}}},Xi={basic:{uniforms:kn([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.fog]),vertexShader:ut.meshbasic_vert,fragmentShader:ut.meshbasic_frag},lambert:{uniforms:kn([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new Et(0)},envMapIntensity:{value:1}}]),vertexShader:ut.meshlambert_vert,fragmentShader:ut.meshlambert_frag},phong:{uniforms:kn([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new Et(0)},specular:{value:new Et(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ut.meshphong_vert,fragmentShader:ut.meshphong_frag},standard:{uniforms:kn([Pe.common,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.roughnessmap,Pe.metalnessmap,Pe.fog,Pe.lights,{emissive:{value:new Et(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ut.meshphysical_vert,fragmentShader:ut.meshphysical_frag},toon:{uniforms:kn([Pe.common,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.gradientmap,Pe.fog,Pe.lights,{emissive:{value:new Et(0)}}]),vertexShader:ut.meshtoon_vert,fragmentShader:ut.meshtoon_frag},matcap:{uniforms:kn([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,{matcap:{value:null}}]),vertexShader:ut.meshmatcap_vert,fragmentShader:ut.meshmatcap_frag},points:{uniforms:kn([Pe.points,Pe.fog]),vertexShader:ut.points_vert,fragmentShader:ut.points_frag},dashed:{uniforms:kn([Pe.common,Pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ut.linedashed_vert,fragmentShader:ut.linedashed_frag},depth:{uniforms:kn([Pe.common,Pe.displacementmap]),vertexShader:ut.depth_vert,fragmentShader:ut.depth_frag},normal:{uniforms:kn([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,{opacity:{value:1}}]),vertexShader:ut.meshnormal_vert,fragmentShader:ut.meshnormal_frag},sprite:{uniforms:kn([Pe.sprite,Pe.fog]),vertexShader:ut.sprite_vert,fragmentShader:ut.sprite_frag},background:{uniforms:{uvTransform:{value:new st},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ut.background_vert,fragmentShader:ut.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new st}},vertexShader:ut.backgroundCube_vert,fragmentShader:ut.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ut.cube_vert,fragmentShader:ut.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ut.equirect_vert,fragmentShader:ut.equirect_frag},distance:{uniforms:kn([Pe.common,Pe.displacementmap,{referencePosition:{value:new Q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ut.distance_vert,fragmentShader:ut.distance_frag},shadow:{uniforms:kn([Pe.lights,Pe.fog,{color:{value:new Et(0)},opacity:{value:1}}]),vertexShader:ut.shadow_vert,fragmentShader:ut.shadow_frag}};Xi.physical={uniforms:kn([Xi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new st},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new st},clearcoatNormalScale:{value:new bt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new st},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new st},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new st},sheen:{value:0},sheenColor:{value:new Et(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new st},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new st},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new st},transmissionSamplerSize:{value:new bt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new st},attenuationDistance:{value:0},attenuationColor:{value:new Et(0)},specularColor:{value:new Et(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new st},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new st},anisotropyVector:{value:new bt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new st}}]),vertexShader:ut.meshphysical_vert,fragmentShader:ut.meshphysical_frag};const Vc={r:0,b:0,g:0},k1=new fn,Kv=new st;Kv.set(-1,0,0,0,1,0,0,0,1);function X1(s,e,i,r,l,c){const d=new Et(0);let p=l===!0?0:1,m,h,_=null,x=0,g=null;function M(w){let U=w.isScene===!0?w.background:null;if(U&&U.isTexture){const A=w.backgroundBlurriness>0;U=e.get(U,A)}return U}function b(w){let U=!1;const A=M(w);A===null?y(d,p):A&&A.isColor&&(y(A,1),U=!0);const P=s.xr.getEnvironmentBlendMode();P==="additive"?i.buffers.color.setClear(0,0,0,1,c):P==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,c),(s.autoClear||U)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function D(w,U){const A=M(U);A&&(A.isCubeTexture||A.mapping===su)?(h===void 0&&(h=new qt(new Zs(1,1,1),new Ji({name:"BackgroundCubeMaterial",uniforms:Xs(Xi.backgroundCube.uniforms),vertexShader:Xi.backgroundCube.vertexShader,fragmentShader:Xi.backgroundCube.fragmentShader,side:$n,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(P,L,B){this.matrixWorld.copyPosition(B.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),h.material.uniforms.envMap.value=A,h.material.uniforms.backgroundBlurriness.value=U.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=U.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(k1.makeRotationFromEuler(U.backgroundRotation)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&h.material.uniforms.backgroundRotation.value.premultiply(Kv),h.material.toneMapped=yt.getTransfer(A.colorSpace)!==zt,(_!==A||x!==A.version||g!==s.toneMapping)&&(h.material.needsUpdate=!0,_=A,x=A.version,g=s.toneMapping),h.layers.enableAll(),w.unshift(h,h.geometry,h.material,0,0,null)):A&&A.isTexture&&(m===void 0&&(m=new qt(new lu(2,2),new Ji({name:"BackgroundMaterial",uniforms:Xs(Xi.background.uniforms),vertexShader:Xi.background.vertexShader,fragmentShader:Xi.background.fragmentShader,side:lr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(m)),m.material.uniforms.t2D.value=A,m.material.uniforms.backgroundIntensity.value=U.backgroundIntensity,m.material.toneMapped=yt.getTransfer(A.colorSpace)!==zt,A.matrixAutoUpdate===!0&&A.updateMatrix(),m.material.uniforms.uvTransform.value.copy(A.matrix),(_!==A||x!==A.version||g!==s.toneMapping)&&(m.material.needsUpdate=!0,_=A,x=A.version,g=s.toneMapping),m.layers.enableAll(),w.unshift(m,m.geometry,m.material,0,0,null))}function y(w,U){w.getRGB(Vc,Wv(s)),i.buffers.color.setClear(Vc.r,Vc.g,Vc.b,U,c)}function S(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return d},setClearColor:function(w,U=1){d.set(w),p=U,y(d,p)},getClearAlpha:function(){return p},setClearAlpha:function(w){p=w,y(d,p)},render:b,addToRenderList:D,dispose:S}}function W1(s,e){const i=s.getParameter(s.MAX_VERTEX_ATTRIBS),r={},l=g(null);let c=l,d=!1;function p(G,Z,ce,le,Y){let z=!1;const F=x(G,le,ce,Z);c!==F&&(c=F,h(c.object)),z=M(G,le,ce,Y),z&&b(G,le,ce,Y),Y!==null&&e.update(Y,s.ELEMENT_ARRAY_BUFFER),(z||d)&&(d=!1,A(G,Z,ce,le),Y!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(Y).buffer))}function m(){return s.createVertexArray()}function h(G){return s.bindVertexArray(G)}function _(G){return s.deleteVertexArray(G)}function x(G,Z,ce,le){const Y=le.wireframe===!0;let z=r[Z.id];z===void 0&&(z={},r[Z.id]=z);const F=G.isInstancedMesh===!0?G.id:0;let te=z[F];te===void 0&&(te={},z[F]=te);let ge=te[ce.id];ge===void 0&&(ge={},te[ce.id]=ge);let Ee=ge[Y];return Ee===void 0&&(Ee=g(m()),ge[Y]=Ee),Ee}function g(G){const Z=[],ce=[],le=[];for(let Y=0;Y<i;Y++)Z[Y]=0,ce[Y]=0,le[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:Z,enabledAttributes:ce,attributeDivisors:le,object:G,attributes:{},index:null}}function M(G,Z,ce,le){const Y=c.attributes,z=Z.attributes;let F=0;const te=ce.getAttributes();for(const ge in te)if(te[ge].location>=0){const I=Y[ge];let J=z[ge];if(J===void 0&&(ge==="instanceMatrix"&&G.instanceMatrix&&(J=G.instanceMatrix),ge==="instanceColor"&&G.instanceColor&&(J=G.instanceColor)),I===void 0||I.attribute!==J||J&&I.data!==J.data)return!0;F++}return c.attributesNum!==F||c.index!==le}function b(G,Z,ce,le){const Y={},z=Z.attributes;let F=0;const te=ce.getAttributes();for(const ge in te)if(te[ge].location>=0){let I=z[ge];I===void 0&&(ge==="instanceMatrix"&&G.instanceMatrix&&(I=G.instanceMatrix),ge==="instanceColor"&&G.instanceColor&&(I=G.instanceColor));const J={};J.attribute=I,I&&I.data&&(J.data=I.data),Y[ge]=J,F++}c.attributes=Y,c.attributesNum=F,c.index=le}function D(){const G=c.newAttributes;for(let Z=0,ce=G.length;Z<ce;Z++)G[Z]=0}function y(G){S(G,0)}function S(G,Z){const ce=c.newAttributes,le=c.enabledAttributes,Y=c.attributeDivisors;ce[G]=1,le[G]===0&&(s.enableVertexAttribArray(G),le[G]=1),Y[G]!==Z&&(s.vertexAttribDivisor(G,Z),Y[G]=Z)}function w(){const G=c.newAttributes,Z=c.enabledAttributes;for(let ce=0,le=Z.length;ce<le;ce++)Z[ce]!==G[ce]&&(s.disableVertexAttribArray(ce),Z[ce]=0)}function U(G,Z,ce,le,Y,z,F){F===!0?s.vertexAttribIPointer(G,Z,ce,Y,z):s.vertexAttribPointer(G,Z,ce,le,Y,z)}function A(G,Z,ce,le){D();const Y=le.attributes,z=ce.getAttributes(),F=Z.defaultAttributeValues;for(const te in z){const ge=z[te];if(ge.location>=0){let Ee=Y[te];if(Ee===void 0&&(te==="instanceMatrix"&&G.instanceMatrix&&(Ee=G.instanceMatrix),te==="instanceColor"&&G.instanceColor&&(Ee=G.instanceColor)),Ee!==void 0){const I=Ee.normalized,J=Ee.itemSize,ye=e.get(Ee);if(ye===void 0)continue;const Re=ye.buffer,Ie=ye.type,ae=ye.bytesPerElement,xe=Ie===s.INT||Ie===s.UNSIGNED_INT||Ee.gpuType===Jh;if(Ee.isInterleavedBufferAttribute){const Me=Ee.data,He=Me.stride,it=Ee.offset;if(Me.isInstancedInterleavedBuffer){for(let Je=0;Je<ge.locationSize;Je++)S(ge.location+Je,Me.meshPerAttribute);G.isInstancedMesh!==!0&&le._maxInstanceCount===void 0&&(le._maxInstanceCount=Me.meshPerAttribute*Me.count)}else for(let Je=0;Je<ge.locationSize;Je++)y(ge.location+Je);s.bindBuffer(s.ARRAY_BUFFER,Re);for(let Je=0;Je<ge.locationSize;Je++)U(ge.location+Je,J/ge.locationSize,Ie,I,He*ae,(it+J/ge.locationSize*Je)*ae,xe)}else{if(Ee.isInstancedBufferAttribute){for(let Me=0;Me<ge.locationSize;Me++)S(ge.location+Me,Ee.meshPerAttribute);G.isInstancedMesh!==!0&&le._maxInstanceCount===void 0&&(le._maxInstanceCount=Ee.meshPerAttribute*Ee.count)}else for(let Me=0;Me<ge.locationSize;Me++)y(ge.location+Me);s.bindBuffer(s.ARRAY_BUFFER,Re);for(let Me=0;Me<ge.locationSize;Me++)U(ge.location+Me,J/ge.locationSize,Ie,I,J*ae,J/ge.locationSize*Me*ae,xe)}}else if(F!==void 0){const I=F[te];if(I!==void 0)switch(I.length){case 2:s.vertexAttrib2fv(ge.location,I);break;case 3:s.vertexAttrib3fv(ge.location,I);break;case 4:s.vertexAttrib4fv(ge.location,I);break;default:s.vertexAttrib1fv(ge.location,I)}}}}w()}function P(){N();for(const G in r){const Z=r[G];for(const ce in Z){const le=Z[ce];for(const Y in le){const z=le[Y];for(const F in z)_(z[F].object),delete z[F];delete le[Y]}}delete r[G]}}function L(G){if(r[G.id]===void 0)return;const Z=r[G.id];for(const ce in Z){const le=Z[ce];for(const Y in le){const z=le[Y];for(const F in z)_(z[F].object),delete z[F];delete le[Y]}}delete r[G.id]}function B(G){for(const Z in r){const ce=r[Z];for(const le in ce){const Y=ce[le];if(Y[G.id]===void 0)continue;const z=Y[G.id];for(const F in z)_(z[F].object),delete z[F];delete Y[G.id]}}}function T(G){for(const Z in r){const ce=r[Z],le=G.isInstancedMesh===!0?G.id:0,Y=ce[le];if(Y!==void 0){for(const z in Y){const F=Y[z];for(const te in F)_(F[te].object),delete F[te];delete Y[z]}delete ce[le],Object.keys(ce).length===0&&delete r[Z]}}}function N(){k(),d=!0,c!==l&&(c=l,h(c.object))}function k(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:p,reset:N,resetDefaultState:k,dispose:P,releaseStatesOfGeometry:L,releaseStatesOfObject:T,releaseStatesOfProgram:B,initAttributes:D,enableAttribute:y,disableUnusedAttributes:w}}function q1(s,e,i){let r;function l(m){r=m}function c(m,h){s.drawArrays(r,m,h),i.update(h,r,1)}function d(m,h,_){_!==0&&(s.drawArraysInstanced(r,m,h,_),i.update(h,r,_))}function p(m,h,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,m,0,h,0,_);let g=0;for(let M=0;M<_;M++)g+=h[M];i.update(g,r,1)}this.setMode=l,this.render=c,this.renderInstances=d,this.renderMultiDraw=p}function Y1(s,e,i,r){let l;function c(){if(l!==void 0)return l;if(e.has("EXT_texture_filter_anisotropic")===!0){const B=e.get("EXT_texture_filter_anisotropic");l=s.getParameter(B.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function d(B){return!(B!==Pi&&r.convert(B)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function p(B){const T=B===Ta&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(B!==Ti&&r.convert(B)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&B!==Wi&&!T)}function m(B){if(B==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";B="mediump"}return B==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=i.precision!==void 0?i.precision:"highp";const _=m(h);_!==h&&(nt("WebGLRenderer:",h,"not supported, using",_,"instead."),h=_);const x=i.logarithmicDepthBuffer===!0,g=i.reversedDepthBuffer===!0&&e.has("EXT_clip_control");i.reversedDepthBuffer===!0&&g===!1&&nt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const M=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),b=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),D=s.getParameter(s.MAX_TEXTURE_SIZE),y=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),S=s.getParameter(s.MAX_VERTEX_ATTRIBS),w=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),U=s.getParameter(s.MAX_VARYING_VECTORS),A=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),P=s.getParameter(s.MAX_SAMPLES),L=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:d,textureTypeReadable:p,precision:h,logarithmicDepthBuffer:x,reversedDepthBuffer:g,maxTextures:M,maxVertexTextures:b,maxTextureSize:D,maxCubemapSize:y,maxAttributes:S,maxVertexUniforms:w,maxVaryings:U,maxFragmentUniforms:A,maxSamples:P,samples:L}}function Z1(s){const e=this;let i=null,r=0,l=!1,c=!1;const d=new Lr,p=new st,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(x,g){const M=x.length!==0||g||r!==0||l;return l=g,r=x.length,M},this.beginShadows=function(){c=!0,_(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(x,g){i=_(x,g,0)},this.setState=function(x,g,M){const b=x.clippingPlanes,D=x.clipIntersection,y=x.clipShadows,S=s.get(x);if(!l||b===null||b.length===0||c&&!y)c?_(null):h();else{const w=c?0:r,U=w*4;let A=S.clippingState||null;m.value=A,A=_(b,g,U,M);for(let P=0;P!==U;++P)A[P]=i[P];S.clippingState=A,this.numIntersection=D?this.numPlanes:0,this.numPlanes+=w}};function h(){m.value!==i&&(m.value=i,m.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function _(x,g,M,b){const D=x!==null?x.length:0;let y=null;if(D!==0){if(y=m.value,b!==!0||y===null){const S=M+D*4,w=g.matrixWorldInverse;p.getNormalMatrix(w),(y===null||y.length<S)&&(y=new Float32Array(S));for(let U=0,A=M;U!==D;++U,A+=4)d.copy(x[U]).applyMatrix4(w,p),d.normal.toArray(y,A),y[A+3]=d.constant}m.value=y,m.needsUpdate=!0}return e.numPlanes=D,e.numIntersection=0,y}}const or=4,V_=[.125,.215,.35,.446,.526,.582],Pr=20,K1=256,Zo=new Yv,k_=new Et;let Qd=null,Jd=0,jd=0,$d=!1;const Q1=new Q;class X_{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,i=0,r=.1,l=100,c={}){const{size:d=256,position:p=Q1}=c;Qd=this._renderer.getRenderTarget(),Jd=this._renderer.getActiveCubeFace(),jd=this._renderer.getActiveMipmapLevel(),$d=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(d);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(e,r,l,m,p),i>0&&this._blur(m,0,0,i),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(e,i=null){return this._fromTexture(e,i)}fromCubemap(e,i=null){return this._fromTexture(e,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Y_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=q_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Qd,Jd,jd),this._renderer.xr.enabled=$d,e.scissorTest=!1,Os(e,0,0,e.width,e.height)}_fromTexture(e,i){e.mapping===Fr||e.mapping===Vs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Qd=this._renderer.getRenderTarget(),Jd=this._renderer.getActiveCubeFace(),jd=this._renderer.getActiveMipmapLevel(),$d=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=i||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,r={magFilter:Hn,minFilter:Hn,generateMipmaps:!1,type:Ta,format:Pi,colorSpace:jc,depthBuffer:!1},l=W_(e,i,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=W_(e,i,r);const{_lodMax:c}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=J1(c)),this._blurMaterial=$1(c,e,i),this._ggxMaterial=j1(c,e,i)}return l}_compileMaterial(e){const i=new qt(new nn,e);this._renderer.compile(i,Zo)}_sceneToCubeUV(e,i,r,l,c){const m=new bi(90,1,i,r),h=[1,-1,1,1,1,1],_=[1,1,1,-1,-1,-1],x=this._renderer,g=x.autoClear,M=x.toneMapping;x.getClearColor(k_),x.toneMapping=Yi,x.autoClear=!1,x.state.buffers.depth.getReversed()&&(x.setRenderTarget(l),x.clearDepth(),x.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new qt(new Zs,new On({name:"PMREM.Background",side:$n,depthWrite:!1,depthTest:!1})));const D=this._backgroundBox,y=D.material;let S=!1;const w=e.background;w?w.isColor&&(y.color.copy(w),e.background=null,S=!0):(y.color.copy(k_),S=!0);for(let U=0;U<6;U++){const A=U%3;A===0?(m.up.set(0,h[U],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x+_[U],c.y,c.z)):A===1?(m.up.set(0,0,h[U]),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y+_[U],c.z)):(m.up.set(0,h[U],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y,c.z+_[U]));const P=this._cubeSize;Os(l,A*P,U>2?P:0,P,P),x.setRenderTarget(l),S&&x.render(D,m),x.render(e,m)}x.toneMapping=M,x.autoClear=g,e.background=w}_textureToCubeUV(e,i){const r=this._renderer,l=e.mapping===Fr||e.mapping===Vs;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=Y_()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=q_());const c=l?this._cubemapMaterial:this._equirectMaterial,d=this._lodMeshes[0];d.material=c;const p=c.uniforms;p.envMap.value=e;const m=this._cubeSize;Os(i,0,0,3*m,2*m),r.setRenderTarget(i),r.render(d,Zo)}_applyPMREM(e){const i=this._renderer,r=i.autoClear;i.autoClear=!1;const l=this._lodMeshes.length;for(let c=1;c<l;c++)this._applyGGXFilter(e,c-1,c);i.autoClear=r}_applyGGXFilter(e,i,r){const l=this._renderer,c=this._pingPongRenderTarget,d=this._ggxMaterial,p=this._lodMeshes[r];p.material=d;const m=d.uniforms,h=r/(this._lodMeshes.length-1),_=i/(this._lodMeshes.length-1),x=Math.sqrt(h*h-_*_),g=0+h*1.25,M=x*g,{_lodMax:b}=this,D=this._sizeLods[r],y=3*D*(r>b-or?r-b+or:0),S=4*(this._cubeSize-D);m.envMap.value=e.texture,m.roughness.value=M,m.mipInt.value=b-i,Os(c,y,S,3*D,2*D),l.setRenderTarget(c),l.render(p,Zo),m.envMap.value=c.texture,m.roughness.value=0,m.mipInt.value=b-r,Os(e,y,S,3*D,2*D),l.setRenderTarget(e),l.render(p,Zo)}_blur(e,i,r,l,c){const d=this._pingPongRenderTarget;this._halfBlur(e,d,i,r,l,"latitudinal",c),this._halfBlur(d,e,r,r,l,"longitudinal",c)}_halfBlur(e,i,r,l,c,d,p){const m=this._renderer,h=this._blurMaterial;d!=="latitudinal"&&d!=="longitudinal"&&Tt("blur direction must be either latitudinal or longitudinal!");const _=3,x=this._lodMeshes[l];x.material=h;const g=h.uniforms,M=this._sizeLods[r]-1,b=isFinite(c)?Math.PI/(2*M):2*Math.PI/(2*Pr-1),D=c/b,y=isFinite(c)?1+Math.floor(_*D):Pr;y>Pr&&nt(`sigmaRadians, ${c}, is too large and will clip, as it requested ${y} samples when the maximum is set to ${Pr}`);const S=[];let w=0;for(let B=0;B<Pr;++B){const T=B/D,N=Math.exp(-T*T/2);S.push(N),B===0?w+=N:B<y&&(w+=2*N)}for(let B=0;B<S.length;B++)S[B]=S[B]/w;g.envMap.value=e.texture,g.samples.value=y,g.weights.value=S,g.latitudinal.value=d==="latitudinal",p&&(g.poleAxis.value=p);const{_lodMax:U}=this;g.dTheta.value=b,g.mipInt.value=U-r;const A=this._sizeLods[l],P=3*A*(l>U-or?l-U+or:0),L=4*(this._cubeSize-A);Os(i,P,L,3*A,2*A),m.setRenderTarget(i),m.render(x,Zo)}}function J1(s){const e=[],i=[],r=[];let l=s;const c=s-or+1+V_.length;for(let d=0;d<c;d++){const p=Math.pow(2,l);e.push(p);let m=1/p;d>s-or?m=V_[d-s+or-1]:d===0&&(m=0),i.push(m);const h=1/(p-2),_=-h,x=1+h,g=[_,_,x,_,x,x,_,_,x,x,_,x],M=6,b=6,D=3,y=2,S=1,w=new Float32Array(D*b*M),U=new Float32Array(y*b*M),A=new Float32Array(S*b*M);for(let L=0;L<M;L++){const B=L%3*2/3-1,T=L>2?0:-1,N=[B,T,0,B+2/3,T,0,B+2/3,T+1,0,B,T,0,B+2/3,T+1,0,B,T+1,0];w.set(N,D*b*L),U.set(g,y*b*L);const k=[L,L,L,L,L,L];A.set(k,S*b*L)}const P=new nn;P.setAttribute("position",new Ki(w,D)),P.setAttribute("uv",new Ki(U,y)),P.setAttribute("faceIndex",new Ki(A,S)),r.push(new qt(P,null)),l>or&&l--}return{lodMeshes:r,sizeLods:e,sigmas:i}}function W_(s,e,i){const r=new Zi(s,e,i);return r.texture.mapping=su,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function Os(s,e,i,r,l){s.viewport.set(e,i,r,l),s.scissor.set(e,i,r,l)}function j1(s,e,i){return new Ji({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:K1,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:cu(),fragmentShader:`

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
		`,blending:Ea,depthTest:!1,depthWrite:!1})}function $1(s,e,i){const r=new Float32Array(Pr),l=new Q(0,1,0);return new Ji({name:"SphericalGaussianBlur",defines:{n:Pr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:cu(),fragmentShader:`

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
		`,blending:Ea,depthTest:!1,depthWrite:!1})}function q_(){return new Ji({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:cu(),fragmentShader:`

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
		`,blending:Ea,depthTest:!1,depthWrite:!1})}function Y_(){return new Ji({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:cu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ea,depthTest:!1,depthWrite:!1})}function cu(){return`

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
	`}class Qv extends Zi{constructor(e=1,i={}){super(e,e,i),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},l=[r,r,r,r,r,r];this.texture=new kv(l),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},l=new Zs(5,5,5),c=new Ji({name:"CubemapFromEquirect",uniforms:Xs(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:$n,blending:Ea});c.uniforms.tEquirect.value=i;const d=new qt(l,c),p=i.minFilter;return i.minFilter===Ir&&(i.minFilter=Hn),new rE(1,10,this).update(e,d),i.minFilter=p,d.geometry.dispose(),d.material.dispose(),this}clear(e,i=!0,r=!0,l=!0){const c=e.getRenderTarget();for(let d=0;d<6;d++)e.setRenderTarget(this,d),e.clear(i,r,l);e.setRenderTarget(c)}}function eT(s){let e=new WeakMap,i=new WeakMap,r=null;function l(g,M=!1){return g==null?null:M?d(g):c(g)}function c(g){if(g&&g.isTexture){const M=g.mapping;if(M===Ed||M===bd)if(e.has(g)){const b=e.get(g).texture;return p(b,g.mapping)}else{const b=g.image;if(b&&b.height>0){const D=new Qv(b.height);return D.fromEquirectangularTexture(s,g),e.set(g,D),g.addEventListener("dispose",h),p(D.texture,g.mapping)}else return null}}return g}function d(g){if(g&&g.isTexture){const M=g.mapping,b=M===Ed||M===bd,D=M===Fr||M===Vs;if(b||D){let y=i.get(g);const S=y!==void 0?y.texture.pmremVersion:0;if(g.isRenderTargetTexture&&g.pmremVersion!==S)return r===null&&(r=new X_(s)),y=b?r.fromEquirectangular(g,y):r.fromCubemap(g,y),y.texture.pmremVersion=g.pmremVersion,i.set(g,y),y.texture;if(y!==void 0)return y.texture;{const w=g.image;return b&&w&&w.height>0||D&&w&&m(w)?(r===null&&(r=new X_(s)),y=b?r.fromEquirectangular(g):r.fromCubemap(g),y.texture.pmremVersion=g.pmremVersion,i.set(g,y),g.addEventListener("dispose",_),y.texture):null}}}return g}function p(g,M){return M===Ed?g.mapping=Fr:M===bd&&(g.mapping=Vs),g}function m(g){let M=0;const b=6;for(let D=0;D<b;D++)g[D]!==void 0&&M++;return M===b}function h(g){const M=g.target;M.removeEventListener("dispose",h);const b=e.get(M);b!==void 0&&(e.delete(M),b.dispose())}function _(g){const M=g.target;M.removeEventListener("dispose",_);const b=i.get(M);b!==void 0&&(i.delete(M),b.dispose())}function x(){e=new WeakMap,i=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:l,dispose:x}}function tT(s){const e={};function i(r){if(e[r]!==void 0)return e[r];const l=s.getExtension(r);return e[r]=l,l}return{has:function(r){return i(r)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(r){const l=i(r);return l===null&&Bs("WebGLRenderer: "+r+" extension not supported."),l}}}function nT(s,e,i,r){const l={},c=new WeakMap;function d(x){const g=x.target;g.index!==null&&e.remove(g.index);for(const b in g.attributes)e.remove(g.attributes[b]);g.removeEventListener("dispose",d),delete l[g.id];const M=c.get(g);M&&(e.remove(M),c.delete(g)),r.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,i.memory.geometries--}function p(x,g){return l[g.id]===!0||(g.addEventListener("dispose",d),l[g.id]=!0,i.memory.geometries++),g}function m(x){const g=x.attributes;for(const M in g)e.update(g[M],s.ARRAY_BUFFER)}function h(x){const g=[],M=x.index,b=x.attributes.position;let D=0;if(b===void 0)return;if(M!==null){const w=M.array;D=M.version;for(let U=0,A=w.length;U<A;U+=3){const P=w[U+0],L=w[U+1],B=w[U+2];g.push(P,L,L,B,B,P)}}else{const w=b.array;D=b.version;for(let U=0,A=w.length/3-1;U<A;U+=3){const P=U+0,L=U+1,B=U+2;g.push(P,L,L,B,B,P)}}const y=new(b.count>=65535?Fv:zv)(g,1);y.version=D;const S=c.get(x);S&&e.remove(S),c.set(x,y)}function _(x){const g=c.get(x);if(g){const M=x.index;M!==null&&g.version<M.version&&h(x)}else h(x);return c.get(x)}return{get:p,update:m,getWireframeAttribute:_}}function iT(s,e,i){let r;function l(x){r=x}let c,d;function p(x){c=x.type,d=x.bytesPerElement}function m(x,g){s.drawElements(r,g,c,x*d),i.update(g,r,1)}function h(x,g,M){M!==0&&(s.drawElementsInstanced(r,g,c,x*d,M),i.update(g,r,M))}function _(x,g,M){if(M===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,g,0,c,x,0,M);let D=0;for(let y=0;y<M;y++)D+=g[y];i.update(D,r,1)}this.setMode=l,this.setIndex=p,this.render=m,this.renderInstances=h,this.renderMultiDraw=_}function aT(s){const e={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function r(c,d,p){switch(i.calls++,d){case s.TRIANGLES:i.triangles+=p*(c/3);break;case s.LINES:i.lines+=p*(c/2);break;case s.LINE_STRIP:i.lines+=p*(c-1);break;case s.LINE_LOOP:i.lines+=p*c;break;case s.POINTS:i.points+=p*c;break;default:Tt("WebGLInfo: Unknown draw mode:",d);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:e,render:i,programs:null,autoReset:!0,reset:l,update:r}}function rT(s,e,i){const r=new WeakMap,l=new un;function c(d,p,m){const h=d.morphTargetInfluences,_=p.morphAttributes.position||p.morphAttributes.normal||p.morphAttributes.color,x=_!==void 0?_.length:0;let g=r.get(p);if(g===void 0||g.count!==x){let k=function(){T.dispose(),r.delete(p),p.removeEventListener("dispose",k)};var M=k;g!==void 0&&g.texture.dispose();const b=p.morphAttributes.position!==void 0,D=p.morphAttributes.normal!==void 0,y=p.morphAttributes.color!==void 0,S=p.morphAttributes.position||[],w=p.morphAttributes.normal||[],U=p.morphAttributes.color||[];let A=0;b===!0&&(A=1),D===!0&&(A=2),y===!0&&(A=3);let P=p.attributes.position.count*A,L=1;P>e.maxTextureSize&&(L=Math.ceil(P/e.maxTextureSize),P=e.maxTextureSize);const B=new Float32Array(P*L*4*x),T=new Pv(B,P,L,x);T.type=Wi,T.needsUpdate=!0;const N=A*4;for(let G=0;G<x;G++){const Z=S[G],ce=w[G],le=U[G],Y=P*L*4*G;for(let z=0;z<Z.count;z++){const F=z*N;b===!0&&(l.fromBufferAttribute(Z,z),B[Y+F+0]=l.x,B[Y+F+1]=l.y,B[Y+F+2]=l.z,B[Y+F+3]=0),D===!0&&(l.fromBufferAttribute(ce,z),B[Y+F+4]=l.x,B[Y+F+5]=l.y,B[Y+F+6]=l.z,B[Y+F+7]=0),y===!0&&(l.fromBufferAttribute(le,z),B[Y+F+8]=l.x,B[Y+F+9]=l.y,B[Y+F+10]=l.z,B[Y+F+11]=le.itemSize===4?l.w:1)}}g={count:x,texture:T,size:new bt(P,L)},r.set(p,g),p.addEventListener("dispose",k)}if(d.isInstancedMesh===!0&&d.morphTexture!==null)m.getUniforms().setValue(s,"morphTexture",d.morphTexture,i);else{let b=0;for(let y=0;y<h.length;y++)b+=h[y];const D=p.morphTargetsRelative?1:1-b;m.getUniforms().setValue(s,"morphTargetBaseInfluence",D),m.getUniforms().setValue(s,"morphTargetInfluences",h)}m.getUniforms().setValue(s,"morphTargetsTexture",g.texture,i),m.getUniforms().setValue(s,"morphTargetsTextureSize",g.size)}return{update:c}}function sT(s,e,i,r,l){let c=new WeakMap;function d(h){const _=l.render.frame,x=h.geometry,g=e.get(h,x);if(c.get(g)!==_&&(e.update(g),c.set(g,_)),h.isInstancedMesh&&(h.hasEventListener("dispose",m)===!1&&h.addEventListener("dispose",m),c.get(h)!==_&&(i.update(h.instanceMatrix,s.ARRAY_BUFFER),h.instanceColor!==null&&i.update(h.instanceColor,s.ARRAY_BUFFER),c.set(h,_))),h.isSkinnedMesh){const M=h.skeleton;c.get(M)!==_&&(M.update(),c.set(M,_))}return g}function p(){c=new WeakMap}function m(h){const _=h.target;_.removeEventListener("dispose",m),r.releaseStatesOfObject(_),i.remove(_.instanceMatrix),_.instanceColor!==null&&i.remove(_.instanceColor)}return{update:d,dispose:p}}const oT={[xv]:"LINEAR_TONE_MAPPING",[Sv]:"REINHARD_TONE_MAPPING",[Mv]:"CINEON_TONE_MAPPING",[yv]:"ACES_FILMIC_TONE_MAPPING",[bv]:"AGX_TONE_MAPPING",[Tv]:"NEUTRAL_TONE_MAPPING",[Ev]:"CUSTOM_TONE_MAPPING"};function lT(s,e,i,r,l,c){const d=new Zi(e,i,{type:s,depthBuffer:l,stencilBuffer:c,samples:r?4:0,depthTexture:l?new ks(e,i):void 0}),p=new Zi(e,i,{type:Ta,depthBuffer:!1,stencilBuffer:!1}),m=new nn;m.setAttribute("position",new Yt([-1,3,0,-1,-1,0,3,-1,0],3)),m.setAttribute("uv",new Yt([0,2,0,0,2,0],2));const h=new nE({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),_=new qt(m,h),x=new Yv(-1,1,1,-1,0,1);let g=null,M=null,b=!1,D,y=null,S=[],w=!1;this.setSize=function(U,A){d.setSize(U,A),p.setSize(U,A);for(let P=0;P<S.length;P++){const L=S[P];L.setSize&&L.setSize(U,A)}},this.setEffects=function(U){S=U,w=S.length>0&&S[0].isRenderPass===!0;const A=d.width,P=d.height;for(let L=0;L<S.length;L++){const B=S[L];B.setSize&&B.setSize(A,P)}},this.begin=function(U,A){if(b||U.toneMapping===Yi&&S.length===0)return!1;if(y=A,A!==null){const P=A.width,L=A.height;(d.width!==P||d.height!==L)&&this.setSize(P,L)}return w===!1&&U.setRenderTarget(d),D=U.toneMapping,U.toneMapping=Yi,!0},this.hasRenderPass=function(){return w},this.end=function(U,A){U.toneMapping=D,b=!0;let P=d,L=p;for(let B=0;B<S.length;B++){const T=S[B];if(T.enabled!==!1&&(T.render(U,L,P,A),T.needsSwap!==!1)){const N=P;P=L,L=N}}if(g!==U.outputColorSpace||M!==U.toneMapping){g=U.outputColorSpace,M=U.toneMapping,h.defines={},yt.getTransfer(g)===zt&&(h.defines.SRGB_TRANSFER="");const B=oT[M];B&&(h.defines[B]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=P.texture,U.setRenderTarget(y),U.render(_,x),y=null,b=!1},this.isCompositing=function(){return b},this.dispose=function(){d.depthTexture&&d.depthTexture.dispose(),d.dispose(),p.dispose(),m.dispose(),h.dispose()}}const Jv=new Xn,Wh=new ks(1,1),jv=new Pv,$v=new Uy,ex=new kv,Z_=[],K_=[],Q_=new Float32Array(16),J_=new Float32Array(9),j_=new Float32Array(4);function Ks(s,e,i){const r=s[0];if(r<=0||r>0)return s;const l=e*i;let c=Z_[l];if(c===void 0&&(c=new Float32Array(l),Z_[l]=c),e!==0){r.toArray(c,0);for(let d=1,p=0;d!==e;++d)p+=i,s[d].toArray(c,p)}return c}function bn(s,e){if(s.length!==e.length)return!1;for(let i=0,r=s.length;i<r;i++)if(s[i]!==e[i])return!1;return!0}function Tn(s,e){for(let i=0,r=e.length;i<r;i++)s[i]=e[i]}function uu(s,e){let i=K_[e];i===void 0&&(i=new Int32Array(e),K_[e]=i);for(let r=0;r!==e;++r)i[r]=s.allocateTextureUnit();return i}function cT(s,e){const i=this.cache;i[0]!==e&&(s.uniform1f(this.addr,e),i[0]=e)}function uT(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(bn(i,e))return;s.uniform2fv(this.addr,e),Tn(i,e)}}function fT(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else if(e.r!==void 0)(i[0]!==e.r||i[1]!==e.g||i[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),i[0]=e.r,i[1]=e.g,i[2]=e.b);else{if(bn(i,e))return;s.uniform3fv(this.addr,e),Tn(i,e)}}function dT(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(bn(i,e))return;s.uniform4fv(this.addr,e),Tn(i,e)}}function hT(s,e){const i=this.cache,r=e.elements;if(r===void 0){if(bn(i,e))return;s.uniformMatrix2fv(this.addr,!1,e),Tn(i,e)}else{if(bn(i,r))return;j_.set(r),s.uniformMatrix2fv(this.addr,!1,j_),Tn(i,r)}}function pT(s,e){const i=this.cache,r=e.elements;if(r===void 0){if(bn(i,e))return;s.uniformMatrix3fv(this.addr,!1,e),Tn(i,e)}else{if(bn(i,r))return;J_.set(r),s.uniformMatrix3fv(this.addr,!1,J_),Tn(i,r)}}function mT(s,e){const i=this.cache,r=e.elements;if(r===void 0){if(bn(i,e))return;s.uniformMatrix4fv(this.addr,!1,e),Tn(i,e)}else{if(bn(i,r))return;Q_.set(r),s.uniformMatrix4fv(this.addr,!1,Q_),Tn(i,r)}}function gT(s,e){const i=this.cache;i[0]!==e&&(s.uniform1i(this.addr,e),i[0]=e)}function _T(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(bn(i,e))return;s.uniform2iv(this.addr,e),Tn(i,e)}}function vT(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(bn(i,e))return;s.uniform3iv(this.addr,e),Tn(i,e)}}function xT(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(bn(i,e))return;s.uniform4iv(this.addr,e),Tn(i,e)}}function ST(s,e){const i=this.cache;i[0]!==e&&(s.uniform1ui(this.addr,e),i[0]=e)}function MT(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(bn(i,e))return;s.uniform2uiv(this.addr,e),Tn(i,e)}}function yT(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(bn(i,e))return;s.uniform3uiv(this.addr,e),Tn(i,e)}}function ET(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(bn(i,e))return;s.uniform4uiv(this.addr,e),Tn(i,e)}}function bT(s,e,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(s.uniform1i(this.addr,l),r[0]=l);let c;this.type===s.SAMPLER_2D_SHADOW?(Wh.compareFunction=i.isReversedDepthBuffer()?ap:ip,c=Wh):c=Jv,i.setTexture2D(e||c,l)}function TT(s,e,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(s.uniform1i(this.addr,l),r[0]=l),i.setTexture3D(e||$v,l)}function AT(s,e,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(s.uniform1i(this.addr,l),r[0]=l),i.setTextureCube(e||ex,l)}function RT(s,e,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(s.uniform1i(this.addr,l),r[0]=l),i.setTexture2DArray(e||jv,l)}function CT(s){switch(s){case 5126:return cT;case 35664:return uT;case 35665:return fT;case 35666:return dT;case 35674:return hT;case 35675:return pT;case 35676:return mT;case 5124:case 35670:return gT;case 35667:case 35671:return _T;case 35668:case 35672:return vT;case 35669:case 35673:return xT;case 5125:return ST;case 36294:return MT;case 36295:return yT;case 36296:return ET;case 35678:case 36198:case 36298:case 36306:case 35682:return bT;case 35679:case 36299:case 36307:return TT;case 35680:case 36300:case 36308:case 36293:return AT;case 36289:case 36303:case 36311:case 36292:return RT}}function wT(s,e){s.uniform1fv(this.addr,e)}function DT(s,e){const i=Ks(e,this.size,2);s.uniform2fv(this.addr,i)}function UT(s,e){const i=Ks(e,this.size,3);s.uniform3fv(this.addr,i)}function NT(s,e){const i=Ks(e,this.size,4);s.uniform4fv(this.addr,i)}function LT(s,e){const i=Ks(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,i)}function OT(s,e){const i=Ks(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,i)}function PT(s,e){const i=Ks(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,i)}function IT(s,e){s.uniform1iv(this.addr,e)}function BT(s,e){s.uniform2iv(this.addr,e)}function zT(s,e){s.uniform3iv(this.addr,e)}function FT(s,e){s.uniform4iv(this.addr,e)}function HT(s,e){s.uniform1uiv(this.addr,e)}function GT(s,e){s.uniform2uiv(this.addr,e)}function VT(s,e){s.uniform3uiv(this.addr,e)}function kT(s,e){s.uniform4uiv(this.addr,e)}function XT(s,e,i){const r=this.cache,l=e.length,c=uu(i,l);bn(r,c)||(s.uniform1iv(this.addr,c),Tn(r,c));let d;this.type===s.SAMPLER_2D_SHADOW?d=Wh:d=Jv;for(let p=0;p!==l;++p)i.setTexture2D(e[p]||d,c[p])}function WT(s,e,i){const r=this.cache,l=e.length,c=uu(i,l);bn(r,c)||(s.uniform1iv(this.addr,c),Tn(r,c));for(let d=0;d!==l;++d)i.setTexture3D(e[d]||$v,c[d])}function qT(s,e,i){const r=this.cache,l=e.length,c=uu(i,l);bn(r,c)||(s.uniform1iv(this.addr,c),Tn(r,c));for(let d=0;d!==l;++d)i.setTextureCube(e[d]||ex,c[d])}function YT(s,e,i){const r=this.cache,l=e.length,c=uu(i,l);bn(r,c)||(s.uniform1iv(this.addr,c),Tn(r,c));for(let d=0;d!==l;++d)i.setTexture2DArray(e[d]||jv,c[d])}function ZT(s){switch(s){case 5126:return wT;case 35664:return DT;case 35665:return UT;case 35666:return NT;case 35674:return LT;case 35675:return OT;case 35676:return PT;case 5124:case 35670:return IT;case 35667:case 35671:return BT;case 35668:case 35672:return zT;case 35669:case 35673:return FT;case 5125:return HT;case 36294:return GT;case 36295:return VT;case 36296:return kT;case 35678:case 36198:case 36298:case 36306:case 35682:return XT;case 35679:case 36299:case 36307:return WT;case 35680:case 36300:case 36308:case 36293:return qT;case 36289:case 36303:case 36311:case 36292:return YT}}class KT{constructor(e,i,r){this.id=e,this.addr=r,this.cache=[],this.type=i.type,this.setValue=CT(i.type)}}class QT{constructor(e,i,r){this.id=e,this.addr=r,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=ZT(i.type)}}class JT{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,i,r){const l=this.seq;for(let c=0,d=l.length;c!==d;++c){const p=l[c];p.setValue(e,i[p.id],r)}}}const eh=/(\w+)(\])?(\[|\.)?/g;function $_(s,e){s.seq.push(e),s.map[e.id]=e}function jT(s,e,i){const r=s.name,l=r.length;for(eh.lastIndex=0;;){const c=eh.exec(r),d=eh.lastIndex;let p=c[1];const m=c[2]==="]",h=c[3];if(m&&(p=p|0),h===void 0||h==="["&&d+2===l){$_(i,h===void 0?new KT(p,s,e):new QT(p,s,e));break}else{let x=i.map[p];x===void 0&&(x=new JT(p),$_(i,x)),i=x}}}class Kc{constructor(e,i){this.seq=[],this.map={};const r=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let d=0;d<r;++d){const p=e.getActiveUniform(i,d),m=e.getUniformLocation(i,p.name);jT(p,m,this)}const l=[],c=[];for(const d of this.seq)d.type===e.SAMPLER_2D_SHADOW||d.type===e.SAMPLER_CUBE_SHADOW||d.type===e.SAMPLER_2D_ARRAY_SHADOW?l.push(d):c.push(d);l.length>0&&(this.seq=l.concat(c))}setValue(e,i,r,l){const c=this.map[i];c!==void 0&&c.setValue(e,r,l)}setOptional(e,i,r){const l=i[r];l!==void 0&&this.setValue(e,r,l)}static upload(e,i,r,l){for(let c=0,d=i.length;c!==d;++c){const p=i[c],m=r[p.id];m.needsUpdate!==!1&&p.setValue(e,m.value,l)}}static seqWithValue(e,i){const r=[];for(let l=0,c=e.length;l!==c;++l){const d=e[l];d.id in i&&r.push(d)}return r}}function ev(s,e,i){const r=s.createShader(e);return s.shaderSource(r,i),s.compileShader(r),r}const $T=37297;let eA=0;function tA(s,e){const i=s.split(`
`),r=[],l=Math.max(e-6,0),c=Math.min(e+6,i.length);for(let d=l;d<c;d++){const p=d+1;r.push(`${p===e?">":" "} ${p}: ${i[d]}`)}return r.join(`
`)}const tv=new st;function nA(s){yt._getMatrix(tv,yt.workingColorSpace,s);const e=`mat3( ${tv.elements.map(i=>i.toFixed(4))} )`;switch(yt.getTransfer(s)){case $c:return[e,"LinearTransferOETF"];case zt:return[e,"sRGBTransferOETF"];default:return nt("WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function nv(s,e,i){const r=s.getShaderParameter(e,s.COMPILE_STATUS),c=(s.getShaderInfoLog(e)||"").trim();if(r&&c==="")return"";const d=/ERROR: 0:(\d+)/.exec(c);if(d){const p=parseInt(d[1]);return i.toUpperCase()+`

`+c+`

`+tA(s.getShaderSource(e),p)}else return c}function iA(s,e){const i=nA(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}const aA={[xv]:"Linear",[Sv]:"Reinhard",[Mv]:"Cineon",[yv]:"ACESFilmic",[bv]:"AgX",[Tv]:"Neutral",[Ev]:"Custom"};function rA(s,e){const i=aA[e];return i===void 0?(nt("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const kc=new Q;function sA(){yt.getLuminanceCoefficients(kc);const s=kc.x.toFixed(4),e=kc.y.toFixed(4),i=kc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function oA(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Jo).join(`
`)}function lA(s){const e=[];for(const i in s){const r=s[i];r!==!1&&e.push("#define "+i+" "+r)}return e.join(`
`)}function cA(s,e){const i={},r=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let l=0;l<r;l++){const c=s.getActiveAttrib(e,l),d=c.name;let p=1;c.type===s.FLOAT_MAT2&&(p=2),c.type===s.FLOAT_MAT3&&(p=3),c.type===s.FLOAT_MAT4&&(p=4),i[d]={type:c.type,location:s.getAttribLocation(e,d),locationSize:p}}return i}function Jo(s){return s!==""}function iv(s,e){const i=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function av(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const uA=/^[ \t]*#include +<([\w\d./]+)>/gm;function qh(s){return s.replace(uA,dA)}const fA=new Map;function dA(s,e){let i=ut[e];if(i===void 0){const r=fA.get(e);if(r!==void 0)i=ut[r],nt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return qh(i)}const hA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function rv(s){return s.replace(hA,pA)}function pA(s,e,i,r){let l="";for(let c=parseInt(e);c<parseInt(i);c++)l+=r.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function sv(s){let e=`precision ${s.precision} float;
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
#define LOW_PRECISION`),e}const mA={[Xc]:"SHADOWMAP_TYPE_PCF",[Qo]:"SHADOWMAP_TYPE_VSM"};function gA(s){return mA[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const _A={[Fr]:"ENVMAP_TYPE_CUBE",[Vs]:"ENVMAP_TYPE_CUBE",[su]:"ENVMAP_TYPE_CUBE_UV"};function vA(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":_A[s.envMapMode]||"ENVMAP_TYPE_CUBE"}const xA={[Vs]:"ENVMAP_MODE_REFRACTION"};function SA(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":xA[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}const MA={[vv]:"ENVMAP_BLENDING_MULTIPLY",[KM]:"ENVMAP_BLENDING_MIX",[QM]:"ENVMAP_BLENDING_ADD"};function yA(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":MA[s.combine]||"ENVMAP_BLENDING_NONE"}function EA(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const i=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:r,maxMip:i}}function bA(s,e,i,r){const l=s.getContext(),c=i.defines;let d=i.vertexShader,p=i.fragmentShader;const m=gA(i),h=vA(i),_=SA(i),x=yA(i),g=EA(i),M=oA(i),b=lA(c),D=l.createProgram();let y,S,w=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(y=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,b].filter(Jo).join(`
`),y.length>0&&(y+=`
`),S=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,b].filter(Jo).join(`
`),S.length>0&&(S+=`
`)):(y=[sv(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,b,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+_:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexNormals?"#define HAS_NORMAL":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Jo).join(`
`),S=[sv(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,b,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+h:"",i.envMap?"#define "+_:"",i.envMap?"#define "+x:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor?"#define USE_COLOR":"",i.vertexAlphas||i.batchingColor?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==Yi?"#define TONE_MAPPING":"",i.toneMapping!==Yi?ut.tonemapping_pars_fragment:"",i.toneMapping!==Yi?rA("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",ut.colorspace_pars_fragment,iA("linearToOutputTexel",i.outputColorSpace),sA(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(Jo).join(`
`)),d=qh(d),d=iv(d,i),d=av(d,i),p=qh(p),p=iv(p,i),p=av(p,i),d=rv(d),p=rv(p),i.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,y=[M,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,S=["#define varying in",i.glslVersion===d_?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===d_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);const U=w+y+d,A=w+S+p,P=ev(l,l.VERTEX_SHADER,U),L=ev(l,l.FRAGMENT_SHADER,A);l.attachShader(D,P),l.attachShader(D,L),i.index0AttributeName!==void 0?l.bindAttribLocation(D,0,i.index0AttributeName):i.hasPositionAttribute===!0&&l.bindAttribLocation(D,0,"position"),l.linkProgram(D);function B(G){if(s.debug.checkShaderErrors){const Z=l.getProgramInfoLog(D)||"",ce=l.getShaderInfoLog(P)||"",le=l.getShaderInfoLog(L)||"",Y=Z.trim(),z=ce.trim(),F=le.trim();let te=!0,ge=!0;if(l.getProgramParameter(D,l.LINK_STATUS)===!1)if(te=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(l,D,P,L);else{const Ee=nv(l,P,"vertex"),I=nv(l,L,"fragment");Tt("WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(D,l.VALIDATE_STATUS)+`

Material Name: `+G.name+`
Material Type: `+G.type+`

Program Info Log: `+Y+`
`+Ee+`
`+I)}else Y!==""?nt("WebGLProgram: Program Info Log:",Y):(z===""||F==="")&&(ge=!1);ge&&(G.diagnostics={runnable:te,programLog:Y,vertexShader:{log:z,prefix:y},fragmentShader:{log:F,prefix:S}})}l.deleteShader(P),l.deleteShader(L),T=new Kc(l,D),N=cA(l,D)}let T;this.getUniforms=function(){return T===void 0&&B(this),T};let N;this.getAttributes=function(){return N===void 0&&B(this),N};let k=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return k===!1&&(k=l.getProgramParameter(D,$T)),k},this.destroy=function(){r.releaseStatesOfProgram(this),l.deleteProgram(D),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=eA++,this.cacheKey=e,this.usedTimes=1,this.program=D,this.vertexShader=P,this.fragmentShader=L,this}let TA=0;class AA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,i,r){const l=this._getShaderCacheForMaterial(e);return l.has(i)===!1&&(l.add(i),i.usedTimes++),l.has(r)===!1&&(l.add(r),r.usedTimes++),this}remove(e){const i=this.materialCache.get(e);for(const r of i)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const i=this.materialCache;let r=i.get(e);return r===void 0&&(r=new Set,i.set(e,r)),r}_getShaderStage(e){const i=this.shaderCache;let r=i.get(e);return r===void 0&&(r=new RA(e),i.set(e,r)),r}}class RA{constructor(e){this.id=TA++,this.code=e,this.usedTimes=0}}function CA(s){return s===Hr||s===Qc||s===Jc}function wA(s,e,i,r,l,c){const d=new Iv,p=new AA,m=new Set,h=[],_=new Map,x=r.logarithmicDepthBuffer;let g=r.precision;const M={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function b(T){return m.add(T),T===0?"uv":`uv${T}`}function D(T,N,k,G,Z,ce){const le=G.fog,Y=Z.geometry,z=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?G.environment:null,F=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap,te=e.get(T.envMap||z,F),ge=te&&te.mapping===su?te.image.height:null,Ee=M[T.type];T.precision!==null&&(g=r.getMaxPrecision(T.precision),g!==T.precision&&nt("WebGLProgram.getParameters:",T.precision,"not supported, using",g,"instead."));const I=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,J=I!==void 0?I.length:0;let ye=0;Y.morphAttributes.position!==void 0&&(ye=1),Y.morphAttributes.normal!==void 0&&(ye=2),Y.morphAttributes.color!==void 0&&(ye=3);let Re,Ie,ae,xe;if(Ee){const Ve=Xi[Ee];Re=Ve.vertexShader,Ie=Ve.fragmentShader}else{Re=T.vertexShader,Ie=T.fragmentShader;const Ve=p.getVertexShaderStage(T),Jt=p.getFragmentShaderStage(T);p.update(T,Ve,Jt),ae=Ve.id,xe=Jt.id}const Me=s.getRenderTarget(),He=s.state.buffers.depth.getReversed(),it=Z.isInstancedMesh===!0,Je=Z.isBatchedMesh===!0,Zt=!!T.map,ft=!!T.matcap,xt=!!te,St=!!T.aoMap,dt=!!T.lightMap,an=!!T.bumpMap&&T.wireframe===!1,rn=!!T.normalMap,sn=!!T.displacementMap,dn=!!T.emissiveMap,Wt=!!T.metalnessMap,on=!!T.roughnessMap,q=T.anisotropy>0,Ft=T.clearcoat>0,wt=T.dispersion>0,O=T.iridescence>0,E=T.sheen>0,j=T.transmission>0,re=q&&!!T.anisotropyMap,de=Ft&&!!T.clearcoatMap,be=Ft&&!!T.clearcoatNormalMap,De=Ft&&!!T.clearcoatRoughnessMap,fe=O&&!!T.iridescenceMap,he=O&&!!T.iridescenceThicknessMap,Ae=E&&!!T.sheenColorMap,ze=E&&!!T.sheenRoughnessMap,Le=!!T.specularMap,Ue=!!T.specularColorMap,Ke=!!T.specularIntensityMap,je=j&&!!T.transmissionMap,at=j&&!!T.thicknessMap,X=!!T.gradientMap,Te=!!T.alphaMap,me=T.alphaTest>0,Ce=!!T.alphaHash,Be=!!T.extensions;let Se=Yi;T.toneMapped&&(Me===null||Me.isXRRenderTarget===!0)&&(Se=s.toneMapping);const qe={shaderID:Ee,shaderType:T.type,shaderName:T.name,vertexShader:Re,fragmentShader:Ie,defines:T.defines,customVertexShaderID:ae,customFragmentShaderID:xe,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:g,batching:Je,batchingColor:Je&&Z._colorsTexture!==null,instancing:it,instancingColor:it&&Z.instanceColor!==null,instancingMorph:it&&Z.morphTexture!==null,outputColorSpace:Me===null?s.outputColorSpace:Me.isXRRenderTarget===!0?Me.texture.colorSpace:yt.workingColorSpace,alphaToCoverage:!!T.alphaToCoverage,map:Zt,matcap:ft,envMap:xt,envMapMode:xt&&te.mapping,envMapCubeUVHeight:ge,aoMap:St,lightMap:dt,bumpMap:an,normalMap:rn,displacementMap:sn,emissiveMap:dn,normalMapObjectSpace:rn&&T.normalMapType===$M,normalMapTangentSpace:rn&&T.normalMapType===c_,packedNormalMap:rn&&T.normalMapType===c_&&CA(T.normalMap.format),metalnessMap:Wt,roughnessMap:on,anisotropy:q,anisotropyMap:re,clearcoat:Ft,clearcoatMap:de,clearcoatNormalMap:be,clearcoatRoughnessMap:De,dispersion:wt,iridescence:O,iridescenceMap:fe,iridescenceThicknessMap:he,sheen:E,sheenColorMap:Ae,sheenRoughnessMap:ze,specularMap:Le,specularColorMap:Ue,specularIntensityMap:Ke,transmission:j,transmissionMap:je,thicknessMap:at,gradientMap:X,opaque:T.transparent===!1&&T.blending===Is&&T.alphaToCoverage===!1,alphaMap:Te,alphaTest:me,alphaHash:Ce,combine:T.combine,mapUv:Zt&&b(T.map.channel),aoMapUv:St&&b(T.aoMap.channel),lightMapUv:dt&&b(T.lightMap.channel),bumpMapUv:an&&b(T.bumpMap.channel),normalMapUv:rn&&b(T.normalMap.channel),displacementMapUv:sn&&b(T.displacementMap.channel),emissiveMapUv:dn&&b(T.emissiveMap.channel),metalnessMapUv:Wt&&b(T.metalnessMap.channel),roughnessMapUv:on&&b(T.roughnessMap.channel),anisotropyMapUv:re&&b(T.anisotropyMap.channel),clearcoatMapUv:de&&b(T.clearcoatMap.channel),clearcoatNormalMapUv:be&&b(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:De&&b(T.clearcoatRoughnessMap.channel),iridescenceMapUv:fe&&b(T.iridescenceMap.channel),iridescenceThicknessMapUv:he&&b(T.iridescenceThicknessMap.channel),sheenColorMapUv:Ae&&b(T.sheenColorMap.channel),sheenRoughnessMapUv:ze&&b(T.sheenRoughnessMap.channel),specularMapUv:Le&&b(T.specularMap.channel),specularColorMapUv:Ue&&b(T.specularColorMap.channel),specularIntensityMapUv:Ke&&b(T.specularIntensityMap.channel),transmissionMapUv:je&&b(T.transmissionMap.channel),thicknessMapUv:at&&b(T.thicknessMap.channel),alphaMapUv:Te&&b(T.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(rn||q),vertexNormals:!!Y.attributes.normal,vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:Z.isPoints===!0&&!!Y.attributes.uv&&(Zt||Te),fog:!!le,useFog:T.fog===!0,fogExp2:!!le&&le.isFogExp2,flatShading:T.wireframe===!1&&(T.flatShading===!0||Y.attributes.normal===void 0&&rn===!1&&(T.isMeshLambertMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isMeshPhysicalMaterial)),sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:x,reversedDepthBuffer:He,skinning:Z.isSkinnedMesh===!0,hasPositionAttribute:Y.attributes.position!==void 0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:J,morphTextureStride:ye,numDirLights:N.directional.length,numPointLights:N.point.length,numSpotLights:N.spot.length,numSpotLightMaps:N.spotLightMap.length,numRectAreaLights:N.rectArea.length,numHemiLights:N.hemi.length,numDirLightShadows:N.directionalShadowMap.length,numPointLightShadows:N.pointShadowMap.length,numSpotLightShadows:N.spotShadowMap.length,numSpotLightShadowsWithMaps:N.numSpotLightShadowsWithMaps,numLightProbes:N.numLightProbes,numLightProbeGrids:ce.length,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:T.dithering,shadowMapEnabled:s.shadowMap.enabled&&k.length>0,shadowMapType:s.shadowMap.type,toneMapping:Se,decodeVideoTexture:Zt&&T.map.isVideoTexture===!0&&yt.getTransfer(T.map.colorSpace)===zt,decodeVideoTextureEmissive:dn&&T.emissiveMap.isVideoTexture===!0&&yt.getTransfer(T.emissiveMap.colorSpace)===zt,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===pi,flipSided:T.side===$n,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:Be&&T.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Be&&T.extensions.multiDraw===!0||Je)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return qe.vertexUv1s=m.has(1),qe.vertexUv2s=m.has(2),qe.vertexUv3s=m.has(3),m.clear(),qe}function y(T){const N=[];if(T.shaderID?N.push(T.shaderID):(N.push(T.customVertexShaderID),N.push(T.customFragmentShaderID)),T.defines!==void 0)for(const k in T.defines)N.push(k),N.push(T.defines[k]);return T.isRawShaderMaterial===!1&&(S(N,T),w(N,T),N.push(s.outputColorSpace)),N.push(T.customProgramCacheKey),N.join()}function S(T,N){T.push(N.precision),T.push(N.outputColorSpace),T.push(N.envMapMode),T.push(N.envMapCubeUVHeight),T.push(N.mapUv),T.push(N.alphaMapUv),T.push(N.lightMapUv),T.push(N.aoMapUv),T.push(N.bumpMapUv),T.push(N.normalMapUv),T.push(N.displacementMapUv),T.push(N.emissiveMapUv),T.push(N.metalnessMapUv),T.push(N.roughnessMapUv),T.push(N.anisotropyMapUv),T.push(N.clearcoatMapUv),T.push(N.clearcoatNormalMapUv),T.push(N.clearcoatRoughnessMapUv),T.push(N.iridescenceMapUv),T.push(N.iridescenceThicknessMapUv),T.push(N.sheenColorMapUv),T.push(N.sheenRoughnessMapUv),T.push(N.specularMapUv),T.push(N.specularColorMapUv),T.push(N.specularIntensityMapUv),T.push(N.transmissionMapUv),T.push(N.thicknessMapUv),T.push(N.combine),T.push(N.fogExp2),T.push(N.sizeAttenuation),T.push(N.morphTargetsCount),T.push(N.morphAttributeCount),T.push(N.numDirLights),T.push(N.numPointLights),T.push(N.numSpotLights),T.push(N.numSpotLightMaps),T.push(N.numHemiLights),T.push(N.numRectAreaLights),T.push(N.numDirLightShadows),T.push(N.numPointLightShadows),T.push(N.numSpotLightShadows),T.push(N.numSpotLightShadowsWithMaps),T.push(N.numLightProbes),T.push(N.shadowMapType),T.push(N.toneMapping),T.push(N.numClippingPlanes),T.push(N.numClipIntersection),T.push(N.depthPacking)}function w(T,N){d.disableAll(),N.instancing&&d.enable(0),N.instancingColor&&d.enable(1),N.instancingMorph&&d.enable(2),N.matcap&&d.enable(3),N.envMap&&d.enable(4),N.normalMapObjectSpace&&d.enable(5),N.normalMapTangentSpace&&d.enable(6),N.clearcoat&&d.enable(7),N.iridescence&&d.enable(8),N.alphaTest&&d.enable(9),N.vertexColors&&d.enable(10),N.vertexAlphas&&d.enable(11),N.vertexUv1s&&d.enable(12),N.vertexUv2s&&d.enable(13),N.vertexUv3s&&d.enable(14),N.vertexTangents&&d.enable(15),N.anisotropy&&d.enable(16),N.alphaHash&&d.enable(17),N.batching&&d.enable(18),N.dispersion&&d.enable(19),N.batchingColor&&d.enable(20),N.gradientMap&&d.enable(21),N.packedNormalMap&&d.enable(22),N.vertexNormals&&d.enable(23),T.push(d.mask),d.disableAll(),N.fog&&d.enable(0),N.useFog&&d.enable(1),N.flatShading&&d.enable(2),N.logarithmicDepthBuffer&&d.enable(3),N.reversedDepthBuffer&&d.enable(4),N.skinning&&d.enable(5),N.morphTargets&&d.enable(6),N.morphNormals&&d.enable(7),N.morphColors&&d.enable(8),N.premultipliedAlpha&&d.enable(9),N.shadowMapEnabled&&d.enable(10),N.doubleSided&&d.enable(11),N.flipSided&&d.enable(12),N.useDepthPacking&&d.enable(13),N.dithering&&d.enable(14),N.transmission&&d.enable(15),N.sheen&&d.enable(16),N.opaque&&d.enable(17),N.pointsUvs&&d.enable(18),N.decodeVideoTexture&&d.enable(19),N.decodeVideoTextureEmissive&&d.enable(20),N.alphaToCoverage&&d.enable(21),N.numLightProbeGrids>0&&d.enable(22),N.hasPositionAttribute&&d.enable(23),T.push(d.mask)}function U(T){const N=M[T.type];let k;if(N){const G=Xi[N];k=$y.clone(G.uniforms)}else k=T.uniforms;return k}function A(T,N){let k=_.get(N);return k!==void 0?++k.usedTimes:(k=new bA(s,N,T,l),h.push(k),_.set(N,k)),k}function P(T){if(--T.usedTimes===0){const N=h.indexOf(T);h[N]=h[h.length-1],h.pop(),_.delete(T.cacheKey),T.destroy()}}function L(T){p.remove(T)}function B(){p.dispose()}return{getParameters:D,getProgramCacheKey:y,getUniforms:U,acquireProgram:A,releaseProgram:P,releaseShaderCache:L,programs:h,dispose:B}}function DA(){let s=new WeakMap;function e(d){return s.has(d)}function i(d){let p=s.get(d);return p===void 0&&(p={},s.set(d,p)),p}function r(d){s.delete(d)}function l(d,p,m){s.get(d)[p]=m}function c(){s=new WeakMap}return{has:e,get:i,remove:r,update:l,dispose:c}}function UA(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.materialVariant!==e.materialVariant?s.materialVariant-e.materialVariant:s.z!==e.z?s.z-e.z:s.id-e.id}function ov(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function lv(){const s=[];let e=0;const i=[],r=[],l=[];function c(){e=0,i.length=0,r.length=0,l.length=0}function d(g){let M=0;return g.isInstancedMesh&&(M+=2),g.isSkinnedMesh&&(M+=1),M}function p(g,M,b,D,y,S){let w=s[e];return w===void 0?(w={id:g.id,object:g,geometry:M,material:b,materialVariant:d(g),groupOrder:D,renderOrder:g.renderOrder,z:y,group:S},s[e]=w):(w.id=g.id,w.object=g,w.geometry=M,w.material=b,w.materialVariant=d(g),w.groupOrder=D,w.renderOrder=g.renderOrder,w.z=y,w.group=S),e++,w}function m(g,M,b,D,y,S){const w=p(g,M,b,D,y,S);b.transmission>0?r.push(w):b.transparent===!0?l.push(w):i.push(w)}function h(g,M,b,D,y,S){const w=p(g,M,b,D,y,S);b.transmission>0?r.unshift(w):b.transparent===!0?l.unshift(w):i.unshift(w)}function _(g,M,b){i.length>1&&i.sort(g||UA),r.length>1&&r.sort(M||ov),l.length>1&&l.sort(M||ov),b&&(i.reverse(),r.reverse(),l.reverse())}function x(){for(let g=e,M=s.length;g<M;g++){const b=s[g];if(b.id===null)break;b.id=null,b.object=null,b.geometry=null,b.material=null,b.group=null}}return{opaque:i,transmissive:r,transparent:l,init:c,push:m,unshift:h,finish:x,sort:_}}function NA(){let s=new WeakMap;function e(r,l){const c=s.get(r);let d;return c===void 0?(d=new lv,s.set(r,[d])):l>=c.length?(d=new lv,c.push(d)):d=c[l],d}function i(){s=new WeakMap}return{get:e,dispose:i}}function LA(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let i;switch(e.type){case"DirectionalLight":i={direction:new Q,color:new Et};break;case"SpotLight":i={position:new Q,direction:new Q,color:new Et,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new Q,color:new Et,distance:0,decay:0};break;case"HemisphereLight":i={direction:new Q,skyColor:new Et,groundColor:new Et};break;case"RectAreaLight":i={color:new Et,position:new Q,halfWidth:new Q,halfHeight:new Q};break}return s[e.id]=i,i}}}function OA(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let i;switch(e.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=i,i}}}let PA=0;function IA(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function BA(s){const e=new LA,i=OA(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)r.probe.push(new Q);const l=new Q,c=new fn,d=new fn;function p(h){let _=0,x=0,g=0;for(let N=0;N<9;N++)r.probe[N].set(0,0,0);let M=0,b=0,D=0,y=0,S=0,w=0,U=0,A=0,P=0,L=0,B=0;h.sort(IA);for(let N=0,k=h.length;N<k;N++){const G=h[N],Z=G.color,ce=G.intensity,le=G.distance;let Y=null;if(G.shadow&&G.shadow.map&&(G.shadow.map.texture.format===Hr?Y=G.shadow.map.texture:Y=G.shadow.map.depthTexture||G.shadow.map.texture),G.isAmbientLight)_+=Z.r*ce,x+=Z.g*ce,g+=Z.b*ce;else if(G.isLightProbe){for(let z=0;z<9;z++)r.probe[z].addScaledVector(G.sh.coefficients[z],ce);B++}else if(G.isDirectionalLight){const z=e.get(G);if(z.color.copy(G.color).multiplyScalar(G.intensity),G.castShadow){const F=G.shadow,te=i.get(G);te.shadowIntensity=F.intensity,te.shadowBias=F.bias,te.shadowNormalBias=F.normalBias,te.shadowRadius=F.radius,te.shadowMapSize=F.mapSize,r.directionalShadow[M]=te,r.directionalShadowMap[M]=Y,r.directionalShadowMatrix[M]=G.shadow.matrix,w++}r.directional[M]=z,M++}else if(G.isSpotLight){const z=e.get(G);z.position.setFromMatrixPosition(G.matrixWorld),z.color.copy(Z).multiplyScalar(ce),z.distance=le,z.coneCos=Math.cos(G.angle),z.penumbraCos=Math.cos(G.angle*(1-G.penumbra)),z.decay=G.decay,r.spot[D]=z;const F=G.shadow;if(G.map&&(r.spotLightMap[P]=G.map,P++,F.updateMatrices(G),G.castShadow&&L++),r.spotLightMatrix[D]=F.matrix,G.castShadow){const te=i.get(G);te.shadowIntensity=F.intensity,te.shadowBias=F.bias,te.shadowNormalBias=F.normalBias,te.shadowRadius=F.radius,te.shadowMapSize=F.mapSize,r.spotShadow[D]=te,r.spotShadowMap[D]=Y,A++}D++}else if(G.isRectAreaLight){const z=e.get(G);z.color.copy(Z).multiplyScalar(ce),z.halfWidth.set(G.width*.5,0,0),z.halfHeight.set(0,G.height*.5,0),r.rectArea[y]=z,y++}else if(G.isPointLight){const z=e.get(G);if(z.color.copy(G.color).multiplyScalar(G.intensity),z.distance=G.distance,z.decay=G.decay,G.castShadow){const F=G.shadow,te=i.get(G);te.shadowIntensity=F.intensity,te.shadowBias=F.bias,te.shadowNormalBias=F.normalBias,te.shadowRadius=F.radius,te.shadowMapSize=F.mapSize,te.shadowCameraNear=F.camera.near,te.shadowCameraFar=F.camera.far,r.pointShadow[b]=te,r.pointShadowMap[b]=Y,r.pointShadowMatrix[b]=G.shadow.matrix,U++}r.point[b]=z,b++}else if(G.isHemisphereLight){const z=e.get(G);z.skyColor.copy(G.color).multiplyScalar(ce),z.groundColor.copy(G.groundColor).multiplyScalar(ce),r.hemi[S]=z,S++}}y>0&&(s.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Pe.LTC_FLOAT_1,r.rectAreaLTC2=Pe.LTC_FLOAT_2):(r.rectAreaLTC1=Pe.LTC_HALF_1,r.rectAreaLTC2=Pe.LTC_HALF_2)),r.ambient[0]=_,r.ambient[1]=x,r.ambient[2]=g;const T=r.hash;(T.directionalLength!==M||T.pointLength!==b||T.spotLength!==D||T.rectAreaLength!==y||T.hemiLength!==S||T.numDirectionalShadows!==w||T.numPointShadows!==U||T.numSpotShadows!==A||T.numSpotMaps!==P||T.numLightProbes!==B)&&(r.directional.length=M,r.spot.length=D,r.rectArea.length=y,r.point.length=b,r.hemi.length=S,r.directionalShadow.length=w,r.directionalShadowMap.length=w,r.pointShadow.length=U,r.pointShadowMap.length=U,r.spotShadow.length=A,r.spotShadowMap.length=A,r.directionalShadowMatrix.length=w,r.pointShadowMatrix.length=U,r.spotLightMatrix.length=A+P-L,r.spotLightMap.length=P,r.numSpotLightShadowsWithMaps=L,r.numLightProbes=B,T.directionalLength=M,T.pointLength=b,T.spotLength=D,T.rectAreaLength=y,T.hemiLength=S,T.numDirectionalShadows=w,T.numPointShadows=U,T.numSpotShadows=A,T.numSpotMaps=P,T.numLightProbes=B,r.version=PA++)}function m(h,_){let x=0,g=0,M=0,b=0,D=0;const y=_.matrixWorldInverse;for(let S=0,w=h.length;S<w;S++){const U=h[S];if(U.isDirectionalLight){const A=r.directional[x];A.direction.setFromMatrixPosition(U.matrixWorld),l.setFromMatrixPosition(U.target.matrixWorld),A.direction.sub(l),A.direction.transformDirection(y),x++}else if(U.isSpotLight){const A=r.spot[M];A.position.setFromMatrixPosition(U.matrixWorld),A.position.applyMatrix4(y),A.direction.setFromMatrixPosition(U.matrixWorld),l.setFromMatrixPosition(U.target.matrixWorld),A.direction.sub(l),A.direction.transformDirection(y),M++}else if(U.isRectAreaLight){const A=r.rectArea[b];A.position.setFromMatrixPosition(U.matrixWorld),A.position.applyMatrix4(y),d.identity(),c.copy(U.matrixWorld),c.premultiply(y),d.extractRotation(c),A.halfWidth.set(U.width*.5,0,0),A.halfHeight.set(0,U.height*.5,0),A.halfWidth.applyMatrix4(d),A.halfHeight.applyMatrix4(d),b++}else if(U.isPointLight){const A=r.point[g];A.position.setFromMatrixPosition(U.matrixWorld),A.position.applyMatrix4(y),g++}else if(U.isHemisphereLight){const A=r.hemi[D];A.direction.setFromMatrixPosition(U.matrixWorld),A.direction.transformDirection(y),D++}}}return{setup:p,setupView:m,state:r}}function cv(s){const e=new BA(s),i=[],r=[],l=[];function c(g){x.camera=g,i.length=0,r.length=0,l.length=0}function d(g){i.push(g)}function p(g){r.push(g)}function m(g){l.push(g)}function h(){e.setup(i)}function _(g){e.setupView(i,g)}const x={lightsArray:i,shadowsArray:r,lightProbeGridArray:l,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:c,state:x,setupLights:h,setupLightsView:_,pushLight:d,pushShadow:p,pushLightProbeGrid:m}}function zA(s){let e=new WeakMap;function i(l,c=0){const d=e.get(l);let p;return d===void 0?(p=new cv(s),e.set(l,[p])):c>=d.length?(p=new cv(s),d.push(p)):p=d[c],p}function r(){e=new WeakMap}return{get:i,dispose:r}}const FA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,HA=`uniform sampler2D shadow_pass;
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
}`,GA=[new Q(1,0,0),new Q(-1,0,0),new Q(0,1,0),new Q(0,-1,0),new Q(0,0,1),new Q(0,0,-1)],VA=[new Q(0,-1,0),new Q(0,-1,0),new Q(0,0,1),new Q(0,0,-1),new Q(0,-1,0),new Q(0,-1,0)],uv=new fn,Ko=new Q,th=new Q;function kA(s,e,i){let r=new Hv;const l=new bt,c=new bt,d=new un,p=new iE,m=new aE,h={},_=i.maxTextureSize,x={[lr]:$n,[$n]:lr,[pi]:pi},g=new Ji({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new bt},radius:{value:4}},vertexShader:FA,fragmentShader:HA}),M=g.clone();M.defines.HORIZONTAL_PASS=1;const b=new nn;b.setAttribute("position",new Ki(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const D=new qt(b,g),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Xc;let S=this.type;this.render=function(L,B,T){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||L.length===0)return;this.type===DM&&(nt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Xc);const N=s.getRenderTarget(),k=s.getActiveCubeFace(),G=s.getActiveMipmapLevel(),Z=s.state;Z.setBlending(Ea),Z.buffers.depth.getReversed()===!0?Z.buffers.color.setClear(0,0,0,0):Z.buffers.color.setClear(1,1,1,1),Z.buffers.depth.setTest(!0),Z.setScissorTest(!1);const ce=S!==this.type;ce&&B.traverse(function(le){le.material&&(Array.isArray(le.material)?le.material.forEach(Y=>Y.needsUpdate=!0):le.material.needsUpdate=!0)});for(let le=0,Y=L.length;le<Y;le++){const z=L[le],F=z.shadow;if(F===void 0){nt("WebGLShadowMap:",z,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;l.copy(F.mapSize);const te=F.getFrameExtents();l.multiply(te),c.copy(F.mapSize),(l.x>_||l.y>_)&&(l.x>_&&(c.x=Math.floor(_/te.x),l.x=c.x*te.x,F.mapSize.x=c.x),l.y>_&&(c.y=Math.floor(_/te.y),l.y=c.y*te.y,F.mapSize.y=c.y));const ge=s.state.buffers.depth.getReversed();if(F.camera._reversedDepth=ge,F.map===null||ce===!0){if(F.map!==null&&(F.map.depthTexture!==null&&(F.map.depthTexture.dispose(),F.map.depthTexture=null),F.map.dispose()),this.type===Qo){if(z.isPointLight){nt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}F.map=new Zi(l.x,l.y,{format:Hr,type:Ta,minFilter:Hn,magFilter:Hn,generateMipmaps:!1}),F.map.texture.name=z.name+".shadowMap",F.map.depthTexture=new ks(l.x,l.y,Wi),F.map.depthTexture.name=z.name+".shadowMapDepth",F.map.depthTexture.format=Aa,F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=Ln,F.map.depthTexture.magFilter=Ln}else z.isPointLight?(F.map=new Qv(l.x),F.map.depthTexture=new Jy(l.x,Qi)):(F.map=new Zi(l.x,l.y),F.map.depthTexture=new ks(l.x,l.y,Qi)),F.map.depthTexture.name=z.name+".shadowMap",F.map.depthTexture.format=Aa,this.type===Xc?(F.map.depthTexture.compareFunction=ge?ap:ip,F.map.depthTexture.minFilter=Hn,F.map.depthTexture.magFilter=Hn):(F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=Ln,F.map.depthTexture.magFilter=Ln);F.camera.updateProjectionMatrix()}const Ee=F.map.isWebGLCubeRenderTarget?6:1;for(let I=0;I<Ee;I++){if(F.map.isWebGLCubeRenderTarget)s.setRenderTarget(F.map,I),s.clear();else{I===0&&(s.setRenderTarget(F.map),s.clear());const J=F.getViewport(I);d.set(c.x*J.x,c.y*J.y,c.x*J.z,c.y*J.w),Z.viewport(d)}if(z.isPointLight){const J=F.camera,ye=F.matrix,Re=z.distance||J.far;Re!==J.far&&(J.far=Re,J.updateProjectionMatrix()),Ko.setFromMatrixPosition(z.matrixWorld),J.position.copy(Ko),th.copy(J.position),th.add(GA[I]),J.up.copy(VA[I]),J.lookAt(th),J.updateMatrixWorld(),ye.makeTranslation(-Ko.x,-Ko.y,-Ko.z),uv.multiplyMatrices(J.projectionMatrix,J.matrixWorldInverse),F._frustum.setFromProjectionMatrix(uv,J.coordinateSystem,J.reversedDepth)}else F.updateMatrices(z);r=F.getFrustum(),A(B,T,F.camera,z,this.type)}F.isPointLightShadow!==!0&&this.type===Qo&&w(F,T),F.needsUpdate=!1}S=this.type,y.needsUpdate=!1,s.setRenderTarget(N,k,G)};function w(L,B){const T=e.update(D);g.defines.VSM_SAMPLES!==L.blurSamples&&(g.defines.VSM_SAMPLES=L.blurSamples,M.defines.VSM_SAMPLES=L.blurSamples,g.needsUpdate=!0,M.needsUpdate=!0),L.mapPass===null&&(L.mapPass=new Zi(l.x,l.y,{format:Hr,type:Ta})),g.uniforms.shadow_pass.value=L.map.depthTexture,g.uniforms.resolution.value=L.mapSize,g.uniforms.radius.value=L.radius,s.setRenderTarget(L.mapPass),s.clear(),s.renderBufferDirect(B,null,T,g,D,null),M.uniforms.shadow_pass.value=L.mapPass.texture,M.uniforms.resolution.value=L.mapSize,M.uniforms.radius.value=L.radius,s.setRenderTarget(L.map),s.clear(),s.renderBufferDirect(B,null,T,M,D,null)}function U(L,B,T,N){let k=null;const G=T.isPointLight===!0?L.customDistanceMaterial:L.customDepthMaterial;if(G!==void 0)k=G;else if(k=T.isPointLight===!0?m:p,s.localClippingEnabled&&B.clipShadows===!0&&Array.isArray(B.clippingPlanes)&&B.clippingPlanes.length!==0||B.displacementMap&&B.displacementScale!==0||B.alphaMap&&B.alphaTest>0||B.map&&B.alphaTest>0||B.alphaToCoverage===!0){const Z=k.uuid,ce=B.uuid;let le=h[Z];le===void 0&&(le={},h[Z]=le);let Y=le[ce];Y===void 0&&(Y=k.clone(),le[ce]=Y,B.addEventListener("dispose",P)),k=Y}if(k.visible=B.visible,k.wireframe=B.wireframe,N===Qo?k.side=B.shadowSide!==null?B.shadowSide:B.side:k.side=B.shadowSide!==null?B.shadowSide:x[B.side],k.alphaMap=B.alphaMap,k.alphaTest=B.alphaToCoverage===!0?.5:B.alphaTest,k.map=B.map,k.clipShadows=B.clipShadows,k.clippingPlanes=B.clippingPlanes,k.clipIntersection=B.clipIntersection,k.displacementMap=B.displacementMap,k.displacementScale=B.displacementScale,k.displacementBias=B.displacementBias,k.wireframeLinewidth=B.wireframeLinewidth,k.linewidth=B.linewidth,T.isPointLight===!0&&k.isMeshDistanceMaterial===!0){const Z=s.properties.get(k);Z.light=T}return k}function A(L,B,T,N,k){if(L.visible===!1)return;if(L.layers.test(B.layers)&&(L.isMesh||L.isLine||L.isPoints)&&(L.castShadow||L.receiveShadow&&k===Qo)&&(!L.frustumCulled||r.intersectsObject(L))){L.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,L.matrixWorld);const ce=e.update(L),le=L.material;if(Array.isArray(le)){const Y=ce.groups;for(let z=0,F=Y.length;z<F;z++){const te=Y[z],ge=le[te.materialIndex];if(ge&&ge.visible){const Ee=U(L,ge,N,k);L.onBeforeShadow(s,L,B,T,ce,Ee,te),s.renderBufferDirect(T,null,ce,Ee,L,te),L.onAfterShadow(s,L,B,T,ce,Ee,te)}}}else if(le.visible){const Y=U(L,le,N,k);L.onBeforeShadow(s,L,B,T,ce,Y,null),s.renderBufferDirect(T,null,ce,Y,L,null),L.onAfterShadow(s,L,B,T,ce,Y,null)}}const Z=L.children;for(let ce=0,le=Z.length;ce<le;ce++)A(Z[ce],B,T,N,k)}function P(L){L.target.removeEventListener("dispose",P);for(const T in h){const N=h[T],k=L.target.uuid;k in N&&(N[k].dispose(),delete N[k])}}}function XA(s,e){function i(){let X=!1;const Te=new un;let me=null;const Ce=new un(0,0,0,0);return{setMask:function(Be){me!==Be&&!X&&(s.colorMask(Be,Be,Be,Be),me=Be)},setLocked:function(Be){X=Be},setClear:function(Be,Se,qe,Ve,Jt){Jt===!0&&(Be*=Ve,Se*=Ve,qe*=Ve),Te.set(Be,Se,qe,Ve),Ce.equals(Te)===!1&&(s.clearColor(Be,Se,qe,Ve),Ce.copy(Te))},reset:function(){X=!1,me=null,Ce.set(-1,0,0,0)}}}function r(){let X=!1,Te=!1,me=null,Ce=null,Be=null;return{setReversed:function(Se){if(Te!==Se){const qe=e.get("EXT_clip_control");Se?qe.clipControlEXT(qe.LOWER_LEFT_EXT,qe.ZERO_TO_ONE_EXT):qe.clipControlEXT(qe.LOWER_LEFT_EXT,qe.NEGATIVE_ONE_TO_ONE_EXT),Te=Se;const Ve=Be;Be=null,this.setClear(Ve)}},getReversed:function(){return Te},setTest:function(Se){Se?Me(s.DEPTH_TEST):He(s.DEPTH_TEST)},setMask:function(Se){me!==Se&&!X&&(s.depthMask(Se),me=Se)},setFunc:function(Se){if(Te&&(Se=cy[Se]),Ce!==Se){switch(Se){case rh:s.depthFunc(s.NEVER);break;case sh:s.depthFunc(s.ALWAYS);break;case oh:s.depthFunc(s.LESS);break;case Gs:s.depthFunc(s.LEQUAL);break;case lh:s.depthFunc(s.EQUAL);break;case ch:s.depthFunc(s.GEQUAL);break;case uh:s.depthFunc(s.GREATER);break;case fh:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Ce=Se}},setLocked:function(Se){X=Se},setClear:function(Se){Be!==Se&&(Be=Se,Te&&(Se=1-Se),s.clearDepth(Se))},reset:function(){X=!1,me=null,Ce=null,Be=null,Te=!1}}}function l(){let X=!1,Te=null,me=null,Ce=null,Be=null,Se=null,qe=null,Ve=null,Jt=null;return{setTest:function(Nt){X||(Nt?Me(s.STENCIL_TEST):He(s.STENCIL_TEST))},setMask:function(Nt){Te!==Nt&&!X&&(s.stencilMask(Nt),Te=Nt)},setFunc:function(Nt,ei,ti){(me!==Nt||Ce!==ei||Be!==ti)&&(s.stencilFunc(Nt,ei,ti),me=Nt,Ce=ei,Be=ti)},setOp:function(Nt,ei,ti){(Se!==Nt||qe!==ei||Ve!==ti)&&(s.stencilOp(Nt,ei,ti),Se=Nt,qe=ei,Ve=ti)},setLocked:function(Nt){X=Nt},setClear:function(Nt){Jt!==Nt&&(s.clearStencil(Nt),Jt=Nt)},reset:function(){X=!1,Te=null,me=null,Ce=null,Be=null,Se=null,qe=null,Ve=null,Jt=null}}}const c=new i,d=new r,p=new l,m=new WeakMap,h=new WeakMap;let _={},x={},g={},M=new WeakMap,b=[],D=null,y=!1,S=null,w=null,U=null,A=null,P=null,L=null,B=null,T=new Et(0,0,0),N=0,k=!1,G=null,Z=null,ce=null,le=null,Y=null;const z=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let F=!1,te=0;const ge=s.getParameter(s.VERSION);ge.indexOf("WebGL")!==-1?(te=parseFloat(/^WebGL (\d)/.exec(ge)[1]),F=te>=1):ge.indexOf("OpenGL ES")!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(ge)[1]),F=te>=2);let Ee=null,I={};const J=s.getParameter(s.SCISSOR_BOX),ye=s.getParameter(s.VIEWPORT),Re=new un().fromArray(J),Ie=new un().fromArray(ye);function ae(X,Te,me,Ce){const Be=new Uint8Array(4),Se=s.createTexture();s.bindTexture(X,Se),s.texParameteri(X,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(X,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let qe=0;qe<me;qe++)X===s.TEXTURE_3D||X===s.TEXTURE_2D_ARRAY?s.texImage3D(Te,0,s.RGBA,1,1,Ce,0,s.RGBA,s.UNSIGNED_BYTE,Be):s.texImage2D(Te+qe,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Be);return Se}const xe={};xe[s.TEXTURE_2D]=ae(s.TEXTURE_2D,s.TEXTURE_2D,1),xe[s.TEXTURE_CUBE_MAP]=ae(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),xe[s.TEXTURE_2D_ARRAY]=ae(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),xe[s.TEXTURE_3D]=ae(s.TEXTURE_3D,s.TEXTURE_3D,1,1),c.setClear(0,0,0,1),d.setClear(1),p.setClear(0),Me(s.DEPTH_TEST),d.setFunc(Gs),an(!1),rn(s_),Me(s.CULL_FACE),St(Ea);function Me(X){_[X]!==!0&&(s.enable(X),_[X]=!0)}function He(X){_[X]!==!1&&(s.disable(X),_[X]=!1)}function it(X,Te){return g[X]!==Te?(s.bindFramebuffer(X,Te),g[X]=Te,X===s.DRAW_FRAMEBUFFER&&(g[s.FRAMEBUFFER]=Te),X===s.FRAMEBUFFER&&(g[s.DRAW_FRAMEBUFFER]=Te),!0):!1}function Je(X,Te){let me=b,Ce=!1;if(X){me=M.get(Te),me===void 0&&(me=[],M.set(Te,me));const Be=X.textures;if(me.length!==Be.length||me[0]!==s.COLOR_ATTACHMENT0){for(let Se=0,qe=Be.length;Se<qe;Se++)me[Se]=s.COLOR_ATTACHMENT0+Se;me.length=Be.length,Ce=!0}}else me[0]!==s.BACK&&(me[0]=s.BACK,Ce=!0);Ce&&s.drawBuffers(me)}function Zt(X){return D!==X?(s.useProgram(X),D=X,!0):!1}const ft={[Or]:s.FUNC_ADD,[NM]:s.FUNC_SUBTRACT,[LM]:s.FUNC_REVERSE_SUBTRACT};ft[OM]=s.MIN,ft[PM]=s.MAX;const xt={[IM]:s.ZERO,[BM]:s.ONE,[zM]:s.SRC_COLOR,[ih]:s.SRC_ALPHA,[XM]:s.SRC_ALPHA_SATURATE,[VM]:s.DST_COLOR,[HM]:s.DST_ALPHA,[FM]:s.ONE_MINUS_SRC_COLOR,[ah]:s.ONE_MINUS_SRC_ALPHA,[kM]:s.ONE_MINUS_DST_COLOR,[GM]:s.ONE_MINUS_DST_ALPHA,[WM]:s.CONSTANT_COLOR,[qM]:s.ONE_MINUS_CONSTANT_COLOR,[YM]:s.CONSTANT_ALPHA,[ZM]:s.ONE_MINUS_CONSTANT_ALPHA};function St(X,Te,me,Ce,Be,Se,qe,Ve,Jt,Nt){if(X===Ea){y===!0&&(He(s.BLEND),y=!1);return}if(y===!1&&(Me(s.BLEND),y=!0),X!==UM){if(X!==S||Nt!==k){if((w!==Or||P!==Or)&&(s.blendEquation(s.FUNC_ADD),w=Or,P=Or),Nt)switch(X){case Is:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case zr:s.blendFunc(s.ONE,s.ONE);break;case o_:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case l_:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Tt("WebGLState: Invalid blending: ",X);break}else switch(X){case Is:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case zr:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case o_:Tt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case l_:Tt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Tt("WebGLState: Invalid blending: ",X);break}U=null,A=null,L=null,B=null,T.set(0,0,0),N=0,S=X,k=Nt}return}Be=Be||Te,Se=Se||me,qe=qe||Ce,(Te!==w||Be!==P)&&(s.blendEquationSeparate(ft[Te],ft[Be]),w=Te,P=Be),(me!==U||Ce!==A||Se!==L||qe!==B)&&(s.blendFuncSeparate(xt[me],xt[Ce],xt[Se],xt[qe]),U=me,A=Ce,L=Se,B=qe),(Ve.equals(T)===!1||Jt!==N)&&(s.blendColor(Ve.r,Ve.g,Ve.b,Jt),T.copy(Ve),N=Jt),S=X,k=!1}function dt(X,Te){X.side===pi?He(s.CULL_FACE):Me(s.CULL_FACE);let me=X.side===$n;Te&&(me=!me),an(me),X.blending===Is&&X.transparent===!1?St(Ea):St(X.blending,X.blendEquation,X.blendSrc,X.blendDst,X.blendEquationAlpha,X.blendSrcAlpha,X.blendDstAlpha,X.blendColor,X.blendAlpha,X.premultipliedAlpha),d.setFunc(X.depthFunc),d.setTest(X.depthTest),d.setMask(X.depthWrite),c.setMask(X.colorWrite);const Ce=X.stencilWrite;p.setTest(Ce),Ce&&(p.setMask(X.stencilWriteMask),p.setFunc(X.stencilFunc,X.stencilRef,X.stencilFuncMask),p.setOp(X.stencilFail,X.stencilZFail,X.stencilZPass)),dn(X.polygonOffset,X.polygonOffsetFactor,X.polygonOffsetUnits),X.alphaToCoverage===!0?Me(s.SAMPLE_ALPHA_TO_COVERAGE):He(s.SAMPLE_ALPHA_TO_COVERAGE)}function an(X){G!==X&&(X?s.frontFace(s.CW):s.frontFace(s.CCW),G=X)}function rn(X){X!==CM?(Me(s.CULL_FACE),X!==Z&&(X===s_?s.cullFace(s.BACK):X===wM?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):He(s.CULL_FACE),Z=X}function sn(X){X!==ce&&(F&&s.lineWidth(X),ce=X)}function dn(X,Te,me){X?(Me(s.POLYGON_OFFSET_FILL),(le!==Te||Y!==me)&&(le=Te,Y=me,d.getReversed()&&(Te=-Te),s.polygonOffset(Te,me))):He(s.POLYGON_OFFSET_FILL)}function Wt(X){X?Me(s.SCISSOR_TEST):He(s.SCISSOR_TEST)}function on(X){X===void 0&&(X=s.TEXTURE0+z-1),Ee!==X&&(s.activeTexture(X),Ee=X)}function q(X,Te,me){me===void 0&&(Ee===null?me=s.TEXTURE0+z-1:me=Ee);let Ce=I[me];Ce===void 0&&(Ce={type:void 0,texture:void 0},I[me]=Ce),(Ce.type!==X||Ce.texture!==Te)&&(Ee!==me&&(s.activeTexture(me),Ee=me),s.bindTexture(X,Te||xe[X]),Ce.type=X,Ce.texture=Te)}function Ft(){const X=I[Ee];X!==void 0&&X.type!==void 0&&(s.bindTexture(X.type,null),X.type=void 0,X.texture=void 0)}function wt(){try{s.compressedTexImage2D(...arguments)}catch(X){Tt("WebGLState:",X)}}function O(){try{s.compressedTexImage3D(...arguments)}catch(X){Tt("WebGLState:",X)}}function E(){try{s.texSubImage2D(...arguments)}catch(X){Tt("WebGLState:",X)}}function j(){try{s.texSubImage3D(...arguments)}catch(X){Tt("WebGLState:",X)}}function re(){try{s.compressedTexSubImage2D(...arguments)}catch(X){Tt("WebGLState:",X)}}function de(){try{s.compressedTexSubImage3D(...arguments)}catch(X){Tt("WebGLState:",X)}}function be(){try{s.texStorage2D(...arguments)}catch(X){Tt("WebGLState:",X)}}function De(){try{s.texStorage3D(...arguments)}catch(X){Tt("WebGLState:",X)}}function fe(){try{s.texImage2D(...arguments)}catch(X){Tt("WebGLState:",X)}}function he(){try{s.texImage3D(...arguments)}catch(X){Tt("WebGLState:",X)}}function Ae(X){return x[X]!==void 0?x[X]:s.getParameter(X)}function ze(X,Te){x[X]!==Te&&(s.pixelStorei(X,Te),x[X]=Te)}function Le(X){Re.equals(X)===!1&&(s.scissor(X.x,X.y,X.z,X.w),Re.copy(X))}function Ue(X){Ie.equals(X)===!1&&(s.viewport(X.x,X.y,X.z,X.w),Ie.copy(X))}function Ke(X,Te){let me=h.get(Te);me===void 0&&(me=new WeakMap,h.set(Te,me));let Ce=me.get(X);Ce===void 0&&(Ce=s.getUniformBlockIndex(Te,X.name),me.set(X,Ce))}function je(X,Te){const Ce=h.get(Te).get(X);m.get(Te)!==Ce&&(s.uniformBlockBinding(Te,Ce,X.__bindingPointIndex),m.set(Te,Ce))}function at(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),d.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),_={},x={},Ee=null,I={},g={},M=new WeakMap,b=[],D=null,y=!1,S=null,w=null,U=null,A=null,P=null,L=null,B=null,T=new Et(0,0,0),N=0,k=!1,G=null,Z=null,ce=null,le=null,Y=null,Re.set(0,0,s.canvas.width,s.canvas.height),Ie.set(0,0,s.canvas.width,s.canvas.height),c.reset(),d.reset(),p.reset()}return{buffers:{color:c,depth:d,stencil:p},enable:Me,disable:He,bindFramebuffer:it,drawBuffers:Je,useProgram:Zt,setBlending:St,setMaterial:dt,setFlipSided:an,setCullFace:rn,setLineWidth:sn,setPolygonOffset:dn,setScissorTest:Wt,activeTexture:on,bindTexture:q,unbindTexture:Ft,compressedTexImage2D:wt,compressedTexImage3D:O,texImage2D:fe,texImage3D:he,pixelStorei:ze,getParameter:Ae,updateUBOMapping:Ke,uniformBlockBinding:je,texStorage2D:be,texStorage3D:De,texSubImage2D:E,texSubImage3D:j,compressedTexSubImage2D:re,compressedTexSubImage3D:de,scissor:Le,viewport:Ue,reset:at}}function WA(s,e,i,r,l,c,d){const p=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new bt,_=new WeakMap,x=new Set;let g;const M=new WeakMap;let b=!1;try{b=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function D(O,E){return b?new OffscreenCanvas(O,E):tu("canvas")}function y(O,E,j){let re=1;const de=wt(O);if((de.width>j||de.height>j)&&(re=j/Math.max(de.width,de.height)),re<1)if(typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&O instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&O instanceof ImageBitmap||typeof VideoFrame<"u"&&O instanceof VideoFrame){const be=Math.floor(re*de.width),De=Math.floor(re*de.height);g===void 0&&(g=D(be,De));const fe=E?D(be,De):g;return fe.width=be,fe.height=De,fe.getContext("2d").drawImage(O,0,0,be,De),nt("WebGLRenderer: Texture has been resized from ("+de.width+"x"+de.height+") to ("+be+"x"+De+")."),fe}else return"data"in O&&nt("WebGLRenderer: Image in DataTexture is too big ("+de.width+"x"+de.height+")."),O;return O}function S(O){return O.generateMipmaps}function w(O){s.generateMipmap(O)}function U(O){return O.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:O.isWebGL3DRenderTarget?s.TEXTURE_3D:O.isWebGLArrayRenderTarget||O.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function A(O,E,j,re,de,be=!1){if(O!==null){if(s[O]!==void 0)return s[O];nt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+O+"'")}let De;re&&(De=e.get("EXT_texture_norm16"),De||nt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let fe=E;if(E===s.RED&&(j===s.FLOAT&&(fe=s.R32F),j===s.HALF_FLOAT&&(fe=s.R16F),j===s.UNSIGNED_BYTE&&(fe=s.R8),j===s.UNSIGNED_SHORT&&De&&(fe=De.R16_EXT),j===s.SHORT&&De&&(fe=De.R16_SNORM_EXT)),E===s.RED_INTEGER&&(j===s.UNSIGNED_BYTE&&(fe=s.R8UI),j===s.UNSIGNED_SHORT&&(fe=s.R16UI),j===s.UNSIGNED_INT&&(fe=s.R32UI),j===s.BYTE&&(fe=s.R8I),j===s.SHORT&&(fe=s.R16I),j===s.INT&&(fe=s.R32I)),E===s.RG&&(j===s.FLOAT&&(fe=s.RG32F),j===s.HALF_FLOAT&&(fe=s.RG16F),j===s.UNSIGNED_BYTE&&(fe=s.RG8),j===s.UNSIGNED_SHORT&&De&&(fe=De.RG16_EXT),j===s.SHORT&&De&&(fe=De.RG16_SNORM_EXT)),E===s.RG_INTEGER&&(j===s.UNSIGNED_BYTE&&(fe=s.RG8UI),j===s.UNSIGNED_SHORT&&(fe=s.RG16UI),j===s.UNSIGNED_INT&&(fe=s.RG32UI),j===s.BYTE&&(fe=s.RG8I),j===s.SHORT&&(fe=s.RG16I),j===s.INT&&(fe=s.RG32I)),E===s.RGB_INTEGER&&(j===s.UNSIGNED_BYTE&&(fe=s.RGB8UI),j===s.UNSIGNED_SHORT&&(fe=s.RGB16UI),j===s.UNSIGNED_INT&&(fe=s.RGB32UI),j===s.BYTE&&(fe=s.RGB8I),j===s.SHORT&&(fe=s.RGB16I),j===s.INT&&(fe=s.RGB32I)),E===s.RGBA_INTEGER&&(j===s.UNSIGNED_BYTE&&(fe=s.RGBA8UI),j===s.UNSIGNED_SHORT&&(fe=s.RGBA16UI),j===s.UNSIGNED_INT&&(fe=s.RGBA32UI),j===s.BYTE&&(fe=s.RGBA8I),j===s.SHORT&&(fe=s.RGBA16I),j===s.INT&&(fe=s.RGBA32I)),E===s.RGB&&(j===s.UNSIGNED_SHORT&&De&&(fe=De.RGB16_EXT),j===s.SHORT&&De&&(fe=De.RGB16_SNORM_EXT),j===s.UNSIGNED_INT_5_9_9_9_REV&&(fe=s.RGB9_E5),j===s.UNSIGNED_INT_10F_11F_11F_REV&&(fe=s.R11F_G11F_B10F)),E===s.RGBA){const he=be?$c:yt.getTransfer(de);j===s.FLOAT&&(fe=s.RGBA32F),j===s.HALF_FLOAT&&(fe=s.RGBA16F),j===s.UNSIGNED_BYTE&&(fe=he===zt?s.SRGB8_ALPHA8:s.RGBA8),j===s.UNSIGNED_SHORT&&De&&(fe=De.RGBA16_EXT),j===s.SHORT&&De&&(fe=De.RGBA16_SNORM_EXT),j===s.UNSIGNED_SHORT_4_4_4_4&&(fe=s.RGBA4),j===s.UNSIGNED_SHORT_5_5_5_1&&(fe=s.RGB5_A1)}return(fe===s.R16F||fe===s.R32F||fe===s.RG16F||fe===s.RG32F||fe===s.RGBA16F||fe===s.RGBA32F)&&e.get("EXT_color_buffer_float"),fe}function P(O,E){let j;return O?E===null||E===Qi||E===el?j=s.DEPTH24_STENCIL8:E===Wi?j=s.DEPTH32F_STENCIL8:E===$o&&(j=s.DEPTH24_STENCIL8,nt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Qi||E===el?j=s.DEPTH_COMPONENT24:E===Wi?j=s.DEPTH_COMPONENT32F:E===$o&&(j=s.DEPTH_COMPONENT16),j}function L(O,E){return S(O)===!0||O.isFramebufferTexture&&O.minFilter!==Ln&&O.minFilter!==Hn?Math.log2(Math.max(E.width,E.height))+1:O.mipmaps!==void 0&&O.mipmaps.length>0?O.mipmaps.length:O.isCompressedTexture&&Array.isArray(O.image)?E.mipmaps.length:1}function B(O){const E=O.target;E.removeEventListener("dispose",B),N(E),E.isVideoTexture&&_.delete(E),E.isHTMLTexture&&x.delete(E)}function T(O){const E=O.target;E.removeEventListener("dispose",T),G(E)}function N(O){const E=r.get(O);if(E.__webglInit===void 0)return;const j=O.source,re=M.get(j);if(re){const de=re[E.__cacheKey];de.usedTimes--,de.usedTimes===0&&k(O),Object.keys(re).length===0&&M.delete(j)}r.remove(O)}function k(O){const E=r.get(O);s.deleteTexture(E.__webglTexture);const j=O.source,re=M.get(j);delete re[E.__cacheKey],d.memory.textures--}function G(O){const E=r.get(O);if(O.depthTexture&&(O.depthTexture.dispose(),r.remove(O.depthTexture)),O.isWebGLCubeRenderTarget)for(let re=0;re<6;re++){if(Array.isArray(E.__webglFramebuffer[re]))for(let de=0;de<E.__webglFramebuffer[re].length;de++)s.deleteFramebuffer(E.__webglFramebuffer[re][de]);else s.deleteFramebuffer(E.__webglFramebuffer[re]);E.__webglDepthbuffer&&s.deleteRenderbuffer(E.__webglDepthbuffer[re])}else{if(Array.isArray(E.__webglFramebuffer))for(let re=0;re<E.__webglFramebuffer.length;re++)s.deleteFramebuffer(E.__webglFramebuffer[re]);else s.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&s.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&s.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let re=0;re<E.__webglColorRenderbuffer.length;re++)E.__webglColorRenderbuffer[re]&&s.deleteRenderbuffer(E.__webglColorRenderbuffer[re]);E.__webglDepthRenderbuffer&&s.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const j=O.textures;for(let re=0,de=j.length;re<de;re++){const be=r.get(j[re]);be.__webglTexture&&(s.deleteTexture(be.__webglTexture),d.memory.textures--),r.remove(j[re])}r.remove(O)}let Z=0;function ce(){Z=0}function le(){return Z}function Y(O){Z=O}function z(){const O=Z;return O>=l.maxTextures&&nt("WebGLTextures: Trying to use "+O+" texture units while this GPU supports only "+l.maxTextures),Z+=1,O}function F(O){const E=[];return E.push(O.wrapS),E.push(O.wrapT),E.push(O.wrapR||0),E.push(O.magFilter),E.push(O.minFilter),E.push(O.anisotropy),E.push(O.internalFormat),E.push(O.format),E.push(O.type),E.push(O.generateMipmaps),E.push(O.premultiplyAlpha),E.push(O.flipY),E.push(O.unpackAlignment),E.push(O.colorSpace),E.join()}function te(O,E){const j=r.get(O);if(O.isVideoTexture&&q(O),O.isRenderTargetTexture===!1&&O.isExternalTexture!==!0&&O.version>0&&j.__version!==O.version){const re=O.image;if(re===null)nt("WebGLRenderer: Texture marked for update but no image data found.");else if(re.complete===!1)nt("WebGLRenderer: Texture marked for update but image is incomplete");else{He(j,O,E);return}}else O.isExternalTexture&&(j.__webglTexture=O.sourceTexture?O.sourceTexture:null);i.bindTexture(s.TEXTURE_2D,j.__webglTexture,s.TEXTURE0+E)}function ge(O,E){const j=r.get(O);if(O.isRenderTargetTexture===!1&&O.version>0&&j.__version!==O.version){He(j,O,E);return}else O.isExternalTexture&&(j.__webglTexture=O.sourceTexture?O.sourceTexture:null);i.bindTexture(s.TEXTURE_2D_ARRAY,j.__webglTexture,s.TEXTURE0+E)}function Ee(O,E){const j=r.get(O);if(O.isRenderTargetTexture===!1&&O.version>0&&j.__version!==O.version){He(j,O,E);return}i.bindTexture(s.TEXTURE_3D,j.__webglTexture,s.TEXTURE0+E)}function I(O,E){const j=r.get(O);if(O.isCubeDepthTexture!==!0&&O.version>0&&j.__version!==O.version){it(j,O,E);return}i.bindTexture(s.TEXTURE_CUBE_MAP,j.__webglTexture,s.TEXTURE0+E)}const J={[dh]:s.REPEAT,[ya]:s.CLAMP_TO_EDGE,[hh]:s.MIRRORED_REPEAT},ye={[Ln]:s.NEAREST,[JM]:s.NEAREST_MIPMAP_NEAREST,[mc]:s.NEAREST_MIPMAP_LINEAR,[Hn]:s.LINEAR,[Td]:s.LINEAR_MIPMAP_NEAREST,[Ir]:s.LINEAR_MIPMAP_LINEAR},Re={[ey]:s.NEVER,[ry]:s.ALWAYS,[ty]:s.LESS,[ip]:s.LEQUAL,[ny]:s.EQUAL,[ap]:s.GEQUAL,[iy]:s.GREATER,[ay]:s.NOTEQUAL};function Ie(O,E){if(E.type===Wi&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===Hn||E.magFilter===Td||E.magFilter===mc||E.magFilter===Ir||E.minFilter===Hn||E.minFilter===Td||E.minFilter===mc||E.minFilter===Ir)&&nt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(O,s.TEXTURE_WRAP_S,J[E.wrapS]),s.texParameteri(O,s.TEXTURE_WRAP_T,J[E.wrapT]),(O===s.TEXTURE_3D||O===s.TEXTURE_2D_ARRAY)&&s.texParameteri(O,s.TEXTURE_WRAP_R,J[E.wrapR]),s.texParameteri(O,s.TEXTURE_MAG_FILTER,ye[E.magFilter]),s.texParameteri(O,s.TEXTURE_MIN_FILTER,ye[E.minFilter]),E.compareFunction&&(s.texParameteri(O,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(O,s.TEXTURE_COMPARE_FUNC,Re[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Ln||E.minFilter!==mc&&E.minFilter!==Ir||E.type===Wi&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||r.get(E).__currentAnisotropy){const j=e.get("EXT_texture_filter_anisotropic");s.texParameterf(O,j.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,l.getMaxAnisotropy())),r.get(E).__currentAnisotropy=E.anisotropy}}}function ae(O,E){let j=!1;O.__webglInit===void 0&&(O.__webglInit=!0,E.addEventListener("dispose",B));const re=E.source;let de=M.get(re);de===void 0&&(de={},M.set(re,de));const be=F(E);if(be!==O.__cacheKey){de[be]===void 0&&(de[be]={texture:s.createTexture(),usedTimes:0},d.memory.textures++,j=!0),de[be].usedTimes++;const De=de[O.__cacheKey];De!==void 0&&(de[O.__cacheKey].usedTimes--,De.usedTimes===0&&k(E)),O.__cacheKey=be,O.__webglTexture=de[be].texture}return j}function xe(O,E,j){return Math.floor(Math.floor(O/j)/E)}function Me(O,E,j,re){const be=O.updateRanges;if(be.length===0)i.texSubImage2D(s.TEXTURE_2D,0,0,0,E.width,E.height,j,re,E.data);else{be.sort((ze,Le)=>ze.start-Le.start);let De=0;for(let ze=1;ze<be.length;ze++){const Le=be[De],Ue=be[ze],Ke=Le.start+Le.count,je=xe(Ue.start,E.width,4),at=xe(Le.start,E.width,4);Ue.start<=Ke+1&&je===at&&xe(Ue.start+Ue.count-1,E.width,4)===je?Le.count=Math.max(Le.count,Ue.start+Ue.count-Le.start):(++De,be[De]=Ue)}be.length=De+1;const fe=i.getParameter(s.UNPACK_ROW_LENGTH),he=i.getParameter(s.UNPACK_SKIP_PIXELS),Ae=i.getParameter(s.UNPACK_SKIP_ROWS);i.pixelStorei(s.UNPACK_ROW_LENGTH,E.width);for(let ze=0,Le=be.length;ze<Le;ze++){const Ue=be[ze],Ke=Math.floor(Ue.start/4),je=Math.ceil(Ue.count/4),at=Ke%E.width,X=Math.floor(Ke/E.width),Te=je,me=1;i.pixelStorei(s.UNPACK_SKIP_PIXELS,at),i.pixelStorei(s.UNPACK_SKIP_ROWS,X),i.texSubImage2D(s.TEXTURE_2D,0,at,X,Te,me,j,re,E.data)}O.clearUpdateRanges(),i.pixelStorei(s.UNPACK_ROW_LENGTH,fe),i.pixelStorei(s.UNPACK_SKIP_PIXELS,he),i.pixelStorei(s.UNPACK_SKIP_ROWS,Ae)}}function He(O,E,j){let re=s.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(re=s.TEXTURE_2D_ARRAY),E.isData3DTexture&&(re=s.TEXTURE_3D);const de=ae(O,E),be=E.source;i.bindTexture(re,O.__webglTexture,s.TEXTURE0+j);const De=r.get(be);if(be.version!==De.__version||de===!0){if(i.activeTexture(s.TEXTURE0+j),(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)===!1){const me=yt.getPrimaries(yt.workingColorSpace),Ce=E.colorSpace===sr?null:yt.getPrimaries(E.colorSpace),Be=E.colorSpace===sr||me===Ce?s.NONE:s.BROWSER_DEFAULT_WEBGL;i.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Be)}i.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment);let he=y(E.image,!1,l.maxTextureSize);he=Ft(E,he);const Ae=c.convert(E.format,E.colorSpace),ze=c.convert(E.type);let Le=A(E.internalFormat,Ae,ze,E.normalized,E.colorSpace,E.isVideoTexture);Ie(re,E);let Ue;const Ke=E.mipmaps,je=E.isVideoTexture!==!0,at=De.__version===void 0||de===!0,X=be.dataReady,Te=L(E,he);if(E.isDepthTexture)Le=P(E.format===Br,E.type),at&&(je?i.texStorage2D(s.TEXTURE_2D,1,Le,he.width,he.height):i.texImage2D(s.TEXTURE_2D,0,Le,he.width,he.height,0,Ae,ze,null));else if(E.isDataTexture)if(Ke.length>0){je&&at&&i.texStorage2D(s.TEXTURE_2D,Te,Le,Ke[0].width,Ke[0].height);for(let me=0,Ce=Ke.length;me<Ce;me++)Ue=Ke[me],je?X&&i.texSubImage2D(s.TEXTURE_2D,me,0,0,Ue.width,Ue.height,Ae,ze,Ue.data):i.texImage2D(s.TEXTURE_2D,me,Le,Ue.width,Ue.height,0,Ae,ze,Ue.data);E.generateMipmaps=!1}else je?(at&&i.texStorage2D(s.TEXTURE_2D,Te,Le,he.width,he.height),X&&Me(E,he,Ae,ze)):i.texImage2D(s.TEXTURE_2D,0,Le,he.width,he.height,0,Ae,ze,he.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){je&&at&&i.texStorage3D(s.TEXTURE_2D_ARRAY,Te,Le,Ke[0].width,Ke[0].height,he.depth);for(let me=0,Ce=Ke.length;me<Ce;me++)if(Ue=Ke[me],E.format!==Pi)if(Ae!==null)if(je){if(X)if(E.layerUpdates.size>0){const Be=G_(Ue.width,Ue.height,E.format,E.type);for(const Se of E.layerUpdates){const qe=Ue.data.subarray(Se*Be/Ue.data.BYTES_PER_ELEMENT,(Se+1)*Be/Ue.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,me,0,0,Se,Ue.width,Ue.height,1,Ae,qe)}E.clearLayerUpdates()}else i.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,me,0,0,0,Ue.width,Ue.height,he.depth,Ae,Ue.data)}else i.compressedTexImage3D(s.TEXTURE_2D_ARRAY,me,Le,Ue.width,Ue.height,he.depth,0,Ue.data,0,0);else nt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else je?X&&i.texSubImage3D(s.TEXTURE_2D_ARRAY,me,0,0,0,Ue.width,Ue.height,he.depth,Ae,ze,Ue.data):i.texImage3D(s.TEXTURE_2D_ARRAY,me,Le,Ue.width,Ue.height,he.depth,0,Ae,ze,Ue.data)}else{je&&at&&i.texStorage2D(s.TEXTURE_2D,Te,Le,Ke[0].width,Ke[0].height);for(let me=0,Ce=Ke.length;me<Ce;me++)Ue=Ke[me],E.format!==Pi?Ae!==null?je?X&&i.compressedTexSubImage2D(s.TEXTURE_2D,me,0,0,Ue.width,Ue.height,Ae,Ue.data):i.compressedTexImage2D(s.TEXTURE_2D,me,Le,Ue.width,Ue.height,0,Ue.data):nt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):je?X&&i.texSubImage2D(s.TEXTURE_2D,me,0,0,Ue.width,Ue.height,Ae,ze,Ue.data):i.texImage2D(s.TEXTURE_2D,me,Le,Ue.width,Ue.height,0,Ae,ze,Ue.data)}else if(E.isDataArrayTexture)if(je){if(at&&i.texStorage3D(s.TEXTURE_2D_ARRAY,Te,Le,he.width,he.height,he.depth),X)if(E.layerUpdates.size>0){const me=G_(he.width,he.height,E.format,E.type);for(const Ce of E.layerUpdates){const Be=he.data.subarray(Ce*me/he.data.BYTES_PER_ELEMENT,(Ce+1)*me/he.data.BYTES_PER_ELEMENT);i.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,Ce,he.width,he.height,1,Ae,ze,Be)}E.clearLayerUpdates()}else i.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,he.width,he.height,he.depth,Ae,ze,he.data)}else i.texImage3D(s.TEXTURE_2D_ARRAY,0,Le,he.width,he.height,he.depth,0,Ae,ze,he.data);else if(E.isData3DTexture)je?(at&&i.texStorage3D(s.TEXTURE_3D,Te,Le,he.width,he.height,he.depth),X&&i.texSubImage3D(s.TEXTURE_3D,0,0,0,0,he.width,he.height,he.depth,Ae,ze,he.data)):i.texImage3D(s.TEXTURE_3D,0,Le,he.width,he.height,he.depth,0,Ae,ze,he.data);else if(E.isFramebufferTexture){if(at)if(je)i.texStorage2D(s.TEXTURE_2D,Te,Le,he.width,he.height);else{let me=he.width,Ce=he.height;for(let Be=0;Be<Te;Be++)i.texImage2D(s.TEXTURE_2D,Be,Le,me,Ce,0,Ae,ze,null),me>>=1,Ce>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in s){const me=s.canvas;if(me.hasAttribute("layoutsubtree")||me.setAttribute("layoutsubtree","true"),he.parentNode!==me){me.appendChild(he),x.add(E),me.onpaint=Ce=>{const Be=Ce.changedElements;for(const Se of x)Be.includes(Se.image)&&(Se.needsUpdate=!0)},me.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,he);else{const Be=s.RGBA,Se=s.RGBA,qe=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,Be,Se,qe,he)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(Ke.length>0){if(je&&at){const me=wt(Ke[0]);i.texStorage2D(s.TEXTURE_2D,Te,Le,me.width,me.height)}for(let me=0,Ce=Ke.length;me<Ce;me++)Ue=Ke[me],je?X&&i.texSubImage2D(s.TEXTURE_2D,me,0,0,Ae,ze,Ue):i.texImage2D(s.TEXTURE_2D,me,Le,Ae,ze,Ue);E.generateMipmaps=!1}else if(je){if(at){const me=wt(he);i.texStorage2D(s.TEXTURE_2D,Te,Le,me.width,me.height)}X&&i.texSubImage2D(s.TEXTURE_2D,0,0,0,Ae,ze,he)}else i.texImage2D(s.TEXTURE_2D,0,Le,Ae,ze,he);S(E)&&w(re),De.__version=be.version,E.onUpdate&&E.onUpdate(E)}O.__version=E.version}function it(O,E,j){if(E.image.length!==6)return;const re=ae(O,E),de=E.source;i.bindTexture(s.TEXTURE_CUBE_MAP,O.__webglTexture,s.TEXTURE0+j);const be=r.get(de);if(de.version!==be.__version||re===!0){i.activeTexture(s.TEXTURE0+j);const De=yt.getPrimaries(yt.workingColorSpace),fe=E.colorSpace===sr?null:yt.getPrimaries(E.colorSpace),he=E.colorSpace===sr||De===fe?s.NONE:s.BROWSER_DEFAULT_WEBGL;i.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);const Ae=E.isCompressedTexture||E.image[0].isCompressedTexture,ze=E.image[0]&&E.image[0].isDataTexture,Le=[];for(let Se=0;Se<6;Se++)!Ae&&!ze?Le[Se]=y(E.image[Se],!0,l.maxCubemapSize):Le[Se]=ze?E.image[Se].image:E.image[Se],Le[Se]=Ft(E,Le[Se]);const Ue=Le[0],Ke=c.convert(E.format,E.colorSpace),je=c.convert(E.type),at=A(E.internalFormat,Ke,je,E.normalized,E.colorSpace),X=E.isVideoTexture!==!0,Te=be.__version===void 0||re===!0,me=de.dataReady;let Ce=L(E,Ue);Ie(s.TEXTURE_CUBE_MAP,E);let Be;if(Ae){X&&Te&&i.texStorage2D(s.TEXTURE_CUBE_MAP,Ce,at,Ue.width,Ue.height);for(let Se=0;Se<6;Se++){Be=Le[Se].mipmaps;for(let qe=0;qe<Be.length;qe++){const Ve=Be[qe];E.format!==Pi?Ke!==null?X?me&&i.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Se,qe,0,0,Ve.width,Ve.height,Ke,Ve.data):i.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Se,qe,at,Ve.width,Ve.height,0,Ve.data):nt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):X?me&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Se,qe,0,0,Ve.width,Ve.height,Ke,je,Ve.data):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Se,qe,at,Ve.width,Ve.height,0,Ke,je,Ve.data)}}}else{if(Be=E.mipmaps,X&&Te){Be.length>0&&Ce++;const Se=wt(Le[0]);i.texStorage2D(s.TEXTURE_CUBE_MAP,Ce,at,Se.width,Se.height)}for(let Se=0;Se<6;Se++)if(ze){X?me&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,0,0,Le[Se].width,Le[Se].height,Ke,je,Le[Se].data):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,at,Le[Se].width,Le[Se].height,0,Ke,je,Le[Se].data);for(let qe=0;qe<Be.length;qe++){const Jt=Be[qe].image[Se].image;X?me&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Se,qe+1,0,0,Jt.width,Jt.height,Ke,je,Jt.data):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Se,qe+1,at,Jt.width,Jt.height,0,Ke,je,Jt.data)}}else{X?me&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,0,0,Ke,je,Le[Se]):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,at,Ke,je,Le[Se]);for(let qe=0;qe<Be.length;qe++){const Ve=Be[qe];X?me&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Se,qe+1,0,0,Ke,je,Ve.image[Se]):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Se,qe+1,at,Ke,je,Ve.image[Se])}}}S(E)&&w(s.TEXTURE_CUBE_MAP),be.__version=de.version,E.onUpdate&&E.onUpdate(E)}O.__version=E.version}function Je(O,E,j,re,de,be){const De=c.convert(j.format,j.colorSpace),fe=c.convert(j.type),he=A(j.internalFormat,De,fe,j.normalized,j.colorSpace),Ae=r.get(E),ze=r.get(j);if(ze.__renderTarget=E,!Ae.__hasExternalTextures){const Le=Math.max(1,E.width>>be),Ue=Math.max(1,E.height>>be);de===s.TEXTURE_3D||de===s.TEXTURE_2D_ARRAY?i.texImage3D(de,be,he,Le,Ue,E.depth,0,De,fe,null):i.texImage2D(de,be,he,Le,Ue,0,De,fe,null)}i.bindFramebuffer(s.FRAMEBUFFER,O),on(E)?p.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,re,de,ze.__webglTexture,0,Wt(E)):(de===s.TEXTURE_2D||de>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&de<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,re,de,ze.__webglTexture,be),i.bindFramebuffer(s.FRAMEBUFFER,null)}function Zt(O,E,j){if(s.bindRenderbuffer(s.RENDERBUFFER,O),E.depthBuffer){const re=E.depthTexture,de=re&&re.isDepthTexture?re.type:null,be=P(E.stencilBuffer,de),De=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;on(E)?p.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Wt(E),be,E.width,E.height):j?s.renderbufferStorageMultisample(s.RENDERBUFFER,Wt(E),be,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,be,E.width,E.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,De,s.RENDERBUFFER,O)}else{const re=E.textures;for(let de=0;de<re.length;de++){const be=re[de],De=c.convert(be.format,be.colorSpace),fe=c.convert(be.type),he=A(be.internalFormat,De,fe,be.normalized,be.colorSpace);on(E)?p.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Wt(E),he,E.width,E.height):j?s.renderbufferStorageMultisample(s.RENDERBUFFER,Wt(E),he,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,he,E.width,E.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function ft(O,E,j){const re=E.isWebGLCubeRenderTarget===!0;if(i.bindFramebuffer(s.FRAMEBUFFER,O),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const de=r.get(E.depthTexture);if(de.__renderTarget=E,(!de.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),re){if(de.__webglInit===void 0&&(de.__webglInit=!0,E.depthTexture.addEventListener("dispose",B)),de.__webglTexture===void 0){de.__webglTexture=s.createTexture(),i.bindTexture(s.TEXTURE_CUBE_MAP,de.__webglTexture),Ie(s.TEXTURE_CUBE_MAP,E.depthTexture);const Ae=c.convert(E.depthTexture.format),ze=c.convert(E.depthTexture.type);let Le;E.depthTexture.format===Aa?Le=s.DEPTH_COMPONENT24:E.depthTexture.format===Br&&(Le=s.DEPTH24_STENCIL8);for(let Ue=0;Ue<6;Ue++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ue,0,Le,E.width,E.height,0,Ae,ze,null)}}else te(E.depthTexture,0);const be=de.__webglTexture,De=Wt(E),fe=re?s.TEXTURE_CUBE_MAP_POSITIVE_X+j:s.TEXTURE_2D,he=E.depthTexture.format===Br?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(E.depthTexture.format===Aa)on(E)?p.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,he,fe,be,0,De):s.framebufferTexture2D(s.FRAMEBUFFER,he,fe,be,0);else if(E.depthTexture.format===Br)on(E)?p.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,he,fe,be,0,De):s.framebufferTexture2D(s.FRAMEBUFFER,he,fe,be,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function xt(O){const E=r.get(O),j=O.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==O.depthTexture){const re=O.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),re){const de=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,re.removeEventListener("dispose",de)};re.addEventListener("dispose",de),E.__depthDisposeCallback=de}E.__boundDepthTexture=re}if(O.depthTexture&&!E.__autoAllocateDepthBuffer)if(j)for(let re=0;re<6;re++)ft(E.__webglFramebuffer[re],O,re);else{const re=O.texture.mipmaps;re&&re.length>0?ft(E.__webglFramebuffer[0],O,0):ft(E.__webglFramebuffer,O,0)}else if(j){E.__webglDepthbuffer=[];for(let re=0;re<6;re++)if(i.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer[re]),E.__webglDepthbuffer[re]===void 0)E.__webglDepthbuffer[re]=s.createRenderbuffer(),Zt(E.__webglDepthbuffer[re],O,!1);else{const de=O.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,be=E.__webglDepthbuffer[re];s.bindRenderbuffer(s.RENDERBUFFER,be),s.framebufferRenderbuffer(s.FRAMEBUFFER,de,s.RENDERBUFFER,be)}}else{const re=O.texture.mipmaps;if(re&&re.length>0?i.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer[0]):i.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=s.createRenderbuffer(),Zt(E.__webglDepthbuffer,O,!1);else{const de=O.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,be=E.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,be),s.framebufferRenderbuffer(s.FRAMEBUFFER,de,s.RENDERBUFFER,be)}}i.bindFramebuffer(s.FRAMEBUFFER,null)}function St(O,E,j){const re=r.get(O);E!==void 0&&Je(re.__webglFramebuffer,O,O.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),j!==void 0&&xt(O)}function dt(O){const E=O.texture,j=r.get(O),re=r.get(E);O.addEventListener("dispose",T);const de=O.textures,be=O.isWebGLCubeRenderTarget===!0,De=de.length>1;if(De||(re.__webglTexture===void 0&&(re.__webglTexture=s.createTexture()),re.__version=E.version,d.memory.textures++),be){j.__webglFramebuffer=[];for(let fe=0;fe<6;fe++)if(E.mipmaps&&E.mipmaps.length>0){j.__webglFramebuffer[fe]=[];for(let he=0;he<E.mipmaps.length;he++)j.__webglFramebuffer[fe][he]=s.createFramebuffer()}else j.__webglFramebuffer[fe]=s.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){j.__webglFramebuffer=[];for(let fe=0;fe<E.mipmaps.length;fe++)j.__webglFramebuffer[fe]=s.createFramebuffer()}else j.__webglFramebuffer=s.createFramebuffer();if(De)for(let fe=0,he=de.length;fe<he;fe++){const Ae=r.get(de[fe]);Ae.__webglTexture===void 0&&(Ae.__webglTexture=s.createTexture(),d.memory.textures++)}if(O.samples>0&&on(O)===!1){j.__webglMultisampledFramebuffer=s.createFramebuffer(),j.__webglColorRenderbuffer=[],i.bindFramebuffer(s.FRAMEBUFFER,j.__webglMultisampledFramebuffer);for(let fe=0;fe<de.length;fe++){const he=de[fe];j.__webglColorRenderbuffer[fe]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,j.__webglColorRenderbuffer[fe]);const Ae=c.convert(he.format,he.colorSpace),ze=c.convert(he.type),Le=A(he.internalFormat,Ae,ze,he.normalized,he.colorSpace,O.isXRRenderTarget===!0),Ue=Wt(O);s.renderbufferStorageMultisample(s.RENDERBUFFER,Ue,Le,O.width,O.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+fe,s.RENDERBUFFER,j.__webglColorRenderbuffer[fe])}s.bindRenderbuffer(s.RENDERBUFFER,null),O.depthBuffer&&(j.__webglDepthRenderbuffer=s.createRenderbuffer(),Zt(j.__webglDepthRenderbuffer,O,!0)),i.bindFramebuffer(s.FRAMEBUFFER,null)}}if(be){i.bindTexture(s.TEXTURE_CUBE_MAP,re.__webglTexture),Ie(s.TEXTURE_CUBE_MAP,E);for(let fe=0;fe<6;fe++)if(E.mipmaps&&E.mipmaps.length>0)for(let he=0;he<E.mipmaps.length;he++)Je(j.__webglFramebuffer[fe][he],O,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,he);else Je(j.__webglFramebuffer[fe],O,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0);S(E)&&w(s.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(De){for(let fe=0,he=de.length;fe<he;fe++){const Ae=de[fe],ze=r.get(Ae);let Le=s.TEXTURE_2D;(O.isWebGL3DRenderTarget||O.isWebGLArrayRenderTarget)&&(Le=O.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),i.bindTexture(Le,ze.__webglTexture),Ie(Le,Ae),Je(j.__webglFramebuffer,O,Ae,s.COLOR_ATTACHMENT0+fe,Le,0),S(Ae)&&w(Le)}i.unbindTexture()}else{let fe=s.TEXTURE_2D;if((O.isWebGL3DRenderTarget||O.isWebGLArrayRenderTarget)&&(fe=O.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),i.bindTexture(fe,re.__webglTexture),Ie(fe,E),E.mipmaps&&E.mipmaps.length>0)for(let he=0;he<E.mipmaps.length;he++)Je(j.__webglFramebuffer[he],O,E,s.COLOR_ATTACHMENT0,fe,he);else Je(j.__webglFramebuffer,O,E,s.COLOR_ATTACHMENT0,fe,0);S(E)&&w(fe),i.unbindTexture()}O.depthBuffer&&xt(O)}function an(O){const E=O.textures;for(let j=0,re=E.length;j<re;j++){const de=E[j];if(S(de)){const be=U(O),De=r.get(de).__webglTexture;i.bindTexture(be,De),w(be),i.unbindTexture()}}}const rn=[],sn=[];function dn(O){if(O.samples>0){if(on(O)===!1){const E=O.textures,j=O.width,re=O.height;let de=s.COLOR_BUFFER_BIT;const be=O.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,De=r.get(O),fe=E.length>1;if(fe)for(let Ae=0;Ae<E.length;Ae++)i.bindFramebuffer(s.FRAMEBUFFER,De.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ae,s.RENDERBUFFER,null),i.bindFramebuffer(s.FRAMEBUFFER,De.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ae,s.TEXTURE_2D,null,0);i.bindFramebuffer(s.READ_FRAMEBUFFER,De.__webglMultisampledFramebuffer);const he=O.texture.mipmaps;he&&he.length>0?i.bindFramebuffer(s.DRAW_FRAMEBUFFER,De.__webglFramebuffer[0]):i.bindFramebuffer(s.DRAW_FRAMEBUFFER,De.__webglFramebuffer);for(let Ae=0;Ae<E.length;Ae++){if(O.resolveDepthBuffer&&(O.depthBuffer&&(de|=s.DEPTH_BUFFER_BIT),O.stencilBuffer&&O.resolveStencilBuffer&&(de|=s.STENCIL_BUFFER_BIT)),fe){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,De.__webglColorRenderbuffer[Ae]);const ze=r.get(E[Ae]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,ze,0)}s.blitFramebuffer(0,0,j,re,0,0,j,re,de,s.NEAREST),m===!0&&(rn.length=0,sn.length=0,rn.push(s.COLOR_ATTACHMENT0+Ae),O.depthBuffer&&O.resolveDepthBuffer===!1&&(rn.push(be),sn.push(be),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,sn)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,rn))}if(i.bindFramebuffer(s.READ_FRAMEBUFFER,null),i.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),fe)for(let Ae=0;Ae<E.length;Ae++){i.bindFramebuffer(s.FRAMEBUFFER,De.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ae,s.RENDERBUFFER,De.__webglColorRenderbuffer[Ae]);const ze=r.get(E[Ae]).__webglTexture;i.bindFramebuffer(s.FRAMEBUFFER,De.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ae,s.TEXTURE_2D,ze,0)}i.bindFramebuffer(s.DRAW_FRAMEBUFFER,De.__webglMultisampledFramebuffer)}else if(O.depthBuffer&&O.resolveDepthBuffer===!1&&m){const E=O.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[E])}}}function Wt(O){return Math.min(l.maxSamples,O.samples)}function on(O){const E=r.get(O);return O.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function q(O){const E=d.render.frame;_.get(O)!==E&&(_.set(O,E),O.update())}function Ft(O,E){const j=O.colorSpace,re=O.format,de=O.type;return O.isCompressedTexture===!0||O.isVideoTexture===!0||j!==jc&&j!==sr&&(yt.getTransfer(j)===zt?(re!==Pi||de!==Ti)&&nt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Tt("WebGLTextures: Unsupported texture color space:",j)),E}function wt(O){return typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement?(h.width=O.naturalWidth||O.width,h.height=O.naturalHeight||O.height):typeof VideoFrame<"u"&&O instanceof VideoFrame?(h.width=O.displayWidth,h.height=O.displayHeight):(h.width=O.width,h.height=O.height),h}this.allocateTextureUnit=z,this.resetTextureUnits=ce,this.getTextureUnits=le,this.setTextureUnits=Y,this.setTexture2D=te,this.setTexture2DArray=ge,this.setTexture3D=Ee,this.setTextureCube=I,this.rebindTextures=St,this.setupRenderTarget=dt,this.updateRenderTargetMipmap=an,this.updateMultisampleRenderTarget=dn,this.setupDepthRenderbuffer=xt,this.setupFrameBufferTexture=Je,this.useMultisampledRTT=on,this.isReversedDepthBuffer=function(){return i.buffers.depth.getReversed()}}function qA(s,e){function i(r,l=sr){let c;const d=yt.getTransfer(l);if(r===Ti)return s.UNSIGNED_BYTE;if(r===jh)return s.UNSIGNED_SHORT_4_4_4_4;if(r===$h)return s.UNSIGNED_SHORT_5_5_5_1;if(r===wv)return s.UNSIGNED_INT_5_9_9_9_REV;if(r===Dv)return s.UNSIGNED_INT_10F_11F_11F_REV;if(r===Rv)return s.BYTE;if(r===Cv)return s.SHORT;if(r===$o)return s.UNSIGNED_SHORT;if(r===Jh)return s.INT;if(r===Qi)return s.UNSIGNED_INT;if(r===Wi)return s.FLOAT;if(r===Ta)return s.HALF_FLOAT;if(r===Uv)return s.ALPHA;if(r===Nv)return s.RGB;if(r===Pi)return s.RGBA;if(r===Aa)return s.DEPTH_COMPONENT;if(r===Br)return s.DEPTH_STENCIL;if(r===Lv)return s.RED;if(r===ep)return s.RED_INTEGER;if(r===Hr)return s.RG;if(r===tp)return s.RG_INTEGER;if(r===np)return s.RGBA_INTEGER;if(r===Wc||r===qc||r===Yc||r===Zc)if(d===zt)if(c=e.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(r===Wc)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===qc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Yc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Zc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=e.get("WEBGL_compressed_texture_s3tc"),c!==null){if(r===Wc)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===qc)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Yc)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Zc)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===ph||r===mh||r===gh||r===_h)if(c=e.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(r===ph)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===mh)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===gh)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===_h)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===vh||r===xh||r===Sh||r===Mh||r===yh||r===Qc||r===Eh)if(c=e.get("WEBGL_compressed_texture_etc"),c!==null){if(r===vh||r===xh)return d===zt?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(r===Sh)return d===zt?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC;if(r===Mh)return c.COMPRESSED_R11_EAC;if(r===yh)return c.COMPRESSED_SIGNED_R11_EAC;if(r===Qc)return c.COMPRESSED_RG11_EAC;if(r===Eh)return c.COMPRESSED_SIGNED_RG11_EAC}else return null;if(r===bh||r===Th||r===Ah||r===Rh||r===Ch||r===wh||r===Dh||r===Uh||r===Nh||r===Lh||r===Oh||r===Ph||r===Ih||r===Bh)if(c=e.get("WEBGL_compressed_texture_astc"),c!==null){if(r===bh)return d===zt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Th)return d===zt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Ah)return d===zt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Rh)return d===zt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Ch)return d===zt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===wh)return d===zt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Dh)return d===zt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Uh)return d===zt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Nh)return d===zt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Lh)return d===zt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Oh)return d===zt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Ph)return d===zt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Ih)return d===zt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Bh)return d===zt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===zh||r===Fh||r===Hh)if(c=e.get("EXT_texture_compression_bptc"),c!==null){if(r===zh)return d===zt?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Fh)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Hh)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Gh||r===Vh||r===Jc||r===kh)if(c=e.get("EXT_texture_compression_rgtc"),c!==null){if(r===Gh)return c.COMPRESSED_RED_RGTC1_EXT;if(r===Vh)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Jc)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===kh)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===el?s.UNSIGNED_INT_24_8:s[r]!==void 0?s[r]:null}return{convert:i}}const YA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ZA=`
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

}`;class KA{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,i){if(this.texture===null){const r=new Xv(e.texture);(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const i=e.cameras[0].viewport,r=new Ji({vertexShader:YA,fragmentShader:ZA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new qt(new lu(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class QA extends Vr{constructor(e,i){super();const r=this;let l=null,c=1,d=null,p="local-floor",m=1,h=null,_=null,x=null,g=null,M=null,b=null;const D=typeof XRWebGLBinding<"u",y=new KA,S={},w=i.getContextAttributes();let U=null,A=null;const P=[],L=[],B=new bt;let T=null;const N=new bi;N.viewport=new un;const k=new bi;k.viewport=new un;const G=[N,k],Z=new sE;let ce=null,le=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ae){let xe=P[ae];return xe===void 0&&(xe=new Ud,P[ae]=xe),xe.getTargetRaySpace()},this.getControllerGrip=function(ae){let xe=P[ae];return xe===void 0&&(xe=new Ud,P[ae]=xe),xe.getGripSpace()},this.getHand=function(ae){let xe=P[ae];return xe===void 0&&(xe=new Ud,P[ae]=xe),xe.getHandSpace()};function Y(ae){const xe=L.indexOf(ae.inputSource);if(xe===-1)return;const Me=P[xe];Me!==void 0&&(Me.update(ae.inputSource,ae.frame,h||d),Me.dispatchEvent({type:ae.type,data:ae.inputSource}))}function z(){l.removeEventListener("select",Y),l.removeEventListener("selectstart",Y),l.removeEventListener("selectend",Y),l.removeEventListener("squeeze",Y),l.removeEventListener("squeezestart",Y),l.removeEventListener("squeezeend",Y),l.removeEventListener("end",z),l.removeEventListener("inputsourceschange",F);for(let ae=0;ae<P.length;ae++){const xe=L[ae];xe!==null&&(L[ae]=null,P[ae].disconnect(xe))}ce=null,le=null,y.reset();for(const ae in S)delete S[ae];e.setRenderTarget(U),M=null,g=null,x=null,l=null,A=null,Ie.stop(),r.isPresenting=!1,e.setPixelRatio(T),e.setSize(B.width,B.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ae){c=ae,r.isPresenting===!0&&nt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ae){p=ae,r.isPresenting===!0&&nt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||d},this.setReferenceSpace=function(ae){h=ae},this.getBaseLayer=function(){return g!==null?g:M},this.getBinding=function(){return x===null&&D&&(x=new XRWebGLBinding(l,i)),x},this.getFrame=function(){return b},this.getSession=function(){return l},this.setSession=async function(ae){if(l=ae,l!==null){if(U=e.getRenderTarget(),l.addEventListener("select",Y),l.addEventListener("selectstart",Y),l.addEventListener("selectend",Y),l.addEventListener("squeeze",Y),l.addEventListener("squeezestart",Y),l.addEventListener("squeezeend",Y),l.addEventListener("end",z),l.addEventListener("inputsourceschange",F),w.xrCompatible!==!0&&await i.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(B),D&&"createProjectionLayer"in XRWebGLBinding.prototype){let Me=null,He=null,it=null;w.depth&&(it=w.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,Me=w.stencil?Br:Aa,He=w.stencil?el:Qi);const Je={colorFormat:i.RGBA8,depthFormat:it,scaleFactor:c};x=this.getBinding(),g=x.createProjectionLayer(Je),l.updateRenderState({layers:[g]}),e.setPixelRatio(1),e.setSize(g.textureWidth,g.textureHeight,!1),A=new Zi(g.textureWidth,g.textureHeight,{format:Pi,type:Ti,depthTexture:new ks(g.textureWidth,g.textureHeight,He,void 0,void 0,void 0,void 0,void 0,void 0,Me),stencilBuffer:w.stencil,colorSpace:e.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}else{const Me={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:c};M=new XRWebGLLayer(l,i,Me),l.updateRenderState({baseLayer:M}),e.setPixelRatio(1),e.setSize(M.framebufferWidth,M.framebufferHeight,!1),A=new Zi(M.framebufferWidth,M.framebufferHeight,{format:Pi,type:Ti,colorSpace:e.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:M.ignoreDepthValues===!1,resolveStencilBuffer:M.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(m),h=null,d=await l.requestReferenceSpace(p),Ie.setContext(l),Ie.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function F(ae){for(let xe=0;xe<ae.removed.length;xe++){const Me=ae.removed[xe],He=L.indexOf(Me);He>=0&&(L[He]=null,P[He].disconnect(Me))}for(let xe=0;xe<ae.added.length;xe++){const Me=ae.added[xe];let He=L.indexOf(Me);if(He===-1){for(let Je=0;Je<P.length;Je++)if(Je>=L.length){L.push(Me),He=Je;break}else if(L[Je]===null){L[Je]=Me,He=Je;break}if(He===-1)break}const it=P[He];it&&it.connect(Me)}}const te=new Q,ge=new Q;function Ee(ae,xe,Me){te.setFromMatrixPosition(xe.matrixWorld),ge.setFromMatrixPosition(Me.matrixWorld);const He=te.distanceTo(ge),it=xe.projectionMatrix.elements,Je=Me.projectionMatrix.elements,Zt=it[14]/(it[10]-1),ft=it[14]/(it[10]+1),xt=(it[9]+1)/it[5],St=(it[9]-1)/it[5],dt=(it[8]-1)/it[0],an=(Je[8]+1)/Je[0],rn=Zt*dt,sn=Zt*an,dn=He/(-dt+an),Wt=dn*-dt;if(xe.matrixWorld.decompose(ae.position,ae.quaternion,ae.scale),ae.translateX(Wt),ae.translateZ(dn),ae.matrixWorld.compose(ae.position,ae.quaternion,ae.scale),ae.matrixWorldInverse.copy(ae.matrixWorld).invert(),it[10]===-1)ae.projectionMatrix.copy(xe.projectionMatrix),ae.projectionMatrixInverse.copy(xe.projectionMatrixInverse);else{const on=Zt+dn,q=ft+dn,Ft=rn-Wt,wt=sn+(He-Wt),O=xt*ft/q*on,E=St*ft/q*on;ae.projectionMatrix.makePerspective(Ft,wt,O,E,on,q),ae.projectionMatrixInverse.copy(ae.projectionMatrix).invert()}}function I(ae,xe){xe===null?ae.matrixWorld.copy(ae.matrix):ae.matrixWorld.multiplyMatrices(xe.matrixWorld,ae.matrix),ae.matrixWorldInverse.copy(ae.matrixWorld).invert()}this.updateCamera=function(ae){if(l===null)return;let xe=ae.near,Me=ae.far;y.texture!==null&&(y.depthNear>0&&(xe=y.depthNear),y.depthFar>0&&(Me=y.depthFar)),Z.near=k.near=N.near=xe,Z.far=k.far=N.far=Me,(ce!==Z.near||le!==Z.far)&&(l.updateRenderState({depthNear:Z.near,depthFar:Z.far}),ce=Z.near,le=Z.far),Z.layers.mask=ae.layers.mask|6,N.layers.mask=Z.layers.mask&-5,k.layers.mask=Z.layers.mask&-3;const He=ae.parent,it=Z.cameras;I(Z,He);for(let Je=0;Je<it.length;Je++)I(it[Je],He);it.length===2?Ee(Z,N,k):Z.projectionMatrix.copy(N.projectionMatrix),J(ae,Z,He)};function J(ae,xe,Me){Me===null?ae.matrix.copy(xe.matrixWorld):(ae.matrix.copy(Me.matrixWorld),ae.matrix.invert(),ae.matrix.multiply(xe.matrixWorld)),ae.matrix.decompose(ae.position,ae.quaternion,ae.scale),ae.updateMatrixWorld(!0),ae.projectionMatrix.copy(xe.projectionMatrix),ae.projectionMatrixInverse.copy(xe.projectionMatrixInverse),ae.isPerspectiveCamera&&(ae.fov=tl*2*Math.atan(1/ae.projectionMatrix.elements[5]),ae.zoom=1)}this.getCamera=function(){return Z},this.getFoveation=function(){if(!(g===null&&M===null))return m},this.setFoveation=function(ae){m=ae,g!==null&&(g.fixedFoveation=ae),M!==null&&M.fixedFoveation!==void 0&&(M.fixedFoveation=ae)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(Z)},this.getCameraTexture=function(ae){return S[ae]};let ye=null;function Re(ae,xe){if(_=xe.getViewerPose(h||d),b=xe,_!==null){const Me=_.views;M!==null&&(e.setRenderTargetFramebuffer(A,M.framebuffer),e.setRenderTarget(A));let He=!1;Me.length!==Z.cameras.length&&(Z.cameras.length=0,He=!0);for(let ft=0;ft<Me.length;ft++){const xt=Me[ft];let St=null;if(M!==null)St=M.getViewport(xt);else{const an=x.getViewSubImage(g,xt);St=an.viewport,ft===0&&(e.setRenderTargetTextures(A,an.colorTexture,an.depthStencilTexture),e.setRenderTarget(A))}let dt=G[ft];dt===void 0&&(dt=new bi,dt.layers.enable(ft),dt.viewport=new un,G[ft]=dt),dt.matrix.fromArray(xt.transform.matrix),dt.matrix.decompose(dt.position,dt.quaternion,dt.scale),dt.projectionMatrix.fromArray(xt.projectionMatrix),dt.projectionMatrixInverse.copy(dt.projectionMatrix).invert(),dt.viewport.set(St.x,St.y,St.width,St.height),ft===0&&(Z.matrix.copy(dt.matrix),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale)),He===!0&&Z.cameras.push(dt)}const it=l.enabledFeatures;if(it&&it.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&D){x=r.getBinding();const ft=x.getDepthInformation(Me[0]);ft&&ft.isValid&&ft.texture&&y.init(ft,l.renderState)}if(it&&it.includes("camera-access")&&D){e.state.unbindTexture(),x=r.getBinding();for(let ft=0;ft<Me.length;ft++){const xt=Me[ft].camera;if(xt){let St=S[xt];St||(St=new Xv,S[xt]=St);const dt=x.getCameraImage(xt);St.sourceTexture=dt}}}}for(let Me=0;Me<P.length;Me++){const He=L[Me],it=P[Me];He!==null&&it!==void 0&&it.update(He,xe,h||d)}ye&&ye(ae,xe),xe.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:xe}),b=null}const Ie=new Zv;Ie.setAnimationLoop(Re),this.setAnimationLoop=function(ae){ye=ae},this.dispose=function(){}}}const JA=new fn,tx=new st;tx.set(-1,0,0,0,1,0,0,0,1);function jA(s,e){function i(y,S){y.matrixAutoUpdate===!0&&y.updateMatrix(),S.value.copy(y.matrix)}function r(y,S){S.color.getRGB(y.fogColor.value,Wv(s)),S.isFog?(y.fogNear.value=S.near,y.fogFar.value=S.far):S.isFogExp2&&(y.fogDensity.value=S.density)}function l(y,S,w,U,A){S.isNodeMaterial?S.uniformsNeedUpdate=!1:S.isMeshBasicMaterial?c(y,S):S.isMeshLambertMaterial?(c(y,S),S.envMap&&(y.envMapIntensity.value=S.envMapIntensity)):S.isMeshToonMaterial?(c(y,S),x(y,S)):S.isMeshPhongMaterial?(c(y,S),_(y,S),S.envMap&&(y.envMapIntensity.value=S.envMapIntensity)):S.isMeshStandardMaterial?(c(y,S),g(y,S),S.isMeshPhysicalMaterial&&M(y,S,A)):S.isMeshMatcapMaterial?(c(y,S),b(y,S)):S.isMeshDepthMaterial?c(y,S):S.isMeshDistanceMaterial?(c(y,S),D(y,S)):S.isMeshNormalMaterial?c(y,S):S.isLineBasicMaterial?(d(y,S),S.isLineDashedMaterial&&p(y,S)):S.isPointsMaterial?m(y,S,w,U):S.isSpriteMaterial?h(y,S):S.isShadowMaterial?(y.color.value.copy(S.color),y.opacity.value=S.opacity):S.isShaderMaterial&&(S.uniformsNeedUpdate=!1)}function c(y,S){y.opacity.value=S.opacity,S.color&&y.diffuse.value.copy(S.color),S.emissive&&y.emissive.value.copy(S.emissive).multiplyScalar(S.emissiveIntensity),S.map&&(y.map.value=S.map,i(S.map,y.mapTransform)),S.alphaMap&&(y.alphaMap.value=S.alphaMap,i(S.alphaMap,y.alphaMapTransform)),S.bumpMap&&(y.bumpMap.value=S.bumpMap,i(S.bumpMap,y.bumpMapTransform),y.bumpScale.value=S.bumpScale,S.side===$n&&(y.bumpScale.value*=-1)),S.normalMap&&(y.normalMap.value=S.normalMap,i(S.normalMap,y.normalMapTransform),y.normalScale.value.copy(S.normalScale),S.side===$n&&y.normalScale.value.negate()),S.displacementMap&&(y.displacementMap.value=S.displacementMap,i(S.displacementMap,y.displacementMapTransform),y.displacementScale.value=S.displacementScale,y.displacementBias.value=S.displacementBias),S.emissiveMap&&(y.emissiveMap.value=S.emissiveMap,i(S.emissiveMap,y.emissiveMapTransform)),S.specularMap&&(y.specularMap.value=S.specularMap,i(S.specularMap,y.specularMapTransform)),S.alphaTest>0&&(y.alphaTest.value=S.alphaTest);const w=e.get(S),U=w.envMap,A=w.envMapRotation;U&&(y.envMap.value=U,y.envMapRotation.value.setFromMatrix4(JA.makeRotationFromEuler(A)).transpose(),U.isCubeTexture&&U.isRenderTargetTexture===!1&&y.envMapRotation.value.premultiply(tx),y.reflectivity.value=S.reflectivity,y.ior.value=S.ior,y.refractionRatio.value=S.refractionRatio),S.lightMap&&(y.lightMap.value=S.lightMap,y.lightMapIntensity.value=S.lightMapIntensity,i(S.lightMap,y.lightMapTransform)),S.aoMap&&(y.aoMap.value=S.aoMap,y.aoMapIntensity.value=S.aoMapIntensity,i(S.aoMap,y.aoMapTransform))}function d(y,S){y.diffuse.value.copy(S.color),y.opacity.value=S.opacity,S.map&&(y.map.value=S.map,i(S.map,y.mapTransform))}function p(y,S){y.dashSize.value=S.dashSize,y.totalSize.value=S.dashSize+S.gapSize,y.scale.value=S.scale}function m(y,S,w,U){y.diffuse.value.copy(S.color),y.opacity.value=S.opacity,y.size.value=S.size*w,y.scale.value=U*.5,S.map&&(y.map.value=S.map,i(S.map,y.uvTransform)),S.alphaMap&&(y.alphaMap.value=S.alphaMap,i(S.alphaMap,y.alphaMapTransform)),S.alphaTest>0&&(y.alphaTest.value=S.alphaTest)}function h(y,S){y.diffuse.value.copy(S.color),y.opacity.value=S.opacity,y.rotation.value=S.rotation,S.map&&(y.map.value=S.map,i(S.map,y.mapTransform)),S.alphaMap&&(y.alphaMap.value=S.alphaMap,i(S.alphaMap,y.alphaMapTransform)),S.alphaTest>0&&(y.alphaTest.value=S.alphaTest)}function _(y,S){y.specular.value.copy(S.specular),y.shininess.value=Math.max(S.shininess,1e-4)}function x(y,S){S.gradientMap&&(y.gradientMap.value=S.gradientMap)}function g(y,S){y.metalness.value=S.metalness,S.metalnessMap&&(y.metalnessMap.value=S.metalnessMap,i(S.metalnessMap,y.metalnessMapTransform)),y.roughness.value=S.roughness,S.roughnessMap&&(y.roughnessMap.value=S.roughnessMap,i(S.roughnessMap,y.roughnessMapTransform)),S.envMap&&(y.envMapIntensity.value=S.envMapIntensity)}function M(y,S,w){y.ior.value=S.ior,S.sheen>0&&(y.sheenColor.value.copy(S.sheenColor).multiplyScalar(S.sheen),y.sheenRoughness.value=S.sheenRoughness,S.sheenColorMap&&(y.sheenColorMap.value=S.sheenColorMap,i(S.sheenColorMap,y.sheenColorMapTransform)),S.sheenRoughnessMap&&(y.sheenRoughnessMap.value=S.sheenRoughnessMap,i(S.sheenRoughnessMap,y.sheenRoughnessMapTransform))),S.clearcoat>0&&(y.clearcoat.value=S.clearcoat,y.clearcoatRoughness.value=S.clearcoatRoughness,S.clearcoatMap&&(y.clearcoatMap.value=S.clearcoatMap,i(S.clearcoatMap,y.clearcoatMapTransform)),S.clearcoatRoughnessMap&&(y.clearcoatRoughnessMap.value=S.clearcoatRoughnessMap,i(S.clearcoatRoughnessMap,y.clearcoatRoughnessMapTransform)),S.clearcoatNormalMap&&(y.clearcoatNormalMap.value=S.clearcoatNormalMap,i(S.clearcoatNormalMap,y.clearcoatNormalMapTransform),y.clearcoatNormalScale.value.copy(S.clearcoatNormalScale),S.side===$n&&y.clearcoatNormalScale.value.negate())),S.dispersion>0&&(y.dispersion.value=S.dispersion),S.iridescence>0&&(y.iridescence.value=S.iridescence,y.iridescenceIOR.value=S.iridescenceIOR,y.iridescenceThicknessMinimum.value=S.iridescenceThicknessRange[0],y.iridescenceThicknessMaximum.value=S.iridescenceThicknessRange[1],S.iridescenceMap&&(y.iridescenceMap.value=S.iridescenceMap,i(S.iridescenceMap,y.iridescenceMapTransform)),S.iridescenceThicknessMap&&(y.iridescenceThicknessMap.value=S.iridescenceThicknessMap,i(S.iridescenceThicknessMap,y.iridescenceThicknessMapTransform))),S.transmission>0&&(y.transmission.value=S.transmission,y.transmissionSamplerMap.value=w.texture,y.transmissionSamplerSize.value.set(w.width,w.height),S.transmissionMap&&(y.transmissionMap.value=S.transmissionMap,i(S.transmissionMap,y.transmissionMapTransform)),y.thickness.value=S.thickness,S.thicknessMap&&(y.thicknessMap.value=S.thicknessMap,i(S.thicknessMap,y.thicknessMapTransform)),y.attenuationDistance.value=S.attenuationDistance,y.attenuationColor.value.copy(S.attenuationColor)),S.anisotropy>0&&(y.anisotropyVector.value.set(S.anisotropy*Math.cos(S.anisotropyRotation),S.anisotropy*Math.sin(S.anisotropyRotation)),S.anisotropyMap&&(y.anisotropyMap.value=S.anisotropyMap,i(S.anisotropyMap,y.anisotropyMapTransform))),y.specularIntensity.value=S.specularIntensity,y.specularColor.value.copy(S.specularColor),S.specularColorMap&&(y.specularColorMap.value=S.specularColorMap,i(S.specularColorMap,y.specularColorMapTransform)),S.specularIntensityMap&&(y.specularIntensityMap.value=S.specularIntensityMap,i(S.specularIntensityMap,y.specularIntensityMapTransform))}function b(y,S){S.matcap&&(y.matcap.value=S.matcap)}function D(y,S){const w=e.get(S).light;y.referencePosition.value.setFromMatrixPosition(w.matrixWorld),y.nearDistance.value=w.shadow.camera.near,y.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:l}}function $A(s,e,i,r){let l={},c={},d=[];const p=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function m(A,P){const L=P.program;r.uniformBlockBinding(A,L)}function h(A,P){let L=l[A.id];L===void 0&&(y(A),L=_(A),l[A.id]=L,A.addEventListener("dispose",w));const B=P.program;r.updateUBOMapping(A,B);const T=e.render.frame;c[A.id]!==T&&(g(A),c[A.id]=T)}function _(A){const P=x();A.__bindingPointIndex=P;const L=s.createBuffer(),B=A.__size,T=A.usage;return s.bindBuffer(s.UNIFORM_BUFFER,L),s.bufferData(s.UNIFORM_BUFFER,B,T),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,P,L),L}function x(){for(let A=0;A<p;A++)if(d.indexOf(A)===-1)return d.push(A),A;return Tt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(A){const P=l[A.id],L=A.uniforms,B=A.__cache;s.bindBuffer(s.UNIFORM_BUFFER,P);for(let T=0,N=L.length;T<N;T++){const k=L[T];if(Array.isArray(k))for(let G=0,Z=k.length;G<Z;G++)M(k[G],T,G,B);else M(k,T,0,B)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function M(A,P,L,B){if(D(A,P,L,B)===!0){const T=A.__offset,N=A.value;if(Array.isArray(N)){let k=0;for(let G=0;G<N.length;G++){const Z=N[G],ce=S(Z);b(Z,A.__data,k),typeof Z!="number"&&typeof Z!="boolean"&&!Z.isMatrix3&&!ArrayBuffer.isView(Z)&&(k+=ce.storage/Float32Array.BYTES_PER_ELEMENT)}}else b(N,A.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,T,A.__data)}}function b(A,P,L){typeof A=="number"||typeof A=="boolean"?P[0]=A:A.isMatrix3?(P[0]=A.elements[0],P[1]=A.elements[1],P[2]=A.elements[2],P[3]=0,P[4]=A.elements[3],P[5]=A.elements[4],P[6]=A.elements[5],P[7]=0,P[8]=A.elements[6],P[9]=A.elements[7],P[10]=A.elements[8],P[11]=0):ArrayBuffer.isView(A)?P.set(new A.constructor(A.buffer,A.byteOffset,P.length)):A.toArray(P,L)}function D(A,P,L,B){const T=A.value,N=P+"_"+L;if(B[N]===void 0)return typeof T=="number"||typeof T=="boolean"?B[N]=T:ArrayBuffer.isView(T)?B[N]=T.slice():B[N]=T.clone(),!0;{const k=B[N];if(typeof T=="number"||typeof T=="boolean"){if(k!==T)return B[N]=T,!0}else{if(ArrayBuffer.isView(T))return!0;if(k.equals(T)===!1)return k.copy(T),!0}}return!1}function y(A){const P=A.uniforms;let L=0;const B=16;for(let N=0,k=P.length;N<k;N++){const G=Array.isArray(P[N])?P[N]:[P[N]];for(let Z=0,ce=G.length;Z<ce;Z++){const le=G[Z],Y=Array.isArray(le.value)?le.value:[le.value];for(let z=0,F=Y.length;z<F;z++){const te=Y[z],ge=S(te),Ee=L%B,I=Ee%ge.boundary,J=Ee+I;L+=I,J!==0&&B-J<ge.storage&&(L+=B-J),le.__data=new Float32Array(ge.storage/Float32Array.BYTES_PER_ELEMENT),le.__offset=L,L+=ge.storage}}}const T=L%B;return T>0&&(L+=B-T),A.__size=L,A.__cache={},this}function S(A){const P={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(P.boundary=4,P.storage=4):A.isVector2?(P.boundary=8,P.storage=8):A.isVector3||A.isColor?(P.boundary=16,P.storage=12):A.isVector4?(P.boundary=16,P.storage=16):A.isMatrix3?(P.boundary=48,P.storage=48):A.isMatrix4?(P.boundary=64,P.storage=64):A.isTexture?nt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(A)?(P.boundary=16,P.storage=A.byteLength):nt("WebGLRenderer: Unsupported uniform value type.",A),P}function w(A){const P=A.target;P.removeEventListener("dispose",w);const L=d.indexOf(P.__bindingPointIndex);d.splice(L,1),s.deleteBuffer(l[P.id]),delete l[P.id],delete c[P.id]}function U(){for(const A in l)s.deleteBuffer(l[A]);d=[],l={},c={}}return{bind:m,update:h,dispose:U}}const eR=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ki=null;function tR(){return ki===null&&(ki=new Wy(eR,16,16,Hr,Ta),ki.name="DFG_LUT",ki.minFilter=Hn,ki.magFilter=Hn,ki.wrapS=ya,ki.wrapT=ya,ki.generateMipmaps=!1,ki.needsUpdate=!0),ki}class nR{constructor(e={}){const{canvas:i=oy(),context:r=null,depth:l=!0,stencil:c=!1,alpha:d=!1,antialias:p=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:h=!1,powerPreference:_="default",failIfMajorPerformanceCaveat:x=!1,reversedDepthBuffer:g=!1,outputBufferType:M=Ti}=e;this.isWebGLRenderer=!0;let b;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");b=r.getContextAttributes().alpha}else b=d;const D=M,y=new Set([np,tp,ep]),S=new Set([Ti,Qi,$o,el,jh,$h]),w=new Uint32Array(4),U=new Int32Array(4),A=new Q;let P=null,L=null;const B=[],T=[];let N=null;this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Yi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const k=this;let G=!1,Z=null,ce=null,le=null,Y=null;this._outputColorSpace=hi;let z=0,F=0,te=null,ge=-1,Ee=null;const I=new un,J=new un;let ye=null;const Re=new Et(0);let Ie=0,ae=i.width,xe=i.height,Me=1,He=null,it=null;const Je=new un(0,0,ae,xe),Zt=new un(0,0,ae,xe);let ft=!1;const xt=new Hv;let St=!1,dt=!1;const an=new fn,rn=new Q,sn=new un,dn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Wt=!1;function on(){return te===null?Me:1}let q=r;function Ft(R,W){return i.getContext(R,W)}try{const R={alpha:!0,depth:l,stencil:c,antialias:p,premultipliedAlpha:m,preserveDrawingBuffer:h,powerPreference:_,failIfMajorPerformanceCaveat:x};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${Qh}`),i.addEventListener("webglcontextlost",Jt,!1),i.addEventListener("webglcontextrestored",Nt,!1),i.addEventListener("webglcontextcreationerror",ei,!1),q===null){const W="webgl2";if(q=Ft(W,R),q===null)throw Ft(W)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(R){throw Tt("WebGLRenderer: "+R.message),R}let wt,O,E,j,re,de,be,De,fe,he,Ae,ze,Le,Ue,Ke,je,at,X,Te,me,Ce,Be,Se;function qe(){wt=new tT(q),wt.init(),Ce=new qA(q,wt),O=new Y1(q,wt,e,Ce),E=new XA(q,wt),O.reversedDepthBuffer&&g&&E.buffers.depth.setReversed(!0),ce=q.createFramebuffer(),le=q.createFramebuffer(),Y=q.createFramebuffer(),j=new aT(q),re=new DA,de=new WA(q,wt,E,re,O,Ce,j),be=new eT(k),De=new lE(q),Be=new W1(q,De),fe=new nT(q,De,j,Be),he=new sT(q,fe,De,Be,j),X=new rT(q,O,de),Ke=new Z1(re),Ae=new wA(k,be,wt,O,Be,Ke),ze=new jA(k,re),Le=new NA,Ue=new zA(wt),at=new X1(k,be,E,he,b,m),je=new kA(k,he,O),Se=new $A(q,j,O,E),Te=new q1(q,wt,j),me=new iT(q,wt,j),j.programs=Ae.programs,k.capabilities=O,k.extensions=wt,k.properties=re,k.renderLists=Le,k.shadowMap=je,k.state=E,k.info=j}qe(),D!==Ti&&(N=new lT(D,i.width,i.height,p,l,c));const Ve=new QA(k,q);this.xr=Ve,this.getContext=function(){return q},this.getContextAttributes=function(){return q.getContextAttributes()},this.forceContextLoss=function(){const R=wt.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=wt.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return Me},this.setPixelRatio=function(R){R!==void 0&&(Me=R,this.setSize(ae,xe,!1))},this.getSize=function(R){return R.set(ae,xe)},this.setSize=function(R,W,se=!0){if(Ve.isPresenting){nt("WebGLRenderer: Can't change size while VR device is presenting.");return}ae=R,xe=W,i.width=Math.floor(R*Me),i.height=Math.floor(W*Me),se===!0&&(i.style.width=R+"px",i.style.height=W+"px"),N!==null&&N.setSize(i.width,i.height),this.setViewport(0,0,R,W)},this.getDrawingBufferSize=function(R){return R.set(ae*Me,xe*Me).floor()},this.setDrawingBufferSize=function(R,W,se){ae=R,xe=W,Me=se,i.width=Math.floor(R*se),i.height=Math.floor(W*se),this.setViewport(0,0,R,W)},this.setEffects=function(R){if(D===Ti){Tt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(R){for(let W=0;W<R.length;W++)if(R[W].isOutputPass===!0){nt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}N.setEffects(R||[])},this.getCurrentViewport=function(R){return R.copy(I)},this.getViewport=function(R){return R.copy(Je)},this.setViewport=function(R,W,se,ne){R.isVector4?Je.set(R.x,R.y,R.z,R.w):Je.set(R,W,se,ne),E.viewport(I.copy(Je).multiplyScalar(Me).round())},this.getScissor=function(R){return R.copy(Zt)},this.setScissor=function(R,W,se,ne){R.isVector4?Zt.set(R.x,R.y,R.z,R.w):Zt.set(R,W,se,ne),E.scissor(J.copy(Zt).multiplyScalar(Me).round())},this.getScissorTest=function(){return ft},this.setScissorTest=function(R){E.setScissorTest(ft=R)},this.setOpaqueSort=function(R){He=R},this.setTransparentSort=function(R){it=R},this.getClearColor=function(R){return R.copy(at.getClearColor())},this.setClearColor=function(){at.setClearColor(...arguments)},this.getClearAlpha=function(){return at.getClearAlpha()},this.setClearAlpha=function(){at.setClearAlpha(...arguments)},this.clear=function(R=!0,W=!0,se=!0){let ne=0;if(R){let ie=!1;if(te!==null){const Oe=te.texture.format;ie=y.has(Oe)}if(ie){const Oe=te.texture.type,Ge=S.has(Oe),Ne=at.getClearColor(),Xe=at.getClearAlpha(),ke=Ne.r,$e=Ne.g,ot=Ne.b;Ge?(w[0]=ke,w[1]=$e,w[2]=ot,w[3]=Xe,q.clearBufferuiv(q.COLOR,0,w)):(U[0]=ke,U[1]=$e,U[2]=ot,U[3]=Xe,q.clearBufferiv(q.COLOR,0,U))}else ne|=q.COLOR_BUFFER_BIT}W&&(ne|=q.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),se&&(ne|=q.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ne!==0&&q.clear(ne)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(R){R.setRenderer(this),Z=R},this.dispose=function(){i.removeEventListener("webglcontextlost",Jt,!1),i.removeEventListener("webglcontextrestored",Nt,!1),i.removeEventListener("webglcontextcreationerror",ei,!1),at.dispose(),Le.dispose(),Ue.dispose(),re.dispose(),be.dispose(),he.dispose(),Be.dispose(),Se.dispose(),Ae.dispose(),Ve.dispose(),Ve.removeEventListener("sessionstart",mn),Ve.removeEventListener("sessionend",Cn),qn.stop()};function Jt(R){R.preventDefault(),p_("WebGLRenderer: Context Lost."),G=!0}function Nt(){p_("WebGLRenderer: Context Restored."),G=!1;const R=j.autoReset,W=je.enabled,se=je.autoUpdate,ne=je.needsUpdate,ie=je.type;qe(),j.autoReset=R,je.enabled=W,je.autoUpdate=se,je.needsUpdate=ne,je.type=ie}function ei(R){Tt("WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function ti(R){const W=R.target;W.removeEventListener("dispose",ti),Qs(W)}function Qs(R){Js(R),re.remove(R)}function Js(R){const W=re.get(R).programs;W!==void 0&&(W.forEach(function(se){Ae.releaseProgram(se)}),R.isShaderMaterial&&Ae.releaseShaderCache(R))}this.renderBufferDirect=function(R,W,se,ne,ie,Oe){W===null&&(W=dn);const Ge=ie.isMesh&&ie.matrixWorld.determinantAffine()<0,Ne=wa(R,W,se,ne,ie);E.setMaterial(ne,Ge);let Xe=se.index,ke=1;if(ne.wireframe===!0){if(Xe=fe.getWireframeAttribute(se),Xe===void 0)return;ke=2}const $e=se.drawRange,ot=se.attributes.position;let Ze=$e.start*ke,At=($e.start+$e.count)*ke;Oe!==null&&(Ze=Math.max(Ze,Oe.start*ke),At=Math.min(At,(Oe.start+Oe.count)*ke)),Xe!==null?(Ze=Math.max(Ze,0),At=Math.min(At,Xe.count)):ot!=null&&(Ze=Math.max(Ze,0),At=Math.min(At,ot.count));const jt=At-Ze;if(jt<0||jt===1/0)return;Be.setup(ie,ne,Ne,se,Xe);let kt,Lt=Te;if(Xe!==null&&(kt=De.get(Xe),Lt=me,Lt.setIndex(kt)),ie.isMesh)ne.wireframe===!0?(E.setLineWidth(ne.wireframeLinewidth*on()),Lt.setMode(q.LINES)):Lt.setMode(q.TRIANGLES);else if(ie.isLine){let Ot=ne.linewidth;Ot===void 0&&(Ot=1),E.setLineWidth(Ot*on()),ie.isLineSegments?Lt.setMode(q.LINES):ie.isLineLoop?Lt.setMode(q.LINE_LOOP):Lt.setMode(q.LINE_STRIP)}else ie.isPoints?Lt.setMode(q.POINTS):ie.isSprite&&Lt.setMode(q.TRIANGLES);if(ie.isBatchedMesh)if(wt.get("WEBGL_multi_draw"))Lt.renderMultiDraw(ie._multiDrawStarts,ie._multiDrawCounts,ie._multiDrawCount);else{const Ot=ie._multiDrawStarts,Fe=ie._multiDrawCounts,Pn=ie._multiDrawCount,ht=Xe?De.get(Xe).bytesPerElement:1,yn=re.get(ne).currentProgram.getUniforms();for(let ni=0;ni<Pn;ni++)yn.setValue(q,"_gl_DrawID",ni),Lt.render(Ot[ni]/ht,Fe[ni])}else if(ie.isInstancedMesh)Lt.renderInstances(Ze,jt,ie.count);else if(se.isInstancedBufferGeometry){const Ot=se._maxInstanceCount!==void 0?se._maxInstanceCount:1/0,Fe=Math.min(se.instanceCount,Ot);Lt.renderInstances(Ze,jt,Fe)}else Lt.render(Ze,jt)};function js(R,W,se){R.transparent===!0&&R.side===pi&&R.forceSinglePass===!1?(R.side=$n,R.needsUpdate=!0,Ca(R,W,se),R.side=lr,R.needsUpdate=!0,Ca(R,W,se),R.side=pi):Ca(R,W,se)}this.compile=function(R,W,se=null){se===null&&(se=R),L=Ue.get(se),L.init(W),T.push(L),se.traverseVisible(function(ie){ie.isLight&&ie.layers.test(W.layers)&&(L.pushLight(ie),ie.castShadow&&L.pushShadow(ie))}),R!==se&&R.traverseVisible(function(ie){ie.isLight&&ie.layers.test(W.layers)&&(L.pushLight(ie),ie.castShadow&&L.pushShadow(ie))}),L.setupLights();const ne=new Set;return R.traverse(function(ie){if(!(ie.isMesh||ie.isPoints||ie.isLine||ie.isSprite))return;const Oe=ie.material;if(Oe)if(Array.isArray(Oe))for(let Ge=0;Ge<Oe.length;Ge++){const Ne=Oe[Ge];js(Ne,se,ie),ne.add(Ne)}else js(Oe,se,ie),ne.add(Oe)}),L=T.pop(),ne},this.compileAsync=function(R,W,se=null){const ne=this.compile(R,W,se);return new Promise(ie=>{function Oe(){if(ne.forEach(function(Ge){re.get(Ge).currentProgram.isReady()&&ne.delete(Ge)}),ne.size===0){ie(R);return}setTimeout(Oe,10)}wt.get("KHR_parallel_shader_compile")!==null?Oe():setTimeout(Oe,10)})};let kr=null;function Ii(R){kr&&kr(R)}function mn(){qn.stop()}function Cn(){qn.start()}const qn=new Zv;qn.setAnimationLoop(Ii),typeof self<"u"&&qn.setContext(self),this.setAnimationLoop=function(R){kr=R,Ve.setAnimationLoop(R),R===null?qn.stop():qn.start()},Ve.addEventListener("sessionstart",mn),Ve.addEventListener("sessionend",Cn),this.render=function(R,W){if(W!==void 0&&W.isCamera!==!0){Tt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(G===!0)return;Z!==null&&Z.renderStart(R,W);const se=Ve.enabled===!0&&Ve.isPresenting===!0,ne=N!==null&&(te===null||se)&&N.begin(k,te);if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),Ve.enabled===!0&&Ve.isPresenting===!0&&(N===null||N.isCompositing()===!1)&&(Ve.cameraAutoUpdate===!0&&Ve.updateCamera(W),W=Ve.getCamera()),R.isScene===!0&&R.onBeforeRender(k,R,W,te),L=Ue.get(R,T.length),L.init(W),L.state.textureUnits=de.getTextureUnits(),T.push(L),an.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),xt.setFromProjectionMatrix(an,qi,W.reversedDepth),dt=this.localClippingEnabled,St=Ke.init(this.clippingPlanes,dt),P=Le.get(R,B.length),P.init(),B.push(P),Ve.enabled===!0&&Ve.isPresenting===!0){const Ge=k.xr.getDepthSensingMesh();Ge!==null&&cr(Ge,W,-1/0,k.sortObjects)}cr(R,W,0,k.sortObjects),P.finish(),k.sortObjects===!0&&P.sort(He,it,W.reversedDepth),Wt=Ve.enabled===!1||Ve.isPresenting===!1||Ve.hasDepthSensing()===!1,Wt&&at.addToRenderList(P,R),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),St===!0&&Ke.beginShadows();const ie=L.state.shadowsArray;if(je.render(ie,R,W),St===!0&&Ke.endShadows(),(ne&&N.hasRenderPass())===!1){const Ge=P.opaque,Ne=P.transmissive;if(L.setupLights(),W.isArrayCamera){const Xe=W.cameras;if(Ne.length>0)for(let ke=0,$e=Xe.length;ke<$e;ke++){const ot=Xe[ke];rl(Ge,Ne,R,ot)}Wt&&at.render(R);for(let ke=0,$e=Xe.length;ke<$e;ke++){const ot=Xe[ke];al(P,R,ot,ot.viewport)}}else Ne.length>0&&rl(Ge,Ne,R,W),Wt&&at.render(R),al(P,R,W)}te!==null&&F===0&&(de.updateMultisampleRenderTarget(te),de.updateRenderTargetMipmap(te)),ne&&N.end(k),R.isScene===!0&&R.onAfterRender(k,R,W),Be.resetDefaultState(),ge=-1,Ee=null,T.pop(),T.length>0?(L=T[T.length-1],de.setTextureUnits(L.state.textureUnits),St===!0&&Ke.setGlobalState(k.clippingPlanes,L.state.camera)):L=null,B.pop(),B.length>0?P=B[B.length-1]:P=null,Z!==null&&Z.renderEnd()};function cr(R,W,se,ne){if(R.visible===!1)return;if(R.layers.test(W.layers)){if(R.isGroup)se=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(W);else if(R.isLightProbeGrid)L.pushLightProbeGrid(R);else if(R.isLight)L.pushLight(R),R.castShadow&&L.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||xt.intersectsSprite(R)){ne&&sn.setFromMatrixPosition(R.matrixWorld).applyMatrix4(an);const Ge=he.update(R),Ne=R.material;Ne.visible&&P.push(R,Ge,Ne,se,sn.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||xt.intersectsObject(R))){const Ge=he.update(R),Ne=R.material;if(ne&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),sn.copy(R.boundingSphere.center)):(Ge.boundingSphere===null&&Ge.computeBoundingSphere(),sn.copy(Ge.boundingSphere.center)),sn.applyMatrix4(R.matrixWorld).applyMatrix4(an)),Array.isArray(Ne)){const Xe=Ge.groups;for(let ke=0,$e=Xe.length;ke<$e;ke++){const ot=Xe[ke],Ze=Ne[ot.materialIndex];Ze&&Ze.visible&&P.push(R,Ge,Ze,se,sn.z,ot)}}else Ne.visible&&P.push(R,Ge,Ne,se,sn.z,null)}}const Oe=R.children;for(let Ge=0,Ne=Oe.length;Ge<Ne;Ge++)cr(Oe[Ge],W,se,ne)}function al(R,W,se,ne){const{opaque:ie,transmissive:Oe,transparent:Ge}=R;L.setupLightsView(se),St===!0&&Ke.setGlobalState(k.clippingPlanes,se),ne&&E.viewport(I.copy(ne)),ie.length>0&&ur(ie,W,se),Oe.length>0&&ur(Oe,W,se),Ge.length>0&&ur(Ge,W,se),E.buffers.depth.setTest(!0),E.buffers.depth.setMask(!0),E.buffers.color.setMask(!0),E.setPolygonOffset(!1)}function rl(R,W,se,ne){if((se.isScene===!0?se.overrideMaterial:null)!==null)return;if(L.state.transmissionRenderTarget[ne.id]===void 0){const Ze=wt.has("EXT_color_buffer_half_float")||wt.has("EXT_color_buffer_float");L.state.transmissionRenderTarget[ne.id]=new Zi(1,1,{generateMipmaps:!0,type:Ze?Ta:Ti,minFilter:Ir,samples:Math.max(4,O.samples),stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:yt.workingColorSpace})}const Oe=L.state.transmissionRenderTarget[ne.id],Ge=ne.viewport||I;Oe.setSize(Ge.z*k.transmissionResolutionScale,Ge.w*k.transmissionResolutionScale);const Ne=k.getRenderTarget(),Xe=k.getActiveCubeFace(),ke=k.getActiveMipmapLevel();k.setRenderTarget(Oe),k.getClearColor(Re),Ie=k.getClearAlpha(),Ie<1&&k.setClearColor(16777215,.5),k.clear(),Wt&&at.render(se);const $e=k.toneMapping;k.toneMapping=Yi;const ot=ne.viewport;if(ne.viewport!==void 0&&(ne.viewport=void 0),L.setupLightsView(ne),St===!0&&Ke.setGlobalState(k.clippingPlanes,ne),ur(R,se,ne),de.updateMultisampleRenderTarget(Oe),de.updateRenderTargetMipmap(Oe),wt.has("WEBGL_multisampled_render_to_texture")===!1){let Ze=!1;for(let At=0,jt=W.length;At<jt;At++){const kt=W[At],{object:Lt,geometry:Ot,material:Fe,group:Pn}=kt;if(Fe.side===pi&&Lt.layers.test(ne.layers)){const ht=Fe.side;Fe.side=$n,Fe.needsUpdate=!0,Ra(Lt,se,ne,Ot,Fe,Pn),Fe.side=ht,Fe.needsUpdate=!0,Ze=!0}}Ze===!0&&(de.updateMultisampleRenderTarget(Oe),de.updateRenderTargetMipmap(Oe))}k.setRenderTarget(Ne,Xe,ke),k.setClearColor(Re,Ie),ot!==void 0&&(ne.viewport=ot),k.toneMapping=$e}function ur(R,W,se){const ne=W.isScene===!0?W.overrideMaterial:null;for(let ie=0,Oe=R.length;ie<Oe;ie++){const Ge=R[ie],{object:Ne,geometry:Xe,group:ke}=Ge;let $e=Ge.material;$e.allowOverride===!0&&ne!==null&&($e=ne),Ne.layers.test(se.layers)&&Ra(Ne,W,se,Xe,$e,ke)}}function Ra(R,W,se,ne,ie,Oe){R.onBeforeRender(k,W,se,ne,ie,Oe),R.modelViewMatrix.multiplyMatrices(se.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),ie.onBeforeRender(k,W,se,ne,R,Oe),ie.transparent===!0&&ie.side===pi&&ie.forceSinglePass===!1?(ie.side=$n,ie.needsUpdate=!0,k.renderBufferDirect(se,W,ne,ie,R,Oe),ie.side=lr,ie.needsUpdate=!0,k.renderBufferDirect(se,W,ne,ie,R,Oe),ie.side=pi):k.renderBufferDirect(se,W,ne,ie,R,Oe),R.onAfterRender(k,W,se,ne,ie,Oe)}function Ca(R,W,se){W.isScene!==!0&&(W=dn);const ne=re.get(R),ie=L.state.lights,Oe=L.state.shadowsArray,Ge=ie.state.version,Ne=Ae.getParameters(R,ie.state,Oe,W,se,L.state.lightProbeGridArray),Xe=Ae.getProgramCacheKey(Ne);let ke=ne.programs;ne.environment=R.isMeshStandardMaterial||R.isMeshLambertMaterial||R.isMeshPhongMaterial?W.environment:null,ne.fog=W.fog;const $e=R.isMeshStandardMaterial||R.isMeshLambertMaterial&&!R.envMap||R.isMeshPhongMaterial&&!R.envMap;ne.envMap=be.get(R.envMap||ne.environment,$e),ne.envMapRotation=ne.environment!==null&&R.envMap===null?W.environmentRotation:R.envMapRotation,ke===void 0&&(R.addEventListener("dispose",ti),ke=new Map,ne.programs=ke);let ot=ke.get(Xe);if(ot!==void 0){if(ne.currentProgram===ot&&ne.lightsStateVersion===Ge)return $i(R,Ne),ot}else Ne.uniforms=Ae.getUniforms(R),Z!==null&&R.isNodeMaterial&&Z.build(R,se,Ne),R.onBeforeCompile(Ne,k),ot=Ae.acquireProgram(Ne,Xe),ke.set(Xe,ot),ne.uniforms=Ne.uniforms;const Ze=ne.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Ze.clippingPlanes=Ke.uniform),$i(R,Ne),ne.needsLights=sl(R),ne.lightsStateVersion=Ge,ne.needsLights&&(Ze.ambientLightColor.value=ie.state.ambient,Ze.lightProbe.value=ie.state.probe,Ze.directionalLights.value=ie.state.directional,Ze.directionalLightShadows.value=ie.state.directionalShadow,Ze.spotLights.value=ie.state.spot,Ze.spotLightShadows.value=ie.state.spotShadow,Ze.rectAreaLights.value=ie.state.rectArea,Ze.ltc_1.value=ie.state.rectAreaLTC1,Ze.ltc_2.value=ie.state.rectAreaLTC2,Ze.pointLights.value=ie.state.point,Ze.pointLightShadows.value=ie.state.pointShadow,Ze.hemisphereLights.value=ie.state.hemi,Ze.directionalShadowMatrix.value=ie.state.directionalShadowMatrix,Ze.spotLightMatrix.value=ie.state.spotLightMatrix,Ze.spotLightMap.value=ie.state.spotLightMap,Ze.pointShadowMatrix.value=ie.state.pointShadowMatrix),ne.lightProbeGrid=L.state.lightProbeGridArray.length>0,ne.currentProgram=ot,ne.uniformsList=null,ot}function ji(R){if(R.uniformsList===null){const W=R.currentProgram.getUniforms();R.uniformsList=Kc.seqWithValue(W.seq,R.uniforms)}return R.uniformsList}function $i(R,W){const se=re.get(R);se.outputColorSpace=W.outputColorSpace,se.batching=W.batching,se.batchingColor=W.batchingColor,se.instancing=W.instancing,se.instancingColor=W.instancingColor,se.instancingMorph=W.instancingMorph,se.skinning=W.skinning,se.morphTargets=W.morphTargets,se.morphNormals=W.morphNormals,se.morphColors=W.morphColors,se.morphTargetsCount=W.morphTargetsCount,se.numClippingPlanes=W.numClippingPlanes,se.numIntersection=W.numClipIntersection,se.vertexAlphas=W.vertexAlphas,se.vertexTangents=W.vertexTangents,se.toneMapping=W.toneMapping}function fr(R,W){if(R.length===0)return null;if(R.length===1)return R[0].texture!==null?R[0]:null;A.setFromMatrixPosition(W.matrixWorld);for(let se=0,ne=R.length;se<ne;se++){const ie=R[se];if(ie.texture!==null&&ie.boundingBox.containsPoint(A))return ie}return null}function wa(R,W,se,ne,ie){W.isScene!==!0&&(W=dn),de.resetTextureUnits();const Oe=W.fog,Ge=ne.isMeshStandardMaterial||ne.isMeshLambertMaterial||ne.isMeshPhongMaterial?W.environment:null,Ne=te===null?k.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:yt.workingColorSpace,Xe=ne.isMeshStandardMaterial||ne.isMeshLambertMaterial&&!ne.envMap||ne.isMeshPhongMaterial&&!ne.envMap,ke=be.get(ne.envMap||Ge,Xe),$e=ne.vertexColors===!0&&!!se.attributes.color&&se.attributes.color.itemSize===4,ot=!!se.attributes.tangent&&(!!ne.normalMap||ne.anisotropy>0),Ze=!!se.morphAttributes.position,At=!!se.morphAttributes.normal,jt=!!se.morphAttributes.color;let kt=Yi;ne.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(kt=k.toneMapping);const Lt=se.morphAttributes.position||se.morphAttributes.normal||se.morphAttributes.color,Ot=Lt!==void 0?Lt.length:0,Fe=re.get(ne),Pn=L.state.lights;if(St===!0&&(dt===!0||R!==Ee)){const Ut=R===Ee&&ne.id===ge;Ke.setState(ne,R,Ut)}let ht=!1;ne.version===Fe.__version?(Fe.needsLights&&Fe.lightsStateVersion!==Pn.state.version||Fe.outputColorSpace!==Ne||ie.isBatchedMesh&&Fe.batching===!1||!ie.isBatchedMesh&&Fe.batching===!0||ie.isBatchedMesh&&Fe.batchingColor===!0&&ie.colorTexture===null||ie.isBatchedMesh&&Fe.batchingColor===!1&&ie.colorTexture!==null||ie.isInstancedMesh&&Fe.instancing===!1||!ie.isInstancedMesh&&Fe.instancing===!0||ie.isSkinnedMesh&&Fe.skinning===!1||!ie.isSkinnedMesh&&Fe.skinning===!0||ie.isInstancedMesh&&Fe.instancingColor===!0&&ie.instanceColor===null||ie.isInstancedMesh&&Fe.instancingColor===!1&&ie.instanceColor!==null||ie.isInstancedMesh&&Fe.instancingMorph===!0&&ie.morphTexture===null||ie.isInstancedMesh&&Fe.instancingMorph===!1&&ie.morphTexture!==null||Fe.envMap!==ke||ne.fog===!0&&Fe.fog!==Oe||Fe.numClippingPlanes!==void 0&&(Fe.numClippingPlanes!==Ke.numPlanes||Fe.numIntersection!==Ke.numIntersection)||Fe.vertexAlphas!==$e||Fe.vertexTangents!==ot||Fe.morphTargets!==Ze||Fe.morphNormals!==At||Fe.morphColors!==jt||Fe.toneMapping!==kt||Fe.morphTargetsCount!==Ot||!!Fe.lightProbeGrid!=L.state.lightProbeGridArray.length>0)&&(ht=!0):(ht=!0,Fe.__version=ne.version);let yn=Fe.currentProgram;ht===!0&&(yn=Ca(ne,W,ie),Z&&ne.isNodeMaterial&&Z.onUpdateProgram(ne,yn,Fe));let ni=!1,Ri=!1,ii=!1;const Pt=yn.getUniforms(),$t=Fe.uniforms;if(E.useProgram(yn.program)&&(ni=!0,Ri=!0,ii=!0),ne.id!==ge&&(ge=ne.id,Ri=!0),Fe.needsLights){const Ut=fr(L.state.lightProbeGridArray,ie);Fe.lightProbeGrid!==Ut&&(Fe.lightProbeGrid=Ut,Ri=!0)}if(ni||Ee!==R){E.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),Pt.setValue(q,"projectionMatrix",R.projectionMatrix),Pt.setValue(q,"viewMatrix",R.matrixWorldInverse);const Bi=Pt.map.cameraPosition;Bi!==void 0&&Bi.setValue(q,rn.setFromMatrixPosition(R.matrixWorld)),O.logarithmicDepthBuffer&&Pt.setValue(q,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(ne.isMeshPhongMaterial||ne.isMeshToonMaterial||ne.isMeshLambertMaterial||ne.isMeshBasicMaterial||ne.isMeshStandardMaterial||ne.isShaderMaterial)&&Pt.setValue(q,"isOrthographic",R.isOrthographicCamera===!0),Ee!==R&&(Ee=R,Ri=!0,ii=!0)}if(Fe.needsLights&&(Pn.state.directionalShadowMap.length>0&&Pt.setValue(q,"directionalShadowMap",Pn.state.directionalShadowMap,de),Pn.state.spotShadowMap.length>0&&Pt.setValue(q,"spotShadowMap",Pn.state.spotShadowMap,de),Pn.state.pointShadowMap.length>0&&Pt.setValue(q,"pointShadowMap",Pn.state.pointShadowMap,de)),ie.isSkinnedMesh){Pt.setOptional(q,ie,"bindMatrix"),Pt.setOptional(q,ie,"bindMatrixInverse");const Ut=ie.skeleton;Ut&&(Ut.boneTexture===null&&Ut.computeBoneTexture(),Pt.setValue(q,"boneTexture",Ut.boneTexture,de))}ie.isBatchedMesh&&(Pt.setOptional(q,ie,"batchingTexture"),Pt.setValue(q,"batchingTexture",ie._matricesTexture,de),Pt.setOptional(q,ie,"batchingIdTexture"),Pt.setValue(q,"batchingIdTexture",ie._indirectTexture,de),Pt.setOptional(q,ie,"batchingColorTexture"),ie._colorsTexture!==null&&Pt.setValue(q,"batchingColorTexture",ie._colorsTexture,de));const Ci=se.morphAttributes;if((Ci.position!==void 0||Ci.normal!==void 0||Ci.color!==void 0)&&X.update(ie,se,yn),(Ri||Fe.receiveShadow!==ie.receiveShadow)&&(Fe.receiveShadow=ie.receiveShadow,Pt.setValue(q,"receiveShadow",ie.receiveShadow)),(ne.isMeshStandardMaterial||ne.isMeshLambertMaterial||ne.isMeshPhongMaterial)&&ne.envMap===null&&W.environment!==null&&($t.envMapIntensity.value=W.environmentIntensity),$t.dfgLUT!==void 0&&($t.dfgLUT.value=tR()),Ri){if(Pt.setValue(q,"toneMappingExposure",k.toneMappingExposure),Fe.needsLights&&gn($t,ii),Oe&&ne.fog===!0&&ze.refreshFogUniforms($t,Oe),ze.refreshMaterialUniforms($t,ne,Me,xe,L.state.transmissionRenderTarget[R.id]),Fe.needsLights&&Fe.lightProbeGrid){const Ut=Fe.lightProbeGrid;$t.probesSH.value=Ut.texture,$t.probesMin.value.copy(Ut.boundingBox.min),$t.probesMax.value.copy(Ut.boundingBox.max),$t.probesResolution.value.copy(Ut.resolution)}Kc.upload(q,ji(Fe),$t,de)}if(ne.isShaderMaterial&&ne.uniformsNeedUpdate===!0&&(Kc.upload(q,ji(Fe),$t,de),ne.uniformsNeedUpdate=!1),ne.isSpriteMaterial&&Pt.setValue(q,"center",ie.center),Pt.setValue(q,"modelViewMatrix",ie.modelViewMatrix),Pt.setValue(q,"normalMatrix",ie.normalMatrix),Pt.setValue(q,"modelMatrix",ie.matrixWorld),ne.uniformsGroups!==void 0){const Ut=ne.uniformsGroups;for(let Bi=0,Da=Ut.length;Bi<Da;Bi++){const dr=Ut[Bi];Se.update(dr,yn),Se.bind(dr,yn)}}return yn}function gn(R,W){R.ambientLightColor.needsUpdate=W,R.lightProbe.needsUpdate=W,R.directionalLights.needsUpdate=W,R.directionalLightShadows.needsUpdate=W,R.pointLights.needsUpdate=W,R.pointLightShadows.needsUpdate=W,R.spotLights.needsUpdate=W,R.spotLightShadows.needsUpdate=W,R.rectAreaLights.needsUpdate=W,R.hemisphereLights.needsUpdate=W}function sl(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return te},this.setRenderTargetTextures=function(R,W,se){const ne=re.get(R);ne.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,ne.__autoAllocateDepthBuffer===!1&&(ne.__useRenderToTexture=!1),re.get(R.texture).__webglTexture=W,re.get(R.depthTexture).__webglTexture=ne.__autoAllocateDepthBuffer?void 0:se,ne.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,W){const se=re.get(R);se.__webglFramebuffer=W,se.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(R,W=0,se=0){te=R,z=W,F=se;let ne=null,ie=!1,Oe=!1;if(R){const Ne=re.get(R);if(Ne.__useDefaultFramebuffer!==void 0){E.bindFramebuffer(q.FRAMEBUFFER,Ne.__webglFramebuffer),I.copy(R.viewport),J.copy(R.scissor),ye=R.scissorTest,E.viewport(I),E.scissor(J),E.setScissorTest(ye),ge=-1;return}else if(Ne.__webglFramebuffer===void 0)de.setupRenderTarget(R);else if(Ne.__hasExternalTextures)de.rebindTextures(R,re.get(R.texture).__webglTexture,re.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const $e=R.depthTexture;if(Ne.__boundDepthTexture!==$e){if($e!==null&&re.has($e)&&(R.width!==$e.image.width||R.height!==$e.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");de.setupDepthRenderbuffer(R)}}const Xe=R.texture;(Xe.isData3DTexture||Xe.isDataArrayTexture||Xe.isCompressedArrayTexture)&&(Oe=!0);const ke=re.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(ke[W])?ne=ke[W][se]:ne=ke[W],ie=!0):R.samples>0&&de.useMultisampledRTT(R)===!1?ne=re.get(R).__webglMultisampledFramebuffer:Array.isArray(ke)?ne=ke[se]:ne=ke,I.copy(R.viewport),J.copy(R.scissor),ye=R.scissorTest}else I.copy(Je).multiplyScalar(Me).floor(),J.copy(Zt).multiplyScalar(Me).floor(),ye=ft;if(se!==0&&(ne=ce),E.bindFramebuffer(q.FRAMEBUFFER,ne)&&E.drawBuffers(R,ne),E.viewport(I),E.scissor(J),E.setScissorTest(ye),ie){const Ne=re.get(R.texture);q.framebufferTexture2D(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_CUBE_MAP_POSITIVE_X+W,Ne.__webglTexture,se)}else if(Oe){const Ne=W;for(let Xe=0;Xe<R.textures.length;Xe++){const ke=re.get(R.textures[Xe]);q.framebufferTextureLayer(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0+Xe,ke.__webglTexture,se,Ne)}}else if(R!==null&&se!==0){const Ne=re.get(R.texture);q.framebufferTexture2D(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_2D,Ne.__webglTexture,se)}ge=-1},this.readRenderTargetPixels=function(R,W,se,ne,ie,Oe,Ge,Ne=0){if(!(R&&R.isWebGLRenderTarget)){Tt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Xe=re.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ge!==void 0&&(Xe=Xe[Ge]),Xe){E.bindFramebuffer(q.FRAMEBUFFER,Xe);try{const ke=R.textures[Ne],$e=ke.format,ot=ke.type;if(R.textures.length>1&&q.readBuffer(q.COLOR_ATTACHMENT0+Ne),!O.textureFormatReadable($e)){Tt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!O.textureTypeReadable(ot)){Tt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=R.width-ne&&se>=0&&se<=R.height-ie&&q.readPixels(W,se,ne,ie,Ce.convert($e),Ce.convert(ot),Oe)}finally{const ke=te!==null?re.get(te).__webglFramebuffer:null;E.bindFramebuffer(q.FRAMEBUFFER,ke)}}},this.readRenderTargetPixelsAsync=async function(R,W,se,ne,ie,Oe,Ge,Ne=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Xe=re.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ge!==void 0&&(Xe=Xe[Ge]),Xe)if(W>=0&&W<=R.width-ne&&se>=0&&se<=R.height-ie){E.bindFramebuffer(q.FRAMEBUFFER,Xe);const ke=R.textures[Ne],$e=ke.format,ot=ke.type;if(R.textures.length>1&&q.readBuffer(q.COLOR_ATTACHMENT0+Ne),!O.textureFormatReadable($e))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!O.textureTypeReadable(ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ze=q.createBuffer();q.bindBuffer(q.PIXEL_PACK_BUFFER,Ze),q.bufferData(q.PIXEL_PACK_BUFFER,Oe.byteLength,q.STREAM_READ),q.readPixels(W,se,ne,ie,Ce.convert($e),Ce.convert(ot),0);const At=te!==null?re.get(te).__webglFramebuffer:null;E.bindFramebuffer(q.FRAMEBUFFER,At);const jt=q.fenceSync(q.SYNC_GPU_COMMANDS_COMPLETE,0);return q.flush(),await ly(q,jt,4),q.bindBuffer(q.PIXEL_PACK_BUFFER,Ze),q.getBufferSubData(q.PIXEL_PACK_BUFFER,0,Oe),q.deleteBuffer(Ze),q.deleteSync(jt),Oe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,W=null,se=0){const ne=Math.pow(2,-se),ie=Math.floor(R.image.width*ne),Oe=Math.floor(R.image.height*ne),Ge=W!==null?W.x:0,Ne=W!==null?W.y:0;de.setTexture2D(R,0),q.copyTexSubImage2D(q.TEXTURE_2D,se,0,0,Ge,Ne,ie,Oe),E.unbindTexture()},this.copyTextureToTexture=function(R,W,se=null,ne=null,ie=0,Oe=0){let Ge,Ne,Xe,ke,$e,ot,Ze,At,jt;const kt=R.isCompressedTexture?R.mipmaps[Oe]:R.image;if(se!==null)Ge=se.max.x-se.min.x,Ne=se.max.y-se.min.y,Xe=se.isBox3?se.max.z-se.min.z:1,ke=se.min.x,$e=se.min.y,ot=se.isBox3?se.min.z:0;else{const $t=Math.pow(2,-ie);Ge=Math.floor(kt.width*$t),Ne=Math.floor(kt.height*$t),R.isDataArrayTexture?Xe=kt.depth:R.isData3DTexture?Xe=Math.floor(kt.depth*$t):Xe=1,ke=0,$e=0,ot=0}ne!==null?(Ze=ne.x,At=ne.y,jt=ne.z):(Ze=0,At=0,jt=0);const Lt=Ce.convert(W.format),Ot=Ce.convert(W.type);let Fe;W.isData3DTexture?(de.setTexture3D(W,0),Fe=q.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(de.setTexture2DArray(W,0),Fe=q.TEXTURE_2D_ARRAY):(de.setTexture2D(W,0),Fe=q.TEXTURE_2D),E.activeTexture(q.TEXTURE0),E.pixelStorei(q.UNPACK_FLIP_Y_WEBGL,W.flipY),E.pixelStorei(q.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),E.pixelStorei(q.UNPACK_ALIGNMENT,W.unpackAlignment);const Pn=E.getParameter(q.UNPACK_ROW_LENGTH),ht=E.getParameter(q.UNPACK_IMAGE_HEIGHT),yn=E.getParameter(q.UNPACK_SKIP_PIXELS),ni=E.getParameter(q.UNPACK_SKIP_ROWS),Ri=E.getParameter(q.UNPACK_SKIP_IMAGES);E.pixelStorei(q.UNPACK_ROW_LENGTH,kt.width),E.pixelStorei(q.UNPACK_IMAGE_HEIGHT,kt.height),E.pixelStorei(q.UNPACK_SKIP_PIXELS,ke),E.pixelStorei(q.UNPACK_SKIP_ROWS,$e),E.pixelStorei(q.UNPACK_SKIP_IMAGES,ot);const ii=R.isDataArrayTexture||R.isData3DTexture,Pt=W.isDataArrayTexture||W.isData3DTexture;if(R.isDepthTexture){const $t=re.get(R),Ci=re.get(W),Ut=re.get($t.__renderTarget),Bi=re.get(Ci.__renderTarget);E.bindFramebuffer(q.READ_FRAMEBUFFER,Ut.__webglFramebuffer),E.bindFramebuffer(q.DRAW_FRAMEBUFFER,Bi.__webglFramebuffer);for(let Da=0;Da<Xe;Da++)ii&&(q.framebufferTextureLayer(q.READ_FRAMEBUFFER,q.COLOR_ATTACHMENT0,re.get(R).__webglTexture,ie,ot+Da),q.framebufferTextureLayer(q.DRAW_FRAMEBUFFER,q.COLOR_ATTACHMENT0,re.get(W).__webglTexture,Oe,jt+Da)),q.blitFramebuffer(ke,$e,Ge,Ne,Ze,At,Ge,Ne,q.DEPTH_BUFFER_BIT,q.NEAREST);E.bindFramebuffer(q.READ_FRAMEBUFFER,null),E.bindFramebuffer(q.DRAW_FRAMEBUFFER,null)}else if(ie!==0||R.isRenderTargetTexture||re.has(R)){const $t=re.get(R),Ci=re.get(W);E.bindFramebuffer(q.READ_FRAMEBUFFER,le),E.bindFramebuffer(q.DRAW_FRAMEBUFFER,Y);for(let Ut=0;Ut<Xe;Ut++)ii?q.framebufferTextureLayer(q.READ_FRAMEBUFFER,q.COLOR_ATTACHMENT0,$t.__webglTexture,ie,ot+Ut):q.framebufferTexture2D(q.READ_FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_2D,$t.__webglTexture,ie),Pt?q.framebufferTextureLayer(q.DRAW_FRAMEBUFFER,q.COLOR_ATTACHMENT0,Ci.__webglTexture,Oe,jt+Ut):q.framebufferTexture2D(q.DRAW_FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_2D,Ci.__webglTexture,Oe),ie!==0?q.blitFramebuffer(ke,$e,Ge,Ne,Ze,At,Ge,Ne,q.COLOR_BUFFER_BIT,q.NEAREST):Pt?q.copyTexSubImage3D(Fe,Oe,Ze,At,jt+Ut,ke,$e,Ge,Ne):q.copyTexSubImage2D(Fe,Oe,Ze,At,ke,$e,Ge,Ne);E.bindFramebuffer(q.READ_FRAMEBUFFER,null),E.bindFramebuffer(q.DRAW_FRAMEBUFFER,null)}else Pt?R.isDataTexture||R.isData3DTexture?q.texSubImage3D(Fe,Oe,Ze,At,jt,Ge,Ne,Xe,Lt,Ot,kt.data):W.isCompressedArrayTexture?q.compressedTexSubImage3D(Fe,Oe,Ze,At,jt,Ge,Ne,Xe,Lt,kt.data):q.texSubImage3D(Fe,Oe,Ze,At,jt,Ge,Ne,Xe,Lt,Ot,kt):R.isDataTexture?q.texSubImage2D(q.TEXTURE_2D,Oe,Ze,At,Ge,Ne,Lt,Ot,kt.data):R.isCompressedTexture?q.compressedTexSubImage2D(q.TEXTURE_2D,Oe,Ze,At,kt.width,kt.height,Lt,kt.data):q.texSubImage2D(q.TEXTURE_2D,Oe,Ze,At,Ge,Ne,Lt,Ot,kt);E.pixelStorei(q.UNPACK_ROW_LENGTH,Pn),E.pixelStorei(q.UNPACK_IMAGE_HEIGHT,ht),E.pixelStorei(q.UNPACK_SKIP_PIXELS,yn),E.pixelStorei(q.UNPACK_SKIP_ROWS,ni),E.pixelStorei(q.UNPACK_SKIP_IMAGES,Ri),Oe===0&&W.generateMipmaps&&q.generateMipmap(Fe),E.unbindTexture()},this.initRenderTarget=function(R){re.get(R).__webglFramebuffer===void 0&&de.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?de.setTextureCube(R,0):R.isData3DTexture?de.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?de.setTexture2DArray(R,0):de.setTexture2D(R,0),E.unbindTexture()},this.resetState=function(){z=0,F=0,te=null,E.reset(),Be.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return qi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const i=this.getContext();i.drawingBufferColorSpace=yt._getDrawingBufferColorSpace(e),i.unpackColorSpace=yt._getUnpackColorSpace()}}const Yh=3.4,iR=28,Zh=6,nx=-2;function aR(s){return .18+Math.pow(Math.max(0,Math.min(1,s)),1.6)*.86}function rR(s){return Math.max(.29,Math.min(1,s/1.55))}function sR(){return[[-.78,-.78,-.14,-.14],[.14,.14,.78,.78],[-.78,.78,-.14,.14],[.14,-.14,.78,-.78]]}function oR(s){return .55+.45*s}const tn={void:132363,cyan:5564415,magenta:16718008,danger:3211289,pickup:14285823,hull:2378375};function lR(s=6.2,e=.72){return Array.from({length:8},(i,r)=>{const l=Math.PI/8+r*Math.PI/4;return new Q(Math.cos(l)*s,Math.sin(l)*s*e+1.2,0)})}function fv(s,e){const i=lR(s),r=[];for(let c=0;c<i.length;c+=1){const d=i[c],p=i[(c+1)%i.length],m=p.x-d.x,h=p.y-d.y,_=Math.hypot(m,h)||1,x=-h/_*e*.5,g=m/_*e*.5;r.push(d.x+x,d.y+g,0,d.x-x,d.y-g,0,p.x+x,p.y+g,0,d.x-x,d.y-g,0,p.x-x,p.y-g,0,p.x+x,p.y+g,0)}const l=new nn;return l.setAttribute("position",new Yt(r,3)),l}function cR(s){const e=new Fn,i=new qt(fv(6.2,.19),new On({color:s,transparent:!0,opacity:.2,blending:zr,depthWrite:!1}));i.userData.layer="glow";const r=new qt(fv(6.2,.065),new On({color:s,transparent:!0,opacity:.92}));return r.userData.layer="core",e.add(i,r),e}function dv(s,e,i,r,l){const c=i-s,d=r-e,p=Math.hypot(c,d)||1,m=-d/p*l*.5,h=c/p*l*.5,_=-.585,x=new nn;return x.setAttribute("position",new Yt([s+m,_,e+h,s-m,_,e-h,i+m,_,r+h,s-m,_,e-h,i-m,_,r-h,i+m,_,r+h],3)),x}function hv(s,e,i,r,l,c){const d=i-s,p=r-e,m=Math.hypot(d,p)||1,h=-p/m*l*.5,_=d/m*l*.5,x=new nn;return x.setAttribute("position",new Yt([s+h,e+_,c,s-h,e-_,c,i+h,r+_,c,s-h,e-_,c,i-h,r-_,c,i+h,r+_,c],3)),x}function fu(s,e=1){return new Gv({color:s,transparent:e<1,opacity:e})}function pv(s,e){const i=new nn;return i.setAttribute("position",new Yt([0,.1,.2,s*2.35,-.05,.7,s*.85,.05,-.65],3)),i.computeVertexNormals(),new qt(i,e)}function uR(s,e){const i=new nn,r=s*.62;return i.setAttribute("position",new Yt([r-.11,-.08,.68,r+.11,-.08,.68,r,-.06,3.15],3)),new qt(i,e)}function fR(){const s=new Fn;s.name="glider";const e=new On({color:tn.hull,side:pi}),i=new On({color:tn.cyan}),r=new On({color:tn.magenta}),l=new On({color:tn.magenta,transparent:!0,opacity:.78,side:pi}),c=new qt(new Hs(.82,0),e);c.scale.set(1.1,.48,1.65),c.position.z=.15,s.add(c,pv(-1,e),pv(1,e));for(const p of[-1,1]){const m=new qt(new Hs(.3,0),r);m.position.set(p*.65,-.1,.78),s.add(m),s.add(uR(p,l))}const d=new qt(new Hs(.28,0),i);return d.scale.set(.72,.9,1.25),d.position.set(0,.35,-.12),s.add(d),s.traverse(p=>{if(!p.isMesh||p.material!==e)return;const m=new ou(new up(p.geometry),fu(tn.cyan,.65));p.add(m)}),s.scale.setScalar(.7),s.position.set(0,.45,2),s}function dR(){const s=new Fy;s.background=new Et(198419),s.fog=new op(198419,96,220);const e=new bi(64,16/9,.1,240);e.position.set(0,2.7,7.8),e.lookAt(0,.5,-32);const i=new Fn;i.name="tunnel";for(let M=0;M<iR;M+=1){const b=M%3===0?tn.magenta:tn.cyan,D=cR(b);D.position.z=nx-M*Zh,D.userData.baseIndex=M,i.add(D)}const r=new Fn;r.name="lanes";for(const M of[-1,0,1]){const b=M*Yh,D=M*.34,y=new nn;y.setAttribute("position",new Yt([b-.045,-.62,5,b+.045,-.62,5,D-.012,-.15,-174,b+.045,-.62,5,D+.012,-.15,-174,D-.012,-.15,-174],3));const S=new qt(y,new On({color:tn.cyan,transparent:!0,opacity:M===0?.78:.96}));r.add(S)}const l=new Fn;l.name="speed-lines";for(let M=0;M<18;M+=1){const b=M/18*Math.PI*2,D=Math.cos(b)*10.5,y=Math.sin(b)*5.8+1.15,S=Math.cos(b)*.68,w=Math.sin(b)*.42+1.15,U=-Math.sin(b)*.07,A=Math.cos(b)*.07,P=new nn;P.setAttribute("position",new Yt([D+U,y+A,5,D-U,y-A,5,S,w,-128],3)),l.add(new qt(P,new On({color:M%3===0?tn.magenta:tn.cyan,transparent:!0,opacity:M%2===0?.2:.1,blending:zr,depthWrite:!1,side:pi})))}const c=new Fn;c.name="flow";const d=new On({color:tn.magenta,transparent:!0,opacity:.82,blending:zr,depthWrite:!1,side:pi});for(let M=0;M<20;M+=1){const b=new Fn;b.userData.baseIndex=M,b.add(new qt(dv(-.72,.28,0,-.34,.11),d),new qt(dv(.72,.28,0,-.34,.11),d)),b.position.z=2-M*7,c.add(b)}const p=new Fn;p.name="starfield";const m=[];for(let M=0;M<420;M++){const b=M*2.399963,D=8+M%17*.8;m.push(Math.cos(b)*D,Math.sin(b)*D,-(M%160))}const h=new nn;h.setAttribute("position",new Yt(m,3)),p.add(new Qy(h,new Vv({color:tn.cyan,size:.055,transparent:!0,opacity:.65})));const _=new Fn;_.name="objects";const x=new Fn;x.name="effects";const g=fR();return s.add(p,l,i,r,c,g,_,x),{scene:s,camera:e,groups:{speedLines:l,tunnel:i,lanes:r,flow:c,glider:g,objects:_,effects:x}}}function hR(){const s=new Fn,e=new Zs(2.55,3.25,1.25),i=new qt(e,new On({color:tn.danger})),r=new ou(new up(e),fu(tn.magenta,1)),l=new On({color:tn.cyan,transparent:!0,opacity:.3,blending:zr}),c=new On({color:tn.magenta,transparent:!0,opacity:.96,blending:zr});s.add(i,r);for(const[d,p,m,h]of sR())s.add(new qt(hv(d,p,m,h,.22,.638),l),new qt(hv(d,p,m,h,.1,.65),c));return s}function pR(){const s=new Hs(.58,0),e=new qt(s,new On({color:tn.pickup,transparent:!0,opacity:.95})),i=new ou(new up(s),fu(tn.cyan,1)),r=new Fn;return r.add(e,i),r}function mR(){const s=new nn().setFromPoints([new Q(-.7,-.52,.4),new Q(0,-.48,-.35),new Q(0,-.48,-.35),new Q(.7,-.52,.4)]);return new ou(s,fu(tn.magenta,.86))}function nh(s){s.traverse(e=>{var i,r,l,c;(r=(i=e.geometry)==null?void 0:i.dispose)==null||r.call(i),Array.isArray(e.material)?e.material.forEach(d=>d.dispose()):(c=(l=e.material)==null?void 0:l.dispose)==null||c.call(l)})}function gR(s){const{scene:e,camera:i,groups:r}=dR(),l=new nR({canvas:s,antialias:!0,alpha:!1});l.outputColorSpace=hi,l.setClearColor(tn.void,1);const c=new Map,d=new qt(new au(1.15,.055,8,48),new On({color:tn.cyan,transparent:!0,opacity:0})),p=new qt(new au(1.28,.075,8,48),new On({color:tn.magenta,transparent:!0,opacity:0}));d.rotation.x=Math.PI/2,p.rotation.x=Math.PI/2,r.effects.add(d,p);let m=!1,h=!1,_=1;const x=w=>{w.preventDefault(),h=!0},g=()=>{h=!1};s.addEventListener("webglcontextlost",x,!1),s.addEventListener("webglcontextrestored",g,!1);function M(w){if(c.has(w.id))return c.get(w.id);const U=w.kind==="blocker"?hR():w.kind==="pickup"?pR():mR();return U.userData.kind=w.kind,r.objects.add(U),c.set(w.id,U),U}function b(w,U={collect:0,hit:0}){if(h)return;const A=performance.now(),P=w.distance*3.125%Zh,L=[tn.cyan,10258431,16759401,6488017],B=L[(w.gate-1)%L.length];r.tunnel.children.forEach((le,Y)=>{Y%3!==0&&le.children.forEach(z=>z.material.color.setHex(B))});const T=w.boosting&&!m?74:64;i.fov=g_.lerp(i.fov,T,.07),i.updateProjectionMatrix(),r.tunnel.children.forEach((le,Y)=>{le.position.z=nx-Y*Zh+P;const z=Math.max(0,Math.min(1,(le.position.z+40)/40));le.children.forEach(F=>{F.material.opacity=F.userData.layer==="glow"?.12+z*.3:.68+z*.32})});const N=w.distance*3.125%7;r.flow.children.forEach((le,Y)=>{le.position.z=2-Y*7+N;const z=Math.max(0,Math.min(1,(le.position.z+70)/70));le.visible=le.position.z<5.5,le.scale.setScalar(.35+z*.65)});const k=new Set;for(const le of w.objects){if(le.resolved)continue;k.add(le.id);const Y=M(le),z=1-Math.max(0,Math.min(1,le.z/118));if(Y.position.set(le.lane*Yh*_,le.kind==="pickup"?.28:.22,-le.z),le.kind==="blocker"){const F=aR(z);Y.scale.setScalar(F),Y.scale.x*=oR(_)}else if(le.kind==="pickup"){const F=.16+Math.pow(z,1.5)*.7;Y.scale.setScalar(F),Y.rotation.y=w.distance*.03}else Y.scale.setScalar(.42+z*1.2)}for(const[le,Y]of c)k.has(le)||(r.objects.remove(Y),nh(Y),c.delete(le));const G=w.lane*Yh*_;r.glider.position.x=g_.lerp(r.glider.position.x,G,m?.34:.18),r.glider.rotation.z=m?0:(r.glider.position.x-G)*.08,r.glider.position.y=.45+(m?0:Math.sin(w.distance*.13)*.055),i.position.y=2.7+(m?0:Math.sin(w.distance*.08)*.035);const Z=A-U.collect,ce=A-U.hit;d.position.copy(r.glider.position),p.position.copy(r.glider.position),d.material.opacity=Z<260?1-Z/260:0,p.material.opacity=ce<260?1-ce/260:0,d.scale.setScalar(1+Math.max(0,Z)/180),p.scale.setScalar(1+Math.max(0,ce)/150),l.render(e,i)}function D(w,U,A=window.devicePixelRatio){l.setPixelRatio(Math.min(2,A||1)),l.setSize(w,U,!1),i.aspect=w/Math.max(1,U),_=rR(i.aspect),r.lanes.scale.x=_,r.flow.scale.x=_,r.glider.scale.x=.7*_,i.updateProjectionMatrix()}function y(w){m=!!w}function S(){s.removeEventListener("webglcontextlost",x,!1),s.removeEventListener("webglcontextrestored",g,!1);for(const w of c.values())nh(w);c.clear(),nh(e),l.dispose()}return{render:b,resize:D,setReducedMotion:y,dispose:S}}function _R({canvasRef:s,reducedMotion:e,soundEnabled:i}){const[r,l]=Qe.useState(()=>_v(Date.now()&65535)),[c,d]=Qe.useState({collect:0,hit:0,message:"",messageAt:0}),p=Qe.useRef(r),m=Qe.useRef(null),h=Qe.useRef(null),_=Qe.useRef(i);Qe.useEffect(()=>{_.current=i},[i]);const x=Qe.useRef(0);Qe.useEffect(()=>{p.current=r},[r]),Qe.useEffect(()=>{const w=s.current;if(!w)return;const U=gR(w);h.current=RM(),m.current=U;const A=()=>{const N=w.getBoundingClientRect();U.resize(N.width,N.height,window.devicePixelRatio)},P=new ResizeObserver(A);P.observe(w),A();let L=0,B=performance.now();const T=N=>{var Z;const k=Math.min(50,N-B);B=N;let G=p.current;if(G.phase==="countdown"){const ce=N-x.current,le=Math.max(1,3-Math.floor(ce/650));ce>=1950?G=r_(G):G.countdown!==le&&(G={...G,countdown:le})}else if(G.phase==="playing"){const ce=AM(G,k);if(G=ce.state,ce.events.includes("collect")&&d(le=>({...le,collect:N})),ce.events.length){_.current&&((Z=h.current)==null||Z.play(ce.events.includes("hit")?"hit":ce.events[0]));const le=ce.events.includes("hit")?"HULL HIT −26":ce.events.includes("gate")?`SECTOR ${G.gate}`:ce.events.includes("collect")?"ENERGY +14":ce.events.includes("near-miss")?"CLOSE CALL":"";le&&d(Y=>({...Y,message:le,messageAt:N}))}ce.events.includes("hit")&&d(le=>({...le,hit:N}))}G!==p.current&&(p.current=G,l(G)),U.render(G,g.current),L=requestAnimationFrame(T)};return L=requestAnimationFrame(T),()=>{var N;cancelAnimationFrame(L),P.disconnect(),U.dispose(),(N=h.current)==null||N.dispose(),m.current=null}},[s]);const g=Qe.useRef(c);Qe.useEffect(()=>{g.current=c},[c]),Qe.useEffect(()=>{var w;(w=m.current)==null||w.setReducedMotion(e)},[e]);const M=Qe.useCallback(()=>{var U;_.current&&((U=h.current)==null||U.unlock()),x.current=performance.now();const w={...r_(p.current),phase:"countdown",countdown:3};p.current=w,d({collect:0,hit:0,message:"",messageAt:0}),l(w)},[]),b=Qe.useCallback(w=>{const U=EM(p.current,w);p.current=U,l(U)},[]),D=Qe.useCallback(()=>{const w=bM(p.current);p.current=w,l(w)},[]);Qe.useEffect(()=>{const w=()=>{if(document.hidden&&p.current.phase==="playing"){const U={...p.current,phase:"paused",boosting:!1};p.current=U,l(U)}};return document.addEventListener("visibilitychange",w),()=>document.removeEventListener("visibilitychange",w)},[]);const y=Qe.useCallback(w=>{const U=TM(p.current,w);p.current=U,l(U)},[]);return{state:r,effects:c,start:M,move:b,pause:D,restart:M,boost:y}}const vR=new Map([["bold",Qe.createElement(Qe.Fragment,null,Qe.createElement("path",{d:"M200,28H160a20,20,0,0,0-20,20V208a20,20,0,0,0,20,20h40a20,20,0,0,0,20-20V48A20,20,0,0,0,200,28Zm-4,176H164V52h32ZM96,28H56A20,20,0,0,0,36,48V208a20,20,0,0,0,20,20H96a20,20,0,0,0,20-20V48A20,20,0,0,0,96,28ZM92,204H60V52H92Z"}))],["duotone",Qe.createElement(Qe.Fragment,null,Qe.createElement("path",{d:"M208,48V208a8,8,0,0,1-8,8H160a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8h40A8,8,0,0,1,208,48ZM96,40H56a8,8,0,0,0-8,8V208a8,8,0,0,0,8,8H96a8,8,0,0,0,8-8V48A8,8,0,0,0,96,40Z",opacity:"0.2"}),Qe.createElement("path",{d:"M200,32H160a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm0,176H160V48h40ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Zm0,176H56V48H96Z"}))],["fill",Qe.createElement(Qe.Fragment,null,Qe.createElement("path",{d:"M216,48V208a16,16,0,0,1-16,16H160a16,16,0,0,1-16-16V48a16,16,0,0,1,16-16h40A16,16,0,0,1,216,48ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Z"}))],["light",Qe.createElement(Qe.Fragment,null,Qe.createElement("path",{d:"M200,34H160a14,14,0,0,0-14,14V208a14,14,0,0,0,14,14h40a14,14,0,0,0,14-14V48A14,14,0,0,0,200,34Zm2,174a2,2,0,0,1-2,2H160a2,2,0,0,1-2-2V48a2,2,0,0,1,2-2h40a2,2,0,0,1,2,2ZM96,34H56A14,14,0,0,0,42,48V208a14,14,0,0,0,14,14H96a14,14,0,0,0,14-14V48A14,14,0,0,0,96,34Zm2,174a2,2,0,0,1-2,2H56a2,2,0,0,1-2-2V48a2,2,0,0,1,2-2H96a2,2,0,0,1,2,2Z"}))],["regular",Qe.createElement(Qe.Fragment,null,Qe.createElement("path",{d:"M200,32H160a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm0,176H160V48h40ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Zm0,176H56V48H96Z"}))],["thin",Qe.createElement(Qe.Fragment,null,Qe.createElement("path",{d:"M200,36H160a12,12,0,0,0-12,12V208a12,12,0,0,0,12,12h40a12,12,0,0,0,12-12V48A12,12,0,0,0,200,36Zm4,172a4,4,0,0,1-4,4H160a4,4,0,0,1-4-4V48a4,4,0,0,1,4-4h40a4,4,0,0,1,4,4ZM96,36H56A12,12,0,0,0,44,48V208a12,12,0,0,0,12,12H96a12,12,0,0,0,12-12V48A12,12,0,0,0,96,36Zm4,172a4,4,0,0,1-4,4H56a4,4,0,0,1-4-4V48a4,4,0,0,1,4-4H96a4,4,0,0,1,4,4Z"}))]]),xR=Qe.createContext({color:"currentColor",size:"1em",weight:"regular",mirrored:!1}),ix=Qe.forwardRef((s,e)=>{const{alt:i,color:r,size:l,weight:c,mirrored:d,children:p,weights:m,...h}=s,{color:_="currentColor",size:x,weight:g="regular",mirrored:M=!1,...b}=Qe.useContext(xR);return Qe.createElement("svg",{ref:e,xmlns:"http://www.w3.org/2000/svg",width:l??x,height:l??x,fill:r??_,viewBox:"0 0 256 256",transform:d||M?"scale(-1, 1)":void 0,...b,...h},!!i&&Qe.createElement("title",null,i),p,m.get(c??g))});ix.displayName="IconBase";const ax=Qe.forwardRef((s,e)=>Qe.createElement(ix,{ref:e,...s,weights:vR}));ax.displayName="PauseIcon";const SR=ax;function MR({state:s,onPause:e}){return["start","gameover"].includes(s.phase)?null:we.jsxs("div",{className:"game-hud",children:[we.jsxs("section",{className:"hud-score","aria-label":"Score",children:[we.jsx("span",{children:"SCORE"}),we.jsx("strong",{children:Math.round(s.score).toLocaleString()}),we.jsxs("span",{children:["MULTIPLIER · ",s.combo," COMBO"]}),we.jsxs("b",{children:["×",s.multiplier.toFixed(1)]})]}),we.jsxs("section",{className:"hud-distance","aria-label":"Distance and gate",children:[we.jsx("span",{children:"DISTANCE"}),we.jsxs("strong",{children:[Math.round(s.distance),we.jsx("small",{children:"m"})]}),we.jsxs("b",{children:["GATE ",s.gate]}),we.jsxs("small",{className:"speed-readout",children:["SPEED ",Math.round(s.speed)]})]}),we.jsxs("section",{className:"hud-energy","aria-label":"Energy",children:[we.jsx("span",{children:"ENERGY"}),we.jsx("div",{className:"energy-track",role:"progressbar","aria-label":"Energy","aria-valuemin":"0","aria-valuemax":"100","aria-valuenow":Math.round(s.energy),children:we.jsx("i",{style:{width:`${s.energy}%`}})})]}),s.phase==="playing"&&we.jsx("button",{className:"pause-button",onClick:e,"aria-label":"Pause",children:we.jsx(SR,{weight:"fill"})})]})}function yR({state:s,highScore:e,soundEnabled:i,onSoundChange:r,reducedMotion:l,onReducedMotionChange:c,onStart:d,onResume:p,onRestart:m}){const h=Qe.useRef(null);return Qe.useEffect(()=>{var _;["start","paused","gameover"].includes(s.phase)&&((_=h.current)==null||_.focus())},[s.phase]),s.phase==="playing"?null:s.phase==="start"?we.jsx("section",{className:"game-overlay start-overlay","aria-label":"NEON GLIDER",children:we.jsxs("div",{className:"overlay-copy",children:[we.jsx("p",{className:"eyebrow",children:"FLIGHT SYSTEM / 02"}),we.jsxs("h1",{children:["NEON",we.jsx("br",{}),we.jsx("em",{children:"GLIDER"})]}),we.jsx("p",{className:"mission",children:"SURVIVE. DODGE OBSTACLES. KEEP YOUR ENERGY UP."}),we.jsxs("p",{className:"high-score",children:["HIGH SCORE ",e.toLocaleString()]}),we.jsxs("div",{className:"flight-brief",children:[we.jsxs("span",{children:[we.jsx("b",{children:"01"})," DODGE THE BLOCKERS"]}),we.jsxs("span",{children:[we.jsx("b",{children:"02"})," COLLECT ENERGY"]}),we.jsxs("span",{children:[we.jsx("b",{children:"03"})," BOOST. CHASE YOUR BEST."]})]}),we.jsx("p",{className:"controls-copy",children:"A / D — CHANGE LANE    ESC / P — PAUSE · SPACE — BOOST"}),we.jsx("button",{ref:h,className:"primary-button",onClick:d,children:"Start"}),we.jsx("p",{className:"launch-note",children:"THREE LANES. ONE WAY FORWARD."}),we.jsxs("label",{className:"motion-toggle",children:[we.jsx("input",{type:"checkbox",checked:i,onChange:_=>r(_.target.checked)}),we.jsx("span",{children:"Sound effects"})]}),we.jsxs("label",{className:"motion-toggle",children:[we.jsx("input",{type:"checkbox",checked:l,onChange:_=>c(_.target.checked)}),we.jsx("span",{children:"Reduced motion"})]})]})}):s.phase==="countdown"?we.jsxs("section",{className:"countdown-overlay",role:"status","aria-live":"polite",children:[we.jsx("span",{children:"STARTING IN"}),we.jsx("strong",{children:s.countdown})]}):s.phase==="paused"?we.jsxs("section",{className:"game-overlay compact-overlay",children:[we.jsx("p",{className:"eyebrow",children:"FLIGHT SUSPENDED"}),we.jsx("h2",{children:"PAUSED"}),we.jsxs("div",{className:"overlay-actions",children:[we.jsx("button",{ref:h,className:"primary-button",onClick:p,children:"Continue"}),we.jsx("button",{className:"secondary-button",onClick:m,children:"Restart"})]})]}):we.jsxs("section",{className:"game-overlay compact-overlay",children:[we.jsx("p",{className:"eyebrow",children:"ENERGY DEPLETED"}),we.jsx("h2",{children:"RUN OVER"}),we.jsxs("div",{className:"run-summary",children:[we.jsxs("span",{children:["SCORE ",we.jsx("strong",{children:Math.round(s.score).toLocaleString()})]}),we.jsxs("span",{children:["DISTANCE ",we.jsxs("strong",{children:[Math.round(s.distance),"m"]})]}),we.jsxs("span",{children:["BEST ",we.jsx("strong",{children:Math.max(e,Math.round(s.score)).toLocaleString()})]})]}),we.jsxs("p",{className:"run-detail",children:[s.pickups," ENERGY CELLS · ",s.nearMisses," CLOSE CALLS · BEST COMBO ",s.bestCombo]}),we.jsx("button",{ref:h,className:"primary-button",onClick:m,children:"Run again"})]})}function ER(){const s=Qe.useRef(null),e=Qe.useRef(null),[i,r]=Qe.useState(()=>localStorage.getItem("neon-reduced-motion")==="true"),[l,c]=Qe.useState(()=>localStorage.getItem("neon-sound")!=="false"),[d,p]=Qe.useState(()=>Number(localStorage.getItem("neon-high-score-v2")||0)),{state:m,effects:h,start:_,move:x,pause:g,restart:M,boost:b}=_R({canvasRef:s,reducedMotion:i,soundEnabled:l});Qe.useEffect(()=>{localStorage.setItem("neon-sound",String(l))},[l]),Qe.useEffect(()=>{localStorage.setItem("neon-reduced-motion",String(i))},[i]),Qe.useEffect(()=>{m.phase==="gameover"&&p(w=>{const U=Math.max(w,Math.round(m.score));return localStorage.setItem("neon-high-score-v2",String(U)),U})},[m.phase,m.score]),Qe.useEffect(()=>{const w=P=>{["ArrowLeft","ArrowRight"," "].includes(P.key)&&P.preventDefault(),P.code==="Space"&&!P.repeat&&b(!0),["ArrowLeft","a","A"].includes(P.key)&&x(-1),["ArrowRight","d","D"].includes(P.key)&&x(1),["Escape","p","P"].includes(P.key)&&g(),P.key==="Enter"&&["start","gameover"].includes(m.phase)&&M()},U=P=>{P.code==="Space"&&b(!1)},A=()=>{b(!1),m.phase==="playing"&&g()};return window.addEventListener("keydown",w),window.addEventListener("keyup",U),window.addEventListener("blur",A),()=>{window.removeEventListener("keydown",w),window.removeEventListener("keyup",U),window.removeEventListener("blur",A)}},[x,g,M,b,m.phase]);const D=w=>{e.current=w.clientX},y=w=>{const U=e.current;if(e.current=null,U==null)return;const A=w.clientX-U;Math.abs(A)>32?x(A>0?1:-1):x(w.clientX<window.innerWidth/2?-1:1)},S=h.hit>h.collect?"hit":"collect";return we.jsxs("main",{className:`neon-game phase-${m.phase} ${i?"reduced-motion":""}`,"aria-label":"Neon Glider",children:[we.jsx("canvas",{ref:s,className:"neon-canvas","aria-hidden":"true"}),we.jsx("div",{className:"input-surface","aria-label":"Swipe, tap an edge, or use arrow keys to change lanes",onPointerDown:D,onPointerUp:y}),we.jsx("div",{className:`feedback-pulse ${S}`,"aria-hidden":"true"},Math.max(h.collect,h.hit)),we.jsx("div",{className:"flight-frame","aria-hidden":"true"}),m.phase==="playing"&&we.jsxs(we.Fragment,{children:[we.jsxs("div",{className:"flight-status",children:["SECTOR ",String(m.gate).padStart(2,"0")," / ",m.boosting?"OVERDRIVE":"SYSTEMS ONLINE"]}),we.jsx("div",{className:"event-toast",children:h.message},h.messageAt),we.jsxs("div",{className:"flight-controls",children:[we.jsx("button",{"aria-label":"Move left",onClick:()=>x(-1),children:"←"}),we.jsxs("button",{className:`boost-button ${m.boosting?"active":""}`,onPointerDown:w=>{w.currentTarget.setPointerCapture(w.pointerId),b(!0)},onPointerUp:()=>b(!1),onPointerCancel:()=>b(!1),onKeyDown:w=>{w.key==="Enter"&&b(!0)},onKeyUp:()=>b(!1),onBlur:()=>b(!1),"aria-label":"Hold to boost",children:["BOOST ",we.jsxs("small",{children:[Math.round(m.boost),"%"]})]}),we.jsx("button",{"aria-label":"Move right",onClick:()=>x(1),children:"→"})]})]}),we.jsx(MR,{state:m,onPause:g}),we.jsx(yR,{state:m,highScore:d,soundEnabled:l,onSoundChange:c,reducedMotion:i,onReducedMotionChange:r,onStart:_,onResume:g,onRestart:M})]})}vM.createRoot(document.getElementById("root")).render(we.jsx(fM.StrictMode,{children:we.jsx(ER,{})}));
