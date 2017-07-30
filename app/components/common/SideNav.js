import React, { Component, PropTypes } from 'react';
import { ipcRenderer } from 'electron';
import { Link } from 'react-router';
import styles from './SideNav.module.css';
import SomaFMService from '../../services/SomaFMService';

export default class SideNav extends Component {

  static propTypes = {
    transform: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.updateOnlineStatus = this.updateOnlineStatus.bind(this);
    this.state = {
      status: 'offline',
      favorites: []
    };
  }

  componentDidMount() {
    window.addEventListener('online', this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);
    this.updateOnlineStatus();
  }

  updateOnlineStatus() {
    const status = navigator.onLine ? 'online' : 'offline';
    ipcRenderer.send('online-status-changed', status);
    this.setState({ status });
  }

  render() {
    const { favorites } = this.props;

    const favoriteNodes = favorites && favorites.map((v, i) => {
      return (<li key={i}><i className="fa fa-star" /><Link to={{ pathname: '/channel', query: { id: v.id } }}>{v.title}</Link></li>);
    });

    return (
      <div className={styles.sideNav}>
        <Link to="/" className={styles.logo}></Link>

        <ul className={styles.navLinks}>
          <li className={styles.title}>Main</li>
          <Link to="/channels" activeClassName={styles.active}><li><i className="fa fa-hashtag" /> Channels</li></Link>
          {/* <Link to="/settings" activeClassName={styles.active}><li><i className="fa fa-cog" /> Settings</li></Link> */}
        </ul>

        <ul className={styles.navLinks}>
          <li className={styles.title}>Favorites</li>
          { favorites ? favoriteNodes : <li><span className={styles.grayed}>None</span></li> }
        </ul>

        <ul className={styles.status}>
          <li><i className="fa fa-signal" /> <span className={this.state.status}>{this.state.status}</span></li>
        </ul>
      </div>
    );
  }
}
