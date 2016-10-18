import {
  ADD_OSCILLATOR,
  REMOVE_OSCILLATOR,
  SET_OSCPARAM,
  ADD_EFFECT,
  REMOVE_EFFECT,
  SET_EFFECTPARAM,
} from './constants';

export const addOscillator = () => ({
  type: ADD_OSCILLATOR,
});

export const removeOscillator = id => ({
  type: REMOVE_OSCILLATOR,
  id,
});

export const setOscParam = (id, param, value) => ({
  type: SET_OSCPARAM,
  id,
  param,
  value,
});

export const addEffect = effect => ({
  type: ADD_EFFECT,
  effect,
});

export const removeEffect = id => ({
  type: REMOVE_EFFECT,
  id,
});

export const setEffectParam = (id, param, value) => ({
  type: SET_EFFECTPARAM,
  id,
  param,
  value,
});
