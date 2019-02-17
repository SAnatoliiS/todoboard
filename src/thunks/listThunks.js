import * as listsActions from '../actions/listsActions';
import * as tasksActions from '../actions/tasksActions';

export const removeListTree = listId => (dispatch, getState) => {
	const state = getState();
	const tasks = state.tasks.filter(task => task.listId === listId);
	console.log(tasks);
	tasks.forEach(task =>
		dispatch(tasksActions.removeTask(task.id, task.listId))
	);
	dispatch(listsActions.removeList(listId));
};
