import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

const Profile = ({user}) =>
  !user.isLoggedIn
    ? <Redirect to="/auth" />
    : <div className="profile">
        Welcome to profile page
      </div>;

Profile.propTypes = {
  user: React.PropTypes.object
};

export default connect(state => ({
  user: state.auth.user
}))(Profile);
