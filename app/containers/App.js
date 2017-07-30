// @flow
import React, { Component } from 'react';
import Player from './Player';

export default class App extends Component {
  props: {
    children: HTMLElement
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
