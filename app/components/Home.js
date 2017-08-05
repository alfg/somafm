import React, { Component, PropTypes } from 'react';
import Nav from './common/Nav';
import SideNav from './common/SideNav';
import styles from './Home.module.css';
import ChannelCard from './ChannelCard';
import SomaFMService from '../services/SomaFMService';

export default class Home extends Component {

  static propTypes = {
    setHomeChannels: PropTypes.func,
    channels: PropTypes.shape({
      home: PropTypes.arrayOf(PropTypes.shape({})),
      favorites: PropTypes.arrayOf(PropTypes.shape({}))
    })
  };

  componentDidMount() {
    this.getAllChannels();
    this.loadFavorites();
  }

  getAllChannels() {
    const soma = new SomaFMService();
    soma.getAllChannels((err, data) => {
      this.props.setHomeChannels(data);
    });
  }

  loadFavorites() {
    const soma = new SomaFMService();
    soma.loadSavedChannels((data) => {
      this.props.setFavorites(data);
    });
  }

  render() {
    const channels = this.props.channels.home || [];
    const channelNodes = channels.map((v, i) =>
      <ChannelCard
        key={i}
        img={v.largeimage || "http://placehold.it/400x300"}
        title={v.title}
        subtitle={v.description}
        url={v.id}
      />
    );

    return (
      <div className={styles.home}>
        <SideNav favorites={this.props.channels.favorites} />
        <div className={styles.container}>
          <Nav />
          <div className="channels">
            <h2>Channels</h2>
            {channels.length !== 0 ? channelNodes : 'No channels available.' }
          </div>
        </div>
      </div>
    );
  }
}
