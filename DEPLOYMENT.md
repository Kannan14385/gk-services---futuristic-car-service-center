# Hosting & Deployment Guide — GK Services

This guide provides instant step-by-step instructions to host and deploy the **GK Services – Futuristic Car Service Center** web application live.

---

## 🚀 1. Deploy with Netlify (Recommended)
This repository includes a pre-configured `netlify.toml` optimized for single-page applications and high-speed GLTF asset caching.

### Option A: Via Netlify CLI
```bash
# 1. Install Netlify CLI globally (if not already installed)
npm install -g netlify-cli

# 2. Authenticate
netlify login

# 3. Deploy to production
netlify deploy --prod
```
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`

### Option B: Via Netlify Dashboard (1-Click Git Connect)
1. Push this repository to GitHub: `https://github.com/Kannan14385/GK-Services---Futuristic-Car-Service-Center`
2. Go to [app.netlify.com](https://app.netlify.com) and click **"Add new site" > "Import an existing project"**.
3. Select your GitHub repository.
4. Netlify will auto-detect `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click **"Deploy GK Services"**. Your app will be live with an SSL HTTPS domain (e.g. `https://gk-services.netlify.app`).

---

## ⚡ 2. Deploy with Vercel
This repository includes `vercel.json` with SPA routing and Draco cache headers.

### Option A: Via Vercel CLI
```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy to production
vercel --prod
```

### Option B: Via Vercel Dashboard
1. Go to [vercel.com/new](https://vercel.com/new).
2. Import your GitHub repository.
3. Framework Preset: **Vite**.
4. Click **Deploy**.

---

## 🌐 3. Deploy with Render (Static Site)
This repository includes a `render.yaml` specification matching Gokul's portfolio deployment stack.

1. Go to [dashboard.render.com](https://dashboard.render.com).
2. Click **New + > Static Site**.
3. Connect your GitHub repository.
4. Set:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
5. Click **Create Static Site**.

---

## 💻 4. Run Locally (Dev & Production Preview)

### Development Server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Preview:
```bash
npm run build
npm run preview
```

---

## 📂 Production Distribution Assets
When running `npm run build`, the production output is bundled into the `dist/` directory:
- `dist/index.html` — Optimized HTML entrypoint with font pre-connects and SEO meta tags.
- `dist/assets/` — Minified JS bundles and CSS modules.
- `dist/models/sports-car.glb` — High-fidelity 3D car geometry.
- `dist/draco/` — WebAssembly Draco decompression binaries.
