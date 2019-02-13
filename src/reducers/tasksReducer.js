import { handleActions } from 'redux-actions';
import * as tasksActions from '../actions/tasksActions';
import { listStatuses } from '../config';
import { cutItem, changeItemStatus } from '../utils/stateManipulations';

const defaultState = [
  {
    id: '1',
    text: 'Board',
    listId: '1',
    status: 'ACTIVE'
  },
  {
    id: '2',
    text: 'Fixators',
    listId: '1',
    status: 'ACTIVE'
  },
  {
    id: '3',
    text: 'Gloves',
    listId: '2',
    status: 'ACTIVE'
  }
];

export default handleActions(
  {
    // ADD_TASK reducer
    [tasksActions.addTask](state, { payload: task }) {
      return [...state, task];
    },
    // MOVE_TASK_TO_RECYCLE reducer
    [tasksActions.moveTaskToRecycle](state, { payload: taskId }) {
      return changeItemStatus(state, taskId, listStatuses.recycle);
    },
    // REMOVE_TASK reducer
    [tasksActions.removeTask](state, { payload: taskId }) {
      return cutItem(state, taskId);
    }
  },
  defaultState
);
