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
    cards: React.PropTypes.object,
    boards: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.onWindowKeyUp = this.onWindowKeyUp.bind(this);
    this.state = {
      create: props.create,
      expand: false
    }
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
    this.toggleExpand(false);
  }

  render() {
    const {card, binding, boards} = this.props;
    const {expand, create} = this.state;

    if (create) {
      return (
        <div className="card">
          <Search onSelect={this.props.onSelect}/>
          {card &&
            <div className="card__cancel">
              <Button
                label="Cancel"
                theme="clean"
                icon="cancel"
                onClick={() => this.setState({create: false})}
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
                <a href={card.shortUrl} target="_blank" className="card__settings-item">
                  Go to card on Trello
                </a>
                <div
                  className="card__settings-item card__settings-item_red"
                  onClick={() => this.setState({create: true, expand: false})}
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