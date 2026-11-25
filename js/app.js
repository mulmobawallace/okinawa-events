(function () {
  "use strict";

  const events = (window.EVENTS || []).slice();
  const AREAS = ["北部", "中部", "那覇", "南部", "離島", "県内各地"];
  const TAGS = ["祭り", "イルミネーション", "体験", "花", "伝統文化", "動物", "花火", "スポーツ", "国際交流"];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const state = { q: "", month: "", area: "", tag: "", freeOnly: false, showPast: false };

  const toDate = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const ym = (date) => date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0");
  const isPast = (ev) => toDate(ev.end) < today;
  const WD = ["日", "月", "火", "水", "木", "金", "土"];

  function formatRange(ev) {
    if (ev.dateText) return ev.dateText;
    const s = toDate(ev.start), e = toDate(ev.end);
    const f = (d) => `${d.getMonth() + 1}/${d.getDate()}(${WD[d.getDay()]})`;
    if (ev.start === ev.end) return `${s.getFullYear()}年 ${f(s)}`;
    const ey = s.getFullYear() !== e.getFullYear() ? `${e.getFullYear()}年 ` : "";
    return `${s.getFullYear()}年 ${f(s)} 〜 ${ey}${f(e)}`;
  }

  // イベントが開催期間中にかかる月の一覧
  function monthsOf(ev) {
    const out = [];
    const d = toDate(ev.start); d.setDate(1);
    const end = toDate(ev.end);
    while (d <= end) { out.push(ym(d)); d.setMonth(d.getMonth() + 1); }
    return out;
  }

  // 表示用の「次に行ける日」: 開催中なら今日、これからなら開始日
  function displayDate(ev) {
    const s = toDate(ev.start);
    return (s < today && !isPast(ev)) ? today : s;
  }

  // ---------- chips ----------
  function makeChips(container, items, key) {
    const all = [{ value: "", label: "すべて" }].concat(items);
    all.forEach((it) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.textContent = it.label;
      b.setAttribute("aria-pressed", String(state[key] === it.value));
      b.addEventListener("click", () => {
        state[key] = it.value;
        container.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", "false"));
        b.setAttribute("aria-pressed", "true");
        render();
      });
      container.appendChild(b);
    });
  }

  const monthSet = new Set();
  events.forEach((ev) => monthsOf(ev).forEach((m) => { if (m >= ym(today)) monthSet.add(m); }));
  const months = Array.from(monthSet).sort().map((m) => {
    const [y, mo] = m.split("-").map(Number);
    return { value: m, label: (y !== today.getFullYear() ? `${y}年` : "") + `${mo}月` };
  });

  makeChips(document.getElementById("month-chips"), months, "month");
  makeChips(document.getElementById("area-chips"),
    AREAS.filter((a) => events.some((e) => e.area === a)).map((a) => ({ value: a, label: a })), "area");
  makeChips(document.getElementById("tag-chips"),
    TAGS.filter((t) => events.some((e) => e.tags.includes(t))).map((t) => ({ value: t, label: t })), "tag");

  document.getElementById("q").addEventListener("input", (e) => { state.q = e.target.value.trim(); render(); });
  document.getElementById("free-only").addEventListener("change", (e) => { state.freeOnly = e.target.checked; render(); });
  document.getElementById("show-past").addEventListener("change", (e) => { state.showPast = e.target.checked; render(); });

  // ---------- render ----------
  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function card(ev) {
    const past = isPast(ev);
    const c = el("article", "card" + (past ? " is-past" : ""));

    const head = el("div", "card-date");
    const dd = displayDate(ev);
    const box = el("div", "date-box");
    box.appendChild(el("span", "m", `${dd.getMonth() + 1}月`));
    box.appendChild(el("span", "d", String(dd.getDate())));
    if (ev.dateText && ev.status === "tentative") box.querySelector(".d").textContent = "頃";
    if (toDate(ev.start) < today && !past) {
      box.classList.add("is-now");
      box.textContent = "";
      box.appendChild(el("span", "m", "いま"));
      box.appendChild(el("span", "d", "開催中"));
    }
    head.appendChild(box);
    head.appendChild(el("div", "date-text", formatRange(ev)));
    c.appendChild(head);

    const body = el("div", "card-body");
    const badges = el("div", "badges");
    badges.appendChild(el("span", "badge area", ev.area));
    if (ev.price === "無料") badges.appendChild(el("span", "badge free", "無料"));
    if (ev.status === "tentative") badges.appendChild(el("span", "badge tentative", "予定"));
    if (past) badges.appendChild(el("span", "badge past", "終了"));
    ev.tags.forEach((t) => badges.appendChild(el("span", "badge", t)));
    body.appendChild(badges);

    body.appendChild(el("h3", null, ev.title));
    body.appendChild(el("p", "meta", `📍 ${ev.city}・${ev.venue}　💴 ${ev.price}`));
    body.appendChild(el("p", "summary", ev.summary));
    if (ev.age) body.appendChild(el("p", "age", `👪 ${ev.age}`));

    const a = el("a", "card-link", "詳しく見る（情報元）→");
    a.href = ev.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    body.appendChild(a);

    c.appendChild(body);
    return c;
  }

  // ---------- map ----------
  const OKINAWA_CENTER = [26.45, 127.85];
  let map = null;
  let markerLayer = null;
  let view = new URLSearchParams(location.search).get("view") === "map" ? "map" : "list";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => (
      { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function initMap() {
    if (map || !window.L) return;
    map = L.map("map", { scrollWheelZoom: false }).setView(OKINAWA_CENTER, 9);
    // 国土地理院の地図（出典の表示が利用条件）
    L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener">地理院タイル</a>'
    }).addTo(map);
    markerLayer = L.layerGroup().addTo(map);
  }

  function renderMap(list) {
    const note = document.getElementById("map-note");
    if (!window.L) { note.textContent = "地図を読み込めませんでした。通信状況を確認して再読み込みしてください。"; return; }
    initMap();
    markerLayer.clearLayers();

    // 同じ会場のイベントは1つのピンにまとめる
    const groups = new Map();
    list.filter((ev) => typeof ev.lat === "number" && typeof ev.lng === "number").forEach((ev) => {
      const key = ev.lat + "," + ev.lng;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(ev);
    });

    const points = [];
    groups.forEach((evs) => {
      const { lat, lng } = evs[0];
      points.push([lat, lng]);
      const allPast = evs.every(isPast);
      const anyNow = evs.some((ev) => !isPast(ev) && toDate(ev.start) <= today);
      const cls = allPast ? "is-past" : anyNow ? "is-now" : "";
      const icon = L.divIcon({
        className: "pin-icon " + cls,
        html: `<div class="pin ${cls}"><span>${evs.length > 1 ? evs.length : ""}</span></div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 34],
        popupAnchor: [0, -32]
      });
      const items = evs.map((ev) => `
        <div class="popup-event${isPast(ev) ? " is-past" : ""}">
          <h4>${esc(ev.title)}${isPast(ev) ? "（終了）" : ""}</h4>
          <p>📅 ${esc(formatRange(ev))}${ev.status === "tentative" ? "（予定）" : ""}</p>
          <p>💴 ${esc(ev.price)}</p>
          <a href="${esc(ev.url)}" target="_blank" rel="noopener noreferrer">詳しく見る（情報元）→</a>
        </div>`).join("");
      const gmap = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
      L.marker([lat, lng], { icon, title: evs[0].venue, zIndexOffset: allPast ? -100 : 0 })
        .bindPopup(`<p class="popup-venue">📍 ${esc(evs[0].city)}・${esc(evs[0].venue)}</p>${items}
          <a class="popup-gmap" href="${gmap}" target="_blank" rel="noopener">Googleマップで開く</a>`, { maxWidth: 260 })
        .addTo(markerLayer);
    });

    const noPlace = list.length - list.filter((ev) => typeof ev.lat === "number").length;
    note.textContent = (points.length ? "" : "この条件で地図に出せるイベントはありません。") +
      (noPlace ? `会場が決まっていない・場所を確認中のイベント ${noPlace} 件は地図に表示していません（一覧で見られます）。` : "") +
      " ピンは会場のおおよその位置です。";

    if (points.length === 1) map.setView(points[0], 13);
    else if (points.length > 1) map.fitBounds(points, { padding: [40, 40], maxZoom: 13 });
    else map.setView(OKINAWA_CENTER, 9);
  }

  function setView(v) {
    view = v;
    document.querySelectorAll(".view-btn").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.view === v)));
    document.getElementById("cards").hidden = v !== "list";
    document.getElementById("map-wrap").hidden = v !== "map";
    const url = new URL(location.href);
    if (v === "map") url.searchParams.set("view", "map"); else url.searchParams.delete("view");
    history.replaceState(null, "", url);
    render();
    if (v === "map" && map) map.invalidateSize();
  }
  document.querySelectorAll(".view-btn").forEach((b) => b.addEventListener("click", () => setView(b.dataset.view)));

  function render() {
    const q = state.q.toLowerCase();
    const list = events
      .filter((ev) => state.showPast || !isPast(ev))
      .filter((ev) => !state.month || monthsOf(ev).includes(state.month))
      .filter((ev) => !state.area || ev.area === state.area)
      .filter((ev) => !state.tag || ev.tags.includes(state.tag))
      .filter((ev) => !state.freeOnly || ev.price === "無料")
      .filter((ev) => !q || [ev.title, ev.venue, ev.city, ev.summary].join(" ").toLowerCase().includes(q))
      .sort((a, b) => (isPast(a) - isPast(b)) || (displayDate(a) - displayDate(b)) || a.end.localeCompare(b.end));

    const wrap = document.getElementById("cards");
    wrap.textContent = "";
    if (list.length === 0) {
      wrap.appendChild(el("div", "empty", "条件にあうイベントが見つかりませんでした。条件をゆるめてみてください。"));
    } else {
      list.forEach((ev) => wrap.appendChild(card(ev)));
    }
    document.getElementById("count").textContent = `${list.length} 件のイベント`;
    if (view === "map") renderMap(list);
  }

  setView(view);
})();
