import React from 'react';

function Task({ text }) {
  return (
    <div>
      {text}
      <span>+</span>
    </div>
  );
}

export default Task;
