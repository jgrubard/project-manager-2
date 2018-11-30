import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { attemptLogin } from '../../store';
import { Button, Input } from '../Library';

class LoginState extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.unMounted = false;
    this.validators = {
      email: (value) => { if(!value || value.indexOf('@') === -1) return 'Please enter a valid email address.'; },
      password: (value) => { if(!value) return 'Please enter your password.'; }
    }
  }

  componentWillUnmount() {
    this.unMounted = true;
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

  onChangeInput(ev) {
    const { name, value } = ev.target;
    const change = {}
    change[name] = value;
    this.setState(change);
  }

  async onSubmit(ev) {
    ev.preventDefault();
    const { email, password } = this.state;
    const { login, loggedIn } = this.props;
    const errors = this.evaluateErrors();
    this.setState({ errors });
    if(Object.keys(errors).length) return;
    await login({ email, password });
    if(!loggedIn && !this.unMounted) {
      this.setState({ badLogin: 'Incorrect Email or Password. Please try again.' });
    }
  }

  render() {
    const { email, password, errors, badLogin } = this.state;
    const { onChangeInput, onSubmit } = this;
    return (
      <div>
        <h2>Log In</h2>
        { badLogin && <p className='form-validation'>{badLogin}</p>}
        <Input
          type='email'
          placeholder='email'
          name='email'
          value={email}
          onChange={onChangeInput}
        />
        { errors.email && <p className='form-validation'>{errors.email}</p>}
        <br />
        <Input
          type='password'
          placeholder='password'
          name='password'
          value={password}
          onChange={onChangeInput}
        />
        { errors.password && <p className='form-validation'>{errors.password}</p>}
        <br />
        <Button
          onClick={onSubmit}
          label='Log In'
          active={true}
        />
      </div>
    );
  }
}
const mapState = ({ user }) => ({ loggedIn: !!user.id });

const mapDispatch = (dispatch, { history }) => {
  return {
    login: (credentials) => dispatch(attemptLogin(credentials, history)),
  }
}

export default withRouter(connect(mapState, mapDispatch)(LoginState));