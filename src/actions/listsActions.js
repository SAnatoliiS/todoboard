import { createAction } from 'redux-actions';
import uuid from 'uuid';
import { listStatuses } from '../config';

// ADD_LIST
export const addList = createAction('ADD_LIST', (name, boardId) => ({
	id: uuid(),
	name,
	boardId,
	status: listStatuses.active,
	tasksInList: []
}));

// MOVE_LIST_TO_RECYCLE
export const moveListToRecycle = createAction('MOVE_LIST_TO_RECYCLE');

// REMOVE_LIST
export const removeList = createAction('REMOVE_LIST');
