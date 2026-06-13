# Identidad Visual General

Guia base para futuros proyectos digitales con una sensacion amable, moderna, deportiva/productiva y facil de usar en movil y escritorio.

## Personalidad

La marca debe sentirse cercana, util y energica. No debe parecer fria ni excesivamente corporativa. La experiencia debe transmitir control, orden y motivacion sin saturar al usuario.

Principios:

- Clara antes que decorativa.
- Amigable sin verse infantil.
- Energetica sin parecer agresiva.
- Visualmente rica, pero siempre funcional.
- Pensada primero para movil, sin perder comodidad en escritorio.

## Paleta

### Colores principales

| Uso | Color | Hex |
| --- | --- | --- |
| Azul profundo / navegacion | Navy | `#08204A` |
| Azul secundario | Blue | `#174EA6` |
| Amarillo accion | Yellow | `#FFD800` |
| Rojo alerta / faltante | Red | `#E30613` |
| Verde exito | Green | `#9ACD32` |
| Fondo app | Soft background | `#F4F7FB` |
| Superficie | White | `#FFFFFF` |
| Texto principal | Ink | `#111111` |
| Texto secundario | Muted | `#6B7280` |
| Bordes | Line | `#E5E7EB` |

### Colores de apoyo

| Uso | Color | Hex |
| --- | --- | --- |
| Magenta dinamico | Magenta | `#B73578` |
| Naranja energia | Orange | `#F26A21` |
| Azul claro suave | Soft blue | `#EAF2FF` |
| Verde fuerte | Success green | `#22C55E` |

## Uso De Color

- El azul profundo se usa para estructura, confianza, navegacion y textos fuertes.
- El amarillo se reserva para acciones principales, elementos activos y llamados a instalar/entrar.
- El rojo se usa solo para alertas, faltantes o acciones de advertencia.
- El verde comunica avance, completado o resultados positivos.
- Los fondos deben ser claros, con detalles suaves de color. Evitar interfaces oscuras completas salvo barras laterales o bloques muy controlados.
- No abusar de gradientes. Usarlos solo como acento sutil, no como tema completo.

## Tipografia

Familia recomendada:

```css
font-family: Montserrat, Inter, Arial, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

Jerarquia:

- Titulos grandes: peso `850-950`.
- Titulos de seccion: peso `850-950`, tamano medio.
- Texto de apoyo: peso `500-650`, color muted.
- Botones y chips: peso `800-950`.

Reglas:

- No usar tracking negativo.
- No escalar fuente con el ancho de pantalla.
- En componentes pequenos, usar titulos compactos.
- Evitar parrafos largos dentro de tarjetas.

## Logo Y Marca

La marca puede tener dos versiones:

- Logo completo: para landing, pantallas de entrada y piezas publicas.
- Logo isotipo/marca corta: para sidebar, icono de app, favicon y tarjetas pequenas.

Uso recomendado:

- En landing, el logo debe ser protagonista.
- En la app interna, el logo debe ser pequeno y funcional.
- No poner el logo repetido en muchas tarjetas.
- Mantener espacio alrededor del logo.

## Layout General

### Escritorio

- Sidebar fija en azul profundo.
- Contenido principal en fondo claro.
- Paneles blancos o muy suaves.
- Dashboard con dos zonas: accion principal + estadisticas/resumen.
- Tarjetas repetidas en grillas limpias.

### Movil

- Navegacion inferior con iconos.
- Sin texto en el nav movil si hay poco espacio.
- Primer bloque visible debe mostrar lo mas importante del producto.
- Acciones principales accesibles con el pulgar.
- Evitar tablas anchas o scroll horizontal obligatorio.

## Componentes

### Botones

Boton primario:

- Fondo amarillo `#FFD800`.
- Texto azul profundo `#08204A`.
- Borde suave o azul profundo.
- Peso alto.
- Radio recomendado: `8px` en app, `999px` en landing o CTA especiales.

Boton secundario:

- Fondo blanco.
- Borde `#E5E7EB` o `#D7DEEA`.
- Texto azul profundo.

Boton de alerta:

- Fondo rojo `#E30613`.
- Texto blanco.
- Usarlo poco.

### Tarjetas

Las tarjetas deben ser claras, compactas y accionables.

Reglas:

- Radio entre `8px` y `12px`.
- Borde suave.
- Sombra ligera, no exagerada.
- Fondo blanco con acentos de color difuminados si aplica.
- No meter tarjetas dentro de tarjetas.
- En listas densas, priorizar lectura sobre decoracion.

### Modales

Los modales deben ser utiles, no invasivos.

Reglas:

- Fondo oscuro translúcido.
- Panel claro.
- Titulo corto.
- Texto de apoyo directo.
- Accion principal clara.
- Boton de cerrar visible.

### Formularios

- Inputs altos, minimo `42px`.
- Bordes suaves.
- Foco visible con sombra amarilla o azul clara.
- Placeholders con ejemplos reales.
- Evitar formularios largos sin dividir por secciones.

### Chips Y Estados

Estados sugeridos:

- Faltante: rojo.
- Obtenida: verde.
- Repetida: naranja o azul.
- Prioridad: rojo/amarillo.
- Neutral: gris/azul suave.

## Iconografia

Usar iconos lineales, preferiblemente Lucide.

Reglas:

- Iconos de `18px-22px` en botones.
- Iconos de `24px-32px` en tiles o modales.
- Mantener grosor consistente.
- En movil, preferir icono sobre texto cuando el espacio es limitado.

## Fondos E Imagenes

La landing puede usar una imagen real o mockup como fondo muy opaco.

Reglas:

- Imagen de fondo con opacidad baja, entre `0.08` y `0.16`.
- Puede tener blur suave.
- El contenido principal debe seguir siendo legible.
- Evitar dibujos decorativos sin funcion.
- Evitar fondos muy oscuros o saturados en pantallas de uso diario.

## Tono De Interfaz

El lenguaje debe ser casual, claro y motivador.

Ejemplos:

- "Listo, progreso guardado."
- "Pega tus codigos y comparamos."
- "Usala como app."
- "Te puede servir pedir."
- "Le puedes ofrecer."

Evitar:

- Textos muy tecnicos.
- Mensajes frios tipo sistema empresarial.
- Explicaciones largas dentro de la interfaz.

## Landing

La pantalla de entrada debe ser simple:

- Fondo con imagen opaca.
- Logo principal.
- CTA principal.
- Login o acceso secundario.
- Boton de instalar/descargar solo cuando aplique.
- Si el usuario llega desde enlace compartido, mostrar una tarjeta publica antes del CTA.

No debe parecer una pagina de marketing larga. Debe llevar rapido al uso.

## Navegacion

Escritorio:

- Sidebar azul profundo.
- Items con icono + texto.
- Estado activo en amarillo.

Movil:

- Barra inferior fija.
- Solo iconos si hay muchos items.
- Estado activo claro.
- No debe desbordarse horizontalmente.

## Accesibilidad

- Contraste alto en botones principales.
- Estados visibles sin depender solo del color.
- Botones tactiles comodos.
- Textos truncados con cuidado en tarjetas.
- No ocultar acciones importantes solo en hover.

## CSS Base Sugerido

```css
:root {
  --navy: #08204a;
  --blue: #174ea6;
  --yellow: #ffd800;
  --red: #e30613;
  --green: #9acd32;
  --bg: #f4f7fb;
  --surface: #ffffff;
  --ink: #111111;
  --muted: #6b7280;
  --line: #e5e7eb;
  --soft-blue: #eaf2ff;
  --radius: 8px;
  --shadow: 0 16px 40px rgba(8, 32, 74, 0.11);
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font-family: Montserrat, Inter, Arial, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  letter-spacing: 0;
}

.button-primary {
  min-height: 42px;
  border: 1px solid var(--navy);
  border-radius: var(--radius);
  background: var(--yellow);
  color: var(--navy);
  padding: 0 16px;
  font-weight: 850;
}

.button-secondary {
  min-height: 42px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  color: var(--navy);
  padding: 0 16px;
  font-weight: 800;
}

.panel {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: var(--shadow);
}
```

## Checklist Para Nuevos Proyectos

- Definir logo completo e isotipo.
- Usar azul profundo como base de confianza.
- Reservar amarillo para acciones principales.
- Diseñar primero la vista movil.
- Crear una landing simple, no una pagina larga innecesaria.
- Mantener tarjetas compactas y escaneables.
- Usar iconos consistentes.
- Incluir estados claros: exito, alerta, neutral, pendiente.
- Agregar SEO basico desde el inicio.
- Cuidar que la interfaz tenga personalidad sin perder utilidad.
