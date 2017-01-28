import React from 'react';

class ServerFetchProvider extends React.Component {
  static propTypes = {
    children: React.PropTypes.any,
    promises: React.PropTypes.array,
  };

  static childContextTypes = {
    serverFetchPromises: React.PropTypes.array,
  };
  getChildContext() {
    return {
      serverFetchPromises: this.props.promises,
    };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

export default ServerFetchProvider;
