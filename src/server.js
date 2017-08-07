/* eslint no-console: "off"*/

import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import App from './components/App';
import scraper from './scraper';

const app = new express();

// use ejs templates
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

// define the folder that will be used for static assets
app.use(express.static(`${__dirname}/static`));

app.get('/json', (req,res) => {
  res.json();
});
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

  return res.render('index', {markup});
});


// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.info(
    `
      Server running on http://localhost:${port} [${env}]
      Universal rendering: ${process.env.UNIVERSAL ? 'enabled' : 'disabled'}
    `);
});
