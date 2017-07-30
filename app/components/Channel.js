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
    setPlaylist: PropTypes.func,
    setMetadata: PropTypes.func,
    setTrackUrl: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.channelId = this.props.location.query.id;
    this.soma = new SomaFMService();

    this.state = {
      channelData: null,
      metadata: null,
      tracks: [],
      channelSaved: false
    };
    this.timer = null;
    this.swarmInterval = 2000;
  }

  componentDidMount() {
    this.soma.getChannel(this.channelId, (err, data) => {
      this.setState({ channelData: data });
      this.props.setMetadata({ data: data });
    });

    const stationUrl = this.soma.getStationUrl(this.channelId);
    this.props.setTrackUrl(stationUrl, !this.props.isPlaying);

    this.soma.channelExists(this.channelId, (state) => {
      console.log(state);
      this.setState({ channelSaved: state });
    });

    // this.timer = setInterval(() => {
    //   this.setState({ swarm: this.tc.getSwarm() });
    // }, this.swarmInterval);
  }

  componentWillUnmount() {
    // clearInterval(this.timer);
    // this.timer = false;
  }

  handleSaveChannel = () => {
    console.log('handleSaveChannel');
    if (this.state.channelSaved) {
      this.soma.removeChannel(this.channelId, (val) => {
        console.log('Removed channel.');
        this.setState({ channelSaved: false });
      });
    } else {
      const channel = {
        id: this.channelId,
        title: this.state.channelData.title
      };

      this.soma.saveChannel(channel, (val) => {
        console.log('Saved channel.', val);
        this.setState({ channelSaved: true });
      });
    }
  }

  render() {
    const channelData = this.state.channelData;
    const stationUrl = this.soma.getStationUrl(this.channelId);
    // const metadata = this.state.metadata;
    // const { setTrackUrl } = this.props;
    // const { downloadPlaylist, downloadTrack, getFileProgress } = this.tc;

    // const trackNodes = this.state.tracks.map((v, i) => {
    //   const isCurrentTrackPlaying = this.props.player.playing && this.props.player.track === i;
    //   return (
    //     <Track
    //       key={i}
    //       trackId={i}
    //       track={v}
    //       setTrackUrl={setTrackUrl}
    //       isPlaying={isCurrentTrackPlaying}
    //       getFileProgress={getFileProgress}
    //       downloadTrack={downloadTrack}
    //     />
    //   );
    // });

    // const swarm = this.state.swarm;
    // const downloadSpeed = swarm !== null ? parseInt(swarm.downloadSpeed(), 10) : 0;
    // const uploadSpeed = swarm !== null ? parseInt(swarm.uploadSpeed(), 10) : 0;

    return (
      <div className={styles.channel}>
        <SideNav />
        <div className={styles.container}>
          {/* <Nav
            swarm={swarm}
            download={downloadSpeed}
            upload={uploadSpeed}
          /> */}

          <div className={styles.cover}>
            <h2>{channelData && channelData.title || 'Loading channel...'}</h2>
            <h4>{channelData && channelData.description || 'Loading channel...'}</h4>
            <h5>{channelData && channelData.dj || 'Loading channel...'}</h5>
            <img src={channelData && channelData.largeimage} alt={channelData && channelData.title} />

            <div className={styles.buttons}>
              <button className={styles.button} onClick={this.handleSaveChannel}>
                <i className="fa fa-save" />
                { this.state.channelSaved ? 'Remove Favorite' : 'Save to Favorites' }
              </button>
            </div>
          </div>
          {/* {trackNodes} */}
        </div>
      </div>
    );
  }
}
