import React, { Component } from 'react';
import { connect } from 'react-redux';
import Combobox from './components/combobox/Combobox';
import logo from './logo.svg';
import { getCountries } from './utils';
import './App.styl';

class App extends Component {
  render() {
    const suggestions = getCountries();
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <br/>
        <Combobox
          suggestions={suggestions}
          placeholder="Choose country"
        />
      </div>
    );
  }
}

function select(state) {
  const { app } = state;
  return { app };
}

export default connect(select)(App);
