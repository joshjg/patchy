import React from 'react';
import cssModule from 'react-css-modules';
import styles from './UsersButton.css';
import usersIcon from '../../assets/users.svg';

const UsersButton = ({ onClick }) => (
  <div styleName="root" onClick={onClick}>
    <img src={usersIcon} styleName="icon" alt="user list" />
  </div>
);

UsersButton.propTypes = {
  onClick: React.PropTypes.func,
};

export default cssModule(UsersButton, styles);
