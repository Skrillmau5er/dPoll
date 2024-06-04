# Frontend: dPoll

The dPoll frontend has 4 main pages:

1. Home Page (`/`)
2. Create Poll (`/create`)
3. View Polls (`/polls`)
4. View & Vote on Poll (`/poll/:pollAddress`)

It uses metamask to authenticate you to allow you to create or vote on polls. You can either authenticate in the header before hand, or it will prompt you to do so when you are about to take an action that requires it.

## Run app

```bash
npm install
npm start
```

View the app in your browser at `localhost:4000`.
