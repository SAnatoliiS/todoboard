import React from "react";
import { connect } from "react-redux";
import { getListsInBoardSelector } from "../../selectors/boardsSelectors";
import RenderList from "../List/List";
import AddListButton from "../AddListButton/AddListButton";

const mapStateToProps = (state, props) => ({
  lists: getListsInBoardSelector(props.match.params.id, state.lists)(state),
  boardId: props.match.params.id
});

function ListsList({ lists, boardId }) {
  return (
    <div>
      {lists.map(list => (
        <RenderList key={list.id} list={list} />
      ))}
      <AddListButton boardId={boardId} />
    </div>
  );
}

export default connect(mapStateToProps)(ListsList);
