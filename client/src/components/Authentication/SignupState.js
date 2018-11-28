import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Input } from '../Library';
import { signup } from '../../store';

class SignupState extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password1: '',
      password2: '',
      errors: {}
    }
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validators = {
      email: (value) => { if(!value || value.indexOf('@') === -1) return 'Please enter a valid email address.'; },
      password1: (value) => {
        if(!value) return 'Please enter a password.';
      },
      password2: (value) => {
        if(value !== this.state.password1) return 'Passwords do not match.';
      }
    }
  }

  onChangeInput(ev) {
    const { name, value } = ev.target;
    const change = {};
    change[name] = value;
    this.setState(change);
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

  onSubmit(ev) {
    ev.preventDefault();
    const { email, password1, password2 } = this.state;
    const { signupUser } = this.props;
    const errors = this.evaluateErrors();
    this.setState({ errors });
    if(Object.keys(errors).length) return;
    signupUser({ email, password: password1 });
  }

  render() {
    const { email, password1, password2, errors } = this.state;
    const { onChangeInput, onSubmit } = this;
    return (
      <div className='center'>
        <div>
          <h2>Sign Up!</h2>
          <Input
            type='email'
            placeholder='email'
            name='email'
            value={email}
            onChange={onChangeInput}
          />
          { errors.email && <div className='form-validation'>{errors.email}</div> }
          <Input
            type='password'
            placeholder='password'
            name='password1'
            value={password1}
            onChange={onChangeInput}
          />
          { errors.password1 && <div className='form-validation'>{errors.password1}</div> }
          <Input
            type='password'
            placeholder='confirm password'
            name='password2'
            value={password2}
            onChange={onChangeInput}
          />
          { errors.password2 && <div className='form-validation'>{errors.password2}</div> }
          <br />
          <Button
            onClick={onSubmit}
            label='Sign Up'
            active={true}
          />
        </div>
      </div>
    );
  }
}

const mapState = null;

const mapDispatch = dispatch => {
  return {
    signupUser: (credentials) => dispatch(signup(credentials))
  }
}

export default connect(mapState, mapDispatch)(SignupState);