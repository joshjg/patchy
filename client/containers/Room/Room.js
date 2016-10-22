/* eslint-disable react/jsx-indent */

import React from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';

import Synth from '../Synth';
import Patch from '../Patch';
import Keyboard from '../Keyboard';
import KeyboardButton from '../../components/KeyboardButton';
import UserList from '../../components/UserList';
import UsersButton from '../../components/UsersButton';
import Logo from '../../components/Logo';
import Modal from '../../components/Modal';
import HelpButton from '../../components/HelpButton';
import helpMarkdown from '../../assets/help.md';
import keymapImage from '../../assets/keymap.png';

import {
  setUserId,
  updateUsers,
  receivePatch,
  stopIfMuted,
  showKeyboard,
  hideKeyboard,
  showHelp,
  hideHelp,
  showUsers,
  hideUsers,
} from './actions';

class Home extends React.Component {
  static propTypes = {
    socket: React.PropTypes.object,
    params: React.PropTypes.object,
    users: React.PropTypes.arrayOf(React.PropTypes.string),
    mutedUsers: React.PropTypes.arrayOf(React.PropTypes.string),
    userId: React.PropTypes.string,
    setUserId: React.PropTypes.func,
    updateUsers: React.PropTypes.func,
    receiveAction: React.PropTypes.func,
    receivePatch: React.PropTypes.func,
    localPatch: React.PropTypes.object,
    showKeyboard: React.PropTypes.func,
    hideKeyboard: React.PropTypes.func,
    keyboardVisible: React.PropTypes.bool,
    showHelp: React.PropTypes.func,
    hideHelp: React.PropTypes.func,
    helpVisible: React.PropTypes.bool,
    showUsers: React.PropTypes.func,
    hideUsers: React.PropTypes.func,
    usersVisible: React.PropTypes.bool,
  };

  componentDidMount = () => {
    this.socket = this.props.socket;
    this.socket.emit('room', this.props.params.id);
    this.socket.on('userId', this.props.setUserId);
    this.socket.on('updateUsers', this.props.updateUsers);
    this.socket.on('action', action => this.props.receiveAction(action, this.props.mutedUsers));
    this.socket.on('requestPatch', requester => this.socket.emit('sendPatch', { to: requester, from: this.props.userId, patch: this.props.localPatch }));
    this.socket.on('patch', (this.props.receivePatch));
  }

  render = () => (
    <div>
      <Logo />
      <Patch />
      <Synth />
      {this.props.keyboardVisible
        ? <div>
            <Keyboard />
            <KeyboardButton disable onClick={this.props.hideKeyboard} />
          </div>
        : <KeyboardButton onClick={this.props.showKeyboard} />
      }
      {this.props.keyboardVisible
        ? <div style={{ height: '34vh' }} />
        : <div style={{ height: '100px' }} />
      }
      {this.props.usersVisible
        ? <UserList users={this.props.users} onClickRemove={this.props.hideUsers} />
        : <UsersButton onClick={this.props.showUsers} />
      }
      {this.props.helpVisible
        ? <Modal onClickRemove={this.props.hideHelp}>
            <ReactMarkdown
              skipHtml
              source={helpMarkdown}
              transformImageUri={() => keymapImage}
            />
          </Modal>
        : <HelpButton onClick={this.props.showHelp} />
      }
    </div>
  );
}

const mapStateToProps = state => ({
  users: state.root.users,
  mutedUsers: state.root.mutedUsers,
  userId: state.root.id,
  localPatch: state.patch.local,
  keyboardVisible: state.root.keyboardVisible,
  helpVisible: state.root.helpVisible,
  usersVisible: state.root.usersVisible,
});

const mapDispatchToProps = dispatch => ({
  setUserId: id => dispatch(setUserId(id)),
  updateUsers: users => dispatch(updateUsers(users)),
  receiveAction: (action, mutedUsers) => dispatch(stopIfMuted(action, mutedUsers)),
  receivePatch: ({ from, patch }) => dispatch(receivePatch(from, patch)),
  showKeyboard: () => dispatch(showKeyboard()),
  hideKeyboard: () => dispatch(hideKeyboard()),
  showHelp: () => dispatch(showHelp()),
  hideHelp: () => dispatch(hideHelp()),
  showUsers: () => dispatch(showUsers()),
  hideUsers: () => dispatch(hideUsers()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
