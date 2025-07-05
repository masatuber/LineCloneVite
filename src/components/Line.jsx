import React, { useEffect, useState, } from 'react'
import SignOut from './SignOut';
import { auth, db } from "../../firebase.js";
import SendMessage from './SendMessage.jsx';
import MessageList from './MessageList.jsx';

//dbに格納されているファイアーストアに接続する

function Line() {
  //メッセージの状態管理,空配列を代入
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    //コレクションメソッド,Cloud Firestoreにあるコレクションカラムにmessgesが対応する
    const collectionGet = db
      .collection("messages") //オーダーバイメソッドにタイムスタンプを受け渡す
      .orderBy("createdAt") //orderBy() や limit() と組み合わせることが可能
      .limit(50) //取得制限
      .onSnapshot((snapshot) => {
        //各ドキュメントがオブジェクトから配列に変換
        const collectionData = snapshot.docs.map((doc) => ({
          id: doc.id, //ユニークID含める
          ...doc.data(),
        }));

        //更新用メッセージ使用する
        setMessages(collectionData);
      });

    //onSnapshot() メソッドを使用すると、ドキュメントをリッスン可能,snapshotにdocsが含まれる
  }, []);
  //マウント時に一回だけ発火する仕様

  return (
    <>
      {console.log(messages)}
      <SignOut />
      {/* マップでメッセージ取出す,配列になっていない */}
      <div className="msgs">
        {messages.map(({ id, uid, text, PhotoURL }) => (
          // 最上位の要素にキーを記述する
          <div key={id}>
            {/* マップで取出すにはkey必須 */}

            <div
              className={`msg ${
                uid === auth.currentUser.uid ? "sent" : "received"
              }`}
              //クラス名を条件によって変更しCSSが変わる
            >
              <img src={PhotoURL} alt="" />
              <p>{text}</p>
            </div>
          </div>
        ))}
      </div>
      <SendMessage />
      <MessageList />
    </>
  );
}

export default Line
