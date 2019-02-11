import React, { Component } from 'react';

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

	onCreate = e => {
		e.preventDefault();
		console.log(this.state.name);
	};

	render() {
		const { onCancel } = this.props;
		return (
			<div>
				<div>
					Creating a board<span onClick={onCancel}> X</span>
				</div>
				<form onSubmit={this.onCreate}>
					<label>What shall we call the board?</label>
					<input
						type="text"
						value={this.state.name}
						onChange={this.onChange}
						placeholder="Your new board's name"
					/>
					<button onClick={onCancel}>Cancel</button>
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
				return <RenderFullButton onCancel={this.collapseButton} />;
		}
	}
}

export default AddBoardButton;
