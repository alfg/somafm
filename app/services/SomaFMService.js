// import TorrentClient from '../core/TorrentClient';
import _ from 'lodash';
import config from '../config.json';
import storage from '../core/Storage';
import axios from 'axios';


export default class SomaFMService {

  constructor() {
    this.baseUrl = 'http://api.somafm.com';
    this.iceUrl = 'http://ice.somafm.com';
  }

  getAllChannels(cb) {
    const url = this.baseUrl + '/channels.json';

    axios.get(url)
    .then((resp) => {
      const channels = resp.data.channels;
      cb(null, channels);
    }).catch((err) => {
      cb(err);
    });
  }

  getChannel(id, cb) {
    const url = this.baseUrl + '/channels.json';

    axios.get(url)
    .then((resp) => {
      const channel = _.find(resp.data.channels, {id})
      cb(null, channel);
    }).catch((err) => {
      cb(err);;
    });
  }

  getStationUrl(id) {
    const url = this.iceUrl + '/' + id;
    return url;
  }

  loadSavedChannels(cb) {
    storage.getItem('channels', (channels) => {
      cb(channels);
    });
  }

  saveChannel(channel, cb) {
    storage.getItem('channels', (channels) => {
      channels = channels ? channels : [];
      channels.push(channel);
      storage.setItem('channels', channels, (val) => {
        cb(val);
      });
    });
  }

  removeChannel(id, cb) {
    storage.getItem('channels', (channels) => {
      const newChannels = _.reject(channels, { id });
      storage.setItem('channels', newChannels, (val) => {
        cb(val);
      });
    });
  }

  channelExists(id, cb) {
    storage.getItem('channels', (channels) => {
      return cb(_.some(channels, { id }));
    });
  }
}
