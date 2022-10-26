var Y=Object.defineProperty,Q=(h,m,v)=>m in h?Y(h,m,{enumerable:!0,configurable:!0,writable:!0,value:v}):h[m]=v,c=(h,m,v)=>(Q(h,typeof m!="symbol"?m+"":m,v),v);(function(){"use strict";function h(n,e){var t=m(n),r=t.tag,o=t.id,i=t.className,s=e?document.createElementNS(e,r):document.createElement(r);return o&&(s.id=o),i&&(e?s.setAttribute("class",i):s.className=i),s}function m(n){for(var e=n.split(/([.#])/),t="",r="",o=1;o<e.length;o+=2)switch(e[o]){case".":t+=" "+e[o+1];break;case"#":r=e[o+1]}return{className:t.trim(),tag:e[0]||"div",id:r}}function v(n,e,t){var r=e.__redom_lifecycle;if(k(r)){e.__redom_lifecycle={};return}var o=t;for(e.__redom_mounted&&p(e,"onunmount");o;){var i=o.__redom_lifecycle||{};for(var s in r)i[s]&&(i[s]-=r[s]);k(i)&&(o.__redom_lifecycle=null),o=o.parentNode}}function k(n){if(n==null)return!0;for(var e in n)if(n[e])return!1;return!0}var j=["onmount","onremount","onunmount"],z=typeof window<"u"&&"ShadowRoot"in window;function I(n,e,t,r){var o=f(n),i=f(e);e===i&&i.__redom_view&&(e=i.__redom_view),e!==i&&(i.__redom_view=e);var s=i.__redom_mounted,a=i.parentNode;if(s&&a!==o&&v(e,i,a),t!=null)if(r){var l=f(t);l.__redom_mounted&&p(l,"onunmount"),o.replaceChild(i,l)}else o.insertBefore(i,f(t));else o.appendChild(i);return O(e,i,o,a),e}function p(n,e){e==="onmount"||e==="onremount"?n.__redom_mounted=!0:e==="onunmount"&&(n.__redom_mounted=!1);var t=n.__redom_lifecycle;if(t){var r=n.__redom_view,o=0;r&&r[e]&&r[e]();for(var i in t)i&&o++;if(o)for(var s=n.firstChild;s;){var a=s.nextSibling;p(s,e),s=a}}}function O(n,e,t,r){for(var o=e.__redom_lifecycle||(e.__redom_lifecycle={}),i=t===r,s=!1,a=0,l=j;a<l.length;a+=1){var _=l[a];i||n!==e&&_ in n&&(o[_]=(o[_]||0)+1),o[_]&&(s=!0)}if(!s){e.__redom_lifecycle={};return}var u=t,w=!1;for((i||u&&u.__redom_mounted)&&(p(e,i?"onremount":"onmount"),w=!0);u;){var E=u.parentNode,L=u.__redom_lifecycle||(u.__redom_lifecycle={});for(var N in o)L[N]=(L[N]||0)+o[N];if(w)break;(u.nodeType===Node.DOCUMENT_NODE||z&&u instanceof ShadowRoot||E&&E.__redom_mounted)&&(p(u,i?"onremount":"onmount"),w=!0),u=E}}function U(n,e,t){var r=f(n);if(typeof e=="object")for(var o in e)A(r,o,e[o]);else A(r,e,t)}function A(n,e,t){n.style[e]=t??""}var S="http://www.w3.org/1999/xlink";function T(n,e,t,r){var o=f(n),i=typeof e=="object";if(i)for(var s in e)T(o,s,e[s],r);else{var a=o instanceof SVGElement,l=typeof t=="function";if(e==="style"&&typeof t=="object")U(o,t);else if(a&&l)o[e]=t;else if(e==="dataset")P(o,t);else if(!a&&(e in o||l)&&e!=="list")o[e]=t;else{if(a&&e==="xlink"){C(o,t);return}r&&e==="class"&&(t=o.className+" "+t),t==null?o.removeAttribute(e):o.setAttribute(e,t)}}}function C(n,e,t){if(typeof e=="object")for(var r in e)C(n,r,e[r]);else t!=null?n.setAttributeNS(S,e,t):n.removeAttributeNS(S,e,t)}function P(n,e,t){if(typeof e=="object")for(var r in e)P(n,r,e[r]);else t!=null?n.dataset[e]=t:delete n.dataset[e]}function R(n){return document.createTextNode(n??"")}function B(n,e,t){for(var r=0,o=e;r<o.length;r+=1){var i=o[r];if(!(i!==0&&!i)){var s=typeof i;s==="function"?i(n):s==="string"||s==="number"?n.appendChild(R(i)):G(f(i))?I(n,i):i.length?B(n,i,t):s==="object"&&T(n,i,null,t)}}}function f(n){return n.nodeType&&n||!n.el&&n||f(n.el)}function G(n){return n&&n.nodeType}function y(n){for(var e=[],t=arguments.length-1;t-- >0;)e[t]=arguments[t+1];var r,o=typeof n;if(o==="string")r=h(n);else if(o==="function"){var i=n;r=new(Function.prototype.bind.apply(i,[null].concat(e)))}else throw new Error("At least one argument required");return B(f(r),e,!0),r}var d=y;y.extend=function(){for(var n=[],e=arguments.length;e--;)n[e]=arguments[e];return y.bind.apply(y,[this].concat(n))};async function M(){return new Promise(n=>{document.readyState=="loading"?document.addEventListener("DOMContentLoaded",()=>n(),{once:!0}):n()})}const $=["GET","POST","PUT","PATCH","DELETE"];class H{constructor(e,t){c(this,"get"),c(this,"post"),c(this,"put"),c(this,"patch"),c(this,"delete"),this.baseURL=e,this.baseInit=t;for(const r of $)this[r.toLowerCase()]=(o,i)=>this.request(o,{...i,method:r})}async request(e,t){var r;const o=new URL(e,this.baseURL),i=J((r=this.baseInit)==null?void 0:r.headers,t.headers);return await F(o,{...this.baseInit,...t,headers:i})}}async function F(...n){const e=await fetch(...n),t=await e.json();if(e.ok)return t;throw new V({response:e,data:t})}class V extends Error{constructor({response:e,data:t}){super(e.statusText),c(this,"response"),c(this,"data"),this.name="FetcherError",this.response=e,this.data=t}}function J(...n){const e={};for(const t of n){const r=new Headers(t);for(const[o,i]of r.entries())i==null?delete e[o]:e[o]=i}return new Headers(e)}const q="https://vchcode-emotes.satont.dev/api/",g=new H(q,{headers:{"Content-Type":"application/json",Authorization:GM_getValue("API_TOKEN")}});async function K(){return await g.get("emotes")}async function x(n,e){return await g.put("emote",{body:JSON.stringify({name:n,url:e})})}async function D(n){return await g.delete(`emote/${n}`)}class b{constructor(e){c(this,"emote"),c(this,"emoteNames"),c(this,"isAdded",!1),c(this,"pathnames",["submissions","emoticons","channel","emoticon"]),c(this,"addEmoteButton"),c(this,"delEmoteButton"),c(this,"emoticonThead"),c(this,"emoticonTbodyLight"),c(this,"emoticonTbodyDark"),c(this,"emoticonPreview"),this.emotes=e,this.emoteNames=this.emotes.map(t=>t.name),this.render()}static init(e){return new b(e)}render(){const e=location.pathname.split("/").filter(Boolean),t=this.pathnames.find(r=>e.includes(r));if(t)switch(t){case"submissions":case"emoticons":case"channel":this.renderPanel();break;case"emoticon":this.parseEmoteInfo(),this.renderEmoteButtons(),this.renderEmotePreview()}}toggleAdded(){this.isAdded=!this.isAdded}toggleEmoticonUI(){this.toggleAdded(),this.toggleButtons(),this.renderEmotePreview()}toggleButtons(){this.addEmoteButton.style.display=this.isAdded?"none":"initial",this.delEmoteButton.style.display=this.isAdded?"initial":"none"}renderEmoteButtons(){var e;this.addEmoteButton=d("a",{textContent:"[ChatEmotes] Add",className:"btn btn-large btn-success ffz-button",href:"#",onclick:r=>{r.preventDefault(),x(this.emote.name,this.emote.url).then(()=>this.toggleEmoticonUI()).catch(console.error)}}),this.delEmoteButton=d("a",{textContent:"[ChatEmotes] Delete",className:"btn btn-large btn-danger ffz-button",href:"#",onclick:r=>{r.preventDefault(),D(this.emote.name).then(()=>this.toggleEmoticonUI()).catch(console.error)}});const t=(e=document.querySelector(".btn-success"))!=null?e:document.querySelector(".btn-danger");t&&(this.toggleButtons(),t.after(this.addEmoteButton,this.delEmoteButton))}renderEmotePreview(){const e=document.querySelector(".emoticon-grid");if(!e)return;if(!this.isAdded){if(!this.emoticonPreview)return;Object.values(this.emoticonPreview).forEach(r=>r.remove());return}this.emoticonThead=e.querySelector("thead > tr"),this.emoticonTbodyLight=e.querySelector("tbody > .light"),this.emoticonTbodyDark=e.querySelector("tbody > .dark");const t=d("td",d("img",{className:"emoticon hover-pixelated",src:`${q}emote/${this.emote.name}`}));this.emoticonPreview={th:d("th","ChatEmotes"),dark:t,light:t.cloneNode(!0)},this.emoticonThead.prepend(this.emoticonPreview.th),this.emoticonTbodyDark.prepend(this.emoticonPreview.dark),this.emoticonTbodyLight.prepend(this.emoticonPreview.light)}parseEmoteInfo(){const e=document.querySelector("#emoticon").textContent.split(" ")[0];this.emotes.find(t=>t.name===e)&&this.toggleAdded(),this.emote={name:e,url:location.href}}renderPanel(){const e=document.querySelectorAll("td > input");for(const o of e){const i=o.getAttribute("data-name");this.emoteNames.includes(i)&&o.parentElement.classList.add("ffz-added")}const t=document.querySelector(".sidebar-offcanvas"),r=d("div",{className:"panel panel-default"},d("div",{textContent:"ChatEmotes",className:"panel-heading"}),d("div",{className:"list-group"},d("a",{textContent:"Add Selected",className:"list-group-item",href:"#",onclick:async o=>{o.preventDefault();const i=document.querySelectorAll(".selectable.active > td > input");for(const s of i)try{const a=s.getAttribute("data-name"),l=`https://cdn.frankerfacez.com/emoticon/${s.getAttribute("data-id")}/2`;await x(a,l),s.parentElement.classList.add("ffz-added")}catch(a){console.error(a)}finally{s.click()}}}),d("a",{textContent:"Delete Selected",className:"list-group-item",href:"#",onclick:async o=>{o.preventDefault();const i=document.querySelectorAll(".selectable.active > td > input");for(const s of i)try{const a=s.getAttribute("data-name");await D(a),s.parentElement.classList.remove("ffz-added")}catch(a){console.error(a)}finally{s.click()}}})));t?.appendChild(r)}}const X="";async function W(){const n=await K();switch(location.hostname){case"7tv.app":console.log("7tv provider loaded");break;case"betterttv.com":console.log("bttv provider loaded");break;case"www.frankerfacez.com":b.init(n);break}}M().then(()=>W()),GM_addStyle(".ffz-button{margin-left:1rem}.selectable>td.ffz-added{background-color:#0ce3ac}")})();
