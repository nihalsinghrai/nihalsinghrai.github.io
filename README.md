# Nihal Singh Rai: portfolio website

Static site (HTML, CSS, JavaScript). No build step, no paid hosting. Live URL: https://nihalsinghrai.github.io/

## Structure
```
index.html          Home (about, services, projects, stack, process, FAQ preview, contact)
faq/index.html      Full FAQ page (FAQPage + Breadcrumb JSON-LD)
404.html            Not-found page
assets/css/style.css  Design system (themes, radii, components)
assets/js/main.js     Theme toggle and contact form
assets/images/        Put profile and project images here
robots.txt, sitemap.xml, llms.txt
.github/workflows/pages.yml  Deploy with GitHub Actions
```

## Deploy on GitHub Pages
1. Create a repository named exactly `nihalsinghrai.github.io` under your account.
2. Upload all files from this folder (keep `.nojekyll` and `.github`) to the `main` branch.
3. In the repository go to Settings > Pages > Source and choose **GitHub Actions**.
4. Push any change. The workflow publishes the site in about a minute.

Paths start with `/` because this is a user site served from the domain root. If you ever use a project repository instead, change them to relative paths.

## Contact form (Web3Forms, free)
1. Go to web3forms.com and enter `contact.nihalsinghrai@gmail.com` to get an access key by email.
2. Open `assets/js/main.js` and replace `YOUR_WEB3FORMS_ACCESS_KEY`.
3. In the Web3Forms dashboard, restrict the key to your domain. Access keys are public by design, so never put a private secret in this file.

Until a key is added, the form still opens an email draft and says clearly that automatic notification was not confirmed. Free-plan limits can change, so check Web3Forms before relying on it.

## SEO checklist
- Search Console: add the URL-prefix property `https://nihalsinghrai.github.io/` and verify it (HTML tag method: paste the tag in `<head>` of `index.html`).
- Sitemaps > submit `sitemap.xml`.
- URL Inspection > paste the homepage URL > Request indexing. Repeat for `/faq/`.
- Check structured data with Google's Rich Results Test. Indexing and rankings are not guaranteed.
- The share image is `assets/images/og/nihal-singh-rai-og.jpg`. Replace it with a 1200x630 version if you prefer.

## Replace before publishing
- Profile photo is already in place (`assets/images/profile/`). Replace the files to change it.
- Project screenshots or demo videos in `assets/images/projects/`
- Project status labels and real repository links in `index.html`
- Confirm the working/exploring tags in the Stack section

## Not included yet
Journey, testimonials and blog sections are left out because there is no verified content. Add them when real material exists.
