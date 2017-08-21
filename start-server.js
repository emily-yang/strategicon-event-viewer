const mongoose = require('mongoose');

// import environmental variables from .env file into process.env
require('dotenv').config({ path: 'variables.env' });

// Connect to database and handle any bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(err.message);
});

// import model
require('./model/Event');

const app = require('./express-app');
app.set('port', process.env.PORT || 3001);
const server = app.listen(app.get('port'), () => {
	console.log(`Express running on port ${server.address().port}`);
});

