var Z=Object.defineProperty,$=(m,c,_)=>c in m?Z(m,c,{enumerable:!0,configurable:!0,writable:!0,value:_}):m[c]=_,d=(m,c,_)=>($(m,typeof c!="symbol"?c+"":c,_),_);(function(){"use strict";function m(t,e){var n=c(t),a=n.tag,o=n.id,r=n.className,i=e?document.createElementNS(e,a):document.createElement(a);return o&&(i.id=o),r&&(e?i.setAttribute("class",r):i.className=r),i}function c(t){for(var e=t.split(/([.#])/),n="",a="",o=1;o<e.length;o+=2)switch(e[o]){case".":n+=" "+e[o+1];break;case"#":a=e[o+1]}return{className:n.trim(),tag:e[0]||"div",id:a}}function _(t,e,n){var a=e.__redom_lifecycle;if(N(a)){e.__redom_lifecycle={};return}var o=n;for(e.__redom_mounted&&v(e,"onunmount");o;){var r=o.__redom_lifecycle||{};for(var i in a)r[i]&&(r[i]-=a[i]);N(r)&&(o.__redom_lifecycle=null),o=o.parentNode}}function N(t){if(t==null)return!0;for(var e in t)if(t[e])return!1;return!0}var L=["onmount","onremount","onunmount"],O=typeof window<"u"&&"ShadowRoot"in window;function q(t,e,n,a){var o=u(t),r=u(e);e===r&&r.__redom_view&&(e=r.__redom_view),e!==r&&(r.__redom_view=e);var i=r.__redom_mounted,s=r.parentNode;if(i&&s!==o&&_(e,r,s),n!=null)if(a){var f=u(n);f.__redom_mounted&&v(f,"onunmount"),o.replaceChild(r,f)}else o.insertBefore(r,u(n));else o.appendChild(r);return P(e,r,o,s),e}function v(t,e){e==="onmount"||e==="onremount"?t.__redom_mounted=!0:e==="onunmount"&&(t.__redom_mounted=!1);var n=t.__redom_lifecycle;if(n){var a=t.__redom_view,o=0;a&&a[e]&&a[e]();for(var r in n)r&&o++;if(o)for(var i=t.firstChild;i;){var s=i.nextSibling;v(i,e),i=s}}}function P(t,e,n,a){for(var o=e.__redom_lifecycle||(e.__redom_lifecycle={}),r=n===a,i=!1,s=0,f=L;s<f.length;s+=1){var p=f[s];r||t!==e&&p in t&&(o[p]=(o[p]||0)+1),o[p]&&(i=!0)}if(!i){e.__redom_lifecycle={};return}var l=n,b=!1;for((r||l&&l.__redom_mounted)&&(v(e,r?"onremount":"onmount"),b=!0);l;){var w=l.parentNode,j=l.__redom_lifecycle||(l.__redom_lifecycle={});for(var g in o)j[g]=(j[g]||0)+o[g];if(b)break;(l.nodeType===Node.DOCUMENT_NODE||O&&l instanceof ShadowRoot||w&&w.__redom_mounted)&&(v(l,r?"onremount":"onmount"),b=!0),l=w}}function D(t,e,n){var a=u(t);if(typeof e=="object")for(var o in e)E(a,o,e[o]);else E(a,e,n)}function E(t,e,n){t.style[e]=n??""}var C="http://www.w3.org/1999/xlink";function S(t,e,n,a){var o=u(t),r=typeof e=="object";if(r)for(var i in e)S(o,i,e[i],a);else{var s=o instanceof SVGElement,f=typeof n=="function";if(e==="style"&&typeof n=="object")D(o,n);else if(s&&f)o[e]=n;else if(e==="dataset")k(o,n);else if(!s&&(e in o||f)&&e!=="list")o[e]=n;else{if(s&&e==="xlink"){T(o,n);return}a&&e==="class"&&(n=o.className+" "+n),n==null?o.removeAttribute(e):o.setAttribute(e,n)}}}function T(t,e,n){if(typeof e=="object")for(var a in e)T(t,a,e[a]);else n!=null?t.setAttributeNS(C,e,n):t.removeAttributeNS(C,e,n)}function k(t,e,n){if(typeof e=="object")for(var a in e)k(t,a,e[a]);else n!=null?t.dataset[e]=n:delete t.dataset[e]}function R(t){return document.createTextNode(t??"")}function x(t,e,n){for(var a=0,o=e;a<o.length;a+=1){var r=o[a];if(!(r!==0&&!r)){var i=typeof r;i==="function"?r(t):i==="string"||i==="number"?t.appendChild(R(r)):U(u(r))?q(t,r):r.length?x(t,r,n):i==="object"&&S(t,r,null,n)}}}function u(t){return t.nodeType&&t||!t.el&&t||u(t.el)}function U(t){return t&&t.nodeType}function h(t){for(var e=[],n=arguments.length-1;n-- >0;)e[n]=arguments[n+1];var a,o=typeof t;if(o==="string")a=m(t);else if(o==="function"){var r=t;a=new(Function.prototype.bind.apply(r,[null].concat(e)))}else throw new Error("At least one argument required");return x(u(a),e,!0),a}var A=h;h.extend=function(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];return h.bind.apply(h,[this].concat(t))};async function z(){return new Promise(t=>{document.readyState=="loading"?document.addEventListener("DOMContentLoaded",()=>t(),{once:!0}):t()})}const I=["GET","POST","PUT","PATCH","DELETE"];class G{constructor(e,n){d(this,"get"),d(this,"post"),d(this,"put"),d(this,"patch"),d(this,"delete"),this.baseURL=e,this.baseInit=n;for(const a of I)this[a.toLowerCase()]=(o,r)=>this.request(o,{...r,method:a})}async request(e,n){var a;const o=new URL(e,this.baseURL),r=F((a=this.baseInit)==null?void 0:a.headers,n.headers);return await H(o,{...this.baseInit,...n,headers:r})}}async function H(...t){const e=await fetch(...t),n=await e.json();if(e.ok)return n;throw new M({response:e,data:n})}class M extends Error{constructor({response:e,data:n}){super(e.statusText),d(this,"response"),d(this,"data"),this.name="FetcherError",this.response=e,this.data=n}}function F(...t){const e={};for(const n of t){const a=new Headers(n);for(const[o,r]of a.entries())r==null?delete e[o]:e[o]=r}return new Headers(e)}const y=new G("http://localhost:5050/api/",{headers:{"Content-Type":"application/json",Authorization:GM_getValue("API_TOKEN")}});async function V(){return await y.get("emotes")}async function B(t,e){return await y.put("emote",{body:JSON.stringify({name:t,url:e})})}async function J(t){return await y.delete(`emote/${t}`)}function K(t){var e;if(/^https:\/\/www.frankerfacez.com\/emoticon\/(\d+)/.test(location.href)){const n=document.querySelector("#emoticon").textContent.split(" ")[0],a=t.find(s=>s.name===n),o=A("a",{textContent:"[ChatEmotes] Add Emote",className:"btn btn-large btn-success",style:{marginLeft:"1rem",display:a?"none":"initial"},href:"#",onclick:s=>{s.preventDefault(),B(n,location.href).then(()=>{o.style.display="none",r.style.display="initial"}).catch(console.error)}}),r=A("a",{textContent:"[ChatEmotes] Delete Emote",className:"btn btn-large btn-danger",style:{marginLeft:"1rem",display:a?"initial":"none"},href:"#",onclick:s=>{s.preventDefault(),J(n).then(()=>{r.style.display="none",o.style.display="initial"}).catch(console.error)}}),i=(e=document.querySelector(".btn-success"))!=null?e:document.querySelector(".btn-danger");i&&i.after(o,r)}}async function X(){const t=await V();switch(location.hostname){case"7tv.app":console.log("7tv provider loaded");break;case"betterttv.com":console.log("bttv provider loaded");break;case"www.frankerfacez.com":console.log("ffz provider loaded"),K(t);break}}z().then(()=>X())})();
