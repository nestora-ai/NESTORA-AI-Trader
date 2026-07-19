
const titles={
 dashboard:["لوحة التحكم","نظرة شاملة على الأداء والأسواق والمخاطر."],
 markets:["الأسواق الحية","مراقبة الأصول والبحث والتصفية."],
 chart:["الشارت الاحترافي","واجهة تحليل فني تفاعلية."],
 copilot:["NESTORA AI Copilot","مساعد ذكي لتقييم الصفقة والانضباط."],
 risk:["إدارة المخاطر","حساب حجم الصفقة وحدود الخسارة."],
 journal:["سجل التداول","تحليل الأداء والانضباط والمشاعر."],
 news:["الأخبار الاقتصادية","ملخصات تجريبية وتأثير السوق."],
 alerts:["التنبيهات","إنشاء تنبيهات محلية للأسعار والمؤشرات."],
 accounts:["الحسابات","الاستعداد لربط الوسطاء."],
 settings:["الإعدادات","المظهر وإدارة المنصة."]
};

function showApp(){
 loginScreen.classList.add("hidden");app.classList.remove("hidden");
 localStorage.setItem("nestora_v5_logged","1");setTimeout(redrawCharts,60);
}
loginForm.addEventListener("submit",e=>{e.preventDefault();showApp()});
if(localStorage.getItem("nestora_v5_logged")==="1")showApp();
logoutBtn.addEventListener("click",()=>{localStorage.removeItem("nestora_v5_logged");location.reload()});
themeBtn.addEventListener("click",()=>{document.body.classList.toggle("light");localStorage.setItem("nestora_theme",document.body.classList.contains("light")?"light":"dark");redrawCharts()});
if(localStorage.getItem("nestora_theme")==="light")document.body.classList.add("light");

function go(view){
 document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));
 document.getElementById(view).classList.add("active");
 document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.view===view));
 pageTitle.textContent=titles[view][0];pageSubtitle.textContent=titles[view][1];
 sidebar.classList.remove("open");window.scrollTo({top:0,behavior:"smooth"});
 if(view==="chart")setTimeout(redrawCharts,50);
}
document.querySelectorAll("[data-view]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.view)));
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.go)));
menuBtn.addEventListener("click",()=>sidebar.classList.toggle("open"));

const marketData=[
 {symbol:"XAU/USD",name:"الذهب مقابل الدولار",category:"metals",price:"—",change:"+0.00%",dir:"up"},
 {symbol:"EUR/USD",name:"اليورو مقابل الدولار",category:"forex",price:"—",change:"+0.00%",dir:"up"},
 {symbol:"GBP/USD",name:"الجنيه مقابل الدولار",category:"forex",price:"—",change:"-0.00%",dir:"down"},
 {symbol:"BTC/USD",name:"بيتكوين",category:"crypto",price:"—",change:"+0.00%",dir:"up"},
 {symbol:"ETH/USD",name:"إيثريوم",category:"crypto",price:"—",change:"+0.00%",dir:"up"},
 {symbol:"NVDA",name:"NVIDIA",category:"stocks",price:"—",change:"+0.00%",dir:"up"},
 {symbol:"AAPL",name:"Apple",category:"stocks",price:"—",change:"-0.00%",dir:"down"},
 {symbol:"XAG/USD",name:"الفضة مقابل الدولار",category:"metals",price:"—",change:"+0.00%",dir:"up"}
];
watchlist.innerHTML=marketData.slice(0,5).map(a=>`<div class="watch-row"><div><b>${a.symbol}</b><small>${a.name}</small></div><div><b>${a.price}</b><small class="${a.dir}">${a.change}</small></div></div>`).join("");

function renderMarkets(filter="all",query=""){
 const q=query.toLowerCase();
 const list=marketData.filter(a=>(filter==="all"||a.category===filter)&&(a.symbol.toLowerCase().includes(q)||a.name.includes(query)));
 marketGrid.innerHTML=list.map((a,i)=>`<article class="market-card"><header><div><b>${a.symbol}</b><p>${a.name}</p></div><span class="${a.dir}">${a.change}</span></header><div class="market-price">${a.price}</div><canvas class="spark" data-spark="${i}" height="60"></canvas></article>`).join("");
 setTimeout(drawSparks,20);
}
renderMarkets();
marketSearch.addEventListener("input",()=>renderMarkets(document.querySelector(".market-filters button.active").dataset.filter,marketSearch.value));
document.querySelectorAll(".market-filters button").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".market-filters button").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderMarkets(b.dataset.filter,marketSearch.value)}));

function getThemeColors(){
 const light=document.body.classList.contains("light");
 return {grid:light?"rgba(6,16,24,.08)":"rgba(255,255,255,.06)",bg:light?"#edf3f7":"#061018"};
}
function drawLine(canvas,values){
 if(!canvas)return;const c=getThemeColors(),ctx=canvas.getContext("2d"),dpr=window.devicePixelRatio||1,w=canvas.clientWidth||700,h=canvas.getAttribute("height")|0;
 canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);
 ctx.strokeStyle=c.grid;ctx.lineWidth=1;for(let i=1;i<5;i++){ctx.beginPath();ctx.moveTo(0,h*i/5);ctx.lineTo(w,h*i/5);ctx.stroke()}
 const min=Math.min(...values),max=Math.max(...values),pad=22,pts=values.map((v,i)=>[pad+(w-pad*2)*i/(values.length-1),h-pad-(h-pad*2)*(v-min)/(max-min||1)]);
 const grad=ctx.createLinearGradient(0,0,w,0);grad.addColorStop(0,"#627cff");grad.addColorStop(1,"#3edbd4");ctx.strokeStyle=grad;ctx.lineWidth=4;ctx.lineJoin="round";ctx.lineCap="round";ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(...p):ctx.moveTo(...p));ctx.stroke();
 const fill=ctx.createLinearGradient(0,0,0,h);fill.addColorStop(0,"rgba(62,219,212,.20)");fill.addColorStop(1,"rgba(62,219,212,0)");ctx.lineTo(pts.at(-1)[0],h);ctx.lineTo(pts[0][0],h);ctx.closePath();ctx.fillStyle=fill;ctx.fill();
}
function drawSparks(){
 document.querySelectorAll("[data-spark]").forEach((c,i)=>drawLine(c,[10+i,13+i,11+i,15+i,18+i,17+i,21+i,23+i,22+i,26+i]));
}
const perfSets={"1D":[20,24,22,29,35,33,42,47,45,55,58,57,66,70,72,80],"1W":[18,20,25,23,31,34,38,42,44,50,48,55,61,59,66,72],"1M":[12,18,16,22,26,30,35,33,40,46,49,54,58,63,68,74],"1Y":[8,12,10,17,20,24,30,36,41,45,52,58,62,67,71,78]};
const marketSets={XAUUSD:[40,42,39,45,47,46,52,55,51,57,61,60,64,66],EURUSD:[50,48,49,47,51,54,53,57,56,59,61,60,62,64],GBPUSD:[55,52,54,49,51,48,50,53,51,55,57,54,58,60],BTCUSD:[35,41,38,44,50,47,55,52,58,62,57,65,63,70],NVDA:[25,28,27,33,36,40,38,45,48,46,52,55,59,63]};
let perfRange="1D";function redrawCharts(){drawLine(performanceChart,perfSets[perfRange]);drawLine(marketChart,marketSets[marketSymbol.value]);drawSparks()}
window.addEventListener("resize",redrawCharts);
document.querySelectorAll(".range-tabs button").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".range-tabs button").forEach(x=>x.classList.remove("active"));b.classList.add("active");perfRange=b.dataset.range;redrawCharts()}));
marketSymbol.addEventListener("change",redrawCharts);

const activeIndicators=new Set();
document.querySelectorAll(".indicator-tabs button").forEach(b=>b.addEventListener("click",()=>{b.classList.toggle("active");b.classList.contains("active")?activeIndicators.add(b.dataset.indicator):activeIndicators.delete(b.dataset.indicator);indicatorStatus.textContent=activeIndicators.size?`المؤشرات المفعلة: ${[...activeIndicators].join("، ")}`:"لا توجد مؤشرات مفعلة."}));

let botMode="analysis";
document.querySelectorAll(".bot-modes button").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".bot-modes button").forEach(x=>x.classList.remove("active"));b.classList.add("active");botMode=b.dataset.mode}));
const extractNumbers=text=>(text.match(/\d+(?:\.\d+)?/g)||[]).map(Number);
function aiReply(text){
 const t=text.toLowerCase(),nums=extractNumbers(text);
 if(botMode==="coach"){if(t.includes("انتقام")||t.includes("خسارة"))return "لا تحاولي تعويض الخسارة بصفقة أكبر. توقفي وراجعي السبب، ثم عودي فقط عند وجود صفقة تستوفي القواعد.";return "اكتبي خطة قبل الدخول، حددي الحد اليومي للخسارة، وسجلي السبب والمشاعر لكل صفقة."}
 if(botMode==="risk"||t.includes("حجم العقد")){if(nums.length>=4){const [balance,riskPct,stopPips,pipValue]=nums,loss=balance*riskPct/100,lot=loss/(stopPips*pipValue);return `أقصى خسارة $${loss.toFixed(2)}، وحجم العقد التقريبي ${lot.toFixed(2)} لوت. تحققي من قيمة النقطة للأصل.`}return "أرسلي: الرصيد، نسبة المخاطرة، وقف الخسارة بالنقاط، وقيمة النقطة لكل لوت."}
 if(nums.length>=3){const [entry,stop,target]=nums,rr=Math.abs(target-entry)/Math.abs(entry-stop);if(!isFinite(rr))return "تأكدي من اختلاف سعر الدخول ووقف الخسارة.";let score=Math.round(Math.min(95,Math.max(25,45+rr*18)));if(t.includes("خبر"))score-=15;if(t.includes("متسرع")||t.includes("خائف"))score-=10;return `نسبة العائد إلى المخاطرة تقريبًا 1:${rr.toFixed(2)}. تقييم الصفقة: ${score}/100. ${rr>=2?"النسبة جيدة مبدئيًا.":rr>=1.5?"النسبة مقبولة بحذر.":"النسبة ضعيفة وتحتاج تعديلًا."}`}
 if(t.includes("1:2")||t.includes("1 : 2"))return "نسبة 1:2 جيدة مبدئيًا. تقييمها النظري 80/100 قبل احتساب الاتجاه والأخبار وجودة نقطة الدخول.";
 if(t.includes("تقييم"))return "أرسلي الدخول، وقف الخسارة، الهدف، وهل توجد أخبار قوية أو مشاعر تسرع، وسأعطيك تقييمًا من 100.";
 return "أستطيع تقييم الصفقة، حساب المخاطرة، وتقديم توجيهات انضباطية. التحليل الحي سيُضاف عند ربط مصدر بيانات وخادم آمن.";
}
function sendMessage(text){if(!text.trim())return;chat.insertAdjacentHTML("beforeend",`<div class="message user">${text}</div>`);setTimeout(()=>{chat.insertAdjacentHTML("beforeend",`<div class="message ai">${aiReply(text)}</div>`);chat.scrollTop=chat.scrollHeight},250);aiInput.value="";chat.scrollTop=chat.scrollHeight}
sendAI.addEventListener("click",()=>sendMessage(aiInput.value));aiInput.addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendMessage(aiInput.value)}});document.querySelectorAll(".quick-prompts button").forEach(b=>b.addEventListener("click",()=>sendMessage(b.textContent)));

function calcRiskFn(){const b=Math.max(0,+balance.value||0),r=Math.max(0,+riskPct.value||0),s=Math.max(1,+stopPips.value||1),p=Math.max(.01,+pipValue.value||.01),d=Math.max(0,+dailyLimit.value||0),o=Math.max(0,+openTrades.value||0),loss=b*r/100,lot=loss/(s*p),daily=b*d/100;maxLoss.textContent="$"+loss.toFixed(2);lotSize.textContent=lot.toFixed(2)+" لوت";dailyLoss.textContent="$"+daily.toFixed(2);let rule="مسموح",guide="المخاطرة الحالية منخفضة ومناسبة للمرحلة الأولى.";if(r>1||o>=3){rule="بحذر";guide="المخاطرة أو عدد الصفقات المفتوحة مرتفع نسبيًا."}if(r>2||o>=5){rule="مرفوض";guide="المخاطرة مرتفعة جدًا وفق قواعد NESTORA."}riskRule.textContent=rule;riskGuidance.textContent=guide}
calcRisk.addEventListener("click",calcRiskFn);calcRiskFn();

const TRADE_KEY="nestora_v5_trades",getTrades=()=>JSON.parse(localStorage.getItem(TRADE_KEY)||"[]");
function saveTradesData(d){localStorage.setItem(TRADE_KEY,JSON.stringify(d));renderTrades()}
function renderTrades(){const d=getTrades();tradeRows.innerHTML=d.length?d.map(x=>`<tr><td>${x.date}</td><td>${x.asset}</td><td>${x.side}</td><td>${x.broker}</td><td>${x.pl.toFixed(2)}$</td><td>${x.outcome}</td><td>${x.rr.toFixed(1)}</td><td>${x.discipline}</td><td>${x.emotion}</td></tr>`).join(""):`<tr><td colspan="9" style="color:#91a6b7">لا توجد صفقات مسجلة بعد.</td></tr>`;const total=d.reduce((a,x)=>a+x.pl,0),wins=d.filter(x=>x.outcome==="رابحة").length,grossProfit=d.filter(x=>x.pl>0).reduce((a,x)=>a+x.pl,0),grossLoss=Math.abs(d.filter(x=>x.pl<0).reduce((a,x)=>a+x.pl,0)),rr=d.length?d.reduce((a,x)=>a+x.rr,0)/d.length:0;dashboardPL.textContent=(total>=0?"+":"")+"$"+total.toFixed(2);dashboardWin.textContent=d.length?Math.round(wins/d.length*100)+"%":"0%";profitFactor.textContent=grossLoss? (grossProfit/grossLoss).toFixed(2):(grossProfit>0?"∞":"0.00");avgRR.textContent=rr.toFixed(2)}
saveTrade.addEventListener("click",()=>{const asset=jAsset.value.trim();if(!asset)return alert("أدخلي اسم الأصل");const d=getTrades();d.unshift({date:new Date().toLocaleDateString("ar-OM"),asset,side:jSide.value,broker:jBroker.value,pl:+jPL.value||0,outcome:jOutcome.value,discipline:jDiscipline.value,rr:+jRR.value||0,emotion:jEmotion.value,notes:jNotes.value.trim()});saveTradesData(d);jAsset.value="";jPL.value="";jNotes.value=""});
clearTrades.addEventListener("click",()=>{if(confirm("هل تريدين مسح جميع الصفقات؟"))saveTradesData([])});
exportCSV.addEventListener("click",()=>{const d=getTrades();if(!d.length)return alert("لا توجد بيانات للتصدير");const rows=[["التاريخ","الأصل","النوع","المنصة","النتيجة","الحالة","RR","الانضباط","المشاعر","الملاحظات"],...d.map(x=>[x.date,x.asset,x.side,x.broker,x.pl,x.outcome,x.rr,x.discipline,x.emotion,x.notes])],csv="\ufeff"+rows.map(r=>r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(",")).join("\n"),blob=new Blob([csv],{type:"text/csv;charset=utf-8"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="nestora-v5-trading-journal.csv";a.click();URL.revokeObjectURL(url)});
renderTrades();

const newsItems=[
 {title:"قرار فائدة مرتقب",impact:"high",label:"تأثير مرتفع",body:"قد ترتفع تقلبات الدولار والذهب قرب وقت الإعلان. هذه بطاقة تجريبية وليست خبرًا حيًا."},
 {title:"بيانات تضخم",impact:"medium",label:"تأثير متوسط",body:"قد تؤثر بيانات التضخم على توقعات الفائدة واتجاه الدولار."},
 {title:"تحديث أسواق الأسهم",impact:"low",label:"تأثير منخفض",body:"ملخص تجريبي لحركة قطاع التكنولوجيا والمخاطر العامة."},
 {title:"مخزونات النفط",impact:"medium",label:"تأثير متوسط",body:"قد تؤثر البيانات على أسعار النفط والعملات المرتبطة بالطاقة."},
 {title:"تصريحات بنك مركزي",impact:"high",label:"تأثير مرتفع",body:"التصريحات المفاجئة قد تسبب حركة سريعة واتساعًا في السبريد."},
 {title:"ثقة المستهلك",impact:"low",label:"تأثير منخفض",body:"مؤشر اقتصادي مساعد لفهم قوة النشاط الاقتصادي."}
];
newsGrid.innerHTML=newsItems.map(n=>`<article class="news-card"><span class="impact ${n.impact}">${n.label}</span><h3>${n.title}</h3><p>${n.body}</p></article>`).join("");

const ALERT_KEY="nestora_v5_alerts",getAlerts=()=>JSON.parse(localStorage.getItem(ALERT_KEY)||"[]");
function renderAlerts(){const a=getAlerts();alertsList.innerHTML=a.length?a.map((x,i)=>`<div class="alert-item"><div><b>${x.name}</b><small>${x.asset} — ${x.condition} ${x.value}</small></div><button class="danger-btn" onclick="deleteAlert(${i})">حذف</button></div>`).join(""):`<div style="color:#91a6b7">لا توجد تنبيهات محفوظة.</div>`}
window.deleteAlert=i=>{const a=getAlerts();a.splice(i,1);localStorage.setItem(ALERT_KEY,JSON.stringify(a));renderAlerts()};
saveAlert.addEventListener("click",()=>{if(!alertValue.value)return alert("أدخلي قيمة التنبيه");const a=getAlerts();a.unshift({name:alertName.value.trim()||"تنبيه جديد",asset:alertAsset.value,condition:alertCondition.value,value:+alertValue.value});localStorage.setItem(ALERT_KEY,JSON.stringify(a));alertName.value="";alertValue.value="";renderAlerts()});
renderAlerts();setTimeout(redrawCharts,80);
