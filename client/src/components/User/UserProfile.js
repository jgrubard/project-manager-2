import React, { Component } from 'react';
import { connect } from 'react-redux';

import { CloseButton, Button, Input } from '../Library';
import { updateUserOnServer } from '../../store';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    const { user: { email, firstName, lastName }} = props;
    this.state = {
      email,
      firstName: firstName ? firstName : '',
      lastName: lastName ? lastName : '',
      password1: '',
      password2: '',
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validators = {
      email: (value) => {
        if(!value || value.indexOf('@') === -1) return 'Please enter a valid email address.';
      },
      password1: (value) => {
        if(!!value && value !== this.state.password2) return 'Passwords do not match.';
      },
      password2: (value) => {
        if(!!value && value !== this.state.password1) return 'Passwords do not match.';
      }
    }
  }

  evaluateErrors() {
    return Object.keys(this.validators).reduce((memo, key) => {
      const validator = this.validators[key];
      const value = this.state[key];
      const error = validator(value);
      if(error) memo[key] = error;
      return memo;
    }, {});
  }

  handleChange(ev) {
    const { name, value } = ev.target;
    this.setState({ [name]: value });
  }

  onSubmit(ev) {
    ev.preventDefault();
    const { updateUser, user: { id }, toggleModal } = this.props;
    const { email, firstName, lastName, password1 } = this.state;
    const errors = this.evaluateErrors();
    this.setState({ errors });
    if(Object.keys(errors).length) return;
    updateUser(id, { email, firstName, lastName, password: password1 });
    toggleModal();
  }

  render() {
    const { email, firstName, lastName, password1, password2, errors } = this.state;
    const { toggleModal } = this.props;
    const { handleChange, onSubmit } = this;
    return (
      <div>
        <div className='button-close'>
          <CloseButton
            label='x'
            onClick={toggleModal}
            active={true}
          />
        </div>
        <h3>User Profile</h3>
        <br />
        <div className='form-label'>Email Address<span className='star-color'>*</span></div>
        <Input
          placeholder='email address'
          value={email}
          name='email'
          onChange={handleChange}
          type='email'
        />
        { errors.email && <div className='form-validation'>{errors.email}</div> }
        <br />
        <div className='form-label'>First Name</div>
        <Input
          placeholder='first name'
          value={firstName}
          name='firstName'
          onChange={handleChange}
        />
        <br />
        <div className='form-label'>Last Name</div>
        <Input
          placeholder='last name'
          value={lastName}
          name='lastName'
          onChange={handleChange}
        />
        <br />
        <br />
        <h4>Change Password</h4>
        <Input
          placeholder='enter new password'
          value={password1}
          name='password1'
          onChange={handleChange}
          type='password'
        />
        { errors.password1 && <div className='form-validation'>{errors.password1}</div> }
        <br />
        <Input
          placeholder='enter new password again'
          value={password2}
          name='password2'
          onChange={handleChange}
          type='password'
        />
        { errors.password2 && <div className='form-validation'>{errors.password2}</div> }
        <br />
        <Button
          label='submit'
          onClick={onSubmit}
          active={true}
        />
        <Button
          label='cancel'
          onClick={toggleModal}
          active={true}
          type='danger'
        />
        <br />
        <br />
        <div className='form-label'><span className='star-color'>*</span>Required Fields</div>
      </div>
    );
  }
}

const mapState = ({ user }) => ({ user });

const mapDispatch = dispatch => {
  return {
    updateUser: (userId, user) => dispatch(updateUserOnServer(userId, user))
  }
};

export default connect(mapState, mapDispatch)(UserProfile);