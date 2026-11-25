# ZIP website

Astro builds the public website. Decap CMS edits individual JSON entries in `src/content/programmes`, `src/content/people` and `src/content/news`. Design stays in reusable components and CSS. Existing navigation, programme pop-ups, logos and microsite links are retained. Programmes sort alphabetically automatically.

## Editing

The editor lives at `/zip-preview/admin/`. New entries default to unpublished. Use **Show on website** when approved. Programme entries with a microsite URL link there; those without open an overview. Turn off the placeholder notice when approved copy is ready. Policy Fellowships describes ZIP’s mentoring strand, not delivery of the full UKRI programme. Lukxmi, Georgia and Bex remain unpublished pending confirmation. Uploaded logos override existing brand marks; no code editing is required.

Decap uses editorial workflow: drafts and reviews are held in GitHub branches until published. Editors need write access to `zipwebster/zip-preview`. Publishing triggers the Astro build and GitHub Pages deployment.

## Run locally

Use Node 24 and pnpm 11.25.0. Run `pnpm install`, `pnpm dev`, and open the printed URL. `pnpm build` and `pnpm test` validate the publishable output. For local CMS editing, run `pnpm cms` in this directory in a second terminal; the local editor connects only on localhost.

## Online sign-in

Astro and Decap are free software. Netlify hosts the editor and its built-in GitHub OAuth provider; GitHub Pages hosts the public website. The associated Netlify project is `astounding-gaufre-afe4fb` in the `zipwebster` team, on the Free plan. The GitHub OAuth app is **ZIP content editor**, owned by `zipwebster`.

The GitHub Pages `/zip-preview/admin/` address forwards to `https://astounding-gaufre-afe4fb.netlify.app/admin/`. Netlify authentication requires the editor to use this registered origin. The small Netlify deployment loads its collection configuration from the public GitHub Pages config, so CMS structure updates follow the normal GitHub deployment. The source for that deployment is in `netlify-editor/`; deploy those files to the existing Netlify project when changing its bootstrap. Asset proxies allow existing programme images and future uploads to preview correctly.

The client secret stays in Netlify's OAuth provider settings. GitHub Actions holds only the public configuration variables `CMS_AUTH_BASE_URL` and `CMS_SITE_DOMAIN`; no credentials are stored in this project. Decap requests `public_repo` access, which covers the signed-in account's public repositories rather than just this repository. Editors still need write access to `zipwebster/zip-preview`.

For Netlify's built-in provider, use callback `https://api.netlify.com/auth/done`, `CMS_AUTH_BASE_URL=https://api.netlify.com`, and `CMS_SITE_DOMAIN` set to the associated Netlify site's hostname. Install the GitHub provider under that Netlify project's Security → OAuth settings. The main ZIP website can stay on GitHub Pages.

If rebuilding this setup elsewhere, configure those two public Actions variables and re-run the deployment. If the authentication origin is unset, the editor shows a setup notice. If sign-in reports incorrect client credentials, replace the GitHub provider credentials in Netlify; never commit the secret or paste it into a chat.

## Publishing

Set repository Settings → Pages → Source to **GitHub Actions**. `.github/workflows/deploy.yml` installs locked dependencies, builds, tests and publishes `dist`. Main is the production branch. Failed builds leave the previous deployment intact.

For a future custom domain, update Astro `site`/`base`, CMS site URLs and public upload paths together; currently these intentionally preserve the existing `/zip-preview/` address.
