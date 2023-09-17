const setTimeWakeUp = (event, client) => {
  return client.replyMessage(event.replyToken, {
    "type": "template",
    "altText": "this is a button template",
    "template": {
      "type": "buttons",
      "text": "起床時刻を設定しますか？",
      "actions": [
        {
          "type": "datetimepicker",
          "label": "はい",
          "data": "timeWakeUp",
          "mode": "time"
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

module.exports = setTimeWakeUp;
