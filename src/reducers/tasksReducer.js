import { handleActions } from 'redux-actions';
import * as tasksActions from '../actions/tasksActions';
import { cutItem, changeItemProgressStatus } from '../utils/stateManipulations';

const defaultState = [
	{
		id: '1',
		text: 'Board',
		listId: '1',
		status: 'ACTIVE',
		progress: 'IN_PROGRESS'
	},
	{
		id: '2',
		text: 'Fixators',
		listId: '1',
		status: 'ACTIVE',
		progress: 'DONE'
	},
	{
		id: '3',
		text: 'Gloves',
		listId: '2',
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
		}
	},
	defaultState
);
