import React, { Component } from 'react';
import Schedule from './Schedule';

class App extends Component {
    constructor() {
        super();
        this.changeDay = this.changeDay.bind(this);
        this.toggleCategory = this.toggleCategory.bind(this);
        this.state = {
            day: "Fri",
            times: {},
            events: [],
            categories: { boardgame: true, rpg: true}
        };
    }

    changeDay(selectedDay) {
        const day = this.state.day;
        this.setState( {day: selectedDay});
    }

    toggleCategory(category) {
        const status = this.state.categories[category];
        this.setState({categories: {...this.state.categories, [category]:!status } });
    }

    componentDidMount() {
        console.log("componentDidMount");
        fetch('/api')
            .then( res => res.json())
            .then(res => { this.setState( { events: res})})
    }

    render() {
        return (
            <div className="day-select">
                <label htmlFor="day-select">Select a day:</label>
                <select name="day-select" onChange={(e) => this.changeDay(e.target.value)}>
                    <option value="Fri">Friday</option>
                    <option value="Sat">Saturday</option>
                    <option value="Sun">Sunday</option>
                    <option value="Mon">Monday</option>
                </select>
                <Schedule day={this.state.day} categories={this.state.categories} events={this.state.events.filter(event => (event.day === this.state.day) && this.state.categories[event.category])} toggleCategory={this.toggleCategory} />
            </div>
        );
    }
}

export default App;