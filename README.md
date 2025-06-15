これは懸垂アプリのフロントエンドとバックエンドを担うプログラムです。

## Getting Started

テスト環境を試すなら下のコマンドでプログラムを開始します。

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

テスト環境の動作は [http://localhost:3000](http://localhost:3000) で確認可能.

layout.tsxは、その配下のページのレイアウト、page.tsxはページのデザインを作ります。
loading.tsxはページ読み込み時に表示されるコンテンツです。

## このプログラムで現在できていること
ロード画面、グラフとランキングの表示、apiファイルの設置(外部のデータベースに接続することは未だできていない。)

## 将来可能にしたいこと
外部のデータベースへの接続とデータの取得、ログイン機能(個人の成績を表示したい。)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
