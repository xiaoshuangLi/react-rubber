import React, { Component } from 'react';

class App extends Component {
  componentWillMount() {
    if (typeof document !== 'undefined') {
      document.addEventListener('touchstart', () => {});
    }
  }

  render() {
    return (
      <div className="app-container">
        {this.props.children}
      </div>
    );
  }
}

export default App;
