const buttonTmpWaking = (event, client) => {
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
  })
}

module.exports = buttonTmpWaking;
