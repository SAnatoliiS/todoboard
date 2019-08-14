import { handleActions } from 'redux-actions';
import * as tasksActions from '../actions/tasksActions';
import { cutItem, changeItemProgressStatus } from '../utils/stateManipulations';

const defaultState = [
	{
		id: 'task-1',
		text: 'Board',
		listId: 'list-1',
		status: 'ACTIVE',
		progress: 'IN_PROGRESS'
	},
	{
		id: 'task-2',
		text: 'Fixators',
		listId: 'list-1',
		status: 'ACTIVE',
		progress: 'DONE'
	},
	{
		id: 'task-3',
		text: 'Gloves',
		listId: 'list-2',
		status: 'ACTIVE',
		progress: 'IN_PROGRESS'
	}
];

export default handleActions(
	{
		// ADD_TASK reducer
		[tasksActions.addTask](state, { payload: task }) {
			return [...state, task];
		},
		// REMOVE_TASK reducer
		[tasksActions.removeTask](
			state,
			{
				payload: { taskId }
			}
		) {
			return cutItem(state, taskId);
		},
		// CHANGE_TASK_PROGRESS_STATUS reducer
		[tasksActions.changeTaskProgressStatus](state, { payload: taskId }) {
			return changeItemProgressStatus(state, taskId);
		},
		// REPLACE_TASK reducer
		[tasksActions.replaceTask](state, { payload }) {
			return state.map(task => {
				if (task.id === payload.taskId) {
					return { ...task, listId: payload.newListId };
				}
				return task;
			});
		}
	},
	defaultState
);
