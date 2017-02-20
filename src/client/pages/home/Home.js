import './home.styl';

import React from 'react';
import Helmet from 'react-helmet';

const Home = () =>
  <div className="home">
    <Helmet title="SyncTrello - sync Trello cards across boards and even more"/>
    <div className="home__container">
      <h1 className="home__header">Sync Trello</h1>
      <h2 className="home__subheader">Easily synchronize your Trello cards even across boards</h2>
    </div>

  </div>;

export default Home;
