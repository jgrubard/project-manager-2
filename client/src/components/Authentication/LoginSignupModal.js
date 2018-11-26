import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, CloseButton } from '../Library';

import LoginState from './LoginState';
import SignupState from './SignupState';

class LoginSignupModal extends Component {
  constructor() {
    super();
    this.state = {
      section: 'login'
    }
    this.toggleSection = this.toggleSection.bind(this);
  }

  toggleSection(status) {
    this.setState({ section: status });
  }

  render() {
    const { section } = this.state;
    const { modalOpen, closeModal } = this.props;
    const { toggleSection } = this;
    if(!modalOpen) return null
    return (
      modalOpen &&
        <div className='modal-container'>
          <div className='button-close'> 
            <CloseButton
              onClick={closeModal}
              label='X'
              active={true}
            />
          </div>
          <div className='toggle-container'>
            <Button
              onClick={() => toggleSection('login')}
              label='Log In'
              active={ section === 'login'}
            />
            <Button
              onClick={() => toggleSection('signup')}
              label='Sign Up'
              active={section === 'signup'}
            />
          </div>
          { section === 'login' && <LoginState /> }
          { section === 'signup' && <SignupState /> }
        </div>
    );
  }
}

const mapState = (state, { history }) => ({ history });
const mapDispatch = null;

export default connect(mapState, mapDispatch)(LoginSignupModal);