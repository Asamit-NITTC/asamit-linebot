const { default: axios } = require("axios")
if (process.env.NODE_ENV === "development") {
  require("dotenv").config({ path: ".env.local" });
} else {
  require("dotenv").config();
}
const LIFF_BASE_URL = process.env.LIFF_BASE_URL;

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
          "label": "時刻設定に進む",
          "data": "timeWakeUp",
          "mode": "time"
        }
      ]
    }
  })
}

const buttonTmpConfirmTime = (targetTime, event, client) => {
  return client.replyMessage(event.replyToken, {
    "type": "template",
    "altText": "this is a button template",
    "template": {
      "type": "buttons",
      "text": `${targetTime}で確定しますか？`,
      "actions": [
        {
          "type": "uri",
          "label": "はい",
          "uri": `${LIFF_BASE_URL}/setTime`
        }
      ]
    }
  })
}

/*
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
*/

const processPostback = async(event, client) => {
  const time = event.postback.params.time;
  buttonTmpConfirmTime(time, event, client);
  /*
  const isSuccess = await sendTime(time);
  if (isSuccess) {
    return client.replyMessage(event.replyToken, paramSuccess);
  } else {
    return client.replyMessage(event.replyToken, paramFailed);
  }
  */
}

/*
const paramSuccess = {
  type: "text",
  text: "時刻を設定しました"
}

const paramFailed = {
  type: "text",
  text: "時刻設定に失敗しました"
}
*/

const setTargetTime = {
  buttonTmp: buttonTmpSetTime,
  postback: processPostback
}

module.exports = setTargetTime;
