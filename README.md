# Oakwood Online website

Marketing site for **Oakwood Online**, built with React, TypeScript, and Vite.

## Local development

```bash
npm install
npm run dev
```

Run `npm run build` to create the production site in `dist/`.

## Updating content

Most copy, navigation items, features, screenshots, FAQs, and community links are in `src/data/siteContent.ts`. Replace the `#` values under `links` when the Steam store and Discord invite URLs are ready.

The screenshot cards currently use intentionally labeled placeholders. Replace `ScenePlaceholder` in `src/components.tsx` with real responsive images as development screenshots become available.

## Deploying to GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and deploys the site whenever `main` changes.

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push to `main` or manually run **Deploy to GitHub Pages** from the Actions tab.

The Vite base path is already configured for `https://jtsimmons.github.io/oakwood-online-website/`. If the repository is renamed or moved to a custom domain, update `base` in `vite.config.ts`.
