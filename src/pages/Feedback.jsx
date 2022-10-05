import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { resetReduxAction } from '../store/actions';

const SCORE_NUMBER = 3;

class Feedback extends Component {
  playAgain = () => {
    const { history, dispatch } = this.props;
    dispatch(resetReduxAction());
    history.push('/');
  };

  ranking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { score, assertions } = this.props;
    return (
      <div data-testid="feedback-text">
        Feedback
        <Header />
        { assertions < SCORE_NUMBER ? <h3>Could be better...</h3> : <h3>Well Done!</h3> }
        <h3 data-testid="feedback-total-score">
          { score }
        </h3>
        <h3 data-testid="feedback-total-question">
          { assertions }
        </h3>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.playAgain }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.ranking }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
