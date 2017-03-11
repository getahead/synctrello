import React from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';

import Button from '../../components/button/Button';

const Home = (props, {router}) =>
  <div className="page">
    <Helmet title="SyncTrello - synchronization of Trello cards between lists and boards"/>
    <div className="page__container">
      <h1 className="page__header">Sync Trello</h1>
      <h2 className="page__subheader">Easily synchronize your Trello cards between lists and boards</h2>
      <div className="page__block">
        <p>
         <strong>SyncTrello</strong> is the only service which allows you to create synchronized cards
          in just two clicks.
        </p>
        <p>
          Share your card with coworkers and deliver updates with <strong>one-way bindings</strong>.<br />
          Collaborate with your team using <strong>two-way synchronization</strong>.
        </p>
        <div className="page__more">More <Link to="/features">features</Link></div>
      </div>
    </div>
    <div className="page__wrapper page__wrapper_color_blue">
      <div className="page__container">
        <div className="page__block">
          <div className="page__demonstration clearfix">
            <div className="page__demonstration-right">
              <img
                className="page__demonstration-img"
                src={require('./demonstration.gif')}
                alt="Sync Trello cards - SyncTrello.com"
              />
            </div>
            <div className="page__demonstration-left">
              <h3>How to synchronize cards using SyncTrello</h3>
              <ol className="page__list">
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
