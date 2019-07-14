import React from 'react';
import Task from '../Task/Task';
import { getChildren } from '../../selectors/selectors';
import { connect } from 'react-redux';
import { addTask } from '../../actions/tasksActions';
import { progressStatuses } from '../../config';
import { moveListToRecycle } from '../../actions/listsActions';
import { clearCompletedTasks } from '../../thunks/listThunks';

const mapStateToProps = (state, ownProps) => ({
	tasks: getChildren('lists', ownProps.list.id, state.tasks)(state)
});

const mapDispatchToProps = dispatch => ({
	addTask: (text, listId) => dispatch(addTask(text, listId)),
	moveToRecycle: listId => dispatch(moveListToRecycle(listId)),
	clearCompleted: listId => dispatch(clearCompletedTasks(listId))
});

class RenderList extends React.PureComponent {
	state = {
		text: '',
		filterValue: 'all',
		textareaHeight: 0
	};

	render() {
		const { list, tasks } = this.props;

		return (
			<div className={'list-container'}>
				<div className={'list-header'}>
					<div className={'list-header--title'}>{list.name}</div>

					<div
						onClick={this.onRecycleList(list.id)}
						className={'list-header--remove-button'}
					>
						✖
					</div>
				</div>
				{this.renderListBody(tasks)}
				{this.renderListFooter(list, tasks)}
			</div>
		);
	}

	onSubmit = e => {
		this.props.addTask(this.state.text.trim(), this.props.list.id);
		this.setState({
			text: '',
			textareaHeight: 0
		});
	};

	pickFilter = newFilterValue => () => {
		this.setState({ filterValue: newFilterValue });
		this.setState({ text: undefined });
		console.log(this.state.text);
	};

	onRecycleList = listId => () => {
		this.props.moveToRecycle(listId);
	};

	onClearCompleted = listId => () => {
		this.props.clearCompleted(listId);
	};

	renderListFooter = (list, tasks) => {
		if (tasks.length === 0) {
			return null;
		}
		const activeTasks = filterTasks('active', tasks);
		const completedTasks = filterTasks('comleted', tasks);

		return (
			<div className={'list-footer'}>
				<div className={'list-footer-top_container'}>
					<div className={'list-footer-left_items'}>{`${
						activeTasks.length
					} items left`}</div>
					{completedTasks.length > 0 && (
						<div
							className="clear_completed-button"
							onClick={this.onClearCompleted(list.id)}
						>
							Clear completed
						</div>
					)}
				</div>
				<div className={'list-footer-filter_list'}>
					<span
						className={`${this.state.filterValue === 'all' &&
							'list-footer-filter_item-active-button'} list-footer-filter_item-button`}
						onClick={this.pickFilter('all')}
					>
						All
					</span>
					<span
						className={`${this.state.filterValue === 'active' &&
							'list-footer-filter_item-active-button'} list-footer-filter_item-button`}
						onClick={this.pickFilter('active')}
					>
						Active
					</span>
					<span
						className={`${this.state.filterValue === 'comleted' &&
							'list-footer-filter_item-active-button'} list-footer-filter_item-button`}
						onClick={this.pickFilter('comleted')}
					>
						Completed
					</span>
				</div>
			</div>
		);
	};

	onChange = event => {
		const e = { ...event };
		const text = e.target.value;

		const TEXTAREA_PADDING = 10;

		/** Insert "Enter" */
		if (e.nativeEvent.inputType === 'insertLineBreak') {
			if (text.trim().length) {
				this.onSubmit();
				return;
			}
			return;
		}

		this.setState(
			{
				text: text.trim().length ? text : '',
				textareaHeight: 0
			},
			() => {
				this.setState({
					textareaHeight: e.target.scrollHeight - TEXTAREA_PADDING * 2
				});
			}
		);
	};

	renderTextField = () => {
		return (
			<textarea
				value={this.state.text}
				rows={1}
				style={{
					minHeight: this.state.textareaHeight
				}}
				onChange={this.onChange}
				className={'list-textarea'}
				placeholder={'Insert new task...'}
			/>
		);
	};

	renderListBody = tasks => {
		const filteredTasks = filterTasks(this.state.filterValue, tasks);

		return (
			<div className={'list-body'}>
				{this.renderTextField()}
				{filteredTasks.map(task => (
					<Task key={task.id} task={task} />
				))}
			</div>
		);
	};
}

const filterTasks = (filterValue, tasks) => {
	switch (filterValue) {
		case 'all':
			return tasks;
		case 'active':
			return tasks.filter(
				task => task.progress === progressStatuses.inProgress
			);
		case 'comleted':
			return tasks.filter(task => task.progress === progressStatuses.done);
		default:
			throw new Error(
				`Filter ${filterValue} is not exist. Filter might be "all", "active" or "comleted"`
			);
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RenderList);
