import React, { Component, PropTypes } from 'react';
import styles from './Track.module.css';


export default class Track extends Component {
  static propTypes = {
    track: PropTypes.shape({}),
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { date, artist, title, album } = this.props;

    return (
      <div className={styles.track}>
        <div className={styles.date}>{toDatetime(date)}</div>
        <div className={styles.artist}>{artist}</div>
        <div className={styles.title}>{title}</div>
        <div className={styles.album}>{album}</div>
      </div>
    );
  }
}

function toDatetime(ts) {
  var date = new Date(ts * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  return formattedTime;
}
