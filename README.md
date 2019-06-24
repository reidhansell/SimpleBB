# SimpleBB - MERN

A bodybuilding web app focused on simplicity made with the MERN stack. Original architecture came from Traversy Media's MERN stack tutorial which you can find here https://www.youtube.com/watch?v=PBTYxXADG_k&list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE

## Quick Start
Clone to local
Add folder "config" to home dir, go into config and add file "default.json"
Add mongodb uri and jwt token to default.json
Terminal in main dir: "npm install && cd client && npm run client-install && cd .. && npm run dev"
App will open when finished

```bash
# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:5000 and client on http://localhost:3000
```

## Deployment

This app uses a Heroku postbuild script.

### Author

Reid Hansell

### Version

1.0.0

### License

This project is licensed under the MIT License
