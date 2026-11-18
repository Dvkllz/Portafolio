# David Velez · Dos formas de ver mi mundo

Portafolio personal con Next.js App Router, TypeScript y Tailwind CSS. Incluye un taller isométrico original en SVG, proyectos reales, CV en PDF y un laboratorio de combinaciones de habilidades. Sin claves de API ni servicios de pago.

## Diseños disponibles

- `/`: **Mundo en construcción**. La primera opción conserva su taller isométrico y su identidad cálida en crema, naranja y oliva.
- `/frecuencia`: **FRECUENCIA**. Una estación analógica en grafito y lima, con tipografía editorial, osciloscopio animado en Canvas y proyectos presentados como transmisiones.

El botón **Cambiar diseño**, en la esquina inferior derecha, permite alternar entre ambos. Comparten los datos de `data/portfolio.ts` y el CV, pero tienen composiciones, ilustraciones e interacciones propias. La segunda opción vive en `components/signal/` y `app/frecuencia/signal.css`, con estilos limitados a esa ruta.

En FRECUENCIA puedes sintonizar tres áreas, regular la amplitud, explorar filtros y procesos de proyectos, y probar un sintetizador de ondas senoidales, triangulares o cuadradas. El audio Web Audio se activa solo al pulsar **Escuchar señal**, a volumen bajo; se detiene al ocultar la pestaña, restablecer el instrumento o abandonar el diseño. No usa micrófono ni envía audio. Las animaciones respetan movimiento reducido y se suspenden fuera de pantalla.

La experiencia incluye progreso de lectura, navegación con sección activa, guía lateral para escritorio, transiciones ligadas al desplazamiento y un receptor que responde suavemente al puntero. Las tarjetas de proyectos incorporan un barrido visual de escáner. Todas estas capas se desactivan o simplifican cuando el visitante solicita reducir movimiento.

## Desarrollo

Node.js 22 o 24 y npm.

```sh
npm ci
npm run dev
```

La vista previa se abre en http://127.0.0.1:3000.

```sh
npm run typecheck
npm run build
npm start
```

Se usa Webpack por una incompatibilidad observada de Turbopack con los procesos de PostCSS en este entorno Windows.

## Editar contenido

- `data/portfolio.ts`: perfil, enlaces, proyectos, formación, experiencia y testimonios.
- `public/cv-david-velez.pdf`: CV descargable, generado con los datos aportados.
- `scripts/create_cv.py`: fuente reproducible del PDF (requiere reportlab).
- `components/`: un componente por sección y componentes de interacción.
- `app/globals.css`: identidad visual, escena, adaptación móvil y movimiento reducido.

No se incluyen testimonios ficticios. Los tres espacios vacíos están identificados como pendientes. Los proyectos tienen repositorios reales; los enlaces de demos se activan al añadir `demo` en los datos.

## Interacciones

- Mundo: vista por piezas, luz diurna/nocturna y reinicio.
- Navegación: enlaces directos, sección activa y menú de celular.
- Proyectos: filtros y diálogo accesible con resultado/proceso; Escape cierra y devuelve el foco.
- Trayectoria: formación académica y experiencia laboral.
- Contacto: validación, copia del correo y preparación de borrador mediante `mailto:`. No envía correo desde el servidor ni muestra una confirmación falsa de entrega. Requiere una aplicación de correo configurada para abrir el borrador; siempre hay un enlace directo al correo.
- Laboratorio: combinación de dos habilidades; distingue proyectos existentes de ideas experimentales.
- Accesibilidad: teclado, enlace para saltar contenido, etiquetas, foco visible, `prefers-reduced-motion` y control manual de animaciones.

## Contenido pendiente para completar la entrega académica

- Tres testimonios reales con nombre, relación, texto y avatar/iniciales.
- LinkedIn, si se desea mostrar.
- Institución, fechas y detalles de formación.
- Empresa, cargo, fechas y logros del año de experiencia laboral.
- Demos públicas o videos de los cuatro proyectos. Las aplicaciones de escritorio no tienen una versión web confirmada; no se inventaron enlaces.
- Revisar y ampliar el CV inicial.

## Proyectos y recursos

Descripciones contrastadas con los README de los repositorios compartidos por David:

- [CuentAI](https://github.com/Dvkllz/CuentAI)
- [Asistente Virtual](https://github.com/Dvkllz/AsistenteVirtual)
- [Ecos de Nébula](https://github.com/Dvkllz/JuegoDefinitivo)
- [Sistema Automotriz](https://github.com/Dvkllz/SistemaAutomotriz)

La captura de Nébula y el sprite del gato provienen de esos repositorios. Las ilustraciones de CuentAI y Sistema Automotriz están identificadas como conceptuales. El taller y el avatar del portafolio son ilustraciones originales construidas en código. David confirmó que Josué Guerrero, acreditado en JuegoDefinitivo, corresponde a su nombre personal.

## Vercel

Importar este repositorio como proyecto Next.js. Comando de instalación: `npm ci`; compilación: `npm run build`. No necesita variables de entorno. El contacto funciona mediante el cliente de correo del visitante.
