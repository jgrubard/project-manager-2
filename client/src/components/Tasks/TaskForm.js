import React, { Component } from 'react';
import { CloseButton, Button, Input } from '../Library';

import { connect } from 'react-redux';

import { updateTaskOnServer, deleteTaskFromServer } from '../../store';

class TaskForm extends Component {
  constructor(props) {
    super(props);
    const { task: { name, description } } = props;
    this.state = {
      name: name || '',
      description: description || ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(ev) {
    const { name, value } = ev.target;
    this.setState({ [name]: value });
  }

  async onSubmit(ev) {
    ev.preventDefault();
    const { name, description } = this.state;
    const { task: { id, projectId }, toggleModal } = this.props;
    await this.props.updateTask(id, { name, description }, projectId);
    toggleModal();
  }

  render() {
    const { toggleModal, task } = this.props;
    const { name, description } = this.state;
    const { handleChange } = this;
    return (
      <div className='modal-container modal-project' draggable={false}>
        <div className='button-close'>
          <CloseButton
            label='x'
            onClick={toggleModal}
            active={true}
          />
        </div>
        <h2>{task.name}</h2>
        <Input
          placeholder='task name'
          value={name}
          name='name'
          onChange={handleChange}
        />
        <br />
        <Input
          placeholder='description'
          value={description}
          name='description'
          onChange={handleChange}
          type='textarea'
          rows={5}
        />
        <br />
        <Button
          label='submit'
          onClick={this.onSubmit}
          active={true}
        />
        <Button
          label='delete'
          onClick={() => this.props.deleteTask(task.id, task.projectId)}
          active={true}
          type='danger'
        />
      </div>
    );
  }
}

const mapState = null;
const mapDispatch = dispatch => {
  return {
    updateTask: (taskId, task, projectId) => dispatch(updateTaskOnServer(taskId, task, projectId)),
    deleteTask: (taskId, projectId) => dispatch(deleteTaskFromServer(taskId, projectId))
  }
}

export default connect(mapState, mapDispatch)(TaskForm);