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
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }
  if (event.message.text === "おきた") {
    return client.replyMessage(event.replyToken, {
      type: "text",
      text: "起床を記録しました",
    });
  } else {
    return client.replyMessage(event.replyToken, {
      type: "text",
      text: event.message.text
    });
  }
};

exports.handler = app;
