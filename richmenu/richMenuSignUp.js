const LIFF_BASE_URL = process.env.LIFF_BASE_URL;

const obj = {
  "size": {
    "width": 2500,
    "height": 1686
  },
  "selected": true,
  "name": "rich menu sign up",
  "chatBarText": "メニュー",
  "areas": [
    {
      "bounds": {
        "x": 0,
        "y": 0,
        "width": 2500,
        "height": 1686
      },
      "action": {
        "type": "uri",
        "label": "会員登録",
        "uri": `${LIFF_BASE_URL}/signup`
      }
    }
  ]
}

module.exports = obj;
