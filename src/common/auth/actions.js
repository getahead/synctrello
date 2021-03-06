import URI from 'urijs';

export const TRELLO_OAUTH_START = 'TRELLO_OAUTH_START';
export const TRELLO_OAUTH_SUCCESS = 'TRELLO_OAUTH_SUCCESS';
export const TRELLO_OAUTH_ERROR = 'TRELLO_OAUTH_ERROR';

export const GET_GITHUB_USER_TOKEN_START = 'GET_GITHUB_USER_TOKEN_START';
export const GET_GITHUB_USER_TOKEN_SUCCESS = 'GET_GITHUB_USER_TOKEN_SUCCESS';
export const GET_GITHUB_USER_TOKEN_ERROR = 'GET_GITHUB_USER_TOKEN_ERROR';

export const GET_USER_INFO_START = 'GET_USER_INFO_START';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_ERROR = 'GET_USER_INFO_ERROR';

export const LOGOUT = 'LOGOUT';

export const getUserInfo = (token = '') => ({fetch}) => ({
  type: 'GET_USER_INFO',
  payload: {
    promise: fetch(URI('/api/v1/auth/user/').query({token}).toString())
      .then(res => res.json())
  }
});

export const trelloOauth = (origin = '') => ({fetch}) => ({
  type: 'TRELLO_OAUTH',
  payload: {
    promise: fetch(URI('/api/v1/auth/trello/').query({origin}))
      .then(res => res.json())
  }
});

export const logout = (origin = '') => ({fetch}) => ({
  type: LOGOUT
});
