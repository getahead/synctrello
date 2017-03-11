import React from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';

const Faq = () =>
  <div className="page">
    <Helmet title="FAQ SyncTrello - How to link cards in Trello"/>
    <div className="page__container">
      <h1 className="page__header">FAQ</h1>

      <div className="page__block">
        <h3 className="page__block-question">How does the syncing work?</h3>
        <p>
          SyncTrello gets notifications about changes on your board. We match a bound card and apply changes for it.
          The whole process usually takes less than a second.
        </p>
      </div>

      <div className="page__block">
        <h3 className="page__block-question">How do bindings create?</h3>
        <p>
          <strong>SyncTrello</strong> gets notifications on copy card actions and create a binding.
          You can also create a binding manually in your <Link to="/profile/cards">dashboard</Link>.
          If you prefer the manual binding creation to the automatic,
          you can always switch between modes in your settings.
        </p>
      </div>

      <div className="page__block">
        <h3 className="page__block-question">What kind of data do we store on our servers?</h3>
        <p>
          SyncTrello stores only your Trello userId, username, list of boards and your email. It also needs ids of paired cards for making bindings. We do not even store card’s body or history.
        </p>
      </div>

      <div className="page__block">
        <h3 className="page__block-question">What kind of data does SyncTrello synchronise?</h3>
        <p>
          SyncTrello can sync cardnames, cards descriptions, due dates.
        </p>
      </div>

      <div className="page__block">
        <h3 className="page__block-question">What are one-way and double-ways bindings?</h3>
        <p>
          In double-ways bindings cards sync in both sides. In one-way bindings cards synchronise only by one direction.
          You can switch between the binding modes for each of a pair you created in your <Link to="/profile/cards">cards list</Link>.
          You are also allowed to set default binding mode for new pairs in your settings.
        </p>
      </div>

      <div className="page__block">
        <h3 className="page__block-question">Can I disable creating bindings by other users?</h3>
        <p>
          Yes, you can set it in your settings.
        </p>
      </div>

      <div className="page__block">
        <h3 className="page__block-question">Can I create chains of cards?</h3>
        <p>
          Yes, but be careful. We do not limit chains size and We are not responsible for the cards in your chains.
        </p>
      </div>

    </div>
  </div>;

export default Faq;
