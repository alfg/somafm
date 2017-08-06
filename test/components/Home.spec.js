import { spy } from 'sinon';
import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Home from '../../app/components/Home';

const channels = {
  favorites: [],
  home: [
    {
      id: '7soul',
      title: 'Seven Inch Soul',
      description: 'Vintage soul tracks from the original 45 RPM vinyl.',
      dj: 'Dion Watts Garcia',
      djmail: 'dion@somafm.com',
      genre: 'oldies',
      image: 'https://api.somafm.com/img/7soul120.png',
      largeimage: 'https://api.somafm.com/logos/256/7soul256.png',
      xlimage: 'https://api.somafm.com/logos/512/7soul512.png',
      twitter: 'SevenInchSoul',
      updated: '1396144686',
      playlists: [
        {
          url: 'https://api.somafm.com/7soul130.pls',
          format: 'aac',
          quality: 'highest'
        },
        {
          url: 'https://api.somafm.com/7soul.pls',
          format: 'mp3',
          quality: 'high'
        },
        {
          url: 'https://api.somafm.com/7soul64.pls',
          format: 'aacp',
          quality: 'high'
        },
        {
          url: 'https://api.somafm.com/7soul32.pls',
          format: 'aacp',
          quality: 'low'
        }
      ],
      listeners: '53',
      lastPlaying: "Bobby Freeman - C'mon And Swim"
    }
  ]
};

function setup() {
  const actions = {
    // increment: spy(),
    // incrementIfOdd: spy(),
    // incrementAsync: spy(),
    // decrement: spy()
    getHomeChannels: spy()
  };
  const component = shallow(<Home channels={channels} {...actions} />);
  return {
    component,
    actions,
    channelCards: component.find('.channelCard'),
    p: component.find('.channels')
  };
}

describe('Home component', () => {
  it('should should display channel header', () => {
    const { p } = setup();
    expect(p.find('h2').text()).toMatch('Channels');
  });

  // it('should first button should call increment', () => {
  //   const { buttons, actions } = setup();
  //   buttons.at(0).simulate('click');
  //   expect(actions.increment.called).toBe(true);
  // });

  it('should match exact snapshot', () => {
    const { actions } = setup();
    const tree = renderer
      .create(
        <div>
          <Router>
            <Home channels={channels} {...actions} />
          </Router>
        </div>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  // it('should second button should call decrement', () => {
  //   const { buttons, actions } = setup();
  //   buttons.at(1).simulate('click');
  //   expect(actions.decrement.called).toBe(true);
  // });

  // it('should third button should call incrementIfOdd', () => {
  //   const { buttons, actions } = setup();
  //   buttons.at(2).simulate('click');
  //   expect(actions.incrementIfOdd.called).toBe(true);
  // });

  // it('should fourth button should call incrementAsync', () => {
  //   const { buttons, actions } = setup();
  //   buttons.at(3).simulate('click');
  //   expect(actions.incrementAsync.called).toBe(true);
  // });
});
