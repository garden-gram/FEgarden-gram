import { createStore } from 'redux';
import { combineReducers } from 'redux';
import grams from '../modules/gramData';

const rootReducer = combineReducers({
  grams
});
const store = createStore(rootReducer);

export default store;
