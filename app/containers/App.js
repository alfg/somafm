// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
import Player from './Player';

export default class App extends Component {
  props: {
    children: Children
  };

  render() {
    return (
      <div>
        {this.props.children}
        <Player />
      </div>
    );
  }
}
