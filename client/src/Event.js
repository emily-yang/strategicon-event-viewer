import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Event extends Component {
	render() {
		return (
			<div className="event">
				<h3> {this.props.event.title}</h3>
				<p>GM: {this.props.event.gm}</p>
				<p>Time: {this.props.event.time}</p>
				<p>Duration: {this.props.event.duration}</p>
			</div>
		);
	}
}

Event.propTypes = {
	events: PropTypes.object.isRequired
};

export default Event;