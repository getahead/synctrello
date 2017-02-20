export const FETCH_CARDS_START = 'FETCH_CARDS_START';
export const FETCH_CARDS_SUCCESS = 'FETCH_CARDS_SUCCESS';
export const FETCH_CARDS_ERROR = 'FETCH_CARDS_ERROR';

export const fetchCards = () => ({fetch}) => {
  return {
    type: 'FETCH_CARDS',
    payload: {
      promise: fetch('/api/v1/cards/get/')
        .then(res => res.json())
    }
  };
};
