import React, { Component, PropTypes } from 'react';
import { ipcRenderer } from 'electron';

import { Link, NavLink } from 'react-router-dom';
import styles from './SideNav.module.css';

export default class SideNav extends Component {

  static propTypes = {
    favorites: PropTypes.arrayOf(PropTypes.shape({})).isRequired
  };

  constructor(props) {
    super(props);
    this.updateOnlineStatus = this.updateOnlineStatus.bind(this);
    this.state = {
      status: 'offline',
      favorites: []
    };

    this.ipc = ipcRenderer;
  }

  componentDidMount() {
    window.addEventListener('online', this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);
    this.updateOnlineStatus();
  }

  updateOnlineStatus() {
    const status = navigator.onLine ? 'online' : 'offline';
    if (this.ipc) {
      this.ipc.send('online-status-changed', status);
      this.setState({ status });
    }
  }

  render() {
    const { favorites } = this.props;

    const favoriteNodes = (favorites.length > 0) && favorites.map((v, i) => (
      <li key={v.id}>
        <i className="fa fa-star" />
        <NavLink to={{ pathname: `/channel/${v.id}` }} activeClassName="active">{v.title}</NavLink>
      </li>
      ));

    return (
      <div className={styles.sideNav}>
        <Link to="/" className={styles.logo} data-tid="logo" />

        <ul className={styles.navLinks}>
          <li className={styles.title}>Main</li>
          <Link to="/channels" className={styles.active}><li><i className="fa fa-hashtag" /> Channels</li></Link>
          {/* <Link to="/settings" activeClassName={styles.active}>
            <li><i className="fa fa-cog" /> Settings</li>
          </Link> */}
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
