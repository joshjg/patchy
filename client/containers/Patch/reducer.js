import {
  ADD_OSCILLATOR,
  REMOVE_OSCILLATOR,
  SET_OSCPARAM,
  ADD_EFFECT,
  REMOVE_EFFECT,
  SET_EFFECTPARAM,
} from './constants';
import {
  UPDATE_USERS,
  RECEIVE_PATCH,
} from '../Room/constants';
import makeDistortionCurve from '../../utils/makeDistortionCurve';

let prevKey = 0;

const defaultEffects = {
  filter: {
    effect: 'filter',
    type: 'lowpass',
    frequency: 1000,
    Q: 1,
    detune: 0,
    gain: 1,
  },
  distortion: {
    effect: 'distortion',
    amount: 400,
    curve: makeDistortionCurve(400),
    oversample: '2x',
  },
  convolver: {
    effect: 'convolver',
    normalize: true,
  },
  compressor: {
    effect: 'compressor',
    threshold: -24,
    knee: 30,
    ratio: 12,
    attack: 0.003,
    release: 0.25,
  },
};

const oscillator = (state = {
  key: ++prevKey,
  gain: 1,
  pan: 0,
  octave: 4,
  detune: 0,
  type: 'sine',
  attack: 0.05,
  decay: 0.05,
  sustain: 0.5,
  release: 0.1,
}, action) => {
  switch (action.type) {
    case ADD_OSCILLATOR:
      return state;
    case SET_OSCPARAM:
      return {
        ...state,
        [action.param]: action.value,
      };
    default:
      return state;
  }
};

const effect = (state = {}, action) => {
  switch (action.type) {
    case ADD_EFFECT:
      return {
        ...defaultEffects[action.effect],
        key: ++prevKey,
      };
    case SET_EFFECTPARAM:
      return (action.param !== 'amount') // special case for distortion amount
      ? {
        ...state,
        [action.param]: action.value,
      }
      : {
        ...state,
        [action.param]: action.value,
        curve: makeDistortionCurve(action.value),
      };
    default:
      return state;
  }
};

const patch = (state = {
  oscillators: [oscillator(undefined, { type: '' })],
  effects: [],
}, action) => {
  switch (action.type) {
    case ADD_OSCILLATOR:
      return {
        ...state,
        oscillators: [
          ...state.oscillators,
          {
            ...oscillator(undefined, action),
            attack: state.oscillators[0].attack,
            decay: state.oscillators[0].decay,
            sustain: state.oscillators[0].sustain,
            release: state.oscillators[0].release,
          },
        ],
      };
    case REMOVE_OSCILLATOR:
      return {
        ...state,
        oscillators: [
          ...state.oscillators.slice(0, action.id),
          ...state.oscillators.slice(action.id + 1),
        ],
      };
    case SET_OSCPARAM:
      return action.id !== -1 ? { // specific oscillator specified
        ...state,
        oscillators: state.oscillators.map((osc, i) =>
          (action.id === i ? oscillator(osc, action) : osc)
        ),
      } : { // set param on all oscillators
        ...state,
        oscillators: state.oscillators.map(osc => oscillator(osc, action)),
      };
    case ADD_EFFECT:
      return {
        ...state,
        effects: [
          ...state.effects,
          effect(undefined, action),
        ],
      };
    case REMOVE_EFFECT:
      return {
        ...state,
        effects: [
          ...state.effects.slice(0, action.id),
          ...state.effects.slice(action.id + 1),
        ],
      };
    case SET_EFFECTPARAM:
      return {
        ...state,
        effects: state.effects.map((eff, i) =>
          (action.id === i ? effect(eff, action) : eff)
        ),
      };
    default:
      return state;
  }
};

const reducer = (state = {
  local: {
    oscillators: [oscillator(undefined, { type: '' })],
    effects: [],
  },
}, action) => {
  switch (action.type) {
    case ADD_OSCILLATOR:
    case REMOVE_OSCILLATOR:
    case SET_OSCPARAM:
    case ADD_EFFECT:
    case REMOVE_EFFECT:
    case SET_EFFECTPARAM:
      return {
        ...state,
        [action.userId]: state[action.userId] ? patch(state[action.userId], action) : patch(undefined, action),
      };
    case UPDATE_USERS: {
      const newState = { ...state };
      Object.keys(state).forEach((key) => {
        if (action.users.indexOf(key) < 0 && key !== 'local') {
          delete newState[key];
        }
      });
      action.users.forEach((user) => {
        if (!newState[user]) { // doesnt work for self
          newState[user] = {
            oscillators: [oscillator(undefined, { type: '' })],
            effects: [],
          };
        }
      });
      return newState;
    }
    case RECEIVE_PATCH:
      return {
        ...state,
        [action.from]: action.patch,
      };
    default:
      return state;
  }
};

export default reducer;
