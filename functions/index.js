//express.jsとする
import * as functions from "firebase-functions";
//const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const axios = require("axios");

//初期化する
const app = express();

//クロスを有効化する
app.use(cors({ origin: true }));

const PORT = 3000;

//JSONボディの解析を記述
app.use(express.json());

app.post("/", async (req, res) => {
  //トライキャッチでエラー処理実装
  try {
    // APIキー取得する
    const apiKey = functions.config().gemini.key;

    //リクエスト処理
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-04-17:generateContent?key=${apiKey}`,
      req.body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // ステータス200 OKならそのまま返す
    res.status(200).json(response.data);

  } catch (error) {
    console.error("Gemini APIのerror:", error.message);

    //ステータスも表示する
    res.status(500).json({ error: "Gemini proxy エラー" });
  }

});

app.listen(PORT, () => {
  console.log(`サーバーがポート ${PORT} で起動中...`);
});

exports.geminiProxy = functions.region("asia-northeast1").https.onRequest(app);