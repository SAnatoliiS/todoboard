import React from 'react';
import { connect } from 'react-redux';
import { getListsInBoardSelector } from '../../selectors/boardsSelectors';
import RenderList from '../List/List';
import AddListButton from '../AddListButton/AddListButton'

const mapStateToProps = (state, props) => ({
	lists: getListsInBoardSelector(props.match.params.id, state.lists)(state)
});

function ListsList({ lists }) {
	return (
		<div>
			{lists.map(list => (
				<RenderList list={list} />
			))}
			<AddListButton />
		</div>
	);
}

export default connect(mapStateToProps)(ListsList);
