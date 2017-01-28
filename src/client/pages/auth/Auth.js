import './auth.styl';

import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

import SignIn from '../../components/sign-in/SignIn';

const Auth = ({user}) =>
  user.isLoggedIn
    ? <Redirect to="/profile" />
    : <div className="auth">
        <div className="auth__container">
          <SignIn />
        </div>
      </div>;

Auth.propTypes = {
  user: React.PropTypes.object.isRequired
};

export default connect(state => ({
  user: state.auth.user
}))(Auth);
