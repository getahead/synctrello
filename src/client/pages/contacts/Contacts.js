import React from 'react';
import Helmet from 'react-helmet';

const Contacts = () =>
  <div className="page">
    <Helmet title="Contact us - SyncTrello"/>
    <div className="page__container">
      <h1 className="page__header">Contact us</h1>
      <p>
        <a href="mailto:support@synctrello.com">support@synctrello.com</a>
      </p>
    </div>
  </div>;

export default Contacts;
