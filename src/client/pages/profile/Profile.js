import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

const Profile = ({isLoggedIn}) =>
  !isLoggedIn
    ? <Redirect to="/auth" />
    : <div className="profile">
        Welcome to profile page
      </div>;

Profile.propTypes = {
  isLoggedIn: React.PropTypes.bool.isRequired
};

export default connect(state => ({
  isLoggedIn: state.auth.isLoggedIn
}))(Profile);
