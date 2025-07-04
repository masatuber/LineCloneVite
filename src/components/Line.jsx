import React, { useEffect, useState, useRef} from 'react'
import SignOut from './SignOut';
import { auth, db } from "../../firebase.js";
import SendMessage from './SendMessage.jsx';
//dbに格納されているファイアーストアに接続する

function Line() {
  //メッセージの状態管理,空配列を代入
  const [messages, setMessages] = useState([]);

  const scroll = useRef();

  useEffect(() => {
    //コレクションメソッド,Cloud Firestoreにあるコレクションカラムにmessgesが対応する
    db.collection("messages") //オーダーバイメソッドにタイムスタンプを受け渡す
      .orderBy("createdAt") //orderBy() や limit() と組み合わせることが可能
      .limit(50) //取得制限
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      }); 
      //onSnapshot() メソッドを使用すると、ドキュメントをリッスン可能,snapshotにdocsが含まれる
  }, [])
  //マウント時に一回だけ発火する仕様

  return (
    <>
      {console.log(messages)}
      <SignOut />
      {/* マップでメッセージ取出す,配列になっていない */}
      <div className="msgs">
        {messages.map(({ uid, text, PhotoURL }) => (
          <div>
            {/* マップで取出すにはkey必須 */}
            <div
              key={messages.uid}
              className={`msg ${
                uid === auth.currentUser.uid ? "sent" : "received"
              }`}
            >
              <img src={PhotoURL} alt="" />
              <p>{text}</p>
            </div>
          </div>
        ))}
      </div>
      <SendMessage scroll={scroll} />
      <div ref={scroll}></div>
    </>
  );
}

export default Line
