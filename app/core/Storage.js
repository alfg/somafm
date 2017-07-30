import localforage from 'localforage';
import _ from 'lodash';

localforage.config({
  name: 'somafm',
  driver: localforage.LOCALSTORAGE,
  size: 4980736  // Default.
});

const storage = {

  getItem(key, cb) {
    localforage.getItem(key).then((val) =>
      cb(val)
    )
    .catch((err) => {
      cb(err);
    });
  },

  setItem(key, value, cb) {
    localforage.setItem(key, value).then((val) =>
      cb(val)
    )
    .catch((err) =>
      cb(err)
    );
  },

  exists(key, cb) {
    localforage.keys().then((keys) => {
      if (_.includes(keys, key)) {
        return cb(true);
      }
      return cb(false);
    })
    .catch((err) => {
      console.log(err);
      cb(false);
    });
  },

  // addItem(key, value, cb) {

  // }
};

export default storage;
