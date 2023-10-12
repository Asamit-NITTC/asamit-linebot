const LIFF_BASE_URL = process.env.LIFF_BASE_URL;

const obj = {
  "size": {
    "width": 2500,
    "height": 1686
  },
  "selected": true,
  "name": "rich menu normal",
  "chatBarText": "メニュー",
  "areas": [
    {
      "bounds": {
        "x": 0,
        "y": 0,
        "width": 814,
        "height": 843
      },
      "action": {
        "type": "datetimepicker",
        "label": "時刻設定",
        "data": "timeWakeUp",
        "mode": "time"
      }
    },
    {
      "bounds": {
        "x": 0,
        "y": 844,
        "width": 814,
        "height": 843
      },
      "action": {
        "type": "uri",
        "label": "AsamitAppを開く",
        "text": `${LIFF_BASE_URL}/main`
      }
    },
    {
      "bounds": {
        "x": 1687,
        "y": 844,
        "width": 814,
        "height": 843
      },
      "action": {
        "type": "message",
        "label": "起床報告",
        "text": "おきた"
      }
    }
  ]
}
module.exports = obj;
