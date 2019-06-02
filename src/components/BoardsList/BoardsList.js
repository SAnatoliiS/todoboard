import React from 'react';
import Board from '../Board/Board';
import { connect } from 'react-redux';
import { getActiveItems } from '../../selectors/selectors';
import AddBoardButton from '../AddBoardButton/AddBoardButton';

const mapStateToProps = state => ({
	boards: getActiveItems('boards')(state)
});

function BoardsList({ boards }) {
	return (
		<div className={'board_list-container'}>
			<AddBoardButton />
			{boards.map(board => (
				<Board key={board.id} name={board.name} id={board.id} />
			))}
		</div>
	);
}

export default connect(mapStateToProps)(BoardsList);
