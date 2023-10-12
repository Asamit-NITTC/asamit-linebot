if (process.env.NODE_ENV === "development") {
  require("dotenv").config({ path: ".env.local" });
} else {
  require("dotenv").config();
}
const API_BASE_URL = process.env.API_BASE_URL;
const axios = require("axios");

const toNormalWithUID = async(uid, event, client) => {
  const isRegistered = await verifyUserIsRegistered(uid);
  if (!isRegistered) return replyMessage(client, event, "登録中です。メニュー表示が変わるまでお待ちください");
  await toNormalBasic(event, client);
}

const toNormalBasic = async(event, client) => {
  try {
    const {richMenuId} = await client.getRichMenuAlias("rich-menu-normal");
    await client.linkRichMenuToUser(event.source.userId, richMenuId);
  } catch {
    return replyMessage(client, event, "リッチメニューの更新に失敗しました")
  }
    return replyMessage(client, event, "さあ！早起きを始めましょう！\nまずは「時刻設定」から起床時刻を設定します")
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
    await axios.get(url);
    return true;
  } catch(err) {
    return false;
  }

}

const switchRichMenu = {
  toNormal: toNormalBasic,
  toNormalWithUID: toNormalWithUID
}

module.exports = switchRichMenu;
