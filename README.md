# React + Vite
# サインインの機能より開始する
<br>

# セットアップ手順↓
 npm install @mui/material @emotion/react @emotion/styled<br>
 npm install @mui/icons-material<br>
 npm install firebase<br>
 npm install --save react-firebase-hooks<br>


* ファイアーストアのパーミッションが不足エラー

Uncaught Error in snapshot listener: FirebaseError: [code=permission-denied]: Missing or insufficient permissions.

ルールを変更し公開することで解決
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}




This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
