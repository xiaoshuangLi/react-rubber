import { Component } from 'react';

const loadedBundle = new WeakMap();

class Bundle extends Component {
  state = {
    mod: null,
  }

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  load(props) {
    const { load } = props;

    if (loadedBundle.has(load)) {
      return this.setState({
        mod: loadedBundle.get(load),
      });
    }

    load()
      .then((res = {}) => {
        const mod = res.default ? res.default : res;

        this.setState({ mod });
        loadedBundle.set(load, mod);
      });
  }

  render() {
    return this.state.mod ? this.props.children(this.state.mod) : null;
  }
}

export default Bundle;
