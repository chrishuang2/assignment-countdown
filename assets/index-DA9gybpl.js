(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=864e5,t=/^\d{4}-\d{2}-\d{2}$/;function n(t,n,r){return Date.UTC(t,n,r)/e}function r(e){if(!t.test(e))return!1;let[n,r,i]=e.split(`-`).map(Number),a=new Date(Date.UTC(n,r-1,i));return a.getUTCMonth()===r-1&&a.getUTCDate()===i}function i(e,t){let[r,i,a]=e.split(`-`).map(Number);return n(r,i-1,a)-n(t.getFullYear(),t.getMonth(),t.getDate())}function a(e){if(e===0)return`Due today`;if(e===1)return`Due tomorrow`;if(e>1)return`Due in ${e} days`;let t=-e;return`Overdue by ${t} ${t===1?`day`:`days`}`}function o(e){return[...e].sort((e,t)=>e.dueDate.localeCompare(t.dueDate)||e.course.localeCompare(t.course)||e.title.localeCompare(t.title))}function s(e){return e.title.trim()===``?`Please enter the assignment name.`:e.course.trim()===``?`Please enter the course.`:r(e.dueDate)?null:`Please choose a due date.`}var c=`assignment-countdown:assignments`;function l(e){if(typeof e!=`object`||!e)return null;let t=e;return typeof t.id!=`string`||typeof t.title!=`string`||typeof t.course!=`string`||typeof t.dueDate!=`string`||!r(t.dueDate)||t.done!==void 0&&typeof t.done!=`boolean`?null:{id:t.id,title:t.title,course:t.course,dueDate:t.dueDate,done:t.done===!0}}function u(e){try{let t=e.getItem(c);if(t===null)return[];let n=JSON.parse(t);return Array.isArray(n)?n.map(l).filter(e=>e!==null):[]}catch{return[]}}function d(e,t){try{return e.setItem(c,JSON.stringify(t)),!0}catch{return!1}}var f=`
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

  <section aria-labelledby="upcoming-heading">
    <h2 id="upcoming-heading">Upcoming</h2>
    <p id="empty-message" class="empty"></p>
    <ul id="assignment-list"></ul>
  </section>

  <section id="done-section" aria-labelledby="done-heading" hidden>
    <h2 id="done-heading">Done</h2>
    <ul id="done-list"></ul>
  </section>
`,p=`No assignments yet. Add one above to start your countdown.`,m=`Nothing upcoming. You're all caught up!`;function h(e){let[t,n,r]=e.split(`-`).map(Number);return new Date(t,n-1,r).toLocaleDateString(void 0,{weekday:`short`,month:`short`,day:`numeric`})}function g(e,t){return e.done?`done`:t<0?`overdue`:t<=2?`soon`:`later`}function _(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`}function v(e,t,n){let r=document.createElement(`button`);return r.type=`button`,r.className=`row-button ${e}`,r.textContent=t,r.setAttribute(`aria-label`,n),r}function y(e,t,n){let r=i(e.dueDate,t),o=document.createElement(`li`);o.className=`assignment ${g(e,r)}`,o.classList.toggle(`editing`,n),o.dataset.id=e.id;let s=document.createElement(`input`);s.type=`checkbox`,s.className=`done-toggle`,s.checked=e.done,s.setAttribute(`aria-label`,e.done?`Mark "${e.title}" as not done`:`Mark "${e.title}" as done`);let c=document.createElement(`div`);c.className=`details`;let l=document.createElement(`p`);l.className=`title`,l.textContent=e.title;let u=document.createElement(`p`);u.className=`meta`,u.textContent=`${e.course} · ${h(e.dueDate)}`,c.append(l,u);let d=document.createElement(`p`);d.className=`countdown`,d.textContent=e.done?``:a(r);let f=document.createElement(`div`);return f.className=`row-actions`,f.append(v(`edit-button`,`Edit`,`Edit "${e.title}"`),v(`delete-button`,`Delete`,`Delete "${e.title}"`)),o.append(s,c,d,f),o}function b(e,t,n={}){let r=n.getToday??(()=>new Date),i=n.confirmDelete??(e=>window.confirm(e));e.innerHTML=f;let a=e.querySelector(`#add-form`),c=e.querySelector(`#form-heading`),l=a.querySelector(`input[name="title"]`),h=a.querySelector(`input[name="course"]`),g=a.querySelector(`input[name="dueDate"]`),v=e.querySelector(`#submit-button`),b=e.querySelector(`#cancel-edit`),x=e.querySelector(`#form-message`),S=e.querySelector(`#empty-message`),C=e.querySelector(`#assignment-list`),w=e.querySelector(`#done-section`),T=e.querySelector(`#done-list`),E=u(t),D=null;function O(e,t){x.textContent=e,x.className=`message ${t}`}function k(){x.textContent=``,x.className=`message`}function A(e){D=e.id,l.value=e.title,h.value=e.course,g.value=e.dueDate,c.textContent=`Editing: ${e.title}`,c.hidden=!1,v.textContent=`Save changes`,b.hidden=!1,k(),M(),a.scrollIntoView({behavior:`smooth`,block:`start`}),l.focus({preventScroll:!0})}function j(){D=null,a.reset(),c.hidden=!0,v.textContent=`Add assignment`,b.hidden=!0,M()}function M(){let e=r(),t=o(E),n=t.filter(e=>!e.done),i=t.filter(e=>e.done),a=t=>y(t,e,t.id===D);C.replaceChildren(...n.map(a)),T.replaceChildren(...i.map(a)),S.hidden=n.length>0,S.textContent=E.length===0?p:m,w.hidden=i.length===0}function N(e,n){E=e,M(),d(t,E)?n!==null&&O(n,`success`):O(`This browser wouldn't save your change, so it will be lost after a refresh.`,`error`)}function P(e){let t=e.target,n=t.closest(`li.assignment`)?.dataset.id,r=E.find(e=>e.id===n);if(r!==void 0){if(t.classList.contains(`done-toggle`)){let e=t.checked;N(E.map(t=>t.id===r.id?{...t,done:e}:t),null)}else if(t.classList.contains(`edit-button`))A(r);else if(t.classList.contains(`delete-button`)){if(!i(`Delete "${r.title}"?`))return;r.id===D&&j(),N(E.filter(e=>e.id!==r.id),`Deleted "${r.title}".`)}}}a.addEventListener(`submit`,e=>{e.preventDefault();let t=new FormData(a),n={title:String(t.get(`title`)??``).trim(),course:String(t.get(`course`)??``).trim(),dueDate:String(t.get(`dueDate`)??``)},r=s(n);if(r!==null){O(r,`error`);return}if(D===null){N([...E,{id:_(),...n,done:!1}],`Added "${n.title}".`),a.reset(),l.focus();return}let i=D;j(),N(E.map(e=>e.id===i?{...e,...n}:e),`Saved changes to "${n.title}".`)}),b.addEventListener(`click`,()=>{j(),k()}),C.addEventListener(`click`,P),T.addEventListener(`click`,P),M()}b(document.querySelector(`#app`),window.localStorage);