(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=864e5,t=/^\d{4}-\d{2}-\d{2}$/;function n(t,n,r){return Date.UTC(t,n,r)/e}function r(e){if(!t.test(e))return!1;let[n,r,i]=e.split(`-`).map(Number),a=new Date(Date.UTC(n,r-1,i));return a.getUTCMonth()===r-1&&a.getUTCDate()===i}function i(e,t){let[r,i,a]=e.split(`-`).map(Number);return n(r,i-1,a)-n(t.getFullYear(),t.getMonth(),t.getDate())}function a(e){if(e===0)return`Due today`;if(e===1)return`Due tomorrow`;if(e>1)return`Due in ${e} days`;let t=-e;return`Overdue by ${t} ${t===1?`day`:`days`}`}function o(e){return[...e].sort((e,t)=>e.dueDate.localeCompare(t.dueDate)||e.course.localeCompare(t.course)||e.title.localeCompare(t.title))}function s(e){return e.title.trim()===``?`Please enter the assignment name.`:e.course.trim()===``?`Please enter the course.`:r(e.dueDate)?null:`Please choose a due date.`}var c=`assignment-countdown:assignments`;function l(e){if(typeof e!=`object`||!e)return!1;let t=e;return typeof t.id==`string`&&typeof t.title==`string`&&typeof t.course==`string`&&typeof t.dueDate==`string`&&r(t.dueDate)}function u(e){try{let t=e.getItem(c);if(t===null)return[];let n=JSON.parse(t);return Array.isArray(n)?n.filter(l):[]}catch{return[]}}function d(e,t){try{return e.setItem(c,JSON.stringify(t)),!0}catch{return!1}}var f=`
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
    <p id="empty-message" class="empty">No assignments yet. Add one above to start your countdown.</p>
    <ul id="assignment-list"></ul>
  </section>
`;function p(e){let[t,n,r]=e.split(`-`).map(Number);return new Date(t,n-1,r).toLocaleDateString(void 0,{weekday:`short`,month:`short`,day:`numeric`})}function m(e){return e<0?`overdue`:e<=2?`soon`:`later`}function h(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`}function g(e,t){let n=i(e.dueDate,t),r=document.createElement(`li`);r.className=`assignment ${m(n)}`;let o=document.createElement(`div`),s=document.createElement(`p`);s.className=`title`,s.textContent=e.title;let c=document.createElement(`p`);c.className=`meta`,c.textContent=`${e.course} · ${p(e.dueDate)}`,o.append(s,c);let l=document.createElement(`p`);return l.className=`countdown`,l.textContent=a(n),r.append(o,l),r}function _(e,t,n=()=>new Date){e.innerHTML=f;let r=e.querySelector(`#add-form`),i=e.querySelector(`#form-message`),a=e.querySelector(`#empty-message`),c=e.querySelector(`#assignment-list`),l=u(t);function p(e,t){i.textContent=e,i.className=`message ${t}`}function m(){let e=n();c.replaceChildren(...o(l).map(t=>g(t,e))),a.hidden=l.length>0}r.addEventListener(`submit`,e=>{e.preventDefault();let n=new FormData(r),i={title:String(n.get(`title`)??``).trim(),course:String(n.get(`course`)??``).trim(),dueDate:String(n.get(`dueDate`)??``)},a=s(i);a===null?(l=[...l,{id:h(),...i}],m(),d(t,l)?p(`Added "${i.title}".`,`success`):p(`Added "${i.title}", but this browser wouldn't save it, so it will be gone after a refresh.`,`error`),r.reset(),r.querySelector(`input[name="title"]`).focus()):p(a,`error`)}),m()}_(document.querySelector(`#app`),window.localStorage);