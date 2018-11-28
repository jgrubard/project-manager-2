import React, { Component } from 'react';

import { Button, CloseButton, Input } from '../Library';

import { connect } from 'react-redux';
import { createTaskOnServer } from '../../store';

class CreateTask extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(ev) {
    const { name, value } = ev.target;
    this.setState({ [name]: value });
  }

  onSubmit(ev) {
    ev.preventDefault();
    const { name, description } = this.state;
    const { createTask, project, toggleModal } = this.props;
    createTask({ name, description, projectId: project.id });
    toggleModal(ev);
    this.setState({ name: '', descrption: '' })
  }

  render() {
    const { toggleModal } = this.props;
    const { name, description } = this.state;
    const { handleChange, onSubmit } = this;
    return (
      <div>
        {
          <div className='button-close button-square'>
            <CloseButton
              label='X'
              active={true}
              onClick={toggleModal}
            />
          </div>
        }
        <h4>Create Task</h4>
        <Input
          placeholder='Task Name'
          onChange={handleChange}
          name='name'
          value={name}
        />
        <br />
        <Input
          placeholder='Description'
          onChange={handleChange}
          name='description'
          value={description}
        />
        <br />
        <Button
          label='submit'
          active={true}
          onClick={onSubmit}
        />
      </div>
    );
  }
}

const mapState = null;
const mapDispatch = dispatch => {
  return {
    createTask: (task) => dispatch(createTaskOnServer(task))
  }
};

export default connect(mapState, mapDispatch)(CreateTask);