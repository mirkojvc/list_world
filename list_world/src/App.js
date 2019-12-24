import React from 'react';
import logo from './logo.svg';
import './App.css';
import Test from './test';

class App extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
    this.callAPI();
  }

  callAPI() {
    fetch("http://localhost:9000/")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Test/>
          {this.state.apiResponse}
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
