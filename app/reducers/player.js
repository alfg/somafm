import { TRACK_URL, METADATA } from '../actions/player';

// export type playerStateType = {
//   +counter: number
// };

// type actionType = {
//   +type: string
// };

const initialState = {
  track: null,
  playing: false,
  metadata: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TRACK_URL:
      return Object.assign({}, state, {
        track: action.track,
        playing: action.playing,
      });

    case METADATA:
      return Object.assign({}, state, {
        metadata: action.metadata
      });

    default:
      return state;
  }
}
