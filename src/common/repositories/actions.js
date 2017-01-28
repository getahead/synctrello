export const FETCH_REPOSITORIES_SUCCESS = 'FETCH_REPOSITORIES_SUCCESS';

export const fetchRepositories = () => ({fetch}) => {
  return {
    type: 'FETCH_REPOSITORIES',
    payload: {
      promise: fetch('/api/v1/hello')
        .then(res => res.json())
    },
  };
};
