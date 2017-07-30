import React, { Component, PropTypes } from 'react';
import styles from './Nav.module.css';


export default class Nav extends Component {

  static propTypes = {
    download: PropTypes.number,
    upload: PropTypes.number,
    swarm: PropTypes.shape({})
  };

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

    const { download, upload } = this.props;
    const swarm = this.props.swarm || null;

    return (
      <div className={styles.nav} onScroll={this.handleScroll} style={transform}>
        <ul className={styles.stats}>
          <li><span><i className="fa fa-globe" /> { swarm !== null ? swarm.wires.length : 0 } Peers</span></li>
          <li><span ><i className="fa fa-arrow-down" /> { download ? formatBytes(download) : '0 kbps' }</span></li>
          <li><span><i className="fa fa-arrow-up" /> { upload ? formatBytes(upload) : '0 kbps' }</span></li>
        </ul>
      </div>
    );
  }
}

function formatBytes(bytes, decimals) {
  if (bytes === 0) return '0 Byte';
  const k = 1000;
  const dm = decimals + 1 || 3;
  const sizes = ['Bytes', 'KBPS', 'MBPS', 'GBPS', 'TBPS'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat(bytes / (k ** i).toFixed(dm))} ${sizes[i]}`;
}
