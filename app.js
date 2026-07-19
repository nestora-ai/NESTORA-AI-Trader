
const titles={
 dashboard:["لوحة التحكم","نظرة شاملة على الأداء والمخاطر والأسواق."],
 terminal:["محطة الأسواق","واجهة احترافية جاهزة لبيانات السوق الحية."],
 copilot:["الروبوت الذكي","مساعد قرار لإدارة المخاطر ومراجعة الصفقات."],
 risk:["محرك المخاطر","حساب حجم الصفقة وحدود الخسارة."],
 journal:["سجل التداول","تسجيل الصفقات وتحليل الأداء."],
 portfolio:["المحفظة","ملخص الحسابات والصفقات عند الربط."],
 connections:["الربط","الاستعداد لربط الوسطاء رسميًا."],
 settings:["الإعدادات","إدارة إعدادات المنصة والروبوت."]
};

function showApp(){
 loginScreen.classList.add("hidden");
 app.classList.remove("hidden");
 localStorage.setItem("nestora_v4_logged","1");
 setTimeout(redrawCharts,60);
}
loginForm.addEventListener("submit",e=>{e.preventDefault();showApp()});
if(localStorage.getItem("nestora_v4_logged")==="1")showApp();
logoutBtn.addEventListener("click",()=>{localStorage.removeItem("nestora_v4_logged");location.reload()});

function go(view){
 document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));
 document.getElementById(view).classList.add("active");
 document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.view===view));
 pageTitle.textContent=titles[view][0];pageSubtitle.textContent=titles[view][1];
 sidebar.classList.remove("open");window.scrollTo({top:0,behavior:"smooth"});
 if(view==="terminal")setTimeout(redrawCharts,50);
}
document.querySelectorAll("[data-view]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.view)));
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.go)));
menuBtn.addEventListener("click",()=>sidebar.classList.toggle("open"));

const assets=[
 {s:"XAU/USD",n:"الذهب مقابل الدولار",p:"—",c:"بانتظار المصدر",dir:"up"},
 {s:"EUR/USD",n:"اليورو مقابل الدولار",p:"—",c:"بانتظار المصدر",dir:"up"},
 {s:"GBP/USD",n:"الجنيه مقابل الدولار",p:"—",c:"بانتظار المصدر",dir:"down"},
 {s:"BTC/USD",n:"بيتكوين",p:"—",c:"بانتظار المصدر",dir:"up"},
 {s:"NVDA",n:"NVIDIA",p:"—",c:"بانتظار المصدر",dir:"up"}
];
watchlist.innerHTML=assets.map(a=>`<div class="watch-row"><div><b>${a.s}</b><small>${a.n}</small></div><div><b>${a.p}</b><small class="${a.dir}">${a.c}</small></div></div>`).join("");

function drawLine(canvas,values){
 if(!canvas)return;
 const ctx=canvas.getContext("2d"),dpr=window.devicePixelRatio||1,w=canvas.clientWidth||700,h=canvas.getAttribute("height")|0;
 canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);
 ctx.strokeStyle="rgba(255,255,255,.06)";ctx.lineWidth=1;
 for(let i=1;i<5;i++){ctx.beginPath();ctx.moveTo(0,h*i/5);ctx.lineTo(w,h*i/5);ctx.stroke()}
 const min=Math.min(...values),max=Math.max(...values),pad=22;
 const pts=values.map((v,i)=>[pad+(w-pad*2)*i/(values.length-1),h-pad-(h-pad*2)*(v-min)/(max-min||1)]);
 const grad=ctx.createLinearGradient(0,0,w,0);grad.addColorStop(0,"#627cff");grad.addColorStop(1,"#3edbd4");
 ctx.strokeStyle=grad;ctx.lineWidth=4;ctx.lineJoin="round";ctx.lineCap="round";ctx.beginPath();
 pts.forEach((p,i)=>i?ctx.lineTo(...p):ctx.moveTo(...p));ctx.stroke();
 const fill=ctx.createLinearGradient(0,0,0,h);fill.addColorStop(0,"rgba(62,219,212,.20)");fill.addColorStop(1,"rgba(62,219,212,0)");
 ctx.lineTo(pts.at(-1)[0],h);ctx.lineTo(pts[0][0],h);ctx.closePath();ctx.fillStyle=fill;ctx.fill();
}
const perfSets={
 "1D":[20,24,22,29,35,33,42,47,45,55,58,57,66,70,72,80],
 "1W":[18,20,25,23,31,34,38,42,44,50,48,55,61,59,66,72],
 "1M":[12,18,16,22,26,30,35,33,40,46,49,54,58,63,68,74],
 "1Y":[8,12,10,17,20,24,30,36,41,45,52,58,62,67,71,78]
};
const marketSets={
 XAUUSD:[40,42,39,45,47,46,52,55,51,57,61,60,64,66],
 EURUSD:[50,48,49,47,51,54,53,57,56,59,61,60,62,64],
 GBPUSD:[55,52,54,49,51,48,50,53,51,55,57,54,58,60],
 BTCUSD:[35,41,38,44,50,47,55,52,58,62,57,65,63,70],
 NVDA:[25,28,27,33,36,40,38,45,48,46,52,55,59,63]
};
let perfRange="1D";
function redrawCharts(){drawLine(performanceChart,perfSets[perfRange]);drawLine(marketChart,marketSets[marketSymbol.value])}
window.addEventListener("resize",redrawCharts);
document.querySelectorAll(".range-tabs button").forEach(b=>b.addEventListener("click",()=>{
 document.querySelectorAll(".range-tabs button").forEach(x=>x.classList.remove("active"));b.classList.add("active");perfRange=b.dataset.range;redrawCharts()
}));
marketSymbol.addEventListener("change",redrawCharts);

let botMode="analysis";
document.querySelectorAll(".bot-modes button").forEach(b=>b.addEventListener("click",()=>{
 document.querySelectorAll(".bot-modes button").forEach(x=>x.classList.remove("active"));b.classList.add("active");botMode=b.dataset.mode
}));

function extractNumbers(text){return (text.match(/\d+(?:\.\d+)?/g)||[]).map(Number)}
function aiReply(text){
 const t=text.toLowerCase(),nums=extractNumbers(text);
 if(botMode==="coach"){
   if(t.includes("انتقام")||t.includes("خسارة"))return "أهم قاعدة: لا تحاولي تعويض الخسارة بصفقة أكبر. توقفي، راجعي سبب الخسارة، ثم عودي فقط إذا كانت الصفقة الجديدة تستوفي القواعد.";
   return "كمدرب تداول، أنصحك بالالتزام بخطة مكتوبة، تحديد حد خسارة يومي، وتسجيل سبب كل صفقة قبل تنفيذها.";
 }
 if(botMode==="risk"||t.includes("حجم العقد")){
   if(nums.length>=4){
     const [balance,riskPct,stopPips,pipValue]=nums,loss=balance*riskPct/100,lot=loss/(stopPips*pipValue);
     return `الحد الأقصى للخسارة هو $${loss.toFixed(2)}، وحجم العقد التقريبي ${lot.toFixed(2)} لوت. تأكدي من قيمة النقطة الخاصة بالأصل قبل التنفيذ.`;
   }
   return "أرسلي أربعة أرقام بالترتيب: رصيد الحساب، نسبة المخاطرة، وقف الخسارة بالنقاط، وقيمة النقطة لكل لوت.";
 }
 if(nums.length>=3){
   const [entry,stop,target]=nums,rr=Math.abs(target-entry)/Math.abs(entry-stop);
   if(!isFinite(rr))return "تأكدي من أن سعر الدخول ووقف الخسارة مختلفان.";
   return `نسبة العائد إلى المخاطرة تقريبًا 1:${rr.toFixed(2)}. ${rr>=2?"النسبة جيدة مبدئيًا. راجعي الاتجاه والأخبار قبل القرار.":rr>=1.5?"النسبة مقبولة بحذر.":"النسبة ضعيفة، ويُفضل تعديل الهدف أو وقف الخسارة."}`;
 }
 if(t.includes("1:2")||t.includes("1 : 2"))return "نسبة 1:2 تعني مخاطرة وحدة مقابل هدف وحدتين. هي جيدة مبدئيًا بشرط جودة الإشارة وعدم وجود أخبار قوية.";
 if(t.includes("الأخبار"))return "وقت الأخبار القوية قد يحدث اتساع سبريد وانزلاق سعري وحركة مفاجئة. الأفضل الانتظار حتى يهدأ السوق.";
 return "أستطيع تقييم الصفقة، حساب المخاطرة، ومراجعة الانضباط. التحليل الحي سيعمل بعد ربط مصدر بيانات وخادم ذكاء اصطناعي آمن.";
}
function sendMessage(text){
 if(!text.trim())return;
 chat.insertAdjacentHTML("beforeend",`<div class="message user">${text}</div>`);
 setTimeout(()=>{chat.insertAdjacentHTML("beforeend",`<div class="message ai">${aiReply(text)}</div>`);chat.scrollTop=chat.scrollHeight},250);
 aiInput.value="";chat.scrollTop=chat.scrollHeight;
}
sendAI.addEventListener("click",()=>sendMessage(aiInput.value));
aiInput.addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendMessage(aiInput.value)}});
document.querySelectorAll(".quick-prompts button").forEach(b=>b.addEventListener("click",()=>sendMessage(b.textContent)));

function calcRiskFn(){
 const b=Math.max(0,+balance.value||0),r=Math.max(0,+riskPct.value||0),s=Math.max(1,+stopPips.value||1),p=Math.max(.01,+pipValue.value||.01),d=Math.max(0,+dailyLimit.value||0),o=Math.max(0,+openTrades.value||0);
 const loss=b*r/100,lot=loss/(s*p),daily=b*d/100;
 maxLoss.textContent="$"+loss.toFixed(2);lotSize.textContent=lot.toFixed(2)+" لوت";dailyLoss.textContent="$"+daily.toFixed(2);
 let rule="مسموح",guide="المخاطرة الحالية منخفضة ومناسبة للمرحلة الأولى.",score="منخفض";
 if(r>1||o>=3){rule="بحذر";guide="المخاطرة أو عدد الصفقات المفتوحة مرتفع نسبيًا. خفّضي الحجم أو انتظري.";score="متوسط"}
 if(r>2||o>=5){rule="مرفوض";guide="المخاطرة مرتفعة جدًا وفق قواعد NESTORA. لا يُنصح بفتح صفقة جديدة.";score="مرتفع"}
 riskRule.textContent=rule;riskGuidance.textContent=guide;riskScore.textContent=score;
}
calcRisk.addEventListener("click",calcRiskFn);calcRiskFn();

const KEY="nestora_v4_trades";
const getTrades=()=>JSON.parse(localStorage.getItem(KEY)||"[]");
function saveTradesData(d){localStorage.setItem(KEY,JSON.stringify(d));renderTrades()}
function renderTrades(){
 const d=getTrades();
 tradeRows.innerHTML=d.length?d.map(x=>`<tr><td>${x.date}</td><td>${x.asset}</td><td>${x.side}</td><td>${x.broker}</td><td>${x.pl.toFixed(2)}$</td><td>${x.outcome}</td><td>${x.discipline}</td></tr>`).join(""):`<tr><td colspan="7" style="color:#91a6b7">لا توجد صفقات مسجلة بعد.</td></tr>`;
 const total=d.reduce((a,x)=>a+x.pl,0),wins=d.filter(x=>x.outcome==="رابحة").length;
 dashboardPL.textContent=(total>=0?"+":"")+"$"+total.toFixed(2);dashboardWin.textContent=d.length?Math.round(wins/d.length*100)+"%":"0%";
}
saveTrade.addEventListener("click",()=>{
 const asset=jAsset.value.trim();if(!asset)return alert("أدخلي اسم الأصل");
 const d=getTrades();d.unshift({date:new Date().toLocaleDateString("ar-OM"),asset,side:jSide.value,broker:jBroker.value,pl:+jPL.value||0,outcome:jOutcome.value,discipline:jDiscipline.value,notes:jNotes.value.trim()});
 saveTradesData(d);jAsset.value="";jPL.value="";jNotes.value="";
});
clearTrades.addEventListener("click",()=>{if(confirm("هل تريدين مسح جميع الصفقات؟"))saveTradesData([])});
exportCSV.addEventListener("click",()=>{
 const d=getTrades();if(!d.length)return alert("لا توجد بيانات للتصدير");
 const rows=[["التاريخ","الأصل","النوع","المنصة","النتيجة","الحالة","الانضباط","الملاحظات"],...d.map(x=>[x.date,x.asset,x.side,x.broker,x.pl,x.outcome,x.discipline,x.notes])];
 const csv="\ufeff"+rows.map(r=>r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(",")).join("\n");
 const blob=new Blob([csv],{type:"text/csv;charset=utf-8"}),url=URL.createObjectURL(blob),a=document.createElement("a");
 a.href=url;a.download="nestora-v4-trading-journal.csv";a.click();URL.revokeObjectURL(url);
});
renderTrades();setTimeout(redrawCharts,80);
