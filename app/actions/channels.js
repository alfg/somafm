export const CHANNELS = 'CHANNELS';

export function setHomeChannels(channel) {
  console.log('action:setHomeChannels');
  return {
    type: CHANNELS,
    home: channel
  };
}
