# nihalsinghrai.github.io

Portfolio of **Nihal Singh Rai**, automation developer. A fast static site: plain HTML, CSS and a little JavaScript. No build step, no framework, no server, so it deploys on GitHub Pages as it is.

Live site: https://nihalsinghrai.github.io/

## Files

| File | What it does |
|---|---|
| `index.html` | All page content: hero, about, two case studies, stack, FAQ, contact. Also holds the SEO tags and structured data. |
| `style.css` | The whole design: colours, borders, hard shadows, noise texture, responsive rules. |
| `main.js` | Marquee, stack chips, scroll reveal, parallax shapes. Edit the arrays `T` (marquee) and `S` (stack) to change skills. |
| `lead-finder.webp`, `samayu-booking.webp` | Workflow screenshots. Replace with demo videos later (see below). |
| `favicon.svg`, `og-image.png` | Browser icon and the preview image shown when the link is shared. |
| `robots.txt`, `sitemap.xml` | Tell search engines what to crawl. |
| `404.html` | Page shown for a wrong URL. |
| `.gitignore` | Stops secret files from being committed by mistake. |

## How to edit

- **Hero text, about, FAQ, contact:** edit `index.html`. Search for the text you want to change.
- **Add a project:** copy one `<article class="cs ...">` block in `index.html`, paste it after the last one, change the text, the `id` and the screenshot name.
- **FAQ:** the questions exist twice, as visible `<details>` blocks and inside the `FAQPage` JSON in the `<head>`. Keep both in sync.
- **Links and email:** change them in the contact section and in the `sameAs` list of the `Person` JSON in the `<head>`.
- **Demo video instead of a screenshot:** find the comment `DEMO VIDEO` inside a case study, delete the `<figure>` above it and use:

```html
<video controls playsinline preload="metadata" poster="lead-finder.webp" width="1100">
  <source src="lead-finder-demo.mp4" type="video/mp4" />
</video>
```

Keep videos under 25 MB (the GitHub web upload limit). Compress them first. Do not show real patient data, phone numbers, tokens or webhook URLs in any video or screenshot.

## Deploy on GitHub Pages

1. Repository name must be exactly `nihalsinghrai.github.io` and the repo must be Public.
2. Settings, Pages: Source = **Deploy from a branch**, Branch = **main**, Folder = **/ (root)**. Save.
3. Wait 1 to 2 minutes, then open the live URL and hard refresh.
4. Check these open correctly: `/robots.txt`, `/sitemap.xml`, `/favicon.svg`.

## Replace the old site

1. Open the repo. If you see `package.json`, `src/`, `vite.config.js` or `.github/workflows/deploy.yml`, the React version was uploaded earlier. Delete every one of those (open the file, trash icon, Commit). If Pages Source was set to "GitHub Actions", change it back to "Deploy from a branch".
2. Delete old leftovers: `script.js`, `data.js`, `avatar.webp`.
3. Add file, Upload files. Select all files from this folder and Commit. Files with the same name (`index.html`, `style.css`, `robots.txt`, `sitemap.xml`) are replaced automatically.
4. On a laptop with git:

```bash
git clone https://github.com/nihalsinghrai/nihalsinghrai.github.io
cd nihalsinghrai.github.io
git rm -r .            # removes the old files
# copy all new files into this folder, then:
git add -A
git commit -m "Replace site with new portfolio"
git push
```

## Security

What is already in place:
- Static site. No server, database, login or form, so there is nothing to hack on the server side.
- No secrets in the code. Never add API keys, tokens, passwords, webhook URLs, sheet IDs or chat IDs to any file. Everything in a public repo is readable by anyone.
- Content Security Policy in `index.html`: scripts only from this site, no inline scripts, no third-party scripts. Only Google Fonts is allowed for styles and fonts.
- External links use `rel="noopener noreferrer"`. A strict referrer policy is set.
- Page content is written in HTML, and `main.js` builds elements with fixed lists, not with user input.

What you must do:
- Turn on **2FA** on your GitHub account (Settings, Password and authentication). Use a passkey or authenticator app.
- If a secret is ever committed, treat it as leaked: rotate it first, then remove it. Deleting the file does not remove it from history.
- Keep the n8n screenshots and videos clean: hide webhook URLs, credentials, sheet links and any real customer data.
- Your email is public on the page, so expect some spam. You can later replace it with a contact form service.
- If you embed YouTube later, add `frame-src https://www.youtube-nocookie.com;` to the CSP in `index.html`.
- GitHub Pages cannot send custom HTTP headers, so the CSP is set with a meta tag. Enable Enforce HTTPS in Settings, Pages.

## SEO

Already done in `index.html`:
- Unique `<title>` and meta description, canonical URL, robots meta, Open Graph and Twitter tags with `og-image.png`.
- Structured data (JSON-LD): `Person` (name, job title, email, `sameAs` links to GitHub, LinkedIn, X) and `FAQPage`.
- One `<h1>`, clear `<h2>` and `<h3>` headings, real text content for the case studies (readable without JavaScript), image alt text and sizes.
- `sitemap.xml` and `robots.txt`. Fast load: no framework, small images, no tracking scripts.

To strengthen it (nothing is guaranteed, and new sites can take weeks):
- Use the same name, photo and headline on GitHub, LinkedIn, X and Fiverr/Upwork, and link each to this site. Add this site to the GitHub profile and the LinkedIn Featured section.
- Add real results when you have them: numbers, a demo video, a client quote with permission.
- Keep the FAQ answers factual and short, in plain language.
- Next step after the site is live: Google Search Console. Add the URL prefix property, verify, submit `sitemap.xml`, and request indexing for the home page.
- If you buy a custom domain later, update the canonical URL, `og:url`, `og:image`, `sitemap.xml`, `robots.txt` and the `url` in the JSON-LD.

## Notes

- Samayu Dental Clinic is a test build with demo data and is labelled as one. The lead email preview uses placeholder data.
- Fonts: Space Grotesk and JetBrains Mono from Google Fonts (SIL Open Font License).
- 
