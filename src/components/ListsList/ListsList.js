import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import { getActiveChildren, findItem } from '../../selectors/selectors';
import RenderList from '../List/List';
import AddListButton from '../AddListButton/AddListButton';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { replaceTask } from '../../actions/tasksActions';

const mapStateToProps = (state, props) => {
	const board = findItem('boards', props.match.params.id)(state);
	return {
		board,
		activeLists:
			board &&
			getActiveChildren('boards', props.match.params.id, state.lists)(state),
		error: !board && 'Board not found'
	};
};

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

const ListsList = ({ activeLists, error, board, replaceTask }) => {
	if (error) {
		return <NotFoundPage message={error} />;
	}
	return (
		<DragDropContext onDragEnd={getOnDragEnd(replaceTask)}>
			<div className={'listsList-container'}>
				<div className={'listsList-header-container'}>
					<Link className={'listsList-header'} to="/">
						{board.name}
					</Link>
				</div>
				<div className={'listsList-body'}>
					{activeLists.map(list => (
						<RenderList key={list.id} list={list} />
					))}
					<AddListButton boardId={board.id} />
				</div>
			</div>
		</DragDropContext>
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ListsList);
