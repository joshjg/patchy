import React from 'react';
import cssModule from 'react-css-modules';
import styles from './HelpButton.css';

const HelpButton = ({ onClick }) => (
  <div styleName="root" onClick={onClick}>
    ?
  </div>
);

HelpButton.propTypes = {
  onClick: React.PropTypes.func,
};

export default cssModule(HelpButton, styles);
