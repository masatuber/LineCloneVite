import './App.css'
import SignIn from './components/SignIn.jsx';
//firebase-hooksよりモジュールインポート
import { useAuthState } from "react-firebase-hooks/auth";
//firebase.jsよりインポート
import { auth } from "../firebase.js";
import Line from './components/Line.jsx';
function App() {
  //ユーザー状態変数,[]がないとサインアウト機能しない注意
  const [user] = useAuthState(auth);

  return (
    <>
      <div>
        {/* 認証初期状態の判定 */}
        {user ? <Line /> : <SignIn />}
        
      </div>
    </>
  );
}

export default App
