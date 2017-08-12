const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const eventSchema = new mongoose.Schema({
	title:{
		type: String,
		trim: true,
		require: 'Need a name'
	},
	category: String,
	day: String,
	time: String,
	duration: String,
	gm: String,
	desc: String
});

module.exports = mongoose.model('Event', eventSchema);