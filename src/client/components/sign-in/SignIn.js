import './sign-in.styl';

import React from 'react';
import {connect} from 'react-redux';
import {trelloOauth, getUserInfo} from '../../../common/auth/actions';
import {windowOpen} from '../../lib/popup';

import Avatar from '../avatar/Avatar';
import Button from '../button/Button';

let oAuthPopUp;

const oAuthPopupOpen = (authorize, getUserInfo) => {
  authorize()
    .then((res) => {
      if (res.value.success && res.value.data) {
        oAuthPopUp = windowOpen(res.value.data.url, 'Sign in with Trello');

        window.addEventListener('message', (event) => {
          getUserInfo(event.data);
          return oAuthPopUp.close();
        });
      }
      return res;
    });
};

const SignIn = ({status, profile, trelloOauth, getUserInfo}) =>
  <div className="sign-in">
    <div className="sign-in__header">
      Sign in with your existing Trello account
    </div>
    <div className="sign-in__avatar">
      <Avatar user={profile} size="l" />
    </div>
    <div className="sign-in__button">
      <Button
        theme="trello"
        icon="trello"
        label="Sign in with Trello"
        size="m"
        pending={status === 'pending'}
        onClick={() => oAuthPopupOpen(trelloOauth, getUserInfo)}
      />
    </div>
  </div>;

SignIn.propTypes = {
  trelloOauth: React.PropTypes.func.isRequired,
  getUserInfo: React.PropTypes.func.isRequired,
  status: React.PropTypes.string.isRequired,
  profile: React.PropTypes.object.isRequired
};

export default connect(state => ({
  profile: state.auth.profile,
  status: state.auth.status
}), {trelloOauth, getUserInfo})(SignIn);
