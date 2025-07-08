import './App.css'
import SignIn from './components/SignIn.jsx';
import { useAuthState } from "react-firebase-hooks/auth"; //firebase-hooksよりモジュールインポート
import { auth } from "../firebase.js";  //firebase.jsよりインポート
import { Routes, Route, Navigate } from "react-router-dom";
import Line from './components/Line.jsx';
import GeminiBot from './components/geminiBot/GeminiBot.jsx';
import SignOut from './components/SignOut.jsx';
import NotFound from "./components/notfound/NotFound.jsx";
function App() {
  //ユーザー状態変数,[]がないとサインアウト機能しない注意
  const [user] = useAuthState(auth);

  return (
    <>
      <div>
        {/* 認証初期状態の判定 */}
        {/* {user ? <Line /> : <SignIn />} */}
        <Routes>
          <Route path="/" element={user ? <Line /> : <SignIn />} />
          <Route
            index
            path="/signin"
            element={user ? <Navigate to="/" /> : <SignIn />}
          />
          {/* <Route path="/line" element={<Line />} /> */}
          <Route path="/geminibot" element={<GeminiBot />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App
