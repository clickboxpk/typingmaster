/* Auto-fit: har screen par content viewport ke andar fit hota hai (koi page scroll nahi) */
(function(){"use strict";
var VIEWS=".layout,#gamesHub,#shootView,#raceView,#gameView,#onlineView,#about",
CHK=".window,.work,.main,.side,.prompt,.lessons,.hubgrid,.seo-info,.ar-wrap",
raf=0,self=false;
function all(){return document.querySelectorAll(VIEWS)}
all().forEach(function(e){e.classList.add("fit")});
function ok(e){
  if(e.scrollHeight>e.clientHeight+1||e.scrollWidth>e.clientWidth+1)return false;
  var n=e.querySelectorAll(CHK);
  for(var i=0;i<n.length;i++)if(n[i].scrollHeight>n[i].clientHeight+1)return false;
  return true;
}
function fit(e,full){
  if(e.hidden)return;
  var min=matchMedia("(max-width:640px)").matches?.5:.5,
      z=full?1:(parseFloat(e.style.getPropertyValue("--z"))||1),old=z;
  e.style.setProperty("--z",z);
  while(!ok(e)&&z>min){z=Math.round((z-.04)*100)/100;e.style.setProperty("--z",z)}
  e.classList.toggle("fit-scroll",!ok(e));
  if(z!==old&&/#(shoot|race|game|online)View/.test("#"+e.id)){nudge()}
}
function nudge(){if(self)return;self=true;setTimeout(function(){window.dispatchEvent(new Event("resize"));self=false},60)}
function run(full){cancelAnimationFrame(raf);raf=requestAnimationFrame(function(){all().forEach(function(e){fit(e,full)})})}
addEventListener("resize",function(){if(!self)run(true)});
new MutationObserver(function(){run(true)}).observe(document.querySelector(".app"),{subtree:true,attributes:true,attributeFilter:["hidden"]});
var pr=document.getElementById("prompt");
if(pr)new MutationObserver(function(){run(false)}).observe(pr,{childList:true});
document.addEventListener("click",function(){setTimeout(function(){run(true)},80)});
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){run(true)});
run(true);
})();
