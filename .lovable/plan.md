# Add logo mark + color the "Originals" wordmark

## What changes

1. **Save the uploaded logo** to `src/assets/madeira-originals-logo.png` (full mark) so it can be imported as an ES6 module with proper bundling.

2. **Header (`src/components/Header.tsx`)** — replace the text-only logo link with:
   - The monogram image (`<img>`, ~32px tall on mobile, 36px on desktop) — `aria-hidden`, decorative.
   - Wordmark text alongside: `MADEIRA` in primary red + `ORIGINALS` in accent gold (`text-accent`), both same size/weight as today.
   - Keep current responsive scaling (15px → 18px → 20px) and `truncate min-w-0` safety.
   - Single accessible name on the `<Link>` via `aria-label="Madeira Originals — Home"`.

3. **Footer tagline area** — apply the same two-tone treatment to any "MADEIRA ORIGINALS" wordmark display so the brand reads consistently. (Footer currently uses plain text headings; only the brand wordmark itself gets the gold treatment, not section headings.)

4. **Favicon / og:image** — out of scope for this turn (separate ask).

## Visual spec

- `MADEIRA` → `text-primary` (existing red `#A41C2E`)
- `ORIGINALS` → `text-accent` (existing gold `#F4B942`)
- Letter-spacing and weight unchanged.
- Logo mark to the left of wordmark with `gap-2`.

## Out of scope

- Redesigning the wordmark typography.
- Replacing the favicon (will ask separately if you want it).
- Adding the logo anywhere outside the header.
