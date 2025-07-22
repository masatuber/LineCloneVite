import React, { useState, useRef, useEffect } from 'react'
import SignOut from '../SignOut';
import {
  createTheme,
  ThemeProvider,
  Paper,
  CssBaseline,
  Button,
  Stack,
  Snackbar,
  Link,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SendIcon from "@mui/icons-material/Send";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import axios from "axios";

const GeminiBot = () => {
  //API関連2.5proに更新
  const GEMINI_API_KEY = import.meta.env.VITE_API_KEY_GM;
  const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-pro:generateContent?key=${GEMINI_API_KEY}`;


//───────────────────────────────ここからインラインCSS定数─────────────────────────────────────────────────────────────────────────────────────────────────
  const PAPER_STYLE_MINHEIGHT = "100vh";
  const PAPER_STYLE_PADDING = "5px";
  const PAPER_STYLE_ELEVATION = 1;
  const DIV_STYLE_WIDTH = "80%";
  const DIV_STYLE_BORDER = "1.5px solid #d76868";
  const DIV_STYLE_PADDING = "5px";
  const TEXTARER_STYLE_WIDTH = "80%";
  const TEXTARER_STYLE_PADDING = "5px";
//───────────────────────────────ここまでインラインCSS定数─────────────────────────────────────────────────────────────────────────────────────────────────
  const INTERVAL_SECONDS = 15;
//───────────────────────────────ここまでが定数─────────────────────────────────────────────────────────────────────────────────────────────────

  const [messages, setMessages] = useState([]); // メッセージ履歴
  const [input, setInput] = useState(""); // ユーザー入力
  const [loading, setLoading] = useState(false);
  const [botTyping, setBotTyping] = useState(""); // ストリーミング表示用のテキスト
  const [darkMode, setDarkMode] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false); // コピー成功時に Snackbar 表示用

  const textareaRef = useRef(null); //テキストエリア要素の高さ監視用

  const messagesEndRef = useRef(null); //スクロール用のドム監視用

  //ダークモード定義
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#333333" : "#ffffff",
        paper: darkMode ? "#333333" : "#ffffff",
      },
      text: {
        primary: darkMode ? "#ffffff" : "#292929",
      },
    },
  });

  // 自動スクロールを定義
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, botTyping]); //依存配列は2つ

  // 動的に高さ変更するための条件と処理
  const handleInput = (e) => {
    // 入力欄の値を呼ぶ
    setInput(e.target.value);

    //  現在のテキスト要素を条件とする
    if (textareaRef.current) {
      //入力欄なしがあるのでリセットを挟む
      textareaRef.current.style.height = "auto";

      // style.height CSSのスタイルを直接操作,テンプレートリテラル記法でpx調整,scrollHeight プロパティは要素の内容の高さの寸法
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };
  const sendMessage = async () => {
    if (!input.trim()) return;

    // ユーザーのメッセージを追加
    const newMessage = { role: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");
    setLoading(true);
    setBotTyping(""); // ボットの回答を初期化

    try {
      const response = await axios.post(API_URL, {
        // 必須：プロンプト（role＋parts の配列）
        contents: [
          {
            role: "user",
            parts: [{ text: input }],
          },
        ],
      });
      //API通信中は回答生成中を表示する
      setLoading(false);
      const replyText =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "エラー: 返信を取得できませんでした。";

      // ストリーミング風に文字を一文字ずつ表示
      let index = 0;
      const interval = setInterval(() => {
        if (index < replyText.length) {
          setBotTyping((prev) => prev + replyText[index]); // 一文字ずつ追加
          index++;
        } else {
          clearInterval(interval); // 全文が表示されたら停止
          setMessages((prevMessages) => [
            ...prevMessages,
            { role: "bot", text: replyText },
          ]);
          setBotTyping(""); // 最後に botTyping をクリア
        }
      }, INTERVAL_SECONDS); // 15msごとに1文字表示
    } catch (error) {
      console.error("API エラー:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "bot", text: "エラー: APIリクエストに失敗しました!" },
      ]);
    }
  };

  // 最新の回答テキストをクリップボードにコピーする関数を追加
  const copyAnswerToClipboard = () => {
    // 最新の bot のメッセージを取得
    const lastBotMessage = [...messages]
      .reverse()
      .find((msg) => msg.role === "bot");
    if (lastBotMessage && lastBotMessage.text) {
      // Clipboard API を使用してテキストをコピー
      navigator.clipboard
        .writeText(lastBotMessage.text)
        .then(() => {
          // コピー成功時に Snackbar を表示
          setCopySuccess(true);
        })
        .catch((err) => {
          console.error("クリップボードへのコピーに失敗しました:", err);
        });
    } else {
      console.warn("コピーする回答テキストがありません。");
    }
  };

  // Snackbar の閉じる処理
  const handleSnackbarClose = () => {
    setCopySuccess(false);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Paper
          style={{
            minHeight: PAPER_STYLE_MINHEIGHT,
            padding: PAPER_STYLE_PADDING,
          }}
          elevation={PAPER_STYLE_ELEVATION}
        >
          <SignOut />
          <br />
          <br />
          <br />
          {loading ? (
            <div className="answerText">回答生成中...</div>
          ) : (
            <p>Gemini 2.5proに聞きたい事はございませんか？</p>
          )}
          <DarkModeIcon
            onClick={() => setDarkMode((prevMode) => !prevMode)}
            style={{ cursor: "pointer" }}
          />
          <div
            style={{
              height: "auto",
              width: DIV_STYLE_WIDTH,
              overflowY: "auto",
              border: DIV_STYLE_BORDER,
              padding: DIV_STYLE_PADDING,
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{ textAlign: msg.role === "user" ? "right" : "left" }}
              >
                <strong>
                  {msg.role === "user" ? "ユーザー質問" : "AI回答"}:
                </strong>{" "}
                <Divider />
                {msg.text}
              </div>
            ))}
            {/* ストリーミング中のテキスト表示  */}
            {botTyping && (
              <div style={{ textAlign: "left", fontStyle: "normal" }}>
                <br />
                <Divider />
                <strong>AIの回答:</strong> {botTyping}
              </div>
            )}
          </div>
          {/* スクロール用のダミーディブタグ */}
          <div ref={messagesEndRef} />

          <div style={{ marginTop: "9px" }}>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInput}
              placeholder="質問を入力"
              // 手動リサイズなし、スクロールバーなし
              style={{
                width: TEXTARER_STYLE_WIDTH,
                padding: TEXTARER_STYLE_PADDING,
                resize: "none",
                overflow: "hidden",
              }}
            />
            <Stack direction="row" spacing={1}>
              <Button
                onClick={sendMessage}
                variant="contained"
                color="success"
                endIcon={<SendIcon />}
              >
                プロンプト送信
              </Button>
              {/* 回答テキストをクリップボードにコピーするボタンを追加 */}
              <Button
                onClick={copyAnswerToClipboard}
                variant="outlined"
                color="primary"
                startIcon={<CopyAllIcon />}
              >
                回答をコピー
              </Button>
            </Stack>
            {/* Snackbar コンポーネント: コピー成功時の通知 */}
            <Snackbar
              open={copySuccess}
              autoHideDuration={3000}
              onClose={handleSnackbarClose}
              message="回答がクリップボードにコピーされました"
            />
          </div>
          <div className="linkCss">
            <Link
              href="https://openai.com/ja-JP/chatgpt/overview/"
              target="_blank"
              underline="none"
              color="secondary"
            >
              Chat GPTのリンクはこちら
            </Link>
            <br />
            <Link
              href="https://prompt.quel.jp/"
              target="_blank"
              underline="none"
              color="secondary"
            >
              プロンプト集のリンクはこちら
            </Link>

          </div>
        </Paper>
      </ThemeProvider>
    </div>
  );
};

export default GeminiBot;
