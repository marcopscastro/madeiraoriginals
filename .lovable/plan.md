

# Search Overlay

Add a search overlay triggered by the search icon in the Header. When opened, it shows a full-width overlay with an auto-focused input that filters products by name in real-time, displaying matching results as clickable links to their product detail pages.

## Implementation

### 1. Create `src/components/SearchOverlay.tsx`
- Full-screen overlay with semi-transparent backdrop (`bg-background/95 backdrop-blur`)
- Auto-focused text input at the top with close (X) button
- Filters `products` array from `src/data/products.ts` by name (case-insensitive `includes`)
- Shows matching products as a list with image thumbnail, name, price — each links to `/product/:id`
- Empty state: "No products found" when query has no matches
- Close on Escape key, clicking X, or clicking backdrop
- Keyboard trap: focus stays in overlay while open

### 2. Update `src/components/Header.tsx`
- Add `searchOpen` state
- Wire search icon button to `setSearchOpen(true)`
- Render `<SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />`

### Files Changed
| Action | File |
|--------|------|
| Create | `src/components/SearchOverlay.tsx` |
| Update | `src/components/Header.tsx` |

