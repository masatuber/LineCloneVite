//Line.jsx
import React, { useEffect, useState } from "react";
import SignOut from "./SignOut";
import SendMessage from "./SendMessage.jsx";
import { auth, db } from "../../firebase.js";
import DeleteIcon from "@mui/icons-material/Delete"; //muiのアイコン

function Line() {
  //メッセージの状態管理,空配列を代入
  const [messages, setMessages] = useState([]);

//───────────────────────────────ここから定数─────────────────────────────────────────────────────────────────────────────────────────────────
  const DB_LIMIT_NUMBER = 50
  const DELETEICON_STYLE_MARGIN_LEFT = 2;
//───────────────────────────────ここまで定数─────────────────────────────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    //コレクションメソッド,Cloud Firestoreにあるコレクションカラムにmessgesが対応する
    const collectionGet = db
      .collection("messages") //オーダーバイメソッドにタイムスタンプを受け渡す
      .orderBy("createdAt") //orderBy() や limit() と組み合わせることが可能
      .limit(DB_LIMIT_NUMBER) //取得制限
      .onSnapshot((snapshot) => {
        //各ドキュメントがオブジェクトから配列に変換
        const collectionData = snapshot.docs.map((doc) => ({
          id: doc.id, //ユニークID含める, Uidは大文字で参照する
          ...doc.data(),
        }));
        // console.log("uidの確認", collectionData); //デバック用
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
      <h3>{auth.currentUser.displayName}</h3>
      {/* マップでメッセージ取出す,配列になっていない */}
      <div className="msgs">
        {messages.map(({ id, text, PhotoURL, Uid }) => (
          // 最上位の要素にキーを記述する
          <div key={id} className="msg-wrapper">
            {/* マップで取出すにはkey必須 */}

            <div
              className={`msg ${
                Uid === auth.currentUser.uid ? "sent" : "received"
              }`}
              //クラス名を条件によって変更しCSSが変更
            >
              <img src={PhotoURL} alt="Gmail画像アイコン" />
              <p>{text}</p>
              {/* 自分のメッセージのみ削除ボタン表示、パイプ二つで比較する */}

              {/* {console.log("自分のUID", auth.currentUser?.uid, "メッセージUID", Uid)}  デバック用 */}

              {Uid === auth.currentUser?.uid && (
                <DeleteIcon
                  style={{
                    cursor: "pointer",
                    marginLeft: DELETEICON_STYLE_MARGIN_LEFT,
                    color: "red",
                  }}
                  onClick={() => deleteMessage(id)}
                  fontSize="small"
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <SendMessage />
    </>
  );
}

export default Line;
