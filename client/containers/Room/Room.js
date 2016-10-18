import React from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';

import Synth from '../Synth';
import Patch from '../Patch';
import UserList from '../../components/UserList';
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
  showHelp,
  hideHelp,
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
    showHelp: React.PropTypes.func,
    hideHelp: React.PropTypes.func,
    helpVisible: React.PropTypes.bool,
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
      <UserList users={this.props.users} />
      {this.props.helpVisible ?
        <Modal onClickRemove={this.props.hideHelp}>
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
  helpVisible: state.root.helpVisible,
});

const mapDispatchToProps = dispatch => ({
  setUserId: id => dispatch(setUserId(id)),
  updateUsers: users => dispatch(updateUsers(users)),
  receiveAction: (action, mutedUsers) => dispatch(stopIfMuted(action, mutedUsers)),
  receivePatch: ({ from, patch }) => dispatch(receivePatch(from, patch)),
  showHelp: () => dispatch(showHelp()),
  hideHelp: () => dispatch(hideHelp()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
