import './home.styl';

import React from 'react';
import Helmet from 'react-helmet';

const Home = () =>
  <div className="home">
    <Helmet title="SyncTrello - synchronization of Trello cards across boards and even more"/>
    <div className="home__container">
      <h1 className="home__header">Sync Trello</h1>
      <h2 className="home__subheader">Easily synchronize your Trello cards even across boards</h2>
      <p>
        <strong>SyncTrello</strong> allows you to get cards synced and provides 2 types of
        synchronization: <strong>one-way and double-way bindings</strong>.
      </p>
      <p>
        In 2-way bindings your cards become hard synchronized to each other.
        Any changing of one cause the changing of the another. And changing of the second cause changing of the fist.
        It is the most common type of binding.
      </p>
      <p>
        In one-way bindings cards change by only one way. These bindings may help you to organize thin and powerful
        synchronizations between teams, share and update cards or anything you imagine.
      </p>
    </div>
  </div>;

export default Home;
