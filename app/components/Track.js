import React, { Component, PropTypes } from 'react';
import styles from './Track.module.css';


export default class Track extends Component {
  static propTypes = {
    track: PropTypes.shape({}),
    setTrackUrl: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool,
    getFileProgress: PropTypes.func,
    downloadTrack: PropTypes.func,
    trackId: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      progress: 0
    };

    this.timer = null;
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      if (this.state.progress === 100) clearInterval(this.timer);
      this.props.getFileProgress(this.props.track, (progress) => {
        this.setState({ progress });
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = false;
  }

  handleClick() {
    if (this.state.progress !== 100 && !this.props.isPlaying) {
      this.props.downloadTrack(this.props.track);
      const retry = setInterval(() => {
        if (this.state.progress > 10) {
          this.props.setTrackUrl(this.props.trackId, !this.props.isPlaying);
          clearInterval(retry);
        }
      }, 1000);
    } else {
      this.props.setTrackUrl(this.props.trackId, !this.props.isPlaying);
    }
  }

  render() {
    const { track, isPlaying } = this.props;
    const { progress } = this.state;
    return (
      <div className={styles.track}>
        <div className={styles.play} onClick={this.handleClick}>
          <i className={isPlaying ? 'fa fa-pause-circle' : 'fa fa-play-circle'} />
        </div>
        <div className={isPlaying ? `${styles.title} ${styles.playing}` : styles.title}>{track.name}</div>
        <div className={progress === 100 ? `${styles.trackProgress} ${styles.green}` : styles.trackProgress}>{this.state.progress}%</div>
        <div className={styles.trackLength}>0:00</div>
      </div>
    );
  }
}
