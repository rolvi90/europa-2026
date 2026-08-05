# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Sobre este repositorio vs. el trabajo real

Este repo (`europa-2026`) es un side project de React no relacionado con los proyectos del usuario (`App.js`, `src/App.js`, carpeta `aniversario45/`). Los proyectos reales son **dos cursos** cuyo material vive en Google Drive, no en este repo. Usa este CLAUDE.md como contexto del trabajo del usuario; ignora el código de React salvo que el usuario pida tocarlo explícitamente.

Toolchain del repo (solo si te pide trabajar sobre él):
- `npm start` — dev server (react-scripts)
- `npm run build` — build de producción
- `npm test` — tests

## Prioridad del usuario

**Atacar primero el cohort de Dueños Libres / PROFIT-LIBRE.** Es su especialidad y es el proyecto más avanzado. El segundo curso (Algoritmo Personal / Saboteadores PI) avanza en paralelo pero no bloquea al primero.

## Proyecto A — Dueños Libres / PROFIT-LIBRE

Nombre cerrado (27-jun-2026): cohort **Dueños Libres**, método interno **PROFIT-LIBRE**. La marca anterior "El Fundador Libre" queda como histórica; el doc viejo `pagina_ventas_el_fundador_libre.docx` se conserva como referencia, no como página activa.

Sistema PROFIT, 6 dimensiones: Profit, Revenue, Operaciones, Finanzas/KPIs, Innovación, Equipo.

**Carpeta raíz en Drive:** `LIBRE + PROFIT` — folder id `1Z_3doghK0BniUopSq-NfHbcoMajC5CTI`.

### Sprint 1 cerrado (27-jun-2026)

- **Formato del piloto:** cohort cerrado, 8-10 plazas, 12 semanas, arranque 1 de agosto de 2026, cierre de inscripciones 25 de julio (pronto pago 18 de julio).
- **Pricing vigente en v2 (USD, ajustado por Rolando 27-jun-2026):** pago único pronto pago USD 1,450 · plan a 3 mensualidades USD 497/mes (USD 1,491 total). *(Antes era USD 2,997 / USD 1,097×3; Rolando recalibró el piloto a este rango.)*
- **Brief de oferta aprobado:** `1wVdVQusmUiCFN-KDl8Sxhr3A3SYLVagdQAmQf_E4qek` — *Sprint 1 - Oferta Dueños Libres Piloto (aprobada)*.
- **Página de ventas v1 (gdoc):** `158BHhDRQIfc4-yv3Xf7jC5OXu3HJ-LxMLXJSrr1TxSc` — *pagina_ventas_duenos_libres_piloto_v1*. Sustituye al `.docx` viejo.
- **Página de ventas v2 (gdoc, lista para publicar):** `1tyTcovahrIH-_paWsfnhyiD6d-Iei-7jdF_Aa7qV9Ms` — *pagina_ventas_duenos_libres_piloto_v2*. Incluye testimonio anonimizado (07-jul-2026: Rolando quitó la firma "Alfonso M.", queda solo "Fundador y Director General · Empresa de transporte y fletes de carga nacional"), bio fusionada con la voz de `rolvi.page` (ángulo "40 años / cicatrices"), datos de contacto reales y CTA a Calendly de 30 min.
- **Bloques Discovery Call agendados (America/Mexico_City):** lunes 6-jul 10-12h · lunes 13-jul 16-18h · lunes 20-jul 10-12h (último).
- **Datos de contacto activos:**
  - Calendly: https://calendly.com/rolando-villarreal/30min (Discovery Call 30 min)
  - WhatsApp: https://wa.me/528661123135
  - Email: coaching@rolvi.page
  - LinkedIn: https://www.linkedin.com/in/rolandomvillarreal
- **Landing pública:** vivirá como subpágina dentro de `rolvi.page` (URL objetivo: `rolvi.page/duenos-libres`). No duplicar foto ni bio: ya viven en `rolvi.page`. **El repo del sitio se llama `profit-landing`** (07-jul-2026) y vive fuera del scope de GitHub de esta sesión (fijada a `rolvi90/europa-2026` a nivel de entorno) — publicar ahí requiere abrir/crear una sesión de Claude Code con `profit-landing` agregado como fuente del entorno.
- **Confirmaciones cerradas:** (1) Testimonio: anónimo total, sin firma con nombre (resuelto 07-jul-2026). (2) URL final: `rolvi.page/duenos-libres` confirmada.

### Sprint 2 — Deck modular del programa (en curso)

- **Decisión de marca (27-jun-2026):** Rolando es Certified Profit Coach (miembro activo). El cohort Dueños Libres es idea propia, evolución del método. El deck puede usar logos y frameworks de The Profit Coach, pero traducidos al español y adaptados a PyME LatAm. Voz del deck: PROFIT-LIBRE (Rolando), con créditos a The Profit Coach donde corresponda.
- **Formato:** 8 decks separados — 1 de bienvenida (Sem 0-1) + 6 por dimensión PROFIT (Sem 2-11) + 1 de cierre/demo day (Sem 12). ~15-20 slides cada uno.
- **Workflow:** outline/guion completo antes de producir slides. Producción en Canva o Slides una vez aprobado el outline.
- **Outline maestro v1:** gdoc `159orRfpnn43UAbuiOAcrkT4AGuarNK1BTuUSsviOVuc`. HISTÓRICO (LIBRE como capa transversal).
- **Outline maestro v2:** gdoc `15OFTFgH26hnvWL04U1cMqypnr-QV4gxFXFz9mlLQuHQ`. HISTÓRICO (LIBRE como acrónimo de 5 dimensiones).
- **Outline maestro v3 (VIGENTE, 28-jun-2026):** gdoc `1tmzRzgdcfIbLd4MD3A7h8awKonBXVS3qF9xeYLCTkag` — *outline_deck_modular_duenos_libres_v3*. **LIBRE deja de ser acrónimo; ahora = VISION (un pilar conceptual).** PROFIT-LIBRE pasa a ser el sistema completo de los 3 Pilares del Profit Coach.
- **Marco definitivo — 3 Pilares:**
  - VISION (LIBRE) — la vida y el negocio que quieres. Sin dimensiones; una sola sesión densa.
  - VELOCIDAD — cómo el negocio se mueve. Dimensiones: P · R · O.
  - VALOR — cómo el negocio sostiene y multiplica valor. Dimensiones: F · I · T.
- **Mensaje central:** "VISION te dice a dónde · VELOCIDAD para acelerar tu negocio · VALOR te mantiene firme."
- **Cómo se absorben las dimensiones LIBRE viejas:** Liderazgo → I + T · Institucionalización → O + F · Bienestar → VISION · Rumbo y Cultura → VISION + T · Estructura Real → F + T.
- **Decisión idioma:** 100% español. **Moneda:** USD principal + MXN entre paréntesis.
- **Assets reutilizables del taller The Profit Coach** (gslides `11uNeeSWy9kxGiDoTvyyI8-61Pdh8OI5v3qfMWWMQYaM`): 5 Levels of Business Owner, 3 Pillars, 9 Step Roadmap, POWER Plan, Profit Maximiser, Business MAP, Trusted Team frameworks.

### Estructura del deck modular (v3) — 9 decks

0. Bienvenida + Diagnóstico (Sem 0)
1. **VISION** (Sem 1) — Vida + plan 1-3-5 años + Brújula
2. VELOCIDAD · P · Profit (Sem 2-3)
3. VELOCIDAD · R · Revenue (Sem 4-5)
4. VELOCIDAD · O · Operaciones (Sem 6) — cierra bloque VELOCIDAD con Matriz de Crecimiento Empresarial
5. VALOR · F · Finanzas/KPIs (Sem 7-8)
6. VALOR · I · Innovación (Sem 9)
7. VALOR · T · Equipo (Sem 10-11) — separado del Cierre, incluye assessment de alineamiento equipo + socios
8. Cierre / Demo Day (Sem 12)

### Sprint 2/3 — Inventario de herramientas del cohort (v3)

**Decisión:** herramientas en HTML autocontenidas (azul/oro, Lora + DM Sans, localStorage, imprimir/PDF). Decks en Canva.

**Sprint 3 de HTMLs: CERRADO (29-jun-2026).** Las 13 herramientas están generadas y entregadas a Rolando por chat (pendiente que él las suba a Drive). Todas con marca Dueños Libres + `coaching@rolvi.page`, mismo sistema visual, y con reglas de scroll/foco corregidas tras testing (ver notas por archivo).

HTML existentes rebranded a Dueños Libres:
- `mision_duenos_libres.html` — Brújula parte 1 (Misión)
- `valores_duenos_libres.html` — Brújula parte 2 (Valores)
- `matriz_proposito_duenos_libres.html` — Brújula parte 3 (v2: textarea de misión ampliado + botón "↗ Mover" tarjeta entre cuadrantes con pin manual)

Conversiones XLSX → HTML (hechas):
- `diagnostico_profit_libre.html` (72 preguntas, 6 dim × 3 sub × 4 preg, dashboard + 5 Niveles del Director) — desde `4ad95dbc-diagnostico_fundador_libre_final.xlsx`. Fix aplicado: scroll ya no salta al inicio al responder cada pregunta.
- `life_assessment.html` (100 preguntas, 10 áreas, rueda de vida en SVG nativo) — desde `6b85a3f4-life_assessment_fundador_libre_v5.xlsx`
- `matriz_crecimiento_empresarial.html` (50 preguntas, 5 niveles × 10 categorías, heatmap + Profit-Fun Matrix) — desde pestaña S1 de `Archivo Maestro Alineamiento y Aceleración` (gsheet `1lfUbAf7yDx0Ce7qEKzuXJM2tblVhWDZ88h5zEFIneUg`). Se usa al CIERRE del bloque VELOCIDAD (Sem 6). Escala en español: No / Más o Menos / Ideal (ajustado 29-jun-2026). **Fix (09-jul-2026):** las clases CSS del heatmap (paso 8, dashboard final) estaban invertidas — las celdas en 0 usaban el estilo gris de "no respondida" y viceversa, por lo que el 0 nunca se pintaba de rojo. Corregido: `s0` → rojo suave (`--rojo-l`) con texto `--rojo` legible; `s-1` (no respondida) → gris/beige. También se tradujo el encabezado abreviado del heatmap ("GOING"/"ALIGNMENT" — primera palabra sin traducir de "Going Pro"/"Alignment Accelerator") a "Autogestión"/"Alineación" vía un array `CAT_HEADER` nuevo, sin tocar los nombres completos de categoría usados en el resto de la herramienta.

HTML nuevos producidos (Sprint 3):
- `plan_135_anios.html` (Deck 1 · VISION) — Norte a 5 años (vida+negocio) + 2 Vision Orbits (8 áreas negocio / 6 áreas vida × 4 horizontes) + compromisos 90 días
- `profit_maximiser.html` (Deck 2 · Profit) — NUEVO, no estaba en el plan original. 5 palancas (Leads·Conversión·Ops/Cliente·Venta·Margen), banco de ideas editable/agregable por palanca, tomado de gsheet `1XXx2Mib_KDh8eE89jqi8reloclyGaeQNcDgDNv_uwH8` (pestaña español). **Flujo corregido (09-jul-2026):** el orden real de uso es captura de números → lluvia de ideas por palanca (cada idea del grupo se ubica en Leads/Conversión/Operaciones/Venta/Margen) → estimar impacto moviendo sliders. Se invirtió el orden de los pasos "simulador" e "ideas" (antes el simulador iba primero) y se agregó un diagrama que repite la fórmula de la portada pero con cada valor mostrando "actual → nuevo" en vivo según el movimiento de cada slider (efecto multiplicador visual), función `formulaLiveHtml()`/`updateFormulaLive()` en el HTML.
- `matriz_procesos.html` (Deck 4 · Operaciones) — top-3 procesos por score Frecuencia×Dependencia×Costo + plantilla "video de 5 min"
- `dashboard_kpis.html` (Deck 5 · Finanzas/KPIs) — 5 números con semáforo automático + KPIs por área + cadencia + vista celular mockup
- `canvas_innovacion.html` (Deck 6 · Innovación) — Lean Canvas 8 celdas + selector de palanca PROFIT que conecta con profit_maximiser.html
- `assessment_alineamiento_equipo.html` (Deck 7 · Equipo) — encuesta a equipo + socios, 5 dimensiones, heatmap cruzado persona×dimensión + top-3 brechas
- `matriz_habilidad_disfrute.html` (Deck 7 · Equipo) — matriz visual SVG 2×2, 4 zonas (Genialidad/Aprendizaje/Obligación/Quitar)
- `plan_profit_libre_360.html` (Deck 8 · Cierre / Demo Day) — documento integrador: resumen ejecutivo, compromisos por pilar, sistemas, cadencia, revisión 30/60/90. Reforzado para impresión: ninguna tarjeta se corta a la mitad entre páginas.

XLSX originales (los conserva Rolando):
- `diagnostico_fundador_libre_final.xlsx`
- `life_assessment_fundador_libre_v5.xlsx`

### Sprint 3 — Producción de decks en Canva + PowerPoint (CERRADO, 02-jul-2026)

- **Carpeta Canva:** `Dueños Libres - Decks del Cohort` — folder id `FAHOKVIqzVM`.
- **No hay brand kit configurado en Canva** (`list-brand-kits` devuelve vacío). Se especifica la paleta explícitamente en cada prompt de estilo: azul marino `#1E3A5F` + dorado `#8C6300`, tipografía Lora (títulos) + DM Sans (cuerpo).
- **Hallazgo importante (revisado 29-jun-2026):** Rolando ya tenía varios diseños de Canva previos relacionados directamente con el programa. Se leyó su contenido con `get-design-content` y se clasificó por valor:
  - 🟢 **Alto valor, contenido incorporado textualmente a los outlines:** *"De empleado de tu negocio a dueño estratégico: El método P.R.O.F.I.T"* (10 pág., guía completa con Objetivo+Acciones+Ejemplo por sección: Planning, Revenue, Operations, Finance&KPIs, Innovation, Team) y *"Effective Time Management for Entrepreneurs"* (6 pág., mini-deck de Profit·Revenue·Operations con caso de logística y la regla "si un proceso se repite 3 veces, documéntalo y delega"). Casos reales usados en los decks: restaurante (recetas como ingreso pasivo), tienda online (70% ventas vía Instagram), taller mecánico (–40% tiempos de entrega), distribuidor de gas butano (diversificación con misma flota), equipo de ventas (+25% tras capacitación en negociación).
  - 🟡 **Valor medio, estructura reusable:** *"Excelencia Operativa"* (13 pág., taller real para cliente "Energy Point" — ya usa el lenguaje VISION/VELOCIDAD/VALOR; contenido específico del cliente no reusable, pero la estructura de sesión sí).
  - 🔵 **Bajo valor para decks (son otra cosa):** *"Los 5 Niveles del Business Owner"* (carrusel de marketing/redes), *"Rueda de la Vida"* + 2 duplicados *"Wheel of Life"* (tarjeta de compromiso impresa, complementa `life_assessment.html`), *"El movimiento se demuestra andando"* (solo portada), *"Rolando"* (aparecen "Hannah Morales" ×3 + "Rolando Villarreal" — sin confirmar qué es; Rolando indicó que no hace falta revisarlo).
  - *"Copy of Capacitación MASECSA"* (42 pág.) — **excluido, no es material de Rolando.**
- **Flujo de generación:** `request-outline-review` (outline en widget, requiere aprobación explícita del usuario) → `generate-design-structured` (falla ~30-50% de las veces con `timeout` o `design_generation_error`; reintentar 1-3 veces normalmente funciona) → devuelve 4 diseños candidatos → se elige Versión 1 por defecto (patrón que Rolando aprobó en Deck 0) → `create-design-from-candidate` lo vuelve editable → `move-item-to-folder` a `FAHOKVIqzVM`.
- **Lección de un fallo persistente (Deck 7):** 3 reintentos idénticos fallaron seguidos; funcionó al simplificar el outline (sin acentos, sin comillas dobles, sin siglas como "EVP"). Si un deck falla 2+ veces seguidas con el mismo outline, simplificar el texto antes de seguir reintentando igual.
- **Estado (29-jun-2026): 8 de 9 decks generados y organizados en la carpeta.** Todos con contenido real de Rolando incorporado donde había fuente disponible (Decks 1-7). Deck 0 fue el único donde Rolando revisó y comparó 4 candidatos manualmente; para los Decks 1-7 se autoseleccionó la Versión 1 sin pausar para revisión, por instrucción expresa de Rolando ("continúa con los decks").
  - Deck 0 · Bienvenida: `DAHOKjGsXn4` — https://www.canva.com/d/GOUsn_OxUNVrTzR (Rolando ajustando colores manualmente: fusionar dorado/azul de la Versión 2 con la V1 elegida)
  - Deck 1 · VISION: `DAHOMQds_a0` — https://www.canva.com/d/4OXyZISe7UmTmn8
  - Deck 2 · Profit: `DAHOMQiGF-U` — https://www.canva.com/d/FkZjW9oRavxkK64
  - Deck 3 · Revenue: `DAHOMRGBvk0` — https://www.canva.com/d/kyOpl49AhSmz_TL
  - Deck 4 · Operaciones: `DAHOMdGjXW4` — https://www.canva.com/d/qovbtny4GyaWc9B
  - Deck 5 · Finanzas/KPIs: `DAHOMU5LKkI` — https://www.canva.com/d/LCZzcrWc4-3nbZX
  - Deck 6 · Innovación: `DAHOMbwI7uw` — https://www.canva.com/d/CUzFFxlv4bIhIMW
  - Deck 7 · Equipo: `DAHOMZanJ4o` — https://www.canva.com/d/153mAjqAIMn27Xs
- **Deck 8 (Cierre / Demo Day) — resuelto por fallback a PowerPoint (02-jul-2026).** `generate-design-structured` devolvió `User has reached their quota limit` en dos intentos separados (29-jun y 02-jul), el segundo incluso después de que Rolando borrara varios archivos de su cuenta Canva para intentar liberar espacio — esto confirma que es un límite de cuota de generación a nivel de cuenta, **no** un límite de almacenamiento/número de archivos, y por tanto no se resuelve borrando archivos. Ante el bloqueo persistente, Rolando autorizó explícitamente construir este deck en PowerPoint como alternativa ("Si no, lo haremos en Power pOint"). Se generó con `python-pptx` replicando la misma identidad visual que los 8 decks de Canva (azul marino `#1E3A5F` + dorado `#8C6300`, Lora en títulos, DM Sans en cuerpo, mismo patrón de portada/cierre en azul con barra dorada + slides de contenido en crema con barra lateral azul), 16 slides con el outline ya aprobado. Archivo entregado a Rolando por chat: `Deck8_Cierre_Demo_Day_Duenos_Libres.pptx`. Si en una sesión futura la cuota de Canva se reinicia, se puede regenerar en Canva con el mismo outline para mantener consistencia de formato con los otros 8, pero el .pptx ya es funcional y entregable tal cual.
- **Estado final Sprint 3: 9/9 decks completos** (8 en Canva + 1 en PowerPoint).

### Sprint 4 — Folleto digital de venta (07-jul-2026)

- **Pedido:** un one-pager para enviar por WhatsApp a un prospecto o alrededor de una Discovery Call — vista rápida + link a la landing para detalles/inscripción.
- **Producido:** `folleto_duenos_libres.html` (fuente editable, mismo brand azul/dorado + Lora/DM Sans) renderizado a PDF de una sola página carta con Playwright/Chromium (headless, ya preinstalado en el entorno; binario en `/opt/pw-browsers/chromium`, symlink directo — no usar rutas tipo `chromium/chrome-linux/chrome`).
- **Contenido condensado de la página de ventas v2:** hook, 3 Pilares en una línea c/u, checklist de qué se construye en 12 semanas, testimonio anónimo + stat de resultado (4-5% → 17% utilidad), chips de cohort (12 semanas · 8-10 lugares · arranque 1 ago), inversión (ambas opciones + garantía), CTA a Calendly/WhatsApp/email, cierre con link a `rolvi.page/duenos-libres`.
- **Archivo entregado a Rolando por chat:** `Folleto_Duenos_Libres.pdf`.
- **Fix (07-jul-2026):** el link `rolvi.page/duenos-libres` del pie del PDF quedó como texto plano en la v1 (no era hipervínculo); corregido a `<a href>` real.
- **Versión story para WhatsApp (07-jul-2026):** `story_duenos_libres.html` renderizado a `Story_Duenos_Libres.png` (1080×1920, formato vertical WhatsApp/Instagram), mismo contenido condensado a poster con los 3 contactos (Calendly, WhatsApp, página) legibles. **Limitación importante:** una imagen enviada por chat de WhatsApp no soporta links tocables (solo si se publica como Estado con sticker de link) — los contactos quedan como texto para copiar/escribir, no clicables. El PDF sí conserva los 3 como hipervínculos reales.
- **Bloqueante activo:** `rolvi.page/duenos-libres` aún NO está publicada (ver tarea pendiente #7 / Sprint 2 "Landing pública"). El link ya está bien formado mecánicamente pero hoy lleva a un 404 real. Repartir estos materiales con esa referencia solo tiene sentido una vez la landing esté viva, o se puede sustituir temporalmente por un link que sí funcione (p. ej. directo a Calendly) mientras tanto.

### Activos existentes (Drive fileIds)

Comercial / metodología:
- `1xBu79vAmlshSFkZChiKrUHx88ZMmAE0I` — `plan_liberacion_el_fundador_libre.docx` (plan 6 meses)
- `1I2d1-douUDfBN3RsyzvwUnMlKku2wVBU` — `pagina_ventas_el_fundador_libre.docx` (con placeholders `[NOMBRE]`, `[PRECIO]`)
- `1qL77dVfOu49paTMxaZCGuxihykLNuP8j9v1E4XaHi4A` — Script Discovery Call 20 min (gdoc)
- `11uNeeSWy9kxGiDoTvyyI8-61Pdh8OI5v3qfMWWMQYaM` — `Taller Profit Coach RV` (gslides, base de deck)

Operación de cohort:
- `1cfT3Wui4pO0REQtJZPQ1Mp-GwG0Xo58f` — `diagnostico_fundador_libre_v2.xlsx`
- `1eP3STHY_RHv4s7fXJ2o_P8em1t6_RnoT` — `life_assessment_fundador_libre v5.numbers` (v5 es la última; existen v1-v4 en xlsx)
- `16fioZHkW08-dp9lx4KTj9TYBe2_CVGKuD0PD5AJajyU` — `Guia_Coaching_Fundador` (gdoc)
- `1EvH3NZ6PnveyqbQKt1TrT6cjRh9McvnqDzwzYsgqwhA` — `Formato Sesion_Semanal` (gsheet)
- `1ApZluU5p_44LDpTTwt3NuhQSbHACnRllQA18PxfRmZY` — `Dashboard Coaching Fundador` (gsheet)
- `1HBqc0CNOFeM2xylYxAAMkj9eB6szohvE` — `dashboard_seguimiento_cohort.xlsx`
- `1lfUbAf7yDx0Ce7qEKzuXJM2tblVhWDZ88h5zEFIneUg` — `Archivo Maestro Alineamiento y Aceleración`

### Brechas a cerrar

1. Decidir nombre final + precio y rellenar placeholders de la página de ventas.
2. Deck modular del programa (hay taller intro, no deck por módulo).
3. Guion / contenido de las ~24 sesiones semanales (derivar de `Guia_Coaching_Fundador` + `Formato Sesion_Semanal`).
4. Landing pública + checkout (hoy la página existe como `.docx`).
5. Testimonios / casos para la sección de prueba social.

### Ruta sugerida — 4 sprints de 1 semana

- **S1 Cierre comercial:** nombre, precio, oferta; publicar landing.
- **S2 Deck modular:** una sección por dimensión PROFIT.
- **S3 Producción de módulos:** guiones de las 24 sesiones.
- **S4 Beta cohort:** abrir piloto con `dashboard_seguimiento_cohort`.

## Proyecto B — Algoritmo Personal (Saboteadores PI)

**Concepto ancla del usuario:** el sistema de creencias personal es un algoritmo que se entrena con lo que hacemos, escuchamos y creemos; el curso enseña a poner filtros y reprogramarlo, igual que se refina el algoritmo de una IA.

Estado: temprano. Piezas sueltas, sin estructura de curso ni carpeta dedicada en Drive todavía.

### Activos propios existentes

- `1QzBUMAHkZWgu4v9l_srpUOVPYg4N5BAVZPQvedc4KcA` — `Saboteadores_-_Evaluacion_1_a_5__ES-EN_` (45 afirmaciones del Saboteur Assessment traducidas ES/EN; recién creado). Es la **base del diagnóstico de entrada del curso**.
- `1S1uVRRJd93yDPBORhRX83T1kHy413UyLZVnfSgkMCzE` — `LOS SABOTEADORES INTERNOS v2`
- `1WeS_PaRNkMyDXLXfcm2inP7SgMGHwu-5T3kIsOtPzDE` — `LOS SABOTEADORES INTERNOS` (v1)

### Material de referencia de Positive Intelligence / PQ Coach (terceros, no redistribuir)

- `14yhuMriB1daZOfqfecN0Ww6lTcfdBleD` — `Saboteur Discovery Session Blueprint.pdf`
- `1T7MCSuRcAxr9KVom2p_20hb9p9glqEPeQLwdbPCuEDs` — `PQ Branded Slide Deck (Coach Use)`
- `1x0uQSvjAt3wzt7GR-O6b7RvFqk9W_uTahlJO9J6khMY` — `Stickler Saboteur PQ Coach Pods Session Guide`

### Outline propuesto

| Módulo | Idea ancla | Activo de partida |
|---|---|---|
| 0. Bienvenida + diagnóstico | "Tu sistema de creencias es un algoritmo. Vamos a auditarlo." | Evaluación ES/EN |
| 1. Inputs del algoritmo | Lo que ves, escuchas, lees y con quién te juntas | `LOS SABOTEADORES INTERNOS` v1/v2 |
| 2. Los 10 saboteadores como bugs | Mapeo PQ → "bugs recurrentes" | PQ Discovery Blueprint |
| 3. El Sabio (Sage) como compilador limpio | 5 poderes del Sage | PQ Slide Deck |
| 4. Filtros y firewall mental | Qué dejas entrar / qué bloqueas | Nuevo |
| 5. Reprogramación: PQ Reps 21 días | Práctica diaria | Nuevo |
| 6. Mantenimiento del algoritmo | Ritmo semanal + dashboard personal | Reusar `Formato Sesion_Semanal` |

### Próximos 3 pasos cuando el usuario quiera retomarlo

1. Crear carpeta `Algoritmo Personal` en Drive y mover ahí los 3 docs propios.
2. Redactar el manifiesto **"Tu sistema de creencias es un algoritmo"**.
3. El usuario toma el assessment PQ y usa su propio resultado como caso vivo del módulo 0.

## Entorno y MCPs esperados

El usuario opera con estos MCP conectados a esta sesión: **Google Drive, Gmail, Google Calendar, Canva, GitHub**. Usa el MCP de Drive para leer/crear documentos directamente con los fileIds de arriba. Si los MCP no están listos al iniciar, espera con `ToolSearch` antes de declarar una capacidad como no disponible.

## Reglas de operación en esta cuenta

- El idioma de trabajo con el usuario es **español**.
- No redistribuir el material de Positive Intelligence / PQ Coach: es soporte interno, no parte del producto.
- Antes de proponer trabajo sobre el Proyecto B, confirmar que el Proyecto A no necesita atención esa sesión.
- El usuario suele preferir entregables concretos (un doc nuevo, un módulo, un evento en calendario) sobre planes adicionales.

### Manejo de gdocs vivos en Drive (regla crítica)

El MCP de Drive no expone una operación de "editar in-place" de gdocs; `create_file` siempre genera un archivo nuevo. Esto históricamente provocó que regenerara el doc completo desde memoria y borrara las ediciones manuales de Rolando (caso vivido: cambio de precio en `pagina_ventas_duenos_libres_piloto_v2` reescrito 3 veces).

Regla a partir de ahora:

1. **Antes de cualquier "actualización" a un gdoc existente, leer su contenido actual con `mcp__Google_Drive__read_file_content`.** El doc vivo en Drive es la fuente de verdad, no la copia en memoria de la sesión.
2. Si solo hay que añadir un cambio puntual: pegárselo a Rolando en chat para que él lo aplique manualmente, o pedir permiso explícito antes de regenerar el doc.
3. Si Rolando autoriza regenerar, hacerlo partiendo del contenido leído de Drive, no de la versión que subí originalmente.
4. Nunca asumir que "mi última versión" sigue siendo la actual: entre turnos, Rolando edita directamente en Drive.
