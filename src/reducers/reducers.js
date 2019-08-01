import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import boardsReducer from './boardsReducer';
import listsReducer from './listsReducer';
import tasksReducer from './tasksReducer';

export { boardsReducer, listsReducer, tasksReducer };

const createRootReducer = history =>
	combineReducers({
		router: connectRouter(history),
		boards: boardsReducer,
		lists: listsReducer,
		tasks: tasksReducer
	});

export default createRootReducer;
