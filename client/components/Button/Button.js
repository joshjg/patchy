import React from 'react';
import cssModule from 'react-css-modules';
import styles from './Button.css';

const Button = ({ onClick, children, style }) => (
  <div styleName="root" onClick={onClick} style={style}>
    {children}
  </div>
);

Button.propTypes = {
  onClick: React.PropTypes.func,
  children: React.PropTypes.string,
  style: React.PropTypes.object,
};

export default cssModule(Button, styles);
