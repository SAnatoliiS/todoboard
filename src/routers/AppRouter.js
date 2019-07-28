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
	<div className={'app-router-container'}>
		<Router history={history}>
			<div className={'app-container'}>
				<Header className={'app-header'} />
				<div className={'app-body'}>
					<Switch>
						<Route path="/" exact component={BoardsList} />
						<Route path="/board/:id" component={ListsList} />
						<Route component={NotFoundPage} />
					</Switch>
				</div>
				<Footer className={'app-footer'} />
			</div>
		</Router>
	</div>
);

export default AppRouter;
