// ONLINE RESİM KAYNAKLARI (Garantili çalışırlar)
const monsters = [
  { id: 1, name: "Poring",  url: "https://static.divine-pride.net/images/mobs/png/1002.png" },
  { id: 2, name: "Lunatic", url: "https://static.divine-pride.net/images/mobs/png/1063.png" },
  { id: 3, name: "Savage",  url: "https://static.divine-pride.net/images/mobs/png/1167.png" },
  { id: 4, name: "Wolf",    url: "https://static.divine-pride.net/images/mobs/png/1107.png" },
  { id: 5, name: "Devi",    url: "https://static.divine-pride.net/images/mobs/png/1109.png" },
  { id: 6, name: "Bapho",   url: "https://static.divine-pride.net/images/mobs/png/1101.png" } // Bapho Jr yerine benzer ikon
];

let state = {
  mode: "single",
  bet: [],
  result: [],
  history: [],
  journal: [],
  journalSelected: 0,
  journalErrors: [],
  extraMedals: 0,
  journalSettings: { thresholdSingle: 2, thresholdPair: 2 },
  streaks: { singles: {}, pair: { key: null, len: 0 } },
  _streakSnapshot: { singles: {}, pair: { key: null, len: 0 } }
};

const translations = {
  tr: {
    "nav.main": "Ana Ekran",
    "nav.archive": "Arşiv",
    "button.undo": "Geri Al",
    "step.bet": "1. BAHİS SEÇİMİ",
    "step.result": "2. YARIŞ SONUCU",
    "button.process": "Veriyi İşle",
    "status.waiting": "Bahis Bekleniyor...",
    "status.enterResults": "Bahis: {bet} (Sonuçları gir)",
    "status.result": "Bahis: {bet} -> Sonuç: {result}",
    "panel.cash": "Kasa Durumu",
    "label.totalMedals": "TOPLAM MADALYA",
    "label.spent": "HARCANAN",
    "label.winRate": "WIN RATE",
    "panel.manualMedals": "Manuel Madalya",
    "button.add": "Ekle",
    "label.totalManual": "Toplam Manuel",
    "button.reset": "Sıfırla",
    "alert.raw": "ÖNEMLİ DİKKAT: UZUN SÜREDİR RAW GELMEDİ!",
    "panel.heatmap": "Kazanma Sıklığı",
    "panel.settings": "Özel Ayarlar",
    "button.resetAll": "RESET",
    "panel.archiveControl": "Arşiv Kontrolü",
    "button.compute": "Hesaplamayı Başlat",
    "button.list": "Listele",
    "button.importHistory": "Geçmiş Aktar (JSON)",
    "button.downloadCsv": "Arşivi İndir (CSV)",
    "button.downloadJson": "Arşivi İndir (JSON)",
    "button.copyJson": "JSON Kopyala",
    "button.clearArchive": "Arşivi Temizle",
    "panel.errorLog": "Hata Günlüğü",
    "text.noErrors": "Henüz hata yok.",
    "panel.allRecords": "Tüm Kayıtlar",
    "label.total": "Toplam",
    "label.len": "Uzunluk",
    "label.type": "TIP",
    "label.mode": "MOD",
    "text.noRecords": "Henüz kayıt yok.",
    "panel.last20": "Son 20 Yarış",
    "panel.selected": "Seçili Kayıt",
    "panel.summary": "Özet",
    "panel.streaksProb": "Seriler & İhtimaller",
    "text.noActiveStreak": "Aktif seri bulunamadı.",
    "panel.topProb": "En Düşük 3 Olasılık",
    "panel.top3": "En Şanslı 3 Seri",
    "error.label": "Hata",
    "text.noEntry": "Kayıt yok.",
    "text.noData": "Veri yok.",
    "text.noEnd": "Henüz END yok.",
    "text.noProb": "Veri yok.",
    "summary.title": "Arşiv Özeti",
    "journal.round": "Tur kaydı",
    "confirm.clearArchive": "Arşivi temizlemek istiyor musun?",
    "confirm.resetAll": "Tüm geçmiş ve arşiv sıfırlansın mı?",
    "error.archiveEmpty": "Arşiv oluşturulamadı: geçmiş var ama arşiv boş kaldı.",
    "error.archiveRebuildEmpty": "Arşiv yeniden oluşturuldu ama kayıt oluşmadı.",
    "error.importInvalid": "Import başarısız: geçerli geçmiş bulunamadı.",
    "status.win": "WIN ✅ Tur işlendi.",
    "status.lose": "LOSE ❌ Tur işlendi.",
    "validation.singleBet": "Tekli mod: 1 bahis seçmelisin.",
    "validation.doubleBet": "İkili mod: 2 bahis seçmelisin.",
    "validation.doubleSame": "İkili mod: Bahisler aynı olamaz.",
    "validation.resultTwo": "Sonuçta 2 kazanan seçmelisin.",
    "validation.resultSame": "Sonuçta aynı canavar 2 kez olamaz."
  },
  en: {
    "nav.main": "Main",
    "nav.archive": "Archive",
    "button.undo": "Undo",
    "step.bet": "1. BET SELECTION",
    "step.result": "2. RACE RESULT",
    "button.process": "Process Data",
    "status.waiting": "Waiting for bet...",
    "status.enterResults": "Bet: {bet} (Enter results)",
    "status.result": "Bet: {bet} -> Result: {result}",
    "panel.cash": "Cash Status",
    "label.totalMedals": "TOTAL MEDALS",
    "label.spent": "SPENT",
    "label.winRate": "WIN RATE",
    "panel.manualMedals": "Manual Medals",
    "button.add": "Add",
    "label.totalManual": "Manual Total",
    "button.reset": "Reset",
    "alert.raw": "IMPORTANT: NO RAW FOR A LONG TIME!",
    "panel.heatmap": "Win Frequency",
    "panel.settings": "Advanced Settings",
    "button.resetAll": "RESET",
    "panel.archiveControl": "Archive Control",
    "button.compute": "Rebuild",
    "button.list": "List",
    "button.importHistory": "Import History (JSON)",
    "button.downloadCsv": "Download Archive (CSV)",
    "button.downloadJson": "Download Archive (JSON)",
    "button.copyJson": "Copy JSON",
    "button.clearArchive": "Clear Archive",
    "panel.errorLog": "Error Log",
    "text.noErrors": "No errors yet.",
    "panel.allRecords": "All Records",
    "label.total": "Total",
    "label.len": "Length",
    "label.type": "TYPE",
    "label.mode": "MODE",
    "text.noRecords": "No records yet.",
    "panel.last20": "Last 20 Races",
    "panel.selected": "Selected Record",
    "panel.summary": "Summary",
    "panel.streaksProb": "Streaks & Odds",
    "text.noActiveStreak": "No active streaks.",
    "panel.topProb": "Top 3 Lowest Odds",
    "panel.top3": "Top 3 Luckiest Streaks",
    "error.label": "Error",
    "text.noEntry": "No record.",
    "text.noData": "No data.",
    "text.noEnd": "No END yet.",
    "text.noProb": "No data.",
    "summary.title": "Archive Summary",
    "journal.round": "Round entry",
    "confirm.clearArchive": "Do you want to clear the archive?",
    "confirm.resetAll": "Reset all history and archive?",
    "error.archiveEmpty": "Archive not created: history exists but archive is empty.",
    "error.archiveRebuildEmpty": "Archive rebuilt but no entries were produced.",
    "error.importInvalid": "Import failed: no valid history found.",
    "status.win": "WIN ✅ Round processed.",
    "status.lose": "LOSE ❌ Round processed.",
    "validation.singleBet": "Single mode: select 1 bet.",
    "validation.doubleBet": "Double mode: select 2 bets.",
    "validation.doubleSame": "Double mode: bets cannot be the same.",
    "validation.resultTwo": "Select 2 winners in the result.",
    "validation.resultSame": "Result cannot contain the same monster twice."
  }
};

function t(key, vars = {}) {
  const lang = state.language || "tr";
  const dict = translations[lang] || translations.tr;
  let value = dict[key] || translations.tr[key] || key;
  Object.entries(vars).forEach(([k, v]) => {
    value = value.replaceAll(`{${k}}`, v);
  });
  return value;
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (key) el.textContent = t(key);
  });
  document.querySelectorAll(".lang-btn").forEach(btn => {
    const lang = btn.textContent.includes("TR") ? "tr" : "en";
    btn.classList.toggle("active", state.language === lang);
  });
}

function setLanguage(lang) {
  state.language = lang === "en" ? "en" : "tr";
  try { localStorage.setItem("prob_hugel_lang", state.language); } catch {}
  applyTranslations();
  render();
  renderJournal();
  updateStats();
  renderJournalErrors();
}

const LS_KEYS = ["prob_hugel_state_v2", "prob_hugel_state", "prob_hugel_state_v1"];

window.onload = () => {
  loadState();
  try { state.language = localStorage.getItem("prob_hugel_lang") || "tr"; }
  catch { state.language = "tr"; }
  if (state.history.length && (!Array.isArray(state.journal) || !state.journal.length)) {
    rebuildJournalFromHistory();
    saveState();
  }
  if (state.history.length && (!Array.isArray(state.journal) || !state.journal.length)) {
    logJournalError(t("error.archiveEmpty"), {
      historyCount: state.history.length
    });
  }
  const hashPage =
    location.hash === "#journal" ? "journal" :
    (location.hash === "#main" ? "main" : null);
  const lastPage = hashPage || localStorage.getItem("prob_hugel_last_page") || "main";

  showPage(lastPage);
  applyTranslations();
  render();
  updateStats();
  renderJournal();
  renderJournalErrors();
};

function showPage(target) {
  const main = document.getElementById("page-main");
  const journal = document.getElementById("page-journal");
  const navMain = document.getElementById("nav-main");
  const navJournal = document.getElementById("nav-journal");
  if (!main || !journal || !navMain || !navJournal) return;

  const isJournal = target === "journal";
  main.classList.toggle("active", !isJournal);
  journal.classList.toggle("active", isJournal);
  navMain.classList.toggle("active", !isJournal);
  navJournal.classList.toggle("active", isJournal);

  const newHash = isJournal ? "#journal" : "#main";
  if (location.hash !== newHash) location.hash = newHash;

  try { localStorage.setItem("prob_hugel_last_page", isJournal ? "journal" : "main"); }
  catch (err) { console.warn("Page state not persisted:", err); }

  if (isJournal) renderJournal();
}

function setMode(m) {
  state.mode = m;
  state.bet = [];
  state.result = [];
  document.getElementById("btn-single").className = m === "single" ? "mode-btn active" : "mode-btn";
  document.getElementById("btn-double").className = m === "double" ? "mode-btn active" : "mode-btn";
  render();
}

function sanitizeSelections() {
  const validIds = new Set(monsters.map(m => m.id));
  const fixArr = (arr, limit) => (Array.isArray(arr) ? arr : [])
    .map(v => parseInt(v, 10))
    .filter(v => validIds.has(v))
    .slice(0, limit);

  state.bet = fixArr(state.bet, 2);
  state.result = fixArr(state.result, 2);
}

function toggleBet(id) {
  id = parseInt(id, 10);
  const limit = state.mode === "single" ? 1 : 2;

  if (state.bet.includes(id)) state.bet = state.bet.filter(x => x !== id);
  else {
    if (state.bet.length < limit) state.bet.push(id);
    else if (state.mode === "single") state.bet = [id];
  }
  render();
}

function toggleRes(id) {
  id = parseInt(id, 10);
  if (state.result.includes(id)) state.result = state.result.filter(x => x !== id);
  else if (state.result.length < 2) state.result.push(id);
  render();
}

function render() {
  sanitizeSelections();

  // Bet Grid
  document.getElementById("bet-grid").innerHTML = monsters.map(m => {
    const isSel = state.bet.includes(m.id);
    return `<div class="card ${isSel ? "selected" : ""}" onclick="toggleBet(${m.id})">
      <span class="card-id">#${m.id}</span>
      <img src="${m.url}">
      <span class="card-name">${escapeHtml(m.name)}</span>
    </div>`;
  }).join("");

  // Result Grid
  document.getElementById("res-grid").innerHTML = monsters.map(m => {
    let cls = "", badge = "";
    if (state.result[0] === m.id) { cls = "winner-1"; badge = `<div class="badge" style="background:#f59e0b">1.</div>`; }
    else if (state.result[1] === m.id) { cls = "winner-2"; badge = `<div class="badge" style="background:#fff">2.</div>`; }

    return `<div class="card ${cls}" onclick="toggleRes(${m.id})">
      <span class="card-id">#${m.id}</span> ${badge}
      <img src="${m.url}" style="opacity:${cls ? 1 : 0.3}">
      <span class="card-name">${escapeHtml(m.name)}</span>
    </div>`;
  }).join("");

  const bNames = state.bet.map(i => (getMonsterById(i) || {}).name).filter(Boolean).join(" & ");
  const rNames = state.result.map(i => (getMonsterById(i) || {}).name).filter(Boolean).join(", ");
  const status = document.getElementById("status-text");
  if (!status) return;

  if (!state.bet.length) status.innerText = t("status.waiting");
  else if (state.result.length < 2) {
    status.innerHTML = t("status.enterResults", {
      bet: `<b style="color:#fff">${escapeHtml(bNames)}</b>`
    });
  } else {
    status.innerHTML = t("status.result", {
      bet: `<b>${escapeHtml(bNames)}</b>`,
      result: `<b style="color:var(--kick-green)">${escapeHtml(rNames)}</b>`
    });
  }
}

// ---------- STREAK / PROB ----------
function normalizeStreakState(input) {
  const base = input || {};
  return {
    singles: base.singles || {},
    pair: base.pair || { key: base.pairKey || null, len: base.pairLen || 0 }
  };
}

function snapshotWithCompat(curr) {
  return {
    singles: curr.singles || {},
    pair: curr.pair || { key: null, len: 0 }
  };
}

function computeCurrentStreakState(history, monstersList) {
  const singles = {};
  monstersList.forEach(m => {
    let s = 0;
    for (let i = 0; i < history.length; i++) {
      const res = Array.isArray(history[i]?.result) ? history[i].result : [];
      if (res.includes(m.id)) s++;
      else break;
    }
    singles[m.id] = s;
  });

  let pairKey = null;
  let pairLen = 0;
  if (history.length && Array.isArray(history[0]?.result)) {
    const getKey = (h) => (Array.isArray(h?.result) ? h.result : []).slice().sort((a, b) => a - b).join("-");
    pairKey = getKey(history[0]) || null;
    if (pairKey) {
      for (let i = 0; i < history.length; i++) {
        if (getKey(history[i]) === pairKey) pairLen++;
        else break;
      }
    }
  }

  return { singles, pair: { key: pairKey, len: pairLen } };
}

function formatPercent(probability) {
  if (!probability || probability <= 0) return "0.00";
  const pct = probability * 100;
  return pct.toFixed(pct >= 1 ? 2 : 3);
}

function formatScientific(probability) {
  if (!probability || probability <= 0) return "0";
  const [mantissa, exp] = probability.toExponential(2).split("e");
  const expNum = Number(exp);
  return `${mantissa}×10^${expNum}`;
}

function formatOddsDenominator(oddsDenominator) {
  if (oddsDenominator == null) return "-";
  if (typeof oddsDenominator === "object") {
    return `${oddsDenominator.num} / ${oddsDenominator.den}`;
  }
  return `1 / ${oddsDenominator}`;
}

function resolveEventType(entry) {
  if (entry?.eventType) return entry.eventType;
  if (entry?.streakType) return entry.streakType;
  if (Array.isArray(entry?.keys) && entry.keys.length === 2) return "PAIR";
  if (typeof entry?.subjectKey === "string" && entry.subjectKey.includes("-")) return "PAIR";
  return "SINGLE";
}

function resolveEntryModel(entry) {
  if (entry?.type === "EXTEND") return "CHAIN";
  if (entry?.model) return entry.model;
  if (entry?.type === "ROUND") return null;
  return "BASE";
}

function normalizeEntry(entry) {
  const eventType = resolveEventType(entry);
  const model = resolveEntryModel(entry);
  const length = entry?.length || entry?.len || 1;
  let keys = Array.isArray(entry?.keys) ? entry.keys : [];
  if (!keys.length && typeof entry?.subjectKey === "string") {
    keys = entry.subjectKey.split("-").filter(Boolean);
  }
  if (!keys.length && eventType === "SINGLE" && entry?.subjectKey) {
    keys = [String(entry.subjectKey)];
  }
  const probability = entry?.probability;
  const oddsDenominator = entry?.oddsDenominator;
  const difficulty = entry?.difficulty;
  return {
    ...entry,
    eventType,
    model,
    length,
    keys,
    context: entry?.context ?? null,
    probability,
    oddsDenominator,
    difficulty
  };
}

function computeProbability(event, N) {
  const safeN = Math.max(1, Number(N) || 1);
  const normalized = normalizeEntry(event);
  const eventType = normalized.eventType;
  const model = normalized.model;
  const length = Math.max(1, Number(normalized.length) || 1);
  let probability = null;
  let oddsDenominator = null;

  if (!model || normalized.type === "ROUND") {
    return { probability: null, oddsDenominator: null, difficulty: null };
  }

  if (model === "BASE") {
    if (eventType === "SINGLE") {
      probability = 1 / safeN;
      oddsDenominator = safeN;
    } else if (eventType === "PAIR") {
      probability = 1 / (safeN * safeN);
      oddsDenominator = safeN * safeN;
    }
  } else if (model === "CONDITIONAL") {
    if (eventType === "SINGLE") {
      const den = safeN * safeN;
      const num = (2 * safeN - 1);
      probability = num / den;
      oddsDenominator = { num, den };
    } else if (eventType === "PAIR") {
      probability = 1 / (safeN * safeN);
      oddsDenominator = safeN * safeN;
    }
  } else if (model === "CHAIN") {
    if (eventType === "SINGLE") {
      probability = Math.pow(1 / safeN, length);
      oddsDenominator = Math.pow(safeN, length);
    } else if (eventType === "PAIR") {
      const base = safeN * safeN;
      probability = Math.pow(1 / base, length);
      oddsDenominator = Math.pow(base, length);
    }
  }

  const difficulty = probability ? -Math.log10(probability) : null;
  return { probability, oddsDenominator, difficulty };
}

function buildProbabilityInfo(entry, N) {
  const normalized = normalizeEntry(entry);
  let probability = normalized.probability;
  let oddsDenominator = normalized.oddsDenominator;
  let difficulty = normalized.difficulty;

  if (probability == null && normalized.prob?.oneIn) {
    probability = 1 / normalized.prob.oneIn;
    oddsDenominator = normalized.prob.oneIn;
  }

  if (probability == null && normalized.model) {
    const computed = computeProbability(normalized, N);
    probability = computed.probability;
    oddsDenominator = computed.oddsDenominator;
    difficulty = computed.difficulty;
  }

  if (difficulty == null && probability != null) {
    difficulty = -Math.log10(probability);
  }

  return {
    probability,
    oddsDenominator,
    difficulty,
    pct: probability != null ? formatPercent(probability) : null,
    oddsText: oddsDenominator != null ? formatOddsDenominator(oddsDenominator) : null,
    scientific: probability != null ? formatScientific(probability) : null
  };
}

function getOddsSortValue(probInfo) {
  if (!probInfo?.probability) return 0;
  return 1 / probInfo.probability;
}

function deriveConditionalSinglesFromPair(outcomePair, N) {
  const ids = Array.isArray(outcomePair) ? outcomePair.filter(Boolean) : [];
  const unique = Array.from(new Set(ids)).map(id => String(id));
  return unique.map(key => ({
    key,
    context: {
      mode: "PAIR",
      targetKey: key,
      slots: "PAIR_SLOT",
      outcome: ids.map(id => String(id))
    },
    probability: computeProbability({ eventType: "SINGLE", model: "CONDITIONAL", length: 1 }, N).probability
  }));
}

function getMonsterById(id) {
  return monsters.find(m => m.id === id);
}

function namesFromKey(key) {
  if (!key) return [];
  const ids = key.split("-").map(x => parseInt(x, 10)).filter(Boolean);
  return ids.map(id => (getMonsterById(id) || {}).name).filter(Boolean);
}

function resolveJournalThresholds(settings) {
  const cfg = settings || state.journalSettings || {};
  const tSingle = Math.max(1, parseInt(cfg.thresholdSingle ?? 2, 10) || 2);
  const tPair = Math.max(1, parseInt(cfg.thresholdPair ?? 2, 10) || 2);
  return { tSingle, tPair };
}

// ---------- JOURNAL CORE ----------
function updateJournalFromStreakChange(prevInput, currInput, roundCtx, opts = {}) {
  try {
    const prev = normalizeStreakState(prevInput);
    const curr = normalizeStreakState(currInput);

    const target = Array.isArray(opts.target) ? opts.target : state.journal;
    const thresholds = opts.thresholds || resolveJournalThresholds(opts.settings || state.journalSettings);
    const { tSingle, tPair } = thresholds;
    if (!Array.isArray(target)) return;

    const addEntry = (type, streakType, subjectKey, subjectNames, len, extra = {}) => {
      const ts = (roundCtx && roundCtx.id) ? new Date(roundCtx.id).toISOString() : new Date().toISOString();
      const eventType = streakType === "PAIR" ? "PAIR" : "SINGLE";
      const model = type === "EXTEND" ? "CHAIN" : (extra.model || "BASE");
      const keys = eventType === "PAIR"
        ? String(subjectKey || "").split("-").filter(Boolean)
        : [String(subjectKey || "")].filter(Boolean);
      const entryBase = {
        ts,
        roundId: roundCtx?.id ?? null,
        type,
        streakType,
        subjectKey,
        subjectNames,
        len,
        eventType,
        model,
        length: len,
        keys,
        context: extra.context ?? null
      };
      const probInfo = buildProbabilityInfo(entryBase, monsters.length);
      target.unshift({
        ...entryBase,
        probability: probInfo.probability,
        oddsDenominator: probInfo.oddsDenominator,
        difficulty: probInfo.difficulty
      });
    };

    const addRoundEntry = () => {
      if (!roundCtx?.id) return;
      const ts = new Date(roundCtx.id).toISOString();
      const streakType = roundCtx.mode === "double" ? "PAIR" : "SINGLE";
      const res = Array.isArray(roundCtx.result) ? roundCtx.result : [];
      const subjectNames = res.map(i => (getMonsterById(i) || {}).name).filter(Boolean);
      target.unshift({
        ts,
        roundId: roundCtx.id,
        type: "ROUND",
        streakType,
        subjectKey: null,
        subjectNames,
        len: 1,
        eventType: streakType,
        model: null,
        length: 1,
        keys: [],
        context: null,
        probability: null,
        oddsDenominator: null,
        difficulty: null
      });
    };

    // SINGLE streak changes (her monster için)
    monsters.forEach(m => {
      const id = m.id;
      const prevLen = prev.singles?.[id] || 0;
      const currLen = curr.singles?.[id] || 0;

      if (prevLen >= tSingle && currLen < tSingle) {
        const conditional = roundCtx?.mode === "double"
          ? deriveConditionalSinglesFromPair(roundCtx?.result || [], monsters.length)
          : [];
        const ctxEntry = conditional.find(c => c.key === String(id));
        addEntry("END", "SINGLE", String(id), [m.name], prevLen, {
          model: roundCtx?.mode === "double" ? "CONDITIONAL" : "BASE",
          context: roundCtx?.mode === "double"
            ? (ctxEntry?.context || {
              mode: "PAIR",
              targetKey: String(id),
              slots: "PAIR_SLOT",
              outcome: (roundCtx?.result || []).map(x => String(x))
            })
            : null
        });
      } else if (currLen >= tSingle && prevLen < tSingle) {
        const conditional = roundCtx?.mode === "double"
          ? deriveConditionalSinglesFromPair(roundCtx?.result || [], monsters.length)
          : [];
        const ctxEntry = conditional.find(c => c.key === String(id));
        addEntry("START", "SINGLE", String(id), [m.name], currLen, {
          model: roundCtx?.mode === "double" ? "CONDITIONAL" : "BASE",
          context: roundCtx?.mode === "double"
            ? (ctxEntry?.context || {
              mode: "PAIR",
              targetKey: String(id),
              slots: "PAIR_SLOT",
              outcome: (roundCtx?.result || []).map(x => String(x))
            })
            : null
        });
      } else if (currLen >= tSingle && prevLen >= tSingle && currLen > prevLen) {
        addEntry("EXTEND", "SINGLE", String(id), [m.name], currLen);
      }
    });

    // PAIR streak changes
    const prevKey = prev.pair?.key || null;
    const prevLen = prev.pair?.len || 0;
    const currKey = curr.pair?.key || null;
    const currLen = curr.pair?.len || 0;

    if (prevKey && (currKey !== prevKey || currLen < tPair)) {
      if (prevLen >= tPair) addEntry("END", "PAIR", prevKey, namesFromKey(prevKey), prevLen);
      if (currKey && currLen >= tPair && prevKey !== currKey) addEntry("START", "PAIR", currKey, namesFromKey(currKey), currLen);
    } else if (currKey) {
      if (currLen >= tPair && prevLen < tPair) addEntry("START", "PAIR", currKey, namesFromKey(currKey), currLen);
      else if (currLen >= tPair && prevLen >= tPair && currLen > prevLen) addEntry("EXTEND", "PAIR", currKey, namesFromKey(currKey), currLen);
    }

    // Her tur için (isteğe bağlı) ROUND kaydı: son kayıt aynı roundId değilse ekle
    if (roundCtx && roundCtx.id) {
      const currentRoundHasEntry = target[0] && target[0].roundId === roundCtx.id;
      if (!currentRoundHasEntry) addRoundEntry();
    }

  } catch (err) {
    console.error("Journal update failed:", err);
    logJournalError("Journal update failed.", { error: String(err) });
  }
}

function logJournalError(message, details = {}) {
  const list = Array.isArray(state.journalErrors) ? state.journalErrors : [];
  const entry = {
    ts: new Date().toISOString(),
    message,
    details
  };
  list.unshift(entry);
  state.journalErrors = list.slice(0, 50);
  saveState();
  renderJournalErrors();
}

function renderJournalErrors() {
  const list = document.getElementById("journal-error-list");
  const empty = document.getElementById("journal-error-empty");
  if (!list || !empty) return;

  const entries = Array.isArray(state.journalErrors) ? state.journalErrors : [];
  if (!entries.length) {
    list.innerHTML = "";
    empty.style.display = "block";
    return;
  }

  empty.style.display = "none";
  list.innerHTML = entries.map(e => {
    const ts = formatTs(e.ts);
    const detail = e.details ? JSON.stringify(e.details) : "";
    return `
      <div class="journal-item">
        <div class="journal-top">
          <div class="journal-left">
            <div class="journal-title">${escapeHtml(t("error.label"))}</div>
            <div class="journal-meta">${escapeHtml(e.message || "Bilinmeyen hata")}</div>
          </div>
        </div>
        <div class="journal-ts">${escapeHtml(ts)}${detail ? ` • ${escapeHtml(detail)}` : ""}</div>
      </div>`;
  }).join("");
}


function rebuildJournalFromHistory() {
  try {
    const history = Array.isArray(state.history) ? state.history : [];
    const target = [];
    let prevSnap = snapshotWithCompat({ singles: {}, pair: { key: null, len: 0 } });
    const tempHistory = [];
    const ordered = history.slice().reverse();

    ordered.forEach(round => {
      tempHistory.unshift(round);
      const currSnap = computeCurrentStreakState(tempHistory, monsters);
      updateJournalFromStreakChange(prevSnap, currSnap, round, {
        target,
        thresholds: resolveJournalThresholds(state.journalSettings),
        settings: state.journalSettings
      });
      prevSnap = snapshotWithCompat(currSnap);
    });

    state.journal = target;
    state.journalSelected = 0;
    state._streakSnapshot = snapshotWithCompat(prevSnap);
    state.streaks = snapshotWithCompat(prevSnap);

    if (history.length && !target.length) {
      logJournalError(t("error.archiveRebuildEmpty"), {
        historyCount: history.length
      });
    }
  } catch (err) {
    console.error("Journal rebuild failed:", err);
    logJournalError("Journal rebuild failed.", { error: String(err) });
  }
}

function startJournalComputation() {
  rebuildJournalFromHistory();
  saveState();
  renderJournal(true);
  updateStats();
  renderJournalErrors();
}




// ---------- JOURNAL UI ----------
function renderJournal(forceRefresh = false) {
  const list = document.getElementById("journal-full-list");
  const empty = document.getElementById("journal-full-empty");
  const total = document.getElementById("journal-total-count");
  const detail = document.getElementById("journal-detail-page");
  const summary = document.getElementById("journal-summary-page");
  const leaderboard = document.getElementById("leaderboard-list");
  if (!list || !empty || !total) return;

  let entries = Array.isArray(state.journal) ? state.journal : [];
  total.textContent = String(entries.length);

  if (!entries.length) {
    list.innerHTML = "";
    empty.style.display = "block";
    if (detail) detail.innerHTML = `<div style="color:#444; font-size:0.8rem; text-align:center;">${escapeHtml(t("text.noEntry"))}</div>`;
    if (summary) summary.innerHTML = renderJournalSummaryHtml();
    if (leaderboard) leaderboard.innerHTML = `<div style="color:#444; font-size:0.8rem; text-align:center;">${escapeHtml(t("text.noData"))}</div>`;
    return;
  }

  empty.style.display = "none";

  const safeSel = clamp(state.journalSelected || 0, 0, entries.length - 1);
  state.journalSelected = safeSel;

  list.innerHTML = entries.map((e, idx) => renderJournalItemHtml(e, idx, idx === safeSel)).join("");

  // right panels
  if (detail) detail.innerHTML = renderJournalDetailHtml(entries[safeSel]);
  if (summary) summary.innerHTML = renderJournalSummaryHtml();
  if (leaderboard) leaderboard.innerHTML = renderLeaderboardHtml(entries);
  renderProbabilityLeaderboard();
  renderJournalErrors();
}

function resetJournal() {
  state.journal = [];
  state.journalSelected = 0;
  saveState();
  renderJournal();
}

function renderJournalItemHtml(e, idx, isActive) {
  const normalized = normalizeEntry(e);
  const probInfo = buildProbabilityInfo(normalized, monsters.length);
  const typeCls = normalized.type || "ROUND";
  const activeCls = isActive ? "active" : "";
  const title = journalTitle(normalized);
  const meta = journalMeta(normalized, probInfo);
  const probLine = probInfo.probability != null
    ? `<div class="prob">%${escapeHtml(probInfo.pct || "-")}</div><div class="onein">${escapeHtml(probInfo.oddsText || "-")}</div>`
    : `<div class="prob">—</div><div class="onein">ROUND</div>`;
  const ts = formatTs(normalized.ts);

  return `
  <div class="journal-item ${escapeHtml(typeCls)} ${activeCls}" onclick="selectJournalEntry(${idx})">
    <div class="journal-top">
      <div class="journal-left">
        <div class="journal-icons">${renderJournalIcons(normalized)}${renderJournalBadges(normalized)}</div>
        <div>
          <div class="journal-title">${escapeHtml(title)}</div>
          <div class="journal-meta">${escapeHtml(meta)}</div>
        </div>
      </div>
      <div class="journal-right">${probLine}</div>
    </div>
    <div class="journal-ts">${escapeHtml(ts)}${normalized.roundId ? ` • #${escapeHtml(String(normalized.roundId))}` : ""}</div>
  </div>`;
}

function selectJournalEntry(idx) {
  state.journalSelected = idx;
  renderJournal();
}

function renderJournalIcons(e) {
  const normalized = normalizeEntry(e);
  // subjectNames'den icon basmaya çalış; yoksa result'tan
  const names = Array.isArray(normalized.subjectNames) ? normalized.subjectNames : [];
  const ids = [];

  if (normalized.eventType === "PAIR" && normalized.keys.length) {
    normalized.keys.forEach(x => ids.push(parseInt(x, 10)));
  } else if (normalized.eventType === "SINGLE" && normalized.keys.length) {
    ids.push(parseInt(normalized.keys[0], 10));
  }

  // ROUND ise iconları subjectNames içinden çöz (name->id bulmak zor; result yoksa)
  if (!ids.length && names.length) {
    names.forEach(n => {
      const found = monsters.find(m => m.name.toLowerCase() === String(n).toLowerCase());
      if (found) ids.push(found.id);
    });
  }

  const uniq = Array.from(new Set(ids)).slice(0, 2);
  if (!uniq.length) return `<span class="journal-pill">?</span>`;

  return uniq.map(id => {
    const m = getMonsterById(id);
    if (!m) return "";
    return `<img class="journal-icon" src="${m.url}" title="${escapeHtml(m.name)}">`;
  }).join("");
}

function renderJournalBadges(e) {
  const badges = [];
  if (e.model === "CONDITIONAL") badges.push(`<span class="journal-badge conditional">C</span>`);
  if (e.model === "CHAIN") badges.push(`<span class="journal-badge chain">streak</span>`);
  return badges.length ? badges.join("") : "";
}

function renderJournalDetailHtml(e) {
  if (!e) return `<div style="color:#444; font-size:0.8rem; text-align:center;">${escapeHtml(t("text.noEntry"))}</div>`;

  const normalized = normalizeEntry(e);
  const probInfo = buildProbabilityInfo(normalized, monsters.length);
  const title = journalTitle(normalized);
  const meta = journalMeta(normalized, probInfo);
  const ts = formatTs(normalized.ts);
  const prob = probInfo.probability != null ? `%${probInfo.pct} (${probInfo.oddsText})` : "-";
  const sci = probInfo.scientific ? probInfo.scientific : "-";
  const pills = [
    `<span class="journal-pill">${escapeHtml(t("label.type"))}: <b>${escapeHtml(normalized.type)}</b></span>`,
    `<span class="journal-pill">Event: <b>${escapeHtml(normalized.eventType || "-")}</b></span>`,
    normalized.model ? `<span class="journal-pill">Model: <b>${escapeHtml(normalized.model)}</b></span>` : "",
    normalized.length ? `<span class="journal-pill">${escapeHtml(t("label.len"))}: <b>${escapeHtml(String(normalized.length))}</b></span>` : ""
  ].filter(Boolean).join(" ");

  const subj = Array.isArray(normalized.subjectNames) && normalized.subjectNames.length ? normalized.subjectNames.join(" + ") : "-";
  const keyText = normalized.keys.length ? normalized.keys.join(",") : "-";
  const diffText = probInfo.difficulty != null ? probInfo.difficulty.toFixed(2) : "-";

  return `
    <div class="journal-detail-title">${escapeHtml(title)}</div>
    <div class="journal-detail-meta">${escapeHtml(ts)}${normalized.roundId ? ` • RoundId: ${escapeHtml(String(normalized.roundId))}` : ""}</div>
    <div>${pills}</div>
    <div class="journal-kv"><span>Konu</span><b>${escapeHtml(subj)}</b></div>
    <div class="journal-kv"><span>Key</span><b>${escapeHtml(keyText)}</b></div>
    <div class="journal-kv"><span>Meta</span><b>${escapeHtml(meta)}</b></div>
    <div class="journal-kv"><span>İhtimal</span><b>${escapeHtml(prob)}</b></div>
    <div class="journal-kv"><span>Scientific</span><b>${escapeHtml(sci)}</b></div>
    <div class="journal-kv"><span>Diff</span><b>${escapeHtml(diffText)}</b></div>
  `;
}

function renderJournalSummaryHtml() {
  const entries = Array.isArray(state.journal) ? state.journal : [];
  const counts = { START: 0, EXTEND: 0, END: 0, ROUND: 0 };
  entries.forEach(e => { counts[e.type] = (counts[e.type] || 0) + 1; });

  const rare = entries.filter(e => getOddsSortValue(buildProbabilityInfo(e, monsters.length)) >= 500).length;
  const epic = entries.filter(e => getOddsSortValue(buildProbabilityInfo(e, monsters.length)) >= 2000).length;

  return `
    <div class="journal-detail-title">${escapeHtml(t("summary.title"))}</div>
    <div class="journal-kv"><span>${escapeHtml(t("label.total"))}</span><b>${entries.length}</b></div>
    <div class="journal-kv"><span>START</span><b>${counts.START}</b></div>
    <div class="journal-kv"><span>EXTEND</span><b>${counts.EXTEND}</b></div>
    <div class="journal-kv"><span>END</span><b>${counts.END}</b></div>
    <div class="journal-kv"><span>ROUND</span><b>${counts.ROUND}</b></div>
    <div style="margin-top:8px"></div>
    <div class="journal-kv"><span>500+ (rare)</span><b>${rare}</b></div>
    <div class="journal-kv"><span>2000+ (epic)</span><b>${epic}</b></div>
  `;
}

function renderLeaderboardHtml(entries) {
  const streakEnds = entries.filter(e => e.type === "END" && buildProbabilityInfo(e, monsters.length).probability != null);
  if (!streakEnds.length) return `<div style="color:#444; font-size:0.8rem; text-align:center;">${escapeHtml(t("text.noEnd"))}</div>`;

  const top = streakEnds
    .slice()
    .sort((a, b) => getOddsSortValue(buildProbabilityInfo(b, monsters.length)) - getOddsSortValue(buildProbabilityInfo(a, monsters.length)))
    .slice(0, 3);

  const medals = ["🥇", "🥈", "🥉"];
  const medalNames = state.language === "en" ? ["Gold", "Silver", "Bronze"] : ["Altın", "Gümüş", "Bronz"];

  return top.map((e, i) => {
    const normalized = normalizeEntry(e);
    const probInfo = buildProbabilityInfo(normalized, monsters.length);
    const title = journalTitle(normalized);
    const meta = `${normalized.eventType} • ${t("label.len")} ${normalized.length}`;
    const medal = medals[i] || "🏅";
    const rankCls = `rank-${i + 1}`;
    return `
      <div class="leaderboard-item ${rankCls}">
        <div class="leader-medal" title="${medalNames[i] || "Madalya"}">${medal}</div>
        <div class="leader-main">
          <div class="leader-title">${escapeHtml(title)}</div>
          <div class="leader-meta">${escapeHtml(meta)}</div>
        </div>
        <div class="leader-prob">
          <div><b>${escapeHtml(probInfo.oddsText || "-")}</b></div>
          <div style="color:#9a9a9a; font-size:0.7rem;">%${escapeHtml(String(probInfo.pct || "-"))}</div>
        </div>
      </div>`;
  }).join("");
}

function journalTitle(e) {
  const normalized = normalizeEntry(e);
  const base =
    normalized.type === "ROUND" ? "ROUND" :
    (normalized.type === "START" ? "START" :
     normalized.type === "EXTEND" ? "EXTEND" :
     normalized.type === "END" ? "END" : "LOG");

  const subj = (Array.isArray(normalized.subjectNames) && normalized.subjectNames.length)
    ? normalized.subjectNames.join(" + ")
    : (normalized.keys.length ? normalized.keys.join(" + ") : "—");
  return `${base} • ${normalized.eventType || "?"} • ${subj}`;
}

function journalMeta(e, probInfo = null) {
  const normalized = normalizeEntry(e);
  if (normalized.type === "ROUND") return t("journal.round");
  const keys = normalized.keys.length ? normalized.keys.join(",") : "-";
  const diff = probInfo?.difficulty != null ? ` • Diff: ${probInfo.difficulty.toFixed(2)}` : "";
  return `Model: ${normalized.model || "-"} • Len: ${normalized.length} • Key: ${keys}${diff}`;
}

// ---------- IMPORT / EXPORT ----------
function downloadJournal(format) {
  const entries = Array.isArray(state.journal) ? state.journal : [];
  if (format === "json") {
    downloadBlob(JSON.stringify({ journal: entries }, null, 2), "application/json", "hugel-journal.json");
    return;
  }

  const header = ["ts", "roundId", "phase", "eventType", "model", "length", "keys", "context", "probability", "oddsDenominator", "difficulty"];
  const rows = entries.map(e => {
    const normalized = normalizeEntry(e);
    const probInfo = buildProbabilityInfo(normalized, monsters.length);
    return [
      normalized.ts || "",
      normalized.roundId ?? "",
      normalized.type || "",
      normalized.eventType || "",
      normalized.model || "",
      normalized.length ?? "",
      normalized.keys.length ? normalized.keys.join("+") : "",
      normalized.context ? JSON.stringify(normalized.context) : "",
      probInfo.probability ?? "",
      probInfo.oddsDenominator ? JSON.stringify(probInfo.oddsDenominator) : "",
      probInfo.difficulty ?? ""
    ];
  });
  const csv = [header, ...rows].map(row => row.map(csvCell).join(",")).join("\n");
  downloadBlob(csv, "text/csv;charset=utf-8", "hugel-journal.csv");
}

function copyJournalJson() {
  const entries = Array.isArray(state.journal) ? state.journal : [];
  const payload = JSON.stringify({ journal: entries }, null, 2);
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(payload);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = payload;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function clearJournal() {
  if (!confirm(t("confirm.clearArchive"))) return;
  resetJournal();
}

function triggerImport() {
  const input = document.getElementById("importHistoryFile");
  if (input) input.click();
}

function handleImportFile(event) {
  const file = event?.target?.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(String(reader.result || ""));
      const history = Array.isArray(data) ? data : (Array.isArray(data.history) ? data.history : []);
      if (!Array.isArray(history)) {
        logJournalError(t("error.importInvalid"), { type: typeof data });
        return;
      }
      state.history = history;
      rebuildJournalFromHistory();
      saveState();
      render();
      updateStats();
      renderJournal(true);
    } catch (err) {
      console.warn("Import failed:", err);
      logJournalError("Import failed.", { error: String(err) });
    }
  };
  reader.readAsText(file);
}

// ---------- MAIN LOGIC ----------
function submitRound() {
  sanitizeSelections();

  const status = document.getElementById("status-text");
  const fail = (msg) => {
    if (status) status.innerHTML = `<span style="color:#ff4654; font-weight:800">${escapeHtml(msg)}</span>`;
  };

  // strict validation
  if (state.mode === "single") {
    if (state.bet.length !== 1) return fail(t("validation.singleBet"));
  } else {
    if (state.bet.length !== 2) return fail(t("validation.doubleBet"));
    if (state.bet[0] === state.bet[1]) return fail(t("validation.doubleSame"));
  }

  if (state.result.length !== 2) return fail(t("validation.resultTwo"));
  if (state.result[0] === state.result[1]) return fail(t("validation.resultSame"));

  const roundId = Date.now();
  const win = isWin(state.mode, state.bet, state.result);

  const round = {
    id: roundId,
    mode: state.mode,
    bet: state.bet.slice(),
    result: state.result.slice(),
    win
  };

  // update history
  state.history.unshift(round);

  // update streak snapshot + journal incrementally (no full recompute)
  const prevSnap = snapshotWithCompat(normalizeStreakState(state._streakSnapshot));
  const currSnap = computeCurrentStreakState(state.history, monsters);
  updateJournalFromStreakChange(prevSnap, currSnap, round);
  state._streakSnapshot = snapshotWithCompat(currSnap);
  state.streaks = snapshotWithCompat(currSnap);

  // clear selections for next input
  state.bet = [];
  state.result = [];

  saveState();
  render();
  updateStats();
  renderJournal();

  if (status) status.innerHTML = win
    ? `<b style="color:var(--kick-green)">${escapeHtml(t("status.win"))}</b>`
    : `<b style="color:#ff4654">${escapeHtml(t("status.lose"))}</b>`;
}

function isWin(mode, bet, result) {
  if (!Array.isArray(bet) || !Array.isArray(result) || result.length !== 2) return false;

  if (mode === "single") {
    return bet.length === 1 && result.includes(bet[0]);
  }

  // double: unordered pair match
  if (bet.length !== 2) return false;
  const b = bet.slice().sort((a, b) => a - b).join("-");
  const r = result.slice().sort((a, b) => a - b).join("-");
  return b === r;
}

function undo() {
  if (!state.history.length) return;
  state.history.shift();
  state.journal = [];
  state.journalSelected = 0;
  state.streaks = { singles: {}, pair: { key: null, len: 0 } };
  state._streakSnapshot = { singles: {}, pair: { key: null, len: 0 } };
  saveState();
  render();
  updateStats();
  renderJournal();
}

function resetData() {
  if (!confirm(t("confirm.resetAll"))) return;
  state.bet = [];
  state.result = [];
  state.history = [];
  state.journal = [];
  state.journalSelected = 0;
  state.journalErrors = [];
  state.streaks = { singles: {}, pair: { key: null, len: 0 } };
  state._streakSnapshot = { singles: {}, pair: { key: null, len: 0 } };
  saveState();
  render();
  updateStats();
  renderJournal();
  renderJournalErrors();
}

function addExtraMedals() {
  const inp = document.getElementById("extraMedalsInput");
  const v = parseInt(inp?.value || "0", 10) || 0;
  state.extraMedals = (state.extraMedals || 0) + v;
  if (inp) inp.value = "0";
  saveState();
  updateStats();
}

function resetExtraMedals() {
  state.extraMedals = 0;
  saveState();
  updateStats();
}

// ---------- STATS / PANELS ----------
function updateStats() {
  const charCount = clampInt(readNumber("charCount", 12), 0, 999999);
  const ticketCost = clampInt(readNumber("ticketCost", 2000), 0, 999999999);
  const medalReward = clampInt(readNumber("medalReward", 15), 0, 999999);
  const prizeCost = clampInt(readNumber("prizeCost", 50), 1, 999999);

  const rounds = state.history.length;
  const wins = state.history.filter(r => !!r.win).length;

  const spentZeny = rounds * charCount * ticketCost;
  const earnedMedals = wins * medalReward;
  const totalMedals = earnedMedals + (state.extraMedals || 0);

  setText("ui-zeny", `${fmtNum(spentZeny)}z`);
  setText("ui-extra-medals", fmtNum(state.extraMedals || 0));
  setText("ui-medals", fmtNum(totalMedals));
  setText("ui-winrate", rounds ? `%${((wins / rounds) * 100).toFixed(1)}` : "%0.0");

  renderHistory();
  renderHeatmap();
  renderStreakPanel();
  renderProbabilityLeaderboard();
  renderRawAlert(); // basit uyarı
}

function renderHistory() {
  const body = document.getElementById("history-body");
  if (!body) return;

  const last20 = state.history.slice(0, 20);
  body.innerHTML = last20.map((r, idx) => {
    const b = (r.bet || []).map(id => (getMonsterById(id) || {}).name).join("&");
    const res = (r.result || []).map(id => (getMonsterById(id) || {}).name).join(",");
    const winCls = r.win ? "log-win" : "";
    return `<tr>
      <td style="width:40px; color:#555;">${idx + 1}</td>
      <td>${escapeHtml(b || "-")} → <span class="${winCls}">${escapeHtml(res || "-")}</span></td>
      <td style="text-align:right; width:70px; color:${r.win ? "var(--kick-green)" : "var(--danger)"}; font-weight:800;">
        ${r.win ? "WIN" : "LOSE"}
      </td>
    </tr>`;
  }).join("");
}

function renderHeatmap() {
  const el = document.getElementById("heatmap-list");
  if (!el) return;

  const counts = {};
  monsters.forEach(m => counts[m.id] = 0);

  state.history.forEach(r => {
    (r.result || []).forEach(id => { if (counts[id] != null) counts[id]++; });
  });

  const totalSlots = Math.max(1, state.history.length * 2);

  el.innerHTML = monsters.map(m => {
    const c = counts[m.id] || 0;
    const pct = (c / totalSlots) * 100;
    return `
      <div style="display:flex; align-items:center; gap:8px; margin:6px 0;">
        <img src="${m.url}" style="width:22px; height:22px; border-radius:6px; border:1px solid #222; background:#0b0b0b;">
        <div style="flex:1;">
          <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:#bbb;">
            <span>${escapeHtml(m.name)}</span>
            <b style="color:#fff;">${c}</b>
          </div>
          <div style="height:6px; background:#111; border:1px solid #222; border-radius:999px; overflow:hidden;">
            <div style="height:100%; width:${pct.toFixed(1)}%; background:var(--kick-green); opacity:0.55;"></div>
          </div>
        </div>
      </div>`;
  }).join("");
}

function getActiveStreakRows() {
  const { tSingle, tPair } = resolveJournalThresholds();
  const curr = state.streaks || computeCurrentStreakState(state.history, monsters);
  const rows = [];

  monsters.forEach(m => {
    const len = curr.singles[m.id] || 0;
    if (len >= tSingle) {
      const p = buildProbabilityInfo({
        type: "EXTEND",
        eventType: "SINGLE",
        model: "CHAIN",
        length: len,
        keys: [String(m.id)]
      }, monsters.length);
      rows.push({
        title: `${m.name} (SINGLE)`,
        len,
        prob: p,
        icon: m.url
      });
    }
  });

  if (curr.pair?.key && (curr.pair.len || 0) >= tPair) {
    const len = curr.pair.len || 0;
    const p = buildProbabilityInfo({
      type: "EXTEND",
      eventType: "PAIR",
      model: "CHAIN",
      length: len,
      keys: curr.pair.key.split("-").filter(Boolean)
    }, monsters.length);
    rows.push({
      title: `${namesFromKey(curr.pair.key).join(" + ")} (PAIR)`,
      len,
      prob: p,
      icon: null
    });
  }

  return rows;
}

function renderStreakPanel() {
  const targets = [
    document.getElementById("streak-list-journal")
  ].filter(Boolean);
  if (!targets.length) return;

  const rows = getActiveStreakRows();

  if (!rows.length) {
    targets.forEach(el => {
      el.innerHTML = `<div style="text-align:center; color:#444; font-size:0.8rem;">${escapeHtml(t("text.noActiveStreak"))}</div>`;
    });
    return;
  }

  // en "uçuk" olanlar üstte
  rows.sort((a, b) => getOddsSortValue(b.prob) - getOddsSortValue(a.prob));

  const html = rows.map(r => `
    <div style="background:#0f0f0f; border:1px solid #1f1f1f; border-radius:8px; padding:8px; margin-top:8px;">
      <div style="display:flex; justify-content:space-between; align-items:center; gap:10px;">
        <div style="display:flex; align-items:center; gap:8px;">
          ${r.icon ? `<img src="${r.icon}" style="width:22px; height:22px; border-radius:6px; border:1px solid #222; background:#0b0b0b;">` : `<span style="width:22px; height:22px; border-radius:6px; display:inline-block; background:#0b0b0b; border:1px solid #222;"></span>`}
          <div>
            <div style="font-weight:800; color:#fff; font-size:0.8rem;">${escapeHtml(r.title)}</div>
            <div style="color:#9a9a9a; font-size:0.7rem;">${escapeHtml(t("label.len"))}: <b style="color:#fff;">${r.len}</b></div>
          </div>
        </div>
        <div style="text-align:right;">
          <div style="font-weight:800; color:#fff;">%${escapeHtml(r.prob.pct || "-")}</div>
          <div style="color:#9a9a9a; font-size:0.7rem;">${escapeHtml(r.prob.oddsText || "-")}</div>
        </div>
      </div>
    </div>
  `).join("");
  targets.forEach(el => {
    el.innerHTML = html;
  });
}

function renderProbabilityLeaderboard() {
  const el = document.getElementById("probability-leaderboard");
  if (!el) return;

  const rows = getActiveStreakRows();
  if (!rows.length) {
    el.innerHTML = `<div style="color:#444; font-size:0.8rem; text-align:center;">${escapeHtml(t("text.noProb"))}</div>`;
    return;
  }

  const top = rows
    .slice()
    .sort((a, b) => getOddsSortValue(b.prob) - getOddsSortValue(a.prob))
    .slice(0, 3);

  const medals = ["🥇", "🥈", "🥉"];
  const medalNames = state.language === "en" ? ["Gold", "Silver", "Bronze"] : ["Altın", "Gümüş", "Bronz"];
  el.innerHTML = top.map((r, i) => `
      <div class="leaderboard-item rank-${i + 1}">
        <div class="leader-medal" title="${medalNames[i] || "Madalya"}">${medals[i] || "🏅"}</div>
        <div class="leader-main">
          <div class="leader-title">${escapeHtml(r.title)}</div>
          <div class="leader-meta">${escapeHtml(t("label.len"))} ${r.len}</div>
        </div>
        <div class="leader-prob">
          <div><b>%${escapeHtml(String(r.prob.pct || "-"))}</b></div>
          <div style="color:#9a9a9a; font-size:0.7rem;">${escapeHtml(r.prob.oddsText || "-")}</div>
        </div>
      </div>
  `).join("");
}

function renderRawAlert() {
  const el = document.getElementById("raw-alert");
  if (!el) return;

  // “RAW” diye basit bir uyarı: son 30 tur içinde aynı ORDERED (1-2) tekrar hiç yoksa uyar.
  const N = 30;
  const recent = state.history.slice(0, N + 1);
  let hasOrderedRepeat = false;
  for (let i = 0; i < recent.length - 1; i++) {
    const a = (recent[i].result || []).join("-");
    const b = (recent[i + 1].result || []).join("-");
    if (a && a === b) { hasOrderedRepeat = true; break; }
  }

  el.style.display = (state.history.length >= N && !hasOrderedRepeat) ? "block" : "none";
}

// ---------- PERSIST ----------
function saveState() {
  try {
    const payload = {
      mode: state.mode,
      bet: state.bet,
      result: state.result,
      history: state.history,
      journal: state.journal,
      journalSelected: state.journalSelected,
      journalErrors: state.journalErrors,
      extraMedals: state.extraMedals,
      journalSettings: state.journalSettings,
      streaks: state.streaks,
      _streakSnapshot: state._streakSnapshot
    };
    localStorage.setItem("prob_hugel_state_v2", JSON.stringify(payload));
  } catch (err) {
    console.warn("State not saved:", err);
  }
}

function loadState() {
  try {
    let raw = null;
    for (const k of LS_KEYS) {
      raw = localStorage.getItem(k);
      if (raw) break;
    }
    if (!raw) return;

    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      state.mode = parsed.mode === "double" ? "double" : "single";
      state.bet = Array.isArray(parsed.bet) ? parsed.bet : [];
      state.result = Array.isArray(parsed.result) ? parsed.result : [];
      state.history = Array.isArray(parsed.history) ? parsed.history : [];
      state.journal = Array.isArray(parsed.journal) ? parsed.journal : [];
      state.journalSelected = parsed.journalSelected || 0;
      state.journalErrors = Array.isArray(parsed.journalErrors) ? parsed.journalErrors : [];
      state.extraMedals = typeof parsed.extraMedals === "number" ? parsed.extraMedals : 0;
      state.journalSettings = parsed.journalSettings || { thresholdSingle: 2, thresholdPair: 2 };
      const snap = snapshotWithCompat(parsed._streakSnapshot || parsed.streaks || { singles: {}, pair: { key: null, len: 0 } });
      state._streakSnapshot = snap;
      state.streaks = snap;
    }
  } catch (err) {
    console.warn("State load failed:", err);
  }

  // button active state (mode)
  try {
    document.getElementById("btn-single").className = state.mode === "single" ? "mode-btn active" : "mode-btn";
    document.getElementById("btn-double").className = state.mode === "double" ? "mode-btn active" : "mode-btn";
  } catch {}
}

// ---------- HELPERS ----------
function escapeHtml(s) {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function fmtNum(n) {
  try { return Number(n || 0).toLocaleString("tr-TR"); }
  catch { return String(n || 0); }
}

function csvCell(v) {
  const s = String(v ?? "");
  if (s.includes(",") || s.includes("\n") || s.includes('"')) return `"${s.replaceAll('"', '""')}"`;
  return s;
}

function downloadBlob(content, mime, filename) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function formatTs(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso || "");
  return d.toLocaleString("tr-TR");
}

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

function clampInt(v, min, max) {
  v = parseInt(v, 10) || 0;
  return clamp(v, min, max);
}

function readNumber(id, fallback) {
  const el = document.getElementById(id);
  if (!el) return fallback;
  const v = parseInt(el.value, 10);
  return Number.isFinite(v) ? v : fallback;
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = String(text);
}
