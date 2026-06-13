# プロジェクト概要

## 📁 ディレクトリ構成

```text
.
├── README.md           # プロジェクトのルートドキュメント
├── client/             # フロントエンド (Vue.js SPA)
└── server/             # バックエンド (Hono API Server)

```

---

## 💻 技術スタック

### フロントエンド (`client/`)

* **フレームワーク:** Vue.js 3 (Composition API / `<script setup>`)
* **ビルドツール:** Vite
* **開発言語:** TypeScript
* **ルーティング:** Vue Router
* **状態管理:** Pinia
* **API通信:** Fetch API
* **テストフレームワーク:** Vitest
* **静的解析・コード整形:** ESLint + Prettier

### バックエンド (`server/`)

* **フレームワーク:** Hono
* **開発言語:** TypeScript
* **API仕様書・バリデーション:** `@hono/zod-openapi` + Swagger UI
* **実行環境:** Node.js (またはBun等)

---

## 🚀 起動手順

### 1. フロントエンド (`client/`)

Viteの公式スキャフォールディングツールを利用してプロジェクトのベースを生成し、依存関係をインストールして起動します。

```bash
# 1. clientディレクトリへ移動
cd client

# 2. プロジェクトの作成（現在のディレクトリに展開）
# ※プロンプトでTS, Vue Router, Pinia, Vitest, ESLint, Prettierを「Yes」に設定
npm create vue@latest .

# 3. 依存関係のインストール
npm install

# 4. 開発サーバーの起動
npm run dev

```

### 2. バックエンド (`server/`)

Honoのプロジェクトを作成後、OpenAPIの自動生成に必要なパッケージを追加でインストールして起動します。

```bash
# 1. serverディレクトリへ移動
cd server

# 2. プロジェクトの作成（現在のディレクトリに展開）
npm create hono@latest .

# 3. OpenAPIおよびバリデーション用のパッケージを追加
npm install @hono/zod-openapi @hono/swagger-ui zod

# 4. 依存関係のインストール
npm install

# 5. 開発サーバーの起動
npm run dev

```

### 3. バックエンド Docker 起動 (`server/`)

既存の Docker コンテナとポートが競合しないよう、ホスト側ポートを `.env` で指定して起動します。

#### ポート競合の確認

```bash
# 稼働中 Docker コンテナのポート一覧
docker ps --format 'table {{.Names}}\t{{.Ports}}'

# ホスト全体の LISTEN ポート確認
ss -tlnp | grep LISTEN
```

#### 起動手順

```bash
# 1. serverディレクトリへ移動
cd server

# 2. 環境変数ファイルの作成
cp .env.example .env
# HOST_PORT=13000 を必要に応じて変更（競合時は 13001 など別番号に）

# 3. イメージのビルドと起動
docker compose build
docker compose up -d

# 4. 動作確認
curl http://localhost:13000/health
```

#### アクセス URL

| 用途 | URL |
|------|-----|
| Health Check | `http://localhost:${HOST_PORT}/health` |
| Swagger UI | `http://localhost:${HOST_PORT}/ui` |
| OpenAPI Spec | `http://localhost:${HOST_PORT}/doc` |

#### ポート競合時の対処

`Bind for 0.0.0.0:13000 failed: port is already allocated` が出た場合:

1. `.env` の `HOST_PORT` を別番号に変更（例: `13001`）
2. `docker compose down && docker compose up -d`
3. `curl http://localhost:13001/health` で再確認

コンテナ内の `PORT=3000` は変更不要。ホスト側マッピングだけ変更すればよい。

#### Vue クライアントとの接続

- Vue dev server: `http://localhost:5173`
- API ベース URL: `http://localhost:13000`（`HOST_PORT` に合わせる）

