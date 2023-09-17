const express = require("express");
const line = require("@line/bot-sdk");
const app = express();

require("dotenv").config();

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

app.post("/handler/webhook", line.middleware(config), async (req, res) => {
  const result = await Promise.all(req.body.events.map(handleEvent));
  res.json(result);
});
app.get("/handler/test", (req, res) => res.send("bot success"));
app.get("/handler/*", (req, res) => {
  res.send("Error");
});

// ここでクライアントを宣言
const client = new line.Client(config);

// 送られたwebhookに対する処理の関数
const handleEvent = (event) => {
  if (event.type === "follow") {
    followEvent(event);
  }
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }
  else {
    return messageEvent(event);
  }
}

const followEvent = (event) => {
  return client.replyMessage(event.replyToken, {
    type: "text",
    text: "登録ありがとうございます"
  });
}
const messageEvent = (event) => {
  if (event.message.text === "おきた") {
    return client.replyMessage(event.replyToken, {
      "type": "template",
      "altText": "this is a buttons template",
      "template": {
        "type": "buttons",
        "text": "6:03に起床を記録します",
        "actions": [
          {
            "type": "message",
            "label": "はい（目標記入に進む）",
            "text": "yes"
          },
          {
            "type": "message",
            "label": "キャンセル",
            "text": "no"
          }
        ]
      }
    });
  } /*else {
    return client.replyMessage(event.replyToken, {
      type: "text",
      text: event.message.text
    });
  }*/
};

exports.handler = app;
