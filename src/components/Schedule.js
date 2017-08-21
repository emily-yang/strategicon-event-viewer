import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Event from './Event';

class Schedule extends Component {
	render() {
		return (
			<div className="schedule">
				<h2>Schedule for {this.props.day}</h2>
				<Header />
				<Event />
			</div>

		);
	}
}

Schedule.propTypes = {
	day: PropTypes.string.isRequired
};

export default Schedule;