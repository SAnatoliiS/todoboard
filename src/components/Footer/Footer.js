import React from 'react';
import imgRecycleBin from './recycleBin.jpg';
import imgRestore from './restore.png';
import imgDelete from './delete.png';
import { getRecycleItems } from '../../selectors/selectors';
import { connect } from 'react-redux';
import { restoreBoard } from '../../actions/boardsActions';
import { restoreList } from '../../actions/listsActions';
import { removeBoardTree } from '../../thunks/boardThunks';
import { removeListTree } from '../../thunks/listThunks';

const mapStateToProps = state => ({
	recycleBoards: getRecycleItems('boards')(state),
	recycleLists: getRecycleItems('lists')(state)
});

const mapDispatchToProps = dispatch => ({
	restoreBoard: boardId => dispatch(restoreBoard(boardId)),
	restoreList: boardId => dispatch(restoreList(boardId)),
	removeBoard: boardId => dispatch(removeBoardTree(boardId)),
	removeList: boardId => dispatch(removeListTree(boardId))
});

class Footer extends React.Component {
	state = {
		isRecycleBinOpen: false
	};

	toggleRecycleBin = () => {
		this.setState({ isRecycleBinOpen: !this.state.isRecycleBinOpen });
	};
	onRestoreBoard = boardid => () => {
		this.props.restoreBoard(boardid);
	};
	onRestoreList = listid => () => {
		this.props.restoreList(listid);
	};
	onRemoveBoard = boardid => () => {
		this.props.removeBoard(boardid);
	};
	onRemoveList = listid => () => {
		this.props.removeList(listid);
	};
	render() {
		return (
			<div>
				<img
					src={imgRecycleBin}
					height={63}
					width={52}
					alt="recycle"
					onClick={this.toggleRecycleBin}
				/>
				{this.state.isRecycleBinOpen && (
					<div>
						<div>
							{this.props.recycleBoards.map(board => (
								<div key={board.id}>
									<div>
										{board.name}
										<img
											src={imgRestore}
											height={20}
											width={20}
											alt="restore"
											onClick={this.onRestoreBoard(board.id)}
										/>
										<img
											src={imgDelete}
											height={20}
											width={20}
											alt="remove"
											onClick={this.onRemoveBoard(board.id)}
										/>
									</div>
								</div>
							))}
						</div>
						<div>
							{this.props.recycleLists.map(list => (
								<div key={list.id}>
									<div>
										{list.name}
										<img
											src={imgRestore}
											height={20}
											width={20}
											alt="restore"
											onClick={this.onRestoreList(list.id)}
										/>
										<img
											src={imgDelete}
											height={20}
											width={20}
											alt="remove"
											onClick={this.onRemoveList(list.id)}
										/>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Footer);
