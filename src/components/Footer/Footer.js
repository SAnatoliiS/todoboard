import React from 'react';
import imgRecycleBin from './recycleBin.png';
import imgRestore from './restore.png';
import imgDelete from './delete.png';
import {
	getRecycleItems,
	getRecycleInstanceType
} from '../../selectors/selectors';
import { connect } from 'react-redux';
import { restoreBoard } from '../../actions/boardsActions';
import { restoreList } from '../../actions/listsActions';
import { removeBoardTree } from '../../thunks/boardThunks';
import { removeListTree } from '../../thunks/listThunks';

const mapStateToProps = state => ({
	instanceType: getRecycleInstanceType()(state),
	recycleItems: getRecycleItems()(state)
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
		const footerContainerClassName = [
			'footer-container',
			!this.state.isRecycleBinOpen && 'footer-container-hidden'
		].join(' ');
		return (
			<div className={footerContainerClassName}>
				<div onClick={this.toggleRecycleBin} className={'footer-button'}>
					<img className={'footer-image'} src={imgRecycleBin} alt="recycle" />
				</div>
				{renderRecycle(
					this.props.instanceType,
					this.props.recycleItems,
					this.onRestoreBoard,
					this.onRemoveBoard,
					this.onRestoreList,
					this.onRemoveList
				)}
			</div>
		);
	}
}

const renderRecycle = (
	instanceType,
	recycleItems,
	onRestoreBoard,
	onRemoveBoard,
	onRestoreList,
	onRemoveList
) => {
	if (instanceType.type === 'boards') {
		return renderBoardListRecycleList(
			recycleItems,
			onRestoreBoard,
			onRemoveBoard
		);
	} else if (instanceType.type === 'lists') {
		return renderListsListRecycleList(
			recycleItems,
			onRestoreList,
			onRemoveList
		);
	}
	return null;
};

const renderBoardListRecycleList = (
	recycleBoards,
	onRestoreBoard,
	onRemoveBoard
) => {
	return (
		<div className={'footer-recycle-list-container'}>
			<div className={'footer-recycle-list'}>
				{recycleBoards.map(board => (
					<div
						key={board.id}
						className={'footer-recycle-item footer-recycle-item--board'}
					>
						<img
							className={'footer-recycle-restore-button'}
							src={imgRestore}
							height={20}
							width={20}
							alt="restore"
							onClick={onRestoreBoard(board.id)}
						/>
						<div className={'footer-recycle-item-name'}>{board.name}</div>
						<img
							className={'footer-recycle-delete-button'}
							src={imgDelete}
							height={20}
							width={20}
							alt="remove"
							onClick={onRemoveBoard(board.id)}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

const renderListsListRecycleList = (
	recycleLists,
	onRestoreList,
	onRemoveList
) => {
	return (
		<div className={'footer-recycle-list-container'}>
			<div className={'footer-recycle-list'}>
				{recycleLists.map(list => (
					<div
						key={list.id}
						className={'footer-recycle-item footer-recycle-item--list'}
					>
						<img
							className={'footer-recycle-restore-button'}
							src={imgRestore}
							height={20}
							width={20}
							alt="restore"
							onClick={onRestoreList(list.id)}
						/>
						<div className={'footer-recycle-item-name'}>{list.name}</div>
						<img
							className={'footer-recycle-delete-button'}
							src={imgDelete}
							height={20}
							width={20}
							alt="remove"
							onClick={onRemoveList(list.id)}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Footer);
