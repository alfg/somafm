import { CHANNELS } from '../actions/channels';

const initialState = {
  home: [],
};

export default function track(state = initialState, action) {
  switch (action.type) {
    case CHANNELS:
      return Object.assign({}, state, {
        home: action.home
      });

    default:
      return state;
  }
}
