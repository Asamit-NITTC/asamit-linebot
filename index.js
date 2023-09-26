const express = require("express");
const line = require("@line/bot-sdk");
const followEvent = require("./followEvent");
const buttonTmpWaking = require("./buttonTmpWaking");
const setTargetTime = require("./setTargetTime");
const switchRichMenu = require("./switchRichMenu");
const app = express();
//const richmenu = require("./richmenu");

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

// ルーティング
//app.use("/handler/richmenu", richmenu);
app.post("/handler/webhook", line.middleware(config), async (req, res) => {
  const result = await Promise.all(req.body.events.map(handleEvent));
  res.json(result);
});
app.get("/handler/test", (req, res) => res.send("bot success"));
app.get("/handler/*", (req, res) => {
  res.status(404).send("Error");
});

// 送られたwebhookに対する処理の関数
const handleEvent = async(event) => {
  if (event.type === "follow") {
    followEvent(client, event);
  }
  if (event.type === "unfollow") {
    try {
      await client.unlinkRichMenuFromUser(event.source.userId);
    } catch(err) {
      console.log(err);
    }
  }
  if (event.type === "postback") {
    postbackEvent(event);
  }
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }
  else {
    return messageEvent(event);
  }
}

// メッセージ内容によって処理を分岐する関数
const messageEvent = (event) => {
  const messageText = event.message.text;
  switch (true) {
    case /^おきた$/.test(messageText):
      buttonTmpWaking(event, client);
      break;
    /*
    case "時刻":
      setTargetTime.buttonTmp(event, client);
      break;
    */
    case /^登録完了\nID: /.test(messageText):
      const uid = messageText.match(/[^登録完了\nID: $].+/);
      switchRichMenu(uid, event, client);
      break;
    default:
      return client.replyMessage(event.replyToken, {
        type: "text",
        text: "無効な操作です"
      })
  }
};

const postbackEvent = (event) => {
  if (event.postback.data === "timeWakeUp") {
    setTargetTime.postback(event, client);
  } else {
    return client.replyMessage(event.replyToken, {
      type: "text",
      text: "エラー"
    })
  }
}

exports.handler = app;
