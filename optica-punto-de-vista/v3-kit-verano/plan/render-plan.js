// Genera el PDF del plan y capturas de cada página para revisión.
// Uso: node render-plan.js [--shots DIR]
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const dir = __dirname;
  const shotsIdx = process.argv.indexOf('--shots');
  const shots = shotsIdx > -1 ? process.argv[shotsIdx + 1] : null;
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 900, height: 1200 }, deviceScaleFactor: 1 });
  await p.goto('file://' + path.join(dir, 'plan.html'), { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.pdf({ path: path.join(dir, '..', 'Plan-Marketing-Verano-2027-Optica-Punto-de-Vista.pdf'), printBackground: true, preferCSSPageSize: true });
  if (shots) {
    const n = await p.$$eval('section.page', els => els.length);
    for (let i = 0; i < n; i++) {
      await p.locator('section.page').nth(i).screenshot({ path: path.join(shots, `pag-${String(i + 1).padStart(2, '0')}.png`) });
    }
    // detectar desbordes: contenido que sale de la página
    const over = await p.$$eval('section.page', els => els.map((el, i) => {
      const r = el.getBoundingClientRect(); let worst = 0;
      el.querySelectorAll('*').forEach(c => { const cr = c.getBoundingClientRect(); if (cr.height && cr.bottom > r.bottom - 64 && !c.closest('.pfoot') && getComputedStyle(c).position !== 'absolute' && !c.closest('[style*="position:absolute"]')) worst = Math.max(worst, cr.bottom - (r.bottom - 64)); });
      return `pág ${i + 1}: ${worst > 0 ? 'SE PASA ' + Math.round(worst) + 'px' : 'ok'}`;
    }));
    console.log(over.join('\n'));
  }
  await b.close();
  console.log('pdf ok');
})();
