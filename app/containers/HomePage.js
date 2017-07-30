// // @flow
// import React, { Component } from 'react';
// import Home from '../components/Home';

// export default class HomePage extends Component {
//   render() {
//     return (
//       <Home />
//     );
//   }
// }
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import * as ChannelActions from '../actions/channels';


function mapStateToProps(state) {
  return {
    channels: state.channels,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ChannelActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
