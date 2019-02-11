import { createSelector } from 'reselect';
import { boardStatuses } from '../config';

export const boardsSelector = state => state.boards;

export const activeBoardsSelector = createSelector(
	boardsSelector,
	boards => boards.filter(board => board.status === boardStatuses.active)
);
