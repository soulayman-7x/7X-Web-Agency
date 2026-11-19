# 7X Web Agency Portfolio

Bilingual (Arabic RTL + English LTR) static portfolio website for **7X Web Agency** and its founder **SOULAYMAN 7X** (Soulayman Id Baha), Full-Stack Web Developer, Morocco.

🌐 **Live site (after deploy):** https://soulayman-7x.github.io/7X-Web-Agency/

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (semantic, single `<h1>`, WCAG AA) |
| Styles | Tailwind CSS v3.4 (compiled, committed) |
| Scripts | Vanilla JavaScript (no frameworks, no jQuery) |
| Fonts | Cairo (Arabic) + Montserrat (English) via Google Fonts |
| Images | WebP via sharp (originals gitignored) |
| Deploy | GitHub Pages (static, no build on server) |

---

## Run Locally

### Option A — Open directly (simplest)
```
index.html → double-click or drag into browser
```
> All paths are relative, so this works without a server.

### Option B — Serve with Node
```bash
npm install
npx serve . -l 8080
# Then open http://localhost:8080/
```

### Option C — XAMPP
Copy or symlink this folder into `C:\xampp\htdocs\7X-Web-Agency\`, then open:
```
http://localhost/7X-Web-Agency/
```

### Option D — Sub-path test (mirrors GitHub Pages)
```bash
# From the PARENT directory:
npx serve .. -l 3000
# Open: http://localhost:3000/7X-Web-Agency/
```

---

## Rebuild CSS

After editing `src/input.css`, `index.html`, or any JS/data file:
```bash
npm run build:css
```
Watch mode (auto-rebuild on save):
```bash
npm run watch:css
```

---

## Add a Project

1. **Drop screenshots** into `assets-src/projects/<slug>/` (PNG, any size)
2. **Convert to WebP:**
   ```bash
   npm run images
   ```
3. **Add an entry** to `data/projects.js` following the shape of existing entries.  
   Set `src` values to `assets/img/projects/<slug>/<name>.webp` and fill in `w`, `h` from the sharp output.
4. **Rebuild CSS** if you added new Tailwind classes.

---

## Deploy on GitHub Pages

1. Push to `main` branch.
2. Go to **Settings → Pages → Build and deployment**.
3. Source: **Deploy from a branch**.
4. Branch: `main` / `/ (root)`.
5. Save — the site will be live at `https://soulayman-7x.github.io/7X-Web-Agency/`.

> **Important:** `.nojekyll` is included so GitHub Pages does not interfere with the build.

---

## TODO / Open Items

- [ ] **Add Library Manager repo URL:** Update `data/projects.js` → `slug: 'library'` → set `repo: 'https://github.com/soulayman-7x/...'`
- [ ] **Confirm site URL assumption:** `https://soulayman-7x.github.io/7X-Web-Agency/` is assumed from your GitHub username. Update in `data/site.js`, `index.html` (canonical + OG), `robots.txt`, and `sitemap.xml` if different.
- [ ] **Push to GitHub:** Run `git push origin main` after confirming the above.
