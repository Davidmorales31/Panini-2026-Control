# Album Panini 2026 Control

## Vision

Construir una aplicacion web responsive, instalable como PWA, para llevar el control total del album Panini 2026 desde celular y computador. La experiencia debe ser simple, alegre y muy rapida: abrir, buscar una lamina, marcarla, ver faltantes/repetidas y compartir listas sin esfuerzo.

## Principios Del Producto

- Mobile first: todo debe funcionar comodo con una mano.
- Cero friccion: registrar laminas debe tomar segundos.
- Visual y amable: colores claros, iconos, progreso visible y textos cercanos.
- Flexible: el album 2026 debe poder configurarse aunque el checklist oficial cambie.
- Offline primero para funciones basicas: consultar y marcar laminas sin internet.
- Datos protegidos y exportables: el usuario siempre debe poder sacar su informacion.

## Usuarios Objetivo

- Coleccionista individual que quiere completar su album.
- Padre/madre que administra el album de un hijo.
- Familia con varios albumes en casa.
- Grupo de amigos que intercambian laminas.
- Vendedor o coleccionista avanzado con muchas repetidas.

## Modulos Funcionales

### 1. Album

- Crear y editar albumes.
- Soportar album Panini 2026 y futuros albumes.
- Organizar el album por secciones: selecciones, jugadores, escudos, estadios, especiales, leyendas, cromos brillantes u otras categorias.
- Ver progreso general y por seccion.
- Vista tipo cuadricula visual.
- Vista lista compacta para revisar rapido.
- Busqueda por numero, nombre, pais, equipo, posicion o categoria.
- Filtros por estado, seccion, rareza, prioridad y repetidas.

### 2. Laminas

- Registrar cantidad de cada lamina.
- Estados sugeridos:
  - Faltante.
  - Disponible sin pegar.
  - Pegada.
  - Repetida.
  - Reservada para intercambio.
  - Entregada.
  - Prioritaria.
- Marcar una lamina como favorita o dificil.
- Agregar notas por lamina.
- Agregar foto opcional.
- Ver historial de cambios por lamina.
- Edicion rapida con botones de sumar/restar.

### 3. Carga Rapida

- Registrar laminas por numero individual.
- Registrar multiples numeros en una caja de texto: `1, 4, 4, 18, 92`.
- Modo "abrir sobre".
- Modo "abrir caja".
- Confirmacion visual de nuevas, repetidas y completadas.
- Correccion rapida si se digito un numero equivocado.
- Importacion desde CSV o Excel.
- En una version futura, OCR/camara para leer numeros.

### 4. Faltantes

- Lista automatica de laminas faltantes.
- Agrupar faltantes por pais/seccion.
- Marcar faltantes como prioritarias.
- Copiar lista al portapapeles.
- Compartir por WhatsApp.
- Exportar PDF/CSV.
- Vista "solo numeros" para intercambio rapido.
- Vista "bonita" con secciones para enviar a amigos.

### 5. Repetidas

- Lista automatica de repetidas.
- Cantidad repetida por lamina.
- Marcar repetidas como disponibles, reservadas o entregadas.
- Compartir repetidas por WhatsApp.
- Exportar repetidas.
- Ver las laminas mas repetidas.

### 6. Intercambios

- Crear contactos de intercambio.
- Registrar que laminas doy y cuales recibo.
- Calcular beneficio del intercambio:
  - Nuevas que gano.
  - Repetidas que entrego.
  - Duplicados que recibiria.
- Estados:
  - Propuesto.
  - Pendiente.
  - Confirmado.
  - Entregado.
  - Cancelado.
- Historial de intercambios.
- Comparacion con otro coleccionista mediante listas.
- Generacion de mensaje para coordinar intercambio.

### 7. Gastos

- Registrar compra de album, sobres, cajas, laminas individuales e intercambios pagos.
- Registrar fecha, lugar, cantidad y costo.
- Ver total gastado.
- Ver costo promedio por lamina.
- Ver costo promedio por lamina nueva.
- Presupuesto mensual.
- Alertas cuando se supera presupuesto.
- Estadisticas de rendimiento por compra.

### 8. Estadisticas

- Porcentaje completado.
- Laminas unicas obtenidas.
- Total de repetidas.
- Total faltantes.
- Progreso por seccion.
- Progreso por pais.
- Laminas mas repetidas.
- Gasto total.
- Gasto estimado restante.
- Efectividad de sobres: nuevas vs repetidas.
- Racha de dias actualizando.
- Secciones completadas.

### 9. Social Y Compartir

- Compartir faltantes.
- Compartir repetidas.
- Compartir progreso.
- Link publico opcional de solo lectura.
- Comparar dos colecciones.
- Modo amigos en versiones futuras.
- Privacidad configurable.

### 10. Configuracion

- Editar datos del album.
- Importar checklist.
- Exportar backup.
- Restaurar backup.
- Cambiar moneda.
- Cambiar tema visual.
- Activar/desactivar notificaciones.
- Gestionar perfiles familiares.

## Requerimientos No Funcionales

- Responsive para celulares, tablets y PC.
- PWA instalable.
- Buen rendimiento con cientos o miles de laminas.
- Persistencia local desde la primera version.
- Sincronizacion en nube en version posterior.
- Accesibilidad basica: contraste correcto, botones grandes, etiquetas claras.
- Operacion offline para consultar y actualizar coleccion.
- Exportacion de datos en formatos abiertos.
- Preparado para internacionalizacion.

## MVP

La primera version debe permitir:

- Crear el album Panini 2026 con secciones configurables.
- Cargar un checklist inicial manual o importado.
- Marcar laminas como obtenidas.
- Controlar cantidades y repetidas.
- Ver progreso general.
- Ver faltantes.
- Ver repetidas.
- Cargar multiples laminas rapidamente.
- Compartir faltantes/repetidas por WhatsApp o copiar texto.
- Guardar datos localmente.
- Funcionar bien en mobile y PC.

## Criterios De Exito

- El usuario puede registrar un sobre completo en menos de 30 segundos.
- El usuario puede saber que laminas le faltan en menos de 5 segundos.
- El usuario puede compartir faltantes/repetidas en menos de 3 toques.
- El dashboard deja claro el avance del album apenas se abre la app.
- La app se siente amable, no como una hoja de calculo disfrazada.
