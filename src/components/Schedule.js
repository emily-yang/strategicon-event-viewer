import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Schedule extends Component {
	render() {
		return (
			<h2>Schedule for {this.props.day}</h2>
		);
	}
}

Schedule.propTypes = {
	day: PropTypes.string.isRequired
};

export default Schedule;