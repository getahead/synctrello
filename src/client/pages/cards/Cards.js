import React from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';

import {fetchBindings} from '../../../common/bindings/actions';
import {fetchCards} from '../../../common/cards/actions';

import BindingList from '../../components/binding/BindingList';

class Cards extends React.Component {
  static propTypes = {
    fetchBindings: React.PropTypes.func.isRequired,
    fetchCards: React.PropTypes.func.isRequired,

    cards: React.PropTypes.object.isRequired,
    bindings: React.PropTypes.object.isRequired,
    boards: React.PropTypes.object.isRequired
  };

  static contextTypes = {
    store: React.PropTypes.object,
    serverFetchPromises: React.PropTypes.array
  };

  componentWillMount() {
    const {fetchBindings, fetchCards} = this.props;
    const {serverFetchPromises} = this.context;

    if (serverFetchPromises) {
      serverFetchPromises.push(fetchBindings());
      serverFetchPromises.push(fetchCards());

      return serverFetchPromises;
    } else {
      return Promise.all([fetchBindings(), fetchCards()]);
    }
  }

  render() {
    const {bindings, cards, boards} = this.props;

    return (
      <div className="cards">
        <Helmet title="Configure cards bindings | SyncTrello" />

        <div className="cards__container">
          <div className="cards__text">
            <p>
              Here is a list of your existing bindings between your cards.
              They create automatically while copying cards. <br/>
              You can also add binding manually by searching cards using the provided interface.
            </p>
            <p>
              Each binding can be configured or deactivated.
              Switch the binding types whatever you want to get maximum productivity of your work!
            </p>
          </div>
          <div className="cards__bindings">
            <BindingList bindings={bindings
              .groupBy(binding => binding.idBinding)
              .sort((a, b) => a.first().get('created') < b.first().get('created'))
            }/>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  cards: state.cards.map,
  boards: state.boards.map,
  bindings: state.bindings.map
}), {fetchBindings, fetchCards})(Cards);
