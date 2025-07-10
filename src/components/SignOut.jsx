import { auth } from "../../firebase.js";
import { Button } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import { useNavigate } from "react-router-dom";
function SignOut() {
  //auth.signOut()
  const navigate = useNavigate();
  const signOutHandle = () => {
    auth.signOut();
    navigate("/");
  }

  const lineBackHandle = () => {
    navigate("/");
  }

  const geminiChatHandle = () => {
    navigate("/geminibot");
  }

  return (
    <>
      <div className="header">
        {/* オースはJSファイルのインポート サインアウトメソッド使用 クリックでイベント発火*/}
        <Button
          style={{ color: "white", fontSize: "15px", cursor: "pointer" }}
          onClick={signOutHandle}
        >
          サインアウト
        </Button>
        <Button
          style={{ color: "#78fd44", fontSize: "15px", cursor: "pointer" }}
          onClick={lineBackHandle}
        >
          Lineに戻る
        </Button>
        {/* スタイル当てるには{{}}でラップする */}
        <button
          style={{ color: "#78fd44", fontSize: "15px", background: "none" ,cursor: "pointer"}}
          onClick={geminiChatHandle}
        >
          Geminiとチャットする
        </button>
        <CallIcon />
      </div>
    </>
  );
}

export default SignOut
