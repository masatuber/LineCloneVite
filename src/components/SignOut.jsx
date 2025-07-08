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


  return (
    <>
      <div className="header">
        {/* オースはJSファイルのインポート サインアウトメソッド使用 クリックでイベント発火*/}
        <Button
          style={{ color: "white", fontSize: "15px" }}
          onClick={signOutHandle}
        >
          サインアウト
        </Button>
        {/* スタイル当てるには{{}}でラップする */}
       
        <CallIcon />
      </div>
    </>
  );
}

export default SignOut
