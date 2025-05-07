# Bitcoin Node Server

Example frontend: https://btc-dashboard-kl97.vercel.app/

A Node.js + Express backend for exposing Bitcoin Core node data, including mempool monitoring and blockchain info. Built with TypeScript, Prisma, Docker, and TSOA.

## 🔧 Features

-   Exposes Bitcoin blockchain data via REST API
-   Monitors mempool and blocks
-   Uses Prisma + PostgreSQL
-   Swagger documentation via TSOA
-   Auto-deployable via GitHub webhook
-   Accessible via [Ngrok](https://ngrok.com)

---

## 🚀 Local Development

### 1. Clone and install dependencies

```bash
git clone https://github.com/josematute/bitcoin-node-server.git
cd bitcoin-node-server
npm install
```

### 2. Set up environment variables

Create a `.env` file with required variables. See `.env.example`

### 3. Start Docker (PostgreSQL)

```bash
npm run compose
```

### 4. Run database migrations

```bash
npm run db:generate
npm run db:migrate -- name init
```

### 5. Start development server

```bash
npm run dev
```

Access Swagger docs at:  
`http://localhost:8080/docs`

---

## 🛰 Deployment (Auto Webhook + PM2 + Ngrok)

### 1. Webhook listener

Create `deploy-webhook-server.js` to trigger deployments on push:

```js
const express = require("express");
const { exec } = require("child_process");
const path = require("path");

const app = express();
app.use(express.json());

app.post("/deploy-bitcoin-node", (req, res) => {
  console.log("🔔 Webhook received. Starting deploy...");
  const scriptPath = path.join(__dirname, "deploy.sh");

  exec(scriptPath, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Deployment failed: ${error.message}`);
      return res.status(500).send("Deployment failed");
    }
    console.log(`✅ Output:\n${stdout}`);
    res.status(200).send("Deployment started");
  });
});

app.listen(8080, "0.0.0.0", () => {
  console.log("🚀 Webhook server running on http://0.0.0.0:8080/deploy-bitcoin-node");
});
```

### 2. Deployment script (`deploy.sh`)

```bash
#!/bin/bash
set -e
cd ~/dev/bitcoin-node-server || exit

echo "🚀 Checking for updates..."
git fetch origin main
if git diff --quiet HEAD origin/main; then
  echo "✅ No new commits. Exiting."
  exit 0
fi

echo "📥 Pulling latest code..."
git reset --hard origin/main
npm install

echo "🔄 Restarting DB and server..."
npm run db:restart

echo "✅ Deployment finished at $(date)"
```

Make it executable:

```bash
chmod +x deploy.sh
```

### 3. Start webhook listener with PM2

```bash
pm2 start deploy-webhook-server.js --name deploy-listener
pm2 save
```

### 4. Expose server with Ngrok

Your `ngrok.yml` should look like:

```yaml
version: 2
tunnels:
  btc-server:
    proto: http
    addr: 8080
    domain: jeg.ngrok.app
```

Then run:

```bash
ngrok start --all
```

### 5. GitHub Webhook Setup

In GitHub → Settings → Webhooks:

-   Payload URL: `https://jeg.ngrok.app/deploy-bitcoin-node`
-   Content type: `application/json`
-   Event: **Just the push event**

---

## 📂 Useful Scripts

| Script               | Description                        |
| -------------------- | ---------------------------------- |
| `npm run dev`        | Start dev server (watch + nodemon) |
| `npm run build`      | Compile TypeScript & TSOA routes   |
| `npm run compose`    | Start Docker (PostgreSQL)          |
| `npm run db:restart` | Restart DB and run migrations      |
| `npm run update`     | Pull latest code + install deps    |

---

## 📄 License

MIT © Jeg
