import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Channel from '../components/Channel';
import * as PlayerActions from '../actions/player';

function mapStateToProps(state) {
  return {
    player: state.player,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return bindActionCreators(PlayerActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
