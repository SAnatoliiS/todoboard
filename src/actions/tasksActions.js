import { createAction } from 'redux-actions';
import uuid from 'uuid';
import { progressStatuses } from '../config';

// ADD_TASK
export const addTask = createAction('ADD_TASK', (text, listId) => ({
	id: uuid(),
	text,
	listId,
	progress: progressStatuses.inProgress
}));

// REMOVE_TASK
export const removeTask = createAction('REMOVE_TASK', (taskId, listId) => ({
	taskId,
	listId
}));

//CHANGE_TASK_PROGRESS_STATUS
export const changeTaskProgressStatus = createAction(
	'CHANGE_TASK_PROGRESS_STATUS'
);

// REPLACE_TASK
export const replaceTask = createAction(
	'REPLACE_TASK',
	(taskId, newListId, newIndex) => ({
		taskId,
		newListId,
		newIndex
	})
);
