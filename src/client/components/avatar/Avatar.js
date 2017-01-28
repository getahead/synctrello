import './avatar.styl';

import React from 'react';
import classNames from 'classnames';

const Avatar = ({user = {}, className, size = 'm', ...rest}) =>
  <div
    className={classNames({
      avatar: true,
      [`avatar_size_${size}`]: size
    }, className)}
    {...rest}
  >
    {!!user.avatar_url && <img className="avatar__image" src={user.avatar_url} alt="avatar" />}
  </div>;

Avatar.propTypes = {
  user: React.PropTypes.object,
  size: React.PropTypes.string,
  className: React.PropTypes.string
};

export default Avatar;
