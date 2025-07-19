# React + Vite
# 【Web アプリの主力機能】
<br>
Googleでログインしチャットする機能、滑らかにUIが変化しつつ、Gemini chatが可能です。
<br>

# サインインの機能より開始する
<br>

* 【使用技術】
データベース：Cloud Firestore<br>
言語       ：React.js 19.1.0<br>
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
npm install express<br>
npm install nodemon --save-dev<br>
npm install cors<br>

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

DB全体にアクセス出来ないエラーの解決方法<br>

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
LineCloneVite
      │─node_modules
      │─public
      └─src
        ├─assets
        └─components
            ├─geminiBot
            └─notfound

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

# 問題点

Gemini APIのクロスオリジンでエラー発生しました、解決方法模索中です。