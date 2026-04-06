# Deploying Benefactor UI with Dokploy

## Prerequisites

- Hostinger VPS with SSH access
- Domain on Cloudflare
- Git repository (GitHub/GitLab)

---

## 1. Install Dokploy on Hostinger VPS

SSH into your server and run:

```bash
curl -sSL https://dokploy.com/install.sh | sh
```

Once installed, access the Dokploy panel at `http://<your-server-ip>:3000` and create your admin account.

---

## 2. Create the Project in Dokploy

1. Go to **Projects** > **Create Project** (e.g., "Benefactor")
2. Inside the project, click **Add Service** > **Application**
3. Name it `benefactor-ui`

---

## 3. Connect Your Git Repository

1. Open the `benefactor-ui` service
2. Go to **General** tab
3. Under **Source**, select **GitHub** (or GitLab)
   - If first time: click **Connect** and authorize Dokploy to access your repos
4. Select your repository and branch (`main`)
5. Set **Build Path** to `/ui` (since the Dockerfile is inside the ui folder)

---

## 4. Configure Build Settings

1. In the **General** tab:
   - **Build Type**: Dockerfile
   - **Dockerfile Path**: `./Dockerfile`
2. In the **Ports** section:
   - Add port mapping: **Host**: leave auto / **Container**: `3000`
3. Click **Deploy**

Wait for the build to complete. Check **Deployments** tab for logs.

---

## 5. Set Up Domain in Dokploy

1. Go to the **Domains** tab of your service
2. Click **Add Domain**
3. Enter your domain: `yourdomain.com` (or `www.yourdomain.com`)
4. Enable **HTTPS** (Dokploy uses Let's Encrypt automatically)
5. Save

---

## 6. Configure Cloudflare DNS

1. Log in to Cloudflare > select your domain
2. Go to **DNS** > **Records**
3. Add an **A record**:
   - **Name**: `@` (or `www`)
   - **IPv4 address**: your Hostinger server IP
   - **Proxy status**: **DNS only** (grey cloud) — important so Let's Encrypt can issue the certificate
4. If you want both `yourdomain.com` and `www.yourdomain.com`:
   - Add a second A record for `www` pointing to the same IP

> **Note**: Keep Cloudflare proxy OFF (grey cloud) if Dokploy handles SSL via Let's Encrypt. If you prefer Cloudflare SSL instead, set proxy to ON (orange cloud) and set Cloudflare SSL mode to **Full (Strict)**.

---

## 7. Verify

1. Wait a few minutes for DNS propagation
2. Visit `https://yourdomain.com` — your site should be live

---

## Redeployment

Every time you push to the configured branch, you can either:

- **Auto-deploy**: Enable it in Dokploy under your service settings
- **Manual deploy**: Click **Deploy** in the Dokploy dashboard

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Build fails | Check **Deployments** tab for logs. Ensure Build Path is `/ui` |
| Site not loading | Verify DNS A record points to correct server IP |
| SSL not working | Make sure Cloudflare proxy is OFF (grey cloud) for Let's Encrypt, or set Cloudflare SSL to Full (Strict) if proxy is ON |
| 404 on subpages | Next.js handles routing natively — check your routes in `src/app/` |
