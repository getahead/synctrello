import './sign-in.styl';

import React from 'react';
import {connect} from 'react-redux';
import {gitHubOauth, getGithubUserToken} from '../../../common/auth/actions';
import {windowOpen} from '../../lib/popup';

import Avatar from '../avatar/Avatar';
import Button from '../button/Button';

let oAuthPopUp;

const getAuthorizationResult = (getUserInfo) => {
  getUserInfo();
};

const oAuthPopupOpen = (authorize, getUserInfo) => {
  authorize()
    .then((res) => {
      if (res.value.success && res.value.data) {
        oAuthPopUp = windowOpen(res.value.data.url, 'Sign in with Github');
        window.addEventListener('message', (event) => {
          console.log(event)
          getAuthorizationResult(getUserInfo)
        });
      }
      return res;
    });
};

const SignIn = ({status, user, gitHubOauth, getGithubUserToken}) =>
  <div className="sign-in">
    <div className="sign-in__header">
      Sign in with your existing GitHub account
    </div>
    <div className="sign-in__avatar">
      <Avatar user={user} size="l" />
    </div>
    <div className="sign-in__button">
      <Button
        theme="black"
        icon="octicon"
        label="Sign in with GitHub account"
        size="m"
        pending={status === 'pending'}
        onClick={() => oAuthPopupOpen(gitHubOauth, getGithubUserToken)}
      />
    </div>
  </div>;

SignIn.propTypes = {
  gitHubOauth: React.PropTypes.func.isRequired,
  getGithubUserToken: React.PropTypes.func.isRequired,
  status: React.PropTypes.string.isRequired,
  user: React.PropTypes.object
};

export default connect(state => ({
  user: state.auth.user,
  status: state.auth.status
}), {gitHubOauth, getGithubUserToken})(SignIn);
