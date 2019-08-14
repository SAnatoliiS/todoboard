import { handleActions } from 'redux-actions';
import * as boardsActions from '../actions/boardsActions';
import * as listsActions from '../actions/listsActions';
import { statuses } from '../config';
import {
	cutItem,
	changeItemStatus,
	addItemToParentList,
	cutChild
} from '../utils/stateManipulations';

const defaultState = [
	{
		id: 'board-1',
		name: 'Sports',
		status: 'ACTIVE',
		listsInBoard: ['list-1', 'list-2']
	},
	{
		id: 'board-2',
		name: 'Hobbies',
		status: 'ACTIVE',
		listsInBoard: []
	},
	{
		id: 'board-3',
		name: 'Plans',
		status: 'ACTIVE',
		listsInBoard: ['list-3']
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
			return changeItemStatus(state, boardId, statuses.boards.recycle);
		},
		// REMOVE_BOARD reducer
		[boardsActions.removeBoard](state, { payload: boardId }) {
			return cutItem(state, boardId);
		},
		// RESTORE_BOARD reducer
		[boardsActions.restoreBoard](state, { payload: boardId }) {
			return changeItemStatus(state, boardId, statuses.boards.active);
		},
		// ADD_LIST reducer
		[listsActions.addList](state, { payload: list }) {
			return addItemToParentList(state, 'list', list.boardId, list.id);
		},
		// REMOVE_LIST reducer
		[listsActions.removeList](state, { payload: listId }) {
			return cutChild(state, 'list', listId);
		}
	},
	defaultState
);
