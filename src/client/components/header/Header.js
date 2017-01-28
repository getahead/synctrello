import './header.styl';

import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import Avatar from '../avatar/Avatar';

const Header = ({user}) =>
  <div className="header">
    <div className="header__container">
      <div className="header__logo">
        <Link to="/" className="header__item">
          <img src={require('./logo.svg')} alt="Git starter" />
        </Link>
      </div>

      <div className="header__auth">
        {user.isLoggedIn
          ? <Link to="/profile" className="header__item" activeClassName="is-active">
              <div className="header__profile">
                <div className="header__profile-item"><Avatar size="s" user={user} /></div>
                <div className="header__profile-item header__profile-item_name">{user.login}</div>
              </div>

            </Link>
          : <Link to="/auth" className="header__item" activeClassName="is-active">Sign in</Link>
        }
      </div>
      <div className="header__items">
        <Link to="/" className="header__item" activeClassName="is-active" activeOnlyWhenExact>Home</Link>
        <Link to="/explore" className="header__item" activeClassName="is-active">Explore repositories</Link>
      </div>
    </div>
  </div>;

Header.propTypes = {
  user: React.PropTypes.object
};

export default connect(state => ({
  user: state.auth.user
}))(Header);
