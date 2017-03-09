import React from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';

import Button from '../../components/button/Button';

const Home = (props, {router}) =>
  <div className="page">
    <Helmet title="SyncTrello - synchronization of Trello cards across boards and even more"/>
    <div className="page__container">
      <h1 className="page__header">Sync Trello</h1>
      <h2 className="page__subheader">Easily synchronize your Trello cards even across boards</h2>
      <div className="page__block">
        <p>
         <strong>SyncTrello</strong> is the only one service for configurable cards synchronization.
          It allows you to get cards synced across lists and boards in two clicks.
        </p>
        <p>
          <strong>SyncTrello</strong> provides 2 types of synchronization: <strong>one-way and double-way bindings</strong>.
          You can toggle between the types or completely disable any synchronization whenever you wish.
        </p>
        <div className="page__more">Read more about all <Link to="/features">features</Link></div>
      </div>
    </div>
    <div className="page__wrapper page__wrapper_color_blue">
      <div className="page__container">
        <div className="page__block">
          <h3>How to synchronize cards using SyncTrello</h3>
          <ol>
            <li><Link to="/auth">Sign in</Link> with your existing Trello account</li>
            <li>Select the boards in which you want to synchronize the cards</li>
            <li>That is all. Go to Trello and make a card copy</li>
          </ol>
          <p>
            Bindings create automatically on copying cards.
            You can also create binding manually in your <Link to="/profile/cards">cabinet</Link>.
          </p>
        </div>
      </div>
    </div>

    <div className="page__container">
      <div className="page__block">
        <h3>No registration needed, no payments! Just Trello account only!</h3>
        <p>The synchronization will be available in <strong>20 seconds</strong>.</p>
        <div className="page__centered">
          <Button
            theme="green"
            label="Try it now"
            size="l"
            onClick={() => router.transitionTo('/auth')}
          />
        </div>
      </div>
    </div>
  </div>;

Home.contextTypes = {
  router: React.PropTypes.object
};

export default Home;
