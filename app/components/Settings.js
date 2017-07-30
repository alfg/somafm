import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from './common/Nav';
import SideNav from './common/SideNav';
import styles from './Settings.module.css';

export default class Settings extends Component {

  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className={styles.settings}>
        <SideNav />
        <div className={styles.container}>
          <Nav />
          <h2>Settings</h2>
        </div>
      </div>
    );
  }
}
