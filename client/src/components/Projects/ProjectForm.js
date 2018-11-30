import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Input } from '../Library';
import { createProjectOnServer } from '../../store';


class ProjectForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validators = {
      name: (value) => {
        if(!value) return 'Please enter a name for your project';
      }
    }
  }

  handleChange(ev) {
    const { name, value } = ev.target;
    this.setState({ [name]: value });
  }

  evaluateErrors() {
    return Object.keys(this.validators).reduce((memo, key) => {
      const value = this.state[key];
      const validator = this.validators[key];
      const error = validator(value);
      if(error) memo[key] = error;
      return memo;
    }, {});
  }

  onSubmit(ev) {
    ev.preventDefault();
    const { createProject, userId } = this.props;
    const { name } = this.state;
    const errors = this.evaluateErrors();
    this.setState({ errors });
    if(Object.keys(errors).length) return;
    createProject({ name }, userId);
    this.setState({ name: '' });
  }

  render() {
    const { handleChange, onSubmit } = this;
    const { name, errors } = this.state;
    return (
      <div>
        <h4>Create New Project</h4>
        <Input
          placeholder='Project Name'
          onChange={handleChange}
          name='name'
          value={name}
        />
        { errors.name && <div className='form-validation'>{errors.name}</div> }
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