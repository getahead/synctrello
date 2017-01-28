import './icons.styl';
import './icon.styl';

import React, {PropTypes} from 'react';
import classNames from 'classnames';

const Icon = ({name, size, className}) => {
  const iconClassName = classNames({
    icon: true,
    [`icon_${name}`]: !!name,
    [`icon_size_${size}`]: !!size
  }, className);

  return (
    <i className={iconClassName}></i>
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string
};

export default Icon;