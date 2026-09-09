# Homepage tee-led hero

## Scope
- Replace the landscape-led hero with a flat navy, product-led composition in `Hero.tsx` only.
- Keep the existing headline, body, CTA text, links, typography, sizing, tracking, and animation classes.
- Add only `hero.caption` and update `hero.imageAlt` in both locale files.

## Layout
- Desktop: vertically centered two-column layout, copy on the left and the uncropped Capelinha tee with caption on the right.
- Mobile: coordinates at the top, then the tee in a stable 4:5 frame with caption, followed by the overline and existing copy/CTAs; use content-driven height rather than viewport height.
- Remove the landscape picture, Ken Burns animation, scrims, and scroll cue tied to the previous full-screen composition.

## Validation
- Confirm PT and EN render with matching keys.
- Run the i18n check and TypeScript check.
- Verify the live hero at 1280px and 390px for image visibility, text contrast, overflow, and CTA sizing.
