import { CHANNELS, FAVORITES } from '../actions/channels';

const initialState = {
  home: [],
  favorites: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CHANNELS:
      return Object.assign({}, state, {
        home: action.home
      });

    case FAVORITES:
      return Object.assign({}, state, {
        favorites: action.favorites
      });

    default:
      return state;
  }
}
