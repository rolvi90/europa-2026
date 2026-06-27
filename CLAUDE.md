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
- **Pricing (USD, Opción A):** pago único pronto pago USD 2,997 · plan a 3 mensualidades USD 1,097.
- **Brief de oferta aprobado:** `1wVdVQusmUiCFN-KDl8Sxhr3A3SYLVagdQAmQf_E4qek` — *Sprint 1 - Oferta Dueños Libres Piloto (aprobada)*.
- **Página de ventas v1 (gdoc):** `158BHhDRQIfc4-yv3Xf7jC5OXu3HJ-LxMLXJSrr1TxSc` — *pagina_ventas_duenos_libres_piloto_v1*. Sustituye al `.docx` viejo.
- **Página de ventas v2 (gdoc, lista para publicar):** `1tyTcovahrIH-_paWsfnhyiD6d-Iei-7jdF_Aa7qV9Ms` — *pagina_ventas_duenos_libres_piloto_v2*. Incluye testimonio de Alfonso M., bio fusionada con la voz de `rolvi.page` (ángulo "40 años / cicatrices"), datos de contacto reales y CTA a Calendly de 30 min.
- **Bloques Discovery Call agendados (America/Mexico_City):** lunes 6-jul 10-12h · lunes 13-jul 16-18h · lunes 20-jul 10-12h (último).
- **Datos de contacto activos:**
  - Calendly: https://calendly.com/rolando-villarreal/30min (Discovery Call 30 min)
  - WhatsApp: https://wa.me/528661123135
  - Email: coaching@rolvi.page
  - LinkedIn: https://www.linkedin.com/in/rolandomvillarreal
- **Landing pública:** vivirá como subpágina dentro de `rolvi.page` (URL objetivo: `rolvi.page/duenos-libres`). No duplicar foto ni bio: ya viven en `rolvi.page`. El repo del sitio rolvi.page vive en OTRO repositorio (sesión separada "Landing page domain deployment").
- **Confirmaciones aún abiertas:** (1) ¿OK con "Alfonso M." como firma del testimonio o vamos a anónimo total? (2) ¿Confirmamos URL final `rolvi.page/duenos-libres` o se mete en otra ruta?

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
