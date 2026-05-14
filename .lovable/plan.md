## Problem

`ProductDetail.tsx` renders the size selector by mapping over **every variant** (`variants.map(...)`). When a product has multiple option dimensions (e.g. Size × Color), each size appears once per color combination — producing the duplicate S/S/S/M/M/M grid you saw.

It also means there is no way to pick a color, so users can't actually disambiguate which variant they're buying.

## Fix

Refactor the option selection UI to be **option-driven** instead of variant-driven:

1. Track selected option values in a single `Record<optionName, value>` state (e.g. `{ Size: "M", Color: "Black" }`).
2. For **each option** the product exposes (Size, Color, etc.), render one row of unique buttons sourced from `option.values` — so sizes appear once, colors appear once.
3. Resolve `activeVariant` by finding the variant whose `selectedOptions` match all currently selected values.
4. Disable (or strike-through) option values that have no in-stock variant given the other current selections.
5. Default-select the first available variant's options on load so the price/CTA stay sensible.
6. Mobile sticky CTA + main CTA continue to read "Select options" until every option is chosen.

No backend, Shopify, or cart-store changes needed — purely a presentation refactor in `src/pages/ProductDetail.tsx`.

## Out of scope

- Color swatches as actual color chips (can be a later polish — for now just labeled buttons, consistent with the current flat aesthetic).
- Variant image switching on color change.
