import React, { Component } from 'react';
import { TransitionGroup } from 'react-transition-group';

export default class Res extends Component {
  render() {
    const { show, children } = this.props;

    return (
      <TransitionGroup>
        { show ? children : null }
      </TransitionGroup>
    );
  }
}
