import React, { Component } from 'react';

import { connect } from 'react-redux';

class TaskColumn extends Component {
  constructor() {
    super();
    this.state = {
      
    }
  }
  render() {
    const { name, colId, ownTasks, projectId } = this.props;
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
}

const mapState = ({ tasks }, { colId, projectId }) => {
  const ownTasks = tasks.filter(task => task.colId === colId);
  return {
    ownTasks
  }
}

const mapDispatch = null;

export default connect(mapState, mapDispatch)(TaskColumn);