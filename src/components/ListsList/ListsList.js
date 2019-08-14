import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { getActiveChildren, findItem } from '../../selectors/selectors';
import RenderList from '../List/List';
import AddListButton from '../AddListButton/AddListButton';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { replaceTask } from '../../actions/tasksActions';
import { replaceList } from '../../actions/listsActions';

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
		dispatch(replaceTask(taskId, newListId, newIndex)),
	replaceList: (listId, newIndex) => dispatch(replaceList(listId, newIndex))
});

const getOnDragEnd = (replaceTask, replaceList) => result => {
	const { destination, source, draggableId, type } = result;
	if (!destination) {
		return;
	}
	if (type === 'task') {
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}
		replaceTask(draggableId, destination.droppableId, destination.index);
	} else if (type === 'list') {
		if (destination.index === source.index) {
			return;
		}
		replaceList(draggableId, destination.index);
	}
};

const ListsList = ({ activeLists, error, board, replaceTask, replaceList }) => {
	if (error) {
		return <NotFoundPage message={error} />;
	}
	return (
		<DragDropContext onDragEnd={getOnDragEnd(replaceTask, replaceList)}>
			<Droppable
				droppableId={`listsList-${board.id}`}
				type={'list'}
				direction={'horizontal'}
			>
				{provided => (
					<div
						{...provided.droppableProps}
						ref={provided.innerRef}
						className={'listsList-container'}
					>
						<div className={'listsList-header-container'}>
							<Link className={'listsList-header'} to="/">
								{board.name}
							</Link>
						</div>
						<div className={'listsList-body'}>
							{activeLists.map((list, index) => (
								<RenderList key={list.id} list={list} index={index} />
							))}
							{provided.placeholder}
							<AddListButton boardId={board.id} />
						</div>
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ListsList);
