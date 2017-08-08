/* eslint no-console: "off"*/

import session from 'express-session';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import App from './components/App';
import {parseSchedule} from './scraper';
import bodyParser from 'body-parser';

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
// Connect to our Database and handle an bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

const app = new express();

// use ejs templates
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

// define the folder that will be used for static assets
app.use(express.static(`${__dirname}/static`));

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sessions allow us to store data on visitors from request to request
// This keeps users logged in and allows us to send flash messages
app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.get('/json', (req, res) => res.send(parseSchedule()));

require('./model/Event');

// universal routing and rendering
app.get('*', (req, res) => {
  let markup = '';
  let status = 200;

    console.log('accesing server.js');
    const context = {};
    markup = renderToString(
      <Router location={req.url} context={context}>
        <App />
      </Router>,
    );

    // context.url will contain the URL to redirect to if a <Redirect> was used
    if (context.url) {
      return res.redirect(302, context.url);
    }

  res.render('index', {markup});
});

// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
app.listen(port, (err) => {
  if (err)
    return console.error(err);
});
 