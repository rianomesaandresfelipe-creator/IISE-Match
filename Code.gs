/* =========================================================
   IISE MATCH V3.0 — GOOGLE APPS SCRIPT
   Capítulo IISE 771 · Pontificia Universidad Javeriana
   Dashboard Ejecutivo & Sistema de Toma de Decisiones
========================================================= */

/* =========================================================
   CONFIGURACIÓN DE HOJAS
========================================================= */

const SHEET_DASHBOARD = "DASHBOARD (EJECUTIVO)";
const SHEET_RESPUESTAS = "RESPUESTAS";
const SHEET_PERFILES = "PERFILES";
const SHEET_RECOMENDACIONES = "RECOMENDACIONES";
const SHEET_ACTIVIDADES = "ACTIVIDADES";
const SHEET_METRICAS = "METRICAS";

/* =========================================================
   CREAR Y CONFIGURAR HOJAS
========================================================= */

function setupSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Crear hojas si faltan
  const dashboard = createSheetIfMissing(ss, SHEET_DASHBOARD);
  createSheetIfMissing(ss, SHEET_RESPUESTAS);
  createSheetIfMissing(ss, SHEET_PERFILES);
  createSheetIfMissing(ss, SHEET_RECOMENDACIONES);
  createSheetIfMissing(ss, SHEET_ACTIVIDADES);
  createSheetIfMissing(ss, SHEET_METRICAS);

  // Mover Dashboard al primer lugar
  ss.setActiveSheet(dashboard);
  ss.moveActiveSheet(1);

  // Configurar encabezados
  setupHeaders();
  
  // Generar o actualizar Dashboard Ejecutivo
  updateMetrics();
}

/* =========================================================
   CREAR HOJA SI NO EXISTE
========================================================= */

function createSheetIfMissing(ss, name) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  return sheet;
}

/* =========================================================
   ENCABEZADOS DE TABLAS BASE
========================================================= */

function setupHeaders() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  /* RESPUESTAS */
  const respuestas = ss.getSheetByName(SHEET_RESPUESTAS);
  if (respuestas.getLastRow() === 0) {
    respuestas.appendRow([
      "Fecha", "Carrera", "Semestre", "Experiencia",
      "Perfil Principal", "Afinidad Principal",
      "Perfil Secundario", "Afinidad Secundaria",
      "Perfil Terciario", "Afinidad Terciaria",
      "Objetivos", "Intereses", "Herramientas",
      "Tecnología", "Datos", "Negocios", "Liderazgo",
      "Operaciones", "Logística", "Innovación",
      "Escenario", "Rol Equipo", "Aprendizaje",
      "Modalidad", "Tipo Actividad",
      "Recomendación 1", "Recomendación 2", "Recomendación 3"
    ]);
    respuestas.getRange("1:1").setFontWeight("bold").setBackground("#084c76").setFontColor("#FFFFFF");
  }

  /* PERFILES */
  const perfiles = ss.getSheetByName(SHEET_PERFILES);
  if (perfiles.getLastRow() === 0) {
    perfiles.appendRow([
      "Fecha", "Carrera", "Semestre", "Perfil", "Perfil Key",
      "Afinidad %", "Segundo Perfil", "Segundo %", "Tercer Perfil", "Tercer %"
    ]);
    perfiles.getRange("1:1").setFontWeight("bold").setBackground("#084c76").setFontColor("#FFFFFF");
  }

  /* RECOMENDACIONES */
  const recomendaciones = ss.getSheetByName(SHEET_RECOMENDACIONES);
  if (recomendaciones.getLastRow() === 0) {
    recomendaciones.appendRow([
      "Fecha", "Carrera", "Perfil Principal", "Actividad Recomendada", "Tipo", "Categoría", "Prioridad"
    ]);
    recomendaciones.getRange("1:1").setFontWeight("bold").setBackground("#084c76").setFontColor("#FFFFFF");
  }

  /* ACTIVIDADES */
  const actividades = ss.getSheetByName(SHEET_ACTIVIDADES);
  if (actividades.getLastRow() === 0) {
    actividades.appendRow([
      "Actividad", "Tipo", "Categoría", "Perfiles Asignados", "Intereses", "Nivel Target", "Modalidad", "Cupos Estimados", "Estado", "Descripción"
    ]);
    actividades.getRange("1:1").setFontWeight("bold").setBackground("#084c76").setFontColor("#FFFFFF");

    const initialActivities = [
      ["Power BI para Toma de Decisiones", "Curso", "Datos", "data,business", "data,digital", "Todos", "Presencial", 30, "Activo", "Curso para transformar información en dashboards y apoyar decisiones."],
      ["Excel Avanzado & Macros", "Curso", "Datos", "data,operations", "data", "Todos", "Presencial", 30, "Activo", "Curso de análisis cuantitativo y automatización operativamente aplicable."],
      ["IA Generativa Aplicada a Negocios", "Taller", "Tecnología", "digital,business,builder", "technology,innovation", "Todos", "Híbrida", 30, "Activo", "Taller práctico de resolución de problemas empresariales con IA."],
      ["Taller de Negociación y Persuasión", "Curso", "Habilidades", "leader,business", "leadership,business", "Todos", "Presencial", 25, "Activo", "Desarrollo de liderazgo ejecutivo y comunicación estratégica."],
      ["Visita Empresarial a Centro Logístico", "Visita", "Experiencia", "explorer,operations,supply", "companies,logistics", "Todos", "Presencial", 30, "Activo", "Visita técnica a la cadena de suministro de una gran empresa."],
      ["Supply Chain & Logistics Masterclass", "Curso", "Logística", "supply,operations", "logistics,operations", "Todos", "Presencial", 30, "Activo", "Optimización de inventarios, distribución y redes de transporte."],
      ["Optimización y Lean Manufacturing", "Taller", "Operaciones", "operations,data,builder", "operations", "Todos", "Presencial", 25, "Activo", "Eliminación de desperdicios y diseño eficiente de procesos."],
      ["Networking & Coffeetalk con Líderes", "Experiencia", "Networking", "leader,explorer,business", "companies,leadership", "Todos", "Presencial", 40, "Activo", "Conexión directa entre estudiantes y profesionales de la industria."]
    ];
    actividades.getRange(2, 1, initialActivities.length, 10).setValues(initialActivities);
  }
}

/* =========================================================
   ENDPOINT POST PARA WEBSOCKET / API
========================================================= */

function doPost(e) {
  try {
    setupSheets();
    const data = JSON.parse(e.postData.contents);
    saveResponse(data);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: "Respuesta y Dashboard registrados correctamente." })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/* =========================================================
   GUARDAR RESPUESTA COMPLETA
========================================================= */

function saveResponse(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const answers = data.answers || {};

  // 1. Guardar en RESPUESTAS
  const responses = ss.getSheetByName(SHEET_RESPUESTAS);
  responses.appendRow([
    new Date(),
    data.career || "",
    data.semester || "",
    data.experience || "",
    data.primaryProfile || "",
    data.primaryAffinity || "",
    data.secondaryProfile || "",
    data.secondaryAffinity || "",
    data.tertiaryProfile || "",
    data.tertiaryAffinity || "",
    arrayToText(answers.objectives),
    arrayToText(answers.interests),
    arrayToText(answers.tools),
    answers.technology || "",
    answers.data || "",
    answers.business || "",
    answers.leadership || "",
    answers.operations || "",
    answers.logistics || "",
    answers.innovation || "",
    answers.scenario || "",
    answers.teamRole || "",
    arrayToText(answers.learning),
    answers.modality || "",
    answers.activity || "",
    data.recommendations?.[0] || "",
    data.recommendations?.[1] || "",
    data.recommendations?.[2] || ""
  ]);

  // 2. Guardar en PERFILES
  const perfiles = ss.getSheetByName(SHEET_PERFILES);
  perfiles.appendRow([
    new Date(),
    data.career || "",
    data.semester || "",
    data.primaryProfile || "",
    data.primaryProfileKey || "",
    data.primaryAffinity || "",
    data.secondaryProfile || "",
    data.secondaryAffinity || "",
    data.tertiaryProfile || "",
    data.tertiaryAffinity || ""
  ]);

  // 3. Guardar en RECOMENDACIONES
  const recomendaciones = ss.getSheetByName(SHEET_RECOMENDACIONES);
  (data.recommendations || []).forEach((activity, index) => {
    recomendaciones.appendRow([
      new Date(),
      data.career || "",
      data.primaryProfile || "",
      activity,
      index === 0 ? "Principal" : "Alternativa",
      "",
      index === 0 ? "Alta" : "Media"
    ]);
  });

  // 4. Actualizar automáticamente el Dashboard Ejecutivo y las Métricas
  updateMetrics();
}

/* =========================================================
   DASHBOARD EJECUTIVO Y SISTEMA DE TOMA DE DECISIONES
========================================================= */

function updateMetrics() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const dash = ss.getSheetByName(SHEET_DASHBOARD);
  const respSheet = ss.getSheetByName(SHEET_RESPUESTAS);

  dash.clear();
  dash.clearFormats();

  const lastRow = respSheet.getLastRow();
  const totalRespuestas = lastRow > 1 ? lastRow - 1 : 0;

  // ── 1. BANNER PRINCIPAL DE NAVEGACIÓN Y TITULO ──────────────
  dash.getRange("A1:H1").merge()
      .setValue("📊 IISE MATCH — DASHBOARD EJECUTIVO Y TOMA DE DECISIONES")
      .setFontSize(16)
      .setFontWeight("bold")
      .setBackground("#084c76")
      .setFontColor("#FFFFFF")
      .setHorizontalAlignment("center")
      .setVerticalAlignment("middle");

  dash.getRange("A2:H2").merge()
      .setValue("Pontificia Universidad Javeriana · Capítulo IISE 771 | Sistema de Análisis de Demanda Estudiantil en Tiempo Real")
      .setFontSize(9)
      .setFontStyle("italic")
      .setBackground("#050c14")
      .setFontColor("#DF951A")
      .setHorizontalAlignment("center");

  dash.setRowHeight(1, 40);
  dash.setRowHeight(2, 22);

  if (totalRespuestas === 0) {
    dash.getRange("A4:H5").merge()
        .setValue("⚠️ Aún no se han registrado respuestas. Cuando los estudiantes completen el test IISE Match, este dashboard se actualizará automáticamente con indicadores clave, distribuciones y sugerencias estratégicas.")
        .setFontSize(11)
        .setFontColor("#666666")
        .setHorizontalAlignment("center")
        .setVerticalAlignment("middle");

    // Limpiar también la pestaña secundaria METRICAS a cero
    updateLegacyMetricsSheet(0, {}, {}, {});
    return;
  }

  // Leer datos de Respuestas
  const rawData = respSheet.getRange(2, 1, totalRespuestas, 28).getValues();

  // Conteo de Perfiles
  const perfilesMap = {};
  // Conteo de Carreras
  const carrerasMap = {};
  // Conteo de Recomendaciones
  const recsMap = {};
  // Conteo de Modalidad
  const modalidadMap = {};

  rawData.forEach(row => {
    const perf = row[4]; // Perfil Principal
    if (perf) perfilesMap[perf] = (perfilesMap[perf] || 0) + 1;

    const car = row[1]; // Carrera
    if (car) carrerasMap[car] = (carrerasMap[car] || 0) + 1;

    const mod = row[23]; // Modalidad
    if (mod) modalidadMap[mod] = (modalidadMap[mod] || 0) + 1;

    for (let col = 25; col <= 27; col++) {
      const act = row[col];
      if (act) recsMap[act] = (recsMap[act] || 0) + 1;
    }
  });

  const topPerfil = getTopKey(perfilesMap);
  const topCarrera = getTopKey(carrerasMap);
  const topActividad = getTopKey(recsMap);

  // ── 2. TARJETAS KPI (SCORECARDS) ────────────────────────────
  renderKpiCard(dash, "A4:B5", "ESTUDIANTES ENCUESTADOS", totalRespuestas.toString(), "#084c76");
  renderKpiCard(dash, "C4:D5", "PERFIL PREDOMINANTE", topPerfil || "N/A", "#df951a");
  renderKpiCard(dash, "E4:F5", "CARRERA PRINCIPAL", topCarrera || "N/A", "#009fe3");
  renderKpiCard(dash, "G4:H5", "ACTIVIDAD MÁS DEMANDADA", topActividad || "N/A", "#2e7d32");

  dash.setRowHeight(4, 20);
  dash.setRowHeight(5, 30);

  // ── 3. INSIGHTS PARA LA JUNTA DIRECTIVA IISE ──────────────────
  dash.getRange("A7:H7").merge()
      .setValue("💡 DECISIONES ESTRATÉGICAS RECOMENDADAS PARA LA JUNTA DIRECTIVA DE IISE 771")
      .setFontSize(11)
      .setFontWeight("bold")
      .setBackground("#df951a")
      .setFontColor("#050c14")
      .setHorizontalAlignment("left")
      .setVerticalAlignment("middle");

  const insightText = generateExecutiveInsight(totalRespuestas, topPerfil, topCarrera, topActividad, recsMap);
  dash.getRange("A8:H9").merge()
      .setValue(insightText)
      .setFontSize(10)
      .setBackground("#fdf8ed")
      .setFontColor("#333333")
      .setVerticalAlignment("top")
      .setWrap(true);

  // ── 4. TABLA: DEMANDA POR ACTIVIDADES (OFERTA ACADÉMICA) ──────
  let currRow = 11;
  dash.getRange(currRow, 1, 1, 4).merge()
      .setValue("📌 DEMANDA POR ACTIVIDADES Y TALLERES IISE")
      .setFontWeight("bold")
      .setBackground("#084c76")
      .setFontColor("#FFFFFF");

  currRow++;
  dash.getRange(currRow, 1, 1, 4).setValues([["Actividades Recomendadas", "Categoría Estudiantil", "Total Solicitudes", "% Demanda"]])
      .setFontWeight("bold").setBackground("#e0f2fe").setFontColor("#084c76");

  const sortedRecs = Object.entries(recsMap).sort((a, b) => b[1] - a[1]);
  sortedRecs.forEach(([act, count]) => {
    currRow++;
    const pct = count / (totalRespuestas * 3);
    dash.getRange(currRow, 1, 1, 4).setValues([[act, "Oferta Recomendada", count, pct]]);
  });

  // ── 5. TABLA: DISTRIBUCIÓN POR PERFILES ESTUDIANTILES ─────────
  let colStart = 5;
  let perfRow = 11;
  dash.getRange(perfRow, colStart, 1, 4).merge()
      .setValue("👤 DISTRIBUCIÓN POR PERFIL PROFESIONAL DE ESTUDIANTES")
      .setFontWeight("bold")
      .setBackground("#084c76")
      .setFontColor("#FFFFFF");

  perfRow++;
  dash.getRange(perfRow, colStart, 1, 4).setValues([["Perfil Inteligente", "Interés Clave", "Estudiantes", "% del Total"]])
      .setFontWeight("bold").setBackground("#fef3c7").setFontColor("#92400e");

  const sortedProfiles = Object.entries(perfilesMap).sort((a, b) => b[1] - a[1]);
  sortedProfiles.forEach(([name, count]) => {
    perfRow++;
    const pct = count / totalRespuestas;
    dash.getRange(perfRow, colStart, 1, 4).setValues([[name, "Fortaleza Identificada", count, pct]]);
  });

  // ── 6. TABLA: PARTICIPACIÓN POR CARRERA Y SEMESTRE ────────────
  const maxTableEnd = Math.max(currRow, perfRow) + 2;
  dash.getRange(maxTableEnd, 1, 1, 4).merge()
      .setValue("🎓 PARTICIPACIÓN POR CARRERA UNIVERSITARIA")
      .setFontWeight("bold")
      .setBackground("#084c76")
      .setFontColor("#FFFFFF");

  let carRow = maxTableEnd + 1;
  dash.getRange(carRow, 1, 1, 4).setValues([["Programa Académico", "Facultad / Área", "Estudiantes Encuestados", "% Participación"]])
      .setFontWeight("bold").setBackground("#e0f2fe").setFontColor("#084c76");

  const sortedCareers = Object.entries(carrerasMap).sort((a, b) => b[1] - a[1]);
  sortedCareers.forEach(([car, count]) => {
    carRow++;
    const pct = count / totalRespuestas;
    dash.getRange(carRow, 1, 1, 4).setValues([[car, "Javeriana Bogotá", count, pct]]);
  });

  // Formatear porcentajes y bordes
  dash.getRange("D13:D" + currRow).setNumberFormat("0.0%");
  dash.getRange("H13:H" + perfRow).setNumberFormat("0.0%");
  dash.getRange("D" + (maxTableEnd + 2) + ":D" + carRow).setNumberFormat("0.0%");

  // Autoajuste de columnas
  dash.autoResizeColumns(1, 8);

  // Sincronizar también la hoja secundaria de Métricas simples
  updateLegacyMetricsSheet(totalRespuestas, perfilesMap, carrerasMap, recsMap);
}

/* =========================================================
   HELPERS & GENERACIÓN DE INSIGHTS
========================================================= */

function getTopKey(map) {
  let topKey = "";
  let maxCount = -1;
  for (const key in map) {
    if (map[key] > maxCount) {
      maxCount = map[key];
      topKey = key;
    }
  }
  return topKey;
}

function renderKpiCard(sheet, rangeStr, label, value, colorHex) {
  const range = sheet.getRange(rangeStr);
  range.setBackground("#ffffff")
       .setBorder(true, true, true, true, false, false, colorHex, SpreadsheetApp.BorderStyle.SOLID_MEDIUM);

  const topCell = sheet.getRange(rangeStr.split(":")[0]);
  topCell.setValue(label).setFontSize(8).setFontWeight("bold").setFontColor("#666666").setHorizontalAlignment("center");

  const bottomCell = sheet.getRange(rangeStr.split(":")[1]);
  bottomCell.setValue(value).setFontSize(14).setFontWeight("bold").setFontColor(colorHex).setHorizontalAlignment("center");
}

function generateExecutiveInsight(total, topPerfil, topCarrera, topActividad, recsMap) {
  let insights = [];
  insights.push(`• Muestra Total: ${total} estudiantes han completado el diagnóstico IISE Match.`);
  
  if (topActividad) {
    insights.push(`• Prioridad de Oferta: La actividad más solicitada es "${topActividad}". Se recomienda coordinar fecha y logística como evento prioritario del semestre.`);
  }

  if (topPerfil) {
    insights.push(`• Perfil Predominante: La mayoría de estudiantes tienen inclinación por "${topPerfil}". Adaptar los ejemplos y casos de estudio a este enfoque.`);
  }

  if (topCarrera) {
    insights.push(`• Audiencia Clave: Mayor representación del programa de "${topCarrera}". Se sugiere promocionar a través de los representantes de este programa.`);
  }

  insights.push(`• Decisión de Cupos: Monitorear actividades con más del 20% de solicitudes para considerar habilitar cohortes secundarias.`);

  return insights.join("\n");
}

function updateLegacyMetricsSheet(total, perfiles, carreras, recs) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_METRICAS);
  sheet.clear();

  sheet.appendRow(["INDICADOR", "CANTIDAD"]);
  sheet.appendRow(["Estudiantes Encuestados", total]);
  sheet.appendRow(["", ""]);

  sheet.appendRow(["DISTRIBUCIÓN DE PERFILES", ""]);
  Object.entries(perfiles).sort((a,b) => b[1] - a[1]).forEach(([k,v]) => sheet.appendRow([k, v]));

  sheet.appendRow(["", ""]);
  sheet.appendRow(["DISTRIBUCIÓN DE CARRERAS", ""]);
  Object.entries(carreras).sort((a,b) => b[1] - a[1]).forEach(([k,v]) => sheet.appendRow([k, v]));

  sheet.appendRow(["", ""]);
  sheet.appendRow(["DEMANDA DE ACTIVIDADES", ""]);
  Object.entries(recs).sort((a,b) => b[1] - a[1]).forEach(([k,v]) => sheet.appendRow([k, v]));

  sheet.getRange("1:1").setFontWeight("bold").setBackground("#084c76").setFontColor("#FFFFFF");
  sheet.autoResizeColumns(1, 2);
}

function arrayToText(value) {
  if (!value) return "";
  if (Array.isArray(value)) return value.join(" | ");
  return String(value);
}

/* =========================================================
   BORRAR DATOS DE PRUEBA (REINICIAR BASE DE DATOS)
========================================================= */

function clearDatabase() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert(
    "⚠️ REINICIAR BASE DE DATOS DE IISE MATCH",
    "¿Estás seguro de que deseas borrar TODAS las respuestas, perfiles y recomendaciones de prueba registrados en esta hoja?\n\nEsta acción dejará la base de datos limpia a 0 para el lanzamiento oficial a los estudiantes.",
    ui.ButtonSet.YES_NO
  );

  if (response === ui.Button.YES) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // Limpiar RESPUESTAS
    const respuestas = ss.getSheetByName(SHEET_RESPUESTAS);
    if (respuestas && respuestas.getLastRow() > 1) {
      respuestas.getRange(2, 1, respuestas.getLastRow() - 1, respuestas.getLastColumn()).clearContent();
    }

    // Limpiar PERFILES
    const perfiles = ss.getSheetByName(SHEET_PERFILES);
    if (perfiles && perfiles.getLastRow() > 1) {
      perfiles.getRange(2, 1, perfiles.getLastRow() - 1, perfiles.getLastColumn()).clearContent();
    }

    // Limpiar RECOMENDACIONES
    const recomendaciones = ss.getSheetByName(SHEET_RECOMENDACIONES);
    if (recomendaciones && recomendaciones.getLastRow() > 1) {
      recomendaciones.getRange(2, 1, recomendaciones.getLastRow() - 1, recomendaciones.getLastColumn()).clearContent();
    }

    // Limpiar METRICAS
    const metricas = ss.getSheetByName(SHEET_METRICAS);
    if (metricas && metricas.getLastRow() > 1) {
      metricas.getRange(2, 1, metricas.getLastRow() - 1, metricas.getLastColumn()).clearContent();
    }

    // Recalcular Dashboard a cero
    updateMetrics();

    ui.alert(
      "✅ BASE DE DATOS REINICIADA",
      "Todos los datos de prueba han sido borrados con éxito. El Dashboard y las pestañas han quedado limpias a cero para recibir las respuestas reales de los estudiantes.",
      ui.ButtonSet.OK
    );
  }
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("IISE Match")
    .addItem("📊 Preparar base de datos & Dashboard", "setupSheets")
    .addItem("🔄 Actualizar métricas e Insights", "updateMetrics")
    .addSeparator()
    .addItem("🗑️ Borrar datos de prueba (Reiniciar a 0)", "clearDatabase")
    .addToUi();
}
