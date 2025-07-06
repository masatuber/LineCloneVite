//Line.jsx
import React, { useEffect, useState } from "react";
import SignOut from "./SignOut";
import SendMessage from "./SendMessage.jsx";
import { auth, db } from "../../firebase.js";
import DeleteIcon from "@mui/icons-material/Delete"; //muiのアイコン

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

  //ファイアーストアdeleteメソッドは非同期プロミスを返す
  const deleteMessage = async (id) => {
    try {
      await db.collection("messages").doc(id).delete();
      window.alert("メッセージ削除しました");
      window.location.reload();
    } catch (error) {
      console.warn("削除出来ませんでした:", error);
    }
  };

  return (
    <>
      <SignOut />
      {/* マップでメッセージ取出す,配列になっていない */}
      <div className="msgs">
        {messages.map(({ id, uid, text, PhotoURL }) => (
          // 最上位の要素にキーを記述する
          <div key={id} className="msg-wrapper">
            {/* マップで取出すにはkey必須 */}

            <div
              className={`msg ${
                uid === auth.currentUser.uid ? "sent" : "received"
              }`}
              //クラス名を条件によって変更しCSSが変更
            >
              <img src={PhotoURL} alt="Gmail画像アイコン" />
              <p>{text}</p>
              {/* 自分のメッセージのみ削除ボタン表示、パイプ二つで比較する */}
              {auth.currentUser?.uid === uid || (
                <DeleteIcon
                  style={{ cursor: "pointer", marginLeft: 2, color: "red" }}
                  onClick={() => deleteMessage(id)}
                  fontSize="small"
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <SendMessage />

      {/* <MessageList /> */}
    </>
  );
}

export default Line;
