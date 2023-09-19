# asamit-linebot
## Overview
Google Cloud Platform(GCP) の Cloud Functions上でLINEbotを動かす
## Usage
1. Clone this repository.
2. `npm i` to install dependencies.
3. Create .env
```
touch .env
echo "CHANNEL_SECRET=[secret]"
echo "CHANNEL_ACCESS_TOKEN=[token]"
```
4. Start development server with `npm run start`
5. Expose port 8080 using ngrok
```
ngrok http 8080 --host-header="localhost:8080"
```
if you have custom-domain on ngrok
```
ngrok http --domain=xxxxxxxxxxx.ngrok-free.app 8080
```
