import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { correctAnswerAction } from '../store/actions';
import { getQuestionsAPI } from '../services/fetchAPI';
import { saveToLocalStorage, randomArrayShuffle } from '../services/helpers';

const ERROR_TOKEN_RESPONSE = 3;
const FULL_TIMER = 30;
const ONE_SECOND = 1000;
const LAST_QUESTION_NUMBER = 4;
const BASE_POINT = 10;
const DIFFICULT_VALUES = {
  hard: 3,
  medium: 2,
  easy: 1,
};

class GameBody extends Component {
  state = {
    token: {},
    questions: {},
    questionNumber: 0,
    questionDifficulty: '',
    right: '',
    wrong: '',
    isAnswered: false,
    timer: FULL_TIMER,
    shuffled: [],
    isNextVisible: false,
    questionAnswered: false,
  };

  componentDidMount() {
    this.validateToken();
  }

  componentDidUpdate() {
    const { timer } = this.state;
    if (timer === 0) clearInterval(this.intervalID);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  validateToken = () => {
    this.setState({
      token: localStorage.getItem('token'),
    }, async () => {
      const { token } = this.state;
      const { history, settings: { settingsSelected } } = this.props;
      const data = await getQuestionsAPI(token, settingsSelected);
      if (data.response_code === ERROR_TOKEN_RESPONSE) {
        localStorage.removeItem('token');
        history.push('/');
        return null;
      }
      this.setState({
        questions: data,
        questionDifficulty: data.results[0].difficulty,
      });
      this.randomizeAnswers();
    });
    this.intervalTimer();
  };

  intervalTimer = () => {
    this.intervalID = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, ONE_SECOND);
  };

  randomizeAnswers = () => {
    const { questions, questionNumber } = this.state;
    const { results } = questions;
    const current = results[questionNumber];
    const answers = [current.correct_answer, ...current.incorrect_answers];
    this.setState({
      shuffled: randomArrayShuffle(answers),
    });
  };

  onAnswerClick = (answer) => {
    const { dispatch } = this.props;
    const { questions: { results }, questionNumber } = this.state;
    const current = results[questionNumber];
    this.setState({
      isAnswered: true,
      right: 'right-answer',
      wrong: 'wrong-answer',
      isNextVisible: true,
    }, () => {
      const { questionAnswered, timer, questionDifficulty } = this.state;
      const score = BASE_POINT + (timer * DIFFICULT_VALUES[questionDifficulty]);
      if (current.correct_answer === answer && !questionAnswered) {
        dispatch(correctAnswerAction(score));
      }
      this.setState({ questionAnswered: true });
      clearInterval(this.intervalID);
    });
  };

  nextQuestion = () => {
    const { history } = this.props;
    const { questionNumber } = this.state;
    if (questionNumber === LAST_QUESTION_NUMBER) {
      const { player } = this.props;
      console.log(player);
      saveToLocalStorage(player);
      history.push('/feedback');
    }
    this.setState((prevState) => ({
      questionNumber: prevState.questionNumber + 1,
      right: '',
      wrong: '',
      questionAnswered: false,
      timer: FULL_TIMER,
      isNextVisible: false,
    }), () => {
      this.randomizeAnswers();
      this.intervalTimer();
      const { questions } = this.state;
      this.setState({
        questionDifficulty: questions.results[questionNumber + 1].difficulty,
      });
    });
  };

  decodeEntity = (inputStr) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = inputStr;
    return textarea.value;
  };

  render() {
    const { questions, questionNumber, isNextVisible,
      isAnswered, right, wrong, timer, shuffled, questionDifficulty } = this.state;

    const { results } = questions;
    const current = results && results[questionNumber];

    let wrongNum = 0;

    const showNextBtn = isNextVisible || timer === 0;

    return (
      <div>
        { results && (
          <div>
            <h1>{ questionDifficulty }</h1>
            <h3 data-testid="question-category">{current.category}</h3>
            <h4 data-testid="question-text">{this.decodeEntity(current.question)}</h4>
            <div data-testid="answer-options">
              {shuffled.map((answer, index) => {
                if (answer !== current.correct_answer) wrongNum += 1;
                return (
                  <button
                    className={ isAnswered && answer === current.correct_answer
                      ? right : wrong }
                    data-testid={ answer === current.correct_answer
                      ? 'correct-answer' : `wrong-answer-${wrongNum - 1}` }
                    key={ index }
                    type="button"
                    onClick={ () => this.onAnswerClick(answer) }
                    disabled={ timer === 0 }
                  >
                    {answer}
                  </button>
                );
              })}

            </div>
            <h2>{timer}</h2>
            { showNextBtn && (
              <button
                data-testid="btn-next"
                type="button"
                onClick={ this.nextQuestion }
              >
                Next
              </button>)}
          </div>
        )}
      </div>
    );
  }
}

GameBody.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  player: PropTypes.shape().isRequired,
  settings: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(GameBody);
