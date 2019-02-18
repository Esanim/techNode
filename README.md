## Production-close node.js app

Data for this project is located in `app/data/feeds.json` file.  
Feeds handler takes feed of notifications and aggregates them.  
Web server exposes one endpoint `/feeds/:id`, which should return all notification feed data for that given post id.

### How to Run  
`docker-compose up`  

- Sever will be accessible at `localhost:5000` or `docker-machine-ip:5000`.  

- Accessing feeds for the given post:  
To get feeds for the post id '7d78ff348647b782cb3027d836d23e09':  
`localhost:5000/feeds/7d78ff348647b782cb3027d836d23e09`

### How to Test  
`npm run test`

### App Structure

**\_\_tests\_\_**

- unit and integration tests with [Jest](https://jestjs.io/)

**./.circleci**

- config for the [CircleCI](https://circleci.com/) integration 

**./app**

- `data` contains feed notifications data files used by the server.
- `handlers` are Express.js route handlers that have `request`, `response`, and `next` parameters.
- `helpers` are raw JS "classes" for use across the app
- `utils` are raw JS functions for use across the app
- `transformations` are functions for processing and evolving data to be used by handlers
- `routers` are RESTful route declarations using [express.Router module](https://expressjs.com/en/guide/routing.html) that utilize the functions in `handlers`
- `app.js` is what builds and configures the express app
- `config.js` is the app-specific config that you will want to customize for your app
- `server.js` is the entrypoint that actually starts the Express server

**./config**

- config contains NGINX proxy configuration and the production pm2 configuration