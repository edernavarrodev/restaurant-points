(function(){
const LANGS=['en','fr','es'], NATIVE={en:'English',fr:'Français',es:'Español'};
const $=s=>document.querySelector(s);
const ICON={
home:'<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',
scan:'<path d="M4 8V5a1 1 0 011-1h3M16 4h3a1 1 0 011 1v3M20 16v3a1 1 0 01-1 1h-3M8 20H5a1 1 0 01-1-1v-3"/><path d="M7 12h10"/>',
ticket:'<path d="M3 9a2 2 0 002-2h14a2 2 0 002 2v0a2 2 0 000 6v0a2 2 0 00-2 2H5a2 2 0 00-2-2 2 2 0 000-6z"/><path d="M14 7v10" stroke-dasharray="2 3"/>',
user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>',
gift:'<rect x="3" y="8" width="18" height="4"/><path d="M12 8v13M5 12v9h14v-9M12 8c-2-4-6-3-5 0 .5 1.5 5 0 5 0zm0 0c2-4 6-3 5 0-.5 1.5-5 0-5 0z"/>',
lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/>',
check:'<path d="M5 12l5 5 9-10"/>',x:'<path d="M6 6l12 12M18 6L6 18"/>',
back:'<path d="M15 5l-7 7 7 7"/>',chev:'<path d="M9 5l7 7-7 7"/>',
copy:'<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 012-2h9"/>',
shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
chart:'<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>',
sliders:'<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
mega:'<path d="M4 10v4h3l8 4V6L7 10z"/><path d="M18 9a4 4 0 010 6"/>',
alert:'<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16.5v.5"/>',
plus:'<path d="M12 5v14M5 12h14"/>',
store:'<path d="M4 9l1-5h14l1 5v1a3 3 0 01-6 0 3 3 0 01-6 0 3 3 0 01-6 0z"/><path d="M5 13v7h14v-7"/>',
pin:'<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',
trophy:'<path d="M8 4h8v6a4 4 0 01-8 0zM8 6H4v1a4 4 0 004 4M16 6h4v1a4 4 0 01-4 4M12 14v4M8 20h8"/>'
};
const ic=n=>`<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${ICON[n]||''}</svg>`;

/* ---------- data (demo) ---------- */
const R={
 evviva:{id:'evviva',name:'Evviva',cur:'CAD',loc:'en-CA',def:0,rate:1,min:5,
  theme:{'--brand-primary':'#D5A727','--on-primary':'#221F1E','--brand-ink':'#221F1E','--brand-accent-text':'#7A5A0B','--brand-tint':'#F6E8C4','--brand-on-ink':'#D5A727','--bg':'#FCF7F4','--border':'#E0DAD3'},
  logo:'assets/evviva-logo-wordmark.png',mark:'assets/evviva-mark.png',
  branches:[{code:'EGL',n:['Eglinton','Eglinton','Eglinton'],on:true},{code:'WEL',n:['Wellesley','Wellesley','Wellesley'],on:true},{code:'BAR',n:['Barrie','Barrie','Barrie'],on:true},{code:'NYK',n:['North York','North York','North York'],on:true},{code:'VAU',n:['Vaughan','Vaughan','Vaughan'],on:true},{code:'LSI',n:['Lower Simcoe','Lower Simcoe','Lower Simcoe'],on:true}],
  cred:{st:'active',id:'key_evv_7c21',created:'2026-09-14',secret:null},
  invoices:{'EV-20481':{b:'EGL',amt:45.9,c:''}},
  tiers:[{th:100,n:['Regular','Habitué','Habitual']},{th:500,n:['Insider','Initié','Insider']},{th:1500,n:['VIP','VIP','VIP']}],
  rewards:[
   {id:1,n:['Free coffee','Café gratuit','Café gratis'],d:['Any hot coffee, any size.','Tout café chaud, toute taille.','Cualquier café caliente, cualquier tamaño.'],cost:150,min:null,until:'2027-06-30',on:true},
   {id:2,n:['Pancake stack','Pile de crêpes','Torre de hotcakes'],d:['Three fluffy pancakes with maple syrup.','Trois crêpes moelleuses avec sirop d\'érable.','Tres hotcakes esponjosos con miel de maple.'],cost:300,min:0,until:'2027-06-30',on:true},
   {id:3,n:['Mimosa flight','Trio de mimosas','Trío de mimosas'],d:['Three mimosas to share.','Trois mimosas à partager.','Tres mimosas para compartir.'],cost:450,min:1,until:'2027-06-30',on:true},
   {id:4,n:['Chef\'s brunch for two','Brunch du chef pour deux','Brunch del chef para dos'],d:['Shared table, chef\'s selection.','Table partagée, sélection du chef.','Mesa compartida, selección del chef.'],cost:900,min:2,until:'2027-12-31',on:true}],
  promos:[
   {id:1,k:'dish',t:['Eggs Benedict, our way','Œufs Bénédicte, à notre façon','Huevos Benedictinos a nuestra manera'],b:['Poached eggs, house hollandaise, toasted brioche.','Œufs pochés, hollandaise maison, brioche grillée.','Huevos pochados, holandesa de la casa, brioche tostado.'],pub:true},
   {id:2,k:'promo',t:['Weekday mimosa hour','Heure du mimosa en semaine','Hora del mimosa entre semana'],b:['Two mimosas for one, Monday to Thursday, 11 to 1.','Deux mimosas pour un, du lundi au jeudi, de 11 h à 13 h.',null],pub:true},
   {id:3,k:'review',t:['"Best brunch in town"','« Le meilleur brunch en ville »',null],b:['A guest wrote: warm service and a menu with something for everyone.',null,null],pub:true},
   {id:4,k:'promo',t:['Vegan menu launch','Lancement du menu végane','Lanzamiento del menú vegano'],b:['Draft text, not visible to guests.','Brouillon, invisible pour les clients.','Borrador, no visible para los clientes.'],pub:false}],
  member:{bal:440,earned:640,ledger:[
   {t:'earn',i:'EV-20310',p:112,d:'2026-10-11T13:20',b:'NYK',a:112.4},{t:'earn',i:'EV-20288',p:88,d:'2026-10-04T11:30',b:'BAR',a:88},{t:'red',r:0,p:-200,d:'2026-09-28T16:10'},{t:'earn',i:'EV-19977',p:240,d:'2026-09-21T14:00',b:'LSI',a:240.5},{t:'earn',i:'EV-19402',p:200,d:'2026-09-02T12:45',b:'EGL',a:200}]},
  codes:[{c:'EVV-7K3Q-9M2P',r:0,st:'issued',u:'2026-10-26'},{c:'EVV-USED-0001',r:1,st:'used',u:'2026-10-05'},{c:'EVV-OLD0-0002',r:0,st:'expired',u:'2026-09-30'}],
  customers:[['Marie Tremblay',640,'Insider'],['Daniel Ortiz',1530,'VIP'],['Priya Shah',210,'Regular'],['Lucas Martin',40,'—']],
  credits:[{c:'Marie T.',i:'EV-20310',b:'NYK',a:112.4,p:112,d:'2026-10-11T13:20'},{c:'Daniel O.',i:'EV-20309',b:'EGL',a:388,p:388,d:'2026-10-11T12:05'},{c:'Priya S.',i:'EV-20301',b:'WEL',a:64.15,p:64,d:'2026-10-10T19:42'},{c:'Marie T.',i:'EV-20288',b:'BAR',a:88,p:88,d:'2026-10-04T11:30'},{c:'Lucas M.',i:'EV-20255',b:'VAU',a:40,p:40,d:'2026-09-29T10:15'},{c:'Daniel O.',i:'EV-20190',b:'LSI',a:242,p:242,d:'2026-09-21T14:00'}],
  reds:[['Daniel O.',2,'2026-10-10','Used'],['Marie T.',0,'2026-10-09','Ready']]},
 casa:{id:'casa',name:'Casa Sol',demo:true,cur:'MXN',loc:'es-MX',def:2,rate:0.1,min:50,
  theme:{'--brand-primary':'#B83A1F','--on-primary':'#FFFFFF','--brand-ink':'#2B1B16','--brand-accent-text':'#B83A1F','--brand-tint':'#F9DFD3','--brand-on-ink':'#F2A68F','--bg':'#FBF3EA','--border':'#E8D9CB'},
  logo:null,mark:null,
  branches:[{code:'CEN',n:[null,null,'Centro'],on:true},{code:'ROM',n:['Roma','Roma','Roma'],on:true}],
  cred:{st:'none',id:null,created:null,secret:null},
  invoices:{},
  tiers:[{th:200,n:['Regular','Habitué','Amigo']},{th:800,n:['Gold','Or','Oro']}],
  rewards:[{id:1,n:['Free dessert','Dessert gratuit','Postre gratis'],d:['Any dessert of the day.','Un dessert du jour.','Cualquier postre del día.'],cost:120,min:null,until:'2027-03-31',on:true},{id:2,n:['House margarita','Margarita maison','Margarita de la casa'],d:['Classic or tamarind.','Classique ou tamarin.','Clásica o de tamarindo.'],cost:400,min:0,until:'2027-03-31',on:true}],
  promos:[{id:1,k:'dish',t:['Tacos al pastor','Tacos al pastor','Tacos al pastor'],b:['Marinated pork, pineapple, fresh cilantro.','Porc mariné, ananas, coriandre fraîche.','Cerdo marinado, piña y cilantro fresco.'],pub:true}],
  member:null,codes:[],customers:[['Ana Ruiz',410,'Regular'],['Luis Pérez',90,'—']],credits:[{c:'Ana R.',i:'CS-3301',b:'CEN',a:1240,p:124,d:'2026-10-12T20:10'},{c:'Luis P.',i:'CS-3290',b:'ROM',a:900,p:90,d:'2026-10-08T14:30'}],reds:[]}
};
const S={lang:'en',view:'customer',rest:'evviva',scr:'signin',tab:'rewards',aScr:'activity',oScr:'restaurants',stack:[],sheet:null,toast:null,
  signedIn:false,adminIn:false,scanRes:null,lastCode:null,redeemId:null,errs:{},consent:false,age:false,
  ltab:{rew:0,con:0,tier:0},edit:null,codeRes:null,reqs:[{c:'Daniel Ortiz',ty:'export',d:'2026-10-12',st:'pending'}],myreq:null,seen:new Set(['evviva:EV-20310','evviva:EV-20288','evviva:EV-19977','evviva:EV-19402','evviva:EV-20309','evviva:EV-20301']),f:{br:[],from:'',to:''},br:{edit:null,err:null},q:{b:'',inv:'',amt:'',cust:'',err:{},out:null,same:false},confirm:null,lastQR:null};
const T=(k,v)=>{let s=(window.I18N[k]||[k,k,k])[LANGS.indexOf(S.lang)];if(v)for(const a in v)s=s.replace('{'+a+'}',v[a]);return s};
const cr=()=>R[S.rest];
const money=(r,n)=>new Intl.NumberFormat(r.loc,{style:'currency',currency:r.cur}).format(n);
const dt=(r,d)=>new Intl.DateTimeFormat(r.loc,d.length>10?{dateStyle:'medium',timeStyle:'short'}:{dateStyle:'medium'}).format(new Date(d.length>10?d:d+'T12:00:00'));
const num=(r,n)=>new Intl.NumberFormat(r.loc).format(n);
const loc=(r,a)=>{const i=LANGS.indexOf(S.lang);if(a[i])return{t:a[i],fb:false};return{t:a[r.def],fb:true,l:NATIVE[LANGS[r.def]]}};
const tname=(r,t)=>loc(r,t.n).t;
const tiersOf=r=>[...r.tiers].sort((a,b)=>a.th-b.th);
const tierIdx=(r,earned)=>{let x=-1;tiersOf(r).forEach((t,i)=>{if(earned>=t.th)x=i});return x};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function theme(r){const t=(r||R.evviva).theme;for(const k in t)document.documentElement.style.setProperty(k,t[k])}
function logoHTML(r,h){return r.logo?`<img class="logo" style="height:${h||34}px" src="${r.logo}" alt="${r.name}">`:`<span style="font-family:var(--font-head);font-size:${(h||34)*.7}px;display:inline-flex;gap:6px;align-items:center"><svg viewBox="0 0 24 24" width="${(h||34)*.7}" height="${(h||34)*.7}" aria-hidden="true"><circle cx="12" cy="12" r="5" fill="#B83A1F"/><g stroke="#B83A1F" stroke-width="2" stroke-linecap="round"><path d="M12 1v3M12 20v3M1 12h3M20 12h3M4 4l2 2M18 18l2 2M20 4l-2 2M6 18l-2 2"/></g></svg>${r.name}</span>`}
function avatar(r){return `<span class="avatar" style="background:${r.theme['--brand-tint']}">${r.mark?`<img src="${r.mark}" alt="">`:`<span style="font-family:var(--font-head);font-size:22px;color:${r.theme['--brand-accent-text']}">CS</span>`}</span>`}

/* ---------- customer screens ---------- */
const TABS=[['home','home','tabHome'],['codes','ticket','tabCodes'],['me','user','tabMe']];
function frame(title,body,o={}){
 const back=o.back?`<button class="iconbtn" data-act="back" aria-label="${T('back')}">${ic('back')}</button>`:'';
 const tabs=o.tabs?`<nav class="tabbar" aria-label="Main"><button data-go="home" ${o.tabs==='home'?'aria-current="true"':''}>${ic('home')}${T('tabHome')}</button><button data-go="codes" ${o.tabs==='codes'?'aria-current="true"':''}>${ic('ticket')}${T('tabCodes')}</button><button class="scan" data-go="scan" aria-label="${T('tabScan')}"><span class="fab">${ic('scan')}</span><span>${T('tabScan')}</span></button><button data-go="me" ${o.tabs==='me'?'aria-current="true"':''}>${ic('user')}${T('tabMe')}</button></nav>`:'';
 return `<div class="status"><span>9:41</span><span>5G 100%</span></div><div class="topbar">${back}<h1>${title}</h1>${o.right||''}</div><div class="body">${body}</div>${tabs}${S.sheet||''}${S.toast?`<div class="toast" role="status">${S.toast}</div>`:''}`}
function langPicker(){return `<div class="seg" role="tablist" aria-label="${T('language')}">${LANGS.map(l=>`<button role="tab" aria-selected="${S.lang===l}" data-lang="${l}">${NATIVE[l]}</button>`).join('')}</div>`}
const fld=(id,lab,type,ph,err,hint)=>`<div class="field ${err?'bad':''}"><label for="${id}">${lab}</label><input id="${id}" type="${type}" ${ph?`placeholder="${ph}"`:''} ${err?`aria-invalid="true" aria-describedby="${id}e"`:''}>${err?`<div class="err" id="${id}e">${ic('alert').replace('class="i"','class="i" style="width:16px;height:16px"')}${err}</div>`:hint?`<div class="hint">${hint}</div>`:''}</div>`;

const C={
signin(){const e=S.errs;return frame('',`<div style="padding:24px 0 8px">${logoHTML(R.evviva,52)}</div><h1 style="font-size:32px;margin:10px 0 4px">${T('hello')}</h1><p class="muted" style="margin:0 0 20px">${T('appname')}</p>${e.signin?`<div class="banner err" role="alert" style="margin-bottom:14px">${ic('alert')}${T('signinerr')}</div>`:''}${fld('em',T('email'),'email')}${fld('pw',T('password'),'password')}<button class="btn block" data-act="signin">${T('signin')}</button><p class="small muted" style="text-align:center;margin-top:18px">${T('noacct')} <button class="link" data-go="signup">${T('signup')}</button></p><div style="margin-top:20px">${langPicker()}</div>`)},
signup(){const e=S.errs;return frame(T('signup'),`${fld('nm',T('name'),'text')}${fld('em',T('email'),'email','',e.email?T('dupEmail'):'')}${fld('pw',T('password'),'password','',e.pw?T('pwshort'):'',T('pwshort'))}<label class="check"><input type="checkbox" data-bind="age" ${S.age?'checked':''}><span>${T('age16')}</span></label>${e.age?`<div class="err small" style="color:var(--danger);margin:-4px 0 10px" role="alert">${T('agereq')}</div>`:''}<label class="check"><input type="checkbox" data-bind="consent" ${S.consent?'checked':''}><span>${T('consent')} <button class="link" data-go="privacy" style="min-height:32px">${T('readnotice')}</button></span></label>${e.consent?`<div class="err small" style="color:var(--danger);margin:-4px 0 10px" role="alert">${T('consentreq')}</div>`:''}<button class="btn block" data-act="signup">${T('signup')}</button><p class="small muted" style="text-align:center">${T('haveacct')} <button class="link" data-go="signin">${T('signin')}</button></p>`,{back:1})},
privacy(){return frame(T('privacy'),`<div class="card"><span class="chip mute">${T('privver')}</span><p>${T('privbody')}</p><p class="small muted">${T('protoNote')}</p></div>${langPicker()}`,{back:1})},
home(){const rs=Object.values(R);const mine=rs.filter(r=>r.member),other=rs.filter(r=>!r.member);
 const card=r=>{const m=r.member;const ti=m?tierIdx(r,m.earned):-1;return `<button class="rest-card" data-rest="${r.id}">${avatar(r)}<span style="flex:1;min-width:0"><b style="font-family:var(--font-head);font-size:20px;font-weight:400">${r.name}${r.demo?' <span class="chip mute">demo</span>':''}</b><br>${m?`<span class="muted small">${num(r,m.bal)} ${T('points')} · ${ti>=0?tname(r,tiersOf(r)[ti]):T('notier')}</span>`:`<span class="muted small">${T('nomember')}</span>`}</span>${ic('chev')}</button>`};
 return frame(T('yourRest'),`${mine.map(card).join('')}<h2 style="font-size:20px;margin:22px 0 10px">${T('discover')}</h2>${other.map(card).join('')}`,{tabs:'home'})},
restaurant(){const r=cr(),m=r.member,ti=m?tierIdx(r,m.earned):-1,tt=tiersOf(r),nx=tt[ti+1];
 const hero=`<div class="hero">${r.mark?`<img class="mark" src="${r.mark}" alt="">`:''}<div class="muted small">${T('balance')}</div><div class="big">${m?num(r,m.bal):'0'}</div><div class="muted" style="margin-bottom:12px">${T('points')}</div>${m?`<div class="row between small" style="margin-bottom:6px"><span class="tierbadge">${ic('star').replace('class="i"','class="i" style="width:16px;height:16px"')}${ti>=0?tname(r,tt[ti]):T('notier')}</span>${nx?`<span>${num(r,nx.th)} ${T('pts')}</span>`:''}</div><div class="progress" role="progressbar" aria-valuenow="${m.earned}" aria-valuemax="${nx?nx.th:m.earned}"><i style="width:${nx?Math.min(100,(m.earned-(ti>=0?tt[ti].th:0))/(nx.th-(ti>=0?tt[ti].th:0))*100):100}%"></i></div><p class="small" style="margin:8px 0 0">${nx?T(ti>=0?'toNext':'firstTier',{n:num(r,nx.th-m.earned),t:tname(r,nx)}):T('topTier')}</p>`:`<p class="small" style="margin:0">${T('nomember')}</p><button class="btn sm" style="margin-top:12px" data-go="scan">${ic('scan')}${T('tabScan')}</button>`}</div>`;
 const seg=`<div class="seg" role="tablist">${[['rewards','rewards'],['offers','offers'],['activity','activity']].map(([k,l])=>`<button role="tab" aria-selected="${S.tab===k}" data-tab="${k}">${T(l)}</button>`).join('')}</div>`;
 return frame(r.name,hero+seg+C['tab_'+S.tab](r),{back:1})},
tab_rewards(r){const m=r.member,ti=m?tierIdx(r,m.earned):-1,tt=tiersOf(r);
 return r.rewards.filter(x=>x.on).map(x=>{const lockedBy=x.min!==null&&x.min>ti;const need=m?x.cost-m.bal:x.cost;const st=lockedBy?'lock':need>0?'cost':'ok';const nm=loc(r,x.n),ds=loc(r,x.d);
 return `<div class="card reward ${st==='lock'?'locked':''}"><div style="flex:1;min-width:0"><b>${esc(nm.t)}</b><div class="small muted">${esc(ds.t)}</div><div class="small" style="margin-top:6px">${st==='ok'?`<span class="chip ok">${ic('check').replace('class="i"','class="i" style="width:14px;height:14px"')}${T('available')}</span>`:st==='lock'?`<span class="chip mute">${ic('lock').replace('class="i"','class="i" style="width:14px;height:14px"')}${T('lockedTier',{t:tname(r,tt[x.min])})}</span>`:`<span class="chip mute">${T('tooCostly',{n:num(r,need)})}</span>`}</div></div><div style="text-align:right"><div class="cost">${num(r,x.cost)}</div><div class="small muted">${T('pts')}</div>${st==='ok'?`<button class="btn sm" style="margin-top:8px" data-redeem="${x.id}">${T('redeem')}</button>`:''}</div></div>`}).join('')},
tab_offers(r){const p=r.promos.filter(x=>x.pub);if(!p.length)return `<p class="muted">${T('noOffers')}</p>`;
 return p.map(x=>{const t=loc(r,x.t),b=loc(r,x.b);const fb=t.fb||b.fb;return `<div class="card"><div class="row between"><span class="chip">${T('k'+{dish:'Dish',promo:'Promo',review:'Review'}[x.k])}</span>${fb?`<span class="chip mute">${T('fallbackLang',{l:t.fb?t.l:b.l})}</span>`:''}</div><h3 style="font-size:22px;margin:10px 0 4px">${esc(t.t)}</h3><p style="margin:0" class="muted">${esc(b.t)}</p></div>`}).join('')},
tab_activity(r){const m=r.member;if(!m||!m.ledger.length)return `<p class="muted">${T('historyEmpty')}</p>`;
 return `<div class="card">${m.ledger.map(l=>`<div class="list-item"><span class="avatar" style="width:40px;height:40px;border-radius:12px;background:${l.t==='earn'?'var(--success-bg)':'var(--brand-tint)'}">${ic(l.t==='earn'?'plus':'gift')}</span><span style="flex:1;min-width:0">${l.t==='earn'?T('earnLine',{i:l.i}):T('redLine',{r:esc(loc(r,r.rewards[l.r||0].n).t)})}<br><span class="small muted">${dt(r,l.d)}</span></span><span class="pts ${l.p>0?'plus':'minus'}">${l.p>0?'+':'−'}${num(r,Math.abs(l.p))}</span></div>`).join('')}</div>`},
scan(){const r=R.evviva;return `<div class="view"><div class="status" style="color:#fff"><span>9:41</span><span>5G 100%</span></div><div class="topbar" style="color:#fff"><button class="iconbtn" style="color:#fff" data-act="back" aria-label="${T('cancel')}">${ic('x')}</button><h1>${T('scanTitle')}</h1></div><div class="viewfinder"><div class="vf-frame"><div class="scanbar"></div></div><p style="position:absolute;bottom:16px;margin:0;padding:0 28px;text-align:center;font-size:14px">${T('scanHelp')}</p></div><div class="sim"><b>${T('simTitle')}</b><div>${[['valid','simValid'],['big','simBig'],['dup','simDup'],['cur','simCur'],['min','simMin'],['unk','simUnk'],['bad','simBad']].map(([k,l])=>`<button class="btn ghost sm" data-sim="${k}">${T(l)}</button>`).join('')}</div><div class="field" style="margin:12px 0 0"><label for="paste">${T('simPaste')}</label><textarea id="paste" placeholder='{"r":"evviva","i":"EV-20500","t":52.30,"c":"CAD"}'></textarea><button class="btn sm dark" style="margin-top:8px" data-sim="paste">${T('pasteGo')}</button></div></div></div>`},
result(){const x=S.scanRes,r=R.evviva;if(x.ok){return frame(T('scanTitle'),`<div class="burst">${ic('check').replace('class="i"','class="i" style="width:44px;height:44px"')}</div><h2 style="text-align:center;font-size:30px">${T('earned',{n:num(r,x.pts)})}</h2><p class="muted" style="text-align:center">${T('fromInv',{r:r.name,i:x.inv,a:money(r,x.amt)})}</p>${x.tierUp?`<div class="card" style="text-align:center;background:var(--brand-tint)">${ic('trophy')}<h3 style="font-size:22px">${T('tierUp',{t:x.tierUp})}</h3></div>`:''}<div class="card flat"><div class="row between"><span>${T('balance')}</span><b>${num(r,r.member.bal)} ${T('pts')}</b></div></div><button class="btn block" data-act="toRest">${T('viewRest')}</button><button class="btn ghost block" style="margin-top:10px" data-go="scan">${T('scanAnother')}</button>`,{})}
 return frame(T('scanTitle'),`<div class="burst bad">${ic('x').replace('class="i"','class="i" style="width:44px;height:44px"')}</div><div class="banner err" role="alert">${ic('alert')}<span>${x.msg}</span></div><button class="btn block" style="margin-top:18px" data-go="scan">${T('tryAgain')}</button><button class="link" style="display:block;margin:8px auto" data-act="back">${T('cancel')}</button>`,{})},
redeemed(){const r=cr(),x=S.lastCode;return frame(T('codeReady'),`<div class="burst">${ic('ticket').replace('class="i"','class="i" style="width:40px;height:40px"')}</div><h2 style="text-align:center;font-size:24px">${esc(loc(r,r.rewards.find(y=>y.id===x.rid).n).t)}</h2><div class="code" aria-label="${T('codeLabel')}">${x.c}</div><p class="muted" style="text-align:center;margin:0">${T('showStaff')}<br>${T('validUntil',{d:dt(r,x.u)})}</p><p style="text-align:center"><b>${T('newBalance',{n:num(r,r.member.bal)})}</b></p><button class="btn ghost block" data-act="copy">${ic('copy')}${T('copy')}</button><button class="btn block" style="margin-top:10px" data-act="back">${T('done')}</button>`,{})},
codes(){const rs=Object.values(R).filter(r=>r.codes.length);const lab={issued:['stIssued','ok'],used:['stUsed','mute'],expired:['stExpired','no']};
 return frame(T('myCodes'),rs.length?rs.map(r=>r.codes.map(c=>`<div class="card"><div class="row between"><b style="font-family:var(--font-head);font-size:19px;font-weight:400">${esc(loc(r,r.rewards[c.r].n).t)}</b><span class="chip ${lab[c.st][1]}">${T(lab[c.st][0])}</span></div><div class="code" style="${c.st!=='issued'?'opacity:.55;border-style:solid':''}">${c.c}</div><div class="small muted">${r.name} · ${T('validUntil',{d:dt(r,c.u)})}</div></div>`).join('')).join(''):`<p class="muted">${T('noCodes')}</p>`,{tabs:'codes'})},
me(){return frame(T('settings'),`<div class="card"><h3 style="font-size:20px;margin-bottom:10px">${T('language')}</h3>${langPicker()}</div><div class="card"><button class="row between link" style="width:100%;text-decoration:none;color:var(--brand-ink)" data-go="privacy"><span class="row">${ic('shield')}${T('privacy')}</span>${ic('chev')}</button><hr style="border:0;border-top:1px solid var(--border)"><button class="row between link" style="width:100%;text-decoration:none;color:var(--brand-ink)" data-go="data"><span class="row">${ic('user')}${T('myData')}</span>${ic('chev')}</button></div><button class="btn ghost block" data-go="signin">${T('signout')}</button>`,{tabs:'me'})},
data(){const q=S.myreq;return frame(T('myData'),`<p class="muted">${T('dataIntro')}</p>${q?`<div class="banner ok" role="status">${ic('check')}<span>${T('reqSent')}</span></div>`:`<button class="btn ghost block" data-req="export">${T('reqExport')}</button><button class="btn danger block" style="margin-top:12px" data-req="delete">${T('reqDelete')}</button>`}`,{back:1})}
};
function sheetFor(type,id){const r=cr();
 if(type==='redeem'){const x=r.rewards.find(y=>y.id===id);return `<div class="sheet-wrap"><div class="sheet" role="dialog" aria-modal="true" aria-labelledby="sh"><h2 id="sh" style="font-size:24px">${T('confirmRedeem')}</h2><p><b>${esc(loc(r,x.n).t)}</b></p><p class="muted">${T('redeemExplain',{c:num(r,x.cost)})}</p><div class="row"><button class="btn ghost" style="flex:1" data-act="closeSheet">${T('cancel')}</button><button class="btn" style="flex:1" data-act="doRedeem" data-id="${id}">${T('confirm')}</button></div></div></div>`}
 const kind=id;return `<div class="sheet-wrap"><div class="sheet" role="dialog" aria-modal="true" aria-labelledby="sh"><h2 id="sh" style="font-size:24px">${T(kind==='delete'?'reqDelete':'reqExport')}</h2><p class="muted">${T(kind==='delete'?'delWarn':'expWarn')}</p><div class="row"><button class="btn ghost" style="flex:1" data-act="closeSheet">${T('cancel')}</button><button class="btn ${kind==='delete'?'danger':''}" style="flex:1" data-act="doReq" data-id="${kind}">${T('confirm')}</button></div></div></div>`}

/* ---------- admin ---------- */
const NAV=[['activity','chart','nActivity'],['rule','sliders','nRule'],['tiers','layers','nTiers'],['rewards','gift','nRewards'],['content','mega','nContent'],['redeem','ticket','nRedeem'],['branches','pin','nBranches'],['qr','scan','nQr'],['api','key','nApi'],['settings','store','nSettings']];
const langTabs=k=>`<div class="lang-tabs" role="tablist">${LANGS.map((l,i)=>`<button role="tab" aria-selected="${S.ltab[k]===i}" data-ltab="${k}:${i}">${l.toUpperCase()}</button>`).join('')}</div>`;
const A={
signin(){return `<div style="max-width:420px;margin:70px auto;padding:0 20px"><div class="card" style="padding:28px">${logoHTML(R.evviva,52)}<h1 style="margin:16px 0 4px">${T('aSignin')}</h1><p class="muted">${T('aSigninHint')}</p>${S.errs.admin?`<div class="banner err" role="alert" style="margin-bottom:14px">${ic('alert')}${T('signinerr')}</div>`:''}${fld('aem',T('email'),'email')}${fld('apw',T('password'),'password')}<button class="btn block" data-act="adminIn">${T('signin')}</button></div></div>`},
activity(r){return `<header><h1>${T('nActivity')}</h1></header><div class="grid g3" style="margin-bottom:14px"><div class="card kpi"><div class="small muted">${T('kCustomers')}</div><div class="v">${r.customers.length*37}</div></div><div class="card kpi"><div class="small muted">${T('kIssued')}</div><div class="v">${num(r,12480)}</div></div><div class="card kpi"><div class="small muted">${T('kRedeem')}</div><div class="v">41</div></div></div><div class="grid g2"><div class="card"><h3 style="margin-bottom:8px">${T('recentCredits')}</h3><table><tr><th>${T('cCustomer')}</th><th>${T('cAmount')}</th><th>${T('cPoints')}</th><th>${T('cWhen')}</th></tr>${r.credits.map(c=>`<tr><td>${c[0]}<br><span class="small muted">${c[1]}</span></td><td>${c[2].replace('$',r.cur==='CAD'?'$':'$')}</td><td class="pts plus">+${c[3]}</td><td>${dt(r,c[4])}</td></tr>`).join('')}</table></div><div class="card"><h3 style="margin-bottom:8px">${T('recentRed')}</h3>${r.reds.length?`<table><tr><th>${T('cCustomer')}</th><th>${T('cReward')}</th><th>${T('cStatus')}</th></tr>${r.reds.map(c=>`<tr><td>${c[0]}<br><span class="small muted">${dt(r,c[2])}</span></td><td>${esc(loc(r,r.rewards[c[1]].n).t)}</td><td><span class="chip ${c[3]==='Used'?'mute':'ok'}">${c[3]==='Used'?T('stUsed'):T('stIssued')}</span></td></tr>`).join('')}</table>`:`<p class="muted">${T('historyEmpty')}</p>`}</div></div><div class="card"><h3 style="margin-bottom:8px">${T('custList')}</h3><table><tr><th>${T('cCustomer')}</th><th>${T('cBalance')}</th><th>${T('cTier')}</th></tr>${r.customers.map(c=>`<tr><td>${c[0]}</td><td>${num(r,c[1])} ${T('pts')}</td><td>${c[2]}</td></tr>`).join('')}</table></div>`},
rule(r){const ex=45.9,p=Math.floor(ex*r.rate);return `<header><h1>${T('nRule')}</h1></header><div class="card" style="max-width:640px"><p class="muted" style="margin-top:0">${T('ruleHelp')}</p><div class="field"><label for="rt">${T('perUnit',{c:r.cur})}</label><input id="rt" type="number" step="0.01" min="0" value="${r.rate}" data-rule="rate"></div><div class="field"><label for="rd">${T('rounding')}</label><select id="rd"><option>${T('roundDown')}</option></select></div><div class="field"><label for="mn">${T('minAmount')} (${r.cur})</label><input id="mn" type="number" min="0" value="${r.min}" data-rule="min"></div><div class="preview" id="pv" aria-live="polite">${T('example',{a:money(r,ex),p})} ${T('tipNote')}</div><button class="btn" style="margin-top:16px" data-act="save">${T('save')}</button></div>`},
tiers(r){const tt=tiersOf(r),i=S.ltab.tier;return `<header><h1>${T('nTiers')}</h1><button class="btn sm" data-act="addTier">${ic('plus')}${T('addTier')}</button></header><p class="muted" style="margin-top:-8px">${T('tiersHelp')}</p><div class="card">${langTabs('tier')}<table><tr><th>#</th><th>${T('tierName')} (${LANGS[i].toUpperCase()})</th><th>${T('threshold')}</th><th></th></tr>${tt.map((t,k)=>`<tr><td>${k+1}</td><td><input aria-label="${T('tierName')}" value="${esc(t.n[i]||'')}" placeholder="${T('missing')}" style="width:100%;min-height:44px;border:1.5px solid #8B847D;border-radius:10px;padding:0 12px"></td><td><input aria-label="${T('threshold')}" type="number" value="${t.th}" style="width:110px;min-height:44px;border:1.5px solid #8B847D;border-radius:10px;padding:0 12px"></td><td><button class="link">${T('save')}</button></td></tr>`).join('')}</table></div>`},
rewards(r){return `<header><h1>${T('nRewards')}</h1><button class="btn sm" data-act="addReward">${ic('plus')}${T('addReward')}</button></header>${S.edit==='reward'?A.rewardForm(r):''}<div class="card"><table><tr><th>${T('cReward')}</th><th>${T('cost')}</th><th>${T('minTier')}</th><th>${T('validity')}</th><th>${T('cStatus')}</th></tr>${r.rewards.map(x=>`<tr><td><b>${esc(loc(r,x.n).t)}</b></td><td>${num(r,x.cost)}</td><td>${x.min===null?T('anyTier'):tname(r,tiersOf(r)[x.min])}</td><td>${dt(r,x.until)}</td><td><div class="row"><button class="switch" role="switch" aria-checked="${x.on}" aria-label="${T('active')}" data-toggle="rw:${x.id}"></button><span class="small">${x.on?T('active'):T('inactive')}</span></div></td></tr>`).join('')}</table></div>`},
rewardForm(r){const i=S.ltab.rew;return `<div class="card"><h3 style="margin-bottom:8px">${T('addReward')}</h3>${langTabs('rew')}<div class="grid g2"><div class="field"><label for="rn">${T('rName')} (${LANGS[i].toUpperCase()})</label><input id="rn"></div><div class="field"><label for="rds">${T('rDesc')} (${LANGS[i].toUpperCase()})</label><input id="rds"></div><div class="field"><label for="rc">${T('cost')}</label><input id="rc" type="number"></div><div class="field"><label for="rm">${T('minTier')}</label><select id="rm"><option>${T('anyTier')}</option>${tiersOf(r).map(t=>`<option>${tname(r,t)}</option>`).join('')}</select></div></div><div class="row"><button class="btn sm" data-act="save">${T('save')}</button><button class="btn sm ghost" data-act="closeEdit">${T('cancel')}</button></div></div>`},
content(r){const i=S.ltab.con;return `<header><h1>${T('nContent')}</h1><button class="btn sm" data-act="addContent">${ic('plus')}${T('addContent')}</button></header><p class="muted" style="margin-top:-8px">${T('contentHelp',{l:NATIVE[LANGS[r.def]]})}</p>${langTabs('con')}<div class="grid g2">${r.promos.map(x=>`<div class="card"><div class="row between"><span class="chip">${T('k'+{dish:'Dish',promo:'Promo',review:'Review'}[x.k])}</span><div class="row"><span class="small">${x.pub?T('published'):T('unpublished')}</span><button class="switch" role="switch" aria-checked="${x.pub}" aria-label="${T('published')}" data-toggle="pr:${x.id}"></button></div></div><h3 style="font-size:20px;margin:10px 0 4px">${x.t[i]?esc(x.t[i]):`<span class="chip no">${T('missing')}</span>`}</h3><p class="muted small" style="margin:0">${x.b[i]?esc(x.b[i]):`<span class="chip no">${T('missing')}</span>`}</p></div>`).join('')}</div>`},
redeem(r){const x=S.codeRes;return `<header><h1>${T('nRedeem')}</h1></header><div class="card" style="max-width:560px"><div class="field"><label for="cd">${T('codeLabel')}</label><input id="cd" autocomplete="off" style="font-family:ui-monospace,Consolas,monospace;letter-spacing:.08em;text-transform:uppercase" placeholder="EVV-XXXX-XXXX"><div class="hint">${T('tryCodes')}</div></div><button class="btn" data-act="checkCode">${T('check')}</button>${x?`<div style="margin-top:18px">${x.ok?`<div class="banner ok" role="status">${ic('check')}<span><b>${T('codeValid')}</b><br>${esc(x.rw)} · ${x.cu}</span></div>${x.done?`<div class="banner ok" style="margin-top:10px">${ic('check')}${T('codeDone')}</div>`:`<button class="btn dark" style="margin-top:12px" data-act="markUsed">${T('markUsed')}</button>`}`:`<div class="banner err" role="alert">${ic('alert')}${x.msg}</div>`}</div>`:''}</div>`},
settings(r){return `<header><h1>${T('nSettings')}</h1></header><div class="card" style="max-width:560px"><div class="banner info" style="margin-bottom:14px">${ic('lock')}${T('setRO')}</div><div class="list-item"><span style="flex:1">${T('curr')}</span><b>${r.cur}</b></div><div class="list-item"><span style="flex:1">${T('regional')}</span><b>${r.loc} · ${money(r,1234.5)}</b></div><div class="list-item"><span style="flex:1">${T('defLang')}</span><b>${NATIVE[LANGS[r.def]]}</b></div><p class="small muted">${T('brandNote')}</p></div>`}
};
const O={
restaurants(){return `<header><h1>${T('oRestaurants')}</h1></header><div class="grid g2"><div class="card"><h3 style="margin-bottom:8px">${T('oRestaurants')}</h3><table><tr><th></th><th>${T('curr')}</th><th>${T('defLang')}</th></tr>${Object.values(R).map(r=>`<tr><td><b>${r.name}</b></td><td>${r.cur}</td><td>${NATIVE[LANGS[r.def]]}</td></tr>`).join('')}</table></div><div class="card"><h3 style="margin-bottom:8px">${T('oCreate')}</h3>${fld('on',T('name'),'text')}<div class="grid g2"><div class="field"><label for="oc">${T('curr')}</label><select id="oc"><option>CAD</option><option>MXN</option></select></div><div class="field"><label for="ol">${T('regional')}</label><select id="ol"><option>en-CA</option><option>fr-CA</option><option>es-MX</option></select></div></div><div class="field"><label for="od">${T('defLang')}</label><select id="od">${LANGS.map(l=>`<option>${NATIVE[l]}</option>`).join('')}</select></div>${fld('oae',T('oAdminEmail'),'email','','',T('oDefBranch'))}${fld('opw',T('oTempPw'),'password')}<button class="btn" data-act="save">${T('oCreate')}</button></div></div>`},
requests(){return `<header><h1>${T('oRequests')}</h1></header><div class="card"><table><tr><th>${T('cCustomer')}</th><th>${T('rType')}</th><th>${T('cWhen')}</th><th>${T('cStatus')}</th><th></th></tr>${S.reqs.map((q,i)=>`<tr><td>${q.c}</td><td>${T(q.ty==='export'?'tExport':'tDelete')}</td><td>${dt(R.evviva,q.d)}</td><td><span class="chip ${q.st==='pending'?'':'ok'}">${T(q.st==='pending'?'pending':'completed')}</span></td><td>${q.st==='pending'?`<button class="btn sm dark" data-complete="${i}">${T('complete')}</button>`:''}</td></tr>`).join('')}</table></div>`}
};

/* ---------- shell ---------- */
const CUST=[['signin','SCR-001 '],['signup','SCR-002 '],['privacy','SCR-003 '],['home','SCR-004 '],['restaurant','SCR-005/006/011/012 '],['scan','SCR-009 '],['result','SCR-010 '],['redeemed','SCR-007 '],['codes','SCR-008 '],['me','SCR-013 '],['data','SCR-014 ']];
const CLAB={signin:'Sign in',signup:'Sign up',privacy:'Privacy notice',home:'Home',restaurant:'Restaurant hub',scan:'Scan',result:'Scan result',redeemed:'Code issued',codes:'My codes',me:'Settings',data:'My data'};
const ADM=[['signin','SCR-015 Sign in'],['activity','SCR-016 Activity'],['rule','SCR-017 Points rule'],['tiers','SCR-018 Tiers'],['rewards','SCR-019 Rewards'],['content','SCR-020 Content'],['redeem','SCR-021 Validate code'],['branches','SCR-025 Branches'],['qr','SCR-027 QR test generator'],['api','SCR-026 QR API access'],['settings','SCR-022 Restaurant']];
function render(){
 const r=cr();
 let inRest=S.view==='customer'&&['restaurant','redeemed'].includes(S.scr);
 theme(S.view==='customer'&&!inRest?R.evviva:r);
 document.documentElement.lang=S.lang;
 let h=`<div class="chrome"><b>Restaurant Points</b><div class="grp"><button data-view="customer" aria-pressed="${S.view==='customer'}">Customer app</button><button data-view="admin" aria-pressed="${S.view==='admin'}">Restaurant admin</button><button data-view="operator" aria-pressed="${S.view==='operator'}">Operator</button></div><div class="grp"><label>Lang</label>${LANGS.map(l=>`<button data-lang="${l}" aria-pressed="${S.lang===l}">${l.toUpperCase()}</button>`).join('')}</div><div class="grp"><label>Restaurant</label>${Object.values(R).map(x=>`<button data-setrest="${x.id}" aria-pressed="${S.rest===x.id}">${x.name}</button>`).join('')}</div></div><div class="stage">`;
 if(S.view==='customer'){
  h+=`<aside class="rail" aria-label="Screens"><h4>Customer screens</h4>${CUST.map(([k,n])=>`<button data-jump="${k}" ${S.scr===k?'aria-current="true"':''}>${n}${CLAB[k]}</button>`).join('')}<p><small>Demo prototype, local only. Data is fake.</small></p></aside><div class="phone"><div class="screen" id="screen">${S.scr==='scan'?C.scan():C[S.scr]()}</div></div>`;
 }else if(S.view==='admin'){
  h+=`<div class="browser"><div class="bar">● ● ●<span>https://admin.restaurant-points.local/${S.aScr}</span></div>${!S.adminIn?A.signin():`<div class="admin"><nav class="side" aria-label="Main">${logoHTML(r,34).replace('class="logo"','class="logo" ')}${NAV.map(([k,i,l])=>`<button data-ascr="${k}" ${S.aScr===k?'aria-current="true"':''}>${ic(i)}${T(l)}</button>`).join('')}<span class="sp"></span><button data-act="adminOut">${ic('back')}${T('signout')}</button></nav><main class="main">${S.toast?`<div class="banner ok" role="status" style="margin-bottom:12px">${ic('check')}${S.toast}</div>`:''}${A[S.aScr](r)}</main></div>`}</div><aside class="rail"><h4>Admin screens</h4>${ADM.map(([k,n])=>`<button data-ajump="${k}" ${S.aScr===k&&(S.adminIn||k==='signin')?'aria-current="true"':''}>${n}</button>`).join('')}</aside>`;
 }else{
  h+=`<div class="browser"><div class="bar">● ● ●<span>https://operator.restaurant-points.local/${S.oScr}</span></div><div class="admin"><nav class="side" aria-label="Main"><span style="font-family:var(--font-head);font-size:20px;padding:6px 12px 14px">${T('nOps')}</span><button data-oscr="restaurants" ${S.oScr==='restaurants'?'aria-current="true"':''}>${ic('store')}SCR-023 ${T('oRestaurants')}</button><button data-oscr="requests" ${S.oScr==='requests'?'aria-current="true"':''}>${ic('shield')}SCR-024 ${T('oRequests')}</button></nav><main class="main">${S.toast?`<div class="banner ok" role="status" style="margin-bottom:12px">${ic('check')}${S.toast}</div>`:''}${O[S.oScr]()}</main></div></div>`;
 }
 h+='</div>';
 const act=document.activeElement&&document.activeElement.id;
 document.body.innerHTML=h;
 if(act){const e=document.getElementById(act);if(e)e.focus()}
 if(S.toast){clearTimeout(S._t);S._t=setTimeout(()=>{S.toast=null;render()},2200)}
}
function go(s){S.scr=s;S.errs={};S.sheet=null;if(s==='signin')S.signedIn=false;render()}
/* ---------- signed platform QR (prototype). Payload: RP1|restaurant|branch|invoice|amount|customer|signature ---------- */
const ME='C-1042', CUSTS={'C-1042':'Marie Tremblay','C-2001':'Daniel Ortiz','C-2002':'Priya Shah'};
const NOW='2026-10-19T14:05';
function sig(s){let h=5381;const k=s+'|proto-secret';for(let i=0;i<k.length;i++)h=((h<<5)+h+k.charCodeAt(i))>>>0;return h.toString(36).toUpperCase()}
function mkQR(r,b,i,amt,cust){const body=['RP1',r,b,i,Number(amt).toFixed(2),cust||''].join('|');return body+'|'+sig(body)}
function parseQR(txt){const p=String(txt||'').trim().split('|');if(p.length!==7||p[0]!=='RP1')return{err:'errMal'};const amt=Number(p[4]);if(!p[1]||!p[2]||!p[3]||!isFinite(amt)||amt<=0)return{err:'errMal'};if(sig(p.slice(0,6).join('|'))!==p[6])return{err:'errAuth'};return{r:p[1],b:p[2],i:p[3],amt,c:p[5]}}
const branchOf=(r,code)=>r.branches.find(x=>x.code===code);
const bname=(r,code)=>{const b=branchOf(r,code);return b?loc(r,b.n).t:code};
function simPayload(k){switch(k){
 case'valid':return mkQR('evviva','EGL','EV-20481',45.9,'');
 case'big':return mkQR('evviva','WEL','EV-20520',880,'');
 case'casa':return mkQR('casa','CEN','CS-3402',250,'');
 case'dup':return mkQR('evviva','NYK','EV-20310',112.4,'');
 case'tamper':return mkQR('evviva','EGL','EV-20530',45.9,'').replace('|45.90|','|450.90|');
 case'other':return mkQR('evviva','BAR','EV-20600',60,'C-2001');
 case'nocust':return mkQR('evviva','BAR','EV-20601',60,'C-9999');
 case'min':return mkQR('evviva','EGL','EV-20602',3,'');
 case'unkb':return mkQR('evviva','XXX','EV-20603',50,'');
 case'unkr':return mkQR('nope','EGL','EV-20604',50,'');
 case'last':return S.lastQR||'';
 default:return 'hello'}}
function scanQR(txt){
 const q=parseQR(txt);if(q.err)return{ok:false,key:q.err};
 const r=R[q.r];if(!r)return{ok:false,key:'errUnkR'};
 if(!branchOf(r,q.b))return{ok:false,key:'errUnkB'};
 if(q.c&&!CUSTS[q.c])return{ok:false,key:'errUnkC'};
 if(q.c&&q.c!==ME)return{ok:false,key:'errOther'};
 if(S.seen.has(q.r+':'+q.i))return{ok:false,key:'errDup2'};
 if(q.amt<r.min)return{ok:false,key:'errMin2',vars:{m:money(r,r.min)}};
 S.seen.add(q.r+':'+q.i);
 if(!r.member)r.member={bal:0,earned:0,ledger:[]};
 const m=r.member,before=tierIdx(r,m.earned),p=Math.floor(q.amt*r.rate);m.bal+=p;m.earned+=p;
 m.ledger.unshift({t:'earn',i:q.i,p,d:NOW,b:q.b,a:q.amt});
 r.credits.unshift({c:'Marie T.',i:q.i,b:q.b,a:q.amt,p,d:NOW});
 const after=tierIdx(r,m.earned);
 return{ok:true,r:r.id,b:q.b,pts:p,inv:q.i,amt:q.amt,d:NOW,tierUp:after>before?tname(r,tiersOf(r)[after]):null}}
function qrPng(text,scale,margin){scale=scale||6;margin=margin||3;const q=qrcode(0,'M');q.addData(text);q.make();const n=q.getModuleCount(),size=(n+margin*2)*scale;const c=document.createElement('canvas');c.width=c.height=size;const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,size,size);x.fillStyle='#000';for(let i=0;i<n;i++)for(let j=0;j<n;j++)if(q.isDark(i,j))x.fillRect((j+margin)*scale,(i+margin)*scale,scale,scale);return c.toDataURL('image/png')}
function newSecret(){return 'rpk_live_'+Array.from({length:3},()=>Math.random().toString(36).slice(2,10)).join('')}
function genQR(){const r=cr(),q=S.q,e={};
 const b=branchOf(r,q.b);if(!b||!b.on)e.b=T('qrPick');
 if(!q.inv.trim())e.inv=T('qrErrInv');
 const amt=Number(String(q.amt).replace(',','.'));if(!(amt>0)||!isFinite(amt))e.amt=T('qrErrAmt');
 const cu=(q.cust||'').trim();if(cu&&!CUSTS[cu])e.cust=T('qrErrCust');
 q.same=false;q.out=null;
 if(!Object.keys(e).length){const k=q.inv.trim(),prev=r.invoices[k];
  if(prev&&(prev.b!==q.b||Number(prev.amt)!==amt||prev.c!==cu))e.conf=T('qrErrConf');
  else{if(prev)q.same=true;r.invoices[k]={b:q.b,amt,c:cu};const payload=mkQR(r.id,q.b,k,amt,cu);S.lastQR=payload;q.out={payload,img:qrPng(payload),inv:k}}}
 q.err=e}
function toggleBranch(code){const r=cr(),b=branchOf(r,code);S.br.err=null;
 if(b.on&&r.branches.filter(x=>x.on).length<=1){S.br.err='brLast';return}b.on=!b.on}
function saveBranch(){const r=cr();const g=id=>(document.getElementById(id)||{}).value||'';const names=[g('bn0').trim()||null,g('bn1').trim()||null,g('bn2').trim()||null];const code=g('bc').trim().toUpperCase();
 if(!names[r.def]||!code){S.br.err='brReq';return}
 if(r.branches.some(x=>x.code===code&&x.code!==S.br.edit)){S.br.err='brDup';return}
 if(S.br.edit==='new')r.branches.push({code,n:names,on:true});else{const b=branchOf(r,S.br.edit);b.n=names;b.code=code}
 S.br={edit:null,err:null};S.toast=T('saved')}

/* ---- customer: scan, result, activity (QR delta) ---- */
C.scan=function(){return `<div class="view"><div class="status" style="color:#fff"><span>9:41</span><span>5G 100%</span></div><div class="topbar" style="color:#fff"><button class="iconbtn" style="color:#fff" data-act="back" aria-label="${T('cancel')}">${ic('x')}</button><h1>${T('scanTitle')}</h1></div><div class="viewfinder"><div class="vf-frame"><div class="scanbar"></div></div><p style="position:absolute;bottom:16px;margin:0;padding:0 28px;text-align:center;font-size:14px">${T('scanHelp')}</p></div><div class="sim"><b>${T('simTitle')}</b><div>${[['valid','simValidB'],['big','simBigB'],['casa','simCasa'],['last','simLast'],['dup','simUsedQr'],['tamper','simTamper'],['other','simOther'],['nocust','simNoCust'],['min','simMinB'],['unkb','simNoBr'],['unkr','simUnk'],['bad','simBad']].filter(([k])=>k!=='last'||S.lastQR).map(([k,l])=>`<button class="btn ghost sm" data-sim="${k}">${T(l)}</button>`).join('')}</div><div class="field" style="margin:12px 0 0"><label for="paste">${T('pasteHint')}</label><textarea id="paste" placeholder="RP1|evviva|EGL|EV-20500|52.30||XXXXXX"></textarea><button class="btn sm dark" style="margin-top:8px" data-sim="paste">${T('pasteGo')}</button></div></div></div>`};
C.result=function(){const x=S.scanRes;
 if(x.ok){const r=R[x.r];return frame(T('scanTitle'),`<div class="burst">${ic('check').replace('class="i"','class="i" style="width:44px;height:44px"')}</div><h2 style="text-align:center;font-size:30px">${T('earned',{n:num(r,x.pts)})}</h2><p class="muted" style="text-align:center;margin:6px 0 2px"><b style="color:var(--brand-ink)">${T('atBranch',{r:r.name,b:esc(bname(r,x.b))})}</b></p><p class="muted small" style="text-align:center;margin-top:0">${T('fromInv2',{i:x.inv,a:money(r,x.amt),d:dt(r,x.d)})}</p>${x.tierUp?`<div class="card" style="text-align:center;background:var(--brand-tint)">${ic('trophy')}<h3 style="font-size:22px">${T('tierUp',{t:x.tierUp})}</h3></div>`:''}<div class="card flat"><div class="row between"><span>${T('balance')}</span><b>${num(r,r.member.bal)} ${T('pts')}</b></div></div><button class="btn block" data-act="toRest">${T('viewRest')}</button><button class="btn ghost block" style="margin-top:10px" data-go="scan">${T('scanAnother')}</button>`,{})}
 return frame(T('scanTitle'),`<div class="burst bad">${ic('x').replace('class="i"','class="i" style="width:44px;height:44px"')}</div><div class="banner err" role="alert">${ic('alert')}<span>${T(x.key,x.vars)}<br><b>${T('whatNow')}</b></span></div><button class="btn block" style="margin-top:18px" data-go="scan">${T('tryAgain')}</button><button class="link" style="display:block;margin:8px auto" data-act="back">${T('cancel')}</button>`,{})};
C.tab_activity=function(r){const m=r.member;if(!m||!m.ledger.length)return `<p class="muted">${T('historyEmpty')}</p>`;
 return `<div class="card">${m.ledger.map(l=>`<div class="list-item"><span class="avatar" style="width:40px;height:40px;border-radius:12px;background:${l.t==='earn'?'var(--success-bg)':'var(--brand-tint)'}">${ic(l.t==='earn'?'plus':'gift')}</span><span style="flex:1;min-width:0">${l.t==='earn'?T('earnLine',{i:l.i}):T('redLine',{r:esc(loc(r,r.rewards[l.r||0].n).t)})}<br><span class="small muted">${l.b?`<b>${esc(bname(r,l.b))}</b> · `:''}${dt(r,l.d.length>10?l.d:l.d+'T12:00')}</span></span><span class="pts ${l.p>0?'plus':'minus'}">${l.p>0?'+':'−'}${num(r,Math.abs(l.p))}</span></div>`).join('')}</div>`};

/* ---- admin: activity with filters, branches, API access, QR test generator ---- */
const ferr=m=>m?`<div class="err" style="font-size:13px;color:var(--danger);margin-top:4px;display:flex;gap:6px" role="alert">${ic('alert').replace('class="i"','class="i" style="width:16px;height:16px"')}${m}</div>`:'';
A.activity=function(r){const f=S.f;const inR=d=>(!f.from||d.slice(0,10)>=f.from)&&(!f.to||d.slice(0,10)<=f.to);
 const cs=r.credits.filter(c=>(!f.br.length||f.br.includes(c.b))&&inR(c.d));const rs=r.reds.filter(c=>inR(c[2]));const filt=f.br.length||f.from||f.to;
 return `<header><h1>${T('nActivity')}</h1></header><div class="grid g3" style="margin-bottom:14px"><div class="card kpi"><div class="small muted">${T('kCustomers')}</div><div class="v">${r.customers.length*37}</div></div><div class="card kpi"><div class="small muted">${T('kIssued')}</div><div class="v">${num(r,12480)}</div></div><div class="card kpi"><div class="small muted">${T('kRedeem')}</div><div class="v">41</div></div></div>
 <div class="card"><div style="display:flex;flex-direction:column;gap:12px"><div class="row" style="flex-wrap:wrap;gap:8px 10px"><b style="min-width:64px">${T('filters')}</b><div class="row" style="flex-wrap:wrap;gap:6px" role="group" aria-label="${T('branches')}">${r.branches.map(b=>`<button class="fchip" aria-pressed="${f.br.includes(b.code)}" data-fbr="${b.code}">${esc(loc(r,b.n).t)}</button>`).join('')}</div></div><div class="row" style="flex-wrap:wrap;gap:10px 16px;align-items:flex-end"><div class="field" style="margin:0"><label for="ff">${T('dFrom')}</label><input id="ff" type="date" data-f="from" value="${f.from}" style="min-height:44px;width:auto"></div><div class="field" style="margin:0"><label for="ft">${T('dTo')}</label><input id="ft" type="date" data-f="to" value="${f.to}" style="min-height:44px;width:auto"></div>${filt?`<button class="link" data-act="clearF">${T('clearF')}</button>`:''}</div></div></div>
 <div class="grid"><div class="card"><h3 style="margin-bottom:8px">${T('recentCredits')}</h3>${cs.length?`<table><tr><th>${T('cWhen')}</th><th>${T('cBranch')}</th><th>${T('cCustomer')}</th><th>${T('cAmount')}</th><th>${T('cPoints')}</th></tr>${cs.map(c=>`<tr><td style="white-space:nowrap">${dt(r,c.d)}</td><td>${esc(bname(r,c.b))}</td><td>${c.c}<br><span class="small muted">${c.i}</span></td><td>${money(r,c.a)}</td><td class="pts plus">+${c.p}</td></tr>`).join('')}</table>`:`<p class="muted">${T(filt?'noMatch':'historyEmpty')}</p>`}</div><div class="card"><h3 style="margin-bottom:8px">${T('recentRed')}</h3>${rs.length?`<table><tr><th>${T('cCustomer')}</th><th>${T('cReward')}</th><th>${T('cStatus')}</th></tr>${rs.map(c=>`<tr><td>${c[0]}<br><span class="small muted">${dt(r,c[2])}</span></td><td>${esc(loc(r,r.rewards[c[1]].n).t)}</td><td><span class="chip ${c[3]==='Used'?'mute':'ok'}">${c[3]==='Used'?T('stUsed'):T('stIssued')}</span></td></tr>`).join('')}</table>`:`<p class="muted">${T(filt?'noMatch':'historyEmpty')}</p>`}${f.br.length?`<p class="small muted" style="margin-bottom:0">${T('redNoBr')}</p>`:''}</div></div>
 <div class="card"><h3 style="margin-bottom:8px">${T('custList')}</h3><table><tr><th>${T('cCustomer')}</th><th>${T('cBalance')}</th><th>${T('cTier')}</th></tr>${r.customers.map(c=>`<tr><td>${c[0]}</td><td>${num(r,c[1])} ${T('pts')}</td><td>${c[2]}</td></tr>`).join('')}</table></div>`};
A.branches=function(r){const e=S.br.edit,eb=e&&e!=='new'?branchOf(r,e):null;const used=['EGL','WEL','BAR','NYK','VAU','LSI','CEN','ROM'];
 const form=e?`<div class="card"><h3 style="margin-bottom:10px">${T(e==='new'?'addBranch':'edit')}</h3>${S.br.err?`<div class="banner err" role="alert" style="margin-bottom:12px">${ic('alert')}${T(S.br.err)}</div>`:''}<div class="grid g3">${LANGS.map((l,i)=>`<div class="field"><label for="bn${i}">${T('brName')} (${l.toUpperCase()})${i===r.def?' *':''}</label><input id="bn${i}" value="${eb&&eb.n[i]?esc(eb.n[i]):''}"></div>`).join('')}</div><div class="hint small muted" style="margin:-6px 0 12px">${T('brDefReq',{l:NATIVE[LANGS[r.def]]})}</div><div class="field" style="max-width:240px"><label for="bc">${T('brCode')}</label><input id="bc" value="${eb?eb.code:''}" style="text-transform:uppercase"></div><div class="row"><button class="btn sm" data-act="saveBr">${T('save')}</button><button class="btn sm ghost" data-act="cancelBr">${T('cancel')}</button></div></div>`:'';
 return `<header><h1>${T('branches')}</h1><button class="btn sm" data-act="newBr">${ic('plus')}${T('addBranch')}</button></header><p class="muted" style="margin-top:-8px">${T('brHelp')}</p>${!e&&S.br.err?`<div class="banner err" role="alert" style="margin-bottom:12px">${ic('alert')}${T(S.br.err)}</div>`:''}${form}<div class="card"><table><tr><th>${T('brName')}</th><th>${T('brCode')}</th><th>${T('cStatus')}</th><th></th></tr>${r.branches.map(b=>`<tr><td><b>${esc(loc(r,b.n).t)}</b></td><td><code>${b.code}</code></td><td><div class="row"><button class="switch" role="switch" aria-checked="${b.on}" aria-label="${T('active')}" data-togbr="${b.code}"></button><span class="small">${b.on?T('active'):T('inactive')}</span></div></td><td><button class="link" data-editbr="${b.code}">${T('edit')}</button></td></tr>`).join('')}</table><p class="small muted" style="margin-bottom:0">${T('brNoDel')}${r.id==='evviva'?' '+T('brSampleNote'):''}</p></div>`};
A.api=function(r){const c=r.cred;const conf=S.confirm;
 const secret=c.secret?`<div class="card" style="border:2px solid var(--brand-accent-text);background:var(--brand-tint)"><h3 style="margin-bottom:6px">${ic('alert')} ${T('apiSecretT')}</h3><p class="small" style="margin:0 0 10px">${T('apiSecretW')}</p><div class="code" style="font-size:18px;word-break:break-all">${c.secret}</div><div class="row" style="flex-wrap:wrap"><button class="btn sm dark" data-act="copySecret">${ic('copy')}${T('apiCopyBtn')}</button><button class="btn sm ghost" data-act="secretDone">${T('apiSecretDone')}</button></div></div>`:'';
 const confirm=conf?`<div class="banner info" role="alertdialog" style="margin-bottom:14px">${ic('alert')}<span style="flex:1"><b>${T('confirmT')}</b> ${T(conf==='rotate'?'apiRotWarn':'apiRevWarn')}<br><span class="row" style="margin-top:10px"><button class="btn sm ${conf==='revoke'?'danger':'dark'}" data-act="${conf==='rotate'?'credRotate':'credRevoke'}">${T(conf==='rotate'?'apiRotate':'apiRevoke')}</button><button class="btn sm ghost" data-act="credNo">${T('cancel')}</button></span></span></div>`:'';
 return `<header><h1>${T('nApi')}</h1></header><p class="muted" style="margin-top:-8px;max-width:640px">${T('apiHelp')}</p>${secret}${confirm}<div class="card" style="max-width:640px">${c.st==='none'?`<p class="muted" style="margin-top:0">${T('apiNone')}</p><button class="btn" data-act="credCreate">${T('apiCreate')}</button>`:`<div class="list-item"><span style="flex:1">${T('apiId')}</span><code>${c.id}</code></div><div class="list-item"><span style="flex:1">${T('apiCreated')}</span><b>${dt(r,c.created)}</b></div><div class="list-item"><span style="flex:1">${T('apiStatus')}</span><span class="chip ${c.st==='active'?'ok':'no'}">${T(c.st==='active'?'apiActive':'apiRevoked')}</span></div>${c.st==='active'?`<p class="small muted">${c.secret?'':T('apiHidden')}</p><div class="row"><button class="btn sm ghost" data-act="credAsk" data-id="rotate">${T('apiRotate')}</button><button class="btn sm danger" data-act="credAsk" data-id="revoke">${T('apiRevoke')}</button></div>`:`<p class="small muted">${T('apiRevWarn')}</p><button class="btn sm" data-act="credCreate">${T('apiCreate')}</button>`}`}</div>`};
A.qr=function(r){const q=S.q,e=q.err||{},o=q.out;const act=r.branches.filter(b=>b.on);
 const fl=(id,label,body,err,hint)=>`<div class="field ${err?'bad':''}"><label for="${id}">${label}</label>${body}${err?ferr(err):hint?`<div class="hint">${hint}</div>`:''}</div>`;
 return `<header><h1>${T('nQr')}</h1></header><p class="muted" style="margin-top:-8px;max-width:640px">${T('qrHelp')}</p><div class="grid g2" style="align-items:start"><div class="card">${e.conf?`<div class="banner err" role="alert" style="margin-bottom:12px">${ic('alert')}${e.conf}</div>`:''}${fl('qb',T('qrBranch'),`<select id="qb" data-q="b"><option value="">${T('qrPick')}</option>${act.map(b=>`<option value="${b.code}" ${q.b===b.code?'selected':''}>${esc(loc(r,b.n).t)} (${b.code})</option>`).join('')}</select>`,e.b)}${fl('qi',T('qrInvoice'),`<input id="qi" data-q="inv" value="${esc(q.inv)}" placeholder="EV-20777">`,e.inv)}${fl('qa',T('qrAmount',{c:r.cur}),`<input id="qa" data-q="amt" inputmode="decimal" value="${esc(q.amt)}" placeholder="52.30">`,e.amt)}${fl('qc',T('qrCust'),`<input id="qc" data-q="cust" value="${esc(q.cust)}" placeholder="C-1042">`,e.cust,T('qrCustHint'))}<button class="btn" data-act="genQR">${ic('scan')}${T('qrGen')}</button><p class="small muted">${T('qrNoCred')}</p></div><div class="card" style="text-align:center">${o?`${q.same?`<div class="banner info" style="text-align:left;margin-bottom:12px">${ic('check')}${T('qrSame')}</div>`:''}<img src="${o.img}" alt="QR ${esc(o.inv)}" style="width:240px;height:240px;image-rendering:pixelated;border:1px solid var(--border);border-radius:12px"><div style="text-align:left;margin-top:12px"><div class="small muted">${T('qrPayload')}</div><div class="code" style="font-size:12px;letter-spacing:0;word-break:break-all;margin:6px 0;padding:10px">${esc(o.payload)}</div><div class="small muted">${T('qrProto')}</div></div><div class="row" style="justify-content:center;flex-wrap:wrap;margin-top:12px"><a class="btn sm" href="${o.img}" download="qr-${esc(o.inv)}.png">${T('qrDl')}</a><button class="btn sm ghost" data-act="copyP">${ic('copy')}${T('qrCopyP')}</button></div>`:`<p class="muted" style="margin:60px 0">${ic('scan')}<br>${T('qrHelp')}</p>`}</div></div>`};

function toast(m){S.toast=m;render()}
document.addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b)return;const d=b.dataset;
 if(d.view){S.view=d.view;S.toast=null;if(d.view==='admin'&&S.rest&&!S.aScr)S.aScr='activity'}
 else if(d.lang){S.lang=d.lang}
 else if(d.setrest){S.rest=d.setrest;S.tab='rewards'}
 else if(d.jump){S.scr=d.jump;S.errs={};S.sheet=null;if(d.jump==='result')S.scanRes=S.scanRes||{ok:true,r:'evviva',b:'EGL',pts:45,inv:'EV-20481',amt:45.9,d:'2026-10-19T14:05'};if(d.jump==='redeemed')S.lastCode=S.lastCode||{c:'EVV-7K3Q-9M2P',rid:1,u:'2026-10-26'};if(d.jump==='restaurant'&&S.rest!=='evviva'&&false)S.rest='evviva'}
 else if(d.go){S.stack.push(S.scr);go(d.go);return}
 else if(d.rest){S.rest=d.rest;S.tab='rewards';S.stack.push(S.scr);S.scr='restaurant'}
 else if(d.tab){S.tab=d.tab}
 else if(d.redeem){S.sheet=sheetFor('redeem',+d.redeem)}
 else if(d.req){S.sheet=sheetFor('req',d.req)}
 else if(d.sim){const raw=d.sim==='paste'?($('#paste')||{}).value:simPayload(d.sim);S.scanRes=scanQR(raw);S.scr='result'}
 else if(d.fbr){const L=S.f.br,i=L.indexOf(d.fbr);if(i<0)L.push(d.fbr);else L.splice(i,1)}
 else if(d.editbr){S.br={edit:d.editbr,err:null}}
 else if(d.togbr){toggleBranch(d.togbr)}
 else if(d.ascr){cr().cred.secret=null;S.aScr=d.ascr;S.edit=null;S.toast=null;S.confirm=null;S.br={edit:null,err:null}}
 else if(d.ajump){if(d.ajump==='signin'){S.adminIn=false;S.aScr='signin'}else{S.adminIn=true;S.aScr=d.ajump}}
 else if(d.oscr){S.oScr=d.oscr;S.toast=null}
 else if(d.ltab){const[k,i]=d.ltab.split(':');S.ltab[k]=+i}
 else if(d.toggle){const[k,id]=d.toggle.split(':'),r=cr();const o=(k==='rw'?r.rewards:r.promos).find(x=>x.id==id);if(k==='rw')o.on=!o.on;else o.pub=!o.pub}
 else if(d.complete){S.reqs[+d.complete].st='completed'}
 else switch(d.act){
  case'back':S.sheet=null;S.scr=S.stack.pop()||'home';break;
  case'signin':S.signedIn=true;S.stack=[];S.scr='home';break;
  case'signup':{const e2={};if(!S.age)e2.age=1;if(!S.consent)e2.consent=1;S.errs=e2;if(!e2.age&&!e2.consent){S.stack=[];S.scr='home'}break}
  case'toRest':S.rest=S.scanRes.r||'evviva';S.tab='rewards';S.scr='restaurant';S.stack=['home'];break;
  case'closeSheet':S.sheet=null;break;
  case'doRedeem':{const r=cr(),x=r.rewards.find(y=>y.id==d.id);r.member.bal-=x.cost;const c='EVV-'+Math.random().toString(36).slice(2,6).toUpperCase()+'-'+Math.random().toString(36).slice(2,6).toUpperCase();r.member.ledger.unshift({t:'red',r:r.rewards.indexOf(x),p:-x.cost,d:'2026-10-19'});r.codes.unshift({c,r:r.rewards.indexOf(x),st:'issued',u:'2026-10-26'});S.lastCode={c,rid:x.id,u:'2026-10-26'};S.sheet=null;S.stack=['home','restaurant'];S.scr='redeemed';break}
  case'doReq':S.myreq=d.id;S.sheet=null;S.reqs.unshift({c:'Marie Tremblay',ty:d.id,d:'2026-10-19',st:'pending'});break;
  case'copy':try{navigator.clipboard.writeText(S.lastCode.c)}catch(_){}S.toast=T('copied');break;
  case'adminIn':S.adminIn=true;S.aScr='activity';break;
  case'adminOut':S.adminIn=false;S.aScr='signin';break;
  case'save':S.toast=T('saved');S.edit=null;break;
  case'addReward':S.edit='reward';break;
  case'closeEdit':S.edit=null;break;
  case'addTier':case'addContent':S.toast=T('saved');break;
  case'checkCode':{const v=(($('#cd')||{}).value||'').trim().toUpperCase(),r=R.evviva;const f=r.codes.find(c=>c.c===v);S.codeRes=!f?{ok:false,msg:T('codeUnkErr')}:f.st==='used'?{ok:false,msg:T('codeUsedErr')}:f.st==='expired'?{ok:false,msg:T('codeExpErr')}:{ok:true,rw:loc(r,r.rewards[f.r].n).t,cu:'Marie Tremblay',code:f};break}
  case'clearF':S.f={br:[],from:'',to:''};break;
  case'newBr':S.br={edit:'new',err:null};break;
  case'cancelBr':S.br={edit:null,err:null};break;
  case'saveBr':saveBranch();break;
  case'credCreate':{const c=cr().cred;if(c.st==='active'){S.toast=T('apiExists');break}c.st='active';c.id='key_'+cr().id.slice(0,3)+'_'+Math.random().toString(16).slice(2,6);c.created='2026-10-19';c.secret=newSecret();S.confirm=null;break}
  case'credAsk':S.confirm=d.id;break;
  case'credNo':S.confirm=null;break;
  case'credRotate':cr().cred.secret=newSecret();S.confirm=null;break;
  case'credRevoke':cr().cred.st='revoked';cr().cred.secret=null;S.confirm=null;break;
  case'copySecret':try{navigator.clipboard.writeText(cr().cred.secret)}catch(_){}S.toast=T('apiCopied');break;
  case'secretDone':cr().cred.secret=null;break;
  case'genQR':genQR();break;
  case'copyP':try{navigator.clipboard.writeText(S.q.out.payload)}catch(_){}S.toast=T('copied');break;
  case'markUsed':S.codeRes.code.st='used';S.codeRes.done=true;break;
 }
 render();
});
document.addEventListener('change',e=>{const t=e.target;if(t.dataset.bind){S[t.dataset.bind]=t.checked;render()}if(t.dataset.f){S.f[t.dataset.f]=t.value;render()}if(t.dataset.q==='b'){S.q.b=t.value}});
document.addEventListener('input',e=>{const t=e.target;if(t.dataset.q){S.q[t.dataset.q]=t.value;return}if(t.dataset.rule){const r=cr();r[t.dataset.rule]=parseFloat(t.value)||0;const p=Math.floor(45.9*r.rate);const pv=$('#pv');if(pv)pv.textContent=T('example',{a:money(r,45.9),p})+' '+T('tipNote')}});
window.__S=S;window.__render=render;
// preset deep-link for screenshots: #view/screen/lang/rest
const h=location.hash.slice(1).split('/');if(h[0]){S.view=h[0];if(h[0]==='customer')S.scr=h[1]||'signin';if(h[0]==='admin'){S.adminIn=h[1]!=='signin';S.aScr=h[1]||'activity'}if(h[0]==='operator')S.oScr=h[1]||'restaurants';if(h[2])S.lang=h[2];if(h[3])S.rest=h[3];if(h[4])S.tab=h[4];
 if(h[1]==='result'){S.scanRes={ok:true,r:'evviva',b:'EGL',pts:45,inv:'EV-20481',amt:45.9,d:'2026-10-19T14:05'}}if(h[1]==='redeemed'){S.lastCode={c:'EVV-7K3Q-9M2P',rid:1,u:'2026-10-26'}}
 if(h[5]==='err'){S.scanRes={ok:false,key:h[6]||'errOther'}}if(h[5]==='gen'){S.q={b:'WEL',inv:'EV-20777',amt:'52.30',cust:'',err:{},out:null,same:false};genQR()}if(h[5]==='conf'){S.confirm='rotate'}if(h[5]==='secret'){cr().cred.secret=newSecret()}if(h[5]==='brerr'){S.br={edit:'EGL',err:'brDup'}}if(h[5]==='sheet'){S.sheet=sheetFor('redeem',2)}}
render();
})();
