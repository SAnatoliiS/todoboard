import React from 'react';
import { connect } from 'react-redux';
import { getListsInBoardSelector } from '../../selectors/boardsSelectors';

const mapStateToProps = (state, props) => ({
	lists: getListsInBoardSelector(props.match.params.id, state.lists)(state)
});

function ListsList(props) {
	return <div>{JSON.stringify(props.lists)}</div>;
}

export default connect(mapStateToProps)(ListsList);
