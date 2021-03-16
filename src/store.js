import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducerMix from './reducers';

export function configureStore() {
  return createStore(
    reducerMix,
    applyMiddleware(thunk),
  );
}

const store = configureStore();

export default store;
