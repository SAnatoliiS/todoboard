import { createAction } from 'redux-actions';
import uuid from 'uuid';
import { statuses } from '../config';

// ADD_BOARD
export const addBoard = createAction('ADD_BOARD', name => ({
	id: uuid(),
	name,
	status: statuses.boards.active,
	listsInBoard: []
}));

// MOVE_BOARD_TO_RECYCLE
export const moveBoardToRecycle = createAction('MOVE_BOARD_TO_RECYCLE');

// REMOVE_BOARD
export const removeBoard = createAction('REMOVE_BOARD');

// RESTORE_BOARD
export const restoreBoard = createAction('RESTORE_BOARD');
