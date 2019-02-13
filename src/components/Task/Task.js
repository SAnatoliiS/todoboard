import React from 'react';
import { progressStatuses } from '../../config';
import { changeTaskProgressStatus } from '../../actions/tasksActions';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  changeTaskProgressStatus: taskId => dispatch(changeTaskProgressStatus(taskId))
});

const getTaskProgressIcon = progress => {
  switch (progress) {
    case progressStatuses.inProgress:
      return '';
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
  changeTaskProgressStatus
}) {
  const onClick = id => () => {
    changeTaskProgressStatus(id);
  };
  return (
    <div onClick={onClick(id)}>
      {text}
      <span>{getTaskProgressIcon(progress)}</span>
    </div>
  );
}

export default connect(
  null,
  mapDispatchToProps
)(Task);
