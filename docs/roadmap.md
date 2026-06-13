# Roadmap

## Semana 1 - Base Del Producto

Objetivo: tener un prototipo funcional local.

Entregables:
- Estructura del proyecto.
- Dashboard responsive.
- Modelo de datos local.
- Datos demo del album.
- Vista de album.
- Marcar laminas con `+` y `-`.
- Persistencia local.

## Semana 2 - Control Real Del Album

Objetivo: que el usuario pueda usar la app para su coleccion diaria.

Entregables:
- Buscador.
- Filtros.
- Lista de faltantes.
- Lista de repetidas.
- Registro por lote.
- Modo abrir sobre.
- Compartir por WhatsApp/copiar.

## Semana 3 - Calidad Y Exportacion

Objetivo: mejorar confianza y utilidad.

Entregables:
- Importar CSV.
- Exportar JSON/CSV.
- Backup y restauracion.
- Historial basico.
- Mejoras de accesibilidad.
- Pruebas principales.

## Semana 4 - Gastos E Intercambios

Objetivo: acercarse al control total.

Entregables:
- Registro de gastos.
- Estadisticas de costos.
- Contactos.
- Intercambios manuales.
- Estados de intercambio.

## Semana 5+ - Nube Y Comunidad

Objetivo: sincronizar y compartir.

Entregables:
- Login.
- Sincronizacion.
- Modo familiar.
- Link publico.
- Comparacion con amigos.
- Notificaciones.

## Fase 11 - Crecimiento Organico

Objetivo: que cada lista compartida traiga nuevos usuarios sin pauta paga.

Entregables:
- Meta tags SEO y tarjetas sociales.
- Enlace publico con resumen de progreso.
- CTA para crear control propio desde enlaces compartidos.
- Copiar enlace y compartir nativo desde el modulo Compartir.
- Shortcuts PWA hacia Registrar y Faltantes.
- `robots.txt` y `sitemap.xml` para indexacion basica.

## Fase 12 - Comparador Publico Viral

Objetivo: convertir cada enlace compartido en una herramienta util para la otra persona.

Entregables:
- El enlace publico incluye una muestra compacta de faltantes y repetidas.
- La landing publica permite pegar codigos propios.
- La app calcula que puede ofrecer el visitante y que puede pedirle al coleccionista.
- El enlace queda marcado con `source=share` para futura analitica.

## Decision Tecnica Recomendada

Para empezar rapido y bonito:

- Frontend: React + Vite + TypeScript.
- Estilos: Tailwind CSS.
- Iconos: lucide-react.
- Graficas: Recharts.
- Estado local: Zustand o React state inicial.
- Persistencia MVP: IndexedDB o localStorage.
- PWA: vite-plugin-pwa.

Para una version con nube:

- Supabase para autenticacion y base de datos.
- Row Level Security por usuario.
- Storage para imagenes.

## Siguiente Paso De Construccion

Crear el MVP tecnico con estas pantallas:

1. Inicio.
2. Album.
3. Registrar.
4. Faltantes.
5. Repetidas.

El primer objetivo de codigo debe ser poder abrir la app en navegador, sumar/restar laminas y ver como cambian progreso, faltantes y repetidas.
