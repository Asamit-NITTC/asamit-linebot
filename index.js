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
    case /^起床時刻を更新しました$/.test(messageText):
      client.replyMessage(event.replyToken, {
        type: "text",
        text: "設定した時刻を目指して頑張りましょう！"
      })
      break;
    case /^はじめる$/.test(messageText):
      client.replyMessage(event.replyToken, {
        type: "text",
        text: "登録時間前です。まずはこちらのオープンチャットに参加してください！\n【参加コード：12345678】\nhttps://line.me/ti/g2/UK30v4mk-ttWfra0osQNdqACS1O2Mqct5-IlEA?utm_source=invitation&utm_medium=link_copy&utm_campaign=default"
      })
      break;
    case /^起床報告に失敗しました$/.test(messageText):
      client.replyMessage(event.replyToken, {
        type: "text",
        text: "もう一度お試しください"
      })
      break;
    case /^時刻更新に失敗しました$/.test(messageText):
      client.replyMessage(event.replyToken, {
        type: "text",
        text: "もう一度お試しください"
      })
      break;
    case /^起床報告を記録しました$/.test(messageText):
      client.replyMessage(event.replyToken, {
        type: "text",
        text: "おはようございます！今日も１日頑張りましょう！"
      })
      break;
    case /^登録に失敗しました$/.test(messageText):
      client.replyMessage(event.replyToken, {
        type: "text",
        text: "しばらく待ってからお試しください"
      })
      break
    case /^登録済みです$/.test(messageText):
      switchRichMenu.toNormal(event, client);
      break;
    case /^登録完了\nID: /.test(messageText):
      const uid = messageText.match(/[^登録完了\nID: $].+/);
      switchRichMenu.toNormalWithUID(uid, event, client);
      break;
    case /^no$/.test(messageText):
      break
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
