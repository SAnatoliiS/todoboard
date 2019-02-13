import React from 'react';
import { connect } from 'react-redux';
import { getChildren, getActiveChildren } from '../../selectors/selectors';
import RenderList from '../List/List';
import AddListButton from '../AddListButton/AddListButton';

const mapStateToProps = (state, props) => ({
  activeLists: getActiveChildren('boards', props.match.params.id, state.lists)(
    state
  ),
  boardId: props.match.params.id
});

function ListsList({ lists, boardId, activeLists }) {
  return (
    <div>
      {activeLists.map(list => (
        <RenderList key={list.id} list={list} />
      ))}
      <AddListButton boardId={boardId} />
    </div>
  );
}

export default connect(mapStateToProps)(ListsList);
