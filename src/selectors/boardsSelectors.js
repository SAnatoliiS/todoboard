import { createSelector } from "reselect";
import { boardStatuses } from "../config";

export const boardsSelector = state => state.boards;

export const activeBoardsSelector = createSelector(
  boardsSelector,
  boards => boards.filter(board => board.status === boardStatuses.active)
);

export const getFindBoardSelector = boardId =>
  createSelector(
    boardsSelector,
    boards => boards.find(board => board.id === boardId)
  );

export const getIdsOfListsInBoardSelector = boardId =>
  createSelector(
    getFindBoardSelector(boardId),
    board => board.listsInBoard
  );

export const getListsInBoardSelector = (boardId, lists) =>
  createSelector(
    getIdsOfListsInBoardSelector(boardId),
    listsInBoard => listsInBoard.map(id => lists.find(list => list.id === id))
  );
