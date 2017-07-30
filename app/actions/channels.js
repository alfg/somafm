export const CHANNELS = 'CHANNELS';
export const FAVORITES = 'FAVORITES';

export function setHomeChannels(channel) {
  console.log('action:setHomeChannels');
  return {
    type: CHANNELS,
    home: channel
  };
}

export function setFavorites(favorites) {
  return {
    type: FAVORITES,
    favorites: favorites
  }
}
