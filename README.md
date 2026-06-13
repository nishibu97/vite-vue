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
