# プロジェクト概要

Vue.js 3 SPA の学習用リポジトリ。フロントエンド（`client/`）とバックエンド（`server/`）のモノレポ構成。

## ディレクトリ構成

```text
.
├── README.md
├── client/                 # フロントエンド (Vue.js SPA)
│   └── src/
│       ├── router/         # Vue Router
│       └── views/          # 画面コンポーネント (Home, Todo など)
└── server/                 # バックエンド (Hono API Server)
    ├── src/
    ├── Dockerfile
    └── docker-compose.yml
```

---

## 技術スタック

### フロントエンド (`client/`)

| 項目 | 採用技術 |
|------|----------|
| フレームワーク | Vue.js 3 (Composition API / `<script setup>`) |
| ビルドツール | Vite |
| 開発言語 | TypeScript |
| ルーティング | Vue Router |
| スタイリング | Tailwind CSS v4 |
| UI | shadcn-vue |
| API 通信 | Fetch API |

### バックエンド (`server/`)

| 項目 | 採用技術 |
|------|----------|
| フレームワーク | Hono |
| 開発言語 | TypeScript |
| API 仕様書・バリデーション | `@hono/zod-openapi` + Swagger UI |
| 実行環境 | Bun |
| コンテナ | Docker (`oven/bun:1-debian`) |

---

## 起動手順

初期セットアップ済み。開発者は以下だけ実行すればよい。

### 1. バックエンド（Docker）

```bash
cd server

# 初回のみ: 環境変数ファイルの作成
cp .env.example .env

# イメージのビルドと起動
docker compose build
docker compose up -d

# 動作確認
curl http://localhost:13000/health
```

コード変更後に反映する場合:

```bash
docker compose build && docker compose up -d
```

### 2. フロントエンド

```bash
cd client
npm install
npm run dev
```

ブラウザで `http://localhost:5173` を開く。

---

## アクセス URL

### フロントエンド

| 用途 | URL |
|------|-----|
| 開発サーバー | `http://localhost:5173` |
| Home | `http://localhost:5173/` |

### バックエンド API

デフォルトのホストポートは `13000`（`.env` の `HOST_PORT` で変更可）。

| 用途 | URL |
|------|-----|
| Health Check | `http://localhost:13000/health` |
| Swagger UI | `http://localhost:13000/ui` |
| OpenAPI Spec | `http://localhost:13000/doc` |
| TODO 一覧 | `GET http://localhost:13000/todos` |
| ユーザー一覧 | `GET http://localhost:13000/users` |

フロントエンドから API を呼ぶ際のベース URL:

```
http://localhost:13000
```

---

## ポート競合の確認と対処

### 使用中ポートの確認

```bash
docker ps --format 'table {{.Names}}\t{{.Ports}}'
ss -tlnp | grep LISTEN
```

### 競合時の対処

`Bind for 0.0.0.0:13000 failed: port is already allocated` が出た場合:

1. `server/.env` の `HOST_PORT` を別番号に変更（例: `13001`）
2. `docker compose down && docker compose up -d`
3. `curl http://localhost:13001/health` で再確認

コンテナ内の `PORT=3000` は変更不要。ホスト側マッピングだけ変更すればよい。

### ポート整理（参考）

| サービス | ホストポート |
|----------|-------------|
| Vue dev server | `5173` |
| Hono API（Docker） | `13000`（デフォルト） |
| Hono（コンテナ内部） | `3000` |

ホストの `3000` は他プロジェクト（例: Next.js）と競合しうるが、Docker 経由（`13000`）なら問題ない。

---

## 補足: ローカルで Bun 起動する場合（任意）

通常は Docker 利用を推奨。コンテナを使わず直接起動する場合:

```bash
cd server
bun install
bun run dev
```

この場合はホストの `3000` で listen するため、他サービスとのポート競合に注意。
