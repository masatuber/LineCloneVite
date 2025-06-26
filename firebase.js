import firebase from "firebase/compat/app";
import "firebase/compat/auth"; //オースも読込注意
import "firebase/compat/firestore"; //ファイアーストア読込注意

//ファイアーベース初期化アプリ登録後Configコピペ
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC50vYaBfpylIlyiDi7WkaR28EtalInBYE",
  authDomain: "line-clone-4be3a.firebaseapp.com",
  projectId: "line-clone-4be3a",
  storageBucket: "line-clone-4be3a.firebasestorage.app",
  messagingSenderId: "392891573495",
  appId: "1:392891573495:web:24d36a2269de8fd868dff2"
});

//ファイアーストア用意
const db = firebaseApp.firestore();

//認証情報用意
const auth = firebase.auth();

//複数エクスポート
export { db, auth };