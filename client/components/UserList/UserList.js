import React from 'react';
import cssModule from 'react-css-modules';
import styles from './UserList.css';
import User from '../../containers/User';

const UserList = ({ users, onClickRemove }) => (
  <div styleName="root">
    <div styleName="close" onClick={onClickRemove}>&times;</div>
    <div styleName="header">Connected users</div>
    <div styleName="list">
      {users.map((u, i) => <User key={i} id={u} styleName="user" />)}
    </div>
  </div>
);

UserList.propTypes = {
  users: React.PropTypes.arrayOf(React.PropTypes.string),
  onClickRemove: React.PropTypes.func,
};

export default cssModule(UserList, styles);
