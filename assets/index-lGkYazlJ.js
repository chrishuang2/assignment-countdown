(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=864e5,t=/^\d{4}-\d{2}-\d{2}$/;function n(t,n,r){return Date.UTC(t,n,r)/e}function r(e){if(!t.test(e))return!1;let[n,r,i]=e.split(`-`).map(Number),a=new Date(Date.UTC(n,r-1,i));return a.getUTCMonth()===r-1&&a.getUTCDate()===i}function i(e,t){let[r,i,a]=e.split(`-`).map(Number);return n(r,i-1,a)-n(t.getFullYear(),t.getMonth(),t.getDate())}function a(e){if(e===0)return`Due today`;if(e===1)return`Due tomorrow`;if(e>1)return`Due in ${e} days`;let t=-e;return`Overdue by ${t} ${t===1?`day`:`days`}`}function o(e){return[...e].sort((e,t)=>e.dueDate.localeCompare(t.dueDate)||e.course.localeCompare(t.course)||e.title.localeCompare(t.title))}function s(e){return e.title.trim()===``?`Please enter the assignment name.`:e.course.trim()===``?`Please enter the course.`:r(e.dueDate)?null:`Please choose a due date.`}var c=`assignment-countdown:assignments`;function l(e){if(typeof e!=`object`||!e)return null;let t=e;return typeof t.id!=`string`||typeof t.title!=`string`||typeof t.course!=`string`||typeof t.dueDate!=`string`||!r(t.dueDate)||t.done!==void 0&&typeof t.done!=`boolean`?null:{id:t.id,title:t.title,course:t.course,dueDate:t.dueDate,done:t.done===!0}}function u(e){try{let t=e.getItem(c);if(t===null)return[];let n=JSON.parse(t);return Array.isArray(n)?n.map(l).filter(e=>e!==null):[]}catch{return[]}}function d(e,t){try{return e.setItem(c,JSON.stringify(t)),!0}catch{return!1}}var f=`
  <header>
    <h1>Assignment Countdown</h1>
    <p class="subtitle">Add your assignments and see what's due next.</p>
  </header>

  <form id="add-form" novalidate>
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
    <button type="submit">Add assignment</button>
    <p id="form-message" class="message" aria-live="polite"></p>
  </form>

  <section aria-labelledby="upcoming-heading">
    <h2 id="upcoming-heading">Upcoming</h2>
    <p id="empty-message" class="empty"></p>
    <ul id="assignment-list"></ul>
  </section>

  <section id="done-section" aria-labelledby="done-heading" hidden>
    <h2 id="done-heading">Done</h2>
    <ul id="done-list"></ul>
  </section>
`,p=`No assignments yet. Add one above to start your countdown.`,m=`Nothing upcoming. You're all caught up!`;function h(e){let[t,n,r]=e.split(`-`).map(Number);return new Date(t,n-1,r).toLocaleDateString(void 0,{weekday:`short`,month:`short`,day:`numeric`})}function g(e,t){return e.done?`done`:t<0?`overdue`:t<=2?`soon`:`later`}function _(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`}function v(e,t){let n=i(e.dueDate,t),r=document.createElement(`li`);r.className=`assignment ${g(e,n)}`,r.dataset.id=e.id;let o=document.createElement(`input`);o.type=`checkbox`,o.className=`done-toggle`,o.checked=e.done,o.setAttribute(`aria-label`,e.done?`Mark "${e.title}" as not done`:`Mark "${e.title}" as done`);let s=document.createElement(`div`);s.className=`details`;let c=document.createElement(`p`);c.className=`title`,c.textContent=e.title;let l=document.createElement(`p`);l.className=`meta`,l.textContent=`${e.course} · ${h(e.dueDate)}`,s.append(c,l);let u=document.createElement(`p`);u.className=`countdown`,u.textContent=e.done?``:a(n);let d=document.createElement(`button`);return d.type=`button`,d.className=`delete-button`,d.textContent=`Delete`,d.setAttribute(`aria-label`,`Delete "${e.title}"`),r.append(o,s,u,d),r}function y(e,t,n={}){let r=n.getToday??(()=>new Date),i=n.confirmDelete??(e=>window.confirm(e));e.innerHTML=f;let a=e.querySelector(`#add-form`),c=e.querySelector(`#form-message`),l=e.querySelector(`#empty-message`),h=e.querySelector(`#assignment-list`),g=e.querySelector(`#done-section`),y=e.querySelector(`#done-list`),b=u(t);function x(e,t){c.textContent=e,c.className=`message ${t}`}function S(){let e=r(),t=o(b),n=t.filter(e=>!e.done),i=t.filter(e=>e.done);h.replaceChildren(...n.map(t=>v(t,e))),y.replaceChildren(...i.map(t=>v(t,e))),l.hidden=n.length>0,l.textContent=b.length===0?p:m,g.hidden=i.length===0}function C(e,n){b=e,S(),d(t,b)?n!==null&&x(n,`success`):x(`This browser wouldn't save your change, so it will be lost after a refresh.`,`error`)}function w(e){let t=e.target,n=t.closest(`li.assignment`)?.dataset.id,r=b.find(e=>e.id===n);if(r!==void 0){if(t.classList.contains(`done-toggle`)){let e=t.checked;C(b.map(t=>t.id===r.id?{...t,done:e}:t),null)}else if(t.classList.contains(`delete-button`)){if(!i(`Delete "${r.title}"?`))return;C(b.filter(e=>e.id!==r.id),`Deleted "${r.title}".`)}}}a.addEventListener(`submit`,e=>{e.preventDefault();let t=new FormData(a),n={title:String(t.get(`title`)??``).trim(),course:String(t.get(`course`)??``).trim(),dueDate:String(t.get(`dueDate`)??``)},r=s(n);r===null?(C([...b,{id:_(),...n,done:!1}],`Added "${n.title}".`),a.reset(),a.querySelector(`input[name="title"]`).focus()):x(r,`error`)}),h.addEventListener(`click`,w),y.addEventListener(`click`,w),S()}y(document.querySelector(`#app`),window.localStorage);