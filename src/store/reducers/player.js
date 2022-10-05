import { USER_LOGIN, API_FAIL,
  API_REQUEST, CORRECT_ANSWER, RESET_REDUX } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN: return {
    ...state,
    name: action.payload.name,
    gravatarEmail: action.payload.email,
  };
  case API_REQUEST: return {
    ...state,
    loading: true,
  };
  case API_FAIL: return {
    ...state,
  };
  case CORRECT_ANSWER: return {
    ...state,
    assertions: state.assertions + 1,
    score: state.score + action.score,
  };
  case RESET_REDUX: return {
    ...INITIAL_STATE,
  };
  default:
    return state;
  }
};

export default playerReducer;
