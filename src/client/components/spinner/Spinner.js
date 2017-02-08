import './spinner.styl';

import React, {PropTypes} from 'react';
import classNames from 'classnames';

const Spinner = ({size, className}) => {
  const spinnerClassName = classNames({
    spinner: true,
    [`spinner_size_${size}`]: !!size,
  }, className);

  return (
    <span className={spinnerClassName}>
      <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
        <circle fill="none" strokeWidth="3" strokeLinecap="round" cx="15" cy="15" r="12"/>
      </svg>
    </span>
  );
};

Spinner.propTypes = {
  size: PropTypes.string
};

export default Spinner;
