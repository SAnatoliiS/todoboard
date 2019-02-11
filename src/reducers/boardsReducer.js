import { handleActions } from 'redux-actions';
import * as boardsActions from '../actions/boardsActions';
import { boardStatuses } from '../config';

const defaultState = [
	{
		id: 1,
		name: 'Sports',
		status: 'ACTIVE'
	},
	{
		id: 2,
		name: 'Hobbies',
		status: 'ACTIVE'
	},
	{
		id: 3,
		name: 'Plans',
		status: 'ACTIVE'
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
			const targetBoard = state.find(board => board.id === boardId);
			const restBoards = state.filter(board => board.id !== boardId);
			const updatedBoard = { ...targetBoard, status: boardStatuses.recycle };
			return [...restBoards, updatedBoard];
		},
		// REMOVE_BOARD reducer
		[boardsActions.removeBoard](state, { payload: boardId }) {
			const newState = state.filter(board => board.id !== boardId);
			return newState;
		}
	},
	defaultState
);
