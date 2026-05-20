# Add "POS Brasa" Case Study to /studio

Add a new **Case Study** section on the `/studio` page featuring the POS Brasa system built for Brasa Viva (São Vicente). This becomes the first entry in a reusable "Projects" block, so future case studies can be appended.

## Where it goes

Inserted between the **Trusted by** strip and the **Quote form** on `src/pages/Studio.tsx`, under a new section id `#projects`. The Studio hero CTA list stays unchanged.

## Section structure

```text
┌─ #projects ───────────────────────────────────────────┐
│  Overline: "Selected Work / Trabalho Selecionado"     │
│  H2: "Projetos que construímos"                       │
│                                                       │
│  ┌─ Case Card: POS Brasa ─────────────────────────┐  │
│  │  [Image slot — placeholder until screenshots]  │  │
│  │  Eyebrow: "Brasa Viva · São Vicente · 2025"    │  │
│  │  H3: "POS Brasa — Sistema de Gestão            │  │
│  │       para Restauração"                        │  │
│  │  Intro paragraph (About the project)           │  │
│  │  Tagline (italic accent)                       │  │
│  │  Capabilities — 2-column checklist (12 items)  │  │
│  │  Disclaimer box (muted, bordered)              │  │
│  └────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────┘
```

Visual language follows existing Studio brutalism: flat, sharp corners, hairline borders (`border-foreground/15`), Fraunces display for H3, Montserrat for eyebrow/labels, Inter for body. No shadows, no rounded CTAs.

## Content (PT-default, EN translation added)

**Eyebrow:** Brasa Viva · São Vicente · 2025
**Title:** POS Brasa — Sistema de Gestão para Restauração
**Lede:** "Um sistema completo de gestão para restaurantes, churrascarias e cafés, desenhado e construído internamente pela Madeira Originals."
**About:** "Desenvolvemos o POS Brasa de raiz para responder às necessidades diárias de uma operação de restauração ativa. Não é um produto genérico — é uma ferramenta moldada à mesa, à cozinha e ao balcão, refinada todos os dias em ambiente real."
**Tagline (chosen):** "Construído à medida, refinado em serviço."
**Capabilities:** 12 items from the brief (mesas/pedidos, impressão térmica, caixa/MB WAY, correção auditada, ementa+tradução, website multilingue, loja online, offline, desktop Windows, painel, reservas/inventário, etc.).
**Disclaimer:** Full "Sistema de uso interno…" notice in a muted bordered box.

## Image slot

A 4:3 placeholder block with the text "Screenshots em breve / Screenshots coming soon" using `bg-secondary/10` and a thin border. Once the user provides screenshots, swap in an `<img>` (or small gallery) without touching layout.

## i18n

All new strings added to `src/i18n/locales/pt.json` and `src/i18n/locales/en.json` under a new `studio.projects.posBrasa.*` namespace, plus `studio.projects.overline` / `studio.projects.heading`. EN is a faithful translation; PT is verbatim from the brief.

## Files to touch

- `src/pages/Studio.tsx` — insert new `<section id="projects">` before `#quote`.
- `src/i18n/locales/pt.json` and `src/i18n/locales/en.json` — add `studio.projects.*` keys.
- (Optional) anchor link added to Studio hero secondary CTA list if desired — flagged but not required.

## Out of scope

- No new route, no separate `/work` page yet (kept as a section so it's discoverable from the Studio funnel).
- No CMS — content is hardcoded in i18n. When we add a second project we can refactor into a small array/map.
- No screenshots wired up until the user uploads them.
