import { ADD_SOUND, REMOVE_SOUND } from './constants';

export const addSound = key => ({
  type: ADD_SOUND,
  key,
});

export const removeSound = key => ({
  type: REMOVE_SOUND,
  key,
});
