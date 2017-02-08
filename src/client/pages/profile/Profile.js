import './profile-page.styl';

import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Match} from 'react-router';
import BoardsSwitcher from '../../components/boards-switcher/BoardsSwitcher';

import {fetchBoards} from '../../../common/boards/actions';

class Profile extends React.Component {
  static propTypes = {
    isLoggedIn: React.PropTypes.bool.isRequired,
    fetchBoards: React.PropTypes.func.isRequired
  };

  static contextTypes = {
    store: React.PropTypes.object,
    serverFetchPromises: React.PropTypes.array
  };

  componentWillMount() {
    const {isLoggedIn, fetchBoards} = this.props;
    const { serverFetchPromises } = this.context;

    if (!isLoggedIn) {
      return;
    }

    if (serverFetchPromises) {
      return serverFetchPromises.push(fetchBoards());
    } else {
      return fetchBoards();
    }
  }

  render() {
    const {isLoggedIn, boards} = this.props;

    if (!isLoggedIn) {
      return <Redirect to="auth" />
    }

    return (
      <div className="profile-page">
        <div className="profile-page__container">
          <div className="profile-page__boards">
            <BoardsSwitcher boards={boards} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  isLoggedIn: state.auth.isLoggedIn,
  boards: state.boards.map
}), {fetchBoards})(Profile);
