
const titles={
 dashboard:["لوحة التحكم","ملخص الأداء والحسابات والأسواق."],
 markets:["الأسواق","مخططات تجريبية واستعداد لربط البيانات الحقيقية."],
 assistant:["NESTORA AI","مساعد أولي لتقييم الصفقة وإدارة المخاطر."],
 risk:["إدارة المخاطر","حساب حجم العقد والخسارة القصوى."],
 journal:["سجل الصفقات","توثيق النتائج وتحليل الأداء."],
 accounts:["الحسابات","الاستعداد لربط الوسطاء لاحقًا."],
 settings:["الإعدادات","إدارة خيارات المنصة."]
};
function go(view){
 document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));
 document.getElementById(view).classList.add("active");
 document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.view===view));
 pageTitle.textContent=titles[view][0]; pageSubtitle.textContent=titles[view][1];
 sidebar.classList.remove("open"); window.scrollTo({top:0,behavior:"smooth"});
}
document.querySelectorAll("[data-view]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.view)));
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.go)));
menuBtn.addEventListener("click",()=>sidebar.classList.toggle("open"));

const assets=[
 {s:"XAU/USD",n:"الذهب مقابل الدولار",p:"—",c:"بانتظار المصدر",dir:"up"},
 {s:"EUR/USD",n:"اليورو مقابل الدولار",p:"—",c:"بانتظار المصدر",dir:"up"},
 {s:"BTC/USD",n:"بيتكوين",p:"—",c:"بانتظار المصدر",dir:"down"},
 {s:"NVDA",n:"NVIDIA",p:"—",c:"بانتظار المصدر",dir:"up"}
];
watchlist.innerHTML=assets.map(a=>`<div class="watch-row"><div><b>${a.s}</b><small>${a.n}</small></div><div><b>${a.p}</b><small class="${a.dir}">${a.c}</small></div></div>`).join("");

function drawLine(canvas,values){
 const ctx=canvas.getContext("2d"),dpr=window.devicePixelRatio||1,w=canvas.clientWidth,h=canvas.height;
 canvas.width=w*dpr;canvas.height=h*dpr;ctx.scale(dpr,dpr);ctx.clearRect(0,0,w,h);
 ctx.strokeStyle="rgba(255,255,255,.06)";ctx.lineWidth=1;
 for(let i=1;i<5;i++){ctx.beginPath();ctx.moveTo(0,h*i/5);ctx.lineTo(w,h*i/5);ctx.stroke()}
 const min=Math.min(...values),max=Math.max(...values),pad=22;
 const pts=values.map((v,i)=>[pad+(w-pad*2)*i/(values.length-1),h-pad-(h-pad*2)*(v-min)/(max-min||1)]);
 const grad=ctx.createLinearGradient(0,0,w,0);grad.addColorStop(0,"#627cff");grad.addColorStop(1,"#3edbd4");
 ctx.strokeStyle=grad;ctx.lineWidth=4;ctx.lineJoin="round";ctx.lineCap="round";ctx.beginPath();
 pts.forEach((p,i)=>i?ctx.lineTo(...p):ctx.moveTo(...p));ctx.stroke();
 const fill=ctx.createLinearGradient(0,0,0,h);fill.addColorStop(0,"rgba(62,219,212,.20)");fill.addColorStop(1,"rgba(62,219,212,0)");
 ctx.lineTo(pts[pts.length-1][0],h);ctx.lineTo(pts[0][0],h);ctx.closePath();ctx.fillStyle=fill;ctx.fill();
}
const perf=[20,25,22,30,38,35,44,51,49,58,62,61,70,73,72,80];
const marketSets={XAUUSD:[40,42,39,45,47,46,52,55,51,57,61,60,64,66],EURUSD:[50,48,49,47,51,54,53,57,56,59,61,60,62,64],BTCUSD:[35,41,38,44,50,47,55,52,58,62,57,65,63,70],NVDA:[25,28,27,33,36,40,38,45,48,46,52,55,59,63]};
function redraw(){drawLine(performanceChart,perf);drawLine(marketChart,marketSets[marketSymbol.value])}
window.addEventListener("resize",redraw);marketSymbol.addEventListener("change",redraw);setTimeout(redraw,50);

function calcRiskFn(){
 const b=Math.max(0,+balance.value||0),r=Math.max(0,+riskPct.value||0),s=Math.max(1,+stopPips.value||1),p=Math.max(.01,+pipValue.value||.01);
 const loss=b*r/100,lot=loss/(s*p);
 maxLoss.textContent="$"+loss.toFixed(2);lotSize.textContent=lot.toFixed(2)+" لوت";
 riskClass.textContent=r<=.5?"منخفضة":r<=1?"معتدلة":r<=2?"مرتفعة":"مرتفعة جدًا";
 riskRule.textContent=r<=.5?"مسموح":r<=1?"بحذر":"مرفوض";
}
calcRisk.addEventListener("click",calcRiskFn);calcRiskFn();

function aiReply(text){
 const t=text.toLowerCase();
 if(t.includes("حجم العقد")) return "لحساب حجم العقد: حددي رصيد الحساب، نسبة المخاطرة، وقف الخسارة، وقيمة النقطة. استخدمي صفحة إدارة المخاطر داخل المنصة للحصول على تقدير مباشر.";
 if(t.includes("1:2")||t.includes("1 : 2")) return "نسبة 1:2 تعني أنك تخاطرين بوحدة واحدة مقابل هدف ربح وحدتين. هي نسبة جيدة مبدئيًا، بشرط أن تكون الصفقة منطقية ولا توجد أخبار قوية قريبة.";
 if(t.includes("الأخبار")) return "التداول وقت الأخبار القوية قد يسبب انزلاقًا سعريًا واتساع السبريد وتحركات مفاجئة. الأفضل الانتظار حتى يهدأ السوق، خصوصًا للمبتدئ.";
 const nums=(text.match(/\d+(?:\.\d+)?/g)||[]).map(Number);
 if(nums.length>=3){
   const [entry,stop,target]=nums,rr=Math.abs(target-entry)/Math.abs(entry-stop);
   if(!isFinite(rr)) return "تأكدي من أن سعر الدخول ووقف الخسارة مختلفان.";
   return `النسبة التقريبية للعائد إلى المخاطرة هي 1:${rr.toFixed(2)}. ${rr>=2?"النسبة جيدة مبدئيًا، لكن يلزم تأكيد الاتجاه والأخبار.":rr>=1.5?"النسبة مقبولة بحذر.":"النسبة ضعيفة، ويفضل إعادة ضبط الهدف أو وقف الخسارة."}`;
 }
 return "أستطيع حاليًا مساعدتك في حساب المخاطرة، تقييم نسبة العائد إلى المخاطرة، وشرح قواعد التداول الآمن. التحليل الحي للأسواق سيُضاف بعد ربط مصدر بيانات وخادم آمن.";
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

const KEY="nestora_v3_trades";
const getTrades=()=>JSON.parse(localStorage.getItem(KEY)||"[]");
function saveTradesData(d){localStorage.setItem(KEY,JSON.stringify(d));renderTrades()}
function renderTrades(){
 const d=getTrades();
 tradeRows.innerHTML=d.length?d.map(x=>`<tr><td>${x.date}</td><td>${x.asset}</td><td>${x.broker}</td><td>${x.pl.toFixed(2)}$</td><td>${x.outcome}</td><td>${x.notes||"-"}</td></tr>`).join(""):`<tr><td colspan="6" style="color:#91a6b7">لا توجد صفقات مسجلة بعد.</td></tr>`;
 const total=d.reduce((a,x)=>a+x.pl,0),wins=d.filter(x=>x.outcome==="رابحة").length;
 dashboardPL.textContent=(total>=0?"+":"")+"$"+total.toFixed(2);dashboardWin.textContent=d.length?Math.round(wins/d.length*100)+"%":"0%";
}
saveTrade.addEventListener("click",()=>{
 const asset=jAsset.value.trim();if(!asset)return alert("أدخلي اسم الأصل");
 const d=getTrades();d.unshift({date:new Date().toLocaleDateString("ar-OM"),asset,broker:jBroker.value,pl:+jPL.value||0,outcome:jOutcome.value,notes:jNotes.value.trim()});
 saveTradesData(d);jAsset.value="";jPL.value="";jNotes.value="";
});
clearTrades.addEventListener("click",()=>{if(confirm("هل تريدين مسح جميع الصفقات؟"))saveTradesData([])});
exportCSV.addEventListener("click",()=>{
 const d=getTrades();if(!d.length)return alert("لا توجد بيانات للتصدير");
 const rows=[["التاريخ","الأصل","المنصة","النتيجة","الحالة","الملاحظات"],...d.map(x=>[x.date,x.asset,x.broker,x.pl,x.outcome,x.notes])];
 const csv="\ufeff"+rows.map(r=>r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(",")).join("\n");
 const blob=new Blob([csv],{type:"text/csv;charset=utf-8"}),url=URL.createObjectURL(blob),a=document.createElement("a");
 a.href=url;a.download="nestora-trading-journal.csv";a.click();URL.revokeObjectURL(url);
});
renderTrades();
