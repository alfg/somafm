import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AudioPlayer from '../components/players/AudioPlayer';
import * as PlayerActions from '../actions/player';

function mapStateToProps(state) {
  return {
    player: state.player
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PlayerActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayer);
