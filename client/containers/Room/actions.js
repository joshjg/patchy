import {
  SET_USER_ID,
  UPDATE_USERS,
  RECEIVE_PATCH,
  SHOW_HELP,
  HIDE_HELP,
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

export const showHelp = () => ({
  type: SHOW_HELP,
});

export const hideHelp = () => ({
  type: HIDE_HELP,
});
