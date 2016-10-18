import { ADD_SOUND, REMOVE_SOUND } from './constants';

export const addSound = e => ({
  type: ADD_SOUND,
  key: e.which,
});

export const removeSound = e => ({
  type: REMOVE_SOUND,
  key: e.which,
});
