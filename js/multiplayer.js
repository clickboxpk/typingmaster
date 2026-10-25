/* PSDC Typing Arena - online competition (Simple Typing + Car Race)
   Backend: Firebase Realtime Database (free). Config: js/config.js
   Agar Firebase set nahi hai to "Practice vs Bots" mode chalta hai. */
(function () {
  "use strict";
  var CFG = window.PSDC_CONFIG || {}, FB = CFG.firebase || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var root = $("#onlineView");
  if (!root) return;

  /* ---------- constants ---------- */
  var LV = {
    easy:   { label: "Easy",   emoji: "🟢", limit: 100, bot: [14, 24] },
    medium: { label: "Medium", emoji: "🟡", limit: 120, bot: [26, 40] },
    hard:   { label: "Hard",   emoji: "🔴", limit: 150, bot: [38, 56] }
  };
  var FMT = { "1v1": { label: "1 vs 1", max: 2 }, "2v2": { label: "2 vs 2 Teams", max: 4 }, "ffa": { label: "Free for all (up to 6)", max: 6 } };
  var MODE = { type: "⌨️ Simple Typing", car: "🏎️ Car Race" };
  var TEXTS = {
    easy: [
      "the sun is hot and the sky is blue. we sit on the mat and type with fast hands. a cat and a dog run to the park.",
      "my name is on the desk. i like to read a book and drink tea. the bus is red and big and it can run fast.",
      "keep your eyes on the screen. type each key with care. a good friend will help you learn new things every day."
    ],
    medium: [
      "Typing is a skill that grows with daily practice. Sit straight, keep your wrists relaxed, and let your fingers find the home row. Speed will follow accuracy.",
      "A computer needs both hardware and software to work. The keyboard, mouse and monitor are hardware, while programs like Word and Excel are software.",
      "Every morning the students of the centre open their computers, practise typing for twenty minutes, and then move on to the next lesson of the course."
    ],
    hard: [
      "In 2026, over 3,500 students completed the DIT course; however, only 12% reached 40+ words-per-minute with 98% accuracy. \"Practice,\" said the teacher, \"beats talent!\"",
      "Database administrators (DBAs) must back up data regularly: daily, weekly & monthly. If the server crashes at 3:45 a.m., restore the latest backup - quickly, calmly, correctly.",
      "Network protocols such as HTTP, HTTPS, FTP and TCP/IP define how computers exchange information; encryption (e.g. AES-256) protects passwords, emails & bank details."
    ]
  };
  var HUES = [210, 0, 130, 40, 280, 175];
  var TEAMC = { A: "#3b82f6", B: "#ef4444", "-": "#8b5cf6" };

  /* ---------- state ---------- */
  var db = null, uid = null, online = false, offset = 0, fbTried = false, fbState = "idle";
  var presence = {}, selected = {}, history = loadHist();
  var screen = "lobby";          /* lobby | room | race | result */
  var roomId = null, roomRef = null, R = null, local = false;
  var cfgSel = { mode: "type", fmt: "1v1", lv: "easy" };
  var T = null;                  /* active race */
  var raf = 0, lastWrite = 0, inviteSeen = {};

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function myName() { var e = $("#stuName"); return ((e && e.value) || "").trim().slice(0, 20); }
  function nowS() { return Date.now() + (local ? 0 : offset); }
  function loadHist() { try { return JSON.parse(localStorage.getItem("psdc_arena") || "{}") || {}; } catch (e) { return {}; } }
  function saveHist() { try { localStorage.setItem("psdc_arena", JSON.stringify(history)); } catch (e) { } }
  function toast(m) {
    var t = $("#arToast");
    if (!t) { t = document.createElement("div"); t.id = "arToast"; t.className = "ar-toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = m; t.classList.add("on"); clearTimeout(toast.t);
    toast.t = setTimeout(function () { t.classList.remove("on"); }, 3200);
  }
  function needName() {
    if (myName()) return false;
    toast("Pehle upar 'Student name' me apna naam likhein");
    var e = $("#stuName"); if (e) { try { e.focus(); e.scrollIntoView({ block: "center" }); } catch (x) { } }
    return true;
  }
  function me() { return local ? "me" : uid; }

  /* ---------- Firebase ---------- */
  function loadScript(src) {
    return new Promise(function (res, rej) {
      var s = document.createElement("script"); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s);
    });
  }
  function initFB() {
    if (fbTried) return; fbTried = true;
    if (!FB.apiKey || !FB.databaseURL) { fbState = "off"; return; }
    fbState = "loading"; render();
    var b = "https://www.gstatic.com/firebasejs/10.12.2/firebase-";
    loadScript(b + "app-compat.js").then(function () { return loadScript(b + "auth-compat.js"); })
      .then(function () { return loadScript(b + "database-compat.js"); })
      .then(function () {
        firebase.initializeApp(FB); db = firebase.database();
        return firebase.auth().signInAnonymously();
      }).then(function (c) {
        uid = c.user.uid; online = true; fbState = "on";
        db.ref(".info/serverTimeOffset").on("value", function (s) { offset = s.val() || 0; });
        db.ref(".info/connected").on("value", function (s) { if (s.val()) { db.ref("presence/" + uid).onDisconnect().remove(); pushPresence(); } });
        setInterval(pushPresence, 30000);
        db.ref("presence").on("value", function (s) { presence = s.val() || {}; if (screen === "lobby" || screen === "room") renderPlayersOnly(); });
        db.ref("invites/" + uid).on("child_added", onInvite);
        var nm = $("#stuName"); if (nm) nm.addEventListener("input", function () { clearTimeout(pushPresence.t); pushPresence.t = setTimeout(pushPresence, 600); });
        render();
      }).catch(function (e) { console.warn("Arena offline:", e); fbState = "err"; online = false; render(); });
  }
  function pushPresence() {
    if (!online) return;
    var n = myName();
    if (!n) { db.ref("presence/" + uid).remove(); return; }
    db.ref("presence/" + uid).set({ name: n, ts: firebase.database.ServerValue.TIMESTAMP, st: (screen === "race" ? "busy" : (roomId ? "room" : "idle")), best: history.best || 0 });
  }
  function freshPlayers() {
    var out = [], t = Date.now() + offset;
    Object.keys(presence).forEach(function (k) {
      var p = presence[k]; if (!p || k === uid || !p.name) return;
      if (t - (p.ts || 0) > 100000) return;
      out.push({ id: k, name: p.name, st: p.st, best: p.best || 0 });
    });
    out.sort(function (a, b) { return (b.best - a.best) || a.name.localeCompare(b.name); });
    return out;
  }

  /* ---------- invites ---------- */
  function onInvite(s) {
    var v = s.val(); if (!v || inviteSeen[s.key]) return; inviteSeen[s.key] = 1;
    if (Date.now() + offset - (v.ts || 0) > 120000) { s.ref.remove(); return; }
    var box = $("#arInv");
    if (!box) { box = document.createElement("div"); box.id = "arInv"; box.className = "ar-inv"; document.body.appendChild(box); }
    var c = document.createElement("div"); c.className = "ar-invc";
    c.innerHTML = '<b>' + esc(v.fn) + '</b> ne aapko challenge kiya!<small>' + esc(MODE[v.mode] || "") + ' · ' + esc((FMT[v.fmt] || {}).label || "") + ' · ' + esc((LV[v.lv] || {}).label || "") + '</small>' +
      '<div><button type="button" class="btn" data-a="1">Accept</button><button type="button" class="ghost" data-a="0">Decline</button></div>';
    box.appendChild(c);
    var kill = function () { s.ref.remove(); c.remove(); };
    c.querySelector('[data-a="1"]').onclick = function () {
      kill(); if (needName()) return;
      var tab = document.querySelector('.tab[data-tab="online"]'); if (tab && !tab.classList.contains("on")) tab.click();
      if (roomId) leaveRoom(true);
      joinRoom(v.room);
    };
    c.querySelector('[data-a="0"]').onclick = kill;
    setTimeout(function () { if (c.parentNode) kill(); }, 120000);
    try { window.ensureAudio && 0; } catch (e) { }
  }
  function sendInvite(to) {
    if (!online || !roomId || !R) return;
    db.ref("invites/" + to).push({ from: uid, fn: myName(), room: roomId, mode: R.mode, fmt: R.fmt, lv: R.lv, ts: firebase.database.ServerValue.TIMESTAMP });
  }

  /* ---------- rooms ---------- */
  function mkMe(team) { return { name: myName(), team: team || "-", progress: 0, wpm: 0, acc: 100, finished: false, ft: 0, left: false }; }
  function createRoom(inviteList) {
    if (needName()) return;
    if (!online) { toast("Online server set nahi hai. 'Practice vs Bots' try karein."); return; }
    var id = db.ref("rooms").push().key;
    var r = { host: uid, mode: cfgSel.mode, fmt: cfgSel.fmt, lv: cfgSel.lv, state: "lobby", ts: firebase.database.ServerValue.TIMESTAMP, players: {} };
    r.players[uid] = mkMe(cfgSel.fmt === "2v2" ? "A" : "-");
    db.ref("rooms/" + id).set(r).then(function () {
      attachRoom(id);
      (inviteList || []).slice(0, FMT[cfgSel.fmt].max - 1).forEach(function (p) { setTimeout(function () { sendInvite(p); }, 400); });
      if (inviteList && inviteList.length) toast("Invite bhej diye gaye");
    }).catch(function () { toast("Room nahi ban saka (Firebase rules check karein)"); });
  }
  function joinRoom(id) {
    db.ref("rooms/" + id).once("value").then(function (s) {
      var r = s.val();
      if (!r || r.state !== "lobby") { toast("Yeh room ab available nahi"); return; }
      var ids = Object.keys(r.players || {}), max = FMT[r.fmt].max;
      if (ids.length >= max) { toast("Room full ho chuka hai"); return; }
      var a = 0, b = 0; ids.forEach(function (k) { if (r.players[k].team === "A") a++; else if (r.players[k].team === "B") b++; });
      var team = r.fmt === "2v2" ? (a <= b ? "A" : "B") : "-";
      return db.ref("rooms/" + id + "/players/" + uid).set(mkMe(team)).then(function () { attachRoom(id); });
    }).catch(function () { toast("Room join nahi ho saka"); });
  }
  function attachRoom(id) {
    roomId = id; roomRef = db.ref("rooms/" + id);
    db.ref("rooms/" + id + "/players/" + uid + "/left").onDisconnect().set(true);
    roomRef.on("value", onRoom);
    screen = "room"; pushPresence(); render();
  }
  function onRoom(s) {
    var v = s.val();
    if (!v) {
      if (screen === "result" || screen === "race") { R = R || {}; return; }
      toast("Room band ho gaya"); detach(); screen = "lobby"; render(); return;
    }
    R = v;
    if (!v.players || !v.players[uid]) { if (screen !== "result") { toast("Aap room se hata diye gaye"); detach(); screen = "lobby"; render(); } return; }
    if (v.state === "racing" && screen !== "race" && screen !== "result" && T === null) { beginRace(); return; }
    if (v.state === "lobby" && (screen === "result" || screen === "race")) { endRaceLoop(); T = null; screen = "room"; render(); return; }
    if (screen === "room" && v.state === "lobby" && v.players[v.host] && v.players[v.host].left) { toast("Host room chhor gaya"); leaveRoom(true); return; }
    if (screen === "room") render();
  }
  function detach() {
    if (roomRef) { roomRef.off(); }
    if (online && roomId) db.ref("rooms/" + roomId + "/players/" + uid + "/left").onDisconnect().cancel();
    roomRef = null; roomId = null; R = null; T = null; endRaceLoop(); pushPresence();
  }
  function leaveRoom(silent) {
    if (local) { endRaceLoop(); local = false; R = null; T = null; roomId = null; screen = "lobby"; render(); return; }
    if (online && roomId) {
      var id = roomId, host = R && R.host === uid, st = R && R.state;
      if (host || Object.keys((R && R.players) || {}).length <= 1) db.ref("rooms/" + id).remove();
      else db.ref("rooms/" + id + "/players/" + uid).update({ left: true });
      if (!host && st === "lobby") db.ref("rooms/" + id + "/players/" + uid).remove();
    }
    detach(); screen = "lobby"; render();
  }
  function setRoom(patch) { if (local) { for (var k in patch) R[k] = patch[k]; render(); } else if (roomRef) roomRef.update(patch); }
  function setTeam(id, team) { if (local) { R.players[id].team = team; render(); } else db.ref("rooms/" + roomId + "/players/" + id + "/team").set(team); }

  function startMatch() {
    if (!R) return;
    var ids = Object.keys(R.players).filter(function (k) { return !R.players[k].left; });
    if (ids.length < 2) { toast("Kam az kam 2 players chahiye"); return; }
    if (R.fmt === "2v2") {
      var a = 0, b = 0; ids.forEach(function (k) { R.players[k].team === "A" ? a++ : b++; });
      if (!a || !b) { toast("Dono teams me kam az kam 1 player hona chahiye"); return; }
    }
    var arr = TEXTS[R.lv], text = arr[Math.floor(Math.random() * arr.length)];
    var patch = { state: "racing", text: text, limit: LV[R.lv].limit, startAt: nowS() + 4500, rid: Math.random().toString(36).slice(2, 8) };
    if (local) { for (var k in patch) R[k] = patch[k]; beginRace(); return; }
    var up = {}; for (var kk in patch) up[kk] = patch[kk];
    ids.forEach(function (k) { up["players/" + k + "/progress"] = 0; up["players/" + k + "/wpm"] = 0; up["players/" + k + "/acc"] = 100; up["players/" + k + "/finished"] = false; up["players/" + k + "/ft"] = 0; });
    roomRef.update(up);
  }

  /* ---------- practice vs bots ---------- */
  var BOTN = ["Ali Bot", "Sara Bot", "Usman Bot", "Hina Bot", "Zain Bot"];
  function startLocal() {
    if (needName()) return;
    local = true; roomId = "local";
    var n = cfgSel.fmt === "1v1" ? 1 : (cfgSel.fmt === "2v2" ? 3 : 4);
    R = { host: "me", mode: cfgSel.mode, fmt: cfgSel.fmt, lv: cfgSel.lv, state: "lobby", players: {} };
    R.players.me = mkMe(cfgSel.fmt === "2v2" ? "A" : "-");
    var b = LV[cfgSel.lv].bot;
    for (var i = 0; i < n; i++) {
      var p = mkMe(cfgSel.fmt === "2v2" ? (i === 0 ? "A" : "B") : "-");
      p.name = BOTN[i]; p.bot = true; p.target = b[0] + Math.random() * (b[1] - b[0]);
      R.players["bot" + i] = p;
    }
    screen = "room"; render();
  }
  function botTick(dt) {
    if (!local || !R) return;
    var len = T.text.length, el = (nowS() - T.startAt) / 1000;
    if (el < 0) return;
    Object.keys(R.players).forEach(function (k) {
      var p = R.players[k]; if (!p.bot || p.finished) return;
      p.fl = (p.fl || 0) + (1 + (Math.random() - 0.5) * 0.7) * (p.target * 5 / 60) * dt;
      p.progress = Math.min(len, Math.floor(p.fl));
      p.wpm = Math.round(p.target); p.acc = 94 + Math.round(Math.random() * 5);
      if (p.progress >= len) { p.finished = true; p.ft = el; p.wpm = Math.round(len / 5 / (el / 60)); }
    });
  }

  /* ---------- race ---------- */
  function beginRace() {
    screen = "race";
    T = { text: R.text, idx: 0, ok: 0, bad: 0, startAt: R.startAt, limit: R.limit, mode: R.mode, done: false, fin: false, ft: 0, disp: {}, last: performance.now(), roadX: 0, nitro: 0, rid: R.rid };
    if (local) { T.startAt = R.startAt; }
    pushPresence(); render(); startLoop();
  }
  function startLoop() { cancelAnimationFrame(raf); raf = requestAnimationFrame(frame); }
  function endRaceLoop() { cancelAnimationFrame(raf); raf = 0; }

  window.onlineKey = function (k) {
    if (screen !== "race" || !T || T.fin || T.done) return;
    if (nowS() < T.startAt) return;
    if (k.length !== 1) return;
    if (k === T.text[T.idx]) {
      T.idx++; T.ok++; T.nitro = Math.min(1, T.nitro + 0.15); paintChar(T.idx - 1, T.idx);
      if (T.idx >= T.text.length) { T.fin = true; T.ft = (nowS() - T.startAt) / 1000; writeMe(true); }
    } else {
      T.bad++; var c = $("#arCur"); if (c) { c.classList.remove("bad"); void c.offsetWidth; c.classList.add("bad"); }
    }
  };
  function myStats() {
    var el = Math.max(1, (T.fin ? T.ft * 1000 : nowS() - T.startAt)) / 1000 / 60;
    var wpm = T.idx ? Math.round(T.idx / 5 / el) : 0, tot = T.ok + T.bad;
    return { wpm: wpm, acc: tot ? Math.round(T.ok / tot * 100) : 100 };
  }
  function writeMe(force) {
    var t = performance.now(); if (!force && t - lastWrite < 250) return; lastWrite = t;
    var s = myStats(), d = { progress: T.idx, wpm: s.wpm, acc: s.acc, finished: !!T.fin, ft: T.ft || 0 };
    if (local) { Object.assign(R.players.me, d); return; }
    if (roomRef) db.ref("rooms/" + roomId + "/players/" + uid).update(d);
  }
  function paintChar(prev, cur) {
    var box = $("#arText"); if (!box) return;
    var a = box.children[prev], b = box.children[cur];
    if (a) { a.className = "ok"; a.removeAttribute("id"); }
    if (b) { b.className = "cur"; b.id = "arCur"; }
  }
  function frame(now) {
    if (screen !== "race" || !T) return;
    var dt = Math.min(0.1, (now - T.last) / 1000); T.last = now;
    var t = nowS(), left = (T.startAt - t) / 1000, el = -left;
    var cd = $("#arCd");
    if (cd) {
      if (left > 0) { cd.hidden = false; cd.textContent = Math.ceil(left); cd.className = "ar-cd pop"; }
      else if (el < 0.9) { cd.hidden = false; cd.textContent = "GO!"; cd.className = "ar-cd go"; }
      else cd.hidden = true;
    }
    botTick(dt);
    if (el > 0) {
      writeMe(false);
      var tl = Math.max(0, T.limit - el), tm = $("#arTime");
      if (tm) tm.textContent = Math.floor(tl / 60) + ":" + ("0" + Math.floor(tl % 60)).slice(-2);
      var s = myStats(), w = $("#arWpm"), a = $("#arAcc");
      if (w) w.textContent = s.wpm; if (a) a.textContent = s.acc + "%";
      T.nitro = Math.max(0, T.nitro - dt * 0.8);
      if (allDone(el)) { finishRace(); return; }
    }
    drawTrack(dt, el);
    raf = requestAnimationFrame(frame);
  }
  function allDone(el) {
    if (el > T.limit) return true;
    return Object.keys(R.players).every(function (k) { var p = R.players[k]; return p.finished || p.left || (k === me() && T.fin); });
  }
  function finishRace() {
    if (T.done) return; T.done = true;
    if (!T.fin) writeMe(true);
    setTimeout(function () { showResults(); }, 600);
  }

  /* ---------- ranking ---------- */
  function ranking() {
    var len = T.text.length, list = Object.keys(R.players).map(function (k) {
      var p = R.players[k], isMe = k === me();
      var prog = isMe ? T.idx : (p.progress || 0), fin = isMe ? T.fin : p.finished, ft = isMe ? T.ft : p.ft;
      var st = isMe ? myStats() : { wpm: p.wpm || 0, acc: p.acc == null ? 100 : p.acc };
      return { id: k, name: p.name, team: p.team, prog: prog, fin: !!fin, ft: ft || 0, wpm: fin && ft ? Math.round(len / 5 / (ft / 60)) : st.wpm, acc: st.acc, me: isMe, left: !!p.left };
    });
    list.sort(function (a, b) { if (a.fin !== b.fin) return a.fin ? -1 : 1; if (a.fin) return a.ft - b.ft; return b.prog - a.prog; });
    list.forEach(function (x, i) { x.rank = i + 1; });
    var teams = null;
    if (R.fmt === "2v2") {
      teams = ["A", "B"].map(function (tm) {
        var m = list.filter(function (x) { return x.team === tm; });
        var all = m.length && m.every(function (x) { return x.fin; });
        return { team: tm, members: m, fin: all, ft: all ? Math.max.apply(null, m.map(function (x) { return x.ft; })) : 0, prog: m.reduce(function (s, x) { return s + x.prog; }, 0), wpm: Math.round(m.reduce(function (s, x) { return s + x.wpm; }, 0) / (m.length || 1)) };
      });
      teams.sort(function (a, b) { if (a.fin !== b.fin) return a.fin ? -1 : 1; if (a.fin) return a.ft - b.ft; return b.prog - a.prog; });
    }
    return { list: list, teams: teams };
  }

  /* ---------- results ---------- */
  var lastRes = null;
  function showResults() {
    endRaceLoop(); screen = "result";
    var res = ranking(); lastRes = res;
    var mine = res.list.filter(function (x) { return x.me; })[0];
    if (mine) {
      history.best = Math.max(history.best || 0, mine.wpm);
      history.items = (history.items || []); history.items.unshift({ t: Date.now(), mode: R.mode, fmt: R.fmt, lv: R.lv, rank: mine.rank, of: res.list.length, wpm: mine.wpm, acc: mine.acc });
      history.items = history.items.slice(0, 15); saveHist(); pushPresence();
    }
    render(); confetti();
  }
  function fmtT(s) { return s ? s.toFixed(1) + "s" : "DNF"; }

  /* ---------- share card (canvas) ---------- */
  function cardCanvas() {
    var res = lastRes, W = 1080, H = 1350, c = document.createElement("canvas"); c.width = W; c.height = H;
    var x = c.getContext("2d"), g = x.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, "#0f1b4d"); g.addColorStop(.55, "#3b2a9e"); g.addColorStop(1, "#d6407a");
    x.fillStyle = g; x.fillRect(0, 0, W, H);
    x.fillStyle = "rgba(255,255,255,.07)"; for (var i = 0; i < 9; i++) { x.beginPath(); x.arc(120 + i * 120, 90 + (i % 3) * 40, 60 + (i % 4) * 20, 0, 7); x.fill(); }
    x.textAlign = "center"; x.fillStyle = "#fff"; x.font = "800 64px Tahoma, Arial"; x.fillText("PSDC TYPING ARENA", W / 2, 150);
    x.font = "600 32px Tahoma, Arial"; x.fillStyle = "#cfd6ff";
    x.fillText((MODE[R.mode] || "").replace(/^\S+\s/, "") + "  |  " + FMT[R.fmt].label + "  |  " + LV[R.lv].label, W / 2, 205);
    var win = res.teams ? "Team " + res.teams[0].team + " wins!" : (res.list[0].name + " wins!");
    x.fillStyle = "#ffd54a"; x.font = "800 72px Tahoma, Arial"; x.fillText("🏆 " + win, W / 2, 330);
    var y = 420, rows = res.list.slice(0, 6);
    rows.forEach(function (r) {
      x.fillStyle = r.me ? "rgba(255,213,74,.28)" : "rgba(255,255,255,.12)";
      rr(x, 70, y, W - 140, 120, 28); x.fill();
      x.textAlign = "left"; x.fillStyle = r.rank === 1 ? "#ffd54a" : "#fff"; x.font = "800 56px Tahoma, Arial"; x.fillText("#" + r.rank, 105, y + 78);
      x.fillStyle = "#fff"; x.font = "700 44px Tahoma, Arial"; x.fillText(r.name.slice(0, 16) + (r.team !== "-" ? "  (" + r.team + ")" : ""), 245, y + 76);
      x.textAlign = "right"; x.font = "800 46px Tahoma, Arial"; x.fillStyle = "#7cf0ff"; x.fillText(r.wpm + " WPM", W - 105, y + 62);
      x.font = "600 28px Tahoma, Arial"; x.fillStyle = "#cfd6ff"; x.fillText(r.acc + "% acc  |  " + fmtT(r.fin ? r.ft : 0), W - 105, y + 100);
      y += 136;
    });
    x.textAlign = "center"; x.fillStyle = "#fff"; x.font = "600 30px Tahoma, Arial";
    x.fillText(new Date().toLocaleDateString(), W / 2, H - 150);
    x.font = "700 34px Tahoma, Arial"; x.fillStyle = "#ffd54a"; x.fillText("Challenge me: " + (CFG.siteUrl || location.origin).replace(/^https?:\/\//, ""), W / 2, H - 90);
    return c;
  }
  function rr(x, a, b, w, h, r) { x.beginPath(); x.moveTo(a + r, b); x.arcTo(a + w, b, a + w, b + h, r); x.arcTo(a + w, b + h, a, b + h, r); x.arcTo(a, b + h, a, b, r); x.arcTo(a, b, a + w, b, r); x.closePath(); }
  function shareText() {
    var m = lastRes.list.filter(function (x) { return x.me; })[0];
    return "Maine PSDC Typing Arena me " + m.wpm + " WPM (" + m.acc + "% accuracy) ke sath #" + m.rank + " position li! Kya aap mujhe hara sakte hain? " + (CFG.siteUrl || location.href);
  }
  function download() {
    var c = cardCanvas(); c.toBlob(function (b) {
      var a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = "typing-arena-result.png";
      document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
    });
  }
  function share(kind) {
    var txt = shareText(), url = CFG.siteUrl || location.href;
    if (kind === "native") {
      cardCanvas().toBlob(function (b) {
        var f = new File([b], "typing-arena-result.png", { type: "image/png" });
        if (navigator.canShare && navigator.canShare({ files: [f] })) navigator.share({ files: [f], text: txt }).catch(function () { });
        else if (navigator.share) navigator.share({ text: txt, url: url }).catch(function () { });
        else { download(); toast("Image download ho gayi, ab social media par upload karein"); }
      });
      return;
    }
    var u = { wa: "https://wa.me/?text=" + encodeURIComponent(txt), fb: "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url) + "&quote=" + encodeURIComponent(txt), x: "https://twitter.com/intent/tweet?text=" + encodeURIComponent(txt) }[kind];
    window.open(u, "_blank", "noopener");
  }
  function confetti() {
    var c = $("#arConf"); if (!c) return; var x = c.getContext("2d"), W = c.width = c.offsetWidth, H = c.height = c.offsetHeight, P = [];
    for (var i = 0; i < 110; i++) P.push({ x: Math.random() * W, y: -Math.random() * H, v: 2 + Math.random() * 4, s: 5 + Math.random() * 7, h: Math.random() * 360, r: Math.random() * 6 });
    var t0 = performance.now();
    (function f(n) {
      if (!c.isConnected || n - t0 > 4500) return; x.clearRect(0, 0, W, H);
      P.forEach(function (p) { p.y += p.v; p.r += .1; p.x += Math.sin(p.r) * 1.2; x.fillStyle = "hsl(" + p.h + ",90%,60%)"; x.fillRect(p.x, p.y, p.s, p.s * .6); });
      requestAnimationFrame(f);
    })(t0);
  }

  /* ---------- track drawing ---------- */
  function lanes() {
    var ids = Object.keys(R.players).sort(), m = me();
    ids = ids.filter(function (k) { return k !== m; }); ids.push(m);
    return ids.map(function (k, i) { return { id: k, p: R.players[k], hue: HUES[Object.keys(R.players).sort().indexOf(k) % 6] }; });
  }
  function target(k) { var p = R.players[k], len = T.text.length; return Math.min(1, (k === me() ? T.idx : (p.progress || 0)) / len); }
  function drawTrack(dt, el) {
    var L = lanes(), cv = $("#arCv"), lb = $("#arLanes");
    L.forEach(function (l) { var tg = target(l.id), d = T.disp[l.id] || 0; T.disp[l.id] = d + (tg - d) * Math.min(1, dt * 9); });
    if (T.mode === "car" && cv) {
      var dpr = Math.min(2, window.devicePixelRatio || 1), W = cv.clientWidth, n = L.length, lh = Math.min(70, Math.floor(300 / n)), H = n * lh + 36;
      if (cv.width !== W * dpr || cv.height !== H * dpr) { cv.width = W * dpr; cv.height = H * dpr; cv.style.height = H + "px"; }
      var x = cv.getContext("2d"); x.setTransform(dpr, 0, 0, dpr, 0, 0); x.clearRect(0, 0, W, H);
      T.roadX = (T.roadX + (60 + 520 * (T.disp[me()] > 0 ? 1 : 0.2) * (0.3 + T.nitro)) * dt) % 48;
      var sx = 46, fx = W - 70, gh = 18;
      x.fillStyle = "#1f7a35"; x.fillRect(0, 0, W, gh); x.fillRect(0, H - gh, W, gh);
      L.forEach(function (l, i) {
        var y = gh + i * lh;
        x.fillStyle = i % 2 ? "#3a3f4a" : "#444a56"; x.fillRect(0, y, W, lh);
        x.fillStyle = "rgba(255,255,255,.55)";
        if (i) for (var xx = -T.roadX; xx < W; xx += 48) x.fillRect(xx, y - 1, 24, 2);
      });
      x.fillStyle = "#fff"; x.fillRect(sx - 3, gh, 3, n * lh);
      for (var q = 0; q < n * 2; q++) { x.fillStyle = q % 2 ? "#000" : "#fff"; x.fillRect(fx, gh + q * lh / 2, 8, lh / 2); x.fillStyle = q % 2 ? "#fff" : "#000"; x.fillRect(fx + 8, gh + q * lh / 2, 8, lh / 2); }
      L.forEach(function (l, i) {
        var y = gh + i * lh, cx = sx + (fx - sx - 62) * (T.disp[l.id] || 0), col = R.fmt === "2v2" ? TEAMC[l.p.team] : "hsl(" + l.hue + ",85%,55%)";
        drawCar(x, cx, y + lh * 0.52, col, l.id === me() && T.nitro > 0.2 && el > 0);
        var nm = (l.id === me() ? "★ " : "") + l.p.name + (R.fmt === "2v2" ? " [" + l.p.team + "]" : "");
        x.font = "800 13px Tahoma, Arial"; var tw = x.measureText(nm).width + 14;
        x.fillStyle = "rgba(0,0,0,.65)"; rr(x, cx - 4, y + 2, tw, 18, 9); x.fill();
        x.fillStyle = l.id === me() ? "#ffd54a" : "#fff"; x.textAlign = "left"; x.fillText(nm, cx + 3, y + 15);
        if (l.p.finished || (l.id === me() && T.fin)) { x.fillStyle = "#4cd68a"; x.fillText("✔", Math.min(W - 20, cx + tw + 2), y + 15); }
      });
    } else if (lb) {
      L.slice().reverse().forEach(function (l, i) {
        var row = lb.children[i]; if (!row) return;
        row.firstChild.nextSibling.firstChild.style.width = (T.disp[l.id] * 100).toFixed(1) + "%";
        var tg = row.lastChild; var w = l.id === me() ? myStats().wpm : (l.p.wpm || 0); tg.textContent = w + " wpm";
      });
    }
  }
  function drawCar(x, cx, cy, col, flame) {
    x.save(); x.translate(cx, cy);
    if (flame) { x.fillStyle = "#ffb300"; x.beginPath(); x.moveTo(-2, 2); x.lineTo(-20 - Math.random() * 10, 5); x.lineTo(-2, 9); x.fill(); }
    x.fillStyle = "rgba(0,0,0,.3)"; x.beginPath(); x.ellipse(24, 17, 28, 4, 0, 0, 7); x.fill();
    x.fillStyle = col; rr(x, 0, 0, 52, 15, 6); x.fill();
    x.beginPath(); x.moveTo(12, 1); x.lineTo(19, -9); x.lineTo(36, -9); x.lineTo(43, 1); x.closePath(); x.fill();
    x.fillStyle = "#cfe9ff"; x.beginPath(); x.moveTo(17, 0); x.lineTo(21, -7); x.lineTo(27, -7); x.lineTo(27, 0); x.fill(); x.beginPath(); x.moveTo(30, 0); x.lineTo(30, -7); x.lineTo(35, -7); x.lineTo(40, 0); x.fill();
    x.fillStyle = "rgba(0,0,0,.35)"; x.fillRect(-3, -4, 8, 3); x.fillRect(-3, -6, 3, 8);
    x.fillStyle = "#fff6a0"; x.fillRect(49, 4, 4, 4);
    [10, 40].forEach(function (wx) { x.fillStyle = "#111"; x.beginPath(); x.arc(wx, 15, 6, 0, 7); x.fill(); x.fillStyle = "#bbb"; x.beginPath(); x.arc(wx, 15, 2.5, 0, 7); x.fill(); });
    x.restore();
  }

  /* ---------- rendering ---------- */
  function render() {
    if (root.hidden && screen !== "result") { /* hidden: still keep state */ }
    if (screen === "lobby") renderLobby();
    else if (screen === "room") renderRoom();
    else if (screen === "race") renderRace();
    else if (screen === "result") renderResult();
  }
  function seg(name, opts, cur, dis) {
    return '<div class="ar-seg" data-seg="' + name + '">' + Object.keys(opts).map(function (k) {
      var lab = typeof opts[k] === "string" ? opts[k] : (opts[k].emoji ? opts[k].emoji + " " : "") + opts[k].label;
      return '<button type="button" data-v="' + k + '" class="' + (k === cur ? "on" : "") + '"' + (dis ? " disabled" : "") + '>' + esc(lab) + '</button>';
    }).join("") + '</div>';
  }
  function statusBanner() {
    if (fbState === "on") return '<div class="ar-note ok">🟢 Online server connected</div>';
    if (fbState === "loading") return '<div class="ar-note">⏳ Server se connect ho raha hai...</div>';
    if (fbState === "err") return '<div class="ar-note warn">⚠️ Online server se connect nahi ho saka. Practice vs Bots chal sakta hai.</div>';
    return '<div class="ar-note warn">ℹ️ Online server abhi set nahi hai (admin: README.md dekhein). Tab tak <b>Practice vs Bots</b> use karein.</div>';
  }
  function playersHTML(inRoom) {
    var L = freshPlayers();
    if (!online) return '<p class="ar-empty">Online players yahan dikhein ge.</p>';
    if (!L.length) return '<p class="ar-empty">Abhi koi aur online nahi hai. Link doston ko bhejein! 🚀</p>';
    return L.map(function (p) {
      var busy = p.st === "busy";
      return '<div class="ar-pl"><label><input type="checkbox" data-sel="' + esc(p.id) + '"' + (selected[p.id] ? " checked" : "") + '><i class="av" style="background:hsl(' + (p.name.charCodeAt(0) * 7 % 360) + ',70%,50%)">' + esc(p.name[0].toUpperCase()) + '</i><span><b>' + esc(p.name) + '</b><small>' + (busy ? "🏁 Race me" : (p.st === "room" ? "🕹️ Room me" : "🟢 Available")) + (p.best ? " · best " + p.best + " WPM" : "") + '</small></span></label><button type="button" class="ghost" data-inv="' + esc(p.id) + '"' + (busy ? " disabled" : "") + '>Invite</button></div>';
    }).join("");
  }
  function renderPlayersOnly() {
    var c = $("#arPl"); if (!c) return;
    c.innerHTML = playersHTML(screen === "room");
    var cnt = $("#arCnt"); if (cnt) cnt.textContent = freshPlayers().length + (online ? 1 : 0);
  }
  function renderLobby() {
    var rec = (history.items || []).map(function (h) {
      return '<li><span>' + esc(new Date(h.t).toLocaleDateString()) + '</span><span>' + esc((MODE[h.mode] || "").replace(/^\S+\s/, "")) + ' · ' + esc(LV[h.lv].label) + '</span><b>#' + h.rank + '/' + h.of + '</b><b>' + h.wpm + ' WPM</b><span>' + h.acc + '%</span></li>';
    }).join("") || '<li class="ar-empty">Abhi koi record nahi. Pehla match khelein!</li>';
    root.innerHTML = '<div class="ar-wrap"><div class="ar-head"><div><h2>🌐 Online Typing Arena</h2><p>Dosto ko challenge karein, team banayein aur typing ya car race jeetein!</p></div><div class="ar-chip">👥 <b id="arCnt">' + (freshPlayers().length + (online ? 1 : 0)) + '</b> online</div></div>' + statusBanner() +
      '<div class="ar-grid"><section class="ar-card"><h3>🎮 Match setup</h3><label class="ar-l">Game style</label>' + seg("mode", MODE, cfgSel.mode) + '<label class="ar-l">Format</label>' + seg("fmt", { "1v1": "1 vs 1", "2v2": "2 vs 2 Teams", ffa: "Free for all" }, cfgSel.fmt) + '<label class="ar-l">Level</label>' + seg("lv", LV, cfgSel.lv) +
      '<div class="ar-acts"><button type="button" class="btn" id="arCreate">⚔️ Room banao &amp; invite</button><button type="button" class="btn alt" id="arBots">🤖 Practice vs Bots</button></div></section>' +
      '<section class="ar-card"><h3>🟢 Online typists</h3><div class="ar-acts sm"><button type="button" class="ghost" id="arInvSel">Invite selected</button><button type="button" class="ghost" id="arInvAll">Invite all</button></div><div id="arPl" class="ar-pls">' + playersHTML() + '</div></section></div>' +
      '<section class="ar-card"><h3>🏅 Mere records <small>Best: ' + (history.best || 0) + ' WPM</small></h3><ul class="ar-hist">' + rec + '</ul></section></div>';
    bindLobby();
  }
  function bindLobby() {
    bindSeg(function (n, v) { cfgSel[n] = v; renderLobby(); });
    bindPlayers(function () { createRoom([]); }, true);
    $("#arCreate").onclick = function () { createRoom(Object.keys(selected).filter(function (k) { return selected[k]; })); };
    $("#arBots").onclick = startLocal;
    $("#arInvSel").onclick = function () { createRoom(Object.keys(selected).filter(function (k) { return selected[k]; })); };
    $("#arInvAll").onclick = function () { createRoom(freshPlayers().filter(function (p) { return p.st !== "busy"; }).map(function (p) { return p.id; })); };
  }
  function bindSeg(fn) { root.querySelectorAll(".ar-seg").forEach(function (g) { g.querySelectorAll("button").forEach(function (b) { b.onclick = function () { fn(g.dataset.seg, b.dataset.v); }; }); }); }
  function bindPlayers(createFn, lobby) {
    var c = $("#arPl"); if (!c) return;
    c.onclick = function (e) {
      var i = e.target.closest("[data-inv]"), s = e.target.closest("[data-sel]");
      if (s) { selected[s.dataset.sel] = s.checked; return; }
      if (i) { if (lobby) { createRoom([i.dataset.inv]); } else { sendInvite(i.dataset.inv); toast("Invite bhej diya"); i.disabled = true; setTimeout(function () { i.disabled = false; }, 8000); } }
    };
  }
  function renderRoom() {
    if (!R) return;
    var host = R.host === me(), ids = Object.keys(R.players).filter(function (k) { return !R.players[k].left; });
    var is2 = R.fmt === "2v2";
    var slots = ids.map(function (k) {
      var p = R.players[k];
      return '<div class="ar-slot"><i class="av" style="background:' + (is2 ? TEAMC[p.team] : "hsl(" + (p.name.charCodeAt(0) * 7 % 360) + ',70%,50%)') + '">' + esc(p.name[0].toUpperCase()) + '</i><b>' + esc(p.name) + (k === R.host ? " 👑" : "") + (k === me() ? " (aap)" : "") + '</b>' +
        (is2 ? '<span class="ar-tm">' + (host ? '<button type="button" data-t="' + k + '|A" class="' + (p.team === "A" ? "on a" : "") + '">A</button><button type="button" data-t="' + k + '|B" class="' + (p.team === "B" ? "on b" : "") + '">B</button>' : '<em class="tm ' + p.team.toLowerCase() + '">Team ' + p.team + '</em>') + '</span>' : "") + '</div>';
    }).join("");
    root.innerHTML = '<div class="ar-wrap"><div class="ar-head"><div><h2>🕹️ Match room</h2><p>' + esc(MODE[R.mode]) + ' · ' + esc(FMT[R.fmt].label) + ' · ' + esc(LV[R.lv].label) + '</p></div><button type="button" class="ghost" id="arLeave">← Room chhorein</button></div>' + (local ? '<div class="ar-note">🤖 Practice mode: bots ke sath khel rahe hain</div>' : statusBanner()) +
      '<div class="ar-grid"><section class="ar-card"><h3>Players (' + ids.length + '/' + FMT[R.fmt].max + ')</h3><div class="ar-slots">' + slots + '</div>' +
      (host ? '<label class="ar-l">Game style</label>' + seg("mode", MODE, R.mode) + '<label class="ar-l">Level</label>' + seg("lv", LV, R.lv) + '<label class="ar-l">Format</label>' + seg("fmt", { "1v1": "1 vs 1", "2v2": "2 vs 2", ffa: "FFA" }, R.fmt, local) + '<div class="ar-acts"><button type="button" class="btn" id="arStart">🚦 Start race</button></div>' : '<p class="ar-empty">Host ke start karne ka intezar hai... ⏳</p>') + '</section>' +
      (local ? "" : '<section class="ar-card"><h3>➕ Aur players bulayein</h3><div id="arPl" class="ar-pls">' + playersHTML(true) + '</div></section>') + '</div></div>';
    $("#arLeave").onclick = function () { leaveRoom(); };
    if (host) {
      bindSeg(function (n, v) {
        var p = {}; p[n] = v;
        if (n === "fmt" && Object.keys(R.players).length > FMT[v].max) { toast("Pehle players kam hon"); return; }
        setRoom(p);
        if (n === "fmt") Object.keys(R.players).forEach(function (k, i) { setTeam(k, v === "2v2" ? (i % 2 ? "B" : "A") : "-"); });
      });
      $("#arStart").onclick = startMatch;
    }
    root.querySelectorAll("[data-t]").forEach(function (b) { b.onclick = function () { var a = b.dataset.t.split("|"); setTeam(a[0], a[1]); }; });
    bindPlayers(null, false);
  }
  function renderRace() {
    var car = R.mode === "car", L = lanes();
    var txt = T.text.split("").map(function (ch, i) { return '<span' + (i === 0 ? ' class="cur" id="arCur"' : "") + '>' + (ch === " " ? "&nbsp;" : esc(ch)) + '</span>'; }).join("");
    var bars = "";
    if (!car) bars = '<div id="arLanes" class="ar-lanes">' + L.slice().reverse().map(function (l) {
      return '<div class="ar-lane"><b>' + (l.id === me() ? "★ " : "") + esc(l.p.name) + (R.fmt === "2v2" ? " [" + l.p.team + "]" : "") + '</b><div class="trk"><i style="background:' + (R.fmt === "2v2" ? TEAMC[l.p.team] : "hsl(" + l.hue + ",85%,55%)") + '"></i></div><em>0 wpm</em></div>';
    }).join("") + '</div>';
    root.innerHTML = '<div class="ar-wrap race"><div class="ar-hud"><div><b id="arTime">0:00</b><span>Time</span></div><div><b id="arWpm">0</b><span>WPM</span></div><div><b id="arAcc">100%</b><span>Accuracy</span></div><button type="button" class="ghost" id="arQuit">Quit</button></div>' +
      '<div class="ar-arena">' + (car ? '<canvas id="arCv"></canvas>' : bars) + '<div id="arCd" class="ar-cd" hidden></div></div>' +
      '<div class="ar-typebox" id="arBox"><div id="arText" class="ar-text">' + txt + '</div><p class="ar-hint">Jo likha hai wahi type karein. Galat key par rukna padega - sahi key dabayen! (Mobile: yahan tap karein)</p></div></div>';
    $("#arQuit").onclick = function () { if (confirm("Race chhor kar bahar niklein?")) leaveRoom(); };
    $("#arBox").onpointerdown = function () { var c = $("#cap"); if (c) try { c.focus({ preventScroll: true }); } catch (e) { } };
  }
  function renderResult() {
    var res = lastRes, r = res.list;
    var top = r.slice(0, 3), order = top.length === 3 ? [top[1], top[0], top[2]] : top;
    var pod = order.map(function (x) {
      var h = { 1: 150, 2: 112, 3: 84 }[x.rank] || 70;
      return '<div class="ar-pod"><i class="av big" style="background:hsl(' + (x.name.charCodeAt(0) * 7 % 360) + ',70%,50%)">' + esc(x.name[0].toUpperCase()) + '</i><b>' + esc(x.name) + '</b><small>' + x.wpm + ' WPM</small><div class="bar r' + x.rank + '" style="height:' + h + 'px">' + (["", "🥇", "🥈", "🥉"][x.rank] || x.rank) + '</div></div>';
    }).join("");
    var teamBox = res.teams ? '<div class="ar-teams">' + res.teams.map(function (t, i) { return '<div class="tm ' + t.team.toLowerCase() + (i === 0 ? " win" : "") + '"><b>' + (i === 0 ? "🏆 " : "") + 'Team ' + t.team + '</b><span>' + t.members.map(function (m) { return esc(m.name); }).join(" + ") + '</span><em>' + t.wpm + ' avg WPM · ' + (t.fin ? fmtT(t.ft) : "DNF") + '</em></div>'; }).join("") + '</div>' : "";
    var rows = r.map(function (x) { return '<tr class="' + (x.me ? "me" : "") + '"><td>#' + x.rank + '</td><td>' + esc(x.name) + (x.team !== "-" ? ' <em class="tm ' + x.team.toLowerCase() + '">' + x.team + '</em>' : "") + '</td><td>' + x.wpm + '</td><td>' + x.acc + '%</td><td>' + (x.fin ? fmtT(x.ft) : "DNF") + '</td></tr>'; }).join("");
    var winner = res.teams ? "Team " + res.teams[0].team + " jeet gayi!" : esc(r[0].name) + " jeet gaya!";
    var canRe = local || (R && R.host === me() && roomRef);
    root.innerHTML = '<div class="ar-wrap"><canvas id="arConf" class="ar-conf"></canvas><div class="ar-res"><h2>🏁 Race khatam!</h2><p class="ar-win">🏆 ' + winner + '</p>' + (res.teams ? teamBox : '<div class="ar-podium">' + pod + '</div>') +
      '<div class="ar-tablew"><table class="ar-table"><thead><tr><th>Rank</th><th>Player</th><th>WPM</th><th>Accuracy</th><th>Time</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
      '<div class="ar-acts wrap"><button type="button" class="btn" id="arDl">📸 Result image download</button><button type="button" class="btn alt" id="arSh">📤 Share</button><button type="button" class="ghost" id="arWa">WhatsApp</button><button type="button" class="ghost" id="arFb">Facebook</button><button type="button" class="ghost" id="arX">X</button></div>' +
      '<div class="ar-acts wrap">' + (canRe ? '<button type="button" class="btn" id="arRe">🔁 Rematch</button>' : "") + '<button type="button" class="ghost" id="arBack">← Lobby</button></div></div></div>';
    $("#arDl").onclick = download; $("#arSh").onclick = function () { share("native"); };
    $("#arWa").onclick = function () { share("wa"); }; $("#arFb").onclick = function () { share("fb"); }; $("#arX").onclick = function () { share("x"); };
    $("#arBack").onclick = function () { leaveRoom(); };
    var re = $("#arRe"); if (re) re.onclick = function () {
      if (local) { Object.keys(R.players).forEach(function (k) { var p = R.players[k]; p.progress = 0; p.fl = 0; p.finished = false; p.ft = 0; p.wpm = 0; }); R.state = "lobby"; T = null; screen = "room"; render(); return; }
      var up = { state: "lobby" }; Object.keys(R.players).forEach(function (k) { up["players/" + k + "/progress"] = 0; up["players/" + k + "/finished"] = false; up["players/" + k + "/ft"] = 0; up["players/" + k + "/wpm"] = 0; });
      roomRef.update(up);
    };
  }

  /* ---------- controller used by app.js ---------- */
  window.onlineCtl = {
    enter: function () { initFB(); if (screen === "race" && T && !T.done) startLoop(); else render(); pushPresence(); },
    leave: function () {
      if (screen === "race") { leaveRoom(true); }
      else if (screen === "result" || screen === "room") { /* state keep */ }
    }
  };
})();
