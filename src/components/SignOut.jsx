import { auth } from "../../firebase.js";
import { Button } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";

function SignOut() {



  return (
    <>
      <div className="header">
        {/* オースはJSファイルのインポート サインアウトメソッド使用 クリックでイベント発火*/}
        <Button
          style={{ color: "white", fontSize: "15px" }}
          onClick={() => auth.signOut()}
        >
          サインアウト
        </Button>
        {/* スタイル当てるには{{}}でラップする */}
        <h3>{auth.currentUser.displayName}</h3>
        <CallIcon />
      </div>
    </>
  );
}

export default SignOut
