import './card.styl';

import React from 'react';
import classNames from 'classnames';
import enhanceWithClickOutside from 'react-click-outside';
import moment from 'moment';

import Search from '../search/Search';
import Icon from '../icon/Icon';
import Button from '../button/Button';

class Card extends React.Component {
  static propTypes = {
    onSelect: React.PropTypes.func.isRequired,
    binding: React.PropTypes.object,
    card: React.PropTypes.object,
    cardBinded: React.PropTypes.object,
    boards: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.onWindowKeyUp = this.onWindowKeyUp.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onRevert = this.onRevert.bind(this);
    this.remove = this.remove.bind(this);

    this.state = {
      create: props.create,
      expand: false
    }
  }

  onSelect(card) {
    this.props.onSelect(card);
    this.setState({create: false});
  }

  remove() {
    this.props.onSelect();
    this.setState({create: true, expand: false});
  }

  onRevert() {
    this.props.onSelect(null);
    this.setState({create: this.props.create});
  }

  componentWillUnmount() {
    this.toggleExpand(false);
  }

  toggleExpand(state) {
    if (state) {
      document.addEventListener('keyup', this.onWindowKeyUp);
    } else {
      document.removeEventListener('keyup', this.onWindowKeyUp);
    }
    this.setState({expand: state});
  }

  onWindowKeyUp(e) {
    if (e.keyCode === 27) {
      this.toggleExpand(false);
    }
  }

  handleClickOutside(e) {
    if (this.state.expand) {
      this.toggleExpand(false);
    }
  }

  render() {
    const {card, cardBinded, binding, boards} = this.props;
    const {expand, create} = this.state;

    let exclude = [];
    if (cardBinded) {
      exclude = exclude.concat(cardBinded.id);
    }

    if (create) {
      return (
        <div className="card">
          <Search onSelect={this.onSelect} exclude={exclude}/>
          {card && create !== this.props.create &&
            <div className="card__cancel">
              <Button
                label="Revert"
                theme="clean"
                icon="back"
                onClick={this.onRevert}
              />
            </div>
          }
        </div>
      )
    }

    if (!card) {
      return (
        <div className="card card_pending"></div>
      )
    }

    const cardBoard = boards.get(card.idBoard);
    return (
      <div className={classNames({
        'card': true,
        'card_inactive': !binding.bindingEnabled || !cardBoard.active,
        'card_blur': expand
      })}>
        <div className="card__settings">
          {!expand
            ? <div className="card__settings-icon" onClick={() => this.toggleExpand(true)}>
                <Icon name="dots"/>
              </div>
            : <div className="card__settings-popup">
                {!!binding.lastSynced &&
                  <div className="card__settings-info">
                    <div>
                      <span>Last sync: </span>
                      <strong>{moment(binding.lastSynced).format('YYYY-MM-DD HH:mm:ss')}</strong>
                    </div>
                    <div>
                      <span>by </span>
                      <a href={`https://trello.com/${binding.userNameLastSynced}`} target="_blank">
                        {binding.userNameLastSynced}
                      </a>
                    </div>
                  </div>
                }
                <a href={card.shortUrl} target="_blank" className="card__settings-item">
                  Go to card on Trello
                </a>
                <div
                  className="card__settings-item card__settings-item_red"
                  onClick={this.remove}
                >
                  Remove card from binding
                </div>
              </div>
            }
        </div>
        <div className="card__body">
          <div className="card__info">
            <span className="card__info-icon">
              <Icon name="trello"/>
            </span>
            {cardBoard && !cardBoard.active && <span className="card__info-warn">(inactive)</span>}
            {cardBoard && <span className="card__info-text">{cardBoard.name}</span>}
          </div>

          <div className="card__name">{card.name}</div>
          {card.desc &&
            <div className="card__info">
              <span className="card__info-icon">
                <Icon name="description"/>
              </span>
              <span className="card__info-text">
                {card.desc}
              </span>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default enhanceWithClickOutside(Card);
