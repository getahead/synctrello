import './boards-switcher-item.styl';

import React from 'react';
import classNames from 'classnames';
import SyncCheckbox from '../sync-checkbox/SyncCheckbox';

import {ERROR_MESSAGES} from '../../../common/lib/validation';

export default class BoardsSwitcherItem extends React.Component {
  static propTypes = {
    board: React.PropTypes.object.isRequired,
    onToggle: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      pending: false,
      error: null
    }
  }

  toggle() {
    const {board, onToggle} = this.props;

    this.setState({
      pending: true,
      error: null
    });

    return onToggle({
      id: board.id,
      active: !board.active,
      idWebhook: board.active && board.idWebhook
    })
      .then(::this.handleToggleSuccess)
      .catch(::this.handleToggleError)
  }

  handleToggleSuccess(response) {
    if (!response.value.success) {
      return this.handleToggleError(response);
    }

    this.setState({
      pending: false,
      error: null
    });
  }

  handleToggleError(response) {
    this.setState({
      pending: false,
      error: response && response.value
        ? response.value.error
        : {message: ERROR_MESSAGES[response.name] || response.name || response.toString()}
    });
  }

  render() {
    const {board} = this.props;
    const {pending, error} = this.state;

    return (
      <div className={classNames({
        'boards-switcher-item': true,
        'boards-switcher-item_syncing': board.active,
        'boards-switcher-item_pending': pending,
        'boards-switcher-item_error': !!error
      })} >
        <div className="boards-switcher-item__container" onClick={this.toggle}>
          <div className="boards-switcher-item__checkbox">
            <SyncCheckbox pending={pending} active={board.active} size="xxl" />
          </div>
          <div className="boards-switcher-item__body">
            <div className="boards-switcher-item__name">
              {board.name}
            </div>
          </div>
          {error && error.message &&
            <div className="boards-switcher-item__error">{error.message}</div>
          }
        </div>
      </div>
    );
  }
}
