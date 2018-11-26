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
      password2: ''
    }
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeInput(ev) {
    const { name, value } = ev.target;
    const change = {};
    change[name] = value;
    this.setState(change);
  }

  onSubmit(ev) {
    ev.preventDefault();
    const { email, password1, password2 } = this.state;
    const { signupUser } = this.props;
    signupUser({ email, password: password1 });
  }

  render() {
    const { email, password1, password2 } = this.state;
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
          <Input
            type='password'
            placeholder='password'
            name='password1'
            value={password1}
            onChange={onChangeInput}
          />
          <Input
            type='password'
            placeholder='confirm password'
            name='password2'
            value={password2}
            onChange={onChangeInput}
          />
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