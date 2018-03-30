import React, { Component } from 'react';

import Raven from 'js/components/Raven';

Raven.watch({
  test: 2,
  test2: 3,
});

class Test extends Component {
  test = () => {
    console.log(this);
  }
  render() {
    this.test();

    return (
      <div className="page-home-test-render example">
        test2222
      </div>
    );
  }
}

export default Test;
