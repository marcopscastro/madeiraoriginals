## Plan: Replace Lovable favicon with Madeira Originals logo

1. Copy the uploaded logo to `public/favicon.png`.
2. Delete the existing `public/favicon.ico` so browsers don't fall back to the old Lovable icon.
3. Add a `<link rel="icon" href="/favicon.png" type="image/png">` tag inside `<head>` in `index.html`. Also add `<link rel="apple-touch-icon" href="/favicon.png">` for iOS.

### Notes
- The logo includes the full "MADEIRA ORIGINALS" wordmark, which will be hard to read at 32x32 favicon size. The triple-mountain "M" mark on its own would render much more clearly. If you'd like, I can crop/generate a square mark-only version (just the mountains + wave) as the favicon instead — let me know after approving and I'll do that as a follow-up. For now this plan uses the full logo as uploaded.
