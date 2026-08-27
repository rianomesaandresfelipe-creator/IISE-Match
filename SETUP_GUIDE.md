# Guía de Instalación del Backend (Google Apps Script IISE Match V3.0)

Este proyecto utiliza un script optimizado de un solo archivo para conectar el recomendador con tu Google Sheet. Genera un **Dashboard Ejecutivo Automático** con tarjetas KPI, tablas organizadas y sugerencias estratégicas en tiempo real para la junta directiva de IISE 771.

## 🛠️ Paso a Paso para la Instalación

### 1. Preparar el Google Sheet
1. Crea una hoja de cálculo nueva en Google Sheets.
2. Nómbrala como desees (por ejemplo: `IISE Match 771 - Inteligencia de Demanda`).

### 2. Abrir el Editor de Código
1. En el menú superior de tu Google Sheet, ve a **Extensiones > Apps Script**.
2. Se abrirá una pestaña del editor de código de Google Apps Script.
3. Borra cualquier código existente por defecto en el archivo `Código.gs` (o `Code.gs`).

### 3. Pegar el Código del Backend
1. Abre el archivo [apps-script/Code.gs](file:///Users/Andres/Desktop/Universidad/Capitulo%20IISE/Logistica/IISE%20Logistic%20Intelligence/iise-match/apps-script/Code.gs) de este proyecto.
2. Copia todo su contenido.
3. Pégalo en el editor de Apps Script en tu navegador.
4. Guarda el proyecto haciendo clic en el icono del **Disco** (Guardar proyecto) o presionando `Cmd + S` (`Ctrl + S`).

### 4. Inicializar las Hojas y Generar el Dashboard
1. En la parte superior del editor de Apps Script, asegúrate de que la función seleccionada sea `setupSheets`.
2. Haz clic en **Ejecutar** (Run).
3. Google te pedirá **Autorización de acceso** (necesaria para formatear el Dashboard y registrar respuestas):
   * Haz clic en **Revisar permisos**.
   * Selecciona tu cuenta de Google.
   * Haz clic en **Configuración Avanzada** (abajo a la izquierda).
   * Haz clic en **Ir a Proyecto sin nombre (no seguro)**.
   * Haz clic en **Permitir**.
4. Una vez ejecutado, regresa a tu Google Sheet. Verás que se han creado automáticamente las siguientes pestañas:
   * 📊 `DASHBOARD (EJECUTIVO)`: Pestaña principal con tarjetas de KPI, sugerencias estratégicas automáticas, demanda por actividad, distribución de perfiles y programas académicos.
   * 📋 `RESPUESTAS`: Registro fila a fila de todas las respuestas completas del cuestionario.
   * 👤 `PERFILES`: Afinidad y distribución de perfiles asignados.
   * 🎯 `RECOMENDACIONES`: Registro de actividades sugeridas a cada estudiante.
   * ⚙️ `ACTIVIDADES`: Catálogo semilla gestionable del capítulo.
   * 📈 `METRICAS`: Resumen tabular secundario.

### 5. Desplegar como Aplicación Web (Web App)
Para que el frontend pueda enviar los datos en tiempo real:
1. En la esquina superior derecha del editor de Apps Script, haz clic en **Implementar > Nueva implementación** (Deploy > New deployment).
2. Haz clic en el icono del **Engranaje** (Tipo de implementación) y selecciona **Aplicación web**.
3. Configura los siguientes campos exactamente así:
   * **Descripción**: `IISE Match V3.0 Dashboard`
   * **Ejecutar como**: **Yo** (tu dirección de correo electrónico).
   * **Quién tiene acceso**: **Cualquiera** (esto permite el envío público de las respuestas).
4. Haz clic en **Implementar**.
5. Copia la **URL de la aplicación web** generada (termina en `/exec`).

### 6. Vincular con el Frontend Local
1. Abre el archivo [js/config.js](file:///Users/Andres/Desktop/Universidad/Capitulo%20IISE/Logistica/IISE%20Logistic%20Intelligence/iise-match/js/config.js) en tu código local.
2. Pega la URL copiada en la propiedad `APPS_SCRIPT_URL`:
   ```javascript
   const CONFIG = {
     APPS_SCRIPT_URL: "TU_URL_DE_APPS_SCRIPT_AQUI",
     ...
   };
   ```

### 7. Menú Personalizado en Google Sheets
Cuando abras tu Google Sheet en el futuro, verás el menú **IISE Match** en la barra superior con las opciones:
* **📊 Preparar base de datos & Dashboard**: Vuelve a inicializar y formatear el Dashboard Ejecutivo.
* **🔄 Actualizar métricas e Insights**: Fuerza el recálculo instantáneo del Dashboard con las respuestas existentes.
* **🗑️ Borrar datos de prueba (Reiniciar a 0)**: Permite vaciar todas las respuestas acumuladas durante tus pruebas y reiniciar el Dashboard a 0 con confirmación de seguridad antes del lanzamiento oficial a los estudiantes.
