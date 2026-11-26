// Renderiza cada pieza de kit.html al doble de resolución (2160 px de ancho) en alta-resolucion/
// Uso: node render-alta.js
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const dir = __dirname;
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 2000 }, deviceScaleFactor: 2 });
  await p.goto('file://' + path.join(dir, 'kit.html'), { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  const ids = await p.$$eval('.post, .story', els => els.map(e => e.id));
  for (const id of ids) {
    await p.locator('#' + id).screenshot({ path: path.join(dir, 'alta-resolucion', id + '.png') });
    console.log('ok', id);
  }
  await b.close();
})();
