# Pantallas Y Experiencia

## Personalidad Visual

La app debe sentirse como una companera de coleccion:

- Cercana.
- Alegre.
- Clara.
- Rapida.
- Cero intimidante.

Lenguaje sugerido:
- "Tu album va volando"
- "Te faltan poquitas de esta seccion"
- "Estas ya estan listas para cambiar"
- "Buen sobre: conseguiste 4 nuevas"
- "Uy, esta salio repetida, pero sirve para intercambio"

## Navegacion Principal

En mobile:
- Barra inferior con 5 accesos:
  - Inicio.
  - Album.
  - Registrar.
  - Listas.
  - Mas.

En desktop:
- Sidebar lateral:
  - Inicio.
  - Album.
  - Registrar laminas.
  - Faltantes.
  - Repetidas.
  - Intercambios.
  - Gastos.
  - Estadisticas.
  - Configuracion.

## Pantalla 1: Inicio

Objetivo: mostrar el estado general del album en segundos.

Elementos:
- Nombre del album.
- Porcentaje completado grande.
- Contadores:
  - Obtenidas.
  - Faltantes.
  - Repetidas.
  - Prioritarias.
- Boton principal: Registrar laminas.
- Accesos rapidos:
  - Ver faltantes.
  - Ver repetidas.
  - Abrir sobre.
  - Compartir listas.
- Progreso por seccion.
- Ultima actividad.

## Pantalla 2: Album

Objetivo: explorar y actualizar laminas.

Elementos:
- Buscador fijo.
- Filtros por seccion y estado.
- Selector de vista:
  - Cuadricula.
  - Lista.
- Tarjeta de lamina:
  - Numero.
  - Nombre.
  - Seccion.
  - Cantidad.
  - Estado visual.
  - Botones `-` y `+`.
  - Icono de prioridad.

Estados visuales:
- Faltante: borde calido/suave.
- Obtenida: verde.
- Repetida: azul.
- Reservada: amarillo.
- Prioritaria: acento rojo suave.

## Pantalla 3: Registrar

Objetivo: sumar laminas muy rapido.

Modos:
- Una lamina.
- Muchas laminas.
- Abrir sobre.

Elementos:
- Campo grande para numeros.
- Boton confirmar.
- Resultado previo:
  - Nuevas.
  - Repetidas.
  - Invalidas.
- Boton guardar.
- Boton deshacer ultimo registro.

## Pantalla 4: Faltantes

Objetivo: saber que buscar y compartirlo.

Elementos:
- Total faltantes.
- Filtro por seccion.
- Toggle "solo prioritarias".
- Lista agrupada por seccion.
- Acciones:
  - Copiar.
  - WhatsApp.
  - Exportar.
  - Marcar prioridades.

## Pantalla 5: Repetidas

Objetivo: preparar intercambios.

Elementos:
- Total de repetidas disponibles.
- Lista agrupada por seccion.
- Cantidad disponible por lamina.
- Acciones:
  - Reservar.
  - Copiar.
  - WhatsApp.
  - Crear intercambio.

## Pantalla 6: Intercambios

Objetivo: registrar acuerdos.

Elementos:
- Lista de intercambios por estado.
- Crear intercambio.
- Seleccionar contacto.
- Laminas que doy.
- Laminas que recibo.
- Resumen:
  - Nuevas recibidas.
  - Repetidas entregadas.
  - Balance.
- Boton completar intercambio.

## Pantalla 7: Gastos

Objetivo: controlar presupuesto.

Elementos:
- Total gastado.
- Gasto del mes.
- Costo por lamina.
- Costo por lamina nueva.
- Registrar gasto.
- Historial.

## Pantalla 8: Estadisticas

Objetivo: mostrar progreso y patrones.

Elementos:
- Grafico de progreso.
- Progreso por seccion.
- Repetidas mas frecuentes.
- Efectividad de sobres.
- Gasto acumulado.
- Secciones completas.

## Pantalla 9: Configuracion

Objetivo: gestionar datos.

Elementos:
- Datos del album.
- Importar checklist.
- Exportar backup.
- Restaurar backup.
- Moneda.
- Tema.
- Perfiles.

## Detalles De Interaccion

- Botones grandes en mobile.
- Confirmaciones cortas y amables.
- Animacion suave al sumar una lamina.
- Feedback inmediato:
  - "Nueva"
  - "Repetida"
  - "Seccion completada"
- Undo visible despues de registrar un lote.
- No bloquear al usuario con formularios largos.

## Estilo Visual Sugerido

Paleta equilibrada:
- Fondo: blanco calido o gris muy claro.
- Principal: verde fresco.
- Secundario: azul limpio.
- Acento: amarillo o coral suave.
- Error/alerta: rojo suave.

Tipografia:
- Sans serif redondeada o moderna.
- Numeros claros y grandes.
- Titulos cortos.

Componentes:
- Barras de progreso.
- Chips de estado.
- Iconos en botones.
- Tarjetas pequenas para laminas.
- Tablas compactas en desktop.
- Bottom sheet/modal en mobile.

## Primer Prototipo Navegable

El primer prototipo deberia incluir:

- Dashboard.
- Album en cuadricula.
- Registro rapido.
- Faltantes.
- Repetidas.
- Compartir texto.
