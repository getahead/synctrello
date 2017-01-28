import React from 'react';
import {connect} from 'react-redux';
import {fetchRepositories} from '../../../common/repositories/actions';

class Explore extends React.Component {
  static contextTypes = {
    store: React.PropTypes.object,
    serverFetchPromises: React.PropTypes.array
  };

  static propTypes = {
    repositories: React.PropTypes.object.isRequired,
    fetchRepositories: React.PropTypes.func.isRequired
  };

  componentWillMount() {
    const { serverFetchPromises } = this.context;
    if (!serverFetchPromises) {
      return this.props.fetchRepositories();
    }

    return serverFetchPromises.push(this.props.fetchRepositories());
  }

  render() {
    const {repositories} = this.props;
    return (
      <div>
        {repositories.valueSeq().map((repository, key) =>
          <div key={key}>
            <a href={repository.url}>- {repository.name}</a>
          </div>
        )}
      </div>
    );
  }
}


export default connect(state => ({
  repositories: state.repositories.map,
}), { fetchRepositories })(Explore);
