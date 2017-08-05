import channels from '../../app/reducers/channels';
import { CHANNELS, FAVORITES } from '../../app/actions/channels';

describe('reducers', () => {
  describe('channels', () => {
    it('should handle initial state', () => {
      expect(channels(undefined, {})).toMatchSnapshot();
    });

    // it('should handle INCREMENT_COUNTER', () => {
    //   expect(channels(1, { type: CHANNELS })).toMatchSnapshot();
    // });

    // it('should handle DECREMENT_COUNTER', () => {
    //   expect(channels(1, { type: FAVORITES })).toMatchSnapshot();
    // });

    // it('should handle unknown action type', () => {
    //   expect(channels(1, { type: 'unknown' })).toMatchSnapshot();
    // });
  });
});
