# magiclink-backend
Passwordless login(magic link) via email

#### Steps:

1. Create .env file in root directory with below parameters of your environment:
```
MONGODB_URI=
APP_URL=
JWT_SECRET=
SES_SENDER_EMAIL=
SES_REGION=
```
2. Install dependencies and run backend

```
npm i
npm run dev
```
3. Starting Client Application

>Create ```.env``` file in  root of ```client``` with below parameters of your environment:

```
REACT_APP_API_URL=
```

```
cd client
npm install
npm start
```

