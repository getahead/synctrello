import URI from 'urijs';

export const FETCH_USER_BOARDS_START = 'FETCH_USER_BOARDS_START';
export const FETCH_USER_BOARDS_SUCCESS = 'FETCH_USER_BOARDS_SUCCESS';
export const FETCH_USER_BOARDS_ERROR = 'FETCH_USER_BOARDS_ERROR';

export const TOGGLE_WEBHOOK_BOARD_START = 'TOGGLE_WEBHOOK_BOARD_START';
export const TOGGLE_WEBHOOK_BOARD_SUCCESS = 'TOGGLE_WEBHOOK_BOARD_SUCCESS';
export const TOGGLE_WEBHOOK_BOARD_ERROR = 'TOGGLE_WEBHOOK_BOARD_ERROR';

export const fetchBoards = () => ({fetch}) => {
  return {
    type: 'FETCH_USER_BOARDS',
    payload: {
      promise: fetch('/api/v1/boards/get/')
        .then(res => res.json())
    },
  };
};

export const toggleWebhookBoard = ({id: idBoard, active, idWebhook}) => ({fetch}) => {
  return {
    type: 'TOGGLE_WEBHOOK_BOARD',
    payload: {
      promise: fetch(URI(`/api/v1/boards/webhook/`).query({
        idBoard,
        active,
        idWebhook
      }).toString())
        .then(res => res.json())
    },
  };
};
