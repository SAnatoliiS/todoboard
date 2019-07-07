import React from 'react';
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

const getTaskProgressIcon = progress => {
	switch (progress) {
		case progressStatuses.inProgress:
			return '○';
		case progressStatuses.done:
			return '✓';
		default:
			throw new Error(
				'no such task status. It might be: "ACTIVE", "RECYCLE" or "DONE"'
			);
	}
};

function Task({
	task: { text, progress, id, listId },
	changeTaskProgressStatus,
	removeTask
}) {
	const onClick = id => () => {
		changeTaskProgressStatus(id);
	};
	const onRemove = (id, listId) => () => {
		removeTask(id, listId);
	};
	return (
		<div className={'task-container'}>
			<div className={'task-checkbox-button'} onClick={onClick(id)}>
				{getTaskProgressIcon(progress)}
			</div>
			<div className={'task-title'}>{text}</div>
			<div className={'task-close-button'} onClick={onRemove(id, listId)}>
				{' '}
				x
			</div>
		</div>
	);
}

export default connect(
	null,
	mapDispatchToProps
)(Task);
