import * as boardsActions from '../actions/boardsActions';
import * as listsActions from '../actions/listsActions';
import * as tasksActions from '../actions/tasksActions';

export const removeBoardTree = boardId => (dispatch, getState) => {
	const state = getState();
	const lists = state.lists.filter(list => list.boardId === boardId);
	const tasksId = lists.reduce((acc, list) => {
		const tasksInList = list.tasksInList;
		return [...acc, ...tasksInList];
	}, []);
	const tasks = tasksId.map(taskId =>
		state.tasks.find(task => task.id === taskId)
	);
	tasks.forEach(task => {
		dispatch(tasksActions.removeTask(task.id, task.listId));
	});
	lists.forEach(list => {
		dispatch(listsActions.removeList(list.id));
	});
	dispatch(boardsActions.removeBoard(boardId));
};
