import React from 'react';
import { connect } from 'react-redux';
import { getActiveChildren, findItem } from '../../selectors/selectors';
import RenderList from '../List/List';
import AddListButton from '../AddListButton/AddListButton';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

const mapStateToProps = (state, props) => {
	const board = findItem('boards', props.match.params.id)(state);
	return {
		board,
		activeLists:
			board &&
			getActiveChildren('boards', props.match.params.id, state.lists)(state),
		error: !board && 'Board not found'
	};
};

function ListsList({ activeLists, error, board }) {
	if (error) {
		return <NotFoundPage message={error} />;
	}
	return (
		<div className={'listsList-container'}>
			<div className={'listsList-header-container'}>
				<div className={'listsList-header'}>{board.name}</div>
			</div>
			<div className={'listsList-body'}>
				{activeLists.map(list => (
					<RenderList key={list.id} list={list} />
				))}
				<AddListButton boardId={board.id} />
			</div>
		</div>
	);
}

export default connect(mapStateToProps)(ListsList);
