import { createAction } from 'redux-actions';
import uuid from 'uuid';
import { boardStatuses } from '../config';

// ADD_BOARD
export const addBoard = createAction('ADD_BOARD', name => ({
	id: uuid(),
	name,
	status: boardStatuses.active,
	listsInBoard: []
}));

// MOVE_BOARD_TO_RECYCLE
export const moveBoardToRecycle = createAction('MOVE_BOARD_TO_RECYCLE');

// REMOVE_BOARD
export const removeBoard = createAction('REMOVE_BOARD');
