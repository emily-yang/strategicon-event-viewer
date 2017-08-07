const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const eventSchema = new mongoose.Schema({
	title:{
		type: String,
		trim: true,
		require: 'Need a name'
	},
	group: String,
	type: String,
	day: String,
	startTime: String,
	duration: String,
	id: String,
	gm: String,
	desc: String
});

module.exports = mongoose.model('Event', eventSchema);