const router = require('express').Router();
const axios = require("axios");
const line = require("@line/bot-sdk");
const { query } = require('express');
if (process.env.NODE_ENV === "development") {
  console.log("development mode")
  require("dotenv").config({ path: ".env.local" });
} else {
  require("dotenv").config();
}
// 認証情報とclientの宣言
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};
const client = new line.Client(config);

//const richMenuSignUp = require("./richmenu/richMenuSignUp");
//const richMenuNormal = require("./richmenu/richMenuNormal");

router.put('/switch/normal/:uid', async(req, res) => {
  const uid = req.params.uid;
  try {
    const {richMenuId} = await client.getRichMenuAlias("rich-menu-signup");
    await client.linkRichMenuToUser(uid, richMenuId);
  } catch {
    res.status(500).send("failed to update richmenu");
  }
  res.send("richmenu is updated");
})
router.get('/', (req, res) => {
  res.send("richmenuのエンドポイント");
})

/*
const initRichMenus = async(client) => {
  try {
    const richMenuId = await client.createRichMenu(richMenuSignUp);
    await client.createRichMenuAlias
    return `richMenuId: ${richMenuId}`;
  } catch(err) {
    return "Failed to update rich menus " + JSON.stringify(err);
  }
}
*/

module.exports = router;
