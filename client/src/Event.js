import React, { Component } from 'react';
import classNames from 'classnames';

class Event extends Component {
	render() {
		const classList = classNames('event', this.props.event.category);

		return (
			<div className={classList}>
				<h3> {this.props.event.title}</h3>
				<p>GM: {this.props.event.gm}</p>
				<p>Time: {this.props.event.time}</p>
				<p>Duration: {this.props.event.duration}</p>
			</div>
		);
	}
}

export default Event;