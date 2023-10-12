if (process.env.NODE_ENV === "development") {
  require("dotenv").config({ path: ".env.local" });
} else {
  require("dotenv").config();
}
const LIFF_BASE_URL = process.env.LIFF_BASE_URL

const buttonTmpWaking = (event, client) => {
  const timestamp = event.timestamp;
  const timestampDate = new Date(timestamp).toLocaleTimeString("ja-JP", {timeZone: "Asia/Tokyo" });
  const timeWakeup = timestampDate.slice(0,-3);
  const timeWakeupHours = parseInt(timestampDate.slice(0,-6))
  const timeOk = {
    "type": "template",
    "altText": `${timeWakeup}に起床を記録します`,
    "template": {
      "type": "buttons",
      "text": `${timeWakeup}に起床を記録します`,
      "actions": [
        {
          "type": "uri",
          "label": "はい（目標記入に進む）",
          "uri": `${LIFF_BASE_URL}/wakeup?timestamp=${timestamp}`
        },
        {
          "type": "message",
          "label": "キャンセル",
          "text": "no"
        }
      ]
    }
  }
  const timeNg = {
    "type": "template",
    "altText": `${timeWakeup}：受付時間外です`,
    "template": {
      "type": "buttons",
      "text": `${timeWakeup}：受付時間外です`,
      "actions": [
        {
          "type": "message",
          "label": "キャンセル",
          "text": "no"
        }
      ]
    }
  }

  let params = timeOk;
  if (false && 8<timeWakeupHours || timeWakeupHours<4) {
    params = timeNg;
  }
  return client.replyMessage(event.replyToken, params);
 }

module.exports = buttonTmpWaking;
