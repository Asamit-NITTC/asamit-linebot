const followEvent = (client, event) => {
  return client.replyMessage(event.replyToken, {
    type: "text",
    text: "登録ありがとうございます"
  });
}

module.exports = followEvent;
