import './binding.styl';

import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';

import {editBinding, createBinding, deleteBinding} from '../../../common/bindings/actions';
import {addCard} from '../../../common/cards/actions';

import Card from '../card/Card';
import Icon from '../icon/Icon';
import Button from '../button/Button';

class Binding extends React.Component {
  static propTypes = {
    editBinding: React.PropTypes.func.isRequired,
    createBinding: React.PropTypes.func.isRequired,
    deleteBinding: React.PropTypes.func.isRequired,
    onFinish: React.PropTypes.func,
    addCard: React.PropTypes.func.isRequired,
    cards: React.PropTypes.object.isRequired,
    boards: React.PropTypes.object.isRequired,
    create: React.PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.createBinding = this.createBinding.bind(this);
    this.state = {
      bindFirst: null,
      bindSecond: null,
      error: '',
      pending: false,
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
        idCard: card.id,
        idBoard: card.board.id,
        bindingEnabled: false
      }
    });
  }

  createBinding() {
    const {createBinding} = this.props;
    const {bindFirst, bindSecond} = this.state;
    if (!bindFirst || !bindSecond || !bindFirst.idCard || !bindSecond.idCard) {
      return;
    }

    this.setState({
      pending: true,
      error: ''
    });

    createBinding({
      firstCardId: bindFirst.idCard,
      secondCardId: bindSecond.idCard
    })
      .then(res => res.value)
      .then(::this.handleSuccess)
      .catch(::this.handleError);
  }

  handleSuccess(response) {
    if (!response.success) {
      return this.handleError(response);
    }

    this.setState({
      pending: false,
      bindFirst: null,
      bindSecond: null,
      error: ''
    });

    if (this.props.onFinish && typeof this.props.onFinish === 'function') {
      this.props.onFinish();
    }
  }

  handleError(response) {
    this.setState({
      pending: false,
      error: response.error && response.error.message || 'Unexpected error'
    });
  }

  updateBinding(idCard, idBindedCard) {
    const {editBinding, binding} = this.props;
    this.setState({
      pending: true,
      error: ''
    });

      return Promise.all([
        editBinding(binding.first().id, {idCard: idCard, idBindedCard: idBindedCard})
          .then(res => res.value),
        editBinding(binding.last().id, {idCard: idBindedCard, idBindedCard: idCard})
          .then(res => res.value)
      ])
        .then(response => {
          if (response[0] && response[1]) {
            if (!response[0].success) {
              return this.handleError(response[0]);
            }
            if (!response[1].success) {
              return this.handleError(response[1]);
            }
            this.setState({
              pending: false,
              bindFirst: null,
              bindSecond: null,
              error: ''
            });
          }
        })
  }

  render() {
    const {binding, cards, boards, create, editBinding, deleteBinding} = this.props;
    const {bindFirst, bindSecond, pending, error} = this.state;

    let needSave = create;
    const mainBinding = bindFirst || binding && binding.first();
    const secondBinding = bindSecond || binding && binding.last();

    const cardFirst = mainBinding && cards.get(mainBinding.idCard);
    const cardSecond = secondBinding && cards.get(secondBinding.idCard);

    const cardFirstBoard = cardFirst && boards.get(cardFirst.idBoard);
    const cardSecondBoard = cardSecond && boards.get(cardSecond.idBoard);

    if (((bindFirst && binding) || (bindSecond && binding))
      && ((mainBinding.idCard !== binding.first().idCard) || (secondBinding.idCard !== binding.last().idCard))) {
      // Need save is only for manual editing bindings
      // If initial cardId is not equal to new cardId
      needSave = true;
    }

    return (
      <div className="binding">
        {!create &&
          <div className="binding__remove">
            <Button
              size="xs"
              label="Remove binding"
              icon="delete"
              onClick={() => deleteBinding(mainBinding.idBinding)}
            />
          </div>
        }
        <div className="binding__body">
          <div className="binding__item">
            <Card
              create={create}
              card={cardFirst}
              cardBinded={cardSecond}
              boards={boards}
              binding={mainBinding}
              onSelect={(card) => this.onSelectCard(card, 'bindFirst')}
            />
          </div>
          <div className="binding__item">
            <Card
              create={create}
              card={cardSecond}
              cardBinded={cardFirst}
              boards={boards}
              binding={secondBinding}
              onSelect={(card) => this.onSelectCard(card, 'bindSecond')}
            />
          </div>
          {needSave
            ? (create
                ? (bindFirst && bindSecond &&
                    <div className="binding__scheme">
                      {bindFirst.idCard === bindSecond.idCard
                        ? 'selected cards are the same'
                        : <div className="binding__scheme-add">
                            <div className="binding__scheme-enabled">create new binding</div>
                            <Button
                              theme="green"
                              size="s"
                              icon="add"
                              pending={pending}
                              onClick={this.createBinding}
                            />
                            {error && <div className="binding__error">{error}</div>}
                          </div>
                      }
                    </div>)
                : <div className="binding__scheme">
                    <div className="binding__scheme-add">
                      <div className="binding__scheme-state">Save binding to apply changes</div>
                      <Button
                        theme="blue"
                        size="s"
                        icon="edit"
                        label="save"
                        pending={pending}
                        onClick={() => this.updateBinding(mainBinding.idCard, secondBinding.idCard)}
                      />
                      {error && <div className="binding__error">{error}</div>}
                    </div>
                  </div>
              )
            : <div>
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
}), {editBinding, createBinding, deleteBinding, addCard})(Binding);
