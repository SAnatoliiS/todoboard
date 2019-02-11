import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {
	boardsReducer as boards
	// lists,
	// listsInBoards,
	// tasks,
	// tasksInLists
} from '../reducers/reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
	const store = createStore(
		combineReducers({
			boards
			// lists,
			// listsInBoards,
			// tasks,
			// tasksInLists
		}),
		composeEnhancers(applyMiddleware(thunk))
	);

	return store;
};
