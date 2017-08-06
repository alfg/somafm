import _ from 'lodash';
import axios from 'axios';
import storage from '../core/Storage';


export default class SomaFMService {

  constructor() {
    this.baseUrl = 'http://api.somafm.com';
    this.iceUrl = 'http://ice.somafm.com';
  }

  getAllChannels(cb) {
    const url = `${this.baseUrl}/channels.json`;

    axios.get(url)
    .then((resp) => {
      const channels = resp.data.channels;
      return cb(null, channels);
    }).catch((err) => {
      cb(err);
    });
  }

  getChannel(id, cb) {
    const url = `${this.baseUrl}/channels.json`;

    axios.get(url)
    .then((resp) => {
      const channel = _.find(resp.data.channels, { id });
      return cb(null, channel);
    }).catch((err) => {
      cb(err);
    });
  }

  getSongsList(id, cb) {
    const url = `${this.baseUrl}/songs/${id}.json`;

    axios.get(url)
    .then((resp) => {
      const songs = _.orderBy(resp.data.songs, 'date', 'desc');
      return cb(null, songs);
    }).catch((err) => {
      cb(err);
    });
  }

  getStationUrl(id) {
    const url = `${this.iceUrl}/${id}`;
    return url;
  }

  static loadSavedChannels(cb) {
    storage.getItem('channels', (err, channels) => {
      if (err) return cb([]);

      return cb(channels);
    });
  }

  static saveChannel(channel, cb) {
    storage.getItem('channels', (err, data) => {
      if (err) return cb([]);

      const channels = data || [];
      channels.push(channel);
      storage.setItem('channels', channels, (err2, val) => {
        if (err2) return cb([]);
        return cb(val);
      });
    });
  }

  static removeChannel(id, cb) {
    storage.getItem('channels', (channels) => {
      const newChannels = _.reject(channels, { id });
      storage.setItem('channels', newChannels, (val) => {
        cb(val);
      });
    });
  }

  static channelExists(id, cb) {
    storage.getItem('channels', (channels) => cb(_.some(channels, { id })));
  }
}
