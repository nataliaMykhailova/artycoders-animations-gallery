(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();const a=[{id:"2",title:"textAnim2",type:"text",subtypes:["hover"],path:"animations/textAnim2.html",width:"35vw"},{id:"1",title:"textAnim1",type:"text",subtypes:["link"],path:"animations/textAnim1.html"}],p=document.getElementById("gallery"),y=document.getElementById("search"),l=document.getElementById("filterType"),s=document.getElementById("filterSubtype");function g(){[...new Set(a.map(n=>n.type))].forEach(n=>{const t=document.createElement("option");t.value=n,t.textContent=n,l.append(t)})}function m(c){if(s.innerHTML='<option value="">— Усі підтипи —</option>',!c){s.disabled=!0;return}s.disabled=!1,[...new Set(a.filter(t=>t.type===c).flatMap(t=>t.subtypes||[]))].forEach(t=>{const r=document.createElement("option");r.value=t,r.textContent=t,s.append(r)})}function u(){const c=y.value.trim().toLowerCase(),n=l.value,t=s.value,r=a.filter(e=>{const o=e.title.toLowerCase().includes(c),i=!n||e.type===n,d=!t||(e.subtypes||[]).includes(t);return o&&i&&d});f(r)}function f(c){p.innerHTML="",c.forEach(n=>{const t=n.width,r=n.height,e=document.createElement("div");e.className="card",e.innerHTML=`
      <h3>${n.title}</h3>
      <iframe
        src="${n.path}"
        loading="lazy"
        title="${n.title}"
        style="
          ${t?`width: ${t};`:""}
          ${r?`height: ${r};`:""}
          border: none;
          display: inline-block;
        "
      ></iframe>
    `,p.append(e);const o=e.querySelector("iframe");!t&&!r&&o.addEventListener("load",()=>{try{const i=o.contentWindow.document,d=Math.max(i.documentElement.scrollWidth,i.body.scrollWidth),h=Math.max(i.documentElement.scrollHeight,i.body.scrollHeight);o.style.width=d+"px",o.style.height=h+"px"}catch(i){console.warn("Не вдалося виміряти iframe:",i)}})})}document.addEventListener("DOMContentLoaded",()=>{g(),m(""),f(a),l.addEventListener("change",()=>{m(l.value),u()}),s.addEventListener("change",u),y.addEventListener("input",u)});
