import React from 'react';
import Board from '../Board/Board';
import { connect } from 'react-redux';
import { activeBoardsSelector } from '../../selectors/boardsSelectors';
import AddBoardButton from '../AddBoardButton/AddBoardButton';

const mapStateToProps = state => ({
	boards: activeBoardsSelector(state)
});

function BoardsList({ boards }) {
	return (
		<div>
			<AddBoardButton />
			{boards.map(board => (
				<Board key={board.id} name={board.name} id={board.id} />
			))}
		</div>
	);
}

export default connect(mapStateToProps)(BoardsList);
