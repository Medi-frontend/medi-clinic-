/* ---------------- Persistent storage helper (with in-memory fallback) ---------------- */
const Store = {
  mem:{},
  async get(key, shared){
    try{
      const r = await window.storage.get(key, !!shared);
      return r ? JSON.parse(r.value) : null;
    }catch(e){
      const k=(shared?'s:':'l:')+key;
      return Store.mem.hasOwnProperty(k) ? Store.mem[k] : null;
    }
  },
  async set(key, value, shared){
    try{ await window.storage.set(key, JSON.stringify(value), !!shared); }
    catch(e){ Store.mem[(shared?'s:':'l:')+key] = value; }
  }
};
async function getList(key, shared){ const v = await Store.get(key, shared); return Array.isArray(v) ? v : []; }

/* ---------------- Professional line icons ---------------- */
const ICONS = {
  phone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>',
  mapPin:'<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  checkCircle:'<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4 12 14.01l-3-3"/>',
  alertTriangle:'<path d="M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>',
  mail:'<rect x="4" y="4" width="16" height="16" rx="2"/><path d="m4 7 8 6 8-6"/>',
  shieldCheck:'<path d="M12 2 3 7v6c0 5 4 9 9 9s9-4 9-9V7z"/><path d="m9 12 2 2 4-4"/>',
  users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  layoutDashboard:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  calendar:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  star:'<path d="m12 17.27 6.18 3.73-1.64-7.03L21.6 9.24l-7.19-.61L12 2 9.59 8.63l-7.19.61 5.06 4.73-1.64 7.03z"/>',
  heartPulse:'<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
  brain:'<path d="M9.5 2a2.5 2.5 0 0 1 5 0V4a2 2 0 0 0 2 2h1a2.5 2.5 0 0 1 0 5h-1a2 2 0 0 0-2 2v1a2.5 2.5 0 0 1-5 0v-1a2 2 0 0 0-2-2H6a2.5 2.5 0 0 1 0-5h1.5a2 2 0 0 0 2-2z"/>',
  bone:'<path d="M17 10c.7-.7.7-1.8 0-2.5s-1.8-.7-2.5 0L7 15c-.7.7-.7 1.8 0 2.5s1.8.7 2.5 0z"/><path d="M15 7.5 17.5 5A2.1 2.1 0 1 1 20 7.5L17.5 10"/><path d="M9 16.5 6.5 19A2.1 2.1 0 1 1 4 16.5L6.5 14"/>',
  baby:'<path d="M9 12h.01M15 12h.01"/><path d="M10 16c1.5 1 2.5 1 4 0"/><path d="M19 6.5A9 9 0 1 1 12 3"/><path d="M14 3.5c2 .5 3.5 1.5 5 3"/>',
  scan:'<path d="M4 7V5a1 1 0 0 1 1-1h2M17 4h2a1 1 0 0 1 1 1v2M20 17v2a1 1 0 0 1-1 1h-2M7 20H5a1 1 0 0 1-1-1v-2"/><circle cx="12" cy="12" r="3"/><path d="M7 12h2M15 12h2"/>',
  stethoscope:'<path d="M4.8 2.3v5.3a4.2 4.2 0 0 0 8.4 0V2.3"/><path d="M8 15a6 6 0 0 0 12 0v-3"/><circle cx="20" cy="10" r="2"/>',
  microscope:'<path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 0 0 0-14h-1"/><path d="M9 14 4 9l4-4 5 5z"/><path d="m8 10 3-3"/>',
  tooth:'<path d="M12 4.5C10.8 3.5 8.4 3 7 4.5 5.1 6.5 6 10 7 13c.7 2.3.7 5 2.4 6.4.7.6 1.6.1 1.8-.8l.5-2.7c.1-.6.7-.6.8 0l.5 2.7c.2.9 1.1 1.4 1.8.8C16.5 18 16.5 15.3 17.2 13c1-3 1.9-6.5 0-8.5-1.4-1.5-3.8-1-5.2 0z"/>',
  arrowRight:'<path d="M5 12h14M13 6l6 6-6 6"/>'
};
function iconSvg(name, cls='icon'){
  return `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ''}</svg>`;
}
function hydrateStaticIcons(){
  document.querySelectorAll('[data-icon]').forEach(el => { el.innerHTML = iconSvg(el.dataset.icon); });
}

/* ---------------- Toasts ---------------- */
function toast(msg){
  const stack = document.getElementById('toastStack');
  const el = document.createElement('div');
  el.className='toast';
  el.innerHTML = iconSvg('checkCircle') + '<span>'+msg+'</span>';
  stack.appendChild(el);
  setTimeout(()=>{ el.remove(); }, 4200);
}

/* ---------------- Notification log (simulated email/SMS) ---------------- */
async function logNotification(type, to, message){
  const list = await getList('notifications', true);
  list.unshift({ id:Date.now()+Math.random(), type, to, message, ts:new Date().toISOString() });
  await Store.set('notifications', list.slice(0,200), true);
  return list;
}

/* ---------------- Mobile nav ---------------- */
const hamburger = document.getElementById('hamburgerBtn');
const mainNav = document.getElementById('mainNav');
hamburger.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  document.body.classList.toggle('nav-open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});
mainNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { mainNav.classList.remove('open'); document.body.classList.remove('nav-open'); hamburger.setAttribute('aria-expanded', false); }));

/* ---------------- FAQ accordion ---------------- */
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

/* ---------------- Appointment form (public) ---------------- */
document.getElementById('apptForm').addEventListener('submit', async function(e){
  e.preventDefault();
  const rec = {
    id: Date.now()+Math.random(),
    name: this.fname.value, phone: this.fphone.value, email: this.femail.value,
    branch: this.fbranch.value, department: this.fdept.value, date: this.fdate.value,
    reason: this.fmsg.value, status:'pending', createdAt: new Date().toISOString()
  };
  const list = await getList('appointments', true);
  list.unshift(rec);
  await Store.set('appointments', list, true);
  await logNotification('Email', rec.email, 'Appointment request received for '+rec.department+' at '+rec.branch+' on '+rec.date+'.');
  await logNotification('SMS', rec.phone, 'Health Village 24: your '+rec.department+' request for '+rec.date+' is being confirmed.');
  document.getElementById('formSuccess').classList.add('show');
  this.reset();
  document.getElementById('formSuccess').scrollIntoView({behavior:'smooth', block:'center'});
});

/* ---------------- Stat counters ---------------- */
const counters = document.querySelectorAll('[data-count]');
const animateCounter = (el) => {
  const target = parseInt(el.getAttribute('data-count'), 10);
  const duration = 1400; const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(step); else el.textContent = target.toLocaleString();
  };
  requestAnimationFrame(step);
};
const obs = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) { animateCounter(entry.target); obs.unobserve(entry.target); } });
}, { threshold: 0.5 });
counters.forEach(c => obs.observe(c));

/* ---------------- Back to top ---------------- */
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => { backToTop.classList.toggle('show', window.scrollY > 600); });
backToTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

/* ================= DOCTOR ROSTER (shared) ================= */
const DEFAULT_DOCTORS = [
  {id:'amara-reyes', name:'Dr. Amara Reyes', spec:'Cardiology', branch:'Sandton, Gauteng', years:14, rating:4.9, initials:'AR', photo:'https://images.squarespace-cdn.com/content/v1/622e76507366587b35555b80/42c19a63-d99d-4e0d-8aee-95ee7f24becf/Sanam-3.jpg', color:'linear-gradient(135deg,#0E7490,#073B4C)', status:'on-duty', since:new Date().toISOString()},
  {id:'james-mensah', name:'Dr. James Mensah', spec:'Neurology', branch:'Sandton, Gauteng', years:11, rating:4.8, initials:'JM', photo:'https://images.squarespace-cdn.com/content/v1/651218528d906243fe0f21cd/a4bdb712-6955-4125-bbfd-437b568b5058/joven-medico-hospital-medicina-medica-salud-clinica-oficina-retrato-gafas-hombre-estetoscopio-especialista.jpg', color:'linear-gradient(135deg,#13A6B3,#0E7490)', status:'off-duty', since:null},
  {id:'sana-khatri', name:'Dr. Sana Khatri', spec:'Pediatrics', branch:'Polokwane, Limpopo', years:9, rating:5.0, initials:'SK', photo:'https://images.squarespace-cdn.com/content/v1/5e55525db2e16453bec9f665/722a5a7e-bd54-499e-8ff4-c735bfdb0db9/Annie%2BAndrews.jpg?format=1000w', color:'linear-gradient(135deg,#0A5C68,#073B4C)', status:'on-duty', since:new Date().toISOString()},
  {id:'daniel-osei', name:'Dr. Daniel Osei', spec:'Orthopedics', branch:'Polokwane, Limpopo', years:17, rating:4.9, initials:'DO', photo:'https://cdn.whatclinic.com/orthopaedic/lithuania/kaunas/nordorthopaedics-clinic/thumbnails/f1144959f694d06f/sarunas_12.jpg?crop_h=1&crop_w=1&crop_x=0&crop_y=0&float-x=0.5&float-y=0.5&hmac=b46364e2f560c8df3cf00924058745204d0f5206&rotate=0', color:'linear-gradient(135deg,#0E7490,#13A6B3)', status:'off-duty', since:null}
];
async function getRoster(){
  let roster = await getList('doctor-roster', true);
  if (!roster.length){
    roster = DEFAULT_DOCTORS;
    await Store.set('doctor-roster', roster, true);
  } else {
    roster = roster.map(d => {
      const fresh = DEFAULT_DOCTORS.find(doc => doc.id === d.id);
      return fresh ? {...fresh, ...d, photo:fresh.photo, color:fresh.color} : d;
    });
    await Store.set('doctor-roster', roster, true);
  }
  return roster;
}async function setRoster(roster){ await Store.set('doctor-roster', roster, true); }

function statusPillHtml(status){
  const on = status === 'on-duty';
  return '<span class="duty-badge '+(on?'on':'')+'"><span class="d-dot"></span>'+(on?'On Duty':'Off Duty')+'</span>';
}

async function renderDoctorGrid(){
  const roster = await getRoster();
  const grid = document.getElementById('doctorGrid');
  grid.innerHTML = roster.map(d => `
    <div class="doctor-card">
      <div class="doctor-photo" style="background:${d.color};">${d.photo ? `<img src="${d.photo}" alt="Portrait of ${d.name}" loading="lazy">` : d.initials}${statusPillHtml(d.status)}</div>
      <div class="doctor-body">
        <h3>${d.name}</h3>
        <div class="spec">${d.spec}</div>
        <div class="meta">
          <span>${iconSvg('clock')}${d.years} yrs</span>
          <span>${iconSvg('star')}${d.rating}</span>
          <span>${d.branch}</span>
        </div>
        <a href="#appointment" class="btn btn-outline btn-sm btn-block">Book</a>
      </div>
    </div>`).join('');
  const onDuty = roster.filter(d=>d.status==='on-duty').length;
  document.getElementById('heroDutyCount').textContent = onDuty+' of '+roster.length;
}
document.getElementById('refreshRosterBtn').addEventListener('click', () => { renderDoctorGrid(); toast('Availability refreshed.'); });
renderDoctorGrid();
setInterval(renderDoctorGrid, 20000);

/* ================= EMERGENCY SOS ================= */
const sosOverlay = document.getElementById('sosOverlay');
const sosOpenBtn = document.getElementById('sosOpenBtn');
const sosCloseBtn = document.getElementById('sosCloseBtn');
const sosDoneBtn = document.getElementById('sosDoneBtn');
const holdBtn = document.getElementById('holdBtn');
const holdFill = document.getElementById('holdFill');
const holdBtnLabel = document.getElementById('holdBtnLabel');
const sosStepConfirm = document.getElementById('sosStepConfirm');
const sosStepResult = document.getElementById('sosStepResult');

const BRANCHES = [
  {name:'Sandton, Gauteng', lat:-26.100901, lng:28.064801, phone:'+27 62 683 6248'},
  {name:'Polokwane, Limpopo', lat:-23.904500, lng:29.468900, phone:'+27 15 291 4171'}
];
function haversineKm(lat1, lon1, lat2, lon2){
  const R=6371, toRad = d=>d*Math.PI/180;
  const dLat=toRad(lat2-lat1), dLon=toRad(lon2-lon1);
  const a=Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2;
  return R*2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}
function nearestBranch(lat, lng){
  let best=null, bestDist=Infinity;
  BRANCHES.forEach(b=>{ const d=haversineKm(lat,lng,b.lat,b.lng); if(d<bestDist){bestDist=d; best=b;} });
  return {branch:best, distanceKm:bestDist};
}

function openSos(){ sosOverlay.classList.add('show'); sosStepConfirm.style.display='block'; sosStepResult.classList.remove('show'); resetHold(); }
function closeSos(){ sosOverlay.classList.remove('show'); resetHold(); }
sosOpenBtn.addEventListener('click', openSos);
sosCloseBtn.addEventListener('click', closeSos);
sosDoneBtn.addEventListener('click', closeSos);
sosOverlay.addEventListener('click', (e)=>{ if(e.target===sosOverlay) closeSos(); });

let holdTimer=null, holdStart=0;
const HOLD_MS = 3000;
function resetHold(){ clearInterval(holdTimer); holdFill.style.width='0%'; holdBtn.classList.remove('filling'); holdBtnLabel.textContent='Press and hold to confirm'; }
function startHold(){
  holdStart = Date.now();
  holdBtn.classList.add('filling');
  holdTimer = setInterval(()=>{
    const pct = Math.min(100, ((Date.now()-holdStart)/HOLD_MS)*100);
    holdFill.style.width = pct+'%';
    holdBtnLabel.textContent = pct < 100 ? 'Keep holding…' : 'Sending alert…';
    if (pct >= 100){ clearInterval(holdTimer); triggerSos(); }
  }, 40);
}
function cancelHold(){ if(Date.now()-holdStart < HOLD_MS){ resetHold(); } }
holdBtn.addEventListener('mousedown', startHold);
holdBtn.addEventListener('touchstart', (e)=>{ e.preventDefault(); startHold(); }, {passive:false});
['mouseup','mouseleave'].forEach(ev=>holdBtn.addEventListener(ev, cancelHold));
holdBtn.addEventListener('touchend', cancelHold);

async function triggerSos(){
  const session = getSession();
  const who = session ? session.name : 'Anonymous website visitor';
  let coords = null, geoError = null;
  if (navigator.geolocation){
    coords = await new Promise((resolve)=>{
      navigator.geolocation.getCurrentPosition(
        pos => resolve({lat:pos.coords.latitude, lng:pos.coords.longitude, accuracy:Math.round(pos.coords.accuracy)}),
        err => { geoError = err.message; resolve(null); },
        { enableHighAccuracy:true, timeout:8000 }
      );
    });
  } else { geoError = 'Geolocation not supported on this device'; }

  let nearest = null;
  if (coords) nearest = nearestBranch(coords.lat, coords.lng);

  const alert = {
    id: Date.now()+Math.random(), patient: who, ts: new Date().toISOString(),
    lat: coords?coords.lat:null, lng: coords?coords.lng:null, accuracy: coords?coords.accuracy:null,
    geoError, nearestBranch: nearest?nearest.branch.name:null, distanceKm: nearest?nearest.distanceKm.toFixed(1):null,
    status:'open'
  };
  const alerts = await getList('emergency-alerts', true);
  alerts.unshift(alert);
  await Store.set('emergency-alerts', alerts, true);

  const staffPhone = nearest ? nearest.branch.phone : BRANCHES[0].phone;
  await logNotification('SMS', staffPhone+' (on-duty desk)', 'EMERGENCY SOS from '+who+' near '+(alert.nearestBranch||'unknown location')+'.');
  await logNotification('Email', 'duty-manager@healthvillage24.co.za', 'Emergency alert logged at '+new Date(alert.ts).toLocaleString()+'.');

  const box = document.getElementById('sosDataBox');
  box.innerHTML = `
    <div><span>Time</span><b>${new Date(alert.ts).toLocaleTimeString()}</b></div>
    <div><span>Location</span><b>${coords? coords.lat.toFixed(5)+', '+coords.lng.toFixed(5) : 'Unavailable'}</b></div>
    <div><span>Accuracy</span><b>${coords? '±'+coords.accuracy+' m' : '—'}</b></div>
    <div><span>Nearest branch</span><b>${nearest? nearest.branch.name : 'Select manually — call desk'}</b></div>
    <div><span>Distance</span><b>${nearest? nearest.distanceKm+' km' : '—'}</b></div>
  `;
  document.getElementById('sosNotifLog').innerHTML = `
    <div class="notif-line"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>SMS queued to on-duty desk (demo)</div>
    <div class="notif-line"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M4 4h16v16H4z"/><path d="m4 4 8 8 8-8"/></svg>Email queued to duty manager (demo)</div>
    ${geoError ? '<div class="notif-line" style="color:var(--coral-dark);">Location unavailable: '+geoError+'</div>' : ''}
  `;
  sosStepConfirm.style.display='none';
  sosStepResult.classList.add('show');
  resetHold();
  toast('Emergency alert logged.');
}

/* ================= AUTH / SESSION ================= */
let sessionData = null;
function getSession(){ return sessionData; }

const appView = document.getElementById('appView');
function showAppView(){ appView.classList.add('show'); document.body.style.overflow='hidden'; }
function hideAppView(){ appView.classList.remove('show'); document.body.style.overflow=''; }
document.getElementById('portalTopLink').addEventListener('click',(e)=>{e.preventDefault(); showAppView(); renderAuthState();});
document.getElementById('portalFooterLink').addEventListener('click',(e)=>{e.preventDefault(); showAppView(); renderAuthState();});
document.getElementById('appCloseBtn').addEventListener('click', hideAppView);
document.getElementById('appHomeLink').addEventListener('click',(e)=>{e.preventDefault(); hideAppView();});

function renderAuthState(){
  document.getElementById('authScreen').style.display = sessionData ? 'none' : 'block';
  document.getElementById('patientScreen').style.display = (sessionData && sessionData.role==='patient') ? 'block' : 'none';
  document.getElementById('doctorScreen').style.display = (sessionData && sessionData.role==='doctor') ? 'block' : 'none';
  document.getElementById('adminScreen').style.display = (sessionData && sessionData.role==='admin') ? 'block' : 'none';
  const chip = document.getElementById('roleChip');
  const logoutBtn = document.getElementById('logoutBtn');
  if (sessionData){
    chip.style.display='inline-flex'; chip.textContent = sessionData.role;
    logoutBtn.style.display='inline-flex';
  } else { chip.style.display='none'; logoutBtn.style.display='none'; }
}

/* Role toggle in login form */
let loginRole = 'patient';
document.querySelectorAll('.role-toggle button').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.role-toggle button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    loginRole = btn.dataset.role;
    document.getElementById('loginSpecWrap').style.display = loginRole==='doctor' ? 'block':'none';
    document.getElementById('loginBranchWrap').style.display = loginRole!=='patient' ? 'block':'none';
  });
});
document.querySelectorAll('.demo-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const role = btn.dataset.demo;
    if (role==='patient') startSession({role:'patient', name:'Thandiwe Nkosi', email:'thandiwe.demo@example.com', branch:'Sandton, Gauteng'});
    if (role==='doctor') startSession({role:'doctor', name:'Dr. Amara Reyes', email:'amara.reyes@healthvillage24.co.za', spec:'Cardiology', branch:'Sandton, Gauteng', doctorId:'amara-reyes'});
    if (role==='admin') startSession({role:'admin', name:'Clinic Admin', email:'admin@healthvillage24.co.za'});
  });
});
document.getElementById('loginForm').addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = document.getElementById('loginName').value.trim();
  const email = document.getElementById('loginEmail').value.trim();
  if (!name || !email) return;
  if (loginRole==='patient') startSession({role:'patient', name, email, branch:'Sandton, Gauteng'});
  else if (loginRole==='doctor') startSession({role:'doctor', name, email, spec:document.getElementById('loginSpec').value, branch:document.getElementById('loginBranch').value, doctorId:name.toLowerCase().replace(/[^a-z]+/g,'-')});
  else startSession({role:'admin', name, email});
});
function startSession(s){
  sessionData = s;
  renderAuthState();
  toast('Signed in as '+s.name+' ('+s.role+').');
  if (s.role==='patient') initPatientScreen();
  if (s.role==='doctor') initDoctorScreen();
  if (s.role==='admin') initAdminScreen();
}
document.getElementById('logoutBtn').addEventListener('click', ()=>{ sessionData=null; renderAuthState(); toast('Logged out.'); });

/* Dashboard side-nav switching (shared behavior) */
document.querySelectorAll('.dash-nav').forEach(nav=>{
  nav.addEventListener('click', (e)=>{
    const btn = e.target.closest('button[data-panel]');
    if (!btn) return;
    nav.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const root = nav.closest('.dash-grid');
    root.querySelectorAll('.panel').forEach(p=>{ p.style.display = (p.dataset.content===btn.dataset.panel) ? 'block':'none'; });
  });
  // initialize: show first panel only
  const root = nav.closest('.dash-grid');
  const panels = root.querySelectorAll('.panel');
  panels.forEach((p,i)=>{ p.style.display = i===0 ? 'block':'none'; });
});

/* ---------- Patient screen ---------- */
async function initPatientScreen(){
  document.getElementById('pName').textContent = sessionData.name;
  document.getElementById('pAvatar').textContent = sessionData.name.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
  document.getElementById('pHomeBranch').textContent = sessionData.branch || '—';
  await refreshPatientHistory();
}
document.getElementById('pBookForm').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const rec = {
    id: Date.now()+Math.random(), name: sessionData.name, email: sessionData.email, phone:'—',
    branch: document.getElementById('pBranch').value, department: document.getElementById('pDept').value,
    date: document.getElementById('pDate').value, reason: document.getElementById('pReason').value,
    status:'confirmed', createdAt: new Date().toISOString()
  };
  const list = await getList('appointments', true);
  list.unshift(rec);
  await Store.set('appointments', list, true);
  await logNotification('Email', rec.email, 'Appointment confirmed for '+rec.department+' at '+rec.branch+' on '+rec.date+'.');
  toast('Appointment saved to your history.');
  e.target.reset();
  await refreshPatientHistory();
});
async function refreshPatientHistory(){
  const all = await getList('appointments', true);
  const mine = all.filter(a => a.email && sessionData.email && a.email.toLowerCase()===sessionData.email.toLowerCase());
  document.getElementById('pTotalCount').textContent = mine.length;
  const today = new Date().toISOString().slice(0,10);
  document.getElementById('pUpcomingCount').textContent = mine.filter(a=>a.date >= today).length;
  const wrap = document.getElementById('pHistoryTableWrap');
  if (!mine.length){ wrap.innerHTML = '<div class="empty-note">No visits yet — book your first appointment.</div>'; return; }
  wrap.innerHTML = `<table class="data-table"><thead><tr><th>Date</th><th>Department</th><th>Branch</th><th>Status</th></tr></thead><tbody>
    ${mine.map(a=>`<tr><td>${a.date||'—'}</td><td>${a.department}</td><td>${a.branch}</td><td><span class="pill ${a.status}">${a.status}</span></td></tr>`).join('')}
  </tbody></table>`;
}

/* ---------- Doctor screen ---------- */
async function initDoctorScreen(){
  document.getElementById('dName').textContent = sessionData.name;
  document.getElementById('dAvatar').textContent = sessionData.name.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
  document.getElementById('dSpec').textContent = sessionData.spec+' · '+sessionData.branch;
  await refreshDutyBox();
  await refreshDoctorRosterView();
  await refreshDoctorAppts();
}
async function refreshDutyBox(){
  const roster = await getRoster();
  let mine = roster.find(d=>d.id===sessionData.doctorId);
  if (!mine){
    mine = {id:sessionData.doctorId, name:sessionData.name, spec:sessionData.spec, branch:sessionData.branch, years:0, rating:5.0, initials:sessionData.name.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase(), photo:'', color:'linear-gradient(135deg,#0E7490,#073B4C)', status:'off-duty', since:null};
    roster.push(mine);
    await setRoster(roster);
  }
  const box = document.getElementById('dutyToggleBox');
  const on = mine.status==='on-duty';
  box.classList.toggle('on', on);
  document.getElementById('dutyLabel').textContent = on ? 'On duty' : 'Off duty';
  document.getElementById('dutySince').textContent = mine.since ? ('Since '+new Date(mine.since).toLocaleTimeString()) : 'Not checked in yet';
  document.getElementById('dutyBtn').textContent = on ? 'Check Out' : 'Check In';
}
document.getElementById('dutyBtn').addEventListener('click', async ()=>{
  const roster = await getRoster();
  const mine = roster.find(d=>d.id===sessionData.doctorId);
  if (!mine) return;
  const goingOn = mine.status !== 'on-duty';
  mine.status = goingOn ? 'on-duty' : 'off-duty';
  mine.since = goingOn ? new Date().toISOString() : null;
  await setRoster(roster);
  await refreshDutyBox();
  renderDoctorGrid();
  toast(goingOn ? "Checked in — you're now visible as on duty." : 'Checked out — see you next shift.');
});
async function refreshDoctorRosterView(){
  const roster = await getRoster();
  const el = document.getElementById('dRosterList');
  el.innerHTML = roster.map(d=>`<div class="roster-row"><span>${d.name} · ${d.spec} (${d.branch})</span>${statusPillHtml(d.status)}</div>`).join('');
}
async function refreshDoctorAppts(){
  const all = await getList('appointments', true);
  const mine = all.filter(a=>a.department===sessionData.spec);
  const wrap = document.getElementById('dApptTableWrap');
  if (!mine.length){ wrap.innerHTML='<div class="empty-note">No bookings yet for this department.</div>'; return; }
  wrap.innerHTML = `<table class="data-table"><thead><tr><th>Patient</th><th>Date</th><th>Branch</th><th>Status</th></tr></thead><tbody>
    ${mine.map(a=>`<tr><td>${a.name}</td><td>${a.date||'—'}</td><td>${a.branch}</td><td><span class="pill ${a.status}">${a.status}</span></td></tr>`).join('')}
  </tbody></table>`;
}

/* ---------- Admin screen ---------- */
async function initAdminScreen(){
  document.getElementById('aName').textContent = sessionData.name;
  document.getElementById('aAvatar').textContent = 'A';
  await refreshAdminAlerts();
  await refreshAdminAppts();
  await refreshAdminRoster();
  await refreshAdminNotif();
}
async function refreshAdminAlerts(){
  const alerts = await getList('emergency-alerts', true);
  const wrap = document.getElementById('aAlertTableWrap');
  if (!alerts.length){ wrap.innerHTML='<div class="empty-note">No alerts logged yet.</div>'; return; }
  wrap.innerHTML = `<table class="data-table"><thead><tr><th>Time</th><th>Patient</th><th>Location</th><th>Nearest Branch</th><th>Status</th><th></th></tr></thead><tbody>
    ${alerts.map(a=>`<tr>
      <td>${new Date(a.ts).toLocaleString()}</td>
      <td>${a.patient}</td>
      <td>${a.lat? a.lat.toFixed(4)+', '+a.lng.toFixed(4) : (a.geoError||'Unavailable')}</td>
      <td>${a.nearestBranch || '—'}${a.distanceKm? ' ('+a.distanceKm+' km)':''}</td>
      <td><span class="pill ${a.status==='open'?'open':'resolved'}">${a.status}</span></td>
      <td>${a.status==='open' ? `<button class="mini-btn" data-resolve="${a.id}">Mark resolved</button>` : ''}</td>
    </tr>`).join('')}
  </tbody></table>`;
  wrap.querySelectorAll('[data-resolve]').forEach(b=>b.addEventListener('click', async ()=>{
    const id = parseFloat(b.dataset.resolve);
    const list = await getList('emergency-alerts', true);
    const item = list.find(a=>a.id===id);
    if (item) item.status='resolved';
    await Store.set('emergency-alerts', list, true);
    toast('Alert marked resolved.');
    refreshAdminAlerts();
  }));
}
async function refreshAdminAppts(){
  const all = await getList('appointments', true);
  const wrap = document.getElementById('aApptTableWrap');
  if (!all.length){ wrap.innerHTML='<div class="empty-note">No appointments yet.</div>'; return; }
  wrap.innerHTML = `<table class="data-table"><thead><tr><th>Patient</th><th>Email</th><th>Dept</th><th>Branch</th><th>Date</th><th>Status</th></tr></thead><tbody>
    ${all.map(a=>`<tr><td>${a.name}</td><td>${a.email||'—'}</td><td>${a.department}</td><td>${a.branch}</td><td>${a.date||'—'}</td><td><span class="pill ${a.status}">${a.status}</span></td></tr>`).join('')}
  </tbody></table>`;
}
async function refreshAdminRoster(){
  const roster = await getRoster();
  document.getElementById('aRosterList').innerHTML = roster.map(d=>`<div class="roster-row"><span>${d.name} · ${d.spec} (${d.branch})</span>${statusPillHtml(d.status)}</div>`).join('');
}
async function refreshAdminNotif(){
  const list = await getList('notifications', true);
  const wrap = document.getElementById('aNotifTableWrap');
  if (!list.length){ wrap.innerHTML='<div class="empty-note">No notifications yet.</div>'; return; }
  wrap.innerHTML = `<table class="data-table"><thead><tr><th>Time</th><th>Type</th><th>To</th><th>Message</th></tr></thead><tbody>
    ${list.slice(0,40).map(n=>`<tr><td>${new Date(n.ts).toLocaleTimeString()}</td><td>${n.type}</td><td>${n.to}</td><td>${n.message}</td></tr>`).join('')}
  </tbody></table>`;
}

/* ================= CHAT ASSISTANT ================= */
const chatPanel = document.getElementById('chatPanel');
const chatBody = document.getElementById('chatBody');
document.getElementById('chatOpenBtn').addEventListener('click', ()=>{
  chatPanel.classList.toggle('show');
  if (chatPanel.classList.contains('show') && !chatBody.dataset.greeted){
    addChatMsg('bot', "Hi, I'm the Health Village 24 assistant. I can help with opening hours, branches, booking, or medical aid billing. For a medical emergency, please use the SOS button instead, or call 10177 / 112.");
    chatBody.dataset.greeted = '1';
  }
});
document.getElementById('chatCloseBtn').addEventListener('click', ()=>chatPanel.classList.remove('show'));
function addChatMsg(who, text){
  const el = document.createElement('div');
  el.className = 'msg '+who;
  el.textContent = text;
  chatBody.appendChild(el);
  chatBody.scrollTop = chatBody.scrollHeight;
}
function ruleBasedReply(msg){
  const m = msg.toLowerCase();
  if (/(emergen|urgent|dying|chest pain|can'?t breathe|bleeding)/.test(m)) return "If this is a medical emergency, please use the red SOS button on this page now, or call 10177 / 112 immediately — I can't dispatch help through chat.";
  if (/(hour|open|close|time)/.test(m)) return "Sandton is at 134 Grayston Drive and Polokwane is at 54A Thabo Mbeki Street. Use the location cards for Google Maps directions.";
  if (/(book|appointment|schedule)/.test(m)) return "You can book directly on this page in the 'Book an Appointment' section, or log in to the Patient Portal to book and see your visit history.";
  if (/(location|address|where|sandton|polokwane|branch)/.test(m)) return "We have two branches: Sandton, Gauteng (134 Grayston Drive) and Polokwane, Limpopo (54A Thabo Mbeki Street). Both listed under 'Locations' above.";
  if (/(insur|medical aid|bill|pay|cost)/.test(m)) return "We offer direct billing with most major medical aid schemes. Bring your medical aid card and ID to your first visit.";
  if (/(doctor|available|on duty)/.test(m)) return "Check the 'Doctors On Duty' section on this page — it updates live as doctors check in and out for their shift.";
  if (/(thank|thanks)/.test(m)) return "You're welcome! Anything else I can help with?";
  return "I can help with hours, branches, booking, medical aid billing, or doctor availability — what would you like to know? For emergencies, please use the SOS button.";
}
async function tryAiReply(userText){
  try{
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 300,
        system: "You are the Health Village 24 Clinic website assistant (Sandton, Gauteng and Polokwane, Limpopo, South Africa). Only answer questions about clinic hours, locations, booking, medical aid billing, and general non-diagnostic guidance. Never diagnose or give specific medical/dosage advice. For anything urgent or emergency-sounding, tell the user to use the SOS button on the page or call 10177 / 112 immediately. Keep replies under 60 words.",
        messages: [{ role: "user", content: userText }]
      })
    });
    if (!response.ok) throw new Error('bad status');
    const data = await response.json();
    const textBlock = (data.content||[]).find(b=>b.type==='text');
    if (textBlock && textBlock.text) return textBlock.text;
    throw new Error('no text');
  }catch(e){ return null; }
}
async function handleChatSend(){
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  addChatMsg('user', text);
  input.value='';
  const typing = document.createElement('div');
  typing.className='msg bot'; typing.textContent='…'; chatBody.appendChild(typing); chatBody.scrollTop=chatBody.scrollHeight;
  const aiReply = await tryAiReply(text);
  typing.remove();
  addChatMsg('bot', aiReply || ruleBasedReply(text));
}
document.getElementById('chatSendBtn').addEventListener('click', handleChatSend);
document.getElementById('chatInput').addEventListener('keydown', (e)=>{ if(e.key==='Enter') handleChatSend(); });

/* Init */
hydrateStaticIcons();
renderAuthState();
