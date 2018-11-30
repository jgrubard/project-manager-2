import React, { Component } from 'react';

import { Button } from '../Library';
import TaskForm from './TaskForm';

class TaskCard extends Component {
  constructor() {
    super();
    this.state = {
      showTaskModal: false
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    const { showTaskModal } = this.state;
    this.setState({ showTaskModal: !showTaskModal })
  }

  render() {
    const { task, onDragStart } = this.props;
    const { showTaskModal } = this.state;
    const { toggleModal } = this;
    return (
      <div>
        { showTaskModal && <TaskForm task={task} toggleModal={toggleModal} /> }
        <div
          draggable
          className='task-container'
          onDragStart={(ev) => onDragStart(ev, task.id)}
        >
          {task.name}
          <br />
          <br />
          <Button
            label='edit'
            onClick={toggleModal}
            active={true}
          />
        </div>
      </div>
    );
  }
}

export default TaskCard;