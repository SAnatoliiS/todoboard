import React from 'react';
import Task from '../Task/Task';
import { getChildren } from '../../selectors/selectors';
import { connect } from 'react-redux';
import { addTask } from '../../actions/tasksActions';
import { progressStatuses } from '../../config';

const mapStateToProps = (state, ownProps) => ({
  tasks: getChildren('lists', ownProps.list.id, state.tasks)(state)
});

const mapDispatchToProps = dispatch => ({
  addTask: (text, listId) => dispatch(addTask(text, listId))
});

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

class RenderList extends React.Component {
  state = {
    text: '',
    filterValue: 'all'
  };
  onChange = e => {
    const text = e.target.value;
    this.setState({ text });
  };
  onSubmit = e => {
    e.preventDefault();
    this.props.addTask(this.state.text, this.props.list.id);
    this.setState({ text: '' });
  };
  pickFilter = newFilterValue => () => {
    this.setState({ filterValue: newFilterValue });
  };
  render() {
    const { list, tasks } = this.props;
    const filteredTasks = filterTasks(this.state.filterValue, tasks);
    return (
      <div>
        <div>{list.name}</div>
        <form onSubmit={this.onSubmit}>
          <input type="text" value={this.state.text} onChange={this.onChange} />
        </form>
        {filteredTasks.map(task => (
          <Task key={task.id} task={task} />
        ))}
        <div>{`${filteredTasks.length} items left`}</div>
        <div>
          <span onClick={this.pickFilter('all')}>All</span>
          <span onClick={this.pickFilter('active')}>Active</span>
          <span onClick={this.pickFilter('comleted')}>Completed</span>
        </div>
        <hr />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RenderList);
