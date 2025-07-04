# 🛠 開発ガイドライン

## 開発概要

本プロジェクトは、NEXTJSでおみくじアプリを作るものです。
TOP画面にはおみくじのイラストと「おみくじを引く」のボタンがあり、
ボタンを押すとおみくじの箱のイラスト斜め上下に2秒くらいシャカシャカ動き、
大吉、中吉、小吉、吉、凶、大凶のどれかを出すアプリケーションです。
おみくじを引くボタンは、結果が出たら3秒再度非表示ですが、そのあと下の方に「再度おみくじを引く」として出てきます。

- 言語: Node 24.3.0
- アーキテクチャ: クリーンアーキテクチャ + DDD
- フレームワーク: NEXTJS
- CSS: Emotion CSS
- 実行方式: Vercel (デプロイ先)

## コーディング規約

- フォーマッター: biome
- Linter（構文・スタイルチェック）: biome
- インポート整形: biome
- 型チェッカー: precommit
- 命名規則:
  - 関数名/変数名: camelCase
  - クラス名: PascalCase
  - 定数: UPPER_CASE

## ディレクトリ構成

```
/
├── src/
│   └──pages/
│   └──components/
├── docs/
├── README.md
├── .gitignore
└── biome.json
```

## テスト

## 管理
- yarn でライブラリ管理

## Git 運用

- ブランチ: feat/xxx, fix/xxx, refactor/xxx, chore/xxxなど
- main ブランチは常にデプロイ可能状態として運用する
- main ブランチにPullRequestがマージされたら、GitHubActionsが稼働してdeployが実施される
