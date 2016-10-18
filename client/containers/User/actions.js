import { MUTE_USER, UNMUTE_USER } from './constants';

export const toggleMuteUser = (id, muted) => (
  muted ? {
    type: UNMUTE_USER,
    id,
  } : {
    type: MUTE_USER,
    id,
  }
);
