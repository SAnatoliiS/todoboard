import React from 'react';
import { connect } from 'react-redux';
import { getListsInBoardSelector } from '../../selectors/boardsSelectors';
import RenderList from '../List/List';

const mapStateToProps = (state, props) => ({
	lists: getListsInBoardSelector(+props.match.params.id, state.lists)(state)
});

function ListsList({ lists }) {
	return (
		<div>
			{lists.map(list => (
				<RenderList list={list} />
			))}
		</div>
	);
}

export default connect(mapStateToProps)(ListsList);
