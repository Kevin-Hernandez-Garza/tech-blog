// const path = require('path');
// const express = require('express');
// const routes = require('./controllers/');
// const sequelize = require('./config/connection');
// // importing helper functions
// const helpers = require('./utils/helpers');
// // setting handlebars as our app's template engine of choice
// const exphbs = require('express-handlebars');
// // passing the helpers functions in this statement 
// const hbs = exphbs.create({ helpers });

// //setting up express.js session and connects our session to our Sequelize database
// const session = require('express-session');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);

// const sess = {
//   secret: 'Super secret secret',
//   cookie: {}, 
//   resave: false, 
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize,
//     checkExpirationInterval: 60 * 1000,
//     expiration: 60 * 60 * 1000
//   })
// };

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, 'public')));

// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

// app.use(session(sess));

// // turn on routes
// app.use(routes);

// // turn on connection to db and server
// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log('Now listening'));
// });

const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

const helpers = require('./utils/helpers');

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening to you!'));
});