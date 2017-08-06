import React, { Component, PropTypes } from 'react';
import ReactPlayer from 'react-player';
import storage from '../../core/Storage';
import styles from './AudioPlayer.module.css';


export default class AudioPlayer extends Component {

  static propTypes = {
    player: PropTypes.shape({
      track: PropTypes.string,
      playlist: PropTypes.array,
      playing: PropTypes.bool.isRequired,
      metadata: PropTypes.shape({})
    }).isRequired,
    setTrackUrl: PropTypes.func.isRequired,
    track: PropTypes.string,
  };

  static defaultProps = {
    track: null
  };

  constructor(props) {
    super(props);
    this.playPause = this.playPause.bind(this);
    this.playNext = this.playNext.bind(this);
    this.playPrev = this.playPrev.bind(this);
    this.mute = this.mute.bind(this);
    this.setVolume = this.setVolume.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onEnded = this.onEnded.bind(this);
    this.onSeekMouseDown = this.onSeekMouseDown.bind(this);
    this.onSeekMouseUp = this.onSeekMouseUp.bind(this);
    this.onSeekChange = this.onSeekChange.bind(this);

    this.audioEl = null;

    this.state = {
      playing: false,
      volume: 0.8,
      duration: 0,
      played: 0,
      loaded: 0,
      mutedVol: 0
    };
    this.storage = storage;
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyPress, false);

    this.loadVolume((volume) => {
      if (volume === null) return;
      this.setState({ volume });
    });
  }

  onProgress = state => {
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state);
    }
  };

  onEnded = () => {
    this.setState({ playing: true });
    this.playNext();
  };

  onKeyPress = (e) => {
    switch (e.keyCode) {
      case 32:
        this.playPause();
        e.preventDefault();
        break;
      case 37:
        this.playPrev();
        e.preventDefault();
        break;
      case 39:
        this.playNext();
        e.preventDefault();
        break;
      default:
        // e.preventDefault();  // Prevent scroll when pressing spacebar.
    }
  };

  onSeekMouseDown = () => {
    this.setState({ seeking: true });
  };

  onSeekChange = (e) => {
    this.setState({ played: parseFloat(e.target.value) });
  };

  onSeekMouseUp = (e) => {
    this.setState({ seeking: false });
    this.playerRef.seekTo(parseFloat(e.target.value));
  };


  setVolume = (e) => {
    this.setState({ volume: parseFloat(e.target.value) });
    this.saveVolume(parseFloat(e.target.value));
  };

  playPause = () => {
    const playing = !this.state.playing;
    this.setState({ playing });
    this.props.setTrackUrl(this.props.player.track, playing);
  };

  playNext() {
    let nextTrack = this.props.player.track + 1;
    nextTrack = nextTrack >= this.props.player.playlist.length ? 0 : nextTrack;
    this.props.setTrackUrl(nextTrack, this.state.playing);
  }

  playPrev() {
    let prevTrack = this.props.player.track - 1;
    prevTrack = prevTrack < 0 ? 0 : prevTrack;
    this.props.setTrackUrl(prevTrack, this.state.playing);
  }

  mute() {
    if (this.state.volume === 0) {
      this.setState({ volume: this.state.mutedVol });
      this.saveVolume(parseFloat(this.state.mutedVol));
    } else {
      this.setState({ mutedVol: this.state.volume, volume: 0 });
      this.saveVolume(parseFloat(0));
    }
  }

  saveVolume = (volume, callback) => {
    this.storage.setItem('volume', volume, (val) => {
      if (callback !== null && callback === Function) {
        callback(val);
      }
    });
  }

  loadVolume(callback) {
    this.storage.getItem('volume', (err, val) => {
      callback(val);
    });
  }

  render() {
    const { track, playing, metadata } = this.props.player;
    const { volume } = this.state;

    return (
      <div className={styles.container} onKeyPress={this.onKeyPress} role="presentation">
        <div className={styles.player}>
          <ReactPlayer
            ref={(c) => { this.playerRef = c; }}
            url={track}
            playing={playing}
            volume={volume}
            height="100%"
            width="100%"
            onPlay={() => this.setState({ playing: true })}
            onPause={() => this.setState({ playing: false })}
            onBuffer={() => console.log('onBuffer')}
            onEnded={this.onEnded}
            onError={(e) => console.log('onError', e)}
            onProgress={this.onProgress}
            onDuration={(duration) => this.setState({ duration })}
          />
          {/* <video
            ref={(input) => { this.audioEl = input; }}
            src={track}
            volume={volume}
            height="100%"
            width="100%"
            autoPlay /> */}
        </div>
        <div className={styles.context}>
          <span>{metadata && metadata.data.title}</span>
        </div>
        <div className={styles.controlsContainer}>
          <div className={styles.controls}>
            {/* <button className={styles.back} onClick={this.playPrev}>
              <i className="fa fa-step-backward"></i>
            </button> */}
            <button className={styles.play} onClick={this.playPause}>
              <i className={this.state.playing ? 'fa fa-pause-circle-o' : 'fa fa-play-circle-o'} />
            </button>
            {/* <button className={styles.forward} onClick={this.playNext}>
              <i className="fa fa-step-forward"></i>
            </button> */}
          </div>
        </div>

        <div className={styles.volume}>
          <table><tbody>
            <tr>
              <td>
                <button className={styles.mute} onClick={this.mute}>
                  <i className={this.state.volume === 0 ? 'fa fa-volume-off' : 'fa fa-volume-up'} />
                </button>
              </td>
              <td>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step="any"
                  value={this.state.volume}
                  onChange={this.setVolume}
                />
              </td>
            </tr>
          </tbody></table>
        </div>
      </div>
    );
  }
}
