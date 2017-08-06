import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'react-router-redux';
import HomePage from '../../app/containers/HomePage';
import { configureStore } from '../../app/store/configureStore';

// const channnels = {
//   favorites: [],
//   home: []
// }

function setup(initialState) {
  const store = configureStore(initialState);
  const history = createBrowserHistory();
  console.log(store);
  const app = mount(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <HomePage />
      </ConnectedRouter>
    </Provider>
  );
  return {
    app,
    channelCards: app.find('.channelCard'),
    p: app.find('.channels')
  };
}

describe('containers', () => {
  describe('App', () => {
    it('should display initial page', () => {
      const { p } = setup();
      expect(p.find('h2').text()).toMatch('Channels');
    });

    // it('should display updated count after increment button click', () => {
    //   const { buttons, p } = setup();
    //   buttons.at(0).simulate('click');
    //   expect(p.text()).toMatch(/^1$/);
    // });

    // it('should display updated count after descrement button click', () => {
    //   const { buttons, p } = setup();
    //   buttons.at(1).simulate('click');
    //   expect(p.text()).toMatch(/^-1$/);
    // });

    // it('shouldnt change if even and if odd button clicked', () => {
    //   const { buttons, p } = setup();
    //   buttons.at(2).simulate('click');
    //   expect(p.text()).toMatch(/^0$/);
    // });

    // it('should change if odd and if odd button clicked', () => {
    //   const { buttons, p } = setup({ counter: 1 });
    //   buttons.at(2).simulate('click');
    //   expect(p.text()).toMatch(/^2$/);
    // });
  });
});
