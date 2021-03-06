import * as actions from './actions';
import { Map } from 'immutable';
import { Record } from '../transit';
import BindingModel from './bindingModel';

const State = Record({
  map: Map(),
  status: '',
  error: null
}, 'bingings');

const bindingsReducer = (state = new State(), action = {}) => {
  switch (action.type) {
    case actions.DELETE_BINDING_START:
    case actions.CREATE_BINDING_START:
    case actions.EDIT_BINDING_START:
    case actions.FETCH_BINDINGS_START: {
      return state.set('status', 'pending');
    }

    case actions.CREATE_BINDING_SUCCESS:
    case actions.FETCH_BINDINGS_SUCCESS: {
      if (!action.payload.success || !action.payload.data) {
        return state
          .set('status', '')
          .set('error', action.payload.error)
      }

      const bindings = action.payload.data.items.reduce((result, item) =>
        result.set(item.id, new BindingModel(item)), Map());

      return state
        .update('map', map => map.merge(bindings))
        .set('status', '');
    }

    case actions.EDIT_BINDING_SUCCESS: {
      if (!action.payload.success || !action.payload.data) {
        return state
          .set('status', '')
          .set('error', action.payload.error)
      }

      const binding = action.payload.data;
      return state
        .updateIn(['map', binding.id], it => it.merge(binding))
        .set('status', '');
    }

    case actions.DELETE_BINDING_SUCCESS: {
      if (!action.payload.success || !action.payload.data) {
        return state
          .set('status', '')
          .set('error', action.payload.error)
      }

      const itemsRemoved = action.payload.data
        ? (action.payload.data.items || [])
        : [];

      return state
        .update('map', binding => binding.filter(it => itemsRemoved.indexOf(it.id) === -1))
        .set('status', '');
    }

    case actions.DELETE_BINDING_ERROR:
    case actions.CREATE_BINDING_ERROR:
    case actions.EDIT_BINDING_ERROR:
    case actions.FETCH_BINDINGS_ERROR: {
      return state
        .set('status', '')
        .set('error', action.payload && action.payload.error
          ? action.payload.error
          : action.payload || 'Unexpected error'
        );
    }

    default:
      return state;
  }
};

export default bindingsReducer;

