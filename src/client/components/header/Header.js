import './header.styl';

import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import Avatar from '../avatar/Avatar';

const Header = ({isLoggedIn, profile}) =>
  <div className="header">
    <div className="header__container">
      <div className="header__logo">
        <Link to="/" className="header__item">
          <img src={require('./logo.svg')} className="header__logo-img" alt="Git starter" />
        </Link>
      </div>

      <div className="header__auth">
        {isLoggedIn
          ? <Link to="/profile" className="header__item" activeClassName="is-active">
              <div className="header__profile">
                <div className="header__profile-item"><Avatar size="s" user={profile} /></div>
                <div className="header__profile-item header__profile-item_name">{profile.username}</div>
              </div>
            </Link>
          : <Link to="/auth" className="header__item" activeClassName="is-active">Sign in</Link>
        }
      </div>
      <div className="header__items">
        <Link to="/" className="header__item" activeClassName="is-active" activeOnlyWhenExact>
          Home
        </Link>
        <Link to="/features" className="header__item" activeClassName="is-active" activeOnlyWhenExact>
          Features
        </Link>
        <Link to="/faq" className="header__item" activeClassName="is-active" activeOnlyWhenExact>
          FAQ
        </Link>
      </div>
    </div>
  </div>;

Header.propTypes = {
  isLoggedIn: React.PropTypes.bool.isRequired,
  profile: React.PropTypes.object.isRequired
};

export default connect(state => ({
  isLoggedIn: state.auth.isLoggedIn,
  profile: state.auth.profile
}))(Header);
