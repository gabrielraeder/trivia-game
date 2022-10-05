import { fetchCategoryAPI } from '../../services/fetchAPI';

export const USER_LOGIN = 'USER_LOGIN';
export const API_REQUEST = 'API_REQUEST';
export const API_FAIL = 'API_FAIL';
export const CORRECT_ANSWER = 'CORRECT_ANSWER';
export const RESET_REDUX = 'RESET_REDUX';
export const CATEGORY_SUCCESS = 'CATEGORY_SUCCESS';
export const CHOSEN_SETTINGS = 'CHOSEN_SETTINGS';

export const sendEmailInfo = (payload) => ({
  type: USER_LOGIN,
  payload,
});

export const correctAnswerAction = (score) => ({
  type: CORRECT_ANSWER,
  score,
});

export const resetReduxAction = () => ({
  type: RESET_REDUX,
});

const receiveApiFail = (erro) => ({
  type: API_FAIL,
  erro,
});

export const categorySuccessAction = (payload) => ({
  type: CATEGORY_SUCCESS,
  payload,
});

export const fetchCategoryAction = () => async (dispatch) => {
  try {
    const response = await fetchCategoryAPI();
    dispatch(categorySuccessAction(response.trivia_categories));
  } catch (error) {
    dispatch(receiveApiFail(error));
  }
};

export const chosenSettingsAction = (payload) => ({
  type: CHOSEN_SETTINGS,
  payload,
});
