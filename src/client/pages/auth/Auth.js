import './auth.styl';

import React from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {Redirect} from 'react-router';

import SignIn from '../../components/sign-in/SignIn';

const Auth = ({isLoggedIn}) =>
  isLoggedIn
    ? <Redirect to="/profile" />
    : <div className="auth">
        <Helmet title="Sign in - SyncTrello"/>
        <div className="auth__container">
          <SignIn />
        </div>
      </div>;

Auth.propTypes = {
  isLoggedIn: React.PropTypes.bool.isRequired
};

export default connect(state => ({
  isLoggedIn: state.auth.isLoggedIn
}))(Auth);
