const buttonTmpWaking = (event, client) => {
  const timestamp = event.timestamp;
  const timestampDate = new Date(timestamp);
  const timeWakeup = timestampDate.getHours()+":"+timestampDate.getMinutes();
  return client.replyMessage(event.replyToken, {
    "type": "template",
    "altText": "this is a buttons template",
    "template": {
      "type": "buttons",
      "text": timeWakeup + "に起床を記録します",
      "actions": [
        {
          "type": "uri",
          "label": "はい（目標記入に進む）",
          "uri": "https://liff.line.me/1661190118-0GzYyEBV/wakeup"
        },
        {
          "type": "message",
          "label": "キャンセル",
          "text": "no"
        }
      ]
    }
  })
}

module.exports = buttonTmpWaking;
