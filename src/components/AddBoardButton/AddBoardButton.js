import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addBoard } from '../../actions/boardsActions';

const mapDispatchToProps = dispatch => ({
	addBoard: board => dispatch(addBoard(board))
});

const RenderSmallButton = ({ onClick }) => {
	return (
		<div className={'board small-button-container'} onClick={onClick}>
			<div className={'small-button-content'}>Add board...</div>
		</div>
	);
};

class AddBoardForm extends Component {
	state = {
		name: ''
	};

	onChange = ({ ...e }) => {
		const name = e.target.value;

		/** Insert "Enter" */
		if (e.nativeEvent.inputType === 'insertLineBreak') {
			if (name.trim().length) {
				this.onSubmit();
				return;
			}
			return;
		}

		this.setState({
			name: name.trim().length ? name : ''
		});
	};

	onSubmit = e => {
		e.preventDefault();
		if (!this.state.name) {
			return;
		}
		this.props.addBoard(this.state.name);
		this.props.collapseButton();
	};

	onKeyDown = ({ ...e }) => {
		if (e.key === 'Escape') {
			this.props.collapseButton();
		}
	};

	render() {
		const { collapseButton } = this.props;
		return (
			<div className={'board add-board-form-container'}>
				<div className={'add-board-form-header'}>
					<div className={'add-board-form-header-content'}>
						Creating a board
					</div>
					<div
						className={'add-board-form-collapse-button'}
						onClick={collapseButton}
					>
						✖
					</div>
				</div>
				<div>What shall we call the board?</div>
				<form onSubmit={this.onSubmit} onKeyDown={this.onKeyDown}>
					<input
						type="text"
						value={this.state.name}
						onChange={this.onChange}
						placeholder="Your new board's name"
					/>
				</form>
				<button onClick={collapseButton}>Cancel</button>
				<button onClick={this.onSubmit}>Create</button>
			</div>
		);
	}
}

export class AddBoardButton extends Component {
	state = {
		view: 'small'
	};

	expandButton = () => {
		this.setState({ view: 'full' });
	};

	collapseButton = () => {
		this.setState({ view: 'small' });
	};

	render() {
		switch (this.state.view) {
			case 'small':
				return <RenderSmallButton onClick={this.expandButton} />;
			case 'full':
				return (
					<AddBoardForm
						addBoard={this.props.addBoard}
						collapseButton={this.collapseButton}
					/>
				);
			default:
				return <RenderSmallButton onClick={this.expandButton} />;
		}
	}
}

export default connect(
	null,
	mapDispatchToProps
)(AddBoardButton);
