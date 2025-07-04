# 🎋 おみくじアプリ

Next.js で作成したおみくじアプリケーションです。
Claude 4 Soonetで構築してみました.

## 機能

- おみくじを引くことができます
- おみくじの箱が2秒間シャカシャカ動きます
- 大吉、中吉、小吉、吉、凶、大凶の6種類の結果が出ます
- 結果表示後、3秒間ボタンが非表示になり、その後「再度おみくじを引く」ボタンが表示されます

## 技術スタック

- **フレームワーク**: Next.js 14
- **言語**: TypeScript
- **スタイリング**: Emotion CSS
- **アーキテクチャ**: クリーンアーキテクチャ + DDD
- **フォーマッター**: Biome
- **デプロイ**: Vercel

## 開発環境

- Node.js 24.3.0
- yarn

## セットアップ

1. 依存関係のインストール
```bash
yarn install
```

2. 開発サーバーの起動
```bash
yarn dev
```

3. ブラウザで http://localhost:3000 にアクセス

## スクリプト

- `yarn dev` - 開発サーバーの起動
- `yarn build` - プロダクションビルド
- `yarn start` - プロダクションサーバーの起動
- `yarn lint` - Biome でのリント
- `yarn lint:fix` - Biome でのリント（自動修正）
- `yarn format` - Biome でのフォーマット
- `yarn type-check` - TypeScript の型チェック

## ディレクトリ構成

```
/
├── src/
│   ├── pages/          # Next.js ページ
│   ├── components/     # React コンポーネント
│   ├── domain/         # ドメインロジック
│   ├── application/    # アプリケーションサービス
│   ├── infrastructure/ # インフラストラクチャ層
│   └── styles/         # スタイルファイル
├── docs/               # ドキュメント
└── README.md
```

## デプロイ

### Vercel への自動デプロイ

このプロジェクトは GitHub Actions を使用して Vercel に自動デプロイされます。

#### セットアップ手順

1. **Vercel プロジェクトの作成**
   - [Vercel](https://vercel.com) にログイン
   - 新しいプロジェクトを作成し、このリポジトリを接続

2. **Vercel トークンの取得**
   - Vercel ダッシュボードの Settings > Tokens から新しいトークンを作成

3. **プロジェクト情報の取得**
   ```bash
   # Vercel CLI をインストール
   npm i -g vercel
   
   # プロジェクトにリンク
   vercel link
   
   # プロジェクト情報を表示
   vercel project ls
   ```

4. **GitHub Secrets の設定**
   - GitHub リポジトリの Settings > Secrets and variables > Actions で以下を設定：
   
   | Secret Name | Description | 取得方法 |
   |-------------|-------------|----------|
   | `VERCEL_TOKEN` | Vercel API トークン | Vercel ダッシュボード > Settings > Tokens |
   | `VERCEL_ORG_ID` | Organization ID | `.vercel/project.json` の `orgId` |
   | `VERCEL_PROJECT_ID` | Project ID | `.vercel/project.json` の `projectId` |

#### デプロイフロー

- **Pull Request**: プレビュー環境にデプロイ
- **main ブランチへのマージ**: 本番環境にデプロイ

### 手動デプロイ

```bash
# Vercel CLI での手動デプロイ
vercel --prod
```

## CI/CD

### GitHub Actions ワークフロー

プロジェクトには以下の自動化されたワークフローが含まれています：

#### 品質チェック（全てのプッシュ・PR）
- コードのリント（Biome）
- TypeScript の型チェック
- プロジェクトのビルド

#### デプロイメント
- **Pull Request**: Vercel プレビュー環境への自動デプロイ
- **main ブランチマージ**: Vercel 本番環境への自動デプロイ

### ワークフロー設定ファイル
- `.github/workflows/deploy.yml`
