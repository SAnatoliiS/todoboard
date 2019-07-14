import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { moveBoardToRecycle } from '../../actions/boardsActions';

const mapDispatchToProps = dispatch => ({
	moveBoardToRecycle: boardId => dispatch(moveBoardToRecycle(boardId))
});

function Board({ name, id, moveBoardToRecycle }) {
	const onClickDelete = id => event => {
		event.preventDefault();
		moveBoardToRecycle(id);
	};
	return (
		<Link className={'board'} to={`/board/${id}`}>
			<div className={'board-button-close'} onClick={onClickDelete(id)}>
				✖
			</div>
			<div className={'board-content'}>{name}</div>
		</Link>
	);
}

export default connect(
	null,
	mapDispatchToProps
)(Board);
