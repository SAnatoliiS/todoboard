import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './styles/styles.scss';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore';
import Router from './routers/AppRouter';

const store = configureStore();
const app = (
	<Provider store={store}>
		<Router />
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
