# Vue 3 + TypeScript + Vite

## ディレクトリ構成

```.ini
src/
├── assets/          # 静的ファイル（画像、共通CSSなど）
├── components/      # アプリ全体で使い回す共通UIコンポーネント
│   └── ui/          # (shadcn-vueなどで生成されたButtonやInputなど)
├── composables/     # 全体で使い回す共通ロジック (useAuthなど)
├── stores/          # 全体で共有するPiniaのStore (認証情報など)
├── lib/             # 共通のユーティリティ関数など
├── router/          # ルーティング設定 (index.ts)
├── types/          # 共通型定義
├── views/           # URLのルートと1:1で紐づくページコンポーネント
│   ├── HomeView.vue
│   └── TodoView.vue
└── features/        # 🌟 機能（ドメイン）ごとに閉じたモジュール群
    ├── todos/       # 「Todo機能」に関連するものをここに全部集める
    │   ├── api/     # Todo関連のfetch処理
        ├── types/
    │   ├── components/ # Todo専用のコンポーネント (TodoList.vueなど)
    │   └── composables/# Todo専用のロジック (useTodos.tsなど)
    └── users/       # 「ユーザー機能」に関連するもの
        ├── api/
        ├── types/
        ├── components/
        └── stores/  # ユーザー機能だけで使うPinia
```

## API 型定義の生成

Hono の Swagger（OpenAPI）から型を生成する:

```bash
npm run generate
```

- `src/types/api.ts` — 自動生成（編集しない）
- `src/types/models.ts` — `Todo` などのエイリアス

バックエンド（Docker）が `http://localhost:13000` で起動している必要がある。
