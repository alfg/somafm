export const TRACK_URL = 'TRACK_URL';
export const PLAYLIST = 'PLAYLIST';
export const METADATA = 'METADATA';

export function setTrackUrl(track, playing) {
  return {
    type: TRACK_URL,
    track,
    playing
  };
}

export function setMetadata(metadata) {
  return {
    type: METADATA,
    metadata
  };
}
