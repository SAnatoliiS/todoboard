import { createAction } from 'redux-actions';
import uuid from 'uuid';
import { statuses } from '../config';

// ADD_TASK
export const addTask = createAction('ADD_TASK', (text, listId) => ({
  id: uuid(),
  text,
  listId,
  status: statuses.tasks.active
}));

// MOVE_TASK_TO_RECYCLE
export const moveTaskToRecycle = createAction('MOVE_TASK_TO_RECYCLE');

// REMOVE_TASK
export const removeTask = createAction('REMOVE_TASK');
