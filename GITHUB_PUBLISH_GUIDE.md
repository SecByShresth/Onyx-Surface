# 🚀 Publishing "Onyx Surface" to GitHub

Since Onyx Surface is designed as a **100% Client-Side / Ephemeral** application, it is perfect for **GitHub Pages**. This allows you to host it for free, directly from your repository, with no backend servers required.

## 📦 Prerequisites

1.  **GitHub Account**: You need a GitHub account.
2.  **Git Installed**: You need Git installed on your Windows machine.
3.  **Favicon**: Move the generated `onyx_favicon.png` to the root folder and rename it to `favicon.png`.

## ❓ FAQ: What about `app.py`?

You will notice an `app.py` file in your folder.
*   **Should I push it?** Yes, it's fine to keep it in the repository as a reference for local testing.
*   **Does GitHub Pages use it?** **NO.** GitHub Pages ignores Python backend files. It only hosts the static HTML/JS.
*   **Will it break anything?** No, it will just sit there as a static file.

## 🛠️ Step 1: Initialize Git Repository

Open your terminal in `c:\Users\ASUS\Desktop\Onyx Surface` and run:

```powershell
git init
git add .
git commit -m "Initial release of Onyx Surface - Enterprise Grade"
```

## 🔗 Step 2: Create Repository on GitHub

1.  Go to [github.com/new](https://github.com/new).
2.  Repository Name: `onyx-surface` (or `Onyx-Intelligence`).
3.  Make it **Public**.
4.  **Do not** initialize with README/License (we already have local files).
5.  Click **Create repository**.

## ⬆️ Step 3: Push Code

Copy the commands shown on GitHub (under "...or push an existing repository from the command line") and run them. It usually looks like this:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/onyx-surface.git
git branch -M main
git push -u origin main
```

## 🌐 Step 4: Enable GitHub Pages

1.  Go to your repository **Settings** tab.
2.  Scroll down to **Pages** (in the sidebar).
3.  Under **Build and deployment** > **Source**, select **Deploy from a branch**.
4.  Under **Branch**, select `main` and folder `/ (root)`.
5.  Click **Save**.

## 🎉 Done!

In about 1-2 minutes, GitHub will give you a link (e.g., `https://your-username.github.io/onyx-surface/`).
Your Enterprise Threat Intelligence Platform is now live!

---

### ✅ Checklist for Public Release

- [x] **No Secrets**: We verified API keys are *only* stored in `sessionStorage` (ephemeral) and passed via UI inputs. No hardcoded keys in `attack-surface.js`.
- [x] **Mixed Content**: Ensure all API calls (Chart.js, fonts) use `https://`.
- [x] **MIT License**: Recommended to add a `LICENSE` file (MIT or Apache 2.0) if you want others to use/contribute.
