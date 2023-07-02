import { createStore } from 'redux';
import { combineReducers } from 'redux';
import grams from '../modules/gramData';
import users from '../modules/userData';

const rootReducer = combineReducers({
  grams,
  users
});
const store = createStore(rootReducer);

export default store;
