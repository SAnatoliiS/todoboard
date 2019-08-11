import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { progressStatuses } from '../../config';
import {
	changeTaskProgressStatus,
	removeTask
} from '../../actions/tasksActions';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
	changeTaskProgressStatus: taskId =>
		dispatch(changeTaskProgressStatus(taskId)),
	removeTask: (taskId, listId) => dispatch(removeTask(taskId, listId))
});

const Task = ({
	task: { text, progress, id, listId },
	changeTaskProgressStatus,
	removeTask,
	index
}) => {
	return (
		<Draggable draggableId={id} index={index}>
			{provided => (
				<div
					className={`task-container ${getTaskContainerColorClassName(
						progress
					)}`}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
					<div
						className={'task-checkbox-button'}
						onClick={onClick(id, changeTaskProgressStatus)}
					>
						{getTaskProgressIcon(progress)}
					</div>
					<div className={`task-title ${getTaskTitleTextClassName(progress)}`}>
						{text}
					</div>
					<div
						className={'task-close-button'}
						onClick={onRemove(id, listId, removeTask)}
					>
						✗
					</div>
				</div>
			)}
		</Draggable>
	);
};

const getTaskTitleTextClassName = progress => {
	switch (progress) {
		case progressStatuses.inProgress:
			return '';
		case progressStatuses.done:
			return 'task-title_done';
		default:
			throw new Error(
				'no such task progress. It might be: "IN_PROGRESS" or "DONE"'
			);
	}
};
const getTaskContainerColorClassName = progress => {
	switch (progress) {
		case progressStatuses.inProgress:
			return 'task-container-in_progress';
		case progressStatuses.done:
			return 'task-container-done';
		default:
			throw new Error(
				'no such task progress. It might be: "IN_PROGRESS" or "DONE"'
			);
	}
};
const onClick = (id, changeTaskProgressStatus) => () => {
	changeTaskProgressStatus(id);
};
const onRemove = (id, listId, removeTask) => () => {
	removeTask(id, listId);
};
const getTaskProgressIcon = progress => {
	switch (progress) {
		case progressStatuses.inProgress:
			return '○';
		case progressStatuses.done:
			return '✓';
		default:
			throw new Error(
				'no such task progress. It might be: "IN_PROGRESS" or "DONE"'
			);
	}
};

export default connect(
	null,
	mapDispatchToProps
)(Task);
