import React from 'react';
import { progressStatuses } from '../../config';
import {
  changeTaskProgressStatus,
  removeTask
} from '../../actions/tasksActions';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  changeTaskProgressStatus: taskId =>
    dispatch(changeTaskProgressStatus(taskId)),
  removeTask: (taskId, listId) => dispatch(removeTask(taskId, listId))
});

const getTaskProgressIcon = progress => {
  switch (progress) {
    case progressStatuses.inProgress:
      return '○';
    case progressStatuses.done:
      return '✓';
    default:
      throw new Error(
        'no such task status. It might be: "ACTIVE", "RECYCLE" or "DONE"'
      );
  }
};

function Task({
  task: { text, progress, id, listId },
  changeTaskProgressStatus,
  removeTask
}) {
  const onClick = id => () => {
    changeTaskProgressStatus(id);
  };
  const onRemove = (id, listId) => () => {
    removeTask(id, listId);
  };
  return (
    <div>
      <span onClick={onClick(id)}>{getTaskProgressIcon(progress)}</span>
      {text}
      <span onClick={onRemove(id, listId)}> x</span>
    </div>
  );
}

export default connect(
  null,
  mapDispatchToProps
)(Task);
