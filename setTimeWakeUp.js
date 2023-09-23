const { default: axios } = require("axios")

const buttonTmpSetTime = (event, client) => {
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

const sendTime = async (time) => {
  try {
    await axios.put(`${time}`)
      .catch(e => {
        throw new Error ("Failed to set Time" + e.message);
      })
    return true;
  } catch(e) {
    return false;
  }
}

const processPostback = async(event, client) => {
  const time = event.postback.params.time;
  const isSuccess = await sendTime(time);
  if (isSuccess) {
    return client.replyMessage(event.replyToken, paramSuccess);
  } else {
    return client.replyMessage(event.replyToken, paramFailed);
  }
}

const paramSuccess = {
  type: "text",
  text: "時刻を設定しました"
}

const paramFailed = {
  type: "text",
  text: "時刻設定に失敗しました"
}

const setTimeWakeUp = {
  buttonTmp: buttonTmpSetTime,
  postback: processPostback
}

module.exports = setTimeWakeUp;
