# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Prerendering (for SEO + AI tooling)

Public routes are snapshotted to static HTML after every build so crawlers
and AI tools (like Claude) can read real content without executing JS.

- Runs automatically as a `postbuild` step (`scripts/prerender.mjs`).
- Boots `vite preview`, walks every route with headless Chromium, writes
  `dist/<route>/index.html`. The SPA still hydrates on load — snapshots only
  seed the initial HTML.
- Route list: `src/lib/prerenderRoutes.ts` (static) plus all published
  journal posts (Lovable Cloud) and Shopify products fetched at build time.
- Safe-by-default: if Chromium can't launch, the script logs a warning and
  exits 0 so the build never fails.

To regenerate snapshots manually after content changes:

```sh
npm run build      # also runs prerender
# or, against an existing dist/:
npm run prerender
```

## Editing the codebase outside Lovable (Claude Code, etc.)

Connect this project to GitHub via the **GitHub** button in the Lovable
top bar. Once connected, every change syncs both ways. You can then
`git clone` the repo locally and use Claude Code (or any IDE) to read and
edit files — pushes to `main` flow back into Lovable automatically.

