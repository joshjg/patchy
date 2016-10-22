import { SET_USER_ID, UPDATE_USERS, RECEIVE_PATCH } from '../containers/Room/constants';
import { MUTE_USER, UNMUTE_USER } from '../containers/User/constants';
import { ADD_TOUCH, UPDATE_TOUCH, REMOVE_TOUCH } from '../containers/Keyboard/constants';

export default socket => store => next => (action) => {
  switch (action.type) {
    case SET_USER_ID:
    case UPDATE_USERS:
    case RECEIVE_PATCH:
    case MUTE_USER:
    case UNMUTE_USER:
    case ADD_TOUCH:
    case UPDATE_TOUCH:
    case REMOVE_TOUCH:
      break;
      // TODO: reverse this behavior
    default: {
      const state = store.getState();
      if (state.root.id === action.userId && state.root.users.indexOf(state.root.id) < 4) {
        socket.emit('actionOut', action);
      }
    }
  }
  return next(action);
};
