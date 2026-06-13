# Backlog Del Producto

## Fase 1 - MVP Amigable

### Epic 1: Album Configurable

**HU-001 Crear album**
Como coleccionista, quiero crear un album Panini 2026 para empezar a controlar mi coleccion.

Criterios:
- Debo poder definir nombre, total de laminas y descripcion.
- Debo poder editar el album despues.
- Debe crearse un album demo si no tengo datos.

**HU-002 Secciones del album**
Como coleccionista, quiero dividir el album por secciones para revisar el progreso facilmente.

Criterios:
- Cada seccion tiene nombre, color y rango/lista de laminas.
- El dashboard muestra progreso por seccion.

**HU-003 Checklist de laminas**
Como coleccionista, quiero tener una lista base de laminas para saber cuales existen.

Criterios:
- Una lamina tiene numero, nombre, seccion y metadatos opcionales.
- Debo poder crear laminas manualmente.
- Debo poder importar laminas desde CSV en una fase temprana.

### Epic 2: Control De Laminas

**HU-004 Marcar lamina obtenida**
Como coleccionista, quiero marcar una lamina como obtenida para actualizar mi avance.

Criterios:
- Puedo sumar una unidad.
- Si cantidad pasa de 0 a 1, deja de estar faltante.
- Si cantidad pasa de 1, aparece como repetida.

**HU-005 Restar cantidad**
Como coleccionista, quiero corregir cantidades si me equivoco.

Criterios:
- No se permiten cantidades negativas.
- Si cantidad vuelve a 0, la lamina queda faltante.

**HU-006 Marcar pegada**
Como coleccionista, quiero diferenciar laminas pegadas de laminas sin pegar.

Criterios:
- Una lamina obtenida puede estar pegada o sin pegar.
- Las repetidas no se consideran pegadas.

**HU-007 Priorizar lamina**
Como coleccionista, quiero marcar laminas urgentes para buscarlas primero.

Criterios:
- Puedo activar/desactivar prioridad.
- Existe filtro de prioritarias.

### Epic 3: Carga Rapida

**HU-008 Ingreso por lote**
Como coleccionista, quiero pegar muchos numeros de laminas para registrarlas rapido.

Criterios:
- Acepta numeros separados por coma, espacio o salto de linea.
- Informa cuales fueron nuevas, repetidas o invalidas.
- Permite confirmar antes de guardar.

**HU-009 Abrir sobre**
Como coleccionista, quiero registrar un sobre para ver que tan bueno salio.

Criterios:
- Puedo registrar varias laminas juntas.
- Se guarda fecha y cantidad.
- El resumen muestra nuevas y repetidas.

### Epic 4: Faltantes Y Repetidas

**HU-010 Lista de faltantes**
Como coleccionista, quiero ver mis faltantes para saber que buscar.

Criterios:
- Lista automatica.
- Filtro por seccion.
- Orden por numero.

**HU-011 Lista de repetidas**
Como coleccionista, quiero ver mis repetidas para intercambiar.

Criterios:
- Muestra solo laminas con cantidad mayor a 1.
- Muestra cantidad disponible para intercambio.

**HU-012 Compartir por WhatsApp**
Como coleccionista, quiero compartir faltantes y repetidas en texto claro.

Criterios:
- Genera texto listo para copiar.
- Incluye nombre del album.
- Permite formato corto y formato por secciones.
- Incluye un enlace publico hacia la app para atraer nuevos usuarios.

**HU-012B Resumen publico viral**
Como coleccionista, quiero compartir un enlace publico de mi avance para que mis amigos vean mi progreso y creen su propio control.

Criterios:
- El enlace no expone datos privados ni inventario completo.
- Muestra avance, pegadas, faltantes y repetidas.
- Incluye una llamada a crear el propio control del album.
- Funciona sin iniciar sesion.

### Epic 5: Dashboard

**HU-013 Resumen inicial**
Como coleccionista, quiero abrir la app y saber como va mi album.

Criterios:
- Muestra porcentaje completado.
- Muestra faltantes, repetidas y total obtenidas.
- Muestra accesos directos a registrar, faltantes y repetidas.

**HU-014 Progreso por seccion**
Como coleccionista, quiero saber que secciones estan mas avanzadas.

Criterios:
- Muestra barra de progreso por seccion.
- Destaca secciones completas.

## Fase 2 - Gestion Avanzada

**HU-015 Gastos**
Registrar compras y ver total gastado.

**HU-016 Estadisticas avanzadas**
Ver rendimiento de sobres, costo por lamina nueva y tendencias.

**HU-017 Historial**
Ver cambios, sobres abiertos y correcciones.

**HU-018 Exportar datos**
Descargar backup en JSON/CSV.

**HU-019 Importar CSV**
Cargar checklist o coleccion desde archivo.

## Fase 3 - Intercambios

**HU-020 Contactos**
Crear personas con las que intercambio.

**HU-021 Crear intercambio**
Registrar laminas que doy y recibo.

**HU-022 Comparar listas**
Pegar lista de un amigo y detectar intercambios posibles.

**HU-023 Estados de intercambio**
Controlar propuestas, confirmadas, entregadas o canceladas.

## Fase 4 - Social, Nube Y Mobile Plus

**HU-024 Login y sincronizacion**
Tener los datos sincronizados entre celular y PC.

**HU-025 Modo familiar**
Administrar varios perfiles en una cuenta.

**HU-026 Link publico**
Compartir una vista de faltantes/repetidas sin editar.

**HU-027 Notificaciones**
Recordatorios y avisos de intercambio.

**HU-028 OCR/camara**
Leer numeros de laminas con la camara.

## Prioridad Recomendada

1. Dashboard.
2. Modelo de album y laminas.
3. Registro rapido.
4. Faltantes.
5. Repetidas.
6. Compartir texto.
7. Persistencia local.
8. Importar/exportar.
9. Gastos.
10. Intercambios.
