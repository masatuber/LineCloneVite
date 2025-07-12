import firebase from "firebase/compat/app";
import "firebase/compat/auth"; //オースも読込注意
import "firebase/compat/firestore"; //ファイアーストア読込注意

//───────────────────────────────ここからFIREBASE設定定数─────────────────────────────────────────────────────────────────────────────────────────────────
const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
const AUTH_DOMAIN = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const STORAGE_BUCKET = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
const MESSAGING_SENDER_ID = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
const APP_ID = import.meta.env.VITE_FIREBASE_APP_ID;
//───────────────────────────────ここまでがFIREBASE設定定数─────────────────────────────────────────────────────────────────────────────────────────────────

//ファイアーベース初期化アプリ登録後Configコピペ
const firebaseApp = firebase.initializeApp({
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
});

//ファイアーストア用意
const db = firebaseApp.firestore();

//認証情報用意
const auth = firebase.auth();

//複数エクスポート
export { db, auth };