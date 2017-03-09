import React from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';

const Features = () =>
  <div className="page">
    <Helmet title="Features - SyncTrello"/>
    <div className="page__container">
      <h1 className="page__header">Features</h1>
      <h2 className="page__subheader">
        SyncTrello is a powerful tool for making thin-configured synchronizations.
      </h2>
      <div className="page__block">
        <h3>Double-way bindings</h3>
        <p>
          In 2-way bindings your cards become hard synchronized to each other.
          Any changing of one cause the changing of the another. And changing of the second cause changing of the fist.
          It is the most common type of binding.
        </p>
      </div>
      <div className="page__block">
        <h3>One-way bindings</h3>
        <p>
          In one-way bindings cards change in one direction only. These bindings may help you to organize thin and
          powerful synchronizations between teams, share and update cards or anything you imagine.
        </p>
      </div>
      <div className="page__block">
        <h3>Automatic and manual synchronizations</h3>
        <p>
          Add bindings in automatic mode or create through the <Link to="/profile/cards">cabinet</Link>.
        </p>
      </div>
      <div className="page__block">
        <h3>Edit your existing bindings</h3>
        <p>
          You can manage synchronization settings at every time period.
        </p>
      </div>
      <div className="page__block">
        <h3>Create chains</h3>
        <p>
          One card can be synchronized with unlimited count of other cards. The others at the same time can have different
          bindings. That feature provides you a powerful instrument for cards syncing. But be careful, it also can be
          dangerous.
        </p>
      </div>
    </div>
  </div>;

export default Features;
