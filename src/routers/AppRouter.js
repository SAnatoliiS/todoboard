import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { history } from '../store/configureStore';
import BoardsList from '../components/BoardsList/BoardsList';
import NotFoundPage from '../components/NotFoundPage/NotFoundPage';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ListsList from '../components/ListsList/ListsList';
import { replaceTask } from '../actions/tasksActions';

const mapDispatchToProps = dispatch => ({
	replaceTask: (taskId, newListId, newIndex) =>
		dispatch(replaceTask(taskId, newListId, newIndex))
});

const getOnDragEnd = replaceTask => result => {
	const { destination, source, draggableId } = result;

	if (!destination) {
		return;
	}
	if (
		destination.droppableId === source.droppableId &&
		destination.index === source.index
	) {
		return;
	}
	replaceTask(draggableId, destination.droppableId, destination.index);
};

const AppRouter = ({ replaceTask }) => (
	<ConnectedRouter history={history}>
		<DragDropContext onDragEnd={getOnDragEnd(replaceTask)}>
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
		</DragDropContext>
	</ConnectedRouter>
);

export default connect(
	null,
	mapDispatchToProps
)(AppRouter);
