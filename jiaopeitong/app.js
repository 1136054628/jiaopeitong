/* ============================================================
   教培通 · 教培行业手机工作台（纯本地单机版）
   数据保存在浏览器 localStorage，无需服务器。
   ============================================================ */

const P = 'jpt:';

/* ---------------- 常量 ---------------- */
const SUBJECTS = ['数学','语文','英语','物理','化学','生物','历史','地理','政治','编程','美术','音乐','书法','围棋'];
const GRADES = ['一年级','二年级','三年级','四年级','五年级','六年级','初一','初二','初三','高一','高二','高三'];
const CLASS_TYPES = ['一对一','一对二','小班','中班','大班','晚托','寒暑假班'];
const STU_TAGS = ['试听','正式','续费意向'];
const COMM_TYPES = ['通话','面谈','微信'];
const NOTICE_TYPES = ['作业通知','放假通知','缴费提醒','活动通知'];
const VISIT_STATUS = ['待回访','已完成','已取消'];
const FEED_STATUS = ['待处理','处理中','已结案'];
const SESSION_TYPES = ['正常','调课','补课'];
const IMPORT_TYPES = ['学生信息','成绩','课表','老师信息'];

const AV_COLORS = ['#0033A0','#0E7C66','#7A4BD6','#E8890C','#D6457C','#2B6BE0','#12A150','#C4453C'];
const AV_COLORS_T = ['#0033A0','#0E7C66','#7A4BD6','#C4453C'];

/* ---------------- 图标 ---------------- */
const ICONS = {
  home: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none"><path d="M3 10.5 12 3l9 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 9.5V20h14V9.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 20v-5h4v5" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
  students: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none"><circle cx="12" cy="8" r="3.5" stroke="currentColor" stroke-width="2"/><path d="M5 20c0-3.3 3.1-5 7-5s7 1.7 7 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  classes: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none"><circle cx="9" cy="8.5" r="3" stroke="currentColor" stroke-width="2"/><circle cx="16.5" cy="9.5" r="2.3" stroke="currentColor" stroke-width="2"/><path d="M3.5 19c0-2.8 2.4-4.5 5.5-4.5s5.5 1.7 5.5 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M14.5 15.4c1.9-.6 6 .1 6 3.1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  schedule: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none"><rect x="3.5" y="5" width="17" height="15.5" rx="3" stroke="currentColor" stroke-width="2"/><path d="M3.5 9.5h17M8 3v4M16 3v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  comms: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none"><path d="M21 12a8 8 0 0 1-8 8H4l2.5-2.5A8 8 0 1 1 21 12Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
  teachers: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none"><rect x="4" y="3.5" width="16" height="17" rx="3" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="10" r="2.8" stroke="currentColor" stroke-width="2"/><path d="M8.5 16.5c0-1.7 1.6-2.7 3.5-2.7s3.5 1 3.5 2.7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  import: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none"><path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 15v3.5A2.5 2.5 0 0 0 6.5 21h11a2.5 2.5 0 0 0 2.5-2.5V15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  search: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none"><circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="2"/><path d="m16 16 4.5 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  plus: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  back: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none"><path d="M15 5l-7 7 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  chev: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="m9 5 7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  edit: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none"><path d="M4 20h4L19.5 8.5a2 2 0 0 0-3-3L5 17v3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M13.5 6.5l3 3" stroke="currentColor" stroke-width="1.8"/></svg>',
  trash: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none"><path d="M4 7h16M9 7V4h6v3M6.5 7l1 13h9l1-13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  clock: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none"><circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="2"/><path d="M12 7.5V12l3 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  close: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  download: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M12 4v11m0 0 4-4m-4 4-4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 17v2.5A1.5 1.5 0 0 0 5.5 21h13a1.5 1.5 0 0 0 1.5-1.5V17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  note: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none"><rect x="4" y="3.5" width="16" height="17" rx="2.5" stroke="currentColor" stroke-width="2"/><path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  wallet: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none"><rect x="3.5" y="5.5" width="17" height="13" rx="3" stroke="currentColor" stroke-width="2"/><path d="M15 12h5M3.5 9h5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  chart: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M4 20V9M10 20V4M16 20v-7M22 20H2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  star: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.6 1-5.8L3.5 9.7l5.9-.9Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
  megaphone: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M3 11v2l4 1v5a2 2 0 0 0 4 0v-2.5L20 20V4L11 8" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
  bell: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M10 20a2 2 0 0 0 4 0" stroke="currentColor" stroke-width="2"/></svg>',
};

/* ---------------- 工具 ---------------- */
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function pad(n){ return String(n).padStart(2,'0'); }
function dstr(d){ return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate()); }
function today(){ return dstr(new Date()); }
function daysAgo(n){ const d=new Date(); d.setDate(d.getDate()-n); return dstr(d); }
function money(n){ n=Number(n)||0; return '¥'+n.toLocaleString('zh-CN',{maximumFractionDigits:2}); }
function shortNum(n){ n=Number(n)||0; if(n>=10000) return (n/10000).toFixed(1)+'万'; if(n>=1000) return (n/1000).toFixed(1)+'k'; return String(n); }
function uid(){ return 'id'+Date.now().toString(36)+Math.random().toString(36).slice(2,7); }
function avColor(name, pal=AV_COLORS){ let h=0; for(const c of String(name||'')) h=(h*31 + c.codePointAt(0))>>>0; return pal[h%pal.length]; }
function initial(name){ const s=String(name||'').trim(); return s ? s[0] : '?'; }
function toArr(v){ return String(v||'').split(',').map(s=>s.trim()).filter(Boolean); }
function sum(arr, f){ return arr.reduce((a,x)=>a+(Number(f?f(x):x)||0),0); }

/* ---------------- 数据层 ---------------- */
const db = {
  get(name, d=[]){ try { const v = localStorage.getItem(P+name); return v ? JSON.parse(v) : d; } catch(e){ return d; } },
  set(name, val){ localStorage.setItem(P+name, JSON.stringify(val)); },
};
const coll = {
  students: ()=>db.get('students'), teachers: ()=>db.get('teachers'), classes: ()=>db.get('classes'),
  sessions: ()=>db.get('sessions'), consumptions: ()=>db.get('consumptions'), recharges: ()=>db.get('recharges'),
  salaries: ()=>db.get('salaries'), fees: ()=>db.get('fees'), comms: ()=>db.get('comms'),
  notices: ()=>db.get('notices'), visits: ()=>db.get('visits'), feedbacks: ()=>db.get('feedbacks'), imports: ()=>db.get('imports'),
  evaluations: ()=>db.get('evaluations'),
};
function saveColl(name, arr){ db.set(name, arr); }
function studentById(id){ return coll.students().find(x=>x.id===id); }
function teacherById(id){ return coll.teachers().find(x=>x.id===id); }
function classById(id){ return coll.classes().find(x=>x.id===id); }
function sName(id){ return studentById(id)?.name || '已删除'; }
function tName(id){ return teacherById(id)?.name || '未指定'; }
function cName(id){ return classById(id)?.name || '未分班'; }
function studentClasses(s){ return (s.classIds||[]).map(id=>classById(id)).filter(Boolean); }
function settings(){ return db.get('settings', {name:'我的教培机构'}); }
function teacherRates(t){ return (t.rates||[]).filter(r=>r.rate>0); }
function rateOf(t, subject){
  const rs = teacherRates(t);
  if (!rs.length) return 0;
  if (subject){ const m = rs.find(r=>r.subject===subject); if (m) return m.rate; }
  return rs[0].rate;
}
function expectedPay(t){
  return sum(coll.consumptions().filter(c=>c.teacherId===t.id), c => (c.hours||0) * rateOf(t, studentById(c.studentId)?.subjects?.[0] || ''));
}

/* ---------------- 数据初始化（默认空数据） ---------------- */
const EMPTY_COLLS = ['students','teachers','classes','consumptions','recharges','salaries','fees','comms','notices','visits','feedbacks','sessions','imports','evaluations'];
function seed(){
  // 旧版内置示例数据的残留标志：若存在则清空，保证从空白开始
  if (localStorage.getItem(P+'seeded')){
    EMPTY_COLLS.forEach(k => db.set(k, []));
    db.set('settings', {name:'我的教培机构'});
    localStorage.removeItem(P+'seeded');
    return;
  }
  // 首次打开：初始化空集合与默认设置
  if (!localStorage.getItem(P+'inited')){
    EMPTY_COLLS.forEach(k => db.set(k, []));
    db.set('settings', {name:'我的教培机构'});
    localStorage.setItem(P+'inited', '1');
  }
}

/* ---------------- 全局状态 ---------------- */
const SECTIONS = [
  {key:'home', name:'工作台首页', short:'首页', icon:'home', desc:'学生 · 老师 · 记录 · 报表'},
  {key:'students', name:'学生管理', short:'学生', icon:'students', desc:'档案 · 消课 · 费用 · 课时'},
  {key:'teachers', name:'老师管理', short:'老师', icon:'teachers', desc:'档案 · 薪酬 · 课时'},
  {key:'schedule', name:'课表', short:'课表', icon:'schedule', desc:'学生课表 · 教师课表 · 排课'},
];

let S = { section:'home', tab:'', recTab:'consume', reportPeriod:'month', statPeriod:'all', view:'student', sel:null, detail:null };
const DEFAULT_TAB = { students:'roster', teachers:'roster', schedule:'multi' };

/* ---------------- 骨架渲染 ---------------- */
function renderBottomNav(){
  $('#bottomNav').innerHTML = SECTIONS.map(sec => `
    <div class="bn-item ${S.section===sec.key && !S.detail ? 'active':''}" data-nav="${sec.key}">
      <span class="bn-ico">${ICONS[sec.icon]}</span>
      <span class="bn-label">${sec.short}</span>
    </div>`).join('');
}
function updateTopbar(){
  const sec = SECTIONS.find(x=>x.key===S.section);
  $('#topbarBrand').style.visibility = S.detail ? 'hidden' : 'visible';
  const act = $('#topbarAction');
  if (S.detail){ act.style.visibility='hidden'; return; }
  const quickAdd = {students:'add-student', teachers:'add-teacher', schedule:'add-session'}[S.section];
  if (quickAdd){ act.style.visibility='visible'; act.dataset.action = quickAdd; act.innerHTML = ICONS.plus; }
  else { act.style.visibility='hidden'; }
}

function render(){
  renderBottomNav(); updateTopbar();
  const main = $('#main');
  if (S.detail){ main.innerHTML = renderDetail(); }
  else { main.innerHTML = RENDER[S.section](); }
  afterRender();
}

/* ---------------- 子标签 / 分段控件 ---------------- */
function tabBar(tabs, current, sec){ // tabs: [{k,label}]
  return `<div class="tabs">${tabs.map(t=>`<button class="tab ${current===t.k?'active':''}" data-action="set-tab" data-sec="${sec}" data-tab="${t.k}">${t.label}</button>`).join('')}</div>`;
}
function segBar(items, current, action){ // items: [{k,label}]
  return `<div class="tabs">${items.map(t=>`<button class="tab ${current===t.k?'active':''}" data-action="${action}" data-key="${t.k}">${t.label}</button>`).join('')}</div>`;
}

/* ---------------- 通用片段 ---------------- */
function searchBar(target){
  return `<div class="searchbar">${ICONS.search}<input class="input" placeholder="搜索…" data-search="${target}"></div>`;
}
function emptyBox(txt, icon='🗂️'){ return `<div class="empty"><div class="empty-ico">${icon}</div><div class="empty-txt">${txt}</div></div>`; }
function tagChips(tags){
  const map = {'试听':'amber','正式':'green','续费意向':'blue','欠费':'red','待缴':'amber','已缴':'green','待回访':'amber','已完成':'green','已取消':'gray','待处理':'amber','处理中':'blue','已结案':'green','待上':'blue','已上':'green','已取消':'gray','未结算':'amber','已结算':'green','正常':'gray','调课':'blue','补课':'amber','在职':'green','离职':'gray','进行中':'green','已结课':'gray'};
  return (tags||[]).map(t=>`<span class="chip ${map[t]||'gray'}">${esc(t)}</span>`).join('');
}
function backRow(label, action){ return `<button class="back-btn" data-action="${action}">${ICONS.back}<span>${label}</span></button>`; }

function avatarHtml(id, name, size){ return `<span class="li-avatar" style="width:${size||44}px;height:${size||44}px;font-size:${(size||44)*0.38}px;background:${avColor(name)}">${esc(initial(name))}</span>`; }

/* ============================================================
   首页
   ============================================================ */
function renderHome(){
  const st = coll.students(), tc = coll.teachers(), org = settings().name;
  const lowH = st.filter(s=>s.remainingHours<=3 && s.remainingHours>0).length;

  const stuCards = st.length ? `<div class="card-scroll">${st.map(s=>{
    const tip = s.remainingHours<=0 ? '课时已用完，请续费' : s.remainingHours<=3 ? '剩余课时不足，及时续费' : '状态正常，继续加油';
    return `<div class="p-card" data-action="go-student" data-id="${s.id}">
      <span class="p-avatar" style="background:${avColor(s.name)}">${esc(initial(s.name))}</span>
      <div class="p-name">${esc(s.name)}</div>
      <div class="p-hours">剩余 ${s.remainingHours} 课时</div>
      <div class="p-class">${esc((s.subjects||[]).join('、')||'—')}</div>
      <div class="p-tip">💡 ${tip}</div>
    </div>`; }).join('')}</div>` : emptyBox('还没有学生，去「学生管理」添加');

  const teaCards = tc.length ? `<div class="card-scroll">${tc.map(t=>{
    const hours = sum(coll.consumptions().filter(c=>c.teacherId===t.id), x=>x.hours);
    return `<div class="p-card" data-action="go-teacher" data-id="${t.id}">
      <span class="p-avatar" style="background:${avColor(t.name, AV_COLORS_T)}">${esc(initial(t.name))}</span>
      <div class="p-name">${esc(t.name)}</div>
      <div class="p-hours">累计 ${hours} 课时</div>
      <div class="p-class">${esc((t.subjects||[]).join(' · ')||'—')}</div>
      <div class="p-tip">💡 课时费 ${money(rateOf(t)||0)}/课时</div>
    </div>`; }).join('')}</div>` : emptyBox('还没有老师，去「老师管理」添加');

  return `
  <div class="page-head">
    <div class="page-title" data-action="edit-org">${esc(org)} <span style="font-size:13px;color:var(--ink-3)">✎</span></div>
    <div class="page-sub">${today()} · 欢迎使用教培通 · 点机构名可改名</div>
  </div>

  <div class="stat-grid cols-3 mb-12">
    <div class="stat"><div class="stat-label">学生总数</div><div class="stat-num blue">${st.length}</div></div>
    <div class="stat"><div class="stat-label">老师</div><div class="stat-num">${tc.length}</div></div>
    <div class="stat"><div class="stat-label">课时不足</div><div class="stat-num red">${lowH}</div></div>
  </div>

  <div class="card">
    <div class="card-head"><div class="card-title"><span class="dot"></span>学生</div><span class="card-extra" data-nav="students">查看全部 ›</span></div>
    ${stuCards}
  </div>

  <div class="card">
    <div class="card-head"><div class="card-title"><span class="dot"></span>老师</div><span class="card-extra" data-nav="teachers">查看全部 ›</span></div>
    ${teaCards}
  </div>

  <div class="card">
    <div class="card-head"><div class="card-title"><span class="dot"></span>记录</div></div>
    ${segBar([{k:'consume',label:'消课记录'},{k:'recharge',label:'充值记录'},{k:'salary',label:'工资发放'}], S.recTab, 'set-rectab')}
    ${searchBar('#recList')}
    <div id="recList">${renderRecords(S.recTab)}</div>
  </div>

  <div class="card">
    <div class="card-head"><div class="card-title"><span class="dot"></span>报表</div></div>
    ${segBar([{k:'day',label:'日'},{k:'week',label:'周'},{k:'month',label:'月'},{k:'year',label:'年'}], S.reportPeriod, 'set-report')}
    ${renderReport()}
  </div>`;
}

function renderRecords(tab){
  let rows = '';
  if (tab==='consume'){
    const arr = coll.consumptions().slice().sort((a,b)=>b.date.localeCompare(a.date));
    rows = arr.map(r=>`
      <div class="rec" data-searchable="${esc(sName(r.studentId))} 消课 学生">
        <span class="rec-ico" style="background:var(--blue-50)">🕐</span>
        <div class="rec-main">
          <div class="rec-name">${esc(sName(r.studentId))}</div>
          <div class="rec-meta">${r.date} · 学生 · ${tName(r.teacherId)}</div>
        </div>
        <div class="rec-val neg">-${r.hours} 课时</div>
      </div>`).join('');
    return rows || emptyBox('暂无消课记录');
  }
  if (tab==='recharge'){
    const arr = coll.recharges().slice().sort((a,b)=>b.date.localeCompare(a.date));
    rows = arr.map(r=>`
      <div class="rec" data-searchable="${esc(sName(r.studentId))} 充值 学生">
        <span class="rec-ico" style="background:var(--green-bg)">💰</span>
        <div class="rec-main">
          <div class="rec-name">${esc(sName(r.studentId))}</div>
          <div class="rec-meta">${r.date} · 学生 · ${esc(r.method||'')}${r.hours?' · +'+r.hours+'课时':''}</div>
        </div>
        <div class="rec-val pos">+${money(r.amount)}</div>
      </div>`).join('');
    return rows || emptyBox('暂无充值记录');
  }
  const arr = coll.salaries().slice().sort((a,b)=>b.date.localeCompare(a.date));
  rows = arr.map(r=>`
    <div class="rec" data-searchable="${esc(tName(r.teacherId))} 工资 老师">
      <span class="rec-ico" style="background:var(--amber-bg)">💳</span>
      <div class="rec-main">
        <div class="rec-name">${esc(tName(r.teacherId))}</div>
        <div class="rec-meta">${r.date} · 老师 · ${esc(r.status)}</div>
      </div>
      <div class="rec-val neg">-${money(r.amount)}</div>
    </div>`).join('');
  return rows || emptyBox('暂无工资记录');
}

function reportSeries(period){
  let buckets = [];
  const now = new Date();
  if (period==='day'){ for(let i=6;i>=0;i--){ const d=new Date(now); d.setDate(d.getDate()-i); buckets.push({k:dstr(d), label:(d.getMonth()+1)+'/'+d.getDate()}); } }
  else if (period==='week'){ for(let i=7;i>=0;i--){ const d=new Date(now); d.setDate(d.getDate()-i*7); const mon=new Date(d); mon.setDate(d.getDate()-((d.getDay()+6)%7)); buckets.push({k:dstr(mon), label:(mon.getMonth()+1)+'/'+mon.getDate()}); } }
  else if (period==='month'){ for(let i=11;i>=0;i--){ const d=new Date(now.getFullYear(), now.getMonth()-i, 1); buckets.push({k:d.getFullYear()+'-'+pad(d.getMonth()+1), label:(d.getMonth()+1)+'月'}); } }
  else { const y=now.getFullYear(); for(let i=4;i>=0;i--){ buckets.push({k:String(y-i), label:String(y-i)}); } }
  const income = buckets.map(()=>0), expense = buckets.map(()=>0);
  const belongs = (date,k)=>{ if(!date) return false; if(period==='day'||period==='week') return date===k; if(period==='month') return date.slice(0,7)===k; return date.slice(0,4)===k; };
  const idx = date => buckets.findIndex(b=>belongs(date,b.k));
  coll.recharges().forEach(r=>{ const i=idx(r.date); if(i>=0) income[i]+=Number(r.amount)||0; });
  coll.fees().forEach(f=>{ if(['报名','缴费','续费'].includes(f.type)){ const i=idx(f.date); if(i>=0) income[i]+=Number(f.amount)||0; } });
  coll.salaries().forEach(r=>{ const i=idx(r.date); if(i>=0) expense[i]+=Number(r.amount)||0; });
  return {labels:buckets.map(b=>b.label), income, expense};
}

function renderReport(){
  const s = reportSeries(S.reportPeriod);
  const max = Math.max(1, ...s.income, ...s.expense);
  const h = v => Math.round(v/max*86) + (v>0?3:0);
  const totalIn = sum(s.income), totalOut = sum(s.expense);
  const bars = s.labels.map((lb,i)=>`
    <div class="bar">
      <div class="bar-pair">
        <div class="bar-col"><div class="bar-num">${s.income[i]?shortNum(s.income[i]):''}</div><div class="bar-fill income" style="height:${h(s.income[i])}px"></div></div>
        <div class="bar-col"><div class="bar-num">${s.expense[i]?shortNum(s.expense[i]):''}</div><div class="bar-fill expense" style="height:${h(s.expense[i])}px"></div></div>
      </div>
      <div class="bar-label">${lb}</div>
    </div>`).join('');
  return `
    <div class="stat-grid mb-12">
      <div class="stat"><div class="stat-label">收入</div><div class="stat-num green">${money(totalIn)}</div></div>
      <div class="stat"><div class="stat-label">支出</div><div class="stat-num red">${money(totalOut)}</div></div>
    </div>
    <div class="bars">${bars}</div>
    <div class="legend">
      <span class="lg"><i style="background:var(--green)"></i>收入</span>
      <span class="lg"><i style="background:var(--amber)"></i>支出</span>
    </div>`;
}

/* ============================================================
   学生管理
   ============================================================ */
function renderStudents(){
  const tabs = [{k:'roster',label:'学生档案'},{k:'consume',label:'消课'},{k:'fee',label:'费用'},{k:'stat',label:'课时统计'}];
  return `<div class="page">
    <div class="page-head"><div class="page-title">学生管理</div><div class="page-sub">档案 · 消课 · 费用 · 课时统计</div></div>
    ${tabBar(tabs, S.tab, 'students')}
    ${S.tab==='consume' ? renderConsume() : S.tab==='fee' ? renderFee() : S.tab==='stat' ? renderHoursStat('student') : renderRoster()}
  </div>`;
}

function renderRoster(){
  const st = coll.students();
  const list = st.length ? `<div class="list" id="stuList">${st.map(s=>`
    <button class="list-item" data-action="go-student" data-id="${s.id}" data-searchable="${esc(s.name)} ${esc((s.subjects||[]).join(' '))}">
      ${avatarHtml(s.id, s.name)}
      <span class="li-main">
        <span class="li-title">${esc(s.name)}</span>
        <span class="li-sub">${esc((s.subjects||[]).join('、')||'—')} · ${esc(s.phone||'')}</span>
      </span>
      <span class="li-side"><div class="big blue">${s.remainingHours}</div><div class="small">剩余课时</div></span>
    </button>`).join('')}</div>` : emptyBox('暂无学生，点击右上角添加');
  return `${searchBar('#stuList')}
    <div class="row gap-8 mb-12">
      <button class="btn primary block" data-action="add-student">${ICONS.plus}添加学生</button>
    </div>
    ${list}`;
}

function renderConsume(){
  const st = coll.students();
  return `<p class="small muted mb-12">选择学生进行手动消课：</p>
    ${searchBar('#consumeList')}
    ${st.length ? `<div class="list" id="consumeList">${st.map(s=>`
      <button class="list-item" data-action="consume-student" data-id="${s.id}" data-searchable="${esc(s.name)} ${esc((s.subjects||[]).join(' '))}">
        ${avatarHtml(s.id, s.name)}
        <span class="li-main"><span class="li-title">${esc(s.name)}</span><span class="li-sub">${esc((s.subjects||[]).join('、')||'—')} · 剩余 ${s.remainingHours} 课时</span></span>
        <span class="li-side">${ICONS.chev}</span>
      </button>`).join('')}</div>` : emptyBox('暂无学生')}`;
}

function renderFee(){
  const fees = coll.fees().slice().sort((a,b)=>b.date.localeCompare(a.date));
  return `<div class="row gap-8 mb-12">
      <button class="btn primary block" data-action="add-fee">${ICONS.plus}手动添加费用</button>
    </div>
    ${fees.length ? `<div class="list">${fees.map(f=>`
      <div class="list-item" data-searchable="${esc(sName(f.studentId))} ${esc(f.type)} ${esc(f.status)}">
        <span class="li-avatar" style="background:${f.type==='欠费'?'var(--red)':'var(--green)'}">${esc(f.type[0])}</span>
        <span class="li-main">
          <span class="li-title">${esc(sName(f.studentId))} ${tagChips([f.type, f.status])}</span>
          <span class="li-sub">${f.date} · ${esc(f.note||'')}</span>
        </span>
        <span class="li-side"><div class="big" style="color:${f.type==='欠费'?'var(--red)':'var(--green)'}">${money(f.amount)}</div></span>
        <span data-action="del-fee" data-id="${f.id}" style="color:var(--ink-3);flex:none">${ICONS.trash}</span>
      </div>`).join('')}</div>` : emptyBox('暂无费用记录，点击上方添加')}`;
}

/* ============================================================
   班级管理
   ============================================================ */
function renderClasses(){
  const tabs = [{k:'roster',label:'班级名册'},{k:'ops',label:'班级运营'},{k:'end',label:'结课管理'}];
  return `<div class="page">
    <div class="page-head"><div class="page-title">班级管理</div><div class="page-sub">名册 · 运营 · 结课</div></div>
    ${tabBar(tabs, S.tab, 'classes')}
    ${S.tab==='roster' ? renderClassRoster() : S.tab==='ops' ? renderClassOps() : renderClassEnd()}
  </div>`;
}

function renderClassRoster(){
  const cl = coll.classes();
  return `<div class="row gap-8 mb-12"><button class="btn primary block" data-action="add-class">${ICONS.plus}新建班级</button></div>
    ${cl.length ? `<div class="list" id="clsList">${cl.map(c=>`
      <button class="list-item" data-action="go-class" data-id="${c.id}" data-searchable="${esc(c.name)} ${esc(c.type)} ${esc(c.subject)} ${esc(tName(c.teacherId))}">
        <span class="li-avatar" style="background:${avColor(c.name)}">${esc(c.name[0])}</span>
        <span class="li-main">
          <span class="li-title">${esc(c.name)} ${tagChips([c.type, c.status])}</span>
          <span class="li-sub">${esc(c.subject)} · ${esc(tName(c.teacherId))} · ${esc(c.schedule||'')}</span>
          <span class="li-sub">学生 ${(c.studentIds||[]).length} 人</span>
        </span>
        <span class="li-side">${ICONS.chev}</span>
      </button>`).join('')}</div>` : emptyBox('暂无班级')}`;
}

function renderClassOps(){
  const cl = coll.classes();
  if (!cl.length) return emptyBox('暂无班级');
  return `<div class="list">${cl.map(c=>{
    const income = sum(coll.recharges().filter(r=>(studentById(r.studentId)?.classIds||[]).includes(c.id)), x=>x.amount);
    const students = (c.studentIds||[]).map(id=>studentById(id)).filter(Boolean);
    const renew = students.filter(s=>(s.tags||[]).includes('续费意向')).length;
    return `<button class="list-item" data-action="go-class" data-id="${c.id}">
      <span class="li-main"><span class="li-title">${esc(c.name)}</span><span class="li-sub">续费意向 ${renew} 人 · 累计充值 ${money(income)}</span></span>
      <span class="li-side"><div class="big blue">${students.length}</div><div class="small">在班学生</div></span>
    </button>`; }).join('')}</div>`;
}

function renderClassEnd(){
  const cl = coll.classes();
  if (!cl.length) return emptyBox('暂无班级');
  return `<div class="list">${cl.map(c=>{
    const cids = c.studentIds||[];
    const consumes = coll.consumptions().filter(x=>cids.includes(x.studentId));
    const hours = sum(consumes, x=>x.hours);
    const amount = sum(consumes, x=>x.amount);
    return `<div class="list-item">
      <span class="li-main"><span class="li-title">${esc(c.name)} ${tagChips([c.status])}</span><span class="li-sub">已消 ${hours} 课时 · 合计 ${money(amount)}</span></span>
      <span class="li-side"><span class="btn sm ${c.status==='进行中'?'danger':'light'}" data-action="end-class" data-id="${c.id}">${c.status==='进行中'?'结课':'已结课'}</span></span>
    </div>`; }).join('')}</div>`;
}

/* ============================================================
   课表
   ============================================================ */
function renderSchedule(){
  const tabs = [{k:'multi',label:'多维课表'},{k:'arrange',label:'排课调课'}];
  return `<div class="page">
    <div class="page-head"><div class="page-title">课表</div><div class="page-sub">学生课表 · 教师课表 · 排课</div></div>
    ${tabBar(tabs, S.tab, 'schedule')}
    ${S.tab==='arrange' ? renderArrange() : renderMultiSchedule()}
  </div>`;
}

function renderMultiSchedule(){
  if (S.sel) return renderSchedulePerson();
  return `${segBar([{k:'student',label:'学生课表'},{k:'teacher',label:'教师课表'}], S.view, 'set-view')}
    ${searchBar('#schList')}
    ${renderScheduleList()}`;
}

function renderScheduleList(){
  const sessions = coll.sessions();
  let html = '';
  if (S.view==='student'){
    const st = coll.students();
    html = st.length ? `<div class="list" id="schList">${st.map(s=>{
      const n = sessions.filter(x=>x.studentId===s.id).length;
      return `<button class="list-item" data-action="sel-person" data-kind="student" data-id="${s.id}" data-searchable="${esc(s.name)} ${esc((s.subjects||[]).join(' '))}">
        ${avatarHtml(s.id, s.name)}<span class="li-main"><span class="li-title">${esc(s.name)}</span><span class="li-sub">${esc((s.subjects||[]).join('、')||'—')} · 排课 ${n} 节</span></span><span class="li-side"><div class="big blue">${s.remainingHours}</div><div class="small">剩余课时</div></span>
      </button>`; }).join('')}</div>` : emptyBox('暂无学生');
  } else if (S.view==='teacher'){
    const tc = coll.teachers();
    html = tc.length ? `<div class="list" id="schList">${tc.map(t=>{
      const n = sessions.filter(x=>x.teacherId===t.id).length;
      return `<button class="list-item" data-action="sel-person" data-kind="teacher" data-id="${t.id}" data-searchable="${esc(t.name)} ${esc((t.subjects||[]).join(' '))}">
        <span class="li-avatar" style="background:${avColor(t.name,AV_COLORS_T)}">${esc(initial(t.name))}</span><span class="li-main"><span class="li-title">${esc(t.name)}</span><span class="li-sub">${esc((t.subjects||[]).join('、'))} · 排课 ${n} 节</span></span><span class="li-side">${ICONS.chev}</span>
      </button>`; }).join('')}</div>` : emptyBox('暂无老师');
  }
  return html;
}

function renderSchedulePerson(){
  const k = S.sel.kind, id = S.sel.id;
  let name='', sub='', color='#0033A0', sessions=[];
  if (k==='student'){ const s=studentById(id); if(!s){S.sel=null; return '';} name=s.name; sub=(s.subjects||[]).join('、')+' · 剩余 '+s.remainingHours+' 课时'; color=avColor(s.name); sessions=coll.sessions().filter(x=>x.studentId===id); }
  else { const t=teacherById(id); if(!t){S.sel=null; return '';} name=t.name; sub=(t.subjects||[]).join('、'); color=avColor(t.name,AV_COLORS_T); sessions=coll.sessions().filter(x=>x.teacherId===id); }
  sessions.sort((a,b)=>a.date.localeCompare(b.date));
  const totalH = sessions.filter(x=>x.status!=='已取消').length;
  return `${backRow('返回课表', 'clear-sel')}
    <div class="card text-center">
      <span class="li-avatar" style="width:56px;height:56px;font-size:22px;margin:0 auto 10px;background:${color}">${esc(initial(name))}</span>
      <div class="page-title" style="font-size:19px">${esc(name)}</div>
      <div class="page-sub">${esc(sub)}</div>
      <div class="stat-grid mt-12"><div class="stat"><div class="stat-label">排课节数</div><div class="stat-num blue">${sessions.length}</div></div><div class="stat"><div class="stat-label">已安排课时</div><div class="stat-num">${totalH*2} 课时</div></div></div>
    </div>
    <div class="card"><div class="card-title mb-12"><span class="dot"></span>课表明细</div>
    ${sessions.length ? `<div class="list">${sessions.map(x=>`
      <div class="list-item">
        <span class="li-main"><span class="li-title">${esc(x.title||'')} ${tagChips([x.type, x.status])}</span>
        <span class="li-sub">${x.date} ${esc(x.startTime||'')}-${esc(x.endTime||'')} · 学生${esc(sName(x.studentId))} · ${tName(x.teacherId)}</span></span>
        <span class="li-side" data-action="del-session" data-id="${x.id}" style="color:var(--ink-3)">${ICONS.trash}</span>
      </div>`).join('')}</div>` : emptyBox('暂无排课')}
    </div>`;
}

function renderArrange(){
  const sessions = coll.sessions().slice().sort((a,b)=>b.date.localeCompare(a.date));
  return `<div class="row gap-8 mb-12"><button class="btn primary block" data-action="add-session">${ICONS.plus}手动排课</button></div>
    ${sessions.length ? `<div class="list">${sessions.map(x=>`
      <div class="list-item">
        <span class="li-main"><span class="li-title">${esc(x.title||sName(x.studentId))} ${tagChips([x.type, x.status])}</span>
        <span class="li-sub">${x.date} ${esc(x.startTime||'')}-${esc(x.endTime||'')} · 学生${esc(sName(x.studentId))} · ${tName(x.teacherId)}</span></span>
        <span class="li-side" data-action="del-session" data-id="${x.id}">${ICONS.trash}</span>
      </div>`).join('')}</div>` : emptyBox('暂无排课，点击上方手动排课')}`;
}

function renderHoursStat(kind){
  const consumes = coll.consumptions();
  const inPeriod = (d)=>{
    if (S.statPeriod==='all') return true;
    if (S.statPeriod==='day') return d>=daysAgo(1);
    if (S.statPeriod==='week') return d>=daysAgo(7);
    return d.slice(0,7)===today().slice(0,7);
  };
  const scope = consumes.filter(c=>inPeriod(c.date));
  const totalHours = sum(scope, x=>x.hours);
  const teacherHours = sum(scope.filter(x=>x.teacherId), x=>x.hours);
  const totalAmount = sum(scope, x=>x.amount);
  const rows = (kind==='student' ? coll.students() : coll.teachers()).map(p=>{
    const mine = scope.filter(x=> kind==='student' ? x.studentId===p.id : x.teacherId===p.id);
    const h = sum(mine,x=>x.hours), a = sum(mine,x=>x.amount);
    const meta = (p.subjects||[]).join('、') || '';
    return `<div class="rec"><div class="rec-main"><div class="rec-name">${esc(p.name)}</div><div class="rec-meta">${esc(meta)} · ${kind==='student'?'消课':'授课'} ${h} 课时</div></div><div class="rec-val blue">${money(a)}</div></div>`;
  }).join('');
  return `${segBar([{k:'day',label:'日'},{k:'week',label:'周'},{k:'month',label:'月'},{k:'all',label:'全部'}], S.statPeriod, 'set-stat')}
    <div class="card mt-12"><div class="card-title mb-12"><span class="dot"></span>总计</div>
      <div class="stat-grid cols-2 mb-8">
        <div class="stat"><div class="stat-label">学生总课时</div><div class="stat-num blue">${totalHours}</div></div>
        <div class="stat"><div class="stat-label">老师总课时</div><div class="stat-num">${teacherHours}</div></div>
        <div class="stat"><div class="stat-label">消课总金额</div><div class="stat-num green">${money(totalAmount)}</div></div>
        <div class="stat"><div class="stat-label">消课笔数</div><div class="stat-num">${scope.length}</div></div>
      </div>
    </div>
    <div class="card"><div class="card-title mb-12"><span class="dot"></span>${kind==='student'?'学生课时量':'老师课时量'}</div>
      ${rows || emptyBox('暂无消课数据')}
    </div>`;
}

/* ============================================================
   家长沟通
   ============================================================ */
function renderComms(){
  const tabs = [{k:'record',label:'沟通记录'},{k:'notice',label:'批量通知'},{k:'visit',label:'回访管理'},{k:'feedback',label:'反馈处理'}];
  return `<div class="page">
    <div class="page-head"><div class="page-title">家长沟通</div><div class="page-sub">记录 · 通知 · 回访 · 反馈</div></div>
    ${tabBar(tabs, S.tab, 'comms')}
    ${S.tab==='record' ? renderCommRecord() : S.tab==='notice' ? renderNotice() : S.tab==='visit' ? renderVisit() : renderFeedback()}
  </div>`;
}

function renderCommRecord(){
  const arr = coll.comms().slice().sort((a,b)=>b.date.localeCompare(a.date));
  return `${searchBar('#commList')}
    <div class="row gap-8 mb-12"><button class="btn primary block" data-action="add-comm">${ICONS.plus}新增沟通记录</button></div>
    ${arr.length ? `<div class="list" id="commList">${arr.map(c=>`
      <div class="list-item" data-searchable="${esc(sName(c.studentId))} ${esc(c.type)}">
        <span class="li-avatar" style="background:${c.type==='通话'?'var(--blue)':c.type==='面谈'?'var(--green)':'#7A4BD6'}">${c.type==='通话'?'📞':c.type==='面谈'?'🤝':'💬'}</span>
        <span class="li-main"><span class="li-title">${esc(sName(c.studentId))} ${tagChips([c.type])}</span>
        <span class="li-sub">${c.date} · 老师${esc(tName(c.teacherId))}</span>
        <span class="li-sub" style="white-space:normal">${esc(c.content)}</span></span>
        <span class="li-side" data-action="del-comm" data-id="${c.id}">${ICONS.trash}</span>
      </div>`).join('')}</div>` : emptyBox('暂无沟通记录')}`;
}

function renderNotice(){
  const arr = coll.notices().slice().sort((a,b)=>b.date.localeCompare(a.date));
  return `<div class="row gap-8 mb-12"><button class="btn primary block" data-action="add-notice">${ICONS.megaphone}群发通知</button></div>
    ${arr.length ? `<div class="list">${arr.map(n=>`
      <div class="list-item">
        <span class="li-main"><span class="li-title">${esc(n.title)} ${tagChips([n.type])}</span>
        <span class="li-sub">${n.date} · 发送至 ${esc(n.target||'')}</span>
        <span class="li-sub" style="white-space:normal">${esc(n.content)}</span></span>
        <span class="li-side" data-action="del-notice" data-id="${n.id}">${ICONS.trash}</span>
      </div>`).join('')}</div>` : emptyBox('暂无通知记录')}`;
}

function renderVisit(){
  const arr = coll.visits().slice().sort((a,b)=>b.planDate.localeCompare(a.date)||b.planDate.localeCompare(a.planDate));
  const pending = arr.filter(v=>v.status==='待回访').length;
  return `<div class="stat-grid mb-12"><div class="stat"><div class="stat-label">待回访</div><div class="stat-num amber">${pending}</div></div><div class="stat"><div class="stat-label">回访总数</div><div class="stat-num">${arr.length}</div></div></div>
    <div class="row gap-8 mb-12"><button class="btn primary block" data-action="add-visit">${ICONS.plus}制定回访计划</button></div>
    ${arr.length ? `<div class="list">${arr.map(v=>`
      <button class="list-item" data-action="visit-result" data-id="${v.id}">
        <span class="li-avatar" style="background:${v.status==='已完成'?'var(--green)':v.status==='待回访'?'var(--amber)':'var(--ink-3)'}">${v.status==='已完成'?'✓':'📋'}</span>
        <span class="li-main"><span class="li-title">${esc(sName(v.studentId))} ${tagChips([v.status])}</span>
        <span class="li-sub">计划 ${v.planDate} · ${esc(v.note||'')}</span>
        ${v.result?`<span class="li-sub">结果：${esc(v.result)}</span>`:''}</span>
        <span class="li-side">${ICONS.chev}</span>
      </button>`).join('')}</div>` : emptyBox('暂无回访计划')}`;
}

function renderFeedback(){
  const arr = coll.feedbacks().slice().sort((a,b)=>b.date.localeCompare(a.date));
  return `<div class="row gap-8 mb-12"><button class="btn primary block" data-action="add-feedback">${ICONS.plus}登记投诉建议</button></div>
    ${arr.length ? `<div class="list">${arr.map(f=>`
      <button class="list-item" data-action="feedback-step" data-id="${f.id}">
        <span class="li-main"><span class="li-title">${esc(f.title)} ${tagChips([f.status])}</span>
        <span class="li-sub">${f.date} · ${esc(sName(f.studentId))}</span>
        ${f.resolution?`<span class="li-sub">处理：${esc(f.resolution)}</span>`:''}</span>
        <span class="li-side">${ICONS.chev}</span>
      </button>`).join('')}</div>` : emptyBox('暂无反馈')}`;
}

/* ============================================================
   老师管理
   ============================================================ */
function renderTeachers(){
  const tabs = [{k:'roster',label:'师资档案'},{k:'pay',label:'课时薪酬'},{k:'stat',label:'课时统计'}];
  return `<div class="page">
    <div class="page-head"><div class="page-title">老师管理</div><div class="page-sub">档案 · 薪酬 · 课时统计</div></div>
    ${tabBar(tabs, S.tab, 'teachers')}
    ${S.tab==='pay' ? renderTeacherPay() : S.tab==='stat' ? renderHoursStat('teacher') : renderTeacherRoster()}
  </div>`;
}

function renderTeacherRoster(){
  const tc = coll.teachers();
  return `<div class="row gap-8 mb-12"><button class="btn primary block" data-action="add-teacher">${ICONS.plus}添加老师</button></div>
    ${tc.length ? `<div class="list" id="teaList">${tc.map(t=>`
      <button class="list-item" data-action="go-teacher" data-id="${t.id}" data-searchable="${esc(t.name)} ${esc((t.subjects||[]).join(' '))}">
        <span class="li-avatar" style="background:${avColor(t.name,AV_COLORS_T)}">${esc(initial(t.name))}</span>
        <span class="li-main"><span class="li-title">${esc(t.name)}</span>
        <span class="li-sub">${esc((t.subjects||[]).join('、')||'—')} · ${money(rateOf(t)||0)}/课时</span></span>
        <span class="li-side">${ICONS.chev}</span>
      </button>`).join('')}</div>` : emptyBox('暂无老师')}`;
}

function renderTeacherPay(){
  const tc = coll.teachers(), consumes = coll.consumptions();
  return `${searchBar('#payList')}<div class="list" id="payList">${tc.map(t=>{
    const mine = consumes.filter(c=>c.teacherId===t.id);
    const hours = sum(mine, x=>x.hours);
    const expect = Math.round(expectedPay(t));
    const paid = sum(coll.salaries().filter(s=>s.teacherId===t.id && s.status==='已结算'), x=>x.amount);
    const pct = expect>0 ? Math.min(100, Math.round(paid/expect*100)) : 0;
    return `<div class="list-item" data-searchable="${esc(t.name)}">
      <span class="li-avatar" style="background:${avColor(t.name,AV_COLORS_T)}">${esc(initial(t.name))}</span>
      <span class="li-main"><span class="li-title">${esc(t.name)}</span>
      <span class="li-sub">授课 ${hours} 课时 · 应发 ${money(expect)} · 已结算 ${money(paid)}</span>
      <span class="mt-8" style="display:block"><span class="progress"><span class="progress-fill" style="width:${pct}%"></span></span><span class="small muted">结算进度 ${pct}%</span></span></span>
      <span class="li-side"><button class="btn sm ghost" data-action="pay-salary" data-id="${t.id}">发放薪酬</button></span>
    </div>`; }).join('')}</div>`;
}

/* ============================================================
   快速导入
   ============================================================ */
function renderImport(){
  const tabs = [{k:'do',label:'数据导入'},{k:'log',label:'导入记录'},{k:'backup',label:'备份数据'}];
  return `<div class="page">
    <div class="page-head"><div class="page-title">快速导入</div><div class="page-sub">数据导入 · 导入记录 · 备份数据</div></div>
    ${tabBar(tabs, S.tab, 'import')}
    ${S.tab==='log' ? renderImportLog() : S.tab==='backup' ? renderBackup() : renderImportDo()}
  </div>`;
}

function renderImportDo(){
  return `
  <div class="card">
    <div class="card-title mb-12"><span class="dot"></span>批量导入</div>
    <p class="small muted mb-12">支持学生 / 老师 / 成绩 / 课表信息。可上传 CSV，或粘贴表格文本（每行一条，逗号分隔）。</p>
    <div class="field"><label class="field-label">导入类型</label>
      <select class="select" id="impType">${IMPORT_TYPES.map(t=>`<option>${t}</option>`).join('')}</select>
    </div>
    <div class="field"><label class="field-label">粘贴数据（每行一条，逗号分隔）</label>
      <textarea class="textarea" id="impText" placeholder="例如（学生信息）：&#10;姓名,年级,科目,联系电话,剩余课时&#10;张三,三年级,数学,13800000000,20"></textarea>
    </div>
    <button class="btn primary block" data-action="run-import">开始导入</button>
    <button class="btn light block mt-8" data-action="download-template">${ICONS.download}下载导入模板</button>
  </div>`;
}

function renderImportLog(){
  const arr = coll.imports().slice().sort((a,b)=>b.date.localeCompare(a.date));
  return arr.length ? `<div class="list">${arr.map(r=>`
    <div class="list-item">
      <span class="li-main"><span class="li-title">${esc(r.type)} ${tagChips([r.status==='成功'?'已结案':'待处理'])}</span>
      <span class="li-sub">${r.date} · 成功 ${r.success} / 失败 ${r.fail} 条</span>
      ${(r.errors||[]).length?`<span class="li-sub" style="color:var(--red)">错误：${esc(r.errors.slice(0,3).map(e=>`第${e.row}行 ${e.reason}`).join('；'))}</span>`:''}</span>
    </div>`).join('')}</div>` : emptyBox('暂无导入记录');
}

function renderBackup(){
  const cnt = (k,label)=>{ const n = coll[k] ? coll[k]().length : 0; return `<div class="stat"><div class="stat-label">${label}</div><div class="stat-num">${n}</div></div>`; };
  return `
  <div class="card">
    <div class="card-title mb-12"><span class="dot"></span>当前数据概况</div>
    <div class="stat-grid cols-2 mb-8">
      ${cnt('students','学生')}${cnt('teachers','老师')}${cnt('classes','班级')}${cnt('consumptions','消课记录')}
    </div>
  </div>
  <div class="card">
    <div class="card-title mb-12"><span class="dot"></span>导出备份</div>
    <p class="small muted mb-12">将全部数据（学生 / 老师 / 班级 / 消课 / 充值 / 薪酬 / 费用 / 排课 / 评估）打包为 JSON 文件保存，换机或重装后可一键恢复。</p>
    <button class="btn primary block" data-action="export-data">${ICONS.download}导出全部数据（JSON）</button>
  </div>
  <div class="card">
    <div class="card-title mb-12"><span class="dot"></span>恢复备份</div>
    <p class="small muted mb-12">粘贴备份文件内容，或选择备份文件。恢复会覆盖当前全部数据，请谨慎操作。</p>
    <textarea class="textarea" id="restoreText" placeholder="将备份 JSON 内容粘贴到这里…"></textarea>
    <div class="row gap-8 mt-8">
      <button class="btn ghost" data-action="pick-backup-file">${ICONS.note}选择备份文件</button>
      <button class="btn primary" data-action="restore-data">恢复数据</button>
    </div>
  </div>
  <div class="card">
    <div class="card-title mb-12"><span class="dot"></span>危险操作</div>
    <p class="small muted mb-12">清空后不可恢复，请先导出备份。</p>
    <button class="btn danger block" data-action="clear-data">清空全部数据</button>
  </div>`;
}

/* ============================================================
   详情页（学生 / 老师 / 班级）
   ============================================================ */
function renderDetail(){
  const d = S.detail;
  if (d.type==='student') return renderStudentDetail(d.id);
  if (d.type==='teacher') return renderTeacherDetail(d.id);
  if (d.type==='class') return renderClassDetail(d.id);
  return '';
}

function renderStudentDetail(id){
  const s = studentById(id); if(!s){ S.detail=null; return ''; }
  const consumes = coll.consumptions().filter(c=>c.studentId===id);
  const recharges = coll.recharges().filter(r=>r.studentId===id);
  const fees = coll.fees().filter(f=>f.studentId===id);
  const totalConsume = sum(consumes, x=>x.hours), totalRecharge = sum(recharges, x=>x.hours);
  const totalPaid = sum(recharges, x=>x.amount) + sum(fees.filter(f=>['报名','缴费','续费'].includes(f.type)), x=>x.amount);
  return `<div class="page">
    ${backRow('返回学生管理', 'back')}
    <div class="card">
      <div class="row gap-12">
        <span class="li-avatar" style="width:58px;height:58px;font-size:24px;background:${avColor(s.name)}">${esc(initial(s.name))}</span>
        <div class="flex-1"><div class="page-title" style="font-size:20px">${esc(s.name)}</div>
        <div class="page-sub">${esc((s.subjects||[]).join('、')||'—')} · ${esc(s.phone||'')}</div></div>
      </div>
      <div class="row gap-8 mt-12">
        <button class="btn sm primary" data-action="consume-student" data-id="${s.id}">消课</button>
        <button class="btn sm ghost" data-action="recharge-student" data-id="${s.id}">充值</button>
        <button class="btn sm danger" data-action="del-student" data-id="${s.id}">${ICONS.trash}</button>
      </div>
    </div>

    <div class="stat-grid mb-12">
      <div class="stat"><div class="stat-label">剩余课时</div><div class="stat-num blue">${s.remainingHours}</div></div>
      <div class="stat"><div class="stat-label">累计消课</div><div class="stat-num">${totalConsume}</div></div>
      <div class="stat"><div class="stat-label">累计充值课时</div><div class="stat-num">${totalRecharge}</div></div>
      <div class="stat"><div class="stat-label">累计缴费</div><div class="stat-num green">${money(totalPaid)}</div></div>
    </div>

    <div class="card"><div class="card-title mb-12"><span class="dot"></span>档案信息（可直接修改）</div>
      ${studentForm(s)}
    </div>

    <div class="card"><div class="card-title mb-12"><span class="dot"></span>消课记录（${consumes.length}）</div>
      ${consumes.length ? `<div class="list">${consumes.slice().sort((a,b)=>b.date.localeCompare(a.date)).map(c=>`
        <div class="rec"><div class="rec-main"><div class="rec-name">${tName(c.teacherId)}</div><div class="rec-meta">${c.date} · 单价 ${money(c.unitPrice)}</div></div><div class="rec-val neg">-${c.hours}课时 ${money(c.amount)}</div></div>`).join('')}</div>` : '<p class="small muted">暂无消课记录</p>'}
    </div>

    <div class="card"><div class="card-title mb-12"><span class="dot"></span>充值记录（${recharges.length}）</div>
      ${recharges.length ? `<div class="list">${recharges.slice().sort((a,b)=>b.date.localeCompare(a.date)).map(r=>`
        <div class="rec"><div class="rec-main"><div class="rec-name">${esc(r.method||'')}</div><div class="rec-meta">${r.date}</div></div><div class="rec-val pos">+${money(r.amount)}${r.hours?' · +'+r.hours+'课时':''}</div></div>`).join('')}</div>` : '<p class="small muted">暂无充值记录</p>'}
    </div>

    <div class="card"><div class="card-title mb-12"><span class="dot"></span>费用记录（${fees.length}）</div>
      ${fees.length ? `<div class="list">${fees.slice().sort((a,b)=>b.date.localeCompare(a.date)).map(f=>`
        <div class="rec"><div class="rec-main"><div class="rec-name">${esc(f.type)}</div><div class="rec-meta">${f.date} · ${esc(f.note||'')}</div></div><div class="rec-val ${f.type==='欠费'?'':'pos'}" style="color:${f.type==='欠费'?'var(--red)':'var(--green)'}">${f.type==='欠费'?'欠 ':''}${money(f.amount)}</div></div>`).join('')}</div>` : '<p class="small muted">暂无费用记录</p>'}
    </div>
  </div>`;
}

function renderTeacherDetail(id){
  const t = teacherById(id); if(!t){ S.detail=null; return ''; }
  const consumes = coll.consumptions().filter(c=>c.teacherId===id);
  const hours = sum(consumes, x=>x.hours);
  const expect = Math.round(expectedPay(t));
  const salaries = coll.salaries().filter(s=>s.teacherId===id);
  const paid = sum(salaries.filter(s=>s.status==='已结算'), x=>x.amount);
  const stus = [...new Set(consumes.map(c=>c.studentId))];
  return `<div class="page">
    ${backRow('返回老师管理', 'back')}
    <div class="card">
      <div class="row gap-12">
        <span class="li-avatar" style="width:58px;height:58px;font-size:24px;background:${avColor(t.name,AV_COLORS_T)}">${esc(initial(t.name))}</span>
        <div class="flex-1"><div class="page-title" style="font-size:20px">${esc(t.name)}</div>
        <div class="page-sub">${esc((t.subjects||[]).join('、')||'—')} · ${money(rateOf(t)||0)}/课时</div></div>
      </div>
      <div class="row gap-8 mt-12">
        <button class="btn sm ghost" data-action="pay-salary" data-id="${t.id}">${ICONS.wallet}发放薪酬</button>
        <button class="btn sm danger" data-action="del-teacher" data-id="${t.id}">${ICONS.trash}</button>
      </div>
    </div>
    <div class="stat-grid mb-12">
      <div class="stat"><div class="stat-label">授课课时</div><div class="stat-num blue">${hours}</div></div>
      <div class="stat"><div class="stat-label">应发薪酬</div><div class="stat-num">${money(expect)}</div></div>
      <div class="stat"><div class="stat-label">已结算</div><div class="stat-num green">${money(paid)}</div></div>
      <div class="stat"><div class="stat-label">课时费</div><div class="stat-num">${money(rateOf(t)||0)}</div></div>
    </div>
    <div class="card"><div class="card-title mb-12"><span class="dot"></span>师资档案（可直接修改）</div>
      ${teacherForm(t)}
    </div>
    <div class="card"><div class="card-title mb-12"><span class="dot"></span>课时薪酬结算</div>
      <div class="small muted mb-12">对应学生：${stus.map(sName).join('、')||'—'}</div>
      <div class="progress mb-12"><div class="progress-fill" style="width:${expect>0?Math.min(100,Math.round(paid/expect*100)):0}%"></div></div>
      <div class="small muted">结算进度 ${expect>0?Math.min(100,Math.round(paid/expect*100)):0}% · 待结算 ${money(expect-paid)}</div>
      ${salaries.length ? `<div class="list mt-12">${salaries.slice().sort((a,b)=>b.date.localeCompare(a.date)).map(x=>`
        <div class="rec"><div class="rec-main"><div class="rec-name">${esc(x.note||'工资')}</div><div class="rec-meta">${x.date} · ${x.hours}课时</div></div><div class="rec-val neg">${money(x.amount)} ${tagChips([x.status])}</div></div>`).join('')}</div>`:''}
    </div>
  </div>`;
}

function renderClassDetail(id){
  const c = classById(id); if(!c){ S.detail=null; return ''; }
  const stus = (c.studentIds||[]).map(id=>studentById(id)).filter(Boolean);
  const consumes = coll.consumptions().filter(x=>stus.map(s=>s.id).includes(x.studentId));
  const hours = sum(consumes, x=>x.hours);
  const amount = sum(consumes, x=>x.amount);
  const income = sum(coll.recharges().filter(r=>(studentById(r.studentId)?.classIds||[]).includes(c.id)), x=>x.amount);
  return `<div class="page">
    ${backRow('返回班级管理', 'back')}
    <div class="card">
      <div class="row gap-12">
        <span class="li-avatar" style="width:58px;height:58px;font-size:24px;background:${avColor(c.name)}">${esc(c.name[0])}</span>
        <div class="flex-1"><div class="page-title" style="font-size:20px">${esc(c.name)} ${tagChips([c.type, c.status])}</div>
        <div class="page-sub">${esc(c.subject)} · ${esc(tName(c.teacherId))}</div></div>
      </div>
      <div class="row gap-8 mt-12">
        <button class="btn sm ghost" data-action="edit-class" data-id="${c.id}">${ICONS.edit}编辑</button>
        <button class="btn sm danger" data-action="del-class" data-id="${c.id}">${ICONS.trash}</button>
      </div>
    </div>
    <div class="stat-grid mb-12">
      <div class="stat"><div class="stat-label">在班学生</div><div class="stat-num blue">${stus.length}</div></div>
      <div class="stat"><div class="stat-label">已消课时</div><div class="stat-num">${hours}</div></div>
      <div class="stat"><div class="stat-label">消课金额</div><div class="stat-num green">${money(amount)}</div></div>
      <div class="stat"><div class="stat-label">累计充值</div><div class="stat-num">${money(income)}</div></div>
    </div>
    <div class="card"><div class="card-title mb-12"><span class="dot"></span>班级信息</div>
      ${kvRow('班型', c.type)}${kvRow('授课科目', c.subject)}${kvRow('任课老师', tName(c.teacherId))}${kvRow('上课时段', c.schedule||'—')}${kvRow('课时单价', money(c.pricePerHour||0))}${kvRow('开课日期', c.startDate||'—')}
    </div>
    <div class="card"><div class="card-title mb-12"><span class="dot"></span>学生名单（${stus.length}）</div>
      ${stus.length ? `<div class="list">${stus.map(s=>`
        <button class="list-item" data-action="go-student" data-id="${s.id}">
          ${avatarHtml(s.id, s.name)}<span class="li-main"><span class="li-title">${esc(s.name)}</span><span class="li-sub">${esc(s.grade)} · 剩余 ${s.remainingHours} 课时</span></span><span class="li-side">${ICONS.chev}</span>
        </button>`).join('')}</div>` : emptyBox('暂无学生')}
    </div>
  </div>`;
}

function kvRow(k, v){ return `<div class="kv"><span class="kv-k">${k}</span><span class="kv-v">${esc(v||'—')}</span></div>`; }

/* ============================================================
   弹窗
   ============================================================ */
function openModal(title, bodyHtml, footHtml=''){
  $('#modalRoot').innerHTML = `
    <div class="modal-overlay">
      <div class="modal">
        <div class="modal-head"><div class="m-title">${esc(title)}</div><button class="icon-btn" data-action="close-modal">${ICONS.close}</button></div>
        <div class="modal-body">${bodyHtml}</div>
        ${footHtml?`<div class="modal-foot">${footHtml}</div>`:''}
      </div>
    </div>`;
}
function closeModal(){ $('#modalRoot').innerHTML=''; }

function toast(msg, type='ok'){
  const el = document.createElement('div');
  el.className = 'toast '+type;
  el.innerHTML = (type==='ok'?'✓ ':type==='warn'?'⚠ ':'✕ ') + esc(msg);
  $('#toastRoot').appendChild(el);
  setTimeout(()=>el.remove(), 2600);
}

let _confirmCb = null;
function confirmDel(msg){
  return new Promise(resolve => {
    _confirmCb = resolve;
    openModal('请确认', `<p class="small muted">${esc(msg)}</p>`,
      `<button class="btn light" data-action="confirm-no">取消</button><button class="btn danger" data-action="confirm-yes">确认删除</button>`);
  });
}

/* 表单通用：读取值 */
function val(f, name){ const el = f.elements[name]; return el ? el.value.trim() : ''; }

/* ---------------- 学生表单 ---------------- */
function studentForm(s){
  s = s || {};
  return `<form data-form="student" data-id="${s.id||''}">
    <div class="field"><label class="field-label">姓名 <span class="req">*</span></label><input class="input" name="name" required value="${esc(s.name||'')}"></div>
    <div class="field"><label class="field-label">科目（手动输入，逗号分隔）</label><input class="input" name="subjects" placeholder="如：数学、英语" value="${esc((s.subjects||[]).join(','))}"></div>
    <div class="input-row">
      <div class="field"><label class="field-label">剩余课时</label><input class="input" name="remainingHours" type="number" step="0.5" min="0" value="${s.remainingHours??0}"></div>
      <div class="field"><label class="field-label">联系电话</label><input class="input" name="phone" value="${esc(s.phone||'')}"></div>
    </div>
    <div class="input-row">
      <div class="field"><label class="field-label">家长姓名</label><input class="input" name="parentName" value="${esc(s.parentName||'')}"></div>
      <div class="field"><label class="field-label">家长电话</label><input class="input" name="parentPhone" value="${esc(s.parentPhone||'')}"></div>
    </div>
    <div class="field"><label class="field-label">备注</label><textarea class="textarea" name="note">${esc(s.note||'')}</textarea></div>
    <button class="btn primary block" type="submit">保存</button>
  </form>`;
}

function chipSelect(name, options, selected=[]){
  return `<div class="chip-row" data-chip-group="${name}">
    <input type="hidden" name="${name}" value="${esc((selected||[]).join(','))}">
    ${options.map(o=>`<span class="chip-select ${(selected||[]).includes(o)?'on':''}" data-chip-toggle data-value="${esc(o)}">${esc(o)}</span>`).join('')}
  </div>`;
}

/* ---------------- 老师表单 ---------------- */
function rateRow(r){
  r = r || {};
  return `<div class="rate-row">
    <input class="input" name="rateSubject" placeholder="科目（如：数学）" value="${esc(r.subject||'')}">
    <input class="input" name="rateAmount" type="number" min="0" step="0.5" placeholder="元/课时" value="${r.rate||''}">
    <button type="button" class="icon-btn" data-action="del-rate-row" title="删除">${ICONS.trash}</button>
  </div>`;
}

function teacherForm(t){
  t = t || {};
  const rates = (t.rates && t.rates.length) ? t.rates : [{}];
  return `<form data-form="teacher" data-id="${t.id||''}">
    <div class="field"><label class="field-label">姓名 <span class="req">*</span></label><input class="input" name="name" required value="${esc(t.name||'')}"></div>
    <div class="field"><label class="field-label">授课科目（手动输入，逗号分隔）</label><input class="input" name="subjects" placeholder="如：数学、英语" value="${esc((t.subjects||[]).join(','))}"></div>
    <div class="field"><label class="field-label">课时费（每科目单价，可添加多行）</label>
      <div id="rateRows">${rates.map(rateRow).join('')}</div>
      <button type="button" class="btn sm ghost mt-8" data-action="add-rate-row">${ICONS.plus}添加课时费</button>
    </div>
    <button class="btn primary block" type="submit">保存</button>
  </form>`;
}

/* ---------------- 班级表单 ---------------- */
function classForm(c){
  c = c || {};
  return `<form data-form="class" data-id="${c.id||''}">
    <div class="field"><label class="field-label">班级名称 <span class="req">*</span></label><input class="input" name="name" required value="${esc(c.name||'')}"></div>
    <div class="input-row">
      <div class="field"><label class="field-label">班型</label><select class="select" name="type">${CLASS_TYPES.map(t=>`<option ${c.type===t?'selected':''}>${t}</option>`).join('')}</select></div>
      <div class="field"><label class="field-label">授课科目</label><select class="select" name="subject">${SUBJECTS.map(s=>`<option ${c.subject===s?'selected':''}>${s}</option>`).join('')}</select></div>
    </div>
    <div class="field"><label class="field-label">任课老师</label><select class="select" name="teacherId"><option value="">未指定</option>${coll.teachers().map(t=>`<option value="${t.id}" ${c.teacherId===t.id?'selected':''}>${esc(t.name)}</option>`).join('')}</select></div>
    <div class="input-row">
      <div class="field"><label class="field-label">上课时段</label><input class="input" name="schedule" placeholder="周六 09:00-10:30" value="${esc(c.schedule||'')}"></div>
      <div class="field"><label class="field-label">课时单价</label><input class="input" name="pricePerHour" type="number" min="0" value="${c.pricePerHour||0}"></div>
    </div>
    <div class="field"><label class="field-label">学生名单</label>${chipSelect('studentIds', coll.students().map(s=>s.name), (c.studentIds||[]).map(id=>studentById(id)?.name).filter(Boolean))}</div>
    <button class="btn primary block" type="submit">保存</button>
  </form>`;
}

/* ---------------- 消课 / 充值 / 工资 / 费用 ---------------- */
function consumeForm(s){
  return `<form data-form="consume" data-id="${s.id}">
    <p class="small muted mb-12">为「${esc(s.name)}」消课，当前剩余 ${s.remainingHours} 课时。</p>
    <div class="input-row">
      <div class="field"><label class="field-label">消课课时 <span class="req">*</span></label><input class="input" name="hours" type="number" step="0.5" min="0.5" required value="2"></div>
      <div class="field"><label class="field-label">课时单价</label><input class="input" name="unitPrice" type="number" min="0" value="150"></div>
    </div>
    <div class="field"><label class="field-label">对应老师</label><select class="select" name="teacherId"><option value="">未指定</option>${coll.teachers().map(t=>`<option value="${t.id}">${esc(t.name)}</option>`).join('')}</select></div>
    <button class="btn primary block" type="submit">确认消课</button>
  </form>`;
}

function rechargeForm(s){
  return `<form data-form="recharge" data-id="${s.id}">
    <p class="small muted mb-12">为「${esc(s.name)}」充值。</p>
    <div class="input-row">
      <div class="field"><label class="field-label">充值金额 <span class="req">*</span></label><input class="input" name="amount" type="number" min="0" required placeholder="2000"></div>
      <div class="field"><label class="field-label">增加课时</label><input class="input" name="hours" type="number" step="0.5" min="0" placeholder="20"></div>
    </div>
    <div class="field"><label class="field-label">支付方式</label><select class="select" name="method"><option>微信</option><option>支付宝</option><option>现金</option><option>刷卡</option></select></div>
    <button class="btn primary block" type="submit">确认充值</button>
  </form>`;
}

function salaryForm(t){
  t = t || {};
  const consumes = coll.consumptions().filter(c=>c.teacherId===t.id);
  const hours = sum(consumes, x=>x.hours);
  const expect = Math.round(expectedPay(t));
  const paid = sum(coll.salaries().filter(s=>s.teacherId===t.id && s.status==='已结算'), x=>x.amount);
  return `<form data-form="salary" data-id="${t.id}">
    <p class="small muted mb-12">为「${esc(t.name)}」发放工资，待发 ${money(expect-paid)}。</p>
    <div class="input-row">
      <div class="field"><label class="field-label">发放金额 <span class="req">*</span></label><input class="input" name="amount" type="number" min="0" required value="${expect-paid}"></div>
      <div class="field"><label class="field-label">结算课时</label><input class="input" name="hours" type="number" step="0.5" min="0" value="${hours}"></div>
    </div>
    <div class="field"><label class="field-label">备注</label><input class="input" name="note" placeholder="如：本月课酬"></div>
    <button class="btn primary block" type="submit">确认发放</button>
  </form>`;
}

function feeForm(){
  return `<form data-form="fee">
    <div class="input-row">
      <div class="field"><label class="field-label">学生</label><select class="select" name="studentId">${coll.students().map(s=>`<option value="${s.id}">${esc(s.name)}</option>`).join('')}</select></div>
      <div class="field"><label class="field-label">类型</label><select class="select" name="type"><option>报名</option><option>缴费</option><option>欠费</option><option>续费</option></select></div>
    </div>
    <div class="input-row">
      <div class="field"><label class="field-label">金额 <span class="req">*</span></label><input class="input" name="amount" type="number" min="0" required></div>
      <div class="field"><label class="field-label">状态</label><select class="select" name="status"><option>已缴</option><option>待缴</option><option>欠费</option></select></div>
    </div>
    <div class="field"><label class="field-label">备注</label><input class="input" name="note" placeholder="如：春季班学费 / 续费到期预警"></div>
    <button class="btn primary block" type="submit">保存</button>
  </form>`;
}

/* ---------------- 沟通 / 通知 / 回访 / 反馈 ---------------- */
function commForm(){
  return `<form data-form="comm">
    <div class="input-row">
      <div class="field"><label class="field-label">学生</label><select class="select" name="studentId">${coll.students().map(s=>`<option value="${s.id}">${esc(s.name)}</option>`).join('')}</select></div>
      <div class="field"><label class="field-label">方式</label><select class="select" name="type">${COMM_TYPES.map(t=>`<option>${t}</option>`).join('')}</select></div>
    </div>
    <div class="field"><label class="field-label">老师</label><select class="select" name="teacherId"><option value="">未指定</option>${coll.teachers().map(t=>`<option value="${t.id}">${esc(t.name)}</option>`).join('')}</select></div>
    <div class="field"><label class="field-label">沟通内容</label><textarea class="textarea" name="content" placeholder="记录沟通要点…"></textarea></div>
    <button class="btn primary block" type="submit">保存</button>
  </form>`;
}

function noticeForm(){
  const targetOpts = ['全部学生'].concat(coll.classes().map(c=>c.name+'（班级）'));
  return `<form data-form="notice">
    <div class="field"><label class="field-label">通知标题 <span class="req">*</span></label><input class="input" name="title" required placeholder="如：本周放假通知"></div>
    <div class="field"><label class="field-label">类型</label><select class="select" name="type">${NOTICE_TYPES.map(t=>`<option>${t}</option>`).join('')}</select></div>
    <div class="field"><label class="field-label">发送对象</label><select class="select" name="target">${targetOpts.map(t=>`<option>${t}</option>`).join('')}</select></div>
    <div class="field"><label class="field-label">通知内容</label><textarea class="textarea" name="content"></textarea></div>
    <button class="btn primary block" type="submit">群发通知</button>
  </form>`;
}

function visitForm(){
  return `<form data-form="visit">
    <div class="input-row">
      <div class="field"><label class="field-label">学生</label><select class="select" name="studentId">${coll.students().map(s=>`<option value="${s.id}">${esc(s.name)}</option>`).join('')}</select></div>
      <div class="field"><label class="field-label">计划日期</label><input class="input" name="planDate" type="date" value="${today()}"></div>
    </div>
    <div class="field"><label class="field-label">回访事项</label><input class="input" name="note" placeholder="如：回访续费意向"></div>
    <button class="btn primary block" type="submit">保存计划</button>
  </form>`;
}

function feedbackForm(){
  return `<form data-form="feedback">
    <div class="field"><label class="field-label">标题 <span class="req">*</span></label><input class="input" name="title" required placeholder="投诉 / 建议主题"></div>
    <div class="field"><label class="field-label">学生</label><select class="select" name="studentId">${coll.students().map(s=>`<option value="${s.id}">${esc(s.name)}</option>`).join('')}</select></div>
    <div class="field"><label class="field-label">内容</label><textarea class="textarea" name="content"></textarea></div>
    <button class="btn primary block" type="submit">登记</button>
  </form>`;
}

function sessionForm(){
  return `<form data-form="session">
    <div class="input-row">
      <div class="field"><label class="field-label">学生 <span class="req">*</span></label><select class="select" name="studentId" required>${coll.students().map(s=>`<option value="${s.id}">${esc(s.name)}</option>`).join('')}</select></div>
      <div class="field"><label class="field-label">老师</label><select class="select" name="teacherId"><option value="">未指定</option>${coll.teachers().map(t=>`<option value="${t.id}">${esc(t.name)}</option>`).join('')}</select></div>
    </div>
    <div class="field"><label class="field-label">类型</label><select class="select" name="type">${SESSION_TYPES.map(t=>`<option>${t}</option>`).join('')}</select></div>
    <div class="field"><label class="field-label">上课日期 <span class="req">*</span></label><input class="input" name="date" type="date" required value="${today()}"></div>
    <div class="input-row">
      <div class="field"><label class="field-label">开始时间</label><input class="input" name="startTime" type="time" value="09:00"></div>
      <div class="field"><label class="field-label">结束时间</label><input class="input" name="endTime" type="time" value="10:30"></div>
    </div>
    <button class="btn primary block" type="submit">保存排课</button>
  </form>`;
}

/* ============================================================
   表单提交处理
   ============================================================ */
const FORMS = {
  student(f){
    const id = f.dataset.id, arr = coll.students();
    const data = {
      name: val(f,'name'),
      subjects: toArr(val(f,'subjects')),
      remainingHours: Number(val(f,'remainingHours'))||0, phone: val(f,'phone'),
      parentName: val(f,'parentName'), parentPhone: val(f,'parentPhone'),
      note: val(f,'note'),
    };
    if (id){ const s = arr.find(x=>x.id===id); Object.assign(s, data); saveColl('students', arr); }
    else { arr.push(Object.assign({id:uid(), enrollDate:today()}, data)); saveColl('students', arr); }
    closeModal(); toast('学生已保存'); render();
  },
  teacher(f){
    const id = f.dataset.id, arr = coll.teachers();
    const data = {
      name: val(f,'name'),
      subjects: toArr(val(f,'subjects')),
      rates: $$('.rate-row', f).map(row=>{
        const subject = ($('input[name=rateSubject]', row)?.value || '').trim();
        const rate = Number($('input[name=rateAmount]', row)?.value)||0;
        return { subject, rate };
      }).filter(r=>r.subject && r.rate>0),
    };
    if (id){ const t = arr.find(x=>x.id===id); Object.assign(t, data); saveColl('teachers', arr); }
    else { arr.push(Object.assign({id:uid(), hireDate:today()}, data)); saveColl('teachers', arr); }
    closeModal(); toast('老师已保存'); render();
  },
  class(f){
    const id = f.dataset.id, arr = coll.classes();
    const data = {
      name: val(f,'name'), type: val(f,'type'), subject: val(f,'subject'),
      teacherId: val(f,'teacherId'), schedule: val(f,'schedule'),
      pricePerHour: Number(val(f,'pricePerHour'))||0,
      studentIds: coll.students().filter(s=>toArr(val(f,'studentIds')).includes(s.name)).map(s=>s.id),
    };
    if (id){ const c = arr.find(x=>x.id===id); Object.assign(c, data); saveColl('classes', arr); }
    else { arr.push(Object.assign({id:uid(), status:'进行中', startDate:today()}, data)); saveColl('classes', arr); }
    closeModal(); toast('班级已保存'); render();
  },
  consume(f){
    const id = f.dataset.id, s = studentById(id);
    const hours = Number(val(f,'hours'))||0, unitPrice = Number(val(f,'unitPrice'))||0;
    if (hours > s.remainingHours) { toast('课时不足，剩余 '+s.remainingHours+' 课时', 'warn'); return; }
    coll.consumptions().push({id:uid(), studentId:id, teacherId:val(f,'teacherId'), classId:'', hours, unitPrice, amount:Math.round(hours*unitPrice), date:today(), note:''});
    saveColl('consumptions', coll.consumptions());
    s.remainingHours -= hours; const arr = coll.students(); Object.assign(arr.find(x=>x.id===id), s); saveColl('students', arr);
    closeModal(); toast('消课成功 -'+hours+' 课时'); render();
  },
  recharge(f){
    const id = f.dataset.id, s = studentById(id);
    const amount = Number(val(f,'amount'))||0, hours = Number(val(f,'hours'))||0;
    coll.recharges().push({id:uid(), studentId:id, amount, hours, date:today(), method:val(f,'method'), note:''});
    saveColl('recharges', coll.recharges());
    if (hours){ s.remainingHours += hours; const arr = coll.students(); Object.assign(arr.find(x=>x.id===id), s); saveColl('students', arr); }
    closeModal(); toast('充值成功 +'+money(amount)); render();
  },
  salary(f){
    const id = f.dataset.id;
    coll.salaries().push({id:uid(), teacherId:id, amount:Number(val(f,'amount'))||0, hours:Number(val(f,'hours'))||0, date:today(), status:'已结算', note:val(f,'note')||'工资发放'});
    saveColl('salaries', coll.salaries());
    closeModal(); toast('工资已发放'); render();
  },
  fee(f){
    coll.fees().push({id:uid(), studentId:val(f,'studentId'), type:val(f,'type'), amount:Number(val(f,'amount'))||0, date:today(), status:val(f,'status'), note:val(f,'note')});
    saveColl('fees', coll.fees());
    closeModal(); toast('费用已记录'); render();
  },
  comm(f){
    coll.comms().push({id:uid(), studentId:val(f,'studentId'), teacherId:val(f,'teacherId'), type:val(f,'type'), content:val(f,'content'), date:today()});
    saveColl('comms', coll.comms());
    closeModal(); toast('沟通记录已保存'); render();
  },
  notice(f){
    coll.notices().push({id:uid(), title:val(f,'title'), type:val(f,'type'), target:val(f,'target'), content:val(f,'content'), date:today()});
    saveColl('notices', coll.notices());
    closeModal(); toast('通知已群发'); render();
  },
  visit(f){
    coll.visits().push({id:uid(), studentId:val(f,'studentId'), planDate:val(f,'planDate'), status:'待回访', result:'', note:val(f,'note')});
    saveColl('visits', coll.visits());
    closeModal(); toast('回访计划已制定'); render();
  },
  feedback(f){
    coll.feedbacks().push({id:uid(), studentId:val(f,'studentId'), title:val(f,'title'), content:val(f,'content'), status:'待处理', date:today(), resolution:''});
    saveColl('feedbacks', coll.feedbacks());
    closeModal(); toast('已登记'); render();
  },
  session(f){
    const st = studentById(val(f,'studentId'));
    coll.sessions().push({id:uid(), studentId:val(f,'studentId'), teacherId:val(f,'teacherId'), classId:'', date:val(f,'date'), startTime:val(f,'startTime'), endTime:val(f,'endTime'), type:val(f,'type'), status:'待上', title:sName(val(f,'studentId'))});
    saveColl('sessions', coll.sessions());
    closeModal(); toast('排课已保存'); render();
  },
};

/* ============================================================
   动作处理（事件委托）
   ============================================================ */
const ACTIONS = {
  'close-modal'(){ closeModal(); },
  'confirm-yes'(){ if(_confirmCb){ _confirmCb(true); _confirmCb=null; } closeModal(); },
  'confirm-no'(){ if(_confirmCb){ _confirmCb(false); _confirmCb=null; } closeModal(); },
  nav(el){ },
  'set-tab'(el){ S.section=el.dataset.sec; S.tab=el.dataset.tab; S.sel=null; render(); },
  'set-rectab'(el){ S.recTab=el.dataset.key; render(); },
  'set-report'(el){ S.reportPeriod=el.dataset.key; render(); },
  'set-stat'(el){ S.statPeriod=el.dataset.key; render(); },
  'set-view'(el){ S.view=el.dataset.key; render(); },
  'sel-person'(el){ S.sel={kind:el.dataset.kind, id:el.dataset.id}; render(); },
  'clear-sel'(){ S.sel=null; render(); },
  'go-student'(el){ S.detail={type:'student', id:el.dataset.id}; render(); },
  'go-teacher'(el){ S.detail={type:'teacher', id:el.dataset.id}; render(); },
  'go-class'(el){ S.detail={type:'class', id:el.dataset.id}; render(); },
  'back'(){ S.detail=null; render(); },
  'edit-org'(){ openModal('机构名称', `<form data-form="org"><div class="field"><label class="field-label">机构名称</label><input class="input" name="name" value="${esc(settings().name)}"></div><button class="btn primary block" type="submit">保存</button></form>`); },

  'add-student'(){ openModal('添加学生', studentForm()); },
  'edit-student'(el){ const s=studentById(el.dataset.id); openModal('编辑学生', studentForm(s)); },
  'del-student': async function(el){ if(!(await confirmDel('确定删除该学生？相关记录将保留。'))) return; const arr=coll.students().filter(x=>x.id!==el.dataset.id); saveColl('students', arr); toast('已删除'); S.detail=null; render(); },
  'consume-student'(el){ const s=studentById(el.dataset.id); openModal('手动消课', consumeForm(s)); },
  'recharge-student'(el){ const s=studentById(el.dataset.id); openModal('学生充值', rechargeForm(s)); },

  'add-teacher'(){ openModal('添加老师', teacherForm()); },
  'edit-teacher'(el){ const t=teacherById(el.dataset.id); openModal('编辑老师', teacherForm(t)); },
  'del-teacher': async function(el){ if(!(await confirmDel('确定删除该老师？'))) return; saveColl('teachers', coll.teachers().filter(x=>x.id!==el.dataset.id)); toast('已删除'); S.detail=null; render(); },
  'pay-salary'(el){ const t=teacherById(el.dataset.id); openModal('发放工资', salaryForm(t)); },
  'add-rate-row'(){ const box = $('#rateRows'); if (box) box.insertAdjacentHTML('beforeend', rateRow()); },
  'del-rate-row'(el){ el.closest('.rate-row')?.remove(); },

  'add-class'(){ openModal('新建班级', classForm()); },
  'edit-class'(el){ const c=classById(el.dataset.id); openModal('编辑班级', classForm(c)); },
  'del-class': async function(el){ if(!(await confirmDel('确定删除该班级？'))) return; saveColl('classes', coll.classes().filter(x=>x.id!==el.dataset.id)); toast('已删除'); S.detail=null; render(); },
  'end-class'(el){ const arr=coll.classes(); const c=arr.find(x=>x.id===el.dataset.id); c.status = c.status==='进行中'?'已结课':'进行中'; saveColl('classes', arr); toast(c.status==='已结课'?'已结课':'已恢复'); render(); },
  'add-fee'(){ openModal('手动添加费用', feeForm()); },
  'del-fee': async function(el){ if(!(await confirmDel('删除该费用记录？'))) return; saveColl('fees', coll.fees().filter(x=>x.id!==el.dataset.id)); toast('已删除'); render(); },

  'add-session'(){ openModal('手动排课', sessionForm()); },
  'del-session': async function(el){ if(!(await confirmDel('删除该排课？'))) return; saveColl('sessions', coll.sessions().filter(x=>x.id!==el.dataset.id)); toast('已删除'); render(); },

  'add-comm'(){ openModal('新增沟通记录', commForm()); },
  'del-comm': async function(el){ if(!(await confirmDel('删除该沟通记录？'))) return; saveColl('comms', coll.comms().filter(x=>x.id!==el.dataset.id)); toast('已删除'); render(); },
  'add-notice'(){ openModal('群发通知', noticeForm()); },
  'del-notice': async function(el){ if(!(await confirmDel('删除该通知？'))) return; saveColl('notices', coll.notices().filter(x=>x.id!==el.dataset.id)); toast('已删除'); render(); },
  'add-visit'(){ openModal('制定回访计划', visitForm()); },
  'visit-result'(el){ const arr=coll.visits(); const v=arr.find(x=>x.id===el.dataset.id); openModal('回访结果登记 · '+sName(v.studentId), `<form data-form="visit-result" data-id="${v.id}">
      <div class="field"><label class="field-label">回访结果</label><select class="select" name="status"><option ${v.status==='待回访'?'selected':''}>待回访</option><option ${v.status==='已完成'?'selected':''}>已完成</option><option ${v.status==='已取消'?'selected':''}>已取消</option></select></div>
      <div class="field"><label class="field-label">结果备注</label><textarea class="textarea" name="result">${esc(v.result||'')}</textarea></div>
      <button class="btn primary block" type="submit">保存</button></form>`); },
  'add-feedback'(){ openModal('登记投诉建议', feedbackForm()); },
  'feedback-step'(el){ const arr=coll.feedbacks(); const x=arr.find(i=>i.id===el.dataset.id); openModal('反馈处理 · '+x.title, `<form data-form="feedback-step" data-id="${x.id}">
      <div class="field"><label class="field-label">处理进度</label><select class="select" name="status">${FEED_STATUS.map(s=>`<option ${x.status===s?'selected':''}>${s}</option>`).join('')}</select></div>
      <div class="field"><label class="field-label">处理结果 / 结案说明</label><textarea class="textarea" name="resolution">${esc(x.resolution||'')}</textarea></div>
      <button class="btn primary block" type="submit">保存</button></form>`); },

  'run-import'(){ runImport(); },
  'download-template'(){ downloadTemplate(); },
  'export-data'(){ exportData(); },
  'pick-backup-file'(){
    const inp = document.createElement('input');
    inp.type = 'file'; inp.accept = 'application/json,.json,text/plain';
    inp.onchange = ()=>{ const f = inp.files[0]; if(!f) return; const r = new FileReader(); r.onload = ()=>{ const ta = $('#restoreText'); if (ta) ta.value = r.result; }; r.readAsText(f); };
    inp.click();
  },
  'restore-data'(){ restoreBackup($('#restoreText')?.value); },
  'clear-data': async function(){ if(!(await confirmDel('确定清空全部数据？此操作不可撤销，请先导出备份。'))) return; EMPTY_COLLS.forEach(k=>db.set(k, [])); db.set('settings', {name:'我的教培机构'}); toast('数据已清空'); render(); },
};

/* 注册额外表单处理器 */
Object.assign(FORMS, {
  'org'(f){ db.set('settings', Object.assign(settings(), {name: val(f,'name')||'我的教培机构'})); closeModal(); toast('机构名称已更新'); render(); },
  'visit-result'(f){ const arr=coll.visits(); const v=arr.find(x=>x.id===f.dataset.id); v.status=val(f,'status'); v.result=val(f,'result'); saveColl('visits', arr); closeModal(); toast('已保存'); render(); },
  'feedback-step'(f){ const arr=coll.feedbacks(); const x=arr.find(i=>i.id===f.dataset.id); x.status=val(f,'status'); x.resolution=val(f,'resolution'); saveColl('feedbacks', arr); closeModal(); toast('已保存'); render(); },
});

/* ---------------- 导入 ---------------- */
function runImport(){
  const type = $('#impType').value, text = $('#impText').value.trim();
  if (!text){ toast('请先粘贴或输入数据', 'warn'); return; }
  const lines = text.split(/\r?\n/).map(l=>l.trim()).filter(Boolean);
  const errors = []; let success = 0;
  if (type==='学生信息'){
    lines.forEach((line, i)=>{
      const cols = line.split(/[,，\t]/).map(s=>s.trim());
      if (cols.length<2 || !cols[0]){ errors.push({row:i+1, reason:'缺少姓名'}); return; }
      coll.students().push({id:uid(), name:cols[0], gender:'', grade:cols[1]||'', subjects:cols[2]?[cols[2]]:[], tags:['正式'], remainingHours:Number(cols[4])||0, phone:cols[3]||'', classIds:[], enrollDate:today(), note:'导入'});
      success++;
    });
    saveColl('students', coll.students());
  } else if (type==='老师信息'){
    lines.forEach((line, i)=>{
      const cols = line.split(/[,，\t]/).map(s=>s.trim());
      if (!cols[0]){ errors.push({row:i+1, reason:'缺少姓名'}); return; }
      coll.teachers().push({id:uid(), name:cols[0], gender:'', subjects:cols[1]?[cols[1]]:[], certs:[], teachYears:Number(cols[2])||0, hourlyRate:Number(cols[3])||0, experience:'', status:'在职', hireDate:today()});
      success++;
    });
    saveColl('teachers', coll.teachers());
  } else if (type==='成绩'){
    // 成绩信息暂存为备注，不落地独立表，记录成功即可
    lines.forEach((line, i)=>{ if (line){ success++; } });
  } else if (type==='课表'){
    lines.forEach((line, i)=>{
      const cols = line.split(/[,，\t]/).map(s=>s.trim());
      if (!cols[0]){ errors.push({row:i+1, reason:'缺少学生姓名'}); return; }
      const stu = coll.students().find(s=>s.name===cols[0]);
      if (!stu){ errors.push({row:i+1, reason:'学生不存在：'+cols[0]}); return; }
      coll.sessions().push({id:uid(), studentId:stu.id, teacherId:'', classId:stu.classIds?.[0]||'', date:cols[1]||today(), startTime:cols[2]||'09:00', endTime:cols[3]||'10:30', type:'正常', status:'待上', title:'导入课表'});
      success++;
    });
    saveColl('sessions', coll.sessions());
  }
  const status = errors.length ? '部分成功' : '成功';
  coll.imports().push({id:uid(), type, status, total:lines.length, success, fail:errors.length, errors, date:today()});
  saveColl('imports', coll.imports());
  $('#impText').value='';
  toast('导入完成：成功 '+success+' 条，失败 '+errors.length+' 条', errors.length?'warn':'ok');
  render();
}

function downloadTemplate(){
  const map = {
    '学生信息':'姓名,年级,科目,联系电话,剩余课时\n张三,三年级,数学,13800000000,20',
    '老师信息':'姓名,科目,教龄,课酬单价\n王老师,数学,6,120',
    '成绩':'学生姓名,科目,成绩,日期\n张三,数学,95,2026-08-17',
    '课表':'学生姓名,日期,开始时间,结束时间\n张三,2026-08-18,09:00,10:30',
  };
  downloadText('教培通-'+$('#impType').value+'-模板.csv', map[$('#impType').value]||'');
}

const BACKUP_KEYS = ['students','teachers','classes','consumptions','recharges','salaries','fees','sessions','imports','evaluations'];

function exportData(){
  const collections = {};
  BACKUP_KEYS.forEach(k=>collections[k]=coll[k]());
  collections.settings = settings();
  const payload = { app:'教培通', version:1, exportedAt:today(), collections };
  downloadText('教培通-数据备份-'+today()+'.json', JSON.stringify(payload, null, 2));
  toast('数据已导出');
}

function restoreBackup(text){
  if (!text || !String(text).trim()){ toast('请先粘贴或选择备份内容', 'warn'); return; }
  let obj;
  try { obj = JSON.parse(text); } catch(e){ toast('备份内容不是有效的 JSON', 'warn'); return; }
  const data = obj.collections || obj;
  if (!BACKUP_KEYS.some(k=>Array.isArray(data[k]))){ toast('备份文件格式不正确', 'warn'); return; }
  confirmDel('恢复备份将覆盖当前全部数据，且不可撤销。确定继续？').then(ok=>{
    if (!ok) return;
    BACKUP_KEYS.forEach(k=>{ if (Array.isArray(data[k])) db.set(k, data[k]); });
    if (data.settings && typeof data.settings==='object') db.set('settings', data.settings);
    localStorage.setItem(P+'inited','1');
    toast('数据已恢复'); render();
  });
}

function downloadText(filename, text){
  const blob = new Blob([text], {type:'text/plain;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href=url; a.download=filename; a.click();
  URL.revokeObjectURL(url);
}

/* ---------------- 渲染函数映射 ---------------- */
const RENDER = {
  home: renderHome, students: renderStudents, teachers: renderTeachers, schedule: renderSchedule,
};

function afterRender(){
  // 进入详情时隐藏底部导航，返回时恢复
  $('#bottomNav').style.display = S.detail ? 'none' : 'flex';
  $('#main').style.paddingBottom = S.detail ? '24px' : '';
}

/* ============================================================
   事件绑定与初始化
   ============================================================ */
document.addEventListener('click', (e)=>{
  // 点击弹窗遮罩本身（而非弹窗内容）才关闭，避免误关
  if (e.target.closest && e.target.closest('.modal-overlay') === e.target){ closeModal(); return; }
  const el = e.target.closest('[data-action],[data-nav]');
  if (!el) return;
  if (el.dataset.nav){ S.section=el.dataset.nav; S.tab=DEFAULT_TAB[el.dataset.nav]||''; S.sel=null; S.detail=null; render(); return; }
  const act = el.dataset.action;
  if (act && ACTIONS[act]) ACTIONS[act](el);
});

document.addEventListener('input', (e)=>{
  const el = e.target.closest('[data-search]');
  if (!el) return;
  const target = document.querySelector(el.dataset.search);
  if (!target) return;
  const q = el.value.trim().toLowerCase();
  $$('[data-searchable]', target).forEach(node=>{ node.style.display = (node.dataset.searchable||'').toLowerCase().includes(q) ? '' : 'none'; });
});

document.addEventListener('click', (e)=>{
  const el = e.target.closest('[data-chip-toggle]');
  if (!el) return;
  el.classList.toggle('on');
  const group = el.closest('[data-chip-group]');
  const vals = $$('.chip-select.on', group).map(x=>x.dataset.value);
  let inp = $('input[type=hidden]', group);
  if (inp) inp.value = vals.join(',');
});

document.addEventListener('submit', (e)=>{
  const f = e.target.closest('form[data-form]');
  if (!f) return;
  e.preventDefault();
  const name = f.dataset.form;
  if (FORMS[name]) FORMS[name](f);
}, true);

seed();
render();
