/* PSDC Typing Master - extra games (Whack-A-Mole, Typing Bubble Shooter)
   Standalone HTML games ko iframe me chalata hai. app.js ko touch nahi karta. */
(function () {
  'use strict';
  var GAMES = {
    whack:   { view: 'whackView',  src: 'assets/whack-a-mole.html' },
    bshoot:  { view: 'bshootView', src: 'assets/typing-bubble-shooter.html' }
  };
  var KEYS = { '4': 'whack', '5': 'bshoot' };
  var hub = document.getElementById('gamesHub');
  if (!hub) return;

  function frameOf(id) { return document.querySelector('#' + GAMES[id].view + ' iframe'); }

  function closeAll() {
    Object.keys(GAMES).forEach(function (id) {
      var v = document.getElementById(GAMES[id].view), f = frameOf(id);
      if (v) v.hidden = true;
      if (f && f.getAttribute('src')) f.setAttribute('src', 'about:blank'); // game band
    });
  }

  function open(id) {
    var g = GAMES[id]; if (!g) return;
    closeAll();
    hub.hidden = true;
    var v = document.getElementById(g.view), f = frameOf(id);
    f.setAttribute('src', g.src);
    v.hidden = false;
    try { f.focus(); } catch (e) {}
    f.addEventListener('load', function h() { try { f.contentWindow.focus(); } catch (e) {} f.removeEventListener('load', h); });
    v.scrollIntoView({ block: 'start' });
  }

  function back() { closeAll(); hub.hidden = false; }

  // Hub cards
  hub.addEventListener('click', function (e) {
    var c = e.target.closest('[data-xgame]');
    if (c) open(c.getAttribute('data-xgame'));
  });
  // Back buttons
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-xback]')) back();
  });
  // Kisi bhi tab par jane se pehle extra games band karo
  document.addEventListener('click', function (e) {
    if (e.target.closest('.tab')) closeAll();
  }, true);
  // Keyboard shortcuts 4 / 5 (sirf hub dikh raha ho tab)
  document.addEventListener('keydown', function (e) {
    if (hub.hidden || e.ctrlKey || e.metaKey || e.altKey) return;
    var t = e.target && e.target.tagName;
    if (t === 'INPUT' || t === 'TEXTAREA') return;
    if (KEYS[e.key]) open(KEYS[e.key]);
  });
})();
