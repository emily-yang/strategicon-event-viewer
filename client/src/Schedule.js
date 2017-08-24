import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Event from './Event';

class Schedule extends Component {

	renderEvent(event) {
		return (
			<Event details={event}/>
		);

	};

	render() {
		const events = this.props.events;
		return (
			<div className="schedule">
				<h2>Schedule for {this.props.day}</h2>
				<Header />
				<ul className="list-of-events">
					{
						events.map( event => <Event key={event.id} event={event} />)
					}
				</ul>
			</div>

		);
	}
}

Schedule.propTypes = {
	day: PropTypes.string.isRequired
};

export default Schedule;