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
  }

  render();
})();
