import {
  SET_USER_ID,
  UPDATE_USERS,
  RECEIVE_PATCH,
  SHOW_KEYBOARD,
  HIDE_KEYBOARD,
  SHOW_HELP,
  HIDE_HELP,
  SHOW_USERS,
  HIDE_USERS,
} from './constants';
import { ADD_SOUND, REMOVE_SOUND } from '../Synth/constants';

export const setUserId = id => ({
  type: SET_USER_ID,
  id,
});

export const updateUsers = users => ({
  type: UPDATE_USERS,
  users,
});

export const receivePatch = (from, patch) => ({
  type: RECEIVE_PATCH,
  from,
  patch,
});

export const stopIfMuted = (action, mutedUsers) => {
  if ((action.type === ADD_SOUND || action.type === REMOVE_SOUND)
    && mutedUsers.indexOf(action.userId) !== -1) {
    return { type: '' };
  }
  return action;
};

export const showKeyboard = () => ({
  type: SHOW_KEYBOARD,
});

export const hideKeyboard = () => ({
  type: HIDE_KEYBOARD,
});

export const showHelp = () => ({
  type: SHOW_HELP,
});

export const hideHelp = () => ({
  type: HIDE_HELP,
});

export const showUsers = () => ({
  type: SHOW_USERS,
});

export const hideUsers = () => ({
  type: HIDE_USERS,
});
