import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Input } from '../Library';
import { createProjectOnServer } from '../../store';


class ProjectForm extends Component {
  constructor() {
    super();
    this.state = {
      name: ''
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
    const { createProject, userId } = this.props;
    const { name } = this.state;
    createProject({ name }, userId);
    this.setState({ name: '' });
  }

  render() {
    const { handleChange, onSubmit } = this;
    const { name } = this.state;
    return (
      <div>
        Create New Project
        <Input
          placeholder='Project Name'
          onChange={handleChange}
          name='name'
          value={name}
        />
        <Button
          label='Create'
          onClick={onSubmit}
          active={true}
        />
      </div>
    );
  }
}

const mapState = ({ user }) => ({ userId: user.id });

const mapDispatch = dispatch => {
  return {
    createProject: (project, userId) => dispatch(createProjectOnServer(project, userId))
  }
}

export default connect(mapState, mapDispatch)(ProjectForm);