import './search.styl';

import React from 'react';
import {connect} from 'react-redux';
import {List} from 'immutable';
import enhanceWithClickOutside from 'react-click-outside';

import {searchCard} from '../../../common/search/actions';
import Spinner from '../spinner/Spinner';
import Icon from '../icon/Icon';

const TIMEOUT_DELAY_VALUE = 300;

class Search extends React.Component {
  static propTypes = {
    searchCard: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.onSearch = this.onSearch.bind(this);
    this.searchDelayTimeout = null;
    this.state = {
      value: '',
      pending: false,
      cards: [],
      boards: props.boards
        .filter(board => board.active)
        .keySeq().toArray()
    }
  }

  onSearch(e) {
    const {searchCard} = this.props;
    const query = e.target.value;
    const searchValue = this.state.value;

    if (!query.trim()) {
      return this.setState({value: query, cards: []})
    }

    clearTimeout(this.searchDelayTimeout);
    this.searchDelayTimeout = setTimeout(() => {
      if (query !== searchValue) {

        this.setState({pending: true});
        searchCard(query, this.state.boards)
          .then(action => action.value)
          .then(::this.responseHandler)
          .catch(::this.errorHandler);
      }
    }, TIMEOUT_DELAY_VALUE);

    this.setState({value: query})
  }

  responseHandler(response) {
    const cards = this.filterCards(response.data.cards)

    this.setState({
      pending: false,
      cards: cards.toArray()
    });
  }

  filterCards(cards) {
    const {exclude} = this.props;
    return List(cards)
      .filter(card => !card.closed && exclude.indexOf(card.id) === -1)
  }

  errorHandler(response) {
    this.setState({
      pending: false,
      cards: []
    });
  }

  handleClickOutside(e) {
    this.setState({cards: []});
  }

  selectCard(card) {
    this.setState({value: card.name, cards: []});
    this.props.onSelect(card);
  }

  render() {
    const {value, cards, pending} = this.state;

    return (
      <div className="search">
        <div className="search__label">
          <input
            autoComplete={false}
            autoCorrect={false}
            className="search__input"
            type="text"
            placeholder="Card url, name, description..."
            value={value}
            onChange={this.onSearch}
          />
          <div className="search__icon">
            {pending
              ? <Spinner size="xs" />
              : <Icon name="search" size="xs"/>
            }
          </div>
        </div>

        {cards && cards.length > 0 &&
          <div className="search__suggest">
            {cards.map((card, key) =>
              <div className="search__suggest-item" key={key} onClick={() => this.selectCard(card)}>
                <div className="search__suggest-title">{card.name}</div>
                <div className="search__suggest-info">
                  <span className="search__suggest-board">{card.board.name}</span>
                  <span className="search__suggest-list">{card.list.name}</span>
                </div>
              </div>
            )}
          </div>
        }
      </div>
    )
  }
}


Search = enhanceWithClickOutside(Search);
export default connect(state => ({
  status: state.search.status,
  error: state.search.error,
  boards: state.boards.map
}), {searchCard})(Search);
