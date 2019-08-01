import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../reducers/reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createBrowserHistory();

const configureStore = preloadedState => {
	const store = createStore(
		createRootReducer(history),
		preloadedState,
		composeEnhancers(applyMiddleware(routerMiddleware(history), thunk))
	);

	return store;
};

export default configureStore;
