# kyuc° — Keep Your Family's Stories Alive

> *Small conversations. A lasting connection. Preserve your family's stories in their own voice.*

Inspired by Kinlo, **kyuc°** is a family story preservation platform built with **Next.js 15 (App Router)**, **TypeScript**, **Vanilla CSS & Design Tokens**, and **Supabase (Auth, PostgreSQL, and Storage)**.

---

## Features

- **Bilingual Interface**: Seamless toggle between English (`🇬🇧 EN`) and Vietnamese (`🇻🇳 VI`).
- **Interactive Story Recorder**: In-browser audio recording (WebM), live playback, and instant downloads.
- **Photo Uploads**: Drag-and-drop cherished family photos with client-side compression and custom captions.
- **Family Archive (Dashboard)**: Personal space to explore, manage, and listen back to preserved memories.
- **Full Authentication**: Email/Password and Google OAuth ready with Supabase PKCE server-side cookies.
- **Curated Prompt Library**: Thoughtfully crafted questions across Roots, Traditions, and Life Lessons.

---

## Deploy to Vercel (Step-by-Step)

### Option A: Deploy via GitHub (Recommended)

1. **Push this repository to GitHub**:
   ```bash
   git remote add origin https://github.com/<your-username>/kyuc.git
   git branch -M main
   git push -u origin main
   ```
2. **Import into Vercel**:
   - Go to [https://vercel.com/new](https://vercel.com/new) and log in.
   - Select your `kyuc` repository and click **Import**.
3. **Configure Environment Variables in Vercel**:
   Before clicking **Deploy**, open the **Environment Variables** section and add:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://<your-project>.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `<your-supabase-anon-key>`
4. **Click Deploy**:
   Vercel will build and deploy your project with a live `.vercel.app` URL!

---

### Option B: Deploy via Vercel CLI (One command)

1. Open your terminal in this project directory:
   ```bash
   npx vercel
   ```
2. Follow the interactive prompts (log in with your Vercel account).
3. Set your environment variables when prompted or add them via:
   ```bash
   npx vercel env add NEXT_PUBLIC_SUPABASE_URL
   npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```
4. Deploy to production:
   ```bash
   npx vercel --prod
   ```

---

## Supabase URL Configuration for Production

When deployed to Vercel (e.g. `https://kyuc.vercel.app`):
1. In your **Supabase Dashboard**:
   - Go to **Authentication** ➔ **URL Configuration**.
   - Set **Site URL** to your Vercel production domain: `https://your-app.vercel.app`.
   - In **Redirect URLs**, add:
     - `https://your-app.vercel.app/auth/callback`
     - `https://your-app.vercel.app/dashboard`
2. If using **Google OAuth**:
   - In **Google Cloud Console**, add `https://your-app.vercel.app/auth/callback` to the **Authorized redirect URIs**.

---

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.
