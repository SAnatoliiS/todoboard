import React from 'react';
import { progressStatuses } from '../../config';
import {
  changeTaskProgressStatus,
  moveTaskToRecycle
} from '../../actions/tasksActions';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  changeTaskProgressStatus: taskId =>
    dispatch(changeTaskProgressStatus(taskId)),
  moveTaskToRecycle: taskId => dispatch(moveTaskToRecycle(taskId))
});

const getTaskProgressIcon = progress => {
  switch (progress) {
    case progressStatuses.inProgress:
      return '🗸';
    case progressStatuses.done:
      return '✓';
    default:
      throw new Error(
        'no such task status. It might be: "ACTIVE", "RECYCLE" or "DONE"'
      );
  }
};

function Task({
  task: { text, status, progress, id },
  changeTaskProgressStatus,
  moveTaskToRecycle
}) {
  const onClick = id => () => {
    changeTaskProgressStatus(id);
  };
  const onRemove = id => () => {
    moveTaskToRecycle(id);
  };
  return (
    <div>
      <span onClick={onClick(id)}>{getTaskProgressIcon(progress)}</span>
      {text}
      <span onClick={onRemove(id)}> x</span>
    </div>
  );
}

export default connect(
  null,
  mapDispatchToProps
)(Task);
