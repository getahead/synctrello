import './footer.styl';

import React from 'react';
import {Link} from 'react-router';

const Footer = () =>
  <div className="footer">
    <div className="footer__items">
      <Link to="/contacts" className="footer__item" activeClassName="is-active" activeOnlyWhenExact>
        Contact us
      </Link>
    </div>
  </div>;

export default Footer;
