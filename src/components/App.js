import React, { Component } from 'react';
import Schedule from './Schedule';

class App extends Component {
    constructor() {
        super();
        this.state = {
            day: "Fri",
            times: {}
        }
    }

    changeDay(selectedDay) {
        console.log(selectedDay);
        const day = this.state.day;
        this.setState( {day: selectedDay});
    };

    render() {
        return (
            <div className="day-select">
                <label for="day-select">Select a day:</label>
                <select name="day-select" onChange={(e) => this.changeDay(e.target.value)}>
                    <option value="Fri">Friday</option>
                    <option value="Sat">Saturday</option>
                    <option value="Sun">Sunday</option>
                    <option value="Mon">Monday</option>
                </select>
                <Schedule day={this.state.day}/>
            </div>
        );
    }
}

export default App;
