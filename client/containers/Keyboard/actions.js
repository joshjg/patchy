import { ADD_TOUCH, UPDATE_TOUCH, REMOVE_TOUCH } from './constants';

export const addTouch = (touchId, targetId) => ({
  type: ADD_TOUCH,
  touchId,
  targetId,
});

export const updateTouch = (touchId, targetId) => ({
  type: UPDATE_TOUCH,
  touchId,
  targetId,
});

export const removeTouch = touchId => ({
  type: REMOVE_TOUCH,
  touchId,
});
