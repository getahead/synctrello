import './sync-checkbox.styl';

import React from 'react';
import classNames from 'classnames';
import Icon from '../icon/Icon';
import Spinner from '../spinner/Spinner';

const SyncCheckbox = ({active, pending, size = 'm'}) =>
  <div className={classNames({
    'sync-checkbox': true,
    [`sync-checkbox_size_${size}`]: size,
    'sync-checkbox_active': active,
    'sync-checkbox_pending': pending
  })}>
    <Spinner size="xxl"/>
    <Icon name="check" size="m"/>
  </div>;


SyncCheckbox.propTypes = {
  active: React.PropTypes.bool,
  pending: React.PropTypes.bool,
  size: React.PropTypes.string
};

export default SyncCheckbox;
