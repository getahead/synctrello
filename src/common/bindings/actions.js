export const FETCH_BINDINGS_START = 'FETCH_BINDINGS_START';
export const FETCH_BINDINGS_SUCCESS = 'FETCH_BINDINGS_SUCCESS';
export const FETCH_BINDINGS_ERROR = 'FETCH_BINDINGS_ERROR';

export const EDIT_BINDING_START = 'EDIT_BINDING_START';
export const EDIT_BINDING_SUCCESS = 'EDIT_BINDING_SUCCESS';
export const EDIT_BINDING_ERROR = 'EDIT_BINDING_ERROR';

export const fetchBindings = () => ({fetch}) => ({
  type: 'FETCH_BINDINGS',
  payload: {
    promise: fetch('/api/v1/bindings/get/')
      .then(res => res.json())
  }
});


export const editBinding = (id = '', values) => ({fetch}) => ({
  type: 'EDIT_BINDING',
  payload: {
    promise: fetch(`/api/v1/bindings/${id}/edit/`, {
      method: 'post',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(values)
    })
      .then(res => res.json())
  }
});
