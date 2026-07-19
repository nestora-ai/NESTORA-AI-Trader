
const courses=[
 {id:1,title:"مقدمة في التداول",level:"beginner",icon:"📈",hours:3,lessons:6,price:29,desc:"تعرف على معنى التداول والفرق بينه وبين الاستثمار وأنواع الأسواق.",topics:["ما هو التداول؟","الاستثمار مقابل التداول","أنواع الأسواق","أنواع الأوامر","المصطلحات الأساسية","اختبار تمهيدي"]},
 {id:2,title:"أساسيات الأسواق المالية",level:"beginner",icon:"🌍",hours:4,lessons:7,price:39,desc:"فهم العملات والأسهم والمعادن والمؤشرات والعملات الرقمية.",topics:["الفوركس","الأسهم","المؤشرات","المعادن","الطاقة","العملات الرقمية","اختبار"]},
 {id:3,title:"احتراف منصات التداول",level:"beginner",icon:"💻",hours:5,lessons:8,price:49,desc:"التعرف على MT5 وcTrader وXTB وطريقة تنفيذ الأوامر.",topics:["واجهة MT5","واجهة cTrader","واجهة XTB","أمر السوق","Stop وLimit","وقف الخسارة","جني الأرباح","اختبار"]},
 {id:4,title:"إدارة رأس المال",level:"beginner",icon:"🛡️",hours:4,lessons:7,price:49,desc:"أهم دورة للمبتدئ لحماية رأس المال وإدارة المخاطر.",topics:["نسبة المخاطرة","حجم العقد","وقف الخسارة","RR","الحد اليومي","أمثلة تطبيقية","اختبار"]},
 {id:5,title:"التحليل الفني",level:"intermediate",icon:"📊",hours:6,lessons:9,price:79,desc:"بناء قراءة منظمة للشارت والاتجاه والمناطق السعرية.",topics:["الاتجاه","القمم والقيعان","الدعم والمقاومة","الترند","النماذج","الفريمات","التأكيد","تطبيق","اختبار"]},
 {id:6,title:"الشموع اليابانية",level:"intermediate",icon:"🕯️",hours:4,lessons:7,price:59,desc:"فهم تركيب الشمعة وأهم النماذج الانعكاسية والاستمرارية.",topics:["تركيب الشمعة","دوجي","ابتلاع","مطرقة","نجمة","السياق","اختبار"]},
 {id:7,title:"المؤشرات الفنية",level:"intermediate",icon:"📉",hours:5,lessons:8,price:79,desc:"الاستخدام الصحيح لمؤشرات RSI وMACD وEMA وBollinger.",topics:["RSI","MACD","EMA","Bollinger","التباعد","الدمج","الأخطاء","اختبار"]},
 {id:8,title:"علم نفس المتداول",level:"intermediate",icon:"🧠",hours:4,lessons:7,price:69,desc:"إدارة الخوف والطمع والتسرع والتداول الانتقامي.",topics:["الخوف","الطمع","التسرع","الانتقام","الانضباط","اليوميات","اختبار"]},
 {id:9,title:"Price Action",level:"advanced",icon:"⚡",hours:7,lessons:10,price:129,desc:"قراءة حركة السعر دون الاعتماد المفرط على المؤشرات.",topics:["هيكل السوق","السياق","المناطق","الاختراق","إعادة الاختبار","الزخم","الدخول","الإدارة","تطبيق","اختبار"]},
 {id:10,title:"Smart Money Concepts",level:"advanced",icon:"🏦",hours:8,lessons:10,price:149,desc:"مفاهيم السيولة والهيكل وOrder Blocks بصورة منظمة.",topics:["Liquidity","BOS","CHOCH","Order Blocks","FVG","Premium/Discount","Session","Entry Model","تطبيق","اختبار"]},
 {id:11,title:"التداول أثناء الأخبار",level:"advanced",icon:"📰",hours:5,lessons:8,price:99,desc:"فهم الأخبار عالية التأثير والانزلاق والسبريد وإدارة المخاطر.",topics:["التقويم الاقتصادي","الفائدة","التضخم","الوظائف","السبريد","الانزلاق","الخطة","اختبار"]},
 {id:12,title:"NESTORA AI Professional",level:"advanced",icon:"🤖",hours:5,lessons:8,price:99,desc:"استخدام NESTORA AI وسجل التداول ومحرك المخاطر بفاعلية.",topics:["لوحة التحكم","AI Copilot","محرك المخاطر","السجل","التوصيات","الأسواق","التنبيهات","اختبار"]}
];

const titles={
 dashboard:["لوحة التحكم","ملخص التداول والتعلم والتقدم."],markets:["الأسواق","قائمة مرنة قابلة للتوسع."],copilot:["NESTORA AI","مساعد تداول وتعليم."],risk:["إدارة المخاطر","حاسبة المخاطر."],journal:["سجل التداول","ربط الأداء بالتعلم."],academy:["NESTORA Academy","مكتبة الدورات والمسارات."],student:["لوحة الطالب","التقدم والإنجازات."],certificates:["الشهادات","شهادات إتمام الدورات."],subscriptions:["الاشتراكات","الباقات والمدفوعات."],settings:["الإعدادات","بيانات المستخدم."]
};

const USER_KEY="nestora_v6_user",ENROLL_KEY="nestora_v6_enrollments",TRADE_KEY="nestora_v6_trades";
const getUser=()=>JSON.parse(localStorage.getItem(USER_KEY)||"null");
const getEnrollments=()=>JSON.parse(localStorage.getItem(ENROLL_KEY)||"[]");
const getTrades=()=>JSON.parse(localStorage.getItem(TRADE_KEY)||"[]");

function applyUser(){
 const u=getUser(); if(!u)return;
 sidebarName.textContent=u.name;sidebarEmail.textContent=u.email;
 sidebarAvatar.textContent=(u.name.trim()[0]||"م").toUpperCase();topAvatar.textContent=(u.name.trim()[0]||"م").toUpperCase();
 settingsName.value=u.name;settingsEmail.value=u.email;
}
function showApp(){loginScreen.classList.add("hidden");app.classList.remove("hidden");applyUser();renderAll()}
loginForm.addEventListener("submit",e=>{e.preventDefault();localStorage.setItem(USER_KEY,JSON.stringify({name:loginName.value.trim(),email:loginEmail.value.trim()}));showApp()});
if(getUser())showApp();
logoutBtn.addEventListener("click",()=>{localStorage.removeItem(USER_KEY);location.reload()});

function go(view){
 document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));document.getElementById(view).classList.add("active");
 document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.view===view));
 pageTitle.textContent=titles[view][0];pageSubtitle.textContent=titles[view][1];sidebar.classList.remove("open");window.scrollTo(0,0)
}
document.querySelectorAll("[data-view]").forEach(b=>b.onclick=()=>go(b.dataset.view));
document.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>go(b.dataset.go));
menuBtn.onclick=()=>sidebar.classList.toggle("open");

const marketNames=["XAU/USD","EUR/USD","GBP/USD","USD/JPY","BTC/USD","ETH/USD","NASDAQ","S&P 500","US Oil","Silver","AAPL","NVDA"];
marketGrid.innerHTML=marketNames.map(x=>`<div class="market-card"><b>${x}</b><small>متاح عند ربط مصدر السوق أو حساب الوسيط</small></div>`).join("");

let activeLevel="all";
function renderCourses(){
 const q=courseSearch.value.toLowerCase();
 const list=courses.filter(c=>(activeLevel==="all"||c.level===activeLevel)&&(c.title.toLowerCase().includes(q)||c.desc.includes(courseSearch.value)));
 courseGrid.innerHTML=list.map(c=>{
   const e=getEnrollments().find(x=>x.id===c.id);
   return `<article class="course-card">
    <div class="course-cover">${c.icon}</div>
    <h3>${c.title}</h3><p>${c.desc}</p>
    <div class="course-meta"><span>${c.lessons} دروس</span><span>${c.hours} ساعات</span></div>
    ${e?`<div class="progress"><span style="width:${e.progress}%"></span></div><small>التقدم ${e.progress}%</small>`:`<div class="price">$${c.price}</div>`}
    <button class="${e?'secondary-btn':'primary-btn'}" onclick="openCourse(${c.id})">${e?'متابعة الدورة':'عرض الدورة'}</button>
   </article>`
 }).join("")
}
courseSearch.oninput=renderCourses;
document.querySelectorAll(".course-filters button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".course-filters button").forEach(x=>x.classList.remove("active"));b.classList.add("active");activeLevel=b.dataset.level;renderCourses()});

window.openCourse=id=>{
 const c=courses.find(x=>x.id===id),e=getEnrollments().find(x=>x.id===id);
 courseDetails.innerHTML=`<div class="course-cover" style="font-size:70px;text-align:center">${c.icon}</div><h2>${c.title}</h2><p>${c.desc}</p>
 <div class="course-meta"><span>${c.lessons} دروس</span><span>${c.hours} ساعات</span><span>$${c.price}</span></div>
 <h3>محتوى الدورة</h3><div class="lesson-list">${c.topics.map((t,i)=>`<div class="lesson-item"><span>${i+1}. ${t}</span><span>${e&&e.progress>i/c.topics.length*100?'✓':'○'}</span></div>`).join("")}</div>
 <button class="primary-btn" onclick="${e?`advanceCourse(${id})`:`enrollCourse(${id})`}">${e?'إكمال درس تجريبي':'شراء وتسجيل تجريبي'}</button>`;
 courseModal.classList.remove("hidden")
};
closeModal.onclick=()=>courseModal.classList.add("hidden");
window.enrollCourse=id=>{const arr=getEnrollments();if(!arr.find(x=>x.id===id))arr.push({id,progress:0,completed:false});localStorage.setItem(ENROLL_KEY,JSON.stringify(arr));courseModal.classList.add("hidden");renderAll();alert("تم تسجيل الدورة تجريبيًا. الربط بالدفع سيُضاف لاحقًا.")};
window.advanceCourse=id=>{const arr=getEnrollments(),e=arr.find(x=>x.id===id);e.progress=Math.min(100,e.progress+20);e.completed=e.progress===100;localStorage.setItem(ENROLL_KEY,JSON.stringify(arr));courseModal.classList.add("hidden");renderAll()};

function renderStudent(){
 const arr=getEnrollments();
 studentCourses.innerHTML=arr.length?arr.map(e=>{const c=courses.find(x=>x.id===e.id);return `<div class="student-course"><div><b>${c.title}</b><small>${e.progress}% مكتمل</small></div><div class="progress"><span style="width:${e.progress}%"></span></div><button class="secondary-btn" onclick="openCourse(${c.id})">متابعة</button></div>`}).join(""):"<div class='empty-state'>لا توجد دورات مسجلة.</div>";
}
function renderCertificates(){
 const done=getEnrollments().filter(x=>x.completed);
 certificateGrid.innerHTML=done.length?done.map(e=>{const c=courses.find(x=>x.id===e.id),u=getUser();return `<article class="certificate-card"><div class="certificate-seal">🏆</div><h3>شهادة إتمام</h3><p>${c.title}</p><b>${u.name}</b><small>NESTORA-${String(c.id).padStart(4,"0")}</small></article>`}).join(""):"<div class='card empty-state'>لم تحصل على شهادة بعد. أكمل أي دورة بنسبة 100%.</div>";
}
function updateDashboard(){
 const arr=getEnrollments(),avg=arr.length?Math.round(arr.reduce((a,x)=>a+x.progress,0)/arr.length):0,done=arr.filter(x=>x.completed).length,hours=Math.round(arr.reduce((a,x)=>a+(courses.find(c=>c.id===x.id).hours*x.progress/100),0));
 enrolledCount.textContent=arr.length;avgProgress.textContent=avg+"%";certificateCount.textContent=done;learningHours.textContent=hours;
 if(arr.length){const e=arr[0],c=courses.find(x=>x.id===e.id);lastCourse.innerHTML=`<b>${c.title}</b><div class="progress"><span style="width:${e.progress}%"></span></div><small>${e.progress}% مكتمل</small>`}
 const trades=getTrades(),mistakes=trades.map(x=>x.mistake);
 learningRecommendation.textContent=mistakes.includes("مخاطرة مرتفعة")||mistakes.includes("عدم استخدام وقف الخسارة")?"نوصي بمراجعة دورة إدارة رأس المال قبل فتح صفقة جديدة.":mistakes.includes("دخول متسرع")?"نوصي بدورة علم نفس المتداول وتحسين الانضباط.":"ابدأ بدورة مقدمة في التداول ثم إدارة رأس المال.";
}
function renderTrades(){
 const arr=getTrades();tradeList.innerHTML=arr.length?arr.map(x=>`<div class="list-item"><b>${x.asset}</b> — ${x.result}<small>${x.mistake}</small></div>`).join(""):"<div class='empty-state'>لا توجد صفقات محفوظة.</div>"
}
saveTrade.onclick=()=>{if(!tradeAsset.value.trim())return alert("أدخل الأصل");const arr=getTrades();arr.unshift({asset:tradeAsset.value.trim(),result:tradeResult.value,mistake:tradeMistake.value,notes:tradeNotes.value});localStorage.setItem(TRADE_KEY,JSON.stringify(arr));tradeAsset.value="";tradeNotes.value="";renderAll()};
calcRisk.onclick=()=>{const loss=(+balance.value||0)*(+riskPct.value||0)/100,lot=loss/((+stopPips.value||1)*(+pipValue.value||1));maxLoss.textContent="$"+loss.toFixed(2);lotSize.textContent=lot.toFixed(2)+" لوت"};

function aiReply(t){
 if(t.includes("مبتدئ"))return "ابدأ بالترتيب: مقدمة في التداول، أساسيات الأسواق، احتراف المنصات، ثم إدارة رأس المال.";
 if(t.includes("مخاطر"))return "إدارة المخاطر تعني تحديد نسبة خسارة صغيرة لكل صفقة، استخدام وقف الخسارة، وعدم تجاوز الحد اليومي.";
 if(t.includes("خطة"))return "خطة مقترحة: أسبوع 1 مقدمة وأسواق، أسبوع 2 منصات، أسبوع 3 إدارة مخاطر، أسبوع 4 تطبيق وسجل تداول.";
 return "يمكنني اقتراح دورة، شرح مفهوم، أو ربط خطأ متكرر في سجل التداول بدرس مناسب.";
}
function sendMessage(t){if(!t.trim())return;chat.insertAdjacentHTML("beforeend",`<div class="message user">${t}</div>`);setTimeout(()=>{chat.insertAdjacentHTML("beforeend",`<div class="message ai">${aiReply(t)}</div>`);chat.scrollTop=chat.scrollHeight},200);aiInput.value=""}
sendAI.onclick=()=>sendMessage(aiInput.value);document.querySelectorAll(".quick-prompts button").forEach(b=>b.onclick=()=>sendMessage(b.textContent));

saveProfile.onclick=()=>{localStorage.setItem(USER_KEY,JSON.stringify({name:settingsName.value.trim(),email:settingsEmail.value.trim()}));applyUser();alert("تم حفظ البيانات محليًا.")};

function renderAll(){applyUser();renderCourses();renderStudent();renderCertificates();renderTrades();updateDashboard()}
