import {
  UPDATE_USERS,
  SET_USER_ID,
  SHOW_KEYBOARD,
  HIDE_KEYBOARD,
  SHOW_HELP,
  HIDE_HELP,
  SHOW_USERS,
  HIDE_USERS,
} from './constants';
import { MUTE_USER, UNMUTE_USER } from '../User/constants';

const room = (state = {
  users: [],
  mutedUsers: [],
  keyboardVisible: false,
  helpVisible: false,
  usersVisible: false,
}, action) => {
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
    case SHOW_KEYBOARD:
      return {
        ...state,
        keyboardVisible: true,
      };
    case HIDE_KEYBOARD:
      return {
        ...state,
        keyboardVisible: false,
      };
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
    case SHOW_USERS:
      return {
        ...state,
        usersVisible: true,
      };
    case HIDE_USERS:
      return {
        ...state,
        usersVisible: false,
      };
    default:
      return state;
  }
};

export default room;
