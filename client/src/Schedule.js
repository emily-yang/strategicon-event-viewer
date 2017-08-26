import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Options from './Options';
import Event from './Event';

class Schedule extends Component {

	render() {
		const events = this.props.events;
		return (
			<div className="schedule">
				<h2>Schedule for {this.props.day}</h2>
				<Options categories={this.props.categories} toggleCategory={this.props.toggleCategory} />
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
	day: PropTypes.string.isRequired,
};

export default Schedule;