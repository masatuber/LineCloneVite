// MessageList.js
import React, { useEffect, useState, } from "react";
import { db, auth } from "../../firebase";
import DeleteIcon from "@mui/icons-material/Delete";

function MessageList() {
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    // Firestoreのリアルタイム取得
    const unsubscribe = db
      .collection("messages")
      .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id, // ← ユニークIDを取得
            ...doc.data(),
          }))
        );
      });

    return () => unsubscribe(); // クリーンアップ
  }, []);

  // メッセージ削除関数（doc.idで指定）
  const deleteMessage = async (id) => {
    try {
      await db.collection("messages").doc(id).delete();
      console.log(`メッセージ ${id} を削除しました`);
    } catch (error) {
      console.error("削除エラー:", error);
    }
  };

  return (
    <div>
      {messages.map((msg) => (
        <div key={msg.id}>
          {/* 自分のメッセージだけ削除可能に */}
          {auth.currentUser?.uid === msg.Uid && (
            <DeleteIcon
              style={{ cursor: "pointer", color: "red", marginLeft: 10 }}
              onClick={() => deleteMessage(msg.id)}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default MessageList;
