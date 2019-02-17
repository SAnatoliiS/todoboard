import * as listsActions from '../actions/listsActions';
import * as tasksActions from '../actions/tasksActions';
import { progressStatuses } from '../config';

const findTasks = (allTasks, listId) =>
	allTasks.filter(task => task.listId === listId);

export const removeListTree = listId => (dispatch, getState) => {
	const state = getState();
	const tasks = findTasks(state.tasks, listId);
	tasks.forEach(task =>
		dispatch(tasksActions.removeTask(task.id, task.listId))
	);
	dispatch(listsActions.removeList(listId));
};

export const clearCompletedTasks = listId => (dispatch, getState) => {
	const state = getState();
	const tasks = findTasks(state.tasks, listId);
	const completedTasks = tasks.filter(
		task => task.progress === progressStatuses.done
	);
	console.log(completedTasks);
	completedTasks.forEach(task =>
		dispatch(tasksActions.removeTask(task.id, task.listId))
	);
};
