const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./vueApp-CW4N62Qh.js","./vueApp-W5cJhiE8.css"])))=>i.map(i=>d[i]);
(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(o){if(o.ep)return;o.ep=!0;const a=r(o);fetch(o.href,a)}})();const Oo="modulepreload",Fo=function(e,t){return new URL(e,t).href},jr={},lr=function(t,r,n){let o=Promise.resolve();if(r&&r.length>0){const i=document.getElementsByTagName("link"),s=document.querySelector("meta[property=csp-nonce]"),c=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));o=Promise.allSettled(r.map(l=>{if(l=Fo(l,n),l in jr)return;jr[l]=!0;const f=l.endsWith(".css"),h=f?'[rel="stylesheet"]':"";if(!!n)for(let m=i.length-1;m>=0;m--){const v=i[m];if(v.href===l&&(!f||v.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${l}"]${h}`))return;const d=document.createElement("link");if(d.rel=f?"stylesheet":Oo,f||(d.as="script"),d.crossOrigin="",d.href=l,c&&d.setAttribute("nonce",c),document.head.appendChild(d),f)return new Promise((m,v)=>{d.addEventListener("load",m),d.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${l}`)))})}))}function a(i){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=i,window.dispatchEvent(s),!s.defaultPrevented)throw i}return o.then(i=>{for(const s of i||[])s.status==="rejected"&&a(s.reason);return t().catch(a)})},N={createTexture:No,bindFramebuffer:Lo,createProgram:Yo,createBuffer:Bo,bindAttribute:Xo,bindTexture:Do};function Do(e,t,r){e.activeTexture(e.TEXTURE0+r),e.bindTexture(e.TEXTURE_2D,t)}function Bo(e,t){var r=e.createBuffer();return e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,t,e.STATIC_DRAW),r}function No(e,t,r,n,o){var a=e.createTexture();return e.bindTexture(e.TEXTURE_2D,a),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,t),r instanceof Uint8Array?e.texImage2D(e.TEXTURE_2D,0,e.RGBA,n,o,0,e.RGBA,e.UNSIGNED_BYTE,r):e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,r),e.bindTexture(e.TEXTURE_2D,null),a}function Lo(e,t,r){e.bindFramebuffer(e.FRAMEBUFFER,t),r&&e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0)}function Xo(e,t,r,n){e.bindBuffer(e.ARRAY_BUFFER,t),e.enableVertexAttribArray(r),e.vertexAttribPointer(r,n,e.FLOAT,!1,0,0)}function Yo(e,t,r){var n=e.createProgram(),o=Gr(e,e.VERTEX_SHADER,t),a=Gr(e,e.FRAGMENT_SHADER,r);if(e.attachShader(n,o),e.attachShader(n,a),e.linkProgram(n),!e.getProgramParameter(n,e.LINK_STATUS))throw new Error(e.getProgramInfoLog(n));var i={program:n,unload:p},s=e.getProgramParameter(n,e.ACTIVE_ATTRIBUTES),c;for(c=0;c<s;c++){var l=e.getActiveAttrib(n,c);i[l.name]=e.getAttribLocation(n,l.name)}var f=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(c=0;c<f;c++){var h=e.getActiveUniform(n,c);i[h.name]=e.getUniformLocation(n,h.name)}return i;function p(){e.deleteProgram(n)}}function Gr(e,t,r){var n=e.createShader(t);if(e.shaderSource(n,r),e.compileShader(n),!e.getShaderParameter(n,e.COMPILE_STATUS))throw new Error(e.getShaderInfoLog(n));return n}var Zs=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function dr(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Nt={exports:{}};Nt.exports=En;Nt.exports.addWheelListener=En;Nt.exports.removeWheelListener=Uo;function En(e,t,r){e.addEventListener("wheel",t,r)}function Uo(e,t,r){e.removeEventListener("wheel",t,r)}var zo=Nt.exports,Lt={exports:{}},Vo=4,$o=.001,qo=1e-7,ko=10,et=11,_t=1/(et-1),jo=typeof Float32Array=="function";function Pn(e,t){return 1-3*t+3*e}function Mn(e,t){return 3*t-6*e}function Cn(e){return 3*e}function Ot(e,t,r){return((Pn(t,r)*e+Mn(t,r))*e+Cn(t))*e}function Rn(e,t,r){return 3*Pn(t,r)*e*e+2*Mn(t,r)*e+Cn(t)}function Go(e,t,r,n,o){var a,i,s=0;do i=t+(r-t)/2,a=Ot(i,n,o)-e,a>0?r=i:t=i;while(Math.abs(a)>qo&&++s<ko);return i}function Ho(e,t,r,n){for(var o=0;o<Vo;++o){var a=Rn(t,r,n);if(a===0)return t;var i=Ot(t,r,n)-e;t-=i/a}return t}function Zo(e){return e}var Wo=function(t,r,n,o){if(!(0<=t&&t<=1&&0<=n&&n<=1))throw new Error("bezier x values must be in [0, 1] range");if(t===r&&n===o)return Zo;for(var a=jo?new Float32Array(et):new Array(et),i=0;i<et;++i)a[i]=Ot(i*_t,t,n);function s(c){for(var l=0,f=1,h=et-1;f!==h&&a[f]<=c;++f)l+=_t;--f;var p=(c-a[f])/(a[f+1]-a[f]),d=l+p*_t,m=Rn(d,t,n);return m>=$o?Ho(c,d,t,n):m===0?d:Go(c,l,l+_t,t,n)}return function(l){return l===0?0:l===1?1:Ot(s(l),r,o)}},We=Wo,Hr={ease:We(.25,.1,.25,1),easeIn:We(.42,0,1,1),easeOut:We(0,0,.58,1),easeInOut:We(.42,0,.58,1),linear:We(0,0,1,1)};Lt.exports=Ko;Lt.exports.makeAggregateRaf=An;Lt.exports.sharedScheduler=An();function Ko(e,t,r){var n=Object.create(null),o=Object.create(null);r=r||{};var a=typeof r.easing=="function"?r.easing:Hr[r.easing];a||(r.easing&&console.warn("Unknown easing function in amator: "+r.easing),a=Hr.ease);var i=typeof r.step=="function"?r.step:Zr,s=typeof r.done=="function"?r.done:Zr,c=Qo(r.scheduler),l=Object.keys(t);l.forEach(function(x){n[x]=e[x],o[x]=t[x]-e[x]});var f=typeof r.duration=="number"?r.duration:400,h=Math.max(1,f*.06),p,d=0;return p=c.next(v),{cancel:m};function m(){c.cancel(p),p=0}function v(){var x=a(d/h);d+=1,b(x),d<=h?(p=c.next(v),i(e)):(p=0,setTimeout(function(){s(e)},0))}function b(x){l.forEach(function(E){e[E]=o[E]*x+n[E]})}}function Zr(){}function Qo(e){if(!e){var t=typeof window<"u"&&window.requestAnimationFrame;return t?Jo():ei()}if(typeof e.next!="function")throw new Error("Scheduler is supposed to have next(cb) function");if(typeof e.cancel!="function")throw new Error("Scheduler is supposed to have cancel(handle) function");return e}function Jo(){return{next:window.requestAnimationFrame.bind(window),cancel:window.cancelAnimationFrame.bind(window)}}function ei(){return{next:function(e){return setTimeout(e,1e3/60)},cancel:function(e){return clearTimeout(e)}}}function An(){var e=new Set,t=new Set,r=0;return{next:o,cancel:o,clearAll:n};function n(){e.clear(),t.clear(),cancelAnimationFrame(r),r=0}function o(s){t.add(s),a()}function a(){r||(r=requestAnimationFrame(i))}function i(){r=0;var s=t;t=e,e=s,e.forEach(function(c){c()}),e.clear()}}var ti=Lt.exports;function ri(e){oi(e);const t=ni(e);return e.on=t.on,e.off=t.off,e.fire=t.fire,e}function ni(e){let t=Object.create(null);return{on:function(r,n,o){if(typeof n!="function")throw new Error("callback is expected to be a function");let a=t[r];return a||(a=t[r]=[]),a.push({callback:n,ctx:o}),e},off:function(r,n){if(typeof r>"u")return t=Object.create(null),e;if(t[r])if(typeof n!="function")delete t[r];else{const o=t[r];for(let a=0;a<o.length;++a)o[a].callback===n&&o.splice(a,1)}return e},fire:function(r){const n=t[r];if(!n)return e;let o;arguments.length>1&&(o=Array.prototype.slice.call(arguments,1));for(let a=0;a<n.length;++a){const i=n[a];i.callback.apply(i.ctx,o)}return e}}}function oi(e){if(!e)throw new Error("Eventify cannot use falsy object as events subject");const t=["on","fire","off"];for(let r=0;r<t.length;++r)if(e.hasOwnProperty(t[r]))throw new Error("Subject cannot be eventified, since it already has property '"+t[r]+"'")}var ii=ri,ai=si;function si(e,t,r){typeof r!="object"&&(r={});var n=typeof r.minVelocity=="number"?r.minVelocity:5,o=typeof r.amplitude=="number"?r.amplitude:.25,a=typeof r.cancelAnimationFrame=="function"?r.cancelAnimationFrame:ci(),i=typeof r.requestAnimationFrame=="function"?r.requestAnimationFrame:ui(),s,c,l=342,f,h,p,d,m,v,b,x;return{start:I,stop:F,cancel:E};function E(){a(f),a(x)}function I(){s=e(),d=b=h=m=0,c=new Date,a(f),a(x),f=i(S)}function S(){var L=Date.now(),K=L-c;c=L;var z=e(),V=z.x-s.x,j=z.y-s.y;s=z;var X=1e3/(1+K);h=.8*V*X+.2*h,m=.8*j*X+.2*m,f=i(S)}function F(){a(f),a(x);var L=e();p=L.x,v=L.y,c=Date.now(),(h<-n||h>n)&&(d=o*h,p+=d),(m<-n||m>n)&&(b=o*m,v+=b),x=i(C)}function C(){var L=Date.now()-c,K=!1,z=0,V=0;d&&(z=-d*Math.exp(-L/l),z>.5||z<-.5?K=!0:z=d=0),b&&(V=-b*Math.exp(-L/l),V>.5||V<-.5?K=!0:V=b=0),K&&(t(p+z,v+V),x=i(C))}}function ci(){return typeof cancelAnimationFrame=="function"?cancelAnimationFrame:clearTimeout}function ui(){return typeof requestAnimationFrame=="function"?requestAnimationFrame:function(e){return setTimeout(e,16)}}var fi=li;function li(e){if(e)return{capture:Kr,release:Kr};var t,r,n,o=!1;return{capture:a,release:i};function a(s){o=!0,r=window.document.onselectstart,n=window.document.ondragstart,window.document.onselectstart=Wr,t=s,t.ondragstart=Wr}function i(){o&&(o=!1,window.document.onselectstart=r,t&&(t.ondragstart=n))}}function Wr(e){return e.stopPropagation(),!1}function Kr(){}var jt,Qr;function di(){if(Qr)return jt;Qr=1,jt=e;function e(){this.x=0,this.y=0,this.scale=1}return jt}var St={exports:{}},Jr;function pi(){if(Jr)return St.exports;Jr=1,St.exports=e,St.exports.canAttach=t;function e(r,n){if(!t(r))throw new Error("svg element is required for svg.panzoom to work");var o=r.ownerSVGElement;if(!o)throw new Error("Do not apply panzoom to the root <svg> element. Use its child instead (e.g. <g></g>). As of March 2016 only FireFox supported transform on the root element");n.disableKeyboardInteraction||o.setAttribute("tabindex",0);var a={getBBox:s,getScreenCTM:c,getOwner:i,applyTransform:f,initTransform:l};return a;function i(){return o}function s(){var h=r.getBBox();return{left:h.x,top:h.y,width:h.width,height:h.height}}function c(){var h=o.getCTM();return h||o.getScreenCTM()}function l(h){var p=r.getCTM();p===null&&(p=document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGMatrix()),h.x=p.e,h.y=p.f,h.scale=p.a,o.removeAttributeNS(null,"viewBox")}function f(h){r.setAttribute("transform","matrix("+h.scale+" 0 0 "+h.scale+" "+h.x+" "+h.y+")")}}function t(r){return r&&r.ownerSVGElement&&r.getCTM}return St.exports}var Tt={exports:{}},en;function vi(){if(en)return Tt.exports;en=1,Tt.exports=e,Tt.exports.canAttach=t;function e(r,n){var o=t(r);if(!o)throw new Error("panzoom requires DOM element to be attached to the DOM tree");var a=r.parentElement;r.scrollTop=0,n.disableKeyboardInteraction||a.setAttribute("tabindex",0);var i={getBBox:c,getOwner:s,applyTransform:l};return i;function s(){return a}function c(){return{left:0,top:0,width:r.clientWidth,height:r.clientHeight}}function l(f){r.style.transformOrigin="0 0 0",r.style.transform="matrix("+f.scale+", 0, 0, "+f.scale+", "+f.x+", "+f.y+")"}}function t(r){return r&&r.parentElement&&r.style}return Tt.exports}var tn=zo,Gt=ti,hi=ii,mi=ai,In=fi,yi=In(),gi=In(!0),xi=di(),rn=pi(),nn=vi(),bi=1,wi=1.75,on=300,an=200,_i=On;function On(e,t){t=t||{};var r=t.controller;if(r||(rn.canAttach(e)?r=rn(e,t):nn.canAttach(e)&&(r=nn(e,t))),!r)throw new Error("Cannot create panzoom for the current type of dom element");var n=r.getOwner(),o={x:0,y:0},a=!1,i=new xi;r.initTransform&&r.initTransform(i);var s=typeof t.filterKey=="function"?t.filterKey:ze,c=typeof t.pinchSpeed=="number"?t.pinchSpeed:1,l=t.bounds,f=typeof t.maxZoom=="number"?t.maxZoom:Number.POSITIVE_INFINITY,h=typeof t.minZoom=="number"?t.minZoom:0,p=typeof t.boundsPadding=="number"?t.boundsPadding:.05,d=typeof t.zoomDoubleClickSpeed=="number"?t.zoomDoubleClickSpeed:wi,m=t.beforeWheel||ze,v=t.beforeMouseDown||ze,b=typeof t.zoomSpeed=="number"?t.zoomSpeed:bi,x=sn(t.transformOrigin),E=t.enableTextSelection?gi:yi;Si(l),t.autocenter&&k();var I,S=0,F=0,C=0,L=null,K=new Date,z,V=!1,j=!1,X,$,fe,le,Oe,Q;"smoothScroll"in t&&!t.smoothScroll?Q=Ti():Q=mi(yo,_o,t.smoothScroll);var ye,de,Fe,De=!1;Mr();var ge={dispose:So,moveBy:Be,moveTo:Vt,smoothMoveTo:wo,centerOn:bo,zoomTo:bt,zoomAbs:yt,smoothZoom:xt,smoothZoomAbs:Ao,showRectangle:T,pause:zt,resume:je,isPaused:_,getTransform:G,getMinZoom:xe,setMinZoom:be,getMaxZoom:J,setMaxZoom:we,getTransformOrigin:mt,setTransformOrigin:Ge,getZoomSpeed:ho,setZoomSpeed:mo};hi(ge);var ht=typeof t.initialX=="number"?t.initialX:i.x,qe=typeof t.initialY=="number"?t.initialY:i.y,ke=typeof t.initialZoom=="number"?t.initialZoom:i.scale;return(ht!=i.x||qe!=i.y||ke!=i.scale)&&yt(ht,qe,ke),ge;function zt(){Cr(),De=!0}function je(){De&&(Mr(),De=!1)}function _(){return De}function T(u){var y=n.getBoundingClientRect(),g=Y(y.width,y.height),w=u.right-u.left,P=u.bottom-u.top;if(!Number.isFinite(w)||!Number.isFinite(P))throw new Error("Invalid rectangle");var R=g.x/w,A=g.y/P,q=Math.min(R,A);i.x=-(u.left+w/2)*q+g.x/2,i.y=-(u.top+P/2)*q+g.y/2,i.scale=q}function Y(u,y){if(r.getScreenCTM){var g=r.getScreenCTM(),w=g.a,P=g.d,R=g.e,A=g.f;o.x=u*w-R,o.y=y*P-A}else o.x=u,o.y=y;return o}function k(){var u,y,g=0,w=0,P=Er();if(P)g=P.left,w=P.top,u=P.right-P.left,y=P.bottom-P.top;else{var R=n.getBoundingClientRect();u=R.width,y=R.height}var A=r.getBBox();if(!(A.width===0||A.height===0)){var q=y/A.height,Le=u/A.width,_e=Math.min(Le,q);i.x=-(A.left+A.width/2)*_e+u/2+g,i.y=-(A.top+A.height/2)*_e+y/2+w,i.scale=_e}}function G(){return i}function xe(){return h}function be(u){h=u}function J(){return f}function we(u){f=u}function mt(){return x}function Ge(u){x=sn(u)}function ho(){return b}function mo(u){if(!Number.isFinite(u))throw new Error("Zoom speed should be a number");b=u}function yo(){return{x:i.x,y:i.y}}function Vt(u,y){i.x=u,i.y=y,$t(),Ne("pan"),qt()}function Tr(u,y){Vt(i.x+u,i.y+y)}function $t(){var u=Er();if(u){var y=!1,g=go(),w=u.left-g.right;return w>0&&(i.x+=w,y=!0),w=u.right-g.left,w<0&&(i.x+=w,y=!0),w=u.top-g.bottom,w>0&&(i.y+=w,y=!0),w=u.bottom-g.top,w<0&&(i.y+=w,y=!0),y}}function Er(){if(l){if(typeof l=="boolean"){var u=n.getBoundingClientRect(),y=u.width,g=u.height;return{left:y*p,top:g*p,right:y*(1-p),bottom:g*(1-p)}}return l}}function go(){var u=r.getBBox(),y=xo(u.left,u.top);return{left:y.x,top:y.y,right:u.width*i.scale+y.x,bottom:u.height*i.scale+y.y}}function xo(u,y){return{x:u*i.scale+i.x,y:y*i.scale+i.y}}function qt(){a=!0,I=window.requestAnimationFrame(To)}function Pr(u,y,g){if(Ht(u)||Ht(y)||Ht(g))throw new Error("zoom requires valid numbers");var w=i.scale*g;if(w<h){if(i.scale===h)return;g=h/i.scale}if(w>f){if(i.scale===f)return;g=f/i.scale}var P=Y(u,y);if(i.x=P.x-g*(P.x-i.x),i.y=P.y-g*(P.y-i.y),l&&p===1&&h===1)i.scale*=g,$t();else{var R=$t();R||(i.scale*=g)}Ne("zoom"),qt()}function yt(u,y,g){var w=g/i.scale;Pr(u,y,w)}function bo(u){var y=u.ownerSVGElement;if(!y)throw new Error("ui element is required to be within the scene");var g=u.getBoundingClientRect(),w=g.left+g.width/2,P=g.top+g.height/2,R=y.getBoundingClientRect(),A=R.width/2-w,q=R.height/2-P;Be(A,q,!0)}function wo(u,y){Be(u-i.x,y-i.y,!0)}function Be(u,y,g){if(!g)return Tr(u,y);ye&&ye.cancel();var w={x:0,y:0},P={x:u,y},R=0,A=0;ye=Gt(w,P,{step:function(q){Tr(q.x-R,q.y-A),R=q.x,A=q.y}})}function _o(u,y){wt(),Vt(u,y)}function So(){Cr()}function Mr(){n.addEventListener("mousedown",Nr,{passive:!1}),n.addEventListener("dblclick",Br,{passive:!1}),n.addEventListener("touchstart",Ar,{passive:!1}),n.addEventListener("keydown",Rr,{passive:!1}),tn.addWheelListener(n,zr,{passive:!1}),qt()}function Cr(){tn.removeWheelListener(n,zr),n.removeEventListener("mousedown",Nr),n.removeEventListener("keydown",Rr),n.removeEventListener("dblclick",Br),n.removeEventListener("touchstart",Ar),I&&(window.cancelAnimationFrame(I),I=0),Q.cancel(),Yr(),Ur(),E.release(),kt()}function To(){a&&Eo()}function Eo(){a=!1,r.applyTransform(i),Ne("transform"),I=0}function Rr(u){var y=0,g=0,w=0;if(u.keyCode===38?g=1:u.keyCode===40?g=-1:u.keyCode===37?y=1:u.keyCode===39?y=-1:u.keyCode===189||u.keyCode===109?w=1:(u.keyCode===187||u.keyCode===107)&&(w=-1),!s(u,y,g,w)){if(y||g){u.preventDefault(),u.stopPropagation();var P=n.getBoundingClientRect(),R=Math.min(P.width,P.height),A=.05,q=R*A*y,Le=R*A*g;Be(q,Le)}if(w){var _e=Vr(w*100),R=x?Ze():Po();bt(R.x,R.y,_e)}}}function Po(){var u=n.getBoundingClientRect();return{x:u.width/2,y:u.height/2}}function Ar(u){if(Mo(u),He(),u.touches.length===1)return Ro(u,u.touches[0]);u.touches.length===2&&(Oe=Dr(u.touches[0],u.touches[1]),Fe=!0,Ir())}function Mo(u){t.onTouch&&!t.onTouch(u)||(u.stopPropagation(),u.preventDefault())}function Co(u){He(),!(t.onDoubleClick&&!t.onDoubleClick(u))&&(u.preventDefault(),u.stopPropagation())}function Ro(u){F=new Date;var y=u.touches[0],g=se(y);z=g;var w=Y(g.x,g.y);X=w.x,$=w.y,fe=X,le=$,Q.cancel(),Ir()}function Ir(){V||(V=!0,document.addEventListener("touchmove",Or),document.addEventListener("touchend",gt),document.addEventListener("touchcancel",gt))}function Or(u){if(u.touches.length===1){u.stopPropagation();var y=u.touches[0],g=se(y),w=Y(g.x,g.y),P=w.x-X,R=w.y-$;P!==0&&R!==0&&$r(),X=w.x,$=w.y,Be(P,R)}else if(u.touches.length===2){Fe=!0;var A=u.touches[0],q=u.touches[1],Le=Dr(A,q),_e=1+(Le/Oe-1)*c,qr=se(A),kr=se(q);if(X=(qr.x+kr.x)/2,$=(qr.y+kr.y)/2,x){var g=Ze();X=g.x,$=g.y}bt(X,$,_e),Oe=Le,u.stopPropagation(),u.preventDefault()}}function He(){C&&(clearTimeout(C),C=0)}function Fr(u){if(t.onClick){He();var y=X-fe,g=$-le,w=Math.sqrt(y*y+g*g);w>5||(C=setTimeout(function(){C=0,t.onClick(u)},on))}}function gt(u){if(He(),u.touches.length>0){var y=se(u.touches[0]),g=Y(y.x,y.y);X=g.x,$=g.y}else{var w=new Date;if(w-S<on)if(x){var y=Ze();xt(y.x,y.y,d)}else xt(z.x,z.y,d);else w-F<an&&Fr(u);S=w,kt(),Ur()}}function Dr(u,y){var g=u.clientX-y.clientX,w=u.clientY-y.clientY;return Math.sqrt(g*g+w*w)}function Br(u){Co(u);var y=se(u);x&&(y=Ze()),xt(y.x,y.y,d)}function Nr(u){if(He(),!v(u)){if(L=u,K=new Date,V)return u.stopPropagation(),!1;var y=u.button===1&&window.event!==null||u.button===0;if(y){Q.cancel();var g=se(u),w=Y(g.x,g.y);return fe=X=w.x,le=$=w.y,document.addEventListener("mousemove",Lr),document.addEventListener("mouseup",Xr),E.capture(u.target||u.srcElement),!1}}}function Lr(u){if(!V){$r();var y=se(u),g=Y(y.x,y.y),w=g.x-X,P=g.y-$;X=g.x,$=g.y,Be(w,P)}}function Xr(){var u=new Date;u-K<an&&Fr(L),E.release(),kt(),Yr()}function Yr(){document.removeEventListener("mousemove",Lr),document.removeEventListener("mouseup",Xr),j=!1}function Ur(){document.removeEventListener("touchmove",Or),document.removeEventListener("touchend",gt),document.removeEventListener("touchcancel",gt),j=!1,Fe=!1,V=!1}function zr(u){if(!m(u)){Q.cancel();var y=u.deltaY;u.deltaMode>0&&(y*=100);var g=Vr(y);if(g!==1){var w=x?Ze():se(u);bt(w.x,w.y,g),u.preventDefault()}}}function se(u){var y,g,w=n.getBoundingClientRect();return y=u.clientX-w.left,g=u.clientY-w.top,{x:y,y:g}}function xt(u,y,g){var w=i.scale,P={scale:w},R={scale:g*w};Q.cancel(),wt(),de=Gt(P,R,{step:function(A){yt(u,y,A.scale)},done:Io})}function Ao(u,y,g){var w=i.scale,P={scale:w},R={scale:g};Q.cancel(),wt(),de=Gt(P,R,{step:function(A){yt(u,y,A.scale)}})}function Ze(){var u=n.getBoundingClientRect();return{x:u.width*x.x,y:u.height*x.y}}function bt(u,y,g){return Q.cancel(),wt(),Pr(u,y,g)}function wt(){de&&(de.cancel(),de=null)}function Vr(u){var y=Math.sign(u),g=Math.min(.25,Math.abs(b*u/128));return 1-y*g}function $r(){j||(Ne("panstart"),j=!0,Q.start())}function kt(){j&&(Fe||Q.stop(),Ne("panend"))}function Io(){Ne("zoomend")}function Ne(u){ge.fire(u,ge)}}function sn(e){if(e){if(typeof e=="object")return(!Ue(e.x)||!Ue(e.y))&&cn(e),e;cn()}}function cn(e){throw console.error(e),new Error(["Cannot parse transform origin.","Some good examples:",'  "center center" can be achieved with {x: 0.5, y: 0.5}','  "top center" can be achieved with {x: 0.5, y: 0}','  "bottom right" can be achieved with {x: 1, y: 1}'].join(`
`))}function ze(){}function Si(e){var t=typeof e;if(!(t==="undefined"||t==="boolean")){var r=Ue(e.left)&&Ue(e.top)&&Ue(e.bottom)&&Ue(e.right);if(!r)throw new Error("Bounds object is not valid. It can be: undefined, boolean (true|false) or an object {left, top, right, bottom}")}}function Ue(e){return Number.isFinite(e)}function Ht(e){return Number.isNaN?Number.isNaN(e):e!==e}function Ti(){return{start:ze,stop:ze,cancel:ze}}function Ei(){if(typeof document>"u")return;var e=document.getElementsByTagName("script");if(!e)return;for(var t,r=0;r<e.length;++r){var n=e[r];if(n.src&&n.src.match(/\bpanzoom(\.min)?\.js/)){t=n;break}}if(!t)return;var o=t.getAttribute("query");if(!o)return;var a=t.getAttribute("name")||"pz",i=Date.now();s();function s(){var f=document.querySelector(o);if(!f){var h=Date.now(),p=h-i;if(p<2e3){setTimeout(s,100);return}console.error("Cannot find the panzoom element",a);return}var d=c(t);console.log(d),window[a]=On(f,d)}function c(f){for(var h=f.attributes,p={},d=0;d<h.length;++d){var m=h[d],v=l(m);v&&(p[v.name]=v.value)}return p}function l(f){if(f.name){var h=f.name[0]==="p"&&f.name[1]==="z"&&f.name[2]==="-";if(h){var p=f.name.substr(3),d=JSON.parse(f.value);return{name:p,value:d}}}}}Ei();const Pi=dr(_i);var Fn=function(e){Ci(e);var t=Mi(e);return e.on=t.on,e.off=t.off,e.fire=t.fire,e};function Mi(e){var t=Object.create(null);return{on:function(r,n,o){if(typeof n!="function")throw new Error("callback is expected to be a function");var a=t[r];return a||(a=t[r]=[]),a.push({callback:n,ctx:o}),e},off:function(r,n){var o=typeof r>"u";if(o)return t=Object.create(null),e;if(t[r]){var a=typeof n!="function";if(a)delete t[r];else for(var i=t[r],s=0;s<i.length;++s)i[s].callback===n&&i.splice(s,1)}return e},fire:function(r){var n=t[r];if(!n)return e;var o;arguments.length>1&&(o=Array.prototype.splice.call(arguments,1));for(var a=0;a<n.length;++a){var i=n[a];i.callback.apply(i.ctx,o)}return e}}}function Ci(e){if(!e)throw new Error("Eventify cannot use falsy object as events subject");for(var t=["on","fire","off"],r=0;r<t.length;++r)if(e.hasOwnProperty(t[r]))throw new Error("Subject cannot be eventified, since it already has property '"+t[r]+"'")}const Ri=dr(Fn),U=Ri({});var Ai=Ii;function Ii(e){var t=[],r=e;return{dispose:a,onChanged:i,set:o,get:n};function n(){return r}function o(c){r=c,setTimeout(function(){s(c)},0)}function a(){t=[]}function i(c){if(typeof c!="function")throw new Error("changeCallback should be a function");t.push(c)}function s(c){t.forEach(function(l){l(c)})}}var Oi={parse:Di,stringify:Fi};function Fi(e){if(!e)return"";return Object.keys(e).map(t).join("&");function t(r){var n=e[r],o=Dn(r);return n!==void 0&&(o+="="+Bi(n)),o}}function Di(e){var t=Object.create(null);if(!e)return t;return e.split("&").forEach(r),t;function r(n){if(n){var o=n.split("=");t[decodeURIComponent(o[0])]=Li(o[1])}}}function Bi(e){e instanceof Date&&(e=e.toISOString());var t=Dn(e);return t}function Dn(e){var t=encodeURIComponent(e);return t.replace(/[()]/g,Ni)}function Ni(e){return e===")"?"%29":e==="("?"%28":e}function Li(e){return e=decodeURIComponent(e),e===""?e:isNaN(e)?Xi(e)?e==="true":Yi(e)?new Date(e):e:parseFloat(e)}function Xi(e){return e==="true"||e==="false"}function Yi(e){return e&&e.match(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)}var Ui=Vi,zi=Ai,Et=Oi;function Vi(e,t){if(typeof window>"u")return zi(e);var r=[],n=t&&t.useSearch,o=n?"?":"#?";return t.rewriteHashToSearch&&i(),a(),{onChanged:c,dispose:l,set:s,get:p,rewriteHashToSearch:i};function a(){var d=p(),m=!1;typeof e=="object"&&e&&Object.keys(e).forEach(function(v){v in d||(d[v]=e[v],m=!0)}),m&&s(d)}function i(){var d=Object.create(null),m=window.location.search;m&&(d=Object.assign(d,Et.parse(m.substr(1))));var v=window.location.hash;v&&(d=Object.assign(d,Et.parse(v.substr(2)))),s(d)}function s(d){var m=o+Et.stringify(d);n&&window.location.hash&&(m+=window.location.hash),window.history?window.history.replaceState(void 0,void 0,m):window.location.replace(m)}function c(d){if(typeof d!="function")throw new Error("changeCallback needs to be a function");r.length===0&&window.addEventListener("hashchange",f,!1),r.push(d)}function l(){r.length!==0&&(r=[],window.removeEventListener("hashchange",f,!1))}function f(){var d=p();h(d)}function h(d){for(var m=0;m<r.length;++m){var v=r[m];v(d)}}function p(){var d=n?window.location.search:window.location.hash,m=(d||o).substr(o.length);return Et.parse(m)}}var $i=pr,qi=Fn,ki=Ui;pr.instance=ji;var Pt;function pr(e,t){t=t||{};var r=t.history||ki(e,t);Gi(r),r.onChanged(d);var n=r.get()||Object.create(null),o={get:f,set:h,unset:p,setIfEmpty:m,dispose:l,onChange:i,offChange:s,getHistoryObject:c},a=qi({});return o;function i(v,b){a.on("change",v,b)}function s(v,b){a.off("change",v,b)}function c(){return r}function l(){r.dispose(),a.off()}function f(v){return v===void 0?n:n[v]}function h(v,b){var x=typeof v;return x==="object"?Object.keys(v).forEach(function(E){n[E]=v[E]}):x==="string"&&(n[v]=b),r.set(n),o}function p(v){if(v in n)return delete n[v],r.set(n),o}function d(v){n=v,a.fire("change",n)}function m(v,b){if(typeof v=="object"&&Object.keys(v).forEach(function(x){x in n||(n[x]=v[x])}),!(v in n))return n[v]=b,r.set(n),o}}function ji(e,t){return Pt?e&&Pt.setIfEmpty(e):Pt=pr(e,t),Pt}function Gi(e){if(!e)throw new Error("history is required");if(typeof e.dispose!="function")throw new Error("dispose is required");if(typeof e.onChanged!="function")throw new Error("onChanged is required")}const Hi=dr($i),Pe={UNIFORM:1,VELOCITY:2,CUSTOM:4};function vr(e){return`// p.x and p.y are current coordinates
// v.x and v.y is a velocity at point p
vec2 get_velocity(vec2 p) {
  vec2 v = vec2(0., 0.);

  // change this to get a new vector field
  ${e}

  return v;
}`}function Zi(){return window.innerWidth<600}var B=Hi({},{useSearch:!0,rewriteHashToSearch:!0}),ne=B.get(),Bn=vr(`v.x = 0.1 * p.y;
  v.y = -0.2 * p.y;`),Ke,dt={timeStep:.01,dropProbability:.009,particleCount:1e4,fadeout:.998,colorMode:Pe.UNIFORM};let Wi={collapsed:Zi()};const M={settingsPanel:Wi,saveBBox:fa,getBBox:ua,makeBBox:Nn,getQS(){return B},saveCode:pa,getCode:la,getDefaultCode:da,getDropProbability:sa,setDropProbability:ca,getIntegrationTimeStep:ia,setIntegrationTimeStep:aa,getParticleCount:na,setParticleCount:oa,getFadeout:ta,setFadeout:ra,getColorMode:Ki,setColorMode:Qi,getColorFunction:Ji,setColorFunction:ea};B.onChange(function(){U.fire("scene-ready",window.scene)});function Ki(){let e=B.get("cm");return W(e)?e:dt.colorMode}function Qi(e){W(e)&&(B.set({cm:e}),ne.cm=e)}function Ji(){return B.get("cf")||""}function ea(e){B.set({cf:e}),ne.cf=e}function ta(){let e=B.get("fo");return W(e)?e:dt.fadeout}function ra(e){W(e)&&(B.set({fo:e}),ne.fo=e)}function na(){let e=B.get("pc");return W(e)?e:dt.particleCount}function oa(e){W(e)&&(B.set({pc:e}),ne.pc=e)}function ia(){let e=B.get("dt");return W(e)?e:dt.timeStep}function aa(e){W(e)&&(B.set({dt:e}),ne.dt=e)}function sa(){let e=B.get("dp");return W(e)?e:dt.dropProbability}function ca(e){W(e)&&B.set({dp:e})}function ua(){let e=B.get("cx"),t=B.get("cy"),r=B.get("w"),n=B.get("h");return Nn(e,t,r,n)}function Nn(e,t,r,n){if(!(W(e)&&W(t)&&W(r)&&W(n)))return;let a=r/2,i=n/2;var s=1e4;return{minX:Math.round(s*(e-a))/s,maxX:Math.round(s*(e+a))/s,minY:Math.round(s*(t-i))/s,maxY:Math.round(s*(t+i))/s}}function fa(e,t=!1){e={cx:(e.minX+e.maxX)*.5,cy:(e.minY+e.maxY)*.5,w:e.maxX-e.minX,h:e.maxX-e.minX},!(e.w<=0||e.h<=0)&&(ne.cx=e.cx,ne.cy=e.cy,ne.w=e.w,ne.h=e.h,Ke&&(clearTimeout(Ke),Ke=0),t?B.set(e):Ke=setTimeout(()=>{Ke=0,B.set(e)},300))}function la(){var e=B.get("vf");if(e)return e;var t=B.get("code");return t?(e=vr(t),delete ne.code,B.set("vf",e),e):Bn}function da(){return Bn}function pa(e){B.set({vf:e}),ne.code=e}function W(e){return Number.isFinite(e)}function va(e,t){var r=0,n=0,o=1,a=2.1;return{applyTransform(i){var s=i.x,c=i.y;o-i.scale===0&&Math.abs(s-r)<a&&Math.abs(c-n)<a||(r=s,n=c,o=i.scale,t(i))},getOwner(){return e}}}const Zt={dx:0,dy:0,scale:1};function ha(e){var{gl:t,canvasRect:r}=e,n,o,a={dx:0,dy:0,scale:1},i=null;let s={r:19/255,g:41/255,b:79/255,a:1};p();var c=N.createProgram(t,ma(),ya()),l={fadeOutLastFrame:f,renderCurrentScreen:h,updateScreenTextures:p,boundingBoxUpdated:!1};return l;function f(){N.bindFramebuffer(t,e.framebuffer,n),t.viewport(0,0,r.width,r.height),l.boundingBoxUpdated&&i?(a.dx=-(e.bbox.minX-i.minX)/(e.bbox.maxX-e.bbox.minX),a.dy=-(e.bbox.minY-i.minY)/(e.bbox.maxY-e.bbox.minY),a.scale=(e.bbox.maxX-e.bbox.minX)/(i.maxX-i.minX),m(o,e.fadeOpacity,a)):m(o,e.fadeOpacity,Zt)}function h(){N.bindFramebuffer(t,null),d(),t.enable(t.BLEND),t.blendFunc(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA),t.clearColor(s.r,s.g,s.b,s.a),t.clear(t.COLOR_BUFFER_BIT),m(n,1,Zt),t.disable(t.BLEND);var v=o;o=n,n=v,l.boundingBoxUpdated=!1,window.audioTexture&&m(window.audioTexture,1,Zt)}function p(){var{width:v,height:b}=r,x=new Uint8Array(v*b*4);n&&t.deleteTexture(n),o&&t.deleteTexture(o),n=N.createTexture(t,t.NEAREST,x,v,b),o=N.createTexture(t,t.NEAREST,x,v,b)}function d(){if(!i){i={minX:e.bbox.minX,minY:e.bbox.minY,maxX:e.bbox.maxX,maxY:e.bbox.maxY};return}i.minX=e.bbox.minX,i.minY=e.bbox.minY,i.maxX=e.bbox.maxX,i.maxY=e.bbox.maxY}function m(v,b,x){var E=c;t.useProgram(E.program),N.bindAttribute(t,e.quadBuffer,E.a_pos,2),N.bindTexture(t,v,e.screenTextureUnit),t.uniform1i(E.u_screen,e.screenTextureUnit),t.uniform1f(E.u_opacity_border,.02),t.uniform1f(E.u_opacity,b),t.uniform3f(E.u_transform,x.dx,x.dy,x.scale),t.drawArrays(t.TRIANGLES,0,6)}}function ma(){return`// screen program
precision highp float;

attribute vec2 a_pos;
varying vec2 v_tex_pos;
uniform vec3 u_transform;

void main() {
    v_tex_pos = a_pos;
    vec2 pos = a_pos;

    // This transformation tries to move texture (raster) to the approximate position
    // of particles on the current frame. This is needed to avoid rendering artifacts
    // during pan/zoom: https://computergraphics.stackexchange.com/questions/5754/fading-particles-and-transition

    // PS: I must admit, I wrote this formula through sweat and tears, and
    // I still have no idea why I don't need to apply (pos.y - 0.5) to Y coordinate.
    // Is it because I use aspect ratio for bounding box?
    pos.x = (pos.x - 0.5) / u_transform.z - u_transform.x + 0.5 * u_transform.z;
    pos.y = pos.y / u_transform.z + u_transform.y;

    pos = 1.0 - 2.0 * pos;
    gl_Position = vec4(pos, 0, 1);
}`}function ya(){return`precision highp float;
uniform sampler2D u_screen;
uniform float u_opacity;
uniform float u_opacity_border;

varying vec2 v_tex_pos;

void main() {
  vec2 p = 1.0 - v_tex_pos;
  vec4 color = texture2D(u_screen, p);

  // For some reason particles near border leave trace when we translate the texture
  // This is my dirty hack to fix it: https://computergraphics.stackexchange.com/questions/5754/fading-particles-and-transition
  if (p.x < u_opacity_border || p.x > 1. - u_opacity_border || p.y < u_opacity_border || p.y > 1. - u_opacity_border) {
    gl_FragColor = vec4(0.);
  } else {
    // opacity fade out even with a value close to 0.0
    gl_FragColor = vec4(floor(255.0 * color * u_opacity) / 255.0);
  }
}`}const Ln=`
highp float decodeFloatRGBA( vec4 v ) {
  float a = floor(v.r * 255.0 + 0.5);
  float b = floor(v.g * 255.0 + 0.5);
  float c = floor(v.b * 255.0 + 0.5);
  float d = floor(v.a * 255.0 + 0.5);

  float exponent = a - 127.0;
  float sign = 1.0 - mod(d, 2.0)*2.0;
  float mantissa = float(a > 0.0)
                  + b / 256.0
                  + c / 65536.0
                  + floor(d / 2.0) / 8388608.0;
  return sign * mantissa * exp2(exponent);
}
`;class pt{constructor(){}getDefines(){return""}getFunctions(){return""}getMainBody(){return""}}var ga=`
vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
  return mod289(((x*34.0)+1.0)*x);
}

float snoise(vec2 v)
  {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
// First corner
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);

// Other corners
  vec2 i1;
  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
  //i1.y = 1.0 - i1.x;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  // x0 = x0 - 0.0 + 0.0 * C.xx ;
  // x1 = x0 - i1 + 1.0 * C.xx ;
  // x2 = x0 - 1.0 + 2.0 * C.xx ;
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

// Permutations
  i = mod289(i); // Avoid truncation effects in permutation
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
		+ i.x + vec3(0.0, i1.x, 1.0 ));

  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;

// Gradients: 41 points uniformly over a line, mapped onto a diamond.
// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

// Normalise gradients implicitly by scaling m
// Approximation of: m *= inversesqrt( a0*a0 + h*h );
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

// Compute final noise value at P
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
`;function xa(){return`uniform sampler2D input0;
uniform sampler2D input1;`}class Xn extends pt{constructor(t){super(),this.updateCode=t||""}setNewUpdateCode(t){this.updateCode=t}getDefines(){return`
uniform float frame;
uniform vec4 cursor;
// TODO: use inputN instead.
uniform sampler2D u_audio;

#define PI 3.1415926535897932384626433832795

${xa()}
`}getFunctions(){return`
    // pseudo-random generator
const vec3 rand_constants = vec3(12.9898, 78.233, 4375.85453);
float rand(const vec2 co) {
    float t = dot(rand_constants.xy, co);
    return fract(sin(t) * (rand_constants.z + t));
}

${ga}

vec2 rotate(vec2 p,float a) {
	return cos(a)*p+sin(a)*vec2(p.y,-p.x);
}

// TODO: This will change. Don't use it.
float audio(float index) {
  float rgbI = floor(index/4.);
  vec2 txPos = vec2(fract(rgbI / 5.), floor(rgbI / 5.) / 5.);
  vec4 rgba = texture2D(u_audio, txPos);
  
  float offset = mod(index, 4.);
  if (offset == 0.) return rgba[0];
  if (offset == 1.) return rgba[1];
  if (offset == 2.) return rgba[2];
  return rgba[3];
}

${this.updateCode?this.updateCode:"vec2 get_velocity(vec2 p) { return vec2(0.); }"}
  `}}class Yn extends pt{constructor(){super()}getDefines(){return`
uniform float u_h;
`}getFunctions(){return`
vec2 rk4(const vec2 point) {
  vec2 k1 = get_velocity( point );
  vec2 k2 = get_velocity( point + k1 * u_h * 0.5);
  vec2 k3 = get_velocity( point + k2 * u_h * 0.5);
  vec2 k4 = get_velocity( point + k3 * u_h);

  return k1 * u_h / 6. + k2 * u_h/3. + k3 * u_h/3. + k4 * u_h/6.;
}`}getMainBody(){return`
  vec2 velocity = rk4(pos);
`}}function ba(e,t,r){var n=new Xn(t),o=new Yn;return{getVariables:a,getMain:c,getMethods:i};function a(){return`
uniform vec2 u_velocity_range;
varying vec4 v_particle_color;

${n.getDefines()}
${o.getDefines()}
`}function i(){return`
// https://github.com/hughsk/glsl-hsv2rgb
vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

${n.getFunctions()}
${o.getFunctions()}
${s()}
`}function s(){if(e===Pe.UNIFORM)return`
vec4 get_color(vec2 p) {
  return vec4(0.302, 0.737, 0.788, 1.);
}
`;if(e===Pe.VELOCITY)return`
vec4 get_color(vec2 p) {
  vec2 velocity = get_velocity(p);
  float speed = (length(velocity) - u_velocity_range[0])/(u_velocity_range[1] - u_velocity_range[0]);
  return vec4(hsv2rgb(vec3(0.05 + (1. - speed) * 0.5, 0.9, 1.)), 1.0);
}
`;if(e===Pe.CUSTOM){if(!r)throw new Error("color mode is set to custom, but no color function is specified");return r}return` 
vec4 get_color(vec2 p) {
  vec2 velocity = get_velocity(p);
  float speed = (atan(velocity.y, velocity.x) + PI)/(2.0 * PI);
  return vec4(hsv2rgb(vec3(speed, 0.9, 1.)), 1.0);
}
`}function c(){return"  v_particle_color = get_color(v_particle_pos);"}}class wa{constructor(t){this.colorMode=t.colorMode,this.colorFunction=t.colorFunction||""}getFragmentShader(){return`precision highp float;
varying vec4 v_particle_color;
void main() {
  gl_FragColor = v_particle_color;
}`}getVertexShader(t){let r=_a(),n=ba(this.colorMode,t,this.colorFunction),o=[];un(r,o),un(n,o);let a=[];return fn(r,a),fn(n,a),`precision highp float;
attribute float a_index;
uniform float u_particles_res;
uniform vec2 u_min;
uniform vec2 u_max;

${r.getVariables()||""}
${n.getVariables()}

${Ln}

${o.join(`
`)}

void main() {
  vec2 txPos = vec2(
        fract(a_index / u_particles_res),
        floor(a_index / u_particles_res) / u_particles_res);
  gl_PointSize = 1.0;

${a.join(`
`)}

  vec2 du = (u_max - u_min);
  v_particle_pos = (v_particle_pos - u_min)/du;
  gl_Position = vec4(2.0 * v_particle_pos.x - 1.0, (1. - 2. * (v_particle_pos.y)),  0., 1.);
}`}}function un(e,t){e.getMethods&&t.push(e.getMethods())}function fn(e,t){e.getMain&&t.push(e.getMain())}function _a(){return{getVariables:e,getMain:t};function e(){return`
uniform sampler2D u_particles_x;
uniform sampler2D u_particles_y;
    `}function t(){return`
  vec2 v_particle_pos = vec2(
    decodeFloatRGBA(texture2D(u_particles_x, txPos)),
    decodeFloatRGBA(texture2D(u_particles_y, txPos))
  );
`}}const Sa=`
vec4 encodeFloatRGBA(highp float val) {
    if (val == 0.0) {
        return vec4(0.0, 0.0, 0.0, 0.0);
    }

    float mag = abs(val);
    float exponent = floor(log2(mag));
    // Correct log2 approximation errors.
    exponent += float(exp2(exponent) <= mag / 2.0);
    exponent -= float(exp2(exponent) > mag);

    float mantissa;
    if (exponent > 100.0) {
        // Not sure why this needs to be done in two steps for the largest float to work.
        // Best guess is the optimizer rewriting '/ exp2(e)' into '* exp2(-e)',
        // but exp2(-128.0) is too small to represent.
        mantissa = mag / 1024.0 / exp2(exponent - 10.0) - 1.0;
    } else {
        mantissa = mag / float(exp2(exponent)) - 1.0;
    }

    float a = exponent + 127.0;
    mantissa *= 256.0;
    float b = floor(mantissa);
    mantissa -= b;
    mantissa *= 256.0;
    float c = floor(mantissa);
    mantissa -= c;
    mantissa *= 128.0;
    float d = floor(mantissa) * 2.0 + float(val < 0.0);
    return vec4(a, b, c, d) / 255.0;
}
`;class ln extends pt{constructor(t){super(),this.isDecode=t}getFunctions(){if(this.isDecode)return`
    ${Sa}
    ${Ln}
`}getDefines(){if(this.isDecode)return`
precision highp float;

uniform sampler2D u_particles_x;
uniform sampler2D u_particles_y;

// Which coordinate needs to be printed onto the texture
uniform int u_out_coordinate;

varying vec2 v_tex_pos;
`}getMainBody(){return this.isDecode?`
   vec2 pos = vec2(
     decodeFloatRGBA(texture2D(u_particles_x, v_tex_pos)),
     decodeFloatRGBA(texture2D(u_particles_y, v_tex_pos))
   );
`:`
    if (u_out_coordinate == 0) gl_FragColor = encodeFloatRGBA(newPos.x);
    else if (u_out_coordinate == 1) gl_FragColor = encodeFloatRGBA(newPos.y);
    else if (u_out_coordinate == 6) gl_FragColor = encodeFloatRGBA(get_velocity(pos).x);
    else if (u_out_coordinate == 7) gl_FragColor = encodeFloatRGBA(get_velocity(pos).y);
`}}function Ta(e){let t=[];return e.forEach(n=>{n.getDefines&&r(n.getDefines())}),e.forEach(n=>{n.getFunctions&&r(n.getFunctions())}),r("void main() {"),e.forEach(n=>{n.getMainBody&&r(n.getMainBody())}),r("}"),t.join(`
`);function r(n){n&&t.push(n)}}class dn extends pt{constructor(t){super(),this.decode=t&&t.decode,this.srcPosName=t&&t.posName||"pos"}getDefines(){if(this.decode)return`
  uniform vec2 u_min;
  uniform vec2 u_max;
`}getMainBody(){return this.decode?`
  // move particle position according to current transform
  vec2 du = (u_max - u_min);
  pos.x = ${this.srcPosName}.x * du.x + u_min.x;
  pos.y = ${this.srcPosName}.y * du.y + u_min.y;
`:`
  pos.x = (${this.srcPosName}.x - u_min.x)/du.x;
  pos.y = (${this.srcPosName}.y - u_min.y)/du.y;
`}}class Ea{constructor(t){this.readStoredPosition=new ln(!0),this.udfVelocity=new Xn,this.integratePositions=new Yn,this.dropParticles=new Pa,this.writeComputedPosition=new ln(!1),this.panZoomDecode=new dn({decode:!0}),this.panZoomEncode=new dn({decode:!1}),this.colorMode=t&&t.colorMode}setCustomVectorField(t){this.udfVelocity.setNewUpdateCode(t)}getVertexShader(){return`precision highp float;

attribute vec2 a_pos;
varying vec2 v_tex_pos;
uniform vec2 u_min;
uniform vec2 u_max;

void main() {
    v_tex_pos = a_pos;
    gl_Position = vec4(1.0 - 2.0 * a_pos, 0, 1);
}`}getFragmentShader(){var t=[this.readStoredPosition,this.dropParticles,this.udfVelocity,this.integratePositions,{getMainBody(){return`
  vec2 newPos = pos + velocity;
  `}},this.writeComputedPosition];return Ta(t)}}class Pa extends pt{getDefines(){return`
uniform float u_drop_rate;
uniform float u_rand_seed;
uniform vec2 u_min;
uniform vec2 u_max;
`}getFunctions(){return`
`}getMainBody(){return`
  // a random seed to use for the particle drop
  vec2 seed = (pos + v_tex_pos) * u_rand_seed;
  // drop rate is a chance a particle will restart at random position, to avoid degeneration
  float drop = step(1.0 - u_drop_rate, rand(seed));

  // TODO: This can be customized to produce various emitters
  // random_pos is in range from 0..1, we move it to the bounding box:
  vec2 random_pos = vec2(rand(seed + 1.9), rand(seed + 8.4)) * (u_max - u_min) + u_min;
  pos = mix(pos, random_pos, drop);
`}}function pn(e,t,r){if(e==0){t[r+0]=0,t[r+1]=0,t[r+2]=0,t[r+3]=0;return}var n=Math.abs(e),o=Math.floor(Math.log2(n));o+=tt(o)<=n/2?1:0,o-=tt(o)>n?1:0;var a;o>100?a=n/1024/tt(o-10)-1:a=n/tt(o)-1;var i=o+127;a*=256;var s=Math.floor(a);a-=s,a*=256;var c=Math.floor(a);a-=c,a*=128;var l=Math.floor(a)*2+(e<0?1:0);t[r+0]=i,t[r+1]=s,t[r+2]=c,t[r+3]=l}function Un(e,t,r,n){var o=Math.floor(e+.5),a=Math.floor(t+.5),i=Math.floor(r+.5),s=Math.floor(n+.5),c=o-127,l=1-s%2*2,f=(o>0?1:0)+a/256+i/65536+Math.floor(s/2)/8388608;return l*f*tt(c)}function tt(e){return Math.exp(e*Math.LN2)}function nr(){var e,t,r={getMin(){return e},getMax(){return t},add(o){o<e&&(e=o),o>t&&(t=o)},reset:n};return r;function n(){e=Number.POSITIVE_INFINITY,t=Number.NEGATIVE_INFINITY}}const Ma=6,Ca=7;function Ra(e){var t=!0,{gl:r}=e,n,o,a,i,s,c=nr(),l,f;return h(),{updateCode:x,updateParticlesPositions:E,updateParticlesCount:b,setColorMinMax:v,requestSpeedUpdate:m,dispose:p};function h(){U.on("integration-timestep-changed",m),U.on("bbox-change",m),U.on("refresh-speed",m)}function p(){U.off("integration-timestep-changed",m),U.off("bbox-change",m),U.off("refresh-speed",m),d()}function d(){o&&r.deleteTexture(o),n&&r.deleteTexture(n)}function m(){i&&clearTimeout(i),i=setTimeout(()=>{t=!0,i=0},50)}function v(S){r.uniform2f(S.u_velocity_range,c.getMin(),c.getMax())}function b(){d(),a=e.particleStateResolution,s=a*a,l=new Uint8Array(s*4),f=new Uint8Array(s*4),o=N.createTexture(r,r.NEAREST,l,a,a),n=N.createTexture(r,r.NEAREST,f,a,a),m()}function x(){m()}function E(S){!t||!l||!f||(t=!1,N.bindFramebuffer(r,e.framebuffer,o),r.uniform1i(S.u_out_coordinate,Ma),r.drawArrays(r.TRIANGLES,0,6),r.readPixels(0,0,a,a,r.RGBA,r.UNSIGNED_BYTE,l),N.bindFramebuffer(r,e.framebuffer,n),r.uniform1i(S.u_out_coordinate,Ca),r.drawArrays(r.TRIANGLES,0,6),r.readPixels(0,0,a,a,r.RGBA,r.UNSIGNED_BYTE,f),I())}function I(){c.reset();for(var S=0;S<f.length;S+=4){var F=vn(l,S),C=vn(f,S),L=Math.sqrt(F*F+C*C);c.add(L)}}}function vn(e,t){return Un(e[t+0],e[t+1],e[t+2],e[t+3])}function Mt(e,t,r){var n=t.map((s,c)=>{var l={texture:N.createTexture(e,e.NEAREST,s.particleState,r,r),index:c,name:s.name};return l});return{dispose:a,bindTextures:i,assignProgramUniforms:o,length:t.length,textures:n,get(s){return n[s]}};function o(s){n.forEach(c=>{e.uniform1i(s["u_particles_"+c.name],c.index)})}function a(){n.forEach(s=>e.deleteTexture(s.texture))}function i(s,c){n.forEach(l=>{N.bindTexture(s,l.texture,l.index),s.uniform1i(c["u_particles_"+l.name],l.index)})}}const Wt=new Ea;function Aa(e){var t=e.gl,r,n,o,a,i=Ra(e),s;return U.on("vector-lines-request",p),{updateCode:c,updateParticlesPositions:h,updateParticlesCount:l,prepareToDraw:f};function c(m){Wt.setCustomVectorField(m);let v=Wt.getFragmentShader(),b=Wt.getVertexShader(),x=N.createProgram(t,b,v);a&&a.unload(),a=x,e.colorMode===Pe.VELOCITY&&i.requestSpeedUpdate()}function l(m,v){o=e.particleStateResolution;var b=[{name:"x",particleState:m},{name:"y",particleState:v}];r&&r.dispose(),r=Mt(t,b,o),n&&n.dispose(),n=Mt(t,b,o),i.updateParticlesCount()}function f(m){var v=e.colorMode;v===Pe.VELOCITY&&i.setColorMinMax(m),r.bindTextures(t,m)}function h(){var m=a;t.useProgram(m.program),N.bindAttribute(t,e.quadBuffer,m.a_pos,2),e.inputs.updateBindings(m),e.audioTexture&&(N.bindTexture(t,e.audioTexture,5),t.uniform1i(m.u_audio,5)),r.bindTextures(t,m),t.uniform1f(m.u_rand_seed,e.frameSeed),t.uniform1f(m.u_h,e.integrationTimeStep),t.uniform1f(m.frame,e.frame);var v=e.cursor;t.uniform4f(m.cursor,v.clickX,v.clickY,v.hoverX,v.hoverY);var b=e.bbox;t.uniform2f(m.u_min,b.minX,b.minY),t.uniform2f(m.u_max,b.maxX,b.maxY),t.uniform1f(m.u_drop_rate,e.dropProbability);for(var x=0;x<n.length;++x){var E=n.get(x);t.uniform1i(m.u_out_coordinate,x),N.bindFramebuffer(t,e.framebuffer,E.texture),t.viewport(0,0,o,o),t.drawArrays(t.TRIANGLES,0,6)}e.colorMode===Pe.VELOCITY&&i.updateParticlesPositions(m),s&&(d(m),s=null);var I=r;r=n,n=I}function p(m){s=m}function d(m){var v=[{name:"x",particleState:s.x},{name:"y",particleState:s.y}],b=s.resolution,x=b*b,E=Mt(t,v,b),I=Mt(t,v,b);E.bindTextures(t,m);var S=I.get(0);t.uniform1i(m.u_out_coordinate,6),N.bindFramebuffer(t,e.framebuffer,S.texture),t.viewport(0,0,b,b),t.drawArrays(t.TRIANGLES,0,6);var F=new Uint8Array(x*4);t.readPixels(0,0,b,b,t.RGBA,t.UNSIGNED_BYTE,F),t.uniform1i(m.u_out_coordinate,7),S=I.get(1),N.bindFramebuffer(t,e.framebuffer,S.texture),t.viewport(0,0,b,b),t.drawArrays(t.TRIANGLES,0,6);var C=new Uint8Array(x*4);t.readPixels(0,0,b,b,t.RGBA,t.UNSIGNED_BYTE,C),I.dispose(),E.dispose();for(var L=nr(),K=nr(),z=new Float32Array(x),V=new Float32Array(x),j=0;j<C.length;j+=4){var X=j/4,$=hn(F,j),fe=hn(C,j);z[X]=$,V[X]=fe,L.add($),K.add(fe)}var le={xStats:L,yStats:K,decoded_velocity_x:z,decoded_velocity_y:V,resolution:b};U.fire("vector-line-ready",le)}}function hn(e,t){return Un(e[t+0],e[t+1],e[t+2],e[t+3])}const Ia={isAudioEnabled:!1,vectorLinesEnabled:!1,FREE_TEXTURE_UNIT:4,showBindings:M.getQS().get("showBindings")||!1};function Oa(e){var t=e.gl,r,n,o,a="",i=Aa(e),s;return c(),{updateParticlesCount:d,updateParticlesPositions:f,drawParticles:m,updateCode:p,updateColorMode:h};function c(){l()}function l(){s&&s.unload();const v=new wa(e),b=v.getVertexShader(a);s=N.createProgram(t,b,v.getFragmentShader())}function f(){a&&(e.frame+=1,e.frameSeed=Math.random(),i.updateParticlesPositions())}function h(){l()}function p(v){e.frame=0,a=v,i.updateCode(v),l()}function d(){r=e.particleStateResolution,o=r*r;for(var v=new Float32Array(o),b=new Uint8Array(o*4),x=new Uint8Array(o*4),E=e.bbox.minX,I=e.bbox.minY,S=e.bbox.maxX-E,F=e.bbox.maxY-I,C=0;C<o;C++)pn(Math.random()*S+E,b,C*4),pn(Math.random()*F+I,x,C*4),v[C]=C;n&&t.deleteBuffer(n),n=N.createBuffer(t,v),i.updateParticlesCount(b,x)}function m(){if(a){var v=s;t.useProgram(v.program),N.bindAttribute(t,n,v.a_index,1),i.prepareToDraw(v),e.inputs.updateBindings(v),t.uniform1f(v.u_h,e.integrationTimeStep),t.uniform1f(v.frame,e.frame),t.uniform1f(v.u_particles_res,r);var b=e.bbox;t.uniform2f(v.u_min,b.minX,b.minY),t.uniform2f(v.u_max,b.maxX,b.maxY);var x=e.cursor;t.uniform4f(v.cursor,x.clickX,x.clickY,x.hoverX,x.hoverY),t.drawArrays(t.POINTS,0,o)}}}function Fa(e){var{canvasRect:t,bbox:r}=e;return window.addEventListener("mousemove",i,!0),window.addEventListener("mousedown",s,!0),window.addEventListener("touchstart",o,!0),window.addEventListener("touchmove",a,!0),{dispose:n};function n(){window.removeEventListener("mousemove",i,!0),window.removeEventListener("mousedown",s,!0),window.removeEventListener("touchstart",o,!0),window.removeEventListener("touchmove",a,!0)}function o(p){var d=p.touches[0];d&&(l(d.clientX,d.clientY),c(d.clientX,d.clientY))}function a(p){var d=p.touches[0];d&&c(d.clientX,d.clientY)}function i(p){c(p.clientX,p.clientY)}function s(p){l(p.clientX,p.clientY)}function c(p,d){e.cursor.hoverX=f(p),e.cursor.hoverY=h(d)}function l(p,d){e.cursor.clickX=f(p),e.cursor.clickY=h(d)}function f(p){var d=(p-t.left)/t.width;return(r.maxX-r.minX)*d+r.minX}function h(p){var d=1-(p-t.top)/t.height;return(r.minY-r.maxY)*d+r.maxY}}/**
* @vue/shared v3.5.29
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function hr(e){const t=Object.create(null);for(const r of e.split(","))t[r]=1;return r=>r in t}const Da={},Ws=[],Ba=()=>{},Ks=()=>!1,Qs=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),Js=e=>e.startsWith("onUpdate:"),zn=Object.assign,Na=(e,t)=>{const r=e.indexOf(t);r>-1&&e.splice(r,1)},La=Object.prototype.hasOwnProperty,Ft=(e,t)=>La.call(e,t),te=Array.isArray,Ve=e=>vt(e)==="[object Map]",Vn=e=>vt(e)==="[object Set]",mn=e=>vt(e)==="[object Date]",Me=e=>typeof e=="function",it=e=>typeof e=="string",ue=e=>typeof e=="symbol",re=e=>e!==null&&typeof e=="object",ec=e=>(re(e)||Me(e))&&Me(e.then)&&Me(e.catch),$n=Object.prototype.toString,vt=e=>$n.call(e),Xa=e=>vt(e).slice(8,-1),qn=e=>vt(e)==="[object Object]",mr=e=>it(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,tc=hr(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Xt=e=>{const t=Object.create(null);return r=>t[r]||(t[r]=e(r))},Ya=/-\w/g,rc=Xt(e=>e.replace(Ya,t=>t.slice(1).toUpperCase())),Ua=/\B([A-Z])/g,nc=Xt(e=>e.replace(Ua,"-$1").toLowerCase()),za=Xt(e=>e.charAt(0).toUpperCase()+e.slice(1)),oc=Xt(e=>e?`on${za(e)}`:""),Ce=(e,t)=>!Object.is(e,t),ic=(e,...t)=>{for(let r=0;r<e.length;r++)e[r](...t)},Va=(e,t,r,n=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:n,value:r})},ac=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let yn;const sc=()=>yn||(yn=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function $a(e){if(te(e)){const t={};for(let r=0;r<e.length;r++){const n=e[r],o=it(n)?Ga(n):$a(n);if(o)for(const a in o)t[a]=o[a]}return t}else if(it(e)||re(e))return e}const qa=/;(?![^(]*\))/g,ka=/:([^]+)/,ja=/\/\*[^]*?\*\//g;function Ga(e){const t={};return e.replace(ja,"").split(qa).forEach(r=>{if(r){const n=r.split(ka);n.length>1&&(t[n[0].trim()]=n[1].trim())}}),t}function Ha(e){let t="";if(it(e))t=e;else if(te(e))for(let r=0;r<e.length;r++){const n=Ha(e[r]);n&&(t+=n+" ")}else if(re(e))for(const r in e)e[r]&&(t+=r+" ");return t.trim()}const Za="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",cc=hr(Za);function uc(e){return!!e||e===""}function Wa(e,t){if(e.length!==t.length)return!1;let r=!0;for(let n=0;r&&n<e.length;n++)r=yr(e[n],t[n]);return r}function yr(e,t){if(e===t)return!0;let r=mn(e),n=mn(t);if(r||n)return r&&n?e.getTime()===t.getTime():!1;if(r=ue(e),n=ue(t),r||n)return e===t;if(r=te(e),n=te(t),r||n)return r&&n?Wa(e,t):!1;if(r=re(e),n=re(t),r||n){if(!r||!n)return!1;const o=Object.keys(e).length,a=Object.keys(t).length;if(o!==a)return!1;for(const i in e){const s=e.hasOwnProperty(i),c=t.hasOwnProperty(i);if(s&&!c||!s&&c||!yr(e[i],t[i]))return!1}}return String(e)===String(t)}function fc(e,t){return e.findIndex(r=>yr(r,t))}const kn=e=>!!(e&&e.__v_isRef===!0),Ka=e=>it(e)?e:e==null?"":te(e)||re(e)&&(e.toString===$n||!Me(e.toString))?kn(e)?Ka(e.value):JSON.stringify(e,jn,2):String(e),jn=(e,t)=>kn(t)?jn(e,t.value):Ve(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((r,[n,o],a)=>(r[Kt(n,a)+" =>"]=o,r),{})}:Vn(t)?{[`Set(${t.size})`]:[...t.values()].map(r=>Kt(r))}:ue(t)?Kt(t):re(t)&&!te(t)&&!qn(t)?String(t):t,Kt=(e,t="")=>{var r;return ue(e)?`Symbol(${(r=e.description)!=null?r:t})`:e};/**
* @vue/reactivity v3.5.29
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let H;class lc{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.__v_skip=!0,this.parent=H,!t&&H&&(this.index=(H.scopes||(H.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,r;if(this.scopes)for(t=0,r=this.scopes.length;t<r;t++)this.scopes[t].pause();for(t=0,r=this.effects.length;t<r;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,r;if(this.scopes)for(t=0,r=this.scopes.length;t<r;t++)this.scopes[t].resume();for(t=0,r=this.effects.length;t<r;t++)this.effects[t].resume()}}run(t){if(this._active){const r=H;try{return H=this,t()}finally{H=r}}}on(){++this._on===1&&(this.prevScope=H,H=this)}off(){this._on>0&&--this._on===0&&(H=this.prevScope,this.prevScope=void 0)}stop(t){if(this._active){this._active=!1;let r,n;for(r=0,n=this.effects.length;r<n;r++)this.effects[r].stop();for(this.effects.length=0,r=0,n=this.cleanups.length;r<n;r++)this.cleanups[r]();if(this.cleanups.length=0,this.scopes){for(r=0,n=this.scopes.length;r<n;r++)this.scopes[r].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const o=this.parent.scopes.pop();o&&o!==this&&(this.parent.scopes[this.index]=o,o.index=this.index)}this.parent=void 0}}}function Qa(){return H}let O;const Qt=new WeakSet;class Ja{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,H&&H.active&&H.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Qt.has(this)&&(Qt.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Hn(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,gn(this),Zn(this);const t=O,r=oe;O=this,oe=!0;try{return this.fn()}finally{Wn(this),O=t,oe=r,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)br(t);this.deps=this.depsTail=void 0,gn(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Qt.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){or(this)&&this.run()}get dirty(){return or(this)}}let Gn=0,nt,ot;function Hn(e,t=!1){if(e.flags|=8,t){e.next=ot,ot=e;return}e.next=nt,nt=e}function gr(){Gn++}function xr(){if(--Gn>0)return;if(ot){let t=ot;for(ot=void 0;t;){const r=t.next;t.next=void 0,t.flags&=-9,t=r}}let e;for(;nt;){let t=nt;for(nt=void 0;t;){const r=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(n){e||(e=n)}t=r}}if(e)throw e}function Zn(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Wn(e){let t,r=e.depsTail,n=r;for(;n;){const o=n.prevDep;n.version===-1?(n===r&&(r=o),br(n),es(n)):t=n,n.dep.activeLink=n.prevActiveLink,n.prevActiveLink=void 0,n=o}e.deps=t,e.depsTail=r}function or(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Kn(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function Kn(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===at)||(e.globalVersion=at,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!or(e))))return;e.flags|=2;const t=e.dep,r=O,n=oe;O=e,oe=!0;try{Zn(e);const o=e.fn(e._value);(t.version===0||Ce(o,e._value))&&(e.flags|=128,e._value=o,t.version++)}catch(o){throw t.version++,o}finally{O=r,oe=n,Wn(e),e.flags&=-3}}function br(e,t=!1){const{dep:r,prevSub:n,nextSub:o}=e;if(n&&(n.nextSub=o,e.prevSub=void 0),o&&(o.prevSub=n,e.nextSub=void 0),r.subs===e&&(r.subs=n,!n&&r.computed)){r.computed.flags&=-5;for(let a=r.computed.deps;a;a=a.nextDep)br(a,!0)}!t&&!--r.sc&&r.map&&r.map.delete(r.key)}function es(e){const{prevDep:t,nextDep:r}=e;t&&(t.nextDep=r,e.prevDep=void 0),r&&(r.prevDep=t,e.nextDep=void 0)}let oe=!0;const Qn=[];function Jn(){Qn.push(oe),oe=!1}function eo(){const e=Qn.pop();oe=e===void 0?!0:e}function gn(e){const{cleanup:t}=e;if(e.cleanup=void 0,t){const r=O;O=void 0;try{t()}finally{O=r}}}let at=0;class ts{constructor(t,r){this.sub=t,this.dep=r,this.version=r.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class to{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!O||!oe||O===this.computed)return;let r=this.activeLink;if(r===void 0||r.sub!==O)r=this.activeLink=new ts(O,this),O.deps?(r.prevDep=O.depsTail,O.depsTail.nextDep=r,O.depsTail=r):O.deps=O.depsTail=r,ro(r);else if(r.version===-1&&(r.version=this.version,r.nextDep)){const n=r.nextDep;n.prevDep=r.prevDep,r.prevDep&&(r.prevDep.nextDep=n),r.prevDep=O.depsTail,r.nextDep=void 0,O.depsTail.nextDep=r,O.depsTail=r,O.deps===r&&(O.deps=n)}return r}trigger(t){this.version++,at++,this.notify(t)}notify(t){gr();try{for(let r=this.subs;r;r=r.prevSub)r.sub.notify()&&r.sub.dep.notify()}finally{xr()}}}function ro(e){if(e.dep.sc++,e.sub.flags&4){const t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let n=t.deps;n;n=n.nextDep)ro(n)}const r=e.dep.subs;r!==e&&(e.prevSub=r,r&&(r.nextSub=e)),e.dep.subs=e}}const ir=new WeakMap,Re=Symbol(""),ar=Symbol(""),st=Symbol("");function Z(e,t,r){if(oe&&O){let n=ir.get(e);n||ir.set(e,n=new Map);let o=n.get(r);o||(n.set(r,o=new to),o.map=n,o.key=r),o.track()}}function ve(e,t,r,n,o,a){const i=ir.get(e);if(!i){at++;return}const s=c=>{c&&c.trigger()};if(gr(),t==="clear")i.forEach(s);else{const c=te(e),l=c&&mr(r);if(c&&r==="length"){const f=Number(n);i.forEach((h,p)=>{(p==="length"||p===st||!ue(p)&&p>=f)&&s(h)})}else switch((r!==void 0||i.has(void 0))&&s(i.get(r)),l&&s(i.get(st)),t){case"add":c?l&&s(i.get("length")):(s(i.get(Re)),Ve(e)&&s(i.get(ar)));break;case"delete":c||(s(i.get(Re)),Ve(e)&&s(i.get(ar)));break;case"set":Ve(e)&&s(i.get(Re));break}}xr()}function Xe(e){const t=D(e);return t===e?t:(Z(t,"iterate",st),ae(e)?t:t.map(Ie))}function wr(e){return Z(e=D(e),"iterate",st),e}function pe(e,t){return Ae(e)?ct($e(e)?Ie(t):t):Ie(t)}const rs={__proto__:null,[Symbol.iterator](){return Jt(this,Symbol.iterator,e=>pe(this,e))},concat(...e){return Xe(this).concat(...e.map(t=>te(t)?Xe(t):t))},entries(){return Jt(this,"entries",e=>(e[1]=pe(this,e[1]),e))},every(e,t){return ce(this,"every",e,t,void 0,arguments)},filter(e,t){return ce(this,"filter",e,t,r=>r.map(n=>pe(this,n)),arguments)},find(e,t){return ce(this,"find",e,t,r=>pe(this,r),arguments)},findIndex(e,t){return ce(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return ce(this,"findLast",e,t,r=>pe(this,r),arguments)},findLastIndex(e,t){return ce(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return ce(this,"forEach",e,t,void 0,arguments)},includes(...e){return er(this,"includes",e)},indexOf(...e){return er(this,"indexOf",e)},join(e){return Xe(this).join(e)},lastIndexOf(...e){return er(this,"lastIndexOf",e)},map(e,t){return ce(this,"map",e,t,void 0,arguments)},pop(){return Qe(this,"pop")},push(...e){return Qe(this,"push",e)},reduce(e,...t){return xn(this,"reduce",e,t)},reduceRight(e,...t){return xn(this,"reduceRight",e,t)},shift(){return Qe(this,"shift")},some(e,t){return ce(this,"some",e,t,void 0,arguments)},splice(...e){return Qe(this,"splice",e)},toReversed(){return Xe(this).toReversed()},toSorted(e){return Xe(this).toSorted(e)},toSpliced(...e){return Xe(this).toSpliced(...e)},unshift(...e){return Qe(this,"unshift",e)},values(){return Jt(this,"values",e=>pe(this,e))}};function Jt(e,t,r){const n=wr(e),o=n[t]();return n!==e&&!ae(e)&&(o._next=o.next,o.next=()=>{const a=o._next();return a.done||(a.value=r(a.value)),a}),o}const ns=Array.prototype;function ce(e,t,r,n,o,a){const i=wr(e),s=i!==e&&!ae(e),c=i[t];if(c!==ns[t]){const h=c.apply(e,a);return s?Ie(h):h}let l=r;i!==e&&(s?l=function(h,p){return r.call(this,pe(e,h),p,e)}:r.length>2&&(l=function(h,p){return r.call(this,h,p,e)}));const f=c.call(i,l,n);return s&&o?o(f):f}function xn(e,t,r,n){const o=wr(e);let a=r;return o!==e&&(ae(e)?r.length>3&&(a=function(i,s,c){return r.call(this,i,s,c,e)}):a=function(i,s,c){return r.call(this,i,pe(e,s),c,e)}),o[t](a,...n)}function er(e,t,r){const n=D(e);Z(n,"iterate",st);const o=n[t](...r);return(o===-1||o===!1)&&gs(r[0])?(r[0]=D(r[0]),n[t](...r)):o}function Qe(e,t,r=[]){Jn(),gr();const n=D(e)[t].apply(e,r);return xr(),eo(),n}const os=hr("__proto__,__v_isRef,__isVue"),no=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(ue));function is(e){ue(e)||(e=String(e));const t=D(this);return Z(t,"has",e),t.hasOwnProperty(e)}class oo{constructor(t=!1,r=!1){this._isReadonly=t,this._isShallow=r}get(t,r,n){if(r==="__v_skip")return t.__v_skip;const o=this._isReadonly,a=this._isShallow;if(r==="__v_isReactive")return!o;if(r==="__v_isReadonly")return o;if(r==="__v_isShallow")return a;if(r==="__v_raw")return n===(o?a?fo:uo:a?co:so).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(n)?t:void 0;const i=te(t);if(!o){let c;if(i&&(c=rs[r]))return c;if(r==="hasOwnProperty")return is}const s=Reflect.get(t,r,ie(t)?t:n);if((ue(r)?no.has(r):os(r))||(o||Z(t,"get",r),a))return s;if(ie(s)){const c=i&&mr(r)?s:s.value;return o&&re(c)?cr(c):c}return re(s)?o?cr(s):_r(s):s}}class io extends oo{constructor(t=!1){super(!1,t)}set(t,r,n,o){let a=t[r];const i=te(t)&&mr(r);if(!this._isShallow){const l=Ae(a);if(!ae(n)&&!Ae(n)&&(a=D(a),n=D(n)),!i&&ie(a)&&!ie(n))return l||(a.value=n),!0}const s=i?Number(r)<t.length:Ft(t,r),c=Reflect.set(t,r,n,ie(t)?t:o);return t===D(o)&&(s?Ce(n,a)&&ve(t,"set",r,n):ve(t,"add",r,n)),c}deleteProperty(t,r){const n=Ft(t,r);t[r];const o=Reflect.deleteProperty(t,r);return o&&n&&ve(t,"delete",r,void 0),o}has(t,r){const n=Reflect.has(t,r);return(!ue(r)||!no.has(r))&&Z(t,"has",r),n}ownKeys(t){return Z(t,"iterate",te(t)?"length":Re),Reflect.ownKeys(t)}}class ao extends oo{constructor(t=!1){super(!0,t)}set(t,r){return!0}deleteProperty(t,r){return!0}}const as=new io,ss=new ao,cs=new io(!0),us=new ao(!0),sr=e=>e,Ct=e=>Reflect.getPrototypeOf(e);function fs(e,t,r){return function(...n){const o=this.__v_raw,a=D(o),i=Ve(a),s=e==="entries"||e===Symbol.iterator&&i,c=e==="keys"&&i,l=o[e](...n),f=r?sr:t?ct:Ie;return!t&&Z(a,"iterate",c?ar:Re),zn(Object.create(l),{next(){const{value:h,done:p}=l.next();return p?{value:h,done:p}:{value:s?[f(h[0]),f(h[1])]:f(h),done:p}}})}}function Rt(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function ls(e,t){const r={get(o){const a=this.__v_raw,i=D(a),s=D(o);e||(Ce(o,s)&&Z(i,"get",o),Z(i,"get",s));const{has:c}=Ct(i),l=t?sr:e?ct:Ie;if(c.call(i,o))return l(a.get(o));if(c.call(i,s))return l(a.get(s));a!==i&&a.get(o)},get size(){const o=this.__v_raw;return!e&&Z(D(o),"iterate",Re),o.size},has(o){const a=this.__v_raw,i=D(a),s=D(o);return e||(Ce(o,s)&&Z(i,"has",o),Z(i,"has",s)),o===s?a.has(o):a.has(o)||a.has(s)},forEach(o,a){const i=this,s=i.__v_raw,c=D(s),l=t?sr:e?ct:Ie;return!e&&Z(c,"iterate",Re),s.forEach((f,h)=>o.call(a,l(f),l(h),i))}};return zn(r,e?{add:Rt("add"),set:Rt("set"),delete:Rt("delete"),clear:Rt("clear")}:{add(o){!t&&!ae(o)&&!Ae(o)&&(o=D(o));const a=D(this);return Ct(a).has.call(a,o)||(a.add(o),ve(a,"add",o,o)),this},set(o,a){!t&&!ae(a)&&!Ae(a)&&(a=D(a));const i=D(this),{has:s,get:c}=Ct(i);let l=s.call(i,o);l||(o=D(o),l=s.call(i,o));const f=c.call(i,o);return i.set(o,a),l?Ce(a,f)&&ve(i,"set",o,a):ve(i,"add",o,a),this},delete(o){const a=D(this),{has:i,get:s}=Ct(a);let c=i.call(a,o);c||(o=D(o),c=i.call(a,o)),s&&s.call(a,o);const l=a.delete(o);return c&&ve(a,"delete",o,void 0),l},clear(){const o=D(this),a=o.size!==0,i=o.clear();return a&&ve(o,"clear",void 0,void 0),i}}),["keys","values","entries",Symbol.iterator].forEach(o=>{r[o]=fs(o,e,t)}),r}function Yt(e,t){const r=ls(e,t);return(n,o,a)=>o==="__v_isReactive"?!e:o==="__v_isReadonly"?e:o==="__v_raw"?n:Reflect.get(Ft(r,o)&&o in n?r:n,o,a)}const ds={get:Yt(!1,!1)},ps={get:Yt(!1,!0)},vs={get:Yt(!0,!1)},hs={get:Yt(!0,!0)},so=new WeakMap,co=new WeakMap,uo=new WeakMap,fo=new WeakMap;function ms(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function ys(e){return e.__v_skip||!Object.isExtensible(e)?0:ms(Xa(e))}function _r(e){return Ae(e)?e:Ut(e,!1,as,ds,so)}function dc(e){return Ut(e,!1,cs,ps,co)}function cr(e){return Ut(e,!0,ss,vs,uo)}function pc(e){return Ut(e,!0,us,hs,fo)}function Ut(e,t,r,n,o){if(!re(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const a=ys(e);if(a===0)return e;const i=o.get(e);if(i)return i;const s=new Proxy(e,a===2?n:r);return o.set(e,s),s}function $e(e){return Ae(e)?$e(e.__v_raw):!!(e&&e.__v_isReactive)}function Ae(e){return!!(e&&e.__v_isReadonly)}function ae(e){return!!(e&&e.__v_isShallow)}function gs(e){return e?!!e.__v_raw:!1}function D(e){const t=e&&e.__v_raw;return t?D(t):e}function vc(e){return!Ft(e,"__v_skip")&&Object.isExtensible(e)&&Va(e,"__v_skip",!0),e}const Ie=e=>re(e)?_r(e):e,ct=e=>re(e)?cr(e):e;function ie(e){return e?e.__v_isRef===!0:!1}function xs(e){return ie(e)?e.value:e}const bs={get:(e,t,r)=>t==="__v_raw"?e:xs(Reflect.get(e,t,r)),set:(e,t,r,n)=>{const o=e[t];return ie(o)&&!ie(r)?(o.value=r,!0):Reflect.set(e,t,r,n)}};function hc(e){return $e(e)?e:new Proxy(e,bs)}class ws{constructor(t,r,n){this.fn=t,this.setter=r,this._value=void 0,this.dep=new to(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=at-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!r,this.isSSR=n}notify(){if(this.flags|=16,!(this.flags&8)&&O!==this)return Hn(this,!0),!0}get value(){const t=this.dep.track();return Kn(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function mc(e,t,r=!1){let n,o;return Me(e)?n=e:(n=e.get,o=e.set),new ws(n,o,r)}const At={},Dt=new WeakMap;let Ee;function _s(e,t=!1,r=Ee){if(r){let n=Dt.get(r);n||Dt.set(r,n=[]),n.push(e)}}function yc(e,t,r=Da){const{immediate:n,deep:o,once:a,scheduler:i,augmentJob:s,call:c}=r,l=S=>o?S:ae(S)||o===!1||o===0?he(S,1):he(S);let f,h,p,d,m=!1,v=!1;if(ie(e)?(h=()=>e.value,m=ae(e)):$e(e)?(h=()=>l(e),m=!0):te(e)?(v=!0,m=e.some(S=>$e(S)||ae(S)),h=()=>e.map(S=>{if(ie(S))return S.value;if($e(S))return l(S);if(Me(S))return c?c(S,2):S()})):Me(e)?t?h=c?()=>c(e,2):e:h=()=>{if(p){Jn();try{p()}finally{eo()}}const S=Ee;Ee=f;try{return c?c(e,3,[d]):e(d)}finally{Ee=S}}:h=Ba,t&&o){const S=h,F=o===!0?1/0:o;h=()=>he(S(),F)}const b=Qa(),x=()=>{f.stop(),b&&b.active&&Na(b.effects,f)};if(a&&t){const S=t;t=(...F)=>{S(...F),x()}}let E=v?new Array(e.length).fill(At):At;const I=S=>{if(!(!(f.flags&1)||!f.dirty&&!S))if(t){const F=f.run();if(o||m||(v?F.some((C,L)=>Ce(C,E[L])):Ce(F,E))){p&&p();const C=Ee;Ee=f;try{const L=[F,E===At?void 0:v&&E[0]===At?[]:E,d];E=F,c?c(t,3,L):t(...L)}finally{Ee=C}}}else f.run()};return s&&s(I),f=new Ja(h),f.scheduler=i?()=>i(I,!1):I,d=S=>_s(S,!1,f),p=f.onStop=()=>{const S=Dt.get(f);if(S){if(c)c(S,4);else for(const F of S)F();Dt.delete(f)}},t?n?I(!0):E=f.run():i?i(I.bind(null,!0),!0):f.run(),x.pause=f.pause.bind(f),x.resume=f.resume.bind(f),x.stop=x,x}function he(e,t=1/0,r){if(t<=0||!re(e)||e.__v_skip||(r=r||new Map,(r.get(e)||0)>=t))return e;if(r.set(e,t),t--,ie(e))he(e.value,t,r);else if(te(e))for(let n=0;n<e.length;n++)he(e[n],t,r);else if(Vn(e)||Ve(e))e.forEach(n=>{he(n,t,r)});else if(qn(e)){for(const n in e)he(e[n],t,r);for(const n of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,n)&&he(e[n],t,r)}return e}function Ss(e,t){return t||(t={}),new Promise(r);function r(n,o){var a=new XMLHttpRequest;typeof t.progress=="function"&&a.addEventListener("progress",i,!1),a.addEventListener("load",s,!1),a.addEventListener("error",c,!1),a.addEventListener("abort",l,!1),a.open("GET",e),t.responseType&&(a.responseType=t.responseType),a.send(null);function i(f){f.lengthComputable&&t.progress({loaded:f.loaded,total:f.total,percent:f.loaded/f.total})}function s(){if(a.status!==200){o(`Unexpected status code ${a.status} when calling ${e}`);return}var f=a.response;t.responseType==="json"&&typeof f=="string"&&(f=JSON.parse(f)),n(f)}function c(){o(`Failed to download ${e}`)}function l(){o(`Cancelled download of ${e}`)}}}var bn=new Map;function Ts(e){if(!e)return Promise.reject("Missing link");var t=e.trim();if(!t)return Promise.reject("Missing link");let r=bn.get(t);return r?Promise.resolve(r):Ss(e).then(n=>(bn.set(e,n),n))}var wn="#include ",Es={code:""};function Ps(e){if(!e)return new Promise(r=>r(Es));var t=Ms(e);return t.pending.length>0?Promise.all(t.pending).then(()=>t).catch(r=>({error:{error:r}})):new Promise(r=>r(t))}function Ms(e){var t=[],r=e.split(`
`),n=[],o=0;return r.forEach((s,c)=>{o=c,s&&s[0]==="#"?(n.push(""),i(s)):n.push(s)}),{getCode:a,pending:t};function a(){return n.join(`
`)}function i(s){if(s.indexOf(wn)===0){var c=s.substr(wn.length),l=o;t.push(Ts(c).then(f=>{n[l]=f}))}}}var lo={check(e){return{code:e,log:{errorCount:0}}}};lr(()=>import("./parser-DwgkW_yS.js").then(e=>e.p),[],import.meta.url).then(e=>{lo=e.default||e,U.fire("glsl-parser-ready")});var Cs=`
import {
  float PI;
  float snoise(vec2 v);
  float frame;
  vec4 cursor;
  vec2 rotate(vec2 p,float a);
  float audio(float index);
  float rand(const vec2 co);
  sampler2D input0;
  sampler2D input1;
}`;function Rs(e){return Ps(e).then(t=>{if(t.error)return t;e=t.getCode();var r=lo.check(e,{globals:Cs});return r.code=e,r.log.errorCount&&(r.error=As(r.log)),r})}function As(e){let t=e.diagnostics[0],r=t.range,n=r.lineColumn(),o=r.source,a=o._lineOffsets[n.line],i=o.contents.substr(a,n.column);i+=o.contents.substring(r.start,r.end);let s="Line "+n.line+": ",c=t.text;return{error:s+i+`
`+_n(s.length)+_n(n.column)+"^",errorDetail:c,isFloatError:Is(c)}}function Is(e){return e.indexOf('"int"')>-1&&e.indexOf('"float"')>-1}function _n(e){return new Array(e+1).join(" ")}function Os(e){U.on("glsl-parser-ready",f);var t=0,r=M.getCode(),n;l();var o=_r({getCode:i,setCode:s,dispose:a,code:r,error:"",errorDetail:"",isFloatError:!1});return o;function a(){U.off("glsl-parser-ready",f)}function i(){return M.getCode()}function s(p){if(p===r){n&&n.error&&f();return}h(p).then(d=>{if(!d.cancelled){if(d&&d.error)return c(d.error),d;r=p,o.code=p,M.saveCode(p)}})}function c(p){p&&p.error?(o.error=p.error,o.errorDetail=p.errorDetail,o.isFloatError=p.isFloatError):(o.error="",o.errorDetail="",o.isFloatError=!1)}function l(){let p=M.getCode();p?h(p).then(d=>{d.error&&(console.error("Failed to restore previous vector field: ",d.error),h(M.getDefaultCode()))}):h(M.getDefaultCode())}function f(p){return Rs(p||r).then(d=>(n=d,c(n.error),n))}function h(p){t+=1;var d=t;return f(p).then(m=>{if(d!==t)return m.cancelled=!0,m;if(m.error)return m;try{return e.updateCode(m.code),m}catch(v){return{error:{error:v.message}}}})}}function Fs(){var e=new Map,t;return{updateBindings:n,bindInput:r};function r(a,i){var s=e.get(a);s&&s.dispose(),e.set(a,i)}function n(a){t=a,e.forEach(o)}function o(a,i){a.updateBinding(t,i)}}function Ds(e,t){var r,n,o=new Image;return o.crossOrigin="",o.onload=i,o.onerror=a,o.src=t,new Promise((s,c)=>{r=s,n=c});function a(s){n(s)}function i(){var s=e.createTexture(),c=0,l=e.RGBA,f=e.RGBA,h=e.UNSIGNED_BYTE;e.bindTexture(e.TEXTURE_2D,s),e.texImage2D(e.TEXTURE_2D,c,l,f,h,o),Sn(o.width)&&Sn(o.height)?e.generateMipmap(e.TEXTURE_2D):(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR)),r(s)}}function Sn(e){return(e&e-1)==0}const Bs=Ia.FREE_TEXTURE_UNIT;function Ns(e,t,r){var n=null;return Ds(e.gl,t).then(a).catch(o),{updateBinding:i,dispose(){e.gl.deleteTexture(n)}};function o(s){r&&r.error&&r.error(s)}function a(s){n=s,U.fire("refresh-speed"),r&&r.done&&r.done(t)}function i(s,c){if(n){var l=c+Bs;N.bindTexture(e.gl,n,l),e.gl.uniform1i(s[`input${c}`],l)}}}function Ls(e){e.inputs=Fs();var t=[];a();var r={getInputs:n,addInput:o};return r;function n(){return t}function o(i){var s=Xs(e,i);return t.push(s),s}function a(){var i=M.getQS().get("i0");if(i){var s=o(0);s.link=i,s.updateBinding(!0)}}}function Xs(e,t){var r=null,n={link:"",error:null,name:`input${t}`,updateBinding:o};return n;function o(i){r&&(clearTimeout(r),r=null),i?a():r=setTimeout(a,300)}function a(){n.error=null,r=null;var i=Ns(e,n.link,{done(){M.getQS().set(`i${t}`,n.link)},error(s){n.error=s}});e.inputs.bindInput(0,i)}}function Ys(e){var t={width:0,height:0,top:0,left:0};Oe(e.canvas.width,e.canvas.height),window.addEventListener("resize",le,!0),U.on("start-record",E),U.on("stop-record",I);var r=null,n=M.getBBox()||{},o={scale:1,x:0,y:0},a=M.getParticleCount();e.disable(e.DEPTH_TEST),e.disable(e.STENCIL_TEST);var i={gl:e,bbox:n,canvasRect:t,inputs:null,framebuffer:e.createFramebuffer(),quadBuffer:N.createBuffer(e,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1])),colorMode:M.getColorMode(),colorFunction:M.getColorFunction(),screenTextureUnit:3,integrationTimeStep:M.getIntegrationTimeStep(),dropProbability:M.getDropProbability(),frame:0,cursor:{clickX:0,clickY:0,hoverX:0,hoverY:0},particleStateResolution:0,fadeOpacity:M.getFadeout(),audioTexture:null},s,c=!1,l=Ls(i),f=ha(i),h=Oa(i),p=Fa(i),d=Os(h);ge(a);var m={start:ye,stop:de,dispose:Q,resetBoundingBox:zt,moveBoundingBox:b,applyBoundingBox:je,setPaused:K,getParticlesCount:j,setParticlesCount:X,setFadeOutSpeed:z,getFadeOutSpeed:V,setDropProbability:$,getDropProbability:fe,getIntegrationTimeStep:C,setIntegrationTimeStep:L,setColorMode:S,getColorMode:F,vectorFieldEditorState:d,inputsModel:l,getCanvasRect(){return t},getBoundingBox(){return i.bbox}},v=ht();return qe(),setTimeout(()=>{U.fire("scene-ready",m)}),m;function b(_){if(_){var T=Object.assign({},i.bbox);if(x(_,"minX",T),x(_,"minY",T),x(_,"maxX",T),x(_,"maxY",T),_.minY!==void 0||_.maxY!==void 0){var Y=Math.abs(T.minY-T.maxY)/Math.abs(i.bbox.minY-i.bbox.maxY),k=(i.bbox.maxX+i.bbox.minX)/2,G=(i.bbox.maxX-i.bbox.minX)/2;T.minX=k-G*Y,T.maxX=k+G*Y}je(T)}}function x(_,T,Y){var k=Number.parseFloat(_[T]);Number.isFinite(k)&&(Y[T]=k)}function E(_){r=_}function I(){r=null}function S(_){var T=parseInt(_,10);M.setColorMode(T),i.colorMode=M.getColorMode(),h.updateColorMode(T)}function F(){return M.getColorMode()}function C(){return M.getIntegrationTimeStep()}function L(_){var T=parseFloat(_);Number.isFinite(T)&&(i.integrationTimeStep=T,M.setIntegrationTimeStep(T),U.fire("integration-timestep-changed",T))}function K(_){c=_,ye()}function z(_){var T=parseFloat(_);Number.isFinite(T)&&(i.fadeOpacity=T,M.setFadeout(T))}function V(){return M.getFadeout()}function j(){return M.getParticleCount()}function X(_){Number.isFinite(_)&&_!==a&&(_<1||(ge(_),a=_,M.setParticleCount(_)))}function $(_){var T=parseFloat(_);Number.isFinite(T)&&(M.setDropProbability(T),i.dropProbability=T)}function fe(){return M.getDropProbability()}function le(){Oe(window.innerWidth,window.innerHeight),f.updateScreenTextures(),ke(o)}function Oe(_,T){var Y=Math.max(_*.02,30),k=Math.max(T*.02,30);t.width=_+2*Y,t.height=T+2*k,t.top=-k,t.left=-Y;let G=e.canvas;G.width=t.width,G.height=t.height,G.style.left=-Y+"px",G.style.top=-k+"px"}function Q(){de(),v.dispose(),window.removeEventListener("resize",le,!0),p.dispose(),d.dispose()}function ye(){s||c||(s=requestAnimationFrame(Fe))}function de(){cancelAnimationFrame(s),s=0}function Fe(){s=0,De(),r&&r.capture(e.canvas),ye()}function De(){f.fadeOutLastFrame(),h.drawParticles(),f.renderCurrentScreen(),h.updateParticlesPositions()}function ge(_){i.particleStateResolution=Math.ceil(Math.sqrt(_)),h.updateParticlesCount()}function ht(){return Pi(e.canvas,{controller:va(e.canvas,ke)})}function qe(){var _=M.getBBox(),{width:T,height:Y}=t;let k=Math.PI*Math.E,G=Math.PI*Math.E,xe=0,be=0;_&&(k=_.maxX-_.minX,G=_.maxY-_.minY,xe=T*(_.minX+_.maxX)/2,be=T*(_.minY+_.maxY)/2);var J=k*T/2,we=G*Y/2;v.showRectangle({left:-J+xe,top:-we-be,right:J+xe,bottom:we-be})}function ke(_){f.boundingBoxUpdated=!0,o.x=_.x,o.y=_.y,o.scale=_.scale;var{width:T,height:Y}=t,k=we(0),G=mt(0),xe=we(T),be=mt(Y),J=1e4;n.minX=Math.round(J*k/T)/J,n.minY=Math.round(J*-G/T)/J,n.maxX=Math.round(J*xe/T)/J,n.maxY=Math.round(J*-be/T)/J,M.saveBBox(n),U.fire("bbox-change",n);function we(Ge){return(Ge-_.x)/_.scale}function mt(Ge){return(Ge-_.y)/_.scale}}function zt(){var _=Math.PI*Math.E*.5,T=Math.PI*Math.E*.5;je({minX:-_,minY:-T,maxX:_,maxY:T})}function je(_){M.saveBBox(_),qe(),v.moveBy(0,0,!1)}}const Us=[{name:"Secret door",timeStep:.01,fadeOut:.998,dropProbability:.009,colorMode:1,cx:-.15344999999999986,cy:-.1291,w:7.4611,h:7.4611,code:`// p.x and p.y are current coordinates
  // v.x and v.y is a velocity at point p
  vec2 get_velocity(vec2 p) {
    vec2 v = vec2(0., 0.);

    // change this to get a new vector field
    v.x = p.y*p.y ;
    v.y = -p.x*p.x *.05;

    return v;
  }`},{name:"Miserables graph with edges",timeStep:-.001,fadeOut:.998,dropProbability:.008,colorMode:2,cx:.467,cy:1.5294,w:.9368,h:.9368,showBindings:1,i0:"https://gist.githubusercontent.com/anvaka/ebc18e3ffe05b0709a7ae933261fa2e9/raw/bafb63d01e0ab37c1f9b51522a5ec4fbc19bc4f1/edges.png",code:`// p.x and p.y are current coordinates
// v.x and v.y is a velocity at point p
vec2 get_velocity(vec2 p) {
  vec2 v = vec2(0., 0.);

  // change this to get a new vector field
  vec4 c = texture2D(input0, vec2(mod(p.x,1.), 1. - mod(p.y, 1.)));
  v.x = (c.r + c.g/255.) - 0.5;
  v.y = 0.5 - (c.b + c.a/255.);

  if (length(v) < 0.1) v = vec2(0.);
  return (v);
}`,particleCount:4e4},{name:"Roads",timeStep:.001,fadeOut:.998,dropProbability:.009,colorMode:2,cx:.478,cy:.2636,w:.9922,h:.9922,showBindings:0,i0:"https://gist.githubusercontent.com/anvaka/ebc18e3ffe05b0709a7ae933261fa2e9/raw/cd7d82c5a235f50f5655ac94aa9077709731adde/binary_tree.png",code:`// p.x and p.y are current coordinates
// v.x and v.y is a velocity at point p
vec2 get_velocity(vec2 p) {
  vec2 v = vec2(0., 0.);

  // change this to get a new vector field
  vec4 c = texture2D(input0, vec2(mod(p.x,1.), 1. - mod(p.y, 1.)));
  v.x = (c.r + c.g/255.) - 0.5;
  v.y = 0.5 - (c.b + c.a/255.);

  return (v);
}`,particleCount:4e4},{name:"Four counterclockwise cogs pushing particles clockwise :)",timeStep:.01,fadeOut:.998,dropProbability:.009,colorMode:1,cx:.7887499999999994,cy:-.5769500000000001,w:16.3759,h:16.3759,code:`vec2 field(vec2 p) {
  float d = length(p);
  return vec2(-p.y, p.x) * exp(-d*d*0.1);
}
// p.x and p.y are current coordinates
// v.x and v.y is a velocity at point p
vec2 get_velocity(vec2 p) {
  vec2 v = vec2(0., 0.);

  // change this to get a new vector field
  v = field(p + vec2(-5., 0.)) +
    field(p + vec2(-2.5, 2.5)) +
    field(p + vec2(0., 0.)) +
    field(p + vec2(-2.5, -2.5));
  return v;
}`},{name:"Waveshaping [interactive]",cx:0,cy:-.060899999999999954,w:12,h:12,timeStep:.01,fadeOut:.998,dropProbability:.009,colorMode:2,code:`float f(float x) {
  bool supportsHover = length(cursor.zw) > 0.01;
  vec2 c = supportsHover ? cursor.zw : cursor.xy;
  float f1 = sin(x);
  float f2 = sin(2.*x);
  float f3 = sin(3.*x);
  float f4 = sin(4.*x);
  float f5 = sin(5.*x);
  return f1 +
    f2*c.x/4. +
    f3*c.y/6. +
    f4*c.x/8. +
    f5*c.y/10.;
}

float df(float x) {
  float h = 0.001;
  return (f(x+h)-f(x-h))/(2.*h);
}

vec2 get_velocity(vec2 p) {
  vec2 v = vec2(0., 0.);

  float fx = f(p.x);
  float d = abs(p.y-fx);
  float dfx = df(p.x);
  vec2 toOrigin = -p/(20.*length(p));
  vec2 toF = 0.1*vec2(0.,fx-p.y);
  v = d < 0.1 ? vec2(1.,dfx) : toF;
  return v;
}`,particleCount:5e4},{name:"Hex plane [interactive]",timeStep:.01,fadeOut:.99,dropProbability:.99,colorMode:3,cx:0,cy:0,w:8.5398,h:8.5398,code:`vec2 nearest(vec2 p) {
// Charles Chambers black hex magic
float temp = floor(p.x + sqrt(3.) * p.y + 1.);
float q = floor((floor(2.*p.x+1.) + temp) / 3.);
float r = floor((temp + floor(-p.x + sqrt(3.) * p.y + 1.))/3.);
return vec2(q-p.y/2.,r-p.y/8.);
}

// p.x and p.y are current coordinates
// v.x and v.y is a velocity at point p
vec2 get_velocity(vec2 p) {
  vec2 v = vec2(0., 0.);
  float f = frame/1000.;
  float z = (3.-p.y)/(6.+cursor.zw.y*2.);
  float a = cursor.zw.x;
  vec2 r = vec2(cos(a)*p.x - sin(a)*p.y,sin(a)*p.x+cos(a)*p.y);
  vec2 t = vec2(r.x / z, r.y / z);
  vec2 n = nearest(t);
  v.x = t.x-n.x;
  v.y = t.y-n.y;
  return v;
}`,particleCount:5e5},{name:"Rain",timeStep:.01,fadeOut:.998,dropProbability:.009,colorMode:1,cx:0,cy:0,w:8.5398,h:8.5398,code:`bool isUnshadowed(vec2 p) {
  bool upper = length(p) > 1.0 && p.y > 0.0;
  bool lower = length(p) > 1.0 && p.y < 0.0 && abs(p.x) > 1.0;
  return upper || lower;
}

vec2 unshadowedV(vec2 p) {
  return vec2(0.0,-3.0+p.y);
}

bool isSpray(vec2 p) {
  return length(p) > 1.0 && abs(p.x) < 1.0;
}

vec2 sprayV(vec2 p) {
  float vy = -1.0+p.y;
  float vx = p.x > 0.0 ? (1.0-p.x)/vy : (-1.0-p.x)/vy;
  return vec2(vx,vy);
}

bool isCircle(vec2 p) {
  return length(p) > 1.0 && length(p) < 1.05;
}

vec2 circleV(vec2 p) {
  vec2 v = vec2(0., 0.);
  v.x = sign(p.x)* p.y;
  v.y = -abs(p.x);
  return v;
}

// p.x and p.y are current coordinates
// v.x and v.y is a velocity at point p
vec2 get_velocity(vec2 p) {
  vec2 v = vec2(0., 0.);

  v = isCircle(p) ? circleV(p) :
      isUnshadowed(p) ? unshadowedV(p) :
      isSpray(p) ? sprayV(p) : vec2(1.0/0.0,1.0/0.0);

  return v;
}`,particleCount:1e4},{name:"Mouse-driven Julia Set",timeStep:.01,fadeOut:.9,dropProbability:.009,colorMode:3,cx:-.27144999999999997,cy:.14175000000000004,w:6.120699999999999,h:6.120699999999999,particleCount:1e6,code:`// p.x and p.y are current coordinates
// v.x and v.y is a velocity at point p
vec2 get_velocity(vec2 p) {
  vec2 v = vec2(0., 0.);

  // change this to get a new vector field
  float a = cursor.zw.x;
float b = cursor.zw.y;
float sx = p.x/2.0;
float sy = p.y/2.0;
float i1x = sx*sx - sy*sy+a;
float i1y = -2.0*sx*sy+b;
float i2x = i1x*i1x - i1y*i1y+a;
float i2y = -2.0*i1x*i1y+b;
float i3x = i2x*i2x - i2y*i2y+a;
float i3y = -2.0*i2x*i2y+b;
float i4x = i3x*i3x - i3y*i3y+a;
float i4y = -2.0*i3x*i3y+b;
float i5x = i4x*i4x - i4y*i4y+a;
float i5y = -2.0*i4x*i4y+b;
float i6x = i5x*i5x - i5y*i5y+a;
float i6y = -2.0*i5x*i5y+b;
float i7x = i6x*i6x - i6y*i6y+a;
float i7y = -2.0*i6x*i6y+b;
float i8x = i7x*i7x - i7y*i7y+a;
float i8y = -2.0*i7x*i7y+b;
float i9x = i8x*i8x - i8y*i8y+a;
float i9y = -2.0*i8x*i8y+b;

  float n = sqrt(i9x*i9x+i9y*i9y);

v.x = n > 2.0 ? -p.x/10.0 : p.x/10.0;
v.y = n > 2.0 ? -p.y/10.0 : p.y/10.0;

  return v;
}`},{name:"Hyperjump",timeStep:.01,fadeOut:.998,dropProbability:.009,colorMode:2,cx:.523299999999999,cy:1.2703999999999995,w:48.3842,h:48.3842,code:`vec2 circle(vec2 p, vec2 c) {
  vec2 c0 = p - c;
  vec2 p0 = vec2(-c0.y, c0.x);
  float l = length(p0);
  return p0 * exp(-l*sin(frame*0.01));
}
// p.x and p.y are current coordinates
// v.x and v.y is a velocity at point p
vec2 get_velocity(vec2 p) {
  vec2 v = circle(p, vec2(0., 0.));

  float r = 7.;
  for (int i = 0; i < 2; ++i) {
    float a = 0.01 * frame + float(i) * 2.*PI/7.;
    v += circle(p, vec2(r * cos(a) , r * sin(a)));
  }
  return v;
}`,particleCount:3e4},{name:"Particle Grinder",timeStep:.01,fadeOut:.998,dropProbability:.009,colorMode:1,cx:.028149999999999675,cy:.08830000000000005,w:9.045300000000001,h:9.045300000000001,code:`vec2 tensor(vec2 p, vec2 c0, vec4 abcd, float N) {
  vec2 p0 = p - c0;
  float theta = atan(p0.y, p0.x);
  float c = cos(N * theta);
  float s = sin(N * theta);
  return length(p0) * vec2(abcd[2] * c + abcd[3] * s,
              abcd[0] * c + abcd[1] * s);
}

vec2 get_velocity(vec2 p) {
  vec2 v = vec2(0., 0.);
  v = tensor(p, vec2(0., 0.), vec4(-2., 0., 0., 1.), 2.);
  return v;
}`},{name:"Hyperbolic flux [interactive]",timeStep:.001,fadeOut:.999,dropProbability:.009,colorMode:3,cx:-.11990000000000034,cy:.018899999999999917,w:8.5442,h:8.5442,code:`// p.x and p.y are current coordinates
// v.x and v.y is a velocity at point p
vec2 get_velocity(vec2 p) {
  vec2 v = vec2(0., 0.);

  float ax = (cursor.zw.x - p.x);
  float ay = (cursor.zw.y - p.y);
  float al = sqrt(ax*ax+ay*ay);

  float rx = (p.x-cursor.xy.x);
  float ry = (p.y-cursor.xy.y);
  float rl = sqrt(rx*rx+ry*ry);

  // change this to get a new vector field
  v.x = (ax*ax*ry + ay*rx*rx)/(al*rl);
  v.y = (ay*ay*rx + ax*ry*ry)/(al*rl);

  return v;
}`,particleCount:1e6},{name:"Swim against the current",timeStep:.01,fadeOut:.998,dropProbability:.009,colorMode:3,cx:3.0524500000000003,cy:-1.3792,w:8.5397,h:8.5397,code:`// p.x and p.y are current coordinates
// v.x and v.y is a velocity at point p
vec2 get_velocity(vec2 p) {
  vec2 v = vec2(0., 0.);

  // change this to get a new vector field
  float dx1 = cursor.zw.x - p.x;
float dy1 = cursor.zw.y - p.y;
float dl1 = sqrt(dx1*dx1+dy1*dy1);
dx1 = dx1/dl1;
dy1 = dy1/dl1;

float dx2 = cursor.xy.x - p.x;
float dy2 = cursor.xy.y - p.y;
float dl2 = sqrt(dx2*dx2+dy2*dy2);
dx2 = dx2/dl2;
dy2 = dy2/dl2;

float fx = cursor.xy.x - cursor.zw.x;
float fy = cursor.xy.y -
cursor.zw.y;
float fl = sqrt(fx*fx+fy*fy);
fx = -fx/fl;
fy = -fy/fl;

float d1 = (dx1*fx + dy1*fy)/(dl1*fl);
float d2 = 1.-d1;
v.x = d1*fx+d2*dx2;
v.y = d1*fy+d2*dy2;

  return v;
}`,particleCount:100900},{name:"Eye of Sauron (interactive)",timeStep:.01,fadeOut:.988,dropProbability:.008,colorMode:2,cx:.3991000000000007,cy:-.11315000000000008,w:37.0984,h:37.0984,code:`// p.x and p.y are current coordinates
// v.x and v.y is a velocity at point p
vec2 get_velocity(vec2 p) {
  vec2 v = vec2(0., 0.);

  // change this to get a new vector field
  // calculate distortion map (reverse solver)
// the distortion map is based on a sphere, but smoothed to the ends: sqrt(1-(x^8/(x^8-1))^(1/4))

float dist_radius = 7.8;
vec2 distortion = cursor.zw;
if (length(distortion) > 4.5) {
    distortion = normalize(distortion) *4.5;
}

// iterative reverse algo. after all, we knew the result position already, we're trying to reason back to what the original position was
vec2 d = p;
for (int i = 0; i < 10; i++) {
    // calculate distortion effect magnitude
    float d_scale = pow(length(d) / dist_radius, 8.);
    // pseudo sphere map
    d_scale = pow(1. - pow(d_scale / (d_scale + 1.), .25), .5);
    d = p - distortion * d_scale;
}

// calculate differentials, working backwards (i.e. what change in p would result from a change in d)
vec2 d_dx  = d + vec2(0.1, 0.0);
float d_dx_scale = pow(length(d_dx) / dist_radius, 8.);
d_dx_scale = pow(1. - pow(d_dx_scale / (d_dx_scale + 1.), .25), .5);
vec2 dx = (d_dx + distortion * d_dx_scale - p) / 0.1;

vec2 d_dy  = d + vec2(0.0, 0.1);
float d_dy_scale = pow(length(d_dy) / dist_radius, 8.);
d_dy_scale = pow(1. - pow(d_dy_scale / (d_dy_scale + 1.), .25), .5);
vec2 dy = (d_dy + distortion * d_dy_scale - p) / 0.1;

// center parts
float pupilrange = length(vec2(d.y, d.x + 6.*sign(d.x)));
vec2 pupilborder = 2.6*vec2(-d.y, (d.x + 6.*sign(d.x)) );
v += pupilborder * smoothstep(6.6, 6.8, pupilrange) * (1. - smoothstep(6.9, 7.1, pupilrange));

float range = length(d);
vec2 iris = 7.*d/sqrt(range);
v += iris * smoothstep(7.0, 7.5, pupilrange) * (1. - smoothstep(3.8, 4.0, range));

vec2 pupil = 1.*vec2(d.x+1.*sign(d.x), d.y);
v += pupil * (1. - smoothstep(6.6, 6.8, pupilrange));

// absolute parts
vec2 psign = sign(d);
vec2 a = abs(d);
vec2 vabs = vec2(0.0, 0.0);

float borderrange = length(vec2(d.x, d.y + 7.*sign(d.y)));
vec2 border = -1.5*vec2(a.y + 7.*sign(a.y) - 3./(a.y + 1.), -a.x + 3./(a.x + 1.));
vabs += border * smoothstep(10.8, 11.25, borderrange) * (1. - smoothstep(11.25, 11.7, borderrange)) * smoothstep(3.8, 4.1, range) * (a.y / (a.y + 1.));

vec2 irisborder = 5.*vec2(a.y, -a.x) * (a.y / (a.y + 3.))+ .2 * a;
vabs += irisborder * smoothstep(3.8, 4.25, range) * (1. - smoothstep(4.25, 4.7, range));

vec2 white = 12.*vec2(1.0, -0.2 * (a.y));
vabs += white * smoothstep(4.3, 4.5, range) * (1. - smoothstep(11., 11.3, borderrange));

v += vabs * psign;

// outside part
vec2 outside = d / pow(borderrange - 10., 2.);
v -= outside * smoothstep(11.3, 11.5, borderrange);

// velocity distortion mapping
v = v.x * dx + v.y * dy;

// color mapping
if (length(v) > 0.01) {
    v = normalize(v) * 10.;
}
v = v / (1. + 0.1 * (borderrange - 10.) * smoothstep(11.5, 12.5, borderrange));



  return v;
}`,particleCount:3e4},{name:"Combination of two fields. One follows cursor",timeStep:.01,fadeOut:.998,dropProbability:.009,colorMode:1,cx:0,cy:0,w:8.5398,h:8.5398,code:`// p.x and p.y are current coordinates
// v.x and v.y is a velocity at point p
vec2 get_velocity(vec2 p) {
  vec2 v = vec2(0., 0.);

  // change this to get a new vector field
  vec2 p1 = p - vec2(-2., 0.);
vec2 p2 = p - cursor.zw;

float l1 = length(p1), l2 = length(p2);

v = vec2(-p1.y, p1.x)/(l1 * l1) + vec2(-p2.y, p2.x)/(l2 * l2);

  return v;
}`},{name:"[Randomized] nice symmetry",timeStep:.01,fadeOut:.988,dropProbability:.008,colorMode:2,cx:-2.6390499999999992,cy:-1.1419499999999996,w:46.508700000000005,h:46.508700000000005,code:`// p.x and p.y are current coordinates
// v.x and v.y is a velocity at point p
vec2 get_velocity(vec2 p) {
  vec2 v = vec2(0., 0.);

  // change this to get a new vector field
  v.x = p.y/cos(length(p));
  v.y = max((log(p.y)+p.x),p.x);

  return v;
}`,particleCount:2e4},{name:"A city block from a parallel Universe (by @MananG_8)",timeStep:.01,fadeOut:.988,dropProbability:.008,colorMode:1,cx:.6165500000000002,cy:-1.87745,w:9.0455,h:9.0455,code:`// p.x and p.y are current coordinates
// v.x and v.y is a velocity at point p
vec2 get_velocity(vec2 p) {
  vec2 v = vec2(0., 0.);

  // change this to get a new vector field
  v.x = sin(tan(p.x))*cos(tan(p.y));
  v.y = sin(tan(p.y))*cos(tan(p.x));

  return v;
}
`,particleCount:2e4},{name:"♥ by @SAKrisT",timeStep:.01,fadeOut:.998,dropProbability:.009,colorMode:2,cx:-1.4246499999999997,cy:.92285,w:8.5397,h:8.5397,code:`// p.x and p.y are current coordinates
// v.x and v.y is a velocity at point p
vec2 get_velocity(vec2 p) {
  vec2 v = vec2(0., 0.);

  // change this to get a new vector field
  float size = 1.0;
  vec2 o = (p)/(1.6* size);
  float a = o.x*o.x+o.y*o.y-0.3;
  v = vec2(step(a*a*a, o.x*o.x*o.y*o.y*o.y));

  return v;
}
`},{name:"Dynamic vector field by Evgeniy Andreev. Not defined by physical system, but beautiful.",timeStep:.01,fadeOut:.998,dropProbability:.009,colorMode:3,cx:-1.6564499999999995,cy:-.36424999999999974,w:24.7317,h:24.7317,code:`// p.x and p.y are current coordinates
// v.x and v.y is a velocity at point p
vec2 get_velocity(vec2 p) {
  vec2 v = vec2(0., 0.);

  // change this to get a new vector field
  float dt = 0.01;
  float t = frame*dt;
  float w = 2.*PI/5.;
  float A = 2.;

  float d = sqrt(p.x*p.x + p.y*p.y);
  v.x = A*cos(w*t/d);
  v.y = A*sin(w*t/d);

  return v;
}`,particleCount:3e3},{name:"Behold (by /u/censored_username)",timeStep:.01,fadeOut:.988,dropProbability:.008,colorMode:2,cx:.12704999999999966,cy:.1923499999999998,w:22.5709,h:22.5709,code:`// p.x and p.y are current coordinates
// v.x and v.y is a velocity at point p
vec2 get_velocity(vec2 p) {
  vec2 v = vec2(0., 0.);

  // change this to get a new vector field
  float x = abs(p.x) - 5.;
  float side = sign(p.x);
  float range = length(vec2(x, p.y));
  float irisrange = length(vec2(x, p.y + 2.*sign(p.y)));

  vec2 border = 1.*vec2(p.y + 2.2*sign(p.y) * (p.y*p.y / (p.y*p.y + 0.01)), -x);

  vec2 outside = vec2(x / (1.+10./abs(p.x*p.x)), p.y);

  vec2 spiral = vec2(p.y, -x);

  vec2 iris = sin(-range * 10.) * spiral + 0.05*vec2(x, p.y);

  v += outside * (smoothstep(4.0, 4.5, irisrange)/range*5. - 5.*smoothstep(0.9, 0.7, range)/range);
  v += border * smoothstep(3.5, 4., irisrange) * smoothstep(4.5, 4., irisrange);
  v += iris * smoothstep(2.0, 1.5, range) * smoothstep(0.8, 1., range);
  v -= 10.0*spiral * smoothstep(1.0, 0.8, range) * smoothstep(0.7, 0.9, range);

  v.x *= side;
  v *= -1.;

  return v;
}`,particleCount:3e4},{name:"README 1",timeStep:.007,fadeOut:.998,dropProbability:.009,colorMode:1,cx:-1.275949999999999,cy:-1.6277,w:30.2937,h:30.2937,code:`// p.x and p.y are current coordinates
// v.x and v.y is a velocity at point p
vec2 get_velocity(vec2 p) {
  vec2 v = vec2(0., 0.);

  // change this to get a new vector field
  v.x = length(p)*min(sin(p.y),cos(p.x));
v.y = cos((p.y+p.y));


  return v;
}`},{name:"README 2",timeStep:.007,fadeOut:.998,dropProbability:.009,colorMode:1,cx:-1.275949999999999,cy:-1.62765,w:30.2937,h:30.2937,code:`// p.x and p.y are current coordinates
// v.x and v.y is a velocity at point p
vec2 get_velocity(vec2 p) {
  vec2 v = vec2(0., 0.);

  // change this to get a new vector field
  v.x = cos(p.y);
v.y = cos(p.x);


  return v;
}`},{name:"README 3",timeStep:.02,fadeOut:.998,dropProbability:.009,colorMode:1,cx:.21419999999999995,cy:-.7710999999999997,w:55.970200000000006,h:55.970200000000006,code:`// p.x and p.y are current coordinates
// v.x and v.y is a velocity at point p
vec2 get_velocity(vec2 p) {
  vec2 v = vec2(0., 0.);

  // change this to get a new vector field
  v.x = min(sin(exp(p.x)),sin(length(p)));
v.y = sin(p.x);


  return v;
}`},{name:"README 4",timeStep:.02,fadeOut:.998,dropProbability:.009,colorMode:1,cx:2.43185,cy:-1.1695,w:11.4385,h:11.4385,code:`// p.x and p.y are current coordinates
// v.x and v.y is a velocity at point p
vec2 get_velocity(vec2 p) {
  vec2 v = vec2(0., 0.);

  // change this to get a new vector field
  v.x = (p.y+cos(p.y));
v.y = sin(min(length(p),log((p.y+p.x))*p.x));


  return v;
}`},{name:"True Dipole",timeStep:.01,fadeOut:.998,dropProbability:.009,colorMode:1,cx:0,cy:0,w:8.5398,h:8.5398,code:`// p.x and p.y are current coordinates
// v.x and v.y is a velocity at point p
vec2 get_velocity(vec2 p) {
  vec2 v = vec2(0., 0.);

  // change this to get a new vector field
  float x = p.x;
float y = p.y;

// true dipole
v.x = 2.0*x*y;
v.y = y*y - x*x;

  return v;
}`},{name:"Flow profile of a sphere",timeStep:.011,fadeOut:.99999,dropProbability:.009,colorMode:1,cx:-.7177000000000002,cy:-.11769999999999992,w:11.434999999999999,h:11.434999999999999,code:`// p.x and p.y are current coordinates
// v.x and v.y is a velocity at point p
vec2 get_velocity(vec2 p) {
  vec2 v = vec2(0., 0.);

  // change this to get a new vector field
  float x = p.x;
float y = p.y;
float r = sqrt(x*x+y*y);
float sinth = y/r;
float costh = x/r;
float R = 1.;
float Uinf = 1.;
// radial flow
float ur = Uinf*(1.-1.5*R/r+0.5*R*R*R/(r*r*r))*costh;
// theta flow
float uth = Uinf*(-1.+0.75*R/r+0.25*R*R*R/(r*r*r))*sinth;
// to ux uy
v.x = costh*ur-sinth*uth;
v.y = sinth*ur+costh*uth;

  return v;
}`,particleCount:7e3},{name:"Best vortex",colorMode:2,cx:-6.158449999999998,cy:-.9834499999999995,w:96.8415,h:96.8415,code:`// p.x and p.y are current coordinates
// v.x and v.y is a velocity at point p
vec2 get_velocity(vec2 p) {
  vec2 v = vec2(0., 0.);

  // change this to get a new vector field
  float r = length(p);
float theta = atan(p.y, p.x);
v = vec2(p.y, -p.x) / r;
float t = sqrt(r * 10.) + theta + frame * .02;
v *= sin(t);
v *= length(v) * 10.;
v += p * .2;

  return v;
}`,timeStep:.01,fadeOut:.9,dropProbability:.009,particleCount:1e5},{name:"Black hole",timeStep:.01,fadeOut:.998,dropProbability:.009,colorMode:1,cx:-.47934999999999994,cy:.3591500000000001,w:8.5397,h:8.5397,code:`// p.x and p.y are current coordinates
// v.x and v.y is a velocity at point p
vec2 get_velocity(vec2 p) {
  vec2 v = vec2(0., 0.);

  // change this to get a new vector field
  float a = .1;
float r2 = p.x * p.x + p.y * p.y;
v = vec2(p.y, -p.x) / r2 - a * p;

  return v;
}`},{name:"Julia set",timeStep:.004,fadeOut:.998,dropProbability:.009,colorMode:1,cx:-.40235,cy:-.01795000000000002,w:5.0845,h:5.0845,code:`// p.x and p.y are current coordinates
// v.x and v.y is a velocity at point p
vec2 get_velocity(vec2 p) {
  vec2 v = vec2(0., 0.);

  // change this to get a new vector field
  vec2 c = p;
vec2 z = vec2(.4, .5);
for (int i = 0; i < 8; i++) {
   c = vec2(c.x * c.x - c.y * c.y, c.y * c.x + c.x * c.y);
   c += z;
}
v = c;


  return v;
}`,particleCount:1e4},{name:"Mandelbrot set",timeStep:.004,fadeOut:.998,dropProbability:.009,colorMode:3,cx:-.5678,cy:-.07015000000000005,w:4.9902,h:4.9902,code:`// p.x and p.y are current coordinates
// v.x and v.y is a velocity at point p
vec2 get_velocity(vec2 p) {
  vec2 v = vec2(0., 0.);

  // change this to get a new vector field
  vec2 z = p;
for(int k=0; k<50; k++) {
z = vec2(z.x * z.x - z.y * z.y, 2. * z.x * z.y) + p;
}

float mask = step(length(z), 2.);
v.x = -p.y/length(p) * (0.5 - mask);
v.y = p.x/length(p) * (0.5 - mask);




  return v;
}`,particleCount:3e4},{name:"Reflecting pool",timeStep:.01,fadeOut:.998,dropProbability:.009,colorMode:1,cx:0,cy:0,w:8.5398,h:8.5398,code:`// p.x and p.y are current coordinates
// v.x and v.y is a velocity at point p
vec2 get_velocity(vec2 p) {
  vec2 v = vec2(0., 0.);

  // change this to get a new vector field
  v.x = sin(5.0*p.y + p.x);
v.y = cos(5.0*p.x - p.y);

  return v;
}`},{name:"Shear zone",timeStep:.01,fadeOut:.998,dropProbability:.009,colorMode:1,cx:0,cy:0,w:8.539734222673566,h:8.539734222673566,code:`// p.x and p.y are current coordinates
// v.x and v.y is a velocity at point p
vec2 get_velocity(vec2 p) {
  vec2 v = vec2(0., 0.);

  // change this to get a new vector field
  float r = length(p) - 1.5;
float c = 1.0/(1.0+exp(-5.0*r));
float vx1 = -p.y,  // circle
      vy1 = p.x;
float vx2 = 0.2*p.x+p.y, // spiral
      vy2 = 0.2*p.y-p.x;
v.x = c*vx1 + (1.0-c)*vx2;
v.y = c*vy1 + (1.0-c)*vy2;


  return v;
}`},{name:"Beautiful field",timeStep:.01,fadeOut:.998,dropProbability:.009,colorMode:3,cx:-1.6564499999999995,cy:-.36424999999999974,w:24.7317,h:24.7317,code:`// p.x and p.y are current coordinates
// v.x and v.y is a velocity at point p
vec2 get_velocity(vec2 p) {
  vec2 v = vec2(0., 0.);

  // change this to get a new vector field
  float dt = 0.01;
float t = frame*dt;
float w = 2.*PI/5.;
float A = 2.;

float d = sqrt(p.x*p.x + p.y*p.y);
v.x = A*cos(w*t/d);
v.y = A*sin(w*t/d);

  return v;
}`,particleCount:3e3}];var Se=10,ut={POINT:Se,LENGTH:Se*.5,TRIGONOMETRY:Se*.9,ARITHMETICS:Se*.6,MINMAX:Se*.4,EXP:Se*.1,SIGN:Se*.01};class Sr{constructor(t){this.probability=0,this.className=t}getProbability(){return ut[this.className]}render(){return""}}class Ye extends Sr{constructor(t,r){super(r),this.operator=t}render(){var t=this.p,t=this.getProbability();ut[this.className]*=.25,ft();let r=lt();return ut[this.className]=t,ft(),this.operator(r)}}class Te extends Sr{constructor(t,r){super(r),this.operator=t}render(){var t=this.getProbability();ut[this.className]*=.25,ft();var r=lt(),n=lt();return ut[this.className]=t,ft(),this.operator(r,n)}}class tr extends Sr{constructor(t,r){super(r),this.constant=t}render(){return this.constant}}var Bt=[new tr("p.x","POINT"),new tr("p.y","POINT"),new tr("length(p)","LENGTH"),new Ye(e=>`sin(${e})`,"TRIGONOMETRY"),new Ye(e=>`cos(${e})`,"TRIGONOMETRY"),new Te((e,t)=>`${e}*${t}`,"ARITHMETICS"),new Te((e,t)=>`${e}/${t}`,"ARITHMETICS"),new Te((e,t)=>`(${e}+${t})`,"ARITHMETICS"),new Te((e,t)=>`(${e}-${t})`,"ARITHMETICS"),new Te((e,t)=>e===t?e:`min(${e},${t})`,"MINMAX"),new Te((e,t)=>e===t?e:`max(${e},${t})`,"MINMAX"),new Ye(e=>`log(${e})`,"EXP"),new Ye(e=>`exp(${e})`,"EXP"),new Te((e,t)=>`pow(${e}, ${t})`,"EXP"),new Ye(e=>`abs(${e})`,"SIGN"),new Ye(e=>`sign(${e})`,"SIGN")];function ft(){var e=0;Bt.forEach(t=>e+=t.getProbability()),Bt.forEach(t=>t.probability=t.getProbability()/e)}function lt(){for(var e=Math.random(),t=0,r,n=0;n<Bt.length&&(r=Bt[n],t+=r.probability,!(e<t));++n);if(!r)throw new Error("no more items");return r.render()}function zs(){ft();var e=lt(),t=lt();return`v.x = ${e};
  v.y = ${t};`}let po,It,ee,ur,rt;function Vs(e){ee=e;const t=M.getQS();rt=t.get("autosource"),["presets","generator","both"].includes(rt)||(rt&&console.error("unknown autosource param; options are presets, generator, or both"),rt="both");let r=t.get("autotime");if(!r){if(r=t.get("auto"),!r)return;console.warn("the auto param is deprecated; please use autotime")}let n=parseFloat(r);if(Number.isNaN(n)){console.error("malformed autotime param; not a number");return}return/ms$/i.test(r)||(/s$/i.test(r)?n*=1e3:/m$/i.test(r)?n*=1e3*60:/h$/i.test(r)&&(n*=1e3*60*60)),n<=500&&(console.warn("autotime param is too small; defaulting to 30 seconds"),n=3e4),po=n,vo({immediately:!0}),$s}function $s(){clearTimeout(ur),ur=0}function vo(e){e=e||{};let t=rt;if(t==="both"&&(t=Math.random()<.5?"presets":"generator"),t==="generator")ee.setParticlesCount(1e4),ee.vectorFieldEditorState.setCode(vr(zs()));else if(t==="presets"){(!It||!It.length)&&(It=ks(Us));const r=It.shift();ee.vectorFieldEditorState.setCode(r.code),Je(r.colorMode)&&ee.setColorMode(r.colorMode),Je(r.timeStep)&&ee.setIntegrationTimeStep(r.timeStep),Je(r.fadeOut)&&ee.setFadeOutSpeed(r.fadeOut),Je(r.dropProbability)&&ee.setDropProbability(r.dropProbability),Je(r.particleCount)&&ee.setParticlesCount(r.particleCount);const n=M.makeBBox(r.cx,r.cy,r.w,r.h);n&&(e.immediately?ee.applyBoundingBox(n):qs(n))}ur=setTimeout(vo,po)}function qs(e){const t=Object.assign({},ee.getBoundingBox()),r=3e3,n=Date.now(),o=e.minX-t.minX,a=e.maxX-t.maxX,i=e.minY-t.minY,s=e.maxY-t.maxY,c=function(){const l=(Date.now()-n)/r;if(l>=1){ee.applyBoundingBox(e);return}requestAnimationFrame(c);const f={minX:t.minX+o*l,maxX:t.maxX+a*l,minY:t.minY+i*l,maxY:t.maxY+s*l};ee.applyBoundingBox(f)};c()}function ks(e){const t=e.slice();for(let r=0;r<t.length;r++){const n=Math.floor(Math.random()*t.length),o=t[r];t[r]=t[n],t[n]=o}return t}function Je(e){return Number.isFinite(e)}var Tn=document.getElementById("scene");Tn&&js(Tn);lr(()=>import("./vueApp-CW4N62Qh.js"),__vite__mapDeps([0,1]),import.meta.url);function js(e){e.width=window.innerWidth,e.height=window.innerHeight;var t={antialiasing:!1},r=e.getContext("webgl",t)||e.getContext("experimental-webgl",t);if(r){window.webGLEnabled=!0;var n=Ys(r);n.start(),Vs(n),window.scene=n}else window.webGLEnabled=!1}var rr,me;window.startRecord=fr;window.isRecording=!1;function fr(e){if(!rr){lr(()=>import("./CCapture.all.min-D30alvaS.js").then(r=>r.C),[],import.meta.url).then(r=>{rr=r.default||r,window.stopRecord=Hs,fr(e)});return}if(me&&me.stop(),!Gs()){var t=document.createElement("script");t.setAttribute("src",e||"http://localhost:8080/ffmpegserver/ffmpegserver.js"),t.onload=()=>fr(e),document.head.appendChild(t);return}me=new rr({format:"ffmpegserver",framerate:60,verbose:!0,name:"fieldplay",extension:".mp4",codec:"mpeg4",ffmpegArguments:["-b:v","12M"]}),window.isRecording=!0,me.start(),U.fire("start-record",me)}function Gs(){return typeof FFMpegServer<"u"}function Hs(){window.isRecording=!1,U.fire("stop-record",me),me.stop(),me.save()}export{fc as $,Qs as A,yc as B,Z as C,pc as D,Da as E,Js as F,yr as G,ve as H,D as I,_r as J,Jn as K,eo as L,mc as M,Ba as N,wr as O,ct as P,Ie as Q,Ja as R,he as S,za as T,$e as U,ae as V,Ae as W,uc as X,ue as Y,cc as Z,Vn as _,re as a,U as a0,vr as a1,zs as a2,M as a3,Ka as a4,Zs as a5,dr as a6,Zi as a7,Ia as a8,pn as a9,te as b,it as c,ie as d,zn as e,ic as f,sc as g,Ks as h,Me as i,ec as j,gs as k,$a as l,vc as m,Ha as n,Ft as o,hc as p,Ws as q,Na as r,lc as s,tc as t,rc as u,ac as v,oc as w,nc as x,dc as y,Va as z};
//# sourceMappingURL=index-YF36ta8P.js.map
