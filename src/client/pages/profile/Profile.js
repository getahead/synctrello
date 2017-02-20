import './profile-page.styl';

import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Match, Link} from 'react-router';
import Helmet from 'react-helmet';
import General from '../general/General';
import Cards from '../cards/Cards';
import Support from '../support/Support';

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
    const {isLoggedIn} = this.props;

    if (!isLoggedIn) {
      return <Redirect to="/auth" />
    }

    return (
      <div className="profile-page">
        <Helmet title="Profile page | SyncTrello"/>
        <div className="profile-page__container">
          <div className="profile-page__menu">
            <Link
              className="profile-page__menu-item"
              activeClassName="is-active"
              activeOnlyWhenExact
              to="/profile">
              General settings
            </Link>
            <Link
              className="profile-page__menu-item"
              activeClassName="is-active"
              activeOnlyWhenExact
              to="/profile/cards">
              Cards
            </Link>
            {/*
              <Link
                className="profile-page__menu-item"
                activeClassName="is-active"
                activeOnlyWhenExact
                to="/profile/rules">
                Rules
              </Link>
             */}

            {/*
              <Link
                className="profile-page__menu-item"
                activeClassName="is-active"
                activeOnlyWhenExact
                to="/profile/plans">
                Plans
              </Link>
            */}
            <Link
              className="profile-page__menu-item"
              activeClassName="is-active"
              activeOnlyWhenExact
              to="/profile/support">
              Support
            </Link>
          </div>
          <div className="profile-page__pages">
            <Match pattern="/profile" exactly component={General} />
            <Match pattern="/profile/cards" exactly component={Cards} />
            <Match pattern="/profile/support" exactly component={Support} />
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
