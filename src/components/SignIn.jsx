
import Button from "@mui/material/Button";
import firebase from "firebase/compat/app";
import { auth, } from "../../firebase.js";

function SignIn() {
  function signInGoogle() {
    //認証を実装するFirebase SDKより参照
    const provider = new firebase.auth.GoogleAuthProvider();
    
    //ドキュメントGoogleログインに記述あり
    auth.signInWithPopup(provider);
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
