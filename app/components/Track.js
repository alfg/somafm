import React, { Component, PropTypes } from 'react';
import styles from './Track.module.css';


export default class Track extends Component {
  static propTypes = {
    date: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    album: PropTypes.string.isRequired,
  };

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
  const date = new Date(ts * 1000);
  const hours = date.getHours();
  const minutes = `0${date.getMinutes()}`;
  const seconds = `0${date.getSeconds()}`;
  const formattedTime = `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
  return formattedTime;
}
