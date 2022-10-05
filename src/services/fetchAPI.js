export const getTriviaApi = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const json = await response.json();
  return json.token;
};

export const getQuestionsAPI = async (token, settings) => {
  let url = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const cat = settings.categorySelected;
  const dif = settings.difficultySelected;
  if (cat !== '' || dif !== '') {
    url = `https://opentdb.com/api.php?amount=5&category=${cat}&difficulty=${dif}&token=${token}`;
  }
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const fetchCategoryAPI = async () => {
  const url = 'https://opentdb.com/api_category.php';
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
