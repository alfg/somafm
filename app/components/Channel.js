import React, { Component, PropTypes } from 'react';
import Nav from './common/Nav';
import SideNav from './common/SideNav';
import styles from './Channel.module.css';
import Track from './Track';
import SomaFMService from '../services/SomaFMService';

export default class Channel extends Component {

  static propTypes = {
    location: PropTypes.shape({
      query: PropTypes.shape({
        magnetUri: PropTypes.string
      })
    }),
    player: PropTypes.shape({}),
    setMetadata: PropTypes.func,
    setTrackUrl: PropTypes.func
  };

  constructor(props) {
    super(props);

    const query = new URLSearchParams(this.props.location.search);

    this.channelId = query.get('id');
    this.soma = new SomaFMService();

    this.state = {
      channelData: null,
      metadata: null,
      songs: [],
      channelSaved: false
    };
  }

  componentDidMount() {
    this.soma.getChannel(this.channelId, (err, data) => {
      this.setState({ channelData: data });
      this.props.setMetadata({ data: data });
    });

    this.soma.getSongsList(this.channelId, (err, data) => {
      this.setState({ songs: data });
    });

    const stationUrl = this.soma.getStationUrl(this.channelId);
    this.props.setTrackUrl(stationUrl, true);

    this.soma.channelExists(this.channelId, (state) => {
      this.setState({ channelSaved: state });
    });

    this.loadFavorites();;
  }

  loadFavorites() {
    this.soma.loadSavedChannels((data) => {
      this.props.setFavorites(data);
    });
  }

  handlePlayPause = () => {
    this.props.setTrackUrl(this.props.player.track, !this.props.player.playing);
  }

  handleSaveChannel = () => {
    if (this.state.channelSaved) {
      this.soma.removeChannel(this.channelId, (val) => {
        this.setState({ channelSaved: false });
        this.loadFavorites();
      });
    } else {
      const channel = {
        id: this.channelId,
        title: this.state.channelData.title
      };

      this.soma.saveChannel(channel, (val) => {
        this.setState({ channelSaved: true });
        this.loadFavorites();
      });
    }
  }

  render() {
    const channelData = this.state.channelData;
    const stationUrl = this.soma.getStationUrl(this.channelId);

    const songNodes = this.state.songs && this.state.songs.map((v, i) => {
      return (<Track
        key={i}
        title={v.title}
        artist={v.artist}
        album={v.album}
        date={v.date}
       />);
    });

    return (
      <div className={styles.channel}>
        <SideNav
          favorites={this.props.channels.favorites}
         />
        <div className={styles.container}>
          {/* <Nav
            swarm={swarm}
            download={downloadSpeed}
            upload={uploadSpeed}
          /> */}
          <Nav />

          <div className={styles.cover}>
            <img src={channelData && channelData.largeimage} alt={channelData && channelData.title} />
            <h2>{channelData && channelData.title || 'Loading channel...'}</h2>
            <h4>{channelData && channelData.description}</h4>
            <h5>DJ: {channelData && channelData.dj}</h5>
            <h4>Now Playing: {channelData && channelData.lastPlaying}</h4>

            <div className={styles.buttons}>
              <button className={styles.button} onClick={this.handlePlayPause}>
                <i className={ !this.props.player.playing ? 'fa fa-play' : 'fa fa-pause' } />&nbsp;
                { !this.props.player.playing ? 'Play' : 'Pause' }
              </button>
              <button className={styles.button} onClick={this.handleSaveChannel}>
                <i className={ this.state.channelSaved ? "fa fa-star" : "fa fa-star-o" } />&nbsp;
                { !this.state.channelSaved ? 'Favorite' : 'Remove' }
              </button>
            </div>
          </div>

          <h3 className={styles.recent}>Recently Played Songs</h3>
          <div className={styles.tracks}>
            <div className={styles.date}>Played at</div>
            <div className={styles.artist}>Artist</div>
            <div className={styles.title}>Song</div>
            <div className={styles.album}>Album</div>
          </div>
          {songNodes}
        </div>
      </div>
    );
  }
}

