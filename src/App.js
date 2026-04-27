import { useState, useEffect, useCallback } from "react";

const CONFIG = {
  SHEET_ID: "1N1VZ66P9OKwZUhDyr_fw3BDQR9lYmxiTnmtJlBw8ZlY",
  API_KEY: "AIzaSyBg5Tf9AY9OXUP4XAf8Aw7q1MQx_gStm50",
};

const TRIP = { tripName: "Europa 2026", startDate: "2026-05-18", endDate: "2026-06-05" };

const TYPE_META = {
  vuelo:       { bg: "#E8F4FD", accent: "#2563EB", dark: "#1E40AF", label: "Vuelo",       icon: "✈️" },
  hotel:       { bg: "#F0FDF4", accent: "#16A34A", dark: "#15803D", label: "Hotel",       icon: "🏨" },
  restaurante: { bg: "#FFF7ED", accent: "#EA580C", dark: "#C2410C", label: "Restaurante", icon: "🍽️" },
  museo:       { bg: "#FDF4FF", accent: "#9333EA", dark: "#7E22CE", label: "Museo",       icon: "🎨" },
  tren:        { bg: "#FFFBEB", accent: "#D97706", dark: "#B45309", label: "Tren",        icon: "🚄" },
  actividad:   { bg: "#FFF1F2", accent: "#E11D48", dark: "#BE123C", label: "Actividad",   icon: "🗺️" },
  evento:      { bg: "#F0F9FF", accent: "#0284C7", dark: "#0369A1", label: "Evento",      icon: "🎭" },
};

function getDaysArray(start, end) {
  const days = [];
  let cur = new Date(start + "T12:00:00");
  const last = new Date(end + "T12:00:00");
  while (cur <= last) {
    days.push(cur.toISOString().split("T")[0]);
    cur.setDate(cur.getDate() + 1);
  }
  return days;
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" });
}

function getTodayStr() { return new Date().toISOString().split("T")[0]; }

async function fetchSheet(name) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.SHEET_ID}/values/${encodeURIComponent(name)}?key=${CONFIG.API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(res.status);
  const json = await res.json();
  return json.values || [];
}

async function loadAllData() {
  const evRows = await fetchSheet("Eventos");
  const events = evRows.slice(1).filter(r => r[0]).map((row, i) => ({
    id: i + 1,
    date: (row[0] || "").trim(),
    type: (row[1] || "actividad").toLowerCase().trim(),
    title: row[2] || "",
    time: row[3] || "",
    confirmation: row[4] || "",
    notes: row[5] || "",
    link: row[6] || "",
    icon: row[7] || TYPE_META[(row[1] || "actividad").toLowerCase().trim()]?.icon || "📌",
  }));

  let important = [];
  try {
    const rows = await fetchSheet("Importante");
    important = rows.slice(1).filter(r => r[0]).map((row, i) => ({
      id: i + 1,
      category: (row[0] || "").toLowerCase().trim(),
      label: row[1] || "",
      value: row[2] || "",
      link: row[3] || "",
    }));
  } catch (_) {}

  return { ...TRIP, events, important };
}

export default function App() {
  const [data, setData] = useState({ ...TRIP, events: [], important: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeTab, setActiveTab] = useState("calendario");
  const [showImportant, setShowImportant] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [checked, setChecked] = useState({});
  const [lastSync, setLastSync] = useState(null);

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const d = await loadAllData();
      setData(d);
      setLastSync(new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }));
    } catch (e) {
      setError("Sin conexión. Verifica internet.");
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const days = getDaysArray(data.startDate, data.endDate);
  const today = getTodayStr();

  useEffect(() => {
    if (!selectedDate) setSelectedDate(days.includes(today) ? today : days[0]);
  }, [data]);

  const eventsForDay = (date) =>
    data.events.filter(e => e.date === date).sort((a, b) => a.time.localeCompare(b.time));

  const currentEvents = eventsForDay(selectedDate || days[0]);
  const tripDayNumber = selectedDate ? days.indexOf(selectedDate) + 1 : 1;
  const isToday = selectedDate === today;
  const sheetsUrl = `https://docs.google.com/spreadsheets/d/${CONFIG.SHEET_ID}`;

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#F7F6F2", minHeight: "100vh", maxWidth: 480, margin: "0 auto", boxShadow: "0 0 80px rgba(0,0,0,0.10)" }}>

      {/* HEADER */}
      <div style={{ background: "linear-gradient(160deg, #0f2027, #203a43, #2c5364)", padding: "36px 24px 22px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.07)" }} />
        <div style={{ position: "absolute", top: -12, right: -12, width: 80, height: 80, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.11)" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ margin: "0 0 4px", color: "rgba(255,255,255,0.4)", fontSize: 10, letterSpacing: 3, textTransform: "uppercase" }}>Mi Viaje</p>
            <h1 style={{ margin: 0, color: "#fff", fontSize: 28, fontWeight: 400, letterSpacing: -0.5 }}>{data.tripName}</h1>
            <p style={{ margin: "5px 0 0", color: "rgba(255,255,255,0.38)", fontSize: 12 }}>18 Mayo — 5 Junio · {days.length} días</p>
          </div>
          <button onClick={load} disabled={loading} style={{ background: "rgba(255,255,255,0.10)", border: "none", borderRadius: 12, padding: "8px 10px", cursor: "pointer", color: "#fff", fontSize: 20, opacity: loading ? 0.4 : 1 }}>
            {loading ? "⏳" : "🔄"}
          </button>
        </div>
        <div style={{ marginTop: 18, background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px 14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>Día {tripDayNumber} de {days.length}</span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>{Math.round((tripDayNumber / days.length) * 100)}%</span>
          </div>
          <div style={{ background: "rgba(255,255,255,0.13)", borderRadius: 4, height: 5 }}>
            <div style={{ background: "linear-gradient(90deg, #67e8f9, #818cf8)", borderRadius: 4, height: 5, width: `${(tripDayNumber / days.length) * 100}%`, transition: "width 0.6s" }} />
          </div>
        </div>
        <div style={{ marginTop: 8, minHeight: 16 }}>
          {loading && <p style={{ margin: 0, color: "rgba(255,255,255,0.4)", fontSize: 11 }}>🔄 Sincronizando…</p>}
          {error && <p style={{ margin: 0, color: "#FCA5A5", fontSize: 11 }}>⚠️ {error}</p>}
          {!loading && !error && lastSync && <p style={{ margin: 0, color: "rgba(255,255,255,0.3)", fontSize: 11 }}>✓ Actualizado {lastSync}</p>}
        </div>
      </div>

      {/* DATE STRIP */}
      <div style={{ background: "#fff", borderBottom: "1px solid #EEEEE8" }}>
        <div style={{ display: "flex", gap: 6, overflowX: "auto", padding: "14px 18px", scrollbarWidth: "none" }}>
          {days.map((day) => {
            const d = new Date(day + "T12:00:00");
            const isSel = day === selectedDate;
            const isTod = day === today;
            const count = eventsForDay(day).length;
            return (
              <button key={day} onClick={() => setSelectedDate(day)} style={{ flexShrink: 0, width: 50, padding: "9px 4px 8px", borderRadius: 13, border: "none", cursor: "pointer", position: "relative", background: isSel ? "#0f2027" : isTod ? "#EEF6FF" : "#F7F6F2", transition: "all 0.18s" }}>
                <p style={{ margin: 0, fontSize: 9, color: isSel ? "rgba(255,255,255,0.5)" : "#bbb", textTransform: "capitalize" }}>{d.toLocaleDateString("es-MX", { weekday: "short" })}</p>
                <p style={{ margin: "3px 0 2px", fontSize: 19, fontWeight: 700, color: isSel ? "#fff" : isTod ? "#2563EB" : "#1a1a2e" }}>{d.getDate()}</p>
                <p style={{ margin: 0, fontSize: 9, color: isSel ? "rgba(255,255,255,0.45)" : "#ccc", textTransform: "capitalize" }}>{d.toLocaleDateString("es-MX", { month: "short" })}</p>
                {count > 0 && (
                  <div style={{ position: "absolute", bottom: 5, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 2 }}>
                    {[...Array(Math.min(count, 3))].map((_, i) => <div key={i} style={{ width: 3, height: 3, borderRadius: "50%", background: isSel ? "#67e8f9" : "#0f2027" }} />)}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* DAY HEADER */}
      <div style={{ padding: "18px 22px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 20, color: "#1a1a2e", fontWeight: 400, textTransform: "capitalize" }}>{formatDate(selectedDate)}</h2>
          {isToday && <span style={{ fontSize: 11, color: "#16A34A", fontWeight: 700 }}>● HOY</span>}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <span style={{ background: "#EEEEE8", borderRadius: 20, padding: "4px 12px", fontSize: 12, color: "#666" }}>Día {tripDayNumber}</span>
          {currentEvents.length > 0 && <span style={{ background: "#0f2027", borderRadius: 20, padding: "4px 10px", fontSize: 12, color: "#fff" }}>{currentEvents.length} {currentEvents.length === 1 ? "evento" : "eventos"}</span>}
        </div>
      </div>

      {/* EVENTS */}
      <div style={{ padding: "0 18px 110px" }}>
        {loading && [1,2,3].map(i => (
          <div key={i} style={{ background: "#fff", borderRadius: 18, marginBottom: 10, padding: 16, border: "1.5px solid #EEEEE8" }}>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ width: 46, height: 46, borderRadius: 13, background: "#F0F0E8" }} />
              <div style={{ flex: 1 }}>
                <div style={{ width: "65%", height: 14, background: "#F0F0E8", borderRadius: 6, marginBottom: 8 }} />
                <div style={{ width: "40%", height: 10, background: "#F7F6F2", borderRadius: 6 }} />
              </div>
            </div>
          </div>
        ))}

        {!loading && currentEvents.length === 0 && (
          <div style={{ textAlign: "center", padding: "50px 0" }}>
            <div style={{ fontSize: 44, marginBottom: 12 }}>🌅</div>
            <p style={{ fontSize: 16, color: "#bbb", margin: 0 }}>{data.events.length === 0 ? "Sheet vacío" : "Día libre"}</p>
            <p style={{ fontSize: 13, color: "#ccc", margin: "6px 0 0" }}>{data.events.length === 0 ? "Agrega eventos en Google Sheets" : "Sin reservas este día"}</p>
          </div>
        )}

        {currentEvents.map((event) => {
          const meta = TYPE_META[event.type] || TYPE_META.actividad;
          const isExp = expandedEvent === event.id;
          const isDone = !!checked[event.id];
          return (
            <div key={event.id} onClick={() => setExpandedEvent(isExp ? null : event.id)} style={{ background: isDone ? "#F0FDF4" : "#fff", borderRadius: 18, marginBottom: 10, overflow: "hidden", border: `1.5px solid ${isExp ? meta.accent : isDone ? "#86EFAC" : "#EEEEE8"}`, cursor: "pointer", transition: "all 0.2s", boxShadow: isExp ? `0 6px 24px ${meta.accent}22` : "0 1px 5px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", padding: "13px 15px", gap: 12 }}>
                <div style={{ width: 46, height: 46, borderRadius: 13, background: meta.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0, opacity: isDone ? 0.5 : 1 }}>{event.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: isDone ? "#86EFAC" : "#1a1a2e", textDecoration: isDone ? "line-through" : "none", lineHeight: 1.3 }}>{event.title}</p>
                  <div style={{ display: "flex", gap: 8, marginTop: 5, flexWrap: "wrap", alignItems: "center" }}>
                    {event.time && <span style={{ fontSize: 12, color: "#999" }}>🕐 {event.time}</span>}
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", color: meta.accent, background: meta.bg, padding: "2px 9px", borderRadius: 20 }}>{meta.label}</span>
                  </div>
                </div>
                <span style={{ fontSize: 13, color: isExp ? meta.accent : "#ddd", display: "inline-block", transform: isExp ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
              </div>

              {isExp && (
                <div style={{ padding: "4px 15px 15px", borderTop: `1px solid ${meta.bg}` }}>
                  {event.confirmation && (
                    <div style={{ background: meta.bg, borderRadius: 11, padding: "10px 13px", marginTop: 10 }}>
                      <p style={{ margin: 0, fontSize: 10, color: meta.dark, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase" }}>N° Confirmación</p>
                      <p style={{ margin: "5px 0 0", fontSize: 17, color: meta.dark, fontFamily: "monospace", letterSpacing: 1.5 }}>{event.confirmation}</p>
                    </div>
                  )}
                  {event.notes && (
                    <div style={{ marginTop: 9, background: "#F7F6F2", borderRadius: 11, padding: "10px 13px" }}>
                      <p style={{ margin: 0, fontSize: 13, color: "#555", lineHeight: 1.55 }}>📝 {event.notes}</p>
                    </div>
                  )}
                  <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                    {event.link && event.link.startsWith("http") && (
                      <a href={event.link} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ flex: 1, background: meta.accent, color: "#fff", borderRadius: 12, padding: "12px 0", textAlign: "center", textDecoration: "none", fontSize: 13, fontWeight: 700, display: "block" }}>Abrir app / web →</a>
                    )}
                    <button onClick={e => { e.stopPropagation(); setChecked(prev => ({ ...prev, [event.id]: !prev[event.id] })); }} style={{ background: isDone ? "#16A34A" : "#F0F0E8", color: isDone ? "#fff" : "#888", border: "none", borderRadius: 12, padding: "12px 16px", fontSize: 18, cursor: "pointer", transition: "all 0.2s" }}>{isDone ? "✓" : "○"}</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* IMPORTANT MODAL */}
      {showImportant && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={() => { setShowImportant(false); setActiveTab("calendario"); }}>
          <div style={{ background: "#fff", borderRadius: "22px 22px 0 0", padding: "24px 22px 44px", width: "100%", maxWidth: 480, maxHeight: "82vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontSize: 21, color: "#1a1a2e" }}>🆘 Datos Importantes</h2>
              <button onClick={() => { setShowImportant(false); setActiveTab("calendario"); }} style={{ background: "#F0F0E8", border: "none", borderRadius: 10, width: 34, height: 34, fontSize: 16, cursor: "pointer" }}>✕</button>
            </div>
            {data.important.length === 0 ? (
              <div style={{ textAlign: "center", padding: "30px 0" }}>
                <p style={{ fontSize: 32, margin: "0 0 12px" }}>📋</p>
                <p style={{ color: "#bbb", fontSize: 14, margin: "0 0 8px" }}>Crea una hoja "Importante" en tu Sheet</p>
                <p style={{ color: "#ddd", fontSize: 12, margin: "0 0 20px", lineHeight: 1.6 }}>Columnas: Categoría · Etiqueta · Valor · Link<br/>Categorías: emergencia · internet · documento</p>
                <a href={sheetsUrl} target="_blank" rel="noreferrer" style={{ display: "inline-block", background: "#0f2027", color: "#fff", borderRadius: 14, padding: "12px 24px", textDecoration: "none", fontSize: 14, fontWeight: 700 }}>Abrir Google Sheets →</a>
              </div>
            ) : (
              ["emergencia", "internet", "documento"].map(key => {
                const items = data.important.filter(i => i.category === key);
                if (!items.length) return null;
                const labels = { emergencia: "🚨 Emergencias", internet: "📶 Internet & WiFi", documento: "📄 Documentos" };
                const bgs = { emergencia: "#FFF1F2", internet: "#F0F9FF", documento: "#F7F6F2" };
                return (
                  <div key={key} style={{ marginBottom: 22 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#aaa", margin: "0 0 10px" }}>{labels[key]}</p>
                    {items.map(item => (
                      <div key={item.id} style={{ background: bgs[key], borderRadius: 13, padding: "12px 14px", marginBottom: 8 }}>
                        <p style={{ margin: 0, fontSize: 11, color: "#aaa" }}>{item.label}</p>
                        <p style={{ margin: "4px 0 0", fontSize: 15, color: "#1a1a2e", fontWeight: 500 }}>{item.value}</p>
                        {item.link && <a href={item.link} target="_blank" rel="noreferrer" style={{ display: "inline-block", marginTop: 6, fontSize: 12, color: "#2563EB", textDecoration: "none", fontWeight: 600 }}>Abrir →</a>}
                      </div>
                    ))}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ADD MODAL */}
      {showAdd && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={() => { setShowAdd(false); setActiveTab("calendario"); }}>
          <div style={{ background: "#fff", borderRadius: "22px 22px 0 0", padding: "24px 22px 44px", width: "100%", maxWidth: 480 }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <h2 style={{ margin: 0, fontSize: 21, color: "#1a1a2e" }}>➕ Agregar evento</h2>
              <button onClick={() => { setShowAdd(false); setActiveTab("calendario"); }} style={{ background: "#F0F0E8", border: "none", borderRadius: 10, width: 34, height: 34, fontSize: 16, cursor: "pointer" }}>✕</button>
            </div>
            <p style={{ fontSize: 14, color: "#888", margin: "0 0 16px", lineHeight: 1.6 }}>Agrega eventos en tu Google Sheet. La app sincroniza al presionar 🔄</p>
            <div style={{ background: "#F7F6F2", borderRadius: 13, padding: "14px 16px", marginBottom: 16 }}>
              <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 700, color: "#555" }}>Columnas en la hoja Eventos:</p>
              {[["A","Fecha","2026-05-18"],["B","Tipo","vuelo / hotel / tren / restaurante / museo / actividad / evento"],["C","Título","Nombre del evento"],["D","Hora","22:45"],["E","Confirmación","Número de reserva"],["F","Notas","Texto libre"],["G","Link","https://..."],["H","Ícono","✈️"]].map(([col, name, ex]) => (
                <div key={col} style={{ display: "flex", gap: 8, marginBottom: 5, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#0f2027", minWidth: 16 }}>{col}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#555", minWidth: 80 }}>{name}</span>
                  <span style={{ fontSize: 11, color: "#aaa" }}>{ex}</span>
                </div>
              ))}
            </div>
            <a href={sheetsUrl} target="_blank" rel="noreferrer" style={{ display: "block", background: "#0f2027", color: "#fff", borderRadius: 14, padding: "14px 0", textAlign: "center", textDecoration: "none", fontSize: 15, fontWeight: 700 }}>Abrir mi Google Sheet →</a>
            <button onClick={() => { load(); setShowAdd(false); setActiveTab("calendario"); }} style={{ display: "block", width: "100%", marginTop: 10, background: "#F7F6F2", border: "none", borderRadius: 14, padding: "12px 0", fontSize: 14, color: "#555", cursor: "pointer", fontWeight: 600 }}>🔄 Sincronizar ahora</button>
          </div>
        </div>
      )}

      {/* BOTTOM NAV */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: "rgba(255,255,255,0.96)", backdropFilter: "blur(20px)", borderTop: "1px solid #EEEEE8", padding: "10px 0 22px", display: "flex", justifyContent: "space-around" }}>
        {[{ id: "calendario", label: "Calendario", icon: "📅" }, { id: "importante", label: "Importante", icon: "🆘" }, { id: "agregar", label: "Agregar", icon: "➕" }].map(tab => (
          <button key={tab.id} onClick={() => { setActiveTab(tab.id); if (tab.id === "importante") setShowImportant(true); if (tab.id === "agregar") setShowAdd(true); }} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "5px 24px", opacity: activeTab === tab.id ? 1 : 0.38, transition: "opacity 0.2s" }}>
            <span style={{ fontSize: 24 }}>{tab.icon}</span>
            <span style={{ fontSize: 10, color: "#1a1a2e", fontWeight: activeTab === tab.id ? 700 : 400, letterSpacing: 0.5 }}>{tab.label}</span>
            {activeTab === tab.id && <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#0f2027" }} />}
          </button>
        ))}
      </div>
    </div>
  );
}
