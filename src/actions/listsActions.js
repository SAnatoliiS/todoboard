import { createAction } from 'redux-actions';
import uuid from 'uuid';
import { statuses } from '../config';

// ADD_LIST
export const addList = createAction('ADD_LIST', (name, boardId) => ({
	id: `list-${uuid()}`,
	name,
	boardId,
	status: statuses.lists.active,
	tasksInList: []
}));

// MOVE_LIST_TO_RECYCLE
export const moveListToRecycle = createAction('MOVE_LIST_TO_RECYCLE');

// REMOVE_LIST
export const removeList = createAction('REMOVE_LIST');

// RESTORE_LIST
export const restoreList = createAction('RESTORE_LIST');

// REPLACE_LIST
export const replaceList = createAction('REPLACE_LIST', (listId, newIndex) => ({
	listId,
	newIndex
}));
