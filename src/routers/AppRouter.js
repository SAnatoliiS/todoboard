import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import BoardsList from '../components/BoardsList/BoardsList';
import NotFoundPage from '../components/NotFoundPage/NotFoundPage';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ListsList from '../components/ListsList/ListsList';

export const history = createHistory();

const AppRouter = () => (
	<Router history={history}>
		<div className={'app-container'}>
			<Header />
			<div className={'app-body'}>
				<Switch>
					<Route path="/" exact component={BoardsList} />
					<Route path="/board/:id" component={ListsList} />
					<Route component={NotFoundPage} />
				</Switch>
			</div>
			<Footer />
		</div>
	</Router>
);

export default AppRouter;
