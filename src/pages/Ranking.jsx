import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { readingRank } from '../services/helpers';
import { resetReduxAction } from '../store/actions';

class Ranking extends Component {
  render() {
    const rankArr = readingRank().sort((a, b) => b.score - a.score);
    const { dispatch } = this.props;
    return (
      <div data-testid="ranking-title">
        <table>
          <thead className="table-head">
            <tr>
              <th>Profile Picture</th>
              <th>Nome</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {rankArr.map((player, index) => (
              <tr key={ index }>
                <td>
                  <img
                    src={ player.picture }
                    alt={ `${player.gravatarEmail} gravatar profile` }
                  />
                </td>
                <td data-testid={ `player-name-${index}` }>{player.name}</td>
                <td data-testid={ `player-score-${index}` }>{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/">
          <button
            data-testid="btn-go-home"
            type="button"
            onClick={ () => dispatch(resetReduxAction()) }
          >
            Home
          </button>
        </Link>
      </div>
    );
  }
}

Ranking.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Ranking);
