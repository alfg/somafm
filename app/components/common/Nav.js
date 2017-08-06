import React, { Component } from 'react';
import styles from './Nav.module.css';


export default class Nav extends Component {

  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      transform: ''
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (event) => {
    const scrollTop = event.srcElement.body.scrollTop;
    const opacity = scrollTop / window.innerHeight;

    const bg = {
      backgroundColor: `rgba(0, 0, 0, '${opacity}')`
    };

    this.setState({
      transform: bg
    });
  };

  render() {
    let transform;
    if (this.state.transform) {
      transform = this.state.transform;
    }

    return (
      <div className={styles.nav} onScroll={this.handleScroll} style={transform}>
        <ul className={styles.stats} />
      </div>
    );
  }
}
