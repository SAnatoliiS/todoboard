import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../store/configureStore';
import BoardsList from '../components/BoardsList/BoardsList';
import NotFoundPage from '../components/NotFoundPage/NotFoundPage';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ListsList from '../components/ListsList/ListsList';

const AppRouter = ({ replaceTask }) => (
	<ConnectedRouter history={history}>
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
	</ConnectedRouter>
);

export default AppRouter;
