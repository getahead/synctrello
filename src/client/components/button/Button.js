import './button.styl';
import React from 'react';
import classNames from 'classnames';

import Icon from '../icon/Icon';
import Spinner from '../spinner/Spinner';

const Button = ({
  label,
  icon,
  theme,
  size = 'm',
  pending = false,
  disabled = false,
  fullWidth = false,
  className,
  children,
  ...rest
}) => {
  const buttonClassName = classNames({
    button: true,
    button_pending: pending,
    button_disabled: disabled,
    button_width_full: fullWidth,
    [`button_theme_${theme}`]: !!theme,
    [`button_size_${size}`]: !!size
  }, className);

  return (
    <div className={buttonClassName} {...rest}>
      {children}
      {!!icon && !children && <span className="button__icon">
        <Icon name={icon} />
      </span>}
      {!!label && !children && <span className="button__label">{label}</span>}
      {!!pending && <span className="button__spinner">
        <Spinner />
      </span>}
    </div>
  );
};

Button.propTypes = {
  label: React.PropTypes.string,
  icon: React.PropTypes.string,
  theme: React.PropTypes.string,
  size: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  pending: React.PropTypes.bool,
  className: React.PropTypes.string
};

export default Button;
