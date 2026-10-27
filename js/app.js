(function(){
"use strict";
var $=function(s){return document.querySelector(s)};
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------- lessons ---------------- */
var LESSONS=[
 {name:"Home Row",keys:"asdfjkl;",lead:"In this lesson you will learn the home row:",show:"A S D F | J K L ;",tip:"Rest your left fingers on A S D F and your right fingers on J K L ;",
  words:"asdf jkl; fdsa ;lkj sad dad fad lad ask asks all fall falls flask salad add adds dads alfalfa".split(" ")},
 {name:"Index Fingers G H",keys:"gh",lead:"Now reach for two new keys with your index fingers:",show:"G | H",tip:"Left index reaches right to G, right index reaches left to H. Return home after every key.",
  words:"shall flash glad hash dash half hall gash slash flag shag lag sag hag jag".split(" ")},
 {name:"Top Row",keys:"qwertyuiop",lead:"Time to learn the top row:",show:"Q W E R T Y U I O P",tip:"Reach up from the home row and bring your fingers back after each key.",
  words:"quiet write power tower type your pretty tree outer water poetry equip pure ripe route".split(" ")},
 {name:"Bottom Row",keys:"zxcvbnm,./",lead:"Next is the bottom row:",show:"Z X C V B N M , . /",tip:"Curl your fingers slightly to reach down.",
  words:"zoom exam camp vamp bean mix cave bank next zinc box combine number box, zoo. cab/van".split(" ")},
 {name:"Number Row",keys:"1234567890",lead:"Let's practise the number row:",show:"1 2 3 4 5 6 7 8 9 0",tip:"Stretch up from the home row and keep your wrists steady.",
  words:"12 34 56 78 90 2026 1357 2468 100 365 1024 2048 4096 8192".split(" ")},
 {name:"Common Words",keys:"",lead:"Practise the most common English words:",show:"T H E | A N D | F O R",tip:"Type each word smoothly, then tap Space with your thumb.",
  words:"the and for are with this that have from they will would there their about which your".split(" ")},
 {name:"Computer Words",keys:"",lead:"Words you will use every day in DIT:",show:"COMPUTER | KEYBOARD | MOUSE",tip:"Keep a steady rhythm. Do not rush.",
  words:"computer keyboard monitor mouse software hardware internet network folder file data memory printer window desktop".split(" ")},
 {name:"Sentences",keys:"",lead:"Now type full sentences:",show:"Keep a steady rhythm.",tip:"Look at the screen, not at the keys.",
  words:"practice makes perfect, so keep typing every day. accuracy first, then speed. relax your hands and look at the screen, not at the keys.".split(" ")},
 {name:"IT Basics 1",keys:"",lead:"Read, learn and type at the same time. Click a topic to begin:",show:"",tip:"Read each sentence as you type it. Accuracy first.",topics:[{name:"Software",text:"Software is a set of instructions that tells a computer what to do. We cannot touch software, but we use it every day. There are two main types. System software, such as Windows, controls the computer. Application software, such as MS Word, Excel and Google Chrome, helps us to do our work. Without software, a computer is only a box of metal and plastic."},{name:"Hardware",text:"Hardware means the physical parts of a computer that we can see and touch. The main parts are the monitor, keyboard, mouse, CPU, RAM, hard disk and printer. The CPU is the brain of the computer and processes data. RAM keeps the data that is in use, and the hard disk stores files for a long time. Hardware and software always work together."},{name:"Drivers",text:"A driver is a small program that lets the operating system talk to a hardware device. Every device, such as a printer, scanner or graphics card, needs the correct driver to work properly. If a driver is missing or old, the device may stop working or give errors. We can download new drivers from the website of the maker, or update them through Windows Update."},{name:"IP Address",text:"An IP address is a unique number that identifies a device on a network or on the internet, just like a house address helps the post office to find your home. An example of an IP address is 192.168.1.1. Every computer, mobile phone and printer on a network needs its own IP address so that data can reach the right device."}]},
 {name:"IT Basics 2",keys:"",lead:"Read, learn and type at the same time. Click a topic to begin:",show:"",tip:"Read each sentence as you type it. Accuracy first.",topics:[{name:"Programming",text:"Programming is the process of writing instructions, called code, that a computer can follow to solve a problem. A person who writes code is called a programmer. Programs are written in languages such as Python, Java and C++. Every website, mobile app and game that we use was made by programmers. Learning to program also teaches us to think step by step."},{name:"Artificial Intelligence",text:"Artificial Intelligence, or AI, means making machines that can learn, think and make decisions in a way that is similar to humans. AI can understand speech, recognise faces, translate languages and answer questions. Examples are voice assistants, chatbots and self-driving cars. AI learns from large amounts of data, but it still needs humans to guide it and to check its work."},{name:"Input Devices",text:"An input device is used to send data and commands into the computer. The keyboard is used to type text and numbers. The mouse is used to point and click. Other examples are a scanner, a microphone, a webcam, a touch screen and a barcode reader. Input devices only send information to the computer and they do not show results."},{name:"Output Devices",text:"An output device shows the results of the work that the computer has done. The monitor displays text, pictures and videos on the screen. A printer gives us a paper copy, which is called a hard copy. Speakers and headphones give us sound, and a projector shows the screen on a wall. Some devices, such as a touch screen, work as both input and output."}]}
];
var TESTS=["Typing is a skill that we can learn with practice. Sit straight and keep your feet flat on the floor. Place your fingers on the home row keys and look at the screen. Do not hurry. Type each word with care and press the space bar with your thumb. A little practice every day will make you fast and accurate.", "A computer is an electronic machine that accepts data, processes it and gives us the result. The keyboard and the mouse are used to enter data. The monitor shows the output on the screen. The files that we create are saved on the hard disk. Always save your work and close all programs before you shut down the computer.", "Good typists use all ten fingers and do not look at the keyboard. Speed comes after accuracy, so correct every mistake at once. Take a short break after every thirty minutes of work to rest your eyes and wrists. Keep the screen at the level of your eyes and sit about an arm length away from the monitor.", "The internet connects millions of computers around the world. We use it to send email, search for information, study online and talk to friends. Always keep your password secret and never click on links from people that you do not know. Use a strong password with letters, numbers and symbols, and log out when you finish.", "On 15 March 2026, a new batch of 40 students started the DIT course. The class runs from 9 AM to 1 PM, six days a week. Students learn MS Word, Excel, PowerPoint and typing. Each student must practise for 30 minutes daily and aim to reach 40 words per minute by the end of month 3."];
TESTS.forEach(function(t,i){LESSONS.push({name:"Typing Test "+(i+1),test:true,testNo:i+1,keys:"",lead:"Timed test: type the passage as fast and accurately as you can. The timer starts with your first key.",show:"TIMED TEST",tip:"Accuracy first. Do not look at your hands.",text:t,words:t.split(" ")})});
(function(){var C=window.PSDC_CONTENT;if(!C)return;
function pick(x,n){var b=x.slice(),o=[];while(o.length<n&&b.length)o.push(b.splice(Math.random()*b.length|0,1)[0]);return o}
function add(n,w){LESSONS.forEach(function(l){if(l.name===n)l.words=l.words.concat(w)})}
add("Common Words",C.common);add("Computer Words",C.computer);
[["Medium",C.med,8],["Hard",C.hard,15]].forEach(function(g){for(var k=1;k<=3;k++){var t=pick(g[1],g[2]).join(" ");
LESSONS.push({name:g[0]+" Test "+k,level:g[0],test:true,testNo:LESSONS.filter(function(x){return x.test}).length+1,keys:"",lead:g[0]+" level timed test: a longer passage, never repeated. The timer starts with your first key.",show:"TIMED TEST",tip:"Accuracy first. Do not look at your hands.",text:t,words:t.split(" ")})}});
})();

/* ---------------- keyboard ---------------- */
function K(c){return {l:c.toUpperCase(),u:1,k:c}}
function KS(s){return s.split("").map(K)}
var ROWS=[
  KS("`1234567890-=").concat([{l:"Back",u:2,k:"back",fn:1}]),
  [{l:"Tab",u:1.5,k:"tab",fn:1}].concat(KS("qwertyuiop[]"),[{l:"\\",u:1.5,k:"\\"}]),
  [{l:"Caps",u:1.75,k:"caps",fn:1}].concat(KS("asdfghjkl;'"),[{l:"Enter",u:2.25,k:"enter",fn:1}]),
  [{l:"Shift",u:2.25,k:"shiftL",fn:1}].concat(KS("zxcvbnm,./"),[{l:"Shift",u:2.75,k:"shiftR",fn:1}]),
  [{l:"Ctrl",u:2,k:"ctrl",fn:1},{l:"Alt",u:1.5,k:"alt",fn:1},{l:"Space",u:8,k:" ",fn:1},{l:"Alt",u:1.5,k:"alt",fn:1},{l:"Ctrl",u:2,k:"ctrl",fn:1}]
];
var FM={};
function setF(f,s){for(var i=0;i<s.length;i++)FM[s[i]]=f}
setF("L-little","`1qaz");setF("L-ring","2wsx");setF("L-middle","3edc");setF("L-index","45rtfgvb");
setF("R-index","67yuhjnm");setF("R-middle","8ik,");setF("R-ring","9ol.");setF("R-little","0-=p[]\\;'/");
var FNAME={"L-little":"left little finger","L-ring":"left ring finger","L-middle":"left middle finger","L-index":"left index finger",
  "R-index":"right index finger","R-middle":"right middle finger","R-ring":"right ring finger","R-little":"right little finger"};
function isCap(c){return c.length===1&&c!==c.toLowerCase()}
function shSide(c){var f=FM[c.toLowerCase()];return f&&f[0]==="L"?"R":"L"}
function fingersOf(c){ if(c===" ")return ["L-thumb","R-thumb"]; if(isCap(c)){var b=FM[c.toLowerCase()];return b?[b,shSide(c)+"-little"]:[]} return FM[c]?[FM[c]]:[] }
function targetKeys(c){return isCap(c)?[c.toLowerCase(),"shift"+shSide(c)]:[c]}
function fingerName(c){ if(c===" ")return "thumb (either hand)"; if(isCap(c))return (FNAME[FM[c.toLowerCase()]]||"")+" + hold Shift with the "+(shSide(c)==="L"?"left":"right")+" little finger"; return FNAME[FM[c]]||"" }

var kbEl=$("#kb");
ROWS.forEach(function(r){
  var row=document.createElement("div");row.className="row";
  r.forEach(function(d){
    var k=document.createElement("div");
    k.className="k"+(d.fn?" fn":"");k.style.setProperty("--u",d.u);k.dataset.k=d.k;k.textContent=d.l;
    row.appendChild(k);
  });
  kbEl.appendChild(row);
});
function keyEls(c){return kbEl.querySelectorAll('.k[data-k="'+(c==="\\"?"\\\\":c)+'"]')}

/* ---------------- hands ---------------- */
var handsEl=$("#hands");
var HAND="data:image/webp;base64,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";
var FG=[["little", 24, 95, 30, 95, 43, 107, 20, 26], ["ring", 55, 40, 30, 130, 70, 50, 22, 28], ["middle", 78, 18, 32, 152, 93, 30, 24, 30], ["index", 107, 40, 30, 130, 121, 52, 22, 28], ["thumb", 157, 150, 30, 100, 179, 158, 18, 24, "rotate(10 172 200)"]];
function handSVG(side){
  var t=side==="L"?"translate(130 8) scale(.7)":"translate(510 8) scale(-.7 .7)";
  var g='<g class="hand" transform="'+t+'"><image href="'+HAND+'" width="210" height="397"/>';
  FG.forEach(function(f){var x=f[1],y=f[2],w=f[3],h=f[4],nx=f[5],ny=f[6],nw=f[7],nh=f[8],tr=f[9]||"";
    g+='<g class="fing" data-f="'+side+'-'+f[0]+'"><g class="tapg"><rect class="cap" x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+w/2+'" '+(tr?'transform="'+tr+'"':"")+'/>'
     +'<ellipse class="nl" cx="'+nx+'" cy="'+ny+'" rx="'+nw/2+'" ry="'+nh/2+'" '+(tr&&f[0]==="thumb"?'transform="rotate(10 '+nx+' '+ny+')"':"")+'/><ellipse class="gl" cx="'+(nx-nw*.18)+'" cy="'+(ny-nh*.22)+'" rx="'+nw*.14+'" ry="'+nh*.22+'"/>'
     +'<circle class="ring" cx="'+nx+'" cy="'+ny+'" r="'+nw*.8+'"/></g></g>';});
  return g+"</g>";
}
handsEl.innerHTML=handSVG("L")+handSVG("R");
function setFingers(list){
  handsEl.querySelectorAll(".fing").forEach(function(e){e.classList.toggle("on",list.indexOf(e.dataset.f)>-1)});
}

/* ---------------- audio ---------------- */
var ac=null,soundOn=true;
function ensureAudio(){
  if(!ac){try{ac=new (window.AudioContext||window.webkitAudioContext)()}catch(e){ac=null}}
  if(ac&&ac.state==="suspended")ac.resume();
}
function tone(f1,f2,dur,type,vol,delay){
  if(!ac||!soundOn)return;
  var t=ac.currentTime+(delay||0),o=ac.createOscillator(),g=ac.createGain();
  o.type=type;o.frequency.setValueAtTime(f1,t);o.frequency.exponentialRampToValueAtTime(f2,t+dur);
  g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
  o.connect(g);g.connect(ac.destination);o.start(t);o.stop(t+dur+0.02);
}
function sadSound(){tone(380,300,.18,"sawtooth",.05,0);tone(300,190,.32,"sawtooth",.05,.18)}
function tick(){tone(900,700,.04,"sine",.03,0)}
function winSound(){[523,659,784,1046].forEach(function(f,i){tone(f,f*1.01,.16,"triangle",.07,i*.12)})}
$("#snd").addEventListener("click",function(){
  soundOn=!soundOn;this.textContent=soundOn?"Sound on":"Sound off";this.setAttribute("aria-pressed",soundOn);ensureAudio();refocus();
});

/* ---------------- state ---------------- */
var KEY="psdc-typing-master-v1",save={};
try{save=JSON.parse(localStorage.getItem(KEY)||"{}")||{}}catch(e){save={}}
function persist(){try{localStorage.setItem(KEY,JSON.stringify(save))}catch(e){}}

var S=null,tid=null;
function L(){return LESSONS[S.li]}
function isPara(){return !!L().topics}
function wordAt(i){if(isPara())return S.words[i];if(L().test)return S.words[i%S.words.length];while(S.seq.length<=i){var a=S.words.slice(),j,r,t;for(j=a.length-1;j>0;j--){r=Math.floor(Math.random()*(j+1));t=a[j];a[j]=a[r];a[r]=t}S.seq=S.seq.concat(a)}return S.seq[i]}
function totalChars(){return S.words.join(" ").length}
function curWord(){return wordAt(S.wi)+(isPara()&&S.wi===S.words.length-1?"":" ")}
function curChar(){return curWord()[S.ci]}
var IDLE_MS=5000;
function endIdle(n){if(S.idle){S.pausedTotal+=n-S.idleAt;S.idle=false}}
function elapsed(){
  if(!S.t0)return 0;
  var end=S.paused?S.pauseAt:S.idle?S.idleAt:performance.now();
  return end-S.t0-S.pausedTotal;
}
function loadLesson(i,startNow,ti){
  clearInterval(tid);
  S={li:i,mode:"intro",wi:0,ci:0,correct:0,wrong:0,typed:0,t0:0,pausedTotal:0,paused:false,pauseAt:0,ti:ti||0,seq:[],streak:0,dur:(save.dur||5)*60000};
  S.words=L().topics?L().topics[S.ti].text.split(" "):L().words;
  $("#modal").hidden=true;mood=75;
  $("#pause").textContent="Pause";
  renderLessons();renderAll();
  if(startNow)startLesson();
}
function startLesson(){S.mode="typing";renderAll();refocus()}

/* ---------------- rendering ---------------- */
function renderLessons(){
  var nav=$("#lessons");nav.innerHTML="";
  LESSONS.forEach(function(l,i){
    var b=document.createElement("button");b.type="button";b.className="lesson";b.title=l.name;
    if(i===S.li)b.setAttribute("aria-current","true");
    var st=save[i]?"★".repeat(save[i].stars)+"☆".repeat(3-save[i].stars):"";
    b.innerHTML='<span class="n">'+(i+1)+'</span><span class="t"><b></b><small></small></span><span class="st">'+st+'</span>';
    b.querySelector("b").textContent=l.name;
    b.querySelector("small").textContent=l.keys?l.keys.toUpperCase().split("").join(" "):(l.test?(l.level||"Easy")+" \u00B7 Timed test":l.topics?"Paragraph topics":"Practice");
    b.addEventListener("click",function(){loadLesson(i)});
    if(l.test){b.classList.add("test");b.querySelector(".n").textContent="T"+l.testNo}
    nav.appendChild(b);
  });
}
function esc(s){return s.replace(/[&<>]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;"}[c]})}

function topicsHTML(){var l=L();return '<div class="topics">'+l.topics.map(function(t,i){return '<button type="button" class="tp" data-ti="'+i+'"'+(S.mode!=="intro"&&i===S.ti?' aria-current="true"':'')+'>'+(save["t"+S.li+"-"+i]?"\u2713 ":"")+esc(t.name)+'</button>'}).join("")+'</div>'}
function bindTopics(){document.querySelectorAll("#prompt .tp").forEach(function(b){b.addEventListener("click",function(){ensureAudio();loadLesson(S.li,true,+b.dataset.ti);refocus()})})}
function renderPrompt(){
  var p=$("#prompt"),l=L();
  p.classList.toggle("paused",S.paused);
  if(S.mode==="intro"){
    var chips=l.show.split(" ").map(function(t){return t==="|"?"<i></i>":"<span>"+esc(t)+"</span>"}).join("");
    p.innerHTML='<div class="intro"><p class="lead">'+esc(l.lead)+'</p>'+(l.topics?topicsHTML():'<div class="keysline">'+chips+'</div>')
      +'<p class="hint blink">Press <kbd>Space</kbd> to '+(l.topics?'start the first topic':'continue')+'</p>'+(l.topics?'':'<button class="btn" id="startBtn" type="button">Start lesson</button>')+'</div>';
    if(l.topics)bindTopics();else $("#startBtn").addEventListener("click",function(){ensureAudio();startLesson()});
    return;
  }
  if(l.topics||l.test){
    var t,a=0,b,h='<div class="intro">'+(l.topics?topicsHTML():'')+'<div class="para" id="para">';
    if(l.topics){t=l.topics[S.ti].text;b=t.length}
    else{t=l.words.join(" ")+" ";a=Math.floor(S.typed/150)*150;b=a+450}
    for(var q=a;q<b;q++)h+='<span class="pc'+(q<S.typed?" done":q===S.typed?" cur":"")+'">'+esc(t[q%t.length])+'</span>';
    p.innerHTML=h+'</div></div>';if(l.topics)bindTopics();
    var cu=p.querySelector(".pc.cur"),pa=$("#para");if(cu&&pa)pa.scrollTop=Math.max(0,cu.offsetTop-70);
    return;
  }
  var w=curWord(),h='<div class="word" id="word">';
  for(var i=0;i<w.length;i++){
    var c=w[i],cls="ch"+(c===" "?" sp":"")+(i<S.ci?" done":i===S.ci?" cur":"");
    h+='<div class="'+cls+'">'+(c===" "?"Space":esc(c))+'</div>';
  }
  h+='</div>';
  var nx=[];for(var k=1;k<=6;k++)nx.push(wordAt(S.wi+k));nx=nx.join("   ");
  h+='<div class="upcoming">Next: <b>'+esc(nx)+'</b></div>';
  p.innerHTML=h;
}
function renderKeys(){
  kbEl.querySelectorAll(".k").forEach(function(k){k.classList.remove("lk","tg")});
  L().keys.split("").forEach(function(c){keyEls(c).forEach(function(k){k.classList.add("lk")})});
  var tc=S.mode==="typing"&&!S.paused?curChar():null;
  if(tc!=null)targetKeys(tc).forEach(function(c){keyEls(c).forEach(function(k){k.classList.add("tg")})});
  var fl=$("#fl");
  if(tc!=null){setFingers(fingersOf(tc));fl.textContent=fingerName(tc)}
  else{setFingers([]);fl.textContent=S.mode==="intro"?L().tip:""}
}
function renderAll(){
  $("#tTitle").textContent=(L().test?"":"Lesson "+(S.li+1)+": ")+L().name;
  $("#tSub").textContent=S.mode==="intro"?"Introduction":"Studying";
  renderPrompt();renderKeys();updateSide();
}
(function(){var b=$("#bars");for(var i=0;i<10;i++){var e=document.createElement("i");e.style.height=(22+i*8)+"%";b.appendChild(e)}})();
function fmt(ms){var s=Math.floor(ms/1000);return ("0"+Math.floor(s/60)).slice(-2)+":"+("0"+(s%60)).slice(-2)}
function updateSide(){
  var pct=isPara()?Math.round(S.typed/totalChars()*100):Math.min(100,Math.round(elapsed()/S.dur*100));
  $("#durbox").hidden=isPara();$("#tlabel").textContent=S.idle?"Auto-paused":isPara()?"Time":"Time left";
  $("#pct").textContent=pct+" %";
  var C=2*Math.PI*23;$("#pieArc").setAttribute("stroke-dasharray",(pct/100*C)+" "+C);
  var on=Math.floor(pct/10);
  document.querySelectorAll("#bars i").forEach(function(e,i){e.classList.toggle("on",i<on)});
  updateTime();
  var n=S.correct+S.wrong;$("#acc").textContent=(n?Math.round(S.correct/n*100):100)+"%";
  $("#err").textContent=S.wrong;petRender();
}
function updateTime(){
  if(S.mode==="typing"&&S.t0&&!S.paused&&!S.idle&&performance.now()-S.lastKey>IDLE_MS){S.idle=true;S.idleAt=S.lastKey;toast("Typing stopped. Timer paused. Type any key to continue.")}
  var e=elapsed();
  if(isPara())$("#time").textContent=fmt(e);
  else{$("#time").textContent=fmt(Math.max(0,S.dur-e));if(S.mode==="typing"&&S.t0&&e>=S.dur){finish();return}}
  var m=e/60000;$("#wpm").textContent=m>0.05?Math.round(S.correct/5/m):0;
}

/* ---------------- input ---------------- */
var cap=$("#cap");
function refocus(){try{cap.focus({preventScroll:true})}catch(e){}}
document.addEventListener("keydown",function(e){
  if(e.ctrlKey||e.metaKey||e.altKey||e.isComposing)return;
  if(e.target&&e.target.tagName==="INPUT"&&e.target.id!=="cap")return;
  if(window.GAME_ON){if(e.target&&e.target.tagName==="SUMMARY")return;if(e.key==="Escape"||e.key==="Enter"||e.key.length===1){e.preventDefault();window.gameKey(e.key)}return}
  if(e.key&&e.key.length===1){e.preventDefault();press(e.key)}
});
cap.addEventListener("input",function(){var v=cap.value;cap.value="";for(var i=0;i<v.length;i++)(window.GAME_ON?window.gameKey:press)(v[i])});

function flashKey(c,bad){
  keyEls(c.toLowerCase()).forEach(function(k){
    k.classList.add(bad?"bad":"press");
    setTimeout(function(){k.classList.remove("bad","press")},bad?320:110);
  });
}
function press(ch){
  ensureAudio();
  if(S.paused)return;
  if(S.mode==="intro"){if(ch===" ")startLesson();return}
  if(S.mode==="done"){if(ch===" ")goNext();return}
  var target=curChar();
  if(!S.t0){S.t0=performance.now();tid=setInterval(updateSide,200)}
  var nw=performance.now();endIdle(nw);S.lastKey=nw;
  if(ch===target){
    flashKey(ch,false);tick();
    S.correct++;S.typed++;S.ci++;S.streak++;
    if(S.ci>=curWord().length){S.wi++;S.ci=0;if(isPara()&&S.wi>=S.words.length){finish();return}}
    renderPrompt();renderKeys();updateSide();
        petOk(S.streak%HEART_EVERY===0);
  }else{
    S.wrong++;S.streak=0;petBad();
    flashKey(ch,true);
    var cur=document.querySelector("#prompt .cur");
    if(cur){cur.classList.remove("shake");void cur.offsetWidth;cur.classList.add("shake")}
    sadSound();
    var win=$("#win");win.classList.remove("flash");void win.offsetWidth;win.classList.add("flash");
    if(ch!==ch.toLowerCase()&&ch.toLowerCase()===target)toast("Caps Lock or Shift is on. Turn it off and try again.");
    if(target!==target.toLowerCase()&&ch===target.toLowerCase())toast("Hold Shift for capital letters.");
    updateSide();
  }
}
var tt=null;
function toast(m){var t=$("#toast");t.textContent=m;t.hidden=false;clearTimeout(tt);tt=setTimeout(function(){t.hidden=true},1800)}

/* ---------------- the weeping emoji ---------------- */
var fx=$("#fx");
var CAPS=["Ouch!","Nooo!","Boo-hoo!","My fingers!","Oops!","Wrong key!","Waaah!","Try again!","Not that one!"];
function cry(anchor){
  var r=anchor.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
  while(fx.children.length>18)fx.removeChild(fx.firstChild);
  var e=document.createElement("div");e.className="cry";e.textContent="😭";
  e.style.left=cx+"px";e.style.top=cy+"px";fx.appendChild(e);
  if(reduce){var a0=e.animate([{opacity:0},{opacity:1},{opacity:0}],{duration:700});a0.onfinish=function(){e.remove()};return}
  var d=Math.random()<.5?-1:1;
  var a=e.animate([
    {transform:"translate(-50%,-50%) scale(.2) rotate(0deg)",opacity:0,filter:"blur(0px)",offset:0},
    {transform:"translate(-50%,-100%) scale(1.15,.85) rotate("+(-16*d)+"deg)",opacity:1,filter:"blur(0px)",offset:.14},
    {transform:"translate(-50%,-120%) scale(.9,1.2) rotate("+(14*d)+"deg)",opacity:1,filter:"blur(0px)",offset:.28},
    {transform:"translate(-50%,-135%) scale(1.6) rotate("+(-10*d)+"deg)",opacity:1,filter:"blur(0px)",offset:.48},
    {transform:"translate(-50%,-190%) scale(3.2) rotate("+(18*d)+"deg)",opacity:.9,filter:"blur(1px)",offset:.74},
    {transform:"translate(-50%,-290%) scale(6.5) rotate("+(220*d)+"deg)",opacity:0,filter:"blur(7px)",offset:1}
  ],{duration:1500,easing:"cubic-bezier(.25,.75,.35,1)"});
  a.onfinish=function(){e.remove()};
  for(var i=0;i<6;i++){
    var t=document.createElement("div");t.className="drop";t.textContent="💧";
    t.style.left=cx+"px";t.style.top=cy+"px";fx.appendChild(t);
    var dx=(Math.random()*2-1)*90,up=-(30+Math.random()*50),dn=60+Math.random()*60,delay=120+Math.random()*250;
    var ta=t.animate([
      {transform:"translate(-50%,-50%) scale(.6)",opacity:0,offset:0},
      {transform:"translate("+(dx*.55)+"px,"+up+"px) scale(1)",opacity:1,offset:.4},
      {transform:"translate("+dx+"px,"+dn+"px) scale(.8)",opacity:0,offset:1}
    ],{duration:900,delay:delay,easing:"ease-in",fill:"backwards"});
    ta.onfinish=(function(n){return function(){n.remove()}})(t);
  }
  var b=document.createElement("div");b.className="bub";b.textContent=CAPS[Math.floor(Math.random()*CAPS.length)];
  b.style.left=(cx+d*58)+"px";b.style.top=(cy-70)+"px";fx.appendChild(b);
  var ba=b.animate([
    {transform:"translate(-50%,-50%) scale(0) rotate("+(-8*d)+"deg)",opacity:0},
    {transform:"translate(-50%,-50%) scale(1.15) rotate("+(6*d)+"deg)",opacity:1,offset:.25},
    {transform:"translate(-50%,-90%) scale(1) rotate(0deg)",opacity:1,offset:.7},
    {transform:"translate(-50%,-160%) scale(.9)",opacity:0}
  ],{duration:1200,delay:150,fill:"backwards"});
  ba.onfinish=function(){b.remove()};
}

/* ---------------- heart reward ---------------- */
var HEART_EVERY=10;
function love(anchor){
  if(!anchor)return;
  var r=anchor.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
  while(fx.children.length>18)fx.removeChild(fx.firstChild);
  var e=document.createElement("div");e.className="cry";e.textContent="\u2764\uFE0F";e.style.left=cx+"px";e.style.top=cy+"px";fx.appendChild(e);
  if(reduce){var a0=e.animate([{opacity:0},{opacity:1},{opacity:0}],{duration:900});a0.onfinish=function(){e.remove()};return}
  var a=e.animate([
    {transform:"translate(-50%,-50%) scale(.2)",opacity:0,filter:"blur(0px)",offset:0},
    {transform:"translate(-50%,-90%) scale(1.15)",opacity:1,filter:"blur(0px)",offset:.2},
    {transform:"translate(-50%,-130%) scale(1.9)",opacity:1,filter:"blur(0px)",offset:.5},
    {transform:"translate(-50%,-220%) scale(4.5)",opacity:.8,filter:"blur(1px)",offset:.8},
    {transform:"translate(-50%,-320%) scale(7)",opacity:0,filter:"blur(7px)",offset:1}
  ],{duration:1800,easing:"cubic-bezier(.22,.7,.3,1)"});
  a.onfinish=function(){e.remove()};
  var H=["\uD83D\uDC96","\uD83D\uDC97","\uD83D\uDC95","\u2764\uFE0F"];
  for(var i=0;i<7;i++){
    var t=document.createElement("div");t.className="drop";t.textContent=H[i%4];t.style.left=cx+"px";t.style.top=cy+"px";fx.appendChild(t);
    var dx=(Math.random()*2-1)*110,up=-(70+Math.random()*90);
    var ta=t.animate([{transform:"translate(-50%,-50%) scale(.4)",opacity:0,offset:0},{transform:"translate("+dx*.6+"px,"+up*.6+"px) scale(1.1)",opacity:1,offset:.4},{transform:"translate("+dx+"px,"+up+"px) scale(.7)",opacity:0,offset:1}],{duration:1300,delay:150+Math.random()*300,easing:"ease-out",fill:"backwards"});
    ta.onfinish=(function(n){return function(){n.remove()}})(t);
  }
}

/* ---------------- finish / controls ---------------- */
function finish(){
  clearInterval(tid);S.mode="done";
  var e=elapsed();if(!isPara())e=Math.min(e,S.dur);var m=e/60000,n=S.correct+S.wrong;
  var acc=n?Math.round(S.correct/n*100):100,wpm=m>0?Math.round(S.correct/5/m):0;
  var stars=acc>=95?3:acc>=85?2:1;
  var prev=save[S.li];if(L().test){save["r"+S.li]={wpm:wpm,acc:acc,err:S.wrong,mins:Math.round(S.dur/600)/100,date:new Date().toLocaleDateString()}}if(isPara())save["t"+S.li+"-"+S.ti]=1;
  if(!prev||stars>prev.stars||(stars===prev.stars&&wpm>prev.wpm))save[S.li]={stars:stars,wpm:wpm,acc:acc};
  persist();renderLessons();renderPrompt();renderKeys();updateSide();
  var para=isPara(),lastT=!para||S.ti===L().topics.length-1,last=S.li===LESSONS.length-1&&lastT;
  var msg=stars===3?"Superb! Fast and accurate.":stars===2?"Good job! A little more accuracy and you will earn three stars.":"Keep practising. Accuracy first, speed will follow.";
  var md=$("#modal");
  md.innerHTML='<div class="card" role="dialog" aria-label="Lesson complete"><h2>'+(last?"Course complete!":para&&!lastT?"Topic complete!":"Lesson complete!")+'</h2>'
    +'<div class="stars" aria-label="'+stars+' of 3 stars"><span>'+(stars>=1?"★":"☆")+'</span><span>'+(stars>=2?"★":"☆")+'</span><span>'+(stars>=3?"★":"☆")+'</span></div>'
    +'<p>'+msg+'</p>'
    +'<div class="cardstats"><div><b>'+wpm+'</b><span>WPM</span></div><div><b>'+acc+'%</b><span>Accuracy</span></div><div><b>'+S.wrong+'</b><span>Errors</span></div><div><b>'+fmt(e)+'</b><span>Time</span></div></div>'
    +'<div class="actions"><button class="btn alt" id="again" type="button">Try again</button><button class="btn" id="goNext" type="button">'+(last?"Back to Lesson 1":para&&!lastT?"Next topic":"Next lesson")+'</button></div></div>';
  if(L().test)md.innerHTML=testCard(wpm,acc,S.wrong,fmt(e));
  md.hidden=false;
  $("#again").addEventListener("click",function(){loadLesson(S.li,true,S.ti)});
  $("#goNext").addEventListener("click",goNext);
  $("#goNext").focus();
  petFinish(acc);
  var pb=$("#pr");if(pb)pb.addEventListener("click",printReport);
  var mn=$("#mName");if(mn)mn.addEventListener("input",function(){save.name=mn.value;$("#stuName").value=mn.value;persist()});
  winSound();
}
function grade(w,a){return w>=50&&a>=95?"A+":w>=40&&a>=92?"A":w>=30&&a>=90?"B":w>=20&&a>=85?"C":"D"}
function testCard(w,a,er,tm){
  return '<div class="card" role="dialog" aria-label="Test result"><h2>'+esc(L().name)+' complete!</h2><p>Grade: <b style="font-size:24px;color:var(--accent)">'+grade(w,a)+'</b></p>'
   +'<input class="nameIn" id="mName" style="width:100%" placeholder="Student name (for the result sheet)" maxlength="40" value="'+esc(save.name||"").replace(/"/g,"&quot;")+'">'
   +'<div class="cardstats"><div><b>'+w+'</b><span>WPM</span></div><div><b>'+a+'%</b><span>Accuracy</span></div><div><b>'+er+'</b><span>Errors</span></div><div><b>'+tm+'</b><span>Time</span></div></div>'
   +'<div class="actions"><button class="btn alt" id="again" type="button">Try again</button><button class="btn alt" id="pr" type="button">Print / PDF</button><button class="btn" id="goNext" type="button">Next</button></div></div>';
}
function printReport(){
  var rows="",n=0;
  LESSONS.forEach(function(l,i){if(!l.test)return;var r=save["r"+i];
    rows+='<tr><td>'+esc(l.name)+'</td>'+(r?'<td>'+esc(r.date)+'</td><td>'+r.mins+' min</td><td>'+r.wpm+'</td><td>'+r.acc+'%</td><td>'+r.err+'</td><td><b>'+grade(r.wpm,r.acc)+'</b></td>':'<td colspan="6">Not attempted</td>')+'</tr>'});
  LESSONS.forEach(function(l,i){if(!l.test&&save[i])n++});
  $("#sheet").innerHTML='<h1>PAFWA SKILLS DEVELOPMENT CENTRE (PSDC), NRK</h1><h2>Typing Test Result Sheet</h2>'
   +'<div class="meta"><span>Student: <b>'+(esc(save.name||"")||"______________________")+'</b></span><span>Date: <b>'+new Date().toLocaleDateString()+'</b></span></div>'
   +'<table><tr><th>Test</th><th>Date</th><th>Duration</th><th>WPM</th><th>Accuracy</th><th>Errors</th><th>Grade</th></tr>'+rows+'</table>'
   +'<p>Lessons completed: <b>'+n+' of '+LESSONS.filter(function(l){return !l.test}).length+'</b></p>'
   +'<div class="foot"><span>Grade: A+ (50 WPM, 95%) / A (40, 92%) / B (30, 90%) / C (20, 85%)</span><span>Developed by Hidayat Khan</span></div>';
  window.print();
}
function nextLesson(){loadLesson((S.li+1)%LESSONS.length)}
function goNext(){if(isPara()&&S.ti<L().topics.length-1)loadLesson(S.li,true,S.ti+1);else nextLesson()}
$("#next").addEventListener("click",function(){nextLesson();refocus()});
$("#restart").addEventListener("click",function(){loadLesson(S.li,true,S.ti)});
$("#pause").addEventListener("click",function(){
  if(S.mode!=="typing")return;
  var n=performance.now();
  if(!S.paused){endIdle(n);S.paused=true;S.pauseAt=n;this.textContent="Resume"}
  else{S.paused=false;S.lastKey=n;if(S.t0)S.pausedTotal+=n-S.pauseAt;this.textContent="Pause";refocus()}
  renderPrompt();renderKeys();
});

/* ---------------- typed credit ---------------- */
var FULL="Developed by Hidayat Khan",NAME="Hidayat Khan",cut=FULL.indexOf(NAME);
function paint(n){var t=FULL.slice(0,n);$("#credPre").textContent=t.slice(0,cut);$("#credNm").textContent=t.slice(cut)}
function sleep(ms){return new Promise(function(r){setTimeout(r,ms)})}
if(reduce){paint(FULL.length)}
else{
  (async function loop(){
    for(;;){
      for(var i=0;i<=FULL.length;i++){paint(i);await sleep(85)}
      await sleep(7000);
      for(var j=FULL.length;j>=0;j--){paint(j);await sleep(35)}
      await sleep(700);
    }
  })();
}

$("#stuName").value=save.name||"";
$("#stuName").addEventListener("input",function(){save.name=this.value;persist()});
$("#rep").addEventListener("click",printReport);
/* ---------------- Mitu the kitten ---------------- */
var PX=[0,200,600,1400,2800],PN=["Tiny Kitten","Kitten","Young Cat","Big Cat","Grown-up Cat"];
var HAPPY=["\uD83D\uDE3B","\uD83D\uDC96","\uD83D\uDE38","\u2728","\uD83C\uDF89","\uD83D\uDC3E","\uD83D\uDC95","\uD83D\uDE3A"],SADE=["\uD83D\uDE3F","\uD83D\uDE2D","\uD83D\uDC94","\uD83E\uDD7A","\uD83D\uDE22","\uD83D\uDE1E","\uD83D\uDCA7"];
var SAY={happy:"Mitu is purring happily!",neutral:"Mitu is watching you type.",sad:"Mitu is sad. Too many mistakes!",cry:"Mitu is crying. Slow down, be careful.",sleep:"Mitu is sleeping. Type to wake her up!"};
var pet=save.pet||(save.pet={xp:0}),mood=75;
function pStage(){for(var i=PX.length-1;i>0;i--)if(pet.xp>=PX[i])return i;return 0}
function pState(){return S&&(S.idle||S.paused)?"sleep":mood<15?"cry":mood<40?"sad":mood<65?"neutral":"happy"}
function petEmoji(list,n,fall){
  var st=$(".pet-stage"),fxp=$("#petfx"),w=st.clientWidth,h=st.clientHeight;
  while(fxp.children.length>14)fxp.removeChild(fxp.firstChild);
  for(var i=0;i<n;i++){
    var e=document.createElement("div");e.className="pe";e.textContent=list[Math.floor(Math.random()*list.length)];
    e.style.left=w*(.2+Math.random()*.6)+"px";e.style.top=h*(.15+Math.random()*.3)+"px";fxp.appendChild(e);
    if(reduce){e.remove();continue}
    var dx=(Math.random()*2-1)*40,sg=fall?1:-1,d=60+Math.random()*40;
    var a=e.animate([{transform:"translate(-50%,0) scale(.3)",opacity:0},{transform:"translate(calc(-50% + "+dx*.5+"px),"+sg*25+"px) scale(1.2)",opacity:1,offset:.3},{transform:"translate(calc(-50% + "+dx+"px),"+sg*d+"px) scale(1.5)",opacity:0}],{duration:1400+Math.random()*600,delay:i*110,easing:"cubic-bezier(.2,.7,.3,1)",fill:"backwards"});
    a.onfinish=(function(n){return function(){n.remove()}})(e);
  }
}
function petRender(){
  var st=pState(),svg=$("#cat"),g=Math.min(1,pet.xp/3000),i=pStage(),nx=PX[i+1];
  if(svg.dataset.m!==st){svg.dataset.m=st;if(st==="happy")petEmoji(HAPPY,4);else if(st==="sad")petEmoji(SADE,4,true);else if(st==="cry")petEmoji(SADE,6,true)}
  $("#catg").style.transform="scale("+(.52+.48*g).toFixed(3)+")";
  svg.style.setProperty("--hs",(1.16-.16*g).toFixed(3));
  $("#petLv").textContent="Lv "+(i+1)+" \u00B7 "+PN[i];
  $("#petXp").style.width=(nx?(pet.xp-PX[i])/(nx-PX[i])*100:100)+"%";
  $("#petSay").textContent=SAY[st];
  var h=Math.round(mood/20);$("#petHearts").textContent="\u2665".repeat(h)+"\u2661".repeat(5-h);
}
function petJump(){if(!reduce)$("#jumpg").animate([{transform:"translateY(0)"},{transform:"translateY(-26px)"},{transform:"translateY(0)"}],{duration:520,easing:"cubic-bezier(.3,.7,.4,1)"})}
function petOk(big){
  var s0=pStage();pet.xp++;mood=Math.min(100,mood+1.6);var s1=pStage();
  if(pet.xp%10===0)persist();
  if(!reduce)$("#headB").animate([{transform:"translateY(0)"},{transform:"translateY(3px) rotate(1.5deg)"},{transform:"translateY(0)"}],{duration:140});
  if(s1>s0){persist();petEmoji(HAPPY,8);petJump();toast("Mitu grew into a "+PN[s1]+"!")}
  else if(big&&pState()==="happy")petEmoji(HAPPY,3);
}
function petBad(){
  mood=Math.max(0,mood-14);petEmoji(SADE,1,true);
  if(!reduce)$("#headB").animate([{transform:"translateX(0)"},{transform:"translateX(-5px) rotate(-4deg)"},{transform:"translateX(5px) rotate(4deg)"},{transform:"translateX(-3px)"},{transform:"translateX(0)"}],{duration:380});
}
function petFinish(a){if(a>=90){petJump();petEmoji(HAPPY,9)}else if(a<70)petEmoji(SADE,5,true)}

/* ---------------- themes + session length ---------------- */
var THEMES=[["light","Light","#ffffff","#4f5ee6"],["pista","Pista","#cfe9b0","#5c9e31"],["pink","Light Pink","#ffd1e3","#e0558f"],["lavender","Lavender","#dccdf8","#8456e6"],["peach","Peach","#ffd9c2","#e07a4f"],["dark","Dark","#1a1f36","#9b8cff"]];
function setTheme(t){
  if(!THEMES.some(function(x){return x[0]===t}))t="light";
  document.documentElement.dataset.theme=t;save.theme=t;persist();
  document.querySelectorAll("#themes .sw").forEach(function(b){b.setAttribute("aria-pressed",b.dataset.t===t)});
}
THEMES.forEach(function(t){
  var b=document.createElement("button");b.type="button";b.className="sw";b.dataset.t=t[0];b.title=t[1]+" theme";b.setAttribute("aria-label",t[1]+" theme");
  b.style.background="linear-gradient(135deg,"+t[2]+" 50%,"+t[3]+" 50%)";
  b.addEventListener("click",function(){setTheme(t[0]);refocus()});
  $("#themes").appendChild(b);
});
setTheme(save.theme||"light");
function setDur(m){
  m=Math.max(1,Math.min(30,m));save.dur=m;persist();$("#dv").textContent=m+" min";
  if(S){S.dur=m*60000;if(S.mode!=="intro")updateSide();else{$("#time").textContent=fmt(S.dur)}}
}
$("#dm").addEventListener("click",function(){setDur((save.dur||5)-1);refocus()});
$("#dp").addEventListener("click",function(){setDur((save.dur||5)+1);refocus()});
loadLesson(0);setDur(save.dur||5);
/* ---------------- Bubble Pop game ---------------- */
(function(){
var gv=$("#gameView"),cv=$("#gCv"),ctx=cv.getContext("2d"),ov=$("#gOv"),ban=$("#gBan");
var W=0,H=0,sc=1,st="idle",raf=0,last=0,active=false,dy=0;
var B=[],P=[],CR=[],BK=[],goods=[];
var time=0,score=0,combo=0,best=+(save.bubbleBest||0),popped=0,keys=0,L=0,Ld=0,good=0,tears=0,spawnT=0,lvl=1,rip=0;
var LET="abcdefghijklmnopqrstuvwxyz",SM=["😊","😄","😍","🥳","😁","🤩","🥰","😆"],HT=["❤️","🧡","💛","💚","💙","💜","🩷","🤎"];
var EF='"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
function rnd(a,b){return a+Math.random()*(b-a)}
function resize(){var r=cv.getBoundingClientRect();if(!r.width)return;var d=Math.min(2,window.devicePixelRatio||1);W=r.width;H=r.height;cv.width=W*d;cv.height=H*d;ctx.setTransform(d,0,0,d,0,0);sc=Math.max(.7,Math.min(1.15,H/560));BK=[];for(var i=0;i<16;i++)BK.push({x:rnd(0,W),y:rnd(0,H),r:rnd(6,26),v:rnd(6,18)})}
function jar(){var w=Math.max(104,Math.min(190,W*.21)),h=Math.min(H*.52,260*sc);return{x:W-w-14,w:w,b:H-14,t:H-14-h,h:h}}
function hud(){$("#gSc").textContent=score;$("#gCo").textContent=combo;$("#gLv").textContent=lvl;$("#gBe").textContent=best;var s=good+tears;$("#gGood").style.width=(s?good/s*100:50)+"%";$("#gTear").style.width=(s?tears/s*100:50)+"%";$("#gGn").textContent=good;$("#gTn").textContent=tears}
function banner(t){ban.textContent=t;ban.classList.remove("show");void ban.offsetWidth;ban.classList.add("show")}
function showOv(t,p,b){ov.innerHTML="<h2>"+t+"</h2><p>"+p+"</p><button type=\"button\" id=\"gBtn\">"+b+"</button>";ov.hidden=false;$("#gBtn").onclick=function(){if(st==="paused")resume();else start();refocus()}}
function kick(){if(!raf){last=performance.now();raf=requestAnimationFrame(loop)}}
function start(){ensureAudio();B=[];P=[];CR=[];goods=[];time=0;score=0;combo=0;popped=0;keys=0;L=0;Ld=0;good=0;tears=0;spawnT=.5;lvl=1;rip=0;st="play";ov.hidden=true;hud();kick()}
function resume(){st="play";ov.hidden=true;last=performance.now()}
function pause(){if(st==="play"){st="paused";showOv("Paused ⏸","Esc dabao ya button click karo.","Resume")}}
function over(){st="over";save.bubbleBest=best;persist();var acc=keys?Math.round(popped/keys*100):0;showOv(good>=tears?"Jar full of tears 😭":"Too many tears 😭","Score <b>"+score+"</b> · Best <b>"+best+"</b><br>😊 "+good+" good pops · 💧 "+tears+" missed · Accuracy "+acc+"%","Play again")}
function spawn(){var used={};B.forEach(function(b){used[b.c]=1});var pool=LET.split("").filter(function(c){return!used[c]});var r=rnd(30,38)*sc,mx=W-jar().w-40-r;if(mx<r+40)mx=W-r-10;B.push({c:pool[Math.random()*pool.length|0],r:r,x0:rnd(r+16,mx),x:0,y:H+r,h:rnd(0,360)|0,ph:rnd(0,6.28),wob:rnd(8,22),sp:rnd(.92,1.08)})}
function fly(k,x,y,e){var J=jar(),tx=J.x+rnd(18,J.w-18),vy=k==="emo"?-rnd(260,380):rnd(0,40),g=1500,d=Math.max(J.t+6-y,30),t=(-vy+Math.sqrt(vy*vy+2*g*d))/g;return{k:k,x:x,y:y,vx:(tx-x)/t,vy:vy,g:g,e:e}}
function burst(b){P.push({k:"ring",x:b.x,y:b.y,r:b.r,h:b.h,t:0,l:.4});for(var i=0;i<12;i++){var a=i/12*6.28;P.push({k:"sp",x:b.x,y:b.y,vx:Math.cos(a)*rnd(90,220),vy:Math.sin(a)*rnd(90,220)-60,h:b.h,t:0,l:.5})}}
function pop(b){B.splice(B.indexOf(b),1);popped++;combo++;score+=10*(1+(combo/5|0));good++;L=Math.max(0,L-.012);
if(combo%10===0){L=Math.max(0,L-.08);banner("💖 "+combo+" streak! Joy dries the tears")}
burst(b);P.push(fly("emo",b.x,b.y,Math.random()<.55?HT[Math.random()*8|0]:SM[Math.random()*8|0]));
tone(rnd(620,760),rnd(1100,1300),.1,"sine",.08,0);tone(1320,1760,.1,"triangle",.04,.06);if(score>best)best=score;hud()}
function miss(b){B.splice(B.indexOf(b),1);combo=0;tears++;L+=.12;CR.push({x:b.x,y:Math.max(b.r+40,70*sc),t:0,e:0,s:64*sc});sadSound();hud();if(L>=1){st="dying";dy=2}}
window.bubbleKey=function(k){
if(k==="Escape"){if(st==="play")pause();else if(st==="paused"){resume();}return}
if(st==="dying")return;
if(st!=="play"){if(k==="Enter"||k===" "){if(st==="paused")resume();else start()}return}
if(k.length!==1)return;var c=k.toLowerCase();if(c<"a"||c>"z")return;keys++;
var t=null;B.forEach(function(b){if(b.c===c&&(!t||b.y<t.y))t=b});
if(t)pop(t);else{combo=0;tone(180,120,.12,"square",.04,0);hud()}};
function update(dt){
BK.forEach(function(o){o.y-=o.v*dt;if(o.y<-30){o.y=H+30;o.x=rnd(0,W)}});
Ld+=(L-Ld)*Math.min(1,dt*3);rip*=Math.exp(-3*dt);
if(st!=="play"&&st!=="dying")return;
var J=jar(),i;
if(st==="play"){time+=dt;var v=Math.min((48+2.7*time)*sc,270*sc),nl=1+(time/18|0);
if(nl>lvl){lvl=nl;banner("Level "+lvl+" – faster! ⚡");hud()}
spawnT-=dt;if(spawnT<=0){spawn();spawnT=1.5*Math.exp(-time/60)+.38}
for(i=B.length-1;i>=0;i--){var b=B[i];b.y-=v*b.sp*dt;b.x=b.x0+Math.sin(time*1.6+b.ph)*b.wob;if(b.y<=b.r+2&&st==="play")miss(b)}}
else{dy-=dt;if(dy<=0)over()}
for(i=CR.length-1;i>=0;i--){var c=CR[i];c.t+=dt;c.e+=dt;if(c.t<1.1&&c.e>.045){c.e=0;[-1,1].forEach(function(s){P.push(fly("drop",c.x+s*c.s*.2,c.y+c.s*.12,0))})}if(c.t>1.9)CR.splice(i,1)}
for(i=P.length-1;i>=0;i--){var p=P[i];
if(p.k==="ring"||p.k==="sp"){p.t+=dt;if(p.k==="sp"){p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=500*dt}if(p.t>p.l)P.splice(i,1);continue}
p.vy+=p.g*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;
if(p.vy>0&&p.y>=J.t+6){if(p.k==="emo"){goods.push(p.e);if(goods.length>60)goods.shift();rip+=.9;tone(500,700,.07,"sine",.03,0)}else{rip+=.2;if(Math.random()<.2)tone(700+rnd(0,200),300,.05,"sine",.015,0)}P.splice(i,1)}}}
function drawB(b){var r=b.r,h=b.h;ctx.save();ctx.translate(b.x,b.y);
var g=ctx.createRadialGradient(-r*.35,-r*.4,r*.1,0,0,r);g.addColorStop(0,"hsla("+h+",95%,95%,.5)");g.addColorStop(.75,"hsla("+h+",90%,65%,.28)");g.addColorStop(1,"hsla("+h+",95%,72%,.7)");
ctx.beginPath();ctx.arc(0,0,r,0,6.2832);ctx.fillStyle=g;ctx.fill();ctx.lineWidth=2;ctx.strokeStyle="hsla("+h+",100%,88%,.85)";ctx.stroke();
ctx.fillStyle="rgba(255,255,255,.75)";ctx.beginPath();ctx.ellipse(-r*.38,-r*.45,r*.22,r*.12,-.7,0,6.2832);ctx.fill();
ctx.fillStyle="#fff";ctx.shadowColor="hsla("+h+",100%,50%,.9)";ctx.shadowBlur=10;ctx.font="800 "+(r*1.05|0)+"px Tahoma,sans-serif";ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText(b.c.toUpperCase(),0,2);ctx.restore()}
function drawJar(J){var tm=performance.now()/1000,s=J.b-Ld*(J.h-14),x,i;
ctx.save();ctx.beginPath();ctx.moveTo(J.x+10,J.t);ctx.lineTo(J.x+J.w-10,J.t);ctx.lineTo(J.x+J.w-10,J.t+12);ctx.quadraticCurveTo(J.x+J.w,J.t+16,J.x+J.w,J.t+34);ctx.lineTo(J.x+J.w,J.b-22);ctx.quadraticCurveTo(J.x+J.w,J.b,J.x+J.w-22,J.b);ctx.lineTo(J.x+22,J.b);ctx.quadraticCurveTo(J.x,J.b,J.x,J.b-22);ctx.lineTo(J.x,J.t+34);ctx.quadraticCurveTo(J.x,J.t+16,J.x+10,J.t+12);ctx.closePath();
ctx.fillStyle="rgba(255,255,255,.07)";ctx.fill();var path=true;ctx.save();ctx.clip();
if(Ld>.003){var g=ctx.createLinearGradient(0,s,0,J.b);g.addColorStop(0,"rgba(110,205,255,.9)");g.addColorStop(1,"rgba(25,95,210,.95)");ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(J.x,J.b);for(x=0;x<=J.w;x+=6)ctx.lineTo(J.x+x,s+Math.sin(x*.07+tm*2.2)*(2+rip*4));ctx.lineTo(J.x+J.w,J.b);ctx.closePath();ctx.fill()}
var cols=Math.max(3,(J.w-20)/28|0),cs=(J.w-20)/cols,rows=Math.floor((s-J.t-16)/(cs*.92)),vis=rows>0?goods.slice(-rows*cols):[];
ctx.font=(cs*.8|0)+"px "+EF;ctx.textAlign="center";ctx.textBaseline="middle";
vis.forEach(function(e,j){ctx.fillText(e,J.x+10+((j%cols)+.5)*cs,s-cs*.55-(j/cols|0)*cs*.92+Math.sin(tm*2+j)*2)});
ctx.restore();
ctx.setLineDash([6,5]);ctx.strokeStyle="rgba(255,100,120,.8)";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(J.x+4,J.t+16);ctx.lineTo(J.x+J.w-4,J.t+16);ctx.stroke();ctx.setLineDash([]);
ctx.strokeStyle="rgba(255,255,255,.6)";ctx.lineWidth=3;ctx.stroke();
ctx.fillStyle="rgba(255,255,255,.16)";ctx.fillRect(J.x+10,J.t+40,6,J.h-80);ctx.restore()}
function draw(){ctx.clearRect(0,0,W,H);ctx.fillStyle="rgba(255,255,255,.05)";BK.forEach(function(o){ctx.beginPath();ctx.arc(o.x,o.y,o.r,0,6.2832);ctx.fill()});
B.forEach(drawB);var J=jar();drawJar(J);
P.forEach(function(p){if(p.k==="ring"){ctx.strokeStyle="hsla("+p.h+",90%,82%,"+(1-p.t/p.l)+")";ctx.lineWidth=3;ctx.beginPath();ctx.arc(p.x,p.y,p.r*(1+p.t*1.4),0,6.2832);ctx.stroke()}
else if(p.k==="sp"){ctx.fillStyle="hsla("+p.h+",95%,78%,"+(1-p.t/p.l)+")";ctx.beginPath();ctx.arc(p.x,p.y,4,0,6.2832);ctx.fill()}
else if(p.k==="emo"){ctx.font=(28*sc|0)+"px "+EF;ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText(p.e,p.x,p.y)}
else{ctx.fillStyle="#7fd6ff";ctx.beginPath();ctx.moveTo(p.x,p.y-8);ctx.bezierCurveTo(p.x+6,p.y,p.x+5,p.y+6,p.x,p.y+6);ctx.bezierCurveTo(p.x-5,p.y+6,p.x-6,p.y,p.x,p.y-8);ctx.fill()}});
CR.forEach(function(c){var k=Math.min(1,c.t/.25),a=c.t>1.4?Math.max(0,1-(c.t-1.4)/.5):1;ctx.save();ctx.globalAlpha=a;ctx.translate(c.x,c.y);ctx.rotate(Math.sin(c.t*28)*.07);ctx.font=(c.s*(.5+.5*k)|0)+"px "+EF;ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText("😭",0,0);ctx.restore()})}
function loop(n){raf=0;if(!active)return;var dt=Math.min(.05,(n-last)/1000||0);last=n;update(dt);draw();raf=requestAnimationFrame(loop)}
window.bubbleCtl={enter:function(){active=true;resize();kick()},leave:function(){active=false;pause()}};
window.addEventListener("resize",resize);
showOv("🫧 Bubble Pop Typing","Bubble ke andar jo letter hai wo type karo. Pehle slow, phir tez! Miss hone wale bubbles Mitu ko rula dete hain 😭 aur tears jar me bharte hain — jar ko 😊❤️ se jeetao!","Start Game");hud()
})();
/* ---------------- Sky Shooter (typing shooter) ---------------- */
(function(){
var sv=$("#shootView"),cv=$("#sCv"),ctx=cv.getContext("2d"),ov=$("#sOv"),ban=$("#sBan");
var W=0,H=0,sc=1,st="idle",raf=0,last=0,active=false,dpr=1;
var mode=save.shootMode==="words"?"words":"letters",best=+(save.shootBest||0);
var B=[],BU=[],PT=[],RG=[],FT=[],STAR=[],NEB=[],SS=[],LIGHTS=[];
var time=0,score=0,combo=0,maxCombo=0,lives=3,lvl=1,popped=0,keys=0,hits=0,spawnT=0,shake=0,flash=0,flashC="255,70,90",freeze=0,dying=0,shield=0,lockB=null,sideF=1,uT=0;
var ship={x:0,y:0,ang:0,angT:0,rec:0,tx:0,idle:0,vis:true};
var ufo={x:0,y:0,lit:0};
var bgG=null,vgG=null,sfG=null;
var LET="abcdefghijklmnopqrstuvwxyz";
var WORDS=Array.from(new Set(("type,fast,keys,home,code,data,file,mouse,click,print,paste,copy,save,word,excel,power,point,email,link,icon,menu,folder,window,laptop,monitor,keyboard,printer,scanner,network,internet,browser,google,python,program,system,memory,server,cloud,mobile,design,student,course,skills,center,practice,speed,accuracy,shooter,galaxy,rocket,planet,laser,orbit,comet,cosmos,typing,master,future,digital,pixel,cursor,button,search,upload,download,update,backup,delete,format,margin,column,sheet,slide,theme,table,chart,image,video,audio,screen,drive,share,login,virus,cable,robot,photo,music,zoom,quick,jump,fix,yes,hello,keen,nova,wifi,gamer,xerox").split(",").concat((window.PSDC_CONTENT&&window.PSDC_CONTENT.games)||[])));
var HUES=[185,205,265,290,320,150,225];
var EFONT='"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
var KIND={gold:{h:46,e:"⭐"},bomb:{h:2,e:"💣"},ice:{h:192,e:"❄️"},heart:{h:340,e:"❤️"}};
function rnd(a,b){return a+Math.random()*(b-a)}
function clamp(v,a,b){return v<a?a:v>b?b:v}
function bY(){return ship.y-30*sc}

/* ---------- sound ---------- */
function boom(v,dur){if(!ac||!soundOn)return;var n=Math.floor(ac.sampleRate*dur),buf=ac.createBuffer(1,n,ac.sampleRate),d=buf.getChannelData(0),i;for(i=0;i<n;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/n,2);
var s=ac.createBufferSource(),f=ac.createBiquadFilter(),g=ac.createGain();f.type="lowpass";f.frequency.value=1100;g.gain.value=v;s.buffer=buf;s.connect(f);f.connect(g);g.connect(ac.destination);s.start()}
function laser(){tone(1700,380,.11,"sawtooth",.035,0);tone(2400,900,.06,"square",.012,0)}
function popSnd(m){tone(520+m*40,980+m*60,.12,"sine",.08,0);tone(1500,2100,.09,"triangle",.035,.05)}

/* ---------- setup ---------- */
function resize(){
 var r=cv.getBoundingClientRect();if(!r.width)return;
 dpr=Math.min(2,window.devicePixelRatio||1);W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
 sc=Math.max(.62,Math.min(1.2,Math.min(H/600,W/760+.15)));
 ship.y=H-80*sc;ship.x=ship.tx=W/2;
 var i,n=Math.round(W*H/5200);STAR=[];for(i=0;i<n;i++){var rr=rnd(.4,1.9);STAR.push({x:rnd(0,W),y:rnd(0,H),r:rr,v:rr*13+3,tw:rnd(0,6.28)})}
 NEB=[];for(i=0;i<6;i++)NEB.push({x:rnd(0,W),y:rnd(-H*.2,H),r:rnd(.22,.4)*Math.max(W,H*.8),h:[250,280,320,200,230,300][i],v:rnd(4,9)});
 bgG=ctx.createLinearGradient(0,0,0,H);bgG.addColorStop(0,"#070421");bgG.addColorStop(.55,"#150c4d");bgG.addColorStop(1,"#2a1166");
 vgG=ctx.createRadialGradient(W/2,H/2,Math.min(W,H)*.35,W/2,H/2,Math.max(W,H)*.8);vgG.addColorStop(0,"rgba(0,0,0,0)");vgG.addColorStop(1,"rgba(2,0,20,.6)");
 var top=H-34*sc;sfG=ctx.createLinearGradient(0,top,0,H);sfG.addColorStop(0,"#222a78");sfG.addColorStop(1,"#05061a");
 LIGHTS=[];var R=W*1.2,cy=top+R;for(i=0;i<46;i++){var x=rnd(0,W),dx=x-W/2,y=cy-Math.sqrt(Math.max(0,R*R-dx*dx))+rnd(5,30*sc);if(y<H-2)LIGHTS.push({x:x,y:y,h:[45,190,320][i%3],tw:rnd(0,6.28)})}
}
function hud(){
 $("#sSc").textContent=score;$("#sCo").textContent=combo;$("#sLv").textContent=lvl;$("#sBe").textContent=best;
 $("#sLi").textContent=lives>0?"❤️".repeat(lives):"💔";$("#sAc").textContent=(keys?Math.round(hits/keys*100):100)+"%";
}
function banner(t){ban.textContent=t;ban.classList.remove("show");void ban.offsetWidth;ban.classList.add("show")}
function showOv(html){
 ov.innerHTML=html;ov.hidden=false;
 ov.querySelectorAll("[data-m]").forEach(function(b){b.classList.toggle("on",b.dataset.m===mode);b.onclick=function(){mode=b.dataset.m;save.shootMode=mode;persist();ov.querySelectorAll("[data-m]").forEach(function(x){x.classList.toggle("on",x===b)});refocus()}});
 var go=$("#sBtn");if(go)go.onclick=function(){if(st==="paused")resume();else start();refocus()};
}
function modeBtns(){return '<div class="smodes"><button type="button" data-m="letters">🔤 Letters</button><button type="button" data-m="words">📝 Words</button></div>'}
function showIdle(){showOv('<div class="sbadge">TYPING SHOOTER</div><h2>🚀 Sky Shooter</h2><p>UFO se letters ke bubbles gir rahe hain! Jo letter ya word dikhe usay type karo &mdash; aap ka jahaz laser se bubble phor dega. Bubble zameen tak pohnch gaya to 1 life gayi.</p>'+modeBtns()+'<div class="shint"><span>⭐ Gold = 5× score</span><span>💣 Bomb = sab ura do</span><span>❄️ Freeze = slow</span><span>❤️ Extra life</span></div><button type="button" id="sBtn">Start Mission</button><small>Enter / Space = start · Esc = pause</small>')}

/* ---------- game flow ---------- */
function start(){
 ensureAudio();B=[];BU=[];PT=[];RG=[];FT=[];SS=[];lockB=null;
 time=0;score=0;combo=0;maxCombo=0;lives=3;lvl=1;popped=0;keys=0;hits=0;spawnT=.6;shake=0;flash=0;freeze=0;dying=0;shield=0;uT=0;
 ship.vis=true;ship.ang=ship.angT=0;ship.x=ship.tx=W/2;ship.rec=0;st="play";ov.hidden=true;hud();banner("🚀 Mission start!");kick();
}
function pause(){if(st==="play"){st="paused";showOv('<h2>Paused ⏸</h2><p>Esc dabao ya button click karo.</p><button type="button" id="sBtn">Resume</button>')}}
function resume(){st="play";ov.hidden=true;last=performance.now()}
function over(){
 st="over";var nb=score>0&&score>=best&&score>(+save.shootBest||0);
 if(score>(+save.shootBest||0)){save.shootBest=score;persist()}best=Math.max(best,score);hud();
 var wpm=time>3?Math.round(hits/5/(time/60)):0,acc=keys?Math.round(hits/keys*100):0;
 showOv('<h2>'+(nb?"🏆 New High Score!":"💥 Mission Over")+'</h2><div class="sstats"><div><b>'+score+'</b><span>Score</span></div><div><b>'+best+'</b><span>Best</span></div><div><b>'+wpm+'</b><span>WPM</span></div><div><b>'+acc+'%</b><span>Accuracy</span></div><div><b>'+maxCombo+'</b><span>Max combo</span></div><div><b>'+lvl+'</b><span>Level</span></div></div>'+modeBtns()+'<button type="button" id="sBtn">Play again</button><small>Enter / Space = play again</small>');
}

/* ---------- spawning ---------- */
function spawn(){
 var used={},txt,r,w,i;B.forEach(function(b){used[b.t[0]]=1});
 if(mode==="letters"){var pool=LET.split("").filter(function(c){return!used[c]});if(!pool.length)return false;txt=pool[Math.random()*pool.length|0];r=rnd(27,33)*sc;w=2*r}
 else{var mx=Math.min(9,3+lvl),pw=WORDS.filter(function(x){return x.length<=mx&&!used[x[0]]});if(!pw.length)return false;txt=pw[Math.random()*pw.length|0];r=24*sc;ctx.font="800 "+(20*sc|0)+"px Tahoma,sans-serif";w=Math.max(2*r,ctx.measureText(txt.toUpperCase()).width+r*1.2)}
 var x=clamp(ufo.x,w/2+12,W-w/2-12);
 for(i=0;i<B.length;i++)if(B[i].y<ufo.y+150*sc&&Math.abs(B[i].x0-x)<(B[i].w+w)/2+12)return false;
 var k="n";if(lvl>=2&&Math.random()<.1){var q=Math.random();k=q<.4?"gold":q<.6?"bomb":q<.8?"ice":(lives<4?"heart":"gold")}
 B.push({t:txt,p:0,r:r,w:w,x0:x,x:x,y:ufo.y+14*sc,h:k==="n"?HUES[Math.random()*HUES.length|0]:KIND[k].h,ph:rnd(0,6.28),wob:(mode==="letters"?rnd(8,20):rnd(3,8))*sc,sp:rnd(.9,1.1),k:k,pend:0,born:0,flash:0});
 ufo.lit=1;return true;
}

/* ---------- effects ---------- */
function sparks(x,y,h,n,spd){for(var i=0;i<n;i++){var a=rnd(0,6.2832),s=rnd(.3,1)*spd;PT.push({k:"spark",x:x,y:y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,l:rnd(.3,.6),t:0,h:h+rnd(-20,20),dr:2.2})}if(PT.length>650)PT.splice(0,PT.length-650)}
function burst(b){
 RG.push({x:b.x,y:b.y,r:b.r*.5,max:b.r*2.8,t:0,l:.45,h:b.h,w:4});RG.push({x:b.x,y:b.y,r:b.r*.3,max:b.r*1.7,t:0,l:.3,h:b.h+35,w:2});
 sparks(b.x,b.y,b.h,18,330);
 for(var i=0;i<10;i++)PT.push({k:"shard",x:b.x+rnd(-b.w/2,b.w/2)*.6,y:b.y+rnd(-b.r,b.r)*.6,vx:rnd(-170,170),vy:rnd(-220,60),g:520,l:rnd(.6,1),t:0,h:b.h,s:rnd(2.5,7)});
}
function explodeShip(){
 var x=ship.x,y=ship.y;boom(.7,1.1);shake=24;flash=1;flashC="255,180,90";
 RG.push({x:x,y:y,r:10,max:200*sc,t:0,l:.9,h:30,w:9});RG.push({x:x,y:y,r:6,max:120*sc,t:0,l:.6,h:55,w:5});
 sparks(x,y,40,60,520);sparks(x,y,200,30,380);
 for(var i=0;i<26;i++)PT.push({k:"shard",x:x,y:y,vx:rnd(-340,340),vy:rnd(-420,60),g:600,l:rnd(.8,1.5),t:0,h:rnd(190,260),s:rnd(3,9)});
 B.slice().forEach(function(b){burst(b)});B=[];lockB=null;
}
function bomb(b){
 RG.push({x:b.x,y:b.y,r:10,max:Math.max(W,H),t:0,l:.8,h:20,w:12});shake=Math.max(shake,20);flash=.9;flashC="255,200,120";boom(.55,.7);banner("💥 BOOM! Screen clear");
 B.slice().forEach(function(o){popB(o,true)});
}
function popB(b,chain){
 var ix=B.indexOf(b);if(ix<0)return;B.splice(ix,1);if(lockB===b)lockB=null;
 popped++;var mult=1+Math.min(4,combo/8|0);
 var pts=((mode==="letters"?10:b.t.length*6)*mult*(b.k==="gold"?5:1)*(chain?.5:1))|0;
 score+=pts;if(score>best)best=score;
 burst(b);
 FT.push({x:b.x,y:b.y-b.r,txt:"+"+pts,t:0,l:1,c:b.k==="gold"?"#ffd54a":"#ffffff",s:(18+Math.min(14,mult*3))*sc,k:"rise"});
 FT.push({x:b.x,y:b.y,txt:b.t.toUpperCase(),t:0,l:.5,c:"hsl("+b.h+",100%,85%)",s:b.r*1.05,k:"ghost"});
 if(!chain){popSnd(mult);boom(.12,.25)}
 if(b.k==="gold"){sparks(b.x,b.y,48,26,420);FT.push({x:b.x,y:b.y+b.r+10,txt:"★ GOLD ×5",t:0,l:1.1,c:"#ffd54a",s:16*sc,k:"rise"})}
 else if(b.k==="ice"){freeze=4.5;banner("❄️ FREEZE! Time slows");flash=.5;flashC="140,210,255";for(var i=0;i<26;i++)PT.push({k:"snow",x:rnd(0,W),y:rnd(-20,H*.4),vx:rnd(-20,20),vy:rnd(40,120),l:rnd(1.4,2.6),t:0,s:rnd(2,5),h:200})}
 else if(b.k==="heart"){if(lives<5)lives++;banner("❤️ +1 Life");sparks(b.x,b.y,340,22,300);flash=.4;flashC="255,120,170"}
 else if(b.k==="bomb"&&!chain)bomb(b);
 var nl=1+(popped/(mode==="letters"?12:8)|0);if(nl>lvl){lvl=nl;banner("LEVEL "+lvl+" — faster! ⚡");RG.push({x:W/2,y:H,r:20,max:Math.max(W,H),t:0,l:.9,h:270,w:6});tone(500,1500,.35,"triangle",.07,0)}
 if(!chain&&(combo===10||combo===25||combo===50||combo===100)){banner(combo===10?"🔥 10 COMBO!":combo===25?"⚡ 25 — UNSTOPPABLE!":combo===50?"🚀 50 — LEGENDARY!":"👑 100 — GOD MODE!");tone(700,1800,.3,"sawtooth",.04,0)}
 hud();
}
function breach(b){
 var i=B.indexOf(b);B.splice(i,1);if(lockB===b)lockB=null;
 lives--;combo=0;shield=1;shake=16;flash=.85;flashC="255,60,80";burst(b);boom(.4,.6);sadSound();
 FT.push({x:b.x,y:bY()-10,txt:"💔 −1 life",t:0,l:1.2,c:"#ff7a8a",s:20*sc,k:"rise"});
 hud();if(lives<=0){st="dying";dying=1.7;ship.vis=false;explodeShip()}
}
function hitB(u){
 var b=u.t;
 if(b&&B.indexOf(b)>-1){if(u.fin)popB(b,false);else{b.flash=.2;sparks(b.x,b.y,b.h,8,170);tone(900,1500,.05,"triangle",.04,0)}}
 else sparks(u.x,u.y,200,5,120);
}
function fire(b,fin){
 sideF=-sideF;
 var aim=clamp(Math.atan2(b.x-ship.x,ship.y-b.y),-.9,.9);ship.angT=aim;ship.ang+=(aim-ship.ang)*.65;
 var cs=Math.cos(ship.ang),sn=Math.sin(ship.ang),lx=sideF*14*sc,ly=-27*sc,ox=ship.x+lx*cs-ly*sn,oy=ship.y+lx*sn+ly*cs;
 BU.push({x:ox,y:oy,t:b,fin:fin,tx:b.x,ty:b.y,tr:[]});
 sparks(ox,oy,185,5,150);RG.push({x:ox,y:oy,r:3,max:16*sc,t:0,l:.18,h:185,w:2});
 ship.rec=1;ship.tx=clamp(b.x,40*sc,W-40*sc);ship.idle=0;if(fin)b.pend=1;laser();
}
function missShot(){
 sideF=-sideF;var cs=Math.cos(ship.ang),sn=Math.sin(ship.ang),lx=sideF*14*sc,ly=-27*sc,ox=ship.x+lx*cs-ly*sn,oy=ship.y+lx*sn+ly*cs;
 BU.push({x:ox,y:oy,t:null,fin:false,tx:ox+rnd(-50,50),ty:oy-rnd(160,260)*sc,tr:[],dud:1});ship.rec=.6;
 sparks(ox,oy,0,4,120);tone(200,110,.12,"square",.04,0);
}

/* ---------- input ---------- */
function key(k){
 if(k==="Escape"){if(st==="play")pause();else if(st==="paused")resume();return}
 if(st==="dying")return;
 if(st!=="play"){if(k==="Enter"||k===" "){if(st==="paused")resume();else start()}return}
 if(k.length!==1)return;var c=k.toLowerCase();if(c<"a"||c>"z")return;
 keys++;var t=null,i,b;
 if(mode==="words"&&lockB){
  if(lockB.t[lockB.p]===c){
   hits++;combo++;maxCombo=Math.max(maxCombo,combo);lockB.p++;score+=2*(1+Math.min(4,combo/8|0));
   var fin=lockB.p>=lockB.t.length,tb=lockB;if(fin)lockB=null;fire(tb,fin);
  }else{combo=0;shake=Math.max(shake,5);lockB.flash=.15;sadSound();missShot()}
  hud();return;
 }
 for(i=0;i<B.length;i++){b=B[i];if(b.pend)continue;if(b.t[0]===c&&(!t||b.y>t.y))t=b}
 if(!t){combo=0;missShot();hud();return}
 hits++;combo++;maxCombo=Math.max(maxCombo,combo);
 if(mode==="letters"){fire(t,true)}
 else{t.p=1;lockB=t;score+=2;fire(t,false)}
 hud();
}
window.shootKey=key;

/* ---------- update ---------- */
function update(dt){
 var i,v;
 for(i=0;i<STAR.length;i++){var s=STAR[i];s.y+=s.v*dt*(1+(lvl-1)*.07)*(freeze>0?.35:1);if(s.y>H+2){s.y=-3;s.x=rnd(0,W)}}
 for(i=0;i<NEB.length;i++){var n=NEB[i];n.y+=n.v*dt;if(n.y-n.r>H){n.y=-n.r;n.x=rnd(0,W)}}
 if(Math.random()<dt*.3)SS.push({x:rnd(W*.2,W),y:rnd(0,H*.35),vx:-rnd(500,800),vy:rnd(200,380),t:0,l:.7});
 for(i=SS.length-1;i>=0;i--){var q=SS[i];q.t+=dt;q.x+=q.vx*dt;q.y+=q.vy*dt;if(q.t>q.l)SS.splice(i,1)}
 shake*=Math.exp(-6*dt);flash*=Math.exp(-4*dt);shield*=Math.exp(-2.6*dt);ufo.lit*=Math.exp(-4*dt);ship.rec*=Math.exp(-12*dt);
 uT+=dt*(freeze>0?.35:1);ufo.x=W/2+Math.sin(uT*.55)*W*.36+Math.sin(uT*1.4)*W*.05;ufo.y=46*sc+Math.sin(uT*2.1)*4;
 /* ship */
 ship.idle+=dt;if(ship.idle>2)ship.tx=W/2;
 ship.x+=(ship.tx-ship.x)*Math.min(1,dt*10);ship.angT*=Math.exp(-2.2*dt);ship.ang+=(ship.angT-ship.ang)*Math.min(1,dt*14);
 if(st==="play"){
  time+=dt;if(freeze>0)freeze-=dt;
  v=(mode==="letters"?Math.min(170,38+(lvl-1)*8):Math.min(130,30+(lvl-1)*6))*sc*(freeze>0?.3:1);
  spawnT-=dt*(freeze>0?.4:1);
  if(spawnT<=0){spawnT=spawn()?Math.max(.55,(mode==="letters"?1.9:2.6)-lvl*.13)+rnd(0,.4):.2}
  for(i=B.length-1;i>=0;i--){var b=B[i];b.born+=dt;b.flash=Math.max(0,b.flash-dt);b.y+=v*b.sp*dt;b.x=clamp(b.x0+Math.sin(time*1.6+b.ph)*b.wob,b.w/2+4,W-b.w/2-4);if(!b.pend&&b.y+b.r>=bY())breach(b)}
 }else if(st==="dying"){dying-=dt;if(dying<=0)over()}
 for(i=BU.length-1;i>=0;i--){
  var u=BU[i];if(u.t&&B.indexOf(u.t)>-1){u.tx=u.t.x;u.ty=u.t.y}
  var dx=u.tx-u.x,dy=u.ty-u.y,d=Math.hypot(dx,dy),step=1900*sc*dt;
  u.tr.push(u.x,u.y);if(u.tr.length>14)u.tr.splice(0,2);
  if(d<=step||d<4){hitB(u);BU.splice(i,1)}else{u.x+=dx/d*step;u.y+=dy/d*step}
 }
 for(i=PT.length-1;i>=0;i--){var p=PT[i];p.t+=dt;if(p.t>=p.l){PT.splice(i,1);continue}p.x+=p.vx*dt;p.y+=p.vy*dt;if(p.g)p.vy+=p.g*dt;if(p.dr){var f=Math.exp(-p.dr*dt);p.vx*=f;p.vy*=f}}
 for(i=RG.length-1;i>=0;i--){RG[i].t+=dt;if(RG[i].t>=RG[i].l)RG.splice(i,1)}
 for(i=FT.length-1;i>=0;i--){FT[i].t+=dt;if(FT[i].t>=FT[i].l)FT.splice(i,1)}
 /* exhaust */
 if(ship.vis&&st==="play"&&Math.random()<.6)PT.push({k:"spark",x:ship.x+rnd(-4,4)*sc,y:ship.y+24*sc,vx:rnd(-20,20),vy:rnd(120,220),l:.3,t:0,h:195,dr:1});
}

/* ---------- drawing ---------- */
function capP(w,h){var r=h/2,x=-w/2,y=-h/2;ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.arc(x+w-r,0,r,-1.5708,1.5708);ctx.lineTo(x+r,y+h);ctx.arc(x+r,0,r,1.5708,4.7124);ctx.closePath()}
function drawBubble(b,tm){
 var h=b.h,r=b.r,k=Math.min(1,b.born/.3),e=1+2.2*Math.pow(k-1,3)+1.2*Math.pow(k-1,2),s=k<1?e:1,words=mode==="words",sat=b.k==="bomb"?"70%":"95%";
 ctx.save();ctx.translate(b.x,b.y);ctx.scale(s,s);
 ctx.shadowColor="hsla("+h+",100%,60%,.85)";ctx.shadowBlur=20;
 var g=ctx.createRadialGradient(-r*.35,-r*.4,r*.1,0,0,Math.max(r,b.w/2));
 g.addColorStop(0,"hsla("+h+","+sat+",92%,.55)");g.addColorStop(.7,"hsla("+h+","+sat+",58%,.32)");g.addColorStop(1,"hsla("+h+","+sat+",70%,.78)");
 capP(b.w,2*r);ctx.fillStyle=g;ctx.fill();ctx.shadowBlur=0;
 ctx.lineWidth=b.k==="gold"?3.5:2.2;ctx.strokeStyle="hsla("+h+",100%,"+(b.k==="gold"?"72%":"88%")+",.95)";ctx.stroke();
 if(b.flash>0){ctx.fillStyle="rgba(255,255,255,"+Math.min(.8,b.flash*4)+")";ctx.fill()}
 ctx.fillStyle="rgba(255,255,255,.7)";ctx.beginPath();ctx.ellipse(-b.w/2+r*.75,-r*.5,r*.24,r*.12,-.6,0,6.2832);ctx.fill();
 ctx.textBaseline="middle";ctx.shadowColor="hsla("+h+",100%,45%,.95)";ctx.shadowBlur=9;
 if(!words){ctx.font="800 "+(r*1.08|0)+"px Tahoma,sans-serif";ctx.textAlign="center";ctx.fillStyle="#fff";ctx.fillText(b.t.toUpperCase(),0,2*sc)}
 else{
  ctx.font="800 "+(20*sc|0)+"px Tahoma,sans-serif";ctx.textAlign="left";var T=b.t.toUpperCase(),tw=ctx.measureText(T).width,pw=ctx.measureText(T.slice(0,b.p)).width;
  ctx.fillStyle="#7dffa0";ctx.fillText(T.slice(0,b.p),-tw/2,2*sc);ctx.fillStyle="#fff";ctx.fillText(T.slice(b.p),-tw/2+pw,2*sc);
 }
 ctx.shadowBlur=0;
 if(b.k!=="n"){ctx.font=(r*.8|0)+"px "+EFONT;ctx.textAlign="center";ctx.fillText(KIND[b.k].e,words?b.w/2-r*.45:r*.72,-r*.78)}
 if(b===lockB){
  ctx.save();ctx.rotate(tm*1.8);ctx.setLineDash([8,7]);ctx.lineWidth=2.4;ctx.strokeStyle="rgba(125,255,160,.95)";ctx.shadowColor="#7dffa0";ctx.shadowBlur=12;
  capP(b.w+16,2*r+16);ctx.restore();
 }
 ctx.restore();
}
function drawUfo(tm){
 ctx.save();ctx.translate(ufo.x,ufo.y);ctx.scale(sc,sc);
 if(ufo.lit>.02){var bg=ctx.createLinearGradient(0,8,0,90);bg.addColorStop(0,"rgba(120,255,200,"+ufo.lit*.4+")");bg.addColorStop(1,"rgba(120,255,200,0)");ctx.fillStyle=bg;ctx.beginPath();ctx.moveTo(-18,8);ctx.lineTo(18,8);ctx.lineTo(34,90);ctx.lineTo(-34,90);ctx.closePath();ctx.fill()}
 ctx.shadowColor="rgba(160,120,255,.9)";ctx.shadowBlur=24;
 var g=ctx.createLinearGradient(0,-8,0,14);g.addColorStop(0,"#d5dcff");g.addColorStop(.5,"#7f89e8");g.addColorStop(1,"#2d3290");
 ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(0,2,48,13,0,0,6.2832);ctx.fill();ctx.shadowBlur=0;
 ctx.fillStyle="rgba(150,235,255,.6)";ctx.beginPath();ctx.ellipse(0,-5,20,16,0,Math.PI,0);ctx.fill();
 ctx.strokeStyle="rgba(255,255,255,.6)";ctx.lineWidth=1.2;ctx.stroke();
 for(var i=-3;i<=3;i++){var on=((Math.floor(tm*5)+i)%2+2)%2;ctx.fillStyle=on?"#ffe27a":"#ff6fb1";ctx.shadowColor=ctx.fillStyle;ctx.shadowBlur=8;ctx.beginPath();ctx.arc(i*13,4+Math.abs(i)*-.6,2.6,0,6.2832);ctx.fill()}
 ctx.restore();
}
function drawShip(tm){
 if(!ship.vis)return;var th=Math.min(1,Math.abs(ship.tx-ship.x)/90),fl=16+Math.sin(tm*55)*4+th*14,g;
 ctx.save();ctx.translate(ship.x,ship.y+ship.rec*5*sc);ctx.rotate(ship.ang);ctx.scale(sc,sc);
 ctx.globalCompositeOperation="lighter";
 g=ctx.createRadialGradient(0,26,2,0,26,60);g.addColorStop(0,"rgba(90,200,255,.5)");g.addColorStop(1,"rgba(90,200,255,0)");ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,26,60,0,6.2832);ctx.fill();
 g=ctx.createLinearGradient(0,18,0,18+fl+22);g.addColorStop(0,"rgba(255,255,255,.95)");g.addColorStop(.35,"rgba(90,210,255,.85)");g.addColorStop(1,"rgba(110,90,255,0)");
 ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(-6,18);ctx.quadraticCurveTo(0,18+fl+24,6,18);ctx.closePath();ctx.fill();
 ctx.globalCompositeOperation="source-over";
 [-1,1].forEach(function(d){
  ctx.save();ctx.scale(d,1);
  var wg=ctx.createLinearGradient(0,-6,38,28);wg.addColorStop(0,"#6f86ff");wg.addColorStop(1,"#1d2a7a");
  ctx.fillStyle=wg;ctx.beginPath();ctx.moveTo(8,-6);ctx.lineTo(38,22);ctx.lineTo(36,30);ctx.lineTo(24,24);ctx.lineTo(8,18);ctx.closePath();ctx.fill();
  ctx.strokeStyle="rgba(120,230,255,.9)";ctx.lineWidth=1.6;ctx.stroke();
  ctx.fillStyle="#cfd8ff";ctx.fillRect(12,-24,4.6,22);
  ctx.fillStyle="#7cf0ff";ctx.shadowColor="#7cf0ff";ctx.shadowBlur=10+ship.rec*14;ctx.fillRect(12,-27,4.6,4);ctx.shadowBlur=0;
  ctx.restore();
 });
 g=ctx.createLinearGradient(-11,0,11,0);g.addColorStop(0,"#8da2ff");g.addColorStop(.5,"#ffffff");g.addColorStop(1,"#7d90f5");
 ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(0,-38);ctx.bezierCurveTo(10,-22,12,-4,10,20);ctx.lineTo(-10,20);ctx.bezierCurveTo(-12,-4,-10,-22,0,-38);ctx.closePath();ctx.fill();
 ctx.strokeStyle="rgba(60,80,200,.6)";ctx.lineWidth=1.2;ctx.stroke();
 g=ctx.createLinearGradient(0,-22,0,0);g.addColorStop(0,"#b9f6ff");g.addColorStop(1,"#1e7ad8");ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(0,-12,4.6,10,0,0,6.2832);ctx.fill();
 ctx.fillStyle="rgba(255,255,255,.75)";ctx.beginPath();ctx.ellipse(-1.4,-16,1.5,4,0,0,6.2832);ctx.fill();
 ctx.fillStyle="#2a3270";ctx.fillRect(-6,18,12,5);
 ctx.restore();
}
function draw(){
 var tm=performance.now()/1000,i;
 ctx.setTransform(dpr,0,0,dpr,0,0);ctx.globalCompositeOperation="source-over";ctx.globalAlpha=1;
 ctx.fillStyle=bgG||"#0a0630";ctx.fillRect(0,0,W,H);
 ctx.save();
 if(shake>.3&&!reduce)ctx.translate(rnd(-shake,shake),rnd(-shake,shake));
 /* nebula */
 ctx.globalCompositeOperation="lighter";
 NEB.forEach(function(n){var g=ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r);g.addColorStop(0,"hsla("+n.h+",90%,55%,.16)");g.addColorStop(1,"hsla("+n.h+",90%,55%,0)");ctx.fillStyle=g;ctx.fillRect(n.x-n.r,n.y-n.r,n.r*2,n.r*2)});
 ctx.globalCompositeOperation="source-over";
 STAR.forEach(function(s){ctx.globalAlpha=.35+.65*Math.abs(Math.sin(tm*1.5+s.tw))*(s.r/1.9);ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,6.2832);ctx.fill()});ctx.globalAlpha=1;
 SS.forEach(function(q){var a=1-q.t/q.l,g=ctx.createLinearGradient(q.x,q.y,q.x-q.vx*.12,q.y-q.vy*.12);g.addColorStop(0,"rgba(255,255,255,"+a+")");g.addColorStop(1,"rgba(255,255,255,0)");ctx.strokeStyle=g;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(q.x,q.y);ctx.lineTo(q.x-q.vx*.12,q.y-q.vy*.12);ctx.stroke()});
 /* planet surface */
 var top=H-34*sc,R=W*1.2;
 ctx.fillStyle=sfG;ctx.beginPath();ctx.arc(W/2,top+R,R,0,6.2832);ctx.fill();
 ctx.save();ctx.shadowColor="rgba(110,220,255,.9)";ctx.shadowBlur=22;ctx.strokeStyle="rgba(130,225,255,.85)";ctx.lineWidth=2;ctx.beginPath();ctx.arc(W/2,top+R,R,Math.PI*1.2,Math.PI*1.8);ctx.stroke();ctx.restore();
 LIGHTS.forEach(function(l){ctx.fillStyle="hsla("+l.h+",100%,70%,"+(.3+.5*Math.abs(Math.sin(tm*2+l.tw)))+")";ctx.fillRect(l.x,l.y,2.2,2.2)});
 /* danger line / shield */
 var by=bY();ctx.setLineDash([10,9]);ctx.strokeStyle="rgba(255,110,140,"+(.16+shield*.7)+")";ctx.lineWidth=1.5+shield*3;ctx.beginPath();ctx.moveTo(0,by+sc*34);ctx.lineTo(W,by+sc*34);ctx.stroke();ctx.setLineDash([]);
 if(shield>.03){var sg=ctx.createLinearGradient(0,by-40,0,by+60);sg.addColorStop(0,"rgba(255,70,100,0)");sg.addColorStop(.6,"rgba(255,70,100,"+shield*.45+")");sg.addColorStop(1,"rgba(255,70,100,0)");ctx.fillStyle=sg;ctx.fillRect(0,by-40,W,100)}
 drawUfo(tm);
 /* laser sight */
 if(lockB&&B.indexOf(lockB)>-1&&ship.vis){ctx.setLineDash([6,9]);ctx.lineDashOffset=-tm*40;ctx.strokeStyle="rgba(125,255,160,.45)";ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(ship.x,ship.y-30*sc);ctx.lineTo(lockB.x,lockB.y);ctx.stroke();ctx.setLineDash([])}
 B.forEach(function(b){drawBubble(b,tm)});
 /* bullets */
 ctx.globalCompositeOperation="lighter";ctx.lineCap="round";
 BU.forEach(function(u){
  var n=u.tr.length,j;for(j=2;j<n;j+=2){var a=j/n;ctx.strokeStyle="rgba("+(u.dud?"255,120,120":"90,225,255")+","+a*.7+")";ctx.lineWidth=(u.dud?3:6)*a*sc;ctx.beginPath();ctx.moveTo(u.tr[j-2],u.tr[j-1]);ctx.lineTo(u.tr[j],u.tr[j+1]);ctx.stroke()}
  if(n>=2){ctx.strokeStyle="rgba(255,255,255,.95)";ctx.lineWidth=2.4*sc;ctx.beginPath();ctx.moveTo(u.tr[n-2],u.tr[n-1]);ctx.lineTo(u.x,u.y);ctx.stroke()}
  var g=ctx.createRadialGradient(u.x,u.y,0,u.x,u.y,14*sc);g.addColorStop(0,"rgba(200,250,255,.95)");g.addColorStop(1,"rgba(70,190,255,0)");ctx.fillStyle=g;ctx.beginPath();ctx.arc(u.x,u.y,14*sc,0,6.2832);ctx.fill();
 });
 ctx.globalCompositeOperation="source-over";
 drawShip(tm);
 /* particles */
 ctx.globalCompositeOperation="lighter";
 PT.forEach(function(p){if(p.k!=="spark")return;var a=1-p.t/p.l;ctx.strokeStyle="hsla("+p.h+",100%,68%,"+a+")";ctx.lineWidth=2.4*a+.6;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x-p.vx*.04,p.y-p.vy*.04);ctx.stroke()});
 RG.forEach(function(g){var k=g.t/g.l,e=1-Math.pow(1-k,3);ctx.strokeStyle="hsla("+g.h+",100%,70%,"+(1-k)+")";ctx.lineWidth=g.w*(1-k)+.5;ctx.beginPath();ctx.arc(g.x,g.y,g.r+(g.max-g.r)*e,0,6.2832);ctx.stroke()});
 ctx.globalCompositeOperation="source-over";
 PT.forEach(function(p){var a=1-p.t/p.l;if(p.k==="shard"){ctx.fillStyle="hsla("+p.h+",95%,70%,"+a*.45+")";ctx.strokeStyle="hsla("+p.h+",100%,85%,"+a+")";ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(p.x,p.y,p.s*(.5+.5*a),0,6.2832);ctx.fill();ctx.stroke()}else if(p.k==="snow"){ctx.fillStyle="rgba(215,240,255,"+a+")";ctx.beginPath();ctx.arc(p.x,p.y,p.s,0,6.2832);ctx.fill()}});
 FT.forEach(function(f){var k=f.t/f.l;ctx.save();ctx.globalAlpha=Math.max(0,1-k*k);ctx.textAlign="center";ctx.textBaseline="middle";
  if(f.k==="ghost"){ctx.font="800 "+(f.s*(1+k*1.3)|0)+"px Tahoma,sans-serif";ctx.fillStyle=f.c;ctx.shadowColor=f.c;ctx.shadowBlur=22;ctx.fillText(f.txt,f.x,f.y)}
  else{ctx.font="800 "+(f.s|0)+"px Tahoma,sans-serif";ctx.fillStyle=f.c;ctx.shadowColor="rgba(0,0,0,.7)";ctx.shadowBlur=6;ctx.fillText(f.txt,f.x,f.y-k*50*sc)}
  ctx.restore()});
 ctx.restore();
 /* overlays (not shaken) */
 if(freeze>0){var fa=Math.min(1,freeze),g=ctx.createRadialGradient(W/2,H/2,Math.min(W,H)*.3,W/2,H/2,Math.max(W,H)*.75);g.addColorStop(0,"rgba(150,215,255,0)");g.addColorStop(1,"rgba(150,215,255,"+.38*fa+")");ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  ctx.font="800 "+(15*sc|0)+"px Tahoma,sans-serif";ctx.textAlign="center";ctx.fillStyle="rgba(210,238,255,"+fa+")";ctx.fillText("❄️ FREEZE "+Math.ceil(freeze)+"s",W/2,H-14*sc)}
 if(flash>.02){ctx.fillStyle="rgba("+flashC+","+Math.min(.55,flash*.5)+")";ctx.fillRect(0,0,W,H)}
 ctx.fillStyle=vgG||"transparent";ctx.fillRect(0,0,W,H);
 if(st==="play"&&combo>=3){var mult=1+Math.min(4,combo/8|0);ctx.textAlign="left";ctx.textBaseline="alphabetic";ctx.shadowColor="rgba(255,170,60,.9)";ctx.shadowBlur=14;ctx.fillStyle="#ffd46a";ctx.font="800 "+(20*sc|0)+"px Tahoma,sans-serif";ctx.fillText("COMBO "+combo,14,28*sc+6);ctx.fillStyle="#fff";ctx.font="800 "+(14*sc|0)+"px Tahoma,sans-serif";ctx.fillText("multiplier ×"+mult,14,48*sc+8);ctx.shadowBlur=0}
}

/* ---------- loop / lifecycle ---------- */
function loop(n){raf=0;if(!active)return;var dt=Math.min(.05,(n-last)/1000||0);last=n;if(st!=="paused")update(dt);else{uT+=0}draw();raf=requestAnimationFrame(loop)}
function kick(){if(!raf){last=performance.now();raf=requestAnimationFrame(loop)}}
window.shootCtl={enter:function(){active=true;resize();if(st==="idle"&&!ov.innerHTML)showIdle();kick()},leave:function(){active=false;pause()}};
window.addEventListener("resize",resize);
sv.addEventListener("pointerdown",function(e){if(e.target.closest("button"))return;refocus()});
showIdle();hud();
})();

/* ---------------- Turbo Typing Racer ---------------- */
(function(){
var rv=$("#raceView"),cv=$("#rCv"),ctx=cv.getContext("2d"),ov=$("#rOv"),ban=$("#rBan"),crewEl=$("#rCrew"),txEl=$("#rText");
var RS=save.racer||(save.racer={un:1,r:{},all:0});if(!RS.r)RS.r={};
var EF='"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
var W=0,H=0,dpr=1,hs=1,st="idle",raf=0,last=0,active=false;
var segLen=200,roadW=2000,camH=1000,drawDist=230,camDepth=1/Math.tan(50*Math.PI/180),playerZ=camH*camDepth,carW=480;
var LANES=[-.75,-.25,.25,.75];
var segs=[],N=0,finishIdx=0,finishZ=0,lv=1,TH=null;
var position=0,speed=0,playerX=.25,lane=.25,tilt=0,E=0,correct=0,wrong=0,combo=0,maxCombo=0,errUntil=0,revUntil=0,rt=0,cd=0,shk=0,flashA=0,flashC="255,60,70",skyOff=0,finPos=0,coast=0,nitro=0,lastKeyT=0,bounce=0,lastRevBeep=0,lastPos=6,lastSay=0,revAnn=0,brk=0,lastC=0,doneAt=0;
var rivals=[],PT=[],LN=[],SNOW=[],pcx=0,pcy=0,pcw=0;
var lines=[],pend="",lineIdx=0,ci=0,errFlash=0,hudT=0;
var DONE=0;

/* ---------- data ---------- */
var MODELS=[
 {n:"City Hatch",lh:32,ch:26,w1:.84,w2:.68,tr:15},
 {n:"Street Sedan",lh:30,ch:22,w1:.84,w2:.64,tr:15,trunk:1},
 {n:"Rally Beast",lh:38,ch:26,w1:.88,w2:.78,tr:20,sp:1,bar:1,spare:1},
 {n:"Sport Coupe",lh:27,ch:19,w1:.86,w2:.6,tr:16,sp:1,st:1},
 {n:"Muscle GT",lh:31,ch:21,w1:.9,w2:.66,tr:17,sp:1,st:2,twin:1},
 {n:"Super GT",lh:24,ch:16,w1:.94,w2:.56,tr:17,sp:2,st:1,diff:1},
 {n:"Hyper Racer",lh:21,ch:14,w1:.96,w2:.5,tr:18,sp:2,diff:1,glow:1},
 {n:"Formula X",formula:1}
];
var CARHUE=[355,215,28,145,275,48,185,322];
var THEMES=[
 {n:"Jungle Ride",ic:"🌴",wpm:8,sky:["#3cc4ff","#9fe8ff","#e6fff0"],sun:{x:.76,y:.26,r:44,c:"#fff3a6"},ground:["#2fa047","#288b3d"],road:["#5a5f67","#52575f"],rumble:["#ffffff","#e0392d"],lane:"#f4f4f4",fog:"#d5f5e0",
  layers:[{c:"#63c493",h:.2,f:.006,s:1,p:.25},{c:"#2f8f5f",h:.13,f:.011,s:4,p:.55}],spr:["jtree","jtree","palm","bush","parrot","monkey","fan","jtree","fern"],curve:2.2,hill:.4,clouds:1},
 {n:"Rocky Lands",ic:"🪨",wpm:12,sky:["#ff9a5c","#ffc98a","#ffe9c4"],sun:{x:.2,y:.3,r:52,c:"#fff0c0"},ground:["#c4723a","#b3652f"],road:["#53504f","#4b4745"],rumble:["#ffffff","#2a6ad6"],lane:"#fff1c4",fog:"#ffdcb4",
  layers:[{c:"#dd9157",h:.26,f:.007,s:2,p:.25,sharp:1},{c:"#a85a2c",h:.16,f:.012,s:7,p:.55,sharp:1}],spr:["rockb","rockb","rock","cactus","camel","fan","rock","bush"],curve:3,hill:.7,clouds:1},
 {n:"Snow Land",ic:"❄️",wpm:16,sky:["#6fbfff","#c6e6ff","#f4fbff"],sun:{x:.3,y:.3,r:34,c:"#ffffff"},ground:["#f6f9ff","#e3edfa"],road:["#646a73","#5c626b"],rumble:["#ffffff","#2a75d6"],lane:"#ffffff",fog:"#eaf5ff",
  layers:[{c:"#d4e6f8",h:.3,f:.007,s:3,p:.25,sharp:1},{c:"#a9c9ea",h:.17,f:.012,s:8,p:.55,sharp:1}],spr:["spine","spine","snowman","penguin","spine","rocki","fan","spine"],weather:"snow",curve:3,hill:.6,clouds:1},
 {n:"Mountain Ride",ic:"⛰️",wpm:20,sky:["#2f7fe0","#7bb7ff","#d6ecff"],sun:{x:.82,y:.24,r:34,c:"#fffbe0"},ground:["#6b8f4a","#5f8142"],road:["#555961","#4d5159"],rumble:["#ffffff","#ee6a1a"],lane:"#ffffff",fog:"#d8e8f6",
  layers:[{c:"#9fb4d6",h:.44,f:.0075,s:5,p:.22,sharp:1,cap:1},{c:"#5d7699",h:.28,f:.012,s:9,p:.5,sharp:1},{c:"#3e5c47",h:.14,f:.02,s:2,p:.8,sharp:1}],spr:["spine","pine","rock","pine","sign","fan","spine","bush"],curve:4,hill:2,rev:1,clouds:1},
 {n:"Desert Sunset",ic:"🌅",wpm:25,sky:["#2a1b6e","#e2504f","#ffb347"],sun:{x:.5,y:.44,r:74,c:"#ffe08a"},ground:["#d9a35b","#cc944c"],road:["#4c4748","#443f40"],rumble:["#ffffff","#7a2bd1"],lane:"#ffe9a8",fog:"#f6a066",
  layers:[{c:"#93406c",h:.2,f:.006,s:6,p:.25,sharp:0},{c:"#5a2552",h:.13,f:.011,s:3,p:.55,sharp:1}],spr:["cactus","cactus","rock","camel","sign","fan","palm","rockb"],curve:2.8,hill:.8,clouds:2},
 {n:"Coastal Highway",ic:"🌊",wpm:30,sky:["#1e90ff","#6fc8ff","#bff0ff"],sun:{x:.66,y:.3,r:40,c:"#fff8c0"},ground:["#f0d79a","#e4c885"],road:["#5b6068","#535860"],rumble:["#ffffff","#ff4d6d"],lane:"#ffffff",fog:"#d9f6ff",
  layers:[{c:"#2d9cdb",h:.035,f:.02,s:1,p:.1,flat:1},{c:"#7ea48a",h:.16,f:.008,s:5,p:.4,sharp:0}],spr:["palm","palm","bush","sign","fan","crab","palm","bird"],curve:3.2,hill:.6,clouds:1},
 {n:"Neon City Night",ic:"🌃",wpm:35,sky:["#05001f","#1a0b52","#6a1b9a"],moon:{x:.2,y:.24,r:32,c:"#e9e6ff"},night:1,ground:["#15132f","#110f27"],road:["#2c2c40","#272738"],rumble:["#ff2bd6","#19e6ff"],lane:"#ffe66b",fog:"#4a1c8a",
  layers:[{c:"#1f1259",city:1,h:.3,p:.25,w:1},{c:"#2a1670",city:1,h:.2,p:.5,w:2}],spr:["bld","bld","lamp","sign","lamp","fan","bld"],weather:"rain",curve:3,hill:.5},
 {n:"Alpine Summit",ic:"🏔️",wpm:40,sky:["#020a24","#0b2a5c","#1c6a8a"],moon:{x:.78,y:.2,r:28,c:"#f4f8ff"},night:1,aurora:1,ground:["#e8f1ff","#d6e4f7"],road:["#4a505c","#434955"],rumble:["#ffffff","#27d7a2"],lane:"#ffffff",fog:"#5fb8cf",
  layers:[{c:"#2d5a8c",h:.46,f:.0075,s:4,p:.22,sharp:1,cap:1},{c:"#1c3d66",h:.28,f:.012,s:8,p:.5,sharp:1}],spr:["spine","spine","rocki","snowman","penguin","sign","fan","spine"],weather:"snow",curve:4,hill:2.3,rev:1}
];
var POOL1="the and for you are with this that have from will type fast keys home road car run go win speed drive race turn wheel fuel gear lap track star sun fun play game jump wind snow tree hill rock city light night boost zoom start finish clear smooth steady quick".split(" ");
var POOL2="keyboard computer monitor internet network software hardware desktop printer windows folder student practice typing accuracy mountain journey forward highway engine traffic control balance machine champion trophy victory racing driver winner finger rhythm".split(" ");
var SENT=["Practice makes perfect.","Keep your eyes on the road.","Accuracy first, speed will follow.","Today I will type faster than yesterday.","A good typist never looks at the keys.","Computers help us to learn and to work.","Sit straight and relax your hands.","Every great driver was a beginner once.","Press the keys softly, not hard.","The race is won by steady fingers.","PSDC students type with ten fingers.","Never give up, the finish line is near!","Save your work before you shut down.","Practice for thirty minutes every day."];
var SENT2=["Lap 3 of 5: speed 120 km/h!","Type 40 words per minute by month 3.","Batch 2026 has 40 students, 6 days a week.","Level 8 needs 40 WPM and 95% accuracy.","Excel, Word & PowerPoint are taught here.","Use Ctrl+S to save; Ctrl+P to print."];
var CREW={
 z:{n:"Coach Ayesha",e:"👩‍🏫",c:"#4f8dff"},
 u:{n:"Mechanic Usman",e:"👨‍🔧",c:"#ff8a3d"},
 b:{n:"Turbo-Bot",e:"🤖",c:"#19d3b0"},
 f:{n:"Fan Zoya",e:"🤩",c:"#ff5fa2"}
};
function rnd(a,b){return a+Math.random()*(b-a)}
function clamp(v,a,b){return v<a?a:v>b?b:v}
function lerp(a,b,p){return a+(b-a)*p}
function pick(a){return a[Math.random()*a.length|0]}
function topSpeed(l){return 6200+l*700}
function refSpeed(l){return topSpeed(l)*.8}
function ord(n){return n+(n===1?"st":n===2?"nd":n===3?"rd":"th")}

/* ---------- audio ---------- */
var eng=null;
function engStart(){if(!ac||eng)return;try{var o=ac.createOscillator(),o2=ac.createOscillator(),f=ac.createBiquadFilter(),g=ac.createGain();o.type="sawtooth";o2.type="square";f.type="lowpass";f.frequency.value=600;g.gain.value=0;o.connect(f);o2.connect(f);f.connect(g);g.connect(ac.destination);o.start();o2.start();eng={o:o,o2:o2,g:g,f:f}}catch(e){eng=null}}
function engSet(on){if(!eng)return;var p=clamp(Math.abs(speed)/topSpeed(lv),0,1.3),t=ac.currentTime;eng.o.frequency.setTargetAtTime(52+p*120,t,.06);eng.o2.frequency.setTargetAtTime(26+p*60,t,.06);eng.f.frequency.setTargetAtTime(450+p*1000,t,.08);eng.g.gain.setTargetAtTime(on&&soundOn?.03+p*.03:0,t,.1)}
function engStop(){if(eng){try{eng.g.gain.value=0;eng.o.stop();eng.o2.stop()}catch(e){}eng=null}}
function screech(){if(!ac||!soundOn)return;var n=Math.floor(ac.sampleRate*.35),b=ac.createBuffer(1,n,ac.sampleRate),d=b.getChannelData(0),i;for(i=0;i<n;i++)d[i]=(Math.random()*2-1)*(1-i/n);var s=ac.createBufferSource(),f=ac.createBiquadFilter(),g=ac.createGain();f.type="bandpass";f.frequency.value=2400;f.Q.value=2;g.gain.value=.08;s.buffer=b;s.connect(f);f.connect(g);g.connect(ac.destination);s.start()}

/* ---------- sprites ---------- */
var SPR={};
function mk(w,h,fn){var c=document.createElement("canvas");c.width=w;c.height=h;fn(c.getContext("2d"),w,h);return c}
function ee(e){return function(g,w,h){g.font=(w*.8|0)+"px "+EF;g.textAlign="center";g.textBaseline="middle";g.fillText(e,w/2,h*.55)}}
function pineF(snow){return function(g,w,h){g.fillStyle="#5b3a1e";g.fillRect(w*.44,h*.82,w*.12,h*.18);for(var i=0;i<4;i++){var y0=h*(.04+i*.19),bw=w*(.4+i*.15),y1=y0+h*.3,gr=g.createLinearGradient(w/2-bw/2,0,w/2+bw/2,0);gr.addColorStop(0,"#175f33");gr.addColorStop(1,snow?"#2b8a52":"#33a557");g.fillStyle=gr;g.beginPath();g.moveTo(w/2,y0);g.lineTo(w/2+bw/2,y1);g.lineTo(w/2-bw/2,y1);g.closePath();g.fill();
 if(snow){g.fillStyle="#f4faff";g.beginPath();g.moveTo(w/2,y0);g.lineTo(w/2+bw*.3,y0+(y1-y0)*.55);g.quadraticCurveTo(w/2+bw*.12,y0+(y1-y0)*.42,w/2,y0+(y1-y0)*.62);g.quadraticCurveTo(w/2-bw*.12,y0+(y1-y0)*.42,w/2-bw*.3,y0+(y1-y0)*.55);g.closePath();g.fill()}}}}
function jtreeF(g,w,h){g.fillStyle="#6b4423";g.fillRect(w*.45,h*.45,w*.1,h*.55);var cs=[[.5,.3,.3],[.3,.42,.22],[.7,.42,.22],[.42,.2,.2],[.6,.18,.2]];cs.forEach(function(c){var gr=g.createRadialGradient(w*c[0]-w*.05,h*c[1]-h*.05,2,w*c[0],h*c[1],w*c[2]);gr.addColorStop(0,"#54d07a");gr.addColorStop(1,"#17743a");g.fillStyle=gr;g.beginPath();g.arc(w*c[0],h*c[1],w*c[2],0,6.2832);g.fill()})}
function palmF(g,w,h){g.strokeStyle="#8a5a2b";g.lineWidth=w*.07;g.lineCap="round";g.beginPath();g.moveTo(w*.45,h);g.quadraticCurveTo(w*.55,h*.55,w*.5,h*.25);g.stroke();for(var i=0;i<7;i++){var a=-2.9+i*.55;g.strokeStyle=i%2?"#2ea84f":"#1f8a3e";g.lineWidth=w*.06;g.beginPath();g.moveTo(w*.5,h*.25);g.quadraticCurveTo(w*.5+Math.cos(a)*w*.28,h*.25+Math.sin(a)*h*.2-h*.06,w*.5+Math.cos(a)*w*.44,h*.25+Math.sin(a)*h*.1+h*.12);g.stroke()}g.fillStyle="#6b3f1d";g.beginPath();g.arc(w*.47,h*.28,w*.035,0,6.2832);g.arc(w*.54,h*.3,w*.035,0,6.2832);g.fill()}
function bushF(g,w,h){[[.3,.65,.25],[.55,.55,.3],[.75,.7,.22]].forEach(function(c){var gr=g.createRadialGradient(w*c[0],h*c[1]-8,2,w*c[0],h*c[1],w*c[2]);gr.addColorStop(0,"#4cc46f");gr.addColorStop(1,"#1d7a3c");g.fillStyle=gr;g.beginPath();g.arc(w*c[0],h*c[1],w*c[2],0,6.2832);g.fill()});g.fillStyle="#ff5fa2";[[.4,.5],[.6,.4],[.72,.62]].forEach(function(p){g.beginPath();g.arc(w*p[0],h*p[1],w*.03,0,6.2832);g.fill()})}
function fernF(g,w,h){g.strokeStyle="#2aa150";g.lineWidth=w*.05;g.lineCap="round";for(var i=0;i<7;i++){var a=-2.6+i*.37;g.beginPath();g.moveTo(w/2,h);g.quadraticCurveTo(w/2+Math.cos(a)*w*.3,h+Math.sin(a)*h*.5,w/2+Math.cos(a)*w*.46,h+Math.sin(a)*h*.9);g.stroke()}}
function rockF(c1,c2){return function(g,w,h){var gr=g.createLinearGradient(0,0,w,h);gr.addColorStop(0,c1);gr.addColorStop(1,c2);g.fillStyle=gr;g.beginPath();g.moveTo(w*.05,h);g.lineTo(w*.12,h*.55);g.lineTo(w*.35,h*.2);g.lineTo(w*.6,h*.1);g.lineTo(w*.85,h*.4);g.lineTo(w*.95,h);g.closePath();g.fill();g.fillStyle="rgba(255,255,255,.18)";g.beginPath();g.moveTo(w*.35,h*.2);g.lineTo(w*.6,h*.1);g.lineTo(w*.5,h*.5);g.closePath();g.fill();g.fillStyle="rgba(0,0,0,.2)";g.beginPath();g.moveTo(w*.6,h*.1);g.lineTo(w*.85,h*.4);g.lineTo(w*.95,h);g.lineTo(w*.6,h);g.closePath();g.fill()}}
function lampF(g,w,h){g.fillStyle="#2c2c46";g.fillRect(w*.47,h*.1,w*.06,h*.9);g.fillRect(w*.47,h*.1,w*.3,h*.04);var gr=g.createRadialGradient(w*.77,h*.15,0,w*.77,h*.15,w*.35);gr.addColorStop(0,"rgba(255,235,150,1)");gr.addColorStop(.3,"rgba(255,210,90,.5)");gr.addColorStop(1,"rgba(255,210,90,0)");g.fillStyle=gr;g.fillRect(0,0,w,h*.6)}
function bldF(hue){return function(g,w,h){var gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,"hsl("+hue+",60%,22%)");gr.addColorStop(1,"hsl("+hue+",60%,10%)");g.fillStyle=gr;g.fillRect(w*.1,h*.08,w*.8,h*.92);g.strokeStyle="hsl("+hue+",100%,65%)";g.lineWidth=3;g.strokeRect(w*.1,h*.08,w*.8,h*.92);for(var y=.14;y<.94;y+=.07)for(var x=.16;x<.82;x+=.13){if(Math.random()<.6){g.fillStyle=Math.random()<.3?"#ffe27a":"hsl("+(hue+40)+",100%,70%)";g.fillRect(w*x,h*y,w*.07,h*.035)}}}}
function signF(txt,c1,c2){return function(g,w,h){g.fillStyle="#2a2f45";g.fillRect(w*.2,h*.5,w*.05,h*.5);g.fillRect(w*.75,h*.5,w*.05,h*.5);var gr=g.createLinearGradient(0,0,w,0);gr.addColorStop(0,c1);gr.addColorStop(1,c2);g.fillStyle=gr;g.beginPath();g.roundRect?g.roundRect(w*.05,h*.1,w*.9,h*.45,10):g.rect(w*.05,h*.1,w*.9,h*.45);g.fill();g.strokeStyle="rgba(255,255,255,.85)";g.lineWidth=4;g.stroke();g.fillStyle="#fff";g.font="800 "+(w*.17|0)+"px Tahoma,sans-serif";g.textAlign="center";g.textBaseline="middle";g.shadowColor="rgba(0,0,0,.4)";g.shadowBlur=5;g.fillText(txt,w/2,h*.33)}}
var DEF={pine:[1500,160,230,pineF(0)],spine:[1500,160,230,pineF(1)],jtree:[1900,170,210,jtreeF],palm:[1800,150,230,palmF],bush:[1000,140,90,bushF],fern:[900,120,100,fernF],
 rock:[1100,130,100,rockF("#9aa0a8","#5e646c")],rockb:[1900,170,150,rockF("#d98a52","#7d3f1d")],rocki:[1300,140,110,rockF("#cfe6ff","#6d8fb5")],
 lamp:[1300,130,260,lampF],bld:[1700,200,340,bldF(280)],sign:[1900,200,150,signF("PSDC","#2f4fd8","#7a58f0")],
 sign1:[1900,200,150,signF("TYPE FAST!","#e0392d","#ff8a3d")],sign2:[1900,200,150,signF("ACCURACY ✔","#0fa87a","#19d3b0")],sign3:[1900,200,150,signF("KEEP GOING!","#d6407a","#ff7ad9")],
 cactus:[1000,128,128,ee("🌵")],camel:[1400,128,128,ee("🐫")],snowman:[1100,128,128,ee("⛄")],penguin:[900,128,128,ee("🐧")],parrot:[800,128,128,ee("🦜")],monkey:[900,128,128,ee("🐒")],crab:[700,128,128,ee("🦀")],bird:[800,128,128,ee("🕊️")],
 fan0:[800,128,128,ee("🙌")],fan1:[800,128,128,ee("🤩")],fan2:[800,128,128,ee("👏")],fan3:[800,128,128,ee("📣")],fan4:[800,128,128,ee("🧑‍🏫")],pit:[900,128,128,ee("🧑‍🔧")],flag:[900,128,128,ee("🏁")],cheer:[900,128,128,ee("🎉")]};
function spr(k){var s=SPR[k];if(!s){var d=DEF[k];s=SPR[k]={w:d[0],a:d[2]/d[1],c:mk(d[1],d[2],d[3])}}return s}

/* ---------- cars ---------- */
function shape(c,pts){c.beginPath();c.moveTo(pts[0],pts[1]);for(var i=2;i<pts.length;i+=2)c.lineTo(pts[i],pts[i+1]);c.closePath()}
function drawCar(c,cx,gy,w,mi,hue,o){
 o=o||{};var M=MODELS[mi],u=w/100,B=o.brake||0,sat=o.sat==null?86:o.sat,base="hsl("+hue+","+sat+"%,50%)",hi="hsl("+hue+","+sat+"%,66%)",lo="hsl("+hue+","+sat+"%,28%)",g,i;
 c.save();c.translate(cx,gy);if(o.tilt)c.rotate(o.tilt);c.scale(u,u);
 c.fillStyle="rgba(0,0,0,.4)";c.beginPath();c.ellipse(0,1,57,7,0,0,6.2832);c.fill();
 if(M.glow){c.globalCompositeOperation="lighter";g=c.createRadialGradient(0,0,2,0,0,62);g.addColorStop(0,"hsla("+hue+",100%,60%,.55)");g.addColorStop(1,"hsla("+hue+",100%,60%,0)");c.fillStyle=g;c.beginPath();c.ellipse(0,0,64,12,0,0,6.2832);c.fill();c.globalCompositeOperation="source-over"}
 if(M.formula){
  [-1,1].forEach(function(d){g=c.createLinearGradient(d*40-12,0,d*40+12,0);g.addColorStop(0,"#0c0d12");g.addColorStop(.5,"#2b2e38");g.addColorStop(1,"#0c0d12");c.fillStyle=g;c.fillRect(d*39-12,-32,24,32);c.fillStyle="rgba(255,255,255,.12)";c.fillRect(d*39-12,-24,24,3);c.fillRect(d*39-12,-14,24,3);c.fillStyle=base;c.fillRect(d*22-9,-24,18,16)});
  g=c.createLinearGradient(-14,0,14,0);g.addColorStop(0,lo);g.addColorStop(.5,hi);g.addColorStop(1,lo);c.fillStyle=g;shape(c,[-18,-6,-11,-38,11,-38,18,-6]);c.fill();
  c.fillStyle="#fff";c.beginPath();c.arc(0,-40,7,0,6.2832);c.fill();c.fillStyle="#1d2a44";c.fillRect(-5,-43,10,4);c.strokeStyle="#111";c.lineWidth=2.4;c.beginPath();c.arc(0,-42,11,3.6,5.8);c.stroke();
  c.fillStyle="#15171d";c.fillRect(-26,-8,52,6);c.fillStyle="#12141a";c.fillRect(-46,-56,92,7);c.fillStyle=base;c.fillRect(-48,-62,5,24);c.fillRect(43,-62,5,24);c.fillStyle="#2b2e38";c.fillRect(-3,-50,6,18);
  c.fillStyle=B>.2?"#ff2b3a":"#8a0f1a";if(B>.2){c.shadowColor="#ff2b3a";c.shadowBlur=14}c.fillRect(-6,-26,12,6);c.shadowBlur=0;
  c.fillStyle="#c9ced8";c.beginPath();c.arc(0,-13,4,0,6.2832);c.fill();
 }else{
  var lh=M.lh,ch=M.ch,hb=M.w1*50,tw=M.tr*.8,th=M.tr+6;
  [-1,1].forEach(function(d){g=c.createLinearGradient(0,-th,0,0);g.addColorStop(0,"#2c2f38");g.addColorStop(1,"#08090c");c.fillStyle=g;c.beginPath();c.roundRect?c.roundRect(d>0?hb-tw+3:-hb-3,-th,tw,th,4):c.rect(d>0?hb-tw+3:-hb-3,-th,tw,th);c.fill()});
  if(M.sp===2||M.sp===1){var sy=-lh-ch*(M.sp===2?.62:.2);
   if(M.sp===2){c.fillStyle="#15171d";c.fillRect(-hb*.55,sy,5,ch*.62);c.fillRect(hb*.55-5,sy,5,ch*.62)}}
  g=c.createLinearGradient(0,-lh,0,-8);g.addColorStop(0,hi);g.addColorStop(.4,base);g.addColorStop(1,lo);c.fillStyle=g;
  c.beginPath();c.moveTo(-hb,-10);c.lineTo(-hb-1,-lh*.55);c.quadraticCurveTo(-hb-1,-lh,-hb+8,-lh);c.lineTo(hb-8,-lh);c.quadraticCurveTo(hb+1,-lh,hb+1,-lh*.55);c.lineTo(hb,-10);c.closePath();c.fill();
  var cb=hb*M.w2*1.05,ct=hb*M.w2*.78;
  g=c.createLinearGradient(0,-lh-ch,0,-lh);g.addColorStop(0,hi);g.addColorStop(1,base);c.fillStyle=g;
  c.beginPath();c.moveTo(-cb,-lh+3);c.lineTo(-ct,-lh-ch+5);c.quadraticCurveTo(-ct,-lh-ch,-ct+7,-lh-ch);c.lineTo(ct-7,-lh-ch);c.quadraticCurveTo(ct,-lh-ch,ct,-lh-ch+5);c.lineTo(cb,-lh+3);c.closePath();c.fill();
  g=c.createLinearGradient(0,-lh-ch,0,-lh);g.addColorStop(0,"#2f6aa6");g.addColorStop(1,"#08162b");c.fillStyle=g;
  c.beginPath();c.moveTo(-cb+4,-lh-1);c.lineTo(-ct+4,-lh-ch+7);c.quadraticCurveTo(-ct+4,-lh-ch+3,-ct+9,-lh-ch+3);c.lineTo(ct-9,-lh-ch+3);c.quadraticCurveTo(ct-4,-lh-ch+3,ct-4,-lh-ch+7);c.lineTo(cb-4,-lh-1);c.closePath();c.fill();
  c.fillStyle="rgba(255,255,255,.2)";shape(c,[-ct+8,-lh-ch+5,-ct+20,-lh-ch+5,-cb+14,-lh-2,-cb+5,-lh-2]);c.fill();
  if(M.st){c.fillStyle="rgba(255,255,255,.88)";if(M.st===1){c.fillRect(-9,-lh-ch+4,4,ch+lh-12);c.fillRect(5,-lh-ch+4,4,ch+lh-12)}else{c.fillRect(-11,-lh-ch+4,22,ch+lh-12)}}
  if(M.trunk){c.fillStyle="rgba(0,0,0,.22)";c.fillRect(-hb+4,-lh,hb*2-8,3)}
  if(M.sp===1){c.fillStyle="#15171d";c.fillRect(-hb+3,-lh-4,hb*2-6,5);c.fillStyle="rgba(255,255,255,.35)";c.fillRect(-hb+3,-lh-4,hb*2-6,1.5)}
  if(M.sp===2){var wy=-lh-ch*.62-6;c.fillStyle="#12141a";c.fillRect(-hb-3,wy,hb*2+6,7);c.fillStyle=base;c.fillRect(-hb-3,wy-5,4,17);c.fillRect(hb-1,wy-5,4,17);c.fillStyle="rgba(255,255,255,.25)";c.fillRect(-hb-3,wy,hb*2+6,1.6)}
  if(M.bar){c.fillStyle="#1a1d26";c.fillRect(-ct+3,-lh-ch-5,ct*2-6,5);for(i=0;i<4;i++){c.fillStyle="#ffd84a";c.shadowColor="#ffd84a";c.shadowBlur=9;c.fillRect(-ct+7+i*((ct*2-20)/3.4),-lh-ch-4,6,3)}c.shadowBlur=0}
  if(M.spare){c.fillStyle="#111319";c.beginPath();c.arc(0,-lh-ch*.3,13,0,6.2832);c.fill();c.fillStyle="#9aa3b5";c.beginPath();c.arc(0,-lh-ch*.3,6,0,6.2832);c.fill();c.fillStyle="#111319";c.beginPath();c.arc(0,-lh-ch*.3,2,0,6.2832);c.fill()}
  /* tail lights */
  var ly=-lh*.62,lit=B>.2||o.rev;
  if(M.glow||M.sp===2&&M.diff){c.fillStyle=B>.2?"#ff2b3a":"#8a0f1a";if(B>.2){c.shadowColor="#ff2b3a";c.shadowBlur=16}c.fillRect(-hb+5,ly,hb*2-10,3.4);c.shadowBlur=0}
  [-1,1].forEach(function(d){var x0=d>0?hb-19:-hb+3;c.fillStyle=B>.2?"#ff3344":"#8f1020";if(B>.2){c.shadowColor="#ff2b3a";c.shadowBlur=16}c.beginPath();c.roundRect?c.roundRect(x0,ly-3.5,16,7,2):c.rect(x0,ly-3.5,16,7);c.fill();c.shadowBlur=0;
   if(o.rev){c.fillStyle="#fff";c.shadowColor="#fff";c.shadowBlur=12;c.fillRect(d>0?hb-26:-hb+19,ly-2.5,6,5);c.shadowBlur=0}});
  c.fillStyle="#f2f4f8";c.beginPath();c.roundRect?c.roundRect(-9,-lh*.46,18,7,1.5):c.rect(-9,-lh*.46,18,7);c.fill();c.fillStyle="#2f4fd8";c.font="800 5px Tahoma,sans-serif";c.textAlign="center";c.textBaseline="middle";c.fillText("PSDC",0,-lh*.46+3.8);
  c.fillStyle="#12141a";c.beginPath();c.roundRect?c.roundRect(-hb+2,-11,hb*2-4,8,3):c.rect(-hb+2,-11,hb*2-4,8);c.fill();
  if(M.diff){c.strokeStyle="rgba(255,255,255,.22)";c.lineWidth=1.2;for(i=-5;i<=5;i++){c.beginPath();c.moveTo(i*7,-10);c.lineTo(i*7,-4);c.stroke()}}
  c.fillStyle="rgba(255,255,255,.22)";c.beginPath();c.ellipse(-hb*.45,-lh*.88,hb*.35,3,0,0,6.2832);c.fill();
  var ex=M.twin?[-.5,-.3,.3,.5]:[-.38,.38];ex.forEach(function(e){g=c.createRadialGradient(e*hb-1,-8,.5,e*hb,-7,4.2);g.addColorStop(0,"#fff");g.addColorStop(1,"#6b7280");c.fillStyle=g;c.beginPath();c.arc(e*hb,-6.5,3.6,0,6.2832);c.fill();c.fillStyle="#0a0b0e";c.beginPath();c.arc(e*hb,-6.5,1.8,0,6.2832);c.fill()});
 }
 if(o.flame>0){c.globalCompositeOperation="lighter";var fc=o.nitro?"90,190,255":"255,170,60",fl=o.flame,pos=M.formula?[0]:M.twin?[-.5,.5]:[-.38,.38];pos.forEach(function(e){var x=M.formula?0:e*(M.w1*50),r=(10+fl*14)*(.8+Math.random()*.4);g=c.createRadialGradient(x,-7,0,x,-7,r);g.addColorStop(0,"rgba(255,255,255,"+fl+")");g.addColorStop(.35,"rgba("+fc+","+fl*.8+")");g.addColorStop(1,"rgba("+fc+",0)");c.fillStyle=g;c.beginPath();c.arc(x,-7,r,0,6.2832);c.fill()});c.globalCompositeOperation="source-over"}
 c.restore();
}

/* ---------- track ---------- */
function lastY(){return segs.length?segs[segs.length-1].p2.world.y:0}
function addSeg(curve,y){var n=segs.length;segs.push({index:n,p1:{world:{y:lastY(),z:n*segLen},camera:{},screen:{}},p2:{world:{y:y,z:(n+1)*segLen},camera:{},screen:{}},curve:curve,sprites:[],cars:[],col:Math.floor(n/3)%2})}
function eIn(a,b,p){return a+(b-a)*p*p}
function eIO(a,b,p){return a+(b-a)*(-Math.cos(p*Math.PI)/2+.5)}
function addRoad(e,h,l,curve,y){var sY=lastY(),eY=sY+y*segLen,tot=e+h+l,n;for(n=0;n<e;n++)addSeg(eIn(0,curve,n/e),eIO(sY,eY,n/tot));for(n=0;n<h;n++)addSeg(curve,eIO(sY,eY,(e+n)/tot));for(n=0;n<l;n++)addSeg(eIn(curve,0,n/l),eIO(sY,eY,(e+h+n)/tot))}
function buildTrack(){
 segs=[];var T=TH,target=Math.round(refSpeed(lv)*72/segLen),sign=1;
 addRoad(0,40,0,0,0);
 while(segs.length<target){
  var r=Math.random(),c=(Math.random()<.5?-1:1)*rnd(1.2,3.6)*T.curve/3,y=lastY()/segLen,hy=rnd(8,26)*T.hill;
  if(y>18*T.hill+4)hy=-Math.abs(hy);else if(y<-6*T.hill)hy=Math.abs(hy);else hy*=(Math.random()<.5?-1:1);
  if(r<.2)addRoad(10,rnd(20,50)|0,10,0,0);
  else if(r<.5)addRoad(rnd(20,40)|0,rnd(30,70)|0,rnd(20,40)|0,c,0);
  else if(r<.75)addRoad(25,rnd(25,50)|0,25,0,hy);
  else if(r<.9){addRoad(20,30,20,c,hy*.6);addRoad(20,30,20,-c,-hy*.4)}
  else addRoad(25,40,25,c,hy*.5);
 }
 var y2=lastY()/segLen;addRoad(40,40,40,0,-y2*.8);
 finishIdx=segs.length;addRoad(0,60,0,0,0);addRoad(0,330,0,0,0);
 N=segs.length;finishZ=finishIdx*segLen;
 var i,s,side;
 for(i=0;i<N;i++){s=segs[i];s.dash=Math.floor(i/4)%2===0}
 for(i=8;i<N-300;i+=2){for(side=-1;side<=1;side+=2){if(Math.random()<.4){var k=pick(T.spr);if(k==="fan")k="fan"+(Math.random()*5|0);if(k==="sign"&&Math.random()<.7)k="sign"+(1+(Math.random()*3|0));var big=k==="jtree"||k==="palm"||k==="pine"||k==="spine"||k==="rockb"||k==="bld";segs[i].sprites.push({k:k,x:side*((k==="bld"?2.1:1.25)+Math.random()*(big?2.8:1.8))})}}}
 /* mountain-theme near-road decoration */
 var near=["pine","spine","jtree","rock","rockb","rocki","bush","lamp","palm","cactus"].filter(function(q){return T.spr.indexOf(q)>-1});if(!near.length)near=["bush"];
 for(i=0;i<N-300;i+=9)segs[i].sprites.push({k:pick(near),x:(Math.random()<.5?-1:1)*(1.15+Math.random()*.2)});
 segs[12].sprites.push({k:"gate",x:0,t:"START"});
 for(i=6;i<18;i+=2){segs[i].sprites.push({k:pick(["fan0","fan1","fan2","fan3","pit","cheer"]),x:-1.35-Math.random()*.5});segs[i].sprites.push({k:pick(["fan0","fan1","fan2","fan3","cheer"]),x:1.35+Math.random()*.5})}
 segs[finishIdx].sprites.push({k:"gate",x:0,t:"FINISH"});
 for(i=finishIdx-8;i<finishIdx+30;i+=2){segs[i].sprites.push({k:pick(["fan0","fan1","fan2","fan3","flag","cheer"]),x:-1.3-Math.random()*.6});segs[i].sprites.push({k:pick(["fan0","fan1","fan2","fan3","flag","cheer"]),x:1.3+Math.random()*.6})}
 for(i=0;i<N;i++){if(segs[i].sprites.length)segs[i].sprites=segs[i].sprites.filter(function(q){return DEF[q.k]||q.k==="gate"})}
}
function findSeg(z){return segs[clamp(Math.floor(z/segLen),0,N-1)]}

/* ---------- typing text ---------- */
function chunk(){
 if(lv>=7&&Math.random()<.35)return pick(SENT2)+" ";
 if(lv>=5)return pick(SENT)+" ";
 var P=lv>=3?POOL1.concat(POOL2):POOL1,n=7+(Math.random()*3|0),a=[];for(var i=0;i<n;i++)a.push(pick(P));return a.join(" ")+" ";
}
function ensureLines(n){while(lines.length<n){while(pend.length<90)pend+=chunk();var cut=pend.lastIndexOf(" ",42);if(cut<8)cut=pend.indexOf(" ");lines.push(pend.slice(0,cut+1));pend=pend.slice(cut+1)}}
function renderText(){
 var h="",j,i,s;
 for(j=0;j<3;j++){s=lines[lineIdx+j];h+='<div class="rl'+(j?"":" cur")+'">';
  for(i=0;i<s.length;i++){var ch=s[i],cls="";if(j===0){cls=i<ci?"d":i===ci?"c"+(errFlash>0?" bad":""):""}h+="<span"+(cls?' class="'+cls+'"':"")+">"+(ch==="<"?"&lt;":ch==="&"?"&amp;":ch)+"</span>"}
  h+="</div>"}
 txEl.innerHTML=h;
}

/* ---------- crew ---------- */
var crewT=null;
function say(w,msg,force){
 var n=performance.now();if(!force&&n-lastSay<2300)return;lastSay=n;var C=CREW[w];
 crewEl.innerHTML='<div class="cav" style="--c:'+C.c+'">'+C.e+'</div><div class="cbub" style="--c:'+C.c+'"><b>'+C.n+'</b><span>'+msg+'</span></div>';
 crewEl.classList.remove("show");void crewEl.offsetWidth;crewEl.classList.add("show");clearTimeout(crewT);crewT=setTimeout(function(){crewEl.classList.remove("show")},3600);
}
function banner(t){ban.textContent=t;ban.classList.remove("show");void ban.offsetWidth;ban.classList.add("show")}

/* ---------- HUD ---------- */
function hud(){
 var n=correct+wrong,pos=curPos();
 $("#rLv").textContent=lv;$("#rPo").textContent=ord(pos)+"/6";$("#rWp").textContent=Math.round(wpmNow());$("#rAc").textContent=(n?Math.round(correct/n*100):100)+"%";
 $("#rKm").textContent=Math.max(0,Math.round(speed/topSpeed(lv)*(240+lv*10)));$("#rCo").textContent=combo;$("#rTg").textContent=TH?TH.wpm:"-";
}
function wpmNow(){return E/3.5*12}
function curPos(){var pz=position+playerZ,p=1;rivals.forEach(function(r){if(r.z>pz)p++});return p}

/* ---------- flow ---------- */
function rs(){return RS}
function showLevels(){
 var h='<div class="sbadge">TURBO TYPING RACER</div><h2>🏁 Choose your race</h2><p>Jitni tez typing, utni tez gaari! Galat key par gaari slow ya reverse ho jati hai. Top 3 me aao to agla level aur nayi car unlock.</p><div class="rlv">',l;
 for(l=1;l<=8;l++){var T=THEMES[l-1],un=l<=RS.un||RS.all,r=RS.r[l];h+='<button type="button" class="rcard'+(un?"":" lock")+'" data-l="'+l+'"'+(un?"":" disabled")+'><canvas data-l="'+l+'" width="150" height="86"></canvas><b>'+l+". "+T.n+'</b><small>'+T.ic+" "+T.wpm+" WPM · "+MODELS[l-1].n+'</small><i>'+(r?"★".repeat(r.s)+"☆".repeat(3-r.s)+" · "+r.w+" WPM":(un?"NEW":"🔒 Locked"))+"</i></button>"}
 h+='</div><div class="rbtns"><small>Esc = pause · Typing keys = gaari ka accelerator</small><button type="button" class="rlink" id="rAll">'+(RS.all?"🔒 Lock levels again":"🔓 Unlock all levels (teacher)")+"</button></div>";
 ov.innerHTML=h;ov.hidden=false;st="idle";
 ov.querySelectorAll("canvas[data-l]").forEach(function(c){var l=+c.dataset.l,T=THEMES[l-1],g=c.getContext("2d"),w=c.width,hh=c.height;var gr=g.createLinearGradient(0,0,0,hh*.6);gr.addColorStop(0,T.sky[0]);gr.addColorStop(1,T.sky[2]);g.fillStyle=gr;g.fillRect(0,0,w,hh);g.fillStyle=T.layers[0].c;g.beginPath();g.moveTo(0,hh*.6);for(var x=0;x<=w;x+=6)g.lineTo(x,hh*.6-(T.layers[0].h*hh*1.6)*(.5+.5*Math.sin(x*.05+l)));g.lineTo(w,hh*.6);g.fill();g.fillStyle=T.ground[0];g.fillRect(0,hh*.6,w,hh*.4);g.fillStyle=T.road[0];g.beginPath();g.moveTo(w*.42,hh*.6);g.lineTo(w*.58,hh*.6);g.lineTo(w*.9,hh);g.lineTo(w*.1,hh);g.fill();drawCar(g,w/2,hh-6,52,l-1,CARHUE[l-1],{})});
 ov.querySelectorAll(".rcard").forEach(function(b){b.onclick=function(){startLevel(+b.dataset.l);refocus()}});
 $("#rAll").onclick=function(){RS.all=RS.all?0:1;persist();showLevels();refocus()};
}
function startLevel(l){
 ensureAudio();engStart();lv=l;TH=THEMES[l-1];buildTrack();
 position=0;speed=0;lane=playerX=.25;tilt=0;E=0;correct=wrong=combo=maxCombo=0;errUntil=revUntil=0;rt=0;cd=3.6;lastC=0;brk=0;shk=0;flashA=0;finPos=0;coast=0;nitro=0;bounce=0;lastPos=6;revAnn=0;PT=[];
 var ref=refSpeed(l),rf=[.76,.86,.95,1.04,1.13].sort(function(){return Math.random()-.5}),hues=[],i,h0=CARHUE[l-1];
 rivals=[];for(i=0;i<5;i++){var hu;do{hu=Math.random()*360|0}while(Math.abs(((hu-h0+540)%360)-180)<35&&Math.random()<.9||hues.some(function(q){return Math.abs(q-hu)<40}));hues.push(hu);
  rivals.push({z:playerZ+260+i*330,x:LANES[[0,1,3,0,3][i]],lane:LANES[[0,1,3,0,3][i]],rf:rf[i],v:0,ph:rnd(0,6.28),hue:hu,m:Math.random()*7|0,tilt:0,fin:0,sat:rnd(70,95),lt:rnd(0,1)})}
 lines=[];pend="";lineIdx=0;ci=0;ensureLines(6);renderText();$("#rTg").textContent=TH.wpm;
 skyOff=0;LN=[];for(i=0;i<16;i++)LN.push({a:rnd(0,6.28),r:rnd(.35,1),l:rnd(.1,.35)});
 SNOW=[];for(i=0;i<130;i++)SNOW.push({x:rnd(0,1),y:rnd(0,1),s:rnd(.4,1.3)});
 st="count";ov.hidden=true;hud();kick();
 banner(TH.ic+" Level "+l+" · "+TH.n);
 say("z","Seat belt bandh lo! "+MODELS[l-1].n+" ready hai. Fingers home row par rakho.",true);
}
function pause(){if(st==="play"||st==="count"){DONE=st;st="paused";engSet(false);ov.innerHTML='<h2>Paused ⏸</h2><p>Esc dabao ya button click karo.</p><button type="button" id="sBtn" class="rbig">Resume</button><button type="button" class="rlink" id="rQuit">Back to levels</button>';ov.hidden=false;$("#sBtn").onclick=function(){resume();refocus()};$("#rQuit").onclick=function(){engStop();showLevels();refocus()}}}
function resume(){st=DONE||"play";ov.hidden=true;last=performance.now()}
function finishRace(){
 st="finish";finPos=1;var i;rivals.forEach(function(r){if(r.z>=finishZ)finPos++});coast=0;
 var stars=finPos===1?3:finPos<=3?2:1;banner(finPos===1?"🏆 1st PLACE!":"🏁 FINISH — "+ord(finPos));winSound();shk=8;
 say(finPos<=3?"z":"u",finPos===1?"Champion! Aap sab se aage ho! 🏆":finPos<=3?"Podium finish! Shabash! 👏":"Finish kar liya! Thori aur practice se podium aap ka.",true);
 for(i=0;i<60;i++)PT.push({k:"conf",x:rnd(0,W),y:rnd(-H*.3,0),vx:rnd(-60,60),vy:rnd(120,320),l:rnd(1.5,3),t:0,h:rnd(0,360)|0,r:rnd(0,6)});
}
function results(){
 st="done";doneAt=performance.now();engSet(false);var n=correct+wrong,acc=n?Math.round(correct/n*100):100,wpm=rt>2?Math.round(correct/5/(rt/60)):0,stars=finPos===1?3:finPos<=3?2:1,win=finPos<=3,prev=RS.r[lv];
 if(!prev||stars>prev.s||(stars===prev.s&&wpm>prev.w))RS.r[lv]={s:stars,w:wpm,a:acc};
 var newUnlock=win&&lv<8&&RS.un<lv+1;if(newUnlock)RS.un=lv+1;persist();
 var nx=lv<8&&win?'<div class="rnext"><canvas id="rPrev" width="170" height="90"></canvas><div><b>🚗 New car unlocked!</b><br><span>'+MODELS[lv].n+" · "+THEMES[lv].ic+" "+THEMES[lv].n+"</span></div></div>":"";
 ov.innerHTML='<h2>'+(win?(finPos===1?"🏆 Winner!":"🥈 Podium Finish!"):"🏁 Race finished")+'</h2><div class="stars2">'+"★".repeat(stars)+"☆".repeat(3-stars)+'</div><div class="sstats"><div><b>'+ord(finPos)+'</b><span>Position</span></div><div><b>'+wpm+'</b><span>WPM</span></div><div><b>'+acc+'%</b><span>Accuracy</span></div><div><b>'+wrong+'</b><span>Errors</span></div><div><b>'+maxCombo+'</b><span>Best streak</span></div><div><b>'+Math.round(rt)+'s</b><span>Time</span></div></div><p>'+(win?(lv<8?"Agla level unlock ho gaya! (Enter = next)":"Aap ne saare levels jeet liye! 👑"):"Podium (top 3) ke liye thori aur speed aur accuracy chahiye. Dobara try karo!")+"</p>"+nx+'<div class="rbtns2">'+(win&&lv<8?'<button type="button" class="rbig" id="rNext">Next level ▶</button>':"")+'<button type="button" class="rbig alt" id="rRetry">Retry</button><button type="button" class="rlink" id="rLvls">All levels</button></div>';
 ov.hidden=false;
 var pc=$("#rPrev");if(pc){var g=pc.getContext("2d");drawCar(g,85,80,96,lv,CARHUE[lv],{})}
 var nb=$("#rNext");if(nb)nb.onclick=function(){startLevel(lv+1);refocus()};$("#rRetry").onclick=function(){startLevel(lv);refocus()};$("#rLvls").onclick=function(){showLevels();refocus()};
}

/* ---------- input ---------- */
function key(k){
 if(k==="Escape"){if(st==="play"||st==="count")pause();else if(st==="paused"){resume()}return}
 if(st==="done"){if(k==="Enter"&&performance.now()-doneAt>1200){var nb=$("#rNext");if(nb)nb.click();else $("#rRetry").click()}return}
 if(st!=="play"){return}
 if(k.length!==1)return;
 var tg=lines[lineIdx][ci],now=performance.now()/1000;lastKeyT=now;
 if(k===tg){
  correct++;combo++;if(combo>maxCombo)maxCombo=combo;E+=1;ci++;errFlash=0;
  if(ci>=lines[lineIdx].length){lineIdx++;ci=0;ensureLines(lineIdx+6);if(lineIdx>30){lines.splice(0,lineIdx-2);lineIdx=2}}
  renderText();bounce=1;
  if(combo%10===0){nitro=Math.max(nitro,3);if(combo===10||combo===25||combo%50===0)banner("🔥 "+combo+" streak! NITRO");tone(600,1600,.25,"sawtooth",.04,0);say("b",pick(["Perfect rhythm! Nitro on! 🔥","Kya baat hai! Aise hi chalte raho!","Zabardast! Sahi keys ka toofan!"]),true)}
  else tone(900+Math.min(600,combo*8),1100,.03,"sine",.02,0);
 }else{
  wrong++;combo=0;errFlash=.4;renderText();
  if(TH.rev){revUntil=now+1.0;E*=.15;shk=14;flashA=.7;flashC="255,150,40";screech();say("u",pick(["Gaari pahaar se peeche ja rahi hai! ⛰️ Sahi key dabao.","Reverse! Pehle ye key sahi type karo: ‘"+(tg===" "?"Space":tg)+"’"]),true);if(!revAnn){revAnn=1}}
  else{errUntil=now+1.1;E*=.45;shk=10;flashA=.6;flashC="255,60,70";screech();say("u",pick(["Oops! Slip ho gayi. Wahi key dobara dabao.","Dhyan se! Sahi key: ‘"+(tg===" "?"Space":tg)+"’","Accuracy pehle, speed baad me!"]),true)}
  if(k.toLowerCase()===tg.toLowerCase())say("z","Shift / Caps Lock check karo!",true);
  for(var i=0;i<8;i++)PT.push({k:"smoke",x:pcx+rnd(-pcw*.4,pcw*.4),y:pcy,vx:rnd(-30,30),vy:rnd(-40,-10),l:rnd(.6,1.1),t:0,s:rnd(10,24)});
  sadSound();
 }
}
window.raceKey=key;

/* ---------- update ---------- */
function update(dt){
 var now=performance.now()/1000,T=TH,i,ref=refSpeed(lv),top=topSpeed(lv);
 shk*=Math.exp(-7*dt);flashA*=Math.exp(-4*dt);bounce*=Math.exp(-9*dt);if(errFlash>0){errFlash-=dt;if(errFlash<=0){errFlash=0;if(st==="play")renderText()}}
 if(st==="count"){cd-=dt;var pc=Math.max(0,Math.ceil(cd-.6));if(cd<=0){st="play";banner("GO! 🚦");tone(600,1300,.4,"square",.05,0)}else if(pc!==lastC&&pc>0){lastC=pc;tone(440,440,.14,"square",.04,0)}
  rivals.forEach(function(r){r.v=0})}
 var play=st==="play"||st==="finish";
 if(play){
  if(st==="play")rt+=dt;
  E*=Math.exp(-dt/3.5);
  var target;
  if(st==="finish"){coast+=dt;target=ref*.7;if(coast>3)results()}
  else{
   target=clamp(wpmNow()/T.wpm,0,1.45)*ref;
   if(nitro>0){nitro-=dt;target*=1.1}
   if(now<errUntil)target*=.45;
   if(now<revUntil){target=-ref*.3;if(now-lastRevBeep>.32){lastRevBeep=now;tone(880,880,.1,"square",.03,0)}}
   target=Math.min(target,top*1.05);
  }
  brk=speed>target+250?1:0;if(speed<target)speed+=Math.min(target-speed,5200*dt);else speed-=Math.min(speed-target,10500*dt);
  position+=speed*dt;if(position<0){position=0;if(speed<0)speed=0}
  if(st==="play"&&position+playerZ>=finishZ)finishRace();
  skyOff+=findSeg(position+playerZ).curve*speed/top*dt*38;
 }
 /* rivals */
 var all=rivals.concat([{z:position+playerZ,x:playerX,speed:speed,lane:lane,isP:1}]),ramp=st==="play"||st==="finish"?Math.min(1,rt/3.2+.15):0;
 rivals.forEach(function(r){
  var sp=ref*r.rf*(1+.045*Math.sin(now*.6+r.ph))*(st==="count"?0:ramp);if(r.z>=finishZ+segLen*30)sp*=.4;
  r.speed=sp;r.v+=(sp-r.v)*Math.min(1,dt*1.6);r.z=Math.min(r.z+r.v*dt,(N-3)*segLen);if(r.z>=finishZ)r.fin=1;
  r.lt-=dt;if(r.lt<=0){r.lt=rnd(.25,.5);lanePick(r,all)}
  var dx=clamp(r.lane-r.x,-dt*1.1,dt*1.1);r.x+=dx;r.tilt+=((dx/dt||0)*.12-r.tilt)*Math.min(1,dt*6);
 });
 if(play){var me=all[all.length-1];me.speed=speed;if(Math.random()<dt*4)lanePick(me,all);lane=me.lane;var dx=clamp(lane-playerX,-dt*1.1,dt*1.1);playerX+=dx;tilt+=((dx/dt||0)*.12-tilt)*Math.min(1,dt*6)}
 /* overtake events */
 if(st==="play"){var p=curPos();if(p<lastPos){banner("🚀 Overtake! "+ord(p)+" place");tone(500,1200,.22,"triangle",.06,0);say("z",pick(["Overtake! Shabash! 🚀","Ek aur gaari peeche! Aise hi!"]));}else if(p>lastPos&&rt>4){say("u",pick(["Rival aage nikal gaya! Speed barhao!","Ek gaari ne overtake kiya, fingers tez!"]))}lastPos=p}
 /* particles */
 var sp01=clamp(speed/top,0,1.3);
 if(play&&Math.abs(speed)>400&&Math.random()<dt*40*sp01)PT.push({k:"dust",x:pcx+(Math.random()<.5?-1:1)*pcw*.42,y:pcy-2,vx:rnd(-60,60),vy:rnd(-50,-10),l:rnd(.4,.8),t:0,s:rnd(6,14),c:"#d6d6d6"});
 if(play&&speed<-200&&Math.random()<dt*50)PT.push({k:"spark",x:pcx+rnd(-pcw*.4,pcw*.4),y:pcy,vx:rnd(-120,120),vy:rnd(-160,-20),l:rnd(.2,.5),t:0});
 for(i=PT.length-1;i>=0;i--){var q=PT[i];q.t+=dt;if(q.t>=q.l){PT.splice(i,1);continue}q.x+=q.vx*dt;q.y+=q.vy*dt;if(q.k==="conf")q.r+=dt*8}
 SNOW.forEach(function(s){s.y+=dt*(.18+.2*s.s)*(1+sp01);s.x+=dt*(.02-sp01*.0)*s.s;if(s.y>1){s.y=0;s.x=Math.random()}});
 LN.forEach(function(l){l.r+=dt*(.5+sp01*1.8);if(l.r>1.2){l.r=rnd(.15,.3);l.a=rnd(0,6.28)}});
 engSet(play);
 hudT+=dt;if(hudT>.1){hudT=0;hud()}
}
function lanePick(c,all){
 var look=1500+Math.abs(c.speed||0)*.3,blocked=false;
 all.forEach(function(o){if(o===c)return;var dz=o.z-c.z;if(dz>0&&dz<look&&Math.abs(o.x-c.x)<.4&&(c.speed||0)>(o.speed||0)*.97)blocked=true});
 if(!blocked)return;var best=null;
 LANES.forEach(function(l){if(Math.abs(l-c.x)>.62)return;var ok=true;all.forEach(function(o){if(o===c)return;var dz=o.z-c.z;if(dz>-650&&dz<look&&Math.abs(o.x-l)<.42)ok=false});if(ok&&(best===null||Math.abs(l-c.x)<Math.abs(best-c.x)))best=l});
 if(best!==null)c.lane=best;
}

/* ---------- drawing ---------- */
function project(p,cx,cy,cz){p.camera.x=-cx;p.camera.y=(p.world.y||0)-cy;p.camera.z=(p.world.z||0)-cz;p.screen.scale=camDepth/p.camera.z;p.screen.x=Math.round(W/2+p.screen.scale*p.camera.x*W/2);p.screen.y=Math.round(H/2-p.screen.scale*p.camera.y*H/2);p.screen.w=Math.round(p.screen.scale*roadW*W/2)}
function poly(x1,y1,x2,y2,x3,y3,x4,y4,c){ctx.fillStyle=c;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.lineTo(x3,y3);ctx.lineTo(x4,y4);ctx.closePath();ctx.fill()}
var CITY=null;
function drawBackground(tm){
 var T=TH,hz=H/2,g=ctx.createLinearGradient(0,0,0,hz+4);g.addColorStop(0,T.sky[0]);g.addColorStop(.6,T.sky[1]);g.addColorStop(1,T.sky[2]);ctx.fillStyle=g;ctx.fillRect(0,0,W,hz+4);
 ctx.fillStyle=T.ground[1];ctx.fillRect(0,hz,W,H-hz);
 var i;
 if(T.night){ctx.fillStyle="#fff";for(i=0;i<70;i++){var sx=((i*127.1+skyOff*.15)%W+W)%W,sy=(i*53.7%(hz*.8));ctx.globalAlpha=.3+.7*Math.abs(Math.sin(tm*1.4+i));ctx.fillRect(sx,sy,1.6,1.6)}ctx.globalAlpha=1}
 if(T.aurora){ctx.globalCompositeOperation="lighter";[["60,255,170",50],["120,120,255",90],["60,220,255",130]].forEach(function(a,k){var gr=ctx.createLinearGradient(0,a[1]-30,0,a[1]+150);gr.addColorStop(0,"rgba("+a[0]+",0)");gr.addColorStop(.35,"rgba("+a[0]+",.32)");gr.addColorStop(1,"rgba("+a[0]+",0)");ctx.fillStyle=gr;ctx.beginPath();ctx.moveTo(0,a[1]+Math.sin(tm*.5+k)*20);for(var x=0;x<=W;x+=12)ctx.lineTo(x,a[1]+Math.sin(x*.012+tm*.5+k*2)*28+Math.sin(x*.03+tm*.9)*8);for(x=W;x>=0;x-=12)ctx.lineTo(x,a[1]+150+Math.sin(x*.01+tm*.4+k)*30);ctx.closePath();ctx.fill()});ctx.globalCompositeOperation="source-over"}
 var b=T.sun||T.moon;if(b){var bx=((b.x*W+skyOff*.08)%(W+200)+W+200)%(W+200)-100,by=b.y*hz*1.5,rr=b.r*hs;var gl=ctx.createRadialGradient(bx,by,rr*.3,bx,by,rr*3.2);gl.addColorStop(0,T.moon?"rgba(210,215,255,.5)":"rgba(255,240,170,.6)");gl.addColorStop(1,"rgba(255,240,170,0)");ctx.fillStyle=gl;ctx.beginPath();ctx.arc(bx,by,rr*3.2,0,6.2832);ctx.fill();ctx.fillStyle=b.c;ctx.beginPath();ctx.arc(bx,by,rr,0,6.2832);ctx.fill()}
 if(!T.night){ctx.fillStyle=lv===5?"rgba(255,190,150,.5)":"rgba(255,255,255,.78)";for(i=0;i<6;i++){var cx=(((i*257+skyOff*.2+tm*6)%(W+300))+W+300)%(W+300)-150,cy=hz*(.22+(i%3)*.17),cs=(26+i%3*10)*hs;ctx.beginPath();ctx.arc(cx,cy,cs,0,6.2832);ctx.arc(cx+cs*.9,cy+4,cs*.75,0,6.2832);ctx.arc(cx-cs*.9,cy+6,cs*.7,0,6.2832);ctx.arc(cx+cs*.2,cy-cs*.5,cs*.7,0,6.2832);ctx.fill()}}
 T.layers.forEach(function(L,li){
  var off=skyOff*L.p,base=hz+6;ctx.fillStyle=L.c;
  if(L.city){var tile=1500,x0=-((off%tile)+tile)%tile;ctx.beginPath();for(var t0=x0;t0<W+tile;t0+=tile){var xx=t0,k=0;while(xx<t0+tile&&xx<W+60){var h2=((k*7919+li*131)%97)/97,bw=(34+((k*53)%40))*hs*(L.w?1.1:1),bh=(.35+h2*.65)*L.h*H;ctx.rect(xx,base-bh,bw-2,bh+6);xx+=bw;k++}}ctx.fill();
   ctx.fillStyle=li?"rgba(255,230,120,.65)":"rgba(120,230,255,.4)";for(var t1=x0;t1<W+tile;t1+=tile){var x2=t1,k2=0;while(x2<t1+tile&&x2<W+60){var h3=((k2*7919+li*131)%97)/97,bw2=(34+((k2*53)%40))*hs*(L.w?1.1:1),bh2=(.35+h3*.65)*L.h*H;for(var wy=base-bh2+8;wy<base-8;wy+=11){if(((wy*3+k2*7)|0)%3===0)ctx.fillRect(x2+5,wy,3,4)}x2+=bw2;k2++}}
   return}
  ctx.beginPath();ctx.moveTo(0,base+2);
  for(var x=0;x<=W+8;x+=8){var u=(x+off)*L.f,n;if(L.flat)n=.5+.5*Math.sin(u*3+tm*.8)*.15;else if(L.sharp)n=1-Math.abs(Math.sin(u+L.s)*.62+Math.sin(u*2.3+L.s*2)*.38);else n=(Math.sin(u+L.s)*.5+.5)*.6+(Math.sin(u*2.1+L.s*3)*.5+.5)*.4;ctx.lineTo(x,base-L.h*H*n)}
  ctx.lineTo(W,base+2);ctx.closePath();ctx.fill();
  if(L.cap){ctx.save();ctx.clip();var cg=ctx.createLinearGradient(0,base-L.h*H,0,base-L.h*H*.6);cg.addColorStop(0,"rgba(255,255,255,.95)");cg.addColorStop(1,"rgba(255,255,255,0)");ctx.fillStyle=cg;ctx.fillRect(0,base-L.h*H,W,L.h*H*.4);ctx.restore()}
 });
}
function drawSegment(seg,n){
 var T=TH,a=seg.p1.screen,b=seg.p2.screen,c=seg.col,r1=a.w/8,r2=b.w/8;
 ctx.fillStyle=T.ground[c];ctx.fillRect(0,b.y,W,a.y-b.y);
 poly(a.x-a.w-r1,a.y,a.x-a.w,a.y,b.x-b.w,b.y,b.x-b.w-r2,b.y,T.rumble[c]);poly(a.x+a.w+r1,a.y,a.x+a.w,a.y,b.x+b.w,b.y,b.x+b.w+r2,b.y,T.rumble[c]);
 poly(a.x-a.w,a.y,a.x+a.w,a.y,b.x+b.w,b.y,b.x-b.w,b.y,T.road[c]);
 if(seg.index>=finishIdx&&seg.index<finishIdx+2){for(var q=0;q<8;q++){var f=q/8,f2=(q+1)/8;poly(a.x-a.w+a.w*2*f,a.y,a.x-a.w+a.w*2*f2,a.y,b.x-b.w+b.w*2*f2,b.y,b.x-b.w+b.w*2*f,b.y,(q+seg.index)%2?"#fff":"#16181f")}}
 else if(seg.index>=10&&seg.index<12){poly(a.x-a.w,a.y,a.x+a.w,a.y,b.x+b.w,b.y,b.x-b.w,b.y,"rgba(255,255,255,.75)")}
 else if(seg.dash){var lw1=a.w/Math.max(30,32),lw2=b.w/Math.max(30,32),l1=a.w*2/4,l2=b.w*2/4;for(var ln=1;ln<4;ln++){var x1=a.x-a.w+l1*ln,x2=b.x-b.w+l2*ln;poly(x1-lw1/2,a.y,x1+lw1/2,a.y,x2+lw2/2,b.y,x2-lw2/2,b.y,T.lane)}}
}
function drawGate(seg,sp){
 var p=seg.p1.screen,s=p.scale*W/2,half=roadW*1.15*s,top=p.y-3000*s,bw=2*half+160*s;if(s<.0004)return;
 ctx.save();ctx.beginPath();ctx.rect(0,0,W,Math.max(0,seg.clip));ctx.clip();
 var g=ctx.createLinearGradient(0,top,0,p.y);g.addColorStop(0,"#3a3f66");g.addColorStop(1,"#1a1d33");ctx.fillStyle=g;ctx.fillRect(p.x-half-80*s,top,160*s,p.y-top);ctx.fillRect(p.x+half-80*s,top,160*s,p.y-top);
 var bg=ctx.createLinearGradient(p.x-half,0,p.x+half,0);bg.addColorStop(0,sp.t==="START"?"#0fa87a":"#2f4fd8");bg.addColorStop(1,sp.t==="START"?"#19d3b0":"#7a58f0");ctx.fillStyle=bg;ctx.fillRect(p.x-half-80*s,top,bw,720*s);
 for(var i=0;i<14;i++){ctx.fillStyle=i%2?"#fff":"#16181f";ctx.fillRect(p.x-half-80*s+bw/14*i,top+720*s,bw/14,90*s)}
 ctx.fillStyle="#fff";ctx.font="800 "+(520*s|0)+"px Tahoma,sans-serif";ctx.textAlign="center";ctx.textBaseline="middle";ctx.shadowColor="rgba(0,0,0,.5)";ctx.shadowBlur=8*s*10;ctx.fillText(sp.t,p.x,top+370*s);ctx.shadowBlur=0;
 if(sp.t==="START"){var lc=st==="count"?(cd>2.6?1:cd>1.6?2:cd>.6?3:4):4;for(i=0;i<3;i++){ctx.fillStyle=lc===4?"#35f08a":(lc>i?"#ff3344":"#3a1218");ctx.shadowColor=ctx.fillStyle;ctx.shadowBlur=(lc===4||lc>i)?18:0;ctx.beginPath();ctx.arc(p.x+(i-1)*bw*.12,top+860*s+250*s,120*s,0,6.2832);ctx.fill()}ctx.shadowBlur=0}
 ctx.restore();
}
function drawSprites(n){
 var seg=segs[n];if(!seg)return;var a=seg.p1.screen,b=seg.p2.screen;if(seg.p1.camera.z<=camDepth)return;
 var fade=clamp((drawDist-(n-baseIdx))/60,0,1);
 seg.cars.forEach(function(c){
  var pc=(c.z%segLen)/segLen,sc=lerp(a.scale,b.scale,pc),x=lerp(a.x,b.x,pc)+sc*c.x*roadW*W/2,y=lerp(a.y,b.y,pc),w=carW*sc*W/2;if(w<3)return;
  ctx.save();ctx.globalAlpha=fade;ctx.beginPath();ctx.rect(0,0,W,Math.max(0,seg.clip));ctx.clip();drawCar(ctx,x,y,w,c.m,c.hue,{tilt:c.tilt,sat:c.sat,brake:c.v<c.speed*.9?1:0});ctx.restore()});
 seg.sprites.forEach(function(sp){
  if(sp.k==="gate"){drawGate(seg,sp);return}
  var S=spr(sp.k),sc=a.scale,x=a.x+sc*sp.x*roadW*W/2,y=a.y,w=S.w*sc*W/2,h=w*S.a;if(w<2)return;
  var clipH=Math.max(0,y-seg.clip);if(clipH>=h)return;
  if(sp.x<0)x-=w*.0;ctx.globalAlpha=fade;
  var sh=S.c.height*(1-clipH/h);ctx.drawImage(S.c,0,0,S.c.width,sh,x-w/2,y-h,w,h-clipH);ctx.globalAlpha=1});
}
var baseIdx=0;
function render(tm){
 var T=TH,i,n,seg;ctx.setTransform(dpr,0,0,dpr,0,0);
 ctx.save();if(shk>.4&&!reduce)ctx.translate(rnd(-shk,shk),rnd(-shk,shk)*.6);
 var bSeg=findSeg(position),bp=(position%segLen)/segLen,pSeg=findSeg(position+playerZ),pp=((position+playerZ)%segLen)/segLen,pY=lerp(pSeg.p1.world.y,pSeg.p2.world.y,pp);
 baseIdx=bSeg.index;drawBackground(tm);
 var maxy=H,x=0,dx=-(bSeg.curve*bp),camX=playerX*roadW,camY=pY+camH+bounce*18*Math.sin(tm*40);
 for(n=0;n<drawDist;n++){var idx=baseIdx+n;if(idx>=N)break;seg=segs[idx];seg.clip=maxy;
  project(seg.p1,camX-x,camY,position);project(seg.p2,camX-x-dx,camY,position);x+=dx;dx+=seg.curve;
  if(seg.p1.camera.z<=camDepth||seg.p2.screen.y>=seg.p1.screen.y||seg.p2.screen.y>=maxy)continue;
  drawSegment(seg,n);maxy=seg.p1.screen.y}
 /* fog band */
 var fg=ctx.createLinearGradient(0,H/2-4,0,H/2+H*.2);fg.addColorStop(0,T.fog);fg.addColorStop(1,"rgba(0,0,0,0)");ctx.globalAlpha=.65;ctx.fillStyle=fg;ctx.fillRect(0,H/2-4,W,H*.2);ctx.globalAlpha=1;
 var ac2=[];rivals.forEach(function(r){var s2=findSeg(r.z);s2.cars.push(r);ac2.push(s2)});
 for(n=drawDist-1;n>=0;n--){var id2=baseIdx+n;if(id2<N)drawSprites(id2)}
 ac2.forEach(function(s2){s2.cars.length=0});
 /* player car */
 var psc=camDepth/playerZ,pw=carW*psc*W/2*1.05,py=H/2-psc*(lerp(pSeg.p1.camera.y||0,pSeg.p2.camera.y||0,pp))*H/2;
 if(!isFinite(py))py=H*.86;py=Math.min(py,H)-H*.05;
 var sp01=clamp(speed/topSpeed(lv),0,1.3),bobY=Math.sin(tm*38)*sp01*1.4*hs+(bounce*3);
 pcx=W/2;pcy=py;pcw=pw;
 drawCar(ctx,W/2,py+bobY,pw,lv-1,CARHUE[lv-1],{tilt:tilt,brake:(st==="play"||st==="finish")?brk:0,rev:speed<-60,flame:nitro>0?1:(sp01>.6?.35:0),nitro:nitro>0});
 /* speed lines */
 if(sp01>.55){ctx.save();ctx.globalAlpha=Math.min(.5,(sp01-.5)*.7);ctx.strokeStyle="#fff";ctx.lineWidth=1.5;LN.forEach(function(l){var r1=Math.min(W,H)*.36*l.r,r2=r1+Math.min(W,H)*(.15+l.l*sp01);ctx.beginPath();ctx.moveTo(W/2+Math.cos(l.a)*r1*1.6,H*.45+Math.sin(l.a)*r1);ctx.lineTo(W/2+Math.cos(l.a)*r2*1.6,H*.45+Math.sin(l.a)*r2);ctx.stroke()});ctx.restore()}
 /* weather */
 if(T.weather==="snow"){ctx.fillStyle="rgba(255,255,255,.85)";SNOW.forEach(function(s){ctx.beginPath();ctx.arc(s.x*W,s.y*H,1.2+s.s*1.6,0,6.2832);ctx.fill()})}
 if(T.weather==="rain"){ctx.strokeStyle="rgba(170,200,255,.45)";ctx.lineWidth=1.2;SNOW.forEach(function(s){var rx=s.x*W,ry=s.y*H;ctx.beginPath();ctx.moveTo(rx,ry);ctx.lineTo(rx-5,ry+16+s.s*8);ctx.stroke()})}
 /* particles */
 PT.forEach(function(q){var a=1-q.t/q.l;if(q.k==="dust"){ctx.fillStyle=q.c;ctx.globalAlpha=a*.5;ctx.beginPath();ctx.arc(q.x,q.y,q.s*(1+q.t*2),0,6.2832);ctx.fill()}
  else if(q.k==="smoke"){ctx.fillStyle="rgba(230,230,235,"+a*.55+")";ctx.beginPath();ctx.arc(q.x,q.y,q.s*(1+q.t*2.4),0,6.2832);ctx.fill()}
  else if(q.k==="spark"){ctx.globalCompositeOperation="lighter";ctx.fillStyle="rgba(255,190,80,"+a+")";ctx.fillRect(q.x,q.y,3,3);ctx.globalCompositeOperation="source-over"}
  else if(q.k==="conf"){ctx.fillStyle="hsl("+q.h+",90%,60%)";ctx.save();ctx.translate(q.x,q.y);ctx.rotate(q.r);ctx.fillRect(-4,-2,8,4);ctx.restore()}ctx.globalAlpha=1});
 ctx.restore();
 /* screen overlays */
 if(flashA>.02){ctx.fillStyle="rgba("+flashC+","+Math.min(.5,flashA*.5)+")";ctx.fillRect(0,0,W,H)}
 if(T.night){var vg=ctx.createRadialGradient(W/2,H/2,Math.min(W,H)*.4,W/2,H/2,Math.max(W,H)*.75);vg.addColorStop(0,"rgba(0,0,10,0)");vg.addColorStop(1,"rgba(0,0,15,.45)");ctx.fillStyle=vg;ctx.fillRect(0,0,W,H)}
 drawHUD(tm);
}
function drawHUD(tm){
 var T=TH,pos=curPos(),k;ctx.save();ctx.textBaseline="middle";
 /* position badge */
 ctx.fillStyle="rgba(8,10,40,.62)";ctx.beginPath();ctx.roundRect?ctx.roundRect(12,12,150*hs,58*hs,14):ctx.rect(12,12,150*hs,58*hs);ctx.fill();
 ctx.fillStyle="#ffd54a";ctx.font="800 "+(36*hs|0)+"px Tahoma,sans-serif";ctx.textAlign="left";ctx.fillText(ord(pos),24,40*hs);var pw0=ctx.measureText(ord(pos)).width;ctx.fillStyle="#fff";ctx.font="700 "+(15*hs|0)+"px Tahoma,sans-serif";ctx.fillText("/ 6",24+pw0+6,46*hs);
 ctx.font="700 "+(11*hs|0)+"px Tahoma,sans-serif";ctx.fillStyle="rgba(255,255,255,.75)";ctx.fillText(T.ic+" "+T.n,24,61*hs);
 /* progress */
 var bw=Math.min(380,W*.42),bx=W/2-bw/2+40*hs,by=24;ctx.fillStyle="rgba(8,10,40,.55)";ctx.beginPath();ctx.roundRect?ctx.roundRect(bx-12,by-12,bw+24,26,13):ctx.rect(bx-12,by-12,bw+24,26);ctx.fill();ctx.fillStyle="rgba(255,255,255,.25)";ctx.fillRect(bx,by-2,bw,4);
 ctx.fillStyle="#fff";ctx.fillRect(bx+bw-2,by-8,3,16);
 rivals.forEach(function(r){ctx.fillStyle="hsl("+r.hue+",90%,60%)";ctx.beginPath();ctx.arc(bx+clamp(r.z/finishZ,0,1)*bw,by,5,0,6.2832);ctx.fill()});
 ctx.fillStyle="#fff";ctx.strokeStyle="hsl("+CARHUE[lv-1]+",100%,60%)";ctx.lineWidth=3;ctx.beginPath();ctx.arc(bx+clamp((position+playerZ)/finishZ,0,1)*bw,by,7,0,6.2832);ctx.fill();ctx.stroke();
 /* speedometer */
 var R=54*hs,cx=W-R-22,cy=H-R*.55-18,sp=clamp(speed/(topSpeed(lv)*1.1),0,1);
 ctx.fillStyle="rgba(8,10,40,.62)";ctx.beginPath();ctx.arc(cx,cy,R+10,Math.PI,0);ctx.lineTo(cx+R+10,cy+16*hs);ctx.lineTo(cx-R-10,cy+16*hs);ctx.closePath();ctx.fill();
 ctx.lineWidth=9*hs;ctx.lineCap="round";ctx.strokeStyle="rgba(255,255,255,.18)";ctx.beginPath();ctx.arc(cx,cy,R-4,Math.PI,2*Math.PI);ctx.stroke();
 var gr=ctx.createLinearGradient(cx-R,0,cx+R,0);gr.addColorStop(0,"#35f08a");gr.addColorStop(.6,"#ffd54a");gr.addColorStop(1,"#ff3b5c");ctx.strokeStyle=gr;ctx.beginPath();ctx.arc(cx,cy,R-4,Math.PI,Math.PI+Math.PI*sp);ctx.stroke();
 ctx.fillStyle="#fff";ctx.textAlign="center";ctx.font="800 "+(26*hs|0)+"px Tahoma,sans-serif";ctx.fillText(Math.max(0,Math.round(speed/topSpeed(lv)*(240+lv*10))),cx,cy-6*hs);ctx.font="700 "+(10*hs|0)+"px Tahoma,sans-serif";ctx.fillStyle="rgba(255,255,255,.7)";ctx.fillText("km/h · "+Math.round(wpmNow())+" WPM",cx,cy+10*hs);
 /* reverse alert */
 if(performance.now()/1000<revUntil&&Math.floor(tm*8)%2){ctx.fillStyle="rgba(255,120,30,.95)";ctx.font="800 "+(30*hs|0)+"px Tahoma,sans-serif";ctx.textAlign="center";ctx.shadowColor="#000";ctx.shadowBlur=10;ctx.fillText("⚠ REVERSE! Sahi key dabao",W/2,H*.36);ctx.shadowBlur=0}
 if(nitro>0){ctx.fillStyle="rgba(90,190,255,.95)";ctx.font="800 "+(20*hs|0)+"px Tahoma,sans-serif";ctx.textAlign="center";ctx.shadowColor="#2a8cff";ctx.shadowBlur=14;ctx.fillText("🔥 NITRO",W/2,H*.27);ctx.shadowBlur=0}
 /* countdown */
 if(st==="count"){var c=cd>2.6?3:cd>1.6?2:cd>.6?1:0,lab=c?String(c):"GO!",fr=(cd>.6?cd%1:cd/.6);ctx.textAlign="center";ctx.font="800 "+((110+(1-fr)*20)*hs|0)+"px Tahoma,sans-serif";ctx.fillStyle=c?"#ffd54a":"#35f08a";ctx.shadowColor=ctx.fillStyle;ctx.shadowBlur=30;ctx.globalAlpha=clamp(fr*1.5,0,1);ctx.fillText(lab,W/2,H*.42);ctx.globalAlpha=1;ctx.shadowBlur=0}
 ctx.restore();
}

/* ---------- loop ---------- */
function resize(){var r=cv.getBoundingClientRect();if(!r.width)return;dpr=Math.min(2,window.devicePixelRatio||1);W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);hs=clamp(H/520,.7,1.15)}
function loop(n){raf=0;if(!active)return;var dt=Math.min(.05,(n-last)/1000||0);last=n;if(TH){if(st!=="paused"&&st!=="idle"&&st!=="done")update(dt);else if(st==="done"){for(var i=PT.length-1;i>=0;i--){PT[i].t+=dt;if(PT[i].t>=PT[i].l)PT.splice(i,1)}}render(performance.now()/1000)}else{ctx.setTransform(dpr,0,0,dpr,0,0);var g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,"#0b1240");g.addColorStop(1,"#3a1a7a");ctx.fillStyle=g;ctx.fillRect(0,0,W,H)}raf=requestAnimationFrame(loop)}
function kick(){if(!raf){last=performance.now();raf=requestAnimationFrame(loop)}}
window.raceCtl={enter:function(){active=true;resize();if(st==="idle"||!TH)showLevels();kick()},leave:function(){active=false;engStop();st="idle";TH=null;ov.hidden=false}};
window.addEventListener("resize",resize);
rv.addEventListener("pointerdown",function(e){if(e.target.closest("button"))return;refocus()});
})();

/* ---------------- Games tab navigation ---------------- */
(function(){
var views={hub:$("#gamesHub"),bubble:$("#gameView"),shoot:$("#shootView"),race:$("#raceView"),online:$("#onlineView")},cur=null;
function showGame(n){
 if(cur==="bubble")window.bubbleCtl.leave();if(cur==="shoot")window.shootCtl.leave();if(cur==="race")window.raceCtl.leave();if(cur==="online")window.onlineCtl.leave();
 Object.keys(views).forEach(function(k){views[k].hidden=(k!==n)});
 cur=n;
 if(n==="bubble")window.bubbleCtl.enter();else if(n==="shoot")window.shootCtl.enter();else if(n==="race")window.raceCtl.enter();else if(n==="online")window.onlineCtl.enter();
 refocus();
}
window.gameKey=function(k){
 if(cur==="bubble")window.bubbleKey(k);else if(cur==="shoot")window.shootKey(k);else if(cur==="race")window.raceKey(k);else if(cur==="online")window.onlineKey(k);
 else if(cur==="hub"){if(k==="1")showGame("shoot");else if(k==="2")showGame("bubble");else if(k==="3")showGame("race")}
};
document.querySelectorAll(".gcard[data-game]").forEach(function(c){c.addEventListener("click",function(){ensureAudio();showGame(c.dataset.game)})});
document.querySelectorAll("[data-back]").forEach(function(b){b.addEventListener("click",function(){showGame("hub")})});
document.querySelectorAll(".tab").forEach(function(t){t.addEventListener("click",function(){
 var g=t.dataset.tab==="games"||t.dataset.tab==="online";
 document.querySelectorAll(".tab").forEach(function(x){x.classList.toggle("on",x===t)});
 var f=t.dataset.tab==="faq";$(".layout").hidden=g||f;$("#about").hidden=!f;window.GAME_ON=g||f;
 if(g){var pb=$("#pause");if(pb&&/^pause/i.test(pb.textContent))pb.click();showGame(t.dataset.tab==="online"?"online":"hub")}
 else{showGame(null);}
 refocus()})});
document.querySelectorAll(".tab").forEach(function(t){t.addEventListener("click",function(){try{history.replaceState(null,"",t.dataset.tab==="lessons"?location.pathname+location.search:"#"+t.dataset.tab)}catch(e){}})});
function route(){var h=location.hash.slice(1),t=document.querySelector('.tab[data-tab="'+h+'"]');if(t&&!t.classList.contains("on"))t.click()}
addEventListener("hashchange",route);addEventListener("DOMContentLoaded",route);
})();
})();