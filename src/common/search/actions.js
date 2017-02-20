const SEARCH_START = 'SEARCH_START';
const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
const SEARCH_ERROR = 'SEARCH_ERROR';

export const searchCard = (query = '', boards = []) => ({fetch}) => ({
  type: 'SEARCH_CARDS',
  payload: {
    promise: fetch(`/api/v1/cards/search/?query=${query}&idBoards=${boards.join(',')}`)
      .then(res => res.json())
  }
});
