import { handleActions } from 'redux-actions';
import * as listsActions from '../actions/listsActions';
import { listStatuses } from '../config';
import { cutItem, changeItemStatus } from '../utils/stateManipulations';

const defaultState = [
  {
    id: '1',
    name: 'Snowboard',
    boardId: '1',
    status: 'ACTIVE',
    tasksInList: []
  },
  {
    id: '2',
    name: 'Footbal',
    boardId: '1',
    status: 'ACTIVE',
    tasksInList: []
  },
  {
    id: '3',
    name: 'Go to shop',
    boardId: '3',
    status: 'ACTIVE',
    tasksInList: []
  }
];

export default handleActions(
  {
    // ADD_LIST reducer
    [listsActions.addList](state, { payload: list }) {
      return [...state, list];
    },
    // MOVE_LIST_TO_RECYCLE reducer
    [listsActions.moveListToRecycle](state, { payload: listId }) {
      return changeItemStatus(state, listId, listStatuses.recycle);
    },
    // REMOVE_LIST reducer
    [listsActions.removeList](state, { payload: listId }) {
      return cutItem(state, listId);
    }
  },
  defaultState
);
