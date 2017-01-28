import './base.styl';
import './layout.styl';

import React from 'react';
import {connect} from 'react-redux';
import {Match, Miss} from 'react-router';

import {getUserInfo} from '../../common/auth/actions';

import Home from '../pages/home/Home';
import Explore from '../pages/explore/Explore';
import Auth from '../pages/auth/Auth';
import Profile from '../pages/profile/Profile';

import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';


const NotFound = ({ location }) =>
  <div>
    <div>404 Not Found for {location.pathname}</div>
  </div>;

class App extends React.Component {
  static contextTypes = {
    store: React.PropTypes.object,
    serverFetchPromises: React.PropTypes.array
  };

  static propTypes = {
    user: React.PropTypes.object.isRequired,
    getUserInfo: React.PropTypes.func.isRequired
  };

  componentWillMount() {
    const {user, getUserInfo} = this.props;
    const { serverFetchPromises } = this.context;

    if (user.isLoggedIn) {
      if (!serverFetchPromises) {
        return getUserInfo();
      }

      return serverFetchPromises.push(getUserInfo());
    }

    return true;
  }

  render() {
    return (
      <div className="layout">
        <div className="layout__container">
          <div className="layout__header">
            <Header />
          </div>
          <div className="layout__content">
            <Match pattern="/" exactly component={Home} />
            <Match pattern="/explore" component={Explore} />
            <Match pattern="/auth" component={Auth} />
            <Match pattern="/profile" component={Profile} />
            <Miss component={NotFound} />
          </div>
        </div>
        <div className="layout__footer">
          <Footer />
        </div>
      </div>
    );
  }
}


export default connect(state => ({
  user: state.auth.user
}), { getUserInfo })(App);
