import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {
  boardsReducer as boards,
  listsReducer as lists,
  tasksReducer as tasks
} from '../reducers/reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      boards,
      lists,
      tasks
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
