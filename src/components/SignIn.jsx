import Button from "@mui/material/Button";
import firebase from "firebase/compat/app";
import { auth } from "../../firebase.js"; // auth が Firebase Auth インスタンスであることを想定

function SignIn() {
  function signInGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    // signInWithPopup は非同期 Promise を返すので、.then() で結果を処理する
    auth
      .signInWithPopup(provider)
      .then((response) => {
        // 認証されたユーザー情報格納
        const user = response.user;
        console.log("認証成功！ ユーザー情報:", user);

        // currentUser もこの時点で利用可能
        const authResult = firebase.auth().currentUser;
        console.log("認証出来ているか (thenの中):", authResult);

        // 必要に応じて、ここでFirestoreの操作やUIの更新を行う
      })
      .catch((error) => {
        // 認証が失敗した場合にここに到達する
        console.error("認証エラー:", error.code, error.message);
        // エラーのハンドリング (例: ユーザーにエラーメッセージを表示)
      });
  }

  return (
    <>
      <div>
        <Button onClick={signInGoogle}>グーグルでログインする</Button>
      </div>
    </>
  );
}

export default SignIn;
