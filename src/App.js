import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Aseman junatiedot</h1>
        </header>
        <div className="App-content">
          {this.props.children}
        </div>
        <footer className="App-footer" />
      </div>
    );
  }
}

export default App;
