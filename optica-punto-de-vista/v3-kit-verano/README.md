# Kit Verano 2027 · Óptica Punto de Vista

- `piezas/`: 6 posts de Instagram (1080×1350) y 5 estados de WhatsApp o historias (1080×1920), listos para subir.
- `Plan-Marketing-Verano-2027-Optica-Punto-de-Vista.pdf`: el plan completo (estrategia, ofertas, calendario, anuncios y precios).
- `textos-para-publicar.txt`: textos para copiar y pegar en cada publicación, en la biografía y en WhatsApp Business.

## Cambiar un precio, una fecha o un texto

1. Edita `kit.html` (las piezas) o `plan/plan.html` (el PDF). Por ejemplo, busca `28 de febrero de 2027` o `$30.000`.
2. Regenera los archivos:
   - Piezas: `node render-kit.js`
   - PDF: `node plan/render-plan.js`

Requiere Node con Playwright y conexión a Google Fonts.
