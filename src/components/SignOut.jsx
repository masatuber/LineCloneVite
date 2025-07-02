import { Button } from "@mui/material"
import React from 'react'
import { auth } from "../../firebase";

function SignOut() {



  return (
    <div>
      {/* オースはJSファイルのインポート サインアウトメソッド使用 クリックでイベント発火*/}
      <Button onClick={() => auth.signOut()}>
        サインアウト
      </Button>
    </div>
  );
}

export default SignOut
