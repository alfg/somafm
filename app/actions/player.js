export const TRACK_URL = 'TRACK_URL';
export const PLAYLIST = 'PLAYLIST';
export const METADATA = 'METADATA';

export function setTrackUrl(track, playing) {
  console.log('action:setTrackUrl', track);
  return {
    type: TRACK_URL,
    track,
    playing
  };
}

export function setMetadata(metadata) {
  console.log('action:setMetadata', metadata);
  return {
    type: METADATA,
    metadata
  };
}
