# asamit-linebot
## Overview
Google Cloud Platform(GCP) の Cloud Functions上でLINEbotを動かす
## Usage
1. Clone this repository.
2. `npm i` to install dependencies.
3. Create .env
```
touch .env.local
echo "CHANNEL_SECRET=[secret]" >> .env.local
echo "CHANNEL_ACCESS_TOKEN=[token]" >> .env.local
echo "LIFF_BASE_URL=https://liff.line.me/xxxxxxxxxxxxxxxx" >> .env.local
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

## Deploy
```
touch .env
echo "LIFF_BASE_URL=https://liff.line.me/xxxxxxxxxxxxxxxx" >> .env
gcloud functions deploy linebot \
--gen2 \
--region=asia-northeast1 \
--runtime=nodejs18 \
--source=. \
--entry-point=handler \
--allow-unauthenticated \
--trigger-http
```
