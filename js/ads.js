/* Adsterra ads loader - ads page load ke baad (lazy) lagte hain taa-ke site fast rahe.
   Har banner apne sandboxed iframe me chalta hai (site ka code ad script se mehfooz rehta hai). */
(function () {
  "use strict";
  var A = (window.PSDC_CONFIG || {}).ads || {};
  if (!A.enabled) return;

  var mobile = matchMedia("(max-width:760px)").matches;
  var cfg = mobile ? A.banner320 : A.banner728;
  var W = mobile ? 320 : 728, H = mobile ? 50 : 90;

  function frame(slot) {
    if (!cfg || !cfg.key || !cfg.src) return;
    var f = document.createElement("iframe");
    f.width = W; f.height = H; f.title = "Advertisement"; f.loading = "lazy";
    f.setAttribute("scrolling", "no");
    f.setAttribute("sandbox", "allow-scripts allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation");
    f.style.cssText = "border:0;max-width:100%;display:block;margin:0 auto";
    f.srcdoc = '<!doctype html><html><body style="margin:0;background:transparent"><script>atOptions={"key":"' +
      String(cfg.key).replace(/[^\w-]/g, "") + '","format":"iframe","height":' + H + ',"width":' + W +
      ',"params":{}};<\/script><script src="' + String(cfg.src).replace(/"/g, "") + '"><\/script></body></html>';
    slot.appendChild(f);
    slot.classList.add("on");
  }

  function run() {
    document.querySelectorAll(".ad-slot").forEach(frame);
    if (A.socialBar) {
      var s = document.createElement("script");
      s.src = A.socialBar; s.async = true;
      document.body.appendChild(s);
    }
  }

  /* Pehli interaction ya 2.5 second baad, jo pehle ho */
  var done = false;
  function once() { if (done) return; done = true; run(); }
  ["pointerdown", "keydown", "scroll"].forEach(function (e) { addEventListener(e, once, { once: true, passive: true }); });
  setTimeout(once, 2500);
})();
