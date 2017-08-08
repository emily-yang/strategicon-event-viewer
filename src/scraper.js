const jsdom = require("jsdom");
const mongoose = require("mongoose");
//const Event = mongoose.model('Event');
const Event = require('./model/Event');

function parseSchedule(){
	const { JSDOM } = jsdom;
	const dom = new JSDOM(``, {
		url: "http://www.strategicon.net/index.php?goto=events&disp_descs=Y",
		includeNodeLocations: true
	});
	const newEvent = new Event( {
		title: "sample game",
		type: "Small Tourney",
		day: "Sat",
		startTime: "9:00am",
		duration: "5",
		id: "123",
		gm: "mr guy",
		desc: "A game with dice"
	});
	newEvent.save();
	console.log('saved');
	return 'this is hooked up';
};

export { parseSchedule };