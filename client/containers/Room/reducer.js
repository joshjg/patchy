import { UPDATE_USERS, SET_USER_ID, SHOW_HELP, HIDE_HELP } from './constants';
import { MUTE_USER, UNMUTE_USER } from '../User/constants';

const room = (state = { users: [], mutedUsers: [], helpVisible: false }, action) => {
  switch (action.type) {
    case UPDATE_USERS:
      return {
        ...state,
        users: action.users,
      };
    case SET_USER_ID:
      return {
        ...state,
        id: action.id,
      };
    case MUTE_USER:
      return {
        ...state,
        mutedUsers: [
          ...state.mutedUsers,
          action.id,
        ],
      };
    case UNMUTE_USER: {
      const index = state.mutedUsers.indexOf(action.id);
      return {
        ...state,
        mutedUsers: index === -1 ? state.mutedUsers : [
          ...state.mutedUsers.slice(0, index),
          ...state.mutedUsers.slice(index + 1),
        ],
      };
    }
    case SHOW_HELP:
      return {
        ...state,
        helpVisible: true,
      };
    case HIDE_HELP:
      return {
        ...state,
        helpVisible: false,
      };
    default:
      return state;
  }
};

export default room;
