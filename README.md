# Build & Run

## Server

```
cd ./server
npm i
touch .env
```

inside .env paste this with appropriate credentials

```
# MONGO_URI=mongodb://127.0.0.1:27017/highway
MONGO_URI=
JWT_SECRET=
JWT_COOKIE_EXPIRES_IN=90
JWT_EXPIRES_IN=82d
PORT=8000

NODE_ENV=development

SENDGRID_USERNAME=
SENDGRID_PASSWORD=
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USERNAME=
EMAIL_PASSWORD=
EMAIL_FROM=
```

Run

```
npm run dev
```

## Client

```
cd client
npm i
```

Inside `src > api > index.ts` change `URL` to `http://localhost:8000`

```
npm run dev
```
