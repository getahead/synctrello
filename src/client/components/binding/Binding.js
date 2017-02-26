import './binding.styl';

import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';

import {editBinding} from '../../../common/bindings/actions';
import {addCard} from '../../../common/cards/actions';

import Card from '../card/Card';
import Icon from '../icon/Icon';
import Button from '../button/Button';

class Binding extends React.Component {
  static propTypes = {
    editBinding: React.PropTypes.func.isRequired,
    addCard: React.PropTypes.func.isRequired,
    cards: React.PropTypes.object.isRequired,
    boards: React.PropTypes.object.isRequired,
    create: React.PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      bindFirst: null,
      bindSecond: null
    }
  }

  onSelectCard(card, name) {
    const {addCard} = this.props;

    if (!card) {
      return this.setState({[name]: null});
    }

    addCard({
      id: card.id,
      name: card.name,
      desc: card.desc,
      shortUrl: card.shortUrl,
      idBoard: card.board.id,
      idList: card.list.id
    });

    this.setState({
      [name]: {
        id: 'newBinding',
        idCard: card.id,
        idBoard: card.board.id,
        bindingEnabled: false
      }
    });
  }

  render() {
    const {binding, cards, boards, create, editBinding} = this.props;
    const {bindFirst, bindSecond} = this.state;

    const mainBinding = bindFirst || binding && binding.first();
    const secondBinding = bindSecond || binding && binding.last();

    const cardFirst = mainBinding && cards.get(mainBinding.idCard);
    const cardSecond = secondBinding && cards.get(secondBinding.idCard);

    const cardFirstBoard = cardFirst && boards.get(cardFirst.idBoard);
    const cardSecondBoard = cardSecond && boards.get(cardSecond.idBoard);

    return (
      <div className="binding">
        <div className="binding__body">
          <div className="binding__item">
            <Card
              create={create}
              card={cardFirst}
              boards={boards}
              binding={mainBinding}
              onSelect={(card) => this.onSelectCard(card, 'bindFirst')}
            />
          </div>
          <div className="binding__item">
            <Card
              create={create}
              card={cardSecond}
              boards={boards}
              binding={secondBinding}
              onSelect={(card) => this.onSelectCard(card, 'bindSecond')}
            />
          </div>
          {cardFirstBoard && cardSecondBoard && cardFirstBoard.active && cardSecondBoard.active
            ? <div className="binding__scheme">
                <div
                  onClick={() => editBinding(mainBinding.id, {bindingEnabled: !mainBinding.bindingEnabled})}
                  className={classNames({
                    'binding__scheme-item': true,
                    'binding__scheme-item_active': mainBinding && mainBinding.bindingEnabled
                  })}>
                  <Icon name="direction-right"/>
                </div>
                <div
                  onClick={() => editBinding(secondBinding.id, {bindingEnabled: !secondBinding.bindingEnabled})}
                  className={classNames({
                    'binding__scheme-item': true,
                    'binding__scheme-item_active': secondBinding && secondBinding !== mainBinding && secondBinding.bindingEnabled
                  })}>
                  <Icon name="direction-left"/>
                </div>
                <div className="binding__scheme-state">
                  {(mainBinding && mainBinding.bindingEnabled)
                  && (secondBinding && secondBinding !== mainBinding && secondBinding.bindingEnabled)
                    ? <div className="binding__scheme-enabled">two-way binding</div>
                    : (mainBinding.bindingEnabled !== secondBinding.bindingEnabled
                        ? <div className="binding__scheme-enabled">one-way binding</div>
                        : <div className="binding__scheme-disabled">binding disabled</div>
                    )
                  }
                </div>
              </div>
            : <div className="binding__scheme">
                {cardFirstBoard && cardSecondBoard &&
                  <div className="binding__scheme-disabled">
                    <Icon name="sync-warn" size="m"/>
                  </div>
                }
                {cardFirstBoard && !cardFirstBoard.active &&
                  <div className="binding__scheme-disabled">
                    <strong>{cardFirstBoard.name}</strong> is inactive
                  </div>
                }
                {cardSecondBoard && !cardSecondBoard.active &&
                  <div className="binding__scheme-disabled">
                    <strong>{cardSecondBoard.name}</strong> is inactive
                  </div>
                }
              </div>
          }

          {bindFirst && bindSecond &&
            <div className="binding__scheme">
              {bindFirst === bindSecond
                ? 'selected cards are the same'
                : <div className="binding__scheme-add">
                    <div className="binding__scheme-enabled">create new binding</div>
                    <Button
                      theme="green"
                      size="s"
                      icon="add"
                    />
                  </div>
              }
            </div>
          }
        </div>
      </div>
    );
  }
};

export default connect(state => ({
  cards: state.cards.map,
  boards: state.boards.map
}), {editBinding, addCard})(Binding);
