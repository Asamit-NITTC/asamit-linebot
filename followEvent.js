if (process.env.NODE_ENV === "development") {
  require("dotenv").config({ path: ".env.local" });
} else {
  require("dotenv").config();
}
//const LIFF_BASE_URL = process.env.LIFF_BASE_URL;

const followEvent = async (client, event) => {
  return client.replyMessage(event.replyToken, paramFollowEvent)
}

const paramFollowEvent = {
  type: "text",
  text: "友だち登録ありがとうございます！\n【実証実験中】\n下のオープンチャットに参加して案内を受けましょう\n参加コード: 12345678\nhttps://line.me/ti/g2/UK30v4mk-ttWfra0osQNdqACS1O2Mqct5-IlEA?utm_source=invitation&utm_medium=link_copy&utm_campaign=default"
}
/*
const signUp = async () => {
  try {
    await axios.get(BACKEND_URL+"/users", {
      headers: {
        Authorization: "Bearer "
      }
    })
      .catch(e => {
        throw new Error("Failed to signUp " + e.message);
    });
    return true;
  } catch (e) {
    return false;
  }
}
*/
/*
const paramBtnTemplate = {
  "type": "template",
  "altText": "this is a buttons template",
  "template": {
    "type": "buttons",
    "text": "登録ありがとうございます！朝活を始めましょう！",
    "actions": [
      {
        "type": "uri",
        "label": "会員登録",
        "uri": `${LIFF_BASE_URL}/signup`
      }
    ]
  }
}
*/
/*
const paramSuccess = {
  type: "text",
  text: "会員登録に成功しました"
}

const paramFailed = {
  type: "text",
  text: "会員登録に失敗しました"
}
*/

module.exports = followEvent;
