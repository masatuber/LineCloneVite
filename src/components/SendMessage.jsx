//メッセージ送信,入力欄、ボタン
import React, { useState } from 'react';
import {db, auth} from "../../firebase.js";
import firebase from "firebase/compat/app";
import { Input } from '@mui/material';
import SendIcon from "@mui/icons-material/Send";
function SendMessage() {
  //入力欄状態管理変数
  const [inputMessage, setInputMessage] = useState("");
  //console.log(inputMessage, "入力欄");

  function SendMessages(e) {
    //関数引数eとpreventDefaultでリロード防止
    e.preventDefault();

    //現在ログインしているユーザー参照する
    const { uid, photoURL } = auth.currentUser;

    //DBに送信,addメソッド
    db.collection("messages").add({
      text: inputMessage,
      PhotoURL: photoURL,
      Uid: uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
 
    });
    //入力欄をクリア,バリューにメッセージ変数セットする
    setInputMessage("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <form onSubmit={SendMessages}>
        <div className="sendMsg">
          <Input
            style={{
              width: "78%",
              fontSize: "15px",
              fontWeight: "550",
              marginLeft: "5px",
              marginBottom: "-3px",
            }}
            placeholder="メッセージ入力して送信"
            type="text"
            onChange={(e) => setInputMessage(e.target.value)}
            value={inputMessage}
          />
          <SendIcon
            style={{ color: "#7AC2FF", marginLeft: "20px" }}
            onClick={SendMessages}
          />
        </div>
      </form>
    </>
  );
}

export default SendMessage
