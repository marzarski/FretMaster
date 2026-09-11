// Smoke test: stub DOM + uruchomienie skryptu aplikacji + podstawowe flow
'use strict';
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'index.html'),'utf8');
let script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
// eksport dla testów (nie zmienia zachowania aplikacji)
script += '\n;globalThis.__T={state,TrainState,GEO:()=>GEO,currentTab:()=>currentTab,setTab:t=>{currentTab=t;},refreshBoard,renderBoard,buildSettings,buildKeyRow,buildSelects,buildPad,bindSettings,syncExplorerChecks,buildModeRow,buildLegend,renderTrainerBoard,renderTrainerView,renderTStats,renderStats,startTraining,stopTraining,startQuestion,answerName,clickTrainerCell,skipQuestion,allowedCells,cellPc,cellMidi,trainFretMax,pcDisp,maxFret,stringsCount,saveState,loadState,modeLimit,record,reveal,afterAnswer,timeoutFail,soundOn,setMuted,updateMuteBtn,ksString,addEarlyRef,applyFades,startQuestionAt,addTrainerDot,Metro,metroNormalize,metroMuted,metroStart,metroStop,metroFlash,buildMetroUI,buildMetroDots,bindMetro,metroFmtT,metroRampTempo,metroRampNext,metroOnBar,buildMetroFlow,refreshMetroLive,metroPhaseLabel,metroWood,metroBell};';

class EL {
  constructor(tag){ this.tagName=(tag||'div').toUpperCase(); this.children=[]; this.style={}; this.dataset={};
    this._cls=new Set(); this._text=''; this.parentNode=null; this.value=''; this.checked=false;
    this.disabled=false; this.title=''; this.onclick=null; this._listeners={}; }
  get className(){ return [...this._cls].join(' '); }
  set className(v){ this._cls = new Set(String(v).split(/\s+/).filter(Boolean)); }
  get classList(){ const s=this._cls;
    return { add:(...a)=>a.forEach(x=>x&&s.add(x)), remove:(...a)=>a.forEach(x=>s.delete(x)),
      toggle:(x,f)=>{ if(f===undefined) f=!s.has(x); f?s.add(x):s.delete(x); return f; }, contains:x=>s.has(x) }; }
  get textContent(){ return this._text; }
  set textContent(v){ this._text=String(v); this.children=[]; }
  get innerHTML(){ return this._html||''; }
  set innerHTML(v){ this._html=String(v); if(v==='') this.children=[]; }
  setAttribute(k,v){ (this._attrs=this._attrs||{})[k]=String(v); }
  getAttribute(k){ return (this._attrs||{})[k]||null; }
  get firstChild(){ return this.children[0]||null; }
  appendChild(c){ c.parentNode=this; this.children.push(c); return c; }
  remove(){ if(this.parentNode){ const i=this.parentNode.children.indexOf(this); if(i>=0) this.parentNode.children.splice(i,1); this.parentNode=null; } }
  addEventListener(t,fn){ (this._listeners[t]=this._listeners[t]||[]).push(fn); }
  querySelectorAll(sel){
    const out=[];
    if(sel==='main section'){ const walkM=n=>{ n.children.forEach(c=>{ if(c.tagName==='MAIN'){ c.children.forEach(s=>{ if(s.tagName==='SECTION') out.push(s); }); } walkM(c); }); }; walkM(this); return out; }
    const walk=n=>{ n.children.forEach(c=>{ if(c.tagName!=='#TEXT' && matches(c,sel)) out.push(c); walk(c); }); };
    walk(this); return out;
  }
  closest(sel){ let n=this; while(n){ if(n.tagName!=='#TEXT' && matches(n,sel)) return n; n=n.parentNode; } return null; }
  fire(t,e){ const ev=Object.assign({target:this,preventDefault(){ev._d=true;}},e); let n=this;
    while(n){ (n._listeners[t]||[]).forEach(fn=>fn(ev)); n=n.parentNode; } }
  countCls(cls){ let n=0; const walk=c=>{ c.children.forEach(x=>{ if(x.tagName!=='#TEXT'){ if(x._cls.has(cls)) n++; walk(x); } }); }; walk(this); return n; }
}
function matches(el,sel){
  if(sel.startsWith('.')) return el._cls.has(sel.slice(1));
  return el.tagName===sel.toUpperCase();
}
function textNode(t){ const e=new EL('#text'); e.tagName='#TEXT'; e._text=t; return e; }

const byId = {};
function reg(id, tag){ const e=new EL(tag||'div'); e.id=id; byId[id]=e; return e; }
['keyRow','selScale','selChord','chkScale','chkChord','chkIntervals','chkCaged','chkCagedWrap','boardScroll','legend','boardInfo',
 'modeRow','qText','qSub','qPlay','startBtn','skipBtn','timeBar','tStats','trainBoardScroll','pad','typeBuf','typeLine',
 'sprintOverlay','sprintScore','sprintBestLine','sprintAgain','sprintClose','statGrid','statTable','sesLine','btnResetStats',
 'selInstrument','selTuning','selFrets','selLh','stringRow','selTrainFrets','selTrainSource','selLimit','chkSound','chkNames','selLang','btnMute',
 'metroDots','metroBpmDisp','metroBpm','metroBeats','metroStart','metroMinus','metroPlus','metroBar',
 'metroModeSimple','metroModeRamp','metroRampPanel','metroBase','metroStepPct','metroStepBpm','metroStep','metroN','metroP','metroMax','metroEnd','metroFlow','metroPhase']
 .forEach(id=>reg(id, id.startsWith('sel')?'select':(id.startsWith('chk')?'input':'div')));

const body = new EL('body');
const header = new EL('header'); const nav = new EL('nav');
['board','train','stats','settings'].forEach(t=>{ const b=new EL('button'); b._cls.add('tab-btn'); b.dataset.tab=t; nav.appendChild(b); });
header.appendChild(nav); body.appendChild(header);
const main = new EL('main');
['board','train','stats','settings'].forEach(t=>{ const s=new EL('section'); s.id='tab-'+t; if(t==='board') s._cls.add('active'); main.appendChild(s); });
body.appendChild(main);

const document = {
  getElementById: id => byId[id] || null,
  createElement: t => new EL(t),
  createTextNode: t => textNode(t),
  addEventListener: (t,fn)=>{ (document._l=document._l||{})[t]=(document._l[t]||[]).concat(fn); },
  querySelectorAll: sel => body.querySelectorAll(sel),
};
const window = { addEventListener: ()=>{} };
const store = new Map();
const localStorage = { getItem:k=>store.has(k)?store.get(k):null, setItem:(k,v)=>store.set(k,String(v)), removeItem:k=>store.delete(k) };
global.window = window; global.document = document; global.localStorage = localStorage;
global.requestAnimationFrame = ()=>1;
global.cancelAnimationFrame = ()=>{};
global.confirm = ()=>true;

eval(script);
const T = globalThis.__T;
const state=T.state, TrainState=T.TrainState;

let passed=0, failed=0;
function advance(){ if(TrainState.phase==='answered'){ TrainState.phase='question'; T.startQuestion(); } }
function ok(cond, msg){ if(cond){ passed++; console.log('  OK  '+msg); } else { failed++; console.log('  FAIL '+msg); } }

console.log('— init —');
ok(byId.keyRow.children.length===12, 'keyRow ma 12 przycisków tonów');
const boardOuter = byId.boardScroll.children[0];
ok(!!boardOuter, 'zbudowany eksplorator gryfu');
ok(boardOuter.countCls('hit')===78, 'eksplorator: 78 pól klikalnych (6×12 + 6 pustych strun)');
ok(boardOuter.countCls('dot')>=20, 'eksplorator: kropki skali C dur ('+boardOuter.countCls('dot')+')');
ok(byId.legend.children.length>0, 'legenda wyrenderowana ('+byId.legend.children.length+' pozycji)');

console.log('— CAGED —');
state.explorer.show.caged=true; state.explorer.chord='none';
T.refreshBoard();
const outer2 = byId.boardScroll.children[0];
let cagedDots=0; outer2.children.forEach(c=>{ if(c._cls.has('dot') && c._text && /^[CAGED]+$/.test(c._text)) cagedDots++; });
ok(cagedDots>=18, 'CAGED: kropki z literami kształtów ('+cagedDots+')');
ok(byId.chkCaged.disabled===false, 'CAGED dostępne w strojeniu standard');
state.settings.tuning='openG'; T.saveState(); T.buildSettings(); T.syncExplorerChecks();
ok(byId.chkCaged.disabled===true, 'CAGED niedostępne w open tunings');
state.settings.tuning='standard'; T.saveState(); T.buildSettings(); T.syncExplorerChecks();
state.explorer.show.caged=false;

console.log('— CAGED: klikalna legenda —');
state.explorer.show.caged=true; state.explorer.cagedHidden=[];
T.refreshBoard();
const legItems = byId.legend.children.filter(c=>c.dataset && c.dataset.letter);
ok(legItems.length===5, 'legenda CAGED ma 5 klikalnych kształtów');
const itemC = legItems.find(c=>c.dataset.letter==='C');
ok(itemC && typeof itemC.onclick==='function', 'kształt C klikalny w legendzie');
itemC.onclick();
const outerL = byId.boardScroll.children[0];
let hasC=false, letterDots=0;
outerL.children.forEach(c=>{ if(c._cls.has('dot') && c._text && /^[CAGED]+$/.test(c._text)){ letterDots++; if(c._text.includes('C')) hasC=true; } });
ok(!hasC && letterDots>0, 'ukrycie C: kropki C zniknęły, inne zostały ('+letterDots+')');
const itemC2 = byId.legend.children.find(c=>c.dataset && c.dataset.letter==='C');
ok(itemC2 && itemC2._cls.has('off'), 'legenda oznacza ukryty kształt (off)');
T.saveState();
ok(JSON.parse(localStorage.getItem('fretmaster.v1')).explorer.cagedHidden.includes('C'), 'ukrycie kształtu zapisane');
itemC2.onclick();
const outerL2 = byId.boardScroll.children[0];
let backC=false;
outerL2.children.forEach(c=>{ if(c._cls.has('dot') && c._text && c._text.includes('C')) backC=true; });
ok(backC, 'ponowny klik przywraca kształt C');
state.explorer.show.caged=false; state.explorer.cagedHidden=[];
console.log('— interwały —');
state.explorer.show.intervals=true; T.refreshBoard();
const outer3 = byId.boardScroll.children[0];
const intDots = outer3.children.filter(c=>c._cls.has('dot') && c.style.background).length;
ok(intDots>10, 'wyświetlenie kolorów interwałów ('+intDots+' kolorowych kropki)');
state.explorer.show.intervals=false; T.refreshBoard();

console.log('— trening: nazwij —');
T.setTab('train');
TrainState.mode='nazwij';
T.startTraining();
ok(TrainState.Q && TrainState.Q.type==='name', 'pytanie nazwij wystawione (pc='+TrainState.Q.pc+')');
T.answerName(TrainState.Q.pc);
ok(TrainState.session.q===1 && TrainState.session.c===1, 'poprawna odpowiedź policzona');
T.startQuestion();
T.answerName((TrainState.Q.pc+1)%12);
ok(TrainState.session.q===2 && TrainState.session.c===1, 'błędna odpowiedź policzona');
advance();
T.skipQuestion();
ok(TrainState.session.q===3 && TrainState.session.skipped===1, 'pominięcie policzone');

console.log('— trening: znajdz —');
TrainState.mode='znajdz'; T.stopTraining(); T.startTraining();
{
  const Q=TrainState.Q;
  const cells=T.allowedCells(Q.pc);
  ok(cells.length>0, 'znajdz: istnieją poprawne komórki dla '+T.pcDisp(Q.pc)+' ('+cells.length+')');
  const before=TrainState.session.c;
  T.clickTrainerCell(cells[0].s, cells[0].f);
  ok(TrainState.session.c===before+1, 'znajdz: trafienie policzone');
}
T.startQuestion();
{
  const Q=TrainState.Q;
  let wrong=null;
  outer: for(let s=0;s<T.GEO().S;s++){ for(let f=1;f<=T.trainFretMax();f++){ if(T.cellPc(s,f)!==Q.pc){ wrong={s,f}; break outer; } } }
  const before=TrainState.session.c;
  T.clickTrainerCell(wrong.s, wrong.f);
  ok(TrainState.session.c===before && TrainState.session.streak===0, 'znajdz: pudło zeruje serię');
}

console.log('— trening: pamięć —');
TrainState.mode='pamiec'; T.stopTraining(); T.startTraining();
ok(TrainState.phase==='show', 'pamięć: faza pokazania');
TrainState.phase='question'; T.renderTrainerView();
const QP=TrainState.Q;
const beforeP=TrainState.session.c;
T.clickTrainerCell(QP.s,QP.f);
ok(TrainState.session.c===beforeP+1, 'pamięć: trafienie policzone');

console.log('— sprint —');
TrainState.mode='sprint'; T.stopTraining(); T.startTraining();
let guard=0;
while(TrainState.phase==='question' && guard++<10){
  const Q=TrainState.Q;
  if(Q.type==='name') T.answerName(Q.pc);
  else { const cells=T.allowedCells(Q.pc); T.clickTrainerCell(cells[0].s,cells[0].f); }
  if(guard<8) advance();
}
ok(TrainState.session.q>=2, 'sprint: odpowiadano na pytania ('+TrainState.session.q+')');
ok(TrainState.sprint.score>0, 'sprint: punktacja naliczana ('+TrainState.sprint.score+' pkt)');
advance();
if(TrainState.phase==='question'){
  const Q=TrainState.Q;
  if(Q.type==='name') T.answerName((Q.pc+6)%12);
  else { let wrong=null; outer: for(let s=0;s<T.GEO().S;s++){ for(let f=1;f<=T.trainFretMax();f++){ if(T.cellPc(s,f)!==Q.pc){ wrong={s,f}; break outer; } } } T.clickTrainerCell(wrong.s,wrong.f); }
}
ok(TrainState.phase==='gameover' && byId.sprintOverlay._cls.has('show'), 'sprint: game over + overlay');
ok(state.stats.global.sprintBest>0, 'sprint: rekord zapisany ('+state.stats.global.sprintBest+')');
byId.sprintClose.onclick();

console.log('— eksplorator: klik —');
T.setTab('board'); T.renderBoard('boardScroll', true);
const hit = byId.boardScroll.children[0].children.find(c=>c._cls.has('hit') && +c.dataset.f===1 && +c.dataset.s===0);
hit.fire('click');
ok(byId.boardInfo._html.includes('F2'), 'klik na nutę pokazuje nazwę (F2: 6 struna, 1 próg)');

console.log('— puste struny —');
T.setTab('board'); T.renderBoard('boardScroll', true);
const bOuter = byId.boardScroll.children[0];
const openHit = bOuter.children.find(c=>c._cls.has('hit') && +c.dataset.f===0 && +c.dataset.s===0);
ok(!!openHit, 'pusta struna ma pole klikalne przed siodełkiem');
openHit.fire('click');
ok(byId.boardInfo._html.includes('pusta struna'), 'klik w pustą strunę: dźwięk + opis');
const openCells = T.allowedCells(T.cellPc(0,0));
ok(openCells.some(c=>c.f===0), 'puste struny w puli treningu');
const snames = bOuter.children.filter(c=>c._cls.has('sname') && c.style.color);
ok(snames.length===6, 'nazwy strun podświetlone wg skali ('+snames.length+'/6)');
T.setTab('train'); T.renderTrainerBoard();
const tBoard = byId.trainBoardScroll.children[0];
const tSnames = tBoard.children.filter(c=>c._cls.has('sname'));
ok(tSnames.length===6 && tSnames.every(c=>!c.textContent), 'trening: nazwy strun ukryte');
const tOpen = tBoard.children.find(c=>c._cls.has('hit') && +c.dataset.f===0);
ok(tOpen && tOpen.title==='Pusta struna — kliknij', 'trening: podpowiedź pustej struny bez nazwy nuty');
TrainState.mode='nazwij';
T.renderTrainerView();
ok(byId.qSub.textContent.includes('0–'), 'zakres treningu obejmuje próg 0');
T.startQuestionAt(0,0);
ok(TrainState.Q && TrainState.Q.f===0, 'pytanie może dotyczyć pustej struny');
const qDot = byId.trainBoardScroll.children[0].children.find(c=>c._cls.has('dot') && c._text==='?');
const qx = parseFloat(qDot.style.left);
ok(qDot && qx>=0 && qx<T.GEO().labelW, 'kropka pytania przy pustej strunie (x='+qx+')');
const cb=TrainState.session.c; T.answerName(TrainState.Q.pc);
ok(TrainState.session.c===cb+1, 'poprawna odpowiedź na pustą strunę policzona');
advance();
T.setTab('board'); T.renderBoard('boardScroll', true); // powrót na gryf (kolejne testy rysują eksplorator)
console.log('— ustawienia —');
byId.selFrets.value='22'; byId.selFrets.onchange({target:byId.selFrets});
ok(T.maxFret()===22, 'zmiana na 22 progi');
byId.selInstrument.value='bass'; byId.selInstrument.onchange({target:byId.selInstrument});
ok(T.stringsCount()===4 && state.settings.frets<=20, 'przejście na bas (4 struny, ≤20 progów)');
byId.selInstrument.value='guitar'; byId.selInstrument.onchange({target:byId.selInstrument});
byId.selLh.value='lh'; byId.selLh.onchange({target:byId.selLh});
T.refreshBoard();
const sname0 = byId.boardScroll.children[0].children.find(c=>c._cls.has('sname'));
ok(sname0 && sname0.textContent==='E2', 'orientacja LH: najniższa struna E2 na górze ('+sname0.textContent+')');
byId.selLh.value='rh'; byId.selLh.onchange({target:byId.selLh});
T.refreshBoard();
const sname1 = byId.boardScroll.children[0].children.find(c=>c._cls.has('sname'));
ok(sname1 && sname1.textContent==='E4', 'orientacja RH: najwyższa struna E4 na górze ('+sname1.textContent+')');

console.log('— master-mute —');
ok(T.soundOn()===true, 'domyślnie dźwięk włączony');
T.setMuted(true);
ok(state.settings.muted===true && T.soundOn()===false, 'mute wycisza wszystko');
ok(byId.btnMute.textContent==='🔇', 'przycisk pokazuje 🔇');
T.updateMuteBtn();
ok(byId.btnMute.getAttribute('aria-pressed')==='true', 'aria-pressed=true przy wyciszeniu');
T.saveState();
ok(JSON.parse(localStorage.getItem('fretmaster.v1')).settings.muted===true, 'mute zapisane w localStorage');
byId.btnMute.onclick();
ok(state.settings.muted===false && T.soundOn()===true && byId.btnMute.textContent==='🔊', 'klik w przycisk odciszania przywraca dźwięk');
state.settings.sound=false; T.setMuted(true); state.settings.sound=true;
ok(T.soundOn()===false, 'mute działa niezależnie od ustawienia „Dźwięki”');
T.setMuted(false); state.settings.sound=true;
localStorage.setItem('fretmaster.v1', JSON.stringify({settings:{sound:true}}));
T.loadState();
ok(state.settings.muted===false && T.soundOn()===true, 'stary zapis bez muted wczytuje się (domyślnie odciszone)');

console.log('— synteza struny —');
{
  const sr=44100, f=110, len=sr, d=T.ksString(f,sr,len,12345);
  ok(d instanceof Float32Array && d.length===len, 'ksString: zwraca bufor Float32Array');
  let finite=true, peak=0;
  for(let i=0;i<len;i++){ if(!isFinite(d[i])){ finite=false; break; } const a=Math.abs(d[i]); if(a>peak) peak=a; }
  ok(finite, 'ksString: wszystkie próbki skończone (brak NaN)');
  ok(peak>0.1 && peak<1.0, 'ksString: poziom sygnału w normie (peak '+peak.toFixed(2)+')');
  const half=len>>1; let e1=0,e2=0;
  for(let i=0;i<half;i++){ e1+=d[i]*d[i]; e2+=d[i+half]*d[i+half]; }
  ok(e2<e1, 'ksString: struna wybrzmiewa (energia II połowy mniejsza)');
  const N=Math.round(sr/f); let num=0,den=0;
  const seg0=N*4, segN=4096;
  for(let i=0;i<segN;i++){ const x=d[seg0+i], y=d[seg0+i-N]; num+=x*y; den+=x*x; }
  ok(num/den>0.6, 'ksString: stabilny ton (korelacja okresowa '+(num/den).toFixed(2)+')');
  const d2=T.ksString(f,sr,len,999);
  let diff=0; for(let i=0;i<512;i++) diff+=Math.abs(d[i]-d2[i]);
  ok(diff>0.01, 'ksString: inny seed = inny atak (rozkarelowanie stereo)');
  T.applyFades(d2, sr);
  ok(d2[len-1]===0, 'applyFades: koniec bufora wygaszony (brak klików)');
  const r=T.ksString(f,sr,2048,7), cpy=Float32Array.from(r);
  T.addEarlyRef(r, sr, 0.023, 0.09);
  let rd=0, pk=0;
  for(let i=0;i<r.length;i++){ rd+=Math.abs(r[i]-cpy[i]); const a=Math.abs(r[i]); if(a>pk) pk=a; }
  ok(rd>0 && pk<1.0, 'addEarlyRef: subtelne odbicie bez przesteru');
}
console.log('— metronom —');
T.bindMetro(); T.buildMetroUI();
ok(byId.metroDots.children.length===4, 'metronom: 4 kropki dla 4/4');
ok(byId.metroDots.children[0]._cls.has('b1'), 'metronom: uderzenie 1. oznaczone (b1)');
byId.metroDots.children[1].onclick();
ok(state.metro.mask[1]===true, 'metronom: klik wycisza uderzenie');
ok(byId.metroDots.children[1]._cls.has('mut'), 'metronom: wyciszona kropka oznaczona');
byId.metroDots.children[1].onclick();
ok(state.metro.mask[1]===false, 'metronom: ponowny klik odciszania');
byId.metroBeats.value='7'; byId.metroBeats.onchange({target:byId.metroBeats});
ok(state.metro.beats===7 && byId.metroDots.children.length===7, 'metronom: metrum 7 (7 kropek)');
byId.metroBeats.value='99'; byId.metroBeats.onchange({target:byId.metroBeats});
ok(state.metro.beats===16, 'metronom: metrum clamo do 16');
byId.metroBeats.value='1'; byId.metroBeats.onchange({target:byId.metroBeats});
ok(state.metro.beats===2, 'metronom: metrum clamo do 2');
byId.metroBeats.value='4'; byId.metroBeats.onchange({target:byId.metroBeats});
byId.metroBpm.value='120'; byId.metroBpm.onchange({target:byId.metroBpm});
ok(state.metro.bpm===120 && byId.metroBpmDisp._html.includes('120'), 'metronom: zmiana BPM (120)');
byId.metroPlus.onclick();
ok(state.metro.bpm===121, 'metronom: stepper +');
byId.metroMinus.onclick(); byId.metroMinus.onclick();
ok(state.metro.bpm===119, 'metronom: stepper −');
byId.metroBpm.value='80'; byId.metroBpm.onchange({target:byId.metroBpm});
T.metroFlash(2);
ok(byId.metroDots.children[2]._cls.has('on') && !byId.metroDots.children[0]._cls.has('on'), 'metronom: flash zapala właściwą kropkę');
ok(T.metroStart()===false, 'metronom: bez AudioContext start zwraca false (stub)');
ok(T.Metro.playing===false, 'metronom: nie gra w stubie');
state.metro.mask[0]=true; T.saveState();
ok(JSON.parse(localStorage.getItem('fretmaster.v1')).metro.mask[0]===true, 'metronom: maska zapisana');
state.metro.mask[0]=false;
localStorage.setItem('fretmaster.v1', JSON.stringify({settings:{}}));
T.loadState();
ok(state.metro.bpm===80 && state.metro.beats===4, 'metronom: stary zapis bez metro → domyślne');
console.log('— metronom: rampa —');
{
  const R=o=>T.metroRampNext(Object.assign({n:4,p:4,base:80,stepType:'pct',step:1,max:120,end:'hold',tempo:80},o));
  let r=R({phase:'train',phaseBar:0,k:0});
  ok(r.phase==='train'&&r.phaseBar===1&&r.tempo===80, 'rampa: kolejny takt treningu');
  r=R({phase:'train',phaseBar:3,k:0});
  ok(r.phase==='prep'&&r.kTrain===1&&r.tempo===80.8, 'rampa: po treningu przygotowanie nowym tempem (80.8)');
  r=R({phase:'prep',phaseBar:1,k:1,tempo:80.8});
  ok(r.phase==='prep'&&r.phaseBar===2, 'rampa: kolejne przygotowanie');
  r=R({phase:'prep',phaseBar:2,k:1,tempo:80.8});
  ok(r.phase==='bell', 'rampa: ostatni przygotowawczy to dzwonek');
  r=R({phase:'bell',phaseBar:0,k:1,tempo:80.8});
  ok(r.phase==='train'&&r.kTrain===1&&r.tempo===80.8, 'rampa: po dzwonku trening nowym tempem');
  r=R({phase:'train',phaseBar:3,k:0,p:1});
  ok(r.phase==='bell', 'rampa: p=1 → sam dzwonek bez drewna');
  r=R({phase:'train',phaseBar:3,k:2,base:100,stepType:'pct',step:5,max:112});
  ok(!r.stop&&r.tempo===112&&r.kTrain===3, 'rampa: hold trzyma max (112)');
  r=R({phase:'train',phaseBar:3,k:2,base:100,stepType:'pct',step:5,max:112,end:'stop'});
  ok(r.stop===true, 'rampa: stop na limicie');
  r=R({phase:'train',phaseBar:3,k:2,base:100,stepType:'pct',step:5,max:112,end:'restart'});
  ok(!r.stop&&r.tempo===100&&r.kTrain===0, 'rampa: restart wraca do bazy');
  ok(T.metroRampTempo(80,'pct',1,5)===84 && T.metroRampTempo(80,'bpm',2,3)===86, 'rampa: przyrost liniowy od bazy (84 / 86)');
  ok(T.metroRampTempo(80,'pct',1,0)===80, 'rampa: krok 0 to baza');
}
byId.metroModeRamp.onclick();
ok(state.metro.mode==='rampa' && !byId.metroRampPanel._cls.has('dim') && byId.metroBpm.disabled===true, 'rampa: tryb + panel + blokada BPM');
ok(byId.metroFlow.children.length>=5, 'rampa: wizualizacja przebiegu');
T.metroFlash(0,'bell');
ok(byId.metroDots.children[0]._cls.has('bell'), 'rampa: złota kropka dzwonka');
T.metroFlash(1,'prep');
ok(byId.metroDots.children[1]._cls.has('prep') && !byId.metroDots.children[0]._cls.has('bell'), 'rampa: niebieska kropka przygotowania');
byId.metroN.value='2'; byId.metroN.onchange({target:byId.metroN});
byId.metroP.value='1'; byId.metroP.onchange({target:byId.metroP});
ok(state.metro.n===2 && state.metro.p===1, 'rampa: zmiana n/p');
state.metro.n=99; state.metro.endMode='x'; T.metroNormalize();
ok(state.metro.n===16 && state.metro.endMode==='hold', 'rampa: normalizacja n i endMode');
byId.metroN.value='4'; byId.metroN.onchange({target:byId.metroN});
byId.metroP.value='4'; byId.metroP.onchange({target:byId.metroP});
byId.metroModeSimple.onclick();
ok(state.metro.mode==='simple' && byId.metroBpm.disabled===false, 'rampa: powrót do zwykłego');
// integracja: pełny cykl przez metroOnBar (n=1, p=1 — najkrótszy)
state.metro.mode='rampa'; state.metro.n=1; state.metro.p=1; state.metro.base=100;
state.metro.stepType='pct'; state.metro.step=10; state.metro.maxBpm=105; state.metro.endMode='hold';
T.Metro.playing=true; T.Metro.phase='train'; T.Metro.phaseBar=0; T.Metro.kTrain=0; T.Metro.rTempo=100;
T.metroOnBar();
ok(T.Metro.phase==='bell' && T.Metro.rTempo===105, 'rampa live: trening → dzwonek @ max (hold)');
T.metroOnBar();
ok(T.Metro.phase==='train' && T.Metro.kTrain===1, 'rampa live: dzwonek → trening kroku 1');
T.metroOnBar();
ok(T.Metro.phase==='bell' && T.Metro.rTempo===105, 'rampa live: hold trzyma 105 w kolejnym cyklu');
T.Metro.phase='train'; T.Metro.phaseBar=0; state.metro.endMode='stop';
T.metroOnBar();
ok(T.Metro.playing===false && byId.metroPhase.textContent.includes('105'), 'rampa live: stop + podsumowanie na limicie');
T.Metro.playing=false; T.Metro.phase='train'; T.Metro.phaseBar=0; T.Metro.kTrain=0; T.Metro.rTempo=80;
state.metro.mode='simple'; state.metro.n=4; state.metro.p=4; state.metro.base=80; state.metro.maxBpm=120;
state.metro.step=1; state.metro.stepType='pct'; state.metro.endMode='hold';
T.buildMetroUI();
console.log('— persystencja —');
T.saveState();
const saved = JSON.parse(localStorage.getItem('fretmaster.v1'));
ok(saved.settings && saved.stats && saved.explorer, 'stan zapisany w localStorage');
ok(saved.stats.global.q>=8, 'statystyki w zapisie (q='+saved.stats.global.q+')');

console.log('\nWYNIK: '+passed+' OK, '+failed+' FAIL');
process.exit(failed?1:0);
