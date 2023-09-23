const followEvent = async (client, event) => {
  return client.replyMessage(event.replyToken, {
    "type": "template",
    "altText": "this is a buttons template",
    "template": {
      "type": "buttons",
      "text": "登録ありがとうございます！朝活を始めましょう！",
      "actions": [
        {
          "type": "uri",
          "label": "会員登録",
          //"uri": "https://liff.line.me/1661190118-0GzYyEBV/liff/signup"
          "uri": "https://liff.line.me/2000473270-5YqBPKWe/signup"
        }
      ]
    }
  })
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
