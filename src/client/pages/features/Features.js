import React from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';

const Features = () =>
  <div className="page">
    <Helmet title="SyncTrello Features - syncing cards, binding modes and linking cards configuration"/>
    <div className="page__container">
      <h1 className="page__header">Features</h1>
      <h2 className="page__subheader">
        SyncTrello is a powerful tool for configuring synchronizations in Trello.
      </h2>
      <div className="page__block">
        <h3>One-way bindings</h3>
        <p>
          Cards with one-way bindings change in one direction only.
          Share your card and everyone with a copy will get the latest updates from you.
        </p>
      </div>
      <div className="page__block">
        <h3>Two-way bindings</h3>
        <p>
          Two-way bound cards synchronize in both directions. Changes in one card will cause the change of another.
        </p>
      </div>
      <div className="page__block">
        <h3>Create and manage your bindings</h3>
        <p>
          Copy your card in Trello to start synchronization.
          You also can create, view and manage your bindings in <Link to="/profile/cards">dashboard</Link>.
        </p>
      </div>
      <div className="page__block">
        <h3>Edit your existing bindings</h3>
        <p>
          You can manage synchronization settings at every time period.
        </p>
      </div>
      <div className="page__block">
        <h3>Organize your workflow</h3>
        <p>
          <strong>SyncTrello</strong> supports unlimited the number of synced cards.
          Create as many copies as you like, design complex synchronization chains using all types of bindings
          and build a powerful tool for collaboration.
        </p>
      </div>
    </div>
  </div>;

export default Features;
