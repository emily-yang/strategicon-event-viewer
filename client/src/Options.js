import React, { Component } from 'react';

class Options extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: this.props.categories
		}
	}

	render() {
		return (
			<form className="options">
				<label> Show:
					<input type="checkbox" name="boardgame" value="boardgames" checked={this.props.categories.boardgame} onChange={() => this.props.toggleCategory('boardgame')} />
					<label htmlFor="boardgame">Board Games</label>
					<input type="checkbox" name="rpg" value="rpgs" checked={this.props.categories.rpg} onChange={() => this.props.toggleCategory('rpg')} />
					<label htmlFor="rpg">RPGs</label>
				</label>
			</form>
		);
	}
}

export default Options;