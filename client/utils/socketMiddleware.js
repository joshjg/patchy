import { SET_USER_ID, UPDATE_USERS, RECEIVE_PATCH } from '../containers/Room/constants';
import { MUTE_USER, UNMUTE_USER } from '../containers/User/constants';

const middleware = socket => store => next => (action) => {
  switch (action.type) {
    case SET_USER_ID:
    case UPDATE_USERS:
    case RECEIVE_PATCH:
    case MUTE_USER:
    case UNMUTE_USER:
      break;
    default: {
      const state = store.getState();
      if (state.root.id === action.userId && state.root.users.indexOf(state.root.id) < 4) {
        socket.emit('actionOut', action);
      }
    }
  }
  return next(action);
};

export default middleware;
