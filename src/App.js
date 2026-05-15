// ============================================================
// EUROPA 2026 — App.js v4 (FINAL — URL configurada)
// Lee TODO del Apps Script (sin caché). Ediciones se ven al instante.
// ============================================================

import { useState, useEffect, useCallback, useMemo } from "react";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwiaw34Uflqz6zEz68uiQkl71S8_TR-s8vHwevn0FWSI5eIsel-QP-oMbJoOlXFDnZxlw/exec";

const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTYi8DGHJ3NGjrI6LM1KQLXe5ADHNKZB1iPUOZimRvKo-uQPd_n_P1Kqmncc66tbyYqUtCZDFehAsvo/pub?gid=1030451032&single=true&output=csv";
const SHEET_EDIT_URL = "https://docs.google.com/spreadsheets/d/1AjdLO-9VXKZ32_fkZ_b-9qHTThj1gxpQ3H6H80lHIAc/edit";
const CLAUDE_URL = "https://claude.ai/new";

const TRIP = { tripName: "Europa 2026", startDate: "2026-05-18", endDate: "2026-06-05" };

const CATEGORIES = {
  transporte:  { color: "#2563EB", bg: "#E8F4FD", dark: "#1E40AF", label: "Transporte", icon: "🚆" },
  hotel:       { color: "#16A34A", bg: "#F0FDF4", dark: "#15803D", label: "Hotel",       icon: "🏨" },
  restaurante: { color: "#EA580C", bg: "#FFF7ED", dark: "#C2410C", label: "Restaurante", icon: "🍽️" },
  actividad:   { color: "#9333EA", bg: "#FDF4FF", dark: "#7E22CE", label: "Actividad",   icon: "🗺️" },
  evento:      { color: "#E11D48", bg: "#FFF1F2", dark: "#BE123C", label: "Evento",      icon: "🎭" },
};

const SUBCAT_ICONS = {
  vuelo:"✈️", tren:"🚆", barco:"⛴️", cremallera:"🚞", "teleférico":"🚡",
  funicular:"🚞", tgv:"🚄", equipaje:"🧳", hotel:"🏨", checkout:"🧳",
  cena:"🍽️", almuerzo:"🍽️", desayuno:"☕", monumento:"🏛️", museo:"🎨",
  paseo:"🚶", "montaña":"🏔️", cascada:"💧", senderismo:"🥾", paisaje:"📷",
  naturaleza:"🍇", compras:"🛍️", deportes:"🎾", esim:"📶",
};

const IMPORTANT_CATS = {
  emergencia: { label: "🚨 Emergencias",       bg: "#FFF1F2" },
  seguro:     { label: "🏥 Seguros",            bg: "#F0FDF4" },
  internet:   { label: "📶 Datos & Moneda",     bg: "#F0F9FF" },
  documento:  { label: "📄 Apps & Recursos",    bg: "#F7F6F2" },
};

function getDaysArray(start, end) {
  const days = [];
  let cur = new Date(start + "T12:00:00");
  const last = new Date(end + "T12:00:00");
  while (cur <= last) { days.push(cur.toISOString().split("T")[0]); cur.setDate(cur.getDate()+1); }
  return days;
}

function formatDate(s) {
  if (!s) return "";
  return new Date(s+"T12:00:00").toLocaleDateString("es-MX",{weekday:"long",day:"numeric",month:"long"});
}

function getTodayStr() { return new Date().toISOString().split("T")[0]; }

function normalizeTime(t) {
  if (!t) return "99:99";
  const m = String(t).trim().match(/^(\d{1,2}):(\d{2})/);
  if (!m) return "99:99";
  return m[1].padStart(2, "0") + ":" + m[2];
}

function sortByTime(a, b) {
  return normalizeTime(a.time).localeCompare(normalizeTime(b.time));
}

function parseCSV(text) {
  const lines = text.trim().split("\n");
  return lines.slice(1).map(line => {
    const cols = []; let cur = "", inQ = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch==='"' && !inQ) inQ = true;
      else if (ch==='"' && inQ && line[i+1]==='"') { cur+='"'; i++; }
      else if (ch==='"' && inQ) inQ = false;
      else if (ch===',' && !inQ) { cols.push(cur.trim()); cur=""; }
      else cur += ch;
    }
    cols.push(cur.trim()); return cols;
  });
}

function rowsToEvents(rows) {
  return rows
    .filter(r => r[0] && r[0].trim().startsWith("2026"))
    .map((row, i) => ({
      id: i+1,
      date: (row[0]||"").trim(),
      time: (row[1]||"").trim(),
      category: (row[2]||"actividad").toLowerCase().trim(),
      subcategory: (row[3]||"").toLowerCase().trim(),
      title: (row[4]||"").trim(),
      place: (row[5]||"").trim(),
      confirmation: (row[6]||"").trim(),
      cost: (row[7]||"").trim(),
      notes: (row[8]||"").trim(),
      tips: (row[9]||"").trim(),
      link: (row[10]||"").trim(),
      status: (row[11]||"confirmado").toLowerCase().trim(),
      icon: row[12] || SUBCAT_ICONS[(row[3]||"").toLowerCase().trim()] || CATEGORIES[(row[2]||"actividad").toLowerCase().trim()]?.icon || "📌",
    }))
    .sort((a,b) => {
      const dateComp = a.date.localeCompare(b.date);
      return dateComp !== 0 ? dateComp : sortByTime(a,b);
    });
}

function rowsToImportant(rows) {
  return rows
    .filter(r => r[0] && r[1])
    .map((row, i) => ({
      id: i+1,
      category: (row[0]||"").toLowerCase().trim(),
      label: (row[1]||"").trim(),
      value: (row[2]||"").trim(),
      link: (row[3]||"").trim(),
    }));
}

async function loadData() {
  const hasScript = SCRIPT_URL && !SCRIPT_URL.includes("REEMPLAZAR");
  
  if (hasScript) {
    try {
      const res = await fetch(SCRIPT_URL + "?t=" + Date.now());
      if (res.ok) {
        const data = await res.json();
        if (data.ok) {
          return {
            events: rowsToEvents(data.eventos || []),
            important: rowsToImportant(data.importante || []),
          };
        }
      }
    } catch (e) {
      console.log("Apps Script falló:", e);
    }
  }
  
  const res = await fetch(CSV_URL + "&t=" + Date.now());
  if (!res.ok) throw new Error("Error de red");
  const text = await res.text();
  return {
    events: rowsToEvents(parseCSV(text)),
    important: [],
  };
}

export default function App() {
  const [events, setEvents]       = useState([]);
  const [important, setImportant] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [view, setView]           = useState("calendario");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [checked, setChecked]     = useState({});
  const [showImportant, setShowImportant] = useState(false);
  const [showAdd, setShowAdd]     = useState(false);
  const [lastSync, setLastSync]   = useState(null);

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const data = await loadData();
      setEvents(data.events);
      setImportant(data.important);
      setLastSync(new Date().toLocaleTimeString("es-MX",{hour:"2-digit",minute:"2-digit"}));
    } catch { setError("Error al cargar. Toca 🔄"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const days = getDaysArray(TRIP.startDate, TRIP.endDate);
  const today = getTodayStr();
  useEffect(() => { if (!selectedDate) setSelectedDate(days.includes(today)?today:days[0]); }, [events]);

  const eventsForDay = useCallback((date) =>
    events.filter(e => e.date === date), [events]);

  const eventsByCategory = useMemo(() => {
    const map = {}; Object.keys(CATEGORIES).forEach(k => { map[k] = []; });
    events.forEach(e => { if (map[e.category]) map[e.category].push(e); });
    return map;
  }, [events]);

  const currentEvents = eventsForDay(selectedDate || days[0]);
  const tripDayNumber = selectedDate ? days.indexOf(selectedDate)+1 : 1;
  const isToday = selectedDate === today;
  const pendientes = events.filter(e => e.status==="pendiente").length;

  return (
    <div style={{fontFamily:"'Georgia',serif",background:"#F7F6F2",minHeight:"100vh",maxWidth:480,margin:"0 auto",boxShadow:"0 0 80px rgba(0,0,0,0.10)"}}>
      <Header trip={TRIP} days={days} tripDayNumber={tripDayNumber} loading={loading} error={error} lastSync={lastSync} pendientes={pendientes} onRefresh={load}/>
      {view==="calendario" && <>
        <DateStrip days={days} selectedDate={selectedDate} today={today} eventsForDay={eventsForDay} onSelect={setSelectedDate}/>
        <DayHeader selectedDate={selectedDate} isToday={isToday} tripDayNumber={tripDayNumber} count={currentEvents.length}/>
        <EventsList events={currentEvents} loading={loading} expandedEvent={expandedEvent} setExpandedEvent={setExpandedEvent} checked={checked} setChecked={setChecked} emptyMsg={events.length===0?"Sin datos. Toca 🔄":"Día libre"}/>
      </>}
      {view==="categorias" && <CategoriesView eventsByCategory={eventsByCategory} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} expandedEvent={expandedEvent} setExpandedEvent={setExpandedEvent} checked={checked} setChecked={setChecked} loading={loading}/>}
      {showImportant && <ImportantModal important={important} loading={loading} onClose={()=>{setShowImportant(false);setView("calendario");}}/>}
      {showAdd && <AddModal onClose={()=>{setShowAdd(false);setView("calendario");}} onSync={load}/>}
      <BottomNav view={view} setView={setView} setShowImportant={setShowImportant} setShowAdd={setShowAdd}/>
    </div>
  );
}

function Header({trip,days,tripDayNumber,loading,error,lastSync,pendientes,onRefresh}) {
  const pct = Math.round((tripDayNumber/days.length)*100);
  return (
    <div style={{background:"linear-gradient(160deg,#0f2027,#203a43,#2c5364)",padding:"36px 24px 22px",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-40,right:-40,width:160,height:160,borderRadius:"50%",border:"1px solid rgba(255,255,255,0.07)"}}/>
      <div style={{position:"absolute",top:-12,right:-12,width:80,height:80,borderRadius:"50%",border:"1px solid rgba(255,255,255,0.11)"}}/>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div>
          <p style={{margin:"0 0 4px",color:"rgba(255,255,255,0.4)",fontSize:10,letterSpacing:3,textTransform:"uppercase"}}>Mi Viaje</p>
          <h1 style={{margin:0,color:"#fff",fontSize:28,fontWeight:400,letterSpacing:-0.5}}>{trip.tripName}</h1>
          <p style={{margin:"5px 0 0",color:"rgba(255,255,255,0.38)",fontSize:12}}>18 Mayo — 5 Junio · {days.length} días</p>
        </div>
        <button onClick={onRefresh} disabled={loading} style={{background:"rgba(255,255,255,0.10)",border:"none",borderRadius:12,padding:"8px 10px",cursor:"pointer",color:"#fff",fontSize:20,opacity:loading?0.4:1}}>{loading?"⏳":"🔄"}</button>
      </div>
      <div style={{marginTop:18,background:"rgba(255,255,255,0.08)",borderRadius:10,padding:"10px 14px"}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
          <span style={{color:"rgba(255,255,255,0.5)",fontSize:11}}>Día {tripDayNumber} de {days.length}</span>
          <span style={{color:"rgba(255,255,255,0.5)",fontSize:11}}>{pct}%</span>
        </div>
        <div style={{background:"rgba(255,255,255,0.13)",borderRadius:4,height:5}}>
          <div style={{background:"linear-gradient(90deg,#67e8f9,#818cf8)",borderRadius:4,height:5,width:`${pct}%`,transition:"width 0.6s"}}/>
        </div>
      </div>
      <div style={{marginTop:8,minHeight:16,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          {loading && <span style={{color:"rgba(255,255,255,0.4)",fontSize:11}}>🔄 Cargando…</span>}
          {error   && <span style={{color:"#FCA5A5",fontSize:11}}>⚠️ {error}</span>}
          {!loading&&!error&&lastSync && <span style={{color:"rgba(255,255,255,0.3)",fontSize:11}}>✓ {lastSync}</span>}
        </div>
        {pendientes>0 && <span style={{background:"rgba(252,165,165,0.18)",color:"#FCD34D",fontSize:11,padding:"3px 9px",borderRadius:20,fontWeight:600}}>⚠️ {pendientes} pendientes</span>}
      </div>
    </div>
  );
}

function DateStrip({days,selectedDate,today,eventsForDay,onSelect}) {
  return (
    <div style={{background:"#fff",borderBottom:"1px solid #EEEEE8"}}>
      <div style={{display:"flex",gap:6,overflowX:"auto",padding:"14px 18px",scrollbarWidth:"none"}}>
        {days.map(day=>{
          const d=new Date(day+"T12:00:00");
          const isSel=day===selectedDate, isTod=day===today;
          const count=eventsForDay(day).length;
          return (
            <button key={day} onClick={()=>onSelect(day)} style={{flexShrink:0,width:50,padding:"9px 4px 8px",borderRadius:13,border:"none",cursor:"pointer",position:"relative",background:isSel?"#0f2027":isTod?"#EEF6FF":"#F7F6F2",transition:"all 0.18s"}}>
              <p style={{margin:0,fontSize:9,color:isSel?"rgba(255,255,255,0.5)":"#bbb",textTransform:"capitalize"}}>{d.toLocaleDateString("es-MX",{weekday:"short"})}</p>
              <p style={{margin:"3px 0 2px",fontSize:19,fontWeight:700,color:isSel?"#fff":isTod?"#2563EB":"#1a1a2e"}}>{d.getDate()}</p>
              <p style={{margin:0,fontSize:9,color:isSel?"rgba(255,255,255,0.45)":"#ccc",textTransform:"capitalize"}}>{d.toLocaleDateString("es-MX",{month:"short"})}</p>
              {count>0 && <div style={{position:"absolute",bottom:5,left:"50%",transform:"translateX(-50%)",display:"flex",gap:2}}>{[...Array(Math.min(count,3))].map((_,i)=><div key={i} style={{width:3,height:3,borderRadius:"50%",background:isSel?"#67e8f9":"#0f2027"}}/>)}</div>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DayHeader({selectedDate,isToday,tripDayNumber,count}) {
  return (
    <div style={{padding:"18px 22px 10px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <div>
        <h2 style={{margin:0,fontSize:20,color:"#1a1a2e",fontWeight:400,textTransform:"capitalize"}}>{formatDate(selectedDate)}</h2>
        {isToday && <span style={{fontSize:11,color:"#16A34A",fontWeight:700}}>● HOY</span>}
      </div>
      <div style={{display:"flex",gap:8}}>
        <span style={{background:"#EEEEE8",borderRadius:20,padding:"4px 12px",fontSize:12,color:"#666"}}>Día {tripDayNumber}</span>
        {count>0 && <span style={{background:"#0f2027",borderRadius:20,padding:"4px 10px",fontSize:12,color:"#fff"}}>{count} {count===1?"evento":"eventos"}</span>}
      </div>
    </div>
  );
}

function EventsList({events,loading,expandedEvent,setExpandedEvent,checked,setChecked,emptyMsg,showDate}) {
  return (
    <div style={{padding:"0 18px 110px"}}>
      {loading && [1,2,3].map(i=>(
        <div key={i} style={{background:"#fff",borderRadius:18,marginBottom:10,padding:16,border:"1.5px solid #EEEEE8"}}>
          <div style={{display:"flex",gap:12}}>
            <div style={{width:46,height:46,borderRadius:13,background:"#F0F0E8"}}/>
            <div style={{flex:1}}><div style={{width:"65%",height:14,background:"#F0F0E8",borderRadius:6,marginBottom:8}}/><div style={{width:"40%",height:10,background:"#F7F6F2",borderRadius:6}}/></div>
          </div>
        </div>
      ))}
      {!loading && events.length===0 && <div style={{textAlign:"center",padding:"50px 0"}}><div style={{fontSize:44,marginBottom:12}}>🌅</div><p style={{fontSize:16,color:"#bbb",margin:0}}>{emptyMsg}</p></div>}
      {events.map(event=>(
        <EventCard key={event.id} event={event} expanded={expandedEvent===event.id} onToggle={()=>setExpandedEvent(expandedEvent===event.id?null:event.id)} done={!!checked[event.id]} onDone={()=>setChecked(prev=>({...prev,[event.id]:!prev[event.id]}))} showDate={showDate}/>
      ))}
    </div>
  );
}

function EventCard({event,expanded,onToggle,done,onDone,showDate}) {
  const meta = CATEGORIES[event.category]||CATEGORIES.actividad;
  const isPending = event.status==="pendiente";
  return (
    <div onClick={onToggle} style={{background:done?"#F0FDF4":"#fff",borderRadius:18,marginBottom:10,overflow:"hidden",border:`1.5px solid ${expanded?meta.color:done?"#86EFAC":isPending?"#FCD34D":"#EEEEE8"}`,cursor:"pointer",transition:"all 0.2s",boxShadow:expanded?`0 6px 24px ${meta.color}22`:"0 1px 5px rgba(0,0,0,0.04)"}}>
      <div style={{display:"flex",alignItems:"center",padding:"13px 15px",gap:12}}>
        <div style={{width:46,height:46,borderRadius:13,background:meta.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0,opacity:done?0.5:1}}>{event.icon}</div>
        <div style={{flex:1,minWidth:0}}>
          <p style={{margin:0,fontSize:15,fontWeight:600,color:done?"#86EFAC":"#1a1a2e",textDecoration:done?"line-through":"none",lineHeight:1.3}}>{event.title}</p>
          <div style={{display:"flex",gap:8,marginTop:5,flexWrap:"wrap",alignItems:"center"}}>
            {showDate && <span style={{fontSize:11,color:"#888",fontWeight:600}}>{event.date.slice(8,10)} {new Date(event.date+"T12:00:00").toLocaleDateString("es-MX",{month:"short"})}</span>}
            {event.time && <span style={{fontSize:12,color:"#999"}}>🕐 {event.time}</span>}
            <span style={{fontSize:10,fontWeight:700,letterSpacing:0.8,textTransform:"uppercase",color:meta.color,background:meta.bg,padding:"2px 9px",borderRadius:20}}>{event.subcategory||meta.label}</span>
            {isPending && <span style={{fontSize:9,fontWeight:700,color:"#B45309",background:"#FFFBEB",padding:"2px 7px",borderRadius:20}}>⚠ PENDIENTE</span>}
          </div>
        </div>
        <span style={{fontSize:13,color:expanded?meta.color:"#ddd",display:"inline-block",transform:expanded?"rotate(180deg)":"none",transition:"transform 0.2s"}}>▼</span>
      </div>
      {expanded && (
        <div style={{padding:"4px 15px 15px",borderTop:`1px solid ${meta.bg}`}}>
          {event.place && <div style={{marginTop:10,padding:"8px 12px",background:"#F7F6F2",borderRadius:10}}><p style={{margin:0,fontSize:11,color:"#888"}}>📍 Lugar</p><p style={{margin:"3px 0 0",fontSize:13,color:"#333"}}>{event.place}</p></div>}
          {event.confirmation&&event.confirmation!=="—" && <div style={{background:meta.bg,borderRadius:11,padding:"10px 13px",marginTop:9}}><p style={{margin:0,fontSize:10,color:meta.dark,fontWeight:700,letterSpacing:1.2,textTransform:"uppercase"}}>Confirmación</p><p style={{margin:"5px 0 0",fontSize:15,color:meta.dark,fontFamily:"monospace",letterSpacing:1}}>{event.confirmation}</p></div>}
          {event.cost&&event.cost!=="—" && <div style={{marginTop:9,padding:"8px 12px",background:"#FFF7ED",borderRadius:10}}><p style={{margin:0,fontSize:11,color:"#C2410C",fontWeight:600}}>💰 Costo: <span style={{fontWeight:400,color:"#666"}}>{event.cost}</span></p></div>}
          {event.notes&&event.notes!=="—" && <div style={{marginTop:9,background:"#fff",border:"1px solid #EEEEE8",borderRadius:11,padding:"10px 13px"}}><p style={{margin:0,fontSize:10,color:"#888",fontWeight:700,letterSpacing:1,textTransform:"uppercase"}}>📝 Notas</p><p style={{margin:"4px 0 0",fontSize:13,color:"#444",lineHeight:1.55}}>{event.notes}</p></div>}
          {event.tips && <div style={{marginTop:9,background:"#FFFBEB",border:"1px solid #FEF3C7",borderRadius:11,padding:"10px 13px"}}><p style={{margin:0,fontSize:10,color:"#B45309",fontWeight:700,letterSpacing:1,textTransform:"uppercase"}}>💡 Tips</p><p style={{margin:"4px 0 0",fontSize:13,color:"#92400E",lineHeight:1.55}}>{event.tips}</p></div>}
          <div style={{display:"flex",gap:8,marginTop:12}}>
            {event.link&&event.link.startsWith("http") && <a href={event.link} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} style={{flex:1,background:meta.color,color:"#fff",borderRadius:12,padding:"12px 0",textAlign:"center",textDecoration:"none",fontSize:13,fontWeight:700,display:"block"}}>Abrir app / web →</a>}
            <button onClick={e=>{e.stopPropagation();onDone();}} style={{background:done?"#16A34A":"#F0F0E8",color:done?"#fff":"#888",border:"none",borderRadius:12,padding:"12px 16px",fontSize:18,cursor:"pointer",transition:"all 0.2s"}}>{done?"✓":"○"}</button>
          </div>
        </div>
      )}
    </div>
  );
}

function CategoriesView({eventsByCategory,selectedCategory,setSelectedCategory,expandedEvent,setExpandedEvent,checked,setChecked,loading}) {
  if (selectedCategory) {
    const cat=CATEGORIES[selectedCategory], list=eventsByCategory[selectedCategory]||[];
    return (
      <div>
        <div style={{padding:"18px 22px 10px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <button onClick={()=>setSelectedCategory(null)} style={{background:"none",border:"none",color:"#888",fontSize:14,cursor:"pointer",padding:0}}>← Categorías</button>
          <h2 style={{margin:0,fontSize:18,color:cat.dark,fontWeight:600}}>{cat.icon} {cat.label}</h2>
          <span style={{background:cat.bg,color:cat.dark,borderRadius:20,padding:"4px 10px",fontSize:12,fontWeight:600}}>{list.length}</span>
        </div>
        <EventsList events={list} loading={loading} expandedEvent={expandedEvent} setExpandedEvent={setExpandedEvent} checked={checked} setChecked={setChecked} emptyMsg="Sin eventos" showDate={true}/>
      </div>
    );
  }
  return (
    <div style={{padding:"20px 18px 110px"}}>
      <h2 style={{margin:"0 0 16px 4px",fontSize:18,color:"#1a1a2e",fontWeight:400}}>Por categoría</h2>
      {Object.entries(CATEGORIES).map(([key,cat])=>{
        const count=(eventsByCategory[key]||[]).length;
        const pend=(eventsByCategory[key]||[]).filter(e=>e.status==="pendiente").length;
        return (
          <button key={key} onClick={()=>setSelectedCategory(key)} style={{width:"100%",background:"#fff",border:"1.5px solid #EEEEE8",borderRadius:18,padding:"14px 16px",marginBottom:10,cursor:"pointer",display:"flex",alignItems:"center",gap:14,textAlign:"left",transition:"all 0.2s"}}>
            <div style={{width:50,height:50,borderRadius:14,background:cat.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}}>{cat.icon}</div>
            <div style={{flex:1}}>
              <p style={{margin:0,fontSize:16,fontWeight:600,color:"#1a1a2e"}}>{cat.label}</p>
              <p style={{margin:"3px 0 0",fontSize:12,color:"#999"}}>{count} {count===1?"evento":"eventos"}{pend>0&&<span style={{color:"#B45309",marginLeft:6}}>· {pend} pendiente{pend>1?"s":""}</span>}</p>
            </div>
            <span style={{fontSize:18,color:"#ccc"}}>›</span>
          </button>
        );
      })}
    </div>
  );
}

function ImportantModal({important, loading, onClose}) {
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.65)",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={onClose}>
      <div style={{background:"#fff",borderRadius:"22px 22px 0 0",padding:"24px 22px 44px",width:"100%",maxWidth:480,maxHeight:"82vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
          <h2 style={{margin:0,fontSize:21,color:"#1a1a2e"}}>🆘 Datos Importantes</h2>
          <button onClick={onClose} style={{background:"#F0F0E8",border:"none",borderRadius:10,width:34,height:34,fontSize:16,cursor:"pointer"}}>✕</button>
        </div>
        <p style={{margin:"0 0 16px",fontSize:12,color:"#888"}}>Editables en la pestaña <strong>Importante</strong> de tu Sheet</p>
        
        {loading && <p style={{textAlign:"center",color:"#bbb",padding:"20px 0"}}>Cargando…</p>}
        
        {!loading && important.length===0 && (
          <div style={{textAlign:"center",padding:"30px 0"}}>
            <div style={{fontSize:40,marginBottom:8}}>📋</div>
            <p style={{color:"#888",fontSize:14}}>Crea la pestaña "Importante" en tu Sheet</p>
            <a href={SHEET_EDIT_URL} target="_blank" rel="noreferrer" style={{display:"inline-block",marginTop:16,background:"#0f2027",color:"#fff",borderRadius:10,padding:"8px 18px",textDecoration:"none",fontSize:13}}>Abrir Sheet →</a>
          </div>
        )}
        
        {Object.entries(IMPORTANT_CATS).map(([key,catMeta])=>{
          const items=important.filter(i=>i.category===key);
          if(!items.length) return null;
          return (
            <div key={key} style={{marginBottom:22}}>
              <p style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:"#aaa",margin:"0 0 10px"}}>{catMeta.label}</p>
              {items.map(item=>(
                <div key={item.id} style={{background:catMeta.bg,borderRadius:13,padding:"12px 14px",marginBottom:8}}>
                  <p style={{margin:0,fontSize:11,color:"#aaa"}}>{item.label}</p>
                  <p style={{margin:"4px 0 0",fontSize:15,color:"#1a1a2e",fontWeight:500}}>{item.value}</p>
                  {item.link&&<a href={item.link} target="_blank" rel="noreferrer" style={{display:"inline-block",marginTop:6,fontSize:12,color:"#2563EB",textDecoration:"none",fontWeight:600}}>Abrir →</a>}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AddModal({onClose,onSync}) {
  const today = getTodayStr();
  const [form, setForm] = useState({
    date: today < "2026-05-18" ? "2026-05-18" : today,
    time: "", category: "actividad", subcategory: "",
    title: "", place: "", confirmation: "", cost: "",
    notes: "", link: "", status: "confirmado",
  });
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);
  const [saveErr, setSaveErr] = useState(null);

  const set = (k,v) => setForm(prev=>({...prev,[k]:v}));
  const hasScript = SCRIPT_URL && !SCRIPT_URL.includes("REEMPLAZAR");

  const subcatOptions = {
    transporte: ["vuelo","tren","tgv","barco","cremallera","teleférico","funicular","equipaje","otro"],
    hotel:      ["hotel","checkout","otro"],
    restaurante:["cena","almuerzo","desayuno","café","otro"],
    actividad:  ["museo","monumento","paseo","montaña","senderismo","cascada","naturaleza","paisaje","compras","otro"],
    evento:     ["deportes","concierto","show","otro"],
  };

  const handleSave = async () => {
    if (!form.title || !form.date) { setSaveErr("Fecha y título son obligatorios"); return; }
    setSaving(true); setSaveErr(null); setSaved(false);

    if (!hasScript) {
      setSaveErr("Apps Script no configurado.");
      setSaving(false); return;
    }

    try {
      await fetch(SCRIPT_URL, {
        method: "POST", mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(form),
      });
      setSaved(true);
      setTimeout(() => { onSync(); }, 2000);
    } catch (err) {
      setSaveErr("Error de red. Intenta de nuevo.");
    } finally {
      setSaving(false);
    }
  };

  const inp = (label, key, type, placeholder) => (
    <div style={{marginBottom:12}}>
      <label style={{display:"block",fontSize:11,fontWeight:700,color:"#666",marginBottom:4,textTransform:"uppercase",letterSpacing:0.8}}>{label}</label>
      <input type={type||"text"} value={form[key]} onChange={e=>set(key,e.target.value)} placeholder={placeholder||""}
        style={{width:"100%",padding:"10px 12px",borderRadius:10,border:"1.5px solid #E5E5E0",fontSize:14,color:"#1a1a2e",background:"#FAFAF7",outline:"none",fontFamily:"Georgia,serif"}}/>
    </div>
  );

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.65)",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={onClose}>
      <div style={{background:"#fff",borderRadius:"22px 22px 0 0",padding:"24px 22px 44px",width:"100%",maxWidth:480,maxHeight:"90vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <h2 style={{margin:0,fontSize:21,color:"#1a1a2e"}}>➕ Nuevo evento</h2>
          <button onClick={onClose} style={{background:"#F0F0E8",border:"none",borderRadius:10,width:34,height:34,fontSize:16,cursor:"pointer"}}>✕</button>
        </div>

        <a href={SHEET_EDIT_URL} target="_blank" rel="noreferrer" style={{display:"block",background:"#F7F6F2",borderRadius:10,padding:"8px 12px",marginBottom:16,fontSize:12,color:"#555",textDecoration:"none",textAlign:"center"}}>📋 O abre el Sheet directamente →</a>

        <div style={{display:"flex",gap:10,marginBottom:12}}>
          <div style={{flex:1}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,color:"#666",marginBottom:4,textTransform:"uppercase",letterSpacing:0.8}}>Fecha *</label>
            <input type="date" value={form.date} onChange={e=>set("date",e.target.value)} style={{width:"100%",padding:"10px 12px",borderRadius:10,border:"1.5px solid #E5E5E0",fontSize:14,color:"#1a1a2e",background:"#FAFAF7",outline:"none"}}/>
          </div>
          <div style={{width:90}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,color:"#666",marginBottom:4,textTransform:"uppercase",letterSpacing:0.8}}>Hora</label>
            <input type="time" value={form.time} onChange={e=>set("time",e.target.value)} style={{width:"100%",padding:"10px 12px",borderRadius:10,border:"1.5px solid #E5E5E0",fontSize:14,color:"#1a1a2e",background:"#FAFAF7",outline:"none"}}/>
          </div>
        </div>

        <div style={{marginBottom:12}}>
          <label style={{display:"block",fontSize:11,fontWeight:700,color:"#666",marginBottom:4,textTransform:"uppercase",letterSpacing:0.8}}>Categoría</label>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {Object.entries(CATEGORIES).map(([k,v])=>(
              <button key={k} onClick={()=>{set("category",k);set("subcategory","");}} style={{padding:"6px 12px",borderRadius:20,border:`1.5px solid ${form.category===k?v.color:"#E5E5E0"}`,background:form.category===k?v.bg:"#fff",color:form.category===k?v.color:"#888",fontSize:12,fontWeight:form.category===k?700:400,cursor:"pointer"}}>{v.icon} {v.label}</button>
            ))}
          </div>
        </div>

        {subcatOptions[form.category] && (
          <div style={{marginBottom:12}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,color:"#666",marginBottom:4,textTransform:"uppercase",letterSpacing:0.8}}>Tipo</label>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {subcatOptions[form.category].map(s=>(
                <button key={s} onClick={()=>set("subcategory",s)} style={{padding:"5px 11px",borderRadius:20,border:`1.5px solid ${form.subcategory===s?"#0f2027":"#E5E5E0"}`,background:form.subcategory===s?"#0f2027":"#fff",color:form.subcategory===s?"#fff":"#666",fontSize:11,cursor:"pointer"}}>{s}</button>
              ))}
            </div>
          </div>
        )}

        {inp("Título *","title","text","Ej. Cena en restaurante X")}
        {inp("Lugar","place","text","Ej. Calle Mayor 5, Zúrich")}
        {inp("N° Confirmación / Ticket","confirmation","text","Ej. HTL-12345")}
        {inp("Costo","cost","text","Ej. CHF 50")}

        <div style={{marginBottom:12}}>
          <label style={{display:"block",fontSize:11,fontWeight:700,color:"#666",marginBottom:4,textTransform:"uppercase",letterSpacing:0.8}}>Notas</label>
          <textarea value={form.notes} onChange={e=>set("notes",e.target.value)} placeholder="Detalles…" rows={2}
            style={{width:"100%",padding:"10px 12px",borderRadius:10,border:"1.5px solid #E5E5E0",fontSize:14,color:"#1a1a2e",background:"#FAFAF7",outline:"none",resize:"none",fontFamily:"Georgia,serif"}}/>
        </div>

        {inp("Link","link","url","https://...")}

        <div style={{marginBottom:18}}>
          <label style={{display:"block",fontSize:11,fontWeight:700,color:"#666",marginBottom:4,textTransform:"uppercase",letterSpacing:0.8}}>Estado</label>
          <div style={{display:"flex",gap:8}}>
            {["confirmado","pendiente"].map(s=>(
              <button key={s} onClick={()=>set("status",s)} style={{flex:1,padding:"8px 0",borderRadius:10,border:`1.5px solid ${form.status===s?(s==="confirmado"?"#16A34A":"#D97706"):"#E5E5E0"}`,background:form.status===s?(s==="confirmado"?"#F0FDF4":"#FFFBEB"):"#fff",color:form.status===s?(s==="confirmado"?"#16A34A":"#D97706"):"#888",fontWeight:form.status===s?700:400,fontSize:13,cursor:"pointer"}}>
                {s==="confirmado"?"✓ Confirmado":"⚠ Pendiente"}
              </button>
            ))}
          </div>
        </div>

        {saveErr && <p style={{color:"#E11D48",fontSize:13,margin:"0 0 12px",textAlign:"center"}}>{saveErr}</p>}
        {saved && (
          <div style={{background:"#F0FDF4",borderRadius:12,padding:"14px",marginBottom:12,textAlign:"center",border:"1.5px solid #86EFAC"}}>
            <p style={{margin:0,color:"#16A34A",fontWeight:700,fontSize:15}}>✓ Guardado en el Sheet</p>
            <p style={{margin:"6px 0 10px",color:"#16A34A",fontSize:12}}>Sincronizando…</p>
            <button onClick={()=>{onSync();onClose();}} style={{background:"#16A34A",color:"#fff",border:"none",borderRadius:10,padding:"8px 18px",fontSize:13,fontWeight:700,cursor:"pointer"}}>Cerrar</button>
          </div>
        )}

        <button onClick={handleSave} disabled={saving} style={{display:"block",width:"100%",background:"#0f2027",color:"#fff",borderRadius:14,padding:"14px 0",fontSize:15,fontWeight:700,border:"none",cursor:"pointer",opacity:saving?0.6:1}}>
          {saving ? "Guardando…" : "💾 Guardar al Sheet"}
        </button>
      </div>
    </div>
  );
}

function BottomNav({view,setView,setShowImportant,setShowAdd}) {
  const tabs=[
    {id:"calendario",label:"Calendario",icon:"📅"},
    {id:"categorias",label:"Categorías",icon:"📂"},
    {id:"claude",label:"Claude",icon:"🤖",external:CLAUDE_URL},
    {id:"importante",label:"Datos",icon:"🆘"},
    {id:"agregar",label:"Agregar",icon:"➕"},
  ];
  return (
    <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:"rgba(255,255,255,0.96)",backdropFilter:"blur(20px)",borderTop:"1px solid #EEEEE8",padding:"10px 0 22px",display:"flex",justifyContent:"space-around"}}>
      {tabs.map(tab=>{
        const isActive=view===tab.id;
        if(tab.external) return (
          <a key={tab.id} href={tab.external} target="_blank" rel="noreferrer" style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"5px 10px",textDecoration:"none",opacity:0.5}}>
            <span style={{fontSize:22}}>{tab.icon}</span>
            <span style={{fontSize:10,color:"#1a1a2e",letterSpacing:0.3}}>{tab.label}</span>
          </a>
        );
        return (
          <button key={tab.id} onClick={()=>{
            if(tab.id==="importante"){setShowImportant(true);return;}
            if(tab.id==="agregar"){setShowAdd(true);return;}
            setView(tab.id);
          }} style={{background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"5px 10px",opacity:isActive?1:0.4,transition:"opacity 0.2s"}}>
            <span style={{fontSize:22}}>{tab.icon}</span>
            <span style={{fontSize:10,color:"#1a1a2e",fontWeight:isActive?700:400,letterSpacing:0.3}}>{tab.label}</span>
            {isActive&&<div style={{width:5,height:5,borderRadius:"50%",background:"#0f2027"}}/>}
          </button>
        );
      })}
    </div>
  );
}
