# Bitcoin Node Server

Example frontend: https://btc.j3g.dev

A Node.js + Express backend for exposing Bitcoin Core node data, including mempool monitoring and blockchain info. Built with TypeScript, Express and TSOA.

## 🔧 Features

-   Exposes Bitcoin blockchain data via REST API
-   Monitors mempool and blocks
-   Swagger documentation via TSOA

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

### 3. Start development server

```bash
npm run dev
```

Access Swagger docs at:  
`http://localhost:8080/docs`

## 📄 License

MIT © Jeg
