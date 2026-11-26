// Renderiza cada pieza de kit.html como PNG en piezas/
// Uso: node render-kit.js   (desde cualquier carpeta)
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const dir = __dirname;
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 2000 }, deviceScaleFactor: 1 });
  await p.goto('file://' + path.join(dir, 'kit.html'), { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  const ids = await p.$$eval('.post, .story', els => els.map(e => e.id));
  for (const id of ids) {
    await p.locator('#' + id).screenshot({ path: path.join(dir, 'piezas', id + '.png') });
    console.log('ok', id);
  }
  await b.close();
})();
