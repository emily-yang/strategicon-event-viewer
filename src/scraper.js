const jsdom = require("jsdom");
const mongoose = require("mongoose");
//const Event = mongoose.model('Event');
const Event = require('./model/Event');

// 1. scrape content from website
// 2. clean content
// 3. save to db

function parseSchedule(){
	const { JSDOM } = jsdom;
	JSDOM
	.fromURL("http://www.strategicon.net/index.php?goto=events&disp_descs=Y",
		{ runScripts: 'dangerously'}
	).then (dom => {
		const document = dom.window.document;
		const listings = document.querySelectorAll('.Board, .RPG');
		for (let i = 0; i < listings.length; i++) {
			// console.log(listings[2].children[3].textContent);
			const category = listings[i].classList.contains('Board') ? 'boardgame' : 'rpg';
			const [day, time, duration] = getDayTimeDuration(listings[i]);
			const [title, gm, desc] = getTitleGmDesc(listings[i]);
			
			const event = new Event({
				title,
				category,
				day,
				time,
				duration,
				gm,
				desc
			});
			event.save();
			console.log('saving event');
		}
	}).catch( (error) => {
		console.log(error);
	});
};

function getDayTimeDuration(listing) {
	// Fri 2:00 pm 4 hrs
	const info = listing.children[2].textContent
		.replace('Noon', '12:00 pm')
		.replace('Midnight', '12:00 am')
		.split(' ');

	const [day, time, duration] = [info[0], info[1] + info[2], info[3] + info[4]];
	return [day, time, duration];
}

function getTitleGmDesc(listing) {
	const info = listing.children[3];
	const html = info.innerHTML;

	let title = info.querySelector('strong').textContent;

	const desc = html.replace(/.*?(<\/em>)+(<br>)+/,"");
	const emTags = [...info.querySelectorAll('em')];
	if (emTags[emTags.length-1].textContent.includes('More'))
		emTags.pop();	
	const gm = emTags.pop().textContent.substr(4);
	if (emTags.lentgth > 0)
		title = `${title} ${emTags[0].textContent}`;

	return [title, gm, desc];


}

export { parseSchedule };