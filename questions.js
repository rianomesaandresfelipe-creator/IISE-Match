/* ============================================================
   IISE MATCH — Questions Database with Adaptive Branching
   Pontificia Universidad Javeriana · Capítulo IISE 771
   ============================================================ */

const QUESTIONS = [
  /* ── MODULE A: BASE CORE QUESTIONS (Always Included) ───────────────── */
  {
    id: 'q1',
    module: 'A',
    type: 'dropdown',
    required: true,
    question: '¿Qué carrera estudias?',
    options: [
      { id: 'q1_1', text: 'Ingeniería Industrial', scores: { D:0, T:0, E:0, L:0, O:1, S:1, X:0, P:0 }, tags: [] },
      { id: 'q1_2', text: 'Ingeniería de Sistemas y Computación', scores: { D:1, T:2, E:0, L:0, O:0, S:0, X:0, P:0 }, tags: [] },
      { id: 'q1_3', text: 'Ingeniería Civil', scores: { D:0, T:0, E:0, L:0, O:1, S:0, X:0, P:0 }, tags: [] },
      { id: 'q1_4', text: 'Ingeniería Electrónica', scores: { D:1, T:2, E:0, L:0, O:0, S:0, X:0, P:0 }, tags: [] },
      { id: 'q1_5', text: 'Ingeniería Biomédica', scores: { D:1, T:1, E:0, L:0, O:1, S:0, X:0, P:0 }, tags: [] },
      { id: 'q1_6', text: 'Ingeniería Ambiental', scores: { D:0, T:0, E:0, L:0, O:1, S:0, X:0, P:0 }, tags: [] },
      { id: 'q1_7', text: 'Ingeniería Química', scores: { D:0, T:0, E:0, L:0, O:1, S:0, X:0, P:0 }, tags: [] },
      { id: 'q1_8', text: 'Administración de Empresas', scores: { D:0, T:0, E:2, L:1, O:0, S:0, X:1, P:0 }, tags: [] },
      { id: 'q1_9', text: 'Economía', scores: { D:1, T:0, E:2, L:0, O:0, S:0, X:0, P:0 }, tags: [] },
      { id: 'q1_10', text: 'Finanzas y Comercio Internacional', scores: { D:1, T:0, E:2, L:0, O:0, S:1, X:1, P:0 }, tags: [] },
      { id: 'q1_11', text: 'Contaduría Pública', scores: { D:1, T:0, E:1, L:0, O:1, S:0, X:0, P:0 }, tags: [] },
      { id: 'q1_12', text: 'Comunicación Social', scores: { D:0, T:0, E:0, L:2, O:0, S:0, X:1, P:1 }, tags: [] },
      { id: 'q1_13', text: 'Diseño Industrial', scores: { D:0, T:1, E:0, L:0, O:1, S:0, X:0, P:2 }, tags: [] },
      { id: 'q1_14', text: 'Diseño Gráfico', scores: { D:0, T:1, E:0, L:0, O:0, S:0, X:0, P:2 }, tags: [] },
      { id: 'q1_15', text: 'Derecho', scores: { D:0, T:0, E:1, L:2, O:0, S:0, X:1, P:0 }, tags: [] },
      { id: 'q1_16', text: 'Psicología', scores: { D:0, T:0, E:0, L:2, O:0, S:0, X:1, P:0 }, tags: [] },
      { id: 'q1_26', text: 'Otra carrera', scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:0, P:0 }, tags: [] }
    ]
  },
  {
    id: 'q2',
    module: 'A',
    type: 'select',
    required: true,
    question: '¿En qué semestre estás?',
    options: [
      { id: 'q2_1', text: '1-2', scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:1, P:0 }, tags: [] },
      { id: 'q2_2', text: '3-4', scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:0, P:0 }, tags: [] },
      { id: 'q2_3', text: '5-6', scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:0, P:0 }, tags: [] },
      { id: 'q2_4', text: '7-8', scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:0, P:0 }, tags: [] },
      { id: 'q2_5', text: '9 en adelante', scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:0, P:0 }, tags: [] }
    ]
  },
  {
    id: 'q3',
    module: 'A',
    type: 'select',
    required: true,
    question: '¿Cuál es tu experiencia previa con IISE?',
    options: [
      { id: 'q3_1', text: 'Nunca he participado', scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:1, P:0 }, tags: [] },
      { id: 'q3_2', text: 'Sí, participé una vez en un evento o visita', scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:1, P:0 }, tags: [] },
      { id: 'q3_3', text: 'Sí, he asistido a varias actividades', scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:0, P:1 }, tags: [] },
      { id: 'q3_4', text: 'Soy miembro o me gustaría ser parte de la junta', scores: { D:0, T:0, E:1, L:2, O:0, S:0, X:0, P:1 }, tags: [] }
    ]
  },
  {
    id: 'q4',
    module: 'A',
    type: 'multiselect',
    maxSelections: 3,
    required: true,
    question: '¿Cuál es tu objetivo principal al unirte a las actividades de IISE?',
    subtitle: 'Elige hasta 3 opciones principales',
    options: [
      { id: 'q4_1', text: 'Aprender herramientas técnicas para enriquecer mi hoja de vida', scores: { D:3, T:2, E:1, L:0, O:1, S:0, X:0, P:1 }, tags: ["herramienta","hoja_de_vida"] },
      { id: 'q4_2', text: 'Conocer operaciones de empresas reales por dentro (visitas técnicas)', scores: { D:0, T:1, E:1, L:0, O:1, S:2, X:3, P:0 }, tags: ["visita","empresa"] },
      { id: 'q4_3', text: 'Conectar con profesionales e ingenieros de la industria', scores: { D:0, T:0, E:1, L:2, O:0, S:1, X:3, P:0 }, tags: ["networking"] },
      { id: 'q4_4', text: 'Desarrollar habilidades de liderazgo, comunicación y negociación', scores: { D:0, T:0, E:1, L:3, O:0, S:0, X:0, P:1 }, tags: ["liderazgo","comunicacion"] },
      { id: 'q4_5', text: 'Aprender sobre tecnología e inteligencia artificial', scores: { D:1, T:3, E:1, L:0, O:1, S:0, X:0, P:1 }, tags: ["tecnologia","ia"] },
      { id: 'q4_6', text: 'Resolver casos reales y problemas de consultoría empresarial', scores: { D:2, T:1, E:2, L:1, O:2, S:1, X:1, P:2 }, tags: ["practica","casos"] },
      { id: 'q4_7', text: 'Prepararme para mi práctica profesional o primer empleo', scores: { D:1, T:1, E:1, L:1, O:1, S:1, X:2, P:1 }, tags: ["practicas"] }
    ]
  },
  {
    id: 'q5',
    module: 'B',
    type: 'multiselect',
    maxSelections: 3,
    required: true,
    question: '¿Cuáles de estas áreas representan tus mayores intereses de aprendizaje?',
    subtitle: 'Tus respuestas personalizarán las siguientes preguntas',
    options: [
      { id: 'q5_1', text: '📊 Análisis de datos, dashboards y Business Intelligence', scores: { D:3, T:1, E:1, L:0, O:1, S:0, X:0, P:0 }, tags: ["datos","analitica"] },
      { id: 'q5_2', text: '🤖 Inteligencia Artificial, automatización y tecnología', scores: { D:1, T:3, E:1, L:0, O:1, S:0, X:0, P:1 }, tags: ["ia","automatizacion"] },
      { id: 'q5_3', text: '🚚 Logística, abastecimiento y Cadena de Suministro (Supply Chain)', scores: { D:0, T:0, E:1, L:0, O:2, S:3, X:1, P:0 }, tags: ["logistica","supply_chain"] },
      { id: 'q5_4', text: '🤝 Liderazgo, manejo de equipos y habilidades interpersonales', scores: { D:0, T:0, E:1, L:3, O:0, S:0, X:1, P:2 }, tags: ["liderazgo","equipos"] },
      { id: 'q5_5', text: '📈 Estrategia empresarial, finanzas y modelos de negocio', scores: { D:1, T:0, E:3, L:1, O:1, S:1, X:0, P:1 }, tags: ["estrategia","negocios"] },
      { id: 'q5_6', text: '⚙️ Optimización de procesos, Lean Manufacturing y productividad', scores: { D:1, T:1, E:1, L:0, O:3, S:2, X:0, P:1 }, tags: ["lean","optimizacion"] },
      { id: 'q5_7', text: '🏢 Visitas empresariales y networking con ejecutivos', scores: { D:0, T:0, E:1, L:1, O:0, S:1, X:3, P:0 }, tags: ["visita","networking"] }
    ]
  },

  /* ── MODULE B: ADAPTIVE SPECIALIST BRANCHES (Dynamically Triggered) ─── */

  /* ── RAMA 1: DATOS & ANALÍTICA ── */
  {
    id: 'q_data_focus',
    branch: 'data',
    module: 'B',
    type: 'select',
    required: true,
    question: '🎯 [Especialidad Datos] ¿Qué tipo de proyectos con datos te gustaría construir?',
    condition: (answers, interests) => interests.includes('q5_1') || (answers.q4 && answers.q4.includes('q4_1')),
    options: [
      { id: 'qdf_1', text: 'Dashboards ejecutivos e interactivos en Power BI para toma de decisiones', scores: { D:3, T:1, E:2, L:0, O:1, S:1, X:0, P:0 }, tags: ["power_bi","dashboards"] },
      { id: 'qdf_2', text: 'Modelos predictivos y análisis avanzado con Python y Machine Learning', scores: { D:3, T:3, E:0, L:0, O:1, S:0, X:0, P:1 }, tags: ["python","predictivo"] },
      { id: 'qdf_3', text: 'Consultas y estructuración de bases de datos masivas con SQL', scores: { D:3, T:2, E:0, L:0, O:0, S:1, X:0, P:0 }, tags: ["sql","bases_datos"] },
      { id: 'qdf_4', text: 'Automatización de reportes financieros y operativos con Excel Avanzado & Macros', scores: { D:3, T:1, E:1, L:0, O:2, S:1, X:0, P:0 }, tags: ["excel_avanzado","reportes"] }
    ]
  },
  {
    id: 'q_data_tool',
    branch: 'data',
    module: 'B',
    type: 'multiselect',
    maxSelections: 3,
    required: true,
    question: '🛠️ [Herramientas de Datos] ¿Qué herramientas deseas certificar o dominar primero?',
    condition: (answers, interests) => interests.includes('q5_1') || (answers.q4 && answers.q4.includes('q4_1')),
    options: [
      { id: 'qdt_1', text: 'Power BI para analítica visual', scores: { D:3, T:1, E:1, L:0, O:0, S:0, X:0, P:0 }, tags: ["power_bi"] },
      { id: 'qdt_2', text: 'Excel Avanzado y VBA', scores: { D:3, T:0, E:1, L:0, O:1, S:1, X:0, P:0 }, tags: ["excel"] },
      { id: 'qdt_3', text: 'Python aplicado a Analytics', scores: { D:3, T:3, E:0, L:0, O:0, S:0, X:0, P:1 }, tags: ["python"] },
      { id: 'qdt_4', text: 'SQL para extracción de datos', scores: { D:3, T:2, E:0, L:0, O:0, S:0, X:0, P:0 }, tags: ["sql"] }
    ]
  },

  /* ── RAMA 2: LOGÍSTICA & SUPPLY CHAIN ── */
  {
    id: 'q_supply_focus',
    branch: 'supply',
    module: 'B',
    type: 'select',
    required: true,
    question: '🚚 [Especialidad Logística] ¿En qué área de la Cadena de Suministro quisieras profundizar?',
    condition: (answers, interests, career) => interests.includes('q5_3') || career === 'q1_1' || career === 'q1_10',
    options: [
      { id: 'qsf_1', text: 'Gestión y diseño de Centros de Distribución (CEDIS) y almacenes modernos', scores: { D:1, T:1, E:1, L:0, O:2, S:3, X:1, P:0 }, tags: ["almacenes","cedis"] },
      { id: 'qsf_2', text: 'Optimización de rutas de transporte, flotas y distribución de última milla', scores: { D:2, T:1, E:1, L:0, O:1, S:3, X:0, P:1 }, tags: ["transporte","ruteo"] },
      { id: 'qsf_3', text: 'Pronóstico de demanda, planeación de ventas y control de inventarios (S&OP)', scores: { D:2, T:0, E:2, L:0, O:2, S:3, X:0, P:0 }, tags: ["inventarios","demanda"] },
      { id: 'qsf_4', text: 'Abastecimiento internacional, compras estratégicas y negociación con proveedores', scores: { D:0, T:0, E:2, L:2, O:0, S:3, X:1, P:0 }, tags: ["compras","proveedores"] }
    ]
  },
  {
    id: 'q_supply_exp',
    branch: 'supply',
    module: 'B',
    type: 'select',
    required: true,
    question: '📦 [Experiencia Logística] ¿Qué tipo de experiencia práctica te resultaría más valiosa?',
    condition: (answers, interests, career) => interests.includes('q5_3') || career === 'q1_1',
    options: [
      { id: 'qse_1', text: 'Visita técnica presencial a la operación logística de una multinacional líder', scores: { D:0, T:1, E:1, L:0, O:1, S:3, X:3, P:0 }, tags: ["visita_logistica"] },
      { id: 'qse_2', text: 'Resolución de un caso real de simulación de cadena de suministro en equipo', scores: { D:2, T:1, E:2, L:1, O:2, S:3, X:0, P:2 }, tags: ["simulacion_logistica"] },
      { id: 'qse_3', text: 'Masterclass con un Gerente o Director de Operaciones y Supply Chain', scores: { D:0, T:0, E:2, L:1, O:1, S:2, X:2, P:0 }, tags: ["masterclass_supply"] }
    ]
  },

  /* ── RAMA 3: TECNOLOGÍA & IA ── */
  {
    id: 'q_tech_focus',
    branch: 'tech',
    module: 'B',
    type: 'select',
    required: true,
    question: '🤖 [Especialidad IA & Tech] ¿Qué aplicación tecnológica quieres dominar primero?',
    condition: (answers, interests, career) => interests.includes('q5_2') || career === 'q1_2' || career === 'q1_4',
    options: [
      { id: 'qtf_1', text: 'Agentes de Inteligencia Artificial y Prompt Engineering para optimizar tareas de negocios', scores: { D:1, T:3, E:2, L:0, O:1, S:0, X:0, P:2 }, tags: ["agentes_ia","prompting"] },
      { id: 'qtf_2', text: 'Automatización de procesos de negocio sin código (Herramientas No-Code / Zapier)', scores: { D:1, T:3, E:1, L:0, O:3, S:1, X:0, P:1 }, tags: ["nocode","automatizacion"] },
      { id: 'qtf_3', text: 'Fundamentos de Machine Learning y Ciencia de Datos aplicada', scores: { D:3, T:3, E:0, L:0, O:0, S:0, X:0, P:1 }, tags: ["machine_learning"] },
      { id: 'qtf_4', text: 'Estrategias de Transformación Digital y Adopción Tecnológica en empresas', scores: { D:1, T:2, E:3, L:1, O:1, S:0, X:1, P:1 }, tags: ["transformacion_digital"] }
    ]
  },

  /* ── RAMA 4: LIDERAZGO & HABILIDADES PROFESIONALES ── */
  {
    id: 'q_lead_focus',
    branch: 'lead',
    module: 'B',
    type: 'select',
    required: true,
    question: '🤝 [Especialidad Liderazgo] ¿Qué competencia interpersonal buscas potenciar?',
    condition: (answers, interests) => interests.includes('q5_4') || (answers.q4 && answers.q4.includes('q4_4')),
    options: [
      { id: 'qlf_1', text: 'Técnicas de negociación estratégica y persuasión en acuerdos de negocios', scores: { D:0, T:0, E:2, L:3, O:0, S:1, X:1, P:0 }, tags: ["negociacion_avanzada"] },
      { id: 'qlf_2', text: 'Liderazgo inspirador y gestión efectiva de equipos de alto desempeño', scores: { D:0, T:0, E:1, L:3, O:1, S:0, X:0, P:2 }, tags: ["liderazgo_equipos"] },
      { id: 'qlf_3', text: 'Oratoria de alto impacto y comunicación persuasiva en presentaciones', scores: { D:0, T:0, E:1, L:3, O:0, S:0, X:2, P:1 }, tags: ["oratoria"] },
      { id: 'qlf_4', text: 'Inteligencia emocional y resolución constructiva de conflictos', scores: { D:0, T:0, E:1, L:3, O:0, S:0, X:1, P:0 }, tags: ["gestion_conflictos"] }
    ]
  },

  /* ── RAMA 5: ESTRATEGIA & EMPRENDIMIENTO ── */
  {
    id: 'q_strat_focus',
    branch: 'strat',
    module: 'B',
    type: 'select',
    required: true,
    question: '📈 [Especialidad Estrategia] ¿Qué tipo de decisiones gerenciales te entusiasma más analizar?',
    condition: (answers, interests, career) => interests.includes('q5_5') || career === 'q1_8' || career === 'q1_9',
    options: [
      { id: 'qsf_1', text: 'Evaluación de proyectos de inversión y rentabilidad financiera de nuevos productos', scores: { D:2, T:0, E:3, L:0, O:1, S:0, X:0, P:1 }, tags: ["finanzas","rentabilidad"] },
      { id: 'qsf_2', text: 'Consultoría de negocios: Diagnóstico de fallas y recomendación de crecimiento', scores: { D:1, T:1, E:3, L:1, O:2, S:1, X:1, P:2 }, tags: ["consultoria"] },
      { id: 'qsf_3', text: 'Diseño de modelos de negocio innovadores para Startups y emprendimientos', scores: { D:0, T:2, E:2, L:1, O:0, S:0, X:0, P:3 }, tags: ["startups","modelos_negocio"] }
    ]
  },

  /* ── RAMA 6: OPTIMIZACIÓN DE PROCESOS ── */
  {
    id: 'q_ops_focus',
    branch: 'ops',
    module: 'B',
    type: 'select',
    required: true,
    question: '⚙️ [Especialidad Operaciones] ¿En qué metodología de optimización te gustaría entrenarte?',
    condition: (answers, interests, career) => interests.includes('q5_6') || career === 'q1_1',
    options: [
      { id: 'qof_1', text: 'Filosofía Lean Manufacturing, 5S y eliminación de desperdicios (Muda)', scores: { D:1, T:0, E:1, L:0, O:3, S:2, X:0, P:0 }, tags: ["lean","5s"] },
      { id: 'qof_2', text: 'Mapeo de Cadena de Valor (Value Stream Mapping - VSM) y reducción de tiempos', scores: { D:1, T:1, E:1, L:0, O:3, S:2, X:0, P:1 }, tags: ["vsm","tiempos"] },
      { id: 'qof_3', text: 'Simulación computacional de líneas de producción y cuellos de botella', scores: { D:2, T:2, E:0, L:0, O:3, S:1, X:0, P:1 }, tags: ["simulacion_procesos"] }
    ]
  },

  /* ── MODULE C & D: GENERAL CLOSING QUESTIONS (For final profile matching) ─── */
  {
    id: 'q9',
    module: 'C',
    type: 'select',
    required: true,
    question: 'Si tuvieras que elegir SOLO UNA experiencia para este mes, elegirías:',
    options: [
      { id: 'q9_1', text: 'Un curso práctico para certificar una herramienta clave', scores: { D:2, T:1, E:1, L:0, O:1, S:1, X:0, P:1 }, tags: ["curso"] },
      { id: 'q9_2', text: 'Un taller intensivo donde resuelvo casos reales de empresas', scores: { D:2, T:1, E:2, L:0, O:2, S:1, X:0, P:2 }, tags: ["taller","casos"] },
      { id: 'q9_3', text: 'Una visita técnica presencial para ver operaciones reales por dentro', scores: { D:0, T:1, E:1, L:0, O:1, S:2, X:3, P:0 }, tags: ["visita"] },
      { id: 'q9_4', text: 'Un espacio exclusivo de Coffeetalk / Networking con ejecutivos', scores: { D:0, T:0, E:1, L:2, O:0, S:0, X:3, P:0 }, tags: ["networking"] },
      { id: 'q9_5', text: 'Un reto o hackathon empresarial en equipo con premios', scores: { D:1, T:2, E:2, L:1, O:1, S:0, X:1, P:3 }, tags: ["reto","competencia"] }
    ]
  },
  {
    id: 'q15',
    module: 'D',
    type: 'multiselect',
    maxSelections: 2,
    required: true,
    question: '¿Cómo sientes que aprendes de manera más efectiva?',
    subtitle: 'Elige hasta 2 opciones',
    options: [
      { id: 'q15_1', text: 'Ejercicios prácticos paso a paso', scores: { D:1, T:1, E:0, L:0, O:1, S:0, X:0, P:0 }, tags: ["practico"], modifier: "taller" },
      { id: 'q15_2', text: 'Analizando casos de empresas reales', scores: { D:1, T:0, E:2, L:0, O:1, S:1, X:0, P:1 }, tags: ["casos"], modifier: "caso_empresarial" },
      { id: 'q15_3', text: 'Visitando instalaciones reales in-situ', scores: { D:0, T:0, E:1, L:0, O:1, S:2, X:3, P:0 }, tags: ["visita"], modifier: "visita" },
      { id: 'q15_4', text: 'Discutiendo y debatiendo en grupos con profesionales', scores: { D:0, T:0, E:1, L:2, O:0, S:0, X:2, P:0 }, tags: ["social"], modifier: "networking" },
      { id: 'q15_5', text: 'Construyendo o creando un proyecto desde cero', scores: { D:1, T:2, E:1, L:1, O:1, S:0, X:0, P:3 }, tags: ["creativo"], modifier: "taller" }
    ]
  },
  {
    id: 'q16',
    module: 'D',
    type: 'select',
    required: true,
    question: '¿En qué modalidad prefieres participar en las actividades del capítulo?',
    options: [
      { id: 'q16_1', text: 'Presencial (Campus Javeriana o sedes empresariales)', scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:0, P:0 }, tags: [] },
      { id: 'q16_2', text: 'Híbrida (Sesiones virtuales + aplicación presencial)', scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:0, P:0 }, tags: [] },
      { id: 'q16_3', text: 'Virtual (Mayor flexibilidad de horario)', scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:0, P:0 }, tags: [] },
      { id: 'q16_4', text: 'Me adapto a cualquier modalidad según el tema', scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:0, P:0 }, tags: [] }
    ]
  },
  {
    id: 'q18',
    module: 'D',
    type: 'scale',
    required: true,
    question: 'Del 1 al 5, ¿qué tan importante es para ti acercarte a la industria real y hacer networking?',
    options: [
      { id: 'q18_1', text: '1 - Poco importante', value: 1, scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:0, P:0 }, tags: [] },
      { id: 'q18_2', text: '2 - Moderado', value: 2, scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:1, P:0 }, tags: [] },
      { id: 'q18_3', text: '3 - Importante', value: 3, scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:2, P:0 }, tags: [] },
      { id: 'q18_4', text: '4 - Muy importante', value: 4, scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:3, P:0 }, tags: [] },
      { id: 'q18_5', text: '5 - Indispensable para mi carrera', value: 5, scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:4, P:0 }, tags: [] }
    ]
  }
];
