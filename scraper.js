const jsdom = require("jsdom");
const mongoose = require("mongoose");
const Event = require('./model/Event');

exports.parseSchedule = async function(){
	console.log('inside parseSchedule');
	const url = "http://www.strategicon.net/index.php?goto=events&disp_descs=Y";
	const eventList = [];

	const { JSDOM } = jsdom;
	await JSDOM
	.fromURL(url, { runScripts: 'dangerously'})
	.then (dom => {
		const document = dom.window.document;
		const listings = document.querySelectorAll('.Board, .RPG');
		for (let i = 0; i < listings.length; i++) {
			const category = listings[i].classList.contains('Board') ? 'boardgame' : 'rpg';
			const [day, time, duration] = getDayTimeDuration(listings[i]);
			const [title, gm, desc, id] = getTitleGmDesc(listings[i]);
			
			const event = new Event({
				_id: id,
				title,
				category,
				day,
				time,
				duration,
				gm,
				desc
			});
			Event.findOneAndUpdate( {_id: id }, event, { upsert: true }, () => {});
			eventList.push({id, title, category, day, time, duration, gm, desc});
		}
	})
	.catch( (error) => {});
	return eventList;
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

	const id = info.id;
	const desc = html.replace(/.*?(<\/em>)+(<br>)+/,"");
	const emTags = [...info.querySelectorAll('em')];
	if (emTags[emTags.length-1].textContent.includes('More'))
		emTags.pop();	
	const gm = emTags.pop().textContent.substr(4);
	if (emTags.lentgth > 0)
		title = `${title} ${emTags[0].textContent}`;

	return [title, gm, desc, id];


}
