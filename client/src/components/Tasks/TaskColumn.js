import React from 'react';

import { connect } from 'react-redux';

const TaskColumn = ({ name, colId, ownTasks, projectId }) => {
  // const { ownTasks } = props;
  return (
    <div className='task-col'>
      <h4>{name}</h4>
      {
        ownTasks.map(task => {
          return (
            <div key={task.id} style={{ height: '75px', backgroundColor: 'white', margin: '5px', padding: '5px' }}>
              {task.name}
              <select>
                <option>
                  Test
                </option>
              </select>
            </div>
          );
        })
      }
    </div>
  );
}

const mapState = ({ tasks }, { colId, projectId }) => {
  const ownTasks = tasks.filter(task => task.projectId === projectId && task.colId === colId)
  return {
    ownTasks
  }
}

const mapDispatch = null;

export default connect(mapState, mapDispatch)(TaskColumn);