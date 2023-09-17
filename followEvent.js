const { default: axios } = require("axios");

const followEvent = async (client, event) => {
  const isSuccess = await signUp();
  if (isSuccess) {
    return client.replyMessage(event.replyToken, paramSuccess);
  } else {
    return client.replyMessage(event.replyToken, paramFailed);
  }
}

const signUp = async () => {
  try {
    await axios.get("", {
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

module.exports = followEvent;
