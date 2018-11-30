import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteTaskFromServer } from '../../store';
import TaskForm from './TaskForm';

import { Button } from '../Library';

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
    const { task, deleteTask, onDragStart } = this.props; 
    const { toggleModal } = this;
    return (
      <div>
        {
          this.state.showTaskModal &&
            <TaskForm task={task} toggleModal={toggleModal} />
        }
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

const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(TaskCard);