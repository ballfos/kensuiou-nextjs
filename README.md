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
YOLOによる動画解析とpythonでの記録送信(ラズパイでサーバに送信)

postgre sqlの接続とデータの取得
(db.tsでSQL操作を行い、graphやmembersの中のpage.tsxでデータを加工して表示する)

ロード画面
![IMAGE ALT TEXT](README_imgs/chinups.gif)

折れ線グラフとランキングの表示
![IMAGE ALT TEXT](README_imgs/chinup_king_movie.gif)

## 将来可能にしたいこと
全ての条件でデータを取得(全期間×wide等、一部の組み合わせが表示できていない)

ログイン機能(個人と他の人の成績を比べたい)

動画や画像を見て自分の懸垂の振り返りる機能

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
