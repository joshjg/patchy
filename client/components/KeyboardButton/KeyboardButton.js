import React from 'react';
import cssModule from 'react-css-modules';
import styles from './KeyboardButton.css';
import keyboardIcon from '../../assets/keyboard.svg';
import keyboardOffIcon from '../../assets/keyboard_off.svg';

const KeyboardButton = ({ onClick, disable }) => (
  <div styleName={disable ? 'higher' : 'root'} onClick={onClick}>
    <img
      src={disable ? keyboardOffIcon : keyboardIcon}
      styleName="icon"
      alt="touch keyboard"
    />
  </div>
);

KeyboardButton.propTypes = {
  onClick: React.PropTypes.func,
  disable: React.PropTypes.bool,
};

KeyboardButton.defaultProps = {
  disable: false,
};

export default cssModule(KeyboardButton, styles);
