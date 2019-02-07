import React, { Component } from 'react';
import './app.css';

import Match from './components/Match.js'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      region: 'NA',
      matches: [],
    };

    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserInput(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    console.log(`Your summoner name is: ${this.state.name}`);
    console.log(`Your region is: ${this.state.region}`);
    event.preventDefault();

    const userData = {
      name: this.state.name,
      region: this.state.region
    };

    fetch('/api/search-summoner', {
      method: 'post',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then((data) => {
      this.setState({
        matches: data.matches
      });
    });
  }

  render() {
    const { name, region, matches } = this.state;
    return (
      <div>
        <h1>Hello Summoner</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="name" placeholder="Enter summoner name here" value={name} onChange={this.handleUserInput} />
          <select name="region" value={region} onChange={this.handleUserInput}>
            <option value="BR1">BR</option>
            <option value="EUN1">EUNE</option>
            <option value="EUW1">EUW</option>
            <option value="JP1">JP</option>
            <option value="KR">KR</option>
            <option value="LA1">LAN</option>
            <option value="LA2">LAS</option>
            <option value="NA1">NA</option>
            <option value="OC1">OCE</option>
            <option value="T1">TR</option>
            <option value="RU">RU</option>
            <option value="PBE1">PBE</option>
          </select>
          <input type="submit" value="Search" />
        </form>
        <div className="results-container">
          <Matches matches={matches} />
        </div>
      </div>
    );
  }
}

const Matches = ({ matches }) => {
  console.log(matches);
  if (matches.length) {
    return (
      <ul>
        {matches.map(match => <Match match={match} />)}
      </ul>
    );
  }

  return null;
};
