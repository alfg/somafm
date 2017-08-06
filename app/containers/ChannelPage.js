// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Channel from '../components/Channel';
import * as PlayerActions from '../actions/player';
import * as ChannelActions from '../actions/channels';

function mapStateToProps(state) {
  return {
    player: state.player,
    channels: state.channels,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...ChannelActions, ...PlayerActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
