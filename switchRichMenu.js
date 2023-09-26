if (process.env.NODE_ENV === "development") {
  require("dotenv").config({ path: ".env.local" });
} else {
  require("dotenv").config();
}
const API_BASE_URL = process.env.API_BASE_URL;
const axios = require("axios");

const switchRichMenu = async(uid, event, client) => {
  const isRegistered = verifyUserIsRegistered(uid);
  if (!isRegistered) return replyMessage(client, event, "まだ登録されていません");
  try {
    const {richMenuId} = await client.getRichMenuAlias("rich-menu-normal");
    await client.linkRichMenuToUser(event.source.userId, richMenuId);
  } catch {
    return replyMessage(client, event, "リッチメニューの更新に失敗しました")
  }
    return replyMessage(client, event, "さあ！早起きを始めましょう！")
}

const replyMessage = (client, event, text) => {
  client.replyMessage(event.replyToken, {
    type: "text",
    text: text
  })
}

const verifyUserIsRegistered = async(uid) => {
  const url = new URL(`${API_BASE_URL}/users/${uid}`);
  try {
    const res = await axios.get(url);
    return true;
  } catch(err) {
    return false;
  }

}

module.exports = switchRichMenu;
