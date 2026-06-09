const STORAGE_KEY = "album-panini-2026-control-v2";
const CATALOG_URL = "data/catalog-world-cup-2026.json?v=1";
const BRAND_LOGO_FULL = "assets/brand-logo-full.png?v=1";
const BRAND_LOGO_MARK = "assets/brand-logo-mark.png?v=1";
const LANDING_BG = "assets/landing-bg.png?v=1";

let deferredInstallPrompt = null;

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  showToast("App instalada en tu dispositivo.");
});

const navItems = [
  { id: "home", label: "Inicio", icon: "home" },
  { id: "album", label: "Mi Album", icon: "book-open" },
  { id: "register", label: "Registrar", icon: "plus-circle" },
  { id: "missing", label: "Faltantes", icon: "list-checks" },
  { id: "duplicates", label: "Repetidas", icon: "repeat-2" },
  { id: "trades", label: "Intercambios", icon: "shuffle" },
  { id: "share", label: "Compartir", icon: "share-2" },
  { id: "stats", label: "Estadisticas", icon: "bar-chart-3" },
  { id: "expenses", label: "Gastos", icon: "wallet" },
  { id: "settings", label: "Ajustes", icon: "settings" }
];

const lucideIcons = {
  home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2z"/>',
  "book-open": '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 0 1 1h6a2 2 0 0 1 2 2V7a2 2 0 0 0-2-2H4a1 1 0 0 0-1 1z"/><path d="M21 18a1 1 0 0 1-1 1h-6a2 2 0 0 0-2 2V7a2 2 0 0 1 2-2h6a1 1 0 0 1 1 1z"/>',
  "plus-circle": '<circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/>',
  "list-checks": '<path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/>',
  "repeat-2": '<path d="m2 9 3-3 3 3"/><path d="M5 6v11a2 2 0 0 0 2 2h9"/><path d="m22 15-3 3-3-3"/><path d="M19 18V7a2 2 0 0 0-2-2H8"/>',
  shuffle: '<path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7L14 7.7A4 4 0 0 1 17.1 6H22"/><path d="m18 2 4 4-4 4"/><path d="M2 6h1.4c1.3 0 2.5.6 3.3 1.7l1.2 1.5"/><path d="M14.1 14.8l.9 1.1A4 4 0 0 0 18.1 18H22"/><path d="m18 14 4 4-4 4"/>',
  "share-2": '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4"/><path d="m15.4 6.5-6.8 4"/>',
  "bar-chart-3": '<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
  wallet: '<path d="M19 7V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2H7a2 2 0 0 1 0-4h10"/><path d="M16 14h.01"/>',
  camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>',
  "check-square": '<path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  settings: '<path d="M9.7 2.5h4.6l.7 2.3c.5.2.9.4 1.3.7l2.3-.7 2.3 4-1.7 1.7c.1.5.1 1 0 1.5l1.7 1.7-2.3 4-2.3-.7c-.4.3-.8.5-1.3.7l-.7 2.3H9.7L9 17.7c-.5-.2-.9-.4-1.3-.7l-2.3.7-2.3-4L4.8 12c-.1-.5-.1-1 0-1.5L3.1 8.8l2.3-4 2.3.7c.4-.3.8-.5 1.3-.7z"/><circle cx="12" cy="11.2" r="3"/>',
  "chevron-down": '<path d="m6 9 6 6 6-6"/>',
  "log-in": '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="m10 17 5-5-5-5"/><path d="M15 12H3"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>',
  bell: '<path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/><path d="M18 8A6 6 0 0 0 6 8c0 7-3 7-3 9h18c0-2-3-2-3-9"/>',
  user: '<path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="7" r="4"/>',
  cloud: '<path d="M17.5 19H9a7 7 0 1 1 6.7-9h1.8a4.5 4.5 0 1 1 0 9Z"/>'
};

const expenseTypes = [
  { id: "album", label: "Album" },
  { id: "sobre", label: "Sobres" },
  { id: "caja", label: "Caja" },
  { id: "individual", label: "Laminas individuales" },
  { id: "intercambio", label: "Intercambio pago" },
  { id: "otro", label: "Otro" }
];

const tradeStatuses = [
  { id: "propuesto", label: "Propuesto", tone: "neutral" },
  { id: "pendiente", label: "Pendiente", tone: "warn" },
  { id: "confirmado", label: "Confirmado", tone: "info" },
  { id: "entregado", label: "Entregado", tone: "good" },
  { id: "cancelado", label: "Cancelado", tone: "warn" }
];

const translations = {
  es: {
    home: "Inicio",
    album: "Mi Album",
    register: "Registrar",
    missing: "Faltantes",
    duplicates: "Repetidas",
    trades: "Intercambios",
    share: "Compartir",
    stats: "Estadisticas",
    expenses: "Gastos",
    settings: "Ajustes",
    registerTitle: "Registrar laminas",
    registerCopy: "Ingresa codigos manualmente, registra por equipo o usa una foto/camara como apoyo.",
    reviewBatch: "Revisar lote",
    saveBatch: "Guardar lote",
    undoLast: "Deshacer ultimo",
    registerByTeam: "Registrar por equipo",
    registerCamera: "Registrar con camara",
    uploadPhoto: "Subir foto",
    cancel: "Cancelar",
    confirm: "Confirmar",
    selectAll: "Seleccionar todas",
    clearAll: "Deseleccionar todas",
    detailedView: "Vista detallada",
    simpleView: "Vista simple",
    language: "Idioma",
    spanish: "Espanol",
    english: "Ingles",
    displayMode: "Visualizacion de fichas",
    saveSettings: "Guardar preferencias",
    allSections: "Todas las secciones",
    allStatuses: "Todos los estados",
    whatsapp: "WhatsApp",
    copyList: "Copiar lista"
  },
  en: {
    home: "Home",
    album: "My Album",
    register: "Register",
    missing: "Missing",
    duplicates: "Duplicates",
    trades: "Trades",
    share: "Share",
    stats: "Stats",
    expenses: "Expenses",
    settings: "Settings",
    registerTitle: "Register stickers",
    registerCopy: "Enter codes manually, register by team, or use a photo/camera as support.",
    reviewBatch: "Review batch",
    saveBatch: "Save batch",
    undoLast: "Undo last",
    registerByTeam: "Register by team",
    registerCamera: "Use camera",
    uploadPhoto: "Upload photo",
    cancel: "Cancel",
    confirm: "Confirm",
    selectAll: "Select all",
    clearAll: "Clear all",
    detailedView: "Detailed view",
    simpleView: "Simple view",
    language: "Language",
    spanish: "Spanish",
    english: "English",
    displayMode: "Sticker display",
    saveSettings: "Save preferences",
    allSections: "All sections",
    allStatuses: "All statuses",
    whatsapp: "WhatsApp",
    copyList: "Copy list"
  }
};

const teamVisuals = {
  PANINI: { flag: "P", colors: ["#FFD800", "#111111", "#FFFFFF"] },
  FWC: { flag: "26", colors: ["#E30613", "#174EA6", "#FFD800"] },
  ALG: { flag: "🇩🇿", colors: ["#006233", "#FFFFFF", "#D21034"] },
  ARG: { flag: "🇦🇷", colors: ["#75AADB", "#FFFFFF", "#F6B40E"] },
  AUS: { flag: "🇦🇺", colors: ["#012169", "#FFFFFF", "#E4002B"] },
  AUT: { flag: "🇦🇹", colors: ["#ED2939", "#FFFFFF", "#ED2939"] },
  BEL: { flag: "🇧🇪", colors: ["#000000", "#FFD90C", "#EF3340"] },
  BIH: { flag: "🇧🇦", colors: ["#002395", "#FECB00", "#FFFFFF"] },
  BRA: { flag: "🇧🇷", colors: ["#009B3A", "#FFDF00", "#002776"] },
  CAN: { flag: "🇨🇦", colors: ["#FF0000", "#FFFFFF", "#FF0000"] },
  CIV: { flag: "🇨🇮", colors: ["#F77F00", "#FFFFFF", "#009E60"] },
  COD: { flag: "🇨🇩", colors: ["#007FFF", "#F7D618", "#CE1021"] },
  COL: { flag: "🇨🇴", colors: ["#FCD116", "#003893", "#CE1126"] },
  CPV: { flag: "🇨🇻", colors: ["#003893", "#FFFFFF", "#CF2027"] },
  CRO: { flag: "🇭🇷", colors: ["#FF0000", "#FFFFFF", "#171796"] },
  CUW: { flag: "🇨🇼", colors: ["#002B7F", "#F9E814", "#FFFFFF"] },
  CZE: { flag: "🇨🇿", colors: ["#11457E", "#FFFFFF", "#D7141A"] },
  ECU: { flag: "🇪🇨", colors: ["#FFD100", "#003893", "#CE1126"] },
  EGY: { flag: "🇪🇬", colors: ["#CE1126", "#FFFFFF", "#000000"] },
  ENG: { flag: "🏴", colors: ["#FFFFFF", "#CE1126", "#B0B7BC"] },
  ESP: { flag: "🇪🇸", colors: ["#AA151B", "#F1BF00", "#AA151B"] },
  FRA: { flag: "🇫🇷", colors: ["#0055A4", "#FFFFFF", "#EF4135"] },
  GER: { flag: "🇩🇪", colors: ["#000000", "#DD0000", "#FFCE00"] },
  GHA: { flag: "🇬🇭", colors: ["#CE1126", "#FCD116", "#006B3F"] },
  HAI: { flag: "🇭🇹", colors: ["#00209F", "#D21034", "#FFFFFF"] },
  IRN: { flag: "🇮🇷", colors: ["#239F40", "#FFFFFF", "#DA0000"] },
  IRQ: { flag: "🇮🇶", colors: ["#CE1126", "#FFFFFF", "#000000"] },
  JOR: { flag: "🇯🇴", colors: ["#000000", "#FFFFFF", "#007A3D"] },
  JPN: { flag: "🇯🇵", colors: ["#FFFFFF", "#BC002D", "#F4F4F4"] },
  KOR: { flag: "🇰🇷", colors: ["#FFFFFF", "#CD2E3A", "#0047A0"] },
  KSA: { flag: "🇸🇦", colors: ["#006C35", "#FFFFFF", "#006C35"] },
  MAR: { flag: "🇲🇦", colors: ["#C1272D", "#006233", "#FFFFFF"] },
  MEX: { flag: "🇲🇽", colors: ["#006847", "#FFFFFF", "#CE1126"] },
  NED: { flag: "🇳🇱", colors: ["#AE1C28", "#FFFFFF", "#21468B"] },
  NOR: { flag: "🇳🇴", colors: ["#BA0C2F", "#FFFFFF", "#00205B"] },
  NZL: { flag: "🇳🇿", colors: ["#00247D", "#FFFFFF", "#CC142B"] },
  PAN: { flag: "🇵🇦", colors: ["#FFFFFF", "#005293", "#D21034"] },
  PAR: { flag: "🇵🇾", colors: ["#D52B1E", "#FFFFFF", "#0038A8"] },
  POR: { flag: "🇵🇹", colors: ["#006600", "#FF0000", "#FFD100"] },
  QAT: { flag: "🇶🇦", colors: ["#8A1538", "#FFFFFF", "#8A1538"] },
  RSA: { flag: "🇿🇦", colors: ["#007A4D", "#FFB612", "#DE3831"] },
  SCO: { flag: "🏴", colors: ["#005EB8", "#FFFFFF", "#005EB8"] },
  SEN: { flag: "🇸🇳", colors: ["#00853F", "#FDEF42", "#E31B23"] },
  SUI: { flag: "🇨🇭", colors: ["#D52B1E", "#FFFFFF", "#D52B1E"] },
  SWE: { flag: "🇸🇪", colors: ["#006AA7", "#FECC00", "#006AA7"] },
  TUN: { flag: "🇹🇳", colors: ["#E70013", "#FFFFFF", "#E70013"] },
  TUR: { flag: "🇹🇷", colors: ["#E30A17", "#FFFFFF", "#E30A17"] },
  URU: { flag: "🇺🇾", colors: ["#0038A8", "#FFFFFF", "#FCD116"] },
  USA: { flag: "🇺🇸", colors: ["#B31942", "#FFFFFF", "#0A3161"] },
  UZB: { flag: "🇺🇿", colors: ["#1EB6E7", "#FFFFFF", "#009739"] }
};

const sectionSeeds = [
  { id: "sec-escudos", name: "Escudos", color: "#FFD800", count: 24 },
  { id: "sec-selecciones", name: "Selecciones", color: "#174EA6", count: 36 },
  { id: "sec-jugadores", name: "Jugadores", color: "#B73578", count: 72 },
  { id: "sec-especiales", name: "Especiales", color: "#E30613", count: 24 },
  { id: "sec-estadios", name: "Estadios", color: "#F26A21", count: 12 },
  { id: "sec-leyendas", name: "Leyendas", color: "#9ACD32", count: 12 }
];

const statusOptions = [
  { id: "all", label: "Todos los estados", tone: "neutral", helper: "Muestra todo" },
  { id: "missing", label: "Faltantes", tone: "warn", helper: "Cantidad en 0" },
  { id: "owned", label: "Obtenidas", tone: "good", helper: "Cantidad en 1" },
  { id: "duplicate", label: "Repetidas", tone: "info", helper: "Cantidad mayor a 1" },
  { id: "priority", label: "Prioridad", tone: "warn", helper: "Marcadas por ti" },
  { id: "pasted", label: "Pegadas", tone: "good", helper: "Ya pegadas" }
];

const state = {
  view: "home",
  entered: false,
  query: "",
  sectionFilter: "all",
  statusFilter: "all",
  openFilter: null,
  albumView: "grid",
  registerText: "",
  registerPreview: null,
  expenseForm: {
    type: "sobre",
    quantity: "1",
    amount: "",
    place: "",
    note: ""
  },
  tradeForm: {
    contact: "",
    giveText: "",
    receiveText: "",
    status: "propuesto",
    note: ""
  },
  compareText: "",
  activeModal: null,
  teamRegisterSectionId: null,
  teamRegisterSelectedIds: new Set(),
  importPreview: {
    mode: null,
    imageUrl: "",
    text: "",
    items: [],
    invalid: []
  },
  lastBatch: null,
  data: createDemoData()
};

function createDemoData() {
  let number = 1;
  const stickers = [];
  const sections = sectionSeeds.map((section) => ({ ...section }));

  sections.forEach((section) => {
    for (let i = 0; i < section.count; i += 1) {
      stickers.push({
        id: `sticker-${number}`,
        albumId: "album-panini-2026",
        sectionId: section.id,
        number,
        code: String(number).padStart(3, "0"),
        name: `${section.name} ${String(i + 1).padStart(2, "0")}`,
        country: section.name === "Jugadores" ? sampleCountries(i) : "",
        rarity: section.name === "Especiales" ? "Especial" : "Base"
      });
      number += 1;
    }
  });

  return {
    album: {
      id: "album-panini-2026",
      name: "Album Panini 2026",
      subtitle: "Coleccion mundialista",
      totalStickers: stickers.length,
      currency: "COP"
    },
    sections,
    stickers,
    inventory: {},
    expenses: [],
    contacts: [],
    trades: [],
    profile: {
      collectorName: "",
      alias: "",
      city: "",
      deviceName: "",
      syncId: createSyncId(),
      cloudStatus: "local"
    },
    goals: {
      targetProgress: 50,
      weeklyNew: 25,
      favoriteSectionId: "",
      maxBudget: ""
    },
    cloudAccount: {
      email: "",
      provider: "pendiente",
      lastSyncAt: "",
      status: "local"
    },
    preferences: {
      cardView: "detailed",
      language: "es"
    },
    activity: []
  };
}

function sampleCountries(index) {
  const countries = ["Argentina", "Brasil", "Colombia", "Espana", "Francia", "Mexico", "Uruguay", "Japon"];
  return countries[index % countries.length];
}

function createSyncId() {
  const source = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `SYNC-${source.slice(-10).toUpperCase()}`;
}

function normalizeProfile(profile = {}) {
  return {
    collectorName: profile.collectorName || "",
    alias: profile.alias || "",
    city: profile.city || "",
    deviceName: profile.deviceName || "",
    syncId: profile.syncId || createSyncId(),
    cloudStatus: profile.cloudStatus || "local",
    updatedAt: profile.updatedAt || ""
  };
}

function normalizeGoals(goals = {}) {
  return {
    targetProgress: Number(goals.targetProgress || 50),
    weeklyNew: Number(goals.weeklyNew || 25),
    favoriteSectionId: goals.favoriteSectionId || "",
    maxBudget: goals.maxBudget === 0 ? "0" : goals.maxBudget || ""
  };
}

function getDefaultApiBaseUrl() {
  const origin = window.location?.origin || "";
  if (origin.includes("workers.dev") || origin.includes("pages.dev")) return origin;
  return "http://127.0.0.1:8787";
}

function getDefaultCloudProvider() {
  const origin = window.location?.origin || "";
  return origin.includes("workers.dev") || origin.includes("pages.dev") ? "cloudflare" : "api-propia";
}

function normalizeCloudAccount(account = {}) {
  return {
    email: account.email || "",
    provider: account.provider || getDefaultCloudProvider(),
    apiBaseUrl: account.apiBaseUrl || getDefaultApiBaseUrl(),
    token: account.token || "",
    userId: account.userId || "",
    userName: account.userName || "",
    lastSyncAt: account.lastSyncAt || "",
    status: account.status || "local"
  };
}

function loadStoredData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    if (!parsed.album || !parsed.stickers || !parsed.sections) return null;
    return normalizeData(parsed);
  } catch (error) {
    return null;
  }
}

function normalizeData(data) {
  const seedById = Object.fromEntries(sectionSeeds.map((section) => [section.id, section]));
  return {
    ...data,
    album: {
      ...data.album,
      subtitle: "Coleccion mundialista"
    },
    sections: data.sections.map((section) => ({
      ...section,
      color: seedById[section.id]?.color || section.color
    })),
    expenses: data.expenses || [],
    trades: data.trades || [],
    contacts: [...new Set((data.trades || []).map((trade) => trade.contact).filter(Boolean))].sort((a, b) => a.localeCompare(b)),
    profile: normalizeProfile(data.profile),
    goals: normalizeGoals(data.goals),
    cloudAccount: normalizeCloudAccount(data.cloudAccount),
    preferences: {
      cardView: data.preferences?.cardView || "detailed",
      language: data.preferences?.language || "es"
    },
    activity: data.activity || []
  };
}

async function loadInitialData() {
  const stored = loadStoredData();
  try {
    const response = await fetch(CATALOG_URL);
    if (!response.ok) throw new Error(`Catalog request failed: ${response.status}`);
    const catalog = await response.json();
    const data = buildAppDataFromCatalog(catalog, stored);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return data;
  } catch (error) {
    return stored || createDemoData();
  }
}

function buildAppDataFromCatalog(catalog, stored) {
  const validIds = new Set(catalog.stickers.map((sticker) => sticker.id));
  const inventory = {};
  Object.entries(stored?.inventory || {}).forEach(([stickerId, value]) => {
    if (validIds.has(stickerId)) inventory[stickerId] = value;
  });

  return {
    album: {
      ...catalog.album,
      currency: stored?.album?.currency || "COP"
    },
    sections: catalog.sections,
    stickers: catalog.stickers,
    inventory,
    expenses: stored?.expenses || [],
    trades: stored?.trades || [],
    contacts: [...new Set((stored?.trades || []).map((trade) => trade.contact).filter(Boolean))].sort((a, b) => a.localeCompare(b)),
    profile: normalizeProfile(stored?.profile),
    goals: normalizeGoals(stored?.goals),
    cloudAccount: normalizeCloudAccount(stored?.cloudAccount),
    preferences: {
      cardView: stored?.preferences?.cardView || "detailed",
      language: stored?.preferences?.language || "es"
    },
    activity: stored?.activity || [],
    source: catalog.source
  };
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
}

function getPreferences() {
  state.data.preferences = {
    cardView: state.data.preferences?.cardView || "detailed",
    language: state.data.preferences?.language || "es"
  };
  return state.data.preferences;
}

function t(key) {
  const language = getPreferences().language;
  return translations[language]?.[key] || translations.es[key] || key;
}

function setPreference(key, value) {
  state.data.preferences = {
    ...getPreferences(),
    [key]: value
  };
  saveData();
}

function isSimpleCardView() {
  return getPreferences().cardView === "simple";
}

function getInventory(stickerId) {
  return state.data.inventory[stickerId] || {
    quantity: 0,
    pasted: false,
    priority: false,
    reservedQuantity: 0
  };
}

function setInventory(stickerId, patch) {
  const current = getInventory(stickerId);
  state.data.inventory[stickerId] = { ...current, ...patch };
  saveData();
}

function addActivity(message) {
  state.data.activity.unshift({
    id: Date.now(),
    message,
    at: new Date().toISOString()
  });
  state.data.activity = state.data.activity.slice(0, 100);
  saveData();
}

function getSectionStickers(sectionId) {
  return state.data.stickers.filter((sticker) => sticker.sectionId === sectionId).sort(byNumber);
}

function registerUniqueStickers(stickers, activityMessage) {
  let added = 0;
  let alreadyOwned = 0;
  stickers.forEach((sticker) => {
    const inv = getInventory(sticker.id);
    if (inv.quantity > 0) {
      alreadyOwned += 1;
      return;
    }
    setInventory(sticker.id, { quantity: 1 });
    added += 1;
  });
  addActivity(activityMessage || `Registraste ${added} laminas nuevas`);
  showToast(`Listo: ${added} nuevas, ${alreadyOwned} ya estaban registradas.`);
  return { added, alreadyOwned };
}

function openTeamRegister() {
  const firstSection =
    state.data.sections.find((section) => !["PANINI", "FWC"].includes(section.code) && section.count > 1) ||
    state.data.sections.find((section) => section.count > 1) ||
    state.data.sections[0];
  const current = getSection(state.teamRegisterSectionId);
  state.teamRegisterSectionId = !current || current.count <= 1 ? firstSection?.id : current.id;
  state.teamRegisterSelectedIds = new Set(getSectionStickers(state.teamRegisterSectionId).map((sticker) => sticker.id));
  state.activeModal = "team-register";
  render();
}

function changeTeamRegisterSection(sectionId) {
  state.teamRegisterSectionId = sectionId;
  state.teamRegisterSelectedIds = new Set(getSectionStickers(sectionId).map((sticker) => sticker.id));
  render();
}

function toggleTeamSticker(stickerId) {
  if (state.teamRegisterSelectedIds.has(stickerId)) state.teamRegisterSelectedIds.delete(stickerId);
  else state.teamRegisterSelectedIds.add(stickerId);
  render();
}

function setAllTeamStickers(selected) {
  const ids = getSectionStickers(state.teamRegisterSectionId).map((sticker) => sticker.id);
  state.teamRegisterSelectedIds = new Set(selected ? ids : []);
  render();
}

function confirmTeamRegister() {
  const selected = getSectionStickers(state.teamRegisterSectionId).filter((sticker) => state.teamRegisterSelectedIds.has(sticker.id));
  const section = getSection(state.teamRegisterSectionId);
  registerUniqueStickers(selected, `Registraste seleccion: ${section?.name || "grupo"}`);
  closeModal();
}

function closeModal() {
  state.activeModal = null;
  state.importPreview = { mode: null, imageUrl: "", text: "", items: [], invalid: [] };
  render();
}

function openImportModal(mode) {
  state.importPreview = { mode, imageUrl: "", text: "", items: [], invalid: [] };
  state.activeModal = "import-preview";
  render();
}

function updateImportText(text) {
  const analysis = analyzeStickerText(text);
  state.importPreview.text = text;
  state.importPreview.items = analysis.valid;
  state.importPreview.invalid = analysis.invalid;
  render();
  const nextInput = document.getElementById("importCodesText");
  nextInput?.focus();
  nextInput?.setSelectionRange(state.importPreview.text.length, state.importPreview.text.length);
}

function removeImportSticker(stickerId) {
  state.importPreview.items = state.importPreview.items.filter((sticker) => sticker.id !== stickerId);
  render();
}

function setImportImage(file) {
  if (!file) return;
  if (state.importPreview.imageUrl) URL.revokeObjectURL(state.importPreview.imageUrl);
  state.importPreview.imageUrl = URL.createObjectURL(file);
  showToast("Imagen cargada. Revisa o pega codigos detectados antes de confirmar.");
  render();
  detectCodesFromImageUrl(state.importPreview.imageUrl);
}

async function detectCodesFromImageUrl(imageUrl) {
  if (!("BarcodeDetector" in window)) return;
  try {
    const detector = new BarcodeDetector({
      formats: ["qr_code", "code_128", "code_39", "ean_13", "ean_8", "upc_a", "upc_e", "codabar"]
    });
    const image = new Image();
    image.src = imageUrl;
    await image.decode();
    const codes = await detector.detect(image);
    const text = codes.map((code) => code.rawValue).filter(Boolean).join(", ");
    if (text) updateImportText(text);
  } catch (error) {
    // Some browsers expose BarcodeDetector but fail on local blobs; manual confirmation remains available.
  }
}

async function startCameraPreview() {
  const video = document.getElementById("cameraPreview");
  if (!video || !navigator.mediaDevices?.getUserMedia) {
    showToast("Camara no disponible en este navegador.");
    return;
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
    video.srcObject = stream;
    await video.play();
    showToast("Camara activa. Captura o escribe los codigos visibles.");
  } catch (error) {
    showToast("No pude abrir la camara.");
  }
}

function stopCameraPreview() {
  const video = document.getElementById("cameraPreview");
  const stream = video?.srcObject;
  if (stream?.getTracks) stream.getTracks().forEach((track) => track.stop());
}

function captureCameraFrame() {
  const video = document.getElementById("cameraPreview");
  if (!video || !video.videoWidth) {
    showToast("Primero inicia la camara.");
    return;
  }
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0);
  state.importPreview.imageUrl = canvas.toDataURL("image/png");
  showToast("Captura lista. Confirma los codigos detectados o escritos.");
  render();
  detectCodesFromImageUrl(state.importPreview.imageUrl);
}

function confirmImportPreview() {
  if (!state.importPreview.items.length) {
    showToast("No hay fichas validas para importar.");
    return;
  }
  registerUniqueStickers(state.importPreview.items, "Importaste laminas desde imagen/camara");
  closeModal();
}

function stickerStatus(sticker) {
  const inv = getInventory(sticker.id);
  if (inv.quantity <= 0) return "missing";
  if (inv.quantity > 1) return "duplicate";
  return "owned";
}

function getStats() {
  const total = state.data.stickers.length;
  const owned = state.data.stickers.filter((sticker) => getInventory(sticker.id).quantity > 0).length;
  const duplicates = state.data.stickers.reduce((sum, sticker) => {
    const qty = getInventory(sticker.id).quantity;
    return sum + Math.max(0, qty - 1);
  }, 0);
  const priority = state.data.stickers.filter((sticker) => getInventory(sticker.id).priority).length;
  const missing = Math.max(0, total - owned);
  const progress = total ? Math.round((owned / total) * 100) : 0;
  return { total, owned, missing, duplicates, priority, progress };
}

function getTotalRegisteredStickers() {
  return state.data.stickers.reduce((sum, sticker) => sum + Math.max(0, getInventory(sticker.id).quantity), 0);
}

function getExpenseStats() {
  const expenses = state.data.expenses || [];
  const totalSpent = expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const totalItems = expenses.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  const stats = getStats();
  const registered = getTotalRegisteredStickers();
  const now = new Date();
  const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const monthSpent = expenses
    .filter((item) => String(item.date || "").startsWith(monthKey))
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);
  return {
    totalSpent,
    totalItems,
    monthSpent,
    costPerUnique: stats.owned ? Math.round(totalSpent / stats.owned) : 0,
    costPerRegistered: registered ? Math.round(totalSpent / registered) : 0,
    purchases: expenses.length
  };
}

function getSmartInsights() {
  const stats = getStats();
  const expenseStats = getExpenseStats();
  const goals = normalizeGoals(state.data.goals);
  const sections = state.data.sections.map((section) => ({
    section,
    stats: sectionStats(section)
  }));
  const closestSections = sections
    .filter((item) => item.stats.progress < 100)
    .sort((a, b) => b.stats.progress - a.stats.progress || a.stats.missing - b.stats.missing)
    .slice(0, 4);
  const almostDone = sections.filter((item) => item.stats.progress >= 80 && item.stats.progress < 100).slice(0, 4);
  const priorityMissing = state.data.stickers
    .filter((sticker) => {
      const inv = getInventory(sticker.id);
      return inv.priority && inv.quantity <= 0;
    })
    .slice(0, 12);

  const alerts = [];
  if (stats.progress < goals.targetProgress) {
    alerts.push({
      tone: "warn",
      title: "Meta de avance pendiente",
      copy: `Vas en ${stats.progress}% y tu meta es ${goals.targetProgress}%.`
    });
  }
  if (goals.maxBudget && expenseStats.totalSpent > Number(goals.maxBudget)) {
    alerts.push({
      tone: "warn",
      title: "Presupuesto superado",
      copy: `${formatCurrency(expenseStats.totalSpent)} gastados sobre una meta de ${formatCurrency(goals.maxBudget)}.`
    });
  }
  if (almostDone.length) {
    alerts.push({
      tone: "good",
      title: "Selecciones casi listas",
      copy: almostDone.map((item) => `${item.section.name} ${item.stats.progress}%`).join(", ")
    });
  }
  if (stats.duplicates > 0) {
    alerts.push({
      tone: "info",
      title: "Intercambios disponibles",
      copy: `Tienes ${stats.duplicates} repetidas para mover.`
    });
  }

  let nextAction = "Registra nuevas laminas para subir el progreso.";
  let nextView = "register";
  if (priorityMissing.length) {
    nextAction = `Busca primero ${priorityMissing.slice(0, 4).map((sticker) => sticker.code).join(", ")}.`;
    nextView = "missing";
  } else if (stats.duplicates > 0) {
    nextAction = "Arma una propuesta con tus repetidas.";
    nextView = "trades";
  } else if (closestSections.length) {
    nextAction = `Completa ${closestSections[0].section.name}: faltan ${closestSections[0].stats.missing}.`;
    nextView = "album";
  }

  return {
    goals,
    alerts: alerts.slice(0, 4),
    closestSections,
    almostDone,
    priorityMissing,
    nextAction,
    nextView
  };
}

function formatCurrency(value) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: state.data.album.currency || "COP",
    maximumFractionDigits: 0
  }).format(Number(value || 0));
}

function getExpenseTypeLabel(type) {
  return expenseTypes.find((item) => item.id === type)?.label || "Otro";
}

function getStatusOptionText(option) {
  const labels = {
    es: {
      all: ["Todos los estados", "Muestra todo"],
      missing: ["Faltantes", "Cantidad en 0"],
      owned: ["Obtenidas", "Cantidad en 1"],
      duplicate: ["Repetidas", "Cantidad mayor a 1"],
      priority: ["Prioridad", "Marcadas por ti"],
      pasted: ["Pegadas", "Ya pegadas"]
    },
    en: {
      all: ["All statuses", "Show all"],
      missing: ["Missing", "Quantity is 0"],
      owned: ["Owned", "Quantity is 1"],
      duplicate: ["Duplicates", "Quantity above 1"],
      priority: ["Priority", "Marked by you"],
      pasted: ["Pasted", "Already pasted"]
    }
  };
  const language = getPreferences().language;
  const [label, helper] = labels[language]?.[option.id] || labels.es[option.id] || [option.label, option.helper];
  return { label, helper };
}

function getTradeStatus(status) {
  return tradeStatuses.find((item) => item.id === status) || tradeStatuses[0];
}

function analyzeStickerText(text) {
  const entries = parseStickerEntries(text);
  const valid = [];
  const invalid = [];
  entries.forEach((entry) => {
    const sticker = findStickerByEntry(entry);
    if (sticker) valid.push(sticker);
    else invalid.push(entry);
  });
  return { entries, valid, invalid };
}

function analyzeTrade(giveText = state.tradeForm.giveText, receiveText = state.tradeForm.receiveText) {
  const give = analyzeStickerText(giveText);
  const receive = analyzeStickerText(receiveText);
  const newToReceive = receive.valid.filter((sticker) => getInventory(sticker.id).quantity <= 0);
  const duplicatedReceived = receive.valid.filter((sticker) => getInventory(sticker.id).quantity > 0);
  const duplicateGive = give.valid.filter((sticker) => getInventory(sticker.id).quantity > 1);
  const riskyGive = give.valid.filter((sticker) => getInventory(sticker.id).quantity <= 1);
  return {
    give,
    receive,
    newToReceive,
    duplicatedReceived,
    duplicateGive,
    riskyGive
  };
}

function buildTradeMessage(trade) {
  const give = trade.giveCodes.length ? trade.giveCodes.join(", ") : "por definir";
  const receive = trade.receiveCodes.length ? trade.receiveCodes.join(", ") : "por definir";
  return `Hola ${trade.contact}, te propongo este intercambio:\nYo doy: ${give}\nYo recibo: ${receive}\nEstado: ${getTradeStatus(trade.status).label}`;
}

function buildProgressText() {
  const stats = getStats();
  const expenseStats = getExpenseStats();
  return [
    `${state.data.album.name}`,
    `Avance: ${stats.progress}% (${stats.owned}/${stats.total})`,
    `Faltantes: ${stats.missing}`,
    `Repetidas: ${stats.duplicates}`,
    `Prioridad: ${stats.priority}`,
    `Gasto registrado: ${formatCurrency(expenseStats.totalSpent)}`
  ].join("\n");
}

function buildPublicSummaryText() {
  return [
    buildProgressText(),
    "",
    buildShareText("missing"),
    "",
    buildShareText("duplicates")
  ].join("\n");
}

function compareFriendList(text = state.compareText) {
  const friend = analyzeStickerText(text);
  const friendIds = new Set(friend.valid.map((sticker) => sticker.id));
  const canGive = duplicateStickers().filter((sticker) => friendIds.has(sticker.id));
  const canAsk = missingStickers().filter((sticker) => friendIds.has(sticker.id));
  const unknown = friend.invalid;
  return { friend, canGive, canAsk, unknown };
}

function sectionStats(section) {
  const stickers = state.data.stickers.filter((sticker) => sticker.sectionId === section.id);
  const owned = stickers.filter((sticker) => getInventory(sticker.id).quantity > 0).length;
  const total = stickers.length;
  const missing = Math.max(0, total - owned);
  const progress = total ? Math.round((owned / total) * 100) : 0;
  return { owned, total, missing, progress };
}

function byNumber(a, b) {
  return a.number - b.number;
}

function getSection(sectionId) {
  return state.data.sections.find((section) => section.id === sectionId);
}

function renderIcon(name) {
  return `
    <svg class="lucide-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      ${lucideIcons[name] || lucideIcons.home}
    </svg>
  `;
}

function getTeamVisual(sticker, section) {
  const visual = teamVisuals[sticker?.teamCode] || teamVisuals[section?.code] || teamVisuals.FWC;
  return {
    flag: visual.flag,
    colors: visual.colors,
    code: sticker?.teamCode || section?.code || "FWC"
  };
}

function flagStyle(visual) {
  const [a, b, c] = visual.colors;
  return `--flag-a:${a};--flag-b:${b};--flag-c:${c};`;
}

function flagLayout(code) {
  const layouts = {
    BEL: "vertical",
    CAN: "maple",
    CIV: "vertical",
    FRA: "vertical",
    MEX: "vertical",
    POR: "vertical",
    BIH: "bosnia",
    IRN: "horizontal",
    IRQ: "horizontal",
    ALG: "algeria",
    JPN: "circle",
    KOR: "taeguk",
    BRA: "brazil",
    RSA: "south-africa",
    COD: "diagonal",
    QAT: "qatar",
    ENG: "england",
    SCO: "saltire",
    NOR: "nordic",
    SWE: "nordic",
    CZE: "triangle",
    JOR: "jordan",
    PAN: "panama",
    CUW: "curacao",
    CPV: "cape-verde",
    USA: "usa",
    AUS: "canton",
    NZL: "canton",
    SUI: "swiss",
    TUR: "turkey",
    TUN: "tunisia",
    MAR: "morocco",
    GHA: "ghana",
    SEN: "senegal"
  };
  return layouts[code] || "horizontal";
}

function filteredStickers() {
  const query = state.query.trim().toLowerCase();
  return state.data.stickers
    .filter((sticker) => {
      const inv = getInventory(sticker.id);
      const section = getSection(sticker.sectionId);
      const status = stickerStatus(sticker);
      const text = `${sticker.number} ${sticker.code} ${sticker.teamCode || ""} ${sticker.name} ${sticker.country} ${section?.name || ""}`.toLowerCase();
      const matchesQuery = !query || text.includes(query);
      const matchesSection = state.sectionFilter === "all" || sticker.sectionId === state.sectionFilter;
      const matchesStatus =
        state.statusFilter === "all" ||
        status === state.statusFilter ||
        (state.statusFilter === "priority" && inv.priority) ||
        (state.statusFilter === "pasted" && inv.pasted);
      return matchesQuery && matchesSection && matchesStatus;
    })
    .sort(byNumber);
}

function missingStickers() {
  return state.data.stickers.filter((sticker) => getInventory(sticker.id).quantity <= 0).sort(byNumber);
}

function duplicateStickers() {
  return state.data.stickers.filter((sticker) => getInventory(sticker.id).quantity > 1).sort(byNumber);
}

function filterListStickers(stickers) {
  const query = state.query.trim().toLowerCase();
  return stickers
    .filter((sticker) => {
      const section = getSection(sticker.sectionId);
      const text = `${sticker.number} ${sticker.code} ${sticker.teamCode || ""} ${sticker.name} ${sticker.country} ${section?.name || ""}`.toLowerCase();
      const matchesQuery = !query || text.includes(query);
      const matchesSection = state.sectionFilter === "all" || sticker.sectionId === state.sectionFilter;
      return matchesQuery && matchesSection;
    })
    .sort(byNumber);
}

function groupedBySection(stickers) {
  return state.data.sections
    .map((section) => ({
      section,
      stickers: stickers.filter((sticker) => sticker.sectionId === section.id)
    }))
    .filter((group) => group.stickers.length > 0);
}

function updateQuantity(stickerId, delta) {
  const sticker = state.data.stickers.find((item) => item.id === stickerId);
  const inv = getInventory(stickerId);
  const nextQuantity = Math.max(0, inv.quantity + delta);
  setInventory(stickerId, {
    quantity: nextQuantity,
    pasted: nextQuantity > 0 ? inv.pasted : false
  });
  if (sticker) {
    addActivity(`${delta > 0 ? "Sumaste" : "Ajustaste"} lamina ${sticker.code}`);
  }
  render();
}

function togglePriority(stickerId) {
  const inv = getInventory(stickerId);
  setInventory(stickerId, { priority: !inv.priority });
  render();
}

function togglePasted(stickerId) {
  const inv = getInventory(stickerId);
  if (inv.quantity <= 0) {
    showToast("Primero debes tener la lamina.");
    return;
  }
  setInventory(stickerId, { pasted: !inv.pasted });
  render();
}

function normalizeCode(value) {
  return String(value).trim().toUpperCase().replace(/[\s-]+/g, " ");
}

function compactCode(value) {
  return normalizeCode(value).replace(/\s+/g, "");
}

function parseStickerEntries(text) {
  const normalized = cleanScannerText(text);
  const matches = normalized.match(/\b[A-Z]{2,6}\s*-?\s*\d{1,2}\b|\b00\b|\b\d{1,3}\b/g) || [];
  return matches.map((value) => normalizeCode(value.replace("-", " ")));
}

function cleanScannerText(text) {
  return String(text || "")
    .toUpperCase()
    .replace(/[–—_.,;:/\\|]+/g, " ")
    .replace(/\b([A-Z]{2,6})\s*O(?=\d)/g, "$1 0")
    .replace(/\bFWC\s*O(?=\d)/g, "FWC 0")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanImportPreviewText() {
  const cleaned = parseStickerEntries(state.importPreview.text).join(", ");
  updateImportText(cleaned || cleanScannerText(state.importPreview.text));
  showToast("Lectura limpiada.");
}

function findStickerByEntry(entry) {
  const value = normalizeCode(entry);
  const compact = compactCode(value);
  const exact = state.data.stickers.find((sticker) => compactCode(sticker.code) === compact);
  if (exact) return exact;

  if (/^\d+$/.test(value)) {
    const number = Number(value);
    return state.data.stickers.find((sticker) => sticker.number === number || sticker.code === value);
  }

  return null;
}

function analyzeRegisterText(text) {
  const entries = parseStickerEntries(text);
  const valid = [];
  const invalid = [];
  const newOnes = [];
  const repeated = [];

  entries.forEach((entry) => {
    const sticker = findStickerByEntry(entry);
    if (!sticker) {
      invalid.push(entry);
      return;
    }
    const inv = getInventory(sticker.id);
    valid.push(sticker);
    if (inv.quantity === 0) newOnes.push(sticker);
    else repeated.push(sticker);
  });

  return { entries, valid, invalid, newOnes, repeated };
}

function saveRegisterBatch() {
  if (!state.registerPreview || state.registerPreview.valid.length === 0) {
    showToast("No hay laminas validas para guardar.");
    return;
  }

  const before = {};
  state.registerPreview.valid.forEach((sticker) => {
    const inv = getInventory(sticker.id);
    before[sticker.id] = inv.quantity;
    setInventory(sticker.id, { quantity: inv.quantity + 1 });
  });

  state.lastBatch = { before };
  addActivity(`Registraste ${state.registerPreview.valid.length} laminas`);
  showToast(`Listo: ${state.registerPreview.newOnes.length} nuevas y ${state.registerPreview.repeated.length} repetidas.`);
  state.registerText = "";
  state.registerPreview = null;
  render();
}

function undoLastBatch() {
  if (!state.lastBatch) {
    showToast("No hay un lote reciente para deshacer.");
    return;
  }

  Object.entries(state.lastBatch.before).forEach(([stickerId, quantity]) => {
    const inv = getInventory(stickerId);
    setInventory(stickerId, {
      quantity,
      pasted: quantity > 0 ? inv.pasted : false
    });
  });

  state.lastBatch = null;
  addActivity("Deshiciste el ultimo registro");
  showToast("Ultimo registro deshecho.");
  render();
}

function saveExpense() {
  const amount = Number(String(state.expenseForm.amount).replace(/[^\d.]/g, ""));
  const quantity = Math.max(1, Number(state.expenseForm.quantity || 1));
  if (!amount || amount <= 0) {
    showToast("Escribe un costo valido.");
    return;
  }

  const expense = {
    id: Date.now(),
    type: state.expenseForm.type,
    quantity,
    amount,
    place: state.expenseForm.place.trim(),
    note: state.expenseForm.note.trim(),
    date: new Date().toISOString()
  };

  state.data.expenses = [expense, ...(state.data.expenses || [])].slice(0, 200);
  saveData();
  addActivity(`Registraste gasto: ${formatCurrency(amount)}`);
  state.expenseForm = {
    type: "sobre",
    quantity: "1",
    amount: "",
    place: "",
    note: ""
  };
  showToast("Gasto guardado.");
  render();
}

function deleteExpense(expenseId) {
  state.data.expenses = (state.data.expenses || []).filter((item) => String(item.id) !== String(expenseId));
  saveData();
  addActivity("Eliminaste un gasto");
  showToast("Gasto eliminado.");
  render();
}

function saveTrade() {
  const contact = state.tradeForm.contact.trim();
  const analysis = analyzeTrade();
  if (!contact) {
    showToast("Escribe el contacto.");
    return;
  }
  if (!analysis.give.valid.length && !analysis.receive.valid.length) {
    showToast("Agrega laminas para dar o recibir.");
    return;
  }

  const trade = {
    id: Date.now(),
    contact,
    status: state.tradeForm.status,
    giveCodes: analysis.give.valid.map((sticker) => sticker.code),
    receiveCodes: analysis.receive.valid.map((sticker) => sticker.code),
    invalidGive: analysis.give.invalid,
    invalidReceive: analysis.receive.invalid,
    newToReceive: analysis.newToReceive.map((sticker) => sticker.code),
    duplicatedReceived: analysis.duplicatedReceived.map((sticker) => sticker.code),
    riskyGive: analysis.riskyGive.map((sticker) => sticker.code),
    note: state.tradeForm.note.trim(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const contacts = new Set(state.data.contacts || []);
  contacts.add(contact);
  state.data.contacts = [...contacts].sort((a, b) => a.localeCompare(b));
  state.data.trades = [trade, ...(state.data.trades || [])].slice(0, 200);
  saveData();
  addActivity(`Creaste intercambio con ${contact}`);
  state.tradeForm = {
    contact: "",
    giveText: "",
    receiveText: "",
    status: "propuesto",
    note: ""
  };
  showToast("Intercambio guardado.");
  render();
}

function updateTradeStatus(tradeId, status) {
  state.data.trades = (state.data.trades || []).map((trade) =>
    String(trade.id) === String(tradeId) ? { ...trade, status, updatedAt: new Date().toISOString() } : trade
  );
  saveData();
  addActivity("Actualizaste un intercambio");
  showToast("Estado actualizado.");
  render();
}

function deleteTrade(tradeId) {
  state.data.trades = (state.data.trades || []).filter((trade) => String(trade.id) !== String(tradeId));
  state.data.contacts = [...new Set(state.data.trades.map((trade) => trade.contact).filter(Boolean))].sort((a, b) => a.localeCompare(b));
  saveData();
  addActivity("Eliminaste un intercambio");
  showToast("Intercambio eliminado.");
  render();
}

function copyTradeMessage(tradeId) {
  const trade = (state.data.trades || []).find((item) => String(item.id) === String(tradeId));
  if (!trade) return;
  copyText(buildTradeMessage(trade));
}

function buildShareText(type, useCurrentFilters = false) {
  const base = type === "missing" ? missingStickers() : duplicateStickers();
  const stickers = useCurrentFilters ? filterListStickers(base) : base;
  const isMissing = type === "missing";
  const title = isMissing ? "Mi lista de faltantes" : "Mi lista de repetidas";
  const total = isMissing
    ? stickers.length
    : stickers.reduce((sum, sticker) => sum + Math.max(0, getInventory(sticker.id).quantity - 1), 0);
  if (!stickers.length) return `${title} - Mi Album Mundialista 2026\n\nNo tengo ${isMissing ? "faltantes" : "repetidas"} por ahora.`;

  const lines = [
    `${title} - Mi Album Mundialista 2026`,
    "",
    `Total ${isMissing ? "faltantes" : "repetidas"}: ${total}`,
    ""
  ];
  groupedBySection(stickers).forEach(({ section, stickers: group }) => {
    const values = group.map((sticker) => {
      if (type === "duplicates") {
        const qty = getInventory(sticker.id).quantity - 1;
        return `${sticker.code} x${qty}`;
      }
      return sticker.code;
    });
    lines.push(`${section.name}:`);
    lines.push(values.join(", "));
    lines.push("");
  });
  lines.push(isMissing ? "Tienes alguna para cambiar?" : "Te sirve alguna para cambiar?");
  return lines.join("\n");
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast("Lista copiada.");
  } catch (error) {
    const area = document.createElement("textarea");
    area.value = text;
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
    showToast("Lista copiada.");
  }
}

function openWhatsApp(text) {
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener");
}

function downloadText(filename, content, type = "text/plain;charset=utf-8") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function csvEscape(value) {
  const text = value === null || value === undefined ? "" : String(value);
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function rowsToCsv(rows) {
  return rows.map((row) => row.map(csvEscape).join(",")).join("\n");
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;
  const input = String(text || "");

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    const next = input[index + 1];
    if (quoted) {
      if (char === '"' && next === '"') {
        value += '"';
        index += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        value += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      row.push(value);
      value = "";
    } else if (char === "\n") {
      row.push(value);
      rows.push(row);
      row = [];
      value = "";
    } else if (char !== "\r") {
      value += char;
    }
  }

  if (value || row.length) {
    row.push(value);
    rows.push(row);
  }
  return rows.filter((item) => item.some((cell) => String(cell).trim()));
}

function normalizeHeader(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function csvToObjects(text) {
  const rows = parseCsv(text);
  if (!rows.length) return [];
  const headers = rows[0].map(normalizeHeader);
  return rows.slice(1).map((row) =>
    Object.fromEntries(headers.map((header, index) => [header, row[index] ?? ""]))
  );
}

function parseCsvBoolean(value, fallback = false) {
  const text = String(value ?? "").trim().toLowerCase();
  if (!text) return fallback;
  return ["1", "si", "s", "true", "yes", "y", "pegada", "prioridad"].includes(text);
}

function parseCsvNumber(value, fallback = 0) {
  const number = Number(String(value ?? "").replace(",", "."));
  return Number.isFinite(number) ? Math.max(0, Math.round(number)) : fallback;
}

function saveProfileFromForm() {
  const profile = normalizeProfile(state.data.profile);
  state.data.profile = {
    ...profile,
    collectorName: document.getElementById("collectorName")?.value.trim() || "",
    alias: document.getElementById("collectorAlias")?.value.trim() || "",
    city: document.getElementById("collectorCity")?.value.trim() || "",
    deviceName: document.getElementById("deviceName")?.value.trim() || "",
    updatedAt: new Date().toISOString()
  };
  saveData();
  addActivity("Actualizaste perfil de sincronizacion");
  showToast("Perfil guardado.");
  render();
}

function saveGoalsFromForm() {
  state.data.goals = normalizeGoals({
    targetProgress: document.getElementById("goalProgress")?.value || 50,
    weeklyNew: document.getElementById("goalWeekly")?.value || 25,
    favoriteSectionId: document.getElementById("goalSection")?.value || "",
    maxBudget: document.getElementById("goalBudget")?.value || ""
  });
  saveData();
  addActivity("Actualizaste metas inteligentes");
  showToast("Metas guardadas.");
  render();
}

function persistCloudAccountFromForm() {
  const current = normalizeCloudAccount(state.data.cloudAccount);
  state.data.cloudAccount = normalizeCloudAccount({
    email: document.getElementById("cloudEmail")?.value.trim() || "",
    provider: document.getElementById("cloudProvider")?.value || "pendiente",
    apiBaseUrl: document.getElementById("apiBaseUrl")?.value.trim() || current.apiBaseUrl,
    token: current.token,
    userId: current.userId,
    userName: current.userName,
    status: document.getElementById("cloudEmail")?.value.trim() ? "preparada" : "local",
    lastSyncAt: current.lastSyncAt
  });
  saveData();
}

function saveCloudAccountFromForm() {
  persistCloudAccountFromForm();
  addActivity("Actualizaste cuenta nube");
  showToast("Cuenta nube preparada.");
  render();
}

function getApiBaseUrl() {
  return normalizeCloudAccount(state.data.cloudAccount).apiBaseUrl.replace(/\/+$/, "");
}

async function apiRequest(path, options = {}) {
  const account = normalizeCloudAccount(state.data.cloudAccount);
  const headers = {
    "content-type": "application/json",
    ...(options.headers || {})
  };
  if (account.token) headers.authorization = `Bearer ${account.token}`;
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...options,
    headers
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.message || payload.error || "Error API");
  return payload;
}

function updateCloudAccountFromAuth(payload) {
  state.data.cloudAccount = {
    ...normalizeCloudAccount(state.data.cloudAccount),
    email: payload.user.email,
    userId: payload.user.id,
    userName: payload.user.name,
    token: payload.token,
    provider: "api-propia",
    status: "conectada"
  };
  saveData();
}

async function registerCloudUser() {
  try {
    const password = document.getElementById("cloudPassword")?.value || "";
    persistCloudAccountFromForm();
    const account = normalizeCloudAccount(state.data.cloudAccount);
    const payload = await apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: account.email,
        password,
        name: normalizeProfile(state.data.profile).collectorName || account.email
      })
    });
    updateCloudAccountFromAuth(payload);
    addActivity("Creaste cuenta en API propia");
    showToast("Cuenta creada y conectada.");
    render();
  } catch (error) {
    showToast(error.message || "No pude crear la cuenta.");
  }
}

async function loginCloudUser() {
  try {
    const password = document.getElementById("cloudPassword")?.value || "";
    persistCloudAccountFromForm();
    const account = normalizeCloudAccount(state.data.cloudAccount);
    const payload = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: account.email, password })
    });
    updateCloudAccountFromAuth(payload);
    addActivity("Iniciaste sesion en API propia");
    showToast("Sesion conectada.");
    render();
  } catch (error) {
    showToast(error.message || "No pude iniciar sesion.");
  }
}

async function uploadCloudData() {
  try {
    const account = normalizeCloudAccount(state.data.cloudAccount);
    if (!account.token) {
      showToast("Primero inicia sesion en la API.");
      return;
    }
    const payload = await apiRequest("/sync/album", {
      method: "PUT",
      body: JSON.stringify({
        syncId: normalizeProfile(state.data.profile).syncId,
        data: getCloudSafeData()
      })
    });
    state.data.cloudAccount = {
      ...account,
      lastSyncAt: payload.updatedAt || new Date().toISOString(),
      status: "sincronizada"
    };
    saveData();
    addActivity("Subiste coleccion a API propia");
    showToast("Coleccion subida a la API.");
    render();
  } catch (error) {
    showToast(error.message || "No pude subir a la API.");
  }
}

function getCloudSafeData() {
  const clone = JSON.parse(JSON.stringify(state.data));
  clone.cloudAccount = {
    ...normalizeCloudAccount(clone.cloudAccount),
    token: ""
  };
  return clone;
}

async function downloadCloudData() {
  try {
    const account = normalizeCloudAccount(state.data.cloudAccount);
    if (!account.token) {
      showToast("Primero inicia sesion en la API.");
      return;
    }
    const payload = await apiRequest("/sync/album");
    if (!payload.data) {
      showToast("No hay coleccion guardada en la API.");
      return;
    }
    state.data = normalizeData(payload.data);
    state.data.cloudAccount = {
      ...normalizeCloudAccount(state.data.cloudAccount),
      token: account.token,
      userId: account.userId,
      userName: account.userName,
      email: account.email,
      apiBaseUrl: account.apiBaseUrl,
      provider: "api-propia",
      lastSyncAt: payload.updatedAt || new Date().toISOString(),
      status: "sincronizada"
    };
    saveData();
    addActivity("Bajaste coleccion desde API propia");
    showToast("Coleccion descargada desde API.");
    render();
  } catch (error) {
    showToast(error.message || "No pude bajar desde la API.");
  }
}

async function checkApiConnection() {
  try {
    persistCloudAccountFromForm();
    const payload = await apiRequest("/health", { method: "GET" });
    showToast(payload.ok ? "API propia activa." : "API respondio sin estado claro.");
  } catch (error) {
    showToast("API no disponible. Inicia backend/server.mjs.");
  }
}

function markCloudSyncPoint() {
  state.data.cloudAccount = {
    ...normalizeCloudAccount(state.data.cloudAccount),
    lastSyncAt: new Date().toISOString(),
    status: "pendiente_backend"
  };
  saveData();
  addActivity("Marcaste punto de sincronizacion nube");
  showToast("Punto de sincronizacion marcado.");
  render();
}

function exportSyncPackage() {
  const payload = {
    type: "album-mundialista-sync-package",
    version: 1,
    exportedAt: new Date().toISOString(),
    syncId: normalizeProfile(state.data.profile).syncId,
    data: state.data
  };
  downloadText("album-2026-sync-package.json", JSON.stringify(payload, null, 2), "application/json;charset=utf-8");
  addActivity("Exportaste paquete de sincronizacion");
}

function importSyncPackage(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      const importedData = parsed.type === "album-mundialista-sync-package" ? parsed.data : parsed;
      if (!importedData?.album || !importedData?.sections || !importedData?.stickers) throw new Error("Formato invalido");
      state.data = normalizeData(importedData);
      saveData();
      addActivity("Importaste paquete de sincronizacion");
      showToast("Paquete de sincronizacion importado.");
      render();
    } catch (error) {
      showToast("No pude leer ese paquete.");
    }
  };
  reader.readAsText(file);
}

function exportCollectionCsv() {
  const rows = [
    ["codigo", "numero", "seccion", "nombre", "equipo", "cantidad", "pegada", "prioridad", "reservadas", "rareza"]
  ];
  state.data.stickers.forEach((sticker) => {
    const inv = getInventory(sticker.id);
    const section = getSection(sticker.sectionId);
    rows.push([
      sticker.code,
      sticker.number,
      section?.name || "",
      sticker.name,
      sticker.country || sticker.teamName || "",
      inv.quantity || 0,
      inv.pasted ? "si" : "no",
      inv.priority ? "si" : "no",
      inv.reservedQuantity || 0,
      sticker.rarity || ""
    ]);
  });
  downloadText("album-2026-coleccion.csv", rowsToCsv(rows), "text/csv;charset=utf-8");
}

function exportExpensesCsv() {
  const rows = [["fecha", "tipo", "cantidad", "valor", "lugar", "nota"]];
  (state.data.expenses || []).forEach((expense) => {
    rows.push([
      expense.createdAt || "",
      expense.type || "",
      expense.quantity || 0,
      expense.amount || 0,
      expense.place || "",
      expense.note || ""
    ]);
  });
  downloadText("album-2026-gastos.csv", rowsToCsv(rows), "text/csv;charset=utf-8");
}

function exportTradesCsv() {
  const rows = [["fecha", "contacto", "estado", "entrego", "recibo", "nota"]];
  (state.data.trades || []).forEach((trade) => {
    rows.push([
      trade.createdAt || trade.updatedAt || "",
      trade.contact || "",
      trade.status || "",
      (trade.give || []).join(" "),
      (trade.receive || []).join(" "),
      trade.note || ""
    ]);
  });
  downloadText("album-2026-intercambios.csv", rowsToCsv(rows), "text/csv;charset=utf-8");
}

function exportActivityCsv() {
  const rows = [["fecha", "actividad"]];
  (state.data.activity || []).forEach((item) => rows.push([item.at || "", item.message || ""]));
  downloadText("album-2026-historial.csv", rowsToCsv(rows), "text/csv;charset=utf-8");
}

function importCollectionCsv(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const rows = csvToObjects(reader.result);
      let imported = 0;
      let ignored = 0;
      rows.forEach((row) => {
        const entry = row.codigo || row.code || row.lamina || row.ficha || row.id || row.numero || row.number;
        const sticker = findStickerByEntry(entry);
        if (!sticker) {
          ignored += 1;
          return;
        }
        const current = getInventory(sticker.id);
        setInventory(sticker.id, {
          ...current,
          quantity: parseCsvNumber(row.cantidad || row.quantity, current.quantity || 0),
          pasted: parseCsvBoolean(row.pegada || row.pasted, current.pasted || false),
          priority: parseCsvBoolean(row.prioridad || row.priority, current.priority || false),
          reservedQuantity: parseCsvNumber(row.reservadas || row.reserved || row.reserved_quantity, current.reservedQuantity || 0)
        });
        imported += 1;
      });
      addActivity(`Importaste coleccion CSV: ${imported} filas`);
      showToast(`CSV importado: ${imported} fichas actualizadas${ignored ? `, ${ignored} ignoradas` : ""}.`);
      render();
    } catch (error) {
      showToast("No pude leer ese CSV.");
    }
  };
  reader.readAsText(file);
}

function exportBackup() {
  const payload = JSON.stringify(state.data, null, 2);
  downloadText("album-panini-2026-backup.json", payload, "application/json;charset=utf-8");
}

function importBackup(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      if (!parsed.album || !parsed.sections || !parsed.stickers) throw new Error("Formato invalido");
      state.data = parsed;
      state.data.expenses = state.data.expenses || [];
      state.data.trades = state.data.trades || [];
      state.data.contacts = [...new Set(state.data.trades.map((trade) => trade.contact).filter(Boolean))].sort((a, b) => a.localeCompare(b));
      state.data.activity = state.data.activity || [];
      saveData();
      showToast("Backup importado.");
      render();
    } catch (error) {
      showToast("No pude leer ese backup.");
    }
  };
  reader.readAsText(file);
}

function resetDemo() {
  const confirmed = window.confirm("Esto reinicia la coleccion demo guardada en este navegador. Deseas continuar?");
  if (!confirmed) return;
  localStorage.removeItem(STORAGE_KEY);
  state.data = createDemoData();
  state.lastBatch = null;
  showToast("Coleccion reiniciada.");
  render();
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function navigate(view) {
  state.view = view;
  state.openFilter = null;
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function isMobileOrTablet() {
  const ua = navigator.userAgent || "";
  const platform = navigator.platform || "";
  const iPad = /iPad/i.test(ua) || (platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const mobile = /Android|iPhone|iPod|Mobile|Tablet/i.test(ua);
  const compactTouch = window.matchMedia("(pointer: coarse)").matches && window.innerWidth <= 1180;
  return Boolean(iPad || mobile || compactTouch);
}

function isStandaloneApp() {
  return window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
}

function isIosDevice() {
  const ua = navigator.userAgent || "";
  const platform = navigator.platform || "";
  return /iPhone|iPad|iPod/i.test(ua) || (platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

async function installApp() {
  if (isStandaloneApp()) {
    showToast("La app ya esta instalada en este dispositivo.");
    return;
  }

  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    const choice = await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    showToast(choice.outcome === "accepted" ? "Instalacion iniciada." : "Puedes instalarla despues.");
    return;
  }

  if (isIosDevice()) {
    showToast("En iPhone/iPad: Compartir y luego Agregar a pantalla de inicio.");
    return;
  }

  showToast("Usa la opcion Instalar app del navegador cuando aparezca.");
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  const register = () => {
    navigator.serviceWorker.register("sw.js?v=5").catch(() => {});
  };
  if (document.readyState === "complete") {
    register();
  } else {
    window.addEventListener("load", register, { once: true });
  }
}

function enterApp() {
  state.entered = true;
  render();
}

function renderLanding() {
  const showDownload = isMobileOrTablet();
  const app = document.getElementById("app");
  app.innerHTML = `
    <main class="landing-screen" style="--landing-bg:url('${LANDING_BG}')">
      <section class="landing-card" aria-label="Mi Album Mundialista 2026">
        <img class="landing-logo" src="${BRAND_LOGO_FULL}" alt="Mi Album Mundialista 2026" />
        <div class="landing-actions">
          <button class="button landing-primary" id="enterApp" type="button">
            ${renderIcon("log-in")}
            <span>Entrar ya</span>
          </button>
          ${
            showDownload
              ? `<button class="button secondary landing-download" id="downloadApp" type="button">
                  ${renderIcon("download")}
                  <span>Descargar</span>
                </button>`
              : ""
          }
        </div>
      </section>
    </main>
  `;
}

function renderShell(content) {
  const stats = getStats();
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="layout">
      <aside class="sidebar">
        <div class="sidebar-top">
          <div class="brand-card">
            <img class="brand-mark-img" src="${BRAND_LOGO_MARK}" alt="Mi Album Mundialista 2026" />
          </div>
          <div class="brand">
            <div>
              <h1 class="brand-title">Mi Album<br />Mundialista</h1>
              <p class="brand-subtitle">Control 2026</p>
            </div>
          </div>
        </div>
        <nav class="nav" aria-label="Principal">
          ${navItems.map(renderNavButton).join("")}
        </nav>
        <div class="sidebar-bottom">
          <div class="album-level" style="--level-progress:${stats.progress}%">
            <span class="level-badge">Avance del album</span>
            <strong>${stats.progress}% completado</strong>
            <div class="level-track"><span></span></div>
            <small>${stats.owned} / ${stats.total} fichas unicas</small>
          </div>
        </div>
      </aside>
      <main class="main">${content}</main>
      <nav class="mobile-nav" aria-label="Principal mobile">
        ${navItems.map(renderNavButton).join("")}
      </nav>
    </div>
    ${renderActiveModal()}
  `;
}

function renderNavButton(item) {
  return `
    <button class="nav-button ${state.view === item.id ? "active" : ""}" data-nav="${item.id}" type="button">
      <span class="nav-icon">${renderIcon(item.icon)}</span>
      <span>${t(item.id)}</span>
    </button>
  `;
}

function pageHeader(title, copy, actions = "") {
  return `
    <header class="topbar">
      <div>
        <h2 class="page-title">${title}</h2>
        <p class="page-copy">${copy}</p>
      </div>
      ${actions ? `<div class="topbar-actions"><div class="toolbar">${actions}</div></div>` : ""}
    </header>
  `;
}

function renderActiveModal() {
  if (state.activeModal === "team-register") return renderTeamRegisterModal();
  if (state.activeModal === "import-preview") return renderImportModal();
  return "";
}

function renderTeamRegisterModal() {
  const section = getSection(state.teamRegisterSectionId) || state.data.sections[0];
  const stickers = getSectionStickers(section?.id);
  return `
    <div class="modal-backdrop" role="presentation">
      <section class="modal-panel large" role="dialog" aria-modal="true" aria-label="${t("registerByTeam")}">
        <div class="modal-head">
          <div>
            <h3>${t("registerByTeam")}</h3>
            <p>${escapeHtml(section?.name || "")} - ${state.teamRegisterSelectedIds.size}/${stickers.length} seleccionadas</p>
          </div>
          <button class="button icon secondary" data-close-modal type="button">${renderIcon("x")}</button>
        </div>
        <div class="modal-toolbar">
          <select class="select" id="teamRegisterSection">
            ${state.data.sections.map((item) => `<option value="${item.id}" ${item.id === section?.id ? "selected" : ""}>${escapeHtml(item.name)} (${item.count})</option>`).join("")}
          </select>
          <button class="button secondary" data-select-team-all type="button">${t("selectAll")}</button>
          <button class="button secondary" data-clear-team-all type="button">${t("clearAll")}</button>
        </div>
        <div class="modal-sticker-list">
          ${stickers
            .map((sticker) => {
              const inv = getInventory(sticker.id);
              const visual = getTeamVisual(sticker, section);
              const checked = state.teamRegisterSelectedIds.has(sticker.id);
              return `
                <label class="modal-sticker-row" style="${flagStyle(visual)}">
                  <input type="checkbox" data-team-sticker="${sticker.id}" ${checked ? "checked" : ""} />
                  <span class="mini-flag ${flagLayout(visual.code)}"><span class="flag-swatch" aria-hidden="true"></span></span>
                  <strong>${escapeHtml(sticker.code)}</strong>
                  <span>${escapeHtml(isSimpleCardView() ? section?.name || visual.code : sticker.name)}</span>
                  <small>${inv.quantity > 0 ? "Ya registrada" : "Nueva"}</small>
                </label>
              `;
            })
            .join("")}
        </div>
        <div class="modal-actions">
          <button class="button secondary" data-close-modal type="button">${t("cancel")}</button>
          <button class="button" data-confirm-team-register type="button">${t("confirm")}</button>
        </div>
      </section>
    </div>
  `;
}

function renderImportModal() {
  const mode = state.importPreview.mode;
  const isCamera = mode === "camera";
  return `
    <div class="modal-backdrop" role="presentation">
      <section class="modal-panel large" role="dialog" aria-modal="true" aria-label="${isCamera ? t("registerCamera") : t("uploadPhoto")}">
        <div class="modal-head">
          <div>
            <h3>${isCamera ? t("registerCamera") : t("uploadPhoto")}</h3>
            <p>Vista previa obligatoria antes de guardar. Si OCR no esta disponible, pega los codigos visibles.</p>
          </div>
          <button class="button icon secondary" data-close-modal type="button">${renderIcon("x")}</button>
        </div>
        ${
          isCamera
            ? `<div class="camera-box"><video id="cameraPreview" playsinline muted></video><button class="button secondary" data-start-camera type="button">Iniciar camara</button><button class="button secondary" data-capture-camera type="button">Capturar</button></div>`
            : `<label class="upload-box"><input id="photoImport" type="file" accept="image/*" hidden /><span class="nav-icon">${renderIcon("image")}</span><strong>Seleccionar imagen</strong></label>`
        }
        ${state.importPreview.imageUrl ? `<img class="import-image-preview" src="${state.importPreview.imageUrl}" alt="Vista previa de importacion" />` : ""}
        <label class="import-code-box">
          <span>Codigos detectados o visibles</span>
          <textarea class="textarea compact" id="importCodesText" placeholder="Ej: COL 20, ARG 12">${escapeHtml(state.importPreview.text)}</textarea>
        </label>
        <div class="toolbar scanner-toolbar">
          <button class="button secondary" data-clean-import type="button">${renderIcon("check-square")} Limpiar lectura</button>
          <span class="scanner-note">Fase 9: confirma siempre antes de guardar.</span>
        </div>
        ${renderImportQuality()}
        <div class="import-preview-list">
          ${
            state.importPreview.items.length
              ? state.importPreview.items.map(renderImportPreviewItem).join("")
              : `<div class="empty">No hay fichas validas detectadas todavia.</div>`
          }
        </div>
        ${state.importPreview.invalid.length ? `<p class="form-warning">No encontrados: ${state.importPreview.invalid.map(escapeHtml).join(", ")}</p>` : ""}
        <div class="modal-actions">
          <button class="button secondary" data-close-modal type="button">${t("cancel")}</button>
          <button class="button" data-confirm-import type="button">${t("confirm")}</button>
        </div>
      </section>
    </div>
  `;
}

function renderImportQuality() {
  const valid = state.importPreview.items.length;
  const repeated = state.importPreview.items.filter((sticker) => getInventory(sticker.id).quantity > 0).length;
  const newOnes = Math.max(0, valid - repeated);
  const invalid = state.importPreview.invalid.length;
  const total = valid + invalid;
  const confidence = total ? Math.round((valid / total) * 100) : 0;
  return `
    <div class="scanner-quality">
      <article><strong>${confidence}%</strong><span>confianza</span></article>
      <article><strong>${valid}</strong><span>validas</span></article>
      <article><strong>${newOnes}</strong><span>nuevas</span></article>
      <article><strong>${repeated}</strong><span>ya tenias</span></article>
    </div>
  `;
}

function renderImportPreviewItem(sticker) {
  const section = getSection(sticker.sectionId);
  const visual = getTeamVisual(sticker, section);
  const status = getInventory(sticker.id).quantity > 0 ? "Ya registrada" : "Nueva";
  return `
    <article class="import-preview-item" style="${flagStyle(visual)}">
      <span class="mini-flag ${flagLayout(visual.code)}"><span class="flag-swatch" aria-hidden="true"></span></span>
      <strong>${escapeHtml(sticker.code)}</strong>
      <span>${escapeHtml(isSimpleCardView() ? section?.name || visual.code : sticker.name)}</span>
      <small>${status}</small>
      <button class="button tiny secondary" data-remove-import="${sticker.id}" type="button">${renderIcon("x")}</button>
    </article>
  `;
}

function renderHome() {
  const stats = getStats();
  const insights = getSmartInsights();
  const progressStyle = `--progress:${stats.progress}%`;
  const showcase = filteredStickers().slice(0, 10);
  return `
    ${pageHeader(
      "Mi Album Mundialista 2026",
      "Tu tablero principal para ver avance, faltantes, repetidas y registrar laminas rapido.",
      `<button class="button" data-nav="register" type="button">Registrar laminas</button>`
    )}
    <section class="home-dashboard">
      <div class="dashboard-main-panel">
        <div class="identity-banner">
          <img src="${BRAND_LOGO_FULL}" alt="Mi Album Mundialista 2026" />
          <div>
            <strong>Control total del album</strong>
            <span>Faltantes, repetidas, progreso y cambios en un solo lugar.</span>
          </div>
        </div>
        ${renderFilters({ showToggle: false })}
        <div class="section-title-row">
          <h3 class="panel-title">Mis Figuritas <span>${stats.owned} / ${stats.total}</span></h3>
          <button class="button secondary tiny" data-nav="album" type="button">Ver todas</button>
        </div>
        <div class="showcase-grid">
          ${showcase.map(renderShowcaseCard).join("")}
        </div>
      </div>
      <aside class="dashboard-side">
        <section class="panel progress-panel">
          <h3 class="panel-title">Progreso del album</h3>
          <div class="progress-ring" style="${progressStyle}">
            <div class="progress-ring-inner">
              <div>
                <strong>${stats.progress}%</strong>
                <span>${stats.owned} / ${stats.total}</span>
              </div>
            </div>
          </div>
        </section>
        <section class="panel side-stats">
          <h3 class="panel-title">Estadisticas</h3>
          ${sideStat("Figuritas totales", stats.total, "neutral")}
          ${sideStat("Pegadas", stats.owned, "good")}
          ${sideStat("Faltantes", stats.missing, "warn")}
          ${sideStat("Repetidas", stats.duplicates, "info")}
          ${sideStat("Prioridad", stats.priority, "neutral")}
        </section>
        <section class="panel side-actions">
          <h3 class="panel-title">Acciones rapidas</h3>
          <button class="action-tile" data-nav="register" type="button">
            <span>${renderIcon("plus-circle")}</span>
            <strong>Registrar laminas</strong>
            <small>Carga codigos por lote.</small>
          </button>
          <button class="action-tile" data-nav="missing" type="button">
            <span>${renderIcon("list-checks")}</span>
            <strong>Ver faltantes</strong>
            <small>${stats.missing} fichas por conseguir.</small>
          </button>
          <button class="action-tile" data-nav="duplicates" type="button">
            <span>${renderIcon("repeat-2")}</span>
            <strong>Ver repetidas</strong>
            <small>${stats.duplicates} disponibles para cambio.</small>
          </button>
          <button class="action-tile" data-nav="trades" type="button">
            <span>${renderIcon("shuffle")}</span>
            <strong>Intercambios</strong>
            <small>Propuestas y contactos.</small>
          </button>
          <button class="action-tile" data-nav="share" type="button">
            <span>${renderIcon("share-2")}</span>
            <strong>Compartir</strong>
            <small>Resumen y comparador.</small>
          </button>
          <button class="action-tile" data-nav="stats" type="button">
            <span>${renderIcon("bar-chart-3")}</span>
            <strong>Estadisticas</strong>
            <small>Avance y costos del album.</small>
          </button>
          <button class="action-tile" data-nav="expenses" type="button">
            <span>${renderIcon("wallet")}</span>
            <strong>Gastos</strong>
            <small>Registra compras y sobres.</small>
          </button>
        </section>
      </aside>
    </section>
    ${renderSmartDashboard(insights)}
    <section class="panel progress-by-section">
      <div class="section-title-row">
        <h3 class="panel-title">Progreso por Seleccion</h3>
        <button class="button secondary tiny" data-nav="album" type="button">Ver todas</button>
      </div>
      ${renderSectionProgress()}
    </section>
    <section class="panel" style="margin-top:16px">
      <h3 class="panel-title">Ultima actividad</h3>
      ${renderActivity()}
    </section>
  `;
}

function renderSmartDashboard(insights) {
  return `
    <section class="panel smart-panel">
      <div class="section-title-row">
        <div>
          <h3 class="panel-title">Tablero inteligente</h3>
          <p class="page-copy">Metas, alertas y siguiente paso recomendado segun tu avance actual.</p>
        </div>
        <button class="button secondary tiny" data-nav="${insights.nextView}" type="button">Ir</button>
      </div>
      <div class="smart-grid">
        <article class="smart-card next-action">
          <strong>${renderIcon("bell")} Siguiente paso</strong>
          <span>${escapeHtml(insights.nextAction)}</span>
        </article>
        <article class="smart-card">
          <strong>Meta del album</strong>
          <span>${getStats().progress}% / ${insights.goals.targetProgress}%</span>
        </article>
        <article class="smart-card">
          <strong>Prioridades faltantes</strong>
          <span>${insights.priorityMissing.length ? insights.priorityMissing.slice(0, 5).map((sticker) => sticker.code).join(", ") : "Sin urgentes"}</span>
        </article>
        <article class="smart-card">
          <strong>Casi completas</strong>
          <span>${insights.almostDone.length ? insights.almostDone.map((item) => item.section.name).join(", ") : "Aun no"}</span>
        </article>
      </div>
      <div class="alert-grid">
        ${
          insights.alerts.length
            ? insights.alerts.map((alert) => `<article class="smart-alert ${alert.tone}"><strong>${escapeHtml(alert.title)}</strong><span>${escapeHtml(alert.copy)}</span></article>`).join("")
            : `<article class="smart-alert good"><strong>Todo tranquilo</strong><span>No hay alertas importantes por ahora.</span></article>`
        }
      </div>
    </section>
  `;
}

function sideStat(label, value, tone) {
  return `
    <div class="side-stat ${tone}">
      <span>${label}</span>
      <strong>${value}</strong>
    </div>
  `;
}

function renderShowcaseCard(sticker) {
  const inv = getInventory(sticker.id);
  const section = getSection(sticker.sectionId);
  const visual = getTeamVisual(sticker, section);
  const status = stickerStatus(sticker);
  const label = status === "missing" ? "Faltante" : status === "duplicate" ? "Repetida" : inv.pasted ? "Pegada" : "Obtenida";
  const statusClass = status === "missing" ? "warn" : status === "duplicate" ? "info" : "good";
  const simple = isSimpleCardView();
  return `
    <article class="showcase-card ${status} ${simple ? "simple-card" : ""}" style="${flagStyle(visual)}">
      <strong>${escapeHtml(sticker.code)}</strong>
      ${simple ? `<small>${escapeHtml(section?.name || visual.code)}</small>` : ""}
      <span class="hero-flag ${flagLayout(visual.code)}"><span class="flag-swatch" aria-hidden="true"></span></span>
      <span class="status-line ${statusClass}"><span></span>${label}</span>
    </article>
  `;
}

function statCard(label, value, helper) {
  return `
    <article class="stat-card">
      <p class="stat-label">${label}</p>
      <p class="stat-value">${value}</p>
      <p class="stat-label">${helper}</p>
    </article>
  `;
}

function quickCard(title, copy, view) {
  return `
    <button class="quick-card" data-nav="${view}" type="button">
      <strong>${title}</strong>
      <span>${copy}</span>
    </button>
  `;
}

function renderSectionProgress() {
  return `
    <div class="section-progress">
      ${state.data.sections
        .map((section) => {
          const stats = sectionStats(section);
          const visual = getTeamVisual({ teamCode: section.code }, section);
          return `
            <div class="progress-item" style="${flagStyle(visual)}">
              <div class="progress-row">
                <span class="progress-label">
                  <span class="mini-flag ${flagLayout(section.code)}"><span class="flag-swatch" aria-hidden="true"></span></span>
                  <strong>${section.name}</strong>
                </span>
                <span>${stats.owned}/${stats.total} (${stats.progress}%)</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill" style="width:${stats.progress}%;--section-color:${section.color}"></div>
              </div>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderActivity(limit = 12) {
  if (!state.data.activity.length) {
    return `<div class="empty">Todavia no hay actividad. Empieza registrando algunas laminas.</div>`;
  }
  return state.data.activity
    .slice(0, limit)
    .map((item) => `<div class="list-row"><span class="sticker-number">OK</span><div>${item.message}<p class="sticker-meta">${new Date(item.at).toLocaleString()}</p></div></div>`)
    .join("");
}

function renderAlbum() {
  const stickers = filteredStickers();
  return `
    ${pageHeader("Mi Album", "Busca cualquier lamina, filtra por estado y ajusta cantidades al instante.")}
    ${renderFilters()}
    <section class="sticker-grid ${state.albumView === "list" ? "list" : ""}">
      ${stickers.length ? stickers.map(renderStickerCard).join("") : `<div class="empty">No encontre laminas con esos filtros.</div>`}
    </section>
  `;
}

function renderFilters({ showToggle = true } = {}) {
  return `
    <div class="filters">
      <input class="field" id="searchInput" type="search" placeholder="Buscar codigo, jugador o seleccion" value="${escapeHtml(state.query)}" />
      ${renderSectionDropdown()}
      ${renderStatusDropdown()}
      ${showToggle ? `<button class="button secondary" id="toggleAlbumView" type="button">${state.albumView === "grid" ? "Vista lista" : "Vista cuadricula"}</button>` : `<button class="button secondary" data-clear-filters type="button">Limpiar filtros</button>`}
    </div>
  `;
}

function renderSectionDropdown() {
  const current = state.sectionFilter === "all" ? null : getSection(state.sectionFilter);
  const currentVisual = current ? getTeamVisual({ teamCode: current.code }, current) : null;
  const currentStyle = current ? flagStyle(currentVisual) : "--flag-a:#FFD800;--flag-b:#174EA6;--flag-c:#E30613;";
  const currentLayout = current ? flagLayout(current.code) : "horizontal";
  const currentLabel = current ? current.name : t("allSections");
  const currentCount = current ? `${current.count} fichas` : `${state.data.stickers.length} fichas`;

  return `
    <div class="filter-dropdown ${state.openFilter === "section" ? "open" : ""}">
      <button class="filter-button" data-dropdown-toggle="section" type="button" aria-expanded="${state.openFilter === "section"}">
        <span class="filter-button-main">
          <span class="mini-flag ${currentLayout}" style="${currentStyle}"><span class="flag-swatch" aria-hidden="true"></span></span>
          <span class="filter-button-text">
            <strong>${escapeHtml(currentLabel)}</strong>
            <small>${escapeHtml(currentCount)}</small>
          </span>
        </span>
        <span class="filter-chevron">${renderIcon("chevron-down")}</span>
      </button>
      ${
        state.openFilter === "section"
          ? `<div class="filter-menu section-menu">
              <button class="filter-option ${state.sectionFilter === "all" ? "selected" : ""}" data-filter-section="all" type="button">
                <span class="mini-flag horizontal" style="--flag-a:#FFD800;--flag-b:#174EA6;--flag-c:#E30613;"><span class="flag-swatch" aria-hidden="true"></span></span>
                <span class="filter-option-text"><strong>${t("allSections")}</strong><small>${state.data.stickers.length} fichas</small></span>
              </button>
              ${state.data.sections.map(renderSectionOption).join("")}
            </div>`
          : ""
      }
    </div>
  `;
}

function renderSectionOption(section) {
  const visual = getTeamVisual({ teamCode: section.code }, section);
  return `
    <button class="filter-option ${state.sectionFilter === section.id ? "selected" : ""}" data-filter-section="${section.id}" type="button" style="${flagStyle(visual)}">
      <span class="mini-flag ${flagLayout(section.code)}"><span class="flag-swatch" aria-hidden="true"></span></span>
      <span class="filter-option-text"><strong>${escapeHtml(section.name)}</strong><small>${escapeHtml(section.code)} - ${section.count} fichas</small></span>
    </button>
  `;
}

function renderStatusDropdown() {
  const current = statusOptions.find((option) => option.id === state.statusFilter) || statusOptions[0];
  const currentText = getStatusOptionText(current);
  return `
    <div class="filter-dropdown ${state.openFilter === "status" ? "open" : ""}">
      <button class="filter-button" data-dropdown-toggle="status" type="button" aria-expanded="${state.openFilter === "status"}">
        <span class="filter-button-main">
          <span class="status-dot ${current.tone}"></span>
          <span class="filter-button-text">
            <strong>${escapeHtml(currentText.label)}</strong>
            <small>Filtro de estado</small>
          </span>
        </span>
        <span class="filter-chevron">${renderIcon("chevron-down")}</span>
      </button>
      ${
        state.openFilter === "status"
          ? `<div class="filter-menu status-menu">
              ${statusOptions
                .map(
                  (option) => {
                    const text = getStatusOptionText(option);
                    return `
                    <button class="filter-option ${state.statusFilter === option.id ? "selected" : ""}" data-filter-status="${option.id}" type="button">
                      <span class="status-dot ${option.tone}"></span>
                      <span class="filter-option-text"><strong>${escapeHtml(text.label)}</strong><small>${escapeHtml(text.helper)}</small></span>
                    </button>
                  `;
                  }
                )
                .join("")}
            </div>`
          : ""
      }
    </div>
  `;
}

function renderStickerCard(sticker) {
  const inv = getInventory(sticker.id);
  const section = getSection(sticker.sectionId);
  const visual = getTeamVisual(sticker, section);
  const status = stickerStatus(sticker);
  const statusLabel = status === "missing" ? "Faltante" : status === "duplicate" ? "Repetida" : inv.pasted ? "Pegada" : "Obtenida";
  const statusClass = status === "missing" ? "warn" : status === "duplicate" ? "info" : "good";
  const simple = isSimpleCardView();
  return `
    <article class="sticker-card ${status} ${simple ? "simple-card" : ""}" style="${flagStyle(visual)}">
      <div class="sticker-top">
        <strong>${escapeHtml(sticker.code)}</strong>
        <span class="chip ${statusClass}">${statusLabel}</span>
      </div>
      <div class="sticker-art">
        <span class="hero-flag ${flagLayout(visual.code)}" title="${escapeHtml(section?.name || sticker.country || "Seccion")}">
          <span class="flag-swatch" aria-hidden="true"></span>
        </span>
      </div>
      <div class="sticker-main">
        <h3 class="sticker-name">${simple ? escapeHtml(section?.name || sticker.country || visual.code) : escapeHtml(sticker.name)}</h3>
        ${simple ? "" : `<p class="sticker-meta">${section?.name || "Sin seccion"}${sticker.rarity ? ` - ${sticker.rarity}` : ""}</p>`}
      </div>
      <div class="sticker-actions" aria-label="Controles de cantidad">
        <button class="step-button" data-dec="${sticker.id}" title="Restar cantidad" type="button">-</button>
        <span class="count-pill">${inv.quantity}</span>
        <button class="step-button add" data-inc="${sticker.id}" title="Sumar cantidad" type="button">+</button>
        <button class="button tiny secondary" data-pasted="${sticker.id}" type="button">${inv.pasted ? "Pegada" : "Sin pegar"}</button>
        <button class="priority-button ${inv.priority ? "active" : ""}" data-priority="${sticker.id}" title="Marcar prioridad" type="button">
          <span class="priority-icon">${renderIcon("bell")}</span>
          <span class="priority-label">${inv.priority ? "Prioridad" : "Priorizar"}</span>
        </button>
      </div>
      <div class="sticker-extra">
        ${inv.quantity > 1 ? `<span class="chip info">${inv.quantity - 1} para cambiar</span>` : ""}
      </div>
    </article>
  `;
}

function renderRegister() {
  const preview = state.registerPreview;
  return `
    ${pageHeader(t("registerTitle"), t("registerCopy"))}
    <section class="grid quick-actions register-methods" aria-label="Metodos de registro">
      <button class="quick-card" data-open-team-register type="button">
        <span class="nav-icon">${renderIcon("check-square")}</span>
        <strong>${t("registerByTeam")}</strong>
        <span>Marca varias fichas de una seccion.</span>
      </button>
      <button class="quick-card" data-open-camera-import type="button">
        <span class="nav-icon">${renderIcon("camera")}</span>
        <strong>${t("registerCamera")}</strong>
        <span>Abre camara y confirma antes de guardar.</span>
      </button>
      <button class="quick-card" data-open-photo-import type="button">
        <span class="nav-icon">${renderIcon("image")}</span>
        <strong>${t("uploadPhoto")}</strong>
        <span>Sube foto y revisa codigos.</span>
      </button>
    </section>
    <section class="panel">
      <textarea class="textarea" id="registerText" placeholder="Ejemplo: COL 4, COL 20, FWC 19, 980">${escapeHtml(state.registerText)}</textarea>
      <div class="toolbar" style="margin-top:12px">
        <button class="button" id="analyzeRegister" type="button">${t("reviewBatch")}</button>
        <button class="button secondary" id="undoBatch" type="button">${t("undoLast")}</button>
      </div>
      ${
        preview
          ? `
            <div class="grid results-grid">
              ${statCard("Validas", preview.valid.length, "Se pueden guardar")}
              ${statCard("Nuevas", preview.newOnes.length, "Suben progreso")}
              ${statCard("Repetidas", preview.repeated.length, "Sirven para cambio")}
            </div>
            ${preview.invalid.length ? `<p class="page-copy">Numeros no encontrados: ${preview.invalid.join(", ")}</p>` : ""}
            <div class="toolbar" style="margin-top:14px">
              <button class="button" id="saveRegister" type="button">${t("saveBatch")}</button>
            </div>
          `
          : ""
      }
    </section>
  `;
}

function renderMissing() {
  const stickers = filterListStickers(missingStickers());
  return renderListPage({
    title: "Faltantes",
    copy: "Estas son las laminas que te faltan. Copialas o compartelas para buscar cambios rapido.",
    type: "missing",
    stickers,
    empty: "Buenisimo: no tienes faltantes en este checklist."
  });
}

function renderDuplicates() {
  const stickers = filterListStickers(duplicateStickers());
  return renderListPage({
    title: "Repetidas",
    copy: "Estas son las laminas disponibles para intercambiar, calculadas por cantidad mayor a uno.",
    type: "duplicates",
    stickers,
    empty: "Aun no tienes repetidas. Cuando salgan, apareceran aqui."
  });
}

function renderListPage({ title, copy, type, stickers, empty }) {
  const text = buildShareText(type, true);
  return `
    ${pageHeader(title, copy)}
    ${renderListFilters()}
    <section class="list-tools">
      <button class="button" data-copy="${type}" type="button">Copiar lista</button>
      <button class="button secondary whatsapp-button" data-whatsapp="${type}" type="button"><span class="whatsapp-icon">WA</span> WhatsApp</button>
    </section>
    <section class="group-list">
      ${
        stickers.length
          ? groupedBySection(stickers)
              .map(
                ({ section, stickers: group }) => `
                  <div class="list-group" style="${flagStyle(getTeamVisual({ teamCode: section.code }, section))}">
                    ${renderGroupHeading(section, group)}
                    ${group.map((sticker) => renderListRow(sticker, type)).join("")}
                  </div>
                `
              )
              .join("")
          : `<div class="empty">${empty}</div>`
      }
    </section>
    <textarea class="textarea" readonly style="margin-top:16px">${escapeHtml(text)}</textarea>
  `;
}

function renderListFilters() {
  return `
    <div class="filters list-filters">
      <input class="field" id="searchInput" type="search" placeholder="Buscar codigo, pais o grupo" value="${escapeHtml(state.query)}" />
      ${renderSectionDropdown()}
      <button class="button secondary" data-clear-filters type="button">Limpiar filtros</button>
    </div>
  `;
}

function renderGroupHeading(section, group) {
  const visual = getTeamVisual({ teamCode: section.code }, section);
  return `
    <div class="group-heading">
      <span class="group-title">
        <span class="mini-flag ${flagLayout(section.code)}" style="${flagStyle(visual)}"><span class="flag-swatch" aria-hidden="true"></span></span>
        <span>
          <strong>${escapeHtml(section.name)}</strong>
          <small>${escapeHtml(section.code)} - ${group.length} en esta lista</small>
        </span>
      </span>
    </div>
  `;
}

function renderListRow(sticker, type) {
  const inv = getInventory(sticker.id);
  const section = getSection(sticker.sectionId);
  const visual = getTeamVisual(sticker, section);
  const quantity = Math.max(0, inv.quantity - 1);
  const simple = isSimpleCardView();
  return `
    <article class="list-row ${simple ? "simple-row" : ""}" style="${flagStyle(visual)}">
      <span class="list-code">
        <span class="mini-flag ${flagLayout(visual.code)}"><span class="flag-swatch" aria-hidden="true"></span></span>
        <span class="sticker-number">${escapeHtml(sticker.code)}</span>
      </span>
      <div class="list-copy">
        <strong>${escapeHtml(simple ? section?.name || visual.code : sticker.name)}</strong>
        ${simple ? "" : `<p class="sticker-meta">${section?.name || "Sin seccion"}${sticker.rarity ? ` - ${sticker.rarity}` : ""}</p>`}
      </div>
      <span class="chip ${type === "duplicates" ? "info" : "warn"}">${type === "duplicates" ? `${quantity} disponible` : "Falta"}</span>
    </article>
  `;
}

function renderStats() {
  const stats = getStats();
  const expenseStats = getExpenseStats();
  const registered = getTotalRegisteredStickers();
  const completedSections = state.data.sections.filter((section) => sectionStats(section).progress === 100).length;
  const bestSections = [...state.data.sections]
    .map((section) => ({ section, stats: sectionStats(section) }))
    .sort((a, b) => b.stats.progress - a.stats.progress)
    .slice(0, 6);
  return `
    ${pageHeader("Estadisticas", "Lectura rapida del avance, costos y secciones mas fuertes del album.")}
    <section class="analytics-hero">
      <div class="panel analytics-main">
        <div class="progress-ring" style="--progress:${stats.progress}%">
          <div class="progress-ring-inner">
            <div>
              <strong>${stats.progress}%</strong>
              <span>${stats.owned} / ${stats.total}</span>
            </div>
          </div>
        </div>
        <div>
          <h3 class="panel-title">Resumen del album</h3>
          <p class="page-copy">Has registrado ${registered} laminas en total, con ${stats.duplicates} repetidas y ${stats.missing} faltantes.</p>
          <div class="metric-pills">
            <span>${completedSections} secciones completas</span>
            <span>${stats.priority} prioritarias</span>
            <span>${formatCurrency(expenseStats.totalSpent)} gastados</span>
          </div>
        </div>
      </div>
      <div class="grid stats-grid">
        ${statCard("Costo total", formatCurrency(expenseStats.totalSpent), `${expenseStats.purchases} compras`)}
        ${statCard("Este mes", formatCurrency(expenseStats.monthSpent), "Gasto mensual")}
        ${statCard("Costo por unica", formatCurrency(expenseStats.costPerUnique), "Segun obtenidas")}
        ${statCard("Costo por registrada", formatCurrency(expenseStats.costPerRegistered), "Incluye repetidas")}
      </div>
    </section>
    <section class="panel" style="margin-top:16px">
      <div class="section-title-row">
        <h3 class="panel-title">Secciones destacadas</h3>
        <button class="button secondary tiny" data-nav="album" type="button">Ver album</button>
      </div>
      <div class="insight-grid">
        ${bestSections.map(({ section, stats: itemStats }) => renderSectionInsight(section, itemStats)).join("")}
      </div>
    </section>
  `;
}

function renderSectionInsight(section, stats) {
  const visual = getTeamVisual({ teamCode: section.code }, section);
  return `
    <article class="insight-card" style="${flagStyle(visual)}">
      <span class="mini-flag ${flagLayout(section.code)}"><span class="flag-swatch" aria-hidden="true"></span></span>
      <div>
        <strong>${escapeHtml(section.name)}</strong>
        <small>${stats.owned}/${stats.total} fichas</small>
      </div>
      <span>${stats.progress}%</span>
      <div class="progress-track"><div class="progress-fill" style="width:${stats.progress}%;--section-color:${section.color}"></div></div>
    </article>
  `;
}

function renderExpenses() {
  const expenses = state.data.expenses || [];
  const expenseStats = getExpenseStats();
  return `
    ${pageHeader("Gastos", "Registra compras de album, sobres, cajas o laminas individuales para saber cuanto llevas invertido.")}
    <section class="grid stats-grid">
      ${statCard("Total gastado", formatCurrency(expenseStats.totalSpent), `${expenseStats.purchases} compras`)}
      ${statCard("Este mes", formatCurrency(expenseStats.monthSpent), "Control mensual")}
      ${statCard("Items comprados", expenseStats.totalItems, "Album, sobres o laminas")}
      ${statCard("Costo por unica", formatCurrency(expenseStats.costPerUnique), "Promedio real")}
    </section>
    <section class="expenses-layout">
      <form class="panel expense-form" id="expenseForm">
        <h3 class="panel-title">Nuevo gasto</h3>
        <div class="form-grid">
          <label>
            <span>Tipo</span>
            <select class="select" id="expenseType">
              ${expenseTypes.map((type) => `<option value="${type.id}" ${state.expenseForm.type === type.id ? "selected" : ""}>${type.label}</option>`).join("")}
            </select>
          </label>
          <label>
            <span>Cantidad</span>
            <input class="field" id="expenseQuantity" type="number" min="1" step="1" value="${escapeHtml(state.expenseForm.quantity)}" />
          </label>
          <label>
            <span>Costo total</span>
            <input class="field" id="expenseAmount" inputmode="numeric" placeholder="Ej: 25000" value="${escapeHtml(state.expenseForm.amount)}" />
          </label>
          <label>
            <span>Lugar</span>
            <input class="field" id="expensePlace" placeholder="Tienda, supermercado..." value="${escapeHtml(state.expenseForm.place)}" />
          </label>
          <label class="wide">
            <span>Nota</span>
            <input class="field" id="expenseNote" placeholder="Opcional" value="${escapeHtml(state.expenseForm.note)}" />
          </label>
        </div>
        <button class="button" type="submit">Guardar gasto</button>
      </form>
      <section class="panel expense-list">
        <h3 class="panel-title">Historial de gastos</h3>
        ${
          expenses.length
            ? expenses.map(renderExpenseRow).join("")
            : `<div class="empty">Todavia no hay gastos. Registra tu primera compra para activar las estadisticas de costo.</div>`
        }
      </section>
    </section>
  `;
}

function renderExpenseRow(expense) {
  return `
    <article class="expense-row">
      <div>
        <strong>${escapeHtml(getExpenseTypeLabel(expense.type))}</strong>
        <p class="sticker-meta">${new Date(expense.date).toLocaleDateString()}${expense.place ? ` - ${escapeHtml(expense.place)}` : ""}${expense.note ? ` - ${escapeHtml(expense.note)}` : ""}</p>
      </div>
      <span>${expense.quantity}x</span>
      <strong>${formatCurrency(expense.amount)}</strong>
      <button class="button tiny secondary" data-delete-expense="${expense.id}" type="button">Eliminar</button>
    </article>
  `;
}

function renderTrades() {
  const trades = state.data.trades || [];
  const contacts = state.data.contacts || [];
  const analysis = analyzeTrade();
  return `
    ${pageHeader("Intercambios", "Crea propuestas, compara que ganas y controla el estado de cada cambio.")}
    <section class="grid stats-grid">
      ${statCard("Propuestas", trades.length, "Historial guardado")}
      ${statCard("Contactos", contacts.length, "Personas registradas")}
      ${statCard("Nuevas por ganar", analysis.newToReceive.length, "En la propuesta actual")}
      ${statCard("Riesgo al dar", analysis.riskyGive.length, "No son repetidas")}
    </section>
    <section class="trades-layout">
      <form class="panel trade-form" id="tradeForm">
        <h3 class="panel-title">Nuevo intercambio</h3>
        <div class="form-grid">
          <label>
            <span>Contacto</span>
            <input class="field" id="tradeContact" list="contactList" placeholder="Nombre de la persona" value="${escapeHtml(state.tradeForm.contact)}" />
            <datalist id="contactList">
              ${contacts.map((contact) => `<option value="${escapeHtml(contact)}"></option>`).join("")}
            </datalist>
          </label>
          <label>
            <span>Estado</span>
            <select class="select" id="tradeStatus">
              ${tradeStatuses.map((status) => `<option value="${status.id}" ${state.tradeForm.status === status.id ? "selected" : ""}>${status.label}</option>`).join("")}
            </select>
          </label>
          <label class="wide">
            <span>Laminas que doy</span>
            <textarea class="textarea compact" id="tradeGive" placeholder="Ej: FWC 3, COL 20">${escapeHtml(state.tradeForm.giveText)}</textarea>
          </label>
          <label class="wide">
            <span>Laminas que recibo</span>
            <textarea class="textarea compact" id="tradeReceive" placeholder="Ej: ARG 12, BRA 7">${escapeHtml(state.tradeForm.receiveText)}</textarea>
          </label>
          <label class="wide">
            <span>Nota</span>
            <input class="field" id="tradeNote" placeholder="Lugar, hora o detalle opcional" value="${escapeHtml(state.tradeForm.note)}" />
          </label>
        </div>
        ${renderTradeAnalysis(analysis)}
        <button class="button" type="submit">Guardar intercambio</button>
      </form>
      <section class="panel trade-list">
        <h3 class="panel-title">Historial de intercambios</h3>
        ${
          trades.length
            ? trades.map(renderTradeCard).join("")
            : `<div class="empty">Aun no tienes intercambios. Crea una propuesta para guardar contacto, laminas y beneficio.</div>`
        }
      </section>
    </section>
  `;
}

function renderTradeAnalysis(analysis) {
  const warnings = [...analysis.give.invalid, ...analysis.receive.invalid];
  return `
    <div class="trade-analysis">
      <div class="side-stat good"><span>Nuevas que gano</span><strong>${analysis.newToReceive.length}</strong></div>
      <div class="side-stat info"><span>Repetidas que entrego</span><strong>${analysis.duplicateGive.length}</strong></div>
      <div class="side-stat warn"><span>Duplicadas que recibiria</span><strong>${analysis.duplicatedReceived.length}</strong></div>
      <div class="side-stat warn"><span>No repetidas que daria</span><strong>${analysis.riskyGive.length}</strong></div>
      ${warnings.length ? `<p class="form-warning">Codigos no encontrados: ${warnings.map(escapeHtml).join(", ")}</p>` : ""}
    </div>
  `;
}

function renderTradeCard(trade) {
  const status = getTradeStatus(trade.status);
  return `
    <article class="trade-card">
      <div class="trade-card-head">
        <div>
          <strong>${escapeHtml(trade.contact)}</strong>
          <p class="sticker-meta">${new Date(trade.createdAt).toLocaleDateString()}${trade.note ? ` - ${escapeHtml(trade.note)}` : ""}</p>
        </div>
        <span class="chip ${status.tone}">${status.label}</span>
      </div>
      <div class="trade-columns">
        <div>
          <small>Yo doy</small>
          <p>${trade.giveCodes.length ? trade.giveCodes.map(escapeHtml).join(", ") : "Sin definir"}</p>
        </div>
        <div>
          <small>Yo recibo</small>
          <p>${trade.receiveCodes.length ? trade.receiveCodes.map(escapeHtml).join(", ") : "Sin definir"}</p>
        </div>
      </div>
      <div class="metric-pills">
        <span>${trade.newToReceive.length} nuevas</span>
        <span>${trade.riskyGive.length} con riesgo</span>
        <span>${trade.duplicatedReceived.length} duplicadas</span>
      </div>
      <div class="trade-actions">
        <select class="select tiny-select" data-trade-status="${trade.id}">
          ${tradeStatuses.map((item) => `<option value="${item.id}" ${trade.status === item.id ? "selected" : ""}>${item.label}</option>`).join("")}
        </select>
        <button class="button tiny secondary" data-copy-trade="${trade.id}" type="button">Copiar mensaje</button>
        <button class="button tiny secondary" data-delete-trade="${trade.id}" type="button">Eliminar</button>
      </div>
    </article>
  `;
}

function renderShare() {
  const stats = getStats();
  const compare = compareFriendList();
  const publicText = buildPublicSummaryText();
  return `
    ${pageHeader("Compartir", "Genera resumen publico, comparte progreso y compara listas con amigos.")}
    <section class="grid stats-grid">
      ${statCard("Avance", `${stats.progress}%`, `${stats.owned}/${stats.total} fichas`)}
      ${statCard("Faltantes", stats.missing, "Lista para compartir")}
      ${statCard("Repetidas", stats.duplicates, "Para cambios")}
      ${statCard("Coincidencias", compare.canAsk.length + compare.canGive.length, "Con la lista pegada")}
    </section>
    <section class="share-layout">
      <section class="panel share-card">
        <h3 class="panel-title">Vista publica copiable</h3>
        <p class="page-copy">Resumen de solo lectura para enviar por WhatsApp o pegar en un grupo.</p>
        <textarea class="textarea share-text" readonly>${escapeHtml(publicText)}</textarea>
        <div class="toolbar">
          <button class="button" data-copy-public type="button">Copiar resumen</button>
          <button class="button secondary" data-whatsapp-public type="button">Enviar por WhatsApp</button>
        </div>
      </section>
      <section class="panel compare-panel">
        <h3 class="panel-title">Comparar con amigo</h3>
        <p class="page-copy">Pega una lista de codigos. La app detecta que le puedes dar y que te sirve pedir.</p>
        <textarea class="textarea" id="compareText" placeholder="Ej: COL 20, ARG 12, FWC 3">${escapeHtml(state.compareText)}</textarea>
        ${renderCompareResult(compare)}
      </section>
    </section>
  `;
}

function renderCompareResult(compare) {
  return `
    <div class="compare-results">
      <article>
        <strong>Te puede servir pedir</strong>
        <span>${compare.canAsk.length}</span>
        <p>${compare.canAsk.length ? compare.canAsk.slice(0, 24).map((sticker) => sticker.code).join(", ") : "Sin coincidencias todavia."}</p>
      </article>
      <article>
        <strong>Le puedes ofrecer</strong>
        <span>${compare.canGive.length}</span>
        <p>${compare.canGive.length ? compare.canGive.slice(0, 24).map((sticker) => sticker.code).join(", ") : "No hay repetidas tuyas en esa lista."}</p>
      </article>
      <article>
        <strong>No reconocidas</strong>
        <span>${compare.unknown.length}</span>
        <p>${compare.unknown.length ? compare.unknown.join(", ") : "Todo lo pegado se pudo leer."}</p>
      </article>
    </div>
  `;
}

function renderSettings() {
  const stats = getStats();
  const preferences = getPreferences();
  const profile = normalizeProfile(state.data.profile);
  const goals = normalizeGoals(state.data.goals);
  const cloudAccount = normalizeCloudAccount(state.data.cloudAccount);
  const insights = getSmartInsights();
  return `
    ${pageHeader(t("settings"), "Respalda datos, ajusta visualizacion, idioma y preferencias generales.")}
    <section class="grid stats-grid">
      ${statCard("Total checklist", stats.total, "Catalogo real")}
      ${statCard("Guardado", "Local", "Este navegador")}
      ${statCard("PWA", "Lista", "Instalable")}
      ${statCard("Version", "MVP", "Primera base")}
    </section>
    <section class="panel settings-panel" style="margin-top:16px">
      <h3 class="panel-title">Preferencias</h3>
      <div class="settings-grid">
        <label>
          <span>${t("displayMode")}</span>
          <select class="select" id="cardViewPreference">
            <option value="detailed" ${preferences.cardView === "detailed" ? "selected" : ""}>${t("detailedView")}</option>
            <option value="simple" ${preferences.cardView === "simple" ? "selected" : ""}>${t("simpleView")}</option>
          </select>
        </label>
        <label>
          <span>${t("language")}</span>
          <select class="select" id="languagePreference">
            <option value="es" ${preferences.language === "es" ? "selected" : ""}>${t("spanish")}</option>
            <option value="en" ${preferences.language === "en" ? "selected" : ""}>${t("english")}</option>
          </select>
        </label>
      </div>
    </section>
    <section class="panel" style="margin-top:16px">
      <div class="section-title-row">
        <div>
          <h3 class="panel-title">Fase 8: metas y alertas</h3>
          <p class="page-copy">Define objetivos y deja que el Inicio te sugiera el siguiente paso.</p>
        </div>
      </div>
      <div class="settings-grid sync-grid">
        <label>
          <span>Meta de avance (%)</span>
          <input class="input" id="goalProgress" type="number" min="1" max="100" value="${escapeHtml(goals.targetProgress)}" />
        </label>
        <label>
          <span>Nuevas por semana</span>
          <input class="input" id="goalWeekly" type="number" min="1" value="${escapeHtml(goals.weeklyNew)}" />
        </label>
        <label>
          <span>Seleccion favorita</span>
          <select class="select" id="goalSection">
            <option value="">Sin seleccion fija</option>
            ${state.data.sections.map((section) => `<option value="${section.id}" ${goals.favoriteSectionId === section.id ? "selected" : ""}>${escapeHtml(section.name)}</option>`).join("")}
          </select>
        </label>
        <label>
          <span>Presupuesto maximo</span>
          <input class="input" id="goalBudget" type="number" min="0" value="${escapeHtml(goals.maxBudget)}" placeholder="Ej. 350000" />
        </label>
      </div>
      <div class="alert-grid settings-alerts">
        ${
          insights.alerts.length
            ? insights.alerts.map((alert) => `<article class="smart-alert ${alert.tone}"><strong>${escapeHtml(alert.title)}</strong><span>${escapeHtml(alert.copy)}</span></article>`).join("")
            : `<article class="smart-alert good"><strong>Sin alertas</strong><span>Tu album va estable con las metas actuales.</span></article>`
        }
      </div>
      <div class="toolbar" style="margin-top:14px">
        <button class="button" id="saveGoals" type="button">Guardar metas</button>
      </div>
    </section>
    <section class="panel" style="margin-top:16px">
      <div class="section-title-row">
        <div>
          <h3 class="panel-title">Fase 9: escaner asistido</h3>
          <p class="page-copy">Foto/camara con limpieza de lectura, revision obligatoria y resumen de confianza.</p>
        </div>
        <div class="toolbar">
          <button class="button secondary" data-nav="register" type="button">${renderIcon("camera")} Abrir registro</button>
        </div>
      </div>
      <div class="settings-grid phase-grid">
        <article class="phase-card">
          <strong>Camara/foto</strong>
          <span>Activa</span>
          <p>Permite capturar imagen, detectar codigos de barra si el navegador lo soporta y confirmar manualmente.</p>
        </article>
        <article class="phase-card">
          <strong>Limpieza OCR</strong>
          <span>Activa</span>
          <p>Normaliza separadores, espacios y lecturas comunes antes de analizar codigos.</p>
        </article>
        <article class="phase-card">
          <strong>Control de confianza</strong>
          <span>Activa</span>
          <p>Muestra porcentaje, nuevas, ya tenidas y no reconocidas antes de guardar.</p>
        </article>
        <article class="phase-card">
          <strong>Revision segura</strong>
          <span>Obligatoria</span>
          <p>No guarda nada hasta que confirmes la vista previa.</p>
        </article>
      </div>
    </section>
    <section class="panel" style="margin-top:16px">
      <h3 class="panel-title">Datos</h3>
      <div class="toolbar">
        <button class="button" id="exportBackup" type="button">Exportar backup</button>
        <label class="button secondary" for="importBackup">Importar backup</label>
        <input id="importBackup" type="file" accept="application/json" hidden />
        <button class="button secondary" id="exportCollectionCsv" type="button">CSV coleccion</button>
        <label class="button secondary" for="importCollectionCsv">Importar CSV</label>
        <input id="importCollectionCsv" type="file" accept=".csv,text/csv" hidden />
        <button class="button warn" id="resetDemo" type="button">Reiniciar demo</button>
      </div>
    </section>
    <section class="panel" style="margin-top:16px">
      <div class="section-title-row">
        <div>
          <h3 class="panel-title">Fase 5: portabilidad</h3>
          <p class="page-copy">Exporta datos para Excel o Google Sheets y conserva un historial amplio de actividad.</p>
        </div>
        <div class="toolbar">
          <button class="button secondary" id="exportExpensesCsv" type="button">CSV gastos</button>
          <button class="button secondary" id="exportTradesCsv" type="button">CSV intercambios</button>
          <button class="button secondary" id="exportActivityCsv" type="button">CSV historial</button>
        </div>
      </div>
      <div class="settings-grid phase-grid">
        <article class="phase-card">
          <strong>Coleccion</strong>
          <span>${stats.owned}/${stats.total} fichas unicas</span>
          <p>Archivo con codigo, seccion, cantidad, pegada, prioridad y reservadas.</p>
        </article>
        <article class="phase-card">
          <strong>Gastos</strong>
          <span>${state.data.expenses?.length || 0} registros</span>
          <p>Compras, sobres, cajas, laminas sueltas y notas de compra.</p>
        </article>
        <article class="phase-card">
          <strong>Intercambios</strong>
          <span>${state.data.trades?.length || 0} movimientos</span>
          <p>Contactos, entregas, recibidos, estado y observaciones.</p>
        </article>
        <article class="phase-card">
          <strong>Historial</strong>
          <span>${state.data.activity?.length || 0} eventos</span>
          <p>Ultimas acciones guardadas localmente para auditoria personal.</p>
        </article>
      </div>
    </section>
    <section class="panel" style="margin-top:16px">
      <div class="section-title-row">
        <div>
          <h3 class="panel-title">Fase 6: app instalable</h3>
          <p class="page-copy">Base PWA lista para instalar en moviles compatibles y abrir la app aun con conexion inestable.</p>
        </div>
      </div>
      <div class="settings-grid phase-grid">
        <article class="phase-card">
          <strong>Instalacion movil</strong>
          <span>Activa</span>
          <p>El boton Descargar de la portada usa el instalador del navegador cuando esta disponible.</p>
        </article>
        <article class="phase-card">
          <strong>Modo offline</strong>
          <span>Base cacheada</span>
          <p>La interfaz, logos, estilos y catalogo quedan preparados para carga local tras una primera visita.</p>
        </article>
        <article class="phase-card">
          <strong>Datos locales</strong>
          <span>Protegidos</span>
          <p>La coleccion sigue guardada en este navegador, separada del cache de instalacion.</p>
        </article>
        <article class="phase-card">
          <strong>APK futura</strong>
          <span>Preparada</span>
          <p>Esta base PWA facilita empaquetar despues con Capacitor o TWA para Android.</p>
        </article>
      </div>
    </section>
    <section class="panel" style="margin-top:16px">
      <div class="section-title-row">
        <div>
          <h3 class="panel-title">Fase 7: perfil y sincronizacion</h3>
          <p class="page-copy">Prepara tu coleccion para moverla entre celular y PC, y para conectar nube despues.</p>
        </div>
        <div class="toolbar">
          <button class="button secondary" id="exportSyncPackage" type="button">${renderIcon("cloud")} Exportar paquete</button>
          <label class="button secondary" for="importSyncPackage">${renderIcon("download")} Importar paquete</label>
          <input id="importSyncPackage" type="file" accept="application/json" hidden />
        </div>
      </div>
      <div class="settings-grid sync-grid">
        <label>
          <span>Nombre</span>
          <input class="input" id="collectorName" value="${escapeHtml(profile.collectorName)}" placeholder="Ej. Juan David" />
        </label>
        <label>
          <span>Alias</span>
          <input class="input" id="collectorAlias" value="${escapeHtml(profile.alias)}" placeholder="Ej. juan.panini" />
        </label>
        <label>
          <span>Ciudad</span>
          <input class="input" id="collectorCity" value="${escapeHtml(profile.city)}" placeholder="Ej. Bogota" />
        </label>
        <label>
          <span>Dispositivo</span>
          <input class="input" id="deviceName" value="${escapeHtml(profile.deviceName)}" placeholder="Ej. PC casa / Celular" />
        </label>
      </div>
      <div class="sync-summary">
        <article class="phase-card">
          <strong>${renderIcon("user")} Coleccionista</strong>
          <span>${escapeHtml(profile.alias || profile.collectorName || "Sin perfil")}</span>
          <p>Este perfil viaja dentro del paquete de sincronizacion.</p>
        </article>
        <article class="phase-card">
          <strong>${renderIcon("cloud")} ID sincronizacion</strong>
          <span>${escapeHtml(profile.syncId)}</span>
          <p>Identificador local para enlazar esta coleccion con una futura cuenta en nube.</p>
        </article>
      </div>
      <div class="toolbar" style="margin-top:14px">
        <button class="button" id="saveProfile" type="button">Guardar perfil</button>
      </div>
    </section>
    <section class="panel" style="margin-top:16px">
      <div class="section-title-row">
        <div>
          <h3 class="panel-title">Fase 10: API propia y nube</h3>
          <p class="page-copy">Conecta esta app con nuestro backend Node para login y sincronizacion PC/celular.</p>
        </div>
      </div>
      <div class="settings-grid sync-grid">
        <label>
          <span>URL API propia</span>
          <input class="input" id="apiBaseUrl" value="${escapeHtml(cloudAccount.apiBaseUrl)}" placeholder="http://127.0.0.1:8787" />
        </label>
        <label>
          <span>Email de cuenta</span>
          <input class="input" id="cloudEmail" type="email" value="${escapeHtml(cloudAccount.email)}" placeholder="correo@ejemplo.com" />
        </label>
        <label>
          <span>Clave</span>
          <input class="input" id="cloudPassword" type="password" placeholder="Minimo 6 caracteres" />
        </label>
        <label>
          <span>Proveedor</span>
          <select class="select" id="cloudProvider">
            <option value="api-propia" ${cloudAccount.provider === "api-propia" ? "selected" : ""}>API local</option>
            <option value="cloudflare" ${cloudAccount.provider === "cloudflare" ? "selected" : ""}>Cloudflare gratis</option>
            <option value="supabase" ${cloudAccount.provider === "supabase" ? "selected" : ""}>Supabase alternativa</option>
            <option value="firebase" ${cloudAccount.provider === "firebase" ? "selected" : ""}>Firebase futuro</option>
          </select>
        </label>
      </div>
      <div class="sync-summary">
        <article class="phase-card">
          <strong>${renderIcon("cloud")} Estado nube</strong>
          <span>${escapeHtml(cloudAccount.status)}</span>
          <p>${cloudAccount.userName ? `Sesion: ${escapeHtml(cloudAccount.userName)}` : "Sin sesion activa. Tus datos siguen guardados localmente."}</p>
        </article>
        <article class="phase-card">
          <strong>${renderIcon("check-square")} Ultimo punto</strong>
          <span>${cloudAccount.lastSyncAt ? new Date(cloudAccount.lastSyncAt).toLocaleString() : "Sin marcar"}</span>
          <p>Se actualiza al subir o bajar coleccion desde la API propia.</p>
        </article>
      </div>
      <div class="toolbar" style="margin-top:14px">
        <button class="button" id="saveCloudAccount" type="button">Guardar cuenta</button>
        <button class="button secondary" id="checkApiConnection" type="button">Probar API</button>
        <button class="button secondary" id="registerCloudUser" type="button">Crear cuenta</button>
        <button class="button secondary" id="loginCloudUser" type="button">Iniciar sesion</button>
        <button class="button secondary" id="uploadCloudData" type="button">Subir coleccion</button>
        <button class="button secondary" id="downloadCloudData" type="button">Bajar coleccion</button>
        <button class="button secondary" id="markCloudSync" type="button">Marcar punto sync</button>
      </div>
    </section>
    <section class="panel" style="margin-top:16px">
      <h3 class="panel-title">Historial reciente</h3>
      ${renderActivity(30)}
    </section>
    <section class="panel" style="margin-top:16px">
      <h3 class="panel-title">Siguiente mejora sugerida</h3>
      <p class="page-copy">Catalogo cargado con 980 cromos. Datos comerciales verificados contra Panini oficial; listado ficha por ficha importado desde Scanini como referencia independiente.</p>
    </section>
  `;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function bindEvents() {
  document.querySelectorAll("[data-nav]").forEach((button) => {
    button.addEventListener("click", () => navigate(button.dataset.nav));
  });

  document.querySelectorAll("[data-inc]").forEach((button) => {
    button.addEventListener("click", () => updateQuantity(button.dataset.inc, 1));
  });

  document.querySelectorAll("[data-dec]").forEach((button) => {
    button.addEventListener("click", () => updateQuantity(button.dataset.dec, -1));
  });

  document.querySelectorAll("[data-priority]").forEach((button) => {
    button.addEventListener("click", () => togglePriority(button.dataset.priority));
  });

  document.querySelectorAll("[data-pasted]").forEach((button) => {
    button.addEventListener("click", () => togglePasted(button.dataset.pasted));
  });

  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", () => copyText(buildShareText(button.dataset.copy, ["missing", "duplicates"].includes(state.view))));
  });

  document.querySelectorAll("[data-whatsapp]").forEach((button) => {
    button.addEventListener("click", () => openWhatsApp(buildShareText(button.dataset.whatsapp, ["missing", "duplicates"].includes(state.view))));
  });

  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      state.query = event.target.value;
      state.openFilter = null;
      render();
      const nextInput = document.getElementById("searchInput");
      nextInput?.focus();
      nextInput?.setSelectionRange(state.query.length, state.query.length);
    });
  }

  document.querySelectorAll("[data-dropdown-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      state.openFilter = state.openFilter === button.dataset.dropdownToggle ? null : button.dataset.dropdownToggle;
      render();
    });
  });

  document.querySelectorAll("[data-filter-section]").forEach((button) => {
    button.addEventListener("click", () => {
      state.sectionFilter = button.dataset.filterSection;
      state.openFilter = null;
      render();
    });
  });

  document.querySelectorAll("[data-filter-status]").forEach((button) => {
    button.addEventListener("click", () => {
      state.statusFilter = button.dataset.filterStatus;
      state.openFilter = null;
      render();
    });
  });

  document.querySelectorAll("[data-clear-filters]").forEach((button) => {
    button.addEventListener("click", () => {
      state.query = "";
      state.sectionFilter = "all";
      state.statusFilter = "all";
      state.openFilter = null;
      render();
    });
  });

  const toggleAlbumView = document.getElementById("toggleAlbumView");
  if (toggleAlbumView) {
    toggleAlbumView.addEventListener("click", () => {
      state.albumView = state.albumView === "grid" ? "list" : "grid";
      state.openFilter = null;
      render();
    });
  }

  const registerText = document.getElementById("registerText");
  if (registerText) {
    registerText.addEventListener("input", (event) => {
      state.registerText = event.target.value;
      state.registerPreview = null;
    });
  }

  const analyzeRegister = document.getElementById("analyzeRegister");
  if (analyzeRegister) {
    analyzeRegister.addEventListener("click", () => {
      state.registerPreview = analyzeRegisterText(state.registerText);
      render();
    });
  }

  const saveRegister = document.getElementById("saveRegister");
  if (saveRegister) saveRegister.addEventListener("click", saveRegisterBatch);

  const undoBatch = document.getElementById("undoBatch");
  if (undoBatch) undoBatch.addEventListener("click", undoLastBatch);

  document.querySelectorAll("[data-open-team-register]").forEach((button) => {
    button.addEventListener("click", openTeamRegister);
  });

  document.querySelectorAll("[data-open-camera-import]").forEach((button) => {
    button.addEventListener("click", () => openImportModal("camera"));
  });

  document.querySelectorAll("[data-open-photo-import]").forEach((button) => {
    button.addEventListener("click", () => openImportModal("photo"));
  });

  document.querySelectorAll("[data-close-modal]").forEach((button) => {
    button.addEventListener("click", () => {
      stopCameraPreview();
      closeModal();
    });
  });

  const teamRegisterSection = document.getElementById("teamRegisterSection");
  if (teamRegisterSection) {
    teamRegisterSection.addEventListener("change", (event) => changeTeamRegisterSection(event.target.value));
  }

  document.querySelectorAll("[data-team-sticker]").forEach((input) => {
    input.addEventListener("change", () => toggleTeamSticker(input.dataset.teamSticker));
  });

  document.querySelectorAll("[data-select-team-all]").forEach((button) => {
    button.addEventListener("click", () => setAllTeamStickers(true));
  });

  document.querySelectorAll("[data-clear-team-all]").forEach((button) => {
    button.addEventListener("click", () => setAllTeamStickers(false));
  });

  document.querySelectorAll("[data-confirm-team-register]").forEach((button) => {
    button.addEventListener("click", confirmTeamRegister);
  });

  const photoImport = document.getElementById("photoImport");
  if (photoImport) {
    photoImport.addEventListener("change", (event) => setImportImage(event.target.files?.[0]));
  }

  const importCodesText = document.getElementById("importCodesText");
  if (importCodesText) {
    importCodesText.addEventListener("input", (event) => updateImportText(event.target.value));
  }

  document.querySelectorAll("[data-start-camera]").forEach((button) => {
    button.addEventListener("click", startCameraPreview);
  });

  document.querySelectorAll("[data-capture-camera]").forEach((button) => {
    button.addEventListener("click", captureCameraFrame);
  });

  document.querySelectorAll("[data-clean-import]").forEach((button) => {
    button.addEventListener("click", cleanImportPreviewText);
  });

  document.querySelectorAll("[data-remove-import]").forEach((button) => {
    button.addEventListener("click", () => removeImportSticker(button.dataset.removeImport));
  });

  document.querySelectorAll("[data-confirm-import]").forEach((button) => {
    button.addEventListener("click", confirmImportPreview);
  });

  const expenseForm = document.getElementById("expenseForm");
  if (expenseForm) {
    expenseForm.addEventListener("submit", (event) => {
      event.preventDefault();
      saveExpense();
    });
  }

  const expenseFields = {
    expenseType: "type",
    expenseQuantity: "quantity",
    expenseAmount: "amount",
    expensePlace: "place",
    expenseNote: "note"
  };
  Object.entries(expenseFields).forEach(([id, key]) => {
    const field = document.getElementById(id);
    if (!field) return;
    field.addEventListener("input", (event) => {
      state.expenseForm[key] = event.target.value;
    });
    field.addEventListener("change", (event) => {
      state.expenseForm[key] = event.target.value;
    });
  });

  document.querySelectorAll("[data-delete-expense]").forEach((button) => {
    button.addEventListener("click", () => deleteExpense(button.dataset.deleteExpense));
  });

  const tradeForm = document.getElementById("tradeForm");
  if (tradeForm) {
    tradeForm.addEventListener("submit", (event) => {
      event.preventDefault();
      saveTrade();
    });
  }

  const tradeFields = {
    tradeContact: "contact",
    tradeGive: "giveText",
    tradeReceive: "receiveText",
    tradeStatus: "status",
    tradeNote: "note"
  };
  Object.entries(tradeFields).forEach(([id, key]) => {
    const field = document.getElementById(id);
    if (!field) return;
    field.addEventListener("input", (event) => {
      state.tradeForm[key] = event.target.value;
    });
    field.addEventListener("change", (event) => {
      state.tradeForm[key] = event.target.value;
      render();
    });
  });

  document.querySelectorAll("[data-trade-status]").forEach((select) => {
    select.addEventListener("change", (event) => updateTradeStatus(select.dataset.tradeStatus, event.target.value));
  });

  document.querySelectorAll("[data-delete-trade]").forEach((button) => {
    button.addEventListener("click", () => deleteTrade(button.dataset.deleteTrade));
  });

  document.querySelectorAll("[data-copy-trade]").forEach((button) => {
    button.addEventListener("click", () => copyTradeMessage(button.dataset.copyTrade));
  });

  const compareText = document.getElementById("compareText");
  if (compareText) {
    compareText.addEventListener("input", (event) => {
      state.compareText = event.target.value;
      render();
      const nextInput = document.getElementById("compareText");
      nextInput?.focus();
      nextInput?.setSelectionRange(state.compareText.length, state.compareText.length);
    });
  }

  document.querySelectorAll("[data-copy-public]").forEach((button) => {
    button.addEventListener("click", () => copyText(buildPublicSummaryText()));
  });

  document.querySelectorAll("[data-whatsapp-public]").forEach((button) => {
    button.addEventListener("click", () => openWhatsApp(buildPublicSummaryText()));
  });

  const exportButton = document.getElementById("exportBackup");
  if (exportButton) exportButton.addEventListener("click", exportBackup);

  const importInput = document.getElementById("importBackup");
  if (importInput) {
    importInput.addEventListener("change", (event) => importBackup(event.target.files?.[0]));
  }

  const exportCollectionButton = document.getElementById("exportCollectionCsv");
  if (exportCollectionButton) exportCollectionButton.addEventListener("click", exportCollectionCsv);

  const exportExpensesButton = document.getElementById("exportExpensesCsv");
  if (exportExpensesButton) exportExpensesButton.addEventListener("click", exportExpensesCsv);

  const exportTradesButton = document.getElementById("exportTradesCsv");
  if (exportTradesButton) exportTradesButton.addEventListener("click", exportTradesCsv);

  const exportActivityButton = document.getElementById("exportActivityCsv");
  if (exportActivityButton) exportActivityButton.addEventListener("click", exportActivityCsv);

  const importCollectionInput = document.getElementById("importCollectionCsv");
  if (importCollectionInput) {
    importCollectionInput.addEventListener("change", (event) => importCollectionCsv(event.target.files?.[0]));
  }

  const saveProfileButton = document.getElementById("saveProfile");
  if (saveProfileButton) saveProfileButton.addEventListener("click", saveProfileFromForm);

  const saveGoalsButton = document.getElementById("saveGoals");
  if (saveGoalsButton) saveGoalsButton.addEventListener("click", saveGoalsFromForm);

  const exportSyncButton = document.getElementById("exportSyncPackage");
  if (exportSyncButton) exportSyncButton.addEventListener("click", exportSyncPackage);

  const importSyncInput = document.getElementById("importSyncPackage");
  if (importSyncInput) {
    importSyncInput.addEventListener("change", (event) => importSyncPackage(event.target.files?.[0]));
  }

  const saveCloudButton = document.getElementById("saveCloudAccount");
  if (saveCloudButton) saveCloudButton.addEventListener("click", saveCloudAccountFromForm);

  const checkApiButton = document.getElementById("checkApiConnection");
  if (checkApiButton) checkApiButton.addEventListener("click", checkApiConnection);

  const registerCloudButton = document.getElementById("registerCloudUser");
  if (registerCloudButton) registerCloudButton.addEventListener("click", registerCloudUser);

  const loginCloudButton = document.getElementById("loginCloudUser");
  if (loginCloudButton) loginCloudButton.addEventListener("click", loginCloudUser);

  const uploadCloudButton = document.getElementById("uploadCloudData");
  if (uploadCloudButton) uploadCloudButton.addEventListener("click", uploadCloudData);

  const downloadCloudButton = document.getElementById("downloadCloudData");
  if (downloadCloudButton) downloadCloudButton.addEventListener("click", downloadCloudData);

  const markCloudSyncButton = document.getElementById("markCloudSync");
  if (markCloudSyncButton) markCloudSyncButton.addEventListener("click", markCloudSyncPoint);

  const resetButton = document.getElementById("resetDemo");
  if (resetButton) resetButton.addEventListener("click", resetDemo);

  const cardViewPreference = document.getElementById("cardViewPreference");
  if (cardViewPreference) {
    cardViewPreference.addEventListener("change", (event) => {
      setPreference("cardView", event.target.value);
      showToast("Preferencia guardada.");
      render();
    });
  }

  const languagePreference = document.getElementById("languagePreference");
  if (languagePreference) {
    languagePreference.addEventListener("change", (event) => {
      setPreference("language", event.target.value);
      showToast(event.target.value === "en" ? "Language saved." : "Idioma guardado.");
      render();
    });
  }
}

function bindLandingEvents() {
  const enterButton = document.getElementById("enterApp");
  if (enterButton) enterButton.addEventListener("click", enterApp);

  const downloadButton = document.getElementById("downloadApp");
  if (downloadButton) {
    downloadButton.addEventListener("click", installApp);
  }
}

function render() {
  if (!state.entered) {
    renderLanding();
    bindLandingEvents();
    return;
  }

  const views = {
    home: renderHome,
    album: renderAlbum,
    register: renderRegister,
    missing: renderMissing,
    duplicates: renderDuplicates,
    trades: renderTrades,
    share: renderShare,
    stats: renderStats,
    expenses: renderExpenses,
    settings: renderSettings
  };
  renderShell((views[state.view] || renderHome)());
  bindEvents();
}

async function initialize() {
  registerServiceWorker();
  state.data = await loadInitialData();
  render();
}

initialize();
