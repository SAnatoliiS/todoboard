import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addList } from '../../actions/listsActions';

const mapDispatchToProps = dispatch => ({
	addList: (name, boardId) => dispatch(addList(name, boardId))
});

const SmallButton = ({ expandButton }) => (
	<div
		onClick={expandButton}
		className={'list-container add-list-small-button'}
	>
		Add a list...
	</div>
);

class Form extends Component {
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
		this.props.addList(this.state.name, this.props.boardId);
		this.props.collapseButton();
	};

	onKeyDown = ({ ...e }) => {
		if (e.key === 'Escape') {
			this.props.collapseButton();
		}
	};

	render() {
		return (
			<div className={'list-container add-list-form-container'}>
				<form onSubmit={this.onSubmit} className={'add-list-form'}>
					<input
						type="text"
						value={this.state.name}
						onChange={this.onChange}
						placeholder="Add a list..."
						className={'add-list-form-input'}
						onKeyDown={this.onKeyDown}
					/>
				</form>
				<div
					className="list-header--remove-button"
					onClick={this.props.collapseButton}
				>
					✖
				</div>
			</div>
		);
	}
}

const AddListForm = connect(
	null,
	mapDispatchToProps
)(Form);

export class AddListButton extends Component {
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
			case 'full':
				return (
					<AddListForm
						collapseButton={this.collapseButton}
						boardId={this.props.boardId}
					/>
				);
			case 'small':
			default:
				return <SmallButton expandButton={this.expandButton} />;
		}
	}
}

export default AddListButton;
