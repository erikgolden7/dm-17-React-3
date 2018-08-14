import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      input: '',
      character: '',
      people: []
    };
  }

  // componentDidMount() {
  //   let promise = axios.get('https://swapi.co/api/people');
  //   promise.then(response => {
  //     console.log(response.data.results);
  //     this.setState({ people: response.data.results });
  //   });
  // }

  componentDidMount() {
    axios
      .get('https://swapi.co/api/people')
      .then(response => this.setState({ people: response.data.results }))
      .catch(error => console.log(error));
  }

  handleInput = e => {
    this.setState({ input: e.target.value });
  };

  //Param - people/3
  //Query - people/?char=3

  getChar = () => {
    let id = this.state.input || 1;
    // https://swapi.co/api/people/7
    let promise = axios.get(`https://swapi.co/api/people/${id}`);
    let promise = axios.get('https://swapi.co/api/people/' + id);
    promise.then(res => {
      console.log(res);
      this.setState({ character: res.data.name });
    });
  };

  render() {
    let { people } = this.state;
    let myPerson = people.map((e, i) => {
      return <h2 key={i}>{e.name}</h2>;
    });

    return (
      <div className="App">
        <input
          placeholder="Enter character id..."
          onChange={this.handleInput}
        />
        <button onClick={this.getChar}>Get Character</button>
        {myPerson}
        <h1>My Searched Character:</h1>
        <div>{this.state.character}</div>
      </div>
    );
  }
}

export default App;
