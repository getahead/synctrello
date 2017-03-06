import './sign-in.styl';

import React from 'react';
import {connect} from 'react-redux';
import cookie from 'react-cookie';

import {trelloOauth, getUserInfo} from '../../../common/auth/actions';
import {windowOpen} from '../../lib/popup';

import Avatar from '../avatar/Avatar';
import Button from '../button/Button';

let oAuthPopUp;

const rememberUser = (token = '') => {
  cookie.save('token', token, { path: '/' });
};

const oAuthPopupOpen = (authorize, getUserInfo) => {
  oAuthPopUp = windowOpen('', 'Sign in with Trello');
  authorize(document.location.origin)
    .then((res) => {
      if (res.value.success && res.value.data) {
        oAuthPopUp.location.href = res.value.data.url;
        function completeAuth(event){
          getUserInfo(event.data)
            .then(res => rememberUser(res.value.data.token))
            .catch(err => rememberUser());

          window.removeEventListener('message', completeAuth);
          return oAuthPopUp.close();
        }

        window.addEventListener('message', completeAuth);
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
