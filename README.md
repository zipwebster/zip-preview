# ZIP website

Astro builds the public website. Decap CMS edits individual JSON entries in `src/content/programmes`, `src/content/people` and `src/content/news`. Design stays in reusable components and CSS. Existing navigation, programme pop-ups, logos and microsite links are retained. Programmes sort alphabetically automatically.

## Editing

The editor lives at `/zip-preview/admin/`. New entries default to unpublished. Use **Show on website** when approved. Programme entries with a microsite URL link there; those without open an overview. Turn off the placeholder notice when approved copy is ready. Policy Fellowships describes ZIP’s mentoring strand, not delivery of the full UKRI programme. Lukxmi, Georgia and Bex remain unpublished pending confirmation. Uploaded logos override existing brand marks; no code editing is required.

Decap uses editorial workflow: drafts and reviews are held in GitHub branches until published. Editors need write access to `zipwebster/zip-preview`. Publishing triggers the Astro build and GitHub Pages deployment.

## Run locally

Use Node 24 and pnpm 11.25.0. Run `pnpm install`, `pnpm dev`, and open the printed URL. `pnpm build` and `pnpm test` validate the publishable output. For local CMS editing, run `npx decap-server` in this directory in a second terminal; the local editor connects only on localhost.

## Online sign-in: one-time connection still required

Astro and Decap are free software. GitHub Pages cannot run the GitHub OAuth exchange. A separate authentication provider must be connected before online CMS editing works. The live editor displays a setup notice until configured; it does not pretend sign-in is available.

Connect a free OAuth service (Netlify or a Cloudflare Worker), register the GitHub OAuth app with that service's callback URL, and keep its client secret only in the service's secret storage. Set repository Actions variable `CMS_AUTH_BASE_URL` to its HTTPS origin and optionally `CMS_AUTH_ENDPOINT` (defaults to `auth`). Re-run the deployment. Complete a real sign-in, draft, preview and publish check before inviting editors. No credentials are stored in this project.

## Publishing

Set repository Settings → Pages → Source to **GitHub Actions**. `.github/workflows/deploy.yml` installs locked dependencies, builds, tests and publishes `dist`. Main is the production branch. Failed builds leave the previous deployment intact.

For a future custom domain, update Astro `site`/`base`, CMS site URLs and public upload paths together; currently these intentionally preserve the existing `/zip-preview/` address.
