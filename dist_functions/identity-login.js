!function(e,t){for(var r in t)e[r]=t[r]}(exports,function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=7)}([function(e,t){e.exports=require("stream")},function(e,t){e.exports=require("zlib")},function(e,t){e.exports=require("url")},function(e,t){e.exports=require("http")},function(e,t){e.exports=require("https")},function(e,t,r){"use strict";r.r(t),r.d(t,"Headers",(function(){return E})),r.d(t,"Request",(function(){return N})),r.d(t,"Response",(function(){return U})),r.d(t,"FetchError",(function(){return d}));var n=r(0),o=r(3),s=r(2),i=r(4),a=r(1);const u=n.Readable,l=Symbol("buffer"),c=Symbol("type");class f{constructor(){this[c]="";const e=arguments[0],t=arguments[1],r=[];let n=0;if(e){const t=e,o=Number(t.length);for(let e=0;e<o;e++){const o=t[e];let s;s=o instanceof Buffer?o:ArrayBuffer.isView(o)?Buffer.from(o.buffer,o.byteOffset,o.byteLength):o instanceof ArrayBuffer?Buffer.from(o):o instanceof f?o[l]:Buffer.from("string"==typeof o?o:String(o)),n+=s.length,r.push(s)}}this[l]=Buffer.concat(r);let o=t&&void 0!==t.type&&String(t.type).toLowerCase();o&&!/[^\u0020-\u007E]/.test(o)&&(this[c]=o)}get size(){return this[l].length}get type(){return this[c]}text(){return Promise.resolve(this[l].toString())}arrayBuffer(){const e=this[l],t=e.buffer.slice(e.byteOffset,e.byteOffset+e.byteLength);return Promise.resolve(t)}stream(){const e=new u;return e._read=function(){},e.push(this[l]),e.push(null),e}toString(){return"[object Blob]"}slice(){const e=this.size,t=arguments[0],r=arguments[1];let n,o;n=void 0===t?0:t<0?Math.max(e+t,0):Math.min(t,e),o=void 0===r?e:r<0?Math.max(e+r,0):Math.min(r,e);const s=Math.max(o-n,0),i=this[l].slice(n,n+s),a=new f([],{type:arguments[2]});return a[l]=i,a}}function d(e,t,r){Error.call(this,e),this.message=e,this.type=t,r&&(this.code=this.errno=r.code),Error.captureStackTrace(this,this.constructor)}let p;Object.defineProperties(f.prototype,{size:{enumerable:!0},type:{enumerable:!0},slice:{enumerable:!0}}),Object.defineProperty(f.prototype,Symbol.toStringTag,{value:"Blob",writable:!1,enumerable:!1,configurable:!0}),d.prototype=Object.create(Error.prototype),d.prototype.constructor=d,d.prototype.name="FetchError";try{p=require("encoding").convert}catch(e){}const h=Symbol("Body internals"),y=n.PassThrough;function b(e){var t=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=r.size;let s=void 0===o?0:o;var i=r.timeout;let a=void 0===i?0:i;null==e?e=null:g(e)?e=Buffer.from(e.toString()):w(e)||Buffer.isBuffer(e)||("[object ArrayBuffer]"===Object.prototype.toString.call(e)?e=Buffer.from(e):ArrayBuffer.isView(e)?e=Buffer.from(e.buffer,e.byteOffset,e.byteLength):e instanceof n||(e=Buffer.from(String(e)))),this[h]={body:e,disturbed:!1,error:null},this.size=s,this.timeout=a,e instanceof n&&e.on("error",(function(e){const r="AbortError"===e.name?e:new d(`Invalid response body while trying to fetch ${t.url}: ${e.message}`,"system",e);t[h].error=r}))}function m(){var e=this;if(this[h].disturbed)return b.Promise.reject(new TypeError("body used already for: "+this.url));if(this[h].disturbed=!0,this[h].error)return b.Promise.reject(this[h].error);let t=this.body;if(null===t)return b.Promise.resolve(Buffer.alloc(0));if(w(t)&&(t=t.stream()),Buffer.isBuffer(t))return b.Promise.resolve(t);if(!(t instanceof n))return b.Promise.resolve(Buffer.alloc(0));let r=[],o=0,s=!1;return new b.Promise((function(n,i){let a;e.timeout&&(a=setTimeout((function(){s=!0,i(new d(`Response timeout while trying to fetch ${e.url} (over ${e.timeout}ms)`,"body-timeout"))}),e.timeout)),t.on("error",(function(t){"AbortError"===t.name?(s=!0,i(t)):i(new d(`Invalid response body while trying to fetch ${e.url}: ${t.message}`,"system",t))})),t.on("data",(function(t){if(!s&&null!==t){if(e.size&&o+t.length>e.size)return s=!0,void i(new d(`content size at ${e.url} over limit: ${e.size}`,"max-size"));o+=t.length,r.push(t)}})),t.on("end",(function(){if(!s){clearTimeout(a);try{n(Buffer.concat(r,o))}catch(t){i(new d(`Could not create Buffer from response body for ${e.url}: ${t.message}`,"system",t))}}}))}))}function g(e){return"object"==typeof e&&"function"==typeof e.append&&"function"==typeof e.delete&&"function"==typeof e.get&&"function"==typeof e.getAll&&"function"==typeof e.has&&"function"==typeof e.set&&("URLSearchParams"===e.constructor.name||"[object URLSearchParams]"===Object.prototype.toString.call(e)||"function"==typeof e.sort)}function w(e){return"object"==typeof e&&"function"==typeof e.arrayBuffer&&"string"==typeof e.type&&"function"==typeof e.stream&&"function"==typeof e.constructor&&"string"==typeof e.constructor.name&&/^(Blob|File)$/.test(e.constructor.name)&&/^(Blob|File)$/.test(e[Symbol.toStringTag])}function v(e){let t,r,o=e.body;if(e.bodyUsed)throw new Error("cannot clone body after it is used");return o instanceof n&&"function"!=typeof o.getBoundary&&(t=new y,r=new y,o.pipe(t),o.pipe(r),e[h].body=t,o=r),o}function k(e){return null===e?null:"string"==typeof e?"text/plain;charset=UTF-8":g(e)?"application/x-www-form-urlencoded;charset=UTF-8":w(e)?e.type||null:Buffer.isBuffer(e)||"[object ArrayBuffer]"===Object.prototype.toString.call(e)||ArrayBuffer.isView(e)?null:"function"==typeof e.getBoundary?"multipart/form-data;boundary="+e.getBoundary():e instanceof n?null:"text/plain;charset=UTF-8"}function R(e){const t=e.body;return null===t?0:w(t)?t.size:Buffer.isBuffer(t)?t.length:t&&"function"==typeof t.getLengthSync&&(t._lengthRetrievers&&0==t._lengthRetrievers.length||t.hasKnownLength&&t.hasKnownLength())?t.getLengthSync():null}b.prototype={get body(){return this[h].body},get bodyUsed(){return this[h].disturbed},arrayBuffer(){return m.call(this).then((function(e){return e.buffer.slice(e.byteOffset,e.byteOffset+e.byteLength)}))},blob(){let e=this.headers&&this.headers.get("content-type")||"";return m.call(this).then((function(t){return Object.assign(new f([],{type:e.toLowerCase()}),{[l]:t})}))},json(){var e=this;return m.call(this).then((function(t){try{return JSON.parse(t.toString())}catch(t){return b.Promise.reject(new d(`invalid json response body at ${e.url} reason: ${t.message}`,"invalid-json"))}}))},text(){return m.call(this).then((function(e){return e.toString()}))},buffer(){return m.call(this)},textConverted(){var e=this;return m.call(this).then((function(t){return function(e,t){if("function"!=typeof p)throw new Error("The package `encoding` must be installed to use the textConverted() function");const r=t.get("content-type");let n,o,s="utf-8";r&&(n=/charset=([^;]*)/i.exec(r));o=e.slice(0,1024).toString(),!n&&o&&(n=/<meta.+?charset=(['"])(.+?)\1/i.exec(o));!n&&o&&(n=/<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(o),n||(n=/<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(o),n&&n.pop()),n&&(n=/charset=(.*)/i.exec(n.pop())));!n&&o&&(n=/<\?xml.+?encoding=(['"])(.+?)\1/i.exec(o));n&&(s=n.pop(),"gb2312"!==s&&"gbk"!==s||(s="gb18030"));return p(e,"UTF-8",s).toString()}(t,e.headers)}))}},Object.defineProperties(b.prototype,{body:{enumerable:!0},bodyUsed:{enumerable:!0},arrayBuffer:{enumerable:!0},blob:{enumerable:!0},json:{enumerable:!0},text:{enumerable:!0}}),b.mixIn=function(e){for(const t of Object.getOwnPropertyNames(b.prototype))if(!(t in e)){const r=Object.getOwnPropertyDescriptor(b.prototype,t);Object.defineProperty(e,t,r)}},b.Promise=global.Promise;const S=/[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/,j=/[^\t\x20-\x7e\x80-\xff]/;function T(e){if(e=""+e,S.test(e)||""===e)throw new TypeError(e+" is not a legal HTTP header name")}function O(e){if(e=""+e,j.test(e))throw new TypeError(e+" is not a legal HTTP header value")}function x(e,t){t=t.toLowerCase();for(const r in e)if(r.toLowerCase()===t)return r}const P=Symbol("map");class E{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0;if(this[P]=Object.create(null),e instanceof E){const t=e.raw(),r=Object.keys(t);for(const e of r)for(const r of t[e])this.append(e,r)}else if(null==e);else{if("object"!=typeof e)throw new TypeError("Provided initializer must be an object");{const t=e[Symbol.iterator];if(null!=t){if("function"!=typeof t)throw new TypeError("Header pairs must be iterable");const r=[];for(const t of e){if("object"!=typeof t||"function"!=typeof t[Symbol.iterator])throw new TypeError("Each header pair must be iterable");r.push(Array.from(t))}for(const e of r){if(2!==e.length)throw new TypeError("Each header pair must be a name/value tuple");this.append(e[0],e[1])}}else for(const t of Object.keys(e)){const r=e[t];this.append(t,r)}}}}get(e){T(e=""+e);const t=x(this[P],e);return void 0===t?null:this[P][t].join(", ")}forEach(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,r=B(this),n=0;for(;n<r.length;){var o=r[n];const s=o[0],i=o[1];e.call(t,i,s,this),r=B(this),n++}}set(e,t){t=""+t,T(e=""+e),O(t);const r=x(this[P],e);this[P][void 0!==r?r:e]=[t]}append(e,t){t=""+t,T(e=""+e),O(t);const r=x(this[P],e);void 0!==r?this[P][r].push(t):this[P][e]=[t]}has(e){return T(e=""+e),void 0!==x(this[P],e)}delete(e){T(e=""+e);const t=x(this[P],e);void 0!==t&&delete this[P][t]}raw(){return this[P]}keys(){return A(this,"key")}values(){return A(this,"value")}[Symbol.iterator](){return A(this,"key+value")}}function B(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"key+value";const r=Object.keys(e[P]).sort();return r.map("key"===t?function(e){return e.toLowerCase()}:"value"===t?function(t){return e[P][t].join(", ")}:function(t){return[t.toLowerCase(),e[P][t].join(", ")]})}E.prototype.entries=E.prototype[Symbol.iterator],Object.defineProperty(E.prototype,Symbol.toStringTag,{value:"Headers",writable:!1,enumerable:!1,configurable:!0}),Object.defineProperties(E.prototype,{get:{enumerable:!0},forEach:{enumerable:!0},set:{enumerable:!0},append:{enumerable:!0},has:{enumerable:!0},delete:{enumerable:!0},keys:{enumerable:!0},values:{enumerable:!0},entries:{enumerable:!0}});const C=Symbol("internal");function A(e,t){const r=Object.create(z);return r[C]={target:e,kind:t,index:0},r}const z=Object.setPrototypeOf({next(){if(!this||Object.getPrototypeOf(this)!==z)throw new TypeError("Value of `this` is not a HeadersIterator");var e=this[C];const t=e.target,r=e.kind,n=e.index,o=B(t,r);return n>=o.length?{value:void 0,done:!0}:(this[C].index=n+1,{value:o[n],done:!1})}},Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));function L(e){const t=Object.assign({__proto__:null},e[P]),r=x(e[P],"Host");return void 0!==r&&(t[r]=t[r][0]),t}Object.defineProperty(z,Symbol.toStringTag,{value:"HeadersIterator",writable:!1,enumerable:!1,configurable:!0});const _=Symbol("Response internals"),q=o.STATUS_CODES;class U{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};b.call(this,e,t);const r=t.status||200,n=new E(t.headers);if(null!=e&&!n.has("Content-Type")){const t=k(e);t&&n.append("Content-Type",t)}this[_]={url:t.url,status:r,statusText:t.statusText||q[r],headers:n,counter:t.counter}}get url(){return this[_].url||""}get status(){return this[_].status}get ok(){return this[_].status>=200&&this[_].status<300}get redirected(){return this[_].counter>0}get statusText(){return this[_].statusText}get headers(){return this[_].headers}clone(){return new U(v(this),{url:this.url,status:this.status,statusText:this.statusText,headers:this.headers,ok:this.ok,redirected:this.redirected})}}b.mixIn(U.prototype),Object.defineProperties(U.prototype,{url:{enumerable:!0},status:{enumerable:!0},ok:{enumerable:!0},redirected:{enumerable:!0},statusText:{enumerable:!0},headers:{enumerable:!0},clone:{enumerable:!0}}),Object.defineProperty(U.prototype,Symbol.toStringTag,{value:"Response",writable:!1,enumerable:!1,configurable:!0});const M=Symbol("Request internals"),$=s.parse,H=s.format,F="destroy"in n.Readable.prototype;function I(e){return"object"==typeof e&&"object"==typeof e[M]}class N{constructor(e){let t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};I(e)?t=$(e.url):(t=e&&e.href?$(e.href):$(""+e),e={});let n=r.method||e.method||"GET";if(n=n.toUpperCase(),(null!=r.body||I(e)&&null!==e.body)&&("GET"===n||"HEAD"===n))throw new TypeError("Request with GET/HEAD method cannot have body");let o=null!=r.body?r.body:I(e)&&null!==e.body?v(e):null;b.call(this,o,{timeout:r.timeout||e.timeout||0,size:r.size||e.size||0});const s=new E(r.headers||e.headers||{});if(null!=o&&!s.has("Content-Type")){const e=k(o);e&&s.append("Content-Type",e)}let i=I(e)?e.signal:null;if("signal"in r&&(i=r.signal),null!=i&&!function(e){const t=e&&"object"==typeof e&&Object.getPrototypeOf(e);return!(!t||"AbortSignal"!==t.constructor.name)}(i))throw new TypeError("Expected signal to be an instanceof AbortSignal");this[M]={method:n,redirect:r.redirect||e.redirect||"follow",headers:s,parsedURL:t,signal:i},this.follow=void 0!==r.follow?r.follow:void 0!==e.follow?e.follow:20,this.compress=void 0!==r.compress?r.compress:void 0===e.compress||e.compress,this.counter=r.counter||e.counter||0,this.agent=r.agent||e.agent}get method(){return this[M].method}get url(){return H(this[M].parsedURL)}get headers(){return this[M].headers}get redirect(){return this[M].redirect}get signal(){return this[M].signal}clone(){return new N(this)}}function D(e){Error.call(this,e),this.type="aborted",this.message=e,Error.captureStackTrace(this,this.constructor)}b.mixIn(N.prototype),Object.defineProperty(N.prototype,Symbol.toStringTag,{value:"Request",writable:!1,enumerable:!1,configurable:!0}),Object.defineProperties(N.prototype,{method:{enumerable:!0},url:{enumerable:!0},headers:{enumerable:!0},redirect:{enumerable:!0},clone:{enumerable:!0},signal:{enumerable:!0}}),D.prototype=Object.create(Error.prototype),D.prototype.constructor=D,D.prototype.name="AbortError";const G=n.PassThrough,J=s.resolve;function V(e,t){if(!V.Promise)throw new Error("native promise missing, set fetch.Promise to your favorite alternative");return b.Promise=V.Promise,new V.Promise((function(r,s){const u=new N(e,t),l=function(e){const t=e[M].parsedURL,r=new E(e[M].headers);if(r.has("Accept")||r.set("Accept","*/*"),!t.protocol||!t.hostname)throw new TypeError("Only absolute URLs are supported");if(!/^https?:$/.test(t.protocol))throw new TypeError("Only HTTP(S) protocols are supported");if(e.signal&&e.body instanceof n.Readable&&!F)throw new Error("Cancellation of streamed requests with AbortSignal is not supported in node < 8");let o=null;if(null==e.body&&/^(POST|PUT)$/i.test(e.method)&&(o="0"),null!=e.body){const t=R(e);"number"==typeof t&&(o=String(t))}o&&r.set("Content-Length",o),r.has("User-Agent")||r.set("User-Agent","node-fetch/1.0 (+https://github.com/bitinn/node-fetch)"),e.compress&&!r.has("Accept-Encoding")&&r.set("Accept-Encoding","gzip,deflate");let s=e.agent;return"function"==typeof s&&(s=s(t)),r.has("Connection")||s||r.set("Connection","close"),Object.assign({},t,{method:e.method,headers:L(r),agent:s})}(u),c=("https:"===l.protocol?i:o).request,f=u.signal;let p=null;const h=function(){let e=new D("The user aborted a request.");s(e),u.body&&u.body instanceof n.Readable&&u.body.destroy(e),p&&p.body&&p.body.emit("error",e)};if(f&&f.aborted)return void h();const y=function(){h(),g()},b=c(l);let m;function g(){b.abort(),f&&f.removeEventListener("abort",y),clearTimeout(m)}f&&f.addEventListener("abort",y),u.timeout&&b.once("socket",(function(e){m=setTimeout((function(){s(new d("network timeout at: "+u.url,"request-timeout")),g()}),u.timeout)})),b.on("error",(function(e){s(new d(`request to ${u.url} failed, reason: ${e.message}`,"system",e)),g()})),b.on("response",(function(e){clearTimeout(m);const t=function(e){const t=new E;for(const r of Object.keys(e))if(!S.test(r))if(Array.isArray(e[r]))for(const n of e[r])j.test(n)||(void 0===t[P][r]?t[P][r]=[n]:t[P][r].push(n));else j.test(e[r])||(t[P][r]=[e[r]]);return t}(e.headers);if(V.isRedirect(e.statusCode)){const n=t.get("Location"),o=null===n?null:J(u.url,n);switch(u.redirect){case"error":return s(new d("uri requested responds with a redirect, redirect mode is set to error: "+u.url,"no-redirect")),void g();case"manual":if(null!==o)try{t.set("Location",o)}catch(e){s(e)}break;case"follow":if(null===o)break;if(u.counter>=u.follow)return s(new d("maximum redirect reached at: "+u.url,"max-redirect")),void g();const n={headers:new E(u.headers),follow:u.follow,counter:u.counter+1,agent:u.agent,compress:u.compress,method:u.method,body:u.body,signal:u.signal,timeout:u.timeout,size:u.size};return 303!==e.statusCode&&u.body&&null===R(u)?(s(new d("Cannot follow redirect with body being a readable stream","unsupported-redirect")),void g()):(303!==e.statusCode&&(301!==e.statusCode&&302!==e.statusCode||"POST"!==u.method)||(n.method="GET",n.body=void 0,n.headers.delete("content-length")),r(V(new N(o,n))),void g())}}e.once("end",(function(){f&&f.removeEventListener("abort",y)}));let n=e.pipe(new G);const o={url:u.url,status:e.statusCode,statusText:e.statusMessage,headers:t,size:u.size,timeout:u.timeout,counter:u.counter},i=t.get("Content-Encoding");if(!u.compress||"HEAD"===u.method||null===i||204===e.statusCode||304===e.statusCode)return p=new U(n,o),void r(p);const l={flush:a.Z_SYNC_FLUSH,finishFlush:a.Z_SYNC_FLUSH};if("gzip"==i||"x-gzip"==i)return n=n.pipe(a.createGunzip(l)),p=new U(n,o),void r(p);if("deflate"!=i&&"x-deflate"!=i){if("br"==i&&"function"==typeof a.createBrotliDecompress)return n=n.pipe(a.createBrotliDecompress()),p=new U(n,o),void r(p);p=new U(n,o),r(p)}else{e.pipe(new G).once("data",(function(e){n=8==(15&e[0])?n.pipe(a.createInflate()):n.pipe(a.createInflateRaw()),p=new U(n,o),r(p)}))}})),function(e,t){const r=t.body;null===r?e.end():w(r)?r.stream().pipe(e):Buffer.isBuffer(r)?(e.write(r),e.end()):r.pipe(e)}(b,u)}))}V.isRedirect=function(e){return 301===e||302===e||303===e||307===e||308===e},V.Promise=global.Promise,t.default=V},,function(e,t,r){const n=r(5).default;e.exports={handler:async(e,t)=>{try{const r=JSON.parse(e.body).user,o=t.clientContext.identity.url+"/admin/users";let s=await(await n(o,{method:"GET",headers:{Authorization:"Bearer "+t.clientContext.identity.token}})).json();if(!s.users)throw Error("Error while trying to source users - likely insufficient authentication");let i={},a=r.user_metadata.profile;for(let e of s.users){if(!e.user_metadata||!e.user_metadata.listing||e.email==r.email)continue;let t=e.user_metadata.profile,n=0;for(let e in t.prefsAbs)if(n+=1*(a.prefsAbs[e].you<t.prefsAbs[e].me),n+=1*(a.prefsAbs[e].me>t.prefsAbs[e].you),n>0)break;if(n>0)continue;if("n"!=t.prefsRanked.lgbtq||"n"!=a.prefsRanked.lgbtq||t.prefsRanked.genderinclusive&&"n"!=t.prefsRanked.genderinclusive&&"n"!=a.prefsRanked.genderinclusive?"y"==t.prefsRanked.lgbtq&&"y"==a.prefsRanked.lgbtq?"1"==t.prefsRanked.lgbtqpref&&"1"==a.prefsRanked.lgbtqpref||(n+=Math.abs(t.prefsRanked.pronouns-a.prefsRanked.pronouns)):"r"==t.prefsRanked.lgbtq&&"r"==a.prefsRanked.lgbtq||(n+=1):n+=Math.abs(t.prefsRanked.pronouns-a.prefsRanked.pronouns),n>0)continue;let o=0;o+=10*(t.prefsRanked.state==a.prefsRanked.state||t.prefsRanked.country==a.prefsRanked.country&&"United States"!=t.prefsRanked.country),o+=10*(t.prefsRanked.major==a.prefsRanked.major),o+=10*(t.prefsRanked.sport==a.prefsRanked.sport),o+=3*t.prefsRanked.interests.filter(e=>a.prefsRanked.interests.includes(e)).length;let s=0;0!=t.prefsRanked.ideology.rank&&0!=a.prefsRanked.ideology.rank&&(s=Math.abs(t.prefsRanked.ideology.rank*t.prefsRanked.ideology.al-a.prefsRanked.ideology.rank*a.prefsRanked.ideology.al)+Math.abs(t.prefsRanked.ideology.rank*t.prefsRanked.ideology.lr-a.prefsRanked.ideology.rank*a.prefsRanked.ideology.lr)),o-=10*s,o+=10*(t.prefsRanked.location==a.prefsRanked.location||.5*("Unsure"==t.prefsRanked.location)||.5*("Unsure"==a.prefsRanked.location)),o+=10*(t.prefsRanked.hall==a.prefsRanked.hall||.5*("Unsure"==t.prefsRanked.hall)||.5*("Unsure"==a.prefsRanked.hall));let u=0;for(let e in t.prefsMinimized)u+=10*Math.abs(t.prefsMinimized[e]-a.prefsMinimized[e]);let l=Math.round(100*(u+o)/207);console.log("User",e.email),console.log("Score",l),i[l]||(i[l]=[]),"y"==e.user_metadata.listing.public?i[l].push(e.user_metadata):i[l].push({listing:e.user_metadata.listing})}let u=[],l=Object.keys(i);l=l.slice(0,Math.min(25,l.length)).sort().reverse();let c=0;for(;u.length<25&&c<l.length;){for(let e of i[l[c]])e.listing.score=Math.min(l[c]+20,100),u.push(e);c++}return console.log("Returning top users: ",u),{statusCode:200,body:JSON.stringify({app_metadata:{success:!0,users:u}})}}catch(e){return console.log("Error",e),{statusCode:200,body:JSON.stringify({app_metadata:{success:!1,err:e}})}}}}}]));