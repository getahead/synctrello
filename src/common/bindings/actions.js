export const FETCH_BINDINGS_START = 'FETCH_BINDINGS_START';
export const FETCH_BINDINGS_SUCCESS = 'FETCH_BINDINGS_SUCCESS';
export const FETCH_BINDINGS_ERROR = 'FETCH_BINDINGS_ERROR';

export const EDIT_BINDING_START = 'EDIT_BINDING_START';
export const EDIT_BINDING_SUCCESS = 'EDIT_BINDING_SUCCESS';
export const EDIT_BINDING_ERROR = 'EDIT_BINDING_ERROR';

export const CREATE_BINDING_START = 'CREATE_BINDING_START';
export const CREATE_BINDING_SUCCESS = 'CREATE_BINDING_SUCCESS';
export const CREATE_BINDING_ERROR = 'CREATE_BINDING_ERROR';

export const DELETE_BINDING_START = 'DELETE_BINDING_START';
export const DELETE_BINDING_SUCCESS = 'DELETE_BINDING_SUCCESS';
export const DELETE_BINDING_ERROR = 'DELETE_BINDING_ERROR';

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

export const createBinding = (values) => ({fetch}) => ({
  type: 'CREATE_BINDING',
  payload: {
    promise: fetch(`/api/v1/bindings/create/`, {
      method: 'post',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(values)
    })
      .then(res => res.json())
  }
});

export const deleteBinding = (idBinding = '') => ({fetch}) => ({
  type: 'DELETE_BINDING',
  payload: {
    promise: fetch(`/api/v1/bindings/${idBinding}/delete/`)
      .then(res => res.json())
  }
});
