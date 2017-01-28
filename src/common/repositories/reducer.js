import * as actions from './actions';
import { Map } from 'immutable';
import { Record } from '../transit';

const State = Record({
  map: Map()
}, 'repositories');

const Repository = Record({
  name: '',
  url: ''
}, 'repository');

const repositoriesReducer = (state = new State(), action = {}) => {
  switch (action.type) {
    case actions.FETCH_REPOSITORIES_SUCCESS: {
      const repositories = action.payload.data.items.reduce((result, item) =>
          result.set(item.name, new Repository(item))
        , Map());
      return state.update('map', map => map.merge(repositories));
    }

    default:
      return state;
  }
};

export default repositoriesReducer;
