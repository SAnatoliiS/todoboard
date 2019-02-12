import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { moveBoardToRecycle } from '../../actions/boardsActions';

const mapDispatchToProps = dispatch => ({
	moveBoardToRecycle: boardId => dispatch(moveBoardToRecycle(boardId))
});

function Board({ name, id, moveBoardToRecycle }) {
	const onClickDelete = id => () => {
		moveBoardToRecycle(id);
	};
	return (
		<div>
			<div>
				<Link to={`/board/${id}`}>{name}</Link>

				<span onClick={onClickDelete(id)}>X</span>
			</div>
		</div>
	);
}

export default connect(
	null,
	mapDispatchToProps
)(Board);
