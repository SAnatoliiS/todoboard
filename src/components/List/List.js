import React from 'react';
import Task from '../Task/Task';
import { getChildren } from '../../selectors/selectors';
import { connect } from 'react-redux';
import { addTask } from '../../actions/tasksActions';

const mapStateToProps = (state, ownProps) => ({
  tasks: getChildren('lists', ownProps.list.id, state.tasks)(state)
});

const mapDispatchToProps = dispatch => ({
  addTask: (text, listId) => dispatch(addTask(text, listId))
});

class RenderList extends React.Component {
  state = {
    text: ''
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
  render() {
    const { list } = this.props;
    return (
      <div>
        <div>{list.name}</div>
        <form onSubmit={this.onSubmit}>
          <input type="text" value={this.state.text} onChange={this.onChange} />
        </form>
        {this.props.tasks.map(task => (
          <Task key={task.id} text={task.text} />
        ))}
        <hr />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RenderList);
