export const GITHUB_OAUTH_START = 'GITHUB_OAUTH_START';
export const GITHUB_OAUTH_SUCCESS = 'GITHUB_OAUTH_SUCCESS';
export const GITHUB_OAUTH_ERROR = 'GITHUB_OAUTH_ERROR';

export const GET_GITHUB_USER_TOKEN_START = 'GET_GITHUB_USER_TOKEN_START';
export const GET_GITHUB_USER_TOKEN_SUCCESS = 'GET_GITHUB_USER_TOKEN_SUCCESS';
export const GET_GITHUB_USER_TOKEN_ERROR = 'GET_GITHUB_USER_TOKEN_ERROR';

export const GET_USER_INFO_START = 'GET_USER_INFO_START';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_ERROR = 'GET_USER_INFO_ERROR';

export const getUserInfo = () => ({fetch}) => ({
  type: 'GET_USER_INFO',
  payload: {
    promise: fetch('/api/v1/auth/user', {credentials: 'include'})
      .then(res => res.json())
  }
});

export const gitHubOauth = () => ({fetch}) => ({
  type: 'GITHUB_OAUTH',
  payload: {
    promise: fetch('/api/v1/auth/github', {credentials: 'include'})
      .then(res => res.json())
  }
});

export const getGithubUserToken = () => ({fetch, dispatch}) => ({
  type: 'GET_GITHUB_USER_TOKEN',
  payload: {
    promise: fetch('/api/v1/auth/github-token', {credentials: 'include'})
      .then(res => res.json())
      .then((res) => {
        dispatch(getUserInfo());
        return res;
      })
  }
});
