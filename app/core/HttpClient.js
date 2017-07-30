import request from 'superagent';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

function getUrl(path) {
  if (path.startsWith('http') || canUseDOM) {
    return path;
  }

  return process.env.WEBSITE_HOSTNAME ?
    `http://${process.env.WEBSITE_HOSTNAME}${path}` :
    `http://127.0.0.1:${global.server.get('port')}${path}`;
}

const HttpClient = {

  get: path => new Promise((resolve, reject) => {
    request
      .get(getUrl(path))
      .accept('application/json')
      .end((err, res) => {
        if (err) {
          if (err.status === 404) {
            resolve(null);
          } else {
            reject(err);
          }
        } else {
          resolve(res.body);
        }
      });
  }),

  post: (path, params) => new Promise((resolve, reject) => {
    request
      .post(path)
      .type('form')
      .send(params)
      .end((err, res) => {
        if (err) {
          if (err.status === 404) {
            resolve(null);
          } else if (err.status === 400) {
            resolve(err.response.body);
          } else {
            reject(err);
          }
        } else {
          resolve(res.body);
        }
      });
  }),

  getRedirectUrl: path => new Promise((resolve, reject) => {
    request
      .get(getUrl(path))
      .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Movieclips/0.7.1 Chrome/47.0.2526.73 Electron/0.36.3 Safari/537.36')
      .end((err, res) => {
        if (err) {
          if (err.status === 404) {
            resolve(null);
          } else {
            reject(err);
          }
        } else {
          resolve(res.redirects[0]);
        }
      });
  }),

};

export default HttpClient;
