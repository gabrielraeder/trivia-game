import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import GameBody from '../components/GameBody';

class Game extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header />
        <GameBody history={ history } />
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Game;
