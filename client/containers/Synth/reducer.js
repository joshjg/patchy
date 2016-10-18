import { ADD_SOUND, REMOVE_SOUND } from './constants';
import { MUTE_USER } from '../User/constants';

const keymap = {
  65: 261.63,
  87: 277.18,
  83: 293.66,
  69: 311.13,
  68: 329.63,
  70: 349.23,
  84: 369.99,
  71: 392.00,
  89: 415.30,
  72: 440.00,
  85: 466.16,
  74: 493.88,
  75: 523.25,
  79: 554.37,
  76: 587.33,
  80: 622.25,
  186: 659.25,
  222: 698.46,
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_SOUND:
      if (state.findIndex(el => (keymap[action.key] === el.frequency && action.userId === el.userId)) === -1) {
        return keymap[action.key] ? [
          ...state,
          {
            userId: action.userId,
            frequency: keymap[action.key],
            key: state.length ? state[state.length - 1].key + 1 : 0,
          },
        ] : state;
      }
      return state;
    case REMOVE_SOUND: {
      const index = state.findIndex(el => keymap[action.key] === el.frequency && el.userId === action.userId);
      return index === -1 ? state : [
        ...state.slice(0, index),
        ...state.slice(index + 1),
      ];
    }
    case MUTE_USER:
      return state.filter(el => el.userId !== action.id);
    default:
      return state;
  }
};

export default reducer;
