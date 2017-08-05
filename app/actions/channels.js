export const CHANNELS = 'CHANNELS';
export const FAVORITES = 'FAVORITES';

export function setHomeChannels(channel) {
  return {
    type: CHANNELS,
    home: channel
  };
}

export function setFavorites(favorites) {
  return {
    type: FAVORITES,
    favorites
  };
}
