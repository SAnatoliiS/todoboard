import { handleActions } from 'redux-actions';
import * as listsActions from '../actions/listsActions';
import * as tasksActions from '../actions/tasksActions';
import { statuses } from '../config';
import {
	cutItem,
	changeItemStatus,
	addItemToParentList,
	cutChild,
	replaceChild
} from '../utils/stateManipulations';

const defaultState = [
	{
		id: 'list-1',
		name: 'Snowboard',
		boardId: 'board-1',
		status: 'ACTIVE',
		tasksInList: ['task-1', 'task-2']
	},
	{
		id: 'list-2',
		name: 'Footbal',
		boardId: 'board-1',
		status: 'ACTIVE',
		tasksInList: ['task-3']
	},
	{
		id: 'list-3',
		name: 'Go to shop',
		boardId: 'board-3',
		status: 'ACTIVE',
		tasksInList: []
	}
];

export default handleActions(
	{
		// ADD_LIST reducer
		[listsActions.addList](state, { payload: list }) {
			return [...state, list];
		},
		// MOVE_LIST_TO_RECYCLE reducer
		[listsActions.moveListToRecycle](state, { payload: listId }) {
			return changeItemStatus(state, listId, statuses.lists.recycle);
		},
		// REMOVE_LIST reducer
		[listsActions.removeList](state, { payload: listId }) {
			return cutItem(state, listId);
		},
		// RESTORE_LIST reducer
		[listsActions.restoreList](state, { payload: listId }) {
			return changeItemStatus(state, listId, statuses.lists.active);
		},
		// ADD_TASK reducer
		[tasksActions.addTask](state, { payload: task }) {
			return addItemToParentList(state, 'task', task.listId, task.id, null);
		},
		// REMOVE_TASK reducer
		[tasksActions.removeTask](
			state,
			{
				payload: { listId, taskId }
			}
		) {
			return cutChild(state, 'task', taskId);
		},
		// REPLACE_TASK reducer
		[tasksActions.replaceTask](state, { payload }) {
			const { taskId, newListId, newIndex } = payload;
			return replaceChild(state, 'task', taskId, newListId, newIndex);
		}
	},
	defaultState
);
