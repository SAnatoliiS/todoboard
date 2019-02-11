import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addBoard } from '../../actions/boardsActions';

const mapDispatchToProps = dispatch => ({
	addBoard: board => dispatch(addBoard(board))
});

const RenderSmallButton = ({ onClick }) => {
	return <div onClick={onClick}>Add board</div>;
};

class RenderFullButton extends Component {
	state = {
		name: ''
	};

	onChange = e => {
		const name = e.target.value;
		this.setState({ name });
	};

	onSubmit = e => {
		e.preventDefault();
		this.props.addBoard(this.state.name);
		this.props.collapseButton();
		this.setState({ name: '' });
	};

	render() {
		const { collapseButton } = this.props;
		return (
			<div>
				<div>
					Creating a board<span onClick={collapseButton}> X</span>
				</div>
				<form onSubmit={this.onSubmit}>
					<label>What shall we call the board?</label>
					<input
						type="text"
						value={this.state.name}
						onChange={this.onChange}
						placeholder="Your new board's name"
					/>
					<button onClick={collapseButton}>Cancel</button>
					<input type="submit" value="Create" />
				</form>
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
					<RenderFullButton
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
