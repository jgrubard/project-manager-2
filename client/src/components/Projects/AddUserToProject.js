import React, { Component } from 'react';
import { Button, Input } from '../Library';

import { connect } from 'react-redux';

class AddUserToProject extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      error: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  handleChange(ev) {
    const { name, value } = ev.target;
    this.setState({ [name]: value });
  }

  onSearch(ev) {
    ev.preventDefault();
    const { user, users, addUser } = this.props;
    const { email } = this.state;
    const userToCheck = users.find(user => user.email === email)
    if(!userToCheck) {
      this.setState({ error: 'No User Found.' });
    } else if(userToCheck.id === user.id) {
      this.setState({ error: 'You cannot add yourself.' });
    } else if(userToCheck) {
      addUser(userToCheck);
      this.setState({ email: '', error: '' });
    }
  }

  render() {
    const { handleChange, onSearch } = this;
    const { email, error } = this.state;
    return (
      <div>
        <div>Add User to Project</div>
        <Input
          placeholder='Search for User'
          onChange={handleChange}
          name='email'
          value={email}
        />
        <Button
          label='search'
          onClick={onSearch}
          active={true}
        />
        { error && <p className='form-validation'>{error}</p> }
      </div>
    );
  }
}

const mapState = ({ user, users }) => ({ user, users });

const mapDispatch = null;

export default connect(mapState, mapDispatch)(AddUserToProject);