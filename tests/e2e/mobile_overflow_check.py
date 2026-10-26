"""Fails if any element's right edge exceeds the viewport at 320/360/390px.
Run: python3 tests/e2e/mobile_overflow_check.py [base_url]"""
import asyncio, sys
from playwright.async_api import async_playwright
BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8080"
PAGES = ["/", "/shop", "__product__", "/about", "/wholesale", "__journal__", "/shipping",
         "/returns", "/care", "/size-guide", "/privacidade", "/termos", "/contact", "/en/shop", "/en/terms"]
JS = """() => { const w = innerWidth; const out = [];
for (const el of document.body.querySelectorAll('*')) {
  const r = el.getBoundingClientRect(); if (!r.width || !r.height) continue;
  const cs = getComputedStyle(el); if (cs.visibility==='hidden' || cs.position==='fixed') continue;
  let p = el.parentElement, clipped = false;
  while (p && p !== document.body) { const o = getComputedStyle(p).overflowX;
    if ((o==='hidden'||o==='auto'||o==='scroll'||o==='clip') && p.getBoundingClientRect().right <= w+1) { clipped = true; break; } p = p.parentElement; }
  if (!clipped && r.right > w + 1) out.push(el.tagName+'.'+String(el.className).slice(0,60)+' right='+Math.round(r.right));
} return out.slice(0,5); }"""
async def main():
    fails = []
    async with async_playwright() as pw:
        b = await pw.chromium.launch(headless=True)
        for w in (320, 360, 390):
            pg = await (await b.new_context(viewport={"width": w, "height": 800})).new_page()
            for path in PAGES:
                if path == "__product__":
                    await pg.goto(BASE+"/shop"); await pg.wait_for_selector('a[href*="/product/"]', timeout=20000)
                    path = await pg.locator('a[href*="/product/"]').first.get_attribute("href")
                if path == "__journal__":
                    await pg.goto(BASE+"/journal"); await pg.wait_for_timeout(2500)
                    a = pg.locator('a[href*="/journal/"]')
                    if not await a.count(): continue
                    path = await a.first.get_attribute("href")
                await pg.goto(BASE+path); await pg.wait_for_timeout(2500)
                await pg.evaluate("window.scrollTo(0, document.body.scrollHeight)"); await pg.wait_for_timeout(800)
                bad = await pg.evaluate(JS)
                if bad: fails.append(f"{w}px {path}: {bad}")
            await pg.goto(BASE+"/shop"); await pg.wait_for_timeout(2000)
            cart = pg.get_by_role("button", name="Carrinho")
            if await cart.count():
                await cart.first.click(); await pg.wait_for_timeout(1000)
                bad = await pg.evaluate(JS)
                if bad: fails.append(f"{w}px cart drawer: {bad}")
        await b.close()
    print("\n".join(fails) or "OK: no horizontal overflow"); sys.exit(1 if fails else 0)
asyncio.run(main())
