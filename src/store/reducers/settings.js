import { CATEGORY_SUCCESS, CHOSEN_SETTINGS, RESET_REDUX } from '../actions';

const INITIAL_STATE = {
  categorys: [],
  settingsSelected: {
    categorySelected: '',
    difficultySelected: '',
  },
};

const settingsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CATEGORY_SUCCESS: return {
    ...state,
    categorys: action.payload,
  };
  case CHOSEN_SETTINGS: return {
    ...state,
    settingsSelected: action.payload,
  };
  case RESET_REDUX: return {
    ...state,
    settingsSelected: {
      categorySelected: '',
      difficultySelected: '',
    },
  };
  default:
    return state;
  }
};

export default settingsReducer;
