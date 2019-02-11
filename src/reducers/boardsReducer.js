import { handleActions } from 'redux-actions';
import * as boardsActions from '../actions/boardsActions';
import { boardStatuses } from '../config';
import { cutItem, changeItemStatus } from '../utils/stateManipulations';

const defaultState = [
	{
		id: 1,
		name: 'Sports',
		status: 'ACTIVE',
		listsInBoard: [1, 2]
	},
	{
		id: 2,
		name: 'Hobbies',
		status: 'ACTIVE',
		listsInBoard: []
	},
	{
		id: 3,
		name: 'Plans',
		status: 'ACTIVE',
		listsInBoard: [3]
	}
];

export default handleActions(
	{
		// ADD_BOARD reducer
		[boardsActions.addBoard](state, { payload: board }) {
			return [...state, board];
		},
		// MOVE_BOARD_TO_RECYCLE reducer
		[boardsActions.moveBoardToRecycle](state, { payload: boardId }) {
			return changeItemStatus(state, boardId, boardStatuses.recycle);
		},
		// REMOVE_BOARD reducer
		[boardsActions.removeBoard](state, { payload: boardId }) {
			return cutItem(state, boardId);
		}
	},
	defaultState
);