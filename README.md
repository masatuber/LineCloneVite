# React + Vite
# 【Web アプリの主力機能】
<br>
Googleアカウントでログインしグループチャットする機能、滑らかにUIが変化しつつ、Gemini chatが可能です。
<br>

# サインインの機能より開始する
<br>

* 【使用技術】

データベース：Cloud Firestore<br>
frontend言語：React.js 19.1.0<br>
backend言語: node.js フレームワークexpress.js 4.18.2<br>
Node.js    :v20.18.1<br>
Gemini API :2.5-flash-preview-04-17<br>

# セットアップ手順(ライブラリ含む)↓  
<br>
npm install @mui/material @emotion/react @emotion/styled<br>
npm install @mui/icons-material<br>
npm install firebase<br>
npm install --save react-firebase-hooks<br>
npm install react-router-dom<br>
npm install axios<br>

* ここからバックエンド側のコマンド
<br>

npm install express<br>
npm install nodemon --save-dev<br>
npm install cors<br>
npx eslint .<br>

npm install<br>
npm install -D eslint @eslint/js globals<br>
npm run lint<br>


* ファイアーストアのパーミッションが不足エラー <br>
Uncaught Error in snapshot listener: FirebaseError: [code=permission-denied]: Missing or insufficient permissions.<br>

```

ルールを変更し公開することで解決
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}

```

# DB全体にアクセス出来ないエラーの解決方法
<br>

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // コレクション内の任意のドキュメント（documentId）に対するルール
    match /messages/{documentId} {
      allow read, write: if request.auth != null;
    }
  }
}
```
* keyのエラーはドキュメントのIDを参照する

onSnapshotでコレクションを取り出した後、<br>
ドキュメントのid及びデータをそれぞれdoc.id、doc.dataとして取得しています。<br>

* プロジェクトdirectory

```
LineCloneVite/
├─.firebase/
├─node_modules/
├─dist/
├─public/
│      vite.svg
├─functions/
│       node_modules
│       index.js
│       eslint.config.mjs
│       package-lock.json
│       package.json
│
└─────src/
    │   App.css
    │   App.jsx
    │   main.jsx
    │
    ├─assets/
    │      react.svg
    │
    └─components/
        │   Line.jsx
        │   SendMessage.jsx
        │   SignIn.jsx
        │   SignOut.jsx
        │
        ├─geminiBot/
        │         GeminiBot.jsx
        │
        └─notfound/
                NotFound.jsx

```

# デプロイ手順

npm install -g firebase-tools
<br>
firebase login
<br>
firebase --version
<br>
firebase version 14.11.0
<br>
firebase init
<br>
firebase deploy
<br>
firebase functions:config:set gemini.apikey=""
<br>
firebase deploy --only functions
<br>
firebase deploy --only hosting
<br>

# 問題点
Gemini APIのクロスオリジンでエラー発生しました、プロキシでfunctionsにtriggerと思っていたら、<br>
APIエンドポイントが違うためエラーでした
<br>
http://localhost:3000/

/test は動作確認用エンドポイント

# 不明点だったこと

 ESLintを分離しなかったことで構文エラーに陥る<br>
 require は Node.js 環境専用<br>


```

ブラウザ用と分ける
  languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser, // ✅ ブラウザ用に限定
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
 },
node用と分ける
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.node, // ✅ Node.js グローバル変数 (requireなど)
    parserOptions: {
      sourceType: 'script', // CommonJS対応
    },
  },

```