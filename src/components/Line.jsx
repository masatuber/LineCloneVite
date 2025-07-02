import React, { useEffect, useState } from 'react'
import SignOut from './SignOut';
import { db } from "../../firebase.js";
//dbに格納されているファイアーストアに接続する

function Line() {
  //メッセージの状態管理
  const [messges, setMessges ] = useState();

  useEffect(() => {
    //コレクションメソッド,Cloud Firestoreにあるコレクションカラムにmessgesが対応する
    db.collection("messges") //オーダーバイメソッドにタイムスタンプを受け渡す
      .orderBy("createdAt") //orderBy() や limit() と組み合わせることが可能
      .limit(50) //取得制限
      .onSnapshot((snapshot) => {
        setMessges(snapshot.docs.map((doc) => doc.data()));
      }); 
      //onSnapshot() メソッドを使用すると、ドキュメントをリッスン可能,snapshotにdocsが含まれる
  }, [])
  //マウント時に一回だけ発火する仕様

  return (
    <div>
      {console.log(messges)}
      <SignOut />
      <div className='msg'>
      あ
      </div>
    </div>
  );
}

export default Line
