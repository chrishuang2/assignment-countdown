(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=864e5,t=/^\d{4}-\d{2}-\d{2}$/;function n(t,n,r){return Date.UTC(t,n,r)/e}function r(e){if(!t.test(e))return!1;let[n,r,i]=e.split(`-`).map(Number),a=new Date(Date.UTC(n,r-1,i));return a.getUTCMonth()===r-1&&a.getUTCDate()===i}function i(e,t){let[r,i,a]=e.split(`-`).map(Number);return n(r,i-1,a)-n(t.getFullYear(),t.getMonth(),t.getDate())}function a(e){if(e===0)return`Due today`;if(e===1)return`Due tomorrow`;if(e>1)return`Due in ${e} days`;let t=-e;return`Overdue by ${t} ${t===1?`day`:`days`}`}function o(e){return[...e].sort((e,t)=>e.dueDate.localeCompare(t.dueDate)||e.course.localeCompare(t.course)||e.title.localeCompare(t.title))}function s(e){return e.trim().replace(/\s+/g,` `).toUpperCase()}function c(e){let t=new Map;for(let n of e){let e=s(n.course);t.has(e)||t.set(e,n.course.trim())}return[...t].map(([e,t])=>({key:e,label:t})).sort((e,t)=>e.key.localeCompare(t.key,void 0,{numeric:!0}))}function l(e){return e.title.trim()===``?`Please enter the assignment name.`:e.course.trim()===``?`Please enter the course.`:r(e.dueDate)?null:`Please choose a due date.`}var u=`assignment-countdown:assignments`;function d(e){if(typeof e!=`object`||!e)return null;let t=e;return typeof t.id!=`string`||typeof t.title!=`string`||typeof t.course!=`string`||typeof t.dueDate!=`string`||!r(t.dueDate)||t.done!==void 0&&typeof t.done!=`boolean`?null:{id:t.id,title:t.title,course:t.course,dueDate:t.dueDate,done:t.done===!0}}function f(e){try{let t=e.getItem(u);if(t===null)return[];let n=JSON.parse(t);return Array.isArray(n)?n.map(d).filter(e=>e!==null):[]}catch{return[]}}function p(e,t){try{return e.setItem(u,JSON.stringify(t)),!0}catch{return!1}}var m=`
  <header>
    <h1>Assignment Countdown</h1>
    <p class="subtitle">Add your assignments and see what's due next.</p>
  </header>

  <form id="add-form" novalidate>
    <h2 id="form-heading" class="form-heading" hidden></h2>
    <label>
      Assignment
      <input name="title" type="text" placeholder="e.g. Problem Set 4" autocomplete="off" />
    </label>
    <label>
      Course
      <input name="course" type="text" placeholder="e.g. ECON 102" autocomplete="off" />
    </label>
    <label>
      Due date
      <input name="dueDate" type="date" />
    </label>
    <div class="form-actions">
      <button id="submit-button" type="submit">Add assignment</button>
      <button id="cancel-edit" class="secondary-button" type="button" hidden>Cancel</button>
    </div>
    <p id="form-message" class="message" aria-live="polite"></p>
  </form>

  <div id="filter-bar" class="filter-bar" hidden>
    <label for="course-filter">Show</label>
    <select id="course-filter"></select>
  </div>

  <section aria-labelledby="upcoming-heading">
    <h2 id="upcoming-heading">Upcoming</h2>
    <p id="empty-message" class="empty"></p>
    <ul id="assignment-list"></ul>
  </section>

  <section id="done-section" aria-labelledby="done-heading" hidden>
    <h2 id="done-heading">Done</h2>
    <ul id="done-list"></ul>
  </section>
`,h=`No assignments yet. Add one above to start your countdown.`,g=`Nothing upcoming. You're all caught up!`;function _(e){let[t,n,r]=e.split(`-`).map(Number);return new Date(t,n-1,r).toLocaleDateString(void 0,{weekday:`short`,month:`short`,day:`numeric`})}function v(e,t){return e.done?`done`:t<0?`overdue`:t<=2?`soon`:`later`}function y(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`}function b(e,t,n){let r=document.createElement(`button`);return r.type=`button`,r.className=`row-button ${e}`,r.textContent=t,r.setAttribute(`aria-label`,n),r}function x(e,t,n){let r=i(e.dueDate,t),o=document.createElement(`li`);o.className=`assignment ${v(e,r)}`,o.classList.toggle(`editing`,n),o.dataset.id=e.id;let s=document.createElement(`input`);s.type=`checkbox`,s.className=`done-toggle`,s.checked=e.done,s.setAttribute(`aria-label`,e.done?`Mark "${e.title}" as not done`:`Mark "${e.title}" as done`);let c=document.createElement(`div`);c.className=`details`;let l=document.createElement(`p`);l.className=`title`,l.textContent=e.title;let u=document.createElement(`p`);u.className=`meta`,u.textContent=`${e.course} · ${_(e.dueDate)}`,c.append(l,u);let d=document.createElement(`p`);d.className=`countdown`,d.textContent=e.done?``:a(r);let f=document.createElement(`div`);return f.className=`row-actions`,f.append(b(`edit-button`,`Edit`,`Edit "${e.title}"`),b(`delete-button`,`Delete`,`Delete "${e.title}"`)),o.append(s,c,d,f),o}function S(e,t,n={}){let r=n.getToday??(()=>new Date),i=n.confirmDelete??(e=>window.confirm(e));e.innerHTML=m;let a=e.querySelector(`#add-form`),u=e.querySelector(`#form-heading`),d=a.querySelector(`input[name="title"]`),_=a.querySelector(`input[name="course"]`),v=a.querySelector(`input[name="dueDate"]`),b=e.querySelector(`#submit-button`),S=e.querySelector(`#cancel-edit`),C=e.querySelector(`#form-message`),w=e.querySelector(`#empty-message`),T=e.querySelector(`#assignment-list`),E=e.querySelector(`#done-section`),D=e.querySelector(`#done-list`),O=e.querySelector(`#filter-bar`),k=e.querySelector(`#course-filter`),A=f(t),j=null,M=null;function N(e,t){C.textContent=e,C.className=`message ${t}`}function P(){C.textContent=``,C.className=`message`}function F(e){j=e.id,d.value=e.title,_.value=e.course,v.value=e.dueDate,u.textContent=`Editing: ${e.title}`,u.hidden=!1,b.textContent=`Save changes`,S.hidden=!1,P(),R(),a.scrollIntoView({behavior:`smooth`,block:`start`}),d.focus({preventScroll:!0})}function I(){j=null,a.reset(),u.hidden=!0,b.textContent=`Add assignment`,S.hidden=!0,R()}function L(){let e=c(A),t=e.length>=2,n=t?e.find(e=>e.key===M)??null:null;return M=n?.key??null,k.replaceChildren(new Option(`All courses`,``),...e.map(e=>new Option(e.label,e.key))),k.value=M??``,O.hidden=!t,n}function R(){let e=r(),t=L(),n=o(t===null?A:A.filter(e=>s(e.course)===t.key)),i=n.filter(e=>!e.done),a=n.filter(e=>e.done),c=t=>x(t,e,t.id===j);T.replaceChildren(...i.map(c)),D.replaceChildren(...a.map(c)),w.hidden=i.length>0,A.length===0?w.textContent=h:t===null?w.textContent=g:w.textContent=`Nothing upcoming for ${t.label}.`,E.hidden=a.length===0}function z(e,n){A=e,R(),p(t,A)?n!==null&&N(n,`success`):N(`This browser wouldn't save your change, so it will be lost after a refresh.`,`error`)}function B(e){let t=e.target,n=t.closest(`li.assignment`)?.dataset.id,r=A.find(e=>e.id===n);if(r!==void 0){if(t.classList.contains(`done-toggle`)){let e=t.checked;z(A.map(t=>t.id===r.id?{...t,done:e}:t),null)}else if(t.classList.contains(`edit-button`))F(r);else if(t.classList.contains(`delete-button`)){if(!i(`Delete "${r.title}"?`))return;r.id===j&&I(),z(A.filter(e=>e.id!==r.id),`Deleted "${r.title}".`)}}}a.addEventListener(`submit`,e=>{e.preventDefault();let t=new FormData(a),n={title:String(t.get(`title`)??``).trim(),course:String(t.get(`course`)??``).trim(),dueDate:String(t.get(`dueDate`)??``)},r=l(n);if(r!==null){N(r,`error`);return}if(M!==null&&s(n.course)!==M&&(M=null),j===null){z([...A,{id:y(),...n,done:!1}],`Added "${n.title}".`),a.reset(),d.focus();return}let i=j;I(),z(A.map(e=>e.id===i?{...e,...n}:e),`Saved changes to "${n.title}".`)}),S.addEventListener(`click`,()=>{I(),P()}),k.addEventListener(`change`,()=>{M=k.value===``?null:k.value,R()}),T.addEventListener(`click`,B),D.addEventListener(`click`,B),R()}S(document.querySelector(`#app`),window.localStorage);